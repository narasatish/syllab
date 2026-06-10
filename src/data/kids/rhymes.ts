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
    youtubeVideoId: 'yCjJyiqpAuU', // Super Simple Songs (official, embeddable)
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
    youtubeVideoId: '5oYKonYBujg', // Super Simple Songs (official, embeddable)
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
    youtubeVideoId: 'GzrjwOQpAl0', // Super Simple Songs (official, embeddable)
    colorClass: 'bg-red-100',
  },
  {
    id: 'itsy-bitsy-spider',
    title: 'Itsy Bitsy Spider',
    emoji: '🕷️',
    lyrics: `The itsy bitsy spider climbed up the water spout.
Down came the rain and washed the spider out.
Out came the sun and dried up all the rain,
And the itsy bitsy spider climbed up the spout again.`,
    youtubeVideoId: 'bne3Ix_tJL8', // Super Simple Songs (official, embeddable)
    colorClass: 'bg-blue-100',
  },
  {
    id: 'row-your-boat',
    title: 'Row, Row, Row Your Boat',
    emoji: '🚣',
    lyrics: `Row, row, row your boat,
Gently down the stream.
Merrily, merrily, merrily, merrily,
Life is but a dream.`,
    youtubeVideoId: '7otAJa3jui8', // Super Simple Songs (official, embeddable)
    colorClass: 'bg-teal-100',
  },
  {
    id: 'five-little-ducks',
    title: 'Five Little Ducks',
    emoji: '🦆',
    lyrics: `Five little ducks went out one day,
Over the hills and far away.
Mother duck said "Quack, quack, quack, quack,"
But only four little ducks came back.`,
    youtubeVideoId: 'pZw9veQ76fo', // Super Simple Songs (official, embeddable)
    colorClass: 'bg-yellow-100',
  },
  {
    id: 'rain-rain-go-away',
    title: 'Rain, Rain, Go Away',
    emoji: '🌧️',
    lyrics: `Rain, rain, go away,
Come again another day.
Little children want to play,
Rain, rain, go away.`,
    youtubeVideoId: 'placeholder_rain_away',
    colorClass: 'bg-sky-100',
  },
  {
    id: 'ring-a-ring-o-roses',
    title: 'Ring a Ring o\' Roses',
    emoji: '🌹',
    lyrics: `Ring a ring o' roses,
A pocket full of posies.
A-tishoo! A-tishoo!
We all fall down.`,
    youtubeVideoId: 'placeholder_ring_roses',
    colorClass: 'bg-pink-100',
  },
  {
    id: 'pat-a-cake',
    title: 'Pat-a-Cake',
    emoji: '🍰',
    lyrics: `Pat-a-cake, pat-a-cake, baker's man,
Bake me a cake as fast as you can.
Pat it and prick it and mark it with B,
And put it in the oven for baby and me.`,
    youtubeVideoId: 'placeholder_pat_a_cake',
    colorClass: 'bg-orange-100',
  },
  {
    id: 'hey-diddle-diddle',
    title: 'Hey Diddle Diddle',
    emoji: '🐮',
    lyrics: `Hey diddle diddle, the cat and the fiddle,
The cow jumped over the moon.
The little dog laughed to see such sport,
And the dish ran away with the spoon.`,
    youtubeVideoId: 'placeholder_hey_diddle', colorClass: 'bg-purple-100',
  },
  {
    id: 'jack-be-nimble',
    title: 'Jack Be Nimble',
    emoji: '🕯️',
    lyrics: `Jack be nimble, Jack be quick,
Jack jump over the candlestick.`,
    youtubeVideoId: 'placeholder_jack_nimble', colorClass: 'bg-amber-100',
  },
  {
    id: 'hot-cross-buns',
    title: 'Hot Cross Buns',
    emoji: '🥯',
    lyrics: `Hot cross buns! Hot cross buns!
One a penny, two a penny, hot cross buns!
If you have no daughters, give them to your sons,
One a penny, two a penny, hot cross buns!`,
    youtubeVideoId: 'placeholder_hot_cross', colorClass: 'bg-orange-100',
  },
  {
    id: 'this-little-piggy',
    title: 'This Little Piggy',
    emoji: '🐷',
    lyrics: `This little piggy went to market,
This little piggy stayed home,
This little piggy had roast beef,
This little piggy had none.
And this little piggy cried "Wee wee wee" all the way home!`,
    youtubeVideoId: 'placeholder_piggy', colorClass: 'bg-pink-100',
  },
  {
    id: 'one-two-buckle',
    title: 'One, Two, Buckle My Shoe',
    emoji: '👟',
    lyrics: `One, two, buckle my shoe,
Three, four, knock at the door,
Five, six, pick up sticks,
Seven, eight, lay them straight,
Nine, ten, a big fat hen.`,
    youtubeVideoId: 'placeholder_one_two', colorClass: 'bg-green-100',
  },
  {
    id: 'hush-little-baby',
    title: 'Hush, Little Baby',
    emoji: '🐦',
    lyrics: `Hush, little baby, don't say a word,
Mama's going to buy you a mockingbird.
And if that mockingbird won't sing,
Mama's going to buy you a diamond ring.`,
    youtubeVideoId: 'placeholder_hush_baby', colorClass: 'bg-blue-100',
  },
  {
    id: 'three-blind-mice',
    title: 'Three Blind Mice',
    emoji: '🐭',
    lyrics: `Three blind mice, three blind mice,
See how they run, see how they run!
They all ran after the farmer's wife,
Who cut off their tails with a carving knife.`,
    youtubeVideoId: 'placeholder_three_mice', colorClass: 'bg-slate-100',
  },
  {
    id: 'little-miss-muffet',
    title: 'Little Miss Muffet',
    emoji: '🕷️',
    lyrics: `Little Miss Muffet sat on a tuffet,
Eating her curds and whey.
Along came a spider who sat down beside her,
And frightened Miss Muffet away.`,
    youtubeVideoId: 'placeholder_muffet', colorClass: 'bg-yellow-100',
  },
  {
    id: 'mary-mary',
    title: 'Mary, Mary, Quite Contrary',
    emoji: '🌷',
    lyrics: `Mary, Mary, quite contrary,
How does your garden grow?
With silver bells and cockle shells,
And pretty maids all in a row.`,
    youtubeVideoId: 'placeholder_mary_mary', colorClass: 'bg-rose-100',
  },
  {
    id: 'little-teapot',
    title: "I'm a Little Teapot",
    emoji: '🫖',
    lyrics: `I'm a little teapot, short and stout,
Here is my handle, here is my spout.
When I get all steamed up, hear me shout,
"Tip me over and pour me out!"`,
    youtubeVideoId: 'placeholder_teapot', colorClass: 'bg-teal-100',
  },
  {
    id: 'if-youre-happy',
    title: "If You're Happy and You Know It",
    emoji: '😊',
    lyrics: `If you're happy and you know it, clap your hands!
If you're happy and you know it, clap your hands!
If you're happy and you know it, and you really want to show it,
If you're happy and you know it, clap your hands!`,
    youtubeVideoId: 'i14agob4uYU', colorClass: 'bg-amber-100', // Super Simple Songs (official)
  },
  {
    id: 'five-little-monkeys',
    title: 'Five Little Monkeys',
    emoji: '🐵',
    lyrics: `Five little monkeys jumping on the bed,
One fell off and bumped his head.
Mama called the doctor and the doctor said,
"No more monkeys jumping on the bed!"`,
    youtubeVideoId: 'placeholder_monkeys', colorClass: 'bg-orange-100',
  },
  {
    id: 'are-you-sleeping',
    title: 'Are You Sleeping? (Brother John)',
    emoji: '🔔',
    lyrics: `Are you sleeping, are you sleeping,
Brother John, Brother John?
Morning bells are ringing, morning bells are ringing,
Ding ding dong, ding ding dong.`,
    youtubeVideoId: 'placeholder_brother_john', colorClass: 'bg-indigo-100',
  },
  {
    id: 'sing-a-song-sixpence',
    title: 'Sing a Song of Sixpence',
    emoji: '🐦',
    lyrics: `Sing a song of sixpence, a pocket full of rye,
Four and twenty blackbirds baked in a pie.
When the pie was opened the birds began to sing,
Wasn't that a dainty dish to set before the king?`,
    youtubeVideoId: 'placeholder_sixpence', colorClass: 'bg-purple-100',
  },
  {
    id: 'old-king-cole',
    title: 'Old King Cole',
    emoji: '👑',
    lyrics: `Old King Cole was a merry old soul,
And a merry old soul was he.
He called for his pipe and he called for his bowl,
And he called for his fiddlers three.`,
    youtubeVideoId: 'placeholder_king_cole', colorClass: 'bg-yellow-100',
  },
];
