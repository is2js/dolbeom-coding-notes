import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isShellLanguage, looksLikeCommand, commandUnits } from '../src/command-copy-units.js';

test('shell aliases are explicit while programming languages remain whole code examples', () => {
  for (const language of ['powershell', 'PS1', ' pwsh ', 'sh', 'bash', 'zsh', 'shell', 'cmd', 'bat', 'batch', 'console', 'shell-session']) assert.equal(isShellLanguage(language), true, language);
  for (const language of ['', 'text', 'html', 'css', 'javascript', 'python', 'markdown', 'http', 'diff']) assert.equal(isShellLanguage(language), false, language);
  for (const language of ['html', 'css', 'javascript', 'python', 'markdown', 'http', 'diff']) assert.deepEqual(commandUnits('pwd\nls', language), [], language);
});

test('inline commands include standard aliases, full cmdlets, paths, and platform equivalents', () => {
  const commands = ['pwd', 'ls -Force', 'cd ..', 'mkdir dolbeom-demo', 'ni -ItemType File -Path .\\memo.txt', 'Get-Location', 'Get-ChildItem -File | Select-Object Name', 'Test-Path .\\memo.txt', '$PSVersionTable.PSVersion', 'wt -d .', 'explorer.exe .', 'notepad.exe .\\memo.txt', 'start .', 'open .', 'cat memo.txt', 'type memo.txt', 'dir /b', 'git diff --cached -- index.html', 'gh workflow run pages.yml', 'winget install --id Microsoft.PowerShell', 'python -m venv .venv', '.\\.venv\\Scripts\\python.exe -m uvicorn main:app', 'test -e memo.txt && echo exists', 'if exist memo.txt echo exists', 'git commit -m "한글 메시지"', 'pwd # 같은 PowerShell 명령: Get-Location'];
  for (const command of commands) assert.equal(looksLikeCommand(command), true, command);
});

test('inline filenames, options, output, prose, shortcuts, and template syntax are not commands', () => {
  const examples = ['C:\\work', 'memo.txt', 'README.md', '.venv', '-LiteralPath', '-d', 'True', 'False', 'File', 'GET /lessons', '<h1>Git</h1>', '{{ lesson.title }}', 'p-6 rounded-xl bg-white', 'x-show', 'Ctrl+Shift+T', 'Get-Location은 현재 위치입니다', 'PowerShell에서 pwd를 입력하세요.', 'git status --short → 변경 파일 확인', 'pwd 또는 Get-Location', 'pwd 확인', '# 또는 pwd', 'git\nstatus'];
  for (const example of examples) assert.equal(looksLikeCommand(example), false, example);
});

test('each real PowerShell command gets its own physical range, preserving inline comments', () => {
  const source = 'Get-ChildItem\nls\n\n# 같은 내용을 읽는 PowerShell 명령:\nGet-Content -LiteralPath .\\memo.txt  # 또는 cat -LiteralPath .\\memo.txt\n';
  assert.deepEqual(commandUnits(source, 'powershell'), [
    { start: 0, end: 0, text: 'Get-ChildItem' },
    { start: 1, end: 1, text: 'ls' },
    { start: 4, end: 4, text: 'Get-Content -LiteralPath .\\memo.txt  # 또는 cat -LiteralPath .\\memo.txt' },
  ]);
});

test('mixed text copies actual commands without Korean environment labels or UI directions', () => {
  const source = ['PowerShell: pwd', 'GUI: 출력된 실제 경로 복사 → Win+R → 붙여 넣기 → Enter', '또는 PowerShell: explorer.exe .', '탐색기 주소 표시줄: wt -d .', '열린 Terminal 창 또는 탭에서 PowerShell 프로필 확인', 'macOS Bash/zsh: cat memo.txt', 'Windows cmd: type memo.txt', 'Ctrl+, → 설정 → 모양: 앱 테마', 'git status --short → 변경 파일 확인'].join('\n');
  assert.deepEqual(commandUnits(source), [
    { start: 0, end: 0, text: 'pwd' },
    { start: 2, end: 2, text: 'explorer.exe .' },
    { start: 3, end: 3, text: 'wt -d .' },
    { start: 5, end: 5, text: 'cat memo.txt' },
    { start: 6, end: 6, text: 'type memo.txt' },
  ]);
});

test('PowerShell backticks, bash backslashes, and cmd carets retain the following arguments', () => {
  for (const [language, first, second] of [
    ['powershell', 'Get-ChildItem `', '  -Path .'],
    ['bash', 'python -m uvicorn \\', '  main:app'],
    ['cmd', 'python -m uvicorn ^', '  main:app'],
  ]) {
    assert.deepEqual(commandUnits(first + '\n' + second + '\npwd', language), [
      { start: 0, end: 1, text: first + '\n' + second },
      { start: 2, end: 2, text: 'pwd' },
    ]);
  }
});

test('escaped continuation markers do not swallow the next independent command', () => {
  for (const [language, line] of [['powershell', 'Write-Output ``'], ['bash', 'printf \\\\'], ['cmd', 'echo ^^']]) {
    assert.deepEqual(commandUnits(line + '\npwd', language), [{ start: 0, end: 0, text: line }, { start: 1, end: 1, text: 'pwd' }]);
  }
});

test('PowerShell quoted multiline arguments and bracketed blocks remain one command', () => {
  const quote = 'Write-Output "first\nsecond"';
  assert.deepEqual(commandUnits(quote + '\npwd', 'powershell'), [{ start: 0, end: 1, text: quote }, { start: 2, end: 2, text: 'pwd' }]);
  const block = 'Get-ChildItem | ForEach-Object {\n  $_.Name\n}';
  assert.deepEqual(commandUnits(block + '\npwd', 'powershell'), [{ start: 0, end: 2, text: block }, { start: 3, end: 3, text: 'pwd' }]);
});

