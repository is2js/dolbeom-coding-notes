import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const course = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const body = course.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http').body;
const normalize = text => text.replace(/\r\n/g, '\n').trim();

test('frontend lesson introduces the example structure and explains the actual package.json', () => {
  const structure = body.match(/```text\n([\s\S]*?)\n```/);
  assert.ok(structure, 'missing example project structure');
  for (const name of ['index.html', 'style.css', 'script.js', 'package.json', 'package-lock.json', 'README.md']) {
    assert.ok(structure[1].includes(name), name);
  }
  assert.match(body, /https:\/\/github\.com\/is2js\/course-card-vite-example/);

  const start = body.indexOf('**`package.json`: 프로젝트의 약속**');
  assert.notEqual(start, -1, 'missing package.json explanation');
  const block = body.slice(start).match(/```json\n([\s\S]*?)\n```/);
  assert.ok(block, 'missing package.json code block');
  const actual = fs.readFileSync(new URL('../public/examples/course-card/04-vite-dev/package.json', import.meta.url), 'utf8');
  assert.equal(normalize(block[1]), normalize(actual));

  for (const name of ['index.html', 'style.css', 'script.js']) {
    assert.ok(!body.includes('**`' + name + '`:'), name + ' should not be explained separately');
  }
  assert.match(body, /이번 강의에서는 실행하지 않습니다/);
});
