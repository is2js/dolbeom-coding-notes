const clone = value => JSON.parse(JSON.stringify(value));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Dev-only transport. No timers or browser globals, so races can be tested. */
export function createLocalCourseSync({
  fetcher = globalThis.fetch,
  endpoint = '/__course-sync',
  onState = () => {},
  onRemote = () => true,
  isDirty = () => false,
}) {
  let revision = null;
  let token = null;
  let remoteConflict = null;
  let localChanged = false;
  let pending = null;
  let editVersion = 0;
  let saving = 0;
  let polling = false;
  let queue = Promise.resolve();
  let state = { mode: 'local', status: 'connecting', conflict: false, message: '프로젝트 원본에 연결하고 있습니다.' };

  function report(status, message) {
    state = { mode: 'local', status, conflict: !!remoteConflict, message };
    onState({ ...state });
  }
  function conflict(snapshot) {
    remoteConflict = snapshot;
    report('conflict', '파일과 브라우저가 모두 변경되었습니다. 두 버전 중 반영할 내용을 선택해 주세요.');
  }
  function blocked() {
    const error = new Error('동시 수정이 감지되었습니다. 먼저 아래에서 사용할 버전을 선택해 주세요.');
    error.code = 'CONFLICT';
    return error;
  }
  async function snapshot() {
    const response = await fetcher(endpoint, { cache: 'no-store', credentials: 'same-origin' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '프로젝트 원본을 읽을 수 없습니다.');
    if (!data.course || !data.revision || !data.token) throw new Error('로컬 동기화 서버 응답을 확인해 주세요.');
    token = data.token;
    return data;
  }
  async function acceptRemote(data, force = false) {
    if (await onRemote(clone(data.course), { revision: data.revision, force }) === false) {
      conflict(data);
      return false;
    }
    revision = data.revision;
    remoteConflict = null;
    pending = null;
    localChanged = false;
    report('synced', '브라우저와 프로젝트 원본이 동기화되었습니다.');
    return true;
  }

  return {
    get revision() { return revision; },
    get state() { return { ...state }; },
    get hasConflict() { return !!remoteConflict; },
    markEdited() {
      editVersion += 1;
      localChanged = true;
      if (!remoteConflict) report('saving', '브라우저 초안 보관됨 · 입력을 마치면 원본 파일에 자동 저장합니다.');
    },
    async connect({ draft = null, baseRevision = null } = {}) {
      try {
        const latest = await snapshot();
        if (draft && !equal(draft, latest.course)) {
          revision = baseRevision;
          localChanged = true;
          if (!baseRevision || baseRevision !== latest.revision) conflict(latest);
          else report('saving', '보관된 브라우저 초안을 프로젝트 원본에 반영합니다.');
          return { restoreDraft: true };
        }
        await acceptRemote(latest, true);
        return { restoreDraft: false };
      } catch (error) {
        revision = baseRevision;
        localChanged = !!draft;
        report('offline', `${error.message} 브라우저 초안은 유지됩니다. 연결 후 재시도해 주세요.`);
        return { restoreDraft: !!draft };
      }
    },
    save(course) {
      const data = clone(course);
      const version = editVersion;
      pending = data;
      const run = async () => {
        if (remoteConflict) throw blocked();
        if (!revision || !token) {
          report('offline', '로컬 서버 연결을 확인하고 다시 저장해 주세요. 브라우저 초안은 보관했습니다.');
          throw new Error(state.message);
        }
        saving += 1;
        report('saving', '프로젝트 원본 파일에 저장하고 있습니다.');
        try {
          const response = await fetcher(endpoint, {
            method: 'PUT', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'X-Course-Sync-Token': token },
            body: JSON.stringify({ course: data, baseRevision: revision }),
          });
          const result = await response.json();
          if (response.status === 409) { conflict(result); throw blocked(); }
          if (!response.ok) throw new Error(result.error || '프로젝트 원본 파일을 저장할 수 없습니다.');
          revision = result.revision;
          remoteConflict = null;
          if (equal(pending, data)) pending = null;
          if (editVersion === version) localChanged = false;
          report(localChanged ? 'saving' : 'synced', localChanged ? '이전 변경은 저장됨 · 이어서 입력한 내용을 보관하고 있습니다.' : '브라우저와 프로젝트 원본에 자동 저장되었습니다.');
          return { course: clone(result.course || data), revision };
        } catch (error) {
          if (error.code !== 'CONFLICT') report('offline', `${error.message} 브라우저 초안은 유지됩니다. 다시 저장해 주세요.`);
          throw error;
        } finally { saving -= 1; }
      };
      const task = queue.then(run, run);
      queue = task.catch(() => {});
      return task;
    },
    async poll() {
      if (saving || polling) return;
      polling = true;
      const readRevision = revision;
      try {
        const latest = await snapshot();
        if (saving || readRevision !== revision) return;
        if (latest.revision === revision) {
          if (state.status === 'offline') {
            report(pending || localChanged ? 'offline' : 'synced', pending || localChanged ? '서버에 다시 연결되었습니다. 재시도 버튼으로 초안을 저장해 주세요.' : '프로젝트 원본 연결이 복구되었습니다.');
          }
          return;
        }
        // A response may have been lost after a successful write. A matching
        // payload can safely advance the baseline without discarding new input.
        if (pending && equal(pending, latest.course)) {
          revision = latest.revision;
          pending = null;
          report('offline', '파일 저장을 확인했습니다. 재시도하면 편집 상태를 정리합니다.');
          return;
        }
        if (localChanged || pending || isDirty() || remoteConflict) { conflict(latest); return; }
        await acceptRemote(latest);
      } catch (error) {
        // A failed read can finish after a newer save just like a successful one.
        if (!saving && readRevision === revision && !remoteConflict) {
          report('offline', `${error.message} 브라우저 초안은 그대로 유지됩니다.`);
        }
      } finally { polling = false; }
    },
    async useFileVersion() {
      await queue;
      editVersion += 1;
      const latest = await snapshot();
      await acceptRemote(latest, true);
    },
    async keepBrowserVersion(course) {
      if (saving) throw new Error('진행 중인 저장이 끝난 뒤 다시 선택해 주세요.');
      const chosenRevision = remoteConflict?.revision;
      const latest = await snapshot();
      if (chosenRevision && chosenRevision !== latest.revision) {
        conflict(latest);
        throw new Error('선택 중 파일이 다시 변경되었습니다. 최신 파일을 확인하고 다시 선택해 주세요.');
      }
      revision = latest.revision;
      remoteConflict = null;
      return this.save(course);
    },
  };
}
