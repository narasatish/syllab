/**
 * Kids Numbers & Counting data — 1-20 counting visuals for Pre-KG to Class 2
 */

export interface NumberTile {
  number: number;
  word: string;
  emoji: string;
  colorClass: string;
  dots: number[]; // array of dot positions for visual counting
}

export const numberTiles: NumberTile[] = [
  { number: 1, word: 'One', emoji: '🌟', colorClass: 'bg-yellow-400', dots: [5] },
  { number: 2, word: 'Two', emoji: '🍎', colorClass: 'bg-red-400', dots: [3, 7] },
  { number: 3, word: 'Three', emoji: '🦋', colorClass: 'bg-pink-400', dots: [2, 5, 8] },
  { number: 4, word: 'Four', emoji: '🐝', colorClass: 'bg-yellow-500', dots: [1, 3, 7, 9] },
  { number: 5, word: 'Five', emoji: '🌷', colorClass: 'bg-rose-400', dots: [1, 3, 5, 7, 9] },
  { number: 6, word: 'Six', emoji: '🐠', colorClass: 'bg-cyan-400', dots: [1, 3, 4, 6, 7, 9] },
  { number: 7, word: 'Seven', emoji: '🍒', colorClass: 'bg-red-500', dots: [1, 2, 3, 5, 7, 8, 9] },
  { number: 8, word: 'Eight', emoji: '🐙', colorClass: 'bg-purple-400', dots: [1, 2, 3, 4, 6, 7, 8, 9] },
  { number: 9, word: 'Nine', emoji: '🎈', colorClass: 'bg-blue-400', dots: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { number: 10, word: 'Ten', emoji: '🦢', colorClass: 'bg-orange-300', dots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { number: 11, word: 'Eleven', emoji: '🌻', colorClass: 'bg-yellow-300', dots: Array.from({ length: 11 }, (_, i) => i + 1) },
  { number: 12, word: 'Twelve', emoji: '⏰', colorClass: 'bg-indigo-400', dots: Array.from({ length: 12 }, (_, i) => i + 1) },
  { number: 13, word: 'Thirteen', emoji: '🎂', colorClass: 'bg-pink-500', dots: Array.from({ length: 13 }, (_, i) => i + 1) },
  { number: 14, word: 'Fourteen', emoji: '🐢', colorClass: 'bg-green-500', dots: Array.from({ length: 14 }, (_, i) => i + 1) },
  { number: 15, word: 'Fifteen', emoji: '🦑', colorClass: 'bg-blue-500', dots: Array.from({ length: 15 }, (_, i) => i + 1) },
  { number: 16, word: 'Sixteen', emoji: '🦐', colorClass: 'bg-red-600', dots: Array.from({ length: 16 }, (_, i) => i + 1) },
  { number: 17, word: 'Seventeen', emoji: '🐚', colorClass: 'bg-amber-400', dots: Array.from({ length: 17 }, (_, i) => i + 1) },
  { number: 18, word: 'Eighteen', emoji: '🐞', colorClass: 'bg-red-500', dots: Array.from({ length: 18 }, (_, i) => i + 1) },
  { number: 19, word: 'Nineteen', emoji: '🦗', colorClass: 'bg-green-600', dots: Array.from({ length: 19 }, (_, i) => i + 1) },
  { number: 20, word: 'Twenty', emoji: '🦅', colorClass: 'bg-sky-600', dots: Array.from({ length: 20 }, (_, i) => i + 1) },
];
