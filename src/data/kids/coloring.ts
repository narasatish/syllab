/**
 * Kids Coloring Pages — original simple inline-SVG outlines (printable)
 * Each coloring page includes an SVG outline and metadata
 */

export interface ColoringPage {
  id: string;
  title: string;
  emoji: string;
  svg: string;
  description: string;
  ageGroup: string;
}

export const coloringPages: ColoringPage[] = [
  {
    id: 'star',
    title: 'Star',
    emoji: '⭐',
    description: 'A simple five-pointed star. Great for little hands!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <polygon points="100,20 130,80 190,80 150,120 170,180 100,140 30,180 50,120 10,80 70,80" />
    </svg>`,
  },
  {
    id: 'fish',
    title: 'Fish',
    emoji: '🐠',
    description: 'A cheerful little fish swimming. Good for learning oval shapes!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="100" cy="90" rx="50" ry="35" />
      <polygon points="150,90 190,70 190,110" />
      <circle cx="75" cy="80" r="6" />
      <path d="M 60 110 Q 50 120 40 115" />
    </svg>`,
  },
  {
    id: 'house',
    title: 'House',
    emoji: '🏠',
    description: 'A simple house with a door and window. Perfect for learning shapes!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <polygon points="100,30 30,90 30,190 170,190 170,90" />
      <rect x="50" y="100" width="30" height="30" />
      <rect x="120" y="100" width="30" height="30" />
      <polygon points="75,140 100,160 125,140" />
      <line x1="100" y1="140" x2="100" y2="160" />
      <rect x="80" y="160" width="40" height="30" />
    </svg>`,
  },
  {
    id: 'flower',
    title: 'Flower',
    emoji: '🌸',
    description: 'A beautiful flower with petals. Great for learning circles!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="100" cy="60" r="18" />
      <circle cx="140" cy="90" r="18" />
      <circle cx="140" cy="140" r="18" />
      <circle cx="100" cy="170" r="18" />
      <circle cx="60" cy="140" r="18" />
      <circle cx="60" cy="90" r="18" />
      <circle cx="100" cy="115" r="20" />
      <line x1="100" y1="135" x2="100" y2="220" strokeWidth="3" />
      <path d="M 85 180 Q 70 190 65 200" strokeWidth="2" />
      <path d="M 115 180 Q 130 190 135 200" strokeWidth="2" />
    </svg>`,
  },
  {
    id: 'car',
    title: 'Car',
    emoji: '🚗',
    description: 'A fun little car. Perfect for learning rectangles!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <rect x="40" y="70" width="140" height="50" rx="5" />
      <polygon points="50,70 70,30 150,30 170,70" />
      <circle cx="70" cy="120" r="15" />
      <circle cx="150" cy="120" r="15" />
      <rect x="85" y="40" width="25" height="25" />
      <rect x="115" y="40" width="25" height="25" />
    </svg>`,
  },
  {
    id: 'sun',
    title: 'Sun',
    emoji: '☀️',
    description: 'A warm and bright sun with rays. Great for learning lines!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="100" cy="100" r="35" />
      <line x1="100" y1="20" x2="100" y2="40" strokeWidth="3" />
      <line x1="100" y1="160" x2="100" y2="180" strokeWidth="3" />
      <line x1="20" y1="100" x2="40" y2="100" strokeWidth="3" />
      <line x1="160" y1="100" x2="180" y2="100" strokeWidth="3" />
      <line x1="35" y1="35" x2="50" y2="50" strokeWidth="3" />
      <line x1="150" y1="150" x2="165" y2="165" strokeWidth="3" />
      <line x1="165" y1="35" x2="150" y2="50" strokeWidth="3" />
      <line x1="50" y1="150" x2="35" y2="165" strokeWidth="3" />
    </svg>`,
  },
  {
    id: 'butterfly',
    title: 'Butterfly',
    emoji: '🦋',
    description: 'A pretty butterfly with symmetrical wings. Great for learning patterns!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="60" cy="60" rx="25" ry="35" />
      <ellipse cx="140" cy="60" rx="25" ry="35" />
      <ellipse cx="50" cy="130" rx="20" ry="30" />
      <ellipse cx="150" cy="130" rx="20" ry="30" />
      <line x1="100" y1="50" x2="100" y2="160" strokeWidth="3" />
      <circle cx="100" cy="50" r="5" />
      <path d="M 95 55 L 90 45" strokeWidth="2" />
      <path d="M 105 55 L 110 45" strokeWidth="2" />
    </svg>`,
  },
  {
    id: 'tree',
    title: 'Tree',
    emoji: '🌳',
    description: 'A happy tree with leaves and trunk. Great for outdoor scenes!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
      <polygon points="100,30 140,90 160,90 100,160 40,90 60,90" />
      <polygon points="100,60 130,100 150,100 100,150 50,100 70,100" />
      <rect x="85" y="150" width="30" height="70" />
      <circle cx="90" cy="35" r="6" />
      <circle cx="120" cy="65" r="5" />
      <circle cx="70" cy="80" r="5" />
    </svg>`,
  },
];
