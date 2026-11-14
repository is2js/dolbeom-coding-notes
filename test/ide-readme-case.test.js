import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = course.lessons.find(item => item.id === 'ide');

test('IDE case presents the supplied README screenshot before the subsequent diff demonstration', () => {
  const image = courseMarked.lexer(lesson.case.body)[0].tokens[0];
  assert.equal(lesson.case.kind, 'real');
  assert.equal(image.type, 'image');
  assert.equal(image.href, './assets/course/ide-vscode-readme-case.png');
  const asset = readFileSync(new URL('../public/assets/course/ide-vscode-readme-case.png', import.meta.url));
  assert.deepEqual([...asset.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.match(lesson.case.body, /이미지는 README를 편집기에서 연 장면/);
  assert.match(lesson.case.body, /소스 제어와 Diff 화면은 이어지는 실제 시연/);
  assert.ok(lesson.case.body.indexOf('Ctrl+S') < lesson.case.body.indexOf('소스 제어(Source Control)'));
  assert.match(lesson.presentation.caseSummary, /소스 제어.*Diff/);
});
