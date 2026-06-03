/**
 * socialImages — verified Wikimedia Commons images for Social Science decks.
 * Maps are India-centric. All URLs HTTP-200 checked by scripts/build-social-images.ts.
 * (CC-licensed / public-domain historical works.)
 */
export interface SocialImage { key: string; strand: string; url: string; alt: string; caption: string; }

export const SOCIAL_IMAGES: SocialImage[] = [
  {
    "key": "geo-india-location",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_location_map.svg?width=640",
    "alt": "Map of India",
    "caption": "India lies in South Asia between 8°N and 37°N latitude."
  },
  {
    "key": "geo-india-physical",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_relief_location_map.svg?width=640",
    "alt": "Physical relief map of India",
    "caption": "India's mountains, plains, plateau and long coastline."
  },
  {
    "key": "geo-india-climate",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_southwest_summer_monsoon_onset_map_en.svg?width=640",
    "alt": "Monsoon onset over India",
    "caption": "The southwest monsoon advances across India from June."
  },
  {
    "key": "geo-india-vegetation",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_Natural_vegetation.svg?width=640",
    "alt": "Natural vegetation of India",
    "caption": "India's forest and vegetation belts."
  },
  {
    "key": "geo-india-population",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_population_density_map_en.svg?width=640",
    "alt": "Population density of India",
    "caption": "How India's population is spread across states."
  },
  {
    "key": "geo-india-minerals",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India_mineral_map.jpg?width=640",
    "alt": "Mineral map of India",
    "caption": "India's major mineral and energy belts."
  },
  {
    "key": "geo-india-transport",
    "strand": "Geography",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Railway_network_map_of_India_-_Schematic.svg?width=640",
    "alt": "Indian Railway network",
    "caption": "Railways are a lifeline of the national economy."
  },
  {
    "key": "his-bastille",
    "strand": "History",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Prise_de_la_Bastille_clean.jpg?width=640",
    "alt": "Storming of the Bastille, 1789",
    "caption": "The fall of the Bastille sparked the French Revolution."
  },
  {
    "key": "his-salt-march",
    "strand": "History",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Gandhi_during_the_Salt_March.jpg?width=640",
    "alt": "Gandhi on the Salt March, 1930",
    "caption": "Gandhi's Dandi March defied the British salt law."
  },
  {
    "key": "his-lenin",
    "strand": "History",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Vladimir_Lenin%2C_1917.jpg?width=640",
    "alt": "Vladimir Lenin, 1917",
    "caption": "Lenin led the Bolshevik Revolution of October 1917."
  },
  {
    "key": "civ-parliament",
    "strand": "Civics",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Sansad_Bhavan%2C_Delhi%2C_BNK.jpg?width=640",
    "alt": "Parliament of India",
    "caption": "The Parliament of India — where national laws are made."
  },
  {
    "key": "civ-constitution",
    "strand": "Civics",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/India-constitution-preamble.svg?width=640",
    "alt": "Preamble to the Constitution of India",
    "caption": "India's ideals: justice, liberty, equality, fraternity."
  },
  {
    "key": "eco-sectors",
    "strand": "Economics",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Gdp-and-labour-force-by-sector.png?width=640",
    "alt": "GDP and labour force by sector",
    "caption": "Primary, secondary and tertiary sectors of the economy."
  },
  {
    "key": "eco-hdi",
    "strand": "Economics",
    "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Human_Development_Index%2C_OWID.svg?width=640",
    "alt": "Human Development Index",
    "caption": "HDI measures development beyond income: health, education, living standards."
  }
];
