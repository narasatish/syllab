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
  { college: 'IIT (newer IITs)',    branch: 'Computer Science & Engineering', closingRank: 2500, tier: 'IIT' },
  { college: 'IIIT Hyderabad',      branch: 'Computer Science & Engineering', closingRank: 3550, tier: 'IIIT' },
  { college: 'NIT Calicut',         branch: 'Computer Science & Engineering', closingRank: 6200, tier: 'NIT' },
  { college: 'IIIT Bangalore / Delhi', branch: 'Computer Science & Engineering', closingRank: 8000, tier: 'IIIT' },
  { college: 'Top NITs',            branch: 'Electronics & Communication (ECE)', closingRank: 9000, tier: 'NIT' },
  { college: 'Top NITs',            branch: 'Core branches (Mech/Civil/Elec)', closingRank: 15000, tier: 'NIT' },
  { college: 'IIIT (newer)',        branch: 'CSE / IT',                       closingRank: 20000, tier: 'IIIT' },
  { college: 'Mid NITs',            branch: 'CSE / IT',                       closingRank: 25000, tier: 'NIT' },
  { college: 'Other NITs / GFTIs',  branch: 'Various branches',               closingRank: 50000, tier: 'NIT/GFTI' },
  { college: 'GFTIs / State govt (CSAB)', branch: 'Various branches',         closingRank: 120000, tier: 'GFTI' },
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
  { stream: 'Vocational / Skill', emoji: '🛠️', forYou: 'You prefer hands-on learning, want early job entry, and like practical trades.',
    careers: ['Electrician', 'Plumber', 'Welder', 'Auto Mechanic', 'Nurse Technician'], exams: ['ITI entrance (state)', 'Polytechnic entrance', 'NITI exams'] },
  { stream: 'Design / Creative', emoji: '🎭', forYou: 'You are artistic, visual, and want fashion, graphic design, interior or product design.',
    careers: ['Fashion Designer', 'Graphic Designer', 'Interior Designer', 'Product Designer', 'UX Designer'], exams: ['NATA', 'UCEED', 'NID DAT', 'NIFT entrance'] },
  { stream: 'Defence', emoji: '🎖️', forYou: 'You want to serve the nation, are disciplined and fit, and can lead teams.',
    careers: ['Army Officer', 'Navy Officer', 'Air Force Pilot', 'Defence Services', 'Border Security'], exams: ['NDA', 'CDS', 'AFCAT', 'Sainik Schools'] },
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
  estimatedRank: number | null;       // overall / open rank (same for everyone with these marks)
  categoryRank: number | null;        // estimated rank WITHIN your category (null for General + no quota)
  colleges: { college: string; branch: string; cutoff: number }[];
}

export function predictEngineering(
  examId: string, input: number, category: Category = 'general', women = false,
): EngPrediction | null {
  const exam = ENG_EXAMS.find(e => e.id === examId);
  if (!exam) return null;
  const val = Math.max(0, Math.min(exam.inputMax, input));
  // Women get supernumerary / slightly relaxed seats in most state & central colleges.
  const factor = CATEGORY_RANK_FACTOR[category] * (women ? WOMEN_QUOTA_FACTOR : 1);
  const hasQuota = category !== 'general' || women;

  if (exam.metric === 'rank') {
    const rank = exam.inputToRank ? interp(exam.inputToRank, val) : val;
    // Your CATEGORY rank is better (lower) than your overall rank because fewer
    // candidates compete within a reserved/quota pool. Admission to category seats
    // is decided on this category rank vs the (open) closing rank.
    const categoryRank = hasQuota ? Math.max(1, Math.round(rank / factor)) : null;
    const effRank = categoryRank ?? rank;
    const colleges = exam.colleges.filter(c => effRank <= c.cutoff).sort((a, b) => a.cutoff - b.cutoff);
    return { estimatedRank: rank, categoryRank, colleges };
  }
  // percentile / score → higher is better, compare directly (mild relaxation for quota)
  const relax = hasQuota ? Math.min(10, (factor - 1) * 2) : 0;
  const colleges = exam.colleges.filter(c => val >= c.cutoff - relax).sort((a, b) => b.cutoff - a.cutoff);
  return { estimatedRank: null, categoryRank: null, colleges };
}

export const DATA_SOURCES = {
  josaa: 'https://josaa.nic.in/',
  mcc: 'https://mcc.nic.in/',
  nta: 'https://nta.ac.in/',
};

/* ─── Reservation category — indicative relaxation on closing ranks ──────────
   Reserved categories generally have more lenient (higher) closing ranks. These
   multipliers are rough, India-wide averages used only to nudge the estimate.   */
export type Category = 'general' | 'obc' | 'ews' | 'sc' | 'st';
export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'ews', label: 'EWS' },
  { id: 'obc', label: 'OBC-NCL' },
  { id: 'sc', label: 'SC' },
  { id: 'st', label: 'ST' },
];
export const CATEGORY_RANK_FACTOR: Record<Category, number> = {
  general: 1, ews: 1.25, obc: 1.7, sc: 4, st: 6,
};
// Women's supernumerary / reserved seats → modestly better effective rank.
export const WOMEN_QUOTA_FACTOR = 1.3;

