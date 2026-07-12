/**
 * Numeracy worksheet builders — Numbers & Counting and Simple Math.
 */
import { numberTiles } from '../../data/kids/numbers';
import {
  type Worksheet, page, header, instr, traceChar, traceRow,
  circleSheet, fillBlankSheet, pictographSheet,
} from './core';

// Local math layouts -------------------------------------------------------
function mathSheet(title: string, line: string, problems: string[]): string {
  const head = instr(line);
  let rows = head.svg;
  problems.forEach((p, i) => {
    const col = i % 2, r = Math.floor(i / 2);
    const x = 60 + col * 275, y = head.nextY + 30 + r * 70;
    rows += `<text x="${x}" y="${y}" font-size="30" font-weight="700" fill="#0f172a">${p}</text>
      <rect x="${x + 150}" y="${y - 33}" width="64" height="46" rx="8" fill="none" stroke="#94a3b8" stroke-width="2"/>`;
  });
  return page(`${header(title)}${rows}`);
}

function pictureMathSheet(): string {
  const rows = [
    { e: '🍎', a: 2, b: 3 }, { e: '⭐', a: 4, b: 1 }, { e: '🐶', a: 3, b: 2 },
    { e: '🎈', a: 2, b: 2 }, { e: '🐟', a: 1, b: 4 }, { e: '🌸', a: 3, b: 3 },
  ];
  const head = instr('Count the pictures and write the total in the box.');
  let body = head.svg;
  rows.forEach((p, r) => {
    const y = head.nextY + 30 + r * 95;
    let x = 55;
    for (let i = 0; i < p.a; i++) { body += `<text x="${x}" y="${y}" font-size="30">${p.e}</text>`; x += 34; }
    body += `<text x="${x + 4}" y="${y}" font-size="28" font-weight="700" fill="#0f172a">+</text>`; x += 34;
    for (let i = 0; i < p.b; i++) { body += `<text x="${x}" y="${y}" font-size="30">${p.e}</text>`; x += 34; }
    body += `<text x="${x + 4}" y="${y}" font-size="28" font-weight="700" fill="#0f172a">=</text>`; x += 42;
    body += `<rect x="${x}" y="${y - 34}" width="58" height="46" rx="8" fill="none" stroke="#94a3b8" stroke-width="2"/>`;
  });
  return page(`${header('Picture Addition')}${body}`);
}

function patternSheet(title: string, rows: string[][]): string {
  const head = instr('Look at each pattern. Draw what comes next in the box.');
  let body = head.svg;
  rows.forEach((row, r) => {
    const y = head.nextY + 50 + r * 95;
    body += `<text x="40" y="${y - 26}" font-size="14" font-weight="700" fill="#64748b">Pattern ${r + 1} — finish it!</text>`;
    row.forEach((cell, i) => {
      const x = 70 + i * 80;
      if (cell === '?') body += `<rect x="${x - 30}" y="${y - 32}" width="62" height="62" rx="10" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 5"/>`;
      else body += `<text x="${x}" y="${y + 14}" text-anchor="middle" font-size="46">${cell}</text>`;
    });
  });
  return page(`${header(title)}${body}`);
}

