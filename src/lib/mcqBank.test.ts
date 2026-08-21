import { describe, it, expect } from 'vitest';
import {
  mcqSlug, chapterKey, canonicalClassLevel, findGaps, validateMcq, dedupeMcqs, mergeChapter, serializeBank,
  type BankChapter, type BankMcq,
} from './mcqBank';

const mcq = (q: string, correct = 0): BankMcq => ({
  q, options: ['A', 'B', 'C', 'D'], correct, explanation: 'because it is so',
});

const chapter = (classLevel: string, subject: string, name: string, n: number): BankChapter => ({
  slug: mcqSlug(classLevel, subject, name),
  classLevel, subject, chapter: name,
  intro: 'intro text',
  mcqs: Array.from({ length: n }, (_, i) => mcq(`${name} question number ${i + 1}`)),
  faqs: [{ q: 'why?', a: 'because' }],
});

describe('mcqSlug', () => {
  it('builds a clean url slug', () => {
    expect(mcqSlug('10', 'Science', 'Light - Reflection and Refraction'))
      .toBe('class-10-science-light-reflection-and-refraction');
  });
  it('collapses punctuation and never trails a dash', () => {
    expect(mcqSlug('11', 'Business Studies', 'Business, Trade & Commerce!'))
      .toBe('class-11-business-studies-business-trade-commerce');
  });
});

describe('chapterKey', () => {
  it('ignores spelling/punctuation differences', () => {
    expect(chapterKey('10', 'Science', 'Acids, Bases and Salts'))
      .toBe(chapterKey(10, 'science', 'acids bases and salts'));
  });
  it('separates different chapters', () => {
    expect(chapterKey('10', 'Science', 'Light')).not.toBe(chapterKey('10', 'Science', 'Sound'));
  });

  /**
   * SYLLABUS stores a bare number, the bank stores "Class N", and nothing
   * reconciled them. findGaps therefore read every chapter as empty and
   * mergeChapter appended a second copy under an identical slug: one scheduled
   * run added 8 duplicate Class 1 Mathematics chapters and broke five integrity
   * tests, and every later run would have added more.
   */
  it('treats "Class 7" and "7" as the same class', () => {
    expect(chapterKey('Class 7', 'Science', 'Light')).toBe(chapterKey('7', 'Science', 'Light'));
    expect(chapterKey('class-1', 'Mathematics', 'Addition')).toBe(chapterKey('1', 'Mathematics', 'Addition'));
  });

  it('still separates different classes', () => {
    expect(chapterKey('Class 7', 'Science', 'Light')).not.toBe(chapterKey('Class 8', 'Science', 'Light'));
  });
});

describe('canonicalClassLevel', () => {
  it('normalises every spelling onto the form the bank stores', () => {
    expect(canonicalClassLevel('1')).toBe('Class 1');
    expect(canonicalClassLevel(10)).toBe('Class 10');
    expect(canonicalClassLevel('Class 12')).toBe('Class 12');
    expect(canonicalClassLevel('class-9')).toBe('Class 9');
  });
});

describe('mergeChapter across class spellings', () => {
  const existing = {
    slug: 'class-1-mathematics-addition',
    classLevel: 'Class 1', subject: 'Mathematics', chapter: 'Addition',
    intro: 'x', faqs: [],
    mcqs: [{ q: 'What is 1 + 1?', options: ['1', '2', '3', '4'], correct: 1, explanation: 'two' }],
  };

  it('merges into the existing chapter instead of appending a duplicate', () => {
    const out = mergeChapter([existing], {
      slug: 'class-1-mathematics-addition',
      classLevel: '1', subject: 'Mathematics', chapter: 'Addition',
      intro: 'y', faqs: [],
      mcqs: [{ q: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1, explanation: 'four' }],
    });
    expect(out).toHaveLength(1);
    expect(out[0].mcqs).toHaveLength(2);
    expect(new Set(out.map((c) => c.slug)).size).toBe(out.length);
  });

  it('does not report a gap for a chapter already full under the other spelling', () => {
    const full = { ...existing, mcqs: Array.from({ length: 10 }, (_, i) => ({
      q: `Q${i}`, options: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'e',
    })) };
    const gaps = findGaps([{ classLevel: '1', subject: 'Mathematics', title: 'Addition' }], [full], 10);
    expect(gaps).toEqual([]);
  });
});