/* ─── Career Library — explore real Indian careers ──────────────────────────*/
export interface CareerInfo {
  name: string;
  emoji: string;
  field: 'Engineering & Tech' | 'Medical & Health' | 'Commerce & Finance' | 'Law & Civil Services' | 'Creative & Design' | 'Aviation & Defence' | 'Education & Social';
  summary: string;           // 2-line what they do
  salaryEntry: string;       // indicative entry CTC (India)
  salaryExperienced: string; // 5-10 yr range
  path: string;              // education path after Class 12
  skills: string[];
  exams: string[];
  demand: 'Very High' | 'High' | 'Growing' | 'Stable';
  aiImpact: 'Low' | 'Medium' | 'High';  // AI automation risk level
  aiReason: string;          // one-line reason for the badge
}
export const CAREER_LIBRARY: CareerInfo[] = [
  { name: 'Software Engineer', emoji: '💻', field: 'Engineering & Tech', summary: 'Builds apps, websites and systems used by millions. Solves complex problems through coding and system design.', salaryEntry: '₹4–12 LPA', salaryExperienced: '₹18–60 LPA+', path: 'B.Tech/BE CSE or BCA → MCA (optional)', skills: ['Coding', 'Problem-solving', 'Maths/Logic'], exams: ['JEE Main', 'State CETs', 'BITSAT'], demand: 'Very High', aiImpact: 'Medium', aiReason: 'AI handles routine coding; complex design and architecture remain human domain.' },
  { name: 'Data Scientist', emoji: '📊', field: 'Engineering & Tech', summary: 'Turns data into insights and trains AI/ML models. Finds patterns to guide business decisions.', salaryEntry: '₹6–14 LPA', salaryExperienced: '₹25–80 LPA', path: 'B.Tech/BSc (Stats/CS) → MSc/MTech in Data Science', skills: ['Statistics', 'Python', 'ML'], exams: ['JEE Main', 'CUET', 'GATE (PG)'], demand: 'Very High', aiImpact: 'Medium', aiReason: 'Growing demand for ML; need for domain expertise keeps human judgment central.' },
  { name: 'Doctor (MBBS)', emoji: '🩺', field: 'Medical & Health', summary: 'Diagnoses and treats patients; can specialise via MD/MS. Builds trust and makes critical care decisions.', salaryEntry: '₹6–12 LPA', salaryExperienced: '₹15–50 LPA+', path: 'NEET → MBBS (5.5 yr) → MD/MS (specialise)', skills: ['Biology', 'Empathy', 'Stamina'], exams: ['NEET UG', 'NEET PG (later)'], demand: 'Very High', aiImpact: 'Low', aiReason: 'AI assists diagnosis; patient care, empathy and ethical decisions remain uniquely human.' },
  { name: 'Pharmacist', emoji: '💊', field: 'Medical & Health', summary: 'Expert in medicines, dosage and drug safety. Advises patients and guides medication therapy.', salaryEntry: '₹3–6 LPA', salaryExperienced: '₹8–20 LPA', path: 'B.Pharm / D.Pharm → M.Pharm (optional)', skills: ['Chemistry', 'Precision', 'Biology'], exams: ['State Pharmacy CETs', 'GPAT (PG)'], demand: 'Growing', aiImpact: 'Low', aiReason: 'Patient interaction and safety judgment cannot be automated.' },
  { name: 'Chartered Accountant', emoji: '🧮', field: 'Commerce & Finance', summary: 'Audits, taxation and financial strategy for businesses. Ensures compliance and optimizes finance.', salaryEntry: '₹7–12 LPA', salaryExperienced: '₹20–70 LPA', path: 'CA Foundation → Intermediate → Articleship → Final', skills: ['Accounting', 'Attention to detail', 'Ethics'], exams: ['CA Foundation (ICAI)'], demand: 'High', aiImpact: 'High', aiReason: 'Routine bookkeeping and compliance checks increasingly automated by software.' },
  { name: 'Investment Banker', emoji: '💰', field: 'Commerce & Finance', summary: 'Helps companies raise money, merge and invest. Negotiates complex deals and builds client relationships.', salaryEntry: '₹8–15 LPA', salaryExperienced: '₹30 LPA–₹1 Cr+', path: 'B.Com/BBA → MBA (Finance) / CFA', skills: ['Finance', 'Excel', 'Negotiation'], exams: ['CUET', 'CAT (MBA)', 'CFA'], demand: 'High', aiImpact: 'Medium', aiReason: 'Data analysis automated; strategy and client trust remain human-centric.' },
  { name: 'Civil Servant (IAS/IPS)', emoji: '🏛️', field: 'Law & Civil Services', summary: 'Runs districts, ministries and public administration. Leads policy and builds public trust.', salaryEntry: '₹10–14 LPA', salaryExperienced: '₹18–30 LPA + perks', path: 'Any degree → UPSC Civil Services Exam', skills: ['General Studies', 'Leadership', 'Writing'], exams: ['UPSC CSE', 'State PSC'], demand: 'Stable', aiImpact: 'Low', aiReason: 'Leadership, ethics and citizen judgment cannot be outsourced to AI.' },
  { name: 'Lawyer', emoji: '⚖️', field: 'Law & Civil Services', summary: 'Advises clients, argues cases and drafts contracts. Protects rights and navigates legal systems.', salaryEntry: '₹4–10 LPA', salaryExperienced: '₹15–60 LPA+', path: 'CLAT → 5-yr BA-LLB / 3-yr LLB after graduation', skills: ['Reasoning', 'English', 'Debate'], exams: ['CLAT', 'AILET', 'LSAT India'], demand: 'High', aiImpact: 'Low', aiReason: 'AI assists research; client counsel and courtroom advocacy require human judgment.' },
  { name: 'Mechanical Engineer', emoji: '⚙️', field: 'Engineering & Tech', summary: 'Designs machines, engines, EVs and manufacturing systems. Solves physical and mechanical challenges.', salaryEntry: '₹3–7 LPA', salaryExperienced: '₹10–30 LPA', path: 'B.Tech/BE Mechanical → M.Tech (optional)', skills: ['Physics', 'CAD', 'Design'], exams: ['JEE Main', 'State CETs', 'GATE'], demand: 'Stable', aiImpact: 'Medium', aiReason: 'CAD and simulation tools handle routine design; innovation and testing still need humans.' },
  { name: 'Architect', emoji: '📐', field: 'Creative & Design', summary: 'Designs buildings and spaces — art meets engineering. Balances aesthetics, safety and sustainability.', salaryEntry: '₹3–7 LPA', salaryExperienced: '₹12–40 LPA', path: 'NATA/JEE Paper 2 → B.Arch (5 yr)', skills: ['Drawing', 'Maths', 'Creativity'], exams: ['NATA', 'JEE Main Paper 2'], demand: 'Growing', aiImpact: 'Low', aiReason: 'Creative vision and client collaboration remain fundamentally human skills.' },
  { name: 'UX / Product Designer', emoji: '🎨', field: 'Creative & Design', summary: 'Designs how apps and products look and feel. Creates intuitive experiences users love.', salaryEntry: '₹4–9 LPA', salaryExperienced: '₹15–45 LPA', path: 'B.Des / any degree + design portfolio', skills: ['Creativity', 'Empathy', 'Design tools'], exams: ['UCEED', 'NID DAT', 'CEED (PG)'], demand: 'Very High', aiImpact: 'Low', aiReason: 'Design requires creative judgment and empathy for user needs.' },
  { name: 'Pilot', emoji: '✈️', field: 'Aviation & Defence', summary: 'Flies passenger or cargo aircraft across the world. Makes split-second decisions under pressure.', salaryEntry: '₹15–25 LPA', salaryExperienced: '₹50 LPA–₹1.5 Cr', path: 'PCM in 12th → CPL (Commercial Pilot Licence)', skills: ['Physics', 'Focus', 'Quick decisions'], exams: ['DGCA exams', 'Pilot aptitude'], demand: 'Growing', aiImpact: 'Low', aiReason: 'Safety critical role requires human judgment; autopilot aids but cannot replace.' },
  { name: 'Defence Officer (NDA)', emoji: '🎖️', field: 'Aviation & Defence', summary: 'Leads in the Army, Navy or Air Force. Makes strategic decisions and protects the nation.', salaryEntry: '₹8–12 LPA', salaryExperienced: '₹15–25 LPA + perks', path: 'NDA after 12th / CDS after graduation', skills: ['Fitness', 'Leadership', 'GK'], exams: ['NDA', 'CDS', 'AFCAT'], demand: 'Stable', aiImpact: 'Low', aiReason: 'Leadership and defense judgment are fundamentally human responsibilities.' },
  { name: 'Psychologist', emoji: '🧠', field: 'Education & Social', summary: 'Helps people with mental health and behaviour. Listens, diagnoses and creates healing relationships.', salaryEntry: '₹3–6 LPA', salaryExperienced: '₹10–25 LPA', path: 'BA/BSc Psychology → MA + M.Phil/PhD', skills: ['Empathy', 'Listening', 'Research'], exams: ['CUET', 'University entrances'], demand: 'Growing', aiImpact: 'Low', aiReason: 'Therapeutic relationships and empathy-based healing cannot be replicated by AI.' },
  { name: 'Digital Marketer', emoji: '📱', field: 'Commerce & Finance', summary: 'Grows brands using social media, SEO and ads. Creates campaigns that engage and convert.', salaryEntry: '₹3–6 LPA', salaryExperienced: '₹10–30 LPA', path: 'Any degree (BBA/BMS helps) + certifications', skills: ['Creativity', 'Analytics', 'Writing'], exams: ['CUET', 'No fixed exam'], demand: 'Very High', aiImpact: 'Medium', aiReason: 'AI handles targeting and optimization; creative strategy and human storytelling stay central.' },
  { name: 'Teacher / Professor', emoji: '📚', field: 'Education & Social', summary: 'Shapes the next generation; can teach school or college. Inspires learning and builds character.', salaryEntry: '₹3–6 LPA', salaryExperienced: '₹8–20 LPA', path: 'Degree + B.Ed (school) / Masters + NET (college)', skills: ['Subject mastery', 'Communication', 'Patience'], exams: ['CTET', 'State TET', 'UGC NET'], demand: 'Stable', aiImpact: 'Low', aiReason: 'Mentorship, motivation and personalized guidance are irreplaceably human.' },
];
export const CAREER_FIELDS = [
  'All', 'Engineering & Tech', 'Medical & Health', 'Commerce & Finance',
  'Law & Civil Services', 'Creative & Design', 'Aviation & Defence', 'Education & Social',
] as const;

