import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  SESSION_KEY, buildPresentationPages, getPresentation, parsePresentationRoute,
  createDemoTimer, elapsedDemoMs, startDemoTimer, pauseDemoTimer, resetDemoTimer,
  formatDemoTime, readPresentationSession, writePresentationSession,
} from '../src/presentation.js';

const copy = value => structuredClone(value);
const course = () => ({ lessons: [
  {
    id: 'terminal', closing: '현재 위치부터 확인합니다.',
    case: { body: '## 기존 사례\n\n원래 Markdown을 보존합니다.' },
    sections: [
      { id: 'location', optional: false, body: '경로 설명', presentationPoints: ['현재 위치를 먼저 확인합니다.', '대상을 정하고 명령을 실행합니다.'] },
      { id: 'bonus', optional: true, body: '보충 설명', presentationPoints: ['정규 발표에서는 제외'] },
      { id: 'run', optional: false, body: '실행 설명' },
    ],
    steps: [{ scene: 'terminal', fileName: 'PowerShell', code: 'Get-Location', output: 'C:\\work', description: '현재 위치 읽기' }],
  },
  {
    id: 'git', closing: '변경을 기록합니다.',
    sections: [{ id: 'branch', optional: false, body: '브랜치 설명' }],
    steps: [{ scene: 'git', fileName: 'README.md', code: 'git diff', output: '', description: '수정한 줄을 확인합니다.' }],
  },
] });

function freeze(value) {
  if (value && typeof value === 'object') {
    Object.freeze(value);
    Object.values(value).forEach(freeze);
  }
  return value;
}

