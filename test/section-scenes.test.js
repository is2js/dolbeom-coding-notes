import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionScenes, sectionArtwork, sectionDescriptions } from '../src/section-scenes.js';

test('the authored section scenes have stable keys and matching artwork and accessible descriptions',()=>{
  assert.equal(Object.keys(sectionScenes).length,35);
  for(const [id,scene] of Object.entries(sectionScenes)){
    assert.ok(scene.title.trim());assert.ok(scene.description.trim());
    assert.equal(sectionArtwork[`section-${id}`],scene.svg);
    assert.equal(sectionDescriptions[`section-${id}`],scene.description);
  }
  assert.equal(new Set(Object.values(sectionArtwork)).size,35);
  for (const id of ['tools-html', 'tools-css', 'tools-javascript']) {
    assert.ok(sectionScenes[id], `missing practice artwork ${id}`);
  }
});

test('VS Code setup artwork returns to the existing clone and README',()=>{
  const scene = sectionScenes['tools-vscode-setup'];
  assert.match(scene.description, /공식.*User Setup.*git-practice-clone.*README\.md/);
  assert.match(scene.svg, /User Setup 설치/);
  assert.match(scene.svg, /README\.md/);
});

test('Markdown scenes connect plan syntax to rendered content and separate local image storage from GitHub push',()=>{
  const plan = sectionScenes['markdown-map'];
  const image = sectionScenes['markdown-typora-images'];
  assert.match(plan.description, /제목, 목록, 강조와 링크/);
  assert.match(plan.svg, /Markdown 원문/);
  assert.match(plan.svg, /읽는 화면/);
  assert.match(image.description, /클립보드.*assets.*README.*Git.*GitHub/);
  assert.match(image.svg, /Typora · 내 프로젝트/);
  assert.match(image.svg, /README\.md/);
  assert.match(image.svg, /assets\//);
  assert.match(image.svg, /commit · push/);
  assert.match(image.svg, /로컬에 저장하고 Git으로 함께 올립니다/);
});

test('beginner Git scenes separate the repository, staging, difference and temporary visit',()=>{
  assert.match(sectionScenes['git-example'].svg,/\.git/);
  assert.match(sectionScenes['git-example'].svg,/note\.txt/);
  assert.match(sectionScenes['git-example'].description,/터미널에서 만든 git-practice 폴더의 note\.txt/);
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
  const branch = sectionScenes['git-branch'];
  assert.match(branch.svg, /practice-branch/);
  assert.match(branch.svg, /branch-note\.txt 커밋/);
  assert.match(branch.svg, /git merge --no-ff/);
  assert.match(branch.svg, /병합 커밋/);
  assert.match(branch.description, /main은 병합 커밋을, practice-branch는 원래 브랜치 커밋/);
  assert.match(branch.description, /fast-forward로 병합 커밋 없이/);
});

test('GitHub scenes follow the same note from local push to a new clone',()=>{
  const push = sectionScenes['github-clone'];
  const clone = sectionScenes['github-roles'];
  assert.match(push.description, /origin은 GitHub 원격 주소를 가리키는 별칭/);
  assert.match(push.description, /fetch.*작업 파일을 자동으로 바꾸지 않습니다/);
  assert.match(push.svg, /git-practice/);
  assert.match(push.svg, />push<\/text>/);
  assert.match(push.svg, />fetch<\/text>/);
  assert.match(push.svg, /origin = 원격 주소 별칭/);
  assert.ok(push.svg.indexOf('내 컴퓨터 · 로컬 저장소') < push.svg.indexOf('GitHub · 원격 저장소'));
  assert.match(clone.description, /GitHub 원격.*새 폴더.*clone/);
  assert.match(clone.svg, /git-practice-clone/);
  assert.match(clone.svg, /origin = 원격 주소 별칭/);
  assert.ok(clone.svg.indexOf('GitHub · 원격 저장소') < clone.svg.indexOf('내 컴퓨터 · 새 폴더'));
  assert.match(push.svg, /note\.txt/);
  assert.match(clone.svg, /note\.txt/);
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
  assert.match(scene.svg, /note\.txt/);
  assert.match(scene.description, /note\.txt/);
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
