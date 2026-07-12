/**
 * Syllab Junior — short moral stories (Panchatantra / Aesop favourites) retold
 * in simple original wording for young readers. Each can be read aloud (Web
 * Speech). Original retellings, no copyrighted text.
 */
export interface MoralStory {
  id: string;
  title: string;
  emoji: string;
  lines: string[];
  moral: string;
}

export const MORAL_STORIES: MoralStory[] = [
  {
    id: 'thirsty-crow', title: 'The Thirsty Crow', emoji: '🐦',
    lines: [
      'On a hot day, a thirsty crow looked everywhere for water.',
      'At last it found a pot with a little water at the bottom.',
      'The crow could not reach the water with its beak.',
      'So the clever crow dropped small stones into the pot, one by one.',
      'The water rose up, and the happy crow drank it all.',
    ],
    moral: 'Where there is a will, there is a way.',
  },
  {
    id: 'lion-mouse', title: 'The Lion and the Mouse', emoji: '🦁',
    lines: [
      'A tiny mouse ran over a sleeping lion and woke him up.',
      'The angry lion caught the mouse, but the mouse begged, “Let me go, one day I will help you!”',
      'The lion laughed and set the little mouse free.',
      'Later the lion was caught in a hunter’s net.',
      'The little mouse came and chewed the net to set the lion free.',
    ],
    moral: 'Even the small can help the big. A kind deed is never wasted.',
  },
  {
    id: 'hare-tortoise', title: 'The Hare and the Tortoise', emoji: '🐢',
    lines: [
      'A fast hare made fun of a slow tortoise.',
      'The tortoise said, “Let us have a race!”',
      'The hare ran ahead, then took a nap, sure he would win.',
      'The tortoise kept walking slowly without stopping.',
      'The tortoise reached the finish line first and won the race!',
    ],
    moral: 'Slow and steady wins the race.',
  },
  {
    id: 'fox-grapes', title: 'The Fox and the Grapes', emoji: '🦊',
    lines: [
      'A hungry fox saw juicy grapes hanging high on a vine.',
      'He jumped again and again, but could not reach them.',
      'Tired and unable to get them, the fox walked away.',
      'He said, “Those grapes are sour anyway!”',
    ],
    moral: 'It is easy to dislike what we cannot have.',
  },
  {
    id: 'greedy-dog', title: 'The Greedy Dog', emoji: '🐶',
    lines: [
      'A dog found a juicy bone and ran to eat it near a river.',
      'On the bridge, he saw his own reflection in the water.',
      'He thought it was another dog with a bigger bone.',
      'He barked to grab that bone too — and his own bone fell into the river!',
    ],
    moral: 'Greed leads to loss. Be happy with what you have.',
  },
  {
    id: 'ant-grasshopper', title: 'The Ant and the Grasshopper', emoji: '🐜',
    lines: [
      'All summer, the ant worked hard storing food for winter.',
      'The grasshopper played and sang, and did not save any food.',
      'When cold winter came, the grasshopper had nothing to eat.',
      'The kind ant shared some food and taught him to plan ahead.',
    ],
    moral: 'Work hard today to be ready for tomorrow.',
  },
  {
    id: 'crow-fox', title: 'The Fox and the Crow', emoji: '🧀',
    lines: [
      'A crow sat on a tree with a piece of cheese in its beak.',
      'A clever fox wanted the cheese and said, “Please sing, your voice is so sweet!”',
      'The proud crow opened its beak to sing — and the cheese fell down.',
      'The fox grabbed the cheese and ran away.',
    ],
    moral: 'Do not trust flattery. Think before you act.',
  },
  {
    id: 'monkey-crocodile', title: 'The Monkey and the Crocodile', emoji: '🐊',
    lines: [
      'A monkey on a tree gave sweet fruits to a crocodile every day.',
      'They became good friends.',
      'The crocodile’s wife wanted to eat the monkey’s heart.',
      'The clever monkey said, “I left my heart on the tree!” and climbed up to safety.',
    ],
    moral: 'Use your wits, and choose your friends wisely.',
  },
  {
    id: 'boy-wolf', title: 'The Boy Who Cried Wolf', emoji: '🐺',
    lines: [
      'A shepherd boy shouted “Wolf! Wolf!” for fun many times.',
      'Each time, the villagers ran to help — but there was no wolf.',
      'One day a real wolf came, and the boy shouted for help.',
      'But no one believed him this time.',
    ],
    moral: 'Always tell the truth. No one trusts a liar.',
  },
  {
    id: 'golden-eggs', title: 'The Goose and the Golden Eggs', emoji: '🥚',
    lines: [
      'A farmer had a goose that laid one golden egg every day.',
      'He became rich, but he grew greedy and impatient.',
      'He cut open the goose to get all the eggs at once.',
      'But there were no eggs inside, and now the goose was gone.',
    ],
    moral: 'Greed can destroy what makes you happy.',
  },
];
