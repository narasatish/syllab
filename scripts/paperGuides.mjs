/**
 * paperGuides.mjs — loader for PAPER_GUIDES in src/data/previousYearPapers.ts.
 *
 * Six /previous-year-papers pages — CBSE Class 10 and 12, JEE Main, NEET, TS
 * and AP EAMCET — render a chapter link list and about 500-680 words. The bank
 * holds, for each of those six exams, the marks pattern, a method for actually
 * using past papers, the highest-weightage chapters subject by subject, marking
 * tips and four FAQs: 42 KB that no build script read.
 *
 * Every field is carried, including `practice`, which is the set of internal
 * links each guide was written to end on.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const STR = "'((?:[^'\\\\]|\\\\.)*)'";
const un = (v) => String(v || '').replace(/\\'/g, "'").replace(/\\\\/g, '\\');

/** A single-quoted field, which may sit on the next line after the key. */
function field(chunk, key) {
  const m = chunk.match(new RegExp('\\b' + key + ':\\s*' + STR));
  return m ? un(m[1]) : '';
}

/** A string[] block: every quoted string between the brackets, in order. */
function strList(chunk, key) {
  const m = chunk.match(new RegExp('\\b' + key + ':\\s*\\[([\\s\\S]*?)\\n    \\]'));
  if (!m) return [];
  return [...m[1].matchAll(new RegExp(STR, 'g'))].map((x) => un(x[1]));
}

/** An array of small objects; `keys` names the fields to pull from each. */
function objList(chunk, key, keys) {
  const m = chunk.match(new RegExp('\\b' + key + ':\\s*\\[([\\s\\S]*?)\\n    \\]'));
  if (!m) return [];
  const out = [];
  for (const row of m[1].split(/\},\s*\{/)) {
    const rec = {};
    let any = false;
    for (const k of keys) {
      const v = field(row, k);
      if (v) any = true;
      rec[k] = v;
    }
    if (any) out.push(rec);
  }
  return out;
}

export function getPaperGuides(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'previousYearPapers.ts'), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf('export const PAPER_GUIDES');
    if (start < 0) return [];
    const body = ts.slice(start, ts.indexOf('\n];', start));
    const out = [];
    for (const chunk of body.split(/\n  \{\n/).slice(1)) {
      const slug = field(chunk, 'slug');
      if (!slug) continue;
      out.push({
        slug,
        exam: field(chunk, 'exam'),
        title: field(chunk, 'title'),
        emoji: field(chunk, 'emoji'),
        intro: field(chunk, 'intro'),
        pattern: strList(chunk, 'pattern'),
        howToUse: strList(chunk, 'howToUse'),
        keyTopics: objList(chunk, 'keyTopics', ['subject', 'topics']),
        tips: strList(chunk, 'tips'),
        faqs: objList(chunk, 'faqs', ['q', 'a']),
        practice: objList(chunk, 'practice', ['label', 'tab', 'href']),
      });
    }
    return out;
  } catch {
    return [];
  }
}
