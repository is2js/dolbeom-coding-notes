import test from 'node:test';
import assert from 'node:assert/strict';
import { availableLessons, isUpcomingLesson, UPCOMING_MESSAGE } from '../src/upcoming-lesson.js';
import { presenterMethods } from '../src/presenter.js';

test('backend remains in the course but is excluded from available lesson totals', () => {
  const course = { lessons: [{ id: 'terminal' }, { id: 'web' }, { id: 'templates' }] };
  assert.equal(isUpcomingLesson('templates'), true);
  assert.deepEqual(availableLessons(course).map(item => item.id), ['terminal', 'web']);
  assert.equal(course.lessons.length, 3);
});

test('opening a prepared presentation announces the upcoming lesson without changing the route', () => {
  let message = '';
  const context = { course: { lessons: [{ id: 'web' }, { id: 'templates' }] }, notify: text => { message = text; } };
  presenterMethods.openPresentation.call(context, 'templates', 'case');
  assert.equal(message, UPCOMING_MESSAGE);
});
