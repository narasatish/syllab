/**
 * content-engine.mjs — turns mined website "atoms" into a day's plan of 10 posts:
 *   5 reels, 3 carousels, 2 images (unique, never repeated).
 *
 * Each post spec carries:
 *   format   : 'reel' | 'carousel' | 'image'
 *   slides[] : for image/carousel — {kicker, title, lines[], theme, footer}
 *   scenes[] : for reel — {text, sub, durationMs, theme}
 *   caption  : hook + value + engagement question + CTA
 *   hashtags : { inCaption[], firstComment[] }
 *   keys[]   : atom keys to mark used (dedup)
 */
import { loadAtoms } from './data-loader.mjs';
import { pickUnseen, markUsed } from './dedup.mjs';
import { buildHashtags } from './hashtags.mjs';

const CTA = 'Follow @syllab.in for daily free study content 📚';
const SITE_CTA = '100% free — learn more at syllab.in';

/* ── caption helpers ─────────────────────────────────────────────────────── */
function caption({ hook, value, question, kind, topic, subject, seed }) {
  const tags = buildHashtags({ kind, topic, subject, seed });
  const body = [
    hook,
    '',
    value,
    '',
    question ? `💬 ${question}` : '',
    '',
    `Save 🔖 & share with a friend who needs this.`,
    CTA,
    SITE_CTA,
    '',
    '.\n.\n.',
    tags.inCaption.join(' '),
  ].filter((l) => l !== undefined).join('\n').replace(/\n{3,}/g, '\n\n');
  return { text: body, hashtags: tags };
}

/* ── per-kind builders → return {slides|scenes, caption, keys, format-ready} ─ */

function fromFunFact(a, seed) {
  const slides = [
    { kicker: 'DID YOU KNOW?', title: a.hook, lines: [], theme: 'violet', big: a.emoji },
    { kicker: 'THE FACT', title: '', lines: splitLines(a.body, 3), theme: 'violet' },
  ];
  const scenes = [
    { text: 'Did you know? 🤔', sub: '', durationMs: 1600, theme: 'violet' },
    { text: a.hook, sub: '', durationMs: 3200, theme: 'violet' },
    { text: a.body, sub: '', durationMs: 4200, theme: 'indigo' },
    { text: 'Follow @syllab.in', sub: 'daily free facts', durationMs: 2200, theme: 'cta' },
  ];
  const cap = caption({
    hook: `${a.emoji} ${a.hook}`, value: a.body,
    question: 'Did this surprise you? Tell us below 👇',
    kind: 'funfact', topic: a.topic, seed,
  });
  return { slides, scenes, caption: cap, keys: [a.key] };
}

