/**
 * hashtags.mjs — 2026 algorithm-aware hashtag strategy.
 *
 * Modern Instagram ranks reach on RELEVANCE, not volume. Best practice:
 *   • 8–15 tags, not 30.
 *   • A pyramid mix: 2–3 BROAD (>1M, discovery), 4–6 MEDIUM (100k–1M, rankable),
 *     3–5 NICHE (<100k, easy to rank + high intent), 1–2 BRANDED.
 *   • Rotate pools so Instagram doesn't see the identical tag block every post
 *     (repeated identical blocks look spammy and get throttled).
 *   • Always topical to the post (irrelevant tags hurt reach now).
 */

const BROAD = ['#education', '#study', '#students', '#learning', '#exam', '#school'];
const MEDIUM = [
  '#cbse', '#ncert', '#jee', '#neet', '#class10', '#class12', '#boardexam',
  '#studytips', '#studymotivation', '#indianstudents', '#competitiveexams',
  '#studygram', '#exampreparation', '#freeeducation',
];
const BRANDED = ['#syllab', '#syllabin'];

const NICHE = {
  gk: ['#gkquiz', '#generalknowledge', '#gkquestions', '#dailygk', '#quiztime', '#gkfacts', '#staticgk'],
  funfact: ['#didyouknow', '#funfacts', '#amazingfacts', '#factsdaily', '#knowledgeispower', '#curiousminds'],
  pyq: ['#previousyearquestions', '#pyq', '#boardexam2026', '#cbseclass10', '#cbseclass12', '#samplepaper', '#importantquestions'],
  fullform: ['#fullforms', '#abbreviations', '#gkforkids', '#vocabulary', '#englishlearning'],
  quiz: ['#quizchallenge', '#brainteaser', '#dailyquiz', '#testyourself', '#quizzes'],
  maths: ['#mathstricks', '#vedicmaths', '#mathshortcuts', '#maths', '#mathsisfun', '#class10maths'],
  science: ['#sciencefacts', '#physics', '#chemistry', '#biology', '#scienceisfun', '#neetpreparation'],
  motivation: ['#studymotivation', '#studyhard', '#topperstips', '#examstress', '#studyroutine', '#focus'],
  coding: ['#coding', '#python', '#learntocode', '#codingforkids', '#programming', '#tech'],
  english: ['#englishgrammar', '#vocabulary', '#spokenenglish', '#learnenglish', '#englishspeaking'],
};

function shuffleSeeded(arr, seed) {
  return [...arr].sort((a, b) => h(a + seed) - h(b + seed));
}
function take(arr, n, seed) { return shuffleSeeded(arr, seed).slice(0, n); }

/**
 * Build a relevance-first, rotated hashtag set.
 * @returns {{ inCaption: string[], firstComment: string[] }}
 */
export function buildHashtags({ kind = 'gk', topic = '', subject = '', seed = 0 } = {}) {
  const t = (topic || subject || '').toLowerCase();
  let niche = NICHE[kind] || NICHE.quiz;
  // Layer in subject/topic niche pool when we recognise it.
  for (const k of Object.keys(NICHE)) {
    if (t.includes(k)) niche = [...new Set([...(NICHE[k]), ...niche])];
  }

  const inCaption = [
    ...take(BROAD, 2, seed),
    ...take(MEDIUM, 5, seed + 1),
    ...take(niche, 5, seed + 2),
    ...take(BRANDED, 1, seed),
  ];
  // Extra tags for the first comment (keeps the caption clean while still
  // contributing to discovery — a common growth tactic).
  const firstComment = [
    ...take(MEDIUM, 6, seed + 3).filter((x) => !inCaption.includes(x)),
    ...take(niche, 6, seed + 4).filter((x) => !inCaption.includes(x)),
    ...take(BROAD, 3, seed + 5).filter((x) => !inCaption.includes(x)),
    BRANDED[1],
  ];
  return {
    inCaption: [...new Set(inCaption)],
    firstComment: [...new Set(firstComment)].slice(0, 15),
  };
}

function h(s) {
  let x = 2166136261;
  for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); }
  return (x >>> 0) / 0xffffffff;
}
