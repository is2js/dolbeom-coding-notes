import {
  archive, at, box, colors as c, cursor, flow, glow, ink, key, label, line,
  monitor, oval, page, platform, pocket, shadow, shape, spool, stage, tag, tick,
} from './tool-art-props.js';

const code = (x, y, value, color = ink, size = 16) => label(x, y, value, { color, size, mono: true, anchor: 'start', weight: 650 });

function locationScene() {
  const id = 'section-terminal-example';
  const command = (y, short, long) => code(103, y, short, '#f0d58d', 18) + code(147, y, long, '#d7e5d3', 15);
  const fileBrowser = box(513, 197, 138, 26, '#e2ead9', 5, 'none') + code(526, 216, 'C:\\Users', c.green)
    + pocket(535, 232, 89, 57, '#e4bc77');
  return stage(id,
    platform(id, 210, 357, 153, 51) + platform(id, 583, 352, 129, 52)
    + flow(id, 'M340 207C394 178 452 181 492 208')
    + flow(id, 'M516 345C463 391 374 390 330 342', { color: '#688897', pulse: '#97c3c1', delay: 1.35 })
    + monitor(id, 75, 132, 262, 213, 'PowerShell', box(91, 174, 224, 28, '#596a56', 5, 'none')
      + command(194, 'pwd', '= Get-Location') + code(103, 221, 'explorer.exe .', c.ivory)
      + code(103, 245, 'cd .  ·  cd ..', '#d7e5d3', 15) + command(270, 'ls', '= Get-ChildItem')
      + code(103, 295, 'mkdir → 빈 폴더 삭제', '#d7e5d3', 15)
      + code(103, 320, '다시 mkdir → cd', '#d7e5d3', 15) + cursor(id, 256, 306), { dark: true, stand: true })
    + monitor(id, 497, 156, 172, 147, '파일 탐색기', fileBrowser, { stand: true })
    + tag(583, 124, 111, 'Win + R', { mono: true })
    + tag(582, 365, 104, 'wt -d .', { color: c.sage, mono: true, textColor: c.green })
    + tag(413, 176, 165, '같은 폴더 · 두 화면', { size: 15 }));
}

function guiCliScene() {
  const id = 'section-terminal-gui-cli';
  return stage(id,
    platform(id, 168, 341, 107, 44) + platform(id, 593, 336, 102, 42)
    + platform(id, 378, 305, 91, 55, '#efe4ca')
    + flow(id, 'M260 237c32-5 49 3 67 20')
    + flow(id, 'M436 255c21-19 37-24 55-19', { delay: 1 })
    + flow(id, 'M548 375C452 436 296 431 198 375', { color: '#678896', pulse: '#9dc5c0', delay: 2.05 })
    + monitor(id, 56, 153, 197, 162, 'PowerShell', code(76, 216, 'New-Item / ni', c.ivory)
      + code(76, 248, 'Get-Content / cat', '#e6cf93', 15) + code(76, 278, 'note.txt', c.ivory) + cursor(id, 157, 265), { dark: true, stand: true })
    + page(341, 193, 80, 108, { surface: c.ivory, angle: -11 })
    + tag(379, 323, 119, 'note.txt', { mono: true, color: c.sage, textColor: c.green })
    + monitor(id, 502, 150, 191, 156, '메모장', code(522, 216, 'Hello, Codex!', c.green, 16)
      + line('M521 233h133', '#abae92', 1.5) + tag(596, 266, 111, 'Ctrl+S · 저장', { color: c.sage }), { stand: true }));
}

