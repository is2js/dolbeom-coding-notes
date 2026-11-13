import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const markdown = course.lessons.find(lesson => lesson.id === 'markdown');

test('README fragments combine into the same complete, project-specific example', () => {
  const section = markdown.sections.find(item => item.id === 'tools-markdown');
  const blocks = courseMarked.lexer(section.body).filter(token => token.type === 'code' && token.lang === 'markdown');
  assert.equal(blocks.length, 6, 'five individually teachable fragments plus one complete example');
  const complete = blocks.at(-1).text;
  for (const fragment of blocks.slice(0, -1)) assert.ok(complete.includes(fragment.text), fragment.text);
  assert.match(complete, /^# Git 연습 메모/m);
  assert.match(complete, /!\[Git 로고\]\(https:\/\//);
  assert.match(complete, /\| \[note\.txt\]\(\.\/note\.txt\)/);
  assert.match(complete, /\| \[branch-note\.txt\]\(\.\/branch-note\.txt\)/);
  assert.match(complete, /```powershell\ncat \.\\note\.txt\n```/);
  assert.match(complete, /- \[x\] /);
  assert.match(complete, /- \[ \] /);
  assert.doesNotMatch(complete, /npm|localhost|pip install/i);
});

test('README publication follows writing and ends with commit, push, and browser confirmation', () => {
  const ids = markdown.sections.map(section => section.id);
  assert.deepEqual(ids, ['markdown-map', 'tools-markdown', 'markdown-readme-push']);
  const section = markdown.sections.find(item => item.id === 'markdown-readme-push');
  const codes = courseMarked.lexer(section.body).filter(token => token.type === 'code').map(token => token.text).join('\n');
  const positions = ['git status --short', 'git add README.md', 'git diff --cached', 'git commit -m', 'git push -u origin main'].map(value => codes.indexOf(value));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(section.body, /GitHub.*새로고침/s);
  assert.match(section.body, /같은 복제본|git-practice-clone/);
});
