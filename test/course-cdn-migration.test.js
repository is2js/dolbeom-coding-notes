import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousCdnDefault } from '../src/previous-cdn-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const lesson = (course, id) => course.lessons.find(item => item.id === id);
const section = (course, id, sectionId) => lesson(course, id).sections.find(item => item.id === sectionId);
const step = (course, id, stepId) => lesson(course, id).steps.find(item => item.id === stepId);
const changedSections = {
  'web-tools': ['frontend-css', 'frontend-alpine', 'frontend-bonus'],
  templates: ['backend-html-json', 'web-jinja'],
};
const changedSteps = {
  'web-tools': ['frontend-03', 'frontend-08'],
  templates: ['backend-html-json'],
};
function oldDraft() {
  const result = copy(latest);
  for (const id of Object.keys(changedSections)) {
    result.lessons[result.lessons.findIndex(item => item.id === id)] = copy(previousCdnDefault[id]);
  }
  return result;
}

test('unchanged pre-CDN lesson content updates in both stored and recovery drafts', () => {
  const old = oldDraft();
  for (const [id, ids] of Object.entries(changedSections)) {
    for (const sectionId of ids) assert.notDeepEqual(section(old, id, sectionId), section(latest, id, sectionId));
  }
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'unchanged' })],
  ]);
  const snapshot = [...entries];
  const read = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  assert.equal(read.recovery.baseRevision, 'unchanged');
  for (const course of [read.stored, read.recovery.course]) {
    for (const [id, ids] of Object.entries(changedSections)) {
      for (const sectionId of ids) {
        const actual = copy(section(course, id, sectionId));
        delete actual._tailwindExplanation202611;
        delete actual._cdnExamples202611;
        assert.deepEqual(actual, section(latest, id, sectionId), `${id}/${sectionId}`);
      }
      for (const stepId of changedSteps[id]) assert.deepEqual(step(course, id, stepId), step(latest, id, stepId));
    }
    assert.deepEqual(lesson(course, 'web-tools').presentation.demo, lesson(latest, 'web-tools').presentation.demo);
  }
  assert.deepEqual([...entries], snapshot, 'storage is not overwritten');
});

test('authored content and order remain untouched while unchanged neighbouring fields update', () => {
  const old = oldDraft();
  const css = section(old, 'web-tools', 'frontend-css');
  const authoredCss = css.body + '\n\n강사가 직접 수정한 내용입니다.';
  css.body = authoredCss;
  css._tailwindExplanation202611 = true;
  const authoredTemplate = '데이터에 대한 강사의 설명';
  section(old, 'templates', 'web-jinja').body = authoredTemplate;
  step(old, 'web-tools', 'frontend-03').code = '직접 작성한 시연';
  lesson(old, 'web-tools').sections.reverse();
  lesson(old, 'web-tools').durationMinutes = 77;
  const snapshot = JSON.stringify(old);
  const upgraded = upgradeNineDefaults(old, latest);
  assert.equal(JSON.stringify(old), snapshot, 'input draft is not mutated');
  assert.ok(section(upgraded, 'web-tools', 'frontend-css').body.endsWith('강사가 직접 수정한 내용입니다.'));
  assert.ok(section(upgraded, 'web-tools', 'frontend-css').body.includes('https://cdn.tailwindcss.com/3.4.17'));
  assert.deepEqual(section(upgraded, 'web-tools', 'frontend-css').presentationPoints, section(latest, 'web-tools', 'frontend-css').presentationPoints);
  assert.equal(section(upgraded, 'templates', 'web-jinja').body, authoredTemplate);
  assert.equal(step(upgraded, 'web-tools', 'frontend-03').code, '직접 작성한 시연');
  assert.deepEqual(lesson(upgraded, 'web-tools').sections.map(item => item.id), lesson(old, 'web-tools').sections.map(item => item.id));
  assert.equal(lesson(upgraded, 'web-tools').durationMinutes, 77);
  assert.deepEqual(upgradeNineDefaults(upgraded, latest), upgraded, 'migration is idempotent');
});

test('the earlier Tailwind explanation insertion cannot restore an intentional deletion', () => {
  const old = oldDraft();
  const css = section(old, 'web-tools', 'frontend-css');
  const withoutExplanation = css.body.replace(/### Tailwind CSS를 뭐라고 부를까요\?[\s\S]*?(?=### 1\. 직접 작성한 CSS 다시 보기)/, '');
  assert.notEqual(withoutExplanation, css.body);
  css.body = withoutExplanation;
  css._tailwindExplanation202611 = true;
  const upgraded = upgradeNineDefaults(old, latest);
  const migratedBody = section(upgraded, 'web-tools', 'frontend-css').body;
  assert.ok(!migratedBody.includes('### Tailwind CSS를 뭐라고 부를까요?'));
  assert.ok(migratedBody.includes('https://cdn.tailwindcss.com/3.4.17'));
  assert.equal(section(upgradeNineDefaults(upgraded, latest), 'web-tools', 'frontend-css').body, migratedBody);
});

test('only exact old blocks update and later authored changes remain intact', () => {
  const old = oldDraft();
  const css = section(old, 'web-tools', 'frontend-css');
  css._tailwindExplanation202611 = true;
  css.body = css.body.replace(
    '[강의노트 저장소](https://github.com/is2js/dolbeom-coding-notes)의 **Code → Download ZIP**으로 전체 소스를 받거나 앞에서 배운 clone으로 가져옵니다. 압축을 풀고 `public/examples/course-card` 폴더를 별도 위치에 복사해 VS Code로 열면 기존 파일을 덮어쓰지 않습니다.',
    '전체 `course-card` 폴더를 별도 위치에 복사해 VS Code로 열고 연습하면 서로의 파일을 덮어쓰지 않습니다.'
  ).replace('이 파일은 Node로 서버를 실행하는 명령이 아니라 브라우저가 불러오는 스타일 파일입니다.', '강사가 직접 고친 문장입니다.');
  const upgraded = upgradeNineDefaults(old, latest);
  const body = section(upgraded, 'web-tools', 'frontend-css').body;
  assert.ok(body.includes('이 예제는 HTML에서 Tailwind CSS 3의 **Play CDN**을 바로 불러옵니다.'));
  assert.ok(body.includes('전체 `course-card` 폴더를 별도 위치에 복사해 VS Code로 열고 연습하면 서로의 파일을 덮어쓰지 않습니다.'));
  assert.ok(body.includes('강사가 직접 고친 문장입니다.'));
  assert.ok(body.includes('https://cdn.tailwindcss.com/3.4.17'));
  assert.ok(!body.includes('<link rel="stylesheet" href="../static/course.css">'));
  section(upgraded, 'web-tools', 'frontend-css').body = body.replace('### 2. CDN으로 Tailwind 연결하기', '### 강사가 수정한 제목');
  const laterBody = section(upgraded, 'web-tools', 'frontend-css').body;
  assert.equal(section(upgradeNineDefaults(upgraded, latest), 'web-tools', 'frontend-css').body, laterBody);
});
