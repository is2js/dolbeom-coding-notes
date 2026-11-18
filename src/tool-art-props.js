// Drawing primitives for the Terminal, Git, GitHub and setup lessons.
import { project as point } from './illustration-plane.js';

export { point };

export const ink = '#354254';
export const colors = {
  ivory: '#fff8e9',
  paper: '#f4e8cd',
  oat: '#deca9f',
  dark: '#2c403f',
  sage: '#c5d9bf',
  green: '#426d5c',
  honey: '#e7bd77',
  blush: '#f1d5c5',
  rose: '#9b513d',
};

const esc = value => String(value).replace(/[&<>"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
}[char]));

export function label(x, y, value, { size = 16, color = ink, weight = 600, anchor = 'middle', mono = false } = {}) {
  const font = mono ? 'Consolas,IBM Plex Mono,monospace' : 'Pretendard,Malgun Gothic,system-ui,sans-serif';
  return `<text x="${x}" y="${y}" fill="${color}" stroke="none" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" font-family="${font}">${esc(value)}</text>`;
}
export const shape = (d, fill, stroke = ink, width = 2.3, attributes = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${attributes}/>`;
export const line = (d, stroke = ink, width = 2.3, attributes = '') => shape(d, 'none', stroke, width, attributes);
export const box = (x, y, w, h, fill, radius = 8, stroke = ink, width = 2.3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
export const oval = (x, y, rx, ry, fill, stroke = ink, width = 2.3) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
export const at = (x, y, art, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${art}</g>`;
export const tick = (x, y, scale = 1) => at(x, y, line('M-8 0l5 5L8-6', colors.green, 2.5), scale);

// i and j follow the two directions of the workbench grid.
const xy = pair => pair.map(value => Math.round(value * 10) / 10).join(' ');
const isoPath = (points, z) => points.map(([i, j], index) => `${index ? 'L' : 'M'}${xy(point(i, j, z))}`).join('');

export function stage(id, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 550" class="topic-art-svg section-art-svg ${id}" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${id}-linen" x2="1" y2="1"><stop stop-color="#fffaf1"/><stop offset="1" stop-color="#efe0bd"/></linearGradient>
      <linearGradient id="${id}-glass" x2="0" y2="1"><stop stop-color="#3b514d"/><stop offset="1" stop-color="#29393d"/></linearGradient>
      <filter id="${id}-shadow" x="-.3" y="-.65" width="1.6" height="2.3"><feGaussianBlur stdDeviation="7"/></filter>
      <marker id="${id}-arrow" viewBox="0 0 9 9" refX="8" refY="4.5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M1 1l7 3.5L1 8" fill="none" stroke="context-stroke" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>
    </defs>
    <style>
      .${id} .${id}-flow{animation:${id}-flow 5.5s linear infinite}
      .${id} .${id}-cursor{animation:${id}-cursor 2.6s ease-in-out infinite}
      .${id} .${id}-shine{animation:${id}-shine 4.8s ease-in-out infinite}
      @keyframes ${id}-flow{0%,7%{stroke-dashoffset:3;opacity:0}15%,73%{opacity:.96}85%,100%{stroke-dashoffset:-97;opacity:0}}
      @keyframes ${id}-cursor{0%,100%{opacity:.95}48%,58%{opacity:.26}}
      @keyframes ${id}-shine{0%,100%{opacity:.24}45%,65%{opacity:.9}}
      @media(prefers-reduced-motion:reduce){.${id} .art-motion{animation:none!important}}
    </style>
    ${content}
  </svg>`;
}

export function deck(id, i, j, a, b, { fill = `url(#${id}-linen)`, depth = 12, z = 0, shadow = true } = {}) {
  const ground = [[i-a,j-b],[i+a,j-b],[i+a,j+b],[i-a,j+b]];
  const corners = ground.map(([u,v]) => point(u,v,z));
  const outline = isoPath(ground, z) + 'Z';
  const side = (from, to, color) => {
    const edge = [corners[from], corners[to]];
    const underneath = [...edge].reverse().map(([x,y]) => [x,y+depth]);
    return shape(`M${[...edge, ...underneath].map(xy).join('L')}Z`, color, ink, 1.9);
  };
  const rim = [[i-a+.15,j+b-.15],[i+a-.15,j+b-.15],[i+a-.15,j-b+.15]];
  return (shadow ? shape(isoPath(ground, z - 17) + 'Z', '#785d36', 'none', 0,
    `opacity=".16" filter="url(#${id}-shadow)"`) : '')
    + side(3, 2, '#d6bb89') + side(2, 1, '#c8ab79') + shape(outline, fill)
    + line(isoPath(rim, z), '#fffaec', 1.3);
}

export function route(id, points, { color = colors.green, casing = '#c3d6c2', pulse = '#fff8df', delay = 0, z = 0 } = {}) {
  const d = isoPath(points, z);
  return line(d, casing, 13)
    + line(d, color, 2.5, `marker-end="url(#${id}-arrow)"`)
    + line(d, pulse, 4.4, `class="art-motion ${id}-flow" pathLength="100" stroke-dasharray="6 94" stroke-dashoffset="3" opacity="0" style="animation-delay:${delay}s"`);
}

export function glow(id, x, y, w, h, delay = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="#e4b764" stroke-width="2.1" opacity=".35" class="art-motion ${id}-shine" style="animation-delay:${delay}s"/>`;
}

export const cursor = (id, x, y, width = 3, height = 15) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="1" fill="#efd18b" class="art-motion ${id}-cursor"/>`;

export function tag(x, y, w, value, { color = colors.ivory, size = 15, mono = false, textColor = ink } = {}) {
  return box(x - w / 2, y - 16, w, 28, color, 8, '#a49273', 1.3)
    + label(x, y + 3, value, { size, mono, color: textColor, weight: 660 });
}

// Display faces stay readable. Their cases and feet follow the floor axes.
export function monitor(id, i, j, w, h, title, contents, { dark = false, rise = 28 } = {}) {
  const [cx, cy] = point(i, j);
  const x = cx - w/2;
  const y = cy - h - rise;
  const foot = deck(id, i, j, .65, .61, { depth: 4, z: 5, fill: '#f2e4c7', shadow: false });
  const top = shape(`M${x} ${y+7}l10-5.7h${w-16}q8 0 8 9l-10 5.7Z`, '#e9d8b4', ink, 1.8);
  const side = shape(`M${x+w-5} ${y+8}l10-5.7v${h-1}l-10 5.7Z`, dark ? '#728980' : '#c6ab7e');
  return foot + box(cx - 12, cy - rise + 2, 24, rise - 6, '#c9b58f', 4, ink, 1.9)
    + top + side + box(x, y + 6, w, h, dark ? `url(#${id}-glass)` : colors.ivory, 9)
    + box(x + 4, y + 10, w - 8, 27, dark ? '#52665e' : '#eee1c5', 6, 'none')
    + oval(x + 13, y + 23, 2.8, 2.8, colors.honey, 'none')
    + oval(x + 22, y + 23, 2.8, 2.8, '#a7c0a5', 'none')
    + label(x + 31, y + 28, title, { size: 13, color: dark ? colors.ivory : ink, anchor: 'start', weight: 680 })
    + at(x, y + 6, contents);
}

export function page(x, y, w, h, { fill = colors.ivory, mark = colors.green, angle = 0 } = {}) {
  const f = Math.min(16, w / 4);
  const paper = `M0 0h${w-f}l${f} ${f}v${h-f}H0Z`;
  return `<g transform="translate(${x} ${y}) rotate(${angle} ${w/2} ${h/2})">${at(4, 5, shape(paper, '#d8c4a1', ink, 1.5))}
    ${shape(paper, fill)}${shape(`M${w-f} 0v${f}h${f}`, colors.paper, ink, 1.6)}
    ${line(`M12 ${h*.31}h${w*.52}`, mark, 2.9)}
    ${line(`M12 ${h*.46}h${w*.58}M12 ${h*.58}h${w*.47}M12 ${h*.70}h${w*.56}`, '#9aa993', 2.2)}</g>`;
}

export function folder(x, y, w, h, fill = colors.honey, inserts = '') {
  const tab = Math.round(w * .34);
  const rim = Math.round(h * .36);
  return at(x, y, shape(`M0 12Q0 5 8 5h${tab}l13 13h${w-tab-22}q8 0 8 9v${h-29}H0Z`, '#cba369')
    + inserts
    + shape(`M-7 ${rim+8}q1-8 9-8h${w+2}q8 0 7 8l-11 ${h-rim-15}q-2 7-9 7H6q-8 0-9-8Z`, fill)
    + line(`M4 ${rim + 7}h${w-1}`, '#fff1d4', 1.8));
}

export function commit(x, y, radius, surface = colors.sage, embossed = false) {
  const r = radius;
  const ry = r * .57;
  return at(x, y, `<ellipse cx="2" cy="3" rx="${r + 5}" ry="${ry + 3}" fill="#8f733e" opacity=".16"/>`
    + shape(`M${-r} -10v11a${r} ${ry} 0 0 0 ${r*2} 0v-11Z`, '#9d9a71')
    + oval(0, -10, r, ry, surface)
    + oval(0, -10, r * .66, ry * .66, 'none', '#77917b', 1.2)
    + (embossed ? line('M-10 -10l7 4 13-8', colors.green, 2) : oval(0, -10, 4.3, 2.5, '#567465', 'none')));
}

export function archive(id, i, j, title = 'note.txt') {
  const [x, y] = point(i, j, 8);
  const w = 136;
  const h = 88;
  const depthX = 35;
  const depthY = 20;
  return at(x - w/2, y - h, shape(`M0 0l${depthX}-${depthY}h${w}l-${depthX} ${depthY}Z`, '#deead4')
    + shape(`M${w} 0l${depthX}-${depthY}v${h}l-${depthX} ${depthY}Z`, '#9cb29d')
    + box(0, 0, w, h, colors.sage, 7)
    + box(12, 12, 110, 27, '#f2f4e5', 5, '#8ca28a', 1.4)
    + label(w/2, 30, title, { size: 14, mono: true })
    + line('M15 53h107M15 69h107', '#8ca28a', 1.55)
    + line('M28 47h45M28 63h38M28 79h53', '#668271', 2.3)
    + oval(113, 57, 3.1, 3.1, colors.honey, ink, 1.2)
    + glow(id, 10, 10, 116, 31, 1.55));
}

export function key(x, y, w, value, active = false) {
  return shape(`M${x} ${y+2}l7-4h${w-12}l5 4`, '#e4d1ac', ink, 1.3)
    + box(x + 4, y + 2, w, 29, '#c8af84', 5, ink, 1.5)
    + box(x, y + 3, w, 27, active ? colors.sage : colors.ivory, 5, ink, 1.7)
    + label(x + w/2, y + 21, value, { size: 13, mono: true, weight: 690 });
}
