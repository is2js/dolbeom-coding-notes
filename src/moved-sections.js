// Preserve legacy links only when the section really moved in the active course.
const WEB_CODING_SECTIONS = new Set(['tools-html', 'tools-css', 'tools-javascript']);
const WEB_TOOL_SECTIONS = new Set(['frontend-css', 'frontend-alpine', 'frontend-bonus']);

export function resolveMovedSection(course, lessonId, sectionId) {
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  const newId = lessonId === 'ide' && WEB_CODING_SECTIONS.has(sectionId) ? 'web-coding'
    : lessonId === 'templates' && WEB_TOOL_SECTIONS.has(sectionId) ? 'web-tools' : null;
  if (!newId) return lessonId;
  const original = lessons.find(item => item.id === lessonId);
  if (original?.sections?.some(item => item.id === sectionId)) return lessonId;
  const destination = lessons.find(item => item.id === newId);
  return destination?.sections?.some(item => item.id === sectionId) ? destination.id : lessonId;
}
