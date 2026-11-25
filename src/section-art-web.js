import { brandIconPaths } from './brand-icon-paths.js';
import { project, unproject } from './illustration-plane.js';
import { webGridCandidate } from './web-grid-candidate-illustration.js';

const color = {
  ink: '#263747', muted: '#4a5c60', edge: '#978e79', wire: '#90a497',
  paper: '#fff9ec', cream: '#eadfc8', light: '#f5ecda', shade: '#d4c6ab',
  mint: '#dce9d8', sage: '#abc2a5', teal: '#387970', blue: '#d8e6ed',
  lilac: '#e7dded', rust: '#a65b50', rose: '#f2d8cc', gold: '#c18d47', ochre: '#f2dfaa',
};
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const svgGroup = (body, transform) => `<g transform='${transform}'>${body}</g>`;
const text = (x, y, value, { size = 16, fill = color.muted, align = 'start', mono = false, weight = 650 } = {}) =>
  `<text x='${x}' y='${y}' fill='${fill}' stroke='none' font-size='${size}' font-weight='${weight}' text-anchor='${align}'${mono ? " font-family='Consolas,monospace'" : ''}>${esc(value)}</text>`;
const code = (x, y, value, size = 16, fill = color.teal) => text(x, y, value, { size, fill, mono: true });
const center = (x, y, value, size = 16, fill = color.muted) => text(x, y, value, { size, fill, align: 'middle' });
const shape = (d, fill = 'none', stroke = color.ink, width = 2.15) =>
  `<path d='${d}' fill='${fill}' stroke='${stroke}' stroke-width='${width}' stroke-linecap='round' stroke-linejoin='round'/>`;
const box = (x, y, w, h, fill = color.paper, r = 8, stroke = color.ink, width = 2.15) =>
  `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${r}' fill='${fill}' stroke='${stroke}' stroke-width='${width}'/>`;
const dot = (x, y, r = 5, fill = color.sage, stroke = color.ink, width = 1.6) =>
  `<circle cx='${x}' cy='${y}' r='${r}' fill='${fill}' stroke='${stroke}' stroke-width='${width}'/>`;
const bars = (x, y, widths, fill = color.sage, gap = 14, h = 4) =>
  widths.map((w, i) => box(x, y + i * gap, w, h, fill, h / 2, 'none', 0)).join('');
const tick = (x, y, fill = color.teal) => shape(`M${x} ${y}l5 5 10-12`, 'none', fill, 2.8);

const axis = (project(1, 0)[1] - project(0, 0)[1]) / (project(1, 0)[0] - project(0, 0)[0]);
const figure = (corners, fill, stroke = color.ink, width = 2) =>
  shape(`M${corners.map(point => point.join(' ')).join('L')}Z`, fill, stroke, width);

function plinth(cx, cy, width, depth, { tone = color.light, side = color.shade, thickness = 8, direction = 1 } = {}) {
  const [u, v] = unproject(cx, cy, thickness);
  const long = width / 84, short = depth / 84;
  const du = direction === 1 ? long : short, dv = direction === 1 ? short : long;
  const outline = z => [[u - du, v - dv], [u + du, v - dv], [u + du, v + dv], [u - du, v + dv]]
    .map(([offsetU, offsetV]) => project(offsetU, offsetV, z));
  const top = outline(thickness), ground = outline(0);
  const [north, east, south, west] = top;
  const [, eastBase, southBase, westBase] = ground;
  const highlight = ([x, y]) => [cx + (x - cx) * .91, cy + (y - cy) * .91];
  const shadow = ground.map(([x, y]) => [cx + (x - cx) * 1.08, cy + (y - cy) * 1.08 + 8]);
  return `<g opacity='.15'>${figure(shadow, '#655743', 'none')}</g>`
    + figure([east, south, southBase, eastBase], color.edge, color.ink, 1.8)
    + figure([west, south, southBase, westBase], side, color.ink, 1.8)
    + figure(top, tone, color.ink, 1.8)
    + shape(`M${highlight(west).join(' ')}L${highlight(north).join(' ')}L${highlight(east).join(' ')}`, 'none', color.paper, 1.25);
}

// A standing face sits on one of the worktop axes. Keep its verticals upright.
function depthFace(cx, cy, body, { direction = 1, scale = 1 } = {}) {
  const skew = direction * axis * scale;
  return svgGroup(body, `matrix(${scale} ${skew} 0 ${scale} ${cx * (1 - scale)} ${cy * (1 - scale) - skew * cx})`);
}

function captionChip(x, y, label, w, fill = color.paper) {
  return box(x - w / 2, y - 19, w, 28, fill, 8, color.edge, 1.35)
    + center(x, y, label, 15);
}

function flow(prefix, x1, y1, x2, y2, { second = false, delay = 0, turn = 1 } = {}) {
  const tint = second ? color.gold : color.teal;
  const [u1, v1] = unproject(x1, y1), [u2, v2] = unproject(x2, y2);
  const [mx, my] = turn === 1 ? project(u2, v1) : project(u1, v2);
  const route = `M${x1} ${y1}L${mx} ${my}L${x2} ${y2}`;
  return `${shape(route, 'none', color.paper, 6)}
    <path d='${route}' fill='none' stroke='${tint}' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' marker-end='url(#${prefix}-${second ? 'return' : 'forward'})'/>
    <circle class='art-motion ${prefix}-packet' r='4.5' opacity='0' fill='${tint}' stroke='${color.paper}' stroke-width='1.5' style='offset-path:path("${route}");animation-delay:${delay}s'/>`;
}
const pulse = (prefix, body, delay = 0) => `<g class='art-motion ${prefix}-pulse' style='animation-delay:${delay}s'>${body}</g>`;

function standingWindow(x, y, w, h, { tone = color.mint, title = '', body = '', direction = 1, base = color.light } = {}) {
  const cx = x + w / 2, cy = y + h / 2;
  const scale = w > 330 ? .82 : .92;
  const bottom = cy + scale * (y + h - cy);
  const sideX = 14 * direction;
  const frontEdge = direction === 1 ? x + w : x;
  const bevel = 2 * sideX * axis * direction;
  const face = shape(`M${frontEdge} ${y + 4}l${sideX} -${bevel}v${h - 10}l${-sideX} ${bevel}Z`, color.shade)
    + shape(`M${x + 4} ${y}l${sideX} -${bevel}h${w - 8}l${-sideX} ${bevel}Z`, color.light)
    + box(x, y, w, h, color.paper, 11)
    + shape(`M${x + 11} ${y + 1}h${w - 22}q10 0 10 10v16H${x + 1}V${y + 11}q0-10 10-10Z`, tone, color.ink, 1.2)
    + dot(x + 13, y + 14, 2.7, color.teal, 'none') + dot(x + 24, y + 14, 2.7, color.gold, 'none')
    + (title ? text(x + 35, y + 19, title, { size: 14, fill: color.ink }) : '')
    + shape(`M${x + 11} ${y + h - 7}h${w - 22}`, 'none', color.cream, 1.35)
    + body;
  return plinth(cx, bottom + 29, Math.min(w * .67 + 25, 230), 54, { tone: base, direction })
    + depthFace(cx, bottom, shape(`M${cx - 12} ${bottom - 10}h24l8 31h-40Z`, color.shade)
      + shape(`M${cx - 6} ${bottom + 2}v12`, 'none', color.paper, 1.3), { direction })
    + depthFace(cx, cy, face, { direction, scale });
}

