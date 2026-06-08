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
];
