import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const copy = value => structuredClone(value);
const body = course => course.lessons.find(lesson => lesson.id === 'web-tools').sections.find(section => section.id === 'frontend-css');
const title = '### Tailwind CSS를 뭐라고 부를까요?';
const anchor = '### 1. 직접 작성한 CSS 다시 보기';
const source = body(latest).body;
const insert = source.slice(source.indexOf(title), source.indexOf(anchor));

test('inserts the new explanation once into an authored body without altering its text', () => {
  const draft = copy(latest);
  const original = `사용자 도입문\n\n${anchor}\n\n강사가 직접 수정한 예제와 문장`;
  body(draft).body = original;
  const upgraded = upgradeNineDefaults(draft, latest);
  assert.equal(body(upgraded).body, original.replace(anchor, insert + anchor));
  assert.equal(body(draft).body, original);
  assert.equal(body(upgradeNineDefaults(upgraded, latest)).body, body(upgraded).body);
  body(upgraded).body = original;
  assert.equal(body(upgradeNineDefaults(upgraded, latest)).body, original, 'a later intentional deletion stays deleted');
});

test('preserves an existing authored explanation and does not insert without a unique anchor', () => {
  for (const original of [
    `앞부분\n${title}\n직접 쓴 설명\n${anchor}\n끝`,
    '앵커를 바꾼 사용자의 강의 본문',
    `${anchor}\n사용자가 복제한 단락\n${anchor}`,
  ]) {
    const draft = copy(latest);
    body(draft).body = original;
    assert.equal(body(upgradeNineDefaults(draft, latest)).body, original);
  }
});
