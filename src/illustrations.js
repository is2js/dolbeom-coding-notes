// The artwork follows stable topic IDs, so editing titles or reordering lessons
// keeps each scene attached to the concept it illustrates.
import { SECTION_ILLUSTRATIONS } from './course.js';
import { sectionArtwork, sectionDescriptions } from './section-scenes.js';
const sources = import.meta.glob('./illustrations/*.svg', { query: '?raw', import: 'default', eager: true });
const artwork = { ...Object.fromEntries(Object.entries(sources).map(([path, svg]) => [path.split('/').pop().replace(/\.svg$/, ''), svg])), ...sectionArtwork };
const descriptions = {
  terminal: 'PowerShell 명령 창과 키보드가 있는 입체 작업대',
  git: '커밋 기록이 브랜치로 갈라지고 다시 병합되는 입체 모형',
  github: '원격 저장소를 중심으로 작업 카드와 협업 흐름이 연결된 입체 모형',
  markdown: '제목과 목록, 코드가 문서 페이지로 정리되는 입체 노트',
  ide: '파일 탐색기와 코드 편집기, 실행 패널을 함께 보여 주는 입체 작업 공간',
  web: '브라우저와 서버, 데이터베이스 사이에서 요청과 응답을 주고받는 입체 모형',
  templates: '템플릿과 데이터, 스타일과 동작을 조합해 화면을 만드는 입체 모형',
  'web-architecture': '브라우저의 React·Svelte와 서버의 FastAPI·Spring, 선택적으로 연결하는 DB의 역할',
  'server-rendering': '서버에서 템플릿과 데이터를 HTML로 합치고 브라우저에서 표시하는 흐름',
  ...sectionDescriptions,
};

export function lessonIllustration(id) { return artwork[id] || artwork.terminal; }
export function illustrationDescription(id) { return descriptions[id] || descriptions.terminal; }
export function sectionIllustrationId(section, lessonId) {
  if (SECTION_ILLUSTRATIONS.includes(section?.illustrationId)) return section.illustrationId;
  const id = `section-${section?.id}`;
  return sectionArtwork[id] ? id : lessonId;
}
