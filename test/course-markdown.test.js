import test from 'node:test';
import assert from 'node:assert/strict';
import { isCourseImageSource } from '../src/course-markdown.js';

test('course images must be bundled static raster files in the course asset directory', () => {
  for (const src of ['./assets/course/example.png', './assets/course/terminal/codex-zip.webp', './assets/course/image-01.JPG']) {
    assert.equal(isCourseImageSource(src), true, src);
  }
  for (const src of ['', '/assets/course/example.png', '../assets/course/example.png', './assets/course/../secret.png', './assets/course/%2e%2e/secret.png', './assets/course/x.svg', './assets/course/x.png?url=evil', 'https://evil.example/a.png', '//evil.example/a.png', 'data:image/png;base64,AAAA', 'javascript:alert(1)', null]) {
    assert.equal(isCourseImageSource(src), false, String(src));
  }
});
