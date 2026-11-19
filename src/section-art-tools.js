import {
  archive, at, box, colors as c, commit, cursor, deck, folder, glow, ink, key,
  label, line, monitor, oval, page, point, route, shape, stage, tag, tick,
} from './tool-art-props.js';

const code = (x, y, value, color = ink, size = 15) => label(x, y, value, { color, size, mono: true, anchor: 'start', weight: 650 });
const terminalInk = '#dfe9d5';
const amberRail = { color: '#99723a', casing: '#ecd6a5', pulse: '#fffae7' };
const blueRail = { color: '#5b7c8a', casing: '#c9d9d7', pulse: '#f2fcf2' };

function locationScene() {
  const id = 'section-terminal-example';
  const command = (y, alias, name) => code(16, y, alias, '#f1d48c', 18) + code(63, y, name, terminalInk);
  return stage(id,
    deck(id, -.4, 3.55, 1.48, 1.12, { fill: '#f1e9ce' })
    + deck(id, 3.65, .02, 1.1, 1.16, { fill: '#e6ead5' })
    + route(id, [[.45,3.55],[.45,2.1],[2.84,2.1],[2.84,.02]], { z: -4 })
    + route(id, [[3.8,.9],[3.8,3.67],[.9,3.67]], { ...blueRail, delay: 1.45, z: -4 })
    + monitor(id, -.4, 3.55, 251, 187, 'PowerShell',
      box(10, 41, 224, 26, '#58685c', 4, 'none') + command(61, 'pwd', '= Get-Location')
      + code(16, 83, 'explorer.exe .', c.ivory)
      + code(16, 105, 'cd .  ·  cd ..', terminalInk)
      + command(129, 'ls', '= Get-ChildItem')
      + code(16, 153, 'mkdir → 빈 폴더 삭제', terminalInk)
      + code(16, 174, '다시 mkdir → cd', terminalInk) + cursor(id, 183, 159), { dark: true, rise: 22 })
    + monitor(id, 3.65, .02, 170, 128, '파일 탐색기',
      box(11, 38, 147, 23, '#e6ebd9', 5, 'none') + code(21, 54, 'C:\\Users', c.green)
      + folder(47, 62, 76, 55, c.honey), { rise: 24 })
    + tag(538, 185, 94, 'Win + R', { mono: true })
    + tag(408, 302, 138, '같은 폴더', { color: '#edf1de' })
    + tag(484, 423, 99, 'wt -d .', { color: c.sage, mono: true, textColor: c.green }));
}

function guiCliScene() {
  const id = 'section-terminal-gui-cli';
  return stage(id,
    deck(id, -.1, 4, 1.19, .9, { fill: '#e8ead6' })
    + deck(id, 2.35, 2.35, .8, .8, { fill: '#f4e6c2' })
    + deck(id, 4, -.1, .96, 1.2, { fill: '#e9ebd6' })
    + route(id, [[.62,4],[2.35,4],[2.35,3.08]], amberRail)
    + route(id, [[2.35,1.62],[2.35,-.1],[3.2,-.1]], { ...blueRail, delay: 1.15 })
    + monitor(id, -.1, 4, 169, 122, 'PowerShell',
      code(15, 57, 'New-Item / ni', c.ivory, 14)
      + code(15, 81, 'Get-Content / cat', '#f1d999', 13)
      + code(15, 105, 'note.txt', terminalInk) + cursor(id, 91, 91), { dark: true })
    + monitor(id, 4, -.1, 169, 122, '메모장',
      code(15, 61, 'Hello, Codex!', c.green)
      + line('M15 75h136', '#a6ac90', 1.15)
      + tag(86, 96, 115, 'Ctrl+S · 저장', { color: c.sage, size: 13 }))
    + page(338, 250, 80, 104, { angle: 4 })
    + tag(382, 370, 103, 'note.txt', { color: '#f8e7c6', mono: true })
    + label(378, 449, '한 파일을 만들고, 저장하고, 다시 읽습니다', { size: 15, color: c.green }));
}