/* ─── Interest / aptitude quiz → recommended stream ─────────────────────────*/
export type StreamKey = 'Science (PCM)' | 'Science (PCB)' | 'Commerce' | 'Arts / Humanities';
export interface QuizQuestion {
  q: string;
  options: { text: string; emoji: string; stream: StreamKey }[];
}
export const INTEREST_QUIZ: QuizQuestion[] = [
  { q: 'Which activity sounds most fun?', options: [
    { text: 'Solving a tricky maths/physics puzzle', emoji: '🧮', stream: 'Science (PCM)' },
    { text: 'Learning how the human body works', emoji: '🫀', stream: 'Science (PCB)' },
    { text: 'Running a small business or stall', emoji: '🏪', stream: 'Commerce' },
    { text: 'Writing a story or debating an idea', emoji: '✍️', stream: 'Arts / Humanities' },
  ] },
  { q: 'A school project — what role do you grab?', options: [
    { text: 'Build the working model / gadget', emoji: '🔧', stream: 'Science (PCM)' },
    { text: 'Research plants, animals or health', emoji: '🌱', stream: 'Science (PCB)' },
    { text: 'Manage budget and presentation', emoji: '📊', stream: 'Commerce' },
    { text: 'Design posters and write the script', emoji: '🎨', stream: 'Arts / Humanities' },
  ] },
  { q: 'Your favourite type of TV/video?', options: [
    { text: 'How rockets, cars and machines work', emoji: '🚀', stream: 'Science (PCM)' },
    { text: 'Nature, hospitals and medical shows', emoji: '🏥', stream: 'Science (PCB)' },
    { text: 'Shark Tank / startup stories', emoji: '🦈', stream: 'Commerce' },
    { text: 'History, culture and documentaries', emoji: '🏛️', stream: 'Arts / Humanities' },
  ] },
  { q: 'Which subject do you rarely get bored in?', options: [
    { text: 'Maths & Physics', emoji: '➗', stream: 'Science (PCM)' },
    { text: 'Biology & Chemistry', emoji: '🧬', stream: 'Science (PCB)' },
    { text: 'Economics & Accounts', emoji: '💹', stream: 'Commerce' },
    { text: 'History, Civics & Languages', emoji: '📜', stream: 'Arts / Humanities' },
  ] },
  { q: 'A dream job would let you…', options: [
    { text: 'Invent and build new technology', emoji: '🤖', stream: 'Science (PCM)' },
    { text: 'Heal people or save lives', emoji: '🩺', stream: 'Science (PCB)' },
    { text: 'Grow money and lead companies', emoji: '💰', stream: 'Commerce' },
    { text: 'Influence society, law or media', emoji: '⚖️', stream: 'Arts / Humanities' },
  ] },
  { q: 'How do you like to solve problems?', options: [
    { text: 'Logic, formulas and calculation', emoji: '📐', stream: 'Science (PCM)' },
    { text: 'Observation and experiments', emoji: '🔬', stream: 'Science (PCB)' },
    { text: 'Numbers, trends and strategy', emoji: '📈', stream: 'Commerce' },
    { text: 'Words, ideas and creativity', emoji: '💡', stream: 'Arts / Humanities' },
  ] },
];

