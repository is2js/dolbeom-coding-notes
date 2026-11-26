import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousTerminalDuplicateSplitDefault } from '../src/previous-terminal-duplicate-split-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const terminal = value => value.lessons.find(item => item.id === 'terminal');
const shortcut = lesson => lesson.sections.find(item => item.id === 'terminal-shortcuts');

test('updates untouched shortcut notes while preserving independently edited content', () => {
  const draft = structuredClone(course);
  const lesson = terminal(draft);
  const previous = previousTerminalDuplicateSplitDefault.sections.find(item => item.id === 'terminal-shortcuts');
  const previousStep = previousTerminalDuplicateSplitDefault.steps.find(item => item.id === 'terminal-07');
  lesson.sections[lesson.sections.findIndex(item => item.id === previous.id)] = structuredClone(previous);
  lesson.steps[lesson.steps.findIndex(item => item.id === previousStep.id)] = structuredClone(previousStep);
  lesson.case.body = '강사가 직접 작성한 사례';
  const migrated = upgradeNineDefaults(draft, course);
  assert.equal(shortcut(terminal(migrated)).body, shortcut(terminal(course)).body);
  assert.deepEqual(shortcut(terminal(migrated)).presentationPoints, shortcut(terminal(course)).presentationPoints);
  assert.deepEqual(terminal(migrated).steps.find(item => item.id === previousStep.id), terminal(course).steps.find(item => item.id === previousStep.id));
  assert.equal(terminal(migrated).case.body, lesson.case.body);
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);

  shortcut(lesson).body += '\n\n강사가 직접 추가한 메모';
  shortcut(lesson).presentationPoints[0] = '강사가 작성한 발표 요점';
  lesson.steps.find(item => item.id === previousStep.id).code = '강사가 직접 작성한 시연';
  const authored = upgradeNineDefaults(draft, course);
  assert.equal(shortcut(terminal(authored)).body, shortcut(lesson).body);
  assert.equal(shortcut(terminal(authored)).presentationPoints[0], '강사가 작성한 발표 요점');
  assert.deepEqual(shortcut(terminal(authored)).presentationPoints, shortcut(lesson).presentationPoints);
  assert.equal(terminal(authored).steps.find(item => item.id === previousStep.id).code, '강사가 직접 작성한 시연');
});
