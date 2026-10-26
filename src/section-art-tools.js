const C = {
  ink: "#283449", paper: "#f5ead3", cream: "#dfcfad",
  sage: "#8aa395", teal: "#536e6d", orange: "#da9d77",
  light: "#fcf5e7", muted: "#788577", line: "#c6b99c",
};

const escapeText = (value) => String(value).replace(/[&<>"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
}[char]));

function text(x, y, value, options = {}) {
  const { size = 22, fill = C.ink, weight = 500, anchor = "start", mono = false } = options;
  return '<text x="' + x + '" y="' + y + '" fill="' + fill + '" stroke="none" font-size="' + size
    + '" font-weight="' + weight + '" text-anchor="' + anchor + '" font-family="'
    + (mono ? "Consolas, monospace" : "Pretendard, Malgun Gothic, system-ui, sans-serif") + '">'
    + escapeText(value) + '</text>';
}

function rect(x, y, width, height, fill = C.paper, radius = 12, extra = "") {
  return '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height
    + '" rx="' + radius + '" fill="' + fill + '" stroke="' + C.ink + '" stroke-width="2.4" ' + extra + '/>';
}

function line(path, color = C.ink, width = 2.4, extra = "") {
  return '<path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="' + width
    + '" stroke-linecap="round" stroke-linejoin="round" ' + extra + '/>';
}

function arrow(prefix, path, color = C.teal) {
  return line(path, color, 3, 'marker-end="url(#' + prefix + '-arrow)"');
}

function card(prefix, x, y, width, height, contents, fill = "") {
  return '<g stroke-linejoin="round">'
    + '<path d="M' + (x + 12) + ' ' + (y + height) + 'h' + (width - 12) + 'v-'
    + (height - 12) + 'l8 8v' + (height - 8) + 'H' + (x + 20) + 'z" fill="' + C.cream
    + '" stroke="' + C.ink + '" stroke-width="2.4"/>'
    + rect(x, y, width, height, fill || 'url(#' + prefix + '-paper)')
    + line("M" + (x + 14) + " " + (y + 7) + "H" + (x + width - 14), C.light, 2)
    + contents + '</g>';
}

function check(x, y, scale = 1, color = C.teal) {
  return '<g transform="translate(' + x + " " + y + ') scale(' + scale + ')">'
    + line("M-10 0l7 7L12-12", color, 4) + '</g>';
}

function dot(x, y, radius = 5, fill = C.sage) {
  return '<circle cx="' + x + '" cy="' + y + '" r="' + radius + '" fill="' + fill
    + '" stroke="' + C.ink + '" stroke-width="1.7"/>';
}

function signal(prefix, path) {
  return line(path, C.light, 4, 'class="art-motion ' + prefix + '-flow" pathLength="100" stroke-dasharray="6 94" stroke-dashoffset="100" opacity="0"');
}

function documentShape(x, y, width = 86, height = 106, fill = C.light) {
  return '<g stroke="' + C.ink + '" stroke-width="2.3" stroke-linejoin="round">'
    + '<path d="M' + x + " " + y + "h" + (width - 21) + "l21 21v" + (height - 21)
    + "H" + x + 'z" fill="' + fill + '"/>'
    + '<path d="M' + (x + width - 21) + " " + y + "v21h21" + '" fill="' + C.cream + '"/>'
    + line("M" + (x + 15) + " " + (y + 43) + "h" + (width - 30), C.teal, 3)
    + line("M" + (x + 15) + " " + (y + 59) + "h" + (width - 36), C.line, 3)
    + line("M" + (x + 15) + " " + (y + 75) + "h" + (width - 43), C.line, 3) + '</g>';
}

function folder(x, y, width, height, contents = "") {
  return '<g stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round">'
    + '<path d="M' + x + " " + (y + 20) + "v-" + 20 + "h" + (width * 0.38) + "l14 20h"
    + (width * 0.62 - 14) + "v" + (height - 20) + "H" + x + 'z" fill="' + C.cream + '"/>'
    + contents
    + '<path d="M' + (x - 6) + " " + (y + 40) + "h" + (width + 17) + "l-17 " + (height - 40)
    + "H" + (x + 5) + 'z" fill="' + C.paper + '"/>'
    + line("M" + (x + 6) + " " + (y + 47) + "h" + (width - 12), C.light, 2) + '</g>';
}

