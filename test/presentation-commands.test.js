import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { presentationCommandGroups, presentationDemoCommands, useCompactPresentationPoints } from '../src/presentation-commands.js';

test('terminal presentation keeps compact key points alongside copyable commands', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const terminal = course.lessons.find(lesson => lesson.id === 'terminal');
  const section = terminal.sections.find(item => item.id === 'terminal-example');
  const originalPoints = [...section.presentationPoints];
  const page = { points: section.presentationPoints, section };
  assert.equal(useCompactPresentationPoints('terminal', page), true);
  assert.ok(presentationCommandGroups(section.body).length);
  assert.deepEqual(section.presentationPoints, originalPoints);
  assert.equal(useCompactPresentationPoints('git', page), false);
  assert.equal(useCompactPresentationPoints('terminal', { points: ['단축키를 연습합니다.'], section: { body: '단축키 설명' } }), false);
  assert.equal(useCompactPresentationPoints('terminal', { points: null, section }), false);
  assert.match(section.body, /Microsoft Store[\s\S]*?PowerShell[\s\S]*?Windows Terminal[\s\S]*?Get-Location/);
  assert.match(originalPoints.join(' '), /Microsoft Store/);
  const note = terminal.sections.find(item => item.id === 'terminal-gui-cli');
  const noteCommands = presentationCommandGroups(note.body).map(group => group.code).join('\n');
  assert.match(noteCommands, /^notepad\.exe note\.txt$/m);
  assert.doesNotMatch(noteCommands, /Get-Content\s+-LiteralPath/i);
  const host = terminal.sections.find(item => item.id === 'terminal-host-shell');
  assert.doesNotMatch(host.body, /winget\s+install/i);
  assert.match(host.presentationPoints.join(' '), /설치는 선택 사항/);
});

test('presentation command examples use the current section source and keep adjacent safety context', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const section = course.lessons.find(lesson => lesson.id === 'terminal').sections.find(item => item.id === 'terminal-example');
  const groups = presentationCommandGroups(section.body);
  const result = groups.map(group => group.code + group.context).join('\n');
  assert.match(result, /explorer\.exe \./);
  assert.match(result, /cd \.\./);
  assert.match(result, /rmdir -LiteralPath/);
  assert.ok(groups.some(group => /^Get-ChildItem\r?\nls\r?\nls -Force$/m.test(group.code)));
  const explorerLaunch = groups.find(group => group.code.includes('wt -d .'));
  assert.ok(explorerLaunch, '탐색기 주소 표시줄의 wt 명령을 별도로 복사할 수 있다');
  assert.match(explorerLaunch.context, /탐색기에서 \*\*주소 표시줄/);
  assert.equal(explorerLaunch.explorerAddress, true, '탐색기 입력 위치를 기본으로 표시한다');
  assert.equal(presentationCommandGroups('터미널에서 실행합니다.\n\n```text\nwt -d .\n```')[0].explorerAddress, false);
  assert.match(result, /방금 새로 만든 빈/);
  assert.doesNotMatch(result, /ls -Force \.\\git-practice/);
  assert.doesNotMatch(result, /-WhatIf/);
  assert.match(result, /N으로 취소/);
  assert.match(result, /경로는 컴퓨터마다/);
  assert.equal(groups.find(group => group.code.includes('rmdir .\\git-practice')).destructive, true);
  assert.deepEqual(presentationCommandGroups('문장에 `cd ..`만 등장합니다.'), []);
});

test('presentation demo commands expose standalone shell lines without treating prose as executable', () => {
  const output = presentationDemoCommands('화면에서 확인\ngit diff -- index.html\ngit add -- index.html\n설명을 읽습니다.');
  assert.match(output, /data-copy-value="git diff -- index\.html"/);
  assert.match(output, /data-copy-value="git add -- index\.html"/);
  assert.doesNotMatch(output, /data-copy-value="화면에서 확인"/);
  assert.equal(presentationDemoCommands('Get-Location · pwd → Win+R'), '');
  assert.doesNotMatch(presentationDemoCommands('echo "<img src=x onerror=alert(1)>"'), /<img/);
});
