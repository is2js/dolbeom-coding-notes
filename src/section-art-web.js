// Crisp native SVG explanations: one instructional scene for every section.
// Only packets, cursors and emphasis layers move; the complete diagram stays readable.
const c = {
  ink: '#25334b', muted: '#435c62', teal: '#287d7b', sage: '#8da88f', pale: '#dce8d6',
  cream: '#f2e6ce', sand: '#d5bd92', paper: '#fffaf0', orange: '#c68b45',
  softOrange: '#f4dfbd', white: '#fffdf6', red: '#a94e48', softRed: '#f0d7ce',
};
const escapeText = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 23, color = c.ink, anchor = 'start', weight = 650, mono = false) =>
  `<text x='${x}' y='${y}' font-size='${size}' fill='${color}' text-anchor='${anchor}' font-weight='${weight}'${mono ? " font-family='Consolas,IBM Plex Mono,monospace'" : ''}>${escapeText(value)}</text>`;
const rect = (x, y, w, h, fill = c.paper, r = 10, stroke = c.ink, sw = 2.7) =>
  `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${r}' fill='${fill}' stroke='${stroke}' stroke-width='${sw}'/>`;
const path = (d, fill = 'none', stroke = c.ink, sw = 2.7) =>
  `<path d='${d}' fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'/>`;
const circle = (x, y, r = 6, fill = c.teal, stroke = c.ink, sw = 2.3) =>
  `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}' stroke='${stroke}' stroke-width='${sw}'/>`;
const pill = (x, y, w, label, fill = c.pale, size = 20) =>
  rect(x, y, w, 36, fill, 8, c.muted, 1.7) + text(x + w / 2, y + 25, label, size, c.muted, 'middle');
const code = (x, y, value, color = c.ink, size = 19) => text(x, y, value, size, color, 'start', 550, true);
const lines = (x, y, widths, fill = c.sand, gap = 15, h = 5) => widths.map((w, i) =>
  `<rect x='${x}' y='${y + i * gap}' width='${w}' height='${h}' rx='2.5' fill='${fill}'/>`).join('');
const check = (x, y, color = c.teal) => path(`M${x} ${y}l8 8 17-20`, 'none', color, 4);

