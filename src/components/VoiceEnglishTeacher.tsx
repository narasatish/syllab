/**
 * VoiceEnglishTeacher — AI-powered spoken English practice.
 *
 * Behaviour:
 * • Continuous browser SpeechRecognition (auto-restarts on silence/timeout).
 * • Silence detection: 1.2s with no new words → auto-submit current transcript to AI.
 * • SpeechSynthesis: AI reads its feedback aloud with an Indian English voice if available.
 * • Recognition restarts properly after every AI response (key mobile fix).
 * • Backend handles the AI grammar feedback (never the API key in the client).
 *
 * Mobile notes:
 * • iOS Safari — no SpeechRecognition support; text-only mode shown.
 * • Android Chrome — continuous:true can stop after each utterance; the onend
 *   handler and post-speak restart cover this.
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, MicOff, RefreshCw, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { getEnglishConversationReply, getEnglishConversationOpener } from '../lib/api';

/* ─── Speech API shim ─────────────────────────────────────────────────────── */
const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechSupported = !!SR;

/* Detect iOS (no SpeechRecognition at all) */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

/* Silence threshold (ms) — auto-submit student turn after this much quiet time */
const SILENCE_MS = 1200;

/* ─── Conversation prompt starters ──────────────────────────────────────────  */
const CONVERSATION_PROMPTS = [
  'Introduce yourself in 2–3 sentences.',
  'Describe what you did last weekend.',
  'What is your favourite subject and why?',
  'Tell me about a book or movie you enjoyed.',
  'Describe your school using five adjectives.',
  'What are three things you are good at?',
  'If you could travel anywhere, where would you go and why?',
  'Describe a person you admire.',
  'What would you do with one million rupees?',
  'Talk about a challenge you overcame.',
];

/* ─── Voice picker — prefer Indian English, then any English voice ──────────── */
function pickBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() || [];
  if (voices.length === 0) return null;
  // 1. Indian English (Microsoft Heera, Google en-IN)
  const inEN = voices.find(v => v.lang === 'en-IN');
  if (inEN) return inEN;
  // 2. Female-sounding English voice (name heuristic)
  const femaleEn = voices.find(v => /female|heera|samantha|karen|moira|tessa/i.test(v.name) && /^en/i.test(v.lang));
  if (femaleEn) return femaleEn;
  // 3. Any en-* voice
  const anyEn = voices.find(v => /^en/i.test(v.lang));
  return anyEn ?? voices[0];
}

/* ─── Component ────────────────────────────────────────────────────────────── */
export interface VoiceEnglishTeacherProps {
  /** Optional topic/task context sent to AI */
  context?: string;
  /** Called when user wants to close the panel */
  onClose?: () => void;
}

type SessionState = 'idle' | 'listening' | 'processing' | 'speaking';

interface ChatTurn {
  role: 'student' | 'teacher';
  text: string;
}