// ── NUMBERS & COUNTING ───────────────────────────────────────────────────────
export function buildNumbers(): Worksheet[] {
  const out: Worksheet[] = [];

  // Learning Numbers 1–20 — trace & count.
  for (const t of numberTiles) {
    const dots = Array.from({ length: Math.min(t.number, 20) }, (_, i) =>
      `<text x="${55 + (i % 10) * 50}" y="${360 + Math.floor(i / 10) * 56}" font-size="40">${t.emoji}</text>`).join('');
    out.push({
      id: `number-${t.number}`,
      title: `Number ${t.number} (${t.word})`,
      category: 'Numbers & Counting', band: 'Pre-KG', emoji: t.emoji,
      svg: () => page(`
        ${header(`Number ${t.number} (${t.word}) — Trace & Count`)}
        ${traceChar(String(t.number), 230, 250, 220)}
        <text x="40" y="320" font-size="20" font-weight="700" fill="#0f172a">Count and colour ${t.number} ${t.number === 1 ? 'thing' : 'things'}:</text>
        ${dots}
        <text x="40" y="500" font-size="14" font-weight="700" fill="#64748b">Trace the number ${t.number}:</text>
        ${traceRow(String(t.number), 520)}${traceRow(String(t.number), 610)}`),
    });
  }

  // Counting themed 1–10.
  const themes = ['🍎', '⭐', '🐶', '🎈', '🐟', '🌸', '🚗', '🍌', '🦋', '🍓'];
  for (let n = 1; n <= 10; n++) {
    out.push({
      id: `counting-${n}`,
      title: `Counting to ${n}`,
      category: 'Numbers & Counting', band: 'Pre-KG', emoji: themes[n - 1],
      svg: () => {
        const items = Array.from({ length: n }, (_, i) => `<text x="${60 + (i % 8) * 60}" y="${280 + Math.floor(i / 8) * 70}" font-size="44">${themes[n - 1]}</text>`).join('');
        return page(`${header(`Counting — How many ${themes[n - 1]}?`)}
          <text x="40" y="120" font-size="18" font-weight="700" fill="#0f172a">Count the pictures and write the number in the box.</text>
          ${items}
          <rect x="247" y="600" width="100" height="100" rx="12" fill="none" stroke="#0f172a" stroke-width="3"/>
          <text x="297" y="585" text-anchor="middle" font-size="14" font-weight="700" fill="#64748b">Write here</text>`);
      },
    });
  }

  // Odd / Even.
  out.push({
    id: 'num-odd-even', title: 'Odd & Even Numbers', category: 'Numbers & Counting', band: 'Class 1', emoji: '2️⃣',
    svg: () => circleSheet('Odd & Even Numbers', ['Circle all the EVEN numbers (2, 4, 6, 8, 10...).'],
      [['1', '2', '3', '4', '5'], ['6', '7', '8', '9', '10'], ['11', '12', '13', '14', '15']]),
  });
  // Ordinal numbers.
  out.push({
    id: 'num-ordinal', title: 'Ordinal Numbers (1st, 2nd, 3rd)', category: 'Numbers & Counting', band: 'Class 1', emoji: '🥇',
    svg: () => fillBlankSheet('Ordinal Numbers', 'Colour or circle the correct one in the row 🚗🚗🚗🚗🚗.', [
      'Circle the 1st car.', 'Colour the 3rd car red.', 'Put a tick on the 5th car.',
      'The 2nd car comes after the ____ car.', 'Write: 1st, 2nd, ____, ____, 5th',
    ]),
  });
  // More / Less.
  out.push({
    id: 'num-more-less', title: 'More & Less', category: 'Numbers & Counting', band: 'Pre-KG', emoji: '⚖️',
    svg: () => fillBlankSheet('More or Less?', 'Write the bigger number, and circle the group that has MORE.', [
      '🍎🍎🍎  or  🍎🍎🍎🍎🍎   — which has more?', '⭐⭐⭐⭐  or  ⭐⭐   — which has more?',
      'Which is bigger: 7 or 4 → ____', 'Which is smaller: 3 or 9 → ____', 'Write a number less than 5: ____',
    ]),
  });
  // Before & After.
  out.push({
    id: 'num-before-after', title: 'Before & After Numbers', category: 'Numbers & Counting', band: 'LKG', emoji: '↩️',
    svg: () => fillBlankSheet('Before & After', 'Write the number that comes before and after.', [
      '____ , 5 , ____', '____ , 9 , ____', '____ , 12 , ____', '____ , 7 , ____', '____ , 20 , ____', '____ , 3 , ____',
    ]),
  });
  // Skip counting.
  out.push({
    id: 'num-skip-counting', title: 'Skip Counting (2s, 5s, 10s)', category: 'Numbers & Counting', band: 'Class 1', emoji: '⏭️',
    svg: () => fillBlankSheet('Skip Counting', 'Fill in the missing numbers.', [
      'Count by 2s:  2 , 4 , ___ , 8 , ___ , 12', 'Count by 5s:  5 , 10 , ___ , 20 , ___ , 30',
      'Count by 10s: 10 , 20 , ___ , 40 , ___ , 60', 'Count by 2s:  ___ , 4 , 6 , ___ , 10',
      'Count by 5s:  ___ , 10 , 15 , ___ , 25',
    ]),
  });
  return out;
}

