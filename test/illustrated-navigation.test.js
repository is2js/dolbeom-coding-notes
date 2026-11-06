import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionThumbnail } from '../src/section-thumbnails.js';
import { sectionScenes } from '../src/section-scenes.js';
import { topicNavigationMethods, topicNavigationState } from '../src/topic-navigation.js';

test('each authored section has its own small illustration and unknown sections keep the topic fallback', () => {
  const svg = Object.keys(sectionScenes).map(id => sectionThumbnail(id,'git'));
  assert.equal(new Set(svg).size, Object.keys(sectionScenes).length);
  for (const value of svg) {
    assert.match(value,/data-section-thumbnail=/);
    assert.match(value,/viewBox="0 0 160 112"/);
    assert.doesNotMatch(value, /\bid=|<script|<foreignObject|<image|(?:href|src)=["'](?:https?:|data:)/);
  }
  const fallback=sectionThumbnail('custom-lesson','git');
  assert.match(fallback,/data-topic-thumbnail="git"/);
  assert.equal(sectionThumbnail('section-tools-html','ide'),sectionThumbnail('tools-html','ide'));
});

test('the same step buttons follow stable IDs in lecture and presentation without editing content', () => {
  const calls=[];
  const section={id:'custom-section',title:'강사가 바꾼 제목'};
  const pages=[{id:'case',kind:'case',title:'시작 사례'},{id:'section-custom-section',kind:'section',section}];
  const app={...topicNavigationState(),...topicNavigationMethods,route:'learn',lessonId:'git',learningPages:pages,learningPageId:pages[1].id,presentationPages:[{id:'intro',kind:'intro'},...pages],presentationPageId:'intro',
    goLearningPage:id=>calls.push(['learn',id]),goPresentationPage:id=>calls.push(['present',id]),presentationPhase:kind=>({intro:'강의 목표',case:'시작 사례'})[kind]};
  const source=structuredClone(pages);
  assert.equal(app.navigationPageIndex(),1);
  assert.equal(app.navigationPageTitle(pages[1]),'강사가 바꾼 제목');
  app.topicNavigationOpen=true;app.selectNavigationPage(pages[1].id);
  assert.equal(app.topicNavigationOpen,false);
  app.route='present';assert.equal(app.navigationPageIndex(),0);
  assert.equal(app.navigationPageTitle(app.navigationPages()[0]),'강의 목표');
  app.selectNavigationPage('case');app.selectNavigationPage('missing');
  assert.deepEqual(calls,[['learn','section-custom-section'],['present','case']]);
  assert.deepEqual(pages,source);
});

test('topic menu arrows wrap and Home/End move focus inside the menu', () => {
  const focused=[];
  const menu={querySelectorAll:()=>options};
  const options=[0,1,2].map(index=>({closest:()=>menu,focus:()=>focused.push(index)}));
  const app={...topicNavigationMethods,revealTopicOption:()=>{}};
  app.focusTopicOption({currentTarget:options[2]},1);
  app.focusTopicOption({currentTarget:options[0]},-1);
  app.focusTopicOption({currentTarget:options[1]},'first');
  app.focusTopicOption({currentTarget:options[1]},'last');
  assert.deepEqual(focused,[0,2,0,2]);
});
