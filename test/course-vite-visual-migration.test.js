import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousViteVisualDefault } from '../src/previous-vite-visual-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const web = course => course.lessons.find(item => item.id === 'web');
const changedIds = () => web(latest).sections.filter(item => {
  const old = previousViteVisualDefault.sections.find(section => section.id === item.id);
  return old && old.body !== item.body;
}).map(item => item.id);
const section = (course, id) => web(course).sections.find(item => item.id === id);
function oldDraft() {
  const course = copy(latest);
  course.lessons[course.lessons.findIndex(item => item.id === 'web')] = copy(previousViteVisualDefault);
  return course;
}

test('saved and recovery drafts receive unchanged frontend lesson defaults', () => {
  const ids = changedIds();
  assert.ok(ids.length, 'frontend content must change');
  const old = oldDraft();
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'old' })],
  ]);
  const snapshot = [...entries];
  const read = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [read.stored, read.recovery.course]) {
    for (const id of ids) assert.equal(section(course, id).body, section(latest, id).body);
  }
  assert.deepEqual([...entries], snapshot);
});

test('authored frontend text and order survive updated defaults', () => {
  const old = oldDraft();
  const id = changedIds()[0];
  section(old, id).body = '강사가 직접 작성한 프론트엔드 설명';
  web(old).sections.reverse();
  web(old).durationMinutes = 99;
  const result = upgradeNineDefaults(old, latest);
  assert.equal(section(result, id).body, '강사가 직접 작성한 프론트엔드 설명');
  assert.deepEqual(web(result).sections.filter(item => web(old).sections.some(previous => previous.id === item.id)).map(item => item.id), web(old).sections.map(item => item.id));
  assert.ok(web(result).sections.some(item => item.id === 'web-json-card'));
  assert.ok(web(result).sections.some(item => item.id === 'web-future-backend'));
  assert.equal(web(result).durationMinutes, 99);
});