function hostShellScene() {
  const id = 'section-terminal-host-shell';
  const shells = [
    { x: 124, y: 211, fill: '#e4ead8', name: 'PowerShell 7', executable: 'pwsh.exe', prompt: 'PS >' },
    { x: 295, y: 214, fill: '#f2e4c6', name: 'PowerShell 5.1', executable: 'powershell.exe', prompt: 'PS >' },
    { x: 466, y: 211, fill: '#eadde8', name: '명령 프롬프트', executable: 'cmd.exe', prompt: 'C:\\>' },
  ];
  return stage(id,
    shadow(id, 381, 400, 270, 28)
    + shape('M107 173h544l34 53v128l-33 35H106l-26-31V226Z', '#d1bd93')
    + shape('M80 221l29-48h541l35 48-27 120H106Z', `url(#${id}-linen)`)
    + box(107, 212, 547, 132, '#d2d2b5', 15, '#938e72', 2)
    + tag(378, 172, 177, 'Windows Terminal', { color: c.sage, mono: true })
    + shells.map(({ x, y, fill, name, executable, prompt }, index) => box(x + 4, y + 7, 157, 125, '#a7a086', 9)
      + box(x, y, 157, 125, fill, 8)
      + box(x + 10, y + 15, 137, 63, c.dark, 5, 'none')
      + code(x + 22, y + 46, prompt, '#f3e1af', 22)
      + cursor(id, x + 83, y + 29)
      + label(x + 78, y + 100, name, { size: 16, weight: 720 })
      + label(x + 78, y + 119, executable, { size: 12, mono: true, color: c.green })
      + glow(id, x + 5, y + 10, 147, 73, index * 1.35)).join('')
    + line('M98 359h573', '#eee6c9', 2)
    + label(379, 375, '하나의 창 · 세 가지 셸', { size: 15, color: c.green, weight: 680 }));
}

function shortcutsScene() {
  const id = 'section-terminal-shortcuts';
  return stage(id,
    platform(id, 189, 355, 133, 56) + platform(id, 557, 350, 143, 52)
    + flow(id, 'M312 298C357 265 380 253 421 245', { delay: .6 })
    + at(185, 285, shape('M-100-23h195l31 70-243 10Z', '#b6a07b')
      + shape('M-100-33h195l31 65-243 10Z', `url(#${id}-linen)`)
      + key(-82, -20, 52, 'Ctrl', true) + key(-21, -20, 43, ',')
      + key(32, -20, 52, 'Alt') + box(-66, 18, 130, 16, '#f1e5cd', 5, '#a99879', 1.4))
    + tag(185, 218, 131, '작업 설정', { size: 16 })
    + monitor(id, 427, 143, 251, 180, '터미널 · 오른쪽 분할',
      box(439, 187, 106, 108, '#344b46', 4, 'none')
      + box(552, 187, 113, 108, '#3c5149', 4, 'none')
      + code(452, 222, 'PS >', '#f7e1a2', 21)
      + code(563, 222, 'PS >', '#e0e9d1', 21)
      + cursor(id, 612, 206)
      + glow(id, 549, 184, 119, 114, 1.2), { stand: true })
    + tag(555, 373, 156, 'Ctrl + Shift + \\', { color: c.ivory, mono: true })
    + tag(384, 410, 183, 'Ctrl+Alt+방향키 · 이동', { color: c.sage, size: 14 }));
}

function diffScene() {
  const id = 'section-git-example';
  return stage(id,
    platform(id, 376, 338, 229, 84)
    + shape('M194 203l21-31h90l26 22h212l17 142-359 9Z', '#cfad73')
    + page(232, 173, 105, 137, { surface: c.ivory, angle: -16 })
    + page(395, 166, 105, 131, { surface: c.sage, angle: 11 })
    + shape('M185 254q5-15 19-15h347q14 0 18 16l-33 96q-4 8-13 8H217q-13 0-17-10Z', '#d6a45e')
    + shape('M188 254l373 1-23 70q-4 10-17 11H216q-17 0-20-12Z', '#e9bf7d')
    + line('M205 260h339', '#fff0c4', 2.5)
    + tag(377, 294, 132, 'git-practice/', { mono: true, color: '#f3daa0' })
    + tag(282, 218, 109, 'note.txt', { mono: true })
    + tag(451, 207, 70, '.git', { mono: true, color: c.sage, textColor: c.green })
    + glow(id, 408, 186, 86, 45)
    + tag(270, 417, 171, 'git init -b main', { mono: true })
    + tag(490, 417, 137, 'ls -Force', { mono: true }));
}

