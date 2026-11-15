import { safeRead } from './course.js';
import { previousIdeDefault } from './previous-ide-default.js';
import { previousEightDefault, previousEightCourseMetadata } from './previous-eight-default.js';
import { previousNineDefault } from './previous-nine-default.js';
import { previousLiveWebDefault } from './previous-live-web-default.js';

// New topic identities use separate keys so the old six-lesson draft stays recoverable.
export const COURSE_STORAGE = {
  draft: 'dolbeom.course.v4', recovery: 'dolbeom.working.v5',
  // Reset must not silently resurrect the older seven-topic browser draft.
  previousDismissed: 'dolbeom.eight-topic-dismissed.v1',
  progress: 'dolbeom.progress.v1', last: 'dolbeom.last.v1',
};
const EIGHT_DRAFT = 'dolbeom.course.v3';
const EIGHT_RECOVERY = 'dolbeom.working.v4';
const SEVEN_DISMISSED = 'dolbeom.seven-topic-dismissed.v1';
const EIGHT_IDS = ['terminal','git','github','markdown','ide','web-coding','web','templates'];
const TOOL_SECTION_IDS = new Set(['frontend-css','frontend-alpine','frontend-bonus']);
const TOOL_STEP_IDS = new Set(['web-03','frontend-02','frontend-03','frontend-04','frontend-05','frontend-06','frontend-07','frontend-08','frontend-09','codex-04','frontend-10','codex-10']);
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
// Upgrade known prior defaults while keeping authored fields, custom entries and
// the author's order. Old defaults removed from the new lesson are discarded
// only when they have not been edited; authored entries remain recoverable.
function mergeItems(current, previous, latest, appendNew = true) {
  const oldMap = new Map(previous.map(item => [item.id, item]));
  const latestMap = new Map(latest.map(item => [item.id, item]));
  const result = [];
  for (const item of current) {
    const old = oldMap.get(item.id), next = latestMap.get(item.id);
    if (next) result.push(old ? mergeUnchanged(item, old, next) : clone(item));
    else if (!old || !equal(item, old)) result.push(clone(item));
  }
  if (appendNew) {
    const ids = new Set(current.map(item => item.id));
    for (let i = 0; i < latest.length; i++) {
      const item = latest[i];
      if (ids.has(item.id) || oldMap.has(item.id)) continue;
      // Insert new material before its next existing course anchor so the
      // author's existing items retain their relative order while new data
      // preparation precedes the template section as taught.
      const following = new Set(latest.slice(i + 1).map(next => next.id));
      const position = result.findIndex(existing => following.has(existing.id));
      if (position < 0) result.push(clone(item));
      else result.splice(position, 0, clone(item));
    }
  }
  return result;
}

function mergeLesson(current, previous, latest) {
  const result = clone(current);
  const oldMinutes = current.sections.reduce((sum, item) => sum + (!item.optional ? Number(item.minutes) : 0), 0);
  for (const key of Object.keys(previous)) {
    if (['id','number','sections','steps','durationMinutes'].includes(key)) continue;
    if (Object.hasOwn(current, key) && Object.hasOwn(latest, key)) result[key] = mergeUnchanged(current[key], previous[key], latest[key]);
  }
  result.sections = mergeItems(current.sections, previous.sections, latest.sections);
  result.steps = mergeItems(current.steps, previous.steps, latest.steps);
  // Validation requires at least one section and one demonstration.
  if (!result.sections.length) result.sections = [clone(latest.sections[0])];
  if (!result.steps.length) result.steps = [clone(latest.steps[0])];
  const minutes = result.sections.reduce((sum, item) => sum + (!item.optional ? Number(item.minutes) : 0), 0);
  if (current.durationMinutes === oldMinutes && Number.isFinite(minutes) && minutes > 0) result.durationMinutes = minutes;
  return result;
}

