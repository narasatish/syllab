/**
 * add-story-images.mjs — attach a real, story-matched Pexels photo URL to every
 * slide of the authored story lessons (src/data/story-gen/class-*.json).
 *
 * Picks a concrete, kid-friendly search term per slide (from the slide's words +
 * a curated concrete-noun list), fetches a Pexels photo, and writes
 * slide.image = { url, alt }. Queries are cached/deduped so we stay well under
 * the free Pexels rate limit; on 429 we stop fetching NEW images and reuse cache.
 *
 * Needs PEXELS_API_KEY (read from scripts/instagram-bot/.env). Re-runnable:
 * slides that already have an image.url are skipped.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEN_DIR = path.join(ROOT, 'src', 'data', 'story-gen');

// Load PEXELS_API_KEY from the IG bot's gitignored .env.
function loadKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  const env = path.join(ROOT, 'scripts', 'instagram-bot', '.env');
  if (!existsSync(env)) return '';
  const m = readFileSync(env, 'utf8').match(/PEXELS_API_KEY\s*=\s*(.+)/);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
}
const KEY = loadKey();

// Curated concrete nouns → strong Pexels queries. First match in a slide's text wins.
const CONCRETE = [
  ['mango', 'mango fruit'], ['fruit', 'fruits basket'], ['vegetable', 'vegetable market india'],
  ['market', 'indian market'], ['shop', 'indian shop'], ['money', 'indian rupee money'], ['rupee', 'indian rupees'],
  ['coin', 'coins'], ['clock', 'clock'], ['calendar', 'calendar'], ['pizza', 'pizza'], ['cake', 'birthday cake'],
  ['chocolate', 'chocolate'], ['candy', 'candy sweets'], ['garden', 'garden plants'], ['flower', 'flowers'],
  ['plant', 'green plant'], ['leaf', 'green leaf'], ['tree', 'tree'], ['seed', 'seeds'], ['river', 'river india'],
  ['water', 'water'], ['rain', 'rain'], ['cloud', 'clouds sky'], ['magnet', 'magnet'], ['fish', 'fish'],
  ['bird', 'bird'], ['butterfly', 'butterfly'], ['animal', 'animals'], ['cow', 'cow india'], ['farm', 'farm field india'],
  ['field', 'farm field'], ['crop', 'crop field'], ['school', 'indian school children'], ['book', 'books'],
  ['festival', 'indian festival'], ['diya', 'diwali diya lamp'], ['cricket', 'cricket india'], ['ball', 'ball'],
  ['bus', 'bus india'], ['train', 'indian train'], ['road', 'road'], ['map', 'map'], ['kitchen', 'indian kitchen'],
  ['milk', 'milk'], ['dairy', 'dairy farm'], ['sun', 'sun sky'], ['moon', 'moon'], ['star', 'stars night'],
  ['planet', 'planets solar system'], ['rocket', 'rocket space'], ['body', 'human body kids'], ['heart', 'human heart anatomy'],
  ['bone', 'skeleton'], ['food', 'healthy food'], ['shape', 'colorful shapes'], ['number', 'numbers'],
  ['shadow', 'shadow light'], ['light', 'light bulb'], ['mirror', 'mirror'], ['heat', 'fire heat'], ['fire', 'fire flame'],
  ['temperature', 'thermometer'], ['ice', 'ice'], ['steam', 'steam'], ['microbe', 'microscope lab'],
  ['bacteria', 'microscope lab'], ['lab', 'science lab'], ['weight', 'weighing scale'], ['angle', 'geometry angles'],
  ['line', 'geometric lines'], ['triangle', 'triangle shape'], ['square', 'square pattern'], ['pattern', 'pattern colorful'],
  ['data', 'charts graphs'], ['chart', 'bar chart'], ['letter', 'alphabet letters'], ['alphabet', 'alphabet'],
  ['word', 'open book words'], ['parrot', 'parrot'], ['village', 'indian village'], ['city', 'indian city'],
  ['boat', 'boat river'], ['fair', 'fair carnival'], ['toy', 'toys'], ['pencil', 'pencils'], ['orange', 'oranges'],
];

const STOP = new Set('the a an of to and is are in on for with we they it this that what how why our your their his her at as by be can will into i you he she'.split(' '));

function queryForSlide(slide, lesson) {
  if (slide.image && slide.image.prompt) return slide.image.prompt;
  const hay = `${slide.title || ''} ${slide.storyContext || ''} ${(slide.points || []).map((p) => p.text).join(' ')}`.toLowerCase();
  for (const [needle, q] of CONCRETE) if (hay.includes(needle)) return q;
  // Fallback: first meaningful word of the title + subject hint.
  const word = (slide.title || lesson.chapter || '').toLowerCase().split(/\s+/).find((w) => w.length > 3 && !STOP.has(w));
  const subj = /sci|world|evs/i.test(lesson.subject) ? 'science kids' : /math/i.test(lesson.subject) ? 'learning kids' : 'children learning';
  return word ? `${word} ${subj}` : subj;
}

const cache = new Map();
let rateLimited = false;
async function pexelsUrl(query) {
  if (!KEY || !query || rateLimited) return null;
  if (cache.has(query)) return cache.get(query);
  try {
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&size=medium&per_page=10`, { headers: { Authorization: KEY } });
    if (r.status === 429) { rateLimited = true; console.warn('  ⚠️ Pexels rate-limited — using cache only from here.'); return null; }
    const j = await r.json();
    const photos = (j && j.photos) || [];
    const url = photos.length ? (photos[0].src.large || photos[0].src.medium) : null;
    cache.set(query, url);
    return url;
  } catch { return null; }
}

async function main() {
  if (!KEY) { console.error('No PEXELS_API_KEY found — aborting.'); process.exit(1); }
  const files = readdirSync(GEN_DIR).filter((f) => /^class-[\w-]+\.json$/.test(f)).sort();
  let added = 0, slides = 0, skipped = 0;
  for (const f of files) {
    const fp = path.join(GEN_DIR, f);
    const lessons = JSON.parse(readFileSync(fp, 'utf8'));
    for (const lesson of lessons) {
      for (const slide of lesson.slides || []) {
        slides++;
        if (slide.image && slide.image.url) { skipped++; continue; }
        const q = queryForSlide(slide, lesson);
        const url = await pexelsUrl(q);
        if (url) { slide.image = { url, alt: `${slide.title} — ${lesson.chapter}` }; added++; }
      }
    }
    writeFileSync(fp, JSON.stringify(lessons, null, 2));
    console.log(`${f}: done (${lessons.length} lessons)`);
  }
  console.log(`\nSlides: ${slides} | images added: ${added} | already had: ${skipped} | unique queries: ${cache.size} | rateLimited: ${rateLimited}`);
}
main();