function documentPage(x, y, w, h, { tone = color.paper, label = '', body = '', direction = 1, deck = true } = {}) {
  const fold = 19, r = x + w, bottom = y + h, cx = x + w / 2;
  const layer = 7 * direction, offset = Math.abs(layer) * axis * 2;
  const face = shape(`M${x + layer} ${y - offset}H${r - fold + layer}l${fold} ${fold}V${bottom - offset}H${x + layer}Z`, color.cream)
    + shape(`M${x} ${y}H${r - fold}l${fold} ${fold}V${bottom}H${x}Z`, tone)
    + shape(`M${r - fold} ${y}v${fold}h${fold}Z`, color.cream, color.ink, 1.65)
    + shape(`M${x + 5} ${y + 7}v${h - 12}h${w - 11}`, 'none', color.paper, 1.25)
    + (label ? text(x + 13, y + 26, label, { fill: color.ink, size: 15 }) : '')
    + body;
  return (deck ? plinth(cx + 1, bottom + 8, w + 12, 31, { direction }) : '')
    + depthFace(cx, y + h / 2, face, { direction, scale: .92 });
}

function folder(x, y, w, h, tone = color.ochre) {
  const bottom = y + h, middle = x + w / 2;
  return plinth(middle + 6, bottom + 8, w + 10, 40)
    + depthFace(middle, bottom, shape(`M${x} ${y + 15}v-9q0-6 6-6h${w * .38}l14 13h${w * .62 - 20}q6 0 6 6v${h - 19}H${x}Z`, tone)
      + shape(`M${x} ${bottom}l13-${h - 34}q2-5 7-5h${w - 11}q6 0 5 5l-12 ${h - 34}Z`, color.light)
      + shape(`M${x + 21} ${y + 41}h${w - 23}`, 'none', color.paper, 1.4));
}

function cylinder(x, y, w = 106, h = 155, tone = color.mint) {
  const cx = x + w / 2;
  const body = shape(`M${x} ${y}v${h}c0 24 ${w} 24 ${w} 0V${y}`, tone);
  return plinth(cx, y + h + 16, w * .74, w * .74, { tone: color.cream }) + body
    + [h * .32, h * .65].map(n => shape(`M${x} ${y + n}c0 24 ${w} 24 ${w} 0`, 'none', color.ink, 1.5)).join('')
    + `<ellipse cx='${cx}' cy='${y}' rx='${w / 2}' ry='17' fill='${color.paper}' stroke='${color.ink}' stroke-width='2.15'/>`
    + shape(`M${x + 14} ${y + 32}v${h - 37}`, 'none', color.paper, 2)
    + dot(x + w - 20, y + 35, 3, color.teal, 'none');
}

function rack(x, y, w = 123, h = 148, body = color.light) {
  const right = x + w, cx = x + w / 2;
  const side = Math.min(w * .46, 57), extent = 2 * side * axis;
  const face = shape(`M${x} ${y}l${side} -${extent}h${w}l-${side} ${extent}Z`, color.paper)
    + shape(`M${right} ${y}l${side} -${extent}v${h}l-${side} ${extent}Z`, color.shade)
    + box(x, y, w, h, body, 7)
    + [0, 1, 2, 3].map(i => shape(`M${right + 8} ${y + 38 + i * 10 - 16 * axis}l${side - 17} -${(side - 17) * 2 * axis}`, 'none', color.edge, 1.25)).join('')
    + [0, 1, 2].map(i => {
      const yy = y + 12 + i * ((h - 19) / 3);
      return box(x + 10, yy, w - 20, (h - 41) / 3, color.paper, 5, color.edge, 1.2)
        + dot(x + 23, yy + (h - 41) / 6, 3, i === 1 ? color.gold : color.teal, 'none')
        + shape(`M${x + 37} ${yy + (h - 41) / 6}h${w - 56}`, 'none', color.shade, 2.4);
    }).join('');
  return plinth(cx + side / 2, y + h - side * axis / 2 + 4, w + 23, side + 20, { tone: body })
    + depthFace(cx, y + h, face);
}

function card(x, y, w, h, { title = 'Git', button = '설명 보기', open = false, tone = color.mint } = {}) {
  return box(x, y, w, h, tone, 8, color.teal, 1.6)
    + text(x + 12, y + 26, title, { size: 18, fill: color.ink, weight: 720 })
    + box(x + 12, y + 40, Math.min(w - 24, 88), 25, color.paper, 5, color.teal, 1.1)
    + text(x + 21, y + 57, button, { size: 13, fill: color.ink })
    + (open ? bars(x + 12, y + 77, [w - 27, w - 47], color.sage, 10, 3.2) : '');
}

function keycap(x, y, w, label, tone = color.paper) {
  return box(x, y + 5, w, 36, color.shade, 7)
    + box(x, y, w, 35, tone, 7)
    + center(x + w / 2, y + 23, label, 15, color.ink);
}

function controlKey(x, y, w, label, tone, direction = 1) {
  const mid = x + w / 2;
  return plinth(mid, y + 40, w + 12, 32, { direction })
    + depthFace(mid, y + 20, keycap(x, y, w, label, tone), { direction });
}

function keyboard(x, y, groups) {
  const caps = groups.map(([label, w, tone], i) => {
    const offset = groups.slice(0, i).reduce((sum, [, width]) => sum + width + 8, 0);
    return keycap(x + 16 + offset, y + 13, w, label, tone);
  }).join('');
  const w = groups.reduce((sum, [, width]) => sum + width + 8, 0) + 24;
  const cx = x + w / 2, cy = y + 32;
  return plinth(cx, cy + 8, w + 13, 69, { tone: color.cream })
    + svgGroup(caps, `matrix(1 ${axis} -.59 ${.59 * axis} ${cy * .59} ${(1 - .59 * axis) * cy - axis * cx - 6})`);
}

function cursor(x, y, fill = color.ochre) {
  return shape(`M${x} ${y}l0 28 7-8 5 10 6-3-5-10 10-2Z`, fill);
}

function picture(x, y, w, h) {
  const bottom = y + h - 10;
  return box(x, y, w, h, color.blue, 5, color.ink, 1.6)
    + dot(x + w * .78, y + h * .28, h * .085, color.ochre, color.gold, 1.15)
    + shape(`M${x + 7} ${bottom}l${w * .23} -${h * .31} ${w * .18} ${h * .16} ${w * .16} -${h * .11} ${w * .22} ${h * .26}Z`, color.sage, color.teal, 1.4);
}