export default function VoiceEnglishTeacher({ context, onClose }: VoiceEnglishTeacherProps) {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const turnsRef = useRef<ChatTurn[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(
    () => CONVERSATION_PROMPTS[Math.floor(Math.random() * CONVERSATION_PROMPTS.length)],
  );
  const [error, setError] = useState<string | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const transcriptRef = useRef(''); // mirrors state for closures
  const wantsListeningRef = useRef(false); // does the user want to keep listening?
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  /* Keep transcript ref in sync */
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

  /* Keep turns ref in sync for closures */
  useEffect(() => { turnsRef.current = turns; }, [turns]);

  /* Auto-scroll on new turns — ONLY scroll the chat container, never the page */
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [turns, sessionState]);

  /* Preload speech-synthesis voices (browsers expose them asynchronously).
     Use addEventListener for maximum cross-browser compatibility. */
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const tryLoad = () => {
      const picked = pickBestVoice();
      if (picked) {
        voiceRef.current = picked;
        setVoicesReady(true);
      }
    };
    tryLoad();
    window.speechSynthesis.addEventListener('voiceschanged', tryLoad);
    return () => { window.speechSynthesis.removeEventListener('voiceschanged', tryLoad); };
  }, []);

  /* Clear silence timer */
  const clearSilence = () => {
    if (silenceTimerRef.current !== null) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  /* Speak helper — uses SpeechSynthesis */
  const speak = useCallback((text: string, onDone?: () => void) => {
    if (isMuted || !window.speechSynthesis || !text.trim()) {
      onDone?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    // Use detected voice or fallback to en-IN
    utter.lang = voiceRef.current?.lang || 'en-IN';
    // Slightly slower rate for clarity; natural pitch
    utter.rate = 0.9;
    utter.pitch = 1.0;
    utter.volume = 1.0;
    if (voiceRef.current) utter.voice = voiceRef.current;
    utter.onend = () => { onDone?.(); };
    utter.onerror = () => { onDone?.(); };
    window.speechSynthesis.speak(utter);

    // iOS work-around: speech synthesis sometimes hangs silently.
    // If nothing has happened after 12s, force onDone.
    const hangGuard = window.setTimeout(() => { onDone?.(); }, 12_000);
    utter.onend = () => { clearTimeout(hangGuard); onDone?.(); };
    utter.onerror = () => { clearTimeout(hangGuard); onDone?.(); };
  }, [isMuted]);

  /* Mirror sessionState into a ref so closures can read the latest value */
  const sessionStateRef = useRef<SessionState>('idle');
  useEffect(() => { sessionStateRef.current = sessionState; }, [sessionState]);

  /* ── Forward-declare startListening so it can be called from doListenAfterSpeak ── */
  const startListeningRef = useRef<() => void>(() => {});

  /* Resume listening after AI finishes speaking.
     Calls startListening() which properly creates a new recognition instance. */
  const doListenAfterSpeak = useCallback(() => {
    if (wantsListeningRef.current) {
      startListeningRef.current();
    } else {
      setSessionState('idle');
    }
  }, []);

  /* Submit current transcript to AI, then restart listening */
  const submitTurn = useCallback(async () => {
    clearSilence();
    const finalText = transcriptRef.current.trim();
    if (!finalText) return; // nothing to send — stay listening
    setTranscript('');
    setInterimText('');
    setSessionState('processing');
    const newTurns: ChatTurn[] = [...turnsRef.current, { role: 'student', text: finalText }];
    setTurns(newTurns);
    try {
      const reply = await getEnglishConversationReply(finalText, newTurns, context || currentPrompt);
      const teacherTurn: ChatTurn = { role: 'teacher', text: reply };
      setTurns((prev) => [...prev, teacherTurn]);
      setSessionState('speaking');
      speak(reply, doListenAfterSpeak);
    } catch {
      setError('Could not reach the AI. Check your connection and try again.');
      setSessionState(wantsListeningRef.current ? 'listening' : 'idle');
    }
  }, [context, currentPrompt, speak, doListenAfterSpeak]);

  /* Have the AI open the conversation with a friendly greeting + question */
  const sendOpener = useCallback(async () => {
    setSessionState('processing');
    try {
      const opener = await getEnglishConversationOpener(context || currentPrompt);
      const teacherTurn: ChatTurn = { role: 'teacher', text: opener };
      setTurns((prev) => [...prev, teacherTurn]);
      setSessionState('speaking');
      speak(opener, doListenAfterSpeak);
    } catch {
      setSessionState(wantsListeningRef.current ? 'listening' : 'idle');
    }
  }, [context, currentPrompt, speak, doListenAfterSpeak]);

  /* Start (or resume) continuous listening */
  const startListening = useCallback(() => {
    if (!isSpeechSupported) {
      setError(isIOS
        ? 'Voice recognition is not supported on iOS Safari. Please use the Chrome app on Android or desktop Chrome/Edge.'
        : 'Your browser does not support speech recognition. Try Chrome or Edge.');
      return;
    }
    setError(null);
    wantsListeningRef.current = true;

    // If a recognition session is already running, just keep it
    if (recognitionRef.current) {
      setSessionState('listening');
      return;
    }

    // First time starting this conversation → have the AI open with a question
    if (turnsRef.current.length === 0) {
      void sendOpener();
      // sendOpener → 'processing' → 'speaking' → doListenAfterSpeak → startListening
      // So we'll re-enter after the opener is spoken.
      return;
    }

    const rec = new SR();
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (final) {
        setTranscript((prev) => (prev ? prev + ' ' : '') + final.trim());
      }
      setInterimText(interim);

      // Any new speech resets the silence timer
      clearSilence();
      silenceTimerRef.current = window.setTimeout(() => {
        if (transcriptRef.current.trim().length > 0) {
          void submitTurn();
        }
      }, SILENCE_MS);
    };

    rec.onerror = (event: any) => {
      if (event.error === 'no-speech') return; // expected — keep listening
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone in browser settings.');
        wantsListeningRef.current = false;
        setSessionState('idle');
      } else if (event.error === 'aborted' || event.error === 'audio-capture') {
        // ignore — will restart automatically
      } else if (event.error === 'network') {
        // On Android, network error during recognition is transient — restart
        recognitionRef.current = null;
        if (wantsListeningRef.current) {
          window.setTimeout(() => { if (wantsListeningRef.current) startListening(); }, 500);
        }
      } else {
        setError(`Speech error: ${event.error}`);
      }
    };

    rec.onend = () => {
      // Browser auto-stops recognition; restart if still wanted and not mid-AI-turn
      recognitionRef.current = null;
      if (wantsListeningRef.current &&
          sessionStateRef.current !== 'processing' &&
          sessionStateRef.current !== 'speaking') {
        window.setTimeout(() => {
          if (wantsListeningRef.current) startListening();
        }, 250);
      }
    };

    try {
      recognitionRef.current = rec;
      rec.start();
      if (sessionStateRef.current !== 'processing' && sessionStateRef.current !== 'speaking') {
        setSessionState('listening');
      }
    } catch {
      window.setTimeout(() => {
        if (wantsListeningRef.current) startListening();
      }, 400);
    }
  }, [submitTurn, sendOpener]);

  /* Keep the startListeningRef pointing to the latest startListening closure */
  useEffect(() => { startListeningRef.current = startListening; }, [startListening]);

  /* Stop everything — used by the X / stop button */
  const stopAll = useCallback(() => {
    wantsListeningRef.current = false;
    clearSilence();
    try { recognitionRef.current?.stop(); } catch {/* ignore */}
    recognitionRef.current = null;
    window.speechSynthesis?.cancel();
    setSessionState('idle');
  }, []);

  const nextPrompt = () => {
    setCurrentPrompt(CONVERSATION_PROMPTS[Math.floor(Math.random() * CONVERSATION_PROMPTS.length)]);
    setTranscript('');
    setInterimText('');
    setTurns([]);
    stopAll();
  };

  /* Cleanup on unmount */
  useEffect(() => () => {
    wantsListeningRef.current = false;
    clearSilence();
    try { recognitionRef.current?.stop(); } catch {/* ignore */}
    recognitionRef.current = null;
    window.speechSynthesis?.cancel();
  }, []);

  return (
    <div className="flex flex-col rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-600 p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl">🗣️</div>
          <div>
            <h2 className="text-base font-black">AI English Conversation</h2>
            <p className="text-[11px] font-bold text-sky-100">Natural 2-way chat · AI asks, you answer · hands-free</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsMuted((m) => !m);
              window.speechSynthesis?.cancel();
            }}
            className="rounded-xl p-2 text-white/70 hover:bg-white/10 transition-colors"
            title={isMuted ? 'Unmute AI voice' : 'Mute AI voice'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          {onClose && (
            <button type="button" onClick={() => { stopAll(); onClose(); }} className="rounded-xl p-2 text-white/70 hover:bg-white/10 transition-colors">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Current prompt */}
      <div className="border-b border-slate-100 bg-sky-50 px-5 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-sky-500">Today's Topic</p>
            <p className="mt-0.5 text-sm font-black text-slate-700">{currentPrompt}</p>
          </div>
          <button
            type="button"
            onClick={nextPrompt}
            className="shrink-0 rounded-xl p-2 text-sky-400 hover:bg-sky-100 transition-colors"
            title="New topic"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Conversation turns */}
      <div ref={chatContainerRef} className="flex max-h-[320px] min-h-[120px] flex-col gap-4 overflow-y-auto p-5">
        {turns.length === 0 && (
          <div className="my-4 text-center text-sm font-medium text-slate-400">
            Tap the mic to start. The AI will ask you a question,
            <br />you speak your answer, and the conversation flows naturally — like ChatGPT voice.
          </div>
        )}
        {turns.map((turn, i) => (
          turn.role === 'student' ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-sky-500 px-4 py-3 text-sm font-medium text-white">
                {turn.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                <span className="mr-1.5">🗣️</span>{turn.text}
              </div>
            </div>
          )
        ))}

        {/* Live transcript */}
        {sessionState === 'listening' && (transcript || interimText) && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm border-2 border-dashed border-sky-300 bg-sky-50 px-4 py-3 text-sm font-medium text-slate-600">
              {transcript} <span className="italic text-slate-400">{interimText}</span>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-5 mb-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600">
          {error}
        </div>
      )}

      {/* iOS / browser support warning */}
      {isIOS ? (
        <div className="mx-5 mb-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
          ⚠️ Voice input is not available on iOS Safari. Open Syllab in Chrome on Android or use a desktop browser for AI voice practice.
        </div>
      ) : !isSpeechSupported ? (
        <div className="mx-5 mb-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
          ⚠️ Your browser doesn't support the microphone feature. Please use Chrome or Edge for voice practice.
        </div>
      ) : null}

      {/* Controls */}
      <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-4">
        <div className="flex items-center gap-3">
          {/* Mic / Stop button */}
          {sessionState === 'idle' ? (
            <button
              type="button"
              onClick={startListening}
              disabled={!isSpeechSupported || isIOS}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600 active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-40"
              title="Start speaking"
            >
              <Mic size={24} />
            </button>
          ) : sessionState === 'listening' ? (
            <button
              type="button"
              onClick={stopAll}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 animate-pulse active:scale-95 transition-all"
              title="Stop listening"
            >
              <MicOff size={24} />
            </button>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
              <Loader2 size={24} className="animate-spin text-violet-600" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {sessionState === 'idle' && (
              <p className="text-sm font-bold text-slate-600">Tap the mic and start speaking — I'll listen continuously.</p>
            )}
            {sessionState === 'listening' && (
              <p className="text-sm font-black text-rose-600 animate-pulse">
                {transcript.trim() ? '🎙️ Listening… releasing mic in a moment.' : '🎙️ Listening… speak now.'}
              </p>
            )}
            {sessionState === 'processing' && (
              <p className="text-sm font-bold text-violet-600">🤔 AI is thinking…</p>
            )}
            {sessionState === 'speaking' && (
              <p className="text-sm font-bold text-emerald-600">🔊 AI is talking… mic resumes after.</p>
            )}
          </div>
        </div>

        <p className="mt-3 text-[11px] font-bold text-slate-500 text-center">
          {isMuted ? '🔇 AI voice muted' : voicesReady ? '🔊 AI will speak feedback aloud' : '🔊 Loading voice…'} · Processing via secure backend
        </p>
      </div>
    </div>
  );
}
