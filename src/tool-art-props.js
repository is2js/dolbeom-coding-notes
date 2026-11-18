// Shared drawing pieces for the Terminal, Git, GitHub and setup lessons.
export const ink = '#37403b';
export const colors = {
  ivory: '#fff8e9',
  paper: '#f7ecd5',
  oat: '#dfca9f',
  dark: '#2c3c39',
  sage: '#c2d3bb',
  green: '#46796b',
  honey: '#e3b96d',
  blush: '#eccbba',
  rose: '#9e5945',
};
const esc = value => String(value).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function label(x, y, value, { size = 17, color = ink, weight = 580, anchor = 'middle', mono = false } = {}) {
  return `<text x="${x}" y="${y}" fill="${color}" stroke="none" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" font-family="${mono ? 'Consolas,monospace' : 'Pretendard,Malgun Gothic,system-ui,sans-serif'}">${esc(value)}</text>`;
}
export const shape = (d, fill, stroke = ink, width = 2.4, attributes = '') => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${attributes}/>`;
export const line = (d, stroke = ink, width = 2.4, attributes = '') => shape(d, 'none', stroke, width, attributes);
export const box = (x, y, w, h, fill, radius = 8, stroke = ink, width = 2.4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
export const oval = (x, y, rx, ry, fill, stroke = ink, width = 2.4) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
export const at = (x, y, art, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${art}</g>`;
export const tick = (x, y, scale = 1) => at(x, y, line('M-8 0l5 5L8-6', colors.green, 2.5), scale);