function hostShellScene() {
  const id = 'section-terminal-host-shell';
  const shell = (x, name, executable, prompt, fill, index) => at(x, 43,
    box(0, 0, 142, 99, fill, 7, '#a79d83', 1.4)
    + box(6, 6, 130, 46, c.dark, 5, 'none')
    + code(16, 36, prompt, '#f2d98c', 17)
    + cursor(id, 69, 22, 3, 14)
    + glow(id, 5, 5, 132, 47, index * 1.2)
    + label(71, 72, name, { size: 15, weight: 700 })
    + label(71, 89, executable, { size: 12, mono: true, color: c.green }));
  return stage(id,
    deck(id, 2.3, 2.3, 3.8, 2.13, { fill: '#e9e8cd' })
    + monitor(id, 1.8, 1.8, 475, 152, 'Windows Terminal',
      shell(13, 'PowerShell 7', 'pwsh.exe', 'PS >', '#e7ebd6', 0)
      + shell(166, 'PowerShell 5.1', 'powershell.exe', 'PS >', '#f1e2bf', 1)
      + shell(319, '명령 프롬프트', 'cmd.exe', 'C:\\>', '#e4e7d9', 2))
    + tag(380, 396, 250, 'Windows Terminal이 셸 탭을 엽니다', { color: '#f0efdb', size: 15 }));
}

function shortcutsScene() {
  const id = 'section-terminal-shortcuts';
  const [keyboardX, keyboardY] = point(.75, 4.5);
  return stage(id,
    deck(id, .55, 4.7, 1.35, 1.01, { fill: '#f3e5c3' })
    + deck(id, 3.95, .13, 1.55, 1.43, { fill: '#e5ead4' })
    + route(id, [[1.65,4.7],[3.95,4.7],[3.95,1.3]], { ...amberRail, delay: .45 })
    + at(keyboardX - 91, keyboardY - 49,
      box(-6, -8, 193, 60, '#dac49a', 9, ink, 1.7)
      + key(2, 4, 52, 'Ctrl', true) + key(63, 4, 61, 'Shift', true)
      + key(135, 4, 37, '\\', true))
    + tag(219, 284, 148, '설정 → 작업', { color: '#fbefd4' })
    + monitor(id, 3.95, .13, 238, 154, 'Windows Terminal',
      box(11, 43, 98, 98, '#405750', 5, 'none')
      + box(115, 43, 112, 98, '#334944', 5, 'none')
      + code(22, 75, 'PS >', terminalInk, 18) + code(126, 75, 'PS >', '#f0d58a', 18)
      + cursor(id, 180, 60) + glow(id, 114, 42, 115, 100, .7), { dark: true })
    + tag(550, 408, 164, 'Ctrl + Shift + \\', { mono: true, color: '#e9eed9' })
    + tag(376, 476, 195, 'Ctrl+Alt+방향키 · 이동', { color: '#e9eed9', size: 14 }));
}

function diffScene() {
  const id = 'section-git-example';
  return stage(id,
    deck(id, 2, 2, 2.7, 2.06)
    + folder(253, 218, 249, 128, '#e7bc75',
      page(32, -38, 95, 124, { angle: -6 })
      + page(130, -47, 81, 120, { fill: '#d9e6d1', angle: 8 }))
    + tag(337, 222, 90, 'note.txt', { mono: true })
    + tag(434, 213, 62, '.git', { mono: true, color: c.sage, textColor: c.green })
    + glow(id, 400, 195, 69, 33)
    + tag(378, 300, 141, 'git-practice/', { mono: true, color: '#f8e5b5' })
    + tag(284, 441, 171, 'git init -b main', { mono: true })
    + tag(476, 441, 133, 'ls -Force', { mono: true }));
}

function versionFlowScene() {
  const id = 'section-git-why';
  const [firstX, firstY] = point(.2, 4.45);
  const [midX, midY] = point(1.1, 1);
  const [lastX, lastY] = point(4.7, .65);
  return stage(id,
    deck(id, .2, 4.45, .94, .95)
    + deck(id, 1.1, 1, 1.2, .92, { fill: '#e6ead2' })
    + deck(id, 4.7, .65, 1.05, 1.02, { fill: '#e6ead2' })
    + route(id, [[.2,3.58],[.2,1],[.34,1]], amberRail)
    + route(id, [[2.18,1],[4.7,1],[4.7,.88]], { delay: 1.25 })
    + page(firstX - 43, firstY - 121, 79, 106, { angle: -4 })
    + tag(firstX, firstY - 64, 92, 'note.txt', { mono: true })
    + folder(midX - 62, midY - 87, 118, 77, '#c5d7ba',
      page(33, -22, 55, 70, { angle: 6 }))
    + tick(midX+36, midY-36)
    + commit(lastX, lastY-12, 39, c.sage, true)
    + commit(lastX, lastY-33, 39, c.sage, true)
    + tag(lastX, lastY-107, 107, 'version 1', { color: c.sage, mono: true })
    + label(firstX, 447, '작업 파일', { weight: 700 })
    + label(midX, 381, '스테이징', { weight: 700 })
    + label(lastX, 467, '커밋 기록', { weight: 700 })
    + tag(283, 351, 142, 'git add note.txt', { mono: true, size: 13 })
    + tag(495, 319, 111, 'git commit', { mono: true, size: 13 }));
}

