/**
 * Writing prompts — 30 per level. AI feedback via /api/tutor (no client AI keys).
 */
import type { Level } from './readingData';

export interface WritingPrompt {
  id: number;
  topic: string;
  hint: string;
  minWords: number;
}

export const writingBasic: WritingPrompt[] = [
  { id: 1,  topic: 'Write about your best friend.', hint: 'Start with "My best friend is ___."', minWords: 30 },
  { id: 2,  topic: 'Describe your favourite toy.', hint: 'Colour, shape, how you play with it.', minWords: 30 },
  { id: 3,  topic: 'What is your favourite food?', hint: 'How does it look, taste, smell?', minWords: 30 },
  { id: 4,  topic: 'Write about a happy day.', hint: 'Who, what, where, how you felt.', minWords: 40 },
  { id: 5,  topic: 'Describe your pet or one you want.', hint: 'Looks, food, things you do together.', minWords: 40 },
  { id: 6,  topic: 'What do you do on a rainy day?', hint: 'Paper boats, hot tea, indoor games.', minWords: 35 },
  { id: 7,  topic: 'Write about your favourite game.', hint: 'Where you play, with whom, the rules.', minWords: 40 },
  { id: 8,  topic: 'Describe your classroom.', hint: 'How many students, walls, where you sit.', minWords: 40 },
  { id: 9,  topic: 'What is your favourite colour?', hint: 'Name 3 things of that colour.', minWords: 30 },
  { id: 10, topic: 'A time you helped someone.', hint: 'Who, what you did, how it felt.', minWords: 40 },
  { id: 11, topic: 'Describe your favourite festival.', hint: 'When, how you celebrate, special food.', minWords: 40 },
  { id: 12, topic: 'My favourite teacher.', hint: 'Subject, how she/he teaches, why you like.', minWords: 40 },
  { id: 13, topic: 'A trip with my family.', hint: 'Place, what you saw, what you ate.', minWords: 45 },
  { id: 14, topic: 'My favourite season.', hint: 'Summer, winter, monsoon — and why.', minWords: 35 },
  { id: 15, topic: 'What I want to be when I grow up.', hint: 'Job, why you like it, what you would do.', minWords: 40 },
  { id: 16, topic: 'Describe a beautiful place you visited.', hint: 'Park, beach, hill — what made it special.', minWords: 40 },
  { id: 17, topic: 'My morning routine.', hint: 'Wake up, brush, breakfast, school.', minWords: 40 },
  { id: 18, topic: 'A funny incident at school.', hint: 'What happened, why everyone laughed.', minWords: 40 },
  { id: 19, topic: 'Describe your mother.', hint: 'How she looks, what she does, why you love her.', minWords: 40 },
  { id: 20, topic: 'My favourite cartoon.', hint: 'Name the show, main character, why funny.', minWords: 40 },
  { id: 21, topic: 'Write about a birthday party.', hint: 'Whose, what gift, what you ate.', minWords: 45 },
  { id: 22, topic: 'A new friend I made.', hint: 'Where you met, what they like, plans together.', minWords: 40 },
  { id: 23, topic: 'My favourite book.', hint: 'Title, what it is about, why you liked it.', minWords: 40 },
  { id: 24, topic: 'A day at the zoo.', hint: 'Animals seen, favourite, food you ate.', minWords: 45 },
  { id: 25, topic: 'Things I like about my home.', hint: 'Rooms, family, garden, special corner.', minWords: 40 },
  { id: 26, topic: 'My grandfather or grandmother.', hint: 'Stories they tell, food they make, time together.', minWords: 40 },
  { id: 27, topic: 'A picnic with my class.', hint: 'Where, what games, what food.', minWords: 45 },
  { id: 28, topic: 'My favourite fruit.', hint: 'Colour, taste, when you eat it most.', minWords: 30 },
  { id: 29, topic: 'A rainy day adventure.', hint: 'Got wet, paper boats, drying clothes.', minWords: 45 },
  { id: 30, topic: 'Why I love my school.', hint: 'Teachers, friends, subjects, activities.', minWords: 45 },
];

