/**
 * add-story-images.mjs — attach a RELEVANT, UNIQUE Pexels photo to every story
 * slide (src/data/story-gen/class-*.json).
 *
 * Relevance: the query is chosen CONCEPT-FIRST — the slide TITLE is matched against
 * a concept→query map (so "Fractions in Daily Life" → "pizza slices", not "school"),
 * then the worked example, then a concrete noun in the story text.
 * Uniqueness: each query fetches up to 15 photos; a global counter hands a DIFFERENT
 * photo to each slide, so two slides never share the same image.
 *
 * Needs PEXELS_API_KEY (scripts/instagram-bot/.env). Pass --force to overwrite
 * existing images (used after improving the matcher). On 429 it stops fetching NEW
 * queries and reuses what's cached.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEN_DIR = path.join(ROOT, 'src', 'data', 'story-gen');
const FORCE = process.argv.includes('--force');

function loadKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  const env = path.join(ROOT, 'scripts', 'instagram-bot', '.env');
  if (!existsSync(env)) return '';
  const m = readFileSync(env, 'utf8').match(/PEXELS_API_KEY\s*=\s*(.+)/);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
}
const KEY = loadKey();

// Concept → a vivid, photographable query. Checked against the slide TITLE first
// (the title is the topic), then the example/story text. Ordered specific→general.
const CONCEPT = [
  // maths
  ['fraction', 'pizza slices on plate'], ['decimal', 'price tags shopping'], ['percent', 'discount sale tags'],
  ['place value', 'wooden abacus'], ['number', 'colorful wooden number blocks'], ['count', 'counting colorful beads'],
  ['addition', 'kids counting on abacus'], ['subtraction', 'apples on table'], ['multiplication', 'rows of apples grid'],
  ['division', 'children sharing cookies'], ['table', 'multiplication chart'], ['money', 'indian rupee coins notes'],
  ['rupee', 'indian rupee notes'], ['profit', 'shopkeeper counting money'], ['time', 'analog wall clock'],
  ['clock', 'analog clock'], ['calendar', 'wall calendar'], ['angle', 'protractor geometry'], ['line', 'ruler geometry drawing'],
  ['triangle', 'triangle geometry'], ['square', 'square blocks pattern'], ['cube', 'wooden cubes stack'],
  ['quadrilateral', 'geometric shapes paper'], ['shape', 'colorful geometric shapes'], ['pattern', 'colorful repeating pattern'],
  ['perimeter', 'measuring tape garden'], ['area', 'tiled floor grid'], ['weight', 'kitchen weighing scale'],
  ['capacity', 'measuring jug water'], ['measure', 'measuring tape ruler'], ['data', 'colorful bar chart'],
  ['chart', 'bar graph chart'], ['graph', 'line graph chart'], ['prime', 'numbers chalkboard'],
  ['power', 'glowing light bulbs row'], ['ratio', 'mixing ingredients bowls'], ['proportion', 'recipe ingredients'],
  ['roman numeral', 'roman numerals clock'], ['expression', 'maths equation chalkboard'], ['probability', 'rolling dice'],
  ['estimate', 'crowd of people'], ['distance', 'road sign kilometres'], ['map', 'india map'], ['journey', 'winding road map'],
  // science / EVS
  ['photosynthesis', 'green leaf sunlight'], ['plant', 'potted green plant'], ['root', 'plant roots soil'],
  ['leaf', 'close up green leaf'], ['flower', 'colorful flowers garden'], ['seed', 'seeds sprouting soil'],
  ['tree', 'large tree'], ['crop', 'wheat crop field india'], ['farm', 'indian farmer field'],
  ['animal', 'wild animals'], ['bird', 'colorful bird'], ['insect', 'butterfly flower'], ['butterfly', 'butterfly'],
  ['fish', 'fish underwater'], ['adaptation', 'camel desert'], ['habitat', 'forest wildlife'],
  ['microorganism', 'microscope laboratory'], ['microbe', 'microscope slide'], ['bacteria', 'scientist microscope'],
  ['body', 'human anatomy model'], ['heart', 'human heart model'], ['bone', 'human skeleton model'],
  ['skeleton', 'skeleton model'], ['muscle', 'arm muscle fitness'], ['digestion', 'healthy meal plate'],
  ['nutrition', 'healthy indian food thali'], ['food', 'healthy food vegetables'], ['sense', 'eye close up'],
  ['magnet', 'horseshoe magnet iron filings'], ['force', 'pushing cart'], ['motion', 'moving train motion blur'],
  ['friction', 'tyre on road'], ['pressure', 'hydraulic press'], ['light', 'light bulb glowing'],
  ['shadow', 'long shadow ground'], ['mirror', 'mirror reflection'], ['reflection', 'reflection in water'],
  ['heat', 'fire flame'], ['temperature', 'thermometer'], ['fire', 'fire flames'], ['combustion', 'candle flame'],
  ['water cycle', 'rain clouds'], ['water', 'water splash'], ['river', 'river flowing india'], ['rain', 'rain droplets'],
  ['cloud', 'clouds sky'], ['ice', 'ice cubes'], ['steam', 'steaming kettle'], ['state of water', 'ice water steam'],
  ['solar system', 'planets solar system'], ['planet', 'planet space'], ['sun', 'bright sun sky'], ['moon', 'full moon'],
  ['star', 'starry night sky'], ['material', 'wood metal plastic objects'], ['solid', 'ice cube block'],
  ['conservation', 'forest tiger reserve'], ['reproduction', 'baby animals'], ['adolescence', 'teenagers group'],
  ['crop production', 'tractor ploughing field'], ['diversity', 'variety of animals'],
  // english
  ['alphabet', 'wooden alphabet letters'], ['vowel', 'alphabet blocks'], ['noun', 'open storybook'],
  ['verb', 'children running playing'], ['adjective', 'colorful crayons'], ['tense', 'vintage clock'],
  ['sentence', 'writing in notebook'], ['punctuation', 'fountain pen writing'], ['plural', 'many apples'],
  ['opposite', 'sun and moon'], ['rhyme', 'children singing'], ['poem', 'open poetry book'], ['poetry', 'book and flowers'],
  ['comprehension', 'child reading book'], ['letter writing', 'handwritten letter envelope'], ['conversation', 'children talking'],
  ['article', 'open dictionary'], ['vocabulary', 'dictionary words'], ['parrot', 'green parrot'], ['frog', 'frog on leaf'],
  ['spectacles', 'eyeglasses on book'], ['raven', 'black crow'], ['fox', 'red fox'], ['friendship', 'friends together'],
  ['river spoke', 'river india'], ['boat', 'paper boat water'], ['festival', 'indian festival celebration'],
];

// Concrete nouns (fallback) — anything tangible mentioned in the slide.
const CONCRETE = [
  ['mango', 'mangoes'], ['fruit', 'fruit basket'], ['vegetable', 'vegetable market india'], ['market', 'indian market'],
  ['shop', 'indian shop'], ['coin', 'coins'], ['pizza', 'pizza'], ['cake', 'birthday cake'], ['chocolate', 'chocolate bar'],
  ['candy', 'colorful candy'], ['garden', 'garden'], ['milk', 'glass of milk'], ['dairy', 'dairy milk cans'],
  ['cow', 'cow india'], ['kitchen', 'indian kitchen'], ['school', 'indian school children'], ['book', 'stack of books'],
  ['cricket', 'cricket match india'], ['ball', 'cricket ball'], ['bus', 'bus india'], ['train', 'indian train'],
  ['village', 'indian village'], ['city', 'indian city street'], ['diya', 'diwali diyas'], ['toy', 'toys'],
  ['pencil', 'pencils'], ['orange', 'oranges'], ['apple', 'red apples'], ['flower', 'flowers'], ['boat', 'boat'],
  ['fair', 'village fair india'], ['lab', 'science laboratory'], ['scale', 'weighing scale'],
];

const STOP = new Set('the a an of to and is are in on for with we they it this that what how why our your their at as by be can will into our daily life everywhere'.split(' '));

function pickQuery(slide, lesson) {
  if (slide.image && slide.image.prompt) return slide.image.prompt;
  const title = (slide.title || '').toLowerCase();
  const exa = `${slide.example ? slide.example.problem + ' ' + slide.example.solution : ''}`.toLowerCase();
  const story = (slide.storyContext || '').toLowerCase();
  const pts = (slide.points || []).map((p) => p.text).join(' ').toLowerCase();
  // 1) concept match against TITLE first (topic), then example, then story+points
  for (const src of [title, exa, story + ' ' + pts]) {
    for (const [needle, q] of CONCEPT) if (src.includes(needle)) return q;
  }
  // 2) concrete noun anywhere
  const hay = `${title} ${exa} ${story} ${pts}`;
  for (const [needle, q] of CONCRETE) if (hay.includes(needle)) return q;
  // 3) first meaningful title word + subject flavour
  const word = title.split(/\s+/).find((w) => w.length > 3 && !STOP.has(w));
  const flav = /sci|world|evs/i.test(lesson.subject) ? 'science for kids' : /math/i.test(lesson.subject) ? 'colorful learning' : 'storybook illustration';
  return word ? `${word} ${flav}` : `${lesson.chapter} ${flav}`;
}

const cache = new Map(); // query -> [urls]
let rateLimited = false;
async function urlsFor(query) {
  if (cache.has(query)) return cache.get(query);
  if (!KEY || rateLimited) return [];
  try {
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&size=medium&per_page=15`, { headers: { Authorization: KEY } });
    if (r.status === 429) { rateLimited = true; console.warn('  ⚠️ Pexels rate-limited.'); return []; }
    const j = await r.json();
    const urls = ((j && j.photos) || []).map((p) => p.src.large || p.src.medium).filter(Boolean);
    cache.set(query, urls);
    return urls;
  } catch { return []; }
}

async function main() {
  if (!KEY) { console.error('No PEXELS_API_KEY'); process.exit(1); }
  const files = readdirSync(GEN_DIR).filter((f) => /^class-[\w-]+\.json$/.test(f)).sort();
  const counter = new Map(); // query -> how many slides already used it (for uniqueness)
  let slides = 0, set = 0, kept = 0;
  for (const f of files) {
    const fp = path.join(GEN_DIR, f);
    const lessons = JSON.parse(readFileSync(fp, 'utf8'));
    for (const lesson of lessons) {
      for (const slide of lesson.slides || []) {
        slides++;
        // Skip slides already concept-matched (tagged with .q) unless --force.
        if (!FORCE && slide.image && slide.image.q) { kept++; continue; }
        const q = pickQuery(slide, lesson);
        const urls = await urlsFor(q);
        if (urls.length) {
          const i = (counter.get(q) || 0);
          counter.set(q, i + 1);
          slide.image = { url: urls[i % urls.length], alt: `${slide.title} — ${lesson.chapter}`, q };
          set++;
        } else if (slide.image && slide.image.url) {
          kept++; // keep old if we couldn't fetch a new one
        }
      }
    }
    writeFileSync(fp, JSON.stringify(lessons, null, 2));
    console.log(`${f}: done`);
  }
  console.log(`\nSlides ${slides} | images set ${set} | kept ${kept} | unique queries ${cache.size} | rateLimited ${rateLimited}`);
}
main();
