import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousJsonCardSection } from '../src/previous-json-card-default.js';
import { previousJsonPythonSections } from '../src/previous-json-python-defaults.js';

const source = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const lesson = course => course.lessons.find(item => item.id === 'templates');
const section = course => lesson(course).sections.find(item => item.id === 'backend-html-json');

function nextCourse() {
  const course = copy(source);
  section(course).body = '새 JSON과 Alpine 실습 내용';
  section(course).presentationPoints = ['새 발표 요점'];
  return course;
}

function oldCourse() {
  const course = copy(source);
  const index = lesson(course).sections.findIndex(item => item.id === 'backend-html-json');
  lesson(course).sections[index] = copy(previousJsonCardSection);
  return course;
}

test('unchanged JSON lesson text upgrades in saved and recovery drafts without mutating storage', () => {
  const original = oldCourse();
  const storage = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(original)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: original, baseRevision: 'old' })],
  ]);
  const snapshot = [...storage];
  const result = readCourseDrafts({ getItem: key => storage.get(key) ?? null }, { baseCourse: nextCourse(), local: true });
  for (const value of [result.stored, result.recovery.course]) {
    assert.equal(section(value).body, '새 JSON과 Alpine 실습 내용');
    assert.deepEqual(section(value).presentationPoints, ['새 발표 요점']);
  }
  assert.deepEqual([...storage], snapshot);
});

test('authored JSON content and custom lesson order survive while untouched fields update', () => {
  const original = oldCourse();
  section(original).body = '직접 작성한 강의 내용';
  lesson(original).sections.reverse();
  const updated = upgradeNineDefaults(original, nextCourse());
  assert.equal(section(updated).body, '직접 작성한 강의 내용');
  assert.deepEqual(section(updated).presentationPoints, ['새 발표 요점']);
  assert.deepEqual(lesson(updated).sections.map(item => item.id), lesson(original).sections.map(item => item.id));
});

test('the previous JSON and Python lessons upgrade without replacing authored text or restoring deleted sections', () => {
  const original = copy(source);
  const defaults = previousJsonPythonSections;
  for (const old of defaults) {
    const index = lesson(original).sections.findIndex(item => item.id === old.id);
    lesson(original).sections[index] = copy(old);
  }
  const next = copy(source);
  for (const old of defaults) lesson(next).sections.find(item => item.id === old.id).body = `최신 ${old.id}`;
  const upgraded = upgradeNineDefaults(original, next);
  for (const old of defaults) assert.equal(lesson(upgraded).sections.find(item => item.id === old.id).body, `최신 ${old.id}`);

  lesson(original).sections.find(item => item.id === 'backend-python').body = '직접 수정한 내용';
  lesson(original).sections = lesson(original).sections.filter(item => item.id !== 'backend-html-json');
  const preserved = upgradeNineDefaults(original, next);
  assert.equal(lesson(preserved).sections.find(item => item.id === 'backend-python').body, '직접 수정한 내용');
  assert.equal(lesson(preserved).sections.some(item => item.id === 'backend-html-json'), false);
});
