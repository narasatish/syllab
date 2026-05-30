/**
 * soundFx — tiny Web Audio sound effects. No audio files, no network.
 * Generates short tones on the fly so the bundle stays small and there's
 * nothing to download. Respects a global mute flag stored in localStorage.
 */

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

const MUTE_KEY = 'syllab_sound_muted';
export function isSoundMuted(): boolean {
  try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
}
export function setSoundMuted(muted: boolean): void {
  try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch { /* ignore */ }
}

/** Play a sequence of notes. Each note: [frequency Hz, startOffset s, duration s]. */
function playNotes(notes: [number, number, number][], type: OscillatorType = 'sine', gain = 0.12) {
  if (isSoundMuted()) return;
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === 'suspended') ac.resume().catch(() => {});
  const now = ac.currentTime;
  for (const [freq, start, dur] of notes) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, now + start);
    g.gain.linearRampToValueAtTime(gain, now + start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
    osc.connect(g);
    g.connect(ac.destination);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.02);
  }
}

/** Cheerful rising arpeggio for correct answers. */
export const playCorrect = () =>
  playNotes([[523.25, 0, 0.13], [659.25, 0.1, 0.13], [783.99, 0.2, 0.22]], 'triangle', 0.14);

/** Soft low blip for wrong answers (gentle, not harsh — kids shouldn't feel punished). */
export const playWrong = () =>
  playNotes([[311.13, 0, 0.16], [261.63, 0.12, 0.22]], 'sine', 0.1);

/** Light tick for moving to the next slide. */
export const playPage = () =>
  playNotes([[660, 0, 0.05]], 'sine', 0.05);

/** Triumphant fanfare for lesson completion. */
export const playCelebrate = () =>
  playNotes(
    [[523.25, 0, 0.15], [659.25, 0.12, 0.15], [783.99, 0.24, 0.15], [1046.5, 0.36, 0.35]],
    'triangle',
    0.15,
  );
