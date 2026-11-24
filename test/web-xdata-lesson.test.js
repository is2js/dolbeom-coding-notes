import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebXDataDefault } from '../src/previous-web-xdata-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const web = data => data.lessons.find(item => item.id === 'web');
const section = (data, id) => web(data).sections.find(item => item.id === id);
const sample = readFileSync(new URL('../public/examples/course-card/alpine-data/index.html', import.meta.url), 'utf8');

test('the runnable example and lesson use the same direct x-data array', () => {
  const body = section(course, 'web-json-card').body;
  const main = sample.match(/  <main[\s\S]*?  <\/main>/)?.[0];
  assert.ok(main && body.includes(main), 'lesson includes the complete working example');
  assert.doesNotMatch(main, /JSON\.parse|application\/json/);
  const expression = main.match(/x-data="([\s\S]*?)"/)?.[1];
  assert.ok(expression);
  const data = runInNewContext(`(${expression})`);
  assert.deepEqual(Array.from(data.lessons, item => item.title), ['윈도우 터미널', 'Git']);
  assert.deepEqual(Array.from(data.lessons, item => item.minutes), [30, 25]);
  assert.match(main, /x-for="\(lesson, index\) in lessons"/);
  assert.match(main, /x-data="\{ open: false \}"/);
  assert.match(main, /x-text="open \? '설명 접기' : '설명 보기'"/);
  assert.match(main, /:aria-controls="'detail-' \+ index"/);
  assert.match(main, /:id="'detail-' \+ index"/);
  assert.match(body, /127\.0\.0\.1:5173\/alpine-data-practice\.html/);
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
