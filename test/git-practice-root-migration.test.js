import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousGitPracticeRootDefault } from '../src/previous-git-practice-root-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = (c, id) => c.lessons.find(x => x.id === id);
const section = (c, id, sectionId) => lesson(c,id).sections.find(x => x.id === sectionId);

test('untouched published lessons move to the same practice folder but authored changes survive', () => {
  const draft=structuredClone(course);
  for (const id of ['web-coding','web-tools','web']) {
    const previous=previousGitPracticeRootDefault[id], saved=lesson(draft,id);
    saved.sections=structuredClone(previous.sections);
    saved.steps=structuredClone(previous.steps);
    saved.presentation.demo=structuredClone(previous.presentation.demo);
    if (previous.pitfalls) saved.pitfalls=structuredClone(previous.pitfalls);
  }
  const personal=section(draft,'web-coding','tools-css');
  personal.body='강사가 직접 수정한 CSS 안내';
  const result=upgradeNineDefaults(draft,course);
  assert.equal(section(result,'web-coding','tools-css').body,personal.body);
  assert.equal(section(result,'web-coding','tools-html').body,section(course,'web-coding','tools-html').body);
  assert.equal(section(result,'web-tools','frontend-css').body,section(course,'web-tools','frontend-css').body);
  assert.equal(section(result,'web','web-http').body,section(course,'web','web-http').body);
  assert.match(lesson(result,'web-coding').presentation.demo.file,/git-practice의 index\.html/);
});

test('practice instructions keep the same folder and highlight the requested steps', () => {
  const html=section(course,'web-coding','tools-html').body;
  const css=section(course,'web-coding','tools-css').body;
  const js=section(course,'web-coding','tools-javascript').body;
  assert.match(html, /<mark>`head`는 문서 정보/);
  assert.match(html, /<mark>`index\.html`을 우클릭해/);
  assert.match(css, /<mark>\*\*새 파일\*\*을 선택합니다\. `style\.css`/);
  assert.match(js, /<mark>목표는/);
  assert.match(js, /<mark>`defer`는 HTML을 읽은 뒤/);
  const vite=section(course,'web','web-http').body;
  assert.match(vite, /cd ~\/git-practice\n/);
  assert.match(vite, /npm install\nnpm run dev/);
  assert.doesNotMatch(vite, /node server\.cjs/);
  assert.doesNotMatch(vite, /git-practice\/course-card\/03-javascript/);
});
