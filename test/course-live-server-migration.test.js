import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, migrateCourse, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousNineDefault } from '../src/previous-nine-default.js';

const copy = value => structuredClone(value);
const find = (course, id) => course.lessons.find(lesson => lesson.id === id);
const section = (course, lessonId, id) => find(course, lessonId).sections.find(item => item.id === id);
function fixture() {
  const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  // Test actual older published data even if the source lesson is being edited.
  const old = copy(latest);
  for (const id of Object.keys(previousNineDefault)) old.lessons[old.lessons.findIndex(l => l.id === id)] = copy(previousNineDefault[id]);
  const next = copy(latest);
  section(next, 'web', 'web-http').body = '새 Live Server 안내';
  section(next, 'templates', 'backend-python').body = '새 FastAPI 안내';
  section(next, 'web-coding', 'tools-html').body = '새 HTML 안내';
  return { old, next };
}
function storage(entries) {
  const values = new Map(Object.entries(entries).map(([key, value]) => [key, JSON.stringify(value)]));
  return { getItem: key => values.get(key) ?? null, snapshot: () => [...values] };
}

test('previous nine-topic defaults update while old saved and recovery keys remain untouched', () => {
  const { old, next } = fixture();
  const s = storage({ [COURSE_STORAGE.draft]: old, [COURSE_STORAGE.recovery]: { dirty: true, course: old, baseRevision: 'old' } });
  const before = s.snapshot();
  const result = readCourseDrafts(s, { baseCourse: next, local: true });
  assert.equal(result.upgradedDefaults, true);
  for (const course of [result.stored, result.recovery.course]) {
    assert.equal(section(course, 'web', 'web-http').body, '새 Live Server 안내');
    assert.equal(section(course, 'templates', 'backend-python').body, '새 FastAPI 안내');
    assert.equal(section(course, 'web-coding', 'tools-html').body, '새 HTML 안내');
  }
  assert.equal(result.recovery.baseRevision, 'old');
  assert.deepEqual(s.snapshot(), before);
});

test('nine-topic default upgrade retains authored body, added sections, order and manual duration', () => {
  const { old, next } = fixture();
  const web = find(old, 'web');
  section(old, 'web', 'web-http').body = '수강생이 쓴 내용';
  web.sections.reverse();
  web.sections.push({ ...copy(web.sections[0]), id: 'custom-section', body: '내 추가 설명' });
  web.durationMinutes = 77;
  const original = JSON.stringify(old);
  const updated = upgradeNineDefaults(old, next);
  assert.equal(JSON.stringify(old), original);
  assert.equal(section(updated, 'web', 'web-http').body, '수강생이 쓴 내용');
  assert.deepEqual(find(updated, 'web').sections.map(s => s.id), web.sections.map(s => s.id));
  assert.equal(section(updated, 'web', 'custom-section').body, '내 추가 설명');
  assert.equal(find(updated, 'web').durationMinutes, 77);
  assert.equal(section(updated, 'templates', 'backend-python').body, '새 FastAPI 안내');
  assert.equal(section(updated, 'web-coding', 'tools-html').body, '새 HTML 안내');
  assert.equal(migrateCourse(old, next).lessons.length, 9);
});
