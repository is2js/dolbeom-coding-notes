import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { validateCourse } from '../src/course.js';

const ENDPOINT = '/__course-sync';
const MAX_BYTES = 5 * 1024 * 1024;
const BACKUP_LIMIT = 30;
const BACKUP_NAME = /^course-\d{8}T\d{9}Z-[a-f0-9]{64}\.json$/;
const revisionOf = bytes => createHash('sha256').update(bytes).digest('hex');

class SyncError extends Error {
  constructor(status, message, details = {}) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function reply(response, status, value) {
  if (response.destroyed || response.writableEnded) return;
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(value));
}

function checkRequestOrigin(request) {
  const host = request.headers.host;
  const match = typeof host === 'string'
    && /^(?:localhost|127\.0\.0\.1|\[::1\])(?::([0-9]{1,5}))?$/i.exec(host);
  if (!match || (match[1] && (Number(match[1]) < 1 || Number(match[1]) > 65535))) {
    throw new SyncError(403, '로컬 개발 서버에서만 강의 파일을 사용할 수 있습니다.');
  }
  const origin = request.headers.origin;
  if (origin !== undefined && origin !== `http://${host.toLowerCase()}`) {
    throw new SyncError(403, '같은 로컬 개발 서버의 요청만 허용됩니다.');
  }
}

function checkToken(request, token) {
  const provided = request.headers['x-course-sync-token'];
  if (typeof provided !== 'string' || !/^[a-f0-9]{64}$/.test(provided)
    || !timingSafeEqual(Buffer.from(provided), Buffer.from(token))) {
    throw new SyncError(403, '저장 연결이 만료되었습니다. 개발 서버와 다시 연결해 주세요.');
  }
}

function readJsonBody(request) {
  const type = request.headers['content-type'];
  if (typeof type !== 'string' || type.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    request.resume();
    throw new SyncError(415, 'application/json 형식으로 요청해 주세요.');
  }
  if (request.headers['content-encoding'] && request.headers['content-encoding'] !== 'identity') {
    request.resume();
    throw new SyncError(415, '압축하지 않은 JSON 요청만 허용됩니다.');
  }
  if (Number(request.headers['content-length']) > MAX_BYTES) {
    request.resume();
    throw new SyncError(413, '강의 파일은 5MB 이하로 보내 주세요.');
  }
  return new Promise((accept, reject) => {
    let size = 0;
    const chunks = [];
    const cleanup = () => {
      request.off('data', onData);
      request.off('end', onEnd);
      request.off('error', onError);
      request.off('aborted', onAborted);
    };
    const fail = error => {
      cleanup();
      request.resume();
      reject(error);
    };
    const onData = chunk => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        fail(new SyncError(413, '강의 파일은 5MB 이하로 보내 주세요.'));
      } else {
        chunks.push(chunk);
      }
    };
    const onEnd = () => {
      cleanup();
      try {
        accept(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new SyncError(400, 'JSON 요청 내용을 확인해 주세요.'));
      }
    };
    const onError = () => fail(new SyncError(400, '요청을 끝까지 읽지 못했습니다.'));
    const onAborted = () => fail(new SyncError(400, '요청이 중단되었습니다.'));
    request.on('data', onData);
    request.once('end', onEnd);
    request.once('error', onError);
    request.once('aborted', onAborted);
  });
}

async function readSource(source) {
  let bytes;
  try {
    bytes = await readFile(source);
  } catch (error) {
    if (error.code === 'ENOENT') throw new SyncError(422, '기본 강의 파일을 찾을 수 없습니다.');
    throw error;
  }
  if (bytes.length > MAX_BYTES) throw new SyncError(422, '기본 강의 파일이 5MB를 초과합니다. 파일을 직접 확인해 주세요.');
  let course;
  try {
    course = validateCourse(JSON.parse(bytes.toString('utf8')));
  } catch (error) {
    throw new SyncError(422, `기본 강의 파일을 확인해 주세요: ${error.message}`);
  }
  return { bytes, course, revision: revisionOf(bytes) };
}

function conflict(current) {
  return new SyncError(409, '강의 파일이 다른 곳에서 변경되었습니다. 최신 내용을 확인해 주세요.', {
    course: current.course,
    revision: current.revision,
  });
}

