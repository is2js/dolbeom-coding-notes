import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEditorRoute } from '../src/editing-route.js';
import { parsePresentationRoute } from '../src/presentation.js';

test('old IDE editor and presentation links follow moved sections without stealing existing drafts', () => {
  const section = { id: 'tools-html', title: 'HTML', optional: false };
  const course = { lessons: [
    { id: 'ide', sections: [{ id: 'other', optional: false }] },
    { id: 'web-coding', sections: [section] },
  ] };
  assert.deepEqual(parseEditorRoute('#/editor/ide/tools-html', course), { lessonId: 'web-coding', itemId: 'tools-html' });
  assert.deepEqual(parsePresentationRoute('#/present/ide/section-tools-html', course), { lessonId: 'web-coding', pageId: 'section-tools-html' });
  course.lessons[0].sections.push(section);
  assert.deepEqual(parseEditorRoute('#/editor/ide/tools-html', course), { lessonId: 'ide', itemId: 'tools-html' });
  assert.deepEqual(parsePresentationRoute('#/present/ide/section-tools-html', course), { lessonId: 'ide', pageId: 'section-tools-html' });
});

test('old Tailwind and Alpine links follow moved sections unless the source still owns them', () => {
  const section = { id: 'frontend-css', title: 'Tailwind', optional: false };
  const course = { lessons: [
    { id: 'templates', sections: [{ id: 'web-jinja', optional: false }] },
    { id: 'web-tools', sections: [section] },
  ] };
  assert.deepEqual(parseEditorRoute('#/editor/templates/frontend-css', course), { lessonId: 'web-tools', itemId: 'frontend-css' });
  assert.deepEqual(parsePresentationRoute('#/present/templates/section-frontend-css', course), { lessonId: 'web-tools', pageId: 'section-frontend-css' });
  course.lessons[0].sections.push(section);
  assert.deepEqual(parseEditorRoute('#/editor/templates/frontend-css', course), { lessonId: 'templates', itemId: 'frontend-css' });
});
