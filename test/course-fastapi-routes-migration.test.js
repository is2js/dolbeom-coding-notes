import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousFastapiRoutesDefault } from '../src/previous-fastapi-routes-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const lesson = course => course.lessons.find(item => item.id === 'templates');
const section = (course, id) => lesson(course).sections.find(item => item.id === id);
function oldDraft() {
  const result = copy(latest);
  result.lessons[result.lessons.findIndex(item => item.id === 'templates')] = copy(previousFastapiRoutesDefault);
  return result;
}

test('updates unchanged FastAPI route instruction in stored and recovery drafts', () => {
  const old = oldDraft();
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'old' })],
  ]);
  const snapshot = [...entries];
  const result = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [result.stored, result.recovery.course]) {
    for (const id of ['backend-python', 'backend-sqlite', 'web-jinja']) {
      assert.notEqual(section(old, id).body, section(latest, id).body);
      assert.equal(section(course, id).body, section(latest, id).body);
    }
    assert.equal(lesson(course).durationMinutes, lesson(latest).durationMinutes);
  }
  assert.deepEqual([...entries], snapshot);
});

test('keeps user-edited explanations, ordering and custom duration', () => {
  const old = oldDraft();
  section(old, 'backend-python').body = '강사가 직접 작성한 서버 안내';
  lesson(old).sections.reverse();
  lesson(old).durationMinutes = 99;
  const result = upgradeNineDefaults(old, latest);
  assert.equal(section(result, 'backend-python').body, '강사가 직접 작성한 서버 안내');
  assert.equal(section(result, 'backend-sqlite').body, section(latest, 'backend-sqlite').body);
  assert.deepEqual(lesson(result).sections.map(item => item.id), lesson(old).sections.map(item => item.id));
  assert.equal(lesson(result).durationMinutes, 99);
});
