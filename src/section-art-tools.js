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
      + text(88,243,'explorer.exe .',{size:24,mono:true})
      + text(88,291,'ls',{size:25,fill:C.teal,mono:true,weight:750}) + text(138,291,'= Get-ChildItem',{size:18,mono:true})
      + text(88,338,'mkdir → cd',{size:24,mono:true}) + text(88,368,'New-Item · Set-Location',{size:18,mono:true,fill:C.muted})
      + text(88,410,'cd ..  ·  Tab',{size:22,mono:true,fill:C.teal}) + cursor(p,328,391))
    + arrow(p,'M402 231h29') + flow(p,'M402 231h29')
    + panel(446,108,258,176,'파일 탐색기',rect(465,165,220,41,C.white,6)
      + text(477,193,'C:\\work',{size:22,mono:true,fill:C.teal})
      + text(467,242,'Win + R → 경로 입력',{size:20}) + text(467,269,'같은 위치의 폴더',{size:20,fill:C.muted}))
    + arrow(p,'M575 296v20') + flow(p,'M575 296v20',1.3)
    + panel(446,329,258,105,'탐색기 주소창',text(575,407,'wt -d .',{size:25,anchor:'middle',mono:true,fill:C.teal,weight:750})),
    '현재 위치 확인 → 폴더 만들기 → 화면 전환');
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
    panel(49,112,207,310,'설정',text(70,191,'기본 프로필',{size:23}) + pill(70,211,164,'PowerShell 7',C.sage)
      + text(70,286,'테마 · 글꼴',{size:23}) + path('M72 311h158',C.teal,4) + circle(125,311,7,C.white)
      + key(76,354,79,'Ctrl') + key(174,354,49,','))
    + arrow(p,'M269 271h21') + flow(p,'M269 271h21')
    + panel(304,112,402,310,'한 탭 안에서 두 패널 사용',rect(325,175,170,218,C.ink,8) + rect(511,175,172,218,'#285e61',8)
      + text(345,224,'PS >',{mono:true,size:28,fill:C.white}) + text(531,224,'PS >',{mono:true,size:28,fill:C.white})
      + cursor(p,418,202,C.amber,27) + text(410,356,'현재 포커스',{size:21,anchor:'middle',fill:C.sage})
      + text(597,356,'다른 패널',{size:21,anchor:'middle',fill:C.sage})
      + `<rect x="320" y="170" width="180" height="228" rx="11" fill="none" stroke="${C.amber}" stroke-width="3.5" class="art-motion ${p}-focus"/>`)
    + text(152,462,'Ctrl + ,',{size:23,anchor:'middle',mono:true,fill:C.teal,weight:700})
    + text(504,462,'Alt + Shift + D',{size:24,anchor:'middle',mono:true,fill:C.teal,weight:700}),
    '분할 후 Alt + 방향키로 이동 · 기본 키 설정 기준');
}

function diffScene() {
  const p='section-git-example';
  return scene(p,'화면이 바뀌면, 변경한 줄부터 확인',
    panel(63,109,619,282,'index.html · 변경 비교',rect(84,172,577,69,C.paleRed,7,'stroke="none"')
      + text(104,216,'− 코딩 노트',{size:27,fill:C.red,weight:650}) + rect(84,257,577,69,'#dce9d4',7,'stroke="none"')
      + text(104,301,'+ 돌범의 코딩 기초',{size:27,fill:C.teal,weight:750})
      + `<rect x="84" y="257" width="577" height="69" rx="7" fill="none" stroke="${C.teal}" stroke-width="3" class="art-motion ${p}-focus"/>`
      + text(105,368,'무엇을 바꿨는지 먼저 읽습니다.',{size:22,fill:C.muted}))
    + document(76,418,52,64,C.white) + text(150,449,'README',{mono:true,size:24,weight:700})
    + text(150,480,'별도로 하던 작업은 보존',{size:21,fill:C.muted}) + circle(617,451,33,C.sage) + check(617,451,1.4),
    '제목 변경을 검토하고, 다른 수정은 섞지 않기');
}

