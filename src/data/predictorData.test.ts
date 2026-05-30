import { describe, expect, it } from 'vitest';
import {
  jeePercentileToRank, predictJeeColleges,
  neetMarksToRank, predictNeetColleges,
  ENG_EXAMS, predictEngineering,
} from './predictorData';

describe('JEE predictor', () => {
  it('higher percentile gives a better (lower) rank', () => {
    expect(jeePercentileToRank(99.9)).toBeLessThan(jeePercentileToRank(98));
    expect(jeePercentileToRank(95)).toBeLessThan(jeePercentileToRank(90));
  });

  it('clamps out-of-range percentiles', () => {
    expect(jeePercentileToRank(150)).toBeGreaterThan(0);
    expect(jeePercentileToRank(-5)).toBeGreaterThan(0);
  });

  it('a top rank unlocks top IITs', () => {
    const colleges = predictJeeColleges(60);
    expect(colleges.length).toBeGreaterThan(0);
    expect(colleges[0].closingRank).toBeGreaterThanOrEqual(60);
    // sorted ascending by closing rank
    for (let i = 1; i < colleges.length; i++) {
      expect(colleges[i].closingRank).toBeGreaterThanOrEqual(colleges[i - 1].closingRank);
    }
  });

  it('a very high rank number unlocks fewer/no top colleges', () => {
    const top = predictJeeColleges(60).length;
    const low = predictJeeColleges(40000).length;
    expect(low).toBeLessThan(top);
  });
});

describe('NEET predictor', () => {
  it('more marks gives a better (lower) rank', () => {
    expect(neetMarksToRank(700)).toBeLessThan(neetMarksToRank(600));
    expect(neetMarksToRank(600)).toBeLessThan(neetMarksToRank(500));
  });

  it('720 marks maps to rank ~1', () => {
    expect(neetMarksToRank(720)).toBeLessThanOrEqual(5);
  });

  it('top rank unlocks AIIMS, lower rank does not', () => {
    expect(predictNeetColleges(40).some(c => c.college.includes('AIIMS'))).toBe(true);
    expect(predictNeetColleges(40000).some(c => c.college.includes('AIIMS'))).toBe(false);
  });
});

describe('multi-exam engineering predictor', () => {
  it('includes JEE + state exams + BITSAT', () => {
    const ids = ENG_EXAMS.map(e => e.id);
    expect(ids).toContain('jee-main');
    expect(ids).toContain('ap-eapcet');
    expect(ids).toContain('ts-eapcet');
    expect(ids).toContain('kcet');
    expect(ids).toContain('mht-cet');
    expect(ids).toContain('wbjee');
    expect(ids).toContain('bitsat');
  });

  it('rank-metric exam (AP EAPCET): high marks → low rank + colleges', () => {
    const r = predictEngineering('ap-eapcet', 150)!;
    expect(r.estimatedRank).not.toBeNull();
    expect(r.estimatedRank!).toBeLessThan(predictEngineering('ap-eapcet', 70)!.estimatedRank!);
    expect(r.colleges.length).toBeGreaterThan(0);
  });

  it('score-metric exam (BITSAT): high score unlocks BITS Pilani CSE', () => {
    const r = predictEngineering('bitsat', 340)!;
    expect(r.estimatedRank).toBeNull();
    expect(r.colleges.some(c => c.college.includes('Pilani'))).toBe(true);
    expect(predictEngineering('bitsat', 230)!.colleges.some(c => c.college.includes('Pilani') && c.branch.includes('Computer'))).toBe(false);
  });

  it('percentile-metric exam (MHT-CET): 99.9 unlocks COEP, 95 does not', () => {
    expect(predictEngineering('mht-cet', 99.9)!.colleges.some(c => c.college.includes('COEP'))).toBe(true);
    expect(predictEngineering('mht-cet', 95)!.colleges.some(c => c.college.includes('COEP') && c.branch.includes('Computer'))).toBe(false);
  });

  it('returns null for an unknown exam', () => {
    expect(predictEngineering('xyz', 100)).toBeNull();
  });
});
