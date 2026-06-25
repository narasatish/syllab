/**
 * RevisionNotes — concise per-chapter CBSE revision notes.
 * /revision-notes + /revision-notes/{slug}.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, NotebookPen } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { REVISION_NOTES, getRevisionNote, type RevisionNote } from '../data/revisionNotes';
import { exportArticleAsPDF } from '../lib/printPdf';
import { Download } from 'lucide-react';
import { usePathname } from '../lib/isomorphic';

function downloadNotePdf(note: RevisionNote) {
  const sections = [
    { heading: 'Overview', body: note.intro },
    ...note.sections.map((s) => ({ heading: s.heading, body: s.points.map((p) => `• ${p}`).join('\n') })),
    ...(note.keyTerms.length ? [{ heading: 'Key Terms', body: note.keyTerms.map((t) => `• ${t.term}: ${t.meaning}`).join('\n') }] : []),
    ...(note.faqs.length ? [{ heading: 'FAQs', body: note.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n') }] : []),
  ];
  exportArticleAsPDF({ title: `${note.chapter} — Revision Notes`, subtitle: `${note.classLevel} · ${note.subject} · CBSE`, sections });
}

const SITE = 'https://syllab.in';
const parseSlug = (p: string) => { const m = p.match(/\/revision-notes\/([a-z0-9-]+)/); return m ? m[1] : null; };

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
        title="CBSE Revision Notes Class 9 & 10 — Quick Chapter Notes | Syllab.in"
        description={`Free CBSE revision notes for quick exam prep — ${REVISION_NOTES.length}+ chapter-wise notes for Class 9 & 10 Science and Maths, with key points, formulas, key terms and FAQs. NCERT aligned.`}
        keywords="CBSE revision notes, class 10 science notes, class 10 maths notes, class 9 notes, quick revision notes, NCERT chapter notes, board exam revision"
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

function Detail({ note, go, setTab }: { note: RevisionNote; go: (to: string) => void; setTab: (t: string) => void }) {
  const related = REVISION_NOTES.filter((r) => r.classLevel === note.classLevel && r.subject === note.subject && r.slug !== note.slug).slice(0, 6);
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
          ...(note.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: note.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
        ]}
      />
      <button onClick={() => go('/revision-notes')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All revision notes</button>
      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><NotebookPen size={13} /> {note.classLevel} · {note.subject}</div>
      <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{note.chapter} — Revision Notes</h1>
      <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{note.intro}</p>
      <button onClick={() => downloadNotePdf(note)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white shadow-sm transition-colors hover:bg-emerald-600">
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

      {note.faqs.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {note.faqs.map((f, i) => (
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