function versionFlowScene() {
  const p='section-git-why';
  return scene(p,'로컬 기록과 원격 협업은 다른 단계',
    rect(41,110,475,319,C.paper,15,'stroke-dasharray="8 7"') + text(279,150,'내 컴퓨터 · Git',{size:26,anchor:'middle',weight:750})
    + document(76,224,71,94) + text(113,381,'저장',{size:23,anchor:'middle',weight:700})
    + arrow(p,'M163 274h47') + flow(p,'M163 274h47') + document(233,207,66,83)
    + `<path d="M220 269h96l-9 54h-78Z" fill="${C.sage}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/>`
    + path('M225 283h87',C.white,2) + text(268,381,'선택',{size:23,anchor:'middle',weight:700})
    + arrow(p,'M330 274h39') + flow(p,'M330 274h39',1) + commit(419,266,'커밋',31)
    + arrow(p,'M462 274h91') + flow(p,'M462 274h91',2) + text(523,246,'push',{size:22,anchor:'middle',mono:true,fill:C.teal,weight:700})
    + panel(569,176,143,153,'GitHub',path('M590 242h99M590 270h99M590 298h99',C.teal,9)
      + circle(600,242,4,C.white) + circle(600,270,4,C.white) + circle(600,298,4,C.white),{titleSize:22})
    + arrow(p,'M640 344v28') + rect(569,387,143,52,C.sage,8) + text(641,422,'PR · 검토',{size:22,anchor:'middle',weight:750}),
    'Git은 변경 기록 · GitHub는 원격 보관과 검토');
}

function promptScene() {
  const p='section-git-prompt';
  return scene(p,'작게 요청하고, 확인한 뒤 기록',
    panel(58,120,283,305,'Codex 요청 카드',
      text(83,206,'01',{mono:true,size:21,fill:C.teal,weight:750}) + text(127,206,'변경 목표',{size:24,weight:700})
      + text(83,267,'02',{mono:true,size:21,fill:C.teal,weight:750}) + text(127,267,'기존 작업 보존',{size:24,weight:700})
      + text(83,328,'03',{mono:true,size:21,fill:C.teal,weight:750}) + text(127,328,'확인 방법',{size:24,weight:700})
      + path('M83 356h234',C.line,1.7) + text(83,394,'수정 → 검사 → 커밋',{size:22,fill:C.muted}))
    + arrow(p,'M355 267h25') + flow(p,'M355 267h25') + circle(440,267,43,C.sage) + check(440,267,1.7)
    + text(440,356,'검증',{size:25,anchor:'middle',weight:700}) + arrow(p,'M495 267h35') + flow(p,'M495 267h35',1.8)
    + commit(603,259,'커밋',42) + pill(387,396,281,'diff · 검사 결과 · 기록',C.paper),
    '자동화할 작업과 보존할 내용을 함께 전달');
}

function cloneScene() {
  const p='section-github-clone';
  return scene(p,'원격 저장소를 내 폴더로 가져오기',
    panel(52,118,250,230,'GitHub · 원격 저장소',
      `<path d="M111 211l61-34 70 39-61 35Z" fill="${C.sage}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/><path d="M111 211v70l70 39v-69Z" fill="${C.white}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/><path d="M181 251l61-35v70l-61 34Z" fill="${C.teal}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/>`
      + path('M127 245l35 19M127 270l35 19',C.teal,4) + circle(203,265,4,C.amber) + circle(220,255,4,C.amber),{titleSize:20})
    + arrow(p,'M319 241h84') + flow(p,'M319 241h84') + text(360,214,'clone',{mono:true,size:25,anchor:'middle',fill:C.teal,weight:750})
    + panel(424,118,280,230,'내 컴퓨터 · 작업 폴더',document(504,181,79,101) + folder(470,204,183,111)
      + text(563,299,'프로젝트',{size:23,anchor:'middle',weight:750}),{titleSize:22})
    + path('M565 361v23M369 384h304M369 384v17M521 384v17M673 384v17',C.teal,3)
    + pill(310,409,122,'README',C.paper,true) + pill(461,409,122,'진입점',C.paper) + pill(612,409,122,'데이터',C.paper),
    '받은 뒤에는 README · 시작 파일 · 데이터를 구분');
}

