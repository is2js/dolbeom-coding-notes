import test from 'node:test';
import assert from 'node:assert/strict';
import { presenterState, presenterMethods, currentDemoElapsed } from '../src/presenter.js';
import { SESSION_KEY, buildPresentationPages } from '../src/presentation.js';

function fixtureCourse() {
  return { lessons: [
    {
      id: 'terminal', shortTitle: '터미널', case: { title: '실행 위치 사례' },
      sections: [
        { id: 'location', title: '현재 위치', optional: false },
        { id: 'bonus', title: '보충', optional: true },
        { id: 'run', title: '실행', optional: false },
      ],
    },
    { id: 'git', shortTitle: 'Git', case: { title: '변경 검토 사례' }, sections: [{ id: 'changes', title: '변경 확인', optional: false }] },
  ] };
}

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    emit(name, event = {}) { for (const callback of listeners.get(name) || []) callback(event); },
    clearListeners() { listeners.clear(); },
  };
}

function harness(t, { hash = '#/present/terminal/case', session, blockedStorage = false } = {}) {
  let now = 100000;
  t.mock.method(Date, 'now', () => now);
  const intervals = new Map();
  let intervalId = 0;
  t.mock.method(globalThis, 'setInterval', (callback, delay) => {
    intervalId += 1;
    intervals.set(intervalId, { callback, delay });
    return intervalId;
  });
  t.mock.method(globalThis, 'clearInterval', id => intervals.delete(id));
  const values = new Map(session ? [[SESSION_KEY, JSON.stringify(session)]] : []);
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const calls = { focus: [], scroll: [], history: [], notify: [], shownLessons: [], modalOpen: 0, modalClose: 0 };
  const window = { ...eventTarget(), scrollTo: options => calls.scroll.push(options) };
  Object.defineProperty(window, 'sessionStorage', {
    get() { if (blockedStorage) throw new Error('storage blocked'); return storage; },
  });
  const document = {
    ...eventTarget(), title: '', hidden: false, fullscreenElement: null,
    getElementById: id => ({ focus: options => calls.focus.push({ id, options }) }),
    querySelector: selector => ({ scrollTo: (...position) => calls.scroll.push({ selector, position }) }),
    async exitFullscreen() { document.fullscreenElement = null; document.emit('fullscreenchange'); },
  };
  let currentHash = hash;
  const location = {};
  Object.defineProperty(location, 'hash', {
    get: () => currentHash,
    set(value) { currentHash = value.startsWith('#') ? value : `#${value}`; },
  });
  const history = { replaceState(state, title, url) { calls.history.push(url); location.hash = url; } };
  for (const [name, value] of Object.entries({ window, document, location, history })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    t.after(() => previous ? Object.defineProperty(globalThis, name, previous) : delete globalThis[name]);
  }
  const course = fixtureCourse();
  const watchers = new Map();
  function createApp() {
    const rehearsal = {
      open: false,
      showModal() { assert.equal(this.open, false); this.open = true; calls.modalOpen += 1; },
      close() { assert.equal(this.open, true); this.open = false; calls.modalClose += 1; },
    };
    const data = {
      ...presenterState(), ...presenterMethods,
      course, route: 'learn', lessonId: 'terminal', readerOpen: false, drawer: false,
      illustrationPaused: false, prefersReducedMotion: false, artPageVisible: true,
      $refs: {
        rehearsal,
        presentationShell: { async requestFullscreen() { document.fullscreenElement = this; document.emit('fullscreenchange'); } },
      },
      $nextTick(callback) { callback(); },
      $watch(key, callback) { watchers.set(key, callback); },
      notify(message) { calls.notify.push(message); },
      showLesson(id) { this.lessonId = id; this.route = 'learn'; location.hash = `/lesson/${id}`; calls.shownLessons.push(id); },
      get lesson() { return this.course.lessons.find(item => item.id === this.lessonId) || this.course.lessons[0]; },
      get presentationPages() { return buildPresentationPages(this.lesson); },
      get presentationPageIndex() { return Math.max(0, this.presentationPages.findIndex(page => page.id === this.presentationPageId)); },
      get presentationPage() { return this.presentationPages[this.presentationPageIndex]; },
    };
    return new Proxy(data, {
      set(target, key, value, receiver) {
        const previous = target[key];
        Reflect.set(target, key, value, receiver);
        if (previous !== value) watchers.get(key)?.(value, previous);
        return true;
      },
    });
  }
  let app = createApp();
  app.initPresentation();
  return {
    get app() { return app; },
    course, window, document, location, storage, values, calls, intervals,
    setNow(value) { now = value; },
    tick() { for (const { callback } of intervals.values()) callback(); },
    flushRoute(initial = false) { return app.readPresentationRoute(initial); },
    saved() { return JSON.parse(values.get(SESSION_KEY)); },
    elapsed(id = app.lessonId) { return currentDemoElapsed(app.demoTimers, id, now); },
    reload() {
      window.clearListeners(); document.clearListeners(); intervals.clear(); watchers.clear();
      app = createApp(); app.initPresentation();
      return app.readPresentationRoute(true);
    },
  };
}

