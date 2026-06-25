/**
 * Syllab Junior — "learn by tapping" picture topics for Pre-KG / LKG / UKG, the
 * way nursery schools teach: animals & their sounds, fruits, vegetables, body
 * parts, colours, opposites, vehicles, community helpers and good habits.
 * Each item is tappable and spoken aloud (Web Speech). All free, no assets.
 */
export interface LearnItem { emoji: string; label: string; say?: string; }
export interface LearnTopic {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  colorClass: string; // gradient for the hub card
  items: LearnItem[];
}

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'animals', title: 'Animals & Sounds', emoji: '🐮', subtitle: 'Tap an animal to hear its sound!',
    colorClass: 'from-amber-300 to-orange-500',
    items: [
      { emoji: '🐮', label: 'Cow', say: 'The cow says moo.' },
      { emoji: '🐶', label: 'Dog', say: 'The dog says woof woof.' },
      { emoji: '🐱', label: 'Cat', say: 'The cat says meow.' },
      { emoji: '🦁', label: 'Lion', say: 'The lion says roar!' },
      { emoji: '🐑', label: 'Sheep', say: 'The sheep says baa.' },
      { emoji: '🐴', label: 'Horse', say: 'The horse says neigh.' },
      { emoji: '🐸', label: 'Frog', say: 'The frog says ribbit.' },
      { emoji: '🐵', label: 'Monkey', say: 'The monkey says ooh ooh aah aah.' },
      { emoji: '🐷', label: 'Pig', say: 'The pig says oink.' },
      { emoji: '🐘', label: 'Elephant', say: 'The elephant goes trumpet!' },
      { emoji: '🐝', label: 'Bee', say: 'The bee says buzz.' },
      { emoji: '🐯', label: 'Tiger', say: 'The tiger says grrr!' },
      { emoji: '🦊', label: 'Fox', say: 'The fox says ring ding ding.' },
      { emoji: '🐰', label: 'Rabbit', say: 'The rabbit goes thump thump.' },
      { emoji: '🐭', label: 'Mouse', say: 'The mouse goes squeak squeak.' },
      { emoji: '🦆', label: 'Duck', say: 'The duck says quack quack.' },
    ],
  },
  {
    id: 'birds', title: 'Birds', emoji: '🦜', subtitle: 'Tap to learn the birds!',
    colorClass: 'from-sky-300 to-cyan-500',
    items: [
      { emoji: '🦜', label: 'Parrot' }, { emoji: '🦚', label: 'Peacock' }, { emoji: '🦉', label: 'Owl' },
      { emoji: '🐔', label: 'Hen' }, { emoji: '🕊️', label: 'Pigeon' }, { emoji: '🦅', label: 'Eagle' },
      { emoji: '🦆', label: 'Duck' }, { emoji: '🐧', label: 'Penguin' }, { emoji: '🦢', label: 'Swan' }, { emoji: '🐦', label: 'Sparrow' },
      { emoji: '🦚', label: 'Peacock 2' }, { emoji: '🦅', label: 'Hawk' }, { emoji: '🪶', label: 'Feather' },
    ],
  },
  {
    id: 'fruits', title: 'Fruits', emoji: '🍎', subtitle: 'Tap a fruit to name it!',
    colorClass: 'from-rose-300 to-red-500',
    items: [
      { emoji: '🍎', label: 'Apple' }, { emoji: '🍌', label: 'Banana' }, { emoji: '🥭', label: 'Mango' },
      { emoji: '🍇', label: 'Grapes' }, { emoji: '🍊', label: 'Orange' }, { emoji: '🍉', label: 'Watermelon' },
      { emoji: '🍓', label: 'Strawberry' }, { emoji: '🍍', label: 'Pineapple' }, { emoji: '🍒', label: 'Cherry' }, { emoji: '🍐', label: 'Pear' },
      { emoji: '🍑', label: 'Peach' }, { emoji: '🥝', label: 'Kiwi' }, { emoji: '🍋', label: 'Lemon' }, { emoji: '🍈', label: 'Melon' },
    ],
  },
  {
    id: 'vegetables', title: 'Vegetables', emoji: '🥕', subtitle: 'Tap a vegetable to name it!',
    colorClass: 'from-green-300 to-emerald-500',
    items: [
      { emoji: '🥕', label: 'Carrot' }, { emoji: '🍅', label: 'Tomato' }, { emoji: '🥔', label: 'Potato' },
      { emoji: '🧅', label: 'Onion' }, { emoji: '🌽', label: 'Corn' }, { emoji: '🍆', label: 'Brinjal' },
      { emoji: '🥦', label: 'Broccoli' }, { emoji: '🫑', label: 'Capsicum' }, { emoji: '🥒', label: 'Cucumber' }, { emoji: '🧄', label: 'Garlic' },
      { emoji: '🥬', label: 'Lettuce' }, { emoji: '🥕', label: 'Radish' }, { emoji: '🥰', label: 'Spinach' }, { emoji: '🍞', label: 'Pumpkin' },
    ],
  },
  {
    id: 'body', title: 'My Body', emoji: '🧒', subtitle: 'Tap a part to learn it!',
    colorClass: 'from-fuchsia-300 to-purple-500',
    items: [
      { emoji: '👀', label: 'Eyes', say: 'Eyes — I use my eyes to see.' },
      { emoji: '👂', label: 'Ears', say: 'Ears — I use my ears to hear.' },
      { emoji: '👃', label: 'Nose', say: 'Nose — I use my nose to smell.' },
      { emoji: '👄', label: 'Mouth', say: 'Mouth — I use my mouth to talk and eat.' },
      { emoji: '👅', label: 'Tongue', say: 'Tongue — I use my tongue to taste.' },
      { emoji: '✋', label: 'Hands', say: 'Hands — I use my hands to hold and clap.' },
      { emoji: '🦶', label: 'Feet', say: 'Feet — I use my feet to walk and run.' },
      { emoji: '🦷', label: 'Teeth', say: 'Teeth — I use my teeth to chew.' },
      { emoji: '🧠', label: 'Brain', say: 'Brain — I use my brain to think.' },
      { emoji: '❤️', label: 'Heart', say: 'Heart — my heart beats inside me.' },
    ],
  },
  {
    id: 'colours', title: 'Colours', emoji: '🌈', subtitle: 'Tap a colour to hear its name!',
    colorClass: 'from-pink-300 to-rose-500',
    items: [
      { emoji: '🔴', label: 'Red' }, { emoji: '🟠', label: 'Orange' }, { emoji: '🟡', label: 'Yellow' },
      { emoji: '🟢', label: 'Green' }, { emoji: '🔵', label: 'Blue' }, { emoji: '🟣', label: 'Purple' },
      { emoji: '🌸', label: 'Pink' }, { emoji: '🟤', label: 'Brown' }, { emoji: '⚫', label: 'Black' }, { emoji: '⚪', label: 'White' },
    ],
  },
  {
    id: 'opposites', title: 'Opposites', emoji: '↔️', subtitle: 'Tap to learn opposite words!',
    colorClass: 'from-indigo-300 to-blue-500',
    items: [
      { emoji: '🐘', label: 'Big ↔ Small', say: 'Big and small are opposites.' },
      { emoji: '🔥', label: 'Hot ↔ Cold', say: 'Hot and cold are opposites.' },
      { emoji: '⬆️', label: 'Up ↔ Down', say: 'Up and down are opposites.' },
      { emoji: '☀️', label: 'Day ↔ Night', say: 'Day and night are opposites.' },
      { emoji: '😀', label: 'Happy ↔ Sad', say: 'Happy and sad are opposites.' },
      { emoji: '🐇', label: 'Fast ↔ Slow', say: 'Fast and slow are opposites.' },
      { emoji: '🚪', label: 'Open ↔ Close', say: 'Open and close are opposites.' },
      { emoji: '🥛', label: 'Full ↔ Empty', say: 'Full and empty are opposites.' },
    ],
  },
  {
    id: 'transport', title: 'Vehicles', emoji: '🚗', subtitle: 'Tap a vehicle to name it!',
    colorClass: 'from-slate-300 to-slate-500',
    items: [
      { emoji: '🚗', label: 'Car' }, { emoji: '🚌', label: 'Bus' }, { emoji: '🚆', label: 'Train' },
      { emoji: '✈️', label: 'Aeroplane' }, { emoji: '🚲', label: 'Bicycle' }, { emoji: '⛵', label: 'Boat' },
      { emoji: '🛺', label: 'Auto' }, { emoji: '🚚', label: 'Truck' }, { emoji: '🚀', label: 'Rocket' }, { emoji: '🚁', label: 'Helicopter' },
      { emoji: '🚐', label: 'Van' }, { emoji: '🏎️', label: 'Race Car' }, { emoji: '🚁', label: 'Plane' }, { emoji: '🚂', label: 'Engine' },
    ],
  },
  {
    id: 'helpers', title: 'Community Helpers', emoji: '👩‍⚕️', subtitle: 'Tap to learn who helps us!',
    colorClass: 'from-teal-300 to-teal-500',
    items: [
      { emoji: '👩‍⚕️', label: 'Doctor', say: 'A doctor helps us when we are sick.' },
      { emoji: '👩‍🏫', label: 'Teacher', say: 'A teacher helps us learn.' },
      { emoji: '👮', label: 'Police', say: 'The police keep us safe.' },
      { emoji: '👨‍🌾', label: 'Farmer', say: 'A farmer grows our food.' },
      { emoji: '👨‍🚒', label: 'Firefighter', say: 'A firefighter puts out fires.' },
      { emoji: '👨‍🍳', label: 'Chef', say: 'A chef cooks tasty food.' },
      { emoji: '👨‍✈️', label: 'Pilot', say: 'A pilot flies the aeroplane.' },
      { emoji: '📬', label: 'Postman', say: 'A postman brings our letters.' },
    ],
  },
  {
    id: 'habits', title: 'Good Habits', emoji: '🪥', subtitle: 'Tap to learn good habits!',
    colorClass: 'from-lime-300 to-green-500',
    items: [
      { emoji: '🪥', label: 'Brush teeth', say: 'Brush your teeth every morning and night.' },
      { emoji: '🧼', label: 'Wash hands', say: 'Wash your hands before you eat.' },
      { emoji: '🍎', label: 'Eat fruits', say: 'Eat fruits and vegetables to stay strong.' },
      { emoji: '💧', label: 'Drink water', say: 'Drink lots of water every day.' },
      { emoji: '🛌', label: 'Sleep early', say: 'Sleep early to grow well.' },
      { emoji: '🏃', label: 'Exercise', say: 'Play and exercise every day.' },
      { emoji: '🙏', label: 'Be polite', say: 'Say please and thank you.' },
      { emoji: '🤝', label: 'Share', say: 'Share and be kind to friends.' },
    ],
  },
  {
    id: 'wild', title: 'Wild Animals', emoji: '🦁', subtitle: 'Tap to meet wild animals!',
    colorClass: 'from-yellow-400 to-amber-600',
    items: [
      { emoji: '🦁', label: 'Lion' }, { emoji: '🐯', label: 'Tiger' }, { emoji: '🐘', label: 'Elephant' },
      { emoji: '🦒', label: 'Giraffe' }, { emoji: '🦓', label: 'Zebra' }, { emoji: '🐒', label: 'Monkey' },
      { emoji: '🐻', label: 'Bear' }, { emoji: '🦌', label: 'Deer' }, { emoji: '🦊', label: 'Fox' }, { emoji: '🐊', label: 'Crocodile' },
    ],
  },
  {
    id: 'water', title: 'Water Animals', emoji: '🐠', subtitle: 'Tap to meet water animals!',
    colorClass: 'from-cyan-300 to-blue-500',
    items: [
      { emoji: '🐟', label: 'Fish' }, { emoji: '🦈', label: 'Shark' }, { emoji: '🐳', label: 'Whale' },
      { emoji: '🐬', label: 'Dolphin' }, { emoji: '🐙', label: 'Octopus' }, { emoji: '🦀', label: 'Crab' },
      { emoji: '🐢', label: 'Turtle' }, { emoji: '🦭', label: 'Seal' }, { emoji: '🦐', label: 'Prawn' }, { emoji: '🐡', label: 'Pufferfish' },
    ],
  },
  {
    id: 'insects', title: 'Insects', emoji: '🦋', subtitle: 'Tap to learn the insects!',
    colorClass: 'from-emerald-300 to-teal-500',
    items: [
      { emoji: '🦋', label: 'Butterfly' }, { emoji: '🐝', label: 'Bee' }, { emoji: '🐜', label: 'Ant' },
      { emoji: '🐞', label: 'Ladybug' }, { emoji: '🕷️', label: 'Spider' }, { emoji: '🐌', label: 'Snail' },
      { emoji: '🐛', label: 'Caterpillar' }, { emoji: '🦟', label: 'Mosquito' }, { emoji: '🦗', label: 'Grasshopper' }, { emoji: '🪰', label: 'Housefly' },
    ],
  },
  {
    id: 'flowers', title: 'Flowers', emoji: '🌸', subtitle: 'Tap to name the flowers!',
    colorClass: 'from-pink-300 to-fuchsia-500',
    items: [
      { emoji: '🌹', label: 'Rose' }, { emoji: '🌻', label: 'Sunflower' }, { emoji: '🌷', label: 'Tulip' },
      { emoji: '🌺', label: 'Hibiscus' }, { emoji: '🪷', label: 'Lotus' }, { emoji: '🌼', label: 'Daisy' }, { emoji: '🌸', label: 'Blossom' }, { emoji: '💐', label: 'Bouquet' },
    ],
  },
  {
    id: 'family', title: 'My Family', emoji: '👨‍👩‍👧‍👦', subtitle: 'Tap to learn family members!',
    colorClass: 'from-rose-300 to-pink-500',
    items: [
      { emoji: '👩', label: 'Mother' }, { emoji: '👨', label: 'Father' }, { emoji: '👦', label: 'Brother' },
      { emoji: '👧', label: 'Sister' }, { emoji: '👴', label: 'Grandfather' }, { emoji: '👵', label: 'Grandmother' }, { emoji: '👶', label: 'Baby' },
    ],
  },
  {
    id: 'days', title: 'Days of the Week', emoji: '📅', subtitle: 'Tap each day to hear it!',
    colorClass: 'from-indigo-300 to-violet-500',
    items: [
      { emoji: '1️⃣', label: 'Sunday' }, { emoji: '2️⃣', label: 'Monday' }, { emoji: '3️⃣', label: 'Tuesday' },
      { emoji: '4️⃣', label: 'Wednesday' }, { emoji: '5️⃣', label: 'Thursday' }, { emoji: '6️⃣', label: 'Friday' }, { emoji: '7️⃣', label: 'Saturday' },
    ],
  },
  {
    id: 'seasons', title: 'Seasons', emoji: '🌦️', subtitle: 'Tap to learn the seasons!',
    colorClass: 'from-orange-300 to-amber-500',
    items: [
      { emoji: '☀️', label: 'Summer', say: 'Summer is hot and sunny.' },
      { emoji: '🌧️', label: 'Rainy', say: 'In the rainy season it rains a lot.' },
      { emoji: '❄️', label: 'Winter', say: 'Winter is cold. We wear warm clothes.' },
      { emoji: '🌸', label: 'Spring', say: 'In spring, flowers bloom.' },
      { emoji: '🍂', label: 'Autumn', say: 'In autumn, leaves fall from trees.' },
    ],
  },
  {
    id: 'national', title: 'National Symbols of India', emoji: '🇮🇳', subtitle: 'Tap to learn India’s symbols!',
    colorClass: 'from-orange-400 to-green-600',
    items: [
      { emoji: '🇮🇳', label: 'National Flag', say: 'The Tiranga is our national flag.' },
      { emoji: '🐯', label: 'National Animal', say: 'The tiger is our national animal.' },
      { emoji: '🦚', label: 'National Bird', say: 'The peacock is our national bird.' },
      { emoji: '🪷', label: 'National Flower', say: 'The lotus is our national flower.' },
      { emoji: '🥭', label: 'National Fruit', say: 'The mango is our national fruit.' },
      { emoji: '🌳', label: 'National Tree', say: 'The banyan tree is our national tree.' },
      { emoji: '🏑', label: 'National Sport', say: 'Hockey is loved across India.' },
    ],
  },
  {
    id: 'festivals', title: 'Festivals of India', emoji: '🪔', subtitle: 'Tap to learn our festivals!',
    colorClass: 'from-amber-400 to-rose-500',
    items: [
      { emoji: '🪔', label: 'Diwali', say: 'Diwali is the festival of lights.' },
      { emoji: '🎨', label: 'Holi', say: 'Holi is the festival of colours.' },
      { emoji: '🌙', label: 'Eid', say: 'Eid is a happy festival with yummy food.' },
      { emoji: '🎄', label: 'Christmas', say: 'On Christmas we decorate a tree.' },
      { emoji: '🍚', label: 'Pongal', say: 'Pongal is a harvest festival.' },
      { emoji: '🧵', label: 'Raksha Bandhan', say: 'Sisters tie a rakhi on Raksha Bandhan.' },
    ],
  },
  // ── Indian languages — the script character shows big, romanised sound spoken ──
  {
    id: 'hindi-swar', title: 'Hindi Varnamala — Swar (Vowels)', emoji: 'अ', subtitle: 'Tap each Hindi vowel to hear it!',
    colorClass: 'from-orange-400 to-red-500',
    items: [
      { emoji: 'अ', label: 'a', say: 'a' }, { emoji: 'आ', label: 'aa', say: 'aa' }, { emoji: 'इ', label: 'i', say: 'i' },
      { emoji: 'ई', label: 'ee', say: 'ee' }, { emoji: 'उ', label: 'u', say: 'u' }, { emoji: 'ऊ', label: 'oo', say: 'oo' },
      { emoji: 'ए', label: 'e', say: 'e' }, { emoji: 'ऐ', label: 'ai', say: 'ai' }, { emoji: 'ओ', label: 'o', say: 'o' },
      { emoji: 'औ', label: 'au', say: 'au' }, { emoji: 'अं', label: 'am', say: 'am' }, { emoji: 'अः', label: 'ah', say: 'ah' },
    ],
  },
  {
    id: 'hindi-vyanjan', title: 'Hindi Varnamala — Vyanjan (Consonants)', emoji: 'क', subtitle: 'Tap each Hindi consonant to hear it!',
    colorClass: 'from-rose-400 to-orange-500',
    items: ['क ka', 'ख kha', 'ग ga', 'घ gha', 'च cha', 'छ chha', 'ज ja', 'झ jha', 'ट ta', 'ठ tha', 'ड da', 'ढ dha', 'ण na', 'त ta', 'थ tha', 'द da', 'ध dha', 'न na', 'प pa', 'फ pha', 'ब ba', 'भ bha', 'म ma', 'य ya', 'र ra', 'ल la', 'व va', 'श sha', 'ष shha', 'स sa', 'ह ha', 'क्ष ksha', 'त्र tra', 'ज्ञ gya']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'hindi-numbers', title: 'Hindi Numbers (१–१०)', emoji: '१', subtitle: 'Tap each Hindi number to count!',
    colorClass: 'from-amber-400 to-orange-600',
    items: [
      { emoji: '१', label: '1 — ek', say: 'ek, one' }, { emoji: '२', label: '2 — do', say: 'do, two' }, { emoji: '३', label: '3 — teen', say: 'teen, three' },
      { emoji: '४', label: '4 — chaar', say: 'chaar, four' }, { emoji: '५', label: '5 — paanch', say: 'paanch, five' }, { emoji: '६', label: '6 — chhah', say: 'chhah, six' },
      { emoji: '७', label: '7 — saat', say: 'saat, seven' }, { emoji: '८', label: '8 — aath', say: 'aath, eight' }, { emoji: '९', label: '9 — nau', say: 'nau, nine' },
      { emoji: '१०', label: '10 — das', say: 'das, ten' },
    ],
  },
  {
    id: 'tamil-vowels', title: 'Tamil Vowels (உயிரெழுத்து)', emoji: 'அ', subtitle: 'Tap each Tamil vowel to hear it!',
    colorClass: 'from-yellow-400 to-amber-600',
    items: ['அ a', 'ஆ aa', 'இ i', 'ஈ ee', 'உ u', 'ஊ oo', 'எ e', 'ஏ ae', 'ஐ ai', 'ஒ o', 'ஓ oo', 'ஔ au']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'telugu-vowels', title: 'Telugu Vowels (అచ్చులు)', emoji: 'అ', subtitle: 'Tap each Telugu vowel to hear it!',
    colorClass: 'from-lime-400 to-green-600',
    items: ['అ a', 'ఆ aa', 'ఇ i', 'ఈ ee', 'ఉ u', 'ఊ oo', 'ఎ e', 'ఏ ae', 'ఐ ai', 'ఒ o', 'ఓ oo', 'ఔ au']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'kannada-vowels', title: 'Kannada Vowels (ಸ್ವರಗಳು)', emoji: 'ಅ', subtitle: 'Tap each Kannada vowel to hear it!',
    colorClass: 'from-teal-400 to-cyan-600',
    items: ['ಅ a', 'ಆ aa', 'ಇ i', 'ಈ ee', 'ಉ u', 'ಊ oo', 'ಎ e', 'ಏ ae', 'ಐ ai', 'ಒ o', 'ಓ oo', 'ಔ au']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'tamil-consonants', title: 'Tamil Consonants (மெய்யெழுத்து)', emoji: 'க', subtitle: 'Tap each Tamil consonant to hear it!',
    colorClass: 'from-amber-400 to-yellow-600',
    items: ['க ka', 'ங nga', 'ச cha', 'ஞ nya', 'ட ta', 'ண Na', 'த tha', 'ந na', 'ப pa', 'ம ma', 'ய ya', 'ர ra', 'ல la', 'வ va', 'ழ zha', 'ள La', 'ற Ra', 'ன na']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'telugu-consonants', title: 'Telugu Consonants (హల్లులు)', emoji: 'క', subtitle: 'Tap each Telugu consonant to hear it!',
    colorClass: 'from-green-400 to-lime-600',
    items: ['క ka', 'ఖ kha', 'గ ga', 'ఘ gha', 'చ cha', 'ఛ chha', 'జ ja', 'ఝ jha', 'ట ta', 'ఠ tha', 'డ da', 'ఢ dha', 'ణ Na', 'త ta', 'థ tha', 'ద da', 'ధ dha', 'న na', 'ప pa', 'ఫ pha', 'బ ba', 'భ bha', 'మ ma', 'య ya', 'ర ra', 'ల la', 'వ va', 'శ sha', 'ష shha', 'స sa', 'హ ha', 'ళ La']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
  {
    id: 'kannada-consonants', title: 'Kannada Consonants (ವ್ಯಂಜನಗಳು)', emoji: 'ಕ', subtitle: 'Tap each Kannada consonant to hear it!',
    colorClass: 'from-cyan-400 to-teal-600',
    items: ['ಕ ka', 'ಖ kha', 'ಗ ga', 'ಘ gha', 'ಚ cha', 'ಛ chha', 'ಜ ja', 'ಝ jha', 'ಟ ta', 'ಠ tha', 'ಡ da', 'ಢ dha', 'ಣ Na', 'ತ ta', 'ಥ tha', 'ದ da', 'ಧ dha', 'ನ na', 'ಪ pa', 'ಫ pha', 'ಬ ba', 'ಭ bha', 'ಮ ma', 'ಯ ya', 'ರ ra', 'ಲ la', 'ವ va', 'ಶ sha', 'ಷ shha', 'ಸ sa', 'ಹ ha', 'ಳ La']
      .map((s) => { const [ch, rom] = s.split(' '); return { emoji: ch, label: rom, say: rom }; }),
  },
];

export function findLearnTopic(id?: string): LearnTopic | undefined {
  return LEARN_TOPICS.find((t) => t.id === id);
}