async function pruneBackups(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const owned = entries.filter(entry => entry.isFile() && BACKUP_NAME.test(entry.name))
    .map(entry => entry.name).sort().reverse();
  for (const name of owned.slice(BACKUP_LIMIT)) {
    // Only exact regular-file names owned by this endpoint are removed.
    await unlink(join(directory, name));
  }
}

/** Local development only. Installs no preview hook and emits no production endpoint. */
export function courseSyncPlugin({ root } = {}) {
  return {
    name: 'dolbeom-course-sync',
    apply: 'serve',
    configureServer(server) {
      const projectRoot = resolve(root ?? server.config.root);
      const source = join(projectRoot, 'public', 'data', 'course.json');
      const backups = join(projectRoot, '.course-backups');
      const token = randomBytes(32).toString('hex');
      let queue = Promise.resolve();
      let lastSnapshotTime = 0;

      async function save(course, baseRevision) {
        const current = await readSource(source);
        if (current.revision !== baseRevision) throw conflict(current);
        if (isDeepStrictEqual(course, current.course)) {
          return { course: current.course, revision: current.revision };
        }
        const bytes = Buffer.from(`${JSON.stringify(course, null, 2)}\n`, 'utf8');
        if (bytes.length > MAX_BYTES) throw new SyncError(413, '저장할 강의 파일은 5MB 이하여야 합니다.');

        await mkdir(backups, { recursive: true });
        lastSnapshotTime = Math.max(Date.now(), lastSnapshotTime + 1);
        const time = new Date(lastSnapshotTime).toISOString().replace(/[-:.]/g, '');
        const snapshot = join(backups, `course-${time}-${current.revision}.json`);
        await writeFile(snapshot, current.bytes, { flag: 'wx', mode: 0o600 });
        await pruneBackups(backups);

        // Both paths are on the project volume; rename never exposes partial JSON.
        const temporary = join(backups, `.course-sync-${randomBytes(16).toString('hex')}.tmp`);
        try {
          await writeFile(temporary, bytes, { flag: 'wx', mode: 0o600 });
          // Editors can change the source while snapshot/temp I/O is in progress.
          const latest = await readSource(source);
          if (latest.revision !== current.revision) throw conflict(latest);
          await rename(temporary, source);
        } finally {
          await unlink(temporary).catch(error => {
            if (error.code !== 'ENOENT') server.config.logger?.warn('강의 저장 임시 파일을 정리하지 못했습니다.');
          });
        }
        return { course, revision: revisionOf(bytes) };
      }

      async function handle(request, response) {
        checkRequestOrigin(request);
        if (request.method === 'GET') {
          const current = await readSource(source);
          reply(response, 200, { course: current.course, revision: current.revision, token });
          return;
        }
        if (request.method !== 'PUT') {
          response.setHeader('Allow', 'GET, PUT');
          throw new SyncError(405, 'GET 또는 PUT 요청만 허용됩니다.');
        }
        checkToken(request, token);
        const body = await readJsonBody(request);
        if (!body || typeof body !== 'object' || Array.isArray(body)
          || typeof body.baseRevision !== 'string' || !/^[a-f0-9]{64}$/.test(body.baseRevision)) {
          throw new SyncError(400, '강의 내용과 기준 revision을 함께 보내 주세요.');
        }
        let course;
        try {
          course = validateCourse(body.course);
        } catch (error) {
          throw new SyncError(422, error.message);
        }
        // Rejections must not poison the queue for later legitimate saves.
        const pending = queue.then(() => save(course, body.baseRevision));
        queue = pending.catch(() => {});
        reply(response, 200, await pending);
      }

      server.middlewares.use((request, response, next) => {
        if (request.url !== ENDPOINT) return next();
        response.setHeader('Cache-Control', 'no-store');
        void handle(request, response).catch(error => {
          if (error instanceof SyncError) {
            reply(response, error.status, { error: error.message, ...error.details });
          } else {
            server.config.logger?.error('강의 기본 파일 저장 중 파일 작업에 실패했습니다.');
            reply(response, 500, { error: '강의 파일을 읽거나 저장하지 못했습니다. 원본 파일을 확인해 주세요.' });
          }
        });
      });
    },
  };
}
