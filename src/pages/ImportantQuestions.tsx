/**
 * Important Questions — programmatic SEO cluster for Class 6–12. Built entirely
 * from the real SYLLABUS data (chapters + key topics), so every page is unique,
 * substantive and indexable. Three levels:
 *   /important-questions                      → pick a class
 *   /important-questions/class-10             → pick a subject
 *   /important-questions/class-10/science     → chapters + key topics + CTA
 * Targets "important questions class N {subject}" / "important chapters" queries.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Target, Sparkles, Volume2, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import AnswerMarkdown from '../components/AnswerMarkdown';
import { cn } from '../lib/utils';
import { SYLLABUS } from '../data/syllabus';
import { generateExamQuestions } from '../lib/importantQuestions';
import { askTutor } from '../lib/api';
import { fetchChapterAnswers, saveSharedAnswer } from '../lib/sharedAnswers';
import type { ClassLevel, Subject } from '../types';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';
const CLASSES: ClassLevel[] = ['6', '7', '8', '9', '10', '11', '12'];

function speak(text: string) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 4000)); u.lang = 'en-IN'; u.rate = 1;
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}

// Generated answers are cached in localStorage so they persist + never re-charge.
const ANS_KEY = 'syllab_iq_ans_v2';
const ansKey = (cls: string, subj: string, q: string) => `${cls}::${subj}::${q}`;
function loadAnsCache(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(ANS_KEY) || '{}') as Record<string, string>; } catch { return {}; }
}
function saveAnsCache(k: string, v: string) {
  try { const c = loadAnsCache(); c[k] = v; localStorage.setItem(ANS_KEY, JSON.stringify(c)); } catch { /* ignore */ }
}
const answerPrompt = (clsN: string, subjN: string, marks: number, q: string) =>
  `You are a CBSE/board exam teacher. Answer this Class ${clsN} ${subjN} exam question as a clear, well-structured ${marks}-mark board-exam answer for a student — use short headings/numbered points/steps, include the key formula or a diagram described in words where relevant, and keep it accurate. Question: "${q}"`;
const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function subjectsFor(cls: ClassLevel): Subject[] {
  const set = new Set<Subject>();
  for (const c of SYLLABUS) if (c.classLevel === cls) set.add(c.subject);
  return Array.from(set);
}
function chaptersFor(cls: ClassLevel, subj: Subject) {
  return SYLLABUS.filter((c) => c.classLevel === cls && c.subject === subj);
}

