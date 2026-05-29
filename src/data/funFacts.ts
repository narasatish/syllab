/**
 * Fun Facts — bite-sized, kid-friendly trivia for the GK Hub.
 * Categories: history, science, geography, sports, world, animals, space.
 * Goal: spark curiosity in 5 seconds. Hooks kids to click and learn more.
 */

export interface FunFact {
  id: string;
  emoji: string;
  category: 'history' | 'science' | 'geography' | 'sports' | 'world' | 'animals' | 'space' | 'india';
  hook: string;       // Short hook headline (~6-12 words)
  fact: string;       // The actual fact (1-2 sentences, under 200 chars)
  source?: string;    // Optional credibility tag
  gradient: string;   // Tailwind gradient classes
}

export const FUN_FACTS: FunFact[] = [
  // ── Indian History
  {
    id: 'ff-001', emoji: '👑', category: 'india',
    hook: 'India invented the number Zero',
    fact: 'Indian mathematician Aryabhata gave the world the concept of zero (0) over 1,500 years ago. Without zero, modern computers wouldn\'t exist!',
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    id: 'ff-002', emoji: '🏛️', category: 'india',
    hook: 'World\'s oldest university was in India',
    fact: 'Takshashila University in ancient India started teaching students 2,700 years ago — long before Oxford or Harvard existed.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'ff-003', emoji: '♟️', category: 'india',
    hook: 'Chess was invented in India',
    fact: 'Chess began in India around 1,500 years ago as a game called "Chaturanga". The pieces represented Indian army units — infantry, cavalry, elephants, and chariots.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'ff-004', emoji: '🌌', category: 'india',
    hook: 'India was the first to reach Moon\'s South Pole',
    fact: 'On 23 August 2023, Chandrayaan-3 made India the FIRST country ever to land near the Moon\'s south pole. The rover is named Pragyan ("wisdom").',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'ff-005', emoji: '🚂', category: 'india',
    hook: '7th-largest railway network in the world',
    fact: 'Indian Railways carries 23 million people every day — that\'s like moving the entire population of Australia daily!',
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'ff-006', emoji: '🍛', category: 'india',
    hook: 'India produces the most spices in the world',
    fact: 'India grows about 70% of the world\'s spices. The flavour in your favourite curry probably travelled less than 500 km!',
    gradient: 'from-red-500 to-orange-600',
  },
  {
    id: 'ff-007', emoji: '🏺', category: 'history',
    hook: 'Cleopatra lived closer to the Moon landing than to the pyramids',
    fact: 'The Great Pyramid was built around 2,560 BCE. Cleopatra lived around 30 BCE. The Moon landing was 1969 CE. That makes Cleopatra 500 years closer to us than to the pyramids!',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'ff-008', emoji: '⚔️', category: 'history',
    hook: 'Oxford University is older than the Aztec Empire',
    fact: 'Oxford was teaching students from around 1096 CE. The Aztec Empire began in 1345 CE — nearly 250 years later.',
    gradient: 'from-blue-500 to-cyan-600',
  },

  // ── Science
  {
    id: 'ff-009', emoji: '🧠', category: 'science',
    hook: 'Your brain runs on 20 watts of power',
    fact: 'A dim LED bulb! Your brain uses only 20 watts — yet it\'s smarter than every supercomputer ever built. ChatGPT needs about 50 million times more power.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'ff-010', emoji: '💧', category: 'science',
    hook: 'Hot water freezes faster than cold water (sometimes)',
    fact: 'It\'s called the Mpemba Effect — hot water can freeze faster than cold water in certain conditions. Scientists are still figuring out why!',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'ff-011', emoji: '🌈', category: 'science',
    hook: 'Bananas are radioactive',
    fact: 'Bananas contain potassium-40, a naturally radioactive isotope. Don\'t worry — you\'d need to eat 10 million bananas at once for any danger!',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'ff-012', emoji: '⚡', category: 'science',
    hook: 'Light from the Sun takes 8 minutes to reach you',
    fact: 'The sunlight hitting your face was born inside the Sun 8 minutes ago. If the Sun vanished right now, you\'d only know 8 minutes later.',
    gradient: 'from-orange-500 to-yellow-600',
  },
  {
    id: 'ff-013', emoji: '👁️', category: 'science',
    hook: 'You blink ~17,000 times every day',
    fact: 'You\'re blind for 10% of your waking hours — your brain just fills in the gaps so smoothly you never notice!',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'ff-014', emoji: '🦴', category: 'science',
    hook: 'Babies have more bones than adults',
    fact: 'Babies are born with about 270 bones. By adulthood, many fuse together — leaving you with 206. The strongest is your jaw!',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ff-015', emoji: '❤️', category: 'science',
    hook: 'Your heart beats 100,000 times a day',
    fact: 'Without you doing anything, your heart pumps about 7,000 litres of blood every day — enough to fill a small swimming pool!',
    gradient: 'from-red-500 to-rose-600',
  },

  // ── Space
  {
    id: 'ff-016', emoji: '🌑', category: 'space',
    hook: 'The Moon is slowly moving away from Earth',
    fact: 'Every year, the Moon drifts ~3.8 cm farther from Earth. In a few billion years, total solar eclipses will be impossible to see.',
    gradient: 'from-slate-500 to-gray-600',
  },
  {
    id: 'ff-017', emoji: '🪐', category: 'space',
    hook: 'Saturn would float on water',
    fact: 'Saturn is so light for its size that if you could find a bathtub big enough, it would float! It\'s mostly hydrogen and helium.',
    gradient: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'ff-018', emoji: '☀️', category: 'space',
    hook: '1 million Earths fit inside the Sun',
    fact: 'The Sun is so massive that you could fit about 1.3 million Earths inside it. And the Sun is just an average-sized star!',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'ff-019', emoji: '🌠', category: 'space',
    hook: 'A day on Venus is longer than its year',
    fact: 'Venus spins so slowly that one day there (243 Earth days) lasts longer than its full year around the Sun (225 Earth days)!',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    id: 'ff-020', emoji: '🌌', category: 'space',
    hook: 'Space is completely silent',
    fact: 'Sound needs air or water to travel. Space has neither — so even a supernova explosion would be totally silent if you were there.',
    gradient: 'from-indigo-600 to-purple-700',
  },

  // ── Animals
  {
    id: 'ff-021', emoji: '🐙', category: 'animals',
    hook: 'Octopuses have 3 hearts and blue blood',
    fact: '2 hearts pump blood to their gills, 1 to the rest of the body. Their blood is blue because it uses copper instead of iron like ours.',
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    id: 'ff-022', emoji: '🐘', category: 'animals',
    hook: 'Elephants can\'t jump — but they never forget',
    fact: 'Elephants are the only mammals that physically cannot jump. But they have the best memory among land animals — recognising friends decades later.',
    gradient: 'from-gray-500 to-slate-600',
  },
  {
    id: 'ff-023', emoji: '🦒', category: 'animals',
    hook: 'A giraffe\'s tongue is 50 cm long and dark blue',
    fact: 'The blue-black colour protects the giraffe\'s tongue from sunburn while it spends 16-20 hours a day eating leaves!',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'ff-024', emoji: '🐝', category: 'animals',
    hook: 'Honey never spoils',
    fact: 'Archaeologists have found 3,000-year-old honey in Egyptian tombs that\'s still perfectly edible. Bees are nature\'s preservation experts!',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'ff-025', emoji: '🦖', category: 'animals',
    hook: 'T-Rex lived closer to humans than to Stegosaurus',
    fact: 'Stegosaurus went extinct 80 million years before T-Rex appeared. T-Rex lived 65 million years ago — closer in time to YOU than to Stegosaurus.',
    gradient: 'from-green-500 to-emerald-600',
  },

  // ── Geography
  {
    id: 'ff-026', emoji: '🗻', category: 'geography',
    hook: 'Mount Everest grows 4 mm taller every year',
    fact: 'The Indian tectonic plate is still pushing into Asia, making the Himalayas (and Everest) taller. Earthquakes can change its height instantly.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'ff-027', emoji: '🌊', category: 'geography',
    hook: 'The Pacific Ocean is bigger than ALL land combined',
    fact: 'You could fit every continent — Asia, Africa, North America, South America, Europe, Australia, Antarctica — inside the Pacific Ocean with space to spare.',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'ff-028', emoji: '🏜️', category: 'geography',
    hook: 'Antarctica is technically a desert',
    fact: 'A desert is defined by rainfall, not heat. Antarctica gets less rain than the Sahara — making it the largest desert on Earth!',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'ff-029', emoji: '🌋', category: 'geography',
    hook: 'There are more stars than grains of sand on Earth',
    fact: 'Scientists estimate 10^23 stars in the observable universe, vs ~7.5 × 10^18 grains of sand on all of Earth\'s beaches and deserts.',
    gradient: 'from-purple-600 to-indigo-700',
  },
  {
    id: 'ff-030', emoji: '🇮🇳', category: 'india',
    hook: 'India has the most postal offices on Earth',
    fact: 'With 1.55 lakh post offices, India\'s postal network is the largest in the world — including a floating post office on Dal Lake, Srinagar!',
    gradient: 'from-orange-500 to-red-600',
  },

  // ── Sports & World
  {
    id: 'ff-031', emoji: '🏏', category: 'sports',
    hook: 'Cricket\'s longest match lasted 14 days',
    fact: 'The 1939 Timeless Test between England and South Africa lasted so long that the English team had to leave to catch their boat home!',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'ff-032', emoji: '🏅', category: 'sports',
    hook: 'Neeraj Chopra: India\'s first Olympic gold in athletics',
    fact: 'In Tokyo 2020 (held 2021), Neeraj Chopra won gold in javelin — India\'s first ever Olympic gold in athletics! He won silver again at Paris 2024.',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'ff-033', emoji: '⚽', category: 'sports',
    hook: 'Football is the most popular sport on Earth',
    fact: 'Football (soccer) is watched by over 4 billion people — more than half the world\'s population. India hosts more cricket fans, though!',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'ff-034', emoji: '🗣️', category: 'world',
    hook: 'India has 22 official languages',
    fact: 'The Indian Constitution officially recognises 22 languages. Counting dialects, India has over 19,500 different ways to speak!',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'ff-035', emoji: '🏰', category: 'world',
    hook: 'Vatican City is the smallest country in the world',
    fact: 'Just 0.49 km² — you can walk across it in 30 minutes. It has its own post office, currency, and even an ATM with Latin instructions!',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'ff-036', emoji: '🌐', category: 'world',
    hook: 'There are more languages spoken in Papua New Guinea than in all Europe',
    fact: 'Papua New Guinea has over 840 living languages — roughly 12% of all languages on Earth, in just one country!',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'ff-037', emoji: '💰', category: 'world',
    hook: 'India has the world\'s largest film industry by output',
    fact: 'India produces about 2,000 films every year — more than Hollywood + Europe combined. Bollywood, Tollywood, Kollywood, and Mollywood together!',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'ff-038', emoji: '⏰', category: 'science',
    hook: 'A "jiffy" is a real unit of time',
    fact: 'In physics, a jiffy is the time light takes to travel 1 centimeter — about 33.3 picoseconds. So "in a jiffy" is FAST.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'ff-039', emoji: '🪨', category: 'science',
    hook: 'The Sahara was once a lush green jungle',
    fact: 'Just 10,000 years ago, the Sahara was full of rivers, lakes, and forests. Climate shifts slowly turned it into the desert we know today.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'ff-040', emoji: '🧬', category: 'science',
    hook: 'You share 60% of your DNA with bananas',
    fact: 'You also share 50% with trees and 99% with chimpanzees. All life on Earth comes from the same starting point — about 3.8 billion years ago.',
    gradient: 'from-green-500 to-lime-600',
  },
];

/* Return a stable daily fact based on date — same for all users that day */
export function getDailyFunFact(): FunFact {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return FUN_FACTS[dayOfYear % FUN_FACTS.length];
}

/* Return facts filtered by category */
export function getFactsByCategory(cat: FunFact['category']): FunFact[] {
  return FUN_FACTS.filter((f) => f.category === cat);
}

/* Pick N random facts */
export function pickRandomFacts(n: number): FunFact[] {
  const copy = [...FUN_FACTS];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
