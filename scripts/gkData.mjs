/**
 * gkData.mjs — loader for GK_QUESTIONS in src/data/generalKnowledge.ts.
 *
 * The nine /gk-questions pages are indexable and their own meta description
 * promises "questions and answers ... with clear explanations". What they
 * prerendered was that sentence, a six-item topic list and a nav strip — about
 * 240 words. The bank holds 180 questions, each with four options, the correct
 * index, a written explanation and the classes it suits: 64 KB that reached no
 * page, because no build script read the file.
 *
 * Every field is carried. correctIndex is the one that makes an answer
 * checkable, and classLevels is what lets a Class 6 page differ from a Class 11
 * page instead of all nine pages repeating the same list.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const STR = "'((?:[^'\\\\]|\\\\.)*)'";
const un = (v) => String(v || '').replace(/\\'/g, "'").replace(/\\\\/g, '\\');

function field(chunk, key) {
  const m = chunk.match(new RegExp('\\b' + key + ':\\s*' + STR));
  return m ? un(m[1]) : '';
}

export function getGkQuestions(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'generalKnowledge.ts'), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf('export const GK_QUESTIONS');
    if (start < 0) return [];
    const body = ts.slice(start, ts.indexOf('\n];', start));
    const out = [];
    for (const chunk of body.split(/\n  \{\n/).slice(1)) {
      const id = field(chunk, 'id');
      if (!id) continue;
      // options is a single-line array of quoted strings; take it from its own
      // line so a stray apostrophe inside `explanation` cannot be swept in.
      const optLine = chunk.match(/options:\s*\[([\s\S]*?)\],\n/);
      const options = optLine
        ? [...optLine[1].matchAll(new RegExp(STR, 'g'))].map((m) => un(m[1]))
        : [];
      const ci = chunk.match(/correctIndex:\s*(\d+)/);
      const levels = chunk.match(/classLevels:\s*\[([0-9,\s]*)\]/);
      out.push({
        id,
        category: field(chunk, 'category'),
        question: field(chunk, 'question'),
        options,
        correctIndex: ci ? Number(ci[1]) : -1,
        explanation: field(chunk, 'explanation'),
        classLevels: levels ? levels[1].split(',').map((n) => Number(n.trim())).filter(Boolean) : [],
      });
    }
    return out;
  } catch {
    return [];
  }
}
