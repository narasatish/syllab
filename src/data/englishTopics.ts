/**
 * English Grammar Topics — programmatic SEO cluster for grammar lessons.
 * Covers: Tenses, Parts of Speech, Nouns, Pronouns, Verbs, Adjectives, Adverbs,
 * Articles, Prepositions, Active-Passive Voice, Direct-Indirect Speech,
 * Subject-Verb Agreement, Essay Writing, Letter Writing, Reading Comprehension.
 * Each topic includes intro, key points, examples, common mistakes, practice Q&A, and FAQs.
 */

export interface EnglishTopic {
  slug: string;
  title: string;
  emoji: string;
  intro: string;
  keyPoints: string[];
  examples: string[];
  commonMistakes: string[];
  practice: { q: string; a: string }[];
  faqs: { q: string; a: string }[];
}

export const ENGLISH_TOPICS: EnglishTopic[] = [
  {
    slug: 'tenses',
    title: 'English Tenses',
    emoji: '⏰',
    intro: 'Tenses are verb forms that show when an action happens — past, present, or future. Mastering tenses is essential for expressing ideas clearly and correctly in English.',
    keyPoints: [
      'Simple Present (base form): I go, she goes — for habits, facts, and routines',
      'Present Continuous (am/is/are + -ing): I am going — for actions happening now',
      'Simple Past (verb + -ed): I went — for completed actions in the past',
      'Past Continuous (was/were + -ing): I was going — for ongoing actions at a past time',
      'Perfect tenses (have/has + past participle): I have gone — to show actions with results',
    ],
    examples: [
      'Simple Present: "She writes reports every Monday."',
      'Present Continuous: "The students are studying for their exams right now."',
      'Simple Past: "We visited the museum last week."',
      'Past Continuous: "I was reading when the phone rang."',
    ],
    commonMistakes: [
      'Confusing "She go to school" (wrong) with "She goes to school" (correct) — verb must agree with subject',
      'Using "I am going to school yesterday" — "yesterday" means past, so use simple past "I went"',
      'Mixing tenses in one sentence: "Yesterday I go to the park and play" — keep it "went" and "played"',
    ],
    practice: [
      { q: 'Fill the blank: "She _____ (go) to the office every morning."', a: 'goes — Simple present for habitual action' },
      { q: 'Choose correct: "They was / were playing cricket." Which is right?', a: 'were — plural "they" takes "were", not "was"' },
      { q: 'Change to past: "I am eating an apple." How?', a: '"I was eating an apple." — past continuous' },
    ],
    faqs: [
      { q: 'What is the difference between "I have gone" and "I went"?', a: 'Present perfect "have gone" suggests recent action with current relevance; simple past "went" is just past action with no present connection.' },
      { q: 'When do I use "will be" vs "am going to"?', a: '"Will be" is future simple for predictions/plans made now; "am going to" expresses intention or planned future actions already decided.' },
      { q: 'Is it "I have finished my homework" or "I finished my homework"?', a: 'Both are correct! Use present perfect if the action is recent/relevant now; simple past if it\'s clearly done in the past.' },
    ],
  },
  {
    slug: 'parts-of-speech',
    title: 'Parts of Speech',
    emoji: '🏷️',
    intro: 'The eight parts of speech are the building blocks of English grammar: noun, verb, adjective, adverb, pronoun, preposition, conjunction, and interjection. Each plays a unique role in sentences.',
    keyPoints: [
      'Noun: names a person, place, thing, or idea (e.g., "teacher", "India", "book", "happiness")',
      'Verb: an action or state of being (e.g., "run", "is", "think")',
      'Adjective: describes or modifies a noun (e.g., "beautiful", "cold", "small")',
      'Adverb: modifies a verb, adjective, or other adverb (e.g., "quickly", "very", "here")',
      'Pronoun: replaces a noun to avoid repetition (e.g., "he", "she", "it", "they")',
    ],
    examples: [
      '"The quick brown fox jumps over the lazy dog." — noun (fox, dog), verb (jumps), adjective (quick, brown, lazy), adverb (over is a preposition here)',
      '"She runs very quickly to school." — pronoun (she), verb (runs), adverb (very, quickly), noun (school)',
      '"Water is essential for life." — noun (water, life), verb (is), adjective (essential), preposition (for)',
    ],
    commonMistakes: [
      'Confusing adjectives and adverbs: "He runs quick" is wrong; "He runs quickly" is correct — adverbs modify verbs',
      'Using "me" instead of "I": "Him and me went" is wrong; "He and I went" is correct — use nominative pronouns as subjects',
      'Treating plural nouns as singular: "The books is red" — "books" is plural, so use "are": "The books are red"',
    ],
    practice: [
      { q: 'Identify the parts of speech: "The smart teacher explained the difficult concept clearly."', a: 'smart (adj), teacher (noun), explained (verb), difficult (adj), concept (noun), clearly (adv)' },
      { q: 'Which sentence uses the correct pronoun? (A) "Me and him are friends." (B) "He and I are friends."', a: '(B) — Pronouns used as subjects need nominative case: "he and I"' },
      { q: 'Choose the correct adjective: "The food tastes good / well."', a: 'good — adjectives follow linking verbs like "tastes"' },
    ],
    faqs: [
      { q: 'What is the difference between an adjective and an adverb?', a: 'Adjectives describe nouns or pronouns; adverbs describe verbs, adjectives, or other adverbs. Example: "good" (adj) vs "well" (adv) — "good food" but "runs well".' },
      { q: 'Can a word be multiple parts of speech?', a: 'Yes! "run" is a verb in "I run", but a noun in "a morning run". Context determines the part of speech.' },
      { q: 'What are conjunctions and interjections?', a: 'Conjunctions connect words/clauses (and, but, or). Interjections express emotion (Oh!, Wow!, Ouch!) — they are not essential to meaning.' },
    ],
  },
  {
    slug: 'nouns',
    title: 'Nouns',
    emoji: '📍',
    intro: 'A noun is a word that names a person, place, thing, or idea. Nouns are fundamental to English grammar and appear in every sentence.',
    keyPoints: [
      'Common nouns: general names (cat, city, book) — lowercase',
      'Proper nouns: specific names (Priya, Delhi, Harry Potter) — capitalized',
      'Countable nouns: can be singular or plural (book/books, student/students)',
      'Uncountable nouns: cannot be counted separately (water, advice, furniture) — no plural form',
      'Collective nouns: groups of people/things (team, class, family) — can be singular or plural',
    ],
    examples: [
      'Common: "The dog barked at the mailman." (dog, mailman)',
      'Proper: "Priya lives in Mumbai and loves ice cream." (Priya, Mumbai)',
      'Countable: "There are five students in the class." (students)',
      'Uncountable: "We need milk and butter for the cake." (milk, butter)',
      'Collective: "The team is playing well." (team)',
    ],
    commonMistakes: [
      'Capitalizing common nouns: "The President spoke to the Congress" should be "the president spoke to Congress" (Congress is proper)',
      'Adding "s" to uncountable nouns: "waters" is wrong in "I need waters"; say "I need water"',
      'Treating collective nouns inconsistently: "The team is" (singular) vs "The team are" (plural British English) — be consistent',
    ],
    practice: [
      { q: 'Classify the noun: "The doctor gave the patient medicine."', a: 'doctor (common, countable), patient (common, countable), medicine (common, uncountable)' },
      { q: 'Correct the sentence: "The boy has three mouses in his house."', a: '"mice" not "mouses" — mice is the irregular plural of mouse' },
      { q: 'Which is a proper noun? (A) teacher (B) India (C) book', a: '(B) India — specific place name that must be capitalized' },
    ],
    faqs: [
      { q: 'What is the difference between "less" and "fewer"?', a: '"Less" is for uncountable nouns ("less water"), "fewer" is for countable nouns ("fewer students").' },
      { q: 'How do I make plural nouns?', a: 'Usually add "-s" (cats) or "-es" (boxes). Some are irregular (child→children, mouse→mice). Uncountable nouns don\'t have plurals.' },
      { q: 'Are possessive forms like "John\'s" considered nouns?', a: 'Not a separate part of speech — they are nouns in possessive case. "John\'s book" shows "John" (noun) owns the book.' },
    ],
  },
  {
    slug: 'pronouns',
    title: 'Pronouns',
    emoji: '👤',
    intro: 'Pronouns replace nouns to avoid repetition and make writing flow smoothly. Common pronouns are I, you, he, she, it, we, they, and their variations.',
    keyPoints: [
      'Personal pronouns: I, you, he, she, it, we, they (replace specific nouns)',
      'Possessive pronouns: mine, yours, his, hers, its, ours, theirs (show ownership)',
      'Demonstrative pronouns: this, that, these, those (point to specific things)',
      'Interrogative pronouns: who, whom, whose, what, which (ask questions)',
      'Relative pronouns: who, whom, whose, that, which (connect clauses)',
    ],
    examples: [
      'Personal: "She is a teacher. She teaches us English."',
      'Possessive: "This pen is mine. That one is yours."',
      'Demonstrative: "This book is better than that one."',
      'Interrogative: "Who is coming to the party? What do you want?"',
      'Relative: "The student who scored the highest will get a prize."',
    ],
    commonMistakes: [
      'Using "me" as subject: "Me and him went" is wrong; use "He and I went"',
      'Confusing "who" and "whom": "Who did you see?" is correct (who is subject); "Whom did you see?" uses whom as object',
      'Wrong possessive: "It\'s" means "it is"; "its" shows possession. Correct: "The cat wagged its tail."',
    ],
    practice: [
      { q: 'Fill the blank: "These are my books, and _____ are yours."', a: 'these — demonstrative pronoun pointing to books' },
      { q: 'Choose correct pronoun: "The teacher _____ helped us is very kind."', a: 'who — relative pronoun; "The teacher who helped us is very kind."' },
      { q: 'Is "It\'s a beautiful day" correct? Why or why not?', a: 'Yes — "It\'s" = "It is"; the sentence means "It is a beautiful day"' },
    ],
    faqs: [
      { q: 'When should I use "who" vs "whom"?', a: '"Who" is for subjects ("Who is calling?"). "Whom" is for objects ("Whom did you call?"). Replace with he/she (who) or him/her (whom) to check.' },
      { q: 'What is a reflexive pronoun?', a: 'Pronouns ending in "-self" or "-selves" (myself, yourself, himself, herself, itself, ourselves, themselves) — used when the subject and object are the same: "I taught myself."' },
      { q: 'Is "you" singular or plural?', a: 'Both! Modern English uses "you" for both one person and multiple people. Context determines the meaning.' },
    ],
  },
  {
    slug: 'verbs',
    title: 'Verbs',
    emoji: '🎯',
    intro: 'Verbs are action or state-of-being words that form the core of any sentence. Every sentence needs a verb to express what is happening or what is true.',
    keyPoints: [
      'Action verbs: show what the subject does (run, eat, write, jump, sing)',
      'Linking verbs: show state of being, not action (be, seem, look, taste, feel)',
      'Transitive verbs: take a direct object (read a book, build a house)',
      'Intransitive verbs: do not take an object (sleep, laugh, arrive)',
      'Auxiliary (helping) verbs: support main verbs (have, do, will, can, should)',
    ],
    examples: [
      'Action: "The athlete ran quickly to the finish line."',
      'Linking: "She feels happy." (happy is not the action, but her state)',
      'Transitive: "She wrote a letter." (letter is the object)',
      'Intransitive: "The child laughed loudly."',
      'Auxiliary: "I have finished my homework." (have helps finished)',
    ],
    commonMistakes: [
      'Subject-verb disagreement: "The students is studying" — use "are" with plural "students"',
      'Wrong verb form: "I have went to school" — use "gone" with "have": "I have gone to school"',
      'Using action verb after linking verb: "The soup smells badly" is wrong; use adjective: "The soup smells bad"',
    ],
    practice: [
      { q: 'Identify if the verb is action or linking: "The flower bloomed in spring."', a: 'bloomed — action verb; the flower is doing something' },
      { q: 'Correct: "She don\'t like ice cream."', a: '"doesn\'t" — third person singular takes "does", not "do"' },
      { q: 'Is the verb transitive or intransitive? "The teacher explained the concept."', a: 'transitive — "explained" takes an object "the concept"' },
    ],
    faqs: [
      { q: 'What is a phrasal verb?', a: 'A verb combined with a preposition or adverb (look up, run away, turn off). Example: "I look up words in the dictionary."' },
      { q: 'What is the difference between "can" and "could"?', a: '"Can" is present ability ("I can swim"). "Could" is past ability ("I could swim as a child") or polite request ("Could you help?").' },
      { q: 'What are irregular verbs?', a: 'Verbs that don\'t follow the standard "-ed" pattern for past tense (go→went, eat→ate, see→saw). They must be memorized.' },
    ],
  },
  {
    slug: 'adjectives',
    title: 'Adjectives',
    emoji: '✨',
    intro: 'Adjectives are words that describe, modify, or give more information about nouns and pronouns. They add color, detail, and specificity to your writing.',
    keyPoints: [
      'Descriptive adjectives: describe qualities (beautiful, cold, large, happy)',
      'Quantitative adjectives: indicate amount or number (some, many, few, several)',
      'Demonstrative adjectives: point to specific nouns (this, that, these, those)',
      'Possessive adjectives: show ownership (my, your, his, her, its, our, their)',
      'Comparative & superlative: compare one thing to another or others (big→bigger→biggest)',
    ],
    examples: [
      'Descriptive: "The blue sky was absolutely stunning."',
      'Quantitative: "She has many friends and few enemies."',
      'Demonstrative: "I prefer this option over that one."',
      'Possessive: "Your ideas are excellent, and my team agrees."',
      'Comparative: "This book is more interesting than that one." (superlative: "the most interesting")',
    ],
    commonMistakes: [
      'Adjective before a linking verb must be an adjective, not adverb: "The food looks good" (not "goodly")',
      'Wrong order: adjectives follow a pattern (opinion, size, age, shape, color): "a beautiful old red car" (not "a red old beautiful car")',
      'Double comparatives: "more better" is wrong; use "better" or "more good" (not both)',
    ],
    practice: [
      { q: 'Identify the adjective: "The tall, dark stranger arrived on a cold, rainy night."', a: 'tall, dark, cold, rainy — all describe nouns' },
      { q: 'Fill the blank: "This dress is more beautiful _____ that one." Use "than" or "as"?', a: 'than — used in comparative adjectives; "This is more beautiful than that one."' },
      { q: 'Correct: "She feels badly about the mistake."', a: '"bad" — use adjective after linking verb "feels"; "She feels bad."' },
    ],
    faqs: [
      { q: 'What is the difference between "old" and "elder"?', a: '"Old" describes age; "elder" shows family rank. "My old sister" means age; "my elder sister" means born first.' },
      { q: 'Can adjectives be used as nouns?', a: 'Yes, sometimes! "The poor need help" — "poor" (normally adjective) becomes a noun meaning "poor people".' },
      { q: 'How do I form comparatives for long adjectives?', a: 'For adjectives 2+ syllables, use "more/less": "more beautiful", not "beautifuler". For one-syllable: "bigger", "colder", "faster".' },
    ],
  },
  {
    slug: 'adverbs',
    title: 'Adverbs',
    emoji: '🚀',
    intro: 'Adverbs modify verbs, adjectives, or other adverbs by adding information about how, when, where, or to what extent something happens. They make sentences more precise and vivid.',
    keyPoints: [
      'Adverbs of manner: how something happens (quickly, slowly, carefully, beautifully)',
      'Adverbs of time: when something happens (yesterday, today, soon, always)',
      'Adverbs of place: where something happens (here, there, upstairs, abroad)',
      'Adverbs of frequency: how often (always, often, sometimes, never, rarely)',
      'Adverbs of degree: to what extent (very, quite, too, so, extremely)',
    ],
    examples: [
      'Manner: "She spoke softly and politely."',
      'Time: "We will meet tomorrow afternoon."',
      'Place: "The students are studying upstairs."',
      'Frequency: "They rarely miss a class."',
      'Degree: "This assignment is very difficult."',
    ],
    commonMistakes: [
      'Confusing adjectives and adverbs: "He is a quick worker" (adj) vs "He works quickly" (adv)',
      'Adverbs ending in "-ly" that are not adverbs: "lovely", "friendly" are adjectives despite "-ly"',
      'Misplacing adverbs: "She never has been to Paris" should be "She has never been to Paris" (adverb near main verb)',
    ],
    practice: [
      { q: 'Identify the adverb and what it modifies: "She runs incredibly fast."', a: 'incredibly (adverb) modifies "fast" (adjective); "fast" modifies "runs" (verb)' },
      { q: 'Choose the correct form: "The children are playing (happy/happily)."', a: 'happily — adverb modifies the verb "playing"' },
      { q: 'Rewrite with the adverb in correct position: "Yesterday, I never have seen him."', a: '"I have never seen him before." or "Yesterday, I never saw him."' },
    ],
    faqs: [
      { q: 'How do I form adverbs from adjectives?', a: 'Usually add "-ly": quick→quickly, careful→carefully. Some adjectives already end in "-ly" (friendly, lovely), so they don\'t change.' },
      { q: 'What is the difference between "already" and "still"?', a: '"Already" means something has happened (positive). "Still" means it is continuing or hasn\'t stopped yet.' },
      { q: 'Can adverbs come at the beginning of a sentence?', a: 'Yes! "Surprisingly, she agreed to help." — fronted adverbs add emphasis or show connection to prior sentences.' },
    ],
  },
  {
    slug: 'articles',
    title: 'Articles: A, An, and The',
    emoji: '📄',
    intro: 'Articles are small words that come before nouns to specify or generalize them. English has three articles: a, an, and the. Mastering their use is crucial for natural English writing.',
    keyPoints: [
      'Indefinite article "a": used before consonant sounds; introduces something new or non-specific ("a book", "a university")',
      'Indefinite article "an": used before vowel sounds; introduces something new or non-specific ("an apple", "an hour")',
      'Definite article "the": specifies something known or mentioned before; shows definiteness',
      'Zero article: no article needed for plural nouns (general) or uncountable nouns in general sense',
      'Proper nouns: usually no article (Delhi, Priya, January) unless part of the name (The United States)',
    ],
    examples: [
      'Indefinite: "I read a book yesterday." (not specific which book)',
      'Definite: "The book I read yesterday was excellent." (specific book)',
      'Plural no article: "Books are sources of knowledge." (general statement)',
      'Proper noun: "Paris is beautiful." vs "The United States is large."',
    ],
    commonMistakes: [
      'Using "a" before vowel sound: "a apple" — say "an apple" (sound matters, not spelling)',
      'Wrong article with institutions: "I go to the school." — use no article if attending: "I go to school"; use "the" if visiting as visitor',
      'Inconsistent article use: "I have a cat. Cat is very playful." — use "The cat" for consistency, not just "Cat"',
    ],
    practice: [
      { q: 'Fill the blank: "_____ elephant is _____ large animal. I saw _____ elephant at _____ zoo yesterday."', a: 'An (before vowel sound), a (indefinite singular), an (before vowel), the (specific zoo)' },
      { q: 'Correct: "I go to the bank every Monday." vs "I work at the bank every Monday."', a: 'Both correct! First = visiting (to); second = employed there (at). Context determines meaning, not the article.' },
      { q: 'Choose: "She is studying (medicine / the medicine)."', a: 'medicine — uncountable noun, general sense, no article' },
    ],
    faqs: [
      { q: 'When do I use "the" with place names?', a: 'Use "the" for: mountain ranges (the Himalayas), oceans (the Pacific), countries with "of/Republic/Kingdom" (the United Kingdom), plural islands (the Philippines).' },
      { q: 'Is it "I have a coffee" or "I have coffee"?', a: 'Both! "I have a coffee" = one cup; "I have coffee" = coffee in general or uncountable. Context determines.' },
      { q: 'What about "the" with unique things like "sun", "moon", "earth"?', a: '"The sun", "the moon", "the earth" — use the because there\'s only one. But in astronomy, "Sun", "Moon", "Earth" (capitalized) may not need "the".' },
    ],
  },
  {
    slug: 'prepositions',
    title: 'Prepositions',
    emoji: '🗺️',
    intro: 'Prepositions show relationships between nouns (or pronouns) and other words in a sentence. They indicate position, direction, time, manner, or association.',
    keyPoints: [
      'Prepositions of place: in, on, at, under, above, between, beside, into, through',
      'Prepositions of time: at, on, in, during, before, after, since, until, for',
      'Prepositions of direction: to, from, toward, up, down, across, along, past',
      'Prepositions of manner: with, by, in, on, without, like, through',
      'Prepositions of association: with, without, about, of, for, against',
    ],
    examples: [
      'Place: "The cat is on the table. She sits under the tree."',
      'Time: "We meet at 3 PM on Monday in June."',
      'Direction: "He walked toward the park and through the gate."',
      'Manner: "She solved it with patience and by thinking carefully."',
      'Association: "a cup of tea, a fear of heights, a book about history"',
    ],
    commonMistakes: [
      'Wrong preposition: "different than" should be "different from" (in American English)',
      'Ending sentences with prepositions: "Where did he go to?" should be "Where did he go?" (avoid prepositions at sentence end)',
      'Forgetting prepositions in fixed phrases: "I am interested music" — use "in": "interested in music"',
    ],
    practice: [
      { q: 'Fill the blanks: "The book is _____ the shelf. She walked _____ the door _____ the classroom."', a: 'on (place), through (direction), into (direction)' },
      { q: 'Correct: "I am afraid of the dark." Is this sentence correct?', a: 'Yes — "afraid of" is the correct prepositional phrase' },
      { q: 'Choose the correct preposition: "She is married _____ him." (to, with, for)', a: 'to — "married to" is the standard phrase' },
    ],
    faqs: [
      { q: 'Is it OK to end a sentence with a preposition?', a: 'Modern English allows it, especially in informal writing: "That is the person I was talking about." However, formal writing prefers: "That is the person about whom I was talking."' },
      { q: 'What is the difference between "in" and "into"?', a: '"In" shows position (already inside): "in the room". "Into" shows movement toward an inside position: "walked into the room".' },
      { q: 'Are there fixed prepositional phrases I should memorize?', a: 'Yes! Common ones: "in time", "on time", "by mistake", "in my opinion", "at least", "on purpose". Context determines the exact preposition.' },
    ],
  },
  {
    slug: 'active-passive-voice',
    title: 'Active and Passive Voice',
    emoji: '🔄',
    intro: 'Voice shows whether the subject performs an action (active) or receives an action (passive). Understanding both helps you write with clarity and variety.',
    keyPoints: [
      'Active voice: subject performs the action (The teacher teaches the students)',
      'Passive voice: subject receives the action (The students are taught by the teacher)',
      'Active voice is direct, clear, and preferred in most writing',
      'Passive voice emphasizes the action or object, or hides the agent',
      'Form of passive: subject + form of "be" + past participle (+ by + agent)',
    ],
    examples: [
      'Active: "The chef prepared a delicious meal." (chef = subject doing action)',
      'Passive: "A delicious meal was prepared by the chef." (meal = subject receiving action)',
      'Active: "She wrote the report yesterday."',
      'Passive: "The report was written by her yesterday."',
      'Passive without agent: "The award was given to him." (agent not mentioned)',
    ],
    commonMistakes: [
      'Mixing active and passive in one sentence: "She prepared dinner, but the dessert was made by Tom." — keep consistent',
      'Passive voice sounds awkward: "A book was read by me" — use active "I read a book"',
      'Wrong past participle: "The house was build" — use "built": "The house was built in 1990."',
    ],
    practice: [
      { q: 'Change to passive voice: "The students completed the project."', a: '"The project was completed by the students."' },
      { q: 'Change to active voice: "The emails were sent by the secretary."', a: '"The secretary sent the emails."' },
      { q: 'Which is active and which is passive? (A) "I love this game." (B) "This game is loved by me."', a: '(A) active — subject "I" performs action; (B) passive — subject "game" receives action' },
    ],
    faqs: [
      { q: 'When should I use passive voice?', a: 'When the action is more important than who does it ("Mistakes were made"), when the agent is unknown ("The door was left open"), or for formal tone ("It is believed that...").' },
      { q: 'Can all verbs be made passive?', a: 'No, only transitive verbs (those with objects) can be made passive. "She sleeps" (intransitive) cannot be made passive.' },
      { q: 'Is passive voice always wrong?', a: 'No! It\'s not wrong, just less direct. Use it when appropriate, but prefer active voice for clarity.' },
    ],
  },
  {
    slug: 'direct-indirect-speech',
    title: 'Direct and Indirect Speech',
    emoji: '💬',
    intro: 'Direct speech records exact words spoken (using quotation marks). Indirect speech reports what was said without quoting exactly. Both are important for storytelling and writing.',
    keyPoints: [
      'Direct speech: repeats exact words with quotation marks ("I love playing cricket," she said)',
      'Indirect speech: reports the meaning without exact words (She said that she loves playing cricket)',
      'Changing from direct to indirect involves: verb tense shift, pronoun change, removal of quotation marks',
      'Shifts in time reference: "today" → "that day", "tomorrow" → "the next day", "now" → "then"',
      'Questions and commands have special patterns in indirect speech',
    ],
    examples: [
      'Direct: "I am going to the market," she said.',
      'Indirect: She said that she was going to the market.',
      'Direct: "Do you like ice cream?" he asked.',
      'Indirect: He asked if she liked ice cream.',
      'Direct: "Please close the door," mother said.',
      'Indirect: Mother asked him to close the door.',
    ],
    commonMistakes: [
      'Wrong tense in indirect speech: "She said that she likes ice cream" (wrong); use past tense: "she liked ice cream"',
      'Forgetting "that": "He said he is going" — use "said that": "He said that he was going"',
      'Not changing pronouns: Direct "I will do it," he said → Indirect "He said he would do it" (not "I will")',
    ],
    practice: [
      { q: 'Convert to indirect speech: "I passed my exam yesterday," Ram said.', a: 'Ram said that he had passed his exam the day before.' },
      { q: 'Convert to indirect speech: "What is your name?" she asked.', a: 'She asked what my name was.' },
      { q: 'Convert to direct speech: "The teacher told the students to submit their projects by Friday."', a: '"Submit your projects by Friday," the teacher said to the students.' },
    ],
    faqs: [
      { q: 'Do I always need "that" in indirect speech?', a: 'No, "that" is optional for statements but helps clarity: "He said he was coming" or "He said that he was coming" both work.' },
      { q: 'How do I handle exclamations in indirect speech?', a: 'Use a reporting verb: Direct "What a beautiful day!" → Indirect "She exclaimed that it was a beautiful day."' },
      { q: 'What happens to time words when reporting speech?', a: '"Now" → "then", "today" → "that day", "tomorrow" → "the next day", "here" → "there" — shift based on perspective.' },
    ],
  },
  {
    slug: 'subject-verb-agreement',
    title: 'Subject-Verb Agreement',
    emoji: '✅',
    intro: 'The subject and verb in a sentence must agree in number and person. A singular subject needs a singular verb, and a plural subject needs a plural verb.',
    keyPoints: [
      'Singular subjects take singular verbs (She runs, The cat sleeps, He is happy)',
      'Plural subjects take plural verbs (They run, The cats sleep, We are happy)',
      'Collective nouns can be singular or plural depending on context (The team is/are playing)',
      'Words between subject and verb do not change agreement: "The boy with two dogs runs" (runs, not run)',
      'Indefinite pronouns: some are singular (anyone, someone, everybody), others are plural (both, few, several)',
    ],
    examples: [
      'Singular: "He works hard every day."',
      'Plural: "They work hard every day."',
      'Collective: "The committee is meeting tomorrow." (one unit) vs "The committee are divided on this issue." (individual members)',
      'Interrupted: "The news from various sources is confusing." (news = singular, not sources)',
      'Indefinite: "Everyone has their own opinion." (everyone = singular but can use "their")',
    ],
    commonMistakes: [
      'Subject-verb mismatch: "The students is studying" — use "are" with plural',
      'Incorrect plural verb form: "The cat have eaten" — use "has", not "have"',
      'Confusing singular with intervening phrases: "The book on the shelves are interesting" — "book" is singular, so "is"',
    ],
    practice: [
      { q: 'Choose the correct verb: "Either the principal or the teachers (is/are) responsible."', a: 'are — when "or" connects subjects, use plural verb' },
      { q: 'Correct: "The team have won the championship." (British or American perspective?)', a: 'Both can be correct! British English often uses plural "have"; American English uses singular "has".' },
      { q: 'Fill the blank: "Physics (is/are) my favorite subject."', a: 'is — Physics is singular (one subject), despite sounding plural' },
    ],
    faqs: [
      { q: 'What is the rule when "and" connects subjects?', a: 'Use plural verb: "The boy and girl are friends." Exception: If they form one unit ("fish and chips is a meal"), use singular.' },
      { q: 'How do I handle subjects like "each", "every", "neither"?', a: 'These are singular: "Each student has a textbook." "Neither option is perfect." "Every dog needs water."' },
      { q: 'What about agreement with "data" and "criteria"?', a: '"Data" and "criteria" are plural (from "datum" and "criterion"), so use plural verbs: "The data are clear." "These criteria are important."' },
    ],
  },
  {
    slug: 'essay-writing',
    title: 'Essay Writing',
    emoji: '📝',
    intro: 'An essay is a short piece of structured writing on a single topic. Effective essays have a clear introduction, body paragraphs with supporting details, and a conclusion that summarizes the main points.',
    keyPoints: [
      'Introduction: hook the reader, introduce the topic, and present the thesis statement (main argument)',
      'Body paragraphs: each paragraph focuses on one main idea supported by examples, evidence, or explanations',
      'Topic sentence: the first sentence of each body paragraph that states the main idea',
      'Conclusion: restate the thesis in different words, summarize main points, and leave a lasting impression',
      'Cohesion: use transitions (however, therefore, moreover) to connect ideas smoothly',
    ],
    examples: [
      'Hook: "Imagine a world without books." (engages reader)',
      'Thesis: "Reading is essential for intellectual growth and social development."',
      'Topic sentence: "Reading improves vocabulary and comprehension skills."',
      'Supporting evidence: "A study by Smith (2020) found that students who read for 30 minutes daily improve reading speed by 25%."',
      'Conclusion: "In conclusion, reading remains one of the most powerful tools for learning and personal growth."',
    ],
    commonMistakes: [
      'Weak thesis: "Books are interesting." — be specific: "Online shopping has transformed consumer behavior by increasing accessibility, variety, and convenience."',
      'Paragraph without topic sentence: ensure each paragraph has a clear main idea',
      'Poor transitions: "The first reason is... The second reason is..." — use "Moreover", "Additionally", "In contrast"',
    ],
    practice: [
      { q: 'Write a topic sentence for an essay about environmental protection.', a: 'Example: "Environmental protection requires immediate action from both governments and individuals to prevent irreversible damage to our planet."' },
      { q: 'What should a strong introduction include?', a: 'A hook to engage the reader, background information, and a clear thesis statement that presents the main argument.' },
      { q: 'How many paragraphs should an essay have?', a: 'A basic essay: 1 introduction + 3-5 body paragraphs + 1 conclusion. Longer essays may have more body paragraphs.' },
    ],
    faqs: [
      { q: 'How do I write a good hook?', a: 'Start with a surprising fact, question, quote, or story related to your topic that makes the reader want to continue.' },
      { q: 'Should I use first person ("I think") in academic essays?', a: 'Varies by context. Formal academic essays often avoid "I", but personal essays and narratives use it. Check your guidelines.' },
      { q: 'How long should each body paragraph be?', a: 'Usually 5-7 sentences: topic sentence, supporting details, explanations, and a concluding sentence that connects to the thesis.' },
    ],
  },
  {
    slug: 'letter-writing',
    title: 'Letter Writing',
    emoji: '✉️',
    intro: 'A well-written letter communicates ideas clearly and professionally. Letters can be formal (business, official) or informal (personal, friendly). Each type has specific conventions and tone.',
    keyPoints: [
      'Formal letter parts: sender\'s address, date, recipient\'s address, salutation, body, closing, signature',
      'Informal letter parts: less structured; may skip addresses; uses casual language and friendly tone',
      'Salutation: "Dear Sir/Madam" (formal), "Dear Mr./Ms./Dr. [Name]" (formal), "Dear [Name]" (semi-formal), "Hi/Hello [Name]" (informal)',
      'Closing: "Yours sincerely" (formal), "Best regards" (professional), "Yours truly" (formal), "Cheers" (informal)',
      'Tone: formal letters are respectful and clear; informal letters are personal and conversational',
    ],
    examples: [
      'Formal opening: "I am writing to inquire about..." or "I am pleased to inform you that..."',
      'Informal opening: "I hope you are doing well!" or "How have you been?"',
      'Formal body: "Please note that the deadline for submission is December 31st."',
      'Informal body: "We had such a great time at the party, and I wanted to thank you for organizing it!"',
      'Formal closing: "I look forward to hearing from you." (+ "Yours sincerely")',
      'Informal closing: "Hope to see you soon!" (+ "Cheers")',
    ],
    commonMistakes: [
      'Wrong tone: mixing formal and informal ("I am writing to say what\'s up" — maintain consistent tone)',
      'Missing address details: formal letters need sender and recipient addresses',
      'Vague purpose: start with a clear statement of why you are writing',
    ],
    practice: [
      { q: 'Write a formal opening line for a complaint letter to a manager.', a: 'Example: "I am writing to formally lodge a complaint regarding the service I received on December 5th."' },
      { q: 'Is this closing appropriate for a business letter? "See ya later!"', a: 'No, too informal. Use: "Yours sincerely", "Best regards", or "Yours truly".' },
      { q: 'What is the difference between "Dear Sir" and "Dear Sir or Madam"?', a: '"Dear Sir or Madam" is more inclusive when you don\'t know the recipient\'s gender. Use specific names when available.' },
    ],
    faqs: [
      { q: 'Should I use a colon or comma after the salutation?', a: 'Formal letters: colon "Dear Mr. Smith:". Informal/friendly letters: comma "Dear John," or no punctuation.' },
      { q: 'How many paragraphs should a formal letter have?', a: 'Typically 3-4: introduction (state purpose), middle paragraphs (provide details/explanation), conclusion (clear action or closing).' },
      { q: 'What should I include in a thank-you letter?', a: 'Specific mention of what you are thanking them for, how it helped, and a warm closing. Keep it brief and genuine.' },
    ],
  },
  {
    slug: 'reading-comprehension',
    title: 'Reading Comprehension',
    emoji: '📖',
    intro: 'Reading comprehension involves understanding, analyzing, and interpreting written text. Strong comprehension skills help you grasp the main ideas, infer meaning, and engage with complex texts.',
    keyPoints: [
      'Main idea: the central point or theme of a passage — identify by looking at title, topic sentences, and repeated concepts',
      'Supporting details: specific examples, facts, or explanations that back up the main idea',
      'Inference: reading between the lines to understand implied meaning not directly stated',
      'Vocabulary in context: understanding word meanings from surrounding text clues',
      'Text structure: how information is organized (chronological, cause-effect, problem-solution, compare-contrast)',
    ],
    examples: [
      'Main idea: "Modern technology has revolutionized education, making learning accessible to millions of students worldwide."',
      'Supporting detail: "Online platforms like Khan Academy offer free courses in mathematics, science, and history."',
      'Inference: If a passage says "She canceled her vacation," we can infer something unexpected happened.',
      'Context clue: "The scientist\'s hypothesis was substantiated by evidence." (substantiated = supported/proven by context)',
      'Text structure: "First, light enters the eye. Then, the lens focuses it. Finally, the retina captures the image." (chronological)',
    ],
    commonMistakes: [
      'Confusing main idea with supporting details: "Main idea: The bird flew over the tree" is a detail, not main idea',
      'Literal interpretation of figurative language: "It\'s raining cats and dogs" does not mean animals are falling',
      'Ignoring context: assuming a word\'s definition from spelling alone, ignoring how it is used',
    ],
    practice: [
      { q: 'Read: "Every summer, the town organizes a festival to celebrate local culture. This year, over 5,000 people attended." What is the main idea?', a: 'The town hosts an annual summer festival that is popular and well-attended.' },
      { q: 'What does "resilient" mean in this sentence? "After the defeat, the team showed resilience and won the next three games."', a: 'Resilient/resilience means ability to recover or bounce back from difficulty.' },
      { q: 'Read and infer: "Rahul has not eaten all day. When offered a snack, he grabbed it quickly." What can we infer?', a: 'Rahul is hungry (implied, not directly stated).' },
    ],
    faqs: [
      { q: 'How do I improve my reading speed without losing comprehension?', a: 'Read regularly, minimize subvocalization (saying words in your head), chunk words into groups, and skim headings before detailed reading.' },
      { q: 'What is the difference between inference and prediction?', a: 'Inference: deducing meaning from given information. Prediction: guessing what comes next (requires both inference and anticipation).' },
      { q: 'How do I distinguish between fact and opinion?', a: 'Facts are verifiable and objective ("Paris is the capital of France"). Opinions are beliefs or judgments ("Paris is the most beautiful city").' },
    ],
  },
];