function commitNode(prefix, x, y, radius = 34) {
  const ry = radius * 0.48;
  return '<g stroke="' + C.ink + '" stroke-width="2.4">'
    + '<path d="M' + (x - radius) + " " + y + "v30c0 " + ry + " " + (radius * 2) + " " + ry
    + " " + (radius * 2) + ' 0v-30" fill="' + C.teal + '"/>'
    + '<ellipse cx="' + x + '" cy="' + y + '" rx="' + radius + '" ry="' + ry + '" fill="' + C.sage + '"/>'
    + '<ellipse cx="' + x + '" cy="' + (y - 1) + '" rx="' + (radius * 0.34) + '" ry="' + (ry * 0.34)
    + '" fill="' + C.light + '" stroke-width="1.8"/>'
    + line("M" + (x - radius + 8) + " " + (y - 5) + "q" + (radius - 8) + "-13 " + (radius * 2 - 16) + " 0", "#cad5bb", 1.6)
    + '</g>';
}

function key(x, y, width, label, active = false) {
  return '<g>' + rect(x + 2, y + 4, width, 29, C.cream, 5)
    + rect(x, y, width, 29, active ? C.sage : C.light, 5)
    + text(x + width / 2, y + 21, label, { size: 18, weight: 600, anchor: "middle" }) + '</g>';
}

function scene(prefix, contents) {
  return '<svg xmlns="http://www.w3.org/2000/svg" class="topic-art-svg section-art-svg" viewBox="0 0 760 550" aria-hidden="true" focusable="false">'
    + '<defs><linearGradient id="' + prefix + '-paper" x1="0" y1="0" x2="0" y2="1">'
    + '<stop stop-color="#fcf5e7"/><stop offset="1" stop-color="#f0e4cc"/></linearGradient>'
    + '<filter id="' + prefix + '-shadow" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>'
    + '<marker id="' + prefix + '-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto" markerUnits="userSpaceOnUse">'
    + '<path d="M1 1l5 3-5 3" fill="none" stroke="' + C.teal + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>'
    + '<style>.' + prefix + '-flow{animation:' + prefix + '-travel 6.8s ease-in-out infinite}'
    + '.' + prefix + '-cursor{animation:' + prefix + '-cursor-light 6.8s ease-in-out infinite}'
    + '@keyframes ' + prefix + '-travel{0%,8%{stroke-dashoffset:100;opacity:0}18%{opacity:.9}74%{stroke-dashoffset:0;opacity:.9}86%,100%{stroke-dashoffset:0;opacity:0}}'
    + '@keyframes ' + prefix + '-cursor-light{0%,100%{opacity:.3}35%,65%{opacity:.85}}'
    + '@media(prefers-reduced-motion:reduce){.' + prefix + '-flow,.' + prefix + '-cursor{animation:none!important}}</style>'
    + '<ellipse cx="383" cy="442" rx="219" ry="20" fill="#8e8975" opacity=".14" filter="url(#' + prefix + '-shadow)"/>'
    + contents + '</svg>';
}

function greetingScene() {
  const p = "section-terminal-example";
  return scene(p,
    card(p, 102, 113, 556, 126,
      text(126, 151, "입력", { weight: 650 }) + dot(626, 143, 5, C.sage)
      + text(126, 199, "Write-Output '안녕하세요, 돌범입니다.'", { mono: true })
      + '<rect x="615" y="179" width="5" height="25" rx="2" fill="' + C.teal + '" class="art-motion ' + p + '-cursor"/>')
    + arrow(p, "M380 253v57") + text(403, 288, "Enter", { mono: true, fill: C.teal })
    + signal(p, "M380 253v57")
    + card(p, 145, 327, 470, 93,
      text(170, 361, "출력", { weight: 650 })
      + text(170, 398, "안녕하세요, 돌범입니다.", { size: 25, fill: C.teal }))
  );
}