test('초기 일반 화면의 타이머 정지는 저장된 발표 위치를 기본 terminal/case로 덮지 않는다', t => {
  const h = harness(t, {
    hash: '#/lesson/git',
    session: { lessonId: 'git', pageId: 'live', timers: { git: { elapsedMs: 5000, startedAt: 90000 } } },
  });
  assert.equal(h.flushRoute(true), false);
  // This is main.readRoute(true)'s non-presentation branch, before learning ID resolution.
  h.app.pausePresentationTimers();
  assert.equal(h.app.lessonId, 'terminal', 'the initial learning placeholder still exists at this point');
  assert.deepEqual(h.app.presentationResume, {
    lessonId: 'git', pageId: 'live', timers: { git: { elapsedMs: 15000, startedAt: null } },
  });
  assert.deepEqual(h.saved(), h.app.presentationResume);
  h.app.openPresentation('git');
  assert.equal(h.location.hash, '#/present/git/live');
  h.flushRoute();
  assert.equal(h.app.lessonId, 'git');
  assert.equal(h.app.presentationPageId, 'live');
  assert.equal(h.app.demoTimers.git.startedAt, 100000);
  assert.equal(h.elapsed(), 15000);
});

test('live 직접 새로고침은 실행 중 시작 시각을 유지하고 숨김·pagehide 중 경과를 복구한다', t => {
  const h = harness(t, {
    hash: '#/present/git/live',
    session: { lessonId: 'git', pageId: 'live', timers: { git: { elapsedMs: 5000, startedAt: 90000 } } },
  });
  assert.equal(h.flushRoute(true), true);
  assert.equal(h.app.demoTimers.git.startedAt, 90000);
  assert.equal(h.elapsed(), 15000);
  assert.equal(h.intervals.size, 1);
  h.document.hidden = true;
  h.setNow(130000);
  h.document.emit('visibilitychange');
  assert.equal(h.app.demoTimers.git.startedAt, 90000, 'hiding a tab must not pause live work');
  assert.equal(h.app.presentationNow, 130000);
  assert.equal(h.elapsed(), 45000);
  h.window.emit('pagehide');
  assert.equal(h.intervals.size, 0);
  assert.equal(h.saved().timers.git.startedAt, 90000);
  h.setNow(150000);
  assert.equal(h.reload(), true);
  assert.equal(h.app.demoTimers.git.startedAt, 90000);
  assert.equal(h.elapsed(), 65000);
  assert.equal(h.intervals.size, 1);
  h.window.emit('pagehide');
  h.window.emit('pageshow');
  h.window.emit('pageshow');
  assert.equal(h.intervals.size, 1, 'BFCache pageshow must not duplicate the clock');
  h.setNow(151000); h.tick();
  assert.equal(h.app.presentationNow, 151000);
});

test('live에서 일시정지한 세션은 초기 복원과 중복 라우트 읽기로 자동 재시작하지 않는다', t => {
  const h = harness(t, {
    hash: '#/present/git/live',
    session: { lessonId: 'git', pageId: 'live', timers: { git: { elapsedMs: 42000, startedAt: null } } },
  });
  h.flushRoute(true);
  assert.deepEqual(h.app.demoTimers.git, { elapsedMs: 42000, startedAt: null });
  h.setNow(140000); h.flushRoute();
  assert.deepEqual(h.app.demoTimers.git, { elapsedMs: 42000, startedAt: null });
  assert.equal(h.elapsed(), 42000);
});

test('live 진입은 해당 강의만 계속 실행하고 정리 이동은 누적 시간을 저장해 멈춘다', t => {
  const h = harness(t, { hash: '#/present/terminal/live' });
  h.app.demoTimers = {
    terminal: { elapsedMs: 2000, startedAt: 90000 },
    git: { elapsedMs: 4000, startedAt: 95000 },
  };
  h.flushRoute();
  assert.deepEqual(h.app.demoTimers.terminal, { elapsedMs: 2000, startedAt: 90000 });
  assert.deepEqual(h.app.demoTimers.git, { elapsedMs: 9000, startedAt: null });
  h.setNow(110000);
  h.app.goPresentationPage('recap'); h.flushRoute();
  assert.deepEqual(h.app.demoTimers.terminal, { elapsedMs: 22000, startedAt: null });
  assert.equal(h.saved().pageId, 'recap');
  assert.deepEqual(h.saved().timers, h.app.demoTimers);
});

