import { TutorialTopic } from './types';

export const reasoningTopics: TutorialTopic[] = [
  {
    id: 'reason-intro-logical-reasoning',
    category: 'Logical Reasoning',
    title: 'Introduction to Logical Reasoning',
    difficulty: 'Beginner',
    theory: [
      'Logical reasoning is the process of using structured thinking to draw conclusions from given information. It forms the foundation of analytical problem-solving in competitive exams. Unlike mathematics, which deals with numbers, logical reasoning deals with patterns, relationships, and deductions based on statements and conditions.',
      'There are two main types of logical reasoning: inductive reasoning (drawing general conclusions from specific observations) and deductive reasoning (applying general rules to specific cases). Most competitive exam questions test deductive reasoning, where you must follow given statements to their logical conclusion.',
      'Success in logical reasoning depends on three skills: reading comprehension (understanding what is stated), pattern recognition (finding connections and trends), and systematic elimination (ruling out incorrect options). Practice developing these skills through consistent exposure to different question types.',
    ],
    code: `Example: All managers are leaders. Rajesh is a manager. Therefore, Rajesh is a leader.

Step 1: Identify the given statements (premises)
   - Statement 1: All managers are leaders
   - Statement 2: Rajesh is a manager

Step 2: Apply deductive logic
   - If all members of group A (managers) belong to group B (leaders)
   - And Rajesh is in group A (is a manager)
   - Then Rajesh must be in group B (is a leader)

Step 3: Conclusion
   - Rajesh is a leader (This conclusion must be true)`,
    output: 'Rajesh is a leader',
    notes: [
      'Always distinguish between "All", "Some", and "No" statements—they have different logical implications.',
      'Don\'t assume information not explicitly stated; stick only to what is given.',
      'Practice converting word problems into visual diagrams or symbols to avoid confusion.',
    ],
    xp: 50,
    practice: {
      title: 'Deductive Logic Puzzle',
      description: 'Apply logical deduction to find the correct conclusion from given statements.',
      hint: 'Map out the relationships: Is X in group A? Is group A part of group B? Therefore, is X in group B?',
      solution: 'All birds can fly. Sparrows are birds. Therefore, sparrows can fly. (Correct: The statement follows logically)',
      expectedOutput: 'Sparrows can fly',
    },
  },
  {
    id: 'reason-series-patterns',
    category: 'Logical Reasoning',
    title: 'Series & Pattern Recognition',
    difficulty: 'Intermediate',
    theory: [
      'Number and letter series questions test your ability to identify hidden patterns and predict the next term. These patterns can be arithmetic (addition/subtraction), geometric (multiplication/division), or based on positions in the alphabet or composite operations combining multiple rules.',
      'To solve series problems: (1) Calculate differences between consecutive terms, (2) Check if differences form a pattern themselves (second-order differences), (3) Look for multiplier patterns or alternating operations, (4) For letter series, convert to numbers (A=1, B=2, etc.), (5) Verify your pattern with at least 3 consecutive terms.',
      'Common patterns include: arithmetic progression (constant difference), geometric progression (constant ratio), Fibonacci-like sequences (each term is sum of previous two), prime numbers in sequence, or alternating operations. Some questions combine multiple patterns or use digit sums and products.',
    ],
    syntax: 'Pattern: Find the rule → Verify with multiple terms → Predict next term',
    code: `Number Series: 2, 5, 10, 17, 26, ?

Step 1: Calculate first differences
   2 → 5: difference = +3
   5 → 10: difference = +5
   10 → 17: difference = +7
   17 → 26: difference = +9

Step 2: Analyze the differences
   Differences: 3, 5, 7, 9 (increasing by 2 each time)
   This is an arithmetic pattern of differences

Step 3: Predict next difference
   Last difference: +9
   Next difference: +9 + 2 = +11

Step 4: Find the next term
   26 + 11 = 37

Answer: 37`,
    output: '37',
    notes: [
      'If first differences don\'t form a pattern, calculate second differences (differences of differences).',
      'For letter series, always convert to numbers: A=1, B=2, ..., Z=26.',
      'Some series alternate between two different patterns—identify which terms follow which rule.',
    ],
    xp: 75,
    practice: {
      title: 'Letter Series Completion',
      description: 'Identify the pattern in the letter series: A, C, F, J, O, ?',
      hint: 'Convert to numbers (A=1, C=3, F=6, J=10, O=15) and check the difference pattern.',
      solution: 'Differences: 2, 3, 4, 5, 6 (increasing by 1). Next: 15 + 6 = 21 = U. Answer: U',
      expectedOutput: 'U',
    },
  },
  {
    id: 'reason-coding-decoding',
    category: 'Logical Reasoning',
    title: 'Coding-Decoding',
    difficulty: 'Intermediate',
    theory: [
      'Coding-decoding questions involve substituting letters, numbers, or symbols according to a specific rule or cipher. The key is to identify the encoding rule by analyzing the given examples, then apply it consistently to decode or encode new information. Rules may involve position shifts (Caesar cipher), reversal, substitution tables, or mathematical operations.',
      'Common coding methods include: (1) Alphabet shift—each letter moves a fixed number of positions (A→D means shift by 3), (2) Reverse alphabet—A↔Z, B↔Y, etc., (3) Position-based coding—using a keyword or sequence, (4) Substitution cipher—each letter has a unique replacement, (5) Number-letter conversion—using numeric values.',
      'To decode: Analyze 2-3 examples to identify the rule, verify the rule works for all examples, apply it to the question. Always work systematically and double-check by encoding/decoding the original example to confirm your rule is correct.',
    ],
    syntax: 'Rule: Identify encoding method → Verify with examples → Apply to question',
    code: `Example: If BOOK is coded as CPPL, what is the code for DESK?

Step 1: Identify the coding rule
   B → C (shift by +1)
   O → P (shift by +1)
   O → P (shift by +1)
   K → L (shift by +1)
   Rule: Each letter shifts by 1 position in the alphabet

Step 2: Apply the rule to DESK
   D → E (shift by +1)
   E → F (shift by +1)
   S → T (shift by +1)
   K → L (shift by +1)

Step 3: Write the code
   DESK → EFTU

Answer: EFTU`,
    output: 'EFTU',
    notes: [
      'When a letter reaches Z, it wraps around to A (Z+1=A). Work with modular arithmetic if needed.',
      'Always verify your identified rule by testing it on the given example before applying it.',
      'Some questions use different rules for consonants and vowels—check each position carefully.',
    ],
    xp: 75,
    practice: {
      title: 'Reverse Alphabet Cipher',
      description: 'In a reverse alphabet code, A=Z, B=Y, C=X, etc. What is ZEBRA coded as?',
      hint: 'Z→A, E→V, B→Y, R→I, A→Z. Map each letter to its reverse position.',
      solution: 'Z(26)→A(1), E(5)→V(22), B(2)→Y(25), R(18)→I(9), A(1)→Z(26). Answer: AVYIZ',
      expectedOutput: 'AVYIZ',
    },
  },
  {
    id: 'reason-blood-relations',
    category: 'Logical Reasoning',
    title: 'Blood Relations',
    difficulty: 'Intermediate',
    theory: [
      'Blood relation questions test your understanding of family relationships and your ability to trace connections through multiple generations and sides (paternal/maternal, husband/wife). Each person has relationships through their parents, grandparents, siblings, cousins, and their spouse\'s family. The key is to build a family tree systematically and trace the path between two people.',
      'Basic relationships: Parents have children; siblings share parents; cousins share grandparents; aunts/uncles are siblings of parents; nephews/nieces are children of siblings. For each person, identify their generation, then trace upward to find common ancestors, then trace downward to reach the target person. Generation distance helps determine the relationship type.',
      'To solve: Draw a family tree based on given information, mark generations clearly, identify common ancestors, and trace the path. Be careful with gender-neutral relationships that could refer to multiple possibilities (e.g., "child" could be son or daughter). If asked "who is person X to person Y," trace from X to Y and identify the relationship name.',
    ],
    syntax: 'Method: Draw family tree → Identify generations → Trace path → Name relationship',
    code: `Problem: A is the mother of B. B is the sister of C. D is the father of C.
What is the relationship between A and D?

Step 1: Establish known relationships
   - A is the mother of B (A is parent, B is child)
   - B is the sister of C (B and C share same parents)
   - D is the father of C (D is parent, C is child)

Step 2: Build the family tree
   A (mother) and D (father) both have children together
         │
      ┌──┴──┐
      B    C
   (B is sister of C, both have same parents A and D)

Step 3: Determine relationship
   - A and D share children
   - A is the mother, D is the father
   - They are husband and wife (spouse relationship)

Answer: A is the wife of D (or D is the husband of A)`,
    output: 'Wife (or Spouse)',
    notes: [
      'Always draw a family tree—it prevents errors and makes complex relationships clear.',
      'When the problem mentions "M\'s wife\'s brother," trace step by step: M\'s wife → her brother.',
      'In complex problems, assign unique labels to each person and verify relationships multiple times.',
    ],
    xp: 75,
    practice: {
      title: 'Complex Family Tree',
      description: 'P is the son of Q. Q is the daughter of R. R is the mother of S. How is P related to S?',
      hint: 'Trace: P is son of Q. Q is daughter of R. So P is grandson of R. R is mother of S. R is both P\'s grandmother and S\'s mother.',
      solution: 'P\'s grandmother (R) is S\'s mother. Therefore, P\'s grandmother is S\'s mother, making P and S... cousins (if S is R\'s child who is not Q).',
      expectedOutput: 'Depends on whether S is Q\'s sibling; if yes, then P and S are cousins.',
    },
  },
  {
    id: 'reason-direction-sense',
    category: 'Logical Reasoning',
    title: 'Direction Sense',
    difficulty: 'Beginner',
    theory: [
      'Direction sense problems involve tracking movement through space using compass directions (North, South, East, West) and their combinations. You must follow a series of movements mentally or on paper and determine the final position, distance, or direction from the starting point. The key skill is maintaining orientation as you turn and move.',
      'Coordinate system: North is up (+Y), South is down (-Y), East is right (+X), West is left (-X). When facing a direction and turning, know the new facing direction: if facing North and turning right, now facing East. All movements and distances are relative to your current facing direction. Building a coordinate grid on paper is the most reliable approach.',
      'To solve: (1) Draw a grid with starting point at origin, (2) Note initial direction faced, (3) For each instruction, update position and/or direction, (4) Mark final position, (5) Calculate distance using Pythagorean theorem or Manhattan distance, (6) Determine direction from start to finish.',
    ],
    syntax: 'Method: Draw grid → Mark start → Update position per instruction → Find final position & direction',
    code: `Problem: Ravi starts facing North. He walks 10m forward, turns right,
walks 15m, turns right again, walks 10m. Where is he now and in which direction
is the starting point?

Step 1: Draw a grid and mark starting position
   Start: (0, 0), Facing: North (↑)

Step 2: Follow each movement
   Movement 1: Walk 10m North (facing North)
      Position: (0, 10), Facing: North

   Movement 2: Turn right (now facing East)
      Position: (0, 10), Facing: East

   Movement 3: Walk 15m East (facing East)
      Position: (15, 10), Facing: East

   Movement 4: Turn right (now facing South)
      Position: (15, 10), Facing: South

   Movement 5: Walk 10m South (facing South)
      Position: (15, 0), Facing: South

Step 3: Final position relative to start
   Final: (15, 0)
   Start: (0, 0)
   Distance: 15m East

Step 4: Determine direction of start from final position
   Start is 15m West of final position
   (Or: Final position is 15m East of start)

Answer: 15m East; Start is West`,
    output: '15m East of starting point',
    notes: [
      'Always draw a grid; mental tracking leads to errors in complex problems.',
      'Remember: Right turn means 90° clockwise, Left turn means 90° counter-clockwise.',
      'For diagonal distances, use Pythagorean theorem: distance = √(x² + y²).',
    ],
    xp: 60,
    practice: {
      title: 'Navigation Problem',
      description: 'Start at a point facing East. Walk 8m, turn left, walk 6m. What is the direct distance to the starting point?',
      hint: 'Draw grid: Start (0,0) facing East. After movements: (8, 6). Distance = √(8² + 6²) = √100 = 10m.',
      solution: 'Position after movement: (8, 6). Direct distance = √(64 + 36) = √100 = 10m.',
      expectedOutput: '10m',
    },
  },
  {
    id: 'reason-syllogisms',
    category: 'Logical Reasoning',
    title: 'Syllogisms & Venn Diagrams',
    difficulty: 'Intermediate',
    theory: [
      'A syllogism is a logical argument consisting of two premises and a conclusion. Each statement contains two groups (terms), and the conclusion is drawn by analyzing their overlap. Syllogisms use quantifiers: "All" (100% inclusion), "Some" (partial inclusion), and "No" (complete exclusion). The truth of a conclusion depends entirely on the logical structure, not real-world facts.',
      'Standard form: Major premise (All/Some/No X are Y), Minor premise (All/Some/No Y are Z), Conclusion (All/Some/No X are Z). Venn diagrams with overlapping circles effectively visualize these relationships. For "All X are Y," circle X is completely inside circle Y. For "Some X are Y," circles overlap partially. For "No X are Y," circles don\'t overlap. The conclusion must be true only if it\'s forced by the diagram.',
      'Key rule: Never assume anything beyond what\'s given. If premises say "Some X are Y" and "Some Y are Z," you cannot conclude anything about X and Z because the overlaps might not connect. Practice drawing precise Venn diagrams for each premise and checking if the conclusion region is shaded or fully within the premise constraints.',
    ],
    syntax: 'Method: Identify quantifiers (All/Some/No) → Draw Venn diagram → Check conclusion against diagram',
    code: `Syllogism:
Premise 1: All fruits are healthy
Premise 2: All apples are fruits
Conclusion: All apples are healthy

Step 1: Identify groups and quantifiers
   - Group A: Apples
   - Group B: Fruits
   - Group C: Healthy things
   Premise 1: Fruits ⊆ Healthy (All fruits are inside healthy)
   Premise 2: Apples ⊆ Fruits (All apples are inside fruits)

Step 2: Draw Venn diagram
              ╔════════════════════╗
              ║    Healthy Things  ║
              ║  ╔═════════════╗   ║
              ║  ║  Fruits     ║   ║
              ║  ║  ╔════════╗ ║   ║
              ║  ║  ║ Apples ║ ║   ║
              ║  ║  ╚════════╝ ║   ║
              ║  ╚═════════════╝   ║
              ╚════════════════════╝

Step 3: Evaluate conclusion
   Conclusion: All apples are healthy
   From diagram: Apples are inside Healthy ✓
   Conclusion is VALID

Answer: The conclusion is valid`,
    output: 'Valid - Apples are inside Healthy region',
    notes: [
      '"All" means 100% inclusion. "Some" means at least one (possibly all). "No" means 0% overlap.',
      'If the conclusion is possible but not necessary based on premises, mark it as invalid (insufficient data).',
      'Watch for switched premises—the order of major and minor premises matters for traditional logic.',
    ],
    xp: 80,
    practice: {
      title: 'Syllogism Validity Check',
      description: 'Premise 1: Some singers are dancers. Premise 2: All dancers are athletes. Conclusion: All singers are athletes. Is this valid?',
      hint: 'Draw a Venn diagram. Singers overlap partially with dancers, and dancers are inside athletes. Not all singers are necessarily inside athletes.',
      solution: 'Invalid. Only some singers are dancers, so not all singers are inside the athletes circle. Some singers could be outside athletes.',
      expectedOutput: 'Invalid',
    },
  },
  {
    id: 'reason-seating-puzzles',
    category: 'Logical Reasoning',
    title: 'Seating Arrangements & Puzzles',
    difficulty: 'Advanced',
    theory: [
      'Seating arrangement questions require arranging people in specific positions based on given constraints. These are often the most complex reasoning questions because multiple constraints interact, and errors compound. There are typically two types: linear arrangements (people in a row) and circular arrangements (people around a table). Each constraint eliminates certain possibilities, and the correct solution must satisfy all constraints simultaneously.',
      'Strategy: (1) Draw a diagram (line or circle), (2) Identify all constraints and categorize them as fixed (person X sits at position Y) or relative (person X sits next to Y, or X sits to the left of Y), (3) Start with fixed constraints, (4) Apply relative constraints using logical elimination, (5) If needed, create multiple scenarios and test each against all constraints, (6) Verify the final arrangement satisfies every single constraint.',
      'For circular arrangements, handle left/right carefully: if people are numbered clockwise, "right" of position 1 is position 2, but position 1 is also to the "left" of the person on their right. Some puzzles combine seating with additional attributes (colors, ages, professions), requiring you to track multiple dimensions simultaneously.',
    ],
    syntax: 'Method: Draw arrangement → List all constraints → Apply constraints iteratively → Verify solution',
    code: `Problem: Four people (A, B, C, D) sit in a row.
Constraints: (1) A sits to the left of B
             (2) C sits to the right of D
             (3) B sits in the middle-right position (position 3)

Step 1: Place fixed positions
   Position: [_, _, 3:B, _]
   Positions: 1, 2, 3, 4

Step 2: Apply constraint 1 (A left of B, B at position 3)
   A must be at position 1 or 2
   Position: [_, _, 3:B, _]

Step 3: Apply constraint 2 (C right of D)
   Remaining people: C, D for positions 1, 2, 4
   C right of D means if D at position 1, C at 2 or 4
                   if D at position 2, C at 4

   Case 1: D at 1, A at 2, B at 3, C at 4 (C right of D ✓, A left of B ✓)
   Case 2: A at 1, D at 2, B at 3, C at 4 (C right of D ✓, A left of B ✓)

Step 4: Verify against all constraints
   Case 1: [D, A, B, C] ✓ All constraints satisfied
   Case 2: [A, D, B, C] ✓ All constraints satisfied

   If there's one more constraint to break the tie, use it.
   Otherwise, both are valid (check problem statement).

Answer: [D, A, B, C] or [A, D, B, C]`,
    output: '[D, A, B, C] or [A, D, B, C]',
    notes: [
      'Always work with a diagram; tracking position mentally in complex arrangements leads to errors.',
      'For multiple valid arrangements, carefully re-read the problem for additional constraints.',
      'In circular arrangements, remember that the leftmost and rightmost positions are neighbors.',
    ],
    xp: 100,
    practice: {
      title: 'Circular Seating Arrangement',
      description: 'Five people sit around a circular table. A sits between B and C. D sits opposite to E. Arrange them.',
      hint: 'In circular seating, opposite means directly across. Mark positions 1–5 clockwise. If D is at 1, E is at 3 or 4 (not exactly opposite in 5-person circle; assume equidistant).',
      solution: 'One valid arrangement (clockwise): A, B, D, E, C. (A between B and C: B-A-C; D and E separated by 2 people each.)',
      expectedOutput: 'A, B, D, E, C (or rotations/mirrors of this arrangement)',
    },
  },
  {
    id: 'reason-statements-assumptions',
    category: 'Logical Reasoning',
    title: 'Statements & Assumptions / Logical Deduction',
    difficulty: 'Intermediate',
    theory: [
      'Statements and assumptions questions test your ability to distinguish between facts (explicitly stated) and implied beliefs (assumptions). An assumption is an unstated belief that the speaker relies upon for their conclusion to be true. A logical deduction is a conclusion that must be true if the statement is true. Key difference: deductions are certain; assumptions are implicit beliefs that may or may not be true.',
      'To identify assumptions: (1) Read the statement carefully, (2) Identify the conclusion the speaker is making, (3) Ask "What must be true for this conclusion to follow?" (4) If the answer is not stated, it\'s an assumption. For example, "Smoking causes cancer" assumes that the listener values health. A valid assumption is necessary for the argument to hold; an invalid assumption is either stated in the passage or irrelevant.',
      'Logical deduction problems require you to apply given rules to reach certain conclusions. Unlike assumptions, deductions are testable: if premises are true, deduction must be true. Use syllogistic logic, if-then chains, and process of elimination. Never mix assumptions with deductions; assumptions are about unstated beliefs, deductions are about what must logically follow.',
    ],
    syntax: 'Method: Identify statement → Find conclusion → Ask "What must be true?" → Distinguish assumption vs deduction',
    code: `Statement: "Public transport should be free because it reduces pollution."

Step 1: Break down the argument
   Claim/Conclusion: Public transport should be free
   Reason: It reduces pollution

Step 2: Identify the assumption
   The reason given is: Reduces pollution → Should be free
   For this to make sense, there's an implied belief:
   Assumption: Reducing pollution is important / pollution is harmful

   Alternative assumption: Free public transport will lead to more usage

Step 3: Test the assumption
   "Is the assumption necessary for the argument?"
   Yes. If pollution reduction weren't important, the reason wouldn't support free transport.

   Valid assumption: The speaker assumes pollution reduction is a desirable goal.

Step 4: Distinguish from deduction
   Deduction (must be true): Free transport would reduce pollution
   Assumption (implied belief): Reducing pollution matters

Answer: Valid assumption—the speaker believes reducing pollution is good`,
    output: 'Valid assumption: pollution reduction is desirable',
    notes: [
      'Assumptions are about implicit beliefs, not facts. Don\'t confuse them.',
      'Not every statement in the passage is an assumption; stick to unstated beliefs required for the logic.',
      'In "must assume" questions, the correct answer is essential for the argument; in "may assume," it\'s not essential.',
    ],
    xp: 75,
    practice: {
      title: 'Identify the Assumption',
      description: 'Statement: "Vegetarians are healthier because they don\'t eat meat." What is assumed?',
      hint: 'The argument claims not eating meat causes health. What must be true for this to be valid?',
      solution: 'Assumption: Meat consumption is unhealthy / meat is harmful to health. (Without this, avoiding meat wouldn\'t ensure health.)',
      expectedOutput: 'Meat (consumption) is unhealthy',
    },
  },
  {
    id: 'reason-reading-comprehension',
    category: 'Verbal Ability',
    title: 'Reading Comprehension & Paragraph Jumbles',
    difficulty: 'Intermediate',
    theory: [
      'Reading comprehension tests your ability to understand written passages, extract key ideas, and make inferences. Success requires active reading: identify the main idea, note supporting details, understand the author\'s purpose, and recognize the logical flow of ideas. Read each passage carefully without skipping, as critical details often decide answers between similar options. Skim passages only for structure; always read full context around specific details.',
      'Paragraph jumble (rearrangement) questions ask you to order scrambled sentences into a coherent paragraph. The key is identifying logical flow: introductory sentences introduce the topic, supporting sentences develop ideas, transition words signal connections, and concluding sentences wrap up. Pronouns and references (this, it, these, such) point backward to previously introduced items. Cause-effect relationships, examples, and explanations follow a predictable sequence.',
      'Strategy for comprehension: (1) Read the passage once fully, (2) Identify main idea and tone, (3) Re-read questions and passage sections carefully, (4) Eliminate clearly wrong options, (5) For inference questions, distinguish between directly stated, logically implied, and unsupported speculation. For jumbles: (1) Identify sentences that must come first (introduce topic), (2) Group related ideas, (3) Track pronouns and references, (4) Check transitions between sentences.',
    ],
    syntax: 'Comprehension: Read passage → Identify main idea → Answer based on text. Jumbles: Find intro → Track references → Arrange logically',
    code: `Paragraph Jumble (Rearrange into correct order):
A. The scientist discovered a new enzyme that breaks down plastic in weeks.
B. These findings have major implications for reducing landfill waste globally.
C. For decades, plastic pollution has been a critical environmental problem.
D. The research team plans to scale up production for industrial use.

Step 1: Identify the introductory sentence
   Sentence C introduces the problem: plastic pollution is a crisis
   C should come first

Step 2: Track logical flow
   C (introduces problem)
   → A (presents solution: enzyme discovered)
   → B (discusses implications using "these findings")
   → D (describes future plans)

Step 3: Verify transitions
   C sets up problem
   A introduces discovery (natural follow-up)
   B says "These findings" = refers to A's discovery ✓
   D says "plans to scale up" = logically follows solution acceptance ✓

Step 4: Arrange
   Order: C → A → B → D

Answer: C, A, B, D`,
    output: 'C, A, B, D',
    notes: [
      'Transition words (however, therefore, thus, because, nevertheless) are key—they signal the relationship between sentences.',
      'Pronouns must refer back to a noun in a previous sentence. This helps determine order.',
      'For comprehension, distinguish inference (logically deduced) from information not in passage (cannot answer based on given text).',
    ],
    xp: 80,
    practice: {
      title: 'Paragraph Arrangement',
      description: 'Rearrange: (A) She trained for months. (B) Sarah decided to run a marathon. (C) On race day, she finished successfully. (D) Her determination inspired others. Order?',
      hint: 'B introduces decision. A shows preparation. C shows outcome. D shows impact. Sequential cause-effect.',
      solution: 'B → A → C → D. (Decision → Training → Success → Inspiration)',
      expectedOutput: 'B, A, C, D',
    },
  },
  {
    id: 'reason-verbal-synonyms-errors',
    category: 'Verbal Ability',
    title: 'Synonyms, Antonyms, Error Spotting & Sentence Correction',
    difficulty: 'Beginner',
    theory: [
      'Synonyms and antonyms test vocabulary and word relationships. Synonyms are words with similar meanings, but subtle differences exist: "big" and "large" are synonyms, but "big" is informal and "large" is formal. The best synonym fits the context and connotation of the given word. Antonyms are opposites. For synonyms, identify the word\'s primary meaning first, then match it with the closest option, eliminating words that are related but not synonymous.',
      'Error spotting requires identifying grammatical, spelling, or structural mistakes in sentences. Common errors include subject-verb disagreement (singular subject with plural verb), tense inconsistency (mixing past and present), pronoun misuse (wrong person or number), incorrect word usage (using noun when adjective is needed), and comma/punctuation errors. Read carefully for errors in every word; one misplaced word changes meaning entirely.',
      'Sentence correction follows from error spotting—rewrite the sentence to eliminate the error while preserving meaning. The correction should use standard English grammar, maintain the original intent, and be concise. Some sentences have multiple errors; correct all of them. For both tasks: read the full sentence in context, identify the nature of the error (grammar, word choice, structure), and apply the correction rule consistently.',
    ],
    syntax: 'Synonyms: Find meaning → Match closest word. Antonyms: Find opposite. Errors: Identify mistake type → Correct grammatically',
    code: `Example 1: Find synonym for "benevolent"
Options: (A) wealthy (B) kind (C) powerful (D) ancient

Step 1: Identify meaning
   Benevolent = showing kindness, generosity, goodwill

Step 2: Evaluate options
   Wealthy = rich (not related to kindness)
   Kind = shows kindness, friendly (matches benevolent)
   Powerful = strong (not related to kindness)
   Ancient = old (not related)

Answer: (B) kind

Example 2: Error spotting
"The team are playing good in the tournament."

Step 1: Identify errors
   "team are" - team is singular collective noun, should be "is"
   "playing good" - good is adjective, needs adverb "well" for "playing"

Step 2: Correct
"The team is playing well in the tournament."

Step 3: Verify
   Subject-verb agreement ✓
   Adverb usage ✓

Answer: Change "are" to "is" and "good" to "well"`,
    output: 'Synonym: (B) kind | Error correction: "is" and "well"',
    notes: [
      'For synonyms, context matters—a word\'s connotation (positive/negative feeling) must match.',
      'Common grammar errors: subject-verb agreement, tense consistency, articles (a/an/the), prepositions.',
      'When correcting, preserve the original meaning and tone; don\'t change the sentence\'s intent.',
    ],
    xp: 70,
    practice: {
      title: 'Error Spotting Practice',
      description: 'Find and correct the error: "She have finished her homework and gone to bed."',
      hint: 'Check subject-verb agreement. "She" is singular, so the verb should match.',
      solution: 'Error: "have" should be "has" (singular subject "She" requires singular verb "has"). Correct: "She has finished her homework and gone to bed."',
      expectedOutput: '"has" instead of "have"',
    },
  },
];
