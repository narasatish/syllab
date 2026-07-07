/**
 * VisualLearning — interactive, step-through visual concept lessons.
 * Index at /visual-learning, detail at /visual-learning/:slug.
 * Path-driven (pushState/popstate) to match the other study clusters.
 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, PlayCircle } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import AnimatedDiagram from '../components/AnimatedDiagram';
import type { User as FirebaseUser } from 'firebase/auth';
import { VISUAL_LESSONS, getVisualLesson } from '../data/visualLessons';
import { CONCEPT_EXPLAINERS } from '../data/conceptExplainers';
import { recordLearningActivity } from '../lib/progressTracker';
import { usePathname } from '../lib/isomorphic';

const VL_STOP = new Set(['the', 'and', 'of', 'a', 'an', 'human', 'system', 'cell', 'law', 'laws']);
function matchConcept(title: string) {
  const words = title.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 6 && !VL_STOP.has(w));
  return CONCEPT_EXPLAINERS.find((c) => words.some((w) => c.title.toLowerCase().includes(w)));
}

const SITE = 'https://syllab.in';
const DONE_KEY = 'syllab_visual_done_v1';

// Kids layer: a friendly guide for younger learners. Shown only on lessons whose
// audience starts at Class 6 or below, so it never feels childish to seniors.
const MASCOT = '🦉';
/** Lowest class number in a range like "Class 3–7" / "Class 10–12" (999 if none). */
function minClassOf(classLevel: string): number {
  const nums = (classLevel.match(/\d+/g) || []).map(Number);
  return nums.length ? Math.min(...nums) : 999;
}
const KID_LINES = [
  `Hi, I'm Vidya the owl! Tap play and watch it come alive — then try the "Test yourself" at the bottom. You've got this!`,
  `Let's learn this together! Watch each step, then see if you can remember it. Learning is more fun when you can picture it.`,
];