function guiCliScene() {
  const p = "section-terminal-gui-cli";
  return scene(p,
    text(380, 101, "같은 작업, 두 가지 경로", { anchor: "middle", weight: 650 })
    + card(p, 101, 140, 232, 183,
      text(124, 176, "GUI", { weight: 650 })
      + line("M115 191h204", C.line, 1.5)
      + folder(124, 215, 63, 65)
      + line("M205 228h91M205 246h70M205 264h82", C.teal, 3)
      + '<path d="M282 272l-1 37 10-10 11 17 10-6-11-17 14-3z" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2.2"/>')
    + card(p, 428, 140, 232, 183,
      text(451, 176, "CLI", { weight: 650 })
      + line("M442 191h204", C.line, 1.5)
      + text(450, 237, "> Get-Content", { mono: true })
      + text(450, 272, "package.json", { size: 22, mono: true, fill: C.teal }))
    + arrow(p, "M218 337v18q0 12 16 12h112v15")
    + arrow(p, "M546 337v18q0 12-16 12H414v15")
    + signal(p, "M218 337v18q0 12 16 12h112v15")
    + signal(p, "M546 337v18q0 12-16 12H414v15")
    + card(p, 274, 386, 212, 57, text(380, 423, "같은 파일", { anchor: "middle", weight: 600 }))
  );
}

function hostShellScene() {
  const p = "section-terminal-host-shell";
  return scene(p,
    text(380, 104, "호스트", { anchor: "middle", weight: 650 })
    + line("M380 114v22", C.teal, 2.5)
    + card(p, 111, 147, 538, 247,
      '<path d="M123 148h514v57H123z" fill="' + C.cream + '" stroke="none"/>'
      + text(137, 184, "Windows Terminal", { size: 25, weight: 650 })
      + dot(579, 174, 4, C.sage) + dot(599, 174, 4, C.cream) + dot(619, 174, 4, C.orange)
      + rect(135, 220, 234, 145, C.ink, 9)
      + rect(391, 220, 234, 145, C.teal, 9)
      + text(156, 258, "PowerShell", { size: 25, fill: C.light, weight: 600 })
      + text(156, 306, "PS >", { mono: true, size: 24, fill: "#c4d2b7" })
      + text(412, 258, "cmd", { size: 25, fill: C.light, weight: 600 })
      + text(412, 306, "C:\\>", { mono: true, size: 24, fill: "#e7dabd" })
      + '<rect x="225" y="285" width="5" height="25" rx="2" fill="' + C.light + '" class="art-motion ' + p + '-cursor"/>'
      + line("M153 337h148M410 337h148", "#92a594", 2))
    + text(380, 442, "창과 탭 안에서, 셸이 명령을 해석합니다", { anchor: "middle", size: 22 })
  );
}

function shortcutsScene() {
  const p = "section-terminal-shortcuts";
  const keyboard = [];
  const rows = [
    { y: 303, keys: [["Tab", 60], ["Q", 38], ["W", 38], ["E", 38], ["R", 38], ["T", 38], ["Y", 38], ["↵", 48]] },
    { y: 340, keys: [["Shift", 78], ["Z", 38], ["X", 38], ["C", 38], ["V", 38], ["B", 38], ["N", 38], ["↑", 38]] },
    { y: 377, keys: [["Ctrl", 69], ["Alt", 55], ["", 160], ["←", 38], ["↓", 38], ["→", 38]] },
  ];
  for (const row of rows) {
    let x = 172;
    for (const [label, width] of row.keys) {
      keyboard.push(key(x, row.y, width, label, ["Tab", "T", "C", "V", "Ctrl", "Shift"].includes(label)));
      x += width + 6;
    }
  }
  return scene(p,
    card(p, 120, 111, 159, 138,
      text(199, 144, "새 탭", { anchor: "middle", weight: 650 })
      + rect(141, 166, 116, 57, C.light, 5)
      + '<path d="M151 166v-9h49l10 9" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2"/>'
      + line("M194 185v21M184 195h20", C.teal, 3))
    + card(p, 300, 111, 159, 138,
      text(379, 144, "탭 전환", { anchor: "middle", weight: 650 })
      + rect(320, 174, 92, 48, C.cream, 5) + rect(339, 162, 98, 48, C.sage, 5)
      + arrow(p, "M328 230h97"))
    + card(p, 480, 111, 159, 138,
      text(559, 144, "복사", { anchor: "middle", weight: 650 })
      + rect(528, 171, 62, 57, C.cream, 5) + rect(515, 159, 62, 57, C.light, 5)
      + line("M529 179h33M529 192h26", C.teal, 3))
    + '<path d="M150 287h454l20 130-14 17H163l-16-14z" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="2.5" stroke-linejoin="round"/>'
    + '<path d="M150 287h454l13 125H161z" fill="url(#' + p + '-paper)" stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round"/>'
    + keyboard.join("")
    + '<g class="art-motion ' + p + '-cursor" fill="none" stroke="' + C.orange + '" stroke-width="3">'
    + '<rect x="172" y="303" width="60" height="29" rx="5"/><rect x="172" y="377" width="69" height="29" rx="5"/></g>'
    + text(380, 472, "한 줄 입력 · 탭 전환 · 결과 확인", { anchor: "middle", size: 22 })
  );
}

