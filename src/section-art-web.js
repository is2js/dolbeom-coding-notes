// Native, trusted SVG scenes for the Markdown, IDE, web and template sections.
// Only the small information-flow layers move; the diagrams remain complete at rest.
const palette = {
  ink: '#283449', muted: '#536e6d', sage: '#8aa395', pale: '#dbe3d2',
  cream: '#f5ead3', sand: '#dfcfad', paper: '#fff9ed', orange: '#da9d77',
  softOrange: '#f0d8bf', white: '#fffdf5', red: '#a76c60', softRed: '#edd6c9',
};
const c = palette;
const escapeText = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 22, color = c.ink, anchor = 'start', weight = 600) =>
  `<text x='${x}' y='${y}' font-size='${size}' fill='${color}' text-anchor='${anchor}' font-weight='${weight}'>${escapeText(value)}</text>`;
const rect = (x, y, width, height, fill = c.paper, radius = 12, stroke = c.ink) =>
  `<rect x='${x}' y='${y}' width='${width}' height='${height}' rx='${radius}' fill='${fill}' stroke='${stroke}' stroke-width='2'/>`;
const path = (d, fill = 'none', stroke = c.ink, width = 2) =>
  `<path d='${d}' fill='${fill}' stroke='${stroke}' stroke-width='${width}' stroke-linecap='round' stroke-linejoin='round'/>`;
const circle = (x, y, radius, fill = c.sage, stroke = c.ink) =>
  `<circle cx='${x}' cy='${y}' r='${radius}' fill='${fill}' stroke='${stroke}' stroke-width='2'/>`;
const pill = (x, y, width, value, fill = c.pale, size = 18) =>
  rect(x, y, width, 34, fill, 17, c.muted) + text(x + width / 2, y + 23, value, size, c.muted, 'middle');
const check = (x, y, color = c.muted) => path(`M${x} ${y}l7 7 14-16`, 'none', color, 3);
const lines = (x, y, widths, color = c.sand, gap = 17, height = 5) => widths.map((width, index) =>
  `<rect x='${x}' y='${y + index * gap}' width='${width}' height='${height}' rx='${height / 2}' fill='${color}'/>`).join('');

function paper(x, y, width, height, fill = c.paper) {
  const fold = 23;
  return path(`M${x + 8} ${y + 9}h${width - fold}l${fold} ${fold}v${height - fold}H${x + 8}Z`, c.sand, c.muted)
    + path(`M${x} ${y}h${width - fold}l${fold} ${fold}v${height - fold}H${x}Z`, fill)
    + path(`M${x + width - fold} ${y}v${fold}h${fold}`, c.cream);
}

function slab(x, y, width, height, fill = c.cream, depth = 9) {
  return rect(x, y + depth, width, height, c.sand, 12, c.muted)
    + rect(x, y, width, height, fill, 12);
}

function screen(x, y, width, height, fill = c.paper) {
  return path(`M${x + width} ${y + 10}l12 9v${height - 9}l-12 10Z`, c.sand)
    + path(`M${x} ${y + height}l12 10h${width}l-12-10Z`, c.sand)
    + rect(x, y, width, height, fill, 12)
    + path(`M${x} ${y + 34}h${width}`, 'none', c.muted, 1.5)
    + [0, 14, 28].map(offset => `<circle cx='${x + 17 + offset}' cy='${y + 17}' r='3.5' fill='${c.sage}'/>`).join('');
}

function server(x, y, width = 128, height = 160) {
  const side = 21;
  const top = 13;
  const rowGap = Math.min(43, (height - 24) / 3);
  const rowHeight = rowGap - 10;
  return path(`M${x} ${y}l${side}-${top}h${width}l-${side} ${top}Z`, c.pale)
    + path(`M${x + width} ${y}l${side}-${top}v${height}l-${side} ${top}Z`, c.muted)
    + rect(x, y, width, height, c.cream, 6)
    + [0, 1, 2].map(index => {
      const row = y + 15 + index * rowGap;
      return rect(x + 12, row, width - 24, rowHeight, c.paper, 5, c.muted)
        + circle(x + 27, row + rowHeight / 2, 4, c.sage, c.muted)
        + lines(x + 42, row + rowHeight / 2 - 2.5, [Math.max(2, width - 70)], c.sage, 0, 5);
    }).join('');
}

