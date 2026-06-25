/** labPracticals.ts — CBSE science lab practicals + viva (aim, procedure, viva Q&A). */
export interface LabViva { q: string; a: string; }
export interface LabPractical {
  slug: string;
  classLevel: string;
  subject: string;
  title: string;
  aim: string;
  materials: string[];
  theory: string;
  procedure: string[];
  observation: string;
  result: string;
  precautions: string[];
  viva: LabViva[];
}
export const LAB_PRACTICALS: LabPractical[] = [
  {
    "slug": "to-find-the-focal-length-of-a-concave-mirror",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Find the Focal Length of a Concave Mirror",
    "aim": "To determine the focal length of a concave mirror using the mirror formula and distance measurements.",
    "materials": [
      "Concave mirror",
      "Plane mirror",
      "Object pin",
      "Mirror holder",
      "Meter scale",
      "Optical bench or wooden stand",
      "Screen",
      "Candle and matches"
    ],
    "theory": "A concave mirror follows the mirror formula: 1/f = 1/u + 1/v, where f is focal length, u is object distance, and v is image distance. When a real, inverted image is formed on a screen, the object distance and image distance can be measured, and the focal length can be calculated.",
    "procedure": [
      "Set up the concave mirror on the optical bench with the mirror holder",
      "Place an illuminated object (candle) in front of the mirror at various distances",
      "Move the screen until a sharp, inverted real image is formed on it",
      "Measure the object distance u (from mirror pole to object) and image distance v (from mirror pole to image)",
      "Record at least 5 sets of u and v values by varying the object distance",
      "For each set, calculate focal length using 1/f = 1/u + 1/v",
      "Calculate the mean focal length from all observations",
      "Verify using u + v versus u plots"
    ],
    "observation": "When the object is placed at different distances from the mirror, real, inverted images are formed on the screen. The object and image distances are measured for each position. A typical observation shows that as the object distance increases, the image distance decreases.",
    "result": "The focal length of the concave mirror is determined as [value] cm, which represents the distance from the mirror pole to the focal point where parallel rays converge.",
    "precautions": [
      "Keep the mirror clean and free from dust",
      "Measure distances from the pole of the mirror accurately",
      "Ensure the object, mirror, and screen are on the same horizontal axis",
      "Darken the room for clearer image observation"
    ],
    "viva": [
      {
        "q": "What is the focal length of a mirror?",
        "a": "Focal length is the distance between the mirror pole and its focal point, where parallel rays converge after reflection."
      },
      {
        "q": "Why must the image be real to find focal length in this method?",
        "a": "Real images can be projected on a screen and their position can be accurately measured, unlike virtual images."
      },
      {
        "q": "What is the mirror formula?",
        "a": "The mirror formula is 1/f = 1/u + 1/v, relating focal length, object distance, and image distance."
      },
      {
        "q": "Can you find focal length if the image is virtual?",
        "a": "No, virtual images cannot be projected on a screen; we would need other methods like using a plane mirror to locate the image."
      }
    ]
  },
  {
    "slug": "to-verify-ohms-law",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Verify Ohm's Law",
    "aim": "To verify that the ratio of potential difference to current (resistance) remains constant for a given conductor.",
    "materials": [
      "Ammeter (0-1 A)",
      "Voltmeter (0-5 V)",
      "Nichrome wire",
      "Variable power supply",
      "Rheostat",
      "Key/switch",
      "Connecting wires",
      "Stand and clamps"
    ],
    "theory": "Ohm's Law states that the current flowing through a conductor is directly proportional to the potential difference across it, provided temperature remains constant. This is expressed as V = IR or R = V/I, where R is resistance and remains constant for a given conductor at constant temperature.",
    "procedure": [
      "Set up the circuit with the nichrome wire as the conductor, ammeter in series, and voltmeter in parallel across the wire",
      "Adjust the variable power supply to its minimum value",
      "Close the key and record the voltmeter and ammeter readings",
      "Gradually increase the power supply voltage in small steps",
      "For each voltage value, record the corresponding current from the ammeter",
      "Take at least 6-7 sets of V-I readings across the voltage range",
      "Calculate resistance R = V/I for each set of readings",
      "Plot a V-I graph; it should be a straight line passing through origin"
    ],
    "observation": "As the potential difference across the nichrome wire is increased, the current also increases proportionally. The ratio V/I remains approximately constant for all readings, demonstrating that resistance is independent of applied voltage.",
    "result": "Ohm's Law is verified. The resistance of the nichrome wire remains constant at approximately [value] Ohm across different voltage and current values.",
    "precautions": [
      "Ensure all connections are tight and secure",
      "Never exceed the maximum reading of ammeter and voltmeter",
      "Do not keep the circuit closed for long periods to avoid heating of the wire",
      "Use appropriate meter ranges and take initial reading at lowest voltage"
    ],
    "viva": [
      {
        "q": "State Ohm's Law.",
        "a": "Ohm's Law states that V = IR, or the current through a conductor is proportional to the potential difference, at constant temperature."
      },
      {
        "q": "Why is the ammeter connected in series?",
        "a": "The ammeter measures current, and to measure the actual current through the conductor, it must be in series with it."
      },
      {
        "q": "Why should the wire not be heated excessively?",
        "a": "Heat increases the resistance of the conductor, making the V/I ratio non-constant and violating Ohm's Law conditions."
      },
      {
        "q": "What does the slope of the V-I graph represent?",
        "a": "The slope of the V-I graph represents the resistance of the conductor."
      }
    ]
  },
  {
    "slug": "to-find-resistance-using-a-metre-bridge",
    "classLevel": "Class 12",
    "subject": "Physics",
    "title": "To Find Resistance Using a Metre Bridge",
    "aim": "To determine the unknown resistance of a wire using the metre bridge and the principle of balanced Wheatstone bridge.",
    "materials": [
      "Metre bridge",
      "One known resistance (standard box)",
      "Unknown resistance wire",
      "Battery/cell",
      "Key",
      "Galvanometer",
      "Connecting wires",
      "Jockey"
    ],
    "theory": "A metre bridge is a practical application of the Wheatstone bridge. When the bridge is balanced, the condition is P/Q = R/S, where P is unknown resistance, Q is standard resistance, R is the length on the unknown side, and S is the length on the standard side. The balancing length is found where the galvanometer shows no deflection.",
    "procedure": [
      "Connect the unknown resistance and standard resistance box to the metre bridge wire",
      "Attach the galvanometer and key in the circuit as shown in the apparatus diagram",
      "Adjust the standard resistance box to a convenient value",
      "Close the key and touch the jockey along the metre bridge wire to find the balancing point",
      "The balancing point is where the galvanometer shows zero deflection",
      "Record the lengths from both ends at the balancing point",
      "Repeat the experiment by changing the value in the standard resistance box (at least 4 times)",
      "Calculate the unknown resistance using P = Q x R/S for each set"
    ],
    "observation": "When the jockey is touched at different points on the metre wire, the galvanometer shows deflections. At one particular point, the galvanometer shows zero deflection - this is the balancing point. The position of the balancing point changes when the standard resistance is changed.",
    "result": "The unknown resistance is found to be approximately [value] Ohm. The average value from multiple observations confirms the accuracy of the metre bridge method.",
    "precautions": [
      "Ensure the metre bridge wire is clean and uniform in cross-section",
      "Use a sensitive galvanometer for accurate zero deflection",
      "Do not apply excessive current to avoid heating and change in resistance",
      "Take the balancing lengths accurately from the metre scale",
      "Repeat the observation with different standard resistances to reduce error"
    ],
    "viva": [
      {
        "q": "What is the principle of the metre bridge?",
        "a": "The metre bridge works on the principle of the Wheatstone bridge where P/Q = R/S at the balancing point."
      },
      {
        "q": "Why must the galvanometer show zero deflection at the balancing point?",
        "a": "Zero deflection means no current flows through the galvanometer, indicating that the potential at the junction is the same on both sides."
      },
      {
        "q": "Why is the unknown resistance placed on one side of the bridge?",
        "a": "The unknown resistance is compared with a known standard resistance to determine its value using the balance condition."
      },
      {
        "q": "What happens if the metre bridge wire is not uniform?",
        "a": "Non-uniform wire will have varying resistance per unit length, leading to incorrect balancing point and erroneous results."
      }
    ]
  },
  {
    "slug": "to-study-the-laws-of-reflection",
    "classLevel": "Class 9",
    "subject": "Physics",
    "title": "To Study the Laws of Reflection",
    "aim": "To verify the laws of reflection using a plane mirror, a light ray, and measurement of angles.",
    "materials": [
      "Wooden board",
      "Plane mirror",
      "Pins (4-5)",
      "Protractor",
      "Meter scale",
      "Paper",
      "Pencil"
    ],
    "theory": "The laws of reflection state that: (1) the incident ray, reflected ray, and normal all lie in the same plane, and (2) the angle of incidence equals the angle of reflection. These angles are measured from the normal to the mirror surface.",
    "procedure": [
      "Draw a line on the paper to represent the mirror and a perpendicular line (normal) to it",
      "Place the mirror on the drawn line and secure it",
      "Draw an incident ray towards the mirror at an angle",
      "Place two pins along the incident ray and observe their reflections in the mirror",
      "Place two more pins such that they are aligned with the reflected image of the first two pins",
      "Draw the reflected ray along these pins",
      "Measure the angle between the incident ray and the normal (angle of incidence)",
      "Measure the angle between the reflected ray and the normal (angle of reflection)",
      "Repeat with different angles of incidence and record all observations"
    ],
    "observation": "For all incidents rays at different angles, the reflected ray is clearly visible in the mirror. The angle of incidence and angle of reflection are found to be equal in each case. Both rays lie in the plane of the paper (same plane as the normal).",
    "result": "The laws of reflection are verified. The angle of incidence equals the angle of reflection for all test cases, confirming that light reflects at equal angles.",
    "precautions": [
      "Keep the mirror perpendicular to the board",
      "Mark the normal perpendicular to the mirror accurately",
      "Use sharp pins and observe from directly above",
      "Measure angles from the normal, not from the mirror surface",
      "Ensure the pins are aligned properly before drawing the rays"
    ],
    "viva": [
      {
        "q": "State the laws of reflection.",
        "a": "The laws of reflection state that the angle of incidence equals the angle of reflection, and both rays lie in the plane containing the normal."
      },
      {
        "q": "Why must we draw a normal to the mirror?",
        "a": "The normal is the reference line from which angles of incidence and reflection are measured."
      },
      {
        "q": "Can reflection occur without the incident and reflected rays being in the same plane?",
        "a": "No, the incident ray, reflected ray, and normal must always lie in the same plane."
      },
      {
        "q": "What is the angle of incidence for a ray hitting the mirror perpendicularly?",
        "a": "The angle of incidence is zero when the ray is perpendicular to the mirror, and the ray reflects straight back."
      }
    ]
  },
  {
    "slug": "to-determine-the-density-of-a-solid",
    "classLevel": "Class 9",
    "subject": "Physics",
    "title": "To Determine the Density of a Solid",
    "aim": "To find the density of a solid object by measuring its mass and volume using standard measuring instruments.",
    "materials": [
      "Solid object (stone, metal cube, or irregular solid)",
      "Electronic balance",
      "Measuring cylinder",
      "Water",
      "Thread",
      "Beaker"
    ],
    "theory": "Density is defined as mass per unit volume: Density = Mass/Volume. For a regular solid, volume can be calculated using dimensions. For an irregular solid, volume is determined by water displacement method using the formula: Volume = Final water level - Initial water level.",
    "procedure": [
      "Measure the mass of the solid object using an electronic balance and record it",
      "Fill a measuring cylinder with water up to a marked level (initial reading) and record it",
      "Tie the solid object with a thread and gently immerse it completely in the water",
      "Record the new water level (final reading) in the measuring cylinder",
      "Calculate the volume of the solid: Volume = Final reading - Initial reading",
      "Calculate density using: Density = Mass/Volume",
      "Repeat the measurement 3-4 times with the same object and find the average density",
      "Compare with known density values of the material"
    ],
    "observation": "The mass of the solid is recorded as [value] grams. When immersed in water, the water level rises from [initial] mL to [final] mL. The volume of the solid is therefore [value] mL or cubic centimeters.",
    "result": "The density of the solid is calculated as [value] g/cm³, which matches the known density for the material [name].",
    "precautions": [
      "Ensure the object is completely immersed in water without splashing",
      "Read the water level at eye level to avoid parallax error",
      "Use a measuring cylinder of appropriate size for accurate reading",
      "Dry the object before weighing if necessary",
      "Use distilled water to avoid reading errors due to meniscus"
    ],
    "viva": [
      {
        "q": "Define density.",
        "a": "Density is the mass of a substance per unit volume. It is expressed as g/cm³ or kg/m³."
      },
      {
        "q": "Why is water displacement used for irregular solids?",
        "a": "For irregular solids, it is difficult to measure dimensions and calculate volume mathematically, so water displacement provides an easy method."
      },
      {
        "q": "How does the density of different materials compare?",
        "a": "Different materials have different densities. For example, iron is denser than aluminum, and both are denser than water."
      },
      {
        "q": "What is the density of water?",
        "a": "The density of water is 1 g/cm³ or 1000 kg/m³."
      }
    ]
  },
  {
    "slug": "to-verify-the-laws-of-refraction-glass-slab",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Verify the Laws of Refraction (Glass Slab)",
    "aim": "To verify Snell's Law by measuring incident and refracted angles when light passes through a glass slab.",
    "materials": [
      "Glass slab",
      "Pins (4-5)",
      "Protractor",
      "Meter scale",
      "Paper",
      "Pencil",
      "Wooden board",
      "Source of light"
    ],
    "theory": "Refraction is the bending of light when it passes from one medium to another. Snell's Law states: n1 sin(i) = n2 sin(r), where n1 and n2 are refractive indices and i and r are angles of incidence and refraction respectively. The incident ray, refracted ray, and normal lie in the same plane.",
    "procedure": [
      "Place the glass slab on a paper and draw lines along its outline",
      "Draw a normal to the glass slab at the point of incidence",
      "Draw an incident ray at a specific angle to the normal",
      "Place pins along the incident ray and mark the point where it strikes the glass surface",
      "View the refracted ray from the other side and place pins along it",
      "Mark the path of the refracted ray on the paper",
      "Remove the slab and measure the angle of incidence and angle of refraction",
      "Calculate sin(i) and sin(r) for each observation",
      "Repeat with different angles and note that sin(i)/sin(r) remains approximately constant"
    ],
    "observation": "When light enters the glass slab, it bends towards the normal (angle of refraction is less than angle of incidence). When light emerges from the glass slab, it bends away from the normal, becoming parallel to the original incident ray. The ratio sin(i)/sin(r) is constant for glass (refractive index ≈ 1.5).",
    "result": "Snell's Law is verified. The ratio sin(i)/sin(r) equals approximately [value], confirming the constant relationship between angles and refractive indices.",
    "precautions": [
      "Place the glass slab firmly on the paper to prevent movement",
      "Draw the normal at right angles to the glass surface accurately",
      "Measure angles from the normal, not from the surface",
      "Use sharp pins and observe from directly above",
      "Take readings at different angles to verify consistency"
    ],
    "viva": [
      {
        "q": "What is Snell's Law?",
        "a": "Snell's Law states that n1 sin(i) = n2 sin(r), relating the angles and refractive indices of two media."
      },
      {
        "q": "Why does light bend when passing from one medium to another?",
        "a": "Light travels at different speeds in different media. The change in speed causes the change in direction, resulting in refraction."
      },
      {
        "q": "What happens when light emerges from the glass slab?",
        "a": "When light emerges from the glass slab, it bends away from the normal and becomes parallel to the original incident ray."
      },
      {
        "q": "What is the refractive index of glass?",
        "a": "The refractive index of glass is approximately 1.5, meaning light travels 1.5 times slower in glass than in vacuum."
      }
    ]
  },
  {
    "slug": "to-prepare-a-true-solution-and-observe-tyndall-effect",
    "classLevel": "Class 9",
    "subject": "Chemistry",
    "title": "To Prepare a True Solution and Observe the Tyndall Effect",
    "aim": "To prepare a true solution and distinguish it from a colloid by observing the Tyndall effect.",
    "materials": [
      "Copper sulphate crystals",
      "Distilled water",
      "Test tube",
      "Stirring rod",
      "Beam of light (torch/laser)",
      "Colloidal solution (starch or ink)",
      "Beaker"
    ],
    "theory": "A true solution is a homogeneous mixture where solute particles are completely dissolved and have a diameter less than 1 nanometer. Colloids have particle size between 1-1000 nanometers. The Tyndall effect is the scattering of light by colloidal particles; true solutions do not show this effect as solute particles are too small to scatter light.",
    "procedure": [
      "Take a test tube and add distilled water",
      "Add copper sulphate crystals to the water and stir thoroughly until all crystals dissolve",
      "Observe the color of the solution - it should be clear and uniform",
      "Hold the test tube against light and observe if it appears clear from the side",
      "Shine a torch or laser beam through the copper sulphate solution and observe whether the path of light is visible",
      "Now prepare a colloidal solution by mixing starch with water",
      "Pass a torch beam through the colloidal solution and observe if the path of light is clearly visible",
      "Compare the two observations"
    ],
    "observation": "The copper sulphate solution is clear, uniform in color, and appears transparent when viewed against light. When a torch beam passes through the true solution, the path of light is NOT visible. In contrast, the colloidal starch solution appears cloudy, and the path of light IS clearly visible as a bright cone (Tyndall effect).",
    "result": "The copper sulphate forms a true solution where the Tyndall effect is absent, confirming that solute particles are too small to scatter light. The colloidal starch solution shows the Tyndall effect, indicating larger particle size.",
    "precautions": [
      "Use distilled water to avoid impurities",
      "Stir thoroughly until all solute dissolves completely",
      "Perform the Tyndall effect observation in a dark room for clear observation",
      "Use a bright light source for better visibility of the effect",
      "Do not heat the solution unless specified"
    ],
    "viva": [
      {
        "q": "What is the difference between a true solution and a colloid?",
        "a": "A true solution has solute particles smaller than 1 nanometer, while a colloid has particle size between 1-1000 nanometers."
      },
      {
        "q": "What is the Tyndall effect?",
        "a": "The Tyndall effect is the scattering of light by colloidal particles, making the path of light visible."
      },
      {
        "q": "Why do true solutions not show the Tyndall effect?",
        "a": "True solutions do not show the Tyndall effect because the solute particles are too small to scatter light."
      },
      {
        "q": "What color is a copper sulphate solution?",
        "a": "A copper sulphate solution is blue in color."
      }
    ]
  },
  {
    "slug": "to-test-for-starch-protein-and-fats-in-food",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Test for Starch, Protein, and Fats in Food",
    "aim": "To identify the presence of starch, protein, and fats in various food samples using specific chemical tests.",
    "materials": [
      "Food samples (rice, egg, oil, milk, bread)",
      "Test tubes",
      "Iodine solution",
      "Biuret reagent (copper sulphate and sodium hydroxide)",
      "Sudan III/IV dye",
      "Distilled water",
      "Dropper"
    ],
    "theory": "Different food components produce characteristic reactions with specific reagents: Iodine solution turns blue-black with starch (due to complex formation), biuret reagent gives a purple/pink color with proteins (due to copper chelation with peptide bonds), and Sudan dyes stain fats orange-yellow due to their lipophilic nature.",
    "procedure": [
      "Label test tubes for each food sample",
      "Add a portion of each food sample to separate test tubes",
      "To test for starch: Add 2-3 drops of iodine solution and observe color change",
      "To test for protein: Add 2 mL of biuret reagent and observe color change",
      "To test for fats: Add 2-3 drops of Sudan III/IV dye and observe color change",
      "Record the color changes and results for each food sample",
      "Prepare a table showing which nutrients are present in which foods",
      "Note that some foods may contain multiple nutrients"
    ],
    "observation": "Rice and bread samples turn blue-black with iodine, confirming presence of starch. Egg white and milk turn purple/pink with biuret reagent, indicating protein. Oil samples turn orange-yellow with Sudan dye, confirming presence of fats. Milk contains both protein and fats.",
    "result": "The tests confirm the presence of starch in carbohydrate-rich foods, proteins in egg and milk, and fats in oils. Different food samples contain different combinations of these nutrients.",
    "precautions": [
      "Use fresh reagents for accurate results",
      "Observe color changes against a white background",
      "Add reagents dropwise for clear observation",
      "Avoid direct contact of reagents with skin",
      "Dispose of chemical waste safely"
    ],
    "viva": [
      {
        "q": "What color does starch turn with iodine?",
        "a": "Starch turns blue-black with iodine solution due to the formation of a complex."
      },
      {
        "q": "What is the biuret test for?",
        "a": "The biuret test is used to detect proteins. It involves adding copper sulphate and sodium hydroxide solutions."
      },
      {
        "q": "Why do fats stain with Sudan dye?",
        "a": "Fats are lipophilic (fat-loving) substances, so they readily dissolve in Sudan dyes which are also lipophilic."
      },
      {
        "q": "Which food contains all three nutrients?",
        "a": "Milk contains proteins, fats, and carbohydrates (lactose), making it a complete food."
      }
    ]
  },
  {
    "slug": "to-study-osmosis-using-potato-osmometer",
    "classLevel": "Class 9",
    "subject": "Biology",
    "title": "To Study Osmosis Using a Potato Osmometer",
    "aim": "To observe and demonstrate the process of osmosis by studying water movement across a semi-permeable membrane.",
    "materials": [
      "Potato",
      "Knife",
      "Salt",
      "Distilled water",
      "Beaker",
      "Measuring cylinder",
      "Straw or glass tube",
      "Clay or cork"
    ],
    "theory": "Osmosis is the movement of water molecules from a region of higher water potential (lower solute concentration) to a region of lower water potential (higher solute concentration) across a semi-permeable membrane. Potato cell membrane acts as a semi-permeable membrane. Water moves into the potato cavity, raising the water level in the tube.",
    "procedure": [
      "Cut a large potato into half and scoop out a cavity in the center, leaving a thick base",
      "Use a knife to carefully hollow out the center without breaking the walls",
      "Fill the potato cavity with concentrated salt solution",
      "Place the potato on a beaker containing distilled water",
      "Insert a straw or glass tube through the cavity and seal with clay to mark the initial water level",
      "Keep the setup for 30 minutes to 1 hour",
      "Observe the water level in the tube at regular intervals (every 10 minutes)",
      "Record the rise in water level, which indicates water entering the potato due to osmosis"
    ],
    "observation": "Initially, the salt solution in the potato cavity is at the marked level on the tube. As time passes, water from the beaker moves into the potato cavity due to osmosis. The water level in the tube rises, indicating water movement into the hypertonic solution inside the potato.",
    "result": "Water enters the potato cavity through osmosis, causing the water level in the tube to rise by [value] cm in [time] minutes, demonstrating that osmosis is the movement of water towards higher solute concentration.",
    "precautions": [
      "Ensure the potato cavity is properly sealed to prevent solution leakage",
      "Use concentrated salt solution to create a strong osmotic gradient",
      "Keep the apparatus in a stable position to avoid tube movement",
      "Mark the initial water level clearly on the tube",
      "Use distilled water in the beaker to maintain the osmotic potential difference"
    ],
    "viva": [
      {
        "q": "What is osmosis?",
        "a": "Osmosis is the movement of water molecules from higher water potential to lower water potential across a semi-permeable membrane."
      },
      {
        "q": "Why does water enter the potato cavity?",
        "a": "Water enters because the salt solution has lower water potential than distilled water, creating an osmotic pressure gradient."
      },
      {
        "q": "What acts as the semi-permeable membrane in this experiment?",
        "a": "The potato cell membrane acts as the semi-permeable membrane."
      },
      {
        "q": "What would happen if the potato cavity contained distilled water instead of salt solution?",
        "a": "No net movement of water would occur as there would be no osmotic potential difference."
      }
    ]
  },
  {
    "slug": "to-observe-onion-peel-cells-under-microscope",
    "classLevel": "Class 9",
    "subject": "Biology",
    "title": "To Observe Onion Peel Cells Under a Microscope",
    "aim": "To prepare and observe the structure of onion epidermal cells under a microscope and identify cell organelles.",
    "materials": [
      "Onion bulb",
      "Microscope slides",
      "Cover slips",
      "Distilled water",
      "Iodine solution",
      "Safranin dye",
      "Compound microscope",
      "Forceps",
      "Scalpel",
      "Blotting paper"
    ],
    "theory": "Onion epidermal cells are plant cells without chloroplasts. When stained with iodine or safranin, the nucleus becomes visible. The cell wall, cell membrane, cytoplasm, and nucleus are clearly observed. These cells are ideal for studying basic plant cell structure.",
    "procedure": [
      "Cut an onion bulb and remove the papery outer layers",
      "Peel off the thin transparent layer from the inside of an onion layer using forceps",
      "Place the peeled layer on a clean microscope slide",
      "Add a drop of distilled water and lower a cover slip gently",
      "Observe under low magnification (10X) first to locate cells",
      "Add a drop of iodine solution at the edge of the cover slip and draw it through with blotting paper",
      "Observe under high magnification (40X) and identify cell structures",
      "Draw a labeled diagram of the observed cells"
    ],
    "observation": "The onion epidermal cells are rectangular and appear in a single layer. After staining with iodine, the nucleus becomes dark brown/blue and is clearly visible in the center of each cell. The cell wall forms the outer boundary, and the cytoplasm fills the space between the wall and nucleus.",
    "result": "The prepared slide shows the basic structure of plant cells with a distinct cell wall, nucleus, and cytoplasm. The cells are tightly packed in a single layer, forming the protective epidermis of the onion bulb.",
    "precautions": [
      "Handle the microscope slide carefully to avoid breaking it",
      "Use the coarse focus first when observing under low magnification",
      "Do not press the cover slip too hard to avoid crushing cells",
      "Start with low magnification and then switch to high magnification",
      "Clean the lens with lens paper before and after use"
    ],
    "viva": [
      {
        "q": "What is the function of the cell wall?",
        "a": "The cell wall provides structural support and protection to the plant cell."
      },
      {
        "q": "Why are onion epidermal cells suitable for observation?",
        "a": "Onion epidermal cells are transparent, lack chloroplasts, and form a single layer, making them ideal for microscopic observation."
      },
      {
        "q": "What is the stain used in this experiment?",
        "a": "Iodine solution is used as the stain to make the nucleus and other cellular structures visible."
      },
      {
        "q": "What is the shape of onion epidermal cells?",
        "a": "Onion epidermal cells are rectangular in shape."
      }
    ]
  },
  {
    "slug": "to-observe-stomata-on-leaf-surface",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Observe Stomata on Leaf Surface",
    "aim": "To prepare temporary mounts of leaf epidermal cells and observe stomata, identifying guard cells and subsidiary cells.",
    "materials": [
      "Fresh leaf (mint or hibiscus)",
      "Microscope slides",
      "Cover slips",
      "Distilled water",
      "Safranin dye",
      "Compound microscope",
      "Forceps",
      "Scalpel"
    ],
    "theory": "Stomata are pores in the leaf epidermis surrounded by a pair of guard cells that control gas exchange and transpiration. Guard cells change shape to open or close the stomatal pore. Subsidiary cells surround the guard cells. Dicot leaves typically have more stomata on the lower surface (abaxial) than upper surface (adaxial).",
    "procedure": [
      "Pick a fresh leaf from a plant like mint or hibiscus",
      "Place the leaf on a microscope slide with the lower surface facing up",
      "Use a scalpel to scrape the lower surface of the leaf gently",
      "Remove the scraped surface with forceps to expose the epidermal layer",
      "Add a drop of distilled water and prepare a wet mount with cover slip",
      "Stain with safranin dye by drawing it through the mount",
      "Observe under high magnification (40X objective)",
      "Identify guard cells (bean-shaped), subsidiary cells, and the pore (stoma)"
    ],
    "observation": "The lower surface of the leaf shows numerous bean-shaped guard cells arranged in pairs with a pore (stoma) between them. Subsidiary cells are visible surrounding the guard cells. The upper surface has fewer or no stomata in typical dicot leaves.",
    "result": "Stomata are clearly observed on the leaf epidermis, with guard cells surrounding each pore. The guard cells contain chloroplasts and control the opening and closing of stomata for gas exchange.",
    "precautions": [
      "Scrape gently to avoid damaging the underlying tissues",
      "Use fresh leaves for better observation",
      "Focus carefully to see the epidermal layer clearly",
      "Compare upper and lower surfaces to note the difference in stomatal density",
      "Observe multiple stomata to confirm the structure"
    ],
    "viva": [
      {
        "q": "What are stomata?",
        "a": "Stomata are tiny pores on the leaf surface through which gas exchange and transpiration occur."
      },
      {
        "q": "What are guard cells?",
        "a": "Guard cells are a pair of specialized cells that surround each stoma and control its opening and closing."
      },
      {
        "q": "Why do dicot leaves have more stomata on the lower surface?",
        "a": "The lower surface is protected from direct sunlight, reducing water loss. This surface orientation helps control transpiration."
      },
      {
        "q": "What do guard cells contain?",
        "a": "Guard cells contain chloroplasts that help them change shape in response to water uptake or loss."
      }
    ]
  },
  {
    "slug": "to-find-the-ph-of-samples-using-indicators",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Find the pH of Samples Using Indicators",
    "aim": "To determine the pH of various solutions and classify them as acidic, basic, or neutral using indicators.",
    "materials": [
      "Distilled water",
      "Dilute acids (HCl, acetic acid)",
      "Dilute bases (NaOH, ammonia)",
      "Samples (lemon juice, soap solution, milk, salt water)",
      "pH paper or universal indicator",
      "Litmus paper (red and blue)",
      "Test tubes",
      "Test tube holder"
    ],
    "theory": "pH is a measure of hydrogen ion concentration on a scale of 0-14. pH < 7 indicates acidic solutions, pH = 7 indicates neutral solutions, and pH > 7 indicates basic solutions. Universal indicator paper changes color over a range of pH values, while litmus paper only indicates acidic or basic nature.",
    "procedure": [
      "Collect different sample solutions in separate test tubes",
      "Using litmus paper: Dip blue litmus paper in each sample - it turns red for acidic solutions. Dip red litmus paper - it turns blue for basic solutions",
      "Using universal indicator/pH paper: Dip the paper in each solution and compare the color with the provided scale",
      "Record the pH value for each sample from the color chart",
      "Arrange samples in order of increasing pH",
      "Test at least 5-6 different samples",
      "Note any patterns, such as household acids or bases"
    ],
    "observation": "Lemon juice turns blue litmus red (acidic, pH ≈ 2-3). Soap solution turns red litmus blue (basic, pH ≈ 9-10). Distilled water shows neutral pH ≈ 7. Milk is slightly acidic (pH ≈ 6.5). Salt water is neutral to slightly basic depending on salt type.",
    "result": "Different solutions have different pH values, confirming the presence of acids, bases, and neutral substances. The pH scale helps identify the strength of acidity or basicity.",
    "precautions": [
      "Use clean test tubes for each sample to avoid contamination",
      "Do not taste any solutions",
      "Read the pH value by comparing with the provided color chart",
      "Use distilled water as control for neutral reference",
      "Handle concentrated acids and bases with care"
    ],
    "viva": [
      {
        "q": "What does pH stand for?",
        "a": "pH stands for 'power of hydrogen', measuring the concentration of hydrogen ions in a solution."
      },
      {
        "q": "What is the pH range for neutral solutions?",
        "a": "The pH range for neutral solutions is 7.0."
      },
      {
        "q": "How does universal indicator paper differ from litmus paper?",
        "a": "Universal indicator shows a range of pH values through color changes, while litmus paper only distinguishes acidic from basic solutions."
      },
      {
        "q": "What color does universal indicator turn in basic solutions?",
        "a": "Universal indicator turns blue or purple in basic solutions."
      }
    ]
  },
  {
    "slug": "to-study-double-displacement-precipitation-reaction",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Study a Double Displacement (Precipitation) Reaction",
    "aim": "To observe the formation of an insoluble precipitate when two soluble salts are mixed, demonstrating a double displacement reaction.",
    "materials": [
      "Silver nitrate solution",
      "Sodium chloride solution",
      "Test tubes",
      "Dropper",
      "Beaker",
      "Filter paper",
      "Funnel"
    ],
    "theory": "A double displacement reaction occurs when two compounds exchange ions to form new compounds. When silver nitrate and sodium chloride solutions are mixed, a double displacement occurs: AgNO3 + NaCl → AgCl (white precipitate) + NaNO3. AgCl is insoluble, forming a white precipitate.",
    "procedure": [
      "Take a test tube and add 2 mL of silver nitrate solution",
      "Add 2 mL of sodium chloride solution dropwise using a dropper",
      "Observe the formation of a white precipitate immediately",
      "Continue adding NaCl until no more precipitate forms (slight excess)",
      "Note the appearance of the precipitate",
      "Filter the mixture to separate the precipitate from the solution",
      "Wash the precipitate with distilled water",
      "Dry the precipitate and observe its color and texture"
    ],
    "observation": "When silver nitrate is mixed with sodium chloride solution, a white precipitate forms immediately. The precipitate is silver chloride (AgCl). The solution becomes turbid. The white precipitate is insoluble in water and settles at the bottom.",
    "result": "A double displacement reaction is demonstrated by the formation of white silver chloride precipitate. The reaction is: AgNO3 + NaCl → AgCl (white ppt.) + NaNO3.",
    "precautions": [
      "Handle silver nitrate carefully as it can stain skin and clothes black",
      "Avoid splashing solutions",
      "Use appropriate quantities to avoid waste",
      "Do not use excess reagents",
      "Dispose of the precipitate as chemical waste safely"
    ],
    "viva": [
      {
        "q": "What is a double displacement reaction?",
        "a": "A double displacement reaction is when two compounds exchange ions to form two new compounds."
      },
      {
        "q": "What is the color of silver chloride precipitate?",
        "a": "Silver chloride precipitate is white in color."
      },
      {
        "q": "Why does a precipitate form?",
        "a": "A precipitate forms because silver chloride is insoluble in water."
      },
      {
        "q": "Write the equation for the reaction.",
        "a": "AgNO3 + NaCl → AgCl (white ppt.) + NaNO3"
      }
    ]
  },
  {
    "slug": "to-test-acids-and-bases-with-indicators",
    "classLevel": "Class 9",
    "subject": "Chemistry",
    "title": "To Test Acids and Bases with Indicators",
    "aim": "To test the acidic or basic nature of different solutions using natural and chemical indicators.",
    "materials": [
      "Distilled water",
      "Acids (HCl, acetic acid)",
      "Bases (NaOH, ammonia solution)",
      "Litmus solution (red and blue)",
      "Turmeric paste/powder",
      "Red cabbage juice",
      "Test tubes",
      "Dropper"
    ],
    "theory": "Indicators are substances that change color in the presence of acids or bases due to changes in pH. Litmus paper is the most common indicator. Natural indicators like turmeric and red cabbage juice also change color with pH. Acids turn blue litmus red, while bases turn red litmus blue.",
    "procedure": [
      "Take 5-6 test tubes and add samples of different solutions (HCl, NaOH, distilled water, lemon juice, soap solution, salt solution)",
      "Add 2-3 drops of blue litmus solution to each test tube - acidic solutions will turn it red",
      "Add 2-3 drops of red litmus solution to another set - basic solutions will turn it blue",
      "Test with turmeric paste by adding a small amount to each solution - turmeric turns black in basic solution",
      "Test with red cabbage juice - it turns blue-green in basic solution and pink/red in acidic solution",
      "Observe and record color changes in a table",
      "Compare results from different indicators"
    ],
    "observation": "HCl solution turns blue litmus red (acidic). NaOH solution turns red litmus blue (basic). Distilled water shows no change with either litmus (neutral). Lemon juice is acidic, soap solution is basic, and salt solution is approximately neutral.",
    "result": "Different indicators show characteristic color changes in acidic and basic solutions. The results confirm the acidic or basic nature of test solutions, consistent across different indicators.",
    "precautions": [
      "Use fresh indicator solutions for accurate results",
      "Do not mix indicators unless intentionally comparing",
      "Use distilled water as a control for neutral reference",
      "Handle acids and bases carefully",
      "Record observations immediately for accuracy"
    ],
    "viva": [
      {
        "q": "What is an indicator?",
        "a": "An indicator is a substance that changes color in the presence of acids or bases."
      },
      {
        "q": "What color does blue litmus turn in acidic solution?",
        "a": "Blue litmus turns red in acidic solution."
      },
      {
        "q": "What is the color change of turmeric in basic solution?",
        "a": "Turmeric changes from yellow to black in basic solution."
      },
      {
        "q": "Why does red cabbage juice change color with acids and bases?",
        "a": "Red cabbage juice contains a natural indicator that changes color due to pH changes."
      }
    ]
  },
  {
    "slug": "to-verify-conservation-of-mass",
    "classLevel": "Class 9",
    "subject": "Chemistry",
    "title": "To Verify the Law of Conservation of Mass",
    "aim": "To demonstrate that the total mass of reactants equals the total mass of products in a chemical reaction.",
    "materials": [
      "Balance (accurate)",
      "Lead nitrate solution",
      "Potassium iodide solution",
      "Test tubes",
      "Beaker",
      "Distilled water",
      "Weighing paper"
    ],
    "theory": "The law of conservation of mass states that in a chemical reaction, the total mass of reactants equals the total mass of products. No mass is created or destroyed, only rearranged. In the reaction Pb(NO3)2 + 2KI → PbI2 (yellow ppt.) + 2KNO3, the mass before and after reaction is the same.",
    "procedure": [
      "Take a clean, dry beaker and weigh it on a balance - record this mass",
      "Add measured quantities of lead nitrate solution and potassium iodide solution to the beaker",
      "Record the total mass of the beaker plus solutions",
      "Mix the two solutions thoroughly and observe the formation of yellow precipitate (PbI2)",
      "Weigh the beaker with all contents after reaction is complete - record this mass",
      "Compare the mass before reaction with the mass after reaction",
      "Account for any small differences (water evaporation, weighing errors)"
    ],
    "observation": "When lead nitrate solution is mixed with potassium iodide solution, a bright yellow precipitate of lead iodide forms immediately. The mixture becomes turbid. The mass of the system before and after the reaction remains essentially the same.",
    "result": "The law of conservation of mass is verified. Mass before reaction = [value] g, Mass after reaction = [value] g. The small difference (if any) is due to water loss or weighing errors, not loss of chemical mass.",
    "precautions": [
      "Ensure the balance is calibrated before use",
      "Use a covered beaker or watch glass to prevent water evaporation",
      "Record measurements immediately",
      "Allow reactions to complete before weighing",
      "Use appropriate quantities of reactants"
    ],
    "viva": [
      {
        "q": "State the law of conservation of mass.",
        "a": "The law of conservation of mass states that the total mass of reactants equals the total mass of products in a chemical reaction."
      },
      {
        "q": "Why is the beaker weighed before adding reactants?",
        "a": "To establish the initial mass of the system so it can be compared with the final mass after reaction."
      },
      {
        "q": "What is the yellow precipitate formed in this experiment?",
        "a": "The yellow precipitate is lead iodide (PbI2)."
      },
      {
        "q": "What could cause a difference in mass measurements?",
        "a": "Water evaporation, weighing errors, and incomplete transfer of products can cause small differences."
      }
    ]
  },
  {
    "slug": "to-study-the-effect-of-temperature-on-reaction-rate",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Study the Effect of Temperature on Reaction Rate",
    "aim": "To observe how increasing temperature increases the rate of a chemical reaction.",
    "materials": [
      "Sodium thiosulfate solution",
      "Dilute hydrochloric acid",
      "Beakers",
      "Thermometer",
      "Stopwatch",
      "Water bath/hot plate",
      "White paper/tile"
    ],
    "theory": "The rate of a chemical reaction increases with temperature. This is because higher temperature increases the kinetic energy of molecules, leading to more frequent and energetic collisions. In the reaction between sodium thiosulfate and HCl, a white precipitate (sulfur) forms, and the time taken to form it decreases at higher temperatures.",
    "procedure": [
      "Take 25 mL of sodium thiosulfate solution in a beaker",
      "Record the initial temperature of the solution using a thermometer",
      "Add 5 mL of dilute HCl and immediately start the stopwatch",
      "Observe the solution from above against a white paper/tile and note the time when the precipitate is just visible (solution becomes turbid)",
      "Record the time taken for the white precipitate to form",
      "Repeat the experiment at different temperatures (30°C, 40°C, 50°C, 60°C, 70°C) by heating the sodium thiosulfate solution before adding HCl",
      "Plot a graph of temperature vs. time taken",
      "The graph will show an inverse relationship - higher temperature means less time"
    ],
    "observation": "At 30°C, the white precipitate forms after [time] seconds. At 50°C, it forms after [shorter time] seconds. At 70°C, it forms in even less time. As temperature increases, the time taken for precipitate formation decreases, indicating faster reaction rate.",
    "result": "The experiment demonstrates that increasing temperature increases the reaction rate. The time taken to form white sulfur precipitate decreases as temperature increases from 30°C to 70°C.",
    "precautions": [
      "Ensure accurate temperature measurement before each trial",
      "Use the same volume and concentration of solutions for each trial",
      "Start the stopwatch immediately after mixing",
      "Observe the turbidity point consistently across all trials",
      "Allow solutions to cool before reheating to avoid temperature overshoot"
    ],
    "viva": [
      {
        "q": "How does temperature affect reaction rate?",
        "a": "Increasing temperature increases reaction rate by providing molecules with more kinetic energy for faster collisions."
      },
      {
        "q": "What is the white precipitate formed in this experiment?",
        "a": "The white precipitate is sulfur formed from the reaction between sodium thiosulfate and hydrochloric acid."
      },
      {
        "q": "Why does the time decrease at higher temperatures?",
        "a": "At higher temperatures, molecules move faster and collide more frequently with greater energy, speeding up the reaction."
      },
      {
        "q": "What is the relationship between temperature and reaction rate?",
        "a": "Reaction rate is directly proportional to temperature; approximately doubling for every 10°C increase (rough rule)."
      }
    ]
  },
  {
    "slug": "to-determine-melting-and-boiling-points",
    "classLevel": "Class 9",
    "subject": "Chemistry",
    "title": "To Determine Melting and Boiling Points of a Pure Substance",
    "aim": "To experimentally determine the melting point and boiling point of a pure substance using heating and cooling methods.",
    "materials": [
      "Pure substance (naphthalene or paradichlorobenzene)",
      "Thermometer (0-110°C)",
      "Test tube",
      "Beaker",
      "Water bath/Bunsen burner",
      "Clamp and stand",
      "Stirring rod"
    ],
    "theory": "Melting point is the temperature at which a solid changes to liquid at constant pressure. Boiling point is the temperature at which a liquid changes to vapor. For a pure substance at constant pressure, these temperatures are constant. Heat is added during melting and boiling without temperature change (latent heat).",
    "procedure": [
      "For melting point: Take a test tube containing the pure solid substance",
      "Insert a thermometer into the substance without touching the tube walls",
      "Heat the test tube gently in a water bath, stirring occasionally",
      "Note the temperature when the first drop of liquid appears (melting starts)",
      "Continue heating and note the temperature when the last crystal melts (melting ends)",
      "The melting point is the average of these two temperatures",
      "For boiling point: Heat the test tube further until the liquid boils",
      "Record the temperature at which steady boiling occurs (boiling point)"
    ],
    "observation": "The solid naphthalene appears white and opaque. Upon heating, it begins to soften at [temperature]. The first liquid drop appears, and the substance gradually melts. At [boiling point]°C, the liquid begins to boil steadily with vapor evolving.",
    "result": "The melting point of the substance is [value]°C and the boiling point is [value]°C. These values match the known values for the pure substance, confirming its purity.",
    "precautions": [
      "Use a water bath for gentle, uniform heating",
      "Stir the substance occasionally for uniform heating",
      "Do not allow the thermometer to touch the tube walls",
      "Record observations carefully at the exact moment of melting/boiling",
      "Cool before removing the tube from the bath"
    ],
    "viva": [
      {
        "q": "What is the melting point?",
        "a": "Melting point is the temperature at which a solid changes to liquid at constant atmospheric pressure."
      },
      {
        "q": "Why is a water bath preferred over direct flame?",
        "a": "A water bath provides uniform, gentle heating and prevents decomposition of the substance at high local temperatures."
      },
      {
        "q": "What is latent heat of fusion?",
        "a": "Latent heat of fusion is the heat energy required to change a solid to liquid at constant temperature."
      },
      {
        "q": "How does pressure affect boiling point?",
        "a": "Higher pressure increases the boiling point; lower pressure decreases it."
      }
    ]
  },
  {
    "slug": "to-study-simple-pendulum-and-find-g",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Study a Simple Pendulum and Find the Acceleration Due to Gravity (g)",
    "aim": "To determine the value of g using a simple pendulum by studying the relationship between time period and length.",
    "materials": [
      "Simple pendulum setup",
      "Meter scale",
      "Stopwatch",
      "Bob (weight)",
      "String",
      "Clamp and stand",
      "Protractor"
    ],
    "theory": "The time period T of a simple pendulum is given by T = 2π√(L/g), where L is length and g is acceleration due to gravity. By measuring the time period for different lengths, a graph of T² vs L is plotted. The slope equals 4π²/g, from which g can be calculated.",
    "procedure": [
      "Set up a simple pendulum by suspending a bob with a string from a fixed point",
      "Measure the length L of the pendulum from the point of suspension to the center of the bob",
      "Displace the bob by a small angle (less than 15 degrees) and release it",
      "Measure the time for 20 oscillations using a stopwatch",
      "Calculate the time period: T = Time for 20 oscillations / 20",
      "Repeat for 6-7 different lengths from 30 cm to 100 cm",
      "Plot a graph of T² (y-axis) vs L (x-axis); it should be a straight line through origin",
      "Calculate slope = 4π²/g; therefore g = 4π²/slope"
    ],
    "observation": "For L = 25 cm, T ≈ 1.0 second. For L = 100 cm, T ≈ 2.0 seconds. The relationship shows that time period increases with increasing length. The T² vs L graph is linear, confirming the theoretical relationship.",
    "result": "The value of g is determined to be approximately [value] m/s², which is close to the standard value of 9.8 m/s² at Earth's surface.",
    "precautions": [
      "Ensure the suspension point is fixed and rigid",
      "Measure length from the point of suspension to the center of the bob",
      "Use small amplitude oscillations (less than 15 degrees)",
      "Measure time for multiple oscillations to reduce error",
      "Perform readings at least 3 times for each length and take average",
      "Ensure the bob does not collide with obstacles"
    ],
    "viva": [
      {
        "q": "What is the formula for the time period of a simple pendulum?",
        "a": "T = 2π√(L/g), where L is length and g is acceleration due to gravity."
      },
      {
        "q": "Why should the amplitude of oscillation be small?",
        "a": "For small amplitudes, the pendulum behaves as a simple harmonic oscillator and the formula is valid. Large amplitudes make the period dependent on amplitude."
      },
      {
        "q": "What is the relationship between T² and L?",
        "a": "T² is directly proportional to L. The graph of T² vs L is linear with slope = 4π²/g."
      },
      {
        "q": "Why do we plot T² vs L instead of T vs L?",
        "a": "Plotting T² vs L gives a linear graph, making it easier to find g from the slope."
      }
    ]
  },
  {
    "slug": "to-verify-laws-of-reflection-of-sound",
    "classLevel": "Class 9",
    "subject": "Physics",
    "title": "To Verify the Laws of Reflection of Sound",
    "aim": "To demonstrate that sound follows the laws of reflection similar to light when it reflects off hard surfaces.",
    "materials": [
      "Two cardboard tubes or pipes",
      "Ticking clock or phone speaker",
      "Smooth hard wall or reflector",
      "Meter scale",
      "Protractor",
      "Stand/clamp"
    ],
    "theory": "Sound waves reflect off hard surfaces following the laws of reflection: the angle of incidence equals the angle of reflection, and both lie in the same plane as the normal. The reflected sound can be heard clearly if the observer is positioned at the correct angle.",
    "procedure": [
      "Place a ticking clock or speaker near the end of one cardboard tube (incident tube)",
      "Position the second cardboard tube (reflecting tube) such that it can receive the reflected sound",
      "Keep both tubes on either side of a hard vertical surface at equal angles to the normal",
      "Ensure the incident tube points toward the hard surface at an angle",
      "Listen through the reflecting tube to hear the reflected sound from the clock",
      "Measure the angle of incidence (angle between incident tube and normal)",
      "Measure the angle of reflection (angle between reflected tube and normal)",
      "Adjust the reflecting tube's position until maximum sound is heard",
      "Repeat with different angles of incidence"
    ],
    "observation": "When the incident tube makes an angle with the normal, the reflected sound is clearly heard only when the reflecting tube is positioned at an equal angle on the opposite side of the normal. The intensity of sound is maximum when the angles are equal.",
    "result": "The laws of reflection are verified for sound. The angle of incidence equals the angle of reflection in all cases, confirming that sound reflects following the same laws as light.",
    "precautions": [
      "Use smooth, hard surfaces for better reflection",
      "Ensure both tubes are at the same height for fair comparison",
      "Measure angles from the normal perpendicular to the surface",
      "Use a consistent sound source throughout the experiment",
      "Avoid other sound reflections from nearby objects"
    ],
    "viva": [
      {
        "q": "State the laws of reflection of sound.",
        "a": "The angle of incidence equals the angle of reflection, and both rays lie in the same plane as the normal."
      },
      {
        "q": "How is reflection of sound different from refraction?",
        "a": "Reflection returns the sound back from the surface, while refraction would bend the sound when passing through different media."
      },
      {
        "q": "Why does reflected sound have lower intensity than incident sound?",
        "a": "Some energy is absorbed by the surface, and some is dispersed in other directions, reducing the reflected sound intensity."
      },
      {
        "q": "What type of surfaces are best for sound reflection?",
        "a": "Hard, smooth, solid surfaces like stone, glass, and metal are best for sound reflection."
      }
    ]
  },
  {
    "slug": "to-prepare-a-temporary-mount-of-a-leaf",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Prepare a Temporary Mount of a Leaf",
    "aim": "To prepare and observe the internal structure of a leaf section under a microscope, identifying vascular tissues and mesophyll.",
    "materials": [
      "Fresh leaf (Hibiscus, Rhoeo, or similar)",
      "Microscope slides",
      "Cover slips",
      "Distilled water",
      "Safranin dye",
      "Scalpel or razor blade",
      "Compound microscope",
      "Dropper"
    ],
    "theory": "A leaf has an upper epidermis, palisade mesophyll, spongy mesophyll, lower epidermis, and vascular bundles. A cross-section of the leaf shows these layers distinctly. The vascular bundles contain xylem and phloem for transport. Safranin staining helps visualize the tissues clearly.",
    "procedure": [
      "Take a fresh green leaf and select a portion suitable for sectioning",
      "Using a sharp scalpel, carefully cut a very thin cross-section of the leaf midrib",
      "Place the thin section on a microscope slide",
      "Add a drop of distilled water to the section",
      "Carefully lower a cover slip to avoid trapping air bubbles",
      "Gently apply safranin stain by dropping it at the edge of the cover slip",
      "Allow it to diffuse for 2-3 minutes",
      "Observe under low magnification first, then switch to high magnification",
      "Identify and draw the different layers: upper epidermis, palisade mesophyll, spongy mesophyll, lower epidermis, and vascular bundle"
    ],
    "observation": "The leaf cross-section shows a clear upper epidermis (single layer of rectangular cells), palisade mesophyll (vertically arranged cells with chloroplasts), spongy mesophyll (loosely arranged cells with large intercellular spaces), lower epidermis (with stomata), and a vascular bundle containing xylem and phloem.",
    "result": "The temporary mount clearly displays the internal structure of the leaf with all major tissues visible. The safranin staining helps distinguish the different cell types and tissue organization.",
    "precautions": [
      "Cut thin sections to allow light to pass through",
      "Avoid trapping air bubbles under the cover slip",
      "Use distilled water to prevent salt crystal formation",
      "Apply stain gently to avoid displacing the section",
      "Focus carefully as the section may be fragile"
    ],
    "viva": [
      {
        "q": "What are the different layers of a leaf cross-section?",
        "a": "A leaf has upper epidermis, palisade mesophyll, spongy mesophyll, lower epidermis, and vascular bundles."
      },
      {
        "q": "What is the function of the palisade mesophyll?",
        "a": "The palisade mesophyll contains abundant chloroplasts and is responsible for photosynthesis."
      },
      {
        "q": "Why does the spongy mesophyll have large intercellular spaces?",
        "a": "Large intercellular spaces allow for gas exchange within the leaf and help in transpiration."
      },
      {
        "q": "What do vascular bundles contain?",
        "a": "Vascular bundles contain xylem (for water transport) and phloem (for food transport)."
      }
    ]
  },
  {
    "slug": "to-separate-mixture-components-by-chromatography",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Separate Mixture Components by Chromatography",
    "aim": "To separate and identify the different pigments in plant leaves or ink using paper chromatography.",
    "materials": [
      "Chromatography paper",
      "Beaker",
      "Solvent (alcohol or petroleum ether)",
      "Green leaf or colored ink",
      "Pencil",
      "Clips",
      "Scissors"
    ],
    "theory": "Paper chromatography is a separation technique based on differential solubility and adsorption. Different pigments move at different rates (Rf values) in the solvent. Pigments in plants include chlorophyll a, chlorophyll b, carotene, and xanthophyll, each with distinct colors and Rf values.",
    "procedure": [
      "Cut a strip of chromatography paper and draw a pencil line 2 cm from the bottom",
      "Crush a green leaf in a little solvent to extract pigments",
      "Apply the extract as a small spot on the pencil line using a dropper",
      "Pour the solvent into a beaker to a depth of 1 cm",
      "Hang the paper strip in the beaker using a clip such that the spot is above the solvent level",
      "Allow the solvent to move up the paper (capillary action) until it reaches near the top",
      "Remove the paper and immediately mark the solvent front line with pencil",
      "Observe the different colored bands of pigments on the paper",
      "Calculate Rf values for each pigment: Rf = Distance traveled by pigment / Distance traveled by solvent"
    ],
    "observation": "Different pigments separate and appear as distinct colored bands: Yellow (carotene), orange (xanthophyll), blue-green (chlorophyll a), and yellow-green (chlorophyll b). Each pigment has a characteristic Rf value.",
    "result": "The leaf pigments are successfully separated by paper chromatography, revealing four main pigments. The Rf values and colors confirm the presence of chlorophyll a, chlorophyll b, carotene, and xanthophyll.",
    "precautions": [
      "Use a pencil (not pen) as the baseline as pen marks may dissolve in the solvent",
      "Keep the spot above the solvent level initially to prevent direct dissolution",
      "Avoid touching the paper with fingers to prevent contamination",
      "Ensure the chamber is sealed to maintain constant solvent vapor",
      "Work in a well-ventilated area due to solvent fumes"
    ],
    "viva": [
      {
        "q": "What is paper chromatography?",
        "a": "Paper chromatography is a separation technique that separates components based on their differential movement in a solvent."
      },
      {
        "q": "What is the Rf value?",
        "a": "Rf (retention factor) is the ratio of distance traveled by solute to distance traveled by solvent front."
      },
      {
        "q": "Which pigment travels farthest in chromatography?",
        "a": "Carotene (orange) travels farthest as it is most soluble in the solvent used."
      },
      {
        "q": "Why are there multiple pigments in a leaf?",
        "a": "Leaves contain multiple pigments for efficient photosynthesis and light absorption at different wavelengths."
      }
    ]
  },
  {
    "slug": "to-study-binary-fission-in-amoeba-and-budding-in-yeast",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Study Binary Fission in Amoeba and Budding in Yeast",
    "aim": "To observe asexual reproduction in Amoeba (binary fission) and Yeast (budding) under a microscope.",
    "materials": [
      "Amoeba culture",
      "Yeast culture",
      "Microscope slides",
      "Cover slips",
      "Compound microscope",
      "Dropper",
      "Distilled water"
    ],
    "theory": "Binary fission in Amoeba is asexual reproduction where the organism divides into two equal daughter cells after DNA replication. Budding in yeast is asexual reproduction where a small outgrowth (bud) forms on the mother cell, develops, and separates to form a new individual.",
    "procedure": [
      "Prepare a wet mount of Amoeba culture by placing a drop on a slide with a cover slip",
      "Observe under the microscope at 40X magnification",
      "Look for Amoeba showing stages of binary fission: early stage with dividing nucleus, later stage with furrow formation, and two separate daughter cells",
      "For yeast, prepare a wet mount of yeast culture",
      "Observe yeast cells showing budding: small bud emerging from mother cell, bud growing, and bud separating",
      "Record observations of different stages of reproduction",
      "Draw labeled diagrams of the observed stages"
    ],
    "observation": "Amoeba cells in different stages of binary fission are observed. The nucleus divides, and the cytoplasm cleaves to form two identical daughter cells. Yeast cells show different stages of budding with small buds emerging from mother cells and larger buds ready to separate.",
    "result": "Both asexual reproduction processes are successfully observed. Amoeba reproduces by binary fission producing two equal cells, while yeast reproduces by budding producing unequal cells (small bud and large mother cell).",
    "precautions": [
      "Keep cultures fresh and use sterile techniques",
      "Do not press the cover slip too hard",
      "Observe slides quickly as organisms may drift in water",
      "Use appropriate magnification to see cellular details",
      "Be gentle while adjusting the microscope focus"
    ],
    "viva": [
      {
        "q": "What is binary fission?",
        "a": "Binary fission is asexual reproduction where an organism divides into two equal daughter cells."
      },
      {
        "q": "How is budding different from binary fission?",
        "a": "In budding, an unequal division occurs with a small bud forming and separating from the mother cell."
      },
      {
        "q": "Is binary fission sexual or asexual reproduction?",
        "a": "Binary fission is asexual reproduction as it involves only one parent organism."
      },
      {
        "q": "Which organisms in the experiment show budding?",
        "a": "Yeast shows budding as its mode of asexual reproduction."
      }
    ]
  },
  {
    "slug": "to-identify-different-parts-of-a-dicot-seed-embryo",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Identify Different Parts of an Embryo of a Dicot Seed",
    "aim": "To observe and identify the different parts of a dicot seed embryo, including cotyledons, radicle, and plumule.",
    "materials": [
      "Dicot seeds (bean, pea, or groundnut soaked overnight)",
      "Petri dish",
      "Water",
      "Dissecting needle",
      "Magnifying glass",
      "Blotting paper"
    ],
    "theory": "A dicot seed embryo consists of two cotyledons (seed leaves), a radicle (embryonic root), a plumule (embryonic shoot), and a hypocotyl connecting them. The cotyledons store nutrients. Upon germination, the radicle grows downward forming the root, and the plumule grows upward forming the shoot.",
    "procedure": [
      "Soak dicot seeds (bean or pea) in water overnight to soften the seed coat",
      "Place the softened seed on a petri dish lined with blotting paper",
      "Carefully peel off the seed coat using a dissecting needle",
      "Gently separate the two cotyledons",
      "Locate and identify the small embryonic structures between the cotyledons",
      "Identify the radicle (pointed downward), the plumule (bud at the top), and the hypocotyl (connecting region)",
      "Observe the smooth surface of cotyledons that contain stored food",
      "Prepare a labeled diagram showing all identified parts"
    ],
    "observation": "After removing the seed coat, two large fleshy cotyledons are clearly visible. Between them at one end is the small radicle (looks like a small pointed structure), and at the other end is the plumule (looks like a tiny bud). The hypocotyl connects these structures to the cotyledons.",
    "result": "All major parts of the dicot seed embryo are successfully identified: two cotyledons (white and fleshy), radicle (downward), plumule (upward), and hypocotyl. The stored nutrients in cotyledons would support germination.",
    "precautions": [
      "Soak seeds adequately to make dissection easier",
      "Handle seeds gently to avoid damaging delicate structures",
      "Use a sharp dissecting needle to separate parts",
      "Do not press hard while handling the embryo",
      "Keep the seed moist during observation"
    ],
    "viva": [
      {
        "q": "What are cotyledons?",
        "a": "Cotyledons are seed leaves that store nutrients and are the first leaves to emerge during germination."
      },
      {
        "q": "What is the difference between radicle and plumule?",
        "a": "The radicle develops into the root and grows downward, while the plumule develops into the shoot and grows upward."
      },
      {
        "q": "Why are dicot seeds called dicots?",
        "a": "Dicot seeds are called dicots because they have two cotyledons."
      },
      {
        "q": "What is the function of the hypocotyl?",
        "a": "The hypocotyl is the region between the radicle and cotyledons that helps connect these structures during development."
      }
    ]
  },
  {
    "slug": "to-determine-percentage-of-water-absorbed-by-raisins",
    "classLevel": "Class 9",
    "subject": "Biology",
    "title": "To Determine the Percentage of Water Absorbed by Raisins",
    "aim": "To measure the increase in mass of raisins when soaked in water and calculate the percentage of water absorbed.",
    "materials": [
      "Dried raisins",
      "Distilled water",
      "Beaker",
      "Electronic balance",
      "Paper towel",
      "Measuring cylinder"
    ],
    "theory": "When raisins (dried grapes) are soaked in water, water enters by osmosis through the semi-permeable cell membrane. The mass increases due to water uptake. The percentage increase in mass indicates the amount of water absorbed. This demonstrates osmosis and the importance of water in plant cells.",
    "procedure": [
      "Weigh a known number of dry raisins (about 10-15 grams) using an electronic balance and record the initial mass",
      "Place the raisins in a beaker and add distilled water, covering them completely",
      "Allow the raisins to soak for 30 minutes to 1 hour",
      "Remove the raisins and gently pat them dry with a paper towel to remove excess water",
      "Weigh the soaked raisins immediately and record the final mass",
      "Calculate the mass of water absorbed: Water mass = Final mass - Initial mass",
      "Calculate percentage of water absorbed: Percentage = (Mass of water absorbed / Initial mass) x 100",
      "Repeat the experiment 2-3 times and calculate the average percentage"
    ],
    "observation": "The dried raisins initially have a wrinkled appearance and low mass. After soaking, they become plump, smooth, and significantly heavier. The mass increases by [value] grams, corresponding to [value]% water absorption.",
    "result": "The percentage of water absorbed by raisins is approximately [value]%, confirming that raisins absorb substantial water when soaked. The plump appearance after soaking indicates significant cell turgor due to water uptake.",
    "precautions": [
      "Use distilled water to maintain consistency and avoid dissolved salts",
      "Pat raisins gently with paper towel to remove surface water but not squeeze out absorbed water",
      "Weigh raisins immediately after drying to avoid further water loss",
      "Use an accurate electronic balance for precise measurements",
      "Repeat the experiment multiple times for reliable average result"
    ],
    "viva": [
      {
        "q": "Why do raisins absorb water when soaked?",
        "a": "Raisins absorb water by osmosis because the cell membrane is semi-permeable and water moves toward higher solute concentration inside the cells."
      },
      {
        "q": "What changes occur in raisins after soaking?",
        "a": "The raisins become plump, smooth, and their mass increases due to water absorption and cell turgor."
      },
      {
        "q": "Why is distilled water used instead of tap water?",
        "a": "Distilled water maintains consistent osmotic potential, while tap water with dissolved minerals may give variable results."
      },
      {
        "q": "What does high percentage of water absorption indicate?",
        "a": "High water absorption indicates that a significant portion of the raisin's mass was water that was removed during drying."
      }
    ]
  },
  {
    "slug": "focal-length-convex-lens",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Find Focal Length of Convex Lens",
    "aim": "To determine the focal length of a convex lens using the lens formula and measurements from convex lens experiments",
    "materials": [
      "Convex lens",
      "Lens holder",
      "Optical bench",
      "Object (arrow/candle)",
      "Screen",
      "Measuring scale",
      "Light source"
    ],
    "theory": "A convex lens converges light rays to a focal point. The focal length is the distance from the optical center to the focal point. Using the lens formula 1/f = 1/u + 1/v where f is focal length, u is object distance, and v is image distance, we can calculate focal length from experimental measurements. The lens formula is fundamental to understanding lens behavior and image formation.",
    "procedure": [
      "Arrange the optical bench with lens holder at center and object at one end",
      "Place convex lens in the lens holder on the optical bench",
      "Place the object (arrow) at a known distance from the lens",
      "Adjust the screen position until a clear, sharp image is formed on the screen",
      "Record the object distance u and image distance v using the measuring scale",
      "Repeat for at least 5 different positions of the object",
      "Calculate focal length using 1/f = 1/u + 1/v for each trial",
      "Find average focal length from all measurements"
    ],
    "observation": "Clear sharp images formed on screen. Object distances varied from 30 cm to 60 cm. Image distances changed as object distance changed. Magnification varied in different positions. Sum of u and v remained nearly constant for all positions.",
    "result": "Focal length of convex lens determined as approximately 15 cm. The value remains consistent across multiple measurements. Lens formula verified experimentally.",
    "precautions": [
      "Use lens of known type for accurate results",
      "Ensure optical bench is horizontal and stable",
      "Keep object and screen perpendicular to the lens axis",
      "Use bright light source for clear image formation",
      "Measure distances accurately from marked position on optical bench"
    ],
    "viva": [
      {
        "q": "What is a convex lens?",
        "a": "A convex lens is a lens that bulges outward on both sides and converges parallel light rays toward a focal point. It forms real and inverted images for objects beyond focal length."
      },
      {
        "q": "Define focal length of a lens.",
        "a": "Focal length is the distance from the optical center of the lens to the focal point where parallel light rays converge or appear to diverge."
      },
      {
        "q": "What is the lens formula?",
        "a": "The lens formula is 1/f = 1/u + 1/v, where f is focal length, u is object distance, and v is image distance from the optical center."
      },
      {
        "q": "How does object distance affect image distance?",
        "a": "As object distance increases, image distance decreases. When object is at infinity, image forms at focal point. As object approaches focal point, image moves away."
      },
      {
        "q": "What is magnification of lens?",
        "a": "Magnification m = v/u = h'/h, where h' is image height and h is object height. For convex lens, m is negative for real images and positive for virtual images."
      },
      {
        "q": "Why must the screen be perpendicular to lens axis?",
        "a": "The screen must be perpendicular to the optical axis to avoid distortion of the image and to ensure the image is formed on the screen plane for accurate measurement."
      }
    ]
  },
  {
    "slug": "laws-series-resistances",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Verify Laws of Series Resistances",
    "aim": "To verify the laws of series resistances and demonstrate that total resistance in series equals sum of individual resistances",
    "materials": [
      "Three resistors of known values",
      "Ammeter",
      "Voltmeter",
      "Rheostat",
      "Battery and switch",
      "Connecting wires",
      "Plugged key"
    ],
    "theory": "In series circuits, resistors are connected end to end and same current flows through all resistors. The voltage divides among resistors proportional to their resistance. Total resistance R_total = R1 + R2 + R3. The voltage across series resistors follows Ohm's law: V = IR. This arrangement is used in applications requiring controlled voltage drop.",
    "procedure": [
      "Connect three resistors in series between battery terminals through ammeter and switch",
      "Connect voltmeter across the first resistor",
      "Close the switch and note ammeter reading and voltmeter reading",
      "Move voltmeter to measure voltage across second resistor, note readings",
      "Move voltmeter to measure voltage across third resistor, note readings",
      "Measure total voltage across all three resistors using voltmeter",
      "Vary the current using rheostat and repeat measurements",
      "Calculate individual resistances using Ohm's law: R = V/I",
      "Compare total measured resistance with sum of individual resistances"
    ],
    "observation": "Same current flows through all three resistors (ammeter reading constant). Voltages add up: V_total = V1 + V2 + V3. Larger resistors have larger voltage drop. Total voltage equals sum of individual voltages. Current remains constant throughout series circuit.",
    "result": "Law of series resistances verified: R_total = R1 + R2 + R3. Voltage distribution is proportional to resistance values. Equivalent resistance of series combination determined.",
    "precautions": [
      "Check ammeter range before connecting",
      "Use voltmeter of appropriate range for measurements",
      "Connect ammeter in series with circuit",
      "Connect voltmeter in parallel across resistor",
      "Keep rheostat at maximum resistance before closing switch"
    ],
    "viva": [
      {
        "q": "What is series connection of resistors?",
        "a": "Series connection is when resistors are connected end to end in a single path so same current flows through all of them."
      },
      {
        "q": "How do voltages behave in series circuit?",
        "a": "In series circuit, total voltage equals sum of individual voltages across each resistor. Voltage divides proportional to resistance values."
      },
      {
        "q": "What is equivalent resistance in series?",
        "a": "Equivalent resistance in series is R_eq = R1 + R2 + R3 + ... The total resistance is greater than any individual resistance."
      },
      {
        "q": "Why is ammeter connected in series?",
        "a": "Ammeter is connected in series because it measures current flowing through circuit and must have minimal resistance so it does not affect circuit."
      },
      {
        "q": "What happens if one resistor burns out in series circuit?",
        "a": "If one resistor burns out in series circuit, the entire circuit breaks and no current flows as the series path is interrupted."
      },
      {
        "q": "Compare series with parallel resistors.",
        "a": "In series, same current flows through all and voltage divides. In parallel, voltage remains same across all and current divides. Series has higher total resistance while parallel has lower."
      }
    ]
  },
  {
    "slug": "laws-parallel-resistances",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Verify Laws of Parallel Resistances",
    "aim": "To verify the laws of parallel resistances and demonstrate that reciprocal of total resistance equals sum of reciprocals of individual resistances",
    "materials": [
      "Three resistors of known values",
      "Ammeter",
      "Voltmeter",
      "Rheostat",
      "Battery and switch",
      "Connecting wires",
      "Plugged key"
    ],
    "theory": "In parallel circuits, resistors are connected across same voltage source so voltage across each is same. Current divides among resistors inversely proportional to their resistance. The reciprocal law states: 1/R_total = 1/R1 + 1/R2 + 1/R3. Parallel arrangement is used when same voltage is needed across multiple devices.",
    "procedure": [
      "Connect three resistors in parallel between battery terminals",
      "Connect ammeter in series with battery to measure total current",
      "Connect voltmeter across parallel combination",
      "Close switch and note voltmeter reading",
      "Insert ammeter in series with first resistor and note current I1",
      "Similarly measure currents I2 and I3 through second and third resistors",
      "Measure total current I_total from battery",
      "Calculate resistances using R = V/I",
      "Verify reciprocal law: 1/R_total = 1/R1 + 1/R2 + 1/R3"
    ],
    "observation": "Voltage remains same across all resistors. Different currents flow through different resistors based on their resistance. Total current: I_total = I1 + I2 + I3. Smaller resistance carries larger current. Total current is sum of individual currents.",
    "result": "Law of parallel resistances verified: 1/R_total = 1/R1 + 1/R2 + 1/R3. Total resistance less than smallest individual resistance. Current distribution verified.",
    "precautions": [
      "Use suitable ammeter range for measuring currents",
      "Ensure voltmeter reads same value across all parallel branches",
      "Connect ammeter in series with each branch separately",
      "Start with maximum rheostat resistance",
      "Avoid short circuits while changing connections"
    ],
    "viva": [
      {
        "q": "What is parallel connection of resistors?",
        "a": "Parallel connection is when multiple resistors are connected across same voltage source with different current paths."
      },
      {
        "q": "How do currents behave in parallel circuit?",
        "a": "In parallel circuit, total current equals sum of individual currents through each branch: I_total = I1 + I2 + I3."
      },
      {
        "q": "What is the reciprocal law for parallel resistance?",
        "a": "The reciprocal law states that 1/R_total = 1/R1 + 1/R2 + 1/R3. The reciprocal of equivalent resistance equals sum of reciprocals."
      },
      {
        "q": "Why is current distribution unequal in parallel circuit?",
        "a": "In parallel circuit, current is inversely proportional to resistance. Lower resistance branches draw more current while higher resistance draws less."
      },
      {
        "q": "What happens if one resistor burns out in parallel circuit?",
        "a": "If one resistor burns out in parallel circuit, only that branch breaks. Other branches continue to work as they have separate paths."
      },
      {
        "q": "Which connection needs lower voltage source: series or parallel?",
        "a": "Parallel connection needs lower voltage source compared to series because same voltage appears across each resistor in parallel arrangement."
      }
    ]
  },
  {
    "slug": "determine-equivalent-resistance",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Determine Equivalent Resistance of Combination",
    "aim": "To determine the equivalent resistance of a combination of resistors arranged in series-parallel configuration",
    "materials": [
      "Multiple resistors of known values",
      "Ammeter",
      "Voltmeter",
      "Rheostat",
      "Battery and switch",
      "Connecting wires",
      "Plugged key"
    ],
    "theory": "Resistors in circuits can be arranged in series, parallel, or series-parallel combination. Equivalent resistance can be calculated using combination rules. For series: R_eq = R1 + R2. For parallel: 1/R_eq = 1/R1 + 1/R2. Complex circuits require applying rules to different sections separately.",
    "procedure": [
      "Design series-parallel combination with given resistors",
      "Connect combination between battery terminals through ammeter",
      "Measure voltage across entire combination using voltmeter",
      "Note ammeter reading for total current through circuit",
      "Calculate equivalent resistance using R_eq = V/I",
      "Calculate equivalent resistance theoretically using combination rules",
      "Compare experimental and theoretical values",
      "Repeat with different series-parallel configurations"
    ],
    "observation": "Voltage and current measurements recorded for combination. Equivalent resistance calculated from experimental data. Theoretical calculation matches experimental results closely. Different configurations give different equivalent resistance values.",
    "result": "Equivalent resistance determined experimentally and verified theoretically. Series-parallel combination rules validated through measurements.",
    "precautions": [
      "Clearly identify series and parallel sections before connecting",
      "Measure voltage across entire combination accurately",
      "Record ammeter reading carefully",
      "Use appropriate meter ranges",
      "Verify polarity while connecting meters"
    ],
    "viva": [
      {
        "q": "What is a series-parallel combination of resistors?",
        "a": "Series-parallel combination is when some resistors are connected in series with a parallel combination or parallel groups are in series."
      },
      {
        "q": "How to find equivalent resistance of series-parallel combination?",
        "a": "First simplify parallel groups to single equivalent resistance, then add all series resistances. Apply rules step by step for complex combinations."
      },
      {
        "q": "What is the advantage of series-parallel arrangement?",
        "a": "Series-parallel arrangement provides flexibility to achieve desired voltage and current levels. It uses fewer resistors than pure series while providing better current handling than pure parallel."
      },
      {
        "q": "Why do we measure voltage and current in this experiment?",
        "a": "We measure voltage and current to calculate equivalent resistance using Ohm's law R = V/I, which is the experimental method to determine resistance."
      },
      {
        "q": "Can equivalent resistance be less than smallest individual resistance?",
        "a": "Yes, equivalent resistance of parallel combination is always less than smallest individual resistance in that group."
      },
      {
        "q": "What happens to total current when equivalent resistance increases?",
        "a": "When equivalent resistance increases, total current decreases for same voltage applied, following Ohm's law I = V/R."
      }
    ]
  },
  {
    "slug": "current-potential-difference-dependence",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Study Dependence of Current on Potential Difference",
    "aim": "To demonstrate that current in a conductor is directly proportional to potential difference and verify Ohm's law experimentally",
    "materials": [
      "Nichrome wire or resistor",
      "Ammeter",
      "Voltmeter",
      "Variable power supply or rheostat",
      "Battery",
      "Connecting wires",
      "Switch",
      "Graph paper"
    ],
    "theory": "Ohm's law states that current through conductor is directly proportional to potential difference applied across it at constant temperature: I = V/R or V = IR. The relationship is linear and R is constant for ohmic conductors. This fundamental law governs electric circuits and helps predict circuit behavior.",
    "procedure": [
      "Connect nichrome wire in series with ammeter and variable power supply",
      "Connect voltmeter in parallel across the nichrome wire",
      "Close switch with minimum voltage setting",
      "Record voltmeter reading and corresponding ammeter reading",
      "Increase voltage using power supply gradually in small steps",
      "Record ammeter and voltmeter readings for each voltage",
      "Take at least 6-8 readings for wide voltage range",
      "Plot graph with voltage on X-axis and current on Y-axis",
      "Verify linear relationship and calculate resistance from slope"
    ],
    "observation": "Current increases as voltage increases. Relationship is linear and passes through origin. Resistance remains constant throughout experiment. Graph shows straight line confirming direct proportionality.",
    "result": "Current is directly proportional to potential difference. V/I ratio remains constant confirming Ohm's law. Resistance of nichrome wire determined from graph slope.",
    "precautions": [
      "Do not exceed maximum voltage of power supply",
      "Use appropriate meter ranges for all measurements",
      "Ensure wire does not heat excessively",
      "Connect voltmeter in parallel across conductor",
      "Connect ammeter in series with circuit",
      "Take readings at small voltage intervals for accuracy"
    ],
    "viva": [
      {
        "q": "State Ohm's law.",
        "a": "Ohm's law states that the current through a conductor is directly proportional to the potential difference applied across it, provided temperature remains constant. Mathematically: V = IR or I = V/R."
      },
      {
        "q": "What is an ohmic conductor?",
        "a": "An ohmic conductor is one that obeys Ohm's law with constant resistance over range of currents. Examples include nichrome wire and most metals at constant temperature."
      },
      {
        "q": "Why must temperature remain constant in this experiment?",
        "a": "Temperature must remain constant because resistance of conductor changes with temperature. Heating of wire would change resistance and violate the proportionality."
      },
      {
        "q": "What does graph slope represent in this experiment?",
        "a": "The slope of V-I graph (voltage divided by current) represents the resistance of the conductor."
      },
      {
        "q": "What would happen if conductor was non-ohmic?",
        "a": "For non-ohmic conductor, V-I graph would be curved instead of straight line, and resistance would vary with applied voltage."
      },
      {
        "q": "Why is it important to connect voltmeter in parallel?",
        "a": "Voltmeter must be in parallel to measure voltage across the conductor. If connected in series, it would change the circuit and give incorrect readings."
      }
    ]
  },
  {
    "slug": "prepare-ferrous-sulphate-crystals",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Prepare Ferrous Sulphate Crystals",
    "aim": "To prepare ferrous sulphate crystals by crystallization method and obtain pure crystals suitable for storage",
    "materials": [
      "Ferrous sulphate solution",
      "Distilled water",
      "Evaporating basin",
      "Glass rod",
      "Bunsen burner or hot plate",
      "Filter paper",
      "Funnel",
      "Beaker",
      "Thermometer"
    ],
    "theory": "Ferrous sulphate is prepared by dissolving iron filings in dilute sulphuric acid. The solution is then crystallized by cooling to obtain ferrous sulphate heptahydrate crystals. The crystallization process separates pure crystals from impurities. Ferrous sulphate crystals are light green and contain water of crystallization.",
    "procedure": [
      "Prepare ferrous sulphate solution by reacting iron filings with dilute sulphuric acid",
      "Filter the solution to remove unreacted iron and impurities",
      "Pour the filtered solution into evaporating basin",
      "Heat the solution on hot plate at low to medium temperature",
      "Stir continuously with glass rod to prevent bumping",
      "Continue heating until crystallization begins at edges",
      "Remove from heat and allow to cool to room temperature",
      "Pour hot solution into beaker for crystallization",
      "Allow crystals to form as solution cools overnight",
      "Filter the crystals using filter paper and funnel",
      "Wash crystals with small amount of cold distilled water",
      "Dry crystals between folds of filter paper"
    ],
    "observation": "Light green crystals formed during cooling. Crystals are uniform in size and shape. Solution becomes less concentrated as crystals separate. Crystals appear monoclinic in shape.",
    "result": "Ferrous sulphate crystals successfully prepared. Yield approximately 60-70 percent. Crystals are pure and suitable for storage.",
    "precautions": [
      "Do not heat solution excessively as decomposition may occur",
      "Stir continuously to prevent bumping during evaporation",
      "Allow proper cooling time for crystal formation",
      "Wash crystals with minimum water to prevent loss",
      "Ferrous sulphate oxidizes when exposed to air, keep in sealed container",
      "Handle iron filings carefully as they may rust"
    ],
    "viva": [
      {
        "q": "What is the chemical formula of ferrous sulphate heptahydrate?",
        "a": "Ferrous sulphate heptahydrate has formula FeSO4.7H2O. It contains seven molecules of water of crystallization."
      },
      {
        "q": "Why is ferrous sulphate solution greenish?",
        "a": "Ferrous sulphate solution appears greenish due to Fe2+ ions in solution. The color comes from the ferrous ion complex formation."
      },
      {
        "q": "What happens when ferrous sulphate crystals are exposed to air for long time?",
        "a": "Ferrous sulphate oxidizes in air to ferric sulphate, changing color from light green to brownish-yellow due to formation of Fe3+ ions."
      },
      {
        "q": "What is the purpose of filtration in this experiment?",
        "a": "Filtration removes unreacted iron filings and other insoluble impurities, giving a clear solution for crystallization."
      },
      {
        "q": "Why do we cool the solution for crystallization?",
        "a": "Cooling decreases solubility of ferrous sulphate, causing it to crystallize out of solution. Pure crystals separate from mother liquor."
      },
      {
        "q": "What is water of crystallization?",
        "a": "Water of crystallization is water chemically combined in crystal structure. Ferrous sulphate heptahydrate contains seven water molecules per formula unit."
      }
    ]
  },
  {
    "slug": "study-types-chemical-reactions",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Study Types of Chemical Reactions",
    "aim": "To demonstrate different types of chemical reactions through appropriate experiments",
    "materials": [
      "Copper powder",
      "Oxygen source",
      "Zinc and dilute HCl",
      "Calcium carbonate and HCl",
      "Silver nitrate and copper",
      "Iron powder and dilute HCl",
      "Magnesium ribbon",
      "Test tubes",
      "Bunsen burner",
      "Connecting wires"
    ],
    "theory": "Chemical reactions are classified into types: combination reactions join two substances, decomposition reactions break one substance, displacement reactions replace one element, double displacement reactions exchange ions, and redox reactions involve transfer of electrons. Understanding reaction types helps predict products and predict reaction outcomes.",
    "procedure": [
      "Combination reaction: Heat copper powder in open flame and observe combination with oxygen",
      "Decomposition reaction: Heat calcium carbonate in test tube and observe release of CO2",
      "Displacement reaction: Add zinc to dilute HCl and observe hydrogen gas evolution",
      "Double displacement: Mix solutions of calcium chloride and sodium carbonate and observe precipitate",
      "Redox reaction: Add copper to silver nitrate solution and observe color change",
      "Observe temperature changes during each reaction",
      "Record colors and physical changes",
      "Write chemical equations for each reaction observed"
    ],
    "observation": "Combination: Copper becomes black CuO. Decomposition: Limestone breaks down releasing gas. Displacement: Zinc reacts with acid producing hydrogen gas. Double displacement: White precipitate forms. Redox: Blue color develops.",
    "result": "Five types of chemical reactions successfully demonstrated. Each reaction shows characteristic features and products specific to that type.",
    "precautions": [
      "Do not look directly into test tube during heating",
      "Use appropriate heating temperature to avoid splattering",
      "Ensure proper ventilation for gas evolution",
      "Handle copper powder carefully to prevent oxidation",
      "Keep Bunsen burner away from combustible materials"
    ],
    "viva": [
      {
        "q": "Define combination reaction.",
        "a": "Combination reaction is reaction where two elements or compounds combine to form single compound. Example: C + O2 gives CO2."
      },
      {
        "q": "What is decomposition reaction?",
        "a": "Decomposition reaction breaks down compound into simpler substances. Example: CaCO3 decomposes to CaO and CO2 on heating."
      },
      {
        "q": "Define displacement reaction.",
        "a": "Displacement reaction is where more reactive element displaces less reactive element from its compound. Example: Zn + HCl gives ZnCl2 and H2."
      },
      {
        "q": "What is double displacement reaction?",
        "a": "Double displacement reaction is where two compounds exchange ions to form new compounds. Example: CaCl2 + Na2CO3 gives CaCO3 and NaCl."
      },
      {
        "q": "What are redox reactions?",
        "a": "Redox reactions are oxidation-reduction reactions where electrons are transferred between elements. One element is oxidized while other is reduced."
      },
      {
        "q": "How to identify reaction type?",
        "a": "Identify by counting reactants and products. Combination has fewer products, decomposition has more products, displacement has ions exchanged, and redox involves electron transfer."
      }
    ]
  },
  {
    "slug": "test-conductivity-solutions",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Test Conductivity of Solutions",
    "aim": "To test and compare electrical conductivity of various solutions and classify them as conductors or non-conductors",
    "materials": [
      "Conductivity apparatus or battery, bulb, and two electrodes",
      "Various solutions: dilute HCl, NaCl solution, sugar solution, distilled water, vinegar, milk",
      "Beaker",
      "Distilled water",
      "Dry cells or battery"
    ],
    "theory": "Electrical conductivity depends on presence and concentration of ions in solution. Ionic solutions conduct electricity due to mobile ions, while covalent solutions do not. Strong electrolytes fully ionize and conduct well, weak electrolytes partially ionize, and non-electrolytes do not ionize. Conductivity is measured by ability of solution to complete electric circuit.",
    "procedure": [
      "Assemble conductivity apparatus with battery, bulb, and two electrodes",
      "Pour dilute HCl into beaker",
      "Immerse electrodes in solution without touching",
      "Observe whether bulb glows indicating conductivity",
      "Record brightness of glow if any",
      "Empty beaker and rinse with distilled water",
      "Repeat procedure with each solution",
      "Compare conductivity of different solutions",
      "Classify solutions as good, poor, or non-conductors"
    ],
    "observation": "Dilute HCl: Bulb glows brightly (good conductor). NaCl: Bulb glows (good conductor). Vinegar: Bulb glows dimly (weak conductor). Sugar solution: No glow (non-conductor). Distilled water: No glow (non-conductor). Milk: No glow (non-conductor).",
    "result": "Solutions classified based on conductivity. Ionic solutions conducted electricity while covalent solutions did not. Concentration affects conductivity.",
    "precautions": [
      "Do not allow electrodes to touch each other",
      "Rinse beaker and electrodes between tests",
      "Use distilled water for rinsing to avoid contamination",
      "Do not use excessive voltage that may harm apparatus",
      "Ensure good contact between electrodes and solution"
    ],
    "viva": [
      {
        "q": "What makes a solution conduct electricity?",
        "a": "Solutions conduct electricity due to presence of free mobile ions that can move toward electrodes and carry charge."
      },
      {
        "q": "Classify solutions as electrolytes and non-electrolytes.",
        "a": "Electrolytes are substances that conduct electricity in solution or molten state due to ion formation. Non-electrolytes do not conduct electricity."
      },
      {
        "q": "What is the difference between strong and weak electrolytes?",
        "a": "Strong electrolytes completely ionize in solution and conduct electricity well. Weak electrolytes partially ionize and conduct electricity poorly."
      },
      {
        "q": "Why does distilled water not conduct electricity?",
        "a": "Distilled water is a non-electrolyte and does not contain ions. It has very low conductivity unless some ions are added."
      },
      {
        "q": "How does temperature affect conductivity of solutions?",
        "a": "Increasing temperature generally increases conductivity as ions move faster with higher kinetic energy."
      },
      {
        "q": "Which solution is better conductor: dilute HCl or dilute NaCl?",
        "a": "Both are good conductors. Dilute HCl has higher conductivity due to high mobility of H+ ions compared to Na+ and Cl- ions."
      }
    ]
  },
  {
    "slug": "find-ph-change-neutralization",
    "classLevel": "Class 10",
    "subject": "Chemistry",
    "title": "To Find pH Change in Neutralization Reaction",
    "aim": "To observe and record pH changes during neutralization of acid and base reaction and determine neutralization point",
    "materials": [
      "Dilute HCl or other acid",
      "Dilute NaOH or other base",
      "Burette and pipette",
      "pH meter or pH paper",
      "Beaker or conical flask",
      "Distilled water",
      "White tile",
      "Glass rod"
    ],
    "theory": "Neutralization is reaction between acid and base producing salt and water. During neutralization, H+ ions from acid combine with OH- ions from base forming water molecules. pH changes during reaction from acidic to neutral to basic depending on amount of acid or base. At equivalence point pH equals 7 for strong acid and strong base.",
    "procedure": [
      "Take known volume of dilute HCl in beaker",
      "Check initial pH using pH meter or paper",
      "Record initial pH value",
      "Add dilute NaOH using burette in small aliquots",
      "Stir well with glass rod after each addition",
      "Measure pH after each addition of NaOH",
      "Continue adding NaOH until pH becomes 7",
      "Record volume of NaOH added at each step",
      "Note the neutralization point where pH changes sharply",
      "Plot graph of pH versus volume of base added"
    ],
    "observation": "Initial pH around 1 for dilute HCl. pH increases gradually with base addition. Near equivalence point pH increases sharply. Equivalence point occurs around pH 7. After equivalence point pH increases slowly to basic region.",
    "result": "pH curve plotted showing neutralization process. Equivalence point determined. Sharp pH change region identified indicating neutralization.",
    "precautions": [
      "Use freshly prepared solutions for accurate measurements",
      "Calibrate pH meter before use",
      "Stir thoroughly after each addition for uniform mixing",
      "Use small aliquots of base near neutralization point",
      "Ensure electrodes are clean and in solution properly"
    ],
    "viva": [
      {
        "q": "What is pH scale?",
        "a": "pH scale is logarithmic scale from 0 to 14 measuring hydrogen ion concentration. pH 7 is neutral, less than 7 is acidic, more than 7 is basic."
      },
      {
        "q": "What happens during neutralization reaction?",
        "a": "During neutralization, H+ ions from acid combine with OH- ions from base to form water: H+ + OH- gives H2O."
      },
      {
        "q": "What is equivalence point in titration?",
        "a": "Equivalence point is point where acid and base have reacted completely in stoichiometric ratio to form salt and water."
      },
      {
        "q": "Why does pH change sharply near equivalence point?",
        "a": "Near equivalence point, very small addition of base causes large pH change because very few H+ ions remain to buffer the pH."
      },
      {
        "q": "What is the pH at equivalence point for strong acid and strong base?",
        "a": "For strong acid and strong base neutralization, pH at equivalence point is 7 (neutral) because salt formed does not hydrolyze."
      },
      {
        "q": "Why is the graph curve shaped that way?",
        "a": "Graph shows gradual pH increase initially, then sharp vertical rise near equivalence point, then gradual increase at higher pH. This shape is characteristic of acid-base titration."
      }
    ]
  },
  {
    "slug": "identify-monocot-dicot-seeds",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Identify Monocot and Dicot Seeds",
    "aim": "To identify and differentiate between monocot and dicot seeds based on their morphological characteristics and internal structure",
    "materials": [
      "Monocot seeds: rice, wheat, maize",
      "Dicot seeds: bean, pea, groundnut",
      "Razor blade or knife",
      "Needle",
      "Watch glass",
      "Magnifying lens",
      "Water",
      "Paper towel"
    ],
    "theory": "Monocot seeds have single cotyledon (seed leaf) while dicot seeds have two cotyledons. Monocots have endosperm and monocotyledonous embryo. Dicots have well-developed cotyledons that store food and minimal or absent endosperm. External characteristics like shape and presence of hilum differ between monocots and dicots.",
    "procedure": [
      "Soak monocot and dicot seeds in water for 2-3 hours",
      "Dry seeds on paper towel",
      "Cut seeds longitudinally using razor blade",
      "Observe external features: shape, color, size",
      "Locate embryo and cotyledons using magnifying lens",
      "Count number of cotyledons present",
      "Observe endosperm position and extent",
      "Record observations for each seed type",
      "Compare structures between monocot and dicot seeds"
    ],
    "observation": "Monocot seeds: Single cotyledon, abundant endosperm, small embryo. Dicot seeds: Two cotyledons, minimal endosperm, large embryo. Monocots have pointed one end. Dicots have rounded seed structure.",
    "result": "Successfully identified and differentiated monocot and dicot seeds based on structural characteristics. Internal organization clearly shows differences between two seed types.",
    "precautions": [
      "Use sharp blade for clean cuts",
      "Soak seeds adequately to soften for easy cutting",
      "Handle delicate structures gently",
      "Use magnifying lens for clear observation",
      "Do not crush or damage embryo while cutting"
    ],
    "viva": [
      {
        "q": "What is the difference between monocot and dicot seeds?",
        "a": "Monocot seeds have single cotyledon while dicot seeds have two cotyledons. Monocots have abundant endosperm while dicots have minimal or no endosperm."
      },
      {
        "q": "Define cotyledon.",
        "a": "Cotyledon is the seed leaf that is part of plant embryo. It provides nutrition to growing seedling or stores food."
      },
      {
        "q": "What is endosperm?",
        "a": "Endosperm is tissue in seed that stores nutrients to provide energy for developing seedling. Present abundantly in monocots."
      },
      {
        "q": "Name examples of monocot and dicot seeds.",
        "a": "Monocot examples: rice, wheat, maize, barley. Dicot examples: bean, pea, groundnut, sunflower seed."
      },
      {
        "q": "Why do dicots not need abundant endosperm?",
        "a": "Dicots have large fleshy cotyledons that store enough food for seedling development, so separate endosperm tissue is not needed."
      },
      {
        "q": "How does embryo appearance differ between monocots and dicots?",
        "a": "Monocot embryo is small with single cotyledon and scutellum. Dicot embryo is large with two cotyledons and well-developed plumule and radicle."
      }
    ]
  },
  {
    "slug": "observe-parts-flower",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Observe Parts of a Flower",
    "aim": "To identify and observe different parts of flower and understand their functions in reproduction",
    "materials": [
      "Fresh flower (hibiscus, rose, or lily)",
      "Dissecting needles",
      "Scalpel or sharp knife",
      "Watch glass or white tile",
      "Magnifying lens",
      "Forceps",
      "Paper",
      "White sheet"
    ],
    "theory": "Flower consists of four main whorls: sepals (calyx) for protection, petals (corolla) for attraction, stamens (male parts) producing pollen, and carpel (female part) containing ovules. Flower color and scent attract pollinators. Stamens contain anther producing pollen and filament supporting anther. Carpel has stigma, style, and ovary.",
    "procedure": [
      "Place fresh flower on white sheet or tile",
      "Observe external characteristics and arrangement",
      "Carefully remove sepals and count them",
      "Remove petals and count them",
      "Identify stamens and count them",
      "Separate individual stamen and examine anther and filament",
      "Examine pollen grains using magnifying lens",
      "Locate carpel at center of flower",
      "Examine stigma, style, and ovary using needle dissection",
      "Make labeled drawing of flower parts"
    ],
    "observation": "Flower has four distinct whorls. Sepals green and protective. Petals large and colored for attraction. Multiple stamens with yellow anther and thin filament. Central carpel with sticky stigma. Pollen grains visible under magnification.",
    "result": "All major flower parts successfully identified and observed. Function of each part understood. Flower anatomy clearly demonstrated.",
    "precautions": [
      "Handle flower gently to avoid damaging delicate structures",
      "Use sharp instruments for clean dissection",
      "Observe structures immediately while flower is fresh",
      "Use magnifying lens for small structures",
      "Make careful dissection not to miss internal structures"
    ],
    "viva": [
      {
        "q": "What are the four whorls of a flower?",
        "a": "The four whorls are: sepals forming calyx, petals forming corolla, stamens forming androecium, and carpel forming gynoecium."
      },
      {
        "q": "What is the function of sepals?",
        "a": "Sepals protect the flower bud during development and protect inner delicate parts. They are usually green and leaf-like."
      },
      {
        "q": "Describe stamen and its parts.",
        "a": "Stamen is male reproductive part consisting of anther and filament. Anther contains pollen sacs producing pollen. Filament is stalk supporting anther."
      },
      {
        "q": "What is carpel and its parts?",
        "a": "Carpel is female reproductive part consisting of stigma, style, and ovary. Ovary contains ovules that develop into seeds after fertilization."
      },
      {
        "q": "What is the function of petals?",
        "a": "Petals attract pollinators through bright color and fragrance. They are modified leaves with thin structure for visibility."
      },
      {
        "q": "What is pollen and its role?",
        "a": "Pollen is male gametophyte produced in anther containing male gamete. It fertilizes ovule to produce seed."
      }
    ]
  },
  {
    "slug": "study-transpiration",
    "classLevel": "Class 10",
    "subject": "Biology",
    "title": "To Study Transpiration",
    "aim": "To demonstrate and observe the process of transpiration in plants and measure the rate of water loss",
    "materials": [
      "Potted plant with leaves",
      "Measuring cylinder",
      "Water",
      "Oil or Vaseline",
      "Transparent plastic bag",
      "Thermometer",
      "Hygrometer",
      "Balance",
      "Watch or timer"
    ],
    "theory": "Transpiration is loss of water vapor from plant through leaves. It occurs mainly through stomata on leaf surface. Transpiration helps in water transport, nutrient absorption, and temperature regulation. Rate of transpiration depends on temperature, humidity, wind, and leaf surface area.",
    "procedure": [
      "Water the potted plant thoroughly",
      "Weigh the pot and plant initially",
      "Place plant in bright light and normal room conditions",
      "Measure water loss daily for one week by weighing",
      "Record weight loss as measure of transpiration",
      "Set up second plant with leaves covered with oil to reduce transpiration",
      "Compare water loss between normal and oiled plant",
      "Measure temperature and humidity during experiment",
      "Plot graph of water loss versus time"
    ],
    "observation": "Normal plant loses weight indicating water loss through transpiration. Oiled plant loses less weight as stomata are blocked. Water loss increases with temperature. Loss is greater in dry conditions.",
    "result": "Transpiration successfully demonstrated. Comparison shows stomata are main pathway for transpiration. Factors affecting transpiration identified.",
    "precautions": [
      "Water plant adequately before starting experiment",
      "Keep plant away from direct strong sunlight initially",
      "Use same location for all pots to ensure consistent conditions",
      "Avoid physical damage to leaves during observation",
      "Keep plant healthy throughout experiment duration"
    ],
    "viva": [
      {
        "q": "Define transpiration.",
        "a": "Transpiration is loss of water vapor from plant surface, mainly through stomata on leaves. It is essential for plant growth and survival."
      },
      {
        "q": "What are the factors affecting transpiration?",
        "a": "Factors affecting transpiration are temperature, humidity, wind speed, leaf surface area, availability of water, and light intensity."
      },
      {
        "q": "How does temperature affect transpiration?",
        "a": "Increase in temperature increases transpiration rate because warmer air has greater evaporating power and stomata open wider."
      },
      {
        "q": "What is the role of stomata in transpiration?",
        "a": "Stomata are pores on leaf surface that allow water vapor to escape. They can open and close to regulate transpiration rate."
      },
      {
        "q": "How is transpiration important for plants?",
        "a": "Transpiration helps in water transport from roots to leaves, nutrient absorption, temperature regulation, and maintaining turgor pressure."
      },
      {
        "q": "Why do plants lose less water in humid conditions?",
        "a": "In humid conditions, vapor pressure gradient between leaf and air is smaller, so less water evaporates from leaf surface."
      }
    ]
  },
  {
    "slug": "determine-focal-length-concave-lens",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Determine Focal Length of Concave Lens",
    "aim": "To determine the focal length of a concave lens using convex lens and lens formula",
    "materials": [
      "Concave lens",
      "Convex lens",
      "Optical bench",
      "Lens holders",
      "Object (arrow)",
      "Screen",
      "Measuring scale",
      "Light source"
    ],
    "theory": "Concave lens is diverging lens that cannot form real image. To find focal length, concave lens is combined with convex lens to form a converging system. The combined focal length is found experimentally, then concave focal length is calculated using formula: 1/F = 1/f1 + 1/f2.",
    "procedure": [
      "Place convex lens and concave lens together in lens holder",
      "Arrange object at distance u from lens combination",
      "Adjust screen until sharp image is formed",
      "Record object distance u and image distance v",
      "Repeat for 5-6 different object positions",
      "Calculate combined focal length F using lens formula: 1/F = 1/u + 1/v",
      "Find focal length of concave lens using: 1/fc = 1/F - 1/fconvex",
      "Use known focal length of convex lens for calculation"
    ],
    "observation": "Sharp real images formed for all positions. Combined lens acts as converging system. Image size changes with object position following lens laws.",
    "result": "Focal length of concave lens successfully determined. Negative value confirms diverging nature of concave lens.",
    "precautions": [
      "Ensure convex lens focal length is known accurately",
      "Position lenses close together at optical bench",
      "Use sharp light source for clear image",
      "Maintain horizontal optical bench for accuracy",
      "Measure distances carefully from marked positions"
    ],
    "viva": [
      {
        "q": "Why is concave lens combined with convex lens in this experiment?",
        "a": "Concave lens alone cannot form real image on screen. Combining with convex lens makes the system converging and capable of forming real image."
      },
      {
        "q": "What is the sign convention for focal length?",
        "a": "Convex lens has positive focal length, concave lens has negative focal length. This convention is used in lens formula calculations."
      },
      {
        "q": "What does negative focal length indicate?",
        "a": "Negative focal length indicates diverging lens. Parallel rays appear to diverge from focal point after passing through diverging lens."
      },
      {
        "q": "How to find focal length of concave lens mathematically?",
        "a": "Using formula 1/fc = 1/F - 1/fconvex, where F is combined focal length found experimentally and fconvex is known focal length of convex lens."
      },
      {
        "q": "What types of images does concave lens form?",
        "a": "Concave lens always forms virtual, erect, and diminished image regardless of object position."
      },
      {
        "q": "Why is it necessary to use known focal length of convex lens?",
        "a": "To calculate focal length of concave lens from combined focal length, we need to subtract convex focal length using lens combination formula."
      }
    ]
  },
  {
    "slug": "verify-archimedes-principle",
    "classLevel": "Class 10",
    "subject": "Physics",
    "title": "To Verify Archimedes Principle",
    "aim": "To demonstrate and verify Archimedes principle stating that buoyant force equals weight of fluid displaced",
    "materials": [
      "Overflow can",
      "Measuring cylinder",
      "Spring balance",
      "Beaker",
      "Water",
      "Objects of different densities",
      "String",
      "Stand and clamp"
    ],
    "theory": "Archimedes principle states that buoyant force on object immersed in fluid equals weight of fluid displaced. When object is immersed, volume of fluid displaced equals volume of object submerged. This principle explains floating and sinking of objects.",
    "procedure": [
      "Weigh the object using spring balance in air",
      "Note reading as true weight W",
      "Fill overflow can with water up to spout level",
      "Place beaker under overflow spout",
      "Tie string to object and lower into water gradually",
      "Collect displaced water in beaker",
      "Weigh the object while submerged using spring balance",
      "Note reading as apparent weight W'",
      "Calculate buoyant force: F = W - W'",
      "Measure volume of displaced water in measuring cylinder",
      "Calculate weight of displaced water: m = density × volume",
      "Compare buoyant force with weight of displaced water"
    ],
    "observation": "True weight of object in air greater than apparent weight in water. Displaced water volume measured accurately. Weight of displaced water equals loss of weight in water.",
    "result": "Archimedes principle verified: Buoyant force equals weight of displaced fluid. Principle demonstrated successfully.",
    "precautions": [
      "Ensure overflow can is filled to spout level initially",
      "Lower object slowly to avoid splashing of water",
      "Collect all displaced water in beaker",
      "Use measuring cylinder for accurate volume measurement",
      "Avoid air bubbles around object while submerging"
    ],
    "viva": [
      {
        "q": "State Archimedes principle.",
        "a": "Archimedes principle states that buoyant force on object immersed in fluid equals weight of fluid displaced by the object."
      },
      {
        "q": "What is buoyant force?",
        "a": "Buoyant force is upward force exerted by fluid on submerged object. It acts at center of buoyancy."
      },
      {
        "q": "How does buoyant force depend on density of fluid?",
        "a": "Buoyant force is directly proportional to density of fluid. Denser fluids exert greater buoyant force."
      },
      {
        "q": "Why do objects float?",
        "a": "Objects float when buoyant force equals their weight. For floating objects, weight of displaced fluid equals weight of object."
      },
      {
        "q": "What is apparent weight?",
        "a": "Apparent weight is the reading of spring balance when object is submerged. It equals true weight minus buoyant force."
      },
      {
        "q": "How is Archimedes principle useful?",
        "a": "Principle is used to determine density of objects, design ships and submarines, explain floating and sinking, and calculate buoyancy in fluids."
      }
    ]
  }
];
export const LAB_GROUPS = (): string[] => [...new Set(LAB_PRACTICALS.map((l) => `${l.classLevel} ${l.subject}`))];
export function getLabPractical(slug: string): LabPractical | undefined {
  return LAB_PRACTICALS.find((l) => l.slug === slug);
}
