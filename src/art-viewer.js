let viewerSequence = 0;

// A copied SVG must not resolve gradients, clips or labels from the smaller scene.
export function namespacedArtwork(source, namespace) {
  const prefix = String(namespace).replace(/[^a-zA-Z0-9_-]/g, '-');
  const ids = new Map();
  const markup = String(source || '');
  for (const match of markup.matchAll(/(?:^|\s)id\s*=\s*(["'])([^"']+)\1/g)) ids.set(match[2], `${prefix}-${match[2]}`);
  if (!ids.size) return markup;
  let result = markup.replace(/(^|\s)id\s*=\s*(["'])([^"']+)\2/g, (all, space, quote, id) => `${space}id=${quote}${ids.get(id)}${quote}`);
  result = result.replace(/\b(aria-labelledby|aria-describedby)\s*=\s*(["'])([^"']*)\2/g, (all, name, quote, value) => `${name}=${quote}${value.split(/\s+/).map(id => ids.get(id) || id).join(' ')}${quote}`);
  // Handles url(#id), href="#id", CSS ID selectors and SVG timing references.
  const references = [...ids.keys()].sort((a, b) => b.length - a.length).map(id => id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  result = result.replace(new RegExp(`#(${references})(?![\\w-])`, 'g'), (all, id) => `#${ids.get(id)}`);
  result = result.replace(/\b(begin|end)\s*=\s*(["'])([^"']+)\2/g, (all, name, quote, value) => `${name}=${quote}${value.replace(/(^|;\s*)([\w:-]+)(\.)/g, (ref, start, id, dot) => `${start}${ids.get(id) || id}${dot}`)}${quote}`);
  return result;
}

export function artViewerState() {
  return { artViewerOpen: false, artViewerOriginal: false, artViewerId: '', artViewerTitle: '', artViewerPrefix: '', artViewerTrigger: null, artViewerHome: null };
}

export const artViewerMethods = {
  openArtViewer(event) {
    if (!['learn', 'present'].includes(this.route)) return false;
    if (this.route === 'present' && !['case', 'section', 'recap'].includes(this.presentationPage?.kind)) return false;
    if (this.route === 'learn' && this.view !== 'map') return false;
    const dialog = this.$refs.artViewer;
    if (!dialog || this.artViewerOpen) return false;
    this.artViewerId = this.route === 'present' ? this.presentationIllustrationId : this.learningIllustrationId;
    this.artViewerTitle = this.route === 'present' ? this.presentationTitle() : this.learningTitle;
    this.artViewerPrefix = `expanded-art-${++viewerSequence}`;
    this.artViewerOriginal = false;
    this.artViewerTrigger = event?.currentTarget || globalThis.document?.activeElement || null;
    this.artViewerOpen = true;
    this.$nextTick(() => {
      if (!this.artViewerOpen) return;
      const fullscreen = globalThis.document?.fullscreenElement;
      if (fullscreen && !fullscreen.contains(dialog)) {
        this.artViewerHome = { parent: dialog.parentNode, next: dialog.nextSibling };
        fullscreen.appendChild(dialog);
      }
      if (!dialog.open) dialog.showModal();
      this.$refs.artViewerViewport?.scrollTo(0, 0);
    });
    return true;
  },
  closeArtViewer({ restoreFocus = true } = {}) {
    const dialog = this.$refs.artViewer;
    const trigger = this.artViewerTrigger;
    this.artViewerOpen = false;
    if (dialog?.open) dialog.close();
    const home = this.artViewerHome;
    if (home?.parent?.isConnected) home.parent.insertBefore(dialog, home.next?.parentNode === home.parent ? home.next : null);
    this.artViewerHome = null;
    this.artViewerTrigger = null;
    this.artViewerOriginal = false;
    this.artViewerId = '';
    if (restoreFocus && trigger?.isConnected && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true });
  },
  onArtViewerClosed() { if (this.artViewerOpen) this.closeArtViewer(); },
  setArtViewerOriginal(original) {
    this.artViewerOriginal = original;
    this.$nextTick(() => this.$refs.artViewerViewport?.scrollTo(0, 0));
  },
  artViewerMarkup() { return this.artViewerId ? namespacedArtwork(this.lessonIllustration(this.artViewerId), this.artViewerPrefix) : ''; },
  artViewerStopped() {
    return this.illustrationPaused || this.prefersReducedMotion || !this.artPageVisible || (this.route === 'present' ? this.presentationArtStopped() : this.view !== 'map');
  },
};
