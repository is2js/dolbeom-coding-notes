import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousPythonSetupDefault } from '../src/previous-python-setup-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const lesson = (course, id) => course.lessons.find(item => item.id === id);
const section = (course, id, sectionId) => lesson(course, id).sections.find(item => item.id === sectionId);
function oldDraft() {
  const draft = copy(latest);
  for (const id of ['web-tools', 'templates']) draft.lessons[draft.lessons.findIndex(item => item.id === id)] = copy(previousPythonSetupDefault[id]);
  return draft;
}
const changed = [['web-tools', 'frontend-css'], ['web-tools', 'frontend-alpine'], ['templates', 'backend-python']];

test('stored and recovery drafts adopt unchanged Python setup and card examples', () => {
  const old = oldDraft();
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'old' })],
  ]);
  const snapshot = [...entries];
  const result = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [result.stored, result.recovery.course]) {
    for (const [id, sectionId] of changed) {
      assert.notEqual(section(old, id, sectionId).body, section(latest, id, sectionId).body);
      assert.equal(section(course, id, sectionId).body, section(latest, id, sectionId).body);
    }
    assert.equal(lesson(course, 'templates').durationMinutes, lesson(latest, 'templates').durationMinutes);
  }
  assert.deepEqual([...entries], snapshot);
});

test('Python setup migration preserves authored content, section order and edited duration', () => {
  const old = oldDraft();
  const custom = section(old, 'templates', 'backend-python');
  custom.body = '강사가 직접 편집한 내용';
  lesson(old, 'templates').sections.reverse();
  lesson(old, 'templates').durationMinutes = 99;
  const original = JSON.stringify(old);
  const result = upgradeNineDefaults(old, latest);
  assert.equal(JSON.stringify(old), original);
  assert.equal(section(result, 'templates', 'backend-python').body, custom.body);
  assert.equal(section(result, 'templates', 'backend-python').minutes, section(latest, 'templates', 'backend-python').minutes);
  assert.deepEqual(lesson(result, 'templates').sections.map(s => s.id), lesson(old, 'templates').sections.map(s => s.id));
  assert.equal(lesson(result, 'templates').durationMinutes, 99);
});