/* ─── Exam calendar (indicative windows for the 2026 cycle) ─────────────────*/
export interface ExamDate { exam: string; emoji: string; window: string; level: string; site: string; }
export const EXAM_CALENDAR: ExamDate[] = [
  { exam: 'JEE Main Session 1', emoji: '🎯', window: 'Late Jan 2026', level: 'Class 12 / Droppers', site: 'jeemain.nta.ac.in' },
  { exam: 'JEE Main Session 2', emoji: '🎯', window: 'Early Apr 2026', level: 'Class 12 / Droppers', site: 'jeemain.nta.ac.in' },
  { exam: 'JEE Advanced', emoji: '🏆', window: 'May 2026', level: 'JEE Main top 2.5L', site: 'jeeadv.ac.in' },
  { exam: 'NEET UG', emoji: '🩺', window: 'Early May 2026', level: 'Class 12 (PCB)', site: 'neet.nta.nic.in' },
  { exam: 'CUET UG', emoji: '🎓', window: 'May 2026', level: 'Class 12 → Central Univ', site: 'cuet.samarth.ac.in' },
  { exam: 'BITSAT', emoji: '🏛️', window: 'May–Jun 2026', level: 'Class 12 (PCM)', site: 'bitsadmission.com' },
  { exam: 'AP / TS EAPCET', emoji: '🌾', window: 'Apr–May 2026', level: 'Class 12 (state)', site: 'cets.apsche / tgeapcet' },
  { exam: 'KCET', emoji: '🛕', window: 'Apr 2026', level: 'Class 12 (Karnataka)', site: 'kea.kar.nic.in' },
  { exam: 'MHT-CET', emoji: '🌊', window: 'Apr–May 2026', level: 'Class 12 (Maharashtra)', site: 'cetcell.mahacet.org' },
  { exam: 'NDA (I & II)', emoji: '🎖️', window: 'Apr & Sep 2026', level: 'Class 12', site: 'upsc.gov.in' },
  { exam: 'CLAT 2027', emoji: '⚖️', window: 'Dec 2026', level: 'Class 12 → Law', site: 'consortiumofnlus.ac.in' },
];

