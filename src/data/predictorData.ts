/**
 * predictorData.ts — Reference data + engine for the Rank / College Predictor.
 *
 * IMPORTANT: All figures are INDICATIVE, based on JEE Main 2024 & NEET 2024
 * publicly-reported data (JoSAA / MCC / NTA via reputable aggregators). They are
 * NOT guarantees — exam difficulty, applicant volume and category change yearly.
 * The UI always shows a clear "estimate only" disclaimer.
 *
 * Yearly update: refresh these tables after each year's counselling closes.
 * Sources are recorded in DATA_SOURCES.
 */

export const PREDICTOR_DATA_YEAR = 2024;

/* ─── JEE Main: percentile → approx All India Rank ──────────────────────────*/
const JEE_PERCENTILE_TO_RANK: { percentile: number; rank: number }[] = [
  { percentile: 99.99, rank: 100 },
  { percentile: 99.9, rank: 500 },
  { percentile: 99.5, rank: 3000 },
  { percentile: 99.0, rank: 9000 },
  { percentile: 98.0, rank: 25000 },
  { percentile: 95.0, rank: 75000 },
  { percentile: 90.0, rank: 150000 },
  { percentile: 80.0, rank: 300000 },
];

/** Linear-interpolate percentile → estimated AIR. */
export function jeePercentileToRank(percentile: number): number {
  const p = Math.max(0, Math.min(100, percentile));
  const pts = JEE_PERCENTILE_TO_RANK;
  if (p >= pts[0].percentile) return pts[0].rank;
  for (let i = 0; i < pts.length - 1; i++) {
    const hi = pts[i], lo = pts[i + 1];
    if (p <= hi.percentile && p >= lo.percentile) {
      const t = (hi.percentile - p) / (hi.percentile - lo.percentile);
      return Math.round(hi.rank + t * (lo.rank - hi.rank));
    }
  }
  return 500000;
}

/* ─── JoSAA closing ranks (General, 2024) — representative anchor set ────────*/
export interface CollegeCutoff {
  college: string;
  branch: string;
  closingRank: number;
  tier: string;
}
export const JOSAA_CUTOFFS: CollegeCutoff[] = [
  { college: 'IIT Bombay',          branch: 'Computer Science & Engineering', closingRank: 68,   tier: 'IIT' },
  { college: 'IIT Delhi',           branch: 'Computer Science & Engineering', closingRank: 116,  tier: 'IIT' },
  { college: 'IIT Madras',          branch: 'Computer Science & Engineering', closingRank: 159,  tier: 'IIT' },
  { college: 'IIT Kanpur',          branch: 'Computer Science & Engineering', closingRank: 248,  tier: 'IIT' },
  { college: 'IIT Kharagpur',       branch: 'Computer Science & Engineering', closingRank: 415,  tier: 'IIT' },
  { college: 'IIT (various)',       branch: 'Core branches (Mech/Civil/Elec)', closingRank: 8000, tier: 'IIT' },
  { college: 'NIT Warangal',        branch: 'Computer Science & Engineering', closingRank: 2135, tier: 'NIT' },
  { college: 'NIT Surathkal',       branch: 'Computer Science & Engineering', closingRank: 2726, tier: 'NIT' },
  { college: 'NIT Trichy',          branch: 'Computer Science & Engineering', closingRank: 4178, tier: 'NIT' },
  { college: 'IIIT Hyderabad',      branch: 'Computer Science & Engineering', closingRank: 3550, tier: 'IIIT' },
  { college: 'Top NITs',            branch: 'Core branches',                  closingRank: 15000, tier: 'NIT' },
  { college: 'Other NITs / GFTIs',  branch: 'Various branches',               closingRank: 50000, tier: 'NIT/GFTI' },
];

/** Colleges whose closing rank is >= your rank (i.e. you'd likely get in). */
export function predictJeeColleges(rank: number): CollegeCutoff[] {
  return JOSAA_CUTOFFS.filter(c => rank <= c.closingRank).sort((a, b) => a.closingRank - b.closingRank);
}

