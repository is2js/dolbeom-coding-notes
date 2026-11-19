import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { upgradeNineDefaults } from '../src/course-storage.js';
import { previousBackendPreview } from '../src/previous-backend-preview-default.js';

const latest = JSON.parse(fs.readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
const clone = value => structuredClone(value);
const topic = (course, id) => course.lessons.find(lesson => lesson.id === id);

test('existing drafts receive the frontend closing lessons while preserving authored content and the future backend', () => {
  const draft = clone(latest);
  for (const prior of previousBackendPreview) {
    const index = draft.lessons.findIndex(lesson => lesson.id === prior.id);
    draft.lessons[index] = clone(prior);
  }
  topic(draft, 'web').sections.find(section => section.id === 'web-map').body = '직접 수정한 내용';
  topic(draft, 'templates').sections.find(section => section.id === 'backend-python').body = '직접 수정한 Python 내용';
  const before = clone(draft);
  const result = upgradeNineDefaults(draft, latest);
  assert.deepEqual(draft, before);
  assert.equal(topic(result, 'web').sections.find(section => section.id === 'web-map').body, '직접 수정한 내용');
  assert.equal(topic(result, 'templates').sections.find(section => section.id === 'backend-python').body, '직접 수정한 Python 내용');
  for (const id of ['web-json-card', 'web-future-backend']) assert.ok(topic(result, 'web').sections.some(section => section.id === id));
});
