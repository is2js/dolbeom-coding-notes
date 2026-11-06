import test from 'node:test';
import assert from 'node:assert/strict';
import { formatSiteUpdatedAt } from '../src/site-update.js';
import { buildInfoPlugin } from '../tools/build-info.js';

test('the update label uses Korea time and the correct day at midnight', () => {
  assert.equal(formatSiteUpdatedAt('2026-11-07T09:45:10Z'),'2026.11.07 18:45 KST');
  assert.equal(formatSiteUpdatedAt('2026-11-07T15:03:00Z'),'2026.11.08 00:03 KST');
  assert.equal(formatSiteUpdatedAt('invalid'),'');
});

test('the UI and public metadata keep the same captured build timestamp', () => {
  const stamp='2026-11-07T09:45:10.000Z';
  const plugin=buildInfoPlugin(stamp), files=[];
  assert.equal(JSON.parse(plugin.config().define.__SITE_UPDATED_AT__),stamp);
  plugin.generateBundle.call({emitFile:file=>files.push(file)});
  plugin.generateBundle.call({emitFile:file=>files.push(file)});
  assert.equal(files[0].fileName,'build-info.json');
  assert.deepEqual(JSON.parse(files[0].source),{updatedAt:stamp});
  assert.equal(files[0].source,files[1].source);
});