/* ─── NEET: marks → approx All India Rank ───────────────────────────────────*/
const NEET_MARKS_TO_RANK: { marks: number; rank: number }[] = [
  { marks: 720, rank: 1 },
  { marks: 700, rank: 1500 },
  { marks: 680, rank: 5000 },
  { marks: 650, rank: 10000 },
  { marks: 600, rank: 30000 },
  { marks: 550, rank: 90000 },
  { marks: 500, rank: 175000 },
  { marks: 450, rank: 300000 },
  { marks: 164, rank: 610000 }, // ~ qualifying (General)
];

export function neetMarksToRank(marks: number): number {
  const m = Math.max(0, Math.min(720, marks));
  const pts = NEET_MARKS_TO_RANK;
  if (m >= pts[0].marks) return pts[0].rank;
  for (let i = 0; i < pts.length - 1; i++) {
    const hi = pts[i], lo = pts[i + 1];
    if (m <= hi.marks && m >= lo.marks) {
      const t = (hi.marks - m) / (hi.marks - lo.marks);
      return Math.round(hi.rank + t * (lo.rank - hi.rank));
    }
  }
  return 700000;
}

export const NEET_QUALIFYING_2024 = { general: 164, obc: 163, sc: 163, st: 163 };

export interface MedicalCutoff { college: string; course: string; closingRank: number; quota: string; }
export const NEET_COLLEGE_CUTOFFS: MedicalCutoff[] = [
  { college: 'AIIMS New Delhi',                 course: 'MBBS', closingRank: 50,    quota: 'AIQ General' },
  { college: 'Maulana Azad Medical College',    course: 'MBBS', closingRank: 145,   quota: 'AIQ General' },
  { college: 'Top Govt Medical Colleges',       course: 'MBBS', closingRank: 2000,  quota: 'AIQ General' },
  { college: 'State Govt Medical Colleges',     course: 'MBBS', closingRank: 20000, quota: 'State / AIQ' },
  { college: 'Other Govt / Deemed Colleges',    course: 'MBBS', closingRank: 80000, quota: 'AIQ / Management' },
];

export function predictNeetColleges(rank: number): MedicalCutoff[] {
  return NEET_COLLEGE_CUTOFFS.filter(c => rank <= c.closingRank).sort((a, b) => a.closingRank - b.closingRank);
}

/* ─── Stream guidance (after Class 10) ──────────────────────────────────────*/
export interface StreamGuide {
  stream: string;
  emoji: string;
  forYou: string;
  careers: string[];
  exams: string[];
}
export const STREAM_GUIDES: StreamGuide[] = [
  { stream: 'Science (PCM)', emoji: '🔬', forYou: 'You enjoy maths, physics and problem-solving, and want engineering, architecture, or tech.',
    careers: ['Engineer', 'Architect', 'Data Scientist', 'Pilot', 'Research'], exams: ['JEE Main/Advanced', 'BITSAT', 'State CETs', 'NDA'] },
  { stream: 'Science (PCB)', emoji: '🧬', forYou: 'You love biology and want medicine, dentistry, pharmacy, or life sciences.',
    careers: ['Doctor', 'Dentist', 'Pharmacist', 'Biotechnologist', 'Nurse'], exams: ['NEET', 'AIIMS-linked', 'State NEET counselling'] },
  { stream: 'Commerce', emoji: '📊', forYou: 'You like business, money, accounts and analytical thinking.',
    careers: ['Chartered Accountant', 'Investment Banker', 'Economist', 'Entrepreneur', 'Company Secretary'], exams: ['CA Foundation', 'CUET', 'CLAT (for law)', 'CMA'] },
  { stream: 'Arts / Humanities', emoji: '🎨', forYou: 'You enjoy history, languages, psychology, design, or civil services.',
    careers: ['Civil Servant (IAS/IPS)', 'Lawyer', 'Journalist', 'Designer', 'Psychologist'], exams: ['CUET', 'CLAT', 'UPSC (later)', 'Design/NID'] },
];

/* ─── Multi-exam engineering predictor (JEE + state exams + BITSAT) ─────────
   Generic engine so we can add any exam by data alone. `metric` is what the
   college cutoffs are expressed in:
     • 'rank'       → you get in if YOUR rank <= college closing rank
     • 'percentile' → you get in if YOUR percentile >= college closing percentile
     • 'score'      → you get in if YOUR score >= college closing score
   `inputToRank` (optional) converts a marks/percentile input into an AIR. */

