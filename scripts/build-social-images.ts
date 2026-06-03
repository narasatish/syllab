/**
 * build-social-images.ts — verify hand-picked Social Science images on Wikimedia
 * Commons (200 check) and write src/data/socialImages.ts with only the live ones.
 * India maps are India-centric; user does final boundary review on the sample.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const UA = { 'User-Agent': 'SyllabBot/1.0 (https://syllab.in)' };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const pathFor = (f: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f.replace(/ /g, '_')).replace(/'/g, '%27')}?width=640`;
const st = async (u: string) => { try { return (await fetch(u, { redirect: 'follow', headers: UA })).status; } catch { return 0; } };

// key, file, strand, alt, caption
const PICKS: [string, string, string, string, string][] = [
  ['geo-india-location', 'India location map.svg', 'Geography', 'Map of India', 'India lies in South Asia between 8°N and 37°N latitude.'],
  ['geo-india-physical', 'India relief location map.svg', 'Geography', 'Physical relief map of India', "India's mountains, plains, plateau and long coastline."],
  ['geo-india-climate', 'India southwest summer monsoon onset map en.svg', 'Geography', 'Monsoon onset over India', 'The southwest monsoon advances across India from June.'],
  ['geo-india-vegetation', 'India Natural vegetation.svg', 'Geography', 'Natural vegetation of India', "India's forest and vegetation belts."],
  ['geo-india-population', 'India population density map en.svg', 'Geography', 'Population density of India', "How India's population is spread across states."],
  ['geo-india-minerals', 'India mineral map.jpg', 'Geography', 'Mineral map of India', "India's major mineral and energy belts."],
  ['geo-india-transport', 'Railway network map of India - Schematic.svg', 'Geography', 'Indian Railway network', 'Railways are a lifeline of the national economy.'],
  ['his-bastille', 'Prise de la Bastille clean.jpg', 'History', 'Storming of the Bastille, 1789', 'The fall of the Bastille sparked the French Revolution.'],
  ['his-salt-march', 'Gandhi during the Salt March.jpg', 'History', 'Gandhi on the Salt March, 1930', "Gandhi's Dandi March defied the British salt law."],
  ['his-lenin', 'Vladimir Lenin, 1917.jpg', 'History', 'Vladimir Lenin, 1917', 'Lenin led the Bolshevik Revolution of October 1917.'],
  ['civ-parliament', 'Sansad Bhavan, Delhi, BNK.jpg', 'Civics', 'Parliament of India', 'The Parliament of India — where national laws are made.'],
  ['civ-constitution', 'India-constitution-preamble.svg', 'Civics', 'Preamble to the Constitution of India', "India's ideals: justice, liberty, equality, fraternity."],
  ['eco-sectors', 'Gdp-and-labour-force-by-sector.png', 'Economics', 'GDP and labour force by sector', 'Primary, secondary and tertiary sectors of the economy.'],
  ['eco-hdi', 'Human Development Index, OWID.svg', 'Economics', 'Human Development Index', 'HDI measures development beyond income: health, education, living standards.'],
];

(async () => {
  const ok: any[] = [];
  for (const [key, file, strand, alt, caption] of PICKS) {
    const url = pathFor(file);
    const code = await st(url);
    console.log((code === 200 ? 'OK  ' : 'BAD ') + code + '  ' + key + ' -> ' + file);
    if (code === 200) ok.push({ key, strand, url, alt, caption, file });
    await sleep(300);
  }
  const body = `/**
 * socialImages — verified Wikimedia Commons images for Social Science decks.
 * Maps are India-centric. All URLs HTTP-200 checked by scripts/build-social-images.ts.
 * (CC-licensed / public-domain historical works.)
 */
export interface SocialImage { key: string; strand: string; url: string; alt: string; caption: string; }

export const SOCIAL_IMAGES: SocialImage[] = ${JSON.stringify(ok.map(({ file, ...r }) => r), null, 2)};
`;
  await fs.writeFile(path.join(ROOT, 'src', 'data', 'socialImages.ts'), body, 'utf8');
  console.log(`\n✅ ${ok.length}/${PICKS.length} verified → src/data/socialImages.ts`);
})();
