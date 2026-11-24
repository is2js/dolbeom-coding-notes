import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebToolsMapCaseDefault } from '../src/previous-web-tools-map-case-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = course.lessons.find(item => item.id === 'web-tools');

test('the real map case describes Alpine, Tailwind and the CDN-to-build transition', () => {
  assert.equal(lesson.case.kind, 'real');
  assert.match(lesson.case.body, /https:\/\/is2js\.github\.io\/buja-clone\//);
  assert.match(lesson.case.body, /직접 작성한 CSS 클래스의 비중이 큽니다/);
  assert.match(lesson.case.body, /Play CDN.*학습·시연용/);
  const blocks = courseMarked.lexer(lesson.case.body).filter(token => token.type === 'code');
  assert.match(blocks.find(token => token.lang === 'html').text, /x-data="bujaApp"[\s\S]*x-show="loading"/);
  assert.ok(blocks.some(token => token.text === "import Alpine from 'alpinejs';"));
  assert.ok(blocks.some(token => token.text === 'Alpine.start();'));
  assert.match(blocks.find(token => token.lang === 'css').text, /@tailwind base;[\s\S]*@tailwind utilities;/);
});

test('saved map case updates only unedited fields and preserves removed steps', () => {
  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === lesson.id);
  saved.case = structuredClone(previousWebToolsMapCaseDefault.case);
  saved.presentation.caseSummary = previousWebToolsMapCaseDefault.presentation.caseSummary;
  const migrated = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === lesson.id);
  assert.deepEqual(migrated().case, lesson.case);
  assert.equal(migrated().presentation.caseSummary, lesson.presentation.caseSummary);
  saved.case.body = '강사가 작성한 시작사례';
  assert.equal(migrated().case.body, saved.case.body);
  const removed = saved.steps.pop();
  assert.equal(migrated().steps.some(item => item.id === removed.id), false);
});
