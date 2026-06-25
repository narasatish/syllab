/**
 * Kids / Pre-School section (Pre-KG to Class 3)
 * Lightweight, playful, mobile-first, with CSS animations and inline SVG
 * Routes: /kids (index), /kids/alphabet, /kids/numbers, /kids/shapes, /kids/rhymes, /kids/coloring
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2, X } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import ColoringStudio from '../components/ColoringStudio';
import TracingPad from '../components/TracingPad';
import { cn } from '../lib/utils';
import { alphabetTiles } from '../data/kids/alphabet';
import { numberTiles } from '../data/kids/numbers';
import { shapeTiles } from '../data/kids/shapes';
import { nurseryRhymes } from '../data/kids/rhymes';
import { coloringPages } from '../data/kids/coloring';
import { LEARN_TOPICS, findLearnTopic } from '../data/kids/learnTopics';
import { MORAL_STORIES } from '../data/kids/stories';
import { ACTION_RHYMES } from '../data/kids/actionRhymes';
import { MATCH_SETS } from '../data/kids/matchSets';
import MatchGame from '../components/MatchGame';
import MemoryGame from '../components/MemoryGame';
import OddOneOut from '../components/OddOneOut';
import { printCertificate } from '../lib/printCertificate';
import { usePathname } from '../lib/isomorphic';

const SITE = 'https://syllab.in';

/** Check if TTS is available on this browser/device. */
function isTtsAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices() || [];
  return voices.length > 0;
}

/** Pick the most natural-sounding English voice available (prefer richer cloud voices). */
function pickKidVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() || [];
  if (!voices.length) return null;
  // Prefer natural/online/Google/Microsoft female voices, then en-IN, then any English.
  return (
    voices.find((v) => /natural|online|google (uk|us) english/i.test(v.name) && /^en/i.test(v.lang)) ||
    voices.find((v) => /female|aria|jenny|heera|samantha|zira/i.test(v.name) && /^en/i.test(v.lang)) ||
    voices.find((v) => v.lang === 'en-IN') ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    voices[0]
  );
}

/**
 * Pre-school-teacher text-to-speech (free, browser-native): SLOW and CLEAR so a
 * 3–5 year old can follow. `singy` mode recites a rhyme one line at a time with a
 * real breath/pause between lines (chained via onend), the way a teacher reads it
 * aloud — not like reading a paragraph. NOTE: free TTS speaks; it can't truly sing.
 */
// Speech engines (esp. Chrome) DROP the very first utterance after page load — the
// engine is "cold" until it has spoken once, so the first tile-tap is silent and only
// the second works. The fix: the very first time we speak, queue a SILENT utterance
// first (after cancel, so it isn't itself cancelled). The cold-start drop lands on that
// silent primer, and the real word is heard. Subsequent taps are already warm.
let ttsWarmed = false;

let speakToken = 0;
function speak(text: string, opts: { singy?: boolean } = {}) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text.trim()) return;
    window.speechSynthesis.cancel();
    if (!ttsWarmed) {
      ttsWarmed = true;
      try {
        window.speechSynthesis.getVoices();
        const primer = new SpeechSynthesisUtterance(' ');
        primer.volume = 0;
        window.speechSynthesis.speak(primer); // absorbs the cold-start drop
      } catch { /* ignore */ }
    }
    const voice = pickKidVoice();
    const my = ++speakToken; // invalidates any earlier (chained) playback
    const make = (line: string) => {
      const u = new SpeechSynthesisUtterance(line);
      if (voice) u.voice = voice;
      u.lang = voice?.lang || 'en-IN';
      u.rate = opts.singy ? 0.72 : 0.68; // slow + clear for little ears
      u.pitch = 1.1;                      // warm, friendly — not shrill
      u.volume = 1;
      return u;
    };
    if (opts.singy) {
      const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
      let i = 0;
      const next = () => {
        if (my !== speakToken || i >= lines.length) return; // stale or finished
        const u = make(lines[i]);
        i += 1;
        u.onend = () => { if (my === speakToken) window.setTimeout(next, 550); }; // breath between lines
        u.onerror = () => { if (my === speakToken) window.setTimeout(next, 550); };
        window.speechSynthesis.speak(u);
      };
      next();
    } else {
      window.speechSynthesis.speak(make(text));
    }
  } catch { /* ignore — audio just won't play */ }
}
function stopSpeaking() { speakToken++; try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } }

