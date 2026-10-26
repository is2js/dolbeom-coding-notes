import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COURSE_IDS, validateCourse, courseMinutes, lessonMinutes, safeRead, safeWrite } from '../src/course.js';

const load = () => JSON.parse(readFileSync(new URL('../public/data/course.json',import.meta.url),'utf8'));
const canonicalIds = ['terminal', 'git', 'github', 'markdown', 'ide', 'web', 'templates'];

test('절의 개념 그림은 선택 사항이며 알려진 그림 ID만 가져올 수 있다',()=>{
  const c=load();const section=c.lessons[0].sections[0];
  for(const id of ['web-architecture','server-rendering']){
    section.illustrationId=id;assert.doesNotThrow(()=>validateCourse(c));
  }
  for(const id of ['',null,'../other','<svg onload=alert(1)>']){
    section.illustrationId=id;assert.throws(()=>validateCourse(c),/개념 그림/);
  }
  delete section.illustrationId;assert.doesNotThrow(()=>validateCourse(c));
});
test('기본 강의는 사용자 지정 순서의 7개 주제이며 본편 180분과 보충 분량이 분리된다',()=>{
  const c=validateCourse(load());
  assert.deepEqual(COURSE_IDS,canonicalIds);
  assert.deepEqual(c.lessons.map(l=>l.id),canonicalIds);
  assert.deepEqual(c.lessons.map(l=>l.number),[1,2,3,4,5,6,7]);
  assert.equal(courseMinutes(c),180);
  assert.ok(courseMinutes(c,true)>0);
  assert.equal(c.lessons.reduce((sum,l)=>sum+lessonMinutes(l),0),180);
  c.lessons.forEach(l=>{
    assert.equal(l.durationMinutes,lessonMinutes(l),`${l.id}: 강의 시간과 본편 절 합계 일치`);
    assert.ok(l.steps.length>0);
    assert.ok(l.sections.some(s=>!s.optional),`${l.id}: 본편 설명 필요`);
  });
});
test('강의 순서를 바꿔도 7개 주제 ID는 유지하며 현재 순서로 번호를 매길 수 있다',()=>{
  const c=load();
  const content=new Map(c.lessons.map(l=>[l.id,{sections:l.sections.map(s=>s.id),steps:l.steps.map(s=>s.id)}]));
  c.lessons.reverse();
  assert.throws(()=>validateCourse(c),'배열 순서를 바꾼 뒤 번호를 정리해야 한다');
  c.lessons.forEach((l,index)=>{l.number=index+1;});
  assert.doesNotThrow(()=>validateCourse(c));
  assert.deepEqual(c.lessons.map(l=>l.id),[...canonicalIds].reverse());
  assert.equal(courseMinutes(c),180);
  for(const l of c.lessons){
    assert.deepEqual(l.sections.map(s=>s.id),content.get(l.id).sections);
    assert.deepEqual(l.steps.map(s=>s.id),content.get(l.id).steps);
  }
});
test('기존 6강 파일과 빠지거나 중복되거나 바뀐 주제 ID는 7강 원본으로 받아들이지 않는다',()=>{
  for(const edit of [
    c=>{c.lessons=c.lessons.slice(0,6);},
    c=>{c.lessons[1].id=c.lessons[0].id;},
    c=>{c.lessons[1].id='unknown-topic';},
  ]){
    const c=load();edit(c);assert.throws(()=>validateCourse(c));
  }
});
test('가상 사례를 실제 사례로 교체하고 절·시연을 편집한 강의도 배포할 수 있다',()=>{
  const c=load();
  c.lessons[0].case={kind:'real',title:'직접 겪은 사례',body:'실제 경험으로 교체한 강의 도입입니다.',question:'이번 사례에서 무엇을 확인할까요?'};
  c.lessons[0].steps=c.lessons[0].steps.slice(0,2);
  c.lessons[0].sections[0].body='## 수정한 강의\n\n짧게 정리한 설명입니다.';
  assert.doesNotThrow(()=>validateCourse(c));
  assert.equal(courseMinutes(c),180);
});
test('손상된 버전·중복 단계·사례 구분·링크를 거부한다',()=>{
  for(const edit of [c=>c.schemaVersion=2,c=>c.lessons[0].steps[1].id=c.lessons[0].steps[0].id,c=>c.lessons[0].case.kind='unverified',c=>c.lessons[0].references[0].url='javascript:alert(1)',c=>c.lessons[0].sections[0].minutes=-1]){
    const c=load();edit(c);assert.throws(()=>validateCourse(c));
  }
});
test('저장 불가와 손상된 저장 데이터는 안전하게 처리한다',()=>{
  const broken={getItem(){throw Error('blocked');},setItem(){throw Error('quota');}};
  assert.equal(safeRead(broken,'x','default'),'default');assert.equal(safeWrite(broken,'x',{}),false);
  assert.deepEqual(safeRead({getItem(){return '{oops';}},'x',[]),[]);
  let saved;const storage={setItem(k,v){saved=v;},getItem(){return saved;}};
  assert.equal(safeWrite(storage,'course',{ok:1}),true);assert.deepEqual(safeRead(storage,'course'),{ok:1});
});