function fromGk(a, seed) {
  const opts = (a.options || []).map((o, i) => `${'ABCD'[i]}) ${o}`);
  const ansLetter = 'ABCD'[a.answerIndex] || '?';
  const slides = [
    { kicker: 'GK QUIZ 🧠', title: a.question, lines: [], theme: 'emerald' },
    { kicker: 'OPTIONS', title: '', lines: opts, theme: 'emerald' },
    { kicker: 'ANSWER', title: `${ansLetter}) ${a.options[a.answerIndex]}`, lines: splitLines(a.explanation, 3), theme: 'amber' },
  ];
  const scenes = [
    { text: a.question, sub: 'Can you answer? 🤔', durationMs: 3200, theme: 'emerald' },
    { text: opts.join('\n'), sub: 'Comment your answer 👇', durationMs: 3500, theme: 'emerald' },
    { text: '3...2...1', sub: '', durationMs: 1800, theme: 'slate' },
    { text: `✅ ${ansLetter}) ${a.options[a.answerIndex]}`, sub: a.explanation, durationMs: 4200, theme: 'amber' },
    { text: 'Follow @syllab.in', sub: 'daily free quizzes', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({
    hook: `🧠 GK Quiz: ${a.question}`,
    value: `Answer: ${ansLetter}) ${a.options[a.answerIndex]}\n\n${a.explanation}`,
    question: 'Did you get it right? 👇',
    kind: 'gk', topic: a.topic, seed,
  });
  return { slides, scenes, caption: cap, keys: [a.key] };
}

function fromPyq(a, seed) {
  const head = `${a.classLabel} ${a.subject}`;
  const slides = [
    { kicker: `PYQ • ${a.exam || 'BOARD'} ${a.year || ''}`.trim(), title: a.question, lines: [`${head} — ${a.chapter}`, `${a.marks || ''} marks`].filter(Boolean), theme: 'rose' },
    { kicker: 'MODEL ANSWER', title: '', lines: splitLines(a.answer, 6), theme: 'slate' },
  ];
  const scenes = [
    { text: `${head}`, sub: `${a.exam || 'Board'} ${a.year || ''} — ${a.marks || ''} marks`.trim(), durationMs: 2200, theme: 'rose' },
    { text: a.question, sub: 'Can you solve it?', durationMs: 4000, theme: 'rose' },
    { text: 'Answer 👇', sub: '', durationMs: 1500, theme: 'slate' },
    { text: clip(a.answer, 220), sub: '', durationMs: 5000, theme: 'slate' },
    { text: 'Follow @syllab.in', sub: 'free PYQs + solutions', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({
    hook: `📝 ${head} PYQ (${a.exam || 'Board'} ${a.year || ''}): ${clip(a.question, 90)}`,
    value: `Model answer:\n${clip(a.answer, 500)}`,
    question: 'Want more PYQs for your exam? Comment your class 👇',
    kind: 'pyq', subject: a.subject, seed,
  });
  return { slides, scenes, caption: cap, keys: [a.key] };
}

function fromFullForms(atoms, seed) {
  // Bundle several abbreviations into ONE post for density.
  const picks = atoms.slice(0, 6);
  const slides = [
    { kicker: 'FULL FORMS 🔤', title: 'Do you know these?', lines: [], theme: 'sky' },
    ...picks.map((p) => ({ kicker: p.abbr, title: p.full, lines: p.note ? splitLines(p.note, 2) : [], theme: 'sky' })),
  ];
  const scenes = [
    { text: 'Full forms you should know 🔤', sub: '', durationMs: 1800, theme: 'sky' },
    ...picks.slice(0, 5).map((p) => ({ text: p.abbr, sub: `= ${p.full}`, durationMs: 1900, theme: 'sky' })),
    { text: 'Follow @syllab.in', sub: 'daily GK', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({
    hook: `🔤 Full forms every student should know:`,
    value: picks.map((p) => `${p.abbr} = ${p.full}`).join('\n'),
    question: 'How many did you already know? 👇',
    kind: 'fullform', seed,
  });
  return { slides, scenes, caption: cap, keys: picks.map((p) => p.key) };
}

function fromMcq(a, seed) {
  const ansTxt = a.answer || '';
  const slides = [
    { kicker: `${a.subject || 'QUIZ'} MCQ`, title: a.question, lines: [], theme: 'emerald', plain: true },
    { kicker: 'OPTIONS', title: '', lines: a.options || [], theme: 'emerald', plain: true },
    { kicker: 'ANSWER', title: ansTxt, lines: splitLines(a.explanation, 4), theme: 'amber', plain: true },
  ];
  const scenes = [
    { text: a.question, sub: 'Can you solve it?', durationMs: 3400, theme: 'emerald' },
    { text: (a.options || []).join('\n'), sub: 'Comment your answer', durationMs: 3600, theme: 'emerald' },
    { text: '3...2...1', sub: '', durationMs: 1800, theme: 'slate' },
    { text: ansTxt, sub: a.explanation, durationMs: 4200, theme: 'amber' },
    { text: 'Follow @syllab.in', sub: 'daily practice', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `🧮 ${a.classLabel || ''} ${a.subject || ''} MCQ: ${clip(a.question, 80)}`,
    value: `Answer: ${ansTxt}\n\n${a.explanation}`, question: 'Did you get it right? 👇', kind: 'quiz', subject: a.subject, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromFormula(a, seed) {
  const head = [a.subject, a.classLabel].filter(Boolean).join(' • ') || 'FORMULAS';
  const slides = [
    { kicker: head, title: a.cover, lines: [a.chapter].filter(Boolean), theme: 'indigo', plain: true },
    ...a.slides.map((s) => ({ kicker: 'FORMULA', title: s.headline, lines: s.sub ? splitLines(s.sub, 3) : [], theme: 'indigo', plain: true })),
  ];
  const scenes = [
    { text: a.cover, sub: a.chapter, durationMs: 2600, theme: 'indigo' },
    ...a.slides.slice(0, 6).map((s) => ({ text: s.headline, sub: s.sub, durationMs: 2600, theme: 'indigo' })),
    { text: 'Follow @syllab.in', sub: 'free formula sheets', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `📐 ${a.subject || ''} ${a.chapter} — every formula you need (save this 📌)`,
    value: a.slides.map((s) => `• ${s.headline}: ${s.sub}`).join('\n'), question: 'Which chapter next? 👇', kind: 'maths', subject: a.subject, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromConcept(a, seed) {
  const slides = [{ kicker: `CONCEPT • ${a.subject || ''}`.trim(), title: a.headline, lines: splitLines(a.sub, 5), theme: 'violet', plain: true }];
  const scenes = [
    { text: a.headline, sub: '', durationMs: 3000, theme: 'violet' },
    { text: a.sub, sub: '', durationMs: 4200, theme: 'indigo' },
    { text: 'Follow @syllab.in', sub: 'concept a day', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `💡 ${a.headline}`, value: a.sub, question: 'Save this for revision 🔖', kind: 'science', subject: a.subject, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromTip(a, seed) {
  const isMistake = a.ttype === 'mistake';
  const slides = [{ kicker: isMistake ? 'COMMON MISTAKE' : 'EXAM TIP', title: a.headline, lines: splitLines(a.sub, 5), theme: isMistake ? 'rose' : 'emerald', plain: true }];
  const scenes = [
    { text: (isMistake ? '❌ ' : '✅ ') + a.headline, sub: '', durationMs: 3200, theme: isMistake ? 'rose' : 'emerald' },
    { text: a.sub, sub: '', durationMs: 4200, theme: 'slate' },
    { text: 'Follow @syllab.in', sub: 'topper tips daily', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `${isMistake ? '❌ Common mistake' : '✅ Exam tip'}: ${a.headline}`, value: a.sub, question: 'Tag someone who needs this 👇', kind: 'motivation', subject: a.subject, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromGlossary(a, seed) {
  const body = [a.definition, a.example ? `e.g. ${a.example}` : ''].filter(Boolean);
  const slides = [{ kicker: `TERM • ${a.subject || ''}`.trim(), title: a.term, lines: body.flatMap((l) => splitLines(l, 3)).slice(0, 5), theme: 'sky' }];
  const scenes = [
    { text: a.term, sub: 'meaning?', durationMs: 2600, theme: 'sky' },
    { text: a.definition, sub: a.example ? `e.g. ${a.example}` : '', durationMs: 4200, theme: 'sky' },
    { text: 'Follow @syllab.in', sub: 'learn a term daily', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `📖 ${a.term} — meaning`, value: `${a.definition}${a.example ? `\n\nExample: ${a.example}` : ''}`, question: 'Knew this one? 👇', kind: 'gk', topic: a.topic, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromDifference(a, seed) {
  const rows = (a.rows || []).slice(0, 5);
  const slides = [
    { kicker: 'DIFFERENCE', title: `${a.termA} vs ${a.termB}`, lines: [], theme: 'amber' },
    ...rows.map((r) => ({ kicker: r.aspect || '', title: '', lines: [`${a.termA}: ${r.a}`, `${a.termB}: ${r.b}`], theme: 'amber', plain: true })),
  ];
  const scenes = [
    { text: `${a.termA} vs ${a.termB}`, sub: 'know the difference', durationMs: 2800, theme: 'amber' },
    ...rows.slice(0, 4).map((r) => ({ text: r.aspect || '', sub: `${a.termA}: ${r.a}\n${a.termB}: ${r.b}`, durationMs: 3000, theme: 'amber' })),
    { text: 'Follow @syllab.in', sub: 'free comparisons', durationMs: 2000, theme: 'cta' },
  ];
  const cap = caption({ hook: `⚖️ ${a.termA} vs ${a.termB} — the difference explained`, value: rows.map((r) => `${r.aspect}: ${a.termA} → ${r.a}; ${a.termB} → ${r.b}`).join('\n'), question: 'Which confused you before? 👇', kind: 'science', subject: a.subject, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

function fromCoding(a, seed) {
  const slides = [{ kicker: 'CODE • ' + (a.lang || 'PYTHON'), title: a.headline, code: a.code, note: a.note, theme: 'slate', plain: true }];
  const scenes = [
    { text: a.headline, sub: 'quick dev tip', durationMs: 3000, theme: 'slate' },
    { text: '', code: a.code, note: a.note, durationMs: 5000, theme: 'slate' },
    { text: 'Follow @syllab.in', sub: 'learn to code free', durationMs: 2400, theme: 'cta' },
  ];
  const cap = caption({ hook: `💻 ${a.headline}`, value: `${a.code}\n\n${a.note}`, question: 'Save this for your next project 🔖', kind: 'coding', seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: 'coding' };
}

function fromTimeline(a, seed) {
  const ev = a.events.slice(0, 8);
  const slides = [
    { kicker: `TIMELINE • ${a.subject || ''}`.trim(), title: a.title, lines: ['Swipe through the story →'], theme: 'rose' },
    ...ev.map((e) => ({ kicker: e.year, title: e.title, lines: splitLines(e.detail, 3), theme: 'rose', plain: true })),
  ];
  const scenes = [
    { text: a.title, sub: `${a.subject || ''} timeline`, durationMs: 3200, theme: 'rose' },
    ...ev.map((e) => ({ text: `${e.year}: ${e.title}`, sub: e.detail, durationMs: 4200, theme: 'rose' })),
    { text: 'Follow @syllab.in', sub: 'history & science, visual', durationMs: 2400, theme: 'cta' },
  ];
  const cap = caption({ hook: `🕰️ ${a.title} — the full timeline`, value: ev.map((e) => `${e.year} — ${e.title}`).join('\n'), question: 'Which era fascinates you? 👇', kind: a.subject === 'Physics' || a.subject === 'Chemistry' ? 'science' : 'gk', topic: a.topic, seed });
  return { slides, scenes, caption: cap, keys: [a.key], topic: a.topic };
}

/* ── day plan ────────────────────────────────────────────────────────────── */

/**
 * Build today's 10-post plan: 5 reels, 3 carousels, 2 images. Pulls only unseen
 * atoms; marks them used (unless dryMark=false). Deterministic per `seed` (use a
 * date-derived integer so each day differs but a given day is reproducible).
 */
const BUILDERS = {
  gk: fromGk, pyq: fromPyq, funfact: fromFunFact, mcq: fromMcq, formula: fromFormula,
  concept: fromConcept, tip: fromTip, glossary: fromGlossary, difference: fromDifference,
  coding: fromCoding, timeline: fromTimeline,
};
// Candidate kinds per format, in priority order. Rotated by day so the daily mix
// of content types keeps changing. 'fullform' is special (bundles 6 atoms).
const REEL_KINDS = ['funfact', 'gk', 'timeline', 'pyq', 'mcq', 'formula', 'difference', 'coding', 'fullform', 'concept', 'tip', 'glossary'];
const CAROUSEL_KINDS = ['timeline', 'formula', 'difference', 'pyq', 'gk', 'mcq'];
const IMAGE_KINDS = ['coding', 'concept', 'tip', 'glossary', 'funfact', 'gk', 'mcq'];

// Post-mix per day — video-weighted (reels get the most reach). Env-overridable.
const N_REELS = parseInt(process.env.IG_REELS || '6', 10);
const N_CAROUSELS = parseInt(process.env.IG_CAROUSELS || '3', 10);
const N_IMAGES = parseInt(process.env.IG_IMAGES || '2', 10);
const rotate = (arr, n) => { const k = ((n % arr.length) + arr.length) % arr.length; return [...arr.slice(k), ...arr.slice(0, k)]; };

export async function buildDayPlan(seed = 1, { commit = true } = {}) {
  const atoms = await loadAtoms();
  const by = (k) => atoms.filter((a) => a.kind === k);
  const taken = new Set();

  const pickOne = (kind, s) => {
    const [x] = pickUnseen(by(kind).filter((a) => !taken.has(a.key)), 1, s);
    if (x) taken.add(x.key);
    return x;
  };

  const posts = [];
  const push = (format, built) => { if (built) posts.push({ format, ...built, seed }); };

  // Fill a format quota by rotating through its candidate kinds (skipping empties).
  function fill(format, kinds, count) {
    const order = rotate(kinds, seed);
    let filled = 0;
    for (let step = 0; step < order.length * 3 && filled < count; step++) {
      const kind = order[step % order.length];
      const s = seed + step * 7;
      if (kind === 'fullform') {
        const picks = pickUnseen(by('fullform').filter((a) => !taken.has(a.key)), 6, s);
        if (picks.length >= 3) { picks.forEach((a) => taken.add(a.key)); push(format, fromFullForms(picks, seed)); filled++; }
        continue;
      }
      const a = pickOne(kind, s);
      if (a) { push(format, BUILDERS[kind](a, seed)); filled++; }
    }
  }

  fill('reel', REEL_KINDS, N_REELS);
  fill('carousel', CAROUSEL_KINDS, N_CAROUSELS);
  fill('image', IMAGE_KINDS, N_IMAGES);

  // Assign each reel a DISTINCT music track for the day (sequential index +
  // day-seed offset → the 5 daily reels get 5 different calm tracks, and the set
  // rotates across days).
  let rc = 0;
  for (const p of posts) if (p.format === 'reel') p.audioPick = seed + (rc++);

  if (commit) markUsed(posts.flatMap((p) => p.keys));
  return posts;
}

/* ── tiny text utils ─────────────────────────────────────────────────────── */
function splitLines(text, max) {
  // Preserve author line breaks (e.g. step-by-step maths) as separate lines,
  // then word-wrap each to fit the slide width.
  const paras = String(text || '').split(/\r?\n+/).map((p) => p.replace(/[ \t]+/g, ' ').trim()).filter(Boolean);
  const lines = [];
  for (const para of paras) {
    let cur = '';
    for (const w of para.split(' ')) {
      if ((cur + ' ' + w).trim().length > 36) { if (cur) lines.push(cur.trim()); cur = w; }
      else cur = (cur + ' ' + w).trim();
    }
    if (cur) lines.push(cur.trim());
    if (lines.length >= max) break;
  }
  return lines.slice(0, max);
}
function clip(s, n) { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length <= n ? t : t.slice(0, n - 1) + '…'; }
