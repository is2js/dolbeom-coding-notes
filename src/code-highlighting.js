// Keep the bundled language set explicit: examples must work offline and an
// unknown fence should remain plain text instead of being guessed incorrectly.
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';

for (const [name, grammar] of Object.entries({ xml, css, javascript, json, python, markdown, bash, powershell })) {
  hljs.registerLanguage(name, grammar);
}
const languages = {
  html: 'xml', xml: 'xml', css: 'css', javascript: 'javascript', js: 'javascript',
  json: 'json', python: 'python', py: 'python', markdown: 'markdown', md: 'markdown',
  bash: 'bash', sh: 'bash', shell: 'bash', powershell: 'powershell', ps1: 'powershell',
};
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function highlightCourseCode(source, language = '') {
  const name = languages[String(language).trim().split(/\s+/)[0].toLowerCase()];
  if (!name) return escape(source);
  try { return hljs.highlight(String(source), { language: name, ignoreIllegals: true }).value; }
  catch { return escape(source); }
}