export function stage(id, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 550" class="topic-art-svg section-art-svg ${id}" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${id}-linen" x2="0" y2="1"><stop stop-color="#fff9ed"/><stop offset="1" stop-color="#eedfc0"/></linearGradient>
      <linearGradient id="${id}-glass" x2="0" y2="1"><stop stop-color="#465b53"/><stop offset="1" stop-color="#273a36"/></linearGradient>
      <filter id="${id}-shadow" x="-.35" y="-1.6" width="1.7" height="4.2"><feGaussianBlur stdDeviation="8"/></filter>
      <marker id="${id}-arrow" viewBox="0 0 9 9" refX="8" refY="4.5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M1 1l7 3.5L1 8" fill="none" stroke="context-stroke" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>
    </defs>
    <style>
      .${id} .${id}-flow{animation:${id}-flow 5.7s ease-in-out infinite}
      .${id} .${id}-cursor{animation:${id}-cursor 2.6s ease-in-out infinite}
      .${id} .${id}-shine{animation:${id}-shine 4.8s ease-in-out infinite}
      @keyframes ${id}-flow{0%,10%{stroke-dashoffset:100;opacity:0}19%{opacity:.9}72%{stroke-dashoffset:0;opacity:.9}89%,100%{stroke-dashoffset:0;opacity:0}}
      @keyframes ${id}-cursor{0%,100%{opacity:.9}48%,58%{opacity:.25}}
      @keyframes ${id}-shine{0%,100%{opacity:.32}45%,65%{opacity:1}}
      @media(prefers-reduced-motion:reduce){.${id} .art-motion{animation:none!important}}
    </style>
    ${content}
  </svg>`;
}

export function shadow(id, x, y, width, height = 15) {
  return `<ellipse cx="${x}" cy="${y}" rx="${width}" ry="${height}" fill="#735933" opacity=".18" filter="url(#${id}-shadow)"/>`;
}

export function platform(id, x, y, w, d, surface = `url(#${id}-linen)`) {
  const side = 13;
  const upper = `M${-w + 12} -6L-13 ${-d + 5}q13-7 26 0L${w - 12} -6q13 6 0 12L13 ${d - 5}q-13 7-26 0L${-w + 12} 6q-13-6 0-12Z`;
  const lower = `M${-w + 1} 0v${side}q0 6 11 11L-13 ${d + 14}q13 6 26 0L${w - 12} ${side + 11}q11-5 11-11V0Z`;
  return shadow(id, x + 5, y + d * .57 + 16, w * .77, d * .28)
    + at(x, y, shape(lower, colors.oat) + shape(upper, surface)
      + line(`M${-w + 18} 9L-12 ${d - 2}q12 6 24 0L${w - 18} 9`, '#fff6df', 1.3));
}

export function flow(id, d, { color = colors.green, pulse = colors.honey, delay = 0 } = {}) {
  return line(d, color, 2.5, `marker-end="url(#${id}-arrow)"`)
    + line(d, pulse, 4, `class="art-motion ${id}-flow" pathLength="100" stroke-dasharray="12 88" stroke-dashoffset="100" opacity="0" style="animation-delay:${delay}s"`);
}

export function glow(id, x, y, w, h, delay = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="#d6a653" stroke-width="2.3" opacity=".55" class="art-motion ${id}-shine" style="animation-delay:${delay}s"/>`;
}

export const cursor = (id, x, y, width = 3, height = 15) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="1" fill="#efd18b" class="art-motion ${id}-cursor"/>`;

export function tag(x, y, w, value, { color = colors.ivory, size = 15, mono = false, textColor = ink } = {}) {
  return box(x - w / 2, y - 16, w, 29, color, 7, '#8e876e', 1.4)
    + label(x, y + 4, value, { size, mono, color: textColor, weight: 660 });
}

// Windows and loose props sit on small, hand-drawn three-dimensional supports.
export function monitor(id, x, y, w, h, title, contents, { dark = false, stand = false } = {}) {
  const feet = stand ? at(x + w / 2, y + h, shape('M-13-5h26v18l35 13-48 18-48-18 35-13Z', colors.oat)
    + shape('M-48 26l48 14 48-14-35-13h-26Z', colors.paper, ink, 2)
    + box(-13, -1, 26, 25, colors.paper, 4, ink, 2)) : '';
  return feet + box(x + 7, y + 8, w, h, '#c9b58d', 11)
    + box(x, y, w, h, dark ? `url(#${id}-glass)` : colors.ivory, 10)
    + box(x + 3, y + 3, w - 6, 29, dark ? '#52645a' : '#e9ddc4', 7, 'none')
    + oval(x + 14, y + 17, 3, 3, colors.honey, 'none')
    + oval(x + 24, y + 17, 3, 3, '#b7caad', 'none')
    + label(x + 35, y + 22, title, { size: 13, color: dark ? colors.ivory : ink, anchor: 'start', weight: 670 })
    + contents;
}

export function page(x, y, w, h, { surface = colors.ivory, mark = colors.green, angle = 0 } = {}) {
  const f = Math.min(19, w / 4);
  const paper = `M0 0h${w-f}l${f} ${f}v${h-f}H0Z`;
  return `<g transform="translate(${x} ${y}) rotate(${angle} ${w/2} ${h/2})">${at(4, 5, shape(paper, colors.oat))}
    ${shape(paper, surface)}${shape(`M${w-f} 0v${f}h${f}`, colors.paper, ink, 1.8)}
    ${line(`M13 ${h*.42}h${w*.51}`, mark, 3)}
    ${line(`M13 ${h*.59}h${w*.59}M13 ${h*.73}h${w*.39}`, '#96a68d', 2.4)}</g>`;
}

export function pocket(x, y, w, h, surface = colors.honey, inserts = '') {
  const tab = Math.round(w * .37);
  const rim = Math.round(h * .35);
  return at(x, y, shape(`M0 12Q0 5 8 5h${tab}l14 14h${w-tab-23}q8 0 8 9v${h-29}H0Z`, '#d1af72')
    + inserts
    + shape(`M-7 ${rim+8}q1-8 9-8h${w+2}q8 0 7 8l-11 ${h-rim-15}q-2 7-9 7H6q-8 0-9-8Z`, surface)
    + line(`M4 ${rim + 8}h${w-1}`, '#fff1d4', 2));
}

export function spool(x, y, radius, surface = colors.sage) {
  const r = radius;
  const ry = r * .39;
  return at(x, y, shape(`M${-r} 0v16a${r} ${ry} 0 0 0 ${r*2} 0V0Z`, '#a7a88a')
    + oval(0, 0, r, ry, surface)
    + oval(0, 0, r * .38, ry * .47, colors.ivory, ink, 1.5)
    + line(`M${-r + 6} 14q${r*.5} 10 ${r-12} 10`, '#eee5c6', 1.3));
}

export function archive(id, x, y, surface = colors.sage) {
  return platform(id, x + 72, y + 126, 100, 41)
    + at(x, y, shape('M5 30L42 7h101l-36 24Z', '#ecdfbe')
      + shape('M108 31L144 7v92l-36 24Z', '#9eb29c')
      + box(5, 29, 105, 94, surface, 7)
      + box(19, 42, 77, 25, colors.ivory, 5, '#8e9b80', 1.5)
      + label(57, 59, 'note.txt', { size: 13, mono: true })
      + line('M28 88h54m-54 18h40', colors.green, 2.5)
      + oval(88, 105, 4, 4, colors.honey, ink, 1.4));
}

export function key(x, y, w, value, active = false) {
  return box(x + 3, y + 5, w, 31, colors.oat, 5)
    + box(x, y, w, 31, active ? colors.sage : colors.ivory, 5)
    + label(x + w/2, y + 21, value, { size: 14, mono: true, weight: 690 });
}

