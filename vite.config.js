import { defineConfig } from 'vite';
import { resolvePagesBase } from './tools/pages-base.js';
import { courseSyncPlugin } from './tools/course-sync-server.js';

export default defineConfig({
  base: resolvePagesBase(process.env.PAGES_BASE_PATH),
  plugins: [courseSyncPlugin()],
  server: {
    host: '127.0.0.1', port: 5188, strictPort: true,
    watch: { ignored: ['**/public/data/course.json', '**/.course-backups/**'] },
  },
});
