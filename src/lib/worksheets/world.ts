/**
 * World & enrichment worksheet builders — Shapes, Colors, Science,
 * Social & Emotional and Other Activities.
 */
import { shapeTiles } from '../../data/kids/shapes';
import {
  type Worksheet, page, header, instr,
  circleSheet, matchingSheet, sortSheet, readingSheet, fillBlankSheet,
  drawWriteSheet, colourByKeySheet,
} from './core';

const rotate = <T,>(a: T[], k: number): T[] => a.slice(k % a.length).concat(a.slice(0, k % a.length));

const SHAPE_SVG: Record<string, string> = {
  Circle: '<circle cx="110" cy="110" r="100" />',
  Square: '<rect x="10" y="10" width="200" height="200" />',
  Triangle: '<polygon points="110,10 210,200 10,200" />',
  Rectangle: '<rect x="10" y="40" width="200" height="130" />',
  Star: '<polygon points="110,10 140,80 215,80 155,125 180,200 110,155 40,200 65,125 5,80 80,80" />',
  Heart: '<path d="M110 200 C20 130 40 40 110 90 C180 40 200 130 110 200 Z" />',
  Oval: '<ellipse cx="110" cy="110" rx="105" ry="75" />',
  Diamond: '<polygon points="110,5 210,110 110,215 10,110" />',
};

function shapeSheet(name: string, svgShape: string): string {
  return page(`
    ${header(`Shape — ${name} (Trace & Colour)`)}
    <text x="40" y="120" font-size="18" font-weight="700" fill="#0f172a">Trace the ${name.toLowerCase()}, then colour it in!</text>
    <g transform="translate(180,180) scale(1.1)" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 8">${svgShape}</g>
    <g transform="translate(180,470) scale(1.1)" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="2 8">${svgShape}</g>
    <text x="40" y="740" font-size="14" font-weight="700" fill="#64748b">Can you find a ${name.toLowerCase()} in your room? 🔎</text>`);
}

// ── SHAPES ───────────────────────────────────────────────────────────────────
export function buildShapes(): Worksheet[] {
  const out: Worksheet[] = [];
  // Trace & colour each shape.
  for (const s of shapeTiles) {
    const shape = SHAPE_SVG[s.name];
    if (!shape) continue;
    out.push({ id: `shape-trace-${s.name.toLowerCase()}`, title: `Trace the ${s.name}`, category: 'Shapes', band: 'Pre-KG', emoji: '🔷', svg: () => shapeSheet(s.name, shape) });
  }
  // Match shapes to names.
  out.push({
    id: 'shape-match-names', title: 'Match Shapes to Names', category: 'Shapes', band: 'LKG', emoji: '🔶',
    svg: () => matchingSheet('Match the Shape to its Name', 'Draw a line from each shape to its name.',
      ['⭕', '⬜', '🔺', '▬', '⭐'], rotate(['Square', 'Triangle', 'Star', 'Circle', 'Rectangle'], 2)),
  });
  // Connect similar shapes.
  out.push({
    id: 'shape-connect', title: 'Connect the Similar Shapes', category: 'Shapes', band: 'LKG', emoji: '🔗',
    svg: () => matchingSheet('Connect the Same Shapes', 'Draw a line to join the shapes that are the same.',
      ['⭕', '⬜', '🔺', '⭐', '❤️'], rotate(['🔺', '❤️', '⭕', '⬜', '⭐'], 0)),
  });
  // Find & colour the named shape.
  out.push({
    id: 'shape-find-color', title: 'Find & Colour the Triangles', category: 'Shapes', band: 'LKG', emoji: '🔺',
    svg: () => circleSheet('Find the Triangles', ['Circle every TRIANGLE you can find, then colour it.'],
      [['🔺', '⬜', '🔺', '⭕', '🔺'], ['⭐', '🔺', '⬜', '🔺', '❤️'], ['🔺', '⭕', '🔺', '⬜', '🔺']]),
  });
  // Real-world objects to shapes.
  out.push({
    id: 'shape-real-world', title: 'Real Objects & Their Shapes', category: 'Shapes', band: 'Class 1', emoji: '🌍',
    svg: () => matchingSheet('Match Objects to Shapes', 'Draw a line from each object to its shape.',
      ['🍕 pizza slice', '🪟 window', '⚽ ball', '📺 TV', '🚸 sign'], rotate(['Triangle', 'Square', 'Circle', 'Rectangle', 'Triangle'], 0)),
  });
  // 2D vs 3D sorting.
  out.push({
    id: 'shape-2d-3d', title: 'Sort: 2D or 3D', category: 'Shapes', band: 'Class 2', emoji: '🧊',
    svg: () => sortSheet('2D or 3D Shapes', 'Write each shape in the correct box (flat = 2D, solid = 3D).',
      '2D (flat)', '3D (solid)', ['⭕', '🔺', '⬜', '🧊', '⚽', '🎲', '📦', '⭐']),
  });
  // Draw the mirror image.
  out.push({
    id: 'shape-mirror', title: 'Draw the Mirror Image', category: 'Shapes', band: 'Class 1', emoji: '🪞',
    svg: () => drawWriteSheet('Mirror Image', 'Draw the OTHER half so both sides match. (Fold line down the middle.)'),
  });
  return out;
}