function versionFlowScene() {
  const id = 'section-git-why';
  return stage(id,
    platform(id, 137, 308, 100, 50) + platform(id, 379, 307, 107, 52) + platform(id, 619, 306, 99, 47)
    + flow(id, 'M220 253C248 240 265 246 291 259')
    + flow(id, 'M471 258c23-13 47-15 65-5', { delay: 1.4 })
    + page(98, 172, 79, 116, { surface: c.ivory, angle: -12 })
    + tag(138, 302, 104, 'note.txt', { mono: true })
    + at(379, 256, shape('M-65-1l29-22h115l-25 22Z', '#f9efd4')
      + shape('M-65-1v41H54l25-21v-42L54-1Z', '#9aab91')
      + box(-65, -1, 119, 41, c.sage, 6) + box(-45, 11, 77, 11, '#708d76', 4, 'none'))
    + page(355, 168, 64, 103, { surface: '#dfe9d5', angle: 9 })
    + tick(430, 268)
    + spool(617, 249, 43, c.sage) + spool(617, 230, 43, c.sage)
    + tag(617, 308, 115, 'version 1', { color: c.sage, mono: true })
    + label(138, 393, '작업 파일', { weight: 720 })
    + label(379, 393, '스테이징', { weight: 720 })
    + label(619, 393, '커밋 기록', { weight: 720 })
    + tag(254, 318, 151, 'git add note.txt', { mono: true, size: 13 })
    + tag(511, 321, 119, 'git commit', { mono: true, size: 13 }));
}

function twoVersionsScene() {
  const id = 'section-git-diff';
  return stage(id,
    platform(id, 220, 329, 148, 66) + platform(id, 550, 327, 134, 54)
    + flow(id, 'M340 236C369 210 391 216 423 234')
    + page(112, 185, 117, 157, { surface: c.ivory, mark: c.rose, angle: -18 })
    + page(205, 153, 126, 163, { surface: '#e4edd9', angle: 15 })
    + tag(155, 277, 75, '버전 1', { color: c.blush })
    + tag(272, 248, 76, '버전 2', { color: c.sage })
    + monitor(id, 439, 164, 210, 145, 'diff',
      box(455, 204, 177, 33, '#f0d5c6', 4, 'none') + code(468, 226, '− 버전 1', c.rose)
      + box(455, 248, 177, 33, '#dae8d3', 4, 'none') + code(468, 270, '+ 버전 2', c.green)
      + glow(id, 453, 246, 182, 37, 1.3), { stand: true })
    + flow(id, 'M268 403c55 15 128 15 193 0', { color: '#799682', delay: 2 })
    + spool(251, 396, 17, c.honey) + spool(480, 395, 17, c.sage)
    + label(251, 444, '첫 커밋', { size: 15 }) + label(480, 444, '두 번째 커밋', { size: 15 }));
}

function promptScene() {
  const id = 'section-git-prompt';
  return stage(id,
    platform(id, 383, 324, 282, 85, '#f3e7c9')
    + line('M186 283c68 42 310 42 382 0', '#93a58e', 4)
    + flow(id, 'M211 245C307 173 457 177 544 245', { color: '#6c9385', delay: .5 })
    + spool(182, 280, 48, c.honey) + spool(575, 280, 48, c.sage)
    + line('M182 248v-48M575 248v-48', ink, 2.4)
    + tag(182, 183, 89, 'HEAD', { color: '#eed6a1', mono: true })
    + tag(575, 183, 89, 'main', { color: c.sage, mono: true })
    + label(185, 348, '버전 1 커밋', { size: 16 })
    + label(575, 348, '버전 2 커밋', { size: 16 })
    + tag(383, 438, 176, 'git switch main', { color: c.ivory, mono: true }));
}

function branchMergeScene() {
  const id = 'section-git-branch';
  return stage(id,
    platform(id, 379, 304, 301, 115, '#f1e5c7')
    + line('M198 291c125 9 256 2 371-8', '#dcd0ac', 12)
    + line('M201 294c56 22 115 63 173 62 59 0 130-37 192-72', '#ddd0af', 12)
    + flow(id, 'M215 291c122 9 239 2 326-6', { color: '#779682', pulse: '#c5ce9c' })
    + flow(id, 'M216 304c44 21 85 44 130 50', { color: '#819883', delay: .55 })
    + flow(id, 'M402 353c48-8 91-35 138-58', { color: '#819883', delay: 1.5 })
    + spool(190, 287, 30, c.honey) + spool(374, 351, 27, c.sage) + spool(568, 279, 37, '#a4c3a7')
    + label(185, 253, '기존 커밋', { size: 15 })
    + label(567, 241, '병합 커밋', { size: 16, weight: 720 })
    + line('M568 226v-17', ink, 2) + tag(568, 196, 81, 'main', { mono: true, color: c.sage })
    + tag(367, 390, 170, 'branch-note.txt 커밋', { size: 14, mono: true })
    + tag(371, 324, 147, 'practice-branch', { mono: true, size: 14 })
    + tag(381, 471, 187, 'git merge --no-ff', { mono: true, color: '#dfedda' }));
}

