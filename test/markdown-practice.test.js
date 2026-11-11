import test from 'node:test';
import assert from 'node:assert/strict';
import { practiceSeed, markdownPractice } from '../src/markdown-practice.js';

test('selects the first authored Markdown example without truncating its nested code fence', () => {
  const body = ['설명', '', '````markdown', '# 계획', '', '```js', 'console.log("ok")', '```', '````', '', '```markdown', '# 다른 예제', '```'].join('\n');
  assert.equal(practiceSeed(body), '# 계획\n\n```js\nconsole.log("ok")\n```');
  assert.equal(practiceSeed('예제가 없는 강의'), '');
  assert.equal(practiceSeed('```powershell\npwd\n```'), '');
});

test('practice edits and reset are isolated, and preview and copy use the current text', async () => {
  const body = '```markdown\n# 계획\n```';
  let copied = '';
  const copy = async text => { copied = text; return true; };
  const render = text => `preview:${text}`;
  const first = markdownPractice(body, {render, copy});
  const second = markdownPractice(body, {render, copy});
  first.source = '**수정**';
  assert.equal(first.preview, 'preview:**수정**');
  assert.equal(second.source, '# 계획');
  await first.copySource();
  assert.equal(copied, '**수정**');
  first.reset();
  assert.equal(first.source, '# 계획');
  assert.equal(body, '```markdown\n# 계획\n```');
});

test('the missing-example state remains editable and clipboard failure is reported', async () => {
  const practice = markdownPractice('', {render: text => text, copy: async () => false});
  assert.equal(practice.original, '');
  practice.source = '연습';
  await practice.copySource();
  assert.match(practice.message, /복사하지 못했습니다/);
});
