import DOMPurify from 'dompurify';
import { courseMarked } from './course-markdown-engine.js';
import { createCommandRenderer } from './command-code.js';

const renderer = createCommandRenderer();
// These authored diagrams are self-contained SVG images. Keep this an exact
// allowlist: course editors cannot turn arbitrary SVG files into trusted media.
const courseDiagramSources = new Set([
  './assets/course/diagrams/html-element.svg',
  './assets/course/diagrams/html-attributes.svg',
  './assets/course/diagrams/html-document.svg',
  './assets/course/diagrams/css-declaration.svg',
  './assets/course/diagrams/javascript-flow.svg',
]);
// Course media is bundled with the app; remote sources and path traversal are not allowed.
export function isCourseImageSource(src) {
  return typeof src === 'string' && (courseDiagramSources.has(src) || /^\.\/assets\/course\/(?:[a-z0-9][a-z0-9_-]*\/)*[a-z0-9][a-z0-9_-]*\.(?:png|jpe?g|webp)$/i.test(src));
}

function sanitizeCourseMarkup(markup) {
  const fragment = DOMPurify.sanitize(markup, {
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

export function renderCourseMarkdown(value) {
  return sanitizeCourseMarkup(courseMarked.parse(value || '', { breaks: false, gfm: true, renderer }));
}

// Short summaries and descriptions use inline Markdown without introducing
// block wrappers; the same sanitizer protects all generated HTML.
export function renderCourseInline(value) {
  return sanitizeCourseMarkup(courseMarked.parseInline(value || '', { gfm: true }));
}

// Only case media gets the viewer affordance; ordinary lesson images and editor
// previews retain their existing behavior. Build buttons after sanitization.
export function renderCourseCaseMarkdown(value) {
  const template = document.createElement('template');
  template.innerHTML = renderCourseMarkdown(value);
  for (const image of template.content.querySelectorAll('img')) {
    // Reuse an authored link instead of nesting an interactive button inside it.
    const link = image.closest('a');
    if (link?.classList.contains('case-image-trigger')) continue;
    const button = link || document.createElement('button');
    if (!link) button.type = 'button';
    button.classList.add('case-image-trigger');
    button.setAttribute('aria-label', `${image.alt || '사례 이미지'} 크게 보기`);
    if (!link) { image.replaceWith(button); button.append(image); }
    const label = document.createElement('span');
    label.className = 'case-image-trigger-label';
    label.textContent = '이미지 크게 보기';
    button.append(label);
  }
  return template.innerHTML;
}

// Presentations use their short text summary, but should still show its case media.
export function renderCourseMarkdownImages(value) {
  const template = document.createElement('template');
  template.innerHTML = renderCourseMarkdown(value);
  const container = document.createElement('div');
  for (const image of template.content.querySelectorAll('img')) container.append(image.cloneNode());
  return container.innerHTML;
}
