import { describe, it, expect } from 'vitest';
import { GK_QUESTIONS, getDailyGKQuiz, getQuestionsByCategory, getQuestionsByClass } from './generalKnowledge';

const VALID_CATEGORIES = ['history', 'geography', 'polity', 'static', 'current-affairs', 'science'];

describe('GK_QUESTIONS Data Integrity', () => {
  it('should have at least 50 GK questions', () => {
    expect(GK_QUESTIONS.length).toBeGreaterThanOrEqual(50);
  });

  describe('Required fields', () => {
    it('every question has a unique id', () => {
      const ids = GK_QUESTIONS.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('every question has a valid category', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(VALID_CATEGORIES).toContain(q.category);
      });
    });

    it('every question text is non-empty and meaningful', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.question).not.toMatch(/^TODO|^FIXME/i);
      });
    });

    it('every question has 4 options', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(q.options).toBeInstanceOf(Array);
        expect(q.options.length).toBe(4);
        q.options.forEach((opt) => {
          expect(typeof opt).toBe('string');
          expect(opt.length).toBeGreaterThan(0);
        });
      });
    });

    it('correctIndex is between 0 and 3', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThanOrEqual(3);
      });
    });

    it('explanation is non-empty', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(q.explanation.length).toBeGreaterThan(10);
      });
    });

    it('classLevels are between 5 and 12', () => {
      GK_QUESTIONS.forEach((q) => {
        expect(q.classLevels.length).toBeGreaterThan(0);
        q.classLevels.forEach((cls) => {
          expect(cls).toBeGreaterThanOrEqual(5);
          expect(cls).toBeLessThanOrEqual(12);
        });
      });
    });
  });

  describe('Category coverage', () => {
    it('covers all 6 categories', () => {
      const categories = new Set(GK_QUESTIONS.map((q) => q.category));
      expect(categories.size).toBeGreaterThanOrEqual(5);
    });

    it('history category has at least 10 questions', () => {
      const count = GK_QUESTIONS.filter((q) => q.category === 'history').length;
      expect(count).toBeGreaterThanOrEqual(10);
    });

    it('geography category has at least 10 questions', () => {
      const count = GK_QUESTIONS.filter((q) => q.category === 'geography').length;
      expect(count).toBeGreaterThanOrEqual(10);
    });
  });
});

describe('GK Helper functions', () => {
  describe('getDailyGKQuiz', () => {
    it('returns exactly 10 questions', () => {
      const quiz = getDailyGKQuiz();
      expect(quiz.length).toBe(10);
    });

    it('returns same questions on same day (deterministic)', () => {
      const quiz1 = getDailyGKQuiz();
      const quiz2 = getDailyGKQuiz();
      expect(quiz1.map((q) => q.id)).toEqual(quiz2.map((q) => q.id));
    });

    it('returns questions with no duplicates', () => {
      const quiz = getDailyGKQuiz();
      const ids = quiz.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('getQuestionsByCategory', () => {
    it('returns only questions matching the category', () => {
      const historyQs = getQuestionsByCategory('history');
      expect(historyQs.length).toBeGreaterThan(0);
      historyQs.forEach((q) => {
        expect(q.category).toBe('history');
      });
    });
  });

  describe('getQuestionsByClass', () => {
    it('returns questions appropriate for given class', () => {
      const class8Qs = getQuestionsByClass(8);
      expect(class8Qs.length).toBeGreaterThan(0);
      class8Qs.forEach((q) => {
        expect(q.classLevels).toContain(8);
      });
    });

    it('returns empty array for invalid class', () => {
      const result = getQuestionsByClass(100);
      expect(result).toEqual([]);
    });
  });
});
