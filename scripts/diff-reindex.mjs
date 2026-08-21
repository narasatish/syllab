/**
 * diff-reindex.mjs — the CURATED allowlist of difference-between comparisons we
 * re-index (remove noindex + add to sitemap). Post-March-2026 we noindexed the
 * whole /difference-between/* cluster as thin. GSC (2026-07 export) then showed a
 * set of them earning real impressions AND clicks — several already ranking page 1
 * (square-and-cube 5 clicks, equator-and-prime-meridian 3 clicks) while noindexed,
 * i.e. we were telling Google to drop our own winners. We deepen ONLY these proven
 * pages with a factual FAQ (so they're substantive, not thin) and let them index.
 *
 * Shared by generate-prerender.mjs (sets noindex:false + injects FAQ + FAQPage
 * schema) and generate-sitemap.mjs (adds the URLs). FAQ answers are textbook-
 * factual — no fabrication. Slugs MUST match differencesData.mjs entries; where a
 * comparison has both "-vs-" and "-and-" duplicates we index only the variant that
 * earns traffic in GSC (avoids duplicate-content).
 */
export const DIFF_REINDEX = [
  // ── Batch 1 (v210): proven high-impression science/geography comparisons ──
  {
    slug: 'saturated-vs-unsaturated-solution',
    faqs: [
      { q: 'What is the main difference between a saturated and an unsaturated solution?', a: 'A saturated solution holds the maximum amount of solute that can dissolve at a given temperature — no more will dissolve. An unsaturated solution holds less than that maximum, so it can still dissolve more solute.' },
      { q: 'How can you tell if a solution is saturated?', a: 'Add a little more solute and stir. If it dissolves, the solution is unsaturated; if the extra solute settles undissolved at the bottom, the solution is saturated.' },
      { q: 'Does temperature affect whether a solution is saturated?', a: 'Yes. For most solids, solubility rises with temperature, so a solution that is saturated at a low temperature can become unsaturated when heated — allowing more solute to dissolve.' },
    ],
  },
  {
    slug: 'transpiration-and-translocation',
    faqs: [
      { q: 'What is the difference between transpiration and translocation?', a: 'Transpiration is the loss of water vapour from the aerial parts of a plant (mainly the leaves) through stomata. Translocation is the transport of food (sugars made in the leaves) to other parts of the plant through the phloem.' },
      { q: 'Which tissues are involved in transpiration and translocation?', a: 'Transpiration involves water moving up through the xylem and evaporating from the leaves. Translocation moves prepared food through the phloem.' },
      { q: 'Does translocation move food only downwards?', a: 'No. Translocation moves food from the source (leaves) to sinks such as roots, fruits and growing tips — it can travel both upward and downward as the plant needs.' },
    ],
  },
  {
    slug: 'physical-and-political-map',
    faqs: [
      { q: 'What is the main difference between a physical and a political map?', a: 'A physical map shows natural features — mountains, rivers, plateaus, deserts and oceans — usually shaded by elevation. A political map shows human-made features — country and state boundaries, capitals and cities.' },
      { q: 'What do the colours on a physical map mean?', a: 'Physical maps usually use green for plains and lowlands, brown or yellow for mountains and highlands, and blue for water bodies such as rivers, lakes and seas.' },
      { q: 'Which map shows country and state borders?', a: 'A political map shows country and state borders, capital cities and major towns, drawn with clear boundary lines.' },
    ],
  },
  {
    slug: 'evaporation-and-sublimation',
    faqs: [
      { q: 'Is sublimation different from evaporation?', a: 'Yes. In evaporation a liquid turns into vapour (liquid → gas) at its surface, below the boiling point. In sublimation a solid turns directly into vapour (solid → gas) without first becoming a liquid.' },
      { q: 'Give examples of evaporation and sublimation.', a: 'Evaporation: wet clothes drying, water drying up from a puddle. Sublimation: camphor, naphthalene balls and dry ice (solid carbon dioxide) turning directly into vapour.' },
      { q: 'Does sublimation skip the liquid state?', a: 'Yes — that is the key point. Sublimation goes straight from solid to gas without passing through the liquid state, while evaporation starts from a liquid.' },
    ],
  },
  {
    slug: 'weathering-vs-erosion',
    faqs: [
      { q: 'What is the difference between weathering and erosion?', a: 'Weathering is the breaking down of rocks into smaller pieces at their original place (in situ), without being moved. Erosion is the removal and transport of those broken pieces to a new location by wind, water or ice.' },
      { q: 'Does weathering involve movement of rock?', a: 'No. Weathering breaks rock in place; the transport of the broken material to a new place is erosion.' },
      { q: 'What are the main agents of erosion?', a: 'The main agents of erosion are running water (rivers), wind, glaciers (ice) and sea waves.' },
    ],
  },

  // ── Batch 2 (v211): proven page-1 click-earners + striking-distance winners ──
  {
    slug: 'square-and-cube',
    faqs: [
      { q: 'What is the difference between the square and the cube of a number?', a: 'The square of a number is that number multiplied by itself once (n × n = n²), for example 5² = 25. The cube is the number multiplied by itself twice (n × n × n = n³), for example 5³ = 125.' },
      { q: 'What is the difference between a square and a cube shape?', a: 'A square is a 2-D (flat) shape with 4 equal sides. A cube is a 3-D solid with 6 equal square faces, 12 edges and 8 vertices.' },
      { q: 'What are the square and cube of 4?', a: 'The square of 4 is 4 × 4 = 16. The cube of 4 is 4 × 4 × 4 = 64.' },
    ],
  },
  {
    slug: 'equator-and-prime-meridian',
    faqs: [
      { q: 'What is the difference between the Equator and the Prime Meridian?', a: 'The Equator is the 0° latitude line running east–west, dividing Earth into the Northern and Southern Hemispheres. The Prime Meridian is the 0° longitude line running north–south, dividing Earth into the Eastern and Western Hemispheres.' },
      { q: 'Which one measures latitude and which measures longitude?', a: 'The Equator is the reference line (0°) for latitude; the Prime Meridian is the reference line (0°) for longitude.' },
      { q: 'Where does the Prime Meridian pass?', a: 'The Prime Meridian passes through Greenwich in London, UK, and is used as the basis for standard time (GMT).' },
    ],
  },
  {
    slug: 'map-and-plan',
    faqs: [
      { q: 'What is the difference between a map and a plan?', a: 'A map is a drawing of a large area (a country, state or the world) on a small scale, so a large area fits on paper. A plan is a drawing of a small area (a room, house or plot) on a large scale, showing accurate detail.' },
      { q: 'Which shows more detail, a map or a plan?', a: 'A plan shows more detail because it is drawn to a large scale for a small area; a map covers a large area at a reduced scale, so it shows less detail.' },
      { q: 'Is a plan drawn to scale?', a: 'Yes. A plan is drawn accurately to a large scale, so measurements like the length and width of a room stay proportional.' },
    ],
  },
  {
    slug: 'solution-vs-suspension',
    faqs: [
      { q: 'What is the difference between a solution and a suspension?', a: 'In a solution the solute particles are so small they dissolve completely and cannot be seen or filtered out (e.g. salt in water). In a suspension the particles are large, visible, settle down on standing and can be filtered out (e.g. sand in water).' },
      { q: 'Is a solution transparent or cloudy?', a: 'A true solution is transparent — light passes straight through it. A suspension is usually cloudy or opaque.' },
      { q: 'Can a suspension be separated by filtration?', a: 'Yes. The large particles of a suspension can be separated by filtration, while the dissolved particles of a solution cannot.' },
    ],
  },
  {
    slug: 'producer-vs-consumer',
    faqs: [
      { q: 'What is the difference between a producer and a consumer?', a: 'Producers (green plants) make their own food by photosynthesis using sunlight, water and carbon dioxide. Consumers cannot make their own food and depend on producers or other organisms for it.' },
      { q: 'Give examples of producers and consumers.', a: 'Producers: grass, trees, algae. Consumers: cow (herbivore), lion (carnivore) and humans (omnivore).' },
      { q: 'Why are producers called autotrophs?', a: 'Because they produce their own food from inorganic materials. Consumers are called heterotrophs because they take food from other organisms.' },
    ],
  },
  {
    slug: 'galvanometer-and-ammeter',
    faqs: [
      { q: 'What is the difference between a galvanometer and an ammeter?', a: 'A galvanometer detects and measures very small currents and can show the direction of current. An ammeter measures larger currents in amperes and is made by connecting a low-resistance shunt across a galvanometer.' },
      { q: 'How is an ammeter connected in a circuit?', a: 'An ammeter is always connected in series with the circuit, and it has very low resistance so it does not change the current being measured.' },
      { q: 'Can a galvanometer be converted into an ammeter?', a: 'Yes — by connecting a small resistance (called a shunt) in parallel with the galvanometer.' },
    ],
  },
  {
    slug: 'speed-and-average-speed',
    faqs: [
      { q: 'What is the difference between speed and average speed?', a: 'Speed is how fast an object is moving at a particular moment or over a stretch. Average speed is the total distance travelled divided by the total time taken for the whole journey.' },
      { q: 'How do you calculate average speed?', a: 'Average speed = total distance ÷ total time. It takes into account stops and changes of speed during the journey.' },
      { q: 'Can average speed differ from the actual speed?', a: 'Yes. If the speed changes during a trip, the average speed can be different from the speed at any single instant.' },
    ],
  },
  {
    slug: 'speed-and-acceleration',
    faqs: [
      { q: 'What is the difference between speed and acceleration?', a: 'Speed is the rate at which an object covers distance (distance ÷ time). Acceleration is the rate at which an object’s velocity changes (change in velocity ÷ time).' },
      { q: 'What are the units of speed and acceleration?', a: 'Speed is measured in metres per second (m/s). Acceleration is measured in metres per second squared (m/s²).' },
      { q: 'Does constant speed mean zero acceleration?', a: 'If an object moves in a straight line at constant speed, its acceleration is zero because its velocity is not changing.' },
    ],
  },
  {
    slug: 'import-and-export',
    faqs: [
      { q: 'What is the difference between import and export?', a: 'Import means buying goods and services from another country into your own country. Export means selling goods and services from your country to another country.' },
      { q: 'Give an example of import and export for India.', a: 'India imports crude oil and electronics; India exports tea, textiles, software services and spices.' },
      { q: 'What is the balance of trade?', a: 'The balance of trade is the difference between a country’s total exports and total imports. Exports more than imports is a trade surplus; imports more than exports is a trade deficit.' },
    ],
  },
  {
    slug: 'conductor-and-semiconductor',
    faqs: [
      { q: 'What is the difference between a conductor and a semiconductor?', a: 'A conductor (like copper) lets electric current flow easily because it has many free electrons. A semiconductor (like silicon) conducts only partially — its conductivity lies between that of a conductor and an insulator.' },
      { q: 'Give examples of conductors and semiconductors.', a: 'Conductors: copper, aluminium, silver, iron. Semiconductors: silicon and germanium.' },
      { q: 'How does temperature affect a semiconductor?', a: 'Unlike a metal conductor, a semiconductor’s conductivity increases as temperature rises, because more electrons become free to move.' },
    ],
  },
  {
    slug: 'prism-and-pyramid',
    faqs: [
      { q: 'What is the difference between a prism and a pyramid?', a: 'A prism has two identical parallel bases joined by rectangular faces (e.g. a triangular prism). A pyramid has just one base, with triangular faces that meet at a single top point called the apex.' },
      { q: 'How many bases does a prism and a pyramid have?', a: 'A prism has two identical bases; a pyramid has only one base.' },
      { q: 'Give an everyday example of a prism and a pyramid.', a: 'Prism: a Toblerone chocolate box (triangular prism). Pyramid: the pyramids of Egypt (square pyramid).' },
    ],
  },
  {
    slug: 'balanced-and-unbalanced-force',
    faqs: [
      { q: 'What is the difference between balanced and unbalanced forces?', a: 'Balanced forces are equal in size and opposite in direction, so they cancel out and do not change an object’s motion. Unbalanced forces do not cancel — the net force is non-zero, so the object’s speed or direction changes.' },
      { q: 'Do balanced forces cause motion?', a: 'No. Balanced forces keep an object at rest or moving at constant velocity; they do not cause acceleration.' },
      { q: 'What do unbalanced forces do to an object?', a: 'Unbalanced forces make an object accelerate — start moving, speed up, slow down or change direction.' },
    ],
  },
  // ── Batch 3 (v346): pages that earned clicks WHILE noindexed ─────────────
  //
  // The 2026-08-21 GSC export showed 58 noindexed /difference-between pages
  // drawing 94 clicks from 13,348 impressions — 5.9% of every click the site
  // received in the quarter, from pages we were asking Google to drop. Their
  // CTR (0.37%) matches the indexed set exactly, and the best of them run far
  // above the 0.75% site average: input-and-output-device at 2.88%, nerves-and-
  // neurons 2.11%, cns-and-pns 1.52%.
  //
  // That is the opposite of /full-forms, which was measured at the same time
  // and left noindex: 66,595 impressions, 37 clicks, 0.06%. Impressions alone
  // do not justify indexing a thin page; clicks do.
  //
  // These twenty are the top earners. Each gets three factual FAQs so the page
  // is substantive rather than a table and two sentences, which is why the
  // cluster was noindexed in the first place.
  //
  // gross-and-net-income is deliberately NOT here despite earning 2 clicks: it
  // is the same intent as gross-and-net, which earns more (69 impressions vs
  // 41). Indexing both would put two of our own pages against each other, the
  // duplicate problem this file's header warns about. pollen-and-ovule takes
  // the twentieth slot instead.
  {
    slug: 'compiler-and-interpreter',
    faqs: [
      { q: 'What is the main difference between a compiler and an interpreter?', a: 'A compiler translates the entire source program into machine code once, before the program runs, producing a separate executable file. An interpreter translates and executes the program one statement at a time, so no separate executable is produced.' },
      { q: 'Which is faster, a compiled or an interpreted program?', a: 'A compiled program usually runs faster, because translation has already been done before execution begins. An interpreter has to translate each statement every time it runs, which adds work while the program is running.' },
      { q: 'How do compilers and interpreters report errors differently?', a: 'A compiler checks the whole program first and reports all the errors it finds together, so nothing runs until they are fixed. An interpreter stops at the first error it meets, so earlier statements have already executed by then — which makes small programs easier to debug line by line.' },
    ],
  },
  {
    slug: 'input-and-output-device',
    faqs: [
      { q: 'What is the difference between an input device and an output device?', a: 'An input device sends data into the computer — a keyboard, mouse, scanner or microphone. An output device carries the result back out to the user — a monitor, printer or speaker. The direction of the data is what separates them.' },
      { q: 'Can a single device be both an input and an output device?', a: 'Yes. A touchscreen accepts taps as input and displays images as output, and a headset combines a microphone with speakers. Devices that do both are often called input/output or I/O devices.' },
      { q: 'Is a printer an input or an output device?', a: 'A printer is an output device: it takes data the computer has already processed and produces a printed copy. A scanner is its input counterpart, converting a printed page into data the computer can store.' },
    ],
  },
  {
    slug: 'river-and-glacier',
    faqs: [
      { q: 'What is the main difference between a river and a glacier?', a: 'Both move downhill under gravity, but a river flows as liquid water and moves quickly, while a glacier is a large mass of ice that moves extremely slowly — often only a few centimetres or metres in a day.' },
      { q: 'How do the valleys they carve differ?', a: 'A river cuts a narrow V-shaped valley, because the water erodes fastest along its channel. A glacier carves a broad U-shaped valley with steep sides and a flat floor, because the ice grinds against the sides as well as the base.' },
      { q: 'How does each carry the material it erodes?', a: 'A river sorts its load: heavier stones are dragged along the bed and finer silt is carried in suspension, so deposits end up layered by size. A glacier carries everything frozen together and drops it unsorted when the ice melts, leaving boulders and fine clay mixed in the same deposit, called moraine.' },
    ],
  },
  {
    slug: 'weather-and-season',
    faqs: [
      { q: 'What is the difference between weather and a season?', a: 'Weather is the state of the atmosphere at a particular place at a particular moment — today it may be hot, cloudy or raining. A season is a much longer stretch of the year with a broadly typical pattern of weather, such as summer or the monsoon.' },
      { q: 'How long does each last?', a: 'Weather is short-term and can change within hours. A season lasts for months and returns in the same part of the year, because it is produced by the Earth\'s tilt and its orbit around the Sun rather than by day-to-day conditions.' },
      { q: 'Can the weather be unusual for the season?', a: 'Yes, and this is common. A cool, rainy day can occur during summer, and a warm day can occur in winter. A single day of unusual weather does not change the season, which is defined by the average pattern over months.' },
    ],
  },
  {
    slug: 'cns-and-pns',
    faqs: [
      { q: 'What is the difference between the CNS and the PNS?', a: 'The central nervous system is the brain and the spinal cord, where information is processed and decisions are made. The peripheral nervous system is the network of nerves outside them, carrying signals between the CNS and the rest of the body.' },
      { q: 'Which parts of the body belong to the peripheral nervous system?', a: 'All the nerves branching out from the brain and spinal cord — the cranial nerves and the spinal nerves — together with their associated ganglia. They reach the skin, muscles, and internal organs.' },
      { q: 'Why is the CNS protected by bone but the PNS is not?', a: 'The brain and spinal cord cannot regenerate readily and control everything else, so they are enclosed by the skull and the vertebral column. Peripheral nerves run throughout the body where such rigid protection is impossible, and they have a greater capacity to repair after injury.' },
    ],
  },
  {
    slug: 'acid-and-alkali',
    faqs: [
      { q: 'What is the difference between an acid and an alkali?', a: 'An acid releases hydrogen ions in water and has a pH below 7. An alkali is a base that dissolves in water, releases hydroxide ions, and has a pH above 7.' },
      { q: 'Is every base an alkali?', a: 'No. All alkalis are bases, but only the bases that dissolve in water are called alkalis. Sodium hydroxide dissolves and is an alkali; copper oxide is a base but does not dissolve in water, so it is not an alkali.' },
      { q: 'What happens when an acid and an alkali are mixed?', a: 'They neutralise each other, producing a salt and water. The hydrogen ions from the acid combine with the hydroxide ions from the alkali to form water, and the pH moves towards 7.' },
    ],
  },
  {
    slug: 'biodegradable-and-non-biodegradable',
    faqs: [
      { q: 'What makes a substance biodegradable?', a: 'A biodegradable substance can be broken down into simpler, harmless substances by the action of micro-organisms such as bacteria and fungi. Paper, cotton, food waste and wood are biodegradable.' },
      { q: 'Why are non-biodegradable substances a problem?', a: 'Micro-organisms cannot break them down, so they remain in the environment for a very long time. They accumulate in soil and water, can choke drains and waterways, and may harm animals that swallow them.' },
      { q: 'Give examples of each.', a: 'Biodegradable: vegetable peel, paper, cloth made from cotton or jute, and animal waste. Non-biodegradable: most plastics, glass, metal cans, and synthetic fibres.' },
    ],
  },
  {
    slug: 'primary-vs-secondary-cell',
    faqs: [
      { q: 'What is the difference between a primary and a secondary cell?', a: 'A primary cell produces electricity through a chemical reaction that cannot be reversed, so once the chemicals are used up the cell is discarded. A secondary cell uses a reversible reaction, so passing current back through it recharges the cell for reuse.' },
      { q: 'Give an example of each.', a: 'A dry cell of the kind used in a torch or a wall clock is a primary cell. A lead-acid battery in a car, and the lithium-ion battery in a mobile phone, are secondary cells.' },
      { q: 'Why can a primary cell not be recharged?', a: 'The chemical change inside it is irreversible — the products cannot be converted back into the original reactants by passing current through. Attempting to recharge one can cause it to leak or burst.' },
    ],
  },
  {
    slug: 'diffusion-and-osmosis',
    faqs: [
      { q: 'What is the difference between diffusion and osmosis?', a: 'Diffusion is the movement of any particles from a region of higher concentration to a region of lower concentration. Osmosis is a special case: the movement of water molecules only, across a semi-permeable membrane, from a dilute solution to a concentrated one.' },
      { q: 'Does osmosis need a membrane?', a: 'Yes. Osmosis requires a semi-permeable membrane that lets water through but holds back the dissolved solute. Diffusion needs no membrane at all — a scent spreading through a room is diffusion.' },
      { q: 'What happens to a plant cell placed in pure water?', a: 'Water enters the cell by osmosis because the cell sap is more concentrated. The vacuole swells and pushes the cell contents against the cell wall, making the cell turgid — which is what keeps a plant\'s soft parts firm.' },
    ],
  },
  {
    slug: 'metamorphic-and-sedimentary-rock',
    faqs: [
      { q: 'How do metamorphic and sedimentary rocks form differently?', a: 'Sedimentary rock forms at or near the surface when sediments settle in layers and are compacted and cemented together. Metamorphic rock forms deep underground when an existing rock is changed by intense heat and pressure without melting.' },
      { q: 'Can a sedimentary rock become a metamorphic rock?', a: 'Yes, and this is common. Limestone becomes marble and shale becomes slate when buried deep enough to be subjected to heat and pressure. The rock does not melt; its minerals recrystallise in the solid state.' },
      { q: 'How can you tell them apart?', a: 'Sedimentary rocks often show visible layers and may contain fossils. Metamorphic rocks are usually harder and denser, frequently show bands or a sheeted texture, and rarely preserve fossils because heat and pressure destroy them.' },
    ],
  },
  {
    slug: 'igneous-and-metamorphic-rock',
    faqs: [
      { q: 'What is the difference between igneous and metamorphic rock?', a: 'Igneous rock forms when molten magma or lava cools and solidifies. Metamorphic rock forms when an already existing rock is altered in the solid state by heat and pressure — it never fully melts.' },
      { q: 'Why do some igneous rocks have large crystals and others none?', a: 'It depends on cooling rate. Magma cooling slowly deep underground gives crystals time to grow large, as in granite. Lava cooling quickly at the surface leaves crystals too small to see, as in basalt.' },
      { q: 'Are igneous rocks the oldest rocks?', a: 'Igneous rock is the original source of the material in the other two types, since weathered igneous rock supplies sediment. But rocks cycle continuously, so an individual igneous rock is not necessarily older than a nearby sedimentary or metamorphic one.' },
    ],
  },
  {
    slug: 'gross-and-net',
    faqs: [
      { q: 'What is the difference between gross and net?', a: 'Gross is the whole amount before anything is taken away. Net is what remains after the relevant deductions have been subtracted. The same total can be described either way depending on which deductions apply.' },
      { q: 'Which is larger, gross or net?', a: 'Gross is larger, or equal to net when there are no deductions at all. Net can never exceed gross, because it is the gross amount with subtractions applied.' },
      { q: 'Where do students meet these terms?', a: 'Most often in salary and in weight. Gross salary is the full pay before tax and provident fund; net salary, or take-home pay, is what actually reaches the account. Gross weight includes the packaging; net weight is the contents alone.' },
    ],
  },
  {
    slug: 'nerves-and-neurons',
    faqs: [
      { q: 'What is the difference between a nerve and a neuron?', a: 'A neuron is a single nerve cell — the basic unit of the nervous system. A nerve is a bundle of many nerve fibres wrapped together in connective tissue, visible to the naked eye, whereas a single neuron is microscopic.' },
      { q: 'What are the main parts of a neuron?', a: 'A cell body containing the nucleus, short branching dendrites that receive signals, and a long axon that carries the impulse away to the next cell. The junction where one neuron passes a signal to another is called a synapse.' },
      { q: 'How does a signal travel along a neuron?', a: 'It travels as an electrical impulse along the axon. At the synapse the electrical signal causes chemical messengers to be released, and these cross the tiny gap to start a new impulse in the next neuron.' },
    ],
  },
  {
    slug: 'ac-and-dc-current',
    faqs: [
      { q: 'What is the difference between AC and DC?', a: 'In direct current the charge flows steadily in one direction only. In alternating current the direction of flow reverses periodically, so the current rises, falls, reverses and repeats.' },
      { q: 'Which one comes out of a household socket in India?', a: 'Household supply is alternating current. Batteries, by contrast, supply direct current, which is why devices that run on batteries need an adapter to work from a wall socket.' },
      { q: 'Why is AC used for transmitting electricity over long distances?', a: 'Because its voltage can be raised and lowered easily using a transformer. Transmitting at high voltage reduces the current for the same power, which cuts the energy wasted as heat in the wires; the voltage is then stepped back down near the consumer.' },
    ],
  },
  {
    slug: 'convex-and-plane-mirror',
    faqs: [
      { q: 'What is the difference between a convex mirror and a plane mirror?', a: 'A plane mirror has a flat reflecting surface, while a convex mirror bulges outwards. The plane mirror reflects rays without converging or diverging them; the convex mirror spreads reflected rays apart.' },
      { q: 'How do the images they form differ?', a: 'A plane mirror forms an image the same size as the object, as far behind the mirror as the object is in front. A convex mirror always forms an image that is virtual, erect and smaller than the object.' },
      { q: 'Why are convex mirrors used as rear-view mirrors on vehicles?', a: 'Because they diverge the reflected rays, they cover a much wider field of view than a flat mirror of the same size. The trade-off is that objects appear smaller and therefore farther away than they really are.' },
    ],
  },
  {
    slug: 'weather-and-climate',
    faqs: [
      { q: 'What is the difference between weather and climate?', a: 'Weather is the condition of the atmosphere at a place over a short period — hours or days. Climate is the average pattern of weather at that place taken over a long period, conventionally around thirty years.' },
      { q: 'Can a cold day disprove a warming climate?', a: 'No. Climate is a long-run average, so single days or even a single unusual season sit within the normal spread. A change in climate shows up in the averages and in how often extremes occur, not in any one day\'s weather.' },
      { q: 'Which elements are used to describe both?', a: 'The same elements: temperature, humidity, atmospheric pressure, wind, cloud cover and rainfall. The difference lies in the time period over which they are measured, not in what is measured.' },
    ],
  },
  {
    slug: 'weather-and-atmosphere',
    faqs: [
      { q: 'What is the difference between weather and the atmosphere?', a: 'The atmosphere is the layer of gases surrounding the Earth — a physical thing. Weather is the changing condition of that atmosphere at a particular place and time. The atmosphere is where weather happens.' },
      { q: 'Which layer of the atmosphere produces our weather?', a: 'Almost all weather occurs in the troposphere, the lowest layer, because that is where nearly all the water vapour and most of the mass of the atmosphere are found. Temperature falls with height through this layer.' },
      { q: 'What is the atmosphere made of?', a: 'By volume, dry air is about 78% nitrogen and about 21% oxygen, with argon, carbon dioxide and other gases making up the small remainder. It also carries a variable amount of water vapour, which is what makes weather possible.' },
    ],
  },
  {
    slug: 'predator-vs-prey',
    faqs: [
      { q: 'What is the difference between a predator and prey?', a: 'A predator is an animal that hunts, kills and eats other animals. Prey is the animal that is hunted and eaten. The terms describe a role in a particular interaction, not a fixed category of animal.' },
      { q: 'Can an animal be both predator and prey?', a: 'Yes, and most are. A frog is a predator when it eats insects and prey when a snake eats it. Only an animal at the very top of a food chain, with no natural predators of its own, is a predator alone.' },
      { q: 'How do predator and prey numbers affect each other?', a: 'They rise and fall together with a lag. When prey are plentiful, predator numbers grow; the growing predator population then reduces the prey, and the shortage of food causes predator numbers to fall in turn, allowing the prey to recover.' },
    ],
  },
  {
    slug: 'reversible-and-irreversible-reaction',
    faqs: [
      { q: 'What is the difference between a reversible and an irreversible reaction?', a: 'In a reversible reaction the products can react together to re-form the original reactants, so the reaction proceeds in both directions. In an irreversible reaction the products do not react back, so it proceeds essentially in one direction only.' },
      { q: 'How is a reversible reaction shown in an equation?', a: 'With a double half-arrow pointing both ways between reactants and products, rather than the single arrow used for an irreversible reaction.' },
      { q: 'What is equilibrium in a reversible reaction?', a: 'When the forward and backward reactions occur at the same rate, the amounts of reactants and products stop changing. This is dynamic equilibrium: both reactions are still going on, but at equal rates, so the concentrations remain constant.' },
    ],
  },
  {
    slug: 'pollen-and-ovule',
    faqs: [
      { q: 'What is the difference between pollen and an ovule?', a: 'Pollen grains carry the male gametes of a flowering plant and are produced in the anther. The ovule contains the female gamete and sits inside the ovary. Fertilisation joins the two.' },
      { q: 'How does pollen reach the ovule?', a: 'Pollen is transferred to the stigma during pollination, by wind, water or an animal such as an insect. A pollen tube then grows down through the style to the ovule, carrying the male gamete to it.' },
      { q: 'What do the ovule and the ovary become after fertilisation?', a: 'The fertilised ovule develops into the seed, and the ovary that surrounds it develops into the fruit. This is why the number of seeds in a fruit reflects the number of ovules that were fertilised.' },
    ],
  },
  // ── Batch 4 (v347): the rest of the click-earning noindexed set ──────────
  //
  // Batch 3 took the top 20 of the 58 pages that earned clicks while noindexed.
  // These are the remaining 35. Three were dropped rather than indexed, all of
  // them near-duplicates of a page already in this list — producer-and-consumer
  // against producer-vs-consumer, balanced-and-unbalanced-forces against the
  // singular balanced-and-unbalanced-force, and gross-and-net-income against
  // gross-and-net. Indexing a variant of a page already indexed sets two of our
  // own URLs against each other for one query.
  //
  // Together: 7,184 impressions and 36 clicks over the quarter, from pages
  // Google was being told to drop.
  {
    slug: 'evaporation-and-distillation',
    faqs: [
      { q: 'What is the difference between evaporation and distillation?', a: 'Evaporation is the escape of liquid particles from the surface into vapour, and the vapour is simply lost. Distillation is a full separation process: the liquid is boiled to vapour and then deliberately cooled and condensed back, so the purified liquid is collected.' },
      { q: 'Why is distillation used to purify water but evaporation is not?', a: 'Evaporation leaves the dissolved solid behind and the water escapes as vapour, so you keep the salt and lose the water. Distillation condenses that vapour back to liquid, so you recover pure water and leave the impurity in the flask.' },
      { q: 'Does evaporation only happen at the boiling point?', a: 'No. Evaporation happens at any temperature, and only from the surface of the liquid. Boiling happens throughout the liquid and only at a fixed temperature, which is why distillation uses boiling rather than evaporation.' },
    ],
  },
  {
    slug: 'dilute-vs-concentrated-acid',
    faqs: [
      { q: 'What is the difference between a dilute and a concentrated acid?', a: 'It is a matter of how much water is present. A concentrated acid contains a large amount of acid and little water; a dilute acid contains a small amount of acid in a large amount of water.' },
      { q: 'Is a dilute acid the same as a weak acid?', a: 'No, and this is the commonest confusion. Dilute and concentrated describe how much acid is dissolved. Strong and weak describe how completely the acid ionises in water. A strong acid can be dilute, and a weak acid can be concentrated.' },
      { q: 'Why must acid always be added to water, and never water to acid?', a: 'Diluting a concentrated acid releases a great deal of heat. Adding acid slowly to a large volume of water lets that heat spread through the water. Adding water to concentrated acid concentrates the heat where the drops land, and the mixture can spit dangerously.' },
    ],
  },
  {
    slug: 'dilute-and-concentrated',
    faqs: [
      { q: 'What makes a solution dilute or concentrated?', a: 'The proportion of solute to solvent. A dilute solution has a small quantity of solute in a given amount of solvent; a concentrated solution has a large quantity of solute in the same amount of solvent.' },
      { q: 'Are dilute and concentrated exact terms?', a: 'No, they are comparative. There is no fixed boundary between them — a solution is dilute or concentrated relative to another. For an exact statement chemists give the concentration as a number, such as moles per litre.' },
      { q: 'How can a concentrated solution be made dilute?', a: 'By adding more solvent. The quantity of solute stays the same but it is spread through a larger volume, so the concentration falls. Removing solvent by evaporation does the reverse and concentrates the solution.' },
    ],
  },
  {
    slug: 'tropical-vs-temperate',
    faqs: [
      { q: 'What is the difference between a tropical and a temperate climate?', a: 'A tropical climate lies near the equator, is hot throughout the year and has little variation in temperature between seasons. A temperate climate lies between the tropics and the polar circles and has clearly distinct seasons with a wide temperature range.' },
      { q: 'Why is the tropical zone hot all year?', a: 'Because the Sun is close to overhead throughout the year there, so sunlight strikes the surface almost vertically and its energy is concentrated on a small area. Nearer the poles the same beam spreads over a larger area and heats it less.' },
      { q: 'Which type of climate does most of India have?', a: 'Most of India lies within the tropical zone, and the Tropic of Cancer passes through the middle of the country. The far north, in the Himalayan region, experiences conditions closer to temperate because altitude lowers the temperature.' },
    ],
  },
  {
    slug: 'sublimation-and-deposition',
    faqs: [
      { q: 'What is the difference between sublimation and deposition?', a: 'They are opposite changes of state that skip the liquid stage. Sublimation is solid changing directly to gas; deposition is gas changing directly to solid.' },
      { q: 'Give an everyday example of each.', a: 'Camphor or naphthalene balls shrinking away without leaving a puddle is sublimation. Frost forming directly on a cold surface from water vapour in the air is deposition.' },
      { q: 'Does sublimation absorb or release heat?', a: 'Sublimation absorbs heat, because the particles need energy to break free of the solid entirely. Deposition releases that heat again as the gas particles settle into the fixed arrangement of a solid.' },
    ],
  },
  {
    slug: 'contact-and-non-contact-force',
    faqs: [
      { q: 'What is the difference between a contact and a non-contact force?', a: 'A contact force acts only when two objects physically touch — pushing a box, or friction on a moving wheel. A non-contact force acts across a distance with no touching, such as gravity, magnetic force or electrostatic force.' },
      { q: 'Give examples of each.', a: 'Contact forces: muscular force, friction, normal reaction, air resistance and tension in a string. Non-contact forces: gravitational force, magnetic force and electrostatic force.' },
      { q: 'Is friction a contact or non-contact force?', a: 'Friction is a contact force. It arises at the surfaces where two objects touch and opposes the motion between them, so it cannot act if the surfaces are separated.' },
    ],
  },
  {
    slug: 'real-vs-apparent-depth',
    faqs: [
      { q: 'What is the difference between real depth and apparent depth?', a: 'Real depth is the true distance from the surface of a liquid to an object in it. Apparent depth is the shallower depth at which the object appears to be when viewed from above, because light bends as it leaves the water.' },
      { q: 'Why does a pond look shallower than it is?', a: 'Light travelling from the object to your eye refracts away from the normal as it passes from water into air. Your eye traces those rays back in straight lines, and they meet at a point higher than the object actually is.' },
      { q: 'Which is greater, real depth or apparent depth?', a: 'Real depth is always greater for an object viewed from air through a denser medium such as water. This is why a swimming pool looks shallower than it is, and why a straw in a glass appears bent at the surface.' },
    ],
  },
  {
    slug: 'photosynthesis-and-transpiration',
    faqs: [
      { q: 'What is the difference between photosynthesis and transpiration?', a: 'Photosynthesis is the process that makes food: the leaf uses light energy to convert carbon dioxide and water into glucose, releasing oxygen. Transpiration is the loss of water vapour from the plant, mainly through the stomata of the leaves.' },
      { q: 'Do both happen only in daylight?', a: 'Photosynthesis needs light and stops in the dark. Transpiration continues at a reduced rate at night, though it is much faster in the day because the stomata are open and the temperature is higher.' },
      { q: 'Is transpiration useful to a plant or just a loss?', a: 'It is both. Water is lost, but the loss creates the pull that draws water and dissolved minerals up from the roots, and the evaporation cools the leaf. This upward pull is called the transpiration pull.' },
    ],
  },
  {
    slug: 'mass-and-inertia',
    faqs: [
      { q: 'What is the difference between mass and inertia?', a: 'Mass is the quantity of matter in an object, measured in kilograms. Inertia is the property of resisting a change in the state of rest or of motion. Mass is the measure of inertia — the greater the mass, the greater the inertia.' },
      { q: 'Does inertia have a unit?', a: 'Inertia is a property rather than a measured quantity, so it has no unit of its own. It is quantified through mass, which is measured in kilograms.' },
      { q: 'Why is it harder to stop a loaded truck than a bicycle at the same speed?', a: 'Because the truck has far greater mass and therefore far greater inertia, so it resists the change in its motion much more strongly. A much larger force, or the same force for much longer, is needed to stop it.' },
    ],
  },
  {
    slug: 'acceleration-and-retardation',
    faqs: [
      { q: 'What is the difference between acceleration and retardation?', a: 'Acceleration is the rate of change of velocity with time. Retardation, also called deceleration, is acceleration that acts against the motion and so reduces the speed — it is simply negative acceleration.' },
      { q: 'Is retardation a separate quantity from acceleration?', a: 'No. It is the same quantity with the opposite sign relative to the direction of motion. Both are measured in metres per second squared.' },
      { q: 'Can an object accelerate without changing speed?', a: 'Yes. Velocity includes direction, so an object moving in a circle at constant speed is accelerating, because its direction is changing continuously.' },
    ],
  },
  {
    slug: 'cash-and-cheque',
    faqs: [
      { q: 'What is the difference between paying by cash and by cheque?', a: 'Cash is currency notes and coins handed over directly, and the payment is complete at once. A cheque is a written instruction to a bank to pay a stated sum from the drawer\'s account, so the money moves only when the bank clears it.' },
      { q: 'Which gives a better record of payment?', a: 'A cheque. It creates a record in the bank statement showing who was paid, how much and when. A cash payment leaves no such record unless a separate receipt is written.' },
      { q: 'What happens if a cheque bounces?', a: 'If the account does not hold enough money, the bank refuses to pay and returns the cheque unpaid. The payment fails, the bank usually charges a penalty, and dishonouring a cheque is a punishable offence in India.' },
    ],
  },
  {
    slug: 'compound-and-molecule',
    faqs: [
      { q: 'What is the difference between a compound and a molecule?', a: 'A molecule is the smallest particle of a substance that can exist independently, made of two or more atoms joined together. A compound is a substance whose molecules contain atoms of more than one element chemically combined in a fixed ratio.' },
      { q: 'Is every molecule a compound?', a: 'No. A molecule of oxygen contains two oxygen atoms — it is a molecule but not a compound, because only one element is present. A molecule of water contains hydrogen and oxygen, so it is both a molecule and a compound.' },
      { q: 'Can a compound be separated by physical means?', a: 'No. The elements in a compound are chemically bonded in a fixed ratio, so only a chemical reaction can separate them. A mixture, by contrast, can be separated physically by methods such as filtration or evaporation.' },
    ],
  },
  {
    slug: 'cell-vs-battery',
    faqs: [
      { q: 'What is the difference between a cell and a battery?', a: 'A cell is a single unit that converts chemical energy into electrical energy. A battery is a combination of two or more cells joined together, usually in series, to provide a higher voltage.' },
      { q: 'Is the AA cell in a torch a battery?', a: 'Strictly it is a single cell, though it is commonly called a battery in everyday speech. A 9 V block, which contains several cells inside one casing, is a battery in the correct sense.' },
      { q: 'Why are cells connected in series in a battery?', a: 'Because connecting cells in series adds their voltages, so three 1.5 V cells in series supply about 4.5 V. Connecting them in parallel keeps the voltage the same but allows the battery to supply current for longer.' },
    ],
  },
  {
    slug: 'kharif-and-rabi-crops',
    faqs: [
      { q: 'What is the difference between kharif and rabi crops?', a: 'Kharif crops are sown at the beginning of the south-west monsoon and harvested at its end, roughly June to October. Rabi crops are sown in winter, roughly October to December, and harvested in spring.' },
      { q: 'Give examples of each.', a: 'Kharif crops include paddy, maize, cotton, groundnut and soyabean, all of which need plentiful water and warmth. Rabi crops include wheat, gram, peas, mustard and barley, which need a cooler growing season.' },
      { q: 'Why do kharif crops depend so much on the monsoon?', a: 'Because they are grown in the rainy season and need a large and steady supply of water. A late or weak monsoon directly reduces the kharif harvest, which is why irrigation matters most for these crops.' },
    ],
  },
  {
    slug: 'goods-and-services',
    faqs: [
      { q: 'What is the difference between goods and services?', a: 'Goods are tangible items that can be seen, touched and stored — a book, a phone, a bag of rice. Services are intangible activities performed for someone, such as teaching, banking or a haircut, and cannot be stored.' },
      { q: 'Can a service be stored for later?', a: 'No. A service is produced and consumed at the same time, which is why an empty seat on a train or an unfilled appointment is a loss that cannot be recovered. Goods can be produced now and sold later.' },
      { q: 'Can something be both a good and a service?', a: 'Many purchases combine the two. A meal in a restaurant includes the food, which is a good, and the cooking and serving, which are services. Economists call these mixed offerings.' },
    ],
  },
  {
    slug: 'genotype-and-phenotype',
    faqs: [
      { q: 'What is the difference between genotype and phenotype?', a: 'The genotype is the genetic make-up of an organism — the actual alleles it carries. The phenotype is the set of observable characteristics that result, such as height, flower colour or blood group.' },
      { q: 'Can two organisms with the same phenotype have different genotypes?', a: 'Yes. With a dominant allele, both TT and Tt produce the same tall phenotype, because one copy of the dominant allele is enough to show the trait. Only tt gives the short phenotype.' },
      { q: 'Does the environment affect the phenotype?', a: 'Yes. The genotype sets what is possible, but conditions such as nutrition, light and temperature influence what actually appears. Two plants with identical genotypes can differ in height if one is better nourished.' },
    ],
  },
  {
    slug: 'vein-and-midrib',
    faqs: [
      { q: 'What is the difference between a vein and the midrib of a leaf?', a: 'The midrib is the single thick central vein running down the middle of the leaf from the stalk to the tip. Veins are the smaller strands that branch out from the midrib across the lamina.' },
      { q: 'What do they do?', a: 'Both carry the vascular tissue: xylem bringing water and minerals into the leaf and phloem carrying away the food made in photosynthesis. They also provide mechanical support that holds the leaf blade flat and spread out to the light.' },
      { q: 'What is venation?', a: 'Venation is the arrangement of veins in the lamina. Reticulate venation forms a net-like pattern branching from the midrib, typical of dicots; parallel venation runs the veins side by side, typical of monocots such as grasses.' },
    ],
  },
  {
    slug: 'line-and-line-segment',
    faqs: [
      { q: 'What is the difference between a line and a line segment?', a: 'A line extends without end in both directions and has no fixed length. A line segment is the part of a line between two fixed endpoints, so it has a definite, measurable length.' },
      { q: 'How are they written in geometry?', a: 'A line through points A and B is written AB with a double-headed arrow above it, showing it continues both ways. The segment between the same two points is written AB with a plain bar above it.' },
      { q: 'What is a ray?', a: 'A ray is the third case: it has one fixed endpoint and extends without end in one direction only. A beam of light from a torch is the everyday picture of a ray.' },
    ],
  },
  {
    slug: 'ammeter-vs-voltmeter',
    faqs: [
      { q: 'What is the difference between an ammeter and a voltmeter?', a: 'An ammeter measures the current flowing through a circuit, in amperes. A voltmeter measures the potential difference between two points, in volts.' },
      { q: 'How is each connected in a circuit?', a: 'An ammeter is connected in series, so the whole current passes through it. A voltmeter is connected in parallel across the component whose potential difference is being measured.' },
      { q: 'Why does an ammeter have low resistance and a voltmeter high resistance?', a: 'An ammeter must not reduce the current it is measuring, so its resistance is kept very low. A voltmeter must draw almost no current away from the component, so its resistance is kept very high. Connecting an ammeter in parallel can short the circuit and damage it.' },
    ],
  },
  {
    slug: 'direct-and-indirect-tax',
    faqs: [
      { q: 'What is the difference between a direct and an indirect tax?', a: 'A direct tax is paid straight to the government by the person on whom it is levied, and the burden cannot be passed on. An indirect tax is levied on goods and services and collected by the seller, who passes the burden to the buyer in the price.' },
      { q: 'Give an Indian example of each.', a: 'Income tax and corporate tax are direct taxes, paid by the earner. Goods and Services Tax is an indirect tax, added to the price of what you buy and passed on to the government by the seller.' },
      { q: 'Which type is considered fairer?', a: 'Direct taxes are usually called more equitable because the rate can rise with income, so those who earn more pay a larger share. Indirect taxes apply at the same rate to everyone, so they take a larger proportion of a poorer household\'s income.' },
    ],
  },
  {
    slug: 'acquired-and-inherited-traits',
    faqs: [
      { q: 'What is the difference between an acquired and an inherited trait?', a: 'An inherited trait is passed from parents through the genes and is present in the reproductive cells. An acquired trait develops during an individual\'s lifetime as a result of environment, use or experience, and is not carried in the genes.' },
      { q: 'Can an acquired trait be passed to offspring?', a: 'No. Acquired traits change the body cells but not the genes in the reproductive cells, so they are not passed on. This is why the children of a weightlifter are not born with larger muscles.' },
      { q: 'Give examples of each.', a: 'Inherited: eye colour, blood group, natural hair type. Acquired: the ability to speak a particular language, a scar, muscle built by exercise, or weight gained through diet.' },
    ],
  },
  {
    slug: 'myopia-vs-hypermetropia',
    faqs: [
      { q: 'What is the difference between myopia and hypermetropia?', a: 'In myopia, or short-sightedness, distant objects appear blurred because the image forms in front of the retina. In hypermetropia, or long-sightedness, nearby objects appear blurred because the image forms behind the retina.' },
      { q: 'Which lens corrects each defect?', a: 'Myopia is corrected with a concave lens, which diverges the rays so the image moves back on to the retina. Hypermetropia is corrected with a convex lens, which converges the rays so the image moves forward on to the retina.' },
      { q: 'What causes these defects?', a: 'Myopia arises when the eyeball is too long or the lens is too strongly curved. Hypermetropia arises when the eyeball is too short or the lens cannot converge light enough. Both change where the image forms relative to the retina.' },
    ],
  },
  {
    slug: 'cyclone-and-anticyclone',
    faqs: [
      { q: 'What is the difference between a cyclone and an anticyclone?', a: 'A cyclone is a system of low pressure at the centre with air spiralling inwards and rising. An anticyclone is a system of high pressure with air descending and spiralling outwards.' },
      { q: 'What weather does each bring?', a: 'A cyclone brings cloud, strong winds and rain, because the rising air cools and its moisture condenses. An anticyclone brings calm, clear and settled weather, because descending air warms and clouds do not readily form.' },
      { q: 'Which way do the winds turn?', a: 'In the northern hemisphere, cyclonic winds blow anticlockwise and anticyclonic winds clockwise. In the southern hemisphere both are reversed, an effect of the Earth\'s rotation known as the Coriolis effect.' },
    ],
  },
  {
    slug: 'lake-and-pond',
    faqs: [
      { q: 'What is the difference between a lake and a pond?', a: 'Both are standing bodies of water, differing mainly in size and depth. A pond is small and shallow enough for sunlight to reach the bottom throughout; a lake is larger and deep enough that light does not reach the deepest parts.' },
      { q: 'Why does that depth difference matter?', a: 'Because sunlight reaching the bottom allows rooted plants to grow across the whole floor of a pond. In a lake the deeper water stays dark and cold, so plants grow mainly around the edges and the water can form distinct temperature layers.' },
      { q: 'Is there an exact size that separates them?', a: 'No official boundary exists and usage varies by region. The practical test used in geography is whether light reaches the bottom across the whole body of water, not any fixed measurement.' },
    ],
  },
  {
    slug: 'gdp-and-gnp',
    faqs: [
      { q: 'What is the difference between GDP and GNP?', a: 'Gross Domestic Product counts the value of everything produced inside a country\'s borders, whoever owns the business. Gross National Product counts what is produced by a country\'s residents, wherever in the world they produce it.' },
      { q: 'How do you get from one to the other?', a: 'GNP equals GDP plus income earned by residents abroad, minus income earned within the country by non-residents. That adjustment is called net factor income from abroad.' },
      { q: 'Which does India use as its headline measure?', a: 'GDP is the figure normally quoted for growth, because it measures activity within the country. GNP matters more when a large share of national income comes from citizens working overseas.' },
    ],
  },
  {
    slug: 'needs-and-wants',
    faqs: [
      { q: 'What is the difference between needs and wants?', a: 'Needs are things required for survival and basic wellbeing — food, water, shelter, clothing, healthcare. Wants are things that make life more comfortable or enjoyable but are not essential to survival.' },
      { q: 'Can a want become a need?', a: 'What counts as a need changes with society and circumstances. A mobile phone was once a want but is now close to a necessity for study, work and banking. Needs are judged relative to the conditions people actually live in.' },
      { q: 'Why does this distinction matter in economics?', a: 'Because resources are limited and wants are unlimited. Households and governments must choose which to satisfy first, and that choice — the problem of scarcity — is the starting point of economics.' },
    ],
  },
  {
    slug: 'profit-and-loss',
    faqs: [
      { q: 'What is the difference between profit and loss?', a: 'Profit occurs when the selling price is greater than the cost price, and equals selling price minus cost price. Loss occurs when the selling price is less than the cost price, and equals cost price minus selling price.' },
      { q: 'How is profit percentage calculated?', a: 'Profit percentage is the profit expressed as a percentage of the cost price: profit divided by cost price, multiplied by 100. Loss percentage is calculated the same way, on the cost price rather than the selling price.' },
      { q: 'Why is the percentage always taken on the cost price?', a: 'Because the cost price is what was actually invested, so it is the fair basis for judging the return. Taking the percentage on the selling price would give a different and misleading figure.' },
    ],
  },
  {
    slug: 'microeconomics-and-macroeconomics',
    faqs: [
      { q: 'What is the difference between microeconomics and macroeconomics?', a: 'Microeconomics studies individual units — a household, a firm, a single market — and how they make decisions about price and quantity. Macroeconomics studies the economy as a whole, through aggregates such as national income, inflation and unemployment.' },
      { q: 'Give an example of a question from each.', a: 'Micro: how will a rise in the price of onions affect how much a household buys? Macro: how will a rise in the general price level affect employment across the country?' },
      { q: 'Are the two connected?', a: 'Yes. Aggregates are built from the decisions of individuals and firms, so macroeconomic outcomes rest on microeconomic behaviour, and macroeconomic conditions such as inflation change the choices individuals make.' },
    ],
  },
  {
    slug: 'manure-and-fertilizer',
    faqs: [
      { q: 'What is the difference between manure and fertiliser?', a: 'Manure is a natural substance made by decomposing plant and animal waste. A fertiliser is manufactured chemically and supplies specific nutrients in concentrated form.' },
      { q: 'Which is better for the soil?', a: 'Manure adds humus, which improves the texture, water-holding capacity and aeration of the soil, though its nutrient content is low. Fertilisers supply nutrients quickly and in large amounts but add no organic matter, and prolonged heavy use can damage soil structure.' },
      { q: 'Why can excessive fertiliser use harm the environment?', a: 'Nutrients not taken up by the crop are washed into ponds and rivers. There they cause excessive algal growth, which uses up dissolved oxygen when it decays and kills aquatic life. This is called eutrophication.' },
    ],
  },
  {
    slug: 'solid-liquid-and-gas',
    faqs: [
      { q: 'What is the difference between a solid and a liquid?', a: 'A solid has both a fixed shape and a fixed volume, because its particles are packed closely in fixed positions. A liquid has a fixed volume but no fixed shape — it takes the shape of its container, because its particles can slide past one another.' },
      { q: 'Why can liquids flow but solids cannot?', a: 'In a solid the forces of attraction between particles are strong enough to hold them in place, so they only vibrate. In a liquid those forces are weaker, so particles can move around one another while still staying close together.' },
      { q: 'Which is more compressible?', a: 'Liquids are only very slightly compressible and solids almost not at all, because in both the particles are already close together with very little space between them. Gases are highly compressible because their particles are far apart.' },
    ],
  },
  {
    slug: 'echo-and-reverberation',
    faqs: [
      { q: 'What is the difference between an echo and reverberation?', a: 'An echo is a single reflected sound heard clearly and separately from the original. Reverberation is the persistence of sound caused by many repeated reflections arriving so close together that they merge into a prolonged sound.' },
      { q: 'Why must a surface be far away to produce an echo?', a: 'The ear distinguishes two sounds only if they arrive at least about a tenth of a second apart. Sound travels roughly 344 metres per second in air, so the reflecting surface must be at least about 17 metres away.' },
      { q: 'How is excessive reverberation reduced in a hall?', a: 'By covering surfaces with materials that absorb rather than reflect sound — curtains, carpets, upholstered seats and perforated ceiling panels. The audience itself also absorbs a good deal of sound.' },
    ],
  },
  {
    slug: 'insulator-and-semiconductor',
    faqs: [
      { q: 'What is the difference between an insulator and a semiconductor?', a: 'An insulator does not allow electric current to pass through it under ordinary conditions. A semiconductor conducts poorly in its pure state but far better than an insulator, and its conductivity can be controlled deliberately.' },
      { q: 'Give examples of each.', a: 'Insulators: rubber, glass, dry wood, plastic and porcelain. Semiconductors: silicon and germanium, which are the basis of diodes, transistors and the chips inside every computer.' },
      { q: 'How is a semiconductor made to conduct better?', a: 'By doping — adding a small, controlled quantity of another element to the pure crystal. Raising the temperature also increases conductivity in a semiconductor, which is the opposite of what happens in a metal.' },
    ],
  },
  {
    slug: 'fundamental-rights-and-fundamental-duties',
    faqs: [
      { q: 'What is the difference between Fundamental Rights and Fundamental Duties?', a: 'Fundamental Rights are guarantees the Constitution gives every citizen against the state, and they are enforceable in court. Fundamental Duties are obligations the Constitution expects citizens to observe, and they are not directly enforceable by a court.' },
      { q: 'Where are they found in the Constitution?', a: 'Fundamental Rights are in Part III. Fundamental Duties are in Part IVA, under Article 51A, and were added later by the 42nd Amendment in 1976 rather than being part of the original text.' },
      { q: 'Can you go to court over a Fundamental Duty?', a: 'Not to enforce the duty itself, because duties are not justiciable. Fundamental Rights are different: a citizen may approach the High Court or the Supreme Court directly when a Fundamental Right is violated.' },
    ],
  },
  {
    slug: 'debit-and-credit-card',
    faqs: [
      { q: 'What is the difference between a debit card and a credit card?', a: 'A debit card spends money already in your own bank account, and the amount leaves the account immediately. A credit card borrows from the bank up to an agreed limit, and you repay the bank later.' },
      { q: 'Which one can leave you in debt?', a: 'A credit card, because the money is borrowed. If the bill is not paid in full by the due date, interest is charged on the outstanding amount, and credit card interest rates are typically high.' },
      { q: 'What happens if there is not enough money in the account?', a: 'A debit card transaction is simply declined, since it can only spend what is there. A credit card transaction succeeds as long as it stays within the credit limit, which is why it needs more careful tracking.' },
    ],
  },
  {
    slug: 'mass-and-weight',
    faqs: [
      { q: 'What is the difference between mass and weight?', a: 'Mass is the quantity of matter in an object and stays the same everywhere, measured in kilograms. Weight is the force with which gravity pulls on that mass, measured in newtons, and it changes with the strength of gravity.' },
      { q: 'Would your weight change on the Moon?', a: 'Your mass would be unchanged, but your weight would be about one sixth of its value on Earth, because the Moon\'s gravitational pull is about one sixth as strong.' },
      { q: 'Why do we say weight in kilograms in everyday life?', a: 'It is a loose everyday usage. A weighing scale actually compares mass, and because gravity is nearly constant across the Earth, the reading in kilograms is a reliable stand-in for weight in daily use. In physics the two must be kept distinct.' },
    ],
  },
];

export const DIFF_REINDEX_SLUGS = new Set(DIFF_REINDEX.map((d) => d.slug));