function twoVersionsScene() {
  const id = 'section-git-diff';
  return stage(id,
    deck(id, .25, 3.95, 1.45, 1.35)
    + deck(id, 4, .12, 1.51, 1.24, { fill: '#e7ead4' })
    + deck(id, 3.6, 3.65, 1.65, .77, { fill: '#f1e5c8' })
    + route(id, [[.25,2.76],[.25,1.54],[3.1,1.54],[3.1,.12]], { ...amberRail, delay: .3 })
    + route(id, [[2.9,3.65],[4.45,3.65]], { delay: 1.3 })
    + page(118, 230, 82, 105, { mark: c.rose, angle: -9 })
    + page(211, 207, 93, 116, { fill: '#dce8d0', angle: 7 })
    + tag(159, 287, 69, '버전 1', { color: c.blush })
    + tag(256, 269, 69, '버전 2', { color: c.sage })
    + monitor(id, 4, .12, 203, 128, 'diff',
      box(12, 42, 180, 32, '#f1d5c6', 5, 'none') + code(24, 63, '− 버전 1', c.rose)
      + box(12, 83, 180, 32, '#e0ead4', 5, 'none') + code(24, 104, '+ 버전 2', c.green)
      + glow(id, 11, 81, 182, 36, 1), { rise: 27 })
    + commit(...point(2.56,3.65), 19, c.honey) + commit(...point(4.54,3.65), 20, c.sage, true)
    + label(305, 468, '첫 커밋', { size: 14 })
    + label(427, 511, '두 번째 커밋', { size: 14 }));
}

function promptScene() {
  const id = 'section-git-prompt';
  const down = (x, from, to, color) => line(`M${x} ${from}V${to}m-4-4 4 4 4-4`, color, 2.4);
  const panel = (x, heading, detached) => {
    const previous = x + 72;
    const latest = x + 213;
    const head = detached ? previous : latest;
    const headRow = detached ? 285 : 249;
    return box(x + 8, 193, 282, 216, '#d8c7a3', 13)
      + box(x, 184, 282, 216, c.ivory, 13)
      + label(x + 141, 219, heading, { size: 22, weight: 720 })
      + tag(head, headRow, 66, 'HEAD', { color: '#f5e3b4', size: 17, mono: true })
      + down(head, headRow + 12, detached ? 319 : 267, '#946a29')
      + tag(latest, 285, 66, 'main', { color: c.sage, size: 17, mono: true })
      + down(latest, 297, 319, c.green)
      + line(`M${latest - 25} 343H${previous + 27}m10-5-10 5 10 5`, c.green, 3)
      + commit(previous, 347, 21, '#e8c584')
      + commit(latest, 347, 21, c.sage)
      + label(previous, 375, '버전 1', { size: 17 })
      + label(latest, 375, '버전 2', { size: 17 });
  };
  return stage(id,
    label(380, 99, '이전 기록에 다녀오기', { size: 29, weight: 720 })
    + tag(380, 148, 173, 'git switch main', { color: c.sage, size: 17, mono: true })
    + panel(69, '이전 버전 보기', true)
    + panel(409, 'main으로 돌아온 뒤', false)
    + line('M367 343h26m-8-6 8 6-8 6', c.green, 3.5)
    + glow(id, 586, 233, 72, 27, 1.2)
    + label(380, 466, 'main이 가리키는 버전 2는 두 화면에 모두 남아 있습니다', { size: 20 }));
}

