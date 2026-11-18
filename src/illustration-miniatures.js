import { plane } from './illustration-plane.js';

const slope = plane.stepY / plane.stepX;
const rise = length => Number((length * slope).toFixed(2));
const ink = '#37474c';
export const cream = '#fff6df', sage = '#a9caba', teal = '#387e79', gold = '#e7bb6d', clay = '#d99a81', blue = '#b8cfdb';

const path = (d, fill = 'none', stroke = ink, width = 1.45) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
const rect = (x, y, w, h, fill, r = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const dot = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
export const badge = (x, y, text, color = ink, size = 11) =>
  `<text x="${x}" y="${y}" fill="${color}" stroke="none" font-family="Consolas,monospace" font-size="${size}" font-weight="700">${text}</text>`;
export const strokes = (x, y, w, color = teal) =>
  path(`M${x} ${y}h${w}m-${w} 5h${Math.round(w * .74)}`, 'none', color, 1.8);

// All thickness and travel directions use the same slope as the large stage.
export function platform(x, y, w, d, color = cream, thickness = 4) {
  const right = `${x + w} ${y + rise(w)}`;
  const left = `${x - d} ${y + rise(d)}`;
  const front = `${x + w - d} ${y + rise(w) + rise(d)}`;
  return path(`M${left} ${front} ${right}v${thickness}l-${d} ${rise(d)} -${w} -${rise(w)}Z`, '#b6a588')
    + path(`M${x} ${y} ${right} ${front} ${left}Z`, color);
}

function face(x, y, w, h, color, body, depth = 6) {
  return `<g transform="translate(${x} ${y})">`
    + path(`M0 0l${depth} -${rise(depth)} ${w} ${rise(w)} -${depth} ${rise(depth)}Z`, '#e6dbc4')
    + path(`M${w} ${rise(w)}l${depth} -${rise(depth)}v${h}l-${depth} ${rise(depth)}Z`, '#879b99')
    + `<g transform="matrix(1 ${slope} 0 1 0 0)">${rect(0, 0, w, h, color, 1)}${body}</g></g>`;
}

export function screen(x, y, w = 50, h = 43, kind = 'card', tone = sage) {
  const card = rect(7, 14, w - 14, h - 20, tone, 3)
    + strokes(11, 20, Math.round(w * .42))
    + rect(11, 30, Math.round(w * .39), 6, cream);
  const code = kind === 'terminal'
    ? path('m9 19 5 4-5 4m9 0h10', 'none', '#f1d79b', 2) + strokes(9, 32, w - 19, '#8fc3b1')
    : kind === 'diff'
      ? rect(7, 15, w - 14, 7, '#ead2c0') + rect(7, 26, w - 14, 7, sage)
      : kind === 'editor'
        ? path(`M${Math.round(w * .27)} 9v${h - 10}`, 'none', '#839c92') + strokes(Math.round(w * .32), 16, Math.round(w * .52))
        : card;
  return face(x, y, w, h, kind === 'terminal' ? '#29464e' : cream,
    path(`M0 9h${w}`, 'none', '#839c92', 1) + dot(5, 5, 1.4, gold) + dot(10, 5, 1.4, sage) + code);
}

export function sheet(x, y, tag = '#', tone = cream) {
  return face(x, y, 31, 34, tone, badge(5, 13, tag, ink, tag.length > 3 ? 7.5 : 11)
    + strokes(5, 19, 19) + path('M5 29h17', 'none', '#839c92'), 4);
}

export function folder(x, y, width = 37) {
  return `<g transform="translate(${x} ${y}) matrix(1 ${slope} 0 1 0 0)">`
    + path(`M0 6V0h14l4 6h${width - 18}v24H0Z`, gold)
    + path(`M0 12h${width + 4}l-4 18H0Z`, '#f3d697')
    + path('M7 19h12', 'none', '#967437') + '</g>';
}

export function rack(x, y, tone = sage) {
  return face(x, y, 24, 46, tone, [5, 18, 31].map(row =>
    rect(4, row, 16, 9, '#f8efd7') + dot(8, row + 4.5, 1.4, teal) + path(`M12 ${row + 4.5}h4`, 'none', '#869d8d', 1)).join(''), 10);
}

export function disk(x, y) {
  return `<g transform="translate(${x} ${y})">`
    + path('M-14 5v24c0 8 28 8 28 0V5Z', sage)
    + path('M-14 14c0 8 28 8 28 0m-28 7c0 8 28 8 28 0', 'none', teal)
    + `<ellipse cx="0" cy="5" rx="14" ry="6.5" fill="#dbe7c8"/></g>`;
}

export function tile(x, y, text, color = sage, width = 23) {
  return face(x, y, width, 19, color, badge(4, 13, text, ink, text.length > 2 ? 8 : 11), 4);
}

export function keybed(x, y, active = 5) {
  let keys = '';
  for (let index = 0; index < 12; index += 1) {
    const column = index % 4;
    const row = Math.floor(index / 4);
    keys += rect(4 + column * 9, 4 + row * 8, 6.5, 5.5, index === active ? gold : cream, 1.2);
  }
  return `<g transform="translate(${x} ${y}) matrix(1 ${slope} -1 ${slope} 0 0)">${rect(0, 0, 42, 29, sage, 3)}${keys}</g>`;
}

export function branch(x, y, color = teal) {
  return `<g transform="translate(${x} ${y})">`
    + path(`M0 0l34 ${rise(34)} 33 -${rise(33)} 36 ${rise(36)}M34 ${rise(34)}l-21 ${rise(21)} 36 ${rise(36)} 21 -${rise(21)} 33 -${rise(33)}`, 'none', color, 2.7)
    + dot(0, 0, 5, cream) + dot(34, rise(34), 5.4, sage)
    + dot(67, rise(34) - rise(33), 5, sage) + dot(49, rise(34) + rise(21) + rise(36), 5, gold)
    + dot(103, rise(34) - rise(33) + rise(36), 6, teal) + '</g>';
}

export function link(x, y, distance = 29, color = teal) {
  const direction = Math.sign(distance);
  const dy = rise(Math.abs(distance));
  const endX = x + distance;
  return path(`M${x} ${y}l${distance} ${dy}m${-direction * 8} -1.5 ${direction * 8} 1.5 ${-direction * 3} -7`, 'none', color, 2.3)
    + dot(endX - distance / 2, y + dy / 2, 2.8, cream);
}

export function miniature(kind, id, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112" fill="none" aria-hidden="true" focusable="false" data-${kind}-thumbnail="${id}">
    <g stroke="${ink}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="80" cy="88" rx="58" ry="13" fill="#7f6951" fill-opacity=".10" stroke="none"/>
      ${platform(80, 24, 65, 65, '#f1e5ca')}
      ${[13, 26, 39, 52].map(step =>
        path(`M${80 + step} ${24 + rise(step)}l-65 ${rise(65)}M${80 - step} ${24 + rise(step)}l65 ${rise(65)}`, 'none', '#bca885', .65)).join('')}
      ${body}
    </g>
  </svg>`;
}
