export interface AvatarReward {
  id: string;
  name: string;
  title: string;
  icon: string;
  description: string;
  unlockType: 'default' | 'xp' | 'streak' | 'mock_score' | 'skills';
  requiredXP?: number;
  requiredStreak?: number;
  requiredScore?: number;
  requiredSkillsCount?: number;
}

export const AVATAR_REWARDS: AvatarReward[] = [
  {
    id: 'starter',
    name: 'Starter Learner',
    title: 'The Beginner',
    icon: '🌱',
    description: 'Unlocked when you create your profile.',
    unlockType: 'default',
    requiredXP: 0,
  },
  {
    id: 'rocket_learner',
    name: 'Rocket Learner',
    title: 'The Achiever',
    icon: '🚀',
    description: 'Earn 100 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 100,
  },
  {
    id: 'book_hero',
    name: 'Book Hero',
    title: 'The Reader',
    icon: '📖',
    description: 'Earn 250 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 250,
  },
  {
    id: 'streak_star',
    name: 'Streak Star',
    title: 'The Consistent',
    icon: '🔥',
    description: 'Maintain a 7-day learning streak.',
    unlockType: 'streak',
    requiredStreak: 7,
  },
  {
    id: 'quiz_warrior',
    name: 'Quiz Warrior',
    title: 'The Fighter',
    icon: '🏆',
    description: 'Earn 500 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 500,
  },
  {
    id: 'code_ninja',
    name: 'Code Ninja',
    title: 'The Programmer',
    icon: '🥷',
    description: 'Complete 10 Skills Lab topics.',
    unlockType: 'skills',
    requiredSkillsCount: 10,
    requiredXP: 300,
  },
  {
    id: 'science_wizard',
    name: 'Science Wizard',
    title: 'The Explorer',
    icon: '🧪',
    description: 'Earn 750 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 750,
  },
  {
    id: 'math_champion',
    name: 'Math Champion',
    title: 'The Calculator',
    icon: '🧮',
    description: 'Earn 1000 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 1000,
  },
  {
    id: 'ai_builder',
    name: 'AI Builder',
    title: 'The Innovator',
    icon: '🤖',
    description: 'Earn 1500 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 1500,
  },
  {
    id: 'data_detective',
    name: 'Data Detective',
    title: 'The Analyst',
    icon: '📊',
    description: 'Complete 25 Skills Lab topics.',
    unlockType: 'skills',
    requiredSkillsCount: 25,
    requiredXP: 1000,
  },
  {
    id: 'space_explorer',
    name: 'Space Explorer',
    title: 'The Pioneer',
    icon: '🔭',
    description: 'Earn 2500 XP to unlock.',
    unlockType: 'xp',
    requiredXP: 2500,
  },
  {
    id: 'lab_genius',
    name: 'Lab Genius',
    title: 'The Master',
    icon: '⚗️',
    description: 'Complete 50 Skills Lab topics.',
    unlockType: 'skills',
    requiredSkillsCount: 50,
    requiredXP: 2000,
  },
];

export function isAvatarUnlocked(
  avatar: AvatarReward,
  stats: { xp: number; streak: number },
  totalSkillsCompleted: number,
): boolean {
  if (avatar.unlockType === 'default') return true;
  if (avatar.unlockType === 'streak' && avatar.requiredStreak !== undefined) {
    return stats.streak >= avatar.requiredStreak;
  }
  if (avatar.unlockType === 'skills' && avatar.requiredXP !== undefined && avatar.requiredSkillsCount !== undefined) {
    return stats.xp >= avatar.requiredXP && totalSkillsCompleted >= avatar.requiredSkillsCount;
  }
  if (avatar.requiredXP !== undefined) {
    return stats.xp >= avatar.requiredXP;
  }
  return false;
}
