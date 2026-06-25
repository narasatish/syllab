/**
 * One-shot codemod (feature/ssr-hydrate): convert the guarded
 *   useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/x'))
 * route-detection initializers to the SSR-safe usePathname() hook, and ensure the
 * import is present. usePathname() returns the request URL on the server and
 * window.location.pathname on the client, so per-route SSR is correct and the
 * client popstate listeners (which already setPath in effects) are untouched.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'));
const re = /useState\(\(\) => \(typeof window !== 'undefined' \? window\.location\.pathname : '[^']*'\)\)/g;

let changed = 0;
for (const f of files) {
  const fp = path.join(dir, f);
  let src = fs.readFileSync(fp, 'utf8');
  if (!re.test(src)) continue;
  re.lastIndex = 0;
  src = src.replace(re, 'useState(usePathname())');
  // Add import if missing — place right after the last top-level import line.
  if (!/from ['"]\.\.\/lib\/isomorphic['"]/.test(src)) {
    const lines = src.split('\n');
    let lastImport = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import .* from ['"][^'"]+['"];?\s*$/.test(lines[i])) lastImport = i;
    }
    lines.splice(lastImport + 1, 0, "import { usePathname } from '../lib/isomorphic';");
    src = lines.join('\n');
  }
  fs.writeFileSync(fp, src, 'utf8');
  changed++;
  console.log('  converted', f);
}
console.log(`\n${changed} page(s) converted to usePathname().`);
