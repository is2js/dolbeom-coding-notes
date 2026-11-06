// Topic navigation is presentation state only; it never changes course or drafts.
export function topicNavigationState() {
  return { topicNavigationOpen: false };
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
  closeTopicNavigation(restoreFocus = false) {
    this.topicNavigationOpen = false;
    if (restoreFocus) this.$nextTick?.(() => {
      globalThis.document?.querySelector(`[data-topic-navigation="${this.route}"] .topic-navigation-toggle`)?.focus();
    });
  },
  syncTopicNavigation() {
    this.topicNavigationOpen = false;
    this.$nextTick(() => {
      const list = globalThis.document?.querySelector(`[data-topic-navigation="${this.route}"] [data-topic-list]`);
      revealCurrentTopic(list, this.prefersReducedMotion);
    });
  },
};
