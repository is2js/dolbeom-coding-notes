import { resolveLessonAlias } from './course-storage.js';

// Relationships are authored by stable IDs. Titles and array positions are editable.
// An unrecognized section deliberately has no suggested demonstration.
const relatedStepIds = {
  terminal: {
    'terminal-example': ['terminal-01', 'terminal-02', 'terminal-03'],
    'terminal-gui-cli': ['terminal-04', 'codex-02'],
    'terminal-host-shell': ['terminal-05'],
    'terminal-shortcuts': ['terminal-06', 'terminal-07', 'terminal-08'],
  },
  git: {
    'git-example': ['git-01', 'git-02', 'git-03'],
    'git-why': ['git-04'],
    'git-prompt': ['git-05', 'git-06', 'git-07', 'git-08', 'codex-09'],
  },
  github: {
    'github-clone': ['github-01', 'git-09', 'github-02', 'github-03', 'git-10'],
    'github-roles': ['github-04', 'github-05', 'github-06', 'git-12'],
  },
  markdown: {
    'markdown-map': ['codex-01'],
    'tools-markdown': ['tools-08', 'tools-10'],
    'markdown-code': ['tools-09', 'codex-03', 'codex-08'],
  },
  ide: {
    'tools-map': ['tools-04'],
    'tools-vscode': ['tools-01', 'tools-02', 'tools-03'],
    'tools-pycharm': ['tools-06', 'ide-keymap', 'tools-07'],
    'codex-context': ['tools-05'],
  },
  web: {
    'web-map': ['web-01', 'web-server-process'],
    'web-http': ['web-02', 'web-05', 'web-09', 'web-10', 'web-04'],
    'web-html': ['web-ssr-handler', 'web-ssr-template', 'web-08', 'web-11'],
  },
  templates: {
    'web-jinja': ['web-06', 'web-07', 'frontend-01'],
    'frontend-css': ['web-03', 'frontend-02', 'frontend-03', 'frontend-04', 'frontend-05', 'frontend-06'],
    'frontend-alpine': ['frontend-07', 'frontend-08', 'frontend-09', 'codex-04', 'frontend-10', 'codex-10'],
  },
};

export function buildLessonFlow(lesson) {
  if (!lesson) return [];
  return [
    { id: 'case', kind: 'case', title: '시작 사례' },
    ...(lesson.sections || []).filter(section => !section.optional).map(section => ({
      id: `section-${section.id}`, kind: 'section', title: section.title, section,
    })),
    { id: 'recap', kind: 'recap', title: '핵심 정리' },
  ];
}

export function lessonAddress(id, page = 'case') {
  return `#/lesson/${encodeURIComponent(id)}/${encodeURIComponent(page || 'case')}`;
}

export function parseLessonRoute(hash, course, fallbackLessonId) {
  if (typeof hash !== 'string' || !/^#\/lesson(?:\/|$)/.test(hash)) return null;
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  // Invalid extra segments reset the page, while a valid topic can still be kept.
  const route = hash.match(/^#\/lesson(?:\/([a-z0-9_-]+)(?:\/([a-z0-9_-]+))?)?$/);
  const requestedId = route?.[1] || hash.match(/^#\/lesson\/([a-z0-9_-]+)(?:\/|$)/)?.[1];
  const requestedLesson = lessons.find(lesson => lesson.id === resolveLessonAlias(requestedId));
  const lesson = requestedLesson
    || lessons.find(item => item.id === resolveLessonAlias(fallbackLessonId)) || lessons[0];
  if (!lesson) return null;
  const requestedPage = requestedLesson ? route?.[2] : undefined;
  const pageId = buildLessonFlow(lesson).some(page => page.id === requestedPage) ? requestedPage : 'case';
  return { lessonId: lesson.id, pageId };
}

export function getRelatedSteps(lesson, page) {
  if (!lesson || (typeof page !== 'string' && page?.kind !== 'section')) return [];
  const pageId = typeof page === 'string' ? page : page.id;
  const section = (lesson.sections || []).find(item => !item.optional && `section-${item.id}` === pageId);
  if (!section) return [];
  const ids = relatedStepIds[lesson.id]?.[section.id];
  if (!Array.isArray(ids)) return [];
  const related = new Set(ids);
  // Respect the author's current demonstration order, and return its actual indices.
  return (lesson.steps || []).flatMap((step, index) => related.has(step.id) ? [{ step, index }] : []);
}
