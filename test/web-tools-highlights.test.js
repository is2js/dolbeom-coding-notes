import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebToolsHighlightsDefault } from '../src/previous-web-tools-highlights-default.js';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = value => value.lessons.find(item => item.id === 'web-tools');
const section = (value, id) => lesson(value).sections.find(item => item.id === id);

test('Alpine example changes button labels for both states and preserves interaction and accessibility', () => {
  const body = section(course, 'frontend-alpine').body;
  const sample = body.match(/```html\n(<button[\s\S]*?x-text=[\s\S]*?<\/button>)\n```/)?.[1];
  assert.ok(sample, 'actual button code is present');
  assert.match(sample, /@click="open = !open"/);
  assert.match(sample, /:aria-expanded="open\.toString\(\)" aria-controls="detail"/);
  const expression = sample.match(/x-text="([^"]+)"/)?.[1];
  assert.equal(expression, "open ? '설명 접기' : '설명 보기'");
  const label = new Function('open', `return (${expression});`);
  assert.equal(label(true), '설명 접기');
  assert.equal(label(false), '설명 보기');
  assert.match(body, /<mark>강사는 `x-text`/);
  assert.match(body, /`open: false`로 되돌립니다/);
});

test('requested examples and explanation are highlighted and include readable code markup', () => {
  assert.match(lesson(course).case.body, /<mark>답변을 펼치고 접는 동작에 Alpine\.js를 사용합니다\.<\/mark>/);
  assert.match(lesson(course).case.body, /<mark>`@click`은/);
  const css = section(course, 'frontend-css').body;
  assert.match(css, /<mark>\*\*Tailwind CSS\*\*는 여백/);
  assert.match(css, /<mark>`<body>`를/);
  const html = courseMarked.parse(css);
  assert.match(html, /<mark><code>&lt;body&gt;<\/code>/);
  assert.match(section(course, 'frontend-alpine').body, /<mark>`defer`는/);
  assert.ok(lesson(course).checklist.some(item => item.includes('x-text')));
});

test('existing drafts receive updates only for untouched published fields', () => {
  const draft = structuredClone(course);
  const saved = lesson(draft), before = previousWebToolsHighlightsDefault;
  saved.case.body = before.case.body;
  saved.sections.find(item => item.id === 'frontend-css').body = before.sections.find(item => item.id === 'frontend-css').body;
  const alpine = saved.sections.find(item => item.id === 'frontend-alpine');
  alpine.body = '강사가 직접 수정한 안내';
  saved.checklist = structuredClone(before.checklist);
  saved.presentation.caseSummary = before.presentation.caseSummary;
  const beforeJson = JSON.stringify(draft);
  const updated = upgradeNineDefaults(draft, course);
  assert.equal(JSON.stringify(draft), beforeJson);
  assert.equal(lesson(updated).case.body, lesson(course).case.body);
  assert.equal(section(updated, 'frontend-css').body, section(course, 'frontend-css').body);
  assert.equal(section(updated, 'frontend-alpine').body, alpine.body);
  assert.deepEqual(lesson(updated).checklist, lesson(course).checklist);
  assert.equal(lesson(updated).presentation.caseSummary, lesson(course).presentation.caseSummary);
  assert.deepEqual(upgradeNineDefaults(updated, course), updated);
});
