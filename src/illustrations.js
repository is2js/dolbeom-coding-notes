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
  markdown: '간단한 마크다운 요청이 목표, 단계와 확인 방법이 담긴 계획 문서로 정리되고, 계획을 검토한 뒤 구현을 요청하는 흐름',
  ide: '파일 탐색기에서 README.md를 열어 편집하고 Git에서 이전과 바뀐 내용을 비교하는 입체 작업 공간',
  web: '브라우저와 서버, 데이터베이스 사이에서 요청과 응답을 주고받는 입체 모형',
  templates: '템플릿과 데이터, 스타일과 동작을 조합해 화면을 만드는 입체 모형',
  'web-architecture': '브라우저의 React·Svelte와 서버의 FastAPI·Spring, 선택적으로 연결하는 DB의 역할',
  'server-rendering': '서버에서 템플릿과 데이터를 HTML로 합치고 브라우저에서 표시하는 흐름',
  ...sectionDescriptions,
};

export function lessonIllustration(id) { return artwork[id] || artwork.terminal; }
export function illustrationDescription(id) { return descriptions[id] || descriptions.terminal; }
// Short visual captions keep the complete accessible descriptions available.
export function illustrationCaption(id) {
  return sectionScenes[String(id).replace(/^section-/, '')]?.title || illustrationDescription(id);
}
export function sectionIllustrationId(section, lessonId) {
  if (SECTION_ILLUSTRATIONS.includes(section?.illustrationId)) return section.illustrationId;
  const id = `section-${section?.id}`;
  return sectionArtwork[id] ? id : lessonId;
}
