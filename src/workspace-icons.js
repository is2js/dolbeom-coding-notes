// Local development-tool symbols for the course workbench navigation.
// The surrounding button supplies the accessible name; SVGs stay decorative.
const symbols = {
  toggle: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 4v16m4-10 2 2-2 2"/>',
  overview: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8h18m-13 4-2 2 2 2m8-4 2 2-2 2m-3-5-2 6"/><path d="M6 6h.01m2.5 0h.01"/>',
  outline: '<path d="M5 5v14m0-12h4m-4 6h4m-4 6h4"/><rect x="10" y="4" width="10" height="5" rx="1.5"/><path d="M11 13h8m-8 6h8"/><path d="M2.5 5H5"/>',
  concept: '<rect x="7" y="3" width="10" height="6" rx="1.6"/><rect x="2.5" y="15" width="7" height="6" rx="1.6"/><rect x="14.5" y="15" width="7" height="6" rx="1.6"/><path d="M12 9v3m-6 3v-3h12v3"/>',
  practice: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8h18m-14 4 2.5 2.5L7 17m5.5 0H15"/><path d="m16 11 3 2-3 2z" fill="currentColor" stroke="none"/>',
  edit: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6M13 3v5h5"/><path d="M7 12v4m0-4 2 2 2-2v4m3-5 5-5 2 2-5 5-3 1z"/>',
  mark: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
};

export function workspaceIcon(name) {
  const shape = Object.hasOwn(symbols, name) ? symbols[name] : symbols.overview;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shape}</svg>`;
}