function cloneScene() {
  const id = 'section-github-clone';
  return stage(id,
    platform(id, 184, 328, 135, 61) + platform(id, 572, 332, 128, 59)
    + label(178, 132, '내 컴퓨터 · 로컬 저장소', { size: 16, weight: 690 })
    + monitor(id, 87, 161, 188, 131, 'git-practice', pocket(122, 216, 116, 53, '#e6bc74')
      + tag(181, 244, 80, 'note.txt', { size: 13, mono: true }), { stand: true })
    + tag(180, 384, 198, 'origin = 원격 주소 별칭', { size: 14, color: c.sage })
    + flow(id, 'M296 226C361 200 408 200 475 227')
    + label(388, 195, 'push', { size: 16, mono: true, color: c.green, weight: 720 })
    + flow(id, 'M470 282C409 311 356 311 299 284', { color: '#658b98', pulse: '#98c9cb', delay: 1.35 })
    + label(384, 331, 'fetch', { size: 16, mono: true, color: '#597c88', weight: 720 })
    + label(571, 130, 'GitHub · 원격 저장소', { size: 16, weight: 690 })
    + archive(id, 497, 172)
    + spool(560, 209, 24, c.sage)
    + tag(569, 384, 130, '커밋 기록', { color: c.ivory }));
}

function remoteRolesScene() {
  const id = 'section-github-roles';
  return stage(id,
    label(184, 149, 'GitHub · 원격 저장소', { size: 17, weight: 700 })
    + archive(id, 107, 191, '#aec7ac')
    + flow(id, 'M286 259C345 220 392 226 451 256', { delay: .45 })
    + tag(371, 215, 110, 'git clone', { mono: true, color: c.sage })
    + label(554, 144, '내 컴퓨터 · 사용자 홈', { size: 17, weight: 700 })
    + platform(id, 552, 338, 151, 64)
    + pocket(510, 196, 115, 93, '#cfc0a0') + label(566, 267, '원래 폴더', { size: 14 })
    + pocket(463, 251, 172, 95, '#e6ba72', page(70, -15, 64, 79, { surface: c.ivory, angle: -9 }))
    + tag(548, 317, 83, 'note.txt', { mono: true, size: 13 })
    + tag(552, 395, 210, '~/git-practice-clone', { mono: true, size: 15 })
    + label(552, 428, 'origin = 원격 주소 별칭', { size: 14, color: c.green }));
}

function pipeScene() {
  const id = 'section-terminal-bonus';
  return stage(id,
    tag(380, 129, 407, 'Get-ChildItem -File | Select-Object Name', { color: c.sage, mono: true })
    + platform(id, 168, 329, 100, 43) + platform(id, 590, 328, 116, 45)
    + shadow(id, 376, 339, 100, 17)
    + shape('M244 265h67q64 0 64 42h124v32H374q-28 0-32-21-3-19-32-19h-66Z', '#d4a65d')
    + line('M248 270h64q62 0 62 45h121', '#f5d798', 3.5)
    + flow(id, 'M257 283h56q43 0 45 29 4 13 21 13h109', { color: '#657e65', delay: .4 })
    + page(117, 189, 80, 112, { angle: -18 })
    + page(145, 207, 81, 117, { angle: 12, surface: '#dce7d3' })
    + tag(171, 352, 119, 'ls · 파일 목록', { size: 15 })
    + box(518, 232, 149, 37, c.ivory, 7, '#9c9b7e', 1.5)
    + box(518, 278, 149, 37, c.ivory, 7, '#9c9b7e', 1.5)
    + label(592, 256, 'note.txt', { mono: true, size: 16 })
    + label(592, 302, 'README.md', { mono: true, size: 16 })
    + tag(592, 352, 135, 'select · 이름만', { color: c.sage, size: 15 }));
}

