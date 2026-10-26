export const SESSION_KEY = 'dolbeom.presentation.v1';

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const validMs = value => typeof value === 'number' && Number.isFinite(value)
  && value >= 0 && value <= Number.MAX_SAFE_INTEGER;
const clock = now => validMs(now) ? now : 0;
const scenePrograms = {
  terminal: 'Windows PowerShell',
  vscode: 'VS Code',
  pycharm: 'PyCharm',
  browser: '브라우저',
  code: '코드 편집기',
  git: 'Git · GitHub',
  architecture: '요청·응답 흐름',
};

/** Build a view over existing source content; never fill defaults into the lesson. */
export function buildPresentationPages(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  return [
    { id: 'case', kind: 'case' },
    ...sections.filter(section => !section.optional).map(section => ({
      id: `section-${section.id}`,
      kind: 'section',
      section,
      points: section.presentationPoints || null,
    })),
    { id: 'demo', kind: 'demo' },
    { id: 'live', kind: 'live' },
    { id: 'recap', kind: 'recap' },
  ];
}

export function getPresentation(lesson) {
  const presentation = isObject(lesson?.presentation) ? lesson.presentation : {};
  const step = lesson?.steps?.[0] || {};
  const demo = isObject(presentation.demo) ? presentation.demo : {};
  return {
    caseSummary: text(presentation.caseSummary),
    demo: {
      program: text(demo.program, scenePrograms[step.scene] || '개발 도구'),
      file: text(demo.file, text(step.fileName)),
      command: text(demo.command, text(step.code)),
      expectedResult: text(demo.expectedResult, text(step.output) || text(step.description)),
      durationMinutes: Number.isFinite(demo.durationMinutes) && demo.durationMinutes > 0
        ? demo.durationMinutes : 3,
    },
    returnSummary: text(presentation.returnSummary) || text(lesson?.closing),
  };
}

function normalizeLocation(course, lessonId, pageId) {
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  if (!lessons.length) return null;
  const lesson = lessons.find(item => item.id === lessonId) || lessons[0];
  const pages = buildPresentationPages(lesson);
  return {
    lessonId: lesson.id,
    pageId: pages.some(page => page.id === pageId) ? pageId : 'case',
  };
}

function decode(value) {
  try { return decodeURIComponent(value || ''); } catch { return ''; }
}

export function parsePresentationRoute(hash, course) {
  const prefix = '#/present';
  if (typeof hash !== 'string' || (hash !== prefix && !hash.startsWith(`${prefix}/`))) return null;
  const parts = hash.slice(prefix.length).split('/').slice(1);
  if (parts.at(-1) === '') parts.pop();
  return normalizeLocation(course, decode(parts[0]), parts.length > 2 ? '' : decode(parts[1] || 'case'));
}

/** Invalid/future starts pause safely while retaining any valid accumulated time. */
export function createDemoTimer(snapshot, now = Date.now()) {
  const source = isObject(snapshot) ? snapshot : {};
  const current = clock(now);
  return {
    elapsedMs: validMs(source.elapsedMs) ? source.elapsedMs : 0,
    startedAt: validMs(source.startedAt) && source.startedAt <= current ? source.startedAt : null,
  };
}

export function elapsedDemoMs(timer, now = Date.now()) {
  const clean = createDemoTimer(timer, now);
  const running = clean.startedAt === null ? 0 : clock(now) - clean.startedAt;
  return Math.min(Number.MAX_SAFE_INTEGER, clean.elapsedMs + running);
}

export function startDemoTimer(timer, now = Date.now()) {
  const clean = createDemoTimer(timer, now);
  return { ...clean, startedAt: clean.startedAt === null ? clock(now) : clean.startedAt };
}

export function pauseDemoTimer(timer, now = Date.now()) {
  return { elapsedMs: elapsedDemoMs(timer, now), startedAt: null };
}

export function resetDemoTimer() {
  return { elapsedMs: 0, startedAt: null };
}

export function formatDemoTime(ms) {
  const seconds = Math.floor((validMs(ms) ? ms : 0) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function cleanTimers(timers, now, knownIds) {
  if (!isObject(timers)) return {};
  return Object.fromEntries(Object.entries(timers)
    .filter(([id]) => /^[a-z0-9][a-z0-9_-]{0,79}$/.test(id) && (!knownIds || knownIds.has(id)))
    .map(([id, timer]) => [id, createDemoTimer(timer, now)]));
}

export function readPresentationSession(storage, course) {
  try {
    const saved = JSON.parse(storage.getItem(SESSION_KEY));
    if (!isObject(saved) || typeof saved.lessonId !== 'string' || typeof saved.pageId !== 'string') return null;
    const location = normalizeLocation(course, saved.lessonId, saved.pageId);
    if (!location) return null;
    const knownIds = new Set(course.lessons.map(lesson => lesson.id));
    return { ...location, timers: cleanTimers(saved.timers, Date.now(), knownIds) };
  } catch {
    return null;
  }
}

export function writePresentationSession(storage, session) {
  try {
    if (!isObject(session) || typeof session.lessonId !== 'string' || !session.lessonId
      || typeof session.pageId !== 'string' || !session.pageId) return false;
    storage.setItem(SESSION_KEY, JSON.stringify({
      lessonId: session.lessonId,
      pageId: session.pageId,
      timers: cleanTimers(session.timers, Date.now()),
    }));
    return true;
  } catch {
    return false;
  }
}
