import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionScenes, sectionArtwork, sectionDescriptions } from '../src/section-scenes.js';

test('the authored section scenes have stable keys and matching artwork and accessible descriptions',()=>{
  assert.equal(Object.keys(sectionScenes).length,22);
  for(const [id,scene] of Object.entries(sectionScenes)){
    assert.ok(scene.title.trim());assert.ok(scene.description.trim());
    assert.equal(sectionArtwork[`section-${id}`],scene.svg);
    assert.equal(sectionDescriptions[`section-${id}`],scene.description);
  }
  assert.equal(new Set(Object.values(sectionArtwork)).size,22);
});

test('all section graphics are self-contained accessible SVG with unique internal IDs',()=>{
  for(const [id,{svg}] of Object.entries(sectionScenes)){
    assert.match(svg,/<svg\b[^>]*viewBox=['"]0 0 760 550['"]/i,id);
    assert.match(svg,/class=['"][^'"]*\btopic-art-svg\b/,id);
    assert.match(svg,/aria-hidden=['"]true['"]/,id);
    assert.match(svg,/focusable=['"]false['"]/,id);
    assert.doesNotMatch(svg,/<(?:script|foreignObject|image|iframe)\b|\bon(?:load|click|error)\s*=/i,id);
    assert.doesNotMatch(svg,/(?:href|src)\s*=\s*['"](?:https?:|data:|javascript:)/i,id);
    const ids=[...svg.matchAll(/\bid=['"]([^'"]+)['"]/g)].map(match=>match[1]);
    assert.equal(new Set(ids).size,ids.length,id);
    assert.match(svg,/art-motion/,`${id}: motion remains controllable by the existing pause setting`);
  }
});
