import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousIdeSetupScreenshotsDefault as previous, previousIdePreviewBindingsDefault } from '../src/previous-ide-setup-screenshots-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = course.lessons.find(item => item.id === 'ide');

test('IDE case presents the supplied README screenshot before the subsequent diff demonstration', () => {
  const image = courseMarked.lexer(lesson.case.body)[0].tokens[0];
  assert.equal(lesson.case.kind, 'real');
  assert.equal(image.type, 'image');
  assert.equal(image.href, './assets/course/ide-vscode-readme-edit-case.png');
  const asset = readFileSync(new URL('../public/assets/course/ide-vscode-readme-edit-case.png', import.meta.url));
  assert.deepEqual([...asset.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.match(lesson.case.body, /캡처는 강사가 `git-practice-clone`에서 편집하는 화면/);
  assert.match(lesson.case.body, /늘어난 파일을 찾기[\s\S]*실수가 의심되는 곳을 확인하기[\s\S]*어떤 파일과 줄을 바꿨는지 보기/);
  assert.match(lesson.case.body, /소스 제어와 Diff 화면은 이어지는 실제 시연/);
  assert.ok(lesson.case.body.indexOf('Ctrl+S') < lesson.case.body.indexOf('소스 제어(Source Control)'));
  assert.match(lesson.presentation.caseSummary, /소스 제어.*Diff/);
});

test('the VS Code installation walkthrough includes four extension images and Prettier settings in order', () => {
  const body = lesson.sections.find(section => section.id === 'tools-vscode-setup').body;
  const blocks = courseMarked.lexer(body);
  assert.equal(blocks.filter(token => token.type === 'table').length, 1);
  assert.equal(blocks.filter(token => token.type === 'blockquote').length, 2);
  assert.doesNotMatch(body, /User Setup|System Setup/);
  assert.match(body, /여기서 잠시 멈추고 VS Code를 설치한 뒤 돌아와 주세요\.\n\n### 2\. 원본 폴더 열기/);
  assert.match(body, /Editor: Default Formatter[\s\S]*Editor: Format On Save/);
  const images = [];
  courseMarked.walkTokens(blocks, token => { if (token.type === 'image') images.push(token.href); });
  assert.deepEqual(images, [
    './assets/course/ide-vscode-extension-korean.png',
    './assets/course/ide-vscode-extension-prettier.png',
    './assets/course/ide-vscode-extension-eslint.png',
    './assets/course/ide-vscode-extension-live-server.png',
    './assets/course/ide-vscode-prettier-settings.png',
  ]);
  for (const path of images) {
    const asset = readFileSync(new URL(`../public/${path.slice(2)}`, import.meta.url));
    assert.deepEqual([...asset.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
});

test('saved IDE defaults adopt new instructions and preserve instructor edits', () => {
  const draft = structuredClone(course);
  const old = draft.lessons.find(item => item.id === 'ide');
  old.case.body = previous.case.body;
  const setup = old.sections.find(section => section.id === 'tools-vscode-setup');
  Object.assign(setup, previous.sections.find(section => section.id === setup.id));
  setup.body = '강사가 수정한 설치 순서';
  const updated = upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide');
  assert.equal(updated.case.body, lesson.case.body);
  assert.equal(updated.sections.find(section => section.id === setup.id).body, setup.body);
  assert.deepEqual(updated.sections.find(section => section.id === setup.id).presentationPoints, lesson.sections.find(section => section.id === setup.id).presentationPoints);
});

test('IDE lessons keep the enhanced Markdown preview optional and teach the built-in fallback', () => {
  const setup = lesson.sections.find(section => section.id === 'tools-vscode-setup');
  const keys = lesson.sections.find(section => section.id === 'tools-vscode');
  const practice = lesson.sections.find(section => section.id === 'tools-shortcuts-practice');
  assert.match(setup.body, /Markdown Preview Enhanced \(선택 확장\)/);
  assert.match(setup.body, /@id:shd101wyy\.markdown-preview-enhanced/);
  assert.match(keys.body, /markdown-preview-enhanced\.openPreview.*not found/);
  assert.match(keys.body, /Ctrl\+Shift\+P.*Markdown: Open Preview to the Side.*측면에서 미리 보기 열기/);
  assert.match(practice.body, /미리보기 단축키 오류 해결/);

  const draft = structuredClone(course);
  const ide = draft.lessons.find(item => item.id === 'ide');
  ide.sections.find(section => section.id === keys.id).body = previousIdePreviewBindingsDefault.sections.find(section => section.id === keys.id).body;
  const updated = upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide');
  assert.equal(updated.sections.find(section => section.id === keys.id).body, keys.body);
});
