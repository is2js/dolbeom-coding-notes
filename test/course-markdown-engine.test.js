import test from 'node:test';
import assert from 'node:assert/strict';
import { courseMarked } from '../src/course-markdown-engine.js';
import { editMarkdown } from '../src/markdown-practice.js';

test('Korean particles after punctuation-ending strong markup render correctly', () => {
  assert.match(courseMarked.parse('**Ctrl+,**로 설정을 엽니다.'), /<strong>Ctrl\+,<\/strong>로/);
  assert.match(courseMarked.parse('**Ctrl+, → 작업(Actions)**에서 확인합니다.'), /<strong>Ctrl\+, → 작업\(Actions\)<\/strong>에서/);
  assert.match(courseMarked.parse('**현재 위치**를 확인합니다.'), /<strong>현재 위치<\/strong>를/);
  assert.match(courseMarked.parse('**`pwd`**로 확인합니다.'), /<strong><code>pwd<\/code><\/strong>로/);
  assert.equal(courseMarked.parseInline('**Ctrl+,**로'), '<strong>Ctrl+,</strong>로');
});

test('explicit escapes and code keep literal asterisks and malformed markup is not forced bold', () => {
  assert.match(courseMarked.parse('\\*\\*Ctrl+,\\*\\*로'), /\*\*Ctrl\+,\*\*로/);
  assert.match(courseMarked.parse('`**Ctrl+,**로`'), /<code>\*\*Ctrl\+,\*\*로<\/code>/);
  assert.match(courseMarked.parse('```text\n**Ctrl+,**로\n```'), /<code class="language-text">\*\*Ctrl\+,\*\*로/);
  assert.doesNotMatch(courseMarked.parse('** 기호 **로'), /<strong>/);
});

test('practice emphasis works with Korean particles and either Markdown delimiter', () => {
  const inserted = editMarkdown('앞 중요!입니다', 2, 5, 'italic');
  assert.equal(inserted.source, '앞 *중요!*입니다');
  assert.equal(courseMarked.parseInline(inserted.source), '앞 <em>중요!</em>입니다');
  assert.equal(courseMarked.parseInline('*기울임*은 _글자_를 강조하고 _중요!_라고 합니다.'), '<em>기울임</em>은 <em>글자</em>를 강조하고 <em>중요!</em>라고 합니다.');
  assert.equal(courseMarked.parseInline('*`code`*로 *Ctrl+,*를 확인합니다.'), '<em><code>code</code></em>로 <em>Ctrl+,</em>를 확인합니다.');
});

test('Korean emphasis does not change escapes, code, identifiers or other Markdown', () => {
  for (const input of ['\\*중요!*는', '\\_강조_는', '*끝\\*는', 'snake_case_한글', '* 중요한!*는', '*중요! *는']) {
    assert.doesNotMatch(courseMarked.parseInline(input), /<em>/, input);
  }
  assert.equal(courseMarked.parseInline('`*중요!*는 _강조_는`'), '<code>*중요!*는 _강조_는</code>');
  assert.match(courseMarked.parse('```text\n*중요!*는 _강조_는\n```'), /<code class="language-text">\*중요!\*는 _강조_는/);
  assert.equal(courseMarked.parseInline('**굵게**와 *~~취소~~!*는'), '<strong>굵게</strong>와 <em><del>취소</del>!</em>는');
  assert.equal(courseMarked.parseInline('*내부 **굵게**!*는'), '*내부 <strong>굵게</strong>!*는');
  assert.equal(courseMarked.parseInline('**중요!**는'), '<strong>중요!</strong>는');
});
