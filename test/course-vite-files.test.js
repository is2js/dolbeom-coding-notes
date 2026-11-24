import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const course = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const body = course.lessons.find(item => item.id === 'web').sections.find(item => item.id === 'web-http').body;
const normalize = text => text.replace(/\r\n/g, '\n').trim();

test('frontend lesson introduces the example structure and explains the actual package.json', () => {
  const structure = body.match(/```text\n([\s\S]*?)\n```/);
  assert.ok(structure, 'missing example project structure');
  for (const name of ['index.html', 'package.json', 'package-lock.json', '.gitignore']) {
    assert.ok(structure[1].includes(name), name);
  }
  assert.doesNotMatch(structure[1], /style\.css|script\.js/);
  assert.match(body, /이 예제에는 별도의 `style\.css`와 `script\.js`가 없습니다/);
  assert.doesNotMatch(body, /README\.md/i);
  assert.match(body, /scripts\.dev/);
  assert.match(body, /npm run dev/);
  assert.match(body, /https:\/\/github\.com\/is2js\/course-card-vite-example/);
  assert.match(body, /https:\/\/github\.com\/is2js\/course-card-vite-example\/blob\/main\/package\.json/);
  assert.ok(body.indexOf('Node.js 설치와 확인') < body.indexOf('2. Vite 프로젝트의 파일 읽기'));
  assert.match(body, /Windows용 \*\*최신 LTS\*\*/);

  const start = body.indexOf('**`package.json`: 프로젝트의 약속**');
  assert.notEqual(start, -1, 'missing package.json explanation');
  const block = body.slice(start).match(/```json\n([\s\S]*?)\n```/);
  assert.ok(block, 'missing package.json code block');
  const actual = fs.readFileSync(new URL('../public/examples/course-card/04-vite-dev/package.json', import.meta.url), 'utf8');
  assert.equal(normalize(block[1]), normalize(actual));

  const exampleDir = new URL('../public/examples/course-card/04-vite-dev/', import.meta.url);
  const example = fs.readFileSync(new URL('index.html', exampleDir), 'utf8');
  assert.match(example, /https:\/\/cdn\.tailwindcss\.com\/3\.4\.17/);
  assert.match(example, /https:\/\/cdn\.jsdelivr\.net\/npm\/alpinejs@3\.14\.9\/dist\/cdn\.min\.js/);
  assert.match(example, /x-text="open \?/);
  assert.equal(fs.existsSync(new URL('style.css', exampleDir)), false);
  assert.equal(fs.existsSync(new URL('script.js', exampleDir)), false);
  assert.match(body, /같은 강의 카드에서 Vite를 직접 실행하기/);
  const practice = body.slice(body.indexOf('### 같은 강의 카드에서 Vite를 직접 실행하기'));
  assert.ok(practice.indexOf('node_modules/\ndist/') < practice.indexOf('npm install\nnpm run dev'));
  assert.match(body, /cd ~\/git-practice\n/);
  assert.doesNotMatch(body, /git-practice\/course-card\/03-javascript/);
  assert.match(body, /node --version/);
});
