/**
 * timelines.ts — interactive History timelines (scrollable, tap-to-expand).
 * Pure-data array (no helper calls) so scripts/studyClusters.mjs can read slugs
 * for the sitemap/prerender. Rendered by components/HistoryTimeline.tsx.
 */
export interface TimelineEvent { year: string; title: string; detail: string; }
export interface HistoryTimeline {
  slug: string;
  title: string;
  subject: string;
  classLevel: string;
  intro: string;
  whyItMatters: string;
  events: TimelineEvent[];
}

export const TIMELINES: HistoryTimeline[] = [
  {
    slug: 'indian-freedom-struggle',
    title: 'The Indian Freedom Struggle (1857–1947)',
    subject: 'History',
    classLevel: 'Class 8–10',
    intro: 'Scroll through the key milestones of India’s fight for independence, from the Revolt of 1857 to freedom in 1947.',
    whyItMatters: 'Dates and the sequence of the freedom movement are among the most frequently asked questions in History board exams and competitive tests.',
    events: [
      { year: '1857', title: 'The First War of Independence', detail: 'A massive revolt against the British East India Company began at Meerut, spreading across north and central India. Though suppressed, it ended Company rule — the British Crown took direct control in 1858.' },
      { year: '1885', title: 'Indian National Congress founded', detail: 'The INC was formed, giving Indians an organised political platform. A.O. Hume helped found it; early leaders included Dadabhai Naoroji and Surendranath Banerjee.' },
      { year: '1905', title: 'Partition of Bengal & Swadeshi Movement', detail: 'Lord Curzon partitioned Bengal, sparking the Swadeshi movement — a boycott of British goods and promotion of Indian-made products.' },
      { year: '1919', title: 'Jallianwala Bagh Massacre', detail: 'British troops under General Dyer fired on a peaceful gathering in Amritsar, killing hundreds. It turned millions against British rule and pushed Gandhi towards mass non-cooperation.' },
      { year: '1920', title: 'Non-Cooperation Movement', detail: 'Mahatma Gandhi launched a nationwide non-violent movement — boycotting schools, courts, titles and foreign goods. It was called off in 1922 after the Chauri Chaura incident.' },
      { year: '1930', title: 'Dandi Salt March & Civil Disobedience', detail: 'Gandhi walked ~240 miles to Dandi to make salt, defying the British salt law. It triggered the Civil Disobedience Movement across the country.' },
      { year: '1942', title: 'Quit India Movement', detail: 'The Congress demanded an end to British rule with the slogan “Do or Die”. Mass protests followed and most leaders were arrested.' },
      { year: '1947', title: 'Independence', detail: 'On 15 August 1947 India became independent. The country was partitioned into India and Pakistan; Jawaharlal Nehru became the first Prime Minister.' },
    ],
  },
  {
    slug: 'mughal-empire',
    title: 'The Mughal Empire (1526–1857)',
    subject: 'History',
    classLevel: 'Class 7–10',
    intro: 'Meet the great Mughal emperors in order and see how the empire rose, peaked and declined.',
    whyItMatters: 'The sequence of Mughal rulers and their key contributions are core to medieval Indian history questions.',
    events: [
      { year: '1526', title: 'Babur founds the empire', detail: 'Babur defeated Ibrahim Lodi at the First Battle of Panipat using cannons and tactics, founding the Mughal Empire in India.' },
      { year: '1530', title: 'Humayun', detail: 'Babur’s son Humayun lost the empire to Sher Shah Suri, spent years in exile, and recovered it shortly before his death in 1556.' },
      { year: '1556', title: 'Akbar the Great', detail: 'Akbar expanded the empire greatly, introduced the Mansabdari system and the policy of religious tolerance (Sulh-i-Kul), and abolished the jizya tax.' },
      { year: '1605', title: 'Jahangir', detail: 'Known for justice and patronage of art and painting. The English East India Company gained early trading rights during his reign.' },
      { year: '1628', title: 'Shah Jahan', detail: 'The golden age of Mughal architecture — he built the Taj Mahal, the Red Fort and Jama Masjid.' },
      { year: '1658', title: 'Aurangzeb', detail: 'Expanded the empire to its largest size but his long wars and policies strained it. The decline began after his death in 1707.' },
      { year: '1857', title: 'End of the empire', detail: 'After the Revolt of 1857, the British exiled the last emperor Bahadur Shah Zafar, formally ending Mughal rule.' },
    ],
  },
  {
    slug: 'major-events-indian-history',
    title: 'Major Events in Indian History (Ancient to Modern)',
    subject: 'History',
    classLevel: 'Class 6–10',
    intro: 'A big-picture timeline of Indian history — from the Indus Valley Civilisation to the Republic of India.',
    whyItMatters: 'A mental timeline of major periods helps you place every chapter, ruler and event in the right order — invaluable for History exams.',
    events: [
      { year: 'c. 2500 BCE', title: 'Indus Valley Civilisation', detail: 'One of the world’s earliest urban civilisations, with planned cities like Harappa and Mohenjo-daro, drainage systems and trade.' },
      { year: 'c. 1500 BCE', title: 'Vedic Age', detail: 'The Vedas were composed; early Aryan society, the caste system and important religious texts took shape.' },
      { year: '321 BCE', title: 'Mauryan Empire', detail: 'Chandragupta Maurya founded the empire; his grandson Ashoka spread Buddhism after the Kalinga war.' },
      { year: '320 CE', title: 'Gupta Empire — the Golden Age', detail: 'Great progress in maths (zero, decimals), astronomy (Aryabhata), art and literature (Kalidasa).' },
      { year: '1206 CE', title: 'Delhi Sultanate', detail: 'A series of Muslim dynasties ruled from Delhi for ~320 years, introducing new architecture and administration.' },
      { year: '1526 CE', title: 'Mughal Empire', detail: 'Babur founded the Mughal Empire, which became one of the richest and most powerful empires of its time.' },
      { year: '1757 CE', title: 'British rule begins', detail: 'After the Battle of Plassey, the British East India Company gained control over Bengal, expanding across India.' },
      { year: '1947 CE', title: 'Independence', detail: 'India won freedom from British rule and became a sovereign nation.' },
      { year: '1950 CE', title: 'Republic of India', detail: 'The Constitution of India came into force on 26 January 1950, making India a republic.' },
    ],
  },
];

export function getTimeline(slug: string): HistoryTimeline | undefined {
  return TIMELINES.find((t) => t.slug === slug);
}
