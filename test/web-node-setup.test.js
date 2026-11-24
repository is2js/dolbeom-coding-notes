import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebNodeSetupDefault } from '../src/previous-web-node-setup-default.js';
import { courseMarked } from '../src/course-markdown-engine.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const section = value => value.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http');

test('Node.js runtime and PATH are highlighted before version checks and Vite setup', () => {
  const body = section(course).body;
  const runtime = body.indexOf('<mark>**Node.js**는 브라우저 밖에서도 JavaScript');
  const path = body.indexOf('<mark>Windows 설치 프로그램의 **Custom Setup**에서 **Add to PATH**');
  const versions = body.indexOf('node --version', path);
  const files = body.indexOf('### 2. Vite 프로젝트의 파일 읽기');
  assert.ok(runtime >= 0 && runtime < path && path < versions && versions < files);
  assert.match(body, /Will be installed on local hard drive/);
  assert.match(body, /VS Code와 터미널을 완전히 닫았다가 다시 열고/);
  assert.match(body, /npm --version/);
  assert.match(courseMarked.parse(body), /<mark>Windows 설치 프로그램의 <strong>Custom Setup<\/strong>에서 <strong>Add to PATH<\/strong>/);
});

test('Node setup update preserves user-edited body and upgrades only the prior default', () => {
  const saved = structuredClone(course);
  const previous = previousWebNodeSetupDefault.sections.find(item => item.id === 'web-http');
  section(saved).body = previous.body;
  const updated = upgradeNineDefaults(saved, course);
  assert.equal(section(updated).body, section(course).body);
  assert.deepEqual(upgradeNineDefaults(updated, course), updated);
  section(saved).body += '\n\n강사가 직접 작성한 메모';
  assert.equal(section(upgradeNineDefaults(saved, course)).body, section(saved).body);
});