/* ─── Scholarships for Indian students ──────────────────────────────────────*/
export interface Scholarship { name: string; emoji: string; who: string; benefit: string; site: string; }
export const SCHOLARSHIPS: Scholarship[] = [
  { name: 'National Scholarship Portal (NSP)', emoji: '🇮🇳', who: 'Pre/Post-matric, minority & merit', benefit: 'Tuition + maintenance', site: 'scholarships.gov.in' },
  { name: 'NMMS', emoji: '📗', who: 'Class 8 pass, family income < ₹3.5L', benefit: '₹12,000/yr (Class 9–12)', site: 'scholarships.gov.in' },
  { name: 'INSPIRE-SHE', emoji: '🔬', who: 'Top 1% in 12th pursuing science', benefit: '₹80,000/yr for BSc/BS-MS', site: 'online-inspire.gov.in' },
  { name: 'PM YASASVI', emoji: '🎓', who: 'OBC/EBC/DNT Class 9–12', benefit: 'Up to ₹1.25L/yr', site: 'yet.nta.ac.in' },
  { name: 'Reliance Foundation UG', emoji: '💡', who: 'Merit-cum-means UG students', benefit: 'Up to ₹2L total', site: 'scholarships.reliancefoundation.org' },
  { name: 'Sitaram Jindal Scholarship', emoji: '🏅', who: 'School & college, means-based', benefit: '₹500–₹3,200/month', site: 'sitaramjindalfoundation.org' },
  { name: 'Kishore Vaigyanik (state merit)', emoji: '⭐', who: 'State toppers & merit lists', benefit: 'Varies by state', site: 'state education dept' },
];

/* ─── AI Impact Analysis ───────────────────────────────────────────────────
   McKinsey: ~23% of India's workforce exposed to automation. NASSCOM projects
   2-3M new AI-related jobs by 2030. Figures are indicative estimates.        */
export interface CareerAiRisk {
  name: string;
  level: 'Low' | 'Medium' | 'High';
  reason: string;
}
export const CAREERS_BY_AI_IMPACT: Record<'Low' | 'Medium' | 'High', CareerAiRisk[]> = {
  Low: [
    { name: 'Doctor (MBBS)', level: 'Low', reason: 'Patient care, diagnosis judgment & human empathy cannot be automated.' },
    { name: 'Nurse', level: 'Low', reason: 'Physical care, patient monitoring & critical care decisions stay human.' },
    { name: 'Teacher / Professor', level: 'Low', reason: 'Mentorship, inspiration & personalized guidance are irreplaceably human.' },
    { name: 'Psychologist', level: 'Low', reason: 'Therapeutic relationships & empathy-based healing require human connection.' },
    { name: 'Lawyer', level: 'Low', reason: 'Client counsel, court arguments & ethical judgment need human expertise.' },
    { name: 'Civil Servant (IAS/IPS)', level: 'Low', reason: 'Leadership, policy judgment & public trust cannot be outsourced.' },
    { name: 'Architect', level: 'Low', reason: 'Creative vision, aesthetics & client collaboration stay human-centric.' },
    { name: 'UX / Product Designer', level: 'Low', reason: 'Empathy for users & creative judgment drive good design.' },
    { name: 'Pilot', level: 'Low', reason: 'Safety critical; autopilot assists but human judgment is irreplaceable.' },
    { name: 'Defence Officer (NDA)', level: 'Low', reason: 'Leadership, strategy & defense judgment are fundamentally human.' },
    { name: 'Entrepreneur', level: 'Low', reason: 'Vision, risk-taking & human relationships drive business success.' },
  ],
  Medium: [
    { name: 'Software Engineer', level: 'Medium', reason: 'AI handles routine coding; complex architecture & innovation stay human.' },
    { name: 'Data Scientist', level: 'Medium', reason: 'Growing AI jobs; domain expertise & business judgment remain central.' },
    { name: 'Mechanical Engineer', level: 'Medium', reason: 'CAD/simulation tools handle routine; innovation & testing need humans.' },
    { name: 'Investment Banker', level: 'Medium', reason: 'Data analysis automated; strategy & client relationships stay human.' },
    { name: 'Digital Marketer', level: 'Medium', reason: 'AI optimizes targeting; creative strategy & storytelling drive campaigns.' },
    { name: 'Biotechnologist', level: 'Medium', reason: 'Lab work partially automated; research & discovery need human insight.' },
  ],
  High: [
    { name: 'Data Entry / Clerk', level: 'High', reason: 'Routine data input fully automatable by RPA & OCR systems.' },
    { name: 'Bookkeeper / Accountant', level: 'High', reason: 'Invoice processing, reconciliation easily handled by AI software.' },
    { name: 'Telecaller / BPO Agent', level: 'High', reason: 'Scripted support calls increasingly handled by AI chatbots.' },
    { name: 'Customer Support (Basic)', level: 'High', reason: 'FAQs & simple tickets deflected to AI chatbots 24/7.' },
    { name: 'Transcriptionist', level: 'High', reason: 'Speech-to-text AI handles most transcription faster & cheaper.' },
    { name: 'Data Analyst (Routine)', level: 'High', reason: 'Dashboard creation & standard reports fully automated.' },
  ],
};

