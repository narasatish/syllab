import { describe, it, expect } from 'vitest';
import { pickChapterDiagram, pickSlideImage, pickSocialImage } from './lessonImages';

/**
 * The chapter-diagram fallback guarantees science decks show a real verified
 * diagram (from the 180-image library) instead of an emoji when slide-level
 * matching finds nothing. These tests lock that behaviour in.
 */
describe('pickChapterDiagram', () => {
  it('returns a real diagram URL for a well-known science chapter', () => {
    const eye = pickChapterDiagram('The Human Eye and the Colourful World', '10', 'Science');
    expect(eye).not.toBeNull();
    expect(eye!.url).toMatch(/^https?:\/\//);
    expect(eye!.alt?.toLowerCase()).toContain('eye');
  });

  it('matches carbon chemistry chapters to a chemistry diagram', () => {
    const carbon = pickChapterDiagram('Carbon and its Compounds', '10', 'Science');
    expect(carbon).not.toBeNull();
    expect(carbon!.url).toMatch(/^https?:\/\//);
  });

  it('respects subject filtering (no diagram for non-science chapters)', () => {
    expect(pickChapterDiagram('Quadratic Equations', '10', 'Mathematics')).toBeNull();
    expect(pickChapterDiagram('The French Revolution', '9', 'History')).toBeNull();
  });

  it('returns null when the chapter title has no usable tokens', () => {
    expect(pickChapterDiagram('', '10', 'Science')).toBeNull();
  });

  it('pickSlideImage falls back to the chapter diagram on a non-matching slide', () => {
    // A generic slide with no diagram keywords, but a strong chapter title.
    const img = pickSlideImage('Introduction and overview', '10', 'Science', 'The Human Eye and the Colourful World');
    expect(img).not.toBeNull();
    expect(img!.url).toMatch(/^https?:\/\//);
  });
});

describe('pickSocialImage (Social Science)', () => {
  it('maps key SS chapters to a verified India-centric image', () => {
    const cases: [string, RegExp][] = [
      ['Nationalism in India', /salt|gandhi/i],
      ['India - Size and Location', /india/i],
      ['Climate', /monsoon|india/i],
      ['Working of Institutions', /parliament|sansad/i],
      ['Sectors of the Indian Economy', /sector/i],
      ['The French Revolution', /bastille/i],
    ];
    for (const [chapter, altRe] of cases) {
      const img = pickSocialImage(chapter);
      expect(img, chapter).not.toBeNull();
      expect(img!.url).toMatch(/^https?:\/\//);
      expect(`${img!.alt} ${img!.url}`).toMatch(altRe);
    }
  });

  it('pickSlideImage routes Social Science through the SS image set', () => {
    const img = pickSlideImage('any slide text', '10', 'Social Science', 'Minerals and Energy Resources');
    expect(img).not.toBeNull();
    expect(img!.alt.toLowerCase()).toContain('mineral');
  });

  it('returns null for an SS chapter with no curated image (clean emoji fallback)', () => {
    expect(pickSocialImage('Print Culture and the Modern World')).toBeNull();
  });
});
