import test from 'node:test';
import assert from 'node:assert/strict';
import { createEditor } from '../src/editor.js';
import { COURSE_IDS, validateCourse } from '../src/course.js';

const copy = value => JSON.parse(JSON.stringify(value));
const durationFor = index => Math.floor(180 / COURSE_IDS.length) + (index < 180 % COURSE_IDS.length ? 1 : 0);

// Small complete courses keep editor tests independent from changes to lesson copy.
function makeCourse() {
  return {
    schemaVersion: 1,
    title: '돌범이 풀어주는 AI 구독 전 코딩 필수 노하우',
    subtitle: '개발 도구와 코드를 읽는 180분',
    author: '돌범',
    lessons: COURSE_IDS.map((id, index) => ({
      id, number: index + 1, icon: id, title: `${index + 1}강 ${id}`, shortTitle: id,
      subtitle: '시연으로 확인하는 개발 기초', durationMinutes: durationFor(index),
      case: { kind: 'example', title: '교체용 사례', body: 'Codex와 작업하던 상황입니다.', question: '무엇을 확인해야 할까요?' },
      objectives: ['변경 내용을 읽을 수 있다.'],
      sections: [
        { id: `${id}-first`, title: '첫 개념', minutes: Math.floor(durationFor(index) / 2), optional: false, body: '## 개념\n\n첫 설명입니다.' },
        { id: `${id}-second`, title: '다음 개념', minutes: Math.ceil(durationFor(index) / 2), optional: false, body: '다음 설명입니다.' },
        { id: `${id}-bonus`, title: '보충 자료', minutes: 3, optional: true, body: '더 알아볼 내용입니다.' },
      ],
      pitfalls: [{ title: '작업 위치', body: '현재 폴더를 확인합니다.' }],
      checklist: ['변경 내용을 확인했다.'],
      steps: [
        { id: `${id}-step-one`, title: '첫 시연', description: '현재 상태를 읽습니다.', scene: 'terminal', code: 'pwd', language: 'powershell', output: 'C:\\course', focus: '현재 위치', fileName: 'PowerShell', files: ['README.md'] },
        { id: `${id}-step-two`, title: '다음 시연', description: '파일을 확인합니다.', scene: 'vscode', code: '# Hello', language: 'markdown', output: 'Hello', focus: 'README', fileName: 'README.md', files: ['README.md'] },
      ],
      glossary: [{ term: '현재 위치', definition: '명령어를 실행하는 폴더입니다.' }],
      references: [{ title: 'Alpine 공식 문서', url: 'https://alpinejs.dev/start-here' }],
      closing: '다음 작업에서도 직접 확인해 보세요.',
    })),
  };
}

function harness(overrides = {}) {
  const base = validateCourse(makeCourse());
  let current = copy(base);
  const calls = { applied: [], resets: 0, toasts: [] };
  const editor = createEditor({
    getCourse: () => current,
    onApply: course => { current = copy(course); calls.applied.push(copy(course)); },
    onReset: () => { calls.resets += 1; current = copy(base); },
    toast: value => calls.toasts.push(value),
    renderMarkdown: value => `<p>${value}</p>`,
    ...overrides,
  });
  editor.open();
  return { editor, calls, base, current: () => current };
}

function fileEvent(text) {
  return { target: { files: [new File([text], 'course.json', { type: 'application/json' })], value: 'course.json' } };
}

test('edits are isolated until debounced validation applies the complete course', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls, current } = harness();
  editor.activeLesson.case.kind = 'real';
  editor.activeLesson.case.body = '실제 Codex 개발 과정에서 경로를 잘못 읽었습니다.';
  editor.changed();
  t.mock.timers.tick(300);
  editor.activeLesson.title = '터미널에서 작업 위치 확인하기';
  editor.changed();
  t.mock.timers.tick(649);
  assert.equal(calls.applied.length, 0, 'a new edit restarts the autosave debounce');
  assert.notEqual(current().lessons[0].title, editor.activeLesson.title);
  assert.equal(editor.status, 'pending');
  t.mock.timers.tick(1);
  await Promise.resolve();
  assert.equal(calls.applied.length, 1);
  assert.equal(current().lessons.length, 7);
  assert.equal(current().lessons[0].title, editor.activeLesson.title);
  assert.equal(current().lessons[0].case.kind, 'real');
  assert.equal(editor.status, 'saved');
  assert.equal(editor.error, '');
  assert.ok(editor.lastSaved);
  editor.activeLesson.title = '아직 적용하지 않은 다음 수정';
  assert.notEqual(current().lessons[0].title, editor.activeLesson.title, 'applied data must not share the working draft reference');
});

test('invalid working input stays visible across editor revisits and never replaces the saved course', async () => {
  const { editor, calls, current } = harness();
  const savedTitle = current().lessons[0].title;
  editor.activeLesson.title = '';
  assert.equal(await editor.save(), false);
  assert.equal(editor.status, 'error');
  assert.match(editor.error, /제목/);
  assert.equal(calls.applied.length, 0);
  assert.equal(current().lessons[0].title, savedTitle);
  const unsavedDraft = editor.working;
  editor.open();
  assert.equal(editor.working, unsavedDraft);
  assert.equal(editor.activeLesson.title, '');
  editor.activeLesson.title = '고친 제목';
  assert.equal(await editor.save(), true);
  assert.equal(editor.error, '');
  assert.equal(current().lessons[0].title, '고친 제목');
});

test('malformed or unsupported imports preserve all existing draft input', async () => {
  const { editor, calls, current } = harness();
  editor.activeLesson.title = '아직 저장하지 않은 제목';
  editor.activeLesson.sections[0].body = '';
  const existing = copy(editor.working);
  const sixLessonImport = makeCourse();
  sixLessonImport.lessons = sixLessonImport.lessons.slice(0, 6);
  for (const text of ['{ invalid JSON', JSON.stringify({ schemaVersion: 99 }), JSON.stringify({ ...makeCourse(), lessons: [] }), JSON.stringify(sixLessonImport)]) {
    const event = fileEvent(text);
    await editor.importFile(event);
    assert.deepEqual(editor.working, existing);
    assert.equal(calls.applied.length, 0);
    assert.notEqual(current().lessons[0].title, existing.lessons[0].title);
    assert.ok(editor.importError);
    assert.equal(editor.busy, false);
    assert.equal(event.target.value, '', 'same failed file may be selected again');
  }
});

