import Alpine from 'alpinejs';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { validateCourse, courseMinutes, lessonMinutes, safeRead, safeWrite, COURSE_IDS } from './course.js';
import { createEditor } from './editor.js';
import { createLocalCourseSync } from './local-sync.js';
import { COURSE_STORAGE, readCourseDrafts, resolveLessonAlias } from './course-storage.js';
import { lessonIllustration, illustrationDescription, sectionIllustrationId } from './illustrations.js';
import { buildPresentationPages, getPresentation, createDemoTimer, formatDemoTime } from './presentation.js';
import { presenterState, presenterMethods, currentDemoElapsed } from './presenter.js';
import { editorAddress, parseEditorRoute, selectEditorLesson } from './editing-route.js';
import { buildLessonFlow, getRelatedSteps, lessonAddress, parseLessonRoute } from './lesson-flow.js';
import { learningState, learningMethods, prepareLearningReturn } from './learning-controller.js';
import editorHtml from './editor.html?raw';
import presentationHtml from './presentation.html?raw';
import demoHtml from './demo.html?raw';
import lessonHtml from './lesson.html?raw';
import './styles.css';
import './editor.css';
import './illustrations.css';
import './presentation.css';
import './lesson.css';

document.getElementById('editor-host').innerHTML = `<template x-if="editor && editor.working && route === 'editor'">${editorHtml}</template>`;
document.getElementById('learning-template').innerHTML = lessonHtml.replace('<!-- SHARED_DEMO -->', demoHtml);
document.getElementById('presentation-host').innerHTML = `<template x-if="course && !loading && route === 'present'">${presentationHtml.replace('<!-- SHARED_DEMO -->', demoHtml)}</template>`;
document.querySelector('.brand h1').setAttribute('x-text', 'brandTitle');
document.querySelector('.brand-kicker').setAttribute('x-text', "course ? course.author + '이 풀어주는' : '돌범이 풀어주는'");
const DRAFT_KEY = COURSE_STORAGE.draft;
const PROGRESS_KEY = COURSE_STORAGE.progress;
const LAST_KEY = COURSE_STORAGE.last;
const RECOVERY_KEY = COURSE_STORAGE.recovery;
const clone = value => JSON.parse(JSON.stringify(value));
const sameCourse = (a,b) => JSON.stringify(a) === JSON.stringify(b);
let localSync = null;
const paths = {
  chevron: '<path d="m9 5 7 7-7 7"/>', chevronLeft: '<path d="m15 5-7 7 7 7"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  home: '<path d="m3 10 9-7 9 7v10h-6v-7H9v7H3z"/>',
  book: '<path d="M12 5v16m0-16C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
  play: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m10 8 6 4-6 4z"/>',
  settings: '<path d="m10 2-.8 3-2 .9-2.8-1-2 3.4 2.2 2v2.4l-2.2 2 2 3.4 2.8-1 2 .9.8 3h4l.8-3 2-.9 2.8 1 2-3.4-2.2-2v-2.4l2.2-2-2-3.4-2.8 1-2-.9L14 2z"/><circle cx="12" cy="12" r="3"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4M3 7h18"/>',
  code: '<path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18"/>',
  layers: '<path d="m12 2 10 6-10 6L2 8zm-10 11 10 6 10-6M2 18l10 6 10-6"/>',
  files: '<path d="M3 7h7l2 3h9v11H3zM3 7V3h8l2 3h8v4"/>',
  ide: '<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8m-4-4v4m-5-12 3-3m-3 3 3 3m7-6-3 6"/>',
  frontend: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M5 5h.1m3 0h.1m3 0h.1M6 12h5v5H6zm9 0h4m-4 4h4"/>',
  backend: '<rect x="4" y="2" width="16" height="8" rx="2"/><rect x="4" y="14" width="16" height="8" rx="2"/><path d="M7 6h.1m3 0h.1M7 18h.1m3 0h.1m4-12h3m-3 12h3M12 10v4"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  git: '<circle cx="7" cy="5" r="3"/><circle cx="7" cy="19" r="3"/><circle cx="18" cy="6" r="3"/><path d="M7 8v8m11-7c0 5-11 2-11 7"/>',
  github: '<path d="M8 21c-5 1-5-3-7-3m14 5v-4c0-1-.1-2-1-3 4 0 7-2 7-6 0-2-.5-3-2-4 .5-1 .5-3 0-4-2 0-3 1-4 2-2-.5-4-.5-6 0-1-1-2-2-4-2-.5 1-.5 3 0 4-1.5 1-2 2-2 4 0 4 3 6 7 6-1 1-1 2-1 3v4"/>',
  bot: '<rect x="3" y="6" width="18" height="15" rx="4"/><path d="M12 2v4M7 11v3m10-3v3m-9 3h8M0 11v5m24-5v5"/>',
  codex: '<path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z"/>',
  sparkles: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4zM20 1v4m-2-2h4"/>',
  bulb: '<path d="M9 18h6m-5 4h4M8 15c-5-4-3-11 4-11s9 7 4 11l-1 3H9zM12 0v1M1 9h2m18 0h2M3 2l2 2m14 0 2-2"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  reset: '<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  check: '<path d="m4 12 5 5L20 6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.code}</svg>`;
function lessonObject(id) {
  const common = 'stroke="#283449" stroke-width="1.6" stroke-linejoin="round"';
  const objects = {
    terminal: '<path d="m9 18 34-9 19 12-34 11z" fill="#596c7e"/><path d="M9 18v27l19 13V32z" fill="#9cafa7"/><path d="m28 32 34-11v27L28 58z" fill="#26364f"/><path d="m34 37 6 4-6 5m11-3 10-3" fill="none" stroke="#99cfb1" stroke-width="2"/><path d="m7 48 21 14 38-12v4L28 67 7 53z" fill="#bdbea9"/>',
    tools: '<path d="m17 9 31 2 7 41-30 6z" fill="#ecdcbb"/><path d="m17 9 8 49-7 6-8-47z" fill="#babba7"/><path d="m17 9 31 2-8 7-30-1z" fill="#f9ecd4"/><path d="m24 25-5 7 8 4m12-13 7 5-4 8m-9-14-2 16" stroke="#386f75" stroke-width="2.5" fill="none"/><path d="m27 45 17-3m-16 8 17-3" stroke="#a49b84"/>',
    web: '<path d="m10 18 26-10 27 14-27 10z" fill="#aebba4"/><path d="M10 18v38l26 13V32z" fill="#dfcfad"/><path d="m36 32 27-10v37L36 69z" fill="#627a75"/><path d="m17 32 13 6v5l-13-6zm0 13 13 6v5l-13-6z" fill="#eee8d4"/><circle cx="48" cy="39" r="2" fill="#a7d2b0"/><circle cx="48" cy="51" r="2" fill="#a7d2b0"/>',
    frontend: '<path d="m6 41 31-13 29 15-31 13z" fill="#658d8b"/><path d="m6 41 29 15v6L6 47zm29 15 31-13v6L35 62z" fill="#355a68"/><path d="m6 29 31-13 29 15-31 13z" fill="#d2bb85"/><path d="m6 29 29 15v5L6 34zm29 15 31-13v5L35 49z" fill="#a69978"/><path d="m6 17 31-13 29 15-31 13z" fill="#dfe1c9"/><path d="m6 17 29 15v5L6 22zm29 15 31-13v5L35 37z" fill="#a6b99e"/>',
    git: '<path d="m31 5 29 17v31L31 70 4 53V22z" fill="#da9d77"/><path d="m31 5 29 17-29 16L4 22z" fill="#efbd92"/><path d="M31 38v32l29-17V22z" fill="#ad7861"/><path d="m17 28 12 8v19m0-15 14-8v-7" fill="none" stroke="#f9ead3" stroke-width="3"/><circle cx="17" cy="28" r="4" fill="#f9ead3"/><circle cx="29" cy="55" r="4" fill="#f9ead3"/><circle cx="43" cy="25" r="4" fill="#f9ead3"/>',
    github: '<path d="m8 25 28-13 30 15v30L37 70 8 54z" fill="#789a99"/><path d="m8 25 28-13 30 15-29 13z" fill="#c7d5c2"/><path d="M37 40v30l29-13V27z" fill="#496c74"/><path d="m20 34 16 8 17-8m-17 8v17" fill="none" stroke="#f3ecd6" stroke-width="3"/><circle cx="20" cy="34" r="4" fill="#f3ecd6"/><circle cx="53" cy="34" r="4" fill="#f3ecd6"/><circle cx="36" cy="59" r="4" fill="#f3ecd6"/><path d="m27 14 9-9 10 9m-10-9v20" stroke="#447d72" stroke-width="3"/>',
    markdown: '<path d="m15 9 31-2 12 11v43l-31 8-12-8z" fill="#ddd5b9"/><path d="m15 9 12 7v53l-12-8z" fill="#a8b7a2"/><path d="m27 16 31-9v54l-31 8z" fill="#f5ecd5"/><path d="m34 29 3-1v10l-3 1zm8-2 3-1v10l-3 1z" fill="#447b70" stroke="none"/><path d="m32 33 16-5m-16 10 16-5m-16 13 19-6m-19 13 17-5" stroke="#447b70" stroke-width="2"/>',
    codex: '<path d="m12 18 25-11 25 13v32L37 64 12 51z" fill="#8aa395"/><path d="m12 18 25 13 25-11L37 7z" fill="#c2cdb5"/><path d="M37 31v33l25-12V20z" fill="#536e6d"/><path d="m18 28 12 6v12l-12-6z" fill="#263a4d"/><path d="m44 36 11-5v12l-11 6z" fill="#263a4d"/><path d="m19 35 4 2m22 4 4-2" stroke="#b4d7b8" stroke-width="2"/><path d="M37 7V0" stroke="#283449" stroke-width="2"/><circle cx="37" cy="1" r="3" fill="#d9aa7d"/>'
  };
  const objectKey = ({ ide: 'tools', templates: 'frontend' })[id] || id;
  return `<svg viewBox="0 0 74 74" fill="none" ${common} aria-hidden="true">${objects[objectKey] || objects.tools}</svg>`;
}
function markdown(value) {
  return DOMPurify.sanitize(marked.parse(value || '', { breaks: false, gfm: true }), {
    USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'input', 'form', 'iframe', 'video', 'audio', 'img'], FORBID_ATTR: ['style'],
  });
}

