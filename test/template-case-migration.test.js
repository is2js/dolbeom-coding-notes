import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousFastapiRoutesDefault } from '../src/previous-fastapi-routes-default.js';

const source = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const templateLesson = course => course.lessons.find(lesson => lesson.id === 'templates');

function newestCourse() {
  const course = copy(source);
  const lesson = templateLesson(course);
  lesson.case.title = '새 카드 사례';
  lesson.case.body = '데이터를 템플릿에 전달하는 새 사례';
  lesson.presentation.caseSummary = '새 카드 발표 요약';
  return course;
}

function previousDraft() {
  const course = copy(source);
  const lesson = templateLesson(course);
  lesson.case = copy(previousFastapiRoutesDefault.case);
  lesson.presentation.caseSummary = previousFastapiRoutesDefault.presentation.caseSummary;
  return course;
}

test('unchanged saved and recovery cases adopt the latest template example', () => {
  const latest = newestCourse();
  const old = previousDraft();
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old, baseRevision: 'old' })],
  ]);
  const before = [...entries];
  const result = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [result.stored, result.recovery.course]) {
    assert.equal(templateLesson(course).case.title, '새 카드 사례');
    assert.equal(templateLesson(course).case.body, '데이터를 템플릿에 전달하는 새 사례');
    assert.equal(templateLesson(course).presentation.caseSummary, '새 카드 발표 요약');
  }
  assert.deepEqual([...entries], before);
});

test('authored case fields, presentation notes, and section order stay intact', () => {
  const latest = newestCourse();
  const old = previousDraft();
  templateLesson(old).case.title = '강사가 바꾼 제목';
  templateLesson(old).case.body = '강사가 바꾼 시작 사례';
  templateLesson(old).presentation.caseSummary = '강사가 쓴 발표 요약';
  templateLesson(old).sections.reverse();
  const result = upgradeNineDefaults(old, latest);
  assert.equal(templateLesson(result).case.title, '강사가 바꾼 제목');
  assert.equal(templateLesson(result).case.body, '강사가 바꾼 시작 사례');
  assert.equal(templateLesson(result).presentation.caseSummary, '강사가 쓴 발표 요약');
  assert.deepEqual(templateLesson(result).sections.map(item => item.id), templateLesson(old).sections.map(item => item.id));
});

test('a custom title survives while unchanged example content updates', () => {
  const latest = newestCourse();
  const old = previousDraft();
  templateLesson(old).case.title = '강사의 제목';
  const result = upgradeNineDefaults(old, latest);
  assert.equal(templateLesson(result).case.title, '강사의 제목');
  assert.equal(templateLesson(result).case.body, '데이터를 템플릿에 전달하는 새 사례');
  assert.equal(templateLesson(result).presentation.caseSummary, '새 카드 발표 요약');
});
