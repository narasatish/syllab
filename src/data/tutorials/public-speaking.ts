import { TutorialTopic } from './types';

export const publicSpeakingTopics: TutorialTopic[] = [
  {
    id: 'ps-stage-fear',
    category: 'Public Speaking',
    title: 'Overcoming Stage Fear & Nervousness',
    difficulty: 'Beginner',
    theory: [
      'Stage fear, or "glossophobia," is rooted in your amygdala—the brain\'s alarm center. When facing a crowd, your nervous system triggers the fight-or-flight response: adrenaline spikes, heart races, and your mind goes blank. This is NOT a weakness; it\'s your body preparing you to perform. The key is channeling that energy into confidence rather than panic.',
      'Neuroscience shows that preparation and controlled breathing deactivate the amygdala. When you practice deeply (not just once, but repeatedly), your brain builds neural pathways that feel automatic. Similarly, box breathing (inhale 4, hold 4, exhale 4, hold 4) activates your parasympathetic nervous system, calming the panic response. Studies show speakers who practice breathing exercises feel 40% less anxiety.',
      'Professional speakers don\'t eliminate nerves—they reframe them. Anxiety and excitement share identical physical symptoms; your brain interprets them based on your mindset. If you think "I\'m nervous," your body tenses. If you think "I\'m excited," the same adrenaline fuels performance. Reframe fear as fuel: "I care about this. My energy shows passion." With repetition, this becomes second nature.'
    ],
    code: `Before you speak:
1. BREATH WORK (2 min)
   Box breathing: Inhale (4) → Hold (4) → Exhale (4) → Hold (4)
   Repeat 5 times. Your heart rate drops.

2. POWER POSE (1 min)
   Stand tall, arms raised. Testosterone rises, cortisol falls.
   Say aloud: "I've prepared. I know this. I'll do great."

3. GROUND YOURSELF (30 sec)
   Feel your feet on the floor. Notice 3 things you see, 2 you hear, 1 you feel.
   You're present, not spinning in fear.

Your opening line is your anchor. Practice it 10 times. Once you nail the
first 30 seconds, the rest flows.`,
    notes: [
      'Nervousness peaks in the first 90 seconds; it drops after that',
      'Arrive early to walk the stage—familiarity builds confidence',
      'Dehydration worsens anxiety; drink water before you go on'
    ],
    xp: 100,
    practice: {
      title: 'Record Your Opening Under Pressure',
      description: 'Set a timer for 2 minutes. Go through your breath-work and power-pose ritual, then record yourself delivering your opening line 3 times. Watch it back. The first take will feel awkward; the third will feel more natural. This is how your brain learns confidence.',
      startCode: `Your opening: "Good morning. My name is ___. Today I want to talk about ___."

Ritual:
- Box breathing (5 rounds)
- Power pose (30 sec)
- Speak clearly, make eye contact with camera

Record all 3 takes without stopping. Don't self-judge mid-take.`,
      hint: 'Focus on clarity and presence, not perfection. Nervousness shows in rushed speech—deliberately slow down. Your pace should feel slower than normal.',
      solution: `What worked: Deliberate breath-work activated calm. The power pose
created physical confidence. By take 3, your nervous system adapted.
What to notice: Did your voice get steadier? Your posture taller?
That's your confidence building. In a real audience, it's even stronger
because the environment is familiar and your preparation is evident.`,
      expectedOutput: '3 video takes showing progression from initial nervousness to composed delivery'
    }
  },
  {
    id: 'ps-structure',
    category: 'Public Speaking',
    title: 'Structuring a Talk: Hook, Body, Close',
    difficulty: 'Beginner',
    theory: [
      'Great talks follow the "rule of three": opening hook (capture attention in 15 seconds), body (deliver 3 key ideas), close (reinforce the central message). Your audience has an 8-second attention span—if you don\'t hook them immediately, they check their phones. A hook is not "Hi, I\'m here to talk about X"; it\'s a question, a surprising fact, a personal story, or a bold claim that makes them lean in.',
      'The body should contain exactly three main ideas. Why three? Humans remember things in threes: "Life, liberty, and the pursuit of happiness"; "Stop, drop, and roll." Each idea gets 5-7 minutes, with a transition line that bridges to the next. Transitions guide the audience through your logic: "We\'ve covered *problem*. Now let\'s explore *solution*. Finally, I\'ll show you *action*."',
      'The close is not "Thank you for listening." It\'s a call to action or a memorable takeaway. Repeat your central message in a fresh way, tell a final micro-story, or challenge them to do something. End with a clear, confident pause before you leave the stage—silence is powerful. The last words your audience hears stay longest in their memory.'
    ],
    code: `TALK STRUCTURE TEMPLATE (15–20 min talk)

OPENING (1–2 min) — THE HOOK
  "Last week, I failed. Here's why it taught me the best lesson of my life."
  Or: "Did you know 90% of students skip their weak subjects?"
  Rule: Hook in the first 15 seconds.

BODY (12–15 min) — THREE IDEAS
  Idea 1: The Problem (5 min)
    "Most students feel lost in Maths. Why?"
    Explain. Use data or story.

  Transition: "Understanding the problem is step one. Step two is action."

  Idea 2: The Solution (5 min)
    "Here are 3 daily habits that fix this."
    Explain each. Give examples.

  Transition: "We know what works. Now, how do we stay consistent?"

  Idea 3: The Framework (5 min)
    "Use the 30-day challenge. Commit to 15 minutes daily."
    Explain how. Make it concrete.

CLOSE (1–2 min) — THE CALL
  "By next week, I want each of you to spend 15 minutes on
  your weakest subject. Text me your progress. Let's build this together."

  Pause. Exit with confidence.`,
    notes: [
      'Each main idea needs a sub-headline; write them down before you speak',
      'Transitions are glue—without them, talks feel scattered',
      'Practice timing; 300 words ≈ 2 minutes of natural speech'
    ],
    xp: 150,
    practice: {
      title: 'Outline Your 5-Minute Talk',
      description: 'Pick a topic you know well (e.g., "Why I love Maths" or "How to ace competitive exams"). Write a one-page outline following the hook-body-close structure. Then deliver it aloud and time yourself. Aim for exactly 5 minutes.',
      startCode: `Topic: _______________

HOOK (30 sec):
  [Write a question or surprising fact that grabs attention]

BODY—Idea 1 (1.5 min):
  Title: ___
  Key points:
  -
  -
  -

TRANSITION LINE: ___

BODY—Idea 2 (1.5 min):
  Title: ___
  Key points:
  -
  -
  -

TRANSITION LINE: ___

BODY—Idea 3 (1 min):
  Title: ___
  Key points:
  -
  -

CLOSE (30 sec):
  [Call to action or memorable takeaway]`,
      hint: 'Your hook should make someone stop scrolling. Not "I\'m here to tell you about..." but "Something unexpected happened that changed everything." Also, count: if your outline has more than 3 main ideas, cut it. Audiences remember 3. 4+, and they remember nothing.',
      solution: `Good structure:
  Hook → Grabs attention, signals the topic
  3 ideas → Each is distinct, builds on the last
  Transitions → Smooth, logical flow
  Close → Actionable, memorable

Bad structure:
  "So, let me tell you..." (no hook)
  Rambles through 6 ideas (too many)
  Ends with "Um, thanks for listening." (weak close)

Your outline is your safety net. Internalize it, but don't memorize
word-for-word—that sounds robotic. Know your three ideas deeply.
Let the words flow naturally.`,
      expectedOutput: 'One-page outline + timed 5-minute delivery'
    }
  },
  {
    id: 'ps-storytelling',
    category: 'Public Speaking',
    title: 'Storytelling to Engage an Audience',
    difficulty: 'Intermediate',
    theory: [
      'Stories activate your listener\'s brain differently than facts. When you cite data ("70% of students struggle with time management"), only their language processing centers activate. When you tell a story ("I stayed up until 3 AM, panic-studying the night before my exam, and I failed"), your listener\'s sensory and motor cortex light up. They feel the stress, the panic, the failure. Stories create emotional resonance; facts create information. Great speakers weave both: data supports the story\'s credibility.',
      'The best stories follow the classic arc: Setup (introduce a relatable character or situation), Conflict (a problem or choice), Resolution (how the character solved it), and Reflection (what this means for *your* audience). Indian audiences particularly respond to personal stories that show vulnerability—admitting a mistake or struggle makes you human, not a distant expert. Keep it concise: a compelling story is 90 seconds to 2 minutes, not 10.',
      'Use dialogue sparingly but powerfully. "I said, \'I don\'t understand.\' My teacher replied, \'Not understanding is the first step to learning.\'" is more engaging than "My teacher taught me that confusion is valuable." Audiences lean in when they hear voices—it\'s like a conversation between characters they\'re watching live.'
    ],
    code: `STORY FRAMEWORK

SETUP (15–20 sec):
  "Three years ago, I was convinced I was bad at Maths."
  [Introduce the character (you or someone relatable), the setting, the belief]

CONFLICT (30–40 sec):
  "I failed my first exam. Then my second. I wanted to quit.
  But my mother sat me down and asked, 'Do you want to stay scared,
  or do you want to try something different?'"
  [The turning point—a choice, realization, or challenge]

RESOLUTION (30–40 sec):
  "I started solving one problem a day—just one. In three months,
  my score doubled. I scored 95% in my board exam."
  [The outcome, the action that worked, the win]

REFLECTION (10–15 sec):
  "Here's what I learned: Maths isn't a gift you're born with.
  It's a skill you build, one problem at a time. That's why I'm here
  today—to show you that skill is in your hands."
  [Bridge to your audience's life—why this matters to *them*]

Total: 2 minutes. Powerful, memorable, actionable.`,
    notes: [
      'Vulnerability beats expertise; admit a struggle or mistake early',
      'Use pauses after dialogue—let the words sink in',
      'End stories with a "so what?" statement that ties to your talk\'s theme'
    ],
    xp: 200,
    practice: {
      title: 'Craft & Deliver Your Origin Story',
      description: 'Tell the story of how you learned something important (overcoming a fear, mastering a skill, changing a belief). Follow the setup-conflict-resolution-reflection arc. Record yourself telling it. Aim for exactly 2 minutes.',
      startCode: `SETUP:
  When did you first struggle? What did you believe about yourself?

CONFLICT:
  What was the turning point? Quote a conversation or moment.

RESOLUTION:
  What action did you take? What changed?

REFLECTION:
  What does this teach your audience about their own potential?`,
      hint: 'The best stories are NOT about victory alone—they\'re about the gap between who you thought you were and who you became. Show the struggle, not just the triumph. Struggle is relatable. Triumph alone is intimidating.',
      solution: `A strong origin story:
  ✓ Specific details ("I failed Maths in Class 8, not just 'I struggled'")
  ✓ Dialogue that feels real
  ✓ A clear change (before → after)
  ✓ A bridge to the audience ("So when you feel stuck, remember...")

Weak version:
  ✗ Too focused on the end result ("I\'m now topping my class")
  ✗ No vulnerability ("I was always confident")
  ✗ Unclear connection to listeners ("This is my story, moving on...")

Your story is your credibility. It says: "I\'ve been where you are.
I learned. You can too."`,
      expectedOutput: '2-minute video of your origin story, following the arc'
    }
  },
  {
    id: 'ps-body-language',
    category: 'Public Speaking',
    title: 'Body Language, Eye Contact & Gestures',
    difficulty: 'Intermediate',
    theory: [
      'Your body communicates before your mouth opens. Research shows that 55% of communication is non-verbal—what people see overrides what they hear. Slouching says "I don\'t believe in myself." An open stance (shoulders back, chest open) says "I\'m confident." Eye contact signals trust; avoiding eyes signals doubt. When you stand rooted in one spot, nervous energy leaks into your voice. Strategic movement—walking toward the audience during an important point—creates connection and channels nervous energy into presence.',
      'Gestures should feel natural, not choreographed. Avoid "canned" movements (clasping your hands, pacing like a metronome, or pointing mechanically). Instead, gesture as you\'d gesture in a conversation with a friend. If you\'re explaining "three steps," your hand naturally counts them out. If you\'re describing something large, your arms expand. Your hands follow your words. This is called "gesture congruence," and audiences perceive it as authentic.',
      'Eye contact isn\'t staring intensely; it\'s a conversation. Look at one person for 3–4 seconds, move to another section of the room, hold there, move again. Never stare at one spot (like the back wall) the whole time. In a virtual presentation, look at the camera lens, not the screen of faces—this creates the illusion of direct eye contact. For in-person audiences, include people in different parts of the room: front-left, center, back-right. Everyone feels seen.'
    ],
    code: `BODY LANGUAGE CHECKLIST

STANCE:
  ✓ Feet shoulder-width apart (stable, not rigid)
  ✓ Weight balanced (not leaning on one leg)
  ✓ Shoulders back (open, not hunched)
  ✓ Chest slightly forward (confident, not aggressive)

MOVEMENT:
  ✓ Move with PURPOSE—toward audience for intensity
  ✓ Pause when speaking (standing still = confidence)
  ✓ Walk slowly (rushing shows nervousness)
  ✓ Avoid pacing side-to-side (it distracts)

GESTURES:
  ✓ Hands above the waist (visible, not hidden)
  ✓ Gesture naturally as you speak (sync with words)
  ✓ Avoid self-touching (wringing hands, crossed arms)
  ✓ Occasional hand-on-chest (sincerity)

EYE CONTACT:
  ✓ 3–4 seconds per person, then move
  ✓ Scan the room: left → center → right
  ✓ Never stare at slides or notes
  ✓ For virtual: look at camera, not the screen

FACE:
  ✓ Smile (warmth, approachability)
  ✓ Raise your eyebrows when emphasizing (engagement)
  ✓ Open your mouth fully when speaking (clarity)`,
    notes: [
      'Film yourself presenting; you\'ll notice habits you didn\'t know you had',
      'Avoid pockets (hands disappear); avoid holding a pen (nervous fidgeting)',
      'In a large audience, they\'re watching your *upper half*—posture matters most'
    ],
    xp: 200,
    practice: {
      title: 'Film Yourself: Gesture & Eye Contact',
      description: 'Record a 2-minute segment of your talk. Focus on three things: (1) Do your gestures match your words? (2) Are you making "eye contact" with the camera? (3) Is your stance open and confident? Watch it back and note one improvement for each area.',
      startCode: `CHECKLIST while recording:
  [ ] Stand tall, shoulders back
  [ ] Move with purpose (not pacing)
  [ ] Gesture naturally (hands visible)
  [ ] Look at camera (simulating eye contact)
  [ ] Smile when appropriate

CONTENT: Pick any 2-minute segment from your talk.`,
      hint: 'The hardest part: feeling like your gestures are "too much" when they\'re actually perfect. In real life, bigger reads on camera/in front of audiences. If it feels slightly over the top, it\'s probably just right.',
      solution: `What to evaluate:
  ✓ Gestures sync with words? (Point when saying "first," expand hands when saying "huge")
  ✓ Do you look at camera regularly? (Every 5–10 seconds, not constant staring)
  ✓ Posture? (Shoulders back, chest open, not leaning)
  ✓ Unnecessary movement? (Pacing, fidgeting with hands, weight shifting)

Pick ONE thing to improve. Ignore the rest for now. Mastery is incremental.`,
      expectedOutput: '2-minute video with notes on three body-language improvements'
    }
  },
  {
    id: 'ps-voice-delivery',
    category: 'Public Speaking',
    title: 'Voice Mastery: Pace, Pause, Pitch & Projection',
    difficulty: 'Intermediate',
    theory: [
      'Your voice is an instrument. Pace is speed; most nervous speakers rush (150+ words/min when 120–140 is ideal). Slowing down signals confidence and gives your audience time to absorb. Pause is silence—it\'s your most powerful tool. After an important point, pause for 2–3 seconds. Silence feels awkward to *you*, but your audience experiences it as intentional, powerful. "Great minds pause" is not just a saying; it\'s neuroscience. Pause activates reflection in the listener\'s brain.',
      'Pitch is the frequency of your voice. A monotone (unchanging pitch) bores audiences. Vary your pitch: go lower when making a serious point, higher when expressing enthusiasm. Women often raise pitch at the end of sentences (making statements sound like questions); men often drop pitch unnaturally (sounding overly authoritative). Natural variation—as if you\'re having a genuine conversation—draws people in. Projection is volume without shouting. Use your diaphragm (not your throat) to project from your core. A strong, steady voice commands a room better than a loud, tense one.',
      'Resonance (where the sound originates) matters. Throat-based speech is thin and tires quickly. Chest-resonant speech is rich and carries further. Place your hand on your chest and hum; feel the vibration? That\'s where your voice should come from. Practice diaphragmatic breathing: inhale deeply, expand your belly (not chest), and speak on the exhale. This builds stamina, reduces tension, and improves vocal quality by 40% in the first week of practice.'
    ],
    code: `VOICE CHECKLIST & DRILLS

PACE (120–140 words/min):
  Slow: "I want you to hear every word of this next part."
  Normal: Your default conversational speed.
  Fast: "Let me get through this example quickly."

  Drill: Read 100 words aloud. Time yourself. Aim for 45–50 sec.
  (That's ~120 wpm; feels slightly slower than normal but sounds perfect.)

PAUSE:
  "Today, we're going to break a fundamental barrier." [PAUSE 2 sec]
  "That barrier is doubt." [PAUSE 1 sec]

  Drill: Record yourself. Listen for silence. Add pauses after:
  - Important statements
  - Questions (let them think)
  - Transitions between ideas

PITCH VARIETY:
  Low pitch: "This is serious. Pay attention."
  High pitch: "This is exciting! You'll love this!"
  Natural: "Let me explain how this works."

  Drill: Say "Hello" five ways—angry, curious, sad, excited, neutral.
  Feel how pitch shifts naturally with emotion.

PROJECTION (from diaphragm):
  Hand on chest. Hum. Feel vibration.
  Now speak from that spot, not your throat.
  "I'm ready to lead this team." (Projects naturally, sounds powerful.)`,
    notes: [
      'Filler words ("um," "uh," "like," "you know") destroy credibility—replace them with pauses',
      'Breathe deeply between sentences; shallow breathing = tension in voice',
      'Record yourself weekly; your ear calibrates to improvement over time'
    ],
    xp: 250,
    practice: {
      title: 'Voice Variation Exercise: One Paragraph, Three Deliveries',
      description: 'Pick a 30-second paragraph from your talk. Record three versions: (1) too fast & monotone (bad), (2) with pauses and pitch variation (good), (3) with diaphragm projection and intentional pacing (excellent). Compare the three. Which feels most compelling?',
      startCode: `PARAGRAPH to deliver three ways:
  "The most important skill you'll learn in school isn't Maths or English.
  It's persistence. I learned this the hard way. I failed. Many times.
  But each failure taught me something. And eventually, I succeeded.
  The path wasn't straight. But it was worth it."

VERSION 1 (Too Fast & Monotone):
  [ ] Speak in one flat pitch
  [ ] No pauses (rush through)
  Record it. You'll hear how bad it is. (This is learning!)

VERSION 2 (Good: Pace + Pauses):
  [ ] Slow to 120 wpm
  [ ] Pause after "persistence," after "hard way," after "Many times"
  [ ] Vary pitch slightly

VERSION 3 (Excellent: Full Mastery):
  [ ] Diaphragm breathing (chest vibration)
  [ ] Intentional pauses (2–3 sec after key points)
  [ ] Pitch variation (lower at "persistence," higher at "succeeded")
  [ ] Project from core (not throat)`,
      hint: 'The pauses will feel impossibly long to you. They\'re not. In a real audience, they feel just right—even powerful. Trust the pause.',
      solution: `Comparison:
  Version 1: Feels rushed, anxious, hard to follow. Audience loses interest.

  Version 2: Clear, thoughtful, easier to follow. Good.

  Version 3: Feels intentional, powerful, memorable. Your audience is hanging
  on every word. Silence amplifies meaning. Pitch variation mirrors emotional
  truth. Projection shows confidence. This is presence.

Use Version 3 as your template. It's not perfection—it's authenticity +
technique. The technique gets out of the way, and your message comes through.`,
      expectedOutput: '3 audio/video recordings showing progression of vocal delivery'
    }
  },
  {
    id: 'ps-slides',
    category: 'Public Speaking',
    title: 'Designing Effective Slides: Less Text, More Visuals',
    difficulty: 'Intermediate',
    theory: [
      'The biggest mistake: slides packed with bullet points. Your audience reads OR listens to you; they can\'t do both well. If your slide has 10 lines of text, they\'re reading while you\'re talking, and neither sinks in. The rule: one idea per slide, maximum 5 words per bullet. Slides should be visual anchors—images, diagrams, or bold single statements—not transcripts. Steve Jobs popularized this: a single striking image or three words on a black background. Your audience remembers the image and your voice together, not the text.',
      'Color, font size, and whitespace matter. Dark text on light background is readable; light text on dark is readable. Avoid red on green (colorblind audiences won\'t see the distinction). Use one font family (serif OR sans-serif, not both). Make fonts large: even the back row should read it comfortably. Whitespace (empty space) is not wasted space—it lets the eye rest and focus on what\'s important. A slide with 1 image and 3 words, with lots of white space, is infinitely more powerful than a text-heavy slide.',
      'Transitions and animations distract unless purposeful. Flying text, spinning diagrams, and clinking sounds are remnants of 2005. Modern slides use simple fades or no transitions at all. Animation can emphasize: a line graph that builds bar-by-bar shows progression. An arrow that points to a key detail directs attention. Avoid animation for decoration. Your voice is the presentation; slides support it.'
    ],
    code: `SLIDE DESIGN RULES

TEXT:
  ✓ One main idea per slide
  ✓ Maximum 5 words per bullet
  ✗ Don't write your speech on slides
  ✗ Avoid full sentences

  Bad: "The three reasons students fail Maths are lack of practice,
         poor concepts, and test anxiety."
  Good: Slide 1 — "Reason 1: Practice"
        Slide 2 — "Reason 2: Concepts"
        Slide 3 — "Reason 3: Anxiety"
  (You explain each one while the slide shows the title.)

VISUALS:
  ✓ One large, high-quality image per slide (when possible)
  ✓ Charts with clear labels
  ✓ Icons to break up text
  ✗ Clipart or low-res images
  ✗ Decorative graphics that don't add meaning

COLOR:
  ✓ 2–3 colors max (brand color, accent, neutral)
  ✓ High contrast (dark on light or light on dark)
  ✗ Rainbow slides (looks unprofessional)
  ✗ Red & green together (not accessible)

FONT:
  ✓ Sans-serif (Helvetica, Arial, Verlag) for readability
  ✓ 28pt+ for body, 40pt+ for titles
  ✓ One font family throughout
  ✗ More than 2 font styles (bold, italic, underline)

TRANSITIONS:
  ✓ Simple fade or none
  ✗ Spinning, flying, or clinking sounds

LAYOUT:
  ✓ Whitespace (empty area lets eyes rest)
  ✓ Left-align text (center-aligned is harder to read)
  ✓ 16:9 widescreen format`,
    notes: [
      'Less is more; every element should earn its place on the slide',
      'Test your slides from the back of the room; if you can\'t read it, neither can they',
      'Use speaker notes (not visible to audience) to keep detailed talking points'
    ],
    xp: 200,
    practice: {
      title: 'Redesign: From Text-Heavy to Visual',
      description: 'Take a slide from an old presentation (yours or someone else\'s). If it has 8+ bullet points or dense text, redesign it. Replace text with one bold title, one striking image, and max 5 words. Show the before & after.',
      startCode: `BEFORE (Text-Heavy):
  "Key factors in exam success include time management, understanding
  core concepts, practicing regularly, getting adequate sleep, staying
  motivated, and managing stress."

AFTER (Visual):
  Slide title: "6 Factors: Success"
  Image: A student studying peacefully
  Text: "Manage time. Build concepts. Practice daily.
         Sleep well. Stay motivated. Manage stress."

  OR even better:
  Slide title: "Exam Success"
  Large image: Student at desk, confident, books organized
  (You explain the 6 factors verbally while the image reinforces presence.)`,
      hint: 'The temptation: put all information on slides so you don\'t forget anything. Resist it. Write detailed notes for yourself. Show your audience only the essence. Your voice delivers the depth.',
      solution: `Before: Audience reads, gets overwhelmed, forgets everything.

After: Audience sees a clear visual, hears your explanation,
remembers both. That\'s the goal.

Good slide design psychology:
  ✓ Image + Voice = Memory (dual encoding)
  ✓ Text-only = Cognitive overload (forgetting)
  ✓ Whitespace = Breathing room (focus)
  ✓ Simple design = Professional (trustworthy)`,
      expectedOutput: 'Before & after slide comparison showing reduction of text and addition of visual'
    }
  },
  {
    id: 'ps-qa-difficult',
    category: 'Public Speaking',
    title: 'Handling Q&A and Difficult Questions',
    difficulty: 'Advanced',
    theory: [
      'Q&A is where confidence is tested. Most speakers fear tough questions, so they rush through answers or dodge. The paradox: handling a difficult question brilliantly builds more credibility than a flawless talk. When someone asks "But what about the exception?" and you thoughtfully explore it, the audience trusts you. You\'re not defensive; you\'re curious. Start with: "That\'s a great question. Let me think through this..." This buys 3 seconds and signals that you take them seriously.',
      'Three types of questions: (1) Clarification ("Can you explain what you meant by X?")—simple, welcome. (2) Challenge ("But isn\'t your argument flawed because...?")—requires depth, not defensiveness. (3) Off-topic ("How does this relate to climate change?")—requires polite redirection. For clarifications, answer directly. For challenges, acknowledge the validity, answer honestly, and avoid saying "I don\'t know" unless true; instead say "That\'s outside my expertise, but here\'s what I think..." For off-topics, smile and redirect: "That\'s interesting, but let\'s stay focused on [original topic]. I\'m happy to chat about that afterward."',
      'Difficult people are rare but loud. Some ask aggressive questions ("Isn\'t this obvious?" or "I disagree with everything you said"). Don\'t match their tone. Stay calm, address the *question* not the person. "I hear your concern. Here\'s how I\'d respond..." This disarms them and shows your audience you\'re respectful, even under pressure. Never say "That\'s a stupid question" or dismiss someone. If truly stumped, honesty wins: "I don\'t have an answer right now, but I\'m curious. Can we chat after?" People respect authenticity over faked expertise.'
    ],
    code: `Q&A RESPONSE FRAMEWORK

LISTEN (90% of handling is active listening):
  [ ] Don\'t interrupt
  [ ] Nod while they speak (shows you\'re engaged)
  [ ] Repeat the question back: "So you\'re asking about..."
      (Confirms you understood, buys thinking time)

PAUSE (The 2-second rule):
  After they finish, pause for 1–2 sec before answering.
  (This feels natural to them; gives you thinking time.)

RESPOND:
  For Clarification:
    "Great question. [Answer directly]. Does that clarify?"

  For Challenge:
    "I hear your point. Here\'s how I see it: [Thoughtful answer].
    You raise a valid concern, and I appreciate you pushing back."

  For Off-Topic:
    "That\'s interesting, and I\'d love to explore it, but let\'s focus
    on [original topic] for now. Let\'s chat one-on-one after?"

CLOSE:
  "Thanks for asking that. It\'s an important point." (Validate them.)

DIFFICULT QUESTIONER:
  Stay calm. Address the QUESTION, not the tone.
  "I hear your skepticism. Here\'s my response: ..."
  (Never match aggression; it escalates.)

IF TRULY STUMPED:
  "That\'s a great question, and I don\'t have a complete answer
  right now. I\'d like to think on it and follow up with you.
  Can we connect after?" (Honesty > faked expertise.)`,
    notes: [
      'Repeating the question also gives you 10 extra seconds to think',
      'People remember how you made them *feel*, not what you said; respect builds loyalty',
      'Admit what you don\'t know; people trust humility over arrogance'
    ],
    xp: 300,
    practice: {
      title: 'Mock Q&A: Difficult Questions',
      description: 'Have a friend (or record yourself) ask you 5 challenging questions related to your talk: 2 clarifications, 2 challenges, 1 aggressive/off-topic. Answer each one, recording your responses. Grade yourself on: Did you stay calm? Did you validate them? Did you give a thoughtful answer?',
      startCode: `QUESTIONS to practice with:

Clarification:
  1. "Can you give a concrete example of what you mean by [key term]?"
  2. "How does this apply to students in rural areas?"

Challenge:
  3. "But doesn\'t this approach ignore [counterpoint]?"
  4. "How do you respond to critics who say [opposite view]?"

Aggressive/Off-Topic:
  5. "Isn\'t this just common sense? Why are we wasting time on this?"

RESPONSE TEMPLATE for each:
  [ ] Pause (1–2 sec to think)
  [ ] Repeat the question ("So you\'re asking about...")
  [ ] Answer (2–3 sentences, direct)
  [ ] Validate ("That\'s a fair point." or "I appreciate the challenge.")`,
      hint: 'The hardest part: staying calm when questioned. Remember: they\'re challenging your *idea*, not you. Separate the two. "I hear your skepticism about the method" is different from "You\'re wrong." You\'re building your credibility by handling it well.',
      solution: `Good responses:
  ✓ Pause before answering (shows confidence, not rushing)
  ✓ Repeat their question (shows respect)
  ✓ Answer clearly (2–3 sentences max)
  ✓ Validate their concern ("I appreciate that perspective")
  ✓ Stay calm, never defensive

Bad responses:
  ✗ Interrupt or dismiss them
  ✗ Ramble (sign of nervousness)
  ✗ Get defensive ("That\'s not fair")
  ✗ Fake confidence ("Obviously...")

Strong Q&A moves you from "good speaker" to "leader." You\'re not just
delivering information; you\'re in dialogue with your audience. That\'s presence.`,
      expectedOutput: '5 recorded Q&A responses with self-grading on calmness, clarity, and validation'
    }
  },
  {
    id: 'ps-virtual-presentation',
    category: 'Public Speaking',
    title: 'Delivering Online & Virtual Presentations',
    difficulty: 'Intermediate',
    theory: [
      'Online presentations feel different: no live audience energy, no physical space, everyone\'s face is thumbnail-sized. Your presence must be 1.5x stronger to compensate. You\'re not just looking at the camera; you\'re connecting with individuals on tiny screens. Sit closer to the camera (18 inches, not 3 feet away), fill the frame from shoulders up, and look *directly* at the lens when emphasizing important points. This creates the illusion of eye contact. When reading notes, glance at them below the camera, not to the side—viewers notice the eye direction shift.',
      'Tech setup matters. Test audio (headphones, not speakers—speakers echo); video quality (1080p, good lighting from the front); internet speed (5 Mbps minimum). A lagging presentation destroys credibility. Have a backup: if your screen share fails, you can pivot to presenting without slides. Worst case: "Let me describe this visually." Be flexible. On the human side, mute notifications (Slack, email, phone), close browser tabs, clear your desk of clutter. Your background is part of your presentation; it should look professional or intentionally minimal.',
      'Energy is higher in virtual settings because the screen magnifies small movements. Sit upright, gesture as you normally would (even though only your upper half is visible), and smile—it comes through on screen even in a low-resolution feed. Take pauses as you would in-person; silence on a video call feels awkward but is just as powerful. Most importantly: look at the camera lens, not the faces on your screen. If you look at the gallery view, your eyes appear to be looking *down*, not connecting. For large groups, this might feel unnatural, but it\'s the only way to create genuine eye contact online.'
    ],
    code: `VIRTUAL PRESENTATION SETUP

CAMERA & FRAMING:
  ✓ Camera at eye level (use a laptop stand if needed)
  ✓ Sit 18–24 inches from camera (chest to head visible)
  ✓ Look at lens (not at faces on screen) during key points
  ✓ Sit upright (slouching reads as disinterested)
  ✓ Have a blank or professional background
  ✗ Don\'t sit too close (looming, uncomfortable)
  ✗ Don\'t have camera pointing up (unflattering angle)

AUDIO:
  ✓ Use headphones (eliminates echo)
  ✓ Test microphone before starting
  ✓ Sit away from noisy HVAC/fans
  ✗ Don\'t use built-in laptop mic (thin, echoing)

ENVIRONMENT:
  ✓ Mute Slack, email, calendar notifications
  ✓ Close unnecessary browser tabs
  ✓ Have water within reach
  ✓ Clear desk of clutter
  ✓ Good lighting from front (avoid backlighting)
  ✗ Don\'t multitask (text, email, chat)

PRESENTATION:
  ✓ Test screen share beforehand
  ✓ Have backup plan (can you present without slides?)
  ✓ Use slides sparingly (already on a screen; they don\'t need more text)
  ✓ Pause frequently (virtual audiences need processing time)
  ✓ Engage with chat/Q&A (acknowledge comments: "Great point in the chat...")
  ✗ Don\'t present with a dark screen (boring, low energy)

DELIVERY:
  ✓ Gesture naturally (even if only visible from shoulders up)
  ✓ Maintain steady eye contact with lens
  ✓ Speak slightly slower than in-person (video compresses pace)
  ✓ Smile (reads as warmth and confidence)
  ✓ Take pauses (silence is powerful, not awkward)`,
    notes: [
      'Check your internet speed before presenting; lag destroys flow',
      'Virtual presentations are MORE exhausting than in-person—you\'re concentrating on the lens, not moving around the stage',
      'Record your session (if allowed) for people in different time zones'
    ],
    xp: 250,
    practice: {
      title: 'Mock Virtual Presentation',
      description: 'Set up your camera, lighting, and slides as if you\'re presenting to a real audience. Record a 3-minute section of your talk. Then watch it back. Did you look at the camera? Was your posture open? Did you gesture naturally? Could a remote audience feel your energy?',
      startCode: `SETUP CHECKLIST:
  [ ] Camera at eye level
  [ ] Good lighting (front-facing, not backlit)
  [ ] Headphones in (so you hear yourself clearly)
  [ ] Slides ready (or at least know your talking points)
  [ ] Phone on silent
  [ ] Close Slack, email, etc.

RECORD 3 minutes of your talk.

PLAYBACK: Ask yourself:
  [ ] Did I look at the camera? (Eyes on lens, not down or away)
  [ ] Posture? (Sitting up, chest visible, engaged)
  [ ] Gestures? (Natural, visible in frame, not too small)
  [ ] Pacing? (Speaking slowly enough for remote viewers)
  [ ] Energy? (Do I sound excited or flat?)
  [ ] Pauses? (Intentional, not filled with "um")`,
      hint: 'On video, you look more tired and speak more quickly than you feel. Slow down 20%. Smile more. It translates better on camera.',
      solution: `What works online:
  ✓ Steady eye contact with camera (creates intimacy, connection)
  ✓ Open posture visible in frame (confidence, engagement)
  ✓ Intentional pauses (allows video processing, builds tension)
  ✓ Clear audio, no echo (professionalism)
  ✓ Minimal screen clutter (focus is on YOU, the presenter)

What doesn\'t work:
  ✗ Eyes down (looking at chat, faces, or notes)
  ✗ Slouching (disinterest, low energy)
  ✗ Constant motion (distracting, nervous energy)
  ✗ Soft voice (people unmute to hear you; frustrating)
  ✗ Packed slides with text (screen fatigue)

Virtual is an art form. It\'s not "in-person through a camera."
It\'s a distinct medium. Master it, and you can reach audiences worldwide.`,
      expectedOutput: '3-minute recorded virtual presentation with self-evaluation notes'
    }
  },
  {
    id: 'ps-practice-30day',
    category: 'Public Speaking',
    title: 'Practice Methods & 30-Day Improvement Plan',
    difficulty: 'Beginner',
    theory: [
      'Deliberate practice—focused, repetitive training with feedback—is the only path to mastery. Speaking 100 times poorly teaches you nothing; speaking 10 times with intentional feedback teaches you 10x more. The 10,000-hour rule (popularized by Malcolm Gladwell) is actually: 10,000 hours of *deliberate* practice. For public speaking, most people need 200–300 hours (about 50–100 talks) to feel genuinely confident. That sounds daunting, but with structured daily practice, you can log 50 hours in 6 months.',
      'The most effective practice method is recorded self-review. Speak, record, watch, note one improvement, repeat. Neuroscience shows that watching yourself activates the same learning pathway as learning from a coach. Your brain registers the mismatch between your intention ("I\'ll make eye contact") and reality ("I looked down twice"), and adjusts. This feedback loop accelerates learning by 5x compared to just practicing without reflection. Join a club or group (Toastmasters is famous, but local speaking groups exist) where you give talks monthly and receive structured feedback from an audience and experienced speakers.',
      'Consistency beats intensity. 15 minutes daily is better than 2 hours once a week. Daily practice builds neural pathways; weekly practice maintains them but doesn\'t deepen them. The 30-day plan below is aggressive but achievable: one deliberate daily practice, one talk attempt per week. By day 30, you\'ll have given 4 talks, recorded dozens of practice videos, and felt tangible progress. The confidence you build isn\'t just about speaking—it\'s about showing up, being seen, and learning from every attempt.'
    ],
    code: `30-DAY PUBLIC SPEAKING BOOTCAMP

WEEK 1: FOUNDATION (Breathing & Grounding)
  Day 1–3: Daily breath work (box breathing, 5 min)
  Day 4–7: Record 3-minute spontaneous talk (no prep) every day
           Watch back; note your top habit to break
           By day 7: Give talk #1 to 1–3 friends

WEEK 2: STRUCTURE (Hook, Body, Close)
  Day 8–10: Outline your signature talk (15 min, hook-body-close)
  Day 11–14: Practice story craft (tell your origin story daily)
             Record daily to refine
             By day 14: Give talk #2 (same content, recorded)

WEEK 3: DELIVERY (Voice, Body Language, Energy)
  Day 15–17: Daily voice exercises (pause, pace, pitch practice)
  Day 18–21: Record yourself daily with focus on:
             - One gesture per sentence
             - One pause per minute
             - Eye contact with camera
             By day 21: Give talk #3 to a small audience

WEEK 4: MASTERY (Q&A, Slides, Virtual)
  Day 22–24: Mock Q&A (practice with friend asking tough questions)
  Day 25–28: Redesign slides; practice slide-free (just voice)
             Practice virtual delivery (camera, lighting, energy)
             By day 28: Give talk #4 (your best one)
  Day 29–30: Review all 4 talks; note progress
             Plan next month\'s focus

DAILY PRACTICE (Choose one):
  ✓ 5 min breath work + 10 min record-and-review
  ✓ 15 min story telling (craft a micro-story)
  ✓ 10 min voice drills (pace, pause, pitch)
  ✓ 5 min gesture practice (describe something with hands)

TRACKING:
  [ ] Daily practice log (what did you do? what improved?)
  [ ] Weekly talk attempt (even if just to phone camera)
  [ ] Monthly reflection (what habits changed? what\'s next?)`,
    notes: [
      'The first talk is always the hardest; by the 4th, it feels natural',
      'Join Toastmasters or a local Meetup speaking group (accountability + feedback)',
      'Track progress with before/after videos; you\'ll see improvement even if it feels slow'
    ],
    xp: 500,
    practice: {
      title: 'Start Your 30-Day Plan: Week 1 Commitment',
      description: 'Commit to one 15-minute daily practice for the next 7 days. Pick one focus (breath work, spontaneous speaking, or story craft). Log your practice each day and record one video. By day 7, deliver your first talk to a friend or camera. Document your starting point.',
      startCode: `WEEK 1 PLAN:

Daily Practice (15 min):
  [ ] Choose one: Breath work / Spontaneous talk / Story craft

Logging:
  Day 1: [Describe what you practiced. What felt hard?]
  Day 2: [What did you practice? What\'s one improvement?]
  Day 3: [Continue...]
  ...
  Day 7: [Final reflection before your first talk]

Talk #1 (End of Week 1):
  [ ] Record a 5-minute talk on any topic you know
  [ ] Send to a friend for feedback OR review yourself
  [ ] Note: What went well? What needs work?

PROGRESS MARKERS:
  ✓ Completed 7 daily practices (consistency)
  ✓ Delivered talk #1 (courage)
  ✓ Recorded feedback (reflection)`,
      hint: 'The biggest mistake: skipping daily practice because you "don\'t have time." 15 minutes is less time than you spend on social media. Guard it. Consistency is the difference between "I\'d like to be a better speaker" and "I\'m becoming a confident speaker."',
      solution: `After Week 1:
  ✓ Your nervous system adapted (less adrenaline spike)
  ✓ You spoke in front of someone (courage built)
  ✓ You got feedback (awareness of habit)
  ✓ You have a baseline (to measure progress against)

By Week 4:
  ✓ You\'ve given 4 talks (real experience)
  ✓ Your voice and delivery noticeably improved
  ✓ Your stage fright dropped 50%+ (because you\'re practiced)
  ✓ You know what to work on next (specificity)

The 30-day plan is a launchpad, not a finish line. After 30 days,
keep going. Join a group. Give talks monthly. In a year, you\'ll be
someone people ask for advice on public speaking. That\'s the power of
deliberate, daily practice.`,
      expectedOutput: 'Week 1 practice log + video of Talk #1 + self-feedback notes'
    }
  }
];
