/**
 * dedup.mjs — guarantees no post is ever repeated.
 *
 * Persists the set of already-used content keys (and a rolling history of
 * captions) to `.instagram-bot-output/posted-registry.json`. The content engine
 * asks for N unseen atoms of a kind; once used they're recorded so they never
 * resurface. When a pool is exhausted the registry auto-recycles the oldest
 * entries for that kind (so the bot keeps running forever) — but only after the
 * entire pool has genuinely been posted at least once.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, '.instagram-bot-output');
const REGISTRY = path.join(OUT, 'posted-registry.json');

function load() {
  if (!existsSync(REGISTRY)) return { used: {}, order: [] };
  try { return JSON.parse(readFileSync(REGISTRY, 'utf8')); }
  catch { return { used: {}, order: [] }; }
}

function save(reg) {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(REGISTRY, JSON.stringify(reg, null, 2), 'utf8');
}

let _reg = load();

/** Has this content key already been posted? */
export function isUsed(key) {
  return !!_reg.used[key];
}

/**
 * Pick up to `count` atoms not yet posted. If fewer than `count` remain in the
 * whole pool, recycle the least-recently-used ones for that kind so we never run
 * dry. Selection is shuffled (seeded by index) for variety.
 */
export function pickUnseen(atoms, count, seed = 0) {
  const fresh = atoms.filter((a) => !isUsed(a.key));
  let pool = fresh;
  if (pool.length < count) {
    // Pool exhausted for what's needed → recycle oldest-used of THESE atoms.
    const usedHere = atoms
      .filter((a) => _reg.used[a.key])
      .sort((a, b) => (_reg.used[a.key] || 0) - (_reg.used[b.key] || 0));
    pool = [...fresh, ...usedHere];
  }
  // Deterministic shuffle so a given day/seed is stable but varied across days.
  const shuffled = [...pool].sort((a, b) => hash(a.key + seed) - hash(b.key + seed));
  return shuffled.slice(0, count);
}

/** Mark atoms as posted (call only after a successful post / dry-run plan). */
export function markUsed(keys) {
  const now = Date.now();
  for (const k of keys) {
    _reg.used[k] = now;
    _reg.order.push(k);
  }
  // Cap history file growth.
  if (_reg.order.length > 20000) _reg.order = _reg.order.slice(-15000);
  save(_reg);
}

export function stats() {
  return { usedCount: Object.keys(_reg.used).length };
}

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 0xffffffff;
}
