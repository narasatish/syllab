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
  | 'brown' | 'pink' | 'focus';

export interface AmbienceOption { key: AmbienceKey; label: string; emoji: string; }

export const AMBIENCE_OPTIONS: AmbienceOption[] = [
  { key: 'off', label: 'Off', emoji: '🔇' },
  { key: 'rain', label: 'Rain', emoji: '🌧️' },
  { key: 'ocean', label: 'Ocean', emoji: '🌊' },
  { key: 'forest', label: 'Forest', emoji: '🌲' },
  { key: 'fire', label: 'Fireplace', emoji: '🔥' },
  { key: 'brown', label: 'Deep Noise', emoji: '🟤' },
  { key: 'pink', label: 'Soft Noise', emoji: '🌸' },
  { key: 'focus', label: 'Focus Drone', emoji: '🧘' },
];

export class Ambience {
  private ctx: AudioContext | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private nodes: any[] = [];
  private master: GainNode | null = null;
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
      }
      this.current = key;
    } catch { /* audio unavailable — never break the room */ }
  }

  private stopNodes() {
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
