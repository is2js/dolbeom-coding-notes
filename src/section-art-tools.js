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
    text(380, 74, "터미널과 탐색기를 오가며 같은 위치 확인", { anchor: "middle", size: 24, weight: 650 })
    + card(p, 70, 106, 320, 330,
      text(94, 143, "PowerShell", { size: 24, weight: 650 }) + dot(361, 135, 5, C.sage)
      + line("M91 159h277", C.line, 1.5)
      + rect(91, 171, 278, 47, "#e2e8d5", 6, 'stroke-opacity="0"')
      + text(102, 201, "pwd", { mono: true, size: 23, weight: 700, fill: C.teal })
      + text(167, 201, "= Get-Location", { mono: true, size: 17 })
      + text(102, 250, "explorer.exe .", { mono: true, size: 22 })
      + text(102, 300, "ls", { mono: true, size: 23, weight: 700, fill: C.teal })
      + text(150, 300, "= Get-ChildItem", { mono: true, size: 17 })
      + text(102, 351, "mkdir → cd", { mono: true, size: 22 })
      + text(102, 374, "New-Item · Set-Location", { mono: true, size: 15, fill: C.teal })
      + text(102, 400, "pwd", { mono: true, size: 22, fill: C.teal })
      + text(165, 400, "이동한 위치 확인", { size: 18 })
      + '<rect x="345" y="385" width="4" height="20" rx="2" fill="' + C.teal + '" class="art-motion ' + p + '-cursor"/>')
    + arrow(p, "M400 232h30") + signal(p, "M400 232h30")
    + card(p, 445, 106, 245, 174,
      text(466, 143, "파일 탐색기", { size: 24, weight: 650 })
      + line("M464 158h206", C.line, 1.5)
      + rect(464, 171, 205, 36, C.light, 6)
      + text(476, 195, "C:\\work", { mono: true, size: 19, fill: C.teal })
      + text(466, 242, "Win + R → 경로 입력", { size: 19 })
      + text(466, 264, "또는 explorer.exe .", { mono: true, size: 17 }))
    + card(p, 445, 315, 245, 121,
      text(466, 351, "탐색기 주소창", { size: 23, weight: 650 })
      + rect(464, 365, 205, 42, "#e2e8d5", 6, 'stroke-opacity="0"')
      + text(566, 393, "wt -d .", { anchor: "middle", mono: true, size: 23, fill: C.teal }))
    + arrow(p, "M567 290v14") + signal(p, "M567 290v14")
    + text(380, 485, "현재 폴더를 확인하고, 탐색기와 터미널을 전환", { anchor: "middle", size: 21 })
    + text(380, 517, "표시된 경로는 예시 · 실제 존재하는 폴더로 연습", { anchor: "middle", size: 19, fill: C.teal })
  );
}

function guiCliScene() {
  const p = "section-terminal-gui-cli";
  return scene(p,
    text(380, 73, "하나의 메모 파일을 두 화면에서 확인", { anchor: "middle", size: 25, weight: 650 })
    + card(p, 50, 113, 267, 278,
      text(73, 150, "PowerShell · CLI", { size: 24, weight: 650 })
      + line("M70 167h227", C.line, 1.5)
      + text(73, 207, "pwd", { mono: true, size: 22, fill: C.teal })
      + text(73, 240, "New-Item", { mono: true, size: 22 })
      + text(73, 274, "memo.txt", { mono: true, size: 22 })
      + line("M72 292h223", C.line, 1.5)
      + text(73, 325, "Get-Content / cat", { mono: true, size: 18, fill: C.teal })
      + text(73, 357, "memo.txt", { mono: true, size: 22 })
      + '<rect x="244" y="338" width="4" height="21" rx="2" fill="' + C.teal + '" class="art-motion ' + p + '-cursor"/>')
    + documentShape(337, 191, 86, 106, C.light)
    + text(380, 326, "memo.txt", { mono: true, anchor: "middle", size: 17, fill: C.teal })
    + arrow(p, "M325 239h4") + signal(p, "M325 239h4")
    + arrow(p, "M430 239h10") + signal(p, "M430 239h10")
    + card(p, 449, 113, 260, 278,
      text(470, 150, "메모장 · GUI", { size: 24, weight: 650 })
      + line("M468 167h222", C.line, 1.5)
      + rect(467, 183, 224, 122, C.light, 6)
      + text(480, 214, "memo.txt", { mono: true, size: 18, fill: C.teal })
      + line("M480 229h196", C.line, 1.5)
      + text(480, 260, "Hello, Codex!", { mono: true, size: 20 })
      + '<rect x="647" y="242" width="4" height="20" rx="2" fill="' + C.teal + '" class="art-motion ' + p + '-cursor"/>'
      + text(472, 344, "입력 후 Ctrl+S 저장", { size: 20 })
      + text(472, 371, "탐색기에서 파일 확인", { size: 18, fill: C.teal }))
    + arrow(p, "M563 409v26H194v-26") + signal(p, "M563 409v26H194v-26")
    + text(380, 481, "메모장에서 저장 → 터미널에서 내용 읽기", { anchor: "middle", size: 22, fill: C.teal })
    + text(380, 516, "앞에서 만든 연습 폴더를 그대로 사용", { anchor: "middle", size: 19 })
  );
}

