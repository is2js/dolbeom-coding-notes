import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebXDataDefault } from '../src/previous-web-xdata-default.js';
import { previousWebXDataIndexDefault } from '../src/previous-web-xdata-index-default.js';
import { previousWebProgressiveDefault } from '../src/previous-web-progressive-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const web = data => data.lessons.find(item => item.id === 'web');
const section = (data, id) => web(data).sections.find(item => item.id === id);
const sample = readFileSync(new URL('../public/examples/course-card/alpine-data/index.html', import.meta.url), 'utf8');

test('small lesson edits progressively build the same runnable example', () => {
  const body = section(course, 'web-json-card').body;
  const blocks = [...body.matchAll(/```html\n([\s\S]*?)\n```/g)].map(match => match[1]);
  assert.equal(blocks.length, 8);
  const singleExpression = blocks[0].match(/x-data="([\s\S]*?)"/)?.[1];
  const single = runInNewContext(`(${singleExpression})`);
  assert.equal(single.lesson.title, 'Git');
  assert.equal(single.lesson.minutes, 25);
  assert.equal(single.open, false);
  assert.match(blocks[1], /x-text="lesson\.title"/);
  assert.match(blocks[2], /x-text="lesson\.description"/);
  let assembled = readFileSync(new URL('../public/examples/course-card/04-vite-dev/index.html', import.meta.url), 'utf8');
  function replaceOnce(before, after) {
    assert.equal(assembled.split(before).length, 2, `single editable occurrence: ${before}`);
    assembled = assembled.replace(before, after);
  }
  replaceOnce('<article class="max-w-80 rounded-xl bg-white p-6" x-data="{ open: false }">', blocks[0]);
  replaceOnce('<h1>Git</h1>', blocks[1]);
  replaceOnce('<p id="detail" x-show="open" x-cloak>변경을 확인하고 기록합니다.</p>', blocks[2]);
  replaceOnce(blocks[0], blocks[3]);
  replaceOnce('</article>', blocks[4]);
  replaceOnce('<h1 x-text="lesson.title">Git</h1>', blocks[5]);
  replaceOnce('aria-controls="detail"', blocks[6]);
  replaceOnce('id="detail"', blocks[7]);
  const normalizeMarkup = value => value.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
  assert.equal(normalizeMarkup(assembled), normalizeMarkup(sample), 'applying each displayed change yields the shipped example');
  assert.doesNotMatch(sample, /JSON\.parse|application\/json/);
  const expression = blocks[3].match(/x-data="([\s\S]*?)"/)?.[1];
  assert.ok(expression);
  const data = runInNewContext(`(${expression})`);
  assert.deepEqual(Array.from(data.lessons, item => item.title), ['윈도우 터미널', 'Git']);
  assert.deepEqual(Array.from(data.lessons, item => item.minutes), [30, 25]);
  assert.match(sample, /x-for="\(lesson, index\) in lessons"/);
  assert.match(sample, /x-data="\{ open: false \}"/);
  assert.match(sample, /x-text="open \? '설명 접기' : '설명 보기'"/);
  assert.match(sample, /:aria-controls="'detail-' \+ index"/);
  assert.match(sample, /:id="'detail-' \+ index"/);
  assert.doesNotMatch(body, /alpine-data-practice\.html|복사본 준비/);
  assert.match(body, /git-practice\/index\.html/);
  assert.match(body, /127\.0\.0\.1:5173\//);
  assert.match(section(course, 'web-json-card').presentationPoints.join(' '), /index\.html/);
  const step = web(course).steps.find(item => item.id === 'web-json-practice');
  assert.equal(step.fileName, 'git-practice/index.html');
  assert.deepEqual(step.files, ['git-practice/index.html']);
});

test('previous published lesson updates while authored changes remain intact', () => {
  const saved = structuredClone(course);
  const lesson = web(saved);
  const oldSection = previousWebProgressiveDefault.sections.find(item => item.id === 'web-json-card');
  const oldStep = previousWebProgressiveDefault.steps.find(item => item.id === 'web-json-practice');
  Object.assign(section(saved, 'web-json-card'), structuredClone(oldSection));
  Object.assign(lesson.steps.find(item => item.id === oldStep.id), structuredClone(oldStep));
  let migrated = upgradeNineDefaults(saved, course);
  assert.equal(section(migrated, 'web-json-card').body, section(course, 'web-json-card').body);
  assert.deepEqual(section(migrated, 'web-json-card').presentationPoints, section(course, 'web-json-card').presentationPoints);
  assert.equal(web(migrated).steps.find(item => item.id === oldStep.id).title, '한 강의에서 카드 목록으로 확장');
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);
  section(saved, 'web-json-card').body += '\n\n강사가 직접 추가한 문장';
  migrated = upgradeNineDefaults(saved, course);
  assert.equal(section(migrated, 'web-json-card').body, section(saved, 'web-json-card').body);
});

