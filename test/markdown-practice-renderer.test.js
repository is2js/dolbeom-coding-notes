import test from 'node:test';
import assert from 'node:assert/strict';
import { isPracticeImageSource } from '../src/markdown-practice-renderer.js';

test('practice images accept explicit HTTPS, course media and only editor-owned blobs', () => {
  const allowed = ['blob:https://example.com/owned'];
  for (const source of ['https://example.com/example.png', './assets/course/diagrams/html-element.svg', allowed[0]]) {
    assert.equal(isPracticeImageSource(source, allowed), true, source);
  }
  for (const source of ['blob:https://example.com/foreign', 'data:image/svg+xml,<svg/>', 'javascript:alert(1)', 'http://example.com/a.png', '//example.com/a.png', 'file:///a.png', '../secret.png', 'https://user:password@example.com/a.png', ' https://example.com/a.png', 'https://example.com/a.png\n', null]) {
    assert.equal(isPracticeImageSource(source, allowed), false, String(source));
  }
});
