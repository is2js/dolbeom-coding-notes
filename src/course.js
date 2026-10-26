export const COURSE_IDS = ['terminal', 'git', 'github', 'markdown', 'ide', 'web', 'templates'];
export const SCENES = ['terminal', 'vscode', 'pycharm', 'browser', 'code', 'git', 'architecture'];
export const SECTION_ILLUSTRATIONS = ['web-architecture', 'server-rendering'];
const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
function assert(ok, message) { if (!ok) throw new Error(message); }
function str(value, name, allowEmpty = false) {
  assert(typeof value === 'string' && value.length < 250000 && (allowEmpty || value.trim().length > 0), `${name}: 텍스트를 확인해 주세요.`);
}
function strings(value, name) {
  assert(Array.isArray(value) && value.length <= 100, `${name}: 목록 형식을 확인해 주세요.`);
  value.forEach(item => str(item, name));
}
function boundedText(value, name, maxLength, allowEmpty = false) {
  str(value, name, allowEmpty);
  assert(value.length <= maxLength, `${name}: ${maxLength}자 이내로 작성해 주세요.`);
}
function unique(items, name) {
  const ids = new Set();
  for (const item of items) {
    assert(isObject(item), `${name}: 항목 형식을 확인해 주세요.`);
    str(item.id, `${name} ID`);
    assert(/^[a-z0-9][a-z0-9_-]{0,79}$/.test(item.id) && !ids.has(item.id), `${name}: ID는 고유한 영문·숫자여야 합니다.`);
    ids.add(item.id);
  }
}
export function validateCourse(course) {
  assert(isObject(course) && course.schemaVersion === 1, '지원하는 강의 파일은 schemaVersion 1입니다.');
  str(course.title, '강의 제목'); str(course.subtitle, '부제'); str(course.author, '작성자');
  assert(Array.isArray(course.lessons) && course.lessons.length === COURSE_IDS.length, `${COURSE_IDS.length}개의 강의가 모두 포함되어야 합니다.`);
  unique(course.lessons, '강의');
  assert(COURSE_IDS.every(id => course.lessons.some(l => l.id === id)), '강의 ID가 기본 7개 주제와 다릅니다.');
  for (const [index, lesson] of course.lessons.entries()) {
    assert(lesson.number === index + 1, '강의 번호가 현재 주제 순서와 다릅니다. 순서대로 번호를 정리해 주세요.');
    str(lesson.title, '강의 제목'); str(lesson.shortTitle, '짧은 제목'); str(lesson.subtitle, '강의 부제');
    assert(Number.isFinite(lesson.durationMinutes) && lesson.durationMinutes > 0 && lesson.durationMinutes <= 300, '강의 예상 시간을 확인해 주세요.');
    assert(isObject(lesson.case) && ['example', 'real'].includes(lesson.case.kind), '사례 구분을 확인해 주세요.');
    ['title', 'body', 'question'].forEach(k => str(lesson.case[k], `사례 ${k}`));
    if (lesson.presentation !== undefined) {
      const presentation = lesson.presentation;
      assert(isObject(presentation), '발표 정보: 객체 형식을 확인해 주세요.');
      boundedText(presentation.caseSummary, '발표 사례 요약', 300);
      boundedText(presentation.returnSummary, '발표 복귀 요약', 240, true);
      assert(isObject(presentation.demo), '발표 실전 시연: 객체 형식을 확인해 주세요.');
      boundedText(presentation.demo.program, '발표 시연 프로그램', 160);
      boundedText(presentation.demo.file, '발표 시연 파일', 160, true);
      boundedText(presentation.demo.command, '발표 시연 명령어', 4000, true);
      boundedText(presentation.demo.expectedResult, '발표 시연 예상 결과', 300);
      assert(Number.isFinite(presentation.demo.durationMinutes) && presentation.demo.durationMinutes > 0 && presentation.demo.durationMinutes <= 60, '발표 시연 시간: 0분 초과 60분 이하의 숫자를 입력해 주세요.');
    }
    assert(Array.isArray(lesson.sections) && lesson.sections.length > 0 && lesson.sections.length <= 100, '본문은 최소 한 절이 필요합니다.');
    unique(lesson.sections, '본문');
    lesson.sections.forEach(s => {
      str(s.title, '절 제목'); str(s.body, '본문');
      assert(Number.isFinite(s.minutes) && s.minutes > 0 && s.minutes <= 300 && typeof s.optional === 'boolean', '절의 시간·본편/보충 구분을 확인해 주세요.');
      if (s.illustrationId !== undefined) assert(SECTION_ILLUSTRATIONS.includes(s.illustrationId), '본문 개념 그림: 지원하는 그림을 선택해 주세요.');
      if (s.presentationPoints !== undefined) {
        assert(Array.isArray(s.presentationPoints) && s.presentationPoints.length >= 1 && s.presentationPoints.length <= 3, '발표 핵심 요점: 절마다 1~3개를 작성해 주세요.');
        s.presentationPoints.forEach(point => boundedText(point, '발표 핵심 요점', 80));
      }
    });
    assert(Array.isArray(lesson.steps) && lesson.steps.length > 0 && lesson.steps.length <= 100, '시연은 최소 한 단계가 필요합니다.');
    unique(lesson.steps, '시연');
    lesson.steps.forEach(s => {
      str(s.title, '시연 제목'); str(s.description, '시연 설명');
      assert(SCENES.includes(s.scene), '지원하지 않는 시연 화면입니다.');
      ['code', 'output', 'language', 'fileName', 'focus'].forEach(k => str(s[k], `시연 ${k}`, true));
      strings(s.files, '시연 파일');
    });
    strings(lesson.objectives, '학습 목표'); strings(lesson.checklist, '확인 목록');
    assert(Array.isArray(lesson.pitfalls) && lesson.pitfalls.length <= 100, '실수 목록을 확인해 주세요.');
    lesson.pitfalls.forEach(p => { str(p.title, '실수 제목'); str(p.body, '실수 설명'); });
    assert(Array.isArray(lesson.glossary) && lesson.glossary.length <= 100, '용어 목록을 확인해 주세요.');
    lesson.glossary.forEach(g => { str(g.term, '용어'); str(g.definition, '용어 설명'); });
    assert(Array.isArray(lesson.references) && lesson.references.length <= 100, '참고 문서 목록을 확인해 주세요.');
    lesson.references.forEach(r => {
      str(r.title, '문서 제목');
      let url;
      try { url = new URL(r.url); } catch { throw new Error('참고 링크 주소를 확인해 주세요.'); }
      assert(url.protocol === 'https:' && !!url.hostname, '참고 링크는 https 주소여야 합니다.');
    });
    str(lesson.closing, '마무리');
  }
  return course;
}
export function courseMinutes(course, optional = false) {
  return course.lessons.reduce((total, l) => total + l.sections.filter(s => s.optional === optional).reduce((n, s) => n + Number(s.minutes), 0), 0);
}
export function lessonMinutes(lesson, optional = false) {
  return lesson.sections.filter(s => s.optional === optional).reduce((n, s) => n + Number(s.minutes), 0);
}
export function safeRead(storage, key, fallback = null) {
  try { const raw = storage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
export function safeWrite(storage, key, value) {
  try { storage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}