export type EngMetric = 'rank' | 'percentile' | 'score';

export interface EngExam {
  id: string;
  name: string;
  emoji: string;
  region: string;            // "All India" or the state
  inputLabel: string;
  inputMax: number;
  metric: EngMetric;
  inputToRank?: { input: number; rank: number }[];   // present → we estimate a rank
  colleges: { college: string; branch: string; cutoff: number }[];
}

export const ENG_EXAMS: EngExam[] = [
  {
    id: 'jee-main', name: 'JEE Main', emoji: '🎯', region: 'All India',
    inputLabel: 'Your Percentile (NTA score)', inputMax: 100, metric: 'rank',
    inputToRank: JEE_PERCENTILE_TO_RANK.map(p => ({ input: p.percentile, rank: p.rank })),
    colleges: JOSAA_CUTOFFS.map(c => ({ college: c.college, branch: c.branch, cutoff: c.closingRank })),
  },
  {
    id: 'bitsat', name: 'BITSAT', emoji: '🏛️', region: 'All India (BITS)',
    inputLabel: 'Your BITSAT Score (out of 390)', inputMax: 390, metric: 'score',
    colleges: [
      { college: 'BITS Pilani', branch: 'Computer Science', cutoff: 331 },
      { college: 'BITS Pilani', branch: 'Electronics & Comm (ECE)', cutoff: 318 },
      { college: 'BITS Goa', branch: 'Computer Science', cutoff: 304 },
      { college: 'BITS Hyderabad', branch: 'Computer Science', cutoff: 298 },
      { college: 'BITS Goa', branch: 'Mechanical', cutoff: 223 },
      { college: 'BITS Hyderabad', branch: 'Mechanical', cutoff: 218 },
    ],
  },
  {
    id: 'ap-eapcet', name: 'AP EAPCET (EAMCET)', emoji: '🌾', region: 'Andhra Pradesh',
    inputLabel: 'Your Marks (out of 160)', inputMax: 160, metric: 'rank',
    inputToRank: [
      { input: 160, rank: 1 }, { input: 140, rank: 100 }, { input: 120, rank: 2500 },
      { input: 100, rank: 6000 }, { input: 85, rank: 12000 }, { input: 70, rank: 20000 },
      { input: 60, rank: 25000 }, { input: 50, rank: 30000 }, { input: 40, rank: 60000 },
    ],
    colleges: [
      { college: 'JNTU Kakinada', branch: 'Computer Science', cutoff: 1000 },
      { college: 'Andhra University, Visakhapatnam', branch: 'Computer Science', cutoff: 1627 },
      { college: 'Sri Venkateswara Univ, Tirupati', branch: 'Computer Science', cutoff: 3273 },
      { college: 'SVCE Tirupati', branch: 'Computer Science', cutoff: 8747 },
      { college: 'GVP College of Engineering', branch: 'Mechanical', cutoff: 24089 },
    ],
  },
  {
    id: 'ts-eapcet', name: 'TS EAPCET (EAMCET)', emoji: '🏙️', region: 'Telangana',
    inputLabel: 'Your Marks (out of 160)', inputMax: 160, metric: 'rank',
    inputToRank: [
      { input: 158, rank: 25 }, { input: 152, rank: 120 }, { input: 145, rank: 350 },
      { input: 120, rank: 800 }, { input: 90, rank: 3000 }, { input: 70, rank: 8000 },
      { input: 60, rank: 15000 }, { input: 49, rank: 50000 },
    ],
    colleges: [
      { college: 'JNTUH Hyderabad', branch: 'Computer Science', cutoff: 1399 },
      { college: 'CBIT Hyderabad', branch: 'Computer Science', cutoff: 2667 },
      { college: 'Vasavi College of Engineering', branch: 'Computer Science', cutoff: 3900 },
      { college: 'JNTUH Hyderabad', branch: 'Mechanical', cutoff: 16091 },
    ],
  },
  {
    id: 'kcet', name: 'KCET', emoji: '🛕', region: 'Karnataka',
    inputLabel: 'Your Score (KCET 50% + PCM 50%, out of 180)', inputMax: 180, metric: 'rank',
    inputToRank: [
      { input: 178, rank: 50 }, { input: 165, rank: 600 }, { input: 150, rank: 2000 },
      { input: 130, rank: 6000 }, { input: 110, rank: 15000 }, { input: 90, rank: 35000 },
    ],
    colleges: [
      { college: 'RV College of Engineering (RVCE)', branch: 'Computer Science', cutoff: 500 },
      { college: 'BMS College of Engineering', branch: 'Computer Science', cutoff: 1200 },
      { college: 'MS Ramaiah Inst of Technology', branch: 'Computer Science', cutoff: 1500 },
      { college: 'PES University', branch: 'Computer Science', cutoff: 1674 },
      { college: 'Dayananda Sagar College', branch: 'Civil', cutoff: 21830 },
    ],
  },
  {
    id: 'mht-cet', name: 'MHT-CET', emoji: '🌊', region: 'Maharashtra',
    inputLabel: 'Your Percentile (out of 100)', inputMax: 100, metric: 'percentile',
    colleges: [
      { college: 'COEP Technological University, Pune', branch: 'Computer Science', cutoff: 99.98 },
      { college: 'VJTI Mumbai', branch: 'Information Technology', cutoff: 99.76 },
      { college: 'PICT Pune', branch: 'Computer Engineering', cutoff: 99.61 },
      { college: 'COEP Pune', branch: 'Mechanical / Civil', cutoff: 98.0 },
    ],
  },
  {
    id: 'wbjee', name: 'WBJEE', emoji: '🌉', region: 'West Bengal',
    inputLabel: 'Your Marks (out of 200)', inputMax: 200, metric: 'rank',
    inputToRank: [
      { input: 195, rank: 40 }, { input: 185, rank: 120 }, { input: 150, rank: 500 },
      { input: 120, rank: 3000 }, { input: 90, rank: 9000 }, { input: 60, rank: 25000 },
    ],
    colleges: [
      { college: 'Jadavpur University', branch: 'Computer Science (Home State)', cutoff: 309 },
      { college: 'Kalyani Govt Engineering College', branch: 'Electrical / Mechanical', cutoff: 4000 },
      { college: 'IEM Kolkata', branch: 'Computer Science', cutoff: 9000 },
    ],
  },
];

