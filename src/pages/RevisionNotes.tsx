/**
 * RevisionNotes — concise per-chapter CBSE revision notes.
 * /revision-notes + /revision-notes/{slug}.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, NotebookPen } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { REVISION_NOTES, getRevisionNote, type RevisionNote } from '../data/revisionNotes';
import { useDeep, type DeepTopic } from '../components/deepContent';
import QuizItem from '../components/QuizItem';
import { exportArticleAsPDF } from '../lib/printPdf';
import { Download } from 'lucide-react';
import { usePathname } from '../lib/isomorphic';

/* Deep teaching content for the chapters that carry GSC impressions. Fetched,
 * never imported — see src/components/deepContent.tsx. The prerenderer reads
 * the same file, so crawled and hydrated HTML match. */
const DEEP_URL = '/rn-deep.json';

/**
 * Build the printable revision sheet.
 *
 * Deliberately NOT the whole page. The deep body runs to ~5,000 words, which is
 * a chapter to read, not a sheet to revise from the night before an exam. What
 * is pulled in is the material that earns its place on paper: the one-minute
 * recap, the worked numericals, the mistakes that cost marks, and the glossary.
 * The long-form explainers, board answers and assertion-reason sets stay on the
 * page, where they are searchable and interactive.
 */
function downloadNotePdf(note: RevisionNote, deep: DeepTopic | null) {
  // Chapter key terms first, then any glossary entry that adds a new term.
  const seen = new Set(note.keyTerms.map((t) => t.term.toLowerCase()));
  const terms = [
    ...note.keyTerms.map((t) => `• ${t.term}: ${t.meaning}`),
    ...(deep?.glossary ?? [])
      .filter((g) => !seen.has(g.term.toLowerCase()))
      .map((g) => `• ${g.term}: ${g.def}`),
  ];
  const faqs = [...note.faqs, ...(deep?.extraFaqs ?? [])];

  const sections = [
    { heading: 'Overview', body: note.intro },
    ...((deep?.revision ?? []).length
      ? [{ heading: 'One-Minute Revision', body: deep!.revision!.map((r) => `★ ${r}`).join('\n') }]
      : []),
    ...note.sections.map((s) => ({ heading: s.heading, body: s.points.map((p) => `• ${p}`).join('\n') })),
    ...((deep?.numericals ?? []).length
      ? [{
          heading: 'Solved Numericals',
          body: deep!.numericals!
            .map((n, i) => `${i + 1}. ${n.q}\n${n.steps.map((s) => `   – ${s}`).join('\n')}\n   Answer: ${n.answer}`)
            .join('\n\n'),
        }]
      : []),
    ...((deep?.mistakes ?? []).length
      ? [{ heading: 'Common Mistakes to Avoid', body: deep!.mistakes!.map((m) => `⚠ ${m}`).join('\n') }]
      : []),
    ...(terms.length ? [{ heading: 'Key Terms', body: terms.join('\n') }] : []),
    ...(faqs.length ? [{ heading: 'FAQs', body: faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: `${note.chapter} — Revision Notes`, subtitle: `${note.classLevel} · ${note.subject} · CBSE`, sections });
}

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/revision-notes\/([a-z0-9-]+)/); return m ? m[1] : null; };

/* Hub copy is DERIVED from the data, never hardcoded. It previously read
 * "Class 9 & 10" while the cluster had grown to cover Classes 7-12, and that
 * kind of drift is invisible until someone reads the meta description. */
const CLASS_NUMS = [...new Set(REVISION_NOTES.map((r) => Number(r.classLevel.replace(/\D/g, ''))))]
  .filter(Boolean).sort((a, b) => a - b);
const CLASS_RANGE = CLASS_NUMS.length > 1
  ? `Class ${CLASS_NUMS[0]}-${CLASS_NUMS[CLASS_NUMS.length - 1]}`
  : `Class ${CLASS_NUMS[0]}`;
// Top three subjects by chapter count only — naming all six overruns the 160
// character meta-description limit.
const SUBJECT_LIST = (() => {
  const n: Record<string, number> = {};
  REVISION_NOTES.forEach((r) => { n[r.subject] = (n[r.subject] ?? 0) + 1; });
  const s = Object.keys(n).sort((a, b) => n[b] - n[a]).slice(0, 3);
  return s.length > 1 ? `${s.slice(0, -1).join(', ')} and ${s[s.length - 1]}` : s[0];
})();
const CLASS_KEYWORDS = CLASS_NUMS.map((n) => `class ${n} revision notes`).join(', ');

