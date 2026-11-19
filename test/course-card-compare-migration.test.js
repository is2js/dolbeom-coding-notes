import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousLiveWebDefault } from '../src/previous-live-web-default.js';

const copy = value => structuredClone(value);
const web = course => course.lessons.find(lesson => lesson.id === 'web');
const section = lesson => lesson.sections.find(item => item.id === 'web-http');
const step = lesson => lesson.steps.find(item => item.id === 'web-02');
const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
function oldDraft() {
  const course = copy(latest);
  course.lessons[course.lessons.findIndex(item => item.id === 'web')] = copy(previousLiveWebDefault);
  return course;
}
function storage(entries) {
  const values = new Map(Object.entries(entries).map(([key, value]) => [key, JSON.stringify(value)]));
  return { getItem: key => values.get(key) ?? null, snapshot: () => [...values] };
}

test('released Live Server draft and recovery receive the actual updated card comparison', () => {
  const old = oldDraft();
  const expected = web(latest);
  assert.notDeepEqual(section(web(old)), section(expected));
  assert.notDeepEqual(step(web(old)), step(expected));
  assert.notDeepEqual(web(old).presentation.demo, expected.presentation.demo);
  assert.notDeepEqual(web(old).checklist, expected.checklist);
  const s = storage({ [COURSE_STORAGE.draft]: old, [COURSE_STORAGE.recovery]: { dirty: true, course: old, baseRevision: 'old' } });
  const before = s.snapshot();
  const result = readCourseDrafts(s, { baseCourse: latest, local: true });
  assert.equal(result.upgradedDefaults, true);
  for (const course of [result.stored, result.recovery.course]) {
    assert.deepEqual(section(web(course)), section(expected));
    assert.deepEqual(step(web(course)), step(expected));
    assert.deepEqual(web(course).presentation, expected.presentation);
    assert.deepEqual(web(course).checklist, expected.checklist);
  }
  assert.equal(result.recovery.baseRevision, 'old');
  assert.deepEqual(s.snapshot(), before);
});

test('updated defaults do not overwrite authored web fields or ordering', () => {
  const old = oldDraft();
  const lesson = web(old);
  section(lesson).body = '사용자가 직접 작성한 설명';
  step(lesson).code = '사용자가 직접 작성한 시연';
  lesson.presentation.demo = '직접 작성한 발표 메모';
  lesson.sections.reverse();
  lesson.sections.push({ ...copy(lesson.sections[0]), id: 'custom-section', body: '추가한 강의 내용' });
  lesson.durationMinutes = 77;
  const original = JSON.stringify(old);
  const result = upgradeNineDefaults(old, latest);
  const updated = web(result);
  assert.equal(JSON.stringify(old), original);
  assert.equal(section(updated).body, '사용자가 직접 작성한 설명');
  assert.equal(section(updated).title, section(web(latest)).title);
  assert.equal(step(updated).code, '사용자가 직접 작성한 시연');
  assert.equal(step(updated).description, step(web(latest)).description);
  assert.equal(updated.presentation.demo, '직접 작성한 발표 메모');
  assert.deepEqual(updated.checklist, web(latest).checklist);
  assert.deepEqual(updated.sections.filter(item => lesson.sections.some(oldItem => oldItem.id === item.id)).map(item => item.id), lesson.sections.map(item => item.id));
  assert.ok(updated.sections.some(item => item.id === 'web-json-card'));
  assert.ok(updated.sections.some(item => item.id === 'web-future-backend'));
  assert.equal(updated.sections.find(item => item.id === 'custom-section').body, '추가한 강의 내용');
  assert.equal(updated.durationMinutes, 77);
});