export const writingIntermediate: WritingPrompt[] = [
  { id: 1, topic: 'Write a letter to your future self at 25.', hint: 'Open "Dear me," — 2 paragraphs of advice.', minWords: 80 },
  { id: 2, topic: 'Describe a memorable holiday or trip.', hint: 'What you saw, heard, smelled, felt.', minWords: 100 },
  { id: 3, topic: 'If you had a superpower, what and why?', hint: 'Pick ONE and show responsibility.', minWords: 90 },
  { id: 4, topic: 'A short story about a lost puppy.', hint: 'Beginning → problem → solution → happy end.', minWords: 120 },
  { id: 5, topic: 'Why is it important to save water?', hint: 'Use "Firstly, Secondly, Lastly."', minWords: 100 },
  { id: 6, topic: 'Describe your ideal school.', hint: 'Teaching style, subjects, facilities.', minWords: 100 },
  { id: 7, topic: 'A person you admire.', hint: 'Family, teacher, athlete, freedom fighter.', minWords: 100 },
  { id: 8, topic: 'One change you want in your town.', hint: 'Problem + realistic solution.', minWords: 100 },
  { id: 9, topic: 'Diary entry of your first day at a new school.', hint: 'Date, "Dear Diary," — be honest.', minWords: 100 },
  { id: 10, topic: 'What does friendship mean to you?', hint: 'Define with examples.', minWords: 100 },
  { id: 11, topic: 'A leader you respect.', hint: 'Their actions and what we can learn.', minWords: 100 },
  { id: 12, topic: 'My favourite festival and why.', hint: 'Traditions, food, family memories.', minWords: 100 },
  { id: 13, topic: 'An informal letter to your cousin.', hint: 'Format: address, date, "Dear Cousin," body, close.', minWords: 100 },
  { id: 14, topic: 'A story that teaches kindness.', hint: 'Make up a character who learns kindness.', minWords: 120 },
  { id: 15, topic: 'Why exercise is important for students.', hint: 'Physical, mental, academic benefits.', minWords: 100 },
  { id: 16, topic: 'An adventure I would love to have.', hint: 'Mountain, jungle, ocean — describe vividly.', minWords: 110 },
  { id: 17, topic: 'My experience of a science exhibition.', hint: 'What you made, audience reaction.', minWords: 100 },
  { id: 18, topic: 'Diary entry after winning a competition.', hint: 'How you prepared, how you felt.', minWords: 100 },
  { id: 19, topic: 'Describe a busy market.', hint: 'Sights, sounds, smells, people.', minWords: 110 },
  { id: 20, topic: 'A book that changed me.', hint: 'Title, what it taught you.', minWords: 110 },
  { id: 21, topic: 'Importance of reading newspapers.', hint: 'Knowledge, vocabulary, current events.', minWords: 100 },
  { id: 22, topic: 'A scary experience.', hint: 'Build suspense, then the resolution.', minWords: 120 },
  { id: 23, topic: 'My favourite hobby and why.', hint: 'How you started, what you enjoy.', minWords: 100 },
  { id: 24, topic: 'A historical place I visited.', hint: 'Where, history, what impressed you.', minWords: 110 },
  { id: 25, topic: 'Notice writing — school annual day.', hint: 'Date, time, venue, who in charge.', minWords: 60 },
  { id: 26, topic: 'A dialogue between two friends about exams.', hint: 'Use direct speech and turn-taking.', minWords: 110 },
  { id: 27, topic: 'A speech for World Environment Day.', hint: 'Open with greeting, 3 actions, close with call.', minWords: 110 },
  { id: 28, topic: 'My pet — joys and responsibilities.', hint: 'Why pets are special and care needed.', minWords: 110 },
  { id: 29, topic: 'A folk tale from my region.', hint: 'Retell it in your own words with a moral.', minWords: 120 },
  { id: 30, topic: 'My dream career.', hint: 'Job, why it appeals, how to get there.', minWords: 100 },
];

