import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Sparkles, X, Zap, PlayCircle, Lightbulb, ArrowRight, Bot, Target, Pin, Loader2 } from 'lucide-react';
import { Chapter, Subject, ClassLevel, Concept } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CONCEPTS } from '../data/concepts';
import { getChapterSummary, ensureChapterSummary } from '../data/chapterSummaries';
import { usePinnedChapters } from '../lib/pinnedChapters';
import SEO from '../components/SEO';
import { loadConcept } from '../lib/api';

interface SyllabusPageProps {
  setTab: (tab: string) => void;
  openTutor: () => void;
  syllabus: Chapter[];
  setPracticeConfig: (config: Record<string, unknown>) => void;
}

const CLASSES: (ClassLevel | 'All')[] = ['All', '5', '6', '7', '8', '9', '10', '11', '12'];
const SYLLABUS_VIEW_KEY = 'syllab_syllabus_view_state';

type SyllabusViewState = {
  search: string;
  selectedSubject: Subject | 'All';
  selectedClass: ClassLevel | 'All';
  scrollY: number;
};

/**
 * Per-card summary component.
 * - Renders the hardcoded / fallback summary instantly.
 * - When the card scrolls near the viewport, it asks the backend for the
 *   real per-chapter summary (which the backend caches in Firestore so
 *   the next user gets it instantly).
 */
function ChapterSummary({ chapter }: { chapter: Chapter }) {
  const [summary, setSummary] = useState<string>(() =>
    getChapterSummary(chapter.title, chapter.explanation || ''),
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(() =>
    getChapterSummary(chapter.title) ? 'ready' : 'idle',
  );
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // If a hardcoded summary exists, no need to fetch.
    const hardcoded = getChapterSummary(chapter.title);
    if (hardcoded) {
      setSummary(hardcoded);
      setStatus('ready');
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const node = ref.current;

    const triggerFetch = () => {
      setStatus('loading');
      window.setTimeout(() => {
        if (!cancelled) {
          setStatus((current) => (current === 'loading' ? 'ready' : current));
        }
      }, 12000);
      ensureChapterSummary({
        classLevel: chapter.classLevel,
        subject: chapter.subject,
        chapterTitle: chapter.title,
        chapterId: chapter.id,
        fallback: chapter.explanation || '',
      })
        .then((s) => {
          if (!cancelled && s) {
            setSummary(s);
            setStatus('ready');
          } else if (!cancelled) {
            setStatus('error');
          }
        })
        .catch(() => { /* ignore â€” fallback already showing */ });
    };

    if (node && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            triggerFetch();
            observer?.disconnect();
          }
        },
        { rootMargin: '300px' },
      );
      observer.observe(node);
    } else {
      // No IntersectionObserver â€” just fetch immediately.
      triggerFetch();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [chapter.id, chapter.title, chapter.classLevel, chapter.subject, chapter.explanation]);

  return (
    <div className="space-y-2">
      <p ref={ref} className="text-sm text-slate-500 font-medium leading-relaxed">
        <span
          className="block overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {summary || 'Preparing summary...'}
        </span>
      </p>
      {status === 'loading' ? (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Generating summary
        </div>
      ) : null}
      {status === 'error' ? (
        <button
          type="button"
          onClick={() => {
            setStatus('loading');
            ensureChapterSummary({
              classLevel: chapter.classLevel,
              subject: chapter.subject,
              chapterTitle: chapter.title,
              chapterId: chapter.id,
              fallback: chapter.explanation || '',
            })
              .then((s) => {
                if (s) {
                  setSummary(s);
                  setStatus('ready');
                } else {
                  setStatus('error');
                }
              })
              .catch(() => setStatus('error'));
          }}
          className="text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700"
        >
          Could not refresh summary. Retry
        </button>
      ) : null}
    </div>
  );
}

