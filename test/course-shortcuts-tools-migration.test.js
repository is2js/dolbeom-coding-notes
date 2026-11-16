import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSE_STORAGE, readCourseDrafts, upgradeNineDefaults } from '../src/course-storage.js';
import { previousIdeToolsDefault } from '../src/previous-ide-tools-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const lesson = (course, id) => course.lessons.find(item => item.id === id);
const changedSections = id => {
  const old = previousIdeToolsDefault[id];
  return lesson(latest, id).sections.filter(section => {
    const prior = old.sections.find(item => item.id === section.id);
    return prior && JSON.stringify(prior) !== JSON.stringify(section);
  });
};
function oldDraft() {
  const result = copy(latest);
  for (const id of ['ide', 'web-tools']) result.lessons[result.lessons.findIndex(item => item.id === id)] = copy(previousIdeToolsDefault[id]);
  return result;
}

test('published IDE and web tools sections update in saved and recovery drafts', () => {
  const old = oldDraft();
  for (const id of ['ide', 'web-tools']) assert.ok(changedSections(id).length, `expected changed sections in ${id}`);
  const entries = new Map([
    [COURSE_STORAGE.draft, JSON.stringify(old)],
    [COURSE_STORAGE.recovery, JSON.stringify({ dirty: true, course: old })],
  ]);
  const read = readCourseDrafts({ getItem: key => entries.get(key) ?? null }, { baseCourse: latest, local: true });
  for (const course of [read.stored, read.recovery.course]) {
    for (const id of ['ide', 'web-tools']) {
      for (const section of changedSections(id)) {
        const actual = copy(lesson(course, id).sections.find(item => item.id === section.id));
        delete actual._tailwindExplanation202611;
        delete actual._cdnExamples202611;
        assert.deepEqual(actual, section);
      }
    }
  }
  assert.equal(entries.get(COURSE_STORAGE.draft), JSON.stringify(old));
});

test('edited section bodies and order are preserved when defaults are upgraded', () => {
  const old = oldDraft();
  for (const id of ['ide', 'web-tools']) {
    const target = lesson(old, id);
    const changed = changedSections(id)[0];
    target.sections.find(item => item.id === changed.id).body = `${id}: 직접 수정한 본문`;
    target.sections.reverse();
  }
  const result = upgradeNineDefaults(old, latest);
  for (const id of ['ide', 'web-tools']) {
    const changed = changedSections(id)[0];
    assert.equal(lesson(result, id).sections.find(item => item.id === changed.id).body, `${id}: 직접 수정한 본문`);
    assert.deepEqual(lesson(result, id).sections.map(item => item.id), lesson(old, id).sections.map(item => item.id));
  }
});