function database(x, y, width = 130, height = 85) {
  const radius = width / 2;
  const curve = Math.min(27, height * .35);
  return path(`M${x} ${y}v${height}c0 ${curve} ${width} ${curve} ${width} 0V${y}`, c.cream, c.muted)
    + `<ellipse cx='${x + radius}' cy='${y}' rx='${radius}' ry='${Math.min(18, height * .28)}' fill='${c.paper}' stroke='${c.muted}' stroke-width='2'/>`
    + path(`M${x} ${y + height / 3}c0 ${curve} ${width} ${curve} ${width} 0M${x} ${y + height * 2 / 3}c0 ${curve} ${width} ${curve} ${width} 0`, 'none', c.muted, 1.5);
}

function arrow(prefix, x1, y1, x2, y2, { orange = false, dashed = false, motion = false, delay = 0 } = {}) {
  const color = orange ? c.orange : c.muted;
  const marker = `${prefix}-${orange ? 'orange' : 'sage'}-arrow`;
  return `<path d='M${x1} ${y1}L${x2} ${y2}' fill='none' stroke='${color}' stroke-width='2.5' stroke-linecap='round' ${dashed ? `stroke-dasharray='7 7'` : ''} marker-end='url(#${marker})'/>`
    + (motion ? `<g class='art-motion ${prefix}-flow' style='--art-dx:${x2 - x1}px;--art-dy:${y2 - y1}px;animation-delay:${delay}s'><circle cx='${x1}' cy='${y1}' r='5' fill='${color}' stroke='${c.paper}' stroke-width='2'/></g>` : '');
}

const highlight = (prefix, body, delay = 0) => `<g class='art-motion ${prefix}-highlight' style='animation-delay:${delay}s'>${body}</g>`;

