/**
 * collegeEnrich.ts — HONEST derivations for the college detail page (client).
 * Mirror of scripts/collegeEnrich.mjs (keep the two in sync). Nothing here
 * invents per-college numbers: everything is derived from verified fields,
 * generically accurate for Indian engineering colleges, or an honest link-out.
 */
import type { CollegeFull } from './colleges';

const IS_NATIONAL = (t: string) => t === 'IIT' || t === 'NIT/IIIT';

export function ownershipLabel(type: string): string {
  switch (type) {
    case 'IIT': return 'Institute of National Importance — autonomous, Government-funded (an IIT)';
    case 'NIT/IIIT': return 'Institute of National Importance — autonomous, Government-funded (NIT/IIIT)';
    case 'Government': return 'Government / state-funded institution';
    case 'Private/Deemed': return 'Private / Deemed-to-be University';
    default: return type || '—';
  }
}

export function recognitionLabel(type: string): string {
  return IS_NATIONAL(type)
    ? 'Institute of National Importance (established by an Act of Parliament), under the Ministry of Education.'
    : 'AICTE-approved and affiliated to / recognised by the relevant state or technical university (verify current approvals with the college).';
}

export function eligibility(c: CollegeFull): string {
  const exam = c.exams?.[0] || 'the required entrance exam';
  return `Pass Class 12 (10+2) with Physics, Chemistry and Mathematics from a recognised board, and obtain a valid ${exam} score/rank. Minimum aggregate and reservation criteria vary — always check the official brochure for the current year.`;
}

export function coursesOffered(c: CollegeFull): string[] {
  const branches = (c.topBranches || []).slice(0, 8);
  const list: string[] = [];
  list.push(branches.length ? `B.Tech / B.E. — popular branches: ${branches.join(', ')}` : 'B.Tech / B.E. (undergraduate engineering)');
  if (IS_NATIONAL(c.type) || c.type === 'Government') {
    list.push('M.Tech / M.E. (postgraduate specialisations)');
    list.push('Ph.D. & research programmes');
  } else {
    list.push('Selected M.Tech / MBA / MCA programmes (varies by campus)');
  }
  return list;
}

export function documentsRequired(c: CollegeFull): string[] {
  const exam = c.exams?.[0] || 'entrance exam';
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

export function typicalFacilities(): string[] {
  return [
    'Central library & digital resources',
    'Computer centre & subject labs',
    'Wi-Fi-enabled campus',
    'Hostels for boys & girls',
    'Sports grounds & gymnasium',
    'Cafeteria / mess',
    'Medical / health centre',
    'Training & Placement cell',
  ];
}

export interface Scholarship { name: string; desc: string; url?: string }
export function scholarships(c: CollegeFull): Scholarship[] {
  const out: Scholarship[] = [
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

export interface NewsLink { label: string; url: string }
export function newsLinks(c: CollegeFull): NewsLink[] {
  const links: NewsLink[] = [
    { label: `Latest ${c.shortName || c.name} news (Google News)`, url: `https://news.google.com/search?q=${encodeURIComponent(c.name + ' admission')}` },
  ];
  if (c.website) links.push({ label: `Official website & notices (${c.website})`, url: `https://${c.website}` });
  if (IS_NATIONAL(c.type)) links.push({ label: 'JoSAA counselling (official)', url: 'https://josaa.nic.in' });
  return links;
}

// Derived peer comparison — real numbers only. Same type first, then same state.
export function comparisonSet(c: CollegeFull, all: CollegeFull[]): CollegeFull[] {
  const byRank = (a: CollegeFull, b: CollegeFull) => (a.nirf ?? Infinity) - (b.nirf ?? Infinity);
  let peers = all.filter((o) => o.slug !== c.slug && o.type === c.type);
  if (peers.length < 2) peers = all.filter((o) => o.slug !== c.slug && o.state === c.state);
  peers = peers.sort(byRank).slice(0, 4);
  return [c, ...peers].sort(byRank);
}

export function isGoodSummary(c: CollegeFull): string {
  const bits: string[] = [];
  if (c.nirf) bits.push(`ranked #${c.nirf} in India (NIRF Engineering 2025)`);
  else if (c.nirfBand) bits.push(`a place in the ${c.nirfBand} band of NIRF Engineering 2025`);
  if (c.placementAvg) bits.push(`an average package of about ${c.placementAvg}`);
  if (c.placementRate) bits.push(`a placement rate of around ${c.placementRate}`);
  const branches = (c.topBranches || []).slice(0, 3).join(', ') || 'engineering';
  return bits.length
    ? `${c.shortName || c.name} is a well-regarded choice — it has ${bits.join(', ')}. Whether it is "good for you" depends on your rank, budget and preferred branch (${branches}).`
    : `${c.shortName || c.name} is one of the engineering colleges in ${c.state}. Compare its fees, cutoff and placements to judge fit for your rank and budget.`;
}
