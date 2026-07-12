/**
 * Ambience — study soundscapes generated entirely in the browser via Web Audio.
 * No audio files, no streaming, no copyright, no network — just shaped noise and
 * gentle oscillators that approximate rain, ocean, forest, fire, focus drones and
 * coloured noise. Free, reliable, and impossible to take down.
 *
 * Must be started from a user gesture (a click) so the AudioContext can resume.
 */
export type AmbienceKey =
  | 'off' | 'rain' | 'ocean' | 'forest' | 'fire'
  | 'brown' | 'pink' | 'focus'
  | 'lofi' | 'dream' | 'piano';

export interface AmbienceOption { key: AmbienceKey; label: string; emoji: string; group?: 'sound' | 'music'; }

export const AMBIENCE_OPTIONS: AmbienceOption[] = [
  { key: 'off', label: 'Off', emoji: '🔇' },
  // Soundscapes
  { key: 'rain', label: 'Rain', emoji: '🌧️', group: 'sound' },
  { key: 'ocean', label: 'Ocean', emoji: '🌊', group: 'sound' },
  { key: 'forest', label: 'Forest', emoji: '🌲', group: 'sound' },
  { key: 'fire', label: 'Fireplace', emoji: '🔥', group: 'sound' },
  { key: 'brown', label: 'Deep Noise', emoji: '🟤', group: 'sound' },
  { key: 'pink', label: 'Soft Noise', emoji: '🌸', group: 'sound' },
  { key: 'focus', label: 'Focus Drone', emoji: '🧘', group: 'sound' },
  // Study music — continuous harmonic loops, perfect for 2–10 hour sessions
  { key: 'lofi', label: 'Lo-Fi', emoji: '🎧', group: 'music' },
  { key: 'dream', label: 'Dream Pad', emoji: '✨', group: 'music' },
  { key: 'piano', label: 'Soft Keys', emoji: '🎹', group: 'music' },
];

export class Ambience {
  private ctx: AudioContext | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private nodes: any[] = [];
  private master: GainNode | null = null;
  private timers: ReturnType<typeof setInterval>[] = [];
  private volume = 0.5;
  current: AmbienceKey = 'off';