function branchMergeScene() {
  const id = 'section-git-branch';
  const mainPath = 'M146 229H600';
  const branchPath = 'M146 229L301 318H445L600 229';
  const rail = (d, casing, tint, pulse, delay) => line(d, casing, 16)
    + line(d, tint, 3.6)
    + line(d, pulse, 5, `class="art-motion ${id}-flow" pathLength="100" stroke-dasharray="6 94" opacity="0" style="animation-delay:${delay}s"`);
  return stage(id,
    label(380, 88, '브랜치에서 작업하고 main에 합치기', { size: 28, weight: 720 })
    + box(74, 136, 632, 277, '#d8c7a3', 15)
    + box(65, 127, 632, 277, c.ivory, 15)
    + rail(mainPath, '#d9e6d5', '#4d7a65', '#fcfff3', 1.15)
    + rail(branchPath, '#f0dfb5', '#9b7137', '#fff9e6', .35)
    + line('M458 221l13 8-13 8', '#4d7a65', 3.6)
    + line('M258 282l10 17-20-2M501 276l20-2-9 17', '#9b7137', 3.6)
    + commit(146, 229, 34, '#e8c584')
    + commit(373, 318, 35, '#edca8d')
    + commit(600, 229, 36, c.sage, true)
    + label(146, 170, '기존 커밋', { size: 20 })
    + tag(373, 198, 68, 'main', { color: c.sage, mono: true, size: 18 })
    + label(600, 170, '병합 커밋', { size: 20 })
    + tag(373, 264, 173, 'practice-branch', { color: '#f5e5ba', mono: true, size: 17 })
    + label(373, 374, 'branch-note.txt 커밋', { mono: true, size: 18 })
    + tag(380, 453, 193, 'git merge --no-ff', { color: c.sage, mono: true, size: 17 })
    + label(380, 499, 'main에서 두 갈래의 작업을 하나로 합칩니다', { size: 20 }));
}

function cloneScene() {
  const id = 'section-github-clone';
  return stage(id,
    label(186, 152, '내 컴퓨터 · 로컬 저장소', { size: 16, weight: 720 })
    + deck(id, -.15, 4.45, 1.37, 1.14, { fill: '#f0e4c5' })
    + deck(id, 4.4, -.34, 1.31, 1.2, { fill: '#e0e7cc' })
    + route(id, [[.87,4.45],[2.44,4.45],[2.44,-.34],[3.62,-.34]], { delay: .3, z: -7 })
    + route(id, [[4.43,.66],[4.43,4.91],[.79,4.91],[.79,4.68]], { ...blueRail, delay: 1.4, z: -6 })
    + monitor(id, -.15, 4.45, 171, 133, 'git-practice',
      folder(37, 44, 94, 76) + tag(86, 90, 75, 'note.txt', { mono: true, size: 13 }))
    + label(566, 181, 'GitHub · 원격 저장소', { size: 16, weight: 720 })
    + archive(id, 4.4, -.34)
    + commit(...point(4.52,-.25,103), 27, c.sage, true)
    + tag(308, 380, 66, 'push', { mono: true, color: '#e8edd6', textColor: c.green })
    + tag(461, 454, 71, 'fetch', { mono: true, color: '#e3ece4', textColor: '#496977' })
    + tag(381, 523, 205, 'origin = 원격 주소 별칭', { size: 14, color: c.sage }));
}

function remoteRolesScene() {
  const id = 'section-github-roles';
  return stage(id,
    label(219, 165, 'GitHub · 원격 저장소', { size: 17, weight: 700 })
    + deck(id, -.52, 3.4, 1.25, 1.13, { fill: '#e5ead3' })
    + deck(id, 4.15, .1, 1.9, 1.18, { fill: '#f4e8ca' })
    + route(id, [[.47,3.4],[3.12,3.4],[3.12,1.38]], { delay: .5 })
    + archive(id, -.52, 3.4)
    + tag(341, 382, 103, 'git clone', { mono: true, color: c.sage })
    + label(543, 187, '내 컴퓨터 · 사용자 홈', { size: 17, weight: 700 })
    + folder(529, 220, 109, 79, '#cbb795')
    + label(600, 273, '원래 폴더', { size: 13 })
    + folder(466, 275, 135, 78, c.honey,
      page(44, -18, 62, 76, { angle: -5, fill: c.ivory }))
    + tag(530, 324, 90, 'note.txt', { mono: true, size: 14 })
    + tag(547, 425, 199, '~/git-practice-clone', { mono: true, size: 14 })
    + label(547, 460, 'origin = 원격 주소 별칭', { size: 14, color: c.green }));
}

function pipeScene() {
  const id = 'section-terminal-bonus';
  return stage(id,
    deck(id, .25, 4.15, .99, .98)
    + deck(id, 4.05, -.1, 1.27, 1.14, { fill: '#e5ead4' })
    + route(id, [[1.05,4.15],[2.4,4.15],[2.4,-.1],[3.23,-.1]], { ...amberRail, z: -7 })
    + page(155, 227, 83, 108, { angle: -7 })
    + page(187, 248, 82, 102, { angle: 7, fill: '#e3ecd5' })
    + tag(221, 398, 124, 'ls · 파일 목록', { size: 15 })
    + tag(475, 158, 378, 'Get-ChildItem -File | Select-Object Name', { color: '#e4ebd4', mono: true, size: 14 })
    + archive(id, 4.05, -.1, '파일 이름')
    + tag(553, 305, 101, 'note.txt', { mono: true, size: 14 })
    + tag(553, 335, 103, 'README.md', { mono: true, size: 14 })
    + tag(555, 409, 142, 'select · 이름만', { color: c.sage }));
}

