import { isCourseImageSource } from './course-markdown.js';

export function caseImageViewerState() {
  return { caseImageOpen: false, caseImageSrc: '', caseImageAlt: '', caseImageTrigger: null, caseImageHome: null };
}

export const caseImageViewerMethods = {
  openCaseImageFromEvent(event) {
    const button = event?.target?.closest?.('.case-image-trigger');
    if (!button || !event.currentTarget?.contains(button) || this.caseImageOpen) return false;
    const image = button.querySelector('img');
    const src = image?.getAttribute('src');
    const dialog = this.$refs.caseImageViewer;
    if (!dialog || !isCourseImageSource(src)) return false;
    event.preventDefault?.();
    this.caseImageSrc = src;
    this.caseImageAlt = image.alt || '강의 사례 이미지';
    this.caseImageTrigger = button;
    this.caseImageOpen = true;
    this.$nextTick(() => {
      if (!this.caseImageOpen) return;
      const fullscreen = globalThis.document?.fullscreenElement;
      if (fullscreen && !fullscreen.contains(dialog)) {
        this.caseImageHome = { parent: dialog.parentNode, next: dialog.nextSibling };
        fullscreen.appendChild(dialog);
      }
      if (!dialog.open) dialog.showModal();
      this.$refs.caseImageViewport?.scrollTo(0, 0);
    });
    return true;
  },
  closeCaseImageViewer({ restoreFocus = true } = {}) {
    const dialog = this.$refs.caseImageViewer;
    const trigger = this.caseImageTrigger;
    this.caseImageOpen = false;
    if (dialog?.open) dialog.close();
    const home = this.caseImageHome;
    if (home?.parent?.isConnected) home.parent.insertBefore(dialog, home.next?.parentNode === home.parent ? home.next : null);
    this.caseImageHome = null;
    this.caseImageTrigger = null;
    this.caseImageSrc = '';
    this.caseImageAlt = '';
    if (restoreFocus && trigger?.isConnected && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true });
  },
  onCaseImageViewerClosed() { if (this.caseImageOpen) this.closeCaseImageViewer(); },
};
