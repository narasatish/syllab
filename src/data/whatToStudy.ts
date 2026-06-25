/**
 * whatToStudy.ts — "What to study" intelligence: official CBSE unit-wise marks
 * weightage (so students focus where the marks are) + a typical exam calendar.
 * Pure-data (single-quoted) → slugs read via regex in studyClusters.mjs.
 *
 * Weightages follow CBSE's published unit-wise distribution. Exam windows are the
 * usual months — the UI tells students to confirm exact dates on official sites.
 */
export interface WeightageUnit { name: string; marks: number; tip: string; }
export interface WeightageSubject {
  slug: string;
  classLevel: string;
  subject: string;
  exam: string;
  totalMarks: number;
  intro: string;
  units: WeightageUnit[];
}

export const WEIGHTAGE_SUBJECTS: WeightageSubject[] = [
  {
    slug: 'class-10-maths',
    classLevel: 'Class 10', subject: 'Mathematics', exam: 'CBSE Board', totalMarks: 80,
    intro: 'CBSE Class 10 Maths is 80 marks (theory). Algebra and Geometry alone carry 35 of 80 — master these first.',
    units: [
      { name: 'Algebra', marks: 20, tip: 'Highest weightage. Quadratic equations, AP and polynomials are repeat scorers.' },
      { name: 'Geometry', marks: 15, tip: 'Triangles and circles — practise proofs and construction.' },
      { name: 'Trigonometry', marks: 12, tip: 'Heights & distances + identities — formula-driven, easy marks.' },
      { name: 'Statistics & Probability', marks: 11, tip: 'Mean/median/mode and basic probability — quick, high-return.' },
      { name: 'Mensuration', marks: 10, tip: 'Surface area & volume of combined solids.' },
      { name: 'Coordinate Geometry', marks: 6, tip: 'Distance, section and area formulas.' },
      { name: 'Number Systems', marks: 6, tip: 'Real numbers, HCF/LCM, Euclid’s lemma.' },
    ],
  },
  {
    slug: 'class-10-science',
    classLevel: 'Class 10', subject: 'Science', exam: 'CBSE Board', totalMarks: 80,
    intro: 'Class 10 Science theory is 80 marks. Chemistry and Biology each carry 25 — half the paper.',
    units: [
      { name: 'Chemical Substances – Nature & Behaviour', marks: 25, tip: 'Acids-bases-salts, metals/non-metals, carbon compounds, periodic table.' },
      { name: 'World of Living (Biology)', marks: 25, tip: 'Life processes, control & coordination, reproduction, heredity.' },
      { name: 'Natural Phenomena (Light & Eye)', marks: 12, tip: 'Reflection, refraction, lenses, human eye — numericals + ray diagrams.' },
      { name: 'Effects of Current', marks: 13, tip: 'Electricity and magnetic effects — Ohm’s law numericals are guaranteed.' },
      { name: 'Natural Resources', marks: 5, tip: 'Our environment and management — short, scoring.' },
    ],
  },
  {
    slug: 'class-12-physics',
    classLevel: 'Class 12', subject: 'Physics', exam: 'CBSE Board', totalMarks: 70,
    intro: 'Class 12 Physics theory is 70 marks. Optics + EM Waves and the Magnetism/EMI block carry the most.',
    units: [
      { name: 'Optics & EM Waves', marks: 18, tip: 'Ray + wave optics, instruments — high marks, lots of numericals.' },
      { name: 'Magnetic Effects, EMI & AC', marks: 17, tip: 'Moving charges, induction, alternating current.' },
      { name: 'Electrostatics & Current Electricity', marks: 16, tip: 'Fields, potential, capacitance, circuits — strong base for JEE/NEET too.' },
      { name: 'Dual Nature, Atoms & Nuclei', marks: 12, tip: 'Photoelectric effect, Bohr model, nuclear physics.' },
      { name: 'Electronic Devices', marks: 7, tip: 'Semiconductors and diodes — easy, definite questions.' },
    ],
  },
  {
    slug: 'class-12-chemistry',
    classLevel: 'Class 12', subject: 'Chemistry', exam: 'CBSE Board', totalMarks: 70,
    intro: 'Class 12 Chemistry theory is 70 marks, split across Physical, Inorganic and Organic. Organic chapters together dominate.',
    units: [
      { name: 'Organic (Haloalkanes → Amines, Biomolecules)', marks: 28, tip: 'Reaction mechanisms and named reactions — the biggest block; practise conversions.' },
      { name: 'Electrochemistry & Chemical Kinetics', marks: 16, tip: 'Nernst equation, rate laws — numerical-heavy and scoring.' },
      { name: 'd- & f-Block + Coordination Compounds', marks: 14, tip: 'Inorganic — colour, magnetism, IUPAC naming, isomerism.' },
      { name: 'Solutions', marks: 7, tip: 'Colligative properties numericals.' },
      { name: 'Biomolecules', marks: 5, tip: 'Carbohydrates, proteins — pure recall marks.' },
    ],
  },
  {
    slug: 'class-12-maths',
    classLevel: 'Class 12', subject: 'Mathematics', exam: 'CBSE Board', totalMarks: 80,
    intro: 'Class 12 Maths is 80 marks. Calculus alone is ~35 — nearly half the paper.',
    units: [
      { name: 'Calculus', marks: 35, tip: 'Continuity, derivatives, integrals, differential equations — practise daily.' },
      { name: 'Vectors & 3-D Geometry', marks: 14, tip: 'Dot/cross product, lines and planes — formula-driven.' },
      { name: 'Algebra (Matrices & Determinants)', marks: 10, tip: 'Operations, inverse, solving equations — accuracy matters.' },
      { name: 'Relations & Functions', marks: 8, tip: 'Types of functions, inverse trig.' },
      { name: 'Probability', marks: 8, tip: 'Conditional probability, Bayes’ theorem.' },
      { name: 'Linear Programming', marks: 5, tip: 'Graphical method — easy full marks.' },
    ],
  },
  {
    slug: 'class-12-biology',
    classLevel: 'Class 12', subject: 'Biology', exam: 'CBSE Board', totalMarks: 70,
    intro: 'Class 12 Biology is 70 marks. Genetics & Evolution and Reproduction together carry nearly half.',
    units: [
      { name: 'Genetics & Evolution', marks: 18, tip: 'Inheritance, molecular basis, evolution — the top-weighted unit.' },
      { name: 'Reproduction', marks: 14, tip: 'Human + plant reproduction, reproductive health — diagram-heavy.' },
      { name: 'Biology in Human Welfare', marks: 14, tip: 'Health, microbes, food production.' },
      { name: 'Biotechnology', marks: 12, tip: 'Principles and applications — recall + process.' },
      { name: 'Ecology', marks: 12, tip: 'Ecosystem, biodiversity — easy diagrams and definitions.' },
    ],
  },
];

export interface ExamWindow { exam: string; window: string; note: string; }
export const EXAM_CALENDAR: ExamWindow[] = [
  { exam: 'CBSE Board Exams (Class 10 & 12)', window: 'February – April', note: 'Date sheet released by CBSE around November–December.' },
  { exam: 'JEE Main', window: 'Session 1: January · Session 2: April', note: 'Two attempts; best score counts. By NTA.' },
  { exam: 'JEE Advanced', window: 'May – June', note: 'For IIT admission; only top JEE Main qualifiers.' },
  { exam: 'NEET (UG)', window: 'May', note: 'Single national medical entrance, by NTA.' },
  { exam: 'CUET (UG)', window: 'May – June', note: 'For central university admissions.' },
  { exam: 'State Board Exams', window: 'February – April', note: 'Varies by state — check your board’s site.' },
];

export function getWeightageSubject(slug: string): WeightageSubject | undefined {
  return WEIGHTAGE_SUBJECTS.find((s) => s.slug === slug);
}