test('oversized imports fail before reading or replacing the existing draft', async () => {
  const { editor, calls } = harness();
  editor.activeLesson.title = '내 수정 내용';
  let read = false;
  await editor.importFile({ target: { value: 'large.json', files: [{ size: 5 * 1024 * 1024 + 1, text: async () => { read = true; return '{}'; } }] } });
  assert.equal(read, false);
  assert.match(editor.importError, /5MB/);
  assert.equal(editor.activeLesson.title, '내 수정 내용');
  assert.equal(calls.applied.length, 0);
});

test('JSON export and import roundtrip the versioned course including Markdown, examples and scene data', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls, current } = harness();
  editor.activeLesson.case.kind = 'real';
  editor.activeLesson.case.body = '실제 사례: `git diff`로 확인한 변경입니다.\n\n**중요한 줄**';
  editor.activeLesson.sections[0].body = '## 한글과 코드\n\n```html\n<div x-data="{ open: false }">돌범</div>\n```';
  editor.activeLesson.steps[0].code = 'git diff\n# 변경 확인';
  editor.activeLesson.steps[0].files = ['src/main.js', '강의노트.md'];
  editor.selectLesson('templates');
  editor.activeLesson.title = '같은 강의 카드를 만드는 템플릿 비교';
  const expected = copy(editor.working);
  let blob;
  let clicked = false;
  let removed = false;
  let revoked;
  const link = { click: () => { clicked = true; }, remove: () => { removed = true; } };
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { createElement: tag => { assert.equal(tag, 'a'); return link; }, body: { append: node => assert.equal(node, link) } } });
  t.after(() => oldDocument ? Object.defineProperty(globalThis, 'document', oldDocument) : delete globalThis.document);
  t.mock.method(URL, 'createObjectURL', value => { blob = value; return 'blob:test-course'; });
  t.mock.method(URL, 'revokeObjectURL', value => { revoked = value; });
  await editor.exportFile();
  assert.ok(blob instanceof Blob);
  assert.equal(blob.type, 'application/json;charset=utf-8');
  assert.equal(clicked, true);
  assert.equal(removed, true);
  assert.equal(link.href, 'blob:test-course');
  assert.match(link.download, /^dolbeom-course-\d{4}-\d{2}-\d{2}\.json$/);
  const exportedText = await blob.text();
  assert.deepEqual(JSON.parse(exportedText), expected);
  assert.notDeepEqual(current(), expected, 'export is a backup and does not need to apply or synchronize the draft');
  assert.equal(calls.applied.length, 0);
  t.mock.timers.tick(1000);
  assert.equal(revoked, 'blob:test-course');
  editor.activeLesson.title = '가져오면 대체될 수정';
  const event = fileEvent(exportedText);
  await editor.importFile(event);
  assert.deepEqual(editor.working, expected);
  assert.deepEqual(current(), expected);
  assert.equal(editor.importError, '');
  assert.equal(editor.status, 'saved');
  assert.ok(calls.toasts.some(value => value.includes('가져왔습니다')));
});

test('reordering sections and demonstration steps preserves IDs and selected item', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor } = harness();
  const lesson = editor.activeLesson;
  const selectedSection = editor.sectionId;
  const firstSection = lesson.sections[0];
  editor.move(lesson.sections, 0, 1);
  assert.equal(lesson.sections[1], firstSection);
  assert.equal(editor.sectionId, selectedSection);
  assert.deepEqual(lesson.sections.map(section => section.id), ['terminal-second', 'terminal-first', 'terminal-bonus']);
  const selectedStep = editor.stepId;
  const firstStep = lesson.steps[0];
  editor.move(lesson.steps, 0, 1);
  assert.equal(lesson.steps[1], firstStep);
  assert.equal(editor.stepId, selectedStep);
  assert.deepEqual(lesson.steps.map(step => step.id), ['terminal-step-two', 'terminal-step-one']);
  editor.move(lesson.steps, 0, -1);
  editor.move(lesson.steps, 1, 1);
  assert.deepEqual(lesson.steps.map(step => step.id), ['terminal-step-two', 'terminal-step-one']);
  assert.equal(await editor.save(), true);
});

test('adding optional content leaves core timing intact and minimum-one guards preserve usable lessons', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor } = harness();
  const lesson = editor.activeLesson;
  assert.equal(editor.coreMinutes, 180);
  assert.equal(editor.bonusMinutes, COURSE_IDS.length * 3);
  editor.addSection();
  const addedSection = lesson.sections.at(-1);
  assert.ok(addedSection.id.startsWith('section-'));
  assert.equal(addedSection.optional, true);
  assert.equal(editor.coreMinutes, 180);
  assert.equal(editor.bonusMinutes, COURSE_IDS.length * 3 + 5);
  assert.equal(editor.sectionId, addedSection.id);
  editor.addStep();
  const addedStep = lesson.steps.at(-1);
  assert.ok(addedStep.id.startsWith('step-'));
  assert.equal(editor.stepId, addedStep.id);
  while (lesson.sections.length > 1) editor.removeSection(lesson.sections.length - 1);
  while (lesson.steps.length > 1) editor.removeStep(lesson.steps.length - 1);
  const sectionId = lesson.sections[0].id;
  const stepId = lesson.steps[0].id;
  editor.removeSection(0);
  editor.removeStep(0);
  assert.equal(lesson.sections.length, 1);
  assert.equal(lesson.steps.length, 1);
  assert.equal(editor.sectionId, sectionId);
  assert.equal(editor.stepId, stepId);
  assert.equal(await editor.save(), true);
});

test('file list editing keeps newlines while storing only nonempty trimmed filenames', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor } = harness();
  const step = editor.activeLesson.steps[0];
  const value = '  src/main.js  \n\nREADME.md\n';
  editor.setFiles(step, value);
  assert.deepEqual(step.files, ['src/main.js', 'README.md']);
  assert.equal(editor.filesValue(step), value);
  editor.setFiles(step, '');
  assert.deepEqual(step.files, []);
  assert.equal(editor.filesValue(step), '');
  assert.equal(await editor.save(), true);
});

