import test from 'node:test';
import assert from 'node:assert/strict';
import { createLocalCourseSync } from '../src/local-sync.js';

const copy=value=>JSON.parse(JSON.stringify(value));
function harness() {
  let server={course:{title:'원본'},revision:'r1',token:'token'};
  let writes=0;let dirty=false;let offline=false;
  const states=[];const received=[];
  const fetcher=async(url,options={})=>{
    if(offline)throw Error('offline');
    if(options.method!=='PUT')return Response.json(copy(server));
    writes++;
    const data=JSON.parse(options.body);
    if(data.baseRevision!==server.revision)return Response.json({error:'충돌',...copy(server)},{status:409});
    server={course:copy(data.course),revision:`r${writes+1}`,token:'token'};
    return Response.json(copy(server));
  };
  const client=createLocalCourseSync({fetcher,onState:s=>states.push(s),onRemote:c=>{received.push(c);return true;},isDirty:()=>dirty});
  return {client,states,received,server:()=>server,writes:()=>writes,setDirty:v=>dirty=v,setOffline:v=>offline=v,change:c=>{server={...server,course:c,revision:`external-${server.revision}`};}};
}

test('정상 저장은 서버 revision을 사용하며 외부 수정은 깨끗한 편집기에 반영한다',async()=>{
  const h=harness();await h.client.connect();
  h.client.markEdited();await h.client.save({title:'브라우저 수정'});
  assert.equal(h.server().course.title,'브라우저 수정');
  h.change({title:'Codex 수정'});await h.client.poll();
  assert.equal(h.received.at(-1).title,'Codex 수정');assert.equal(h.client.hasConflict,false);
});
test('입력 중 외부 수정은 자동으로 덮어쓰지 않고 명시적 선택을 기다린다',async()=>{
  const h=harness();await h.client.connect();h.client.markEdited();h.setDirty(true);
  h.change({title:'외부 최신'});await h.client.poll();
  assert.equal(h.client.hasConflict,true);assert.equal(h.received.length,1);
  await assert.rejects(h.client.save({title:'내 초안'}),/동시 수정/);
  assert.equal(h.writes(),0);
  await h.client.keepBrowserVersion({title:'내 초안'});
  assert.equal(h.server().course.title,'내 초안');assert.equal(h.client.hasConflict,false);
});
test('충돌 선택 중 파일이 다시 바뀌면 재확인 전까지 쓰지 않는다',async()=>{
  const h=harness();await h.client.connect();h.client.markEdited();h.change({title:'외부1'});await h.client.poll();
  h.change({title:'외부2'});
  await assert.rejects(h.client.keepBrowserVersion({title:'내 초안'}),/다시 변경/);
  assert.equal(h.writes(),0);assert.equal(h.server().course.title,'외부2');
  await h.client.useFileVersion();assert.equal(h.received.at(-1).title,'외부2');
});
test('오래된 브라우저 복구본은 파일에 자동 기록하지 않는다',async()=>{
  const h=harness();const r=await h.client.connect({draft:{title:'이전 초안'},baseRevision:'r0'});
  assert.equal(r.restoreDraft,true);assert.equal(h.client.hasConflict,true);assert.equal(h.writes(),0);
});
test('원본이 바뀌지 않은 복구 초안은 저장할 수 있다',async()=>{
  const h=harness();const r=await h.client.connect({draft:{title:'작업 중 초안'},baseRevision:'r1'});
  assert.equal(r.restoreDraft,true);assert.equal(h.client.hasConflict,false);
  await h.client.save({title:'작업 중 초안'});assert.equal(h.server().course.title,'작업 중 초안');
});
test('오프라인 실패 후 연결을 복구하고 같은 기준으로 재시도한다',async()=>{
  const h=harness();await h.client.connect();h.client.markEdited();h.setOffline(true);
  await assert.rejects(h.client.save({title:'오프라인 초안'}),/offline/);
  assert.equal(h.client.state.status,'offline');
  h.setOffline(false);await h.client.poll();await h.client.save({title:'오프라인 초안'});
  assert.equal(h.client.state.status,'synced');assert.equal(h.server().course.title,'오프라인 초안');
});
test('같은 파일과 같은 복구본은 불필요한 충돌 없이 열린다',async()=>{
  const h=harness();const r=await h.client.connect({draft:{title:'원본'},baseRevision:'old'});
  assert.equal(r.restoreDraft,false);assert.equal(h.client.hasConflict,false);assert.equal(h.writes(),0);
});
test('두 저장은 순서대로 새 revision을 이어서 사용한다',async()=>{
  const h=harness();await h.client.connect();
  h.client.markEdited();const first=h.client.save({title:'첫 저장'});
  h.client.markEdited();const second=h.client.save({title:'다음 저장'});
  await Promise.all([first,second]);assert.equal(h.server().course.title,'다음 저장');assert.equal(h.writes(),2);
});

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((accept, fail) => { resolve = accept; reject = fail; });
  return { promise, resolve, reject };
}

