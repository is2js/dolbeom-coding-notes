import test from 'node:test';
import assert from 'node:assert/strict';
import { editorAddress, parseEditorRoute, selectEditorLesson } from '../src/editing-route.js';

const course = { lessons: [
  { id: 'terminal', sections: [{ id: 'terminal-example' }, { id: 'terminal-shortcuts' }] },
  { id: 'git', sections: [{ id: 'git-prompt' }] },
] };

test('reading a section can open the same lesson and item directly in the editor', () => {
  const hash=editorAddress('git','git-prompt');
  assert.equal(hash,'#/editor/git/git-prompt');
  assert.deepEqual(parseEditorRoute(hash,course),{lessonId:'git',itemId:'git-prompt'});
  assert.deepEqual(parseEditorRoute(editorAddress('terminal'),course),{lessonId:'terminal',itemId:'case'});
});

test('legacy editor links, removed sections and invalid paths recover to a real lesson introduction', () => {
  assert.deepEqual(parseEditorRoute('#/editor',course,'git'),{lessonId:'git',itemId:'case'});
  assert.deepEqual(parseEditorRoute('#/editor/git/removed',course),{lessonId:'git',itemId:'case'});
  for(const path of ['#/editor/missing/test','#/editor/git/../script','#/editor/<svg>']) {
    assert.deepEqual(parseEditorRoute(path,course),{lessonId:'terminal',itemId:'case'});
  }
  assert.equal(parseEditorRoute('#/lesson/git',course),null);
  assert.equal(parseEditorRoute('#/editorial',course),null);
  assert.equal(parseEditorRoute('#/editor',{lessons:[]}),null);
});

test('links keep the same section after renaming and reordering the course', () => {
  const changed=structuredClone(course);
  changed.lessons.reverse();changed.lessons[1].sections.reverse();
  changed.lessons[1].sections[0].title='바뀐 제목';
  assert.deepEqual(parseEditorRoute('#/editor/terminal/terminal-shortcuts',changed),{lessonId:'terminal',itemId:'terminal-shortcuts'});
});

test('switching lessons inside the editor resets the demonstration before a presenter preview', () => {
  const state={lessonId:'templates',stepIndex:20,course:{untouched:true}};
  selectEditorLesson(state,'github');
  assert.equal(state.lessonId,'github');assert.equal(state.stepIndex,0);
  state.stepIndex=2;selectEditorLesson(state,'github');
  assert.equal(state.stepIndex,2,'moving between sections of one lesson keeps its demonstration');
  assert.deepEqual(state.course,{untouched:true});
});