function interp(table: { input: number; rank: number }[], input: number): number {
  // table is descending by input. Returns interpolated rank.
  const t = [...table].sort((a, b) => b.input - a.input);
  if (input >= t[0].input) return t[0].rank;
  for (let i = 0; i < t.length - 1; i++) {
    const hi = t[i], lo = t[i + 1];
    if (input <= hi.input && input >= lo.input) {
      const f = (hi.input - input) / (hi.input - lo.input);
      return Math.round(hi.rank + f * (lo.rank - hi.rank));
    }
  }
  return t[t.length - 1].rank * 2;
}

export interface EngPrediction {
  estimatedRank: number | null;
  colleges: { college: string; branch: string; cutoff: number }[];
}

export function predictEngineering(examId: string, input: number): EngPrediction | null {
  const exam = ENG_EXAMS.find(e => e.id === examId);
  if (!exam) return null;
  const val = Math.max(0, Math.min(exam.inputMax, input));

  if (exam.metric === 'rank') {
    const rank = exam.inputToRank ? interp(exam.inputToRank, val) : val;
    const colleges = exam.colleges.filter(c => rank <= c.cutoff).sort((a, b) => a.cutoff - b.cutoff);
    return { estimatedRank: rank, colleges };
  }
  // percentile / score → higher is better, compare directly
  const colleges = exam.colleges.filter(c => val >= c.cutoff).sort((a, b) => b.cutoff - a.cutoff);
  return { estimatedRank: null, colleges };
}

export const DATA_SOURCES = {
  josaa: 'https://josaa.nic.in/',
  mcc: 'https://mcc.nic.in/',
  nta: 'https://nta.ac.in/',
};
