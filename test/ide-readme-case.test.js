import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import {
  previousIdeSetupScreenshotsDefault as previous,
  previousIdePreviewBindingsDefault,
  previousIdePreviewFallbackDefault,
  previousIdeExternalTerminalDefault,
  previousIdeGitUiDefault,
  previousIdeHighlightsVscodeDefault,
} from '../src/previous-ide-setup-screenshots-default.js';

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

test('README source control walkthrough updates untouched saved text and keeps authored edits', () => {
  const section = lesson.sections.find(item => item.id === 'codex-context');
  assert.match(section.body, /한 줄 바꾸고 변경 비교[\s\S]*스테이징하고 커밋·전송하기[\s\S]*GitHub에서 방금 올린 내용 보기/);
  assert.match(section.body, /동기화는 원격 변경을 먼저 가져온 뒤 내 커밋을 push/);
  const asset = readFileSync(new URL('../public/assets/course/ide-vscode-readme-stage-commit-sync.png', import.meta.url));
  assert.deepEqual([...asset.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === 'ide');
  const savedSection = saved.sections.find(item => item.id === section.id);
  Object.assign(savedSection, previousIdeGitUiDefault.sections.find(item => item.id === section.id));
  Object.assign(saved.steps.find(item => item.id === 'tools-05'), previousIdeGitUiDefault.steps.find(item => item.id === 'tools-05'));
  const migrate = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide');
  assert.equal(migrate().sections.find(item => item.id === section.id).body, section.body);
  assert.equal(migrate().steps.find(item => item.id === 'tools-05').code, lesson.steps.find(item => item.id === 'tools-05').code);
  savedSection.body += '\n\n강사의 추가 메모';
  assert.equal(migrate().sections.find(item => item.id === section.id).body, savedSection.body);
  const removedStep = saved.steps.pop();
  assert.equal(migrate().steps.some(item => item.id === removedStep.id), false);
});

test('IDE emphasis and source control updates migrate prior defaults without replacing edited notes', () => {
  const keys = lesson.sections.find(item => item.id === 'tools-vscode');
  const flow = lesson.sections.find(item => item.id === 'codex-context');
  assert.match(keys.body, /<mark>\*\*파일 이름, 문서 내용, 기능 이름\*\*[\s\S]*<mark>\*\*Ctrl \+ 백틱 키\*\*/);
  const comparison = flow.body.split('### 2. 한 줄 바꾸고 변경 비교')[1].split('### 3.')[0];
  assert.doesNotMatch(comparison, /git diff|git status|```/);
  assert.match(comparison, /소스 제어/);
  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === 'ide');
  for (const oldSection of previousIdeHighlightsVscodeDefault.sections) {
    Object.assign(saved.sections.find(item => item.id === oldSection.id), oldSection);
  }
  saved.checklist = structuredClone(previousIdeHighlightsVscodeDefault.checklist);
  saved.closing = previousIdeHighlightsVscodeDefault.closing;
  const migrated = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide');
  assert.equal(migrated().closing, lesson.closing);
  assert.deepEqual(migrated().checklist, lesson.checklist);
  assert.equal(migrated().sections.find(item => item.id === flow.id).body, flow.body);
  saved.sections.find(item => item.id === flow.id).body += '\n\n강사의 실습 메모';
  assert.match(migrated().sections.find(item => item.id === flow.id).body, /강사의 실습 메모/);
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

test('the IDE walkthrough teaches both local settings and preserves earlier saved edits', () => {
  const keys = lesson.sections.find(section => section.id === 'tools-vscode');
  assert.match(keys.body, /기본 키가 잘 작동하면 이 설정은 건너뜁니다/);
  assert.match(keys.body, /바로 가기 키 열기\(JSON\).*keybindings\.json/);
  const example = courseMarked.lexer(keys.body).find(token => token.type === 'code' && token.lang === 'json');
  assert.deepEqual(JSON.parse(example.text), [
    {
      key: 'ctrl+k v',
      command: 'markdown.showPreviewToSide',
      when: 'editorLangId == markdown && !notebookEditorFocused && !editorHasSelection',
    },
    {
      key: 'ctrl+shift+v',
      command: 'markdown.showPreview',
      when: 'editorLangId == markdown && !notebookEditorFocused',
    },
  ]);
  const terminal = keys.body.slice(keys.body.indexOf('**Ctrl + 백틱 키**'));
  assert.match(terminal, /통합 터미널에서 PowerShell 7 열기[\s\S]*기본 프로필 선택[\s\S]*새 터미널/);
  const blocks = courseMarked.lexer(terminal);
  assert.deepEqual(blocks.filter(token => token.type === 'code').map(token => token.text), [
    '$PSVersionTable.PSVersion',
    'pwd',
    'where.exe wt.exe',
  ]);
  const images = [];
  courseMarked.walkTokens(blocks, token => { if (token.type === 'image') images.push(token.href); });
  assert.deepEqual(images, ['./assets/course/ide-vscode-external-windows-terminal.png']);
  const screenshot = readFileSync(new URL('../public/' + images[0].slice(2), import.meta.url));
  assert.deepEqual([...screenshot.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);

  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === 'ide').sections.find(section => section.id === keys.id);
  Object.assign(saved, previousIdePreviewFallbackDefault.sections.find(section => section.id === keys.id));
  const migrated = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide').sections.find(section => section.id === keys.id);
  assert.deepEqual(migrated(), keys);
  Object.assign(saved, previousIdeExternalTerminalDefault.sections.find(section => section.id === keys.id));
  assert.deepEqual(migrated(), keys);
  saved.body += '\n\n나만의 단축키 메모';
  assert.equal(migrated().body, saved.body);
  assert.deepEqual(migrated().presentationPoints, keys.presentationPoints);
  const previousSteps = draft.lessons.find(item => item.id === 'ide').steps;
  const removedStep = previousSteps.pop();
  assert.equal(upgradeNineDefaults(draft, course).lessons.find(item => item.id === 'ide').steps.some(step => step.id === removedStep.id), false);
});
