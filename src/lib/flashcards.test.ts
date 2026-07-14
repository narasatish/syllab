import { describe, it, expect } from 'vitest';
import { scheduleCard, dueCards, newCard, type Card } from './flashcards';

const today = '2026-07-14';

describe('newCard', () => {
  it('creates a card due today with SM-2 defaults', () => {
    const c = newCard('1', ' Q ', ' A ', today);
    expect(c).toMatchObject({ id: '1', front: 'Q', back: 'A', reps: 0, ease: 2.5, intervalDays: 0, due: today });
  });
});

describe('scheduleCard', () => {
  it('first "good" schedules 1 day out', () => {
    const c = scheduleCard(newCard('1', 'Q', 'A', today), 'good', today);
    expect(c.reps).toBe(1);
    expect(c.intervalDays).toBe(1);
    expect(c.due).toBe('2026-07-15');
  });

  it('second "good" schedules 6 days out', () => {
    let c = scheduleCard(newCard('1', 'Q', 'A', today), 'good', today);
    c = scheduleCard(c, 'good', c.due);
    expect(c.reps).toBe(2);
    expect(c.intervalDays).toBe(6);
  });

  it('subsequent reviews multiply the interval by ease', () => {
    let c = scheduleCard(newCard('1', 'Q', 'A', today), 'good', today);   // 1
    c = scheduleCard(c, 'good', c.due);                                     // 6
    const before = c.intervalDays;
    c = scheduleCard(c, 'good', c.due);                                     // ~6*ease
    expect(c.intervalDays).toBe(Math.round(before * c.ease));
    expect(c.intervalDays).toBeGreaterThan(before);
  });

  it('"again" resets reps and reschedules for tomorrow', () => {
    let c = scheduleCard(newCard('1', 'Q', 'A', today), 'good', today);
    c = scheduleCard(c, 'good', c.due);
    const lapsed = scheduleCard(c, 'again', c.due);
    expect(lapsed.reps).toBe(0);
    expect(lapsed.intervalDays).toBe(1);
    expect(lapsed.due).toBe(addOne(c.due));
  });

  it('ease never drops below 1.3', () => {
    let c = newCard('1', 'Q', 'A', today);
    for (let i = 0; i < 12; i++) c = scheduleCard(c, 'hard', c.due);
    expect(c.ease).toBeGreaterThanOrEqual(1.3);
  });
});

describe('dueCards', () => {
  it('returns only cards due on/before today', () => {
    const cards: Card[] = [
      { id: '1', front: 'a', back: 'a', reps: 0, ease: 2.5, intervalDays: 0, due: '2026-07-14' },
      { id: '2', front: 'b', back: 'b', reps: 1, ease: 2.5, intervalDays: 6, due: '2026-07-20' },
      { id: '3', front: 'c', back: 'c', reps: 0, ease: 2.5, intervalDays: 0, due: '2026-07-10' },
    ];
    const due = dueCards(cards, today).map((c) => c.id);
    expect(due).toEqual(['1', '3']);
  });
});

function addOne(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d) + 86400000).toISOString().slice(0, 10);
}
