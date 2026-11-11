import { courseMarked } from './course-markdown-engine.js';
import { renderCourseMarkdown } from './course-markdown.js';
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

export function markdownPractice(body, { render = renderCourseMarkdown, copy = writeClipboard } = {}) {
  const original = practiceSeed(body);
  return {
    original,
    source: original,
    message: '',
    get preview() { return render(this.source); },
    reset() { this.source = this.original; this.message = '연습 원문을 처음 상태로 되돌렸습니다.'; },
    async copySource() {
      const ok = await copy(this.source);
      this.message = ok ? '연습 원문을 복사했습니다.' : '복사하지 못했습니다. 원문을 선택해 복사해 주세요.';
    },
  };
}
