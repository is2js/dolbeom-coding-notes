import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousGitCodexCaseDefault as previous } from '../src/previous-git-codex-case-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const git = value => value.lessons.find(lesson => lesson.id === 'git');

test('an older Git case receives the second screenshot without changing authored fields', () => {
  const draft = structuredClone(course);
  const lesson = git(draft);
  lesson.case.body = previous.case.body;
  lesson.case.title = '직접 수정한 사례 제목';
  lesson.presentation.caseSummary = previous.presentation.caseSummary;

  const upgraded = git(upgradeNineDefaults(draft, course));
  assert.match(upgraded.case.body, /git-commit-diff-screenshot\.png[\s\S]*git-codex-changes-screenshot\.png/);
  assert.equal(upgraded.case.title, lesson.case.title);
  assert.equal(upgraded.presentation.caseSummary, git(course).presentation.caseSummary);
  assert.equal(lesson.case.body, previous.case.body);

  lesson.case.body = '강사가 추가한 사례';
  lesson.presentation.caseSummary = '강사가 추가한 발표 요약';
  const authored = git(upgradeNineDefaults(draft, course));
  assert.equal(authored.case.body, lesson.case.body);
  assert.equal(authored.presentation.caseSummary, lesson.presentation.caseSummary);
});
