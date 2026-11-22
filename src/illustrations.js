// The artwork follows stable topic IDs, so editing titles or reordering lessons
// keeps each scene attached to the concept it illustrates.
import { SECTION_ILLUSTRATIONS } from './course.js';
import { sectionArtwork, sectionDescriptions, sectionScenes } from './section-scenes.js';
const sources = import.meta.glob('./illustrations/*.svg', { query: '?raw', import: 'default', eager: true });
const artwork = { ...Object.fromEntries(Object.entries(sources).map(([path, svg]) => [path.split('/').pop().replace(/\.svg$/, ''), svg])), ...sectionArtwork };
const descriptions = {
  terminal: 'AI가 제공한 ZIP과 실행 안내, 터미널의 프로젝트 실행 화면과 작업 폴더를 보여 주는 입체 작업대',
  git: '커밋 기록이 브랜치로 갈라지고 다시 병합되는 입체 모형',
  github: '내 컴퓨터의 Git 설정에 저장된 원격 주소 별칭 origin과 GitHub 원격 저장소를 나란히 보여 줍니다. push는 로컬에서 원격으로, fetch는 원격에서 로컬 Git 기록으로 이동하며 작업 파일은 자동으로 바뀌지 않습니다.',
  'github-case': '왼쪽 GitHub에 다른 사람이 올린 프로젝트가 있습니다. git clone 화살표가 오른쪽의 내 컴퓨터를 향합니다. 복제하면 내 컴퓨터에 프로젝트 파일과 Git 기록이 생깁니다.',
  markdown: '간단한 마크다운 요청이 목표, 단계와 확인 방법이 담긴 계획 문서로 정리되고, 계획을 검토한 뒤 구현을 요청하는 흐름',
  ide: '파일 탐색기에서 README.md를 열어 편집하고 Git에서 이전과 바뀐 내용을 비교하는 입체 작업 공간',
  'web-coding': 'HTML의 내용과 구조, CSS의 모양, JavaScript의 버튼 동작을 하나의 강의 카드와 브라우저 화면으로 연결합니다.',
  'web-tools': 'Tailwind CSS의 스타일 클래스와 Alpine.js의 상태 및 클릭 동작을 같은 강의 카드에 적용하는 입체 작업대',
  web: '브라우저가 npm run dev로 시작한 개발 서버에 화면 파일을 요청하고 HTML, CSS, JavaScript를 받아 표시하는 입체 모형',
  templates: '딕셔너리 또는 SQLite 데이터와 Jinja2 템플릿을 FastAPI 서버에서 HTML로 결합해 카드로 표시하는 입체 모형',
  'web-architecture': '왼쪽 브라우저가 오른쪽 서버로 요청을 보내고 서버의 응답을 받습니다. 서버는 필요한 경우 연결된 저장소에서 데이터를 읽습니다.',
  'server-rendering': '템플릿과 데이터를 서버에서 결합해 HTML을 만든 뒤 브라우저로 보내 카드로 표시합니다.',
  ...sectionDescriptions,
};

export function lessonIllustration(id) { return artwork[id] || artwork.terminal; }
export function caseIllustrationId(lessonId) { return lessonId === 'github' ? 'github-case' : lessonId; }
export function illustrationDescription(id) { return descriptions[id] || descriptions.terminal; }
// Short visual captions keep the complete accessible descriptions available.
export function illustrationCaption(id) {
  if (id === 'github-case') return 'GitHub의 프로젝트를 내 컴퓨터로 복제하기';
  return sectionScenes[String(id).replace(/^section-/, '')]?.title || illustrationDescription(id);
}
export function sectionIllustrationId(section, lessonId) {
  if (SECTION_ILLUSTRATIONS.includes(section?.illustrationId)) return section.illustrationId;
  const id = `section-${section?.id}`;
  return sectionArtwork[id] ? id : lessonId;
}
