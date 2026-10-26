import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer, request as httpRequest } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve, sep } from 'node:path';
import { courseSyncPlugin } from '../tools/course-sync-server.js';

const endpoint = '/__course-sync';
const maxBytes = 5 * 1024 * 1024;
const backupPattern = /^course-\d{8}T\d{9}Z-[a-f0-9]{64}\.json$/;
const fixtureBytes = await readFile(new URL('../public/data/course.json', import.meta.url));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const copy = course => structuredClone(course);

async function fixture(t, explicitRoot = false) {
  const root = await mkdtemp(join(tmpdir(), 'dolbeom-course-sync-test-'));
  const source = join(root, 'public', 'data', 'course.json');
  const backups = join(root, '.course-backups');
  await mkdir(join(root, 'public', 'data'), { recursive: true });
  await writeFile(source, fixtureBytes);
  const plugin = courseSyncPlugin(explicitRoot ? { root } : {});
  let middleware;
  plugin.configureServer({
    config: { root: explicitRoot ? join(root, 'unused-root') : root },
    middlewares: { use(value) { middleware = value; } },
  });
  const server = createServer((request, response) => {
    middleware(request, response, () => { response.writeHead(404); response.end('not found'); });
  });
  await new Promise(accept => server.listen(0, '127.0.0.1', accept));
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(accept => server.close(accept));
    // Verify the exact temporary project before recursively removing its fixtures.
    const target = resolve(root);
    assert.ok(target.startsWith(`${resolve(tmpdir())}${sep}`));
    assert.ok(basename(target).startsWith('dolbeom-course-sync-test-'));
    await rm(target, { recursive: true, force: true });
  });
  const port = server.address().port;
  const host = `127.0.0.1:${port}`;
  function request({ method = 'GET', path = endpoint, headers = {}, body, chunks } = {}) {
    return new Promise((accept, reject) => {
      const bytes = body === undefined ? undefined
        : Buffer.isBuffer(body) ? body
          : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));
      const requestHeaders = { Host: host, ...headers };
      if (bytes !== undefined && !chunks) requestHeaders['Content-Length'] = bytes.length;
      const request = httpRequest({ hostname: '127.0.0.1', port, path, method, headers: requestHeaders }, response => {
        const parts = [];
        response.on('data', part => parts.push(part));
        response.on('end', () => {
          const text = Buffer.concat(parts).toString('utf8');
          let json;
          try { json = JSON.parse(text); } catch { /* Non-endpoint fallback is plain text. */ }
          accept({ status: response.statusCode, headers: response.headers, text, json });
        });
        response.on('error', reject);
      });
      request.on('error', reject);
      if (chunks) for (const chunk of chunks) request.write(chunk);
      request.end(chunks ? undefined : bytes);
    });
  }
  const get = () => request();
  const put = (state, course, extra = {}) => request({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Course-Sync-Token': state.token, ...extra.headers },
    body: { course, baseRevision: state.revision },
    ...Object.fromEntries(Object.entries(extra).filter(([key]) => key !== 'headers')),
  });
  return { root, source, backups, plugin, host, request, get, put };
}

test('development plugin exposes only the exact endpoint with byte revision and a per-server token', async t => {
  const a = await fixture(t);
  const b = await fixture(t, true);
  assert.equal(a.plugin.apply, 'serve');
  assert.equal(a.plugin.configurePreviewServer, undefined);
  const state = await a.get();
  assert.equal(state.status, 200);
  assert.deepEqual(state.json.course, JSON.parse(fixtureBytes));
  assert.deepEqual(state.json.course.lessons.map(lesson => lesson.id), ['terminal', 'git', 'github', 'markdown', 'ide', 'web', 'templates']);
  assert.equal(state.json.revision, digest(fixtureBytes));
  assert.match(state.json.token, /^[a-f0-9]{64}$/);
  assert.equal(state.headers['cache-control'], 'no-store');
  assert.equal(state.headers['access-control-allow-origin'], undefined);
  assert.notEqual((await b.get()).json.token, state.json.token);
  for (const path of [`${endpoint}/`, `${endpoint}?file=elsewhere.json`, '/elsewhere.json']) {
    assert.equal((await a.request({ path })).status, 404);
  }
  assert.deepEqual(await readFile(a.source), fixtureBytes);
});