const presentationFixture = () => ({
  caseSummary: 'Codex가 제안한 명령을 실행하기 전에 현재 작업 위치를 확인합니다.',
  demo: { program: 'Windows 터미널 · PowerShell', file: '', command: 'Get-Location', expectedResult: '현재 프로젝트의 절대 경로가 표시됩니다.', durationMinutes: 5 },
  returnSummary: '명령을 읽을 때 현재 폴더부터 확인합니다.',
});

test('발표 메타데이터가 없는 schemaVersion 1 강의는 수정 없이 그대로 검증한다',()=>{
  const c=load();
  for(const lesson of c.lessons){delete lesson.presentation;for(const section of lesson.sections)delete section.presentationPoints;}
  const original=JSON.stringify(c);
  assert.equal(validateCourse(c),c);
  assert.equal(JSON.stringify(c),original,'검증·열람은 발표 기본값을 원본에 추가하지 않는다');
  assert.equal(courseMinutes(c),180);
});

test('선택형 발표 정보의 경계 길이와 빈 선택 필드는 7주제·180분을 유지한다',()=>{
  const c=load();
  const presentation=presentationFixture();
  presentation.caseSummary='가'.repeat(300);
  presentation.returnSummary='나'.repeat(240);
  presentation.demo={program:'다'.repeat(160),file:'라'.repeat(160),command:'x'.repeat(4000),expectedResult:'마'.repeat(300),durationMinutes:60};
  c.lessons[0].presentation=presentation;
  c.lessons[0].sections[0].presentationPoints=['바'.repeat(80),'사'.repeat(80),'아'.repeat(80)];
  const bonus=c.lessons[0].sections.find(section=>section.optional);
  if(bonus)bonus.presentationPoints=['보충 절도 핵심 요점을 작성할 수 있습니다.'];
  assert.doesNotThrow(()=>validateCourse(c));
  assert.deepEqual(c.lessons.map(lesson=>lesson.id),canonicalIds);
  assert.equal(courseMinutes(c),180,'발표 시연 시간은 기존 본편 시간에 더하지 않는다');
  presentation.returnSummary='';presentation.demo.file='';presentation.demo.command='';presentation.demo.durationMinutes=.25;
  assert.doesNotThrow(()=>validateCourse(c));
});

test('발표 정보가 있으면 필수 구조·문자열 길이·시연 시간 전체를 검사한다',()=>{
  const edits=[
    ['null',lesson=>{lesson.presentation=null;}],
    ['배열',lesson=>{lesson.presentation=[];}],
    ['시연 없음',lesson=>{delete lesson.presentation.demo;}],
    ['사례 요약 없음',lesson=>{delete lesson.presentation.caseSummary;}],
    ['사례 요약 공백',lesson=>{lesson.presentation.caseSummary='  ';}],
    ['사례 요약 초과',lesson=>{lesson.presentation.caseSummary='가'.repeat(301);}],
    ['복귀 요약 없음',lesson=>{delete lesson.presentation.returnSummary;}],
    ['복귀 요약 타입',lesson=>{lesson.presentation.returnSummary=12;}],
    ['복귀 요약 초과',lesson=>{lesson.presentation.returnSummary='나'.repeat(241);}],
    ['프로그램 공백',lesson=>{lesson.presentation.demo.program='';}],
    ['프로그램 초과',lesson=>{lesson.presentation.demo.program='다'.repeat(161);}],
    ['파일 없음',lesson=>{delete lesson.presentation.demo.file;}],
    ['파일 초과',lesson=>{lesson.presentation.demo.file='라'.repeat(161);}],
    ['명령 타입',lesson=>{lesson.presentation.demo.command=[];}],
    ['명령 초과',lesson=>{lesson.presentation.demo.command='x'.repeat(4001);}],
    ['결과 공백',lesson=>{lesson.presentation.demo.expectedResult=' ';}],
    ['결과 초과',lesson=>{lesson.presentation.demo.expectedResult='마'.repeat(301);}],
    ...[0,-1,60.1,Infinity,NaN,'5',null].map(value=>[`시간 ${String(value)}`,lesson=>{lesson.presentation.demo.durationMinutes=value;}]),
  ];
  for(const [label,edit]of edits){
    const c=load();c.lessons[0].presentation=presentationFixture();edit(c.lessons[0]);
    assert.throws(()=>validateCourse(c),/발표/,label);
  }
});

test('절별 발표 요점은 선택 사항이며 존재하면 80자 이내의 문장 1~3개다',()=>{
  for(const points of [[],['하나','둘','셋','넷'],[''],['  '],['가'.repeat(81)],[12],null,{}]){
    const c=load();c.lessons[0].sections[0].presentationPoints=points;
    assert.throws(()=>validateCourse(c),/발표 핵심 요점/,JSON.stringify(points));
  }
  const c=load();delete c.lessons[0].presentation;
  c.lessons[0].sections[0].presentationPoints=['강의의 한 문장 핵심입니다.'];
  assert.doesNotThrow(()=>validateCourse(c),'강의 발표 정보와 절별 요점은 각각 선택적으로 제공할 수 있다');
  delete c.lessons[0].sections[0].presentationPoints;
  assert.doesNotThrow(()=>validateCourse(c),'요점을 제거하면 원래 본문으로 표시할 수 있다');
});