/** A rhyme has a real (embeddable) sung video if its id is set and not a placeholder. */
function hasVideo(youtubeVideoId: string): boolean {
  return !!youtubeVideoId && !youtubeVideoId.startsWith('placeholder');
}

interface ParsedKidsPath {
  view?: 'alphabet' | 'numbers' | 'shapes' | 'rhymes' | 'coloring' | 'tracing' | 'learn' | 'stories' | 'action-rhymes' | 'games';
  detail?: string; // for future detailed views
}

function parsePath(pathname: string): ParsedKidsPath {
  const parts = pathname.split('/').filter(Boolean); // e.g., ['kids', 'alphabet']
  return {
    view: parts[1] as ParsedKidsPath['view'] || undefined,
    detail: parts[2],
  };
}

export default function Kids() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState(usePathname());

  useEffect(() => {
    setReady(true);
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = useCallback((to: string) => {
    if (window.location.pathname !== to) window.history.pushState({ syllabNav: true }, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback((parent: string) => {
    const st = window.history.state as { syllabNav?: boolean } | null;
    if (st && st.syllabNav && window.history.length > 1) window.history.back();
    else go(parent);
  }, [go]);

  // Stop any rhyme/letter narration whenever we change view or leave the Kids page,
  // so audio never keeps playing after you go back.
  useEffect(() => { stopSpeaking(); return () => stopSpeaking(); }, [path]);

  if (!ready) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-slate-400">Loading Syllab Junior…</div>;
  }

  const { view, detail } = parsePath(path);

  // ── Sub-views ──
  if (view === 'alphabet') return <AlphabetView goBack={goBack} />;
  if (view === 'numbers') return <NumbersView goBack={goBack} />;
  if (view === 'shapes') return <ShapesView goBack={goBack} />;
  if (view === 'rhymes') return <RhymesView goBack={goBack} />;
  if (view === 'coloring') return <ColoringView goBack={goBack} />;
  if (view === 'tracing') return <TracingPad goBack={goBack} />;
  if (view === 'learn') return <LearnTopicView topicId={detail} go={go} goBack={goBack} />;
  if (view === 'stories') return <StoriesView goBack={goBack} />;
  if (view === 'action-rhymes') return <ActionRhymesView goBack={goBack} />;
  if (view === 'games') return <GamesView goBack={goBack} />;

  // ── Index view ──
  return <KidsIndex go={go} />;
}

/* ─────────────────────────────────────────────────────────────────── */
/* INDEX VIEW — Colorful main menu                                     */
/* ─────────────────────────────────────────────────────────────────── */

function KidsIndex({ go }: { go: (to: string) => void }) {
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Syllab Junior — Free Learning for Pre-KG to Class 3 Kids | Syllab.in"
        description="Free, playful learning for kids Pre-KG to Class 3 — alphabet, numbers, shapes, nursery rhymes, coloring pages, and more. Designed for Indian kids."
        keywords="free kids learning, Pre-KG learning, alphabet for kids, counting numbers, nursery rhymes, coloring pages for kids, preschool, kindergarten, free learning India"
        url={`${SITE}/kids`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Syllab Junior — Free Learning for Kids',
          description: 'Playful, interactive learning for Pre-KG to Class 3 kids',
          url: `${SITE}/kids`,
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <PageHero
        emoji="🧸"
        title="Syllab Junior"
        subtitle="Playful, free learning for Pre-KG to Class 3 kids — alphabet, numbers, shapes, nursery rhymes, and coloring pages."
        gradient="from-pink-400 via-purple-400 to-indigo-500"
        className="mb-8"
      />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still tap cards and see the content!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Age Group Info */}
      <div className="mb-8 grid gap-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 p-4 sm:grid-cols-4">
        <div className="text-center text-xs font-bold text-blue-700 dark:text-blue-300">
          <div className="text-lg">👶</div>
          <div>Pre-KG</div>
        </div>
        <div className="text-center text-xs font-bold text-blue-700">
          <div className="text-lg">🧒</div>
          <div>LKG</div>
        </div>
        <div className="text-center text-xs font-bold text-blue-700">
          <div className="text-lg">👧</div>
          <div>UKG</div>
        </div>
        <div className="text-center text-xs font-bold text-blue-700">
          <div className="text-lg">🎒</div>
          <div>Class 1-3</div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">📚 Activities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ActivityCard
            title="Alphabet & Phonics"
            emoji="🔤"
            description="Learn A-Z with words and sounds"
            onClick={() => go('/kids/alphabet')}
            colorClass="bg-gradient-to-br from-blue-300 to-blue-500"
          />
          <ActivityCard
            title="Numbers & Counting"
            emoji="🔢"
            description="Count 1 to 20 with visuals"
            onClick={() => go('/kids/numbers')}
            colorClass="bg-gradient-to-br from-green-300 to-green-500"
          />
          <ActivityCard
            title="Shapes & Colors"
            emoji="🎨"
            description="Learn shapes and colors"
            onClick={() => go('/kids/shapes')}
            colorClass="bg-gradient-to-br from-yellow-300 to-yellow-500"
          />
          <ActivityCard
            title="Nursery Rhymes"
            emoji="🎵"
            description="Classic songs and rhymes"
            onClick={() => go('/kids/rhymes')}
            colorClass="bg-gradient-to-br from-pink-300 to-pink-500"
          />
          <ActivityCard
            title="Coloring Studio"
            emoji="🖍️"
            description="Tap to fill colours & save your art"
            onClick={() => go('/kids/coloring')}
            colorClass="bg-gradient-to-br from-orange-300 to-orange-500"
          />
          <ActivityCard
            title="Tracing"
            emoji="✏️"
            description="Trace letters & numbers with your finger"
            onClick={() => go('/kids/tracing')}
            colorClass="bg-gradient-to-br from-purple-300 to-purple-500"
          />
          <ActivityCard
            title="Printable Worksheets"
            emoji="📝"
            description="100+ free PDF worksheets — letters, phonics, maths & more"
            onClick={() => {
              // Cross-tab navigation: push the worksheets route and let App's
              // popstate handler switch tabs (pushState alone won't fire it).
              if (window.location.pathname !== '/worksheets') {
                window.history.pushState({ tab: 'worksheets' }, '', '/worksheets');
              }
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            colorClass="bg-gradient-to-br from-emerald-300 to-emerald-500"
          />
        </div>
      </div>

      {/* More to Learn — nursery-style picture topics (tap to hear) */}
      <div className="mt-8 space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">🌟 More to Learn (tap & listen)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LEARN_TOPICS.map((t) => (
            <ActivityCard
              key={t.id}
              title={t.title}
              emoji={t.emoji}
              description={t.subtitle}
              onClick={() => go(`/kids/learn/${t.id}`)}
              colorClass={`bg-gradient-to-br ${t.colorClass}`}
            />
          ))}
        </div>
      </div>

      {/* Stories, Rhymes & Games */}
      <div className="mt-8 space-y-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">📖 Stories, Rhymes & Games</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <ActivityCard title="Moral Stories" emoji="📚" description="10 short stories with morals — read aloud" onClick={() => go('/kids/stories')} colorClass="bg-gradient-to-br from-amber-300 to-orange-500" />
          <ActivityCard title="Action Rhymes" emoji="🎶" description="Sing and move — Head Shoulders & more" onClick={() => go('/kids/action-rhymes')} colorClass="bg-gradient-to-br from-pink-300 to-rose-500" />
          <ActivityCard title="Matching Games" emoji="🧩" description="Match animals, letters, numbers & more" onClick={() => go('/kids/games')} colorClass="bg-gradient-to-br from-indigo-300 to-purple-500" />
        </div>
      </div>

      {/* Reward certificate */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 dark:from-amber-900/20 to-yellow-50 dark:to-yellow-900/20 p-5">
        <div>
          <h3 className="text-base font-black text-amber-800 dark:text-amber-300">🏆 Reward Certificate</h3>
          <p className="text-sm font-medium text-amber-700 dark:text-amber-200">Print a free "Syllab Junior Star" certificate to celebrate your child's progress!</p>
        </div>
        <button
          onClick={() => { const n = window.prompt("Child's name for the certificate?"); if (n && n.trim()) printCertificate(n.trim()); }}
          className="shrink-0 rounded-xl bg-amber-500 px-5 py-3 text-sm font-black text-white shadow-sm transition-colors hover:bg-amber-600"
        >
          Get certificate →
        </button>
      </div>

      {/* Fun Fact */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30 p-4 text-center text-xs font-bold text-purple-700 dark:text-purple-300">
        💡 Tip: Use Syllab Junior daily for 15-20 minutes to build strong fundamentals!
      </div>
    </div>
  );
}

interface ActivityCardProps {
  title: string;
  emoji: string;
  description: string;
  onClick: () => void;
  colorClass: string;
}

function ActivityCard({ title, emoji, description, onClick, colorClass }: ActivityCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl p-6 text-white shadow-lg transition-all',
        colorClass,
      )}
    >
      <div className="mb-2 text-4xl">{emoji}</div>
      <h3 className="text-sm font-black">{title}</h3>
      <p className="mt-1 text-xs font-medium opacity-90">{description}</p>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* LEARN TOPIC VIEW — tap a picture to hear it (animals, fruits, etc.)  */
/* ─────────────────────────────────────────────────────────────────── */

function LearnTopicView({ topicId, go, goBack }: { topicId?: string; go: (to: string) => void; goBack: (parent: string) => void }) {
  const topic = findLearnTopic(topicId);
  const [selected, setSelected] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  // No/unknown topic → a picker of all topics.
  if (!topic) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary"><ArrowLeft size={14} /> Back to Syllab Junior</button>
        <PageHero emoji="🌟" title="More to Learn" subtitle="Pick a topic to explore — tap any picture to hear it!" className="mb-6" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LEARN_TOPICS.map((t) => (
            <ActivityCard key={t.id} title={t.title} emoji={t.emoji} description={t.subtitle} onClick={() => go(`/kids/learn/${t.id}`)} colorClass={`bg-gradient-to-br ${t.colorClass}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title={`${topic.title} for Kids — Free Learning | Syllab Junior`}
        description={`Free, playful ${topic.title.toLowerCase()} learning for Pre-KG, LKG and UKG kids — tap each picture to hear it. Made for Indian preschoolers.`}
        keywords={`${topic.title} for kids, preschool ${topic.title.toLowerCase()}, LKG UKG learning, nursery ${topic.title.toLowerCase()}, free kids learning India`}
        url={`${SITE}/kids/learn/${topic.id}`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'EducationalMaterial', name: `${topic.title} for Kids`, isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' } }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary"><ArrowLeft size={14} /> Back to Syllab Junior</button>
      <PageHero emoji={topic.emoji} title={topic.title} subtitle={topic.subtitle} className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still tap each picture to see it!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {topic.items.map((it, i) => (
          <motion.button
            key={`${it.label}-${i}`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSelected(it.label); speak(it.say || it.label); }}
            className={cn('flex flex-col items-center gap-2 rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-md transition-all', selected === it.label ? 'ring-4 ring-primary ring-offset-2' : '')}
          >
            <motion.span className="text-5xl" animate={selected === it.label ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}} transition={{ duration: 0.8 }}>{it.emoji}</motion.span>
            <span className="text-center text-sm font-black text-slate-800 dark:text-slate-100">{it.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => speak(topic.items.map((it) => it.say || it.label).join('\n'))}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-600"
        >
          <Volume2 size={16} /> Play all
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* MORAL STORIES VIEW                                                   */
/* ─────────────────────────────────────────────────────────────────── */

function StoriesView({ goBack }: { goBack: (parent: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());
  const story = MORAL_STORIES.find((s) => s.id === openId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Moral Stories for Kids — Short Bedtime Stories with Morals | Syllab Junior"
        description="Free short moral stories for kids — Thirsty Crow, Lion and the Mouse, Hare and Tortoise and more Panchatantra & Aesop favourites, read aloud. For Pre-KG to Class 3."
        keywords="moral stories for kids, short stories with morals, panchatantra stories, bedtime stories for children, thirsty crow story, hare and tortoise, free kids stories India"
        url={`${SITE}/kids/stories`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'EducationalMaterial', name: 'Moral Stories for Kids', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' } }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary"><ArrowLeft size={14} /> Back to Syllab Junior</button>
      <PageHero emoji="📚" title="Moral Stories" subtitle="Short stories with a lesson — tap a story, then press Read aloud!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still read the stories!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {!story ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {MORAL_STORIES.map((s) => (
            <motion.button key={s.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setOpenId(s.id)}
              className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 text-left shadow-md">
              <span className="text-4xl">{s.emoji}</span>
              <div>
                <h3 className="font-black text-slate-800 dark:text-slate-100">{s.title}</h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Tap to read</p>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">{story.emoji} {story.title}</h2>
            <button onClick={() => { stopSpeaking(); setOpenId(null); }} className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-primary">← All stories</button>
          </div>
          <div className="space-y-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
            {story.lines.map((l, i) => <p key={i}>{l}</p>)}
          </div>
          <p className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 p-3 text-sm font-bold text-amber-800 dark:text-amber-200">🌟 Moral: {story.moral}</p>
          <button onClick={() => speak([...story.lines, `Moral: ${story.moral}`].join('\n'))}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-600">
            <Volume2 size={16} /> Read aloud
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* ACTION RHYMES VIEW                                                   */
/* ─────────────────────────────────────────────────────────────────── */

function ActionRhymesView({ goBack }: { goBack: (parent: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());
  const rhyme = ACTION_RHYMES.find((r) => r.id === openId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Action Rhymes for Kids — Sing & Move | Syllab Junior"
        description="Free action rhymes for preschoolers — Head Shoulders Knees and Toes, Wheels on the Bus, Itsy Bitsy Spider and more, with simple actions to do. For Pre-KG to Class 1."
        keywords="action rhymes for kids, action songs preschool, head shoulders knees and toes, wheels on the bus actions, nursery rhymes with actions, free kids rhymes India"
        url={`${SITE}/kids/action-rhymes`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'EducationalMaterial', name: 'Action Rhymes for Kids', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' } }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary"><ArrowLeft size={14} /> Back to Syllab Junior</button>
      <PageHero emoji="🎶" title="Action Rhymes" subtitle="Sing the words and do the actions — let's move!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still read and practice the actions!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {!rhyme ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {ACTION_RHYMES.map((r) => (
            <motion.button key={r.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setOpenId(r.id)}
              className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 text-left shadow-md">
              <span className="text-4xl">{r.emoji}</span>
              <h3 className="font-black text-slate-800 dark:text-slate-100">{r.title}</h3>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white dark:bg-slate-800 p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">{rhyme.emoji} {rhyme.title}</h2>
            <button onClick={() => { stopSpeaking(); setOpenId(null); }} className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-primary">← All rhymes</button>
          </div>
          <div className="space-y-3">
            {rhyme.lines.map((l, i) => (
              <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-700 p-3">
                <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100">{l.words}</p>
                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">{l.action}</p>
              </div>
            ))}
          </div>
          <button onClick={() => speak(rhyme.lines.map((l) => l.words).join('\n'))}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-600">
            <Volume2 size={16} /> Sing it slowly
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* MATCHING GAMES VIEW                                                  */
/* ─────────────────────────────────────────────────────────────────── */

function GamesView({ goBack }: { goBack: (parent: string) => void }) {
  const [mode, setMode] = useState<'match' | 'memory' | 'odd'>('match');
  const [setId, setSetId] = useState(MATCH_SETS[0].id);
  const set = MATCH_SETS.find((s) => s.id === setId) || MATCH_SETS[0];
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Learning Games for Kids — Matching, Memory & Odd One Out | Syllab Junior"
        description="Free learning games for kids — match animals to sounds & letters, a memory flip game, and odd-one-out. Fun, free educational games for Pre-KG to Class 2."
        keywords="learning games for kids, free kids games, memory game for kids, odd one out game, matching games preschool, educational games India, free online kids games"
        url={`${SITE}/kids/games`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'EducationalMaterial', name: 'Learning Games for Kids', isAccessibleForFree: true, author: { '@type': 'Organization', name: 'Syllab.in' } }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary"><ArrowLeft size={14} /> Back to Syllab Junior</button>
      <PageHero emoji="🧩" title="Learning Games" subtitle="Play and learn — pick a game!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still play the games!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Game type */}
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {([['match', '🧩 Match Pairs'], ['memory', '🧠 Memory'], ['odd', '🔍 Odd One Out']] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className={cn('rounded-full px-4 py-2 text-sm font-black', mode === m ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700')}>{label}</button>
        ))}
      </div>

      {mode === 'match' ? (
        <>
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {MATCH_SETS.map((s) => (
              <button key={s.id} onClick={() => setSetId(s.id)}
                className={cn('rounded-full px-3.5 py-1.5 text-xs font-bold', setId === s.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700')}>
                {s.emoji} {s.title}
              </button>
            ))}
          </div>
          <MatchGame key={set.id} set={set} />
        </>
      ) : mode === 'memory' ? <MemoryGame /> : <OddOneOut />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* ALPHABET VIEW                                                        */
/* ─────────────────────────────────────────────────────────────────── */

function AlphabetView({ goBack }: { goBack: (parent: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Alphabet & Phonics for Kids — A-Z Learning | Syllab Junior"
        description="Free interactive alphabet and phonics learning for Pre-KG to Class 1 kids — A-Z with example words, sounds, and emojis."
        keywords="alphabet for kids, phonics for children, learning A-Z, kindergarten alphabet, free alphabet learning, Indian kids learning"
        url={`${SITE}/kids/alphabet`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EducationalMaterial',
          name: 'Alphabet & Phonics for Kids',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🔤" title="Alphabet & Phonics" subtitle="Tap each letter to learn the sound and an example word!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still tap letters and see them!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Letter Grid */}
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {alphabetTiles.map((tile) => (
          <motion.button
            key={tile.letter}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { const next = selected === tile.letter ? null : tile.letter; setSelected(next); if (next) speak(`${tile.letter}. ${tile.letter} for ${tile.word}.`); }}
            className={cn(
              'flex flex-col items-center justify-center rounded-2xl p-4 font-black text-white shadow-md transition-all',
              tile.colorClass,
              selected === tile.letter ? 'ring-4 ring-offset-2 ring-slate-900' : '',
            )}
          >
            <div className="text-3xl">{tile.letter}</div>
            <div className="mt-1 text-sm opacity-80">{tile.lowercase}</div>
          </motion.button>
        ))}
      </div>

      {/* Detail Card — animated "A for Apple" */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-amber-50 dark:from-slate-800 via-rose-50 dark:via-slate-800 to-sky-50 dark:to-slate-800 p-6 shadow-lg"
        >
          {(() => {
            const tile = alphabetTiles.find((t) => t.letter === selected);
            if (!tile) return null;
            return (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
                {/* Big animated letter */}
                <motion.div
                  key={`L-${tile.letter}`}
                  initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className={cn('flex h-28 w-28 items-center justify-center rounded-3xl text-white shadow-xl', tile.colorClass)}
                >
                  <span className="text-6xl font-black leading-none">{tile.letter}<span className="opacity-70">{tile.lowercase}</span></span>
                </motion.div>

                {/* Bouncing emoji + word */}
                <div className="text-center">
                  <motion.div
                    key={`E-${tile.letter}`}
                    className="text-7xl"
                    animate={{ y: [0, -14, 0], rotate: [0, -6, 6, 0], scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {tile.emoji}
                  </motion.div>
                  <motion.div
                    key={`W-${tile.letter}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-3 text-2xl font-black text-slate-800 dark:text-slate-100"
                  >
                    {tile.letter} for {tile.word}
                  </motion.div>
                  <button
                    onClick={() => speak(`${tile.letter}. ${tile.letter} for ${tile.word}.`)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-black text-white shadow hover:bg-emerald-600"
                  >
                    🔊 Say it again
                  </button>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* NUMBERS VIEW                                                         */
/* ─────────────────────────────────────────────────────────────────── */

function NumbersView({ goBack }: { goBack: (parent: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Numbers & Counting 1-20 — Free Math Learning | Syllab Junior"
        description="Free interactive counting and numbers learning for Pre-KG to Class 2 kids — count 1 to 20 with visual dots and emojis."
        keywords="counting numbers, numbers 1-20, learning to count, kids math, kindergarten numbers, free counting lessons, Indian kids learning"
        url={`${SITE}/kids/numbers`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EducationalMaterial',
          name: 'Numbers & Counting for Kids',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🔢" title="Numbers & Counting" subtitle="Tap each number to count and see the visual dots!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still tap numbers and see the dots!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Number Grid */}
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {numberTiles.map((tile) => (
          <motion.button
            key={tile.number}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { const next = selected === tile.number ? null : tile.number; setSelected(next); if (next !== null) speak(tile.word); }}
            className={cn(
              'flex flex-col items-center justify-center rounded-2xl p-4 font-black text-white shadow-md transition-all',
              tile.colorClass,
              selected === tile.number ? 'ring-4 ring-offset-2 ring-slate-900' : '',
            )}
          >
            <div className="text-3xl">{tile.number}</div>
            <div className="mt-1 text-xs opacity-80">{tile.word}</div>
          </motion.button>
        ))}
      </div>

      {/* Detail Card with Counting Dots */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 dark:from-slate-800 to-green-50 dark:to-slate-800 p-6 shadow-lg"
        >
          {(() => {
            const tile = numberTiles.find((t) => t.number === selected);
            if (!tile) return null;
            return (
              <div>
                <div className="text-center">
                  <div className="text-5xl">{tile.emoji}</div>
                  <div className="mt-3 text-lg font-black text-slate-800 dark:text-slate-100">{tile.word}</div>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {Array.from({ length: tile.number }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-md"
                    />
                  ))}
                </div>
                <div className="mt-4 text-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  Count: {tile.number} dot{tile.number !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* SHAPES VIEW                                                          */
/* ─────────────────────────────────────────────────────────────────── */

function ShapesView({ goBack }: { goBack: (parent: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Shapes & Colors for Kids — Free Learning | Syllab Junior"
        description="Free interactive shapes and colors learning for Pre-KG kids — learn basic shapes like circle, square, triangle, and colors."
        keywords="shapes for kids, learning colors, circle square triangle, geometry for kids, kindergarten shapes, free shape learning"
        url={`${SITE}/kids/shapes`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EducationalMaterial',
          name: 'Shapes & Colors for Kids',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🎨" title="Shapes & Colors" subtitle="Tap each shape to learn about it and its color!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still tap shapes and learn about them!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Shape Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shapeTiles.map((tile) => (
          <motion.button
            key={tile.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { const next = selected === tile.name ? null : tile.name; setSelected(next); if (next) speak(tile.name); }}
            className={cn(
              'flex flex-col items-center justify-center rounded-2xl p-6 text-white shadow-md transition-all',
              tile.colorClass,
              selected === tile.name ? 'ring-4 ring-offset-2 ring-slate-900' : '',
            )}
          >
            <div className="text-5xl">{tile.emoji}</div>
            <div className="mt-2 text-base font-black">{tile.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Detail Card */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg"
        >
          {(() => {
            const tile = shapeTiles.find((t) => t.name === selected);
            if (!tile) return null;
            return (
              <div className="text-center">
                <div className="text-6xl">{tile.emoji}</div>
                <div className="mt-3 text-lg font-black text-slate-800 dark:text-slate-100">{tile.name}</div>
                <div className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: tile.color }}>
                  {tile.colorName}
                </div>
                <div className="mt-4 text-sm text-slate-700 dark:text-slate-300">{tile.description}</div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* NURSERY RHYMES VIEW                                                  */
/* ─────────────────────────────────────────────────────────────────── */

function RhymesView({ goBack }: { goBack: (parent: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ttsUnavailable, setTtsUnavailable] = useState(!isTtsAvailable());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <SEO
        title="Nursery Rhymes & Songs for Kids — Free Learning | Syllab Junior"
        description="Free classic nursery rhymes for Pre-KG to Class 2 kids — Twinkle Twinkle, Baa Baa Black Sheep, and more public-domain rhymes with lyrics."
        keywords="nursery rhymes for kids, classic rhymes, Twinkle Twinkle Little Star, Jack and Jill, kids songs, free rhymes, kindergarten songs"
        url={`${SITE}/kids/rhymes`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Nursery Rhymes for Kids',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🎵" title="Nursery Rhymes" subtitle="Classic songs and rhymes to sing together!" className="mb-6" />

      {/* TTS unavailable notice */}
      {ttsUnavailable && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-300">
          <div className="flex-1 text-sm font-medium">🔇 Audio isn't available on this browser/device — you can still read and watch the lyrics!</div>
          <button onClick={() => setTtsUnavailable(false)} className="shrink-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Rhyme Cards */}
      <div className="space-y-3">
        {nurseryRhymes.map((rhyme) => (
          <motion.button
            key={rhyme.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { const next = selectedId === rhyme.id ? null : rhyme.id; setSelectedId(next); stopSpeaking(); }}
            className={cn(
              'w-full rounded-2xl p-4 text-left shadow-md transition-all',
              rhyme.colorClass,
              selectedId === rhyme.id ? 'ring-2 ring-slate-900 dark:ring-slate-100' : '',
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{rhyme.emoji}</span>
                <h3 className="font-black text-slate-800 dark:text-slate-100">{rhyme.title}</h3>
              </div>
              {hasVideo(rhyme.youtubeVideoId)
                ? <span className="shrink-0 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">▶ Sing-along</span>
                : <Volume2 size={18} className="text-slate-600 dark:text-slate-400" />}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail View */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-lg"
        >
          {(() => {
            const rhyme = nurseryRhymes.find((r) => r.id === selectedId);
            if (!rhyme) return null;
            return (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-4xl">{rhyme.emoji}</span>
                  <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">{rhyme.title}</h2>
                </div>

                {hasVideo(rhyme.youtubeVideoId) ? (
                  <div className="mb-4">
                    <iframe
                      title={rhyme.title}
                      src={`https://www.youtube-nocookie.com/embed/${rhyme.youtubeVideoId}?rel=0&modestbranding=1`}
                      className="aspect-video w-full rounded-xl border border-slate-200 dark:border-slate-700"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                    <p className="mt-1 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500">🎵 Sung version by Super Simple Songs — press play to sing along!</p>
                  </div>
                ) : null}

                <div className="whitespace-pre-line rounded-xl bg-slate-50 dark:bg-slate-700 p-4 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {rhyme.lyrics}
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => speak(rhyme.lyrics, { singy: true })}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-600"
                  >
                    <Volume2 size={16} /> {hasVideo(rhyme.youtubeVideoId) ? 'Read the words slowly' : 'Sing it'}
                  </button>
                  <button
                    onClick={stopSpeaking}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-200"
                  >
                    ⏹ Stop
                  </button>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* COLORING PAGES VIEW                                                  */
/* ─────────────────────────────────────────────────────────────────── */

function ColoringView({ goBack }: { goBack: (parent: string) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Free Coloring Pages for Kids — Printable Sheets | Syllab Junior"
        description="Free printable coloring pages for Pre-KG to Class 3 kids — simple, original SVG outlines of stars, fish, houses, flowers, cars, and more."
        keywords="coloring pages for kids, free coloring sheets, printable coloring pages, kids drawing activities, preschool coloring, Indian kids"
        url={`${SITE}/kids/coloring`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Free Coloring Pages for Kids',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: 'Syllab.in' },
        }}
      />
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🖍️" title="Coloring Pages" subtitle="Printable coloring sheets — ready to color and create!" className="mb-6" />

      {/* Interactive colour-fill studio */}
      <ColoringStudio pages={coloringPages} />

      {/* Tip */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-4 text-center text-xs font-bold text-orange-700">
        🎨 Tip: Tap a colour, then tap parts of the picture to fill them. Hit “Save my art” to keep your masterpiece — or “Reset” to start fresh!
      </div>
    </div>
  );
}
