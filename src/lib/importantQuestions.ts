/**
 * Important-questions generator — turns a chapter (title + key topics) into a set
 * of 15+ ORIGINAL, board-exam-style DESCRIPTIVE questions (not MCQs), modelled on
 * CBSE / state-board / intermediate paper patterns. Deterministic (no API cost, so
 * it's free and fully indexable). The AI tutor answers any of them as a full
 * marks-based answer on demand. We generate original exam-pattern questions (we do
 * not reproduce copyrighted past papers).
 */
export interface ExamQuestion { q: string; marks: number; }

interface QChapter { title: string; subject: string; topics?: string[]; }

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Clean the chapter's topic list: drop the subject name + the title itself + dupes. */
function cleanTopics(ch: QChapter): string[] {
  const subj = ch.subject.toLowerCase();
  const title = ch.title.toLowerCase();
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of ch.topics || []) {
    const k = t.trim();
    const lk = k.toLowerCase();
    if (!k || lk === subj || lk === title || seen.has(lk)) continue;
    seen.add(lk);
    out.push(k);
  }
  return out.slice(0, 8);
}

/** Decide subject "family" to pick the right question styles. */
function family(subject: string): 'numeric' | 'bio' | 'social' | 'language' | 'general' {
  const s = subject.toLowerCase();
  if (/(physics|chemistry|math|account|economics)/.test(s)) return 'numeric';
  if (/(biology|science|the world around us)/.test(s)) return 'bio';
  if (/(social|history|geograph|civics|polit)/.test(s)) return 'social';
  if (/(english|hindi|sanskrit|language)/.test(s)) return 'language';
  return 'general';
}

export function generateExamQuestions(ch: QChapter): ExamQuestion[] {
  const T = ch.title;
  const topics = cleanTopics(ch);
  const fam = family(ch.subject);
  const qs: ExamQuestion[] = [];
  const push = (q: string, marks: number) => { if (!qs.some((x) => x.q === q)) qs.push({ q, marks }); };

  // Chapter-level openers (every chapter)
  push(`Explain "${T}" in detail, covering its main concepts.`, 5);
  push(`Define the important terms used in the chapter "${T}".`, 3);
  push(`Write the key points to remember in "${T}" for the exam.`, 2);

  // Per-topic descriptive questions (the bulk) — cycle verbs for variety.
  const verbs = ['Explain', 'Describe', 'Write a short note on', 'Discuss', 'Briefly explain', 'Elaborate on'];
  topics.forEach((t, i) => {
    push(`${verbs[i % verbs.length]} "${t}" with a suitable example.`, i % 2 === 0 ? 3 : 5);
  });

  // A "compare/contrast" if we have ≥2 topics.
  if (topics.length >= 2) push(`Differentiate between "${topics[0]}" and "${topics[1]}".`, 3);
  if (topics.length >= 4) push(`Compare "${topics[2]}" and "${topics[3]}" with examples.`, 3);

  // Subject-family specific styles
  if (fam === 'numeric') {
    push(`State and derive (or explain) the main law/formula related to "${T}".`, 5);
    if (topics[0]) push(`Solve a numerical problem based on "${topics[0]}".`, 3);
    if (topics[1]) push(`Solve and explain an example/problem involving "${topics[1]}".`, 3);
    push(`Prove or justify an important result from "${T}" step by step.`, 5);
  } else if (fam === 'bio') {
    if (topics[0]) push(`With a neat, labelled diagram, explain "${topics[0]}".`, 5);
    push(`Describe the process/structure studied in "${T}" with a diagram.`, 5);
    if (topics[1]) push(`Give reasons / explain the function of "${topics[1]}".`, 3);
  } else if (fam === 'social') {
    push(`Discuss the causes and effects related to "${T}".`, 5);
    if (topics[0]) push(`Explain the significance of "${topics[0]}" with examples.`, 5);
    push(`On a map / timeline, locate and describe the key events or places in "${T}".`, 4);
  } else if (fam === 'language') {
    push(`Explain the central theme/idea of "${T}".`, 5);
    push(`Answer with reference to context: pick a key line/idea from "${T}" and explain it.`, 4);
    push(`Describe the characters / main points in "${T}" in your own words.`, 5);
  }

  // Application + long-answer closers (every chapter)
  push(`What are the real-life applications or importance of "${T}"? Give examples.`, 3);
  push(`Long answer: discuss "${T}" thoroughly, covering all the key concepts a student should know for the board exam.`, 5);
  push(`List the common mistakes students make in "${T}" and how to avoid them.`, 2);

  // Guarantee at least 15 by padding with focused topic prompts if needed.
  let i = 0;
  while (qs.length < 15 && (topics.length || true)) {
    const t = topics[i % Math.max(1, topics.length)] || T;
    push(`Exam question: explain an important concept related to "${t}" and how it is tested.`, 3);
    i++;
    if (i > 20) break;
  }
  return qs;
}
