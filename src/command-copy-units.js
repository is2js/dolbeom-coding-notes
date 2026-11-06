const SHELL_LANGUAGES = new Set(['powershell', 'ps1', 'pwsh', 'sh', 'bash', 'zsh', 'shell', 'cmd', 'bat', 'batch', 'console', 'shell-session']);
const PLAIN_LANGUAGES = new Set(['', 'text', 'txt', 'plain', 'plaintext']);
const COMMAND_ROOTS = new Set(['pwd', 'ls', 'cd', 'chdir', 'dir', 'mkdir', 'md', 'rmdir', 'rd', 'ni', 'cat', 'type', 'touch', 'echo', 'printf', 'test', 'select', 'git', 'gh', 'winget', 'wt', 'start', 'open', 'explorer', 'notepad', 'python', 'python3', 'py', 'pip', 'pip3', 'npm', 'npx', 'node', 'uv', 'uvicorn', 'code', 'codex', 'pwsh', 'powershell', 'ver', 'where', 'which', 'whoami', 'clear', 'cls', 'cp', 'mv', 'rm', 'curl', 'wget', 'ssh', 'scp', 'find', 'grep', 'sed', 'awk', 'head', 'tail', 'less', 'more', 'tar', 'unzip', 'chmod', 'env', 'printenv']);
const PS_VERBS = /^(?:Get|Set|New|Test|Select|Where|ForEach|Measure|Compare|Sort|Format|Export|Import|ConvertTo|ConvertFrom|Copy|Move|Rename|Remove|Clear|Write|Read|Add|Out|Start|Stop|Restart|Invoke|Install|Update|Uninstall|Find|Save|Enable|Disable|Join|Split|Resolve|Push|Pop|Connect|Disconnect)-[A-Za-z][\w-]*$/i;

function languageName(language) { return String(language || '').trim().toLowerCase().split(/\s+/)[0]; }
export function isShellLanguage(language) { return SHELL_LANGUAGES.has(languageName(language)); }

function withoutLabel(line) {
  return line.replace(/^\s*(?:(?:또는|혹은)\s+)?(?:Windows\s+PowerShell(?:\s+\d(?:\.\d)?)?|PowerShell(?:\s+\d(?:\.\d)?)?|macOS(?:\s+(?:Bash\/zsh|Bash|zsh|터미널))?|Windows\s+cmd|cmd|탐색기\s+주소\s*(?:표시줄|줄))\s*:\s*/i, '');
}

