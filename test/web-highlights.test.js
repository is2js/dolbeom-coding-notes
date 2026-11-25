import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebHighlightsDefault } from '../src/previous-web-highlights-default.js';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const web = c => c.lessons.find(l => l.id === 'web');
const section = (c, id) => web(c).sections.find(s => s.id === id);

test('the web lesson emphasizes roles, card data and all three future stages', () => {
  const roles = section(course, 'web-html').body;
  const cards = section(course, 'web-json-card').body;
  const future = section(course, 'web-future-backend').body;
  assert.match(roles, /<mark>\*\*프론트엔드\*\*는 사용자가 보고 누르는 화면입니다\.<\/mark>/);
  assert.match(roles, /<mark>\*\*백엔드\*\*는 서버에서 요청을 받고 데이터를 준비·저장하는 부분입니다\.<\/mark>/);
  assert.match(roles, /<mark>React, Vue<\/mark>/);
  assert.match(roles, /<mark>FastAPI<\/mark>/);
  assert.match(courseMarked.parse(roles), /<mark>React, Vue<\/mark>/);
  assert.match(courseMarked.parse(roles), /<mark>FastAPI<\/mark>/);
  assert.match(courseMarked.parse(cards), /<mark><code>lessons<\/code>는 강의 데이터 목록/);
  assert.equal((cards.match(/<mark>/g) || []).length, 5);
  assert.equal((future.match(/<mark>/g) || []).length, 3);
  assert.match(future, /브라우저가 데이터베이스에 직접 접속하는 것은 아닙니다/);
  assert.match(section(course, 'web-html').presentationPoints.join(' '), /후속 강의/);
});

test('untouched published fields update while custom text and deleted sections remain', () => {
  const saved = structuredClone(course);
  const lesson = web(saved);
  for (const previous of previousWebHighlightsDefault.sections) {
    if (!previous.body) continue;
    const current = lesson.sections.find(s => s.id === previous.id);
    current.body = previous.body;
    current.presentationPoints = structuredClone(previous.presentationPoints);
  }
  lesson.closing = previousWebHighlightsDefault.closing;
  lesson.presentation.returnSummary = previousWebHighlightsDefault.presentation.returnSummary;
  const result = upgradeNineDefaults(saved, course);
  for (const id of ['web-html', 'web-json-card', 'web-future-backend']) {
    assert.equal(section(result, id).body, section(course, id).body);
    assert.deepEqual(section(result, id).presentationPoints, section(course, id).presentationPoints);
  }
  assert.equal(web(result).closing, web(course).closing);
  assert.deepEqual(upgradeNineDefaults(result, course), result);
  section(saved, 'web-html').body += '\n\n강사가 추가한 내용';
  assert.equal(section(upgradeNineDefaults(saved, course), 'web-html').body, section(saved, 'web-html').body);
  lesson.sections = lesson.sections.filter(s => s.id !== 'web-http');
  assert.ok(!web(upgradeNineDefaults(saved, course)).sections.some(s => s.id === 'web-http'));
});

test('newer drafts keep either data section deleted rather than resurrecting it', () => {
  for (const removed of ['web-json-card', 'web-future-backend']) {
    const saved = structuredClone(course);
    web(saved).sections = web(saved).sections.filter(s => s.id !== removed);
    const migrated = upgradeNineDefaults(saved, course);
    assert.ok(!web(migrated).sections.some(s => s.id === removed));
    assert.ok(web(migrated).sections.some(s => s.id === (removed === 'web-json-card' ? 'web-future-backend' : 'web-json-card')));
  }
});