Alpine.data('courseApp', () => ({
  ...presenterState(), ...presenterMethods, ...learningState(), ...learningMethods,
  loading: true, error: '', course: null, baseCourse: null, editor: null, legacyDraft: null,
  route: 'learn', lessonId: 'terminal', view: 'map', infoTab: 'case', stepIndex: 0,
  completed: [], drawer: false, readerOpen: false, toast: '', toastTimer: null, hasDraft: false,
  illustrationPaused: false, prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches, artPageVisible: !document.hidden,
  syncState: { mode: import.meta.env.DEV ? 'local' : 'browser', status: 'connecting', conflict: false, message: '' },
  infoTabs: [{id:'case',label:'사례'},{id:'concept',label:'핵심 개념'},{id:'mistakes',label:'실수'},{id:'summary',label:'정리'}],
  icon, lessonObject, lessonIllustration, illustrationDescription, sectionIllustrationId, markdown, coreMinutes: lessonMinutes,
  get lesson() { return this.course?.lessons.find(l => l.id === this.lessonId) || this.course?.lessons[0]; },
  get brandTitle() { return (this.course?.title || 'AI 구독 전 코딩 필수 노하우').replace(/^돌범이 풀어주는\s*/, ''); },
  get step() { return this.lesson?.steps[Math.min(this.stepIndex, this.lesson.steps.length - 1)]; },
  get lessonDuration() { return this.lesson ? lessonMinutes(this.lesson) : 0; },
  get totalMinutes() { return this.course ? courseMinutes(this.course) : 180; },
  get isComplete() { return this.completed.includes(this.lessonId); },
  get learningPages() { return buildLessonFlow(this.lesson); },
  get learningPageIndex() { return Math.max(0,this.learningPages.findIndex(page=>page.id === this.learningPageId)); },
  get learningPage() { return this.learningPages[this.learningPageIndex]; },
  get learningExamples() { return getRelatedSteps(this.lesson,this.learningPage); },
  get learningExampleIndex() { return Math.max(0,this.learningExamples.findIndex(example=>example.index === this.stepIndex)); },
  get learningIllustrationId() { return sectionIllustrationId(this.learningPage?.section,this.lesson.id); },
  get learningPhase() { return ({case:'시작 사례',section:'본문 설명',recap:'핵심 정리'})[this.learningPage?.kind] || ''; },
  get learningTitle() { return this.learningPage?.kind === 'case' ? this.lesson.case.title : this.learningPage?.title; },
  get learningCue() { return ({case:'먼저 이 사례를 소개하고, 다음 설명으로 이어가세요.',section:'지금은 이 본문을 설명하세요. 현재 순서와 그림도 같은 절을 가리킵니다.',recap:'핵심을 정리하고 다음 주제로 이어가세요.'})[this.learningPage?.kind] || ''; },
  get learningNextTitle() { return this.learningPages[this.learningPageIndex+1]?.title || this.course.lessons[this.course.lessons.findIndex(item=>item.id === this.lessonId)+1]?.shortTitle || '전체 강의를 마쳤습니다.'; },
  get presentationPages() { return this.lesson ? buildPresentationPages(this.lesson) : []; },
  get presentationPageIndex() { return Math.max(0, this.presentationPages.findIndex(page => page.id === this.presentationPageId)); },
  get presentationPage() { return this.presentationPages[this.presentationPageIndex]; },
  get presentationIllustrationId() { return sectionIllustrationId(this.presentationPage?.section, this.lesson.id); },
  get presentationData() { return this.lesson ? getPresentation(this.lesson) : null; },
  get presentationTimer() { return this.demoTimers[this.lessonId] || createDemoTimer(); },
  get presentationElapsed() { return formatDemoTime(currentDemoElapsed(this.demoTimers, this.lessonId, this.presentationNow)); },
  get illustrationMotionStopped() { return this.illustrationPaused || this.prefersReducedMotion || !this.artPageVisible || this.view !== 'map'; },
  get codeLines() { return (this.step?.code || '# 이 단계의 설명을 읽어 보세요.').split('\n'); },
  get sceneTitle() { return ({terminal:'Windows Terminal · PowerShell',vscode:'Visual Studio Code',pycharm:'PyCharm / Python',browser:'Browser preview',code:'Code walkthrough',git:'Git / change review',architecture:'Request & response'})[this.step?.scene] || 'Development workspace'; },
  get graphNodes() {
    const dictionary = {
      files:{id:'files',title:'PROJECT FILES',description:'작업의 시작, 폴더와 파일',icon:'files'},
      terminal:{id:'terminal',title:'TERMINAL',description:'PowerShell 같은 셸로 명령 실행',icon:'terminal'},
      ide:{id:'ide',title:'YOUR EDITOR',description:'코드를 살펴보는 작업실',icon:'ide'},
      codex:{id:'codex',title:'CODEX',description:'함께 계획하고 만드는 AI',icon:'bot'},
      git:{id:'git',title:'GIT HISTORY',description:'변경을 확인하고 기록하기',icon:'git'},
      github:{id:'github',title:'GITHUB',description:'원격 저장소와 코드 리뷰',icon:'github'},
      markdown:{id:'markdown',title:'MARKDOWN',description:'생각과 작업 규칙을 문서로',icon:'book'},
      templates:{id:'templates',title:'TEMPLATES',description:'데이터를 화면으로 바꾸기',icon:'layers'},
      frontend:{id:'frontend',title:'FRONTEND',description:'브라우저에 보이는 화면',icon:'frontend'},
      backend:{id:'backend',title:'BACKEND',description:'요청을 처리하는 서버',icon:'backend'},
      database:{id:'database',title:'DATA',description:'화면에 전달하는 데이터',icon:'database'},
    };
    let ids = ['files','codex','ide','terminal','git','github'];
    if(this.lessonId==='terminal') ids=['files','codex','ide','terminal','git','frontend'];
    if(this.lessonId==='codex') ids=['files','codex','frontend','terminal','git','github'];
    if(this.lessonId==='web') ids=['frontend','backend','database','terminal','files','ide'];
    if(this.lessonId==='templates' || this.lessonId==='frontend') ids=['files','codex','ide','templates','frontend','backend'];
    if(this.lessonId==='ide' || this.lessonId==='tools') ids=['files','ide','codex','terminal','git','github'];
    if(this.lessonId==='markdown') ids=['files','markdown','codex','ide','git','github'];
    if(this.lessonId==='github') ids=['files','github','codex','terminal','git','ide'];
    return ids.map(id=>dictionary[id]);
  },
  async init() {
    const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
    motionPreference.addEventListener('change',event=>{this.prefersReducedMotion=event.matches;});
    document.addEventListener('visibilitychange',()=>{this.artPageVisible=!document.hidden;});
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/course.json`, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`강의 데이터 응답: ${response.status}`);
      this.baseCourse = validateCourse(await response.json());
      this.course = clone(this.baseCourse);
      const {stored,recovery,legacyDraft} = readCourseDrafts(localStorage,{local:import.meta.env.DEV});
      this.legacyDraft=legacyDraft;
      if (stored) { try { this.course = validateCourse(stored); this.hasDraft = true; } catch { this.notify('저장된 편집본 형식이 달라 기본 콘텐츠로 열었습니다.'); } }
      const saved = safeRead(localStorage, PROGRESS_KEY, []);
      this.completed = Array.isArray(saved) ? [...new Set(saved.filter(id=>COURSE_IDS.includes(id)))] : [];
      this.editor = createEditor({
        getCourse:()=>clone(this.course), onApply:(data,meta)=>this.applyCourse(data,meta),
        onReset:()=>this.resetCourse(), toast:message=>this.notify(message), renderMarkdown:markdown,
        onDraft:data=>this.recordDraft(data,!!(this.editor?.isDirty || this.editor?.hasUnsaved)),
        onChange:()=>{if(this.editor?.isDirty || this.editor?.hasUnsaved)localSync?.markEdited();},
      });
      this.editor.open();
      const draft = recovery?.dirty ? recovery.course : !recovery && stored && !sameCourse(stored,this.baseCourse) ? stored : null;
      if (import.meta.env.DEV) {
        localSync = createLocalCourseSync({
          onState:state=>{ this.syncState=state; },
          isDirty:()=>!!(this.editor.isDirty || this.editor.hasUnsaved),
          onRemote:(data,meta)=>this.acceptFileCourse(data,meta),
        });
        const connected = await localSync.connect({draft,baseRevision:recovery?.baseRevision});
        if (connected.restoreDraft && draft) this.restoreWorkingDraft(draft);
        const poll = ()=>{ if(document.visibilityState!=='hidden')void localSync.poll(); };
        const pollTimer=setInterval(poll,2000);
        window.addEventListener('focus',poll);
        document.addEventListener('visibilitychange',poll);
        window.addEventListener('pagehide',()=>{clearInterval(pollTimer); if(this.editor.isDirty || this.editor.hasUnsaved)this.recordDraft(this.editor.working,true);},{once:true});
      } else {
        this.syncState={mode:'browser',status:'synced',conflict:false,message:'브라우저에 자동 저장됩니다. 공개 강의 반영은 JSON을 프로젝트에 반영한 뒤 수동 배포해 주세요.'};
        if(draft)this.restoreWorkingDraft(draft);
      }
      this.initPresentation();
      this.readRoute(true);
      this.$watch('editor.lessonId', () => this.syncEditorAddress());
      this.$watch('editor.focusId', () => this.syncEditorAddress());
      window.addEventListener('hashchange', ()=>this.readRoute());
      this.$watch('readerOpen', open=>{
        if(open && !this.$refs.reader.open) this.$refs.reader.showModal();
        else if(!open && this.$refs.reader.open) this.$refs.reader.close();
      });
      this.$watch('infoTab', ()=>this.$nextTick(()=>document.querySelector('.panel-body')?.scrollTo(0,0)));
      this.$watch('stepIndex', ()=>this.$nextTick(()=>{
        document.querySelector('.demo-content')?.scrollTo(0,0);
        document.querySelector('.step-code')?.scrollTo(0,0);
      }));
      this.loading = false;
    } catch (e) { this.error = e.message || '실행 서버와 강의 JSON을 확인해 주세요.'; this.loading=false; }
  },
  readRoute(initial=false) {
    if (this.readPresentationRoute(initial)) return;
    this.pausePresentationTimers(); this.rehearsalOpen=false; this.readerOpen=false;
    const editing = parseEditorRoute(location.hash, this.editor.working || this.course, this.editor.lessonId || this.lessonId);
    if (editing) {
      this.editor.open();
      if (this.editor.lessonId !== editing.lessonId) this.editor.selectLesson(editing.lessonId);
      this.editor.focusItem(editing.itemId);
      selectEditorLesson(this,editing.lessonId); this.route='editor'; this.drawer=false;
      this.syncEditorAddress();
      document.title='본문 편집 · 돌범의 코딩 작업실'; return;
    }
    const first = this.course.lessons[0].id;
    const last = initial ? resolveLessonAlias(safeRead(localStorage,LAST_KEY,first)) : first;
    const learning = parseLessonRoute(location.hash,this.course,last) || {lessonId:COURSE_IDS.includes(last)?last:first,pageId:'case'};
    this.selectLearningLocation(learning.lessonId,learning.pageId);
    this.route='learn'; this.infoTab='case'; this.readerOpen=false;
    document.title=`${this.lesson.shortTitle} · 돌범의 코딩 작업실`;
    safeWrite(localStorage,LAST_KEY,this.lessonId);
    const address=lessonAddress(this.lessonId,this.learningPageId);
    if(location.hash !== address)history.replaceState(null,'',address);
  },
  showLesson(id,pageId='case') {
    if(!COURSE_IDS.includes(id)) return;
    const changedTopic=this.lessonId !== id;
    this.selectLearningLocation(id,pageId); this.route='learn'; this.infoTab='case'; this.readerOpen=false;
    const address=lessonAddress(this.lessonId,this.learningPageId);
    if(location.hash !== address) location.hash=address.slice(1);
    else this.readRoute();
    safeWrite(localStorage,LAST_KEY,id);
    this.$nextTick(()=>{if(changedTopic)window.scrollTo({top:0,behavior:'instant'});else document.querySelector('.lesson-flow-heading')?.scrollIntoView({block:'start',behavior:'instant'});});
  },
  async goHome(view='map') {
    const editing=this.route === 'editor';
    if(editing && !await prepareLearningReturn(this.editor)) {
      this.notify('저장 상태를 확인한 뒤 다시 연습으로 돌아가 주세요. 입력한 내용은 편집기에 남아 있습니다.');
      return;
    }
    const page=editing ? this.editor.focusId === 'case' ? 'case' : 'section-'+this.editor.focusId : this.learningPageId;
    this.showLesson(editing ? this.editor.lessonId : this.lessonId,page); this.view=view; this.drawer=false;
    if(view === 'demo')this.showLearningDemo();
  },
  openEditor(itemId=this.route === 'learn' && this.learningPage?.kind === 'section' ? this.learningPage.section.id : this.route === 'editor' ? this.editor.focusId : 'case', id=this.lessonId) {
    if(!this.editor)return;
    this.readerOpen=false;this.editor.open();
    if(this.editor.lessonId !== id)this.editor.selectLesson(id);
    const target=this.editor.focusItem(itemId);
    selectEditorLesson(this,this.editor.lessonId);this.route='editor';this.drawer=false;
    const address=editorAddress(this.editor.lessonId,target);
    if(location.hash !== address)location.hash=address.slice(1);
    else this.syncEditorAddress();
    window.scrollTo({top:0,behavior:'instant'});
  },
  syncEditorAddress() {
    if(this.route !== 'editor' || !this.editor?.working)return;
    selectEditorLesson(this,this.editor.lessonId);
    const address=editorAddress(this.editor.lessonId,this.editor.focusId || 'case');
    if(location.hash !== address)history.replaceState(null,'',address);
  },
  focusMain() { const main=document.querySelector(this.route==='editor'?(this.editor.uiMode === 'focus' ? '.editor-focus' : '.editor-workspace'):this.route==='present'?'#presentation-main':'#lesson-main');if(main){main.tabIndex=-1;main.focus();} },
  exportLegacyDraft() {
    if(!this.legacyDraft)return;
    const blob=new Blob([JSON.stringify(this.legacyDraft,null,2)+'\n'],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download=`dolbeom-previous-six-lessons-${new Date().toISOString().slice(0,10)}.json`;
    document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    this.notify('기존 6강 초안을 JSON으로 백업했습니다. 원래 브라우저 데이터도 유지합니다.');
  },
  recordDraft(data,dirty=true) {
    if(!safeWrite(localStorage,RECOVERY_KEY,{course:clone(data),dirty,baseRevision:localSync?.revision || null,updatedAt:Date.now()})) {
      throw new Error('브라우저 초안 저장 공간이 부족합니다. JSON으로 백업해 주세요.');
    }
  },
  restoreWorkingDraft(draft) {
    try {
      if(!draft?.lessons || !Array.isArray(draft.lessons) || draft.lessons.length!==COURSE_IDS.length || !draft.lessons.every(l=>COURSE_IDS.includes(l.id)&&Array.isArray(l.sections)&&l.sections.length&&Array.isArray(l.steps)&&l.steps.length))throw Error('초안 구조');
      this.editor.restoreDraft(clone(draft));
      this.notify('보관한 브라우저 초안을 복구했습니다.');
    } catch { this.notify('복구할 초안 구조를 읽을 수 없습니다. 저장된 원본으로 열었습니다.'); }
  },
  acceptFileCourse(data,{force=false}={}) {
    const next=validateCourse(clone(data));
    const selectedStepId=this.step?.id;
    if(force)this.editor.replaceWorking(next);
    else if(!this.editor.acceptExternal(next))return false;
    this.course=next;this.baseCourse=clone(next);this.hasDraft=false;
    this.stepIndex=Math.min(this.stepIndex,this.lesson.steps.length-1);
    if(this.route === 'learn')this.reconcileLearningFlow(selectedStepId);
    safeWrite(localStorage,DRAFT_KEY,next);
    this.recordDraft(next,false);
    if(this.route==='learn')document.title=`${this.lesson.shortTitle} · 돌범의 코딩 작업실`;
    this.reconcilePresentation();
    return true;
  },
  async applyCourse(data,{source='edit'}={}) {
    const next = validateCourse(clone(data));
    const initialWorking=JSON.stringify(this.editor.working);
    if(source==='edit' || !localSync) {
      if(!safeWrite(localStorage,DRAFT_KEY,next)) throw new Error('브라우저 저장 공간이 부족합니다. 내용을 줄이거나 JSON으로 백업해 주세요.');
      const selectedStepId=this.step?.id;
      this.course=next;this.hasDraft=true;
      if(this.route === 'learn')this.reconcileLearningFlow(selectedStepId);
    }
    if(localSync) {
      const saved=await localSync.save(next);
      this.baseCourse=clone(saved.course);
      if(source==='import'){
        const selectedStepId=this.step?.id;
        this.course=next;safeWrite(localStorage,DRAFT_KEY,next);
        if(this.route === 'learn')this.reconcileLearningFlow(selectedStepId);
      }
      const latestWorking=this.editor.working;
      const newer=JSON.stringify(latestWorking)!==initialWorking && !sameCourse(latestWorking,next);
      this.recordDraft(newer?latestWorking:next,newer);
      this.hasDraft=newer;
    } else this.recordDraft(next,false);
    this.stepIndex=Math.min(this.stepIndex,this.lesson.steps.length-1);
    if(this.route === 'learn')this.reconcileLearningFlow();
    if(this.route==='learn')document.title=`${this.lesson.shortTitle} · 돌범의 코딩 작업실`;
    this.reconcilePresentation();
  },
  async resetCourse() {
    if(localSync){await localSync.useFileVersion();return;}
    const selectedStepId=this.step?.id;
    localStorage.removeItem(DRAFT_KEY);localStorage.removeItem(RECOVERY_KEY);this.course=clone(this.baseCourse);this.hasDraft=false;this.stepIndex=0;
    if(this.route === 'learn')this.reconcileLearningFlow(selectedStepId);
  },
  async useFileVersion() {
    if(!localSync || this.editor.busy)return;
    this.editor.beginFileOperation();
    try{await localSync.useFileVersion();this.notify('최신 프로젝트 파일을 불러왔습니다.');}
    catch(error){this.notify(error.message);}
    finally{this.editor.busy=false;}
  },
  async keepBrowserVersion() {
    if(!localSync || this.editor.busy)return;
    this.editor.beginFileOperation();
    try{
      const data=validateCourse(clone(this.editor.working));
      const saved=await localSync.keepBrowserVersion(data);
      this.baseCourse=clone(saved.course);
      if(sameCourse(this.editor.working,data)){
        const selectedStepId=this.step?.id;
        this.course=clone(data);
        if(this.route === 'learn')this.reconcileLearningFlow(selectedStepId);
      }
      safeWrite(localStorage,DRAFT_KEY,data);
      this.editor.acknowledge(data);
      this.recordDraft(this.editor.working,this.editor.isDirty);
      this.hasDraft=this.editor.isDirty;
      this.notify('편집본을 프로젝트 파일에 저장했습니다. 이전 파일은 백업했습니다.');
    }catch(error){this.notify(error.message);}
    finally{this.editor.busy=false;}
  },
  async retrySync() {
    if(!localSync)return;
    await localSync.poll();
    if(!localSync.hasConflict)await this.editor.save(true);
  },
  notify(message) { clearTimeout(this.toastTimer); this.toast=message; this.toastTimer=setTimeout(()=>{this.toast='';},4200); },
  nextStep() { if(this.route === 'learn')this.moveLearningExample(1);else if(this.stepIndex<this.lesson.steps.length-1)this.stepIndex++; },
  prevStep() { if(this.route === 'learn')this.moveLearningExample(-1);else if(this.stepIndex>0)this.stepIndex--; },
  focusNode(id) { const index=this.lesson.steps.findIndex(s=>s.focus===id);if(index>=0)this.stepIndex=index;else this.notify(this.graphNodes.find(n=>n.id===id)?.description || '개념을 연결해서 살펴보세요.'); },
  browserPreview() {
    const address='<div class="address-bar">⌕ &nbsp; 로컬 미리보기 / dolbeom-notes</div>';
    const heading='<span class="eyebrow">MY FIRST PROJECT</span><h3>돌범의 강의노트</h3>';
    const gitCard='<div><span>02</span><b>Git</b><small>25분 · 변경을 기록하기</small></div>';
    const githubCard='<div><span>03</span><b>GitHub</b><small>20분 · 원격에서 함께 검토하기</small></div>';
    const terminalCard='<div><span>01</span><b>윈도우 터미널</b><small>25분 · 현재 위치부터 확인하기</small></div>';
    const id=this.step.id;
    if(this.lessonId==='github') {
      if(id==='github-01')return '<div class="address-bar">가상 GitHub / example-owner / sample-project</div><div class="sample-page"><span class="eyebrow">REPOSITORY · 재현 화면</span><h3>sample-project</h3><div class="sample-review">Code → HTTPS 복제 주소<br>src/ · tests/ · README.md</div><p>README: 프로젝트 소개 · 실행 방법 · 라이선스</p><p class="sample-state">브라우저에서 개요 확인 → git clone → Codex에 분석 요청</p></div>';
      if(id==='github-05')return '<div class="address-bar">가상 GitHub / example-user</div><div class="sample-page"><span class="eyebrow">PROFILE · 재현 화면</span><h3>안녕하세요, 돌범입니다.</h3><p>프로필 README로 관심 분야와 프로젝트를 소개합니다.</p><div class="sample-review">Pinned repositories<br>① 강의노트 · ② 학습 프로젝트</div><p class="sample-state">계정명과 같은 이름의 공개 저장소 + 루트 README.md</p></div>';
      if(id==='github-06')return '<div class="address-bar">예시 주소 / example-user.github.io / lecture-notes /</div><div class="sample-page"><span class="eyebrow">GITHUB PAGES · 재현 화면</span><h3>돌범의 강의노트</h3><p>HTML · CSS · JavaScript로 제공하는 정적 사이트입니다.</p><div class="sample-review">소스: GitHub 저장소에서 코드 확인<br>사이트: Pages 주소로 강의 열기</div><p class="sample-state">Python·FastAPI 서버는 Pages에서 실행하지 않습니다.</p></div>';
      return '<div class="address-bar">가상 GitHub / dolbeom-notes / pull/12</div><div class="sample-page"><span class="eyebrow">PULL REQUEST · 재현 화면</span><h3>README 실행 안내 보완</h3><span class="sample-pr-state">OPEN</span><p>docs/readme-guide → 기본 브랜치</p><div class="sample-review">Files changed에서 변경 비교<br>검토 의견 → 확인 → 병합</div><p class="sample-state">PR은 GitHub의 변경 검토·병합 제안 기능입니다.</p></div>';
    }
    if(id==='web-04')return address+'<div class="sample-page"><span class="eyebrow">STATIC FILE / JSON RESPONSE</span><h3>GET /data/course.json</h3><div class="sample-response"><span>200 OK · application/json</span><pre>{ "lessons": [<br>  { "id": "git", "title": "Git", "minutes": 25 }<br>] }</pre></div><p class="sample-state">정적 JSON 파일 → 브라우저 JavaScript → 강의 카드 표시</p></div>';
    if(this.lessonId==='web' && ['web-02','web-11'].includes(id))return '<div class="address-bar">예시 로컬 서버 / 127.0.0.1:8000 / lessons</div><div class="sample-page"><span class="eyebrow">HTML RESPONSE · 재현 화면</span><h3>강의 목록</h3><div class="sample-cards">'+terminalCard+gitCard+'</div><p class="sample-state">GET /lessons → 200 OK · text/html<br>Response의 제목과 Elements의 현재 DOM을 대조합니다.</p></div>';
    if(this.lessonId==='markdown') {
      if(id==='tools-10')return '<div class="address-bar">가상 GitHub / dolbeom-study</div><div class="sample-page"><span class="eyebrow">PROFILE README · 재현 화면</span><h3>돌범의 학습 기록</h3><p>Codex로 개발하며 배운 내용을 정리합니다.</p><div class="sample-review">① 사용자명 = 저장소명<br>② 공개 저장소<br>③ 루트 README.md<br>④ 파일에 내용 작성</div><p class="sample-state">프로젝트 README와 프로필 README의 표시 조건을 구분합니다.</p></div>';
      return address+'<div class="sample-page"><span class="eyebrow">README.MD / RENDERED PREVIEW</span><h3>돌범의 강의노트</h3><p>실행 방법과 작업 규칙을 문서로 남깁니다.</p><div class="sample-review">① 현재 프로젝트 폴더 확인<br>② npm install<br>③ npm run dev</div></div>';
    }
    if(this.lessonId==='templates' || this.lessonId==='frontend') {
      if(id==='frontend-03')return address+'<div class="sample-page">'+heading+'<div class="sample-cards sample-single sample-padding-comparison"><div><span>p-4 → p-6</span><b>Git</b><small>25분 · 변경을 기록하기</small></div></div><p class="sample-state">기본 테마의 padding: 1rem → 1.5rem<br>같은 카드에서 안쪽 여백을 비교합니다.</p></div>';
      if(id==='frontend-07')return address+'<div class="sample-page"><span class="eyebrow">SERVER TITLE + BROWSER STATE</span><h3>Git</h3><div class="sample-binding"><small>x-data: open = false</small><strong>접힘</strong><span>x-text가 현재 펼침 상태를 표시합니다.</span></div><p class="sample-state">제목: Jinja2의 서버 값 · 접힘: Alpine의 브라우저 값</p></div>';
      if(id==='frontend-08')return address+'<div class="sample-page">'+heading+'<div class="sample-cards sample-single">'+gitCard+'</div><div class="sample-toggle-button">설명 보기 · 펼침 상태 ▴</div><div class="sample-expanded">변경을 읽고 기록합니다.</div><p class="sample-state">클릭 후: open = true · aria-expanded = true · 설명 표시</p></div>';
      if(id==='frontend-10')return address+'<div class="sample-page"><span class="eyebrow">CARD STATE CHECK · 재현 화면</span><h3>강의 목록</h3><div class="sample-cards">'+terminalCard+gitCard+'</div><div class="sample-expanded">Git만 펼침 · 변경을 읽고 기록합니다.</div><p class="sample-state">카드 상태 독립 · Enter/Space · 다시 접기 확인<br>새로고침 → 두 카드 모두 초기 접힘</p></div>';
    }
    if(this.lessonId==='codex' || id.startsWith('codex-'))return address+'<div class="sample-page">'+heading+'<div class="sample-search">⌕ &nbsp; git <span>공백·대소문자 검증</span></div><div class="sample-cards">'+gitCard+githubCard+'</div><p class="sample-state">전체 7강 중 2개 · Git · git · 공백 포함 검색어 → 같은 결과 확인</p></div>';
    return address+'<div class="sample-page">'+heading+'<p>AI와 만든 작은 강의 카드 목록입니다.</p><div class="sample-cards">'+terminalCard+gitCard+'</div><p class="sample-state">'+(id==='frontend-04'?'grid-cols-1 → md:grid-cols-2 · 부모의 배치 규칙':'화면·주소·데이터를 함께 확인합니다.')+'</p></div>';
  },
  nextInfoTab(delta,event) {const index=this.infoTabs.findIndex(t=>t.id===this.infoTab);this.infoTab=this.infoTabs[(index+delta+this.infoTabs.length)%this.infoTabs.length].id;this.$nextTick(()=>document.getElementById('info-tab-'+this.infoTab)?.focus());},
  toggleComplete() { this.completed=this.isComplete?this.completed.filter(id=>id!==this.lessonId):[...this.completed,this.lessonId];if(!safeWrite(localStorage,PROGRESS_KEY,this.completed))this.notify('학습 표시를 저장하지 못했습니다.');else this.notify(this.isComplete?'한 걸음 더 배웠습니다. 학습 완료!':'학습 완료 표시를 취소했습니다.'); },
  async copyStep() {
    const text=this.step.code || this.step.description;
    try {await navigator.clipboard.writeText(text);this.notify('현재 단계의 코드를 복사했습니다.');}catch {this.notify('복사 권한을 확인하거나 시연 화면의 텍스트를 선택해 주세요.');}
  },
  openSection(id) {this.readerOpen=true;this.$nextTick(()=>setTimeout(()=>this.scrollReader('section-'+id),50));},
  scrollReader(id) {document.getElementById(id)?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},
}));

Alpine.start();