test('reset needs two clicks and a new edit cancels the outstanding confirmation', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls, base, current } = harness();
  editor.activeLesson.title = '내 강의';
  await editor.save();
  await editor.reset();
  assert.equal(editor.resetConfirm, true);
  assert.equal(calls.resets, 0);
  assert.equal(editor.activeLesson.title, '내 강의');
  editor.activeLesson.title = '새롭게 수정';
  editor.changed();
  assert.equal(editor.resetConfirm, false);
  await editor.reset();
  assert.equal(calls.resets, 0);
  await editor.reset();
  assert.equal(calls.resets, 1);
  assert.deepEqual(editor.working, base);
  assert.deepEqual(current(), base);
  assert.equal(editor.resetConfirm, false);
  assert.equal(editor.status, 'saved');
  t.mock.timers.tick(1000);
  assert.deepEqual(current(), base, 'reset cancels any delayed autosave of the old draft');
});

test('storage callback failures keep the working draft editable and imports do not discard it', async () => {
  const { editor } = harness({ onApply: () => { throw new Error('브라우저 저장 공간이 부족합니다.'); } });
  editor.activeLesson.title = '저장 공간이 없어도 보존할 제목';
  const existing = copy(editor.working);
  assert.equal(await editor.save(), false);
  assert.deepEqual(editor.working, existing);
  assert.match(editor.error, /저장 공간/);
  await editor.importFile(fileEvent(JSON.stringify(makeCourse())));
  assert.deepEqual(editor.working, existing);
  assert.match(editor.importError, /저장 공간/);
  assert.equal(editor.busy, false);
});

test('draft recovery hooks run synchronously for invalid input before debounce and before validation', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts = [];
  let changes = 0;
  const { editor, calls } = harness({
    onDraft: (course, meta) => drafts.push({ course, meta }),
    onChange: () => { changes += 1; },
  });
  editor.activeLesson.title = '';
  editor.changed();
  assert.equal(drafts.length, 1, 'invalid input is captured immediately');
  assert.equal(drafts[0].course.lessons[0].title, '');
  assert.ok(Number.isInteger(drafts[0].meta.revision));
  assert.equal(changes, 1);
  assert.equal(calls.applied.length, 0);
  assert.equal(editor.isDirty, true);
  assert.equal(editor.hasUnsaved, true);
  editor.activeLesson.case.body = '다음 입력';
  assert.notEqual(drafts[0].course.lessons[0].case.body, '다음 입력', 'recovery receives a detached snapshot');
  assert.equal(await editor.save(), false);
  assert.equal(drafts.length, 2, 'manual save captures input even when validation fails');
  assert.equal(changes, 2);
  assert.equal(drafts[1].meta.revision, drafts[0].meta.revision);
  assert.equal(calls.applied.length, 0);
  editor.activeLesson.title = '고친 제목';
  editor.changed();
  assert.ok(drafts.at(-1).meta.revision > drafts[0].meta.revision);
  assert.equal(await editor.save(), true);
  assert.equal(editor.isDirty, false);
  assert.equal(editor.hasUnsaved, false);
});

test('clean external updates preserve selected stable IDs and dirty or error drafts reject updates', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor } = harness();
  editor.selectLesson('ide');
  editor.sectionId = 'ide-second';
  editor.stepId = 'ide-step-two';
  editor.previewSectionId = 'ide-second';
  const external = makeCourse();
  const externalLesson = external.lessons.find(lesson => lesson.id === 'ide');
  externalLesson.title = '파일에서 수정한 IDE 강의';
  externalLesson.sections.reverse();
  externalLesson.steps.reverse();
  assert.equal(editor.acceptExternal(external), true);
  assert.equal(editor.lessonId, 'ide');
  assert.equal(editor.sectionId, 'ide-second');
  assert.equal(editor.stepId, 'ide-step-two');
  assert.equal(editor.previewSectionId, 'ide-second');
  assert.equal(editor.activeLesson.title, '파일에서 수정한 IDE 강의');
  assert.equal(editor.isDirty, false);
  editor.activeLesson.title = '아직 changed()를 호출하지 않은 입력';
  assert.equal(editor.isDirty, true);
  assert.equal(editor.acceptExternal(makeCourse()), false);
  editor.changed();
  assert.equal(editor.acceptExternal(makeCourse()), false);
  editor.activeLesson.title = '';
  assert.equal(await editor.save(), false);
  assert.equal(editor.acceptExternal(makeCourse()), false);
  assert.equal(editor.activeLesson.title, '');
  const replacement = makeCourse();
  const replacementLesson = replacement.lessons.find(lesson => lesson.id === 'ide');
  replacementLesson.sections = [replacementLesson.sections[0]];
  replacementLesson.steps = [replacementLesson.steps[0]];
  editor.replaceWorking(replacement);
  assert.equal(editor.sectionId, 'ide-first', 'removed selections fall back to the first remaining item');
  assert.equal(editor.stepId, 'ide-step-one');
  assert.equal(editor.previewSectionId, '');
  assert.equal(editor.isDirty, false);
  assert.equal(editor.hasUnsaved, false);
});

test('in-flight saves block external updates even when working content matches the last acknowledgement', async () => {
  let finish;
  const { editor } = harness({ onApply: () => new Promise(resolve => { finish = resolve; }) });
  const saving = editor.save();
  assert.equal(editor.isDirty, false);
  assert.equal(editor.hasUnsaved, true, 'the save remains pending until its async callback acknowledges it');
  assert.equal(editor.acceptExternal(makeCourse()), false);
  finish();
  assert.equal(await saving, true);
  assert.equal(editor.hasUnsaved, false);
  assert.equal(editor.acceptExternal(makeCourse()), true);
});

