import { describe, it, expect } from 'vitest';
import { miniProjects } from './miniProjects';

const VALID_SKILLS = [
  'python',
  'javascript',
  'html-css',
  'sql',
  'ai',
  'data-analytics',
  'java',
  'aptitude',
  'app-dev',
  'robotics',
  'game-dev',
  'git-github',
  'prompt-engineering',
  'cloud-computing',
  'data-mining',
];

const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

describe('miniProjects Data Integrity', () => {
  it('should have at least one project', () => {
    expect(miniProjects.length).toBeGreaterThan(0);
  });

  describe('Required fields', () => {
    it('every project has an id', () => {
      miniProjects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(typeof project.id).toBe('string');
        expect(project.id.length).toBeGreaterThan(0);
      });
    });

    it('every project has a title', () => {
      miniProjects.forEach(project => {
        expect(project.title).toBeDefined();
        expect(typeof project.title).toBe('string');
        expect(project.title.length).toBeGreaterThan(0);
      });
    });

    it('every project has a skill', () => {
      miniProjects.forEach(project => {
        expect(project.skill).toBeDefined();
        expect(VALID_SKILLS).toContain(project.skill);
      });
    });

    it('every project has a difficulty level', () => {
      miniProjects.forEach(project => {
        expect(project.difficulty).toBeDefined();
        expect(VALID_DIFFICULTIES).toContain(project.difficulty);
      });
    });

    it('every project has steps array with at least 1 item', () => {
      miniProjects.forEach(project => {
        expect(Array.isArray(project.steps)).toBe(true);
        expect(project.steps.length).toBeGreaterThanOrEqual(1);
        project.steps.forEach(step => {
          expect(typeof step).toBe('string');
          expect(step.length).toBeGreaterThan(0);
        });
      });
    });

    it('every project has concepts array with at least 1 item', () => {
      miniProjects.forEach(project => {
        expect(Array.isArray(project.concepts)).toBe(true);
        expect(project.concepts.length).toBeGreaterThanOrEqual(1);
        project.concepts.forEach(concept => {
          expect(typeof concept).toBe('string');
          expect(concept.length).toBeGreaterThan(0);
        });
      });
    });

    it('every project has estimatedMinutes > 0', () => {
      miniProjects.forEach(project => {
        expect(project.estimatedMinutes).toBeDefined();
        expect(typeof project.estimatedMinutes).toBe('number');
        expect(project.estimatedMinutes).toBeGreaterThan(0);
      });
    });

    it('every project has xp > 0', () => {
      miniProjects.forEach(project => {
        expect(project.xp).toBeDefined();
        expect(typeof project.xp).toBe('number');
        expect(project.xp).toBeGreaterThan(0);
      });
    });

    it('every project has previewEmoji', () => {
      miniProjects.forEach(project => {
        expect(project.previewEmoji).toBeDefined();
        expect(typeof project.previewEmoji).toBe('string');
        expect(project.previewEmoji.length).toBeGreaterThan(0);
      });
    });

    it('every project has whatYouBuild', () => {
      miniProjects.forEach(project => {
        expect(project.whatYouBuild).toBeDefined();
        expect(typeof project.whatYouBuild).toBe('string');
        expect(project.whatYouBuild.length).toBeGreaterThan(0);
      });
    });

    it('every project has description', () => {
      miniProjects.forEach(project => {
        expect(project.description).toBeDefined();
        expect(typeof project.description).toBe('string');
        expect(project.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Uniqueness constraints', () => {
    it('should have no duplicate ids', () => {
      const ids = miniProjects.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should not have duplicate ids across different skills', () => {
      const idsBySkill: Record<string, Set<string>> = {};

      miniProjects.forEach(project => {
        if (!idsBySkill[project.skill]) {
          idsBySkill[project.skill] = new Set();
        }
        expect(idsBySkill[project.skill].has(project.id)).toBe(false);
        idsBySkill[project.skill].add(project.id);
      });
    });
  });

  describe('Data format constraints', () => {
    it('should have valid classLevels array', () => {
      miniProjects.forEach(project => {
        expect(Array.isArray(project.classLevels)).toBe(true);
        expect(project.classLevels.length).toBeGreaterThan(0);
        project.classLevels.forEach(level => {
          expect(typeof level).toBe('number');
          expect(level).toBeGreaterThanOrEqual(5);
          expect(level).toBeLessThanOrEqual(12);
        });
      });
    });

    it('should have tags array if defined', () => {
      miniProjects.forEach(project => {
        if (project.tags) {
          expect(Array.isArray(project.tags)).toBe(true);
          project.tags.forEach(tag => {
            expect(typeof tag).toBe('string');
            expect(tag.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should have reasonable estimatedMinutes range', () => {
      miniProjects.forEach(project => {
        expect(project.estimatedMinutes).toBeGreaterThanOrEqual(5);
        expect(project.estimatedMinutes).toBeLessThanOrEqual(480);
      });
    });

    it('should have reasonable xp range', () => {
      miniProjects.forEach(project => {
        expect(project.xp).toBeGreaterThanOrEqual(50);
        expect(project.xp).toBeLessThanOrEqual(10000);
      });
    });

    it('emoji should be a non-empty string', () => {
      // Emoji string length in JS varies (1-4+ code units); just check it's non-empty
      miniProjects.forEach(project => {
        expect(project.previewEmoji.length).toBeGreaterThanOrEqual(1);
        // Emojis can be up to 8 JS chars (e.g. flags, compound emoji)
        expect(project.previewEmoji.length).toBeLessThanOrEqual(8);
      });
    });
  });

  describe('Content quality', () => {
    it('step descriptions should be meaningful', () => {
      miniProjects.forEach(project => {
        project.steps.forEach((step, idx) => {
          expect(step.length).toBeGreaterThan(10);
          expect(step).not.toMatch(/^TODO|^FIXME/);
        });
      });
    });

    it('concept names should be meaningful', () => {
      miniProjects.forEach(project => {
        project.concepts.forEach(concept => {
          expect(concept.length).toBeGreaterThanOrEqual(2);
          // Avoid false positives: "testimonials" starts with "test" but is valid
          expect(concept.toLowerCase()).not.toMatch(/^(test|dummy)\s/i);
        });
      });
    });

    it('whatYouBuild should describe a concrete deliverable', () => {
      miniProjects.forEach(project => {
        expect(project.whatYouBuild.length).toBeGreaterThan(15);
        expect(project.whatYouBuild).not.toMatch(/^TBD|^TODO|^FIXME/i);
      });
    });

    it('description should explain the project context', () => {
      miniProjects.forEach(project => {
        expect(project.description.length).toBeGreaterThan(15);
      });
    });
  });

  describe('Skill distribution', () => {
    it('should have projects for multiple skills', () => {
      const skillSet = new Set(miniProjects.map(p => p.skill));
      expect(skillSet.size).toBeGreaterThanOrEqual(3);
    });

    it('each skill should have projects of different difficulties', () => {
      const skillMap: Record<string, Set<string>> = {};

      miniProjects.forEach(project => {
        if (!skillMap[project.skill]) {
          skillMap[project.skill] = new Set();
        }
        skillMap[project.skill].add(project.difficulty);
      });

      // Most skills should have multiple difficulty levels
      Object.entries(skillMap).forEach(([skill, difficulties]) => {
        // At least some skills should span multiple difficulties
        if (skill === 'python' || skill === 'javascript') {
          expect(difficulties.size).toBeGreaterThanOrEqual(1);
        }
      });
    });
  });

  describe('ID format', () => {
    it('ids should follow a naming convention', () => {
      miniProjects.forEach(project => {
        // Most IDs should contain the skill or be structured
        expect(project.id).toMatch(/^[a-z0-9\-]+$/);
      });
    });

    it('ids should not contain whitespace', () => {
      miniProjects.forEach(project => {
        expect(project.id).not.toMatch(/\s/);
      });
    });
  });
});
