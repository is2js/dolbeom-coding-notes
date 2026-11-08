import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function metaContent(key) {
  const tags = indexHtml.match(/<meta\b[^>]*>/gi) || [];
  const matching = tags.filter(tag => {
    const name = tag.match(/\b(?:name|property)\s*=\s*(["'])(.*?)\1/i);
    return name?.[2] === key;
  });
  assert.equal(matching.length, 1, `${key} must occur exactly once in the static HTML`);
  const content = matching[0].match(/\bcontent\s*=\s*(["'])(.*?)\1/i);
  assert.ok(content, `${key} needs a content attribute`);
  return content[2];
}

test('shared title and image are available to social crawlers without JavaScript', () => {
  const title = '돌범이 풀어주는 Ai 구독 전 코딩 필수 노하우';
  assert.equal(indexHtml.match(/<title>(.*?)<\/title>/i)?.[1], title);
  assert.equal(metaContent('og:title'), title);
  assert.equal(metaContent('twitter:title'), title);
  assert.equal(metaContent('twitter:card'), 'summary_large_image');

  const image = new URL(metaContent('og:image'));
  assert.equal(image.protocol, 'https:');
  assert.equal(image.origin, 'https://is2js.github.io');
  assert.equal(image.pathname, '/dolbeom-coding-notes/assets/branding/social-preview.png');
  assert.equal(metaContent('twitter:image'), image.href);
  assert.equal(metaContent('og:image:width'), '1200');
  assert.equal(metaContent('og:image:height'), '630');

  const png = readFileSync(new URL('../public/assets/branding/social-preview.png', import.meta.url));
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(png.toString('ascii', 12, 16), 'IHDR');
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
