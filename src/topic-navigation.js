// Topic navigation is presentation state only; it never changes course or drafts.
export function topicNavigationState() {
  return { topicNavigationOpen: false, topicMenuHeight: 440 };
}

export function revealCurrentTopic(list, reducedMotion = false) {
  if (!list || list.clientWidth <= 0 || list.scrollWidth <= list.clientWidth) return false;
  const active = list.querySelector('[aria-current="step"]');
  if (!active) return false;
  const container = list.getBoundingClientRect();
  const card = active.getBoundingClientRect();
  const inset = 5;
  let left = list.scrollLeft;
  if (card.left < container.left + inset) left += card.left - container.left - inset;
  else if (card.right > container.right - inset) left += card.right - container.right + inset;
  else return false;
  left = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, left));
  if (left === list.scrollLeft) return false;
  list.scrollTo({ left, behavior: reducedMotion ? 'instant' : 'smooth' });
  return true;
}

export const topicNavigationMethods = {
  initTopicNavigation() {
    let previousWidth = globalThis.window?.innerWidth;
    globalThis.window?.addEventListener('resize', () => {
      if (globalThis.window.innerWidth === previousWidth) return;
      previousWidth = globalThis.window.innerWidth;
      this.syncTopicNavigation();
    });
  },
  selectTopic(id) {
    if (!this.course?.lessons.some(topic => topic.id === id)) return false;
    this.closeTopicNavigation(this.topicNavigationOpen);
    if (this.route === 'present') this.openPresentation(id, 'case');
    else this.showLesson(id, 'case');
    return true;
  },
  toggleTopicNavigation() {
    if (this.topicNavigationOpen) this.closeTopicNavigation(true);
    else this.openTopicNavigation();
  },
  openTopicNavigation(edge) {
    const trigger = globalThis.document?.querySelector(`[data-topic-navigation="${this.route}"] .topic-navigation-toggle`);
    if (trigger && globalThis.window) this.topicMenuHeight = Math.min(440, Math.max(100, globalThis.window.innerHeight - trigger.getBoundingClientRect().bottom - 74));
    this.topicNavigationOpen = true;
    this.$nextTick(() => {
      const menu = globalThis.document?.querySelector(`[data-topic-navigation="${this.route}"] [data-topic-list]`);
      const options = [...(menu?.querySelectorAll('[role="menuitemradio"]') || [])];
      const target = edge === 'first' ? options[0] : edge === 'last' ? options.at(-1) : options.find(item => item.getAttribute('aria-checked') === 'true') || options[0];
      target?.focus({ preventScroll: true });
      this.revealTopicOption(target);
    });
  },
  revealTopicOption(option) {
    const menu = option?.closest('[data-topic-list]');
    if (!menu) return;
    const row = option.getBoundingClientRect(), box = menu.getBoundingClientRect();
    if (row.top < box.top) menu.scrollTop += row.top - box.top;
    else if (row.bottom > box.bottom) menu.scrollTop += row.bottom - box.bottom;
  },
  focusTopicOption(event, direction) {
    const menu = event.currentTarget.closest('[data-topic-list]');
    const options = [...menu.querySelectorAll('[role="menuitemradio"]')];
    const current = options.indexOf(event.currentTarget);
    const target = direction === 'first' ? options[0] : direction === 'last' ? options.at(-1) : options[(current + direction + options.length) % options.length];
    target?.focus({ preventScroll: true });
    this.revealTopicOption(target);
  },
  navigationPages() { return this.route === 'present' ? this.presentationPages : this.learningPages; },
  navigationPageId() { return this.route === 'present' ? this.presentationPageId : this.learningPageId; },
  navigationPageIndex() { return Math.max(0, this.navigationPages().findIndex(page => page.id === this.navigationPageId())); },
  navigationPageTitle(page) { return page.section?.title || page.title || this.presentationPhase(page.kind); },
  navigationPagePhase(page) {
    return ({ intro: '강의 목표', case: '시작 사례', section: '본문', demo: '시연 예고', live: '실전 시연', recap: '핵심 정리' })[page.kind] || '본문';
  },
  navigationPageThumbnail(page) {
    return page.kind === 'section' ? this.sectionThumbnail(page.section?.id, this.lessonId) : this.topicThumbnail(this.lessonId);
  },
  selectNavigationPage(id) {
    if (!this.navigationPages().some(page => page.id === id)) return;
    this.closeTopicNavigation();
    if (this.route === 'present') this.goPresentationPage(id);
    else this.goLearningPage(id);
  },
  moveNavigationPage(delta) {
    if (this.route === 'present') this.movePresentation(delta);
    else this.moveLearningPage(delta);
  },
  navigationAtBoundary(delta) {
    if (this.route === 'present') return this.presentationAtBoundary(delta);
    return delta < 0 ? this.lessonId === this.course.lessons[0].id && this.learningPageIndex === 0
      : this.lessonId === this.course.lessons.at(-1).id && this.learningPageIndex === this.learningPages.length - 1;
  },
  closeTopicNavigation(restoreFocus = false) {
    this.topicNavigationOpen = false;
    if (restoreFocus) this.$nextTick?.(() => {
      globalThis.document?.querySelector(`[data-topic-navigation="${this.route}"] .topic-navigation-toggle`)?.focus();
    });
  },
  syncTopicNavigation() {
    this.topicNavigationOpen = false;
    this.$nextTick(() => {
      const list = globalThis.document?.querySelector(`[data-section-navigation="${this.route}"] [data-section-list]`);
      // A newly selected explanation must be visible before the lecturer resumes.
      revealCurrentTopic(list, true);
    });
  },
};
