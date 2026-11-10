import test from 'node:test';
import assert from 'node:assert/strict';
import { caseImageViewerState, caseImageViewerMethods } from '../src/case-image-viewer.js';
import { presenterMethods } from '../src/presenter.js';

function fixture(src = './assets/course/example.png') {
  const calls = { shown: 0, closed: 0, focused: 0, scrolled: 0 };
  const image = { alt: '실제 화면', getAttribute: name => name === 'src' ? src : null };
  const button = { isConnected: true, querySelector: () => image, focus: () => calls.focused++ };
  const event = { target: { closest: () => button }, currentTarget: { contains: value => value === button } };
  const dialog = { open: false, showModal() { this.open = true; calls.shown++; }, close() { this.open = false; calls.closed++; } };
  const app = { ...caseImageViewerState(), ...caseImageViewerMethods, $refs: { caseImageViewer: dialog, caseImageViewport: { scrollTo: () => calls.scrolled++ } }, $nextTick: fn => fn() };
  return { app, calls, dialog, button, event };
}

test('case image viewer opens the clicked local image, then restores focus', () => {
  const { app, calls, dialog, event } = fixture();
  assert.equal(app.openCaseImageFromEvent(event), true);
  assert.equal(app.caseImageSrc, './assets/course/example.png');
  assert.equal(app.caseImageAlt, '실제 화면');
  assert.equal(dialog.open, true);
  assert.equal(calls.scrolled, 1);
  assert.equal(app.openCaseImageFromEvent(event), false);
  app.closeCaseImageViewer();
  assert.equal(dialog.open, false);
  assert.equal(calls.focused, 1);
  assert.equal(app.caseImageSrc, '');
});

test('rejects remote, traversing and non-case media and does not focus detached triggers', () => {
  for (const src of ['https://example.com/a.png', './assets/course/../a.png', 'javascript:alert(1)']) {
    const { app, event } = fixture(src);
    assert.equal(app.openCaseImageFromEvent(event), false);
  }
  const { app, calls, event, button } = fixture();
  event.currentTarget.contains = () => false;
  assert.equal(app.openCaseImageFromEvent(event), false);
  event.currentTarget.contains = () => true;
  app.openCaseImageFromEvent(event);
  button.isConnected = false;
  app.closeCaseImageViewer();
  assert.equal(calls.focused, 0);
});

test('linked images prevent navigation only when the viewer can open', () => {
  const valid = fixture();
  let prevented = 0;
  valid.event.preventDefault = () => prevented++;
  assert.equal(valid.app.openCaseImageFromEvent(valid.event), true);
  assert.equal(prevented, 1);
  const invalid = fixture('https://example.com/unsafe.png');
  invalid.event.preventDefault = () => prevented++;
  assert.equal(invalid.app.openCaseImageFromEvent(invalid.event), false);
  assert.equal(prevented, 1);
});

test('fullscreen dialog is moved into and returned from the fullscreen host', t => {
  const { app, dialog, event } = fixture();
  const moves = [];
  const home = { isConnected: true, insertBefore: element => moves.push(['home', element]) };
  dialog.parentNode = home;
  dialog.nextSibling = null;
  const fullscreen = { contains: () => false, appendChild: element => moves.push(['fullscreen', element]) };
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { fullscreenElement: fullscreen } });
  t.after(() => { if (descriptor) Object.defineProperty(globalThis, 'document', descriptor); else delete globalThis.document; });
  app.openCaseImageFromEvent(event);
  app.closeCaseImageViewer({ restoreFocus: false });
  assert.deepEqual(moves.map(item => item[0]), ['fullscreen', 'home']);
});

test('presentation shortcut handler does not exit fullscreen while the image viewer is open', () => {
  let toggles = 0;
  const app = { route: 'present', caseImageOpen: true, togglePresentationFullscreen: () => toggles++ };
  presenterMethods.handlePresentationKeys.call(app, { key: 'Escape', preventDefault: () => assert.fail('dialog handles Escape') });
  assert.equal(toggles, 0);
});
