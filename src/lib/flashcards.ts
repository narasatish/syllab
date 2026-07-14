/**
 * flashcards.ts — pure, testable spaced-repetition logic (SM-2, lightly
 * simplified) plus the deck/card data shapes used by the /flashcards tool.
 * No framework, no Date.now() — the caller passes "today" so scheduling is
 * deterministic and unit-testable. Persistence lives in the page (localStorage).
 */
import { addDays } from './studyPlanner';

/** How the learner rated their recall of a card. */
export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface Card {
  id: string;
  front: string;
  back: string;
  // Scheduling state (SM-2). New cards start with reps 0, ease 2.5.
  reps: number;
  ease: number;
  intervalDays: number;
  due: string; // YYYY-MM-DD
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
}

const QUALITY: Record<Grade, number> = { again: 2, hard: 3, good: 4, easy: 5 };
const MIN_EASE = 1.3;

/**
 * Apply an SM-2 review to a card and return the updated card. `todayISO` is the
 * review date; the new `due` date is derived from it. A failing grade ('again')
 * resets the card to be seen again the next day.
 */
export function scheduleCard(card: Card, grade: Grade, todayISO: string): Card {
  const q = QUALITY[grade];
  let { reps, ease, intervalDays } = card;

  if (q < 3) {
    // Lapse — relearn from the start.
    reps = 0;
    intervalDays = 1;
  } else {
    if (reps === 0) intervalDays = 1;
    else if (reps === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * ease);
    reps += 1;
    // Standard SM-2 ease adjustment, floored at 1.3.
    ease = Math.max(MIN_EASE, +(ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))).toFixed(4));
  }

  return { ...card, reps, ease, intervalDays, due: addDays(todayISO, intervalDays) };
}

/** Cards that are due for review on or before `todayISO`. */
export function dueCards(cards: Card[], todayISO: string): Card[] {
  return cards.filter((c) => c.due <= todayISO);
}

/** A fresh card with sensible SM-2 defaults, due today. */
export function newCard(id: string, front: string, back: string, todayISO: string): Card {
  return { id, front: front.trim(), back: back.trim(), reps: 0, ease: 2.5, intervalDays: 0, due: todayISO };
}
