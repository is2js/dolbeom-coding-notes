import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildLessonFlow, getRelatedSteps, lessonAddress, parseLessonRoute } from '../src/lesson-flow.js';

const source = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const course = () => structuredClone(source);
const findLesson = (id, value = source) => value.lessons.find(lesson => lesson.id === id);
const stepIds = values => values.map(({ step }) => step.id);

test('all 22 core sections appear once in case, authored section order, recap flows', () => {
  let total = 0;
  for (const lesson of source.lessons) {
    const before = JSON.stringify(lesson);
    const flow = buildLessonFlow(lesson);
    const core = lesson.sections.filter(section => !section.optional);
    assert.deepEqual(flow[0], { id: 'case', kind: 'case', title: '시작 사례' });
    assert.deepEqual(flow.at(-1), { id: 'recap', kind: 'recap', title: '핵심 정리' });
    assert.deepEqual(flow.slice(1, -1).map(page => page.id), core.map(section => `section-${section.id}`));
    core.forEach((section, index) => {
      assert.equal(flow[index + 1].section, section);
      assert.equal(flow[index + 1].title, section.title);
      assert.equal(flow[index + 1].kind, 'section');
    });
    assert.equal(JSON.stringify(lesson), before, 'building a flow must not mutate source content');
    total += core.length;
  }
  assert.equal(total, 22);
});

test('every core section has related examples and the registry covers all 67 existing step IDs', () => {
  const covered = new Set();
  for (const lesson of source.lessons) {
    const before = JSON.stringify(lesson);
    for (const page of buildLessonFlow(lesson).filter(page => page.kind === 'section')) {
      const related = getRelatedSteps(lesson, page);
      assert.ok(related.length > 0, `${lesson.id}/${page.id} needs a related example`);
      assert.deepEqual(related, getRelatedSteps(lesson, page.id));
      for (const { step, index } of related) {
        assert.equal(step, lesson.steps[index], 'indices refer to the current lesson, not a filtered array');
        covered.add(`${lesson.id}/${step.id}`);
      }
    }
    assert.equal(JSON.stringify(lesson), before);
  }
  const expected = source.lessons.flatMap(lesson => lesson.steps.map(step => `${lesson.id}/${step.id}`));
  assert.equal(expected.length, 67);
  assert.deepEqual([...covered].sort(), expected.sort());
});

test('terminal, README, Python keymap and template pages select examples for their own concepts', () => {
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('terminal'), 'section-terminal-example')), ['terminal-01', 'terminal-02', 'terminal-03']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('terminal'), 'section-terminal-host-shell')), ['terminal-05']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('markdown'), 'section-tools-markdown')), ['tools-08', 'tools-10']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('ide'), 'section-tools-vscode')), ['tools-01', 'tools-02', 'tools-03']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('ide'), 'section-tools-pycharm')), ['tools-06', 'ide-keymap', 'tools-07']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('web'), 'section-web-html')), ['web-ssr-handler', 'web-ssr-template', 'web-08', 'web-11']);
  assert.deepEqual(stepIds(getRelatedSteps(findLesson('templates'), 'section-web-jinja')), ['web-06', 'web-07', 'frontend-01']);
  assert.ok(!stepIds(getRelatedSteps(findLesson('templates'), 'section-frontend-css')).includes('frontend-08'));
  assert.ok(stepIds(getRelatedSteps(findLesson('templates'), 'section-frontend-alpine')).includes('frontend-08'));
});

test('case, recap, optional, unknown and cross-lesson sections have no inferred examples', () => {
  const value = course();
  const lesson = findLesson('ide', value);
  lesson.sections.push({ id: 'custom-section', title: '새 본문', minutes: 1, optional: false, body: 'tools-pycharm와 같은 단어가 있어도 자동 연결하지 않습니다.' });
  lesson.sections.push({ id: 'constructor', title: '사용자 정의 ID', minutes: 1, optional: false, body: '객체 기본 속성과 이름이 같아도 새 절입니다.' });
  const flow = buildLessonFlow(lesson);
  assert.ok(flow.some(page => page.id === 'section-custom-section'));
  assert.ok(!flow.some(page => page.id === 'section-tools-bonus'));
  for (const page of ['case', 'recap', 'section-tools-bonus', 'section-custom-section', 'section-constructor', 'section-markdown-map', 'tools-pycharm', null, { id: 'section-tools-pycharm', kind: 'case' }]) {
    assert.deepEqual(getRelatedSteps(lesson, page), []);
  }
  lesson.sections.find(section => section.id === 'tools-pycharm').optional = true;
  assert.deepEqual(getRelatedSteps(lesson, 'section-tools-pycharm'), []);
});

