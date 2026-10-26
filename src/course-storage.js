import { safeRead } from './course.js';

// New topic identities use separate keys so the old six-lesson draft stays recoverable.
export const COURSE_STORAGE = {
  draft: 'dolbeom.course.v2', recovery: 'dolbeom.working.v3',
  progress: 'dolbeom.progress.v1', last: 'dolbeom.last.v1',
};
const LEGACY_IDS = ['terminal', 'tools', 'web', 'frontend', 'git', 'codex'];
function isLegacyDraft(value) {
  return value?.schemaVersion === 1 && Array.isArray(value.lessons)
    && value.lessons.length === LEGACY_IDS.length
    && LEGACY_IDS.every(id => value.lessons.some(lesson => lesson?.id === id));
}
export function readCourseDrafts(storage, { local = false } = {}) {
  const previousRecovery = safeRead(storage, 'dolbeom.working.v2');
  const previousSaved = safeRead(storage, 'dolbeom.course.v1');
  const previous = previousRecovery?.dirty ? previousRecovery.course : !local ? previousSaved : null;
  return {
    stored: safeRead(storage, COURSE_STORAGE.draft),
    recovery: safeRead(storage, COURSE_STORAGE.recovery),
    legacyDraft: isLegacyDraft(previous) ? previous : null,
  };
}

export function resolveLessonAlias(id) {
  return ({ tools: 'ide', frontend: 'templates', codex: 'templates' })[id] || id;
}
