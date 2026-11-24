import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebPruneDefault } from '../src/previous-web-prune-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const lesson = value => value.lessons.find(item => item.id === 'web');
const section = value => lesson(value).sections.find(item => item.id === 'web-http');

test('Vite comparison retains setup and troubleshooting while removing sections 5 and 6', () => {
  const text = section(course).body;
  assert.match(text, /### 4\. import 오류가 나면 Node\.js 확인/);
  assert.doesNotMatch(text, /### 5\. 보충 실습 · 이전 Node\.js에서 카드 열기/);
  assert.doesNotMatch(text, /### 6\. 후속 강의 · FastAPI로 같은 카드 열기/);
  assert.doesNotMatch(text, /node server\.cjs/);
  assert.ok(lesson(course).sections.some(item => item.id === 'web-future-backend'));
});

test('older unedited Vite body is updated without replacing custom notes', () => {
  const draft = structuredClone(course);
  const previous = previousWebPruneDefault.sections.find(item => item.id === 'web-http');
  section(draft).body = previous.body;
  assert.equal(section(upgradeNineDefaults(draft, course)).body, section(course).body);
  section(draft).body += '\n\n강사가 직접 작성한 메모';
  assert.equal(section(upgradeNineDefaults(draft, course)).body, section(draft).body);
});
