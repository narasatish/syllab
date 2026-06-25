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
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <polygon points="100,20 130,80 190,80 150,120 170,180 100,140 30,180 50,120 10,80 70,80" />
    </svg>`,
  },
  {
    id: 'fish',
    title: 'Fish',
    emoji: '🐠',
    description: 'A cheerful little fish swimming. Good for learning oval shapes!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
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
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
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
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <circle cx="100" cy="60" r="18" />
      <circle cx="140" cy="90" r="18" />
      <circle cx="140" cy="140" r="18" />
      <circle cx="100" cy="170" r="18" />
      <circle cx="60" cy="140" r="18" />
      <circle cx="60" cy="90" r="18" />
      <circle cx="100" cy="115" r="20" />
      <line x1="100" y1="135" x2="100" y2="220" stroke-width="3" />
      <path d="M 85 180 Q 70 190 65 200" stroke-width="2" />
      <path d="M 115 180 Q 130 190 135 200" stroke-width="2" />
    </svg>`,
  },
  {
    id: 'car',
    title: 'Car',
    emoji: '🚗',
    description: 'A fun little car. Perfect for learning rectangles!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
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
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <circle cx="100" cy="100" r="35" />
      <line x1="100" y1="20" x2="100" y2="40" stroke-width="3" />
      <line x1="100" y1="160" x2="100" y2="180" stroke-width="3" />
      <line x1="20" y1="100" x2="40" y2="100" stroke-width="3" />
      <line x1="160" y1="100" x2="180" y2="100" stroke-width="3" />
      <line x1="35" y1="35" x2="50" y2="50" stroke-width="3" />
      <line x1="150" y1="150" x2="165" y2="165" stroke-width="3" />
      <line x1="165" y1="35" x2="150" y2="50" stroke-width="3" />
      <line x1="50" y1="150" x2="35" y2="165" stroke-width="3" />
    </svg>`,
  },
  {
    id: 'butterfly',
    title: 'Butterfly',
    emoji: '🦋',
    description: 'A pretty butterfly with symmetrical wings. Great for learning patterns!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="60" cy="60" rx="25" ry="35" />
      <ellipse cx="140" cy="60" rx="25" ry="35" />
      <ellipse cx="50" cy="130" rx="20" ry="30" />
      <ellipse cx="150" cy="130" rx="20" ry="30" />
      <line x1="100" y1="50" x2="100" y2="160" stroke-width="3" />
      <circle cx="100" cy="50" r="5" />
      <path d="M 95 55 L 90 45" stroke-width="2" />
      <path d="M 105 55 L 110 45" stroke-width="2" />
    </svg>`,
  },
  {
    id: 'tree',
    title: 'Tree',
    emoji: '🌳',
    description: 'A happy tree with leaves and trunk. Great for outdoor scenes!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <polygon points="100,30 140,90 160,90 100,160 40,90 60,90" />
      <polygon points="100,60 130,100 150,100 100,150 50,100 70,100" />
      <rect x="85" y="150" width="30" height="70" />
      <circle cx="90" cy="35" r="6" />
      <circle cx="120" cy="65" r="5" />
      <circle cx="70" cy="80" r="5" />
    </svg>`,
  },
  {
    id: 'apple',
    title: 'Apple',
    emoji: '🍎',
    description: 'A round juicy apple with a leaf. Yummy to colour!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M100 60 C60 50 40 90 50 130 C58 165 90 175 100 160 C110 175 142 165 150 130 C160 90 140 50 100 60 Z" />
      <rect x="96" y="40" width="8" height="22" rx="3" />
      <path d="M104 50 Q130 40 135 60 Q115 66 104 56 Z" />
    </svg>`,
  },
  {
    id: 'heart',
    title: 'Heart',
    emoji: '❤️',
    description: 'A big love heart. Perfect for little hands!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M100 170 C20 110 40 40 100 80 C160 40 180 110 100 170 Z" />
    </svg>`,
  },
  {
    id: 'balloon',
    title: 'Balloon',
    emoji: '🎈',
    description: 'A floating party balloon with a string!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="80" rx="55" ry="65" />
      <polygon points="92,143 108,143 100,158" />
      <path d="M100 158 Q90 185 100 210" />
    </svg>`,
  },
  {
    id: 'kite',
    title: 'Kite',
    emoji: '🪁',
    description: 'A flying kite with a bow tail!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <polygon points="100,20 150,90 100,150 50,90" />
      <line x1="100" y1="20" x2="100" y2="150" />
      <line x1="50" y1="90" x2="150" y2="90" />
      <path d="M100 150 Q90 175 105 190 Q90 205 105 218" />
    </svg>`,
  },
  {
    id: 'cat',
    title: 'Cat',
    emoji: '🐱',
    description: 'A cute kitty face with whiskers!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <circle cx="100" cy="110" r="55" />
      <polygon points="55,75 70,30 92,62" />
      <polygon points="145,75 130,30 108,62" />
      <circle cx="82" cy="105" r="5" />
      <circle cx="118" cy="105" r="5" />
      <path d="M95 125 Q100 132 105 125" />
      <line x1="40" y1="120" x2="72" y2="124" />
      <line x1="160" y1="120" x2="128" y2="124" />
    </svg>`,
  },
  {
    id: 'duck',
    title: 'Duck',
    emoji: '🦆',
    description: 'A little duck swimming. Quack quack!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="95" cy="130" rx="60" ry="38" />
      <circle cx="140" cy="85" r="28" />
      <circle cx="148" cy="78" r="4" />
      <polygon points="165,88 190,82 165,98" />
      <path d="M60 120 Q45 135 55 150" />
    </svg>`,
  },
  {
    id: 'dog',
    title: 'Puppy',
    emoji: '🐶',
    description: 'A cute puppy — colour the ears, face and nose separately!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="110" rx="52" ry="48" />
      <path d="M55 70 Q35 60 38 105 Q55 100 62 82 Z" />
      <path d="M145 70 Q165 60 162 105 Q145 100 138 82 Z" />
      <circle cx="82" cy="100" r="7" />
      <circle cx="118" cy="100" r="7" />
      <ellipse cx="100" cy="122" rx="12" ry="9" />
      <path d="M100 131 Q100 145 88 148" />
      <path d="M100 131 Q100 145 112 148" />
    </svg>`,
  },
  {
    id: 'elephant',
    title: 'Elephant',
    emoji: '🐘',
    description: 'A friendly elephant — colour the body, ear and trunk!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="105" cy="100" rx="55" ry="50" />
      <path d="M70 70 Q40 75 55 120 Q75 110 80 85 Z" />
      <circle cx="92" cy="92" r="6" />
      <path d="M60 120 Q40 140 45 175 Q58 175 62 150 Q66 132 75 130 Z" />
      <rect x="95" y="145" width="16" height="28" rx="4" />
      <rect x="125" y="145" width="16" height="28" rx="4" />
    </svg>`,
  },
  {
    id: 'rabbit',
    title: 'Bunny',
    emoji: '🐰',
    description: 'A hoppy bunny — colour the ears, face and cheeks!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="120" rx="42" ry="45" />
      <ellipse cx="80" cy="55" rx="13" ry="38" />
      <ellipse cx="120" cy="55" rx="13" ry="38" />
      <circle cx="86" cy="112" r="6" />
      <circle cx="114" cy="112" r="6" />
      <ellipse cx="100" cy="128" rx="7" ry="5" />
      <path d="M100 133 Q100 145 90 146" />
      <path d="M100 133 Q100 145 110 146" />
    </svg>`,
  },
  {
    id: 'owl',
    title: 'Owl',
    emoji: '🦉',
    description: 'A wise owl — colour the body, big eyes and wings!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="110" rx="48" ry="58" />
      <circle cx="82" cy="90" r="18" />
      <circle cx="118" cy="90" r="18" />
      <circle cx="82" cy="90" r="6" />
      <circle cx="118" cy="90" r="6" />
      <polygon points="100,100 92,112 108,112" />
      <path d="M58 100 Q45 130 62 158 Q70 140 70 118 Z" />
      <path d="M142 100 Q155 130 138 158 Q130 140 130 118 Z" />
    </svg>`,
  },
  {
    id: 'lion',
    title: 'Lion',
    emoji: '🦁',
    description: 'A brave lion — colour the mane and face!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M100 25 L118 48 L146 42 L142 70 L168 82 L146 100 L160 126 L130 124 L120 152 L100 138 L80 152 L70 124 L40 126 L54 100 L32 82 L58 70 L54 42 L82 48 Z" />
      <circle cx="100" cy="100" r="42" />
      <circle cx="86" cy="95" r="6" />
      <circle cx="114" cy="95" r="6" />
      <polygon points="100,105 92,116 108,116" />
      <path d="M100 116 Q100 128 90 128" />
      <path d="M100 116 Q100 128 110 128" />
    </svg>`,
  },
  {
    id: 'frog',
    title: 'Frog',
    emoji: '🐸',
    description: 'A jumpy frog — colour the body, eyes and legs!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="120" rx="55" ry="42" />
      <circle cx="78" cy="78" r="20" />
      <circle cx="122" cy="78" r="20" />
      <circle cx="78" cy="80" r="7" />
      <circle cx="122" cy="80" r="7" />
      <path d="M85 130 Q100 142 115 130" />
      <ellipse cx="55" cy="158" rx="18" ry="10" />
      <ellipse cx="145" cy="158" rx="18" ry="10" />
    </svg>`,
  },
  {
    id: 'butterfly2',
    title: 'Butterfly',
    emoji: '🦋',
    description: 'Colour each wing a different colour!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="100" rx="6" ry="55" />
      <path d="M96 70 Q40 40 50 80 Q40 110 96 96 Z" />
      <path d="M104 70 Q160 40 150 80 Q160 110 104 96 Z" />
      <path d="M96 104 Q50 110 55 145 Q80 150 96 122 Z" />
      <path d="M104 104 Q150 110 145 145 Q120 150 104 122 Z" />
      <path d="M100 48 Q90 30 80 28" />
      <path d="M100 48 Q110 30 120 28" />
    </svg>`,
  },
  {
    id: 'bee',
    title: 'Bee',
    emoji: '🐝',
    description: 'A buzzy bee — colour the stripes and wings!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="115" rx="42" ry="32" />
      <path d="M88 88 L88 142" /><path d="M104 86 L104 144" /><path d="M120 92 L120 138" />
      <circle cx="70" cy="95" r="16" />
      <circle cx="66" cy="92" r="4" />
      <path d="M118 95 Q150 70 158 95 Q150 110 122 105 Z" />
      <path d="M118 120 Q150 130 152 110" />
    </svg>`,
  },
  {
    id: 'ladybug',
    title: 'Ladybug',
    emoji: '🐞',
    description: 'A spotty ladybug — colour the wings and dots!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="110" rx="55" ry="50" />
      <circle cx="100" cy="58" r="20" />
      <line x1="100" y1="62" x2="100" y2="160" />
      <circle cx="78" cy="100" r="8" /><circle cx="122" cy="100" r="8" />
      <circle cx="72" cy="130" r="8" /><circle cx="128" cy="130" r="8" />
    </svg>`,
  },
  {
    id: 'penguin',
    title: 'Penguin',
    emoji: '🐧',
    description: 'A chilly penguin — colour the body, tummy and feet!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="100" cy="105" rx="40" ry="58" />
      <ellipse cx="100" cy="115" rx="24" ry="42" />
      <circle cx="90" cy="78" r="5" /><circle cx="110" cy="78" r="5" />
      <polygon points="100,86 92,96 108,96" />
      <ellipse cx="82" cy="165" rx="14" ry="7" /><ellipse cx="118" cy="165" rx="14" ry="7" />
    </svg>`,
  },
  {
    id: 'snail',
    title: 'Snail',
    emoji: '🐌',
    description: 'A slow snail — colour the swirly shell!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M40 150 Q40 130 70 130 L150 130 Q170 130 170 150 Z" />
      <circle cx="110" cy="100" r="40" />
      <circle cx="110" cy="100" r="24" />
      <circle cx="110" cy="100" r="10" />
      <path d="M150 110 Q175 105 172 80" /><path d="M160 95 Q180 90 178 72" />
    </svg>`,
  },
  {
    id: 'mouse',
    title: 'Mouse',
    emoji: '🐭',
    description: 'A tiny mouse — colour the ears and body!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <ellipse cx="95" cy="120" rx="48" ry="38" />
      <circle cx="70" cy="80" r="22" /><circle cx="120" cy="80" r="22" />
      <circle cx="62" cy="118" r="6" />
      <circle cx="56" cy="120" r="3" />
      <path d="M140 130 Q175 135 172 165" />
    </svg>`,
  },
  {
    id: 'snowman',
    title: 'Snowman',
    emoji: '⛄',
    description: 'A jolly snowman — colour the hat, scarf and buttons!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <circle cx="100" cy="155" r="42" />
      <circle cx="100" cy="95" r="30" />
      <rect x="78" y="38" width="44" height="26" /><rect x="70" y="62" width="60" height="6" />
      <circle cx="92" cy="90" r="3" /><circle cx="108" cy="90" r="3" />
      <polygon points="100,98 118,102 100,106" />
      <circle cx="100" cy="140" r="4" /><circle cx="100" cy="160" r="4" />
    </svg>`,
  },
  {
    id: 'icecream',
    title: 'Ice Cream',
    emoji: '🍦',
    description: 'A yummy ice cream — colour each scoop!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <polygon points="80,120 120,120 100,200" />
      <circle cx="100" cy="100" r="26" />
      <circle cx="82" cy="78" r="22" /><circle cx="118" cy="78" r="22" />
      <circle cx="100" cy="58" r="20" />
    </svg>`,
  },
  {
    id: 'boat',
    title: 'Sailboat',
    emoji: '⛵',
    description: 'A sailing boat — colour the sails and hull!',
    ageGroup: 'LKG',
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M40 150 L160 150 L140 180 L60 180 Z" />
      <line x1="100" y1="30" x2="100" y2="150" />
      <path d="M100 40 L150 130 L100 130 Z" />
      <path d="M92 50 L50 130 L92 130 Z" />
      <path d="M30 165 Q45 175 60 165 Q75 175 90 165" />
    </svg>`,
  },
  {
    id: 'rainbow',
    title: 'Rainbow',
    emoji: '🌈',
    description: 'Colour each arc of the rainbow!',
    ageGroup: 'Pre-KG',
    svg: `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="3" stroke-linecap="round">
      <path d="M30 140 Q100 40 170 140" />
      <path d="M50 140 Q100 65 150 140" />
      <path d="M70 140 Q100 90 130 140" />
      <circle cx="30" cy="155" r="4" /><circle cx="55" cy="155" r="4" /><circle cx="80" cy="155" r="4" /><circle cx="105" cy="155" r="4" /><circle cx="130" cy="155" r="4" /><circle cx="155" cy="155" r="4" /><circle cx="170" cy="155" r="4" />
    </svg>`,
  },
  {
    id: 'rocket',
    title: 'Rocket',
    emoji: '🚀',
    description: 'Colour the rocket and flames!',
    ageGroup: 'UKG',
    svg: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round">
      <polygon points="100,20 130,60 70,60" />
      <rect x="70" y="60" width="60" height="90" rx="8" />
      <circle cx="100" cy="100" r="20" />
      <polygon points="70,150 50,200 65,160 Z" />
      <polygon points="130,150 150,200 135,160 Z" />
      <path d="M55 200 Q50 220 60 240" />
      <path d="M145 200 Q150 220 140 240" />
    </svg>`,
  },
];
