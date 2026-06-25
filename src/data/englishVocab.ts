/** englishVocab.ts — idioms, proverbs, one-word substitutions, synonyms etc. */
export interface VocabItem { term: string; meaning: string; example: string; }
export interface VocabFaq { q: string; a: string; }
export interface VocabSet {
  slug: string; title: string; category: string; intro: string; items: VocabItem[]; faqs: VocabFaq[];
}
export const VOCAB_SETS: VocabSet[] = [
  {
    "slug": "idioms-and-phrases-set-1",
    "title": "Idioms and Phrases A-Z Set 1",
    "category": "Idioms",
    "intro": "Learn common English idioms and phrases used in everyday conversation. These expressions have meanings different from the literal words, making them essential for fluent English.",
    "items": [
      {
        "term": "A piece of cake",
        "meaning": "Something very easy to do",
        "example": "The exam was a piece of cake; I finished in 30 minutes."
      },
      {
        "term": "Break the ice",
        "meaning": "To initiate conversation or create comfort in an awkward situation",
        "example": "She broke the ice by telling a funny joke at the party."
      },
      {
        "term": "Burning the midnight oil",
        "meaning": "Working late into the night",
        "example": "Students are burning the midnight oil to prepare for JEE exams."
      },
      {
        "term": "Cry over spilled milk",
        "meaning": "To waste time on something that cannot be changed",
        "example": "It is no use crying over spilled milk; focus on your future."
      },
      {
        "term": "Cut to the chase",
        "meaning": "To get to the main point without unnecessary details",
        "example": "Let us cut to the chase and discuss the important matters."
      },
      {
        "term": "Down to earth",
        "meaning": "Practical and realistic; not pretentious",
        "example": "Despite his wealth, he remained down to earth and humble."
      },
      {
        "term": "Easier said than done",
        "meaning": "More difficult to do than to say",
        "example": "Losing weight is easier said than done without proper discipline."
      },
      {
        "term": "Every dog has its day",
        "meaning": "Everyone will get a chance to succeed at some point",
        "example": "Though he failed twice, every dog has its day; he finally succeeded."
      },
      {
        "term": "Face the music",
        "meaning": "To accept the consequences of one's actions",
        "example": "He had to face the music when his mistakes were discovered."
      },
      {
        "term": "Get your act together",
        "meaning": "To organize yourself and start being productive",
        "example": "If you want to pass, you need to get your act together."
      },
      {
        "term": "Give the benefit of the doubt",
        "meaning": "To assume someone is honest when uncertain",
        "example": "I will give him the benefit of the doubt; he might have a reason."
      },
      {
        "term": "Go the extra mile",
        "meaning": "To make additional effort beyond what is required",
        "example": "Good teachers go the extra mile to help their students succeed."
      },
      {
        "term": "Hit the books",
        "meaning": "To study hard",
        "example": "Students need to hit the books to score well in exams."
      },
      {
        "term": "Ignorance is bliss",
        "meaning": "Not knowing about problems makes you happier",
        "example": "Sometimes ignorance is bliss, as too much worry is unhealthy."
      },
      {
        "term": "In the same boat",
        "meaning": "In the same difficult situation as someone else",
        "example": "We are all in the same boat during these challenging times."
      }
    ],
    "faqs": [
      {
        "q": "What is an idiom?",
        "a": "An idiom is a phrase or expression whose meaning cannot be understood from the individual words. For example, raining cats and dogs does not mean animals are falling from the sky, but rather it is raining very heavily."
      },
      {
        "q": "Why should I learn idioms?",
        "a": "Learning idioms helps you speak and understand English more naturally. Native speakers use idioms frequently in conversation, so knowing them improves your fluency and comprehension."
      }
    ]
  },
  {
    "slug": "idioms-and-phrases-set-2",
    "title": "Idioms and Phrases A-Z Set 2",
    "category": "Idioms",
    "intro": "Continue your journey through commonly used English idioms and phrases. Mastering these expressions will significantly improve your conversational English skills.",
    "items": [
      {
        "term": "Jump on the bandwagon",
        "meaning": "To join a popular trend or activity",
        "example": "Many students jumped on the bandwagon when coding became popular."
      },
      {
        "term": "Keep your chin up",
        "meaning": "To stay positive despite difficulties",
        "example": "Keep your chin up; the results will improve with more practice."
      },
      {
        "term": "Let the cat out of the bag",
        "meaning": "To reveal a secret",
        "example": "She accidentally let the cat out of the bag about the surprise party."
      },
      {
        "term": "Make a long story short",
        "meaning": "To summarize or shorten an explanation",
        "example": "Make a long story short: he studied hard and got excellent marks."
      },
      {
        "term": "Miss the boat",
        "meaning": "To lose an opportunity",
        "example": "If you do not apply now, you will miss the boat for this scholarship."
      },
      {
        "term": "No pain, no gain",
        "meaning": "Hard work and sacrifice are necessary for success",
        "example": "No pain, no gain; you must study consistently to excel."
      },
      {
        "term": "On cloud nine",
        "meaning": "Extremely happy or in love",
        "example": "She has been on cloud nine since she got admission to her dream college."
      },
      {
        "term": "Once in a blue moon",
        "meaning": "Very rarely; seldom",
        "example": "I visit my hometown once in a blue moon due to my busy schedule."
      },
      {
        "term": "Out of the frying pan into the fire",
        "meaning": "Going from a bad situation to an even worse one",
        "example": "He quit his job hastily and fell out of the frying pan into the fire."
      },
      {
        "term": "Put all eggs in one basket",
        "meaning": "To risk everything on one possibility",
        "example": "It is unwise to put all your eggs in one basket; diversify your interests."
      },
      {
        "term": "Rain or shine",
        "meaning": "In any circumstances; no matter what",
        "example": "We will complete this project rain or shine, without delays."
      },
      {
        "term": "Rub someone the wrong way",
        "meaning": "To irritate or annoy someone",
        "example": "His arrogant attitude rubbed everyone the wrong way."
      },
      {
        "term": "Seize the day",
        "meaning": "To make the most of the present moment",
        "example": "Seize the day and make the most of your student years."
      },
      {
        "term": "Spill the beans",
        "meaning": "To reveal a secret or tell the truth",
        "example": "Do not spill the beans about the surprise; keep it confidential."
      },
      {
        "term": "Take it with a grain of salt",
        "meaning": "To not believe something completely; treat as exaggeration",
        "example": "Take his promises with a grain of salt; he has broken them before."
      }
    ],
    "faqs": [
      {
        "q": "Are idioms the same in all English-speaking countries?",
        "a": "No, different English-speaking regions have their own unique idioms. For example, British English and American English have some different expressions, but many idioms are universal."
      },
      {
        "q": "How can I remember idioms easily?",
        "a": "Associate idioms with stories or images. For example, visualize cats and dogs falling from the sky when learning raining cats and dogs. Practice using them in sentences regularly."
      }
    ]
  },
  {
    "slug": "idioms-and-phrases-set-3",
    "title": "Idioms and Phrases A-Z Set 3",
    "category": "Idioms",
    "intro": "Expand your idiom vocabulary with this final set of commonly used English expressions. These phrases appear frequently in literature, conversations, and professional settings.",
    "items": [
      {
        "term": "The ball is in your court",
        "meaning": "It is your turn to make a decision or take action",
        "example": "I have presented my offer; now the ball is in your court."
      },
      {
        "term": "The best of both worlds",
        "meaning": "The advantages of two different situations",
        "example": "This job gives me the best of both worlds: good pay and flexible hours."
      },
      {
        "term": "The tip of the iceberg",
        "meaning": "A small visible part of a much larger problem",
        "example": "The corruption scandal is just the tip of the iceberg."
      },
      {
        "term": "Think outside the box",
        "meaning": "To think creatively and unconventionally",
        "example": "To solve this problem, we need to think outside the box."
      },
      {
        "term": "Time will tell",
        "meaning": "The future will reveal the truth",
        "example": "Whether this decision was right or wrong, time will tell."
      },
      {
        "term": "Too good to be true",
        "meaning": "Seems excellent but is probably false or unlikely",
        "example": "An easy way to get rich sounds too good to be true."
      },
      {
        "term": "Under the weather",
        "meaning": "Feeling sick or unwell",
        "example": "I am feeling under the weather today; I might skip class."
      },
      {
        "term": "Up in arms",
        "meaning": "Angry or upset about something",
        "example": "Students were up in arms when exam dates were suddenly changed."
      },
      {
        "term": "Walk in the park",
        "meaning": "Something very easy",
        "example": "This assignment is a walk in the park compared to the last one."
      },
      {
        "term": "Wear your heart on your sleeve",
        "meaning": "To show your emotions openly",
        "example": "She wears her heart on her sleeve and is very emotional."
      },
      {
        "term": "Weather the storm",
        "meaning": "To survive a difficult period",
        "example": "The company managed to weather the storm during the economic crisis."
      },
      {
        "term": "What goes around comes around",
        "meaning": "Karma; actions have consequences",
        "example": "What goes around comes around; treat others how you wish to be treated."
      },
      {
        "term": "When all is said and done",
        "meaning": "At the end; after everything is considered",
        "example": "When all is said and done, education is the most valuable investment."
      },
      {
        "term": "Win-win situation",
        "meaning": "A situation beneficial to both parties",
        "example": "This partnership is a win-win situation for both companies."
      },
      {
        "term": "You cannot judge a book by its cover",
        "meaning": "Appearance is not a true reflection of inner quality",
        "example": "He looks shy, but you cannot judge a book by its cover; he is very talented."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between an idiom and a proverb?",
        "a": "Idioms are phrases with figurative meanings used in casual language. Proverbs are traditional sayings that express wisdom or general truths and are often used to teach lessons."
      },
      {
        "q": "Should I use idioms in formal writing?",
        "a": "Use idioms cautiously in formal writing. Some idioms are acceptable in professional contexts, but it is usually safer to use clear, literal language in formal documents."
      }
    ]
  },
  {
    "slug": "idioms-about-animals",
    "title": "Idioms About Animals",
    "category": "Idioms",
    "intro": "Animals feature prominently in English idioms and expressions. Learn these animal-related phrases to understand figurative language better and speak more naturally.",
    "items": [
      {
        "term": "A bird in the hand is worth two in the bush",
        "meaning": "Something you have is better than something you might get",
        "example": "A secure job now is a bird in the hand; do not risk it for uncertain opportunities."
      },
      {
        "term": "Let sleeping dogs lie",
        "meaning": "Do not stir up old problems or conflicts",
        "example": "I will let sleeping dogs lie and not mention his past mistakes."
      },
      {
        "term": "Raining cats and dogs",
        "meaning": "Raining very heavily",
        "example": "It has been raining cats and dogs since morning; stay indoors."
      },
      {
        "term": "Work like a dog",
        "meaning": "To work very hard",
        "example": "She works like a dog to support her family."
      },
      {
        "term": "Busy as a bee",
        "meaning": "Very busy and active",
        "example": "During exam season, students are busy as bees with their studies."
      },
      {
        "term": "Stubborn as a mule",
        "meaning": "Very stubborn and unwilling to change",
        "example": "He is stubborn as a mule and will not listen to advice."
      },
      {
        "term": "Sly as a fox",
        "meaning": "Clever and cunning",
        "example": "The detective was sly as a fox in solving the mystery."
      },
      {
        "term": "Quiet as a mouse",
        "meaning": "Very quiet and silent",
        "example": "During the exam, all students remained quiet as a mouse."
      },
      {
        "term": "Gentle as a dove",
        "meaning": "Very gentle and peaceful",
        "example": "Her voice is gentle as a dove, soothing to listen to."
      },
      {
        "term": "Eat like a horse",
        "meaning": "To eat a lot",
        "example": "Growing teenagers eat like a horse; grocery bills are very high."
      },
      {
        "term": "Have a cow",
        "meaning": "To be very angry or upset",
        "example": "Your parents will have a cow if you fail your exams."
      },
      {
        "term": "More than one way to skin a cat",
        "meaning": "Multiple solutions to a problem",
        "example": "There is more than one way to skin a cat; try a different approach."
      },
      {
        "term": "Pig out",
        "meaning": "To eat a lot of food greedily",
        "example": "We pigged out at the restaurant yesterday; it was delicious."
      },
      {
        "term": "Go ape",
        "meaning": "To become very excited or angry",
        "example": "The fans went ape when their team scored the winning goal."
      },
      {
        "term": "Chicken out",
        "meaning": "To lose your courage and back out",
        "example": "He chickened out of the dare at the last moment."
      }
    ],
    "faqs": [
      {
        "q": "Why do so many idioms involve animals?",
        "a": "Throughout history, humans have observed animal behaviors and compared them to human characteristics. This has led to the creation of idioms that use animals as metaphors for human traits and actions."
      },
      {
        "q": "Are animal idioms the same across different cultures?",
        "a": "No, different cultures have different animal idioms based on their local animals and cultural beliefs. For example, some Asian cultures have idioms about tigers, while European cultures have idioms about different animals."
      }
    ]
  },
  {
    "slug": "idioms-about-time",
    "title": "Idioms About Time",
    "category": "Idioms",
    "intro": "Time-related idioms reflect the importance of time in human life and language. Understanding these expressions helps you discuss time management and deadlines effectively.",
    "items": [
      {
        "term": "The eleventh hour",
        "meaning": "The last possible moment before something happens",
        "example": "He submitted his assignment at the eleventh hour, just before the deadline."
      },
      {
        "term": "Beat the clock",
        "meaning": "To finish something before time runs out",
        "example": "We beat the clock and completed the project before the deadline."
      },
      {
        "term": "Against all odds",
        "meaning": "Despite very difficult circumstances",
        "example": "Against all odds, she succeeded in becoming a doctor."
      },
      {
        "term": "In the long run",
        "meaning": "Considering the future; eventually",
        "example": "Regular exercise is beneficial in the long run for your health."
      },
      {
        "term": "In the nick of time",
        "meaning": "At the last possible moment",
        "example": "The ambulance arrived in the nick of time to save his life."
      },
      {
        "term": "Kill time",
        "meaning": "To spend time doing something unimportant",
        "example": "I was early, so I killed time by reading magazines."
      },
      {
        "term": "Time is of the essence",
        "meaning": "Time is very important; hurry",
        "example": "For this medical emergency, time is of the essence."
      },
      {
        "term": "Before long",
        "meaning": "Soon; in the near future",
        "example": "The exam results will be announced before long."
      },
      {
        "term": "Time flies",
        "meaning": "Time passes quickly",
        "example": "Time flies when you are having fun; the vacation is already over."
      },
      {
        "term": "Around the clock",
        "meaning": "All day and all night continuously",
        "example": "Hospital staff work around the clock to care for patients."
      },
      {
        "term": "Behind schedule",
        "meaning": "Late; slower than planned",
        "example": "The construction project is behind schedule due to bad weather."
      },
      {
        "term": "Break new ground",
        "meaning": "To do something for the first time or innovatively",
        "example": "This research breaks new ground in medical science."
      },
      {
        "term": "In a jiffy",
        "meaning": "Very quickly; in a moment",
        "example": "I will finish this work in a jiffy and meet you soon."
      },
      {
        "term": "Once in a lifetime",
        "meaning": "An extremely rare opportunity",
        "example": "Getting into this top university is a once in a lifetime opportunity."
      },
      {
        "term": "The moment of truth",
        "meaning": "The critical moment when something important happens",
        "example": "The moment of truth arrived when results were announced."
      }
    ],
    "faqs": [
      {
        "q": "Why are so many English idioms related to time?",
        "a": "Time is a fundamental aspect of human experience. As people navigate work, deadlines, and life events, they naturally create expressions and idioms that reflect the importance and passage of time."
      },
      {
        "q": "How can idioms about time help with time management?",
        "a": "These idioms help you understand how English speakers conceptualize and discuss time. They also provide useful phrases for talking about schedules, deadlines, and planning in professional and academic settings."
      }
    ]
  },
  {
    "slug": "common-english-proverbs-set-1",
    "title": "Common English Proverbs Set 1",
    "category": "Proverbs",
    "intro": "Proverbs are traditional sayings that express universal truths and wisdom. These common English proverbs have been used for centuries to teach lessons and guide behavior.",
    "items": [
      {
        "term": "All that glitters is not gold",
        "meaning": "Appearance can be deceiving; not everything that looks good is valuable",
        "example": "He appeared to be a good friend, but all that glitters is not gold; he betrayed me."
      },
      {
        "term": "An apple a day keeps the doctor away",
        "meaning": "Eating healthy food prevents illness",
        "example": "My grandmother always says an apple a day keeps the doctor away."
      },
      {
        "term": "Do not judge a book by its cover",
        "meaning": "Do not form opinions based on appearance alone",
        "example": "The poor student scored the highest; do not judge a book by its cover."
      },
      {
        "term": "Practice makes perfect",
        "meaning": "Repeated practice leads to excellence",
        "example": "I will practice piano daily because practice makes perfect."
      },
      {
        "term": "The early bird catches the worm",
        "meaning": "Those who start early have advantages over others",
        "example": "Students who start studying early get better marks; the early bird catches the worm."
      },
      {
        "term": "Honesty is the best policy",
        "meaning": "Being truthful is the right approach",
        "example": "Tell the truth about your mistake; honesty is the best policy."
      },
      {
        "term": "Actions speak louder than words",
        "meaning": "What you do is more important than what you say",
        "example": "He claims to care, but actions speak louder than words."
      },
      {
        "term": "Rome was not built in a day",
        "meaning": "Great achievements take time",
        "example": "Do not expect instant success; Rome was not built in a day."
      },
      {
        "term": "What you sow, you shall reap",
        "meaning": "You receive the consequences of your actions",
        "example": "If you study hard, you will pass; what you sow, you shall reap."
      },
      {
        "term": "Two wrongs do not make a right",
        "meaning": "Responding to wrongdoing with wrongdoing is not justified",
        "example": "Retaliating against bullying with violence is wrong; two wrongs do not make a right."
      },
      {
        "term": "Knowledge is power",
        "meaning": "Understanding and learning give you strength and advantage",
        "example": "Invest in education because knowledge is power."
      },
      {
        "term": "Absence makes the heart grow fonder",
        "meaning": "Missing someone increases your affection for them",
        "example": "When I go home for holidays, absence makes the heart grow fonder."
      },
      {
        "term": "Better late than never",
        "meaning": "It is better to do something late than not at all",
        "example": "I apologize for the late reply, but better late than never."
      },
      {
        "term": "Do not put all eggs in one basket",
        "meaning": "Do not risk everything on one option",
        "example": "Invest in different sectors; do not put all eggs in one basket."
      },
      {
        "term": "Variety is the spice of life",
        "meaning": "Diversity and change make life interesting",
        "example": "Travel to different places; variety is the spice of life."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a proverb and an idiom?",
        "a": "Proverbs express wisdom or general truths and teach lessons, while idioms are figurative expressions used in everyday language. Proverbs are often older and more formal than idioms."
      },
      {
        "q": "Are English proverbs used in modern English?",
        "a": "Yes, proverbs are still widely used in modern English in conversations, literature, and professional settings. They remain relevant because they express timeless truths about human nature and behavior."
      }
    ]
  },
  {
    "slug": "common-english-proverbs-set-2",
    "title": "Common English Proverbs Set 2",
    "category": "Proverbs",
    "intro": "Continue exploring traditional English proverbs that have guided people for generations. These sayings offer practical wisdom applicable to modern life and relationships.",
    "items": [
      {
        "term": "A friend in need is a friend indeed",
        "meaning": "A true friend helps you in difficult times",
        "example": "When I was sick, she visited me daily; a friend in need is a friend indeed."
      },
      {
        "term": "No pain, no gain",
        "meaning": "Success requires hard work and sacrifice",
        "example": "To achieve your goals, you must work hard; no pain, no gain."
      },
      {
        "term": "Every cloud has a silver lining",
        "meaning": "Every difficult situation has a positive aspect",
        "example": "Though I failed the exam, every cloud has a silver lining; I learned from my mistakes."
      },
      {
        "term": "Slow and steady wins the race",
        "meaning": "Consistent effort is better than rushing",
        "example": "Do not hurry your studies; slow and steady wins the race."
      },
      {
        "term": "The pen is mightier than the sword",
        "meaning": "Words and knowledge are more powerful than violence",
        "example": "Education can change society; the pen is mightier than the sword."
      },
      {
        "term": "Do not count your chickens before they hatch",
        "meaning": "Do not assume success before it happens",
        "example": "Wait for the results before celebrating; do not count your chickens before they hatch."
      },
      {
        "term": "You cannot have your cake and eat it too",
        "meaning": "You cannot have two desirable but mutually exclusive things",
        "example": "You want both a high salary and easy work, but you cannot have your cake and eat it too."
      },
      {
        "term": "Once bitten, twice shy",
        "meaning": "After a bad experience, you are more cautious",
        "example": "He cheated on me once; now I am once bitten, twice shy."
      },
      {
        "term": "Money does not grow on trees",
        "meaning": "Money is not easy to obtain",
        "example": "Stop wasting money; it does not grow on trees."
      },
      {
        "term": "Prevention is better than cure",
        "meaning": "It is easier to prevent a problem than to fix it",
        "example": "Wash your hands regularly; prevention is better than cure."
      },
      {
        "term": "Do not put the cart before the horse",
        "meaning": "Do not do things in the wrong order",
        "example": "First finish school, then think of a career; do not put the cart before the horse."
      },
      {
        "term": "Birds of a feather flock together",
        "meaning": "Similar people tend to group together",
        "example": "All the sports enthusiasts sit together; birds of a feather flock together."
      },
      {
        "term": "Great minds think alike",
        "meaning": "Intelligent people often have similar ideas",
        "example": "We both had the same idea for the project; great minds think alike."
      },
      {
        "term": "Do not burn your bridges",
        "meaning": "Do not damage relationships that you might need later",
        "example": "Stay on good terms with your teachers; do not burn your bridges."
      },
      {
        "term": "Time and tide wait for no man",
        "meaning": "Time passes regardless of our wishes; do not delay",
        "example": "Submit your application now; time and tide wait for no man."
      }
    ],
    "faqs": [
      {
        "q": "Where do English proverbs come from?",
        "a": "English proverbs come from various sources including folk wisdom, religious texts, literature, and common life experiences. Many were passed down orally through generations before being written down."
      },
      {
        "q": "Can proverbs be interpreted differently?",
        "a": "Yes, proverbs can be applied to different situations and may have slightly different interpretations depending on context. However, their core message about universal truths usually remains consistent."
      }
    ]
  },
  {
    "slug": "one-word-substitution-set-1",
    "title": "One-Word Substitution Set 1",
    "category": "One-word Substitution",
    "intro": "One-word substitution exercises teach you to replace lengthy phrases with single words. This skill improves conciseness and enriches your vocabulary for competitive exams.",
    "items": [
      {
        "term": "Bibliophile",
        "meaning": "A person who loves to read and collect books",
        "example": "My brother is a bibliophile; his room is filled with books."
      },
      {
        "term": "Egotist",
        "meaning": "A person who is excessively self-centered",
        "example": "An egotist talks only about himself and ignores others."
      },
      {
        "term": "Philanthropist",
        "meaning": "A person who loves mankind and does charitable work",
        "example": "The philanthropist donated millions to build schools."
      },
      {
        "term": "Introvert",
        "meaning": "A person who is shy and prefers solitude",
        "example": "She is an introvert; she prefers reading alone to attending parties."
      },
      {
        "term": "Oxymoron",
        "meaning": "A combination of contradictory words",
        "example": "Bittersweet is an oxymoron combining opposite meanings."
      },
      {
        "term": "Anthology",
        "meaning": "A collection of poems, stories, or essays by various authors",
        "example": "This anthology contains works by famous Indian writers."
      },
      {
        "term": "Amnesty",
        "meaning": "A pardon granted by a government for political offenses",
        "example": "The government announced amnesty for political prisoners."
      },
      {
        "term": "Pragmatist",
        "meaning": "A person who is practical and realistic",
        "example": "A pragmatist focuses on practical solutions rather than ideals."
      },
      {
        "term": "Hiatus",
        "meaning": "A break or gap in continuity",
        "example": "After two years, the actor returned from her hiatus."
      },
      {
        "term": "Satire",
        "meaning": "The use of humor to criticize or expose faults",
        "example": "Political satire often ridicules leaders and their policies."
      },
      {
        "term": "Nostalgic",
        "meaning": "Feeling sentimental about the past",
        "example": "Hearing old songs makes me nostalgic about school days."
      },
      {
        "term": "Cryptic",
        "meaning": "Mysterious or secret; difficult to understand",
        "example": "His cryptic message left everyone confused."
      },
      {
        "term": "Exemplary",
        "meaning": "Serving as a model; outstanding",
        "example": "Her exemplary behavior earned her a scholarship."
      },
      {
        "term": "Ubiquitous",
        "meaning": "Present everywhere; constantly encountered",
        "example": "Mobile phones have become ubiquitous in modern society."
      },
      {
        "term": "Paradox",
        "meaning": "A statement that seems contradictory but may be true",
        "example": "It is a paradox that working less can make you more productive."
      }
    ],
    "faqs": [
      {
        "q": "Why is one-word substitution important for exams?",
        "a": "One-word substitution tests your vocabulary and understanding of word meanings. It is commonly asked in competitive exams like NEET, JEE, and SSC because it requires both language proficiency and quick thinking."
      },
      {
        "q": "How can I master one-word substitution?",
        "a": "Learn root words, prefixes, and suffixes. Read extensively to understand how words are used in context. Practice with previous exam papers and maintain a vocabulary journal."
      }
    ]
  },
  {
    "slug": "one-word-substitution-set-2",
    "title": "One-Word Substitution Set 2",
    "category": "One-word Substitution",
    "intro": "Expand your vocabulary with more one-word substitutions that are frequently used in academic and professional English. These words will enhance your written and spoken expression.",
    "items": [
      {
        "term": "Aesthete",
        "meaning": "A person who appreciates beauty and the arts",
        "example": "An aesthete values art and beauty above everything else."
      },
      {
        "term": "Audacity",
        "meaning": "Bold or daring behavior",
        "example": "He had the audacity to contradict the principal."
      },
      {
        "term": "Benevolent",
        "meaning": "Kind and generous",
        "example": "The benevolent ruler helped the poor people."
      },
      {
        "term": "Candid",
        "meaning": "Frank and honest",
        "example": "Her candid opinion was appreciated by everyone."
      },
      {
        "term": "Delusion",
        "meaning": "A false belief or misconception",
        "example": "He is under the delusion that he will pass without studying."
      },
      {
        "term": "Diligent",
        "meaning": "Showing careful and persistent effort",
        "example": "Diligent students achieve better academic results."
      },
      {
        "term": "Eloquent",
        "meaning": "Fluent and expressive in speaking or writing",
        "example": "The eloquent speaker captivated the entire audience."
      },
      {
        "term": "Ephemeral",
        "meaning": "Lasting for a very short time",
        "example": "Fashion trends are often ephemeral and quickly change."
      },
      {
        "term": "Fervent",
        "meaning": "Passionate and intense",
        "example": "He is a fervent supporter of environmental conservation."
      },
      {
        "term": "Gregarious",
        "meaning": "Fond of being in crowds; social",
        "example": "Gregarious people enjoy parties and group activities."
      },
      {
        "term": "Hapless",
        "meaning": "Unfortunate; unlucky",
        "example": "The hapless hero faced one disaster after another."
      },
      {
        "term": "Idiosyncrasy",
        "meaning": "A peculiar characteristic or habit",
        "example": "Everyone has their own idiosyncrasies; his is talking to himself."
      },
      {
        "term": "Jubilant",
        "meaning": "Joyful and triumphant",
        "example": "The jubilant crowd celebrated the victory."
      },
      {
        "term": "Lucrative",
        "meaning": "Producing profit or financial gain",
        "example": "Software engineering is a lucrative career option."
      },
      {
        "term": "Meticulous",
        "meaning": "Showing great attention to detail",
        "example": "Her meticulous work earned her many accolades."
      }
    ],
    "faqs": [
      {
        "q": "What strategies help in solving one-word substitution questions?",
        "a": "Read the phrase carefully and understand its meaning. Then think of a single word that conveys the same meaning. Use your knowledge of prefixes and suffixes to eliminate options in multiple choice questions."
      },
      {
        "q": "Is memorizing one-word substitutions enough?",
        "a": "Memorization alone is not sufficient. Understanding the meaning and usage of words in context is more important. Use the words in sentences to reinforce learning."
      }
    ]
  },
  {
    "slug": "one-word-substitution-set-3",
    "title": "One-Word Substitution Set 3",
    "category": "One-word Substitution",
    "intro": "Master advanced one-word substitutions used in sophisticated English. These challenging words appear frequently in board exams and competitive entrance examinations.",
    "items": [
      {
        "term": "Nonchalant",
        "meaning": "Casually unconcerned or indifferent",
        "example": "He gave a nonchalant shrug despite the serious situation."
      },
      {
        "term": "Obstinate",
        "meaning": "Stubbornly refusing to change one's opinion",
        "example": "An obstinate person will not accept advice from others."
      },
      {
        "term": "Perspicacity",
        "meaning": "Keen insight and understanding",
        "example": "Her perspicacity allowed her to understand the complex issue."
      },
      {
        "term": "Petulant",
        "meaning": "Childishly sulky or bad-tempered",
        "example": "A petulant child throws tantrums when denied sweets."
      },
      {
        "term": "Platitude",
        "meaning": "A dull and overused statement",
        "example": "His speech contained only platitudes and lacked originality."
      },
      {
        "term": "Precarious",
        "meaning": "Dangerously unstable or uncertain",
        "example": "The climber was in a precarious position on the cliff."
      },
      {
        "term": "Pungent",
        "meaning": "Having a strong sharp smell or taste",
        "example": "The pungent smell of spices filled the kitchen."
      },
      {
        "term": "Recluse",
        "meaning": "A person who lives in solitude",
        "example": "He became a recluse after his wife's death."
      },
      {
        "term": "Scrupulous",
        "meaning": "Very careful and thorough",
        "example": "A scrupulous accountant checks every transaction."
      },
      {
        "term": "Sempiternal",
        "meaning": "Eternal; lasting forever",
        "example": "The sempiternal beauty of nature inspires poets."
      },
      {
        "term": "Squalor",
        "meaning": "The state of being extremely dirty and sordid",
        "example": "The slum was characterized by squalor and poverty."
      },
      {
        "term": "Taciturn",
        "meaning": "Reserved and uncommunicative",
        "example": "A taciturn person speaks very little."
      },
      {
        "term": "Tenuous",
        "meaning": "Very weak or slender",
        "example": "The connection between the two incidents is tenuous."
      },
      {
        "term": "Turgid",
        "meaning": "Swollen; or using language that is pompous",
        "example": "His turgid writing style is difficult to understand."
      },
      {
        "term": "Vicissitude",
        "meaning": "A change of circumstances often for the worse",
        "example": "Life is full of vicissitudes; we must adapt to changes."
      }
    ],
    "faqs": [
      {
        "q": "How should I approach difficult one-word substitution questions?",
        "a": "Break down the phrase into its components and understand the exact meaning. Look for similar-sounding words and consider their etymologies. In multiple choice, eliminate words that are opposite in meaning first."
      },
      {
        "q": "Are there patterns in one-word substitution questions?",
        "a": "Yes, certain categories appear frequently: personality types, emotional states, physical descriptions, and abstract concepts. Grouping words by category helps in learning and retention."
      }
    ]
  },
  {
    "slug": "common-synonyms-set-1",
    "title": "Common Synonyms List Set 1",
    "category": "Synonyms",
    "intro": "Synonyms are words with similar meanings that can often be used interchangeably. Learning synonyms enriches your vocabulary and helps you write more varied and interesting content.",
    "items": [
      {
        "term": "Happy",
        "meaning": "Joyful, delighted, cheerful, pleased, content, elated",
        "example": "She felt happy and content after completing her exams."
      },
      {
        "term": "Big",
        "meaning": "Large, huge, enormous, vast, immense, gigantic",
        "example": "The blue whale is an enormous creature of the ocean."
      },
      {
        "term": "Beautiful",
        "meaning": "Lovely, attractive, pretty, gorgeous, stunning, exquisite",
        "example": "The sunset was absolutely gorgeous and breathtaking."
      },
      {
        "term": "Angry",
        "meaning": "Furious, enraged, livid, irate, upset, irritated",
        "example": "He was absolutely furious about the unjust decision."
      },
      {
        "term": "Tired",
        "meaning": "Exhausted, weary, fatigued, worn out, drained, sleepy",
        "example": "After the long journey, we were completely exhausted."
      },
      {
        "term": "Smart",
        "meaning": "Intelligent, clever, bright, quick-witted, astute, sharp",
        "example": "She is an astute student who asks thoughtful questions."
      },
      {
        "term": "Poor",
        "meaning": "Impoverished, needy, destitute, underprivileged, broke, poverty-stricken",
        "example": "Many underprivileged children struggle to get education."
      },
      {
        "term": "Rich",
        "meaning": "Wealthy, affluent, prosperous, well-off, loaded, abundant",
        "example": "The wealthy businessman donated generously to charity."
      },
      {
        "term": "Sad",
        "meaning": "Unhappy, sorrowful, melancholic, dejected, gloomy, depressed",
        "example": "He felt melancholic after hearing the unfortunate news."
      },
      {
        "term": "Fast",
        "meaning": "Quick, swift, rapid, speedy, fleet, brisk",
        "example": "The cheetah is the swiftest land animal."
      },
      {
        "term": "Slow",
        "meaning": "Sluggish, leisurely, gradual, unhurried, dawdling, plodding",
        "example": "The sluggish traffic made us late for school."
      },
      {
        "term": "Old",
        "meaning": "Ancient, aged, elderly, senior, vintage, obsolete",
        "example": "The ancient ruins tell the story of past civilizations."
      },
      {
        "term": "Young",
        "meaning": "Youthful, juvenile, adolescent, junior, new, fresh",
        "example": "The youthful energy of children is contagious."
      },
      {
        "term": "Difficult",
        "meaning": "Hard, challenging, arduous, complicated, tough, tricky",
        "example": "Mathematics is a challenging subject for many students."
      },
      {
        "term": "Easy",
        "meaning": "Simple, effortless, uncomplicated, straightforward, elementary, basic",
        "example": "This assignment is straightforward and should be completed quickly."
      }
    ],
    "faqs": [
      {
        "q": "Are all synonyms completely interchangeable?",
        "a": "No, most synonyms have subtle differences in meaning or connotation. For example, thin and skinny are synonyms, but skinny has a more negative connotation. Always consider the context when choosing synonyms."
      },
      {
        "q": "How many synonyms should I learn for each word?",
        "a": "Learning 3-5 synonyms for commonly used words is usually sufficient. Focus on words that appear frequently in exams and writing rather than rare words with few synonyms."
      }
    ]
  },
  {
    "slug": "common-synonyms-set-2",
    "title": "Common Synonyms List Set 2",
    "category": "Synonyms",
    "intro": "Continue building your synonym vocabulary with more word sets that will improve your expression in essays, stories, and formal writing. Understanding nuances between synonyms refines your language skills.",
    "items": [
      {
        "term": "Beautiful",
        "meaning": "Attractive, charming, enchanting, delightful, lovely, radiant",
        "example": "Her radiant smile lit up the entire room."
      },
      {
        "term": "Brave",
        "meaning": "Courageous, fearless, bold, intrepid, valiant, heroic",
        "example": "The courageous firefighters risked their lives to save others."
      },
      {
        "term": "Calm",
        "meaning": "Peaceful, serene, tranquil, placid, quiet, still",
        "example": "The serene lake reflected the mountains perfectly."
      },
      {
        "term": "Careful",
        "meaning": "Cautious, attentive, meticulous, vigilant, prudent, thorough",
        "example": "A meticulous surgeon performs every operation with precision."
      },
      {
        "term": "Cruel",
        "meaning": "Harsh, brutal, savage, inhumane, unkind, vicious",
        "example": "The brutal treatment of animals is unacceptable."
      },
      {
        "term": "Curious",
        "meaning": "Inquisitive, questioning, interested, prying, nosy, perceptive",
        "example": "Children are naturally inquisitive about how things work."
      },
      {
        "term": "Danger",
        "meaning": "Peril, hazard, risk, jeopardy, threat, menace",
        "example": "Swimming in rough seas is a significant hazard."
      },
      {
        "term": "Dark",
        "meaning": "Dim, shadowy, gloomy, murky, somber, unlit",
        "example": "The murky waters of the lake were frightening."
      },
      {
        "term": "Delicate",
        "meaning": "Fragile, tender, sensitive, dainty, frail, subtle",
        "example": "Glass is a fragile material and breaks easily."
      },
      {
        "term": "Evil",
        "meaning": "Wicked, malevolent, sinister, vile, immoral, corrupt",
        "example": "The villain's sinister plans were finally discovered."
      },
      {
        "term": "Fail",
        "meaning": "Flop, collapse, miscarry, break down, fall short, flounder",
        "example": "The project flopped due to poor planning."
      },
      {
        "term": "Famous",
        "meaning": "Renowned, celebrated, illustrious, prominent, well-known, notable",
        "example": "The renowned author gave a lecture at our school."
      },
      {
        "term": "Favorite",
        "meaning": "Preferred, beloved, treasured, cherished, favorite, admired",
        "example": "His cherished bicycle was stolen from the garage."
      },
      {
        "term": "Fight",
        "meaning": "Battle, combat, struggle, contend, clash, conflict",
        "example": "The two armies engaged in a fierce battle."
      },
      {
        "term": "Forgive",
        "meaning": "Pardon, excuse, absolve, condone, overlook, acquit",
        "example": "She pardoned him for his unintentional mistake."
      }
    ],
    "faqs": [
      {
        "q": "How can I distinguish between similar synonyms?",
        "a": "Read sentences with each synonym and notice the subtle differences. Use a thesaurus to understand the connotations. Practice using them in different contexts to develop a feel for their appropriate usage."
      },
      {
        "q": "Why is it important to know multiple synonyms?",
        "a": "Knowing synonyms allows you to avoid repetition in writing, choose more precise words, and express yourself more effectively. It also helps you understand different texts and speak more fluently."
      }
    ]
  },
  {
    "slug": "common-antonyms-set-1",
    "title": "Common Antonyms List Set 1",
    "category": "Antonyms",
    "intro": "Antonyms are words with opposite meanings. Understanding antonyms helps you grasp the full range of vocabulary and express contrasting ideas more effectively in writing and speech.",
    "items": [
      {
        "term": "Happy",
        "meaning": "The opposite is sad, unhappy, sorrowful, or melancholic",
        "example": "After losing the match, the sad team returned home disappointed."
      },
      {
        "term": "Begin",
        "meaning": "The opposite is end, finish, complete, or conclude",
        "example": "The teacher concluded the lesson with a summary."
      },
      {
        "term": "Big",
        "meaning": "The opposite is small, tiny, little, or compact",
        "example": "The tiny bird built its nest in the corner."
      },
      {
        "term": "Bright",
        "meaning": "The opposite is dark, dim, dull, or gloomy",
        "example": "The dim light in the library helps me focus better."
      },
      {
        "term": "Clean",
        "meaning": "The opposite is dirty, filthy, messy, or unclean",
        "example": "After the storm, the filthy streets needed cleaning."
      },
      {
        "term": "Cold",
        "meaning": "The opposite is hot, warm, or heated",
        "example": "The warm fire provided comfort on the cold winter night."
      },
      {
        "term": "Dangerous",
        "meaning": "The opposite is safe, secure, or protected",
        "example": "The safe area was designated for young children."
      },
      {
        "term": "Day",
        "meaning": "The opposite is night, darkness, or evening",
        "example": "The stars appear during the darkness of night."
      },
      {
        "term": "Different",
        "meaning": "The opposite is same, identical, or alike",
        "example": "The twin sisters look identical but have different personalities."
      },
      {
        "term": "Difficult",
        "meaning": "The opposite is easy, simple, or effortless",
        "example": "The simple task was completed in minutes."
      },
      {
        "term": "Dry",
        "meaning": "The opposite is wet, damp, or moist",
        "example": "The damp soil is ideal for planting seeds."
      },
      {
        "term": "Empty",
        "meaning": "The opposite is full, filled, or complete",
        "example": "The full bus could not accommodate more passengers."
      },
      {
        "term": "Forward",
        "meaning": "The opposite is backward, reverse, or back",
        "example": "Move backward slowly to avoid tripping."
      },
      {
        "term": "Gain",
        "meaning": "The opposite is lose, forfeit, or misplace",
        "example": "He lost his keys and spent hours searching."
      },
      {
        "term": "Good",
        "meaning": "The opposite is bad, evil, or poor",
        "example": "The evil plans were thwarted by law enforcement."
      }
    ],
    "faqs": [
      {
        "q": "Can a word have more than one antonym?",
        "a": "Yes, most words have multiple antonyms depending on their meaning. For example, light has antonyms like dark, heavy, and serious depending on which meaning of light is used."
      },
      {
        "q": "How do antonyms differ from synonyms?",
        "a": "Synonyms have similar meanings while antonyms have opposite meanings. Both are important for vocabulary development. Learning antonyms helps you understand word meanings through contrast."
      }
    ]
  },
  {
    "slug": "common-antonyms-set-2",
    "title": "Common Antonyms List Set 2",
    "category": "Antonyms",
    "intro": "Expand your understanding of opposite words with more antonym pairs. These contrasting words are frequently tested in competitive exams and help develop complete vocabulary knowledge.",
    "items": [
      {
        "term": "Great",
        "meaning": "The opposite is small, insignificant, minor, or poor",
        "example": "His insignificant contribution was hardly noticed."
      },
      {
        "term": "Heavy",
        "meaning": "The opposite is light, feather-like, or weightless",
        "example": "This feather-like silk fabric is perfect for summer dresses."
      },
      {
        "term": "High",
        "meaning": "The opposite is low, deep, or sunken",
        "example": "The deep valley was surrounded by tall mountains."
      },
      {
        "term": "Hot",
        "meaning": "The opposite is cold, cool, or frigid",
        "example": "The cool breeze provided relief from the summer heat."
      },
      {
        "term": "Increase",
        "meaning": "The opposite is decrease, reduce, or diminish",
        "example": "The reduction in prices led to higher sales."
      },
      {
        "term": "Intelligent",
        "meaning": "The opposite is stupid, foolish, or dumb",
        "example": "His foolish decision resulted in significant losses."
      },
      {
        "term": "Joy",
        "meaning": "The opposite is sorrow, grief, or sadness",
        "example": "The family's sorrow was evident from their somber faces."
      },
      {
        "term": "Kind",
        "meaning": "The opposite is cruel, unkind, or harsh",
        "example": "The harsh treatment of employees violated labor laws."
      },
      {
        "term": "Lazy",
        "meaning": "The opposite is active, energetic, or diligent",
        "example": "The diligent student completed all assignments on time."
      },
      {
        "term": "Lend",
        "meaning": "The opposite is borrow, take, or accept",
        "example": "I borrowed his book and promised to return it."
      },
      {
        "term": "Loud",
        "meaning": "The opposite is quiet, silent, or soft",
        "example": "The soft whisper was barely audible in the crowded room."
      },
      {
        "term": "Love",
        "meaning": "The opposite is hate, dislike, or despise",
        "example": "He despised dishonesty and valued integrity."
      },
      {
        "term": "Modern",
        "meaning": "The opposite is old, ancient, or traditional",
        "example": "The ancient ruins provide insights into past civilizations."
      },
      {
        "term": "New",
        "meaning": "The opposite is old, used, or worn",
        "example": "The worn shoes needed to be replaced with new ones."
      },
      {
        "term": "Problem",
        "meaning": "The opposite is solution, answer, or resolution",
        "example": "The resolution of the conflict required compromise from both sides."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between antonyms and opposites?",
        "a": "Antonyms are words with opposite meanings that belong to the same part of speech. Opposites is a broader term that can include any contrasting concepts. All antonyms are opposites, but not all opposites are antonyms."
      },
      {
        "q": "How many antonyms should I memorize?",
        "a": "Focus on learning antonym pairs for high-frequency words in your exams. Understanding the relationship between words is more important than mere memorization. Practice using antonym pairs in sentences regularly."
      }
    ]
  },
  {
    "slug": "common-homophones",
    "title": "Common Homophones",
    "category": "Homophones",
    "intro": "Homophones are words that sound the same but have different meanings and spellings. Understanding homophones helps you avoid spelling errors and use words correctly in writing.",
    "items": [
      {
        "term": "Accept",
        "meaning": "To receive or allow; spelled with a c. (Except means to exclude, spelled with an x)",
        "example": "I accept your apology, except for the excuses you made."
      },
      {
        "term": "Allowed",
        "meaning": "Permitted; spelled with two l's. (Aloud means out loud, with a d)",
        "example": "Students are not allowed to speak aloud during the exam."
      },
      {
        "term": "Be",
        "meaning": "To exist; spelled with b and e. (Bee is an insect, spelled with two e's)",
        "example": "The bee will be visiting the flowers tomorrow."
      },
      {
        "term": "By",
        "meaning": "Near or beside; spelled with b and y. (Buy means to purchase, with b and u)",
        "example": "I walk by the shop where I buy my books."
      },
      {
        "term": "Break",
        "meaning": "To damage; spelled with break. (Brake is a stopping device, spelled brake)",
        "example": "Do not break the vase; apply the brake slowly."
      },
      {
        "term": "dear",
        "meaning": "Beloved or expensive; spelled with d. (Deer is an animal, spelled with deer)",
        "example": "A dear friend is like a wild deer, graceful and free."
      },
      {
        "term": "Flower",
        "meaning": "A plant; spelled with flower. (Flour is used in baking, spelled with flour)",
        "example": "The flower is made from wheat flour."
      },
      {
        "term": "For",
        "meaning": "Indicating purpose; spelled with f and or. (Four is a number, spelled with four)",
        "example": "I bought groceries for four family members."
      },
      {
        "term": "Hear",
        "meaning": "To listen; spelled with h, e, a, r. (Here means in this place, spelled h, e, r, e)",
        "example": "I can hear the birds singing here in the garden."
      },
      {
        "term": "Its",
        "meaning": "Belonging to it; spelled without apostrophe. (It's is it is, spelled with apostrophe)",
        "example": "Its tail is beautiful; it's a magnificent creature."
      },
      {
        "term": "Know",
        "meaning": "To understand; spelled with k, n, o, w. (No is a negative response, spelled n, o)",
        "example": "I know the answer is no."
      },
      {
        "term": "Main",
        "meaning": "Principal or chief; spelled with main. (Mane is hair on a horse's neck, spelled mane)",
        "example": "The lion's mane is the main feature of its appearance."
      },
      {
        "term": "One",
        "meaning": "The number 1; spelled with one. (Won means to be victorious, spelled won)",
        "example": "One team won the championship match."
      },
      {
        "term": "Pair",
        "meaning": "Two of something; spelled with pair. (Pear is a fruit, spelled pear)",
        "example": "I ate a pear while wearing a pair of gloves."
      },
      {
        "term": "Write",
        "meaning": "To compose text; spelled with w, r, i, t, e. (Right means correct, spelled r, i, g, h, t)",
        "example": "You are right; I will write this down correctly."
      }
    ],
    "faqs": [
      {
        "q": "Why do homophones exist in English?",
        "a": "Homophones result from the evolution of English pronunciation and spelling over centuries. As pronunciation changed, spellings remained different for words that sound alike, creating homophones."
      },
      {
        "q": "How can I remember which homophone to use?",
        "a": "Create mnemonics or remember the spelling patterns. For example, remember that accept has a c at the beginning (like accept something), and keep context in mind. Practice using each homophone in sentences."
      }
    ]
  },
  {
    "slug": "common-collocations",
    "title": "Common Collocations",
    "category": "Collocations",
    "intro": "Collocations are pairs or groups of words that are commonly used together in English. Learning collocations helps you sound more natural and native-like when speaking and writing.",
    "items": [
      {
        "term": "Heavy rain",
        "meaning": "Strong rainfall; we do not say strong rain",
        "example": "Heavy rain caused flooding in the low-lying areas."
      },
      {
        "term": "Take a break",
        "meaning": "To rest or pause from work; the correct phrase",
        "example": "Let us take a break after studying for two hours."
      },
      {
        "term": "Make a decision",
        "meaning": "To decide; we do not say take a decision (in British English)",
        "example": "She made a difficult decision to move abroad."
      },
      {
        "term": "Pay attention",
        "meaning": "To focus or listen carefully; the correct phrase",
        "example": "Please pay attention to the instructions given."
      },
      {
        "term": "Keep a secret",
        "meaning": "Not to reveal a secret; the correct phrase",
        "example": "Can you keep a secret about the surprise party?"
      },
      {
        "term": "Make a plan",
        "meaning": "To plan something; the correct phrase",
        "example": "We need to make a plan for the school trip."
      },
      {
        "term": "Have fun",
        "meaning": "To enjoy oneself; the common phrase",
        "example": "We had fun playing games at the party."
      },
      {
        "term": "Run a business",
        "meaning": "To manage or operate a business",
        "example": "Her father runs a successful business in the city."
      },
      {
        "term": "Strong coffee",
        "meaning": "Coffee with a lot of flavor; we do not say heavy coffee",
        "example": "I prefer strong coffee to help me wake up."
      },
      {
        "term": "Time will tell",
        "meaning": "The future will reveal the truth or answer",
        "example": "Whether this decision was right, time will tell."
      },
      {
        "term": "Meet a deadline",
        "meaning": "To complete something by the required time",
        "example": "The team worked hard to meet the project deadline."
      },
      {
        "term": "Close attention",
        "meaning": "Careful observation; the correct phrase",
        "example": "Pay close attention during the lab experiment."
      },
      {
        "term": "Draw a conclusion",
        "meaning": "To form an opinion based on evidence",
        "example": "From the data, we can draw a conclusion about the trend."
      },
      {
        "term": "Bright future",
        "meaning": "A promising future; the correct phrase",
        "example": "Good students have a bright future ahead."
      },
      {
        "term": "Get dressed",
        "meaning": "To put on clothes; the correct phrase",
        "example": "Get dressed quickly; we are late for school."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between collocations and phrases?",
        "a": "Collocations are specific word combinations that sound natural to native speakers. Phrases are broader and may include idioms, proverbs, and other multi-word expressions. All collocations are phrases, but not all phrases are collocations."
      },
      {
        "q": "Why should I learn collocations?",
        "a": "Learning collocations helps you speak and write more naturally. Native speakers use certain word combinations habitually, and using correct collocations makes your English sound fluent and authentic."
      }
    ]
  },
  {
    "slug": "common-phrasal-verbs",
    "title": "Common Phrasal Verbs",
    "category": "Phrasal Verbs",
    "intro": "Phrasal verbs are verbs combined with prepositions or adverbs to create new meanings. These expressions are extremely common in everyday English and essential for fluent communication.",
    "items": [
      {
        "term": "Break down",
        "meaning": "To stop working or to separate into parts",
        "example": "The car broke down on the highway; he called a mechanic."
      },
      {
        "term": "Bring up",
        "meaning": "To raise a child or to mention something",
        "example": "She brought up the important issue during the meeting."
      },
      {
        "term": "Call off",
        "meaning": "To cancel something",
        "example": "The match was called off due to bad weather."
      },
      {
        "term": "Carry on",
        "meaning": "To continue doing something",
        "example": "Carry on with your work despite the distractions."
      },
      {
        "term": "Check out",
        "meaning": "To examine or to leave a hotel",
        "example": "Check out the new restaurant on the main street."
      },
      {
        "term": "Come across",
        "meaning": "To find or meet someone by chance",
        "example": "I came across an interesting article while browsing."
      },
      {
        "term": "Drop out",
        "meaning": "To stop participating or studying",
        "example": "He dropped out of school to pursue his passion."
      },
      {
        "term": "Find out",
        "meaning": "To discover or learn something",
        "example": "I found out the exam date has been changed."
      },
      {
        "term": "Get along",
        "meaning": "To have a good relationship or manage",
        "example": "She gets along well with all her classmates."
      },
      {
        "term": "Get over",
        "meaning": "To recover from or accept something",
        "example": "He is still getting over his friend's departure."
      },
      {
        "term": "Give up",
        "meaning": "To stop trying or to quit",
        "example": "Do not give up; success comes with perseverance."
      },
      {
        "term": "Go back",
        "meaning": "To return to a previous place or topic",
        "example": "Let us go back to the beginning of the lesson."
      },
      {
        "term": "Look after",
        "meaning": "To take care of someone or something",
        "example": "She looks after her younger siblings every day."
      },
      {
        "term": "Pick up",
        "meaning": "To collect something or to improve",
        "example": "Pick up your shoes from the floor; your grades are picking up."
      },
      {
        "term": "Put off",
        "meaning": "To delay or postpone something",
        "example": "Do not put off your homework; complete it today."
      }
    ],
    "faqs": [
      {
        "q": "Can phrasal verbs be used in formal writing?",
        "a": "Some phrasal verbs are acceptable in formal writing, while others are more colloquial. Use phrasal verbs sparingly in formal contexts and choose standard verbs when possible. Always consider your audience and context."
      },
      {
        "q": "How many phrasal verbs should I learn?",
        "a": "Focus on learning 50-100 common phrasal verbs first. These appear frequently in everyday communication and exams. Once you master the basics, you can expand your knowledge gradually."
      }
    ]
  },
  {
    "slug": "idioms-about-money",
    "title": "Idioms About Money",
    "category": "Idioms",
    "intro": "Learn common English idioms and expressions related to money, wealth, and finances. These phrases help you talk about spending, saving, and financial situations naturally.",
    "items": [
      {
        "term": "Break the bank",
        "meaning": "To spend more money than you can afford or to cost a lot of money",
        "example": "Buying a new car would break the bank for our family right now."
      },
      {
        "term": "Cash cow",
        "meaning": "A business or product that generates steady profits with little investment",
        "example": "The online subscription service has become a cash cow for the company."
      },
      {
        "term": "Money to burn",
        "meaning": "To have a lot of money to spend freely",
        "example": "After winning the lottery, he had money to burn and traveled the world."
      },
      {
        "term": "Tighten your belt",
        "meaning": "To reduce spending and live more economically",
        "example": "The company had to tighten its belt during the recession."
      },
      {
        "term": "A penny for your thoughts",
        "meaning": "A way to ask someone what they are thinking about",
        "example": "You look upset—a penny for your thoughts?"
      },
      {
        "term": "Worth its weight in gold",
        "meaning": "Something very valuable or precious",
        "example": "That old painting turned out to be worth its weight in gold."
      },
      {
        "term": "Put your two cents in",
        "meaning": "To share your opinion or contribute to a discussion",
        "example": "If you want to put your two cents in, I'm happy to listen."
      },
      {
        "term": "Go belly-up",
        "meaning": "To fail financially or go bankrupt",
        "example": "The startup went belly-up after only six months in business."
      },
      {
        "term": "Pot of gold",
        "meaning": "A valuable reward or prize that seems impossible to achieve",
        "example": "Landing that job was like finding a pot of gold for her career."
      },
      {
        "term": "Filthy rich",
        "meaning": "To be extremely wealthy",
        "example": "The celebrity became filthy rich after starring in blockbuster films."
      }
    ],
    "faqs": [
      {
        "q": "Why is 'break the bank' used to describe expensive things?",
        "a": "The phrase originates from gambling, where 'breaking the bank' meant winning all the money held by a casino, essentially depleting their funds. Today it means spending so much that you deplete your own financial resources."
      },
      {
        "q": "Can these idioms be used in formal business communication?",
        "a": "Some, like 'cash cow' and 'go belly-up,' are commonly used in formal business contexts. Others like 'filthy rich' are more conversational. Context and audience determine appropriateness."
      }
    ]
  },
  {
    "slug": "idioms-about-body-parts",
    "title": "Idioms About Body Parts",
    "category": "Idioms",
    "intro": "Discover idioms that use body parts like 'heart,' 'head,' and 'hand' to express emotions and ideas. These expressions are colorful and widely used in English.",
    "items": [
      {
        "term": "Keep your head above water",
        "meaning": "To manage a difficult situation and stay out of trouble",
        "example": "She's been keeping her head above water by working two jobs."
      },
      {
        "term": "Get off my back",
        "meaning": "Stop bothering or criticizing someone",
        "example": "Leave me alone—just get off my back!"
      },
      {
        "term": "Give someone a hand",
        "meaning": "To help or assist someone",
        "example": "Can you give me a hand moving these boxes?"
      },
      {
        "term": "Wear your heart on your sleeve",
        "meaning": "To show your emotions openly and freely",
        "example": "He wears his heart on his sleeve and cries at sad movies."
      },
      {
        "term": "Turn a blind eye",
        "meaning": "To ignore something you know is wrong",
        "example": "The manager turned a blind eye to the employees' theft."
      },
      {
        "term": "Give someone a piece of your mind",
        "meaning": "To tell someone angrily what you think about them",
        "example": "I gave him a piece of my mind when he lied to me."
      },
      {
        "term": "Neck and neck",
        "meaning": "Two competitors are equally matched or very close in a competition",
        "example": "The two runners were neck and neck until the final stretch."
      },
      {
        "term": "Tongue-tied",
        "meaning": "To be unable to speak, usually from shyness or nervousness",
        "example": "When she met her celebrity crush, she became tongue-tied."
      },
      {
        "term": "Cold shoulder",
        "meaning": "To ignore someone or treat them unfriendly",
        "example": "After the argument, she gave him the cold shoulder."
      },
      {
        "term": "Stick your neck out",
        "meaning": "To take a risk or put yourself in a vulnerable position",
        "example": "I'll stick my neck out and say that this movie is the best of the year."
      }
    ],
    "faqs": [
      {
        "q": "Where does the idiom 'wear your heart on your sleeve' come from?",
        "a": "In medieval times, knights would wear their lady's colors tied around their sleeve as a sign of their affection. This evolved into the modern expression meaning to show emotions openly."
      },
      {
        "q": "Is 'give someone a piece of your mind' always negative?",
        "a": "Yes, it's typically used when expressing anger or criticism. It suggests confronting someone about something they've done wrong."
      }
    ]
  },
  {
    "slug": "animal-idioms",
    "title": "Animal Idioms",
    "category": "Idioms",
    "intro": "Explore idioms featuring animals that reveal human nature and behaviors. These colorful expressions make English communication more vivid and memorable.",
    "items": [
      {
        "term": "Let the cat out of the bag",
        "meaning": "To reveal a secret or disclose something meant to be hidden",
        "example": "I didn't mean to let the cat out of the bag about the surprise party."
      },
      {
        "term": "Rain cats and dogs",
        "meaning": "To rain very heavily",
        "example": "It's raining cats and dogs outside; I'll need an umbrella."
      },
      {
        "term": "Hold your horses",
        "meaning": "To wait or slow down before acting or speaking",
        "example": "Hold your horses—let me finish explaining before you make a decision."
      },
      {
        "term": "Busy as a bee",
        "meaning": "To be very active and productive",
        "example": "She's been busy as a bee preparing for the conference."
      },
      {
        "term": "Snake in the grass",
        "meaning": "A person who is treacherous or deceitful",
        "example": "That colleague is a snake in the grass; he took credit for my work."
      },
      {
        "term": "When pigs fly",
        "meaning": "Something that will never happen",
        "example": "You'll get him to apologize when pigs fly."
      },
      {
        "term": "Chicken out",
        "meaning": "To withdraw from something because of fear or cowardice",
        "example": "He was going to bungee jump but chickened out at the last moment."
      },
      {
        "term": "Ants in your pants",
        "meaning": "To be restless, impatient, or fidgety",
        "example": "The children have ants in their pants waiting for the show to start."
      },
      {
        "term": "Cry wolf",
        "meaning": "To raise a false alarm; to call for help when there's no real danger",
        "example": "He cried wolf so many times that nobody believed him when there was a real problem."
      },
      {
        "term": "Lion's share",
        "meaning": "The largest or best portion of something",
        "example": "She took the lion's share of the credit for the project's success."
      }
    ],
    "faqs": [
      {
        "q": "What is the origin of 'let the cat out of the bag'?",
        "a": "This idiom likely comes from medieval markets where vendors would trick buyers by putting a cat in a bag instead of the promised piglet. When buyers opened the bag, they discovered the trick."
      },
      {
        "q": "Why do we use so many animal idioms in English?",
        "a": "Animals have been part of human culture for thousands of years. Their behaviors and characteristics make good metaphors for human emotions and situations, making idioms memorable and colorful."
      }
    ]
  },
  {
    "slug": "proverbs-set-2",
    "title": "Famous English Proverbs Set 2",
    "category": "Proverbs",
    "intro": "Explore timeless proverbs that offer wisdom about life, relationships, and success. These sayings have been passed down through generations and remain relevant today.",
    "items": [
      {
        "term": "Practice makes perfect",
        "meaning": "Repeated practice of something will make you excellent at it",
        "example": "If you want to become a skilled musician, remember that practice makes perfect."
      },
      {
        "term": "The early bird catches the worm",
        "meaning": "Success comes to those who act early or quickly",
        "example": "She got the best job offer because the early bird catches the worm—she applied first."
      },
      {
        "term": "Actions speak louder than words",
        "meaning": "What you do is more important than what you say",
        "example": "Don't just apologize; show with your actions that you're sorry—actions speak louder than words."
      },
      {
        "term": "Two wrongs don't make a right",
        "meaning": "Doing something wrong in response to another wrong doesn't solve the problem",
        "example": "Even though he hurt you, hitting him back is wrong—two wrongs don't make a right."
      },
      {
        "term": "The pen is mightier than the sword",
        "meaning": "Writing and words have more power than violence or force",
        "example": "The journalist exposed corruption through her writing; the pen is mightier than the sword."
      },
      {
        "term": "You can't judge a book by its cover",
        "meaning": "Don't judge someone or something by appearance alone",
        "example": "He seemed unfriendly at first, but he's actually kind—you can't judge a book by its cover."
      },
      {
        "term": "A picture is worth a thousand words",
        "meaning": "An image conveys information more efficiently than text alone",
        "example": "That photograph of the disaster was so powerful that a picture is worth a thousand words."
      },
      {
        "term": "When life gives you lemons, make lemonade",
        "meaning": "Make the best of a difficult situation",
        "example": "After losing his job, he started his own business; when life gives you lemons, make lemonade."
      },
      {
        "term": "The best things in life are free",
        "meaning": "The most valuable things—like love and friendship—cost nothing",
        "example": "You don't need money to be happy; the best things in life are free."
      },
      {
        "term": "Better late than never",
        "meaning": "It's better to do something late than not to do it at all",
        "example": "He finally apologized after months—better late than never."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a proverb and an idiom?",
        "a": "Proverbs are short sayings that express a general truth or piece of wisdom. Idioms are expressions whose meaning cannot be understood from individual words alone. Not all proverbs are idioms, but many idioms are proverbial in nature."
      },
      {
        "q": "How long have proverbs been used in English?",
        "a": "Many English proverbs date back centuries, with some originating from Old English or borrowed from other languages and cultures through trade and cultural exchange."
      }
    ]
  },
  {
    "slug": "proverbs-set-3",
    "title": "Wisdom Through Proverbs Set 3",
    "category": "Proverbs",
    "intro": "Discover more powerful proverbs that teach lessons about perseverance, wisdom, and human nature. These traditional sayings help us navigate life's challenges.",
    "items": [
      {
        "term": "Rome wasn't built in a day",
        "meaning": "Great achievements take time and cannot be rushed",
        "example": "You can't expect to master a language in a week—Rome wasn't built in a day."
      },
      {
        "term": "Don't put all your eggs in one basket",
        "meaning": "Don't risk everything on a single venture; diversify",
        "example": "Invest in different stocks rather than just one company—don't put all your eggs in one basket."
      },
      {
        "term": "Prevention is better than cure",
        "meaning": "It's better to prevent problems than to deal with them after they occur",
        "example": "Brush your teeth regularly to avoid cavities; prevention is better than cure."
      },
      {
        "term": "Knowledge is power",
        "meaning": "Understanding and learning give you advantages in life",
        "example": "The more you read and learn, the better decisions you'll make—knowledge is power."
      },
      {
        "term": "Honesty is the best policy",
        "meaning": "Being truthful is always the right approach",
        "example": "Just tell him what happened; honesty is the best policy."
      },
      {
        "term": "Where there's a will, there's a way",
        "meaning": "If you are determined, you will find a solution",
        "example": "He was determined to graduate despite his challenges; where there's a will, there's a way."
      },
      {
        "term": "All that glitters is not gold",
        "meaning": "Attractive things are not always valuable or good",
        "example": "That luxury car looks amazing, but it costs too much—all that glitters is not gold."
      },
      {
        "term": "Absence makes the heart grow fonder",
        "meaning": "People appreciate others more when they are separated",
        "example": "After she traveled abroad, he realized how much he missed her; absence makes the heart grow fonder."
      },
      {
        "term": "Slow and steady wins the race",
        "meaning": "Consistent effort over time is more effective than rushing",
        "example": "She studied a little each day and passed the exam; slow and steady wins the race."
      },
      {
        "term": "Birds of a feather flock together",
        "meaning": "People of similar interests or backgrounds tend to associate with each other",
        "example": "The musicians all hung out together; birds of a feather flock together."
      }
    ],
    "faqs": [
      {
        "q": "Are proverbs universal across cultures?",
        "a": "Many proverbs exist in similar forms across different cultures because they express common human experiences. However, each culture has unique proverbs reflecting its specific values and environment."
      },
      {
        "q": "Do proverbs always tell the literal truth?",
        "a": "No, proverbs are metaphorical and teach lessons through figurative language. They express general truths or advice, not absolute facts."
      }
    ]
  },
  {
    "slug": "one-word-substitution-set-4",
    "title": "One-Word Substitution Set 4",
    "category": "One-word Substitution",
    "intro": "Expand your vocabulary with more sophisticated one-word substitutions that replace common phrases. Master these terms to write with greater precision.",
    "items": [
      {
        "term": "Misanthropist",
        "meaning": "A person who hates or distrusts human beings",
        "example": "After his bad experience, he became a misanthropist and avoided social gatherings."
      },
      {
        "term": "Bibliophile",
        "meaning": "A person who loves books and collects them",
        "example": "The bibliophile spent her entire salary on rare book editions."
      },
      {
        "term": "Hebetude",
        "meaning": "The state of being dull; lack of mental sharpness",
        "example": "The medication caused a hebetude that made concentration difficult."
      },
      {
        "term": "Sycophant",
        "meaning": "A person who acts obsequiously to someone for personal gain",
        "example": "He was a sycophant who always agreed with the boss regardless of the truth."
      },
      {
        "term": "Tautophony",
        "meaning": "Repetition of similar sounds in nearby words",
        "example": "The tongue twister 'she sells seashells' is an example of tautophony."
      },
      {
        "term": "Pulchritude",
        "meaning": "Physical beauty or attractiveness",
        "example": "The actress's pulchritude made her a star despite her limited acting ability."
      },
      {
        "term": "Vacuous",
        "meaning": "Lacking intelligence or substance; empty",
        "example": "His vacuous comments added nothing to the serious discussion."
      },
      {
        "term": "Obfuscate",
        "meaning": "To make something unclear or confusing deliberately",
        "example": "The politician tried to obfuscate the truth with complicated language."
      },
      {
        "term": "Acrimonious",
        "meaning": "Bitter or spiteful in nature; harsh in tone",
        "example": "The acrimonious debate left both sides feeling angry and hurt."
      },
      {
        "term": "Perspicacious",
        "meaning": "Having keen insight or understanding; mentally sharp",
        "example": "Her perspicacious analysis of the market trends proved extremely accurate."
      }
    ],
    "faqs": [
      {
        "q": "Is it important to use one-word substitutions in everyday conversation?",
        "a": "Not necessarily in casual speech, but they're valuable for exams, formal writing, and professional communication. They show vocabulary strength and precision."
      },
      {
        "q": "How can I remember these words?",
        "a": "Create flashcards, use them in sentences regularly, and group them by themes. The more you encounter and use them, the better you'll remember."
      }
    ]
  },
  {
    "slug": "synonyms-set-2",
    "title": "Synonyms Set 2",
    "category": "Synonyms",
    "intro": "Discover words with similar meanings but subtle differences in usage. Understanding synonyms helps you express ideas with greater nuance and variety.",
    "items": [
      {
        "term": "Happy - Joyful",
        "meaning": "Happy is a general feeling of contentment; joyful is intense, exuberant happiness",
        "example": "She felt happy about her promotion and joyful when her family surprised her."
      },
      {
        "term": "Big - Enormous",
        "meaning": "Big describes something large; enormous describes something extremely large",
        "example": "The house is big, but the stadium is enormous."
      },
      {
        "term": "Smart - Intelligent",
        "meaning": "Smart is quick-witted and practical; intelligent indicates deep understanding",
        "example": "He's smart about street business, but his brother is more intelligent academically."
      },
      {
        "term": "Tired - Exhausted",
        "meaning": "Tired is ordinary fatigue; exhausted is complete depletion",
        "example": "After work, I'm tired, but after the marathon, I was completely exhausted."
      },
      {
        "term": "Pretty - Beautiful",
        "meaning": "Pretty is attractive in a sweet or delicate way; beautiful is strikingly attractive",
        "example": "The garden is pretty, but the sunset was beautiful."
      },
      {
        "term": "Angry - Furious",
        "meaning": "Angry is moderate displeasure; furious is intense, overwhelming rage",
        "example": "He was angry about the comment, but furious when they insulted his family."
      },
      {
        "term": "Rich - Wealthy",
        "meaning": "Rich means having substantial money; wealthy implies established, lasting prosperity",
        "example": "He became rich from his business, but generations of investing made his family wealthy."
      },
      {
        "term": "Clean - Immaculate",
        "meaning": "Clean is free from dirt; immaculate is perfectly clean without any flaw",
        "example": "The house is clean, but the hotel room was immaculate."
      },
      {
        "term": "Interesting - Fascinating",
        "meaning": "Interesting is engaging; fascinating is captivating and absorbing",
        "example": "The article was interesting, but the documentary was truly fascinating."
      },
      {
        "term": "Difficult - Arduous",
        "meaning": "Difficult is challenging; arduous involves hard physical or mental effort over time",
        "example": "The test was difficult, but the rescue mission was truly arduous."
      }
    ],
    "faqs": [
      {
        "q": "Why should I learn the difference between synonyms?",
        "a": "Synonyms rarely have exactly the same meaning. Understanding their nuances allows you to choose the most precise word for your context, making your communication clearer and more sophisticated."
      },
      {
        "q": "Can I use synonyms interchangeably?",
        "a": "Not always. While synonyms are similar, they often have different connotations or are appropriate in different contexts. For example, 'start' and 'commence' are synonyms, but 'commence' is more formal."
      }
    ]
  },
  {
    "slug": "antonyms-set-2",
    "title": "Antonyms Set 2",
    "category": "Antonyms",
    "intro": "Master pairs of opposite words that expand your vocabulary and improve your ability to express contrasts. Antonyms are essential for clear, nuanced communication.",
    "items": [
      {
        "term": "Abundant - Scarce",
        "meaning": "Abundant means plentiful; scarce means rare or in short supply",
        "example": "Water was abundant in the rainy season but became scarce during drought."
      },
      {
        "term": "Brave - Cowardly",
        "meaning": "Brave means courageous; cowardly means lacking courage",
        "example": "The brave soldier stood his ground while the cowardly one retreated."
      },
      {
        "term": "Diligent - Lazy",
        "meaning": "Diligent means hardworking and thorough; lazy means unwilling to work",
        "example": "The diligent student completed all assignments, unlike her lazy classmate."
      },
      {
        "term": "Artificial - Natural",
        "meaning": "Artificial is made by humans; natural occurs in nature",
        "example": "The artificial sweetener tastes different from natural honey."
      },
      {
        "term": "Verbose - Concise",
        "meaning": "Verbose means using many words; concise means brief and clear",
        "example": "His verbose explanation confused the class, but her concise answer clarified everything."
      },
      {
        "term": "Optimistic - Pessimistic",
        "meaning": "Optimistic means hopeful about the future; pessimistic means expecting bad outcomes",
        "example": "She's optimistic about the project while he's pessimistic about its success."
      },
      {
        "term": "Harsh - Gentle",
        "meaning": "Harsh is severe or rough; gentle is soft or mild",
        "example": "His harsh criticism contrasted with her gentle suggestions."
      },
      {
        "term": "Flourish - Wither",
        "meaning": "Flourish means to grow or thrive; wither means to decline or droop",
        "example": "The flowers flourish in spring but wither in winter."
      },
      {
        "term": "Vigilant - Careless",
        "meaning": "Vigilant means watchful; careless means not paying attention",
        "example": "The vigilant guard caught the careless thief trying to steal."
      },
      {
        "term": "Credible - Dubious",
        "meaning": "Credible means believable; dubious means questionable or doubtful",
        "example": "Her credible evidence convinced the jury, while his dubious claims were dismissed."
      }
    ],
    "faqs": [
      {
        "q": "Are there words with multiple antonyms?",
        "a": "Yes, many words have more than one antonym depending on context. For example, 'hot' can be opposed to 'cold' (temperature), 'cool' (emotionally), or 'dull' (stylistically)."
      },
      {
        "q": "How do antonyms help with test preparation?",
        "a": "Antonym questions are common in exams. Learning antonyms helps you identify opposite meanings quickly and also deepens your overall vocabulary knowledge."
      }
    ]
  },
  {
    "slug": "homophones-set-1",
    "title": "Homophones Set 1",
    "category": "Homophones",
    "intro": "Learn words that sound identical but have different meanings and spellings. Homophones are tricky in English and essential to master for correct writing.",
    "items": [
      {
        "term": "There / Their / They're",
        "meaning": "There refers to a place; their shows possession; they're is the contraction of they are",
        "example": "They're going over there with their friends."
      },
      {
        "term": "Brake / Break",
        "meaning": "Brake is a device to stop; break means to damage or split",
        "example": "Hit the brake before you break the vase."
      },
      {
        "term": "Stationery / Stationary",
        "meaning": "Stationery is writing materials; stationary means not moving",
        "example": "The stationery shop sold desk pens, while the stationary bike stayed in place."
      },
      {
        "term": "Presence / Presents",
        "meaning": "Presence means being present; presents are gifts",
        "example": "Her presence at the party was marked by the presents she brought."
      },
      {
        "term": "Accept / Except",
        "meaning": "Accept means to take or agree; except means excluding",
        "example": "I accept all terms except the final clause."
      },
      {
        "term": "Principal / Principle",
        "meaning": "Principal is a school leader or main thing; principle is a fundamental rule",
        "example": "The principal explained the principle of fair governance."
      },
      {
        "term": "Allowed / Aloud",
        "meaning": "Allowed means permitted; aloud means spoken loudly",
        "example": "The student read aloud because talking was allowed in the library."
      },
      {
        "term": "Weather / Whether",
        "meaning": "Weather is atmospheric conditions; whether is a question of choice",
        "example": "Whether you come depends on the weather forecast."
      },
      {
        "term": "Hair / Hare",
        "meaning": "Hair grows on the head; a hare is a rabbit-like animal",
        "example": "The hare had fluffy hair on its long ears."
      },
      {
        "term": "Sail / Sale",
        "meaning": "Sail is a cloth for catching wind; sale is selling at a discount",
        "example": "The boat's sail caught the wind during the store's summer sale."
      }
    ],
    "faqs": [
      {
        "q": "Why are homophones so common in English?",
        "a": "English has absorbed words from many languages over centuries, and many pronunciations changed while spellings remained different. This created multiple homophones."
      },
      {
        "q": "How can I remember the difference between homophones?",
        "a": "Associate each word with its meaning through mnemonics or memory tricks. For example, 'stationery' has an 'e' like 'envelopes' (writing materials), while 'stationary' has an 'a' like 'parked.'"
      }
    ]
  },
  {
    "slug": "homophones-set-2",
    "title": "Homophones Set 2",
    "category": "Homophones",
    "intro": "Expand your knowledge with more homophone pairs that commonly confuse English learners. These words sound the same but have completely different meanings.",
    "items": [
      {
        "term": "Piece / Peace",
        "meaning": "Piece is a part of something; peace is the absence of conflict",
        "example": "She wanted a piece of cake and peace and quiet."
      },
      {
        "term": "Whole / Hole",
        "meaning": "Whole means complete; a hole is an opening",
        "example": "The whole cake had a hole in the middle."
      },
      {
        "term": "Wear / Where",
        "meaning": "Wear means to have clothing on; where refers to location",
        "example": "Where can I wear this formal dress?"
      },
      {
        "term": "Waste / Waist",
        "meaning": "Waste is discarded material or to squander; waist is the body part below the ribs",
        "example": "Don't waste food or your money on tight waist belts."
      },
      {
        "term": "Right / Write / Rite",
        "meaning": "Right is correct or a direction; write is to put words on paper; rite is a ceremony",
        "example": "Write down the right way to perform the religious rite."
      },
      {
        "term": "New / Knew / Gnu",
        "meaning": "New means recently made; knew is past tense of know; a gnu is an animal",
        "example": "He knew about the new gnu at the zoo."
      },
      {
        "term": "Sea / See",
        "meaning": "Sea is a large body of salt water; see means to observe",
        "example": "You can see dolphins in the sea."
      },
      {
        "term": "Sun / Son",
        "meaning": "Sun is the star; son is a male child",
        "example": "My son loves playing in the sun."
      },
      {
        "term": "To / Too / Two",
        "meaning": "To is a preposition; too means also or excessive; two is the number 2",
        "example": "I want to go too, but I have two tasks to finish."
      },
      {
        "term": "Pair / Pear / Pare",
        "meaning": "Pair is two of something; a pear is a fruit; pare means to peel",
        "example": "She bought a pair of pears and began to pare the skin."
      }
    ],
    "faqs": [
      {
        "q": "Are homophones unique to English?",
        "a": "No, many languages have homophones, but English has an unusually high number due to its complex history and borrowing from multiple language families."
      },
      {
        "q": "Do homophones affect pronunciation?",
        "a": "No, homophones sound identical, so there's no pronunciation difference. The difference is only in spelling and meaning."
      }
    ]
  },
  {
    "slug": "phrasal-verbs-set-1",
    "title": "Phrasal Verbs Set 1",
    "category": "Phrasal Verbs",
    "intro": "Master common phrasal verbs that are essential for fluent English. These combinations of verbs and prepositions create unique meanings different from their individual words.",
    "items": [
      {
        "term": "Look up",
        "meaning": "To search for information or to visit someone",
        "example": "I'll look up the word in the dictionary or look up my old friend tomorrow."
      },
      {
        "term": "Put off",
        "meaning": "To postpone or to delay something",
        "example": "Don't put off studying for the exam; start preparing now."
      },
      {
        "term": "Get over",
        "meaning": "To recover from something difficult",
        "example": "It took him months to get over the breakup."
      },
      {
        "term": "Run into",
        "meaning": "To meet by chance or to encounter a problem",
        "example": "I ran into my teacher at the supermarket and ran into some traffic on the way."
      },
      {
        "term": "Find out",
        "meaning": "To discover or learn something",
        "example": "I found out about the party from her email."
      },
      {
        "term": "Come across",
        "meaning": "To discover or encounter accidentally",
        "example": "I came across an interesting article while browsing online."
      },
      {
        "term": "Turn down",
        "meaning": "To reject or to reduce the volume",
        "example": "He turned down the job offer and turned down the music volume."
      },
      {
        "term": "Bring up",
        "meaning": "To raise a child or to mention a topic",
        "example": "She brought up her children in the city and brought up the subject in the meeting."
      },
      {
        "term": "Set up",
        "meaning": "To establish, arrange, or install",
        "example": "They set up a new business and set up the equipment."
      },
      {
        "term": "Cut off",
        "meaning": "To disconnect or to stop suddenly",
        "example": "The phone call got cut off during the storm."
      }
    ],
    "faqs": [
      {
        "q": "Why are phrasal verbs so common in English?",
        "a": "Phrasal verbs often came from Old English and Germanic roots. They're very common in informal speech and are essential for sounding natural in English."
      },
      {
        "q": "Can phrasal verbs be separated?",
        "a": "Some phrasal verbs are separable, meaning the object can go between the verb and preposition (e.g., 'put it off'), while others are inseparable (e.g., 'come across'). It depends on the specific phrasal verb."
      }
    ]
  },
  {
    "slug": "phrasal-verbs-set-2",
    "title": "Phrasal Verbs Set 2",
    "category": "Phrasal Verbs",
    "intro": "Continue mastering essential phrasal verbs that are frequently used in everyday English. Understand these combinations to speak and write more naturally.",
    "items": [
      {
        "term": "Go on",
        "meaning": "To continue or to happen",
        "example": "The party went on until midnight, and I asked what was going on."
      },
      {
        "term": "Give up",
        "meaning": "To stop trying or to surrender",
        "example": "Don't give up on your dreams no matter how difficult the journey is."
      },
      {
        "term": "Take off",
        "meaning": "To remove or to leave (as for a plane)",
        "example": "The plane took off on time, and he took off his jacket."
      },
      {
        "term": "Call off",
        "meaning": "To cancel an event or to stop pursuing",
        "example": "The match was called off due to rain."
      },
      {
        "term": "Pick up",
        "meaning": "To collect, to lift, or to learn quickly",
        "example": "Pick up your clothes from the floor and pick up the groceries on the way home."
      },
      {
        "term": "Build up",
        "meaning": "To increase gradually or to develop",
        "example": "She built up her confidence through practice and built up a successful career."
      },
      {
        "term": "Break down",
        "meaning": "To stop working, to cry, or to analyze",
        "example": "The car broke down on the highway, and she broke down crying."
      },
      {
        "term": "Point out",
        "meaning": "To indicate or to draw attention to",
        "example": "He pointed out the error in my calculation."
      },
      {
        "term": "Carry on",
        "meaning": "To continue or to persist",
        "example": "Carry on with your work despite the distractions."
      },
      {
        "term": "Pass by",
        "meaning": "To go past or to move near something",
        "example": "We passed by the old house where we used to live."
      }
    ],
    "faqs": [
      {
        "q": "How many phrasal verbs exist in English?",
        "a": "There are thousands of phrasal verbs in English, but most conversations use only the most common ones. Learning 50-100 of the most frequent ones will cover most daily communication."
      },
      {
        "q": "Do phrasal verbs have formal alternatives?",
        "a": "Yes, many phrasal verbs have single-word synonyms that are more formal. For example, 'find out' is informal; 'discover' is more formal. Knowing both helps you adjust your language to different contexts."
      }
    ]
  },
  {
    "slug": "confusing-words-set-1",
    "title": "Confusing Words Set 1",
    "category": "Confusing Words",
    "intro": "Master commonly confused word pairs that perplex even experienced English speakers. Understanding these distinctions will significantly improve your writing accuracy.",
    "items": [
      {
        "term": "Affect / Effect",
        "meaning": "Affect is usually a verb meaning to influence; effect is usually a noun meaning a result",
        "example": "The weather affects my mood and has a positive effect on my happiness."
      },
      {
        "term": "Advice / Advise",
        "meaning": "Advice is a noun (recommendations); advise is a verb (to give advice)",
        "example": "I will advise you, so listen to my advice carefully."
      },
      {
        "term": "Complement / Compliment",
        "meaning": "Complement means something that completes or matches; compliment is a flattering remark",
        "example": "Her smile complemented her beauty, and he gave her a compliment."
      },
      {
        "term": "Loose / Lose",
        "meaning": "Loose means not tight; lose means to misplace or fail to win",
        "example": "The loose thread might cause you to lose your sweater."
      },
      {
        "term": "Fewer / Less",
        "meaning": "Fewer is for countable nouns; less is for uncountable nouns",
        "example": "We had fewer mistakes this time and used less ink to print."
      },
      {
        "term": "Its / It's",
        "meaning": "Its is possessive; it's is the contraction of it is",
        "example": "It's clear that the dog wagged its tail."
      },
      {
        "term": "Lie / Lay",
        "meaning": "Lie means to recline (no object needed); lay means to place something (needs an object)",
        "example": "I will lie on the bed and lay the blanket over me."
      },
      {
        "term": "Who / Whom",
        "meaning": "Who is used as a subject; whom is used as an object",
        "example": "Who is the person to whom you gave the gift?"
      },
      {
        "term": "Farther / Further",
        "meaning": "Farther is physical distance; further is metaphorical or abstract distance",
        "example": "The store is farther away, but let's discuss this further."
      },
      {
        "term": "Historic / Historical",
        "meaning": "Historic means important in history; historical means related to the past",
        "example": "This is a historic moment in historical context."
      }
    ],
    "faqs": [
      {
        "q": "Why are these words so confusing?",
        "a": "Many confusing words have similar sounds or related meanings, and English doesn't always follow consistent rules. Learning the specific distinction for each pair is the best approach."
      },
      {
        "q": "Are these distinctions important in casual speech?",
        "a": "In casual speech, listeners may not notice, but in formal writing and professional communication, using the correct word is very important and affects your credibility."
      }
    ]
  },
  {
    "slug": "confusing-words-set-2",
    "title": "Confusing Words Set 2",
    "category": "Confusing Words",
    "intro": "Explore more pairs of words that confuse English learners and even native speakers. Mastering these distinctions will elevate your writing quality.",
    "items": [
      {
        "term": "Among / Between",
        "meaning": "Among is used for groups of three or more; between is used for two things",
        "example": "The secret was divided among all of them, with a special bond between the two closest friends."
      },
      {
        "term": "Imply / Infer",
        "meaning": "Imply means to suggest indirectly; infer means to conclude based on evidence",
        "example": "He implied that she was dishonest, and she inferred he didn't trust her."
      },
      {
        "term": "Assume / Presume",
        "meaning": "Assume means to take something as true without proof; presume means to suppose based on probability",
        "example": "I assume he's coming unless there's proof otherwise, while I presume it'll rain since dark clouds gathered."
      },
      {
        "term": "Desert / Dessert",
        "meaning": "Desert is a dry place or to abandon; dessert is a sweet course at the end of a meal",
        "example": "He wouldn't desert his friend, just as he wouldn't skip dessert after dinner."
      },
      {
        "term": "Beside / Besides",
        "meaning": "Beside means next to; besides means in addition to",
        "example": "Sit beside me, and besides, I have some interesting news to share."
      },
      {
        "term": "Continual / Continuous",
        "meaning": "Continual means happening repeatedly; continuous means happening without interruption",
        "example": "There was continual honking from cars and continuous rainfall through the day."
      },
      {
        "term": "Bring / Take",
        "meaning": "Bring means to carry toward the speaker; take means to carry away",
        "example": "Bring the report here and take the files with you when you leave."
      },
      {
        "term": "Emigrate / Immigrate",
        "meaning": "Emigrate means to leave a country; immigrate means to enter a country",
        "example": "They emigrated from India and immigrated to Canada."
      },
      {
        "term": "Explicit / Implicit",
        "meaning": "Explicit means clearly stated; implicit means implied or understood without being said",
        "example": "He gave explicit instructions, but the implicit expectation was that she'd follow them exactly."
      },
      {
        "term": "Appreciate / Depreciate",
        "meaning": "Appreciate means to increase in value or to be grateful; depreciate means to decrease in value",
        "example": "I appreciate your help, but my car will depreciate over time."
      }
    ],
    "faqs": [
      {
        "q": "How can I practice distinguishing confusing words?",
        "a": "Write sentences using both words in context, create comparison charts, and do practice exercises. Repetition and active usage are key to remembering these distinctions."
      },
      {
        "q": "Do spelling differences always indicate meaning differences?",
        "a": "Usually, but not always. Some words with similar spellings can have very different meanings, while some words with very different spellings might seem similar. Each pair is unique."
      }
    ]
  },
  {
    "slug": "foreign-words-phrases-set-1",
    "title": "Foreign Words and Phrases Set 1",
    "category": "Foreign Words and Phrases",
    "intro": "Discover commonly used foreign words and phrases that appear regularly in English writing and conversation. These expressions add sophistication and nuance to your vocabulary.",
    "items": [
      {
        "term": "Faux pas",
        "meaning": "An embarrassing mistake or breach of etiquette (from French)",
        "example": "Asking about her age was a social faux pas that he immediately regretted."
      },
      {
        "term": "Vis-à-vis",
        "meaning": "In relation to or facing (from French, meaning face to face)",
        "example": "Vis-à-vis the new policy, the employees have strong opinions."
      },
      {
        "term": "Naïve",
        "meaning": "Lacking experience or sophistication (from French)",
        "example": "She was naïve to believe that strangers on the internet were always truthful."
      },
      {
        "term": "Deja vu",
        "meaning": "A feeling that you've experienced something before (from French, meaning already seen)",
        "example": "Walking into that building gave me deja vu from my childhood visits."
      },
      {
        "term": "Café",
        "meaning": "A coffee shop or small restaurant (from French)",
        "example": "We met at the café for coffee and conversation."
      },
      {
        "term": "Résumé",
        "meaning": "A document summarizing your work experience and qualifications (from French)",
        "example": "Make sure your résumé is well-formatted before submitting it."
      },
      {
        "term": "Curriculum vitae (CV)",
        "meaning": "A detailed account of one's education and experience (from Latin)",
        "example": "In Europe, a CV is more detailed than a typical American résumé."
      },
      {
        "term": "De facto",
        "meaning": "In reality or in practice, though not officially (from Latin, meaning in fact)",
        "example": "She was the de facto leader even though he held the official title."
      },
      {
        "term": "Per se",
        "meaning": "In itself or intrinsically (from Latin)",
        "example": "Money per se doesn't guarantee happiness."
      },
      {
        "term": "Bonsai",
        "meaning": "The Japanese art of growing miniature trees in pots",
        "example": "She spent years perfecting her bonsai collection."
      }
    ],
    "faqs": [
      {
        "q": "Why do we use foreign words in English?",
        "a": "English has absorbed words from many languages due to trade, conquest, and cultural exchange. Some foreign words have no perfect English equivalent, so we use them directly."
      },
      {
        "q": "Do I need to pronounce foreign words correctly in English?",
        "a": "It's respectful to try, but English speakers often anglicize foreign words. Listeners will usually understand even if the pronunciation isn't perfect."
      }
    ]
  },
  {
    "slug": "foreign-words-phrases-set-2",
    "title": "Foreign Words and Phrases Set 2",
    "category": "Foreign Words and Phrases",
    "intro": "Expand your knowledge with more foreign words and phrases used in English. These expressions are particularly common in academic and professional contexts.",
    "items": [
      {
        "term": "Zeitgeist",
        "meaning": "The defining spirit or mood of a particular time (from German)",
        "example": "The protest captured the zeitgeist of young people frustrated with the system."
      },
      {
        "term": "Pro bono",
        "meaning": "Working without charge for the public good (from Latin, meaning for the public good)",
        "example": "The lawyer took the case pro bono to help the underprivileged family."
      },
      {
        "term": "Ad hoc",
        "meaning": "Created or done for a specific purpose without prior planning (from Latin)",
        "example": "We formed an ad hoc committee to address the immediate crisis."
      },
      {
        "term": "Rendezvous",
        "meaning": "A meeting at a predetermined time and place (from French)",
        "example": "They had a secret rendezvous at midnight in the park."
      },
      {
        "term": "Ensemble",
        "meaning": "A group of musicians, actors, or items considered as a whole (from French)",
        "example": "The ensemble performed beautifully at the concert."
      },
      {
        "term": "Encore",
        "meaning": "A repeated performance or additional appearance (from French)",
        "example": "The audience demanded an encore after the amazing show."
      },
      {
        "term": "In camera",
        "meaning": "In private or in a judge's office, not in open court (from Latin, meaning in chamber)",
        "example": "The sensitive details were discussed in camera."
      },
      {
        "term": "Memorabilia",
        "meaning": "Objects worth remembering or collecting (from Latin)",
        "example": "His sports memorabilia collection was worth thousands of dollars."
      },
      {
        "term": "Tsunami",
        "meaning": "A large ocean wave caused by underwater earthquakes (from Japanese)",
        "example": "The tsunami devastated the coastal communities."
      },
      {
        "term": "Karaoke",
        "meaning": "Entertainment where people sing along to prerecorded music (from Japanese)",
        "example": "We had fun singing karaoke at the party."
      }
    ],
    "faqs": [
      {
        "q": "How many foreign words are considered part of English?",
        "a": "Thousands of foreign words have been adopted into English. Once a word is used widely in English contexts, it's considered part of the English language, even if it originally came from another language."
      },
      {
        "q": "Should I italicize foreign words in English writing?",
        "a": "Words that are fully adopted into English (like café, résumé, and karaoke) are usually not italicized. Less common or newly used foreign words might be italicized to signal they're not standard English."
      }
    ]
  },
  {
    "slug": "daily-use-english-sentences-set-1",
    "title": "Daily Use English Sentences Set 1",
    "category": "Daily Sentences",
    "intro": "Master essential English sentences used in everyday Indian life. These simple but practical phrases will help you communicate naturally during your daily routines like morning conversations, school, home, and simple tasks.",
    "items": [
      {
        "term": "Good morning, how are you?",
        "meaning": "A polite greeting used when you meet someone in the morning",
        "example": "Good morning, how are you? I hope you slept well."
      },
      {
        "term": "What is your name?",
        "meaning": "To ask someone to tell you their name",
        "example": "What is your name? I have not met you before."
      },
      {
        "term": "Nice to meet you.",
        "meaning": "A polite expression when you meet someone for the first time",
        "example": "Nice to meet you. I have heard a lot about you from my sister."
      },
      {
        "term": "Where are you from?",
        "meaning": "To ask about someone's hometown or place of origin",
        "example": "Where are you from? I am from Mumbai."
      },
      {
        "term": "How are you today?",
        "meaning": "To ask about someone's current health or mood",
        "example": "How are you today? You look tired."
      },
      {
        "term": "I am fine, thank you.",
        "meaning": "A response to ask how you are doing",
        "example": "How are you? I am fine, thank you. And you?"
      },
      {
        "term": "Do you speak English?",
        "meaning": "To ask if someone can speak the English language",
        "example": "Do you speak English? I want to practice my speaking skills."
      },
      {
        "term": "What do you do?",
        "meaning": "To ask about someone's job or occupation",
        "example": "What do you do? My father works as an engineer in IT."
      },
      {
        "term": "What is the time?",
        "meaning": "To ask what hour it currently is",
        "example": "What is the time? Is it already nine o clock?"
      },
      {
        "term": "Can you help me?",
        "meaning": "To request assistance from someone",
        "example": "Can you help me with my homework? I do not understand this chapter."
      },
      {
        "term": "Where is the bathroom?",
        "meaning": "To ask the location of the toilet or washroom",
        "example": "Where is the bathroom? I need to use it right now."
      },
      {
        "term": "How much does this cost?",
        "meaning": "To ask the price of something in a shop",
        "example": "How much does this shirt cost? It looks nice on me."
      },
      {
        "term": "What is this?",
        "meaning": "To ask about the name or identity of something unfamiliar",
        "example": "What is this? I have never seen it before."
      },
      {
        "term": "I do not understand.",
        "meaning": "To say you are confused about what was said",
        "example": "I do not understand. Can you explain more slowly, please?"
      },
      {
        "term": "Can you speak slowly?",
        "meaning": "To request someone to speak at a slower pace",
        "example": "Can you speak slowly? Your accent is different and I am losing words."
      },
      {
        "term": "See you later.",
        "meaning": "A way to say goodbye when you will see someone again soon",
        "example": "I am leaving now. See you later, Mom."
      },
      {
        "term": "Good night, sleep well.",
        "meaning": "A polite expression when someone is going to sleep",
        "example": "It is eleven o clock. Good night, sleep well. We have school tomorrow."
      }
    ],
    "faqs": [
      {
        "q": "When should I use these daily sentences?",
        "a": "Use these sentences every day in real conversations at home, school, or with friends. The more you use them, the more natural they will feel. Practice saying them aloud to improve your pronunciation and confidence."
      },
      {
        "q": "Do all English speakers use these exact words?",
        "a": "Yes, these are very common sentences that English speakers use daily. However, there are many variations. For example, instead of 'Good morning, how are you?' you could say 'Good morning! How are things?' Both are correct and understood."
      }
    ]
  },
  {
    "slug": "daily-use-english-sentences-set-2",
    "title": "Daily Use English Sentences Set 2",
    "category": "Daily Sentences",
    "intro": "Expand your daily English with more practical sentences for school, family, and common situations. These phrases are used by students and Indian families constantly to handle everyday tasks and conversations.",
    "items": [
      {
        "term": "Did you finish your homework?",
        "meaning": "To ask if someone has completed their studies or assignments",
        "example": "Did you finish your homework? We cannot watch TV until you do."
      },
      {
        "term": "What did you eat for breakfast?",
        "meaning": "To ask about the first meal someone had in the morning",
        "example": "What did you eat for breakfast? I had dosa and chutney."
      },
      {
        "term": "It is very hot today.",
        "meaning": "To comment about the high temperature of the weather",
        "example": "It is very hot today. I need to drink more water."
      },
      {
        "term": "What time do you wake up?",
        "meaning": "To ask what hour someone gets out of bed",
        "example": "What time do you wake up? I wake up at six in the morning."
      },
      {
        "term": "Can I borrow your pen?",
        "meaning": "To politely ask if you can temporarily use something that belongs to someone",
        "example": "Can I borrow your pen? I forgot mine at home."
      },
      {
        "term": "How was your day?",
        "meaning": "To ask about how someone spent their day and how they felt",
        "example": "How was your day? Tell me what you did at school."
      },
      {
        "term": "I am very tired.",
        "meaning": "To express that you have no energy or are exhausted",
        "example": "I am very tired. Can I sleep for a while before dinner?"
      },
      {
        "term": "What is for dinner?",
        "meaning": "To ask what food will be prepared for the evening meal",
        "example": "What is for dinner? I can smell something delicious cooking."
      },
      {
        "term": "Do you like ice cream?",
        "meaning": "To ask if someone enjoys eating ice cream",
        "example": "Do you like ice cream? Let us get some vanilla ice cream on the way home."
      },
      {
        "term": "I am going to the market.",
        "meaning": "To tell someone you will go shopping or to a marketplace soon",
        "example": "I am going to the market. Do you need anything from there?"
      },
      {
        "term": "What is your favorite food?",
        "meaning": "To ask which food someone likes the most",
        "example": "What is your favorite food? Mine is biryani with raita."
      },
      {
        "term": "Can we go to the park?",
        "meaning": "To politely ask permission to go to a public recreational place",
        "example": "Can we go to the park? I want to play on the swings."
      },
      {
        "term": "Do you have a mobile phone?",
        "meaning": "To ask if someone owns or possesses a cell phone",
        "example": "Do you have a mobile phone? I forgot mine and need to call home."
      },
      {
        "term": "When is your birthday?",
        "meaning": "To ask on what date someone was born or when they celebrate",
        "example": "When is your birthday? I want to get you a gift."
      },
      {
        "term": "How many brothers and sisters do you have?",
        "meaning": "To ask about the number of siblings in someone's family",
        "example": "How many brothers and sisters do you have? I have one sister and two brothers."
      },
      {
        "term": "I will see you tomorrow.",
        "meaning": "To confirm that you will meet someone on the next day",
        "example": "I have to go now. I will see you tomorrow in class."
      },
      {
        "term": "What is your address?",
        "meaning": "To ask where someone lives or the location of their house",
        "example": "What is your address? I want to mail you an invitation."
      }
    ],
    "faqs": [
      {
        "q": "Why are these questions asked so often in English?",
        "a": "These questions are very common because they are about things people think about every day: food, family, time, tiredness, and plans. In English, people ask these questions to start conversations and show interest in each other."
      },
      {
        "q": "Should I answer these questions with only yes or no?",
        "a": "No, it is better to answer with complete sentences. For example, if someone asks 'How was your day?' instead of just saying 'Good,' say 'My day was good. We had a test in math and I got full marks.' This shows you are fluent and confident."
      }
    ]
  },
  {
    "slug": "daily-use-english-sentences-set-3",
    "title": "Daily Use English Sentences Set 3",
    "category": "Daily Sentences",
    "intro": "Master more daily English for expressing feelings, asking for permission, making suggestions, and dealing with problems. These sentences are essential for students and anyone who wants to communicate naturally in everyday situations.",
    "items": [
      {
        "term": "I am very hungry.",
        "meaning": "To express that you need to eat because your stomach is empty",
        "example": "I am very hungry. It is already one o clock and I have not eaten."
      },
      {
        "term": "May I come in?",
        "meaning": "To politely ask permission to enter a room or place",
        "example": "May I come in? The door is closed and I do not want to disturb you."
      },
      {
        "term": "I am sorry for being late.",
        "meaning": "To apologize because you arrived after the expected time",
        "example": "I am sorry for being late. The traffic was very bad on the way."
      },
      {
        "term": "Thank you very much.",
        "meaning": "To express gratitude in a strong, sincere way",
        "example": "Thank you very much. You really helped me when I needed it most."
      },
      {
        "term": "You are welcome.",
        "meaning": "A polite response when someone thanks you",
        "example": "You are welcome. It was my pleasure to help you."
      },
      {
        "term": "What should I do?",
        "meaning": "To ask for advice or guidance about a problem or decision",
        "example": "I failed my test. What should I do? I am so upset."
      },
      {
        "term": "That is not fair.",
        "meaning": "To express that something is unjust or unequal",
        "example": "That is not fair. She got more marks than me but I worked harder."
      },
      {
        "term": "I am very happy.",
        "meaning": "To express strong joy or satisfaction",
        "example": "I am very happy today. My mother bought me a new book."
      },
      {
        "term": "I am very sad.",
        "meaning": "To express deep unhappiness or sorrow",
        "example": "I am very sad. My best friend is moving to another city."
      },
      {
        "term": "Do not worry.",
        "meaning": "To reassure someone and tell them not to be anxious",
        "example": "Do not worry about the exam. You have studied hard and will do well."
      },
      {
        "term": "I am scared.",
        "meaning": "To express fear or anxiety about something",
        "example": "I am scared of the dark. Can you stay with me?"
      },
      {
        "term": "What do you think?",
        "meaning": "To ask someone for their opinion or viewpoint",
        "example": "I want to buy a new bag. What do you think of this one?"
      },
      {
        "term": "I have a headache.",
        "meaning": "To say that your head is painful or aching",
        "example": "I have a headache. Can I rest for a while?"
      },
      {
        "term": "Be careful!",
        "meaning": "To warn someone to be cautious or attentive",
        "example": "Be careful! The floor is wet and slippery."
      },
      {
        "term": "Come here, please.",
        "meaning": "To politely ask someone to come to where you are",
        "example": "Come here, please. I want to show you something nice."
      },
      {
        "term": "Take care of yourself.",
        "meaning": "To advise someone to look after their health and safety",
        "example": "Take care of yourself during these rainy days. Wear proper clothes."
      },
      {
        "term": "I miss you.",
        "meaning": "To express that you think about someone and wish they were here",
        "example": "It has been two months since you left. I miss you so much."
      }
    ],
    "faqs": [
      {
        "q": "How do I say these sentences with the right emotion?",
        "a": "The emotion in your voice matters as much as the words. When you say 'I am very happy,' smile and use a bright tone. When you say 'I am very sad,' use a softer and slower tone. Practice saying each sentence with different emotions in front of a mirror."
      },
      {
        "q": "Are these sentences formal or informal?",
        "a": "These sentences are informal and friendly. They are perfect for talking to family, friends, and classmates. If you need to speak with teachers or in formal situations, you would use more formal language like 'Could you please assist me?' instead of 'Can you help me?'"
      }
    ]
  },
  {
    "slug": "conversation-greetings",
    "title": "Conversation Starters: Greetings and Introductions",
    "category": "Conversation",
    "intro": "Learn how to start conversations naturally in English. These greetings and introductions are used when you meet someone new or when you want to begin a friendly chat with anyone in India or abroad.",
    "items": [
      {
        "term": "Hi, I am Ravi. What is your name?",
        "meaning": "A casual, friendly way to introduce yourself and ask someone their name",
        "example": "Hi, I am Ravi. What is your name? Nice to meet you."
      },
      {
        "term": "Hello! How have you been?",
        "meaning": "A warm greeting to someone you have not seen for a while",
        "example": "Hello! How have you been? It has been months since we last met."
      },
      {
        "term": "What a beautiful day, isn't it?",
        "meaning": "A comment about the weather as a conversation starter with strangers",
        "example": "What a beautiful day, isn't it? Perfect weather for a picnic."
      },
      {
        "term": "I have heard so much about you.",
        "meaning": "To say that someone has told you good things about the person",
        "example": "I have heard so much about you from Priya. She says you are very talented."
      },
      {
        "term": "It is good to see you again.",
        "meaning": "To express happiness at meeting someone you know",
        "example": "It is good to see you again! You look healthy and happy."
      },
      {
        "term": "How do you know each other?",
        "meaning": "To ask how two people became acquainted or friends",
        "example": "How do you know each other? Did you meet in college?"
      },
      {
        "term": "Where do you study?",
        "meaning": "To ask which school or college someone attends",
        "example": "Where do you study? I am in Delhi Public School."
      },
      {
        "term": "What brings you here?",
        "meaning": "To politely ask why someone has come to this place",
        "example": "What brings you here? Are you visiting or do you live in this city?"
      },
      {
        "term": "I am so glad you came.",
        "meaning": "To express happiness that someone has arrived or showed up",
        "example": "I am so glad you came! I was worried you might not make it."
      },
      {
        "term": "Can we be friends?",
        "meaning": "To ask if someone is willing to be your friend",
        "example": "Can we be friends? I think we have a lot in common."
      },
      {
        "term": "It has been a long time.",
        "meaning": "To say that a lot of time has passed since you last saw someone",
        "example": "It has been a long time since we spoke. How is your family?"
      },
      {
        "term": "Welcome to my home.",
        "meaning": "To greet a guest when they arrive at your house",
        "example": "Welcome to my home! Come in, come in. Let me show you around."
      },
      {
        "term": "I am delighted to meet you.",
        "meaning": "A formal, polite way to express that you are happy to meet someone",
        "example": "I am delighted to meet you, Mr. Sharma. Your reputation is well known."
      },
      {
        "term": "Tell me about yourself.",
        "meaning": "To ask someone to share information about their life and interests",
        "example": "Tell me about yourself. What do you like to do in your free time?"
      },
      {
        "term": "What have you been doing lately?",
        "meaning": "To ask what activities or projects someone has been involved in recently",
        "example": "What have you been doing lately? I heard you started a business."
      },
      {
        "term": "Do we have any mutual friends?",
        "meaning": "To ask if there are people that both you and someone else know",
        "example": "Do we have any mutual friends? I feel like I should know you from somewhere."
      },
      {
        "term": "I am happy to see you.",
        "meaning": "A sincere expression that you are pleased to see someone",
        "example": "I am happy to see you! You have not changed a bit since school."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between 'Hi' and 'Hello'?",
        "a": "'Hi' is more casual and informal, used with friends and people you know. 'Hello' is more formal and proper, used in professional settings. Both are understood everywhere, but use 'Hi' with friends and 'Hello' with new people or in formal situations."
      },
      {
        "q": "Why do people ask about the weather when they meet?",
        "a": "Asking about the weather is a safe and easy way to start a conversation with someone you do not know well. It shows you are friendly and gives both people time to become comfortable talking to each other. This is called 'small talk'."
      }
    ]
  },
  {
    "slug": "conversation-at-school",
    "title": "Conversation at School: Classroom and Friends",
    "category": "Conversation",
    "intro": "Master English phrases used every day at school among students and with teachers. These conversations will help you communicate better in class, ask for help, and make friends while discussing studies and school life.",
    "items": [
      {
        "term": "Can I sit here?",
        "meaning": "To politely ask permission to take a seat next to someone",
        "example": "Can I sit here? All the other seats are taken."
      },
      {
        "term": "What is the homework for tomorrow?",
        "meaning": "To ask what assignment has been given by the teacher",
        "example": "What is the homework for tomorrow? I did not catch what the teacher said."
      },
      {
        "term": "Can you lend me your notes?",
        "meaning": "To ask if you can borrow someone's written notes temporarily",
        "example": "Can you lend me your notes? I was absent yesterday."
      },
      {
        "term": "What did the teacher say?",
        "meaning": "To ask someone to repeat or explain what a teacher taught",
        "example": "What did the teacher say about the exam? I was not paying attention."
      },
      {
        "term": "I do not get this question.",
        "meaning": "To say that you do not understand how to answer a problem",
        "example": "I do not get this question. Can you explain it to me?"
      },
      {
        "term": "Do you understand the lesson?",
        "meaning": "To ask if someone comprehends what was taught in class",
        "example": "Do you understand the lesson? Can we study together?"
      },
      {
        "term": "Can we form a study group?",
        "meaning": "To ask if friends want to study together as a team",
        "example": "Can we form a study group? The exam is next week."
      },
      {
        "term": "Let us go to lunch.",
        "meaning": "To invite someone to eat the midday meal together",
        "example": "Let us go to lunch. I am very hungry and the canteen food is good today."
      },
      {
        "term": "What is your best subject?",
        "meaning": "To ask which subject someone is best at or likes most",
        "example": "What is your best subject? I love science but I am weak in history."
      },
      {
        "term": "Want to play during lunch break?",
        "meaning": "To invite someone to do sports or games during recess time",
        "example": "Want to play during lunch break? We can play badminton or cricket."
      },
      {
        "term": "I forgot my textbook.",
        "meaning": "To inform someone that you left your book at home or lost it",
        "example": "I forgot my textbook. Can I share with you during the class?"
      },
      {
        "term": "Can I copy your homework?",
        "meaning": "To ask if you can write down answers from someone else's work",
        "example": "Can I copy your homework? I ran out of time last night."
      },
      {
        "term": "Sir, can you explain this again?",
        "meaning": "To politely ask a teacher to teach something one more time",
        "example": "Sir, can you explain this again? I did not understand the first time."
      },
      {
        "term": "When is the exam?",
        "meaning": "To ask on what date a test or exam will be held",
        "example": "When is the exam? Is it next week or the week after?"
      },
      {
        "term": "How did you do on the test?",
        "meaning": "To ask how well someone performed on an exam",
        "example": "How did you do on the test? I think I failed."
      },
      {
        "term": "Let us be project partners.",
        "meaning": "To suggest working together on a group assignment",
        "example": "Let us be project partners. We work well together."
      },
      {
        "term": "Can we exchange phone numbers?",
        "meaning": "To ask if you can get someone's contact details",
        "example": "Can we exchange phone numbers? It will be easier to share notes."
      }
    ],
    "faqs": [
      {
        "q": "Is it okay to ask classmates about homework?",
        "a": "Yes, it is okay to ask what the homework is. However, you should do it yourself rather than copying someone else's work. If you are stuck, ask your friend to explain the solution instead of just copying. Teachers can tell when you copy and it is dishonest."
      },
      {
        "q": "How should I ask a teacher for help politely?",
        "a": "Always start with 'Sir' or 'Madam', then say your question clearly. For example: 'Madam, I do not understand this concept. Can you please explain it?' Teachers respect students who ask questions and show that they are trying to learn."
      }
    ]
  },
  {
    "slug": "conversation-shopping",
    "title": "Conversation While Shopping: Shops and Markets",
    "category": "Conversation",
    "intro": "Learn how to speak English while buying things at shops, markets, and stores in India. These practical phrases will help you ask prices, bargain, and communicate with shopkeepers naturally.",
    "items": [
      {
        "term": "Do you have this in a different size?",
        "meaning": "To ask if a clothing item is available in another dimension",
        "example": "Do you have this in a different size? This shirt is too large for me."
      },
      {
        "term": "What is the price?",
        "meaning": "To ask how much money something costs",
        "example": "What is the price? It is not marked on the tag."
      },
      {
        "term": "Is this the cheapest you can go?",
        "meaning": "To ask if the seller can reduce the price or offer a discount",
        "example": "Is this the cheapest you can go? I buy here regularly."
      },
      {
        "term": "Can you give me a discount?",
        "meaning": "To request a reduction in the price",
        "example": "Can you give me a discount? I am buying three items."
      },
      {
        "term": "Do you have anything cheaper?",
        "meaning": "To ask if there is a less expensive version or alternative",
        "example": "Do you have anything cheaper? This is a bit expensive for me."
      },
      {
        "term": "Can I try this on?",
        "meaning": "To ask permission to wear clothing to see if it fits properly",
        "example": "Can I try this on? I want to see how it looks on me."
      },
      {
        "term": "Where is the fitting room?",
        "meaning": "To ask the location of the room where you can change clothes",
        "example": "Where is the fitting room? I want to try on these jeans."
      },
      {
        "term": "Is this original or duplicate?",
        "meaning": "To ask if a product is genuine or fake",
        "example": "Is this original or duplicate? I only buy genuine products."
      },
      {
        "term": "Do you accept credit cards?",
        "meaning": "To ask if you can pay with a plastic bank card",
        "example": "Do you accept credit cards? I do not have much cash."
      },
      {
        "term": "Can I have a receipt?",
        "meaning": "To request a written proof of your purchase",
        "example": "Can I have a receipt? I need it for my records."
      },
      {
        "term": "What is the warranty?",
        "meaning": "To ask how long the shop will repair items for free",
        "example": "What is the warranty? Does it cover accidental damage?"
      },
      {
        "term": "Can you deliver it to my home?",
        "meaning": "To ask if the shop will bring the product to your house",
        "example": "Can you deliver it to my home? The item is very heavy."
      },
      {
        "term": "When will it be available?",
        "meaning": "To ask when a product that is currently out of stock will return",
        "example": "When will it be available? I want this color but it is out of stock."
      },
      {
        "term": "This has a defect. Can I return it?",
        "meaning": "To ask if you can give back damaged goods and get money back",
        "example": "This has a defect. Can I return it? The color is fading."
      },
      {
        "term": "Do you have a return policy?",
        "meaning": "To ask what rules the shop has about giving back purchases",
        "example": "Do you have a return policy? How long can I return items?"
      },
      {
        "term": "What is your best selling item?",
        "meaning": "To ask which product is the most popular in the shop",
        "example": "What is your best selling item? I want something that is popular."
      },
      {
        "term": "Will the price go down soon?",
        "meaning": "To ask if something will become cheaper in the near future",
        "example": "Will the price go down soon? The season is almost over."
      }
    ],
    "faqs": [
      {
        "q": "Is bargaining acceptable in English-speaking countries?",
        "a": "In countries like India, bargaining is common and expected in markets and small shops. However, in supermarkets and big brand stores, prices are fixed and you usually cannot negotiate. In Western countries, bargaining is rarely done except at car dealerships or real estate sales."
      },
      {
        "q": "What should I do if I feel cheated after buying something?",
        "a": "If you believe you have been deceived, politely tell the shopkeeper: 'I do not think this is genuine. Can we discuss the issue?' Most shopkeepers will replace the item or return your money if you have proof of purchase. Always keep your receipt."
      }
    ]
  },
  {
    "slug": "conversation-travel",
    "title": "Conversation While Traveling: Trains, Buses, and Hotels",
    "category": "Conversation",
    "intro": "Learn essential English phrases for when you travel by train, bus, or plane, or when you stay in hotels. These sentences will help you communicate with conductors, hotel staff, and fellow travelers easily.",
    "items": [
      {
        "term": "Which platform is the train on?",
        "meaning": "To ask at which numbered track the train is located",
        "example": "Which platform is the train on? I cannot find it."
      },
      {
        "term": "What time does the bus arrive?",
        "meaning": "To ask when the bus will come to the station",
        "example": "What time does the bus arrive? I need to reach the office by ten."
      },
      {
        "term": "How much is the ticket to Mumbai?",
        "meaning": "To ask the price of a transport ticket to a destination",
        "example": "How much is the ticket to Mumbai? I need a one-way ticket."
      },
      {
        "term": "Is this seat taken?",
        "meaning": "To ask if someone is sitting in a particular seat",
        "example": "Is this seat taken? Can I sit here?"
      },
      {
        "term": "Can you help me with my luggage?",
        "meaning": "To ask someone to assist you with your bags or suitcase",
        "example": "Can you help me with my luggage? It is very heavy."
      },
      {
        "term": "Where is the washroom?",
        "meaning": "To ask where the toilet is in a train or bus",
        "example": "Where is the washroom? I need to use it."
      },
      {
        "term": "Do you know how to get to this address?",
        "meaning": "To ask someone for directions to a place",
        "example": "Do you know how to get to 45 Gandhi Street? I am new here."
      },
      {
        "term": "I need a single room with a bathroom.",
        "meaning": "To request accommodation at a hotel for one person",
        "example": "I need a single room with a bathroom. How much per night?"
      },
      {
        "term": "How long is the check-in process?",
        "meaning": "To ask how much time is needed to register at a hotel",
        "example": "How long is the check-in process? I am in a hurry."
      },
      {
        "term": "What time is breakfast served?",
        "meaning": "To ask when the morning meal is available at the hotel",
        "example": "What time is breakfast served? I want to eat before going out."
      },
      {
        "term": "Is there Wi-Fi in the room?",
        "meaning": "To ask if internet connection is available",
        "example": "Is there Wi-Fi in the room? I need to work online."
      },
      {
        "term": "Can you wake me up at six tomorrow?",
        "meaning": "To ask the hotel staff to call you at a specific time",
        "example": "Can you wake me up at six tomorrow? I have an early meeting."
      },
      {
        "term": "What is the cancellation policy?",
        "meaning": "To ask about rules for canceling a booking",
        "example": "What is the cancellation policy? Can I cancel without losing money?"
      },
      {
        "term": "Is this the right platform for Delhi?",
        "meaning": "To confirm if you are waiting at the correct location",
        "example": "Is this the right platform for Delhi? I do not want to miss my train."
      },
      {
        "term": "How long is the journey?",
        "meaning": "To ask how much time it takes to reach a destination",
        "example": "How long is the journey from Delhi to Agra? Is it three hours?"
      },
      {
        "term": "Are we on time?",
        "meaning": "To ask if the transport is running according to schedule",
        "example": "Are we on time? Or will we be delayed?"
      },
      {
        "term": "Can I book a return ticket?",
        "meaning": "To ask if you can purchase a round-trip ticket",
        "example": "Can I book a return ticket? I am going for two weeks."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a platform and a track?",
        "a": "In Indian trains, a platform is the place where passengers board and exit. A track is the railroad line itself. When you ask for the platform, you are asking where to stand to board the train. This is important because trains use different platforms."
      },
      {
        "q": "Should I always use formal language when traveling?",
        "a": "It is safer to be polite and formal when traveling, especially with strangers, conductors, and hotel staff. Use 'Sir,' 'Madam,' 'Please,' and 'Thank you.' This shows respect and usually gets better service."
      }
    ]
  },
  {
    "slug": "conversation-phone",
    "title": "Conversation on the Phone: Calls and Messages",
    "category": "Conversation",
    "intro": "Master English expressions used during phone conversations, voice calls, and when leaving messages. These practical phrases will help you communicate confidently on the phone with anyone, whether calling for information or personal conversation.",
    "items": [
      {
        "term": "Hello, who is this?",
        "meaning": "To ask who is calling you or who is on the other end of the line",
        "example": "Hello, who is this? I do not recognize your voice."
      },
      {
        "term": "Can I speak to Priya?",
        "meaning": "To ask if a specific person is available to talk",
        "example": "Can I speak to Priya? This is her friend Anisha."
      },
      {
        "term": "Hold on for a moment, please.",
        "meaning": "To ask someone to wait while you do something",
        "example": "Hold on for a moment, please. She is coming to the phone."
      },
      {
        "term": "I will call you back later.",
        "meaning": "To say you will call someone again at a different time",
        "example": "I will call you back later. I am busy right now."
      },
      {
        "term": "Can you speak louder?",
        "meaning": "To ask someone to increase the volume of their voice",
        "example": "Can you speak louder? The connection is bad and I cannot hear you."
      },
      {
        "term": "You are breaking up.",
        "meaning": "To tell someone that the call quality is poor and the sound is cutting off",
        "example": "You are breaking up. Can you move to a better location?"
      },
      {
        "term": "I cannot hear you.",
        "meaning": "To say that the other person's voice is not coming through clearly",
        "example": "I cannot hear you. Can you call me back?"
      },
      {
        "term": "My battery is low.",
        "meaning": "To inform someone that your phone will soon run out of power",
        "example": "My battery is low. I need to charge it soon. Let me call you later."
      },
      {
        "term": "What is your number?",
        "meaning": "To ask for someone's phone number",
        "example": "What is your number? I want to call you tomorrow."
      },
      {
        "term": "Did you get my message?",
        "meaning": "To ask if someone received a text message or email from you",
        "example": "Did you get my message? I sent it an hour ago."
      },
      {
        "term": "Can I leave a message?",
        "meaning": "To ask if you can record a message since the person is not available",
        "example": "Can I leave a message? When will he be back?"
      },
      {
        "term": "This is a wrong number.",
        "meaning": "To tell someone that they have called the incorrect phone number",
        "example": "This is a wrong number. You have the wrong person."
      },
      {
        "term": "Please call me back when you have time.",
        "meaning": "A polite way to ask someone to contact you later",
        "example": "Please call me back when you have time. It is not urgent."
      },
      {
        "term": "I am sending you a message.",
        "meaning": "To inform someone that you are about to text them",
        "example": "I am sending you a message with my new address."
      },
      {
        "term": "What is the best time to call?",
        "meaning": "To ask when would be most convenient for someone to receive a call",
        "example": "What is the best time to call? I do not want to disturb your studies."
      },
      {
        "term": "Thank you for calling.",
        "meaning": "A polite farewell expression at the end of a phone conversation",
        "example": "Thank you for calling. Take care of yourself."
      },
      {
        "term": "I will text you the details.",
        "meaning": "To say you will send written information by text message",
        "example": "I will text you the details. It is easier than explaining on the phone."
      }
    ],
    "faqs": [
      {
        "q": "Why do people say things differently on the phone than in person?",
        "a": "On the phone, you cannot see facial expressions or body language, so you need to be clearer and more direct. You also need to speak more slowly and loudly. Additionally, phone conversations are more brief and to the point compared to face-to-face conversation."
      },
      {
        "q": "What should I do if I call someone and they do not answer?",
        "a": "You have a few options. You can call again after a few minutes, you can send a text message, or you can leave a voice message. A good message is: 'Hi, this is Rahul. Please call me back when you get a chance.' Always leave your name so they know who called."
      }
    ]
  },
  {
    "slug": "common-spoken-mistakes-indians-make",
    "title": "Common Spoken Mistakes Indians Make: Corrections and Right Usage",
    "category": "Spoken Mistakes",
    "intro": "Learn the most common English mistakes that Indian English learners make when speaking. Understanding these errors will help you avoid them and speak English like a native speaker. Each mistake is corrected with the right way to say it.",
    "items": [
      {
        "term": "WRONG: 'I am boring.' RIGHT: 'I am bored.'",
        "meaning": "Boring means something is not interesting; bored means you feel uninterested. Use 'am boring' only if you want to say you are the one making others bored.",
        "example": "WRONG: I am boring without TV. RIGHT: I am bored without TV."
      },
      {
        "term": "WRONG: 'What is your good name?' RIGHT: 'What is your name?'",
        "meaning": "In English, we do not add 'good' before name. This is an Indian English phrase that is not used in standard English.",
        "example": "WRONG: What is your good name? RIGHT: What is your name? / What should I call you?"
      },
      {
        "term": "WRONG: 'I am coming from Delhi.' RIGHT: 'I am from Delhi.' or 'I come from Delhi.'",
        "meaning": "Use 'am coming from' only if you are traveling to the place right now. To say your hometown, use 'am from' or 'come from'.",
        "example": "WRONG: I am coming from Delhi. RIGHT: I am from Delhi. / He is coming from the office. (correct)"
      },
      {
        "term": "WRONG: 'I have taken one coffee.' RIGHT: 'I have had a coffee.' or 'I took a coffee.'",
        "meaning": "We use 'have had' not 'have taken' for food and drinks. 'Taken' means you removed something from its place.",
        "example": "WRONG: I have taken lunch. RIGHT: I have had lunch. / I took a coffee this morning. (correct)"
      },
      {
        "term": "WRONG: 'Can you do one thing?' RIGHT: 'Can you do me a favor?' or 'Can you help me?'",
        "meaning": "'Do one thing' is very Indian English and sounds odd. Instead, directly ask for what you want or use a standard phrase.",
        "example": "WRONG: Can you do one thing for me? RIGHT: Can you help me with this? / Can you do me a favor?"
      },
      {
        "term": "WRONG: 'I am having a doubt.' RIGHT: 'I have a doubt.' or 'I am confused.'",
        "meaning": "We do not use 'am having' with doubt. Use simple present 'have' or say 'am confused'.",
        "example": "WRONG: I am having a doubt about this. RIGHT: I have a doubt. / I am confused about this."
      },
      {
        "term": "WRONG: 'Kindly do the needful.' RIGHT: 'Please do what is necessary.' or 'Please handle this.'",
        "meaning": "'Do the needful' is outdated and very formal Indian English. Use modern, simpler language instead.",
        "example": "WRONG: Kindly do the needful. RIGHT: Please take care of this. / Please handle it."
      },
      {
        "term": "WRONG: 'Where do you stay?' RIGHT: 'Where do you live?'",
        "meaning": "While not wrong, 'stay' is more temporary. 'Live' is the standard way to ask about someone's home.",
        "example": "WRONG: Where do you stay? RIGHT: Where do you live? (or 'Where do you stay?' is acceptable but less common)"
      },
      {
        "term": "WRONG: 'I will do it, no?' RIGHT: 'I will do it, won't I?' or 'I will do it, okay?'",
        "meaning": "The tag question 'no?' is Indian English. Use 'won't I' or simply ask 'okay?'",
        "example": "WRONG: I will call you, no? RIGHT: I will call you, won't I? / I will call you, okay?"
      },
      {
        "term": "WRONG: 'It is a long time to wait.' RIGHT: 'It is a long wait.' or 'Waiting takes a long time.'",
        "meaning": "The structure is awkward. Simplify by removing 'to'.",
        "example": "WRONG: It is a long time to wait. RIGHT: It is a long wait. / The wait is long."
      },
      {
        "term": "WRONG: 'What is happening to you?' RIGHT: 'How are you?' or 'What is wrong?'",
        "meaning": "'What is happening to you?' sounds like something bad occurred. Use 'How are you?' for normal greeting.",
        "example": "WRONG: What is happening to you? RIGHT: How are you? / Are you okay?"
      },
      {
        "term": "WRONG: 'I am married with Priya.' RIGHT: 'I am married to Priya.'",
        "meaning": "Use 'to' not 'with' after the verb 'marry'.",
        "example": "WRONG: She is married with him. RIGHT: She is married to him."
      },
      {
        "term": "WRONG: 'Since last five years.' RIGHT: 'For the last five years.' or 'For five years.'",
        "meaning": "Use 'since' with a specific time point (since 2020), and 'for' with a duration (for five years).",
        "example": "WRONG: I am here since five years. RIGHT: I have been here for five years. / I have been here since 2019."
      },
      {
        "term": "WRONG: 'He is not coming, he is busy only.' RIGHT: 'He is not coming because he is busy.' or 'He cannot come; he is busy.'",
        "meaning": "The word 'only' at the end is Indian English. Use a clear connector like 'because' instead.",
        "example": "WRONG: I cannot help, I am tired only. RIGHT: I cannot help because I am tired. / I am too tired to help."
      },
      {
        "term": "WRONG: 'What all things do you like?' RIGHT: 'What things do you like?' or 'What do you like?'",
        "meaning": "We do not add 'all' in the middle. Simply remove it.",
        "example": "WRONG: What all subjects do you study? RIGHT: What subjects do you study? / What do you study?"
      },
      {
        "term": "WRONG: 'I am feeling very headache.' RIGHT: 'I have a bad headache.' or 'My head hurts.'",
        "meaning": "We do not 'feel' a headache. We 'have' a headache or 'experience' pain.",
        "example": "WRONG: I am feeling very pain. RIGHT: I am in pain. / I have severe pain."
      },
      {
        "term": "WRONG: 'Revert back to me.' RIGHT: 'Get back to me.' or 'Please reply.'",
        "meaning": "'Revert back' is redundant and outdated. Use 'get back' or 'reply' instead.",
        "example": "WRONG: Revert back to me with the details. RIGHT: Please get back to me with the details. / Please reply."
      }
    ],
    "faqs": [
      {
        "q": "Why do Indians make these mistakes?",
        "a": "These mistakes happen because Indian English has developed its own patterns influenced by Indian languages like Hindi, Tamil, and Bengali. While Indian English is valid and understood, if you want to speak standard international English, learning these corrections is important."
      },
      {
        "q": "Will native English speakers criticize me if I make these mistakes?",
        "a": "Most native speakers understand Indian English and will not criticize you. However, for formal situations like job interviews, academic presentations, or international communication, it is better to use standard English. Your goal determines what you should focus on."
      }
    ]
  },
  {
    "slug": "polite-expressions",
    "title": "Polite Expressions: Saying Things Nicely",
    "category": "Spoken English",
    "intro": "Learn how to speak politely in English. Using polite expressions shows respect and makes people want to help you. These phrases are essential in schools, offices, with elders, and in formal situations.",
    "items": [
      {
        "term": "Please, can you help me?",
        "meaning": "A very polite way to ask for assistance",
        "example": "Please, can you help me with my homework? I do not understand this chapter."
      },
      {
        "term": "Would you mind if I asked a question?",
        "meaning": "An extremely polite way to ask for permission to ask something",
        "example": "Would you mind if I asked a question? I am confused about this."
      },
      {
        "term": "If you do not mind, can I sit here?",
        "meaning": "A polite way to ask permission for something you want to do",
        "example": "If you do not mind, can I sit here? All other seats are occupied."
      },
      {
        "term": "Would you be so kind as to help me?",
        "meaning": "An old-fashioned but very formal and polite request",
        "example": "Would you be so kind as to help me with this heavy box?"
      },
      {
        "term": "I would appreciate it if you could help.",
        "meaning": "A polite way to express that you want something and value their help",
        "example": "I would appreciate it if you could review my essay before submission."
      },
      {
        "term": "Excuse me, could you tell me the time?",
        "meaning": "A polite way to get someone's attention and ask for information",
        "example": "Excuse me, could you tell me the time? My watch is broken."
      },
      {
        "term": "I beg your pardon.",
        "meaning": "A very polite way to apologize or ask someone to repeat something",
        "example": "I beg your pardon. I did not catch what you said."
      },
      {
        "term": "I am terribly sorry.",
        "meaning": "A strong apology expressing deep regret",
        "example": "I am terribly sorry for being late. The traffic was unexpected."
      },
      {
        "term": "Please forgive me.",
        "meaning": "To ask someone to stop being upset with you",
        "example": "Please forgive me for my mistake. It will not happen again."
      },
      {
        "term": "That is very kind of you.",
        "meaning": "To show appreciation for someone's thoughtful action",
        "example": "That is very kind of you to help me move my books."
      },
      {
        "term": "You are very kind, thank you.",
        "meaning": "To gratefully acknowledge someone's help or generosity",
        "example": "You are very kind, thank you so much for the gift."
      },
      {
        "term": "I am so grateful to you.",
        "meaning": "To express deep thankfulness and appreciation",
        "example": "I am so grateful to you for helping me study for the exam."
      },
      {
        "term": "You have been very helpful.",
        "meaning": "To praise someone for their assistance",
        "example": "You have been very helpful. I could not have done it without you."
      },
      {
        "term": "May I use your phone, please?",
        "meaning": "A polite request to use someone's possession",
        "example": "May I use your phone, please? Mine is not working."
      },
      {
        "term": "Would it be possible for me to leave early?",
        "meaning": "A very polite way to ask permission to do something",
        "example": "Would it be possible for me to leave early today? I have a doctor appointment."
      },
      {
        "term": "I hope I am not bothering you.",
        "meaning": "A considerate way to start a request or conversation",
        "example": "I hope I am not bothering you. Do you have a moment to talk?"
      },
      {
        "term": "With all due respect, I disagree.",
        "meaning": "A polite way to express disagreement without being rude",
        "example": "With all due respect, I think the answer is different. Can we check again?"
      }
    ],
    "faqs": [
      {
        "q": "Is it necessary to use all these polite words in English?",
        "a": "The level of politeness depends on the situation. With friends, you can be casual. With teachers, elders, strangers, and in formal settings, politeness is important. Learning these expressions shows maturity and respect, which opens more doors in life."
      },
      {
        "q": "Can being too polite make me sound strange?",
        "a": "It is better to be more polite than less polite. However, you can adjust based on the person and situation. With close friends, using too many 'pleases' sounds unnatural. With strangers or authority figures, politeness is always appreciated."
      }
    ]
  },
  {
    "slug": "asking-questions-english",
    "title": "Asking Questions in English: Question Formation",
    "category": "Spoken English",
    "intro": "Master how to ask different types of questions in English. Learning proper question formation is essential for having conversations, getting information, and showing curiosity about the world around you.",
    "items": [
      {
        "term": "What do you want?",
        "meaning": "A question starting with 'what' to ask about a person's desire or preference",
        "example": "What do you want for lunch? I can order anything."
      },
      {
        "term": "When did you arrive?",
        "meaning": "A question using 'when' to ask about the time of an event",
        "example": "When did you arrive? I have been waiting for an hour."
      },
      {
        "term": "Where is the nearest hospital?",
        "meaning": "A question starting with 'where' to ask about a location",
        "example": "Where is the nearest hospital? Someone needs help."
      },
      {
        "term": "Why are you crying?",
        "meaning": "A question using 'why' to ask the reason or cause for something",
        "example": "Why are you crying? What happened?"
      },
      {
        "term": "Who is that person?",
        "meaning": "A question starting with 'who' to identify a person",
        "example": "Who is that person? I have never seen him before."
      },
      {
        "term": "How do you spell your name?",
        "meaning": "A question using 'how' to ask about the method or way of doing something",
        "example": "How do you spell your name? Is it with a 'D' or a 'B'?"
      },
      {
        "term": "Which one do you prefer?",
        "meaning": "A question using 'which' to ask for a choice between options",
        "example": "Which one do you prefer, tea or coffee?"
      },
      {
        "term": "How many brothers and sisters do you have?",
        "meaning": "A question asking about quantity or number",
        "example": "How many brothers and sisters do you have? I have two sisters."
      },
      {
        "term": "How much does this cost?",
        "meaning": "A question asking about the price of uncountable items",
        "example": "How much does this shirt cost? It is beautiful."
      },
      {
        "term": "Are you coming to the party?",
        "meaning": "A yes-no question using 'are' to ask about future plans",
        "example": "Are you coming to the party? It is next Saturday."
      },
      {
        "term": "Do you like playing sports?",
        "meaning": "A yes-no question to ask about someone's preferences",
        "example": "Do you like playing sports? I want to join a team."
      },
      {
        "term": "Did you finish your work?",
        "meaning": "A yes-no question in past tense to ask about completed action",
        "example": "Did you finish your work? Can we go play now?"
      },
      {
        "term": "Can you speak English fluently?",
        "meaning": "A question about ability or capability",
        "example": "Can you speak English fluently? You seem very confident."
      },
      {
        "term": "What is your opinion about this?",
        "meaning": "A question asking what someone thinks or believes",
        "example": "What is your opinion about this movie? Should I watch it?"
      },
      {
        "term": "Would you like something to drink?",
        "meaning": "A polite question offering something to someone",
        "example": "Would you like something to drink? I can get you water, juice, or tea."
      },
      {
        "term": "Could you please tell me your phone number?",
        "meaning": "A polite request for information phrased as a question",
        "example": "Could you please tell me your phone number? I want to call you later."
      },
      {
        "term": "Is it okay if I ask you something personal?",
        "meaning": "A polite question to get permission before asking a sensitive question",
        "example": "Is it okay if I ask you something personal? Where did you get your scar?"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between 'what' and 'which'?",
        "a": "'What' is used when there are infinite options or no specific options. 'Which' is used when there are limited, specific choices. Example: What do you want to eat? (many options) vs. Which book do you want: the red one or the blue one? (two specific options)"
      },
      {
        "q": "Is there a 'correct order' for question words?",
        "a": "Yes, in English, the typical order is: Question word + Auxiliary verb + Subject + Main verb + Rest of sentence. Example: 'What did you eat for lunch?' Here, 'what' is the question word, 'did' is the auxiliary, 'you' is the subject."
      }
    ]
  },
  {
    "slug": "introducing-yourself",
    "title": "Introducing Yourself in English: About Me",
    "category": "Spoken English",
    "intro": "Learn how to introduce yourself confidently in English. These phrases help you share information about your name, age, interests, work, and family in a natural and engaging way.",
    "items": [
      {
        "term": "My name is Rajesh Kumar.",
        "meaning": "A basic way to tell someone your full name",
        "example": "My name is Rajesh Kumar. I am pleased to meet you."
      },
      {
        "term": "You can call me Raj for short.",
        "meaning": "To tell someone a shorter or informal version of your name that they can use",
        "example": "My name is Rajesh, but you can call me Raj for short."
      },
      {
        "term": "I am from Mumbai, India.",
        "meaning": "To say your hometown or city of origin",
        "example": "I am from Mumbai, India. I moved to Delhi three years ago."
      },
      {
        "term": "I am sixteen years old.",
        "meaning": "To state your age or how many years old you are",
        "example": "I am sixteen years old and I am in Class Ten."
      },
      {
        "term": "I study in Delhi Public School.",
        "meaning": "To mention the school or institution you attend",
        "example": "I study in Delhi Public School. I am in the science stream."
      },
      {
        "term": "I want to become a doctor.",
        "meaning": "To share your career goal or what you dream to become",
        "example": "I want to become a doctor. I love helping people."
      },
      {
        "term": "My interests include reading and swimming.",
        "meaning": "To tell someone what activities you enjoy and are interested in",
        "example": "My interests include reading novels and swimming. I swim three times a week."
      },
      {
        "term": "I live with my parents and one sister.",
        "meaning": "To describe your family members you live with",
        "example": "I live with my parents and one sister. My father is an engineer."
      },
      {
        "term": "My mother is a teacher.",
        "meaning": "To share information about your parent's profession",
        "example": "My mother is a teacher in a government school. She teaches English."
      },
      {
        "term": "I am good at mathematics but weak in history.",
        "meaning": "To share your strengths and weaknesses in school subjects",
        "example": "I am good at mathematics but weak in history. I need help with dates."
      },
      {
        "term": "In my free time, I like to watch movies.",
        "meaning": "To say what you do when you are not busy or working",
        "example": "In my free time, I like to watch movies and play video games."
      },
      {
        "term": "I have two close friends named Arjun and Priya.",
        "meaning": "To mention important people in your life",
        "example": "I have two close friends named Arjun and Priya. We study together."
      },
      {
        "term": "I love Indian food, especially paneer curry.",
        "meaning": "To share your food preferences and favorite dishes",
        "example": "I love Indian food, especially paneer curry and dal makhani."
      },
      {
        "term": "I am fluent in English, Hindi, and Tamil.",
        "meaning": "To mention the languages you can speak",
        "example": "I am fluent in English, Hindi, and Tamil. I learned Tamil from my grandmother."
      },
      {
        "term": "I am an introvert and prefer quiet activities.",
        "meaning": "To describe your personality type",
        "example": "I am an introvert and prefer quiet activities like reading over big parties."
      },
      {
        "term": "My dream is to study at Oxford University.",
        "meaning": "To share your biggest goal or aspiration",
        "example": "My dream is to study at Oxford University and become a researcher."
      },
      {
        "term": "I come from a middle-class family where education is valued.",
        "meaning": "To describe your family background and values",
        "example": "I come from a middle-class family where education is valued greatly."
      }
    ],
    "faqs": [
      {
        "q": "How much personal information should I share when introducing myself?",
        "a": "It depends on the situation. In formal settings like job interviews, share professional information like your name, education, and career goals. With friends, you can share more personal details about your interests and family. Always be careful not to share sensitive information like your address or phone number with strangers."
      },
      {
        "q": "Is it impolite to ask someone personal questions after they introduce themselves?",
        "a": "No, it is actually polite and shows interest. After someone introduces themselves, you can ask follow-up questions like 'That is nice! What is Delhi Public School like?' or 'Oh, you want to be a doctor? Do you volunteer at a hospital?' This keeps the conversation going naturally."
      }
    ]
  },
  {
    "slug": "english-interviews",
    "title": "English for Interviews: Job and School Interviews",
    "category": "Spoken English",
    "intro": "Master the essential English phrases and questions used in job interviews and school admissions interviews. Learning these will boost your confidence and help you present yourself professionally and positively.",
    "items": [
      {
        "term": "Thank you for having me. I am honored to be here.",
        "meaning": "An opening statement showing gratitude and respect to the interviewer",
        "example": "Thank you for having me. I am honored to be here and excited to discuss this opportunity."
      },
      {
        "term": "Could you tell me about yourself?",
        "meaning": "A common interview question asking you to introduce yourself professionally",
        "example": "Could you tell me about yourself? I would like to know your background and goals."
      },
      {
        "term": "I have a strong background in mathematics and science.",
        "meaning": "To highlight your academic strengths to the interviewer",
        "example": "I have a strong background in mathematics and science. I scored 95% in physics."
      },
      {
        "term": "What are your strengths and weaknesses?",
        "meaning": "A question asking you to identify what you are good at and what you struggle with",
        "example": "What are your strengths and weaknesses? Be honest but strategic in your answer."
      },
      {
        "term": "My strength is my ability to work hard and manage time effectively.",
        "meaning": "A sample answer highlighting a professional strength",
        "example": "My strength is my ability to work hard and manage time effectively. I usually complete work ahead of schedule."
      },
      {
        "term": "I am working on improving my communication skills.",
        "meaning": "A way to mention a weakness while showing you are trying to improve",
        "example": "I am working on improving my public speaking skills. I joined a debate club to practice."
      },
      {
        "term": "Why do you want to join our school?",
        "meaning": "An interview question asking about your motivation for applying",
        "example": "Why do you want to join our school? We heard it has excellent science labs."
      },
      {
        "term": "I am impressed by your school's strong academics and student activities.",
        "meaning": "A response showing that you have researched the institution",
        "example": "I am impressed by your school's strong academics and competitive sports programs."
      },
      {
        "term": "What are your career goals?",
        "meaning": "A question about your future plans and ambitions",
        "example": "What are your career goals? Do you want to become a doctor or engineer?"
      },
      {
        "term": "I aspire to become a successful engineer and work for a top tech company.",
        "meaning": "A sample answer showing clear career direction",
        "example": "I aspire to become a successful engineer and work for companies like Google or Apple."
      },
      {
        "term": "Can you give an example of how you overcame a challenge?",
        "meaning": "A behavioral question asking about your problem-solving skills",
        "example": "Can you give an example of how you overcame a challenge? Tell me a specific story."
      },
      {
        "term": "I failed my first math test, but I studied harder and scored 90% on the retake.",
        "meaning": "A sample answer showing resilience and positive attitude",
        "example": "I failed my first math test, but I studied harder and scored 90% on the retake."
      },
      {
        "term": "Do you have any questions for us?",
        "meaning": "A question giving you a chance to ask about the school or opportunity",
        "example": "Do you have any questions for us? We would like to know what is important to you."
      },
      {
        "term": "What are the opportunities for leadership roles in your school?",
        "meaning": "An intelligent question showing interest in school activities",
        "example": "What are the opportunities for leadership roles in your school? I am interested in the student council."
      },
      {
        "term": "How do you handle stress and pressure?",
        "meaning": "A question about your emotional intelligence and coping strategies",
        "example": "How do you handle stress and pressure? Tell me how you stay calm during exams."
      },
      {
        "term": "I stay calm by planning my study schedule and taking short breaks.",
        "meaning": "A sample answer showing healthy stress management",
        "example": "I stay calm by planning my study schedule well in advance and taking short exercise breaks."
      },
      {
        "term": "I would like to thank you for this opportunity and the time you spent with me.",
        "meaning": "A closing statement showing gratitude and professionalism",
        "example": "I would like to thank you for this opportunity and the time you spent with me. I hope to hear from you soon."
      }
    ],
    "faqs": [
      {
        "q": "What should I do if I do not know the answer to a question in an interview?",
        "a": "Stay calm and honest. You can say: 'That is a good question. I have not thought about it before, but I would approach it this way...' or 'I am not sure about the exact answer, but let me think aloud.' Never lie or make up answers. Interviewers respect honesty."
      },
      {
        "q": "How should I dress for an English interview?",
        "a": "For school interviews, wear neat school uniform or formal clothes. For job interviews, wear formal business attire like a shirt and trousers, or a saree with a formal top. Always be clean and well-groomed. First impressions matter."
      }
    ]
  },
  {
    "slug": "idioms-and-phrases-set-4",
    "title": "Idioms and Phrases A-Z Set 4",
    "category": "Idioms",
    "intro": "Master this final collection of advanced idioms that will elevate your English communication skills. These phrases are essential for excellent performance in competitive exams and professional settings.",
    "items": [
      {
        "term": "A blessing in disguise",
        "meaning": "Something bad that turns out to be beneficial",
        "example": "Losing that job turned out to be a blessing in disguise as he found a better career."
      },
      {
        "term": "Add insult to injury",
        "meaning": "To make a bad situation worse",
        "example": "He failed the exam, and to add insult to injury, he lost his scholarship."
      },
      {
        "term": "Against all odds",
        "meaning": "Despite great difficulties",
        "example": "Against all odds, she became an engineer despite coming from a poor background."
      },
      {
        "term": "Back to the drawing board",
        "meaning": "To start over after failure",
        "example": "The first design failed, so we went back to the drawing board."
      },
      {
        "term": "Bend over backwards",
        "meaning": "To try very hard to help someone",
        "example": "My teacher bent over backwards to help me understand difficult concepts."
      },
      {
        "term": "Between a rock and a hard place",
        "meaning": "In a difficult situation with no good options",
        "example": "Students are often between a rock and a hard place when choosing their career path."
      },
      {
        "term": "Break a leg",
        "meaning": "Good luck, especially before a performance",
        "example": "Before the debate competition, we said break a leg to all the participants."
      },
      {
        "term": "Brought back to reality",
        "meaning": "Suddenly reminded of the truth after illusions",
        "example": "When I saw the exam results, I was brought back to reality."
      },
      {
        "term": "Burning question",
        "meaning": "An urgent and important question",
        "example": "The burning question for students is how to balance studies and sports."
      },
      {
        "term": "Call it a day",
        "meaning": "To stop working and rest",
        "example": "After studying for eight hours, I decided to call it a day."
      },
      {
        "term": "Caught between two fires",
        "meaning": "Facing pressure or criticism from two sides",
        "example": "Teachers are often caught between two fires: student expectations and administration demands."
      },
      {
        "term": "Clear as day",
        "meaning": "Very obvious and easy to understand",
        "example": "The answer to the math problem was clear as day once she explained it."
      }
    ],
    "faqs": [
      {
        "q": "Why do idioms appear frequently in competitive exams?",
        "a": "Competitive exams test your command of English, and idioms are a crucial part of natural, fluent communication. Questions often ask for meanings, appropriate usage, or require you to fill in idioms in sentences to assess your comprehension."
      },
      {
        "q": "Should I memorize idiom meanings word-for-word?",
        "a": "No, understand the essence of the idiom instead. Focus on when and how to use it correctly rather than memorizing exact definitions. Reading context-based examples helps you remember better and use idioms naturally."
      }
    ]
  },
  {
    "slug": "english-proverbs-set-2",
    "title": "English Proverbs and Wise Sayings Set 2",
    "category": "Proverbs",
    "intro": "Deepen your understanding with a second collection of timeless English proverbs. These wise sayings are used in essays, speeches, and professional communication to convey universal truths.",
    "items": [
      {
        "term": "A stitch in time saves nine",
        "meaning": "Solving a problem early prevents bigger problems later",
        "example": "Fix the water leak now; a stitch in time saves nine."
      },
      {
        "term": "Actions speak louder than words",
        "meaning": "What you do is more important than what you say",
        "example": "Do not just promise; actions speak louder than words."
      },
      {
        "term": "An apple a day keeps the doctor away",
        "meaning": "Good nutrition and healthy habits prevent illness",
        "example": "Eat fresh fruits daily; an apple a day keeps the doctor away."
      },
      {
        "term": "Do unto others as you would have them do unto you",
        "meaning": "Treat others with the respect and kindness you want",
        "example": "Be nice to others because you want them to be nice to you; do unto others as you would have them do unto you."
      },
      {
        "term": "Early to bed, early to rise makes a man healthy, wealthy, and wise",
        "meaning": "A regular sleep schedule leads to success and good health",
        "example": "Students who follow early to bed, early to rise become more productive."
      },
      {
        "term": "Every cloud has a silver lining",
        "meaning": "Every difficult situation has some positive aspect",
        "example": "Though the lockdown was hard, every cloud has a silver lining in online learning benefits."
      },
      {
        "term": "Honesty is the best policy",
        "meaning": "Being truthful is the most beneficial approach",
        "example": "Tell the truth to your teacher; honesty is the best policy."
      },
      {
        "term": "Keep your eyes on the prize",
        "meaning": "Stay focused on your goal",
        "example": "During exam season, keep your eyes on the prize and do not get distracted."
      },
      {
        "term": "Knowledge is power",
        "meaning": "Having information and education gives you strength and advantage",
        "example": "Read extensively and gain skills because knowledge is power in todays world."
      },
      {
        "term": "Practice makes perfect",
        "meaning": "Repeated effort improves your ability",
        "example": "Solve math problems daily; practice makes perfect."
      },
      {
        "term": "The early bird catches the worm",
        "meaning": "Those who act first gain an advantage",
        "example": "Apply for the job early because the early bird catches the worm."
      },
      {
        "term": "Time and tide wait for no man",
        "meaning": "Time passes regardless, so act promptly",
        "example": "Do not delay your projects; time and tide wait for no man."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a proverb and an idiom?",
        "a": "A proverb is a short, wise saying that teaches a life lesson or moral truth, while an idiom is an expression whose meaning differs from its literal words. Proverbs are universal truths across cultures; idioms are language-specific phrases."
      },
      {
        "q": "How do I use proverbs effectively in essays?",
        "a": "Use proverbs to support your argument or illustrate a point. Introduce them naturally within your writing and explain their relevance. For competitive exams, proverbs strengthen your essay by showing maturity and depth of thought."
      }
    ]
  },
  {
    "slug": "one-word-substitutions-set-2",
    "title": "One-Word Substitutions Set 2",
    "category": "One-Word Substitution",
    "intro": "Master a second collection of one-word substitutions essential for competitive exams like UPSC, SSC, and banking. These questions test your vocabulary by asking you to replace phrases with single words.",
    "items": [
      {
        "term": "Pedantry",
        "meaning": "Excessive attention to minor details and rules; showing off knowledge",
        "example": "The teacher avoided pedantry and focused on practical understanding instead of grammar rules."
      },
      {
        "term": "Ambidextrous",
        "meaning": "Able to use both hands equally well",
        "example": "The badminton player was ambidextrous and could hit shots with either hand."
      },
      {
        "term": "Ephemeral",
        "meaning": "Lasting for a very short time; temporary",
        "example": "Social media trends are often ephemeral and forgotten within weeks."
      },
      {
        "term": "Serendipity",
        "meaning": "The occurrence of fortunate events by chance",
        "example": "Finding that job was pure serendipity; I was not even looking for it."
      },
      {
        "term": "Perspicacious",
        "meaning": "Having keen insight and understanding; perceptive",
        "example": "The detective was perspicacious and quickly solved the mystery."
      },
      {
        "term": "Cacophony",
        "meaning": "A harsh mixture of sounds; dissonant noise",
        "example": "The market street produced a cacophony of sounds from vendors and vehicles."
      },
      {
        "term": "Obfuscate",
        "meaning": "To make something unclear or confusing",
        "example": "Do not obfuscate the issue; explain clearly what the problem is."
      },
      {
        "term": "Pragmatic",
        "meaning": "Dealing with things in a practical, realistic way",
        "example": "A pragmatic approach to business focuses on results rather than ideals."
      },
      {
        "term": "Mettle",
        "meaning": "A person's ability to cope with difficulties; courage",
        "example": "The soldiers proved their mettle in the face of danger."
      },
      {
        "term": "Enervate",
        "meaning": "To deprive of strength or energy; to weaken",
        "example": "The illness enervated him, leaving him too weak to work."
      },
      {
        "term": "Profusion",
        "meaning": "An abundance or large quantity",
        "example": "The garden showed a profusion of colorful flowers in spring."
      },
      {
        "term": "Obsequious",
        "meaning": "Obedient or attentive to an excessive degree",
        "example": "His obsequious behavior toward the boss was annoying to other employees."
      }
    ],
    "faqs": [
      {
        "q": "How are one-word substitutions tested in exams?",
        "a": "Exams typically provide a phrase and ask you to select the word that replaces it, or they give a word and ask for the meaning or phrase it replaces. Questions test your vocabulary, understanding of nuances, and ability to recognize synonymous expressions."
      },
      {
        "q": "What is the best strategy to learn one-word substitutions?",
        "a": "Learn words in context by reading the phrase and understanding its meaning before learning the single word. Create flashcards and practice with sample questions regularly. Understanding word etymology and roots helps you remember them better."
      }
    ]
  },
  {
    "slug": "one-word-substitutions-set-3",
    "title": "One-Word Substitutions Set 3",
    "category": "One-Word Substitution",
    "intro": "Complete your mastery of one-word substitutions with this advanced third set. These challenging words are frequently tested in UPSC and other prestigious competitive examinations.",
    "items": [
      {
        "term": "Mellifluous",
        "meaning": "Sweet-sounding; pleasant to the ear",
        "example": "The singer had a mellifluous voice that captivated the entire audience."
      },
      {
        "term": "Reprehensible",
        "meaning": "Deserving criticism or condemnation",
        "example": "Stealing is reprehensible behavior that goes against our values."
      },
      {
        "term": "Capricious",
        "meaning": "Changing suddenly without apparent reason; unpredictable",
        "example": "The weather was capricious, shifting from sunny to rainy within hours."
      },
      {
        "term": "Ebullient",
        "meaning": "Cheerful and full of energy; enthusiastic",
        "example": "Her ebullient personality made her popular among her classmates."
      },
      {
        "term": "Pernicious",
        "meaning": "Harmful or destructive; having a gradual bad effect",
        "example": "The pernicious effects of pollution are damaging our environment."
      },
      {
        "term": "Inchoate",
        "meaning": "Not fully formed; just beginning",
        "example": "His inchoate ideas about the business plan needed more development."
      },
      {
        "term": "Diffident",
        "meaning": "Lacking confidence in one's abilities; shy",
        "example": "Though brilliant, the student was diffident and rarely participated in class."
      },
      {
        "term": "Fortuitous",
        "meaning": "Happening by chance; fortunate",
        "example": "Meeting my best friend was fortuitous; we randomly sat next to each other."
      },
      {
        "term": "Loquacious",
        "meaning": "Talkative; fond of talking",
        "example": "The loquacious student never stopped talking during the entire class."
      },
      {
        "term": "Sagacious",
        "meaning": "Having good judgment; wise",
        "example": "The sagacious leader made decisions that benefited the entire nation."
      },
      {
        "term": "Unctuous",
        "meaning": "Excessively earnest or flattering; oily",
        "example": "His unctuous compliments seemed insincere and made others uncomfortable."
      },
      {
        "term": "Variegated",
        "meaning": "Having different colors or patterns",
        "example": "The garden showed variegated flowers of red, yellow, and blue."
      }
    ],
    "faqs": [
      {
        "q": "Why are one-word substitutions important for English proficiency?",
        "a": "They demonstrate your vocabulary depth and ability to recognize synonymous meanings. One-word substitutions help you communicate more precisely and efficiently, which is valued in both academic and professional settings."
      },
      {
        "q": "How can I distinguish between similar one-word substitutions?",
        "a": "Study the subtle differences in meaning and usage. Create comparison charts for words with similar meanings but different nuances. Reading the words in different contexts helps you understand their precise meanings and when to use them."
      }
    ]
  },
  {
    "slug": "commonly-confused-words-set-1",
    "title": "Commonly Confused Words Set 1",
    "category": "Confusing Words",
    "intro": "Learn to distinguish between commonly confused English words. Understanding the differences between these pairs is essential for writing accurately and scoring well in grammar-focused exams.",
    "items": [
      {
        "term": "Affect vs Effect",
        "meaning": "Affect is a verb meaning to influence, while effect is a noun meaning result or outcome. Sometimes effect is used as a verb meaning to bring about.",
        "example": "How will this decision affect your career? The effect of the policy is positive."
      },
      {
        "term": "Accept vs Except",
        "meaning": "Accept is a verb meaning to receive or agree, while except is a preposition or verb meaning to exclude or leave out.",
        "example": "I accept your invitation. Everyone came except John."
      },
      {
        "term": "Principle vs Principal",
        "meaning": "Principle is a noun meaning a fundamental rule or belief, while principal can be a noun (school head) or adjective (main or most important).",
        "example": "Honesty is an important principle. The principal of our school is strict."
      },
      {
        "term": "Complement vs Compliment",
        "meaning": "Complement is a noun or verb meaning something that completes or goes well with something, while compliment is a noun or verb meaning praise or say something nice about.",
        "example": "The sauce complements the dish perfectly. She complimented his presentation."
      },
      {
        "term": "Loose vs Lose",
        "meaning": "Loose is an adjective meaning not tight, while lose is a verb meaning to misplace or to be defeated in a competition.",
        "example": "The button is loose. Do not lose your phone at the station."
      },
      {
        "term": "Its vs It's",
        "meaning": "Its is a possessive adjective, while its is a contraction of it is. This is one of the most common mistakes in English.",
        "example": "The cat licked its paws. It is a beautiful day."
      },
      {
        "term": "They're vs Their vs There",
        "meaning": "They are is they're, their is possessive, and there indicates a place or existence.",
        "example": "They are smart. Their grades are excellent. Let us go there tomorrow."
      },
      {
        "term": "Advice vs Advise",
        "meaning": "Advice is a noun meaning guidance or recommendation, while advise is a verb meaning to give advice.",
        "example": "Can you give me some advice? I advise you to study regularly."
      },
      {
        "term": "Brake vs Break",
        "meaning": "Brake is a device that stops movement, while break is to separate or damage something.",
        "example": "Press the brake to stop the car. Do not break the glass."
      },
      {
        "term": "Hear vs Here",
        "meaning": "Hear is a verb meaning to perceive sound, while here is an adverb indicating a place or position.",
        "example": "Can you hear that music? Come here, please."
      },
      {
        "term": "Allowed vs Aloud",
        "meaning": "Allowed is the past tense of allow meaning permitted, while aloud is an adverb meaning audibly or loudly.",
        "example": "You are allowed to enter. Read the passage aloud to the class."
      },
      {
        "term": "Wear vs Where vs Ware",
        "meaning": "Wear is to have clothes on, where is a place, and ware is goods or merchandise.",
        "example": "What will you wear tomorrow? Where is the station? The shop sells different wares."
      }
    ],
    "faqs": [
      {
        "q": "How can I avoid confusing these words in writing?",
        "a": "Remember the difference by thinking about the meaning and part of speech. Create a memory device or mnemonic to help you distinguish between them. Always proofread your writing and check for these common confusions, especially before submitting important assignments or exams."
      },
      {
        "q": "Why do native speakers sometimes use these words incorrectly?",
        "a": "Even native speakers make mistakes with commonly confused words, especially homonyms (words that sound alike). However, as a student learning English, focus on using the correct form consistently, which will improve your writing quality and exam performance."
      }
    ]
  },
  {
    "slug": "commonly-confused-words-set-2",
    "title": "Commonly Confused Words Set 2",
    "category": "Confusing Words",
    "intro": "Master a second set of frequently confused word pairs. This collection covers advanced distinctions that frequently appear in competitive exams and professional writing.",
    "items": [
      {
        "term": "Borrow vs Lend",
        "meaning": "Borrow is to take something temporarily with the intention to return it, while lend is to give something temporarily to another person.",
        "example": "Can I borrow your pen? I will lend you money if you need it."
      },
      {
        "term": "Among vs Between",
        "meaning": "Among is used for groups of three or more people or things, while between is used for two people or things.",
        "example": "The prize will be divided among all the winners. I sat between two friends."
      },
      {
        "term": "Fewer vs Less",
        "meaning": "Fewer is used with countable nouns, while less is used with uncountable nouns.",
        "example": "There are fewer students this year. I have less money than last month."
      },
      {
        "term": "Stationary vs Stationery",
        "meaning": "Stationary means not moving or remaining in one place, while stationery refers to writing supplies like paper and pens.",
        "example": "The car remained stationary for hours. I bought stationery for school."
      },
      {
        "term": "Weather vs Whether",
        "meaning": "Weather refers to atmospheric conditions, while whether is a conjunction expressing doubt or choice.",
        "example": "The weather is pleasant today. I am not sure whether to attend the event."
      },
      {
        "term": "Conscious vs Conscience",
        "meaning": "Conscious means aware or awake, while conscience refers to the inner moral sense of right and wrong.",
        "example": "She was conscious of her mistakes. His conscience bothered him after he lied."
      },
      {
        "term": "Censor vs Censure",
        "meaning": "Censor is to remove objectionable content or the person who does so, while censure is to express disapproval of or criticize.",
        "example": "The government censored the movie. The committee will censure the dishonest official."
      },
      {
        "term": "Emigrate vs Immigrate",
        "meaning": "Emigrate is to leave one country to live in another, while immigrate is to move into a country from another place.",
        "example": "He emigrated from India to Canada. She immigrated to the United States."
      },
      {
        "term": "Farther vs Further",
        "meaning": "Farther refers to physical distance, while further refers to metaphorical or additional advancement.",
        "example": "The school is farther from my house. I want to study further and pursue postgraduate studies."
      },
      {
        "term": "Precede vs Proceed",
        "meaning": "Precede means to come before, while proceed means to continue or move forward.",
        "example": "The introduction precedes the main content. Let us proceed with the meeting."
      },
      {
        "term": "Ensure vs Insure",
        "meaning": "Ensure means to guarantee or make sure, while insure means to provide insurance coverage.",
        "example": "Please ensure that the door is locked. I need to insure my bike."
      },
      {
        "term": "Desert vs Dessert",
        "meaning": "Desert is a dry, sandy area or to abandon, while dessert is a sweet dish eaten at the end of a meal.",
        "example": "The Sahara is a vast desert. Ice cream is my favorite dessert."
      }
    ],
    "faqs": [
      {
        "q": "What is the most effective method to learn confused word pairs?",
        "a": "Study the pairs in meaningful contexts rather than in isolation. Create example sentences for each word and review them regularly. Use the words in your writing practice to reinforce the correct usage and gradually it will become automatic."
      },
      {
        "q": "How should I approach questions about confused words in exams?",
        "a": "Read the sentence carefully and understand the context. Identify which word fits logically and grammatically. If unsure, eliminate obviously wrong options first. Remember the definitions and use cases of each pair to make an educated decision."
      }
    ]
  },
  {
    "slug": "homophones-homonyms-set-1",
    "title": "Homophones and Homonyms",
    "category": "Homophones",
    "intro": "Master words that sound the same or have multiple meanings. Understanding homophones and homonyms prevents spelling errors and helps you choose the correct word for your intended meaning.",
    "items": [
      {
        "term": "Knight - Night",
        "meaning": "Knight is a historical warrior title, while night is the period of darkness after sunset.",
        "example": "The knight rode his horse. We studied late into the night."
      },
      {
        "term": "Sun - Son",
        "meaning": "Sun is the star that lights the earth, while son is a male child.",
        "example": "The sun rises in the east. He has a son and a daughter."
      },
      {
        "term": "Flour - Flower",
        "meaning": "Flour is powdered grain used in baking, while flower is a colorful plant bloom.",
        "example": "Add flour to the cake batter. The flower bloomed in spring."
      },
      {
        "term": "Piece - Peace",
        "meaning": "Piece is a part of something, while peace is a state of calm without conflict.",
        "example": "Give me a piece of cake. We hope for world peace and stability."
      },
      {
        "term": "Mail - Male",
        "meaning": "Mail is letters and packages, while male refers to the masculine gender.",
        "example": "I received mail from abroad. The male student was very helpful."
      },
      {
        "term": "Cite - Sight - Site",
        "meaning": "Cite means to quote or mention a source, sight is the ability to see or something to behold, and site is a location.",
        "example": "You must cite your sources. The view was a beautiful sight. The construction site is busy."
      },
      {
        "term": "Tale - Tail",
        "meaning": "Tale is a story, while tail is the rear appendage of an animal.",
        "example": "She told an interesting tale. The dog wagged its tail happily."
      },
      {
        "term": "Read - Red",
        "meaning": "Read is to look at and understand text, while red is a color.",
        "example": "I read the book yesterday. Her dress was bright red."
      },
      {
        "term": "Weak - Week",
        "meaning": "Weak means not strong, while week is a period of seven days.",
        "example": "He felt weak after the illness. She will return next week."
      },
      {
        "term": "Bank (financial institution) - Bank (side of a river)",
        "meaning": "Bank as a financial institution lends money, while a bank is the land alongside a river or stream.",
        "example": "I deposited money in the bank. We sat on the river bank enjoying the sunset."
      },
      {
        "term": "Bat (sports equipment) - Bat (flying animal)",
        "meaning": "A bat is a stick used to hit balls in sports, while a bat is a flying mammal.",
        "example": "He bought a cricket bat. We saw bats flying around the old building."
      },
      {
        "term": "Seal (animal) - Seal (to close)",
        "meaning": "A seal is a marine mammal, while to seal means to close something tightly.",
        "example": "The seal was swimming in the ocean. Please seal the envelope securely."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between homophones and homonyms?",
        "a": "Homophones are words that sound identical but have different meanings and spellings (like knight and night). Homonyms are words that either sound the same (homophones) or are spelled the same (homographs) but have different meanings. All homophones are homonyms, but not all homonyms are homophones."
      },
      {
        "q": "How can I avoid mistakes with homophones in writing?",
        "a": "The key is understanding the meaning you want to convey. Think about the correct spelling for each meaning before writing. Proofread your work specifically looking for homophone mistakes. Using a spell-checker helps, as does reading your work aloud to catch obvious errors."
      }
    ]
  },
  {
    "slug": "collocations-common-word-pairs-set-1",
    "title": "Collocations: Common Word Pairs Set 1",
    "category": "Collocations",
    "intro": "Learn collocations, words that naturally go together in English. Using proper collocations makes your English sound more natural and authentic, and they are frequently tested in advanced English exams.",
    "items": [
      {
        "term": "Heavy rain",
        "meaning": "Rain that falls in large quantities; intense rainfall",
        "example": "The heavy rain caused flooding in several areas yesterday."
      },
      {
        "term": "Strong wind",
        "meaning": "Wind that blows with significant force and speed",
        "example": "The strong wind knocked down several trees during the storm."
      },
      {
        "term": "Make a decision",
        "meaning": "To choose between options or determine a course of action",
        "example": "She had to make a decision about her future very quickly."
      },
      {
        "term": "Take responsibility",
        "meaning": "To accept accountability for something or someone",
        "example": "He should take responsibility for his mistakes."
      },
      {
        "term": "Play a role",
        "meaning": "To be involved in a situation or to have importance in a process",
        "example": "Parents play a crucial role in their children's education."
      },
      {
        "term": "Reach a conclusion",
        "meaning": "To arrive at a final decision or understanding after consideration",
        "example": "After reviewing the evidence, the jury reached a conclusion."
      },
      {
        "term": "Keep track",
        "meaning": "To monitor or maintain awareness of something over time",
        "example": "I keep track of all my expenses using an app."
      },
      {
        "term": "Draw a conclusion",
        "meaning": "To form an opinion or decision based on evidence or information",
        "example": "From the data, we can draw a conclusion about the trend."
      },
      {
        "term": "Raise awareness",
        "meaning": "To make people more informed or conscious of an issue",
        "example": "The campaign aims to raise awareness about environmental protection."
      },
      {
        "term": "Face challenges",
        "meaning": "To confront and deal with difficult problems or obstacles",
        "example": "All students face challenges when learning a new language."
      },
      {
        "term": "Gain experience",
        "meaning": "To acquire practical knowledge or skills through practice or living",
        "example": "Working internships helps you gain experience in your field."
      },
      {
        "term": "Pass an exam",
        "meaning": "To achieve a satisfactory grade and succeed in a test",
        "example": "She studied hard and finally managed to pass her driving exam."
      }
    ],
    "faqs": [
      {
        "q": "Why are collocations important in English?",
        "a": "Collocations are word combinations that native speakers use naturally. Using correct collocations makes your English sound fluent and natural. Incorrect collocations stand out and make your language seem awkward or unnatural, even if the grammar is correct."
      },
      {
        "q": "How should I learn and remember collocations?",
        "a": "Learn collocations in context by reading and listening to native speakers. Create flashcards with the collocation and an example sentence. Practice using them in your own sentences. Notice which words naturally pair together in authentic English texts and try to incorporate them into your speech and writing."
      }
    ]
  },
  {
    "slug": "foreign-words-and-phrases-set-1",
    "title": "Foreign Words and Phrases Used in English",
    "category": "Foreign Words",
    "intro": "Learn foreign words and phrases commonly used in English. These words appear frequently in academic, professional, and literary English, especially in Indian English written materials.",
    "items": [
      {
        "term": "De facto",
        "meaning": "In fact or in practice, whether officially stated or not",
        "example": "He became the de facto leader of the organization."
      },
      {
        "term": "Via",
        "meaning": "By way of or through a place, person, or method",
        "example": "I sent the documents via email to the office."
      },
      {
        "term": "Versus",
        "meaning": "Against or in contrast to; used in sports and legal contexts",
        "example": "India versus Pakistan cricket match will be held next week."
      },
      {
        "term": "Pro bono",
        "meaning": "Done or undertaken for the public good without payment",
        "example": "The lawyer took the case pro bono to help poor families."
      },
      {
        "term": "Agenda",
        "meaning": "A list of items to be discussed or things to be accomplished",
        "example": "The meeting agenda includes budget and project updates."
      },
      {
        "term": "Status quo",
        "meaning": "The existing state of affairs or current situation",
        "example": "The government wants to maintain the status quo in the region."
      },
      {
        "term": "Bonus",
        "meaning": "Something given in addition to what was originally expected or promised",
        "example": "She received a bonus for her excellent work performance."
      },
      {
        "term": "Vs (versus)",
        "meaning": "Abbreviation meaning against or in contrast with",
        "example": "The debate was between tradition vs modern values."
      },
      {
        "term": "Ad hoc",
        "meaning": "Created or done for a specific purpose without planning",
        "example": "An ad hoc committee was formed to handle the emergency."
      },
      {
        "term": "Alumni",
        "meaning": "Graduates of a school, college, or university",
        "example": "The college organized an alumni meet for former students."
      },
      {
        "term": "Venue",
        "meaning": "The place where an event is held or will be held",
        "example": "The wedding venue was a beautiful garden on the outskirts."
      },
      {
        "term": "Kaput",
        "meaning": "Broken or no longer working; finished or defeated",
        "example": "My computer is kaput and needs repair or replacement."
      }
    ],
    "faqs": [
      {
        "q": "Why do English speakers use foreign words and phrases?",
        "a": "Foreign words and phrases are used because they express ideas concisely or carry cultural significance that English equivalents might not capture fully. Many have been adopted into English usage because they fill a vocabulary gap or sound more appropriate in certain contexts, such as legal or academic situations."
      },
      {
        "q": "Do I need to learn foreign words to understand English better?",
        "a": "While not essential, knowing common foreign words and phrases improves your reading comprehension and makes you a better communicator. They appear frequently in advanced English texts, academic writing, and professional communication, so learning them is beneficial for competitive exams and professional success."
      }
    ]
  }
];
export const VOCAB_CATEGORIES = (): string[] => [...new Set(VOCAB_SETS.map((v) => v.category))];
export function getVocabSet(slug: string): VocabSet | undefined {
  return VOCAB_SETS.find((v) => v.slug === slug);
}