function diffScene() {
  const p = "section-git-example";
  return scene(p,
    card(p, 119, 115, 388, 286,
      text(146, 154, "index.html", { mono: true, weight: 650 })
      + line("M139 174h348", C.line, 1.5)
      + rect(140, 197, 343, 54, "#ead3bc", 6, 'stroke-opacity=".2"')
      + text(157, 233, "− 코딩 노트", { fill: "#8e5f49" })
      + rect(140, 267, 343, 54, "#dce6ce", 6, 'stroke-opacity=".2"')
      + text(157, 303, "+ 돌범의 코딩 기초", { fill: C.teal, weight: 600 })
      + line("M157 350h229M157 369h168", C.line, 3))
    + '<g><path d="M544 314l39 55" fill="none" stroke="' + C.ink + '" stroke-width="21" stroke-linecap="round"/>'
    + '<path d="M544 314l39 55" fill="none" stroke="' + C.teal + '" stroke-width="13" stroke-linecap="round"/>'
    + '<circle cx="513" cy="265" r="61" fill="' + C.light + '" fill-opacity=".9" stroke="' + C.ink + '" stroke-width="3"/>'
    + '<circle cx="513" cy="265" r="49" fill="none" stroke="' + C.sage + '" stroke-width="2"/>'
    + check(511, 266, 1.7) + signal(p, "M513 216a49 49 0 1 1-49 49") + '</g>'
    + card(p, 423, 392, 211, 67,
      text(446, 420, "README", { mono: true, size: 22 })
      + text(446, 445, "기존 작업은 보존", { size: 18, fill: C.teal }))
    + text(201, 448, "바뀐 줄을 검토", { size: 22, weight: 600 })
  );
}

function versionFlowScene() {
  const p = "section-git-why";
  return scene(p,
    rect(92, 112, 421, 299, "#f1e6cf", 23, 'stroke-dasharray="7 8" stroke-opacity=".55"')
    + text(302, 154, "내 컴퓨터", { anchor: "middle", weight: 650 })
    + documentShape(124, 220, 78, 105)
    + text(163, 371, "저장", { anchor: "middle", weight: 600 })
    + arrow(p, "M215 272h37")
    + '<path d="M264 270h87l-8 42h-71z" fill="' + C.cream + '" stroke="' + C.ink + '" stroke-width="2.5" stroke-linejoin="round"/>'
    + documentShape(275, 222, 63, 75)
    + '<path d="M264 285h87l-8 29h-71z" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round"/>'
    + text(307, 371, "선택", { anchor: "middle", weight: 600 })
    + arrow(p, "M361 272h33")
    + commitNode(p, 438, 266, 33)
    + text(438, 371, "커밋", { anchor: "middle", weight: 600 })
    + arrow(p, "M477 270h85") + text(521, 249, "push", { anchor: "middle", mono: true })
    + signal(p, "M477 270h85")
    + card(p, 569, 190, 103, 130,
      text(620, 226, "원격", { anchor: "middle", weight: 650 })
      + line("M588 250h65M588 271h65M588 292h65", C.teal, 8)
      + dot(593, 250, 3, C.light) + dot(593, 271, 3, C.light) + dot(593, 292, 3, C.light))
    + arrow(p, "M620 333v34")
    + card(p, 565, 381, 111, 57,
      text(599, 418, "PR", { mono: true, anchor: "middle", weight: 650 })
      + check(646, 409, 0.7))
    + text(302, 449, "로컬 기록", { anchor: "middle", size: 22 })
  );
}

