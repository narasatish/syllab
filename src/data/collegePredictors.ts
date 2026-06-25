/**
 * College-predictor landing data — SEO entry pages for high-intent searches like
 * "JEE Main college predictor", "NEET college predictor by rank". These pages
 * explain the predictor and funnel users into the existing Career & College
 * Predictor tool (the actual prediction runs there). All content original; every
 * prediction is clearly framed as INDICATIVE.
 */
export interface CollegePredictor {
  slug: string;
  exam: string;        // short name, e.g. "JEE Main"
  fullName: string;    // e.g. "JEE Main (Joint Entrance Examination Main)"
  emoji: string;
  predicts: string;    // what colleges it predicts
  intro: string;
  inputs: string[];    // what the student enters
  howItWorks: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
}

const D = 'Predictions are indicative estimates based on previous-year trends and can change every year with difficulty, applicants and seat matrix. Always confirm on the official counselling website before any decision.';

export const COLLEGE_PREDICTORS: CollegePredictor[] = [
  {
    slug: 'jee-main', exam: 'JEE Main', fullName: 'JEE Main (Joint Entrance Examination – Main)', emoji: '🎓',
    predicts: 'NITs, IIITs and GFTIs (and a JEE Advanced cut-off check for IITs)',
    intro: 'Enter your JEE Main rank or percentile and the predictor estimates the NITs, IIITs and GFTIs you can realistically target through JoSAA/CSAB counselling — branch-wise, with your category and home-state quota factored in.',
    inputs: ['JEE Main rank or percentile', 'Category (General/EWS/OBC-NCL/SC/ST)', 'Home state (for state quota)', 'Gender (for the female supernumerary quota)'],
    howItWorks: ['Convert your percentile to an estimated All-India Rank.', 'Match your rank against previous-year JoSAA closing ranks.', 'Filter by category, home-state quota and preferred branches.', 'See a realistic list of reach / match / safe colleges.'],
    tips: ['Fill JoSAA choices generously — list reach, match and safe options in order of genuine preference.', 'Home-state quota in NITs can sharply improve your chances — always select it correctly.', 'CSAB special rounds open extra seats after JoSAA — keep tracking them.'],
    faqs: [
      { q: 'Is the JEE Main college predictor free?', a: 'Yes — it is completely free on Syllab.in, no sign-up needed.' },
      { q: 'Does it predict IITs?', a: 'IITs admit through JEE Advanced, not JEE Main. The tool gives a JEE Advanced cut-off check separately; JEE Main predictions cover NITs, IIITs and GFTIs.' },
      { q: 'How accurate is it?', a: 'It is an indicative estimate from previous-year JoSAA data. Real closing ranks change yearly — verify on josaa.nic.in.' },
    ],
  },
  {
    slug: 'neet', exam: 'NEET', fullName: 'NEET UG (National Eligibility cum Entrance Test)', emoji: '🩺',
    predicts: 'Government & private MBBS and BDS colleges (All-India + state quota)',
    intro: 'Enter your NEET score or rank and get a realistic list of MBBS/BDS colleges you can target through the 15% All-India Quota and your state counselling — with category and quota factored in.',
    inputs: ['NEET score or All-India Rank', 'Category (General/EWS/OBC/SC/ST)', 'State (for 85% state quota)', 'Preference: government vs private'],
    howItWorks: ['Map your NEET score to an estimated All-India Rank.', 'Compare against previous-year MCC (AIQ) and state closing ranks.', 'Filter by category, state quota and government/private preference.', 'See likely MBBS/BDS colleges by realistic chance.'],
    tips: ['Apply for BOTH the 15% All-India Quota (MCC) and your 85% state quota — they are separate counsellings.', 'Government college fees are far lower — prioritise them in your choice list.', 'Lock realistic preferences early; upper-round seat movement is unpredictable.'],
    faqs: [
      { q: 'Is the NEET college predictor free?', a: 'Yes — 100% free on Syllab.in with no sign-up.' },
      { q: 'Does it cover both AIQ and state quota?', a: 'Yes — it gives an indicative view for the All-India Quota and your state quota colleges.' },
      { q: 'Can it guarantee a seat?', a: 'No. It is an indicative estimate. Final allotment depends on MCC/state counselling — verify on mcc.nic.in and your state portal.' },
    ],
  },
  {
    slug: 'ts-eapcet', exam: 'TS EAPCET', fullName: 'TS EAPCET / TG EAPCET (Telangana Engineering, Agriculture & Pharmacy CET)', emoji: '🏙️',
    predicts: 'Engineering colleges in Telangana (JNTUH, CBIT, Vasavi, VNR and more)',
    intro: 'Enter your TS EAPCET rank and the predictor estimates the Telangana engineering colleges and branches you can target through TGCHE counselling — with category and local-area reservation in mind.',
    inputs: ['TS EAPCET rank', 'Category (OC/BC/SC/ST/EWS)', 'Local area (OU/AU/SVU region)', 'Preferred branch (CSE, ECE, etc.)'],
    howItWorks: ['Match your rank against previous-year TS EAPCET closing ranks.', 'Apply category and local-area reservation.', 'Filter by branch and college preference.', 'See realistic college options by chance.'],
    tips: ['Local-area (region) reservation matters a lot in TS counselling — select it accurately.', 'CSE and its variants close fastest; keep core-branch backups in good colleges.', 'List a wide spread of colleges in web options to avoid missing a seat.'],
    faqs: [
      { q: 'Is the TS EAPCET predictor free?', a: 'Yes — free on Syllab.in, no sign-up.' },
      { q: 'Does it include private colleges?', a: 'Yes — it covers government and private engineering colleges that admit through TS EAPCET counselling.' },
      { q: 'How accurate are the ranks?', a: 'Indicative, from previous-year trends. Confirm on the official TGCHE / TS EAPCET counselling site.' },
    ],
  },
  {
    slug: 'ap-eapcet', exam: 'AP EAPCET', fullName: 'AP EAPCET (Andhra Pradesh Engineering, Agriculture & Pharmacy CET)', emoji: '🌾',
    predicts: 'Engineering colleges in Andhra Pradesh (Andhra University, JNTU-K, SVU & more)',
    intro: 'Enter your AP EAPCET rank to estimate the Andhra Pradesh engineering colleges and branches you can target through APSCHE counselling, with category and region factored in.',
    inputs: ['AP EAPCET rank', 'Category (OC/BC/SC/ST/EWS)', 'Local region (AU/SVU)', 'Preferred branch'],
    howItWorks: ['Match your rank to previous-year AP EAPCET closing ranks.', 'Apply category and regional reservation.', 'Filter by branch and preference.', 'See realistic college options.'],
    tips: ['Pick the right local region — it affects priority in many colleges.', 'Keep a healthy mix of reach and safe colleges in your web options.', 'Government colleges offer lower fees — rank them higher if cost matters.'],
    faqs: [
      { q: 'Is the AP EAPCET predictor free?', a: 'Yes — free on Syllab.in.' },
      { q: 'Does it cover all AP engineering colleges?', a: 'It covers major government and private colleges admitting through AP EAPCET counselling.' },
      { q: 'Are the predictions guaranteed?', a: 'No — indicative only. Verify on the official APSCHE counselling website.' },
    ],
  },
  {
    slug: 'kcet', exam: 'KCET', fullName: 'KCET (Karnataka Common Entrance Test)', emoji: '🌳',
    predicts: 'Engineering colleges in Karnataka (RVCE, BMSCE, PES, MSRIT & more)',
    intro: 'Enter your KCET rank to estimate the Karnataka engineering colleges and branches you can target through KEA counselling, with category factored in.',
    inputs: ['KCET rank', 'Category (GM/2A/2B/3A/3B/SC/ST)', 'Preferred branch', 'College preference'],
    howItWorks: ['Match your rank to previous-year KCET closing ranks.', 'Apply category reservation.', 'Filter by branch and college.', 'See realistic options by chance.'],
    tips: ['Bengaluru CSE seats close very early — keep strong backups.', 'KEA mock allotment is a great reality check before final choices.', 'Order choices by genuine preference; allotment follows your priority list.'],
    faqs: [
      { q: 'Is the KCET predictor free?', a: 'Yes — free on Syllab.in.' },
      { q: 'Does COMEDK use the same ranks?', a: 'No — COMEDK is a separate exam/counselling. This predictor uses KCET (KEA) ranks.' },
      { q: 'How reliable is it?', a: 'Indicative, from previous-year trends — confirm on the official KEA site.' },
    ],
  },
  {
    slug: 'mht-cet', exam: 'MHT-CET', fullName: 'MHT-CET (Maharashtra Common Entrance Test)', emoji: '🌊',
    predicts: 'Engineering colleges in Maharashtra (COEP, VJTI, ICT, SPIT & more)',
    intro: 'Enter your MHT-CET percentile to estimate the Maharashtra engineering colleges and branches you can target through the CAP rounds, with category and quotas factored in.',
    inputs: ['MHT-CET percentile', 'Category (Open/OBC/SC/ST/EWS)', 'Home university region', 'Preferred branch'],
    howItWorks: ['Match your percentile to previous-year CAP closing percentiles.', 'Apply category and home-university quota.', 'Filter by branch and college.', 'See realistic options.'],
    tips: ['Home-University seats give an edge — choose your region correctly.', 'Fill all three CAP rounds; seat movement happens between rounds.', 'COEP/VJTI/ICT top branches close very high — plan strong backups.'],
    faqs: [
      { q: 'Is the MHT-CET predictor free?', a: 'Yes — free on Syllab.in.' },
      { q: 'Percentile or marks?', a: 'MHT-CET admission uses percentile — enter your percentile for the best estimate.' },
      { q: 'Is it guaranteed?', a: 'No — indicative only. Confirm on the official Maharashtra CET Cell site.' },
    ],
  },
  {
    slug: 'wbjee', exam: 'WBJEE', fullName: 'WBJEE (West Bengal Joint Entrance Examination)', emoji: '🌉',
    predicts: 'Engineering colleges in West Bengal (Jadavpur University, IIEST & more)',
    intro: 'Enter your WBJEE rank to estimate the West Bengal engineering colleges and branches you can target through WBJEEB counselling, with category and quota factored in.',
    inputs: ['WBJEE rank', 'Category (General/OBC-A/OBC-B/SC/ST)', 'Home state (for state quota)', 'Preferred branch'],
    howItWorks: ['Match your rank to previous-year WBJEE closing ranks.', 'Apply category and domicile quota.', 'Filter by branch and college.', 'See realistic options.'],
    tips: ['Jadavpur University CSE closes very high — keep IIEST/government backups.', 'Domicile status affects seat availability — fill it correctly.', 'Use all counselling rounds; upgrades are common.'],
    faqs: [
      { q: 'Is the WBJEE predictor free?', a: 'Yes — free on Syllab.in.' },
      { q: 'Does it cover Jadavpur University?', a: 'Yes — it covers JU, IIEST and other colleges admitting through WBJEE counselling.' },
      { q: 'How accurate?', a: 'Indicative, from previous-year data. Verify on the official WBJEEB site.' },
    ],
  },
  {
    slug: 'bitsat', exam: 'BITSAT', fullName: 'BITSAT (BITS Admission Test)', emoji: '🎯',
    predicts: 'BITS Pilani, Goa and Hyderabad campuses (branch-wise by score)',
    intro: 'Enter your BITSAT score to estimate the BITS campus and branch you can target, using previous-year cut-off trends across Pilani, Goa and Hyderabad.',
    inputs: ['BITSAT score (out of 390)', 'Preferred campus (Pilani/Goa/Hyderabad)', 'Preferred branch', 'First vs second iteration preference'],
    howItWorks: ['Compare your score against previous-year BITS cut-offs.', 'Filter by campus and branch.', 'See realistic campus + branch options.', 'Plan iterations for upgrades.'],
    tips: ['BITS cut-offs are score-based (not rank) — every mark counts.', 'Pilani CSE has the highest cut-off; Goa/Hyderabad CSE are strong alternatives.', 'Apply early in each iteration to maximise upgrade chances.'],
    faqs: [
      { q: 'Is the BITSAT predictor free?', a: 'Yes — free on Syllab.in.' },
      { q: 'Is BITSAT rank-based?', a: 'No — BITS admits by BITSAT score against campus/branch cut-offs.' },
      { q: 'Guaranteed admission?', a: 'No — indicative only. Confirm on the official BITS admission portal.' },
    ],
  },
];

export const PREDICTOR_DISCLAIMER = D;
export function getCollegePredictor(slug: string): CollegePredictor | undefined {
  return COLLEGE_PREDICTORS.find((p) => p.slug === slug);
}
