import { describe, it, expect, beforeEach } from 'vitest';
import { recordAnswer, getDueIds, getDueCount, pickDue, getLearningCount } from './spacedRepetition';

const DAY = 24 * 60 * 60 * 1000;

describe('spacedRepetition', () => {
  beforeEach(() => { localStorage.clear(); });

  it('a wrong answer is due immediately (box 0)', () => {
    const t0 = 1_000_000;
    const card = recordAnswer('q1', false, t0);
    expect(card.box).toBe(0);
    expect(card.due).toBe(t0);
    expect(getDueIds(t0)).toContain('q1');
  });

  it('correct answers push the due date out on the ladder', () => {
    const t0 = 1_000_000;
    recordAnswer('q1', true, t0);              // box1 → due +1 day
    expect(getDueIds(t0)).not.toContain('q1'); // not due yet
    expect(getDueIds(t0 + 1 * DAY)).toContain('q1'); // due after 1 day
    recordAnswer('q1', true, t0 + 1 * DAY);    // box2 → due +3 days
    expect(getDueIds(t0 + 1 * DAY + 2 * DAY)).not.toContain('q1');
    expect(getDueIds(t0 + 1 * DAY + 3 * DAY)).toContain('q1');
  });

  it('a wrong answer resets the card to box 0', () => {
    const t0 = 1_000_000;
    recordAnswer('q1', true, t0);
    recordAnswer('q1', true, t0 + DAY);
    const reset = recordAnswer('q1', false, t0 + 5 * DAY);
    expect(reset.box).toBe(0);
    expect(reset.wrong).toBe(1);
    expect(getDueIds(t0 + 5 * DAY)).toContain('q1');
  });

  it('weakest (lowest box) cards surface first', () => {
    const t0 = 1_000_000;
    recordAnswer('weak', false, t0);     // box 0
    recordAnswer('mid', true, t0);       // box 1, due +1d
    const due = getDueIds(t0 + 2 * DAY);
    expect(due[0]).toBe('weak');
  });

  it('pickDue returns only due questions present in the pool', () => {
    const t0 = 1_000_000;
    recordAnswer('q1', false, t0);
    recordAnswer('q2', false, t0);
    const pool = [{ id: 'q1' }, { id: 'q3' }];
    const picked = pickDue(pool, 10, t0);
    expect(picked.map((p) => p.id)).toEqual(['q1']); // q2 not in pool, q3 not due
  });

  it('counts learning + due cards', () => {
    const t0 = 1_000_000;
    recordAnswer('q1', false, t0);
    recordAnswer('q2', true, t0);
    expect(getLearningCount()).toBe(2);
    expect(getDueCount(t0)).toBe(1); // only q1 due now
  });
});
