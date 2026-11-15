import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, resolveLessonAlias, migrateSevenCourse, migrateCourse, upgradeCourseDefaults } from '../src/course-storage.js';
import { validateCourse } from '../src/course.js';
import { previousIdeDefault } from '../src/previous-ide-default.js';
import { previousEightDefault } from '../src/previous-eight-default.js';

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

const section = (id, body = id) => ({ id, body, title: id, minutes: 3, optional: false });
const demo = (id, code = id) => ({ id, code });
const codingBase = { lessons: [{ id: 'web-coding', title: '웹 코딩', durationMinutes: 9,
  sections: [section('tools-html', '기본 HTML'), section('tools-css', '기본 CSS'), section('tools-javascript', '기본 JS')],
  steps: [demo('html-practice'), demo('css-practice'), demo('javascript-practice')] }] };
const sevenCourse = () => ({ schemaVersion: 1, title: '내 수업', author: '강사', lessons:
  ['git', 'terminal', 'github', 'markdown', 'ide', 'web', 'templates'].map((id, index) => ({
    id, number: index + 1, title: `내 ${id}`, durationMinutes: 3,
    sections: id === 'ide' ? [section('custom', '직접 추가'), section('tools-css', '내 CSS'), section('tools-html', '내 HTML'), section('tools-javascript', '내 JS')]
      : [section(`${id}-body`)],
    steps: id === 'ide' ? [demo('custom-demo', '사용자 시연'), demo('css-practice', '수정한 CSS'), demo('html-practice', '수정한 HTML'), demo('javascript-practice', '수정한 JS')]
      : [demo(`${id}-demo`)]
  })) });

