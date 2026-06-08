/**
 * Kids Alphabet & Phonics data — interactive A-Z tiles for Pre-KG to Class 1
 * Each letter includes the uppercase/lowercase, example word, and emoji
 */

export interface AlphabetTile {
  letter: string;
  lowercase: string;
  word: string;
  wordEn: string;
  emoji: string;
  colorClass: string;
}

export const alphabetTiles: AlphabetTile[] = [
  { letter: 'A', lowercase: 'a', word: 'Apple', wordEn: 'Apple', emoji: '🍎', colorClass: 'bg-red-400' },
  { letter: 'B', lowercase: 'b', word: 'Ball', wordEn: 'Ball', emoji: '⚽', colorClass: 'bg-blue-400' },
  { letter: 'C', lowercase: 'c', word: 'Cat', wordEn: 'Cat', emoji: '🐱', colorClass: 'bg-orange-400' },
  { letter: 'D', lowercase: 'd', word: 'Dog', wordEn: 'Dog', emoji: '🐶', colorClass: 'bg-amber-400' },
  { letter: 'E', lowercase: 'e', word: 'Elephant', wordEn: 'Elephant', emoji: '🐘', colorClass: 'bg-gray-400' },
  { letter: 'F', lowercase: 'f', word: 'Fish', wordEn: 'Fish', emoji: '🐠', colorClass: 'bg-cyan-400' },
  { letter: 'G', lowercase: 'g', word: 'Grapes', wordEn: 'Grapes', emoji: '🍇', colorClass: 'bg-purple-400' },
  { letter: 'H', lowercase: 'h', word: 'House', wordEn: 'House', emoji: '🏠', colorClass: 'bg-yellow-500' },
  { letter: 'I', lowercase: 'i', word: 'Ice Cream', wordEn: 'Ice Cream', emoji: '🍦', colorClass: 'bg-pink-400' },
  { letter: 'J', lowercase: 'j', word: 'Jelly', wordEn: 'Jelly', emoji: '🍮', colorClass: 'bg-fuchsia-400' },
  { letter: 'K', lowercase: 'k', word: 'Kite', wordEn: 'Kite', emoji: '🪁', colorClass: 'bg-sky-400' },
  { letter: 'L', lowercase: 'l', word: 'Lion', wordEn: 'Lion', emoji: '🦁', colorClass: 'bg-yellow-600' },
  { letter: 'M', lowercase: 'm', word: 'Monkey', wordEn: 'Monkey', emoji: '🐵', colorClass: 'bg-amber-600' },
  { letter: 'N', lowercase: 'n', word: 'Nest', wordEn: 'Nest', emoji: '🪶', colorClass: 'bg-emerald-600' },
  { letter: 'O', lowercase: 'o', word: 'Orange', wordEn: 'Orange', emoji: '🍊', colorClass: 'bg-orange-500' },
  { letter: 'P', lowercase: 'p', word: 'Parrot', wordEn: 'Parrot', emoji: '🦜', colorClass: 'bg-green-500' },
  { letter: 'Q', lowercase: 'q', word: 'Queen', wordEn: 'Queen', emoji: '👑', colorClass: 'bg-rose-400' },
  { letter: 'R', lowercase: 'r', word: 'Rainbow', wordEn: 'Rainbow', emoji: '🌈', colorClass: 'bg-violet-400' },
  { letter: 'S', lowercase: 's', word: 'Sun', wordEn: 'Sun', emoji: '☀️', colorClass: 'bg-yellow-400' },
  { letter: 'T', lowercase: 't', word: 'Tiger', wordEn: 'Tiger', emoji: '🐯', colorClass: 'bg-orange-600' },
  { letter: 'U', lowercase: 'u', word: 'Umbrella', wordEn: 'Umbrella', emoji: '☂️', colorClass: 'bg-indigo-400' },
  { letter: 'V', lowercase: 'v', word: 'Violin', wordEn: 'Violin', emoji: '🎻', colorClass: 'bg-purple-600' },
  { letter: 'W', lowercase: 'w', word: 'Whale', wordEn: 'Whale', emoji: '🐋', colorClass: 'bg-blue-600' },
  { letter: 'X', lowercase: 'x', word: 'Xylophone', wordEn: 'Xylophone', emoji: '🎹', colorClass: 'bg-cyan-600' },
  { letter: 'Y', lowercase: 'y', word: 'Yo-yo', wordEn: 'Yo-yo', emoji: '🪀', colorClass: 'bg-lime-400' },
  { letter: 'Z', lowercase: 'z', word: 'Zebra', wordEn: 'Zebra', emoji: '🦓', colorClass: 'bg-slate-400' },
];