test('previous copy-based lesson updates unchanged fields without overwriting author edits', () => {
  const saved = structuredClone(course);
  const lesson = web(saved);
  const oldSection = previousWebXDataIndexDefault.sections.find(item => item.id === 'web-json-card');
  const oldStep = previousWebXDataIndexDefault.steps.find(item => item.id === 'web-json-practice');
  Object.assign(section(saved, 'web-json-card'), structuredClone(oldSection));
  Object.assign(lesson.steps.find(item => item.id === oldStep.id), structuredClone(oldStep));
  const migrated = upgradeNineDefaults(saved, course);
  assert.equal(section(migrated, 'web-json-card').body, section(course, 'web-json-card').body);
  assert.deepEqual(section(migrated, 'web-json-card').presentationPoints, section(course, 'web-json-card').presentationPoints);
  assert.equal(web(migrated).steps.find(item => item.id === oldStep.id).fileName, 'git-practice/index.html');
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);
  section(saved, 'web-json-card').body += '\n\n강사가 직접 추가한 문장';
  assert.equal(section(upgradeNineDefaults(saved, course), 'web-json-card').body, section(saved, 'web-json-card').body);
  lesson.sections = lesson.sections.filter(item => item.id !== 'web-http');
  assert.ok(!web(upgradeNineDefaults(saved, course)).sections.some(item => item.id === 'web-http'));
});

test('the next-lesson preview separates browser state, FastAPI and SQLite', () => {
  const body = section(course, 'web-future-backend').body;
  assert.match(body, /x-data/);
  assert.match(body, /Python 딕셔너리/);
  assert.match(body, /FastAPI가 JSON으로 응답/);
  assert.match(body, /FastAPI가 SQLite에서 데이터를 조회해 JSON으로 응답/);
  assert.match(body, /브라우저가 데이터베이스에 직접 접속하는 것은 아닙니다/);
});

test('old published fields migrate without overwriting the author edits or restoring removed sections', () => {
  const saved = structuredClone(course);
  const lesson = web(saved);
  const previousSection = previousWebXDataDefault.sections.find(item => item.id === 'web-json-card');
  lesson.sections[lesson.sections.findIndex(item => item.id === 'web-json-card')] = structuredClone(previousSection);
  lesson.presentation = structuredClone(previousWebXDataDefault.presentation);
  const migrated = upgradeNineDefaults(saved, course);
  assert.equal(section(migrated, 'web-json-card').body, section(course, 'web-json-card').body);
  assert.equal(web(migrated).presentation.returnSummary, web(course).presentation.returnSummary);
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);
  section(saved, 'web-json-card').body += '\n\n강사가 직접 추가한 문장';
  assert.equal(section(upgradeNineDefaults(saved, course), 'web-json-card').body, section(saved, 'web-json-card').body);
  const removedId = 'web-http';
  lesson.sections = lesson.sections.filter(item => item.id !== removedId);
  assert.ok(!web(upgradeNineDefaults(saved, course)).sections.some(item => item.id === removedId));
});
