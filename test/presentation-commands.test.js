import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { presentationCommandGroups, presentationDemoCommands, showPresentationPoints } from '../src/presentation-commands.js';

test('terminal presentation prioritizes copyable commands without changing saved points or other lessons', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const terminal = course.lessons.find(lesson => lesson.id === 'terminal');
  const section = terminal.sections.find(item => item.id === 'terminal-example');
  const originalPoints = [...section.presentationPoints];
  const page = { points: section.presentationPoints, section };
  assert.equal(showPresentationPoints('terminal', page), false);
  assert.ok(presentationCommandGroups(section.body).length);
  assert.deepEqual(section.presentationPoints, originalPoints);
  assert.equal(showPresentationPoints('git', page), true);
  assert.equal(showPresentationPoints('terminal', { points: ['단축키를 연습합니다.'], section: { body: '단축키 설명' } }), true);
  assert.equal(showPresentationPoints('terminal', { points: null, section }), false);
  const host = terminal.sections.find(item => item.id === 'terminal-host-shell');
  const install = presentationCommandGroups(host.body).find(group => group.code.includes('winget install'));
  assert.equal(install.optionalInstall, true);
  assert.match(install.context, /필요한 경우에만/);
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