test('seven-topic drafts migrate a copy, retaining authored order, custom material and moved section contents', () => {
  const prior = sevenCourse();
  const before = JSON.stringify(prior);
  const result = migrateSevenCourse(prior, codingBase);
  assert.equal(JSON.stringify(prior), before, 'original snapshot remains unchanged');
  assert.deepEqual(result.lessons.map(l => l.id), ['git', 'terminal', 'github', 'markdown', 'ide', 'web-coding', 'web', 'templates']);
  assert.deepEqual(result.lessons.map(l => l.number), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(result.title, '내 수업');
  const ide = result.lessons.find(l => l.id === 'ide');
  const coding = result.lessons.find(l => l.id === 'web-coding');
  assert.equal(ide.title, '내 ide');
  assert.equal(ide.sections[0].body, '직접 추가');
  assert.equal(ide.steps[0].code, '사용자 시연');
  assert.deepEqual(coding.sections.map(s => [s.id, s.body]), [['tools-css', '내 CSS'], ['tools-html', '내 HTML'], ['tools-javascript', '내 JS']]);
  assert.deepEqual(coding.steps.map(s => [s.id, s.code]), [['css-practice', '수정한 CSS'], ['html-practice', '수정한 HTML'], ['javascript-practice', '수정한 JS']]);
});

test('deleted sections stay deleted; only an entirely empty new topic gets a minimal starter', () => {
  const partial = sevenCourse();
  const ide = partial.lessons.find(l => l.id === 'ide');
  ide.sections = ide.sections.filter(s => s.id !== 'tools-css');
  assert.deepEqual(migrateSevenCourse(partial, codingBase).lessons.find(l => l.id === 'web-coding').sections.map(s => s.id), ['tools-html', 'tools-javascript']);
  ide.sections = ide.sections.filter(s => !s.id.startsWith('tools-'));
  ide.steps = ide.steps.filter(s => s.id === 'custom-demo');
  const fallback = migrateSevenCourse(partial, codingBase).lessons.find(l => l.id === 'web-coding');
  assert.deepEqual(fallback.sections.map(s => s.id), ['tools-html']);
  assert.deepEqual(fallback.steps.map(s => s.id), ['html-practice']);
});

test('splitting an old IDE preserves a manually edited duration and recalculates a synchronized duration', () => {
  const manuallyEdited = sevenCourse();
  manuallyEdited.lessons.find(l => l.id === 'ide').durationMinutes = 81;
  const migrated = migrateSevenCourse(manuallyEdited, codingBase);
  assert.equal(migrated.lessons.find(l => l.id === 'ide').durationMinutes, 81);
  const synchronized = sevenCourse();
  const originalIde = synchronized.lessons.find(l => l.id === 'ide');
  originalIde.durationMinutes = originalIde.sections.reduce((sum, s) => sum + (!s.optional ? s.minutes : 0), 0);
  const result = migrateSevenCourse(synchronized, codingBase);
  assert.equal(result.lessons.find(l => l.id === 'ide').durationMinutes, 3);
  assert.equal(result.lessons.find(l => l.id === 'web-coding').durationMinutes, 9);
});

test('old saved and dirty recovery drafts are converted without altering their browser backup or sync revision', () => {
  const prior = sevenCourse();
  const draft = sevenCourse();
  draft.lessons.find(l => l.id === 'ide').sections.find(s => s.id === 'tools-html').body = '';
  const s = storage({ 'dolbeom.course.v2': prior, 'dolbeom.working.v3': { dirty: true, course: draft, baseRevision: 'old-revision' } });
  const before = s.contents();
  const result = readCourseDrafts(s, { local: true, baseCourse: codingBase });
  assert.equal(result.migratedFromSeven, true);
  assert.equal(result.stored.lessons.length, 8);
  assert.equal(result.recovery.baseRevision, 'old-revision');
  assert.equal(result.recovery.course.lessons.find(l => l.id === 'web-coding').sections.find(s => s.id === 'tools-html').body, '', 'unfinished input is retained');
  assert.deepEqual(s.contents(), before, 'old storage keys remain untouched');
});

test('new-generation and explicitly dismissed drafts do not resurrect old seven-topic data', () => {
  const prior = sevenCourse();
  const newer = { title: 'new-generation' };
  const s = storage({ 'dolbeom.course.v2': prior, 'dolbeom.working.v3': { dirty: true, course: prior }, [COURSE_STORAGE.draft]: newer });
  assert.deepEqual(readCourseDrafts(s, { baseCourse: codingBase }).stored, newer);
  assert.equal(readCourseDrafts(s, { baseCourse: codingBase }).recovery, null);
  assert.equal(readCourseDrafts(s, { baseCourse: codingBase }).migratedFromSeven, false);
  const dismissed = storage({ 'dolbeom.course.v2': prior, [COURSE_STORAGE.previousDismissed]: true });
  assert.equal(readCourseDrafts(dismissed, { baseCourse: codingBase }).stored, null);
});

test('a realistic old course migrates into the current schema without losing edited HTML', () => {
  const base = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const previous = structuredClone(base);
  previous.lessons = previous.lessons.filter(l => l.id !== 'web-tools');
  for (const id of ['web', 'templates']) previous.lessons[previous.lessons.findIndex(l => l.id === id)] = structuredClone(previousEightDefault[id]);
  const webIndex = previous.lessons.findIndex(l => l.id === 'web-coding');
  const [coding] = previous.lessons.splice(webIndex, 1);
  const ide = previous.lessons.find(l => l.id === 'ide');
  ide.sections.push(...coding.sections);
  ide.steps.push(...coding.steps);
  ide.sections.find(s => s.id === 'tools-html').body += '\n\n나의 수정';
  previous.lessons.forEach((l, i) => { l.number = i + 1; });
  const migrated = migrateCourse(previous, base);
  assert.doesNotThrow(() => validateCourse(migrated));
  assert.match(migrated.lessons.find(l => l.id === 'web-coding').sections.find(s => s.id === 'tools-html').body, /나의 수정/);
});

function olderEightDraft(base) {
  const draft = structuredClone(base);
  const ide = draft.lessons.find(l => l.id === 'ide');
  Object.assign(ide, structuredClone(previousIdeDefault.metadata));
  ide.sections[ide.sections.findIndex(s => s.id === 'codex-context')] = structuredClone(previousIdeDefault.section);
  ide.steps[ide.steps.findIndex(s => s.id === 'tools-05')] = structuredClone(previousIdeDefault.step);
  ide.durationMinutes = ide.sections.reduce((sum, s) => sum + (!s.optional ? s.minutes : 0), 0);
  return draft;
}

test('an eight-topic saved draft updates only unchanged old default integration and metadata', () => {
  const base = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const saved = olderEightDraft(base);
  const before = JSON.stringify(saved);
  const s = storage({ [COURSE_STORAGE.draft]: saved });
  const beforeStorage = s.contents();
  const result = readCourseDrafts(s, { baseCourse: base });
  assert.equal(result.upgradedDefaults, true);
  const updated = result.stored.lessons.find(l => l.id === 'ide');
  const newest = base.lessons.find(l => l.id === 'ide');
  assert.deepEqual(updated.sections.find(x => x.id === 'codex-context'), newest.sections.find(x => x.id === 'codex-context'));
  assert.deepEqual(updated.steps.find(x => x.id === 'tools-05'), newest.steps.find(x => x.id === 'tools-05'));
  assert.equal(updated.durationMinutes, newest.durationMinutes);
  assert.equal(updated.title, newest.title);
  assert.deepEqual(updated.objectives, newest.objectives);
  assert.equal(JSON.stringify(saved), before);
  assert.deepEqual(s.contents(), beforeStorage, 'reading upgraded defaults does not overwrite backup');
});

test('custom integration, step, metadata and explicitly edited duration remain untouched', () => {
  const base = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const saved = olderEightDraft(base);
  const ide = saved.lessons.find(l => l.id === 'ide');
  ide.sections.find(s => s.id === 'codex-context').body += '\n\n나의 추가 내용';
  ide.steps.find(s => s.id === 'tools-05').description = '내 시연 설명';
  ide.title = '내가 정한 제목';
  ide.presentation.demo.file = '내 시연 파일';
  ide.durationMinutes = 99;
  const previousSection = structuredClone(ide.sections.find(s => s.id === 'codex-context'));
  const updated = upgradeCourseDefaults(saved, base).lessons.find(l => l.id === 'ide');
  assert.deepEqual(updated.sections.find(s => s.id === 'codex-context'), previousSection);
  assert.equal(updated.steps.find(s => s.id === 'tools-05').description, '내 시연 설명');
  assert.equal(updated.title, '내가 정한 제목');
  assert.equal(updated.presentation.demo.file, '내 시연 파일');
  assert.equal(updated.durationMinutes, 99);
  assert.equal(updated.subtitle, base.lessons.find(l => l.id === 'ide').subtitle, 'other unchanged metadata can update');
});

test('old seven-topic snapshots get the latest untouched integration after migration', () => {
  const base = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const draft = olderEightDraft(base);
  draft.lessons = draft.lessons.filter(l => l.id !== 'web-tools');
  for (const id of ['web', 'templates']) draft.lessons[draft.lessons.findIndex(l => l.id === id)] = structuredClone(previousEightDefault[id]);
  const coding = draft.lessons.splice(draft.lessons.findIndex(l => l.id === 'web-coding'), 1)[0];
  const ide = draft.lessons.find(l => l.id === 'ide');
  ide.sections.push(...coding.sections); ide.steps.push(...coding.steps); ide.durationMinutes = 65;
  draft.lessons.forEach((l, i) => { l.number = i + 1; });
  const result = migrateCourse(draft, base);
  assert.equal(result.lessons.find(l => l.id === 'ide').sections.find(s => s.id === 'codex-context').minutes, 7);
  assert.equal(result.lessons.find(l => l.id === 'ide').durationMinutes, 38);
  assert.doesNotThrow(() => validateCourse(result));
});
