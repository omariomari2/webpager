const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const ejs = require('ejs');

const root = path.resolve(__dirname, '..');

async function buildStatic() {
  const output = path.join(root, 'docs');
  const rendered = await ejs.renderFile(path.join(root, 'views/index.ejs'));
  // Relative asset paths work at both / and GitHub Pages' /webpager/.
  const html = rendered.replace(/((?:src|href)=(["']))\/(inline|external)\//g, '$1$3/');
  await fs.cp(path.join(root, 'public'), output, { recursive: true });
  // Windows checkouts can change CRLF bytes and invalidate the pinned jQuery hash.
  // Restore LF only if it reproduces the expected hash; never disable integrity.
  for (const [, src, expected] of html.matchAll(/<script src="([^"]+)"[^>]*integrity="sha256-([^"]+)"/g)) {
    const file = path.resolve(output, src);
    if (!file.startsWith(output + path.sep)) throw new Error(`Non-local integrity asset: ${src}`);
    const bytes = await fs.readFile(file);
    const digest = value => createHash('sha256').update(value).digest('base64');
    if (digest(bytes) === expected) continue;
    const normalized = bytes.toString('utf8').replace(/\r\n/g, '\n');
    if (digest(normalized) !== expected) throw new Error(`Integrity mismatch: ${src}`);
    await fs.writeFile(file, normalized);
  }
  await fs.writeFile(path.join(output, 'index.html'), html);
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  return output;
}

if (require.main === module) {
  buildStatic().then(output => console.log(`Static site: ${output}`)).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { buildStatic };
