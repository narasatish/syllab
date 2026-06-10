/**
 * Kids / Pre-School section (Pre-KG to Class 3)
 * Lightweight, playful, mobile-first, with CSS animations and inline SVG
 * Routes: /kids (index), /kids/alphabet, /kids/numbers, /kids/shapes, /kids/rhymes, /kids/coloring
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Volume2 } from 'lucide-react';
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

const SITE = 'https://syllab.in';

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
let speakToken = 0;
function speak(text: string, opts: { singy?: boolean } = {}) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text.trim()) return;
    window.speechSynthesis.cancel();
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

interface ParsedKidsPath {
  view?: 'alphabet' | 'numbers' | 'shapes' | 'rhymes' | 'coloring' | 'tracing';
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
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/kids'));

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

  if (!ready) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-slate-400">Loading Syllab Junior…</div>;
  }

  const { view } = parsePath(path);

  // ── Sub-views ──
  if (view === 'alphabet') return <AlphabetView goBack={goBack} />;
  if (view === 'numbers') return <NumbersView goBack={goBack} />;
  if (view === 'shapes') return <ShapesView goBack={goBack} />;
  if (view === 'rhymes') return <RhymesView goBack={goBack} />;
  if (view === 'coloring') return <ColoringView goBack={goBack} />;
  if (view === 'tracing') return <TracingPad goBack={goBack} />;

  // ── Index view ──
  return <KidsIndex go={go} />;
}

/* ─────────────────────────────────────────────────────────────────── */
/* INDEX VIEW — Colorful main menu                                     */
/* ─────────────────────────────────────────────────────────────────── */

function KidsIndex({ go }: { go: (to: string) => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
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

      {/* Age Group Info */}
      <div className="mb-8 grid gap-3 rounded-2xl bg-blue-50 p-4 sm:grid-cols-4">
        <div className="text-center text-xs font-bold text-blue-700">
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
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">📚 Activities</h2>
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
        </div>
      </div>

      {/* Fun Fact */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center text-xs font-bold text-purple-700">
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
/* ALPHABET VIEW                                                        */
/* ─────────────────────────────────────────────────────────────────── */

function AlphabetView({ goBack }: { goBack: (parent: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🔤" title="Alphabet & Phonics" subtitle="Tap each letter to learn the sound and an example word!" className="mb-6" />

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

      {/* Detail Card */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-lg"
        >
          {(() => {
            const tile = alphabetTiles.find((t) => t.letter === selected);
            if (!tile) return null;
            return (
              <div className="text-center">
                <div className="text-6xl">{tile.emoji}</div>
                <div className="mt-3 text-lg font-black text-slate-800">{tile.word}</div>
                <div className="mt-2 text-sm text-slate-600">Try saying: "{tile.word}" starts with "{tile.letter}"</div>
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🔢" title="Numbers & Counting" subtitle="Tap each number to count and see the visual dots!" className="mb-6" />

      {/* Number Grid */}
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {numberTiles.map((tile) => (
          <motion.button
            key={tile.number}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { const next = selected === tile.number ? null : tile.number; setSelected(next); if (next !== null) speak(`${tile.number}. ${tile.word}.`); }}
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
          className="mt-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-green-50 p-6 shadow-lg"
        >
          {(() => {
            const tile = numberTiles.find((t) => t.number === selected);
            if (!tile) return null;
            return (
              <div>
                <div className="text-center">
                  <div className="text-5xl">{tile.emoji}</div>
                  <div className="mt-3 text-lg font-black text-slate-800">{tile.word}</div>
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
                <div className="mt-4 text-center text-sm font-bold text-slate-700">
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🎨" title="Shapes & Colors" subtitle="Tap each shape to learn about it and its color!" className="mb-6" />

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
          className="mt-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg"
        >
          {(() => {
            const tile = shapeTiles.find((t) => t.name === selected);
            if (!tile) return null;
            return (
              <div className="text-center">
                <div className="text-6xl">{tile.emoji}</div>
                <div className="mt-3 text-lg font-black text-slate-800">{tile.name}</div>
                <div className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: tile.color }}>
                  {tile.colorName}
                </div>
                <div className="mt-4 text-sm text-slate-700">{tile.description}</div>
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
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
      <button onClick={() => goBack('/kids')} className="mb-4 inline-flex items-center gap-1 text-xs font-black text-slate-500 hover:text-primary">
        <ArrowLeft size={14} /> Back to Syllab Junior
      </button>
      <PageHero emoji="🎵" title="Nursery Rhymes" subtitle="Classic songs and rhymes to sing together!" className="mb-6" />

      {/* Rhyme Cards */}
      <div className="space-y-3">
        {nurseryRhymes.map((rhyme) => (
          <motion.button
            key={rhyme.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { const next = selectedId === rhyme.id ? null : rhyme.id; setSelectedId(next); if (next) speak(rhyme.lyrics, { singy: true }); }}
            className={cn(
              'w-full rounded-2xl p-4 text-left shadow-md transition-all',
              rhyme.colorClass,
              selectedId === rhyme.id ? 'ring-2 ring-slate-900' : '',
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{rhyme.emoji}</span>
                <h3 className="font-black text-slate-800">{rhyme.title}</h3>
              </div>
              <Volume2 size={18} className="text-slate-600" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail View */}
      {selectedId && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl bg-white p-6 shadow-lg"
        >
          {(() => {
            const rhyme = nurseryRhymes.find((r) => r.id === selectedId);
            if (!rhyme) return null;
            return (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-4xl">{rhyme.emoji}</span>
                  <h2 className="text-lg font-black text-slate-800">{rhyme.title}</h2>
                </div>
                <div className="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700">
                  {rhyme.lyrics}
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => speak(rhyme.lyrics, { singy: true })}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-600"
                  >
                    <Volume2 size={16} /> Sing it
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
