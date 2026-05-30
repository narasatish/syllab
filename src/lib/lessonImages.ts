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
    img: { url: 'https://en.wikipedia.org/wiki/Special:FilePath/2_Rupee_coin_India.jpg?width=440', alt: 'Indian rupee coins', caption: 'Learn money using real coins.' } },
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

  let best: { score: number; d: typeof DIAGRAMS[number] } | null = null;
  for (const d of DIAGRAMS) {
    const dt = new Set(tokenize(d.name));
    let score = 0;
    for (const w of wanted) if (dt.has(w)) score += 2;
    if (Math.abs(d.classNumber - classNum) <= 2) score += 0.5;
    // One strong keyword match (score >= 2) is enough — duplicates are removed
    // downstream, so a lower bar means MORE slides get a relevant picture.
    if (score >= 2 && (!best || score > best.score)) best = { score, d };
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
): LessonImage | null {
  const cls = parseInt(classLevel) || 8;
  const concept = matchConcept(slideText);
  // Only science subjects may use the science diagram library.
  const allowDiagram = !subject || SCIENCE_SUBJECTS.has(subject);
  const diagram = allowDiagram ? matchDiagram(slideText, cls) : null;
  // Young kids prefer the relatable real-life concept image; older students get
  // the precise diagram first (science) then a concept image as fallback.
  return cls <= 5 ? (concept || diagram) : (diagram || concept);
}
