import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve, sep } from 'node:path';
import { resolvePagesBase } from '../tools/pages-base.js';
import { checkDist } from '../tools/check-dist.js';

test('로컬·프로젝트 Pages·사용자 사이트 경로를 정규화한다',()=>{
  assert.equal(resolvePagesBase(), './');
  assert.equal(resolvePagesBase(''), './');
  assert.equal(resolvePagesBase('/'), '/');
  assert.equal(resolvePagesBase('/lecture-notes'), '/lecture-notes/');
  assert.equal(resolvePagesBase('/lecture-notes/'), '/lecture-notes/');
  for(const bad of ['https://example.com/','//external/','/../','/notes?draft=1/','/notes\\assets/'])assert.throws(()=>resolvePagesBase(bad));
});

function fixture(t, base='/notes/') {
  const dir=mkdtempSync(join(tmpdir(),'dolbeom-pages-'));
  t.after(()=>{
    const target=resolve(dir);
    assert.ok(target.startsWith(`${resolve(tmpdir())}${sep}`));
    assert.ok(basename(target).startsWith('dolbeom-pages-'));
    rmSync(target,{recursive:true,force:true});
  });
  mkdirSync(join(dir,'assets'));mkdirSync(join(dir,'data'));
  const course=readFileSync(new URL('../public/data/course.json',import.meta.url),'utf8');
  writeFileSync(join(dir,'data/course.json'),course);
  writeFileSync(join(dir,'assets/app.js'),'console.log("fixture")');
  writeFileSync(join(dir,'assets/app.css'),'.card{color:navy}');
  writeFileSync(join(dir,'index.html'),`<link href="${base}assets/app.css" rel="stylesheet"><script src="${base}assets/app.js"></script><a :href="r.url">참고</a><a href="#/lesson/web">강의</a>`);
  return {dir,course};
}

test('하위 경로의 CSS·JS와 강의 JSON을 실제 파일로 확인한다',t=>{
  const {dir}=fixture(t);
  assert.deepEqual(checkDist({distDir:dir,base:'/notes/'}),{base:'/notes/',assets:2,lessons:7,minutes:180});
});
test('다른 하위 경로 또는 루트로 잘못 연결된 자산을 거부한다',t=>{
  const {dir}=fixture(t,'/assets-misconfigured/');
  assert.throws(()=>checkDist({distDir:dir,base:'/notes/'}),/하위 경로/);
});
test('누락된 CSS 자산과 재빌드하지 않은 강의 데이터를 감지한다',t=>{
  const {dir}=fixture(t);
  writeFileSync(join(dir,'assets/app.css'),'.card{background:url(./missing.png)}');
  assert.throws(()=>checkDist({distDir:dir,base:'/notes/'}),/파일을 찾을 수/);
  writeFileSync(join(dir,'assets/app.css'),'.card{color:navy}');
  writeFileSync(join(dir,'edited-course.json'),'{}');
  assert.throws(()=>checkDist({distDir:dir,base:'/notes/',sourceCourseFile:join(dir,'edited-course.json')}),/현재 원본과 다릅니다/);
});

test('루트 Pages와 상대 경로 배포에서도 정적 파일을 검증한다',t=>{
  for (const base of ['/', './']) {
    const {dir}=fixture(t,base);
    assert.deepEqual(checkDist({distDir:dir,base}),{base,assets:2,lessons:7,minutes:180});
  }
});

test('Vite 개발 클라이언트와 로컬 파일 저장 코드는 배포하지 않는다',t=>{
  const {dir}=fixture(t);
  for (const developmentCode of [
    'import "/@vite/client";',
    'fetch("/__course-sync");',
    'if(import.meta.env.DEV) connect();',
    'import.meta.hot.accept();',
  ]) {
    writeFileSync(join(dir,'assets/app.js'),developmentCode);
    assert.throws(()=>checkDist({distDir:dir,base:'/notes/'}),/로컬 개발 서버 전용 코드/);
  }
  writeFileSync(join(dir,'assets/app.js'),'console.log("fixture")');
  writeFileSync(join(dir,'index.html'),'<script type="module" src="/notes/@vite/client"></script>');
  assert.throws(()=>checkDist({distDir:dir,base:'/notes/'}),/Vite 개발 클라이언트/);
});
