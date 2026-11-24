import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sectionThumbnail } from '../src/section-thumbnails.js';

test('Alpine case depicts both the invitation accordion and selected map region', () => {
  const svg = readFileSync(new URL('../src/illustrations/web-tools-case.svg', import.meta.url), 'utf8');
  assert.match(svg, /온라인 청첩장/);
  assert.match(svg, /질문 보기/);
  assert.match(svg, /서울 ✓/);
  assert.match(svg, /art-motion wedding-answer/);
  assert.match(svg, /prefers-reduced-motion: reduce/);
  const descriptions = readFileSync(new URL('../src/illustrations.js', import.meta.url), 'utf8');
  assert.match(descriptions, /'web-tools-case': '[^']*청첩장[^']*지도/);
  assert.match(descriptions, /return '청첩장[^']*지도/);
  const thumb = sectionThumbnail('web-tools-case', 'web-tools');
  assert.match(thumb, /aria-hidden="true"/);
  assert.doesNotMatch(thumb, /\bid="/);
});