function promptScene() {
  const p = "section-git-prompt";
  return scene(p,
    card(p, 116, 134, 244, 275,
      text(141, 176, "Codex 요청", { weight: 650 })
      + line("M136 195h204", C.line, 1.5)
      + rect(140, 220, 24, 24, C.light, 4) + check(152, 233, 0.55)
      + text(181, 241, "목표")
      + rect(140, 267, 24, 24, C.light, 4) + check(152, 280, 0.55)
      + text(181, 288, "기존 작업 보존")
      + rect(140, 314, 24, 24, C.light, 4) + check(152, 327, 0.55)
      + text(181, 335, "확인 방법")
      + text(141, 382, "작게 요청하기", { size: 18, fill: C.teal }))
    + '<path d="M194 125h87l9 22h-105z" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2.3" stroke-linejoin="round"/>'
    + arrow(p, "M374 275h25")
    + '<circle cx="456" cy="275" r="48" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2.5"/>'
    + '<circle cx="456" cy="275" r="36" fill="' + C.light + '" stroke="' + C.teal + '" stroke-width="1.7"/>'
    + check(456, 278, 1.6)
    + text(456, 358, "검증", { anchor: "middle", weight: 600 })
    + arrow(p, "M517 275h25") + signal(p, "M517 275h25")
    + commitNode(p, 598, 267, 42)
    + text(598, 358, "커밋", { anchor: "middle", weight: 600 })
    + card(p, 410, 397, 234, 52, text(527, 430, "diff · 검사 · 기록", { anchor: "middle", size: 22 }))
  );
}

function cloneScene() {
  const p = "section-github-clone";
  return scene(p,
    '<g stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round">'
    + '<path d="M119 161l70-39 85 48-70 41z" fill="' + C.sage + '"/>'
    + '<path d="M119 161v121l85 49V210z" fill="' + C.paper + '"/>'
    + '<path d="M204 210l70-40v121l-70 40z" fill="' + C.teal + '"/>'
    + line("M139 204l44 25M139 231l44 25M139 258l44 25", C.teal, 6)
    + dot(225, 227, 4, C.light) + dot(243, 217, 4, C.light)
    + '</g>'
    + text(193, 369, "GitHub", { anchor: "middle", weight: 650 })
    + arrow(p, "M294 236h82") + text(337, 211, "clone", { anchor: "middle", mono: true })
    + signal(p, "M294 236h82")
    + folder(402, 173, 221, 148,
      documentShape(420, 172, 78, 102) + documentShape(498, 157, 92, 117))
    + text(512, 287, "내 폴더", { anchor: "middle", weight: 650 })
    + line("M512 336v24M361 382v-22h296v22M512 360v22", C.teal, 2.7)
    + card(p, 293, 387, 137, 58, text(361, 424, "README", { anchor: "middle", mono: true, size: 22 }))
    + card(p, 448, 387, 127, 58, text(511, 424, "진입점", { anchor: "middle", size: 22 }))
    + card(p, 594, 387, 127, 58, text(657, 424, "데이터", { anchor: "middle", size: 22 }))
  );
}