function frame(prefix, body) {
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 550' class='topic-art-svg section-art-svg ${prefix}' aria-hidden='true' focusable='false'>
    <defs>
      <filter id='${prefix}-shadow' x='-25%' y='-25%' width='150%' height='165%'><feDropShadow dx='0' dy='8' stdDeviation='8' flood-color='${c.ink}' flood-opacity='.08'/></filter>
      <marker id='${prefix}-sage-arrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M1 1L8 5L1 9' fill='none' stroke='${c.muted}' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/></marker>
      <marker id='${prefix}-orange-arrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M1 1L8 5L1 9' fill='none' stroke='${c.orange}' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'/></marker>
    </defs>
    <style>
      @keyframes ${prefix}-flow{0%,12%{transform:translate(0,0);opacity:0}24%{opacity:1}75%{opacity:1}91%,100%{transform:translate(var(--art-dx),var(--art-dy));opacity:0}}
      @keyframes ${prefix}-highlight{0%,18%,100%{opacity:.6}38%,70%{opacity:1}}
      .${prefix} .${prefix}-flow{animation:${prefix}-flow 6.4s ease-in-out infinite}
      .${prefix} .${prefix}-highlight{animation:${prefix}-highlight 6.4s ease-in-out infinite}
      @media(prefers-reduced-motion:reduce){.${prefix} .art-motion{animation:none!important}}
    </style>
    <ellipse cx='380' cy='479' rx='238' ry='22' fill='${c.ink}' opacity='.065'/>
    <g font-family='Pretendard Variable,Pretendard,system-ui,sans-serif' stroke-linejoin='round'>${body}</g>
  </svg>`;
}

function structuredPrompt() {
  const p = 'sa-markdown-map';
  const rows = [
    ['01', '목표', '무엇을 만들까', c.pale],
    ['02', '맥락', '어디에서 작업할까', c.cream],
    ['03', '제약', '무엇을 보존할까', c.softOrange],
    ['04', '확인', '결과를 어떻게 볼까', c.pale],
  ];
  return frame(p, `
    <g filter='url(#${p}-shadow)'>${paper(228, 69, 301, 367)}
      ${text(255, 113, '# 작업 요청', 26)}
      ${rows.map(([number, title, detail, fill], i) => {
        const y = 135 + i * 66;
        return rect(251, y, 246, 55, fill, 8, c.sage)
          + text(265, y + 23, number, 16, c.muted)
          + text(298, y + 25, title, 23)
          + text(298, y + 44, detail, 16, c.muted, 'start', 400);
      }).join('')}
    </g>
    ${path('M113 190h73v60h-31l-15 15v-15h-27Z', c.paper)}
    ${text(150, 225, '요청', 22, c.muted, 'middle')}
    ${arrow(p, 184, 220, 218, 220, { motion: true })}
    ${path('M602 198l33 20v40l-33 20-33-20v-40Z', c.pale)}
    ${path('M585 234l10 8-10 8m19-24-6 32m14-24 10 8-10 8', 'none', c.muted, 2.5)}
    ${arrow(p, 544, 238, 561, 238, { motion: true, delay: 1.2 })}
    ${text(602, 311, 'Codex', 22, c.muted, 'middle')}
    ${highlight(p, check(554, 373) + text(585, 380, '빠짐없이', 20, c.muted))}
    ${text(380, 484, '긴 부탁을 읽기 쉬운 구획으로', 23, c.muted, 'middle')}
  `);
}

function readmeAndProfile() {
  const p = 'sa-tools-markdown';
  return frame(p, `
    <g transform='rotate(-4 243 270)' filter='url(#${p}-shadow)'>
      ${paper(117, 111, 238, 288)}
      ${pill(138, 135, 158, 'README.md', c.pale, 19)}
      ${text(139, 205, '# 프로젝트', 25)}
      ${lines(140, 224, [164, 143, 155], c.sand, 15)}
      ${rect(139, 281, 173, 70, c.ink, 7, c.muted)}
      ${text(153, 310, '> 실행 방법', 20, c.cream)}
      ${lines(154, 327, [119], c.sage, 0, 5)}
    </g>
    <g transform='rotate(4 527 265)' filter='url(#${p}-shadow)'>
      ${slab(423, 100, 222, 294, c.paper)}
      ${circle(534, 165, 36, c.pale)}
      ${circle(534, 154, 10, c.muted, c.muted)}
      ${path('M513 184q2-22 21-22t21 22', c.muted, c.muted)}
      ${text(534, 229, '내 소개', 26, c.ink, 'middle')}
      ${lines(456, 251, [155, 129, 143], c.sand, 17)}
      ${pill(451, 325, 166, '프로필 README', c.pale, 18)}
    </g>
    ${text(232, 81, '프로젝트 안내', 23, c.muted, 'middle')}
    ${text(534, 69, 'GitHub 프로필', 23, c.muted, 'middle')}
    ${path('M386 176v166', 'none', c.sage, 1.5)}
    ${[0, 1, 2, 3].map((i) => {
      const x = 102 + i * 145;
      return rect(x, 429, 132, 39, i === 3 ? c.pale : c.cream, 8, c.sage)
        + text(x + 66, 454, ['이름 일치', '공개 저장소', '루트 문서', '내용 작성'][i], 17, c.muted, 'middle');
    }).join('')}
    ${highlight(p, check(652, 447))}
  `);
}

function markdownBranches() {
  const p = 'sa-markdown-code';
  return frame(p, `
    ${arrow(p, 326, 297, 243, 217, { motion: true })}
    ${arrow(p, 435, 297, 519, 217, { motion: true, delay: 1.1 })}
    <g filter='url(#${p}-shadow)'>
      ${slab(100, 88, 222, 155, c.paper)}
      ${rect(120, 111, 44, 44, c.cream, 5)}${text(142, 142, 'N', 29, c.ink, 'middle')}
      ${text(179, 143, 'Notion', 25)}
      ${rect(121, 174, 177, 17, c.pale, 4, c.sage)}
      ${rect(121, 201, 109, 17, c.cream, 4, c.sage)}
      ${rect(238, 201, 60, 17, c.softOrange, 4, c.sage)}
      ${text(211, 278, '블록으로 편집', 22, c.muted, 'middle')}
    </g>
    <g filter='url(#${p}-shadow)'>
      ${path('M530 91l31 30-13 52-39-12-11-34Z', c.muted)}
      ${path('M530 91l-4 50-17 20m17-20 22 32m-22-32 35-20', 'none', c.pale, 1.5)}
      ${text(575, 137, 'Obsidian', 23)}
      ${path('M515 201l48-22 48 32-16 31m-32-63 4 55m-52-33 52 33 44-23', 'none', c.sage, 2)}
      ${[[515, 201], [563, 179], [611, 211], [567, 234], [595, 242]].map(([x, y]) => circle(x, y, 7, c.pale, c.muted)).join('')}
      ${text(565, 279, '노트를 연결', 22, c.muted, 'middle')}
    </g>
    <g filter='url(#${p}-shadow)'>${paper(296, 308, 169, 133)}
      ${text(322, 351, '# 노트', 26)}
      ${text(322, 387, '- 목록', 23, c.muted)}
      ${text(322, 418, '[링크]', 22, c.muted)}
    </g>
    ${pill(110, 375, 137, '공통 문법', c.pale, 20)}
    ${pill(518, 375, 137, '확장 확인', c.softOrange, 20)}
    ${text(380, 491, '같은 원문도 앱별 결과를 확인', 23, c.muted, 'middle')}
  `);
}

function reviewDiff() {
  const p = 'sa-tools-map';
  return frame(p, `
    ${pill(216, 64, 328, 'public / data / course.json', c.cream, 19)}
    <g filter='url(#${p}-shadow)'>
      ${paper(96, 134, 257, 265)}${paper(403, 134, 257, 265)}
      ${text(125, 178, '변경 전', 25)}${text(433, 178, '변경 후', 25)}
      ${rect(115, 202, 215, 45, c.softRed, 7, c.red)}
      ${text(131, 231, '− 제목: 터미널', 21, c.red)}
      ${rect(422, 202, 215, 45, c.pale, 7, c.muted)}
      ${text(435, 231, '+ 윈도우 터미널', 21, c.muted)}
      ${text(120, 284, 'id: terminal', 22, c.muted)}
      ${text(427, 284, 'id: terminal', 22, c.muted)}
      ${lines(121, 309, [180, 151, 165], c.sand, 18)}
      ${lines(428, 309, [180, 151, 165], c.sand, 18)}
    </g>
    ${arrow(p, 365, 267, 393, 267, { motion: true })}
    ${highlight(p, check(589, 279))}
    ${[0, 1, 2].map(i => {
      const x = 197 + i * 180;
      return circle(x, 444, 20, i === 1 ? c.pale : c.cream, c.muted)
        + text(x, 451, String(i + 1), 20, c.muted, 'middle')
        + text(x + 31, 452, ['경로', '차이', '실행'][i], 23, c.muted);
    }).join('')}
  `);
}

function vscodeFinding() {
  const p = 'sa-tools-vscode';
  return frame(p, `
    ${text(101, 88, '찾을 대상이 다릅니다', 25)}
    <g filter='url(#${p}-shadow)'>
      ${slab(102, 125, 213, 85, c.cream)}
      ${text(208, 163, 'Ctrl + P', 26, c.ink, 'middle')}
      ${text(208, 191, '파일 이름', 19, c.muted, 'middle')}
      ${slab(102, 239, 213, 85, c.pale)}
      ${text(208, 277, 'Ctrl + Shift + F', 22, c.ink, 'middle')}
      ${text(208, 306, '프로젝트 내용', 19, c.muted, 'middle')}
      ${screen(390, 118, 260, 265)}
      ${text(414, 184, 'VS Code', 25)}
      ${rect(410, 203, 218, 40, c.pale, 7, c.sage)}
      ${text(423, 230, 'README.md', 22, c.muted)}
      ${text(414, 279, '문구 검색', 22)}
      ${lines(414, 297, [196, 159, 180], c.sand, 18)}
    </g>
    ${arrow(p, 332, 169, 379, 222, { motion: true })}
    ${arrow(p, 332, 283, 379, 302, { motion: true, delay: 1.2 })}
    ${pill(194, 420, 372, 'Ctrl + Shift + P  ·  기능 이름', c.cream, 22)}
    ${highlight(p, check(593, 438))}
  `);
}

function pycharmEnvironment() {
  const p = 'sa-tools-pycharm';
  return frame(p, `
    ${slab(275, 67, 211, 65, c.pale)}
    ${text(380, 107, 'PyCharm', 28, c.ink, 'middle')}
    ${arrow(p, 325, 150, 232, 207, { motion: true })}
    ${arrow(p, 436, 150, 535, 207, { motion: true, delay: 1.2 })}
    <g filter='url(#${p}-shadow)'>
      ${slab(98, 222, 274, 172, c.paper)}
      ${rect(119, 244, 63, 62, c.muted, 9)}
      ${text(150, 284, 'Py', 29, c.cream, 'middle')}
      ${text(200, 268, '인터프리터', 24)}
      ${text(200, 298, '실행할 Python', 18, c.muted)}
      ${text(118, 340, '.venv / python.exe', 21, c.muted)}
      ${text(118, 374, '작업 폴더도 확인', 20, c.muted)}
    </g>
    <g filter='url(#${p}-shadow)'>
      ${slab(424, 222, 231, 172, c.cream)}
      ${text(540, 264, 'VSCode 키맵', 24, c.ink, 'middle')}
      ${slab(448, 286, 72, 44, c.paper, 5)}${text(484, 316, 'Ctrl', 22, c.muted, 'middle')}
      ${slab(534, 286, 89, 44, c.paper, 5)}${text(578, 316, '키', 22, c.muted, 'middle')}
      ${text(539, 373, '조작 방법을 연결', 20, c.muted, 'middle')}
    </g>
    ${text(234, 438, '실행 환경', 24, c.muted, 'middle')}
    ${text(541, 438, '단축키 설정', 24, c.muted, 'middle')}
    ${path('M395 238v146', 'none', c.sage, 1.5)}
  `);
}

function integratedWorkbench() {
  const p = 'sa-codex-context';
  return frame(p, `
    ${path('M112 341l268-139 268 139-268 139Z', c.cream, c.sage)}
    ${path('M112 341v13l268 139 268-139v-13l-268 139Z', c.sand, c.muted)}
    ${path('M222 184l115 70m86 0 115-70M228 364l109-66m86 0 109 66', 'none', c.sage, 2.5)}
    <g filter='url(#${p}-shadow)'>
      ${paper(107, 104, 158, 128)}${text(128, 148, 'README', 23)}
      ${lines(129, 167, [99, 114, 83], c.sand, 15)}
      ${slab(492, 107, 160, 116, c.paper)}${text(511, 149, 'Git diff', 24)}
      ${rect(509, 167, 125, 10, c.softRed, 3, c.softRed)}
      ${rect(509, 190, 125, 10, c.pale, 3, c.pale)}
      ${slab(293, 227, 175, 101, c.pale)}
      ${path('M317 252h38l10 10h77v42H317Z', c.cream, c.muted)}
      ${text(380, 289, '프로젝트', 24, c.muted, 'middle')}
      ${slab(116, 340, 174, 95, c.ink)}${text(135, 380, '> PowerShell', 21, c.cream)}
      ${path('M138 403h32m12 0h53', 'none', c.sage, 4)}
      ${slab(478, 341, 174, 95, c.pale)}${text(565, 379, 'GitHub', 25, c.ink, 'middle')}
      ${path('M537 409l17-10 17 10 17-10', 'none', c.muted, 2.5)}
      ${[[537, 409], [554, 399], [571, 409], [588, 399]].map(([x, y]) => circle(x, y, 4, c.paper, c.muted)).join('')}
    </g>
    ${highlight(p, check(394, 316))}
    ${text(380, 69, '한 작업대에서 연결해 확인', 26, c.ink, 'middle')}
    ${text(380, 517, '문서 → 경로 → 변경 → 실행 → 원격', 22, c.muted, 'middle')}
  `);
}

function localAndRemote() {
  const p = 'sa-web-map';
  return frame(p, `
    ${text(217, 88, '로컬', 27, c.ink, 'middle')}
    ${text(562, 88, '원격', 27, c.ink, 'middle')}
    ${path('M93 354l128-59 128 59-128 65Z', c.pale, c.sage)}
    ${path('M93 354v13l128 65 128-65v-13l-128 65Z', c.sage, c.muted)}
    ${path('M446 354l115-54 115 54-115 61Z', c.cream, c.sage)}
    ${path('M446 354v13l115 61 115-61v-13l-115 61Z', c.sand, c.muted)}
    <g filter='url(#${p}-shadow)'>
      ${screen(102, 180, 161, 129)}
      ${rect(120, 229, 121, 52, c.pale, 6, c.sage)}
      ${text(180, 262, '브라우저', 22, c.muted, 'middle')}
      ${server(273, 247, 56, 97)}
      ${server(493, 168, 111, 166)}
      ${pill(482, 365, 160, '서버 프로세스', c.paper, 18)}
    </g>
    ${path('M149 323q9 27 52 25t65-25', 'none', c.muted, 2.5)}
    ${text(217, 461, '내 PC', 25, c.muted, 'middle')}
    ${text(217, 491, 'localhost', 20, c.muted, 'middle')}
    ${text(562, 461, '다른 컴퓨터', 25, c.muted, 'middle')}
    ${text(562, 491, '접속 가능한 주소', 19, c.muted, 'middle')}
    ${arrow(p, 281, 183, 474, 183, { motion: true })}
    ${arrow(p, 474, 218, 281, 218, { orange: true, motion: true, delay: 1.3 })}
    ${text(380, 159, '요청 · 응답', 21, c.muted, 'middle')}
  `);
}

function webResponsibilities() {
  const p = 'sa-web-http';
  return frame(p, `
    <g filter='url(#${p}-shadow)'>
      ${screen(88, 113, 239, 196)}
      ${text(112, 185, '프론트엔드', 27)}
      ${text(112, 224, 'React · Svelte', 22, c.muted)}
      ${rect(111, 246, 193, 41, c.pale, 7, c.sage)}
      ${text(207, 273, '화면 · 상호작용', 20, c.muted, 'middle')}
      ${server(492, 139, 143, 165)}
    </g>
    ${text(565, 103, '백엔드', 27, c.ink, 'middle')}
    ${text(565, 346, 'FastAPI · Spring', 22, c.muted, 'middle')}
    ${arrow(p, 348, 186, 472, 186, { motion: true })}
    ${arrow(p, 472, 239, 348, 239, { orange: true, motion: true, delay: 1.1 })}
    ${text(408, 164, '요청', 20, c.muted, 'middle')}
    ${text(408, 274, 'HTML / JSON', 18, c.muted, 'middle')}
    ${arrow(p, 566, 361, 566, 391, { dashed: true })}
    ${database(508, 414, 114, 37)}
    <rect x='524' y='424' width='82' height='28' rx='5' fill='${c.cream}'/>
    ${text(565, 445, 'DB · 선택', 22, c.muted, 'middle')}
    ${slab(109, 366, 293, 69, c.cream)}
    ${path('M128 384h21l10 10v23h-31Z', c.paper, c.muted)}
    ${text(178, 395, '정적 파일만으로', 22, c.muted)}
    ${text(178, 421, '시작할 수도 있습니다', 18, c.muted)}
    ${text(380, 506, '역할의 구분 ≠ 서버 두 대가 필수', 23, c.muted, 'middle')}
  `);
}

function serverToBrowser() {
  const p = 'sa-web-html';
  return frame(p, `
    ${text(204, 94, '서버', 27, c.ink, 'middle')}
    ${text(571, 94, '브라우저', 27, c.ink, 'middle')}
    <g filter='url(#${p}-shadow)'>
      ${slab(89, 130, 226, 256, c.pale)}
      ${rect(109, 151, 185, 66, c.paper, 8, c.muted)}
      ${text(202, 179, '템플릿', 23, c.ink, 'middle')}
      ${text(202, 204, '{{ title }}', 20, c.muted, 'middle')}
      ${text(202, 244, '+', 29, c.muted, 'middle')}
      ${rect(109, 259, 185, 57, c.cream, 8, c.muted)}
      ${text(202, 295, '데이터: Git', 24, c.ink, 'middle')}
      ${text(202, 359, 'Jinja2', 25, c.muted, 'middle')}
      ${paper(341, 204, 108, 139)}
      ${text(391, 251, 'HTML', 24, c.muted, 'middle')}
      ${text(391, 287, '<h2>', 20, c.muted, 'middle')}
      ${text(391, 316, 'Git', 25, c.ink, 'middle')}
      ${screen(489, 177, 186, 162)}
      ${rect(508, 230, 148, 82, c.pale, 8, c.sage)}
      ${text(528, 263, 'Git', 26)}
      ${text(528, 294, '25분', 20, c.muted)}
    </g>
    ${arrow(p, 320, 173, 479, 173, { motion: true })}
    ${text(399, 149, 'HTML 응답', 22, c.muted, 'middle')}
    ${arrow(p, 455, 286, 479, 286, { motion: true, delay: 1.5 })}
    ${text(204, 437, 'HTML 생성', 25, c.muted, 'middle')}
    ${text(582, 394, '해석 · 배치 · 그리기', 22, c.muted, 'middle')}
    ${text(582, 437, '화면 표시', 25, c.muted, 'middle')}
    ${text(380, 501, '서버의 HTML과 최종 화면을 나눠 봅니다', 22, c.muted, 'middle')}
  `);
}

function templateEngines() {
  const p = 'sa-web-jinja';
  return frame(p, `
    ${slab(312, 59, 137, 71, c.cream)}
    ${text(380, 88, '데이터', 20, c.muted, 'middle')}
    ${text(380, 116, 'title: Git', 23, c.ink, 'middle')}
    ${arrow(p, 306, 108, 237, 163, { motion: true })}
    ${arrow(p, 454, 108, 523, 163, { motion: true, delay: .8 })}
    <g filter='url(#${p}-shadow)'>
      ${slab(99, 179, 241, 169, c.pale)}
      ${text(219, 214, 'Jinja2', 28, c.ink, 'middle')}
      ${rect(121, 234, 197, 45, c.paper, 7, c.muted)}
      ${text(219, 265, '{{ title }}', 24, c.muted, 'middle')}
      ${text(219, 316, 'default(값)', 22, c.muted, 'middle')}
      ${slab(420, 179, 241, 169, c.cream)}
      ${text(540, 214, 'DTL', 28, c.ink, 'middle')}
      ${rect(442, 234, 197, 45, c.paper, 7, c.muted)}
      ${text(540, 265, '{{ title }}', 24, c.muted, 'middle')}
      ${text(540, 316, 'default:값', 22, c.muted, 'middle')}
    </g>
    ${arrow(p, 219, 365, 219, 398, { motion: true, delay: 1.8 })}
    ${arrow(p, 540, 365, 540, 398, { motion: true, delay: 2.2 })}
    ${rect(141, 408, 156, 46, c.paper, 7, c.sage)}
    ${text(219, 439, 'HTML: Git', 23, c.muted, 'middle')}
    ${rect(462, 408, 156, 46, c.paper, 7, c.sage)}
    ${text(540, 439, 'HTML: Git', 23, c.muted, 'middle')}
    ${highlight(p, check(109, 489))}
    ${text(145, 496, '이번 조합: FastAPI + Jinja2', 23, c.muted)}
  `);
}

function cardLayers() {
  const p = 'sa-frontend-css';
  return frame(p, `
    ${text(157, 149, 'HTML', 27, c.ink, 'middle')}
    ${text(380, 106, 'CSS / Tailwind', 25, c.ink, 'middle')}
    ${text(604, 64, 'JavaScript', 25, c.ink, 'middle')}
    <g filter='url(#${p}-shadow)'>
      ${paper(77, 177, 163, 226)}
      ${path('M95 219h126v137H95Z', 'none', c.sage, 1.5)}
      ${text(110, 253, 'Git', 25)}
      ${text(110, 287, '25분', 20, c.muted)}
      ${rect(108, 310, 99, 31, c.paper, 0, c.muted)}
      ${text(157, 333, '설명', 18, c.muted, 'middle')}
      ${slab(293, 135, 175, 239, c.pale)}
      ${rect(314, 159, 133, 185, c.paper, 14, c.muted)}
      ${text(333, 201, 'Git', 27)}
      ${text(333, 236, '25분', 20, c.muted)}
      ${rect(330, 265, 100, 42, c.muted, 9, c.muted)}
      ${text(380, 293, '설명', 20, c.paper, 'middle')}
      ${pill(317, 352, 126, 'p-4', c.cream, 20)}
      ${slab(518, 94, 175, 258, c.paper)}
      ${text(541, 142, 'Git', 28)}
      ${text(541, 176, '25분', 21, c.muted)}
      ${rect(539, 197, 131, 45, c.muted, 9, c.muted)}
      ${text(604, 227, '설명 보기', 20, c.paper, 'middle')}
      ${highlight(p, rect(536, 260, 139, 66, c.pale, 9, c.sage) + text(605, 288, '펼친 설명', 20, c.muted, 'middle') + lines(553, 303, [101], c.sage, 0, 4))}
    </g>
    ${arrow(p, 249, 281, 281, 265, { motion: true })}
    ${arrow(p, 478, 235, 507, 220, { motion: true, delay: 1.2 })}
    ${path('M658 232l20 28-13-2-5 12-6-4 6-12-12-3Z', c.orange, c.ink, 1.7)}
    ${text(157, 450, '구조', 25, c.muted, 'middle')}
    ${text(380, 450, '모양', 25, c.muted, 'middle')}
    ${text(605, 450, '반응', 25, c.muted, 'middle')}
    ${text(380, 501, '같은 카드에 세 역할을 차례로', 23, c.muted, 'middle')}
  `);
}

function alpineStateGraph() {
  const p = 'sa-frontend-alpine';
  return frame(p, `
    ${arrow(p, 235, 279, 318, 189, { motion: true })}
    ${arrow(p, 457, 177, 541, 267, { motion: true, delay: 1.4 })}
    ${path('M274 339h191', 'none', c.sand, 1.5)}
    <g filter='url(#${p}-shadow)'>
      ${slab(267, 68, 226, 116, c.pale)}
      ${text(380, 105, 'x-data', 27, c.ink, 'middle')}
      ${text(380, 143, 'open', 28, c.muted, 'middle')}
      ${text(380, 172, 'false ↔ true', 20, c.muted, 'middle')}
      ${slab(88, 287, 220, 104, c.cream)}
      ${text(198, 325, '@click', 27, c.ink, 'middle')}
      ${text(198, 363, 'open = !open', 24, c.muted, 'middle')}
      ${screen(452, 277, 220, 139)}
      ${text(562, 342, 'x-show', 27, c.ink, 'middle')}
      ${highlight(p, rect(474, 357, 177, 40, c.pale, 8, c.sage) + text(562, 384, '설명 표시', 21, c.muted, 'middle'), 1.8)}
    </g>
    ${text(209, 227, '클릭 이벤트', 21, c.muted, 'middle')}
    ${text(570, 229, '상태에 맞춰', 21, c.muted, 'middle')}
    ${path('M123 369l-8 29 13-4 6 15 8-3-7-15 13-4Z', c.orange, c.ink, 1.7)}
    ${text(380, 481, '클릭 → 상태 변경 → 화면 표시', 25, c.muted, 'middle')}
    ${text(380, 515, '브라우저의 작은 동작을 연결합니다', 19, c.muted, 'middle')}
  `);
}

export const webSectionScenes = {
  'markdown-map': {
    title: 'Codex 요청을 목표·맥락·제약·확인으로 구조화하기',
    description: '입체 문서를 목표·맥락·제약·확인의 네 구획으로 나누어 요청의 빠진 조건을 확인합니다.',
    svg: structuredPrompt(),
  },
  'tools-markdown': {
    title: 'README.md 관례와 GitHub 프로필 README의 조건',
    description: '실행 안내가 있는 프로젝트 README와 프로필 소개 문서를 나란히 두고 네 가지 프로필 표시 조건을 구분합니다.',
    svg: readmeAndProfile(),
  },
  'markdown-code': {
    title: '공통 핵심 문법을 배우고 Notion·Obsidian의 차이 확인하기',
    description: '하나의 Markdown 문서에서 Notion의 블록 편집과 Obsidian의 노트 연결로 갈라지는 구조로 공통 문법과 앱별 확장을 설명합니다.',
    svg: markdownBranches(),
  },
  'tools-map': {
    title: 'Codex 변경을 PyCharm에서 확인하는 세 가지 질문',
    description: '변경 전후 문서의 제목 차이와 그대로인 ID를 비교하고 경로·차이·실행의 세 확인 지점을 짚습니다.',
    svg: reviewDiff(),
  },
  'tools-vscode': {
    title: '무료 VS Code에서 필수 단축키로 찾아보기',
    description: '입체 키캡의 파일 이름 검색과 프로젝트 내용 검색을 서로 다른 결과에 연결하고 명령 팔레트의 기능 검색을 구분합니다.',
    svg: vscodeFinding(),
  },
  'tools-pycharm': {
    title: 'Python용 PyCharm과 VS Code 키맵의 역할',
    description: 'PyCharm에서 실행할 Python과 작업 폴더를 고르는 설정, 익숙한 단축키를 연결하는 키맵을 두 갈래로 분리합니다.',
    svg: pycharmEnvironment(),
  },
  'codex-context': {
    title: '통합 터미널·Git·GitHub·Markdown을 한 흐름으로 보기',
    description: '하나의 프로젝트 작업대를 중심으로 README·PowerShell·Git 변경 비교·GitHub를 연결해 같은 작업의 맥락을 확인합니다.',
    svg: integratedWorkbench(),
  },
  'web-map': {
    title: '백엔드는 어디서 실행될까: 로컬과 원격 서버',
    description: '내 PC의 브라우저와 서버 프로세스가 있는 로컬 섬, 다른 컴퓨터의 서버가 있는 원격 섬을 요청·응답으로 연결합니다.',
    svg: localAndRemote(),
  },
  'web-http': {
    title: '프론트엔드와 백엔드: 요청·응답으로 나누는 책임',
    description: 'React·Svelte UI와 FastAPI·Spring 서버 처리 사이의 요청 및 HTML·JSON 응답을 표시하고 선택적 DB와 정적 파일 대안을 나눕니다.',
    svg: webResponsibilities(),
  },
  'web-html': {
    title: '서버 템플릿의 HTML 응답을 브라우저가 화면으로',
    description: '서버 안의 템플릿과 데이터가 HTML 문서를 만들고 브라우저가 이를 해석해 Git 카드 화면으로 그리는 단계를 구분합니다.',
    svg: serverToBrowser(),
  },
  'web-jinja': {
    title: 'Jinja2와 Django Template: 왜 이번에는 Jinja2일까',
    description: '같은 title 데이터를 Jinja2와 DTL의 두 템플릿 판에 넣어 HTML을 만드는 과정과 서로 다른 필터 표기를 비교합니다.',
    svg: templateEngines(),
  },
  'frontend-css': {
    title: '같은 카드에 HTML → CSS·Tailwind → JavaScript',
    description: '구조만 있는 카드, 안쪽 여백과 색을 입힌 카드, 클릭으로 설명이 나타난 카드의 세 입체 단계를 순서대로 비교합니다.',
    svg: cardLayers(),
  },
  'frontend-alpine': {
    title: 'Alpine으로 브라우저 반응을 더하고 템플릿과 조합하기',
    description: '클릭 이벤트가 open 상태를 바꾸고 x-show가 설명 표시를 연결하는 흐름을 x-data·@click·x-show의 삼각 상태 그래프로 나타냅니다.',
    svg: alpineStateGraph(),
  },
};
