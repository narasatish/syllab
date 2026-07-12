/**
 * LiveTutor — a hands-free, human-like AI study companion ("Sahay").
 *
 * ONE control: Start / Stop. While live it continuously listens, auto-submits
 * after a short silence, thinks (Gemini, on-demand), then speaks the answer
 * aloud and resumes listening — a natural back-and-forth, no extra buttons.
 *
 * Voice in = browser SpeechRecognition, voice out = speechSynthesis (both free).
 * A premium "human voice" path is scaffolded but INERT until a key is provided
 * (VITE_PREMIUM_VOICE_KEY) — base stays 100% free.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, Square, Loader2, Volume2, Sparkles, X } from 'lucide-react';
import { askTutor } from '../lib/api';
import { cn } from '../lib/utils';

type Turn = { role: 'user' | 'model'; parts: { text: string }[] };
type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

const SILENCE_MS = 1400;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SR = (typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) || null;
const SPEECH_IN = !!SR;
const SPEECH_OUT = typeof window !== 'undefined' && !!window.speechSynthesis;
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const PREMIUM_VOICE = !!import.meta.env.VITE_PREMIUM_VOICE_KEY; // inert scaffold

const SYSTEM =
  'You are Sahay, a warm, brilliant AI study companion for an Indian student. ' +
  'Answer ANY question — academic or general — clearly and accurately. You are being read aloud, ' +
  'so reply in a natural, spoken, encouraging style, usually under 90 words (go longer only if asked). ' +
  'If the speech transcript seems mis-heard or mispronounced, infer the most likely intended question and answer that. ' +
  'Use simple words, give a quick example when helpful, and end with a short encouraging nudge.';

function pickVoice(): SpeechSynthesisVoice | null {
  const v = window.speechSynthesis?.getVoices() || [];
  if (!v.length) return null;
  return v.find((x) => x.lang === 'en-IN') || v.find((x) => /female|heera|samantha|google uk english female/i.test(x.name) && /^en/i.test(x.lang)) || v.find((x) => /^en/i.test(x.lang)) || v[0];
}

interface Props { onActivity?: () => void; onSpeakingChange?: (speaking: boolean) => void; context?: string }

export default function LiveTutor({ onActivity, onSpeakingChange, context }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [live, setLive] = useState(false);
  const [interim, setInterim] = useState('');
  const [lastQ, setLastQ] = useState('');
  const [lastA, setLastA] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const wants = useRef(false);
  const transcript = useRef('');
  const silence = useRef<number | null>(null);
  const history = useRef<Turn[]>([]);
  const statusRef = useRef<Status>('idle');
  const setStat = (s: Status) => { statusRef.current = s; setStatus(s); };

  useEffect(() => {
    if (!SPEECH_OUT) return;
    const load = () => { voiceRef.current = pickVoice(); };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  const clearSilence = () => { if (silence.current) { window.clearTimeout(silence.current); silence.current = null; } };

  const speak = useCallback((text: string, onDone: () => void) => {
    if (!SPEECH_OUT || !text.trim()) { onDone(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceRef.current?.lang || 'en-IN';
    u.rate = 0.98; u.pitch = 1.05;
    if (voiceRef.current) u.voice = voiceRef.current;
    const guard = window.setTimeout(onDone, 20_000);
    u.onend = () => { window.clearTimeout(guard); onDone(); };
    u.onerror = () => { window.clearTimeout(guard); onDone(); };
    onSpeakingChange?.(true);
    window.speechSynthesis.speak(u);
  }, [onSpeakingChange]);

  // Forward-declared via ref so handlers can call the latest version.
  const startListenRef = useRef<() => void>(() => {});

  const submitTurn = useCallback(async () => {
    const q = transcript.current.trim();
    transcript.current = '';
    setInterim('');
    if (!q) { startListenRef.current(); return; }
    onActivity?.();
    try { recRef.current?.stop(); } catch { /* ignore */ }
    setLastQ(q);
    setStat('thinking');
    history.current.push({ role: 'user', parts: [{ text: q }] });
    try {
      // Syllabus-aware: bias answers to what the student is actually studying right now.
      const sys = context?.trim()
        ? `${SYSTEM} The student is currently studying "${context.trim()}" — pitch your answer at that class/topic level and tie it back to that when relevant.`
        : SYSTEM;
      const a = await askTutor(`${sys}\n\nStudent: ${q}`, history.current.slice(-6));
      const answer = a || 'Sorry, I did not catch that. Could you ask again?';
      history.current.push({ role: 'model', parts: [{ text: answer }] });
      setLastA(answer);
      setStat('speaking');
      speak(answer, () => {
        onSpeakingChange?.(false);
        if (wants.current) { setStat('listening'); startListenRef.current(); }
        else setStat('idle');
      });
    } catch (e) {
      setErr((e as Error)?.message || 'Could not reach the AI teacher.');
      onSpeakingChange?.(false);
      if (wants.current) { setStat('listening'); startListenRef.current(); } else setStat('idle');
    }
  }, [onActivity, onSpeakingChange, speak]);

  const startListen = useCallback(() => {
    if (!SPEECH_IN) { setErr('Voice needs Chrome or Edge (desktop / Android).'); return; }
    if (recRef.current) return;
    const rec = new SR();
    rec.lang = 'en-IN'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let fin = '', itm = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) fin += r[0].transcript; else itm += r[0].transcript;
      }
      if (fin) transcript.current += (transcript.current ? ' ' : '') + fin.trim();
      setInterim(itm);
      onActivity?.();
      clearSilence();
      silence.current = window.setTimeout(() => { if (transcript.current.trim()) void submitTurn(); }, SILENCE_MS);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      if (e.error === 'not-allowed') { setErr('Microphone blocked. Allow mic access and try again.'); wants.current = false; setStat('idle'); }
    };
    rec.onend = () => {
      recRef.current = null;
      if (wants.current && statusRef.current === 'listening') {
        window.setTimeout(() => { if (wants.current && statusRef.current === 'listening') startListen(); }, 250);
      }
    };
    try { recRef.current = rec; rec.start(); setStat('listening'); } catch { /* will retry via onend */ }
  }, [onActivity, submitTurn]);
  startListenRef.current = startListen;

  const start = useCallback(() => {
    setErr(null);
    wants.current = true;
    setLive(true);
    // resume audio context for TTS on iOS
    try { window.speechSynthesis?.resume?.(); } catch { /* ignore */ }
    startListen();
  }, [startListen]);

  const stop = useCallback(() => {
    wants.current = false;
    clearSilence();
    try { recRef.current?.stop(); } catch { /* ignore */ }
    recRef.current = null;
    if (SPEECH_OUT) window.speechSynthesis.cancel();
    onSpeakingChange?.(false);
    setLive(false);
    setInterim('');
    setStat('idle');
  }, [onSpeakingChange]);

  useEffect(() => () => { wants.current = false; try { recRef.current?.stop(); } catch { /* ignore */ } if (SPEECH_OUT) window.speechSynthesis.cancel(); }, []);

  const label =
    status === 'listening' ? 'Listening…' :
    status === 'thinking' ? 'Thinking…' :
    status === 'speaking' ? 'Speaking…' : 'Tap to talk to Sahay';

  // Collapsed by default — voice is opt-in, and a clear launcher/close avoids the
  // "I can't get out of this" problem when a session is live.
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3.5 text-sm font-black text-emerald-200 transition-colors hover:bg-emerald-500/20"
      >
        <Sparkles size={15} /> Talk to Sahay — hands-free voice tutor
      </button>
    );
  }

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
      <button
        onClick={() => { stop(); setOpen(false); }}
        aria-label="Close voice tutor"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
      >
        <X size={15} />
      </button>
      <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-300">
        <Sparkles size={13} /> Sahay · your AI study buddy
      </div>

      {/* Pulsing orb */}
      <div className="my-4 flex items-center justify-center">
        <button
          onClick={() => (live ? stop() : start())}
          disabled={!SPEECH_IN && !live}
          className={cn(
            'relative flex h-24 w-24 items-center justify-center rounded-full text-white transition-all',
            live ? 'bg-red-500 shadow-lg shadow-red-500/40' : 'bg-emerald-500 shadow-lg shadow-emerald-500/40 hover:scale-105',
          )}
        >
          {live && (status === 'listening') ? <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" /> : null}
          {status === 'thinking' ? <Loader2 size={32} className="animate-spin" /> :
            status === 'speaking' ? <Volume2 size={32} /> :
            live ? <Square size={28} /> : <Mic size={32} />}
        </button>
      </div>

      <p className="text-sm font-bold text-white/90">{live ? label : 'Start a hands-free conversation'}</p>
      {interim ? <p className="mt-1 text-xs italic text-white/50">“{interim}”</p> : null}

      {lastQ ? (
        <div className="mt-4 space-y-2 text-left">
          <p className="text-xs font-bold text-white/50">You asked:</p>
          <p className="text-sm text-white/80">{lastQ}</p>
          {lastA ? (<><p className="pt-1 text-xs font-bold text-emerald-300/80">Sahay:</p>
            <p className="text-sm leading-relaxed text-white/90">{lastA}</p></>) : null}
        </div>
      ) : null}

      {err ? <p className="mt-3 text-xs font-bold text-red-300">{err}</p> : null}
      {isIOS && !live ? <p className="mt-3 text-[11px] text-amber-300/80">iPhone/iPad voice is limited — use Chrome on Android or a laptop for the full hands-free experience.</p> : null}

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/40">
        <span>🎙️ Free browser voice</span>
        <span>·</span>
        <span className={cn(PREMIUM_VOICE ? 'text-emerald-300' : '')}>{PREMIUM_VOICE ? '✨ Premium voice ON' : '✨ Premium human voice (add key to enable)'}</span>
      </div>
    </div>
  );
}