function remoteRolesScene() {
  const p='section-github-roles';
  return scene(p,'GitHub를 목적에 맞게 활용',
    arrow(p,'M281 195l39 42') + arrow(p,'M442 237l40-42') + arrow(p,'M272 378l53-57') + arrow(p,'M443 321l45 57')
    + flow(p,'M272 378l53-57') + flow(p,'M443 321l45 57',2)
    + panel(49,108,222,130,'프로필',circle(84,186,15,C.amber) + text(116,181,'나를 소개',{size:23,weight:650}) + text(116,213,'README',{mono:true,size:21,fill:C.teal}))
    + panel(489,108,222,130,'GitHub Pages',text(510,184,'정적 사이트 게시',{size:23,weight:650}) + text(510,215,'HTML · CSS · JS',{size:20,fill:C.teal,mono:true}))
    + `<path d="M314 235l66-37 68 38-66 37Z" fill="${C.sage}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/><path d="M314 235v66l68 38v-66Z" fill="${C.white}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/><path d="M382 273l66-37v66l-66 37Z" fill="${C.teal}" stroke="${C.ink}" stroke-width="2.8" stroke-linejoin="round"/>`
    + path('M332 267l33 18M332 289l33 18',C.teal,5) + text(381,372,'원격 저장소',{size:23,anchor:'middle',weight:750})
    + panel(49,376,222,87,'내 컴퓨터 · push',text(70,445,'변경 기록 올리기',{size:22}),{titleSize:22})
    + panel(489,376,222,87,'서버 · clone',text(510,445,'가져온 뒤 실행 준비',{size:21}),{titleSize:22}),
    '원격 보관 · 프로필 소개 · 정적 게시 · 실행 준비');
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
    title:'첫 명령: 현재 위치에서 폴더 만들고 열기',
    description:'PowerShell에서 pwd(Get-Location의 별칭)로 현재 위치를 확인하고 Win+R에 경로를 입력하거나 explorer.exe .으로 같은 폴더를 엽니다. ls로 목록을 확인한 후 mkdir과 cd로 폴더를 만들고 이동합니다. cd ..로 상위 폴더로 이동하고 Tab으로 경로를 완성해 봅니다. 탐색기 주소창의 wt -d .으로 해당 위치에서 Windows Terminal을 엽니다.',
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
    description:'Ctrl+쉼표의 설정에서 기본 프로필·테마·글꼴·작업 키를 확인하고, Alt+Shift+D로 같은 탭을 나눈 뒤 Alt+방향키로 강조된 패널의 포커스를 옮기는 구조입니다.',
    svg:shortcutsScene(),
  },
  'git-example': {
    title:'Codex 사용 예: 화면이 바뀐 뒤 확인할 것',
    description:'제목의 삭제·추가 줄을 확대해 검토하면서 별도로 남아 있는 README 작업을 보존합니다.',
    svg:diffScene(),
  },
  'git-why': {
    title:'Git을 쓰는 이유: 버전·GitHub·PR 구분',
    description:'내 컴퓨터의 저장·선택·커밋과 경계 밖 원격 전송·PR 검토를 다른 도형과 영역으로 구분합니다.',
    svg:versionFlowScene(),
  },
  'git-prompt': {
    title:'Codex에게 수정·확인·커밋을 요청하는 프롬프트',
    description:'목표·보존 조건·확인 방법이 적힌 요청서가 검증 관문과 커밋 기록으로 이어집니다.',
    svg:promptScene(),
  },
  'github-clone': {
    title:'clone 사용 예: Codex와 저장소 구조 분석하기',
    description:'원격 저장소가 로컬 폴더로 복제되고 README·진입점·데이터를 나누어 분석하는 구조입니다.',
    svg:cloneScene(),
  },
  'github-roles': {
    title:'원격 보관부터 서버·프로필·Pages까지 연결하기',
    description:'GitHub를 중심으로 내 컴퓨터의 push, 서버의 clone·실행 준비, 프로필 소개와 Pages 정적 게시를 구분합니다.',
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
