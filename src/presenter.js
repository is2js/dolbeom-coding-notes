import {
  buildPresentationPages, parsePresentationRoute, readPresentationSession, writePresentationSession,
  createDemoTimer, elapsedDemoMs, startDemoTimer, pauseDemoTimer, resetDemoTimer,
} from './presentation.js';

let sessionStore = null;
const phaseNames = { case: '시작 사례', section: '핵심 개념', demo: '실전 예고', live: '실전 진행', recap: '복귀 정리' };

export function presenterState() {
  return {
    presentationPageId: 'case', presentationResume: null, demoTimers: {},
    presentationNow: Date.now(), rehearsalOpen: false, fullscreenActive: false,
  };
}

export const presenterMethods = {
  initPresentation() {
    try { sessionStore = window.sessionStorage; } catch { sessionStore = null; }
    const saved = readPresentationSession(sessionStore, this.course);
    this.presentationResume = saved;
    this.demoTimers = saved?.timers || {};
    let tick = null;
    const startClock = () => {
      if (tick !== null) return;
      tick = setInterval(() => { if (this.route === 'present') this.presentationNow = Date.now(); }, 1000);
    };
    startClock();
    window.addEventListener('pageshow', startClock);
    window.addEventListener('pagehide', () => {
      if (this.route === 'present') this.persistPresentation();
      clearInterval(tick); tick = null;
    });
    const refreshClock = () => { this.presentationNow = Date.now(); };
    window.addEventListener('focus', refreshClock);
    document.addEventListener('visibilitychange', refreshClock);
    document.addEventListener('fullscreenchange', () => { this.fullscreenActive = !!document.fullscreenElement; });
    document.addEventListener('keydown', event => this.handlePresentationKeys(event));
    this.$watch('rehearsalOpen', open => this.$nextTick(() => {
      const dialog = this.$refs.rehearsal;
      if (!dialog) return;
      if (open && !dialog.open) dialog.showModal();
      else if (!open && dialog.open) dialog.close();
    }));
  },
  readPresentationRoute(initial = false) {
    const destination = parsePresentationRoute(location.hash, this.course);
    if (!destination) return false;
    const moving = this.route !== 'present' || this.lessonId !== destination.lessonId || this.presentationPageId !== destination.pageId;
    const restoreLive = initial && this.presentationResume?.lessonId === destination.lessonId && this.presentationResume?.pageId === 'live';
    this.pausePresentationTimers(destination.pageId === 'live' ? destination.lessonId : null);
    if (this.lessonId !== destination.lessonId) this.stepIndex = 0;
    this.lessonId = destination.lessonId;
    this.presentationPageId = destination.pageId;
    this.route = 'present'; this.readerOpen = false; this.rehearsalOpen = false; this.drawer = false;
    this.presentationNow = Date.now();
    if (destination.pageId === 'live' && moving && !restoreLive) {
      this.demoTimers[this.lessonId] = startDemoTimer(this.demoTimers[this.lessonId] || createDemoTimer(), this.presentationNow);
    }
    const hash = `#/present/${this.lessonId}/${this.presentationPageId}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    this.persistPresentation();
    document.title = `${this.lesson.shortTitle} · 발표 모드 · 돌범의 코딩 작업실`;
    this.focusPresentation();
    return true;
  },
  openPresentation(id = this.lessonId, pageId = null) {
    if (!this.course.lessons.some(lesson => lesson.id === id)) return;
    const resumed = this.presentationResume?.lessonId === id ? this.presentationResume.pageId : 'case';
    const requestedPage = pageId || resumed;
    const lesson = this.course.lessons.find(item => item.id === id);
    const page = buildPresentationPages(lesson).some(item => item.id === requestedPage) ? requestedPage : 'case';
    this.readerOpen = false; this.rehearsalOpen = false; this.drawer = false;
    if (location.hash === `#/present/${id}/${page}`) this.readPresentationRoute();
    else location.hash = `/present/${id}/${page}`;
  },
  goPresentationPage(id) {
    if (!this.presentationPages.some(page => page.id === id)) return;
    if (location.hash !== `#/present/${this.lessonId}/${id}`) location.hash = `/present/${this.lessonId}/${id}`;
  },
  movePresentation(delta) {
    const target = this.presentationPageIndex + delta;
    if (target >= 0 && target < this.presentationPages.length) {
      this.goPresentationPage(this.presentationPages[target].id);
      return;
    }
    const index = this.course.lessons.findIndex(lesson => lesson.id === this.lessonId);
    const next = this.course.lessons[index + (delta < 0 ? -1 : 1)];
    if (next) this.openPresentation(next.id, delta < 0 ? 'recap' : 'case');
  },
  presentationAtBoundary(delta) {
    const index = this.course.lessons.findIndex(lesson => lesson.id === this.lessonId);
    return delta < 0 ? index === 0 && this.presentationPageIndex === 0
      : index === this.course.lessons.length - 1 && this.presentationPageIndex === this.presentationPages.length - 1;
  },
  presentationPhase(kind = this.presentationPage?.kind) { return phaseNames[kind] || '시작 사례'; },
  presentationTitle() {
    const page = this.presentationPage;
    if (page?.kind === 'section') return page.section.title;
    if (page?.kind === 'case') return this.lesson.case.title;
    return { demo: '실전에서 확인할 것', live: '이제 실제 화면에서 살펴봅니다', recap: '방금 본 장면을 연결하면' }[page?.kind] || this.lesson.shortTitle;
  },
  presentationPageLabel(page) {
    return page.kind === 'section' ? page.section.title : this.presentationPhase(page.kind);
  },
  presentationNextLabel() {
    if (this.presentationAtBoundary(1)) return '마지막 강의';
    return { demo: '시연 시작', live: '시연 끝내고 정리', recap: '다음 강의' }[this.presentationPage?.kind] || '다음';
  },
  presentationArtStopped() {
    return this.illustrationPaused || this.prefersReducedMotion || !this.artPageVisible || !['case', 'section', 'recap'].includes(this.presentationPage?.kind);
  },
  handlePresentationKeys(event) {
    if (this.route !== 'present' || this.readerOpen || this.rehearsalOpen || event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.key === 'Escape' && document.fullscreenElement) {
      event.preventDefault(); void this.togglePresentationFullscreen(); return;
    }
    if (event.target?.closest?.('input, textarea, select, button, a, [contenteditable="true"], dialog[open]')) return;
    if (!['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) return;
    event.preventDefault();
    this.movePresentation(event.key === 'ArrowLeft' ? -1 : 1);
  },
  focusPresentation() {
    this.$nextTick(() => {
      document.getElementById('presentation-title')?.focus({ preventScroll: true });
      document.querySelector('.presentation-main')?.scrollTo(0, 0);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  },
  persistPresentation() {
    if (!this.course || !this.lessonId) return;
    const position = this.route === 'present' ? { lessonId: this.lessonId, pageId: this.presentationPageId }
      : this.presentationResume || { lessonId: this.lessonId, pageId: this.presentationPageId };
    const session = { lessonId: position.lessonId, pageId: position.pageId, timers: JSON.parse(JSON.stringify(this.demoTimers)) };
    this.presentationResume = session;
    writePresentationSession(sessionStore, session);
  },
  pausePresentationTimers(keepLesson = null) {
    let changed = false;
    for (const [id, timer] of Object.entries(this.demoTimers)) {
      if (id !== keepLesson && timer.startedAt !== null) {
        this.demoTimers[id] = pauseDemoTimer(timer, Date.now()); changed = true;
      }
    }
    if (changed) this.persistPresentation();
  },
  togglePresentationTimer() {
    this.presentationNow = Date.now();
    const timer = this.demoTimers[this.lessonId] || createDemoTimer();
    this.demoTimers[this.lessonId] = timer.startedAt === null ? startDemoTimer(timer, this.presentationNow) : pauseDemoTimer(timer, this.presentationNow);
    this.persistPresentation();
  },
  resetPresentationTimer() {
    this.demoTimers[this.lessonId] = resetDemoTimer(); this.presentationNow = Date.now(); this.persistPresentation();
  },
  async exitPresentation() {
    this.pausePresentationTimers(); this.persistPresentation();
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* The presentation still exits if the browser rejects fullscreen changes. */ }
    }
    this.showLesson(this.lessonId);
  },
  async togglePresentationFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (this.$refs.presentationShell?.requestFullscreen) await this.$refs.presentationShell.requestFullscreen();
      else this.notify('이 브라우저에서는 현재 발표 화면을 그대로 사용해 주세요.');
    } catch { this.notify('전체화면을 열지 못했습니다. 현재 발표 화면에서 계속 진행할 수 있습니다.'); }
  },
  openPresentationBody() {
    if (this.presentationPage?.kind === 'section') this.openSection(this.presentationPage.section.id);
    else {
      this.readerOpen = true;
      this.$nextTick(() => setTimeout(() => this.scrollReader('reader-case'), 50));
    }
  },
  async copyPresentationCommand() {
    try { await navigator.clipboard.writeText(this.presentationData.demo.command); this.notify('시연 내용을 복사했습니다. 준비한 실습 프로젝트에서 확인해 주세요.'); }
    catch { this.notify('시연 카드의 내용을 직접 선택해 복사해 주세요.'); }
  },
  reconcilePresentation() {
    if (this.route !== 'present') return;
    if (!this.presentationPages.some(page => page.id === this.presentationPageId)) this.goPresentationPage('case');
    this.persistPresentation();
    document.title = `${this.lesson.shortTitle} · 발표 모드 · 돌범의 코딩 작업실`;
  },
};

export function currentDemoElapsed(timers, lessonId, now) {
  return elapsedDemoMs(timers[lessonId] || createDemoTimer(), now);
}
