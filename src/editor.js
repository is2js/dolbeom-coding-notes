import { validateCourse } from './course.js';

const clone = (value) => JSON.parse(JSON.stringify(value));
const uid = (prefix) => `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
const sourceExcerpt = (value, maxLength, fallback) => {
  const text = String(value || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/(^|\n)\s*(?:#{1,6}\s+|[-*+]\s+|>\s*|\d+\.\s+)/g, '$1')
    .replace(/[`*_~]/g, '')
    .split(/\n+/).map(line => line.trim()).find(Boolean) || String(fallback || '').trim();
  return text.split(/(?<=[.!?。])\s+/)[0].slice(0, maxLength).trim();
};
const demoPrograms = { terminal: 'Windows 터미널 · PowerShell', vscode: 'VS Code', pycharm: 'PyCharm', browser: '웹 브라우저', code: 'VS Code', git: 'Git · GitHub', architecture: '웹 브라우저' };

export function createEditor({ getCourse, onApply, onReset, toast, renderMarkdown, onDraft, onChange }) {
  let timer;
  let revision = 0;
  let generation = 0;
  let acknowledgedRevision = 0;

  return {
    working: null,
    lessonId: 'terminal',
    uiMode: 'focus',
    focusId: 'case',
    tab: 'overview',
    sectionId: '',
    stepId: '',
    previewSectionId: '',
    status: 'saved',
    error: '',
    importError: '',
    lastSaved: '',
    resetConfirm: false,
    busy: false,
    fileDrafts: {},
    acknowledgedSnapshot: '',

    get activeLesson() {
      return this.working?.lessons.find((lesson) => lesson.id === this.lessonId) || this.working?.lessons[0];
    },
    get focusedSection() {
      return this.activeLesson?.sections.find((section) => section.id === this.focusId) || null;
    },
    get focusItems() {
      return ['case', ...(this.activeLesson?.sections || []).map(section => section.id)];
    },
    get focusIndex() {
      return Math.max(0, this.focusItems.indexOf(this.focusId));
    },
    get isDirty() {
      return this.working !== null && JSON.stringify(this.working) !== this.acknowledgedSnapshot;
    },
    get hasUnsaved() {
      return this.status === 'pending' || this.status === 'error';
    },
    get coreMinutes() {
      return (this.working?.lessons || []).reduce((sum, lesson) => sum + this.lessonMinutes(lesson), 0);
    },
    get bonusMinutes() {
      return (this.working?.lessons || []).reduce((sum, lesson) => sum + lesson.sections.reduce((minutes, section) => minutes + (section.optional ? Number(section.minutes) || 0 : 0), 0), 0);
    },
    get statusText() {
      if (this.busy) return '파일 처리 중';
      if (this.status === 'error') return '저장되지 않은 수정 사항이 있습니다';
      if (this.status === 'pending') return '변경 사항 저장 중…';
      return this.lastSaved ? `${this.lastSaved} 변경 내용 저장됨` : '저장된 강의를 편집하고 있습니다';
    },
    lessonMinutes(lesson) {
      return (lesson?.sections || []).reduce((sum, section) => sum + (!section.optional ? Number(section.minutes) || 0 : 0), 0);
    },
    open(force = false) {
      if (this.working && !force) return;
      this.replaceWorking(getCourse());
    },
    replaceWorking(course) {
      clearTimeout(timer);
      revision += 1;
      generation += 1;
      acknowledgedRevision = revision;
      this.working = clone(course);
      this.acknowledgedSnapshot = JSON.stringify(this.working);
      if (!this.working.lessons.some((lesson) => lesson.id === this.lessonId)) this.lessonId = this.working.lessons[0].id;
      if (!this.activeLesson.sections.some(section => section.id === this.sectionId)) this.sectionId = this.activeLesson.sections[0]?.id || '';
      if (!this.activeLesson.steps.some(step => step.id === this.stepId)) this.stepId = this.activeLesson.steps[0]?.id || '';
      if (!this.activeLesson.sections.some(section => section.id === this.previewSectionId)) this.previewSectionId = '';
      this.normalizeFocus();
      this.fileDrafts = {};
      this.error = '';
      this.importError = '';
      this.status = 'saved';
      this.resetConfirm = false;
      return true;
    },
    acceptExternal(course) {
      if (this.isDirty || this.hasUnsaved || this.busy) return false;
      return this.replaceWorking(course);
    },
    acknowledge(course) {
      const snapshot = JSON.stringify(course);
      this.acknowledgedSnapshot = snapshot;
      acknowledgedRevision = revision;
      if (this.working === null || JSON.stringify(this.working) === snapshot) {
        clearTimeout(timer);
        this.status = 'saved';
        this.error = '';
        this.lastSaved = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
        return true;
      }
      // Acknowledging an earlier snapshot must leave the current draft and its timer intact.
      this.status = 'pending';
      return false;
    },
    restoreDraft(course) {
      const savedSnapshot = JSON.stringify(getCourse());
      this.replaceWorking(course);
      this.acknowledgedSnapshot = savedSnapshot;
      this.changed();
    },
    captureDraft() {
      onDraft?.(clone(this.working), { revision });
      onChange?.();
    },
    beginFileOperation() {
      if (this.busy) return false;
      clearTimeout(timer);
      this.busy = true;
      this.resetConfirm = false;
      return true;
    },
    selectLesson(id) {
      if (!this.working?.lessons.some(lesson => lesson.id === id)) return false;
      this.lessonId = id;
      this.focusId = 'case';
      this.sectionId = this.activeLesson.sections[0]?.id || '';
      this.stepId = this.activeLesson.steps[0]?.id || '';
      this.previewSectionId = '';
      this.resetConfirm = false;
      return true;
    },
    normalizeFocus() {
      if (this.focusId !== 'case' && !this.focusedSection) this.focusId = 'case';
      return this.focusId;
    },
    focusItem(id = 'case') {
      this.focusId = id === 'case' || this.activeLesson?.sections.some(section => section.id === id) ? id : 'case';
      if (this.focusId !== 'case') this.sectionId = this.focusId;
      this.uiMode = 'focus';
      this.resetConfirm = false;
      return this.focusId;
    },
    setMode(mode = 'focus') {
      this.uiMode = mode === 'details' ? 'details' : 'focus';
      this.normalizeFocus();
      this.resetConfirm = false;
      return this.uiMode;
    },
    moveFocus(delta) {
      const next = this.focusIndex + delta;
      if (!Number.isInteger(next) || next < 0 || next >= this.focusItems.length) return this.focusId;
      return this.focusItem(this.focusItems[next]);
    },
    changed() {
      revision += 1;
      this.status = 'pending';
      this.resetConfirm = false;
      clearTimeout(timer);
      try {
        // Recovery must include unfinished or invalid input, before validation/debounce.
        this.captureDraft();
      } catch (error) {
        this.status = 'error';
        this.error = error instanceof Error ? error.message : '수정 중인 내용을 임시 저장할 수 없습니다.';
      }
      timer = setTimeout(() => { void this.save(); }, 650);
    },
    async save(announce = false) {
      clearTimeout(timer);
      const savingRevision = revision;
      const savingGeneration = generation;
      this.status = 'pending';
      try {
        this.captureDraft();
        const next = validateCourse(clone(this.working));
        const savingSnapshot = JSON.stringify(next);
        await onApply(next, { source: 'edit', revision: savingRevision });
        if (savingGeneration === generation && savingRevision >= acknowledgedRevision) {
          acknowledgedRevision = savingRevision;
          this.acknowledgedSnapshot = savingSnapshot;
          if (savingRevision === revision && JSON.stringify(this.working) === savingSnapshot) {
            this.status = 'saved';
            this.error = '';
            this.lastSaved = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
          }
        }
        if (announce && savingGeneration === generation && savingRevision === revision && !this.isDirty) toast('변경 내용을 저장했습니다.');
        return true;
      } catch (error) {
        if (savingGeneration === generation && savingRevision === revision) {
          this.status = 'error';
          this.error = error instanceof Error ? error.message : '변경 사항을 저장할 수 없습니다. 입력 내용을 확인해 주세요.';
        }
        return false;
      }
    },
    addSection() {
      const section = { id: uid('section'), title: '새 본문', minutes: 5, optional: true, body: '## 새 설명\n\n강의 내용을 작성해 주세요.' };
      this.activeLesson.sections.push(section);
      this.sectionId = section.id;
      this.focusId = section.id;
      this.changed();
    },
    removeSection(index) {
      if (this.activeLesson.sections.length <= 1) return;
      this.activeLesson.sections.splice(index, 1);
      this.sectionId = this.activeLesson.sections[Math.min(index, this.activeLesson.sections.length - 1)].id;
      this.normalizeFocus();
      this.changed();
    },
    addStep() {
      const step = { id: uid('step'), title: '새 시연 단계', description: '이 단계에서 확인할 내용을 적어 주세요.', scene: 'code', code: '', language: 'html', output: '', focus: '', fileName: 'example.html', files: [] };
      this.activeLesson.steps.push(step);
      this.stepId = step.id;
      this.changed();
    },
    removeStep(index) {
      if (this.activeLesson.steps.length <= 1) return;
      this.activeLesson.steps.splice(index, 1);
      this.stepId = this.activeLesson.steps[Math.min(index, this.activeLesson.steps.length - 1)].id;
      this.changed();
    },
    move(items, index, delta) {
      const destination = index + delta;
      if (!Number.isInteger(index) || !Number.isInteger(destination) || index < 0 || index >= items.length || destination < 0 || destination >= items.length) return;
      const [item] = items.splice(index, 1);
      items.splice(destination, 0, item);
      this.changed();
    },
    moveLesson(index, delta) {
      const lessons = this.working.lessons;
      const destination = index + delta;
      if (!Number.isInteger(index) || !Number.isInteger(destination) || index < 0 || index >= lessons.length || destination < 0 || destination >= lessons.length) return;
      const [lesson] = lessons.splice(index, 1);
      lessons.splice(destination, 0, lesson);
      lessons.forEach((item, position) => { item.number = position + 1; });
      this.changed();
    },
    preparePresentation() {
      if (this.activeLesson.presentation !== undefined) return;
      const lesson = this.activeLesson;
      const firstStep = lesson.steps[0];
      lesson.presentation = {
        caseSummary: sourceExcerpt(lesson.case.body, 300, lesson.case.title || '오늘의 개발 사례를 소개합니다.'),
        demo: {
          program: demoPrograms[firstStep?.scene] || 'VS Code',
          file: String(firstStep?.fileName || '').slice(0, 160),
          command: String(firstStep?.code || '').slice(0, 4000),
          expectedResult: sourceExcerpt(firstStep?.output, 300, firstStep?.description || '진행한 작업의 결과를 확인합니다.'),
          durationMinutes: 5,
        },
        returnSummary: sourceExcerpt(lesson.closing, 240, lesson.case.question || '오늘의 핵심을 정리합니다.'),
      };
      for (const section of lesson.sections) {
        if (section.presentationPoints === undefined) section.presentationPoints = [this.sectionPointDefault(section)];
      }
      this.changed();
    },
    removePresentation() {
      delete this.activeLesson.presentation;
      for (const section of this.activeLesson.sections) delete section.presentationPoints;
      this.changed();
    },
    sectionPointDefault(section) {
      return sourceExcerpt(section.body, 80, section.title || '이 절의 핵심 개념을 설명합니다.');
    },
    prepareSectionPoints(section) {
      if (section.presentationPoints !== undefined) return;
      section.presentationPoints = [this.sectionPointDefault(section)];
      this.changed();
    },
    addPresentationPoint(section) {
      if (section.presentationPoints === undefined) return this.prepareSectionPoints(section);
      if (section.presentationPoints.length >= 3) return;
      section.presentationPoints.push('');
      this.changed();
    },
    removePresentationPoint(section, index) {
      if (!Array.isArray(section.presentationPoints) || index < 0 || index >= section.presentationPoints.length) return;
      section.presentationPoints.splice(index, 1);
      if (section.presentationPoints.length === 0) delete section.presentationPoints;
      this.changed();
    },
    clearSectionPoints(section) {
      if (section.presentationPoints === undefined) return;
      delete section.presentationPoints;
      this.changed();
    },
    setFiles(step, value) {
      // Keep the in-progress textarea separately so a new line is not lost on render.
      this.fileDrafts[`${this.lessonId}:${step.id}`] = value;
      step.files = value.split('\n').map((name) => name.trim()).filter(Boolean);
      this.changed();
    },
    filesValue(step) {
      return this.fileDrafts[`${this.lessonId}:${step.id}`] ?? step.files.join('\n');
    },
    preview(markdown) {
      return renderMarkdown(markdown || '');
    },
    async exportFile() {
      let next;
      let recoveryError = '';
      try {
        this.captureDraft();
      } catch (error) {
        recoveryError = error instanceof Error ? error.message : '브라우저 초안을 임시 저장할 수 없습니다.';
        this.error = recoveryError;
        this.status = 'error';
      }
      try {
        next = validateCourse(clone(this.working));
      } catch (error) {
        this.error = error instanceof Error ? error.message : '입력 내용을 확인해 주세요.';
        this.status = 'error';
        toast('먼저 입력 오류를 수정한 후 내보내 주세요.');
        return;
      }
      const blob = new Blob([`${JSON.stringify(next, null, 2)}\n`], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dolbeom-course-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(recoveryError ? '브라우저 임시 저장은 실패했지만 JSON 백업 파일을 내려받았습니다.' : '전체 강의를 JSON 파일로 내보냈습니다.');
    },
    async importFile(event) {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) return;
      if (this.busy) { input.value = ''; return; }
      const importRevision = revision;
      const importGeneration = generation;
      this.importError = '';
      this.beginFileOperation();
      try {
        if (file.size > 5 * 1024 * 1024) throw new Error('5MB 이하의 강의 JSON 파일을 선택해 주세요.');
        let parsed;
        try { parsed = JSON.parse(await file.text()); }
        catch { throw new Error('JSON 문법을 읽을 수 없습니다. 내보낸 강의 JSON 파일인지 확인해 주세요.'); }
        const next = validateCourse(parsed);
        // Do not replace the editor's current draft until validation and persistence succeed.
        await onApply(clone(next), { source: 'import' });
        if (importGeneration !== generation) return;
        if (importRevision !== revision) {
          this.acknowledge(next);
          toast('강의 파일을 가져왔습니다. 가져오는 동안 새로 작성한 편집 내용도 유지했습니다.');
        } else {
          this.replaceWorking(next);
          this.lastSaved = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
          toast('전체 강의를 가져왔습니다. 학습 화면에도 반영되었습니다.');
        }
      } catch (error) {
        this.importError = error instanceof Error ? error.message : '파일을 가져올 수 없습니다.';
        if (this.status === 'pending') timer = setTimeout(() => { void this.save(); }, 650);
      } finally {
        this.busy = false;
        input.value = '';
      }
    },
    async reset() {
      if (this.busy) return;
      if (!this.resetConfirm) { this.resetConfirm = true; return; }
      this.beginFileOperation();
      try {
        await onReset();
        this.open(true);
        this.lastSaved = '';
        toast('강의 원본을 다시 불러왔습니다.');
      } catch (error) {
        this.error = error instanceof Error ? error.message : '기본 콘텐츠를 복원할 수 없습니다.';
        this.status = 'error';
      } finally { this.busy = false; }
    },
  };
}
