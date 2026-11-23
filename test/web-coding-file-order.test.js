import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebFileOrderDefault } from '../src/previous-web-file-order-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = course.lessons.find(item => item.id === 'web-coding');
const section = id => lesson.sections.find(item => item.id === id);

test('CSS and JavaScript are created and linked before their examples, matching the completed card', () => {
  const css = section('tools-css').body;
  const javascript = section('tools-javascript').body;
  assert.ok(css.indexOf('style.css 파일 만들기') < css.indexOf('HTML에 CSS 연결하기'));
  assert.ok(css.indexOf('HTML에 CSS 연결하기') < css.indexOf('선택자와 여백 읽기'));
  assert.ok(javascript.indexOf('script.js 파일 만들기') < javascript.indexOf('HTML에 JavaScript 연결하기'));
  assert.ok(javascript.indexOf('HTML에 JavaScript 연결하기') < javascript.indexOf('클릭 동작 작성하고 확인하기'));
  const cssExample = courseMarked.lexer(css).filter(token => token.type === 'code' && token.lang === 'css').at(-1).text;
  const jsExample = courseMarked.lexer(javascript).find(token => token.type === 'code' && token.lang === 'javascript').text;
  const asset = name => readFileSync(new URL(`../public/examples/course-card/03-javascript/${name}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n').trim();
  assert.equal(cssExample.replace(/\n\s*\n/g, '\n'), asset('style.css').replace(/\n\s*\n/g, '\n'));
  assert.equal(jsExample, asset('script.js'));
  assert.match(asset('index.html'), /<link rel="stylesheet" href="style\.css">[\s\S]*<script defer src="script\.js"><\/script>/);
});

test('previous saved defaults upgrade while edited lesson text and removed steps survive', () => {
  const draft = structuredClone(course);
  const saved = draft.lessons.find(item => item.id === lesson.id);
  for (const old of previousWebFileOrderDefault.sections) Object.assign(saved.sections.find(item => item.id === old.id), old);
  for (const old of previousWebFileOrderDefault.steps) Object.assign(saved.steps.find(item => item.id === old.id), old);
  const update = () => upgradeNineDefaults(draft, course).lessons.find(item => item.id === lesson.id);
  assert.equal(update().sections.find(item => item.id === 'tools-css').body, section('tools-css').body);
  const edited = saved.sections.find(item => item.id === 'tools-javascript');
  edited.body += '\n\n강사의 메모';
  assert.equal(update().sections.find(item => item.id === edited.id).body, edited.body);
  const removed = saved.steps.pop();
  assert.equal(update().steps.some(item => item.id === removed.id), false);
});
