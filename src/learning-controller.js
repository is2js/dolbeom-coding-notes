import { buildLessonFlow, getRelatedSteps } from './lesson-flow.js';

export function learningState() { return { learningPageId: 'case' }; }

export async function prepareLearningReturn(editor) {
  if (editor.busy) return false;
  if ((editor.isDirty || editor.hasUnsaved) && !await editor.save()) return false;
  return !editor.isDirty && !editor.hasUnsaved;
}

export const learningMethods = {
  selectLearningLocation(lessonId, pageId = 'case') {
    const lesson = this.course.lessons.find(item => item.id === lessonId) || this.course.lessons[0];
    const pages = buildLessonFlow(lesson);
    const page = pages.find(item => item.id === pageId) || pages[0];
    const changed = this.lessonId !== lesson.id || this.learningPageId !== page.id;
    this.lessonId = lesson.id;
    this.learningPageId = page.id;
    const examples = getRelatedSteps(lesson, page);
    if (changed || (examples.length && !examples.some(item => item.index === this.stepIndex))) {
      this.stepIndex = examples[0]?.index || 0;
      if (changed) this.view = 'map';
    }
    if (!examples.length) this.view = 'map';
    if (changed) this.$nextTick?.(() => globalThis.document?.querySelector('.lesson-current-prose')?.scrollTo(0, 0));
    return page;
  },
  reconcileLearningFlow(selectedStepId) {
    // An external edit may remove or reorder the selected section or its examples.
    const page = this.selectLearningLocation(this.lessonId, this.learningPageId);
    const selected = getRelatedSteps(this.lesson, page).find(({ step }) => step.id === selectedStepId);
    if (selected) this.stepIndex = selected.index;
    return page;
  },
  goLearningPage(pageId) { this.showLesson(this.lessonId, pageId); },
  moveLearningPage(delta) {
    const pages = buildLessonFlow(this.lesson);
    const current = pages.findIndex(page => page.id === this.learningPageId);
    if (pages[current + delta]) this.goLearningPage(pages[current + delta].id);
    else {
      const topic = this.course.lessons.findIndex(item => item.id === this.lessonId);
      const next = this.course.lessons[topic + (delta > 0 ? 1 : -1)];
      if (next) this.showLesson(next.id, delta > 0 ? 'case' : 'recap');
    }
  },
  showLearningDemo() {
    if (!getRelatedSteps(this.lesson, this.learningPageId).length) {
      const first = buildLessonFlow(this.lesson).find(page => page.kind === 'section' && getRelatedSteps(this.lesson, page).length);
      if (!first) return;
      this.goLearningPage(first.id);
    }
    this.view = 'demo';
  },
  moveLearningExample(delta) {
    const examples = getRelatedSteps(this.lesson, this.learningPageId);
    const current = Math.max(0, examples.findIndex(item => item.index === this.stepIndex));
    if (examples[current + delta]) this.stepIndex = examples[current + delta].index;
  },
};
