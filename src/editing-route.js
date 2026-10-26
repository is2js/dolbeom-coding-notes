// Editor addresses refer to stable content IDs, so titles and order may change.
export function editorAddress(lessonId, itemId = 'case') {
  return `#/editor/${lessonId}/${itemId}`;
}

export function selectEditorLesson(state, lessonId) {
  // Presenter previews reuse this lesson ID, so clear a previous lesson's step.
  if (state.lessonId !== lessonId) state.stepIndex = 0;
  state.lessonId = lessonId;
}

export function parseEditorRoute(hash, course, fallbackLessonId) {
  if (typeof hash !== 'string' || !/^#\/editor(?:\/|$)/.test(hash)) return null;
  const parts = hash.match(/^#\/editor(?:\/([a-z0-9_-]+)(?:\/([a-z0-9_-]+))?)?$/);
  const lessons = course?.lessons || [];
  const lesson = lessons.find(item => item.id === parts?.[1])
    || lessons.find(item => item.id === fallbackLessonId) || lessons[0];
  if (!lesson) return null;
  const requested = parts?.[2];
  return { lessonId: lesson.id, itemId: lesson.sections.some(section => section.id === requested) ? requested : 'case' };
}
