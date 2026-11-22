import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousMarkdownPlanCaseDefault as previous } from '../src/previous-markdown-plan-case-default.js';

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
