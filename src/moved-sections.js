// Preserve legacy links only when the section really moved in the active course.
const WEB_CODING_SECTIONS = new Set(['tools-html', 'tools-css', 'tools-javascript']);

export function resolveMovedSection(course, lessonId, sectionId) {
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  if (lessonId !== 'ide' || !WEB_CODING_SECTIONS.has(sectionId)) return lessonId;
  const original = lessons.find(item => item.id === lessonId);
  if (original?.sections?.some(item => item.id === sectionId)) return lessonId;
  const destination = lessons.find(item => item.id === 'web-coding');
  return destination?.sections?.some(item => item.id === sectionId) ? destination.id : lessonId;
}