/* ─── College Directory (CollegeDunia-style) ────────────────────────────────
   Top engineering colleges across India's biggest engineering states + national
   institutes. All figures (NIRF rank, fees, cutoffs) are INDICATIVE for guidance —
   verify on the official site / counselling portal before any decision.        */
export interface CollegeEntry {
  name: string;
  city: string;
  state: string;            // grouping key (also doubles as the filter chip)
  type: 'IIT' | 'NIT/IIIT' | 'Government' | 'Private/Deemed';
  nirf: number | null;      // indicative NIRF Engineering rank (2024)
  feesPerYear: string;      // indicative tuition / year
  topBranches: string[];
  exam: string;             // admission exam
  cutoff: string;           // indicative closing (General) for a top branch
  process: string;          // one-line admission route
}
export const COLLEGE_STATES = [
  'All', 'National (IIT/NIT)', 'Tamil Nadu', 'Karnataka', 'Maharashtra',
  'Telangana', 'Andhra Pradesh', 'Delhi-NCR', 'West Bengal',
] as const;

export const COLLEGE_DIRECTORY: CollegeEntry[] = [
  // ── National: IITs / NITs / IIITs ──
  { name: 'IIT Bombay', city: 'Mumbai', state: 'National (IIT/NIT)', type: 'IIT', nirf: 3, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'Electrical', 'Mechanical', 'Aerospace'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 68', process: 'JEE Main → JEE Advanced → JoSAA counselling' },
  { name: 'IIT Delhi', city: 'New Delhi', state: 'National (IIT/NIT)', type: 'IIT', nirf: 2, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'Maths & Computing', 'EE', 'Mechanical'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 116', process: 'JEE Main → JEE Advanced → JoSAA counselling' },
  { name: 'IIT Madras', city: 'Chennai', state: 'National (IIT/NIT)', type: 'IIT', nirf: 1, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'Electrical', 'Mechanical', 'Data Science'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 159', process: 'JEE Main → JEE Advanced → JoSAA counselling' },
  { name: 'NIT Trichy', city: 'Tiruchirappalli', state: 'National (IIT/NIT)', type: 'NIT/IIIT', nirf: 9, feesPerYear: '₹1.4–1.6 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 4,178', process: 'JEE Main → JoSAA (Home/Other state quota)' },
  { name: 'NIT Surathkal', city: 'Mangalore', state: 'National (IIT/NIT)', type: 'NIT/IIIT', nirf: 17, feesPerYear: '₹1.4–1.6 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 2,726', process: 'JEE Main → JoSAA counselling' },
  { name: 'IIIT Hyderabad', city: 'Hyderabad', state: 'National (IIT/NIT)', type: 'NIT/IIIT', nirf: 47, feesPerYear: '₹3.5–4 L', topBranches: ['CSE', 'ECE', 'Computational Natural Sci'], exam: 'JEE Main / UGEE', cutoff: 'CSE AIR ≤ 3,550', process: 'JEE Main or IIITH UGEE → counselling' },

  // ── Tamil Nadu ──
  { name: 'Anna University (CEG Campus)', city: 'Chennai', state: 'Tamil Nadu', type: 'Government', nirf: 14, feesPerYear: '₹0.5–0.6 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'TNEA (Class 12 marks)', cutoff: 'CSE cutoff ~199.5 / 200', process: 'TNEA single-window (Class 12 cutoff marks)' },
  { name: 'PSG College of Technology', city: 'Coimbatore', state: 'Tamil Nadu', type: 'Private/Deemed', nirf: 63, feesPerYear: '₹0.6–1.1 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'TNEA', cutoff: 'CSE cutoff ~198+', process: 'TNEA counselling (Govt-aided seats)' },
  { name: 'Thiagarajar College of Engineering', city: 'Madurai', state: 'Tamil Nadu', type: 'Government', nirf: 84, feesPerYear: '₹0.5–0.9 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'TNEA', cutoff: 'CSE cutoff ~196+', process: 'TNEA single-window counselling' },
  { name: 'VIT Vellore', city: 'Vellore', state: 'Tamil Nadu', type: 'Private/Deemed', nirf: 11, feesPerYear: '₹2–4 L', topBranches: ['CSE', 'AI & ML', 'ECE'], exam: 'VITEEE', cutoff: 'CSE VITEEE rank ≤ 7,500', process: 'VITEEE → rank-based counselling' },
  { name: 'SSN College of Engineering', city: 'Chennai', state: 'Tamil Nadu', type: 'Private/Deemed', nirf: 60, feesPerYear: '₹0.5–1.5 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'TNEA / management', cutoff: 'CSE cutoff ~197+', process: 'TNEA counselling + management quota' },

  // ── Karnataka ──
  { name: 'RV College of Engineering (RVCE)', city: 'Bengaluru', state: 'Karnataka', type: 'Private/Deemed', nirf: 99, feesPerYear: '₹0.7–2.5 L', topBranches: ['CSE', 'ISE', 'ECE'], exam: 'KCET / COMEDK', cutoff: 'CSE KCET rank ≤ 500', process: 'KCET (state) or COMEDK (private) counselling' },
  { name: 'BMS College of Engineering', city: 'Bengaluru', state: 'Karnataka', type: 'Private/Deemed', nirf: null, feesPerYear: '₹0.7–2.2 L', topBranches: ['CSE', 'ECE', 'AI/ML'], exam: 'KCET / COMEDK', cutoff: 'CSE KCET rank ≤ 1,200', process: 'KCET or COMEDK counselling' },
  { name: 'MS Ramaiah Inst. of Technology', city: 'Bengaluru', state: 'Karnataka', type: 'Private/Deemed', nirf: null, feesPerYear: '₹0.8–2.4 L', topBranches: ['CSE', 'ISE', 'ECE'], exam: 'KCET / COMEDK', cutoff: 'CSE KCET rank ≤ 1,500', process: 'KCET or COMEDK counselling' },
  { name: 'PES University', city: 'Bengaluru', state: 'Karnataka', type: 'Private/Deemed', nirf: 101, feesPerYear: '₹3–4 L', topBranches: ['CSE', 'ECE', 'AI/ML'], exam: 'KCET / PESSAT', cutoff: 'CSE KCET rank ≤ 1,674', process: 'KCET or PESSAT (own test) counselling' },
  { name: 'NITK Surathkal', city: 'Mangalore', state: 'Karnataka', type: 'NIT/IIIT', nirf: 17, feesPerYear: '₹1.4–1.6 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 2,726', process: 'JEE Main → JoSAA' },

  // ── Maharashtra ──
  { name: 'COEP Technological University', city: 'Pune', state: 'Maharashtra', type: 'Government', nirf: null, feesPerYear: '₹0.8–1 L', topBranches: ['CSE', 'IT', 'Mechanical'], exam: 'MHT-CET', cutoff: 'CSE %ile ≥ 99.98', process: 'MHT-CET CAP rounds (state counselling)' },
  { name: 'VJTI Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Government', nirf: null, feesPerYear: '₹0.8–1 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'MHT-CET', cutoff: 'IT %ile ≥ 99.76', process: 'MHT-CET CAP counselling' },
  { name: 'PICT Pune', city: 'Pune', state: 'Maharashtra', type: 'Private/Deemed', nirf: null, feesPerYear: '₹1.2–1.6 L', topBranches: ['Computer', 'IT', 'ECE'], exam: 'MHT-CET', cutoff: 'Computer %ile ≥ 99.61', process: 'MHT-CET CAP counselling' },
  { name: 'ICT Mumbai', city: 'Mumbai', state: 'Maharashtra', type: 'Government', nirf: null, feesPerYear: '₹0.9–1.2 L', topBranches: ['Chemical', 'Pharma', 'Polymer'], exam: 'MHT-CET / JEE', cutoff: 'Chemical %ile ≥ 99.5', process: 'MHT-CET CAP counselling' },
  { name: 'VNIT Nagpur', city: 'Nagpur', state: 'Maharashtra', type: 'NIT/IIIT', nirf: 49, feesPerYear: '₹1.4–1.6 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 8,000', process: 'JEE Main → JoSAA' },

  // ── Telangana ──
  { name: 'JNTUH (UCEST)', city: 'Hyderabad', state: 'Telangana', type: 'Government', nirf: null, feesPerYear: '₹0.4–0.9 L', topBranches: ['CSE', 'ECE', 'IT'], exam: 'TS EAPCET', cutoff: 'CSE rank ≤ 1,399', process: 'TS EAPCET web counselling' },
  { name: 'CBIT Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'Private/Deemed', nirf: null, feesPerYear: '₹1.2–1.5 L', topBranches: ['CSE', 'IT', 'AI/ML'], exam: 'TS EAPCET', cutoff: 'CSE rank ≤ 2,667', process: 'TS EAPCET counselling + management quota' },
  { name: 'Vasavi College of Engineering', city: 'Hyderabad', state: 'Telangana', type: 'Private/Deemed', nirf: null, feesPerYear: '₹1.2–1.4 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'TS EAPCET', cutoff: 'CSE rank ≤ 3,900', process: 'TS EAPCET counselling' },
  { name: 'IIT Hyderabad', city: 'Hyderabad', state: 'Telangana', type: 'IIT', nirf: 8, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'AI', 'EE'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 700', process: 'JEE Main → JEE Advanced → JoSAA' },

  // ── Andhra Pradesh ──
  { name: 'Andhra University College of Engg', city: 'Visakhapatnam', state: 'Andhra Pradesh', type: 'Government', nirf: null, feesPerYear: '₹0.35–0.8 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'AP EAPCET', cutoff: 'CSE rank ≤ 1,627', process: 'AP EAPCET web counselling' },
  { name: 'JNTU Kakinada', city: 'Kakinada', state: 'Andhra Pradesh', type: 'Government', nirf: null, feesPerYear: '₹0.35–0.8 L', topBranches: ['CSE', 'ECE', 'IT'], exam: 'AP EAPCET', cutoff: 'CSE rank ≤ 1,000', process: 'AP EAPCET counselling' },
  { name: 'SVU College of Engineering', city: 'Tirupati', state: 'Andhra Pradesh', type: 'Government', nirf: null, feesPerYear: '₹0.35–0.8 L', topBranches: ['CSE', 'ECE', 'Civil'], exam: 'AP EAPCET', cutoff: 'CSE rank ≤ 3,273', process: 'AP EAPCET counselling' },
  { name: 'IIT Tirupati', city: 'Tirupati', state: 'Andhra Pradesh', type: 'IIT', nirf: null, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'EE', 'Mechanical'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 4,000', process: 'JEE Main → JEE Advanced → JoSAA' },

  // ── Delhi-NCR ──
  { name: 'NSUT (Netaji Subhas)', city: 'New Delhi', state: 'Delhi-NCR', type: 'Government', nirf: null, feesPerYear: '₹1.6–2 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 5,000', process: 'JEE Main → JAC Delhi counselling' },
  { name: 'DTU (Delhi Tech University)', city: 'New Delhi', state: 'Delhi-NCR', type: 'Government', nirf: null, feesPerYear: '₹1.9–2.1 L', topBranches: ['CSE', 'Software Engg', 'ECE'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 6,500', process: 'JEE Main → JAC Delhi counselling' },
  { name: 'IIIT Delhi', city: 'New Delhi', state: 'Delhi-NCR', type: 'NIT/IIIT', nirf: null, feesPerYear: '₹3–4 L', topBranches: ['CSE', 'ECE', 'CS+Maths'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 8,000', process: 'JEE Main → JoSAA / JAC Delhi' },
  { name: 'IGDTUW (Women)', city: 'New Delhi', state: 'Delhi-NCR', type: 'Government', nirf: null, feesPerYear: '₹1.5–2 L', topBranches: ['CSE', 'AI/ML', 'ECE'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 18,000 (women)', process: 'JEE Main → JAC Delhi (women-only)' },

  // ── West Bengal ──
  { name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', type: 'Government', nirf: 12, feesPerYear: '₹0.05–0.1 L', topBranches: ['CSE', 'ECE', 'IT'], exam: 'WBJEE', cutoff: 'CSE rank ≤ 309 (home)', process: 'WBJEE counselling (state)' },
  { name: 'IIEST Shibpur', city: 'Howrah', state: 'West Bengal', type: 'Government', nirf: null, feesPerYear: '₹1.2–1.5 L', topBranches: ['CSE', 'ECE', 'Mechanical'], exam: 'JEE Main', cutoff: 'CSE AIR ≤ 12,000', process: 'JEE Main → JoSAA' },
  { name: 'Kalyani Govt Engineering College', city: 'Kalyani', state: 'West Bengal', type: 'Government', nirf: null, feesPerYear: '₹0.6–0.9 L', topBranches: ['CSE', 'IT', 'ECE'], exam: 'WBJEE', cutoff: 'CSE rank ≤ 4,000', process: 'WBJEE counselling' },
  { name: 'IIT Kharagpur', city: 'Kharagpur', state: 'West Bengal', type: 'IIT', nirf: 5, feesPerYear: '₹2.2–2.5 L', topBranches: ['CSE', 'EE', 'Mechanical'], exam: 'JEE Advanced', cutoff: 'CSE AIR ≤ 415', process: 'JEE Main → JEE Advanced → JoSAA' },
];
