import { describe, expect, it } from 'vitest';
import {
  jeePercentileToRank, predictJeeColleges,
  neetMarksToRank, predictNeetColleges,
  ENG_EXAMS, predictEngineering,
  CATEGORIES, CAREER_LIBRARY, CAREER_FIELDS,
  INTEREST_QUIZ, STREAM_GUIDES, EXAM_CALENDAR, SCHOLARSHIPS,
  COLLEGE_DIRECTORY, COLLEGE_STATES,
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

  it('reserved category never unlocks fewer colleges than General (rank metric)', () => {
    const gen = predictEngineering('ap-eapcet', 100, 'general')!.colleges.length;
    const sc = predictEngineering('ap-eapcet', 100, 'sc')!.colleges.length;
    expect(sc).toBeGreaterThanOrEqual(gen);
  });

  it('reserved category relaxation works on score/percentile metric', () => {
    const gen = predictEngineering('mht-cet', 98, 'general')!.colleges.length;
    const st = predictEngineering('mht-cet', 98, 'st')!.colleges.length;
    expect(st).toBeGreaterThanOrEqual(gen);
  });

  it('category rank differs from overall rank for reserved categories (the GSC bug)', () => {
    const gen = predictEngineering('ap-eapcet', 40, 'general')!;
    const st = predictEngineering('ap-eapcet', 40, 'st')!;
    // General: no separate category rank; overall same for both
    expect(gen.categoryRank).toBeNull();
    expect(st.estimatedRank).toBe(gen.estimatedRank);
    // ST gets a meaningfully BETTER (lower) category rank than the overall rank
    expect(st.categoryRank).not.toBeNull();
    expect(st.categoryRank!).toBeLessThan(st.estimatedRank!);
  });

  it('women quota improves the effective category rank', () => {
    const oc = predictEngineering('ap-eapcet', 80, 'general')!;
    const ocWomen = predictEngineering('ap-eapcet', 80, 'general', true)!;
    expect(oc.categoryRank).toBeNull();
    expect(ocWomen.categoryRank).not.toBeNull();
    expect(ocWomen.categoryRank!).toBeLessThan(ocWomen.estimatedRank!);
  });
});

describe('college directory', () => {
  it('has top colleges across the key states, each well-formed', () => {
    expect(COLLEGE_DIRECTORY.length).toBeGreaterThanOrEqual(30);
    for (const c of COLLEGE_DIRECTORY) {
      expect(c.name).toBeTruthy();
      expect(c.city).toBeTruthy();
      expect(c.feesPerYear).toMatch(/₹/);
      expect(c.topBranches.length).toBeGreaterThan(0);
      expect(COLLEGE_STATES).toContain(c.state);
    }
  });
  it('covers the 7 target states + national institutes', () => {
    const states = new Set(COLLEGE_DIRECTORY.map(c => c.state));
    for (const s of ['National (IIT/NIT)', 'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Telangana', 'Andhra Pradesh', 'Delhi-NCR', 'West Bengal']) {
      expect(states.has(s)).toBe(true);
    }
  });
});

describe('career library', () => {
  it('has a good set of careers, each well-formed', () => {
    expect(CAREER_LIBRARY.length).toBeGreaterThanOrEqual(12);
    for (const c of CAREER_LIBRARY) {
      expect(c.name).toBeTruthy();
      expect(c.emoji).toBeTruthy();
      expect(c.salaryEntry).toMatch(/₹/);
      expect(c.salaryExperienced).toMatch(/₹/);
      expect(c.skills.length).toBeGreaterThan(0);
      expect(c.exams.length).toBeGreaterThan(0);
      // every career's field is a valid filter option
      expect(CAREER_FIELDS).toContain(c.field);
    }
  });
});

describe('interest quiz', () => {
  it('every option maps to a real stream guide', () => {
    const streams = new Set(STREAM_GUIDES.map(s => s.stream));
    expect(INTEREST_QUIZ.length).toBeGreaterThanOrEqual(5);
    for (const q of INTEREST_QUIZ) {
      expect(q.options.length).toBe(4);
      for (const o of q.options) expect(streams.has(o.stream)).toBe(true);
    }
  });
});

describe('categories / exam calendar / scholarships data', () => {
  it('categories include the five standard ones', () => {
    const ids = CATEGORIES.map(c => c.id);
    expect(ids).toEqual(expect.arrayContaining(['general', 'ews', 'obc', 'sc', 'st']));
  });
  it('exam calendar and scholarships are populated and well-formed', () => {
    expect(EXAM_CALENDAR.length).toBeGreaterThan(5);
    expect(EXAM_CALENDAR.every(e => e.exam && e.window && e.site)).toBe(true);
    expect(SCHOLARSHIPS.length).toBeGreaterThan(3);
    expect(SCHOLARSHIPS.every(s => s.name && s.benefit)).toBe(true);
  });
});