// Keep nine-topic browser edits and ordering while adopting updated explanations
// only where a field still matches the previous published default.
export function upgradeNineDefaults(value, baseCourse) {
  if (!Array.isArray(value?.lessons) || value.lessons.length !== 9 || !Array.isArray(baseCourse?.lessons)) return value;
  let updated = null;
  for (const id of ['web-coding', 'web', 'templates']) {
    const index = value.lessons.findIndex(item => item?.id === id);
    const current = value.lessons[index];
    const latest = baseCourse.lessons.find(item => item?.id === id);
    const previous = previousNineDefault[id];
    if (index < 0 || !latest || !previous || !Array.isArray(current.sections) || !Array.isArray(current.steps)
        || !Array.isArray(latest.sections) || !Array.isArray(latest.steps)) continue;
    // Both released nine-topic versions are possible browser draft baselines.
    // Apply each independently so an untouched field from either release can
    // move forward without replacing fields the author changed.
    const baselines = id === 'web' ? [previous, previousLiveWebDefault] : [previous];
    const merged = baselines.reduce((lesson, baseline) => mergeLesson(lesson, baseline, latest), current);
    if (!equal(current, merged)) {
      updated ||= clone(value);
      updated.lessons[index] = merged;
    }
  }
  return updated || value;
}

export function migrateEightCourse(value, baseCourse) {
  const lessons = value?.lessons;
  const toolDefault = baseCourse?.lessons?.find(lesson => lesson?.id === 'web-tools');
  if (value?.schemaVersion !== 1 || !Array.isArray(lessons) || lessons.length !== EIGHT_IDS.length
      || !EIGHT_IDS.every(id => lessons.filter(lesson => lesson?.id === id).length === 1)
      || !toolDefault) return value;
  const template = lessons.find(lesson => lesson.id === 'templates');
  const web = lessons.find(lesson => lesson.id === 'web');
  const newestTemplate = baseCourse.lessons.find(lesson => lesson.id === 'templates');
  const newestWeb = baseCourse.lessons.find(lesson => lesson.id === 'web');
  if (!Array.isArray(template?.sections) || !Array.isArray(template?.steps) || !Array.isArray(web?.sections) || !Array.isArray(web?.steps)
      || !newestTemplate || !newestWeb || !Array.isArray(toolDefault.sections) || !Array.isArray(toolDefault.steps)) return value;
  const migrated = clone(value);
  for (const key of Object.keys(previousEightCourseMetadata)) {
    if (Object.hasOwn(migrated, key) && Object.hasOwn(baseCourse, key)) migrated[key] = mergeUnchanged(migrated[key], previousEightCourseMetadata[key], baseCourse[key]);
  }
  const oldTemplate = migrated.lessons.find(lesson => lesson.id === 'templates');
  const oldWeb = migrated.lessons.find(lesson => lesson.id === 'web');
  const tool = clone(toolDefault);
  const movedSections = oldTemplate.sections.filter(item => TOOL_SECTION_IDS.has(item.id));
  const movedSteps = oldTemplate.steps.filter(item => TOOL_STEP_IDS.has(item.id));
  tool.sections = mergeItems(movedSections, previousEightDefault.templates.sections.filter(item => TOOL_SECTION_IDS.has(item.id)), toolDefault.sections);
  tool.steps = mergeItems(movedSteps, previousEightDefault.templates.steps.filter(item => TOOL_STEP_IDS.has(item.id)), toolDefault.steps);
  // A topic must have a core section even if an old draft kept only its
  // optional material. Retain that material and add the minimal starter.
  if (!tool.sections.some(item => !item.optional)) tool.sections.unshift(clone(toolDefault.sections.find(item => !item.optional) || toolDefault.sections[0]));
  if (!tool.steps.length) tool.steps = [clone(toolDefault.steps[0])];
  const toolMinutes = tool.sections.reduce((sum, item) => sum + (!item.optional ? Number(item.minutes) : 0), 0);
  if (Number.isFinite(toolMinutes) && toolMinutes > 0) tool.durationMinutes = toolMinutes;
  const previousTemplateWithoutMoved = { ...previousEightDefault.templates,
    sections: previousEightDefault.templates.sections.filter(item => !TOOL_SECTION_IDS.has(item.id)),
    steps: previousEightDefault.templates.steps.filter(item => !TOOL_STEP_IDS.has(item.id)) };
  const templateWithoutMoved = { ...oldTemplate,
    sections: oldTemplate.sections.filter(item => !TOOL_SECTION_IDS.has(item.id)),
    steps: oldTemplate.steps.filter(item => !TOOL_STEP_IDS.has(item.id)) };
  // Compare against the unsplit duration before recalculating a default value.
  const oldTemplateMinutes = oldTemplate.sections.reduce((sum, item) => sum + (!item.optional ? Number(item.minutes) : 0), 0);
  if (oldTemplate.durationMinutes === oldTemplateMinutes) templateWithoutMoved.durationMinutes = templateWithoutMoved.sections.reduce((sum, item) => sum + (!item.optional ? Number(item.minutes) : 0), 0);
  const mergedTemplate = mergeLesson(templateWithoutMoved, previousTemplateWithoutMoved, newestTemplate);
  const mergedWeb = mergeLesson(oldWeb, previousEightDefault.web, newestWeb);
  migrated.lessons[migrated.lessons.indexOf(oldTemplate)] = mergedTemplate;
  migrated.lessons[migrated.lessons.indexOf(oldWeb)] = mergedWeb;
  const codingIndex = migrated.lessons.findIndex(lesson => lesson.id === 'web-coding');
  migrated.lessons.splice(codingIndex + 1, 0, tool);
  migrated.lessons.forEach((lesson, index) => { lesson.number = index + 1; });
  return upgradeCourseDefaults(migrated, baseCourse);
}