function vscodeSetupScene() {
  const id = 'section-tools-vscode-setup';
  return stage(id,
    platform(id, 125, 315, 85, 42) + platform(id, 379, 328, 119, 50) + platform(id, 627, 312, 94, 42)
    + flow(id, 'M201 241c23-18 49-20 77-10')
    + flow(id, 'M484 242c30-13 57-12 81 0', { delay: 1.6 })
    + page(86, 193, 77, 116, { surface: c.ivory, angle: -9 })
    + line('M124 185v-23m-12 13 12 12 12-12', c.green, 4)
    + label(126, 367, '공식 다운로드', { size: 16, weight: 680 })
    + monitor(id, 286, 174, 188, 133, 'Windows', box(306, 220, 147, 42, '#e2ead7', 5, 'none')
      + tick(328, 242, .85) + label(392, 248, 'User Setup 설치', { size: 15, weight: 700 })
      + glow(id, 302, 216, 156, 51, 1), { stand: true })
    + pocket(569, 220, 116, 91, '#dfb672', page(47, -19, 62, 87, { surface: c.ivory, angle: 10 }))
    + tag(628, 273, 95, 'README.md', { mono: true, size: 13 })
    + label(628, 364, 'git-practice-clone', { mono: true, size: 14, weight: 680 }));
}

function errorReportScene() {
  const id = 'section-git-bonus';
  const rows = [['폴더', 'git-practice'], ['브랜치', 'main'], ['명령', 'git push'], ['오류', '오류 원문 함께 보기'], ['내 수정', 'note.txt 보존']];
  return stage(id,
    platform(id, 407, 376, 239, 88, '#f1e0ba')
    + at(221, 146, box(5, 8, 277, 241, '#aa9872', 13)
      + box(0, 0, 277, 241, '#d4b685', 13)
      + box(12, 13, 254, 215, c.ivory, 8)
      + box(77, -11, 122, 27, '#aebca4', 6)
      + label(138, 7, '동기화 오류 보고', { size: 14, weight: 720 })
      + rows.map(([heading, example], index) => {
        const y = 57 + index * 35;
        return box(27, y - 11, 11, 11, c.sage, 2, '#8fa08c', 1.2) + label(49, y, heading, { size: 14, anchor: 'start', color: c.green, weight: 660 })
          + label(137, y, example, { size: 14, anchor: 'start', mono: index < 3 });
      }).join(''))
    + glow(id, 242, 296, 229, 31)
    + at(581, 325, shape('M0-55 43-30v45Q39 46 0 64-40 46-43 15v-45Z', '#91a88d')
      + shape('M0-59 37-38v47Q32 32 0 50-33 32-37 9v-47Z', '#d9e7d1')
      + box(-12, -5, 24, 18, c.honey, 4) + line('M-7-5v-6a7 7 0 0 1 14 0v6', ink, 2.3)
      + oval(0, 4, 2, 2, ink, 'none'))
    + tag(568, 403, 168, '비밀번호 · 토큰 제외', { color: c.sage, size: 14 }));
}


