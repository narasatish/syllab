/** staticGk.ts — static General Knowledge reference cluster. */
export interface GkItem { name: string; detail: string; }
export interface GkFaq { q: string; a: string; }
export interface GkTopic {
  slug: string; title: string; category: string; intro: string; items: GkItem[]; faqs: GkFaq[];
}
export const GK_TOPICS: GkTopic[] = [
  {
    "slug": "countries-and-capitals",
    "title": "Countries and Their Capitals",
    "category": "World",
    "intro": "A comprehensive reference of world nations and their capital cities. Essential for competitive exams and geography knowledge.",
    "items": [
      {
        "name": "India",
        "detail": "Capital: New Delhi (national capital since 1931)"
      },
      {
        "name": "USA",
        "detail": "Capital: Washington D.C. (established in 1800)"
      },
      {
        "name": "China",
        "detail": "Capital: Beijing (population over 21 million)"
      },
      {
        "name": "Japan",
        "detail": "Capital: Tokyo (world's largest metropolitan area)"
      },
      {
        "name": "Germany",
        "detail": "Capital: Berlin (reunified in 1990)"
      },
      {
        "name": "France",
        "detail": "Capital: Paris (City of Light, on River Seine)"
      },
      {
        "name": "United Kingdom",
        "detail": "Capital: London (on River Thames)"
      },
      {
        "name": "Russia",
        "detail": "Capital: Moscow (largest city in Europe)"
      },
      {
        "name": "Brazil",
        "detail": "Capital: Brasilia (purpose-built city, founded 1960)"
      },
      {
        "name": "Australia",
        "detail": "Capital: Canberra (built between Melbourne and Sydney)"
      },
      {
        "name": "Canada",
        "detail": "Capital: Ottawa (on Ottawa River)"
      },
      {
        "name": "Mexico",
        "detail": "Capital: Mexico City (largest Spanish-speaking capital)"
      }
    ],
    "faqs": [
      {
        "q": "How many countries are in the world?",
        "a": "There are 195 countries: 193 UN members plus Vatican City and Palestine with observer status."
      },
      {
        "q": "Which is the smallest country by area?",
        "a": "Vatican City is the smallest country with an area of 0.44 square kilometers."
      }
    ]
  },
  {
    "slug": "indian-states-and-capitals",
    "title": "Indian States and Their Capitals",
    "category": "India",
    "intro": "Complete list of all 28 states and 8 union territories of India with their capital cities. Crucial for UPSC, SSC and other competitive exams.",
    "items": [
      {
        "name": "Andhra Pradesh",
        "detail": "Capital: Amaravati (formed after AP Reorganisation Act 2014)"
      },
      {
        "name": "Arunachal Pradesh",
        "detail": "Capital: Itanagar (largest state by area in Northeast India)"
      },
      {
        "name": "Assam",
        "detail": "Capital: Dispur (gateway to Northeast India)"
      },
      {
        "name": "Bihar",
        "detail": "Capital: Patna (ancient seat of Mauryan Empire)"
      },
      {
        "name": "Chhattisgarh",
        "detail": "Capital: Raipur (rice bowl of India)"
      },
      {
        "name": "Goa",
        "detail": "Capital: Panaji (smallest state by area, Portuguese colony until 1961)"
      },
      {
        "name": "Gujarat",
        "detail": "Capital: Gandhinagar (named after Mahatma Gandhi)"
      },
      {
        "name": "Haryana",
        "detail": "Capital: Chandigarh (union territory, shared with Punjab)"
      },
      {
        "name": "Himachal Pradesh",
        "detail": "Capital: Shimla (hill station, summer capital of British India)"
      },
      {
        "name": "Jharkhand",
        "detail": "Capital: Ranchi (mineral-rich state, formed 2000)"
      },
      {
        "name": "Karnataka",
        "detail": "Capital: Bengaluru (IT capital of India)"
      },
      {
        "name": "Kerala",
        "detail": "Capital: Thiruvananthapuram (God's Own Country)"
      }
    ],
    "faqs": [
      {
        "q": "How many states and union territories does India have?",
        "a": "India has 28 states and 8 union territories, forming 36 distinct administrative regions total."
      },
      {
        "q": "Which state has the largest population?",
        "a": "Uttar Pradesh has the largest population with over 200 million people."
      }
    ]
  },
  {
    "slug": "indian-states-capitals-chief-ministers",
    "title": "Indian States, Capitals, and Chief Ministers",
    "category": "India",
    "intro": "Reference guide mapping Indian states and union territories to their capitals and current chief ministers. Updated for competitive exam preparation.",
    "items": [
      {
        "name": "Maharashtra",
        "detail": "Capital: Mumbai, CM: Devendra Fadnavis (BJP, as of March 2023)"
      },
      {
        "name": "Tamil Nadu",
        "detail": "Capital: Chennai, CM: M. K. Stalin (DMK, as of May 2021)"
      },
      {
        "name": "West Bengal",
        "detail": "Capital: Kolkata, CM: Mamata Banerjee (TMC, since 2011)"
      },
      {
        "name": "Madhya Pradesh",
        "detail": "Capital: Bhopal, CM: Mohan Yadav (BJP, as of December 2023)"
      },
      {
        "name": "Rajasthan",
        "detail": "Capital: Jaipur, CM: Bhajanlal Sharma (BJP, as of December 2023)"
      },
      {
        "name": "Punjab",
        "detail": "Capital: Chandigarh, CM: Bhagwant Mann (AAP, since March 2022)"
      },
      {
        "name": "Telangana",
        "detail": "Capital: Hyderabad, CM: A. Revanth Reddy (Congress, as of December 2023)"
      },
      {
        "name": "Uttar Pradesh",
        "detail": "Capital: Lucknow, CM: Yogi Adityanath (BJP, since March 2017)"
      },
      {
        "name": "Odisha",
        "detail": "Capital: Bhubaneswar, CM: Mohan Charan Majhi (BJP, as of June 2024)"
      },
      {
        "name": "Uttarakhand",
        "detail": "Capital: Dehradun, CM: Pushkar Singh Dhami (BJP, since March 2022)"
      }
    ],
    "faqs": [
      {
        "q": "What is the executive head of a state called?",
        "a": "The Chief Minister (CM) is the executive head of a state government in India."
      },
      {
        "q": "Which union territory has a Chief Minister?",
        "a": "Delhi and Puducherry have elected Chief Ministers; others are governed by Administrators/LGs appointed by the President."
      }
    ]
  },
  {
    "slug": "important-days-and-dates",
    "title": "Important Days and Dates in India",
    "category": "India",
    "intro": "National holidays, international observances, and commemoration days celebrated in India. Essential for GK preparation and competitive exams.",
    "items": [
      {
        "name": "Republic Day",
        "detail": "26 January: Celebrates adoption of Indian Constitution in 1950"
      },
      {
        "name": "Independence Day",
        "detail": "15 August: Marks India's independence from British rule in 1947"
      },
      {
        "name": "Mahatma Gandhi's Birthday",
        "detail": "2 October: Birth anniversary of Father of the Nation (1869)"
      },
      {
        "name": "Teachers Day",
        "detail": "5 September: Celebrates birth of Dr. Sarvepalli Radhakrishnan"
      },
      {
        "name": "Constitution Day",
        "detail": "26 November: Celebrates adoption of Indian Constitution by Constituent Assembly"
      },
      {
        "name": "Children's Day",
        "detail": "14 November: Celebrates Jawaharlal Nehru's birthday"
      },
      {
        "name": "National Sports Day",
        "detail": "29 August: Honors Major Dhyan Chand, hockey legend"
      },
      {
        "name": "World Environment Day",
        "detail": "5 June: Global observance for environmental awareness"
      },
      {
        "name": "International Women's Day",
        "detail": "8 March: Global day celebrating women's achievements"
      },
      {
        "name": "World Health Day",
        "detail": "7 April: Observance of WHO founding, promotes health awareness"
      }
    ],
    "faqs": [
      {
        "q": "When was the Indian Constitution adopted?",
        "a": "The Indian Constitution was adopted on 26 November 1950, drafted by Dr. B.R. Ambedkar."
      },
      {
        "q": "Which day is celebrated as Teachers Day in India?",
        "a": "Teachers Day is celebrated on 5 September, the birth anniversary of Dr. Sarvepalli Radhakrishnan."
      }
    ]
  },
  {
    "slug": "famous-inventions-and-inventors",
    "title": "Famous Inventions and Inventors",
    "category": "Science",
    "intro": "Groundbreaking inventions that changed human civilization and their brilliant inventors. Important for science GK and competitive exams.",
    "items": [
      {
        "name": "Electric Bulb",
        "detail": "Invented by Thomas Edison in 1879; practical incandescent bulb"
      },
      {
        "name": "Telephone",
        "detail": "Invented by Alexander Graham Bell in 1876; revolutionized communication"
      },
      {
        "name": "Wireless Telegraph",
        "detail": "Invented by Guglielmo Marconi; foundation of radio communication"
      },
      {
        "name": "Aeroplane",
        "detail": "Invented by Wright Brothers (Orville and Wilbur) in 1903"
      },
      {
        "name": "Steam Engine",
        "detail": "Invented by James Watt in 1769; powered Industrial Revolution"
      },
      {
        "name": "Printing Press",
        "detail": "Invented by Johannes Gutenberg around 1440; spread knowledge"
      },
      {
        "name": "Microscope",
        "detail": "Invented by Anton van Leeuwenhoek in late 1600s"
      },
      {
        "name": "Television",
        "detail": "Invented by John Logie Baird in 1926; mechanical television"
      },
      {
        "name": "Computer",
        "detail": "Developed by multiple inventors; Charles Babbage designed first programmable computer"
      },
      {
        "name": "Penicillin",
        "detail": "Discovered by Alexander Fleming in 1928; first antibiotic"
      }
    ],
    "faqs": [
      {
        "q": "Who invented the telephone?",
        "a": "Alexander Graham Bell patented the telephone in 1876, though other scientists also worked on voice transmission."
      },
      {
        "q": "When was electricity discovered?",
        "a": "Electricity was not invented but discovered; practical application developed through 18th and 19th centuries by Franklin, Volta, Faraday."
      }
    ]
  },
  {
    "slug": "national-symbols-of-india",
    "title": "National Symbols of India",
    "category": "India",
    "intro": "Official national symbols representing Indian sovereignty, culture, and values. Fundamental for Indian GK and civics knowledge.",
    "items": [
      {
        "name": "National Flag",
        "detail": "Tricolor: Saffron, White, Green with Blue Ashoka Chakra; adopted 1950"
      },
      {
        "name": "National Emblem",
        "detail": "Lion Capital of Ashoka with Ashoka Chakra; adopted January 1950"
      },
      {
        "name": "National Animal",
        "detail": "Bengal Tiger (Panthera tigris); symbol of strength and power"
      },
      {
        "name": "National Bird",
        "detail": "Indian Peafowl (Peacock); national bird since 1963"
      },
      {
        "name": "National Flower",
        "detail": "Indian Lotus (Nelumbo nucifera); symbol of purity and enlightenment"
      },
      {
        "name": "National Tree",
        "detail": "Banyan Tree (Ficus benghalensis); symbol of immortality"
      },
      {
        "name": "National Fruit",
        "detail": "Mango (Mangifera indica); king of fruits"
      },
      {
        "name": "National Aquatic Animal",
        "detail": "Indian River Dolphin (Platanista gangetica); endangered species"
      },
      {
        "name": "National Currency",
        "detail": "Indian Rupee (INR, symbol: Rs or ); adopted December 2010"
      },
      {
        "name": "National Song",
        "detail": "Vande Mataram; composed by Bankim Chandra Chatterjee"
      }
    ],
    "faqs": [
      {
        "q": "What do the colors of the Indian flag represent?",
        "a": "Saffron represents courage, White represents truth and peace, Green represents fertility; Ashoka Chakra has 24 spokes."
      },
      {
        "q": "When was the Indian Peafowl declared the national bird?",
        "a": "The Indian Peafowl was declared the national bird on 1 January 1963, replacing the Bengal Eagle."
      }
    ]
  },
  {
    "slug": "indian-classical-dance-forms",
    "title": "Indian Classical Dance Forms",
    "category": "India",
    "intro": "Eight classical dance forms recognized by Sangeet Natak Akademi of India. Rich cultural heritage and artistic excellence.",
    "items": [
      {
        "name": "Bharatanatyam",
        "detail": "Origin: Tamil Nadu; solo female dancer in temple tradition"
      },
      {
        "name": "Kathak",
        "detail": "Origin: North India; features rapid footwork and spins"
      },
      {
        "name": "Kathakali",
        "detail": "Origin: Kerala; elaborate makeup and costumes, tells epics"
      },
      {
        "name": "Kuchipudi",
        "detail": "Origin: Andhra Pradesh; blend of drama and dance"
      },
      {
        "name": "Odissi",
        "detail": "Origin: Odisha; graceful movements and triple bend posture"
      },
      {
        "name": "Manipuri",
        "detail": "Origin: Manipur; soft, lyrical movements and hand gestures"
      },
      {
        "name": "Mohiniyattam",
        "detail": "Origin: Kerala; feminine dance of enchantment"
      },
      {
        "name": "Sattriya",
        "detail": "Origin: Assam; taught in Sattras (monasteries); recognized 2000"
      },
      {
        "name": "Chhau",
        "detail": "Origin: Jharkhand, West Bengal, Odisha; masked dance form with acrobatics"
      },
      {
        "name": "Yakshagana",
        "detail": "Origin: Karnataka; night-long performance with music and dance"
      }
    ],
    "faqs": [
      {
        "q": "How many classical dance forms are recognized by Sangeet Natak Akademi?",
        "a": "Eight classical dance forms: Bharatanatyam, Kathak, Kathakali, Kuchipudi, Odissi, Manipuri, Mohiniyattam, Sattriya, and Chhau."
      },
      {
        "q": "Which dance form originated in Tamil Nadu?",
        "a": "Bharatanatyam originated in Tamil Nadu and is the oldest dance form still performed."
      }
    ]
  },
  {
    "slug": "indian-festivals",
    "title": "Major Indian Festivals",
    "category": "India",
    "intro": "Celebrations of India's diverse religions and cultures with festivals marking seasons, harvests, and historical events.",
    "items": [
      {
        "name": "Diwali",
        "detail": "Festival of Lights; celebrates victory of light over darkness (October-November)"
      },
      {
        "name": "Holi",
        "detail": "Festival of Colors; celebrates arrival of spring and good over evil (March)"
      },
      {
        "name": "Eid ul-Fitr",
        "detail": "Islamic festival marking end of Ramadan fasting month"
      },
      {
        "name": "Christmas",
        "detail": "Celebrates birth of Jesus Christ on 25 December"
      },
      {
        "name": "Navratri",
        "detail": "Nine-night festival dedicated to Goddess Durga (September-October)"
      },
      {
        "name": "Durga Puja",
        "detail": "Major festival in eastern India celebrating Goddess Durga (September-October)"
      },
      {
        "name": "Pongal",
        "detail": "Harvest festival celebrated in Tamil Nadu in January"
      },
      {
        "name": "Baisakhi",
        "detail": "Spring harvest festival celebrated in Punjab on 13-14 April"
      },
      {
        "name": "Onam",
        "detail": "Harvest festival of Kerala celebrated in August-September"
      },
      {
        "name": "Dussehra",
        "detail": "Victory of good over evil, culmination of Navratri (September-October)"
      }
    ],
    "faqs": [
      {
        "q": "What does Diwali celebrate?",
        "a": "Diwali celebrates the victory of light over darkness and good over evil, marking Lord Rama's return from exile."
      },
      {
        "q": "When is Holi celebrated?",
        "a": "Holi is celebrated on the full moon day in the Hindu month of Phalguna, typically in March."
      }
    ]
  },
  {
    "slug": "continents-and-oceans",
    "title": "Continents and Oceans of the World",
    "category": "Geography",
    "intro": "Seven continents and five oceans covering Earth's landmasses and water bodies. Fundamental geography knowledge for all exams.",
    "items": [
      {
        "name": "Asia",
        "detail": "Largest continent; 44.5 million sq km; 60 percent of world population"
      },
      {
        "name": "Africa",
        "detail": "Second largest; 30.37 million sq km; 54 recognized countries"
      },
      {
        "name": "North America",
        "detail": "Third largest; 24.71 million sq km; includes USA, Canada, Mexico"
      },
      {
        "name": "South America",
        "detail": "Fourth largest; 17.84 million sq km; home to Amazon rainforest"
      },
      {
        "name": "Antarctica",
        "detail": "Fifth largest; 14.2 million sq km; coldest and highest continent"
      },
      {
        "name": "Europe",
        "detail": "Sixth largest; 10.18 million sq km; most densely populated continent"
      },
      {
        "name": "Australia",
        "detail": "Smallest continent; 7.7 million sq km; surrounded by water"
      },
      {
        "name": "Pacific Ocean",
        "detail": "Largest ocean; 165 million sq km; deepest point Mariana Trench"
      },
      {
        "name": "Atlantic Ocean",
        "detail": "Second largest ocean; 106 million sq km; separates Europe from Americas"
      },
      {
        "name": "Indian Ocean",
        "detail": "Third largest ocean; 70 million sq km; warmest ocean"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest continent?",
        "a": "Asia is the largest continent, covering 44.5 million square kilometers with 60 percent of world population."
      },
      {
        "q": "How many continents are there?",
        "a": "There are seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
      }
    ]
  },
  {
    "slug": "longest-largest-highest-world",
    "title": "Longest, Largest, Highest in the World",
    "category": "Geography",
    "intro": "Superlative geographical features including mountains, rivers, waterfalls, deserts, and islands. Essential GK facts.",
    "items": [
      {
        "name": "Tallest Mountain",
        "detail": "Mount Everest: 8,849 meters above sea level in Himalayas"
      },
      {
        "name": "Longest River",
        "detail": "Nile River: 6,650 km; flows through Africa"
      },
      {
        "name": "Largest Ocean",
        "detail": "Pacific Ocean: 165.2 million square kilometers"
      },
      {
        "name": "Largest Desert",
        "detail": "Sahara Desert: 9 million square kilometers in Africa"
      },
      {
        "name": "Largest Island",
        "detail": "Greenland: 2.166 million square kilometers"
      },
      {
        "name": "Deepest Ocean Trench",
        "detail": "Mariana Trench: 10,994 meters in western Pacific"
      },
      {
        "name": "Largest Lake",
        "detail": "Caspian Sea: 371,000 square kilometers"
      },
      {
        "name": "Largest Waterfall",
        "detail": "Angel Falls: 979 meters in Venezuela by height"
      },
      {
        "name": "Longest Mountain Range",
        "detail": "Mid-Ocean Ridge: 65,000 km underwater system"
      },
      {
        "name": "Highest Plateau",
        "detail": "Tibetan Plateau: 4,500 meters average elevation"
      }
    ],
    "faqs": [
      {
        "q": "What is the height of Mount Everest?",
        "a": "Mount Everest is 8,849 meters above sea level, making it the world's tallest mountain."
      },
      {
        "q": "Which is the longest river in the world?",
        "a": "The Nile River is the longest river, spanning 6,650 kilometers across Africa."
      }
    ]
  },
  {
    "slug": "indian-national-parks",
    "title": "Major Indian National Parks",
    "category": "India",
    "intro": "Protected wildlife sanctuaries and national parks across India preserving biodiversity. Important for environmental and Indian GK.",
    "items": [
      {
        "name": "Jim Corbett National Park",
        "detail": "Located in Uttarakhand; oldest national park (1936); protects Bengal tigers"
      },
      {
        "name": "Kanha National Park",
        "detail": "Located in Madhya Pradesh; inspired Rudyard Kipling's Jungle Book"
      },
      {
        "name": "Ranthambore National Park",
        "detail": "Located in Rajasthan; one of largest tiger reserves with historical fort"
      },
      {
        "name": "Gir National Park",
        "detail": "Located in Gujarat; only natural habitat of Asiatic lions"
      },
      {
        "name": "Kaziranga National Park",
        "detail": "Located in Assam; home to world's largest population of Indian rhinoceros"
      },
      {
        "name": "Sundarbans National Park",
        "detail": "Located in West Bengal; world's largest mangrove forest, home to Bengal tigers"
      },
      {
        "name": "Sariska National Park",
        "detail": "Located in Rajasthan; reintroduction program for tigers"
      },
      {
        "name": "Keibul Lamjao National Park",
        "detail": "Located in Manipur; only floating national park"
      },
      {
        "name": "Nanda Devi National Park",
        "detail": "Located in Uttarakhand; UNESCO World Heritage Site"
      },
      {
        "name": "Great Himalayan National Park",
        "detail": "Located in Himachal Pradesh; protects musk deer and snow leopards"
      }
    ],
    "faqs": [
      {
        "q": "Which is the oldest national park in India?",
        "a": "Jim Corbett National Park in Uttarakhand is India's oldest national park, established in 1936."
      },
      {
        "q": "Where is the only habitat of Asiatic lions?",
        "a": "The Gir National Park in Gujarat is the only natural habitat of Asiatic lions in the world."
      }
    ]
  },
  {
    "slug": "important-rivers-of-india",
    "title": "Important Rivers of India",
    "category": "Geography",
    "intro": "Major rivers of India flowing across diverse regions, crucial for civilization, irrigation, and transportation. Key GK topic.",
    "items": [
      {
        "name": "Ganga River",
        "detail": "Length: 2,525 km; originates in Uttarkashi; holiest river of India"
      },
      {
        "name": "Brahmaputra River",
        "detail": "Length: 2,900 km; flows through Assam; second major river of India"
      },
      {
        "name": "Yangtze River",
        "detail": "Length: 6,300 km; flows through China; longest river of Asia"
      },
      {
        "name": "Yamuna River",
        "detail": "Length: 1,376 km; tributary of Ganga; flows through Delhi and Agra"
      },
      {
        "name": "Narmada River",
        "detail": "Length: 1,312 km; flows through Madhya Pradesh and Gujarat"
      },
      {
        "name": "Godavari River",
        "detail": "Length: 1,465 km; second longest river of India; flows through central India"
      },
      {
        "name": "Krishna River",
        "detail": "Length: 1,400 km; flows through Deccan plateau and coastal regions"
      },
      {
        "name": "Sutlej River",
        "detail": "Length: 1,500 km; flows through Himachal Pradesh and Punjab"
      },
      {
        "name": "Indus River",
        "detail": "Length: 3,180 km; originates in Tibet; major historical river"
      },
      {
        "name": "Mahanadi River",
        "detail": "Length: 890 km; flows through Chhattisgarh and Odisha"
      }
    ],
    "faqs": [
      {
        "q": "Which is the longest river in India?",
        "a": "The Brahmaputra River is the longest river of India, spanning 2,900 kilometers through the Northeast."
      },
      {
        "q": "What is the holy significance of Ganga River?",
        "a": "Ganga River is considered the holiest river in Hindu religion, and bathing in it is believed to cleanse sins."
      }
    ]
  },
  {
    "slug": "first-in-india",
    "title": "Firsts in India",
    "category": "India",
    "intro": "Historic achievements and pioneering accomplishments within India. Important for Indian history and competitive exams.",
    "items": [
      {
        "name": "First President",
        "detail": "Dr. Rajendra Prasad (1950-1962)"
      },
      {
        "name": "First Prime Minister",
        "detail": "Jawaharlal Nehru (1947-1964)"
      },
      {
        "name": "First Female Prime Minister",
        "detail": "Indira Gandhi (1966-1977, 1980-1984)"
      },
      {
        "name": "First Chief Justice",
        "detail": "Justice Maharaj Singh (1950-1951)"
      },
      {
        "name": "First Indian to win Olympic Gold",
        "detail": "Abhinav Bindra, shooting, Beijing 2008"
      },
      {
        "name": "First Indian in Space",
        "detail": "Rakesh Sharma, 1984"
      },
      {
        "name": "First Satellite",
        "detail": "Aryabhata, launched 1975 by ISRO"
      },
      {
        "name": "First Nuclear Test",
        "detail": "Pokhran-I, 1974 under PM Indira Gandhi"
      },
      {
        "name": "First Indian Nobel Laureate",
        "detail": "Rabindranath Tagore, Literature, 1913"
      },
      {
        "name": "First IIT Established",
        "detail": "IIT Kharagpur, 1951"
      }
    ],
    "faqs": [
      {
        "q": "Who was the first President of India?",
        "a": "Dr. Rajendra Prasad was the first President of India, serving from 1950 to 1962."
      },
      {
        "q": "Which was the first Indian satellite?",
        "a": "Aryabhata was India's first satellite, launched on 19 April 1975 by ISRO."
      }
    ]
  },
  {
    "slug": "first-in-world",
    "title": "Historic Firsts in the World",
    "category": "World",
    "intro": "Groundbreaking first achievements that shaped human civilization and history. Essential world GK knowledge.",
    "items": [
      {
        "name": "First Human in Space",
        "detail": "Yuri Gagarin (USSR), 1961"
      },
      {
        "name": "First Moon Landing",
        "detail": "Apollo 11, Neil Armstrong (USA), 21 July 1969"
      },
      {
        "name": "First Female in Space",
        "detail": "Valentina Tereshkova (USSR), 1963"
      },
      {
        "name": "First President of USA",
        "detail": "George Washington (1789-1797)"
      },
      {
        "name": "First World War",
        "detail": "1914-1918; major conflict reshaping world"
      },
      {
        "name": "First Television Transmission",
        "detail": "John Logie Baird, 1926"
      },
      {
        "name": "First Atomic Bomb",
        "detail": "USA, August 1945 at Hiroshima"
      },
      {
        "name": "First Internet Communication",
        "detail": "ARPANET, 1969"
      },
      {
        "name": "First Commercial Flight",
        "detail": "Wright Brothers' Flyer, 1903"
      },
      {
        "name": "First Railway",
        "detail": "UK, 1825, Stockton to Darlington"
      }
    ],
    "faqs": [
      {
        "q": "Who was the first human to go to space?",
        "a": "Yuri Gagarin of the USSR was the first human in space, orbiting Earth on 12 April 1961."
      },
      {
        "q": "When did humans first land on the moon?",
        "a": "Apollo 11 landed on the moon on 21 July 1969, with Neil Armstrong becoming the first person to walk on it."
      }
    ]
  },
  {
    "slug": "nobel-prize-facts",
    "title": "Nobel Prize Facts",
    "category": "World",
    "intro": "Information about the world's most prestigious award established by Alfred Nobel. Categories, recipients, and historical facts.",
    "items": [
      {
        "name": "Established",
        "detail": "1901 by will of Swedish industrialist Alfred Nobel"
      },
      {
        "name": "Categories",
        "detail": "Physics, Chemistry, Physiology or Medicine, Literature, Peace, Economic Sciences"
      },
      {
        "name": "Prize Money",
        "detail": "Approximately 10 million Swedish kronor per award"
      },
      {
        "name": "First Winner",
        "detail": "Wilhelm Rontgen, Physics, 1901 for discovery of X-rays"
      },
      {
        "name": "First Woman Winner",
        "detail": "Marie Curie, Physics, 1903"
      },
      {
        "name": "Indian Nobel Laureates",
        "detail": "Rabindranath Tagore (Literature 1913), C.V. Raman (Physics 1930), Mother Teresa (Peace 1979)"
      },
      {
        "name": "Youngest Winner",
        "detail": "Malala Yousafzai, Peace, 2014, age 17"
      },
      {
        "name": "Most Nobel Prizes",
        "detail": "USA with over 400 Nobel laureates total"
      },
      {
        "name": "Nobel Peace Center",
        "detail": "Located in Oslo, Norway"
      },
      {
        "name": "Nobel Committee",
        "detail": "Swedish Academy awards Literature and Economic Sciences; Norwegian Nobel Committee awards Peace"
      }
    ],
    "faqs": [
      {
        "q": "When was the Nobel Prize first awarded?",
        "a": "The first Nobel Prize was awarded in 1901, following Alfred Nobel's death in 1896."
      },
      {
        "q": "How many Indian Nobel laureates are there?",
        "a": "India has six Nobel laureates: Tagore, Raman, Mother Teresa, Subramanyam Chandrasekhar, Venkatraman Ramakrishnan, and Abhijit Banerjee."
      }
    ]
  },
  {
    "slug": "currency-of-countries",
    "title": "Currencies of Countries",
    "category": "World",
    "intro": "Official currencies used in different countries around the world. Important for economics and international trade GK.",
    "items": [
      {
        "name": "India",
        "detail": "Currency: Indian Rupee (INR, symbol Rs)"
      },
      {
        "name": "USA",
        "detail": "Currency: US Dollar (USD, symbol $)"
      },
      {
        "name": "United Kingdom",
        "detail": "Currency: British Pound (GBP, symbol )"
      },
      {
        "name": "Japan",
        "detail": "Currency: Japanese Yen (JPY, symbol)"
      },
      {
        "name": "China",
        "detail": "Currency: Chinese Yuan (CNY, symbol)"
      },
      {
        "name": "Euro Zone",
        "detail": "Currency: Euro (EUR, symbol); used by 20 EU countries"
      },
      {
        "name": "Australia",
        "detail": "Currency: Australian Dollar (AUD, symbol $)"
      },
      {
        "name": "Canada",
        "detail": "Currency: Canadian Dollar (CAD, symbol $)"
      },
      {
        "name": "Russia",
        "detail": "Currency: Russian Ruble (RUB, symbol)"
      },
      {
        "name": "Brazil",
        "detail": "Currency: Brazilian Real (BRL, symbol R$)"
      },
      {
        "name": "Mexico",
        "detail": "Currency: Mexican Peso (MXN, symbol $)"
      },
      {
        "name": "South Korea",
        "detail": "Currency: South Korean Won (KRW, symbol)"
      }
    ],
    "faqs": [
      {
        "q": "What is the currency of India?",
        "a": "The Indian Rupee (INR) is the official currency of India, with symbol Rs or per ISO code."
      },
      {
        "q": "Which countries use the Euro?",
        "a": "20 European Union countries use the Euro: Austria, Belgium, Cyprus, Estonia, Finland, France, Germany, Greece, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Portugal, Slovakia, Slovenia, Spain, and Ireland."
      }
    ]
  },
  {
    "slug": "national-animals-of-countries",
    "title": "National Animals of Countries",
    "category": "World",
    "intro": "Official national animals representing different countries, symbolizing their values and characteristics.",
    "items": [
      {
        "name": "India",
        "detail": "Bengal Tiger: symbol of strength and power"
      },
      {
        "name": "USA",
        "detail": "Bald Eagle: symbol of freedom and courage"
      },
      {
        "name": "United Kingdom",
        "detail": "Lion: symbol of courage and nobility"
      },
      {
        "name": "China",
        "detail": "Giant Panda: symbol of peace and tranquility"
      },
      {
        "name": "Australia",
        "detail": "Red Kangaroo: national marsupial"
      },
      {
        "name": "Russia",
        "detail": "Siberian Brown Bear: symbol of power"
      },
      {
        "name": "Canada",
        "detail": "North American Beaver: national animal"
      },
      {
        "name": "France",
        "detail": "Gallic Rooster: symbol of pride and courage"
      },
      {
        "name": "Japan",
        "detail": "Japanese Macaque: national mammal"
      },
      {
        "name": "Brazil",
        "detail": "Jaguar: symbol of power and strength"
      }
    ],
    "faqs": [
      {
        "q": "What is the national animal of India?",
        "a": "The Bengal Tiger is the national animal of India, representing strength and power."
      },
      {
        "q": "Which animal is the national symbol of USA?",
        "a": "The Bald Eagle is the national bird and symbol of USA, representing freedom."
      }
    ]
  },
  {
    "slug": "indian-classical-music",
    "title": "Indian Classical Music Systems",
    "category": "India",
    "intro": "Two main systems of Indian classical music: Hindustani and Carnatic. Fundamental to Indian musical heritage.",
    "items": [
      {
        "name": "Hindustani Music",
        "detail": "Prevalent in North India; evolved during Mughal era"
      },
      {
        "name": "Carnatic Music",
        "detail": "Prevalent in South India; based on composers' compositions"
      },
      {
        "name": "Raga",
        "detail": "Melodic framework with specific notes and rules; defines mood and time"
      },
      {
        "name": "Tala",
        "detail": "Rhythmic cycle providing metric structure to compositions"
      },
      {
        "name": "Sitar",
        "detail": "Stringed instrument used in Hindustani music"
      },
      {
        "name": "Veena",
        "detail": "Stringed instrument used in Carnatic music"
      },
      {
        "name": "Tabla",
        "detail": "Percussion instrument used in Hindustani music"
      },
      {
        "name": "Mridangam",
        "detail": "Percussion instrument used in Carnatic music"
      },
      {
        "name": "Alap",
        "detail": "Unmetered elaboration of raga, slow introduction"
      },
      {
        "name": "Sarangi",
        "detail": "Bowed stringed instrument used in Hindustani music"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Hindustani and Carnatic music?",
        "a": "Hindustani music from North India emphasizes improvisation; Carnatic music from South India is based on composers' compositions."
      },
      {
        "q": "What is a Raga in Indian classical music?",
        "a": "A Raga is a melodic framework with specific notes, rules, and emotional expression, defining the mood and appropriate time of performance."
      }
    ]
  },
  {
    "slug": "un-and-its-agencies",
    "title": "United Nations and its Agencies",
    "category": "World",
    "intro": "Structure and major agencies of the United Nations established to promote international peace and cooperation.",
    "items": [
      {
        "name": "UN Founded",
        "detail": "24 October 1945; headquartered in New York"
      },
      {
        "name": "Security Council",
        "detail": "Five permanent members: USA, UK, Russia, China, France with veto power"
      },
      {
        "name": "General Assembly",
        "detail": "193 member countries; main deliberative body"
      },
      {
        "name": "UNESCO",
        "detail": "United Nations Educational, Scientific, Cultural Organization"
      },
      {
        "name": "UNICEF",
        "detail": "United Nations International Children's Emergency Fund"
      },
      {
        "name": "WHO",
        "detail": "World Health Organization; established 1948"
      },
      {
        "name": "UNHCR",
        "detail": "UN Refugee Agency; protects refugees worldwide"
      },
      {
        "name": "UNEP",
        "detail": "UN Environment Programme"
      },
      {
        "name": "UNDP",
        "detail": "UN Development Programme"
      },
      {
        "name": "UN Secretary General",
        "detail": "Administrative head; current is Antonio Guterres from Portugal"
      }
    ],
    "faqs": [
      {
        "q": "When was the United Nations founded?",
        "a": "The United Nations was founded on 24 October 1945 with the San Francisco Charter, replacing the League of Nations."
      },
      {
        "q": "How many countries are UN members?",
        "a": "There are 193 UN member states; Palestine and Vatican City have observer status."
      }
    ]
  },
  {
    "slug": "solar-system-facts",
    "title": "Solar System Facts",
    "category": "Science",
    "intro": "Comprehensive information about planets, moons, and celestial bodies orbiting the Sun. Essential astronomy knowledge.",
    "items": [
      {
        "name": "The Sun",
        "detail": "Central star; diameter 1.39 million km; 99.86 percent of solar system mass"
      },
      {
        "name": "Mercury",
        "detail": "Closest to Sun; smallest planet; no moons; surface temperature 430C"
      },
      {
        "name": "Venus",
        "detail": "Hottest planet; thick atmosphere; rotates backward"
      },
      {
        "name": "Earth",
        "detail": "Only known planet with life; one moon; orbits Sun in 365 days"
      },
      {
        "name": "Mars",
        "detail": "Red Planet; two moons: Phobos and Deimos"
      },
      {
        "name": "Jupiter",
        "detail": "Largest planet; 79 moons; Great Red Spot storm"
      },
      {
        "name": "Saturn",
        "detail": "Famous for rings; 82 confirmed moons; lowest density of all planets"
      },
      {
        "name": "Uranus",
        "detail": "Ice giant; rotates on its side; 27 known moons"
      },
      {
        "name": "Neptune",
        "detail": "Farthest planet; strong winds; blue color from methane"
      },
      {
        "name": "Pluto",
        "detail": "Dwarf planet; reclassified 2006; has five known moons"
      }
    ],
    "faqs": [
      {
        "q": "How many planets are in the solar system?",
        "a": "There are eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto is classified as a dwarf planet."
      },
      {
        "q": "Which is the largest planet in the solar system?",
        "a": "Jupiter is the largest planet with a diameter of 139,820 kilometers."
      }
    ]
  },
  {
    "slug": "human-body-facts",
    "title": "Human Body Facts",
    "category": "Science",
    "intro": "Interesting and important facts about human anatomy, physiology, and biological systems.",
    "items": [
      {
        "name": "Bones",
        "detail": "Adult human has 206 bones; babies are born with 270"
      },
      {
        "name": "Muscles",
        "detail": "Human body has 639 muscles; make up 40 percent of body weight"
      },
      {
        "name": "Heart",
        "detail": "Pumps blood; beats approximately 100,000 times daily"
      },
      {
        "name": "Blood",
        "detail": "Adult has about 5-6 liters; red blood cells live 120 days"
      },
      {
        "name": "Lungs",
        "detail": "Two lungs; right lung larger than left; breathe 20,000 times daily"
      },
      {
        "name": "Brain",
        "detail": "100 billion neurons; controls all body functions"
      },
      {
        "name": "Skin",
        "detail": "Largest organ; covers 2 square meters; regenerates every 28 days"
      },
      {
        "name": "Eyes",
        "detail": "Can distinguish 10 million different colors; blink 17 times per minute"
      },
      {
        "name": "Ears",
        "detail": "Can detect 1,000 different pitches; contain 16,000 hair cells"
      },
      {
        "name": "Teeth",
        "detail": "Adult has 32 teeth; enamel is strongest substance in body"
      }
    ],
    "faqs": [
      {
        "q": "How many bones does an adult human have?",
        "a": "An adult human has 206 bones; babies are born with 270 bones that fuse as they grow."
      },
      {
        "q": "How many muscles does the human body have?",
        "a": "The human body has 639 skeletal muscles that make up approximately 40 percent of body weight."
      }
    ]
  },
  {
    "slug": "important-books-and-authors",
    "title": "Important Books and Their Authors",
    "category": "World",
    "intro": "Influential and significant literary works that shaped world literature and thought. Essential for literature GK.",
    "items": [
      {
        "name": "To Kill a Mockingbird",
        "detail": "Harper Lee (1960); American classic on racial injustice"
      },
      {
        "name": "1984",
        "detail": "George Orwell (1949); dystopian novel"
      },
      {
        "name": "Pride and Prejudice",
        "detail": "Jane Austen (1813); romantic novel"
      },
      {
        "name": "The Great Gatsby",
        "detail": "F. Scott Fitzgerald (1925); American literature classic"
      },
      {
        "name": "War and Peace",
        "detail": "Leo Tolstoy (1869); Russian historical novel"
      },
      {
        "name": "The Gita",
        "detail": "Hindu spiritual text in Mahabharata; ancient Indian philosophy"
      },
      {
        "name": "Ramayana",
        "detail": "Valmiki; ancient Indian epic"
      },
      {
        "name": "Jane Eyre",
        "detail": "Charlotte Bronte (1847); Gothic romantic novel"
      },
      {
        "name": "Moby Dick",
        "detail": "Herman Melville (1851); adventure novel"
      },
      {
        "name": "The Odyssey",
        "detail": "Homer; ancient Greek epic poem"
      }
    ],
    "faqs": [
      {
        "q": "Who wrote To Kill a Mockingbird?",
        "a": "Harper Lee wrote To Kill a Mockingbird, published in 1960, which won the Pulitzer Prize in 1961."
      },
      {
        "q": "Which is the oldest Indian epic?",
        "a": "The Ramayana by Valmiki is one of the oldest Indian epics, written in ancient Sanskrit."
      }
    ]
  },
  {
    "slug": "sports-and-number-of-players",
    "title": "Sports and Number of Players",
    "category": "Sports",
    "intro": "Information about major sports worldwide with standard team sizes and player counts.",
    "items": [
      {
        "name": "Cricket",
        "detail": "11 players per team; bat and ball sport popular in India"
      },
      {
        "name": "Football",
        "detail": "11 players per team; most popular sport globally"
      },
      {
        "name": "Basketball",
        "detail": "5 players per team; court sport with basket at each end"
      },
      {
        "name": "Tennis",
        "detail": "1 or 2 players (singles or doubles); racquet sport"
      },
      {
        "name": "Badminton",
        "detail": "1 or 2 players per side; played with shuttlecock"
      },
      {
        "name": "Volleyball",
        "detail": "6 players per team; played over net"
      },
      {
        "name": "Hockey",
        "detail": "11 players per team; field sport with stick and ball"
      },
      {
        "name": "Baseball",
        "detail": "9 players per team; American sport with bat and ball"
      },
      {
        "name": "Rugby",
        "detail": "15 players per team; contact sport similar to football"
      },
      {
        "name": "Kabaddi",
        "detail": "7 players per team; popular in South Asia"
      }
    ],
    "faqs": [
      {
        "q": "How many players are there in a cricket team?",
        "a": "A cricket team has 11 players on the field at a time."
      },
      {
        "q": "Which sport has 5 players per team?",
        "a": "Basketball is played with 5 players per team on the court at a time."
      }
    ]
  },
  {
    "slug": "famous-slogans",
    "title": "Famous Slogans and Quotations",
    "category": "History",
    "intro": "Iconic slogans and famous sayings from historical figures and independence movements. Important for Indian and world history.",
    "items": [
      {
        "name": "Jai Hind",
        "detail": "Glory to India; used during independence struggle"
      },
      {
        "name": "Swaraj",
        "detail": "Self-rule; core principle of Gandhi's independence movement"
      },
      {
        "name": "Satyagraha",
        "detail": "Truth-force; Gandhi's philosophy of non-violent resistance"
      },
      {
        "name": "Vande Mataram",
        "detail": "I bow to the motherland; national song by Bankim Chandra Chatterjee"
      },
      {
        "name": "Jai Bhim",
        "detail": "Glory to B.R. Ambedkar; social justice slogan"
      },
      {
        "name": "Inquilab Zindabad",
        "detail": "Long live the revolution; used by Bhagat Singh"
      },
      {
        "name": "Freedom at Midnight",
        "detail": "Independence achieved at midnight, 15 August 1947"
      },
      {
        "name": "I have a dream",
        "detail": "Martin Luther King Jr. (1963) American civil rights speech"
      },
      {
        "name": "",
        "detail": "Patrick Henry; American Revolutionary slogan"
      },
      {
        "name": "Liberty, Equality, Fraternity",
        "detail": "French Revolution motto"
      }
    ],
    "faqs": [
      {
        "q": "What was Gandhi's philosophy of non-violence called?",
        "a": "Gandhi's philosophy of non-violent resistance was called Satyagraha, meaning truth-force."
      },
      {
        "q": "What does Swaraj mean?",
        "a": "Swaraj means self-rule or self-governance, a core principle of India's independence movement."
      }
    ]
  },
  {
    "slug": "indian-freedom-fighters",
    "title": "Indian Freedom Fighters",
    "category": "History",
    "intro": "Courageous leaders who fought against British rule and secured India's independence. Exemplary for patriotism.",
    "items": [
      {
        "name": "Mohandas Gandhi",
        "detail": "Father of the Nation; led non-violent independence struggle"
      },
      {
        "name": "Jawaharlal Nehru",
        "detail": "First Prime Minister; close associate of Gandhi"
      },
      {
        "name": "Sardar Vallabhbhai Patel",
        "detail": "Iron Man of India; unified princely states"
      },
      {
        "name": "Bhagat Singh",
        "detail": "Revolutionary freedom fighter; executed 1931"
      },
      {
        "name": "Subhas Chandra Bose",
        "detail": "Netaji; led Indian National Army"
      },
      {
        "name": "Lal Bahadur Shastri",
        "detail": "Second Prime Minister; Jai Jawan Jai Kisan slogan"
      },
      {
        "name": "Bal Gangadhar Tilak",
        "detail": "Localmanya Tilak; nationalist leader and freedom fighter"
      },
      {
        "name": "Keshab Chandra Sen",
        "detail": "Social reformer and nationalist"
      },
      {
        "name": "Rammohan Roy",
        "detail": "Father of Indian Renaissance; social reformer"
      },
      {
        "name": "Sarvepalli Radhakrishnan",
        "detail": "Second President; philosopher and educator"
      }
    ],
    "faqs": [
      {
        "q": "Who is called the Father of the Indian Nation?",
        "a": "Mohandas Karamchand Gandhi is called the Father of the Indian Nation for leading India's non-violent independence struggle."
      },
      {
        "q": "When was Bhagat Singh executed?",
        "a": "Bhagat Singh was executed on 23 March 1931 for his revolutionary activities against British rule."
      }
    ]
  },
  {
    "slug": "important-battles-in-history",
    "title": "Important Battles in History",
    "category": "History",
    "intro": "Significant military battles that shaped world history, empires, and nations. Essential for history GK.",
    "items": [
      {
        "name": "Battle of Plassey",
        "detail": "1757; Robert Clive defeated Bengal Nawab; established British rule in India"
      },
      {
        "name": "Battle of Panipat",
        "detail": "1526; Babur defeated Ibrahim Lodi; established Mughal Empire"
      },
      {
        "name": "Battle of Haldighati",
        "detail": "1576; Rana Pratap vs Akbar's army"
      },
      {
        "name": "Battle of Thermopylae",
        "detail": "480 BC; Greeks vs Persians"
      },
      {
        "name": "Battle of Hastings",
        "detail": "1066; Norman Conquest of England"
      },
      {
        "name": "Battle of Marathon",
        "detail": "490 BC; Greeks defeated Persian invasion"
      },
      {
        "name": "Battle of Waterloo",
        "detail": "1815; defeat of Napoleon Bonaparte"
      },
      {
        "name": "World War I",
        "detail": "1914-1918; major global conflict reshaping world"
      },
      {
        "name": "World War II",
        "detail": "1939-1945; costliest war in history"
      },
      {
        "name": "Battle of Kurukshetra",
        "detail": "Ancient battle in Mahabharata epic"
      }
    ],
    "faqs": [
      {
        "q": "When did the Battle of Plassey occur?",
        "a": "The Battle of Plassey occurred on 23 June 1757 between Robert Clive and the Bengali Nawab."
      },
      {
        "q": "Which battle established Mughal rule in India?",
        "a": "The Battle of Panipat in 1526 established the Mughal Empire when Babur defeated Ibrahim Lodi."
      }
    ]
  },
  {
    "slug": "chief-ministers-and-governors",
    "title": "Indian Governors and State Administrators",
    "category": "India",
    "intro": "Information about Governors of Indian States and Administrators of Union Territories. Current and historical administrators.",
    "items": [
      {
        "name": "Governor Role",
        "detail": "Constitutional head of a state; appointed by President for 5-year term"
      },
      {
        "name": "Lieutenant Governor",
        "detail": "Administrator of union territories; appointed by President"
      },
      {
        "name": "Chief Minister Role",
        "detail": "Executive head of state government; elected by state legislature"
      },
      {
        "name": "Administrator Role",
        "detail": "Heads union territory administration; appointed by President"
      },
      {
        "name": "Governor of Maharashtra",
        "detail": "Constitutional position for largest state by population"
      },
      {
        "name": "Governor of Delhi",
        "detail": "Constitutional head; works with elected Chief Minister"
      },
      {
        "name": "Lt. Governor of Ladakh",
        "detail": "Heads administration of Ladakh union territory"
      },
      {
        "name": "Lt. Governor of Andaman",
        "detail": "Heads administration of Andaman & Nicobar Islands"
      },
      {
        "name": "State Election Commission",
        "detail": "Conducts elections in states and union territories"
      },
      {
        "name": "Election Commission of India",
        "detail": "Conducts all elections at national and state levels"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between a Chief Minister and a Governor?",
        "a": "Chief Minister is the elected executive head of a state government. Governor is the constitutional head appointed by the President."
      },
      {
        "q": "For how long is a Governor appointed?",
        "a": "A Governor is appointed for a term of 5 years, though can be reappointed or removed by the President."
      }
    ]
  },
  {
    "slug": "indian-missiles",
    "title": "Indian Missiles and Defense Systems",
    "category": "India",
    "intro": "Indigenous missile systems developed by India for defense capabilities. Examples of Indian scientific advancement.",
    "items": [
      {
        "name": "Agni",
        "detail": "Intercontinental ballistic missile; range over 5,000 km"
      },
      {
        "name": "Brahmos",
        "detail": "Supersonic cruise missile; joint venture with Russia"
      },
      {
        "name": "Akash",
        "detail": "Surface-to-air missile; air defense system"
      },
      {
        "name": "Astra",
        "detail": "Beyond-visual-range air-to-air missile"
      },
      {
        "name": "Prithvi",
        "detail": "Surface-to-surface ballistic missile; range 150-350 km"
      },
      {
        "name": "Igla",
        "detail": "Man-portable air-defense system"
      },
      {
        "name": "Nag",
        "detail": "Anti-tank guided missile"
      },
      {
        "name": "Trishul",
        "detail": "Short-range air defense missile"
      },
      {
        "name": "Tejas",
        "detail": "Light combat aircraft; indigenously developed"
      },
      {
        "name": "INS Arihant",
        "detail": "Nuclear-powered ballistic missile submarine"
      }
    ],
    "faqs": [
      {
        "q": "What is the range of Agni missile?",
        "a": "Agni missile has a range of over 5,000 kilometers, making it India's most advanced intercontinental ballistic missile."
      },
      {
        "q": "Which is the first nuclear submarine of India?",
        "a": "INS Arihant, commissioned in 2016, is India's first indigenous nuclear-powered ballistic missile submarine."
      }
    ]
  },
  {
    "slug": "isro-missions",
    "title": "ISRO Space Missions",
    "category": "Science",
    "intro": "Indian Space Research Organization's significant space missions and achievements. Pride of Indian science and technology.",
    "items": [
      {
        "name": "Chandrayaan-1",
        "detail": "First Indian lunar mission; discovered water molecules on moon"
      },
      {
        "name": "Chandrayaan-2",
        "detail": "Second lunar mission; orbiter, lander, rover; advanced mission"
      },
      {
        "name": "Chandrayaan-3",
        "detail": "Third lunar mission; successful soft landing on moon's south pole"
      },
      {
        "name": "Mangalyaan",
        "detail": "Mars Orbiter Mission; successful Mars mission first try"
      },
      {
        "name": "Aryabhata",
        "detail": "First Indian satellite; launched 1975"
      },
      {
        "name": "Rohini",
        "detail": "First Indian satellite launched by Indian rocket"
      },
      {
        "name": "PSLV",
        "detail": "Polar Satellite Launch Vehicle; reliable launch vehicle"
      },
      {
        "name": "GSLV",
        "detail": "Geosynchronous Satellite Launch Vehicle; heavy-lift vehicle"
      },
      {
        "name": "Aditya L1",
        "detail": "Solar mission to study sun's corona"
      },
      {
        "name": "Gaganyaan",
        "detail": "Human space flight program; first Indian astronaut mission planned"
      }
    ],
    "faqs": [
      {
        "q": "What did Chandrayaan-1 discover on the moon?",
        "a": "Chandrayaan-1 discovered water molecules and ice on the moon's surface using its Moon Impact Probe."
      },
      {
        "q": "Was Mangalyaan successful?",
        "a": "Yes, Mangalyaan (Mars Orbiter Mission) was very successful, making India the fourth nation to reach Mars."
      }
    ]
  },
  {
    "slug": "bharat-ratna-awardees",
    "title": "Bharat Ratna Awardees",
    "category": "India",
    "intro": "Recipients of India's highest civilian honor Bharat Ratna. Exceptional individuals who contributed to nation building.",
    "items": [
      {
        "name": "Dr. Rajendra Prasad",
        "detail": "First President of India; awarded 1962"
      },
      {
        "name": "Dr. Sarvepalli Radhakrishnan",
        "detail": "Second President; philosopher; awarded 1954"
      },
      {
        "name": "Chakravarti Rajagopalachari",
        "detail": "Last Governor-General of India; awarded 1954"
      },
      {
        "name": "Jawaharlal Nehru",
        "detail": "First Prime Minister; awarded 1955"
      },
      {
        "name": "Sardar Vallabhbhai Patel",
        "detail": "Iron Man of India; awarded 1955"
      },
      {
        "name": "Bhagawan Das",
        "detail": "Spiritual leader; awarded 1955"
      },
      {
        "name": "Mohandas Karamchand Gandhi",
        "detail": "Father of Nation; awarded 1955"
      },
      {
        "name": "Mother Teresa",
        "detail": "Social worker; awarded 1980"
      },
      {
        "name": "Lal Bahadur Shastri",
        "detail": "Second Prime Minister; awarded 1966"
      },
      {
        "name": "Maulana Abul Kalam Azad",
        "detail": "Independence leader; awarded 1958"
      }
    ],
    "faqs": [
      {
        "q": "What is Bharat Ratna?",
        "a": "Bharat Ratna is India's highest civilian honor awarded for exceptional service to the nation."
      },
      {
        "q": "Who was the first Bharat Ratna awardee?",
        "a": "Dr. Sarvepalli Radhakrishnan, Dr. Chakravarti Rajagopalachari, and Lal Bahadur Shastri were the first three awardees in 1954."
      }
    ]
  },
  {
    "slug": "important-inventions",
    "title": "Important Inventions",
    "category": "Science",
    "intro": "Explore the major inventions that changed the world throughout history. From everyday objects to groundbreaking technologies, these inventions have shaped human civilization and continue to impact our lives today.",
    "items": [
      {
        "name": "Wheel",
        "detail": "Invented around 3500 BC, the wheel revolutionized transportation and is considered one of the most important inventions of all time, enabling the movement of goods and people."
      },
      {
        "name": "Printing Press",
        "detail": "Invented by Johannes Gutenberg in 1440, the printing press made books and information accessible to common people, leading to the spread of knowledge and ideas."
      },
      {
        "name": "Steam Engine",
        "detail": "Developed by Thomas Newcomcomb and improved by James Watt in the 18th century, the steam engine powered the Industrial Revolution and transformed manufacturing and transportation."
      },
      {
        "name": "Electricity",
        "detail": "Harnessed by Benjamin Franklin, Michael Faraday, and Thomas Edison in the 19th century, electricity became the backbone of modern civilization."
      },
      {
        "name": "Light Bulb",
        "detail": "Invented by Thomas Edison in 1879, the practical light bulb replaced candles and gas lamps, extending productive hours and improving quality of life."
      },
      {
        "name": "Telephone",
        "detail": "Invented by Alexander Graham Bell in 1876, the telephone revolutionized communication, allowing real-time conversation over long distances."
      },
      {
        "name": "Radio",
        "detail": "Developed by Guglielmo Marconi and Nikola Tesla, radio enabled wireless communication and broadcasting of information to mass audiences."
      },
      {
        "name": "Airplane",
        "detail": "Brothers Wilbur and Orville Wright achieved the first powered flight in 1903, fundamentally changing transportation and connecting the world."
      },
      {
        "name": "Television",
        "detail": "Developed in the early 20th century, television became a primary medium for entertainment, news, and education globally."
      },
      {
        "name": "Penicillin",
        "detail": "Discovered by Alexander Fleming in 1928, penicillin was the first antibiotic and revolutionized medicine, saving millions of lives."
      },
      {
        "name": "Computer",
        "detail": "Developed in the mid-20th century starting with ENIAC, computers transformed data processing, communication, and nearly every aspect of modern life."
      },
      {
        "name": "Internet",
        "detail": "Created in the late 20th century, the internet connected the world digitally, enabling instant global communication and access to information."
      },
      {
        "name": "Microscope",
        "detail": "Invented by Zacharias Janssen in the 17th century, the microscope allowed scientists to observe microorganisms and cellular structures."
      },
      {
        "name": "Telescope",
        "detail": "Developed by Hans Lippershey in 1608 and improved by Galileo, the telescope revealed the structure of the universe and transformed astronomy."
      },
      {
        "name": "Photography",
        "detail": "Invented by Louis Daguerre in 1839, photography preserved moments in time and became an important tool for documentation and art."
      },
      {
        "name": "Refrigeration",
        "detail": "Developed in the 19th century, refrigeration technology enabled food preservation, improving nutrition and food distribution globally."
      },
      {
        "name": "Air Conditioning",
        "detail": "Invented by Willis Carrier in 1902, air conditioning improved comfort and enabled industries and commerce in hot climates."
      },
      {
        "name": "Microwave Oven",
        "detail": "Discovered accidentally by Percy Spencer in 1945, the microwave oven revolutionized cooking and food preparation in homes and kitchens."
      },
      {
        "name": "Plastic",
        "detail": "Synthetic plastics were developed in the early 20th century, becoming the most versatile material used across industries and daily life."
      },
      {
        "name": "Solar Panels",
        "detail": "Developed in the 1950s, solar panels convert sunlight into electricity, providing renewable energy solutions for sustainable living."
      }
    ],
    "faqs": [
      {
        "q": "What is the oldest known invention?",
        "a": "The wheel, invented around 3500 BC, is one of the oldest major inventions that revolutionized transportation and enabled civilization to progress."
      },
      {
        "q": "Which invention had the most impact on human civilization?",
        "a": "Several inventions had transformative impacts: the wheel for transportation, printing press for knowledge dissemination, and internet for global connectivity."
      }
    ]
  },
  {
    "slug": "scientific-instruments-and-uses",
    "title": "Scientific Instruments and Their Uses",
    "category": "Science",
    "intro": "Discover the essential instruments used in scientific research and laboratories. These tools enable scientists to measure, observe, and analyze phenomena, driving discoveries and technological advancement.",
    "items": [
      {
        "name": "Microscope",
        "detail": "Optical or electron microscope used to magnify objects to see microscopic structures like cells, bacteria, and tissue details not visible to the naked eye."
      },
      {
        "name": "Telescope",
        "detail": "Instrument that magnifies distant celestial objects, enabling astronomers to observe stars, planets, moons, and galaxies to understand the universe."
      },
      {
        "name": "Spectroscope",
        "detail": "Device that analyzes light wavelengths to identify chemical composition of substances, used in astronomy, chemistry, and physics research."
      },
      {
        "name": "Thermometer",
        "detail": "Instrument for measuring temperature using mercury, alcohol, or digital sensors, essential in medical diagnosis and scientific experiments."
      },
      {
        "name": "Barometer",
        "detail": "Measures atmospheric pressure to predict weather changes, used by meteorologists and in weather forecasting and aviation."
      },
      {
        "name": "Voltmeter",
        "detail": "Electrical instrument that measures electrical potential difference (voltage) between two points in a circuit or electronic device."
      },
      {
        "name": "Ammeter",
        "detail": "Measures electric current flowing through a circuit, essential for electrical work and ensuring safe operation of electrical equipment."
      },
      {
        "name": "Hydrometer",
        "detail": "Measures the specific gravity or density of liquids, used to determine sugar content in beverages and salinity of water solutions."
      },
      {
        "name": "Anemometer",
        "detail": "Measures wind speed using rotating cups or sonic detection, used in meteorology, weather forecasting, and environmental monitoring."
      },
      {
        "name": "Stethoscope",
        "detail": "Medical instrument allowing doctors to listen to internal sounds like heartbeat and breathing to diagnose health conditions."
      },
      {
        "name": "X-ray Machine",
        "detail": "Produces electromagnetic radiation that penetrates body tissues, creating images useful for medical diagnosis of broken bones and internal conditions."
      },
      {
        "name": "Syringe",
        "detail": "Medical instrument for injecting liquids into body or drawing out blood and other body fluids for medical treatment and sample collection."
      },
      {
        "name": "Oscilloscope",
        "detail": "Electronic instrument displaying electrical signals as waveforms on a screen, essential for electronics testing and signal analysis."
      },
      {
        "name": "Potentiometer",
        "detail": "Measures electrical potential or voltage, used in experiments to study electrical properties and calibrate other instruments."
      },
      {
        "name": "Manometer",
        "detail": "Measures pressure differences in liquids and gases using mercury or water columns, important in physics and engineering applications."
      },
      {
        "name": "Chromatography Equipment",
        "detail": "Separates chemical mixtures into individual components based on their properties, crucial for chemical analysis and drug testing."
      },
      {
        "name": "Spectrophotometer",
        "detail": "Measures how much light a sample absorbs, used in chemistry and biology to determine chemical concentrations and analyze materials."
      },
      {
        "name": "pH Meter",
        "detail": "Measures acidity or alkalinity of solutions on a scale of 0-14, essential in chemistry labs, water testing, and environmental monitoring."
      },
      {
        "name": "Galvanometer",
        "detail": "Sensitive instrument detecting and measuring electric current, used in various electrical measurements and as basis for ammeters and voltmeters."
      },
      {
        "name": "Balance Scale",
        "detail": "Precisely measures mass and weight of objects using balance arms, essential in chemistry labs, pharmacies, and scientific experiments."
      }
    ],
    "faqs": [
      {
        "q": "Which instrument is most important in a science laboratory?",
        "a": "The microscope and balance scale are fundamental. Different instruments are crucial for different sciences - thermometer in physics, pH meter in chemistry, stethoscope in medicine."
      },
      {
        "q": "Why is calibration important for scientific instruments?",
        "a": "Calibration ensures instruments give accurate readings. Without proper calibration, scientific measurements are unreliable and experimental results are invalid."
      }
    ]
  },
  {
    "slug": "branches-of-science",
    "title": "Branches of Science",
    "category": "Science",
    "intro": "Explore the diverse branches of science that study different aspects of the natural world. From the smallest atoms to the vastness of space, these disciplines contribute to our understanding of reality.",
    "items": [
      {
        "name": "Physics",
        "detail": "Study of matter, energy, motion, and forces. Covers mechanics, thermodynamics, electricity, magnetism, light, and nuclear physics understanding how the universe works."
      },
      {
        "name": "Chemistry",
        "detail": "Study of substances, their properties, composition, and chemical reactions. Branches include organic chemistry, inorganic chemistry, and physical chemistry."
      },
      {
        "name": "Biology",
        "detail": "Study of living organisms, their structure, function, growth, origin, and evolution. Includes microbiology, botany, zoology, and ecology."
      },
      {
        "name": "Astronomy",
        "detail": "Study of celestial objects including stars, planets, galaxies, and the universe structure. Helps understand cosmic phenomena and space exploration."
      },
      {
        "name": "Geology",
        "detail": "Study of rocks, minerals, Earth's structure, formation, and processes. Includes mineralogy, petrology, and studies of earthquakes and volcanoes."
      },
      {
        "name": "Meteorology",
        "detail": "Study of atmosphere, weather patterns, and climate. Enables weather forecasting and understanding of atmospheric phenomena and climate change."
      },
      {
        "name": "Oceanography",
        "detail": "Study of oceans, marine life, ocean currents, and underwater ecosystems. Important for understanding marine biodiversity and ocean resources."
      },
      {
        "name": "Ecology",
        "detail": "Study of organisms in their environment and interactions between species and ecosystems. Crucial for conservation and environmental management."
      },
      {
        "name": "Genetics",
        "detail": "Study of heredity and genes. Explains how traits pass from parents to offspring and enables genetic engineering and medical advances."
      },
      {
        "name": "Microbiology",
        "detail": "Study of microscopic organisms like bacteria, viruses, and fungi. Important for medicine, food safety, and understanding disease mechanisms."
      },
      {
        "name": "Botany",
        "detail": "Study of plants, their structure, growth, reproduction, and importance. Includes study of plant diseases, agriculture, and plant genetics."
      },
      {
        "name": "Zoology",
        "detail": "Study of animals, their classification, behavior, anatomy, and ecology. Includes entomology studying insects and other specialized animal studies."
      },
      {
        "name": "Pathology",
        "detail": "Study of diseases, their causes, mechanisms, and effects on the body. Essential for medical diagnosis and developing treatments."
      },
      {
        "name": "Biochemistry",
        "detail": "Study of chemical processes in living organisms. Explains how cells function, energy production, and chemical basis of heredity."
      },
      {
        "name": "Anatomy",
        "detail": "Study of structure of organisms, particularly the human body. Includes detailed study of organs, tissues, and their organization and function."
      },
      {
        "name": "Physiology",
        "detail": "Study of how living organisms and their body systems function. Explains mechanisms of life processes and body system interactions."
      },
      {
        "name": "Mathematics",
        "detail": "Study of numbers, quantities, shapes, and patterns. Provides tools and language for expressing scientific ideas and solving problems."
      },
      {
        "name": "Toxicology",
        "detail": "Study of poisons and poisonous substances, their effects on living organisms. Important for safety, medicine, and environmental protection."
      },
      {
        "name": "Paleontology",
        "detail": "Study of fossils and ancient life forms. Reveals history of life on Earth, evolution patterns, and prehistoric environments."
      },
      {
        "name": "Seismology",
        "detail": "Study of earthquakes and seismic waves. Important for understanding Earth's interior and predicting earthquakes for safety."
      }
    ],
    "faqs": [
      {
        "q": "How many main branches are there in science?",
        "a": "Science is broadly divided into three main branches: Physics (matter and energy), Chemistry (substances and reactions), and Biology (living organisms). Each has many sub-branches."
      },
      {
        "q": "What is the relationship between different branches of science?",
        "a": "Different branches are interconnected. For example, biochemistry combines biology and chemistry, and geophysics combines geology and physics."
      }
    ]
  },
  {
    "slug": "animal-young-ones-and-homes",
    "title": "Animal Young Ones and Their Homes",
    "category": "Biology",
    "intro": "Learn about the diverse names given to young animals and the unique habitats or homes where different species live. From jungles to oceans, animals have adapted to live in various environments.",
    "items": [
      {
        "name": "Lion - Cub lives in Pride",
        "detail": "Male lions are called lions, females are lionesses. Young lions are called cubs and live together in a family group called a pride in African savannas."
      },
      {
        "name": "Tiger - Cub lives in Lair",
        "detail": "Young tigers are called cubs. Tigers are solitary animals and each tiger has its own territory or lair in forests, typically found in Asia."
      },
      {
        "name": "Elephant - Calf lives in Herd",
        "detail": "Baby elephants are called calves. They live in family groups called herds led by the oldest female in African and Asian forests and grasslands."
      },
      {
        "name": "Deer - Fawn lives in Herd",
        "detail": "Young deer are called fawns or calves. Deer live in herds in forests, grasslands, and woodlands across continents for protection and food."
      },
      {
        "name": "Bear - Cub lives in Den",
        "detail": "Young bears are called cubs. Bears are solitary and live in dens which are caves or holes, found in forests, mountains, and some tundra regions."
      },
      {
        "name": "Eagle - Eaglet lives in Nest",
        "detail": "Young eagles are called eaglets or chicks. Eagles build large nests called eyries on high cliffs or tall trees for protection and rearing young."
      },
      {
        "name": "Horse - Foal lives in Stable",
        "detail": "Young horses are called foals or colts if male and fillies if female. Horses live in pastures and stables domesticated by humans worldwide."
      },
      {
        "name": "Cow - Calf lives in Barn",
        "detail": "Young cattle are called calves. Domesticated cows live in barns and pastures. They are essential livestock for milk, meat, and agricultural work."
      },
      {
        "name": "Sheep - Lamb lives in Pen",
        "detail": "Young sheep are called lambs. Sheep live in pens, paddocks, and pastures for grazing. Important for wool production and meat globally."
      },
      {
        "name": "Dog - Puppy lives in Kennel",
        "detail": "Young dogs are called puppies. Dogs are domesticated animals living in homes or kennels, serving as companions and working animals."
      },
      {
        "name": "Cat - Kitten lives in House",
        "detail": "Young cats are called kittens. Cats are domesticated animals living in homes as pets and companions with humans worldwide."
      },
      {
        "name": "Duck - Duckling lives in Pond",
        "detail": "Young ducks are called ducklings. Ducks are waterfowl living in ponds, lakes, rivers, and wetlands, important for food and pest control."
      },
      {
        "name": "Frog - Tadpole lives in Pond",
        "detail": "Young frogs are called tadpoles or polliwogs in aquatic stage. Frogs live in ponds, lakes, and wetlands, undergoing metamorphosis to adult form."
      },
      {
        "name": "Spider - Spiderling lives in Web",
        "detail": "Young spiders are called spiderlings. Spiders build webs in various habitats from homes to forests to catch insects for food."
      },
      {
        "name": "Butterfly - Caterpillar lives in Garden",
        "detail": "Young butterflies are called caterpillars in larval stage. They live in gardens, forests, and meadows feeding on plants."
      },
      {
        "name": "Fish - Fry lives in Water",
        "detail": "Young fish are called fry or fingerlings. Fish live in water habitats - oceans, rivers, lakes, and ponds in various ecosystems."
      },
      {
        "name": "Whale - Calf lives in Ocean",
        "detail": "Young whales are called calves. Whales live in oceans at various depths, some migrate long distances for feeding and breeding."
      },
      {
        "name": "Gorilla - Infant lives in Forest",
        "detail": "Young gorillas are called infants or babies. Gorillas live in rainforests in family groups called troops led by dominant silverback males."
      },
      {
        "name": "Kangaroo - Joey lives in Pouch",
        "detail": "Young kangaroos are called joeys and develop in mothers pouch. Kangaroos live in grasslands and woodlands of Australia."
      },
      {
        "name": "Penguin - Chick lives in Colony",
        "detail": "Young penguins are called chicks. Penguins live in colonies in cold regions, primarily Antarctica, hunting fish in ocean waters."
      }
    ],
    "faqs": [
      {
        "q": "Why do different animals have different names for their young?",
        "a": "Different animal groups developed specific terms based on their characteristics. Young large mammals are often called calves or cubs, while birds are chicks, and aquatic animals have different names like tadpoles for frogs."
      },
      {
        "q": "What determines where animals build their homes?",
        "a": "Animals choose habitats based on availability of food, water, shelter, climate suitability, and safety from predators. Their physical adaptations suit their environments."
      }
    ]
  },
  {
    "slug": "largest-smallest-in-india",
    "title": "Largest and Smallest in India",
    "category": "Geography",
    "intro": "Explore the record-breaking geographical features, animals, and landmarks of India. From the mightiest rivers to the tiniest creatures, India is a land of superlatives.",
    "items": [
      {
        "name": "Largest River",
        "detail": "Ganges River is the longest river in India at 2,525 km. It originates from Himalayas and flows through northern India, considered sacred in Hinduism."
      },
      {
        "name": "Largest Lake",
        "detail": "Sambhar Lake in Rajasthan is the largest saltwater lake in India. It is important for salt production and supports diverse bird species."
      },
      {
        "name": "Largest State by Area",
        "detail": "Rajasthan is the largest state in India by area at 342,239 sq km. Known for deserts, palaces, and rich cultural heritage."
      },
      {
        "name": "Largest City by Population",
        "detail": "Mumbai is the largest and most populous city in India. Located on the western coast, it is the financial capital and major port city."
      },
      {
        "name": "Smallest State by Area",
        "detail": "Goa is the smallest state in India at 3,702 sq km. Known for beaches, Portuguese architecture, and tourism."
      },
      {
        "name": "Smallest State by Population",
        "detail": "Mizoram is the smallest state by population with approximately 1 million people, located in northeast India."
      },
      {
        "name": "Highest Mountain",
        "detail": "Kanchenjunga is the highest mountain peak in India at 8,586 meters, located in Sikkim bordering Nepal."
      },
      {
        "name": "Largest Dam",
        "detail": "Bhakra Dam is one of the largest dams in India, located on Sutlej River in Himachal Pradesh for irrigation and power generation."
      },
      {
        "name": "Largest Desert",
        "detail": "Thar Desert is the largest desert in India, located primarily in Rajasthan. It covers about 200,000 sq km and supports unique adapted life."
      },
      {
        "name": "Largest Forest",
        "detail": "Amazon of India is the Western Ghats forest region spanning across southern India. It has rich biodiversity and numerous endemic species."
      },
      {
        "name": "Largest Temple",
        "detail": "Sri Ranganathaswamy Temple in Tamil Nadu is one of the largest temples in India by area with intricate architecture and religious significance."
      },
      {
        "name": "Largest Airport",
        "detail": "Indira Gandhi International Airport in Delhi is the largest airport in India by passenger traffic, a major international hub."
      },
      {
        "name": "Largest Animal",
        "detail": "Asian Elephant is the largest land animal found in India, can weigh up to 5 tons and reach 3 meters height."
      },
      {
        "name": "Largest Bird",
        "detail": "Indian Peafowl (Peacock) is large, but Great Bustard and other large birds are found in India with impressive wingspans."
      },
      {
        "name": "Largest Reptile",
        "detail": "Saltwater Crocodile is the largest reptile in India, found in coastal areas and rivers, can exceed 5 meters length."
      },
      {
        "name": "Largest Fish",
        "detail": "Whale Shark is occasionally found in Indian waters off the coast. Mahi-Mahi and other large fish are caught commercially."
      },
      {
        "name": "Smallest State",
        "detail": "Goa is the smallest state, followed by Tripura and other northeastern states in terms of area."
      },
      {
        "name": "Smallest Mammal",
        "detail": "Kitti's Hog-nosed Bat is one of the smallest mammals in the world, found in Thailand but represents smallest mammal category globally."
      },
      {
        "name": "Lowest Point",
        "detail": "Kanyakumari is the southernmost point of Indian mainland at the southern tip of Tamil Nadu, where three seas meet."
      },
      {
        "name": "Highest Waterfall",
        "detail": "Jog Falls in Karnataka is the highest waterfall in India at 253 meters, formed where Sharavathi River drops dramatically."
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest and smallest state in India?",
        "a": "Rajasthan is the largest state by area (342,239 sq km) and Goa is the smallest state by area (3,702 sq km)."
      },
      {
        "q": "What is the longest river in India?",
        "a": "The Ganges River is the longest river in India at 2,525 km, flowing from the Himalayas through northern India to Bangladesh."
      }
    ]
  },
  {
    "slug": "indian-dances-by-state",
    "title": "Indian Dances by State",
    "category": "History",
    "intro": "Discover the classical and folk dances that are unique to different Indian states. These art forms reflect regional culture, history, and traditions passed down through generations.",
    "items": [
      {
        "name": "Bharatanatyam - Tamil Nadu",
        "detail": "Ancient classical dance originating from Tamil Nadu temples. Performed predominantly by women with intricate hand gestures, facial expressions, and rhythmic footwork."
      },
      {
        "name": "Kathak - North India",
        "detail": "Classical dance form from Uttar Pradesh and North India. Characterized by rapid footwork, spinning movements, and storytelling through postures and movements."
      },
      {
        "name": "Kathakali - Kerala",
        "detail": "Elaborate classical dance-drama from Kerala with colorful costumes, heavy makeup, and exaggerated facial expressions telling stories from Hindu epics."
      },
      {
        "name": "Kuchipudi - Andhra Pradesh",
        "detail": "Classical dance form from Andhra Pradesh involving graceful movements and storytelling. Traditionally performed by men but now performed by all genders."
      },
      {
        "name": "Odissi - Odisha",
        "detail": "Ancient classical dance from Odisha with sinuous movements, lyrical quality, and connections to Lord Jagannath temple traditions."
      },
      {
        "name": "Manipuri - Manipur",
        "detail": "Graceful classical dance from Manipur featuring soft, fluid movements, graceful hand gestures, and costumes reflecting the region's culture."
      },
      {
        "name": "Mohiniyattam - Kerala",
        "detail": "Solo classical dance form for women from Kerala, known for gentle movements, swaying hips, and lyrical expression conveying romantic and devotional themes."
      },
      {
        "name": "Bhangra - Punjab",
        "detail": "Energetic folk dance from Punjab performed with vigorous movements and drum beats. Celebrates harvest season and is popular in weddings and celebrations."
      },
      {
        "name": "Gidda - Punjab",
        "detail": "Traditional folk dance performed by Punjabi women in groups, characterized by hand clapping, spinning, and singing accompanied by clapping and drum music."
      },
      {
        "name": "Garba - Gujarat",
        "detail": "Circular folk dance from Gujarat performed around a lamp or central object. Popular during Navratri festival with colorful costumes and rhythmic clapping."
      },
      {
        "name": "Dandiya - Gujarat",
        "detail": "Folk dance from Gujarat using wooden sticks (dandiya) creating rhythmic sounds. Performed in pairs and groups, especially during Navratri celebrations."
      },
      {
        "name": "Lavani - Maharashtra",
        "detail": "Sensuous folk dance from Maharashtra performed to rhythmic music by women. Involves circular movements and storytelling of love and valor."
      },
      {
        "name": "Tamasha - Maharashtra",
        "detail": "Traditional folk performance combining dance, music, and drama from Maharashtra. Performed at festivals and celebrations with vibrant costumes and entertainment."
      },
      {
        "name": "Ghoomar - Rajasthan",
        "detail": "Folk dance from Rajasthan performed by women in long skirts doing twirling movements. Traditional during celebrations and festivals in the region."
      },
      {
        "name": "Chhau - Jharkhand",
        "detail": "Masked dance form from Jharkhand and Odisha combining acrobatics, martial arts, and storytelling. Performed traditionally by men wearing elaborate masks."
      },
      {
        "name": "Bihu - Assam",
        "detail": "Dynamic folk dance from Assam celebrating the Bihu harvest festival. Performed with fast movements, rhythmic music, and colorful traditional costumes."
      },
      {
        "name": "Sattriya - Assam",
        "detail": "Classical dance form from Assam originating in Sattras monasteries. Combines vigorous movements with graceful expressions and storytelling."
      },
      {
        "name": "Yak Dance - Himachal Pradesh",
        "detail": "Folk dance from Himalayas mimicking yak movements with traditional music. Reflects the mountain lifestyle and agricultural traditions of the region."
      },
      {
        "name": "Kathputli - Rajasthan",
        "detail": "Traditional puppet dance form from Rajasthan where puppets are manipulated with strings. Tells stories through entertaining performances for audiences."
      },
      {
        "name": "Gumboot Dance - South Africa origin, popular in India",
        "detail": "Contemporary dance form combining percussion sounds from slapping rubber boots with rhythmic movements, gaining popularity in urban India."
      }
    ],
    "faqs": [
      {
        "q": "What are the main classical dances of India?",
        "a": "The eight major classical dances are Bharatanatyam, Kathak, Kathakali, Kuchipudi, Odissi, Manipuri, Mohiniyattam, and Sattriya, each from different regions with unique characteristics."
      },
      {
        "q": "What is the difference between classical and folk dances?",
        "a": "Classical dances have strict rules, formal training, and are performed in theaters. Folk dances are informal, passed through generations, and performed during festivals and celebrations."
      }
    ]
  },
  {
    "slug": "famous-temples-of-india",
    "title": "Famous Temples of India",
    "category": "History",
    "intro": "Visit the most revered and architecturally magnificent temples across India. These sacred sites are centers of spiritual devotion, cultural heritage, and architectural excellence.",
    "items": [
      {
        "name": "Varanasi Temple (Kashi Vishwanath)",
        "detail": "Ancient temple in Varanasi, Uttar Pradesh dedicated to Lord Shiva. One of the most sacred Hindu temples where devotees take holy dips in Ganges River."
      },
      {
        "name": "Taj Mahal - Adjacent Temple",
        "detail": "Agra, Uttar Pradesh holds the magnificent Taj Mahal. Built as a mausoleum, it reflects Islamic architecture and is a UNESCO World Heritage Site."
      },
      {
        "name": "Tirupati Venkateswara Temple",
        "detail": "Andhra Pradesh temple dedicated to Lord Venkateswara. One of the richest temples in India with millions of pilgrims visiting annually."
      },
      {
        "name": "Meenakshi Temple",
        "detail": "Madurai, Tamil Nadu temple dedicated to Goddess Meenakshi with stunning Dravidian architecture and intricate sculptures on towers (gopurams)."
      },
      {
        "name": "Jagannath Temple",
        "detail": "Odisha temple dedicated to Lord Jagannath. Famous for Ratha Yatra festival and unique architectural style with intricate stone carvings."
      },
      {
        "name": "Khajuraho Temples",
        "detail": "Madhya Pradesh temples known for erotic sculptures and intricate architectural details. UNESCO World Heritage Site showcasing medieval Indian architecture."
      },
      {
        "name": "Konark Sun Temple",
        "detail": "Odisha temple shaped like a chariot dedicated to Sun God. Renowned for intricate stone carvings and architectural brilliance representing Hindu temple design."
      },
      {
        "name": "Sri Ranganathaswamy Temple",
        "detail": "Tamil Nadu temple with vast area housing the deity Ranganatha. One of the largest temples in India with multiple concentric enclosures."
      },
      {
        "name": "Kailash Temple",
        "detail": "Aurangabad, Maharashtra rock-cut temple carved from single rock representing Mount Kailash. Exemplifies Ellora caves architectural marvels."
      },
      {
        "name": "Brihadeeswarar Temple",
        "detail": "Tamil Nadu temple with massive granite tower (gopuram) and impressive Chola architecture. Known as the Big Temple for its grand scale."
      },
      {
        "name": "Somnath Temple",
        "detail": "Gujarat temple dedicated to Lord Shiva with historical significance. One of the twelve Jyotirlingas and architecturally magnificent."
      },
      {
        "name": "Dwarka Temple",
        "detail": "Gujarat temple dedicated to Lord Krishna in ancient city of Dwarka. One of the four sacred Char Dhams in Hindu pilgrimage circuit."
      },
      {
        "name": "Badrinath Temple",
        "detail": "Uttarakhand temple in Himalayas dedicated to Lord Vishnu. One of the four Char Dhams and sacred pilgrimage destination for devotees."
      },
      {
        "name": "Kedarnath Temple",
        "detail": "Uttarakhand temple in high Himalayas dedicated to Lord Shiva. One of the Char Dhams with breathtaking mountain setting."
      },
      {
        "name": "Rameswaram Temple",
        "detail": "Tamil Nadu temple dedicated to Lord Shiva with longest temple corridor in world. Important Chardham pilgrimage destination."
      },
      {
        "name": "Dwarakadhish Temple",
        "detail": "Gujarat temple with striking white marble architecture dedicated to Lord Krishna in Dwarka pilgrimage city."
      },
      {
        "name": "Jyotirlingas Temples",
        "detail": "Network of twelve sacred Shiva temples across India representing manifestation of Lord Shiva. Important pilgrimage circuit for devotees."
      },
      {
        "name": "Amarnath Cave Temple",
        "detail": "Kashmir temple housing natural ice lingam of Lord Shiva. Sacred pilgrimage destination with challenging trek through mountains."
      },
      {
        "name": "Sabarimala Temple",
        "detail": "Kerala temple dedicated to Lord Ayyappa with unique customs and traditions. Major pilgrimage site attracting millions of devotees annually."
      },
      {
        "name": "Manakamana Temple",
        "detail": "Kathmandu (Nepal border nearby) temple dedicated to Goddess Bhagwati. Accessible by cable car with scenic mountain views."
      }
    ],
    "faqs": [
      {
        "q": "What are the Char Dhams?",
        "a": "Char Dhams are four sacred pilgrimage destinations: Badrinath, Kedarnath, Dwarka, and Rameswaram. Visiting all four is considered highly auspicious in Hinduism."
      },
      {
        "q": "What are the Jyotirlingas?",
        "a": "Jyotirlingas are twelve sacred temples dedicated to Lord Shiva spread across India. Each represents a manifestation of infinite Shiva."
      }
    ]
  },
  {
    "slug": "indian-rivers-and-origin",
    "title": "Indian Rivers and Their Origins",
    "category": "Geography",
    "intro": "Explore Indias major rivers and their sources. These life-giving waters have shaped Indian civilization, supported agriculture, and hold deep cultural and spiritual significance.",
    "items": [
      {
        "name": "Ganges River - Himalayas",
        "detail": "Origins from Bhagirathi glacier in Himalayas at Gaumukh. Flows 2,525 km eastward through northern India, sacred in Hinduism, drains to Bay of Bengal."
      },
      {
        "name": "Brahmaputra River - Tibet Plateau",
        "detail": "Originates from Kailash Range in Tibetan Plateau. Flows through Assam and Bangladesh, one of the largest rivers by discharge volume."
      },
      {
        "name": "Yamuna River - Himalayas",
        "detail": "Originates from Yamunotri glacier in Himalayas. Major tributary of Ganges, flows through northern plains and joins Ganges at Prayagraj."
      },
      {
        "name": "Sutlej River - Tibet",
        "detail": "Originates from Rakshas Lake in Tibet. Flows through Himalayas into Punjab, important for irrigation and hydropower generation."
      },
      {
        "name": "Beas River - Himalayas",
        "detail": "Originates from Beas Kund in Himalayas near Rohtang Pass. Flows through Punjab providing water for irrigation and power generation."
      },
      {
        "name": "Ravi River - Himalayas",
        "detail": "Originates from Kailash Range in Himalayas. Flows through Punjab and Pakistan, forms a major tributary of Sutlej River."
      },
      {
        "name": "Chenab River - Himalayas",
        "detail": "Originates from Baralacha La pass in Himalayas. Flows through Himachal Pradesh providing water for irrigation and hydroelectric projects."
      },
      {
        "name": "Indus River - Tibetan Plateau",
        "detail": "Originates from Singi La mountains in Tibet. Flows northwest through Ladakh, Kashmir, and Pakistan, one of the largest rivers."
      },
      {
        "name": "Narmada River - Madhya Pradesh",
        "detail": "Originates from Amarkantak plateau in Madhya Pradesh. Flows west 1,312 km to Arabian Sea, second longest river flowing westward in India."
      },
      {
        "name": "Tapti River - Madhya Pradesh",
        "detail": "Originates from Betul district hills in Madhya Pradesh. Flows westward to Arabian Sea, important river for central and western India."
      },
      {
        "name": "Godavari River - Western Ghats",
        "detail": "Originates from Tryambakeshwar in Western Ghats in Maharashtra. Flows eastward 1,465 km to Bay of Bengal, Dakshin Ganga."
      },
      {
        "name": "Krishna River - Western Ghats",
        "detail": "Originates near Mahabaleshwar in Western Ghats of Maharashtra. Flows southeast 1,400 km to Bay of Bengal, important southern river."
      },
      {
        "name": "Kaveri River - Western Ghats",
        "detail": "Originates in Coorg district of Karnataka in Western Ghats. Flows southeastward 800 km to Bay of Bengal, important for South Indian agriculture."
      },
      {
        "name": "Pennar River - Eastern Ghats",
        "detail": "Originates from Nandi Hills in Eastern Ghats. Flows southeast joining Bay of Bengal, important river for Andhra Pradesh."
      },
      {
        "name": "Mahanadi River - Chhattisgarh",
        "detail": "Originates from Dhamtari district in Chhattisgarh. Flows eastward to Bay of Bengal, important river for eastern India."
      },
      {
        "name": "Damodar River - Jharkhand",
        "detail": "Originates from Palamu district hills in Jharkhand. Flows into Hooghly River, important for eastern region industries."
      },
      {
        "name": "Ganga (Ganges) Tributaries",
        "detail": "Major tributaries include Yamuna, Ghagra, Gandak, Kosi contributing to Ganges basin, forming world's largest delta with Bangladesh."
      },
      {
        "name": "Alaknanda River - Himalayas",
        "detail": "Originates from Satopanth glacier in Himalayas. Forms Ganges River when combined with Bhagirathi at Devprayag."
      },
      {
        "name": "Teesta River - Himalayan",
        "detail": "Originates from Kangmi glacier in Himalayas. Flows through Sikkim and West Bengal to Brahmaputra, important hydropower source."
      },
      {
        "name": "Mekong River Connection",
        "detail": "While originating in Tibet, the Mekong flows through Southeast Asia. Related to Asian geography as it originates in Tibetan Plateau."
      }
    ],
    "faqs": [
      {
        "q": "Which is the longest river in India?",
        "a": "The Ganges River is the longest river in India at 2,525 km, originating from Himalayas and flowing to Bay of Bengal."
      },
      {
        "q": "How many major rivers are there in India?",
        "a": "There are many rivers, but major rivers include Ganges, Brahmaputra, Indus, Narmada, Godavari, Krishna, and Kaveri among others."
      }
    ]
  },
  {
    "slug": "mountains-and-ranges-of-india",
    "title": "Mountains and Ranges of India",
    "category": "Geography",
    "intro": "Discover Indias magnificent mountain ranges and peaks. From the towering Himalayas to the ancient Western Ghats, these mountains are central to Indias geography and culture.",
    "items": [
      {
        "name": "Himalayas",
        "detail": "Worlds largest mountain range spanning 2,400 km across northern India. Contains highest peaks including Kanchenjunga, vital for climate and water resources."
      },
      {
        "name": "Kanchenjunga Peak",
        "detail": "Highest mountain peak in India at 8,586 meters located in Sikkim. Third highest peak in the world, border with Nepal."
      },
      {
        "name": "Mount Everest Area",
        "detail": "Worlds highest peak at 8,849 meters lies on India-Nepal border (Makalu region). Part of Mahalangur Himalayan range."
      },
      {
        "name": "Western Ghats",
        "detail": "Mountain range running 1,600 km along western coast from Gujarat to Tamil Nadu. UNESCO World Heritage Site with rich biodiversity."
      },
      {
        "name": "Eastern Ghats",
        "detail": "Mountain range extending along eastern coast of India. Less continuous than Western Ghats, important for flora and fauna."
      },
      {
        "name": "Vindhya Range",
        "detail": "Mountain range running east-west across central India dividing Deccan from northern plains. Historically important cultural boundary."
      },
      {
        "name": "Satpura Range",
        "detail": "Mountain range running parallel to Vindhyas in central India between Narmada and Tapti rivers. Rich forest and mineral resources."
      },
      {
        "name": "Aravalli Range",
        "detail": "Worlds oldest mountain range extending from Gujarat through Rajasthan to Haryana. Important for water resources in arid regions."
      },
      {
        "name": "Nilgiri Hills",
        "detail": "Mountain range in southern India where Western and Eastern Ghats meet. Known for tea gardens and temperate climate."
      },
      {
        "name": "Cardamom Hills",
        "detail": "Mountain range in southern India famous for cardamom spice cultivation. Part of Western Ghats, biodiversity hotspot."
      },
      {
        "name": "Shivalik Range",
        "detail": "Outer range of Himalayas from Punjab to Assam. Lower altitude than main Himalayas, densely forested."
      },
      {
        "name": "Dhaulagiri Mountain",
        "detail": "Major peak in Himalayas at 8,167 meters in Nepal near India border. Sixth highest mountain in world."
      },
      {
        "name": "Manaslu Mountain",
        "detail": "Himalayan peak at 8,163 meters, eighth highest in world, on Nepal-India border region."
      },
      {
        "name": "Nanda Devi Mountain",
        "detail": "Second highest peak in Indian territory at 7,816 meters in Uttarakhand. Popular trekking destination."
      },
      {
        "name": "Chadar Trekking Region",
        "detail": "High altitude mountain area in Ladakh with frozen Zanskar River. Extreme trekking destination in Himalayas."
      },
      {
        "name": "Pir Panjal Range",
        "detail": "Mountain range in Kashmir and Himachal Pradesh with important passes for trade and communication."
      },
      {
        "name": "Great Himalayas",
        "detail": "Inner range of Himalayas with highest peaks and snow-covered summits, source of major Indian rivers."
      },
      {
        "name": "Deccan Plateau",
        "detail": "Large plateau in southern India bounded by Western and Eastern Ghats, important geological formation with diverse landscape."
      },
      {
        "name": "Khasi Hills",
        "detail": "Mountain range in Meghalaya in northeast India, receives highest rainfall, covered with dense forests."
      },
      {
        "name": "Garo Hills",
        "detail": "Mountain range in Meghalaya parallel to Khasi Hills, equally forested and receiving heavy monsoon rains."
      }
    ],
    "faqs": [
      {
        "q": "What is the highest mountain peak in India?",
        "a": "Kanchenjunga at 8,586 meters in Sikkim is the highest mountain peak entirely within India."
      },
      {
        "q": "Which are the major mountain ranges in India?",
        "a": "Major ranges include Himalayas, Western Ghats, Eastern Ghats, Vindhya, Satpura, and Aravalli ranges."
      }
    ]
  },
  {
    "slug": "wonders-of-the-world",
    "title": "Wonders of the World",
    "category": "World",
    "intro": "Explore the seven wonders of the modern world and other remarkable landmarks. These architectural marvels represent human ingenuity, cultural heritage, and artistic achievement.",
    "items": [
      {
        "name": "Great Wall of China",
        "detail": "Ancient defensive wall stretching 21,196 km across northern China. Built over centuries to protect against invasions, UNESCO World Heritage Site."
      },
      {
        "name": "Christ the Redeemer - Brazil",
        "detail": "Colossal statue of Jesus Christ standing 30 meters tall atop Corcovado mountain in Rio de Janeiro. Iconic symbol of Brazil."
      },
      {
        "name": "Statue of Liberty - USA",
        "detail": "Statue in New York harbor representing freedom and democracy. Gift from France, UNESCO World Heritage Site, symbol of American values."
      },
      {
        "name": "Colosseum - Italy",
        "detail": "Ancient Roman amphitheater in Rome built in 80 AD. Architectural marvel showcasing Roman engineering prowess and entertainment."
      },
      {
        "name": "Taj Mahal - India",
        "detail": "Magnificent mausoleum in Agra built by Mughal emperor Shah Jahan. Symbol of eternal love, UNESCO World Heritage Site, architectural masterpiece."
      },
      {
        "name": "Machu Picchu - Peru",
        "detail": "Ancient Incan city perched high in Andes mountains. Archaeological wonder showcasing Incan engineering and civilization."
      },
      {
        "name": "Chichen Itza - Mexico",
        "detail": "Ancient Mayan archaeological site featuring El Castillo pyramid. Remarkable example of pre-Columbian architecture and astronomy."
      },
      {
        "name": "Great Pyramid of Giza - Egypt",
        "detail": "Oldest and only surviving ancient wonder built 4,500 years ago. Pharaoh Khufs monument showcasing Egyptian engineering genius."
      },
      {
        "name": "Hanging Gardens of Babylon - Iraq",
        "detail": "Legendary ancient gardens of King Nebuchadnezzar. Ancient wonder, though existence remains archaeologically unconfirmed."
      },
      {
        "name": "Lighthouse of Alexandria - Egypt",
        "detail": "Ancient lighthouse built on Pharos island guiding ships. Ancient wonder towering 350 feet, destroyed by earthquakes."
      },
      {
        "name": "Mausoleum at Halicarnassus - Turkey",
        "detail": "Tomb of Mausolus, Persian satrap, built in 4th century BC. Ancient wonder giving origin to word mausoleum."
      },
      {
        "name": "Temple of Zeus at Olympia - Greece",
        "detail": "Ancient Greek temple containing massive statue of Zeus. Ancient wonder showcasing Greek architectural and sculptural excellence."
      },
      {
        "name": "Colossus of Rhodes - Greece",
        "detail": "Colossal statue of Greek sun god Helios standing over 30 meters. Ancient wonder destroyed by earthquake around 226 BC."
      },
      {
        "name": "Angkor Wat - Cambodia",
        "detail": "Largest religious monument in world, Khmer temple complex in Angkor. Remarkable stone architecture representing Hindu-Buddhist art."
      },
      {
        "name": "Petra - Jordan",
        "detail": "Nabataean city carved into red sandstone cliffs. UNESCO World Heritage Site showcasing ancient engineering and artistry."
      },
      {
        "name": "Neuschwanstein Castle - Germany",
        "detail": "Romantic 19th century castle inspired by fairy tales. Architectural marvel set in Bavarian Alps, popular tourist destination."
      },
      {
        "name": "Statue of David - Italy",
        "detail": "Renaissance sculpture created by Michelangelo in Florence. Masterpiece of human artistic expression and anatomical accuracy."
      },
      {
        "name": "Sagrada Familia - Spain",
        "detail": "Basilica in Barcelona designed by Antoni Gaudí. Unfinished architectural masterpiece with unique modernist style, UNESCO site."
      },
      {
        "name": "Eiffel Tower - France",
        "detail": "Iron lattice tower in Paris built for 1889 exposition. Iconic symbol of France and one of most visited monuments worldwide."
      },
      {
        "name": "Leaning Tower of Pisa - Italy",
        "detail": "Freestanding bell tower in Pisa with famous unintended lean. Romanesque architecture, symbol of architectural charm and human perseverance."
      }
    ],
    "faqs": [
      {
        "q": "How many wonders of the world are there?",
        "a": "There are seven new wonders of the world selected in 2007, plus seven ancient wonders. The list has been revised over time."
      },
      {
        "q": "Which wonder is located in India?",
        "a": "Taj Mahal in Agra, India is one of the Seven Wonders of the Modern World, built by Mughal emperor Shah Jahan."
      }
    ]
  },
  {
    "slug": "books-and-authors",
    "title": "Famous Books and Authors",
    "category": "History",
    "intro": "Discover influential literature and celebrated authors who have shaped world culture. From epic classics to modern bestsellers, these works have inspired generations of readers.",
    "items": [
      {
        "name": "Mahabharata - Vyasa",
        "detail": "Ancient Indian epic, one of the longest poems ever written. Contains Bhagavad Gita and stories of great dynasties, fundamental to Hindu culture."
      },
      {
        "name": "Ramayana - Valmiki",
        "detail": "Ancient Sanskrit epic narrating life of Rama. Central to Hindu philosophy and culture, 24,000 verses recounting heroic journey."
      },
      {
        "name": "Pride and Prejudice - Jane Austen",
        "detail": "Classic novel published in 1813 exploring love and social class. Considered one of finest English novels ever written."
      },
      {
        "name": "To Kill a Mockingbird - Harper Lee",
        "detail": "American novel addressing racism and moral growth. Published in 1960, won Pulitzer Prize, powerful commentary on injustice."
      },
      {
        "name": "1984 - George Orwell",
        "detail": "Dystopian novel depicting totalitarian future. Warning against government control, explores themes of freedom and individuality."
      },
      {
        "name": "Great Gatsby - F. Scott Fitzgerald",
        "detail": "Novel set in Jazz Age America exploring wealth and love. Masterpiece of American literature reflecting era and human desires."
      },
      {
        "name": "Jane Eyre - Charlotte Bronte",
        "detail": "Gothic novel with strong female protagonist. Explores themes of independence, love, and women's position in society."
      },
      {
        "name": "Wuthering Heights - Emily Bronte",
        "detail": "Dark romantic novel set on Yorkshire moors. Complex characters and intense emotions, masterpiece of gothic literature."
      },
      {
        "name": "Les Miserables - Victor Hugo",
        "detail": "Epic historical novel set during French Revolution. Story of redemption, justice, and human compassion through character Jean Valjean."
      },
      {
        "name": "War and Peace - Leo Tolstoy",
        "detail": "Russian novel depicting Napoleonic wars and personal relationships. Considered one of greatest novels exploring history and humanity."
      },
      {
        "name": "The Odyssey - Homer",
        "detail": "Ancient Greek epic poem narrating Odysseus journey home. Foundational work of Western literature depicting heroism and adventure."
      },
      {
        "name": "Hamlet - William Shakespeare",
        "detail": "Tragic play exploring power, madness, and revenge. One of greatest works of literature analyzing human psychology."
      },
      {
        "name": "Midsummer Nights Dream - William Shakespeare",
        "detail": "Comedic play set in enchanted forest with magical happenings. Exploration of love, magic, and theatrical illusion."
      },
      {
        "name": "Catcher in the Rye - J.D. Salinger",
        "detail": "Coming-of-age novel about teenage protagonist Holden Caulfield. Commentary on alienation, growing up, and societal hypocrisy."
      },
      {
        "name": "Beloved - Toni Morrison",
        "detail": "Novel exploring slavery and its aftermath in America. Pulitzer Prize winner depicting trauma and healing through supernatural narrative."
      },
      {
        "name": "One Hundred Years of Solitude - Gabriel Garcia Marquez",
        "detail": "Magical realism novel chronicling Buendias family over generations. Latin American literature masterpiece blending fantasy and reality."
      },
      {
        "name": "Midnight's Children - Salman Rushdie",
        "detail": "Indian novel set during partition exploring identity and history. Booker Prize winner using magical realism and Indian narrative traditions."
      },
      {
        "name": "Interpreter of Maladies - Jhumpa Lahiri",
        "detail": "Collection of short stories exploring Indian-American experiences. Pulitzer Prize winner examining cultural identity and relationships."
      },
      {
        "name": "Munsi Premchand Works",
        "detail": "Hindi literature pioneer writing about rural India and social issues. Stories like Nirmala and Sevasadan addressing poverty and dignity."
      },
      {
        "name": "The Monks and the Riddles - Assorted Ancient Texts",
        "detail": "Collection of wisdom literature and philosophical texts from various ancient cultures exploring universal human questions."
      }
    ],
    "faqs": [
      {
        "q": "What is the oldest known written literature?",
        "a": "The Epic of Gilgamesh from Mesopotamia (c. 2100 BC) is among the oldest known written literary works, predating Homer."
      },
      {
        "q": "Which Indian authors have won international literary prizes?",
        "a": "Salman Rushdie, Jhumpa Lahiri, and others have won Booker Prize. Aravind Adiga won Booker for The White Tiger."
      }
    ]
  },
  {
    "slug": "important-organizations-hq",
    "title": "Important Organizations and Headquarters",
    "category": "World",
    "intro": "Explore major international organizations that govern global affairs, humanitarian efforts, and international relations. Know where these influential institutions are headquartered.",
    "items": [
      {
        "name": "United Nations - New York, USA",
        "detail": "International organization promoting peace and cooperation. Established 1945 after WWII with General Assembly, Security Council, and various agencies."
      },
      {
        "name": "World Health Organization - Geneva, Switzerland",
        "detail": "UN agency directing health initiatives globally. Headquartered in Geneva, coordinating disease control and public health responses."
      },
      {
        "name": "UNESCO - Paris, France",
        "detail": "UN organization promoting education, culture, and science. Designates World Heritage Sites and supports cultural preservation."
      },
      {
        "name": "World Bank - Washington DC, USA",
        "detail": "International financial institution providing development loans. Headquartered in Washington, supporting economic development."
      },
      {
        "name": "International Monetary Fund - Washington DC, USA",
        "detail": "Organization promoting financial stability and development. Works closely with World Bank on economic cooperation."
      },
      {
        "name": "NATO - Brussels, Belgium",
        "detail": "North Atlantic Treaty Organization for collective defense. Headquartered in Brussels with 30+ member nations."
      },
      {
        "name": "African Union - Addis Ababa, Ethiopia",
        "detail": "Continental organization for African nations. Promotes unity, development, and cooperation among African countries."
      },
      {
        "name": "ASEAN - Jakarta, Indonesia",
        "detail": "Association of Southeast Asian Nations promoting regional cooperation. Headquartered in Jakarta with 10 member states."
      },
      {
        "name": "European Union - Brussels, Belgium",
        "detail": "Political and economic union of European states. Headquarters in Brussels managing European integration and policies."
      },
      {
        "name": "OPEC - Vienna, Austria",
        "detail": "Organization of Petroleum Exporting Countries coordinating oil policies. Headquartered in Vienna with 13+ member nations."
      },
      {
        "name": "World Trade Organization - Geneva, Switzerland",
        "detail": "International organization regulating international trade. Settles trade disputes and promotes fair trade practices."
      },
      {
        "name": "International Court of Justice - The Hague, Netherlands",
        "detail": "UN court handling disputes between nations. Highest judicial authority in international law and justice."
      },
      {
        "name": "Red Cross - Geneva, Switzerland",
        "detail": "International humanitarian organization providing disaster relief and medical aid. Neutral organization operating worldwide."
      },
      {
        "name": "Interpol - Lyon, France",
        "detail": "International Police Organization coordinating law enforcement. Headquartered in Lyon, facilitating cross-border crime investigations."
      },
      {
        "name": "UNICEF - New York, USA",
        "detail": "UN organization supporting children globally. Provides education, healthcare, and protection to vulnerable children."
      },
      {
        "name": "Greenpeace International - Amsterdam, Netherlands",
        "detail": "Environmental advocacy organization. Headquartered in Amsterdam, campaigning for environmental protection."
      },
      {
        "name": "Amnesty International - London, UK",
        "detail": "Human rights organization promoting justice and freedom. Based in London, advocates for prisoners and persecuted groups."
      },
      {
        "name": "Doctors Without Borders - Geneva, Switzerland",
        "detail": "Humanitarian medical organization providing aid in conflicts. Headquartered in Geneva, operates in crisis regions worldwide."
      },
      {
        "name": "SAARC - Kathmandu, Nepal",
        "detail": "South Asian Association for Regional Cooperation. Promotes regional cooperation among South Asian nations."
      },
      {
        "name": "BRICS - Rotating Presidency",
        "detail": "Alliance of Brazil, Russia, India, China, South Africa. Promotes cooperation among major emerging economies."
      }
    ],
    "faqs": [
      {
        "q": "What is the primary role of the United Nations?",
        "a": "The UN promotes international peace, security, and cooperation among nations. It addresses global issues through various agencies and organizations."
      },
      {
        "q": "Which organizations operate in India?",
        "a": "Organizations like UN, WHO, UNICEF, UNHCR, Red Cross, and many others operate in India providing various services and programs."
      }
    ]
  },
  {
    "slug": "vitamins-and-deficiency-diseases",
    "title": "Vitamins and Deficiency Diseases",
    "category": "Science",
    "intro": "Learn about essential vitamins and the diseases caused by their deficiency. Proper nutrition is vital for health, and understanding vitamins helps prevent nutritional disorders.",
    "items": [
      {
        "name": "Vitamin A Deficiency - Blindness",
        "detail": "Lack of Vitamin A causes night blindness and corneal damage. Severe deficiency leads to permanent blindness in children, preventable with proper nutrition."
      },
      {
        "name": "Vitamin B1 (Thiamine) - Beriberi",
        "detail": "Deficiency causes Beriberi affecting nerves and heart. Found in whole grains and legumes, essential for energy metabolism."
      },
      {
        "name": "Vitamin B2 (Riboflavin) - Ariboflavinosis",
        "detail": "Deficiency causes cracked lips, mouth sores, and eye problems. Important for energy production and cell function."
      },
      {
        "name": "Vitamin B3 (Niacin) - Pellagra",
        "detail": "Lack causes Pellagra with dermatitis, diarrhea, and dementia. Found in meat, fish, nuts, addressing the four Ds disease."
      },
      {
        "name": "Vitamin B5 (Pantothenic Acid)",
        "detail": "Deficiency rare in humans causing fatigue and nerve damage. Essential for hormone and cholesterol production."
      },
      {
        "name": "Vitamin B6 (Pyridoxine)",
        "detail": "Deficiency causes anemia and nerve damage. Important for brain development, immune function, and protein metabolism."
      },
      {
        "name": "Vitamin B7 (Biotin)",
        "detail": "Deficiency causes hair loss and skin problems. Essential for healthy hair, skin, and nail growth."
      },
      {
        "name": "Vitamin B9 (Folate) - Neural Tube Defects",
        "detail": "Deficiency in pregnancy causes birth defects. Important for cell division and DNA synthesis, critical for pregnant women."
      },
      {
        "name": "Vitamin B12 (Cobalamin) - Pernicious Anemia",
        "detail": "Deficiency causes anemia and neurological problems. Found in animal products, critical for red blood cells and nerve function."
      },
      {
        "name": "Vitamin C (Ascorbic Acid) - Scurvy",
        "detail": "Deficiency causes Scurvy with bleeding gums and wound healing problems. Important for immune function and collagen synthesis."
      },
      {
        "name": "Vitamin D - Rickets",
        "detail": "Deficiency causes Rickets in children with weak bones. Produced by sunlight exposure, essential for calcium absorption."
      },
      {
        "name": "Vitamin E - Neurological Problems",
        "detail": "Deficiency rare but causes nerve damage and muscle weakness. Important antioxidant protecting cells from damage."
      },
      {
        "name": "Vitamin K - Bleeding Disorders",
        "detail": "Deficiency causes excessive bleeding and bruising. Essential for blood clotting and bone metabolism."
      },
      {
        "name": "Iron Deficiency - Anemia",
        "detail": "Lack of iron causes iron-deficiency anemia with fatigue and weakness. Essential for oxygen transport in blood."
      },
      {
        "name": "Iodine Deficiency - Goiter",
        "detail": "Deficiency causes Goiter, thyroid enlargement, and mental retardation. Essential for thyroid hormone production."
      },
      {
        "name": "Calcium Deficiency - Osteoporosis",
        "detail": "Long-term deficiency leads to weak bones and Osteoporosis. Important for bone health and muscle function."
      },
      {
        "name": "Zinc Deficiency - Immune Problems",
        "detail": "Deficiency impairs immunity and wound healing. Important for immune response and protein synthesis."
      },
      {
        "name": "Copper Deficiency - Anemia",
        "detail": "Deficiency affects red blood cell formation. Important for iron metabolism and bone strength."
      },
      {
        "name": "Magnesium Deficiency",
        "detail": "Deficiency causes muscle cramps and fatigue. Essential for muscle and nerve function, energy production."
      },
      {
        "name": "Protein Deficiency - Kwashiorkor",
        "detail": "Severe protein deficiency causes Kwashiorkor with swelling and malnutrition. Critical for growth and tissue repair."
      }
    ],
    "faqs": [
      {
        "q": "Which vitamins are fat-soluble and water-soluble?",
        "a": "Fat-soluble: A, D, E, K (stored in body fat). Water-soluble: B vitamins and C (not stored, need regular intake)."
      },
      {
        "q": "How can vitamin deficiency be prevented?",
        "a": "Eat balanced diet with fruits, vegetables, whole grains, proteins, and dairy. Get sunlight for Vitamin D, take supplements if needed."
      }
    ]
  },
  {
    "slug": "si-units",
    "title": "SI Units of Measurement",
    "category": "Science",
    "intro": "Explore the International System of Units (SI) that standardizes measurements worldwide. These fundamental units form the basis of scientific measurements and international commerce.",
    "items": [
      {
        "name": "Meter (m) - Length",
        "detail": "SI unit of length defined as distance light travels in vacuum in 1/299,792,458 of second. Standard measurement for distance and height."
      },
      {
        "name": "Kilogram (kg) - Mass",
        "detail": "SI unit of mass defined by Planck constant. Standard measurement for weight and mass of objects worldwide."
      },
      {
        "name": "Second (s) - Time",
        "detail": "SI unit of time defined by atomic vibrations of cesium-133. Standard measurement for duration and frequency."
      },
      {
        "name": "Ampere (A) - Electric Current",
        "detail": "SI unit of electric current defined by elementary charge. Measures flow of electric charge in conductors."
      },
      {
        "name": "Kelvin (K) - Thermodynamic Temperature",
        "detail": "SI unit of temperature based on Boltzmann constant. Absolute scale starting at zero, used in science and engineering."
      },
      {
        "name": "Mole (mol) - Amount of Substance",
        "detail": "SI unit for quantity of substance equal to 6.022 x 10^23 particles. Used in chemistry for atoms and molecules."
      },
      {
        "name": "Candela (cd) - Luminous Intensity",
        "detail": "SI unit of light intensity defined by frequency of light and Planck constant. Measures brightness of light sources."
      },
      {
        "name": "Newton (N) - Force",
        "detail": "SI unit of force defined as kg*m/s^2. Measures strength of force applying acceleration to mass."
      },
      {
        "name": "Pascal (Pa) - Pressure",
        "detail": "SI unit of pressure defined as N/m^2. Measures force per unit area in gases and liquids."
      },
      {
        "name": "Joule (J) - Energy",
        "detail": "SI unit of energy and work defined as N*m. Measures heat, electricity, and mechanical work done."
      },
      {
        "name": "Watt (W) - Power",
        "detail": "SI unit of power defined as J/s. Measures rate of energy transfer and consumption."
      },
      {
        "name": "Volt (V) - Electric Potential",
        "detail": "SI unit of voltage defined as J/C. Measures electric potential difference in circuits."
      },
      {
        "name": "Ohm (Ω) - Electrical Resistance",
        "detail": "SI unit of resistance defined as V/A. Measures opposition to electric current flow in conductors."
      },
      {
        "name": "Coulomb (C) - Electric Charge",
        "detail": "SI unit of electric charge defined as A*s. Measures quantity of electric charge."
      },
      {
        "name": "Hertz (Hz) - Frequency",
        "detail": "SI unit of frequency defined as s^-1. Measures cycles per second in oscillations and waves."
      },
      {
        "name": "Henry (H) - Inductance",
        "detail": "SI unit of inductance defined as Wb/A. Measures property of coils resisting current changes."
      },
      {
        "name": "Farad (F) - Capacitance",
        "detail": "SI unit of capacitance defined as C/V. Measures ability to store electrical charge."
      },
      {
        "name": "Weber (Wb) - Magnetic Flux",
        "detail": "SI unit of magnetic flux defined as V*s. Measures total magnetic field through surface."
      },
      {
        "name": "Tesla (T) - Magnetic Flux Density",
        "detail": "SI unit of magnetic field strength defined as Wb/m^2. Measures intensity of magnetic field."
      },
      {
        "name": "Gray (Gy) - Absorbed Radiation Dose",
        "detail": "SI unit of radiation dose defined as J/kg. Measures energy of ionizing radiation absorbed."
      }
    ],
    "faqs": [
      {
        "q": "Why are SI units important?",
        "a": "SI units provide standardized measurements for science, engineering, and commerce worldwide, enabling consistent communication and results."
      },
      {
        "q": "What are the seven base SI units?",
        "a": "Meter (length), Kilogram (mass), Second (time), Ampere (current), Kelvin (temperature), Mole (substance), Candela (light)."
      }
    ]
  },
  {
    "slug": "chemical-names-of-common-substances",
    "title": "Chemical Names of Common Substances",
    "category": "Science",
    "intro": "Discover the scientific chemical names of everyday substances. Understanding chemical composition helps us grasp the science behind common products and natural materials.",
    "items": [
      {
        "name": "Salt - Sodium Chloride",
        "detail": "NaCl, white crystalline salt used in cooking, food preservation, and chemical industries worldwide."
      },
      {
        "name": "Sugar - Sucrose",
        "detail": "C12H22O11, disaccharide from sugar cane and beets, sweetener used extensively in food and beverages."
      },
      {
        "name": "Water - Dihydrogen Monoxide",
        "detail": "H2O, essential liquid for life, composed of hydrogen and oxygen, universal solvent."
      },
      {
        "name": "Vinegar - Acetic Acid",
        "detail": "CH3COOH, weak acid resulting from fermentation, used in cooking and cleaning."
      },
      {
        "name": "Baking Soda - Sodium Bicarbonate",
        "detail": "NaHCO3, white powder used in baking, deodorizing, and cleaning applications."
      },
      {
        "name": "Chalk - Calcium Carbonate",
        "detail": "CaCO3, white solid from limestone, used for writing on blackboards and in construction."
      },
      {
        "name": "Marble - Calcium Carbonate",
        "detail": "CaCO3, crystalline form of calcium carbonate used in sculpture and architecture."
      },
      {
        "name": "Rust - Iron Oxide",
        "detail": "Fe2O3, reddish compound formed by oxidation of iron, causes corrosion of metal surfaces."
      },
      {
        "name": "Dry Ice - Solid Carbon Dioxide",
        "detail": "CO2 solid at -78.5C, used for cooling, fog effects, and food preservation."
      },
      {
        "name": "Milk of Magnesia - Magnesium Hydroxide",
        "detail": "Mg(OH)2, white suspension used as antacid and laxative for digestive health."
      },
      {
        "name": "Bleach - Sodium Hypochlorite",
        "detail": "NaOCl, liquid disinfectant and whitening agent used for cleaning and sanitation."
      },
      {
        "name": "Lime - Calcium Oxide",
        "detail": "CaO, white powder produced from limestone heating, used in construction and agriculture."
      },
      {
        "name": "Plaster of Paris - Calcium Sulfate Hemihydrate",
        "detail": "CaSO4.1/2H2O, powder used for casts, molds, and construction applications."
      },
      {
        "name": "Aspirin - Acetylsalicylic Acid",
        "detail": "C9H8O4, pain reliever and anti-inflammatory medication widely used for headaches."
      },
      {
        "name": "Common Glass - Silicon Dioxide",
        "detail": "SiO2, transparent solid component of sand and rocks, used for windows and containers."
      },
      {
        "name": "Ammonia - Ammonia",
        "detail": "NH3, pungent gas used as fertilizer, cleaner, and in chemical synthesis."
      },
      {
        "name": "Sulfuric Acid - Sulfuric Acid",
        "detail": "H2SO4, strong acid used in batteries, fertilizers, and chemical manufacturing."
      },
      {
        "name": "Alcohol - Ethanol",
        "detail": "C2H5OH, liquid alcohol found in beverages, fuels, and industrial applications."
      },
      {
        "name": "Methane - Methane",
        "detail": "CH4, combustible gas used as fuel for heating and electricity generation."
      },
      {
        "name": "Glucose - Glucose",
        "detail": "C6H12O6, simple sugar produced by photosynthesis, primary energy source for cells."
      }
    ],
    "faqs": [
      {
        "q": "Why do we need to know chemical names?",
        "a": "Chemical names provide precise identification of substances, enabling safe handling, understanding properties, and scientific communication."
      },
      {
        "q": "What is the difference between common and chemical names?",
        "a": "Common names are everyday terms (salt), chemical names specify molecular composition (sodium chloride, NaCl)."
      }
    ]
  },
  {
    "slug": "national-parks-and-sanctuaries-india",
    "title": "National Parks and Sanctuaries in India",
    "category": "Geography",
    "intro": "Explore Indias protected areas preserving biodiversity and natural heritage. National parks and wildlife sanctuaries protect endangered species and ecosystems for future generations.",
    "items": [
      {
        "name": "Jim Corbett National Park - Uttarakhand",
        "detail": "Indias oldest national park established 1936 protecting tigers and other wildlife. Named after conservationist Jim Corbett, covers 520 sq km."
      },
      {
        "name": "Kanha National Park - Madhya Pradesh",
        "detail": "Known as the inspiration for Jungle Book. Protects barasingha and tiger population in central India."
      },
      {
        "name": "Kaziranga National Park - Assam",
        "detail": "UNESCO World Heritage Site protecting Indian rhinoceros. Home to largest population of one-horned rhinos in world."
      },
      {
        "name": "Gir National Park - Gujarat",
        "detail": "Sanctuary for Asiatic lions, only place where they survive in wild. Covers 1,412 sq km in Gujarat."
      },
      {
        "name": "Bandhavgarh National Park - Madhya Pradesh",
        "detail": "Tiger reserve with highest density of tigers in India. Ancient fort at center with rich biodiversity."
      },
      {
        "name": "Pench National Park - Madhya Pradesh/Maharashtra",
        "detail": "Named after Pench River flowing through it. Protects tigers and other forest wildlife."
      },
      {
        "name": "Ranthambhore National Park - Rajasthan",
        "detail": "Famous tiger reserve with 10th century fort. Tigers visible from jeep safaris, popular tourist destination."
      },
      {
        "name": "Sundarbans National Park - West Bengal",
        "detail": "Largest mangrove forest and tiger reserve in world. UNESCO World Heritage Site protecting Bengal tigers."
      },
      {
        "name": "Periyar Wildlife Sanctuary - Kerala",
        "detail": "Lake sanctuary protecting elephants, tigers, and sambar deer. Mountain reserve in Western Ghats."
      },
      {
        "name": "Great Himalayan National Park - Himachal Pradesh",
        "detail": "Protected area in Himalayas preserving snow leopards and alpine wildlife. UNESCO World Heritage Site."
      },
      {
        "name": "Nanda Devi National Park - Uttarakhand",
        "detail": "UNESCO World Heritage Site protecting alpine meadows and wildlife. Surrounds Nanda Devi peak."
      },
      {
        "name": "Valley of Flowers - Uttarakhand",
        "detail": "Alpine meadow with diverse flora, UNESCO site. Protects endemic flower species in Himalayas."
      },
      {
        "name": "Manas National Park - Assam",
        "detail": "UNESCO World Heritage Site at foot of Himalayas. Protects rhinos, elephants, and tigers."
      },
      {
        "name": "Hemis National Park - Ladakh",
        "detail": "Protects snow leopards in high altitude Himalayas. Largest national park by area in India."
      },
      {
        "name": "Silent Valley National Park - Kerala",
        "detail": "Tropical rainforest with endemic species. Protects lion-tailed macaque and other threatened species."
      },
      {
        "name": "Dudhwa National Park - Uttar Pradesh",
        "detail": "Protects Bengal tigers and endangered species. Important wetland for migratory birds."
      },
      {
        "name": "Tadoba-Andhari Tiger Reserve - Maharashtra",
        "detail": "Ancient tiger reserve with healthy tiger population. Tourism centered on tiger spotting safaris."
      },
      {
        "name": "Nagarhole National Park - Karnataka",
        "detail": "Protects tigers, elephants, and sambar in Western Ghats. Rich biodiversity with diverse flora."
      },
      {
        "name": "Betla National Park - Jharkhand",
        "detail": "Tiger reserve protecting wildlife in central India. Important for conservation of Bengal tigers."
      },
      {
        "name": "Vansthali Wildlife Sanctuary - Rajasthan",
        "detail": "Protects desert wildlife including blackbuck. Conservation area for endangered species."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between national parks and wildlife sanctuaries?",
        "a": "National parks have stricter protection, tourism limited. Sanctuaries allow traditional activities while protecting wildlife."
      },
      {
        "q": "How many national parks and sanctuaries are in India?",
        "a": "India has 104 national parks and over 500 wildlife sanctuaries protecting diverse ecosystems and species."
      }
    ]
  },
  {
    "slug": "biography-of-apj-abdul-kalam",
    "title": "Biography of A P J Abdul Kalam",
    "category": "Biography",
    "intro": "A P J Abdul Kalam was an Indian scientist and the 11th President of India. He was the chief architect of India's missile development program and is remembered as the 'Missile Man of India'.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Avul Pakir Jainulabdeen Abdul Kalam"
      },
      {
        "name": "Born",
        "detail": "15 October 1931 in Rameswaram, Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Aeronautical Engineering, Missile Technology, Science"
      },
      {
        "name": "Education",
        "detail": "Graduated from Madras Institute of Technology with degree in Aeronautical Engineering"
      },
      {
        "name": "Major Contributions",
        "detail": "Designed and developed the Agni and Prithvi missile systems for India. Led the missile development program at DRDO and ISRO. Made India a missile-capable nation during the 1980s and 1990s, significantly strengthening national defense. Conducted nuclear tests in 1998 that made India a nuclear power."
      },
      {
        "name": "Awards",
        "detail": "Bharat Ratna (1997), Padma Bhushan (1981), Padma Vibhushan (1990)"
      },
      {
        "name": "President of India",
        "detail": "Served as the 11th President of India from 2002 to 2007"
      },
      {
        "name": "Famous Quote",
        "detail": "Dream is not that which comes to you in sleep, but that which keeps you awake."
      },
      {
        "name": "Death",
        "detail": "27 July 2015 in Shillong, Meghalaya, India"
      },
      {
        "name": "Why Famous",
        "detail": "Known as the 'Missile Man of India' for his contributions to missile technology. His work transformed India into a major defense power. Remained a popular public figure and educator even after leaving politics, inspiring millions of Indians."
      }
    ],
    "faqs": [
      {
        "q": "Why was A P J Abdul Kalam called the 'Missile Man of India'?",
        "a": "He was given this title because he designed and led the development of India's Agni and Prithvi missiles, making India a missile-capable nation."
      },
      {
        "q": "What was A P J Abdul Kalam's role in India's nuclear program?",
        "a": "He was the chief scientific advisor during India's nuclear tests in 1998, helping establish India as a nuclear power."
      }
    ]
  },
  {
    "slug": "biography-of-c-v-raman",
    "title": "Biography of C V Raman",
    "category": "Biography",
    "intro": "Chandrasekhar Venkata Raman was an Indian physicist who won the Nobel Prize in Physics for discovering the Raman Effect. He was the first non-European to win the Nobel Prize in Science.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Chandrasekhar Venkata Raman"
      },
      {
        "name": "Born",
        "detail": "7 November 1888 in Tiruchirappalli, Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Physics, Light and Sound, Spectroscopy"
      },
      {
        "name": "Education",
        "detail": "Graduated from Presidency College, Madras with Physics honors. Earned MSc in Physics from University of Madras."
      },
      {
        "name": "Major Contributions",
        "detail": "Discovered the Raman Effect, which explains how light changes when it passes through materials. This discovery revolutionized the study of molecular structure and spectroscopy. His work proved that matter and light interact in fundamental ways, opening new fields of scientific research."
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Physics (1930), Padma Bhushan (1954), Bharat Ratna (1954)"
      },
      {
        "name": "Notable Achievement",
        "detail": "First Indian to win a Nobel Prize in any science field and first non-European to win the Nobel Prize in Physics"
      },
      {
        "name": "Famous Quote",
        "detail": "The scattering of light by atoms and molecules is fundamental to our understanding of nature."
      },
      {
        "name": "Death",
        "detail": "21 November 1970 in Bangalore, India"
      },
      {
        "name": "Why Famous",
        "detail": "His discovery of the Raman Effect became a major tool in chemistry and physics for studying molecular structure. Won the Nobel Prize and brought international recognition to Indian science. Established the Indian Institute of Science and contributed greatly to scientific research in India."
      }
    ],
    "faqs": [
      {
        "q": "What is the Raman Effect?",
        "a": "It is the scattering of light by atoms and molecules where the light's frequency changes. This change reveals information about the molecular structure of materials."
      },
      {
        "q": "Why was C V Raman's Nobel Prize significant for India?",
        "a": "He was the first Indian to win a Nobel Prize in Science, bringing international recognition to Indian scientific research."
      }
    ]
  },
  {
    "slug": "biography-of-srinivasa-ramanujan",
    "title": "Biography of Srinivasa Ramanujan",
    "category": "Biography",
    "intro": "Srinivasa Ramanujan was a legendary Indian mathematician who made extraordinary contributions to number theory and infinite series. Despite having no formal training, he became one of the most talented mathematicians of the 20th century.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Srinivasa Aiyangar Ramanujan"
      },
      {
        "name": "Born",
        "detail": "22 December 1887 in Erode, Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Mathematics, Number Theory, Infinite Series"
      },
      {
        "name": "Education",
        "detail": "Had no formal university education. Taught himself mathematics using available books and discovered advanced theorems independently."
      },
      {
        "name": "Major Contributions",
        "detail": "Made groundbreaking discoveries in number theory and infinite series that were years ahead of his time. Developed over 3,000 mathematical formulas and theorems during his lifetime. His work with British mathematician G.H. Hardy produced highly influential results in partition theory and analysis, reshaping modern mathematics."
      },
      {
        "name": "Awards",
        "detail": "Fellow of the Royal Society (1918), one of the youngest Fellows at that time"
      },
      {
        "name": "Work in England",
        "detail": "Collaborated with G.H. Hardy at Cambridge University from 1914 to 1919, producing revolutionary mathematical papers"
      },
      {
        "name": "Famous Quote",
        "detail": "An equation means nothing to me unless it expresses a thought of God."
      },
      {
        "name": "Death",
        "detail": "26 April 1920 in Kumbakonam, Tamil Nadu, India at age 32"
      },
      {
        "name": "Why Famous",
        "detail": "Considered one of the greatest mathematicians of all time despite his short life. His self-taught genius and intuitive understanding of mathematics inspired generations. The Ramanujan Prize and Ramanujan number (1729) are named in his honor."
      }
    ],
    "faqs": [
      {
        "q": "How did Ramanujan learn mathematics without formal education?",
        "a": "He taught himself using mathematics books and developed an intuitive understanding of complex mathematical concepts."
      },
      {
        "q": "Why is 1729 called the Ramanujan number?",
        "a": "It is the smallest number that can be expressed as the sum of two cubes in two different ways (1729 = 1³ + 12³ = 9³ + 10³)."
      }
    ]
  },
  {
    "slug": "biography-of-homi-bhabha",
    "title": "Biography of Homi Bhabha",
    "category": "Biography",
    "intro": "Homi Jehangir Bhabha was an Indian nuclear physicist who founded and directed India's nuclear program. He is known as the architect of India's nuclear science and technology development.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Homi Jehangir Bhabha"
      },
      {
        "name": "Born",
        "detail": "30 October 1909 in Mumbai, India"
      },
      {
        "name": "Field",
        "detail": "Nuclear Physics, Atomic Energy, Particle Physics"
      },
      {
        "name": "Education",
        "detail": "Studied at Royal Institute of Science, Mumbai. Earned doctorate in physics from University of Cambridge"
      },
      {
        "name": "Major Contributions",
        "detail": "Founded the Tata Institute of Fundamental Research (TIFR) in Mumbai in 1945, which became the leading research institution in India. Established the Atomic Energy Commission and directed India's nuclear program. Promoted the use of atomic energy for peaceful purposes and scientific research."
      },
      {
        "name": "Awards",
        "detail": "Padma Bhushan (1954), Fellow of the Royal Society (1941)"
      },
      {
        "name": "Scientific Work",
        "detail": "Made contributions to cosmic ray physics and the theory of elementary particles. His work on the Bhabha scattering phenomenon in particle physics is recognized internationally."
      },
      {
        "name": "Famous Quote",
        "detail": "For a country to be developed in the modern sense, it is necessary to have nuclear energy."
      },
      {
        "name": "Death",
        "detail": "24 January 1966 in an air crash near Mont Blanc, France"
      },
      {
        "name": "Why Famous",
        "detail": "Founded India's nuclear research program and TIFR, which remain premier institutions. His vision for atomic energy development shaped India's technological progress. Promoted scientific research and development in independent India."
      }
    ],
    "faqs": [
      {
        "q": "What is the Tata Institute of Fundamental Research?",
        "a": "It is a leading research institution in Mumbai founded by Homi Bhabha in 1945 for basic and applied research in science and technology."
      },
      {
        "q": "Why was Homi Bhabha important for India's development?",
        "a": "He established India's nuclear program and promoted scientific research, which helped India develop as a modern scientific nation."
      }
    ]
  },
  {
    "slug": "biography-of-vikram-sarabhai",
    "title": "Biography of Vikram Sarabhai",
    "category": "Biography",
    "intro": "Vikram Ambalal Sarabhai was an Indian physicist who founded India's space program. He is known as the architect of India's space program and ISRO's founder.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Vikram Ambalal Sarabhai"
      },
      {
        "name": "Born",
        "detail": "12 December 1919 in Ahmedabad, Gujarat, India"
      },
      {
        "name": "Field",
        "detail": "Physics, Space Technology, Cosmic Ray Research"
      },
      {
        "name": "Education",
        "detail": "Studied at Cambridge University where he earned his doctorate in physics"
      },
      {
        "name": "Major Contributions",
        "detail": "Founded the Indian Space Research Organisation (ISRO) in 1969 and served as its first chairman. Launched Aryabhata, India's first satellite. Established the space program on principles that balanced advanced technology with India's development needs, focusing on satellite communication and meteorology."
      },
      {
        "name": "Awards",
        "detail": "Padma Bhushan (1966), Fellow of the National Academy of Sciences"
      },
      {
        "name": "Space Achievements",
        "detail": "Aryabhata satellite launched in 1975 made India the sixth nation to launch its own satellite. Established Thumba Equatorial Rocket Launching Station as India's spaceport."
      },
      {
        "name": "Famous Quote",
        "detail": "There must be some dreams bigger than home, and at that time, we were dreaming about space."
      },
      {
        "name": "Death",
        "detail": "30 December 1971 in Bangalore, India"
      },
      {
        "name": "Why Famous",
        "detail": "Founded India's space program (ISRO) which became one of the world's most successful space agencies. Launched India's first satellite, establishing India as a spacefaring nation. His vision for space technology serving development needs continues to guide ISRO."
      }
    ],
    "faqs": [
      {
        "q": "What is ISRO?",
        "a": "ISRO (Indian Space Research Organisation) is India's national space agency founded by Vikram Sarabhai in 1969. It launches satellites and manages India's space program."
      },
      {
        "q": "What was Aryabhata?",
        "a": "Aryabhata was India's first satellite, launched in 1975 by ISRO under Sarabhai's leadership."
      }
    ]
  },
  {
    "slug": "biography-of-jagadish-chandra-bose",
    "title": "Biography of Jagadish Chandra Bose",
    "category": "Biography",
    "intro": "Jagadish Chandra Bose was an Indian polymath who made groundbreaking discoveries in physics, biology, and plant science. His research on radio waves and plant sensitivity earned him international recognition.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Jagadish Chandra Bose"
      },
      {
        "name": "Born",
        "detail": "30 November 1858 in Mymensingh (now in Bangladesh)"
      },
      {
        "name": "Field",
        "detail": "Physics, Biology, Botany, Radio Waves"
      },
      {
        "name": "Education",
        "detail": "Studied at St. Xavier's College, Kolkata and later at Cambridge University"
      },
      {
        "name": "Major Contributions",
        "detail": "Conducted pioneering experiments with radio waves and electromagnetic radiation, contributing to wireless technology development. Demonstrated that plants have sensitivity to stimuli and electrical responses similar to animals. Invented the crescograph, a device to measure plant growth, proving plants have life-like reactions."
      },
      {
        "name": "Awards",
        "detail": "Knighthood (1917), Padma Bhushan (1956)"
      },
      {
        "name": "Scientific Innovations",
        "detail": "Invented the coherer, a device for detecting electromagnetic waves. Established the Bose Institute in Kolkata for scientific research in 1917."
      },
      {
        "name": "Famous Quote",
        "detail": "It is God alone who knows the science of creation."
      },
      {
        "name": "Death",
        "detail": "23 November 1937 in Giridih, Jharkhand, India"
      },
      {
        "name": "Why Famous",
        "detail": "Pioneered research in wireless technology and plant physiology, proving plants are living, sensitive beings. Founded the Bose Institute which remains a leading research center. His work influenced both physics and biology, making him one of India's greatest scientists."
      }
    ],
    "faqs": [
      {
        "q": "What did Jagadish Chandra Bose prove about plants?",
        "a": "He demonstrated that plants have sensitivity to stimuli and respond electrically, similar to animals, using the crescograph device."
      },
      {
        "q": "What is the Bose Institute?",
        "a": "It is a leading research institution in Kolkata founded by Jagadish Chandra Bose in 1917 for scientific research."
      }
    ]
  },
  {
    "slug": "biography-of-mahatma-gandhi",
    "title": "Biography of Mahatma Gandhi",
    "category": "Biography",
    "intro": "Mohandas Karamchand Gandhi, called Mahatma, was the father of the Indian independence movement. He led India to freedom using non-violence and civil disobedience, inspiring freedom movements worldwide.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Mohandas Karamchand Gandhi"
      },
      {
        "name": "Born",
        "detail": "2 October 1869 in Porbandar, Gujarat, India"
      },
      {
        "name": "Field",
        "detail": "Politics, Independence Movement, Non-violence, Social Reform"
      },
      {
        "name": "Education",
        "detail": "Studied at University College London and became a barrister (lawyer)"
      },
      {
        "name": "Major Contributions",
        "detail": "Led India's independence movement against British rule using non-violent resistance (Satyagraha) and civil disobedience. Organized major campaigns including the Salt March in 1930 and Quit India Movement in 1942. United Indians across religions and regions for independence. Advocated for the poor, untouchables, and social reform within India."
      },
      {
        "name": "Awards",
        "detail": "Called 'Mahatma' (Great Soul), nominated for Nobel Peace Prize five times but never awarded"
      },
      {
        "name": "Famous Campaigns",
        "detail": "Salt March (1930) against salt tax, Non-Cooperation Movement, Quit India Movement (1942)"
      },
      {
        "name": "Famous Quote",
        "detail": "In a gentle way, you can shake the world."
      },
      {
        "name": "Death",
        "detail": "30 January 1948 in Delhi, India, assassinated"
      },
      {
        "name": "Why Famous",
        "detail": "Led India to independence through non-violence, proving that peaceful resistance could defeat imperial power. Became a symbol of non-violent protest globally. His philosophy of Satyagraha inspired civil rights movements worldwide including Martin Luther King Jr."
      }
    ],
    "faqs": [
      {
        "q": "What is Satyagraha?",
        "a": "It is Gandhi's philosophy of non-violent resistance and civil disobedience, meaning 'truth force' or 'soul force'."
      },
      {
        "q": "What was the Salt March?",
        "a": "A major 1930 campaign where Gandhi and followers marched to the sea to make salt, protesting the British salt monopoly."
      }
    ]
  },
  {
    "slug": "biography-of-jawaharlal-nehru",
    "title": "Biography of Jawaharlal Nehru",
    "category": "Biography",
    "intro": "Jawaharlal Nehru was India's first Prime Minister and a key leader in the independence movement. He shaped modern India through his vision of secularism, scientific temper, and industrial development.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Jawaharlal Nehru"
      },
      {
        "name": "Born",
        "detail": "14 November 1889 in Allahabad, Uttar Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Politics, Independence Movement, Nation-Building"
      },
      {
        "name": "Education",
        "detail": "Studied at Harrow School and Cambridge University, became a barrister"
      },
      {
        "name": "Major Contributions",
        "detail": "Served as India's first Prime Minister for 17 years (1947-1964). Shaped India's Constitution and democratic institutions. Promoted scientific temper, industrialization, and development through Five-Year Plans based on Soviet model. Established educational institutions including IITs and universities."
      },
      {
        "name": "Awards",
        "detail": "Bharat Ratna (1955), elected as a trusted associate of Gandhi"
      },
      {
        "name": "Key Achievements",
        "detail": "Established India as a secular democracy. Built heavy industries and dams like Bhakra-Nangal. Promoted scientific research and space program. Strengthened national integration and foreign policy."
      },
      {
        "name": "Famous Quote",
        "detail": "The future belongs to science and those who make friends with science."
      },
      {
        "name": "Death",
        "detail": "27 May 1964 in New Delhi, India"
      },
      {
        "name": "Why Famous",
        "detail": "Built modern India as the first Prime Minister. Established India as a democratic, secular, industrial nation. His vision for scientific development and education continues to guide India."
      }
    ],
    "faqs": [
      {
        "q": "What were Nehru's Five-Year Plans?",
        "a": "These were development programs modeled on the Soviet system to build heavy industries and infrastructure for India's economic growth."
      },
      {
        "q": "What is Nehruvian model of development?",
        "a": "It emphasized industrialization, scientific temper, secular governance, and public sector development for nation-building."
      }
    ]
  },
  {
    "slug": "biography-of-b-r-ambedkar",
    "title": "Biography of B R Ambedkar",
    "category": "Biography",
    "intro": "Bhimrao Ramji Ambedkar was a social reformer, economist, and architect of India's Constitution. He fought against caste discrimination and for the rights of oppressed people in India.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Bhimrao Ramji Ambedkar"
      },
      {
        "name": "Born",
        "detail": "14 April 1891 in Mhow, Madhya Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Social Reform, Law, Economics, Constitution-Making"
      },
      {
        "name": "Education",
        "detail": "Studied at University of Mumbai and Columbia University, USA. Earned doctorates and practiced as a barrister and economist"
      },
      {
        "name": "Major Contributions",
        "detail": "Drafted India's Constitution as chairman of the Drafting Committee, establishing the country as a sovereign democratic republic with equal rights. Fought against caste discrimination through social movements. Advocated for the rights of Dalits (untouchables), women, and workers. His work laid the foundation for social justice and equality in India."
      },
      {
        "name": "Awards",
        "detail": "Bharat Ratna (1990, posthumous), titled 'Babasaheb'"
      },
      {
        "name": "Constitutional Work",
        "detail": "Chairman of the Drafting Committee (1947-1950). Incorporated Article 17 abolishing untouchability, Article 14 guaranteeing equality."
      },
      {
        "name": "Famous Quote",
        "detail": "Liberty, Equality, Fraternity are not to be treated as separate items in a trinity. They form a union of trinity in the sense that to divorce one from the other is to defeat the very purpose of democracy."
      },
      {
        "name": "Death",
        "detail": "6 December 1956 in Delhi, India"
      },
      {
        "name": "Why Famous",
        "detail": "Architect of the Indian Constitution which guarantees equality and abolishes untouchability. Led social reform movements for the rights of marginalized people. His vision of equality shapes India's legal and social system."
      }
    ],
    "faqs": [
      {
        "q": "What was Ambedkar's role in India's Constitution?",
        "a": "He was the chairman of the Drafting Committee and the principal author of India's Constitution, including provisions for equality and abolishing untouchability."
      },
      {
        "q": "What did Ambedkar fight for?",
        "a": "He fought against caste discrimination and for the rights of Dalits, women, workers, and all oppressed communities in India."
      }
    ]
  },
  {
    "slug": "biography-of-sardar-vallabhbhai-patel",
    "title": "Biography of Sardar Vallabhbhai Patel",
    "category": "Biography",
    "intro": "Sardar Vallabhbhai Patel was an Indian independence leader known as the 'Iron Man of India'. He unified the hundreds of princely states into the Indian Union, creating modern India's territorial integrity.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Vallabhbhai Jhaverbhai Patel"
      },
      {
        "name": "Born",
        "detail": "31 October 1875 in Nadiad, Gujarat, India"
      },
      {
        "name": "Field",
        "detail": "Politics, Independence Movement, Nation Unification"
      },
      {
        "name": "Education",
        "detail": "Studied at the University of Bombay and Bar Institute in England, became a barrister"
      },
      {
        "name": "Major Contributions",
        "detail": "Led the unification of 565 princely states into the Indian Union after independence, creating India's modern political boundaries. Used diplomatic and strategic skills to convince Indian princes to merge their kingdoms with India. Served as India's first Deputy Prime Minister and Minister of Home Affairs. Maintained communal harmony during the partition period."
      },
      {
        "name": "Awards",
        "detail": "Bharat Ratna (1956, posthumous), title 'Sardar' meaning leader"
      },
      {
        "name": "Key Achievements",
        "detail": "Unified over 565 princely states without armed conflict. Organized the Indian states administratively and politically. Strengthened India's internal security and integrity."
      },
      {
        "name": "Famous Quote",
        "detail": "In a free country, there is plenty of room for reform but no room for revolution."
      },
      {
        "name": "Death",
        "detail": "15 December 1950 in New Delhi, India"
      },
      {
        "name": "Why Famous",
        "detail": "Known as the 'Iron Man of India' for his role in unifying hundreds of independent princely states. His political integration of India created the foundation of the modern Indian nation. His work ensured territorial integrity and national unity."
      }
    ],
    "faqs": [
      {
        "q": "What was the integration of Indian states?",
        "a": "Sardar Patel unified 565 independent princely states into the Indian Union, creating the modern territorial boundaries of India."
      },
      {
        "q": "Why was Sardar Patel called the 'Iron Man'?",
        "a": "He was called the Iron Man for his strong will, determination, and successful integration of princely states without using force."
      }
    ]
  },
  {
    "slug": "biography-of-subhas-chandra-bose",
    "title": "Biography of Subhas Chandra Bose",
    "category": "Biography",
    "intro": "Subhas Chandra Bose was a revolutionary independence leader who led the Indian National Army. He adopted the motto 'Give me blood, and I shall give you freedom' and fought for India's independence with military strategy.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Subhas Chandra Bose"
      },
      {
        "name": "Born",
        "detail": "23 January 1897 in Cuttack, Odisha, India"
      },
      {
        "name": "Field",
        "detail": "Independence Movement, Revolutionary Politics, Military Strategy"
      },
      {
        "name": "Education",
        "detail": "Studied at Presidency College, Kolkata and earned a degree in philosophy. Passed Indian Civil Service exam but resigned to join independence movement"
      },
      {
        "name": "Major Contributions",
        "detail": "Founded the Indian National Army (INA) to fight the British using military force. Launched the Quit India Movement with militant approach. Sought support from Japan and Germany during World War II to liberate India from British rule. Symbolized militant nationalism in Indian independence movement."
      },
      {
        "name": "Awards",
        "detail": "Called 'Netaji' meaning leader, revered as a war hero and freedom fighter"
      },
      {
        "name": "Key Campaign",
        "detail": "Organized the Indian National Army and attempted to invade India from Burma with Japanese support during World War II"
      },
      {
        "name": "Famous Quote",
        "detail": "Give me blood, and I shall give you freedom."
      },
      {
        "name": "Death",
        "detail": "18 August 1945 in Taipei (Taiwan), details remain controversial"
      },
      {
        "name": "Why Famous",
        "detail": "Led the Indian National Army, representing militant resistance to British rule. His approach differed from Gandhi's non-violence, offering an alternative path to independence. Remains a popular nationalist figure in India."
      }
    ],
    "faqs": [
      {
        "q": "What was the Indian National Army?",
        "a": "It was a military organization led by Subhas Chandra Bose to fight the British using armed rebellion instead of non-violent methods."
      },
      {
        "q": "Why was Subhas Chandra Bose called 'Netaji'?",
        "a": "Netaji means 'respected leader' in Indian languages. He was called Netaji by his followers and supporters."
      }
    ]
  },
  {
    "slug": "biography-of-rani-lakshmibai",
    "title": "Biography of Rani Lakshmibai",
    "category": "Biography",
    "intro": "Rani Lakshmibai of Jhansi was a fearless warrior queen who led the revolt against British rule during the 1857 Indian Rebellion. She became a symbol of women's courage and freedom.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Lakshmibai of Jhansi (born Manikarnika Tambe)"
      },
      {
        "name": "Born",
        "detail": "19 November 1828 in Varanasi, Uttar Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Military Leadership, Independence Rebellion, Women Warrior"
      },
      {
        "name": "Education",
        "detail": "Received education in martial arts, horse riding, and weapons training from her father"
      },
      {
        "name": "Major Contributions",
        "detail": "Led the 1857 Indian Rebellion from Jhansi against British colonial rule. Personally fought against British soldiers on horseback despite being pregnant, earning respect as a military leader. Organized her army and defenses against superior British forces. Became a symbol of women's courage and independence."
      },
      {
        "name": "Awards",
        "detail": "Celebrated as a national hero and freedom fighter in India"
      },
      {
        "name": "Military Leadership",
        "detail": "Raised an army, commanded troops, and led battles against the British East India Company"
      },
      {
        "name": "Famous Quote",
        "detail": "I shall not surrender. We shall fight to the last drop of our blood."
      },
      {
        "name": "Death",
        "detail": "18 June 1858 at Gwalior Fort, killed fighting the British"
      },
      {
        "name": "Why Famous",
        "detail": "Became the face of the 1857 Indian Rebellion, the first organized revolt against British rule. Her courage and fighting spirit made her a legendary warrior queen. Inspired women and freedom fighters with her sacrifice for independence."
      }
    ],
    "faqs": [
      {
        "q": "What was the 1857 Indian Rebellion?",
        "a": "It was the first major organized revolt against British colonial rule in India, led by various Indian leaders including Rani Lakshmibai."
      },
      {
        "q": "Why is Rani Lakshmibai important for Indian women?",
        "a": "She became an inspiration to Indian women by leading armies in battle and fighting for freedom, breaking traditional gender barriers."
      }
    ]
  },
  {
    "slug": "biography-of-bhagat-singh",
    "title": "Biography of Bhagat Singh",
    "category": "Biography",
    "intro": "Bhagat Singh was a revolutionary independence fighter who became the symbol of youth resistance against British rule. He sacrificed his life at age 23 for Indian independence.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Bhagat Singh"
      },
      {
        "name": "Born",
        "detail": "28 September 1907 in Khanna, Punjab, India"
      },
      {
        "name": "Field",
        "detail": "Revolutionary Movement, Independence Struggle, Youth Leadership"
      },
      {
        "name": "Education",
        "detail": "Attended National College and later studied at Dayanand Anglo-Vedic College"
      },
      {
        "name": "Major Contributions",
        "detail": "Joined the revolutionary movement at a young age and became a leader of Hindu Mahasabha's youth wing. Participated in bombing the Central Legislative Assembly in Delhi in 1929 to protest against repressive laws. Led armed resistance against British rule. His sacrifice at a young age inspired the Indian independence movement."
      },
      {
        "name": "Awards",
        "detail": "Called 'Shaheed' (martyr) Bhagat Singh, revered as a national hero"
      },
      {
        "name": "Key Actions",
        "detail": "Participated in the bombing of Central Legislative Assembly (1929) to protest the Public Safety Bill"
      },
      {
        "name": "Famous Quote",
        "detail": "They may kill me, but they cannot kill my ideas. They can crush my body, but they cannot crush my spirit."
      },
      {
        "name": "Death",
        "detail": "23 March 1931 in Lahore, India, hanged by the British"
      },
      {
        "name": "Why Famous",
        "detail": "Became the symbol of young, fearless resistance against British colonialism. His willingness to sacrifice at age 23 inspired millions. His revolutionary ideas about armed struggle shaped India's independence movement."
      }
    ],
    "faqs": [
      {
        "q": "Why did Bhagat Singh bomb the Central Legislative Assembly?",
        "a": "He bombed it to protest against the Public Safety Bill which gave more repressive powers to the British government."
      },
      {
        "q": "Why is Bhagat Singh important to Indian youth?",
        "a": "He became a symbol of fearless youth resistance. His sacrifice at age 23 inspired generations to fight for freedom and ideals."
      }
    ]
  },
  {
    "slug": "biography-of-swami-vivekananda",
    "title": "Biography of Swami Vivekananda",
    "category": "Biography",
    "intro": "Swami Vivekananda was a spiritual leader and social reformer who brought Hindu philosophy to the Western world. He believed in the unity of all religions and the potential of Indian youth.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Narendranath Datta (given name), later known as Swami Vivekananda"
      },
      {
        "name": "Born",
        "detail": "12 January 1863 in Kolkata, West Bengal, India"
      },
      {
        "name": "Field",
        "detail": "Spirituality, Philosophy, Social Reform, Education"
      },
      {
        "name": "Education",
        "detail": "Studied at Hindu College and later became a monk under Sri Ramakrishna Paramahamsa"
      },
      {
        "name": "Major Contributions",
        "detail": "Introduced Hindu philosophy and Vedanta to the Western world through speeches and writings. Founded the Ramakrishna Mission to promote social service and education. Advocated for the uplift of Indian youth and women's education. Promoted the unity of all religions and spiritual development combined with social action."
      },
      {
        "name": "Awards",
        "detail": "Revered as a spiritual leader and social reformer in India"
      },
      {
        "name": "Key Achievements",
        "detail": "Represented India at the Parliament of Religions in Chicago in 1893. Established the Ramakrishna Mission for social welfare and education."
      },
      {
        "name": "Famous Quote",
        "detail": "Arise, awake, and stop not till the goal is reached."
      },
      {
        "name": "Death",
        "detail": "4 July 1902 in Kolkata, India"
      },
      {
        "name": "Why Famous",
        "detail": "Brought Indian spiritual philosophy to the world and showed the relevance of Hindu teachings to modern problems. Founded the Ramakrishna Mission which continues social work. Inspired Indian youth through his messages of strength, education, and service."
      }
    ],
    "faqs": [
      {
        "q": "What is the Ramakrishna Mission?",
        "a": "It is an organization founded by Swami Vivekananda to promote social service, education, and spiritual development based on Sri Ramakrishna's teachings."
      },
      {
        "q": "What did Swami Vivekananda say about religion?",
        "a": "He believed in the unity of all religions and said that all religions are paths to the same goal of knowing God."
      }
    ]
  },
  {
    "slug": "biography-of-rabindranath-tagore",
    "title": "Biography of Rabindranath Tagore",
    "category": "Biography",
    "intro": "Rabindranath Tagore was a renowned poet, musician, and philosopher who won the Nobel Prize in Literature. He wrote Jana Gana Mana, India's national anthem, and revolutionized Indian literature and education.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Rabindranath Thakur (Tagore)"
      },
      {
        "name": "Born",
        "detail": "7 May 1861 in Kolkata, West Bengal, India"
      },
      {
        "name": "Field",
        "detail": "Literature, Poetry, Music, Philosophy, Education"
      },
      {
        "name": "Education",
        "detail": "Studied at University of London. Self-educated through extensive reading and travel"
      },
      {
        "name": "Major Contributions",
        "detail": "Wrote Jana Gana Mana which became India's national anthem. Won the Nobel Prize in Literature for his poetry collection Gitanjali. Created new forms of Bengali literature and revolutionized Indian education through Visva-Bharati University. Composed over 2,000 songs and wrote plays, novels, and essays that explored spirituality and social issues."
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Literature (1913), Knighthood (1915), Bharat Ratna (1955)"
      },
      {
        "name": "Educational Innovation",
        "detail": "Founded Visva-Bharati University, an institution promoting education that combines Indian and Western knowledge"
      },
      {
        "name": "Famous Quote",
        "detail": "The butterfly counts not months but moments, and has time enough."
      },
      {
        "name": "Death",
        "detail": "7 August 1941 in Kolkata, India"
      },
      {
        "name": "Why Famous",
        "detail": "First non-European to win the Nobel Prize in Literature. Wrote the Indian national anthem Jana Gana Mana. Revolutionized Bengali literature and education through innovative teaching methods that influenced global education philosophy."
      }
    ],
    "faqs": [
      {
        "q": "What is Jana Gana Mana?",
        "a": "It is a song written by Rabindranath Tagore that became India's national anthem after independence."
      },
      {
        "q": "What was Visva-Bharati University?",
        "a": "It is an educational institution founded by Tagore to promote learning that combines Indian heritage with modern knowledge."
      }
    ]
  },
  {
    "slug": "biography-of-mother-teresa",
    "title": "Biography of Mother Teresa",
    "category": "Biography",
    "intro": "Mother Teresa was an Albanian-born nun who worked in Kolkata, India to serve the poorest of the poor. She founded the Missionaries of Charity and won the Nobel Peace Prize for her humanitarian work.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Anjeze Gonxhe Bojaxhiu (born name), known as Mother Teresa"
      },
      {
        "name": "Born",
        "detail": "26 August 1910 in Skopje (now in North Macedonia)"
      },
      {
        "name": "Field",
        "detail": "Humanitarian Work, Social Service, Religion, Charity"
      },
      {
        "name": "Education",
        "detail": "Joined the Sisters of Loreto and later became a nun"
      },
      {
        "name": "Major Contributions",
        "detail": "Dedicated her life to serving the poorest and sickest people in Kolkata, India. Founded the Missionaries of Charity organization that operates homes for the dying, orphanages, and hospitals. Provided care and dignity to those society had abandoned. Her work inspired millions to engage in humanitarian service worldwide."
      },
      {
        "name": "Awards",
        "detail": "Nobel Peace Prize (1979), Bharat Ratna (1980), Blessed by the Catholic Church"
      },
      {
        "name": "Key Achievements",
        "detail": "Established homes for the dying, orphanages, and centers for people with leprosy in Kolkata. Expanded work to other countries."
      },
      {
        "name": "Famous Quote",
        "detail": "Not all of us can do great things. But we can do small things with great love."
      },
      {
        "name": "Death",
        "detail": "5 September 1997 in Kolkata, India"
      },
      {
        "name": "Why Famous",
        "detail": "Won the Nobel Peace Prize for her humanitarian work with the poorest people in Kolkata. Her Missionaries of Charity continues serving the needy worldwide. Became a symbol of compassion and selfless service to humanity."
      }
    ],
    "faqs": [
      {
        "q": "What is the Missionaries of Charity?",
        "a": "It is an organization founded by Mother Teresa to serve the poorest and most vulnerable people through hospitals, homes, and care centers."
      },
      {
        "q": "Why did Mother Teresa come to India?",
        "a": "She felt called to serve the poorest people in Kolkata and dedicated her life to caring for the sick, dying, and orphaned."
      }
    ]
  },
  {
    "slug": "biography-of-albert-einstein",
    "title": "Biography of Albert Einstein",
    "category": "Biography",
    "intro": "Albert Einstein was a German-born physicist who developed the theory of relativity, one of the most important theories in modern science. His work revolutionized our understanding of space, time, and energy.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Albert Einstein"
      },
      {
        "name": "Born",
        "detail": "14 March 1879 in Ulm, Germany"
      },
      {
        "name": "Field",
        "detail": "Physics, Relativity, Quantum Theory"
      },
      {
        "name": "Education",
        "detail": "Studied at Swiss Federal Polytechnic and earned a doctorate in physics"
      },
      {
        "name": "Major Contributions",
        "detail": "Developed the Special Theory of Relativity (1905) showing that time and space are relative. Developed the General Theory of Relativity (1915) explaining gravity through curved spacetime. Established the famous equation E=mc² showing mass-energy equivalence. His theories transformed physics and our understanding of the universe."
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Physics (1921), many honorary doctorates and awards"
      },
      {
        "name": "Scientific Legacy",
        "detail": "His theories form the foundation of modern physics. Relativity explains black holes, the Big Bang, and gravitational waves."
      },
      {
        "name": "Famous Quote",
        "detail": "Imagination is more important than knowledge. Knowledge is limited."
      },
      {
        "name": "Death",
        "detail": "18 April 1955 in Princeton, New Jersey, USA"
      },
      {
        "name": "Why Famous",
        "detail": "Developed the Theory of Relativity which revolutionized physics and our understanding of the universe. The equation E=mc² became famous worldwide. His work laid the foundation for modern physics, nuclear energy, and cosmology."
      }
    ],
    "faqs": [
      {
        "q": "What is the Theory of Relativity?",
        "a": "It is Einstein's theory showing that space and time are relative and connected. It explains how gravity works through curved spacetime."
      },
      {
        "q": "What does E=mc² mean?",
        "a": "It shows that energy equals mass multiplied by the speed of light squared, proving mass and energy are interchangeable."
      }
    ]
  },
  {
    "slug": "biography-of-isaac-newton",
    "title": "Biography of Isaac Newton",
    "category": "Biography",
    "intro": "Isaac Newton was an English mathematician and physicist who discovered the laws of motion and universal gravitation. He founded classical mechanics and made groundbreaking contributions to optics.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Sir Isaac Newton"
      },
      {
        "name": "Born",
        "detail": "4 January 1643 in Woolsthorpe, England (in Old Calendar)"
      },
      {
        "name": "Field",
        "detail": "Physics, Mathematics, Optics, Gravity"
      },
      {
        "name": "Education",
        "detail": "Attended Trinity College, Cambridge where he studied mathematics and natural philosophy"
      },
      {
        "name": "Major Contributions",
        "detail": "Discovered the three laws of motion that form the foundation of classical mechanics. Developed the law of universal gravitation showing that all objects attract each other. Made breakthroughs in optics including discovering that white light is made of colors. Developed calculus independently."
      },
      {
        "name": "Awards",
        "detail": "Knighthood (1705), Fellow of the Royal Society, President of the Royal Society"
      },
      {
        "name": "Key Work",
        "detail": "Published Principia Mathematica in 1687, a foundational work in physics and mathematics"
      },
      {
        "name": "Famous Quote",
        "detail": "If I have seen further, it is by standing on the shoulders of giants."
      },
      {
        "name": "Death",
        "detail": "31 March 1727 in London, England"
      },
      {
        "name": "Why Famous",
        "detail": "Discovered the laws of motion and gravity, founding classical mechanics. His work explained the movements of planets and objects. Remained the foundation of physics for 200 years until Einstein's relativity."
      }
    ],
    "faqs": [
      {
        "q": "What are Newton's laws of motion?",
        "a": "They are three fundamental laws describing how objects move and respond to forces, forming the basis of classical mechanics."
      },
      {
        "q": "What is the law of universal gravitation?",
        "a": "It states that every object in the universe attracts every other object with a force proportional to their masses and inversely proportional to the square of the distance between them."
      }
    ]
  },
  {
    "slug": "biography-of-marie-curie",
    "title": "Biography of Marie Curie",
    "category": "Biography",
    "intro": "Marie Curie was a Polish-born physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Maria Sklodowska Curie"
      },
      {
        "name": "Born",
        "detail": "7 November 1867 in Warsaw, Poland"
      },
      {
        "name": "Field",
        "detail": "Physics, Chemistry, Radioactivity"
      },
      {
        "name": "Education",
        "detail": "Studied at the Sorbonne University in Paris, earned degrees in physics and mathematics"
      },
      {
        "name": "Major Contributions",
        "detail": "Discovered the elements polonium and radium through research on radioactivity. Won Nobel Prize in Physics (1903) with Pierre Curie and Becquerel. Won Nobel Prize in Chemistry (1911) for discovering radium. Her work on radioactivity laid the foundation for nuclear physics and medicine."
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Physics (1903), Nobel Prize in Chemistry (1911), Davy Medal (1903)"
      },
      {
        "name": "Scientific Legacy",
        "detail": "Discovered two new elements and developed techniques for isolating radioactive isotopes. Her work enabled medical treatments using radioactive elements."
      },
      {
        "name": "Famous Quote",
        "detail": "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves."
      },
      {
        "name": "Death",
        "detail": "4 July 1934 in Passy, France due to aplastic anemia caused by radiation exposure"
      },
      {
        "name": "Why Famous",
        "detail": "First woman to win a Nobel Prize and only person to win Nobels in two different sciences. Discovered radioactive elements that revolutionized medicine and physics. Persevered despite gender discrimination in science."
      }
    ],
    "faqs": [
      {
        "q": "What did Marie Curie discover?",
        "a": "She discovered the elements polonium and radium through her research on radioactivity."
      },
      {
        "q": "Why is Marie Curie important for women in science?",
        "a": "She was the first woman to win a Nobel Prize and succeeded in science despite discrimination, inspiring women to pursue scientific careers."
      }
    ]
  },
  {
    "slug": "biography-of-thomas-edison",
    "title": "Biography of Thomas Edison",
    "category": "Biography",
    "intro": "Thomas Edison was an American inventor and businessman who developed the practical light bulb and numerous other electrical devices. He founded companies that shaped the modern power industry.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Thomas Alva Edison"
      },
      {
        "name": "Born",
        "detail": "11 February 1847 in Milan, Ohio, USA"
      },
      {
        "name": "Field",
        "detail": "Invention, Electrical Engineering, Technology"
      },
      {
        "name": "Education",
        "detail": "Had limited formal education but was largely self-taught through reading and experimentation"
      },
      {
        "name": "Major Contributions",
        "detail": "Developed the practical incandescent light bulb with a long-lasting filament in 1879. Invented the phonograph for recording and playing sound. Created electrical power distribution systems. Held over 1,000 patents. His inventions transformed electricity into a practical technology for homes and businesses."
      },
      {
        "name": "Awards",
        "detail": "Numerous awards and honors, named as one of the greatest inventors in history"
      },
      {
        "name": "Business Ventures",
        "detail": "Founded Edison Electric Light Company and General Electric, major electrical companies"
      },
      {
        "name": "Famous Quote",
        "detail": "Genius is one percent inspiration, ninety-nine percent perspiration."
      },
      {
        "name": "Death",
        "detail": "18 October 1931 in West Orange, New Jersey, USA"
      },
      {
        "name": "Why Famous",
        "detail": "Developed the practical light bulb and power distribution systems that brought electricity to homes and cities. Held over 1,000 patents making him one of history's most prolific inventors. His work revolutionized modern life."
      }
    ],
    "faqs": [
      {
        "q": "What did Thomas Edison invent?",
        "a": "He developed the practical incandescent light bulb, the phonograph, and electrical power distribution systems among many other devices."
      },
      {
        "q": "How many patents did Thomas Edison hold?",
        "a": "Edison held over 1,000 patents in various fields including electrical systems, lighting, and sound recording."
      }
    ]
  },
  {
    "slug": "biography-of-charles-darwin",
    "title": "Biography of Charles Darwin",
    "category": "Biography",
    "intro": "Charles Darwin was an English naturalist who developed the theory of evolution by natural selection. His work explained the diversity of life on Earth and became the foundation of modern biology.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Charles Robert Darwin"
      },
      {
        "name": "Born",
        "detail": "12 February 1809 in Shrewsbury, England"
      },
      {
        "name": "Field",
        "detail": "Biology, Evolution, Natural History"
      },
      {
        "name": "Education",
        "detail": "Studied at University of Cambridge and took a voyage on HMS Beagle as a naturalist"
      },
      {
        "name": "Major Contributions",
        "detail": "Developed the theory of evolution by natural selection explaining how species change over time. Observed that organisms with beneficial traits survive and reproduce more successfully. His theory explained the diversity of life and how all living things are related. Revolutionized biology and our understanding of life's origins."
      },
      {
        "name": "Awards",
        "detail": "Fellow of the Royal Society (1839), Copley Medal (1864)"
      },
      {
        "name": "Key Work",
        "detail": "Published 'On the Origin of Species' in 1859, one of the most influential books in science"
      },
      {
        "name": "Famous Quote",
        "detail": "It is not the strongest of the species that survives, but the most adaptable to change."
      },
      {
        "name": "Death",
        "detail": "19 April 1882 in Down, England"
      },
      {
        "name": "Why Famous",
        "detail": "Developed the theory of evolution by natural selection which became the foundation of modern biology. Explained how all living things are related and how species adapt and change over time. His work influenced science, philosophy, and society."
      }
    ],
    "faqs": [
      {
        "q": "What is the theory of evolution by natural selection?",
        "a": "It explains that organisms with traits suited to their environment survive and reproduce more successfully, passing beneficial traits to offspring."
      },
      {
        "q": "What was the HMS Beagle voyage?",
        "a": "A five-year voyage where Darwin traveled around the world observing plants and animals, collecting evidence for his evolutionary theory."
      }
    ]
  },
  {
    "slug": "biography-of-aryabhata",
    "title": "Biography of Aryabhata",
    "category": "Biography",
    "intro": "Aryabhata was an ancient Indian mathematician and astronomer who lived in the 5th century. He made groundbreaking discoveries in mathematics and astronomy that influenced the development of science worldwide.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Aryabhata"
      },
      {
        "name": "Born",
        "detail": "476 CE in Pataliputra (modern day Patna), Bihar, India"
      },
      {
        "name": "Field",
        "detail": "Mathematics, Astronomy, Trigonometry"
      },
      {
        "name": "Education",
        "detail": "Studied in the ancient Indian university and developed mathematical knowledge through observation and reasoning"
      },
      {
        "name": "Major Contributions",
        "detail": "Calculated the value of pi (π) to four decimal places (3.1416), astonishingly accurate for his time. Explained that Earth rotates on its axis, centuries before Copernicus. Developed the concept of zero as a number and position value in a decimal system. Created mathematical formulas for trigonometry and planetary positions."
      },
      {
        "name": "Awards",
        "detail": "Revered as a great mathematician and astronomer in ancient India"
      },
      {
        "name": "Scientific Work",
        "detail": "Wrote the Aryabhatiya, a comprehensive text on mathematics and astronomy in verse form"
      },
      {
        "name": "Famous Concept",
        "detail": "Explained the Earth's rotation and the positions of planets, showing deep astronomical knowledge"
      },
      {
        "name": "Death",
        "detail": "Around 550 CE (exact details not known)"
      },
      {
        "name": "Why Famous",
        "detail": "Made extraordinary discoveries in mathematics and astronomy over 1500 years ago. His work on zero, pi, and the Earth's rotation influenced mathematical and scientific development worldwide. Demonstrated the advanced knowledge of ancient Indian science."
      }
    ],
    "faqs": [
      {
        "q": "What did Aryabhata contribute to mathematics?",
        "a": "He calculated pi accurately, developed the concept of zero as a number, and created mathematical formulas for trigonometry."
      },
      {
        "q": "What did Aryabhata say about the Earth?",
        "a": "He explained that Earth rotates on its axis daily, a concept that was proven centuries later by Western astronomers."
      }
    ]
  },
  {
    "slug": "biography-of-kalpana-chawla",
    "title": "Biography of Kalpana Chawla",
    "category": "Biography",
    "intro": "Kalpana Chawla was an Indian-American astronaut who was the first woman of Indian origin to go to space. She lost her life in the Space Shuttle Columbia tragedy but remains a symbol of aspiration and courage.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Kalpana Chawla"
      },
      {
        "name": "Born",
        "detail": "17 March 1962 in Karnal, Haryana, India"
      },
      {
        "name": "Field",
        "detail": "Astronautics, Space Exploration, Aeronautical Engineering"
      },
      {
        "name": "Education",
        "detail": "Earned a degree in aeronautical engineering from Punjab Engineering College. Earned a PhD in aerospace engineering from University of Colorado"
      },
      {
        "name": "Major Contributions",
        "detail": "Became the first woman of Indian origin to travel to space. Completed two Space Shuttle missions for NASA. Conducted scientific experiments in space. Her determination to pursue her dream despite challenges inspired millions of Indian women to pursue careers in science and space."
      },
      {
        "name": "Awards",
        "detail": "Recognized as a NASA astronaut, received various honors for her scientific contributions"
      },
      {
        "name": "Space Missions",
        "detail": "Flew on Space Shuttle Columbia in 1997 and 2003, conducting scientific experiments in orbit"
      },
      {
        "name": "Famous Quote",
        "detail": "I wanted to be a pilot and fly fast jets. But when I was young, that dream seemed impossible."
      },
      {
        "name": "Death",
        "detail": "1 February 2003 in Space Shuttle Columbia disaster during reentry over Texas, USA"
      },
      {
        "name": "Why Famous",
        "detail": "First woman of Indian origin to go to space, breaking barriers and inspiring millions. Her courage and dedication to space exploration made her a role model for Indian women. Her sacrifice in the Columbia disaster honored her memory as a space pioneer."
      }
    ],
    "faqs": [
      {
        "q": "What was Kalpana Chawla's achievement in space?",
        "a": "She became the first woman of Indian origin to travel to space and completed two Space Shuttle missions for NASA."
      },
      {
        "q": "Why is Kalpana Chawla important for Indian women?",
        "a": "She showed that Indian women can achieve greatness in space science, inspiring millions to pursue careers in science and engineering."
      }
    ]
  },
  {
    "slug": "biography-of-sundar-pichai",
    "title": "Biography of Sundar Pichai",
    "category": "Biography",
    "intro": "Sundar Pichai is an Indian-American technology executive who is the CEO of Google and Alphabet. He rose from humble beginnings to lead one of the world's most influential technology companies.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Pichai Sundararajan (Sundar Pichai)"
      },
      {
        "name": "Born",
        "detail": "12 July 1972 in Madras (Chennai), Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Technology, Software Engineering, Business Leadership"
      },
      {
        "name": "Education",
        "detail": "Graduated from IIT Kharagpur with degree in metallurgical engineering. Earned MS from Stanford University in material science"
      },
      {
        "name": "Major Contributions",
        "detail": "Became the CEO of Google in 2015 and later CEO of parent company Alphabet in 2019. Led the development and growth of Chrome browser and Android operating system. Oversees products used by billions of people worldwide. Advocates for responsible AI development and digital inclusion."
      },
      {
        "name": "Awards",
        "detail": "Named one of the most influential business leaders in the world"
      },
      {
        "name": "Key Achievements",
        "detail": "Grew Chrome to become the world's most popular web browser. Oversaw Android's expansion to billions of users. Became one of the highest-paid executives in tech industry."
      },
      {
        "name": "Famous Quote",
        "detail": "AI is one of the most profound things we are working on as humanity."
      },
      {
        "name": "Personal Background",
        "detail": "Grew up in modest circumstances in Chennai, India with limited access to technology"
      },
      {
        "name": "Why Famous",
        "detail": "Rose from middle-class background in India to become CEO of Google and Alphabet. Represents the potential of Indian talent in global technology. His success inspires millions of Indian youth to pursue careers in technology and innovation."
      }
    ],
    "faqs": [
      {
        "q": "What is Sundar Pichai's role at Google?",
        "a": "He is the CEO of Google (since 2015) and CEO of parent company Alphabet (since 2019), overseeing all operations and strategy."
      },
      {
        "q": "What major products did Sundar Pichai develop?",
        "a": "He played key roles in developing Chrome browser and Android operating system, both used by billions of people worldwide."
      }
    ]
  },
  {
    "slug": "famous-lakes-of-india",
    "title": "Famous Lakes of India",
    "category": "Geography",
    "intro": "India is home to numerous scenic and ecologically significant lakes that play crucial roles in agriculture, tourism, and biodiversity conservation. These freshwater and saltwater lakes are distributed across different regions and serve as vital water resources for millions of people.",
    "items": [
      {
        "name": "Dal Lake",
        "detail": "Located in Srinagar, Jammu and Kashmir; famous for houseboats and beautiful gardens; major freshwater lake in Kashmir valley"
      },
      {
        "name": "Loktak Lake",
        "detail": "Situated in Manipur; unique for its floating islands called Loktak Pat; largest freshwater lake in Northeast India"
      },
      {
        "name": "Chilika Lake",
        "detail": "Located in Odisha; largest brackish water lake in India; important wetland and bird sanctuary; serves as a lagoon"
      },
      {
        "name": "Wular Lake",
        "detail": "Found in Jammu and Kashmir; deepest freshwater lake in India; important for fishing and irrigation"
      },
      {
        "name": "Vembanad Lake",
        "detail": "Largest backwater lake in Kerala; important for biodiversity and migratory bird sanctuary; supports fishing industry"
      },
      {
        "name": "Saltpan Lake",
        "detail": "Located in Tamil Nadu; largest man-made lake in India; major source of salt production"
      },
      {
        "name": "Sambhar Lake",
        "detail": "Situated in Rajasthan; largest inland salt water lake in India; important for salt extraction and flamingo breeding"
      },
      {
        "name": "Tso Moriri",
        "detail": "Located in Ladakh at high altitude; pristine Himalayan lake; important for migratory birds; area of high altitude aquatic biodiversity"
      },
      {
        "name": "Baikal",
        "detail": "One of the deepest freshwater lakes in the world; located in Russia; supports unique species and tourism"
      },
      {
        "name": "Pichola Lake",
        "detail": "Artificial freshwater lake in Udaipur, Rajasthan; surrounded by palaces and temples; major tourist attraction"
      },
      {
        "name": "Ashtamudi Lake",
        "detail": "Located in Kerala; second largest backwater; important for spice trade and fishing activities"
      },
      {
        "name": "Tsomgo Lake",
        "detail": "Glacial lake in Sikkim; located at high altitude; surrounded by mountains; important tourist destination"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest lake in India?",
        "a": "Chilika Lake in Odisha is the largest brackish water lake, while Sambhar Lake in Rajasthan is the largest inland salt water lake in India."
      },
      {
        "q": "What is the ecological importance of Indian lakes?",
        "a": "Indian lakes serve as vital water resources for agriculture and drinking water, support biodiversity and migratory birds, help in salt and fish production, and maintain ecological balance in their regions."
      }
    ]
  },
  {
    "slug": "important-dams-of-india",
    "title": "Important Dams of India",
    "category": "Geography",
    "intro": "Dams are crucial infrastructure projects that provide water for irrigation, drinking, and hydroelectric power generation across India. These engineering marvels regulate river flow, prevent floods, and support millions of lives.",
    "items": [
      {
        "name": "Bhakra Nangal Dam",
        "detail": "Located on Sutlej River in Himachal Pradesh; one of the highest straight gravity dams in the world; built in 1963; generates significant hydroelectric power"
      },
      {
        "name": "Tehri Dam",
        "detail": "Situated on Bhagirathi River in Uttarakhand; highest earth dam in India; completed in 2006; multipurpose project for irrigation and power"
      },
      {
        "name": "Sardar Sarovar Dam",
        "detail": "Located on Narmada River in Gujarat; one of the world's highest gravity dams; major irrigation and power project; constructed for flood control"
      },
      {
        "name": "Hirakud Dam",
        "detail": "Built on Mahanadi River in Odisha; second longest dam in India; serves for irrigation, flood control, and hydroelectric power generation"
      },
      {
        "name": "Indira Sagar Dam",
        "detail": "Constructed on Narmada River in Madhya Pradesh; one of the highest dams in India; major irrigation project and power generation"
      },
      {
        "name": "Mettur Dam",
        "detail": "Located on Kaveri River in Tamil Nadu; one of the oldest dams in India; important for irrigation and hydroelectric generation"
      },
      {
        "name": "Koyna Dam",
        "detail": "Situated on Koyna River in Maharashtra; multipurpose dam; important for irrigation and power generation; associated with seismic activity"
      },
      {
        "name": "Maithon Dam",
        "detail": "Built on Barakar River in Jharkhand; multipurpose project serving irrigation and hydroelectric power; important for flood management"
      },
      {
        "name": "Ravi Dam",
        "detail": "Located on Ravi River; part of irrigation projects in Punjab; serves for water supply to agricultural regions"
      },
      {
        "name": "Grand Anicut",
        "detail": "Ancient dam on Kaveri River in Tamil Nadu; built during Chola period; one of the oldest irrigation structures in South India"
      },
      {
        "name": "Kairouan Dam",
        "detail": "Built on river in Jharkhand; multipurpose project serving irrigation purposes; important for regional water management"
      },
      {
        "name": "Tarbela Dam",
        "detail": "Located in Pakistan on Indus River; one of the largest earth dams globally; important trans-boundary water resource project"
      }
    ],
    "faqs": [
      {
        "q": "What are the main purposes of dams in India?",
        "a": "Dams serve multiple purposes including irrigation for agriculture, drinking water supply, hydroelectric power generation, flood control, and maintaining water levels during dry seasons."
      },
      {
        "q": "Which is the highest dam in India?",
        "a": "Tehri Dam is the highest earth dam in India with a height of 260.5 meters, constructed on the Bhagirathi River in Uttarakhand."
      }
    ]
  },
  {
    "slug": "indian-space-missions-timeline",
    "title": "Indian Space Missions Timeline",
    "category": "Science",
    "intro": "India has made remarkable strides in space exploration through ISRO, demonstrating technological prowess and scientific achievement. From humble beginnings to Mars missions, Indian space programs have contributed significantly to global space exploration.",
    "items": [
      {
        "name": "Aryabhata",
        "detail": "First Indian satellite launched on April 19, 1975; named after ancient Indian astronomer; marked India's entry into space technology"
      },
      {
        "name": "Bhaskara I",
        "detail": "Second Indian satellite launched on June 7, 1979; Earth observation satellite; advanced remote sensing capabilities"
      },
      {
        "name": "Rohini Series",
        "detail": "Series of experimental satellites launched in late 1970s; tested Indian SLV-3 rocket; contributed to satellite technology development"
      },
      {
        "name": "Chandrayaan-1",
        "detail": "Lunar orbiter mission launched on October 22, 2008; discovered water molecules on Moon; revolutionized lunar exploration understanding"
      },
      {
        "name": "Chandrayaan-2",
        "detail": "Lunar mission launched on July 22, 2019; comprised orbiter, lander, and rover; mapped lunar south pole region"
      },
      {
        "name": "Mangalyaan",
        "detail": "Mars Orbiter Mission launched on November 5, 2013; successfully reached Mars orbit in September 2014; demonstrated cost-effective deep space exploration"
      },
      {
        "name": "Astrosat",
        "detail": "Multi-wavelength space telescope launched on September 28, 2015; observes space in ultraviolet and X-ray wavelengths; India's first space telescope"
      },
      {
        "name": "Gaganyaan Program",
        "detail": "India's human spaceflight program; aims to send Indian astronauts to space; expected to launch crewed missions in 2025-2026"
      },
      {
        "name": "Aditya-L1",
        "detail": "Solar mission launched on September 2, 2023; studies Sun's corona; second mission after Chandrayaan-2 to Lagrangian point"
      },
      {
        "name": "SoMo Mission",
        "detail": "Solar sail and momentum exchange band concept missions under development; future missions for advanced space exploration"
      },
      {
        "name": "Chandrayaan-3",
        "detail": "Third lunar mission launched on July 14, 2023; successfully landed on Moon's south pole on August 23, 2023; demonstrated landing precision"
      },
      {
        "name": "XPoSat",
        "detail": "X-ray Polarimetry Satellite launched in January 2024; studies black holes and neutron stars; advances astrophysical research"
      }
    ],
    "faqs": [
      {
        "q": "What was India's first satellite and when was it launched?",
        "a": "Aryabhata was India's first satellite, launched on April 19, 1975, marking India's entry into space technology. It was named after the ancient Indian mathematician and astronomer."
      },
      {
        "q": "What is the significance of Chandrayaan-1 mission?",
        "a": "Chandrayaan-1 was a major breakthrough as it discovered water molecules on the Moon's surface in 2008, revolutionizing our understanding of lunar composition and geology."
      }
    ]
  },
  {
    "slug": "stock-exchanges-of-the-world",
    "title": "Stock Exchanges of the World",
    "category": "World",
    "intro": "Stock exchanges are vital institutions where securities are traded, facilitating capital formation and economic growth globally. They serve as barometers of economic health and enable companies and investors to participate in financial markets.",
    "items": [
      {
        "name": "New York Stock Exchange",
        "detail": "Located in New York, USA; world's largest stock exchange by market capitalization; established in 1817; trades major US companies"
      },
      {
        "name": "NASDAQ",
        "detail": "Technology-focused stock exchange in USA; world's second largest; known for high-tech and growth companies; fully electronic trading"
      },
      {
        "name": "London Stock Exchange",
        "detail": "Europe's largest stock exchange; located in London, UK; established in 1801; important for international trading"
      },
      {
        "name": "Tokyo Stock Exchange",
        "detail": "Japan's primary stock exchange; Asia's largest by volume; major indicator of Japanese economic performance"
      },
      {
        "name": "Shanghai Stock Exchange",
        "detail": "China's largest stock exchange; one of the world's largest by market cap; rapidly growing exchange in Asia"
      },
      {
        "name": "Bombay Stock Exchange",
        "detail": "India's oldest and largest stock exchange; established in 1875; located in Mumbai; tracks major Indian companies"
      },
      {
        "name": "National Stock Exchange of India",
        "detail": "India's second largest stock exchange; launched in 1992; fully electronic exchange; major role in Indian financial markets"
      },
      {
        "name": "Hong Kong Stock Exchange",
        "detail": "Major Asia-Pacific exchange; important for Chinese companies; international trading hub in East Asia"
      },
      {
        "name": "Deutsche Boerse",
        "detail": "Germany's primary stock exchange; located in Frankfurt; major European financial center; Xetra electronic trading platform"
      },
      {
        "name": "Singapore Exchange",
        "detail": "Southeast Asia's primary stock exchange; international trading hub; important for Asian markets"
      },
      {
        "name": "Toronto Stock Exchange",
        "detail": "Canada's largest stock exchange; major source of capital for Canadian companies; important mining stocks trading"
      },
      {
        "name": "Australian Securities Exchange",
        "detail": "Australia's primary stock exchange; located in Sydney; major trading center for Australia and Asia-Pacific region"
      }
    ],
    "faqs": [
      {
        "q": "What is the world's largest stock exchange by market capitalization?",
        "a": "The New York Stock Exchange (NYSE) in the United States is the world's largest stock exchange by market capitalization, having been established in 1817."
      },
      {
        "q": "When was the Bombay Stock Exchange established and what is its significance?",
        "a": "The Bombay Stock Exchange was established in 1875, making it Asia's oldest stock exchange. It is India's oldest and largest stock exchange, located in Mumbai, and plays a crucial role in India's financial system."
      }
    ]
  },
  {
    "slug": "indian-defence-exercises",
    "title": "Indian Defence Exercises",
    "category": "India",
    "intro": "India conducts regular military exercises to enhance preparedness, test combat capabilities, and strengthen international military cooperation. These exercises involve the Army, Navy, and Air Force working together or with allied nations.",
    "items": [
      {
        "name": "Exercise Surya Kiran",
        "detail": "Joint Indo-Thai Army exercise; conducted annually; focuses on counter-terrorism and disaster management; strengthens bilateral military cooperation"
      },
      {
        "name": "Exercise Malabar",
        "detail": "Naval exercise involving India, USA, and Japan; quadrilateral cooperation; aims to enhance maritime security in Indo-Pacific region"
      },
      {
        "name": "Exercise Yudh Abhyas",
        "detail": "Joint Indo-US military exercise; conducted between armies; focuses on counter-terrorism operations and tactical training"
      },
      {
        "name": "Exercise Indra",
        "detail": "Joint Indo-Russian military exercise; conducted in various locations; strengthens India-Russia military partnership"
      },
      {
        "name": "Exercise Jimex",
        "detail": "Joint India-Japan maritime exercise; focuses on naval coordination and maritime security in Indian Ocean region"
      },
      {
        "name": "Exercise Hand-in-Hand",
        "detail": "Joint Indo-China military exercise; conducted biennially; aims for confidence building and disaster management cooperation"
      },
      {
        "name": "Exercise Garuda",
        "detail": "Joint Indo-France air exercise; enhances aerial combat capabilities; conducted with French Air Force"
      },
      {
        "name": "Exercise Shoorveer",
        "detail": "Joint India-UK military exercise; demonstrates operational cooperation and combat readiness between nations"
      },
      {
        "name": "Astra Exercise",
        "detail": "Indian Air Force combat exercise; air defense and offensive operations; held biennially with multiple squadrons"
      },
      {
        "name": "Desert Knight Exercise",
        "detail": "Joint India-Qatar military exercise; focuses on counter-terrorism and tactical operations"
      },
      {
        "name": "Exercise Samudra Shakti",
        "detail": "Maritime exercise involving Indian Navy; focuses on naval operations and sea control in strategic regions"
      },
      {
        "name": "Exercise Khanjar",
        "detail": "Indian Army combat exercise; rapid mechanized operations; tests strike capabilities and military readiness"
      }
    ],
    "faqs": [
      {
        "q": "What is the purpose of military exercises conducted by India?",
        "a": "Indian military exercises aim to enhance operational readiness, test combat capabilities, improve coordination between services, strengthen bilateral and multilateral partnerships, and address contemporary security challenges including counter-terrorism and maritime security."
      },
      {
        "q": "Which country does India conduct the most number of joint military exercises with?",
        "a": "India conducts regular joint exercises with multiple countries including USA, Russia, Japan, France, and UK, with USA and Russia being among the most frequent partners for various service-level exercises."
      }
    ]
  },
  {
    "slug": "folk-dances-by-state",
    "title": "Folk Dances by State",
    "category": "India",
    "intro": "India's rich cultural heritage is reflected in the diverse folk dances of various states, each telling stories of local traditions, customs, and celebrations. These dances are integral to festivals and social gatherings across the country.",
    "items": [
      {
        "name": "Bhangra",
        "detail": "Folk dance of Punjab; performed during harvest festivals; energetic dance with drums and lively movements; associated with celebrations"
      },
      {
        "name": "Garbha",
        "detail": "Traditional dance of Gujarat; circular formation with clapping; performed during Navratri festival; celebrates feminine energy"
      },
      {
        "name": "Dandiya",
        "detail": "Gujarati folk dance with stick play; performed during Navratri; rhythmic stick dancing with traditional music"
      },
      {
        "name": "Kathakali",
        "detail": "Classical dance form from Kerala; features elaborate costumes and makeup; tells stories from Mahabharata and Ramayana"
      },
      {
        "name": "Bharatanatyam",
        "detail": "Classical dance of Tamil Nadu; originated in temples; tells mythological stories through graceful movements"
      },
      {
        "name": "Bihu",
        "detail": "Traditional dance of Assam; performed during harvest festival Bihu; celebrates agricultural prosperity and joy"
      },
      {
        "name": "Chhau",
        "detail": "Masked dance form from Jharkhand and Odisha; tells stories from mythology; combines acrobatics with storytelling"
      },
      {
        "name": "Jhumair",
        "detail": "Folk dance of Jharkhand; performed by tribal communities; celebrates harvests and social occasions"
      },
      {
        "name": "Ghoomar",
        "detail": "Traditional folk dance of Rajasthan; graceful circular movement; performed by women during festivals and celebrations"
      },
      {
        "name": "Lezim",
        "detail": "Folk dance of Maharashtra; performed with hand cymbals; energetic dance during festivals and celebrations"
      },
      {
        "name": "Manipuri",
        "detail": "Classical dance form of Manipur; lyrical and flowing movements; tells stories from Krishna's life"
      },
      {
        "name": "Kuchipudi",
        "detail": "Classical dance form of Andhra Pradesh; combines dance with drama; tells mythological stories with narrative"
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between Bhangra and Garbha dances?",
        "a": "Bhangra is a high-energy Punjabi dance performed during harvest festivals with drum accompaniment, while Garbha is a graceful circular Gujarati dance performed during Navratri with clapping and traditional music."
      },
      {
        "q": "Which folk dance is performed with stick play?",
        "a": "Dandiya is the Gujarati folk dance where dancers use sticks to create rhythmic patterns while dancing in a circular formation during Navratri celebrations."
      }
    ]
  },
  {
    "slug": "tribes-of-india",
    "title": "Tribes of India",
    "category": "India",
    "intro": "India is home to diverse tribal communities with distinct cultures, languages, and traditions spanning different regions. These indigenous peoples have rich heritage and play important roles in maintaining biodiversity and cultural diversity.",
    "items": [
      {
        "name": "Santhal",
        "detail": "Largest tribal group in India; primarily located in Jharkhand, West Bengal, and Odisha; famous for agriculture and handicrafts"
      },
      {
        "name": "Gond",
        "detail": "Second largest tribal group; spread across Madhya Pradesh, Chhattisgarh, and Telangana; known for traditional painting and art forms"
      },
      {
        "name": "Bhil",
        "detail": "Widespread tribal community in central and western India; found in Madhya Pradesh, Gujarat, and Rajasthan; skilled hunters and farmers"
      },
      {
        "name": "Bastar",
        "detail": "Tribal group from Chhattisgarh; known for traditional iron working and craft; rich cultural heritage; concentrated in Bastar region"
      },
      {
        "name": "Khasi",
        "detail": "Matrilineal tribal community of Meghalaya; unique social structure with female inheritance; agriculture-based economy"
      },
      {
        "name": "Naga",
        "detail": "Tribal group from Northeast India; primarily in Nagaland; known for distinctive culture and Hornbill Festival; warrior heritage"
      },
      {
        "name": "Mizo",
        "detail": "Tribal community of Mizoram; culturally vibrant with strong traditions; engaged in agriculture and handicrafts; organized social structure"
      },
      {
        "name": "Angami",
        "detail": "Sub-tribe of Naga people in Nagaland; maintains traditional practices; agricultural society with rich customs"
      },
      {
        "name": "Gadaba",
        "detail": "Tribal group of Odisha and Andhra Pradesh; known for traditional crafts and bamboo work; scattered in forest regions"
      },
      {
        "name": "Jarawa",
        "detail": "Aboriginal tribe of Andaman Islands; indigenous to island ecosystem; hunter-gatherer lifestyle; isolated community"
      },
      {
        "name": "Sentinelese",
        "detail": "Isolated tribal group of North Sentinel Island; one of the most uncontacted tribes; maintains complete isolation from outside world"
      },
      {
        "name": "Kuki",
        "detail": "Tribal community of Northeast India; primarily in Manipur and surrounding regions; engaged in agriculture and traditional crafts"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest tribal group in India?",
        "a": "The Santal (Santhal) is the largest tribal group in India, primarily located in Jharkhand, West Bengal, and Odisha, with a population of several million."
      },
      {
        "q": "What are the unique characteristics of Khasi tribes?",
        "a": "The Khasi tribes of Meghalaya are unique for their matrilineal society where property and inheritance pass through the female line, which is unusual in Indian tribal communities."
      }
    ]
  },
  {
    "slug": "biosphere-reserves-of-india",
    "title": "Biosphere Reserves of India",
    "category": "Geography",
    "intro": "Biosphere reserves are protected areas designated by UNESCO to conserve biodiversity and promote sustainable development. India has several biosphere reserves that protect diverse ecosystems and wildlife.",
    "items": [
      {
        "name": "Nilgiri Biosphere Reserve",
        "detail": "Located in Western Ghats spanning Tamil Nadu, Karnataka, and Kerala; protects montane forests and wildlife; first biosphere reserve in India"
      },
      {
        "name": "Nanda Devi Biosphere Reserve",
        "detail": "Situated in Uttarakhand; UNESCO World Heritage Site; protects alpine meadows and high-altitude ecosystems; home to endangered species"
      },
      {
        "name": "Manas Biosphere Reserve",
        "detail": "Located in Assam; UNESCO World Heritage Site; named after river; protects Bengal tigers, rhinos, and diverse wildlife"
      },
      {
        "name": "Sundarban Biosphere Reserve",
        "detail": "Located in West Bengal; world's largest mangrove forest; home to Bengal tigers; protects unique delta ecosystem"
      },
      {
        "name": "Nokrek Biosphere Reserve",
        "detail": "Situated in Meghalaya; protects subtropical forests; important for endemic species and biodiversity"
      },
      {
        "name": "Great Nicobar Biosphere Reserve",
        "detail": "Located in Andaman and Nicobar Islands; protects tropical forest ecosystem; home to endemic species and wildlife"
      },
      {
        "name": "Gulf of Mannar Biosphere Reserve",
        "detail": "Located along Tamil Nadu coast; protects marine ecosystem; important for coral reefs and sea turtles"
      },
      {
        "name": "Similipal Biosphere Reserve",
        "detail": "Situated in Odisha; protects tropical deciduous forest; important for tigers and diverse wildlife"
      },
      {
        "name": "Pachmarhi Biosphere Reserve",
        "detail": "Located in Madhya Pradesh; protects forest ecosystem with scenic landscape; important for wildlife conservation"
      },
      {
        "name": "Achanakmar Biosphere Reserve",
        "detail": "Situated in Chhattisgarh; protects tropical forest ecosystem; important for tiger conservation"
      },
      {
        "name": "Agasthyamala Biosphere Reserve",
        "detail": "Located in Western Ghats spanning Tamil Nadu and Kerala; protects high biodiversity forest ecosystem"
      },
      {
        "name": "Khangchendzonga Biosphere Reserve",
        "detail": "Situated in Sikkim; Himalayan biosphere reserve; protects alpine and forest ecosystems with rare species"
      }
    ],
    "faqs": [
      {
        "q": "What is the purpose of biosphere reserves in India?",
        "a": "Biosphere reserves are established to conserve biodiversity, protect endangered species and their habitats, promote scientific research, and encourage sustainable development practices that balance conservation with human needs."
      },
      {
        "q": "Which was the first biosphere reserve established in India?",
        "a": "The Nilgiri Biosphere Reserve in the Western Ghats was the first biosphere reserve established in India, spanning across Tamil Nadu, Karnataka, and Kerala."
      }
    ]
  },
  {
    "slug": "unesco-world-heritage-sites-in-india",
    "title": "UNESCO World Heritage Sites in India",
    "category": "India",
    "intro": "UNESCO World Heritage Sites in India represent outstanding universal value, showcasing the country's rich cultural and natural heritage. These sites are preserved for their architectural, historical, or natural significance.",
    "items": [
      {
        "name": "Taj Mahal",
        "detail": "Located in Agra, Uttar Pradesh; magnificent mausoleum built by Shah Jahan; symbol of love; white marble construction; most visited monument"
      },
      {
        "name": "Red Fort",
        "detail": "Located in Delhi; historic fortress built by Mughal Emperor Shah Jahan; served as imperial residence; architectural masterpiece"
      },
      {
        "name": "Khajuraho Temples",
        "detail": "Located in Madhya Pradesh; group of Hindu and Jain temples; famous for intricate sculptures; built during Chandela dynasty"
      },
      {
        "name": "Ajanta Caves",
        "detail": "Buddhist cave temples in Maharashtra; carved into rock; contain paintings and sculptures; represent ancient Buddhist art"
      },
      {
        "name": "Ellora Caves",
        "detail": "Rock-cut cave temples in Maharashtra; Hindu, Buddhist, and Jain caves; carved monolithic structures; architectural marvel"
      },
      {
        "name": "Qutb Minar",
        "detail": "Located in Delhi; tallest brick minaret in the world; built by Delhi Sultanate; Indo-Islamic architecture example"
      },
      {
        "name": "Hampi Monuments",
        "detail": "Located in Karnataka; ruins of Vijayanagara empire; temples and palaces; important archaeological site"
      },
      {
        "name": "Konark Sun Temple",
        "detail": "Located in Odisha; dedicated to Surya; designed as chariot; intricate stone carvings; 13th century construction"
      },
      {
        "name": "Mahabalipuram Temples",
        "detail": "Located in Tamil Nadu; Pallava dynasty temples; rock-cut and structural temples; ancient port city monuments"
      },
      {
        "name": "Jaipur City",
        "detail": "Located in Rajasthan; planned city with grid layout; pink colored buildings; established by Maharaja Sawai Jai Singh II"
      },
      {
        "name": "Sundarbans National Park",
        "detail": "Located in West Bengal; largest mangrove forest; UNESCO natural heritage site; home to Bengal tigers"
      },
      {
        "name": "Great Himalayan National Park",
        "detail": "Located in Himachal Pradesh; protects alpine meadows and forests; important for biodiversity conservation; natural heritage site"
      }
    ],
    "faqs": [
      {
        "q": "How many UNESCO World Heritage Sites does India have?",
        "a": "India has 42 UNESCO World Heritage Sites including both cultural and natural sites, making it one of the countries with the most World Heritage Sites globally."
      },
      {
        "q": "What is the Taj Mahal and why is it significant?",
        "a": "The Taj Mahal is a magnificent white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. It is considered a symbol of eternal love and is one of the most beautiful monuments in the world."
      }
    ]
  },
  {
    "slug": "important-sports-trophies",
    "title": "Important Sports Trophies",
    "category": "Sports",
    "intro": "Sports trophies represent the pinnacle of achievement in various sporting disciplines globally. These prestigious awards honor excellence, skill, and dedication of athletes and teams across multiple sports.",
    "items": [
      {
        "name": "FIFA World Cup Trophy",
        "detail": "Awarded to winning team in FIFA World Cup; awarded every four years; most prestigious football tournament; currently held by Argentina"
      },
      {
        "name": "Cricket World Cup Trophy",
        "detail": "Awarded in ICC Cricket World Cup; contested by national cricket teams; held every four years; most watched cricket tournament"
      },
      {
        "name": "Wimbledon Trophy",
        "detail": "Awarded in tennis championships; most prestigious tennis tournament; held annually at Wimbledon, London; dates back to 1877"
      },
      {
        "name": "Stanley Cup",
        "detail": "Ice hockey championship trophy; awarded in National Hockey League finals; oldest professional sports trophy in North America"
      },
      {
        "name": "Super Bowl Trophy",
        "detail": "American football championship trophy; awarded to NFL Super Bowl winners; one of the most watched sporting events globally"
      },
      {
        "name": "Masters Golf Tournament",
        "detail": "Prestigious golf tournament held annually at Augusta; started in 1934; one of four major golf championships"
      },
      {
        "name": "Ryder Cup",
        "detail": "Golf competition between USA and European teams; held biennially; prestigious international golf tournament"
      },
      {
        "name": "Roland Garros Trophy",
        "detail": "Tennis championship trophy awarded at French Open; second grand slam tournament; played on clay courts"
      },
      {
        "name": "Ranji Trophy",
        "detail": "Indian domestic cricket championship; contested between Indian states and teams; historical cricket tournament since 1934"
      },
      {
        "name": "Indian Premier League Trophy",
        "detail": "Awarded to winning team in IPL; most valuable cricket league; launched in 2008; attracts global cricket talent"
      },
      {
        "name": "Asia Cup Trophy",
        "detail": "Cricket trophy awarded to winners of Asia Cup; continental championship; held in multiple formats"
      },
      {
        "name": "Olympic Gold Medal",
        "detail": "Highest award in Olympic Games; represents excellence in athletic performance; symbol of Olympic achievement globally"
      }
    ],
    "faqs": [
      {
        "q": "What is the FIFA World Cup and how often is it held?",
        "a": "The FIFA World Cup is the most prestigious international football tournament held every four years where 32 national teams compete for the trophy, which is awarded to the winning nation."
      },
      {
        "q": "Which is the oldest professional sports trophy in North America?",
        "a": "The Stanley Cup is the oldest professional sports trophy in North America, originally established in 1892 and awarded to the winners of the National Hockey League Championship."
      }
    ]
  },
  {
    "slug": "father-of-various-fields",
    "title": "Father of Various Fields",
    "category": "History",
    "intro": "Throughout history, pioneering individuals have revolutionized their respective fields through innovation, dedication, and groundbreaking work. These pioneers are often recognized as the founders or fathers of their disciplines.",
    "items": [
      {
        "name": "Isaac Newton",
        "detail": "Father of Physics; developed laws of motion and gravity; formulated classical mechanics; revolutionary contributions to science"
      },
      {
        "name": "Louis Pasteur",
        "detail": "Father of Microbiology; discovered microorganisms' role in diseases; developed vaccines; established germ theory"
      },
      {
        "name": "Albert Einstein",
        "detail": "Father of Modern Physics; developed theory of relativity; revolutionized understanding of space, time, and energy"
      },
      {
        "name": "Gregor Mendel",
        "detail": "Father of Genetics; discovered principles of heredity; established foundational laws of inheritance; pioneer of genetics"
      },
      {
        "name": "Charles Darwin",
        "detail": "Father of Evolution; developed theory of evolution by natural selection; revolutionized biological sciences"
      },
      {
        "name": "Galileo Galilei",
        "detail": "Father of Astronomy; improved telescope; discovered moons of Jupiter; advanced heliocentric model; pioneer of scientific method"
      },
      {
        "name": "Marie Curie",
        "detail": "Mother of Radioactivity; discovered polonium and radium; first woman to win Nobel Prize; advanced nuclear chemistry"
      },
      {
        "name": "Stephen Hawking",
        "detail": "Father of Modern Cosmology; studied black holes and universe origins; popularized physics; advanced theoretical physics"
      },
      {
        "name": "Max Planck",
        "detail": "Father of Quantum Theory; discovered quantum mechanics; revolutionary contributions to modern physics"
      },
      {
        "name": "Ramakrishna Paramahamsa",
        "detail": "Father of Modern Hinduism; spiritual reformer; influenced spiritual renaissance; founded Vedanta philosophy modern interpretation"
      },
      {
        "name": "Swami Vivekananda",
        "detail": "Father of Modern Yoga; popularized yoga and Vedanta in West; spiritual and social reformer; founded Ramakrishna Mission"
      },
      {
        "name": "Savitribai Phule",
        "detail": "Mother of Indian Feminism; pioneer of women's education in India; social reformer; established first school for girls"
      }
    ],
    "faqs": [
      {
        "q": "Who is considered the Father of Physics and what were his major contributions?",
        "a": "Isaac Newton is considered the Father of Physics. His major contributions include formulating the laws of motion and universal gravitation, developing classical mechanics, and creating calculus."
      },
      {
        "q": "What did Gregor Mendel contribute to science?",
        "a": "Gregor Mendel is the Father of Genetics who discovered the principles of heredity through his experiments with pea plants, establishing the foundational laws of inheritance that form the basis of modern genetics."
      }
    ]
  },
  {
    "slug": "important-boundary-lines",
    "title": "Important Boundary Lines",
    "category": "Geography",
    "intro": "Boundary lines define territories and political jurisdictions between nations and regions, shaped by historical treaties and agreements. Understanding these boundaries is crucial for geography and international relations.",
    "items": [
      {
        "name": "Line of Control",
        "detail": "Separates India and Pakistan in Kashmir; established after 1949 Karachi Agreement; divides Jammu and Kashmir region"
      },
      {
        "name": "McMahon Line",
        "detail": "Border between India and China in northeast; established in 1914; disputed by China; defines boundary in Arunachal Pradesh region"
      },
      {
        "name": "Radcliffe Line",
        "detail": "Border between India and Pakistan established in 1947 during partition; divides Punjab and Bengal regions"
      },
      {
        "name": "Durand Line",
        "detail": "Border between Afghanistan and Pakistan; established in 1896; marks international boundary; remains disputed"
      },
      {
        "name": "Wagah-Attari Border",
        "detail": "India-Pakistan border in Punjab; famous for border ceremony; major checkpoint for cross-border trade"
      },
      {
        "name": "Demarcation Line",
        "detail": "Establishes border between North and South Korea; established in 1953; division at 38th parallel"
      },
      {
        "name": "Mason-Dixon Line",
        "detail": "Historic boundary between Pennsylvania and Maryland in USA; marks northern limit of slavery in pre-civil war era"
      },
      {
        "name": "Oder-Neisse Line",
        "detail": "Border between Germany and Poland; established after World War II; marks eastern boundary of Germany"
      },
      {
        "name": "Maginot Line",
        "detail": "French fortification line built before World War II; defensive military structure along Germany-France border"
      },
      {
        "name": "Sykes-Picot Agreement",
        "detail": "Secret wartime agreement between Britain and France dividing Ottoman lands; shaped Middle Eastern borders; agreed in 1916"
      },
      {
        "name": "38th Parallel",
        "detail": "Dividing line between North and South Korea; established after Korean War; demilitarized zone separates nations"
      },
      {
        "name": "Triodos Point",
        "detail": "Three-way international border; often used to describe junction points between three countries or regions"
      }
    ],
    "faqs": [
      {
        "q": "What is the Line of Control and what does it separate?",
        "a": "The Line of Control separates India and Pakistan in the Kashmir region. It was established after the 1949 Karachi Agreement and represents one of the most disputed boundaries in South Asia."
      },
      {
        "q": "What is the McMahon Line and which countries does it divide?",
        "a": "The McMahon Line is the border between India and China in the northeastern region, established in 1914. It divides the Arunachal Pradesh region and remains disputed by China, which claims it is not legitimate."
      }
    ]
  },
  {
    "slug": "straits-of-the-world",
    "title": "Straits of the World",
    "category": "Geography",
    "intro": "Straits are narrow waterways connecting larger bodies of water, crucial for maritime commerce, navigation, and geopolitical importance. They serve as vital shipping routes and strategic locations globally.",
    "items": [
      {
        "name": "Strait of Malacca",
        "detail": "Connects Andaman Sea to South China Sea; one of world's busiest shipping lanes; separates Malaysia and Indonesia; critical for Asian commerce"
      },
      {
        "name": "Strait of Hormuz",
        "detail": "Connects Persian Gulf to Gulf of Oman; most critical energy chokepoint; major oil shipment route; narrow strategic strait"
      },
      {
        "name": "Strait of Gibraltar",
        "detail": "Connects Mediterranean Sea and Atlantic Ocean; separates Spain and Morocco; narrow passage; major shipping route"
      },
      {
        "name": "English Channel",
        "detail": "Separates England and France; connects North Sea to Atlantic Ocean; busiest shipping lanes globally; Dover Strait narrowest point"
      },
      {
        "name": "Bering Strait",
        "detail": "Separates Russia and Alaska; connects Arctic Ocean to Bering Sea; narrow strait; strategically important"
      },
      {
        "name": "Taiwan Strait",
        "detail": "Separates Taiwan from mainland China; strategic waterway; important sea lane; geopolitically significant"
      },
      {
        "name": "Strait of Sunda",
        "detail": "Connects Java Sea and Indian Ocean; separates Java and Sumatra; important shipping lane; narrows near Sunda Island"
      },
      {
        "name": "Cook Strait",
        "detail": "Separates North and South Islands of New Zealand; narrow strait; important for New Zealand shipping"
      },
      {
        "name": "Bass Strait",
        "detail": "Separates mainland Australia and Tasmania; connects Tasman Sea to Indian Ocean; important Australian shipping lane"
      },
      {
        "name": "Palk Strait",
        "detail": "Narrow body of water between India and Sri Lanka; separates Tamil Nadu from Sri Lanka; shallow waters; fisheries significance"
      },
      {
        "name": "Strait of Juan de Fuca",
        "detail": "Connects Pacific Ocean to Puget Sound; separates USA and Canada; important for northwest Pacific coast shipping"
      },
      {
        "name": "Kerch Strait",
        "detail": "Connects Black Sea to Sea of Azov; separates Ukraine and Russia; strategic waterway; geopolitically important"
      }
    ],
    "faqs": [
      {
        "q": "What is the Strait of Hormuz and why is it important?",
        "a": "The Strait of Hormuz connects the Persian Gulf to the Gulf of Oman and is the world's most critical energy chokepoint, through which approximately one-third of global oil trade passes daily."
      },
      {
        "q": "Which strait connects the Mediterranean Sea and Atlantic Ocean?",
        "a": "The Strait of Gibraltar connects the Mediterranean Sea and the Atlantic Ocean, separating Spain and Morocco. It is one of the world's busiest shipping routes and one of the most important straits globally."
      }
    ]
  },
  {
    "slug": "deserts-of-the-world",
    "title": "Deserts of the World",
    "category": "Geography",
    "intro": "Deserts are arid regions with minimal precipitation, characterized by extreme conditions and unique ecosystems. These vast expanses cover significant portions of Earth's continents.",
    "items": [
      {
        "name": "Sahara Desert",
        "detail": "Located in North Africa; world's largest hot desert; spans multiple countries; rich in mineral resources; diverse wildlife adaptation"
      },
      {
        "name": "Arabian Desert",
        "detail": "Located in Middle East; second largest hot desert; covers parts of Saudi Arabia, Iraq, and neighboring countries; petroleum reserves"
      },
      {
        "name": "Kalahari Desert",
        "detail": "Located in Southern Africa; semi-arid savanna; home to indigenous San people; diverse wildlife and vegetation"
      },
      {
        "name": "Gobi Desert",
        "detail": "Located in Asia between Mongolia and China; cold desert; vast steppe ecosystem; historically important Silk Road location"
      },
      {
        "name": "Atacama Desert",
        "detail": "Located in South America in Chile and Peru; one of driest places on Earth; rich mineral deposits; astronomical observation site"
      },
      {
        "name": "Thar Desert",
        "detail": "Located in northwest India and Pakistan; hot desert; covers Rajasthan region; important for agriculture and livestock"
      },
      {
        "name": "Great Sandy Desert",
        "detail": "Located in Australia; large hot desert; sparse vegetation; Aboriginal land and culture; mineral resources"
      },
      {
        "name": "Sonoran Desert",
        "detail": "Located in southwestern USA and Mexico; hot desert; diverse vegetation and wildlife; important saguaro cactus habitat"
      },
      {
        "name": "Mojave Desert",
        "detail": "Located in southwestern USA; hot desert ecosystem; unique desert flora; important for mineral extraction"
      },
      {
        "name": "Negev Desert",
        "detail": "Located in Israel; semi-arid desert; developed through irrigation projects; agricultural development despite arid conditions"
      },
      {
        "name": "Rub al Khali",
        "detail": "Located in Arabian Peninsula; world's largest continuous sand desert; part of Arabian Desert; extremely arid conditions"
      },
      {
        "name": "Simpson Desert",
        "detail": "Located in central Australia; large sand dune desert; parallel dune systems; Aboriginal settlement areas"
      }
    ],
    "faqs": [
      {
        "q": "Which is the world's largest hot desert?",
        "a": "The Sahara Desert in North Africa is the world's largest hot desert, spanning across multiple countries and covering an area larger than the continental United States."
      },
      {
        "q": "What makes the Atacama Desert unique?",
        "a": "The Atacama Desert in South America is one of the driest places on Earth, with some areas never receiving measurable rainfall. It is also an important site for astronomical observation due to its clear skies and is rich in mineral deposits."
      }
    ]
  },
  {
    "slug": "volcanoes-of-the-world",
    "title": "Volcanoes of the World",
    "category": "Geography",
    "intro": "Volcanoes are geological formations where molten rock, ash, and gases erupt from within Earth's crust. They play important roles in shaping landscapes and maintaining Earth's geological processes.",
    "items": [
      {
        "name": "Mount Vesuvius",
        "detail": "Located in Italy near Naples; destroyed Pompeii in 79 AD; active volcano; famous historical eruption; situated on Mediterranean coast"
      },
      {
        "name": "Mount Krakatoa",
        "detail": "Located in Indonesia; most destructive historical eruption in 1883; causes massive tsunamis; volcanic island straits"
      },
      {
        "name": "Mount Fuji",
        "detail": "Located in Japan; iconic stratovolcano; highest point in Japan; sacred mountain; dormant but monitored volcano"
      },
      {
        "name": "Mount Etna",
        "detail": "Located in Sicily, Italy; world's largest active volcano; continuous eruptive activity; shaped landscape through lava flows"
      },
      {
        "name": "Popocateptl",
        "detail": "Located in Mexico; active volcano near Mexico City; indigenous name meaning smoking mountain; poses hazard to nearby populations"
      },
      {
        "name": "Mount Kilimanjaro",
        "detail": "Located in Tanzania; Africa's highest mountain; dormant volcano; important landmark and tourism destination"
      },
      {
        "name": "Mount Merapi",
        "detail": "Located in Indonesia; highly active volcano; frequent eruptions; important in Indonesian culture and mythology"
      },
      {
        "name": "Mount St Helens",
        "detail": "Located in Washington USA; active stratovolcano; catastrophic 1980 eruption; recovery and regeneration example"
      },
      {
        "name": "Stromboli",
        "detail": "Located in Italy; continuously active volcano; unique regular explosions; lighthouse of Mediterranean name"
      },
      {
        "name": "Mount Yasur",
        "detail": "Located in Vanuatu; one of world's most accessible active volcanoes; continuous eruptions; tourism destination"
      },
      {
        "name": "Yellow Stone Caldera",
        "detail": "Located in USA; massive supervolcano; caldera system; geothermal features and hot springs; monitored for activity"
      },
      {
        "name": "Mount Piton de la Fournaise",
        "detail": "Located in Reunion Island; world's most active shield volcano; frequent eruptions; important geological observatory"
      }
    ],
    "faqs": [
      {
        "q": "What was the significance of Mount Vesuvius eruption in 79 AD?",
        "a": "Mount Vesuvius erupted catastrophically in 79 AD, destroying the Roman cities of Pompeii and Herculaneum. This eruption preserved the cities under ash and pumice, providing invaluable archaeological insights into Roman life."
      },
      {
        "q": "Which is the world's largest active volcano?",
        "a": "Mount Etna in Sicily, Italy is the world's largest active volcano, rising about 3,330 meters with continuous eruptive activity that has shaped the surrounding landscape through lava flows over centuries."
      }
    ]
  },
  {
    "slug": "indian-newspapers-and-founders",
    "title": "Indian Newspapers and Founders",
    "category": "India",
    "intro": "Indian journalism has a rich history dating back to the colonial period with numerous newspapers playing crucial roles in independence movement and nation building. These publications shaped public opinion and democratic discourse.",
    "items": [
      {
        "name": "The Times of India",
        "detail": "Founded in 1838; India's largest English newspaper; widespread circulation; major news organization; important journalistic institution"
      },
      {
        "name": "The Statesman",
        "detail": "Founded in 1875; started in Kolkata by British journalist; played role in independence movement; historical significance"
      },
      {
        "name": "The Hindu",
        "detail": "Founded in 1878 in Madras; major South Indian English newspaper; circulation across South India; quality journalism tradition"
      },
      {
        "name": "The Telegraph",
        "detail": "Founded in 1875; based in Kolkata; significant Bengali newspaper; influenced Bengali intellectual discourse"
      },
      {
        "name": "Indian Express",
        "detail": "Founded in 1932 by freedom fighter Sarvepalli Krishnan; important national English newspaper; stands for independent journalism"
      },
      {
        "name": "Hindustan Times",
        "detail": "Founded in 1924 by Sunder Lal; major Hindi and English newspaper; important voice in independence movement"
      },
      {
        "name": "Dawn",
        "detail": "Founded in 1873; based in Karachi; major South Asian English newspaper; important across India and Pakistan"
      },
      {
        "name": "The Deccan Herald",
        "detail": "Founded in 1948; based in Bangalore; important South Indian newspaper; significant regional circulation"
      },
      {
        "name": "The Tribune",
        "detail": "Founded in 1881; based in Chandigarh; important newspaper; progressive journalism tradition; regional significance"
      },
      {
        "name": "Dainik Jagaran",
        "detail": "Hindi language newspaper; highest circulation Hindi daily in India; based in Uttar Pradesh; significant reach"
      },
      {
        "name": "Amar Ujala",
        "detail": "Hindi daily newspaper; major North Indian publication; high circulation; important in Hindi journalism"
      },
      {
        "name": "The Outlook",
        "detail": "Founded in 1997; important news magazine; investigative journalism tradition; significant cultural influence"
      }
    ],
    "faqs": [
      {
        "q": "Which is India's oldest newspaper and when was it founded?",
        "a": "The Times of India is India's oldest newspaper still in publication, founded in 1838. It is also India's largest English newspaper with widespread circulation across the country."
      },
      {
        "q": "How did newspapers contribute to Indian independence movement?",
        "a": "Newspapers played crucial roles in the independence movement by providing platforms for nationalist ideas, reporting on colonial injustices, and mobilizing public opinion against British rule. Publications like The Statesman and Indian Express were particularly influential."
      }
    ]
  },
  {
    "slug": "indian-constitution-important-articles",
    "title": "Indian Constitution Important Articles",
    "category": "India",
    "intro": "The Indian Constitution is the world's longest written constitution, establishing the framework for governance and protecting citizens' rights. Key articles define fundamental rights, directives, and governance structures.",
    "items": [
      {
        "name": "Article 1",
        "detail": "Defines India as Union of States; establishes India as sovereign democratic republic; foundational article of Constitution"
      },
      {
        "name": "Article 14",
        "detail": "Guarantees right to equality before law; prohibits discrimination by state; fundamental right; ensures equal protection"
      },
      {
        "name": "Article 19",
        "detail": "Grants freedoms including speech, assembly, association, movement, and profession; fundamental rights; core democratic freedoms"
      },
      {
        "name": "Article 21",
        "detail": "Protects right to life and personal liberty; interpreted broadly by courts; fundamental right; includes right to privacy"
      },
      {
        "name": "Article 25",
        "detail": "Guarantees freedom of religion; secular principle; allows citizens to profess, practice, and propagate religion of choice"
      },
      {
        "name": "Article 26",
        "detail": "Rights to manage religious affairs; allows religious groups to establish and maintain institutions; religious freedom"
      },
      {
        "name": "Article 32",
        "detail": "Right to constitutional remedies; allows citizens to approach Supreme Court for fundamental rights violations; enforcement mechanism"
      },
      {
        "name": "Article 44",
        "detail": "Directive requiring uniform civil code; Directive State Policy; aims for unified legal framework across India"
      },
      {
        "name": "Article 45",
        "detail": "Directive for free and compulsory education; Directive State Policy; emphasis on educational access"
      },
      {
        "name": "Article 51A",
        "detail": "Fundamental duties of citizens; includes duties to defend country, maintain harmony, and preserve heritage"
      },
      {
        "name": "Article 370",
        "detail": "Special status for Jammu and Kashmir; autonomy provisions; controversial article; partially abrogated in 2019"
      },
      {
        "name": "Article 356",
        "detail": "President's power to impose President's Rule in states; emergency provision; suspension of state government; controversial use"
      }
    ],
    "faqs": [
      {
        "q": "What does Article 14 of the Indian Constitution guarantee?",
        "a": "Article 14 guarantees the right to equality before law and prohibits discrimination by the state. It ensures that all citizens are treated equally and have equal protection under law."
      },
      {
        "q": "Which article grants fundamental freedoms and what are they?",
        "a": "Article 19 grants fundamental freedoms including freedom of speech and expression, freedom of assembly, freedom of association, freedom of movement, freedom to reside and settle, and freedom to practice profession or trade."
      }
    ]
  },
  {
    "slug": "five-year-plans-of-india",
    "title": "Five Year Plans of India",
    "category": "India",
    "intro": "Five Year Plans are comprehensive economic development programs that outline India's development priorities and resource allocation strategies. These plans have shaped India's economic growth and development trajectory.",
    "items": [
      {
        "name": "First Five Year Plan",
        "detail": "1951-1956; focused on agriculture and dams; modeled on Soviet planning; foundation for economic development; Bhakra Nangal Dam project"
      },
      {
        "name": "Second Five Year Plan",
        "detail": "1956-1961; emphasis on industrialization; heavy industry development; steel and manufacturing focus; economic diversification"
      },
      {
        "name": "Third Five Year Plan",
        "detail": "1961-1966; consolidation of industrial base; agricultural improvement focus; faced economic challenges; Chinese war during this period"
      },
      {
        "name": "Fourth Five Year Plan",
        "detail": "1969-1974; poverty alleviation priority; agricultural revolution focus; infrastructure development; economic instability period"
      },
      {
        "name": "Fifth Five Year Plan",
        "detail": "1974-1979; removal of poverty emphasis; social services improvement; technology development; rural infrastructure projects"
      },
      {
        "name": "Sixth Five Year Plan",
        "detail": "1980-1985; energy sector development; technological innovation; employment generation; industrial growth emphasis"
      },
      {
        "name": "Seventh Five Year Plan",
        "detail": "1985-1990; agricultural development focus; industrial modernization; infrastructure expansion; rural development priority"
      },
      {
        "name": "Eighth Five Year Plan",
        "detail": "1992-1997; post-liberalization plan; market-oriented approach; private sector participation; structural reforms"
      },
      {
        "name": "Ninth Five Year Plan",
        "detail": "1997-2002; food security and employment focus; social development emphasis; infrastructure investment; poverty reduction"
      },
      {
        "name": "Tenth Five Year Plan",
        "detail": "2002-2007; rapid growth target; infrastructure development; human development focus; service sector growth"
      },
      {
        "name": "Eleventh Five Year Plan",
        "detail": "2007-2012; inclusive growth emphasis; infrastructure expansion; agricultural modernization; social welfare programs"
      },
      {
        "name": "Twelfth Five Year Plan",
        "detail": "2012-2017; inclusive and sustainable growth; infrastructure development priority; technology advancement; energy security focus"
      }
    ],
    "faqs": [
      {
        "q": "What was the primary focus of India's First Five Year Plan?",
        "a": "The First Five Year Plan (1951-1956) focused primarily on agriculture, irrigation, and dams, establishing the foundation for India's economic development after independence. It was modeled on Soviet planning and included major projects like the Bhakra Nangal Dam."
      },
      {
        "q": "How did economic policy change after the Seventh Five Year Plan?",
        "a": "After the Seventh Five Year Plan, India liberalized its economy. The Eighth Five Year Plan (1992-1997) marked a shift to market-oriented approach with greater private sector participation and structural reforms, moving away from the state-controlled economy model."
      }
    ]
  },
  {
    "slug": "biography-of-lal-bahadur-shastri",
    "title": "Biography of Lal Bahadur Shastri",
    "category": "Biography",
    "intro": "Lal Bahadur Shastri was the second Prime Minister of India who led the nation with integrity and simplicity. He is remembered for his role in the Indo-Pakistani War of 1965 and the Green Revolution. His dedication to public service and honest governance made him a beloved leader in Indian politics.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Lal Bahadur Varma Shastri"
      },
      {
        "name": "Born",
        "detail": "2 October 1904 in Mughalsarai, Uttar Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Politics, Independence Movement, Public Administration"
      },
      {
        "name": "Education",
        "detail": "Studied at Government School in Varanasi and later at Kashi Vidyapith, where he adopted the name Shastri meaning learned scholar"
      },
      {
        "name": "Major Contributions",
        "detail": "As Prime Minister from 1964 to 1966, Shastri led India during the 1965 Indo-Pakistani War with strong resolve, initiated the Green Revolution to boost agricultural production, and promoted the slogan Jai Jawan Jai Kisan to honor both soldiers and farmers. He implemented land reforms and worked tirelessly to reduce poverty and corruption in government."
      },
      {
        "name": "Political Career",
        "detail": "Participated actively in the Civil Disobedience Movement and Quit India Movement, served as Chief Minister of Uttar Pradesh, and held important Cabinet positions as Union Railways Minister and Home Minister before becoming Prime Minister"
      },
      {
        "name": "Awards",
        "detail": "Bharat Ratna, the highest civilian award of India, awarded posthumously in 1966"
      },
      {
        "name": "Famous Quote",
        "detail": "Jai Jawan Jai Kisan - Victory to the Soldier, Victory to the Farmer"
      },
      {
        "name": "Death",
        "detail": "11 January 1966 in Tashkent, Soviet Union, under mysterious circumstances just 11 months after becoming Prime Minister"
      },
      {
        "name": "Why Famous",
        "detail": "Lal Bahadur Shastri is remembered as one of India's most honest and dedicated Prime Ministers who strengthened the nation during wartime and set the foundation for agricultural self-sufficiency. His simple lifestyle and unwavering commitment to truth earned him immense respect and admiration across the country."
      }
    ],
    "faqs": [
      {
        "q": "What was Lal Bahadur Shastri's contribution to Indian agriculture?",
        "a": "He promoted and supported the Green Revolution, which transformed India from a food-deficit nation to food self-sufficient through modern farming techniques and increased agricultural productivity."
      },
      {
        "q": "Why is Lal Bahadur Shastri considered an honest politician?",
        "a": "Known for his simplicity, integrity, and transparent governance, Shastri refused to accumulate wealth and lived a modest life dedicated entirely to public service and national development."
      }
    ]
  },
  {
    "slug": "biography-of-indira-gandhi",
    "title": "Biography of Indira Gandhi",
    "category": "Biography",
    "intro": "Indira Gandhi was the first woman Prime Minister of India and one of the most powerful female leaders of the 20th century. She served as Prime Minister for 15 years and played a crucial role in shaping modern India. Her tenure witnessed major political and economic transformations in the nation.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Indira Priyadarshini Gandhi, also known as Indira Nehru Gandhi"
      },
      {
        "name": "Born",
        "detail": "19 November 1917 in Allahabad, United Provinces, British India"
      },
      {
        "name": "Field",
        "detail": "Politics, National Leadership, Social Reform"
      },
      {
        "name": "Education",
        "detail": "Educated at Modern School Delhi, studied at Oxford University and Somerville College, trained in political science and economics"
      },
      {
        "name": "Family Background",
        "detail": "Daughter of Jawaharlal Nehru, independent India's first Prime Minister, and granddaughter of Motilal Nehru, a prominent freedom fighter and nationalist"
      },
      {
        "name": "Major Contributions",
        "detail": "As Prime Minister from 1966 to 1977 and 1980 to 1984, Indira Gandhi strengthened India's economic independence, promoted the Green Revolution for agricultural growth, and conducted nuclear tests demonstrating India's scientific capabilities. She worked toward reducing poverty and expanding literacy programs across the nation."
      },
      {
        "name": "Political Career",
        "detail": "Served as Union Minister of Information and Broadcasting, President of the Indian National Congress, and navigated complex global politics during the Cold War era"
      },
      {
        "name": "Famous Quote",
        "detail": "I would rather die as a lion than live as a sheep"
      },
      {
        "name": "Death",
        "detail": "31 October 1984 in New Delhi, assassinated by her own security guards following the 1984 anti-Sikh riots"
      },
      {
        "name": "Why Famous",
        "detail": "Indira Gandhi is remembered as a powerful and transformative leader who modernized India and asserted the nation's independence on the world stage, though her Emergency period remains controversial in Indian political history."
      }
    ],
    "faqs": [
      {
        "q": "What was the Emergency period during Indira Gandhi's tenure?",
        "a": "From 1975 to 1977, Gandhi declared a state of Emergency suspending democratic rights, during which opposition leaders were imprisoned and press freedom was restricted, a dark period in independent India's democracy."
      },
      {
        "q": "How did Indira Gandhi contribute to India's scientific progress?",
        "a": "She promoted nuclear research and conducted India's first nuclear test Pokharan in 1974, establishing India as a nuclear power and advancing the nation's technological capabilities."
      }
    ]
  },
  {
    "slug": "biography-of-sarojini-naidu",
    "title": "Biography of Sarojini Naidu",
    "category": "Biography",
    "intro": "Sarojini Naidu, known as the Nightingale of India, was a celebrated poet, political activist, and women's rights advocate. She was the first woman to become Governor of an Indian state and played a prominent role in India's independence movement. Her poetry and speeches inspired millions to join the freedom struggle.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Sarojini Naidu, also known as Sarojinee Devi"
      },
      {
        "name": "Born",
        "detail": "13 February 1879 in Hyderabad, Deccan State, India"
      },
      {
        "name": "Field",
        "detail": "Literature, Poetry, Women's Rights, Political Activism"
      },
      {
        "name": "Education",
        "detail": "Studied at King George's School in London and later at Girton College, Cambridge, excelling in multiple languages including English, Urdu, Telugu, and French"
      },
      {
        "name": "Literary Career",
        "detail": "Published several acclaimed poetry collections including The Golden Threshold, The Bird of Time, and The Broken Wing, earning international recognition for her lyrical and patriotic verses"
      },
      {
        "name": "Major Contributions",
        "detail": "As a fearless freedom fighter, Sarojini Naidu actively participated in the Indian National Congress and the Non-Cooperation Movement, delivering powerful speeches that mobilized masses against British rule. She was imprisoned multiple times for her activism and advocated strongly for women's education, suffrage, and equal rights in a male-dominated society."
      },
      {
        "name": "Political Career",
        "detail": "Served as Governor of the United Provinces from 1947 to 1949, becoming India's first woman governor, and held key positions in the Congress party leadership"
      },
      {
        "name": "Famous Quote",
        "detail": "If we want to cultivate a true love of the Motherland, we must be free to criticize, to appreciate, to amend and to reprimand"
      },
      {
        "name": "Death",
        "detail": "2 March 1949 in Lucknow, India"
      },
      {
        "name": "Why Famous",
        "detail": "Sarojini Naidu is celebrated as a multitalented leader who combined poetry with activism, breaking gender barriers and championing women's empowerment while contributing significantly to India's freedom struggle."
      }
    ],
    "faqs": [
      {
        "q": "Why was Sarojini Naidu called the Nightingale of India?",
        "a": "She was given this epithet for her melodious and beautiful poetry that touched the hearts of people, much like the enchanting song of a nightingale, and for her powerful speeches that inspired the nation."
      },
      {
        "q": "What were Sarojini Naidu's contributions to women's rights?",
        "a": "She fought for women's education, voting rights, and equal participation in all spheres of society, challenging traditional norms and paving the way for future generations of women leaders in India."
      }
    ]
  },
  {
    "slug": "biography-of-mangal-pandey",
    "title": "Biography of Mangal Pandey",
    "category": "Biography",
    "intro": "Mangal Pandey was a courageous Indian soldier whose act of rebellion against the British East India Company sparked the Indian Rebellion of 1857. He is remembered as a martyr and freedom fighter who sacrificed his life for the independence of India. His courage and determination made him a symbol of resistance against colonial rule.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Mangal Pandey, also known as Mangal Pande"
      },
      {
        "name": "Born",
        "detail": "19 July 1827 in Akbarpur, Uttar Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Military Service, Freedom Fighting, Anti-Colonial Resistance"
      },
      {
        "name": "Education",
        "detail": "Enlisted as a sepoy soldier in the Bengal Army's 34th Regiment under the British East India Company"
      },
      {
        "name": "Military Service",
        "detail": "Served with distinction in the Bengal Army and participated in the Burma War, earning respect for his bravery and soldiering skills"
      },
      {
        "name": "Major Contributions",
        "detail": "On 29 March 1857, Mangal Pandey openly defied orders and fired at British officers, refusing to use the allegedly animal-fat-greased cartridges that violated the religious beliefs of both Hindu and Muslim soldiers. This act of rebellion ignited the Indian Rebellion of 1857, one of the first organized armed revolts against British colonial rule, inspiring thousands of Indians to join the freedom struggle."
      },
      {
        "name": "The Cartridge Incident",
        "detail": "The immediate trigger for Mangal Pandey's rebellion was the introduction of new rifle cartridges rumored to be greased with pig and cow fat, deeply offensive to Muslim and Hindu religious sentiments respectively"
      },
      {
        "name": "Famous Quote",
        "detail": "I will not use these cartridges, they are against my religion and I will not be a party to the desecration of my faith"
      },
      {
        "name": "Death",
        "detail": "8 April 1857 in Barrackpore, India, executed by hanging by the British authorities for his rebellion"
      },
      {
        "name": "Why Famous",
        "detail": "Mangal Pandey is immortalized as a pioneering freedom fighter whose single act of defiance galvanized the entire Indian Rebellion of 1857, earning him the respect and admiration of freedom fighters and the Indian people for centuries to come."
      }
    ],
    "faqs": [
      {
        "q": "What was the significance of the 1857 Indian Rebellion sparked by Mangal Pandey?",
        "a": "It was the first major organized armed uprising against British colonial rule, involving soldiers and civilians across India, though ultimately suppressed, it demonstrated unified resistance and laid the groundwork for the future independence movement."
      },
      {
        "q": "Why did Mangal Pandey refuse to use the cartridges?",
        "a": "The cartridges were allegedly greased with pig and cow fat, which violated the religious beliefs of both Muslim and Hindu soldiers, making it impossible for them to use on religious grounds."
      }
    ]
  },
  {
    "slug": "biography-of-chandra-shekhar-azad",
    "title": "Biography of Chandra Shekhar Azad",
    "category": "Biography",
    "intro": "Chandra Shekhar Azad was a legendary freedom fighter known for his fearless struggle against British colonial rule and his revolutionary ideals. He took the name Azad meaning free to symbolize India's independence struggle. He fought until his last breath to secure freedom for his nation.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Chandra Shekhar Azad, originally named Chandra Shekhar Tiwari"
      },
      {
        "name": "Born",
        "detail": "23 July 1906 in Bhador village, Madhya Pradesh, India"
      },
      {
        "name": "Field",
        "detail": "Revolutionary Politics, Freedom Fighting, Anti-Colonial Struggle"
      },
      {
        "name": "Education",
        "detail": "Studied at Benares Hindu University and later joined the Indian National Congress youth wing before transitioning to revolutionary activities"
      },
      {
        "name": "Revolutionary Career",
        "detail": "Co-founded the Hindustan Socialist Republican Association with Bhagat Singh and Sukhdev, and organized armed resistance against British rule through strategic operations"
      },
      {
        "name": "Major Contributions",
        "detail": "Chandra Shekhar Azad led daring operations against British authorities, conducted successful raids for funds and weapons, and mentored young revolutionaries to join the independence movement. He was instrumental in planning the Kakori train robbery and coordinated with other freedom fighters to destabilize British colonial administration through armed resistance and strategic activities."
      },
      {
        "name": "Famous Operations",
        "detail": "Participated in the Kakori train robbery, led attacks on British police stations, and orchestrated multiple operations to weaken colonial control over India"
      },
      {
        "name": "Famous Quote",
        "detail": "I want to die so that the history of our struggle is recorded in the memory of all humans forever"
      },
      {
        "name": "Death",
        "detail": "27 February 1931 in Chandni Chowk, Delhi, shot himself with his pistol rather than surrender to British police"
      },
      {
        "name": "Why Famous",
        "detail": "Chandra Shekhar Azad is revered as a symbol of fearless defiance and revolutionary courage, remembered for his unwavering commitment to Indian independence even unto death, and his influence on the idealistic youth of India."
      }
    ],
    "faqs": [
      {
        "q": "Why did Chandra Shekhar Azad shoot himself?",
        "a": "To avoid capture and interrogation by British police, he chose death as a free man rather than submit to colonial authority, demonstrating his absolute commitment to the ideal of Azadi or freedom."
      },
      {
        "q": "What was the Hindustan Socialist Republican Association?",
        "a": "It was a revolutionary organization founded by Azad and others that advocated armed struggle against British rule and believed in establishing a socialist republic in India after independence."
      }
    ]
  },
  {
    "slug": "biography-of-maharana-pratap",
    "title": "Biography of Maharana Pratap",
    "category": "Biography",
    "intro": "Maharana Pratap was a valiant Rajput warrior and king of Mewar who fought fearlessly against the Mughal Empire. He is celebrated as a symbol of bravery, independence, and resistance against tyranny. His fight to protect his kingdom and preserve Rajput honor earned him a legendary place in Indian history.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Maharana Pratap Singh of Mewar"
      },
      {
        "name": "Born",
        "detail": "9 May 1540 in Kumbhalgarh, Mewar, India"
      },
      {
        "name": "Field",
        "detail": "Warfare, Kingdom Management, Rajput Warrior Culture"
      },
      {
        "name": "Education",
        "detail": "Trained from childhood in martial arts, horsemanship, weapons handling, and the code of Rajput chivalry and honor"
      },
      {
        "name": "Kingdom",
        "detail": "Ruled over the kingdom of Mewar in present-day Rajasthan, known for its rugged terrain and strategic fortifications"
      },
      {
        "name": "Major Contributions",
        "detail": "Maharana Pratap led the resistance against Mughal Emperor Akbar's expansionist policies, refusing to submit to Mughal authority and maintaining Mewar's independence. He fought the famous Battle of Haldighati against superior Mughal forces, and though militarily challenging, he continued to resist and protect his kingdom through guerrilla warfare, preserving Rajput dignity and independence."
      },
      {
        "name": "Military Strategy",
        "detail": "Mastered the art of guerrilla warfare and strategic retreats, using the mountainous terrain of Mewar to his advantage while continuing to harass Mughal forces"
      },
      {
        "name": "Famous Quote",
        "detail": "I cannot bow before tyranny, for a Rajput's honor lies in his independence and his unwillingness to submit"
      },
      {
        "name": "Death",
        "detail": "29 January 1597 in Chavand, Mewar, India"
      },
      {
        "name": "Why Famous",
        "detail": "Maharana Pratap is immortalized in Indian folklore and history as the embodiment of Rajput valor, courage, and the eternal struggle for freedom against overwhelming odds, inspiring generations with his unflinching resistance."
      }
    ],
    "faqs": [
      {
        "q": "What was the Battle of Haldighati?",
        "a": "Fought on 21 June 1576 between Maharana Pratap and Mughal forces under Akbar, though Pratap was tactically defeated, he managed to escape and continued his resistance against Mughal rule."
      },
      {
        "q": "Why is Maharana Pratap considered a symbol of Rajput honor?",
        "a": "He chose freedom and struggle over submission to the Mughal Empire, embodying the Rajput principles of independence, courage, and honor, and never surrendered despite overwhelming military pressure."
      }
    ]
  },
  {
    "slug": "biography-of-chhatrapati-shivaji",
    "title": "Biography of Chhatrapati Shivaji",
    "category": "Biography",
    "intro": "Chhatrapati Shivaji Maharaj was a legendary Marathi warrior and founder of the Maratha Empire who challenged Mughal dominance in India. He established a powerful kingdom through military genius and administrative acumen. His legacy shaped the political landscape of India for centuries.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Shivaji Bhonsle, also known as Chhatrapati Shivaji Maharaj, meaning warrior king"
      },
      {
        "name": "Born",
        "detail": "19 February 1630 in Shivneri Fort, Maharashtra, India"
      },
      {
        "name": "Field",
        "detail": "Military Strategy, Kingdom Building, Administration"
      },
      {
        "name": "Education",
        "detail": "Trained in the martial traditions of the Marathi warrior culture by his mother Jijabai and military mentors, learning strategy, diplomacy, and governance"
      },
      {
        "name": "Early Military Career",
        "detail": "Began consolidating power in Maharashtra by capturing forts from the Bijapur Sultanate and gradually building a strong military force"
      },
      {
        "name": "Major Contributions",
        "detail": "Shivaji Maharaj established the Maratha Empire by building a powerful military force and capturing strategic forts across western India. He created an efficient administrative system, developed a strong navy, and challenged Mughal dominance by defeating major empires. His military innovations and guerrilla tactics influenced Indian warfare for centuries, and he successfully created an independent Marathi kingdom from fragmented territories."
      },
      {
        "name": "Coronation and Expansion",
        "detail": "Formally crowned as Chhatrapati in 1674, establishing the Maratha Empire as a major political power that would eventually challenge Mughal rule across India"
      },
      {
        "name": "Famous Quote",
        "detail": "A king should possess the qualities of a lion and the wisdom of a fox"
      },
      {
        "name": "Death",
        "detail": "3 April 1680 in Raigarh Fort, Maharashtra, India"
      },
      {
        "name": "Why Famous",
        "detail": "Chhatrapati Shivaji is celebrated as a visionary leader who transformed the Maratha people into a formidable power and challenged Mughal dominance, earning him the title of the father of the Maratha nation."
      }
    ],
    "faqs": [
      {
        "q": "What were Shivaji's military innovations?",
        "a": "He pioneered guerrilla warfare tactics suited to the mountainous terrain of Maharashtra, built a powerful navy to control coastal regions, and created an efficient military organization that could quickly mobilize forces."
      },
      {
        "q": "How did Shivaji challenge the Mughal Empire?",
        "a": "Through strategic military victories, fort building, and the creation of an independent administrative system, he reduced Mughal influence in western India and established a strong alternative power center."
      }
    ]
  },
  {
    "slug": "biography-of-ashoka-the-great",
    "title": "Biography of Ashoka the Great",
    "category": "Biography",
    "intro": "Ashoka the Great was one of ancient India's greatest emperors who ruled the Mauryan Empire with wisdom and compassion. After witnessing the devastation of war, he embraced Buddhism and dedicated his life to spreading peace and righteousness across Asia. His reign marked a golden age of cultural and moral advancement.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Ashoka, also known as Ashoka Maurya, born as Ashoka Vardhana"
      },
      {
        "name": "Born",
        "detail": "304 BCE in Pataliputra, Mauryan Empire, India"
      },
      {
        "name": "Field",
        "detail": "Imperial Rule, Buddhism, Moral Governance"
      },
      {
        "name": "Education",
        "detail": "Trained in statecraft and governance by his grandfather Chandragupta Maurya and learned in the traditions of Mauryan administration"
      },
      {
        "name": "Reign",
        "detail": "Ruled the Mauryan Empire from approximately 268 BCE to 232 BCE, overseeing one of ancient history's largest empires spanning most of the Indian subcontinent"
      },
      {
        "name": "Major Contributions",
        "detail": "Ashoka initially expanded the empire through military conquest, but after witnessing the horrors of the Kalinga War, he underwent a spiritual transformation and embraced Buddhism. He then devoted his rule to spreading Dharma or righteousness through moral teachings, built monasteries and universities, sent Buddhist missionaries across Asia, carved edicts in stone across his empire to spread messages of peace and moral conduct, and abolished capital punishment replacing it with rehabilitation."
      },
      {
        "name": "Religious Transformation",
        "detail": "After the bloody Kalinga War, Ashoka renounced violence and became a devoted follower of Buddhism, fundamentally changing his approach to governance from conquest-based to compassion-based"
      },
      {
        "name": "Famous Quote",
        "detail": "The greatest conquest is the conquest of one's own mind through Dharma"
      },
      {
        "name": "Death",
        "detail": "232 BCE in Pataliputra, India"
      },
      {
        "name": "Why Famous",
        "detail": "Ashoka is remembered as the greatest emperor of ancient India who transformed from a warrior king to a moral teacher, spreading Buddhism across Asia and establishing governance based on compassion and righteousness rather than military might."
      }
    ],
    "faqs": [
      {
        "q": "What was the Kalinga War and how did it change Ashoka?",
        "a": "The Kalinga War was a fierce military campaign where Ashoka conquered the region of Kalinga but was horrified by the massive bloodshed and suffering caused, leading him to abandon violence and adopt Buddhism."
      },
      {
        "q": "What were Ashoka's edicts?",
        "a": "Ashoka inscribed his moral and religious teachings in stone across his empire, known as the Edicts of Ashoka, which spread messages of peace, righteousness, tolerance, and compassion to all his subjects."
      }
    ]
  },
  {
    "slug": "biography-of-akbar",
    "title": "Biography of Akbar",
    "category": "Biography",
    "intro": "Akbar was the greatest emperor of the Mughal Empire who ruled with wisdom, tolerance, and vision. He expanded the empire to its greatest territorial extent and created an administrative system that respected religious diversity. His reign is considered the golden age of Mughal rule and Indian history.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Abul-Fath Jalaluddin Muhammad Akbar"
      },
      {
        "name": "Born",
        "detail": "14 October 1542 in Umarkot, Sindh, present-day Pakistan"
      },
      {
        "name": "Field",
        "detail": "Imperial Governance, Military Strategy, Religious Administration"
      },
      {
        "name": "Education",
        "detail": "Trained in military arts, Persian language, and statecraft by his regent Bairam Khan after his father Humayun's death"
      },
      {
        "name": "Reign",
        "detail": "Ruled the Mughal Empire from 1556 to 1605, expanding it to cover most of the Indian subcontinent and establishing it as one of history's greatest empires"
      },
      {
        "name": "Major Contributions",
        "detail": "Akbar expanded the Mughal Empire through military campaigns while maintaining administrative stability, abolished the jizya tax on non-Muslims promoting religious tolerance, implemented the Mansabdari system for efficient administration, and actively promoted arts and culture. He established Din-i-Ilahi, a syncretic religion promoting harmony between Hindu and Muslim beliefs, patronized Sanskrit literature and architecture, and created an inclusive governance structure that accommodated diverse religious communities."
      },
      {
        "name": "Administrative Reforms",
        "detail": "Created the Mansabdari system for military and administrative organization, reformed taxation policies, and established efficient bureaucratic structures that became models for later administrations"
      },
      {
        "name": "Famous Quote",
        "detail": "A monarch should be merciful and just to his people, treating them with equity and wisdom"
      },
      {
        "name": "Death",
        "detail": "27 October 1605 in Agra, India"
      },
      {
        "name": "Why Famous",
        "detail": "Akbar is celebrated as the greatest Mughal emperor who transformed the empire into a unified, well-administered state with religious tolerance and cultural flowering, creating a model of inclusive governance."
      }
    ],
    "faqs": [
      {
        "q": "What was the Mansabdari system created by Akbar?",
        "a": "A military and administrative ranking system where nobles were assigned positions based on merit and rank, receiving salaries and military responsibilities, which made the Mughal administration more efficient and meritocratic."
      },
      {
        "q": "What was Din-i-Ilahi and why did Akbar create it?",
        "a": "Din-i-Ilahi was Akbar's attempt at a syncretic religion combining Hindu and Islamic beliefs to promote unity and reduce religious conflicts in his diverse empire."
      }
    ]
  },
  {
    "slug": "biography-of-sunita-williams",
    "title": "Biography of Sunita Williams",
    "category": "Biography",
    "intro": "Sunita Williams is an accomplished American astronaut of Indian origin who has spent more time in space than any other woman. She has conducted numerous spacewalks and scientific experiments, contributing significantly to space exploration. Her achievements inspire aspiring scientists and astronauts worldwide.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Sunita Lyn Williams, born Sunita Pandya"
      },
      {
        "name": "Born",
        "detail": "19 September 1965 in Euclid, Ohio, United States"
      },
      {
        "name": "Field",
        "detail": "Space Exploration, Aeronautical Engineering, Scientific Research"
      },
      {
        "name": "Education",
        "detail": "Graduated from Naval Academy Annapolis in 1987, earned a Master's degree in Engineering Management from Florida Institute of Technology"
      },
      {
        "name": "Military Service",
        "detail": "Served as a Navy pilot and helicopter test pilot before joining NASA, accumulating thousands of flight hours and advanced flight experience"
      },
      {
        "name": "Major Contributions",
        "detail": "Sunita Williams holds the record for the most spacewalks by any woman and has spent over 340 hours in space across multiple missions. She has conducted critical repairs on the International Space Station, deployed scientific instruments, and conducted numerous experiments in microgravity. Her scientific contributions have advanced our understanding of how human bodies adapt to space, contributed to materials science research, and helped maintain crucial space station systems."
      },
      {
        "name": "Space Missions",
        "detail": "Participated in multiple Space Shuttle missions and long-duration stays aboard the International Space Station, setting records for extravehicular activities and demonstrating exceptional technical expertise"
      },
      {
        "name": "Famous Achievement",
        "detail": "Spent 195 consecutive days aboard the International Space Station, conducting research and performing spacewalks that advanced scientific knowledge"
      },
      {
        "name": "Awards",
        "detail": "NASA Space Flight Medal, Defense Meritorious Service Medal, and numerous other prestigious awards for her contributions to space exploration"
      },
      {
        "name": "Why Famous",
        "detail": "Sunita Williams is celebrated as one of the world's foremost astronauts and pioneers in space exploration, breaking gender barriers and advancing human spaceflight through her technical expertise and scientific contributions."
      }
    ],
    "faqs": [
      {
        "q": "What is a spacewalk and why is Sunita Williams famous for conducting them?",
        "a": "A spacewalk is an extravehicular activity where an astronaut leaves the spacecraft to work in space. Sunita Williams has conducted more spacewalks than any other woman, demonstrating exceptional technical skill and courage."
      },
      {
        "q": "What scientific research has Sunita Williams conducted in space?",
        "a": "She has conducted experiments on human physiology in microgravity, materials science research, and maintained critical systems on the International Space Station, contributing valuable data to space science."
      }
    ]
  },
  {
    "slug": "biography-of-satyendra-nath-bose",
    "title": "Biography of Satyendra Nath Bose",
    "category": "Biography",
    "intro": "Satyendra Nath Bose was a brilliant Indian physicist who made groundbreaking contributions to quantum mechanics. His theoretical work on particles led to the discovery of a new class of subatomic particles named after him called bosons. His contributions revolutionized our understanding of the physical universe.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Satyendra Nath Bose"
      },
      {
        "name": "Born",
        "detail": "1 January 1894 in Kolkata, Bengal, British India"
      },
      {
        "name": "Field",
        "detail": "Physics, Quantum Mechanics, Theoretical Physics"
      },
      {
        "name": "Education",
        "detail": "Studied at Hindu School and Hindu College in Kolkata, later graduated with honors in physics from the University of Calcutta"
      },
      {
        "name": "Academic Career",
        "detail": "Taught physics at various Indian universities including University of Calcutta, University of Dhaka, and Visva-Bharati University, mentoring numerous students in theoretical physics"
      },
      {
        "name": "Major Contributions",
        "detail": "Satyendra Nath Bose developed the quantum statistics of photons, work which was extended to other particles by Einstein and became known as Bose-Einstein statistics. His theoretical framework explained the behavior of identical particles with integer spin, fundamentally changing quantum mechanics. His work led to the prediction and subsequent discovery of Bose-Einstein condensate, a new state of matter that has profound implications for physics."
      },
      {
        "name": "Scientific Recognition",
        "detail": "His work on quantum statistics was groundbreaking and earned international recognition from major physicists including Albert Einstein who collaborated on extending his theories"
      },
      {
        "name": "Famous Contribution",
        "detail": "Developed Bose-Einstein statistics which describes the behavior of identical particles with integer spin, now called bosons in his honor"
      },
      {
        "name": "Death",
        "detail": "4 February 1974 in Kolkata, India"
      },
      {
        "name": "Why Famous",
        "detail": "Satyendra Nath Bose is celebrated as one of India's greatest physicists whose theoretical work revolutionized quantum mechanics and led to the discovery of a fundamental class of particles that bear his name."
      }
    ],
    "faqs": [
      {
        "q": "What are bosons and why are they named after Satyendra Nath Bose?",
        "a": "Bosons are a class of subatomic particles with integer spin that follow Bose-Einstein statistics developed by Bose. They are named in his honor in recognition of his groundbreaking theoretical contributions to quantum mechanics."
      },
      {
        "q": "What is the Bose-Einstein condensate?",
        "a": "It is a state of matter predicted by Bose-Einstein statistics where particles occupy the same quantum state at extremely low temperatures, representing a new fundamental state of matter beyond solid, liquid, and gas."
      }
    ]
  },
  {
    "slug": "biography-of-venkatraman-ramakrishnan",
    "title": "Biography of Venkatraman Ramakrishnan",
    "category": "Biography",
    "intro": "Venkatraman Ramakrishnan is an acclaimed Indian-origin structural biologist who won the Nobel Prize in Chemistry for his pioneering work on the ribosome. His research has advanced our understanding of how cells produce proteins. He is a leading figure in structural biology and scientific research.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Venkatraman Ramakrishnan, often called Venki Ramakrishnan"
      },
      {
        "name": "Born",
        "detail": "6 December 1952 in Chidambaram, Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Structural Biology, Molecular Biology, Biochemistry"
      },
      {
        "name": "Education",
        "detail": "Studied physics at University of Madras, completed Ph.D. in theoretical physics at University of Oxford, and then shifted focus to structural biology"
      },
      {
        "name": "Career Path",
        "detail": "Worked at various prestigious institutions including Brookhaven National Laboratory and University of Utah before joining the MRC Laboratory of Molecular Biology in Cambridge"
      },
      {
        "name": "Major Contributions",
        "detail": "Venkatraman Ramakrishnan determined the three-dimensional structure of the ribosomal subunit using X-ray crystallography, revealing how ribosomes synthesize proteins from genetic information. His work provided atomic-level detail of ribosomal function, understanding of antibiotic mechanisms, and insights into how life processes operate at the molecular level, fundamentally advancing molecular biology and protein synthesis research."
      },
      {
        "name": "Scientific Breakthrough",
        "detail": "His structural studies of the ribosome revealed atomic details of protein synthesis mechanisms, providing unprecedented insight into one of biology's most fundamental processes"
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Chemistry in 2009 shared with others for studies on the structure and function of the ribosome, Fellow of the Royal Society, and numerous other prestigious scientific honors"
      },
      {
        "name": "Why Famous",
        "detail": "Venkatraman Ramakrishnan is celebrated for his groundbreaking structural biology research that revealed how ribosomes function at the atomic level, a discovery that revolutionized molecular biology."
      }
    ],
    "faqs": [
      {
        "q": "What is the ribosome and why is understanding its structure important?",
        "a": "The ribosome is the cellular machinery that synthesizes proteins from genetic instructions. Understanding its structure at the atomic level reveals how life processes operate and how antibiotics work."
      },
      {
        "q": "How did Ramakrishnan determine the ribosomal structure?",
        "a": "He used X-ray crystallography, a technique where X-rays are diffracted through crystallized protein samples to determine their three-dimensional atomic arrangement."
      }
    ]
  },
  {
    "slug": "biography-of-har-gobind-khorana",
    "title": "Biography of Har Gobind Khorana",
    "category": "Biography",
    "intro": "Har Gobind Khorana was an outstanding Indian-American biochemist who won the Nobel Prize for his work on the genetic code. He deciphered how DNA sequences code for amino acids in proteins. His contributions revolutionized molecular biology and genetics worldwide.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Har Gobind Khorana"
      },
      {
        "name": "Born",
        "detail": "9 January 1922 in Raipur, British India, now in Pakistan"
      },
      {
        "name": "Field",
        "detail": "Biochemistry, Molecular Biology, Genetics"
      },
      {
        "name": "Education",
        "detail": "Studied at University of Punjab and University of Liverpool, earning a Ph.D. in organic chemistry, with postdoctoral training at Cambridge University"
      },
      {
        "name": "Career Development",
        "detail": "Worked at research institutes in Switzerland and Canada before joining the University of Wisconsin, later moving to MIT where he conducted his most significant research"
      },
      {
        "name": "Major Contributions",
        "detail": "Har Gobind Khorana deciphered the genetic code by synthesizing artificial RNA molecules and studying how they are translated into proteins, revealing which DNA sequences code for which amino acids. His work demonstrated the complete translation mechanism from DNA to proteins, synthesized the first artificial gene, and provided the molecular foundation for genetic engineering and biotechnology. His discoveries made him the architect of the genetic code."
      },
      {
        "name": "Scientific Breakthrough",
        "detail": "Synthesized artificial gene sequences and demonstrated how they function, proving the theoretical aspects of genetic code and protein synthesis at the molecular level"
      },
      {
        "name": "Awards",
        "detail": "Nobel Prize in Physiology or Medicine in 1968, numerous awards from scientific institutions, and recognition as one of the founders of molecular biology"
      },
      {
        "name": "Death",
        "detail": "9 November 2011 in Cambridge, Massachusetts, USA"
      },
      {
        "name": "Why Famous",
        "detail": "Har Gobind Khorana is remembered as a pioneer of molecular biology who unlocked the genetic code, providing the molecular basis for understanding heredity and enabling modern genetic engineering."
      }
    ],
    "faqs": [
      {
        "q": "What is the genetic code and why is Khorana's work on it important?",
        "a": "The genetic code is the system by which DNA sequences are translated into amino acids and proteins. Khorana's work revealed which sequences code for which amino acids, the fundamental language of life."
      },
      {
        "q": "How did Khorana decipher the genetic code?",
        "a": "He synthesized artificial RNA molecules with known sequences and observed which proteins they produced, systematically mapping out the correspondence between DNA sequences and amino acids."
      }
    ]
  },
  {
    "slug": "biography-of-salim-ali",
    "title": "Biography of Salim Ali",
    "category": "Biography",
    "intro": "Salim Ali was India's greatest ornithologist and wildlife biologist who dedicated his life to studying and protecting birds. He is known as the Birdman of India for his pioneering work in bird conservation and environmental protection. His contributions laid the foundation for modern wildlife conservation in India.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Salimoddin Ali, known as Salim Ali"
      },
      {
        "name": "Born",
        "detail": "12 November 1896 in Mumbai, India"
      },
      {
        "name": "Field",
        "detail": "Ornithology, Wildlife Biology, Environmental Conservation"
      },
      {
        "name": "Education",
        "detail": "Studied zoology at Saint Xavier's College Mumbai and later at Oxford University, specializing in bird studies"
      },
      {
        "name": "Career in Ornithology",
        "detail": "Founded and directed the Bombay Natural History Society, conducted extensive bird surveys across the Indian subcontinent, and established bird sanctuaries and research centers"
      },
      {
        "name": "Major Contributions",
        "detail": "Salim Ali conducted the first comprehensive survey of Indian birds, published the definitive Handbook of the Birds of India and Pakistan, and established the Vedavati Bird Sanctuary. He pioneered bird banding studies, established research methodologies for ornithology, and was instrumental in creating protected areas for bird conservation. His advocacy for environmental protection and wildlife preservation influenced Indian conservation policies."
      },
      {
        "name": "Conservation Work",
        "detail": "Established bird sanctuaries, advocated for wetland protection, and influenced government policies toward wildlife conservation and environmental protection in India"
      },
      {
        "name": "Famous Quote",
        "detail": "Birds are the poetry of the earth, and we must protect them for future generations"
      },
      {
        "name": "Death",
        "detail": "20 July 1987 in Mumbai, India"
      },
      {
        "name": "Why Famous",
        "detail": "Salim Ali is celebrated as the father of Indian ornithology and a pioneer of wildlife conservation whose work established the scientific study of birds and environmental protection in India."
      }
    ],
    "faqs": [
      {
        "q": "Why is Salim Ali called the Birdman of India?",
        "a": "He earned this title through his lifetime dedication to studying and protecting birds, establishing India's first comprehensive bird surveys, and creating sanctuaries that became models for wildlife conservation."
      },
      {
        "q": "What was Salim Ali's major contribution to ornithology?",
        "a": "He conducted the first comprehensive survey of birds across India and Pakistan, published landmark bird identification guides, and established scientific methodologies for bird study and conservation."
      }
    ]
  },
  {
    "slug": "biography-of-verghese-kurien",
    "title": "Biography of Verghese Kurien",
    "category": "Biography",
    "intro": "Verghese Kurien was an Indian engineer and entrepreneur who revolutionized India's dairy industry. He founded the National Dairy Development Board and pioneered the White Revolution, transforming India from a milk-deficit to a milk-surplus nation. His innovations made milk accessible to millions.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Verghese Kurien"
      },
      {
        "name": "Born",
        "detail": "26 September 1921 in Kozhikode, Kerala, India"
      },
      {
        "name": "Field",
        "detail": "Dairy Technology, Agricultural Development, Cooperative Management"
      },
      {
        "name": "Education",
        "detail": "Studied mechanical engineering at University of Michigan, United States, and returned to India to apply his knowledge to dairy production"
      },
      {
        "name": "Career Path",
        "detail": "Joined Kaira District Cooperative Milk Producers' Union in Gujarat, where he pioneered modern dairy techniques and cooperative models that became the foundation for nationwide dairy development"
      },
      {
        "name": "Major Contributions",
        "detail": "Verghese Kurien founded the National Dairy Development Board and led the White Revolution, transforming India's dairy sector from self-sufficiency to surplus through cooperative dairy farming, modern processing technology, and refrigeration systems. He established AMUL and other dairy cooperatives that became world-renowned brands, implemented scientific dairy farming practices, and created employment opportunities for millions of rural farmers, particularly women. His vision made India the world's largest milk producer."
      },
      {
        "name": "White Revolution",
        "detail": "A government initiative led by Kurien to increase milk production, making India self-sufficient in dairy products and creating a billion-dollar industry"
      },
      {
        "name": "Famous Quote",
        "detail": "Milk connects the farmer to the world and brings prosperity to rural India"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Padma Bhushan, and numerous awards for his contributions to agricultural development and rural economy"
      },
      {
        "name": "Death",
        "detail": "9 September 2012 in Anand, Gujarat, India"
      },
      {
        "name": "Why Famous",
        "detail": "Verghese Kurien is celebrated as the architect of the White Revolution who transformed India into the world's largest milk producer through innovation, cooperation, and scientific dairy farming."
      }
    ],
    "faqs": [
      {
        "q": "What was the White Revolution and how did it transform India?",
        "a": "The White Revolution was an initiative to increase milk production in India through cooperative farming and modern technology, transforming India from a milk-deficit nation to the world's largest producer."
      },
      {
        "q": "How did Verghese Kurien benefit rural farmers?",
        "a": "He created cooperative dairy farming models where small farmers could pool resources, sell milk through AMUL and other cooperatives, and receive fair prices, significantly improving rural incomes."
      }
    ]
  },
  {
    "slug": "biography-of-m-s-swaminathan",
    "title": "Biography of M S Swaminathan",
    "category": "Biography",
    "intro": "M S Swaminathan was an Indian scientist who pioneered the Green Revolution in India. He developed high-yield crop varieties and modern agricultural techniques that transformed India from a food-deficit to a food-surplus nation. His contributions saved millions from hunger and poverty.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Monkombu Sambasivan Swaminathan, known as M S Swaminathan"
      },
      {
        "name": "Born",
        "detail": "7 August 1925 in Kumbakonam, Tamil Nadu, India"
      },
      {
        "name": "Field",
        "detail": "Agricultural Science, Genetics, Crop Breeding"
      },
      {
        "name": "Education",
        "detail": "Studied at University of Cambridge and worked with renowned geneticists, earning expertise in crop breeding and genetic improvement"
      },
      {
        "name": "Career Development",
        "detail": "Directed the Indian Agricultural Research Institute and later founded the M S Swaminathan Research Foundation, leading agricultural research and development initiatives"
      },
      {
        "name": "Major Contributions",
        "detail": "M S Swaminathan developed high-yielding wheat and rice varieties that formed the foundation of India's Green Revolution, which increased agricultural productivity and made India self-sufficient in food grains. He promoted conservation of crop genetic resources, sustainable agriculture, and food security initiatives. His research transformed farming practices across Asia, saved millions from hunger, and established India as an agricultural power."
      },
      {
        "name": "Green Revolution Leadership",
        "detail": "Pioneered modern crop breeding techniques and promoted scientific agriculture, collaborating internationally to bring Green Revolution technologies to India"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Padma Bhushan, UNESCO Science Prize, and numerous international awards for agricultural research and food security contributions"
      },
      {
        "name": "Why Famous",
        "detail": "M S Swaminathan is celebrated as the father of the Green Revolution in India whose scientific innovations transformed agriculture and ensured food security for millions."
      }
    ],
    "faqs": [
      {
        "q": "How did the Green Revolution change Indian agriculture?",
        "a": "The Green Revolution introduced high-yielding crop varieties, modern farming techniques, and scientific methods that dramatically increased food grain production, transforming India from importing food to exporting surplus."
      },
      {
        "q": "What crop varieties did M S Swaminathan develop?",
        "a": "He developed high-yielding wheat varieties and rice varieties that were specifically adapted to Indian farming conditions and became the foundation of India's agricultural productivity increase."
      }
    ]
  },
  {
    "slug": "biography-of-ratan-tata",
    "title": "Biography of Ratan Tata",
    "category": "Biography",
    "intro": "Ratan Tata is a legendary Indian industrialist and philanthropist who transformed the Tata Group into a global conglomerate. He pioneered business innovation in India and established Tata as a trustworthy household name. His vision for inclusive capitalism and social responsibility shapes corporate India.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Ratan Naval Tata"
      },
      {
        "name": "Born",
        "detail": "28 December 1937 in Mumbai, India"
      },
      {
        "name": "Field",
        "detail": "Industrial Management, Business Leadership, Philanthropy"
      },
      {
        "name": "Education",
        "detail": "Graduated from Cornell University with a degree in structural engineering, studied architecture and design at Norland College"
      },
      {
        "name": "Career at Tata Group",
        "detail": "Joined Tata Group in 1962, became Chairman in 1991, led major expansion and internationalization of the business conglomerate"
      },
      {
        "name": "Major Contributions",
        "detail": "Ratan Tata transformed the Tata Group into a global corporation with significant operations worldwide, introduced innovative management practices and corporate governance standards, and made strategic acquisitions that expanded Tata's global presence. He pioneered the Nano car project to provide affordable transportation, promoted sustainable business practices, and established Tata as a symbol of business ethics and integrity in India."
      },
      {
        "name": "Global Expansion",
        "detail": "Expanded Tata Group operations internationally through strategic acquisitions and partnerships, making Tata a recognized global brand"
      },
      {
        "name": "Tata Nano",
        "detail": "Pioneered the world's cheapest car to provide affordable transportation to millions, demonstrating inclusive innovation and mass market potential"
      },
      {
        "name": "Philanthropy",
        "detail": "Donated billions to education, healthcare, and social welfare through the Tata Trusts, significantly impacting social development in India"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Ernst and Young Entrepreneur of the Year, Fortune Magazine Business Leader of the Year, and numerous international recognitions"
      },
      {
        "name": "Why Famous",
        "detail": "Ratan Tata is celebrated as a visionary industrialist who transformed Tata Group into a global powerhouse while maintaining ethical business practices and commitment to social responsibility."
      }
    ],
    "faqs": [
      {
        "q": "What was the Tata Nano and why was it significant?",
        "a": "The Tata Nano was the world's cheapest car, priced to be affordable for middle-class Indian families, demonstrating inclusive innovation and expanding car ownership to masses."
      },
      {
        "q": "How did Ratan Tata modernize the Tata Group?",
        "a": "He introduced modern management practices, expanded globally through strategic acquisitions, implemented corporate governance standards, and transformed Tata into a trusted global brand."
      }
    ]
  },
  {
    "slug": "biography-of-j-r-d-tata",
    "title": "Biography of J R D Tata",
    "category": "Biography",
    "intro": "J R D Tata was a pioneering industrialist and aviation enthusiast who founded India's first airline and transformed Indian industry. He was a visionary leader who believed in combining business success with social responsibility. His legacy shaped modern Indian entrepreneurship.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Jehangir Ratanji Dadabhoy Tata, known as J R D Tata"
      },
      {
        "name": "Born",
        "detail": "29 July 1904 in Paris, France, of Parsi-Indian descent"
      },
      {
        "name": "Field",
        "detail": "Industrial Management, Aviation, Entrepreneurship"
      },
      {
        "name": "Education",
        "detail": "Studied in France and England, trained as a mechanical engineer, and learned business management from his uncle Dorab Tata"
      },
      {
        "name": "Aviation Pioneer",
        "detail": "Founded Air India in 1932, India's first airline, and served as its chairman, making aviation accessible to Indians and connecting the nation"
      },
      {
        "name": "Major Contributions",
        "detail": "J R D Tata founded and developed Air India into a world-class airline, pioneered aviation in India, and expanded the Tata Group with numerous industries including steel, textiles, and hotels. He established innovative labor-management relations practices, pioneered employee welfare schemes, and promoted industrial research and development in India. His vision of combining business excellence with social responsibility became the Tata Group's philosophy."
      },
      {
        "name": "Tata Group Development",
        "detail": "Expanded Tata Group operations to multiple sectors and established it as India's largest business conglomerate with global operations"
      },
      {
        "name": "Social Initiatives",
        "detail": "Pioneered employee welfare programs, scholarships for education, and charitable initiatives that became models for corporate social responsibility"
      },
      {
        "name": "Famous Quote",
        "detail": "I believe that the purpose of business is to serve humanity"
      },
      {
        "name": "Death",
        "detail": "29 December 1993 in Mumbai, India"
      },
      {
        "name": "Why Famous",
        "detail": "J R D Tata is celebrated as a visionary industrialist who pioneered aviation in India and demonstrated that business success and social responsibility can go hand in hand."
      }
    ],
    "faqs": [
      {
        "q": "What was J R D Tata's contribution to aviation in India?",
        "a": "He founded Air India in 1932, India's first airline, which he developed into a world-class carrier that connected India globally and pioneered commercial aviation in the country."
      },
      {
        "q": "How did J R D Tata contribute to labor welfare?",
        "a": "He pioneered employee welfare programs, scholarships, healthcare benefits, and fair labor practices that set new standards for corporate social responsibility in India."
      }
    ]
  },
  {
    "slug": "biography-of-dhirubhai-ambani",
    "title": "Biography of Dhirubhai Ambani",
    "category": "Biography",
    "intro": "Dhirubhai Ambani was a legendary Indian entrepreneur who built Reliance Industries from a small trading business into a global petroleum and chemical conglomerate. He pioneered integrated refinery capacity in India and demonstrated the power of Indian entrepreneurship on the world stage. His legacy shapes Indian business today.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Dhirubhai Hirachand Ambani"
      },
      {
        "name": "Born",
        "detail": "28 December 1932 in Junagadh, Gujarat, India"
      },
      {
        "name": "Field",
        "detail": "Petrochemicals, Refining, Textile Manufacturing"
      },
      {
        "name": "Education",
        "detail": "Studied commerce at Gujarat University, worked as a clerk and trader before establishing his own business"
      },
      {
        "name": "Business Beginnings",
        "detail": "Started Reliance Industries as a small textile trading company in 1957 and gradually expanded into manufacturing and petroleum refining"
      },
      {
        "name": "Major Contributions",
        "detail": "Dhirubhai Ambani transformed Reliance Industries into one of India's largest companies through backward and forward integration in petrochemicals and refining. He established world-class refineries at Jamnagar with integrated capacity, pioneered modern management practices in India, and created thousands of employment opportunities. His vision of energy independence for India and commitment to affordable energy shaped the nation's industrial development."
      },
      {
        "name": "Industrial Innovation",
        "detail": "Built integrated refineries combining crude oil processing with petrochemical manufacturing, pioneering technology adoption in India"
      },
      {
        "name": "Business Philosophy",
        "detail": "Believed in ambitious growth targets, technological innovation, and creating wealth for shareholders and stakeholders"
      },
      {
        "name": "Famous Quote",
        "detail": "Dreams are not what you see in your sleep, dreams are things which don't let you sleep"
      },
      {
        "name": "Death",
        "detail": "6 July 2002 in Mumbai, India"
      },
      {
        "name": "Why Famous",
        "detail": "Dhirubhai Ambani is celebrated as a visionary entrepreneur who built Reliance from nothing into a global conglomerate, demonstrating Indian entrepreneurial capability to the world."
      }
    ],
    "faqs": [
      {
        "q": "What was Dhirubhai Ambani's major industrial achievement?",
        "a": "He established the world's largest integrated refinery at Jamnagar, combining crude oil refining with petrochemical manufacturing, making India a petrochemical exporter."
      },
      {
        "q": "How did Dhirubhai Ambani change Indian business practices?",
        "a": "He pioneered modern management techniques, aggressive expansion strategies, and professional organization in Indian industries, setting new standards for business excellence."
      }
    ]
  },
  {
    "slug": "biography-of-narayana-murthy",
    "title": "Biography of Narayana Murthy",
    "category": "Biography",
    "intro": "Narayana Murthy is a pioneering Indian software entrepreneur who founded Infosys, transforming India into a global IT powerhouse. He pioneered offshore software services and demonstrated that Indian talent could compete and excel globally. His vision created millions of jobs in technology.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Nagavara Ramarao Narayana Murthy"
      },
      {
        "name": "Born",
        "detail": "20 August 1946 in Mysore, Karnataka, India"
      },
      {
        "name": "Field",
        "detail": "Information Technology, Software Services, Entrepreneurship"
      },
      {
        "name": "Education",
        "detail": "Graduated from BITS Pilani with a degree in electrical engineering, studied at Indian Institute of Management Ahmedabad"
      },
      {
        "name": "Early Career",
        "detail": "Worked at various IT and technology companies, gaining experience in software development before founding Infosys with six colleagues in 1981"
      },
      {
        "name": "Major Contributions",
        "detail": "Narayana Murthy founded Infosys with a vision to create a globally competitive Indian IT company, pioneering offshore software services that transformed India's technology sector. He demonstrated that Indian software engineers could deliver world-class services to global corporations, established ethical business practices with transparency, and created employment for hundreds of thousands of IT professionals. His leadership established India as the IT services hub of the world."
      },
      {
        "name": "Infosys Growth",
        "detail": "Transformed Infosys from a small startup to a global IT services powerhouse with operations in multiple countries and billions in revenue"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Padma Bhushan, Ernst and Young Entrepreneur of the Year, and numerous international awards for business leadership"
      },
      {
        "name": "Famous Quote",
        "detail": "We believe that the only sustainable competitive advantage is to change faster than others"
      },
      {
        "name": "Why Famous",
        "detail": "Narayana Murthy is celebrated as the architect of India's IT revolution who proved that Indian software professionals could compete globally and created the foundation for India's IT industry."
      }
    ],
    "faqs": [
      {
        "q": "How did Narayana Murthy pioneer offshore IT services?",
        "a": "He founded Infosys with the vision to provide software services to global corporations from India, proving that quality software could be developed at lower costs with Indian talent."
      },
      {
        "q": "What was Narayana Murthy's contribution to Indian economy?",
        "a": "He created a model for the IT services industry that transformed India into a global IT hub, generating billions in exports and employment for millions of technology professionals."
      }
    ]
  },
  {
    "slug": "biography-of-mary-kom",
    "title": "Biography of Mary Kom",
    "category": "Biography",
    "intro": "Mary Kom is a legendary Indian boxer and multiple-time world boxing champion. She broke barriers in a male-dominated sport and became a source of inspiration for millions. Her determination and skill have established her as one of the greatest boxers in the world.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Mery Kom Hkongso, known as Mary Kom"
      },
      {
        "name": "Born",
        "detail": "1 March 1983 in Manipur, India"
      },
      {
        "name": "Field",
        "detail": "Amateur Boxing, Women's Sports"
      },
      {
        "name": "Education",
        "detail": "Studied at various institutions while pursuing a boxing career and training intensively"
      },
      {
        "name": "Boxing Career",
        "detail": "Started boxing at age 12, trained at regional and national levels, and rose to become an international boxing champion"
      },
      {
        "name": "Major Contributions",
        "detail": "Mary Kom won six world amateur boxing championships, more than any other female boxer, competing and winning across multiple weight categories. She represented India at four Olympic Games, winning a bronze medal in 2012 at London Olympics, the first Indian woman boxer to win an Olympic medal. Her achievements broke gender barriers in Indian sports and inspired millions of women to take up boxing and sports."
      },
      {
        "name": "Championship Titles",
        "detail": "Won world amateur boxing championships in five different weight categories, demonstrating exceptional skill and versatility"
      },
      {
        "name": "Olympic Achievement",
        "detail": "Became the first Indian woman boxer to win an Olympic medal with a bronze medal at the 2012 London Olympics"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Padma Bhushan, Asian Games gold medals, and numerous boxing awards"
      },
      {
        "name": "Why Famous",
        "detail": "Mary Kom is celebrated as the greatest female boxer of her generation who broke gender barriers in Indian sports and became an inspiration for women athletes worldwide."
      }
    ],
    "faqs": [
      {
        "q": "How many world boxing championships has Mary Kom won?",
        "a": "Mary Kom has won six world amateur boxing championships across multiple weight categories, more than any other female boxer in history."
      },
      {
        "q": "What was Mary Kom's significance for women's sports in India?",
        "a": "She broke gender barriers by achieving world-class excellence in boxing, becoming the first Indian woman boxer to win an Olympic medal, and inspiring millions of women to pursue sports."
      }
    ]
  },
  {
    "slug": "biography-of-sachin-tendulkar",
    "title": "Biography of Sachin Tendulkar",
    "category": "Biography",
    "intro": "Sachin Tendulkar is widely regarded as the greatest cricketer of all time. He played for India for 24 years and holds numerous cricket records. His consistency, skill, and dedication to the sport made him a living legend and national hero in India.",
    "items": [
      {
        "name": "Full Name",
        "detail": "Sachin Ramesh Tendulkar"
      },
      {
        "name": "Born",
        "detail": "24 April 1973 in Mumbai, India"
      },
      {
        "name": "Field",
        "detail": "Cricket, International Sports"
      },
      {
        "name": "Education",
        "detail": "Studied at Sharadashram Vidyamandir and trained intensively in cricket from childhood"
      },
      {
        "name": "Cricket Career",
        "detail": "Made his international debut at age 16, played for India for 24 years, and retired in 2013 as one of the greatest cricket achievements in history"
      },
      {
        "name": "Major Contributions",
        "detail": "Sachin Tendulkar scored 100 international centuries across all formats of cricket, a record that stood unchallenged until recently, and accumulated 34,357 runs in international cricket, the most by any player. He led India through many victories, played crucial roles in India's 1996 World Cup campaign and 2011 World Cup victory, and demonstrated exceptional skill in batting, with consistency across all formats and playing conditions."
      },
      {
        "name": "Championship Titles",
        "detail": "Won multiple World Cups with India, Asian Games medals, and numerous international cricket championships"
      },
      {
        "name": "Cricket Records",
        "detail": "Holds the record for most international centuries, highest test match runs, and numerous batting records in cricket"
      },
      {
        "name": "Awards",
        "detail": "Padma Shri, Padma Vibhushan, Bharat Ratna, ICC Player of the Year, and numerous cricket awards"
      },
      {
        "name": "Why Famous",
        "detail": "Sachin Tendulkar is revered as the greatest batsman in cricket history whose consistency, skill, and 24-year career made him a global icon and national hero in India."
      }
    ],
    "faqs": [
      {
        "q": "How many international centuries did Sachin Tendulkar score?",
        "a": "Sachin Tendulkar scored 100 international centuries across Test and ODI cricket, a monumental record that made him one of cricket's greatest achievers."
      },
      {
        "q": "What made Sachin Tendulkar the greatest cricketer?",
        "a": "His remarkable consistency over 24 years, skill against all types of bowling, adaptability across formats, technical excellence, and numerous cricket records established him as the greatest batsman."
      }
    ]
  },
  {
    "slug": "longest-rivers-of-india",
    "title": "Longest Rivers of India",
    "category": "India GK",
    "intro": "India is blessed with several major river systems that play a crucial role in agriculture, transportation, and culture. The major rivers of India vary in length, with the Ganges being the longest. These rivers form an integral part of Indian geography and are essential for the survival and development of millions of people.",
    "items": [
      {
        "name": "Ganges (Ganga)",
        "detail": "2525 km long, flows through North India from Uttarakhand to West Bengal, considered sacred in Hinduism"
      },
      {
        "name": "Brahmaputra",
        "detail": "2900 km long (longest), flows through Assam, originates in Tibet"
      },
      {
        "name": "Yangtze",
        "detail": "6300 km long, world's longest river in Asia, flows through China"
      },
      {
        "name": "Godavari",
        "detail": "1465 km long, flows through Maharashtra, Telangana, and Andhra Pradesh"
      },
      {
        "name": "Krishna",
        "detail": "1300 km long, flows through Karnataka, Telangana, and Andhra Pradesh"
      },
      {
        "name": "Indus",
        "detail": "3180 km long, flows through Tibet, Kashmir, and Pakistan"
      },
      {
        "name": "Sutlej",
        "detail": "1540 km long, flows through Punjab and is a tributary of Indus"
      },
      {
        "name": "Narmada",
        "detail": "1290 km long, flows through Madhya Pradesh and Gujarat"
      },
      {
        "name": "Tapti",
        "detail": "724 km long, flows through Madhya Pradesh and Gujarat"
      },
      {
        "name": "Mahanadi",
        "detail": "890 km long, flows through Odisha and Chhattisgarh"
      },
      {
        "name": "Ravi",
        "detail": "720 km long, flows through Himachal Pradesh and Punjab"
      },
      {
        "name": "Chenab",
        "detail": "1180 km long, flows through Himachal Pradesh and Punjab"
      }
    ],
    "faqs": [
      {
        "q": "Which is the longest river in India?",
        "a": "The Brahmaputra is the longest river in India at 2900 km, though the Ganges at 2525 km is often considered more important culturally and geographically within India."
      },
      {
        "q": "Which rivers are part of the Indus river system?",
        "a": "The Sutlej, Ravi, Chenab, and Jhelum are major tributaries of the Indus river system in northwestern India."
      }
    ]
  },
  {
    "slug": "highest-mountain-peaks-of-india",
    "title": "Highest Mountain Peaks of India",
    "category": "Geography",
    "intro": "India has some of the world's highest mountain peaks located in the Himalayan range and other mountain systems. These peaks are important for mountaineering, trekking, and climate regulation. The Himalayas form a natural barrier and are home to diverse flora and fauna.",
    "items": [
      {
        "name": "Kangchenjunga",
        "detail": "8586 m, third highest mountain in the world, located in Sikkim"
      },
      {
        "name": "Nanda Devi",
        "detail": "7816 m, second highest peak entirely within India, located in Uttarakhand"
      },
      {
        "name": "Kamet",
        "detail": "7756 m, located in Uttarakhand in the Garhwal Himalayas"
      },
      {
        "name": "Trishul",
        "detail": "7120 m, located in Uttarakhand, named for Lord Shiva's trident"
      },
      {
        "name": "Namcha Barwa",
        "detail": "7782 m, located in Arunachal Pradesh"
      },
      {
        "name": "Chomo Lhari",
        "detail": "7314 m, located in Sikkim on the India-Bhutan border"
      },
      {
        "name": "Mera Peak",
        "detail": "6476 m, located in Sikkim, popular trekking destination"
      },
      {
        "name": "Kanchenjunga South",
        "detail": "8534 m, alternative peak in the Kangchenjunga range"
      },
      {
        "name": "Tirich Mir",
        "detail": "7708 m, located in Gilgit-Baltistan region"
      },
      {
        "name": "Abi Gamin",
        "detail": "7355 m, located in Uttarakhand in the Garhwal Himalayas"
      }
    ],
    "faqs": [
      {
        "q": "What is the highest peak entirely within India?",
        "a": "Nanda Devi at 7816 m is the highest peak entirely within India, located in Uttarakhand."
      },
      {
        "q": "Which is the highest peak in the Kangchenjunga range?",
        "a": "Kangchenjunga at 8586 m is the highest peak in the range and the third highest mountain in the world."
      }
    ]
  },
  {
    "slug": "classical-dances-of-india",
    "title": "Classical Dances of India",
    "category": "Culture",
    "intro": "India has a rich tradition of classical dances that have been passed down through generations. These dances are distinct in their movements, music, and cultural significance. Each classical dance form is recognized by UNESCO and represents the cultural heritage of different regions of India.",
    "items": [
      {
        "name": "Bharatanatyam",
        "detail": "Originated in Tamil Nadu, characterized by rhythmic footwork and hand gestures, performed in temples"
      },
      {
        "name": "Odissi",
        "detail": "Originated in Odisha, known for graceful movements and lyrical expressions, uses mudras extensively"
      },
      {
        "name": "Kathak",
        "detail": "Originated in North India, emphasizes footwork and storytelling through dance, influenced by Mughal culture"
      },
      {
        "name": "Kathakali",
        "detail": "Originated in Kerala, known for elaborate costumes and face makeup, tells stories from Ramayana and Mahabharata"
      },
      {
        "name": "Kuchipudi",
        "detail": "Originated in Andhra Pradesh, combines classical and folk elements, known for graceful hand movements"
      },
      {
        "name": "Manipuri",
        "detail": "Originated in Manipur, characterized by soft, graceful movements and storytelling, performed at festivals"
      },
      {
        "name": "Mohiniattam",
        "detail": "Originated in Kerala, a solo dance form performed by women, combines elements of Bharatanatyam and Kathakali"
      },
      {
        "name": "Sattriya",
        "detail": "Originated in Assam, performed in Hindu monasteries called Sattras, tells stories of Krishna"
      },
      {
        "name": "Chhau",
        "detail": "Originated in Jharkhand, West Bengal, and Odisha, performed in masked form, tells mythological stories"
      },
      {
        "name": "Yaksagana",
        "detail": "Originated in Karnataka, performed in temples and villages, combines dance, music, and drama"
      }
    ],
    "faqs": [
      {
        "q": "How many classical dances are recognized in India?",
        "a": "There are eight major classical dances recognized by the Sangeet Natak Akademi: Bharatanatyam, Odissi, Kathak, Kathakali, Kuchipudi, Manipuri, Mohiniattam, and Sattriya. Chhau and Yaksagana are also important traditional forms."
      },
      {
        "q": "Which classical dance uses elaborate makeup and costumes?",
        "a": "Kathakali, which originated in Kerala, is famous for its elaborate face makeup and colorful costumes representing different characters."
      }
    ]
  },
  {
    "slug": "major-festivals-of-india",
    "title": "Major Festivals of India",
    "category": "Culture",
    "intro": "India celebrates a diverse range of festivals throughout the year that reflect the country's cultural and religious diversity. These festivals bring communities together and are occasions for celebrations, prayers, and family gatherings. The major festivals of India are celebrated across different regions with unique traditions and customs.",
    "items": [
      {
        "name": "Diwali",
        "detail": "Festival of lights celebrated in October-November, marks victory of good over evil, celebrated across India"
      },
      {
        "name": "Holi",
        "detail": "Festival of colors celebrated in March, signifies arrival of spring and victory of Radha-Krishna over demons"
      },
      {
        "name": "Durga Puja",
        "detail": "Celebrated in September-October, especially in West Bengal, dedicated to Goddess Durga"
      },
      {
        "name": "Navratri",
        "detail": "Nine-day festival celebrated in September-October, dedicated to Goddess Durga, includes Garba and Dandiya in Gujarat"
      },
      {
        "name": "Raksha Bandhan",
        "detail": "Celebrated in July-August, festival celebrating bond between brothers and sisters, sisters tie rakhis on brothers"
      },
      {
        "name": "Eid-ul-Fitr",
        "detail": "Islamic festival celebrated after Ramadan, marks end of the fasting month with feasts and prayers"
      },
      {
        "name": "Christmas",
        "detail": "Celebrated on December 25, commemorates birth of Jesus Christ, celebrated by Christian communities across India"
      },
      {
        "name": "Pongal",
        "detail": "South Indian harvest festival celebrated in January, especially in Tamil Nadu and Andhra Pradesh"
      },
      {
        "name": "Makar Sankranti",
        "detail": "Celebrated in January, marks the beginning of spring season, known as Lohri in Punjab"
      },
      {
        "name": "Ganesh Chaturthi",
        "detail": "Celebrated in August-September, especially in Maharashtra, dedicated to Lord Ganesha"
      },
      {
        "name": "Janmashtami",
        "detail": "Celebrated in August-September, commemorates birth of Lord Krishna with fasting and celebrations"
      },
      {
        "name": "Baisakhi",
        "detail": "Sikh festival celebrated in April, marks Sikh New Year and founding of Khalsa Panth"
      }
    ],
    "faqs": [
      {
        "q": "Which is the most widely celebrated festival in India?",
        "a": "Diwali is the most widely celebrated festival in India, observed across different religions and regions as the festival of lights."
      },
      {
        "q": "What does Holi celebrate?",
        "a": "Holi celebrates the arrival of spring, the victory of good over evil, and is associated with the divine love of Radha and Krishna."
      }
    ]
  },
  {
    "slug": "national-parks-and-wildlife-sanctuaries-of-india",
    "title": "National Parks and Wildlife Sanctuaries of India",
    "category": "Geography",
    "intro": "India has a network of national parks and wildlife sanctuaries dedicated to the conservation of biodiversity and endangered species. These protected areas are home to diverse flora and fauna including tigers, elephants, rhinos, and many other species. India has over 100 national parks and 500+ wildlife sanctuaries.",
    "items": [
      {
        "name": "Jim Corbett National Park",
        "detail": "Located in Uttarakhand, famous for Bengal tigers, first national park in India established in 1936"
      },
      {
        "name": "Kaziranga National Park",
        "detail": "Located in Assam, home to Indian one-horned rhinoceros, UNESCO World Heritage Site"
      },
      {
        "name": "Gir Forest National Park",
        "detail": "Located in Gujarat, home to Asiatic lions, only place in the world where lions live outside Africa"
      },
      {
        "name": "Sundarbans National Park",
        "detail": "Located in West Bengal, largest mangrove forest in the world, home to Bengal tigers"
      },
      {
        "name": "Ranthambore National Park",
        "detail": "Located in Rajasthan, known for tiger conservation, has ruins of Ranthambore Fort"
      },
      {
        "name": "Bandhavgarh National Park",
        "detail": "Located in Madhya Pradesh, has highest density of tigers, rich biodiversity"
      },
      {
        "name": "Keoladeo Ghana National Park",
        "detail": "Located in Rajasthan, important wetland bird sanctuary, UNESCO World Heritage Site"
      },
      {
        "name": "Hemis National Park",
        "detail": "Located in Ladakh, home to snow leopards, largest protected area for snow leopards"
      },
      {
        "name": "Manas National Park",
        "detail": "Located in Assam, UNESCO World Heritage Site, home to tigers, elephants, and rhinoceros"
      },
      {
        "name": "Dandeli Wildlife Sanctuary",
        "detail": "Located in Karnataka, home to tigers, leopards, and various bird species"
      },
      {
        "name": "Sariska Tiger Reserve",
        "detail": "Located in Rajasthan, important tiger conservation area, restored after tiger extinction in 2004"
      },
      {
        "name": "Periyar National Park",
        "detail": "Located in Kerala, known for Asian elephants and tigers, beautiful hill station"
      }
    ],
    "faqs": [
      {
        "q": "How many national parks are there in India?",
        "a": "India has over 100 national parks and 500+ wildlife sanctuaries dedicated to wildlife conservation."
      },
      {
        "q": "Which national park is home to Asiatic lions?",
        "a": "Gir Forest National Park in Gujarat is the only place in the world where Asiatic lions are found outside Africa."
      }
    ]
  },
  {
    "slug": "important-lakes-of-india",
    "title": "Important Lakes of India",
    "category": "Geography",
    "intro": "India has many important lakes that are significant for irrigation, drinking water, hydroelectric power, and tourism. These lakes are formed by glaciers, rivers, and human-made dams. The lakes of India play a crucial role in the ecological balance and water management of the country.",
    "items": [
      {
        "name": "Lake Chilika",
        "detail": "Largest lagoon in India located in Odisha, important bird sanctuary, shallow water lake"
      },
      {
        "name": "Loktak Lake",
        "detail": "Largest freshwater lake in Northeast India located in Manipur, unique floating islands"
      },
      {
        "name": "Sambar Lake",
        "detail": "Largest salt lake in India located in Rajasthan, important bird sanctuary"
      },
      {
        "name": "Pulicat Lake",
        "detail": "Second largest lagoon in India located in Tamil Nadu, important for fishing and birds"
      },
      {
        "name": "Wular Lake",
        "detail": "Largest freshwater lake in India located in Kashmir, important for fishing"
      },
      {
        "name": "Vembanad Lake",
        "detail": "Largest lake in Kerala, backwater system, important for fishing and coconut cultivation"
      },
      {
        "name": "Periyar Lake",
        "detail": "Man-made lake in Kerala, created by Periyar Dam, popular tourist destination"
      },
      {
        "name": "Dal Lake",
        "detail": "Located in Kashmir, surrounded by mountains, famous for houseboats and gardens"
      },
      {
        "name": "Baikal Lake",
        "detail": "Located in Russia, not in India, mentioned for reference as world's deepest lake"
      },
      {
        "name": "Indira Sagar Lake",
        "detail": "Reservoir created by Indira Sagar Dam in Madhya Pradesh on Narmada River"
      },
      {
        "name": "Naini Lake",
        "detail": "Located in Uttarakhand, man-made lake, popular tourist destination in Nainital"
      },
      {
        "name": "Gobind Sagar Lake",
        "detail": "Man-made lake in Himachal Pradesh created by Bhakra Dam, important for power generation"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest lake in India?",
        "a": "Lake Chilika in Odisha is the largest lagoon in India with an area of about 1165 square km."
      },
      {
        "q": "Which is the largest freshwater lake in India?",
        "a": "Wular Lake in Kashmir is the largest freshwater lake in India."
      }
    ]
  },
  {
    "slug": "major-ports-of-india",
    "title": "Major Ports of India",
    "category": "Geography",
    "intro": "India has several major ports along its coastline that serve as important hubs for international and domestic trade. These ports handle a large volume of cargo including containers, bulk goods, and petroleum products. The major ports of India are strategically located for maritime commerce and are vital for the country's economy.",
    "items": [
      {
        "name": "Port of Mumbai",
        "detail": "Located in Maharashtra, largest port in India, handles containers, general cargo, and petroleum"
      },
      {
        "name": "Port of Chennai",
        "detail": "Located in Tamil Nadu, second largest port, handles containers and general cargo"
      },
      {
        "name": "Port of Kolkata",
        "detail": "Located in West Bengal, important port on Ganges River, handles diverse cargo"
      },
      {
        "name": "Port of Cochin",
        "detail": "Located in Kerala, handles containers and general cargo, natural deep-water harbor"
      },
      {
        "name": "Port of Jawaharlal Nehru",
        "detail": "Located in Maharashtra, major container port, handles largest container traffic in India"
      },
      {
        "name": "Port of Kandla",
        "detail": "Located in Gujarat, oldest port in India, handles bulk cargo and containers"
      },
      {
        "name": "Port of Visakhapatnam",
        "detail": "Located in Andhra Pradesh, important port for iron ore and petroleum products"
      },
      {
        "name": "Port of Paradip",
        "detail": "Located in Odisha, handles coal and iron ore, important for mineral exports"
      },
      {
        "name": "Port of Haldia",
        "detail": "Located in West Bengal, handles containers and bulk cargo"
      },
      {
        "name": "Port of Mangalore",
        "detail": "Located in Karnataka, handles general cargo and containers"
      },
      {
        "name": "Port of Karwar",
        "detail": "Located in Karnataka, port for general cargo and fishing"
      },
      {
        "name": "Port of Ratnagiri",
        "detail": "Located in Maharashtra, minor port, handles general cargo"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest port in India?",
        "a": "Port of Mumbai is the largest port in India and serves as a major hub for international trade."
      },
      {
        "q": "How many major ports are there in India?",
        "a": "India has 13 major ports administered by the government, and several hundred minor ports handled by state authorities."
      }
    ]
  },
  {
    "slug": "nuclear-and-space-centres-of-india",
    "title": "Nuclear and Space Centres of India",
    "category": "India GK",
    "intro": "India has established several nuclear and space research centers that contribute to scientific advancement and technological innovation. These centers develop nuclear technology for energy and medical purposes, as well as space technology for satellite communications and exploration. India is a leading nation in nuclear and space technology in Asia.",
    "items": [
      {
        "name": "Indian Space Research Organisation (ISRO)",
        "detail": "Established in 1969, headquartered in Bangalore, responsible for India's space program and satellite launches"
      },
      {
        "name": "Satish Dhawan Space Centre",
        "detail": "Located in Andhra Pradesh, main launch site for ISRO, responsible for launching GSLV and PSLV rockets"
      },
      {
        "name": "Liquid Propulsion Systems Centre",
        "detail": "Located in Tamil Nadu, develops liquid propulsion systems for Indian rockets"
      },
      {
        "name": "Vikram Sarabhai Space Centre",
        "detail": "Located in Kerala, develops satellite launch vehicles and rockets for ISRO"
      },
      {
        "name": "U.R. Rao Satellite Centre",
        "detail": "Located in Bangalore, designs and manufactures satellites for communication and Earth observation"
      },
      {
        "name": "Indian Institute of Space Science and Technology (IIST)",
        "detail": "Located in Kerala, premier institution for space science and technology education"
      },
      {
        "name": "Bhabha Atomic Research Centre (BARC)",
        "detail": "Located in Mumbai, conducts nuclear research for energy and medical applications"
      },
      {
        "name": "Indira Gandhi Centre for Atomic Research (IGCAR)",
        "detail": "Located in Tamil Nadu, conducts research on fast breeder reactor technology"
      },
      {
        "name": "Raja Ramanna Centre for Advanced Technology",
        "detail": "Located in Madhya Pradesh, conducts research on lasers and particle accelerators"
      },
      {
        "name": "Variable Energy Cyclotron Centre",
        "detail": "Located in West Bengal, develops cyclotron technology for nuclear physics research"
      },
      {
        "name": "Nuclear Fuel Complex",
        "detail": "Located in Hyderabad, produces fuel for nuclear reactors"
      },
      {
        "name": "Heavy Water Plant",
        "detail": "Located in various cities, produces heavy water for nuclear reactors"
      }
    ],
    "faqs": [
      {
        "q": "What is ISRO and what does it do?",
        "a": "ISRO (Indian Space Research Organisation) is India's national space agency established in 1969, responsible for launching satellites, space missions, and developing launch vehicle technology."
      },
      {
        "q": "Where are India's nuclear research centers located?",
        "a": "Major nuclear research centers include BARC in Mumbai, IGCAR in Tamil Nadu, and Raja Ramanna Centre in Madhya Pradesh."
      }
    ]
  },
  {
    "slug": "major-dams-of-india",
    "title": "Major Dams of India",
    "category": "Geography",
    "intro": "India has constructed several major dams for irrigation, hydroelectric power generation, and water management. These dams are engineering marvels that have played crucial roles in India's agricultural and industrial development. The major dams of India control large river systems and provide water supply to millions.",
    "items": [
      {
        "name": "Bhakra Dam",
        "detail": "Located in Himachal Pradesh, one of the highest dams in the world, generates hydroelectric power"
      },
      {
        "name": "Aswan Dam (Egypt)",
        "detail": "Not in India, mentioned for reference, one of world's largest dams"
      },
      {
        "name": "Indira Sagar Dam",
        "detail": "Located in Madhya Pradesh on Narmada River, one of the tallest dams in India"
      },
      {
        "name": "Hirakud Dam",
        "detail": "Located in Odisha on Mahanadi River, one of the longest dams in the world by length"
      },
      {
        "name": "Damodar Valley Corporation Dams",
        "detail": "Multiple dams in West Bengal including Bhira and Durgapur for power and irrigation"
      },
      {
        "name": "Rajasthan Canal Dam",
        "detail": "Located in Rajasthan, irrigates vast areas of desert land"
      },
      {
        "name": "Sardar Sarovar Dam",
        "detail": "Located in Gujarat on Narmada River, second tallest dam in India"
      },
      {
        "name": "Mettur Dam",
        "detail": "Located in Tamil Nadu on Kaveri River, provides irrigation and hydroelectric power"
      },
      {
        "name": "Krishna Sagara Dam",
        "detail": "Located in Karnataka, provides irrigation to surrounding agricultural areas"
      },
      {
        "name": "Ravi Dam",
        "detail": "Located in Himachal Pradesh, provides water for irrigation and power generation"
      },
      {
        "name": "Tata Dam",
        "detail": "Located in Madhya Pradesh, one of the oldest dams in India"
      },
      {
        "name": "Kosi Dam",
        "detail": "Located in Bihar, provides flood control and irrigation"
      }
    ],
    "faqs": [
      {
        "q": "What is the highest dam in India?",
        "a": "Indira Sagar Dam in Madhya Pradesh is one of the tallest dams in India at 92 meters height."
      },
      {
        "q": "What are the main purposes of dams in India?",
        "a": "Major purposes include irrigation for agriculture, hydroelectric power generation, flood control, and water supply to cities."
      }
    ]
  },
  {
    "slug": "superlatives-of-india",
    "title": "Superlatives of India",
    "category": "India GK",
    "intro": "India holds numerous superlatives across geography, culture, and development. These superlatives highlight India's diverse landscape, rich heritage, and significant achievements. From the largest to the smallest, India's superlatives showcase its unique position in the world.",
    "items": [
      {
        "name": "Longest River System in India",
        "detail": "Brahmaputra River at 2900 km is the longest river, while Ganges is the longest with major cultural significance"
      },
      {
        "name": "Highest Peak in India",
        "detail": "Kangchenjunga at 8586 m is the highest peak in India, third highest in the world"
      },
      {
        "name": "Largest Lake in India",
        "detail": "Lake Chilika in Odisha is the largest lagoon, while Wular Lake is the largest freshwater lake"
      },
      {
        "name": "Largest Desert in India",
        "detail": "Thar Desert in Rajasthan is the largest desert, covering about 200,000 sq km"
      },
      {
        "name": "Largest Island in India",
        "detail": "Andaman Island in Andaman and Nicobar Islands, larger Andaman and Nicobar archipelago"
      },
      {
        "name": "Largest Mangrove Forest",
        "detail": "Sundarbans in West Bengal is the largest mangrove forest in the world, home to Bengal tigers"
      },
      {
        "name": "Largest Tiger Population",
        "detail": "India has the world's largest tiger population, over 2000 tigers in various reserves"
      },
      {
        "name": "Largest Film Industry",
        "detail": "Bollywood in Mumbai is one of the largest film industries by number of movies produced"
      },
      {
        "name": "Largest Railway Network",
        "detail": "Indian Railways has one of the largest railway networks in the world by route length"
      },
      {
        "name": "Largest Salt Production",
        "detail": "India is one of the largest salt producers in the world, especially in Rajasthan and Gujarat"
      },
      {
        "name": "Largest Cotton Producer",
        "detail": "India is the world's largest cotton producer, important for textile industry"
      },
      {
        "name": "Largest IT Services Exporter",
        "detail": "India is the world's largest exporter of IT and software services"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest lake in India?",
        "a": "Lake Chilika in Odisha is the largest lagoon in India, while Wular Lake in Kashmir is the largest freshwater lake."
      },
      {
        "q": "What is the largest desert in India?",
        "a": "The Thar Desert in Rajasthan is the largest desert in India, covering about 200,000 square kilometers."
      }
    ]
  },
  {
    "slug": "important-battles-in-indian-history",
    "title": "Important Battles in Indian History",
    "category": "History",
    "intro": "Indian history is marked by several important battles that shaped the course of the nation and its political landscape. These battles were fought across different time periods against various invaders and rulers. The important battles of Indian history showcase the valor and military strategies of Indian warriors and leaders.",
    "items": [
      {
        "name": "Battle of Talikota",
        "detail": "Fought in 1565 in Karnataka, between Vijayanagara Empire and Mughal allies, marked decline of Vijayanagara"
      },
      {
        "name": "Battle of Plassey",
        "detail": "Fought in 1757 in West Bengal, British East India Company defeated Nawab of Bengal, led to British dominance"
      },
      {
        "name": "Battle of Buxar",
        "detail": "Fought in 1764 in Bihar, British defeated Nawab of Oudh and Mir Jafar, British control extended"
      },
      {
        "name": "Battle of Panipat",
        "detail": "First Battle of Panipat in 1526 between Babur and Ibrahim Lodi, established Mughal Empire"
      },
      {
        "name": "Battle of Haldighati",
        "detail": "Fought in 1576 in Rajasthan, Maharana Pratap fought against Akbar's forces"
      },
      {
        "name": "Battle of Marathas",
        "detail": "Various battles fought between Maratha Empire and Mughal Empire for regional control"
      },
      {
        "name": "Battle of Assaye",
        "detail": "Fought in 1803 in Maharashtra, British defeated Maratha forces under Sindhia"
      },
      {
        "name": "Battle of Chillianwala",
        "detail": "Fought in 1849 in Punjab, between British and Sikh forces during Anglo-Sikh Wars"
      },
      {
        "name": "Revolt of 1857",
        "detail": "Indian Rebellion against British rule led by various leaders across India"
      },
      {
        "name": "Battle of Argaum",
        "detail": "Fought in 1803, British defeated Maratha forces, extended British control in South India"
      },
      {
        "name": "Battle of Sobraon",
        "detail": "Fought in 1846 in Punjab, British defeated Sikh forces during First Anglo-Sikh War"
      },
      {
        "name": "Battle of Kanwah",
        "detail": "Fought in 1527, Ibrahim Lodi defeated by Babur, important battle in establishing Mughal rule"
      }
    ],
    "faqs": [
      {
        "q": "Which battle led to the establishment of British rule in India?",
        "a": "The Battle of Plassey in 1757 was a turning point where the British East India Company defeated the Nawab of Bengal, leading to British dominance in India."
      },
      {
        "q": "Who won the Battle of Haldighati?",
        "a": "Akbar's general Man Singh won the Battle of Haldighati in 1576, though Maharana Pratap continued his resistance and is remembered for his valor."
      }
    ]
  },
  {
    "slug": "indian-stadiums",
    "title": "Indian Stadiums",
    "category": "Sports",
    "intro": "India has several world-class stadiums that host major sporting events and tournaments. These stadiums are equipped with modern facilities and have hosted international cricket matches, football tournaments, and athletic events. The major stadiums of India reflect the country's passion for sports and entertainment.",
    "items": [
      {
        "name": "Eden Gardens",
        "detail": "Located in Kolkata, one of the oldest cricket grounds in India, home of Kolkata Knight Riders"
      },
      {
        "name": "Arun Jaitley Stadium",
        "detail": "Located in Delhi, former Feroz Shah Kotla, hosts international cricket and football matches"
      },
      {
        "name": "Wankhede Stadium",
        "detail": "Located in Mumbai, home of Mumbai Indians cricket team, hosts IPL matches"
      },
      {
        "name": "Narendra Modi Stadium",
        "detail": "Located in Ahmedabad, largest cricket stadium in the world by capacity at 132,000"
      },
      {
        "name": "M.A. Chidambaram Stadium",
        "detail": "Located in Chennai, home of Chennai Super Kings, one of the oldest cricket grounds"
      },
      {
        "name": "Rajiv Gandhi International Cricket Stadium",
        "detail": "Located in Hyderabad, modern cricket stadium hosting international matches"
      },
      {
        "name": "Arun Jaitley Cricket Ground",
        "detail": "Located in Delhi, international cricket venue"
      },
      {
        "name": "Vidarbha Cricket Association Stadium",
        "detail": "Located in Nagpur, hosts Test cricket matches and domestic cricket"
      },
      {
        "name": "Punjab Cricket Association Stadium",
        "detail": "Located in Chandigarh, hosts domestic and international cricket matches"
      },
      {
        "name": "Jawaharlal Nehru Stadium",
        "detail": "Located in Delhi, hosted 1982 Asian Games, venue for athletics and football"
      },
      {
        "name": "Sansad Marg Stadium",
        "detail": "Located in Delhi, multi-purpose sports complex with various sporting facilities"
      },
      {
        "name": "Subrata Roy Sahara Stadium",
        "detail": "Located in Pune, cricket ground hosting domestic and international matches"
      }
    ],
    "faqs": [
      {
        "q": "Which is the largest cricket stadium in the world?",
        "a": "Narendra Modi Stadium in Ahmedabad is the largest cricket stadium in the world by capacity with over 132,000 seats."
      },
      {
        "q": "Which is the oldest cricket ground in India?",
        "a": "Eden Gardens in Kolkata is one of the oldest cricket grounds in India and the world."
      }
    ]
  },
  {
    "slug": "major-newspapers-and-their-founders",
    "title": "Major Newspapers and Their Founders",
    "category": "India GK",
    "intro": "India has a vibrant print media with several major newspapers that have been instrumental in shaping public opinion and journalism. These newspapers were founded by visionary editors and publishers who believed in the power of media. The major newspapers of India represent diverse perspectives and have rich histories.",
    "items": [
      {
        "name": "Times of India",
        "detail": "Founded in 1838, one of the oldest newspapers in India, published by Bennett Coleman"
      },
      {
        "name": "The Hindu",
        "detail": "Founded in 1878 in Chennai, known for quality journalism and editorial independence"
      },
      {
        "name": "The Statesman",
        "detail": "Founded in 1875, one of India's oldest newspapers, focus on news and analysis"
      },
      {
        "name": "The Telegraph",
        "detail": "Founded in 1864 in Kolkata, important newspaper in Eastern India"
      },
      {
        "name": "Indian Express",
        "detail": "Founded in 1932, known for investigative journalism and fact-checking"
      },
      {
        "name": "The Deccan Herald",
        "detail": "Founded in 1948 by Devraj Urs, important newspaper in Southern India"
      },
      {
        "name": "The Hindustan Times",
        "detail": "Founded in 1924 by K. M. Panikkar, major newspaper in North India"
      },
      {
        "name": "The Asian Age",
        "detail": "Founded in 1994 by M.J. Akbar, known for investigative reporting"
      },
      {
        "name": "Dainik Jagran",
        "detail": "Founded in 1942, largest Hindi newspaper in India by circulation"
      },
      {
        "name": "Amar Ujala",
        "detail": "Founded in 1948, second largest Hindi newspaper in India"
      },
      {
        "name": "The Pioneer",
        "detail": "Founded in 1865, oldest English newspaper still in publication in India"
      },
      {
        "name": "Outlook Magazine",
        "detail": "Founded in 1997 as a weekly magazine, focuses on news and analysis"
      }
    ],
    "faqs": [
      {
        "q": "Which is the oldest newspaper in India?",
        "a": "Times of India, founded in 1838, is one of the oldest newspapers in India and still in publication."
      },
      {
        "q": "Which is the largest Hindi newspaper in India?",
        "a": "Dainik Jagran, founded in 1942, is the largest Hindi newspaper in India by circulation."
      }
    ]
  },
  {
    "slug": "currencies-of-countries",
    "title": "Currencies of Countries",
    "category": "World GK",
    "intro": "Every country in the world has its own currency that serves as the medium of exchange for goods and services. Different countries use different currency names and symbols based on their economic systems and history. The currencies of countries reflect their economic status and international trade relationships.",
    "items": [
      {
        "name": "Indian Rupee",
        "detail": "Currency of India, symbol is INR, subdivided into 100 paise"
      },
      {
        "name": "US Dollar",
        "detail": "Currency of United States, symbol is USD or $, most widely used currency in world"
      },
      {
        "name": "Euro",
        "detail": "Official currency of European Union, symbol is EUR or Euro symbol, used by 19 countries"
      },
      {
        "name": "British Pound Sterling",
        "detail": "Currency of United Kingdom, symbol is GBP or pound sign, one of oldest currencies"
      },
      {
        "name": "Japanese Yen",
        "detail": "Currency of Japan, symbol is JPY, third largest reserve currency in world"
      },
      {
        "name": "Chinese Yuan",
        "detail": "Currency of China, symbol is CNY, fastest growing reserve currency"
      },
      {
        "name": "Swiss Franc",
        "detail": "Currency of Switzerland, symbol is CHF, known for stability"
      },
      {
        "name": "Canadian Dollar",
        "detail": "Currency of Canada, symbol is CAD, important commodity currency"
      },
      {
        "name": "Australian Dollar",
        "detail": "Currency of Australia, symbol is AUD, important for commodity exports"
      },
      {
        "name": "Russian Ruble",
        "detail": "Currency of Russia, symbol is RUB, affected by international sanctions"
      },
      {
        "name": "Brazilian Real",
        "detail": "Currency of Brazil, symbol is BRL, important currency in South America"
      },
      {
        "name": "Mexican Peso",
        "detail": "Currency of Mexico, symbol is MXN, widely used in North America"
      }
    ],
    "faqs": [
      {
        "q": "What is the currency of India?",
        "a": "The currency of India is the Indian Rupee, with the symbol INR, subdivided into 100 paise."
      },
      {
        "q": "Which is the most widely used currency in the world?",
        "a": "The US Dollar (USD) is the most widely used currency in the world and serves as the standard for international trade."
      }
    ]
  },
  {
    "slug": "parliament-names-of-countries",
    "title": "Parliament Names of Countries",
    "category": "World GK",
    "intro": "Each country has a legislative body responsible for making laws and representing the people. Different countries use different names for their legislative assemblies based on their political systems and history. The parliament names of countries reflect their constitutional structures and governmental systems.",
    "items": [
      {
        "name": "India",
        "detail": "Parliament (Lok Sabha and Rajya Sabha), bicameral legislature with elected and nominated members"
      },
      {
        "name": "United Kingdom",
        "detail": "Parliament (House of Commons and House of Lords), bicameral system with hereditary and appointed peers"
      },
      {
        "name": "United States",
        "detail": "Congress (Senate and House of Representatives), bicameral legislature of 535 members"
      },
      {
        "name": "Australia",
        "detail": "Parliament (Senate and House of Representatives), federal bicameral legislature"
      },
      {
        "name": "Canada",
        "detail": "Parliament (Senate and House of Commons), bicameral legislature under Commonwealth system"
      },
      {
        "name": "France",
        "detail": "National Assembly (Assemblee Nationale), unicameral legislature in Fifth Republic"
      },
      {
        "name": "Germany",
        "detail": "Bundestag (Federal Diet), main legislative body of German parliament"
      },
      {
        "name": "Japan",
        "detail": "Diet (House of Councillors and House of Representatives), bicameral legislature"
      },
      {
        "name": "Russia",
        "detail": "Federal Assembly (Duma and Federation Council), bicameral legislature"
      },
      {
        "name": "China",
        "detail": "National People's Congress, unicameral legislature, highest state power"
      },
      {
        "name": "Brazil",
        "detail": "National Congress (Senate and Chamber of Deputies), bicameral legislature"
      },
      {
        "name": "South Africa",
        "detail": "Parliament (National Assembly and National Council of Provinces), bicameral legislature"
      }
    ],
    "faqs": [
      {
        "q": "What is the parliament of India called?",
        "a": "The parliament of India is called the Indian Parliament, comprising the Lok Sabha (House of People) and the Rajya Sabha (Council of States)."
      },
      {
        "q": "What is the legislature of the United States called?",
        "a": "The legislature of the United States is called Congress, consisting of the Senate and the House of Representatives."
      }
    ]
  }
];
export const GK_CATEGORIES = (): string[] => [...new Set(GK_TOPICS.map((g) => g.category))];
export function getGkTopic(slug: string): GkTopic | undefined {
  return GK_TOPICS.find((g) => g.slug === slug);
}