// Capture the GET payload when it starts, then explicitly choose response order.
// No wall-clock delays are needed to reproduce a slow network/body response.
function raceHarness() {
  let server = { course: { title: '원본' }, revision: 'r1', token: 'token' };
  let writes = 0;
  let heldRead = null;
  let heldWrite = null;
  const received = [];
  const states = [];
  function hold(kind) {
    const gate = deferred();
    const started = deferred();
    const pending = { ...gate, started: started.promise, signal: started.resolve };
    if (kind === 'read') heldRead = pending;
    else heldWrite = pending;
    return pending;
  }
  const fetcher = async (url, options = {}) => {
    if (options.method !== 'PUT') {
      const data = copy(server);
      const gate = heldRead;
      heldRead = null;
      if (gate) { gate.signal(); await gate.promise; }
      return Response.json(data);
    }
    const body = JSON.parse(options.body);
    if (body.baseRevision !== server.revision) return Response.json({ error: '충돌', ...copy(server) }, { status: 409 });
    writes += 1;
    server = { ...server, course: copy(body.course), revision: `r${writes + 1}` };
    const result = copy(server);
    const gate = heldWrite;
    heldWrite = null;
    if (gate) { gate.signal(); await gate.promise; }
    return Response.json(result);
  };
  const client = createLocalCourseSync({
    fetcher,
    onRemote: course => { received.push(copy(course)); return true; },
    onState: state => states.push(state),
  });
  return {
    client, received, states,
    holdRead: () => hold('read'),
    holdWrite: () => hold('write'),
    change(course) { server = { ...server, course, revision: `external-${server.revision}` }; },
  };
}

test('저장 완료 뒤 도착한 오래된 GET은 새 revision과 동기화 상태를 되돌리지 않는다', async () => {
  const h = raceHarness();
  await h.client.connect();
  const read = h.holdRead();
  const poll = h.client.poll();
  await read.started;
  h.client.markEdited();
  const saved = await h.client.save({ title: '저장된 최신 입력' });
  assert.equal(saved.revision, 'r2');
  const reports = h.states.length;
  read.resolve();
  await poll;
  assert.equal(h.client.revision, 'r2');
  assert.equal(h.client.state.status, 'synced');
  assert.equal(h.client.hasConflict, false);
  assert.equal(h.received.length, 1, 'the stale GET must not replace the visible saved course');
  assert.equal(h.states.length, reports, 'ignored reads must not emit a misleading status');
  h.change({ title: '저장 후 새 외부 수정' });
  await h.client.poll();
  assert.equal(h.received.at(-1).title, '저장 후 새 외부 수정', 'a discarded poll releases the polling lock');
});

test('PUT 응답을 기다리는 동안 끝난 이전 GET도 화면 반영이나 충돌을 만들지 않는다', async () => {
  const h = raceHarness();
  await h.client.connect();
  const read = h.holdRead();
  const poll = h.client.poll();
  await read.started;
  const write = h.holdWrite();
  h.client.markEdited();
  const save = h.client.save({ title: '진행 중인 저장' });
  await write.started;
  assert.equal(h.client.state.status, 'saving');
  read.resolve();
  await poll;
  assert.equal(h.client.revision, 'r1', 'only the pending PUT may advance its baseline');
  assert.equal(h.client.state.status, 'saving');
  assert.equal(h.client.hasConflict, false);
  assert.equal(h.received.length, 1);
  write.resolve();
  await save;
  assert.equal(h.client.revision, 'r2');
  assert.equal(h.client.state.status, 'synced');
});

test('저장 완료 뒤 늦게 실패한 GET은 최신 synced 상태를 offline으로 바꾸지 않는다', async () => {
  const h = raceHarness();
  await h.client.connect();
  const read = h.holdRead();
  const poll = h.client.poll();
  await read.started;
  h.client.markEdited();
  await h.client.save({ title: '저장 성공' });
  const reports = h.states.length;
  read.reject(new Error('오래된 GET 연결 중단'));
  await poll;
  assert.equal(h.client.revision, 'r2');
  assert.equal(h.client.state.status, 'synced');
  assert.equal(h.client.hasConflict, false);
  assert.equal(h.states.length, reports);
  assert.equal(h.received.length, 1);
  h.change({ title: '다음 폴링의 정상 결과' });
  await h.client.poll();
  assert.equal(h.received.at(-1).title, '다음 폴링의 정상 결과');
});
