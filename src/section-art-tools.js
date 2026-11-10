// Self-contained, crisp diagrams. Complete static geometry explains each idea;
// named motion layers only trace the command, transfer, or review action.
const C = { ink:'#1d2a42', teal:'#267c78', sage:'#cbdcc5', light:'#fff9ed', paper:'#f6ecd7', cream:'#e6d4ae', amber:'#e8b55c', red:'#ae674f', paleRed:'#f1d9c9', muted:'#586b64', line:'#bdc7b3', white:'#fffdf7' };
const esc = value => String(value).replace(/[&<>"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
const text = (x,y,value,{size=22,fill=C.ink,weight=550,anchor='start',mono=false}={}) => `<text x="${x}" y="${y}" fill="${fill}" stroke="none" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" font-family="${mono?'Consolas,monospace':'Pretendard,Malgun Gothic,system-ui,sans-serif'}">${esc(value)}</text>`;
const path = (d,stroke=C.ink,width=2.8,extra='') => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const rect = (x,y,w,h,fill=C.light,r=10,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${/\bstroke=/.test(extra)?'':`stroke="${C.ink}"`} ${/\bstroke-width=/.test(extra)?'':'stroke-width="2.6"'} ${extra}/>`;
const circle = (x,y,r,fill=C.sage,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${C.ink}" stroke-width="2.8" ${extra}/>`;
const check = (x,y,scale=1) => `<g transform="translate(${x} ${y}) scale(${scale})">${path('M-10 0l7 7 17-20',C.teal,4)}</g>`;
const cursor = (p,x,y,fill=C.teal,h=23) => `<rect x="${x}" y="${y}" width="5" height="${h}" rx="1" fill="${fill}" class="art-motion ${p}-cursor"/>`;
const arrow = (p,d) => path(d,C.teal,3.4,`marker-end="url(#${p}-arrow)"`);
const flow = (p,d,delay=0) => path(d,C.amber,5,`class="art-motion ${p}-flow" pathLength="100" stroke-dasharray="9 91" stroke-dashoffset="100" opacity="0" style="animation-delay:${delay}s"`);
const pill = (x,y,w,label,fill=C.sage,mono=false) => rect(x,y,w,36,fill,7,'stroke-width="1.8"') + text(x+w/2,y+25,label,{size:20,mono,anchor:'middle',weight:650});

function panel(x,y,w,h,title,body,{dark=false,titleSize=23}={}) {
  return `<g stroke-linejoin="round"><path d="M${x+w} ${y+10}l9 8v${h-9}l-9-9Z" fill="${C.cream}" stroke="${C.ink}" stroke-width="2.6"/><path d="M${x} ${y+h}l9 9h${w}l-9-9Z" fill="${C.cream}" stroke="${C.ink}" stroke-width="2.6"/>`
    + rect(x,y,w,h,dark?C.ink:C.light)
    + `<path d="M${x+10} ${y}h${w-20}q10 0 10 10v32H${x}V${y+10}q0-10 10-10Z" fill="${C.ink}"/>`
    + text(x+17,y+29,title,{size:titleSize,fill:C.light,weight:700})
    + `<circle cx="${x+w-17}" cy="${y+21}" r="4" fill="${C.amber}"/>`
    + path(`M${x} ${y+42}h${w}`,C.ink,2.6) + body + '</g>';
}

function document(x,y,w=82,h=100,fill=C.white) {
  const f=20;
  return `<g stroke="${C.ink}" stroke-width="2.6" stroke-linejoin="round"><path d="M${x+6} ${y+7}h${w-f}l${f} ${f}v${h-f}H${x+6}Z" fill="${C.cream}"/><path d="M${x} ${y}h${w-f}l${f} ${f}v${h-f}H${x}Z" fill="${fill}"/><path d="M${x+w-f} ${y}v${f}h${f}" fill="${C.cream}"/>`
    + path(`M${x+15} ${y+h*.43}h${w-30}`,C.teal,4) + path(`M${x+15} ${y+h*.6}h${w-35}M${x+15} ${y+h*.77}h${w-42}`,C.line,4) + '</g>';
}

function folder(x,y,w=180,h=115) {
  return `<g stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"><path d="M${x} ${y+17}V${y}h${w*.36}l14 17h${w*.64-14}v${h-17}H${x}Z" fill="${C.amber}"/><path d="M${x-7} ${y+36}h${w+18}l-16 ${h-36}H${x+4}Z" fill="${C.paper}"/>`
    + path(`M${x+12} ${y+47}h${w-21}`,C.white,3) + '</g>';
}

function commit(x,y,label,r=28) {
  return `<g stroke="${C.ink}" stroke-width="2.8"><path d="M${x-r} ${y}v22c0 19 ${r*2} 19 ${r*2} 0v-22" fill="${C.teal}"/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="14" fill="${C.sage}"/><ellipse cx="${x}" cy="${y}" rx="9" ry="4" fill="${C.white}"/></g>`
    + text(x,y+67,label,{size:22,anchor:'middle',weight:700});
}
function remoteRepository(x,y) {
  return rect(x+6,y+7,150,116,C.cream,7) + rect(x,y,150,116,C.sage,7)
    + rect(x+12,y+14,126,34,C.white,5) + text(x+75,y+37,'note.txt',{size:18,anchor:'middle',mono:true,weight:700})
    + path(`M${x+39} ${y+81}h72`,C.teal,3) + circle(x+39,y+81,8,C.amber) + circle(x+111,y+81,8,C.white);
}
const key = (x,y,w,label,active=false) => rect(x+2,y+5,w,37,C.cream,6) + rect(x,y,w,37,active?C.sage:C.white,6) + text(x+w/2,y+26,label,{size:20,mono:true,anchor:'middle',weight:650});

function scene(p,heading,contents,footer='') {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="topic-art-svg section-art-svg ${p}" viewBox="0 0 760 550" aria-hidden="true" focusable="false"><defs><marker id="${p}-arrow" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1l7 4-7 4" fill="none" stroke="${C.teal}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`
    + `<style>.${p} .${p}-flow{animation:${p}-travel 5.8s ease-in-out infinite}.${p} .${p}-cursor{animation:${p}-blink 2.6s steps(2,end) infinite}.${p} .${p}-focus{animation:${p}-focus 5.8s ease-in-out infinite}@keyframes ${p}-travel{0%,8%{stroke-dashoffset:100;opacity:0}20%{opacity:1}77%{stroke-dashoffset:0;opacity:1}90%,100%{stroke-dashoffset:0;opacity:0}}@keyframes ${p}-blink{0%,48%{opacity:1}49%,100%{opacity:.18}}@keyframes ${p}-focus{0%,100%{stroke-opacity:.4}35%,70%{stroke-opacity:1}}@media(prefers-reduced-motion:reduce){.${p} .art-motion{animation:none!important}}</style>`
    + text(380,61,heading,{size:27,anchor:'middle',weight:750}) + path('M80 81h600',C.line,1.4)
    + `<ellipse cx="384" cy="450" rx="264" ry="16" fill="${C.ink}" opacity=".055"/>`
    + contents + (footer?text(380,513,footer,{size:21,anchor:'middle',fill:C.muted,weight:600}):'') + '</svg>';
}

function locationScene() {
  const p='section-terminal-example';
  return scene(p,'터미널 ↔ 탐색기 · 같은 폴더 확인',
    panel(56,108,335,326,'PowerShell',
      rect(75,164,296,45,'#dfebd6',6,'stroke="none"')
      + text(88,194,'pwd',{size:25,fill:C.teal,mono:true,weight:750}) + text(157,194,'= Get-Location',{size:18,mono:true})
      + text(88,232,'explorer.exe .',{size:23,mono:true})
      + text(88,271,'cd .  ·  cd ..',{size:22,mono:true,fill:C.teal})
      + text(88,310,'ls',{size:24,fill:C.teal,mono:true,weight:750}) + text(138,310,'= Get-ChildItem',{size:18,mono:true})
      + text(88,350,'mkdir → 빈 폴더 삭제',{size:20})
      + text(88,394,'다시 mkdir → cd',{size:21,fill:C.muted}) + cursor(p,328,374))
    + arrow(p,'M402 231h29') + flow(p,'M402 231h29')
    + panel(446,108,258,176,'파일 탐색기',rect(465,165,220,41,C.white,6)
      + text(477,193,'C:\\Users',{size:22,mono:true,fill:C.teal})
      + text(467,242,'Win + R → 경로 입력',{size:20}) + text(467,269,'같은 위치의 폴더',{size:20,fill:C.muted}))
    + arrow(p,'M575 296v20') + flow(p,'M575 296v20',1.3)
    + panel(446,329,258,105,'탐색기 주소창',text(575,407,'wt -d .',{size:25,anchor:'middle',mono:true,fill:C.teal,weight:750})),
    '현재 위치와 부모 폴더 → 만들기와 삭제 연습');
}

function guiCliScene() {
  const p='section-terminal-gui-cli';
  return scene(p,'같은 memo.txt를 두 화면에서 확인',
    panel(43,115,282,297,'PowerShell · CLI',
      text(64,198,'New-Item / ni',{mono:true,size:23}) + text(64,236,'memo.txt',{mono:true,size:25,fill:C.teal,weight:700})
      + path('M64 256h239',C.line,1.6) + text(64,298,'Get-Content / cat',{mono:true,size:20,fill:C.teal,weight:650})
      + text(64,337,'memo.txt',{mono:true,size:25}) + text(64,382,'내용 읽기',{size:22}) + cursor(p,237,316))
    + document(348,201,64,92) + arrow(p,'M332 244h8') + flow(p,'M332 244h8')
    + arrow(p,'M420 244h8') + flow(p,'M420 244h8',.8) + text(380,332,'같은 파일',{size:19,anchor:'middle',fill:C.teal,weight:700})
    + panel(438,115,278,297,'메모장 · GUI',
      text(460,191,'memo.txt',{mono:true,size:22,fill:C.teal}) + path('M460 207h233',C.line,1.6)
      + text(460,252,'Hello, Codex!',{mono:true,size:25}) + cursor(p,654,230)
      + pill(461,291,225,'Ctrl+S · 저장',C.sage) + text(461,382,'탐색기에서 파일 확인',{size:20}))
    + arrow(p,'M569 427v35H185v-35') + flow(p,'M569 427v35H185v-35',1.4),
    '메모장에서 저장한 내용을 PowerShell로 다시 읽기');
}

function hostShellScene() {
  const p='section-terminal-host-shell';
  return scene(p,'Windows Terminal은 셸을 담는 작업 창',
    panel(53,108,646,318,'Windows Terminal · 창 / 탭 / 분할',
      pill(74,166,188,'탭 1',C.sage) + pill(282,166,188,'탭 2',C.paper) + pill(490,166,188,'탭 3',C.paper)
      + rect(74,220,188,182,C.ink,8) + rect(282,220,188,182,'#285e61',8) + rect(490,220,188,182,'#3a4b60',8)
      + text(168,259,'PowerShell 7',{size:23,anchor:'middle',fill:C.light,weight:700})
      + text(168,296,'pwsh.exe',{size:20,anchor:'middle',fill:C.sage,mono:true}) + text(96,366,'PS >',{size:26,mono:true,fill:C.white}) + cursor(p,167,344,C.amber)
      + text(376,253,'Windows',{size:23,anchor:'middle',fill:C.light,weight:700})
      + text(376,282,'PowerShell 5.1',{size:20,anchor:'middle',fill:C.light,weight:700})
      + text(376,315,'powershell.exe',{size:19,anchor:'middle',fill:C.sage,mono:true}) + text(304,366,'PS >',{size:26,mono:true,fill:C.white})
      + text(584,262,'명령 프롬프트',{size:22,anchor:'middle',fill:C.light,weight:700})
      + text(584,299,'cmd.exe',{size:21,anchor:'middle',fill:C.sage,mono:true}) + text(514,366,'C:\\>',{size:26,mono:true,fill:C.white})),
    '호스트는 창을 관리하고, 선택한 셸은 명령을 해석');
}

function shortcutsScene() {
  const p='section-terminal-shortcuts';
  return scene(p,'설정 → 창 분할 → 포커스 이동',
    panel(49,112,207,310,'설정',text(70,191,'작업 설정',{size:23}) + pill(70,211,164,'단축키 확인',C.sage)
      + text(70,286,'기본 · 강사',{size:23}) + path('M72 311h158',C.teal,4) + circle(125,311,7,C.white)
      + key(76,354,79,'Ctrl') + key(174,354,49,','))
    + arrow(p,'M269 271h21') + flow(p,'M269 271h21')
    + panel(304,112,402,310,'한 탭 안에서 두 패널 사용',rect(325,175,170,218,C.ink,8) + rect(511,175,172,218,'#285e61',8)
      + text(345,224,'PS >',{mono:true,size:28,fill:C.white}) + text(531,224,'PS >',{mono:true,size:28,fill:C.white})
      + cursor(p,418,202,C.amber,27) + text(410,356,'현재 포커스',{size:21,anchor:'middle',fill:C.sage})
      + text(597,356,'다른 패널',{size:21,anchor:'middle',fill:C.sage})
      + `<rect x="320" y="170" width="180" height="228" rx="11" fill="none" stroke="${C.amber}" stroke-width="3.5" class="art-motion ${p}-focus"/>`)
    + text(152,462,'Ctrl + ,',{size:23,anchor:'middle',mono:true,fill:C.teal,weight:700})
    + text(504,462,'Ctrl + Shift + \\',{size:24,anchor:'middle',mono:true,fill:C.teal,weight:700}),
    '강사 설정: 오른쪽 분할 · Ctrl+Alt+방향키로 이동');
}

function diffScene() {
  const p='section-git-example';
  return scene(p,'새 폴더 안에 Git 기록 공간 만들기',
    panel(67,118,622,313,'git-practice/ · 연습 폴더',
      folder(106,207,182,119) + text(197,368,'파일을 작성할 공간',{size:22,anchor:'middle',weight:700})
      + path('M324 179v218',C.line,1.6)
      + folder(413,207,182,119) + pill(446,245,117,'.git',C.sage,true)
      + text(506,368,'기록과 설정 보관',{size:22,anchor:'middle',weight:700})
      + `<rect x="402" y="193" width="214" height="147" rx="13" fill="none" stroke="${C.teal}" stroke-width="3" stroke-dasharray="9 7" class="art-motion ${p}-focus"/>`)
    + pill(81,449,285,'git init -b main',C.paper,true)
    + pill(392,449,285,'ls -Force로 .git 확인',C.paper),
    '.git는 숨겨진 기록 공간 · 안의 파일은 직접 고치지 않기');
}

function versionFlowScene() {
  const p='section-git-why';
  return scene(p,'저장한 내용 중 다음 기록에 넣을 내용 선택',
    panel(33,130,190,273,'작업 파일',
      document(83,196,82,111,C.white) + text(128,350,'note.txt',{size:21,mono:true,anchor:'middle',weight:700})
      + text(128,382,'version 1',{size:20,mono:true,anchor:'middle',fill:C.teal}),{titleSize:22})
    + arrow(p,'M234 262h36') + flow(p,'M234 262h36')
    + panel(283,130,190,273,'스테이징',
      document(333,196,82,111,C.sage) + check(411,293,.8)
      + text(378,350,'다음 기록에',{size:21,anchor:'middle',weight:700})
      + text(378,382,'담을 내용',{size:21,anchor:'middle',fill:C.teal}),{titleSize:22})
    + arrow(p,'M484 262h36') + flow(p,'M484 262h36',1.2)
    + panel(533,130,190,273,'커밋 기록',
      commit(628,239,'version 1',31)
      + text(628,351,'그 시점의 상태',{size:20,anchor:'middle',weight:700})
      + text(628,381,'메시지와 함께',{size:20,anchor:'middle',fill:C.teal}),{titleSize:22})
    + pill(147,433,213,'git add note.txt',C.paper,true)
    + pill(397,433,213,'git commit',C.sage,true),
    '파일 저장 · 다음 기록 선택 · 커밋은 서로 다른 단계');
}

function twoVersionsScene() {
  const p='section-git-diff';
  return scene(p,'두 버전의 차이를 읽고 새 기록 남기기',
    document(75,134,145,190,C.white) + pill(91,170,109,'버전 1',C.paper)
    + arrow(p,'M240 229h55') + flow(p,'M240 229h55')
    + document(319,134,145,190,C.sage) + pill(335,170,109,'버전 2',C.light)
    + arrow(p,'M481 229h37') + flow(p,'M481 229h37',1)
    + panel(535,135,165,189,'차이 · diff',
      text(551,218,'− 버전 1',{size:20,fill:C.red,weight:700})
      + text(551,260,'+ 버전 2',{size:20,fill:C.teal,weight:700}),{titleSize:20})
    + path('M145 380h249',C.teal,4) + circle(145,380,13,C.amber) + circle(394,380,13,C.sage)
    + text(145,435,'첫 커밋',{size:22,anchor:'middle',weight:700})
    + text(394,435,'두 번째 커밋',{size:22,anchor:'middle',weight:700})
    + pill(529,376,173,'기록 · log',C.paper),
    'diff로 비교 → 확인한 버전 2를 커밋');
}

function promptScene() {
  const p='section-git-prompt';
  return scene(p,'HEAD는 이전 기록 확인 · main은 최신 유지',
    pill(101,118,134,'HEAD',C.amber,true) + arrow(p,'M168 163v51')
    + pill(525,118,134,'main',C.sage,true) + arrow(p,'M592 163v51')
    + path('M191 241h378',C.line,4)
    + circle(168,241,23,C.amber) + circle(592,241,23,C.sage)
    + text(168,290,'버전 1 커밋',{size:23,anchor:'middle',weight:700})
    + text(592,290,'버전 2 커밋',{size:23,anchor:'middle',weight:700})
    + pill(89,315,158,'version 1',C.paper,true)
    + pill(513,315,158,'version 2',C.paper,true)
    + text(168,389,'지금 잠시 보는 기록',{size:21,anchor:'middle',fill:C.muted})
    + text(592,389,'최신 작업 위치',{size:21,anchor:'middle',fill:C.muted})
    + arrow(p,'M258 424h244') + flow(p,'M258 424h244')
    + text(380,463,'git switch main → 복귀',{size:24,anchor:'middle',mono:true,fill:C.teal,weight:700}),
    'main의 기록을 지우지 않고 이전 커밋에 다녀오기');
}

function cloneScene() {
  const p='section-github-clone';
  return scene(p,'내 메모 기록을 GitHub에 올리기',
    panel(45,115,275,291,'내 컴퓨터 · 로컬 저장소',
      folder(82,180,199,120) + pill(103,218,156,'note.txt',C.white,true)
      + text(182,339,'git-practice',{size:20,anchor:'middle',mono:true,weight:700})
      + text(182,374,'버전 1 · 버전 2 기록',{size:20,anchor:'middle',fill:C.muted}),{titleSize:20})
    + arrow(p,'M335 242h88') + flow(p,'M335 242h88')
    + text(379,218,'push',{size:23,mono:true,anchor:'middle',fill:C.teal,weight:700})
    + panel(438,115,275,291,'GitHub · 원격 저장소',
      remoteRepository(500,183)
      + text(575,339,'origin',{size:21,anchor:'middle',mono:true,weight:700})
      + text(575,374,'커밋 기록을 보관',{size:20,anchor:'middle',fill:C.muted}),{titleSize:20})
    + pill(233,443,294,'git push -u origin main',C.sage,true),
    '로컬에서 기록한 커밋을 원격으로 전송');
}

function remoteRolesScene() {
  const p='section-github-roles';
  return scene(p,'GitHub에서 다른 폴더로 복제하기',
    panel(45,115,275,291,'GitHub · 원격 저장소',
      remoteRepository(107,183)
      + text(182,339,'origin',{size:21,anchor:'middle',mono:true,weight:700})
      + text(182,374,'버전 1 · 버전 2 기록',{size:20,anchor:'middle',fill:C.muted}),{titleSize:20})
    + arrow(p,'M335 242h88') + flow(p,'M335 242h88')
    + text(379,218,'clone',{size:23,mono:true,anchor:'middle',fill:C.teal,weight:700})
    + panel(438,115,275,291,'내 컴퓨터 · 새 폴더',
      folder(475,180,199,120) + pill(496,218,156,'note.txt',C.white,true)
      + text(575,337,'git-practice-clone',{size:19,anchor:'middle',mono:true,weight:700})
      + text(575,374,'파일과 커밋 기록',{size:20,anchor:'middle',fill:C.muted}),{titleSize:20})
    + pill(255,443,250,'git clone 주소',C.sage,true),
    '다른 폴더에 복제해 파일과 기록 확인');
}

function pipeScene() {
  const p='section-terminal-bonus';
  return scene(p,'파이프는 왼쪽 결과를 오른쪽으로 전달',
    panel(57,108,644,102,'PowerShell · 명령 읽기',text(80,184,'Get-ChildItem -File | Select-Object Name',{mono:true,size:22,fill:C.teal,weight:650}))
    + panel(58,255,250,190,'파일 목록 · ls',text(79,339,'memo.txt',{size:23,mono:true}) + text(79,379,'README.md',{size:23,mono:true}) + text(79,419,'파일의 여러 속성',{size:21,fill:C.muted}))
    + arrow(p,'M324 348h104') + flow(p,'M324 348h104') + text(376,316,'|',{size:43,anchor:'middle',mono:true,weight:750})
    + panel(445,255,250,190,'이름 선택 · select',text(467,337,'Name',{size:22,mono:true,fill:C.teal,weight:700})
      + text(467,377,'memo.txt',{size:23,mono:true}) + text(467,417,'README.md',{size:23,mono:true}),{titleSize:22}),
    'ls · select는 PowerShell의 기본 별칭');
}

function errorReportScene() {
  const p='section-git-bonus';
  const rows=[['현재 폴더','dolbeom-notes'],['현재 브랜치','feat/course-search'],['실행 명령','git push'],['오류 전문','오류 원문 전체 첨부'],['보존할 작업','index.html의 내 수정']];
  const body=rows.map(([label,value],i)=>{const y=184+i*52;return text(137,y,`${i+1}. ${label}`,{size:22,weight:700,fill:C.teal})
    + text(330,y,value,{size:21,mono:i<3}) + (i<4?path(`M134 ${y+17}h488`,C.line,1.4):'');}).join('');
  return scene(p,'다섯 줄의 상태로 도움 요청하기',panel(110,110,536,338,'동기화 오류 보고 · 가상 예시',body)
    + circle(139,482,14,C.sage) + check(139,482,.65) + text(167,489,'토큰 · 비밀번호는 지우고 공유',{size:23,weight:650}) + cursor(p,606,376));
}

export const toolSectionScenes = {
  'terminal-example': {
    title:'첫 명령: 현재 위치와 폴더를 오가며 연습하기',
    description:'PowerShell에서 pwd(Get-Location의 별칭)로 현재 위치를 확인하고 Win+R이나 explorer.exe .으로 같은 폴더를 엽니다. cd .과 cd ..로 현재와 부모 폴더를 살펴보고 ls로 목록을 확인합니다. mkdir로 만든 빈 연습 폴더를 삭제하고 다시 만든 후 cd로 들어갑니다. 탐색기 주소창의 wt -d .으로 해당 위치에서 Windows Terminal을 엽니다.',
    svg:locationScene(),
  },
  'terminal-gui-cli': {
    title:'GUI와 CLI 연결: 같은 메모 파일 만들고 확인하기',
    description:'앞에서 만든 연습 폴더의 memo.txt를 PowerShell에서 만들고 메모장에서 내용을 입력해 저장한 뒤, 탐색기와 Windows에서 쓰는 PowerShell의 Get-Content 또는 그 기본 별칭 cat으로 같은 파일을 확인합니다.',
    svg:guiCliScene(),
  },
  'terminal-host-shell': {
    title:'Windows Terminal과 PowerShell·cmd의 관계',
    description:'Windows Terminal 호스트 안의 탭별 프로필에서 PowerShell 7의 pwsh.exe, Windows PowerShell 5.1의 powershell.exe, 명령 프롬프트의 cmd.exe를 구분합니다.',
    svg:hostShellScene(),
  },
  'terminal-shortcuts': {
    title:'단축키 연습: 설정과 창 분할·포커스 이동',
    description:'Ctrl+쉼표로 작업 설정에서 기본 단축키와 강사 단축키를 비교합니다. 강사의 Ctrl+Shift+백슬래시로 오른쪽 분할한 뒤 Ctrl+Alt+방향키로 강조된 창의 포커스를 옮기는 예시입니다.',
    svg:shortcutsScene(),
  },
  'git-example': {
    title:'Git 시작하기: 새 저장소와 .git 살펴보기',
    description:'새 git-practice 폴더 안의 작업 공간과 Git 기록과 설정을 보관하는 숨김 .git 폴더를 구분합니다. git init -b main으로 저장소를 만들고 PowerShell의 ls -Force로 .git를 확인하며 내부 파일은 직접 고치지 않습니다.',
    svg:diffScene(),
  },
  'git-why': {
    title:'첫 커밋: 작업 파일·스테이징·기록 구분하기',
    description:'note.txt에 저장한 version 1을 git add로 다음 기록에 넣도록 선택한 뒤 git commit으로 그 시점의 상태를 기록합니다. 작업 파일, 스테이징, 커밋을 각각 다른 공간으로 보여 줍니다.',
    svg:versionFlowScene(),
  },
  'git-diff': {
    title:'두 번째 커밋: 변경 비교와 버전 2 기록하기',
    description:'기록한 note.txt의 버전 1과 수정한 버전 2 사이의 차이를 diff로 읽고, 확인한 버전 2를 새 커밋으로 남겨 두 기록을 확인합니다.',
    svg:twoVersionsScene(),
  },
  'git-prompt': {
    title:'이전 기록에 다녀오기: 확인하고 현재로 돌아오기',
    description:'main은 최신 버전 2 커밋을 가리킨 채 HEAD가 이전 버전 1 커밋을 직접 확인하는 상태입니다. 이전 기록을 읽은 뒤 git switch main으로 HEAD를 원래 브랜치로 돌려 최신 파일을 확인하며 두 커밋은 그대로 유지됩니다.',
    svg:promptScene(),
  },
  'github-clone': {
    title:'내 메모 저장소를 GitHub에 올리기',
    description:'내 컴퓨터의 git-practice 저장소에 있는 note.txt와 버전 1·2의 커밋 기록을 push하여 GitHub 원격 저장소 origin으로 전송합니다.',
    svg:cloneScene(),
  },
  'github-roles': {
    title:'다른 폴더에서 내 저장소를 다시 clone하기',
    description:'GitHub 원격 저장소를 다른 새 폴더 git-practice-clone으로 clone하고 note.txt와 두 커밋 기록을 확인합니다.',
    svg:remoteRolesScene(),
  },
  'terminal-bonus': {
    title:'보충 노트: 파이프와 명령을 읽는 방법',
    description:'PowerShell의 Get-ChildItem -File 결과가 파이프를 통해 Select-Object Name으로 전달되어 파일 이름을 보여 줍니다. ls와 select는 이 환경의 기본 별칭입니다.',
    svg:pipeScene(),
  },
  'git-bonus': {
    title:'보충: 오류 보고에 넣을 다섯 줄',
    description:'현재 폴더와 브랜치, 실행한 명령, 오류 전문과 보존할 수정 내용을 다섯 줄로 정리한 가상 보고서입니다. 토큰과 비밀번호는 지우고 공유합니다.',
    svg:errorReportScene(),
  },
};