function frame(prefix, heading, body, caption, context = '') {
  const markers = [['forward', color.teal], ['return', color.gold]].map(([name, tint]) =>
    `<marker id='${prefix}-${name}' viewBox='0 0 12 12' refX='10' refY='6' markerWidth='9' markerHeight='9' orient='auto' markerUnits='userSpaceOnUse'>${shape('M2 2l8 4-8 4', 'none', tint, 2.1)}</marker>`).join('');
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 550' class='topic-art-svg section-art-svg ${prefix}' aria-hidden='true' focusable='false'>
    <desc>${esc([heading, context, caption].filter(Boolean).join(' · '))}</desc>
    <defs>${markers}</defs>
    <style>
      @keyframes ${prefix}-packet{0%,12%{offset-distance:0%;opacity:0}20%,72%{opacity:1}96%,100%{offset-distance:100%;opacity:0}}
      @keyframes ${prefix}-pulse{0%,100%{opacity:.34}45%,65%{opacity:1}}
      .${prefix}-packet{animation:${prefix}-packet 4.9s ease-in-out infinite}
      .${prefix}-pulse{animation:${prefix}-pulse 4.9s ease-in-out infinite}
      @media(prefers-reduced-motion:reduce){.${prefix} .${prefix}-packet{display:none}.${prefix} .art-motion{animation:none!important}}
    </style>
    <g font-family='Pretendard Variable,Pretendard,Malgun Gothic,system-ui,sans-serif'>
      ${body}
      ${center(380, 502, caption, 16)}
    </g>
  </svg>`;
}

// Locally bundled brand artwork. Credits are in DESIGN_REFERENCES.md and on artwork with Vue.
function brandIcon(name, x, y, size) {
  if (name === 'vue') return `<svg x='${x}' y='${y}' width='${size}' height='${size}' viewBox='0 0 261.76 226.69' aria-hidden='true'><g transform='matrix(1.3333 0 0 -1.3333 -76.311 313.34)'><g transform='translate(178.06 235.01)'><path d='m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z' fill='#41b883'/></g><g transform='translate(178.06 235.01)'><path d='m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z' fill='#aacdd5'/></g></g></svg>`;
  const fill = { react: '#61dafb', fastapi: '#4ce2cb', flask: '#fffdf6', django: '#e1f1e1', spring: '#8bd75e' }[name];
  return `<svg x='${x}' y='${y}' width='${size}' height='${size}' viewBox='0 0 24 24' aria-hidden='true'><path d='${brandIconPaths[name]}' fill='${fill}'/></svg>`;
}
function brandTile(x, y, icon, name) {
  return box(x, y + 4, 83, 32, color.shade, 6, color.edge, 1.3)
    + box(x, y, 83, 32, color.paper, 6, color.edge, 1.3)
    + box(x + 4, y + 4, 24, 24, color.ink, 4, 'none', 0)
    + brandIcon(icon, x + 7, y + 7, 18)
    + text(x + 33, y + 21, name, { size: 12.5, fill: color.ink });
}
const logoCredit = () => center(380, 533, 'Simple Icons · Vue © Evan You / CC BY 4.0 · creativecommons.org/licenses/by/4.0', 12);


function structuredPrompt() {
  const p = 'sa-markdown-map';
  const source = documentPage(91, 147, 222, 211, {
    tone: color.light,
    label: 'Markdown 원문',
    body: code(112, 222, '## 계획', 20) + code(112, 260, '- 문서 작성') + code(112, 300, '**중요**', 16, color.gold),
  });
  const rendered = documentPage(455, 140, 200, 222, {
    label: '읽는 화면',
    body: text(476, 211, '계획', { size: 20, fill: color.ink }) + bars(476, 229, [146], color.shade)
      + dot(482, 267, 3, color.teal, 'none') + text(495, 272, '문서 작성')
      + text(476, 312, '중요', { fill: color.ink, weight: 800 })
      + pulse(p, shape('M473 320h50', 'none', color.gold, 2.8), 1.25),
  });
  return frame(p, 'Codex 계획문으로 문법 연습', `
    ${source}
    ${rendered}
    ${flow(p, 330, 258, 428, 248)}
  `, '원문을 써 보고 읽는 화면과 비교합니다');
}

function typoraImageFlow() {
  const p = 'sa-markdown-typora-images';
  return frame(p, '이미지와 문서를 함께 공유하기', `
    ${documentPage(84, 174, 126, 143, {tone: color.blue, body: picture(95, 194, 103, 87)})}
    ${controlKey(102, 331, 87, 'Ctrl + V', color.mint, -1)}
    ${folder(274, 238, 169, 109)}
    ${documentPage(302, 131, 135, 173, {label: 'README.md', body: bars(316, 188, [100, 64], color.sage), deck: false})}
    ${captionChip(354, 388, 'assets/', 100, color.ochre)}
    ${standingWindow(519, 170, 151, 143, {title: 'GitHub', body: picture(542, 210, 103, 78)})}
    ${flow(p, 220, 250, 284, 221)}
    ${flow(p, 454, 238, 509, 238, {second: true, delay: 1.25})}
  `, '이미지는 로컬에 저장하고 Git으로 함께 올립니다', 'Typora · 내 프로젝트 · commit · push');
}

function readmeSections() {
  const p = 'sa-tools-markdown';
  const chapter = (x, y, number, label, tone) => documentPage(x, y, 154, 89, {
    tone, direction: -1, deck: false,
    body: dot(x + 21, y + 25, 10, color.paper, color.edge, 1.3)
      + center(x + 21, y + 30, number, 11, color.ink)
      + text(x + 37, y + 30, label, { size: 14, fill: color.ink })
      + bars(x + 14, y + 50, [114, 88], color.shade),
  });
  return frame(p, 'README에 프로젝트를 소개합니다', `
    ${documentPage(112, 146, 220, 241, {
      label: 'README.md',
      body: code(133, 219, '# Git 연습 메모', 18, color.ink)
        + code(133, 255, '## 소개') + code(133, 286, '## 준비') + code(133, 318, '## 확인 방법'),
    })}
    ${plinth(546, 405, 177, 55, {tone: color.mint, direction: -1})}
    ${chapter(474, 109, '1', '프로젝트 소개', color.mint)}
    ${chapter(474, 203, '2', '준비할 것', color.ochre)}
    ${chapter(474, 297, '3', '확인 방법', color.blue)}
    ${flow(p, 346, 240, 463, 237, {turn: -1})}
  `, '소개와 준비, 확인 방법을 한 문서에 담습니다', '제목 · 목록 · 링크 · 표');
}

function readmeToGithub() {
  const p = 'sa-markdown-readme-push';
  return frame(p, 'README를 작성해 GitHub에서 보기', `
    ${folder(84, 245, 176, 111)}
    ${documentPage(118, 150, 132, 151, {label: 'README.md', body: bars(131, 205, [95, 72, 85], color.sage), deck: false})}
    ${captionChip(170, 397, 'git-practice', 138)}
    ${plinth(374, 282, 58, 53, {tone: color.ochre, thickness: 13})}
    ${dot(374, 281, 14, color.gold, color.paper)}
    ${center(374, 334, 'commit', 15, color.ink)}
    ${standingWindow(500, 157, 172, 164, { title: 'GitHub 저장소', body: code(517, 217, 'README.md')
      + bars(517, 235, [123, 107, 114], color.sage) + pulse(p, tick(635, 289), 1.9) })}
    ${flow(p, 267, 273, 318, 282)}
    ${flow(p, 430, 278, 490, 241, {second: true, delay: .95})}
    ${center(460, 298, 'push', 14, color.gold)}
  `, '저장소에서 README 화면 확인', '원래 작업 폴더 · Git 기록');
}

function readmeFetchAndPull() {
  const p = 'sa-markdown-readme-fetch';
  return frame(p, '원격의 새 기록을 다른 복제본에서 확인', `
    ${rack(88, 182, 99, 140, color.blue)}
    ${captionChip(139, 415, 'GitHub · 원격', 120, color.blue)}
    ${documentPage(322, 180, 131, 162, {label: 'origin/main', tone: color.mint, body: bars(336, 242, [89, 70], color.wire)})}
    ${captionChip(388, 430, '파일은 그대로', 127, color.mint)}
    ${folder(532, 245, 132, 105, color.ochre)}
    ${documentPage(559, 169, 100, 138, {body: code(570, 198, 'README.md', 13) + bars(571, 219, [65, 50], color.sage), deck: false})}
    ${flow(p, 219, 240, 308, 242)}
    ${center(262, 219, '① fetch', 15, color.teal)}
    ${flow(p, 465, 249, 548, 237, {second: true, delay: 1.15})}
    ${center(509, 222, '② pull 반영', 15, color.gold)}
  `, '홈의 기존 git-practice-clone에 반영합니다');
}

function markdownBranches() {
  const p = 'sa-markdown-code';
  return frame(p, '같은 문법, 다른 편집 경험', `
    ${standingWindow(87, 170, 169, 145, {
      title: 'Notion',
      body: box(104, 216, 136, 23, color.mint, 4, color.edge, 1.2)
        + box(104, 251, 83, 25, color.ochre, 4, color.edge, 1.2)
        + box(197, 251, 43, 25, color.lilac, 4, color.edge, 1.2),
    })}
    ${standingWindow(512, 170, 157, 145, {
      tone: color.lilac, title: 'Obsidian',
      body: shape('M537 275l51-54 56 48m-56-48 5 68m-56-14 56 14 51-20', 'none', color.wire, 1.65)
        + [[537,275],[588,221],[644,269],[593,289]].map(([x,y])=>dot(x,y,6,color.lilac)).join(''),
    })}
    ${documentPage(315, 211, 128, 156, {label: 'Markdown', body: code(329, 269, '# 노트') + code(329, 304, '- 목록')})}
    ${flow(p, 307, 277, 265, 254)}
    ${flow(p, 452, 279, 504, 254, {second: true, delay: 1.1})}
  `, '블록으로 편집하거나 노트를 연결합니다');
}

function reviewDiff() {
  const p = 'sa-tools-map';
  return frame(p, '변경한 코드에서 세 가지 확인', `
    ${standingWindow(187, 106, 378, 253, {
      title: 'PyCharm · 변경 비교',
      body: shape('M376 150v184', 'none', color.edge, 1.5)
        + code(209, 180, '이전', 15, color.muted) + code(393, 180, '변경', 15, color.muted)
        + box(208, 201, 148, 30, color.rose, 5, 'none', 0) + code(218, 221, '− 제목: 터미널', 15, color.rust)
        + box(392, 201, 151, 30, color.mint, 5, 'none', 0) + code(402, 221, '+ 윈도우 터미널', 15)
        + code(216, 268, 'id: terminal', 15, color.muted) + code(397, 268, 'id: terminal', 15, color.muted)
        + bars(215, 297, [113, 95], color.shade) + bars(400, 297, [123, 90], color.shade)
        + pulse(p, cursor(514, 228), 1),
    })}
    ${captionChip(259, 460, '경로', 65)}
    ${captionChip(376, 460, '차이', 65, color.mint)}
    ${captionChip(493, 460, '실행', 65)}
  `, '바뀐 줄을 읽고, 유지할 ID와 실행 결과도 확인합니다');
}

function vscodeFinding() {
  const p = 'sa-tools-vscode';
  const rows = [
    { key: 'Ctrl + P', target: '파일 이름', example: 'README.md', tone: color.mint },
    { key: 'Ctrl + Shift + F', target: '문서 내용', example: '확인 방법', tone: color.blue },
    { key: 'Ctrl + Shift + P', target: '기능 이름', example: '미리보기', tone: color.ochre },
  ];
  return frame(p, '찾고 싶은 것에 맞는 단축키', `
    ${plinth(380, 409, 265, 100, { tone: color.cream })}
    ${box(101, 114, 558, 300, color.shade, 17, color.ink, 2.1)}
    ${box(94, 106, 558, 300, color.paper, 17, color.ink, 2.3)}
    ${box(95, 107, 556, 48, color.mint, 15, color.ink, 1.4)}
    ${dot(113, 130, 4, color.teal, 'none')}
    ${dot(127, 130, 4, color.gold, 'none')}
    ${text(145, 136, 'VS Code', { size: 20, fill: color.ink })}
    ${text(127, 184, '단축키', { size: 16, fill: color.muted })}
    ${text(388, 184, '찾을 대상', { size: 16, fill: color.muted })}
    ${rows.map(({key, target, example, tone}, index) => {
      const y = 197 + index * 65;
      return box(113, y, 520, 53, tone, 9, color.edge, 1.5)
        + box(127, y + 9, 222, 35, color.paper, 6, color.ink, 1.6)
        + center(238, y + 32, key, 16, color.ink)
        + text(382, y + 24, target, { size: 17, fill: color.ink, weight: 720 })
        + text(382, y + 42, example, { size: 14, fill: color.muted });
    }).join('')}
    ${pulse(p, cursor(593, 332, color.paper), 0.8)}
  `, '파일 이름 · 문서 내용 · 기능 이름을 차례로 찾아봅니다');
}

function sharedShortcutPractice() {
  const p = 'sa-tools-shortcuts-practice';
  const outcomes = [['찾기 · 이동', color.mint], ['편집 · 저장', color.blue], ['화면 · 터미널', color.ochre]];
  return frame(p, '손으로 익히는 편집기 단축키', `
    ${keyboard(104, 257, [['Ctrl', 44, color.mint], ['Shift', 53, color.paper], ['P', 33, color.ochre]])}
    ${center(200, 205, '단축키를 눌러 보기', 16)}
    ${standingWindow(429, 139, 248, 211, {
      tone: color.lilac,
      title: '편집기에서 결과 확인',
      body: outcomes.map(([label, tone], i) => box(449, 186 + i * 47, 201, 32, tone, 6, color.edge, 1.1)
        + text(461, 207 + i * 47, label, { size: 15 }) + tick(626, 199 + i * 47)).join('')
        + pulse(p, cursor(599, 259), 1.1),
    })}
    ${flow(p, 307, 273, 418, 251)}
  `, 'VS Code에서 눌러 보고 PyCharm의 키맵도 비교합니다');
}

function pycharmEnvironment() {
  const p = 'sa-tools-pycharm';
  return frame(p, '실행 환경과 단축키 설정 구별하기', `
    ${rack(103, 211, 107, 126, color.mint)}
    ${captionChip(160, 391, 'Python 실행 환경', 148)}
    ${standingWindow(280, 128, 195, 158, {
      title: 'PyCharm',
      body: box(307, 177, 139, 65, color.mint, 6, color.edge, 1.1)
        + shape('M365 195l19 14-19 13Z', color.sage, color.teal, 1.7),
    })}
    ${keyboard(527, 275, [['Ctrl', 44, color.mint], ['P', 31, color.blue]])}
    ${captionChip(576, 391, 'VS Code 키맵', 140)}
    ${flow(p, 295, 275, 225, 270)}
    ${flow(p, 472, 278, 531, 279, {delay: 1.1, second: true})}
  `, '실행할 환경과 익숙한 키 배치는 서로 다른 설정입니다');
}

function integratedWorkbench() {
  const p = 'sa-codex-context';
  const screen = box(272, 149, 173, 94, color.light, 4, color.edge, 1.4)
    + code(282, 172, '# Git 연습 메모', 15) + bars(283, 190, [116, 93], color.sage)
    + box(455, 149, 171, 94, color.mint, 4, color.edge, 1.4)
    + text(466, 172, 'Markdown 미리보기', { size: 13 }) + bars(467, 190, [131, 109], color.sage)
    + box(272, 251, 173, 40, color.ink, 5, 'none', 0) + code(282, 276, '> git diff', 14, color.mint)
    + box(455, 251, 171, 40, color.blue, 5, 'none', 0) + text(466, 276, 'Git 변경 비교', { size: 14 })
    + pulse(p, dot(614, 267, 4, color.gold, color.paper, 1.1), 1.1);
  return frame(p, 'README 한 줄로 도구 연결하기', `
    ${documentPage(87, 170, 124, 164, { label: 'README.md', tone: color.blue, body: bars(103, 220, [86, 64, 76], color.wire) })}
    ${standingWindow(250, 102, 398, 209, { title: 'VS Code 작업대', body: screen })}
    ${flow(p, 218, 247, 267, 235, {turn:-1})}
    ${rack(558, 365, 72, 70, color.blue)}
    ${captionChip(469, 438, 'GitHub 원격', 118)}
  `, '원격 파일은 저장만으론 그대로입니다', 'README 수정 · 저장 · 통합 터미널');
}

function htmlCardPractice() {
  const p = 'sa-tools-html';
  return frame(p, 'HTML · 구조와 화면을 연결하기', `
    ${documentPage(86, 114, 272, 244, {
      label: 'VS Code · index.html',
      body: code(110, 177, '<article>', 16, color.muted)
        + code(126, 212, '<h1>Git</h1>', 16, color.teal)
        + code(126, 251, '<button>설명 보기</button>', 14, color.teal)
        + code(126, 287, '<p>변경을 확인하고', 16, color.teal)
        + code(126, 311, '기록합니다.</p>', 16, color.teal)
        + code(110, 338, '</article>', 16, color.muted),
    })}
    ${standingWindow(468, 141, 193, 202, {title: '브라우저', body: card(486, 184, 159, 133, {open: true})
      + pulse(p, shape('M503 284h105', 'none', color.gold, 2), 1.35)})}
    ${flow(p, 369, 252, 464, 234, {turn:-1})}
  `, '제목 · 버튼 · 설명이 같은 순서로 화면에 놓입니다');
}

function cssCardPractice() {
  const p = 'sa-tools-css';
  return frame(p, 'CSS · 내용에 모양 더하기', `
    ${documentPage(97, 149, 236, 203, {
      label: 'style.css', tone: color.blue,
      body: code(118, 212, '.card {', 17, color.ink) + code(131, 248, 'padding: 24px;', 17)
        + code(131, 282, 'border-radius: 12px;', 16) + code(118, 319, '}', 17, color.ink),
    })}
    ${standingWindow(444, 119, 211, 229, {title: '같은 Git 카드', body: card(461, 169, 172, 145, {open: true})
      + pulse(p, shape('M462 241h12m-12-5v10m12-10v10', 'none', color.gold, 2.2), 1.1)})}
    ${flow(p, 351, 257, 435, 257)}
    ${captionChip(543, 416, '24px 안쪽 여백', 158, color.ochre)}
  `, '같은 구조에서 색 · 여백 · 모서리가 달라집니다');
}

function javascriptCardPractice() {
  const p = 'sa-tools-javascript';
  return frame(p, 'JavaScript · 클릭하면 상태가 바뀝니다', `
    ${documentPage(99, 151, 245, 187, {
      label: 'script.js', tone: color.ochre,
      body: code(119, 220, 'click → hidden 변경', 17, color.ink)
        + code(119, 256, 'detail.hidden = !isHidden;', 13) + bars(120, 285, [172, 128], color.shade),
    })}
    ${standingWindow(415, 123, 253, 217, {
      title: '브라우저',
      body: card(433, 169, 101, 139, {tone: color.light}) + card(549, 169, 101, 139, {open: true})
        + center(483, 330, '접힘', 13) + center(599, 330, '펼침', 13) + pulse(p, cursor(490, 231), .65),
    })}
    ${flow(p, 362, 247, 406, 231)}
  `, '버튼을 다시 누르면 설명을 숨깁니다');
}


function localAndRemote() {
  const p = 'sa-web-map';
  const layer = (cx, y, label, tone) => plinth(cx, y, 147, 64, { tone, side: tone, thickness: 19 })
    + depthFace(cx, y, center(cx - 32, y + 24, label, 14, color.ink));
  return frame(p, '프론트엔드 · 브라우저 화면', `
    ${layer(217, 319, 'JavaScript · 동작', color.ochre)}
    ${layer(217, 253, 'CSS · 모양', color.blue)}
    ${layer(217, 187, 'HTML · 내용', color.mint)}
    ${brandTile(121, 405, 'react', 'React')}${brandTile(213, 405, 'vue', 'Vue')}
    ${standingWindow(436, 115, 234, 217, {title: '브라우저', body: card(459, 162, 188, 143, {title:'Git 강의 카드', open:true})
      + pulse(p, cursor(534, 232), 1.45)})}
    ${flow(p, 332, 254, 425, 239, {turn: -1})}
    ${logoCredit()}
  `, '화면의 구조 · 모양 · 동작을 만듭니다');
}

function webResponsibilities() {
  const p = 'sa-web-http';
  const monitor = (x, y, label, tone, direction, mark) => standingWindow(x, y, 228, 191, {
    title: label,
    tone,
    direction,
    body: card(x + 17, y + 44, 196, 124, {title: 'Git 강의 카드', open: true}) + mark,
  });
  return frame(p, '같은 카드, 두 가지 실행 방법', `
    ${monitor(83, 136, 'Live Server · VS Code', color.mint, 1, pulse(p, tick(286, 151)))}
    ${monitor(419, 136, 'Vite · 개발 도구', color.lilac, -1, pulse(p, cursor(600, 246), 1.2))}
    ${captionChip(195, 425, '저장하면 화면 갱신', 188, color.mint)}
    ${captionChip(537, 425, 'npm run dev', 157, color.lilac)}
    ${center(376, 215, '=', 21, color.wire)}
  `, '이번 카드 실습: Live Server · Vite 실행 명령 읽어보기');
}

function serverToBrowser() {
  const footer = `<g font-family='Pretendard Variable,Pretendard,Malgun Gothic,system-ui,sans-serif'>
    ${center(127, 461, '프론트엔드', 13.5)}${center(422, 461, '백엔드 · Python', 13.5)}${center(633, 461, 'Java', 13.5)}
    ${brandTile(40, 471, 'react', 'React')}${brandTile(131, 471, 'vue', 'Vue')}
    ${brandTile(290, 471, 'fastapi', 'FastAPI')}${brandTile(381, 471, 'flask', 'Flask')}
    ${brandTile(472, 471, 'django', 'Django')}${brandTile(591, 471, 'spring', 'Spring')}
    ${logoCredit()}
  </g>`;
  return webGridCandidate
    .replace('</desc>', ' 프론트엔드: React, Vue. 백엔드: Python, FastAPI, Flask, Django, Java, Spring. Live Server는 화면 파일 확인 도구입니다.</desc>')
    .replace(/<\/svg>\s*$/, `${footer}</svg>`);
}

function htmlJsonCard() {
  const p = 'sa-backend-html-json';
  return frame(p, 'HTML 안의 JSON으로 카드 채우기', `
    ${documentPage(103, 155, 200, 190, {
      label: 'HTML',
      body: code(120, 211, '{ "title": "Git" }', 17)
        + box(121, 239, 162, 48, color.lilac, 7, color.edge, 1.3)
        + code(133, 270, 'JSON.parse(...)', 15, color.ink),
    })}
    ${standingWindow(429, 118, 222, 222, {title: '브라우저 · 카드', body: card(452, 167, 177, 140, {open: true})
      + pulse(p, shape('M462 199h28', 'none', color.gold, 2.8), 1.05)})}
    ${flow(p, 322, 248, 421, 249, {turn:-1})}
  `, 'HTML 안에 둔 데이터를 브라우저에서 읽습니다');
}

function frontendJsonCards() {
  const p = 'sa-web-json-card';
  return frame(p, '데이터 한 개에서 카드 목록으로', `
    ${center(380, 66, '데이터 한 개에서 카드 목록으로', 25, color.ink)}
    ${documentPage(68, 175, 193, 172, {
      label: 'HTML · Alpine.js',
      body: code(83, 222, 'x-data', 17, color.teal)
        + code(83, 246, '01 lesson: { ... }', 14, color.ink)
        + code(93, 270, '↓', 17, color.teal)
        + code(83, 294, '02 lessons: [', 14, color.ink)
        + code(93, 317, ' { ... }, { ... } ]', 13, color.ink),
    })}
    ${flow(p, 268, 258, 308, 258, {turn:-1})}
    ${box(311, 226, 139, 74, color.shade, 10, color.edge, 1.4)}
    ${box(306, 218, 139, 74, color.lilac, 10)}
    ${center(375, 247, 'x-text', 18, color.ink)}
    ${center(375, 272, 'x-for', 18, color.teal)}
    ${flow(p, 452, 258, 489, 258, {turn:-1, delay:1.2})}
    ${standingWindow(491, 133, 198, 243, {
      title: '브라우저',
      body: card(508, 174, 164, 84, {title:'윈도우 터미널', tone: color.ochre})
        + card(508, 271, 164, 84, {title:'Git'})
        + pulse(p, shape('M520 295h25', 'none', color.teal, 2.4), 1.9),
    })}
  `, '한 개를 표시한 뒤 배열을 반복해 두 장으로 늘립니다');
}

function futureBackendSteps() {
  const p = 'sa-web-future-backend';
  const arrow = (start, end, y, delay = 0) => {
    const route = `M${start} ${y}H${end}`;
    return `<path d='${route}' fill='none' stroke='${color.teal}' stroke-width='2.4' stroke-linecap='round' marker-end='url(#${p}-forward)'/>
      <circle class='art-motion ${p}-packet' r='4' opacity='0' fill='${color.gold}' style='offset-path:path("${route}");animation-delay:${delay}s'/>`;
  };
  const miniature = (x, y, contents) => svgGroup(contents, `translate(${x} ${y}) scale(.44)`);
  const dataPage = (x, y) => miniature(x, y, documentPage(0, 0, 110, 88, {
    label:'x-data', tone:color.mint,
    body: code(14, 55, '[ { ... } ]', 17, color.teal),
  }));
  const server = (x, y) => miniature(x, y, rack(0, 20, 80, 96, color.mint));
  const jsonPage = (x, y) => miniature(x, y, documentPage(0, 0, 84, 88, {
    label:'JSON', tone:color.ochre,
    body: code(20, 60, '{ ... }', 18, color.teal),
  }));
  const database = (x, y) => miniature(x, y, cylinder(0, 17, 76, 97, color.lilac));
  const browser = (x, y) => miniature(x, y, standingWindow(0, 0, 130, 90, {
    title:'Alpine.js', tone:color.blue,
    body: box(12, 37, 106, 40, color.mint, 6, color.teal, 1.5)
      + bars(22, 47, [58, 42], color.teal, 11, 3),
  }));
  return frame(p, '데이터가 카드가 되는 세 단계', `
    ${center(380, 62, '데이터가 카드가 되는 세 단계', 25, color.ink)}

    ${center(53, 140, '01', 19, color.teal)}
    ${center(53, 160, '이번 강의', 12, color.teal)}
    ${dataPage(183, 101)}
    ${arrow(254, 500, 145)}
    ${browser(514, 101)}
    ${center(206, 190, 'x-data · lessons', 15, color.ink)}
    ${center(543, 190, 'Alpine.js 카드', 15, color.ink)}

    ${center(53, 250, '02', 19, color.gold)}
    ${center(53, 270, '후속 강의', 12, color.gold)}
    ${server(132, 208)}
    ${arrow(197, 311, 255, .4)}
    ${jsonPage(328, 210)}
    ${arrow(389, 499, 255, .8)}
    ${browser(514, 210)}
    ${center(154, 300, 'FastAPI · 딕셔너리', 14, color.ink)}
    ${center(348, 300, 'JSON 응답', 15, color.ink)}
    ${center(543, 300, 'Alpine.js 카드', 15, color.ink)}

    ${center(53, 360, '03', 19, color.gold)}
    ${center(53, 380, '후속 강의', 12, color.gold)}
    ${database(100, 318)}
    ${arrow(155, 224, 365, 1.2)}
    ${server(239, 318)}
    ${arrow(303, 372, 365, 1.6)}
    ${jsonPage(389, 320)}
    ${arrow(450, 499, 365, 2)}
    ${browser(514, 320)}
    ${center(117, 410, 'SQLite', 15, color.ink)}
    ${center(258, 410, 'FastAPI · DB 조회', 14, color.ink)}
    ${center(409, 410, 'JSON 응답', 15, color.ink)}
    ${center(543, 410, 'Alpine.js 카드', 15, color.ink)}

    ${center(380, 456, '서버가 데이터를 읽어 응답하고 브라우저가 카드로 표시합니다', 15)}
  `, '서버의 데이터와 데이터베이스는 후속 강의에서 다룹니다');
}

function pythonDictionaryApi() {
  const p = 'sa-backend-python';
  return frame(p, 'Python 딕셔너리와 JSON 응답', `
    ${rack(78, 150, 97, 145, color.mint)}
    ${captionChip(134, 397, 'FastAPI · :8000', 150, color.ochre)}
    ${documentPage(285, 167, 146, 158, {
      label: '/api/dict',
      tone: color.mint,
      body: code(297, 245, '"title": "Git"', 13, color.ink) + bars(299, 268, [78, 99], color.sage)
        + pulse(p, dot(408, 294, 4, color.teal, color.paper, 1.4), .65),
    })}
    ${standingWindow(511, 145, 175, 178, {title: '브라우저 · :8000', body: card(527, 190, 143, 111, {open: true})})}
    ${flow(p, 230, 241, 276, 223, {turn:-1})}
    ${flow(p, 440, 251, 504, 233, {delay: 1.15, turn:-1})}
  `, '화면과 API 모두 FastAPI 주소에서 제공됩니다');
}

function sqliteApi() {
  const p = 'sa-backend-sqlite';
  return frame(p, 'SQLite에서 카드 데이터를 가져오기', `
    ${cylinder(91, 166, 109, 150, color.lilac)}
    ${captionChip(144, 135, 'SQLite', 79, color.lilac)}
    ${rack(306, 164, 117, 159, color.mint)}
    ${captionChip(365, 360, '/api/sqlite', 104, color.mint)}
    ${standingWindow(528, 156, 145, 165, {title: '브라우저', body: card(540, 195, 120, 111, {open: true})})}
    ${flow(p, 212, 242, 299, 242)}
    ${flow(p, 479, 242, 519, 236, {second: true, delay: 1.15})}
    ${center(253, 222, '조회', 14)}
    ${center(502, 210, 'JSON', 14)}
  `, 'DB의 행을 조회해 같은 카드 화면에 보여 줍니다');
}

function templateEngines() {
  const p = 'sa-web-jinja';
  return frame(p, '서버 템플릿에 데이터 넣기', `
    ${cylinder(106, 195, 93, 115, color.blue)}
    ${captionChip(152, 162, 'DB', 52, color.blue)}
    ${documentPage(295, 137, 174, 185, {
      label: 'Jinja2',
      tone: color.lilac,
      body: code(310, 217, '{{ lesson.title }}', 14)
        + box(310, 251, 130, 34, color.paper, 6, color.edge, 1.3)
        + center(375, 273, 'HTML 생성', 14) + pulse(p, tick(428, 304), .8),
    })}
    ${standingWindow(543, 160, 133, 161, {title: '브라우저', body: card(554, 200, 108, 107, {open: true})})}
    ${flow(p, 213, 246, 287, 245)}
    ${flow(p, 482, 246, 534, 245, {second: true, delay: 1.2})}
  `, 'FastAPI 주소에서 HTML 제공 · 브라우저가 화면을 그립니다');
}

function cardLayers() {
  const p = 'sa-frontend-css';
  return frame(p, '같은 CSS를 다른 방식으로 표현', `
    ${documentPage(87, 118, 242, 99, {
      label: 'CSS 속성', tone: color.blue, direction: -1,
      body: code(103, 190, 'padding: 24px;', 17),
    })}
    ${documentPage(88, 299, 241, 91, {
      label: 'Tailwind 클래스', tone: color.mint, direction: -1,
      body: code(105, 358, 'p-6  rounded-xl', 17),
    })}
    ${standingWindow(465, 141, 197, 204, {title: '같은 Git 카드',body: card(479, 180, 166, 142, {open:true})
      + pulse(p, shape('M480 218h13m-13-5v10m13-10v10', 'none', color.gold, 2.2), 1.15)})}
    ${flow(p, 338, 151, 457, 222)}
    ${flow(p, 338, 331, 457, 270, {second: true, delay: 1.45, turn:-1})}
    ${captionChip(559, 442, '여백 · 모서리', 142, color.ochre)}
  `, '기본 CSS와 유틸리티 클래스의 결과를 비교합니다');
}

function alpineStateGraph() {
  const p = 'sa-frontend-alpine';
  return frame(p, '클릭 → 상태 → 화면 표시', `
    ${controlKey(97, 248, 112, '@click', color.ochre)}
    ${pulse(p, cursor(178, 270), .15)}
    ${plinth(374, 222, 147, 43, {tone: color.mint})}
    ${depthFace(374, 185, box(303, 146, 141, 74, color.mint, 37)
      + box(309, 151, 129, 63, color.sage, 31, color.edge, 1.35)
      + dot(402, 183, 23, color.paper, color.teal, 2.2)
      + pulse(p, dot(402, 183, 11, color.sage, 'none'), 1.2), {direction:-1})}
    ${captionChip(374, 112, 'x-data', 87, color.mint)}
    ${center(374, 317, 'open · true / false', 15)}
    ${standingWindow(509, 214, 158, 137, {title: 'x-show', body: card(522, 248, 132, 93, {open: true})})}
    ${flow(p, 217, 259, 294, 201)}
    ${flow(p, 450, 202, 503, 254, {second: true, delay: 1.1})}
  `, '클릭이 상태를 바꾸고 현재 상태가 설명을 표시합니다');
}

function reusablePrompt() {
  const p = 'sa-codex-bonus';
  const notes = [['문제', color.mint], ['맥락', color.blue], ['보존', color.ochre], ['확인', color.lilac]];
  const notesFor = (x, y) => notes.map(([label,tone], index) => box(x, y + index * 33, 162, 22, tone, 4, color.edge, 1.1)
    + text(x + 9, y + 16 + index * 33, label, {size: 13, fill: color.ink}) + bars(x + 49, y + 9 + index * 33, [89], color.shade)).join('');
  return frame(p, '다음 작업에 다시 쓰는 요청 카드', `
    ${documentPage(104, 137, 209, 212, {label: '요청 카드', body: notesFor(123, 185)})}
    ${standingWindow(439, 126, 219, 215, {title: '다음 요청', tone: color.lilac, body: notesFor(463, 181)
      + pulse(p, cursor(582, 239), 1.25)})}
    ${flow(p, 326, 246, 427, 233)}
  `, '비어 있는 구획을 다음 작업의 실제 정보로 채웁니다');
}

function environmentParity() {
  const p = 'sa-tools-bonus';
  const hints = [['스크립트 경로', color.mint], ['Python 실행 파일', color.blue], ['작업 폴더', color.ochre]];
  const display = (x, y) => hints.map(([label, tone], i) => box(x, y + i * 42, 183, 26, tone, 4, color.edge, 1.1)
    + text(x + 11, y + 18 + i * 42, label, {size: 14,fill: color.ink})).join('');
  return frame(p, '실행 버튼과 터미널의 기준 맞추기', `
    ${standingWindow(93, 139, 221, 202, {title: 'PyCharm 실행 설정', body: display(111, 190)})}
    ${standingWindow(447, 139, 221, 202, {title: 'PowerShell', tone: color.blue, body: display(465, 190)})}
    ${hints.map((_,i)=>flow(p, 329, 201 + i * 42, 436, 201 + i * 42, { delay: i * .65, second: i === 1 })).join('')}
    ${captionChip(380, 435, '.venv / Scripts / python.exe', 236)}
  `, '두 방법에서 실행 파일 · 스크립트 · 작업 위치를 비교합니다');
}

function addressAndBuild() {
  const p = 'sa-web-bonus';
  return frame(p, '주소의 경로와 브라우저 해시 구별', `
    ${box(129, 123, 498, 57, color.paper, 16, color.edge, 1.65)}
    ${dot(153, 153, 4, color.sage, 'none')}
    ${code(174, 158, '/notes/', 20)}
    ${code(287, 158, '#/lesson/terminal', 20, color.gold)}
    ${shape('M174 168h83m30 0h200', 'none', color.shade, 1.6)}
    ${rack(139, 237, 109, 117, color.mint)}
    ${standingWindow(477, 233, 158, 104, {title: '브라우저', body:bars(495, 279, [114, 76], color.sage)})}
    ${flow(p, 200, 188, 193, 231)}
    ${flow(p, 393, 188, 482, 227, {second: true, delay: 1.1})}
    ${center(194, 437, '서버 요청', 15)}${center(552, 437, '화면 안 위치', 15)}
  `, '# 뒤의 fragment는 HTTP 요청에 전송되지 않습니다');
}

function completeClassNames() {
  const p = 'sa-frontend-bonus';
  return frame(p, 'Tailwind 3 · 완전한 클래스 문자열', `
    ${documentPage(106, 150, 217, 175, {
      label: '조립 문자열',
      tone: color.light,
      body: code(119, 222, 'bg-$' + '{color}-500', 19, color.rust)
        + shape('M118 230h169', 'none', color.rust, 1.9)
        + bars(119, 258, [134, 105], color.shade),
    })}
    ${documentPage(446, 131, 207, 211, {
      label: '완전한 문자열',
      tone: color.mint,
      body: code(462, 202, 'bg-teal-500', 18) + code(462, 239, 'bg-slate-500', 18)
        + code(462, 289, './templates/**/*.html', 13, color.ink) + pulse(p, tick(618, 225), 1.1),
    })}
    ${flow(p, 337, 239, 436, 237)}
    ${captionChip(539, 413, 'content 경로', 130)}
  `, '실제 템플릿 경로와 완전한 클래스가 빌드 대상에 있어야 합니다');
}

export const webSectionScenes = {
  'markdown-map': {title:'Codex 계획문으로 마크다운 문법 연습하기',description:'Codex 계획문의 제목, 목록, 강조와 링크 원문을 읽는 화면과 나란히 비교해 마크다운 문법을 연습합니다.',svg:structuredPrompt()},
  'markdown-typora-images': {title:'Typora로 이미지 붙여넣기와 GitHub에 올리기',description:'클립보드 이미지를 Typora에서 붙여넣어 프로젝트의 assets 폴더에 저장하고 README에서 참조한 뒤, 문서와 이미지를 Git으로 GitHub에 함께 올리는 과정을 구분합니다.',svg:typoraImageFlow()},
  'tools-markdown': {title:'README.md 항목별로 작성하기',description:'원래 git-practice 작업 폴더의 README.md에 프로젝트 소개, 준비할 것, 확인 방법을 제목과 목록 등 Markdown 문법으로 나누어 작성합니다.',svg:readmeSections()},
  'markdown-readme-push': {title:'작성한 README를 GitHub에 push하고 확인하기',description:'원래 git-practice 작업 폴더에서 README.md를 Git으로 add와 commit한 뒤 push합니다. GitHub 저장소 화면에 제목과 목록이 보이는지 확인합니다.',svg:readmeToGithub()},
  'markdown-readme-fetch': {title:'다른 clone 폴더에서 원격 변경 가져오기',description:'GitHub 원격 저장소의 새 README 커밋을 fetch로 원격 추적 기록에 가져와 확인하고, 이미 복제해 둔 git-practice-clone 폴더에서 pull로 작업 파일에 반영합니다. clone은 새 폴더를 처음 만드는 명령입니다.',svg:readmeFetchAndPull()},
  'markdown-code': {title:'공통 핵심 문법을 배우고 Notion·Obsidian의 차이 확인하기',description:'하나의 Markdown 문서에서 Notion의 블록 편집과 Obsidian의 노트 연결로 갈라지는 구조로 공통 문법과 앱별 확장을 설명합니다.',svg:markdownBranches()},
  'tools-map': {title:'Codex 변경을 PyCharm에서 확인하는 세 가지 질문',description:'변경 전후 문서의 제목 차이와 그대로인 ID를 비교하고 경로·차이·실행의 세 확인 지점을 짚습니다.',svg:reviewDiff()},
  'tools-vscode': {title:'무료 VS Code에서 필수 단축키로 찾아보기',description:'세 가지 단축키를 파일 이름, 문서 내용, 기능 이름의 검색 대상과 한 줄씩 짝지어 표시합니다.',svg:vscodeFinding()},
  'tools-shortcuts-practice': {title:'편집기 단축키를 직접 연습하기',description:'키보드의 조작이 편집기의 찾기와 이동, 편집과 저장, 화면과 터미널의 변화로 이어지는 과정을 확인합니다. VS Code에서 실습하고 PyCharm 키맵과 비교합니다.',svg:sharedShortcutPractice()},
  'tools-pycharm': {title:'Python용 PyCharm과 VS Code 키맵의 역할',description:'PyCharm에서 실행할 Python과 작업 폴더를 고르는 설정, 익숙한 단축키를 연결하는 키맵을 두 갈래로 분리합니다.',svg:pycharmEnvironment()},
  'codex-context': {title:'README 한 줄 수정으로 VS Code·Git·GitHub 연결하기',description:'같은 README를 수정하고 Markdown 미리보기와 통합 터미널, Git 변경 비교를 확인한 뒤 마지막으로 push된 GitHub 원격 문서와 비교합니다.',svg:integratedWorkbench()},
  'tools-html': {title:'HTML: 강의 카드의 내용과 구조 만들기',description:'VS Code에서 작성하는 index.html 본문의 h1 제목, button 버튼, p 설명이 같은 순서로 브라우저에 표시되는 구조를 비교합니다. 버튼의 속성은 그림에서 생략한 코드 일부입니다.',svg:htmlCardPractice()},
  'tools-css': {title:'CSS: 같은 카드에 색과 여백 더하기',description:'style.css의 padding 24px, 배경색과 둥근 모서리가 Git 카드에 적용되고 안쪽 여백이 생기는 모습을 보여 줍니다.',svg:cssCardPractice()},
  'tools-javascript': {title:'JavaScript: 버튼으로 설명 표시하기',description:'script.js의 클릭 이벤트와 hidden 상태 전환 코드 일부를 보여 주며, Git 카드 버튼을 누르기 전 접힌 설명과 누른 뒤 펼쳐진 설명을 비교합니다.',svg:javascriptCardPractice()},
  'web-map': {title:'프론트엔드란? 브라우저에서 보이고 움직이는 화면',description:'HTML·CSS·JavaScript 또는 React와 Vue 같은 선택지로 사용자가 보는 브라우저 화면을 구성합니다.',svg:localAndRemote()},
  'web-http': {title:'Live Server와 Vite, npm 명령 이해하기',description:'같은 강의 카드를 두 화면에 나란히 보여 줍니다. 실습에서는 VS Code Live Server를 사용하며 Vite는 명령만 읽어 보는 별도 선택지입니다.',svg:webResponsibilities()},
  'web-html': {title:'브라우저와 서버: 프론트엔드와 백엔드 비교',description:'프론트엔드의 React와 Vue, 백엔드의 Python FastAPI·Flask·Django와 Java Spring을 선택지로 구분하며 브라우저 요청과 서버 응답을 비교합니다.',svg:serverToBrowser()},
  'backend-html-json': {title:'HTML 안의 JSON으로 카드 데이터 표현하기',description:'HTML에 적은 JSON을 브라우저에서 JSON.parse로 읽고 강의 카드에 표시합니다.',svg:htmlJsonCard()},
  'web-json-card': {title:'Alpine.js의 x-data로 카드 데이터 표현하기',description:'HTML의 x-data에 강의 데이터 한 개를 선언해 카드에 표시한 뒤, 배열로 바꾸고 x-for로 반복해 윈도우 터미널과 Git 두 장의 카드로 표시합니다.',svg:frontendJsonCards()},
  'web-future-backend': {title:'다음 강의 미리보기: 백엔드와 데이터',description:'이번 강의는 Alpine.js x-data에서 카드 데이터를 표시합니다. 후속 강의에서는 FastAPI가 Python 딕셔너리를 JSON으로 응답하거나 SQLite를 조회해 JSON으로 응답하고, 브라우저의 Alpine.js가 카드로 표시합니다.',svg:futureBackendSteps()},
  'backend-python': {title:'FastAPI의 Python 데이터 가져오기',description:'같은 FastAPI 주소에서 정적 화면과 API를 제공하고 Python 딕셔너리 목록을 JSON으로 보내 브라우저가 fetch로 읽습니다.',svg:pythonDictionaryApi()},
  'backend-sqlite': {title:'SQLite 데이터베이스의 카드 가져오기',description:'FastAPI가 SQLite 데이터베이스의 행을 조회해 JSON으로 응답하고 브라우저가 카드에 표시합니다.',svg:sqliteApi()},
  'web-jinja': {title:'Jinja2 템플릿에 DB 데이터 넣기',description:'FastAPI가 DB 데이터와 Jinja2 템플릿을 서버에서 결합해 같은 서버 주소로 HTML을 제공하고 브라우저가 화면으로 표시합니다.',svg:templateEngines()},
  'frontend-css': {title:'같은 강의 카드에 Tailwind CSS 적용하기',description:'CSS 속성과 Tailwind 유틸리티 클래스가 같은 카드의 안쪽 여백과 둥근 모서리를 표현하는 방법을 비교합니다.',svg:cardLayers()},
  'frontend-alpine': {title:'같은 버튼 동작을 Alpine.js로 바꾸기',description:'클릭 이벤트가 open 상태를 바꾸고 x-show가 설명 표시를 연결하는 흐름을 x-data·@click·x-show의 삼각 상태 그래프로 나타냅니다.',svg:alpineStateGraph()},
  'codex-bonus': {title:'보충: 다음 작업에 재사용할 요청 카드',description:'재사용 요청 카드의 문제·맥락·보존 조건·검증 구획을 실제 프로젝트 정보로 바꾸어 다음 요청으로 옮깁니다.',svg:reusablePrompt()},
  'tools-bonus': {title:'보충 노트: 가상환경과 실행 버튼을 같은 기준으로 맞추기',description:'IDE 실행 설정과 PowerShell에서 스크립트 경로, Python 실행 파일, 작업 폴더를 같은 기준으로 대조합니다.',svg:environmentParity()},
  'web-bonus': {title:'보충 노트: 주소의 경로와 해시, 빌드 결과 구분',description:'주소의 경로는 서버 요청으로 전달되며 해시 뒤 fragment는 브라우저에서 읽습니다. 원본에서 빌드 결과로 이어지는 방향도 구분합니다.',svg:addressAndBuild()},
  'frontend-bonus': {title:'보충: 클래스가 개발 화면에만 보일 때',description:'Tailwind 3가 소스에서 찾는 완전한 클래스 문자열과 실제 템플릿을 포함한 content 경로를 대조합니다.',svg:completeClassNames()},
};
