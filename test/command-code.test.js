import test from 'node:test';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import { createCommandRenderer, renderCopyableCode } from '../src/command-code.js';

test('a grouped shell example offers a separate payload for each command without copying comment-only explanations', () => {
  const html=renderCopyableCode('pwd\n# 같은 내용을 읽는 명령\nls\ncat .\\memo.txt','powershell');
  assert.equal((html.match(/data-copy-value=/g)||[]).length,3);
  assert.ok(html.includes('data-copy-value="pwd"'));
  assert.ok(html.includes('data-copy-value="cat .\\memo.txt"'));
  assert.ok(html.includes('# 같은 내용을 읽는 명령'));
  assert.ok(!html.includes('data-copy-value="#'));
});

test('commands are escaped as data rather than executable HTML and keep quotes, ampersands and Korean text', () => {
  const source='echo "<img src=x onerror=alert(1)> & 돌범"';
  const html=renderCopyableCode(source,'powershell');
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('data-copy-value="echo &quot;&lt;img src=x onerror=alert(1)&gt; &amp; 돌범&quot;"'));
});

test('inline commands stay plain code without copy controls or extra wrappers', () => {
  const html=marked.parse('`pwd`와 `wt -d .`, 파일 `memo.txt`, 옵션 `-d`, 키 `Ctrl+T`',{renderer:createCommandRenderer()});
  assert.equal((html.match(/data-copy-value=/g)||[]).length,0);
  assert.ok(!html.includes('<button'));
  assert.ok(!html.includes('inline-command'));
  assert.ok(html.includes('<code>pwd</code>'));
  assert.ok(html.includes('<code>wt -d .</code>'));
});

test('a paragraph beside a command box has copy controls only inside the box', () => {
  const html=marked.parse('`Get-Location`과 `pwd`는 같은 위치를 보여 줍니다.\n\n```powershell\nGet-Location\npwd\n```',{renderer:createCommandRenderer()});
  assert.ok(!html.slice(0,html.indexOf('</p>')).includes('data-copy-value'));
  assert.equal((html.match(/data-copy-value=/g)||[]).length,2);
  assert.ok(html.includes('data-copy-value="Get-Location"'));
  assert.ok(html.includes('data-copy-value="pwd"'));
});

test('HTML, JavaScript and Markdown source remain whole code examples', () => {
  for(const [lang,source] of [['html','<article x-data="{open:false}">\n  <p>Git</p>\n</article>'],['javascript','const a = 1;\nconsole.log(a);'],['markdown','# 목표\n확인해 주세요.']]) {
    const html=renderCopyableCode(source,lang);
    assert.equal((html.match(/data-copy-value=/g)||[]).length,1);
    assert.ok(html.includes('data-copy-kind="block"'));
    assert.ok(!html.includes('<article'));
  }
});

test('a prefixed text demonstration displays its context but copies only the command', () => {
  const html=renderCopyableCode('PowerShell: pwd\nGUI: 탐색기로 확인\n탐색기 주소 표시줄: wt -d .','text');
  assert.ok(html.includes('PowerShell: pwd'));
  assert.ok(html.includes('data-copy-value="pwd"'));
  assert.ok(html.includes('data-copy-value="wt -d ."'));
  assert.ok(!html.includes('data-copy-value="GUI:'));
});

test('carriage-return boundaries display separately and multiline payloads survive HTML attribute normalization', () => {
  assert.equal((renderCopyableCode('pwd\rls','powershell').match(/data-copy-value=/g)||[]).length,2);
  const html=renderCopyableCode('Get-ChildItem `\r\n  -Name','powershell');
  assert.equal((html.match(/data-copy-value=/g)||[]).length,1);
  assert.ok(html.includes('data-copy-value="Get-ChildItem `&#13;&#10;  -Name"'));
});