export default function RevisionNotes({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  const [query, setQuery] = useState('');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => { if (window.location.pathname !== to) window.history.pushState({}, '', to); setPath(to); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slug = parseSlug(path);
  const note = slug ? getRevisionNote(slug) : null;

  // All hooks must run on every render (before any early return) — otherwise
  // navigating index↔detail changes the hook count and React throws.
  const groups = useMemo(() => [...new Set(REVISION_NOTES.map((r) => `${r.classLevel} ${r.subject}`))], []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? REVISION_NOTES.filter((r) => r.chapter.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q)) : REVISION_NOTES), [q]);

  if (note) return <Detail note={note} go={go} setTab={setTab} />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title={`CBSE Revision Notes ${CLASS_RANGE} — Quick Chapter Notes | Syllab.in`}
        description={`Free CBSE revision notes — ${REVISION_NOTES.length} chapter-wise notes for ${CLASS_RANGE} ${SUBJECT_LIST}, with key points, formulas and FAQs. NCERT aligned.`}
        keywords={`CBSE revision notes, ${CLASS_KEYWORDS}, quick revision notes, NCERT chapter notes, board exam revision`}
        url={`${SITE}/revision-notes`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'CBSE Revision Notes', url: `${SITE}/revision-notes`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="📝" title="Revision Notes" subtitle="Fast, chapter-wise CBSE revision notes — key points, formulas and terms to revise an entire chapter in minutes before your exam." className="mb-6" />
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Search size={16} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chapter e.g. Electricity, Triangles…" className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200" />
      </div>
      {(q ? [['Results', filtered]] as [string, RevisionNote[]][] : groups.map((g) => [g, filtered.filter((r) => `${r.classLevel} ${r.subject}` === g)] as [string, RevisionNote[]])).map(([grp, list]) => (
        list.length ? (
          <section key={grp} className="mb-6">
            <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{grp}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((r) => (
                <button key={r.slug} onClick={() => go(`/revision-notes/${r.slug}`)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary dark:border-slate-700 dark:bg-slate-800">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{r.chapter}</span>
                  <ArrowRight size={15} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </section>
        ) : null
      ))}
      {!filtered.length && <p className="text-sm font-semibold text-slate-400">No notes found for “{query}”.</p>}
    </div>
  );
}

/** The deep teaching block. Block order matches rnDeepHtml() in the prerenderer
 *  so the crawled and hydrated pages read identically. */
function DeepBody({ deep }: { deep: DeepTopic }) {
  const H2 = 'mb-2 mt-8 text-lg font-black text-slate-900 dark:text-slate-100';
  const P = 'mt-3 leading-relaxed text-slate-700 dark:text-slate-300';
  return (
    <>
      {(deep.explainers ?? []).map((e, i) => (
        <section key={`e${i}`}>
          <h2 className={H2}>{e.term}</h2>
          {e.paras.map((p, j) => <p key={j} className={P}>{p}</p>)}
        </section>
      ))}

      {(deep.sections ?? []).map((s, i) => (
        <section key={`s${i}`}>
          <h2 className={H2}>{s.h}</h2>
          {(s.paras ?? []).map((p, j) => <p key={j} className={P}>{p}</p>)}
          {(s.bullets ?? []).length > 0 && (
            <ul className="mt-3 space-y-2">
              {s.bullets!.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-0.5 text-primary">•</span> {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {(deep.numericals ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Solved Numericals — Step by Step</h2>
          <div className="mt-3 space-y-3">
            {deep.numericals!.map((n, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-100">Problem {i + 1}. {n.q}</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {n.steps.map((s, j) => <li key={j}>{s}</li>)}
                </ol>
                <p className="mt-2 rounded-xl bg-emerald-50 p-2 text-sm font-black text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">Answer: {n.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(deep.examples ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Worked Examples</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {deep.examples!.map((x, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-700 dark:bg-slate-800/40">
                <p className="text-sm font-black text-slate-900 dark:text-slate-100">{x.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{x.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(deep.mistakes ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Common Mistakes Students Make</h2>
          <ul className="mt-3 space-y-2">
            {deep.mistakes!.map((m, i) => (
              <li key={i} className="flex gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <span className="mt-0.5 shrink-0">⚠</span> {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(deep.applications ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Where This Shows Up in Real Life</h2>
          {deep.applications!.map((a, i) => (
            <div key={i} className="mt-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">{a.h}</h3>
              <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{a.d}</p>
            </div>
          ))}
        </section>
      )}

      {(deep.boardQuestions ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Board-Style Questions with Model Answers</h2>
          <div className="mt-3 space-y-3">
            {deep.boardQuestions!.map((b, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">
                  {b.q} <span className="text-xs font-black text-slate-400">({b.marks} marks)</span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{b.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {(deep.assertionReason ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Assertion–Reason Questions (CBSE Format)</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Choose: (a) both A and R are true and R correctly explains A; (b) both true but R does not explain A;
            (c) A true, R false; (d) A false, R true.
          </p>
          <div className="mt-3 space-y-3">
            {deep.assertionReason!.map((x, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer text-sm font-bold text-slate-900 dark:text-slate-100">
                  {i + 1}. A: {x.assertion} — R: {x.reason}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <strong className="text-emerald-600">Answer: ({x.answer})</strong> — {x.why}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {(deep.quiz ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Quick Self-Check</h2>
          <div className="mt-3 space-y-3">
            {deep.quiz!.map((q, i) => <QuizItem key={i} item={q} n={i + 1} />)}
          </div>
        </section>
      )}

      {(deep.glossary ?? []).length > 0 && (
        <section>
          <h2 className={H2}>Key Terms Glossary</h2>
          <dl className="mt-3 space-y-2">
            {deep.glossary!.map((g, i) => (
              <div key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40">
                <dt className="text-sm font-black text-slate-900 dark:text-slate-100">{g.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{g.def}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {(deep.revision ?? []).length > 0 && (
        <section>
          <h2 className={H2}>One-Minute Revision</h2>
          <ul className="mt-3 space-y-2">
            {deep.revision!.map((r, i) => (
              <li key={i} className="flex gap-2 rounded-xl bg-primary/5 p-3 text-sm leading-relaxed text-slate-800 dark:bg-primary/10 dark:text-slate-200">
                <span className="mt-0.5 shrink-0 text-primary">★</span> {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {deep.ncertRef && (
        <p className="mt-6 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400">
          Syllabus reference: {deep.ncertRef}
        </p>
      )}
    </>
  );
}

function Detail({ note, go, setTab }: { note: RevisionNote; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = REVISION_NOTES.filter((r) => r.classLevel === note.classLevel && r.subject === note.subject && r.slug !== note.slug).slice(0, 6);
  const deep = useDeep(DEEP_URL, note.slug);
  // Deep entries carry extra FAQs; they join the on-page list AND the schema,
  // exactly as the prerenderer does, so crawled and hydrated pages agree.
  const faqs = [...note.faqs, ...(deep?.extraFaqs ?? [])];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title={`${note.chapter} Class ${note.classLevel.replace('Class ', '')} ${note.subject} — Revision Notes | Syllab.in`}
        description={`${note.intro} Free quick revision notes for ${note.classLevel} ${note.subject} chapter ${note.chapter} — key points, formulas and FAQs for CBSE board exam prep.`.slice(0, 160)}
        keywords={`${note.chapter.toLowerCase()} revision notes, ${note.classLevel.toLowerCase()} ${note.subject.toLowerCase()} ${note.chapter.toLowerCase()} notes, ${note.chapter.toLowerCase()} class ${note.classLevel.replace('Class ', '')} notes, cbse ${note.subject.toLowerCase()} notes`}
        url={`${SITE}/revision-notes/${note.slug}`}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Article', headline: `${note.chapter} — ${note.classLevel} ${note.subject} Revision Notes`, description: note.intro, inLanguage: 'en-IN', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' }, publisher: { '@type': 'Organization', name: 'Syllab.in' }, mainEntityOfPage: `${SITE}/revision-notes/${note.slug}` },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Revision Notes', item: `${SITE}/revision-notes` },
            { '@type': 'ListItem', position: 2, name: `${note.chapter} (${note.classLevel} ${note.subject})`, item: `${SITE}/revision-notes/${note.slug}` },
          ] },
          ...(faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]}
      />
      <button onClick={() => go('/revision-notes')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All revision notes</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><NotebookPen size={13} /> {note.classLevel} · {note.subject}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{note.chapter} — Revision Notes</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{note.intro}</p>
      <button onClick={() => downloadNotePdf(note, deep)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
        <Download size={15} /> Download PDF
      </button>

      <article className="mt-6 space-y-6">
        {note.sections.map((s, i) => (
          <section key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">{s.heading}</h2>
            <ul className="space-y-1.5">
              {s.points.map((p, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"><span className="mt-0.5 text-primary">•</span> {p}</li>
              ))}
            </ul>
          </section>
        ))}
      </article>

      {note.keyTerms.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-slate-100">Key Terms</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {note.keyTerms.map((t, i) => (
              <div key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><span className="font-black text-slate-800 dark:text-slate-100">{t.term}:</span> <span className="text-sm text-slate-600 dark:text-slate-300">{t.meaning}</span></div>
            ))}
          </div>
        </section>
      )}

      {deep && <article className="mt-2"><DeepBody deep={deep} /></article>}

      {faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                <summary className="cursor-pointer font-bold text-slate-900 hover:text-primary dark:text-slate-100">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
        <Sparkles size={18} className="text-emerald-600" />
        <p className="flex-1 text-sm font-bold text-emerald-800 dark:text-emerald-300">Practice this chapter with Syllab's free AI Tutor &amp; daily homework.</p>
        <button onClick={() => setTab('learning_lab')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Open AI Tutor <ArrowRight size={15} /></button>
      </div>

      {related.length > 0 && (
        <nav className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-400">More {note.classLevel} {note.subject} notes</p>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <button key={r.slug} onClick={() => go(`/revision-notes/${r.slug}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">{r.chapter}</button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