export const writingAdvanced: WritingPrompt[] = [
  { id: 1, topic: 'Discuss the importance of renewable energy.', hint: 'Introduction → arguments + evidence → conclusion.', minWords: 220 },
  { id: 2, topic: 'Should homework be banned? For AND against.', hint: 'Balanced structure: pros, cons, your stance.', minWords: 220 },
  { id: 3, topic: 'Short story teaching honesty.', hint: 'Character, conflict, climax, resolution. Show don\'t tell.', minWords: 250 },
  { id: 4, topic: 'Technology in modern education — helpful or harmful?', hint: 'Both sides + AI tutors, distraction, accessibility.', minWords: 240 },
  { id: 5, topic: 'What does freedom mean to you?', hint: 'Personal → societal → philosophical.', minWords: 230 },
  { id: 6, topic: 'Letter to editor about garbage in your locality.', hint: 'Formal format: address, date, subject, close.', minWords: 220 },
  { id: 7, topic: 'Three laws you\'d change as PM for a day.', hint: 'Education, environment, fairness. Justify each.', minWords: 240 },
  { id: 8, topic: 'Social media and young people\'s mental health.', hint: 'Statistics, screen time, comparison, validation.', minWords: 250 },
  { id: 9, topic: 'Speech for School Captain elections.', hint: 'Hook → "Friends," → 3 changes → strong close.', minWords: 230 },
  { id: 10, topic: 'Most important lesson life taught you.', hint: 'Tell specific story → reflect on impact.', minWords: 230 },
  { id: 11, topic: 'Analytical paragraph: women in Indian sports.', hint: 'Data + examples + conclusion.', minWords: 200 },
  { id: 12, topic: 'Character sketch of a fictional villain.', hint: 'Appearance, personality, motivation, downfall.', minWords: 220 },
  { id: 13, topic: 'Argumentative essay: AI in classrooms.', hint: 'Two arguments for, one against, refuted.', minWords: 250 },
  { id: 14, topic: 'Formal letter to municipal commissioner.', hint: 'Problem (water leak), request, polite closing.', minWords: 220 },
  { id: 15, topic: 'Diary entry: the day my parents argued.', hint: 'Honest emotion, observation, your feelings.', minWords: 220 },
  { id: 16, topic: 'Story: A stranger\'s kindness changed my life.', hint: 'Setting → encounter → twist → impact.', minWords: 260 },
  { id: 17, topic: 'Discuss censorship in literature.', hint: 'Free expression vs. social responsibility.', minWords: 240 },
  { id: 18, topic: 'Effects of urbanisation on Indian villages.', hint: 'Migration, culture, economy, environment.', minWords: 240 },
  { id: 19, topic: 'Speech: 100 years of cinema.', hint: 'Hook → milestones → cultural role → call.', minWords: 240 },
  { id: 20, topic: 'Article: importance of mental health awareness.', hint: 'Statistics, stigma, solutions.', minWords: 240 },
  { id: 21, topic: 'A review of your favourite book.', hint: 'Theme, characters, your verdict.', minWords: 220 },
  { id: 22, topic: 'Persuasive essay: plastic ban.', hint: 'Convince a sceptic with hard facts.', minWords: 240 },
  { id: 23, topic: 'Imagine waking up 100 years from now.', hint: 'Describe society, tech, your role.', minWords: 240 },
  { id: 24, topic: 'Analytical paragraph: a poem you love.', hint: 'Theme, imagery, message — quote lines.', minWords: 220 },
  { id: 25, topic: 'Debate: science vs. arts.', hint: 'Acknowledge both, defend your side.', minWords: 240 },
  { id: 26, topic: 'A profile of a forgotten freedom fighter.', hint: 'Their work, sacrifice, legacy.', minWords: 240 },
  { id: 27, topic: 'Speech on climate action by teenagers.', hint: 'Inspire action — concrete steps.', minWords: 230 },
  { id: 28, topic: 'A short story with a twist ending.', hint: 'Set expectation, then break it.', minWords: 260 },
  { id: 29, topic: 'Editorial: why arts matter in school curriculum.', hint: 'Make a strong case in 3 paragraphs.', minWords: 240 },
  { id: 30, topic: 'Reflective essay: what failure taught me.', hint: 'Specific failure → lessons → growth.', minWords: 240 },
];

export function getWritingByLevel(level: Level): WritingPrompt[] {
  if (level === 'basic') return writingBasic;
  if (level === 'intermediate') return writingIntermediate;
  return writingAdvanced;
}
