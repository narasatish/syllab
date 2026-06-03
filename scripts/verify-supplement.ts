import { DIAGRAMS } from '../src/data/diagramLab';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UA = { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in)' };

// Hand-vetted: diagram id -> canonical English Commons file (clean diagram).
const PICKS: Record<string, string> = {
  'atomic-structure': 'Bohr atom model.svg',
  'separation-techniques-9': 'Simple distillation apparatus.svg',
  'matter-states-9': 'States of matter En.svg',
  'metals-nonmetals-8': 'Periodic table (metals–metalloids–nonmetals, 32 columns).svg',
  'combustion-8': 'Fire triangle.svg',
  'nuclear-energy-10': 'Nuclear fission.svg',
  'mole-concept-9': 'Mole carbon-12 diagram.svg',
  'mendelian-genetics-12': 'Punnett square mendel flowers.svg',
  'reaction-types': 'Types of Chemical Reactions.png',
  'biodiversity-9': 'Biological classification L Pengo.svg',
};
const pathFor = (f: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f.replace(/ /g, '_')).replace(/'/g, '%27')}?width=500`;
const st = async (u: string) => { try { return (await fetch(u, { redirect: 'follow', headers: UA })).status; } catch { return 0; } };

(async () => {
  const fixes: any[] = [];
  for (const [id, file] of Object.entries(PICKS)) {
    const d = DIAGRAMS.find((x) => x.id === id);
    if (!d) { console.log('NO ID', id); continue; }
    const url = pathFor(file);
    const code = await st(url);
    console.log((code === 200 ? 'OK  ' : 'BAD ') + code + '  ' + id + ' -> ' + file);
    if (code === 200) fixes.push({ id, name: d.name, old: d.imageUrl, new: url, file });
    await new Promise((r) => setTimeout(r, 300));
  }
  await fs.writeFile(path.join(__dirname, 'diagram-url-fixes.supplement.json'), JSON.stringify({ fixesCount: fixes.length, fixes }, null, 2));
  console.log('\nverified supplement:', fixes.length);
})();