function hostShellScene() {
  const p = "section-terminal-host-shell";
  return scene(p,
    text(380, 85, "호스트는 창과 탭, 셸은 명령 해석", { anchor: "middle", size: 25, weight: 650 })
    + card(p, 88, 119, 584, 288,
      '<path d="M100 120h560v58H100z" fill="' + C.cream + '" stroke="none"/>'
      + text(111, 157, "Windows Terminal", { size: 28, weight: 650 })
      + text(647, 156, "호스트", { anchor: "end", size: 20, fill: C.teal })
      + rect(111, 190, 167, 32, C.sage, 7)
      + rect(296, 190, 167, 32, C.paper, 7)
      + rect(481, 190, 167, 32, C.paper, 7)
      + text(194, 213, "탭 1", { anchor: "middle", size: 18 })
      + text(379, 213, "탭 2", { anchor: "middle", size: 18 })
      + text(564, 213, "탭 3", { anchor: "middle", size: 18 })
      + rect(111, 235, 167, 147, C.ink, 8)
      + rect(296, 235, 167, 147, C.teal, 8)
      + rect(481, 235, 167, 147, "#384c52", 8)
      + text(194, 271, "PowerShell 7", { anchor: "middle", size: 23, fill: C.light, weight: 650 })
      + text(194, 304, "pwsh.exe", { anchor: "middle", mono: true, size: 19, fill: "#c4d2b7" })
      + text(130, 354, "PS >", { mono: true, size: 24, fill: C.light })
      + '<rect x="196" y="334" width="5" height="24" rx="2" fill="' + C.light + '" class="art-motion ' + p + '-cursor"/>'
      + text(379, 266, "Windows", { anchor: "middle", size: 23, fill: C.light, weight: 650 })
      + text(379, 293, "PowerShell 5.1", { anchor: "middle", size: 21, fill: C.light, weight: 650 })
      + text(379, 322, "powershell.exe", { anchor: "middle", mono: true, size: 17, fill: "#d4ddc6" })
      + text(315, 359, "PS >", { mono: true, size: 24, fill: C.light })
      + text(564, 275, "명령 프롬프트", { anchor: "middle", size: 22, fill: C.light, weight: 650 })
      + text(564, 311, "cmd.exe", { anchor: "middle", mono: true, size: 20, fill: "#e7dabd" })
      + text(502, 359, "C:\\>", { mono: true, size: 24, fill: C.light }))
    + text(380, 450, "탭의 프로필과 실행할 셸을 확인", { anchor: "middle", size: 23, fill: C.teal })
    + text(380, 489, "git · codex는 셸에서 부르는 별도 프로그램", { anchor: "middle", size: 21 })
  );
}

