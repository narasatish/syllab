/**
 * WordCounterPage.tsx — free live word & character counter for essays and
 * assignments. Shows words, characters (with/without spaces), sentences,
 * paragraphs, lines and reading/speaking time as you type. Pure client-side
 * (src/lib/textStats). Indexable SEO page.
 */
import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';
import { textStats, formatDuration } from '../lib/textStats';

const SITE = 'https://syllab.in';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 text-center shadow-sm">
      <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{value}</div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
}

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const s = useMemo(() => textStats(text), [text]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SEO
        title="Word Counter — Free Words & Character Count Online | Syllab.in"
        description="Free online word counter and character counter. Paste your essay or assignment to instantly see word count, characters (with and without spaces), sentences, paragraphs and reading time. Nothing uploaded, works in your browser."
        keywords="word counter, character counter, word count online, count words, essay word count, character count, words to minutes, reading time calculator, free word counter"
        url={`${SITE}/word-counter`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Word Counter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/word-counter`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🔢" title="Word & Character Counter" subtitle="Paste your text to count words, characters, sentences and reading time — live." className="mb-6" />

      <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
        placeholder="Start typing or paste your essay / assignment here…"
        className="h-56 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Words" value={s.words.toLocaleString('en-IN')} />
        <Stat label="Characters" value={s.characters.toLocaleString('en-IN')} />
        <Stat label="No spaces" value={s.charactersNoSpaces.toLocaleString('en-IN')} />
        <Stat label="Sentences" value={s.sentences.toLocaleString('en-IN')} />
        <Stat label="Paragraphs" value={s.paragraphs.toLocaleString('en-IN')} />
        <Stat label="Lines" value={s.lines.toLocaleString('en-IN')} />
        <Stat label="Reading time" value={formatDuration(s.readingSeconds)} />
        <Stat label="Speaking time" value={formatDuration(s.speakingSeconds)} />
      </div>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">A fast, private word counter for students</h2>
        <p>Hitting an essay or assignment <strong>word limit</strong>? Paste your text to see the <strong>word count, character count</strong> (with and without spaces), sentences, paragraphs and estimated <strong>reading and speaking time</strong> — updated live as you type. Everything runs in your browser, so your writing is never uploaded. Reading time assumes ~200 words per minute and speaking ~130.</p>
        <p>Need to listen to your notes instead? Try the free <a href="/text-to-speech" className="font-bold text-primary hover:underline">Text-to-Speech</a> reader, or pull text out of a photo with <a href="/image-to-text" className="font-bold text-primary hover:underline">Image to Text</a>.</p>
      </section>

      <ToolRelated current="/word-counter" />
    </div>
  );
}
