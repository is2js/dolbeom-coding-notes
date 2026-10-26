import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSE_STORAGE, readCourseDrafts, resolveLessonAlias } from '../src/course-storage.js';

const oldCourse = { schemaVersion: 1, lessons: ['terminal','tools','web','frontend','git','codex'].map(id => ({ id, title: '' })) };
function storage(entries) {
  const values = new Map(Object.entries(entries).map(([key, value]) => [key, JSON.stringify(value)]));
  return { getItem: key => values.get(key) ?? null, contents: () => [...values] };
}

test('the new curriculum reads its own drafts without modifying old browser data', () => {
  const draft = { title: '새 7강 편집본' };
  const recovery = { dirty: true, course: draft };
  const s = storage({ [COURSE_STORAGE.draft]: draft, [COURSE_STORAGE.recovery]: recovery, 'dolbeom.course.v1': oldCourse });
  const before = s.contents();
  const result = readCourseDrafts(s, { local: true });
  assert.deepEqual(result.stored, draft);
  assert.deepEqual(result.recovery, recovery);
  assert.equal(result.legacyDraft, null);
  assert.deepEqual(s.contents(), before);
});

test('an unfinished six-lesson draft remains downloadable even with invalid titles', () => {
  const s = storage({ 'dolbeom.working.v2': { dirty: true, course: oldCourse } });
  assert.deepEqual(readCourseDrafts(s, { local: true }).legacyDraft, oldCourse);
});

test('a static-site six-lesson saved edit is retained while a clean local cache is ignored', () => {
  const s = storage({ 'dolbeom.course.v1': oldCourse, 'dolbeom.working.v2': { dirty: false, course: oldCourse } });
  assert.deepEqual(readCourseDrafts(s).legacyDraft, oldCourse);
  assert.equal(readCourseDrafts(s, { local: true }).legacyDraft, null);
});

test('old topic URLs lead to the relevant new lesson and current URLs retain their identity', () => {
  assert.equal(resolveLessonAlias('tools'), 'ide');
  assert.equal(resolveLessonAlias('frontend'), 'templates');
  assert.equal(resolveLessonAlias('codex'), 'templates');
  assert.equal(resolveLessonAlias('github'), 'github');
  assert.equal(resolveLessonAlias(undefined), undefined);
});