describe('findGaps', () => {
  const syllabus = [
    { classLevel: '11', subject: 'Accountancy', title: 'Bills of Exchange' },
    { classLevel: '11', subject: 'Accountancy', title: 'Trial Balance' },
    { classLevel: '10', subject: 'Science', title: 'Light' },
  ];

  it('reports chapters with no questions at all', () => {
    const gaps = findGaps(syllabus, [], 10);
    expect(gaps).toHaveLength(3);
    expect(gaps.every((g) => g.have === 0 && g.need === 10)).toBe(true);
  });

  it('subtracts what already exists', () => {
    const gaps = findGaps(syllabus, [chapter('10', 'Science', 'Light', 4)], 10);
    const light = gaps.find((g) => g.chapter === 'Light');
    expect(light).toMatchObject({ have: 4, need: 6 });
  });

  it('skips chapters already at target', () => {
    const gaps = findGaps(syllabus, [chapter('10', 'Science', 'Light', 10)], 10);
    expect(gaps.map((g) => g.chapter)).not.toContain('Light');
  });

  it('matches existing chapters despite punctuation differences', () => {
    const existing = [chapter('11', 'Accountancy', 'Bills of exchange', 10)];
    expect(findGaps(syllabus, existing, 10).map((g) => g.chapter)).not.toContain('Bills of Exchange');
  });

  it('orders neediest first so a partial run helps the worst chapters', () => {
    const existing = [chapter('10', 'Science', 'Light', 8), chapter('11', 'Accountancy', 'Trial Balance', 2)];
    expect(findGaps(syllabus, existing, 10).map((g) => g.have)).toEqual([0, 2, 8]);
  });

  it('filters by class and subject', () => {
    expect(findGaps(syllabus, [], 10, { classLevel: '11' })).toHaveLength(2);
    expect(findGaps(syllabus, [], 10, { subject: 'Science' })).toHaveLength(1);
  });

  it('generates a shared chapter only once', () => {
    const dup = [...syllabus, { classLevel: '10', subject: 'Science', title: 'Light' }];
    expect(findGaps(dup, [], 10).filter((g) => g.chapter === 'Light')).toHaveLength(1);
  });
});

describe('validateMcq', () => {
  const good = { q: 'What is the speed of light?', options: ['a', 'b', 'c', 'd'], correct: 2, explanation: 'it is well known' };

  it('accepts a well-formed question', () => {
    expect(validateMcq(good)).toMatchObject({ correct: 2 });
  });

  /**
   * These reject at INGEST, so the daily generator cannot put back what was
   * just cleaned out of the bank. Six wrong answer keys shipped to students
   * behind explanations exactly like these — every one of them well-formed
   * enough to pass the structural checks.
   */
  describe('leaked model reasoning', () => {
    it.each([
      'The answer is 5 cm. Wait, let me recalculate: it is 10 cm.',
      "P = 20/90. But the option says 25/90, so I'll mark option 0.",
      'Hmm, this doesn\'t match any option. Assuming a typo.',
      'None of the options are correct, so I picked the closest.',
      'Let me verify: 8 x 9 = 72. Actually that is wrong.',
    ])('rejects: %s', (explanation) => {
      expect(validateMcq({ ...good, explanation })).toBeNull();
    });

    it('keeps a clean explanation that merely contains the word "wait"', () => {
      // The pattern requires "wait," with a comma — the deliberating form —
      // so ordinary prose is not caught.
      const ok = { ...good, explanation: 'Objects in orbit wait for no one; gravity acts continuously.' };
      expect(validateMcq(ok)).not.toBeNull();
    });
  });

  describe('explanation length', () => {
    it('accepts a normal-length explanation', () => {
      expect(validateMcq({ ...good, explanation: 'x'.repeat(600) })).not.toBeNull();
    });

    it('rejects a bloated one (the worst found live was 3405 chars)', () => {
      expect(validateMcq({ ...good, explanation: 'x'.repeat(601) })).toBeNull();
    });
  });

  it('rejects the wrong number of options', () => {
    expect(validateMcq({ ...good, options: ['a', 'b', 'c'] })).toBeNull();
    expect(validateMcq({ ...good, options: ['a', 'b', 'c', 'd', 'e'] })).toBeNull();
  });

  it('rejects duplicate options — the question would be unanswerable', () => {
    expect(validateMcq({ ...good, options: ['a', 'A', 'c', 'd'] })).toBeNull();
  });

  it('rejects an out-of-range or non-integer answer index', () => {
    for (const correct of [-1, 4, 1.5, null, undefined, NaN, 'two', {}]) {
      expect(validateMcq({ ...good, correct })).toBeNull();
    }
  });

  it('accepts a numeric string index — models emit "2" often enough that dropping the question would be worse', () => {
    expect(validateMcq({ ...good, correct: '2' })).toMatchObject({ correct: 2 });
  });

  it('rejects a missing or throwaway explanation', () => {
    expect(validateMcq({ ...good, explanation: '' })).toBeNull();
    expect(validateMcq({ ...good, explanation: 'yes' })).toBeNull();
  });

  it('rejects a stub question', () => {
    expect(validateMcq({ ...good, q: 'why?' })).toBeNull();
  });

  it('rejects junk input without throwing', () => {
    for (const junk of [null, undefined, 'text', 42, [], {}]) {
      expect(validateMcq(junk)).toBeNull();
    }
  });

  it('trims whitespace', () => {
    expect(validateMcq({ ...good, q: '  What is the speed of light?  ' })?.q).toBe('What is the speed of light?');
  });
});

