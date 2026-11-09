import test from 'node:test';
import assert from 'node:assert/strict';
import { courseMarked } from '../src/course-markdown-engine.js';

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
