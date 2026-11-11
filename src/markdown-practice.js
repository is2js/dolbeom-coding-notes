import { courseMarked } from './course-markdown-engine.js';
import { renderPracticeMarkdown } from './markdown-practice-renderer.js';
import { writeClipboard } from './clipboard.js';

// The authored Markdown example remains the source of truth. The editor owns
// only a temporary in-memory copy; it never writes to course data or storage.
export function practiceSeed(body) {
  if (typeof body !== 'string' || !body.trim()) return '';
  const token = courseMarked.lexer(body).find(item =>
    item.type === 'code' && /^(?:markdown|md)(?:\s|$)/i.test(item.lang || '')
  );
  return token?.text || '';
}

function range(source, start, end) {
  const first = Math.max(0, Math.min(source.length, Number.isFinite(start) ? start : source.length));
  return [first, Math.max(first, Math.min(source.length, Number.isFinite(end) ? end : first))];
}

function replace(source, start, end, text, first = 0, last = text.length) {
  return { source: source.slice(0, start) + text + source.slice(end), start: start + first, end: start + last };
}

const sample = [
  '# 마크다운 문법 연습', '', '## 제목과 글자',
  '**굵게**, *기울임*, ~~취소선~~, `인라인 코드`', '',
  '> 인용문입니다.', '', '- 순서 없는 목록', '  - 하위 목록', '',
  '1. 첫 번째 순서', '2. 두 번째 순서', '',
  '- [ ] 확인할 일', '- [x] 완료한 일', '',
  '| 항목 | 설명 |', '| --- | --- |', '| README | 프로젝트 안내 |', '',
  '[GitHub Markdown 가이드](https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)', '',
  '![HTML 태그 설명](./assets/course/diagrams/html-element.svg)', '',
  '```text', '코드 블록은 문자를 그대로 보여 줍니다.', '```', '',
  '---', '', '별표를 글자로 쓰기: \\*별표\\*',
].join('\n');

