import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousTerminalHighlightsDefault as previous } from '../src/previous-terminal-highlights-default.js';

const latest = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const terminal = course => course.lessons.find(lesson => lesson.id === 'terminal');
const section = (lesson, id) => lesson.sections.find(item => item.id === id);

test('untouched terminal notes and slides receive new highlights while authored notes stay intact', () => {
  const draft = structuredClone(latest);
  const lesson = terminal(draft);
  Object.assign(lesson.case, previous.case);
  Object.assign(section(lesson, 'terminal-example'), previous.sections.find(item => item.id === 'terminal-example'));
  lesson.presentation = structuredClone(previous.presentation);
  lesson.presentation.returnSummary = '강사가 추가한 발표 정리';
  section(lesson, 'terminal-gui-cli').body = '강사가 추가한 자료';
  lesson.sections = lesson.sections.filter(item => item.id !== 'terminal-bonus').reverse();

  const before = structuredClone(draft);
  const upgraded = terminal(upgradeNineDefaults(draft, latest));
  assert.deepEqual(draft, before);
  assert.equal(upgraded.case.body, terminal(latest).case.body);
  assert.match(section(upgraded, 'terminal-example').body, /Microsoft Store/);
  assert.deepEqual(section(upgraded, 'terminal-example').presentationPoints, section(terminal(latest), 'terminal-example').presentationPoints);
  assert.equal(section(upgraded, 'terminal-gui-cli').body, '강사가 추가한 자료');
  assert.equal(upgraded.presentation.returnSummary, '강사가 추가한 발표 정리');
  assert.deepEqual(upgraded.sections.map(item => item.id), lesson.sections.map(item => item.id));
});