// ── SIMPLE MATH ────────────────────────────────────────────────────────────
export function buildMath(): Worksheet[] {
  const out: Worksheet[] = [];
  const sets: { id: string; title: string; instr: string; problems: string[] }[] = [
    { id: 'add-5', title: 'Addition up to 5', instr: 'Add the numbers and write the answer.', problems: ['1 + 1 =', '2 + 1 =', '1 + 2 =', '3 + 1 =', '2 + 2 =', '1 + 3 =', '4 + 1 =', '2 + 3 =', '3 + 2 =', '1 + 4 ='] },
    { id: 'add-10', title: 'Addition up to 10', instr: 'Add the numbers and write the answer.', problems: ['5 + 2 =', '3 + 4 =', '6 + 1 =', '4 + 4 =', '2 + 6 =', '7 + 2 =', '5 + 5 =', '3 + 6 =', '8 + 1 =', '4 + 5 ='] },
    { id: 'add-20', title: 'Addition up to 20', instr: 'Add the numbers and write the answer.', problems: ['11 + 3 =', '12 + 5 =', '10 + 8 =', '13 + 4 =', '9 + 7 =', '14 + 6 =', '15 + 2 =', '11 + 9 =', '12 + 7 =', '13 + 3 ='] },
    { id: 'sub-10', title: 'Subtraction within 10', instr: 'Subtract and write the answer.', problems: ['5 - 2 =', '7 - 3 =', '9 - 4 =', '6 - 1 =', '8 - 5 =', '10 - 3 =', '4 - 2 =', '7 - 6 =', '9 - 5 =', '6 - 4 ='] },
    { id: 'sub-20', title: 'Subtraction within 20', instr: 'Subtract and write the answer.', problems: ['15 - 4 =', '18 - 6 =', '13 - 5 =', '17 - 8 =', '20 - 7 =', '14 - 9 =', '16 - 3 =', '19 - 5 =', '12 - 8 =', '11 - 4 ='] },
  ];
  for (const m of sets) out.push({ id: `math-${m.id}`, title: m.title, category: 'Simple Math', band: 'Class 1', emoji: '➕', svg: () => mathSheet(m.title, m.instr, m.problems) });
  out.push({ id: 'math-picture', title: 'Picture Addition', category: 'Simple Math', band: 'UKG', emoji: '🍎', svg: () => pictureMathSheet() });

  // Patterns.
  const patterns: { id: string; title: string; rows: string[][] }[] = [
    { id: 'ab', title: 'Patterns — AB', rows: [['🔴', '🔵', '🔴', '🔵', '?', '?'], ['🌟', '🌙', '🌟', '🌙', '?', '?'], ['🍎', '🍌', '🍎', '🍌', '?', '?'], ['⬛', '⬜', '⬛', '⬜', '?', '?'], ['🐶', '🐱', '🐶', '🐱', '?', '?']] },
    { id: 'abc', title: 'Patterns — ABC', rows: [['🔴', '🟡', '🔵', '🔴', '🟡', '?'], ['🟥', '🟩', '🟦', '🟥', '🟩', '?'], ['🍎', '🍌', '🍇', '🍎', '🍌', '?'], ['⭐', '💛', '💙', '⭐', '💛', '?'], ['🐶', '🐱', '🐭', '🐶', '🐱', '?']] },
    { id: 'abb', title: 'Patterns — ABB', rows: [['🔴', '🔵', '🔵', '🔴', '🔵', '?'], ['🌟', '🌙', '🌙', '🌟', '🌙', '?'], ['🍎', '🍌', '🍌', '🍎', '🍌', '?'], ['🐶', '🐱', '🐱', '🐶', '🐱', '?'], ['❤️', '💙', '💙', '❤️', '💙', '?']] },
  ];
  for (const p of patterns) out.push({ id: `pattern-${p.id}`, title: p.title, category: 'Simple Math', band: 'Pre-KG', emoji: '🔁', svg: () => patternSheet(p.title, p.rows) });

  // Measurement.
  out.push({
    id: 'math-measure', title: 'Measurement — Long & Short', category: 'Simple Math', band: 'LKG', emoji: '📏',
    svg: () => fillBlankSheet('Measurement', 'Circle the correct answer. Compare the pictures.', [
      'Which is LONGER:  🐍  or  🐛 ?', 'Which is TALLER:  🌳  or  🌱 ?', 'Which is BIGGER:  🐘  or  🐭 ?',
      'Which is SHORTER:  ✏️  or  📏 ?', 'Which is HEAVIER:  🪨  or  🪶 ?',
    ]),
  });
  // Money (Indian Rupee).
  out.push({
    id: 'math-money', title: 'Money — Count the Rupees', category: 'Simple Math', band: 'Class 1', emoji: '🪙',
    svg: () => fillBlankSheet('Money — Indian Rupees ₹', 'Add the coins and write the total in rupees.', [
      '₹1 + ₹1 + ₹1 = ₹ ____', '₹2 + ₹2 = ₹ ____', '₹5 + ₹2 + ₹1 = ₹ ____',
      '₹10 + ₹5 = ₹ ____', '₹2 + ₹2 + ₹1 = ₹ ____', 'A toffee costs ₹2. You give ₹5. Change = ₹ ____',
    ]),
  });
  // Graphing — pictograph.
  out.push({
    id: 'math-graph', title: 'Graphing — Count & Compare', category: 'Simple Math', band: 'Class 1', emoji: '📊',
    svg: () => pictographSheet('Picture Graph', 'Count each row of fruit and write how many in the box.', [
      { emoji: '🍎', label: 'Apples', count: 5 }, { emoji: '🍌', label: 'Bananas', count: 3 },
      { emoji: '🍇', label: 'Grapes', count: 6 }, { emoji: '🍓', label: 'Berries', count: 4 },
      { emoji: '🍊', label: 'Oranges', count: 2 },
    ]),
  });
  // Doubles.
  out.push({ id: 'math-doubles', title: 'Doubles (+ itself)', category: 'Simple Math', band: 'Class 1', emoji: '✌️', svg: () => mathSheet('Doubles', 'Add each number to itself.', ['1 + 1 =', '2 + 2 =', '3 + 3 =', '4 + 4 =', '5 + 5 =', '6 + 6 =', '7 + 7 =', '8 + 8 =', '9 + 9 =', '10 + 10 =']) });
  // Number bonds to 10.
  out.push({
    id: 'math-bonds-10', title: 'Number Bonds to 10', category: 'Simple Math', band: 'Class 1', emoji: '🔟',
    svg: () => fillBlankSheet('Make 10', 'Write the missing number to make 10.', [
      '7 + ___ = 10', '4 + ___ = 10', '9 + ___ = 10', '2 + ___ = 10', '6 + ___ = 10', '10 + ___ = 10', '5 + ___ = 10', '8 + ___ = 10',
    ]),
  });
  // Tens & ones (place value).
  out.push({
    id: 'math-place-value', title: 'Tens & Ones (Place Value)', category: 'Simple Math', band: 'Class 1', emoji: '🧮',
    svg: () => fillBlankSheet('Tens & Ones', 'Write how many tens and ones are in each number.', [
      '14 = ___ ten and ___ ones', '23 = ___ tens and ___ ones', '30 = ___ tens and ___ ones',
      '47 = ___ tens and ___ ones', '8 = ___ tens and ___ ones', '52 = ___ tens and ___ ones',
    ]),
  });
  return out;
}
