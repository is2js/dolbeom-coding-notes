import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebCdnViteDefault } from '../src/previous-web-cdn-vite-default.js';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = value => value.lessons.find(item => item.id === 'web');
const section = (value, id) => lesson(value).sections.find(item => item.id === id);

test('frontend case and concepts highlight the requested teaching points', () => {
  const body = lesson(course).case.body;
  for (const part of ['`npm run dev`는 현재 폴더', '`127.0.0.1`은 내 컴퓨터', 'Vite가 실행 중인 같은 터미널', '종료할 때 `Ctrl+C`']) {
    assert.ok(body.includes(`<mark>${part}`), part);
  }
  const concept = section(course, 'web-map').body;
  for (const part of ['**프론트엔드**는 사용자', '**React**와 **Vue**는', '**Vite**는 개발 중']) {
    assert.ok(concept.includes(`<mark>${part}`), part);
  }
  assert.match(courseMarked.parse(concept), /<mark><strong>Vite<\/strong>/);
  assert.match(lesson(course).presentation.caseSummary, /Ctrl\+C/);
});

test('published Vite updates apply to untouched draft fields without replacing personal edits', () => {
  const draft = structuredClone(course);
  const saved = lesson(draft), old = previousWebCdnViteDefault;
  saved.case = structuredClone(old.case);
  saved.sections = structuredClone(old.sections);
  saved.steps = structuredClone(old.steps);
  saved.presentation = structuredClone(old.presentation);
  section(draft, 'web-map').body = '강사가 직접 편집한 프론트엔드 설명';
  const before = JSON.stringify(draft);
  const migrated = upgradeNineDefaults(draft, course);
  assert.equal(JSON.stringify(draft), before);
  assert.equal(lesson(migrated).case.body, lesson(course).case.body);
  assert.equal(section(migrated, 'web-map').body, '강사가 직접 편집한 프론트엔드 설명');
  assert.equal(section(migrated, 'web-http').body, section(course, 'web-http').body);
  assert.equal(lesson(migrated).presentation.caseSummary, lesson(course).presentation.caseSummary);
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);
});
