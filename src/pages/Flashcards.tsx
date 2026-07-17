/**
 * Flashcards.tsx — free spaced-repetition flashcards. Create your own decks,
 * study with a flip interface, and let the SM-2 scheduler (lib/flashcards.ts)
 * decide when to show each card again. Everything is stored on-device in
 * localStorage. Indexable SEO page.
 */
import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, RotateCcw, Layers, GraduationCap } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { scheduleCard, dueCards, newCard, type Deck, type Card, type Grade } from '../lib/flashcards';
import { recordStat } from '../lib/toolStats';

const SITE = 'https://syllab.in';
const STORE_KEY = 'syllab_flashcards_v1';

function todayISO(): string {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function uid(): string { return Math.random().toString(36).slice(2, 10); }

const STARTER: Deck[] = [
  {
    id: 'starter-bio', name: 'Sample: Biology basics',
    cards: [
      ['Powerhouse of the cell?', 'Mitochondria'],
      ['Process plants use to make food?', 'Photosynthesis'],
      ['Gas released during photosynthesis?', 'Oxygen'],
    ].map(([f, b]) => newCard(uid(), f, b, todayISO())),
  },
];

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: 'again', label: 'Again', cls: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
  { g: 'hard', label: 'Hard', cls: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
  { g: 'good', label: 'Good', cls: 'bg-sky-100 text-sky-700 hover:bg-sky-200' },
  { g: 'easy', label: 'Easy', cls: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
];

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [studying, setStudying] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState<string[]>([]); // card ids to review this session
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newDeckName, setNewDeckName] = useState('');

  // Load once.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      const loaded: Deck[] = raw ? JSON.parse(raw) : STARTER;
      setDecks(loaded.length ? loaded : STARTER);
      setActiveId((loaded[0] || STARTER[0]).id);
    } catch { setDecks(STARTER); setActiveId(STARTER[0].id); }
  }, []);

  // Persist on change (after initial load).
  useEffect(() => { if (decks.length) { try { localStorage.setItem(STORE_KEY, JSON.stringify(decks)); } catch { /* ignore */ } } }, [decks]);

  const active = useMemo(() => decks.find((d) => d.id === activeId) || null, [decks, activeId]);
  const due = useMemo(() => (active ? dueCards(active.cards, todayISO()) : []), [active]);
  const current = useMemo(() => (studying && queue.length && active ? active.cards.find((c) => c.id === queue[0]) : null), [studying, queue, active]);

  const updateActive = (fn: (d: Deck) => Deck) => setDecks((ds) => ds.map((d) => (d.id === activeId ? fn(d) : d)));

  const startStudy = () => { if (!active) return; setQueue(dueCards(active.cards, todayISO()).map((c) => c.id)); setFlipped(false); setStudying(true); };
  const grade = (g: Grade) => {
    if (!current) return;
    recordStat('flashcard'); // counts toward the study streak on /tools
    updateActive((d) => ({ ...d, cards: d.cards.map((c) => (c.id === current.id ? scheduleCard(c, g, todayISO()) : c)) }));
    // 'again' pushes the card to the back of this session's queue; others drop it.
    setQueue((q) => (g === 'again' ? [...q.slice(1), q[0]] : q.slice(1)));
    setFlipped(false);
  };

  const addCard = () => {
    if (!active || !newFront.trim() || !newBack.trim()) return;
    updateActive((d) => ({ ...d, cards: [...d.cards, newCard(uid(), newFront, newBack, todayISO())] }));
    setNewFront(''); setNewBack('');
  };
  const removeCard = (id: string) => updateActive((d) => ({ ...d, cards: d.cards.filter((c) => c.id !== id) }));
  const addDeck = () => {
    const name = newDeckName.trim(); if (!name) return;
    const id = uid();
    setDecks((ds) => [...ds, { id, name, cards: [] }]); setActiveId(id); setNewDeckName('');
  };
  const removeDeck = (id: string) => {
    setDecks((ds) => { const next = ds.filter((d) => d.id !== id); setActiveId(next[0]?.id || null); return next; });
  };

  const studyDone = studying && queue.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <SEO
        title="Free Flashcards with Spaced Repetition | Syllab.in"
        description="Make free flashcards and study smarter with spaced repetition (SM-2). Create your own decks, flip cards, and let the app schedule each card for the perfect time to review. Saved on your device. For CBSE, JEE & NEET."
        keywords="flashcards free, spaced repetition app, flashcard maker, study flashcards online, Anki alternative free, active recall, revision flashcards CBSE JEE NEET"
        url={`${SITE}/flashcards`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Flashcards', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: `${SITE}/flashcards`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🃏" title="Flashcards" subtitle="Make your own flashcards and study with spaced repetition — the app schedules each card for the best time to review. Free, saved on your device." className="mb-6" />

      {/* Deck switcher */}
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        {decks.map((d) => (
          <button key={d.id} type="button" onClick={() => { setActiveId(d.id); setStudying(false); }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition ${activeId === d.id ? 'bg-primary text-white shadow' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            <Layers size={13} /> {d.name} <span className="opacity-60">({d.cards.length})</span>
          </button>
        ))}
        <div className="inline-flex items-center gap-1">
          <input value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} placeholder="New deck…" onKeyDown={(e) => e.key === 'Enter' && addDeck()}
            className="w-28 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
          <button type="button" onClick={addDeck} aria-label="Add deck" className="rounded-full bg-slate-100 dark:bg-slate-700 p-1.5 text-slate-600 hover:bg-slate-200"><Plus size={14} /></button>
        </div>
      </div>

      {active && !studying && (
        <>
          {/* Study CTA */}
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-100/40 dark:from-primary/20 dark:to-slate-800 border border-primary/20 p-5 text-center">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{due.length > 0 ? `${due.length} card${due.length === 1 ? '' : 's'} due for review today` : 'No cards due right now — add some or come back later.'}</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button type="button" onClick={startStudy} disabled={due.length === 0} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow hover:opacity-90 disabled:opacity-40 transition"><GraduationCap size={16} /> Study now</button>
              {decks.length > 1 && <button type="button" onClick={() => removeDeck(active.id)} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 px-3 py-2.5 text-xs font-black text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"><Trash2 size={14} /> Delete deck</button>}
            </div>
          </div>

          {/* Add card */}
          <div className="mt-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-2">Add a card to “{active.name}”</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <textarea value={newFront} onChange={(e) => setNewFront(e.target.value)} placeholder="Front (question / term)" rows={2} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
              <textarea value={newBack} onChange={(e) => setNewBack(e.target.value)} placeholder="Back (answer / definition)" rows={2} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <button type="button" onClick={addCard} disabled={!newFront.trim() || !newBack.trim()} className="mt-2 inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-black text-white hover:opacity-90 disabled:opacity-40 transition"><Plus size={14} /> Add card</button>
          </div>

          {/* Card list */}
          {active.cards.length > 0 && (
            <div className="mt-4 space-y-2">
              {active.cards.map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
                  <div className="min-w-0 text-sm">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{c.front}</p>
                    <p className="text-slate-500 dark:text-slate-400 truncate">{c.back}</p>
                  </div>
                  <button type="button" onClick={() => removeCard(c.id)} aria-label="Delete card" className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Study mode */}
      {active && studying && !studyDone && current && (
        <div className="mt-6">
          <p className="mb-2 text-center text-xs font-bold text-slate-400">{queue.length} left in this session</p>
          <button type="button" onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[220px] rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-lg flex items-center justify-center text-center transition hover:shadow-xl">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{flipped ? 'Answer' : 'Question'} · tap to flip</p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{flipped ? current.back : current.front}</p>
            </div>
          </button>
          {flipped ? (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GRADES.map((x) => (
                <button key={x.g} type="button" onClick={() => grade(x.g)} className={`rounded-xl px-2 py-3 text-xs font-black transition ${x.cls}`}>{x.label}</button>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-center text-xs text-slate-400">Tap the card to reveal the answer, then rate how well you knew it.</p>
          )}
          <button type="button" onClick={() => setStudying(false)} className="mt-4 mx-auto block text-xs font-bold text-slate-400 hover:text-slate-600">End session</button>
        </div>
      )}

      {active && studying && studyDone && (
        <div className="mt-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 p-6 text-center">
          <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">All done for today! 🎉</p>
          <p className="mt-1 text-sm font-bold text-emerald-600/80">You reviewed every due card in “{active.name}”. Come back tomorrow for the next batch.</p>
          <button type="button" onClick={() => setStudying(false)} className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100 transition"><RotateCcw size={14} /> Back to deck</button>
        </div>
      )}

      {(!studying) && (
        <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Why spaced-repetition flashcards work</h2>
          <p>Flashcards use <strong>active recall</strong> — forcing your brain to retrieve an answer, which builds much stronger memory than re-reading. <strong>Spaced repetition</strong> then shows each card at increasing intervals (1 day, 6 days, then longer), reviewing weak cards more often and strong ones less. It is the most efficient way to memorise formulas, definitions, dates and vocabulary for CBSE boards, JEE and NEET.</p>
          <p>Rate each card <em>Again</em>, <em>Hard</em>, <em>Good</em> or <em>Easy</em> and the scheduler (based on the proven SM-2 algorithm) picks the best day to show it next. Your decks are saved on this device — free, no sign-up. Pair them with the free <a href="/study-planner" className="font-bold text-primary hover:underline">study planner</a> and <a href="/mock-tests" className="font-bold text-primary hover:underline">mock tests</a>.</p>
        </section>
      )}

      <ToolRelated current="/flashcards" />
    </div>
  );
}
