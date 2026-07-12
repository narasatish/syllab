import { TutorialTopic } from './types';

export const spokenEnglishTopics: TutorialTopic[] = [
  {
    id: 'eng-01-confidence',
    category: 'Foundation',
    title: 'Why Spoken English Matters & Overcoming Fear',
    difficulty: 'Beginner',
    theory: [
      'Speaking English opens doors to better job opportunities, global communication, and confidence. Many Indian students fear speaking due to perfectionism, but fluency comes from practice, not perfection. Starting today with mistakes beats waiting for a perfect moment—every fluent speaker began where you are now.',
      'Hesitation stems from limited real-conversation exposure. The solution: consistent, low-pressure practice with yourself, recording, and gradual engagement with others. Mistakes are learning opportunities; professional speakers make errors too, and listeners focus on your message, not grammar.',
      'Your Indian English accent is an asset. Global English is diverse. Focus on clarity and confidence in your message rather than sounding native. Most successful professionals speak with their mother-tongue influence—and it works.'
    ],
    code: `Student: I want to speak English, but I'm scared of mistakes.
Mentor: That fear is normal. Every fluent speaker started exactly here. Speaking imperfectly today beats speaking perfectly never.
Student: Maybe I can ask my friend about their day?
Mentor: Perfect! Start there. One sentence daily compounds.`,
    output: 'By accepting mistakes as part of learning, you reduce anxiety and build fluency faster.',
    notes: [
      'Perfectionism delays progress; action builds fluency.',
      'Your accent is your identity; clarity matters more than sounding native.',
      'Consistent 10-minute daily practice beats one 2-hour session per week.'
    ],
    xp: 15,
    practice: {
      title: 'Identify Your Speaking Fear',
      description: 'Write down one specific scenario that makes you nervous (phone call, meeting, greeting native speakers). What exactly worries you? Naming it conquers it.',
      hint: 'Think of a real situation from last month when you avoided speaking English.',
      solution: 'Common fears: "I\'ll be judged," "I won\'t understand," "I\'ll sound stupid." All manageable—you can ask people to repeat, speak slower, or prepare in advance.',
      expectedOutput: 'A clear statement like: "I fear phone calls because I can\'t see faces and worry I\'ll misunderstand."'
    }
  },
  {
    id: 'eng-02-greetings',
    category: 'Conversation',
    title: 'Everyday Conversation & Common Phrases',
    difficulty: 'Beginner',
    theory: [
      'Everyday English is built on 50-100 fixed phrases native speakers use daily. Learning these fluently is more valuable than memorizing rare vocabulary. Greetings, responses to "How are you?", small talk starters, and polite transitions form the skeleton of natural conversation.',
      'Small talk builds rapport and transitions into deeper topics. Formula: Greeting → Question about something observable → Listen → Add your comment. In India, discuss weather, work, family, or recent events. This dance happens in 30 seconds and opens doors.',
      'Politeness matters in Indian culture. Use "Would you mind...?", "Could you please...?", "Thank you so much." These aren\'t robotic; they\'re expected and appreciated, especially in professional or formal settings.'
    ],
    code: `Person A: Hi! How are you doing?
Person B: I'm doing well, thanks. How about you?
Person A: Pretty good! Did you catch the match yesterday?
Person B: I did! India played really well. Are you a cricket fan?
Person A: Definitely. Have you been following the latest series?`,
    output: 'This flow feels natural and requires no complex grammar, yet keeps conversation alive.',
    notes: [
      'Essential phrases: "How\'s it going?", "Not much, just [activity]", "Tell me about it!", "Same here."',
      'Master small talk before diving into serious discussions.',
      'Listen twice as much as you speak; ask genuine follow-up questions.'
    ],
    xp: 12,
    practice: {
      title: 'Start a Conversation',
      description: 'Write or record a 30-second greeting exchange about someone\'s weekend. Include: greeting, question, follow-up based on their answer.',
      startCode: 'You: Hi! How was your weekend?\nFriend: [their answer]\nYou: [your follow-up]',
      hint: 'If they say "I went hiking," follow up: "That\'s awesome! Where did you go?"',
      solution: 'You: Hi! How was your weekend?\nFriend: Pretty good, I went hiking.\nYou: That\'s awesome! Where did you go? I love hiking too.',
      expectedOutput: 'A flowing exchange that shows active listening and genuine interest.'
    }
  },
  {
    id: 'eng-03-grammar',
    category: 'Grammar',
    title: 'Sentence Structure & Common Grammar Mistakes Indians Make',
    difficulty: 'Intermediate',
    theory: [
      'Indians struggle with three grammar areas: (1) Articles (a, an, the)—Indian languages often omit them. "I went to school" (which school?) vs "I went to the school" (specific one). (2) Tenses—mixing present perfect with past simple: "I am doing this for 5 years" (wrong) vs "I have been doing this for 5 years" (right). (3) Prepositions—"in the morning" not "in morning," "on Monday" not "in Monday."',
      'English subject-verb-object (SVO) order is strict. We sometimes follow Hindi word order. Practice: WHO (subject) + ACTION (verb) + WHAT (object). Bad: "To make coffee, water hot is needed." Good: "To make coffee, you need hot water."',
      'Conditional sentences: "If I would go, I will see" (wrong). Correct: "If I go, I will see" or "If I went, I would see." This structure is rigid in English and critical for professional communication.'
    ],
    syntax: 'Present Perfect = Have/Has + Past Participle (for recent or ongoing actions)',
    code: `WRONG: I am working here for two years.
RIGHT: I have been working here for two years.

WRONG: In morning on Monday, I am going in the meeting.
RIGHT: In the morning on Monday, I am going to the meeting.

WRONG: If I would get the job, I will move to Bangalore.
RIGHT: If I get the job, I will move to Bangalore.`,
    output: 'Corrected sentences fix Indian English pitfalls and sound natural.',
    notes: [
      'Articles: "the" for specific, "a/an" for general. "I need a pen" (any); "I need the red pen" (that one).',
      'Prepositions are idiomatic; memorize: "at work," "in the afternoon," "on time," "by tomorrow".'
    ],
    xp: 18,
    practice: {
      title: 'Fix Grammar Errors',
      description: 'Correct these sentences: (1) "I am staying in this company for three years." (2) "In the morning at 8, I go to office." (3) "If you will complete the work, you can go home."',
      startCode: 'Three sentences with articles, tenses, or preposition errors.',
      hint: 'Check: Missing article? Mixed tense? Wrong preposition?',
      solution: `(1) "I have been staying in this company for three years." (present perfect)
(2) "In the morning at 8, I go to the office." (article + preposition)
(3) "If you complete the work, you can go home." (correct conditional)`,
      expectedOutput: 'Three corrected sentences following English grammar rules.'
    }
  },
  {
    id: 'eng-04-vocabulary',
    category: 'Vocabulary',
    title: 'Building Vocabulary Effectively',
    difficulty: 'Intermediate',
    theory: [
      'Effective vocabulary learning is context-based, not list-based. Learning "ubiquitous" from a list is 90% less likely to stick than encountering it in a book or podcast. Prioritize learning words in context: read, listen to podcasts, and notice words used by speakers you admire.',
      'For Indian students, learn "business English" and "conversational English" together. Conversational: "How\'s the project going?", "It\'s on track," "We hit a snag." Business: "synergy," "stakeholder," "deliverable," "bandwidth." Start with conversational phrases; business jargon follows naturally.',
      'Use the "three-tier" approach: Tier 1 (500 words)—essential daily words. Tier 2 (1,500 words)—working vocabulary. Tier 3 (5,000+ words)—passive recognition. Focus on Tier 1 and 2. Spaced repetition (review at 1 day, 3 days, 1 week) locks in Tier 1 words permanently.'
    ],
    code: `Example: Learning "resolve" in context.
Native speaker: "We tried three times but never resolved the issue."
Your deduction: resolve = fix a problem.
Your practice: "I resolved the customer complaint by offering a refund."

Learn with context clues, not dictionary definitions.`,
    output: 'Words learned in context are 3x more likely to be used naturally in future conversations.',
    notes: [
      'Read widely: news, blogs, books in English. Highlight unknown words.',
      'Keep a notebook; write sentences YOU would say with new words, not just definitions.',
      'Say new words aloud 3 times to lock phonetic memory.'
    ],
    xp: 14,
    practice: {
      title: 'Learn a Word in Context',
      description: 'Find one new word from a book, podcast, or news article. Write: where you found it, what you think it means from context, one sentence using it.',
      hint: 'Pick a word a native speaker used, not a random list word. What surrounding words help you guess?',
      solution: 'Word "defer" from news: "The government will defer the decision." Context clue: "to next quarter" = waiting/postponing. Sentence: "We will defer the meeting until everyone is available."',
      expectedOutput: 'One word with: source, context-based definition, and one sample sentence.'
    }
  },
  {
    id: 'eng-05-pronunciation',
    category: 'Pronunciation',
    title: 'Pronunciation & Clarity (Indian-English Pitfalls)',
    difficulty: 'Intermediate',
    theory: [
      'Indian English has distinct features: retroflex consonants, syllable-timed rhythm, and schwa sounds. Common pitfalls: "schedule" (sked-yool, not shed-ul), "receipt" (rhymes with "sweet"), "th" sounds (Indians say "d" or "t": "dis" for "this"). Your accent is fine; clarity is the goal.',
      'Word stress makes huge difference. "REcord" (noun) vs "reCORD" (verb). "PREsent" vs "preSENT." Indians often stress first syllable; English differs. Listening to native speakers and noticing stress fixes 30% of clarity issues.',
      'Linking and intonation: "Did you" sounds like "didja," "want to" sounds like "wanna." Practice flowing speech, not word-by-word. Intonation signals questions vs statements: "You\'re coming?" (rising = asking) vs "You\'re coming." (falling = telling). Vary your intonation to sound more fluent.'
    ],
    code: `Pronunciation pitfalls:
RECEIPT → "rih-SEET" (rhyme "sweet"), not "rih-SEET" backwards
SCHEDULE → British: "SHED-yool", American: "SKED-yool"
THIS → "th" sound (tongue between teeth), not "dis"

Linking examples:
"Did you go?" → "Didja go?"
"Going to" → "Gonna"
"Want to" → "Wanna"`,
    output: 'Understanding these patterns helps you sound clearer without changing your core accent.',
    notes: [
      'Record yourself saying 10 sentences; compare with native audio. Where does stress differ?',
      'Practice "th" sounds: place tongue between teeth, blow gently.',
      'Listen to TED Talks; notice linking and stress patterns.'
    ],
    xp: 16,
    practice: {
      title: 'Stress and Clarity Check',
      description: 'Record yourself saying: PREsent, imPORT, OBject, PERmit, proCESS. Compare with native pronunciation online. Mark where you match.',
      startCode: 'Say and record: "I present the import data."',
      hint: 'Use YouTube "English pronunciation" or forvo.com for native audio.',
      solution: 'PREZ-ent (noun), prih-ZENT (verb); IM-port (noun), im-PORT (verb); OBject (noun), ub-JECT (verb).',
      expectedOutput: 'A recording where your stress matches native pronunciation for 4 out of 5 words.'
    }
  },
  {
    id: 'eng-06-questions',
    category: 'Conversation',
    title: 'Asking & Answering Questions Fluently',
    difficulty: 'Intermediate',
    theory: [
      'Question-asking is a superpower: it keeps conversations flowing and shows genuine interest. Many Indians give short answers and go silent. Instead, answer + ask one back. E.g., "How\'s work?" → "Work is good, busy with a new project. How about you?" This keeps conversations alive.',
      'English question formation has rules: "Do you like coffee?" (auxiliary + subject + verb), not "You like coffee?" or "Why you did not come?" (wrong). Tag questions ("You\'re coming, aren\'t you?") are frequent but tricky: the tag flips the auxiliary (am→aren\'t, have→haven\'t, did→didn\'t).',
      'Indirect questions are softer and more polite, especially in professional settings. "Could you tell me where the meeting is?" is better than "Where is the meeting?" Indirect questions don\'t flip subject-verb: "I wonder if you could help" not "I wonder if could you help." This small change shows respect.'
    ],
    code: `Direct Q: "Does she want coffee?"
Indirect Q: "Could you ask if she wants coffee?"

Tag questions:
"You're ready, aren't you?" (positive + negative tag)
"He doesn't like meetings, does he?" (negative + positive tag)

Answer + Ask back:
Q: "What do you do?"
A: "I'm a software engineer. I work on mobile apps. What about you?"`,
    output: 'Proper question formation and tag questions sound natural and fluent.',
    notes: [
      'Tag questions signal confirmation: "You\'ve done this, haven\'t you?"',
      'Indirect questions are essential in professional English.',
      'Always answer + ask one back to keep conversations flowing.'
    ],
    xp: 17,
    practice: {
      title: 'Convert to Indirect Questions',
      description: 'Make these direct questions indirect/polite: (1) "Why are you late?" (2) "Do you know the answer?" (3) "Can you help me?" (4) "Where is the bathroom?"',
      hint: 'Start with "Could you tell me...?", "I wonder if...", "Would you mind...?"',
      solution: `(1) "Could you tell me why you're late?" (2) "Do you happen to know the answer?" (3) "Would you mind helping me?" (4) "Could you tell me where the bathroom is?"`,
      expectedOutput: 'Four indirect questions that sound polite and natural.'
    }
  },
  {
    id: 'eng-07-professional',
    category: 'Professional',
    title: 'Speaking in Professional Settings',
    difficulty: 'Intermediate',
    theory: [
      'Professional English differs: more formal, structured, outcome-focused. Phone calls need clarity and early purpose statement. Emails require brevity, clear subject lines, and formal closings. Meetings demand active participation: ask clarifying questions, offer ideas, follow the agenda.',
      'Tone matters enormously. Use "could" and "would" instead of "can" and "will": "Could you review this?" (polite) vs "Can you review this?" (direct). Avoid "no problem" (too casual); say "Certainly" or "Happy to." Show respect to seniors: formal titles, structured requests.',
      'Meeting participation: listen actively first. Speak once or twice with clear points, not rambling. Use "Building on what Priya said..." or "I\'d like to add..." Prepare one question or comment before meetings. This makes you sound prepared and confident.'
    ],
    code: `Professional phone call:
You: "Hi, this is Ravi. I'm calling about the project status. Do you have 5 minutes?"
Colleague: "Sure, go ahead."
You: "We're on track for Friday deadline. Testing phase is 2 days behind, but we've recovered."
Colleague: "Sounds good."
You: "I'll send the update email by EOD today. Thanks!"

Professional meeting tone:
"I'd like to add one point we should consider..."
"Could you elaborate? I didn't quite catch the timeline."
"Building on what Deepak said, I think we should also..."`,
    output: 'Professional tone with clear purpose and structure makes you sound competent and confident.',
    notes: [
      'In India, hierarchy matters; use titles and formal greetings with seniors.',
      'Email: one clear topic, brief body, call to action clearly stated.',
      'Speak 30% slower in meetings; people process English at normal speed.'
    ],
    xp: 18,
    practice: {
      title: 'Conduct a Professional Phone Call',
      description: 'Record yourself calling your manager to report a project delay. State your name, purpose, issue, solution, and next steps in 1-2 minutes.',
      startCode: 'Scenario: You\'re calling to report a project delay.',
      hint: 'Start: "Hi [name], this is [you]. I\'m calling about..." State issue, offer solution, end with next steps.',
      solution: `"Hi Raj, this is Priya. I'm calling to update you on the redesign. We hit a snag with payment integration testing—taking longer than expected. However, I've added another developer, and we'll be back on track Wednesday. I'll send details by EOD today. Thanks for your time."`,
      expectedOutput: 'A 1-2 minute recording that is clear, professional, and includes purpose, issue, solution, and next steps.'
    }
  },
  {
    id: 'eng-08-introduction',
    category: 'Professional',
    title: 'Self-Introduction & the "Tell Me About Yourself" Answer',
    difficulty: 'Intermediate',
    theory: [
      '"Tell me about yourself" trips up many because people ramble or sound scripted. Winning formula: (1) Name & role/field (2-3 sentences), (2) Key experience or achievement (2-3 sentences), (3) Why you\'re interested in THIS role (1-2 sentences), (4) A question for them. Total: under 2 minutes. Practice until it sounds conversational, not memorized.',
      'Structure matters. Start with a hook: "I\'m a software engineer with 3 years building mobile apps for startups." Then mention achievements: "My most recent project was a logistics app that reduced delivery time by 20%." Finally, connect to the role: "I\'m excited about this role because I\'ve followed your company\'s growth, and I want to contribute to your platform."',
      'For freshers: emphasize relevant projects, internships, or side projects. "I\'m a recent graduate. During my internship at a fintech startup, I learned data analysis and customer research. I\'m excited to bring that perspective to your team."'
    ],
    code: `30-second introduction:
"Hi, I'm Ravi. I'm a software developer with 4 years in full-stack development. I've worked on e-commerce platforms and mobile apps. My most recent project improved application performance by 35%, which I'm proud of. I'm drawn to this role because I admire your company's innovation in edtech. What does a typical day look like here?"

Fresher example:
"I'm Priya, a recent commerce graduate. During my internship at an investment bank, I developed data dashboards that helped stakeholders make faster decisions. I'm excited about this analyst role because I want to grow in fintech."`,
    output: 'A concise, conversational, confident introduction with a strong ending question.',
    notes: [
      'Speak at steady pace; 1 minute you, 1 minute them asking questions.',
      'Practice aloud 5 times; should feel spontaneous, not robotic.',
      'Always end with a question; shows genuine interest.'
    ],
    xp: 15,
    practice: {
      title: 'Craft Your "Tell Me About Yourself" Answer',
      description: 'Write and practice your answer for a role you want. Keep it under 2 minutes. Record yourself and review for clarity, pace, and confidence.',
      startCode: 'Write: 3 sentences on background, 2 on key achievement, 2 on why this role, 1 question.',
      hint: 'Be specific: project name, % improvement, company size. Not generic: "I\'m a hard worker."',
      solution: `"I'm a full-stack engineer with 3 years building SaaS products. At my last role, I led the dashboard redesign, reducing user onboarding from 10 minutes to 2. I'm passionate about user-centric development. Your product resonates with me because it solves a problem I've faced. What metrics matter most to your team?"`,
      expectedOutput: 'A 1.5-2 minute recording with clear, specific, confident delivery ending with a thoughtful question.'
    }
  },
  {
    id: 'eng-09-discussion',
    category: 'Communication',
    title: 'Group Discussion & Expressing Opinions Politely',
    difficulty: 'Advanced',
    theory: [
      'In group discussions, speak early (first 20 seconds) with a strong opening: "I think the core issue is X..." Then listen more than you talk. When you speak again, build on what others said: "Akash raised a great point. I\'d add that we should also consider..." This shows you\'re thinking, not waiting your turn.',
      'Expressing disagreement politely is essential. Never say "You\'re wrong." Instead: "That\'s a valid point. At the same time, I think we should consider..." or "I respectfully disagree because..." or "That\'s interesting, but what if we look at it another way?" These phrases let people save face while you make your point clear.',
      'Structure your opinion: (1) State your stance. (2) Give 1-2 reasons or evidence. (3) Acknowledge the other side. (4) Reinforce your point. Example: "I believe remote work should be offered. First, studies show 25% higher productivity. Second, employees save commute time. I understand some roles need in-office presence, but a hybrid model could balance both." This sounds reasoned and confident.'
    ],
    code: `Opening strong:
"I think the main issue we should tackle first is the budget constraint."

Building on others:
"Deepak made an excellent point about retention. What I'd like to add is that we should also look at pricing strategy."

Polite disagreement:
"I see your perspective, and it's reasonable. However, I believe we're missing something. Market research suggests..."

Acknowledging complexity:
"That's a fair concern. Honestly, there's no perfect solution. What we can do is weigh the trade-offs and move forward."`,
    output: 'Opinions that are clear, respectful, and backed by reasoning sound intelligent and collaborative.',
    notes: [
      'In Indian culture, direct contradiction can seem disrespectful; acknowledge the other person\'s point first.',
      'Use: "I hear you," "That\'s a good point," "I appreciate that perspective" before disagreeing.',
      'Avoid absolutes: "always," "never." Use "often," "generally," "I believe."'
    ],
    xp: 19,
    practice: {
      title: 'Practice Disagreeing Politely',
      description: 'A colleague suggests: "We should outsource customer service to cut costs." You disagree. Write your polite disagreement in 3-4 sentences.',
      hint: 'Acknowledge their concern. State your view with reasoning. Suggest an alternative.',
      solution: `"I appreciate your focus on cost management. I do see the merit in outsourcing. However, I'm concerned that losing in-house control might hurt customer satisfaction, which impacts retention and brand. What if we explore a hybrid model: outsource Tier 1 but keep complex issues in-house? That way we save costs AND maintain quality."`,
      expectedOutput: 'A respectful disagreement showing you\'ve heard their side, explaining your reasoning, and offering a path forward.'
    }
  },
  {
    id: 'eng-10-practice-plan',
    category: 'Practice',
    title: '30-Day Fluency Plan: Shadowing, Thinking in English, Daily Speaking',
    difficulty: 'Advanced',
    theory: [
      'Fluency comes from three proven methods: (1) Shadowing—listen to native speakers and repeat their exact words, stress, and intonation. This rewires your mouth and ear. (2) Thinking in English—narrate your day to yourself. "I\'m making breakfast. The water is boiling now." This trains automatic production. (3) Daily speaking—5-10 minutes every day, recorded and reviewed. Consistency beats intensity; 10 minutes daily for 30 days beats 5 hours once a week.',
      'Week 1: Watch 10 min daily TED Talks. Shadow for 5 min. Think-aloud for 5 min. Week 2: Shadow 10 min, think-aloud 10 min, record 5 Q&A. Week 3: Have one 10-min conversation weekly. Shadow 5 min daily. Week 4: Combine all. By day 30, you\'ll notice smoother production, fewer pauses, and genuine fluency gains.',
      'Track progress: Day 1, record yourself talking about your job for 2 minutes. Day 30, record the same topic. Compare fluency, vocabulary, confidence. Most students report 30-40% improvement in fluency, fewer "umms," and more natural linking.'
    ],
    code: `DAY 1-7: FOUNDATION
Watch TED Talks daily (10 min). Pick topics you love.
Shadow (5 min): Pause, repeat speaker's exact words and stress.
Think-aloud (5 min): "I'm getting ready. I shower, brush teeth, make breakfast."
Evening: Note new words heard; add 3 to notebook.

DAY 8-14: BUILDING
Shadow (10 min daily): Different speaker, e.g., podcast hosts, YouTubers.
Think-aloud (10 min daily): Narrate more complex topics.
Record (3x weekly): Answer "Tell me about yourself," "What's your strength?"

DAY 15-21: SPEAKING
Shadow (5 min daily).
Think-aloud (10 min daily).
Conversation (1x weekly): 10-minute call with someone. Record if possible.
Record yourself daily speaking on a topic.

DAY 22-30: INTEGRATION
Combine all three daily.
2-3 real conversations per week.
Review Day 1 recording vs Day 30. Note improvements.`,
    output: 'A structured 30-day plan yielding measurable fluency gains through consistent, purposeful practice.',
    notes: [
      'Tools: YouTube (TED-Ed, English Addict), Audible, Spotify, language partners (Speaky, ConversationExchange).',
      'Record on your phone; listen back. Cringe-worthy at first, but improve fast.',
      'Join a WhatsApp English group; practice there daily with real people.'
    ],
    xp: 20,
    practice: {
      title: 'Launch Your 30-Day Plan',
      description: 'Record yourself speaking: "My background, my goals, and one challenge I\'m facing." This is your Day 1 baseline. In 30 days, record the same topic and compare.',
      startCode: 'Day 1 Recording: [Your 2-3 minute monologue on the topic above]',
      hint: 'Speak naturally, as if explaining to a friend. Don\'t pause for perfect grammar; keep flowing.',
      solution: `"Hi, I'm Ravi. I'm a developer with 3 years experience. My goal is to lead a team and contribute to products solving real problems. Right now, I'm improving my spoken English—my challenge is thinking fast without reverting to Hindi. But I'm committed to this 30-day plan."`,
      expectedOutput: 'A 2-3 minute recording saved with today\'s date as your baseline. Plan to record the same topic on Day 30 and compare fluency, vocabulary, and confidence.'
    }
  }
];
