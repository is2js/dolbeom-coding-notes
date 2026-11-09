import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';

test('the terminal shortcut comparison highlights the customized actions and omits automatic splitting', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const terminal = course.lessons.find(lesson => lesson.id === 'terminal');
  const body = terminal.sections.find(section => section.id === 'terminal-shortcuts').body;
  const html = courseMarked.parse(body);

  for (const shortcut of ['Ctrl+Alt+1~8, Ctrl+Alt+9는 마지막 탭', 'Alt+Shift++ / Alt+Shift+-', 'Alt+방향키', 'Ctrl+Shift+W']) {
    assert.ok(html.includes(`<mark>● ${shortcut}</mark>`), `missing highlighted default: ${shortcut}`);
  }
  assert.match(html, /파란색으로 표시된 기본 키/);
  assert.doesNotMatch(body, /Alt\+Shift\+D|자동 방향|자동 분할/);
});