export default function VisualLearning({ setTab, currentUser }: { setTab?: (tab: string) => void; currentUser?: FirebaseUser | null }) {
  // Award XP + a 'lesson' counter the first time each lesson is finished.
  const awardLesson = (slug: string, title: string) => {
    try {
      const done: string[] = JSON.parse(localStorage.getItem(DONE_KEY) || '[]');
      if (done.includes(slug)) return;
      localStorage.setItem(DONE_KEY, JSON.stringify([...done, slug]));
      recordLearningActivity({ uid: currentUser?.uid || '', type: 'ppt_lesson', title: `Visual: ${title}`, xpGained: 10 });
    } catch { /* ignore */ }
  };
  const [path, setPath] = useState(usePathname());
  // Completion streak (retention hook). Read from storage on mount only, so SSR
  // and the first client render agree (no hydration mismatch).
  const [doneCount, setDoneCount] = useState(0);
  const refreshStreak = () => {
    try { setDoneCount((JSON.parse(localStorage.getItem(DONE_KEY) || '[]') as string[]).length); } catch { /* ignore */ }
  };
  useEffect(refreshStreak, [path]);
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

  const slug = useMemo(() => {
    const m = path.match(/^\/visual-learning\/([^/]+)/);
    return m ? m[1] : null;
  }, [path]);
  const lesson = slug ? getVisualLesson(slug) : null;

  if (lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <SEO
          title={`${lesson.title} — Interactive Diagram (Step by Step) | Syllab.in`}
          description={`${lesson.intro} Free animated, step-by-step ${lesson.title} diagram for ${lesson.classLevel} ${lesson.subject} — play, pause and learn visually.`.slice(0, 160)}
          keywords={`${lesson.title.toLowerCase()} diagram, ${lesson.title.toLowerCase()} animation, ${lesson.title.toLowerCase()} step by step, ${lesson.subject.toLowerCase()} diagram class, interactive ${lesson.title.toLowerCase()}`}
          url={`${SITE}/visual-learning/${lesson.slug}`}
          jsonLd={[
            { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${lesson.title} — Interactive Diagram`, description: lesson.intro, educationalLevel: lesson.classLevel, inLanguage: 'en-IN', isAccessibleForFree: true, learningResourceType: 'Interactive diagram', publisher: { '@type': 'Organization', name: 'Syllab.in' } },
            { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Visual Learning', item: `${SITE}/visual-learning` },
              { '@type': 'ListItem', position: 2, name: lesson.title, item: `${SITE}/visual-learning/${lesson.slug}` },
            ] },
            ...(lesson.recall && lesson.recall.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: lesson.recall.map((r) => ({ '@type': 'Question', name: r.q, acceptedAnswer: { '@type': 'Answer', text: r.a } })) }] : []),
          ]}
        />
        <button onClick={() => go('/visual-learning')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary"><ArrowLeft size={14} /> All visual lessons</button>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary"><PlayCircle size={13} /> {lesson.subject} · {lesson.classLevel}</div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">{lesson.title}</h1>
        <p className="mb-4 mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{lesson.intro}</p>

        {/* Kids layer: friendly mascot guide for younger-audience lessons + a streak. */}
        {minClassOf(lesson.classLevel) <= 6 ? (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-3 dark:border-violet-900/50 dark:bg-violet-950/30">
            <span className="text-2xl leading-none" aria-hidden>{MASCOT}</span>
            <p className="text-sm font-semibold leading-relaxed text-violet-900 dark:text-violet-100">{KID_LINES[lesson.slug.length % KID_LINES.length]}</p>
          </div>
        ) : null}
        {doneCount > 0 ? (
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">🔥 {doneCount} visual {doneCount === 1 ? 'lesson' : 'lessons'} completed — keep the streak going!</div>
        ) : null}

        <AnimatedDiagram key={lesson.slug} lesson={lesson} onPractice={(t) => setTab?.(t)} onComplete={() => { awardLesson(lesson.slug, lesson.title); refreshStreak(); }} />

        {/* ── Memory-first layers: remember it, real-life, crux notes, recall ── */}
        {(lesson.memoryHook || lesson.realLifeExample) ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {lesson.memoryHook ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">🧠 Remember it</p>
                <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-100">{lesson.memoryHook}</p>
              </div>
            ) : null}
            {lesson.realLifeExample ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">🌏 In real life</p>
                <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">{lesson.realLifeExample}</p>
              </div>
            ) : null}
          </div>
        ) : null}

        {lesson.cruxNotes && lesson.cruxNotes.length > 0 ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-slate-100">📝 Quick Notes — the exam crux</h2>
            <ul className="space-y-2">
              {lesson.cruxNotes.map((n, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-0.5 shrink-0 font-black text-primary">▸</span><span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {lesson.recall && lesson.recall.length > 0 ? (
          <div className="mt-4">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-slate-100">🎯 Test yourself (tap to reveal)</h2>
            <div className="space-y-2">
              {lesson.recall.map((r, i) => (
                <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                  <summary className="cursor-pointer list-none font-bold text-slate-800 marker:hidden dark:text-slate-100">
                    <span className="mr-2 text-primary">Q{i + 1}.</span>{r.q}
                    <span className="float-right text-xs font-black text-slate-400 group-open:hidden">tap ▸</span>
                  </summary>
                  <p className="mt-2 border-t border-slate-100 pt-2 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-300"><span className="font-black text-emerald-600">A.</span> {r.a}</p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {(() => { const c = matchConcept(lesson.title); return c ? (
          <a href={`/concepts/${c.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-black text-white shadow-sm transition-opacity hover:opacity-90">
            📖 Read the full explanation
          </a>
        ) : null; })()}

        {/* Other lessons */}
        <h2 className="mb-3 mt-10 text-lg font-black text-slate-900 dark:text-slate-100">More visual lessons</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {VISUAL_LESSONS.filter((l) => l.slug !== lesson.slug).map((l) => (
            <button key={l.slug} onClick={() => go(`/visual-learning/${l.slug}`)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">{l.subject}</p>
              <p className="mt-0.5 font-black text-slate-800 dark:text-slate-100">{l.title}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SEO
        title="Visual Learning — Free Animated, Interactive Diagrams for Students | Syllab.in"
        description="Learn science concepts the easy way with free animated, step-by-step interactive diagrams — water cycle, photosynthesis, the human heart, digestion and more. Play, pause and understand visually."
        keywords="animated diagrams for students, interactive science diagrams, water cycle animation, photosynthesis diagram step by step, human heart diagram, digestive system diagram, visual learning CBSE, free interactive learning India"
        url={`${SITE}/visual-learning`}
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Visual Learning — Interactive Diagrams', description: 'Free animated, step-by-step diagrams for school science concepts.', url: `${SITE}/visual-learning`, isAccessibleForFree: true }]}
      />
      <PageHero emoji="🎬" title="Visual Learning" subtitle="Tap play and watch tricky concepts unfold — step by step, the way you'd actually understand them." className="mb-6" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VISUAL_LESSONS.map((l) => (
          <button key={l.slug} onClick={() => go(`/visual-learning/${l.slug}`)} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-sky-50 to-emerald-50 p-3 [&_svg]:h-full [&_svg]:w-full dark:from-slate-900 dark:to-slate-800" dangerouslySetInnerHTML={{ __html: l.steps[l.steps.length - 1].svg }} />
            <div className="p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">{l.subject} · {l.classLevel}</p>
              <h2 className="mt-1 flex items-center gap-1.5 font-black text-slate-900 dark:text-slate-100"><PlayCircle size={16} className="text-primary" /> {l.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{l.intro}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
        <Sparkles size={18} /> More animated lessons are added regularly — bookmark this page!
      </div>
    </div>
  );
}
