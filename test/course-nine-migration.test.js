import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { migrateCourse, migrateEightCourse, readCourseDrafts, COURSE_STORAGE } from '../src/course-storage.js';
import { validateCourse } from '../src/course.js';
import { previousEightDefault } from '../src/previous-eight-default.js';

const copy = value => structuredClone(value);
function fixture() {
  const current = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const old = copy(current);
  old.lessons = old.lessons.filter(lesson => lesson.id !== 'web-tools');
  for (const id of ['web', 'templates']) old.lessons[old.lessons.findIndex(lesson => lesson.id === id)] = copy(previousEightDefault[id]);
  old.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  const latest = copy(old);
  const previous = previousEightDefault.templates;
  const tool = copy(previous);
  tool.id = 'web-tools';
  tool.sections = previous.sections.filter(s => ['frontend-css','frontend-alpine','frontend-bonus'].includes(s.id)).map(copy);
  tool.steps = previous.steps.filter(s => ['frontend-02','frontend-03','frontend-06','frontend-08'].includes(s.id)).map(copy);
  tool.sections.find(s => s.id === 'frontend-css').body = '새 Tailwind 기본 본문';
  const backend = latest.lessons.find(lesson => lesson.id === 'templates');
  backend.sections = backend.sections.filter(s => !['frontend-css','frontend-alpine','frontend-bonus'].includes(s.id));
  backend.sections[0].body = '새 백엔드 기본 본문';
  backend.sections.unshift({ ...copy(backend.sections[0]), id: 'backend-sqlite', body: '새 SQLite', title: 'SQLite' });
  backend.steps = backend.steps.filter(s => ['web-06','web-07','frontend-01'].includes(s.id));
  const web = latest.lessons.find(lesson => lesson.id === 'web');
  web.sections.find(s => s.id === 'web-map').body = '새 프론트 기본 본문';
  latest.lessons.splice(latest.lessons.findIndex(lesson => lesson.id === 'web-coding') + 1, 0, tool);
  latest.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  return { old, latest };
}

function storage(entries) {
  const values = new Map(Object.entries(entries).map(([key,value]) => [key,JSON.stringify(value)]));
  return { getItem: key => values.get(key) ?? null, snapshot: () => [...values] };
}

test('eight-topic drafts migrate to nine, moving changed sections without touching old snapshot', () => {
  const { old, latest } = fixture();
  old.lessons.reverse(); old.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  const prior = old.lessons.find(l => l.id === 'templates');
  prior.sections.find(s => s.id === 'frontend-css').body = '사용자가 고친 CSS';
  prior.sections = prior.sections.filter(s => s.id !== 'frontend-alpine');
  prior.sections[0].title = '직접 정한 Jinja 제목';
  prior.steps.find(s => s.id === 'frontend-04').description = '사용자 시연 보존';
  old.lessons.find(l => l.id === 'web').sections.find(s => s.id === 'web-http').body = '사용자 웹 본문';
  const before = JSON.stringify(old);
  const migrated = migrateEightCourse(old, latest);
  assert.equal(JSON.stringify(old), before);
  const tool = migrated.lessons.find(l => l.id === 'web-tools');
  const backend = migrated.lessons.find(l => l.id === 'templates');
  assert.equal(tool.sections.find(s => s.id === 'frontend-css').body, '사용자가 고친 CSS');
  assert.ok(!tool.sections.some(s => s.id === 'frontend-alpine'), 'a deleted old lesson is not resurrected');
  assert.equal(tool.steps.find(s => s.id === 'frontend-04').description, '사용자 시연 보존');
  assert.equal(backend.sections.find(s => s.id === 'web-jinja').title, '직접 정한 Jinja 제목');
  assert.equal(backend.sections.find(s => s.id === 'web-jinja').body, '새 백엔드 기본 본문');
  assert.ok(backend.sections.some(s => s.id === 'backend-sqlite'));
  assert.ok(backend.sections.findIndex(s => s.id === 'backend-sqlite') < backend.sections.findIndex(s => s.id === 'web-jinja'));
  assert.equal(migrated.lessons.find(l => l.id === 'web').sections.find(s => s.id === 'web-http').body, '사용자 웹 본문');
  assert.equal(migrated.lessons[migrated.lessons.findIndex(l => l.id === 'web-coding') + 1].id, 'web-tools');
  assert.doesNotThrow(() => validateCourse(migrated));
});

test('seven-topic drafts chain both migrations without losing authored HTML', () => {
  const { old, latest } = fixture();
  const coding = old.lessons.splice(old.lessons.findIndex(l => l.id === 'web-coding'),1)[0];
  const ide = old.lessons.find(l => l.id === 'ide');
  coding.sections[0].body = '직접 고친 HTML';
  ide.sections.push(...coding.sections); ide.steps.push(...coding.steps);
  old.lessons.forEach((lesson,index) => { lesson.number = index + 1; });
  const migrated = migrateCourse(old, latest);
  assert.equal(migrated.lessons.length, 9);
  assert.equal(migrated.lessons.find(l => l.id === 'web-coding').sections[0].body, '직접 고친 HTML');
  assert.doesNotThrow(() => validateCourse(migrated));
});

test('eight-topic saved and dirty recovery keys stay intact during migration', () => {
  const { old, latest } = fixture();
  const recovery = copy(old);
  recovery.lessons.find(l => l.id === 'templates').sections.find(s => s.id === 'frontend-css').body = '';
  const s = storage({ 'dolbeom.course.v3': old, 'dolbeom.working.v4': { course: recovery, dirty: true, baseRevision: 'prior' } });
  const before = s.snapshot();
  const result = readCourseDrafts(s, { local: true, baseCourse: latest });
  assert.equal(result.migratedFromEight, true);
  assert.equal(result.stored.lessons.length, 9);
  assert.equal(result.recovery.baseRevision, 'prior');
  assert.equal(result.recovery.course.lessons.find(l => l.id === 'web-tools').sections.find(s => s.id === 'frontend-css').body, '');
  assert.deepEqual(s.snapshot(), before);
  assert.equal(s.getItem(COURSE_STORAGE.draft), null);
});
