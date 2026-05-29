import { describe, expect, it } from 'vitest';
import { generateQuestions } from './questions';
import { SYLLABUS } from './syllabus';

describe('Question Generation System', () => {
  it('should generate at least 300 questions per chapter', { timeout: 30_000 }, () => {
    const questions = generateQuestions(SYLLABUS);
    const chapterIds = SYLLABUS.map(c => c.id);
    
    chapterIds.forEach(id => {
      const chapterQuestions = questions.filter(q => q.chapter_id === id);
      // We expect 300 per chapter as defined in COUNT_PER_CHAPTER
      expect(chapterQuestions.length).toBeGreaterThanOrEqual(300);
    });
  });

  it('should have a balanced distribution of difficulties per chapter', () => {
    const questions = generateQuestions(SYLLABUS);
    const chapterId = SYLLABUS[0].id;
    const chapterQuestions = questions.filter(q => q.chapter_id === chapterId);
    
    const easyCount = chapterQuestions.filter(q => q.difficulty === 'easy').length;
    const mediumCount = chapterQuestions.filter(q => q.difficulty === 'medium').length;
    const hardCount = chapterQuestions.filter(q => q.difficulty === 'hard').length;
    
    // Based on fixed distribution logic in generateQuestions
    expect(easyCount).toBe(100);
    expect(mediumCount).toBe(100);
    expect(hardCount).toBe(100);
  });

  it('should include diverse exam types in tags', () => {
    const questions = generateQuestions(SYLLABUS);
    const tags = new Set(questions.flatMap(q => q.exam_type_tags));
    
    expect(tags.has('JEE Main')).toBe(true);
    expect(tags.has('BITSAT')).toBe(true);
    expect(tags.has('VITEEE')).toBe(true);
    expect(tags.has('KCET')).toBe(true);
  });

  it('should generate questions for all syllabus chapters', () => {
    const questions = generateQuestions(SYLLABUS);
    const generatedChapterIds = new Set(questions.map(q => q.chapter_id));
    
    SYLLABUS.forEach(chapter => {
      expect(generatedChapterIds.has(chapter.id)).toBe(true);
    });
  });
});
