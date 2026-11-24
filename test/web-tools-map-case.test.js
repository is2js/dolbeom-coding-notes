import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebToolsMapCaseDefault, previousWebToolsMapGifDefault } from '../src/previous-web-tools-map-case-default.js';
import { isCourseImageSource } from '../src/course-markdown.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = course.lessons.find(item => item.id === 'web-tools');

test('the real cases introduce the wedding CDN first and the Alpine-powered map second', () => {
  assert.equal(lesson.case.kind, 'real');
  assert.match(lesson.case.body, /https:\/\/wedding\.chojaeseong\.com\//);
  assert.match(lesson.case.body, /https:\/\/is2js\.github\.io\/buja-clone\//);
  assert.ok(lesson.case.body.indexOf('wedding.chojaeseong.com') < lesson.case.body.indexOf('buja-map-case.gif'));
  assert.match(lesson.case.body, /답변을 펼치고 접는 동작/);
  assert.doesNotMatch(lesson.case.body, /Vite|Tailwind CSS가 연결된 위치/);
  const blocks = courseMarked.lexer(lesson.case.body).filter(token => token.type === 'code');
  assert.ok(blocks.some(token => token.lang === 'html' && /alpinejs@3\.x\.x\/dist\/cdn\.min\.js/.test(token.text)));
  assert.ok(blocks.some(token => token.lang === 'html' && /@click="setArea\(item\.code\)"/.test(token.text)));
  assert.doesNotMatch(lesson.case.body, /x-data|github\.com\/is2js\/buja-clone/);
  const gif = './assets/course/buja-map-case.gif';
  assert.ok(isCourseImageSource(gif));
  assert.ok(courseMarked.lexer(lesson.case.body).some(token => token.tokens?.some(child => child.href === gif)));
  assert.equal(readFileSync(new URL(`../public/${gif.slice(2)}`, import.meta.url)).subarray(0, 6).toString(), 'GIF89a');
});

test('saved map case updates only unedited fields and preserves removed steps', () => {
  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === lesson.id);
  saved.case = structuredClone(previousWebToolsMapCaseDefault.case);
  saved.presentation.caseSummary = previousWebToolsMapCaseDefault.presentation.caseSummary;
  const migrated = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === lesson.id);
  assert.deepEqual(migrated().case, lesson.case);
  assert.equal(migrated().presentation.caseSummary, lesson.presentation.caseSummary);
  saved.case = structuredClone(previousWebToolsMapGifDefault.case);
  saved.presentation.caseSummary = previousWebToolsMapGifDefault.presentation.caseSummary;
  assert.deepEqual(migrated().case, lesson.case);
  assert.equal(migrated().presentation.caseSummary, lesson.presentation.caseSummary);
  saved.case.body = '강사가 작성한 시작사례';
  assert.equal(migrated().case.body, saved.case.body);
  const removed = saved.steps.pop();
  assert.equal(migrated().steps.some(item => item.id === removed.id), false);
});
