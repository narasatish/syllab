/**
 * Literacy worksheet builders — Letters, Phonics, Vocabulary, Reading & Writing.
 * Each builder returns a list of concrete Worksheets composed from core templates.
 */
import { alphabetTiles } from '../../data/kids/alphabet';
import {
  type Worksheet, page, header, instr, traceChar, traceRow,
  traceWriteSheet, circleSheet, matchingSheet, readingSheet, fillBlankSheet,
  drawWriteSheet, wordSearchSheet,
} from './core';

const rotate = <T,>(a: T[], k: number): T[] => a.slice(k % a.length).concat(a.slice(0, k % a.length));

// ── LETTERS ──────────────────────────────────────────────────────────────────
export function buildLetters(): Worksheet[] {
  const out: Worksheet[] = [];
  const A = alphabetTiles;

  // Learning Letters — intro + trace, per letter (A–Z).
  for (const t of A) {
    out.push({
      id: `letter-${t.letter.toLowerCase()}`,
      title: `Letter ${t.letter}${t.lowercase} — ${t.word}`,
      category: 'Letters', band: 'Pre-KG', emoji: t.emoji,
      svg: () => page(`
        ${header(`Letter ${t.letter} ${t.lowercase} — Trace & Learn`)}
        ${traceChar(t.letter, 120, 250, 230)}${traceChar(t.lowercase, 330, 250, 230)}
        <text x="40" y="320" font-size="22" font-weight="700" fill="#0f172a">“${t.letter}” is for ${t.word}</text>
        <text x="430" y="325" font-size="60">${t.emoji}</text>
        <text x="40" y="378" font-size="14" font-weight="700" fill="#64748b">Trace the capital ${t.letter}:</text>
        ${traceRow(t.letter, 398)}
        <text x="40" y="498" font-size="14" font-weight="700" fill="#64748b">Trace the small ${t.lowercase}:</text>
        ${traceRow(t.lowercase, 518)}
        <text x="40" y="640" font-size="14" font-weight="700" fill="#64748b">Colour the ${t.word}:</text>
        <text x="270" y="735" font-size="64">${t.emoji}</text>`),
    });
  }

  // Printing Letters — five letters per ruled trace-and-write sheet.
  for (let i = 0; i < A.length; i += 5) {
    const grp = A.slice(i, i + 5);
    const lbl = `${grp[0].letter}–${grp[grp.length - 1].letter}`;
    out.push({
      id: `printing-${lbl.toLowerCase()}`,
      title: `Printing Letters ${lbl}`,
      category: 'Letters', band: 'LKG', emoji: '✍️',
      svg: () => traceWriteSheet(`Printing Letters ${lbl}`, 'Trace each letter, then write your own next to it.',
        grp.map((g) => `${g.letter}${g.lowercase}  ${g.letter}${g.lowercase}  ${g.letter}${g.lowercase}`)),
    });
  }

  // Uppercase & Lowercase matching.
  for (let i = 0; i < A.length; i += 8) {
    const grp = A.slice(i, i + 8);
    const lbl = `${grp[0].letter}–${grp[grp.length - 1].letter}`;
    out.push({
      id: `case-match-${lbl.toLowerCase()}`,
      title: `Uppercase & Lowercase ${lbl}`,
      category: 'Letters', band: 'LKG', emoji: '🔠',
      svg: () => matchingSheet(`Match Capital to Small Letters ${lbl}`, 'Draw a line from each CAPITAL letter to its small letter.',
        grp.map((g) => g.letter), rotate(grp.map((g) => g.lowercase), 3)),
    });
  }

  // Alphabetical Order — fill the missing letters.
  out.push({
    id: 'alpha-order',
    title: 'Alphabetical Order — Missing Letters',
    category: 'Letters', band: 'LKG', emoji: '🔡',
    svg: () => fillBlankSheet('Alphabetical Order', 'Write the missing letters in order.', [
      'A , B , ___ , D , ___ , F , G',
      'H , ___ , J , K , ___ , M , N',
      '___ , P , Q , ___ , S , T , ___',
      'U , V , ___ , X , ___ , Z',
      'Now write the whole alphabet:  A ___ ___ ___ ___ ___ …',
    ]),
  });

  // Letters & Words — match the letter to a word that starts with it.
  for (let i = 0; i < A.length; i += 8) {
    const grp = A.slice(i, i + 8);
    const lbl = `${grp[0].letter}–${grp[grp.length - 1].letter}`;
    out.push({
      id: `letter-word-${lbl.toLowerCase()}`,
      title: `Letters & Words ${lbl}`,
      category: 'Letters', band: 'LKG', emoji: '🔤',
      svg: () => matchingSheet(`Match the Letter to its Word ${lbl}`, 'Draw a line from each letter to the word that begins with it.',
        grp.map((g) => `${g.letter} ${g.lowercase}`), rotate(grp.map((g) => `${g.emoji} ${g.word}`), 5)),
    });
  }

  // Word Searches — simple CVC / sight-word grids.
  out.push({
    id: 'wordsearch-animals',
    title: 'Word Search — Animals',
    category: 'Letters', band: 'Class 1', emoji: '🔍',
    svg: () => wordSearchSheet('Word Search — Animals', ['CAT', 'DOG', 'COW', 'HEN', 'PIG', 'FOX']),
  });
  out.push({
    id: 'wordsearch-sight',
    title: 'Word Search — Sight Words',
    category: 'Letters', band: 'Class 1', emoji: '🔍',
    svg: () => wordSearchSheet('Word Search — Sight Words', ['THE', 'AND', 'YOU', 'CAN', 'SEE', 'PLAY']),
  });
  return out;
}

