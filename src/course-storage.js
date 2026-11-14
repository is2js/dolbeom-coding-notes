import { safeRead } from './course.js';
import { previousIdeDefault } from './previous-ide-default.js';

// New topic identities use separate keys so the old six-lesson draft stays recoverable.
export const COURSE_STORAGE = {
  draft: 'dolbeom.course.v3', recovery: 'dolbeom.working.v4',
  // Reset must not silently resurrect the older seven-topic browser draft.
  previousDismissed: 'dolbeom.seven-topic-dismissed.v1',
  progress: 'dolbeom.progress.v1', last: 'dolbeom.last.v1',
};
const SEVEN_DRAFT = 'dolbeom.course.v2';
const SEVEN_RECOVERY = 'dolbeom.working.v3';
const SEVEN_IDS = ['terminal', 'git', 'github', 'markdown', 'ide', 'web', 'templates'];
const WEB_SECTION_IDS = new Set(['tools-html', 'tools-css', 'tools-javascript']);
const WEB_STEP_IDS = new Set(['html-practice', 'css-practice', 'javascript-practice']);
const clone = value => JSON.parse(JSON.stringify(value));
const normalized = value => Array.isArray(value) ? value.map(normalized)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, normalized(value[key])])) : value;
const equal = (left, right) => JSON.stringify(normalized(left)) === JSON.stringify(normalized(right));

// A three-way comparison changes only fields that exactly match the earlier
// published default. User-authored edits are never guessed or overwritten.
function mergeUnchanged(current, previous, latest) {
  if (latest === undefined || previous === undefined) return current;
  if (equal(current, previous)) return clone(latest);
  if (!current || !previous || !latest || typeof current !== 'object' || typeof previous !== 'object'
      || typeof latest !== 'object' || Array.isArray(current) || Array.isArray(previous) || Array.isArray(latest)) return current;
  const result = { ...current };
  for (const key of Object.keys(previous)) {
    if (Object.hasOwn(current, key) && Object.hasOwn(latest, key)) result[key] = mergeUnchanged(current[key], previous[key], latest[key]);
  }
  return result;
}

export function upgradeCourseDefaults(value, baseCourse) {
  const ide = value?.lessons?.find?.(lesson => lesson?.id === 'ide');
  const latest = baseCourse?.lessons?.find?.(lesson => lesson?.id === 'ide');
  if (!ide || !latest || !Array.isArray(ide.sections) || !Array.isArray(ide.steps)) return value;
  const updated = clone(value);
  const target = updated.lessons.find(lesson => lesson.id === 'ide');
  const oldDuration = target.sections.reduce((sum, section) => sum + (!section.optional ? Number(section.minutes) : 0), 0);
  let changed = false;
  const sectionIndex = target.sections.findIndex(section => section.id === 'codex-context');
  const latestSection = latest.sections.find(section => section.id === 'codex-context');
  if (sectionIndex >= 0 && latestSection && equal(target.sections[sectionIndex], previousIdeDefault.section)
      && !equal(target.sections[sectionIndex], latestSection)) {
    target.sections[sectionIndex] = clone(latestSection); changed = true;
  }
  const stepIndex = target.steps.findIndex(step => step.id === 'tools-05');
  const latestStep = latest.steps.find(step => step.id === 'tools-05');
  if (stepIndex >= 0 && latestStep && equal(target.steps[stepIndex], previousIdeDefault.step)
      && !equal(target.steps[stepIndex], latestStep)) {
    target.steps[stepIndex] = clone(latestStep); changed = true;
  }
  for (const key of Object.keys(previousIdeDefault.metadata)) {
    if (!Object.hasOwn(target, key) || !Object.hasOwn(latest, key)) continue;
    const merged = mergeUnchanged(target[key], previousIdeDefault.metadata[key], latest[key]);
    if (!equal(target[key], merged)) { target[key] = merged; changed = true; }
  }
  // An explicitly edited duration is not ours to change. Recalculate only if
  // it was already synchronized with the user's previous section durations.
  const newDuration = target.sections.reduce((sum, section) => sum + (!section.optional ? Number(section.minutes) : 0), 0);
  if (changed && target.durationMinutes === oldDuration && Number.isFinite(newDuration) && newDuration > 0) target.durationMinutes = newDuration;
  return changed ? updated : value;
}

