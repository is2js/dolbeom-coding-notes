// Keep copying available on browsers without the modern clipboard permission.
export async function writeClipboard(text, { clipboard = globalThis.navigator?.clipboard, document: doc = globalThis.document } = {}) {
  if (typeof text !== 'string' || !text) return false;
  try {
    if (clipboard?.writeText) { await clipboard.writeText(text); return true; }
  } catch { /* Try the selection-based browser fallback. */ }
  if (!doc?.execCommand || !doc.body) return false;
  const active = doc.activeElement, selection = doc.getSelection?.();
  const ranges = Array.from({length:selection?.rangeCount || 0}, (_, i) => selection.getRangeAt(i).cloneRange());
  const field = doc.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly','');
  field.setAttribute('aria-label','복사할 코드');
  field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  (active?.closest?.('dialog[open]') || doc.querySelector?.('dialog[open]') || doc.body).append(field);
  try {
    field.select();
    field.setSelectionRange(0,text.length);
    return doc.execCommand('copy') === true;
  } catch { return false; }
  finally {
    field.remove();
    active?.focus?.({preventScroll:true});
    if (selection && ranges.length) {
      selection.removeAllRanges();
      for (const range of ranges) selection.addRange(range);
    }
  }
}
