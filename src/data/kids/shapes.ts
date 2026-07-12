/**
 * Kids Shapes & Colors data — basic shapes with colors for Pre-KG to Class 1
 */

export interface ShapeTile {
  name: string;
  emoji: string;
  color: string;
  colorName: string;
  colorClass: string;
  description: string;
}

export const shapeTiles: ShapeTile[] = [
  {
    name: 'Circle',
    emoji: '⭕',
    color: '#FCD34D',
    colorName: 'Yellow',
    colorClass: 'bg-yellow-400',
    description: 'Round and perfect, like a ball!',
  },
  {
    name: 'Square',
    emoji: '⬜',
    color: '#F87171',
    colorName: 'Red',
    colorClass: 'bg-red-400',
    description: 'Four equal sides, like a box!',
  },
  {
    name: 'Triangle',
    emoji: '🔺',
    color: '#34D399',
    colorName: 'Green',
    colorClass: 'bg-emerald-400',
    description: 'Three sides, like a mountain!',
  },
  {
    name: 'Rectangle',
    emoji: '▭',
    color: '#60A5FA',
    colorName: 'Blue',
    colorClass: 'bg-blue-400',
    description: 'Longer than a square!',
  },
  {
    name: 'Star',
    emoji: '⭐',
    color: '#FBBF24',
    colorName: 'Orange',
    colorClass: 'bg-amber-400',
    description: 'Twinkly and pointy!',
  },
  {
    name: 'Heart',
    emoji: '❤️',
    color: '#FB7185',
    colorName: 'Pink',
    colorClass: 'bg-pink-400',
    description: 'Full of love!',
  },
  {
    name: 'Diamond',
    emoji: '💎',
    color: '#A78BFA',
    colorName: 'Purple',
    colorClass: 'bg-purple-400',
    description: 'Shiny and sparkly!',
  },
  {
    name: 'Oval',
    emoji: '🥚',
    color: '#D4D4D8',
    colorName: 'Gray',
    colorClass: 'bg-gray-400',
    description: 'Stretched circle, like an egg!',
  },
  {
    name: 'Pentagon',
    emoji: '⬟',
    color: '#EC4899',
    colorName: 'Magenta',
    colorClass: 'bg-fuchsia-500',
    description: 'Five sides and angles!',
  },
  {
    name: 'Hexagon',
    emoji: '⬡',
    color: '#10B981',
    colorName: 'Teal',
    colorClass: 'bg-teal-500',
    description: 'Six sides, like a honeycomb!',
  },
  {
    name: 'Octagon',
    emoji: '🛑',
    color: '#EF4444',
    colorName: 'Crimson',
    colorClass: 'bg-red-500',
    description: 'Eight equal sides, like a stop sign!',
  },
  {
    name: 'Moon',
    emoji: '🌙',
    color: '#FDE047',
    colorName: 'Pale Yellow',
    colorClass: 'bg-yellow-300',
    description: 'Curved and dreamy!',
  },
  {
    name: 'Cloud',
    emoji: '☁️',
    color: '#E5E7EB',
    colorName: 'Light Gray',
    colorClass: 'bg-gray-300',
    description: 'Fluffy and soft!',
  },
  {
    name: 'Arrow',
    emoji: '➡️',
    color: '#3B82F6',
    colorName: 'Cerulean',
    colorClass: 'bg-blue-500',
    description: 'Pointy and straight!',
  },
  {
    name: 'Cross',
    emoji: '✚',
    color: '#8B5CF6',
    colorName: 'Violet',
    colorClass: 'bg-violet-500',
    description: 'Two lines crossing!',
  },
];