test('new edits made during an async save remain pending and its acknowledgement never replaces working input', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const submitted = [];
  const finishes = [];
  const { editor } = harness({ onApply: course => {
    submitted.push(copy(course));
    return new Promise(resolve => finishes.push(resolve));
  } });
  editor.activeLesson.title = '첫 수정';
  editor.changed();
  const firstSave = editor.save();
  editor.activeLesson.title = '저장 응답을 기다리는 동안의 새 수정';
  editor.changed();
  assert.equal(submitted[0].lessons[0].title, '첫 수정', 'onApply receives the captured snapshot');
  finishes[0]();
  await firstSave;
  assert.equal(editor.activeLesson.title, '저장 응답을 기다리는 동안의 새 수정');
  assert.equal(editor.status, 'pending');
  assert.equal(editor.isDirty, true);
  assert.equal(editor.hasUnsaved, true);
  assert.equal(editor.acceptExternal(makeCourse()), false);
  const secondSave = editor.save();
  assert.equal(submitted[1].lessons[0].title, editor.activeLesson.title);
  finishes[1]();
  await secondSave;
  assert.equal(editor.status, 'saved');
  assert.equal(editor.isDirty, false);
  assert.equal(editor.hasUnsaved, false);
});

test('explicit replacement invalidates an old pending save acknowledgement', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let finish;
  const { editor } = harness({ onApply: () => new Promise(resolve => { finish = resolve; }) });
  editor.activeLesson.title = '이전 초안';
  editor.changed();
  const pending = editor.save();
  const latest = makeCourse();
  latest.lessons[0].title = '충돌을 해결하며 선택한 최신 파일';
  editor.replaceWorking(latest);
  const cleanSnapshot = editor.acknowledgedSnapshot;
  finish();
  await pending;
  assert.deepEqual(editor.working, latest);
  assert.equal(editor.acknowledgedSnapshot, cleanSnapshot);
  assert.equal(editor.status, 'saved');
  assert.equal(editor.isDirty, false);
  assert.equal(editor.hasUnsaved, false);
  t.mock.timers.tick(1000);
  assert.deepEqual(editor.working, latest);
});

test('late acknowledgements from older saves do not roll back the latest clean baseline', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const finishes = [];
  const { editor } = harness({ onApply: () => new Promise(resolve => finishes.push(resolve)) });
  editor.activeLesson.title = '첫 번째 저장';
  editor.changed();
  const older = editor.save();
  editor.activeLesson.title = '두 번째 저장';
  editor.changed();
  const newer = editor.save();
  finishes[1]();
  await newer;
  const latestSnapshot = editor.acknowledgedSnapshot;
  finishes[0]();
  await older;
  assert.equal(editor.activeLesson.title, '두 번째 저장');
  assert.equal(editor.acknowledgedSnapshot, latestSnapshot);
  assert.equal(editor.isDirty, false);
  assert.equal(editor.status, 'saved');
});

test('restoring an invalid recovery draft keeps the project baseline and immediately recaptures input', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts = [];
  const { editor, calls, current } = harness({ onDraft: (course, meta) => drafts.push({ course, meta }) });
  const recovered = makeCourse();
  recovered.lessons[0].case.title = '';
  recovered.lessons[0].sections[0].body = '닫히기 직전 작성한 설명';
  const published = copy(current());
  editor.restoreDraft(recovered);
  assert.deepEqual(editor.working, recovered);
  assert.equal(editor.acknowledgedSnapshot, JSON.stringify(published));
  assert.equal(editor.isDirty, true);
  assert.equal(editor.hasUnsaved, true);
  assert.equal(drafts.length, 1);
  assert.deepEqual(drafts[0].course, recovered);
  editor.open();
  assert.deepEqual(editor.working, recovered);
  assert.equal(await editor.save(), false);
  assert.equal(calls.applied.length, 0);
  assert.deepEqual(current(), published);
});

test('lesson ordering renumbers array positions while preserving all topic and content IDs', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, current } = harness();
  editor.selectLesson('git');
  editor.sectionId = 'git-second';
  editor.stepId = 'git-step-two';
  const original = editor.activeLesson;
  const ids = editor.working.lessons.map(lesson => lesson.id).sort();
  editor.moveLesson(1, -1);
  assert.deepEqual(editor.working.lessons.map(lesson => lesson.id), ['git', 'terminal', 'github', 'markdown', 'ide', 'web', 'templates']);
  assert.deepEqual(editor.working.lessons.map(lesson => lesson.number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(editor.working.lessons.map(lesson => lesson.id).sort(), ids);
  assert.equal(editor.activeLesson, original);
  assert.equal(editor.lessonId, 'git');
  assert.equal(editor.sectionId, 'git-second');
  assert.equal(editor.stepId, 'git-step-two');
  const snapshot = copy(editor.working);
  editor.moveLesson(0, -1);
  editor.moveLesson(6, 1);
  assert.deepEqual(editor.working, snapshot);
  assert.equal(await editor.save(), true);
  assert.deepEqual(current(), snapshot);
});

test('offline sync never blocks a valid JSON backup and does not retry remote persistence during export', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let remoteCalls = 0;
  const drafts = [];
  const { editor } = harness({
    onApply: () => { remoteCalls += 1; throw new Error('프로젝트 파일 연결이 끊어졌습니다.'); },
    onDraft: course => drafts.push(course),
  });
  editor.activeLesson.case.body = '오프라인 중에도 잃어버리면 안 되는 실제 경험입니다.';
  editor.changed();
  assert.equal(await editor.save(), false);
  assert.equal(editor.status, 'error');
  assert.equal(remoteCalls, 1);
  let blob;
  let downloads = 0;
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    createElement: () => ({ click: () => { downloads += 1; }, remove: () => {} }),
    body: { append: () => {} },
  } });
  t.after(() => oldDocument ? Object.defineProperty(globalThis, 'document', oldDocument) : delete globalThis.document);
  t.mock.method(URL, 'createObjectURL', value => { blob = value; return 'blob:offline-backup'; });
  t.mock.method(URL, 'revokeObjectURL', () => {});
  await editor.exportFile();
  assert.equal(downloads, 1);
  assert.equal(remoteCalls, 1, 'export must not wait for a successful onApply');
  assert.deepEqual(JSON.parse(await blob.text()), editor.working);
  assert.deepEqual(drafts.at(-1), editor.working);
  assert.equal(editor.hasUnsaved, true, 'exporting does not acknowledge unsynchronized data');
  assert.equal(editor.isDirty, true);
  t.mock.timers.tick(1000);
});