  private noiseBuffer(ctx: AudioContext, kind: 'white' | 'brown' | 'pink'): AudioBuffer {
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    if (kind === 'white') {
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    } else if (kind === 'brown') {
      let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    } else { // pink-ish
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + w * 0.0990460;
        b1 = 0.96300 * b1 + w * 0.2965164;
        b2 = 0.57000 * b2 + w * 1.0526913;
        d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.25;
      }
    }
    return buf;
  }

  private src(ctx: AudioContext, kind: 'white' | 'brown' | 'pink') {
    const s = ctx.createBufferSource();
    s.buffer = this.noiseBuffer(ctx, kind);
    s.loop = true;
    return s;
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
  }

  async play(key: AmbienceKey) {
    if (key === 'off') { this.stop(); return; }
    try {
      if (!this.ctx) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Ctor = window.AudioContext || (window as any).webkitAudioContext;
        if (!Ctor) return;
        this.ctx = new Ctor();
      }
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      this.stopNodes();
      const ctx = this.ctx;
      const master = ctx.createGain();
      master.gain.value = this.volume;
      master.connect(ctx.destination);
      this.master = master;
      this.nodes.push(master);

      const lp = (freq: number) => { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq; return f; };
      const hp = (freq: number) => { const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = freq; return f; };
      const start = (s: AudioBufferSourceNode | OscillatorNode) => { s.start(); this.nodes.push(s); };

      if (key === 'rain') {
        const s = this.src(ctx, 'pink'); const f = lp(1600); s.connect(f).connect(master); start(s); this.nodes.push(f);
      } else if (key === 'brown') {
        const s = this.src(ctx, 'brown'); const f = lp(600); s.connect(f).connect(master); start(s); this.nodes.push(f);
      } else if (key === 'pink') {
        const s = this.src(ctx, 'pink'); const f = lp(2200); s.connect(f).connect(master); start(s); this.nodes.push(f);
      } else if (key === 'forest') {
        const s = this.src(ctx, 'white'); const f = hp(2000); const g = ctx.createGain(); g.gain.value = 0.5;
        s.connect(f).connect(g).connect(master); start(s); this.nodes.push(f, g);
      } else if (key === 'ocean') {
        // Brown noise with a slow swelling gain → waves.
        const s = this.src(ctx, 'brown'); const f = lp(900); const g = ctx.createGain();
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12; const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.4;
        g.gain.value = 0.5; lfo.connect(lfoGain).connect(g.gain);
        s.connect(f).connect(g).connect(master); start(s); start(lfo); this.nodes.push(f, g, lfoGain);
      } else if (key === 'fire') {
        // Brown noise base + random crackle pops via filtered white noise.
        const base = this.src(ctx, 'brown'); const bf = lp(500); base.connect(bf).connect(master); start(base); this.nodes.push(bf);
        const crackle = this.src(ctx, 'white'); const cf = hp(3000); const cg = ctx.createGain();
        cg.gain.value = 0.08; crackle.connect(cf).connect(cg).connect(master); start(crackle); this.nodes.push(cf, cg);
      } else if (key === 'focus') {
        // Two soft detuned sine drones — a calm focus pad.
        const g = ctx.createGain(); g.gain.value = 0.12; g.connect(master); this.nodes.push(g);
        const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 110; o1.connect(g);
        const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 110.5; o2.connect(g);
        start(o1); start(o2);
      } else if (key === 'lofi') {
        // Warm Cmaj7 chord pad + slow tremolo + faint vinyl noise → lo-fi study loop.
        const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(master); this.nodes.push(g);
        [130.81, 164.81, 196.00, 246.94].forEach((f) => { // C3 E3 G3 B3
          const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.connect(g); start(o);
        });
        g.gain.setTargetAtTime(0.14, ctx.currentTime, 1.5); // gentle fade-in
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15;
        const lg = ctx.createGain(); lg.gain.value = 0.04; lfo.connect(lg).connect(g.gain); start(lfo); this.nodes.push(lg);
        const vinyl = this.src(ctx, 'brown'); const vf = lp(800); const vg = ctx.createGain(); vg.gain.value = 0.04;
        vinyl.connect(vf).connect(vg).connect(master); start(vinyl); this.nodes.push(vf, vg);
      } else if (key === 'dream') {
        // Airy higher Fmaj9-ish pad — soft and open, loops forever.
        const g = ctx.createGain(); g.gain.value = 0.0001; g.connect(master); this.nodes.push(g);
        [174.61, 220.00, 261.63, 329.63].forEach((f) => { // F3 A3 C4 E4
          const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(g); start(o);
        });
        g.gain.setTargetAtTime(0.10, ctx.currentTime, 2.5);
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
        const lg = ctx.createGain(); lg.gain.value = 0.03; lfo.connect(lg).connect(g.gain); start(lfo); this.nodes.push(lg);
      } else if (key === 'piano') {
        // Soft Keys — a calm pentatonic arpeggio that loops, over a quiet pad.
        const pad = ctx.createGain(); pad.gain.value = 0.05; pad.connect(master); this.nodes.push(pad);
        [130.81, 196.00].forEach((f) => { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(pad); start(o); });
        // C-major pentatonic across two octaves — gentle, never dissonant.
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
        let step = 0;
        const pluck = (freq: number) => {
          if (this.ctx !== ctx) return;
          const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
          const e = ctx.createGain(); e.gain.value = 0.0001;
          o.connect(e).connect(master);
          const t = ctx.currentTime;
          e.gain.setValueAtTime(0.0001, t);
          e.gain.exponentialRampToValueAtTime(0.16, t + 0.02); // quick attack
          e.gain.exponentialRampToValueAtTime(0.0001, t + 1.6); // long soft decay
          o.start(t); o.stop(t + 1.8);
        };
        pluck(notes[0]);
        const timer = setInterval(() => {
          step = (step + 1) % notes.length;
          // wander a little so it doesn't feel mechanical
          const idx = step % 2 === 0 ? step : (step + 2) % notes.length;
          pluck(notes[idx]);
        }, 850);
        this.timers.push(timer);
      }
      this.current = key;
    } catch { /* audio unavailable — never break the room */ }
  }

  private stopNodes() {
    for (const t of this.timers) { try { clearInterval(t); } catch { /* ignore */ } }
    this.timers = [];
    for (const n of this.nodes) {
      try { n.stop?.(); } catch { /* ignore */ }
      try { n.disconnect?.(); } catch { /* ignore */ }
    }
    this.nodes = [];
    this.master = null;
  }

  stop() { this.stopNodes(); this.current = 'off'; }

  dispose() {
    this.stop();
    try { void this.ctx?.close(); } catch { /* ignore */ }
    this.ctx = null;
  }
}
