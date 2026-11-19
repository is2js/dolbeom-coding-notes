import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousViteLiveDefault } from '../src/previous-vite-live-default.js';
import { previousViteVisualDefault } from '../src/previous-vite-visual-default.js';

const source = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const web = course => course.lessons.find(item => item.id === 'web');
const section = (course, id) => web(course).sections.find(item => item.id === id);
const step = (course, id) => web(course).steps.find(item => item.id === id);

function updatedCourse() {
  const course = copy(source);
  const lesson = web(course);
  lesson.case.body = '새 실행 사례';
  lesson.case.title = '새 사례 제목';
  lesson.presentation.caseSummary = '새 발표 사례';
  section(course, 'web-http').body = '새 Vite 실습';
  step(course, 'web-02').code = '새 Vite 실행';
  return course;
}

function oldDraft(baseline) {
  const course = copy(source);
  course.lessons[course.lessons.findIndex(item => item.id === 'web')] = copy(baseline);
  return course;
}

test('saved and recovery drafts receive the new Vite demo when current fields match the published default', () => {
  const latest = updatedCourse();
  const old = oldDraft(previousViteLiveDefault);
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'old' })],
  ]);
  const before = [...entries];
  const result = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [result.stored, result.recovery.course]) {
    assert.equal(web(course).case.body, '새 실행 사례');
    assert.equal(web(course).presentation.caseSummary, '새 발표 사례');
    assert.equal(section(course, 'web-http').body, '새 Vite 실습');
    assert.equal(step(course, 'web-02').code, '새 Vite 실행');
  }
  assert.deepEqual([...entries], before);
});

test('author edits, custom ordering, and custom steps remain while untouched fields update', () => {
  const latest = updatedCourse();
  const old = oldDraft(previousViteLiveDefault);
  web(old).case.title = '강사가 쓴 사례 제목';
  section(old, 'web-http').body = '강사가 작성한 Vite 실습';
  step(old, 'web-02').code = '강사가 작성한 실행 방법';
  web(old).sections.reverse();
  const result = upgradeNineDefaults(old, latest);
  assert.equal(web(result).case.title, '강사가 쓴 사례 제목');
  assert.equal(web(result).case.body, '새 실행 사례');
  assert.equal(section(result, 'web-http').body, '강사가 작성한 Vite 실습');
  assert.equal(step(result, 'web-02').code, '강사가 작성한 실행 방법');
  assert.deepEqual(web(result).sections.filter(item => web(old).sections.some(previous => previous.id === item.id)).map(item => item.id), web(old).sections.map(item => item.id));
  assert.ok(web(result).sections.some(item => item.id === 'web-json-card'));
  assert.ok(web(result).sections.some(item => item.id === 'web-future-backend'));
});

test('an older visual baseline also upgrades directly to the newest Vite demo', () => {
  const latest = updatedCourse();
  const result = upgradeNineDefaults(oldDraft(previousViteVisualDefault), latest);
  assert.equal(web(result).case.body, '새 실행 사례');
  assert.equal(section(result, 'web-http').body, '새 Vite 실습');
  assert.equal(step(result, 'web-02').code, '새 Vite 실행');
});
