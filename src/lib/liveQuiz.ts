// Live Quiz — Firestore-backed real-time multiplayer (Kahoot-style).
// Host creates a game (needs login); players join by 6-digit PIN with just a
// nickname (no account). Game state + leaderboard sync via onSnapshot.
import {
  collection, doc, getDoc, onSnapshot, query, orderBy,
  serverTimestamp, setDoc, updateDoc, increment,
} from 'firebase/firestore';
import { db } from './firebase';
import type { QuizPack } from '../data/quizPacks';

export type GameStatus = 'lobby' | 'live' | 'ended';

export interface GameDoc {
  hostUid: string;
  hostName: string;
  packId: string;
  packTitle: string;
  status: GameStatus;
  currentIndex: number;
  revealed: boolean;
  questionCount: number;
  // questions are stored on the doc so players can render them live
  questions: { q: string; options: string[]; answer: number }[];
  questionStartedAt?: unknown;
}

export interface PlayerDoc {
  name: string;
  score: number;
  answeredForIndex: number;
  lastCorrect?: boolean;
}

const COL = 'liveQuizzes';
const QUESTION_SECONDS = 20;

/** Stable per-browser player id (no account needed to join). */
export function getPlayerId(): string {
  const KEY = 'syllab_live_player_id';
  let id = '';
  try { id = localStorage.getItem(KEY) || ''; } catch { /* ignore */ }
  if (!id) {
    id = 'p_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  }
  return id;
}

function genPin(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Host creates a new game; returns the PIN. */
export async function createGame(host: { uid: string; name: string }, pack: QuizPack): Promise<string> {
  // Try a few PINs to avoid a (rare) collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const pin = genPin();
    const ref = doc(db, COL, pin);
    const existing = await getDoc(ref);
    if (existing.exists()) continue;
    const game: GameDoc = {
      hostUid: host.uid,
      hostName: host.name?.slice(0, 40) || 'Host',
      packId: pack.id,
      packTitle: pack.title,
      status: 'lobby',
      currentIndex: 0,
      revealed: false,
      questionCount: pack.questions.length,
      questions: pack.questions.map((q) => ({ q: q.q, options: q.options, answer: q.answer })),
    };
    await setDoc(ref, { ...game, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return pin;
  }
  throw new Error('Could not create a game right now. Please try again.');
}

export function subscribeGame(pin: string, cb: (g: GameDoc | null) => void): () => void {
  return onSnapshot(doc(db, COL, pin), (snap) => {
    cb(snap.exists() ? (snap.data() as GameDoc) : null);
  }, () => cb(null));
}

export function subscribePlayers(pin: string, cb: (players: (PlayerDoc & { id: string })[]) => void): () => void {
  const q = query(collection(db, COL, pin, 'players'), orderBy('score', 'desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as PlayerDoc) })));
  }, () => cb([]));
}

export async function joinGame(pin: string, playerId: string, name: string): Promise<void> {
  const ref = doc(db, COL, pin, 'players', playerId);
  await setDoc(ref, {
    name: (name || 'Player').slice(0, 24),
    score: 0,
    answeredForIndex: -1,
    joinedAt: serverTimestamp(),
  }, { merge: true });
}

export async function startGame(pin: string): Promise<void> {
  await updateDoc(doc(db, COL, pin), {
    status: 'live', currentIndex: 0, revealed: false,
    questionStartedAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export async function revealAnswer(pin: string): Promise<void> {
  await updateDoc(doc(db, COL, pin), { revealed: true, updatedAt: serverTimestamp() });
}

export async function nextQuestion(pin: string, currentIndex: number, total: number): Promise<void> {
  if (currentIndex + 1 >= total) {
    await updateDoc(doc(db, COL, pin), { status: 'ended', revealed: true, updatedAt: serverTimestamp() });
    return;
  }
  await updateDoc(doc(db, COL, pin), {
    currentIndex: currentIndex + 1, revealed: false,
    questionStartedAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export async function endGame(pin: string): Promise<void> {
  await updateDoc(doc(db, COL, pin), { status: 'ended', revealed: true, updatedAt: serverTimestamp() });
}

/** Points: base 100 for correct + speed bonus (faster = more, within the window). */
export function computePoints(correct: boolean, elapsedSeconds: number): number {
  if (!correct) return 0;
  const frac = Math.max(0, Math.min(1, 1 - elapsedSeconds / QUESTION_SECONDS));
  return 100 + Math.round(frac * 100);
}

export async function submitAnswer(
  pin: string, playerId: string, forIndex: number, correct: boolean, points: number,
): Promise<void> {
  await updateDoc(doc(db, COL, pin, 'players', playerId), {
    score: increment(points),
    answeredForIndex: forIndex,
    lastCorrect: correct,
  });
}

export { QUESTION_SECONDS };