test('pipelines and logical continuations include intervening comments rather than copying fragments', () => {
  const pipeline = 'Get-ChildItem |\n# 필요한 이름만 읽습니다\n\n  Select-Object Name';
  assert.deepEqual(commandUnits(pipeline + '\npwd', 'powershell'), [{ start: 0, end: 3, text: pipeline }, { start: 4, end: 4, text: 'pwd' }]);
  const leading = 'Get-ChildItem\n  | Select-Object Name';
  assert.deepEqual(commandUnits(leading + '\npwd', 'powershell'), [{ start: 0, end: 1, text: leading }, { start: 2, end: 2, text: 'pwd' }]);
  assert.deepEqual(commandUnits('test -e memo.txt &&\n  cat memo.txt\npwd', 'bash'), [{ start: 0, end: 1, text: 'test -e memo.txt &&\n  cat memo.txt' }, { start: 2, end: 2, text: 'pwd' }]);
});

test('quoted pipes, brackets, and hash characters do not introduce command boundaries', () => {
  const line = 'Write-Output "# | {"';
  assert.deepEqual(commandUnits(line + '\npwd', 'powershell'), [{ start: 0, end: 0, text: line }, { start: 1, end: 1, text: 'pwd' }]);
  const doubled = "Write-Output 'it''s # | {'";
  assert.deepEqual(commandUnits(doubled + '\npwd', 'powershell'), [{ start: 0, end: 0, text: doubled }, { start: 1, end: 1, text: 'pwd' }]);
});

test('PowerShell here strings keep all content and closing markers in one payload', () => {
  const source = "$message = @'\npwd\n# string content, not another command\n'@";
  assert.deepEqual(commandUnits(source + '\nGet-Location', 'ps1'), [{ start: 0, end: 3, text: source }, { start: 4, end: 4, text: 'Get-Location' }]);
});

test('bash heredoc bodies and multiple markers remain attached to the initiating command', () => {
  const source = "cat <<'FIRST' <<SECOND\n{ # literal\nFIRST\nsecond\nSECOND";
  assert.deepEqual(commandUnits(source + '\npwd', 'bash'), [{ start: 0, end: 4, text: source }, { start: 5, end: 5, text: 'pwd' }]);
  const tabs = 'cat <<-EOF\n\tvalue\n\tEOF';
  assert.deepEqual(commandUnits(tabs + '\npwd', 'zsh'), [{ start: 0, end: 2, text: tabs }, { start: 3, end: 3, text: 'pwd' }]);
});

test('block comments alone are not commands, while comments inside an active pipeline stay attached', () => {
  assert.deepEqual(commandUnits('<#\npwd\n#>\nGet-Location', 'powershell'), [{ start: 3, end: 3, text: 'Get-Location' }]);
  assert.deepEqual(commandUnits('<# comment\n#> pwd', 'powershell'), [{ start: 0, end: 1, text: '<# comment\n#> pwd' }]);
  const source = 'Get-ChildItem |\n<# comment\n#>\nSelect-Object Name';
  assert.deepEqual(commandUnits(source, 'powershell'), [{ start: 0, end: 3, text: source }]);
  assert.deepEqual(commandUnits('REM explain\n:: another note\ndir\n', 'cmd'), [{ start: 2, end: 2, text: 'dir' }]);
});

test('console prompts are display labels, including continuation prompts for multiline commands', () => {
  assert.deepEqual(commandUnits('PS C:\\work> pwd\nPS C:\\work> ls', 'console'), [{ start: 0, end: 0, text: 'pwd' }, { start: 1, end: 1, text: 'ls' }]);
  assert.deepEqual(commandUnits('$ cat <<EOF\n> hello\n> EOF\n$ pwd', 'shell-session'), [{ start: 0, end: 2, text: 'cat <<EOF\nhello\nEOF' }, { start: 3, end: 3, text: 'pwd' }]);
});

test('unfinished quoting, brackets, or heredocs conservatively retain the complete remainder', () => {
  for (const source of ['Write-Output "unfinished\npwd\nls', 'Get-ChildItem | ForEach-Object {\npwd\nls', "$value = @'\npwd\nls", 'cat <<EOF\npwd\nls']) {
    assert.deepEqual(commandUnits(source, 'shell'), [{ start: 0, end: 2, text: source }]);
  }
});

test('multiline payloads preserve authored CRLF and original physical indices', () => {
  assert.deepEqual(commandUnits('Get-ChildItem `\r\n  -Path .\r\npwd\r\n', 'powershell'), [{ start: 0, end: 1, text: 'Get-ChildItem `\r\n  -Path .' }, { start: 2, end: 2, text: 'pwd' }]);
});

test('the current lesson examples expose commands rather than UI instructions', () => {
  const course = JSON.parse(readFileSync(new URL('../public/data/course.json', import.meta.url), 'utf8'));
  const terminal = course.lessons.find(lesson => lesson.id === 'terminal');
  const folderStep = terminal.steps.find(step => step.id === 'terminal-02');
  const copies = commandUnits(folderStep.code, folderStep.language).map(unit => unit.text);
  assert.ok(copies.includes('mkdir dolbeom-demo'));
  assert.ok(copies.includes('Test-Path .\\dolbeom-demo'));
  assert.ok(copies.includes('explorer.exe .'));
  assert.equal(copies.some(text => text.trimStart().startsWith('#')), false);
  const guiStep = terminal.steps.find(step => step.id === 'terminal-03');
  assert.deepEqual(commandUnits(guiStep.code, guiStep.language).map(unit => unit.text), ['wt -d .', 'pwd']);
});
