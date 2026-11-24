import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebToolsWeddingDefault } from '../src/previous-web-tools-wedding-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const getLesson = value => value.lessons.find(lesson => lesson.id === 'web-tools');

test('wedding case migration updates unchanged fields and preserves authored content', () => {
  const latest = structuredClone(course);
  const published = getLesson(latest);
  published.case.title = '새 시작 사례';
  published.case.body = '기존 지도와 새 청첩장 사례';
  published.presentation.caseSummary = '새 발표 요약';
  const draft = structuredClone(latest);
  const saved = getLesson(draft);
  saved.case = structuredClone(previousWebToolsWeddingDefault.case);
  saved.presentation.caseSummary = previousWebToolsWeddingDefault.presentation.caseSummary;
  const result = () => getLesson(upgradeNineDefaults(draft, latest));
  assert.equal(result().case.title, published.case.title);
  assert.equal(result().case.body, published.case.body);
  assert.equal(result().presentation.caseSummary, published.presentation.caseSummary);
  saved.case.body = '강사가 직접 수정한 사례';
  saved.presentation.caseSummary = '강사가 직접 수정한 발표 요약';
  assert.equal(result().case.body, saved.case.body);
  assert.equal(result().presentation.caseSummary, saved.presentation.caseSummary);
  const removed = saved.steps.pop();
  assert.equal(result().steps.some(step => step.id === removed.id), false);
});
