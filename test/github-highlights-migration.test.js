import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { marked } from 'marked';
import { renderCopyableCode } from '../src/command-code.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousGithubFirstPushDefault, previousGithubClonePathDefault } from '../src/previous-github-first-push-default.js';
import { previousGithubHighlightsDefault as previous } from '../src/previous-github-highlights-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const getLesson = value => value.lessons.find(lesson => lesson.id === 'github');
const pushSection = lesson => lesson.sections.find(section => section.id === 'github-clone');

test('the GitHub setup and new highlights reach untouched drafts while preserving authored fields', () => {
  const draft = structuredClone(course);
  const github = getLesson(draft);
  github.case.body = previous.case.body;
  github.presentation.caseSummary = '강사가 작성한 발표 사례';
  Object.assign(pushSection(github), pushSection(previous));
  github.sections = github.sections.filter(section => section.id !== 'git-bonus').reverse();

  const upgraded = getLesson(upgradeNineDefaults(draft, course));
  assert.match(upgraded.case.body, /<mark>GitHub에서 저장소 주소 복사/);
  assert.match(pushSection(upgraded).body, /github\.com\/signup/);
  assert.deepEqual(pushSection(upgraded).presentationPoints, pushSection(getLesson(course)).presentationPoints);
  assert.equal(upgraded.presentation.caseSummary, github.presentation.caseSummary);
  assert.deepEqual(upgraded.sections.map(section => section.id), github.sections.map(section => section.id));
});

test('the first push and clone walkthrough updates untouched defaults in existing drafts', () => {
  const draft = structuredClone(course);
  const github = getLesson(draft);
  const markdown = draft.lessons.find(lesson => lesson.id === 'markdown');
  const oldFetch = previousGithubClonePathDefault.sections.find(section => section.id === 'markdown-readme-fetch');
  github.closing = previousGithubFirstPushDefault.closing;
  Object.assign(pushSection(github), pushSection(previousGithubFirstPushDefault));
  const clone = github.sections.find(section => section.id === 'github-roles');
  clone.body = '강사가 편집한 복제 실습';
  Object.assign(markdown.sections.find(section => section.id === oldFetch.id), oldFetch);

  const updated = upgradeNineDefaults(draft, course);
  const updatedGithub = getLesson(updated);
  assert.equal(pushSection(updatedGithub).body, pushSection(getLesson(course)).body);
  assert.equal(updatedGithub.closing, getLesson(course).closing);
  assert.equal(updatedGithub.sections.find(section => section.id === clone.id).body, clone.body);
  const fetch = updated.lessons.find(lesson => lesson.id === 'markdown').sections.find(section => section.id === oldFetch.id);
  assert.doesNotMatch(fetch.body, /github-clone-practice/);
});

test('the authentication transcript stays display-only beside the copyable push command', () => {
  const tokens = marked.lexer(pushSection(getLesson(course)).body);
  const transcript = tokens.find(token => token.type === 'code' && token.lang === 'output');
  const command = tokens.find(token => token.type === 'code' && token.text === 'git push -u origin main');
  assert.match(transcript.text, /fatal: Authentication failed/);
  assert.doesNotMatch(renderCopyableCode(transcript.text, transcript.lang), /<button/);
  assert.match(renderCopyableCode(command.text, command.lang), /data-copy-kind="command"/);
});