test('타이머 토글과 초기화는 다른 강의 시간을 보존하고 세션에 반영한다', t => {
  const h = harness(t, { hash: '#/present/terminal/live' });
  h.flushRoute();
  h.app.demoTimers.git = { elapsedMs: 7000, startedAt: null };
  h.setNow(110000); h.app.togglePresentationTimer();
  assert.deepEqual(h.app.demoTimers.terminal, { elapsedMs: 10000, startedAt: null });
  h.setNow(150000); h.app.togglePresentationTimer();
  h.setNow(155000);
  assert.equal(h.elapsed(), 15000);
  h.app.resetPresentationTimer();
  assert.deepEqual(h.saved().timers.terminal, { elapsedMs: 0, startedAt: null });
  assert.deepEqual(h.saved().timers.git, { elapsedMs: 7000, startedAt: null });
  h.flushRoute();
  assert.equal(h.app.demoTimers.terminal.startedAt, null, 'reset does not restart on the same live route');
});

test('발표 이동은 보충 절을 건너뛰고 강의 경계와 재정렬된 강의 순서를 따른다', t => {
  const h = harness(t);
  h.flushRoute(true);
  assert.equal(h.app.presentationAtBoundary(-1), true);
  h.app.movePresentation(-1);
  assert.equal(h.location.hash, '#/present/terminal/case');
  for (const pageId of ['section-location', 'section-run', 'demo', 'live', 'recap']) {
    h.app.movePresentation(1); h.flushRoute();
    assert.equal(h.app.presentationPageId, pageId);
  }
  assert.equal(h.app.presentationNextLabel(), '다음 강의');
  h.app.movePresentation(1); h.flushRoute();
  assert.equal(h.app.lessonId, 'git');
  assert.equal(h.app.presentationPageId, 'case');
  h.app.movePresentation(-1); h.flushRoute();
  assert.equal(h.app.lessonId, 'terminal');
  assert.equal(h.app.presentationPageId, 'recap');
  h.course.lessons.reverse();
  h.course.lessons.find(lesson => lesson.id === 'terminal').sections.reverse();
  h.app.openPresentation('terminal', 'section-location'); h.flushRoute();
  assert.equal(h.app.presentationTitle(), '현재 위치');
  h.app.openPresentation('terminal', 'recap'); h.flushRoute();
  assert.equal(h.app.presentationAtBoundary(1), true);
  h.app.movePresentation(1);
  assert.equal(h.location.hash, '#/present/terminal/recap');
});

test('불량 URL은 올바른 발표 경로로 교체하고 포커스·제목·열린 패널을 정리한다', t => {
  const h = harness(t, { hash: '#/present/missing/section-missing' });
  h.app.readerOpen = true; h.app.rehearsalOpen = true; h.app.drawer = true;
  assert.equal(h.flushRoute(true), true);
  assert.equal(h.location.hash, '#/present/terminal/case');
  assert.deepEqual(h.calls.history, ['#/present/terminal/case']);
  assert.equal(h.document.title, '터미널 · 발표 모드 · 돌범의 코딩 작업실');
  assert.equal(h.app.readerOpen, false);
  assert.equal(h.app.rehearsalOpen, false);
  assert.equal(h.app.drawer, false);
  assert.equal(h.calls.focus.at(-1).id, 'presentation-title');
  assert.equal(h.saved().pageId, 'case');
});