test('PUT validates, snapshots exact prior bytes and atomically replaces the fixed source', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  const edited = copy(state.course);
  edited.title = '저장한 강의 제목';
  const result = await f.put(state, edited, { headers: { Origin: `http://${f.host}` } });
  assert.equal(result.status, 200);
  assert.deepEqual(result.json.course, edited);
  const savedBytes = await readFile(f.source);
  assert.equal(result.json.revision, digest(savedBytes));
  assert.deepEqual(JSON.parse(savedBytes), edited);
  const after = (await f.get()).json;
  assert.equal(after.token, state.token, 'successful saves do not rotate the server token');
  assert.equal(after.revision, result.json.revision);
  const names = await readdir(f.backups);
  assert.equal(names.length, 1, 'atomic temp is cleaned after rename');
  assert.match(names[0], backupPattern);
  assert.ok(names[0].includes(state.revision));
  assert.deepEqual(await readFile(join(f.backups, names[0])), fixtureBytes);
  const noChange = await f.put(after, copy(edited));
  assert.equal(noChange.status, 200);
  assert.equal(noChange.json.revision, after.revision);
  assert.equal((await readdir(f.backups)).length, 1, 'identical semantic content is not rewritten');
});

test('external valid edits yield 409 with the current course and never lose external bytes', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  const external = copy(state.course);
  external.subtitle = '외부 편집기에서 고친 부제';
  const externalBytes = Buffer.from(`${JSON.stringify(external, null, 4)}\n`);
  await writeFile(f.source, externalBytes);
  const ours = copy(state.course);
  ours.title = '오래된 화면의 저장 요청';
  const result = await f.put(state, ours);
  assert.equal(result.status, 409);
  assert.deepEqual(result.json.course, external);
  assert.equal(result.json.revision, digest(externalBytes));
  assert.equal(result.headers['cache-control'], 'no-store');
  assert.deepEqual(await readFile(f.source), externalBytes);
  // A conflict rejection must not prevent the next save based on the new revision.
  const retry = await f.put({ ...state, revision: result.json.revision }, ours);
  assert.equal(retry.status, 200);
  assert.deepEqual(JSON.parse(await readFile(f.source)), ours);
});

test('two overlapping PUTs with one base revision have exactly one winner', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  const a = copy(state.course);
  const b = copy(state.course);
  a.title = '동시 저장 A';
  b.title = '동시 저장 B';
  const results = await Promise.all([f.put(state, a), f.put(state, b)]);
  assert.deepEqual(results.map(result => result.status).sort(), [200, 409]);
  const winner = results.find(result => result.status === 200).json;
  const rejected = results.find(result => result.status === 409).json;
  assert.deepEqual(JSON.parse(await readFile(f.source)), winner.course);
  assert.deepEqual(rejected.course, winner.course);
  assert.equal(rejected.revision, winner.revision);
  const names = await readdir(f.backups);
  assert.equal(names.length, 1);
  assert.deepEqual(await readFile(join(f.backups, names[0])), fixtureBytes);
});

test('invalid external JSON or course schema is reported as 422 and never overwritten', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  for (const bytes of [Buffer.from('{ broken JSON'), Buffer.from(JSON.stringify({ schemaVersion: 99 }))]) {
    await writeFile(f.source, bytes);
    const get = await f.get();
    assert.equal(get.status, 422);
    assert.ok(get.json.error);
    assert.equal(get.headers['cache-control'], 'no-store');
    const put = await f.put(state, state.course);
    assert.equal(put.status, 422);
    assert.deepEqual(await readFile(f.source), bytes);
  }
  await writeFile(f.source, fixtureBytes);
  const edited = copy(state.course);
  edited.title = '손상 복구 후 정상 저장';
  assert.equal((await f.put(state, edited)).status, 200);
});

test('invalid payloads and revision format never write or create snapshots', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  const invalid = copy(state.course);
  invalid.schemaVersion = 99;
  assert.equal((await f.put(state, invalid)).status, 422);
  const legacySixLessons = copy(state.course);
  legacySixLessons.lessons = legacySixLessons.lessons.slice(0, 6);
  assert.equal((await f.put(state, legacySixLessons)).status, 422);
  assert.equal((await f.put({ ...state, revision: 'not-a-sha256' }, state.course)).status, 400);
  assert.equal((await f.put(state, state.course, { body: '{ invalid' })).status, 400);
  assert.equal((await f.put(state, state.course, { body: { baseRevision: state.revision } })).status, 422);
  assert.deepEqual(await readFile(f.source), fixtureBytes);
  await assert.rejects(readdir(f.backups), { code: 'ENOENT' });
});

