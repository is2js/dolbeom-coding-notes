import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';

test('the terminal shortcut comparison highlights the customized actions and omits automatic splitting', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const terminal = course.lessons.find(lesson => lesson.id === 'terminal');
  const body = terminal.sections.find(section => section.id === 'terminal-shortcuts').body;
  const html = courseMarked.parse(body);

  for (const shortcut of ['Alt+Shift++ / Alt+Shift+-', 'Ctrl+Shift+W']) {
    assert.ok(html.includes(`<mark>● ${shortcut}</mark>`), `missing highlighted default: ${shortcut}`);
  }
  assert.match(html, /인접 분할 창으로 포커스 이동<\/td>\s*<td><code>Alt\+방향키<\/code><\/td>/);
  assert.doesNotMatch(body, /<mark>● Alt\+방향키<\/mark>|Ctrl\+Alt\+방향키|Ctrl\+Alt\+←/);
  const comparison = body.split('### 2. 강사의 키와 비교')[1].split('### 3. 내 키로 바꾸고 연습하기')[0];
  assert.doesNotMatch(comparison, /인접 분할 창으로 포커스 이동/);
  assert.match(comparison, /창 복제, Split Down \(가로 분할\).*Ctrl\+Shift\+-.*Alt\+Shift\+-/);
  assert.match(comparison, /창 복제, Split Right \(세로 분할\).*Alt\+Shift\+\+/);
  assert.ok(comparison.includes('Ctrl+Shift+\\'));
  assert.match(comparison, /현재 창을 복제/);
  assert.match(comparison, /기본 프로필의 새 창/);
  assert.match(terminal.sections.find(section => section.id === 'terminal-shortcuts').presentationPoints.join(' '), /기본 `Alt\+방향키`/);
  assert.match(html, /<td>특정 번호 탭으로 이동<\/td>\s*<td><code>Ctrl\+Alt\+1~8<\/code>, <code>Ctrl\+Alt\+9<\/code>는 마지막 탭<\/td>/);
  assert.doesNotMatch(body, /Ctrl\+1~9/);
  const demo = terminal.steps.find(step => step.id === 'terminal-07');
  assert.match(demo.code, /기본 Alt\+방향키/);
  assert.doesNotMatch(JSON.stringify(demo), /Ctrl\+Alt\+방향키|Ctrl\+Alt\+Left/);
  const practice = html.split('3. 내 키로 바꾸고 연습하기')[1];
  assert.equal((practice.match(/<li><mark>/g) || []).length, 4);
  assert.match(practice, /<code>Ctrl\+Shift\+T<\/code>/);
  assert.match(practice, /<code>Ctrl\+W<\/code>/);
  assert.match(html, /파란색으로 표시된 기본 키/);
  assert.doesNotMatch(body, /Alt\+Shift\+D|자동 방향|자동 분할/);
});