// ── COLORS ───────────────────────────────────────────────────────────────────
export function buildColors(): Worksheet[] {
  const out: Worksheet[] = [];
  // Colour by number.
  out.push({
    id: 'color-by-number', title: 'Colour by Number', category: 'Colors', band: 'LKG', emoji: '🎨',
    svg: () => colourByKeySheet('Colour by Number', 'Colour each box using the colour key below.',
      [{ k: '1', name: 'Red', hex: '#ef4444' }, { k: '2', name: 'Blue', hex: '#3b82f6' }, { k: '3', name: 'Green', hex: '#22c55e' }, { k: '4', name: 'Yellow', hex: '#facc15' }],
      ['1', '2', '3', '4', '2', '3', '4', '1', '3', '4', '1', '2', '4', '1', '2', '3', '1', '2', '3', '4']),
  });
  // Colour by letter.
  out.push({
    id: 'color-by-letter', title: 'Colour by Letter', category: 'Colors', band: 'LKG', emoji: '🖍️',
    svg: () => colourByKeySheet('Colour by Letter', 'Colour each box using the colour key below.',
      [{ k: 'R', name: 'Red', hex: '#ef4444' }, { k: 'B', name: 'Blue', hex: '#3b82f6' }, { k: 'G', name: 'Green', hex: '#22c55e' }, { k: 'Y', name: 'Yellow', hex: '#facc15' }],
      ['R', 'B', 'G', 'Y', 'B', 'G', 'Y', 'R', 'G', 'Y', 'R', 'B', 'Y', 'R', 'B', 'G', 'R', 'B', 'G', 'Y']),
  });
  // Rainbow trace & colour.
  out.push({
    id: 'color-rainbow', title: 'Trace & Colour the Rainbow', category: 'Colors', band: 'Pre-KG', emoji: '🌈',
    svg: () => {
      const arcs = [['#ef4444', 200], ['#f97316', 173], ['#eab308', 146], ['#22c55e', 119], ['#3b82f6', 92], ['#6366f1', 65], ['#a855f7', 40]] as const;
      let g = '';
      for (const [c, r] of arcs) {
        const d = `M ${297 - r} 470 A ${r} ${r} 0 0 1 ${297 + r} 470`;
        g += `<path d="${d}" fill="none" stroke="${c}" stroke-width="16" opacity="0.18"/><path d="${d}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="3 6"/>`;
      }
      return page(`${header('Trace & Colour the Rainbow')}
        <text x="40" y="120" font-size="18" font-weight="700" fill="#0f172a">Trace each arc, then colour the rainbow! 🌈</text>
        ${g}
        <text x="40" y="700" font-size="14" font-weight="700" fill="#64748b">Red · Orange · Yellow · Green · Blue · Indigo · Violet</text>`);
    },
  });
  // Connect colour to its name.
  out.push({
    id: 'color-connect-name', title: 'Connect Colour to Name', category: 'Colors', band: 'Pre-KG', emoji: '🟥',
    svg: () => matchingSheet('Match Colour to Name', 'Draw a line from each colour to its name.',
      ['🔴', '🔵', '🟢', '🟡', '🟣'], rotate(['Blue', 'Yellow', 'Red', 'Purple', 'Green'], 0)),
  });
  // Match objects to colours.
  out.push({
    id: 'color-match-objects', title: 'Match Objects to Colours', category: 'Colors', band: 'Pre-KG', emoji: '🍓',
    svg: () => matchingSheet('What Colour Is It?', 'Draw a line from each object to its usual colour.',
      ['🍌 banana', '🍓 strawberry', '🌿 leaf', '☁️ cloud', '🍆 brinjal'], rotate(['Red', 'Green', 'White', 'Purple', 'Yellow'], 0)),
  });
  // Sort objects by colour.
  out.push({
    id: 'color-sort', title: 'Sort by Colour', category: 'Colors', band: 'Pre-KG', emoji: '🗂️',
    svg: () => sortSheet('Sort by Colour', 'Put each fruit in the right colour box.', 'Red things', 'Yellow things',
      ['🍎', '🍌', '🍓', '🍋', '🌶️', '🌽']),
  });
  // Read and colour.
  out.push({
    id: 'color-read', title: 'Read & Colour', category: 'Colors', band: 'Class 1', emoji: '📖',
    svg: () => fillBlankSheet('Read & Colour', 'Read each line and colour the picture as it says.', [
      'Colour the apple 🍎 RED.', 'Colour the sun ☀️ YELLOW.', 'Colour the leaf 🍃 GREEN.',
      'Colour the sky ☁️ BLUE.', 'Colour the grapes 🍇 PURPLE.',
    ]),
  });
  // Learn the colours — trace the names.
  out.push({
    id: 'color-learn', title: 'Learn the Colours — Write & Colour', category: 'Colors', band: 'LKG', emoji: '✏️',
    svg: () => fillBlankSheet('Learn the Colours', 'Write each colour name, then colour the box that colour.', [
      'RED  →  ____________   ⬜', 'BLUE →  ____________   ⬜', 'GREEN → ____________   ⬜',
      'YELLOW → __________   ⬜', 'BLACK → ___________   ⬜', 'PINK → ____________   ⬜',
    ]),
  });
  return out;
}