test('seven-topic courses can save reordered lessons while preserving stable lesson and content IDs', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  const edited = copy(state.course);
  edited.lessons.reverse();
  edited.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  const result = await f.put(state, edited);
  assert.equal(result.status, 200);
  const saved = JSON.parse(await readFile(f.source));
  assert.deepEqual(saved.lessons.map(lesson => lesson.id), ['templates', 'web', 'ide', 'markdown', 'github', 'git', 'terminal']);
  assert.deepEqual(saved.lessons.map(lesson => lesson.number), [1, 2, 3, 4, 5, 6, 7]);
  for (const lesson of saved.lessons) {
    const original = state.course.lessons.find(item => item.id === lesson.id);
    assert.deepEqual(lesson.sections, original.sections);
    assert.deepEqual(lesson.steps, original.steps);
  }
});

test('Origin, Host, token, method, content type and streamed size guards reject without writes', async t => {
  const f = await fixture(t);
  const state = (await f.get()).json;
  for (const Host of ['example.com', '127.0.0.1.evil.test', 'localhost.evil.test', '127.0.0.2', '[::2]', 'localhost:70000', 'localhost:0']) {
    const result = await f.request({ headers: { Host } });
    assert.equal(result.status, 403, Host);
    assert.equal(result.headers['cache-control'], 'no-store');
  }
  for (const Host of ['localhost', '127.0.0.1', '[::1]', '[::1]:5188']) {
    assert.equal((await f.request({ headers: { Host, Origin: `http://${Host}` } })).status, 200, Host);
  }
  for (const Origin of ['https://example.com', 'null', `https://${f.host}`, 'http://localhost']) {
    assert.equal((await f.put(state, state.course, { headers: { Origin } })).status, 403);
  }
  for (const token of ['', '0'.repeat(64), 'é'.repeat(64)]) {
    assert.equal((await f.put(state, state.course, { headers: { 'X-Course-Sync-Token': token } })).status, 403);
  }
  assert.equal((await f.put(state, state.course, { headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await f.put(state, state.course, { headers: { 'Content-Encoding': 'gzip' } })).status, 415);
  const wrongMethod = await f.request({ method: 'POST' });
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.headers.allow, 'GET, PUT');
  assert.equal((await f.request({ method: 'OPTIONS' })).headers['access-control-allow-origin'], undefined);
  const oversized = Buffer.alloc(maxBytes + 1, 'x');
  assert.equal((await f.put(state, state.course, { body: oversized })).status, 413);
  assert.equal((await f.put(state, state.course, {
    chunks: [oversized.subarray(0, maxBytes), oversized.subarray(maxBytes)],
  })).status, 413, 'chunked requests enforce the same limit without Content-Length');
  assert.deepEqual(await readFile(f.source), fixtureBytes);
  await assert.rejects(readdir(f.backups), { code: 'ENOENT' });
});

test('retention keeps 30 owned snapshots and preserves foreign files, directories and source path', async t => {
  const f = await fixture(t);
  await mkdir(f.backups);
  const oldNames = [];
  for (let index = 0; index < 34; index += 1) {
    const time = new Date(Date.UTC(2020, 0, 1, 0, 0, 0, index)).toISOString().replace(/[-:.]/g, '');
    const name = `course-${time}-${digest(fixtureBytes)}.json`;
    oldNames.push(name);
    await writeFile(join(f.backups, name), fixtureBytes);
  }
  const foreign = join(f.backups, 'keep-my-course.json');
  const directoryName = `course-19990101T000000000Z-${'a'.repeat(64)}.json`;
  await writeFile(foreign, 'unrelated');
  await mkdir(join(f.backups, directoryName));
  await writeFile(join(f.backups, directoryName, 'keep.txt'), 'directory is not a snapshot');
  const otherFile = join(f.root, 'do-not-change.json');
  await writeFile(otherFile, 'untouched');
  const state = (await f.get()).json;
  const edited = copy(state.course);
  edited.title = '백업 순환 확인';
  const result = await f.put(state, edited, {
    body: { course: edited, baseRevision: state.revision, path: otherFile },
  });
  assert.equal(result.status, 200);
  const entries = await readdir(f.backups, { withFileTypes: true });
  const owned = entries.filter(entry => entry.isFile() && backupPattern.test(entry.name));
  assert.equal(owned.length, 30);
  for (const name of oldNames.slice(0, 5)) assert.ok(!owned.some(entry => entry.name === name));
  assert.equal(await readFile(foreign, 'utf8'), 'unrelated');
  assert.equal(await readFile(join(f.backups, directoryName, 'keep.txt'), 'utf8'), 'directory is not a snapshot');
  assert.equal(await readFile(otherFile, 'utf8'), 'untouched');
  assert.deepEqual(JSON.parse(await readFile(f.source)), edited);
  assert.ok(entries.every(entry => !entry.name.endsWith('.tmp')));
});
