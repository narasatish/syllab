import { describe, it, expect } from 'vitest';
import { classRangeFromClass, blogsForClass, type Post, type ClassRange } from './blogClassMap';

describe('blogClassMap', () => {
  describe('classRangeFromClass', () => {
    it('maps Class 1-5 to primary', () => {
      [1, 2, 3, 4, 5].forEach((cls) => {
        expect(classRangeFromClass(cls)).toBe('primary');
      });
    });

    it('maps Class 6-8 to middle', () => {
      [6, 7, 8].forEach((cls) => {
        expect(classRangeFromClass(cls)).toBe('middle');
      });
    });

    it('maps Class 9-10 to secondary', () => {
      [9, 10].forEach((cls) => {
        expect(classRangeFromClass(cls)).toBe('secondary');
      });
    });

    it('maps Class 11-12 to senior', () => {
      [11, 12].forEach((cls) => {
        expect(classRangeFromClass(cls)).toBe('senior');
      });
    });

    it('handles edge case of class 0 or negative', () => {
      // Edge — should still return some valid range, not crash
      const r1: ClassRange = classRangeFromClass(0);
      const r2: ClassRange = classRangeFromClass(-1);
      expect(['primary', 'middle', 'secondary', 'senior']).toContain(r1);
      expect(['primary', 'middle', 'secondary', 'senior']).toContain(r2);
    });
  });

  describe('blogsForClass', () => {
    const mockBlogs: Post[] = [
      { id: 'a', title: 'JEE Mains Tips', category: 'JEE', description: 'JEE prep', date: '2026-05-01' },
      { id: 'b', title: 'Coding for Kids', category: 'Coding for Kids', description: 'Fun coding', date: '2026-05-02' },
      { id: 'c', title: 'NCERT Class 8 Science', category: 'NCERT Tips', description: 'NCERT', date: '2026-05-03' },
      { id: 'd', title: 'Board Exam Tips', category: 'Board Exam', description: 'Boards', date: '2026-05-04' },
      { id: 'e', title: 'AI tools', category: 'AI Tools', description: 'AI', date: '2026-05-05' },
    ];

    it('returns kid-friendly blogs for Class 5 student (no JEE)', () => {
      const result = blogsForClass(mockBlogs, 5);
      const titles = result.map((b) => b.title);
      // Class 5 should NOT see JEE Mains tips
      expect(titles).not.toContain('JEE Mains Tips');
    });

    it('returns Coding for Kids for primary students', () => {
      const result = blogsForClass(mockBlogs, 3);
      const titles = result.map((b) => b.title);
      // Primary should include coding-for-kids content
      const hasCodingForKids = titles.some((t) => /kids|fun coding|basic/i.test(t));
      expect(hasCodingForKids).toBe(true);
    });

    it('returns JEE/NEET blogs for senior students', () => {
      const result = blogsForClass(mockBlogs, 12);
      const titles = result.map((b) => b.title);
      // Class 12 should see JEE-related content
      const hasSeniorContent = titles.some((t) => /JEE|NEET|Board/i.test(t));
      expect(hasSeniorContent).toBe(true);
    });

    it('returns empty or generic when blog list is empty', () => {
      const result = blogsForClass([], 10);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('does not crash on missing class', () => {
      expect(() => blogsForClass(mockBlogs, undefined as any)).not.toThrow();
    });
  });
});
