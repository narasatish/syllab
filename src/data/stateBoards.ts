/**
 * stateBoards.ts — State board syllabi (AP / TS / Karnataka / Maharashtra).
 *
 * Chapter lists are sourced from official board/SCERT textbook indexes and
 * reputable syllabus references (see RESEARCH_SOURCES). Only HIGH-CONFIDENCE,
 * verified lists are included — Social Science chapter titles that boards do
 * not publish publicly are intentionally OMITTED rather than guessed.
 *
 * Yearly update: re-verify against the official PDFs (links in RESEARCH_SOURCES)
 * before each academic session and update the arrays below.
 */

import { Chapter, ClassLevel } from '../types';

type Board = 'AP' | 'TS' | 'Karnataka' | 'Maharashtra' | 'UP' | 'Bihar' | 'Rajasthan' | 'MP';

interface BoardSeed {
  board: Board;
  cls: ClassLevel;
  subject: 'Mathematics' | 'Science';
  chapters: string[];
}

const SEEDS: BoardSeed[] = [
  /* ── Andhra Pradesh (BSEAP / SCERT AP) ─────────────────────────────────── */
  { board: 'AP', cls: '10', subject: 'Mathematics', chapters: [
    'Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations',
    'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry',
    'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes',
    'Statistics', 'Probability',
  ] },
  { board: 'AP', cls: '9', subject: 'Mathematics', chapters: [
    'Number System', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables',
    "Introduction to Euclid's Geometry", 'Lines and Angles', 'Triangles', 'Quadrilaterals', 'Circles',
    "Heron's Formula", 'Surface Areas and Volumes', 'Statistics',
  ] },

  /* ── Telangana (BSE Telangana / SCERT TS) ──────────────────────────────── */
  { board: 'TS', cls: '10', subject: 'Mathematics', chapters: [
    'Real Numbers', 'Sets', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations',
    'Progressions', 'Introduction to Trigonometry', 'Applications of Trigonometry', 'Lines in Two Dimensions',
    'Similar Triangles', 'Tangents and Secants to a Circle', 'Mensuration', 'Statistics', 'Probability',
    'Mathematical Modelling',
  ] },
  { board: 'TS', cls: '10', subject: 'Science', chapters: [
    // Physical Science
    'Reflection of Light at Curved Surfaces', 'Chemical Equations', 'Acids, Bases and Salts',
    'Refraction of Light at Curved Surfaces', 'Human Eye and Colourful World', 'Structure of Atom',
    'Classification of Elements — The Periodic Table', 'Chemical Bonding', 'Electric Current',
    'Electromagnetism', 'Principles of Metallurgy', 'Carbon and its Compounds',
    // Biological Science
    'Nutrition', 'Respiration', 'Transportation', 'Excretion', 'Coordination', 'Reproduction',
    'Coordination in Life Processes', 'Heredity and Evolution', 'Our Environment', 'Natural Resources',
  ] },
  { board: 'TS', cls: '9', subject: 'Mathematics', chapters: [
    'Real Numbers', 'Polynomials and Factorisation', 'Elements of Geometry', 'Lines and Angles',
    'Coordinate Geometry', 'Linear Equations in Two Variables', 'Triangles', 'Quadrilaterals', 'Statistics',
    'Surface Areas and Volumes', 'Areas', 'Circles', 'Geometrical Constructions', 'Probability',
    'Proofs in Mathematics',
  ] },

  /* ── Karnataka (KSEEB / SSLC) ──────────────────────────────────────────── */
  { board: 'Karnataka', cls: '10', subject: 'Mathematics', chapters: [
    'Arithmetic Progressions', 'Triangles', 'Pair of Linear Equations in Two Variables', 'Circles',
    'Areas Related to Circles', 'Constructions', 'Coordinate Geometry', 'Real Numbers', 'Polynomials',
    'Quadratic Equations', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Statistics',
    'Probability', 'Surface Areas and Volumes',
  ] },
  { board: 'Karnataka', cls: '10', subject: 'Science', chapters: [
    'Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals',
    'Carbon and its Compounds', 'Periodic Classification of Elements', 'Life Processes',
    'Control and Coordination', 'How do Organisms Reproduce', 'Heredity and Evolution',
    'Light — Reflection and Refraction', 'The Human Eye and the Colourful World', 'Electricity',
    'Magnetic Effects of Electric Current', 'Sources of Energy', 'Our Environment',
    'Sustainable Management of Natural Resources',
  ] },
  { board: 'Karnataka', cls: '9', subject: 'Mathematics', chapters: [
    'Number Systems', "Introduction to Euclid's Geometry", 'Lines and Angles', 'Polynomials', 'Triangles',
    'Constructions', 'Quadrilaterals', "Heron's Formula", 'Coordinate Geometry',
    'Linear Equations in Two Variables', 'Areas of Parallelograms and Triangles', 'Circles',
    'Surface Areas and Volumes', 'Statistics', 'Probability',
  ] },

  /* ── Maharashtra (MSBSHSE / State Board) ───────────────────────────────── */
  { board: 'Maharashtra', cls: '10', subject: 'Mathematics', chapters: [
    'Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progression', 'Financial Planning',
    'Probability', 'Statistics', 'Similarity', 'Pythagoras Theorem', 'Geometric Constructions',
    'Coordinate Geometry', 'Trigonometry', 'Mensuration',
  ] },
  { board: 'Maharashtra', cls: '10', subject: 'Science', chapters: [
    'Gravitation', 'Periodic Classification of Elements', 'Chemical Reactions and Equations',
    'Effects of Electric Current', 'Heat', 'Refraction of Light', 'Lenses', 'Metallurgy', 'Carbon Compounds',
    'Space Missions', 'Heredity and Evolution', 'Life Processes in Living Organisms Part 1',
    'Life Processes in Living Organisms Part 2', 'Environmental Management', 'Towards Green Energy',
    'Animal Classification', 'Introduction to Microbiology', 'Cell Biology and Biotechnology', 'Social Health',
    'Disaster Management',
  ] },
  { board: 'Maharashtra', cls: '9', subject: 'Science', chapters: [
    'Laws of Motion', 'Work and Energy', 'Current Electricity', 'Measurement of Matter',
    'Acids, Bases and Salts', 'Classification of Plants', 'Energy Flow in an Ecosystem',
    'Useful and Harmful Microbes', 'Environmental Management', 'Information Communication Technology',
    'Reflection of Light', 'Study of Sound', 'Carbon — An Important Element', 'Substances in Common Use',
    'Life Processes in Living Organisms', 'Heredity and Variation', 'Introduction to Biotechnology',
    'Observing Space — Telescopes',
  ] },
];

