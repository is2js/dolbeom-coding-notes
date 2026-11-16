import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = path => readFileSync(new URL(`../public/examples/course-card/${path}`, import.meta.url), 'utf8');
const tailwind = '<script src="https://cdn.tailwindcss.com/3.4.17"></script>';
const alpine = '<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"></script>';

test('card and backend examples load the pinned CDN scripts in the browser', () => {
  const paths = [
    '05-alpine/index.html', 'template-preview.html',
    'server-data/static/01-local-json.html', 'server-data/static/02-dict-api.html',
    'server-data/static/03-sqlite-api.html', 'server-data/templates/cards.html',
    'server/templates/cards.html',
  ];
  for (const path of paths) {
    const html = load(path);
    assert.ok(html.includes(tailwind), path);
    assert.ok(html.includes(alpine), path);
    assert.match(html, /\[x-cloak\]\s*\{\s*display:\s*none\s*!important;\s*\}/, path);
    assert.doesNotMatch(html, /(?:href|src)="[^"\n]*(?:course\.css|alpine\.js)"/, path);
  }
  const cssStage = load('04-tailwind/index.html');
  assert.ok(cssStage.includes(tailwind));
  assert.match(cssStage, /src="\.\.\/03-javascript\/script\.js"/);
  assert.doesNotMatch(cssStage, /src="https:\/\/cdn\.jsdelivr\.net\/npm\/alpinejs/);
});

test('comparison page separates readable HTML, CSS and JavaScript for both cards', () => {
  const html = load('template-preview.html');
  for (const label of ['HTML · 카드 구조', 'CSS · style.css', 'JavaScript · script.js',
    'HTML · CDN 연결과 카드', 'CSS · HTML의 Tailwind 클래스', 'JavaScript · Alpine 속성']) {
    assert.ok(html.includes(label), label);
  }
  assert.match(html, /\.syntax-tag/);
  assert.match(html, /\.syntax-attr/);
  assert.match(html, /overflow-x:\s*auto/);
  assert.match(html, /인터넷에 연결되어 있어야/);
});
