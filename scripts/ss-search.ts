/** ss-search.ts — dump Commons candidates for Social Science images (maps,
 *  portraits, historical paintings, civics/econ diagrams) for hand-picking. */
const UA = { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in)' };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// concept key -> search query (India-centric where it's a map)
const TARGETS: [string, string][] = [
  ['geo:india-location', 'India location map'],
  ['geo:india-physical', 'India physical map relief'],
  ['geo:india-rivers', 'India rivers map'],
  ['geo:india-climate', 'India monsoon map'],
  ['geo:india-vegetation', 'India natural vegetation map'],
  ['geo:india-population', 'India population density map'],
  ['geo:india-minerals', 'India minerals map'],
  ['geo:india-roads-rail', 'India railway network map'],
  ['his:french-revolution', 'Storming of the Bastille'],
  ['his:salt-march', 'Salt March Gandhi 1930'],
  ['his:russian-revolution', 'Lenin 1917'],
  ['civ:parliament', 'Parliament House New Delhi'],
  ['civ:govt-structure', 'Government of India structure diagram'],
  ['civ:constitution', 'Constitution of India preamble'],
  ['eco:sectors', 'three sector model economy'],
  ['eco:development', 'Human Development Index map'],
];

(async () => {
  for (const [key, q] of TARGETS) {
    const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=10&srsearch=${encodeURIComponent(q)}`;
    let titles: string[] = [];
    try { const r = await fetch(u, { headers: UA }); const d: any = await r.json(); titles = (d.query.search || []).map((s: any) => s.title.replace(/^File:/, '')); } catch {}
    console.log(`\n### ${key}  (q: ${q})`);
    titles.slice(0, 7).forEach((t) => console.log('   ' + t));
    await sleep(250);
  }
})();