export const toolSectionScenes = {
  'tools-vscode-setup': {
    title:'VS Code 설치와 기본 설정',
    description:'공식 Windows 다운로드에서 User Setup 설치 파일을 받고 옵션을 확인해 설치한 뒤, 앞에서 업데이트한 git-practice-clone 폴더를 열어 같은 README.md를 확인합니다.',
    svg:vscodeSetupScene(),
  },
  'terminal-example': {
    title:'첫 명령: 현재 위치와 폴더를 오가며 연습하기',
    description:'PowerShell에서 pwd(Get-Location의 별칭)로 현재 위치를 확인하고 Win+R이나 explorer.exe .으로 같은 폴더를 엽니다. cd .과 cd ..로 현재와 부모 폴더를 살펴보고 ls로 목록을 확인합니다. mkdir로 만든 빈 연습 폴더를 삭제하고 다시 만든 후 cd로 들어갑니다. 탐색기 주소창의 wt -d .으로 해당 위치에서 Windows Terminal을 엽니다.',
    svg:locationScene(),
  },
  'terminal-gui-cli': {
    title:'GUI와 CLI 연결: 같은 메모 파일 만들고 확인하기',
    description:'앞에서 만든 연습 폴더의 note.txt를 PowerShell에서 만들고 메모장에서 내용을 입력해 저장한 뒤, 탐색기와 Windows에서 쓰는 PowerShell의 Get-Content 또는 그 기본 별칭 cat으로 같은 파일을 확인합니다.',
    svg:guiCliScene(),
  },
  'terminal-host-shell': {
    title:'Windows Terminal과 PowerShell·cmd의 관계',
    description:'Windows Terminal 호스트 안의 탭별 프로필에서 PowerShell 7의 pwsh.exe, Windows PowerShell 5.1의 powershell.exe, 명령 프롬프트의 cmd.exe를 구분합니다.',
    svg:hostShellScene(),
  },
  'terminal-shortcuts': {
    title:'단축키 연습: 설정과 창 분할·포커스 이동',
    description:'Ctrl+쉼표로 작업 설정에서 기본 단축키와 강사 단축키를 비교합니다. 강사의 Ctrl+Shift+백슬래시로 오른쪽 분할한 뒤 Ctrl+Alt+방향키로 강조된 창의 포커스를 옮기는 예시입니다.',
    svg:shortcutsScene(),
  },
  'git-example': {
    title:'Git 시작하기: 연습 폴더와 .git 살펴보기',
    description:'터미널에서 만든 git-practice 폴더의 note.txt를 계속 사용하며 Git 기록과 설정을 보관하는 숨김 .git 폴더를 구분합니다. git init -b main으로 저장소를 만들고 PowerShell의 ls -Force로 .git를 확인하며 내부 파일은 직접 고치지 않습니다.',
    svg:diffScene(),
  },
  'git-why': {
    title:'첫 커밋: 작업 파일·스테이징·기록 구분하기',
    description:'note.txt에 저장한 version 1을 git add로 다음 기록에 넣도록 선택한 뒤 git commit으로 그 시점의 상태를 기록합니다. 작업 파일, 스테이징, 커밋을 각각 다른 공간으로 보여 줍니다.',
    svg:versionFlowScene(),
  },
  'git-diff': {
    title:'두 번째 커밋: 변경 비교와 버전 2 기록하기',
    description:'기록한 note.txt의 버전 1과 수정한 버전 2 사이의 차이를 diff로 읽고, 확인한 버전 2를 새 커밋으로 남겨 두 기록을 확인합니다.',
    svg:twoVersionsScene(),
  },
  'git-prompt': {
    title:'이전 기록에 다녀오기: 확인하고 현재로 돌아오기',
    description:'main은 최신 버전 2 커밋을 가리킨 채 HEAD가 이전 버전 1 커밋을 직접 확인하는 상태입니다. 이전 기록을 읽은 뒤 git switch main으로 HEAD를 원래 브랜치로 돌려 최신 파일을 확인하며 두 커밋은 그대로 유지됩니다.',
    svg:promptScene(),
  },
  'git-branch': {
    title:'브랜치에서 수정하고 main에 합치기',
    description:'기존 커밋에서 practice-branch를 만들고 branch-note.txt를 추가해 커밋합니다. main에서 --no-ff로 병합하면 기존 main 커밋과 브랜치 커밋을 부모로 가진 병합 커밋이 생기며, main은 병합 커밋을, practice-branch는 원래 브랜치 커밋을 가리킵니다. 일반 병합은 상황에 따라 fast-forward로 병합 커밋 없이 진행될 수 있습니다.',
    svg:branchMergeScene(),
  },
  'github-clone': {
    title:'내 메모 저장소를 GitHub에 올리기',
    description:'내 컴퓨터 Git 설정의 origin은 GitHub 원격 주소를 가리키는 별칭입니다. push는 로컬 커밋을 GitHub로 보내고, fetch는 원격 기록을 로컬 Git으로 가져오되 작업 파일을 자동으로 바꾸지 않습니다.',
    svg:cloneScene(),
  },
  'github-roles': {
    title:'다른 폴더에서 내 저장소를 다시 clone하기',
    description:'GitHub 원격 저장소를 사용자 홈 바로 아래 새 폴더 git-practice-clone으로 clone해 note.txt와 커밋 기록을 복제합니다. 원래 git-practice 폴더와 나란히 놓이며 origin은 원격 주소의 별칭입니다.',
    svg:remoteRolesScene(),
  },
  'terminal-bonus': {
    title:'보충 노트: 파이프와 명령을 읽는 방법',
    description:'PowerShell의 Get-ChildItem -File 결과가 파이프를 통해 Select-Object Name으로 전달되어 파일 이름을 보여 줍니다. ls와 select는 이 환경의 기본 별칭입니다.',
    svg:pipeScene(),
  },
  'git-bonus': {
    title:'보충: 오류 보고에 넣을 다섯 줄',
    description:'현재 폴더와 브랜치, 실행한 명령, 오류 전문과 보존할 수정 내용을 다섯 줄로 정리한 가상 보고서입니다. 토큰과 비밀번호는 지우고 공유합니다.',
    svg:errorReportScene(),
  },
};
