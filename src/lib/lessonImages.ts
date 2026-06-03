/**
 * lessonImages — finds a relevant image for a lesson slide.
 *
 * Strategy (in order):
 *   1. Match against the curated DIAGRAMS library (180 Wikimedia images, by keyword)
 *   2. Match against a curated concept→image map (esp. Class 1-5 real-life visuals)
 *   3. Return null → the slide falls back to a big emoji visual
 *
 * All image URLs are free Wikimedia Commons Special:FilePath links (CC-licensed).
 */

import { DIAGRAMS } from '../data/diagramLab';
import { SOCIAL_IMAGES } from '../data/socialImages';

export interface LessonImage {
  url: string;
  alt: string;
  caption?: string;
}

/* ─── Curated real-life concept images (great for Classes 1-8) ─────────────────
   These help explain abstract ideas with concrete pictures, e.g. a pizza for
   fractions, coins for money, a clock for time. Filenames verified on Wikimedia. */
const CONCEPT_IMAGES: { keys: string[]; img: LessonImage }[] = [
  { keys: ['fraction', 'fractions', 'half', 'quarter', 'part of whole'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Pizza-3007395.jpg?width=520', alt: 'Pizza divided into slices', caption: 'A pizza cut into slices shows fractions — each slice is a part of the whole!' } },
  { keys: ['addition', 'add', 'counting', 'count', 'numbers', 'number'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Apple.jpg?width=480', alt: 'Apples for counting', caption: 'Count and add using real objects like apples 🍎' } },
  { keys: ['money', 'rupee', 'coins', 'currency'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Indian_Rupee_symbol.svg?width=320', alt: 'Indian rupee symbol', caption: 'The rupee (₹) is our money.' } },
  { keys: ['time', 'clock', 'hours', 'minutes'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Wall_clock.jpg?width=440', alt: 'A clock showing time', caption: 'A clock helps us read hours and minutes.' } },
  { keys: ['shape', 'shapes', 'circle', 'square', 'triangle', 'geometry'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Basic_shapes.svg?width=480', alt: 'Basic geometric shapes', caption: 'Shapes are all around us.' } },
  { keys: ['plant', 'plants', 'tree', 'leaf', 'photosynthesis'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Tomato_plant.jpg?width=460', alt: 'A green plant', caption: 'Plants make their own food from sunlight.' } },
  { keys: ['animal', 'animals', 'mammal'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Lion_waiting_in_Namibia.jpg?width=480', alt: 'A lion (animal)', caption: 'Animals live all around us.' } },
  { keys: ['water', 'rain', 'water cycle', 'evaporation'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Water_cycle.png?width=520', alt: 'The water cycle', caption: 'Water moves in a never-ending cycle.' } },
  { keys: ['sun', 'solar', 'planet', 'space', 'star'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Solar_sys8.jpg?width=520', alt: 'The solar system', caption: 'Eight planets orbit the Sun.' } },
  { keys: ['body', 'human body', 'organ', 'digestion', 'digestive'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Digestive_system_diagram_en.svg?width=420', alt: 'Human digestive system', caption: 'Our body has many organs working together.' } },
  { keys: ['light', 'reflection', 'mirror', 'ray'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Reflection_angles.svg?width=480', alt: 'Reflection of light', caption: 'Light bounces back from a mirror — angle in equals angle out.' } },
  { keys: ['electricity', 'circuit', 'current', 'electric'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Ohm%27s_Law_with_Voltage_source_TeX.svg?width=440', alt: 'Electric circuit', caption: 'An electric circuit lets current flow.' } },
  { keys: ['magnet', 'magnetic', 'magnetism'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Magnet0873.png?width=440', alt: 'A magnet with field lines', caption: 'Magnets have north and south poles.' } },
  // More kid-friendly real photos (Classes 1-5). Any that fail to load fall back to emoji.
  { keys: ['moon', 'lunar', 'night sky'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/FullMoon2010.jpg?width=460', alt: 'The Moon', caption: 'The Moon lights up our night sky.' } },
  { keys: ['fish', 'aquatic', 'underwater'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Clown_fish_in_the_Andaman_Coral_Reef.jpg?width=480', alt: 'A fish', caption: 'Fish live and breathe in water.' } },
  { keys: ['bird', 'birds', 'feather', 'wings'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/House_sparrow04.jpg?width=460', alt: 'A bird', caption: 'Birds have feathers and can fly.' } },
  { keys: ['fruit', 'fruits', 'mango', 'banana'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Culinary_fruits_front_view.jpg?width=500', alt: 'Fruits', caption: 'Fruits are tasty and healthy.' } },
  { keys: ['vegetable', 'vegetables'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Vegetables.jpg?width=500', alt: 'Vegetables', caption: 'Vegetables keep us strong.' } },
  { keys: ['flower', 'flowers', 'petal'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Sunflower_sky_backdrop.jpg?width=460', alt: 'A flower', caption: 'Flowers are the colourful part of plants.' } },
  { keys: ['weather', 'cloud', 'clouds', 'sky'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Cumulus_clouds_in_fair_weather.jpeg?width=500', alt: 'Clouds in the sky', caption: 'Clouds bring us rain.' } },
  { keys: ['food', 'meal', 'nutrition', 'healthy eating'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Good_Food_Display_-_NCI_Visuals_Online.jpg?width=500', alt: 'Healthy food', caption: 'A balanced plate keeps us healthy.' } },
  { keys: ['force', 'motion', 'speed', 'velocity', 'newton'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Newtons_cradle_animation_book_2.gif?width=440', alt: 'Newton\'s cradle showing motion', caption: 'Force changes how things move.' } },
  { keys: ['atom', 'atoms', 'molecule', 'element', 'periodic'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Stylised_atom_with_three_Bohr_model_orbits_and_stylised_nucleus.svg?width=420', alt: 'An atom model', caption: 'Everything is made of tiny atoms.' } },
  { keys: ['cell', 'cells', 'organism'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Animal_cell_structure_en.svg?width=480', alt: 'Animal cell structure', caption: 'Cells are the building blocks of life.' } },

  // ── Financial Literacy ──────────────────────────────────────────────────────
  { keys: ['stock market', 'stock', 'stocks', 'share', 'shares', 'sensex', 'nifty', 'index'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Bombay_Stock_Exchange.jpg?width=500', alt: 'Stock exchange building', caption: 'Shares of companies are bought and sold at the stock exchange.' } },
  { keys: ['money', 'coins', 'notes', 'currency', 'rupee', 'cash'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Indian_Rupee_symbol.svg?width=320', alt: 'Indian rupee symbol', caption: 'The rupee (₹) is India\'s money.' } },
  { keys: ['bank', 'banking', 'savings account', 'deposit', 'passbook'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/RBI-Tower.jpg?width=460', alt: 'Reserve Bank of India', caption: 'Banks keep money safe and pay interest.' } },
  { keys: ['gold', 'silver', 'commodity', 'commodities', 'safe haven'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Gold_ingots.jpg?width=460', alt: 'Gold bars', caption: 'Gold is a popular safe investment in India.' } },
  { keys: ['oil', 'crude', 'petrol', 'opec', 'fuel'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Oil_well.jpg?width=480', alt: 'Oil well', caption: 'Crude oil prices affect petrol costs everywhere.' } },
  { keys: ['saving', 'savings', 'piggy bank', 'budget', 'pocket money'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Piggybank.jpg?width=420', alt: 'A piggy bank', caption: 'Saving a little regularly adds up to a lot!' } },
  { keys: ['interest', 'compound', 'simple interest', 'growth'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/Compound_Interest_with_Varying_Frequencies.svg?width=480', alt: 'Compound interest growth', caption: 'Money grows faster with compound interest over time.' } },
  { keys: ['inflation', 'prices', 'purchasing power', 'cost of living'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/US_Historical_Inflation.svg?width=500', alt: 'Inflation over time', caption: 'Inflation means prices rise and money buys less over time.' } },
  { keys: ['trade', 'exports', 'imports', 'forex', 'global trade'],
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/ContainerShip.jpg?width=500', alt: 'Container ship for trade', caption: 'Countries export and import goods across the world.' } },
];

const STOP = new Set(['the','a','an','of','to','and','in','on','for','with','class','chapter','introduction','intro','basics','its','their']);

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w));
}

/**
 * Match a diagram by the SLIDE-SPECIFIC text (title + first bullet), so each
 * slide gets a DIFFERENT image based on its own content — not the chapter.
 * Requires a strong match (>= 4) so only genuinely relevant slides get a picture.
 */
function matchDiagram(slideText: string, classNum: number): LessonImage | null {
  const wanted = new Set(tokenize(slideText));
  if (wanted.size === 0) return null;

  // HIGH-PRECISION: only match when the slide is genuinely ABOUT this diagram —
  // i.e. most of the diagram's distinctive name words appear in the slide.
  // A single common word ("field", "law", "energy") must NOT trigger a match,
  // or you get a respiratory-system diagram on an Electric-Charges slide.
  let best: { coverage: number; d: typeof DIAGRAMS[number] } | null = null;
  for (const d of DIAGRAMS) {
    const dt = tokenize(d.name);
    if (dt.length < 2) continue;                 // skip 1-word diagram names (too ambiguous)
    const matched = dt.filter(t => wanted.has(t)).length;
    const coverage = matched / dt.length;
    // Need >=2 matching words (blocks single-common-word mismatches like
    // "field"/"law") AND at least half the diagram's name present. This surfaces
    // many more correct science diagrams while staying safe.
    if (matched >= 2 && coverage >= 0.5 && (!best || coverage > best.coverage)) {
      best = { coverage, d };
    }
  }
  if (!best) return null;
  return { url: best.d.imageUrl, alt: best.d.name, caption: best.d.summary?.slice(0, 90) };
}

/** Find a curated real-life concept image (pizza for fractions, etc.). */
function matchConcept(slideText: string): LessonImage | null {
  const hay = slideText.toLowerCase();
  for (const { keys, img } of CONCEPT_IMAGES) {
    if (keys.some(k => hay.includes(k))) return img;
  }
  return null;
}

// The DIAGRAMS library is Biology/Physics/Chemistry only. NEVER match diagrams
// for other subjects (Financial Literacy, English, Maths) — that's what caused a
// kidney-nephron diagram to appear on a mutual-funds slide.
const SCIENCE_SUBJECTS = new Set(['Physics', 'Chemistry', 'Biology', 'Science']);

/**
 * Pick the best image for ONE slide using its own text (title + a hint line).
 * Returns null when nothing is a strong, subject-appropriate match — that slide
 * then shows clean full-width text only. Caller de-duplicates across slides.
 */
export function pickSlideImage(
  slideText: string,
  classLevel: string,
  subject?: string,
  chapterTitle?: string,
): LessonImage | null {
  const cls = parseInt(classLevel) || 8;
  // Social Science has its own verified image set (India maps, history photos,
  // civics/economics visuals) — keyed off the chapter title.
  if (subject === 'Social Science') {
    return chapterTitle ? pickSocialImage(chapterTitle) : null;
  }
  // Concept images (pizza/apple/clock) are kid-relatable — only for Classes 1-5,
  // never on senior slides (an apple on a Class 12 Physics slide is wrong).
  const concept = cls <= 5 ? matchConcept(slideText) : null;
  // Only science subjects may use the science diagram library.
  const allowDiagram = !subject || SCIENCE_SUBJECTS.has(subject);
  const diagram = allowDiagram ? matchDiagram(slideText, cls) : null;
  // Science fallback: if this slide didn't match its own diagram, offer the
  // CHAPTER's diagram (class + subject filtered). The generator de-dupes, so the
  // chapter diagram appears once — guaranteeing a real image on science decks.
  const chapterDiagram = (!diagram && allowDiagram && chapterTitle)
    ? pickChapterDiagram(chapterTitle, classLevel, subject) : null;
  return cls <= 5 ? (concept || diagram || chapterDiagram) : (diagram || chapterDiagram || concept);
}

const SUBJECT_TO_DIAGRAM: Record<string, 'physics' | 'chemistry' | 'biology' | undefined> = {
  Physics: 'physics', Chemistry: 'chemistry', Biology: 'biology', Science: undefined,
};

// Tokens that are too generic to anchor a chapter→diagram match on their own.
// Without this, "Methods of Separation in Everyday Life" matches "Life Cycle of
// a Frog" on the word "life". Distinctive science nouns are NOT listed here.
const WEAK_TOKENS = new Set([
  'life', 'everyday', 'around', 'world', 'our', 'modern', 'types', 'type', 'system',
  'structure', 'process', 'processes', 'methods', 'method', 'science', 'study',
  'concept', 'concepts', 'matter', 'human', 'natural', 'management', 'social', 'health',
]);

// Curated keyword → candidate diagram ids. First matching entry wins; among its
// candidates we pick the one whose class is closest to the deck's class (and,
// when a subject is given, whose subject matches). This bridges the vocabulary
// gap token-matching can't — e.g. chapter "Electricity" → an Ohm's-law diagram.
const CHAPTER_DIAGRAM_OVERRIDES: { re: RegExp; ids: string[] }[] = [
  { re: /\b(electric|electricity|current|ohm|circuit)\b/, ids: ['simple-circuit-6', 'electric-circuit', 'series-parallel', 'ohms-law-graph-10', 'electric-power-10'] },
  { re: /\b(magnet|magnetic|electromagnet|magnetism)\b/, ids: ['magnet-field-lines-6', 'magnetic-field', 'earth-magnetic-field-10', 'electromagnet-10'] },
  { re: /\bsound\b/, ids: ['sound-waves', 'sound-wave-properties-8'] },
  { re: /\b(atom|atoms|atomic|molecule|molecules)\b/, ids: ['atomic-structure', 'rutherford-model-9', 'electron-orbits', 'mole-concept-9'] },
  { re: /(matter around us|is matter|separation|mixtur|purif)/, ids: ['separation-techniques-9', 'matter-states-9'] },
  { re: /materials? around/, ids: ['states-matter-6', 'matter-states-9'] },
  { re: /\breproduct/, ids: ['female-reproductive-10', 'male-reproductive-10', 'sexual-reproduction-animals-8', 'reproduction-plants-7'] },
  { re: /(classification|kingdom|biodiversity|conservation|taxonom)/, ids: ['biodiversity-9', 'forest-ecosystem-7', 'food-chain'] },
  { re: /(coal|petroleum|fossil fuel)/, ids: ['fossil-fuels-8'] },
  { re: /(organism|population|ecosystem|ecolog)/, ids: ['forest-ecosystem-7', 'food-chain', 'biogeochemical-cycles-12'] },
  { re: /(reflection|refraction|\blens\b|\bmirror\b|\blight\b)/, ids: ['light-reflection-laws-7', 'light-refraction-8', 'ray-diagrams-lens', 'ray-diagrams-mirror'] },
  { re: /(force|pressure|motion)/, ids: ['force-pressure-8', 'newtons-laws', 'distance-time-9'] },
];

function diagramById(id: string) { return DIAGRAMS.find((d) => d.id === id); }

function overrideDiagram(chapterTitle: string, cls: number, wantSubj?: string): LessonImage | null {
  const lc = chapterTitle.toLowerCase();
  for (const o of CHAPTER_DIAGRAM_OVERRIDES) {
    if (!o.re.test(lc)) continue;
    const cands = o.ids.map(diagramById).filter(Boolean)
      .filter((d) => !wantSubj || d!.subject === wantSubj) as typeof DIAGRAMS;
    if (!cands.length) continue;
    cands.sort((a, b) => Math.abs((a.classNumber || cls) - cls) - Math.abs((b.classNumber || cls) - cls));
    const d = cands[0];
    return { url: d.imageUrl, alt: d.name, caption: d.summary?.slice(0, 90) };
  }
  return null;
}

/**
 * Pick a real diagram for a whole science CHAPTER (used as the chapter's hero
 * image when slide-level matching finds nothing). Filters the 180-image library
 * by class (±1) and subject, then matches the chapter title against diagram
 * names — so "The Human Eye" → the eye diagram, "Carbon and its Compounds" →
 * a carbon diagram, etc. Same-subject filtering prevents cross-subject mismatch.
 */
export function pickChapterDiagram(
  chapterTitle: string, classLevel: string, subject?: string,
): LessonImage | null {
  if (subject && !SCIENCE_SUBJECTS.has(subject)) return null;
  const cls = parseInt(classLevel) || 10;
  const wantSubj = subject ? SUBJECT_TO_DIAGRAM[subject] : undefined;

  // 1. Curated overrides bridge the vocabulary gap (e.g. "Electricity" → Ohm's law).
  const override = overrideDiagram(chapterTitle, cls, wantSubj);
  if (override) return override;

  // 2. Fall back to token matching — but only on DISTINCTIVE tokens, so a generic
  //    word like "life" can't drag in an unrelated diagram.
  const wanted = new Set(tokenize(chapterTitle).filter(t => !WEAK_TOKENS.has(t)));
  if (wanted.size === 0) return null;

  let best: { matched: number; sameClass: boolean; d: typeof DIAGRAMS[number] } | null = null;
  for (const d of DIAGRAMS) {
    if (wantSubj && d.subject !== wantSubj) continue;
    if (Math.abs((d.classNumber || cls) - cls) > 1) continue; // class proximity
    const dt = tokenize(d.name).filter(t => !WEAK_TOKENS.has(t));
    const matched = dt.filter(t => wanted.has(t)).length;
    if (matched < 1) continue;
    const sameClass = (d.classNumber || cls) === cls;
    if (!best || matched > best.matched || (matched === best.matched && sameClass && !best.sameClass)) {
      best = { matched, sameClass, d };
    }
  }
  if (!best) return null;
  return { url: best.d.imageUrl, alt: best.d.name, caption: best.d.summary?.slice(0, 90) };
}

// Social Science chapter title (keyword) → verified image key in SOCIAL_IMAGES.
// First match wins. Chapters with no match fall back to a clean emoji.
const SOCIAL_CHAPTER_MAP: { re: RegExp; key: string }[] = [
  { re: /nationalism in india|civil disobedience|salt|non-cooperation/, key: 'his-salt-march' },
  { re: /french revolution/, key: 'his-bastille' },
  { re: /russian revolution|socialism in europe/, key: 'his-lenin' },
  { re: /size and location/, key: 'geo-india-location' },
  { re: /physical features|drainage/, key: 'geo-india-physical' },
  { re: /\bclimate\b|monsoon/, key: 'geo-india-climate' },
  { re: /vegetation|forest and wildlife|wildlife/, key: 'geo-india-vegetation' },
  { re: /\bpopulation\b|people as resource/, key: 'geo-india-population' },
  { re: /minerals|energy resources/, key: 'geo-india-minerals' },
  { re: /lifelines|national economy|manufacturing|transport/, key: 'geo-india-transport' },
  { re: /working of institutions|political parties|electoral/, key: 'civ-parliament' },
  { re: /constitutional design|constitution|democratic rights|power sharing|federalism/, key: 'civ-constitution' },
  { re: /sectors of the indian economy|globalisation|money and credit/, key: 'eco-sectors' },
  { re: /\bdevelopment\b|poverty|human development/, key: 'eco-hdi' },
];

export function pickSocialImage(chapterTitle: string): LessonImage | null {
  const lc = chapterTitle.toLowerCase();
  for (const m of SOCIAL_CHAPTER_MAP) {
    if (!m.re.test(lc)) continue;
    const img = SOCIAL_IMAGES.find((s) => s.key === m.key);
    if (img) return { url: img.url, alt: img.alt, caption: img.caption };
  }
  return null;
}
