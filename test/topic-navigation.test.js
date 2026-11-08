import test from 'node:test';
import assert from 'node:assert/strict';
import { topicNavigationState, topicNavigationMethods, revealCurrentTopic } from '../src/topic-navigation.js';

test('주제 선택은 같은 주제를 포함해 항상 사례로 이동하고 모바일 목록을 접는다', () => {
  for (const route of ['learn', 'present']) {
    const calls = [];
    const app = { ...topicNavigationState(), ...topicNavigationMethods, route, course: { lessons: [{ id: 'git' }] }, topicNavigationOpen: true,
      showLesson: (...args) => calls.push(['learn', ...args]), openPresentation: (...args) => calls.push(['present', ...args]),
    };
    assert.equal(app.selectTopic('git'), true);
    assert.equal(app.topicNavigationOpen, false);
    assert.deepEqual(calls, [[route, 'git', 'case']]);
    assert.equal(app.selectTopic('missing'), false);
    assert.equal(calls.length, 1);
  }
});

test('P는 일반 강의의 현재 주제와 절에서 발표를 시작한다', () => {
  const calls = [];
  const app = { ...topicNavigationState(), ...topicNavigationMethods, route: 'learn', lessonId: 'terminal', learningPageId: 'section-terminal-example',
    openPresentation: (...args) => calls.push(args),
  };
  const event = { code: 'KeyP', key: 'p', target: { closest: () => null }, preventDefault: () => calls.push('prevent') };
  app.handlePresentationEntryKeys(event);
  assert.deepEqual(calls, ['prevent', ['terminal', 'section-terminal-example']]);
  app.learningPageId = 'recap';
  app.handlePresentationEntryKeys(event);
  assert.deepEqual(calls.at(-1), ['terminal', 'recap']);
});

test('발표 진입 단축키는 편집 중, 메뉴·대화상자 및 다른 화면에서 동작하지 않는다', () => {
  let calls = 0;
  const app = { ...topicNavigationState(), ...topicNavigationMethods, route: 'learn', lessonId: 'git', learningPageId: 'case',
    openPresentation: () => calls++,
  };
  const base = { code: 'KeyP', key: 'p', target: { closest: () => null }, preventDefault: () => calls++ };
  for (const patch of [
    { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { metaKey: true }, { repeat: true },
    { isComposing: true }, { defaultPrevented: true }, { code: 'KeyA', key: 'a' },
    { target: { isContentEditable: true, closest: () => null } }, { target: { closest: () => ({}) } },
  ]) app.handlePresentationEntryKeys({ ...base, ...patch });
  for (const field of ['topicNavigationOpen', 'drawer', 'readerOpen', 'rehearsalOpen', 'artViewerOpen']) {
    app[field] = true; app.handlePresentationEntryKeys(base); app[field] = false;
  }
  for (const route of ['present', 'editor', 'home']) { app.route = route; app.handlePresentationEntryKeys(base); }
  assert.equal(calls, 0);
});

function listAt(left, right, scrollLeft = 120) {
  const calls = [];
  return { calls, clientWidth: 300, scrollWidth: 1000, scrollLeft,
    getBoundingClientRect: () => ({ left: 20, right: 320 }),
    querySelector: () => ({ getBoundingClientRect: () => ({ left, right }) }),
    scrollTo: value => calls.push(value),
  };
}

test('가려진 현재 주제만 목록 안에서 드러내며 페이지는 스크롤하지 않는다', () => {
  const list = listAt(310, 454);
  assert.equal(revealCurrentTopic(list), true);
  assert.deepEqual(list.calls, [{ left: 259, behavior: 'smooth' }]);
  const visible = listAt(40, 184);
  assert.equal(revealCurrentTopic(visible), false);
  assert.deepEqual(visible.calls, []);
});

test('목록의 양 끝을 넘지 않고 동작 줄이기에서는 즉시 노출한다', () => {
  const start = listAt(-130, 14, 0);
  assert.equal(revealCurrentTopic(start, true), false);
  const end = listAt(310, 454, 690);
  assert.equal(revealCurrentTopic(end, true), true);
  assert.deepEqual(end.calls, [{ left: 700, behavior: 'instant' }]);
  assert.equal(revealCurrentTopic(null), false);
});
