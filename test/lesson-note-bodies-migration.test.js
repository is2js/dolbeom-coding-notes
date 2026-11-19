import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts } from '../src/course-storage.js';
import { previousLessonNoteBodies } from '../src/previous-lesson-note-bodies.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const getLesson = (value, id) => value.lessons.find(lesson => lesson.id === id);
const getSection = (lesson, id) => lesson.sections.find(section => section.id === id);

test('saved and recovery drafts pick up shortened bodies without losing authored material', () => {
  const draft = structuredClone(course);
  const oldGit = previousLessonNoteBodies.git;
  const git = getLesson(draft, 'git');
  getSection(git, 'git-branch').body = oldGit.sections['git-branch'];
  assert.notEqual(getSection(git, 'git-branch').body, getSection(getLesson(course, 'git'), 'git-branch').body);
  getSection(git, 'git-diff').body = '강사가 직접 수정한 변경 비교 실습';
  git.sections = git.sections.filter(section => section.id !== 'git-why').reverse();

  const store = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(draft)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: draft })],
  ]);
  const originalStore = [...store];
  const result = readCourseDrafts({ getItem: key => store.get(key) ?? null }, { baseCourse: course, local: true });
  for (const upgraded of [result.stored, result.recovery.course]) {
    const updatedGit = getLesson(upgraded, 'git');
    assert.equal(getSection(updatedGit, 'git-branch').body, getSection(getLesson(course, 'git'), 'git-branch').body);
    assert.equal(getSection(updatedGit, 'git-diff').body, '강사가 직접 수정한 변경 비교 실습');
    assert.deepEqual(updatedGit.sections.map(section => section.id), git.sections.map(section => section.id));
  }
  assert.deepEqual([...store], originalStore);
});
