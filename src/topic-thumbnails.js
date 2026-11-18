import { blue, branch, clay, disk, folder, gold, keybed, link, miniature, rack, sage, screen, sheet, teal, tile } from './illustration-miniatures.js';

const scenes = {
  terminal: screen(24, 20, 66, 47, 'terminal') + folder(102, 53),
  git: branch(28, 44) + tile(96, 25, 'git', gold, 27),
  github: folder(23, 46) + rack(113, 26) + link(68, 53, 32) + link(101, 62, -31, '#ad723b'),
  markdown: sheet(27, 30, '#') + link(63, 51, 26) + sheet(97, 43, 'MD', sage),
  ide: screen(27, 12, 91, 43, 'editor') + keybed(91, 65),
  'web-coding': sheet(23, 29, 'HTML', clay) + tile(52, 58, 'CSS', blue, 27) + screen(89, 30, 47, 43),
  'web-tools': tile(24, 32, 'CSS', blue, 27) + tile(36, 61, 'JS', gold) + link(66, 48, 22) + screen(91, 30, 44, 43),
  web: screen(13, 31, 47, 43) + rack(119, 26) + link(69, 50, 36, teal) + link(104, 60, -34, '#ad723b'),
  templates: disk(29, 29) + sheet(60, 43, '{{}}', gold) + screen(101, 37, 42, 41),
  'web-architecture': screen(13, 29, 47, 43) + rack(92, 24) + disk(136, 52) + link(65, 44, 23),
  'server-rendering': sheet(18, 26, '{{}}', gold) + rack(70, 30) + screen(105, 43, 39, 38),
  fallback: sheet(64, 35, '&lt;/&gt;', sage),
};

export function topicThumbnail(id) {
  const key = Object.hasOwn(scenes, id) ? id : 'fallback';
  return miniature('topic', key, scenes[key]);
}
