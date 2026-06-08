/**
 * Kids Nursery Rhymes — PUBLIC-DOMAIN classic rhymes for Pre-KG to Class 2
 * Each rhyme includes full lyrics and an optional YouTube embed placeholder for owner to replace
 */

export interface NurseryRhyme {
  id: string;
  title: string;
  emoji: string;
  lyrics: string;
  youtubeVideoId: string; // Owner to replace with official video ID; this is a placeholder
  colorClass: string;
}

export const nurseryRhymes: NurseryRhyme[] = [
  {
    id: 'twinkle-twinkle',
    title: 'Twinkle, Twinkle, Little Star',
    emoji: '⭐',
    lyrics: `Twinkle, twinkle, little star,
How I wonder what you are!
Up above the world so high,
Like a diamond in the sky.
Twinkle, twinkle, little star,
How I wonder what you are!`,
    youtubeVideoId: 'placeholder_twinkle', // Owner to replace with official video
    colorClass: 'bg-sky-100',
  },
  {
    id: 'baa-baa-black-sheep',
    title: 'Baa, Baa, Black Sheep',
    emoji: '🐑',
    lyrics: `Baa, baa, black sheep, have you any wool?
Yes sir, yes sir, three bags full;
One for my master, one for my dame,
And one for the little boy who lives down the lane.
Baa, baa, black sheep, have you any wool?
Yes sir, yes sir, three bags full.`,
    youtubeVideoId: 'placeholder_baa_baa', // Owner to replace with official video
    colorClass: 'bg-gray-100',
  },
  {
    id: 'jack-and-jill',
    title: 'Jack and Jill',
    emoji: '⛰️',
    lyrics: `Jack and Jill went up the hill
To fetch a pail of water;
Jack fell down and broke his crown,
And Jill came tumbling after.

Up Jack got and home did trot,
As fast as he could caper;
To old Dame Dob, who patched his nob
With vinegar and brown paper.`,
    youtubeVideoId: 'placeholder_jack_and_jill', // Owner to replace with official video
    colorClass: 'bg-green-100',
  },
  {
    id: 'mary-had-lamb',
    title: 'Mary Had a Little Lamb',
    emoji: '🐑',
    lyrics: `Mary had a little lamb,
Little lamb, little lamb,
Mary had a little lamb,
Its fleece was white as snow;

And everywhere that Mary went,
Mary went, Mary went,
Everywhere that Mary went,
The lamb was sure to go.

It followed her to school one day,
School one day, school one day,
It followed her to school one day,
Which was against the rule.`,
    youtubeVideoId: 'placeholder_mary_lamb', // Owner to replace with official video
    colorClass: 'bg-pink-100',
  },
  {
    id: 'humpty-dumpty',
    title: 'Humpty Dumpty',
    emoji: '🥚',
    lyrics: `Humpty Dumpty sat on a wall,
Humpty Dumpty had a great fall;
All the king's horses and all the king's men
Couldn't put Humpty together again.`,
    youtubeVideoId: 'placeholder_humpty', // Owner to replace with official video
    colorClass: 'bg-yellow-100',
  },
  {
    id: 'hickory-dickory',
    title: 'Hickory Dickory Dock',
    emoji: '🐭',
    lyrics: `Hickory dickory dock,
The mouse ran up the clock.
The clock struck one,
The mouse ran down,
Hickory dickory dock.`,
    youtubeVideoId: 'placeholder_hickory', // Owner to replace with official video
    colorClass: 'bg-amber-100',
  },
  {
    id: 'old-macdonald',
    title: 'Old MacDonald Had a Farm',
    emoji: '🚜',
    lyrics: `Old MacDonald had a farm, E-I-E-I-O,
And on his farm he had a cow, E-I-E-I-O,
With a moo-moo here and a moo-moo there,
Here a moo, there a moo, everywhere a moo-moo,
Old MacDonald had a farm, E-I-E-I-O.

(Verse 2: Replace cow with pig - oink-oink)
(Verse 3: Replace cow with sheep - baa-baa)
(Verse 4: Replace cow with duck - quack-quack)`,
    youtubeVideoId: 'placeholder_macdonald', // Owner to replace with official video
    colorClass: 'bg-green-100',
  },
  {
    id: 'little-bo-peep',
    title: 'Little Bo-Peep',
    emoji: '🐑',
    lyrics: `Little Bo-Peep has lost her sheep,
And cannot tell where to find them;
Leave them alone, and they'll come home,
Bringing their tails behind them.

Little Bo-Peep fell fast asleep,
And dreamt she heard them bleating;
But when she awoke, she found it a joke,
For still they were fleeting.`,
    youtubeVideoId: 'placeholder_bo_peep', // Owner to replace with official video
    colorClass: 'bg-blue-100',
  },
  {
    id: 'twinkle-twinkle-alt',
    title: 'The Wheels on the Bus',
    emoji: '🚌',
    lyrics: `The wheels on the bus go round and round,
Round and round, round and round,
The wheels on the bus go round and round,
All through the town.

The horn on the bus goes beep, beep, beep,
Beep, beep, beep, beep, beep, beep,
The horn on the bus goes beep, beep, beep,
All through the town.`,
    youtubeVideoId: 'placeholder_wheels_bus', // Owner to replace with official video
    colorClass: 'bg-red-100',
  },
];