function vscodeSetupScene() {
  const id = 'section-tools-vscode-setup';
  const download = point(.35, 4.65);
  const end = point(4.95, .6);
  return stage(id,
    deck(id, .35, 4.65, 1.04, .94)
    + deck(id, .85, .82, 1.28, 1.16, { fill: '#e7ead3' })
    + deck(id, 4.95, .6, 1.22, 1.13)
    + route(id, [[.35,3.69],[.35,1.76],[.85,1.76]], blueRail)
    + route(id, [[1.85,.82],[3.9,.82]], { ...amberRail, delay: 1.2 })
    + page(download[0]-35, download[1]-101, 70, 94, { angle: -6 })
    + at(download[0], download[1]-72, oval(0, 0, 21, 19, '#e3ecd4', '#77947b', 1.5)
      + line('M0-10v18m-7-7L0 8 7 1', c.green, 2.8))
    + label(download[0], 450, '공식 다운로드', { size: 16, weight: 690 })
    + monitor(id, .85, .82, 197, 129, 'Windows',
      box(13, 48, 170, 40, '#e3ead4', 5, 'none') + tick(32, 67, .8)
      + label(110, 73, 'User Setup 설치', { size: 15, weight: 700 })
      + glow(id, 12, 47, 172, 42, .5)
      + line('M19 106h63m8 0h43', '#8fa08a', 2.5), { rise: 22 })
    + folder(end[0]-63, end[1]-92, 125, 83, c.honey,
      page(38, -22, 67, 85, { angle: 7 }))
    + tag(end[0], end[1]-36, 104, 'README.md', { mono: true, size: 14 })
    + tag(end[0], end[1]+52, 146, 'git-practice', { mono: true, size: 14 }));
}

function errorReportScene() {
  const id = 'section-git-bonus';
  const rows = [['폴더', 'git-practice'], ['브랜치', 'main'], ['명령', 'git push'], ['오류', '오류 원문 함께 보기'], ['내 수정', 'note.txt 보존']];
  return stage(id,
    deck(id, 1.84, 1.8, 2.7, 1.65)
    + deck(id, 4.75, 1.44, .89, .95, { fill: '#e6ead4' })
    + route(id, [[2.9,1.8],[4.75,1.8],[4.75,1.44]], { delay: 1.5 })
    + at(203, 128, box(7, 4, 264, 228, '#bba77e', 10, ink, 1.9)
      + box(0, 0, 264, 227, '#d6c091', 10)
      + box(10, 12, 244, 204, c.ivory, 6, '#968568', 1.6)
      + box(72, -9, 120, 29, '#c0d2b7', 6, ink, 1.9)
      + label(132, 10, '동기화 오류 보고', { size: 14, weight: 730 })
      + rows.map(([heading, example], index) => {
        const y = 53 + index * 34;
        return box(26, y - 11, 12, 12, c.sage, 2, '#8fa08c', 1.15) + tick(32, y-5, .38)
          + label(46, y, heading, { size: 14, anchor: 'start', color: c.green, weight: 690 })
          + label(107, y, example, { size: 14, anchor: 'start', mono: index < 3 });
      }).join('')
      + glow(id, 20, 135, 219, 30))
    + at(529, 356,
      shape('M-35-34 0-55 42-38v42Q39 27 2 47L0 54q-34-12-35-37Z', '#9bae94')
      + shape('M-39-34-4-53 33-36V8Q30 31-4 51-36 32-39 9Z', '#e0ead4')
      + box(-15, -7, 23, 18, c.honey, 4) + line('M-10-7v-5a6 6 0 0 1 12 0v5', ink, 2.3)
      + oval(-4, 2, 2, 2, ink, 'none'))
    + tag(525, 463, 171, '비밀번호 · 토큰 제외', { color: c.sage, size: 14 }));
}

export const toolSectionScenes = {
  'tools-vscode-setup': {
    title:'VS Code 설치와 기본 설정',
    description:'공식 Windows 다운로드에서 User Setup 설치 파일을 받고 옵션을 확인해 설치한 뒤, 원래 작업 폴더인 git-practice를 열어 같은 README.md를 확인합니다.',
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
