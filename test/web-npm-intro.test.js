import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousWebNpmIntroDefault } from '../src/previous-web-npm-intro-default.js';

const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const section = data => data.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http');

test('npm explanation follows Node.js and describes install and run', () => {
  const body = section(course).body;
  const node = body.indexOf('<mark>**Node.js**는');
  const npm = body.indexOf('<mark>**npm**은');
  const setup = body.indexOf('Windows 설치 프로그램의 **Custom Setup**');
  assert.ok(node >= 0 && node < npm && npm < setup);
  assert.match(body.slice(npm, setup), /npm install.*패키지를 설치/);
  assert.match(body.slice(npm, setup), /npm run dev.*등록된 개발 작업을 실행/);
});

test('upgrade replaces previous npm introduction only if not edited', () => {
  const saved = structuredClone(course);
  section(saved).body = previousWebNpmIntroDefault.sections.find(item => item.id === 'web-http').body;
  const updated = upgradeNineDefaults(saved, course);
  assert.equal(section(updated).body, section(course).body);
  assert.deepEqual(upgradeNineDefaults(updated, course), updated);
  section(saved).body += '\n\n강사가 추가한 내용';
  assert.equal(section(upgradeNineDefaults(saved, course)).body, section(saved).body);
});
