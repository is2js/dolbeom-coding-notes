import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebNpmIgnoreDefault } from '../src/previous-web-npm-ignore-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const section = data => data.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http');

test('practice installs packages, inspects files, sets ignore and then starts Vite', () => {
  const body = section(course).body;
  const practice = body.slice(body.indexOf('### 같은 강의 카드에서 Vite를 직접 실행하기'), body.indexOf('**`package-lock.json`은 설치한 버전 기록**'));
  const install = practice.indexOf('npm install');
  const inspect = practice.indexOf('node_modules` 폴더와 `package-lock.json`');
  const ignore = practice.indexOf('<mark>`git-practice`에 `.gitignore`');
  const launch = practice.indexOf('npm run dev');
  assert.ok(install >= 0 && install < inspect && inspect < ignore && ignore < launch);
  assert.match(practice, /```gitignore\nnode_modules\/\ndist\/\n```/);
  assert.match(practice, /`package-lock\.json`은 제외하지 않고 `package\.json`과 함께 Git에 기록/);
  assert.match(practice, /이미 Git이 추적 중인 파일은/);
});

test('requested explanations are highlighted', () => {
  const body = section(course).body;
  for (const text of [
    '`npm install`은 필요한 패키지를 설치하고',
    '설치한 뒤 **VS Code와 터미널을 완전히 닫았다가 다시 열고**',
    '버전이 보이면 다음 단계에서 예제 파일과 `package.json`',
    '**`package.json`: 프로젝트의 약속**',
    '`git-practice`에 `package.json` 파일이 없다면',
    '`scripts`는 실행할 작업 목록이고',
    '`npm`은 Node.js 프로젝트의 패키지를 설치하고',
    '`git-practice`에 `.gitignore` 파일이 없다면',
    '설치 파일과 빌드 결과를 Git 기록에서 제외',
  ]) assert.ok(body.includes(`<mark>${text}`), text);
});

test('older default upgrades without overwriting authored body', () => {
  const saved = structuredClone(course);
  section(saved).body = previousWebNpmIgnoreDefault.sections.find(item => item.id === 'web-http').body;
  const migrated = upgradeNineDefaults(saved, course);
  assert.equal(section(migrated).body, section(course).body);
  assert.deepEqual(upgradeNineDefaults(migrated, course), migrated);
  section(saved).body += '\n\n강사가 추가한 문장';
  assert.equal(section(upgradeNineDefaults(saved, course)).body, section(saved).body);
});
