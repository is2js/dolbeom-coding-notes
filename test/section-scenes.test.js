import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionScenes, sectionArtwork, sectionDescriptions } from '../src/section-scenes.js';

test('the authored section scenes have stable keys and matching artwork and accessible descriptions',()=>{
  assert.equal(Object.keys(sectionScenes).length,25);
  for(const [id,scene] of Object.entries(sectionScenes)){
    assert.ok(scene.title.trim());assert.ok(scene.description.trim());
    assert.equal(sectionArtwork[`section-${id}`],scene.svg);
    assert.equal(sectionDescriptions[`section-${id}`],scene.description);
  }
  assert.equal(new Set(Object.values(sectionArtwork)).size,25);
  for (const id of ['tools-html', 'tools-css', 'tools-javascript']) {
    assert.ok(sectionScenes[id], `missing practice artwork ${id}`);
  }
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

test('the first terminal scene highlights pwd and identifies its PowerShell alias',()=>{
  const scene = sectionScenes['terminal-example'];
  assert.match(scene.svg, />pwd<\/text>/);
  assert.match(scene.svg, />ls<\/text>/);
  assert.match(scene.svg, />= Get-Location<\/text>/);
  assert.match(scene.svg, />= Get-ChildItem<\/text>/);
  assert.match(scene.svg, />explorer\.exe \.<\/text>/);
  assert.match(scene.svg, />wt -d \.<\/text>/);
  assert.match(scene.description, /pwd\(Get-Location의 별칭\)/);
  assert.match(scene.description, /Win\+R/);
});

test('the GUI/CLI scene connects a saved note with the same PowerShell file',()=>{
  const scene = sectionScenes['terminal-gui-cli'];
  assert.match(scene.svg, /memo\.txt/);
  assert.match(scene.svg, /Get-Content/);
  assert.match(scene.svg, /Get-Content \/ cat/);
  assert.match(scene.svg, /Ctrl\+S/);
  assert.match(scene.description, /메모장.*저장.*Windows에서 쓰는 PowerShell.*Get-Content.*별칭 cat/);
  assert.doesNotMatch(scene.svg, /npm|node|서버/i);
});
