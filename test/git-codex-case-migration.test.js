import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousGitCodexCaseDefault as previous } from '../src/previous-git-codex-case-default.js';
import { previousGitHighlightsDefault } from '../src/previous-git-highlights-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const git = value => value.lessons.find(lesson => lesson.id === 'git');
const section = (lesson, id) => lesson.sections.find(item => item.id === id);

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

test('the Git highlights and recap update older default fields without replacing authored notes', () => {
  const draft = structuredClone(course);
  const oldGit = git(draft);
  const nextGit = git(course);
  for (const id of ['git-prompt', 'git-branch']) {
    Object.assign(section(oldGit, id), section(previousGitHighlightsDefault, id));
  }
  oldGit.presentation.returnSummary = previousGitHighlightsDefault.presentation.returnSummary;
  oldGit.closing = '나만의 정리 문장';
  section(oldGit, 'git-prompt').presentationPoints = ['직접 만든 발표 요점'];
  oldGit.sections.reverse();

  const upgraded = git(upgradeNineDefaults(draft, course));
  assert.doesNotMatch(section(upgraded, 'git-prompt').body, /Codex에게 작업을 요청하는 예/);
  assert.deepEqual(section(upgraded, 'git-prompt').presentationPoints, ['직접 만든 발표 요점']);
  assert.equal(section(upgraded, 'git-branch').body, section(nextGit, 'git-branch').body);
  assert.equal(upgraded.presentation.returnSummary, nextGit.presentation.returnSummary);
  assert.equal(upgraded.closing, '나만의 정리 문장');
  assert.deepEqual(upgraded.sections.map(item => item.id), oldGit.sections.map(item => item.id));
});
