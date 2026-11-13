import { topicThumbnail } from './topic-thumbnails.js';

// Small silhouettes are authored separately from the text-rich teaching diagrams.
// Stable section IDs keep the miniature attached when a lecturer edits a title.
const ink = '#26344e', teal = '#2e8390', cream = '#fff5df', sage = '#bad0b5', gold = '#e7b65e';
const box = (x,y,w,h,fill=cream,r=5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const path = (d,color=ink,width=2.6) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const dot = (x,y,r=6,fill=teal) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const label = (x,y,value,size=18) => `<text x="${x}" y="${y}" font-family="Consolas,monospace" font-size="${size}" font-weight="700" fill="${ink}" stroke="none">${value}</text>`;
const window = (x,y,w,h,body='',fill=cream) => box(x+5,y+5,w,h,'#d2bd96')+box(x,y,w,h,fill)+path(`M${x} ${y+13}h${w}`)+dot(x+8,y+7,1.4,gold)+dot(x+14,y+7,1.4,sage)+body;
const folder = (x,y,w=49,h=35) => `<path d="M${x} ${y+8}v-8h${w*.4}l7 8h${w*.6-7}v${h-8}h-${w}Z" fill="${gold}"/>`+path(`M${x} ${y+13}h${w}`);
const page = (x,y,body='',fill=cream) => `<path d="M${x} ${y}h31l12 12v46h-43Z" fill="${fill}"/>`+path(`M${x+31} ${y}v12h12`)+body;
const arrow = (x,y,w=24) => path(`M${x} ${y}h${w}m-6-5 6 5-6 5`,teal,3);
const check = (x,y) => path(`M${x} ${y}l6 6 13-16`,teal,4);
const rows = (x,y) => path(`M${x} ${y}h25m-25 9h20m-20 9h25`,'#718371',3);
const server = (x,y) => box(x+5,y-5,38,62,'#8ba99d')+box(x,y,38,62,sage)+[0,1,2].map(i=>box(x+6,y+7+i*17,26,10,cream,2)+dot(x+11,y+12+i*17,1.5,teal)).join('');
const keys = (first,second) => box(24,31,51,35,cream)+label(35,55,first,17)+box(84,42,51,35,sage)+label(95,66,second,17);
const scenes = {
  'terminal-example': window(13,20,77,57,path('M25 45l8 7-8 7m19 0h13',teal,3),'#e0ebd8')+folder(101,46)+arrow(85,39,20)+path('M103 88H85m6-5-6 5 6 5',teal,3),
  'terminal-gui-cli': window(13,24,57,55,rows(23,49))+arrow(75,53,18)+page(103,22,rows(111,46)),
  'terminal-host-shell': window(19,18,118,72,box(28,39,42,39,'#d9e6d0')+box(78,39,49,39,'#ead5ad')+label(34,66,'&gt;_',17)+label(87,66,'C:',17)),
  'terminal-shortcuts': keys('Alt','↔')+path('M19 86h125',teal),
  'terminal-bonus': window(10,23,63,59,label(21,61,'&gt;_',20))+path('M80 35v42',teal,4)+window(89,23,58,59,rows(99,48)),
  'git-example': folder(19,29,118,62)+box(31,43,45,32,cream,3)+path('M39 53h28m-28 8h22',teal,3)+box(91,45,32,29,sage)+label(94,65,'.git',12),
  'git-why': page(9,27,path('M18 53h23',teal,3))+arrow(56,55,17)+box(81,34,28,38,sage)+check(88,55)+arrow(114,55,13)+dot(140,55,10,gold),
  'git-diff': page(15,15,path('M24 42h23',gold,4))+page(98,15,path('M107 42h23',teal,4),'#e0ebd8')+arrow(65,48,23)+path('M36 89h90',teal,3)+dot(36,89,6,gold)+dot(126,89,6,sage),
  'git-prompt': path('M35 62h90',teal,3)+dot(35,62,10,gold)+dot(125,62,10,sage)+box(18,20,34,20,gold)+box(108,20,34,20,sage)+path('M35 42v9m90-9v9',teal,3)+path('M53 86h54m-7-5 7 5-7 5',teal,3),
  'git-branch': path('M24 38h110',teal,3)+path('M24 38Q46 78 80 78T134 38',teal,3)+dot(24,38,8,gold)+dot(80,78,8,sage)+dot(134,38,8,teal)+box(107,10,42,17,sage,4)+label(112,22,'main',10)+path('M129 27v3',ink,2)+box(44,89,73,15,cream,4)+label(49,100,'branch',10),
  'github-clone': folder(12,30,49,37)+box(22,42,28,14,cream)+box(18,75,37,12,sage,3)+arrow(68,46,22)+path('M90 65H68m6-5-6 5 6 5',teal,3)+server(105,24),
  'github-roles': server(16,24)+arrow(66,54,22)+folder(99,30,49,37)+box(109,42,28,14,cream)+box(105,75,37,12,sage,3),
  'git-bonus': page(24,15,rows(33,40))+window(83,29,59,49,path('M96 54h32m-32 9h24',teal,3),'#e0ebd8')+dot(127,38,5,gold),
  'markdown-map': page(12,19,label(19,46,'#',17)+path('M19 54h26m-26 9h19',teal,3))+arrow(62,49,20)+window(91,22,55,59,box(99,42,36,13,sage,3)+path('M99 64h31',teal,3)),
  'markdown-typora-images': window(7,24,44,48,box(15,43,27,21,sage,3)+dot(37,48,2,gold))+arrow(55,52,13)+folder(73,26,37,32)+box(79,38,26,14,cream,3)+arrow(112,52,8)+window(124,27,29,43,path('M132 53h13m-13 7h10',teal,2)),
  'tools-markdown': page(17,16,label(25,47,'#',20)+path('M25 55h24m-24 8h18',teal,2))+arrow(68,54,16)+box(91,23,53,19,sage,3)+box(91,47,53,19,cream,3)+box(91,71,53,19,sage,3)+path('M100 32h34m-34 24h34m-34 24h34',teal,2),
  'markdown-readme-push': folder(10,34,55,48)+page(17,18,label(25,48,'#',21)+path('M25 57h24m-24 8h18',teal,2))+arrow(68,54,22)+server(106,24)+check(127,82),
  'markdown-code': page(18,19,label(25,52,'MD',17))+path('M71 51h18m0-20v40m0-40h12m-12 20h12m-12 20h12',teal,3)+[0,1,2].map(i=>box(105,21+i*23,34,17,i===1?sage:cream,3)).join(''),
  'codex-bonus': page(21,16,rows(30,40))+path('M95 28a26 26 0 1 1-7 47m7-59v12h12',teal,4),
  'tools-map': window(13,24,124,62,path('M50 38v48')+path('M62 50h52','#a65d4e',4)+path('M62 63h52',teal,4)+path('M24 49h15m-15 10h15')),
  'tools-vscode-setup': window(8,26,42,55,path('M29 48v18m-6-6 6 6 6-6',teal,3))+arrow(54,54,10)+box(70,32,31,43,sage)+check(77,55)+arrow(105,54,6)+page(115,30,path('M122 54h20m-20 9h15',teal,2)),
  'tools-vscode': window(15,20,123,72,box(29,43,92,24,'#e0ebd8')+path('M38 53h44')+`<circle cx="103" cy="54" r="6" fill="none"/>`+path('M108 59l7 7')),
  'tools-pycharm': window(13,20,91,67,path('M25 45l9 7-9 7m23-14-9 14',teal,3))+box(86,60,58,27,gold)+label(95,79,'Ctrl',14),
  'codex-context': window(16,16,123,78,path('M54 30v64m0-24h85')+folder(24,41,22,17)+path('M66 45h47m-47 10h32')+label(65,86,'&gt;_',16)),
  'tools-html': window(16,21,123,68,label(28,58,'&lt;h1&gt;',19)+box(94,44,31,27,sage)),
  'tools-css': window(16,21,123,68,box(34,43,88,32,sage)+box(46,52,64,14,cream,3))+path('M27 43v32m-3-32h6m-6 32h6',teal,2),
  'tools-javascript': window(16,21,123,68,box(29,43,46,26,gold)+path('M83 55h13m-5-5 5 5-5 5',teal,3)+box(101,45,24,22,sage))+dot(44,57,4,teal),
  'tools-bonus': window(15,20,123,70,box(27,44,47,29,sage)+label(34,64,'env',15)+path('M91 44l20 13-20 13Z',teal,3)),
  'web-map': window(11,32,61,49,box(23,52,36,18,sage))+server(106,23)+arrow(75,53,23),
  'web-http': window(12,31,62,49,rows(22,55))+server(109,25)+arrow(78,42,23)+path('M101 66H78m6-5-6 5 6 5',teal,3),
  'web-html': page(14,26,label(22,60,'{{}}',14))+dot(77,56,12,gold)+arrow(91,55,15)+window(112,29,37,48,box(120,49,20,14,sage)),
  'web-bonus': window(12,27,135,54,label(23,61,'/  #',22))+path('M22 44h114',teal),
  'web-jinja': page(23,21,label(31,53,'{{}}',14),'#e2ecd8')+page(92,21,label(100,53,'{{}}',14),'#f0dbb1')+path('M77 28v58',teal,2),
  'frontend-css': page(16,20,rows(24,45))+arrow(65,52,20)+window(96,29,51,48,box(105,49,32,17,sage)),
  'frontend-alpine': window(15,22,123,65,box(28,43,47,27,gold)+box(91,46,32,17,sage,8)+dot(113,54,5,cream))+path('M78 57h10',teal,3),
  'frontend-bonus': page(21,16,label(28,49,'CSS',14))+arrow(69,52,21)+window(104,29,41,48,path('M114 52l10 13m0-13-10 13','#a65d4e',3)),
};

export function sectionThumbnail(id, topicId='terminal') {
  const key = String(id || '').replace(/^section-/, '');
  if (!Object.hasOwn(scenes,key)) return topicThumbnail(topicId);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112" aria-hidden="true" focusable="false" data-section-thumbnail="${key}"><ellipse cx="80" cy="98" rx="64" ry="7" fill="#26344e" opacity=".09"/><g fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${scenes[key]}</g></svg>`;
}
