import { describe, it, expect } from 'vitest';
import { MOCK_TESTS, AVAILABLE_MOCK_TESTS, getMocksByExam } from './mockTestsList';

describe('MOCK_TESTS Data Integrity', () => {
  it('should have mock tests', () => {
    expect(MOCK_TESTS.length).toBeGreaterThan(0);
  });

  it('every mock has required fields', () => {
    MOCK_TESTS.forEach((mock) => {
      expect(mock.id).toBeTruthy();
      expect(mock.title).toBeTruthy();
      expect(mock.exam).toBeTruthy();
      expect(mock.duration).toBeGreaterThan(0);
      expect(mock.questionsCount).toBeGreaterThan(0);
      expect(mock.fileUrl).toMatch(/^\/mocks\//);
      expect(typeof mock.available).toBe('boolean');
    });
  });

  it('mock IDs are unique', () => {
    const ids = MOCK_TESTS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('fileUrl ends with .json', () => {
    MOCK_TESTS.forEach((mock) => {
      expect(mock.fileUrl).toMatch(/\.json$/);
    });
  });

  describe('Exam coverage', () => {
    it('has at least 10 JEE mocks', () => {
      const jeeMocks = MOCK_TESTS.filter((m) => m.exam === 'JEE');
      expect(jeeMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('has at least 10 NEET mocks', () => {
      const neetMocks = MOCK_TESTS.filter((m) => m.exam === 'NEET');
      expect(neetMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('has at least 10 EAMCET mocks', () => {
      const eamcetMocks = MOCK_TESTS.filter((m) => m.exam === 'EAMCET');
      expect(eamcetMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('state exam mocks (WBJEE) have at least 10 papers', () => {
      const wbjeeMocks = MOCK_TESTS.filter((m) => m.exam === 'WBJEE');
      expect(wbjeeMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('state exam mocks (MHTCET) have at least 10 papers', () => {
      const mhtcetMocks = MOCK_TESTS.filter((m) => m.exam === 'MHTCET');
      expect(mhtcetMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('state exam mocks (KCET) have at least 10 papers', () => {
      const kcetMocks = MOCK_TESTS.filter((m) => m.exam === 'KCET');
      expect(kcetMocks.length).toBeGreaterThanOrEqual(10);
    });

    it('covers all required state exams', () => {
      const stateExams = ['WBJEE', 'TNEA', 'UPSEE', 'MHTCET', 'KCET', 'COMEDK', 'GUJCET', 'OJEE'];
      stateExams.forEach((exam) => {
        const mocks = MOCK_TESTS.filter((m) => m.exam === exam);
        expect(mocks.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getMocksByExam helper', () => {
    it('returns mocks for given exam', () => {
      const wbjee = getMocksByExam('WBJEE');
      expect(wbjee.length).toBeGreaterThan(0);
      wbjee.forEach((m) => {
        expect(m.exam).toBe('WBJEE');
      });
    });

    it('returns empty for unknown exam', () => {
      const unknown = getMocksByExam('UNKNOWN_EXAM_XYZ');
      expect(unknown).toEqual([]);
    });
  });

  describe('Available mocks', () => {
    it('AVAILABLE_MOCK_TESTS contains only available mocks', () => {
      AVAILABLE_MOCK_TESTS.forEach((mock) => {
        expect(mock.available).toBe(true);
      });
    });

    it('has reasonable duration range (30-300 min)', () => {
      MOCK_TESTS.forEach((mock) => {
        expect(mock.duration).toBeGreaterThanOrEqual(30);
        expect(mock.duration).toBeLessThanOrEqual(300);
      });
    });

    it('has reasonable question count (30-250)', () => {
      MOCK_TESTS.forEach((mock) => {
        expect(mock.questionsCount).toBeGreaterThanOrEqual(30);
        expect(mock.questionsCount).toBeLessThanOrEqual(250);
      });
    });
  });
});
