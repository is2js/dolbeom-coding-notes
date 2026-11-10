import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionScenes, sectionArtwork, sectionDescriptions } from '../src/section-scenes.js';

test('the authored section scenes have stable keys and matching artwork and accessible descriptions',()=>{
  assert.equal(Object.keys(sectionScenes).length,32);
  for(const [id,scene] of Object.entries(sectionScenes)){
    assert.ok(scene.title.trim());assert.ok(scene.description.trim());
    assert.equal(sectionArtwork[`section-${id}`],scene.svg);
    assert.equal(sectionDescriptions[`section-${id}`],scene.description);
  }
  assert.equal(new Set(Object.values(sectionArtwork)).size,32);
  for (const id of ['tools-html', 'tools-css', 'tools-javascript']) {
    assert.ok(sectionScenes[id], `missing practice artwork ${id}`);
  }
});

test('beginner Git scenes separate the repository, staging, difference and temporary visit',()=>{
  assert.match(sectionScenes['git-example'].svg,/\.git/);
  assert.match(sectionScenes['git-example'].svg,/ls -Force/);
  assert.match(sectionScenes['git-why'].svg,/작업 파일/);
  assert.match(sectionScenes['git-why'].svg,/스테이징/);
  assert.match(sectionScenes['git-why'].svg,/git add note\.txt/);
  assert.match(sectionScenes['git-diff'].svg,/− 버전 1/);
  assert.match(sectionScenes['git-diff'].svg,/\+ 버전 2/);
  assert.match(sectionScenes['git-prompt'].svg,/>HEAD<\/text>/);
  assert.match(sectionScenes['git-prompt'].svg,/>main<\/text>/);
  assert.match(sectionScenes['git-prompt'].svg,/git switch main/);
  assert.match(sectionScenes['git-prompt'].description,/main은 최신 버전 2.*HEAD가 이전 버전 1/);
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
  assert.match(scene.svg, />C:\\Users<\/text>/);
  assert.match(scene.svg, />wt -d \.<\/text>/);
  assert.match(scene.description, /pwd\(Get-Location의 별칭\)/);
  assert.match(scene.description, /Win\+R/);
  // The temporary folder must be recreated before entering it.
  assert.ok(scene.svg.indexOf('mkdir → 빈 폴더 삭제') < scene.svg.indexOf('다시 mkdir → cd'));
  assert.match(scene.description, /빈 연습 폴더를 삭제하고 다시 만든 후 cd로 들어갑니다/);
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

test('card-practice scenes match the taught heading, button, description and 24px comparison',()=>{
  const html = sectionScenes['tools-html'].svg;
  assert.ok(html.indexOf('&lt;h1&gt;Git&lt;/h1&gt;') < html.indexOf('&lt;button&gt;설명 보기&lt;/button&gt;'));
  assert.ok(html.indexOf('&lt;button&gt;설명 보기&lt;/button&gt;') < html.indexOf('&lt;p&gt;변경을 확인하고'));
  assert.match(sectionScenes['tools-css'].svg, /padding: 24px;/);
  assert.match(sectionScenes['tools-javascript'].svg, /detail\.hidden = !isHidden;/);
  assert.match(sectionScenes['frontend-css'].svg, /padding: 24px;/);
  assert.match(sectionScenes['frontend-css'].svg, /p-6  rounded-xl/);
});
