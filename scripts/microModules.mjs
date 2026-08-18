/**
 * microModules.mjs — loader for src/data/microlearning/modules.ts.
 *
 * 15 /micro pages promised "a clear explanation, a worked example and a quick
 * quiz" in their own meta description and rendered about 155 words: the title,
 * that sentence, and a nav strip. The bank holds all three for every one of the
 * 15 modules — 49 KB — and no build script read it.
 *
 * Route slugs and bank slugs align exactly, 15 to 15, in both directions.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const STR = "'((?:[^'\\\\]|\\\\.)*)'";
const un = (v) => String(v || '').replace(/\\'/g, "'");

/** A single-quoted OR backtick field — this bank uses both. */
function field(chunk, key) {
  const q = chunk.match(new RegExp(key + ':\\s*' + STR));
  if (q) return un(q[1]);
  const b = chunk.match(new RegExp(key + ':\\s*`([\\s\\S]*?)`'));
  return b ? b[1].trim() : '';
}

export function getMicroModules(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'microlearning', 'modules.ts'), 'utf8').replace(/\r\n/g, '\n');
    const start = ts.indexOf('export const MICROLEARNING_MODULES');
    if (start < 0) return [];
    const body = ts.slice(start, ts.indexOf('\n];', start));
    const out = [];
    for (const chunk of body.split(/\n  \{\n/).slice(1)) {
      const slug = field(chunk, 'slug');
      if (!slug) continue;

      // example is a nested object: { title, problem, solution } with the
      // solution as a backtick block of worked steps.
      const exBlock = chunk.match(/example:\s*\{([\s\S]*?)\n    \}/);
      const example = exBlock
        ? { title: field(exBlock[1], 'title'), problem: field(exBlock[1], 'problem'), solution: field(exBlock[1], 'solution') }
        : null;

      // quickQuiz: each question carries options with an isCorrect flag and an
      // explanation. The correct option is what makes the answer checkable, so
      // it is carried rather than just the question text.
      const quiz = [];
      const qBlock = chunk.match(/quickQuiz:\s*\[([\s\S]*?)\n    \]/);
      if (qBlock) {
        for (const qm of qBlock[1].split(/\n      \{\n/).slice(1)) {
          const q = field(qm, 'q');
          if (!q) continue;
          const options = [...qm.matchAll(new RegExp('\\{\\s*text: ' + STR + ',\\s*isCorrect: (true|false)', 'g'))]
            .map((m) => ({ text: un(m[1]), isCorrect: m[2] === 'true' }));
          quiz.push({ q, options, answer: field(qm, 'answer') });
        }
      }

      const mins = chunk.match(/estMinutes:\s*(\d+)/);
      out.push({
        id: field(chunk, 'id'),
        slug,
        title: field(chunk, 'title'),
        subject: field(chunk, 'subject'),
        classLevel: field(chunk, 'classLevel'),
        estMinutes: mins ? Number(mins[1]) : null,
        summary: field(chunk, 'summary'),
        explanation: field(chunk, 'explanation'),
        example,
        quickQuiz: quiz,
      });
    }
    return out;
  } catch {
    return [];
  }
}
