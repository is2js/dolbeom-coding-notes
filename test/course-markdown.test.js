import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isCourseImageSource } from '../src/course-markdown.js';

test('course images must be bundled static raster files in the course asset directory', () => {
  for (const src of ['./assets/course/example.png', './assets/course/terminal/codex-zip.webp', './assets/course/image-01.JPG']) {
    assert.equal(isCourseImageSource(src), true, src);
  }
  for (const src of ['', '/assets/course/example.png', '../assets/course/example.png', './assets/course/../secret.png', './assets/course/%2e%2e/secret.png', './assets/course/x.svg', './assets/course/x.png?url=evil', 'https://evil.example/a.png', '//evil.example/a.png', 'data:image/png;base64,AAAA', 'javascript:alert(1)', null]) {
    assert.equal(isCourseImageSource(src), false, String(src));
  }
});

test('only the five authored, self-contained SVG diagrams can be embedded', () => {
  for (const name of ['html-element', 'html-attributes', 'html-document', 'css-declaration', 'javascript-flow']) {
    const source = `./assets/course/diagrams/${name}.svg`;
    assert.equal(isCourseImageSource(source), true, source);
    const svg = readFileSync(new URL(`../public/assets/course/diagrams/${name}.svg`, import.meta.url), 'utf8');
    assert.match(svg, /viewBox="0 0 760 550"/);
    assert.match(svg, /<title[^>]*>[^<]+<\/title>/);
    assert.match(svg, /<desc[^>]*>[^<]+<\/desc>/);
    assert.doesNotMatch(svg, /<(?:script|image|foreignObject|iframe)\b|\bon\w+\s*=|\b(?:href|src)\s*=/i);
    assert.equal(isCourseImageSource(`${source}?query=other`), false);
    assert.equal(isCourseImageSource(source.replace('/diagrams/', '/diagrams/../diagrams/')), false);
  }
  for (const source of ['./assets/course/diagrams/other.svg', './assets/course/diagrams/HTML-element.svg', './assets/course/html-element.svg', 'https://example.com/html-element.svg']) {
    assert.equal(isCourseImageSource(source), false, source);
  }
});