test('apply callbacks identify normal edits and imported replacements', async () => {
  const applied = [];
  const { editor } = harness({ onApply: (course, meta) => applied.push({ course, meta }) });
  editor.activeLesson.title = '새 제목';
  await editor.save();
  assert.equal(applied[0].meta.source, 'edit');
  assert.ok(Number.isInteger(applied[0].meta.revision));
  assert.equal(applied[0].course.lessons[0].title, '새 제목');
  const imported = makeCourse();
  imported.lessons[0].title = '가져온 제목';
  await editor.importFile(fileEvent(JSON.stringify(imported)));
  assert.deepEqual(applied[1].meta, { source: 'import' });
  assert.deepEqual(applied[1].course, imported);
  assert.deepEqual(editor.working, imported);
});

test('acknowledge marks an exactly matching draft clean without replacing its object or selection', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls } = harness();
  editor.selectLesson('templates');
  editor.sectionId = 'templates-second';
  editor.activeLesson.title = '충돌 해결 후 저장한 제목';
  editor.changed();
  editor.error = '이전 충돌 오류';
  const working = editor.working;
  assert.equal(editor.acknowledge(copy(working)), true);
  assert.equal(editor.working, working);
  assert.equal(editor.lessonId, 'templates');
  assert.equal(editor.sectionId, 'templates-second');
  assert.equal(editor.status, 'saved');
  assert.equal(editor.error, '');
  assert.equal(editor.hasUnsaved, false);
  assert.equal(editor.isDirty, false);
  assert.ok(editor.lastSaved);
  t.mock.timers.tick(1000);
  assert.equal(calls.applied.length, 0, 'an acknowledged current draft no longer needs the old debounce save');
});

test('acknowledging an earlier resolved snapshot preserves newer input, errors and its pending save', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let finish;
  const snapshots = [];
  const { editor } = harness({ onApply: course => {
    snapshots.push(copy(course));
    if (snapshots.length === 1) return new Promise(resolve => { finish = resolve; });
  } });
  editor.activeLesson.title = '먼저 제출한 이전 초안';
  editor.changed();
  const oldSave = editor.save();
  const resolved = copy(editor.working);
  editor.activeLesson.title = '해결 응답을 기다리다가 더 작성한 초안';
  editor.changed();
  editor.error = '아직 확인해야 할 메시지';
  const currentDraft = copy(editor.working);
  assert.equal(editor.acknowledge(resolved), false);
  assert.deepEqual(editor.working, currentDraft);
  assert.equal(editor.acknowledgedSnapshot, JSON.stringify(resolved));
  assert.equal(editor.status, 'pending');
  assert.equal(editor.error, '아직 확인해야 할 메시지');
  assert.equal(editor.lastSaved, '');
  assert.equal(editor.isDirty, true);
  finish();
  await oldSave;
  assert.equal(editor.status, 'pending');
  assert.deepEqual(editor.working, currentDraft);
  t.mock.timers.tick(650);
  await Promise.resolve();
  assert.equal(snapshots.length, 2, 'the newer draft keeps its autosave timer');
  assert.deepEqual(snapshots[1], currentDraft);
  assert.equal(editor.status, 'saved');
  assert.equal(editor.isDirty, false);
});

test('starting a file operation cancels the old autosave before waiting for its remote file read', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls } = harness();
  editor.activeLesson.title = '파일 버전을 선택하기 전의 브라우저 초안';
  editor.changed();
  t.mock.timers.tick(300);
  editor.resetConfirm = true;
  assert.equal(editor.beginFileOperation(), true);
  assert.equal(editor.busy, true);
  assert.equal(editor.resetConfirm, false);
  assert.equal(editor.beginFileOperation(), false, 'a second file operation cannot start while one is pending');
  t.mock.timers.tick(2000);
  await Promise.resolve();
  assert.equal(calls.applied.length, 0, 'the old draft must not PUT while the chosen file version is loading');
  editor.replaceWorking(makeCourse());
  editor.busy = false;
  t.mock.timers.tick(1000);
  assert.equal(calls.applied.length, 0);
  assert.equal(editor.isDirty, false);
});

test('a recovery-storage quota error still permits a valid downloadable JSON backup', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls } = harness({ onDraft: () => { throw new Error('브라우저 초안 저장 공간이 부족합니다. JSON으로 백업해 주세요.'); } });
  editor.activeLesson.title = '브라우저 저장 공간이 없어도 백업할 내용';
  editor.changed();
  let blob;
  let downloads = 0;
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    createElement: () => ({ click: () => { downloads += 1; }, remove: () => {} }),
    body: { append: () => {} },
  } });
  t.after(() => oldDocument ? Object.defineProperty(globalThis, 'document', oldDocument) : delete globalThis.document);
  t.mock.method(URL, 'createObjectURL', value => { blob = value; return 'blob:quota-backup'; });
  t.mock.method(URL, 'revokeObjectURL', () => {});
  await editor.exportFile();
  assert.equal(downloads, 1);
  assert.deepEqual(JSON.parse(await blob.text()), editor.working);
  assert.equal(calls.applied.length, 0);
  assert.equal(editor.status, 'error', 'successful backup must not hide the recovery-storage problem');
  assert.match(editor.error, /저장 공간/);
  assert.ok(calls.toasts.some(message => message.includes('백업 파일을 내려받았습니다')));
  editor.open(true);
  t.mock.timers.tick(1000);
});

test('late import acknowledgements preserve newer draft input and acknowledge only the imported snapshot', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let finish;
  const { editor } = harness({ onApply: () => new Promise(resolve => { finish = resolve; }) });
  const imported = makeCourse();
  imported.lessons[0].title = '가져온 강의 제목';
  const importing = editor.importFile(fileEvent(JSON.stringify(imported)));
  while (!finish) await Promise.resolve();
  assert.equal(editor.busy, true);
  editor.activeLesson.title = '';
  editor.activeLesson.case.body = '파일 응답 대기 중 작성한 새로운 내용';
  editor.changed();
  const newest = copy(editor.working);
  finish();
  await importing;
  assert.deepEqual(editor.working, newest, 'new in-progress input survives the import acknowledgement');
  assert.equal(editor.acknowledgedSnapshot, JSON.stringify(imported));
  assert.equal(editor.status, 'pending');
  assert.equal(editor.isDirty, true);
  assert.equal(editor.busy, false);
  assert.equal(await editor.save(), false, 'the preserved unfinished title remains available to correct');
});

