import React from 'react';
import { ArrowRight, BookOpen, Target, Trophy, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

interface ClassData {
  subjects: string[];
  description: string;
  keyTopics: string[];
  importantChapters: { subject: string; chapters: string[] }[];
  examInfo: string;
  tips: string[];
}

const CLASS_DATA: Record<number, ClassData> = {
  1: {
    subjects: ['Mathematics', 'EVS (Environmental Studies)', 'English', 'Hindi'],
    description: 'Class 1 is the very first year of formal schooling. Children learn number recognition, basic addition and subtraction, the alphabet, simple words, and explore their world through fun activities and EVS.',
    keyTopics: ['Numbers 1–100', 'Basic Addition and Subtraction', 'Shapes and Space', 'My Body and Family', 'Plants and Animals', 'Alphabet and Simple Words'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Shapes and Space', 'Numbers from One to Nine', 'Addition', 'Subtraction', 'Numbers from Ten to Twenty', 'Time', 'Measurement'] },
      { subject: 'EVS', chapters: ['My Body', 'Plants around Me', 'Animals around Me', 'My Family and Home'] },
      { subject: 'English', chapters: ['A Happy Child', 'After a Bath', 'One Little Kitten', 'Moo'] },
    ],
    examInfo: 'Class 1 uses Continuous Comprehensive Evaluation (CCE). No formal board exams. Assessment is through activities, oral tests, drawings, and short written tasks. The focus is on joyful learning.',
    tips: ['Practice writing numbers 1–100 every day', 'Read aloud for 10–15 minutes daily', 'Draw and label shapes, animals, and plants', 'Use real objects (coins, blocks) to learn addition and subtraction'],
  },
  2: {
    subjects: ['Mathematics', 'EVS (Environmental Studies)', 'English', 'Hindi'],
    description: 'Class 2 builds on Class 1 by strengthening reading, writing, and arithmetic. Students learn two-digit arithmetic, simple sentences, patterns, and explore their surroundings through activity-based learning.',
    keyTopics: ['Numbers up to 100', 'Two-digit Addition and Subtraction', 'Patterns and Shapes', 'Time and Money', 'My Family and Relationships', 'Plants, Animals and Water'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['What is Long, What is Round?', 'Counting in Groups', 'How Much Can You Carry?', 'Counting in Tens', 'Patterns', 'Footprints', 'Jugs and Mugs'] },
      { subject: 'EVS', chapters: ['My School', 'Our Environment', 'Air and Water', 'Animals and Their Food'] },
      { subject: 'English', chapters: ['First Day at School', 'Haldi\'s Adventure', 'I am Lucky!', 'A Smile'] },
    ],
    examInfo: 'Class 2 has activity-based assessment. Learning is evaluated through projects, oral responses, drawings, and simple written tests. NCERT "Math Magic" and EVS books are the main textbooks.',
    tips: ['Practice two-digit addition with carrying', 'Build vocabulary by reading short illustrated stories', 'Identify patterns in tiles, clothes, and nature', 'Write simple 3–5 word sentences every day'],
  },
  3: {
    subjects: ['Mathematics', 'EVS (Environmental Studies)', 'English', 'Hindi'],
    description: 'Class 3 introduces multiplication tables, three-digit numbers, and simple fractions. EVS expands to cover plants, water, shelter, and the planet, helping students connect learning to everyday life.',
    keyTopics: ['3-Digit Numbers', 'Multiplication Tables 1–10', 'Introduction to Fractions', 'Time and Calendar', 'Water and Earth', 'Food and Shelter'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Where to Look From', 'Fun with Numbers', 'Give and Take', 'Long and Short', 'Shapes and Designs', 'Time Goes On', 'Who is Heavier?'] },
      { subject: 'EVS', chapters: ['Poonam\'s Day Out', 'The Plant Fairy', 'Water O Water', 'Our First School', 'Chhotu\'s House', 'A Treat for Mosquitoes'] },
      { subject: 'English', chapters: ['Good Morning', 'The Magic Garden', 'Bird Talk', 'The Enormous Turnip', 'The Yellow Butterfly'] },
    ],
    examInfo: 'Class 3 is assessed through term exams and class activities. NCERT "Math Magic" and "Looking Around" are key textbooks. Regular practice of multiplication tables is essential for Class 4 and beyond.',
    tips: ['Memorize multiplication tables 1–12 thoroughly', 'Practice reading comprehension passages aloud', 'Draw and label diagrams for EVS topics like plants and animals', 'Learn to tell time on an analog clock'],
  },
  4: {
    subjects: ['Mathematics', 'EVS (Environmental Studies)', 'English', 'Hindi'],
    description: 'Class 4 strengthens multiplication, introduces long division, and covers basic geometry. EVS covers states of matter, transport, trees and forests, and social awareness topics.',
    keyTopics: ['4-Digit Numbers', 'Multiplication and Division', 'Basic Fractions and Halves', 'Geometry and Measurement', 'Water and Its Forms', 'Trees, Transport and Environment'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Building with Bricks', 'Long and Short', 'A Trip to Bhopal', 'Tick-Tick-Tick', 'The Way the World Looks', 'The Junk Seller', 'Jugs and Mugs', 'Halves and Quarters'] },
      { subject: 'EVS', chapters: ['Going to School', 'Ear to Ear', 'A Day with Nandu', 'The Story of Amrita', 'Anita and the Honeybees', 'Hungry Planet', 'From the Window'] },
      { subject: 'English', chapters: ['Wake Up!', 'Noses', 'Run!', 'The Donkey', 'Pinocchio', 'Don\'t be Afraid of the Dark'] },
    ],
    examInfo: 'Class 4 has school-level term exams. NCERT "Math Magic" and "Looking Around" are the main textbooks. Understanding concepts is more important than memorization at this stage.',
    tips: ['Practice long division with step-by-step working', 'Use a pizza or chapati to understand fractions visually', 'Read EVS chapters carefully — questions are practical and real-world', 'Learn basic unit conversions for length (cm, m), weight (g, kg), and capacity (ml, l)'],
  },
  5: {
    subjects: ['Mathematics', 'EVS (Environmental Studies)', 'English', 'Hindi'],
    description: 'Class 5 is the foundation year for CBSE primary education. Students learn number operations, geometry basics, environmental awareness, and language skills that form the base for all future learning.',
    keyTopics: ['Large Numbers', 'Fractions', 'Shapes and Angles', 'Plants and Animals', 'Human Body', 'Our Environment'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['The Fish Tale', 'Shapes and Angles', 'How Many Squares?', 'Parts and Wholes', 'Be My Multiple'] },
      { subject: 'EVS', chapters: ['Seeds and Seeds', 'From Tasting to Digesting', 'Whose Forest Is This?', 'Walls Tell Stories'] },
      { subject: 'English', chapters: ['Ice-cream Man', 'Wonderful Waste', 'The Lazy Frog', 'Flying Together'] },
    ],
    examInfo: 'Class 5 assessments are school-based. Marks are awarded for class tests, projects, and annual exams. Focus on NCERT textbooks and practice worksheets.',
    tips: ['Read EVS chapters carefully — they test real-world understanding', 'Practice multiplication tables up to 20', 'Write answers in complete sentences for English and EVS', 'Draw diagrams for science concepts'],
  },
  6: {
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
    description: 'Class 6 marks the transition to middle school with introduction to fractions, rational numbers, basic science concepts like food and living things, and Indian history from ancient times.',
    keyTopics: ['Integers', 'Fractions', 'Basic Geometry', 'Food: Where Does It Come From?', 'Components of Food', 'Ancient India', 'Globe and Maps'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Basic Geometrical Ideas', 'Fractions'] },
      { subject: 'Science', chapters: ['Food: Where Does It Come From?', 'Fibre to Fabric', 'Sorting Materials into Groups', 'Body Movements', 'The Living Organisms'] },
      { subject: 'Social Science', chapters: ['What, Where, How and When?', 'On The Trail of The Earliest People', 'In the Earliest Cities', 'The Earth in the Solar System'] },
    ],
    examInfo: 'Class 6 has half-yearly and annual exams. Board is CBSE. Performance determines promotion. NCERT is the only required textbook — do not rely on guides alone.',
    tips: ['Learn all fraction operations — they appear in Class 7, 8, 9 too', 'Make timelines for History chapters', 'Practice labeling maps for Geography', 'Science diagrams must be drawn with labels'],
  },
  7: {
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
    description: 'Class 7 builds on Class 6 with introduction to algebraic expressions, rational numbers, heat and temperature in Science, and medieval Indian history. Critical thinking and analytical skills become important.',
    keyTopics: ['Integers and Rational Numbers', 'Algebraic Expressions', 'Perimeter and Area', 'Heat', 'Acids Bases and Salts', 'Nutrition in Plants and Animals', 'The Mughal Empire'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Integers', 'Fractions and Decimals', 'Simple Equations', 'Lines and Angles', 'The Triangle and Its Properties', 'Congruence of Triangles'] },
      { subject: 'Science', chapters: ['Nutrition in Plants', 'Nutrition in Animals', 'Heat', 'Acids, Bases and Salts', 'Physical and Chemical Changes', 'Weather, Climate and Adaptations'] },
      { subject: 'Social Science', chapters: ['Tracing Changes Through a Thousand Years', 'The Mughal Empire', 'Tribes, Nomads and Settled Communities', 'Environment'] },
    ],
    examInfo: 'Class 7 is the foundation for Class 8 and 9. Strong algebra and science concepts now prevent struggles later. Annual exam marks determine class rank.',
    tips: ['Master simple equations — base for Class 9 algebra', 'Understand acids and bases for Class 10 Chemistry', 'Mughal Empire questions appear in various state board exams too', 'Practice finding area and perimeter of combined shapes'],
  },
  8: {
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit'],
    description: 'Class 8 introduces more advanced concepts: rational numbers, linear equations, cell biology, chemical effects of electric current, and modern Indian history including the independence movement.',
    keyTopics: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Cell Structure and Functions', 'Microorganisms', 'Combustion and Flame', 'The Indian Constitution'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Squares and Square Roots', 'Cubes and Cube Roots', 'Comparing Quantities'] },
      { subject: 'Science', chapters: ['Crop Production and Management', 'Microorganisms', 'Synthetic Fibres and Plastics', 'Metals and Non-metals', 'Coal and Petroleum', 'Combustion and Flame', 'Cell Structure and Functions'] },
      { subject: 'Social Science', chapters: ['How, When and Where', 'From Trade to Territory', 'Ruling the Countryside', 'Tribals, Dikus and the Vision of a Golden Age', 'When People Rebel'] },
    ],
    examInfo: 'Class 8 is the last year before Class 9 (which has first major board-style exams). Strong foundation here prevents stress in Class 9. Pay attention to all Science topics — they continue in Class 9.',
    tips: ['Class 8 Maths (especially Squares, Cubes) appears in Class 10 and competitive exams', 'Cell structure diagrams are important for Class 10 Life Processes', 'History of colonialism connects to Class 10 Nationalism chapter', 'Practice all rational number operations thoroughly'],
  },
  9: {
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Second Language'],
    description: 'Class 9 is a critical year. CBSE Class 9 content directly feeds into Class 10 boards. Number systems, polynomials, motion, matter, democratic politics, and French Revolution are key areas.',
    keyTopics: ['Number Systems', 'Polynomials', 'Lines and Angles', 'Motion and Laws of Motion', 'Atoms and Molecules', 'Cells and Tissues', 'Democratic Politics', 'French Revolution'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Lines and Angles', 'Triangles', 'Quadrilaterals', 'Areas of Parallelograms', 'Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'] },
      { subject: 'Science', chapters: ['Matter in Our Surroundings', 'Is Matter Around Us Pure?', 'Atoms and Molecules', 'Structure of the Atom', 'The Fundamental Unit of Life', 'Tissues', 'Motion', 'Force and Laws of Motion', 'Gravitation', 'Sound'] },
      { subject: 'Social Science', chapters: ['The French Revolution', 'Socialism in Europe and the Russian Revolution', 'Nazism and the Rise of Hitler', 'What is Democracy? Why Democracy?', 'Electoral Politics', 'The Story of Village Palampur'] },
    ],
    examInfo: 'Class 9 has school-based annual exams but CBSE monitors schools. Class 9 marks appear on marksheets. More importantly, Class 9 content is 40% of Class 10 boards — study it seriously.',
    tips: ['Every Chapter 9 Maths topic continues in Class 10 — never skip', 'Learn atoms and molecules thoroughly: essential for Class 10 and JEE/NEET', 'Motion and Force form the base for Class 11 Mechanics', 'Democratic Politics prepares you for Class 10 Civics', 'Practice all NCERT Maths exercises — most Class 10 board questions have roots in Class 9'],
  },
  10: {
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi/Sanskrit'],
    description: 'Class 10 CBSE board exams are the first major public examination. Marks determine stream selection and college admissions. Trigonometry, Chemical Reactions, Life Processes, Nationalism, and Literature are key areas.',
    keyTopics: ['Real Numbers', 'Polynomials', 'Quadratic Equations', 'Trigonometry', 'Chemical Reactions and Equations', 'Life Processes', 'Electricity', 'Nationalism in India', 'Development'],
    importantChapters: [
      { subject: 'Mathematics', chapters: ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'] },
      { subject: 'Science', chapters: ['Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals', 'Carbon and Its Compounds', 'Life Processes', 'Control and Coordination', 'How do Organisms Reproduce', 'Heredity and Evolution', 'Light-Reflection and Refraction', 'Electricity', 'Magnetic Effects of Electric Current', 'Our Environment'] },
      { subject: 'Social Science', chapters: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'The Making of a Global World', 'Power Sharing', 'Federalism', 'Development', 'Sectors of Indian Economy', 'Consumer Rights'] },
    ],
    examInfo: 'CBSE Class 10 board exams are held in February-March. Passing requires 33% in each subject. For 90+ marks: master NCERT, solve 5+ sample papers, practice time management.',
    tips: ['All 15 Maths chapters are equally important — never skip', 'Chemical Reactions: learn and balance all equations', 'Trigonometry: memorize all identities and standard values', 'Learn to draw all Science diagrams from memory', 'Social Science: maps are compulsory in Geography paper', 'English: practice letter writing, notice writing, and editorial formats'],
  },
  11: {
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'English', 'Optional Subject'],
    description: 'Class 11 is the most important year for competitive exam preparation. JEE and NEET success depends largely on Class 11 fundamentals — Mechanics, Organic Chemistry, Calculus, and Biology basics.',
    keyTopics: ['Laws of Motion', 'Work Energy Power', 'Thermodynamics', 'Mole Concept', 'Organic Chemistry Basics', 'Trigonometry', 'Calculus Limits and Derivatives', 'Cell Biology', 'Plant Physiology'],
    importantChapters: [
      { subject: 'Physics', chapters: ['Units and Measurement', 'Motion in a Straight Line', 'Laws of Motion', 'Work, Energy and Power', 'System of Particles and Rotational Motion', 'Gravitation', 'Mechanical Properties of Solids', 'Thermodynamics', 'Waves'] },
      { subject: 'Chemistry', chapters: ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrocarbons', 'Environmental Chemistry'] },
      { subject: 'Mathematics', chapters: ['Sets', 'Relations and Functions', 'Trigonometric Functions', 'Principle of Mathematical Induction', 'Complex Numbers', 'Linear Inequalities', 'Permutations and Combinations', 'Binomial Theorem', 'Sequences and Series', 'Straight Lines', 'Conic Sections', 'Limits and Derivatives', 'Statistics', 'Probability'] },
    ],
    examInfo: 'Class 11 has school-based exams. Though marks don\'t appear on final marksheets, weak Class 11 knowledge means failing JEE/NEET. Take every chapter test seriously.',
    tips: ['Never skip Mechanics — it\'s 30% of JEE Physics', 'Organic Chemistry reactions need to be memorized with daily practice', 'Calculus (limits and derivatives) is the gateway to all higher Maths', 'Biology students: NCERT is the bible for Class 11 — read every line', 'Form study groups for difficult topics like Thermodynamics'],
  },
  12: {
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'English', 'Optional Subject'],
    description: 'Class 12 CBSE boards are gateway to IITs, medical colleges, and top universities. Electrostatics, Organic Chemistry reactions, Calculus (Integrals), Genetics, and Reproduction are the highest-weightage areas.',
    keyTopics: ['Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Modern Physics', 'Aldehydes Ketones', 'Biomolecules', 'Integrals', 'Vectors 3D', 'Genetics', 'Reproduction in Organisms'],
    importantChapters: [
      { subject: 'Physics', chapters: ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance', 'Current Electricity', 'Moving Charges and Magnetism', 'Magnetism and Matter', 'Electromagnetic Induction', 'Alternating Current', 'Electromagnetic Waves', 'Ray Optics', 'Wave Optics', 'Dual Nature of Radiation', 'Atoms', 'Nuclei', 'Semiconductor Devices'] },
      { subject: 'Chemistry', chapters: ['The Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'Coordination Compounds', 'Haloalkanes and Haloarenes', 'Alcohols Phenols and Ethers', 'Aldehydes Ketones and Carboxylic Acids', 'Amines', 'Biomolecules', 'Polymers'] },
      { subject: 'Mathematics', chapters: ['Relations and Functions', 'Inverse Trigonometric Functions', 'Matrices', 'Determinants', 'Continuity and Differentiability', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations', 'Vector Algebra', 'Three Dimensional Geometry', 'Linear Programming', 'Probability'] },
    ],
    examInfo: 'CBSE Class 12 board exams are held in February-March. For Science students appearing in JEE/NEET: boards and competitive exams run simultaneously. 75% attendance and 33% pass marks are mandatory. Most colleges require 60%+ for admission.',
    tips: ['Physics: do all NCERT examples and exercises — boards often copy them', 'Chemistry: Coordination Compounds and Organic reactions need weekly revision', 'Maths: Integration has 20+ marks — master every technique', 'English: Practice comprehension passages and essay writing for 3-4 marks extra', 'Biology: Genetics (Mendelian and Molecular) is the highest-scoring chapter in NEET'],
  },
};

interface ClassPageProps {
  classNum: number;
  setTab?: (tab: string) => void;
}

export default function ClassPage({ classNum, setTab }: ClassPageProps) {
  const data = CLASS_DATA[classNum];
  if (!data) return null;

  const isCompetitive = classNum >= 11;

  return (
    <>
      <SEO
        title={`Class ${classNum} NCERT Syllabus, Important Chapters & Study Tips | Syllab.in`}
        description={`Complete Class ${classNum} CBSE NCERT syllabus guide with important chapters, study tips, and free practice for ${data.subjects.join(', ')}. Start learning free on Syllab.in.`}
        keywords={`Class ${classNum} NCERT, Class ${classNum} CBSE, Class ${classNum} syllabus, Class ${classNum} ${data.subjects[0]}, Class ${classNum} important chapters, Class ${classNum} study tips`}
        url={`https://syllab.in/class-${classNum}`}
      />

      {/* JSON-LD: Course + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: `Class ${classNum} CBSE NCERT Full Course`,
              description: data.description,
              url: `https://syllab.in/class-${classNum}`,
              provider: {
                '@type': 'EducationalOrganization',
                name: 'Syllab.in',
                url: 'https://syllab.in',
              },
              educationalLevel: `Grade ${classNum}`,
              inLanguage: 'en-IN',
              isAccessibleForFree: true,
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
              hasCourseInstance: data.subjects.map(subject => ({
                '@type': 'CourseInstance',
                name: `Class ${classNum} ${subject}`,
                courseMode: 'online',
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syllab.in/' },
                { '@type': 'ListItem', position: 2, name: `Class ${classNum}`, item: `https://syllab.in/class-${classNum}` },
              ],
            },
          ]),
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50 rounded-[2rem] p-8 sm:p-12 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-700 text-[11px] font-black uppercase tracking-widest mb-4 shadow-sm">
            <BookOpen size={13} className="text-emerald-500" />
            CBSE NCERT
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Class {classNum}
          </h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl leading-relaxed mb-6">
            {data.description}
          </p>
          <button
            onClick={() => {
              sessionStorage.setItem('syllab_class_filter', String(classNum));
              if (setTab) setTab('syllabus');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg"
          >
            Practice Class {classNum} Chapters <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Subjects */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
              Subjects in Class {classNum}
            </h2>
            <ul className="space-y-2">
              {data.subjects.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Topics */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
              Key Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.keyTopics.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Important Chapters */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Important NCERT Chapters — Class {classNum}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.importantChapters.map(({ subject, chapters }) => (
              <div key={subject}>
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3">
                  {subject}
                </h3>
                <ul className="space-y-2">
                  {chapters.map((ch) => (
                    <li key={ch} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                      {ch}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Info */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-2">
                Exam Information
              </h2>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                {data.examInfo}
              </p>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Study Tips for Class {classNum}
          </h2>
          <ul className="space-y-3">
            {data.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 font-medium leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {isCompetitive && (
          <div className="bg-gradient-to-br from-violet-50 to-sky-50 border border-violet-100 rounded-3xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-violet-500 flex items-center justify-center flex-shrink-0">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 mb-2">
                  JEE & NEET Preparation
                </h2>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  Class {classNum} content forms a major part of JEE Mains and NEET syllabus.
                  {classNum === 11
                    ? ' Class 11 covers ~40% of JEE/NEET marks. Never neglect it thinking only Class 12 matters.'
                    : ' Class 12 covers the remaining ~60% of JEE/NEET. Balance board preparation with competitive exam practice.'}
                  {' '}Use Syllab\'s daily challenges and mock tests to stay exam-ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ad placeholder */}
        <div className="mb-8">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="5566778899"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* CTA */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {
              sessionStorage.setItem('syllab_class_filter', String(classNum));
              if (setTab) setTab('syllabus');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-emerald-500 text-white rounded-3xl text-left active:scale-95 transition-transform group"
          >
            <BookOpen size={24} className="mb-3" />
            <div className="font-black text-base mb-1">Syllabus Explorer</div>
            <div className="text-emerald-100 text-xs font-medium">Browse Class {classNum} chapters</div>
          </button>
          <button
            onClick={() => setTab && setTab('arena')}
            className="p-6 bg-slate-900 text-white rounded-3xl text-left active:scale-95 transition-transform"
          >
            <Target size={24} className="mb-3" />
            <div className="font-black text-base mb-1">Practice Arena</div>
            <div className="text-slate-400 text-xs font-medium">Chapter-wise MCQ practice</div>
          </button>
          <button
            onClick={() => setTab && setTab('mock_tests')}
            className="p-6 bg-white border-2 border-slate-100 text-slate-900 rounded-3xl text-left active:scale-95 transition-transform"
          >
            <Trophy size={24} className="mb-3 text-amber-500" />
            <div className="font-black text-base mb-1">Mock Tests</div>
            <div className="text-slate-400 text-xs font-medium">Full-length timed tests</div>
          </button>
        </div>

        {/* Other Classes */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-black text-slate-900 mb-4">Other Classes</h2>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
              <button
                key={c}
                onClick={() => setTab && setTab(`class_${c}`)}
                className={`p-2 sm:p-3 rounded-2xl text-center font-black text-sm transition-all active:scale-95 ${
                  c === classNum
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
