import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
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