// Convert a detached copy; neither the caller's object nor its stored seven-topic
// snapshot is changed. User sections and demonstration content move by stable ID.
export function migrateSevenCourse(value, baseCourse) {
  const lessons = value?.lessons;
  const template = baseCourse?.lessons?.find(lesson => lesson?.id === 'web-coding');
  if (value?.schemaVersion !== 1 || !Array.isArray(lessons) || lessons.length !== SEVEN_IDS.length
      || !SEVEN_IDS.every(id => lessons.filter(lesson => lesson?.id === id).length === 1)
      || !template) return value;
  const originalIde = lessons.find(lesson => lesson.id === 'ide');
  if (!Array.isArray(originalIde?.sections) || !Array.isArray(originalIde?.steps)) return value;
  const migrated = clone(value);
  const ide = migrated.lessons.find(lesson => lesson.id === 'ide');
  const coding = clone(template);
  const duration = sections => sections.reduce((sum, section) => sum + (!section.optional ? Number(section.minutes) : 0), 0);
  const originalIdeMinutes = duration(ide.sections);
  const movedSections = ide.sections.filter(section => WEB_SECTION_IDS.has(section?.id));
  const movedSteps = ide.steps.filter(step => WEB_STEP_IDS.has(step?.id));
  // If a user removed some standard sections, do not resurrect them. If they
  // removed all of them, a new subject needs at least one valid starting section.
  coding.sections = movedSections.length ? movedSections : [clone(template.sections[0])];
  coding.steps = movedSteps.length ? movedSteps : [clone(template.steps[0])];
  ide.sections = ide.sections.filter(section => !WEB_SECTION_IDS.has(section?.id));
  ide.steps = ide.steps.filter(step => !WEB_STEP_IDS.has(step?.id));
  const ideMinutes = duration(ide.sections), codingMinutes = duration(coding.sections);
  if (ide.durationMinutes === originalIdeMinutes && Number.isFinite(ideMinutes) && ideMinutes > 0) ide.durationMinutes = ideMinutes;
  if (Number.isFinite(codingMinutes) && codingMinutes > 0) coding.durationMinutes = codingMinutes;
  migrated.lessons.splice(migrated.lessons.indexOf(ide) + 1, 0, coding);
  migrated.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  return upgradeCourseDefaults(migrated, baseCourse);
}
const LEGACY_IDS = ['terminal', 'tools', 'web', 'frontend', 'git', 'codex'];
function isLegacyDraft(value) {
  return value?.schemaVersion === 1 && Array.isArray(value.lessons)
    && value.lessons.length === LEGACY_IDS.length
    && LEGACY_IDS.every(id => value.lessons.some(lesson => lesson?.id === id));
}
export function readCourseDrafts(storage, { local = false, baseCourse = null } = {}) {
  const previousRecovery = safeRead(storage, 'dolbeom.working.v2');
  const previousSaved = safeRead(storage, 'dolbeom.course.v1');
  const previous = previousRecovery?.dirty ? previousRecovery.course : !local ? previousSaved : null;
  const dismissed = safeRead(storage, COURSE_STORAGE.previousDismissed, false);
  const currentSaved = safeRead(storage, COURSE_STORAGE.draft);
  const currentRecovery = safeRead(storage, COURSE_STORAGE.recovery);
  const oldSaved = !dismissed && !currentSaved ? safeRead(storage, SEVEN_DRAFT) : null;
  // An existing new-generation draft takes precedence over both old keys.
  const oldRecovery = !dismissed && !currentSaved && !currentRecovery ? safeRead(storage, SEVEN_RECOVERY) : null;
  const migratedSaved = oldSaved && migrateSevenCourse(oldSaved, baseCourse);
  const migratedRecoveryCourse = oldRecovery?.course && migrateSevenCourse(oldRecovery.course, baseCourse);
  const upgradedSaved = currentSaved && upgradeCourseDefaults(currentSaved, baseCourse);
  const upgradedRecoveryCourse = currentRecovery?.course && upgradeCourseDefaults(currentRecovery.course, baseCourse);
  return {
    stored: upgradedSaved || migratedSaved,
    recovery: currentRecovery ? { ...currentRecovery, course: upgradedRecoveryCourse || currentRecovery.course }
      : oldRecovery && { ...oldRecovery, course: migratedRecoveryCourse || oldRecovery.course },
    migratedFromSeven: !!((oldSaved && migratedSaved !== oldSaved) || (oldRecovery?.course && migratedRecoveryCourse !== oldRecovery.course)),
    upgradedDefaults: !!((currentSaved && upgradedSaved !== currentSaved) || (currentRecovery?.course && upgradedRecoveryCourse !== currentRecovery.course)),
    legacyDraft: isLegacyDraft(previous) ? previous : null,
  };
}

export function resolveLessonAlias(id) {
  return ({ tools: 'ide', frontend: 'templates', codex: 'templates' })[id] || id;
}
