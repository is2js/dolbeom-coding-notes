import test from 'node:test';
import assert from 'node:assert/strict';
import { practiceSeed, markdownPractice, editMarkdown, indentMarkdown } from '../src/markdown-practice.js';

test('Tab inserts four spaces by default and two spaces when selected', () => {
  assert.deepEqual(indentMarkdown('abc', 1, 1), {source: 'a    bc', start: 5, end: 5});
  assert.deepEqual(indentMarkdown('abc', 1, 1, 2), {source: 'a  bc', start: 3, end: 3});
});

test('selected lines indent and outdent without including a line after the trailing newline', () => {
  const text = '- one\n- two\nnext';
  const indented = indentMarkdown(text, 0, 12, 4);
  assert.deepEqual(indented, {source: '    - one\n    - two\nnext', start: 4, end: 20});
  assert.deepEqual(indentMarkdown(indented.source, indented.start, indented.end, 4, true), {source: text, start: 0, end: 12});
  assert.deepEqual(indentMarkdown('  one\n\ttwo', 0, 10, 4, true), {source: 'one\ntwo', start: 0, end: 7});
  assert.deepEqual(indentMarkdown('    abc', 5, 5, 4, true), {source: 'abc', start: 1, end: 1});
});

test('Ctrl+M allows keyboard focus navigation and toggles back to indentation', () => {
  const practice = markdownPractice('', {render: text => text});
  let prevented = false;
  const event = {key:'m', ctrlKey:true, altKey:false, metaKey:false, shiftKey:false, preventDefault(){ prevented = true; }};
  practice.handleIndentKey(event);
  assert.equal(prevented, true);
  assert.equal(practice.tabInsertsSpaces, false);
  let tabPrevented = false;
  practice.handleIndentKey({key:'Tab', ctrlKey:false, altKey:false, metaKey:false, shiftKey:false, preventDefault(){ tabPrevented = true; }});
  assert.equal(tabPrevented, false);
  practice.handleIndentKey(event);
  assert.equal(practice.tabInsertsSpaces, true);
});

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

test('toolbar formatting respects selected Korean text and the remembered cursor', () => {
  const result = editMarkdown('앞 문장 뒤', 2, 4, 'bold');
  assert.equal(result.source, '앞 **문장** 뒤');
  assert.equal(result.source.slice(result.start, result.end), '문장');
  assert.equal(editMarkdown('앞 뒤', 2, 2, 'italic').source, '앞 *기울인 글씨*뒤');
  assert.equal(editMarkdown('', 0, 0, 'heading2').source, '## 제목');
});

test('list actions cover selected lines without consuming the following line', () => {
  const result = editMarkdown('첫째\n둘째\n다음', 0, 6, 'task');
  assert.equal(result.source, '- [ ] 첫째\n- [ ] 둘째\n다음');
  assert.equal(editMarkdown('a\nb', 0, 3, 'ordered').source, '1. a\n2. b');
  assert.equal(editMarkdown('완료', 0, 2, 'checkedTask').source, '- [x] 완료');
});

test('table and nested code insertion create independent valid blocks at the cursor', () => {
  const result = editMarkdown('앞뒤', 1, 1, 'table', {columns:3, rows:2});
  assert.ok(result.source.startsWith('앞\n\n| 제목 1 | 제목 2 | 제목 3 |\n| --- | --- | --- |'));
  assert.ok(result.source.endsWith('\n\n뒤'));
  const nested = editMarkdown('````md\n# 예제\n````', 0, 18, 'codeBlock').source;
  assert.ok(nested.startsWith('`````text\n'));
  assert.ok(nested.endsWith('\n`````'));
  const withImage = editMarkdown('| a | b |\n| --- | --- |\n| c | d |', 99, 99, 'image', {label:'화면', url:'https://example.com/image.png'});
  assert.ok(withImage.source.endsWith('| c | d |\n\n![화면](https://example.com/image.png)'));
});

test('images remain scoped to one practice instance and reset and destruction revoke their URLs', async () => {
  let sequence = 0;
  const revoked = [], rendered = [];
  const practice = markdownPractice('', {
    render: (text, options) => { rendered.push(options.allowedImageSources.slice()); return text; },
    copy: async () => true,
    createImageUrl: () => `blob:practice-${++sequence}`,
    revokeImageUrl: url => revoked.push(url),
  });
  practice.insertImageFile({type:'image/svg+xml', size:12, name:'unsafe.svg'});
  assert.deepEqual(practice.imageSources, []);
  practice.insertImageFile({type:'image/png', size:11 * 1024 * 1024, name:'large.png'});
  assert.deepEqual(practice.imageSources, []);
  practice.insertImageFile({type:'image/png', size:120, name:'화면.png'});
  assert.match(practice.preview, /!\[화면.png\]\(blob:practice-1\)/);
  assert.deepEqual(rendered.at(-1), ['blob:practice-1']);
  await practice.copySource();
  assert.match(practice.message, /이 창에서만/);
  practice.reset();
  assert.deepEqual(revoked, ['blob:practice-1']);
  assert.equal(practice.source, '');
  practice.insertImageFile({type:'image/jpeg', size:120, name:'other.jpg'});
  practice.destroy();
  assert.deepEqual(revoked, ['blob:practice-1','blob:practice-2']);
});

test('clipboard image insertion consumes only image pastes and URL insertion validates https', () => {
  const practice = markdownPractice('', {render: text => text, createImageUrl: ()=>'blob:paste', revokeImageUrl:()=>{}});
  let prevented = false;
  practice.pasteImage({clipboardData:{items:[{kind:'string',type:'text/plain'}]},preventDefault(){ prevented = true; }});
  assert.equal(prevented, false);
  practice.pasteImage({clipboardData:{items:[{kind:'file',type:'image/png',getAsFile:()=>({type:'image/png',size:100})}]},preventDefault(){ prevented = true; }});
  assert.equal(prevented, true);
  assert.match(practice.source, /blob:paste/);
  const before = practice.source;
  practice.imageUrl = 'javascript:alert(1)'; practice.insertImageUrl();
  assert.equal(practice.source, before);
  practice.imageUrl = 'https://example.com/image\n.png'; practice.insertImageUrl();
  assert.equal(practice.source, before);
  practice.imageUrl = 'https://example.com/figure(1).png'; practice.insertImageUrl();
  assert.match(practice.source, /https:\/\/example.com\/figure%281%29.png/);
});