/* ── NCERT-aligned states (UP/UPMSP, Bihar/BSEB, Rajasthan/RBSE, MP/MPBSE) ──
   These boards follow the NCERT textbooks for Class 9-10 Maths & Science, so we
   use the standard NCERT chapter lists (high confidence). */
const NCERT_10_MATH = [
  'Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations',
  'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry',
  'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes',
  'Statistics', 'Probability',
];
const NCERT_9_MATH = [
  'Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables',
  "Introduction to Euclid's Geometry", 'Lines and Angles', 'Triangles', 'Quadrilaterals',
  "Heron's Formula", 'Surface Areas and Volumes', 'Statistics', 'Circles',
];
const NCERT_10_SCI = [
  'Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals',
  'Carbon and its Compounds', 'Life Processes', 'Control and Coordination', 'How do Organisms Reproduce',
  'Heredity', 'Light — Reflection and Refraction', 'The Human Eye and the Colourful World', 'Electricity',
  'Magnetic Effects of Electric Current', 'Our Environment',
];
const NCERT_9_SCI = [
  'Matter in Our Surroundings', 'Is Matter Around Us Pure', 'Atoms and Molecules', 'Structure of the Atom',
  'The Fundamental Unit of Life', 'Tissues', 'Motion', 'Force and Laws of Motion', 'Gravitation',
  'Work and Energy', 'Sound', 'Improvement in Food Resources',
];
for (const board of ['UP', 'Bihar', 'Rajasthan', 'MP'] as Board[]) {
  SEEDS.push(
    { board, cls: '10', subject: 'Mathematics', chapters: NCERT_10_MATH },
    { board, cls: '9', subject: 'Mathematics', chapters: NCERT_9_MATH },
    { board, cls: '10', subject: 'Science', chapters: NCERT_10_SCI },
    { board, cls: '9', subject: 'Science', chapters: NCERT_9_SCI },
  );
}

const BOARD_FULL: Record<Board, string> = {
  AP: 'Andhra Pradesh (SSC)',
  TS: 'Telangana (SSC)',
  Karnataka: 'Karnataka (SSLC)',
  Maharashtra: 'Maharashtra (SSC)',
  UP: 'Uttar Pradesh (UP Board)',
  Bihar: 'Bihar (BSEB)',
  Rajasthan: 'Rajasthan (RBSE)',
  MP: 'Madhya Pradesh (MPBSE)',
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 28);

export const STATE_BOARD_SYLLABUS: Chapter[] = SEEDS.flatMap(seed =>
  seed.chapters.map((title, i) => ({
    id: `${seed.board.toLowerCase()}-${seed.cls}-${seed.subject === 'Mathematics' ? 'math' : 'sci'}-${i + 1}-${slug(title)}`,
    title,
    subject: seed.subject,
    classLevel: seed.cls,
    board: seed.board,
    topics: Array.from(new Set([title, seed.subject, BOARD_FULL[seed.board]])).slice(0, 6),
    sourceBook: `${BOARD_FULL[seed.board]} ${seed.subject}`,
    explanation: `${BOARD_FULL[seed.board]} Class ${seed.cls} ${seed.subject}: ${title}. Taught with AI lessons, examples and practice.`,
    difficulty: (seed.cls === '10' ? 'Medium' : 'Easy') as Chapter['difficulty'],
    concepts: [],
  })),
);

/** Official sources to re-verify against each year. */
export const RESEARCH_SOURCES = {
  AP: 'https://cse.ap.gov.in/textBooksDownloadingPageTEBilingual',
  TS: 'https://scert.telangana.gov.in/',
  Karnataka: 'https://ktbs.kar.nic.in/',
  Maharashtra: 'https://ebalbharati.in/',
  UP: 'https://upmsp.edu.in/',
  Bihar: 'https://biharboardonline.bihar.gov.in/',
  Rajasthan: 'https://rajeduboard.rajasthan.gov.in/',
  MP: 'https://mpbse.nic.in/',
};
