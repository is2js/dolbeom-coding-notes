import test from 'node:test';
import assert from 'node:assert/strict';
import { learningState, learningMethods, prepareLearningReturn } from '../src/learning-controller.js';
import { getRelatedSteps } from '../src/lesson-flow.js';

function harness() {
  const app={
    ...learningState(),...learningMethods,route:'learn',lessonId:'terminal',stepIndex:3,view:'demo',
    course:{lessons:[
      {id:'terminal',sections:[{id:'terminal-example',title:'첫 명령',optional:false},{id:'terminal-shortcuts',title:'단축키',optional:false},{id:'bonus',title:'보충',optional:true}],steps:[{id:'terminal-06'},{id:'terminal-01'},{id:'terminal-03'},{id:'terminal-07'}]},
      {id:'git',sections:[{id:'git-prompt',title:'Git 요청',optional:false}],steps:[{id:'git-05'}]},
    ]},
    get lesson(){return this.course.lessons.find(item=>item.id===this.lessonId);},
    $nextTick(callback){callback();},
    showLesson(id,page){this.selectLearningLocation(id,page);},
  };
  return app;
}

test('the current section selects its own example and repeated route reads keep the rehearsal position',()=>{
  const app=harness();const source=structuredClone(app.course);
  app.selectLearningLocation('terminal','section-terminal-example');
  assert.equal(app.stepIndex,1);assert.equal(app.view,'map');
  app.view='demo';app.moveLearningExample(1);assert.equal(app.stepIndex,2);
  app.selectLearningLocation('terminal','section-terminal-example');
  assert.equal(app.stepIndex,2);assert.equal(app.view,'demo');
  app.moveLearningExample(1);assert.equal(app.stepIndex,2,'the example control must not enter another section');
  assert.deepEqual(app.course,source,'rehearsal navigation never changes author content');
});

test('moving to another section changes its example and returns to the related concept picture',()=>{
  const app=harness();app.selectLearningLocation('terminal','section-terminal-example');app.view='demo';
  app.goLearningPage('section-terminal-shortcuts');
  assert.equal(app.stepIndex,0);assert.equal(app.view,'map');
  app.moveLearningExample(1);assert.equal(app.stepIndex,3);
  app.moveLearningExample(-1);assert.equal(app.stepIndex,0);
});

test('a full lecture proceeds through sections, recap, and the next topic introduction',()=>{
  const app=harness();app.selectLearningLocation('terminal','case');
  app.moveLearningPage(1);assert.equal(app.learningPageId,'section-terminal-example');
  app.moveLearningPage(1);assert.equal(app.learningPageId,'section-terminal-shortcuts');
  app.moveLearningPage(1);assert.equal(app.learningPageId,'recap');
  app.moveLearningPage(1);assert.equal(app.lessonId,'git');assert.equal(app.learningPageId,'case');
  app.moveLearningPage(-1);assert.equal(app.lessonId,'terminal');assert.equal(app.learningPageId,'recap');
});

test('external section and example deletion recovers without displaying an unrelated demonstration',()=>{
  const app=harness();app.selectLearningLocation('terminal','section-terminal-example');
  app.lesson.steps=app.lesson.steps.filter(step=>!['terminal-01','terminal-03'].includes(step.id));
  app.reconcileLearningFlow();assert.equal(app.view,'map');
  assert.deepEqual(getRelatedSteps(app.lesson,app.learningPageId),[]);
  app.lesson.sections=app.lesson.sections.filter(section=>section.id!=='terminal-example');
  app.reconcileLearningFlow();assert.equal(app.learningPageId,'case');
});

test('the global example button opens the first section with a relevant example',()=>{
  const app=harness();app.showLearningDemo();
  assert.equal(app.learningPageId,'section-terminal-example');assert.equal(app.view,'demo');assert.equal(app.stepIndex,1);
});

test('returning from editing waits for a successful save and keeps invalid or busy drafts in the editor',async()=>{
  let saves=0;const editor={busy:false,isDirty:true,hasUnsaved:true,async save(){saves++;this.isDirty=false;this.hasUnsaved=false;return true;}};
  assert.equal(await prepareLearningReturn(editor),true);assert.equal(saves,1);
  assert.equal(await prepareLearningReturn(editor),true);assert.equal(saves,1,'a clean draft needs no extra save');
  editor.isDirty=true;editor.hasUnsaved=true;editor.save=async()=>false;
  assert.equal(await prepareLearningReturn(editor),false);assert.equal(editor.isDirty,true);
  editor.busy=true;editor.save=async()=>{throw new Error('must not save a busy import');};
  assert.equal(await prepareLearningReturn(editor),false);
});

test('a newer edit made during the save stays in editing instead of rehearsing an older version',async()=>{
  const editor={busy:false,isDirty:true,hasUnsaved:true,async save(){return true;}};
  assert.equal(await prepareLearningReturn(editor),false);
});

test('reordering two related examples preserves the selected stable ID and its new index',()=>{
  const app=harness();
  app.selectLearningLocation('terminal','section-terminal-example');
  app.view='demo';
  app.moveLearningExample(1);
  const selectedId=app.lesson.steps[app.stepIndex].id;
  assert.equal(selectedId,'terminal-03');
  [app.lesson.steps[1],app.lesson.steps[2]]=[app.lesson.steps[2],app.lesson.steps[1]];
  const page=app.reconcileLearningFlow(selectedId);
  assert.equal(page.id,'section-terminal-example');
  assert.equal(app.lesson.steps[app.stepIndex].id,selectedId);
  assert.equal(app.stepIndex,1);
  assert.equal(app.view,'demo');
  app.reconcileLearningFlow();
  assert.equal(app.stepIndex,1,'a later ordinary reconciliation keeps the restored example');
});

test('a supplied stable ID cannot restore a demo outside the selected section or a deleted page',()=>{
  const app=harness();
  app.selectLearningLocation('terminal','section-terminal-example');
  app.view='demo';
  app.reconcileLearningFlow('terminal-06');
  assert.ok(getRelatedSteps(app.lesson,app.learningPageId).some(example=>example.index===app.stepIndex));
  assert.notEqual(app.lesson.steps[app.stepIndex].id,'terminal-06');
  app.lesson.sections=app.lesson.sections.filter(section=>section.id!=='terminal-example');
  app.reconcileLearningFlow('terminal-03');
  assert.equal(app.learningPageId,'case');
  assert.equal(app.view,'map');
});
