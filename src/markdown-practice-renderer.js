import DOMPurify from 'dompurify';
import { courseMarked } from './course-markdown-engine.js';
import { createCommandRenderer } from './command-code.js';
import { isCourseImageSource } from './course-markdown.js';

const escapeAttribute = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

export function isPracticeImageSource(source, allowedImageSources = []) {
  if (typeof source !== 'string' || !source || /[\u0000-\u0020\u007f]/.test(source)) return false;
  if (isCourseImageSource(source)) return true;
  if (source.startsWith('blob:')) return new Set(allowedImageSources).has(source);
  try {
    const url = new URL(source);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch { return false; }
}

// Practice rendering is separate from the published course. Only user-chosen
// HTTPS images and this editor's temporary image URLs gain preview access.
export function renderPracticeMarkdown(source, { allowedImageSources = [] } = {}) {
  const renderer = createCommandRenderer();
  renderer.checkbox = ({ checked }) => `<span data-practice-task-state="${checked ? 'checked' : 'unchecked'}"></span>`;
  renderer.image = ({ href, text, title }) => `<img data-practice-src="${escapeAttribute(href)}" alt="${escapeAttribute(text)}"${title ? ` title="${escapeAttribute(title)}"` : ''}>`;
  const html = courseMarked.parse(source || '', { renderer, breaks: false, gfm: true });
  const fragment = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'input', 'form', 'iframe', 'video', 'audio', 'source', 'track'],
    FORBID_ATTR: ['style'],
    RETURN_DOM_FRAGMENT: true,
  });
  for (const marker of fragment.querySelectorAll('span[data-practice-task-state]')) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.disabled = true;
    checkbox.checked = marker.getAttribute('data-practice-task-state') === 'checked';
    // x-html inserts serialized markup, so preserve state as an HTML attribute.
    if (checkbox.checked) checkbox.setAttribute('checked', '');
    checkbox.setAttribute('aria-label', checkbox.checked ? '완료한 항목' : '아직 완료하지 않은 항목');
    marker.replaceWith(checkbox);
  }
  for (const image of fragment.querySelectorAll('img')) {
    const imageSource = image.getAttribute('data-practice-src') || image.getAttribute('src');
    if (!isPracticeImageSource(imageSource, allowedImageSources)) { image.remove(); continue; }
    for (const attribute of [...image.attributes]) {
      if (!['alt', 'title'].includes(attribute.name)) image.removeAttribute(attribute.name);
    }
    image.setAttribute('src', imageSource);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('referrerpolicy', 'no-referrer');
  }
  for (const link of fragment.querySelectorAll('a')) {
    link.removeAttribute('ping');
    link.removeAttribute('download');
    link.setAttribute('rel', 'noopener noreferrer');
    if (/^https?:\/\//i.test(link.getAttribute('href') || '')) link.setAttribute('target', '_blank');
  }
  const container = document.createElement('div');
  container.append(fragment);
  return container.innerHTML;
}
