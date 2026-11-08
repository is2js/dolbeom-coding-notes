import { marked } from 'marked';
import { commandUnits } from './command-copy-units.js';
import { renderCopyableCode } from './command-code.js';

// Preserve the adjacent author-written explanation, including prerequisites and
// safety notes, rather than detaching runnable lines from their context.
export function presentationCommandGroups(body) {
  const tokens = marked.lexer(typeof body === 'string' ? body : '');
  const groups = [];
  tokens.forEach((token, index) => {
    if (token.type !== 'code') return;
    const units = commandUnits(token.text, token.lang || '');
    if (!units.length) return;
    const context = [];
    for (const direction of [-1, 1]) {
      let i = index + direction;
      while (tokens[i]?.type === 'space') i += direction;
      if (['paragraph', 'heading'].includes(tokens[i]?.type)) context.push(tokens[i].raw);
    }
    const destructive = units.some(unit => /^(?:rmdir|remove-item|rm|del|erase|rd)\b/i.test(unit.text.trim()));
    const optionalInstall = units.some(unit => /^winget\s+install\b/i.test(unit.text.trim()));
    const contextText = context.join('\n\n');
    const explorerAddress = units.some(unit => /^wt\s+-d\s+\.$/i.test(unit.text.trim()))
      && /탐색기[\s\S]*주소\s*표시줄/.test(contextText);
    groups.push({ code: token.raw, context: contextText, destructive, optionalInstall, explorerAddress });
  });
  return groups;
}

// Terminal slides prioritize their copyable examples. Keep edited points for
// every other lesson and for terminal sections that have no command boxes.
export function showPresentationPoints(lessonId, page) {
  if (!page?.points?.length) return false;
  return lessonId !== 'terminal' || presentationCommandGroups(page.section?.body).length === 0;
}

// Demo text also contains UI directions. Only recognisable standalone commands
// receive individual buttons; instructions stay visible as context, not commands.
export function presentationDemoCommands(text) {
  const source = typeof text === 'string' ? text : '';
  return commandUnits(source, 'text').length ? renderCopyableCode(source, 'text') : '';
}