export function editMarkdown(source, start, end, action, options = {}) {
  source = String(source ?? '');
  [start, end] = range(source, start, end);
  const selected = source.slice(start, end);
  const wraps = { bold: ['**', '**', '굵은 글씨'], italic: ['*', '*', '기울인 글씨'], strike: ['~~', '~~', '취소할 글씨'], inlineCode: ['`', '`', '코드'] };
  if (wraps[action]) {
    const [before, after, placeholder] = wraps[action], value = selected || placeholder;
    return replace(source, start, end, before + value + after, before.length, before.length + value.length);
  }
  const lineActions = { bullet: '- ', task: '- [ ] ', checkedTask: '- [x] ', quote: '> ' };
  if (lineActions[action] || action === 'ordered' || /^heading[1-6]$/.test(action)) {
    const lineStart = start === 0 ? 0 : source.lastIndexOf('\n', start - 1) + 1;
    const effectiveEnd = end > start && source[end - 1] === '\n' ? end - 1 : end;
    let lineEnd = source.indexOf('\n', effectiveEnd);
    if (lineEnd < 0) lineEnd = source.length;
    const block = source.slice(lineStart, lineEnd) || (action === 'task' || action === 'checkedTask' ? '할 일' : action === 'quote' ? '인용문' : action.startsWith('heading') ? '제목' : '항목');
    const text = block.split('\n').map((line, i) => (action === 'ordered' ? `${i + 1}. ` : action.startsWith('heading') ? '#'.repeat(Number(action.at(-1))) + ' ' : lineActions[action]) + line).join('\n');
    return replace(source, lineStart, lineEnd, text);
  }
  let insert;
  if (action === 'table') {
    const columns = Math.max(1, Math.min(6, Number.parseInt(options.columns, 10) || 2));
    const rows = Math.max(1, Math.min(10, Number.parseInt(options.rows, 10) || 2));
    const row = values => '| ' + values.join(' | ') + ' |';
    insert = [row(Array.from({length: columns}, (_, i) => `제목 ${i + 1}`)), row(Array(columns).fill('---')), ...Array.from({length: rows}, (_, i) => row(Array.from({length: columns}, (_, j) => `내용 ${i + 1}-${j + 1}`)))].join('\n');
  } else if (action === 'link' || action === 'image') {
    const label = String(options.label || selected || (action === 'image' ? '이미지 설명' : '링크 이름')).replace(/[\r\n]+/g, ' ').replace(/([\\\[\]])/g, '\\$1');
    const target = String(options.url || '').replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
    insert = `${action === 'image' ? '!' : ''}[${label}](${target})`;
  } else if (action === 'codeBlock') {
    const text = selected || '여기에 코드를 입력하세요';
    const longestFence = Math.max(0, ...[...text.matchAll(/`+/g)].map(match => match[0].length));
    const fence = '`'.repeat(Math.max(3, longestFence + 1));
    insert = `${fence}text\n${text}\n${fence}`;
  } else if (action === 'rule') insert = '---';
  else if (action === 'lineBreak') insert = '  \n';
  else if (action === 'sample') insert = sample;
  else return { source, start, end };
  const isBlock = ['table', 'image', 'codeBlock', 'rule', 'sample'].includes(action);
  const before = isBlock && start > 0 ? (source[start - 1] === '\n' ? '\n' : '\n\n') : '';
  const after = isBlock && end < source.length ? (source[end] === '\n' ? '\n' : '\n\n') : '';
  return replace(source, start, end, before + insert + after, before.length, before.length + insert.length);
}

export const supportedImageTypes = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

export function markdownPractice(body, { render = renderPracticeMarkdown, copy = writeClipboard, createImageUrl = file => URL.createObjectURL(file), revokeImageUrl = url => URL.revokeObjectURL(url) } = {}) {
  const original = practiceSeed(body);
  return {
    original,
    source: original,
    message: '', selectionStart: original.length, selectionEnd: original.length,
    insertPanel: '', linkLabel: '', linkUrl: 'https://', imageLabel: '', imageUrl: 'https://', tableRows: 2, tableColumns: 2,
    imageSources: [],
    get preview() { return render(this.source, { allowedImageSources: this.imageSources }); },
    rememberSelection() { const input = this.$refs?.source; if (input) { this.selectionStart = input.selectionStart; this.selectionEnd = input.selectionEnd; } },
    focusSelection(start, end) {
      const apply = () => { const input = this.$refs?.source; if (input) { input.focus(); input.setSelectionRange(start, end); } };
      if (this.$nextTick) this.$nextTick(apply); else apply();
    },
    apply(action, options = {}) {
      const result = editMarkdown(this.source, this.selectionStart, this.selectionEnd, action, options);
      this.source = result.source; this.selectionStart = result.start; this.selectionEnd = result.end;
      this.insertPanel = ''; this.message = ''; this.focusSelection(result.start, result.end);
    },
    openInsert(panel) { this.insertPanel = this.insertPanel === panel ? '' : panel; if (panel === 'link') this.linkLabel = this.source.slice(this.selectionStart, this.selectionEnd); if (panel === 'image') this.imageLabel = this.source.slice(this.selectionStart, this.selectionEnd); },
    insertLink() {
      const url = this.linkUrl.trim();
      if (!/^(?:https?:\/\/|mailto:|#|\.{0,2}\/)/i.test(url) || /[\r\n]/.test(url)) { this.message = 'https 주소, 문서 경로 또는 #제목 링크를 입력해 주세요.'; return; }
      this.apply('link', {label: this.linkLabel, url});
    },
    insertImageUrl() {
      const url = this.imageUrl.trim();
      try { const parsed = new URL(url); if (/\s/.test(url) || parsed.protocol !== 'https:' || parsed.username || parsed.password) throw Error(); }
      catch { this.message = '이미지는 https 주소를 입력하거나 로컬 파일을 선택해 주세요.'; return; }
      this.apply('image', {label: this.imageLabel, url});
    },
    insertImageFile(file) {
      if (!file) return;
      if (!supportedImageTypes.has(file.type)) { this.message = 'PNG, JPEG, GIF, WebP 이미지 파일을 선택해 주세요. SVG는 지원하지 않습니다.'; return; }
      if (file.size > 10 * 1024 * 1024) { this.message = '10MB 이하의 이미지로 연습해 주세요.'; return; }
      let url;
      try { url = createImageUrl(file); } catch { this.message = '이미지를 열지 못했습니다. 다른 파일로 다시 시도해 주세요.'; return; }
      this.imageSources.push(url); this.apply('image', {label: this.imageLabel || file.name || '붙여넣은 이미지', url});
      this.message = '이미지를 이 창에서만 미리 봅니다. 이미지 파일은 업로드되거나 저장되지 않습니다.';
    },
    pasteImage(event) {
      const file = [...(event.clipboardData?.items || [])].find(item => item.kind === 'file' && item.type.startsWith('image/'))?.getAsFile();
      if (!file) return;
      event.preventDefault(); this.rememberSelection(); this.insertImageFile(file);
    },
    releaseImages() { for (const url of this.imageSources) revokeImageUrl(url); this.imageSources = []; },
    reset() { this.releaseImages(); this.source = this.original; this.selectionStart = this.selectionEnd = this.original.length; this.insertPanel = ''; this.message = '연습 원문을 처음 상태로 되돌렸습니다.'; },
    destroy() { this.releaseImages(); },
    async copySource() {
      const ok = await copy(this.source);
      this.message = ok ? '연습 원문을 복사했습니다.' + (this.imageSources.length ? ' 로컬 이미지 링크는 이 창에서만 사용할 수 있습니다.' : '') : '복사하지 못했습니다. 원문을 선택해 복사해 주세요.';
    },
  };
}