test('explicitly replacing the working version invalidates an earlier in-flight import response', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let finish;
  const { editor } = harness({ onApply: () => new Promise(resolve => { finish = resolve; }) });
  const imported = makeCourse();
  imported.lessons[0].title = '이전 가져오기 요청';
  const importing = editor.importFile(fileEvent(JSON.stringify(imported)));
  while (!finish) await Promise.resolve();
  const replacement = makeCourse();
  replacement.lessons[0].title = '별도로 선택한 최신 버전';
  editor.replaceWorking(replacement);
  finish();
  await importing;
  assert.deepEqual(editor.working, replacement);
  assert.equal(editor.acknowledgedSnapshot, JSON.stringify(replacement));
  assert.equal(editor.status, 'saved');
  assert.equal(editor.busy, false);
});

test('opening the presentation tab or another lesson never writes metadata or starts autosave', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts=[];
  const {editor,calls}=harness({onDraft:course=>drafts.push(course)});
  const original=copy(editor.working);
  editor.tab='presentation';
  editor.open();
  editor.selectLesson('git');
  editor.selectLesson('terminal');
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(editor.working,original);
  assert.equal(editor.activeLesson.presentation,undefined);
  assert.ok(editor.activeLesson.sections.every(section=>section.presentationPoints===undefined));
  assert.equal(drafts.length,0);
  assert.equal(calls.applied.length,0);
  assert.equal(editor.isDirty,false);
});

test('explicit presentation preparation creates bounded valid defaults and includes optional sections', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts=[];
  const {editor,calls,current}=harness({onDraft:course=>drafts.push(course)});
  const lesson=editor.activeLesson;
  lesson.case.body='# '+'가'.repeat(350)+'\n\n둘째 문장입니다.';
  lesson.closing='나'.repeat(260);
  lesson.steps[0].fileName='f'.repeat(190);
  lesson.steps[0].code='x'.repeat(4500);
  lesson.steps[0].output='다'.repeat(320);
  const originals={body:lesson.case.body,closing:lesson.closing,sections:lesson.sections.map(section=>({id:section.id,body:section.body})),steps:copy(lesson.steps)};
  editor.preparePresentation();
  assert.equal(lesson.presentation.caseSummary.length,300);
  assert.equal(lesson.presentation.returnSummary.length,240);
  assert.equal(lesson.presentation.demo.file.length,160);
  assert.equal(lesson.presentation.demo.command.length,4000);
  assert.equal(lesson.presentation.demo.expectedResult.length,300);
  assert.equal(lesson.presentation.demo.program,'Windows 터미널 · PowerShell');
  assert.ok(lesson.presentation.demo.durationMinutes>0&&lesson.presentation.demo.durationMinutes<=60);
  assert.ok(lesson.sections.every(section=>section.presentationPoints.length===1&&section.presentationPoints[0].length>0&&section.presentationPoints[0].length<=80));
  assert.ok(lesson.sections.some(section=>section.optional&&section.presentationPoints.length===1));
  assert.equal(editor.coreMinutes,180);
  assert.equal(lesson.case.body,originals.body);
  assert.equal(lesson.closing,originals.closing);
  assert.deepEqual(lesson.sections.map(section=>({id:section.id,body:section.body})),originals.sections);
  assert.deepEqual(lesson.steps,originals.steps);
  assert.equal(drafts.length,1,'only the explicit preparation triggers recovery and autosave');
  const prepared=copy(lesson.presentation);
  editor.preparePresentation();
  assert.deepEqual(lesson.presentation,prepared);
  assert.equal(drafts.length,1,'preparation is idempotent and never overwrites authored metadata');
  assert.equal(calls.applied.length,0);
  t.mock.timers.tick(650);
  await Promise.resolve();
  assert.equal(calls.applied.length,1);
  assert.deepEqual(current().lessons[0].presentation,prepared);
  assert.equal(editor.status,'saved');
});

test('presentation point edits stop at three and unfinished points stay in recovery without replacing saved content', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts=[];
  const {editor,calls,current}=harness({onDraft:course=>drafts.push(course)});
  editor.preparePresentation();
  await editor.save();
  const section=editor.activeLesson.sections[0];
  const savedPoints=copy(current().lessons[0].sections[0].presentationPoints);
  editor.addPresentationPoint(section);
  assert.equal(section.presentationPoints.length,2);
  assert.equal(section.presentationPoints[1],'');
  assert.equal(drafts.at(-1).lessons[0].sections[0].presentationPoints[1],'');
  t.mock.timers.tick(650);
  await Promise.resolve();
  assert.equal(editor.status,'error');
  assert.match(editor.error,/발표 핵심 요점/);
  assert.deepEqual(current().lessons[0].sections[0].presentationPoints,savedPoints);
  assert.equal(calls.applied.length,1);
  section.presentationPoints[1]='원래 본문과 발표의 핵심 문장을 구분합니다.';
  editor.changed();
  assert.equal(await editor.save(),true);
  editor.addPresentationPoint(section);
  section.presentationPoints[2]='시연 결과를 보고 개념으로 돌아옵니다.';
  editor.changed();
  const eventsBeforeLimit=drafts.length;
  editor.addPresentationPoint(section);
  assert.equal(section.presentationPoints.length,3);
  assert.equal(drafts.length,eventsBeforeLimit);
  assert.equal(await editor.save(),true);
  editor.removePresentationPoint(section,2);
  editor.removePresentationPoint(section,1);
  editor.removePresentationPoint(section,0);
  assert.equal(section.presentationPoints,undefined,'removing the final point restores body fallback instead of storing an invalid empty array');
  assert.equal(await editor.save(),true);
  assert.equal(current().lessons[0].sections[0].presentationPoints,undefined);
  editor.prepareSectionPoints(section);
  assert.equal(section.presentationPoints.length,1);
  editor.clearSectionPoints(section);
  assert.equal(section.presentationPoints,undefined);
  await editor.save();
});

