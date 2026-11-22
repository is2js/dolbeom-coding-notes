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
  assert.deepEqual(ids, ['markdown-map', 'tools-markdown', 'markdown-readme-push', 'markdown-readme-fetch']);
  const section = markdown.sections.find(item => item.id === 'markdown-readme-push');
  const codes = courseMarked.lexer(section.body).filter(token => token.type === 'code').map(token => token.text).join('\n');
  const positions = ['git status --short', 'git add .', 'git diff --cached --name-only', 'git diff --cached\n', 'git commit -m', 'git push -u origin main'].map(value => (codes + '\n').indexOf(value));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(section.body, /GitHub.*새로고침/s);
  assert.match(section.body, /원래 `git-practice` 폴더/);
  assert.match(section.body, /`git add README\.md`/);
  assert.match(section.body, /현재 폴더와 그 아래의 새 파일, 수정, 삭제/);
});

test('the existing clone receives the README after the original repository pushes it', () => {
  const push = markdown.sections.find(item => item.id === 'markdown-readme-push');
  const fetch = markdown.sections.find(item => item.id === 'markdown-readme-fetch');
  const write = markdown.sections.find(item => item.id === 'tools-markdown');
  assert.match(write.body, /cd ~\/git-practice/);
  assert.match(write.body, /notepad README\.md[\s\S]*https:\/\/typora\.io\/#download[\s\S]*explorer\.exe \.[\s\S]*연결 프로그램 → Typora/);
  assert.match(push.body, /원래 `git-practice` 폴더/);
  assert.doesNotMatch(push.body, /git clone https:\/\//);
  assert.doesNotMatch(JSON.stringify(markdown), /git-practice-receiver/);
  const code = courseMarked.lexer(fetch.body).filter(token => token.type === 'code').map(token => token.text).join('\n');
  const commands = ['cd ~/git-practice-clone', 'Test-Path .\\README.md', 'git status --short', 'git branch --show-current', 'git remote -v', 'git fetch origin', 'git status -sb', 'git log --oneline HEAD..origin/main', 'git diff --stat HEAD origin/main', 'git pull --ff-only origin main', 'cat .\\README.md'];
  assert.doesNotMatch(code, /github-clone-practice/);
  const positions = commands.map(value => code.indexOf(value));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(fetch.body, /현재 브랜치나 작업 파일을 자동으로 바꾸지 않습니다/);
  assert.match(fetch.body, /평소에는 pull만 해도 됩니다/);
  assert.match(fetch.body, /fetch로 새 커밋과 파일을 살펴본 뒤 pull로 반영/);
  assert.match(fetch.body, /`-s`는 `--short`, `-b`는 `--branch`/);
  assert.match(fetch.body, /일반 `git status`도 같은 상태/);
  assert.match(fetch.body, /Fast-forward[\s\S]*A → B[\s\S]*`C`\(내 메모 수정\)/);
});


test('GitHub clones directly into a new folder under the home directory', () => {
  const github = course.lessons.find(lesson => lesson.id === 'github');
  const section = github.sections.find(item => item.id === 'github-roles');
  const code = courseMarked.lexer(section.body).filter(token => token.type === 'code').map(token => token.text).join('\n');
  const positions = ['cd ~', 'Test-Path .\\git-practice-clone', 'git clone https://github.com/YOUR-USERNAME/git-practice.git git-practice-clone', 'cd .\\git-practice-clone'].map(value => code.indexOf(value));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.doesNotMatch(code, /github-clone-practice|mkdir/);
  assert.doesNotMatch(section.body, /github-clone-practice/);
  assert.match(code, /cd \.\\git-practice-clone\s+pwd\s+ls\s+explorer\.exe \./);
});
