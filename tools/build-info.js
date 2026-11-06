// Capture one timestamp for the whole build, rather than the visitor's clock.
export function buildInfoPlugin(updatedAt = new Date().toISOString()) {
  const info = { updatedAt: new Date(updatedAt).toISOString() };
  return {
    name: 'site-build-info',
    config() { return { define: { __SITE_UPDATED_AT__: JSON.stringify(info.updatedAt) } }; },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'build-info.json', source: JSON.stringify(info, null, 2) + '\n' });
    },
  };
}
