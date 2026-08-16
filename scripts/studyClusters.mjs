/**
 * studyClusters.mjs — sitemap/prerender readers for the Full Forms, Glossary
 * and Revision Notes clusters. Each reads its src/data/*.ts file (whose array
 * body is valid JSON) so the build never drifts. Returns minimal route data.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

function readArray(root, file, marker) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', file), 'utf8');
    const s = ts.indexOf(marker);
    if (s < 0) return [];
    const from = s + marker.length;
    const e = ts.indexOf('\n];', from);
    if (e < 0) return [];
    return JSON.parse(ts.slice(from, e + 2).trim());
  } catch { return []; }
}

export function getFullForms(root) {
  return readArray(root, 'fullForms.ts', 'export const FULL_FORMS: FullForm[] = ')
    .filter((f) => f && f.slug && f.term)
    .map((f) => ({ slug: f.slug, term: f.term, fullForm: f.fullForm, category: f.category, description: String(f.description || '').slice(0, 155) }));
}

export function getGlossary(root) {
  return readArray(root, 'glossary.ts', 'export const GLOSSARY: GlossaryTerm[] = ')
    .filter((g) => g && g.slug && g.term)
    .map((g) => ({ slug: g.slug, term: g.term, category: g.category, classLevel: g.classLevel, definition: String(g.definition || '').slice(0, 155), defFull: String(g.definition || ''), explanation: String(g.explanation || ''), example: String(g.example || ''), faqs: Array.isArray(g.faqs) ? g.faqs : [] }));
}

export function getRevisionNotes(root) {
  return readArray(root, 'revisionNotes.ts', 'export const REVISION_NOTES: RevisionNote[] = ')
    .filter((r) => r && r.slug && r.chapter)
    .map((r) => ({ slug: r.slug, classLevel: r.classLevel, subject: r.subject, chapter: r.chapter, intro: String(r.intro || '').slice(0, 155), sections: Array.isArray(r.sections) ? r.sections : [], keyTerms: Array.isArray(r.keyTerms) ? r.keyTerms : [], faqs: Array.isArray(r.faqs) ? r.faqs : [] }));
}

export function getSamplePapers(root) {
  return readArray(root, 'samplePapers.ts', 'export const SAMPLE_PAPERS: SamplePaper[] = ')
    .filter((p) => p && p.slug && p.title)
    // `intro` stays clipped for the meta description; the prerender needs the
    // FULL paper (sections, passages, questions, answers) to emit a crawlable
    // body. Before this it got only these five fields, so every
    // /sample-papers/* page shipped a title and no content whatsoever.
    .map((p) => ({
      slug: p.slug,
      classLevel: p.classLevel,
      subject: p.subject,
      title: p.title,
      intro: String(p.intro || '').slice(0, 155),
      introFull: String(p.intro || ''),
      board: p.board || 'CBSE',
      duration: p.duration || '',
      totalMarks: p.totalMarks || 0,
      sections: Array.isArray(p.sections) ? p.sections : [],
      faqs: Array.isArray(p.faqs) ? p.faqs : [],
    }));
}

export function getFormulaSheets(root) {
  // 8 subject overview sheets + ~90 per-chapter sheets (auto-generated from banks).
  const base = readArray(root, 'formulaSheets.ts', 'export const FORMULA_SHEETS: FormulaSheet[] = ');
  const chapters = readArray(root, 'formulaSheetsChapters.ts', 'export const FORMULA_SHEETS_CHAPTERS: FormulaSheet[] = ');
  return [...(Array.isArray(base) ? base : []), ...(Array.isArray(chapters) ? chapters : [])]
    .filter((s) => s && s.slug && s.title)
    .map((s) => ({ slug: s.slug, title: s.title, classLevel: s.classLevel, subject: s.subject, intro: s.intro || '', sections: Array.isArray(s.sections) ? s.sections : [], faqs: Array.isArray(s.faqs) ? s.faqs : [] }));
}

export function getMathsTables(root) {
  return readArray(root, 'mathsTables.ts', 'export const MATHS_TABLES: MathRef[] = ')
    .filter((m) => m && m.slug && m.title)
    .map((m) => ({ slug: m.slug, title: m.title, intro: String(m.intro || '').slice(0, 155), category: m.category || '', columns: Array.isArray(m.columns) ? m.columns : [], rows: Array.isArray(m.rows) ? m.rows : [], faqs: Array.isArray(m.faqs) ? m.faqs : [] }));
}
export function getEnglishWriting(root) {
  // This projection used to keep only slug, title and a 155-char intro, so the
  // prerenderer emitted ~145 crawlable words per page while the React page —
  // which imports the full module directly — showed the model answer, the
  // format, the tips and the FAQs. Users saw ~316 words and Google saw 145, on
  // pages already ranking 5th-10th with 4,713 impressions in the 2026-08-13
  // export. Everything the detail page renders is carried through now.
  return readArray(root, 'englishWriting.ts', 'export const ENGLISH_WRITING: EnglishWriting[] = ')
    .filter((e) => e && e.slug && e.title)
    .map((e) => ({
      slug: e.slug, title: e.title, classLevel: e.classLevel, category: e.category,
      intro: String(e.intro || '').slice(0, 155),
      format: Array.isArray(e.format) ? e.format : [],
      sample: String(e.sample || ''),
      tips: Array.isArray(e.tips) ? e.tips : [],
      faqs: Array.isArray(e.faqs) ? e.faqs : [],
    }));
}
export function getChapterMcqs(root) {
  return readArray(root, 'chapterMcqs.ts', 'export const MCQ_CHAPTERS: McqChapter[] = ')
    .filter((m) => m && m.slug && m.chapter)
    // caseStudies must be carried through: this projection drops anything not
    // named here, and a case-study passage that never reaches the prerenderer
    // would leave its questions referring to a passage the page does not show.
    .map((m) => ({ slug: m.slug, classLevel: m.classLevel, subject: m.subject, chapter: m.chapter, intro: String(m.intro || '').slice(0, 155), mcqs: Array.isArray(m.mcqs) ? m.mcqs : [], caseStudies: Array.isArray(m.caseStudies) ? m.caseStudies : [], faqs: Array.isArray(m.faqs) ? m.faqs : [] }));
}
export function getStaticGk(root) {
  return readArray(root, 'staticGk.ts', 'export const GK_TOPICS: GkTopic[] = ')
    .filter((g) => g && g.slug && g.title)
    .map((g) => ({ slug: g.slug, title: g.title, category: g.category || '', intro: String(g.intro || '').slice(0, 155), items: Array.isArray(g.items) ? g.items : [], faqs: Array.isArray(g.faqs) ? g.faqs : [] }));
}
export function getEnglishVocab(root) {
  return readArray(root, 'englishVocab.ts', 'export const VOCAB_SETS: VocabSet[] = ')
    .filter((v) => v && v.slug && v.title)
    .map((v) => ({ slug: v.slug, title: v.title, category: v.category || '', intro: String(v.intro || '').slice(0, 155), items: Array.isArray(v.items) ? v.items : [], faqs: Array.isArray(v.faqs) ? v.faqs : [] }));
}
export function getEnglishLiterature(root) {
  return readArray(root, 'englishLiterature.ts', 'export const LIT_CHAPTERS: LitChapter[] = ')
    .filter((l) => l && l.slug && l.chapter)
    .map((l) => ({ slug: l.slug, classLevel: l.classLevel, book: l.book, chapter: l.chapter, intro: String(l.intro || '').slice(0, 155), summary: String(l.summary || ''), characters: Array.isArray(l.characters) ? l.characters : [], themes: Array.isArray(l.themes) ? l.themes : [], faqs: Array.isArray(l.faqs) ? l.faqs : [] }));
}
export function getConcepts(root) {
  return readArray(root, 'conceptExplainers.ts', 'export const CONCEPT_EXPLAINERS: ConceptExplainer[] = ')
    .filter((c) => c && c.slug && c.title)
    // This projection kept intro + faqs and dropped sections, examples,
    // realLife and commonMistakes — about 112,900 words across 147 records.
    // /concepts is the site's LARGEST source of impressions (8,730 across 38
    // pages in the 2026-08-13 export, one page alone at 3,831 at position 9),
    // and every one of those pages was ranking on roughly a quarter of the
    // content already written for it.
    .map((c) => ({
      slug: c.slug, title: c.title, subject: c.subject, classLevel: c.classLevel,
      intro: String(c.intro || '').slice(0, 155),
      sections: Array.isArray(c.sections) ? c.sections : [],
      examples: Array.isArray(c.examples) ? c.examples : [],
      realLife: Array.isArray(c.realLife) ? c.realLife : [],
      commonMistakes: Array.isArray(c.commonMistakes) ? c.commonMistakes : [],
      faqs: Array.isArray(c.faqs) ? c.faqs : [],
    }));
}
export function getSolvedExamples(root) {
  return readArray(root, 'solvedExamples.ts', 'export const SOLVED_SETS: SolvedSet[] = ')
    .filter((s) => s && s.slug && s.chapter)
    .map((s) => ({ slug: s.slug, classLevel: s.classLevel, subject: s.subject, chapter: s.chapter, intro: String(s.intro || '').slice(0, 155), examples: Array.isArray(s.examples) ? s.examples : [], tips: Array.isArray(s.tips) ? s.tips : [], faqs: Array.isArray(s.faqs) ? s.faqs : [] }));
}
export function getLabPracticals(root) {
  return readArray(root, 'labPracticals.ts', 'export const LAB_PRACTICALS: LabPractical[] = ')
    .filter((l) => l && l.slug && l.title)
    .map((l) => ({ slug: l.slug, classLevel: l.classLevel, subject: l.subject, title: l.title, intro: String(l.aim || '').slice(0, 155), aim: String(l.aim || ''), materials: Array.isArray(l.materials) ? l.materials : [], theory: String(l.theory || ''), procedure: Array.isArray(l.procedure) ? l.procedure : [], observation: String(l.observation || ''), result: String(l.result || ''), precautions: Array.isArray(l.precautions) ? l.precautions : [], viva: Array.isArray(l.viva) ? l.viva : [] }));
}
// visualLessons.ts builds SVG via helper fns (not pure JSON), so extract route
// metadata with regex over each object's leading fields instead of JSON.parse.
export function getPyqs(root) {
  return readArray(root, 'pyqs.ts', 'export const PYQ_CHAPTERS: PyqChapter[] = ')
    .filter((c) => c && c.slug && c.chapter)
    .map((c) => ({ slug: c.slug, classLevel: c.classLevel, subject: c.subject, chapter: c.chapter, title: `${c.chapter} (${c.classLevel} ${c.subject})`, intro: String(c.intro || '').slice(0, 155), questions: Array.isArray(c.questions) ? c.questions : [], faqs: Array.isArray(c.faqs) ? c.faqs : [] }));
}
export function getVisualLessons(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'visualLessons.ts'), 'utf8');
    const start = ts.indexOf('export const VISUAL_LESSONS');
    if (start < 0) return [];
    const body = ts.slice(start);
    const out = [];
    const re = /slug:\s*'([^']+)',\s*\n\s*title:\s*'([^']+)',\s*\n\s*subject:\s*'([^']+)',\s*\n\s*classLevel:\s*'([^']+)',\s*\n\s*intro:\s*'([^']*)'/g;
    let m;
    while ((m = re.exec(body)) !== null) {
      out.push({ slug: m[1], title: m[2], subject: m[3], classLevel: m[4], intro: m[5].slice(0, 155) });
    }
    return out;
  } catch { return []; }
}
// whatToStudy.ts — single-quoted; fields are slug, classLevel, subject (subject on
// the same line as classLevel). Build a label from class + subject.
export function getWhatToStudy(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'whatToStudy.ts'), 'utf8');
    const start = ts.indexOf('export const WEIGHTAGE_SUBJECTS');
    if (start < 0) return [];
    const body = ts.slice(start);
    const out = [];
    const re = /slug:\s*'([^']+)',\s*\n\s*classLevel:\s*'([^']+)',\s*subject:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(body)) !== null) {
      out.push({ slug: m[1], classLevel: m[2], subject: m[3], title: `${m[2]} ${m[3]}`, intro: `Most important chapters in ${m[2]} ${m[3]} by marks weightage.` });
    }
    return out;
  } catch { return []; }
}
// timelines.ts is also single-quoted hand-authored data → regex extract.
export function getTimelines(root) {
  try {
    const ts = readFileSync(path.join(root, 'src', 'data', 'timelines.ts'), 'utf8');
    const start = ts.indexOf('export const TIMELINES');
    if (start < 0) return [];
    const body = ts.slice(start);
    const out = [];
    const re = /slug:\s*'([^']+)',\s*\n\s*title:\s*'([^']+)',\s*\n\s*subject:\s*'([^']+)',\s*\n\s*classLevel:\s*'([^']+)',\s*\n\s*intro:\s*'([^']*)'/g;
    const heads = [];
    let m;
    while ((m = re.exec(body)) !== null) {
      heads.push({ index: m.index, slug: m[1], title: m[2], subject: m[3], classLevel: m[4], intro: m[5] });
    }
    const evRe = /\{\s*year:\s*'([^']*)',\s*title:\s*'([^']*)',\s*detail:\s*'([^']*)'\s*\}/g;
    for (let i = 0; i < heads.length; i++) {
      const h = heads[i];
      const block = body.slice(h.index, i + 1 < heads.length ? heads[i + 1].index : undefined);
      const why = (block.match(/whyItMatters:\s*'([^']*)'/) || [])[1] || '';
      const events = [];
      let e;
      while ((e = evRe.exec(block)) !== null) events.push({ year: e[1], title: e[2], detail: e[3] });
      out.push({ slug: h.slug, title: h.title, subject: h.subject, classLevel: h.classLevel, intro: h.intro.slice(0, 155), whyItMatters: why, events });
    }
    return out;
  } catch { return []; }
}