function remoteRolesScene() {
  const p = "section-github-roles";
  return scene(p,
    line("M314 233L257 194M449 233l55-39M267 364l57-49M453 315l62 48", C.teal, 3)
    + signal(p, "M267 364l57-49")
    + text(282, 212, "소개", { size: 18, anchor: "middle", fill: C.teal })
    + text(484, 211, "정적 게시", { size: 18, anchor: "middle", fill: C.teal })
    + text(280, 330, "push", { size: 22, mono: true, anchor: "middle" })
    + text(490, 331, "clone", { size: 22, mono: true, anchor: "middle" })
    + card(p, 98, 104, 178, 126,
      dot(139, 151, 16, C.orange)
      + '<path d="M113 201v-9c0-17 12-26 26-26s26 9 26 26v9" fill="' + C.sage + '" stroke="' + C.ink + '" stroke-width="2"/>'
      + text(176, 151, "프로필", { size: 22, weight: 650 })
      + line("M176 176h73M176 191h57", C.line, 3))
    + card(p, 493, 104, 178, 126,
      text(516, 143, "Pages", { size: 24, weight: 650 })
      + line("M509 159h146", C.line, 1.5)
      + rect(514, 173, 43, 34, C.sage, 4)
      + line("M571 179h69M571 194h55", C.teal, 3))
    + '<g stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round">'
    + '<path d="M303 231l78-45 80 46-78 45z" fill="' + C.sage + '"/>'
    + '<path d="M303 231v81l80 46v-81z" fill="' + C.paper + '"/>'
    + '<path d="M383 277l78-45v81l-78 45z" fill="' + C.teal + '"/>'
    + line("M321 264l44 25M321 286l44 25", C.teal, 6)
    + dot(407, 292, 4, C.light) + dot(431, 279, 4, C.light)
    + '</g>'
    + text(381, 176, "GitHub", { size: 24, weight: 650, anchor: "middle" })
    + card(p, 93, 365, 188, 88,
      text(187, 398, "내 컴퓨터", { size: 22, weight: 650, anchor: "middle" })
      + text(187, 433, "수정 · 커밋", { size: 18, anchor: "middle", fill: C.teal }))
    + card(p, 510, 363, 160, 90,
      text(590, 397, "서버", { size: 22, weight: 650, anchor: "middle" })
      + text(590, 432, "실행 준비", { size: 18, anchor: "middle", fill: C.teal }))
  );
}

export const toolSectionScenes = {
  "terminal-example": {
    title: "첫 명령: 인사 한 줄 입력하고 결과 확인하기",
    description: "입력 판에서 Write-Output으로 보낸 인사가 Enter를 거쳐 출력 판에 같은 문장으로 표시됩니다.",
    svg: greetingScene(),
  },
  "terminal-gui-cli": {
    title: "GUI가 편한데도 명령을 알아야 하는 이유",
    description: "파일을 클릭하는 GUI와 명령을 적는 CLI가 하나의 파일로 이어지는 두 경로를 보여 줍니다.",
    svg: guiCliScene(),
  },
  "terminal-host-shell": {
    title: "Windows Terminal과 PowerShell·cmd의 관계",
    description: "Windows Terminal이라는 호스트 안에 PowerShell과 cmd 셸이 각각 들어 있는 구조를 보여 줍니다.",
    svg: hostShellScene(),
  },
  "terminal-shortcuts": {
    title: "단축키 연습: 탭 열기부터 결과 확인까지",
    description: "실물 키보드의 주요 키와 새 탭·탭 전환·복사 카드로 단축키의 동작을 연결합니다.",
    svg: shortcutsScene(),
  },
  "git-example": {
    title: "Codex 사용 예: 화면이 바뀐 뒤 확인할 것",
    description: "제목의 삭제·추가 줄을 확대해 검토하면서 별도로 남아 있는 README 작업을 보존합니다.",
    svg: diffScene(),
  },
  "git-why": {
    title: "Git을 쓰는 이유: 버전·GitHub·PR 구분",
    description: "내 컴퓨터의 저장·선택·커밋과 경계 밖 원격 전송·PR 검토를 다른 도형과 영역으로 구분합니다.",
    svg: versionFlowScene(),
  },
  "git-prompt": {
    title: "Codex에게 수정·확인·커밋을 요청하는 프롬프트",
    description: "목표·보존 조건·확인 방법이 적힌 요청서가 검증 관문과 커밋 기록으로 이어집니다.",
    svg: promptScene(),
  },
  "github-clone": {
    title: "clone 사용 예: Codex와 저장소 구조 분석하기",
    description: "원격 저장소가 로컬 폴더로 복제되고 README·진입점·데이터를 나누어 분석하는 구조입니다.",
    svg: cloneScene(),
  },
  "github-roles": {
    title: "원격 보관부터 서버·프로필·Pages까지 연결하기",
    description: "GitHub를 중심으로 내 컴퓨터의 push, 서버의 clone·실행 준비, 프로필 소개와 Pages 정적 게시를 구분합니다.",
    svg: remoteRolesScene(),
  },
};