/** Recognise commands, not filenames, options, shortcuts, or general code snippets. */
export function looksLikeCommand(text) {
  const value = withoutLabel(String(text || '')).trim();
  if (!value || /[\r\n]/.test(value) || /^(?:#|::|rem\b|<)/i.test(value)) return false;
  // Quoted arguments and comments may contain explanatory Korean or arrow characters.
  const syntax = value.replace(/"(?:`.|\\.|[^"\\])*"|'(?:''|[^'])*'/g, 'ARG').replace(/\s+#.*$/, '');
  if (/[→←↔]/.test(syntax) || /(?:입력|확인|이동|실행|연습|설명)(?:합니다|하세요|하기|해|할|\s|$)/.test(syntax) || /\s(?:또는|그리고|후에?|먼저)\s/.test(syntax)) return false;
  if (/^\$PSVersionTable\.PSVersion\s*$/i.test(value)) return true;
  if (/^if\s+exist\s+\S/i.test(value)) return true;
  // Explicit call operators and paths to known tools are still command invocations.
  const invocation = value.replace(/^&\s+/, '');
  const token = invocation.match(/^(?:"([^"]+)"|'([^']+)'|([^\s;|&]+))(?=\s|$|[;|&])/);
  if (!token) return false;
  const name = (token[1] || token[2] || token[3]).split(/[\\/]/).pop().replace(/\.(?:exe|cmd|bat)$/i, '').toLowerCase();
  return COMMAND_ROOTS.has(name) || PS_VERBS.test(name);
}

function shellKind(language) {
  if (['powershell', 'ps1', 'pwsh'].includes(language)) return 'ps';
  if (['cmd', 'bat', 'batch'].includes(language)) return 'cmd';
  if (['sh', 'bash', 'zsh'].includes(language)) return 'sh';
  return 'mixed';
}
function shellLine(line, language, pending) {
  if (language !== 'console' && language !== 'shell-session') return line;
  const prompt = line.match(/^\s*(?:PS(?:\s+[^>\r\n]*)?>|[A-Za-z]:\\[^>\r\n]*>|\$)\s+(.*)$/i);
  if (prompt) return prompt[1];
  return pending ? line.replace(/^\s*>\s?/, '') : line;
}
function commentOnly(line, kind) {
  return !line.trim() || (kind === 'cmd' ? /^\s*(?:rem(?:\s|$)|::)/i.test(line) : /^\s*#/.test(line)) || (kind === 'mixed' && /^\s*(?:rem(?:\s|$)|::)/i.test(line));
}
function newState() { return { quote: '', brackets: [], here: '', heredocs: [], blockComment: false, uncertain: false }; }

// This is a boundary scanner, not a shell interpreter. Unclosed syntax retains the
// remainder as one copy unit rather than presenting executable-looking fragments.
function scanLine(line, state, kind) {
  const ps = kind === 'ps' || kind === 'mixed';
  const sh = kind === 'sh' || kind === 'mixed';
  const cmd = kind === 'cmd' || kind === 'mixed';
  let i = 0, tail = '', hasCode = false, continuation = false;
  if (!state.quote && !state.here && !state.heredocs.length && !state.blockComment && commentOnly(line, kind)) return { hasCode: false, pending: state.brackets.length > 0 || state.uncertain };
  if (state.heredocs.length) {
    const next = state.heredocs[0];
    if ((next.tabs ? line.replace(/^\t+/, '') : line) === next.marker) state.heredocs.shift();
    return { hasCode: true, pending: state.heredocs.length > 0 };
  }
  if (state.here) {
    const close = line.match(/^\s*(['"])@(?=\s|$|[|;])/);
    if (!close || close[1] !== state.here) return { hasCode: true, pending: true };
    state.here = ''; i = close[0].length; hasCode = true;
  }
  for (; i < line.length; i++) {
    const c = line[i], next = line[i + 1];
    if (state.blockComment) {
      if (c === '#' && next === '>') { state.blockComment = false; i++; }
      continue;
    }
    if (state.quote) {
      hasCode = true;
      const escape = (ps && c === '`' && state.quote !== "'") || (sh && c === '\\' && state.quote !== "'") || (cmd && c === '^' && kind === 'cmd');
      if (escape) { if (i === line.length - 1) continuation = true; else i++; continue; }
      if (c === state.quote) {
        if (ps && next === c && state.quote !== '`') i++;
        else state.quote = '';
      }
      continue;
    }
    if (ps && c === '<' && next === '#') { state.blockComment = true; i++; continue; }
    if ((ps || sh) && c === '#' && (i === 0 || /[\s;|&(]/.test(line[i - 1]))) break;
    if (ps && c === '@' && /['"]/.test(next || '') && /^\s*(?:#.*)?$/.test(line.slice(i + 2))) { state.here = next; hasCode = true; break; }
    if (sh && c === '<' && next === '<' && line[i + 2] !== '<') {
      const heredoc = line.slice(i).match(/^<<(-)?\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_][\w-]*))/);
      if (heredoc) { state.heredocs.push({ marker: heredoc[2] || heredoc[3] || heredoc[4], tabs: !!heredoc[1] }); i += heredoc[0].length - 1; hasCode = true; tail += '_'; continue; }
    }
    if ((c === '"') || (c === "'" && kind !== 'cmd') || (c === '`' && kind === 'sh')) { state.quote = c; hasCode = true; tail += '_'; continue; }
    const escape = (ps && c === '`') || (sh && c === '\\') || (cmd && c === '^');
    if (escape) { hasCode = true; if (/^\s*$/.test(line.slice(i + 1))) continuation = true; else i++; tail += '_'; continue; }
    if (/[([{]/.test(c) && (kind !== 'cmd' || c === '(')) { state.brackets.push(c); }
    if (/[)\]}]/.test(c) && (kind !== 'cmd' || c === ')')) {
      const opening = { ')': '(', ']': '[', '}': '{' }[c];
      if (state.brackets.at(-1) === opening) state.brackets.pop(); else state.uncertain = true;
    }
    if (!/\s/.test(c)) hasCode = true;
    tail += c;
  }
  return { hasCode, pending: continuation || !!state.quote || !!state.here || state.heredocs.length > 0 || state.brackets.length > 0 || state.blockComment || state.uncertain || /(?:\|\|?|&&|\|&)\s*$/.test(tail) };
}

/** Physical line ranges are inclusive; payloads never include display-only labels. */
export function commandUnits(text, language = 'text') {
  const lang = languageName(language), shell = isShellLanguage(lang);
  if (!shell && !PLAIN_LANGUAGES.has(lang)) return [];
  const source = String(text || ''), lines = source.split(/\r\n|\r|\n/), endings = source.match(/\r\n|\r|\n/g) || [];
  const kind = shell ? shellKind(lang) : 'mixed', units = [];
  let state = newState(), start = -1, payload = [], pending = false, commentStart = -1, commentPayload = [];
  const flush = end => { if (start >= 0) units.push({ start, end, text: payload.map((line, index) => line + (index < payload.length - 1 ? endings[start + index] : '')).join('') }); start = -1; payload = []; state = newState(); pending = false; };
  for (let index = 0; index < lines.length; index++) {
    const line = shell ? shellLine(lines[index], lang, pending) : withoutLabel(lines[index]);
    if (start < 0 && !state.blockComment && (commentOnly(line, kind) || (!shell && !looksLikeCommand(line)))) continue;
    const scanned = scanLine(line, state, kind);
    if (start < 0 && !scanned.hasCode) {
      if (state.blockComment) { if (commentStart < 0) commentStart = index; commentPayload.push(line); }
      else { commentStart = -1; commentPayload = []; state = newState(); }
      continue;
    }
    if (start < 0) { start = commentStart < 0 ? index : commentStart; payload = commentPayload; commentStart = -1; commentPayload = []; }
    payload.push(line);
    pending = scanned.pending || (pending && !scanned.hasCode);
    if (!pending) {
      let lookahead = index + 1;
      while (lookahead < lines.length && commentOnly(lines[lookahead], kind)) lookahead++;
      pending = lookahead < lines.length && /^\s*(?:\|(?:\||&)?|&&)(?!\|)/.test(lines[lookahead]);
    }
    if (!pending) flush(index);
  }
  if (start >= 0) flush(lines.length - 1);
  return units;
}