// ── SCIENCE ──────────────────────────────────────────────────────────────────
export function buildScience(): Worksheet[] {
  return [
    {
      id: 'sci-plants-animals', title: 'Plants & Animals — Sort', category: 'Science', band: 'Class 1', emoji: '🌱',
      svg: () => sortSheet('Living Things — Plants or Animals?', 'Put each one in the right box.', 'Plants 🌿', 'Animals 🐾',
        ['🌳', '🐶', '🌻', '🐠', '🌵', '🐝', '🌴', '🐱']),
    },
    {
      id: 'sci-body', title: 'Our Bodies — Label the Parts', category: 'Science', band: 'LKG', emoji: '🧍',
      svg: () => fillBlankSheet('Parts of the Body', 'Write the body part you use to do each thing.', [
        'You SEE with your ______.', 'You HEAR with your ______.', 'You SMELL with your ______.',
        'You TASTE with your ______.', 'You WALK with your ______.', 'You CLAP with your ______.',
      ]),
    },
    {
      id: 'sci-food', title: 'Food & Nutrition — Healthy or Treat?', category: 'Science', band: 'Class 1', emoji: '🥗',
      svg: () => sortSheet('Healthy Food or Sometimes Treat?', 'Sort each food into the right box.', 'Healthy 🥕', 'Treat 🍭',
        ['🍎', '🍭', '🥦', '🍫', '🥛', '🍟', '🍊', '🍰']),
    },
    {
      id: 'sci-weather', title: 'Weather & Seasons', category: 'Science', band: 'LKG', emoji: '🌦️',
      svg: () => matchingSheet('Weather & Seasons', 'Match the weather to what you would wear or do.',
        ['☀️ sunny', '🌧️ rainy', '❄️ cold', '🌬️ windy'], rotate(['umbrella', 'fly a kite', 'sun hat', 'warm coat'], 1)),
    },
    {
      id: 'sci-energy', title: 'Energy — What Needs Power?', category: 'Science', band: 'Class 1', emoji: '⚡',
      svg: () => circleSheet('Energy', ['Circle the things that need ELECTRICITY or BATTERIES to work.'],
        [['📺', '🍎', '💡', '🪨'], ['🔦', '🌳', '📱', '✏️'], ['⛽', '🚗', '☁️', '🔌']]),
    },
    {
      id: 'sci-forces', title: 'Forces — Push or Pull?', category: 'Science', band: 'Class 1', emoji: '🧲',
      svg: () => sortSheet('Push or Pull?', 'Sort each action into push or pull.', 'Push 👐', 'Pull 🤜',
        ['🚪 door open', '🛒 trolley', '🪁 kite string', '⚽ kick', '🧳 drawer', '🔔 rope']),
    },
    {
      id: 'sci-environment', title: 'Environment — Take Care of Earth', category: 'Science', band: 'Class 2', emoji: '🌍',
      svg: () => readingSheet('Caring for Our Earth',
        ['We must keep our Earth clean.', 'We can plant trees and save water.', 'We should put rubbish in the bin.', 'Recycle paper, plastic and cans.'],
        ['Name one way to care for the Earth.', 'Where should rubbish go?', 'What three things can we recycle?']),
    },
    {
      id: 'sci-five-senses', title: 'My Five Senses', category: 'Science', band: 'LKG', emoji: '✋',
      svg: () => matchingSheet('Five Senses', 'Match each sense to the body part you use.',
        ['👀 see', '👂 hear', '👃 smell', '👅 taste', '✋ touch'], rotate(['ears', 'tongue', 'eyes', 'skin', 'nose'], 2)),
    },
    {
      id: 'sci-plant-parts', title: 'Parts of a Plant', category: 'Science', band: 'Class 1', emoji: '🌿',
      svg: () => fillBlankSheet('Parts of a Plant', 'Write the part of the plant that does each job.', [
        'Holds the plant in the soil and drinks water: ______', 'Carries water up the plant: ______',
        'Makes food using sunlight: ______', 'Grows into fruit and makes seeds: ______',
      ]),
    },
    {
      id: 'sci-day-night', title: 'Day & Night — Sort', category: 'Science', band: 'Pre-KG', emoji: '🌗',
      svg: () => sortSheet('Day or Night?', 'Sort each picture into day or night.', 'Day ☀️', 'Night 🌙',
        ['☀️', '🌙', '⭐', '🌈', '🦉', '🐓', '🌅', '🛌']),
    },
  ];
}

