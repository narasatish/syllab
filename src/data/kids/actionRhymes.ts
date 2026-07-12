/**
 * Syllab Junior — action rhymes: classic preschool movement rhymes with simple
 * "do this action" cues so kids sing AND move. Read-aloud via Web Speech. These
 * are traditional/public-domain rhymes; lyrics kept short and original-form.
 */
export interface ActionLine { words: string; action: string; }
export interface ActionRhyme {
  id: string;
  title: string;
  emoji: string;
  lines: ActionLine[];
}

export const ACTION_RHYMES: ActionRhyme[] = [
  {
    id: 'head-shoulders', title: 'Head, Shoulders, Knees and Toes', emoji: '🧒',
    lines: [
      { words: 'Head, shoulders, knees and toes,', action: '👆 Touch your head, shoulders, knees, toes' },
      { words: 'Knees and toes!', action: '🦵 Touch knees, then toes' },
      { words: 'Eyes and ears and mouth and nose,', action: '👀 Point to eyes, ears, mouth, nose' },
      { words: 'Head, shoulders, knees and toes!', action: '🙆 Do it all again, faster!' },
    ],
  },
  {
    id: 'wheels-bus', title: 'The Wheels on the Bus', emoji: '🚌',
    lines: [
      { words: 'The wheels on the bus go round and round,', action: '🔄 Roll your hands in circles' },
      { words: 'Round and round, round and round.', action: '🔄 Keep rolling your hands' },
      { words: 'The wipers go swish, swish, swish,', action: '🙌 Swish your arms side to side' },
      { words: 'The horn goes beep, beep, beep!', action: '👈 Press a pretend horn' },
    ],
  },
  {
    id: 'itsy-spider', title: 'Itsy Bitsy Spider', emoji: '🕷️',
    lines: [
      { words: 'The itsy bitsy spider climbed up the water spout,', action: '🖐️ Walk fingers upwards' },
      { words: 'Down came the rain and washed the spider out.', action: '🌧️ Wiggle fingers down like rain' },
      { words: 'Out came the sun and dried up all the rain,', action: '☀️ Make a big circle with arms' },
      { words: 'And the itsy bitsy spider climbed up again!', action: '🖐️ Climb fingers up once more' },
    ],
  },
  {
    id: 'if-youre-happy', title: "If You're Happy and You Know It", emoji: '😀',
    lines: [
      { words: 'If you’re happy and you know it, clap your hands!', action: '👏 Clap twice' },
      { words: 'If you’re happy and you know it, stamp your feet!', action: '🦶 Stamp your feet' },
      { words: 'If you’re happy and you know it, shout “Hooray!”', action: '🙌 Raise hands and shout hooray' },
      { words: 'If you’re happy and you know it, do all three!', action: '🎉 Clap, stamp and shout!' },
    ],
  },
  {
    id: 'teapot', title: "I'm a Little Teapot", emoji: '🫖',
    lines: [
      { words: 'I’m a little teapot, short and stout,', action: '🤏 Stand small and round' },
      { words: 'Here is my handle, here is my spout.', action: '💪 One hand on hip, one arm out' },
      { words: 'When I get all steamed up, hear me shout,', action: '😮 Puff your cheeks' },
      { words: 'Tip me over and pour me out!', action: '↩️ Lean to the side and “pour”' },
    ],
  },
  {
    id: 'ringa-roses', title: 'Ringa Ringa Roses', emoji: '🌹',
    lines: [
      { words: 'Ringa ringa roses, a pocket full of posies,', action: '🔄 Hold hands and go round' },
      { words: 'Husha busha, husha busha,', action: '🤫 Slow down softly' },
      { words: 'We all fall down!', action: '⬇️ Gently sit down' },
    ],
  },
  {
    id: 'one-two-buckle', title: 'One, Two, Buckle My Shoe', emoji: '👟',
    lines: [
      { words: 'One, two, buckle my shoe,', action: '👟 Pretend to buckle a shoe' },
      { words: 'Three, four, knock at the door,', action: '✊ Knock in the air' },
      { words: 'Five, six, pick up sticks,', action: '🤏 Pick up pretend sticks' },
      { words: 'Seven, eight, lay them straight!', action: '➖ Lay them in a line' },
    ],
  },
  {
    id: 'hokey-pokey', title: 'The Hokey Pokey', emoji: '🕺',
    lines: [
      { words: 'You put your right hand in, you take your right hand out,', action: '🖐️ Hand in, hand out' },
      { words: 'You put your right hand in and you shake it all about!', action: '🤚 Shake your hand' },
      { words: 'You do the hokey pokey and you turn yourself around,', action: '🔄 Spin around' },
      { words: 'That’s what it’s all about!', action: '👏 Clap and cheer' },
    ],
  },
];
