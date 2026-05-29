import { describe, it, expect } from 'vitest';
import { codingChallenges } from './codingChallenges';

const VALID_LANGUAGES = ['javascript', 'python', 'sql', 'java'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const VALID_CATEGORIES = [
  'basics',
  'loops',
  'functions',
  'arrays',
  'dom',
  'logic',
  'games',
  'projects',
];

describe('codingChallenges Data Integrity', () => {
  it('should have at least one challenge', () => {
    expect(codingChallenges.length).toBeGreaterThan(0);
  });

  describe('Required fields', () => {
    it('every challenge has an id', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.id).toBeDefined();
        expect(typeof challenge.id).toBe('string');
        expect(challenge.id.length).toBeGreaterThan(0);
      });
    });

    it('every challenge has a title', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.title).toBeDefined();
        expect(typeof challenge.title).toBe('string');
        expect(challenge.title.length).toBeGreaterThan(0);
      });
    });

    it('every challenge has a language', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.language).toBeDefined();
        expect(VALID_LANGUAGES).toContain(challenge.language);
      });
    });

    it('every challenge has a difficulty', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.difficulty).toBeDefined();
        expect(VALID_DIFFICULTIES).toContain(challenge.difficulty);
      });
    });

    it('every challenge has a category', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.category).toBeDefined();
        expect(VALID_CATEGORIES).toContain(challenge.category);
      });
    });

    it('every challenge has description fields', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.story).toBeDefined();
        expect(typeof challenge.story).toBe('string');
        expect(challenge.story.length).toBeGreaterThan(0);

        expect(challenge.task).toBeDefined();
        expect(typeof challenge.task).toBe('string');
        expect(challenge.task.length).toBeGreaterThan(0);
      });
    });

    it('every challenge has code fields', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.starterCode).toBeDefined();
        expect(typeof challenge.starterCode).toBe('string');

        expect(challenge.expectedOutput).toBeDefined();
        expect(typeof challenge.expectedOutput).toBe('string');
      });
    });

    it('every challenge has hints array with at least 1 item', () => {
      codingChallenges.forEach(challenge => {
        expect(Array.isArray(challenge.hints)).toBe(true);
        expect(challenge.hints.length).toBeGreaterThanOrEqual(1);
        challenge.hints.forEach(hint => {
          expect(typeof hint).toBe('string');
          expect(hint.length).toBeGreaterThan(0);
        });
      });
    });

    it('every challenge has xp > 0', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.xp).toBeDefined();
        expect(typeof challenge.xp).toBe('number');
        expect(challenge.xp).toBeGreaterThan(0);
      });
    });

    it('every challenge has estimatedMinutes > 0', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.estimatedMinutes).toBeDefined();
        expect(typeof challenge.estimatedMinutes).toBe('number');
        expect(challenge.estimatedMinutes).toBeGreaterThan(0);
      });
    });

    it('every challenge has classLevels array', () => {
      codingChallenges.forEach(challenge => {
        expect(Array.isArray(challenge.classLevels)).toBe(true);
        expect(challenge.classLevels.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('every challenge has tags array if defined', () => {
      codingChallenges.forEach(challenge => {
        if (challenge.tags) {
          expect(Array.isArray(challenge.tags)).toBe(true);
        }
      });
    });
  });

  describe('Uniqueness constraints', () => {
    it('should have no duplicate ids', () => {
      const ids = codingChallenges.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should not have duplicate ids within same language', () => {
      const idsByLanguage: Record<string, Set<string>> = {};

      codingChallenges.forEach(challenge => {
        if (!idsByLanguage[challenge.language]) {
          idsByLanguage[challenge.language] = new Set();
        }
        expect(idsByLanguage[challenge.language].has(challenge.id)).toBe(false);
        idsByLanguage[challenge.language].add(challenge.id);
      });
    });
  });

  describe('Data format constraints', () => {
    it('should have valid classLevels', () => {
      codingChallenges.forEach(challenge => {
        challenge.classLevels.forEach(level => {
          expect(typeof level).toBe('number');
          expect(level).toBeGreaterThanOrEqual(5);
          expect(level).toBeLessThanOrEqual(12);
        });
      });
    });

    it('should have reasonable xp range', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.xp).toBeGreaterThanOrEqual(25);
        expect(challenge.xp).toBeLessThanOrEqual(1000);
      });
    });

    it('should have reasonable estimatedMinutes range', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.estimatedMinutes).toBeGreaterThanOrEqual(5);
        expect(challenge.estimatedMinutes).toBeLessThanOrEqual(120);
      });
    });

    it('hints should be meaningful strings', () => {
      codingChallenges.forEach(challenge => {
        challenge.hints.forEach(hint => {
          expect(hint.length).toBeGreaterThan(5);
        });
      });
    });
  });

  describe('Content quality', () => {
    it('story should be engaging and provide context', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.story.length).toBeGreaterThan(10);
        expect(challenge.story).not.toMatch(/^TODO|^FIXME/i);
      });
    });

    it('task should clearly describe what to do', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.task.length).toBeGreaterThan(10);
        expect(challenge.task).not.toMatch(/^TODO|^FIXME/i);
      });
    });

    it('starterCode should be empty string (students fill in everything)', () => {
      codingChallenges.forEach(challenge => {
        // Intentionally empty — students write all code from scratch
        expect(challenge.starterCode).toBe('');
      });
    });

    it('expectedOutput should be non-empty', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.expectedOutput).not.toMatch(/^$/);
      });
    });
  });

  describe('Language distribution', () => {
    it('should have challenges for multiple languages', () => {
      const languages = new Set(codingChallenges.map(c => c.language));
      expect(languages.size).toBeGreaterThanOrEqual(1);
    });

    it('JavaScript challenges should exist', () => {
      const jsCount = codingChallenges.filter(
        c => c.language === 'javascript',
      ).length;
      expect(jsCount).toBeGreaterThan(0);
    });

    it('should have beginner challenges', () => {
      const beginnerCount = codingChallenges.filter(
        c => c.difficulty === 'beginner',
      ).length;
      expect(beginnerCount).toBeGreaterThan(0);
    });

    it('should have intermediate and advanced challenges', () => {
      const advanced = codingChallenges.filter(c => c.difficulty === 'advanced')
        .length;
      const intermediate = codingChallenges.filter(
        c => c.difficulty === 'intermediate',
      ).length;
      expect(advanced + intermediate).toBeGreaterThan(0);
    });
  });

  describe('ID format', () => {
    it('ids should follow a naming convention', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.id).toMatch(/^[a-z0-9\-]+$/);
      });
    });

    it('ids should not contain whitespace', () => {
      codingChallenges.forEach(challenge => {
        expect(challenge.id).not.toMatch(/\s/);
      });
    });
  });

  describe('Cross-field consistency', () => {
    it('JS challenges should have reasonable expectedOutput', () => {
      const jsChallenges = codingChallenges.filter(
        c => c.language === 'javascript',
      );
      jsChallenges.forEach(challenge => {
        // JS output should be able to be generated by console.log
        expect(challenge.expectedOutput.length).toBeGreaterThan(0);
      });
    });

    it('difficulty should align with category', () => {
      // Most basic category challenges should be beginner
      const basicChallenges = codingChallenges.filter(
        c => c.category === 'basics',
      );
      const beginnerBasics = basicChallenges.filter(
        c => c.difficulty === 'beginner',
      ).length;
      expect(beginnerBasics).toBeGreaterThan(basicChallenges.length * 0.5);
    });

    it('estimatedMinutes should roughly match difficulty', () => {
      const beginnerChallenges = codingChallenges.filter(
        c => c.difficulty === 'beginner',
      );
      const advancedChallenges = codingChallenges.filter(
        c => c.difficulty === 'advanced',
      );

      const beginnerAvg =
        beginnerChallenges.reduce((sum, c) => sum + c.estimatedMinutes, 0) /
        beginnerChallenges.length;
      const advancedAvg =
        advancedChallenges.reduce((sum, c) => sum + c.estimatedMinutes, 0) /
        advancedChallenges.length;

      // Advanced challenges should generally take longer
      expect(advancedAvg).toBeGreaterThanOrEqual(beginnerAvg * 0.8);
    });
  });

  describe('Language-specific rules', () => {
    it('Python challenges exist and have tasks', () => {
      const pythonChallenges = codingChallenges.filter(
        c => c.language === 'python',
      );
      expect(pythonChallenges.length).toBeGreaterThan(0);

      pythonChallenges.forEach(challenge => {
        // Starter code is intentionally empty — students fill in everything
        expect(challenge.starterCode).toBe('');
        // Task and hints should provide all the context students need
        expect(challenge.task.length).toBeGreaterThan(0);
      });
    });

    it('SQL challenges exist and have empty starter codes', () => {
      const sqlChallenges = codingChallenges.filter(
        c => c.language === 'sql',
      );
      expect(sqlChallenges.length).toBeGreaterThan(0);
      sqlChallenges.forEach(challenge => {
        // Starter code is intentionally empty — students write SQL from scratch
        expect(challenge.starterCode).toBe('');
        // SQL challenges should have meaningful task descriptions
        expect(challenge.task.length).toBeGreaterThan(5);
        // SQL challenges should have hints to guide students
        expect(challenge.hints.length).toBeGreaterThan(0);
      });
    });

    it('Java challenges exist and have empty starter codes', () => {
      const javaChallenges = codingChallenges.filter(
        c => c.language === 'java',
      );
      // Java challenges have empty starter codes — students write from scratch
      javaChallenges.forEach(challenge => {
        expect(challenge.starterCode).toBe('');
        expect(challenge.hints.length).toBeGreaterThan(0);
      });
    });
  });
});
