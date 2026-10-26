/** Pages metadata has no trailing slash; Vite needs a directory-style base. */
export function resolvePagesBase(value) {
  if (value == null || value.trim() === '' || value.trim() === './') return './';
  const base = value.trim();
  if (!base.startsWith('/') || /[\\?#\s]/.test(base) || base.startsWith('//')) {
    throw new Error('PAGES_BASE_PATH는 / 또는 /저장소명/ 형태의 경로여야 합니다.');
  }
  if (base.split('/').some(segment => segment === '.' || segment === '..')) {
    throw new Error('PAGES_BASE_PATH에 상위·상대 경로를 사용할 수 없습니다.');
  }
  return base.endsWith('/') ? base : `${base}/`;
}