function summaryPoints(summary: string) {
  const normalized = summary.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (sentences.length >= 3) return sentences.slice(0, 6);
  return normalized
    .split(/,\s+|;\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function summarySections(summary: string) {
  const sentences = summary
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const sections: string[] = [];
  for (let index = 0; index < sentences.length && sections.length < 5; index += 2) {
    sections.push(sentences.slice(index, index + 2).join(' '));
  }
  return sections.length ? sections : summaryPoints(summary);
}

function formulaItems(concept: Concept) {
  if (concept.formulas?.length) {
    return concept.formulas.map((formula) => ({ title: formula, detail: '' }));
  }

  const formulaPattern = /(?:[A-Za-z0-9_()^Â²Â³+\-/*=<>â‰¤â‰¥âˆš.,\s]){2,}=(?:[A-Za-z0-9_()^Â²Â³+\-/*<>â‰¤â‰¥âˆš.,\s]){1,}/g;
  const fromDescriptions = (concept.visuals || []).flatMap((item) => {
    const matches = item.desc.match(formulaPattern) || [];
    return matches.map((match) => ({
      title: match.trim(),
      detail: `${item.title}: ${item.desc}`,
    }));
  });

  if (fromDescriptions.length) {
    return fromDescriptions.slice(0, 8);
  }

  return (concept.visuals || []).slice(0, 8).map((item) => ({
    title: item.title,
    detail: item.desc,
  }));
}

function ConceptView({
  concept,
  chapterSummary,
  onClose,
  onNext,
}: {
  concept: Concept;
  chapterSummary: string;
  onClose: () => void;
  onNext?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'visuals' | 'examples' | 'technical'>('visuals');
  const summaryText = chapterSummary || concept.summary;
  const sections = React.useMemo(() => summarySections(summaryText), [summaryText]);
  const keyTerms = React.useMemo(
    () => Array.from(new Set((concept.visuals || []).map((item) => item.title).filter(Boolean))).slice(0, 10),
    [concept.visuals],
  );
  const formulas = React.useMemo(() => formulaItems(concept), [concept]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Sidebar Nav */}
        <div className="w-full md:w-24 bg-slate-900 flex flex-row md:flex-col items-center justify-center py-4 md:py-12 gap-6 md:gap-8 shrink-0">
          <button
            onClick={() => setActiveTab('visuals')}
            title="Visual Intuition"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'visuals' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Sparkles size={24} />
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            title="Formulas & Hacks"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'technical' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Zap size={24} />
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            title="Real World"
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              activeTab === 'examples' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            <Lightbulb size={24} />
          </button>
          <div className="hidden md:block flex-1" />
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-8 md:p-12 space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/10">
                  {concept.subject} â€¢ Master Module
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight italic-serif">
                  {concept.title}
                </h2>
                <div className="flex items-center gap-4 pt-2">
                   <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3" />
                   </div>
                   <span className="text-[10px] font-black text-slate-400">33% Mastered</span>
                </div>
              </div>

              {onNext && (
                <button
                  onClick={onNext}
                  className="btn-primary group flex items-center gap-3 px-8 py-4 text-xs font-black uppercase tracking-widest"
                >
                  Next Concept <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </header>

            {activeTab === 'visuals' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary">Chapter Summary</div>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">{concept.title}</h3>
                    </div>
                    <div className="rounded-2xl bg-primary/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-primary">
                      {concept.subject}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {sections.map((section, index) => (
                      <div key={`${section}-${index}`} className="rounded-2xl bg-slate-50 p-5">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-white">
                            {index + 1}
                          </span>
                          Part {index + 1}
                        </div>
                        <p className="text-sm font-semibold leading-7 text-slate-700">{section}</p>
                      </div>
                    ))}
                  </div>

                  {keyTerms.length > 0 ? (
                    <div className="mt-8">
                      <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Key Words</div>
                      <div className="flex flex-wrap gap-2">
                        {keyTerms.map((term) => (
                          <span key={term} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {concept.videoUrl ? (
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group aspect-video shadow-2xl">
                     <div className="absolute inset-0 opacity-40">
                       <video src={concept.videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                          <PlayCircle size={48} fill="currentColor" />
                        </div>
                     </div>
                  </div>
                ) : null}
              </motion.div>
            )}

            {activeTab === 'technical' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                      <h4 className="text-xl font-black text-primary italic-serif flex items-center gap-3">
                        <ArrowRight size={20} /> Key Formulas
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {formulas.length > 0 ? formulas.map((item, i) => (
                          <div key={`${item.title}-${i}`} className="min-w-[180px] flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4">
                            <div className={cn(
                              'font-black text-slate-900',
                              item.detail ? 'text-base' : 'font-mono text-lg',
                            )}>
                              {item.title}
                            </div>
                            {item.detail ? (
                              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.detail}</p>
                            ) : null}
                          </div>
                        )) : (
                          <div className="rounded-2xl bg-slate-50 p-5 text-sm font-bold text-slate-500">
                            No formula list is available for this chapter yet.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-rose-50 p-10 rounded-[2rem] border border-rose-100 shadow-sm space-y-4">
                      <h4 className="text-xl font-black text-rose-600 italic-serif">Common Mistakes</h4>
                      <ul className="space-y-3">
                         {(concept.commonMistakes || ["Forgetting sign conventions", "Unit conversion errors", "Misinterpreting the question scope"]).map((m, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-bold text-rose-700">
                             <div className="w-2 h-2 rounded-full bg-rose-400" /> {m}
                           </li>
                         ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-10 rounded-[2rem] border border-amber-100 shadow-sm space-y-6">
                    <h4 className="text-xl font-black text-amber-700 italic-serif flex items-center gap-3">
                      <Sparkles size={20} /> Exam Hacks
                    </h4>
                    <div className="space-y-6">
                      {(concept.examTricks || ["Use dimensional analysis to eliminate options", "Identify symmetry in the problem", "Check boundary conditions first"]).map((t, i) => (
                        <div key={i} className="space-y-2">
                           <div className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Hack #{i+1}</div>
                           <p className="text-sm font-bold text-amber-900 leading-relaxed">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'examples' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(concept.examples || []).map((ex, i) => (
                    <div key={i} className="flex flex-col p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-emerald-500/30 transition-all">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Zap size={28} fill="currentColor" />
                      </div>
                      <h5 className="text-xl font-black text-slate-900 mb-4">{ex.scenario}</h5>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">{ex.details}</p>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 group-hover:gap-4 transition-all">
                        View Step-by-Step Solution <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SyllabusPage({ setTab, openTutor, syllabus, setPracticeConfig }: SyllabusPageProps) {
  const [searchParams] = useSearchParams();
  const restoredView = React.useMemo<SyllabusViewState | null>(() => {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(SYLLABUS_VIEW_KEY) || 'null') as SyllabusViewState | null;
      return parsed && CLASSES.includes(parsed.selectedClass) ? parsed : null;
    } catch {
      return null;
    }
  }, []);
  const [search, setSearch] = useState(restoredView?.search || '');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>(restoredView?.selectedSubject || 'All');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>(restoredView?.selectedClass || 'All');
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  // Pinned chapters now live in Firestore (cloud-synced across devices).
  // Guests see an empty list and a soft prompt when they try to pin.
  const { pins: pinnedChapters, togglePin: togglePinCloud, isAuthed: pinsAuthed } = usePinnedChapters();
  const [pinHint, setPinHint] = useState<string | null>(null);

  const togglePin = (chapterId: string) => {
    const ok = togglePinCloud(chapterId);
    if (!ok) {
      setPinHint('Sign in to keep your pinned chapters across devices.');
      window.setTimeout(() => setPinHint(null), 3500);
    }
  };

  // âœ… On mount: read class from sessionStorage (set by Home page) or URL ?class=N
  // sessionStorage is fine â€” it's per-tab and only used for cross-page navigation.
  React.useEffect(() => {
    const validClasses: ClassLevel[] = ['5', '6', '7', '8', '9', '10', '11', '12'];
    const fromStorage = sessionStorage.getItem('syllab_class_filter');
    const fromUrl = searchParams.get('class');
    const candidate = fromStorage || fromUrl;
    if (candidate && validClasses.includes(candidate as ClassLevel)) {
      setSelectedClass(candidate as ClassLevel);
      setSearch('');
      setSelectedSubject('All'); // always default subject to All when coming from Home
      sessionStorage.removeItem('syllab_class_filter'); // consume once
    }
  }, [searchParams]);

  const subjects: (Subject | 'All')[] = React.useMemo(() => {
    const pool = selectedClass === 'All'
      ? syllabus
      : syllabus.filter(c => c.classLevel === selectedClass);
    const unique = Array.from(new Set(pool.map(c => c.subject))).sort();
    return ['All', ...unique] as (Subject | 'All')[];
  }, [syllabus, selectedClass]);

  React.useEffect(() => {
    const restoreY = restoredView?.scrollY;
    if (typeof restoreY !== 'number' || restoreY <= 0) return;
    const timer = window.setTimeout(() => window.scrollTo({ top: restoreY, behavior: 'auto' }), 80);
    return () => window.clearTimeout(timer);
  }, [restoredView?.scrollY]);

  React.useEffect(() => {
    const save = () => {
      const viewState: SyllabusViewState = {
        search,
        selectedSubject,
        selectedClass,
        scrollY: window.scrollY,
      };
      sessionStorage.setItem(SYLLABUS_VIEW_KEY, JSON.stringify(viewState));
    };

    save();
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('beforeunload', save);
    return () => {
      save();
      window.removeEventListener('scroll', save);
      window.removeEventListener('beforeunload', save);
    };
  }, [search, selectedSubject, selectedClass]);

  React.useEffect(() => {
    if (!subjects.includes(selectedSubject)) {
      setSelectedSubject('All');
    }
  }, [subjects, selectedSubject]);

  const filteredChapters = syllabus.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(search.toLowerCase()) ||
                         (chapter.topics || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesSubject = selectedSubject === 'All' || chapter.subject === selectedSubject;
    const matchesClass = selectedClass === 'All' || chapter.classLevel === selectedClass;
    return matchesSearch && matchesSubject && matchesClass;
  });

  const handlePractice = (chapter: Chapter) => {
    setPracticeConfig({
      classLevel: chapter.classLevel,
      subject: chapter.subject,
      chapterId: chapter.id,
    });
    setTab('arena');
  };

  const [conceptLoading, setConceptLoading] = useState(false);

  // Concepts are cached on the backend in Firestore â€” frontend just calls
  // /api/concept and the backend handles read-through caching. No more
  // localStorage cache, so concepts are shared across all users/devices.
  const handleConcept = async (chapter: Chapter) => {
    setActiveChapter(chapter);
    setConceptLoading(true);
    const staticConcept = CONCEPTS.find(c => c.chapterId === chapter.id);
    if (staticConcept) {
      window.setTimeout(() => {
        setActiveConcept(staticConcept);
        setConceptLoading(false);
      }, 250);
      return;
    }

    try {
      const concept = await loadConcept({
        classLevel: chapter.classLevel,
        subject: chapter.subject,
        chapterTitle: chapter.title,
        chapterId: chapter.id,
      }) as Concept;

      setActiveConcept(concept);
    } catch (err) {
      console.error('[handleConcept]', err);
      alert(`Could not load concept for "${chapter.title}". Please check your connection.`);
    } finally {
      setConceptLoading(false);
    }
  };

  const handleNextConcept = () => {
    if (!activeConcept) return;
    const currentIndex = CONCEPTS.findIndex(c => c.id === activeConcept.id);
    const nextConcept = CONCEPTS[currentIndex + 1];
    if (nextConcept) {
      setActiveConcept(nextConcept);
      setActiveChapter(syllabus.find((chapter) => chapter.id === nextConcept.chapterId) || null);
    } else {
      setActiveConcept(null);
      setActiveChapter(null);
    }
  };

  const totalQuestions = syllabus.length * 300;

  return (
    <div className="space-y-8 pb-12">
      <SEO
        title={activeConcept ? `${activeConcept.title} | Concept Learning` : "Explore Detailed Syllabus for JEE/NEET"}
        description={activeConcept ? activeConcept.summary : "Browse through a highly enriched syllabus for Class 10, 11, and 12 subjects including Physics, Chemistry, Biology, and Mathematics with real-world examples."}
        url="https://syllab.in/syllabus"
      />
      <AnimatePresence>
        {conceptLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-4 max-w-xs text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center animate-pulse">
                <Loader2 size={26} className="animate-spin" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg">Preparing concept...</p>
                <p className="text-xs font-semibold text-slate-500 mt-1">Please wait, this may take a few seconds.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeConcept && (
          <ConceptView
            concept={activeConcept}
            chapterSummary={activeChapter ? getChapterSummary(activeChapter.title, activeChapter.explanation || activeConcept.summary) : activeConcept.summary}
            onClose={() => {
              setActiveConcept(null);
              setActiveChapter(null);
            }}
            onNext={handleNextConcept}
          />
        )}
      </AnimatePresence>

      {pinHint && (
        <div className="fixed bottom-6 right-6 z-[80] rounded-2xl bg-slate-900 text-white px-5 py-3 shadow-2xl text-xs font-bold">
          {pinHint}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-black mb-1 tracking-tight">ðŸ“š Curriculum Vault</h2>
          <p className="text-slate-500 font-medium text-sm">
            Deep dive into concepts and practice with <span className="text-primary font-black">{totalQuestions.toLocaleString()}+</span> questions.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search curricula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Filter size={16} className="text-slate-400 mr-2" />
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {CLASSES.map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                selectedClass === c ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              Class {c === 'All' ? 'All' : c}
            </button>
          ))}
        </div>
        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block" />
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s as Subject | 'All')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                selectedSubject === s ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* âœ… Plain divs (no motion.div layout) â€” massive perf gain when 100+ chapters render */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="card group flex flex-col h-full translate-y-0 border-none shadow-xl shadow-emerald-500/[0.02] p-8 hover:shadow-2xl transition-all bg-white rounded-[2.5rem]"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => togglePin(chapter.id)}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    pinnedChapters.includes(chapter.id) ? "text-primary bg-primary/10" : "text-slate-300 hover:text-slate-400"
                  )}
                  title={pinsAuthed ? 'Pin/unpin chapter' : 'Sign in to pin chapters'}
                >
                  <Pin size={14} fill={pinnedChapters.includes(chapter.id) ? "currentColor" : "none"} />
                </button>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                  chapter.subject === 'Physics' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  chapter.subject === 'Chemistry' ? "bg-orange-50 text-orange-600 border-orange-100" :
                  chapter.subject === 'Biology' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  "bg-violet-50 text-violet-600 border-violet-100"
                )}>
                  {chapter.subject} â€¢ Class {chapter.classLevel}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors text-slate-900 tracking-tight leading-tight">
              {chapter.title}
            </h3>

            {/* Concept Summary â€” hardcoded â†’ cloud-cached AI summary on demand */}
            <div className="space-y-4 flex-1 mb-8">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">Concept Summary</p>
                <ChapterSummary chapter={chapter} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={() => void handleConcept(chapter)}
                className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 hover:bg-white hover:text-primary border border-slate-100 hover:border-primary/20 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-500 shadow-sm"
              >
                <BookOpen size={14} />
                Learn
              </button>
              <button
                onClick={openTutor}
                className="flex items-center justify-center gap-2 py-3.5 bg-slate-50 hover:bg-white hover:text-primary border border-slate-100 hover:border-primary/20 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-500 shadow-sm"
              >
                <Bot size={14} className="text-primary" />
                AI Tutor
              </button>
            </div>

            <button
              onClick={() => handlePractice(chapter)}
              className="flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl transition-all font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-95 group/btn w-full"
            >
              <Target size={16} fill="currentColor" />
              Practice Concepts
            </button>
          </div>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border border-slate-100">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No curricula found matching filters.</p>
        </div>
      )}
    </div>
  );
}