test('키보드 이동은 발표 본문에서만 동작하며 입력·버튼·모달·수정키를 방해하지 않는다', async t => {
  const h = harness(t); h.flushRoute(true);
  function press(extra = {}) {
    let prevented = false;
    const event = { key: 'ArrowRight', target: { closest: () => null }, preventDefault() { prevented = true; }, ...extra };
    h.document.emit('keydown', event);
    return prevented;
  }
  assert.equal(press(), true); h.flushRoute();
  assert.equal(h.app.presentationPageId, 'section-location');
  const unchanged = h.location.hash;
  for (const extra of [{ repeat: true }, { ctrlKey: true }, { metaKey: true }, { altKey: true }, { shiftKey: true }, { defaultPrevented: true }, { key: 'Enter' }, { target: { closest: () => ({ tagName: 'INPUT' }) } }]) {
    assert.equal(press(extra), false);
    assert.equal(h.location.hash, unchanged);
  }
  h.app.rehearsalOpen = true; assert.equal(press(), false);
  h.app.rehearsalOpen = false; h.app.readerOpen = true; assert.equal(press(), false);
  h.app.readerOpen = false;
  assert.equal(press({ key: ' ' }), true); h.flushRoute();
  assert.equal(h.app.presentationPageId, 'section-run');
  assert.equal(press({ key: 'ArrowLeft' }), true); h.flushRoute();
  assert.equal(h.app.presentationPageId, 'section-location');
  const fullscreenPage = h.location.hash;
  await h.app.togglePresentationFullscreen();
  assert.equal(h.app.fullscreenActive, true);
  assert.equal(press({ key: 'Escape', target: { closest: () => ({ tagName: 'BUTTON' }) } }), true);
  await Promise.resolve();
  assert.equal(h.document.fullscreenElement, null);
  assert.equal(h.app.fullscreenActive, false);
  assert.equal(h.app.route, 'present', 'Escape leaves presentation mode open');
  assert.equal(h.location.hash, fullscreenPage);
  assert.equal(h.app.presentationPageId, 'section-location');
  assert.deepEqual(h.calls.shownLessons, []);
  assert.equal(press({ key: 'Escape' }), false, 'without fullscreen, Escape is left to the browser');
  await h.app.togglePresentationFullscreen();
  const fullscreenShell = h.document.fullscreenElement;
  for (const modal of ['rehearsalOpen', 'readerOpen']) {
    h.app[modal] = true;
    assert.equal(press({ key: 'Escape' }), false, `${modal} must keep its native Escape behavior`);
    assert.equal(h.document.fullscreenElement, fullscreenShell, 'a modal Escape must not exit fullscreen');
    assert.equal(h.app[modal], true, 'the controller must not close the modal itself');
    assert.equal(h.location.hash, fullscreenPage);
    h.app[modal] = false;
  }
  await h.app.togglePresentationFullscreen();
  h.app.route = 'learn'; assert.equal(press(), false);
});

test('Alpine watch 어댑터는 연습 모달을 중복 열지 않고 전체화면과 발표 종료를 연결한다', async t => {
  const h = harness(t, { hash: '#/present/git/live' }); h.flushRoute(true);
  h.app.rehearsalOpen = true; h.app.rehearsalOpen = true;
  assert.equal(h.calls.modalOpen, 1);
  h.app.rehearsalOpen = false;
  assert.equal(h.calls.modalClose, 1);
  await h.app.togglePresentationFullscreen();
  assert.equal(h.app.fullscreenActive, true);
  h.setNow(105000);
  await h.app.exitPresentation();
  assert.equal(h.app.fullscreenActive, false);
  assert.equal(h.app.route, 'learn');
  assert.equal(h.location.hash, '#/lesson/git');
  assert.deepEqual(h.saved(), { lessonId: 'git', pageId: 'live', timers: { git: { elapsedMs: 5000, startedAt: null } } });
  assert.deepEqual(h.calls.shownLessons, ['git']);
});

test('저장소 접근이 차단되어도 발표 라우트와 타이머는 메모리에서 계속 동작한다', t => {
  const h = harness(t, { hash: '#/present/terminal/live', blockedStorage: true });
  assert.equal(h.app.presentationResume, null);
  assert.doesNotThrow(() => h.flushRoute(true));
  h.setNow(106000); h.app.togglePresentationTimer();
  assert.deepEqual(h.app.demoTimers.terminal, { elapsedMs: 6000, startedAt: null });
  assert.equal(h.app.presentationResume.pageId, 'live');
  assert.equal(h.values.size, 0);
});

test('21단계 템플릿 시연에서 4단계 GitHub 발표로 이동하면 시연 선택은 1/4부터 시작한다', t => {
  const h = harness(t, { hash: '#/present/templates/demo' });
  h.course.lessons = [
    { id: 'templates', shortTitle: '템플릿', case: { title: '화면 구성 사례' }, sections: [], steps: Array.from({ length: 21 }, (_, index) => ({ id: `templates-${index + 1}` })) },
    { id: 'github', shortTitle: 'GitHub', case: { title: '원격 검토 사례' }, sections: [], steps: Array.from({ length: 4 }, (_, index) => ({ id: `github-${index + 1}` })) },
  ];
  h.flushRoute(true);
  h.app.stepIndex = 20;
  assert.equal(h.app.lesson.steps[h.app.stepIndex].id, 'templates-21');
  h.app.goPresentationPage('live'); h.flushRoute();
  assert.equal(h.app.stepIndex, 20, 'changing presentation phase in the same lesson keeps its selected demonstration');
  h.app.openPresentation('github', 'demo'); h.flushRoute();
  assert.equal(h.app.lessonId, 'github');
  assert.equal(h.app.lesson.steps.length, 4);
  assert.equal(h.app.stepIndex, 0, 'a different lesson must not inherit the old 21st demonstration index');
  assert.equal(`${h.app.stepIndex + 1}/${h.app.lesson.steps.length}`, '1/4');
  assert.equal(h.app.lesson.steps[h.app.stepIndex].id, 'github-1');
});