function shortcutsScene() {
  const p = "section-terminal-shortcuts";
  return scene(p,
    text(380, 82, "설정에서 준비하고, 나눈 창 사이로 이동", { anchor: "middle", size: 25, weight: 650 })
    + card(p, 91, 124, 190, 278,
      text(186, 162, "설정", { anchor: "middle", size: 26, weight: 650 })
      + line("M113 183h145", C.line, 1.5)
      + text(112, 216, "기본 프로필", { size: 21 })
      + rect(111, 228, 148, 31, "#e2e8d5", 6)
      + text(185, 251, "PowerShell 7", { anchor: "middle", size: 18 })
      + text(112, 294, "테마 · 글꼴 · 키", { size: 18 })
      + line("M115 316h133", C.teal, 2.5)
      + dot(151, 316, 6, C.light)
      + key(120, 350, 74, "Ctrl") + key(212, 350, 39, ","))
    + arrow(p, "M295 254h20") + signal(p, "M295 254h20")
    + card(p, 329, 124, 339, 278,
      text(351, 161, "Windows Terminal", { size: 25, weight: 650 })
      + rect(349, 180, 139, 29, C.sage, 5)
      + text(418, 201, "한 탭 안의 패널", { anchor: "middle", size: 17 })
      + line("M512 191v12M506 197h12", C.teal, 2.5)
      + rect(350, 224, 142, 153, C.ink, 7)
      + rect(509, 224, 137, 153, C.teal, 7)
      + text(369, 273, "PS >", { mono: true, size: 25, fill: C.light })
      + text(527, 273, "PS >", { mono: true, size: 25, fill: C.light })
      + '<rect x="433" y="252" width="5" height="25" rx="2" fill="' + C.light + '" class="art-motion ' + p + '-cursor"/>'
      + text(421, 344, "현재 포커스", { anchor: "middle", size: 18, fill: "#d4ddc6" })
      + text(577, 344, "다른 패널", { anchor: "middle", size: 18, fill: "#d4ddc6" })
      + '<rect x="346" y="220" width="150" height="161" rx="9" fill="none" stroke="' + C.orange + '" stroke-width="3" class="art-motion ' + p + '-cursor"/>')
    + text(186, 441, "Ctrl + ,", { anchor: "middle", mono: true, size: 24, fill: C.teal })
    + text(186, 475, "설정 열기", { anchor: "middle", size: 22 })
    + text(499, 441, "Alt + Shift + D", { anchor: "middle", mono: true, size: 23, fill: C.teal })
    + text(499, 475, "분할  ·  Alt + 방향키로 포커스", { anchor: "middle", size: 21 })
    + text(380, 520, "기본 키 기준 · 바꾼 키는 설정에서 확인", { anchor: "middle", size: 20, fill: C.teal })
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
    title: "첫 명령: 현재 위치에서 폴더 만들고 열기",
    description: "PowerShell에서 pwd(Get-Location의 별칭)로 현재 위치를 확인하고 Win+R에 경로를 입력하거나 explorer.exe .으로 같은 폴더를 엽니다. ls로 목록을 확인한 후 mkdir과 cd로 폴더를 만들고 이동한 뒤 탐색기 주소창의 wt -d .으로 해당 위치에서 Windows Terminal을 여는 흐름입니다.",
    svg: greetingScene(),
  },
  "terminal-gui-cli": {
    title: "GUI와 CLI 연결: 같은 메모 파일 만들고 확인하기",
    description: "앞에서 만든 연습 폴더의 memo.txt를 PowerShell에서 만들고 메모장에서 내용을 입력해 저장한 뒤, 탐색기와 Windows에서 쓰는 PowerShell의 Get-Content 또는 그 기본 별칭 cat으로 같은 파일을 확인합니다.",
    svg: guiCliScene(),
  },
  "terminal-host-shell": {
    title: "Windows Terminal과 PowerShell·cmd의 관계",
    description: "Windows Terminal 호스트 안의 탭별 프로필에서 PowerShell 7의 pwsh.exe, Windows PowerShell 5.1의 powershell.exe, 명령 프롬프트의 cmd.exe를 구분합니다.",
    svg: hostShellScene(),
  },
  "terminal-shortcuts": {
    title: "단축키 연습: 설정과 창 분할·포커스 이동",
    description: "Ctrl+쉼표의 설정에서 기본 프로필·테마·글꼴·작업 키를 확인하고, Alt+Shift+D로 같은 탭을 나눈 뒤 Alt+방향키로 강조된 패널의 포커스를 옮기는 구조입니다.",
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
