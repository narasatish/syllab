/**
 * TextToSpeechPage.tsx — free text-to-speech reader. Paste text and have the
 * browser read it aloud (Web Speech API — no server, no upload). Choose a voice,
 * speed and pitch; play, pause and stop. Great for revising notes and for
 * accessibility. Indexable SEO page.
 */
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import PageHero from '../components/PageHero';
import ToolRelated from '../components/ToolRelated';
import SEO from '../components/SEO';

const SITE = 'https://syllab.in';

export default function TextToSpeechPage() {
  const [text, setText] = useState('Paste your notes here and press Play to listen. Syllab will read them aloud.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices (they populate asynchronously in most browsers).
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      if (!list.length) return;
      setVoices(list);
      setVoiceURI((cur) => cur || (list.find((v) => /en[-_]IN/i.test(v.lang)) || list.find((v) => /^en/i.test(v.lang)) || list[0]).voiceURI);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; window.speechSynthesis.cancel(); };
  }, [supported]);

  const play = () => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.rate = rate; u.pitch = pitch;
    u.onend = () => { setSpeaking(false); setPaused(false); };
    u.onerror = () => { setSpeaking(false); setPaused(false); };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setSpeaking(true); setPaused(false);
  };
  const pauseResume = () => {
    if (!supported) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };
  const stop = () => { if (supported) window.speechSynthesis.cancel(); setSpeaking(false); setPaused(false); };

  const inputCls = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <SEO
        title="Text to Speech — Free Online Voice Reader | Syllab.in"
        description="Free text-to-speech reader. Paste any text or your notes and have them read aloud in a natural voice — choose the voice, speed and pitch. Runs in your browser, nothing uploaded. Great for revision and accessibility."
        keywords="text to speech, tts, read text aloud, text to speech online free, voice reader, read notes aloud, text to voice, natural text to speech"
        url={`${SITE}/text-to-speech`}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Syllab Text to Speech', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: `${SITE}/text-to-speech`, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } }}
      />
      <PageHero emoji="🔊" title="Text to Speech" subtitle="Paste text and listen — choose a voice, speed and pitch. Free, in your browser." className="mb-6" />

      <textarea value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Paste the text you want read aloud…"
        className="h-40 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed outline-none focus:border-primary dark:bg-slate-900 dark:border-slate-700" />

      {!supported ? (
        <p className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm font-bold text-amber-700">Your browser doesn’t support speech. Try Chrome, Edge or Safari.</p>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Voice</span>
              <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)} className={`mt-1 w-full ${inputCls}`}>
                {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
              </select>
            </label>
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Speed · {rate.toFixed(1)}×</span>
              <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-3 w-full accent-primary" /></label>
            <label className="block"><span className="text-[11px] font-bold text-slate-500">Pitch · {pitch.toFixed(1)}</span>
              <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="mt-3 w-full accent-primary" /></label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={play} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-white shadow hover:opacity-90 transition"><Play size={16} /> Play</button>
            <button type="button" onClick={pauseResume} disabled={!speaking} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 px-5 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-40 transition"><Pause size={16} /> {paused ? 'Resume' : 'Pause'}</button>
            <button type="button" onClick={stop} disabled={!speaking} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 px-5 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-40 transition"><Square size={15} /> Stop</button>
          </div>
        </>
      )}

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">Listen to your notes anywhere</h2>
        <p>Turn any text into speech and <strong>listen while you revise, walk or rest your eyes</strong>. Pick a voice, adjust the speed and pitch, and press Play. It uses your browser’s built-in voices, so nothing is uploaded and it works offline. The voices available depend on your device and browser.</p>
        <p>Want to count your words first? Use the free <a href="/word-counter" className="font-bold text-primary hover:underline">Word Counter</a>. Have a photo of notes? <a href="/image-to-text" className="font-bold text-primary hover:underline">Image to Text</a> extracts the words for you.</p>
      </section>

      <ToolRelated current="/text-to-speech" />
    </div>
  );
}