test('incomplete presentation metadata survives reload recovery and never overwrites its valid predecessor', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts=[];
  const original=harness({onDraft:course=>drafts.push(course)});
  original.editor.preparePresentation();
  await original.editor.save();
  const valid=copy(original.current());
  original.editor.activeLesson.presentation.caseSummary='';
  original.editor.activeLesson.presentation.demo.durationMinutes='';
  original.editor.changed();
  const recovered=copy(drafts.at(-1));
  assert.equal(await original.editor.save(),false);
  assert.deepEqual(original.current(),valid);
  const fresh=harness({getCourse:()=>valid});
  fresh.editor.restoreDraft(recovered);
  assert.deepEqual(fresh.editor.working,recovered);
  assert.equal(fresh.editor.isDirty,true);
  fresh.editor.open();
  assert.deepEqual(fresh.editor.working,recovered);
  assert.equal(await fresh.editor.save(),false);
  assert.equal(fresh.calls.applied.length,0);
  assert.equal(fresh.editor.activeLesson.presentation.caseSummary,'');
  assert.equal(fresh.editor.activeLesson.presentation.demo.durationMinutes,'');
});

test('importing invalid presentation metadata preserves every existing working input', async () => {
  const {editor,calls}=harness();
  editor.activeLesson.case.body='가져오기에 실패해도 보존할 편집 중인 상황';
  const previous=copy(editor.working);
  const imported=makeCourse();
  imported.lessons[0].presentation={caseSummary:'새 사례',demo:{program:'PowerShell',file:'',command:'',expectedResult:'결과',durationMinutes:61},returnSummary:''};
  await editor.importFile(fileEvent(JSON.stringify(imported)));
  assert.deepEqual(editor.working,previous);
  assert.equal(calls.applied.length,0);
  assert.match(editor.importError,/발표 시연 시간/);
});

test('presentation metadata and section points survive complete-course JSON roundtrips', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const {editor,current}=harness();
  editor.preparePresentation();
  editor.activeLesson.presentation.caseSummary='실제 작업 위치를 바꿔 보며 명령의 결과를 비교합니다.';
  editor.activeLesson.presentation.demo={program:'Windows 터미널',file:'src/main.js',command:'Get-Location\nGet-ChildItem',expectedResult:'작업 폴더와 파일 목록이 표시됩니다.',durationMinutes:4.5};
  editor.activeLesson.presentation.returnSummary='';
  editor.activeLesson.sections[0].presentationPoints=['현재 폴더가 명령의 대상을 결정합니다.','경로를 읽고 실행 결과를 확인합니다.'];
  editor.changed();
  assert.equal(await editor.save(),true);
  const serialized=JSON.stringify(editor.working);
  const second=harness();
  await second.editor.importFile(fileEvent(serialized));
  assert.deepEqual(second.editor.working,JSON.parse(serialized));
  assert.deepEqual(second.current(),current());
  assert.equal(second.editor.coreMinutes,180);
  assert.deepEqual(second.editor.working.lessons.map(lesson=>lesson.id),COURSE_IDS);
});

test('reordering preserves authored presentation data and removal returns only the selected lesson to body fallback', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const {editor,current}=harness();
  editor.preparePresentation();
  const lesson=editor.activeLesson;
  lesson.sections[0].presentationPoints=['직접 작성한 첫 번째 핵심 요점'];
  editor.working.lessons.find(item=>item.id==='git').sections[0].presentationPoints=['다른 강의의 요점은 보존합니다.'];
  const presentation=copy(lesson.presentation);
  const pointsById=Object.fromEntries(lesson.sections.map(section=>[section.id,copy(section.presentationPoints)]));
  const originalCase=copy(lesson.case);
  const originalClosing=lesson.closing;
  editor.moveLesson(0,1);
  editor.move(lesson.sections,0,1);
  editor.move(lesson.steps,0,1);
  assert.equal(await editor.save(),true);
  assert.equal(editor.lessonId,'terminal');
  assert.deepEqual(lesson.presentation,presentation);
  assert.deepEqual(Object.fromEntries(lesson.sections.map(section=>[section.id,section.presentationPoints])),pointsById);
  assert.equal(editor.coreMinutes,180);
  editor.removePresentation();
  assert.equal(lesson.presentation,undefined);
  assert.ok(lesson.sections.every(section=>section.presentationPoints===undefined));
  assert.deepEqual(lesson.case,originalCase);
  assert.equal(lesson.closing,originalClosing);
  assert.deepEqual(editor.working.lessons.find(item=>item.id==='git').sections[0].presentationPoints,['다른 강의의 요점은 보존합니다.']);
  assert.equal(await editor.save(),true);
  assert.equal(current().lessons.find(item=>item.id==='terminal').presentation,undefined);
});

test('a section containing only fenced code starts with its title as a usable presentation point', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const {editor}=harness();
  const section=editor.activeLesson.sections[0];
  section.body='```javascript\nconst current = 1;\n```';
  section.title='코드를 실행하기 전에 확인할 것';
  editor.prepareSectionPoints(section);
  assert.deepEqual(section.presentationPoints,[section.title]);
  assert.equal(editor.activeLesson.presentation,undefined);
  assert.equal(await editor.save(),true);
});

test('the default body editor opens the case without adding UI state to course data', () => {
  const { editor, base } = harness();
  assert.equal(editor.uiMode, 'focus');
  assert.equal(editor.focusId, 'case');
  assert.equal(editor.focusedSection, null);
  assert.equal(editor.focusIndex, 0);
  assert.deepEqual(editor.focusItems, ['case', 'terminal-first', 'terminal-second', 'terminal-bonus']);
  assert.deepEqual(editor.working, base);
  assert.equal(editor.isDirty, false);
  assert.equal(Object.hasOwn(editor.working, 'uiMode'), false);
  assert.equal(Object.hasOwn(editor.working.lessons[0], 'focusId'), false);
});

