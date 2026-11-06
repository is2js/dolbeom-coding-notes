import test from 'node:test';
import assert from 'node:assert/strict';
import { artViewerState, artViewerMethods, namespacedArtwork } from '../src/art-viewer.js';

function fixture() {
  const calls = { shown: 0, closed: 0, focused: 0, scroll: [] };
  const dialog = { open: false, showModal() { this.open = true; calls.shown++; }, close() { this.open = false; calls.closed++; } };
  const app = {
    ...artViewerState(), ...artViewerMethods,
    route: 'learn', view: 'map', learningIllustrationId: 'section-location', learningTitle: '현재 위치',
    presentationIllustrationId: 'git', presentationPage: { kind: 'case' }, presentationTitle: () => '변경 기록',
    illustrationPaused: false, prefersReducedMotion: false, artPageVisible: true, presentationArtStopped: () => false,
    lessonIllustration: id => `<svg><defs><linearGradient id="${id}-fill"/></defs><rect fill="url(#${id}-fill)"/></svg>`,
    $refs: { artViewer: dialog, artViewerViewport: { scrollTo: (...args) => calls.scroll.push(args) } },
    $nextTick: callback => callback(),
  };
  const trigger = { isConnected: true, focus: options => { assert.equal(options.preventScroll, true); calls.focused++; } };
  return { app, calls, dialog, trigger };
}

test('copied SVG namespaces definitions, fragments, CSS selectors, labels and animation references', () => {
  const source = `<svg aria-labelledby="heading details"><title id="heading">Title</title><desc id='details'>Description</desc><defs><linearGradient id="paint"/><clipPath id="clip"/></defs><style>#card:hover { fill: url(#paint); color: #f00; } #card.selected{opacity:1}</style><g id="card" data-id="keep" clip-path="url('#clip')"><use href="#card"/><use xlink:href='#card'/><animate begin="card.click; card.end+1s"/></g></svg>`;
  const result = namespacedArtwork(source, 'viewer-1');
  assert.match(result, /id="viewer-1-heading"/);
  assert.match(result, /aria-labelledby="viewer-1-heading viewer-1-details"/);
  assert.match(result, /#viewer-1-card:hover/);
  assert.match(result, /#viewer-1-card.selected/);
  assert.match(result, /url\(#viewer-1-paint\)/);
  assert.match(result, /url\('#viewer-1-clip'\)/);
  assert.match(result, /href="#viewer-1-card"/);
  assert.match(result, /xlink:href='#viewer-1-card'/);
  assert.match(result, /begin="viewer-1-card.click; viewer-1-card.end\+1s"/);
  assert.match(result, /color: #f00/);
  assert.match(result, /data-id="keep"/);
  assert.notEqual(result, namespacedArtwork(source, 'viewer-2'));
  assert.equal(namespacedArtwork('<svg><rect fill="#fff"/></svg>', 'viewer'), '<svg><rect fill="#fff"/></svg>');
});

test('viewer opens the selected section rather than the general topic, then restores focus', () => {
  const { app, calls, dialog, trigger } = fixture();
  assert.equal(app.openArtViewer({ currentTarget: trigger }), true);
  assert.equal(app.artViewerId, 'section-location');
  assert.equal(app.artViewerTitle, '현재 위치');
  assert.equal(dialog.open, true);
  assert.match(app.artViewerMarkup(), /id="expanded-art-\d+-section-location-fill"/);
  assert.equal(app.openArtViewer({ currentTarget: trigger }), false);
  app.setArtViewerOriginal(true);
  assert.equal(app.artViewerOriginal, true);
  app.closeArtViewer();
  assert.equal(dialog.open, false);
  assert.equal(app.artViewerOpen, false);
  assert.equal(app.artViewerOriginal, false);
  assert.equal(calls.shown, 1);
  assert.equal(calls.closed, 1);
  assert.equal(calls.focused, 1);
});

test('presentation intro and demonstrations do not open an unrelated illustration', () => {
  const { app } = fixture();
  app.route = 'present';
  for (const kind of ['intro', 'demo', 'live']) {
    app.presentationPage = { kind };
    assert.equal(app.openArtViewer(), false);
  }
  app.presentationPage = { kind: 'section' };
  assert.equal(app.openArtViewer(), true);
  assert.equal(app.artViewerId, 'git');
  assert.equal(app.artViewerTitle, '변경 기록');
});

test('navigation can close without focusing a detached or previous-page trigger', () => {
  const { app, calls, trigger } = fixture();
  app.openArtViewer({ currentTarget: trigger });
  app.closeArtViewer({ restoreFocus: false });
  assert.equal(calls.focused, 0);
  app.openArtViewer({ currentTarget: { ...trigger, isConnected: false } });
  app.closeArtViewer();
  assert.equal(calls.focused, 0);
  app.onArtViewerClosed();
  assert.equal(calls.closed, 2);
});

test('expanded art shares manual, system and hidden-page motion preferences', () => {
  const { app } = fixture();
  assert.equal(app.artViewerStopped(), false);
  app.illustrationPaused = true;
  assert.equal(app.artViewerStopped(), true);
  app.illustrationPaused = false;
  app.prefersReducedMotion = true;
  assert.equal(app.artViewerStopped(), true);
  app.prefersReducedMotion = false;
  app.artPageVisible = false;
  assert.equal(app.artViewerStopped(), true);
  app.artPageVisible = true;
  app.route = 'present';
  app.presentationArtStopped = () => true;
  assert.equal(app.artViewerStopped(), true);
});

test('fullscreen viewer is returned to its host before route destruction', t => {
  const { app, dialog, trigger } = fixture();
  const moves = [];
  const home = { isConnected: true, insertBefore: (element, next) => moves.push(['home', element, next]) };
  dialog.parentNode = home;
  dialog.nextSibling = null;
  const fullscreen = { contains: () => false, appendChild: element => moves.push(['fullscreen', element]) };
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { fullscreenElement: fullscreen } });
  t.after(() => { if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument); else delete globalThis.document; });
  app.route = 'present';
  assert.equal(app.openArtViewer({ currentTarget: trigger }), true);
  assert.equal(moves[0][0], 'fullscreen');
  app.closeArtViewer({ restoreFocus: false });
  assert.equal(moves[1][0], 'home');
  assert.equal(app.artViewerHome, null);
});