test('deleted step IDs are removed and unregistered new steps are not accidentally suggested', () => {
  const lesson = structuredClone(findLesson('ide'));
  lesson.steps = lesson.steps.filter(step => step.id !== 'ide-keymap');
  lesson.steps.unshift({ ...lesson.steps[0], id: 'custom-demo', title: 'Python keymap 비슷한 제목' });
  const related = getRelatedSteps(lesson, 'section-tools-pycharm');
  assert.deepEqual(stepIds(related), ['tools-06', 'tools-07']);
  related.forEach(({ step, index }) => assert.equal(lesson.steps[index], step));
});

test('renamed titles and reordered lessons, sections and steps preserve stable routes and actual step indices', () => {
  const value = course();
  const lesson = findLesson('ide', value);
  const address = lessonAddress(lesson.id, 'section-tools-pycharm');
  lesson.title = '새로운 강의 제목';
  lesson.sections.find(section => section.id === 'tools-pycharm').title = '바뀐 Python 절 제목';
  lesson.steps.forEach(step => { step.title = '이름을 모두 바꾼 시연'; });
  lesson.sections.reverse();
  lesson.steps.reverse();
  value.lessons.reverse();
  assert.deepEqual(parseLessonRoute(address, value), { lessonId: 'ide', pageId: 'section-tools-pycharm' });
  const page = buildLessonFlow(lesson).find(item => item.id === 'section-tools-pycharm');
  assert.equal(page.title, '바뀐 Python 절 제목');
  assert.deepEqual(stepIds(getRelatedSteps(lesson, page)), ['tools-07', 'ide-keymap', 'tools-06']);
  getRelatedSteps(lesson, page).forEach(({ step, index }) => assert.equal(step, lesson.steps[index]));
  assert.deepEqual(buildLessonFlow(lesson).filter(item => item.kind === 'section').map(item => item.section.id), lesson.sections.filter(section => !section.optional).map(section => section.id));
});

test('lesson addresses roundtrip case, recap and every stable section page', () => {
  assert.equal(lessonAddress('git'), '#/lesson/git/case');
  for (const lesson of source.lessons) {
    for (const page of buildLessonFlow(lesson)) {
      const address = lessonAddress(lesson.id, page.id);
      assert.deepEqual(parseLessonRoute(address, source), { lessonId: lesson.id, pageId: page.id });
    }
  }
});

test('old lesson-only routes and historical topic aliases open the case', () => {
  assert.deepEqual(parseLessonRoute('#/lesson/git', source), { lessonId: 'git', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/tools', source), { lessonId: 'ide', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/frontend', source), { lessonId: 'templates', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/codex', source), { lessonId: 'templates', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/tools/section-tools-pycharm', source), { lessonId: 'ide', pageId: 'section-tools-pycharm' });
});

test('removed or optional page IDs return to the same lesson case', () => {
  const value = course();
  const lesson = findLesson('git', value);
  lesson.sections = lesson.sections.filter(section => section.id !== 'git-why');
  assert.deepEqual(parseLessonRoute('#/lesson/git/section-git-why', value, 'ide'), { lessonId: 'git', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/ide/section-tools-bonus', value), { lessonId: 'ide', pageId: 'case' });
  assert.deepEqual(parseLessonRoute('#/lesson/git/section-tools-pycharm', value), { lessonId: 'git', pageId: 'case' });
});

test('malformed lesson addresses normalize safely without carrying a page from an invalid topic', () => {
  for (const hash of ['#/lesson', '#/lesson/', '#/lesson//case', '#/lesson/missing', '#/lesson/missing/section-git-why', '#/lesson/%67it/case']) {
    assert.deepEqual(parseLessonRoute(hash, source, 'git'), { lessonId: 'git', pageId: 'case' }, hash);
  }
  for (const hash of ['#/lesson/ide/', '#/lesson/ide/unknown', '#/lesson/ide/section-tools-pycharm/extra']) {
    assert.deepEqual(parseLessonRoute(hash, source, 'git'), { lessonId: 'ide', pageId: 'case' }, hash);
  }
  assert.deepEqual(parseLessonRoute('#/lesson/missing', source, 'tools'), { lessonId: 'ide', pageId: 'case' });
  const reordered = course();
  reordered.lessons.reverse();
  assert.deepEqual(parseLessonRoute('#/lesson/missing', reordered, 'also-missing'), { lessonId: reordered.lessons[0].id, pageId: 'case' });
});

test('unrelated routes and unavailable courses do not hijack other app screens', () => {
  for (const hash of ['', '#/', '#/editor/ide/tools-map', '#/present/git/case', '#/lessons/git', '#/lessonish/git', null, 5]) assert.equal(parseLessonRoute(hash, source), null);
  assert.equal(parseLessonRoute('#/lesson/git/case', { lessons: [] }), null);
  assert.equal(parseLessonRoute('#/lesson/git/case', null), null);
  assert.deepEqual(buildLessonFlow(null), []);
  assert.deepEqual(getRelatedSteps(null, 'case'), []);
});
