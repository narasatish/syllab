/**
 * kidsData.mjs — loaders for the Syllab Junior banks under src/data/kids/.
 *
 * 37 indexable /kids pages rendered a mean of 157 words while roughly 71 KB of
 * authored content sat in nine banks that no build script read: 28 nursery
 * rhymes with their lyrics, 10 moral stories, action rhymes, 28 "tap and listen"
 * topics, and the alphabet, number and shape tables.
 *
 * Every rhyme here is traditional (Twinkle Twinkle, Humpty Dumpty, Jack and
 * Jill) and every story is Aesop or Panchatantra, so the text is public domain
 * and safe to render in full. That was checked before wiring, not assumed.
 *
 * One loader per bank rather than a single combined getter: audit-projections
 * compares a projection against its bank, which only works one array at a time.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Records in these banks are single-quoted hand-authored TS. */
function readBank(root, file, marker) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'kids', file), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf(marker);
    if (start < 0) return [];
    const body = ts.slice(start);
    const end = body.indexOf('\n];');
    return end < 0 ? body : body.slice(0, end);
  } catch {
    return '';
  }
}

const un = (v) => String(v || '').replace(/\\'/g, "'");
const STR = "'((?:[^'\\\\]|\\\\.)*)'";
const field = (chunk, key) => {
  const m = chunk.match(new RegExp(key + ':\\s*' + STR));
  return m ? un(m[1]) : '';
};
const strList = (chunk, key) => {
  const m = chunk.match(new RegExp(key + ':\\s*\\[([\\s\\S]*?)\\n\\s*\\]'));
  if (!m) return [];
  return [...m[1].matchAll(new RegExp(STR, 'g'))].map((x) => un(x[1])).filter((x) => x.trim().length > 1);
};
/**
 * A flat array that may sit entirely on one line. strList() requires a newline
 * before the closing bracket — true of the multi-line banks, but not of the
 * language-alphabet topics, whose items are one long line.
 */
const flatList = (chunk, key) => {
  const m = chunk.match(new RegExp(key + ':\\s*\\[([\\s\\S]*?)\\]'));
  if (!m) return [];
  return [...m[1].matchAll(new RegExp(STR, 'g'))].map((x) => un(x[1])).filter((x) => x.trim().length > 0);
};

const chunks = (body) => body.split(/\n  \{/).slice(1);

export function getKidsStories(root) {
  return chunks(readBank(root, 'stories.ts', 'export const MORAL_STORIES'))
    .map((c) => ({ id: field(c, 'id'), title: field(c, 'title'), emoji: field(c, 'emoji'), lines: strList(c, 'lines'), moral: field(c, 'moral') }))
    .filter((x) => x.id && x.lines.length);
}

export function getKidsRhymes(root) {
  // `lyrics` is a backtick template literal holding the whole verse with real
  // newlines — not an array of strings. Reading it with the array helper
  // returned nothing at all for every one of the 28 rhymes.
  return chunks(readBank(root, 'rhymes.ts', 'export const nurseryRhymes'))
    .map((c) => {
      const m = c.match(/lyrics:\s*`([\s\S]*?)`/);
      const lyrics = m ? m[1].split('\n').map((l) => l.trim()).filter(Boolean) : [];
      return { id: field(c, 'id'), title: field(c, 'title'), emoji: field(c, 'emoji'), lyrics, youtubeVideoId: field(c, 'youtubeVideoId'), colorClass: field(c, 'colorClass') };
    })
    .filter((x) => x.id && x.lyrics.length);
}

export function getKidsActionRhymes(root) {
  return chunks(readBank(root, 'actionRhymes.ts', 'export const ACTION_RHYMES'))
    .map((c) => ({ id: field(c, 'id'), title: field(c, 'title'), emoji: field(c, 'emoji'), lines: strList(c, 'lines') }))
    .filter((x) => x.id && x.lines.length);
}

export function getKidsLearnTopics(root) {
  return chunks(readBank(root, 'learnTopics.ts', 'export const LEARN_TOPICS'))
    .map((c) => {
      // `say` is optional: 125 of the 215 items omit it (colours, shapes and the
      // language alphabets have nothing to pronounce beyond the label). Requiring
      // all three fields dropped 18 of the 28 topics.
      const items = [...c.matchAll(new RegExp('\\{\\s*emoji: ' + STR + ',\\s*label: ' + STR + '(?:,\\s*say: ' + STR + ')?', 'g'))]
        .map((m) => ({ emoji: un(m[1]), label: un(m[2]), say: m[3] ? un(m[3]) : '' }));
      // The bank carries TWO item shapes. The seven language-alphabet topics
      // (Hindi vyanjan, Tamil/Telugu/Kannada vowels and consonants) store plain
      // strings like 'क ka' instead of objects, so an object-only matcher
      // silently returned nothing for them and dropped all seven topics.
      const plain = items.length ? [] : flatList(c, 'items').map((label) => ({ emoji: '', label, say: '' }));
      return { id: field(c, 'id'), title: field(c, 'title'), emoji: field(c, 'emoji'), subtitle: field(c, 'subtitle'), colorClass: field(c, 'colorClass'), items: items.length ? items : plain };
    })
    .filter((x) => x.id && x.items.length);
}

export function getKidsAlphabet(root) {
  return chunks(readBank(root, 'alphabet.ts', 'export const alphabetTiles'))
    .map((c) => ({ letter: field(c, 'letter'), lowercase: field(c, 'lowercase'), word: field(c, 'word'), wordEn: field(c, 'wordEn'), emoji: field(c, 'emoji'), colorClass: field(c, 'colorClass') }))
    .filter((x) => x.letter);
}

export function getKidsNumbers(root) {
  return chunks(readBank(root, 'numbers.ts', 'export const numberTiles'))
    .map((c) => {
      const n = c.match(/number:\s*(\d+)/);
      return { number: n ? Number(n[1]) : null, word: field(c, 'word'), emoji: field(c, 'emoji'), dots: (c.match(/dots:\s*(\d+)/) || [])[1], colorClass: field(c, 'colorClass') };
    })
    .filter((x) => x.number != null);
}

export function getKidsShapes(root) {
  return chunks(readBank(root, 'shapes.ts', 'export const shapeTiles'))
    .map((c) => ({ name: field(c, 'name'), description: field(c, 'description'), emoji: field(c, 'emoji'), color: field(c, 'color'), colorName: field(c, 'colorName'), colorClass: field(c, 'colorClass') }))
    .filter((x) => x.name);
}

export function getKidsColoring(root) {
  // `svg` is the artwork itself and is deliberately not projected — it is markup,
  // not readable content, and the page embeds it client-side.
  return chunks(readBank(root, 'coloring.ts', 'export const coloringPages'))
    .map((c) => ({ id: field(c, 'id'), title: field(c, 'title'), description: field(c, 'description'), ageGroup: field(c, 'ageGroup'), emoji: field(c, 'emoji') }))
    .filter((x) => x.id && x.title);
}

export function getKidsMatchSets(root) {
  return chunks(readBank(root, 'matchSets.ts', 'export const MATCH_SETS'))
    .map((c) => {
      const pairs = [...c.matchAll(new RegExp('\\{\\s*id: ' + STR + ',\\s*left: ' + STR + ',\\s*right: ' + STR, 'g'))]
        .map((m) => ({ id: un(m[1]), left: un(m[2]), right: un(m[3]) }));
      return { id: field(c, 'id'), title: field(c, 'title'), emoji: field(c, 'emoji'), pairs };
    })
    .filter((x) => x.id && x.pairs.length);
}