// ── PHONICS ────────────────────────────────────────────────────────────────
export function buildPhonics(): Worksheet[] {
  const out: Worksheet[] = [];
  const A = alphabetTiles;

  // Beginning Sounds — circle the picture that starts with the letter (A–Z).
  A.forEach((t, i) => {
    const distract = [3, 7, 11, 15, 19].map((off) => A[(i + off) % A.length].emoji);
    const arranged = rotate([t.emoji, ...distract], i);
    out.push({
      id: `phonics-begin-${t.letter.toLowerCase()}`,
      title: `Beginning Sound: ${t.letter}`,
      category: 'Phonics', band: 'LKG', emoji: t.emoji,
      svg: () => page(`
        ${header(`Beginning Sounds — ${t.letter}${t.lowercase}`)}
        ${instr(['Say each picture out loud.', `Circle the one that begins with “${t.letter} ${t.lowercase}”.`]).svg}
        ${arranged.map((e, j) => { const x = 75 + j * 82; return `<circle cx="${x}" cy="300" r="36" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 5"/><text x="${x}" y="318" text-anchor="middle" font-size="44">${e}</text>`; }).join('')}
        <text x="40" y="430" font-size="16" font-weight="700" fill="#64748b">The letter “${t.letter}” is for ${t.word}.</text>
        <text x="40" y="500" font-size="14" font-weight="700" fill="#64748b">Now trace the letter:</text>
        ${traceRow(t.letter, 520)}${traceRow(t.lowercase, 610)}`),
    });
  });

  // Vowels — circle the vowels.
  out.push({
    id: 'phonics-vowels',
    title: 'Vowels — Circle the Vowels',
    category: 'Phonics', band: 'LKG', emoji: '🅰️',
    svg: () => circleSheet('Vowels: a e i o u', ['Circle all the VOWELS in each row. (a, e, i, o, u)'],
      [['A', 'B', 'E', 'C', 'I'], ['O', 'D', 'U', 'F', 'A'], ['G', 'E', 'H', 'I', 'J'], ['O', 'K', 'U', 'L', 'A']]),
  });

  // Consonants — circle the consonants.
  out.push({
    id: 'phonics-consonants',
    title: 'Consonants — Circle the Consonants',
    category: 'Phonics', band: 'LKG', emoji: '🅱️',
    svg: () => circleSheet('Consonants', ['Circle all the CONSONANTS (every letter that is NOT a vowel).'],
      [['B', 'A', 'C', 'E', 'D'], ['I', 'F', 'G', 'O', 'H'], ['U', 'J', 'K', 'A', 'L'], ['M', 'E', 'N', 'I', 'P']]),
  });

  // Phonemes — count the sounds in each word.
  out.push({
    id: 'phonics-phonemes',
    title: 'Count the Sounds (Phonemes)',
    category: 'Phonics', band: 'Class 1', emoji: '🔊',
    svg: () => fillBlankSheet('Count the Sounds', 'Say each word slowly. Write how many sounds you hear.', [
      'cat  →  ___ sounds', 'dog  →  ___ sounds', 'fish →  ___ sounds',
      'sun  →  ___ sounds', 'frog →  ___ sounds', 'star →  ___ sounds', 'ship →  ___ sounds',
    ]),
  });

  // Rhyming — match words that rhyme.
  out.push({
    id: 'phonics-rhyming',
    title: 'Rhyming Words — Match',
    category: 'Phonics', band: 'LKG', emoji: '🎵',
    svg: () => matchingSheet('Rhyming Words', 'Draw a line to match the words that rhyme.',
      ['cat', 'dog', 'sun', 'ball', 'tree'], rotate(['frog', 'fun', 'hat', 'bee', 'wall'], 2)),
  });
  // Ending sounds.
  out.push({
    id: 'phonics-ending', title: 'Ending Sounds', category: 'Phonics', band: 'Class 1', emoji: '🔚',
    svg: () => fillBlankSheet('Ending Sounds', 'Say each word. Write the LAST sound (letter) you hear.', [
      'cat → ends with ___', 'dog → ends with ___', 'sun → ___', 'bus → ___', 'red → ___', 'pig → ___',
    ]),
  });
  // CVC middle (vowel) sounds.
  out.push({
    id: 'phonics-cvc', title: 'CVC Words — Middle Sound', category: 'Phonics', band: 'Class 1', emoji: '🆎',
    svg: () => fillBlankSheet('CVC Words', 'Write the missing middle vowel (a, e, i, o, u).', [
      'c _ t  (cat 🐱)', 'd _ g  (dog 🐶)', 's _ n  (sun ☀️)', 'p _ g  (pig 🐷)', 'b _ d  (bed 🛏️)', 'h _ t  (hat 🎩)',
    ]),
  });
  return out;
}

// ── VOCABULARY ───────────────────────────────────────────────────────────────
export function buildVocabulary(): Worksheet[] {
  const out: Worksheet[] = [];

  const sightSets = [
    ['the', 'and', 'a', 'to', 'is'],
    ['you', 'it', 'in', 'said', 'for'],
    ['can', 'see', 'play', 'go', 'look'],
    ['big', 'little', 'one', 'two', 'three'],
  ];
  sightSets.forEach((s, i) => out.push({
    id: `vocab-sight-${i + 1}`,
    title: `Sight Words — Set ${i + 1}`,
    category: 'Vocabulary', band: 'LKG', emoji: '👀',
    svg: () => traceWriteSheet(`Sight Words — Set ${i + 1}`, 'Read, trace, then write each word.', s.map((w) => `${w}   ${w}`)),
  }));

  out.push({
    id: 'vocab-compound',
    title: 'Compound Words',
    category: 'Vocabulary', band: 'Class 1', emoji: '🧩',
    svg: () => matchingSheet('Compound Words', 'Join two words to make a new word. Draw the line.',
      ['sun', 'rain', 'foot', 'butter', 'cup', 'star'], rotate(['flower', 'bow', 'ball', 'fly', 'cake', 'fish'], 3)),
  });
  out.push({
    id: 'vocab-synonyms',
    title: 'Synonyms — Same Meaning',
    category: 'Vocabulary', band: 'Class 1', emoji: '🟰',
    svg: () => matchingSheet('Synonyms', 'Match the words that mean the SAME thing.',
      ['big', 'happy', 'fast', 'small', 'smart'], rotate(['glad', 'quick', 'large', 'clever', 'little'], 2)),
  });
  out.push({
    id: 'vocab-antonyms',
    title: 'Antonyms — Opposites',
    category: 'Vocabulary', band: 'Class 1', emoji: '↔️',
    svg: () => matchingSheet('Antonyms', 'Match each word to its OPPOSITE.',
      ['hot', 'up', 'big', 'day', 'happy', 'open'], rotate(['cold', 'down', 'small', 'night', 'sad', 'close'], 4)),
  });
  out.push({
    id: 'vocab-plurals',
    title: 'Plural Words — One & Many',
    category: 'Vocabulary', band: 'Class 1', emoji: '➕',
    svg: () => fillBlankSheet('Plural Words', 'Write the plural (more than one). Hint: add -s or -es.', [
      'one cat → two ______', 'one dog → three ______', 'one box → two ______',
      'one bus → two ______', 'one book → many ______', 'one fox → two ______',
    ]),
  });
  out.push({
    id: 'vocab-question-words',
    title: 'Question Words',
    category: 'Vocabulary', band: 'Class 1', emoji: '❓',
    svg: () => fillBlankSheet('Question Words (who, what, when, where, why, how)', 'Write the correct question word in each blank.', [
      '______ is your name?', '______ do you live?', '______ old are you?',
      '______ is your birthday?', '______ is your best friend?', '______ do you go to school? (bus/walk)',
    ]),
  });
  out.push({
    id: 'vocab-multiple-meaning',
    title: 'Multiple-Meaning Words',
    category: 'Vocabulary', band: 'Class 2', emoji: '🔁',
    svg: () => fillBlankSheet('Words with Two Meanings', 'Each word has TWO meanings. Draw both!', [
      'bat — the animal 🦇  AND  the cricket bat 🏏', 'star — in the sky ⭐  AND  a famous person 🌟',
      'leaves — on a tree 🍃  AND  goes away 🚶', 'ring — on a finger 💍  AND  a phone sound 📞',
    ]),
  });
  // Vocabulary cards — picture + word to trace (from alphabet tiles).
  out.push({
    id: 'vocab-cards',
    title: 'Vocabulary Cards — Trace the Word',
    category: 'Vocabulary', band: 'Pre-KG', emoji: '🃏',
    svg: () => traceWriteSheet('Vocabulary Cards', 'Trace each word, then say it out loud.',
      ['🍎 Apple', '⚽ Ball', '🐱 Cat', '🐶 Dog', '🐘 Elephant', '🐠 Fish']),
  });
  // Days of the week.
  out.push({
    id: 'vocab-days', title: 'Days of the Week', category: 'Vocabulary', band: 'LKG', emoji: '📅',
    svg: () => traceWriteSheet('Days of the Week', 'Trace each day, then write it again.',
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
  });
  // Number words 1–10.
  out.push({
    id: 'vocab-number-words', title: 'Number Words 1–10', category: 'Vocabulary', band: 'LKG', emoji: '🔟',
    svg: () => matchingSheet('Number Words', 'Match each number to its word.',
      ['1', '2', '3', '4', '5', '6'], rotate(['three', 'one', 'six', 'two', 'five', 'four'], 0)),
  });
  return out;
}

// ── READING ──────────────────────────────────────────────────────────────────
export function buildReading(): Worksheet[] {
  return [
    {
      id: 'read-cat', title: 'Story: The Little Cat', category: 'Reading', band: 'Class 1', emoji: '🐱',
      svg: () => readingSheet('Story: The Little Cat',
        ['A little cat sat on a mat.', 'The cat saw a red ball.', 'The cat ran to play with the ball.', 'The little cat was very happy.'],
        ['Where did the cat sit?', 'What colour was the ball?', 'How did the cat feel at the end?']),
    },
    {
      id: 'read-sun', title: 'Story: The Big Sun', category: 'Reading', band: 'Class 1', emoji: '☀️',
      svg: () => readingSheet('Story: The Big Sun',
        ['The sun is big and bright.', 'It gives us light in the day.', 'Plants need the sun to grow.', 'At night, the sun goes away and the moon comes out.'],
        ['Is the sun big or small?', 'What do plants need to grow?', 'What comes out at night?']),
    },
    {
      id: 'read-frog', title: 'Story: The Green Frog', category: 'Reading', band: 'Class 2', emoji: '🐸',
      svg: () => readingSheet('Story: The Green Frog',
        ['A green frog lived by a pond.', 'Every day it would hop and jump.', 'One day it found a new friend, a fish.', 'They played in the water all day long.'],
        ['What colour was the frog?', 'Where did the frog live?', 'Who was the new friend?', 'What did they do all day?']),
    },
    {
      id: 'read-sentences', title: 'Read & Draw the Sentence', category: 'Reading', band: 'LKG', emoji: '📖',
      svg: () => drawWriteSheet('Read & Draw', 'Read the sentence, then draw it: “A big red ball is on the green grass.”'),
    },
  ];
}

// ── WRITING ──────────────────────────────────────────────────────────────────
export function buildWriting(): Worksheet[] {
  return [
    {
      id: 'write-sentences', title: 'Early Writing — Copy the Sentences', category: 'Writing', band: 'Class 1', emoji: '✏️',
      svg: () => traceWriteSheet('Copy the Sentences', 'Trace each sentence, then write it again below.',
        ['I can run.', 'The dog is big.', 'I like to play.', 'We see the sun.']),
    },
    {
      id: 'write-capitals', title: 'Capital Letters — Fix the Sentence', category: 'Writing', band: 'Class 1', emoji: '🔠',
      svg: () => fillBlankSheet('Capital Letters', 'Rewrite each sentence with a CAPITAL letter at the start.', [
        'my name is ravi.  →', 'we play in the park.  →', 'the cat is black.  →', 'i love my school.  →',
      ]),
    },
    {
      id: 'write-punctuation', title: 'Punctuation — Add the Right Mark', category: 'Writing', band: 'Class 1', emoji: '❗',
      svg: () => fillBlankSheet('Punctuation ( . ?  ! )', 'Add the correct punctuation mark at the end of each sentence.', [
        'I like ice cream ___', 'What is your name ___', 'Watch out ___', 'The sky is blue ___', 'Do you have a pet ___',
      ]),
    },
    {
      id: 'write-prepositions', title: 'Prepositions — in, on, under', category: 'Writing', band: 'Class 1', emoji: '📦',
      svg: () => fillBlankSheet('Prepositions (in, on, under, beside)', 'Write the correct position word in each blank.', [
        'The cat is ___ the box.', 'The ball is ___ the table.', 'The dog sits ___ the chair.',
        'The book is ___ the bag.', 'The bird is ___ the tree.',
      ]),
    },
    {
      id: 'write-prompt-weekend', title: 'Writing Prompt — My Weekend', category: 'Writing', band: 'Class 2', emoji: '🖊️',
      svg: () => drawWriteSheet('Writing Prompt', 'Draw and write about your favourite thing you did on the weekend.'),
    },
    {
      id: 'write-prompt-friend', title: 'Writing Prompt — My Best Friend', category: 'Writing', band: 'Class 2', emoji: '🧑‍🤝‍🧑',
      svg: () => drawWriteSheet('Writing Prompt', 'Draw your best friend, then write two sentences about them.'),
    },
    {
      id: 'write-prompt-animal', title: 'Writing Prompt — My Favourite Animal', category: 'Writing', band: 'Class 2', emoji: '🐾',
      svg: () => drawWriteSheet('Writing Prompt', 'Draw your favourite animal, then write two sentences: what it is and why you like it.'),
    },
    {
      id: 'write-trace-words', title: 'Handwriting — Trace Common Words', category: 'Writing', band: 'LKG', emoji: '🖍️',
      svg: () => traceWriteSheet('Trace Common Words', 'Trace each word neatly, then write it again.',
        ['mum', 'dad', 'home', 'school', 'friend', 'happy']),
    },
  ];
}
