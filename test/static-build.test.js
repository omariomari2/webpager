const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const ejs = require('ejs');
const { buildStatic } = require('../scripts/build-static');

test('static export preserves animation markup and resolves assets under /webpager/', async () => {
  const output = await buildStatic();
  const html = await fs.readFile(path.join(output, 'index.html'), 'utf8');
  const original = await ejs.renderFile(path.join(__dirname, '../views/index.ejs'));
  assert.ok(html === original.replace(/((?:src|href)=(["']))\/(inline|external)\//g, '$1$3/'),
    'Rendered markup, animation attributes, and script order must be preserved');
  assert.ok(!html.includes('<%'), 'EJS includes must be rendered');
  const base = new URL('https://example.github.io/webpager/');
  for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:)?\/\/|^#/.test(reference)) continue;
    const url = new URL(reference, base);
    assert.ok(url.pathname.startsWith('/webpager/'), `Asset escapes project path: ${reference}`);
    await fs.access(path.join(output, decodeURIComponent(url.pathname.slice('/webpager/'.length))));
  }
});

test('exported jQuery passes the existing browser integrity check', async () => {
  const output = await buildStatic();
  const html = await fs.readFile(path.join(output, 'index.html'), 'utf8');
  const [, src, integrity] = html.match(/<script src="([^"]+)"[^>]*integrity="sha256-([^"]+)"/);
  const bytes = await fs.readFile(path.join(output, src));
  assert.equal(createHash('sha256').update(bytes).digest('base64'), integrity);
});