function panel(x, y, w, h, label, fill = c.paper) {
  return path(`M${x + w} ${y + 8}l9 8v${h - 9}l-9 9Z`, c.sand)
    + path(`M${x} ${y + h}l9 8h${w}l-9-8Z`, c.cream)
    + rect(x, y, w, h, fill)
    + rect(x, y, w, 42, fill === c.ink ? c.muted : c.cream, 9)
    + path(`M${x} ${y + 42}h${w}`, 'none', c.ink, 2.7)
    + text(x + 17, y + 28, label, 20, fill === c.ink ? c.paper : c.ink);
}
function sheet(x, y, w, h, fill = c.paper) {
  return path(`M${x + 7} ${y + 8}h${w - 24}l24 24v${h - 24}H${x + 7}Z`, c.sand)
    + path(`M${x} ${y}h${w - 24}l24 24v${h - 24}H${x}Z`, fill)
    + path(`M${x + w - 24} ${y}v24h24`, c.cream);
}
function server(x, y, w = 135, h = 172) {
  const step = (h - 30) / 3;
  return path(`M${x} ${y}l18-12h${w}l-18 12Z`, c.pale)
    + path(`M${x + w} ${y}l18-12v${h}l-18 12Z`, c.muted)
    + rect(x, y, w, h, c.cream, 5)
    + [0, 1, 2].map(i => rect(x + 12, y + 12 + i * step, w - 24, step - 9, c.paper, 4)
      + circle(x + 27, y + 12 + i * step + (step - 9) / 2, 4.5, c.teal, c.teal)
      + lines(x + 42, y + 10 + i * step + (step - 9) / 2, [w - 67], c.sage, 0, 4)).join('');
}
function arrow(prefix, x1, y1, x2, y2, { orange = false, dashed = false, delay = 0 } = {}) {
  const color = orange ? c.orange : c.teal;
  return `<path d='M${x1} ${y1}L${x2} ${y2}' fill='none' stroke='${color}' stroke-width='3' stroke-linecap='round' ${dashed ? "stroke-dasharray='7 6'" : ''} marker-end='url(#${prefix}-${orange ? 'amber' : 'teal'}-arrow)'/>`
    + `<g class='art-motion ${prefix}-packet' style='--art-dx:${x2 - x1}px;--art-dy:${y2 - y1}px;animation-delay:${delay}s'>${circle(x1, y1, 5.5, color, c.paper, 2)}</g>`;
}
const emphasis = (prefix, body, delay = 0) => `<g class='art-motion ${prefix}-emphasis' style='animation-delay:${delay}s'>${body}</g>`;
function frame(prefix, heading, body, caption) {
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 550' class='topic-art-svg section-art-svg ${prefix}' aria-hidden='true' focusable='false'>
    <defs>
      <marker id='${prefix}-teal-arrow' viewBox='0 0 12 12' refX='10' refY='6' markerWidth='9' markerHeight='9' orient='auto' markerUnits='userSpaceOnUse'><path d='M2 2L10 6L2 10' fill='none' stroke='${c.teal}' stroke-width='2.3' stroke-linecap='round' stroke-linejoin='round'/></marker>
      <marker id='${prefix}-amber-arrow' viewBox='0 0 12 12' refX='10' refY='6' markerWidth='9' markerHeight='9' orient='auto' markerUnits='userSpaceOnUse'><path d='M2 2L10 6L2 10' fill='none' stroke='${c.orange}' stroke-width='2.3' stroke-linecap='round' stroke-linejoin='round'/></marker>
    </defs>
    <style>
      @keyframes ${prefix}-packet{0%,10%{transform:translate(0,0);opacity:0}18%,76%{opacity:1}94%,100%{transform:translate(var(--art-dx),var(--art-dy));opacity:0}}
      @keyframes ${prefix}-emphasis{0%,12%,100%{opacity:.2}35%,70%{opacity:1}}
      .${prefix} .${prefix}-packet{animation:${prefix}-packet 5.2s ease-in-out infinite}
      .${prefix} .${prefix}-emphasis{animation:${prefix}-emphasis 5.2s ease-in-out infinite}
      @media(prefers-reduced-motion:reduce){.${prefix} .art-motion{animation:none!important}}
    </style>
    <path d='M61 465h637' stroke='${c.sand}' stroke-width='1.4'/>
    <g font-family='Pretendard Variable,Pretendard,Malgun Gothic,system-ui,sans-serif' stroke-linejoin='round'>
      ${text(380, 53, heading, 27, c.ink, 'middle', 750)}
      ${body}
      ${text(380, 512, caption, 22, c.muted, 'middle', 550)}
    </g>
  </svg>`;
}

function structuredPrompt() {
  const p = 'sa-markdown-map';
  return frame(p, 'Codex 계획문으로 문법 연습', `
    ${panel(46, 105, 292, 282, 'Markdown 원문')}
    ${code(67, 185, '## 계획', c.ink, 24)}
    ${code(67, 233, '- 문서 작성', c.teal, 22)}
    ${code(67, 280, '**중요**', c.orange, 22)}
    ${code(67, 326, '[가이드](주소)', c.muted, 19)}
    ${arrow(p, 350, 245, 395, 245)}
    ${panel(405, 105, 308, 282, '읽는 화면')}
    ${text(430, 190, '계획', 28)}${path('M430 205h242', 'none', c.sand, 2)}
    ${circle(438, 242, 4, c.teal, c.teal)}${text(453, 250, '문서 작성', 23, c.muted)}
    ${text(430, 297, '중요', 25, c.ink)}${text(430, 344, '가이드', 22, c.teal)}
    ${path('M430 351h76', 'none', c.teal, 2)}${emphasis(p, rect(422, 217, 256, 47, 'none', 5, c.teal, 3))}
    ${pill(182, 414, 396, '제목 · 목록 · 강조 · 링크', c.pale, 21)}
  `, '계획문의 문법이 화면에 어떻게 보이는지 비교합니다');
}

function typoraImageFlow() {
  const p = 'sa-markdown-typora-images';
  return frame(p, '이미지와 문서를 함께 공유하기', `
    ${panel(36, 146, 168, 178, '클립보드')}
    ${rect(58, 207, 124, 91, c.pale, 5)}${circle(151, 230, 9, c.softOrange, c.orange, 2)}
    ${path('M68 281l28-30 21 18 17-18 38 30Z', c.sage, c.teal, 2.5)}
    ${arrow(p, 211, 228, 239, 228)}${pill(47, 344, 150, 'Ctrl + V', c.pale, 20)}
    ${panel(249, 105, 266, 281, 'Typora · 내 프로젝트')}
    ${rect(268, 164, 225, 82, c.white, 5, c.muted, 1.8)}
    ${code(282, 191, 'README.md', c.ink, 21)}${code(282, 218, '![이미지](assets/...)', c.teal, 18)}
    ${path('M270 286v-17h79l10 11h133v66H270Z', c.softOrange, c.ink, 2.5)}
    ${text(285, 312, 'assets/', 22, c.ink, 'start', 650, true)}${text(285, 339, '이미지 파일', 20, c.muted)}
    ${arrow(p, 523, 228, 556, 228, {orange:true,delay:1})}
    ${panel(565, 146, 155, 178, 'GitHub')}
    ${sheet(587, 210, 55, 73, c.paper)}${text(595, 255, 'MD', 19, c.teal, 'start', 700, true)}
    ${rect(653, 210, 43, 73, c.pale, 4)}${path('M660 266l10-13 7 8 7-10 7 15', 'none', c.teal, 2)}
    ${pill(555, 344, 178, 'commit · push', c.softOrange, 18)}
    ${emphasis(p, rect(267, 266, 228, 83, 'none', 6, c.teal, 3))}
  `, '이미지는 로컬에 저장하고 Git으로 함께 올립니다');
}

function readmeSections() {
  const p = 'sa-tools-markdown';
  return frame(p, 'README에 프로젝트를 소개합니다', `
    ${panel(43, 105, 308, 283, 'README.md · 원문')}
    ${sheet(65, 165, 260, 189, c.white)}
    ${code(82, 198, '# Git 연습 메모', c.ink, 21)}
    ${code(82, 234, '## 소개', c.teal, 19)}
    ${code(82, 268, '## 준비', c.orange, 19)}
    ${code(82, 302, '## 확인 방법', c.teal, 19)}
    ${lines(82, 316, [182, 142], c.sand, 13, 4)}
    ${arrow(p, 362, 250, 400, 250)}
    ${panel(412, 105, 305, 283, '차례대로 채우기')}
    ${rect(431, 170, 267, 54, c.pale, 7, c.teal, 2)}
    ${text(448, 204, '01', 18, c.teal, 'start', 700, true)}${text(494, 204, '프로젝트 소개', 21)}
    ${rect(431, 235, 267, 54, c.cream, 7, c.sand, 2)}
    ${text(448, 269, '02', 18, c.orange, 'start', 700, true)}${text(494, 269, '준비할 것', 21)}
    ${rect(431, 300, 267, 54, c.pale, 7, c.teal, 2)}
    ${text(448, 334, '03', 18, c.teal, 'start', 700, true)}${text(494, 334, '확인 방법', 21)}
    ${emphasis(p, rect(426, 165, 277, 64, 'none', 8, c.teal, 3))}
    ${pill(190, 420, 380, '제목 · 목록 · 링크 · 표', c.pale, 21)}
  `, '소개와 준비, 확인 방법을 한 문서에 담습니다');
}

function readmeToGithub() {
  const p = 'sa-markdown-readme-push';
  return frame(p, 'README를 작성해 GitHub에서 보기', `
    ${panel(36, 111, 224, 282, '내 복제본')}
    ${path('M59 200v-17h63l10 12h105v117H59Z', c.softOrange, c.ink, 2.5)}
    ${sheet(79, 166, 142, 132, c.paper)}
    ${code(91, 199, 'README.md', c.teal, 19)}
    ${text(91, 229, '# 연습 메모', 19, c.ink)}
    ${lines(92, 246, [107, 83, 98], c.sand, 14, 5)}
    ${pill(54, 333, 188, 'git-practice-clone', c.pale, 16)}
    ${arrow(p, 267, 249, 292, 249)}
    ${panel(302, 135, 158, 230, 'Git 기록')}
    ${rect(318, 201, 126, 55, c.paper, 6, c.muted, 2)}
    ${text(381, 235, 'add', 22, c.ink, 'middle', 700, true)}
    ${rect(318, 272, 126, 55, c.pale, 6, c.teal, 2)}
    ${text(381, 306, 'commit', 22, c.ink, 'middle', 700, true)}
    ${arrow(p, 468, 249, 495, 249, {delay:1.2})}
    ${panel(505, 111, 219, 282, 'GitHub 저장소')}
    ${rect(523, 170, 183, 172, c.white, 6, c.muted, 1.8)}
    ${text(539, 204, 'README.md', 19, c.teal, 'start', 700, true)}
    ${path('M537 218h154', 'none', c.sand, 2)}
    ${text(539, 251, 'Git 연습 메모', 21, c.ink, 'start', 700)}
    ${lines(539, 272, [137, 116, 130], c.sage, 15, 5)}
    ${emphasis(p, check(670, 325))}
    ${pill(154, 421, 452, '작성 → 커밋 → push → 화면 확인', c.pale, 20)}
  `, '복제본에서 쓴 README를 GitHub에서 확인합니다');
}

function readmeFetchAndPull() {
  const p = 'sa-markdown-readme-fetch';
  return frame(p, '원격의 새 기록을 다른 복제본에서 확인', `
    ${panel(36, 116, 200, 264, 'GitHub · 원격')}
    ${sheet(79, 184, 105, 132, c.white)}
    ${code(91, 217, 'README.md', c.teal, 16)}
    ${lines(91, 239, [75, 61, 70], c.sage, 15, 5)}
    ${pill(54, 333, 166, '새 커밋', c.pale, 20)}
    ${arrow(p, 243, 246, 278, 246)}
    ${panel(288, 116, 184, 264, '원격 추적 기록')}
    ${rect(307, 181, 146, 132, c.white, 7, c.muted, 2)}
    ${text(380, 217, 'origin/main', 20, c.teal, 'middle', 700, true)}
    ${text(380, 256, '새 기록 확인', 20, c.ink, 'middle')}
    ${text(380, 287, '파일은 그대로', 18, c.muted, 'middle')}
    ${pill(306, 333, 148, '① fetch', c.pale, 20)}
    ${arrow(p, 479, 246, 514, 246, {orange:true,delay:1.2})}
    ${panel(524, 116, 200, 264, '다른 복제 폴더')}
    ${path('M548 204v-17h54l10 12h87v112H548Z', c.softOrange, c.ink, 2.5)}
    ${sheet(570, 176, 105, 127, c.paper)}
    ${code(580, 211, 'README.md', c.teal, 16)}
    ${lines(581, 232, [73, 59, 68], c.sage, 14, 5)}
    ${emphasis(p, check(659, 291))}
    ${pill(542, 333, 164, '② pull 반영', c.softOrange, 19)}
    ${pill(154, 414, 452, 'fetch로 확인 → pull로 작업 폴더에 반영', c.pale, 19)}
  `, 'clone은 처음 한 번 · 기존 폴더는 fetch와 pull');
}

function markdownBranches() {
  const p = 'sa-markdown-code';
  return frame(p, '같은 문법, 다른 편집 경험', `
    ${sheet(282, 197, 191, 230)}${code(304, 250, '# 노트', c.ink, 25)}${code(304, 291, '- 목록', c.muted, 22)}${code(304, 332, '[링크]', c.muted, 22)}
    ${pill(303, 362, 142, 'Markdown', c.pale, 19)}
    ${panel(55, 105, 205, 170, 'Notion')}${rect(76, 167, 163, 30, c.pale, 4, c.muted, 1.7)}
    ${rect(76, 210, 97, 30, c.cream, 4, c.muted, 1.7)}${rect(185, 210, 54, 30, c.softOrange, 4, c.muted, 1.7)}
    ${panel(503, 105, 205, 170, 'Obsidian')}
    ${path('M536 217l65-40 65 45m-65-45 3 63m-68-23 68 23 62-18', 'none', c.teal, 3)}
    ${[[536,217],[601,177],[666,222],[604,240]].map(([x,y])=>circle(x,y,8,c.pale)).join('')}
    ${arrow(p, 284, 253, 249, 285)}${arrow(p, 472, 253, 507, 285, {delay:1.1})}
    ${text(158, 327, '블록으로 편집', 22, c.muted, 'middle')}${text(606, 327, '노트를 연결', 22, c.muted, 'middle')}
    ${emphasis(p, rect(294, 223, 152, 126, 'none', 4, c.orange, 3))}
  `, '공통 핵심 문법과 앱별 확장을 나누어 확인합니다');
}

function reviewDiff() {
  const p = 'sa-tools-map';
  return frame(p, '변경한 코드에서 세 가지 확인', `
    ${panel(58, 100, 641, 300, 'PyCharm · 변경 비교')}
    ${path('M378 143v256', 'none', c.muted, 2)}
    ${text(80, 180, '변경 전', 23)}${text(400, 180, '변경 후', 23)}
    ${rect(79, 200, 277, 53, c.softRed, 5, c.red, 2)}${text(94, 234, '− 제목: 터미널', 23, c.red)}
    ${rect(400, 200, 277, 53, c.pale, 5, c.teal, 2)}${text(415, 234, '+ 윈도우 터미널', 23, c.teal)}
    ${code(94, 294, 'id: terminal', c.muted, 23)}${code(415, 294, 'id: terminal', c.muted, 23)}
    ${lines(94, 318, [226,191], c.sand, 21)}${lines(415, 318, [226,191], c.sand, 21)}
    ${[0,1,2].map(i=>pill(90+i*219,423,200,['01 경로','02 차이','03 실행'][i],i===1?c.pale:c.cream,22)).join('')}
    ${emphasis(p, rect(397,197,283,59,'none',6,c.teal,4))}
  `, '바뀐 줄을 읽고, 유지할 ID와 실행 결과도 확인합니다');
}

function vscodeFinding() {
  const p = 'sa-tools-vscode';
  const items = [['Ctrl + P', '파일 이름', c.cream], ['Ctrl + Shift + F', '프로젝트 내용', c.pale], ['Ctrl + Shift + P', '기능 이름', c.softOrange]];
  return frame(p, '단축키는 찾을 대상에 맞게', `
    ${items.map(([key,label,fill],i)=>{const y=101+i*110; return rect(62,y,293,85,fill,9) + code(82,y+33,key,c.ink,23) + text(82,y+65,label,21,c.muted) + arrow(p,365,y+43,404,y+43,{delay:i*.8});}).join('')}
    ${panel(416, 101, 284, 306, 'VS Code')}
    ${rect(438,166,241,50,c.pale,6,c.teal,2)}${text(452,199,'README.md',24,c.ink)}
    ${rect(438,234,241,50,c.paper,6,c.muted,2)}${text(452,267,'문구 검색 결과',22,c.muted)}
    ${rect(438,302,241,50,c.paper,6,c.muted,2)}${text(452,335,'명령 팔레트',22,c.muted)}
    ${emphasis(p, path('M657 179v25', 'none', c.orange, 4))}
  `, '파일 · 내용 · 명령을 구별하면 찾기가 빨라집니다');
}

function pycharmEnvironment() {
  const p = 'sa-tools-pycharm';
  return frame(p, '실행 환경과 단축키 설정 구별하기', `
    ${panel(210,88,340,91,'PyCharm',c.pale)}${text(380,159,'프로젝트 작업실',23,c.muted,'middle')}
    ${arrow(p,279,190,227,232)}${arrow(p,481,190,534,232,{delay:.9})}
    ${panel(60,244,304,176,'인터프리터')}${code(80,315,'Python 실행 파일',c.ink,22)}
    ${text(80,354,'실행할 Python',23,c.muted)}${text(80,391,'작업 폴더도 확인',22,c.muted)}
    ${panel(410,244,287,176,'VSCode 키맵')}
    ${rect(438,306,94,48,c.cream,6)}${code(455,337,'Ctrl',c.ink,22)}
    ${rect(547,306,119,48,c.cream,6)}${text(606,337,'단축키',23,c.ink,'middle')}
    ${text(553,391,'조작 방법을 연결',22,c.muted,'middle')}
    ${emphasis(p, check(324,390))}
  `, '실행할 환경과 익숙한 키 배치는 서로 다른 설정입니다');
}

function integratedWorkbench() {
  const p = 'sa-codex-context';
  return frame(p, '한 프로젝트를 여러 도구로 확인', `
    ${panel(258,184,245,140,'같은 프로젝트',c.pale)}${path('M285 257h66l14 15h108v31H285Z',c.cream)}
    ${panel(58,97,191,112,'README.md')}${lines(77,163,[148,118],c.sand,17)}
    ${panel(518,97,183,112,'Git diff')}${rect(536,159,146,12,c.softRed,3,c.red,1)}${rect(536,182,146,12,c.pale,3,c.teal,1)}
    ${panel(58,330,228,110,'PowerShell',c.ink)}${code(78,403,'> 현재 경로',c.pale,22)}
    ${panel(495,330,206,110,'GitHub')}${path('M523 405l36-17 35 17 35-17 36 17','none',c.teal,3)}
    ${[[523,405],[559,388],[594,405],[629,388],[665,405]].map(([x,y])=>circle(x,y,5,c.pale)).join('')}
    ${arrow(p,249,166,277,184)}${arrow(p,518,166,491,184,{delay:.7})}
    ${arrow(p,287,330,319,315,{delay:1.4})}${arrow(p,496,330,465,315,{delay:2.1})}
  `, '문서 · 경로 · 변경 · 원격의 맥락을 연결합니다');
}

function htmlCardPractice() {
  const p='sa-tools-html';
  return frame(p,'HTML · 구조와 화면을 연결하기',`
    ${panel(49,97,338,314,'VS Code · index.html',c.ink)}
    ${code(68,176,'<article>',c.pale,21)}${code(83,220,'<h1>Git</h1>',c.paper,22)}
    ${code(83,263,'<button>설명 보기</button>',c.paper,18)}
    ${code(83,303,'<p>변경을 확인하고',c.paper,19)}${code(83,332,'기록합니다.</p>',c.paper,19)}
    ${code(68,380,'</article>',c.pale,21)}
    ${panel(432,97,274,314,'브라우저 화면')}${text(454,195,'Git',34)}
    ${rect(454,222,141,45,c.cream,6)}${text(525,251,'설명 보기',22,c.ink,'middle')}
    ${text(454,314,'변경을 확인하고',21,c.muted)}${text(454,346,'기록합니다.',21,c.muted)}
    ${arrow(p,395,243,422,243)}
    ${pill(65,429,184,'h1 · 제목',c.pale,21)}${pill(289,429,184,'button · 버튼',c.cream,20)}${pill(513,429,184,'p · 설명',c.pale,21)}
  `,'제목 · 버튼 · 설명이 같은 순서로 화면에 놓입니다');
}

function cssCardPractice() {
  const p='sa-tools-css';
  return frame(p,'CSS · 내용에 모양 더하기',`
    ${panel(53,99,318,303,'style.css')}${code(74,180,'.card {',c.ink,23)}
    ${code(91,224,'padding: 24px;',c.teal,23)}${code(91,266,'background: white;',c.muted,21)}
    ${code(91,308,'border-radius: 12px;',c.muted,20)}${code(74,364,'}',c.ink,23)}
    ${panel(430,99,274,303,'같은 Git 카드',c.pale)}${rect(450,169,236,207,c.white,12)}
    ${text(474,212,'Git',32)}${rect(474,234,145,43,c.teal,7,c.teal)}${text(546,263,'설명 보기',22,c.paper,'middle')}
    ${text(474,316,'변경을 확인하고',21,c.muted)}${text(474,347,'기록합니다.',21,c.muted)}
    ${arrow(p,383,248,418,248)}
    ${emphasis(p,path('M451 188h23m-23-7v14m23-14v14','none',c.orange,4))}
    ${pill(447,426,242,'24px 안쪽 여백',c.softOrange,22)}
  `,'같은 구조에서 색 · 여백 · 모서리가 달라집니다');
}

function javascriptCardPractice() {
  const p='sa-tools-javascript';
  return frame(p,'JavaScript · 클릭하면 상태가 바뀝니다',`
    ${panel(46,96,350,311,'script.js · 핵심 코드',c.ink)}
    ${code(62,173,'button.addEventListener(',c.pale,19)}${code(75,207,"'click', () => {",c.paper,20)}
    ${code(75,251,'const isHidden = detail.hidden;',c.paper,18)}${code(75,288,'detail.hidden = !isHidden;',c.paper,18)}
    ${code(75,361,'});',c.pale,21)}
    ${panel(438,96,268,140,'누르기 전')}${text(459,175,'Git',29)}${pill(523,149,158,'설명 보기',c.cream,20)}
    ${text(459,215,'설명 접힘',21,c.muted)}
    ${panel(438,277,268,130,'누른 뒤',c.pale)}${text(459,352,'Git',28)}
    ${text(513,350,'변경을 확인하고',20,c.muted)}${text(513,381,'기록합니다.',20,c.muted)}
    ${arrow(p,405,251,430,251)}${arrow(p,569,244,569,266,{orange:true,delay:1})}
    ${emphasis(p,rect(505,323,184,67,'none',5,c.teal,3))}
    ${pill(89,429,235,'click · hidden 변경',c.cream,21)}${pill(470,429,209,'접힘 ↔ 펼침',c.pale,22)}
  `,'버튼을 다시 누르면 설명을 숨깁니다');
}

function localAndRemote() {
  const p='sa-web-map';
  return frame(p,'서버가 실행되는 컴퓨터 찾기',`
    ${panel(54,108,295,308,'로컬 · 내 PC',c.pale)}${panel(418,108,288,308,'원격 · 다른 컴퓨터',c.cream)}
    ${panel(75,180,175,115,'브라우저')}${rect(94,237,137,36,c.pale,4,c.muted,1.7)}
    ${server(269,232,48,110)}${text(280,381,'서버',22,c.muted,'middle')}
    ${server(498,186,125,178)}
    ${arrow(p,257,211,482,211)}${arrow(p,482,252,356,252,{orange:true,delay:1.3})}
    ${text(382,188,'요청',22,c.teal,'middle')}${text(381,282,'응답',22,c.orange,'middle')}
    ${text(201,445,'localhost',23,c.muted,'middle')}${text(563,445,'접속 가능한 주소',23,c.muted,'middle')}
  `,'같은 프로그램도 실행 위치에 따라 주소가 달라집니다');
}

function webResponsibilities() {
  const p='sa-web-http';
  return frame(p,'화면과 요청 처리의 역할',`
    ${panel(52,104,279,220,'브라우저')}${text(75,182,'프론트엔드',29)}${text(75,226,'React · Svelte',23,c.muted)}
    ${pill(74,265,234,'화면 · 상호작용',c.pale,22)}
    ${server(501,141,145,174)}${text(573,111,'백엔드',29,c.ink,'middle')}
    ${text(573,356,'FastAPI · Spring',23,c.muted,'middle')}
    ${arrow(p,345,180,481,180)}${arrow(p,481,233,345,233,{orange:true,delay:1})}
    ${text(412,157,'요청',21,c.teal,'middle')}${text(412,269,'HTML / JSON',19,c.muted,'middle')}
    ${pill(74,374,282,'정적 파일도 프론트엔드',c.cream,21)}
    ${rect(497,394,182,52,c.cream,10)}${text(588,428,'DB · 선택',23,c.muted,'middle')}
    ${arrow(p,588,364,588,383,{dashed:true,delay:1.7})}
  `,'역할의 구분이며 서버 두 대가 항상 필요한 것은 아닙니다');
}

function serverToBrowser() {
  const p='sa-web-html';
  return frame(p,'서버의 HTML이 브라우저 화면으로',`
    ${panel(53,104,239,300,'서버 · Jinja2',c.pale)}${rect(73,173,198,77,c.paper,7)}
    ${text(172,206,'템플릿',23,c.ink,'middle')}${code(94,235,'{{ title }}',c.teal,22)}
    ${text(172,285,'+',31,c.muted,'middle')}${rect(73,306,198,66,c.cream,7)}${text(172,346,'데이터: Git',24,c.ink,'middle')}
    ${sheet(332,188,117,172)}${text(391,232,'HTML',25,c.ink,'middle')}${code(348,271,'<h2>',c.teal,22)}${text(390,322,'Git',28,c.ink,'middle')}
    ${panel(495,145,209,233,'브라우저')}${rect(515,210,168,143,c.paper,8)}
    ${text(538,256,'Git',33)}${text(538,296,'35분',23,c.muted)}
    ${arrow(p,301,248,323,248)}${arrow(p,457,248,485,248,{delay:1.1})}
    ${pill(62,425,224,'HTML 생성',c.pale,22)}${pill(494,425,210,'해석 · 화면 표시',c.cream,21)}
  `,'템플릿 처리와 화면 그리기는 다른 단계입니다');
}

function templateEngines() {
  const p='sa-web-jinja';
  return frame(p,'템플릿에 같은 데이터를 넣어 보기',`
    ${pill(246,94,268,'데이터 · title: Git',c.softOrange,24)}
    ${arrow(p,299,141,219,182)}${arrow(p,463,141,545,182,{delay:.8})}
    ${panel(59,192,294,196,'Jinja2',c.pale)}${code(94,279,'{{ title }}',c.ink,27)}${code(94,339,'default(값)',c.muted,24)}
    ${panel(408,192,294,196,'Django Template',c.cream)}${code(443,279,'{{ title }}',c.ink,27)}${code(443,339,'default:값',c.muted,24)}
    ${arrow(p,204,398,204,422,{delay:1.5})}${arrow(p,555,398,555,422,{delay:2})}
    ${pill(94,429,224,'HTML · Git',c.paper,24)}${pill(443,429,224,'HTML · Git',c.paper,24)}
    ${emphasis(p,check(321,259))}
  `,'이번 실습은 FastAPI와 Jinja2를 조합합니다');
}

function cardLayers() {
  const p='sa-frontend-css';
  return frame(p,'같은 CSS를 다른 방식으로 표현',`
    ${panel(53,104,303,141,'CSS 속성')}${code(74,184,'padding: 24px;',c.teal,23)}${code(74,222,'border-radius: .75rem;',c.muted,19)}
    ${panel(53,293,303,117,'Tailwind 클래스',c.cream)}${code(74,375,'p-6  rounded-xl',c.teal,24)}
    ${panel(438,142,267,254,'같은 Git 카드',c.pale)}${rect(458,210,227,161,c.paper,12)}${text(482,253,'Git',32)}
    ${rect(482,269,142,41,c.teal,7,c.teal)}${text(553,297,'설명 보기',21,c.paper,'middle')}
    ${text(482,345,'변경을 기록',19,c.muted)}
    ${arrow(p,368,193,426,248)}${arrow(p,368,355,426,315,{delay:1.1})}
    ${emphasis(p,path('M459 230h23m-23-7v14m23-14v14','none',c.orange,4))}
    ${pill(474,425,199,'여백 · 모서리',c.cream,22)}
  `,'Tailwind도 CSS를 적용해 같은 모양을 만듭니다');
}

function alpineStateGraph() {
  const p='sa-frontend-alpine';
  return frame(p,'클릭 → 상태 → 화면 표시',`
    ${panel(242,94,277,121,'x-data',c.pale)}${code(269,180,'open: false ↔ true',c.teal,24)}
    ${panel(56,284,288,143,'@click',c.cream)}${code(82,374,'open = !open',c.ink,25)}
    ${panel(418,284,287,143,'x-show',c.paper)}${rect(440,347,243,54,c.pale,7,c.teal,2)}${text(561,382,'설명 표시',25,c.ink,'middle')}
    ${arrow(p,232,271,302,225)}${arrow(p,479,225,548,271,{delay:1.1})}
    ${text(172,246,'클릭 이벤트',22,c.muted,'middle')}${text(591,246,'현재 상태',22,c.muted,'middle')}
    ${emphasis(p,rect(438,345,247,58,'none',7,c.teal,4),1.7)}
    ${path('M93 382l-7 28 13-5 8 14 8-4-8-14 13-5Z',c.orange,c.ink,2.2)}
  `,'서버 템플릿 위에 브라우저의 작은 동작을 더합니다');
}

function reusablePrompt() {
  const p='sa-codex-bonus';
  return frame(p,'다음 작업에 다시 쓰는 요청 카드',`
    ${sheet(66,102,344,323)}${text(91,149,'# 작업 카드',27)}
    ${[['문제와 원하는 동작',c.pale],['프로젝트 · 관련 파일',c.cream],['유지할 기술 · 변경',c.softOrange],['검증 명령 · 입력 결과',c.pale]].map(([label,fill],i)=>rect(88,169+i*57,293,43,fill,6,c.muted,1.8)+text(101,198+i*57,label,22)).join('')}
    ${panel(479,154,223,231,'다음 요청')}${text(500,235,'실제 맥락으로',24)}${text(500,272,'빈칸 바꾸기',24)}
    ${pill(498,311,184,'복사 → 수정',c.pale,22)}
    ${arrow(p,422,270,467,270)}${emphasis(p,check(661,359))}
  `,'문제 · 맥락 · 보존 조건 · 확인을 함께 전달합니다');
}

function environmentParity() {
  const p='sa-tools-bonus';
  const labels=['스크립트 경로','Python 실행 파일','작업 폴더'];
  return frame(p,'실행 버튼과 터미널의 기준 맞추기',`
    ${panel(53,113,293,283,'PyCharm 실행 설정',c.pale)}${panel(414,113,291,283,'PowerShell',c.ink)}
    ${labels.map((label,i)=>{const y=183+i*72;return text(75,y,label,23)+lines(76,y+15,[238],c.sage,0,5)+text(435,y,label,23,c.paper)+lines(435,y+15,[237],c.sage,0,5)+arrow(p,359,y-6,400,y-6,{delay:i*.8});}).join('')}
    ${pill(115,425,534,'.venv / Scripts / python.exe',c.cream,24)}
  `,'실행 파일 · 스크립트 · 작업 위치를 같은 기준으로 봅니다');
}

function addressAndBuild() {
  const p='sa-web-bonus';
  return frame(p,'주소의 경로와 브라우저 해시 구별',`
    ${panel(53,100,652,132,'브라우저 주소')}${code(77,187,'/notes/   #/lesson/terminal',c.ink,29)}
    ${path('M77 207h139m44 0h369','none',c.teal,4)}
    ${arrow(p,147,246,147,277)}${arrow(p,483,246,483,277,{orange:true,delay:1})}
    ${panel(55,289,244,124,'서버로 요청')}${code(78,374,'/notes/',c.teal,29)}
    ${panel(362,289,342,124,'브라우저가 읽는 fragment',c.softOrange)}${code(385,374,'#/lesson/terminal',c.ink,24)}
    ${pill(86,430,589,'원본 src → 빌드 → 배포 파일',c.cream,23)}
  `,'# 뒤의 fragment는 HTTP 요청에 전송되지 않습니다');
}

function completeClassNames() {
  const p='sa-frontend-bonus';
  return frame(p,'Tailwind 3 · 완전한 클래스 문자열',`
    ${panel(54,103,302,176,'소스에서 확인',c.cream)}${code(76,182,'bg-${color}-500',c.red,25)}
    ${text(76,225,'결과 문자열이 없음',22,c.red)}${path('M77 242h252','none',c.red,3)}
    ${panel(407,103,299,176,'상태별 매핑',c.pale)}${code(429,181,'bg-teal-500',c.teal,25)}${code(429,225,'bg-slate-500',c.teal,25)}
    ${panel(188,332,384,98,'content 경로 확인')}${code(211,408,'./templates/**/*.html',c.ink,24)}
    ${arrow(p,555,291,491,322,{delay:.9})}${emphasis(p,check(663,250))}
  `,'실제 템플릿과 완전한 클래스가 빌드 대상에 있어야 합니다');
}

export const webSectionScenes = {
  'markdown-map': {title:'Codex 계획문으로 마크다운 문법 연습하기',description:'Codex 계획문의 제목, 목록, 강조와 링크 원문을 읽는 화면과 나란히 비교해 마크다운 문법을 연습합니다.',svg:structuredPrompt()},
  'markdown-typora-images': {title:'Typora로 이미지 붙여넣기와 GitHub에 올리기',description:'클립보드 이미지를 Typora에서 붙여넣어 프로젝트의 assets 폴더에 저장하고 README에서 참조한 뒤, 문서와 이미지를 Git으로 GitHub에 함께 올리는 과정을 구분합니다.',svg:typoraImageFlow()},
  'tools-markdown': {title:'README.md 항목별로 작성하기',description:'git-practice-clone 복제본의 README.md에 프로젝트 소개, 준비할 것, 확인 방법을 제목과 목록 등 Markdown 문법으로 나누어 작성합니다.',svg:readmeSections()},
  'markdown-readme-push': {title:'작성한 README를 GitHub에 push하고 확인하기',description:'git-practice-clone 복제본에서 README.md를 Git으로 add와 commit한 뒤 push합니다. GitHub 저장소 화면에 제목과 목록이 보이는지 확인합니다.',svg:readmeToGithub()},
  'markdown-readme-fetch': {title:'다른 clone 폴더에서 원격 변경 가져오기',description:'GitHub 원격 저장소의 새 README 커밋을 fetch로 원격 추적 기록에 가져와 확인하고, 이미 복제한 다른 폴더에서 pull로 작업 파일에 반영합니다. clone은 새 폴더를 처음 만드는 명령입니다.',svg:readmeFetchAndPull()},
  'markdown-code': {title:'공통 핵심 문법을 배우고 Notion·Obsidian의 차이 확인하기',description:'하나의 Markdown 문서에서 Notion의 블록 편집과 Obsidian의 노트 연결로 갈라지는 구조로 공통 문법과 앱별 확장을 설명합니다.',svg:markdownBranches()},
  'tools-map': {title:'Codex 변경을 PyCharm에서 확인하는 세 가지 질문',description:'변경 전후 문서의 제목 차이와 그대로인 ID를 비교하고 경로·차이·실행의 세 확인 지점을 짚습니다.',svg:reviewDiff()},
  'tools-vscode': {title:'무료 VS Code에서 필수 단축키로 찾아보기',description:'입체 키캡의 파일 이름 검색과 프로젝트 내용 검색을 서로 다른 결과에 연결하고 명령 팔레트의 기능 검색을 구분합니다.',svg:vscodeFinding()},
  'tools-pycharm': {title:'Python용 PyCharm과 VS Code 키맵의 역할',description:'PyCharm에서 실행할 Python과 작업 폴더를 고르는 설정, 익숙한 단축키를 연결하는 키맵을 두 갈래로 분리합니다.',svg:pycharmEnvironment()},
  'codex-context': {title:'통합 터미널·Git·GitHub·Markdown을 한 흐름으로 보기',description:'하나의 프로젝트 작업대를 중심으로 README·PowerShell·Git 변경 비교·GitHub를 연결해 같은 작업의 맥락을 확인합니다.',svg:integratedWorkbench()},
  'tools-html': {title:'HTML: 강의 카드의 내용과 구조 만들기',description:'VS Code에서 작성하는 index.html 본문의 h1 제목, button 버튼, p 설명이 같은 순서로 브라우저에 표시되는 구조를 비교합니다. 버튼의 속성은 그림에서 생략한 코드 일부입니다.',svg:htmlCardPractice()},
  'tools-css': {title:'CSS: 같은 카드에 색과 여백 더하기',description:'style.css의 padding 24px, 배경색과 둥근 모서리가 Git 카드에 적용되고 안쪽 여백이 생기는 모습을 보여 줍니다.',svg:cssCardPractice()},
  'tools-javascript': {title:'JavaScript: 버튼으로 설명 표시하기',description:'script.js의 클릭 이벤트와 hidden 상태 전환 코드 일부를 보여 주며, Git 카드 버튼을 누르기 전 접힌 설명과 누른 뒤 펼쳐진 설명을 비교합니다.',svg:javascriptCardPractice()},
  'web-map': {title:'백엔드는 어디서 실행될까: 로컬과 원격 서버',description:'내 PC의 브라우저와 서버 프로세스가 있는 로컬 섬, 다른 컴퓨터의 서버가 있는 원격 섬을 요청·응답으로 연결합니다.',svg:localAndRemote()},
  'web-http': {title:'프론트엔드와 백엔드: 요청·응답으로 나누는 책임',description:'React·Svelte UI와 FastAPI·Spring 서버 처리 사이의 요청 및 HTML·JSON 응답을 표시하고 선택적 DB와 정적 파일 대안을 나눕니다.',svg:webResponsibilities()},
  'web-html': {title:'서버 템플릿의 HTML 응답을 브라우저가 화면으로',description:'서버 안의 템플릿과 데이터가 HTML 문서를 만들고 브라우저가 이를 해석해 Git 카드 화면으로 그리는 단계를 구분합니다.',svg:serverToBrowser()},
  'web-jinja': {title:'Jinja2와 Django Template: 왜 이번에는 Jinja2일까',description:'같은 title 데이터를 Jinja2와 DTL의 두 템플릿 판에 넣어 HTML을 만드는 과정과 서로 다른 필터 표기를 비교합니다.',svg:templateEngines()},
  'frontend-css': {title:'기존 CSS와 Tailwind를 같은 카드에서 비교하기',description:'CSS 속성과 Tailwind 유틸리티 클래스가 같은 카드의 안쪽 여백과 둥근 모서리를 표현하는 방법을 비교합니다.',svg:cardLayers()},
  'frontend-alpine': {title:'Alpine으로 브라우저 반응을 더하고 템플릿과 조합하기',description:'클릭 이벤트가 open 상태를 바꾸고 x-show가 설명 표시를 연결하는 흐름을 x-data·@click·x-show의 삼각 상태 그래프로 나타냅니다.',svg:alpineStateGraph()},
  'codex-bonus': {title:'보충: 다음 작업에 재사용할 요청 카드',description:'재사용 요청 카드의 문제·맥락·보존 조건·검증 구획을 실제 프로젝트 정보로 바꾸어 다음 요청으로 옮깁니다.',svg:reusablePrompt()},
  'tools-bonus': {title:'보충 노트: 가상환경과 실행 버튼을 같은 기준으로 맞추기',description:'IDE 실행 설정과 PowerShell에서 스크립트 경로, Python 실행 파일, 작업 폴더를 같은 기준으로 대조합니다.',svg:environmentParity()},
  'web-bonus': {title:'보충 노트: 주소의 경로와 해시, 빌드 결과 구분',description:'주소의 경로는 서버 요청으로 전달되며 해시 뒤 fragment는 브라우저에서 읽습니다. 원본에서 빌드 결과로 이어지는 방향도 구분합니다.',svg:addressAndBuild()},
  'frontend-bonus': {title:'보충: 클래스가 개발 화면에만 보일 때',description:'Tailwind 3가 소스에서 찾는 완전한 클래스 문자열과 실제 템플릿을 포함한 content 경로를 대조합니다.',svg:completeClassNames()},
};
