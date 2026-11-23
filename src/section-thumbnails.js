import { blue, clay, cream, disk, folder, gold, keybed, link, miniature, platform, rack, sage, screen, sheet, tile } from './illustration-miniatures.js';
import { topicThumbnail } from './topic-thumbnails.js';

const gitGraph = (paths, nodes) => paths
  .map(([d, stroke]) => `<path d="${d}" stroke="${stroke}" stroke-width="3"/>`).join('')
  + nodes.map(([x, y, fill]) => `<circle cx="${x}" cy="${y}" r="6" fill="${fill}" stroke-width="1.6"/>`).join('');

// Stable IDs keep each miniature attached when a lecturer edits a title.
const scenes = {
  'terminal-example': screen(22, 26, 59, 42, 'terminal') + link(80, 52, 23) + folder(105, 54, 31),
  'terminal-gui-cli': folder(25, 43) + link(67, 48, 20) + screen(91, 34, 45, 42, 'terminal'),
  'terminal-host-shell': screen(23, 21, 61, 44, 'terminal') + tile(91, 39, 'PS', blue) + tile(107, 61, 'C:', gold),
  'terminal-shortcuts': keybed(67, 32) + tile(81, 38, 'Ctrl', blue, 27) + tile(109, 59, '⇥', gold),
  'terminal-bonus': tile(25, 39, 'PS', blue) + link(53, 47, 19) + screen(78, 28, 58, 45, 'terminal'),
  'git-example': folder(22, 43, 45) + sheet(57, 31, 'TXT') + tile(104, 53, '.git', sage, 28),
  'git-why': sheet(21, 28, 'TXT') + link(57, 49, 26) + tile(92, 40, 'v1', sage) + tile(111, 62, 'v2', gold),
  'git-diff': screen(20, 27, 71, 43, 'diff') + tile(101, 39, '−', clay) + tile(116, 60, '+', sage),
  'git-prompt': gitGraph([['M42 54L109 70', '#45706a']], [[42,54,gold], [109,70,sage]])
    + tile(26, 22, 'HEAD', gold, 32) + tile(102, 34, 'main', sage, 32),
  'git-branch': gitGraph([['M33 43L129 56', '#45706a'], ['M33 43L71 77L92 80L129 56', '#af7740']],
    [[33,43,cream], [80,78,gold], [129,56,sage]]),
  'github-case': screen(23, 25, 44, 43, 'editor', blue)
    + `<circle cx="21" cy="29" r="12" fill="#34434c"/>
       <path transform="translate(13 21) scale(.69)" d="M8 21c-5 1-5-3-7-3m14 5v-4c0-1-.1-2-1-3 4 0 7-2 7-6 0-2-.5-3-2-4 .5-1 .5-3 0-4-2 0-3 1-4 2-2-.5-4-.5-6 0-1-1-2-2-4-2-.5 1-.5 3 0 4-1.5 1-2 2-2 4 0 4 3 6 7 6-1 1-1 2-1 3v4" stroke="#fff6df" stroke-width="1.7"/>`
    + link(67, 49, 25) + screen(96, 30, 41, 39) + folder(103, 57, 27),
  'github-clone': rack(27, 25) + link(61, 48, 35) + folder(102, 55, 31),
  'github-roles': folder(18, 40, 36) + link(59, 49, 32) + rack(105, 25) + tile(75, 75, '↔', gold),
  'git-bonus': sheet(25, 30, 'TXT') + screen(79, 30, 54, 47, 'terminal'),
  'markdown-map': sheet(23, 29, 'MD', sage) + link(61, 48, 22) + screen(89, 37, 49, 39),
  'markdown-typora-images': sheet(19, 32, 'PNG', blue) + folder(67, 52, 26) + rack(117, 31),
  'tools-markdown': sheet(22, 33, '#') + sheet(63, 39, 'MD', sage) + tile(106, 53, '✓', gold),
  'markdown-readme-push': sheet(21, 30, 'MD', sage) + link(60, 49, 32) + rack(108, 25),
  'markdown-readme-fetch': rack(22, 27) + link(53, 48, 28) + sheet(86, 40, 'MD', sage) + folder(118, 56, 27),
  'markdown-code': sheet(24, 28, 'MD', cream) + tile(73, 41, 'N', clay) + tile(107, 58, '◇', sage),
  'codex-bonus': sheet(26, 33, '#') + sheet(66, 27, '✓', sage) + tile(105, 59, '↶', gold),
  'tools-map': screen(25, 26, 73, 43, 'diff') + keybed(103, 72, 6),
  'tools-vscode-setup': sheet(24, 29, 'MD', sage) + folder(19, 55, 37) + link(60, 58, 22) + screen(84, 25, 55, 41, 'editor'),
  'tools-vscode': screen(22, 19, 72, 46, 'editor') + tile(104, 54, '⌕', blue),
  'tools-shortcuts-practice': keybed(52, 52, 6) + screen(81, 27, 54, 41, 'editor'),
  'tools-pycharm': screen(20, 28, 64, 45, 'editor') + tile(87, 48, 'Py', blue) + tile(116, 62, '↵', gold),
  'codex-context': sheet(23, 28, 'MD', sage) + link(61, 48, 23) + screen(88, 30, 52, 43, 'diff'),
  'tools-html': sheet(22, 29, 'HTML', clay) + link(60, 48, 24) + screen(88, 35, 50, 43, 'card', gold),
  'tools-css': sheet(20, 29, 'CSS', blue) + screen(64, 23, 65, 44, 'card', blue) + tile(112, 64, '24', cream),
  'tools-javascript': tile(24, 45, 'JS', gold) + link(54, 53, 20) + screen(82, 26, 55, 46) + tile(112, 62, '↳', gold),
  'tools-bonus': screen(24, 30, 63, 45, 'terminal') + folder(101, 55, 34),
  'web-map': tile(18, 32, 'R', blue) + tile(31, 61, 'V', sage) + link(56, 44, 22) + screen(85, 31, 50, 44),
  'web-http': screen(14, 30, 51, 43, 'card', sage) + screen(88, 31, 51, 43, 'card', blue) + tile(68, 61, '≠', gold),
  'web-html': screen(13, 31, 44, 44) + rack(117, 25) + link(64, 45, 41) + link(105, 62, -41, '#ad723b'),
  'backend-html-json': sheet(22, 27, '{}', clay) + link(60, 49, 27) + screen(92, 38, 46, 39),
  'web-json-card': sheet(16, 32, '{}', clay) + link(51, 55, 29)
    + `<path d="M88 31l48 10v42l-48 -10Z" fill="${cream}" stroke-width="1.8"/>
       <path d="M93 41l37 8v10l-37 -8Z" fill="${gold}"/>
       <path d="M93 57l37 8v10l-37 -8Z" fill="${sage}"/>`,
  'web-future-backend': sheet(15, 31, '{}', clay) + link(48, 48, 16) + tile(70, 43, '{}', sage) + link(92, 48, 16) + disk(120, 39),
  'backend-python': rack(23, 26, blue) + tile(62, 40, '{}', sage) + screen(97, 36, 43, 41),
  'backend-sqlite': disk(28, 39) + rack(64, 24) + screen(100, 41, 41, 39),
  'web-bonus': screen(24, 23, 69, 42, 'editor') + tile(100, 40, '/', blue) + tile(113, 62, '#', gold),
  'web-jinja': sheet(20, 30, '{{}}', gold) + disk(76, 43) + screen(100, 35, 43, 40),
  'frontend-css': sheet(22, 25, 'CSS', blue) + link(60, 50, 21) + screen(87, 31, 49, 44, 'card', blue),
  'frontend-alpine': tile(26, 43, '×', gold) + screen(61, 19, 71, 46) + tile(105, 62, '✓', sage),
  'frontend-bonus': sheet(22, 28, 'CSS') + platform(72, 52, 26, 16, blue) + screen(102, 38, 41, 41, 'editor'),
};

export function sectionThumbnail(id, topicId = 'terminal') {
  const key = String(id || '').replace(/^section-/, '');
  if (!Object.hasOwn(scenes, key)) return topicThumbnail(topicId);
  return miniature('section', key, scenes[key]);
}