// ── SOCIAL & EMOTIONAL ───────────────────────────────────────────────────────
export function buildSocial(): Worksheet[] {
  return [
    {
      id: 'se-feelings', title: 'Feelings & Emotions — Match the Face', category: 'Social & Emotional', band: 'Pre-KG', emoji: '😊',
      svg: () => matchingSheet('How Do They Feel?', 'Match each face to the feeling word.',
        ['😀', '😢', '😡', '😨', '😴'], rotate(['sad', 'angry', 'happy', 'sleepy', 'scared'], 2)),
    },
    {
      id: 'se-self-aware', title: 'All About Me — Self Awareness', category: 'Social & Emotional', band: 'LKG', emoji: '🪞',
      svg: () => drawWriteSheet('All About Me', 'Draw yourself, then write: one thing you LIKE and one thing that makes you HAPPY.'),
    },
    {
      id: 'se-self-control', title: 'Calm Down — Self Control', category: 'Social & Emotional', band: 'Class 1', emoji: '🧘',
      svg: () => fillBlankSheet('When I Feel Big Feelings, I Can…', 'Tick the calming ideas you will try.', [
        '☐ Take 5 deep breaths.', '☐ Count slowly to ten.', '☐ Ask an adult for help.',
        '☐ Drink some water.', '☐ Squeeze my hands and relax.', 'Write your own idea: ____________________',
      ]),
    },
    {
      id: 'se-social-skills', title: 'Social Skills — Listening & Sharing', category: 'Social & Emotional', band: 'LKG', emoji: '🧑‍🤝‍🧑',
      svg: () => circleSheet('Good Listening', ['Circle the pictures that show GOOD listening and kind behaviour.'],
        [['👂', '🙉', '🤝', '👊'], ['🤲', '🗣️', '🙋', '😤']], 30, 36),
    },
    {
      id: 'se-manners', title: 'Good Manners — Magic Words', category: 'Social & Emotional', band: 'Pre-KG', emoji: '🙏',
      svg: () => fillBlankSheet('Magic Words', 'Write the polite word you would say.', [
        'When someone helps you, say: ____________', 'When you want something, say: ____________ you.',
        'When you bump someone, say: ____________', 'When you meet a friend, say: ____________',
        'Before bed, say: good ____________.',
      ]),
    },
    {
      id: 'se-friendship', title: 'Friendship & Sharing', category: 'Social & Emotional', band: 'Class 1', emoji: '💞',
      svg: () => drawWriteSheet('A Good Friend', 'Draw you and a friend playing nicely, then write one way to be a good friend.'),
    },
    {
      id: 'se-mindfulness', title: 'Mindfulness — Breathe Like a Flower', category: 'Social & Emotional', band: 'LKG', emoji: '🌸',
      svg: () => readingSheet('Flower & Candle Breathing',
        ['Pretend to hold a flower 🌸.', 'Breathe IN slowly and smell it.', 'Pretend to hold a candle 🕯️.', 'Breathe OUT slowly to cool it. Do it 5 times.'],
        ['How do you feel after breathing slowly?', 'When could you use this at school?']),
    },
    {
      id: 'se-story', title: 'Feelings Story — The New Boy', category: 'Social & Emotional', band: 'Class 2', emoji: '📘',
      svg: () => readingSheet('The New Boy',
        ['A new boy joined the class.', 'He felt shy and a little scared.', 'Aisha smiled and asked him to play.', 'Soon the new boy felt happy and safe.'],
        ['How did the new boy feel at first?', 'What kind thing did Aisha do?', 'How did he feel at the end?']),
    },
    {
      id: 'se-family', title: 'My Family', category: 'Social & Emotional', band: 'Pre-KG', emoji: '👨‍👩‍👧‍👦',
      svg: () => drawWriteSheet('My Family', 'Draw your family, then write each person’s name and one thing you love about them.'),
    },
    {
      id: 'se-kindness', title: 'Acts of Kindness — Checklist', category: 'Social & Emotional', band: 'Class 1', emoji: '🤝',
      svg: () => fillBlankSheet('Kindness Checklist', 'Tick the kind things you can do today.', [
        '☐ Share my toys or pencils.', '☐ Say “please” and “thank you”.', '☐ Help someone who is sad.',
        '☐ Wait for my turn.', '☐ Say something nice to a friend.', 'Write your own kind act: ____________________',
      ]),
    },
  ];
}

