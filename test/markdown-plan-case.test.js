import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { practiceSeed } from '../src/markdown-practice.js';
import { isPracticeImageSource } from '../src/markdown-practice-renderer.js';
import { previousMarkdownPlanCaseDefault as previous } from '../src/previous-markdown-plan-case-default.js';
import { previousMarkdownPracticeDefault } from '../src/previous-markdown-practice-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const markdown = source => source.lessons.find(lesson => lesson.id === 'markdown');

test('the Markdown case shows both Plan mode captures in order and links to practice', () => {
  const lesson = markdown(course);
  const images = [];
  courseMarked.walkTokens(courseMarked.lexer(lesson.case.body), token => {
    if (token.type === 'image') images.push(token.href);
  });
  assert.equal(lesson.case.kind, 'real');
  assert.deepEqual(images, [
    './assets/course/markdown-codex-plan-conversation.png',
    './assets/course/markdown-codex-plan-document.png',
  ]);
  for (const image of images) {
    const bytes = readFileSync(new URL(`../public/${image.slice(2)}`, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
  assert.ok(lesson.case.body.includes('#/lesson/markdown/section-markdown-map'));
  assert.ok(lesson.presentation.caseSummary.includes('#/lesson/markdown/section-markdown-map'));
  assert.doesNotMatch(lesson.case.body, /모바일 주제 탐색과 강의 그림 디자인 개선/);
});

test('the new Markdown case updates published defaults and preserves authored edits', () => {
  const draft = structuredClone(course);
  const lesson = markdown(draft);
  lesson.case = structuredClone(previous.case);
  lesson.presentation.caseSummary = previous.presentation.caseSummary;

  const updated = markdown(upgradeNineDefaults(draft, course));
  assert.deepEqual(updated.case, markdown(course).case);
  assert.equal(updated.presentation.caseSummary, markdown(course).presentation.caseSummary);

  lesson.case.body = '강사가 고친 시작 사례';
  lesson.presentation.caseSummary = '강사가 고친 발표 요약';
  const authored = markdown(upgradeNineDefaults(draft, course));
  assert.equal(authored.case.title, markdown(course).case.title);
  assert.equal(authored.case.body, lesson.case.body);
  assert.equal(authored.presentation.caseSummary, lesson.presentation.caseSummary);
});

test('the short practice plan and related demo use the same renderable Markdown', () => {
  const lesson = markdown(course);
  const section = lesson.sections.find(item => item.id === 'markdown-map');
  const seed = practiceSeed(section.body);
  assert.equal(seed, lesson.steps.find(item => item.id === 'codex-01').code);
  assert.doesNotMatch(seed, /https?:\/\/|참고 사이트/);
  assert.ok(seed.split('\n').length <= 24);

  const tokens = courseMarked.lexer(seed);
  assert.equal(tokens.find(token => token.type === 'table').rows.length, 2);
  assert.deepEqual(tokens.find(token => token.type === 'list').items.map(item => item.checked), [false, false]);
  assert.equal(tokens.find(token => token.type === 'code').text, 'git status');
  const image = tokens.find(token => token.tokens?.some(item => item.type === 'image')).tokens[0];
  assert.ok(isPracticeImageSource(image.href));
  const bytes = readFileSync(new URL(`../public/${image.href.slice(2)}`, import.meta.url));
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test('the practice update keeps edits to the section body and the other Markdown sections', () => {
  const draft = structuredClone(course);
  const lesson = markdown(draft);
  const practice = lesson.sections.find(item => item.id === 'markdown-map');
  const oldPractice = previousMarkdownPracticeDefault.sections.find(item => item.id === practice.id);
  const demo = lesson.steps.find(item => item.id === 'codex-01');
  const oldDemo = previousMarkdownPracticeDefault.steps.find(item => item.id === demo.id);
  Object.assign(practice, oldPractice);
  Object.assign(demo, oldDemo);
  const written = lesson.sections.find(item => item.id === 'tools-markdown');
  written.body = '강사가 수정한 README 안내';

  const updated = markdown(upgradeNineDefaults(draft, course));
  assert.match(practiceSeed(updated.sections.find(item => item.id === practice.id).body), /가구 미리보기 개선 계획/);
  assert.match(updated.steps.find(item => item.id === demo.id).code, /가구 미리보기 개선 계획/);
  assert.equal(updated.sections.find(item => item.id === written.id).body, written.body);

  practice.body = '강사가 직접 적은 연습 예제';
  const authored = markdown(upgradeNineDefaults(draft, course));
  assert.equal(authored.sections.find(item => item.id === practice.id).body, practice.body);
});