export function migrateCourse(value, baseCourse) {
  return upgradeNineDefaults(migrateEightCourse(migrateSevenCourse(value, baseCourse), baseCourse), baseCourse);
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
  const sevenDismissed = safeRead(storage, SEVEN_DISMISSED, false);
  const currentSaved = safeRead(storage, COURSE_STORAGE.draft);
  const currentRecovery = safeRead(storage, COURSE_STORAGE.recovery);
  // Each old generation remains untouched. Prefer the most recent available pair.
  const eightSaved = !dismissed && !currentSaved ? safeRead(storage, EIGHT_DRAFT) : null;
  const eightRecovery = !dismissed && !currentSaved && !currentRecovery ? safeRead(storage, EIGHT_RECOVERY) : null;
  const oldSaved = !dismissed && !sevenDismissed && !currentSaved && !eightSaved && !eightRecovery ? safeRead(storage, SEVEN_DRAFT) : null;
  const oldRecovery = !dismissed && !sevenDismissed && !currentSaved && !currentRecovery && !eightSaved && !eightRecovery ? safeRead(storage, SEVEN_RECOVERY) : null;
  const previousSavedCourse = eightSaved || oldSaved;
  const previousRecoveryEntry = eightRecovery || oldRecovery;
  const migratedSaved = previousSavedCourse && migrateCourse(previousSavedCourse, baseCourse);
  const migratedRecoveryCourse = previousRecoveryEntry?.course && migrateCourse(previousRecoveryEntry.course, baseCourse);
  const upgradedSaved = currentSaved && upgradeNineDefaults(upgradeCourseDefaults(currentSaved, baseCourse), baseCourse);
  const upgradedRecoveryCourse = currentRecovery?.course && upgradeNineDefaults(upgradeCourseDefaults(currentRecovery.course, baseCourse), baseCourse);
  const migratedFromSeven = !!((oldSaved && migratedSaved !== oldSaved) || (oldRecovery?.course && migratedRecoveryCourse !== oldRecovery.course));
  const migratedFromEight = !!((eightSaved && migratedSaved !== eightSaved) || (eightRecovery?.course && migratedRecoveryCourse !== eightRecovery.course));
  return {
    stored: upgradedSaved || migratedSaved,
    recovery: currentRecovery ? { ...currentRecovery, course: upgradedRecoveryCourse || currentRecovery.course }
      : previousRecoveryEntry && { ...previousRecoveryEntry, course: migratedRecoveryCourse || previousRecoveryEntry.course },
    migratedFromSeven, migratedFromEight,
    upgradedDefaults: !!((currentSaved && upgradedSaved !== currentSaved) || (currentRecovery?.course && upgradedRecoveryCourse !== currentRecovery.course)),
    legacyDraft: isLegacyDraft(previous) ? previous : null,
  };
}

export function resolveLessonAlias(id) {
  return ({ tools: 'ide', frontend: 'templates', codex: 'templates' })[id] || id;
}