// ── OTHER ACTIVITIES ─────────────────────────────────────────────────────────
export function buildOther(): Worksheet[] {
  return [
    {
      id: 'other-size', title: 'Size Comparisons — Big & Small', category: 'Other Activities', band: 'Pre-KG', emoji: '📐',
      svg: () => fillBlankSheet('Big & Small', 'Circle the BIGGER one in each pair.', [
        '🐘  or  🐭', '🌳  or  🌱', '🏠  or  ⛺', '🐳  or  🐟', '🍉  or  🍓',
      ]),
    },
    {
      id: 'other-same-diff', title: 'Same vs. Different', category: 'Other Activities', band: 'Pre-KG', emoji: '🔍',
      svg: () => circleSheet('Same or Different', ['Circle the picture that is DIFFERENT in each row.'],
        [['🍎', '🍎', '🍌', '🍎'], ['⭐', '⭐', '⭐', '🌙'], ['🐶', '🐱', '🐶', '🐶'], ['🔵', '🔵', '🔴', '🔵']], 34, 36),
    },
    {
      id: 'other-opposites', title: 'Opposites', category: 'Other Activities', band: 'LKG', emoji: '↔️',
      svg: () => matchingSheet('Opposites', 'Match each picture to its opposite.',
        ['☀️ day', '⬆️ up', '🐘 big', '🔥 hot', '😀 happy'], rotate(['🌙 night', '⬇️ down', '🐭 small', '❄️ cold', '😢 sad'], 2)),
    },
    {
      id: 'other-position', title: 'Position Words — in, on, under', category: 'Other Activities', band: 'LKG', emoji: '🧭',
      svg: () => fillBlankSheet('Where Is It?', 'Draw the cat 🐱 in the right place.', [
        'Draw the cat ON the box.', 'Draw the cat IN the box.', 'Draw the cat UNDER the box.',
        'Draw the cat BESIDE the box.', 'Draw the cat BEHIND the box.',
      ]),
    },
    {
      id: 'other-full-empty', title: 'Full & Empty', category: 'Other Activities', band: 'Pre-KG', emoji: '🥛',
      svg: () => circleSheet('Full or Empty', ['Circle the glass that is FULL in each row.'],
        [['🥛', '🥃'], ['🫙', '🍶'], ['🪣', '🛢️']], 34, 38),
    },
    {
      id: 'other-sorting', title: 'Sorting — Group the Things', category: 'Other Activities', band: 'Pre-KG', emoji: '🗂️',
      svg: () => sortSheet('Sort: Fruit or Animal?', 'Put each picture in the right box.', 'Fruit 🍎', 'Animals 🐾',
        ['🍎', '🐶', '🍌', '🐱', '🍇', '🐠', '🍓', '🐰']),
    },
    {
      id: 'other-ordering', title: 'Ordering by Size', category: 'Other Activities', band: 'Pre-KG', emoji: '📊',
      svg: () => fillBlankSheet('Order by Size', 'Number them 1 (smallest) to 3 (biggest).', [
        '🐜  __    🐕  __    🐘  __', '🌱  __    🌳  __    🌲  __', '🪨  __    ⛰️  __    🏔️  __',
        '🍓  __    🍎  __    🍉  __', '⭐  __    🌕  __    ☀️  __',
      ]),
    },
    {
      id: 'other-maze', title: 'Help the Bee Find the Flower', category: 'Other Activities', band: 'LKG', emoji: '🐝',
      svg: () => drawWriteSheet('Draw a Path', 'Draw a line (a path) to help the bee 🐝 reach the flower 🌻 without crossing the lines.'),
    },
  ];
}
