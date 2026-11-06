import { Renderer } from 'marked';
import { commandUnits, isShellLanguage } from './command-copy-units.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const escapeAttribute = value => escape(value).replace(/\r/g,'&#13;').replace(/\n/g,'&#10;');
// Plain HTML survives the existing HTML-only Markdown sanitizer.
const copyIcon = '<span class="copy-symbol" aria-hidden="true"></span><span class="copied-symbol" aria-hidden="true">✓</span>';

function copyButton(text, { whole = false, index = 0 } = {}) {
  const name = whole ? '전체 코드 복사' : `명령어${index ? ' ' + index : ''} 복사: ${text.replace(/\s+/g,' ').slice(0,100)}`;
  return `<button type="button" class="command-copy" data-copy-value="${escapeAttribute(text)}" data-copy-kind="${whole ? 'block' : 'command'}" aria-label="${escape(name)}" title="${whole ? '전체 코드 복사' : '이 명령어만 복사'}">${copyIcon}<span class="command-copy-label">${whole ? '전체 복사' : '복사'}</span></button>`;
}

export function renderCopyableCode(text, language = '') {
  const units = commandUnits(text, language), lines = text.split(/\r\n|\r|\n/);
  const code = source => `<pre><code${language ? ` class="language-${escape(language.split(/\s+/)[0])}"` : ''}>${escape(source)}</code></pre>`;
  if (!units.length) {
    if (isShellLanguage(language) || !text.trim()) return code(text);
    return `<div class="copyable-code code-block-whole"><div class="code-block-toolbar"><span>${escape(language || '코드')}</span>${copyButton(text,{whole:true})}</div>${code(text)}</div>`;
  }
  let next = 0, rows = '';
  for (const [index, unit] of units.entries()) {
    if (unit.start > next) rows += `<div class="command-context">${code(lines.slice(next,unit.start).join('\n'))}</div>`;
    rows += `<div class="command-row">${code(lines.slice(unit.start,unit.end+1).join('\n'))}${copyButton(unit.text,{index:index+1})}</div>`;
    next = unit.end+1;
  }
  if (next < lines.length) rows += `<div class="command-context">${code(lines.slice(next).join('\n'))}</div>`;
  return `<div class="copyable-code command-block"><div class="command-terminal-header" aria-hidden="true"><span class="command-terminal-lights"></span><span>TERMINAL</span></div>${rows}</div>`;
}

export function createCommandRenderer() {
  const renderer = new Renderer();
  renderer.code = token => renderCopyableCode(token.text, token.lang || '');
  return renderer;
}
