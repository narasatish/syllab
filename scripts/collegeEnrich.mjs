/**
 * collegeEnrich.mjs — pure, HONEST derivations for the college detail pages.
 *
 * IMPORTANT: nothing here invents per-college numbers. Everything is either
 * (a) derived from the verified directory fields, (b) genuinely generic-and-
 * accurate for Indian engineering colleges (documents, typical facilities,
 * national scholarship schemes), or (c) an honest live link-out (Google News,
 * the official site, JoSAA). All figures already carry an "indicative" note.
 *
 * The TS mirror used by the React client lives in src/data/collegeEnrich.ts —
 * keep the two in sync.
 */

const IS_NATIONAL = (t) => t === 'IIT' || t === 'NIT/IIIT';

export function ownershipLabel(type) {
  switch (type) {
    case 'IIT': return 'Institute of National Importance — autonomous, Government-funded (an IIT)';
    case 'NIT/IIIT': return 'Institute of National Importance — autonomous, Government-funded (NIT/IIIT)';
    case 'Government': return 'Government / state-funded institution';
    case 'Private/Deemed': return 'Private / Deemed-to-be University';
    default: return type || '—';
  }
}

export function recognitionLabel(type) {
  return IS_NATIONAL(type)
    ? 'Institute of National Importance (established by an Act of Parliament), under the Ministry of Education.'
    : 'AICTE-approved and affiliated to / recognised by the relevant state or technical university (verify current approvals with the college).';
}

export function eligibility(c) {
  const exam = (c.exams && c.exams[0]) || 'the required entrance exam';
  return `Pass Class 12 (10+2) with Physics, Chemistry and Mathematics from a recognised board, and obtain a valid ${exam} score/rank. Minimum aggregate and reservation criteria vary — always check the official brochure for the current year.`;
}

export function coursesOffered(c) {
  const branches = (c.topBranches || []).slice(0, 8);
  const list = [];
  if (branches.length) list.push(`B.Tech / B.E. — popular branches: ${branches.join(', ')}`);
  else list.push('B.Tech / B.E. (undergraduate engineering)');
  if (IS_NATIONAL(c.type) || c.type === 'Government') {
    list.push('M.Tech / M.E. (postgraduate specialisations)');
    list.push('Ph.D. & research programmes');
  } else {
    list.push('Selected M.Tech / MBA / MCA programmes (varies by campus)');
  }
  return list;
}

export function documentsRequired(c) {
  const exam = (c.exams && c.exams[0]) || 'entrance exam';
  return [
    'Class 10 & Class 12 marksheets and passing certificates',
    `${exam} scorecard / rank card (admit card)`,
    'Seat allotment letter from the counselling authority',
    'Transfer Certificate (TC) & Migration Certificate',
    'Category certificate (SC/ST/OBC-NCL/EWS), if applicable',
    'Person-with-Disability (PwD) certificate, if applicable',
    'Passport-size photographs and a government photo ID (Aadhaar/PAN)',
  ];
}

export function typicalFacilities() {
  return [
    'Central library & digital learning resources',
    'Computer centre & subject laboratories',
    'Wi-Fi-enabled campus',
    'Separate hostels for boys & girls',
    'Sports grounds & gymnasium',
    'Cafeteria / mess',
    'Medical / health centre',
    'Training & Placement cell',
  ];
}

export function scholarships(c) {
  const out = [
    { name: 'National Scholarship Portal (NSP)', desc: 'Central & state government scholarships for eligible students (merit, income and category based).', url: 'https://scholarships.gov.in' },
    { name: 'Category fee concessions', desc: 'Tuition-fee waivers / concessions for SC, ST, OBC-NCL and EWS students as per government norms.' },
  ];
  if (IS_NATIONAL(c.type)) {
    out.push({ name: 'Merit-cum-Means (MCM) & tuition waiver', desc: 'IIT/NIT students from lower-income families can get full or partial tuition-fee remission and MCM scholarships.' });
  } else {
    out.push({ name: 'Institute & state merit scholarships', desc: 'Merit scholarships and state-government schemes (e.g. post-matric) that many students here are eligible for.' });
  }
  return out;
}

// Honest, always-current external links. No fabricated news copy.
export function newsLinks(c) {
  const links = [
    { label: `Latest ${c.shortName} news (Google News)`, url: `https://news.google.com/search?q=${encodeURIComponent(c.name + ' admission')}` },
  ];
  if (c.website) links.push({ label: `Official website & notices (${c.website})`, url: `https://${c.website}` });
  if (IS_NATIONAL(c.type)) links.push({ label: 'JoSAA counselling (official)', url: 'https://josaa.nic.in' });
  return links;
}

// Derived peer comparison — real numbers only. Same type first, then same state.
// Returns [self + up to 4 peers], sorted by NIRF (ranked first).
export function comparisonSet(c, all) {
  const byRank = (a, b) => {
    const ra = a.nirf == null ? Infinity : a.nirf;
    const rb = b.nirf == null ? Infinity : b.nirf;
    return ra - rb;
  };
  let peers = all.filter((o) => o.slug !== c.slug && o.type === c.type);
  if (peers.length < 2) peers = all.filter((o) => o.slug !== c.slug && o.stateName === c.stateName);
  peers = peers.sort(byRank).slice(0, 4);
  return [c, ...peers].sort(byRank);
}