function memory(initial) {
  const values = new Map(initial === undefined ? [] : [[SESSION_KEY, initial]]);
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('발표는 사례·전체 본편 절·시연·실제 실습·복귀 정리로 이어지고 보충 절은 제외한다', () => {
  const source = freeze(course().lessons[0]);
  const before = JSON.stringify(source);
  const pages = buildPresentationPages(source);
  assert.deepEqual(pages.map(page => [page.id, page.kind]), [
    ['case', 'case'], ['section-location', 'section'], ['section-run', 'section'],
    ['demo', 'demo'], ['live', 'live'], ['recap', 'recap'],
  ]);
  assert.equal(pages[1].section, source.sections[0]);
  assert.deepEqual(pages[1].points, source.sections[0].presentationPoints);
  assert.equal(pages[2].points, null, 'existing full Markdown remains the fallback');
  assert.equal(JSON.stringify(source), before, 'page building must not fill defaults into source content');
});

test('실제 기본 강의의 모든 본편이 빠짐없이 연결되며 본문·시연 원본을 변경하지 않는다', () => {
  const source = freeze(JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8')));
  const before = JSON.stringify(source);
  for (const lesson of source.lessons) {
    const pages = buildPresentationPages(lesson);
    const core = lesson.sections.filter(section => !section.optional);
    assert.equal(pages.length, core.length + 4, lesson.id);
    assert.deepEqual(pages.filter(page => page.kind === 'section').map(page => page.id), core.map(section => `section-${section.id}`));
    assert.equal(new Set(pages.map(page => page.id)).size, pages.length);
    assert.ok(!pages.some(page => page.section?.optional));
    getPresentation(lesson);
  }
  assert.equal(JSON.stringify(source), before);
});

test('발표 메타데이터가 있으면 명시한 값만 새 보기 모델로 읽는다', () => {
  const lesson = course().lessons[0];
  lesson.presentation = {
    caseSummary: '한 문장 도입',
    demo: { program: 'VS Code', file: 'README.md', command: 'npm run dev', expectedResult: '강의 카드 표시', durationMinutes: 4.5 },
    returnSummary: '실습에서 찾은 경로를 돌아봅니다.',
  };
  freeze(lesson);
  assert.deepEqual(getPresentation(lesson), lesson.presentation);
  assert.notEqual(getPresentation(lesson).demo, lesson.presentation.demo);
  assert.equal(Object.hasOwn(getPresentation(lesson), 'steps'), false);
});

test('레거시 발표는 첫 시연의 도구·파일·명령·출력과 3분으로 호환된다', () => {
  const lessons = course().lessons;
  assert.deepEqual(getPresentation(lessons[0]), {
    caseSummary: '',
    demo: { program: 'Windows PowerShell', file: 'PowerShell', command: 'Get-Location', expectedResult: 'C:\\work', durationMinutes: 3 },
    returnSummary: '현재 위치부터 확인합니다.',
  });
  assert.equal(getPresentation(lessons[1]).demo.expectedResult, '수정한 줄을 확인합니다.');
  assert.equal(getPresentation(lessons[1]).demo.program, 'Git · GitHub');
  assert.equal(Object.hasOwn(lessons[0], 'presentation'), false);
  assert.deepEqual(getPresentation({ closing: '정리' }).demo, { program: '개발 도구', file: '', command: '', expectedResult: '', durationMinutes: 3 });
});

test('부분 메타데이터와 잘못된 시연 시간도 원본에 쓰지 않고 안전한 보기 기본값을 사용한다', () => {
  const lesson = course().lessons[0];
  lesson.presentation = { caseSummary: '', demo: { durationMinutes: Infinity, command: '' }, returnSummary: '' };
  assert.equal(getPresentation(lesson).demo.durationMinutes, 3);
  assert.equal(getPresentation(lesson).demo.command, '', 'an explicit empty command is not replaced with a different action');
  assert.equal(getPresentation(lesson).returnSummary, lesson.closing);
  const programs = { vscode: 'VS Code', pycharm: 'PyCharm', browser: '브라우저', code: '코드 편집기', architecture: '요청·응답 흐름' };
  for (const [scene, label] of Object.entries(programs)) {
    assert.equal(getPresentation({ steps: [{ scene }] }).demo.program, label);
  }
});

test('발표 경로만 파싱하고 잘못된 강의·페이지는 현재 첫 강의와 사례로 정규화한다', () => {
  const c = course();
  for (const hash of ['#/lesson/git', '#/editor', '#/presenter/git/demo', '', null]) assert.equal(parsePresentationRoute(hash, c), null);
  assert.deepEqual(parsePresentationRoute('#/present/git/section-branch', c), { lessonId: 'git', pageId: 'section-branch' });
  assert.deepEqual(parsePresentationRoute('#/present/missing/demo', c), { lessonId: 'terminal', pageId: 'demo' });
  assert.deepEqual(parsePresentationRoute('#/present/git/missing', c), { lessonId: 'git', pageId: 'case' });
  assert.deepEqual(parsePresentationRoute('#/present/terminal/section-bonus', c), { lessonId: 'terminal', pageId: 'case' });
  assert.deepEqual(parsePresentationRoute('#/present', c), { lessonId: 'terminal', pageId: 'case' });
  assert.deepEqual(parsePresentationRoute('#/present/git/demo/', c), { lessonId: 'git', pageId: 'demo' });
  assert.deepEqual(parsePresentationRoute('#/present/git/demo/extra', c), { lessonId: 'git', pageId: 'case' });
  assert.deepEqual(parsePresentationRoute('#/present/%E0%A4%A/demo', c), { lessonId: 'terminal', pageId: 'demo' });
  assert.equal(parsePresentationRoute('#/present/git/demo', { lessons: [] }), null);
});

test('강의·본문 절 재정렬 뒤에도 URL과 페이지 ID는 기존 내용을 가리킨다', () => {
  const c = course();
  const route = '#/present/terminal/section-location';
  c.lessons.reverse();
  c.lessons[1].sections.reverse();
  assert.deepEqual(parsePresentationRoute(route, c), { lessonId: 'terminal', pageId: 'section-location' });
  assert.deepEqual(buildPresentationPages(c.lessons[1]).filter(page => page.kind === 'section').map(page => page.id), ['section-run', 'section-location']);
  assert.deepEqual(parsePresentationRoute('#/present/removed/demo', c), { lessonId: 'git', pageId: 'demo' });
});

test('타이머 시작·중복 시작·일시정지·재시작·초기화는 입력을 바꾸지 않는 계산이다', () => {
  const original = freeze({ elapsedMs: 500, startedAt: null });
  const running = startDemoTimer(original, 1000);
  assert.deepEqual(running, { elapsedMs: 500, startedAt: 1000 });
  assert.notEqual(running, original);
  assert.deepEqual(startDemoTimer(running, 2000), running, 'starting twice must not restart elapsed time');
  assert.equal(elapsedDemoMs(running, 3500), 3000);
  const paused = pauseDemoTimer(running, 3500);
  assert.deepEqual(paused, { elapsedMs: 3000, startedAt: null });
  assert.equal(elapsedDemoMs(paused, 10000), 3000);
  assert.equal(elapsedDemoMs(startDemoTimer(paused, 12000), 12500), 3500);
  assert.deepEqual(resetDemoTimer(), { elapsedMs: 0, startedAt: null });
  assert.deepEqual(original, { elapsedMs: 500, startedAt: null });
  assert.equal(elapsedDemoMs(startDemoTimer(undefined, 0), 1000), 1000, 'timestamp zero is a valid start');
});

test('음수·비유한 값·미래 시작 시각·시계 후퇴는 안전하게 정리한다', () => {
  assert.deepEqual(createDemoTimer(), { elapsedMs: 0, startedAt: null });
  for (const value of [-1, Infinity, NaN, '100', Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(createDemoTimer({ elapsedMs: value, startedAt: value }, 1000), { elapsedMs: 0, startedAt: null });
  }
  assert.deepEqual(createDemoTimer({ elapsedMs: 7000, startedAt: 2000 }, 1000), { elapsedMs: 7000, startedAt: null });
  assert.equal(elapsedDemoMs({ elapsedMs: 7000, startedAt: 2000 }, 1000), 7000);
  assert.equal(elapsedDemoMs({ elapsedMs: Number.MAX_SAFE_INTEGER, startedAt: 0 }, 1000), Number.MAX_SAFE_INTEGER);
  assert.deepEqual(createDemoTimer([], 1000), { elapsedMs: 0, startedAt: null });
});

test('표시 시간은 초 미만을 버리고 한 시간 이후에도 총 분으로 표시한다', () => {
  for (const [input, output] of [[0, '00:00'], [999, '00:00'], [1000, '00:01'], [59999, '00:59'], [60000, '01:00'], [3600000, '60:00'], [7384000, '123:04'], [-1, '00:00'], [Infinity, '00:00']]) {
    assert.equal(formatDemoTime(input), output);
  }
});

test('세션은 강의별 타이머와 안정적 페이지 ID를 저장하고 숨김·새로고침 중 경과도 이어 간다', t => {
  let now = 100000;
  t.mock.method(Date, 'now', () => now);
  const c = course();
  const storage = memory();
  const session = freeze({
    lessonId: 'git', pageId: 'section-branch',
    timers: { terminal: { elapsedMs: 10000, startedAt: 90000 }, git: { elapsedMs: 4000, startedAt: null } },
  });
  assert.equal(SESSION_KEY, 'dolbeom.presentation.v1');
  assert.equal(writePresentationSession(storage, session), true);
  assert.deepEqual(JSON.parse(storage.values.get(SESSION_KEY)), session);
  now = 122000;
  c.lessons.reverse();
  c.lessons[1].sections.reverse();
  const restored = readPresentationSession(storage, c);
  assert.deepEqual(restored, session);
  assert.equal(elapsedDemoMs(restored.timers.terminal, now), 42000);
  assert.equal(elapsedDemoMs(restored.timers.git, now), 4000);
  assert.deepEqual(session.timers.terminal, { elapsedMs: 10000, startedAt: 90000 });
});

test('손상된 타이머를 정리하고 삭제된 강의·보충 절 세션은 현재 사례로 복구한다', t => {
  t.mock.method(Date, 'now', () => 100000);
  const c = course();
  const saved = {
    lessonId: 'removed', pageId: 'section-bonus',
    timers: { terminal: { elapsedMs: 8000, startedAt: 200000 }, git: { elapsedMs: -7, startedAt: -1 }, removed: { elapsedMs: 1234, startedAt: 0 } },
  };
  const storage = memory(JSON.stringify(saved));
  const restored = readPresentationSession(storage, c);
  assert.deepEqual(restored, {
    lessonId: 'terminal', pageId: 'case',
    timers: { terminal: { elapsedMs: 8000, startedAt: null }, git: { elapsedMs: 0, startedAt: null } },
  });
  assert.equal(storage.values.get(SESSION_KEY), JSON.stringify(saved), 'reading recovery must not overwrite the saved evidence');
  storage.setItem(SESSION_KEY, JSON.stringify({ lessonId: 'git', pageId: 'live', timers: [] }));
  assert.deepEqual(readPresentationSession(storage, c), { lessonId: 'git', pageId: 'live', timers: {} });
});

test('불량 JSON·부재·읽기 차단·쓰기 차단은 강의 데이터에 영향 없이 실패한다', () => {
  const c = course();
  for (const value of [undefined, '{ invalid JSON', 'null', '[]', '{}', '{"lessonId":3,"pageId":"case"}']) {
    assert.equal(readPresentationSession(memory(value), c), null);
  }
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
  assert.equal(readPresentationSession(blocked, c), null);
  assert.equal(writePresentationSession(blocked, { lessonId: 'git', pageId: 'case', timers: {} }), false);
  const storage = memory('keep this existing session');
  for (const invalid of [null, [], {}, { lessonId: 'git', pageId: null }]) assert.equal(writePresentationSession(storage, invalid), false);
  assert.equal(storage.values.get(SESSION_KEY), 'keep this existing session');
  assert.equal(readPresentationSession(memory('{"lessonId":"git","pageId":"case"}'), { lessons: [] }), null);
  assert.deepEqual(c, course());
});
