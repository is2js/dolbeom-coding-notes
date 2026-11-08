import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { createCommandRenderer } from './command-code.js';

const renderer = createCommandRenderer();
// Course media is bundled with the app; remote sources and path traversal are not allowed.
export function isCourseImageSource(src) {
  return typeof src === 'string' && /^\.\/assets\/course\/(?:[a-z0-9][a-z0-9_-]*\/)*[a-z0-9][a-z0-9_-]*\.(?:png|jpe?g|webp)$/i.test(src);
}

export function renderCourseMarkdown(value) {
  const fragment = DOMPurify.sanitize(marked.parse(value || '', { breaks: false, gfm: true, renderer }), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'input', 'form', 'iframe', 'video', 'audio'],
    FORBID_ATTR: ['style'],
    RETURN_DOM_FRAGMENT: true,
  });
  for (const img of fragment.querySelectorAll('img')) {
    if (!isCourseImageSource(img.getAttribute('src'))) {
      img.remove();
      continue;
    }
    // In particular, never allow srcset to bypass the local-src check.
    for (const attribute of [...img.attributes]) {
      if (!['src', 'alt', 'title'].includes(attribute.name)) img.removeAttribute(attribute.name);
    }
    img.setAttribute('loading', 'lazy');
  }
  const container = document.createElement('div');
  container.append(fragment);
  return container.innerHTML;
}

// Presentations use their short text summary, but should still show its case media.
export function renderCourseMarkdownImages(value) {
  const template = document.createElement('template');
  template.innerHTML = renderCourseMarkdown(value);
  const container = document.createElement('div');
  for (const image of template.content.querySelectorAll('img')) container.append(image.cloneNode());
  return container.innerHTML;
}
