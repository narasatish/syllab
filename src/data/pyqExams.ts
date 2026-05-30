/**
 * pyqExams.ts — Exam patterns for "PYQ-style" practice papers.
 *
 * IMPORTANT: These generate ORIGINAL questions that match each exam's pattern
 * (topics, difficulty, section mix) — they are NOT copies of real copyrighted
 * papers. That keeps them legal to host + watermark as syllab.in, and lets us
 * refresh them every year. Real past papers are linked to official sources.
 */

export interface PyqExam {
  id: string;
  name: string;
  emoji: string;
  classLevel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** Each section becomes a chapter prompt for the question generator. */
  sections: { subject: string; topic: string; count: number }[];
  /** Official source for the REAL past papers (linked, not hosted). */
  officialPapers?: string;
  note: string;
}

export const PYQ_EXAMS: PyqExam[] = [
  {
    id: 'cbse-10', name: 'CBSE Class 10 Board', emoji: '📘', classLevel: '10', difficulty: 'Medium',
    sections: [
      { subject: 'Mathematics', topic: 'Class 10 Board pattern — mixed chapters', count: 6 },
      { subject: 'Science', topic: 'Class 10 Board pattern — Physics, Chemistry, Biology', count: 6 },
    ],
    officialPapers: 'https://www.cbse.gov.in/cbsenew/question-paper.html',
    note: 'Original board-pattern paper. For real past papers see the official CBSE link.',
  },
  {
    id: 'cbse-12-pcm', name: 'CBSE Class 12 (PCM)', emoji: '📗', classLevel: '12', difficulty: 'Hard',
    sections: [
      { subject: 'Physics', topic: 'Class 12 Board pattern — mixed chapters', count: 5 },
      { subject: 'Chemistry', topic: 'Class 12 Board pattern — mixed chapters', count: 5 },
      { subject: 'Mathematics', topic: 'Class 12 Board pattern — mixed chapters', count: 5 },
    ],
    officialPapers: 'https://www.cbse.gov.in/cbsenew/question-paper.html',
    note: 'Original board-pattern paper for Physics, Chemistry & Maths.',
  },
  {
    id: 'jee-main', name: 'JEE Main', emoji: '🎯', classLevel: '12', difficulty: 'Hard',
    sections: [
      { subject: 'Physics', topic: 'JEE Main pattern — mechanics, electricity, modern physics', count: 5 },
      { subject: 'Chemistry', topic: 'JEE Main pattern — physical, organic, inorganic', count: 5 },
      { subject: 'Mathematics', topic: 'JEE Main pattern — calculus, algebra, coordinate geometry', count: 5 },
    ],
    officialPapers: 'https://jeemain.nta.nic.in/',
    note: 'Original JEE-Main-pattern paper (+4 / −1 style). Real past papers: NTA official site.',
  },
  {
    id: 'neet', name: 'NEET', emoji: '🧬', classLevel: '12', difficulty: 'Hard',
    sections: [
      { subject: 'Physics', topic: 'NEET pattern — mechanics, optics, modern physics', count: 5 },
      { subject: 'Chemistry', topic: 'NEET pattern — physical, organic, inorganic', count: 5 },
      { subject: 'Biology', topic: 'NEET pattern — botany & zoology', count: 8 },
    ],
    officialPapers: 'https://neet.nta.nic.in/',
    note: 'Original NEET-pattern paper. Biology-heavy, as in the real exam.',
  },
];
