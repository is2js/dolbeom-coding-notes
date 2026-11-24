import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebToolsAlpineCaseDefault } from '../src/previous-web-tools-alpine-case-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = value => value.lessons.find(item => item.id === 'web-tools');

test('introduces wedding CDN before the Alpine-powered map without build details', () => {
  const current = lesson(course);
  assert.match(current.case.title, /청첩장.*부동산.*Alpine/);
  assert.ok(current.case.body.indexOf('wedding.chojaeseong.com') < current.case.body.indexOf('buja-map-case.gif'));
  assert.match(current.case.body, /alpinejs@3\.x\.x\/dist\/cdn\.min\.js/);
  assert.match(current.case.body, /@click/);
  assert.doesNotMatch(current.case.body, /Tailwind CSS가 연결된 위치|Vite|package\.json/);
  assert.doesNotMatch(current.presentation.caseSummary, /Vite/);
});

test('updates unchanged published case while preserving author edits', () => {
  const draft = structuredClone(course);
  const saved = lesson(draft);
  saved.case = structuredClone(previousWebToolsAlpineCaseDefault.case);
  saved.presentation.caseSummary = previousWebToolsAlpineCaseDefault.presentation.caseSummary;
  let migrated = lesson(upgradeNineDefaults(draft, course));
  assert.deepEqual(migrated.case, lesson(course).case);
  assert.equal(migrated.presentation.caseSummary, lesson(course).presentation.caseSummary);
  saved.case.body = '직접 수정한 사례';
  saved.presentation.caseSummary = '직접 수정한 발표 요약';
  migrated = lesson(upgradeNineDefaults(draft, course));
  assert.equal(migrated.case.body, saved.case.body);
  assert.equal(migrated.presentation.caseSummary, saved.presentation.caseSummary);
});