describe('dedupeMcqs', () => {
  it('drops questions already present, ignoring punctuation and case', () => {
    const existing = [mcq('What is the speed of light?')];
    const out = dedupeMcqs(existing, [mcq('what is the SPEED of light'), mcq('What is mass?')]);
    expect(out.map((m) => m.q)).toEqual(['What is mass?']);
  });

  it('drops repeats inside the incoming batch', () => {
    expect(dedupeMcqs([], [mcq('Same question here'), mcq('Same question here')])).toHaveLength(1);
  });
});

describe('mergeChapter', () => {
  it('appends a chapter the bank does not have', () => {
    const out = mergeChapter([], chapter('11', 'Accountancy', 'Bills of Exchange', 3));
    expect(out).toHaveLength(1);
    expect(out[0].mcqs).toHaveLength(3);
  });

  it('keeps the existing slug — those URLs are already indexed', () => {
    const prev: BankChapter = { ...chapter('10', 'Science', 'Light', 2), slug: 'class-10-science-light-old-mcq' };
    const out = mergeChapter([prev], { ...chapter('10', 'Science', 'Light', 2), slug: 'brand-new-slug' });
    expect(out[0].slug).toBe('class-10-science-light-old-mcq');
  });

  it('adds only new questions to an existing chapter', () => {
    const prev = chapter('10', 'Science', 'Light', 2); // "Light question number 1..2"
    const incoming: BankChapter = { ...chapter('10', 'Science', 'Light', 0), mcqs: [mcq('Light question number 1'), mcq('A genuinely new question')] };
    const out = mergeChapter([prev], incoming);
    expect(out).toHaveLength(1);
    expect(out[0].mcqs).toHaveLength(3);
    expect(out[0].mcqs.map((m) => m.q)).toContain('A genuinely new question');
  });

  it('does not overwrite existing intro or faqs', () => {
    const prev = chapter('10', 'Science', 'Light', 1);
    const out = mergeChapter([prev], { ...chapter('10', 'Science', 'Light', 1), intro: 'NEW', faqs: [{ q: 'x', a: 'y' }] });
    expect(out[0].intro).toBe('intro text');
    expect(out[0].faqs).toEqual([{ q: 'why?', a: 'because' }]);
  });

  it('leaves other chapters untouched', () => {
    const bank = [chapter('10', 'Science', 'Light', 1), chapter('10', 'Science', 'Sound', 1)];
    const out = mergeChapter(bank, chapter('10', 'Science', 'Light', 1));
    expect(out).toHaveLength(2);
    expect(out[1]).toBe(bank[1]);
  });
});

describe('serializeBank', () => {
  it('preserves the footer — MCQ_GROUPS/getMcqChapter live after the array', () => {
    // A generation run once wrote header + array and dropped everything after it,
    // deleting two exports. Only tsc caught it, after the data was already
    // regenerated. This makes the loss impossible to miss.
    const header = '/** hdr */\n';
    const footer = 'export const MCQ_GROUPS = () => [];\nexport function getMcqChapter() { return undefined; }\n';
    const out = serializeBank(header, [chapter('10', 'Science', 'Light', 1)], footer);
    expect(out.startsWith(header)).toBe(true);
    expect(out.endsWith(footer)).toBe(true);
    expect(out).toContain('MCQ_GROUPS');
    expect(out).toContain('getMcqChapter');
  });

  it('round-trips through the parser the build uses', () => {
    const header = '/** header */\nexport interface McqChapter { slug: string }\n';
    const bank = [chapter('11', 'Accountancy', 'Bills of Exchange', 2)];
    const src = serializeBank(header, bank);
    expect(src.startsWith(header)).toBe(true);

    const marker = 'export const MCQ_CHAPTERS: McqChapter[] = ';
    const i = src.indexOf(marker) + marker.length;
    let depth = 0, end = -1;
    for (let j = i; j < src.length; j++) {
      if (src[j] === '[') depth++;
      else if (src[j] === ']' && --depth === 0) { end = j + 1; break; }
    }
    expect(JSON.parse(src.slice(i, end))).toEqual(bank);
  });
});