export default function ImportantQuestions({ setTab }: { setTab: (tab: string) => void }) {
  const [path, setPath] = useState(usePathname());
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (to: string) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parts = path.split('/').filter(Boolean); // ['important-questions', 'class-10', 'science', 'real-numbers'?]
  const clsMatch = (parts[1] || '').match(/^class-(\d+)$/);
  const cls = (clsMatch && CLASSES.includes(clsMatch[1] as ClassLevel) ? clsMatch[1] : null) as ClassLevel | null;
  const subjects = useMemo(() => (cls ? subjectsFor(cls) : []), [cls]);
  const subject = useMemo(() => (cls && parts[2] ? subjects.find((s) => slug(s) === parts[2]) || null : null), [cls, parts, subjects]);
  const allChapters = useMemo(() => (cls && subject ? chaptersFor(cls, subject) : []), [cls, subject]);
  // Level 4: /important-questions/class-10/mathematics/real-numbers → single-chapter page.
  const chapterIdx = useMemo(() => (parts[3] ? allChapters.findIndex((c) => slug(c.title) === parts[3]) : -1), [parts, allChapters]);
  const focusChapter = chapterIdx >= 0 ? allChapters[chapterIdx] : null;
  const chapters = useMemo(() => (focusChapter ? [focusChapter] : allChapters), [focusChapter, allChapters]);

  // AI answers (on demand + cached in localStorage) keyed by chapter+question index.
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [revealing, setRevealing] = useState<string | null>(null); // chapter id being batch-answered
  const [revealProgress, setRevealProgress] = useState(0);
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set());
  const [loadingChapters, setLoadingChapters] = useState<Set<string>>(new Set()); // chapters currently fetching shared answers
  const answersRef = useRef(answers);
  useEffect(() => { answersRef.current = answers; }, [answers]);
  // Auto-expand the chapter on its own single-chapter page (declared after
  // openChapters state so the setter is unambiguously in scope here).
  useEffect(() => { if (focusChapter) setOpenChapters(new Set([focusChapter.id])); }, [focusChapter?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist a generated answer to BOTH local cache and the shared Firestore cache
  // (so it shows for everyone, free, next time).
  const persist = (clsN: string, subjN: string, chapterId: string, qi: number, q: string, a: string) => {
    saveAnsCache(ansKey(clsN, subjN, q), a);
    void saveSharedAnswer(clsN, slug(subjN), chapterId, qi, q, a);
  };

  // Seed answers: localStorage (instant) THEN the shared Firestore cache (one read
  // per chapter) so previously-generated answers show below each question for free.
  useEffect(() => {
    if (!cls || !subject) { setAnswers({}); return; }
    const c = String(cls), sName = String(subject), sSlug = slug(sName);
    const cache = loadAnsCache();
    const chQs = chapters.map((ch) => ({ ch, qs: generateExamQuestions({ title: ch.title, subject: String(ch.subject), topics: ch.topics }) }));
    const seeded: Record<string, string> = {};
    for (const { ch, qs } of chQs) qs.forEach((item, qi) => { const v = cache[ansKey(c, sName, item.q)]; if (v) seeded[`${ch.id}-${qi}`] = v; });
    setAnswers(seeded);

    let cancelled = false;
    (async () => {
      for (const { ch, qs } of chQs) {
        setLoadingChapters((prev) => new Set([...prev, ch.id]));
        const shared = await fetchChapterAnswers(c, sSlug, ch.id);
        setLoadingChapters((prev) => {
          const next = new Set(prev);
          next.delete(ch.id);
          return next;
        });
        if (cancelled || !Object.keys(shared).length) continue;
        setAnswers((prev) => {
          const next = { ...prev };
          qs.forEach((item, qi) => {
            const s = shared[String(qi)];
            if (s && s.q === item.q && s.a) { next[`${ch.id}-${qi}`] = s.a; saveAnsCache(ansKey(c, sName, item.q), s.a); }
          });
          return next;
        });
      }
    })();
    return () => { cancelled = true; };
  }, [cls, subject, chapters]);

  const answerQ = useCallback(async (chapterId: string, qi: number, q: string, marks: number) => {
    const key = `${chapterId}-${qi}`;
    if (answersRef.current[key] || loadingKey) return;
    setLoadingKey(key);
    try {
      const reply = (await askTutor(answerPrompt(String(cls), String(subject), marks, q))).trim();
      if (reply) { setAnswers((a) => ({ ...a, [key]: reply })); persist(String(cls), String(subject), chapterId, qi, q, reply); }
      else setAnswers((a) => ({ ...a, [key]: 'Could not load an answer — please try again.' }));
    } catch { setAnswers((a) => ({ ...a, [key]: 'Could not load an answer — please try again.' })); }
    finally { setLoadingKey(null); }
  }, [loadingKey, cls, subject]); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate ALL answers for one chapter (skips cached), with progress.
  const revealAll = useCallback(async (chId: string, title: string, subj: string, topics: string[] | undefined, clsN: string) => {
    if (revealing) return;
    const qs = generateExamQuestions({ title, subject: subj, topics });
    setRevealing(chId); setRevealProgress(0);
    for (let qi = 0; qi < qs.length; qi++) {
      const item = qs[qi];
      const key = `${chId}-${qi}`;
      if (!answersRef.current[key]) {
        try {
          const reply = (await askTutor(answerPrompt(clsN, subj, item.marks, item.q))).trim();
          if (reply) { setAnswers((a) => ({ ...a, [key]: reply })); persist(clsN, subj, chId, qi, item.q, reply); }
        } catch { /* skip this one, continue */ }
      }
      setRevealProgress(qi + 1);
    }
    setRevealing(null);
  }, [revealing]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Level 3: class + subject → chapters (or Level 4: single chapter) ──
  if (cls && subject) {
    const subjUrl = `${SITE}/important-questions/class-${cls}/${slug(subject)}`;
    const crumbs = [
      { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
      { '@type': 'ListItem', position: 2, name: `Class ${cls}`, item: `${SITE}/important-questions/class-${cls}` },
      { '@type': 'ListItem', position: 3, name: subject, item: subjUrl },
      ...(focusChapter ? [{ '@type': 'ListItem', position: 4, name: focusChapter.title, item: `${subjUrl}/${slug(focusChapter.title)}` }] : []),
    ];
    const prevCh = chapterIdx > 0 ? allChapters[chapterIdx - 1] : null;
    const nextCh = chapterIdx >= 0 && chapterIdx < allChapters.length - 1 ? allChapters[chapterIdx + 1] : null;
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={focusChapter
            ? `${focusChapter.title} Class ${cls} Important Questions (Free) | Syllab.in`
            : `Important Questions for Class ${cls} ${subject} (Chapter-wise, Free) | Syllab.in`}
          description={focusChapter
            ? `Class ${cls} ${subject} "${focusChapter.title}" important questions — board-exam-style 2, 3 & 5 mark questions with free AI model answers. CBSE/NCERT-aligned, no login.`
            : `Important questions and key chapters for Class ${cls} ${subject} — chapter-wise high-weightage topics, with free practice. CBSE/NCERT-aligned for Indian students.`}
          keywords={focusChapter
            ? `${focusChapter.title.toLowerCase()} class ${cls} important questions, class ${cls} ${subject.toLowerCase()} ${focusChapter.title.toLowerCase()}, ${focusChapter.title.toLowerCase()} extra questions`
            : `important questions class ${cls} ${subject.toLowerCase()}, class ${cls} ${subject.toLowerCase()} important chapters, ${subject.toLowerCase()} class ${cls} questions, cbse class ${cls} ${subject.toLowerCase()} important`}
          url={focusChapter ? `${subjUrl}/${slug(focusChapter.title)}` : subjUrl}
          jsonLd={[{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs }]}
        />
        <button onClick={() => go(focusChapter ? `/important-questions/class-${cls}/${slug(subject)}` : `/important-questions/class-${cls}`)} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
          <ArrowLeft size={14} /> {focusChapter ? `All Class ${cls} ${subject} chapters` : `Class ${cls} subjects`}
        </button>
        <PageHero
          emoji="🎯"
          title={focusChapter ? `${focusChapter.title} — Important Questions` : `Class ${cls} ${subject} — Important Questions`}
          subtitle={focusChapter
            ? `Class ${cls} ${subject} · board-exam-style questions with free AI answers.`
            : `${chapters.length} chapters with high-weightage topics. Practice each one free.`}
          className="mb-6"
        />

        <p className="mb-3 text-sm text-slate-500">Tap a chapter to see its important questions. Each answer is written by the AI tutor in board-exam style.</p>
        <div className="space-y-3">
          {chapters.map((ch, ci) => {
            const qs = generateExamQuestions({ title: ch.title, subject: String(ch.subject), topics: ch.topics });
            const open = openChapters.has(ch.id);
            const answered = qs.reduce((n, _i, qi) => n + (answers[`${ch.id}-${qi}`] ? 1 : 0), 0);
            return (
              <div key={ch.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                {/* Chapter header (click to expand) */}
                <button
                  onClick={() => setOpenChapters((s) => { const n = new Set(s); if (n.has(ch.id)) n.delete(ch.id); else n.add(ch.id); return n; })}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-slate-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-black text-emerald-700">{focusChapter ? chapterIdx + 1 : ci + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-black text-slate-900">{ch.title}</span>
                    <span className="text-xs font-bold text-slate-400">{qs.length} important questions{answered ? ` · ${answered} answered` : ''}</span>
                  </span>
                  <ChevronRight size={18} className={cn('shrink-0 text-slate-400 transition-transform', open && 'rotate-90')} />
                </button>

                {/* Expanded: questions + answers */}
                {open ? (
                  <div className="border-t border-slate-100 p-4">
                    {loadingChapters.has(ch.id) && <p className="mb-3 text-xs text-slate-400 animate-pulse">Loading saved answers…</p>}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      {ch.topics?.length ? <p className="text-xs text-slate-500"><span className="font-bold text-slate-600">Key topics:</span> {ch.topics.slice(0, 6).join(' · ')}</p> : <span />}
                      <div className="flex gap-2">
                        {!focusChapter ? (
                          <a href={`/important-questions/class-${cls}/${slug(subject)}/${slug(ch.title)}`}
                            onClick={(e) => { e.preventDefault(); go(`/important-questions/class-${cls}/${slug(subject)}/${slug(ch.title)}`); }}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-200">
                            Full page <ArrowRight size={12} />
                          </a>
                        ) : null}
                        <button onClick={() => setTab('arena')} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 hover:bg-emerald-100"><Target size={13} /> Practice</button>
                        <button onClick={() => void revealAll(ch.id, ch.title, String(ch.subject), ch.topics, String(cls))} disabled={!!revealing}
                          className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-600 disabled:opacity-50">
                          <Sparkles size={12} /> {revealing === ch.id ? `Generating ${revealProgress}/${qs.length}…` : 'Show all answers'}
                        </button>
                      </div>
                    </div>
                    <ol className="space-y-2.5">
                      {qs.map((item, qi) => {
                        const key = `${ch.id}-${qi}`;
                        return (
                          <li key={qi} className="rounded-xl bg-slate-50 p-3">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-bold text-slate-800">Q{qi + 1}. {item.q}</p>
                              <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-black text-slate-600">{item.marks} marks</span>
                            </div>
                            {answers[key] ? (
                              <div className="mt-2 rounded-lg border border-slate-100 bg-white p-3">
                                <AnswerMarkdown text={answers[key]} />
                                <button onClick={() => speak(answers[key])} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-primary" title="Read aloud"><Volume2 size={13} /> Read aloud</button>
                              </div>
                            ) : (
                              <button onClick={() => void answerQ(ch.id, qi, item.q, item.marks)} disabled={loadingKey === key}
                                className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600 disabled:opacity-50">
                                <Sparkles size={12} /> {loadingKey === key ? 'Writing answer…' : 'Answer with AI (board style)'}
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ) : null}
              </div>
            );
          })}
          {!chapters.length ? <p className="text-sm text-slate-500">Chapters for this subject are being added.</p> : null}
        </div>

        {focusChapter && (prevCh || nextCh) ? (
          <nav className="mt-6 flex items-center justify-between gap-3 text-sm font-black">
            {prevCh ? (
              <button onClick={() => go(`/important-questions/class-${cls}/${slug(subject)}/${slug(prevCh.title)}`)} className="inline-flex items-center gap-1 text-slate-500 hover:text-primary">
                <ArrowLeft size={15} /> {prevCh.title}
              </button>
            ) : <span />}
            {nextCh ? (
              <button onClick={() => go(`/important-questions/class-${cls}/${slug(subject)}/${slug(nextCh.title)}`)} className="inline-flex items-center gap-1 text-slate-500 hover:text-primary">
                {nextCh.title} <ArrowRight size={15} />
              </button>
            ) : <span />}
          </nav>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-emerald-50 p-4">
          <p className="flex-1 text-sm font-bold text-emerald-800">Test yourself with free chapter-wise practice & mock tests.</p>
          <button onClick={() => setTab('mock_tests')} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-black text-white hover:bg-emerald-600">Mock Tests <ArrowRight size={15} /></button>
        </div>
      </div>
    );
  }

  // ── Level 2: class → subjects ──
  if (cls) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`Important Questions for Class ${cls} — All Subjects (Free) | Syllab.in`}
          description={`Chapter-wise important questions and key chapters for Class ${cls} — pick a subject. Free, CBSE/NCERT-aligned practice for Indian students.`}
          keywords={`important questions class ${cls}, class ${cls} important chapters, cbse class ${cls} important questions, class ${cls} questions all subjects`}
          url={`${SITE}/important-questions/class-${cls}`}
          jsonLd={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Important Questions', item: `${SITE}/important-questions` },
            { '@type': 'ListItem', position: 2, name: `Class ${cls}`, item: `${SITE}/important-questions/class-${cls}` },
          ] }}
        />
        <button onClick={() => go('/important-questions')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All classes</button>
        <PageHero emoji="🎯" title={`Class ${cls} — Important Questions`} subtitle="Pick a subject to see chapter-wise important topics." className="mb-6" />
        <div className="grid gap-3 sm:grid-cols-2">
          {subjects.map((s) => (
            <button key={s} onClick={() => go(`/important-questions/class-${cls}/${slug(s)}`)}
              className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white p-4 text-left font-black text-slate-800 shadow-sm hover:border-primary hover:bg-emerald-50">
              <span className="flex items-center gap-2"><BookOpen size={16} className="text-primary" /> {s}</span>
              <span className="text-xs font-bold text-slate-400">{chaptersFor(cls, s).length} ch</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Level 1: index ──
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Important Questions for Class 6 to 12 — Chapter-wise (Free) | Syllab.in"
        description="Free chapter-wise important questions and key chapters for Class 6 to 12 — Maths, Science, Physics, Chemistry, Biology, Social Science & more. CBSE/NCERT-aligned for Indian students."
        keywords="important questions, important questions class 10, important questions class 9, cbse important questions, ncert important questions, important chapters class 6 7 8 9 10 11 12"
        url={`${SITE}/important-questions`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Important Questions for Class 6–12', url: `${SITE}/important-questions`, inLanguage: 'en-IN', isAccessibleForFree: true }}
      />
      <PageHero emoji="🎯" title="Important Questions" subtitle="Chapter-wise important questions & key chapters for Class 6 to 12 — pick your class." className="mb-6" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CLASSES.map((c) => (
          <button key={c} onClick={() => go(`/important-questions/class-${c}`)}
            className="rounded-2xl border-2 border-slate-100 bg-white p-5 text-center font-black text-slate-800 shadow-sm hover:border-primary hover:bg-emerald-50">
            <div className="text-2xl">Class {c}</div>
            <div className="mt-1 text-xs font-bold text-slate-400">{subjectsFor(c).length} subjects</div>
          </button>
        ))}
      </div>
    </div>
  );
}
