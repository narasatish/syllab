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
];

export const DIFF_REINDEX_SLUGS = new Set(DIFF_REINDEX.map((d) => d.slug));