test('focusing a section or changing editing modes never rewrites a draft or starts autosave', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts = [];
  const { editor, calls } = harness({ onDraft: course => drafts.push(course) });
  const original = copy(editor.working);
  assert.equal(editor.setMode('details'), 'details');
  editor.tab = 'presentation';
  assert.equal(editor.focusItem('terminal-second'), 'terminal-second');
  assert.equal(editor.uiMode, 'focus');
  assert.equal(editor.sectionId, 'terminal-second');
  assert.equal(editor.focusedSection, editor.activeLesson.sections[1], 'preview uses the working section itself');
  editor.setMode('details');
  editor.setMode('focus');
  assert.equal(editor.tab, 'presentation', 'the detailed editor keeps its own tab');
  assert.equal(editor.focusId, 'terminal-second');
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(editor.working, original);
  assert.equal(drafts.length, 0);
  assert.equal(calls.applied.length, 0);
  assert.equal(editor.isDirty, false);
});

test('selecting another lesson starts at its case while invalid lesson and section IDs are normalized safely', () => {
  const { editor } = harness();
  editor.focusItem('terminal-second');
  editor.setMode('details');
  assert.equal(editor.selectLesson('git'), true);
  assert.equal(editor.lessonId, 'git');
  assert.equal(editor.focusId, 'case');
  assert.equal(editor.focusedSection, null);
  assert.equal(editor.sectionId, 'git-first');
  assert.equal(editor.uiMode, 'details');
  assert.equal(editor.focusItem('terminal-second'), 'case', 'a section from another lesson is not selected');
  assert.equal(editor.focusItem('git-second'), 'git-second');
  assert.equal(editor.selectLesson('missing-lesson'), false);
  assert.equal(editor.lessonId, 'git');
  assert.equal(editor.focusId, 'git-second');
  assert.equal(editor.focusItem(), 'case');
});

test('previous and next follow case and section order, including optional sections, without changing content', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor, calls } = harness();
  const original = copy(editor.working);
  assert.equal(editor.moveFocus(-1), 'case');
  assert.equal(editor.moveFocus(1), 'terminal-first');
  assert.equal(editor.moveFocus(1), 'terminal-second');
  assert.equal(editor.moveFocus(1), 'terminal-bonus');
  assert.equal(editor.moveFocus(1), 'terminal-bonus');
  assert.equal(editor.moveFocus(-1), 'terminal-second');
  assert.equal(editor.moveFocus(0.5), 'terminal-second');
  assert.equal(editor.focusIndex, 2);
  t.mock.timers.tick(1000);
  await Promise.resolve();
  assert.deepEqual(editor.working, original);
  assert.equal(calls.applied.length, 0);
});

test('focused section preview reads unsaved working text while keeping the existing save and recovery path', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts = [];
  const { editor, calls, current } = harness({ onDraft: course => drafts.push(course) });
  editor.focusItem('terminal-second');
  editor.focusedSection.title = '바로 보이는 새 제목';
  editor.focusedSection.body = '## 바로 보이는 본문\n\n입력 중인 설명입니다.';
  editor.changed();
  assert.equal(editor.preview(editor.focusedSection.body), '<p>## 바로 보이는 본문\n\n입력 중인 설명입니다.</p>');
  assert.equal(editor.activeLesson.sections[1].title, '바로 보이는 새 제목');
  assert.notEqual(current().lessons[0].sections[1].body, editor.focusedSection.body);
  assert.equal(drafts.at(-1).lessons[0].sections[1].body, editor.focusedSection.body);
  assert.equal(calls.applied.length, 0);
  t.mock.timers.tick(650);
  await Promise.resolve();
  assert.equal(current().lessons[0].sections[1].body, editor.focusedSection.body);
  assert.equal(editor.status, 'saved');
});

test('removing a focused section returns to the case while keeping another selected section and its stable ID', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { editor } = harness();
  editor.focusItem('terminal-second');
  editor.removeSection(0);
  assert.equal(editor.focusId, 'terminal-second');
  assert.equal(editor.focusedSection.id, 'terminal-second');
  editor.removeSection(0);
  assert.equal(editor.focusId, 'case');
  assert.equal(editor.focusedSection, null);
  editor.focusItem('terminal-bonus');
  editor.removeSection(0);
  assert.equal(editor.activeLesson.sections.length, 1, 'the minimum-one guard is preserved');
  assert.equal(editor.focusId, 'terminal-bonus');
  await editor.save();
});

test('external course refresh preserves a valid focused section and normalizes a removed one', () => {
  const { editor } = harness();
  editor.focusItem('terminal-second');
  editor.setMode('details');
  const first = copy(editor.working);
  first.lessons[0].sections[1].body = '파일에서 갱신된 설명입니다.';
  assert.equal(editor.acceptExternal(first), true);
  assert.equal(editor.focusId, 'terminal-second');
  assert.equal(editor.focusedSection.body, '파일에서 갱신된 설명입니다.');
  assert.equal(editor.uiMode, 'details');
  const second = copy(first);
  second.lessons[0].sections.splice(1, 1);
  assert.equal(editor.acceptExternal(second), true);
  assert.equal(editor.focusId, 'case');
  assert.equal(editor.focusedSection, null);
  assert.equal(editor.uiMode, 'details');
});

test('unfinished recovered text survives focus navigation, mode changes and editor revisits', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const drafts = [];
  const { editor, calls, current } = harness({ onDraft: course => drafts.push(course) });
  const saved = copy(current());
  const unfinished = copy(saved);
  unfinished.lessons[0].title = '';
  unfinished.lessons[0].sections[1].body = '아직 완성하지 않은 본문을 보존합니다.';
  editor.restoreDraft(unfinished);
  editor.focusItem('terminal-second');
  assert.equal(await editor.save(), false);
  const error = editor.error;
  const draftCount = drafts.length;
  const working = editor.working;
  editor.setMode('details');
  editor.tab = 'sections';
  editor.setMode('focus');
  editor.focusItem('case');
  editor.focusItem('terminal-second');
  editor.open();
  assert.equal(editor.working, working);
  assert.deepEqual(editor.working, unfinished);
  assert.equal(editor.focusedSection.body, '아직 완성하지 않은 본문을 보존합니다.');
  assert.equal(editor.error, error, 'changing modes never hides a validation failure');
  assert.equal(editor.status, 'error');
  assert.equal(editor.isDirty, true);
  assert.equal(drafts.length, draftCount);
  assert.equal(calls.applied.length, 0);
  assert.deepEqual(current(), saved);
});
