import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const course = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const body = course.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http').body;
const normalize = text => text.replace(/\r\n/g, '\n').trim();

test('frontend lesson shows the actual Vite example files and keeps npm as a reading exercise', () => {
  const files = [['index.html', 'html'], ['style.css', 'css'], ['script.js', 'javascript'], ['package.json', 'json']];
  for (const [name, language] of files) {
    const heading = `**\`${name}\`:`;
    const start = body.indexOf(heading);
    assert.notEqual(start, -1, name);
    const block = body.slice(start).match(new RegExp('```' + language + '\\n([\\s\\S]*?)\\n```'));
    assert.ok(block, `missing ${name} code block`);
    const actual = fs.readFileSync(new URL(`../public/examples/course-card/04-vite-dev/${name}`, import.meta.url), 'utf8');
    assert.equal(normalize(block[1]), normalize(actual), name);
  }
  assert.match(body, /이번 강의에서는 실행하지 않습니다/);
  assert.ok(!body.includes('github.com/is2js/dolbeom-coding-notes/tree/'));
});
