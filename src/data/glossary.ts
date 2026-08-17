/**
 * glossary.ts — student "Glossary / Definitions" SEO cluster.
 * Answers "what is X" / "X definition" queries at /glossary/{slug}.
 * Data is generated; keep definitions accurate (educational content).
 */
export interface GlossaryFaq { q: string; a: string; }
export interface GlossaryTerm {
  slug: string;
  term: string;
  category: string;     // Biology, Physics, ...
  classLevel: string;
  definition: string;   // one-sentence crisp definition
  explanation: string;  // paragraph
  example: string;
  faqs: GlossaryFaq[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    "slug": "photosynthesis",
    "term": "Photosynthesis",
    "category": "Biology",
    "classLevel": "Class 7",
    "definition": "The process by which plants use sunlight, water, and carbon dioxide to make glucose and oxygen.",
    "explanation": "Photosynthesis is the most important biological process on Earth. It occurs in the chloroplasts of plant cells, where chlorophyll absorbs light energy. Plants use this energy to convert carbon dioxide from the air and water from the soil into glucose for food, while releasing oxygen as a byproduct. This oxygen is essential for respiration in all living organisms.",
    "example": "A green leaf in sunlight converts 6CO2 + 6H2O into C6H12O6 (glucose) + 6O2. The plant uses glucose for growth and energy, and releases oxygen into the atmosphere.",
    "faqs": [
      {
        "q": "Why do plants need sunlight for photosynthesis?",
        "a": "Sunlight provides the energy needed to break down water molecules and convert carbon dioxide into glucose. Without light energy, the chemical reactions cannot occur."
      },
      {
        "q": "Where in the plant cell does photosynthesis happen?",
        "a": "Photosynthesis happens in the chloroplasts, which contain the green pigment chlorophyll that captures light energy."
      }
    ]
  },
  {
    "slug": "osmosis",
    "term": "Osmosis",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "The movement of water molecules across a semipermeable membrane from an area of higher water concentration to lower water concentration.",
    "explanation": "Osmosis is a special type of diffusion involving water molecules and a semipermeable membrane. Water molecules move to balance the concentration of dissolved solutes on both sides of the membrane. This process is crucial for plant cells to maintain turgor pressure and for animal cells to regulate water balance. In Indian schools, osmosis is taught as a key concept for understanding how cells absorb water and nutrients.",
    "example": "When a plant cell is placed in pure water, water molecules move into the cell by osmosis because the cell sap is more concentrated than external water. The cell becomes firm and turgid.",
    "faqs": [
      {
        "q": "What is the difference between osmosis and diffusion?",
        "a": "Diffusion is the movement of any molecules, but osmosis is the specific movement of water across a semipermeable membrane."
      },
      {
        "q": "Why do plant cells not burst in pure water like animal cells do?",
        "a": "Plant cells have a rigid cell wall that prevents excessive water intake and maintains the cell shape, whereas animal cells lack this wall."
      }
    ]
  },
  {
    "slug": "diffusion",
    "term": "Diffusion",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "The spontaneous movement of particles from an area of higher concentration to an area of lower concentration.",
    "explanation": "Diffusion is a passive transport process where particles move without requiring energy from the cell. The movement continues until the concentration becomes equal throughout. In living organisms, diffusion is essential for oxygen entering blood cells, nutrients moving into cells, and waste products leaving cells. This fundamental biological process does not depend on the presence of a semipermeable membrane.",
    "example": "When you open a perfume bottle in a room, the fragrance spreads throughout the room as perfume molecules diffuse from high concentration (near the bottle) to low concentration (rest of the room).",
    "faqs": [
      {
        "q": "Is diffusion active or passive transport?",
        "a": "Diffusion is passive transport because it does not require energy; particles move due to their natural kinetic energy."
      },
      {
        "q": "Can diffusion move particles against concentration gradient?",
        "a": "No, diffusion always moves particles from high to low concentration; it cannot work in the opposite direction without energy input."
      }
    ]
  },
  {
    "slug": "respiration",
    "term": "Respiration",
    "category": "Biology",
    "classLevel": "Class 7",
    "definition": "The biochemical process by which organisms break down food molecules to release energy in the form of ATP.",
    "explanation": "Respiration is essential for life and occurs in all living cells. Aerobic respiration, which uses oxygen, occurs in mitochondria and produces the most energy from glucose. Anaerobic respiration happens without oxygen and is used by bacteria and during intense muscle exercise. In humans, glucose is broken down to produce water, carbon dioxide, and approximately 38 ATP molecules per glucose. This energy is used for all life processes including movement, growth, and heat production.",
    "example": "When you eat food and your body breaks down glucose with oxygen, energy is released to power your muscles when you run, think, or study for exams.",
    "faqs": [
      {
        "q": "Why do we breathe oxygen?",
        "a": "We breathe oxygen because our cells use it during aerobic respiration to break down glucose and release energy."
      },
      {
        "q": "What happens during respiration in your mitochondria?",
        "a": "Glucose is oxidized step by step, releasing energy that is captured in ATP molecules, and carbon dioxide is produced as a waste product."
      }
    ]
  },
  {
    "slug": "ecosystem",
    "term": "Ecosystem",
    "category": "Biology",
    "classLevel": "Class 7",
    "definition": "A community of living organisms interacting with their physical environment, including soil, water, and atmosphere.",
    "explanation": "An ecosystem comprises biotic components like plants, animals, and microorganisms, and abiotic components like sunlight, temperature, water, and soil. Energy flows through the ecosystem from the sun to producers like plants, then to consumers like herbivores and carnivores. Nutrients cycle between organisms and the environment. Indian ecosystems vary from tropical rainforests to deserts to mangrove swamps, each with unique biodiversity and food chains.",
    "example": "A pond ecosystem includes water plants that produce oxygen, fish and frogs that eat insects, insects that feed on plants, and bacteria that decompose dead matter, all supported by sunlight and nutrients in the water.",
    "faqs": [
      {
        "q": "What is the difference between an ecosystem and a habitat?",
        "a": "A habitat is the place where an organism lives, while an ecosystem includes all the organisms and their physical environment interacting together."
      },
      {
        "q": "Why are decomposers important in an ecosystem?",
        "a": "Decomposers break down dead organisms and return nutrients to the soil, which plants use for growth, completing the nutrient cycle."
      }
    ]
  },
  {
    "slug": "mitosis",
    "term": "Mitosis",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "The process of cell division that produces two identical daughter cells from one parent cell.",
    "explanation": "Mitosis is crucial for growth, repair, and asexual reproduction in organisms. It consists of four main stages: prophase, metaphase, anaphase, and telophase. During mitosis, the parent cell's genetic material is duplicated and equally distributed to daughter cells. This ensures that each new cell receives an exact copy of the DNA. In human growth from childhood to adulthood, mitosis enables the increase in cell number and tissue repair from injuries.",
    "example": "When a skin cell divides by mitosis to repair a cut, it produces two identical daughter skin cells that each contain the same 46 chromosomes as the parent cell.",
    "faqs": [
      {
        "q": "Why is mitosis important for growth?",
        "a": "Mitosis increases the number of cells in an organism, allowing it to grow larger and replace damaged tissues."
      },
      {
        "q": "How is mitosis different from meiosis?",
        "a": "Mitosis produces two identical daughter cells with the same chromosome number, while meiosis produces four different cells with half the chromosome number for sexual reproduction."
      }
    ]
  },
  {
    "slug": "meiosis",
    "term": "Meiosis",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "The process of cell division that produces four non-identical haploid sex cells from one diploid parent cell.",
    "explanation": "Meiosis is essential for sexual reproduction and creates gametes with half the number of chromosomes as the parent cell. It involves two sequential divisions, meiosis I and meiosis II, and includes a crossing over process that creates genetic variation. In humans, meiosis produces sperm cells in males and egg cells in females. The reduction in chromosome number ensures that when sperm and egg fuse during fertilization, the offspring has the correct chromosome number.",
    "example": "A human sperm cell has 23 chromosomes, and an egg cell has 23 chromosomes. When they fuse during fertilization, the resulting zygote has 46 chromosomes, the normal number for human cells.",
    "faqs": [
      {
        "q": "Why do sex cells have half the number of chromosomes?",
        "a": "Sex cells have half the chromosomes so that when two of them combine during fertilization, the offspring has the correct full number of chromosomes."
      },
      {
        "q": "What is crossing over and why does it matter?",
        "a": "Crossing over is the exchange of genetic material between homologous chromosomes, which creates genetic variation in offspring and contributes to diversity in populations."
      }
    ]
  },
  {
    "slug": "evolution",
    "term": "Evolution",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "The process of gradual change in the characteristics of populations over successive generations.",
    "explanation": "Evolution occurs through natural selection, where organisms with traits better adapted to their environment are more likely to survive and reproduce. Over millions of years, small changes accumulate, leading to the formation of new species. Evidence for evolution includes fossil records showing how ancient organisms differ from modern ones, comparative anatomy showing structural similarities among different species, and DNA evidence proving all life shares common ancestry. The theory of evolution by natural selection, proposed by Charles Darwin, explains the diversity of life on Earth.",
    "example": "Peppered moths in England changed from light colored to dark colored during the Industrial Revolution because dark moths survived better on soot-covered trees. When pollution decreased, light moths returned, showing evolution in action.",
    "faqs": [
      {
        "q": "Is evolution the same as adaptation?",
        "a": "Adaptation is a trait that helps an organism survive, while evolution is the change in populations over generations through natural selection of these adaptations."
      },
      {
        "q": "What evidence supports evolution?",
        "a": "Fossil records, similarities in bone structures between different species, DNA similarities among all life, and observed changes in populations like bacteria developing antibiotic resistance all support evolution."
      }
    ]
  },
  {
    "slug": "force",
    "term": "Force",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "A push or pull exerted on an object that can change its motion, shape, or direction.",
    "explanation": "Force is a fundamental concept in physics that can accelerate objects, decelerate them, or change their direction. Forces always act in pairs as stated by Newton's Third Law. Common types of forces include gravitational force, frictional force, magnetic force, and applied force. In Indian physics education, understanding force is essential for explaining motion, work, and energy. Forces are measured in Newtons, where 1 Newton is the force needed to accelerate 1 kilogram at 1 meter per second squared.",
    "example": "When you kick a soccer ball, the force from your foot changes the ball's motion from rest to moving forward. The greater the force, the faster and farther the ball travels.",
    "faqs": [
      {
        "q": "Can an object have multiple forces acting on it?",
        "a": "Yes, multiple forces can act on an object simultaneously. The net force is the vector sum of all forces, which determines the object's acceleration."
      },
      {
        "q": "What happens when two equal forces act in opposite directions?",
        "a": "When two equal forces act in opposite directions, the net force is zero, and the object either remains at rest or continues moving at constant velocity."
      }
    ]
  },
  {
    "slug": "velocity",
    "term": "Velocity",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The rate of change of displacement in a specific direction, measured as distance per unit time with direction.",
    "explanation": "Velocity is a vector quantity, meaning it has both magnitude and direction, unlike speed which is scalar. An object moving at 60 kilometers per hour east has a different velocity than one moving 60 kilometers per hour west. Velocity can change even if speed remains constant if the direction changes. In physics problems, velocity is crucial for understanding motion, and when velocity changes with time, acceleration occurs.",
    "example": "A car traveling at 60 km/h northbound has a velocity of 60 km/h north. If it turns to travel 60 km/h eastbound, its speed remains 60 km/h but its velocity has changed because the direction changed.",
    "faqs": [
      {
        "q": "What is the difference between speed and velocity?",
        "a": "Speed is the distance traveled per unit time regardless of direction, while velocity includes the direction of travel."
      },
      {
        "q": "Can an object have constant velocity?",
        "a": "Yes, an object has constant velocity when it moves at the same speed in the same direction without changing either."
      }
    ]
  },
  {
    "slug": "acceleration",
    "term": "Acceleration",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The rate of change of velocity with respect to time.",
    "explanation": "Acceleration occurs whenever an object's velocity changes, whether it speeds up, slows down, or changes direction. The SI unit is meters per second squared. Acceleration is a vector quantity with both magnitude and direction. When you press the accelerator in a car, you increase acceleration; when you press the brake, you have negative acceleration or deceleration. Gravity causes a constant acceleration of 9.8 meters per second squared on objects falling toward Earth.",
    "example": "A car starting from rest and reaching 60 km/h in 5 seconds has an acceleration. If it then maintains 60 km/h for the next 10 seconds, its acceleration is zero during that period.",
    "faqs": [
      {
        "q": "Is deceleration different from negative acceleration?",
        "a": "No, deceleration and negative acceleration mean the same thing: the velocity is decreasing, usually when an object slows down."
      },
      {
        "q": "What causes acceleration according to Newton's laws?",
        "a": "Force causes acceleration; the greater the force applied to an object, the greater its acceleration, as stated in Newton's Second Law: F = ma."
      }
    ]
  },
  {
    "slug": "momentum",
    "term": "Momentum",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The product of an object's mass and velocity, representing its quantity of motion.",
    "explanation": "Momentum is a vector quantity that indicates how difficult it is to stop a moving object. A heavier object or a faster-moving object has more momentum. In collisions, momentum is conserved, meaning the total momentum before collision equals the total momentum after collision. This principle explains why car crashes are more dangerous at higher speeds and why heavy vehicles cause more damage. Understanding momentum is crucial for safety features like airbags and seatbelts.",
    "example": "A bowling ball moving at 10 m/s has more momentum than a baseball moving at 10 m/s because the bowling ball has greater mass. Therefore, the bowling ball is harder to stop.",
    "faqs": [
      {
        "q": "What is the law of conservation of momentum?",
        "a": "In an isolated system with no external forces, the total momentum before an event equals the total momentum after the event."
      },
      {
        "q": "Why does a moving truck cause more damage than a moving bicycle?",
        "a": "The truck has much greater mass, so even at the same speed, it has much greater momentum and carries more energy of motion."
      }
    ]
  },
  {
    "slug": "gravity",
    "term": "Gravity",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "The force of attraction between any two objects with mass, with the strongest effect between objects of large mass like Earth.",
    "explanation": "Gravity is one of the four fundamental forces in nature. All objects with mass attract each other gravitationally, but this force is only noticeable when at least one object is extremely massive. Earth's gravity pulls objects downward with an acceleration of 9.8 m/s squared. This force keeps planets orbiting the sun, the moon orbiting Earth, and objects on Earth from flying away into space. Without gravity, life on Earth would not exist.",
    "example": "When you drop a pen, gravity pulls it downward to the ground. The same gravity that pulls your pen down also keeps the moon orbiting Earth and Earth orbiting the sun.",
    "faqs": [
      {
        "q": "Does gravity act only on Earth?",
        "a": "No, gravity exists everywhere in the universe between all objects with mass. It keeps galaxies together and planets in orbit."
      },
      {
        "q": "Why do astronauts appear weightless in space?",
        "a": "Astronauts in orbit are actually in free fall toward Earth while moving forward, creating the sensation of weightlessness. Gravity is still pulling on them."
      }
    ]
  },
  {
    "slug": "refraction",
    "term": "Refraction",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "The bending of light as it passes from one medium to another medium with a different optical density.",
    "explanation": "Refraction occurs because light travels at different speeds in different materials. When light enters a denser medium like glass or water, it slows down and bends toward the normal line. When light enters a less dense medium, it speeds up and bends away from the normal. The amount of bending depends on the refractive indices of the two materials. Refraction explains why objects underwater appear closer than they actually are, why lenses work, and why rainbows form.",
    "example": "A stick appears bent at the point where it enters water because light from the submerged part refracts as it travels from water to air, changing its direction before reaching your eye.",
    "faqs": [
      {
        "q": "What is the normal line in refraction?",
        "a": "The normal is an imaginary line perpendicular to the surface where light enters the new medium. The angle of incidence and refraction are measured from this normal."
      },
      {
        "q": "Why do lenses use refraction?",
        "a": "Lenses bend light at curved surfaces; converging lenses focus light rays to a point, while diverging lenses spread them apart, useful for glasses and cameras."
      }
    ]
  },
  {
    "slug": "reflection",
    "term": "Reflection",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "The bouncing back of light from a surface when it strikes the surface and cannot pass through.",
    "explanation": "Reflection follows the law of reflection: the angle of incidence equals the angle of reflection, both measured from the normal to the surface. Smooth surfaces like mirrors produce regular reflection where parallel light rays reflect as parallel rays, forming clear images. Rough surfaces produce diffuse reflection where light scatters in all directions. This is why you see a clear image in a mirror but not on rough paper. Understanding reflection is important for designing optical instruments and understanding how we see objects.",
    "example": "When you look in a mirror, light from your face reflects off the smooth mirror surface and enters your eyes, allowing you to see your reflection at the same distance behind the mirror as you are in front of it.",
    "faqs": [
      {
        "q": "What is the difference between reflection and refraction?",
        "a": "Reflection is when light bounces off a surface and stays in the same medium, while refraction is when light bends as it passes into a different medium."
      },
      {
        "q": "Why is a rough surface different from a smooth surface for reflection?",
        "a": "A smooth surface reflects all rays at the same angle creating a clear image, while a rough surface has an uneven surface causing rays to scatter in different directions."
      }
    ]
  },
  {
    "slug": "energy",
    "term": "Energy",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The capacity to do work or cause change in matter.",
    "explanation": "Energy exists in many forms including kinetic energy (energy of motion), potential energy (stored energy due to position), thermal energy (heat), chemical energy (stored in chemical bonds), electrical energy, and radiant energy (light). Energy can transform from one form to another but cannot be created or destroyed, as stated by the Law of Conservation of Energy. When energy transforms, the total amount remains constant. Understanding energy is fundamental to explaining how machines work, how organisms function, and how the universe operates.",
    "example": "A waterfall demonstrates energy transformation: the falling water has gravitational potential energy which converts to kinetic energy as it falls, then to thermal energy as it hits rocks at the bottom.",
    "faqs": [
      {
        "q": "Can energy be destroyed?",
        "a": "No, energy cannot be created or destroyed; it can only be transformed from one form to another, following the Law of Conservation of Energy."
      },
      {
        "q": "What is the difference between kinetic and potential energy?",
        "a": "Kinetic energy is energy due to motion, while potential energy is stored energy due to an object's position or state that can be released."
      }
    ]
  },
  {
    "slug": "work",
    "term": "Work",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The transfer of energy that occurs when a force is applied to an object over a distance in the direction of the force.",
    "explanation": "Work is calculated as the product of force and displacement in the direction of the force. If force and displacement are in the same direction, the work is positive. If they are in opposite directions, work is negative or zero if perpendicular. Work has units of Joules in the SI system. Carrying a book horizontally does not do work against gravity, but lifting it against gravity does. Understanding work is essential for analyzing energy transformations in machines and daily activities.",
    "example": "Pushing a shopping cart 10 meters forward with 50 Newtons of force does 500 Joules of work. But carrying the same cart at a constant height requires force to support it but does no work because the force and displacement are perpendicular.",
    "faqs": [
      {
        "q": "Why is work defined with direction in mind?",
        "a": "Only the component of force in the direction of motion does work. Force perpendicular to motion does no work."
      },
      {
        "q": "Is work the same as effort?",
        "a": "No, work is a scientific quantity defined as force times displacement, while effort is general effort we put in; you can exert effort without doing work in the physics sense."
      }
    ]
  },
  {
    "slug": "atom",
    "term": "Atom",
    "category": "Chemistry",
    "classLevel": "Class 8",
    "definition": "The smallest particle of an element that retains the chemical properties of that element.",
    "explanation": "An atom consists of a nucleus containing protons and neutrons, surrounded by electrons in electron shells. The number of protons determines which element the atom is; atoms of the same element always have the same number of protons. Atoms of different elements have different numbers of protons. Electrons, which are negatively charged, balance the positive charge of protons in a neutral atom. Understanding atomic structure is crucial for explaining chemical bonding, reactions, and the properties of matter. In Indian chemistry education, the atom is the foundation for understanding all matter.",
    "example": "A carbon atom has 6 protons in its nucleus and 6 electrons orbiting around it. Any atom with 6 protons is carbon, whether it has 6, 7, or 8 neutrons.",
    "faqs": [
      {
        "q": "How many types of particles are in an atom?",
        "a": "Three: protons in the nucleus are positively charged, neutrons in the nucleus have no charge, and electrons orbit the nucleus with negative charge."
      },
      {
        "q": "What determines the identity of an atom?",
        "a": "The number of protons in an atom determines what element it is. All carbon atoms have 6 protons, all oxygen atoms have 8 protons, and so on."
      }
    ]
  },
  {
    "slug": "molecule",
    "term": "Molecule",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A group of two or more atoms bonded together chemically, representing the smallest unit of a compound or pure element.",
    "explanation": "Molecules form when atoms share or exchange electrons to form chemical bonds. A molecule can consist of atoms of the same element, like O2 (oxygen gas), or different elements, like H2O (water). The properties of a molecule depend on which atoms it contains and how they are arranged. Chemical reactions involve breaking bonds in reactant molecules and forming new bonds to create product molecules. Understanding molecular structure helps explain why substances have particular properties and how they behave in reactions.",
    "example": "A water molecule consists of two hydrogen atoms bonded to one oxygen atom (H2O). The specific arrangement and bonding give water its unique properties like being liquid at room temperature.",
    "faqs": [
      {
        "q": "What is the difference between atoms and molecules?",
        "a": "An atom is a single particle of an element, while a molecule is two or more atoms bonded together chemically."
      },
      {
        "q": "Can a molecule have just one atom?",
        "a": "No, by definition a molecule must have at least two atoms bonded together. A single atom is just an atom, not a molecule."
      }
    ]
  },
  {
    "slug": "valency",
    "term": "Valency",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "The number of electrons that an atom loses, gains, or shares when forming a chemical bond.",
    "explanation": "Valency determines an atom's ability to combine with other atoms to form compounds. Elements in the same group of the periodic table typically have the same valency. Hydrogen has a valency of 1, oxygen typically 2, nitrogen typically 3. An element with high valency in one state can have different valency in another state, such as iron which can have valencies of 2 or 3. Understanding valency helps predict how atoms will combine and predict the formulas of compounds. For example, because hydrogen has valency 1 and oxygen has valency 2, water must be H2O to balance the charges.",
    "example": "Sodium has valency 1 and chlorine has valency 1, so they combine in a 1:1 ratio to form sodium chloride (NaCl). Calcium has valency 2 and chlorine has valency 1, so they combine in a 1:2 ratio to form calcium chloride (CaCl2).",
    "faqs": [
      {
        "q": "How does valency relate to the periodic table?",
        "a": "Elements in the same group (vertical column) of the periodic table have the same number of valence electrons and thus similar valencies."
      },
      {
        "q": "Can an element have multiple valencies?",
        "a": "Yes, some elements like iron and copper can have different valencies in different compounds, depending on how many electrons they lose or share."
      }
    ]
  },
  {
    "slug": "acid",
    "term": "Acid",
    "category": "Chemistry",
    "classLevel": "Class 7",
    "definition": "A substance that contains hydrogen ions and turns blue litmus paper red, with pH less than 7.",
    "explanation": "Acids are compounds that release hydrogen ions (H+) when dissolved in water. Common acids include hydrochloric acid in the stomach, citric acid in lemons, and acetic acid in vinegar. The strength of an acid depends on how completely it releases hydrogen ions. Strong acids like hydrochloric acid completely dissociate, while weak acids like acetic acid only partially dissociate. Acids react with bases to form salt and water in neutralization reactions. In India, the pH scale is taught to measure acidity, where pH 0-6 indicates acidic substances, pH 7 is neutral, and pH 8-14 indicates basic substances.",
    "example": "Lemon juice contains citric acid, which makes it sour. When you add lemon juice to blue litmus paper, it turns red, confirming the presence of acid.",
    "faqs": [
      {
        "q": "What makes a substance acidic?",
        "a": "A substance is acidic when it contains hydrogen ions (H+) that are released when it dissolves in water, or when its pH is less than 7."
      },
      {
        "q": "Are all acids dangerous?",
        "a": "No, some acids like citric acid in fruits are safe to eat, while others like sulfuric acid are extremely dangerous and corrosive."
      }
    ]
  },
  {
    "slug": "base",
    "term": "Base",
    "category": "Chemistry",
    "classLevel": "Class 7",
    "definition": "A substance that contains hydroxide ions and turns red litmus paper blue, with pH greater than 7.",
    "explanation": "Bases are compounds that release hydroxide ions (OH-) when dissolved in water or accept hydrogen ions. Common bases include sodium hydroxide in caustic soda, ammonia in cleaning products, and lime in construction. Strong bases like sodium hydroxide completely dissociate and can be corrosive, while weak bases like ammonia partially dissociate. Bases feel slippery and have a bitter taste. Bases react with acids in neutralization reactions to produce salts and water. Understanding acids and bases is essential for chemistry, as they participate in countless reactions.",
    "example": "Baking soda is a mild base. When you add it to red litmus paper, it turns blue, confirming the presence of a base.",
    "faqs": [
      {
        "q": "What is the difference between bases and alkalis?",
        "a": "Bases are compounds that accept hydrogen ions; alkalis are soluble bases that dissolve in water and release hydroxide ions."
      },
      {
        "q": "Why do bases feel slippery?",
        "a": "Bases interact with the oils and proteins in your skin, breaking them down and creating a slippery sensation."
      }
    ]
  },
  {
    "slug": "oxidation",
    "term": "Oxidation",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "The loss of electrons by an atom or molecule, usually accompanied by an increase in oxidation state.",
    "explanation": "Oxidation was originally defined as combination with oxygen, but the modern definition involves electron transfer. In oxidation reactions, a substance loses electrons and its oxidation state increases. Oxidation always occurs with reduction, where another substance gains those electrons. These coupled reactions are called redox reactions. Oxidation can damage cells and tissues through oxidative stress, which is why antioxidants in fruits are beneficial. Combustion, rusting of iron, and breathing are all oxidation reactions occurring in daily life.",
    "example": "When iron rusts, it oxidizes by losing electrons to oxygen. The iron's oxidation state increases from 0 to +2 or +3, while oxygen is reduced by gaining electrons.",
    "faqs": [
      {
        "q": "Is oxidation always harmful?",
        "a": "No, oxidation is a necessary chemical process. While oxidative stress can be harmful, many beneficial oxidation reactions occur in our bodies, like energy production."
      },
      {
        "q": "Can oxidation occur without oxygen?",
        "a": "Yes, modern chemistry defines oxidation as the loss of electrons, not specifically loss to oxygen. Oxidation can occur with other elements like sulfur and chlorine."
      }
    ]
  },
  {
    "slug": "catalyst",
    "term": "Catalyst",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "A substance that increases the rate of a chemical reaction without being consumed in the reaction.",
    "explanation": "Catalysts work by lowering the activation energy needed for a reaction to occur, allowing more molecules to react at a given temperature. They are not changed by the reaction, so the same catalyst can be used repeatedly. Enzymes are biological catalysts that speed up reactions in living organisms. Industrial processes use catalysts to increase production efficiency; for example, ammonia production uses iron as a catalyst. Understanding catalysts is crucial for chemistry, biology, and industrial applications. Different catalysts are required for different reactions, and some catalysts are specific to particular reactions.",
    "example": "Manganese dioxide catalyzes the decomposition of hydrogen peroxide. Adding manganese dioxide speeds up the reaction dramatically, but the manganese dioxide remains unchanged and can be used again.",
    "faqs": [
      {
        "q": "How does a catalyst speed up a reaction?",
        "a": "A catalyst lowers the activation energy by providing an alternative reaction pathway, allowing more molecules to have enough energy to react."
      },
      {
        "q": "Are catalysts consumed in chemical reactions?",
        "a": "No, catalysts are not consumed; they emerge unchanged from the reaction and can catalyze the reaction repeatedly."
      }
    ]
  },
  {
    "slug": "isotope",
    "term": "Isotope",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "Atoms of the same element that have different numbers of neutrons and therefore different mass numbers.",
    "explanation": "Isotopes have the same number of protons (same element) but different numbers of neutrons (different mass). Since chemical properties depend on electrons and protons, isotopes have identical chemical properties but different physical properties and nuclear stability. Some isotopes are radioactive and decay over time, emitting radiation. Carbon-12 and Carbon-14 are isotopes of carbon; while Carbon-12 is stable, Carbon-14 is radioactive and is used for radiocarbon dating. Isotopes have practical applications in medicine, dating, and energy production.",
    "example": "Chlorine has two main isotopes: Chlorine-35 with 18 neutrons and Chlorine-37 with 20 neutrons. Both have 17 protons but different mass numbers due to different neutron counts.",
    "faqs": [
      {
        "q": "Why do isotopes of the same element behave differently?",
        "a": "Chemical behavior depends on electrons and protons, which are the same in isotopes. Physical properties differ because isotopes have different masses due to different neutron counts."
      },
      {
        "q": "Are all isotopes radioactive?",
        "a": "No, many isotopes are stable and non-radioactive. For example, Oxygen-16 is stable, but some heavier elements have no stable isotopes."
      }
    ]
  },
  {
    "slug": "integer",
    "term": "Integer",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A whole number that can be positive, negative, or zero.",
    "explanation": "Integers include all positive whole numbers like 1, 2, 3, all negative whole numbers like -1, -2, -3, and zero. Integers do not include fractions or decimals. The set of integers is denoted by the symbol Z. Integers are used extensively in mathematics, computer science, and daily life for counting, temperature measurements, money transactions, and elevations. Understanding integers is fundamental for learning algebra, as variables often represent integer values. Operations like addition, subtraction, and multiplication of integers always produce integer results.",
    "example": "The integers from -3 to 3 are: -3, -2, -1, 0, 1, 2, 3. The number 2.5 is not an integer because it contains a decimal part.",
    "faqs": [
      {
        "q": "Is zero an integer?",
        "a": "Yes, zero is an integer. It is the neutral element for addition and is neither positive nor negative."
      },
      {
        "q": "Are fractions or decimals considered integers?",
        "a": "No, integers must be whole numbers. Any number with a fractional or decimal part is not an integer."
      }
    ]
  },
  {
    "slug": "rational-number",
    "term": "Rational Number",
    "category": "Maths",
    "classLevel": "Class 8",
    "definition": "A number that can be expressed as a fraction p/q, where p and q are integers and q is not zero.",
    "explanation": "Rational numbers include integers, fractions, and repeating or terminating decimals. Any integer can be written as a fraction with denominator 1, so all integers are rational numbers. Rational numbers are closed under addition, subtraction, multiplication, and division (except by zero). The set of rational numbers is denoted by Q. Rational numbers can be represented on a number line between integers. Examples include 1/2, 3/4, -2/3, and 5 (which equals 5/1). Understanding rational numbers is crucial for solving real-world problems involving parts of wholes.",
    "example": "The fraction 3/4 is a rational number representing three-quarters. The decimal 0.75 is also a rational number because it equals 3/4. Both -2 and -2/1 are rational numbers.",
    "faqs": [
      {
        "q": "Are all fractions rational numbers?",
        "a": "Yes, all fractions with integer numerator and non-zero integer denominator are rational numbers by definition."
      },
      {
        "q": "What about decimals like 0.333...?",
        "a": "Repeating decimals like 0.333... (which equals 1/3) are rational numbers because they can be expressed as fractions."
      }
    ]
  },
  {
    "slug": "irrational-number",
    "term": "Irrational Number",
    "category": "Maths",
    "classLevel": "Class 8",
    "definition": "A number that cannot be expressed as a fraction p/q with integer values, and has a non-repeating, non-terminating decimal expansion.",
    "explanation": "Irrational numbers cannot be written as exact fractions but can only be approximated. Common examples include pi (approximately 3.14159...) and the square root of 2 (approximately 1.414...). The number pi is fundamental in geometry for calculating circle properties. The square root of 2 appears frequently in geometry and is the first number historically proven to be irrational. Irrational numbers, combined with rational numbers, form the set of real numbers. Most numbers involving square roots, cube roots, and transcendental numbers are irrational.",
    "example": "Pi is an irrational number approximately equal to 3.14159265... The digits continue forever without repeating, so pi cannot be expressed as a simple fraction.",
    "faqs": [
      {
        "q": "How do you know a number is irrational?",
        "a": "If a number cannot be expressed as p/q (fraction) and its decimal expansion never repeats or terminates, it is irrational."
      },
      {
        "q": "Is the square root of 4 irrational?",
        "a": "No, the square root of 4 equals 2, which is a rational number (integer). Only square roots of non-perfect squares are irrational."
      }
    ]
  },
  {
    "slug": "prime-number",
    "term": "Prime Number",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A natural number greater than 1 that has no positive divisors other than 1 and itself.",
    "explanation": "Prime numbers are the building blocks of all natural numbers. The first few prime numbers are 2, 3, 5, 7, 11, 13, 17, 19, 23, and 29. The number 2 is the only even prime number; all other primes are odd. Prime numbers are infinitely many, as proven by Euclid. Every natural number greater than 1 can be expressed as a unique product of prime numbers, called prime factorization. Finding large prime numbers is important for computer security and encryption. In Indian mathematics education, identifying primes and factorization is a fundamental skill.",
    "example": "The number 17 is prime because its only divisors are 1 and 17. The number 15 is not prime because it can be divided by 1, 3, 5, and 15.",
    "faqs": [
      {
        "q": "Is 1 a prime number?",
        "a": "No, by definition prime numbers must be greater than 1. The number 1 is neither prime nor composite."
      },
      {
        "q": "What is the largest prime number?",
        "a": "There is no largest prime number; infinitely many primes exist. However, the largest known prime has millions of digits."
      }
    ]
  },
  {
    "slug": "composite-number",
    "term": "Composite Number",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A natural number greater than 1 that has at least one positive divisor other than 1 and itself.",
    "explanation": "Composite numbers can be factored into smaller natural numbers. They are the opposite of prime numbers. Examples include 4, 6, 8, 9, 10, 12, and 15. Every composite number can be expressed as a product of prime numbers in a unique way. For example, 12 = 2 x 2 x 3. The smallest composite number is 4. Understanding composite numbers helps in finding greatest common divisors and least common multiples, which are important for solving fraction problems. Every natural number greater than 1 is either prime or composite.",
    "example": "The number 12 is composite because it can be divided by 1, 2, 3, 4, 6, and 12. The prime factorization of 12 is 2 x 2 x 3.",
    "faqs": [
      {
        "q": "Is every even number composite?",
        "a": "No, the number 2 is even and prime. All even numbers greater than 2 are composite."
      },
      {
        "q": "What is the relationship between primes and composites?",
        "a": "Every natural number greater than 1 is either prime or composite. Primes cannot be factored, while composites are products of primes."
      }
    ]
  },
  {
    "slug": "polynomial",
    "term": "Polynomial",
    "category": "Maths",
    "classLevel": "Class 9",
    "definition": "An algebraic expression consisting of variables and constants combined using addition, subtraction, and multiplication.",
    "explanation": "Polynomials are fundamental in algebra and have variables raised to non-negative integer powers with integer or real coefficients. Examples include x^2 + 3x + 2, 4y^3 - 2y + 5, and simply 7. The degree of a polynomial is the highest power of the variable; for example, 2x^3 + x^2 - 5 has degree 3. Polynomials with one variable are the focus of Class 9 mathematics. Operations like addition, subtraction, and multiplication can be performed on polynomials. Polynomials are used extensively in science and engineering to model real-world phenomena.",
    "example": "The expression 2x^2 + 5x + 3 is a polynomial of degree 2 with three terms. The coefficients are 2, 5, and 3.",
    "faqs": [
      {
        "q": "What is the degree of a polynomial?",
        "a": "The degree is the highest power to which a variable is raised in the polynomial. For 3x^4 - 2x^2 + 1, the degree is 4."
      },
      {
        "q": "Can a polynomial have negative powers?",
        "a": "No, by definition polynomials have only non-negative integer powers. Expressions with negative powers are rational expressions, not polynomials."
      }
    ]
  },
  {
    "slug": "probability",
    "term": "Probability",
    "category": "Maths",
    "classLevel": "Class 9",
    "definition": "A measure of the likelihood that an event will occur, expressed as a number between 0 and 1.",
    "explanation": "Probability is calculated as the ratio of favorable outcomes to total possible outcomes. An event with probability 0 is impossible, while probability 1 means the event is certain. Probability 0.5 or 50% means the event is equally likely to happen or not happen. For example, a fair coin toss has probability 0.5 for heads and 0.5 for tails. Probability is used in statistics, risk assessment, games, and weather forecasting. Understanding probability helps students make informed decisions in uncertain situations. The sum of probabilities of all possible outcomes must equal 1.",
    "example": "If you roll a fair six-sided die, the probability of getting a 3 is 1/6 because there is 1 favorable outcome (rolling a 3) out of 6 possible outcomes.",
    "faqs": [
      {
        "q": "What is the difference between theoretical and experimental probability?",
        "a": "Theoretical probability is calculated using known outcomes, while experimental probability is based on actual repeated trials."
      },
      {
        "q": "Can probability be greater than 1?",
        "a": "No, probability must be between 0 and 1 inclusive. A probability greater than 1 is impossible and indicates an error."
      }
    ]
  },
  {
    "slug": "mean",
    "term": "Mean",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "The average of a set of numbers, calculated by adding all numbers and dividing by how many numbers there are.",
    "explanation": "The mean is one of the most common measures of central tendency used to describe a data set. To find the mean, sum all values and divide by the count of values. For example, the mean of 2, 4, 6, 8 is (2+4+6+8)/4 = 5. The mean is useful for summarizing data but can be affected by extreme values called outliers. If one value is much larger or smaller than others, it can skew the mean. In Indian schools, calculating mean is a basic statistical skill taught in Class 7. Mean is used in science, business, and sports for analyzing data.",
    "example": "The test scores are 75, 80, 85, 90, and 95. The mean score is (75+80+85+90+95)/5 = 425/5 = 85.",
    "faqs": [
      {
        "q": "How does the mean differ from median?",
        "a": "The mean is the average of all values, while the median is the middle value when arranged in order. They can be different if there are outliers."
      },
      {
        "q": "Why can mean be misleading?",
        "a": "Extreme outliers can skew the mean significantly. For example, if most people earn 100 rupees but one person earns 1000 rupees, the mean would be misleadingly high."
      }
    ]
  },
  {
    "slug": "median",
    "term": "Median",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "The middle value in a set of numbers arranged in order from smallest to largest.",
    "explanation": "To find the median, arrange numbers in order and identify the middle value. If there is an even number of values, the median is the average of the two middle values. For example, in the set 3, 7, 9, the median is 7. In the set 2, 4, 6, 8, the median is (4+6)/2 = 5. The median is often preferred over the mean when there are outliers because it is not affected by extreme values. Understanding median along with mean helps students describe data sets accurately and choose appropriate statistics for different situations.",
    "example": "The heights in centimeters are 150, 160, 165, 170, 175. The median height is 165 cm because it is the middle value in the ordered list.",
    "faqs": [
      {
        "q": "How do you find median with even number of values?",
        "a": "Find the two middle values and calculate their average. For example, the median of 1, 3, 5, 7 is (3+5)/2 = 4."
      },
      {
        "q": "When is median better than mean?",
        "a": "Median is better when data has outliers because it is not affected by extreme values, whereas mean can be significantly skewed by outliers."
      }
    ]
  },
  {
    "slug": "mode",
    "term": "Mode",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "The value that appears most frequently in a set of data.",
    "explanation": "Mode is useful for identifying the most common value in a data set. A data set can have one mode (unimodal), two modes (bimodal), or multiple modes (multimodal). If no value repeats, there is no mode. For example, in the set 1, 2, 2, 3, 3, 3, 4, the mode is 3 because it appears most frequently. Mode is particularly useful for categorical data like colors or preferences. Unlike mean and median which must be numbers, mode can apply to non-numeric data as well. Mode is often used in surveys and opinion polls.",
    "example": "In a class of 30 students, 12 prefer ice cream, 10 prefer cake, and 8 prefer candy. The mode preference is ice cream because it is chosen most frequently.",
    "faqs": [
      {
        "q": "Can there be more than one mode?",
        "a": "Yes, if multiple values appear with the same highest frequency, the data set is multimodal with multiple modes."
      },
      {
        "q": "What if all values appear equally?",
        "a": "If all values appear with the same frequency, technically all are modes. But often it is said there is no mode in such cases."
      }
    ]
  },
  {
    "slug": "hcf",
    "term": "HCF (Highest Common Factor)",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "The largest number that divides two or more numbers without leaving a remainder.",
    "explanation": "HCF is also called GCD or Greatest Common Divisor. To find HCF, list all factors of each number and identify the largest common factor. For example, factors of 12 are 1, 2, 3, 4, 6, 12 and factors of 18 are 1, 2, 3, 6, 9, 18, so HCF is 6. HCF is useful for simplifying fractions; for example, 12/18 can be reduced to 2/3 by dividing both by their HCF of 6. Finding HCF helps solve real-world problems like dividing items into equal groups. The Euclidean algorithm is an efficient method for finding HCF of large numbers.",
    "example": "The HCF of 24 and 36 is 12 because 12 is the largest number that divides both 24 and 36 evenly.",
    "faqs": [
      {
        "q": "What is the HCF of two prime numbers?",
        "a": "The HCF of two different prime numbers is always 1 because prime numbers only share the factor 1."
      },
      {
        "q": "How does HCF help with fractions?",
        "a": "HCF helps reduce fractions to simplest form by dividing both numerator and denominator by their HCF."
      }
    ]
  },
  {
    "slug": "lcm",
    "term": "LCM (Least Common Multiple)",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "The smallest number that is a multiple of two or more given numbers.",
    "explanation": "LCM is the least common multiple that two or more numbers can divide. To find LCM, list multiples of each number until a common multiple appears. For example, multiples of 4 are 4, 8, 12, 16, 20 and multiples of 6 are 6, 12, 18, so LCM is 12. LCM is useful for adding and subtracting fractions with different denominators; you find the LCM of denominators to get the common denominator. For example, to add 1/4 + 1/6, the LCM of 4 and 6 is 12, so you rewrite as 3/12 + 2/12 = 5/12. Prime factorization method is efficient for finding LCM of large numbers.",
    "example": "The LCM of 6 and 8 is 24 because 24 is the smallest number that both 6 and 8 divide into evenly.",
    "faqs": [
      {
        "q": "What is the relationship between HCF and LCM?",
        "a": "For any two numbers a and b: HCF(a,b) x LCM(a,b) = a x b. This relationship helps verify calculations."
      },
      {
        "q": "When do you need LCM in real life?",
        "a": "LCM is used when adding fractions, finding common time periods like when events occur together, and scheduling problems."
      }
    ]
  },
  {
    "slug": "matter",
    "term": "Matter",
    "category": "Science",
    "classLevel": "Class 6",
    "definition": "Anything that has mass and occupies space.",
    "explanation": "Matter exists in three main states: solid, liquid, and gas. Solids have a fixed shape and volume, liquids have fixed volume but take the shape of their container, and gases have neither fixed shape nor volume. Matter is made of particles called atoms and molecules that are in constant motion. The state of matter depends on temperature and pressure. Water is a common example that can exist as solid ice, liquid water, and gaseous steam. Matter can change from one state to another, like melting when heated or freezing when cooled. Understanding matter is fundamental to chemistry and physics.",
    "example": "Ice is a solid that melts into liquid water when heated, which then evaporates into water vapor gas when heated further. All three states are the same substance, just in different forms.",
    "faqs": [
      {
        "q": "What is the difference between mass and weight?",
        "a": "Mass is the amount of matter in an object and does not change. Weight is the force of gravity on that mass and can change with location."
      },
      {
        "q": "Are there more than three states of matter?",
        "a": "Yes, plasma is a fourth state where atoms lose electrons, but the three main states (solid, liquid, gas) are taught in schools."
      }
    ]
  },
  {
    "slug": "density",
    "term": "Density",
    "category": "Science",
    "classLevel": "Class 8",
    "definition": "The mass of a substance per unit volume, calculated as mass divided by volume.",
    "explanation": "Density indicates how tightly packed the particles of a substance are. Objects with higher density are heavier for their size. Water has a density of 1 gram per milliliter, which is used as a reference standard. Lead is much denser than water, so it sinks, while cork is less dense than water, so it floats. Density varies with temperature; when water is heated, it becomes less dense and expands. Understanding density helps predict whether objects float or sink. In Indian science education, calculating density and understanding its applications is important for Class 8 onwards.",
    "example": "A cubic centimeter of gold has much greater mass than a cubic centimeter of water because gold is denser. Gold sinks while water floats, showing the relationship between density and buoyancy.",
    "faqs": [
      {
        "q": "Why does density affect floating?",
        "a": "Objects less dense than water displace a volume of water equal to their weight, making them float. Denser objects sink."
      },
      {
        "q": "How does temperature affect density?",
        "a": "As temperature increases, particles move faster and spread apart, usually decreasing density. Cold objects are generally denser."
      }
    ]
  },
  {
    "slug": "evaporation",
    "term": "Evaporation",
    "category": "Science",
    "classLevel": "Class 6",
    "definition": "The process by which liquid water changes into water vapor when heated.",
    "explanation": "Evaporation is a phase change where liquid water particles gain energy from heat and escape into the air as invisible water vapor. This process occurs at the surface of water bodies and is essential for the water cycle. Evaporation increases with temperature, sunlight, wind, and surface area. Clothes dry due to evaporation of water. Sweat on skin evaporates to cool the body. Evaporation requires energy called latent heat of vaporization. This is different from boiling, which occurs at a specific temperature throughout the liquid. Understanding evaporation is crucial for learning about the water cycle and weather patterns.",
    "example": "After rain, puddles on the ground disappear as water evaporates into the atmosphere. You do not see the water vapor, but it is there in the air.",
    "faqs": [
      {
        "q": "What is the difference between evaporation and boiling?",
        "a": "Evaporation happens at the surface at any temperature, while boiling occurs throughout the liquid at a specific temperature."
      },
      {
        "q": "Why does sweat on your skin cool you?",
        "a": "Sweat evaporates and takes heat energy from your body, lowering your temperature through this cooling effect."
      }
    ]
  },
  {
    "slug": "condensation",
    "term": "Condensation",
    "category": "Science",
    "classLevel": "Class 6",
    "definition": "The process by which water vapor changes into liquid water when cooled.",
    "explanation": "Condensation is the opposite of evaporation and occurs when water vapor loses energy and cools below its dew point. The dew point is the temperature at which water vapor becomes liquid. Common examples include water droplets forming on cold windows, morning dew on grass, and clouds forming in the sky. When you exhale warm breath on a cold mirror, the water vapor condenses into liquid water droplets. Condensation is a crucial part of the water cycle, returning water from the atmosphere to Earth. Understanding condensation helps explain weather phenomena and the continuous cycling of water.",
    "example": "On a cold morning, water vapor in the air condenses into liquid water droplets on grass and spider webs, forming what we see as dew.",
    "faqs": [
      {
        "q": "What causes dew to form?",
        "a": "During the night, air temperature drops below the dew point, causing water vapor in the air to condense into liquid water droplets on surfaces."
      },
      {
        "q": "How are evaporation and condensation related?",
        "a": "They are opposite processes that are both part of the water cycle. Evaporation removes water from surfaces, and condensation returns it from the atmosphere."
      }
    ]
  },
  {
    "slug": "democracy",
    "term": "Democracy",
    "category": "Social Science",
    "classLevel": "Class 9",
    "definition": "A system of government in which power rests with the people, who exercise control either directly or through elected representatives.",
    "explanation": "In a democracy, citizens have the right to participate in government through voting and elections. India is a democratic nation with a Constitution that guarantees fundamental rights to all citizens. There are two main types: direct democracy where citizens vote on every issue, and representative democracy like India where citizens elect representatives to make decisions. Democracy ensures that no single person or group can rule without the consent of the governed. The basic principles of democracy include equality before law, freedom of speech, and protection of minority rights. Democratic governments are accountable to the people and can be removed if they do not serve the public interest.",
    "example": "India is a democratic country where citizens vote in elections every five years to choose their representatives in Parliament and state assemblies.",
    "faqs": [
      {
        "q": "What is the difference between direct and representative democracy?",
        "a": "Direct democracy requires citizens to vote on all major issues. Representative democracy has citizens elect leaders who make decisions on their behalf."
      },
      {
        "q": "What are the basic features of democracy?",
        "a": "Universal adult suffrage (right to vote), free and fair elections, protection of rights, rule of law, and peaceful transfer of power."
      }
    ]
  },
  {
    "slug": "federalism",
    "term": "Federalism",
    "category": "Social Science",
    "classLevel": "Class 9",
    "definition": "A system of government in which power is divided between a central government and state or regional governments.",
    "explanation": "In a federal system, both the central government and state governments have separate powers and responsibilities defined by the constitution. India is a federal nation where power is divided between the Union government and state governments. The Indian Constitution lists three lists of subjects: Union List (central government), State List (state governments), and Concurrent List (both). Federalism protects regional interests while maintaining national unity. It prevents concentration of power in one place and allows states to govern according to local needs while following national policies. This system enables large, diverse nations to function democratically.",
    "example": "In India, the central government controls defense and foreign policy, state governments control education and police within their states, and both share responsibility for matters in the Concurrent List.",
    "faqs": [
      {
        "q": "Why is federalism important?",
        "a": "Federalism distributes power to prevent concentration, respects regional diversity, and allows local governance while maintaining national unity."
      },
      {
        "q": "How does federalism protect minority groups?",
        "a": "States can protect regional and cultural minorities by making policies suited to their local population under their constitutional powers."
      }
    ]
  },
  {
    "slug": "gdp",
    "term": "GDP (Gross Domestic Product)",
    "category": "Social Science",
    "classLevel": "Class 11",
    "definition": "The total monetary value of all finished goods and services produced within a country in a specific time period.",
    "explanation": "GDP is the primary measure of a country's economic health and overall output. It includes goods and services produced by both citizens and non-citizens within the country's borders. A higher GDP generally indicates a stronger economy, though GDP per capita (divided by population) gives a better indication of individual prosperity. GDP growth shows whether an economy is expanding or contracting. For India, GDP is measured in rupees and is an important indicator of economic development. GDP does not include the value of unpaid work or environmental costs, so it has limitations in measuring true prosperity.",
    "example": "If India produces goods and services worth 250 trillion rupees in a year, the GDP is 250 trillion rupees. If the next year it produces 265 trillion rupees, the GDP growth is 6%.",
    "faqs": [
      {
        "q": "What is the difference between GDP and GNP?",
        "a": "GDP measures production within a country's borders. GNP measures production by a country's citizens regardless of location."
      },
      {
        "q": "Why is GDP important for a country?",
        "a": "GDP indicates economic strength, helps set policies, attracts investments, and shows whether people have more economic opportunities."
      }
    ]
  },
  {
    "slug": "inflation",
    "term": "Inflation",
    "category": "Social Science",
    "classLevel": "Class 11",
    "definition": "The sustained increase in the general price level of goods and services in an economy over time.",
    "explanation": "Inflation means the purchasing power of money decreases; the same amount of money buys fewer goods over time. Moderate inflation of 2-3% annually is considered healthy for an economy, but high inflation hurts the poor the most as their savings lose value. The Reserve Bank of India uses tools like adjusting interest rates to control inflation. India has experienced high inflation, particularly in food and fuel prices. Understanding inflation is important for making financial decisions like savings and loans. When inflation rises, the real value of savings decreases unless interest rates on savings exceed the inflation rate.",
    "example": "If a pen costs 10 rupees today and inflation is 10% per year, the same pen will cost approximately 11 rupees next year. Money becomes worth less.",
    "faqs": [
      {
        "q": "Who is hurt most by inflation?",
        "a": "Poor people and those on fixed incomes are hurt most because their purchasing power decreases and they cannot easily increase their income."
      },
      {
        "q": "How does inflation affect loans and savings?",
        "a": "High inflation reduces the real value of savings. Borrowers benefit if they repay loans with money that is worth less, but savers lose."
      }
    ]
  },
  {
    "slug": "monsoon",
    "term": "Monsoon",
    "category": "Social Science",
    "classLevel": "Class 7",
    "definition": "A seasonal wind system that brings heavy rainfall to a region, particularly in tropical areas.",
    "explanation": "The monsoon in India is a crucial weather phenomenon that affects agriculture, water availability, and the economy. The Southwest Monsoon brings most of India's annual rainfall from June to September. The Northeast Monsoon brings less rain to coastal areas from October to December. Monsoons result from differential heating of land and oceans causing wind direction reversal. Ancient Indian farmers depended entirely on monsoons for irrigation and crops. Failure of monsoon rains can cause droughts and famines, while excess rainfall can cause flooding. Understanding monsoons is essential for Indian geography and agriculture.",
    "example": "In India, the Southwest Monsoon arrives in June bringing heavy rains that fill reservoirs and allow farmers to plant crops. Without this monsoon, agriculture would fail.",
    "faqs": [
      {
        "q": "Why does monsoon rain occur?",
        "a": "Land heats faster than oceans, creating pressure differences that cause winds to blow from the ocean toward land, bringing moisture and rain."
      },
      {
        "q": "How important is monsoon to Indian agriculture?",
        "a": "Monsoon is critical; about 80% of India's rainfall comes from the Southwest Monsoon, making it essential for farming and water supply."
      }
    ]
  },
  {
    "slug": "latitude",
    "term": "Latitude",
    "category": "Social Science",
    "classLevel": "Class 6",
    "definition": "The angular distance of a location north or south of the equator, measured in degrees.",
    "explanation": "Latitude lines run east to west parallel to the equator, with the equator at 0 degrees, the North Pole at 90 degrees north, and the South Pole at 90 degrees south. Latitude determines the climate zone; tropical regions near the equator have hot climates, while polar regions have cold climates. India is located between 8 and 35 degrees north latitude. Lines of latitude help locate places precisely on maps and globes. Countries at the same latitude typically have similar climates. Understanding latitude is fundamental to geography and helps explain climate variations across Earth.",
    "example": "The equator is at latitude 0 degrees. India spans from about 8 degrees north to 35 degrees north latitude, which is why north India is colder than south India.",
    "faqs": [
      {
        "q": "What is the difference between latitude and longitude?",
        "a": "Latitude measures distance north or south of the equator. Longitude measures distance east or west of the Prime Meridian."
      },
      {
        "q": "How does latitude affect climate?",
        "a": "Regions near the equator receive more direct sunlight and are warmer. Regions near poles receive indirect sunlight and are colder."
      }
    ]
  },
  {
    "slug": "longitude",
    "term": "Longitude",
    "category": "Social Science",
    "classLevel": "Class 6",
    "definition": "The angular distance of a location east or west of the Prime Meridian, measured in degrees.",
    "explanation": "Longitude lines run north to south, with the Prime Meridian at 0 degrees (passing through Greenwich in England), 180 degrees east, and 180 degrees west being the same meridian. India extends from about 68 to 97 degrees east longitude. Lines of longitude help determine time zones; each 15 degrees of longitude represents one hour of time difference. Combined with latitude, longitude provides precise geographic coordinates for any location. Indian Standard Time is based on 82.5 degrees east longitude, ensuring the same time across India. Understanding longitude is essential for navigation, mapping, and understanding global time differences.",
    "example": "India extends from 68 degrees east to 97 degrees east longitude. The Prime Meridian at 0 degrees runs through Greenwich in England.",
    "faqs": [
      {
        "q": "What is the Prime Meridian?",
        "a": "The Prime Meridian is the line of longitude at 0 degrees, passing through Greenwich, England. It is the reference line for measuring all other longitudes."
      },
      {
        "q": "How do latitude and longitude locate places?",
        "a": "A place's exact location is given by its latitude (north-south position) and longitude (east-west position), creating a coordinate system."
      }
    ]
  },
  {
    "slug": "noun",
    "term": "Noun",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that represents a person, place, thing, or idea.",
    "explanation": "Nouns are one of the basic parts of speech and form the foundation of sentences. Common nouns refer to general people or things like 'girl' and 'book', while proper nouns are specific names like 'Priya' and 'Delhi'. Abstract nouns represent ideas or emotions like 'love' and 'courage'. Collective nouns refer to groups like 'team' or 'flock'. Nouns can be singular (one) or plural (many). Every sentence needs at least one noun. In English writing, correctly identifying and using nouns is essential for clear communication.",
    "example": "In the sentence 'Raj bought a new book from the library,' the nouns are 'Raj' (proper noun, person), 'book' (common noun, thing), and 'library' (common noun, place).",
    "faqs": [
      {
        "q": "What is the difference between common and proper nouns?",
        "a": "Common nouns are general like 'dog' and 'city'. Proper nouns are specific names like 'Rover' and 'Mumbai', and are capitalized."
      },
      {
        "q": "Are numbers and directions nouns?",
        "a": "Yes, numbers like 'five' and directions like 'north' are nouns because they represent things or ideas."
      }
    ]
  },
  {
    "slug": "verb",
    "term": "Verb",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that expresses an action, state of being, or occurrence.",
    "explanation": "Verbs are essential parts of speech that describe what someone or something does or is. Action verbs like 'run', 'write', and 'eat' describe physical or mental actions. Linking verbs like 'is', 'are', and 'seem' describe a state of being. Helping verbs like 'have', 'do', and 'will' work with main verbs to form different tenses. Every sentence must have a verb. Verbs change form based on tense (past, present, future) and the subject (singular or plural). Understanding verbs is crucial for writing correct sentences.",
    "example": "In the sentence 'She plays cricket every day,' the verb is 'plays', which shows the action that the subject (she) performs.",
    "faqs": [
      {
        "q": "What is the difference between action and linking verbs?",
        "a": "Action verbs show what someone does like 'jump'. Linking verbs show state of being like 'is'."
      },
      {
        "q": "What is a helping verb?",
        "a": "A helping verb (auxiliary verb) works with a main verb to show tense or mood, like 'has' in 'has gone'."
      }
    ]
  },
  {
    "slug": "adjective",
    "term": "Adjective",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that modifies or describes a noun, providing more information about it.",
    "explanation": "Adjectives modify nouns by describing their qualities, sizes, colors, quantities, or states. Examples include 'beautiful', 'small', 'red', 'five', and 'happy'. Adjectives usually come before the noun they describe in English. Multiple adjectives can describe one noun, like 'a beautiful, red rose'. Adjectives help make writing more vivid and interesting by providing details. Comparative adjectives (bigger, more beautiful) compare two things, while superlative adjectives (biggest, most beautiful) compare three or more. Understanding adjectives improves descriptive writing.",
    "example": "In the sentence 'The old, brown dog barked loudly,' the adjectives are 'old' and 'brown', which describe the noun 'dog'.",
    "faqs": [
      {
        "q": "Where do adjectives usually go in a sentence?",
        "a": "Adjectives usually come before the noun they describe, like 'green apple', though they can also come after linking verbs like 'The apple is green'."
      },
      {
        "q": "What is the difference between comparative and superlative adjectives?",
        "a": "Comparative adjectives compare two things (bigger), while superlative adjectives compare three or more (biggest)."
      }
    ]
  },
  {
    "slug": "metaphor",
    "term": "Metaphor",
    "category": "English",
    "classLevel": "Class 8",
    "definition": "A figure of speech that describes one thing as if it were something else, without using 'like' or 'as'.",
    "explanation": "Metaphors create vivid comparisons between two different things by saying one thing is another. For example, 'Time is money' or 'Life is a journey'. Unlike similes which use 'like' or 'as', metaphors make a direct comparison. Metaphors are powerful writing tools because they help readers understand ideas by comparing them to familiar things. Dead metaphors are overused metaphors like 'drowning in homework' that have lost their impact. Understanding metaphors helps appreciate poetry and literature. Mixed metaphors occur when two different metaphors are confused, creating confusion.",
    "example": "The sentence 'Her voice was music to my ears' is a metaphor comparing her voice to music, meaning she sounded pleasant.",
    "faqs": [
      {
        "q": "What is the difference between metaphor and simile?",
        "a": "A metaphor says something IS something else, while a simile says something is LIKE something else using 'like' or 'as'."
      },
      {
        "q": "Why do writers use metaphors?",
        "a": "Metaphors make writing more interesting and help readers understand abstract ideas by comparing them to concrete, familiar things."
      }
    ]
  },
  {
    "slug": "simile",
    "term": "Simile",
    "category": "English",
    "classLevel": "Class 8",
    "definition": "A figure of speech that compares two different things using 'like' or 'as'.",
    "explanation": "Similes make comparisons between two things that are different but share a common quality. They use the words 'like' or 'as' to make the comparison clear. For example, 'brave as a lion' or 'quiet like a mouse'. Similes are easier to understand than metaphors because they explicitly signal that a comparison is being made. They help readers visualize ideas and make writing more engaging. Similes are common in poetry, literature, and everyday speech. Understanding similes improves reading comprehension and writing ability.",
    "example": "The simile 'The snow was as white as milk' compares snow to milk using 'as', showing that both are very white.",
    "faqs": [
      {
        "q": "How do you identify a simile?",
        "a": "Look for the words 'like' or 'as' making a comparison between two things. For example, 'as strong as an ox'."
      },
      {
        "q": "Can similes use other comparison words?",
        "a": "No, similes specifically use 'like' or 'as'. Other comparison words create different figures of speech."
      }
    ]
  },
  {
    "slug": "synonym",
    "term": "Synonym",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that has the same or nearly the same meaning as another word.",
    "explanation": "Synonyms allow writers to vary their language and avoid repetition. For example, 'happy' and 'joyful' are synonyms. Not all synonyms are perfect replacements because they may have slightly different connotations or be used in different contexts. 'Big' and 'enormous' are synonyms, but 'enormous' expresses greater size. Learning synonyms enriches vocabulary and improves writing. A thesaurus is a helpful tool for finding synonyms. Understanding synonyms helps with word choices that express exactly what is meant.",
    "example": "The words 'start', 'begin', and 'commence' are synonyms because they all mean to initiate something.",
    "faqs": [
      {
        "q": "Are all synonyms exactly the same in meaning?",
        "a": "No, synonyms have similar meanings but may have different connotations or be used in different contexts. 'Happy' and 'cheerful' are close but not identical."
      },
      {
        "q": "How do synonyms help in writing?",
        "a": "Synonyms allow you to vary your word choices, avoid repetition, and express ideas with different shades of meaning."
      }
    ]
  },
  {
    "slug": "antonym",
    "term": "Antonym",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that has the opposite meaning of another word.",
    "explanation": "Antonyms provide contrasts and are used to show opposites in meaning. For example, 'hot' and 'cold', 'big' and 'small', 'happy' and 'sad' are antonym pairs. Some words have multiple antonyms because they have different meanings in different contexts. Not all words have exact antonyms. Understanding antonyms helps with reading comprehension and improves vocabulary. Antonyms are useful for expressing contrasts and making writing more interesting. Many languages use antonyms to create rhythm and balance in sentences.",
    "example": "The words 'day' and 'night' are antonyms because they have opposite meanings and represent opposite times.",
    "faqs": [
      {
        "q": "Can a word have multiple antonyms?",
        "a": "Yes, depending on the context. 'Good' has antonyms like 'bad', 'evil', 'poor', showing different opposite meanings."
      },
      {
        "q": "Do all words have antonyms?",
        "a": "No, not all words have clear antonyms. Specific nouns like 'pencil' have no true opposite."
      }
    ]
  },
  {
    "slug": "algorithm",
    "term": "Algorithm",
    "category": "Computer",
    "classLevel": "Class 10",
    "definition": "A step-by-step procedure for solving a problem or accomplishing a task.",
    "explanation": "Algorithms are the foundation of computer programming and computer science. Every computer program follows an algorithm, a sequence of instructions that solves a specific problem. Good algorithms are efficient, using minimal time and resources. Sorting algorithms arrange data in order, searching algorithms find specific items, and pathfinding algorithms find optimal routes. Algorithms are written in pseudocode before being translated into programming languages. Understanding algorithms helps students think logically and solve problems systematically. Famous algorithms like Google's PageRank determine how search results are ranked.",
    "example": "A recipe for cooking rice is an algorithm: rinse rice, add water, boil, simmer, let cool. Each step must be followed in order to achieve the desired result.",
    "faqs": [
      {
        "q": "Why are efficient algorithms important?",
        "a": "Efficient algorithms solve problems quickly using less computer memory and power, which is crucial for fast-running programs and large data sets."
      },
      {
        "q": "What makes an algorithm good?",
        "a": "A good algorithm correctly solves the problem, works for all valid inputs, and does so efficiently in terms of time and space."
      }
    ]
  },
  {
    "slug": "software",
    "term": "Software",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A set of computer programs and related documentation that tell a computer how to perform tasks.",
    "explanation": "Software is intangible in contrast to hardware which is physical. Software includes operating systems like Windows and Android, applications like Microsoft Word and WhatsApp, and programming languages used to create programs. Software can be free and open-source like Linux, or proprietary and paid like Microsoft Windows. Malware is malicious software that damages computers. Antivirus software protects against malware. Understanding software is essential in the computer age as software controls most electronic devices. Software updates fix bugs and add features.",
    "example": "Google Chrome is software that allows you to browse the internet. WhatsApp is software that allows you to send messages. Windows is software that manages your computer's hardware.",
    "faqs": [
      {
        "q": "What is the difference between software and hardware?",
        "a": "Hardware is the physical components of a computer like the motherboard and hard drive. Software is the programs and data that run on the hardware."
      },
      {
        "q": "What is freeware?",
        "a": "Freeware is software that is free to download and use, but the developer retains copyright and may restrict modification."
      }
    ]
  },
  {
    "slug": "hardware",
    "term": "Hardware",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "The physical components of a computer system that you can touch and see.",
    "explanation": "Hardware includes the processor (CPU), memory (RAM), storage devices (hard drives, SSDs), motherboard, power supply, and peripherals like keyboard, mouse, and monitor. Each component performs specific functions to make the computer work. The CPU executes instructions, RAM temporarily stores data while the computer is on, and storage devices permanently store files. Upgrading hardware like adding more RAM or a faster processor can improve computer performance. Understanding hardware helps with troubleshooting computer problems and making informed purchasing decisions. Smartphones also have hardware like processors, memory, and batteries.",
    "example": "The components inside a laptop like the processor, memory, hard drive, and battery are all hardware. The charger and mouse are also hardware.",
    "faqs": [
      {
        "q": "What is RAM and why is it important?",
        "a": "RAM is temporary memory that stores data while the computer is running. More RAM allows you to run more programs simultaneously without slowing down."
      },
      {
        "q": "What is the difference between storage and memory?",
        "a": "Memory (RAM) is fast but temporary and loses data when the computer turns off. Storage (hard drive, SSD) is permanent but slower."
      }
    ]
  },
  {
    "slug": "database",
    "term": "Database",
    "category": "Computer",
    "classLevel": "Class 10",
    "definition": "An organized collection of structured data stored and accessed through a computer system.",
    "explanation": "Databases store large amounts of information in an organized way so it can be quickly retrieved, updated, and managed. Relational databases organize data in tables with rows and columns. SQL is the language used to query databases. Banks use databases to store customer accounts and transactions. Schools use databases to store student records. Google uses massive databases to store and search web pages. Database management systems like MySQL and Oracle manage these databases. Understanding databases is important in computer science and modern business.",
    "example": "A school database stores tables with student information, teacher information, and class enrollments. When you need a student's grade, the database quickly finds and retrieves it.",
    "faqs": [
      {
        "q": "Why do organizations use databases instead of spreadsheets?",
        "a": "Databases can handle much larger amounts of data efficiently, provide better security, allow multiple users simultaneously, and maintain data integrity."
      },
      {
        "q": "What is SQL?",
        "a": "SQL is a language used to create, retrieve, and modify data in databases. Most relational databases use SQL."
      }
    ]
  },
  {
    "slug": "network",
    "term": "Network",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A system of connected computers and devices that can share data and resources.",
    "explanation": "Networks allow computers to communicate and share files, printers, and internet access. Local area networks (LAN) connect computers in one building, while wide area networks (WAN) span larger areas. The internet is the largest network, connecting millions of devices worldwide. A router manages network traffic and connects your home to the internet. Wi-Fi allows wireless network connections. Network security is important to protect data from hackers and malware. Understanding networks is essential in the digital age as most computers are networked.",
    "example": "Your school has a network where students and teachers can access the same printers and files from different computers in different classrooms.",
    "faqs": [
      {
        "q": "What is the difference between LAN and WAN?",
        "a": "LAN connects computers within a local area like a school or office. WAN connects computers across larger geographic areas."
      },
      {
        "q": "What is a router?",
        "a": "A router is a device that forwards data between networks and devices, allowing them to communicate with each other and the internet."
      }
    ]
  },
  {
    "slug": "byte",
    "term": "Byte",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A unit of digital information consisting of 8 bits, the basic unit used to measure computer storage and memory.",
    "explanation": "A bit is the smallest unit of data (0 or 1), and a byte contains 8 bits. Larger units include kilobyte (KB) = 1000 bytes, megabyte (MB) = 1000 KB, gigabyte (GB) = 1000 MB, and terabyte (TB) = 1000 GB. File sizes are measured in bytes; for example, a text file might be 50 KB while a movie might be 4 GB. Computer memory and storage capacity are measured in bytes. Understanding bytes helps determine file sizes and storage needs. A typical smartphone has 64 or 128 GB of storage, meaning it can store that many bytes of data.",
    "example": "One character of text takes up 1 byte. A 3-minute song takes about 3-5 MB. A HD movie takes about 4 GB.",
    "faqs": [
      {
        "q": "How many bits are in a byte?",
        "a": "There are 8 bits in 1 byte. A bit is either 0 or 1."
      },
      {
        "q": "What is the order of storage units from smallest to largest?",
        "a": "Bit, Byte, KB, MB, GB, TB. Each unit is 1000 times the previous one (or 1024 in binary systems)."
      }
    ]
  },
  {
    "slug": "protein",
    "term": "Protein",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A large organic molecule made of amino acids that performs various functions in living organisms.",
    "explanation": "Proteins are one of the four major biomolecules and are essential for life. They are made of amino acids linked together in chains. Different proteins perform different functions: enzymes speed up reactions, antibodies fight infections, hemoglobin carries oxygen, insulin regulates blood sugar. Proteins are found in all cells and perform structural, regulatory, and functional roles. Sources of dietary protein include meat, eggs, beans, and nuts. Proteins are digested into amino acids and used by your body for growth and repair. In Indian traditional diets, legumes and pulses are important protein sources.",
    "example": "Hemoglobin is a protein in red blood cells that carries oxygen. Amylase is a protein enzyme that breaks down starch in your saliva.",
    "faqs": [
      {
        "q": "What are amino acids?",
        "a": "Amino acids are organic molecules that link together to form proteins. There are 20 different amino acids used by the human body."
      },
      {
        "q": "Why are proteins important in diet?",
        "a": "Proteins provide amino acids needed for building and repairing muscles, bones, skin, and other tissues. They also form enzymes and antibodies."
      }
    ]
  },
  {
    "slug": "carbohydrate",
    "term": "Carbohydrate",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "An organic compound containing carbon, hydrogen, and oxygen that serves as a primary energy source for living organisms.",
    "explanation": "Carbohydrates include sugars, starches, and cellulose. Simple carbohydrates (monosaccharides) like glucose are small and quickly absorbed. Complex carbohydrates (polysaccharides) like starch break down slowly, providing sustained energy. Glucose from carbohydrates is used in respiration to produce ATP, the energy molecule cells use. Carbohydrates also form structural components like cellulose in plant cell walls and chitin in insect exoskeletons. Dietary sources include rice, bread, fruits, and vegetables. In India, rice and wheat are major carbohydrate sources. Excess carbohydrates are stored as glycogen or fat.",
    "example": "When you eat rice, your digestive system breaks down the starch (a carbohydrate) into glucose, which is absorbed into the blood and used for energy.",
    "faqs": [
      {
        "q": "What is the difference between simple and complex carbohydrates?",
        "a": "Simple carbohydrates are small molecules like glucose and sucrose, quickly absorbed. Complex carbohydrates like starch are large molecules, slowly digested."
      },
      {
        "q": "Why are carbohydrates important?",
        "a": "Carbohydrates are the primary energy source for cells. They also provide structural support and serve other cellular functions."
      }
    ]
  },
  {
    "slug": "lipid",
    "term": "Lipid",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "An organic compound that is mostly hydrophobic (water-repelling) and serves functions including energy storage and cell membrane formation.",
    "explanation": "Lipids include fats, oils, waxes, and cholesterol. Fats store more than twice the energy per gram as carbohydrates, making them an efficient energy reserve. Lipids form the phospholipid bilayer that makes up cell membranes. Some hormones are lipids, like testosterone and estrogen. Lipids protect organs and provide insulation. Dietary sources include oils, butter, nuts, and avocados. The body needs some lipids for health, but excess lipids can contribute to health problems. Saturated fats from animal products can increase cholesterol, while unsaturated fats from plants are considered healthier.",
    "example": "Butter and coconut oil are lipids that are solid at room temperature. Olive oil is a liquid lipid at room temperature. Body fat stores energy as lipids.",
    "faqs": [
      {
        "q": "Why do we need lipids if they can be unhealthy?",
        "a": "Lipids are essential for cell membranes, hormone production, vitamin absorption, and energy storage. Healthy amounts and types are beneficial."
      },
      {
        "q": "What is cholesterol?",
        "a": "Cholesterol is a lipid made by the body and found in animal foods. It is needed for hormones and cell membranes but excess can be harmful."
      }
    ]
  },
  {
    "slug": "gene",
    "term": "Gene",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A segment of DNA that codes for a specific protein and is the basic unit of heredity.",
    "explanation": "Genes contain instructions for building and maintaining an organism. Humans have approximately 20,000 to 25,000 genes located on chromosomes. Alleles are different versions of the same gene, explaining why people have different traits. Dominant alleles are expressed even with one copy, while recessive alleles require two copies. DNA in genes is transcribed into RNA, which is translated into proteins. Genetic mutations can change genes, sometimes causing disease. Understanding genes is crucial for understanding heredity, evolution, and genetic diseases. Gene therapy is an emerging treatment that modifies genes to cure genetic diseases.",
    "example": "The gene for eye color determines whether you have brown, blue, or green eyes. You inherit one allele from each parent.",
    "faqs": [
      {
        "q": "What is the difference between genes and alleles?",
        "a": "A gene is a DNA segment coding for a trait. Alleles are different versions of the same gene with different effects."
      },
      {
        "q": "How are traits inherited?",
        "a": "Traits are inherited through genes passed from parents to offspring. Each parent contributes one allele for each gene."
      }
    ]
  },
  {
    "slug": "dna",
    "term": "DNA (Deoxyribonucleic Acid)",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A molecule that carries genetic instructions for all known organisms, structured as a double helix of nucleotides.",
    "explanation": "DNA is the hereditary material in all living cells. It is composed of four nucleotide bases: adenine, thymine, guanine, and cytosine. These bases pair specifically (A with T, G with C), allowing DNA to replicate accurately. DNA is located in the cell nucleus and in small amounts in mitochondria. The sequence of bases provides instructions for making proteins. Watson and Crick discovered the double helix structure of DNA in 1953, earning them the Nobel Prize. DNA testing is used in forensics, ancestry, and medicine. Understanding DNA is fundamental to modern biology and genetics.",
    "example": "Your DNA contains about 3 billion base pairs organized into 46 chromosomes. This DNA is in almost every cell of your body and determines your traits.",
    "faqs": [
      {
        "q": "What is the structure of DNA?",
        "a": "DNA is a double helix made of two strands of nucleotides twisted around each other. The bases pair specifically: A with T and G with C."
      },
      {
        "q": "How does DNA carry instructions?",
        "a": "The sequence of bases in DNA carries instructions. Groups of three bases code for amino acids that form proteins."
      }
    ]
  },
  {
    "slug": "reproduction",
    "term": "Reproduction",
    "category": "Biology",
    "classLevel": "Class 8",
    "definition": "The biological process by which organisms produce offspring, ensuring the continuation of their species.",
    "explanation": "Reproduction occurs in two main types: asexual and sexual. Asexual reproduction involves one parent and produces identical offspring (clones) through budding, fission, or fragmentation. Sexual reproduction involves two parents and produces genetically diverse offspring through fertilization. In asexual reproduction, bacteria divide rapidly while plants propagate through runners or bulbs. Sexual reproduction is more common in animals and complex plants. Sexual reproduction creates variation that helps species adapt to environmental changes. Reproduction is essential for species survival and evolution.",
    "example": "Bacteria reproduce asexually by dividing in two, each cell identical to the parent. Humans reproduce sexually; a sperm and egg fuse to create a genetically unique offspring.",
    "faqs": [
      {
        "q": "What are advantages of sexual reproduction?",
        "a": "Sexual reproduction creates genetic variation, allowing populations to adapt to environment changes and resist diseases."
      },
      {
        "q": "Why do asexual organisms multiply so fast?",
        "a": "Asexual reproduction requires no mate-finding time and produces genetically identical offspring that are optimized for the current environment."
      }
    ]
  },
  {
    "slug": "ecosystem-diversity",
    "term": "Biodiversity",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "The variety of all living organisms and genetic variation within ecosystems and across the planet.",
    "explanation": "Biodiversity includes species diversity (number of different species), genetic diversity (variation within species), and ecosystem diversity (variety of ecosystems). High biodiversity ecosystems like rainforests are more stable and productive. Species extinction reduces biodiversity and weakens ecosystems. India is one of the most biodiverse countries, home to tigers, elephants, and millions of plant species. Habitat destruction is the main threat to biodiversity. Conservation efforts protect endangered species and preserve ecosystems. Biodiversity is essential for human survival, providing food, medicine, and ecosystem services.",
    "example": "A rainforest has high biodiversity with thousands of plant and animal species. A desert has lower biodiversity with fewer species adapted to dry conditions.",
    "faqs": [
      {
        "q": "Why is biodiversity important?",
        "a": "Biodiversity ensures ecosystem stability, provides resources for medicine and food, and makes ecosystems resilient to environmental changes."
      },
      {
        "q": "What is an endangered species?",
        "a": "An endangered species is one that is at high risk of extinction due to habitat loss, hunting, or disease."
      }
    ]
  },
  {
    "slug": "transpiration",
    "term": "Transpiration",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "Loss of water vapor from leaves and other parts of plants through stomata.",
    "explanation": "Transpiration is a vital process in plants where water absorbed by roots is transported to leaves and released as vapor. This process helps in cooling the plant, transporting nutrients, and maintaining water balance. In India's tropical climate, plants transpire heavily during hot months. The rate of transpiration depends on temperature, humidity, wind, and light intensity. Together with evaporation from soil, it forms the water cycle.",
    "example": "In a potted plant kept near a sunny window, you can observe water loss through transpiration by placing a transparent plastic bag over the leaves and seeing water droplets form inside.",
    "faqs": [
      {
        "q": "What is the difference between transpiration and evaporation?",
        "a": "Transpiration is loss of water from plants through stomata, while evaporation is loss of water from soil and water bodies. Together they form transpiration."
      },
      {
        "q": "Why is transpiration important for plants?",
        "a": "Transpiration helps absorb and transport water and minerals from roots to leaves, cools the plant, and maintains turgidity in cells."
      }
    ]
  },
  {
    "slug": "fertilization",
    "term": "Fertilization",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "Fusion of male gamete (sperm) with female gamete (egg) to form a zygote.",
    "explanation": "Fertilization is the process of sexual reproduction where a sperm cell penetrates and fuses with an egg cell. This occurs in animals including humans and in flowering plants where pollen fuses with the ovule. In humans, fertilization typically occurs in the fallopian tube after intercourse. The resulting zygote contains genetic material from both parents, ensuring genetic variation. This is fundamental to the continuity of species.",
    "example": "In humans, when a sperm cell meets an ovum in the fallopian tube after intercourse, fertilization occurs and the zygote begins cell division to form an embryo.",
    "faqs": [
      {
        "q": "Where does fertilization occur in humans?",
        "a": "Fertilization typically occurs in the fallopian tube (oviduct) after sperm enters the female reproductive tract."
      },
      {
        "q": "What is formed after fertilization?",
        "a": "A zygote is formed, which is a single cell containing genetic material from both male and female parents."
      }
    ]
  },
  {
    "slug": "biodiversity",
    "term": "Biodiversity",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "The variety of different species and genetic variations within and between ecosystems.",
    "explanation": "Biodiversity refers to the diversity of life at all levels: species diversity, genetic diversity, and ecosystem diversity. India is one of the most biodiverse countries in the world, home to species found nowhere else. High biodiversity indicates a healthy ecosystem that is resilient to environmental changes. Conservation of biodiversity is essential for ecosystem stability, human food security, and medicinal resources. Loss of biodiversity leads to weakened ecosystems and reduced human welfare.",
    "example": "India's Western Ghats contain thousands of unique plant and animal species, many found only in that region, representing high biodiversity.",
    "faqs": [
      {
        "q": "Why is biodiversity important?",
        "a": "Biodiversity ensures ecosystem stability, provides food and medicines, supports pollination, and helps maintain environmental balance."
      },
      {
        "q": "Is India biodiverse?",
        "a": "Yes, India is one of the 17 most biodiverse countries and home to about 8 percent of all species on Earth."
      }
    ]
  },
  {
    "slug": "chromosome",
    "term": "Chromosome",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A rod-shaped structure in the nucleus made of DNA and proteins that carries genetic information.",
    "explanation": "Chromosomes are visible during cell division as condensed strands of DNA and histone proteins. Human cells contain 46 chromosomes arranged in 23 pairs. Chromosomes carry genes which are units of hereditary information. Different organisms have different numbers of chromosomes. The structure and number of chromosomes are species-specific and important in heredity and evolution.",
    "example": "In humans, chromosome 21 contains over 200 genes, and humans have two copies of each chromosome except sex chromosomes in males.",
    "faqs": [
      {
        "q": "How many chromosomes are in a human cell?",
        "a": "A human cell has 46 chromosomes, arranged in 23 pairs, with 23 coming from each parent."
      },
      {
        "q": "What is the role of chromosomes?",
        "a": "Chromosomes carry genes which contain genetic instructions for inherited traits like eye color and height."
      }
    ]
  },
  {
    "slug": "enzyme",
    "term": "Enzyme",
    "category": "Biology",
    "classLevel": "Class 11",
    "definition": "A protein that speeds up a chemical reaction in cells without being consumed.",
    "explanation": "Enzymes are biological catalysts that increase the rate of metabolic reactions essential for life. Each enzyme has an active site where substrate molecules bind. Enzymes are highly specific, with each enzyme typically catalyzing one type of reaction. Enzyme activity depends on temperature, pH, and substrate concentration. Digestive enzymes like amylase, protease, and lipase break down food in the digestive system.",
    "example": "Amylase enzyme in saliva breaks down starch into simpler sugars during chewing, making digestion begin in the mouth.",
    "faqs": [
      {
        "q": "What is an enzyme?",
        "a": "An enzyme is a protein that speeds up chemical reactions in cells and organisms without being destroyed in the process."
      },
      {
        "q": "Name three digestive enzymes.",
        "a": "Amylase breaks down starch, protease breaks down proteins, and lipase breaks down fats."
      }
    ]
  },
  {
    "slug": "hormone",
    "term": "Hormone",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A chemical messenger produced by endocrine glands that regulates body functions.",
    "explanation": "Hormones are secreted by endocrine glands and travel through the bloodstream to target cells. They regulate growth, metabolism, reproduction, mood, and other vital functions. Key hormones include insulin (blood sugar), thyroid hormone (metabolism), and cortisol (stress response). Hormonal imbalances can cause health problems. In adolescents, hormonal changes drive physical and emotional development.",
    "example": "Insulin hormone is produced by the pancreas and regulates blood glucose levels by facilitating glucose uptake into cells.",
    "faqs": [
      {
        "q": "What glands produce hormones?",
        "a": "Endocrine glands like the pancreas, thyroid, pituitary, and adrenal glands produce hormones."
      },
      {
        "q": "How do hormones travel through the body?",
        "a": "Hormones are secreted into the bloodstream and travel throughout the body to reach target cells."
      }
    ]
  },
  {
    "slug": "antibody",
    "term": "Antibody",
    "category": "Biology",
    "classLevel": "Class 11",
    "definition": "A protein produced by white blood cells that binds to and destroys pathogens.",
    "explanation": "Antibodies are Y-shaped proteins produced by B lymphocytes in response to antigens. Each antibody recognizes a specific pathogen. Antibodies mark pathogens for destruction and also neutralize toxins. Vaccination works by stimulating antibody production before actual infection. Different antibodies target different diseases. The immune system produces millions of different antibodies.",
    "example": "When vaccinated against measles, your body produces antibodies against the measles virus so that if you encounter the virus later, the antibodies quickly destroy it.",
    "faqs": [
      {
        "q": "Which cells produce antibodies?",
        "a": "B lymphocytes (B cells) in the immune system produce antibodies."
      },
      {
        "q": "What is the function of antibodies?",
        "a": "Antibodies bind to pathogens to mark them for destruction and help neutralize toxins."
      }
    ]
  },
  {
    "slug": "vaccine",
    "term": "Vaccine",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "A preparation containing weakened or inactive pathogen used to develop immunity.",
    "explanation": "Vaccines contain weakened or killed microorganisms or their antigens. When administered, they stimulate the immune system to produce antibodies without causing the actual disease. Vaccination creates immunological memory for faster response to future infections. Vaccination programs have eliminated or controlled many diseases in India including polio, measles, and tuberculosis. Vaccines are administered following the National Immunization Program schedule.",
    "example": "The polio vaccine contains weakened poliovirus that trains the immune system to recognize and fight polio without causing the disease.",
    "faqs": [
      {
        "q": "How does a vaccine work?",
        "a": "A vaccine contains a weakened pathogen that stimulates the immune system to produce antibodies and develop immunity without causing disease."
      },
      {
        "q": "Is vaccination safe?",
        "a": "Yes, vaccines undergo rigorous testing and are safe. The benefits of vaccination far outweigh the risks."
      }
    ]
  },
  {
    "slug": "friction",
    "term": "Friction",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "A force that opposes motion between two surfaces in contact.",
    "explanation": "Friction arises from the interaction between surfaces and always opposes relative motion. Types include static friction (prevents motion) and kinetic friction (during motion). Friction depends on the normal force and the nature of surfaces. While friction can be disadvantageous in machines, it is essential for walking and gripping. Friction converts kinetic energy into heat.",
    "example": "Sliding a book across a table experiences friction that gradually slows it down and eventually stops it.",
    "faqs": [
      {
        "q": "What are the types of friction?",
        "a": "Static friction prevents motion, kinetic friction acts during motion, and rolling friction acts on rolling objects."
      },
      {
        "q": "Is friction always harmful?",
        "a": "No, friction is harmful in some contexts like machinery but essential for walking, gripping, and braking."
      }
    ]
  },
  {
    "slug": "inertia",
    "term": "Inertia",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "The tendency of an object to resist changes in its state of motion.",
    "explanation": "Inertia is an intrinsic property of matter related to mass. Objects at rest tend to stay at rest and moving objects tend to continue moving unless acted upon by a force. This is Newton's first law of motion. Greater mass means greater inertia. Examples include passengers lurching forward when a car brakes and difficulty pushing a heavy object.",
    "example": "When a bus suddenly brakes, passengers lurch forward due to their inertia trying to maintain their forward motion.",
    "faqs": [
      {
        "q": "What causes inertia?",
        "a": "Inertia is an inherent property of matter related to mass. Objects resist changes in motion because of their mass."
      },
      {
        "q": "Does inertia depend on mass?",
        "a": "Yes, greater mass means greater inertia and greater resistance to changes in motion."
      }
    ]
  },
  {
    "slug": "pressure",
    "term": "Pressure",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "The force applied perpendicular to a surface divided by the area of that surface.",
    "explanation": "Pressure is defined as force per unit area and is measured in Pascals in SI units. Greater force or smaller area results in greater pressure. Atmospheric pressure is caused by the weight of air. Water pressure increases with depth. Pressure is important in hydraulics, pneumatics, and many applications. High pressure is used in industries for cutting and shaping materials.",
    "example": "A nail has a sharp point which concentrates force over a small area, creating high pressure that allows it to penetrate wood easily.",
    "faqs": [
      {
        "q": "What is the formula for pressure?",
        "a": "Pressure equals force divided by area, or P = F/A."
      },
      {
        "q": "What increases pressure?",
        "a": "Pressure increases with greater force or smaller area."
      }
    ]
  },
  {
    "slug": "work-physics",
    "term": "Work",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The product of force applied to an object and the displacement in the direction of force.",
    "explanation": "Work is done when a force causes an object to move in the direction of the force. Work is calculated as force times distance (W = F × d). No work is done if there is no displacement or if force is perpendicular to displacement. Work is measured in joules. Lifting a weight against gravity does positive work.",
    "example": "Pushing a box across the floor does work if the box moves in the direction of push, but pushing a wall does no work because the wall does not move.",
    "faqs": [
      {
        "q": "What is the formula for work?",
        "a": "Work equals force multiplied by displacement in the direction of force, or W = F × d."
      },
      {
        "q": "When is no work done?",
        "a": "No work is done if an object does not move or if the force is perpendicular to the displacement."
      }
    ]
  },
  {
    "slug": "power-physics",
    "term": "Power",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "The rate at which work is done or energy is transferred.",
    "explanation": "Power is calculated as work divided by time (P = W/t) and is measured in watts. Greater power means work is done faster. A 100-watt bulb consumes energy faster than a 60-watt bulb. Power rating indicates how much energy a device uses per second. Higher power consumption results in higher electricity bills.",
    "example": "A motor rated at 1000 watts does the same work as a 500-watt motor but completes it in half the time.",
    "faqs": [
      {
        "q": "What is the formula for power?",
        "a": "Power equals work divided by time, or P = W/t, measured in watts."
      },
      {
        "q": "What does a watt measure?",
        "a": "A watt measures the rate of energy consumption, with one watt equal to one joule per second."
      }
    ]
  },
  {
    "slug": "frequency",
    "term": "Frequency",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "The number of complete oscillations or wave cycles per unit time.",
    "explanation": "Frequency is measured in hertz (Hz), where one hertz means one cycle per second. Higher frequency means more cycles occur per second. Sound frequency determines pitch, with higher frequencies producing higher-pitched sounds. Light frequency determines color, with different colors having different frequencies. Radio waves, microwaves, and X-rays are all electromagnetic waves with different frequencies.",
    "example": "A tuning fork vibrating 440 times per second has a frequency of 440 Hz and produces the musical note A.",
    "faqs": [
      {
        "q": "What is frequency measured in?",
        "a": "Frequency is measured in hertz (Hz), where one hertz equals one cycle per second."
      },
      {
        "q": "How does frequency relate to pitch?",
        "a": "Higher frequency sound waves produce higher pitch, while lower frequencies produce lower pitch."
      }
    ]
  },
  {
    "slug": "amplitude",
    "term": "Amplitude",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "The maximum displacement of a wave from its equilibrium position.",
    "explanation": "Amplitude measures how far a wave oscillates from its rest position. Greater amplitude means greater energy in the wave. For sound waves, amplitude determines loudness. For light waves, amplitude relates to intensity. Amplitude is independent of frequency. In water waves, amplitude determines wave height.",
    "example": "When plucking a guitar string harder, the amplitude increases, producing a louder sound with the same pitch.",
    "faqs": [
      {
        "q": "What does amplitude measure?",
        "a": "Amplitude measures the maximum distance a wave oscillates from its central equilibrium position."
      },
      {
        "q": "How does amplitude affect sound?",
        "a": "Greater amplitude produces louder sound, while smaller amplitude produces softer sound."
      }
    ]
  },
  {
    "slug": "conductor-physics",
    "term": "Conductor",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "A material that allows electricity or heat to flow through it easily.",
    "explanation": "Conductors have free electrons that can move easily, allowing current flow. Metals like copper, aluminum, and silver are excellent electrical conductors. Good heat conductors quickly transfer thermal energy. Poor conductors are called insulators and resist current flow. Copper is commonly used in electrical wiring because of its high conductivity. The ability to conduct electricity depends on the availability of free charge carriers.",
    "example": "Copper wire is used in electrical circuits because copper is an excellent conductor that allows electricity to flow easily from the power source to devices.",
    "faqs": [
      {
        "q": "What makes a material a conductor?",
        "a": "A conductor has free electrons that can move easily, allowing electricity to flow through it with low resistance."
      },
      {
        "q": "What is the difference between a conductor and an insulator?",
        "a": "Conductors allow electricity to flow easily, while insulators resist electrical flow."
      }
    ]
  },
  {
    "slug": "semiconductor",
    "term": "Semiconductor",
    "category": "Physics",
    "classLevel": "Class 11",
    "definition": "A material with conductivity between conductors and insulators that can be controlled.",
    "explanation": "Semiconductors like silicon and germanium have intermediate conductivity that can be controlled by adding impurities or applying voltage. Semiconductors form the basis of modern electronics including transistors and diodes. In semiconductors, conduction occurs through the movement of electrons and electron holes. Doping semiconductors with impurities creates P-type and N-type semiconductors used in electronic devices. Temperature affects semiconductor conductivity.",
    "example": "Silicon is a semiconductor used in computer chips where its conductivity can be precisely controlled to create electronic switches.",
    "faqs": [
      {
        "q": "What is a semiconductor?",
        "a": "A semiconductor is a material like silicon whose conductivity can be controlled and lies between conductors and insulators."
      },
      {
        "q": "What are semiconductors used for?",
        "a": "Semiconductors are used in transistors, diodes, solar cells, and integrated circuits that are essential for modern electronics."
      }
    ]
  },
  {
    "slug": "ion",
    "term": "Ion",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "An atom or molecule with an electric charge due to gain or loss of electrons.",
    "explanation": "Ions are charged particles formed when atoms gain or lose electrons. Cations are positively charged ions (lost electrons) and anions are negatively charged ions (gained electrons). Many compounds consist of ions held together by ionic bonds. Salts dissolve in water to form ions. Ions are important in biological systems for nerve transmission and muscle contraction.",
    "example": "Sodium chloride (table salt) consists of sodium cations (Na+) and chloride anions (Cl-) held together by ionic bonds.",
    "faqs": [
      {
        "q": "What is the difference between a cation and an anion?",
        "a": "A cation is a positively charged ion that has lost electrons, while an anion is negatively charged and has gained electrons."
      },
      {
        "q": "How are ions formed?",
        "a": "Ions form when atoms gain or lose electrons, creating an imbalance between protons and electrons."
      }
    ]
  },
  {
    "slug": "mole-chemistry",
    "term": "Mole",
    "category": "Chemistry",
    "classLevel": "Class 11",
    "definition": "A unit of measurement representing 6.022 x 10^23 particles of a substance.",
    "explanation": "The mole is the SI unit for amount of substance. One mole of any substance contains Avogadro's number (6.022 x 10^23) of particles. The molar mass of a substance in grams equals its molecular weight. Molar calculations are essential in stoichiometry and determining chemical equations. Molarity is the number of moles per liter of solution.",
    "example": "One mole of carbon has a mass of 12 grams and contains 6.022 x 10^23 carbon atoms.",
    "faqs": [
      {
        "q": "What is Avogadro's number?",
        "a": "Avogadro's number is 6.022 x 10^23, the number of particles in one mole of any substance."
      },
      {
        "q": "How do you calculate the number of moles?",
        "a": "Divide the mass of the substance by its molar mass to find the number of moles."
      }
    ]
  },
  {
    "slug": "solvent",
    "term": "Solvent",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A substance, usually liquid, that dissolves other substances to form a solution.",
    "explanation": "Solvents are the majority component in a solution and dissolve the solute. Water is the most common solvent in biology and chemistry due to its polar nature. Different solvents dissolve different substances based on polarity. Organic solvents like alcohol and acetone dissolve nonpolar substances. The solvent's properties affect the solution's characteristics and the rate of dissolution.",
    "example": "Water acts as a solvent in sugar solution where water dissolves the sugar to form a homogeneous mixture.",
    "faqs": [
      {
        "q": "What is the most common solvent?",
        "a": "Water is the most common solvent because it dissolves many substances and is essential for life."
      },
      {
        "q": "What is the difference between solvent and solute?",
        "a": "The solvent is the substance that does the dissolving, while the solute is the substance being dissolved."
      }
    ]
  },
  {
    "slug": "solute",
    "term": "Solute",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A substance that dissolves in a solvent to form a solution.",
    "explanation": "Solutes are the minority component in a solution. Common solutes include salts, sugars, and acids. Solutes can be liquids, solids, or gases. The solubility of a solute determines how much can dissolve in a given solvent. Temperature usually increases solubility of solid solutes in liquids. The concentration of a solute can be expressed as molarity, molality, or percentage.",
    "example": "In saltwater, salt is the solute dissolved in water which acts as the solvent.",
    "faqs": [
      {
        "q": "What happens when you dissolve a solute?",
        "a": "The solute particles separate and disperse throughout the solvent, forming a solution."
      },
      {
        "q": "Can solutes be gases?",
        "a": "Yes, solutes can be solids, liquids, or gases, depending on the solvent and conditions."
      }
    ]
  },
  {
    "slug": "alloy",
    "term": "Alloy",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "A mixture of two or more metals or a metal with a nonmetal.",
    "explanation": "Alloys are solid mixtures of metals designed to have better properties than pure metals. Steel is an alloy of iron and carbon with greater strength than pure iron. Brass is an alloy of copper and zinc. Bronze is an alloy of copper and tin. Alloys are used extensively in construction, manufacturing, and jewelry. The properties of alloys depend on the composition and crystal structure.",
    "example": "Stainless steel is an alloy of iron, chromium, and nickel that is stronger and more corrosion-resistant than pure iron.",
    "faqs": [
      {
        "q": "Why are alloys important?",
        "a": "Alloys have improved properties like greater strength, corrosion resistance, and durability compared to pure metals."
      },
      {
        "q": "Name three common alloys.",
        "a": "Steel, brass, and bronze are common alloys with important industrial applications."
      }
    ]
  },
  {
    "slug": "polymer",
    "term": "Polymer",
    "category": "Chemistry",
    "classLevel": "Class 11",
    "definition": "A large molecule made of many repeating units bonded together.",
    "explanation": "Polymers consist of long chains of monomers linked by covalent bonds. Plastics, rubber, and synthetic fibers are polymers. Natural polymers include proteins, cellulose, and DNA. Polymers have many industrial applications due to their properties. Polymer properties depend on monomer type, chain length, and cross-linking. Thermoplastics can be melted and reshaped while thermosets cannot.",
    "example": "Polyethylene is a polymer of ethylene monomers used in plastic bags and containers.",
    "faqs": [
      {
        "q": "What is a monomer?",
        "a": "A monomer is a small molecule that links with other monomers to form a polymer."
      },
      {
        "q": "Give examples of polymers.",
        "a": "Plastics, rubber, proteins, cellulose, and DNA are all polymers."
      }
    ]
  },
  {
    "slug": "combustion",
    "term": "Combustion",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A rapid chemical reaction between a fuel and oxygen producing heat and light.",
    "explanation": "Combustion requires three elements: fuel, oxygen, and heat (the fire triangle). Combustion is an exothermic reaction that releases energy. Complete combustion produces carbon dioxide and water. Incomplete combustion produces carbon monoxide and soot. Combustion powers vehicles, generates electricity, and heats homes. Rate of combustion depends on temperature and surface area of fuel.",
    "example": "Burning wood in a fireplace is combustion where the wood (fuel) reacts with oxygen in the air producing heat, light, and carbon dioxide.",
    "faqs": [
      {
        "q": "What are the three requirements for combustion?",
        "a": "Fuel, oxygen, and heat are the three components of the fire triangle needed for combustion."
      },
      {
        "q": "What is the difference between complete and incomplete combustion?",
        "a": "Complete combustion produces carbon dioxide and water, while incomplete combustion produces carbon monoxide and soot."
      }
    ]
  },
  {
    "slug": "corrosion",
    "term": "Corrosion",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "The chemical degradation of metals due to reaction with oxygen and moisture.",
    "explanation": "Corrosion is an oxidation process where metals lose electrons and deteriorate. Rusting is the corrosion of iron. Saltwater accelerates corrosion. Corrosion causes significant economic losses and weakens structures. Corrosion prevention methods include painting, galvanizing, and using corrosion-resistant alloys. Noble metals like gold and platinum resist corrosion.",
    "example": "Iron exposed to moisture and oxygen forms rust (iron oxide), which weakens the metal and eventually destroys it.",
    "faqs": [
      {
        "q": "What is the difference between corrosion and rusting?",
        "a": "Corrosion is the general process of metal degradation, while rusting specifically refers to iron corrosion."
      },
      {
        "q": "How can corrosion be prevented?",
        "a": "Corrosion can be prevented by painting, galvanizing, using stainless steel, or applying protective coatings."
      }
    ]
  },
  {
    "slug": "electrolysis",
    "term": "Electrolysis",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "A chemical process that uses electricity to drive a non-spontaneous oxidation-reduction reaction.",
    "explanation": "Electrolysis uses electrical energy to break down compounds into elements. Water electrolysis produces hydrogen and oxygen gases. Electrolysis is used to extract metals from ores and purify metals. In electroplating, electrolysis deposits a metal coating on an object. The products of electrolysis depend on the compound and electrodes used. Electrolysis is essential in many industrial processes.",
    "example": "During water electrolysis with electrical current, water breaks down into hydrogen gas at the cathode and oxygen gas at the anode.",
    "faqs": [
      {
        "q": "What does electrolysis require?",
        "a": "Electrolysis requires an electric current to flow through a solution containing ions."
      },
      {
        "q": "What are the products of water electrolysis?",
        "a": "Water electrolysis produces hydrogen gas and oxygen gas."
      }
    ]
  },
  {
    "slug": "fraction",
    "term": "Fraction",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A number representing part of a whole, expressed as a ratio of two integers.",
    "explanation": "Fractions have a numerator (top) and denominator (bottom). Proper fractions have numerator less than denominator. Improper fractions have numerator greater than denominator. Mixed numbers combine integers and fractions. Equivalent fractions have different numerators and denominators but same value. Fractions can be added, subtracted, multiplied, and divided using specific rules.",
    "example": "In the fraction 3/4, the numerator is 3 and denominator is 4, representing three-fourths of a whole.",
    "faqs": [
      {
        "q": "What is a proper fraction?",
        "a": "A proper fraction has a numerator smaller than its denominator and represents less than one."
      },
      {
        "q": "How do you add fractions with different denominators?",
        "a": "Find a common denominator, convert both fractions, then add the numerators."
      }
    ]
  },
  {
    "slug": "ratio",
    "term": "Ratio",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "A comparison of two quantities expressed as a quotient or using a colon.",
    "explanation": "A ratio shows the relationship between two quantities. Ratios can be expressed as fractions, with a colon, or with the word to. Ratios should be simplified to lowest terms. Equivalent ratios represent the same relationship. Ratios are used in recipes, maps, and many real-world applications. Scaling involves using ratios to enlarge or reduce quantities proportionally.",
    "example": "If a recipe needs 2 cups of flour and 1 cup of sugar, the ratio of flour to sugar is 2:1 or 2/1.",
    "faqs": [
      {
        "q": "How do you simplify a ratio?",
        "a": "Divide both numbers by their greatest common divisor to get the simplest form."
      },
      {
        "q": "Are ratios 3:4 and 6:8 equivalent?",
        "a": "Yes, both ratios are equivalent because 6:8 simplifies to 3:4."
      }
    ]
  },
  {
    "slug": "proportion",
    "term": "Proportion",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "A statement that two ratios are equal.",
    "explanation": "Proportions are equations showing two ratios are equal. In a proportion, the product of means equals the product of extremes (cross multiplication). Proportions are used to solve many real-world problems. Direct proportion means as one quantity increases, the other increases proportionally. Inverse proportion means as one increases, the other decreases.",
    "example": "The proportion 2/3 = 4/6 states that these two ratios are equal, which can be verified by cross multiplication: 2 x 6 = 3 x 4 = 12.",
    "faqs": [
      {
        "q": "How do you solve a proportion?",
        "a": "Use cross multiplication: if a/b = c/d, then a x d = b x c."
      },
      {
        "q": "What is the difference between ratio and proportion?",
        "a": "A ratio compares two quantities, while a proportion states that two ratios are equal."
      }
    ]
  },
  {
    "slug": "percentage",
    "term": "Percentage",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "A number expressed as a part of 100, indicated by the percent symbol (%).",
    "explanation": "Percentages are ratios with denominator 100. Converting to percentage involves dividing the part by whole and multiplying by 100. Percentages are used in discounts, interest rates, grades, and statistics. Percentage increase and decrease involve finding the difference and expressing it as a percentage of the original value. Mental math with percentages is useful for estimation.",
    "example": "If 25 out of 100 students passed, that is 25%, or if 15 out of 60 passed, that is 25%.",
    "faqs": [
      {
        "q": "How do you convert a fraction to percentage?",
        "a": "Divide the numerator by denominator and multiply by 100."
      },
      {
        "q": "What is a percentage increase?",
        "a": "Percentage increase is the increase divided by original value, multiplied by 100."
      }
    ]
  },
  {
    "slug": "perimeter",
    "term": "Perimeter",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "The total distance around the outside of a two-dimensional shape.",
    "explanation": "Perimeter is calculated by adding all side lengths. For rectangles, perimeter equals 2(length + width). For squares, perimeter equals 4 times the side. For circles, the perimeter is called circumference and equals 2πr or πd. Perimeter is measured in linear units like meters or centimeters. Perimeter is useful in real-world applications like fencing a garden.",
    "example": "A rectangle with length 5 cm and width 3 cm has perimeter 2(5 + 3) = 16 cm.",
    "faqs": [
      {
        "q": "What is the formula for the perimeter of a rectangle?",
        "a": "Perimeter of rectangle = 2 x (length + width)."
      },
      {
        "q": "What is the perimeter of a circle called?",
        "a": "The perimeter of a circle is called the circumference."
      }
    ]
  },
  {
    "slug": "volume",
    "term": "Volume",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "The amount of space occupied by a three-dimensional object.",
    "explanation": "Volume is measured in cubic units. For rectangular prisms, volume equals length times width times height. For cylinders, volume equals πr²h. For spheres, volume equals (4/3)πr³. Volume is different from surface area. Volume is important in calculating capacity, material amounts, and displacement.",
    "example": "A rectangular box with length 4 cm, width 3 cm, and height 2 cm has volume 4 x 3 x 2 = 24 cubic centimeters.",
    "faqs": [
      {
        "q": "What units are used for volume?",
        "a": "Volume is measured in cubic units like cubic centimeters (cm³) or cubic meters (m³)."
      },
      {
        "q": "What is the formula for volume of a cylinder?",
        "a": "Volume of cylinder = π x r² x h, where r is radius and h is height."
      }
    ]
  },
  {
    "slug": "factor-maths",
    "term": "Factor",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A number that divides evenly into another number with no remainder.",
    "explanation": "Factors of a number are all whole numbers that divide it evenly. Every number has at least two factors: 1 and itself. Prime numbers have exactly two factors. Composite numbers have more than two factors. Finding factors is useful in simplifying fractions and finding common denominators. The greatest common factor is the largest factor shared by two numbers.",
    "example": "Factors of 12 are 1, 2, 3, 4, 6, and 12 because each divides 12 evenly.",
    "faqs": [
      {
        "q": "What are the factors of 20?",
        "a": "Factors of 20 are 1, 2, 4, 5, 10, and 20."
      },
      {
        "q": "How many factors does a prime number have?",
        "a": "A prime number has exactly two factors: 1 and itself."
      }
    ]
  },
  {
    "slug": "multiple",
    "term": "Multiple",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A number that can be divided evenly by another number.",
    "explanation": "Multiples of a number are obtained by multiplying it by whole numbers. For example, multiples of 3 are 3, 6, 9, 12, etc. Every number is a multiple of 1 and itself. The least common multiple is the smallest multiple shared by two numbers. Finding multiples is useful in adding fractions with different denominators.",
    "example": "Multiples of 5 are 5, 10, 15, 20, 25, because 5x1=5, 5x2=10, 5x3=15, and so on.",
    "faqs": [
      {
        "q": "What is a multiple?",
        "a": "A multiple of a number is the product of that number and any whole number."
      },
      {
        "q": "What is the least common multiple?",
        "a": "The least common multiple is the smallest number that is a multiple of both numbers."
      }
    ]
  },
  {
    "slug": "quadrilateral",
    "term": "Quadrilateral",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "A polygon with four sides and four angles.",
    "explanation": "Quadrilaterals include squares, rectangles, parallelograms, rhombuses, and trapezoids. The sum of interior angles in any quadrilateral is 360 degrees. Different quadrilaterals have different properties. Squares have four equal sides and angles. Rectangles have equal opposite sides and all right angles. Properties of quadrilaterals determine their area calculation formulas.",
    "example": "A rectangle is a quadrilateral with four right angles and opposite sides equal.",
    "faqs": [
      {
        "q": "What is the sum of interior angles in a quadrilateral?",
        "a": "The sum of interior angles in any quadrilateral is 360 degrees."
      },
      {
        "q": "Name four types of quadrilaterals.",
        "a": "Square, rectangle, parallelogram, and trapezoid are common types of quadrilaterals."
      }
    ]
  },
  {
    "slug": "polygon",
    "term": "Polygon",
    "category": "Maths",
    "classLevel": "Class 7",
    "definition": "A closed two-dimensional shape formed by straight line segments.",
    "explanation": "Polygons have vertices where sides meet and angles at each vertex. Polygons are named by their number of sides: triangle (3), quadrilateral (4), pentagon (5), hexagon (6), etc. Regular polygons have all sides equal and all angles equal. The sum of interior angles depends on the number of sides. Polygons form the basis of geometry.",
    "example": "A pentagon is a polygon with five sides and five angles.",
    "faqs": [
      {
        "q": "What is the formula for the sum of interior angles?",
        "a": "Sum = (n - 2) x 180 degrees, where n is the number of sides."
      },
      {
        "q": "What is a regular polygon?",
        "a": "A regular polygon has all sides equal in length and all interior angles equal."
      }
    ]
  },
  {
    "slug": "symmetry",
    "term": "Symmetry",
    "category": "Maths",
    "classLevel": "Class 6",
    "definition": "A property where an object has matching parts on either side of a dividing line or point.",
    "explanation": "Line symmetry occurs when a shape can be folded so both halves match. Rotational symmetry occurs when a shape looks the same after rotation. Many shapes in nature have symmetry. Humans have approximate bilateral symmetry. Symmetry is important in art, design, and mathematics. Understanding symmetry helps analyze geometric properties.",
    "example": "A butterfly has bilateral symmetry with identical left and right sides.",
    "faqs": [
      {
        "q": "What is the difference between line and rotational symmetry?",
        "a": "Line symmetry divides a shape into matching halves with a line, while rotational symmetry means the shape looks the same when rotated."
      },
      {
        "q": "How many lines of symmetry does a square have?",
        "a": "A square has four lines of symmetry."
      }
    ]
  },
  {
    "slug": "constitution",
    "term": "Constitution",
    "category": "Social Science",
    "classLevel": "Class 8",
    "definition": "A written document that establishes the fundamental law and principles of government.",
    "explanation": "A constitution outlines the structure of government, rights of citizens, and division of powers. India's Constitution is the world's longest, drafted by Dr. B. R. Ambedkar and adopted on January 26, 1950. The Constitution establishes India as a secular, socialist, democratic republic. The Constitution can be amended through proper procedures. The Constitution is supreme law in India.",
    "example": "The Indian Constitution guarantees fundamental rights to all citizens including right to equality, freedom, and religion.",
    "faqs": [
      {
        "q": "When was India's Constitution adopted?",
        "a": "India's Constitution was adopted on January 26, 1950, and that day is celebrated as Republic Day."
      },
      {
        "q": "Who drafted India's Constitution?",
        "a": "The Constituent Assembly drafted India's Constitution, with Dr. B. R. Ambedkar playing a key role."
      }
    ]
  },
  {
    "slug": "fundamental-rights",
    "term": "Fundamental Rights",
    "category": "Social Science",
    "classLevel": "Class 8",
    "definition": "Basic rights guaranteed to all citizens by the Constitution that cannot be taken away.",
    "explanation": "India's Constitution guarantees six categories of fundamental rights. Right to equality ensures no discrimination. Right to freedom includes freedom of speech and expression. Right to exploitation protection safeguards workers and children. Right to freedom of religion allows freedom to practice any religion. Right to cultural and educational rights protects minorities. Violation of fundamental rights can be challenged in court.",
    "example": "The right to freedom of speech is a fundamental right allowing Indians to express opinions without fear of censorship.",
    "faqs": [
      {
        "q": "How many fundamental rights are guaranteed in India's Constitution?",
        "a": "India's Constitution originally had seven fundamental rights, now reduced to six after the abolition of the right to property."
      },
      {
        "q": "Can fundamental rights be taken away?",
        "a": "No, fundamental rights are basic rights that cannot be taken away, though they can be limited in certain circumstances."
      }
    ]
  },
  {
    "slug": "secularism",
    "term": "Secularism",
    "category": "Social Science",
    "classLevel": "Class 9",
    "definition": "A principle that the state remains neutral toward all religions and does not promote any religion.",
    "explanation": "India's Constitution declares India a secular state. Secularism means the state neither favors nor discriminates against any religion. All religions have equal status and rights. Citizens are free to follow any religion without state interference. Secularism separates religion from government functions. India's secularism ensures religious harmony and prevents religious discrimination.",
    "example": "In India's secular framework, people of all religions including Hinduism, Islam, Christianity, and others have equal rights and freedom to practice their faith.",
    "faqs": [
      {
        "q": "What does secularism mean?",
        "a": "Secularism means the state is neutral toward all religions and treats all religions equally."
      },
      {
        "q": "Is India secular?",
        "a": "Yes, India's Constitution declares India a secular state where no religion is favored by the government."
      }
    ]
  },
  {
    "slug": "sovereignty",
    "term": "Sovereignty",
    "category": "Social Science",
    "classLevel": "Class 9",
    "definition": "The power of a state to govern itself and make decisions without external interference.",
    "explanation": "Sovereignty means a nation has the right to self-government and control over its territory and people. India became sovereign when it gained independence from British rule in 1947. Sovereign nations can make their own laws, policies, and international agreements. Sovereignty is limited by international law and treaties. India's sovereignty is vested in the people as stated in the Constitution.",
    "example": "India exercises sovereignty by making its own laws, deciding foreign policy, and controlling its armed forces.",
    "faqs": [
      {
        "q": "What is national sovereignty?",
        "a": "National sovereignty is the right of a nation to govern itself independently without external control."
      },
      {
        "q": "When did India gain sovereignty?",
        "a": "India became a sovereign nation on August 15, 1947, when it gained independence from British rule."
      }
    ]
  },
  {
    "slug": "demand",
    "term": "Demand",
    "category": "Economics",
    "classLevel": "Class 9",
    "definition": "The quantity of a good or service that consumers are willing and able to buy at a given price.",
    "explanation": "Demand is inversely related to price: as price increases, quantity demanded usually decreases. Factors affecting demand include income, preferences, availability of alternatives, and expectations. Demand curves show the relationship between price and quantity demanded. Aggregate demand is the total demand in an economy. Understanding demand helps businesses set prices and production levels.",
    "example": "When the price of mangoes decreases during harvest season, demand increases as more people can afford to buy them.",
    "faqs": [
      {
        "q": "What factors affect demand?",
        "a": "Income, preferences, prices of alternatives, expectations, and number of consumers affect demand."
      },
      {
        "q": "What is the relationship between price and demand?",
        "a": "Generally, demand and price are inversely related: higher price leads to lower demand and vice versa."
      }
    ]
  },
  {
    "slug": "supply",
    "term": "Supply",
    "category": "Economics",
    "classLevel": "Class 9",
    "definition": "The quantity of a good or service that producers are willing and able to offer at a given price.",
    "explanation": "Supply is positively related to price: as price increases, quantity supplied usually increases. Factors affecting supply include production costs, technology, availability of inputs, and producer expectations. Supply curves show the relationship between price and quantity supplied. Aggregate supply is the total supply in an economy. Market equilibrium occurs where supply equals demand.",
    "example": "When rice prices increase, farmers are willing to grow more rice and supply more to the market.",
    "faqs": [
      {
        "q": "What factors affect supply?",
        "a": "Production costs, technology, input availability, government policies, and expectations affect supply."
      },
      {
        "q": "What is the relationship between price and supply?",
        "a": "Generally, supply and price are positively related: higher price encourages greater supply."
      }
    ]
  },
  {
    "slug": "tax",
    "term": "Tax",
    "category": "Economics",
    "classLevel": "Class 9",
    "definition": "A mandatory financial charge imposed by the government on individuals and businesses.",
    "explanation": "Taxes are revenue sources for governments to fund public services. Income tax is levied on earnings, sales tax on purchases. Corporate tax is levied on company profits. Property tax is levied on land and buildings. Excise tax is levied on specific goods. Tax rates vary by income level (progressive taxation). Taxes fund education, healthcare, infrastructure, and defense.",
    "example": "When you earn a salary, a portion is deducted as income tax which goes to the government for public services.",
    "faqs": [
      {
        "q": "What are taxes used for?",
        "a": "Taxes fund public services including education, healthcare, infrastructure, police, and defense."
      },
      {
        "q": "What is progressive taxation?",
        "a": "Progressive taxation means higher earners pay a higher tax rate, creating a system where tax burden increases with income."
      }
    ]
  },
  {
    "slug": "budget",
    "term": "Budget",
    "category": "Economics",
    "classLevel": "Class 10",
    "definition": "A financial plan estimating revenues and expenditures for a government or organization.",
    "explanation": "A budget lists expected income and planned spending for a specific period. Government budgets allocate funds to different sectors like education, health, and defense. Budgets ensure financial resources are used efficiently. India's national budget is presented annually in parliament. Budget deficits occur when expenditure exceeds revenue. Budgets guide economic planning and policy.",
    "example": "The Indian government presents an annual budget allocating funds to various ministries and schemes for the fiscal year.",
    "faqs": [
      {
        "q": "What is a budget deficit?",
        "a": "A budget deficit occurs when government expenditure exceeds revenue, requiring borrowing."
      },
      {
        "q": "Why is a budget important?",
        "a": "A budget ensures financial planning, proper resource allocation, and accountability in spending."
      }
    ]
  },
  {
    "slug": "equator",
    "term": "Equator",
    "category": "Geography",
    "classLevel": "Class 7",
    "definition": "An imaginary circle around Earth at its widest point, equidistant from the North and South Poles.",
    "explanation": "The equator is at 0 degrees latitude and divides the Earth into Northern and Southern Hemispheres. The equator is the longest latitude line. Areas at the equator receive the most direct sunlight and are generally hot. The equatorial region has tropical climate with high rainfall. India is located entirely in the Northern Hemisphere, north of the equator. The equator passes through equatorial countries like Ecuador, Congo, and Indonesia.",
    "example": "The equator passes through countries in Africa, South America, and Southeast Asia where tropical rainforests are common.",
    "faqs": [
      {
        "q": "Why is the equatorial region hot?",
        "a": "The equatorial region receives nearly direct sunlight throughout the year, making it consistently hot."
      },
      {
        "q": "Is India on the equator?",
        "a": "No, India is located north of the equator in the Northern Hemisphere."
      }
    ]
  },
  {
    "slug": "erosion",
    "term": "Erosion",
    "category": "Geography",
    "classLevel": "Class 8",
    "definition": "The wearing away of soil and rocks by water, wind, or ice.",
    "explanation": "Erosion moves loose particles from one location to another through weathering and mass movement. Water erosion is the most significant type, caused by rivers and heavy rainfall. Wind erosion removes topsoil in dry regions. Coastal erosion occurs where waves wear away land. Soil erosion reduces agricultural productivity. Erosion can be slowed by vegetation cover and conservation practices. India faces significant erosion in many regions due to deforestation and improper land use.",
    "example": "Heavy monsoon rains can cause severe water erosion in hillside areas, creating deep gullies and washing away fertile topsoil.",
    "faqs": [
      {
        "q": "What causes erosion?",
        "a": "Erosion is caused by water, wind, ice, and gravity moving soil and rocks from one place to another."
      },
      {
        "q": "How can erosion be prevented?",
        "a": "Erosion can be prevented by maintaining vegetation cover, building terraces on slopes, and using soil conservation practices."
      }
    ]
  },
  {
    "slug": "glacier",
    "term": "Glacier",
    "category": "Geography",
    "classLevel": "Class 8",
    "definition": "A large mass of slowly moving ice formed from accumulated snow over many years.",
    "explanation": "Glaciers form in cold regions where snow accumulates faster than it melts. Glaciers move slowly downhill, carving valleys and shaping landscapes. Glaciers store about 69 percent of Earth's fresh water. Many major rivers originate from glaciers. The Himalayas contain major glaciers that feed rivers like the Ganges, Brahmaputra, and Indus. Glaciers are retreating due to global warming, affecting water supply downstream.",
    "example": "The Siachen Glacier in the Karakoram Range is one of the world's largest glaciers and is the source of many streams.",
    "faqs": [
      {
        "q": "How do glaciers form?",
        "a": "Glaciers form when snow accumulates over many years, compressing into ice under the weight of overlying snow."
      },
      {
        "q": "Why are glaciers melting?",
        "a": "Global warming is causing increased temperatures that melt glaciers faster than they can accumulate."
      }
    ]
  },
  {
    "slug": "alliteration",
    "term": "Alliteration",
    "category": "English",
    "classLevel": "Class 7",
    "definition": "Repetition of the same beginning sound in neighboring words.",
    "explanation": "Alliteration creates rhythm and emphasis in writing and poetry. Alliteration is often used in tongue twisters. Examples include beautiful butterfly and dancing daffodils. Alliteration makes writing more memorable and fun to read. Advertisers use alliteration to make slogans catchy. Alliteration can enhance poetry and speeches.",
    "example": "Peter Piper picked a peck of pickled peppers is famous alliteration.",
    "faqs": [
      {
        "q": "What does alliteration do?",
        "a": "Alliteration creates rhythm, emphasis, and makes writing more memorable and entertaining."
      },
      {
        "q": "Is alliteration limited to poetry?",
        "a": "No, alliteration is used in prose, advertising, speeches, and everyday language."
      }
    ]
  },
  {
    "slug": "conjunction",
    "term": "Conjunction",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that connects words, phrases, or clauses in a sentence.",
    "explanation": "Common conjunctions include and, but, or, because, so, and while. Coordinating conjunctions connect equal elements like and, but, or. Subordinating conjunctions show relationships like because, although, if. Conjunctions help create complex sentences. Using varied conjunctions improves sentence variety. Conjunctions are essential for clear communication.",
    "example": "In the sentence I like apples and oranges, the conjunction and connects two nouns.",
    "faqs": [
      {
        "q": "What are the main types of conjunctions?",
        "a": "Coordinating conjunctions connect equal elements, while subordinating conjunctions show dependent relationships."
      },
      {
        "q": "Name five conjunctions.",
        "a": "And, but, or, because, and so are common conjunctions."
      }
    ]
  },
  {
    "slug": "preposition",
    "term": "Preposition",
    "category": "English",
    "classLevel": "Class 6",
    "definition": "A word that shows the relationship between a noun and other words in a sentence.",
    "explanation": "Prepositions indicate position, direction, time, and relationships. Common prepositions include in, on, at, to, from, under, over, between. Prepositions come before nouns to form prepositional phrases. Prepositional phrases act as modifiers. Understanding prepositions helps with grammar and writing clarity. Prepositions are essential for precise language.",
    "example": "In the sentence The book is on the table, on is a preposition showing the book's location.",
    "faqs": [
      {
        "q": "What information do prepositions provide?",
        "a": "Prepositions show relationships like position, direction, time, and manner."
      },
      {
        "q": "Name five prepositions.",
        "a": "In, on, at, to, and from are common prepositions."
      }
    ]
  },
  {
    "slug": "tense",
    "term": "Tense",
    "category": "English",
    "classLevel": "Class 7",
    "definition": "The form of a verb that shows when an action takes place.",
    "explanation": "There are three main tenses: past, present, and future. Past tense describes completed actions. Present tense describes current actions. Future tense describes upcoming actions. Each tense has simple, continuous, perfect, and perfect continuous forms. Consistent tense use is important for clarity. Tense helps convey timing in narratives.",
    "example": "He walks to school is present tense, he walked to school is past tense, and he will walk to school is future tense.",
    "faqs": [
      {
        "q": "What are the three main tenses?",
        "a": "Past tense (completed action), present tense (current action), and future tense (upcoming action)."
      },
      {
        "q": "Why is consistent tense important?",
        "a": "Consistent tense prevents confusion and helps readers clearly understand the timeline of events."
      }
    ]
  },
  {
    "slug": "voice",
    "term": "Voice",
    "category": "English",
    "classLevel": "Class 8",
    "definition": "A grammatical term showing whether the subject performs the action (active) or receives it (passive).",
    "explanation": "Active voice is when the subject performs the action. Passive voice is when the subject receives the action. Active voice is generally more direct and engaging. Active voice is preferred in most writing. Passive voice is sometimes used when the actor is unknown or unimportant. Changing from passive to active voice improves clarity.",
    "example": "Active voice: The teacher explained the lesson. Passive voice: The lesson was explained by the teacher.",
    "faqs": [
      {
        "q": "What is the difference between active and passive voice?",
        "a": "Active voice has the subject performing the action, while passive voice has the subject receiving the action."
      },
      {
        "q": "Is passive voice always wrong?",
        "a": "No, passive voice is sometimes appropriate, but active voice is generally clearer and more direct."
      }
    ]
  },
  {
    "slug": "variable",
    "term": "Variable",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A named container that stores a value that can change during program execution.",
    "explanation": "Variables hold data that programs manipulate. Variables have names and data types like integer, string, or boolean. Variables can be reassigned different values. Proper variable naming improves code readability. Global variables are accessible everywhere, local variables only within specific scope. Variable scope is important for organizing code.",
    "example": "In a program, age = 15 creates a variable age storing the value 15.",
    "faqs": [
      {
        "q": "What is a variable?",
        "a": "A variable is a named container that stores a value that can be used and changed in a program."
      },
      {
        "q": "Why is variable naming important?",
        "a": "Clear variable names make code more readable and maintainable."
      }
    ]
  },
  {
    "slug": "loop",
    "term": "Loop",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A programming structure that repeats a block of code multiple times.",
    "explanation": "Loops automate repetitive tasks. For loops repeat a fixed number of times. While loops repeat while a condition is true. Do-while loops execute at least once then check condition. Loops help avoid code duplication. Nested loops occur when loops are inside loops. Loop control statements include break and continue.",
    "example": "A for loop that counts from 1 to 10 and prints each number uses a loop to avoid writing 10 print statements.",
    "faqs": [
      {
        "q": "What are the main types of loops?",
        "a": "For loops, while loops, and do-while loops are main loop types."
      },
      {
        "q": "What does a break statement do?",
        "a": "A break statement exits a loop immediately, useful for stopping iteration when a condition is met."
      }
    ]
  },
  {
    "slug": "function",
    "term": "Function",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A reusable block of code that performs a specific task and can be called multiple times.",
    "explanation": "Functions promote code reuse and organization. Functions take parameters and return values. Local variables in functions are only accessible within the function. Recursive functions call themselves. Functions can be nested inside other functions. Well-designed functions are single-purpose and easy to test.",
    "example": "A function that adds two numbers: def add(a, b): return a + b can be called multiple times.",
    "faqs": [
      {
        "q": "Why use functions?",
        "a": "Functions promote code reuse, improve organization, make code easier to test, and reduce errors."
      },
      {
        "q": "What is a recursive function?",
        "a": "A recursive function is one that calls itself to solve a problem by breaking it into smaller subproblems."
      }
    ]
  },
  {
    "slug": "browser",
    "term": "Browser",
    "category": "Computer",
    "classLevel": "Class 8",
    "definition": "A software application that allows users to access and view websites on the internet.",
    "explanation": "Browsers interpret HTML, CSS, and JavaScript to display web pages. Major browsers include Chrome, Firefox, Safari, and Edge. Browsers request pages from servers and render them for viewing. Browsers have developer tools for debugging. Responsive design ensures websites work across different browsers. Browser caches store data locally for faster loading.",
    "example": "Google Chrome, Mozilla Firefox, and Microsoft Edge are web browsers used to access websites.",
    "faqs": [
      {
        "q": "What is the function of a web browser?",
        "a": "A web browser requests webpages from servers and displays them in a readable format for users."
      },
      {
        "q": "What is browser cache?",
        "a": "Browser cache stores copies of pages and files locally to load websites faster on repeat visits."
      }
    ]
  },
  {
    "slug": "server",
    "term": "Server",
    "category": "Computer",
    "classLevel": "Class 9",
    "definition": "A computer program or machine that provides resources and services to client computers.",
    "explanation": "Servers store and serve websites, email, databases, and files. Web servers process requests from browsers. Database servers store and retrieve data. Mail servers handle email. Servers run continuously to provide services. Server security is critical. Cloud servers provide computing resources over the internet.",
    "example": "When you visit a website, your browser sends a request to a web server which sends the webpage back to display.",
    "faqs": [
      {
        "q": "What is the difference between a server and a client?",
        "a": "A server provides resources and services, while a client requests and uses those resources."
      },
      {
        "q": "What is a web server?",
        "a": "A web server stores websites and serves them to browsers when requested."
      }
    ]
  },
  {
    "slug": "colloid",
    "term": "Colloid",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A colloid is a mixture where tiny particles of one substance are dispersed throughout another substance, but the particles are larger than in true solutions.",
    "explanation": "Colloids are heterogeneous mixtures where colloidal particles range from 1 to 1000 nanometers in size, larger than dissolved molecules but smaller than suspended particles. Examples include milk, fog, smoke, and mayonnaise. Colloidal particles do not dissolve or settle out quickly like suspended particles. They exhibit the Tyndall effect where light passing through a colloid is scattered. Colloids are important in food, medicine, cosmetics, and industrial processes. Many natural substances like blood and butter are colloids.",
    "example": "Milk is a colloid where fat globules and protein particles are dispersed throughout water.",
    "faqs": [
      {
        "q": "How is a colloid different from a solution?",
        "a": "Colloid particles are larger and do not dissolve completely. True solutions are transparent while colloids appear cloudy or opaque due to particle size. Colloid particles can be separated by special techniques while dissolved particles cannot."
      },
      {
        "q": "What is the Tyndall effect?",
        "a": "The Tyndall effect is the scattering of light by colloidal particles. When light passes through a colloid, the large particles scatter light, making the path of the light visible. True solutions do not show this effect."
      }
    ]
  },
  {
    "slug": "suspension",
    "term": "Suspension",
    "category": "Chemistry",
    "classLevel": "Class 8",
    "definition": "A suspension is a mixture where small particles of one substance are dispersed in another substance but do not dissolve or remain evenly distributed.",
    "explanation": "In a suspension, solid particles are suspended throughout a liquid but eventually settle at the bottom due to gravity. The particles are larger than in colloids or solutions, typically visible to the naked eye. Suspensions are heterogeneous mixtures that appear cloudy or opaque. Common examples include muddy water, paint, and flour mixed in water. Suspensions need to be stirred regularly to keep particles evenly distributed. They are different from solutions where solutes dissolve completely and from colloids where particles remain suspended indefinitely.",
    "example": "Sand suspended in water is a suspension because sand particles eventually settle at the bottom.",
    "faqs": [
      {
        "q": "What happens to particles in a suspension over time?",
        "a": "Particles in a suspension gradually settle at the bottom due to gravity. This is why suspensions need to be stirred or shaken to redistribute particles. Unlike colloids, suspensions do not remain stable indefinitely."
      },
      {
        "q": "How are suspensions different from emulsions?",
        "a": "Suspensions have solid particles dispersed in liquids. Emulsions have tiny droplets of one liquid dispersed in another immiscible liquid. Emulsions require emulsifiers to remain stable while suspensions simply need to be mixed."
      }
    ]
  },
  {
    "slug": "compound",
    "term": "Compound",
    "category": "Chemistry",
    "classLevel": "Class 8",
    "definition": "A compound is a substance formed from two or more elements chemically bonded in fixed proportions.",
    "explanation": "Compounds have fixed ratios of elements that determine their composition and properties. Water always has one oxygen and two hydrogen atoms in the formula H2O. Compounds have properties different from their component elements. For example, salt is a compound of sodium and chlorine, but has completely different properties from metallic sodium or poisonous chlorine gas. Compounds can be formed through ionic bonding where electrons are transferred, or covalent bonding where electrons are shared. Understanding compounds is central to chemistry and explains why different materials have different properties.",
    "example": "Sodium chloride is a compound made of sodium and chlorine in a one-to-one ratio, forming table salt with properties distinct from its components.",
    "faqs": [
      {
        "q": "How is a compound different from a mixture?",
        "a": "Compounds have fixed chemical compositions with atoms bonded together. Mixtures have variable compositions with components simply mixed together without bonding. Compounds have distinct properties while mixtures retain properties of their components."
      },
      {
        "q": "Can a compound be separated into its elements?",
        "a": "Yes, but only through chemical reactions. A compound can be broken down into its component elements, but this requires breaking the chemical bonds. This is different from mixtures which can be separated by physical means."
      }
    ]
  },
  {
    "slug": "sublimation",
    "term": "Sublimation",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "Sublimation is the process by which a solid changes directly to gas without passing through the liquid phase.",
    "explanation": "Sublimation occurs when molecules in a solid have enough energy to escape directly into the gas phase. Dry ice, which is solid carbon dioxide, sublimes at room temperature, disappearing into carbon dioxide gas without melting. Iodine crystals also sublime when heated. Naphthalene, used in moth balls, sublimes slowly at room temperature. Sublimation requires less energy than melting followed by evaporation. Ice can sublime when exposed to very low humidity and cold temperatures. Sublimation is the reverse of deposition, where gas changes directly to solid. Understanding sublimation is important in chemistry, physics, and freeze-drying processes.",
    "example": "Dry ice sublimes at room temperature, transforming directly from solid to carbon dioxide gas without becoming liquid.",
    "faqs": [
      {
        "q": "Why does dry ice sublime instead of melt?",
        "a": "At normal atmospheric pressure and room temperature, carbon dioxide cannot exist as a liquid. The solid directly transforms to gas because the conditions favor the gas phase. This is why dry ice is useful for cooling without leaving liquid residue."
      },
      {
        "q": "What is the opposite of sublimation?",
        "a": "The opposite of sublimation is deposition, where a gas transforms directly to a solid. Frost forming on windows is an example of deposition where water vapor becomes solid ice directly."
      }
    ]
  },
  {
    "slug": "viscosity",
    "term": "Viscosity",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "Viscosity is a measure of how thick or resistant to flow a fluid is.",
    "explanation": "Viscosity describes the internal friction of a fluid that resists flow. Honey has high viscosity and flows slowly, while water has low viscosity and flows easily. Viscosity depends on temperature - warm oil flows more easily than cold oil because heat reduces internal friction. Viscosity is measured in units called poise or pascal-seconds. Understanding viscosity is important for engine oils, food production, and many industrial applications. Kinematic viscosity measures viscosity relative to density. Dynamic viscosity measures the actual resistance to flow. Shear-thinning fluids like paint have lower viscosity when stirred vigorously.",
    "example": "Honey has much higher viscosity than water, so it flows much more slowly through a funnel.",
    "faqs": [
      {
        "q": "How does temperature affect viscosity?",
        "a": "For most liquids, viscosity decreases with increasing temperature. Heat gives molecules more kinetic energy, allowing them to flow more freely. This is why warm oil flows more easily than cold oil."
      },
      {
        "q": "Why is viscosity important for engine oil?",
        "a": "Engine oil must have appropriate viscosity to lubricate engine parts effectively. Too thick and it does not flow, too thin and it does not protect. Viscosity grade rating tells you the oil thickness at standard temperatures."
      }
    ]
  },
  {
    "slug": "friction-physics",
    "term": "Friction",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "Friction is the force that opposes relative motion between two surfaces in contact.",
    "explanation": "Friction acts parallel to surfaces and opposes motion or attempted motion. Static friction prevents motion between stationary surfaces. Kinetic friction acts when surfaces are already sliding. Friction depends on the normal force and the types of surfaces in contact. Rough surfaces have more friction than smooth surfaces. Friction is not dependent on the area of contact or the relative speed of motion. Friction causes heat generation, wear, and energy loss but is also necessary for walking, driving, and holding objects. Reducing friction with lubricants improves efficiency of machines.",
    "example": "The friction between your shoe soles and the ground allows you to walk without slipping.",
    "faqs": [
      {
        "q": "Why is friction necessary if it wastes energy?",
        "a": "While friction wastes energy in machines, it is essential for movement and safety. Without friction, nothing could start moving, nothing could stop, and nothing could be held. We need friction for walking, driving, and gripping. We manage friction by minimizing it where energy is wasted and maintaining it where safety is important."
      },
      {
        "q": "Does friction depend on how fast something is moving?",
        "a": "No, kinetic friction remains relatively constant regardless of speed. Static friction can vary up to its maximum value depending on applied force. The type and condition of surfaces matter much more than speed."
      }
    ]
  },
  {
    "slug": "torque",
    "term": "Torque",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "Torque is a measure of how much a force causes an object to rotate around a pivot point.",
    "explanation": "Torque equals the force applied multiplied by the perpendicular distance from the pivot point, called the lever arm. Torque is a vector quantity measured in newton-meters. Greater force or longer lever arm produces greater torque. A door opens easier when you push far from the hinge because the lever arm is longer. Torque is essential in rotational motion just as force is essential in linear motion. Torque can be clockwise or counterclockwise. The net torque determines rotational acceleration. Understanding torque is important in mechanics, engineering, and understanding how levers and machines work.",
    "example": "It is easier to open a door by pushing on the edge far from the hinge than pushing near the hinge, even with the same force, because the lever arm is longer.",
    "faqs": [
      {
        "q": "How is torque different from force?",
        "a": "Force causes linear acceleration while torque causes rotational acceleration. Force is applied at a point while torque depends on both the force and its distance from the pivot. They are analogous concepts for linear and rotational motion."
      },
      {
        "q": "Why does the distance from the pivot matter for torque?",
        "a": "The lever arm distance amplifies the effect of the force. A force applied farther from the pivot creates more torque, making rotation easier. This is why long wrenches make loosening bolts easier than short wrenches."
      }
    ]
  },
  {
    "slug": "wavelength",
    "term": "Wavelength",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "Wavelength is the distance between successive crests or troughs in a wave or between any two identical points on consecutive waves.",
    "explanation": "Wavelength is measured in distance units and is represented by the Greek letter lambda. Different types of waves have vastly different wavelengths. Radio waves have wavelengths from centimeters to kilometers. Visible light has wavelengths of nanometers. Gamma rays have extremely short wavelengths. Wavelength and frequency are inversely related - shorter wavelengths have higher frequencies. The product of wavelength and frequency equals the wave speed. Different wavelengths of visible light appear as different colors. Understanding wavelength is essential for optics, radio communication, and understanding the electromagnetic spectrum.",
    "example": "Red light has a longer wavelength around 700 nanometers while violet light has a shorter wavelength around 400 nanometers.",
    "faqs": [
      {
        "q": "What determines the wavelength of a wave?",
        "a": "Wavelength depends on the source of the wave and the medium it travels through. In a given medium, the speed of the wave divided by its frequency gives the wavelength. Different sources produce different wavelengths."
      },
      {
        "q": "How are wavelength and frequency related?",
        "a": "Wavelength and frequency are inversely proportional. As wavelength increases, frequency decreases, and vice versa. Their product always equals the wave speed in that medium."
      }
    ]
  },
  {
    "slug": "refraction-physics",
    "term": "Refraction",
    "category": "Physics",
    "classLevel": "Class 10",
    "definition": "Refraction is the bending of waves when they pass from one medium to another where the wave speed is different.",
    "explanation": "Light and sound waves bend when entering a new medium due to changes in wave speed. The amount of bending depends on the difference in wave speeds between the two media. Light bends toward the normal when entering a denser medium and away from the normal when entering a less dense medium. The refractive index measures how much a material bends light. Refraction explains why objects appear bent when viewed through water and why lenses focus light. Snells Law mathematically describes the relationship between angles and refractive indices. Understanding refraction is essential in optics and designing lenses.",
    "example": "A straw in a glass of water appears bent due to refraction of light as it exits the water.",
    "faqs": [
      {
        "q": "Why does refraction occur?",
        "a": "Refraction occurs because waves change speed when entering a different medium. The change in speed causes the direction of the wave to change. The part of the wave that enters the new medium first changes speed, while the rest of the wave still moves at the original speed, causing bending."
      },
      {
        "q": "Does refraction occur with all types of waves?",
        "a": "Yes, refraction occurs with all types of waves including light, sound, and water waves. Any wave that travels at different speeds in different media will refract when changing media."
      }
    ]
  },
  {
    "slug": "reflection-physics",
    "term": "Reflection",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "Reflection is the bouncing back of waves, light, or sound from a surface.",
    "explanation": "Reflection occurs when waves encounter a boundary and bounce back into the original medium. The law of reflection states that the angle of incidence equals the angle of reflection. Smooth surfaces produce clear reflections while rough surfaces scatter light and produce diffuse reflections. Mirrors reflect light with high efficiency. Water surfaces can reflect light, creating mirror-like images. Sound reflects from hard surfaces creating echoes. Curved mirrors concentrate or diverge reflected light. Understanding reflection is essential for mirrors, telescopes, and many optical instruments.",
    "example": "Looking at your image in a mirror is possible because light reflects off the mirror surface back to your eyes.",
    "faqs": [
      {
        "q": "Why is the angle of incidence equal to the angle of reflection?",
        "a": "This occurs because of how waves interact with surfaces. The wave bounces back following the geometry of the surface. Both angles are measured from a normal line perpendicular to the surface, creating the equal angle relationship."
      },
      {
        "q": "How is reflection different from refraction?",
        "a": "Reflection bounces waves back into the original medium while refraction bends waves as they pass into a new medium. Reflection returns to the source while refraction continues through the new medium at a different angle."
      }
    ]
  },
  {
    "slug": "insulator-physics",
    "term": "Insulator",
    "category": "Physics",
    "classLevel": "Class 8",
    "definition": "An insulator is a material that does not allow electric current to flow easily through it.",
    "explanation": "Insulators have very few free electrons, making it difficult for current to flow. Common insulators include rubber, plastic, glass, and wood. Insulators are poor conductors of electricity and are used to prevent unwanted current flow and protect people from electrical shock. The best insulators have high resistivity. Insulators are important for electrical safety, allowing wires to be handled and used safely. Insulators also resist heat flow, making them useful for thermal insulation. Some materials like semiconductors have properties between conductors and insulators. The difference between conductors and insulators is in the availability of free electrons.",
    "example": "Rubber is an insulator, so rubber gloves provide electrical protection when handling electrical equipment.",
    "faqs": [
      {
        "q": "Why do insulators not conduct electricity?",
        "a": "Insulators have electrons tightly bound to atoms. These electrons cannot move freely to constitute electric current. The energy barrier for electrons to become mobile is very high, so almost no current flows."
      },
      {
        "q": "Can an insulator ever become a conductor?",
        "a": "Yes, under extreme conditions. Very high voltages can ionize insulators, making electrons free to move. Very high temperatures can also provide enough energy for electrons to overcome binding energies. Normally, insulators remain insulators under practical conditions."
      }
    ]
  },
  {
    "slug": "antigen",
    "term": "Antigen",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "An antigen is a foreign substance that the immune system recognizes and attacks, stimulating an immune response.",
    "explanation": "Antigens can be proteins, carbohydrates, or other molecules on the surface of pathogens or cells. When the immune system detects antigens, it produces antibodies that bind to and neutralize the antigen. The immune system remembers antigens it has encountered before, providing immunity to future infections. Vaccines work by introducing antigens that stimulate immune response without causing disease. The human immune system distinguishes self from non-self by recognizing antigens. Transplant rejection occurs when the immune system recognizes foreign antigens on donor tissue. Understanding antigens is essential for immunology, vaccination, and treating autoimmune diseases.",
    "example": "When you get a vaccine, you receive antigens that stimulate your immune system to produce antibodies against a disease without getting sick.",
    "faqs": [
      {
        "q": "How does the immune system recognize antigens?",
        "a": "The immune system produces antibodies that have specific shapes complementary to antigens. When an antibody binds to an antigen, the immune system recognizes the pathogen as foreign. Memory cells remember antigens from past infections."
      },
      {
        "q": "Why do some infections cause immunity while others do not?",
        "a": "Pathogens that produce strong antigenic responses trigger good immune memory. Pathogens that hide antigens or mutate quickly evade immunity. The variability in antigenic strength determines immune durability."
      }
    ]
  },
  {
    "slug": "allele",
    "term": "Allele",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "An allele is one alternative form of a gene that controls a particular trait.",
    "explanation": "Each gene can have multiple alleles, different versions that produce different outcomes. For example, the gene for pea plant height has alleles for tall and short plants. An organism inherits two alleles for each trait, one from each parent. If both alleles are the same, the organism is homozygous. If alleles are different, the organism is heterozygous. Dominant alleles are expressed even in heterozygous individuals. Recessive alleles are only expressed if homozygous. Understanding alleles is essential for predicting traits in offspring and understanding genetic inheritance patterns.",
    "example": "A pea plant may have alleles for both red and white flowers, but if the red allele is dominant, the plant flowers red.",
    "faqs": [
      {
        "q": "How many alleles can one person have for a trait?",
        "a": "Most people have two alleles for each trait, inherited from parents. Some traits have more than two alleles in the population, but each individual still has two. Genes on sex chromosomes may have only one allele in males."
      },
      {
        "q": "What determines if an allele is dominant or recessive?",
        "a": "Dominance is determined by the protein product of the allele. If one allele produces sufficient protein to create the dominant phenotype, it is dominant. If two copies are needed for the trait, it is recessive. Dominance is not absolute - some alleles show incomplete dominance."
      }
    ]
  },
  {
    "slug": "mutation",
    "term": "Mutation",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A mutation is a permanent change in the DNA sequence of an organism.",
    "explanation": "Mutations can be caused by errors during DNA replication, exposure to radiation, chemicals, or viruses. Some mutations are neutral and have no effect. Some mutations are beneficial and improve survival. Others are harmful and reduce fitness. Mutations can be small changes in a single gene or large changes affecting many genes. Common types include point mutations where one nucleotide changes, insertions where nucleotides are added, and deletions where nucleotides are removed. Mutations are the source of genetic variation in populations. While most mutations are harmful, beneficial mutations drive evolution and adaptation.",
    "example": "A mutation in the gene for eye color might change brown eyes to blue eyes in a person.",
    "faqs": [
      {
        "q": "Are all mutations harmful?",
        "a": "No, many mutations are neutral with no effect. Some mutations are beneficial and improve survival or reproduction. Only a fraction of mutations are harmful. The rarity of beneficial mutations is why evolution requires many generations."
      },
      {
        "q": "How do mutations lead to evolution?",
        "a": "Beneficial mutations increase in frequency in populations because individuals with them survive and reproduce more successfully. Over many generations, beneficial mutations become common, leading to evolution and adaptation to the environment."
      }
    ]
  },
  {
    "slug": "biodiversity-term",
    "term": "Biodiversity",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "Biodiversity is the variety of all living organisms and the genetic variation within species.",
    "explanation": "Biodiversity includes genetic diversity within species, species diversity in ecosystems, and ecosystem diversity across regions. High biodiversity ecosystems are more stable and resilient to environmental changes. Biodiversity provides resources for food, medicine, and industry. Endangered species and habitat destruction threaten biodiversity. Protecting biodiversity is essential for ecosystem health and human survival. Conservation efforts focus on protecting habitats and preventing extinction. Biodiversity is unevenly distributed - tropical regions have much higher diversity than temperate regions. Understanding biodiversity is important for conservation and environmental management.",
    "example": "A tropical rainforest has high biodiversity with thousands of plant and animal species while a desert has lower biodiversity.",
    "faqs": [
      {
        "q": "Why is biodiversity important?",
        "a": "Biodiversity provides genetic variation allowing species to adapt to changes. It ensures stable ecosystems with functioning food webs. It provides resources for human use. Diverse ecosystems recover better from disturbances."
      },
      {
        "q": "How is biodiversity measured?",
        "a": "Biodiversity is measured using the species richness index which counts species in an area. Shannon diversity index accounts for both richness and evenness of species distribution. Different measures emphasize different aspects of diversity."
      }
    ]
  },
  {
    "slug": "food-web-term",
    "term": "Food Web",
    "category": "Biology",
    "classLevel": "Class 7",
    "definition": "A food web is a network of interconnected food chains showing the feeding relationships among organisms in an ecosystem.",
    "explanation": "Unlike a simple food chain, a food web shows that organisms eat multiple foods and are eaten by multiple predators. Organisms have multiple food sources and predators. Removing one species affects many others through the web. Producers form the base, consumers feed on other organisms, and decomposers break down dead material. Food webs are more realistic than food chains for understanding ecosystem function. The stability of a food web depends on its complexity - more connections usually mean more stability. Food webs help us understand how energy flows through ecosystems and how ecosystems respond to changes.",
    "example": "A rabbit eats grass and clover, a fox eats rabbits and mice, and a hawk eats foxes and rabbits, forming a connected food web.",
    "faqs": [
      {
        "q": "How is a food web different from a food chain?",
        "a": "A food chain is a linear pathway of energy transfer. A food web shows all the interconnected food chains in an ecosystem. Food webs are more accurate representations of real ecosystems."
      },
      {
        "q": "What happens if a key species is removed from a food web?",
        "a": "Removing a key species affects all connected species. Prey of that species increase without predation. Predators of that species decrease without food. The entire food web can be disrupted and ecosystem function compromised."
      }
    ]
  },
  {
    "slug": "weathering",
    "term": "Weathering",
    "category": "Geography",
    "classLevel": "Class 7",
    "definition": "Weathering is the breaking down of rocks and minerals into smaller pieces without movement, in place.",
    "explanation": "Physical weathering includes frost shattering where water freezes and expands, breaking rocks, and abrasion where particles scrape rocks. Chemical weathering occurs when rocks react with oxygen, water, and acids, changing their composition. Biological weathering occurs when plants roots break rocks or organisms produce acids. Weathering is essential for soil formation and provides minerals for plants. The rate of weathering depends on climate, rock type, and exposure. Tropical climates with high rainfall have faster chemical weathering. Cold climates have faster physical weathering from freezing.",
    "example": "Mountain peaks become rounded over time as frost weathering cracks rocks and water freezes, breaking them into smaller pieces.",
    "faqs": [
      {
        "q": "Why does weathering matter?",
        "a": "Weathering breaks down rocks into soil, which supports plant growth. It releases minerals that plants need. Weathering products contribute to sedimentary rocks and shape landscapes. It is essential for ecosystems."
      },
      {
        "q": "Which type of weathering is most common?",
        "a": "Chemical weathering is most common globally because water is present almost everywhere and chemically reacts with rocks. Physical weathering dominates in cold, dry regions. Both types usually occur together."
      }
    ]
  },
  {
    "slug": "syntax",
    "term": "Syntax",
    "category": "English",
    "classLevel": "Class 9",
    "definition": "Syntax is the arrangement of words and phrases to create properly formed sentences in a language.",
    "explanation": "Syntax includes rules for word order, punctuation, and sentence structure. The dog bit the man and the man bit the dog have different syntax creating different meanings. Subject-verb-object is the typical English word order. Varied syntax can create different effects in writing. Short, simple sentences create a choppy effect. Long, complex sentences create a flowing effect. Incorrect syntax confuses readers and makes meaning unclear. Understanding syntax helps writers communicate clearly and helps readers interpret meaning. Different languages have different syntax rules.",
    "example": "The correct syntax is 'The cat sat on the mat' not 'The on mat sat cat the.'",
    "faqs": [
      {
        "q": "What is the difference between syntax and grammar?",
        "a": "Syntax is the arrangement of words and phrases. Grammar includes syntax plus other rules like verb tense and pronoun agreement. Syntax is one part of grammar."
      },
      {
        "q": "Why does sentence structure matter?",
        "a": "Proper structure makes sentences clear and understandable. Improper structure confuses readers. Writers also vary structure deliberately to create effect and maintain reader interest."
      }
    ]
  },
  {
    "slug": "compiler",
    "term": "Compiler",
    "category": "Computer",
    "classLevel": "Class 10",
    "definition": "A compiler is a computer program that translates code written in a programming language into machine language that the computer can execute.",
    "explanation": "Programmers write code in languages like Python, Java, or C that humans can understand. Compilers translate this code into binary or machine code that processors execute. Compilation happens before execution - the entire program is translated first. Compiled programs run faster than interpreted programs. Compilation errors must be fixed before running the program. Different languages use different compilers. Some compilers optimize code for efficiency. Understanding compilation helps programmers write better code and diagnose compilation errors.",
    "example": "A C++ compiler translates a C++ program into machine code that can run on computers.",
    "faqs": [
      {
        "q": "What is the difference between a compiler and an interpreter?",
        "a": "A compiler translates entire programs before execution. An interpreter translates and executes code line by line. Compiled programs run faster while interpreted programs are more flexible."
      },
      {
        "q": "What are compilation errors?",
        "a": "Compilation errors occur when the compiler cannot understand code or detects problems like undefined variables or syntax errors. Programs cannot run until compilation errors are fixed."
      }
    ]
  },
  {
    "slug": "pollination",
    "term": "Pollination",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "Transfer of pollen from the male part of a flower to the female part, either within the same flower or between different flowers.",
    "explanation": "Pollination is necessary for plants to reproduce and create seeds. Pollen can be transferred by wind, water, insects like bees, or animals. Once pollen reaches the female part, fertilization can occur.",
    "example": "When a bee visits a flower to collect nectar, pollen sticks to its body and is carried to the next flower, causing pollination.",
    "faqs": [
      {
        "q": "What insects help with pollination?",
        "a": "Bees, butterflies, moths, and other insects carry pollen between flowers as they search for nectar."
      },
      {
        "q": "Can plants pollinate themselves?",
        "a": "Yes, some plants can self-pollinate, meaning pollen from one flower fertilizes the same flower or another flower on the same plant."
      }
    ]
  },
  {
    "slug": "germination",
    "term": "Germination",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "The process by which a seed develops into a young plant when given proper conditions like water, warmth, and air.",
    "explanation": "Germination begins when a seed absorbs water and the embryo inside becomes active. The root emerges first, followed by the shoot and leaves. Seeds need specific temperature, moisture, and sometimes light to germinate successfully.",
    "example": "When you plant a sunflower seed in moist soil and keep it warm, it germinates in about one to two weeks, sprouting a root and then a shoot.",
    "faqs": [
      {
        "q": "What are the conditions needed for seed germination?",
        "a": "Seeds need water, appropriate temperature, oxygen, and sometimes light to germinate. Different seeds have different requirements."
      },
      {
        "q": "Why is water essential for germination?",
        "a": "Water activates enzymes in the seed and helps the embryo grow by providing moisture and transporting nutrients."
      }
    ]
  },
  {
    "slug": "neuron",
    "term": "Neuron",
    "category": "Biology",
    "classLevel": "Class 10",
    "definition": "A specialized cell that transmits electrical and chemical signals throughout the body, forming the basic unit of the nervous system.",
    "explanation": "Neurons have a cell body, dendrites that receive signals, and an axon that sends signals. Neurons communicate with each other through synapses. The brain contains billions of neurons.",
    "example": "When you touch a hot surface, sensory neurons in your skin send a signal to your brain, which sends a signal back to muscles to pull your hand away.",
    "faqs": [
      {
        "q": "What are the three types of neurons?",
        "a": "The three types are sensory neurons that carry signals to the brain, motor neurons that carry signals from the brain to muscles, and interneurons that connect neurons to each other."
      },
      {
        "q": "How do neurons communicate?",
        "a": "Neurons communicate across synapses by releasing chemical messengers called neurotransmitters."
      }
    ]
  },
  {
    "slug": "food-chain",
    "term": "Food Chain",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "A sequence showing how energy and nutrients are transferred from one organism to another through feeding relationships.",
    "explanation": "A food chain starts with producers like plants, continues to consumers that eat other organisms, and may include decomposers. Energy flows from the sun through plants to herbivores to carnivores. Each step loses energy as heat.",
    "example": "A simple food chain is: grass to grasshopper to frog to snake, showing the transfer of energy through eating relationships.",
    "faqs": [
      {
        "q": "What is the difference between a food chain and a food web?",
        "a": "A food chain shows one path of energy transfer, while a food web shows multiple interconnected food chains."
      },
      {
        "q": "Why do food chains rarely have more than four steps?",
        "a": "Energy is lost at each step, so there is not enough energy to support many levels of consumers."
      }
    ]
  },
  {
    "slug": "parasite",
    "term": "Parasite",
    "category": "Biology",
    "classLevel": "Class 9",
    "definition": "An organism that lives on or in another organism and benefits by feeding on it while harming the host.",
    "explanation": "Parasites depend on their hosts for survival but damage the host in the process. Common parasites include tapeworms, lice, and mosquitoes. The relationship between parasite and host is one-sided.",
    "example": "A mosquito is a parasite that feeds on human blood, sometimes transmitting diseases like malaria in the process.",
    "faqs": [
      {
        "q": "Is a parasite the same as a predator?",
        "a": "No. A parasite lives on or in its host and usually does not kill it, while a predator hunts and kills its prey."
      },
      {
        "q": "How do parasites harm their hosts?",
        "a": "Parasites feed on the host, may cause disease, and can weaken the host or transmit infections."
      }
    ]
  },
  {
    "slug": "conductor",
    "term": "Conductor",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "A material that allows electric current or heat to flow through it easily due to free electrons or charges.",
    "explanation": "Conductors have electrons that move freely, enabling electrical conduction. Metals like copper and aluminum are excellent conductors. Thermal conductors transfer heat quickly.",
    "example": "Copper is used for electrical wiring because it is an excellent conductor of electricity.",
    "faqs": [
      {
        "q": "What makes a good conductor?",
        "a": "Materials with free electrons that can move easily are good electrical conductors, typically metals."
      },
      {
        "q": "Are all conductors the same?",
        "a": "No, different conductors have different abilities to carry electricity. Copper is a better conductor than aluminum."
      }
    ]
  },
  {
    "slug": "insulator",
    "term": "Insulator",
    "category": "Physics",
    "classLevel": "Class 9",
    "definition": "A material that prevents or slows the flow of electric current or heat due to lack of free electrons.",
    "explanation": "Insulators have electrons tightly bound to atoms, preventing easy movement. Non-metals like rubber and plastic are good insulators. They are used to protect from electrical shock.",
    "example": "The rubber coating on electrical cords is an insulator that protects people from electric shock.",
    "faqs": [
      {
        "q": "Is glass a good insulator?",
        "a": "Yes, glass is an excellent electrical insulator and is also a good thermal insulator."
      },
      {
        "q": "Why do insulators not conduct electricity?",
        "a": "Electrons in insulators are tightly bound to atoms and cannot move freely to carry electric current."
      }
    ]
  },
  {
    "slug": "mixture",
    "term": "Mixture",
    "category": "Chemistry",
    "classLevel": "Class 9",
    "definition": "A combination of two or more substances that are not chemically bonded and retain their individual properties.",
    "explanation": "Mixtures can be separated by physical methods like filtering, heating, or magnetism. The components are not in a fixed ratio. Mixtures can be homogeneous where parts are uniformly mixed or heterogeneous where parts are visibly separate.",
    "example": "Salt dissolved in water is a homogeneous mixture, while sand mixed with salt is a heterogeneous mixture.",
    "faqs": [
      {
        "q": "Can you separate a mixture?",
        "a": "Yes, mixtures can be separated by physical methods because the components are not chemically bonded."
      },
      {
        "q": "What is an example of a homogeneous mixture?",
        "a": "Air is a homogeneous mixture of gases that appears uniform throughout."
      }
    ]
  },
  {
    "slug": "reduction",
    "term": "Reduction",
    "category": "Chemistry",
    "classLevel": "Class 10",
    "definition": "A chemical reaction in which a substance gains electrons or loses oxygen, often using energy.",
    "explanation": "Reduction is a redox reaction where oxidation states decrease. It involves gaining electrons or removing oxygen. Reduction is always paired with oxidation.",
    "example": "When copper oxide is heated with carbon, the carbon reduces the copper oxide to copper metal by removing the oxygen.",
    "faqs": [
      {
        "q": "Why is it called reduction if electrons are gained?",
        "a": "The term comes from the historical focus on oxygen loss. When oxygen is removed, the mass is reduced."
      },
      {
        "q": "What is a redox reaction?",
        "a": "A redox reaction is a reaction where both oxidation and reduction occur simultaneously between two reactants."
      }
    ]
  }
];

export const GLOSSARY_CATEGORIES = (): string[] => [...new Set(GLOSSARY.map((g) => g.category))];
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}
