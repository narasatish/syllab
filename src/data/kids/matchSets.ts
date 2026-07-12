/**
 * Syllab Junior — matching game sets. Each pair has a left + right that belong
 * together; the game shuffles both columns and the child taps to connect them.
 */
export interface MatchPair { id: string; left: string; right: string; }
export interface MatchSet { id: string; title: string; emoji: string; pairs: MatchPair[]; }

export const MATCH_SETS: MatchSet[] = [
  {
    id: 'animal-sound', title: 'Animal & Sound', emoji: '🐮',
    pairs: [
      { id: 'cow', left: '🐮', right: 'Moo' }, { id: 'dog', left: '🐶', right: 'Woof' },
      { id: 'cat', left: '🐱', right: 'Meow' }, { id: 'lion', left: '🦁', right: 'Roar' },
      { id: 'duck', left: '🦆', right: 'Quack' },
    ],
  },
  {
    id: 'animal-home', title: 'Animal & Home', emoji: '🏠',
    pairs: [
      { id: 'dog', left: '🐶', right: 'Kennel' }, { id: 'bee', left: '🐝', right: 'Hive' },
      { id: 'bird', left: '🐦', right: 'Nest' }, { id: 'lion', left: '🦁', right: 'Den' },
      { id: 'horse', left: '🐴', right: 'Stable' },
    ],
  },
  {
    id: 'letter-case', title: 'Capital & Small', emoji: '🔤',
    pairs: [
      { id: 'a', left: 'A', right: 'a' }, { id: 'b', left: 'B', right: 'b' },
      { id: 'c', left: 'C', right: 'c' }, { id: 'd', left: 'D', right: 'd' },
      { id: 'e', left: 'E', right: 'e' },
    ],
  },
  {
    id: 'number-count', title: 'Number & Count', emoji: '🔢',
    pairs: [
      { id: 'n1', left: '1', right: '⭐' }, { id: 'n2', left: '2', right: '⭐⭐' },
      { id: 'n3', left: '3', right: '⭐⭐⭐' }, { id: 'n4', left: '4', right: '⭐⭐⭐⭐' },
      { id: 'n5', left: '5', right: '⭐⭐⭐⭐⭐' },
    ],
  },
  {
    id: 'fruit-colour', title: 'Fruit & Colour', emoji: '🍎',
    pairs: [
      { id: 'banana', left: '🍌', right: 'Yellow' }, { id: 'apple', left: '🍎', right: 'Red' },
      { id: 'grapes', left: '🍇', right: 'Purple' }, { id: 'leaf', left: '🍃', right: 'Green' },
      { id: 'brinjal', left: '🍆', right: 'Violet' },
    ],
  },
  {
    id: 'shape-object', title: 'Shape & Object', emoji: '🔷',
    pairs: [
      { id: 'circle', left: 'Circle', right: '⚽' }, { id: 'square', left: 'Square', right: '🪟' },
      { id: 'triangle', left: 'Triangle', right: '🍕' }, { id: 'star', left: 'Star', right: '⭐' },
      { id: 'heart', left: 'Heart', right: '❤️' },
    ],
  },
];
