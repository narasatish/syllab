/**
 * fullForms.ts — "Full Form" SEO cluster (e.g. "NCERT full form", "CPU full form").
 * High-search, evergreen reference pages at /full-forms/{slug}.
 * Data is generated; keep expansions factually accurate.
 */
export interface FullForm {
  slug: string;
  term: string;          // "NCERT"
  fullForm: string;      // "National Council of Educational Research and Training"
  category: string;      // "Education & Exams", ...
  description: string;
  related: string[];     // related abbreviations
}

export const FULL_FORMS: FullForm[] = [
  {
    "slug": "ncert",
    "term": "NCERT",
    "fullForm": "National Council of Educational Research and Training",
    "category": "Education & Exams",
    "description": "NCERT is the government body that designs the textbooks used in most Indian schools following the national curriculum. These books are the standard resource for Classes 1 through 12 and cover subjects like Science, Maths, History, and Geography. Every CBSE and many state board students rely on NCERT books as their main study material because the exam questions are based on these textbooks. Learning NCERT content thoroughly is essential because it forms the foundation for competitive exams like JEE and NEET.",
    "related": [
      "CBSE",
      "SCERT",
      "ICSE"
    ]
  },
  {
    "slug": "cbse",
    "term": "CBSE",
    "fullForm": "Central Board of Secondary Education",
    "category": "Education & Exams",
    "description": "CBSE is the main education board that governs schools across India, setting the curriculum and conducting board exams for Classes 10 and 12. Most private schools and many government schools in India follow the CBSE pattern, which emphasizes both concept understanding and application. Your CBSE Class 10 board exam results determine your stream choice (Science, Commerce, or Arts), and Class 12 results are crucial for college admission. CBSE exams are standardized nationwide, so your scores are recognized equally anywhere in India.",
    "related": [
      "NCERT",
      "ICSE",
      "ISC"
    ]
  },
  {
    "slug": "icse",
    "term": "ICSE",
    "fullForm": "Indian Certificate of Secondary Education",
    "category": "Education & Exams",
    "description": "ICSE is an alternative education board in India that follows a more comprehensive and detailed curriculum compared to CBSE, often favored by premium schools. The ICSE curriculum emphasizes English language skills, practical applications, and broader subject knowledge across Classes 1 through 10. Schools following ICSE are typically more expensive and considered competitive, and ICSE exam results are well-regarded for college admissions. However, ICSE students preparing for JEE or NEET often need extra coaching because these entrance exams follow CBSE-style content patterns.",
    "related": [
      "CBSE",
      "ISC",
      "NCERT"
    ]
  },
  {
    "slug": "isc",
    "term": "ISC",
    "fullForm": "Indian School Certificate",
    "category": "Education & Exams",
    "description": "ISC is the senior secondary board (Classes 11 and 12) run by the same council that manages ICSE, providing an alternative to CBSE for higher studies. ISC follows a structure similar to ICSE but with greater subject specialization and depth, allowing students to choose from many optional subjects. Colleges and universities in India recognize ISC qualifications equally with CBSE for entrance, but ISC students may need additional JEE preparation materials since those exams align more with CBSE content. ISC is chosen mainly by students in ICSE schools who want to continue in a premium education stream.",
    "related": [
      "ICSE",
      "CBSE",
      "State Board"
    ]
  },
  {
    "slug": "neet",
    "term": "NEET",
    "fullForm": "National Eligibility cum Entrance Test",
    "category": "Education & Exams",
    "description": "NEET is the single national entrance exam that every Indian student must clear to get into medical colleges (MBBS) or dental colleges (BDS) anywhere in India. The exam tests knowledge from Class 11 and 12 Physics, Chemistry, and Biology, and is conducted once a year with lakhs of students competing. Your NEET score determines not only whether you get into a medical college but also which college and course you can choose based on your rank. This exam is extremely competitive, and medical aspirants start serious preparation from Class 10 or 11 itself.",
    "related": [
      "AIIMS",
      "JIPMER",
      "MBBS"
    ]
  },
  {
    "slug": "jee-main",
    "term": "JEE Main",
    "fullForm": "Joint Entrance Examination Main",
    "category": "Education & Exams",
    "description": "JEE Main is the first-stage entrance exam for engineering colleges in India, testing Physics, Chemistry, and Mathematics from Class 11 and 12 curriculum. Every engineering aspirant in India takes JEE Main, and your score determines eligibility for JEE Advanced (for IITs) and also admission to NITs and other engineering colleges through the counseling process. JEE Main is conducted multiple times a year, allowing students to attempt it twice and take the better score, making it slightly more accessible than it used to be. Clearing JEE Main with a decent rank opens doors to thousands of engineering colleges across India.",
    "related": [
      "JEE Advanced",
      "IIT",
      "NTA"
    ]
  },
  {
    "slug": "jee-advanced",
    "term": "JEE Advanced",
    "fullForm": "Joint Entrance Examination Advanced",
    "category": "Education & Exams",
    "description": "JEE Advanced is the second stage of the JEE exam conducted only for students who qualify in JEE Main with a very high rank. This exam is significantly harder and tests deeper conceptual understanding; only the top 2.5 lakh JEE Main qualifiers can attempt JEE Advanced, and it is the sole way to get admission into the 23 Indian Institutes of Technology (IITs). JEE Advanced requires 8-10 months of focused preparation and is considered one of the toughest engineering exams in the world, with only about 10% of attempted students securing an IIT seat. Performing well in JEE Advanced can change your career trajectory completely as IITs have world-class placements and alumni networks.",
    "related": [
      "JEE Main",
      "IIT",
      "NTA"
    ]
  },
  {
    "slug": "iit",
    "term": "IIT",
    "fullForm": "Indian Institute of Technology",
    "category": "Education & Exams",
    "description": "IIT stands for Indian Institute of Technology, a group of 23 prestigious engineering colleges located in different cities across India that offer world-class engineering education and are globally recognized. An IIT degree is highly valued in India and abroad, with IIT graduates earning excellent salaries and working at top companies like Google, Microsoft, and ISRO. Getting into an IIT requires clearing JEE Advanced with a top rank, which typically involves 18-24 months of rigorous preparation, and only about 10,000 students nationwide secure an IIT seat each year. IITs also offer postgraduate programs (MTech, PhD) and are centers for cutting-edge research in engineering and technology.",
    "related": [
      "JEE Advanced",
      "NIT",
      "BITS"
    ]
  },
  {
    "slug": "nit",
    "term": "NIT",
    "fullForm": "National Institute of Technology",
    "category": "Education & Exams",
    "description": "NITs are 31 National Institutes of Technology spread across India offering quality engineering education at a level below IITs but still highly respected and sought after. Admission to NITs is through JEE Main score, so if your JEE Main rank is good but not high enough for IITs, NIT colleges become your target through the national counseling process. NIT graduates also have strong placement records and good job opportunities in both government and private sectors, though placements are slightly lower than IITs. NITs are more affordable than private engineering colleges and provide good peer groups and infrastructure for engineering studies.",
    "related": [
      "IIT",
      "JEE Main",
      "BITS"
    ]
  },
  {
    "slug": "bits",
    "term": "BITS",
    "fullForm": "Birla Institute of Technology and Science",
    "category": "Education & Exams",
    "description": "BITS is Birla Institute of Technology and Science, a top-tier private engineering college with campuses in Pilani, Goa, and Hyderabad, known for academic excellence and industry exposure. BITS conducts its own entrance exam (BITSAT) and does not require JEE Main or Advanced; students can gain admission based purely on BITSAT score, making it an alternative pathway to quality engineering education. BITS is known for its emphasis on project-based learning, internships, and strong industry connections, which result in excellent placements and higher starting salaries. Attending BITS is expensive compared to IITs and NITs, but many students consider it worth the investment for the quality of education and career outcomes.",
    "related": [
      "JEE Main",
      "NIT",
      "IIT"
    ]
  },
  {
    "slug": "upsc",
    "term": "UPSC",
    "fullForm": "Union Public Service Commission",
    "category": "Education & Exams",
    "description": "UPSC is the Union Public Service Commission, the body that conducts recruitment exams for top government jobs in India like IAS (bureaucrats), IPS (police officers), and other central government positions. The UPSC Civil Services Exam is considered one of the toughest competitive exams in India, with a success rate of less than 0.1%, and requires 1-3 years of consistent preparation from school or college level. Clearing UPSC gives you a prestigious government job with power, respect, and job security for life, making it the dream goal of many intelligent and civically-minded Indian students. The exam has three stages: Prelims (MCQ test), Mains (essay and detailed answer papers), and Interview (personality assessment).",
    "related": [
      "IAS",
      "IPS",
      "BPSC"
    ]
  },
  {
    "slug": "ias",
    "term": "IAS",
    "fullForm": "Indian Administrative Service",
    "category": "Education & Exams",
    "description": "IAS stands for Indian Administrative Service, which is the highest civil service in India and recruits officers who work as collectors, district magistrates, and eventually top government administrators. IAS officers are responsible for implementing government policies, maintaining law and order, and managing administrative affairs in their assigned districts or departments. Clearing UPSC and joining IAS gives you immense power and responsibility in shaping public policy and development at the grassroots level, making it one of the most coveted careers for ambitious students. IAS officers are respected across India and have excellent salary, pension, and post-retirement benefits.",
    "related": [
      "UPSC",
      "IPS",
      "IFS"
    ]
  },
  {
    "slug": "ips",
    "term": "IPS",
    "fullForm": "Indian Police Service",
    "category": "Education & Exams",
    "description": "IPS stands for Indian Police Service, the top-level police cadre in India from which police commissioners, DIG (Deputy Inspector General), and other senior police officers are recruited. IAS officers work on administration and policy, while IPS officers directly handle law enforcement, crime investigation, and maintaining public safety at state and national levels. Joining IPS requires clearing the UPSC Civil Services Exam and is attractive for students interested in crime-fighting, investigation work, and contributing to public security. IPS officers are posted across India and are responsible for important cases like terrorism, organized crime, and maintaining civil order.",
    "related": [
      "UPSC",
      "IAS",
      "CBI"
    ]
  },
  {
    "slug": "ifs",
    "term": "IFS",
    "fullForm": "Indian Forest Service",
    "category": "Education & Exams",
    "description": "IFS stands for Indian Forest Service, which recruits officers who manage India's forests, wildlife conservation, environmental protection, and forest resources across the country. IFS officers work under the Ministry of Environment and conduct activities like anti-poaching operations, forest management, wildlife research, and environmental policy implementation. This service appeals to students passionate about nature, conservation, and environmental sustainability, offering both outdoor fieldwork and administrative responsibilities. Like IAS and IPS, IFS recruitment happens through UPSC Civil Services Exam, and IFS officers have strong career growth and postings across India's diverse ecosystems.",
    "related": [
      "UPSC",
      "IAS",
      "Ministry of Environment"
    ]
  },
  {
    "slug": "nda",
    "term": "NDA",
    "fullForm": "National Defence Academy",
    "category": "Education & Exams",
    "description": "NDA stands for National Defence Academy, which is a joint-service military academy in Pune that trains officers for the Army, Navy, and Air Force through a competitive entrance exam. The NDA entrance exam is open to class 12 pass students and is conducted twice a year; candidates who qualify then undergo 3 years of intensive military training before commissioning as officers. Joining NDA is a pathway for young Indians to serve the country in the military, gain leadership training, and build a prestigious military career with excellent salary, pension, and respect. NDA training includes both academic education and military discipline, making it one of India's most selective and respected officer recruitment channels.",
    "related": [
      "CDS",
      "AFCAT",
      "Armed Forces"
    ]
  },
  {
    "slug": "cds",
    "term": "CDS",
    "fullForm": "Combined Defence Services",
    "category": "Education & Exams",
    "description": "CDS stands for Combined Defence Services, which conducts recruitment exams for officers in the Indian Army, Navy, Air Force, and Coast Guard for those who have completed graduation. The CDS exam is held twice yearly and is open to college graduates, making it a popular choice for students who want to join the military after completing their degree. CDS-selected officers go through a training period similar to NDA but are recruited at a later age, typically 23-25 years old, and directly commission as officers. This is an excellent career choice for patriotic graduates interested in serving the nation, with good job security and benefits.",
    "related": [
      "NDA",
      "AFCAT",
      "UPSC"
    ]
  },
  {
    "slug": "kvs",
    "term": "KVS",
    "fullForm": "Kendriya Vidyalaya Sangathan",
    "category": "Education & Exams",
    "description": "KVS stands for Kendriya Vidyalaya Sangathan, a system of central government schools across India that are funded and managed by the government and offer affordable quality education. KVS schools follow CBSE curriculum, have English as the medium of instruction, and are found in nearly every district of India, making them accessible to the general public including military and government employee families. KVS schools are known for discipline, good academic performance, and producing excellent competitive exam results, with many KVS alumni clearing NEET, JEE, and UPSC. These schools charge minimal fees and are particularly popular with government employee families as KVS also has schools in military cantonment areas.",
    "related": [
      "CBSE",
      "NCERT",
      "Navodaya"
    ]
  },
  {
    "slug": "scert",
    "term": "SCERT",
    "fullForm": "State Council of Educational Research and Training",
    "category": "Education & Exams",
    "description": "SCERT stands for State Council of Educational Research and Training, which is the education authority in each Indian state responsible for designing school curriculum and conducting state board exams. Different states have different SCERTs and education boards (like Maharashtra Board, Tamil Nadu Board, Karnataka Board), and these boards set the syllabus and exam patterns for schools in their respective states. Students studying in state board schools follow the curriculum and take exams designed by their state SCERT, which may differ from CBSE or ICSE patterns. If a student plans to move to another state, their state board qualifications are recognized nationwide, but competitive exam preparation may require adjusting to different curriculum patterns.",
    "related": [
      "NCERT",
      "State Board",
      "CBSE"
    ]
  },
  {
    "slug": "gpa",
    "term": "GPA",
    "fullForm": "Grade Point Average",
    "category": "Education & Exams",
    "description": "GPA stands for Grade Point Average, a numerical measure of academic performance used by colleges and universities to evaluate student achievement in each semester or course. In India, GPA is typically calculated on a 4.0 or 10.0 scale, where each grade (A, B, C) earned in a subject is converted to points and averaged; for example, if you score 90% in Maths, it might convert to 4.0 GPA. Most Indian college students need to maintain a minimum GPA (often 2.5-3.0) to stay enrolled, and higher GPAs improve your chances of scholarships, internships, and placements. When applying for jobs or higher studies abroad, your GPA is one of the key credentials examined by employers and universities.",
    "related": [
      "CGPA",
      "Percentage",
      "Marks"
    ]
  },
  {
    "slug": "cgpa",
    "term": "CGPA",
    "fullForm": "Cumulative Grade Point Average",
    "category": "Education & Exams",
    "description": "CGPA stands for Cumulative Grade Point Average, which is the overall GPA calculated across all semesters of your college degree, showing your complete academic performance. Unlike GPA which is calculated per semester or per course, CGPA is the final aggregate that appears on your degree certificate and represents your entire college journey performance. Most companies in India use CGPA as a screening criterion during campus placements, with many requiring a minimum CGPA of 6.5 or higher for eligibility; some premium companies require 7.5 or above. Maintaining a high CGPA throughout college is important for placements, higher education abroad, and competitive job applications.",
    "related": [
      "GPA",
      "Percentage",
      "Grades"
    ]
  },
  {
    "slug": "cpu",
    "term": "CPU",
    "fullForm": "Central Processing Unit",
    "category": "Computer & Tech",
    "description": "CPU stands for Central Processing Unit, which is the 'brain' of a computer that performs all calculations and executes instructions, determining how fast your computer can process data. Every device from your smartphone to a laptop contains a CPU, and faster CPUs (measured in GHz) process tasks quicker, making your device more responsive for gaming, video editing, or coding. Popular CPUs include Intel Core, AMD Ryzen for laptops, and Snapdragon for phones; students learning computer science study CPU architecture and how CPUs execute programs at the assembly language level. The power and efficiency of a CPU directly affect your device's performance and battery life, making it one of the most important hardware components.",
    "related": [
      "RAM",
      "GPU",
      "Processor"
    ]
  },
  {
    "slug": "ram",
    "term": "RAM",
    "fullForm": "Random Access Memory",
    "category": "Computer & Tech",
    "description": "RAM stands for Random Access Memory, which is the temporary memory your computer uses while running programs, much faster than your hard drive but erased when you shut down the device. The more RAM you have (measured in GB), the more programs and browser tabs you can run simultaneously without your computer slowing down; 8GB is minimum for students today, 16GB is recommended for smooth multitasking. When your RAM runs out, your computer slows dramatically because it starts using the hard drive as backup (called virtual memory), which is much slower. Students should check their RAM when choosing a laptop, as insufficient RAM makes coding, video editing, and online classes frustrating.",
    "related": [
      "ROM",
      "CPU",
      "Storage"
    ]
  },
  {
    "slug": "rom",
    "term": "ROM",
    "fullForm": "Read Only Memory",
    "category": "Computer & Tech",
    "description": "ROM stands for Read Only Memory, which is permanent memory in your device that stores the basic instructions needed for the computer to start and function, and cannot be easily erased. Unlike RAM which is cleared when powered off, ROM retains its data permanently and contains the computer's firmware or operating system boot code; your smartphone's ROM is where the Android or iOS system is stored. When people talk about phone storage (32GB, 64GB, 128GB), they are referring to ROM; more ROM means more space to install apps and store files. ROM is slower than RAM but is essential for your device to work, and if ROM gets corrupted, your device may not boot at all.",
    "related": [
      "RAM",
      "Storage",
      "Memory"
    ]
  },
  {
    "slug": "ssd",
    "term": "SSD",
    "fullForm": "Solid State Drive",
    "category": "Computer & Tech",
    "description": "SSD stands for Solid State Drive, a fast storage device with no moving parts that stores all your files, programs, and operating system permanently even after shutdown. SSDs are much faster than traditional hard drives (HDDs), making your entire computer feel snappier; booting Windows takes 10-15 seconds on an SSD versus 30-45 seconds on an HDD. For students, an SSD dramatically improves the experience of opening files, launching applications like coding IDEs, and running virtual machines for programming projects. Most new computers and laptops today come with SSDs, and they have become affordable enough that upgrading from HDD to SSD is one of the best performance investments you can make.",
    "related": [
      "HDD",
      "RAM",
      "Storage"
    ]
  },
  {
    "slug": "hdd",
    "term": "HDD",
    "fullForm": "Hard Disk Drive",
    "category": "Computer & Tech",
    "description": "HDD stands for Hard Disk Drive, the older technology for permanent data storage that uses spinning magnetic disks, much slower than modern SSDs but cheaper and capable of storing large amounts of data. Older laptop and desktop computers primarily used HDDs, which still work fine for everyday tasks but are noticeably slower when opening files or launching programs compared to SSDs. HDDs are still used for external backup drives and long-term file storage because they offer large capacity at lower cost; a 1TB or 2TB external HDD is common for backing up school projects and videos. However, for fast performance today, SSDs are preferred, and you should avoid buying devices with only HDDs unless budget is a strict constraint.",
    "related": [
      "SSD",
      "Storage",
      "ROM"
    ]
  },
  {
    "slug": "http",
    "term": "HTTP",
    "fullForm": "HyperText Transfer Protocol",
    "category": "Computer & Tech",
    "description": "HTTP stands for HyperText Transfer Protocol, the standard set of rules that governs how web browsers (like Chrome, Firefox) communicate with web servers to fetch and display web pages. When you type a URL in your browser and press Enter, HTTP is the invisible language that your browser uses to ask the server 'send me this page,' and the server responds by sending the page data. HTTP sends data without encryption, meaning theoretically someone could spy on it, which is why sensitive actions like online banking should only happen on HTTPS websites. Understanding HTTP is important for students learning web development or cybersecurity as it forms the foundation of how the internet works.",
    "related": [
      "HTTPS",
      "URL",
      "Web"
    ]
  },
  {
    "slug": "https",
    "term": "HTTPS",
    "fullForm": "HyperText Transfer Protocol Secure",
    "category": "Computer & Tech",
    "description": "HTTPS stands for HyperText Transfer Protocol Secure, an encrypted version of HTTP that protects your data with special codes so no one can spy on your information while browsing. When you see a padlock icon in your browser and the URL starts with HTTPS, it means your connection is secure and your passwords, credit card details, or personal information cannot be intercepted by hackers. All legitimate banking websites, email providers, and shopping sites use HTTPS to protect your data; if a website asks for sensitive information but does not use HTTPS, it is untrustworthy and you should not enter personal details. For students learning web development, implementing HTTPS on websites is now a basic requirement for security.",
    "related": [
      "HTTP",
      "SSL",
      "Encryption"
    ]
  },
  {
    "slug": "url",
    "term": "URL",
    "fullForm": "Uniform Resource Locator",
    "category": "Computer & Tech",
    "description": "URL stands for Uniform Resource Locator, which is the complete web address you type in your browser (like www.syllab.in/class-10-maths) that tells your browser exactly where to find a specific page on the internet. Every URL has three main parts: the protocol (http or https), the domain name (like google.com), and the path (like /search); together they uniquely identify a single web page. URLs are case-insensitive for the domain part but case-sensitive for the path, so typing an URL incorrectly can lead to a 404 error (page not found). Understanding URLs is essential for students navigating the internet safely, recognizing legitimate websites versus fake ones, and learning web development.",
    "related": [
      "HTTP",
      "Domain",
      "Website"
    ]
  },
  {
    "slug": "usb",
    "term": "USB",
    "fullForm": "Universal Serial Bus",
    "category": "Computer & Tech",
    "description": "USB stands for Universal Serial Bus, the standard connector and protocol that allows you to plug devices like phones, external hard drives, and keyboards into computers for data transfer and power. The most common USB types are USB-A (rectangular, older), USB-C (reversible, newer), and Micro-USB (common on older phones), and they allow you to charge devices, transfer files, and connect peripherals to your computer. USB is essential for students as it lets you backup school projects, transfer files from one device to another, and connect external storage for your coursework. Most modern computers and smartphones use USB-C as it is faster and more convenient than older USB-A connectors.",
    "related": [
      "Port",
      "Device",
      "Connection"
    ]
  },
  {
    "slug": "pdf",
    "term": "PDF",
    "fullForm": "Portable Document Format",
    "category": "Computer & Tech",
    "description": "PDF stands for Portable Document Format, a file format that preserves the exact formatting and appearance of a document regardless of what device or software opens it, making it ideal for sharing study materials. PDFs are widely used in education for textbooks, research papers, exam questions, and assignment submissions because they look identical on a phone, laptop, or printer. NCERT textbooks, competitive exam papers, and e-books are commonly distributed as PDFs; you can easily annotate PDFs (highlight, add notes, underline) using free apps on your phone or computer. Understanding how to create, edit, and share PDFs is a useful technical skill for students managing their academic work.",
    "related": [
      "Document",
      "File",
      "Format"
    ]
  },
  {
    "slug": "html",
    "term": "HTML",
    "fullForm": "HyperText Markup Language",
    "category": "Computer & Tech",
    "description": "HTML stands for HyperText Markup Language, which is the basic code language used to create the structure and content of web pages that you see in your browser. When you click 'View Page Source' in your browser, you see HTML code with tags like <title>, <h1>, <p> that tell the browser 'this is a heading', 'this is a paragraph', etc. HTML is the foundation of web development and is beginner-friendly to learn; students interested in web design or development start by learning HTML to build their first web pages. Combined with CSS (for styling) and JavaScript (for interactivity), HTML forms the core of all modern websites.",
    "related": [
      "CSS",
      "JavaScript",
      "Web"
    ]
  },
  {
    "slug": "css",
    "term": "CSS",
    "fullForm": "Cascading Style Sheets",
    "category": "Computer & Tech",
    "description": "CSS stands for Cascading Style Sheets, the code language used to style and design web pages by controlling colors, fonts, layouts, and spacing of HTML elements. While HTML provides the structure and content, CSS makes the website look beautiful; for example, HTML creates a button but CSS makes it blue, round, and clickable-looking. CSS is essential for web design and is usually learned after HTML; students building websites use CSS to create responsive layouts that look good on phones and computers. Mastering CSS is crucial for front-end web development jobs in India, where CSS skills are in high demand in web development companies and startups.",
    "related": [
      "HTML",
      "JavaScript",
      "Web"
    ]
  },
  {
    "slug": "js",
    "term": "JS",
    "fullForm": "JavaScript",
    "category": "Computer & Tech",
    "description": "JavaScript (JS) is a programming language that makes web pages interactive; it runs in your browser and can respond to clicks, form submissions, and user inputs in real-time without reloading the page. When you click a button on a website and see instant changes (like showing hidden content or validating your form), that's usually JavaScript at work. JavaScript is one of the most popular programming languages for students learning to code because it is beginner-friendly and you can see results immediately in your browser. Learning JavaScript opens careers in web development, and nearly every tech company in India needs JavaScript developers.",
    "related": [
      "HTML",
      "CSS",
      "Programming"
    ]
  },
  {
    "slug": "ai",
    "term": "AI",
    "fullForm": "Artificial Intelligence",
    "category": "Computer & Tech",
    "description": "AI stands for Artificial Intelligence, which refers to computer systems designed to perform tasks that typically require human intelligence, such as understanding language, recognizing images, playing games, or making decisions. AI is increasingly integrated into everyday apps: your phone's camera recognizes faces, Gmail suggests email completions, YouTube recommends videos, and ChatGPT understands and answers questions. For students, understanding AI is becoming essential as it is transforming industries from healthcare (medical diagnosis) to banking (fraud detection) to education (personalized learning); learning AI concepts and coding AI models is a valuable career skill. India has a huge opportunity in AI jobs, and students learning machine learning and deep learning can secure excellent positions in tech companies.",
    "related": [
      "ML",
      "Deep Learning",
      "Algorithm"
    ]
  },
  {
    "slug": "ml",
    "term": "ML",
    "fullForm": "Machine Learning",
    "category": "Computer & Tech",
    "description": "Machine Learning (ML) is a subset of AI where computer systems learn from examples and data rather than being explicitly programmed, improving their performance with experience. For example, your email spam filter uses ML to learn what looks like spam from the millions of emails it processes, getting smarter over time at filtering without being manually programmed for every spam type. ML is used everywhere: Netflix recommends shows, banks detect fraud, hospitals diagnose diseases, and voice assistants understand commands; students learning ML can build systems that learn from data. Learning ML requires knowledge of Python programming, statistics, and data, and Indian tech companies heavily hire ML engineers with competitive salaries.",
    "related": [
      "AI",
      "Deep Learning",
      "Algorithm"
    ]
  },
  {
    "slug": "gps",
    "term": "GPS",
    "fullForm": "Global Positioning System",
    "category": "Computer & Tech",
    "description": "GPS stands for Global Positioning System, a satellite-based navigation system that pinpoints your exact location on Earth within a few meters, used by phones, cars, and delivery apps to track location. Your phone's GPS chip communicates with satellites orbiting Earth to calculate your latitude, longitude, and altitude, which allows apps like Google Maps to show your location and provide directions. GPS is essential for apps like Uber, food delivery, and fitness trackers, and understanding how GPS works is important for students learning mobile app development or geolocation services. GPS works best outdoors with clear sky visibility; indoors or underground, GPS may struggle while WiFi-based location services (like through cell towers) work better.",
    "related": [
      "Location",
      "Navigation",
      "Satellite"
    ]
  },
  {
    "slug": "sim",
    "term": "SIM",
    "fullForm": "Subscriber Identity Module",
    "category": "Computer & Tech",
    "description": "SIM stands for Subscriber Identity Module, a small chip card in your phone that stores your phone number, carrier information, and authentication data that identifies you to your mobile network provider. Every time you make a call, send SMS, or use mobile data, the network provider identifies you through your SIM card; without a valid SIM, your phone cannot connect to cellular networks. SIM cards come in different sizes: full-size, mini-SIM (older phones), Micro-SIM, and Nano-SIM (modern phones); newer phones use eSIM (embedded SIM) which is digital and doesn't require a physical card. Understanding SIM cards is relevant for students traveling between cities or countries, as different carriers have different plans and you may need to swap SIM cards for better data rates.",
    "related": [
      "Mobile",
      "Network",
      "Phone"
    ]
  },
  {
    "slug": "otp",
    "term": "OTP",
    "fullForm": "One Time Password",
    "category": "Computer & Tech",
    "description": "OTP stands for One Time Password, a temporary code (usually 4-6 digits) sent to your phone or email that verifies your identity during sensitive transactions like logging into bank accounts or confirming payments. OTPs are a security measure; when you try to login to your bank from an unfamiliar device, the bank sends you an OTP to confirm that you are the legitimate account owner. Never share your OTP with anyone, not even bank staff, as hackers use OTPs to access accounts; if someone calls asking for your OTP, it is definitely a scam. For students, understanding OTP security is important as it protects your online accounts, emails, and digital payments from unauthorized access.",
    "related": [
      "Password",
      "Security",
      "Authentication"
    ]
  },
  {
    "slug": "vpn",
    "term": "VPN",
    "fullForm": "Virtual Private Network",
    "category": "Computer & Tech",
    "description": "VPN stands for Virtual Private Network, a service that encrypts your internet traffic and routes it through a secure server, hiding your real location and protecting your data from hackers on public WiFi. When you connect to a public WiFi (like at a café or airport), hackers can potentially spy on your unencrypted data; a VPN prevents this by creating a secure encrypted tunnel for all your data. Using a VPN is useful when accessing sensitive accounts on public WiFi, protecting your privacy from your internet provider, and accessing content that may be restricted in your country (though using VPNs to bypass restrictions may violate terms of service). Students should use a reliable VPN service when studying on public WiFi to protect their passwords and personal information.",
    "related": [
      "Security",
      "Network",
      "Privacy"
    ]
  },
  {
    "slug": "wi-fi",
    "term": "Wi-Fi",
    "fullForm": "Wireless Fidelity",
    "category": "Computer & Tech",
    "description": "Wi-Fi stands for Wireless Fidelity, the technology that lets your phone and computer connect to the internet wirelessly through radio waves from a router, without needing cables. Your home WiFi router broadcasts a signal in all directions, and any device within range can connect by entering the WiFi password; this signal travels through walls, though distance and obstacles weaken it. WiFi is much slower than wired internet (ethernet) but offers convenience; for online classes and video calls, WiFi speeds above 5-10 Mbps work well, but for heavy downloads or uploads, faster WiFi or wired internet is better. Students should know basic WiFi security: use a strong password, hide your network name if possible, and avoid connecting to open unsecured WiFi networks.",
    "related": [
      "Internet",
      "Network",
      "Wireless"
    ]
  },
  {
    "slug": "4g",
    "term": "4G",
    "fullForm": "Fourth Generation",
    "category": "Computer & Tech",
    "description": "4G stands for Fourth Generation, the standard for mobile internet that provides fast data speeds (10-100 Mbps typically) for smartphones, allowing smooth video streaming, gaming, and video calls on the go. 4G networks were introduced in India around 2012 and made mobile internet accessible and affordable for millions of students, enabling them to study online anywhere; Reliance Jio's 4G rollout in 2016 dramatically increased mobile internet usage. 4G is reliable for online classes, downloading study materials, and streaming educational videos, though speed varies by location and network congestion. Most students in India today have access to 4G, making online education and digital resources accessible.",
    "related": [
      "5G",
      "3G",
      "Mobile Network"
    ]
  },
  {
    "slug": "5g",
    "term": "5G",
    "fullForm": "Fifth Generation",
    "category": "Computer & Tech",
    "description": "5G stands for Fifth Generation, the latest mobile internet standard offering extremely fast speeds (up to 1000 Mbps) with low latency, enabling applications like instant video calls, AR-based learning, and cloud-based apps. 5G networks are being rolled out in major Indian cities by telecom companies like Jio, Airtel, and Vi, though availability is still limited outside metro areas; once widespread, 5G will enable new possibilities like virtual reality classrooms and real-time collaborative apps. For students, 5G will make downloading large files (study videos, simulations) near-instant and enable more immersive online learning experiences with virtual reality and augmented reality. However, 5G-capable phones are more expensive, and widespread 5G coverage in all of India is still 3-5 years away.",
    "related": [
      "4G",
      "Network",
      "Mobile"
    ]
  },
  {
    "slug": "gpu",
    "term": "GPU",
    "fullForm": "Graphics Processing Unit",
    "category": "Computer & Tech",
    "description": "GPU stands for Graphics Processing Unit, a specialized chip designed to process graphics and images extremely fast, making it essential for gaming, video editing, 3D design, and AI training. While a CPU (processor) handles general tasks, a GPU handles thousands of calculations in parallel, making it perfect for graphics rendering and training machine learning models on large datasets. Students studying game development, AI, or video production use GPUs to accelerate their work; high-end GPUs from NVIDIA (like RTX series) or AMD are expensive but dramatically speed up rendering and AI training. Understanding GPUs is important for students interested in gaming development, 3D animation, or AI/machine learning careers.",
    "related": [
      "CPU",
      "Graphics",
      "Processor"
    ]
  },
  {
    "slug": "soc",
    "term": "SoC",
    "fullForm": "System on Chip",
    "category": "Computer & Tech",
    "description": "SoC stands for System on Chip, a single integrated chip that contains a CPU, GPU, memory, and other components typically found on a computer motherboard, packed onto one small piece. Your smartphone contains an SoC (like Snapdragon, Apple A-series, or MediaTek) which handles all computing, graphics, and processing; similarly, some laptops and tablets use SoCs instead of separate processors. SoCs are efficient because they use less power and space, but they cannot be upgraded like desktop computers; if your phone's SoC is slow, you cannot replace it separately. For students choosing phones or understanding mobile devices, knowing the SoC model helps understand performance; a newer SoC like Snapdragon 8 Gen 2 will run games and apps much smoother than older models.",
    "related": [
      "CPU",
      "GPU",
      "Processor"
    ]
  },
  {
    "slug": "dna",
    "term": "DNA",
    "fullForm": "Deoxyribonucleic Acid",
    "category": "Science",
    "description": "DNA stands for Deoxyribonucleic Acid, the molecule that carries the genetic instructions for life, present in almost every cell of your body and responsible for your traits, appearance, and susceptibility to diseases. DNA is structured like a twisted ladder (double helix) with four chemical bases (A, T, G, C) that pair up and form the 'rungs'; the sequence of these bases encodes your genes and determines whether you have brown or blue eyes, tallness or shortness, etc. Students studying Biology learn that DNA from your parents combines to create your unique genetic makeup; DNA testing can reveal ancestry, identify genetic diseases, and is crucial for forensic investigations. Understanding DNA is fundamental to modern medicine, agriculture (crop improvement), and criminology, making it one of the most important concepts in Class 11-12 Biology.",
    "related": [
      "RNA",
      "Gene",
      "Chromosome"
    ]
  },
  {
    "slug": "rna",
    "term": "RNA",
    "fullForm": "Ribonucleic Acid",
    "category": "Science",
    "description": "RNA stands for Ribonucleic Acid, a molecule similar to DNA that carries temporary genetic instructions and helps translate DNA information into proteins that perform all functions in your cells. While DNA is permanent and stored in the cell nucleus as a blueprint, RNA is temporary and carries individual 'messages' to the ribosomes (protein-making machines) in your cell; this is why RNA is called a messenger molecule. mRNA vaccines (like COVID-19 vaccines) work by injecting synthetic RNA that tells your cells to produce spike proteins, training your immune system without using the actual virus. Students studying Class 12 Biology learn that RNA is crucial for understanding gene expression and protein synthesis, and recently became famous due to COVID vaccines.",
    "related": [
      "DNA",
      "Gene",
      "Protein"
    ]
  },
  {
    "slug": "atp",
    "term": "ATP",
    "fullForm": "Adenosine Triphosphate",
    "category": "Science",
    "description": "ATP stands for Adenosine Triphosphate, a molecule that acts as the energy currency of your cells, providing the energy needed for every biological process from muscle contraction to thinking. When you eat food, your body breaks it down and converts it into ATP molecules; every cell then 'spends' ATP like money to power its functions, from moving muscles to synthesizing proteins. ATP is produced in the mitochondria (the powerhouse of the cell) during a process called cellular respiration, where glucose and oxygen are burned to release energy. Students studying Class 10-11 Biology learn that ATP is the key link between food intake and energy usage, essential for understanding how your body extracts and uses energy.",
    "related": [
      "Energy",
      "Metabolism",
      "Cell"
    ]
  },
  {
    "slug": "nadh",
    "term": "NADH",
    "fullForm": "Nicotinamide Adenine Dinucleotide (reduced)",
    "category": "Science",
    "description": "NADH stands for Nicotinamide Adenine Dinucleotide reduced form, an electron carrier molecule that helps transfer energy during cellular respiration, capturing energy during the breakdown of glucose. During the glycolysis and Krebs cycle stages of respiration, NADH picks up electrons and carries them to the electron transport chain, where they power ATP production; without NADH, your cells cannot efficiently produce energy. NADH is also involved in many other metabolic processes including protein synthesis and DNA repair, making it fundamental to life. For Class 12 Biology students studying cellular respiration, understanding NADH and its role in ATP production is crucial for scoring well in exams.",
    "related": [
      "FADH2",
      "Respiration",
      "ATP"
    ]
  },
  {
    "slug": "photosynthesis",
    "term": "CO2",
    "fullForm": "Carbon Dioxide",
    "category": "Science",
    "description": "Carbon Dioxide is a gas (CO2) that plants absorb from the air during photosynthesis, using sunlight to convert it into glucose (sugar) and oxygen; this process is how plants produce food and release the oxygen we breathe. CO2 exists in the atmosphere at about 0.04% and is essential for all plant life; without sufficient CO2, crops cannot grow, but excess CO2 in the atmosphere also contributes to climate change. In photosynthesis, plants use chlorophyll to capture light energy and split water molecules, releasing oxygen as a byproduct and storing energy in glucose for their growth and our food. Students studying Class 10 Science learn that plants are Earth's life-support system because they convert CO2 into oxygen through photosynthesis.",
    "related": [
      "Photosynthesis",
      "O2",
      "Plant"
    ]
  },
  {
    "slug": "led",
    "term": "LED",
    "fullForm": "Light Emitting Diode",
    "category": "Science",
    "description": "LED stands for Light Emitting Diode, a type of light bulb that emits light when electricity passes through it, much more efficient and durable than traditional incandescent bulbs. LEDs produce very little heat waste (unlike old bulbs), consume far less electricity, and last much longer (50,000+ hours vs 1,000 hours for incandescent), making them ideal for homes, phones, and displays. Your smartphone screen, TV, streetlights, and car headlights increasingly use LEDs because they are cheaper to run and better for the environment; LED bulbs have become the standard in most Indian homes. Understanding LEDs is important for students learning Physics or interested in electronics and energy efficiency careers.",
    "related": [
      "Diode",
      "Electricity",
      "Light"
    ]
  },
  {
    "slug": "laser",
    "term": "LASER",
    "fullForm": "Light Amplification by Stimulated Emission of Radiation",
    "category": "Science",
    "description": "LASER stands for Light Amplification by Stimulated Emission of Radiation, a device that produces an extremely focused, powerful beam of coherent light used in countless applications from surgery to manufacturing to entertainment. Lasers are used in medical procedures (eye surgery, cancer treatment), manufacturing (cutting, welding), telecommunications (fiber optics), and consumer products (laser pointers, barcode readers); they are defined by their extreme focus and intensity. For Class 12 Physics students, understanding lasers involves studying light coherence, stimulated emission, and how mirrors amplify light; lasers are one of the most important 20th-century physics inventions. Careers in laser technology, fiber-optic communications, and photonics are growing in India and offer excellent opportunities for science students.",
    "related": [
      "Light",
      "Radiation",
      "Technology"
    ]
  },
  {
    "slug": "ph",
    "term": "pH",
    "fullForm": "Potential of Hydrogen",
    "category": "Science",
    "description": "pH is a measure of how acidic or alkaline a substance is on a scale from 0 to 14. Pure water has a pH of 7 and is neutral, while acids have lower pH values and bases have higher values. Indian school students learn about pH in chemistry classes when studying acids and bases, particularly for understanding soil properties and water quality. Understanding pH is essential for Class 10 and Class 12 science exams and has practical applications in agriculture, medicine, and environmental science.",
    "related": [
      "Acid",
      "Base",
      "Chemistry"
    ]
  },
  {
    "slug": "ac",
    "term": "AC",
    "fullForm": "Alternating Current",
    "category": "Science",
    "description": "Alternating Current is an electric current that periodically reverses direction, flowing back and forth through a circuit. Unlike DC, AC current changes direction at regular intervals, typically 50 times per second in India which follows the 50 Hz frequency standard. AC is the type of electrical power supplied to homes and businesses across India by the power grid, making it essential for daily life. Students studying physics learn about AC in Class 12, covering topics like transformers, generators, and power transmission which all depend on alternating current.",
    "related": [
      "DC",
      "Electricity",
      "Voltage"
    ]
  },
  {
    "slug": "dc",
    "term": "DC",
    "fullForm": "Direct Current",
    "category": "Science",
    "description": "Direct Current is an electric current that flows in only one direction through a circuit, from positive to negative terminal. DC power is supplied by batteries, solar panels, and electronic devices that use power adapters to convert AC to DC. While AC powers most of India's electrical grid, DC is crucial for portable devices, renewable energy systems, and electronic circuits. Physics students learn about DC circuits and compare them with AC circuits to understand how different electrical systems work in Class 12.",
    "related": [
      "AC",
      "Electricity",
      "Battery"
    ]
  },
  {
    "slug": "ohm",
    "term": "Ohm",
    "fullForm": "Unit of Electrical Resistance",
    "category": "Science",
    "description": "An ohm is the unit of electrical resistance, named after Georg Simon Ohm, and measures how much a material opposes the flow of electric current. When current flows through a conductor, it encounters resistance measured in ohms, similar to how friction opposes motion. Indian school students encounter ohms when studying Ohm's law in Class 10 physics, learning that voltage equals current multiplied by resistance. Understanding resistance in ohms is fundamental for designing circuits, calculating electrical power consumption, and understanding safety in electrical systems.",
    "related": [
      "Resistance",
      "Voltage",
      "Current"
    ]
  },
  {
    "slug": "joule",
    "term": "Joule",
    "fullForm": "Unit of Energy",
    "category": "Science",
    "description": "A joule is the SI unit of energy and work, named after scientist James Prescott Joule, and represents the amount of energy transferred when one watt of power is used for one second. Food energy is measured in kilojoules on Indian food packages, where 1 kilocalorie equals approximately 4.2 joules. Students in Class 11 and 12 physics use joules to calculate mechanical energy, heat energy, and electrical energy across various physics problems. Understanding joules is critical for solving problems related to work, energy conservation, and power calculations in Indian competitive exams like JEE.",
    "related": [
      "Energy",
      "Power",
      "Watt"
    ]
  },
  {
    "slug": "mbbs",
    "term": "MBBS",
    "fullForm": "Bachelor of Medicine, Bachelor of Surgery",
    "category": "Medical",
    "description": "MBBS is the primary undergraduate medical degree in India that qualifies a person to practice medicine as a doctor after completing five and a half years of study plus one year of internship. Admission to MBBS programmes across Indian medical colleges is highly competitive, typically determined by scores in entrance exams like NEET which all aspiring doctors must clear. MBBS graduates in India can practice in hospitals, clinics, research institutions, or pursue specialisation through postgraduate courses like MD or MS. It is one of the most sought-after professional degrees in India due to high social status and career prospects.",
    "related": [
      "NEET",
      "BDS",
      "Doctor"
    ]
  },
  {
    "slug": "bds",
    "term": "BDS",
    "fullForm": "Bachelor of Dental Surgery",
    "category": "Medical",
    "description": "BDS is a four-year undergraduate degree programme that qualifies graduates to practice dentistry and treat dental and oral health problems in India. Similar to MBBS, admission to BDS programmes in Indian dental colleges requires clearing the NEET entrance exam and competing with other aspiring dental professionals. BDS graduates can work in dental clinics, hospitals, research laboratories, or pursue specialised postgraduate degrees in orthodontics, prosthodontics, or other dental fields. Dental professionals holding BDS are licensed to diagnose, treat cavities, perform root canals, orthodontic procedures, and preventive dental care across India.",
    "related": [
      "NEET",
      "MBBS",
      "Dentist"
    ]
  },
  {
    "slug": "bpharm",
    "term": "B.Pharm",
    "fullForm": "Bachelor of Pharmacy",
    "category": "Medical",
    "description": "B.Pharm is a four-year undergraduate degree in pharmacy that trains students to prepare, dispense, and advise on medicinal drugs and their proper use in India. Pharmacists with B.Pharm qualifications work in hospitals, retail pharmacies, pharmaceutical companies, research institutions, and regulatory agencies across India. The degree covers subjects like pharmaceutical chemistry, pharmacology, pharmaceutics, and pharmacognosy to ensure graduates understand how drugs work and can counsel patients safely. B.Pharm graduates are essential healthcare professionals in India, responsible for ensuring medications are safe, effective, and properly dispensed to patients.",
    "related": [
      "M.Pharm",
      "Medical",
      "Drugs"
    ]
  },
  {
    "slug": "bnurse",
    "term": "B.Sc Nursing",
    "fullForm": "Bachelor of Science in Nursing",
    "category": "Medical",
    "description": "B.Sc Nursing is a four-year degree programme that qualifies graduates to work as professional nurses providing patient care and health services in hospitals, clinics, and community health settings across India. Nursing graduates with B.Sc Nursing hold greater qualifications and career opportunities compared to three-year diploma holders, allowing them to pursue teaching, research, and administrative nursing roles. The curriculum covers medical and surgical nursing, paediatric nursing, mental health nursing, community health nursing, and nursing management. B.Sc Nursing graduates are crucial to India's healthcare system, delivering frontline care and supporting doctors in patient treatment and recovery.",
    "related": [
      "NEET",
      "ANM",
      "Healthcare"
    ]
  },
  {
    "slug": "ecg",
    "term": "ECG",
    "fullForm": "Electrocardiogram",
    "category": "Medical",
    "description": "An ECG is a non-invasive test that records the electrical activity of the heart and helps doctors diagnose heart conditions like irregular heartbeats, heart attacks, and other cardiac abnormalities. In India, ECGs are commonly performed in hospitals, clinics, and diagnostic centres as a routine check during health examinations, especially for older patients or those with chest pain. The test takes only a few minutes and involves placing electrodes on the chest to detect and display the heart's electrical signals as wavy lines on paper or a monitor. Medical students in India learn about ECG interpretation as part of their cardiology and clinical medicine training in MBBS programmes.",
    "related": [
      "EEG",
      "Heart",
      "Medical Test"
    ]
  },
  {
    "slug": "eeg",
    "term": "EEG",
    "fullForm": "Electroencephalogram",
    "category": "Medical",
    "description": "An EEG is a diagnostic test that measures electrical activity in the brain by placing electrodes on the scalp to detect and record brainwave patterns. EEGs are used in India to diagnose neurological conditions like epilepsy, seizure disorders, sleep disorders, and brain injuries by observing abnormal electrical patterns. The test is painless and non-invasive, making it a standard diagnostic tool in neurology departments of Indian hospitals and diagnostic centres. Medical professionals use EEG results to understand brain function, monitor brain activity during sleep studies, and guide treatment decisions for patients with neurological conditions.",
    "related": [
      "ECG",
      "Brain",
      "Medical Test"
    ]
  },
  {
    "slug": "mri",
    "term": "MRI",
    "fullForm": "Magnetic Resonance Imaging",
    "category": "Medical",
    "description": "MRI is an advanced medical imaging technique that uses magnetic fields and radio waves to create detailed pictures of organs, tissues, and structures inside the body without using radiation. MRI scans are widely available at major hospitals and diagnostic centres across India and are especially useful for imaging the brain, spinal cord, joints, and soft tissues. Unlike CT scans which use X-rays, MRI is safer for repeated imaging and provides superior soft tissue detail, though it takes longer and costs more than other imaging methods. Indian doctors prescribe MRI scans to detect tumours, infections, injuries, and other abnormalities that need detailed visualisation for accurate diagnosis and treatment planning.",
    "related": [
      "CT Scan",
      "X-ray",
      "Medical Imaging"
    ]
  },
  {
    "slug": "ct-scan",
    "term": "CT Scan",
    "fullForm": "Computed Tomography Scan",
    "category": "Medical",
    "description": "A CT scan is a medical imaging test that uses X-rays and computer technology to create detailed cross-sectional pictures of the body, organs, and tissues. CT scans are rapid and commonly used in Indian hospitals for diagnosing conditions affecting the chest, abdomen, pelvis, head, and spine because they provide clear images of bones, blood vessels, and organs. The procedure involves lying in a cylindrical machine as X-ray beams rotate around the body, and the results are processed by computers to produce three-dimensional images. CT scans help Indian doctors detect fractures, tumours, internal bleeding, infections, and other serious conditions quickly and accurately.",
    "related": [
      "MRI",
      "X-ray",
      "Medical Imaging"
    ]
  },
  {
    "slug": "xray",
    "term": "X-ray",
    "fullForm": "X-radiation",
    "category": "Medical",
    "description": "X-rays are a form of electromagnetic radiation that passes through soft tissues but is blocked by dense structures like bones, allowing doctors to visualise internal structures on film or digital screens. X-ray machines are the most widely available and affordable medical imaging technology in Indian clinics and hospitals, used daily to diagnose fractures, lung infections, dental problems, and other conditions. The procedure exposes patients to small amounts of radiation, making it generally safe when used appropriately, though pregnant women and young children require special precautions. Indian doctors rely heavily on X-rays as a first-line imaging tool due to their quick results, low cost, and effectiveness in detecting many common health problems.",
    "related": [
      "CT Scan",
      "MRI",
      "Radiation"
    ]
  },
  {
    "slug": "aids",
    "term": "AIDS",
    "fullForm": "Acquired Immunodeficiency Syndrome",
    "category": "Medical",
    "description": "AIDS is a serious immune system disease caused by the HIV virus that weakens the body's ability to fight infections, allowing dangerous opportunistic diseases to develop. India has a significant AIDS awareness and prevention programme coordinated by government health agencies, NGOs, and hospitals providing free testing, antiretroviral treatment, and counselling to infected individuals. Modern antiretroviral therapy has transformed AIDS from a fatal disease into a manageable chronic condition for Indians with access to treatment, allowing people to live long and healthy lives. Medical education in India emphasises AIDS prevention through safe practices, awareness campaigns, and sex education in schools to reduce new infections.",
    "related": [
      "HIV",
      "Immune System",
      "Disease"
    ]
  },
  {
    "slug": "hiv",
    "term": "HIV",
    "fullForm": "Human Immunodeficiency Virus",
    "category": "Medical",
    "description": "HIV is a virus that attacks and destroys white blood cells of the immune system, and if left untreated, progresses to AIDS after several years. HIV transmission in India occurs primarily through unprotected sexual contact, sharing contaminated needles during drug use, and mother-to-child transmission during pregnancy and childbirth. India has made progress in HIV control through prevention programmes, blood safety measures, and providing free antiretroviral drugs to infected individuals through government hospitals and clinics. Early detection through HIV testing and prompt treatment with antiretroviral drugs allows people living with HIV in India to prevent disease progression and live normal lifespans.",
    "related": [
      "AIDS",
      "Immune System",
      "Virus"
    ]
  },
  {
    "slug": "bp",
    "term": "BP",
    "fullForm": "Blood Pressure",
    "category": "Medical",
    "description": "Blood Pressure is the force of blood pushing against the walls of blood vessels, measured in millimetres of mercury as two numbers: systolic pressure when the heart beats and diastolic pressure when the heart rests. Normal blood pressure in adults is around 120/80 mmHg, and high blood pressure (hypertension) is a common health problem affecting millions of Indians due to stress, poor diet, and lack of exercise. Indian doctors measure BP routinely in clinics and hospitals using digital or manual devices to screen for hypertension, which increases risk of heart attacks, strokes, and kidney disease. Managing blood pressure through lifestyle changes, exercise, diet modification, and medication is a critical part of preventive healthcare in India.",
    "related": [
      "Heart",
      "Health",
      "Medical"
    ]
  },
  {
    "slug": "bmi",
    "term": "BMI",
    "fullForm": "Body Mass Index",
    "category": "Medical",
    "description": "BMI is a simple calculation using a person's height and weight to estimate whether they are underweight, normal weight, overweight, or obese. BMI is calculated as weight in kilograms divided by height in metres squared, with different categories: underweight below 18.5, normal 18.5 to 24.9, overweight 25 to 29.9, and obese above 30. Indian health authorities and doctors use BMI as a screening tool to identify weight-related health risks, though it does not directly measure body fat percentage or fitness level. Understanding and monitoring BMI is important for Indians concerned about diabetes, heart disease, and obesity-related health problems that are increasing in the country.",
    "related": [
      "Health",
      "Weight",
      "Nutrition"
    ]
  },
  {
    "slug": "diabetes",
    "term": "T2DM",
    "fullForm": "Type 2 Diabetes Mellitus",
    "category": "Medical",
    "description": "Type 2 Diabetes Mellitus is a chronic disease where the body cannot effectively use insulin, a hormone that regulates blood sugar levels, leading to high blood glucose levels. T2DM accounts for over 90 percent of diabetes cases in India and affects millions of Indians, particularly due to sedentary lifestyles, unhealthy diets high in sugar, and increasing obesity rates. The disease can cause serious complications including heart disease, kidney failure, blindness, and nerve damage if blood sugar is not well controlled through diet, exercise, medication, and insulin. Indian health organisations promote diabetes awareness, early screening through blood tests, and lifestyle interventions to prevent the disease and manage it effectively once diagnosed.",
    "related": [
      "Insulin",
      "Blood Sugar",
      "Disease"
    ]
  },
  {
    "slug": "atm",
    "term": "ATM",
    "fullForm": "Automated Teller Machine",
    "category": "Banking & Govt",
    "description": "An ATM is an electronic machine that allows customers to withdraw cash, check account balances, transfer money, and perform other banking transactions 24 hours a day without visiting a bank branch. ATMs are ubiquitous across Indian cities, towns, and villages, operated by banks and private companies, making cash withdrawal convenient and accessible to millions of Indians. Most Indian ATMs require a debit card and personal identification number (PIN) to access funds, though some advanced ATMs now support mobile wallet withdrawals and biometric authentication. ATMs have revolutionised banking in India by reducing queues at bank counters and enabling financial inclusion for people in remote areas with limited banking infrastructure.",
    "related": [
      "Bank",
      "Card",
      "Cash"
    ]
  },
  {
    "slug": "ifsc-code",
    "term": "IFSC",
    "fullForm": "Indian Financial System Code",
    "category": "Banking & Govt",
    "description": "IFSC is an alphanumeric code assigned to every bank branch in India to identify it uniquely in the banking system and facilitate electronic fund transfers. The code consists of the bank's four-letter identifier followed by zero and a four-digit branch code, such as SBIN0000001 for State Bank of India's main branch. IFSC codes are essential for online fund transfers between banks in India, whether through NEFT, RTGS, or IMPS systems, ensuring money reaches the correct bank branch. Every Indian bank customer must provide the recipient's IFSC code when sending money electronically to ensure the transfer is processed accurately without delays or errors.",
    "related": [
      "SWIFT",
      "Bank",
      "Transfer"
    ]
  },
  {
    "slug": "micr",
    "term": "MICR",
    "fullForm": "Magnetic Ink Character Recognition",
    "category": "Banking & Govt",
    "description": "MICR is a technology used by banks in India to process cheques using magnetic ink characters that can be read by machines, speeding up the cheque clearing process. The MICR code appears at the bottom of Indian cheques and consists of nine digits: the first three identify the city, the next three identify the bank, and the last three identify the branch. This standardised system allows cheques to be sorted and processed automatically at clearing houses, reducing manual work and the time required for cheque clearance. Although digital payments have reduced cheque usage in India, MICR remains important for processing the millions of cheques still used by businesses and individuals annually.",
    "related": [
      "IFSC",
      "Cheque",
      "Banking"
    ]
  },
  {
    "slug": "upi",
    "term": "UPI",
    "fullForm": "Unified Payments Interface",
    "category": "Banking & Govt",
    "description": "UPI is a real-time digital payment system in India that allows users to transfer money directly from one bank account to another using a smartphone, without requiring details like account numbers or bank names. UPI has revolutionised digital payments in India by making it easy for millions of Indians to send money to family, pay bills, purchase goods, and conduct business using simple identifiers like mobile numbers or UPI IDs. Platforms like Google Pay, WhatsApp Pay, PhonePe, and BHIM app provide UPI functionality, enabling cashless transactions that are fast, secure, and accessible even to people without internet or smartphones in some cases. The Reserve Bank of India strongly promotes UPI as part of the Digital India initiative to reduce cash usage and bring financial services to all Indians.",
    "related": [
      "Digital Payment",
      "Banking",
      "Mobile"
    ]
  },
  {
    "slug": "pan",
    "term": "PAN",
    "fullForm": "Permanent Account Number",
    "category": "Banking & Govt",
    "description": "PAN is a unique ten-character alphanumeric identifier issued by the Indian income tax department to every person who earns income above specified thresholds or engages in certain financial transactions. PAN is essential for filing income tax returns in India, opening bank accounts, applying for credit cards, buying property, and conducting large financial transactions. Every Indian taxpayer must quote their PAN on tax documents, while businesses and professionals use PAN for business registrations, Goods and Services Tax filings, and official transactions. The Indian tax system relies on PAN to track income, prevent tax evasion, and ensure compliance with tax laws across the country.",
    "related": [
      "Aadhar",
      "Tax",
      "India"
    ]
  },
  {
    "slug": "aadhar",
    "term": "Aadhar",
    "fullForm": "Unique Identification Authority of India",
    "category": "Banking & Govt",
    "description": "Aadhar is a unique twelve-digit identification number issued by the Unique Identification Authority of India (UIDAI) to every resident based on their biometric data including fingerprints and iris scans. Aadhar has become the most widely used identity document in India, used for opening bank accounts, obtaining SIM cards, accessing government benefits, school admissions, and countless official transactions. The Aadhar system aims to provide a unified digital identity that simplifies government service delivery and reduces fraud by linking various databases across India. With over 1.3 billion Aadhar numbers issued, it represents one of the world's largest biometric identification systems and is fundamental to India's digital infrastructure.",
    "related": [
      "PAN",
      "KYC",
      "India"
    ]
  },
  {
    "slug": "kyc",
    "term": "KYC",
    "fullForm": "Know Your Customer",
    "category": "Banking & Govt",
    "description": "KYC is a mandatory compliance requirement in India where banks, financial institutions, and telecom companies must verify and document the identity and address of customers before opening accounts or providing services. KYC processes involve collecting identity proof like Aadhar or passport, address proof like utility bills or rent agreements, and sometimes photographs and signatures to confirm customer identity. The KYC requirement protects financial institutions from fraud, money laundering, and terrorist financing while also helping prevent illegal activities by maintaining transparent financial records in India. Every Indian who opens a bank account, buys insurance, trades securities, or signs up for mobile services must complete KYC verification procedures.",
    "related": [
      "Banking",
      "Aadhar",
      "PAN"
    ]
  },
  {
    "slug": "gst",
    "term": "GST",
    "fullForm": "Goods and Services Tax",
    "category": "Banking & Govt",
    "description": "GST is a comprehensive indirect tax system implemented across India that replaced multiple layers of central and state taxes with a single unified tax on goods and services. Under GST, which is applicable since July 2017, products and services are classified into different tax brackets ranging from 0 percent to 28 percent depending on the item, and taxes are collected at each stage of production and distribution. Businesses registered under GST must maintain detailed records, file regular returns, and remit taxes to the government, simplifying the tax system and reducing hidden costs for consumers. GST has streamlined commerce across India by eliminating state borders for tax purposes, allowing seamless movement of goods, and making tax compliance more transparent for businesses of all sizes.",
    "related": [
      "Tax",
      "VAT",
      "India"
    ]
  },
  {
    "slug": "rbi",
    "term": "RBI",
    "fullForm": "Reserve Bank of India",
    "category": "Banking & Govt",
    "description": "The RBI is India's central bank that manages the country's monetary policy, issues currency notes, regulates commercial banks, and supervises financial institutions. The RBI controls inflation, maintains currency stability, manages foreign exchange reserves, and sets the repo rate that influences lending rates across Indian banks and affects the overall economy. Every major banking regulation in India, including rules on lending, deposit insurance, and consumer protection, is established and enforced by the RBI to ensure financial system stability. The RBI Governor is one of the most influential positions in India, with their decisions on interest rates and monetary policy affecting the economy, inflation, and ordinary Indians' financial decisions.",
    "related": [
      "Banking",
      "Interest Rate",
      "Money"
    ]
  },
  {
    "slug": "sbi",
    "term": "SBI",
    "fullForm": "State Bank of India",
    "category": "Banking & Govt",
    "description": "The SBI is India's largest bank by assets and the first choice for many Indians for opening savings accounts, taking loans, and conducting financial transactions. Founded in 1950, SBI has the widest network of branches and ATMs across India including remote areas, making banking accessible to millions of Indians who might not have access to private banks. SBI offers a complete range of banking services including savings accounts, current accounts, loans, investments, and insurance through thousands of branches and digital platforms. The bank plays a central role in India's financial system, holding significant government funds, conducting government transactions, and serving as a model for public sector banking.",
    "related": [
      "Bank",
      "HDFC",
      "Axis"
    ]
  },
  {
    "slug": "lakh",
    "term": "Lakh",
    "fullForm": "100,000",
    "category": "Banking & Govt",
    "description": "A lakh is a unit equal to 100,000 commonly used in Indian numbering systems for expressing large numbers in currency, population, and other measurements. In India, income is frequently stated in lakhs per year, property prices are mentioned in lakhs, and lottery prizes are expressed in lakhs, making it a familiar term in everyday Indian conversations. For example, a salary of 5 lakhs per year means 500,000 rupees annually, and a home price of 20 lakhs means 2,000,000 rupees. Understanding lakhs and crores is essential for Indian students, as most financial data in India uses this numbering system rather than the million-billion system used in Western countries.",
    "related": [
      "Crore",
      "Numbers",
      "India"
    ]
  },
  {
    "slug": "crore",
    "term": "Crore",
    "fullForm": "10,000,000",
    "category": "Banking & Govt",
    "description": "A crore is a unit equal to 10,000,000 (ten million) used extensively in Indian currency, statistics, and large numerical expressions. In India, wealth, property prices, corporate revenues, and government budgets are typically expressed in crores, making it an essential term for understanding Indian financial news and discussions. For example, a movie's box office collection of 100 crores means 1 billion rupees, and a company's annual revenue of 500 crores means 5 billion rupees. The crore system is deeply embedded in Indian culture and media, and all Indian students must understand crores to interpret financial information, news reports, and education-related data correctly.",
    "related": [
      "Lakh",
      "Numbers",
      "India"
    ]
  },
  {
    "slug": "emi",
    "term": "EMI",
    "fullForm": "Equated Monthly Installment",
    "category": "Banking & Govt",
    "description": "EMI is a fixed amount that borrowers pay monthly to repay a loan over a specified period, with each payment covering a portion of the principal and accumulated interest. EMI system is widely used by Indian banks and financial companies for home loans, car loans, personal loans, and education loans, making expensive purchases affordable by spreading the cost over years. The EMI amount depends on the loan amount, interest rate, and repayment tenure, calculated using a standard formula to ensure equal monthly payments throughout the loan period. Understanding EMI is crucial for Indians considering loans, as it helps in budgeting repayment amounts and comparing loan offers from different financial institutions.",
    "related": [
      "Loan",
      "Interest",
      "Banking"
    ]
  },
  {
    "slug": "nre",
    "term": "NRE",
    "fullForm": "Non Resident External",
    "category": "Banking & Govt",
    "description": "NRE is a type of bank account in India designed specifically for Non-Resident Indians to deposit foreign currency earnings from abroad without Indian tax implications. NRE accounts allow NRIs to earn interest on deposits while maintaining the flexibility to repatriate funds back to their home countries without restrictions or tax complications. The funds in NRE accounts must come from foreign sources and cannot be used for domestic transactions in India, making them distinct from regular savings accounts. NRE accounts are popular among Indians working abroad, expatriates, and their families, serving as a secure way to hold and grow foreign currency savings while maintaining ties to their home country.",
    "related": [
      "NRI",
      "Banking",
      "Account"
    ]
  },
  {
    "slug": "nro",
    "term": "NRO",
    "fullForm": "Non Resident Ordinary",
    "category": "Banking & Govt",
    "description": "NRO is a bank account in India for Non-Resident Indians to hold money earned from Indian sources, including rental income from property, pension, and other domestic earnings. Unlike NRE accounts, NRO account funds must come from Indian sources and can be used to pay Indian expenses like property taxes, loans, and living costs, though repatriation of funds abroad has restrictions. NRO accounts earn lower interest rates than NRE accounts and are subject to regular Indian income tax provisions on interest earned. Many NRIs maintain both NRE and NRO accounts to manage their foreign and domestic Indian earnings separately while complying with tax regulations.",
    "related": [
      "NRE",
      "NRI",
      "Banking"
    ]
  },
  {
    "slug": "nri",
    "term": "NRI",
    "fullForm": "Non Resident Indian",
    "category": "Banking & Govt",
    "description": "An NRI is an Indian citizen who has obtained permanent residence in a foreign country or stayed outside India for more than 182 days in a financial year. NRIs maintain Indian citizenship and can hold property, invest in mutual funds, and conduct financial transactions in India while working or residing abroad. The Indian government and banks offer special banking products and investment options for NRIs to facilitate their financial management across two countries and encourage them to contribute to India's economy. NRI status has important implications for Indian income tax, investment opportunities, visa regulations, and eligibility for certain government programmes in India.",
    "related": [
      "OCI",
      "NRE",
      "NRO"
    ]
  },
  {
    "slug": "oci",
    "term": "OCI",
    "fullForm": "Overseas Citizen of India",
    "category": "Banking & Govt",
    "description": "OCI status is a special document issued by the Indian government to people of Indian origin living abroad who have taken citizenship of another country but wish to maintain strong ties to India. OCIs can freely enter and stay in India indefinitely without visa requirements, own property, and conduct business in India, but are excluded from political rights like voting. The OCI scheme allows people of Indian descent, including those whose grandparents were born in India, to reconnect with their heritage and participate in India's economic and social life. OCI holders enjoy most of the benefits of Indian citizenship except political participation and government employment, making it an attractive status for overseas Indians and diaspora communities.",
    "related": [
      "NRI",
      "Citizenship",
      "India"
    ]
  },
  {
    "slug": "tds",
    "term": "TDS",
    "fullForm": "Tax Deducted at Source",
    "category": "Banking & Govt",
    "description": "TDS is a tax collection mechanism used by the Indian income tax system where a specified percentage of payments is deducted by the payer and deposited directly to the government. TDS is deducted on various payments including salaries, professional fees, interest on bank deposits, rental income, and contractor payments, reducing the tax burden on individuals when filing income tax returns. The TDS rate varies depending on the type of income and whether the recipient has provided a valid PAN, encouraging compliance with tax regulations across India. All Indian salaried employees experience TDS on their salaries, and the annual TDS account is provided to help calculate final tax liability during income tax filing.",
    "related": [
      "Tax",
      "Income",
      "Banking"
    ]
  },
  {
    "slug": "ok",
    "term": "OK",
    "fullForm": "Okay",
    "category": "General",
    "description": "OK is a common expression used in English and across the world to indicate agreement, acknowledgement, or acceptance of a statement or proposal. The term is widely used in India in both formal and informal contexts, understood by English speakers and increasingly by vernacular speakers in casual conversations. OK is used in business emails, educational settings, casual chats, and official communications to confirm understanding or provide approval without extensive explanation. While often informal, using OK in professional Indian contexts is generally acceptable, though more formal alternatives like 'Agreed' or 'Understood' may be preferred in official government or corporate communications.",
    "related": [
      "Yes",
      "Approved",
      "Confirm"
    ]
  },
  {
    "slug": "am",
    "term": "AM",
    "fullForm": "Ante Meridiem",
    "category": "General",
    "description": "AM stands for ante meridiem and refers to the period from midnight to noon in the 12-hour clock system used in India and many other countries. Indian schools, businesses, and daily activities use AM to denote morning hours, distinguishing them from PM hours which represent afternoon and evening. For example, school starts at 8:00 AM, morning classes run until 12:00 PM noon, and afternoon classes resume at 2:00 PM after lunch break. Understanding AM and PM time notation is essential for Indian students to read schedules, timetables, and time-related information in English-medium schools and institutions.",
    "related": [
      "PM",
      "Time",
      "Clock"
    ]
  },
  {
    "slug": "pm",
    "term": "PM",
    "fullForm": "Post Meridiem",
    "category": "General",
    "description": "PM stands for post meridiem and refers to the period from noon to midnight in the 12-hour clock system commonly used in India. Indian offices, schools, and daily schedules use PM to denote afternoon, evening, and night hours to distinguish them from morning AM hours. For instance, afternoon classes resume at 2:00 PM after lunch, evening activities might occur at 4:00 PM or 5:00 PM, and night study hours might be from 7:00 PM to 9:00 PM. The 12-hour AM/PM time format is widely used alongside the 24-hour format in India for schedules, announcements, and everyday time communication.",
    "related": [
      "AM",
      "Time",
      "Clock"
    ]
  },
  {
    "slug": "etc",
    "term": "Etc.",
    "fullForm": "Et Cetera",
    "category": "General",
    "description": "Etc. is an abbreviation for 'et cetera' meaning 'and other things' or 'and so on', used to indicate that a list continues with similar items not explicitly mentioned. In Indian English usage, etc. is commonly used in writing lists of examples, requirements, or categories where complete enumeration is unnecessary or implied. For instance, a teacher might write 'bring pens, pencils, erasers, etc.' to indicate that other writing materials should also be brought without listing each one individually. Using etc. makes writing more concise and is standard in English-medium Indian schools, colleges, and business communications.",
    "related": [
      "And",
      "So On",
      "List"
    ]
  },
  {
    "slug": "asap",
    "term": "ASAP",
    "fullForm": "As Soon As Possible",
    "category": "General",
    "description": "ASAP is an acronym meaning 'as soon as possible' and indicates that something should be done urgently without unnecessary delay. ASAP is widely used in Indian business emails, office communications, and academic settings to convey urgency and priority. For example, a manager might write 'Please submit the report ASAP' to indicate the deadline is immediate, or a teacher might request 'Complete the assignment ASAP'. Understanding ASAP is essential for Indian students and professionals as it frequently appears in urgent communications and helps distinguish between routine and priority tasks.",
    "related": [
      "Urgent",
      "Quick",
      "Time"
    ]
  },
  {
    "slug": "aka",
    "term": "AKA",
    "fullForm": "Also Known As",
    "category": "General",
    "description": "AKA is an abbreviation for 'also known as' and is used to indicate an alternative name, nickname, or alias by which a person or thing is known. In India, AKA is used to refer to professional names, pen names, stage names, or colloquial names different from official legal names. For example, 'Vishal Kumar aka Kumar' indicates the person is commonly known by both names, or 'United Nations aka UN' shows an organisation's formal and abbreviated name. AKA is useful in essays, biographies, and identification contexts where clarifying different names for the same entity or person is necessary.",
    "related": [
      "Name",
      "Also",
      "Known"
    ]
  },
  {
    "slug": "eg",
    "term": "E.g.",
    "fullForm": "Exempli Gratia",
    "category": "General",
    "description": "E.g. is an abbreviation for 'exempli gratia' meaning 'for example' and is used to introduce specific examples that illustrate a general point or statement. In Indian English writing, e.g. is commonly used in explanations, essays, and technical documents to provide concrete examples that help readers understand abstract concepts. For instance, 'Fruits like apples, oranges, e.g. citrus fruits' demonstrates how a category is exemplified with specific items. Using e.g. makes writing clearer and is standard in academic and professional Indian English communications.",
    "related": [
      "Example",
      "Such As",
      "For Instance"
    ]
  },
  {
    "slug": "ie",
    "term": "I.e.",
    "fullForm": "Id Est",
    "category": "General",
    "description": "I.e. is an abbreviation for 'id est' meaning 'that is' and is used to clarify, rephrase, or provide additional explanation for a statement just made. In Indian English writing, i.e. helps readers understand that the following phrase is a restatement, clarification, or definition of the preceding phrase. For example, 'The capital of India, i.e., Delhi' clarifies that Delhi is another way of stating the capital, or 'Photosynthesis, i.e., the process plants use to convert sunlight into energy' defines the preceding term. Using i.e. makes writing more precise and helps prevent misunderstandings in academic and technical Indian English contexts.",
    "related": [
      "Meaning",
      "That Is",
      "Clarify"
    ]
  },
  {
    "slug": "vs",
    "term": "Vs.",
    "fullForm": "Versus",
    "category": "General",
    "description": "Vs. is an abbreviation for 'versus' meaning 'against' and is used to indicate a comparison or contrast between two opposing things, ideas, or competitors. In Indian sports, education, and legal contexts, vs. is commonly used to denote matches, debates, or legal cases between opposing parties. For example, 'India vs. Pakistan cricket match' indicates a game between the two countries, or in legal writing 'XYZ Corporation vs. Government of India' indicates a lawsuit between the parties. Understanding vs. is essential for Indian students reading sports news, case law, and comparison-based academic content.",
    "related": [
      "Against",
      "Versus",
      "Compare"
    ]
  },
  {
    "slug": "btw",
    "term": "BTW",
    "fullForm": "By The Way",
    "category": "General",
    "description": "BTW is an acronym for 'by the way' used to introduce a tangential remark, additional information, or a topic change in casual written communication. In India, BTW is widely used in informal emails, text messages, and online chats among students and professionals to add related but non-essential information without formal transition. For example, 'I finished the project on time, BTW I'll submit it tomorrow morning' uses BTW to add supplementary information casually. While BTW is too informal for official government or formal business documents, it is accepted in casual professional and academic communications among peers.",
    "related": [
      "Informal",
      "Also",
      "Besides"
    ]
  },
  {
    "slug": "fyi",
    "term": "FYI",
    "fullForm": "For Your Information",
    "category": "General",
    "description": "FYI is an acronym for 'for your information' used to share information with someone as context or reference without requiring immediate action or response. In Indian office and academic settings, FYI is commonly used in email subject lines or message prefixes to indicate the message is informational rather than requiring action. For example, 'FYI: The office will be closed on Republic Day' or 'FYI: New attendance policy has been implemented' signals that the recipient should be aware but no response is needed. FYI is appropriate in professional emails, office communications, and school notices in India.",
    "related": [
      "Information",
      "Notice",
      "Alert"
    ]
  },
  {
    "slug": "tldr",
    "term": "TL;DR",
    "fullForm": "Too Long, Didn't Read",
    "category": "General",
    "description": "TL;DR is an acronym for 'too long, didn't read' used to provide a brief summary of long text, articles, or documents for readers who lack time to read the entire content. In Indian social media, forums, and online discussions, TL;DR serves as a quick summary helping busy readers grasp key points without reading lengthy posts. For example, after a long article explaining a policy change, someone might write 'TL;DR: Exam dates have been postponed by two weeks' to highlight the most important information. Using TL;DR is particularly popular among Indian students and professionals who consume large amounts of online content daily.",
    "related": [
      "Summary",
      "Brief",
      "Abstract"
    ]
  },
  {
    "slug": "psych",
    "term": "P.S.",
    "fullForm": "Post Script",
    "category": "General",
    "description": "P.S. is an abbreviation for 'post script' meaning 'written after' and is used to add an additional thought, reminder, or information at the end of a letter or message after the main content has concluded. In formal letters, emails, and notes in India, P.S. allows the writer to add forgotten information or emphasise a point without rewriting the entire message. For example, a letter might conclude 'Yours sincerely' and then include 'P.S. Don't forget to bring your admit card to the exam' to remind of an important detail. While less common in digital communication, P.S. remains standard in formal Indian letters and professional correspondence.",
    "related": [
      "Addition",
      "Note",
      "Letter"
    ]
  },
  {
    "slug": "ltd",
    "term": "Ltd.",
    "fullForm": "Limited",
    "category": "General",
    "description": "Ltd. is an abbreviation for 'Limited' used in the names of private companies in India to indicate that the liability of shareholders is limited to their investment amount. In India, Ltd. designation is standard for registered private companies like 'Tata Motors Limited' or 'ICICI Bank Limited', distinguishing them from public companies and sole proprietorships. The Ltd. designation provides legal protection to shareholders by limiting personal liability and signifies that the company is a registered legal entity with defined structure and governance. Understanding Ltd. is important for Indian students studying business and commerce to distinguish company types and recognise registered companies in financial markets.",
    "related": [
      "Company",
      "Business",
      "Corporation"
    ]
  },
  {
    "slug": "pvt",
    "term": "Pvt.",
    "fullForm": "Private",
    "category": "General",
    "description": "Short form of Private commonly used in India for company names and official titles. When you see Pvt Ltd after a company name like Infosys Pvt Ltd, it means the company is privately owned and not listed on the stock exchange. This is the standard way Indian businesses denote their private status in legal documents and registrations. Students often encounter this abbreviation when studying business law or reading about Indian corporations and their structure.",
    "related": [
      "Private",
      "Company",
      "Organization"
    ]
  },
  {
    "slug": "dr",
    "term": "Dr.",
    "fullForm": "Doctor",
    "category": "General",
    "description": "Title used in India for medical doctors, surgeons, and those with doctoral degrees like PhD in any field. In Indian culture, Dr is a mark of professional respect and is used before the person's name in formal settings, medical certificates, and academic contexts. Many Indian students aspire to become doctors and use this title as a career goal. It's one of the most commonly used professional titles in Indian schools and colleges where accomplished faculty members are addressed as Dr.",
    "related": [
      "Doctor",
      "Title",
      "Professional"
    ]
  },
  {
    "slug": "mr",
    "term": "Mr.",
    "fullForm": "Mister",
    "category": "General",
    "description": "Standard title used in India to address adult males in formal and professional contexts, similar to other countries. In Indian business, education, and government settings, Mr is the standard polite way to address men in letters, announcements, and formal communications. School teachers use this title when addressing students' fathers or male guardians in official letters. It's a basic courtesy title that all students learn early as part of formal etiquette and professional communication skills.",
    "related": [
      "Title",
      "Formal",
      "Name"
    ]
  },
  {
    "slug": "mrs",
    "term": "Mrs.",
    "fullForm": "Mistress",
    "category": "General",
    "description": "Title used in India to address married women in formal and professional settings, reflecting traditional social conventions. In Indian schools and offices, Mrs is commonly used in official correspondence, employee records, and formal introductions. Teachers use this title when communicating with mothers of students or female staff members who are married. Students encounter this abbreviation in business correspondence, formal emails, and official documentation throughout their academic and professional journey.",
    "related": [
      "Title",
      "Formal",
      "Name"
    ]
  },
  {
    "slug": "ms",
    "term": "Ms.",
    "fullForm": "Ms.",
    "category": "General",
    "description": "Title used in India to address women in professional and formal contexts without indicating marital status, similar to modern usage worldwide. Ms is increasingly used in Indian corporate offices, educational institutions, and official documents as a neutral and respectful title. Many modern Indian companies and schools prefer Ms over Mrs or Miss as it focuses on professional identity rather than marital status. This title is becoming more common in Indian business and academic environments where gender-neutral respect is valued.",
    "related": [
      "Title",
      "Formal",
      "Name"
    ]
  },
  {
    "slug": "prof",
    "term": "Prof.",
    "fullForm": "Professor",
    "category": "General",
    "description": "Short form of Professor used in India for university and college teachers who hold a doctoral degree or advanced academic qualification. In Indian higher education, Prof is the standard title for faculty members, researchers, and senior academics at universities, institutes, and colleges. Students use this title when addressing their teachers in classrooms and official meetings. This abbreviation appears frequently in Indian academic settings, research papers, and educational institutions like IIT, Delhi University, and various state universities.",
    "related": [
      "Teacher",
      "Academic",
      "Title"
    ]
  },
  {
    "slug": "avg",
    "term": "Avg.",
    "fullForm": "Average",
    "category": "General",
    "description": "Short form of Average used extensively in Indian schools and colleges to calculate mean values in mathematics and statistics. When students calculate average marks, average temperature, or average rainfall, they use this term in their schoolwork and examinations. Teachers use Avg in gradebooks, report cards, and classroom explanations when discussing class performance statistics. This is a fundamental concept taught from primary school onwards and appears in CBSE, ICSE, and state board examinations across mathematics, science, and commerce subjects.",
    "related": [
      "Mean",
      "Median",
      "Statistics"
    ]
  },
  {
    "slug": "approx",
    "term": "Approx.",
    "fullForm": "Approximately",
    "category": "General",
    "description": "Short form of Approximately used in India when exact figures are unknown or when rounding numbers for practical purposes. In Indian textbooks, Approx is commonly used when stating population figures, historical dates, distances between cities, and scientific measurements. Students use this abbreviation in maths problem solutions and science experiments when they need to round off decimal values. It's an essential term that appears in mathematics, geography, and science subjects across all Indian school boards and helps students understand estimation and rounding concepts.",
    "related": [
      "Estimate",
      "About",
      "Nearly"
    ]
  },
  {
    "slug": "max",
    "term": "Max.",
    "fullForm": "Maximum",
    "category": "General",
    "description": "Short form of Maximum used widely in Indian schools and colleges to indicate the highest possible value or upper limit. In school examinations and assessment, Max is shown on question papers to indicate the maximum marks available for each question or the entire paper. Students also encounter Max in physics experiments, mathematics problem-solving, and statistical analysis when determining the highest value in a dataset. This abbreviation appears in report cards, grade sheets, and academic records across Indian educational institutions.",
    "related": [
      "Maximum",
      "Highest",
      "Limit"
    ]
  },
  {
    "slug": "min",
    "term": "Min.",
    "fullForm": "Minimum",
    "category": "General",
    "description": "Short form of Minimum used in Indian education to indicate the lowest possible value, lowest temperature, or shortest duration in various subjects. In physics classes, Min appears when discussing minimum velocity, minimum force, or minimum temperature required for chemical reactions. Teachers use Min in marking schemes to show minimum required attendance, minimum passing marks, or minimum project scores. Students regularly encounter this term in mathematics, science, and competitive exams where they must find minimum values in optimization problems.",
    "related": [
      "Minimum",
      "Lowest",
      "Threshold"
    ]
  },
  {
    "slug": "qty",
    "term": "Qty.",
    "fullForm": "Quantity",
    "category": "General",
    "description": "Short form of Quantity used in Indian commerce, business studies, and mathematics to refer to the amount or number of items. In Indian retail stores, invoices, and purchase orders, Qty is the standard abbreviation for indicating how many units of a product are being purchased or sold. Business studies students learn about Qty management in inventory control and supply chain topics. This abbreviation appears in mathematics word problems about bulk buying and in commerce textbooks that teach Indian students about real-world buying and selling scenarios.",
    "related": [
      "Amount",
      "Number",
      "Count"
    ]
  },
  {
    "slug": "ref",
    "term": "Ref.",
    "fullForm": "Reference",
    "category": "General",
    "description": "Short form of Reference used in Indian academic and business contexts to point readers to sources, documents, or other materials for more information. In school projects, research papers, and examinations, students use Ref when citing sources or asking teachers to refer to a specific page or section. Indian teachers use Ref in marking scheme documents and answer keys to guide students to relevant textbook sections. This abbreviation is fundamental to academic integrity and appears in style guides and research methodology lessons taught in Indian schools and colleges.",
    "related": [
      "Citation",
      "Source",
      "Reference"
    ]
  },
  {
    "slug": "tel",
    "term": "Tel.",
    "fullForm": "Telephone",
    "category": "General",
    "description": "Short form of Telephone used in India on official forms, business cards, school documents, and contact information listings. When filling out admission forms, medical records, or government applications, Indian students provide their Tel number. Schools and colleges print Tel numbers on their official letterheads and contact pages for parent communication and administrative purposes. This is a standard abbreviation that appears on every Indian business document, school prospectus, and official form where contact details are required.",
    "related": [
      "Phone",
      "Contact",
      "Number"
    ]
  },
  {
    "slug": "watt",
    "term": "Watt",
    "fullForm": "Unit of Power",
    "category": "Science",
    "description": "The SI unit of power named after Scottish engineer James Watt, extensively taught in Indian school science curricula. In physics classes across CBSE, ICSE, and state boards, students learn that Watt measures the rate at which energy is used or produced, calculated as joules per second. Students encounter Watt when studying electrical appliances, light bulb ratings, and power consumption in homes and industries. This unit is crucial for understanding concepts like electricity bills in India where power usage is measured in kilowatt-hours, making Watt a practical and important concept for all students.",
    "related": [
      "Energy",
      "Power",
      "Electricity"
    ]
  },
  {
    "slug": "volt",
    "term": "Volt",
    "fullForm": "Unit of Voltage",
    "category": "Science",
    "description": "The SI unit of electrical potential difference or voltage, a fundamental concept taught in Indian high school physics. In Class 10 and 12 physics textbooks in India, students learn that Volt measures the electrical pressure that pushes electrons through a circuit, with household electricity in India supplied at 230 Volts. Students encounter Volt when studying batteries, electrical circuits, and power distribution systems. This unit is essential for understanding why certain appliances require specific voltage and appears in all Indian physics examinations and practical electricity experiments conducted in school laboratories.",
    "related": [
      "Electricity",
      "Current",
      "Resistance"
    ]
  },
  {
    "slug": "ampere",
    "term": "Ampere",
    "fullForm": "Unit of Electric Current",
    "category": "Science",
    "description": "The SI unit of electrical current named after French physicist Andre-Marie Ampere, taught in all Indian science curricula. In Indian physics classes, students learn that Ampere measures the flow of electric charge through a conductor, with household electrical circuits rated in Amperes using fuses and switches. Understanding Ampere is crucial for electrical safety in Indian homes and schools where students learn about overcurrent protection. This unit appears in Class 10 and 12 physics boards examinations and practical experiments where students measure current using ammeters in circuits.",
    "related": [
      "Current",
      "Electricity",
      "Resistance"
    ]
  },
  {
    "slug": "hertz",
    "term": "Hertz",
    "fullForm": "Unit of Frequency",
    "category": "Science",
    "description": "The SI unit of frequency measuring cycles per second, introduced to Indian students in physics and sound wave studies. In Class 11 and 12 physics, students encounter Hertz when studying sound waves, electromagnetic waves, and oscillations across all Indian boards. The concept becomes practical when Indian students study radio frequencies, mobile phone frequencies, and AC current frequency of 50 Hertz which is the standard in India. Hertz is essential for understanding music, light colors, and wireless communication technologies that students use daily.",
    "related": [
      "Frequency",
      "Wave",
      "Sound"
    ]
  },
  {
    "slug": "pascal",
    "term": "Pascal",
    "fullForm": "Unit of Pressure",
    "category": "Science",
    "description": "The SI unit of pressure named after French mathematician Blaise Pascal, taught in Indian physics curricula when studying mechanics and fluids. Students in Class 11 and 12 learn that Pascal measures force per unit area, with applications ranging from atmospheric pressure to pressure in hydraulic systems used in Indian industries. The standard atmospheric pressure at sea level is approximately 101,325 Pascals, a value Indian students must know for physics problems. Understanding Pascal is important for Indian students studying weather patterns, altimeters in mountains, and industrial applications.",
    "related": [
      "Pressure",
      "Force",
      "Area"
    ]
  },
  {
    "slug": "celsius",
    "term": "Celsius",
    "fullForm": "Unit of Temperature",
    "category": "Science",
    "description": "The temperature scale used throughout India for measuring temperature in weather reports, medical contexts, and scientific calculations. All Indian weather forecasts, thermometers in hospitals and homes, and school science experiments use Celsius, with water freezing at 0 degrees Celsius and boiling at 100 degrees Celsius. Indian students learn Celsius from primary school and use it in physics, chemistry, and biology experiments throughout their education. This is the standard temperature measurement across Indian meteorological departments, medical institutions, and scientific research organizations.",
    "related": [
      "Fahrenheit",
      "Kelvin",
      "Temperature"
    ]
  },
  {
    "slug": "kelvin",
    "term": "Kelvin",
    "fullForm": "SI Unit of Temperature",
    "category": "Science",
    "description": "The SI unit of absolute temperature used in advanced physics and chemistry studies in Indian schools and universities. In Class 11 and 12 physics and chemistry, Indian students learn that Kelvin is the scientific standard where absolute zero is 0 Kelvin, equivalent to minus 273.15 degrees Celsius. Students encounter Kelvin in gas laws, thermodynamics, and advanced chemistry calculations in competitive exams like JEE and NEET. This unit is essential for understanding scientific processes at the molecular level and appears in all Indian science olympiad and entrance examinations.",
    "related": [
      "Celsius",
      "Fahrenheit",
      "Temperature"
    ]
  },
  {
    "slug": "liter",
    "term": "Litre",
    "fullForm": "Unit of Volume",
    "category": "Science",
    "description": "The metric unit of volume widely used in India for measuring liquids in kitchens, medical prescriptions, and fuel consumption. Indian students learn to convert between liters and milliliters from middle school onwards, using this unit in science experiments, mathematics word problems, and daily life. A liter is exactly one thousand cubic centimeters and is used to measure milk, cooking oil, petrol, and water consumption in Indian homes. This unit appears in every Indian textbook, on beverage bottles, fuel pumps, and medical dosages, making it one of the most practically encountered units.",
    "related": [
      "Volume",
      "Millilitre",
      "Gram"
    ]
  },
  {
    "slug": "gram",
    "term": "Gram",
    "fullForm": "Unit of Mass",
    "category": "Science",
    "description": "The metric unit of mass that is the foundation of India's measurement system and taught from primary school onwards. Indian students use grams and kilograms in mathematics, science experiments, cooking measurements, and weight management contexts. The metric system using gram as the base unit was adopted across India and all educational institutions, making it the standard for pharmacy, medicine, nutrition, and commerce. This unit appears in every Indian school textbook, recipe book, medicine prescription, and digital weighing scale used throughout the country.",
    "related": [
      "Kilogram",
      "Milligram",
      "Mass"
    ]
  },
  {
    "slug": "kilometer",
    "term": "Kilometre",
    "fullForm": "Unit of Distance",
    "category": "Science",
    "description": "The metric unit of distance equal to one thousand meters, the standard unit for measuring distances in India for roads, geography, and travel. Indian road signs, train distances, and travel times are all measured in kilometers, making this unit essential for all students. In geography and map-reading lessons, Indian students use kilometers to understand distances between cities, states, and landmarks across India. This unit appears on Indian maps, GPS systems, speedometers in cars, and is fundamental to understanding the geography curriculum taught in all Indian schools.",
    "related": [
      "Metre",
      "Distance",
      "Speed"
    ]
  },
  {
    "slug": "cuet",
    "term": "CUET",
    "fullForm": "Common University Entrance Test",
    "category": "Education & Exams",
    "description": "The Common University Entrance Test conducted by the National Testing Agency that Indian students appear for admission to undergraduate programs at various central universities across India. CUET replaced the old subject-specific entrance tests and is taken by lakhs of students annually seeking admission to Delhi University, Banaras Hindu University, and other central universities. Indian students prepare for CUET in Class 12 with coaching classes and study materials focusing on mathematics, languages, and domain-specific subjects. This examination is crucial for Indian students aiming for premier central university admission and requires dedicated preparation starting from Class 11.",
    "related": [
      "CBSE",
      "UG",
      "DU"
    ]
  },
  {
    "slug": "gate",
    "term": "GATE",
    "fullForm": "Graduate Aptitude Test in Engineering",
    "category": "Education & Exams",
    "description": "The Graduate Aptitude Test in Engineering conducted in India by IIT and other institutions for admission to postgraduate engineering programs and recruitment by PSUs. Indian engineering graduates take GATE to pursue M.Tech programs at IITs and other reputed engineering colleges across the country. GATE scores are also used by public sector undertakings like NTPC, BHEL, and Indian Railways for hiring engineers, making it highly valuable for career prospects. This examination is considered one of the toughest in India, requiring dedicated preparation and strong conceptual understanding of engineering subjects.",
    "related": [
      "M.Tech",
      "NIT",
      "IIT"
    ]
  },
  {
    "slug": "cat",
    "term": "CAT",
    "fullForm": "Common Admission Test",
    "category": "Education & Exams",
    "description": "The Common Admission Test conducted by top Indian business schools for admission to MBA and other postgraduate management programs. Indian graduates with engineering, commerce, and science backgrounds appear for CAT conducted by IIM (Indian Institute of Management) affiliated institutions. Lakhs of Indian students compete annually for limited MBA seats at prestigious institutions like IIM Ahmedabad, Bangalore, Calcutta, and other top business schools. CAT scores determine entry to these premier business schools and significantly impact career prospects in management, finance, and consulting sectors in India.",
    "related": [
      "MBA",
      "IIM",
      "BBA"
    ]
  },
  {
    "slug": "clat",
    "term": "CLAT",
    "fullForm": "Common Law Admission Test",
    "category": "Education & Exams",
    "description": "The Common Law Admission Test for admission to law colleges across India for undergraduate and postgraduate law programs. Indian students aspiring for legal education take CLAT to gain admission to National Law Universities and other premier law colleges. This centralized examination replaced the fragmented law entrance tests and brought uniformity to law college admissions across India. Students prepare intensively for CLAT in their final year to secure seats at top law universities like NALSAR, Gujarat National Law University, and other reputed institutions.",
    "related": [
      "LLB",
      "LLM",
      "NLU"
    ]
  },
  {
    "slug": "ntse",
    "term": "NTSE",
    "fullForm": "National Talent Search Examination",
    "category": "Education & Exams",
    "description": "The National Talent Search Examination conducted in India to identify and nurture talented students who show exceptional academic promise. Indian middle school students appear for NTSE in Class 8 to secure scholarships worth lakhs of rupees for their education in Class 9 through 12 and beyond. NTSE is considered a prestigious examination that recognizes merit and provides financial aid to talented underprivileged students across India. Clearing NTSE has become a marker of excellence in Indian schools and opens doors to scholarships, exclusive programs, and academic recognition.",
    "related": [
      "Class-10",
      "Scholarship",
      "SAT"
    ]
  },
  {
    "slug": "kvpy",
    "term": "KVPY",
    "fullForm": "Kishore Vaigyanik Protsahan Yojana",
    "category": "Education & Exams",
    "description": "Kishore Vaigyanik Protsahan Yojana is a scholarship program run by the Department of Science and Technology in India to encourage students to pursue science careers. Indian high school students in Class 11 and 12 appear for KVPY to win monthly scholarships and summer camp opportunities for advanced scientific training. KVPY is particularly valuable for students interested in physics, chemistry, biology, and mathematics who wish to pursue research-oriented careers in science. This program has produced many scientists and researchers in India and is highly regarded for identifying young scientific talent.",
    "related": [
      "Science",
      "Scholarship",
      "Research"
    ]
  },
  {
    "slug": "aiims",
    "term": "AIIMS",
    "fullForm": "All India Institute of Medical Sciences",
    "category": "Education & Exams",
    "description": "All India Institute of Medical Sciences is the premier network of medical colleges across India where students dream of pursuing MBBS and postgraduate medical degrees. Indian medical aspirants compete fiercely in the NEET examination to secure seats at AIIMS institutions in Delhi, Bangalore, Hyderabad, and other cities across India. AIIMS is known for its rigorous training, world-class faculty, and excellent placement opportunities in both government and private sectors. Many successful Indian doctors, researchers, and medical professionals have been trained at AIIMS institutions.",
    "related": [
      "NEET",
      "MBBS",
      "Medical"
    ]
  },
  {
    "slug": "jipmer",
    "term": "JIPMER",
    "fullForm": "Jawaharlal Institute of Postgraduate Medical Education and Research",
    "category": "Education & Exams",
    "description": "Jawaharlal Institute of Postgraduate Medical Education and Research in Puducherry is a leading medical institution in India for undergraduate and postgraduate medical education. Indian NEET qualified students can secure MBBS seats at JIPMER through a separate entrance examination, making it one of the most sought-after medical colleges. JIPMER is particularly renowned for its research programs and clinical training in various medical specialties. The institute has produced many distinguished physicians and medical researchers who serve across India and globally.",
    "related": [
      "NEET",
      "MBBS",
      "Medical"
    ]
  },
  {
    "slug": "nios",
    "term": "NIOS",
    "fullForm": "National Institute of Open Schooling",
    "category": "Education & Exams",
    "description": "The National Institute of Open Schooling provides distance education and open schooling facilities for Indian students unable to attend regular schools due to various circumstances. NIOS allows Indian students to complete Class 10 and 12 through open and distance learning modes while balancing work, sports, or other commitments. Students pursuing formal education through NIOS receive certificates recognized across India for higher education and employment purposes. NIOS has enabled lakhs of Indian students to continue their education outside the traditional schooling system.",
    "related": [
      "CBSE",
      "Secondary",
      "OpenSchooling"
    ]
  },
  {
    "slug": "b-ed",
    "term": "B.Ed",
    "fullForm": "Bachelor of Education",
    "category": "Education & Exams",
    "description": "Bachelor of Education is a four-year undergraduate program that qualifies graduates to become teachers in Indian schools and educational institutions. Indian students complete B.Ed after their Class 12 or graduation to gain teaching qualifications required by the Central Board of Secondary Education and state education boards. B.Ed curriculum includes pedagogy, child psychology, and practice teaching to prepare students for classroom management and effective instruction. Many Indian teachers pursue B.Ed before securing teaching positions in government and private schools.",
    "related": [
      "Education",
      "Teacher",
      "M.Ed"
    ]
  },
  {
    "slug": "m-ed",
    "term": "M.Ed",
    "fullForm": "Master of Education",
    "category": "Education & Exams",
    "description": "Master of Education is a two-year postgraduate degree pursued by Indian teachers and education professionals for advanced qualifications and career progression. Indian educators pursue M.Ed to specialize in areas like educational management, special education, curriculum development, or educational technology. M.Ed holders often move into leadership positions like principal, district education officer, or education researcher in Indian schools and universities. This degree enhances career prospects and enables professionals to contribute to educational policy and administration in India.",
    "related": [
      "B.Ed",
      "Education",
      "Postgraduate"
    ]
  },
  {
    "slug": "ph-d",
    "term": "Ph.D",
    "fullForm": "Doctor of Philosophy",
    "category": "Education & Exams",
    "description": "Doctor of Philosophy is the highest academic degree awarded in India after years of original research and thesis submission across all disciplines. Indian students pursue Ph.D in universities and research institutions to become experts in their chosen fields and contribute to scientific knowledge. Ph.D holders in India pursue careers as university professors, research scientists, and senior specialists in government and private organizations. This degree is essential for academic careers and research-focused roles in Indian institutions.",
    "related": [
      "Research",
      "Postgraduate",
      "Master"
    ]
  },
  {
    "slug": "b-tech",
    "term": "B.Tech",
    "fullForm": "Bachelor of Technology",
    "category": "Education & Exams",
    "description": "Bachelor of Technology is the premier four-year undergraduate engineering degree pursued by lakhs of Indian students aspiring for engineering careers. Indian students compete intensively in JEE Main and JEE Advanced to secure B.Tech seats at IITs, NITs, and other engineering colleges across the country. B.Tech graduates from top institutions like IIT Delhi, IIT Bombay, and NIT Trichy are highly sought after by Indian and multinational companies. This degree qualifies graduates for engineering roles in infrastructure, technology, manufacturing, and other sectors in India.",
    "related": [
      "JEE",
      "Engineering",
      "M.Tech"
    ]
  },
  {
    "slug": "m-tech",
    "term": "M.Tech",
    "fullForm": "Master of Technology",
    "category": "Education & Exams",
    "description": "Master of Technology is a two-year postgraduate engineering degree that Indian engineers pursue at IITs and other institutions for specialization and career advancement. Indian B.Tech graduates appear for GATE examination to secure M.Tech seats for advanced engineering studies and research opportunities. M.Tech holders often move into senior technical roles, research positions, or entrepreneurship in technology companies across India. This degree is particularly valuable for students interested in research, innovation, and specialized technical expertise.",
    "related": [
      "GATE",
      "B.Tech",
      "Engineering"
    ]
  },
  {
    "slug": "bba",
    "term": "BBA",
    "fullForm": "Bachelor of Business Administration",
    "category": "Education & Exams",
    "description": "Bachelor of Business Administration is a three-year undergraduate degree preparing Indian students for management roles in Indian and multinational companies. BBA curriculum in Indian colleges covers management principles, economics, accounting, marketing, and human resources. Indian BBA graduates secure entry-level management positions in finance, consulting, retail, and corporate sectors. Many BBA graduates later pursue MBA degrees for further advancement in their management careers in India.",
    "related": [
      "MBA",
      "Business",
      "Management"
    ]
  },
  {
    "slug": "mba",
    "term": "MBA",
    "fullForm": "Master of Business Administration",
    "category": "Education & Exams",
    "description": "Master of Business Administration is the most sought-after postgraduate degree in India for students pursuing management and leadership careers. Indian MBA graduates from IIMs, top business schools, and universities secure senior management positions with attractive salaries in Indian companies and multinational corporations. MBA specializations in finance, marketing, operations, and HR prepare Indian professionals for executive roles across sectors. MBA is considered a golden ticket for career advancement and increased earning potential in India's corporate sector.",
    "related": [
      "CAT",
      "BBA",
      "Management"
    ]
  },
  {
    "slug": "bca",
    "term": "BCA",
    "fullForm": "Bachelor of Computer Applications",
    "category": "Education & Exams",
    "description": "Bachelor of Computer Applications is a three-year undergraduate degree that qualifies Indian students for software development and IT careers. BCA curriculum includes programming languages, database management, web development, and software engineering for hands-on IT training. Indian BCA graduates secure positions as software developers, web developers, and IT specialists in IT companies across India and abroad. BCA is a dedicated IT degree pathway for students interested in computing careers without requiring advanced mathematics knowledge needed for B.Tech.",
    "related": [
      "Computer",
      "Technology",
      "MCA"
    ]
  },
  {
    "slug": "mca",
    "term": "MCA",
    "fullForm": "Master of Computer Applications",
    "category": "Education & Exams",
    "description": "Master of Computer Applications is a two-year postgraduate degree in India for IT professionals and graduates seeking advanced computer science expertise. MCA graduates pursue senior software engineering, technical leadership, and research roles in Indian IT companies like TCS, Infosys, and Wipro. The degree covers advanced topics in software engineering, database systems, and emerging technologies like artificial intelligence and cloud computing. MCA provides a specialized pathway for graduates to become senior technical professionals and architects in India's booming IT sector.",
    "related": [
      "BCA",
      "GATE",
      "Technology"
    ]
  },
  {
    "slug": "ba",
    "term": "BA",
    "fullForm": "Bachelor of Arts",
    "category": "Education & Exams",
    "description": "Bachelor of Arts is a three-year undergraduate degree in India offering diverse specialization options including languages, history, geography, philosophy, and social sciences. Indian BA students choose streams combining subjects like English, Hindi, history, economics, or political science based on their interests. BA degree holders pursue careers in education, journalism, administration, law, and various government services across India. Many Indian professionals in media, politics, and academic sectors begin their careers with a BA degree.",
    "related": [
      "Humanities",
      "UPSC",
      "BSc"
    ]
  },
  {
    "slug": "bsc",
    "term": "BSc",
    "fullForm": "Bachelor of Science",
    "category": "Education & Exams",
    "description": "Bachelor of Science is a three-year undergraduate degree in India for students pursuing careers in physics, chemistry, biology, mathematics, and other sciences. Indian BSc students specializing in physics, chemistry, and biology often proceed to medical or engineering entrance exams or pursue research careers. BSc from reputed Indian colleges provides a strong foundation for careers in research, education, pharmaceuticals, and scientific institutions. Many Indian scientists, researchers, and academics have started their careers with a BSc degree.",
    "related": [
      "Science",
      "NEET",
      "GATE"
    ]
  },
  {
    "slug": "bcom",
    "term": "BCom",
    "fullForm": "Bachelor of Commerce",
    "category": "Education & Exams",
    "description": "Bachelor of Commerce is a three-year undergraduate degree in India preparing students for careers in accounting, finance, auditing, and business management. BCom curriculum in Indian colleges includes subjects like accounting, auditing, business law, taxation, and business economics. Indian BCom graduates secure positions as chartered accountants, company secretaries, auditors, and finance managers in Indian companies and global corporations. BCom is the traditional starting degree for students interested in finance, accounting, and business career paths in India.",
    "related": [
      "Commerce",
      "Accounting",
      "CA"
    ]
  },
  {
    "slug": "lan",
    "term": "LAN",
    "fullForm": "Local Area Network",
    "category": "Computer & Tech",
    "description": "Local Area Network refers to a small network of connected computers within a limited geographic area like a school, office, or home in India. Indian schools use LAN to connect computer labs where students access shared resources and printers for their IT classes. In Indian offices and IT companies, LAN enables employees to share files, printers, and internet connection within their building. Understanding LAN is part of computer networking curriculum taught to Class 11 and 12 students in Indian schools.",
    "related": [
      "WAN",
      "Network",
      "IP"
    ]
  },
  {
    "slug": "wan",
    "term": "WAN",
    "fullForm": "Wide Area Network",
    "category": "Computer & Tech",
    "description": "Wide Area Network connects multiple LANs across large geographic distances like different cities or countries, forming the backbone of internet connectivity in India. Indian banks use WAN to connect branch offices across states, while IT companies use WAN for communication between offices in different cities. The internet itself is the largest WAN connecting millions of computers globally. Indian students studying computer networks learn WAN concepts to understand how data travels across large distances and different networks.",
    "related": [
      "LAN",
      "Internet",
      "Network"
    ]
  },
  {
    "slug": "ip",
    "term": "IP",
    "fullForm": "Internet Protocol",
    "category": "Computer & Tech",
    "description": "Internet Protocol is the fundamental communication standard allowing computers and devices to connect and exchange data across the internet in India and worldwide. Every device connected to the internet in India, including computers, smartphones, and servers, has a unique IP address for identification and communication. Indian IT professionals and computer science students learn about IPv4 and IPv6 protocols as foundational concepts in networking. IP addresses are essential for accessing websites, emails, and online services that millions of Indian users rely on daily.",
    "related": [
      "DNS",
      "Network",
      "URL"
    ]
  },
  {
    "slug": "dns",
    "term": "DNS",
    "fullForm": "Domain Name System",
    "category": "Computer & Tech",
    "description": "Domain Name System translates human-readable website addresses like syllab.in into IP addresses that computers understand for internet access in India. When Indian students type a website URL in their browser, DNS servers convert the domain name to the corresponding IP address allowing the browser to locate the website. DNS is critical infrastructure that Indian internet service providers maintain to enable seamless web browsing for users across the country. Understanding DNS is part of networking education for computer science students in Indian schools and colleges.",
    "related": [
      "IP",
      "URL",
      "Internet"
    ]
  },
  {
    "slug": "sql",
    "term": "SQL",
    "fullForm": "Structured Query Language",
    "category": "Computer & Tech",
    "description": "Structured Query Language is the standard programming language used in India for storing, retrieving, and managing data in databases across all industries. Indian software developers, data analysts, and database administrators use SQL daily to create databases, insert data, and extract information for business decisions. In Indian corporate offices, banks, hospitals, and government agencies, SQL powers the database systems managing critical operations. SQL is taught as a core subject in B.Tech, BCA, and MCA programs across Indian engineering and computer science colleges.",
    "related": [
      "Database",
      "Programming",
      "MCA"
    ]
  },
  {
    "slug": "os",
    "term": "OS",
    "fullForm": "Operating System",
    "category": "Computer & Tech",
    "description": "Operating System is the fundamental software managing computer hardware and resources, with Windows, macOS, and Linux being the most common examples used in India. Indian students learn about operating systems in their computer science curriculum to understand how computers manage memory, processes, and user applications. Schools and offices across India use various operating systems like Windows for most computers, while some institutions use Linux for server management. Understanding OS concepts is essential for anyone working with computers or pursuing IT careers in India.",
    "related": [
      "Software",
      "Linux",
      "GUI"
    ]
  },
  {
    "slug": "gui",
    "term": "GUI",
    "fullForm": "Graphical User Interface",
    "category": "Computer & Tech",
    "description": "Graphical User Interface is the visual method allowing users to interact with computers using windows, icons, buttons, and menus instead of text commands in India. Indian students learning computer basics encounter GUI when using Windows, phones, and applications with visual interfaces for easy interaction. GUI makes computers accessible to non-technical users across India compared to command-line interfaces requiring technical knowledge. Educational software and learning platforms used by Indian students employ intuitive graphical user interfaces for better user experience and learning outcomes.",
    "related": [
      "OS",
      "Interface",
      "Software"
    ]
  },
  {
    "slug": "cd",
    "term": "CD",
    "fullForm": "Compact Disc",
    "category": "Computer & Tech",
    "description": "A compact disc is a small plastic disc used to store digital data like music, movies, or computer software. CDs became widely popular in India through the 1990s and 2000s for distributing music albums, game software, and educational content. Although less common today due to internet streaming, students still encounter CDs in some government school libraries and archives. Understanding CDs helps students learn about data storage technology and the evolution of how information has been shared over time.",
    "related": [
      "DVD",
      "Storage",
      "USB"
    ]
  },
  {
    "slug": "dvd",
    "term": "DVD",
    "fullForm": "Digital Versatile Disc",
    "category": "Computer & Tech",
    "description": "A digital versatile disc is an optical storage medium that holds much more data than a CD, making it ideal for storing full-length movies in good quality. DVDs were extremely popular in India from the early 2000s onward, with video rental shops and home movie collections common in most cities and towns. Many Indian families still own DVD players and collections of Bollywood movies, cricket matches, and educational videos. Students should know DVDs as a key technology that preceded streaming services and shaped how media was distributed and consumed in India.",
    "related": [
      "CD",
      "Storage",
      "Blu-ray"
    ]
  },
  {
    "slug": "gb",
    "term": "GB",
    "fullForm": "Gigabyte",
    "category": "Computer & Tech",
    "description": "A gigabyte is a unit of digital storage equal to roughly one billion bytes, commonly abbreviated as GB. When students download apps, games, or files, file sizes are usually measured in gigabytes. A typical smartphone has 64 GB to 256 GB of storage, and understanding GB helps students choose devices with adequate space for their photos, videos, and applications. This metric is essential for online learning, as educational videos and software bundles are often several gigabytes in size.",
    "related": [
      "MB",
      "KB",
      "Storage"
    ]
  },
  {
    "slug": "mb",
    "term": "MB",
    "fullForm": "Megabyte",
    "category": "Computer & Tech",
    "description": "A megabyte is a unit of digital storage roughly equal to one million bytes, or about one-thousandth of a gigabyte. When uploading assignments or documents online, students see file sizes in megabytes, typically ranging from 1 MB to 50 MB depending on the file type. Internet speeds are often measured in megabits per second (Mbps), and understanding MB helps students manage file transfers, email attachments, and cloud uploads. This unit is the everyday measurement for most documents, images, and small audio files students encounter.",
    "related": [
      "GB",
      "KB",
      "Storage"
    ]
  },
  {
    "slug": "kb",
    "term": "KB",
    "fullForm": "Kilobyte",
    "category": "Computer & Tech",
    "description": "A kilobyte is the smallest common unit of digital storage, equal to roughly one thousand bytes. Simple files like text documents, small images, and short audio clips are often measured in kilobytes. While large files today are measured in megabytes or gigabytes, kilobytes remain relevant when discussing web page sizes, favicon files, and very basic digital assets. Students learning about data storage and file management encounter kilobytes when understanding the hierarchy of storage units from smallest to largest.",
    "related": [
      "MB",
      "GB",
      "Byte"
    ]
  },
  {
    "slug": "www",
    "term": "WWW",
    "fullForm": "World Wide Web",
    "category": "Computer & Tech",
    "description": "The World Wide Web is the system of interconnected documents and resources accessed through the internet using web browsers. It was invented in the late 1980s and revolutionized how information is shared globally, including in India. When students type a web address like www.syllab.in, they are accessing the World Wide Web, which includes websites, online tools, educational platforms, and social media. The WWW is fundamental to online learning, research, and modern digital communication that Indian students rely on daily.",
    "related": [
      "Internet",
      "URL",
      "HTTP"
    ]
  },
  {
    "slug": "ftp",
    "term": "FTP",
    "fullForm": "File Transfer Protocol",
    "category": "Computer & Tech",
    "description": "File Transfer Protocol is a method for uploading and downloading files over the internet, used primarily by web developers and system administrators. While everyday internet users rarely interact with FTP directly, students learning web development and computer science in schools and coaching centers learn FTP as a way to upload website files to servers. FTP is less common now due to modern alternatives like cloud storage and Git, but it remains an important historical technology that students should understand. It demonstrates how the internet can transfer data reliably between computers across distances.",
    "related": [
      "Protocol",
      "HTTP",
      "SFTP"
    ]
  },
  {
    "slug": "smtp",
    "term": "SMTP",
    "fullForm": "Simple Mail Transfer Protocol",
    "category": "Computer & Tech",
    "description": "Simple Mail Transfer Protocol is the technical system that handles sending emails across the internet from one mail server to another. Every time a student sends an email from their Gmail, Outlook, or school email account, SMTP is working behind the scenes to deliver that message. Understanding SMTP is important for students studying computer networks and information technology, as it is a foundational internet protocol. Email remains a critical tool for academic communication, assignment submission, and receiving updates from educational institutions.",
    "related": [
      "Email",
      "POP3",
      "Protocol"
    ]
  },
  {
    "slug": "jpeg",
    "term": "JPEG",
    "fullForm": "Joint Photographic Experts Group",
    "category": "Computer & Tech",
    "description": "JPEG is a widely used image file format that compresses photographs while maintaining good visual quality, making it ideal for photos and complex images. Most photos taken on smartphones and cameras in India are automatically saved as JPEG files because they balance quality with file size. Students working on presentations, projects, or creating digital content regularly use JPEG images downloaded from the internet or captured with their cameras. This format is the standard for sharing photos online, in emails, and on social media platforms across India.",
    "related": [
      "PNG",
      "Image",
      "GIF"
    ]
  },
  {
    "slug": "png",
    "term": "PNG",
    "fullForm": "Portable Network Graphics",
    "category": "Computer & Tech",
    "description": "PNG is an image file format that supports transparency and is commonly used for graphics, logos, and images that require a clean, sharp appearance. Unlike JPEG, PNG files are larger but preserve more detail and allow transparent backgrounds, making them ideal for web graphics and design work. Students creating digital presentations, school projects, or learning graphic design use PNG files for logos, icons, and illustrations. Web pages and educational materials in India typically use PNG for visual elements that need to maintain sharpness and transparency.",
    "related": [
      "JPEG",
      "GIF",
      "Image"
    ]
  },
  {
    "slug": "gif",
    "term": "GIF",
    "fullForm": "Graphics Interchange Format",
    "category": "Computer & Tech",
    "description": "A GIF is a simple image format commonly used for short, looping animations like funny clips, reaction videos, or educational motion graphics. GIFs became incredibly popular in social media and messaging apps in India, with millions of students sharing them on WhatsApp, Instagram, and other platforms every day. Unlike videos, GIFs are small, easy to share, and automatically loop without requiring a click to play. Students encounter GIFs constantly in online communication and may create simple animations using free online tools for projects or presentations.",
    "related": [
      "PNG",
      "JPEG",
      "Animation"
    ]
  },
  {
    "slug": "api",
    "term": "API",
    "fullForm": "Application Programming Interface",
    "category": "Computer & Tech",
    "description": "An API is a set of rules and tools that allows two different software programs to communicate and share data with each other. When a student uses a weather app, a maps application, or an online learning platform, those apps are often using APIs to fetch real-time data from other services. Understanding APIs is crucial for computer science and programming students, as many modern applications are built by combining multiple APIs. Indian tech companies and educational platforms heavily rely on APIs to create seamless experiences for millions of users.",
    "related": [
      "Programming",
      "Software",
      "Integration"
    ]
  },
  {
    "slug": "ide",
    "term": "IDE",
    "fullForm": "Integrated Development Environment",
    "category": "Computer & Tech",
    "description": "An IDE is a software tool that helps programmers write, test, and debug computer code all in one place with helpful features like syntax highlighting and error checking. Students learning programming in schools and competitive exam coaching use IDEs like VS Code, PyCharm, or Code::Blocks to write and run their code. Popular IDEs are free or low-cost, making them accessible to students across India learning languages like Python, C, or Java. A good IDE significantly improves productivity and helps beginners catch mistakes immediately as they write code.",
    "related": [
      "Programming",
      "Software",
      "Code"
    ]
  },
  {
    "slug": "qr",
    "term": "QR",
    "fullForm": "Quick Response",
    "category": "Computer & Tech",
    "description": "A QR code is a two-dimensional barcode that stores information in a visual square pattern and can be quickly scanned using a smartphone camera. QR codes are everywhere in India now—on product packages, restaurant menus, payment systems, and educational materials. Students use QR codes to access online links, download educational resources, or verify product authenticity during exams. Scanning a QR code is simple: just point a camera at it, and the phone instantly opens the linked website or content.",
    "related": [
      "Barcode",
      "Mobile",
      "Technology"
    ]
  },
  {
    "slug": "cfc",
    "term": "CFC",
    "fullForm": "Chlorofluorocarbon",
    "category": "Science",
    "description": "Chlorofluorocarbons are chemicals formerly used in refrigerators, air conditioners, and spray cans that were discovered to damage the Earth's ozone layer when released into the atmosphere. Indian school textbooks, particularly in chemistry and environmental science, discuss CFCs as a major environmental problem of the late 20th century. The Montreal Protocol, an international agreement that India signed, phased out CFC production and use to protect the ozone layer. Students learn about CFCs to understand environmental chemistry, the greenhouse effect, and how global cooperation can solve planetary problems.",
    "related": [
      "Ozone",
      "Environment",
      "Chemistry"
    ]
  },
  {
    "slug": "uv",
    "term": "UV",
    "fullForm": "Ultraviolet",
    "category": "Science",
    "description": "Ultraviolet light is electromagnetic radiation from the sun that is invisible to human eyes but has high energy that can damage skin and cause sunburn. Sunscreen products sold across India explicitly protect against UV rays, making this an everyday concern for students living in India's tropical and subtropical climate. The ozone layer filters out much of the sun's UV radiation, which is why ozone depletion is a serious environmental issue. Students studying physics and biology learn about UV light and its effects on living organisms and materials.",
    "related": [
      "Light",
      "Radiation",
      "Sun"
    ]
  },
  {
    "slug": "ir",
    "term": "IR",
    "fullForm": "Infrared",
    "category": "Science",
    "description": "Infrared radiation is a type of light energy invisible to human eyes that we feel as heat, emitted by all warm objects including the sun and our own bodies. TV remote controls in homes across India use infrared light to communicate wirelessly with televisions, demonstrating a practical application students see daily. Thermal cameras, night vision equipment, and heat lamps all rely on infrared technology, which is important in physics, engineering, and security applications. Students learn about infrared in science classes to understand the electromagnetic spectrum and heat transfer.",
    "related": [
      "Radiation",
      "Heat",
      "Light"
    ]
  },
  {
    "slug": "emf",
    "term": "EMF",
    "fullForm": "Electromotive Force",
    "category": "Science",
    "description": "Electromotive force is the energy provided by a power source like a battery that pushes electric current through a circuit, measured in volts. Every electronic device students use—from smartphones to fans to lights—relies on EMF from a power source to function. In physics class, students calculate EMF when studying batteries, circuits, and power generation. Understanding EMF is fundamental to electrical engineering and essential for students preparing for competitive exams in physics.",
    "related": [
      "Voltage",
      "Current",
      "Circuit"
    ]
  },
  {
    "slug": "si",
    "term": "SI",
    "fullForm": "International System of Units",
    "category": "Science",
    "description": "The SI system is the international standard set of measurement units used by scientists and engineers worldwide, including meters for length, kilograms for mass, and seconds for time. Every science class in India teaches SI units, and all official measurements and scientific publications use SI standards. Students must be fluent in SI units for physics, chemistry, and biology exams, as all calculations and answers are expected in SI measurements. This system ensures consistency and clarity in scientific communication across all countries and disciplines.",
    "related": [
      "Units",
      "Measurement",
      "Science"
    ]
  },
  {
    "slug": "stp",
    "term": "STP",
    "fullForm": "Standard Temperature and Pressure",
    "category": "Science",
    "description": "Standard Temperature and Pressure refers to specific lab conditions set at 0 degrees Celsius and one atmosphere of pressure, used as a reference point for calculating gas volumes and densities. Chemistry students in India use STP values when solving gas law problems and performing stoichiometric calculations in competitive exams like JEE and NEET. Gases behave predictably at STP, allowing scientists to compare volumes and quantities accurately across different experiments. This standardization is crucial in chemistry because gas behavior changes dramatically with temperature and pressure variations.",
    "related": [
      "Temperature",
      "Pressure",
      "Chemistry"
    ]
  },
  {
    "slug": "ntp",
    "term": "NTP",
    "fullForm": "Normal Temperature and Pressure",
    "category": "Science",
    "description": "Normal Temperature and Pressure is an alternative standard condition set at 25 degrees Celsius and one atmosphere, sometimes used instead of STP in chemistry calculations and laboratory work. Different countries and scientific fields may use either NTP or STP, so students must be aware of which standard applies to their problem or experiment. Indian chemistry curricula reference both standards, and competitive exam questions occasionally require students to convert between NTP and STP conditions. Understanding the difference helps students avoid calculation errors in gas law and molar volume problems.",
    "related": [
      "Temperature",
      "STP",
      "Pressure"
    ]
  },
  {
    "slug": "kwh",
    "term": "kWh",
    "fullForm": "Kilowatt-hour",
    "category": "Science",
    "description": "A kilowatt-hour is a unit of electrical energy showing how much power an appliance uses over time, commonly used to measure household electricity consumption on monthly bills. Every family in India receives electricity bills in units of kilowatt-hours, making this a practical concept students see at home. An air conditioner running for one hour might use 1.5 kWh, while a light bulb uses much less, and these costs add up on monthly bills. Students studying physics and energy management learn kWh to understand electricity consumption, costs, and energy efficiency.",
    "related": [
      "Energy",
      "Electricity",
      "Power"
    ]
  },
  {
    "slug": "who",
    "term": "WHO",
    "fullForm": "World Health Organization",
    "category": "Medical",
    "description": "The World Health Organization is a specialized agency of the United Nations that coordinates global health efforts, disease prevention, and emergency responses worldwide. The WHO played a major role during the COVID-19 pandemic, providing guidance that affected schools, hospitals, and daily life across India. Students learn about the WHO when studying public health, epidemiology, and global governance in social studies and biology classes. India works with the WHO on vaccination programs, disease surveillance, and improving healthcare systems for millions of citizens.",
    "related": [
      "Health",
      "Medicine",
      "United Nations"
    ]
  },
  {
    "slug": "icu",
    "term": "ICU",
    "fullForm": "Intensive Care Unit",
    "category": "Medical",
    "description": "An Intensive Care Unit is a specialized hospital ward equipped with advanced medical equipment and staffed with experienced doctors and nurses to treat critically ill or severely injured patients. Parents and students in India are aware of ICUs from family medical emergencies, major surgeries, or serious illnesses requiring close monitoring and life support. Studying medicine or nursing in India requires understanding ICU protocols, patient care, and the critical role ICUs play in modern healthcare. Television dramas and news coverage frequently reference ICUs, making it a familiar concept to Indian students and families.",
    "related": [
      "Hospital",
      "Medical",
      "Patient"
    ]
  },
  {
    "slug": "opd",
    "term": "OPD",
    "fullForm": "Outpatient Department",
    "category": "Medical",
    "description": "An Outpatient Department is the area of a hospital where patients visit for consultation, diagnosis, and minor treatment without staying overnight. Nearly every Indian student has visited an OPD in a hospital or clinic for routine checkups, vaccinations, or treatment of minor illnesses and injuries. The OPD is the most common entry point into the healthcare system for millions of Indians seeking medical care for non-emergency conditions. Understanding OPD procedures is important for students studying healthcare, medicine, or simply navigating the Indian medical system.",
    "related": [
      "Hospital",
      "Medical",
      "Patient"
    ]
  },
  {
    "slug": "ivf",
    "term": "IVF",
    "fullForm": "In Vitro Fertilization",
    "category": "Medical",
    "description": "In Vitro Fertilization is a fertility treatment where eggs and sperm are combined in a laboratory dish to create embryos, which are then implanted in the uterus to achieve pregnancy. IVF has become increasingly common in India, with many couples using this technology when natural conception is not possible due to medical reasons. Students studying biology, medicine, or reproductive health learn about IVF as an important medical advancement that helps families. This treatment is expensive but increasingly accessible in major Indian cities through specialized fertility clinics.",
    "related": [
      "Fertility",
      "Medical",
      "Pregnancy"
    ]
  },
  {
    "slug": "ors",
    "term": "ORS",
    "fullForm": "Oral Rehydration Solution",
    "category": "Medical",
    "description": "Oral Rehydration Solution is a simple mixture of water, salt, and sugar used to treat dehydration caused by diarrhea, cholera, or excessive sweating. Every Indian school and healthcare worker knows ORS because diarrheal diseases are common in India, especially among children, and ORS is an inexpensive, life-saving treatment. Public health campaigns across India promote ORS as the first-line treatment for dehydration rather than waiting for hospitalization. Students studying medicine, public health, or biology learn about ORS as an example of simple, effective healthcare innovation that saves millions of lives.",
    "related": [
      "Health",
      "Dehydration",
      "Treatment"
    ]
  },
  {
    "slug": "tb",
    "term": "TB",
    "fullForm": "Tuberculosis",
    "category": "Medical",
    "description": "Tuberculosis is a serious infectious disease caused by bacteria that primarily affects the lungs and spreads through air when infected people cough or sneeze. TB remains a significant public health challenge in India, with government health programs providing free TB testing and treatment to all citizens. Every student in India learns about TB prevention, symptoms, and treatment in health and biology classes because awareness is crucial for early detection. India's National TB Elimination Program works to reduce TB cases, and students are often screened for TB in schools and clinics.",
    "related": [
      "Disease",
      "Medical",
      "Infection"
    ]
  },
  {
    "slug": "neft",
    "term": "NEFT",
    "fullForm": "National Electronic Funds Transfer",
    "category": "Banking & Govt",
    "description": "National Electronic Funds Transfer is an electronic system used by Indian banks to transfer money between accounts, typically taking one to two hours to process. When a student's parent transfers money from one bank account to another for school fees or living expenses, NEFT is often the method used. NEFT works on a scheduled basis throughout the day, making it more cost-effective than immediate transfer systems for regular transactions. Understanding NEFT helps students and families manage money transfers efficiently for education, rent, and other regular payments.",
    "related": [
      "RTGS",
      "Banking",
      "Payment"
    ]
  },
  {
    "slug": "rtgs",
    "term": "RTGS",
    "fullForm": "Real Time Gross Settlement",
    "category": "Banking & Govt",
    "description": "Real Time Gross Settlement is an electronic system that transfers large sums of money between banks almost instantly, usually for urgent or large-value transactions. When a family needs to transfer a large amount like a home down payment or significant educational expense, RTGS ensures the money reaches within minutes. RTGS comes with higher fees than NEFT but is essential for urgent transactions that cannot wait hours or days. Students handling large financial matters should understand RTGS for major educational or family expenses.",
    "related": [
      "NEFT",
      "Banking",
      "Payment"
    ]
  },
  {
    "slug": "imps",
    "term": "IMPS",
    "fullForm": "Immediate Payment Service",
    "category": "Banking & Govt",
    "description": "Immediate Payment Service is a fast electronic fund transfer system available 24 hours a day that allows people to send money between bank accounts in just a few minutes. IMPS is extremely popular among Indian students for receiving money from parents, paying hostel fees, or splitting expenses with friends via mobile apps and online banking. This system works instantly even at night or on holidays, making it ideal for emergency money transfers or quick payments. The convenience and speed of IMPS have made it the preferred method for everyday money transfers across India.",
    "related": [
      "NEFT",
      "Banking",
      "Payment"
    ]
  },
  {
    "slug": "fd",
    "term": "FD",
    "fullForm": "Fixed Deposit",
    "category": "Banking & Govt",
    "description": "A Fixed Deposit is a type of savings account offered by banks where you deposit money for a fixed period and earn guaranteed interest, but cannot withdraw the money before maturity without penalty. Parents often open FDs for their children's education or future needs, locking in money at a fixed interest rate for safety and steady returns. FDs are considered very safe investments because the bank guarantees both the principal amount and the interest earned. Students learning about finance and investments should understand FDs as a conservative savings tool compared to stocks or mutual funds.",
    "related": [
      "Banking",
      "Investment",
      "Savings"
    ]
  },
  {
    "slug": "rd",
    "term": "RD",
    "fullForm": "Recurring Deposit",
    "category": "Banking & Govt",
    "description": "A Recurring Deposit is a savings scheme where you deposit a fixed amount of money each month for a set period, earning interest on your savings. Many Indian families use RDs as a disciplined way to save money for education, weddings, or major purchases by committing to monthly deposits. RDs are flexible and safe, allowing people to build savings habits gradually while earning better interest than regular savings accounts. Students can start their own RD accounts to save pocket money or learn about long-term financial discipline.",
    "related": [
      "Banking",
      "Savings",
      "Investment"
    ]
  },
  {
    "slug": "npa",
    "term": "NPA",
    "fullForm": "Non-Performing Asset",
    "category": "Banking & Govt",
    "description": "A Non-Performing Asset is a loan or investment that has stopped generating income because the borrower has failed to make payments for an extended period. When banks report high NPA rates, it indicates stress in the financial system, affecting credit availability and interest rates across the economy. Students studying economics, finance, or commerce learn about NPA to understand banking health and macroeconomic conditions in India. The government works to reduce NPAs through various schemes and recovery efforts to maintain financial stability.",
    "related": [
      "Loan",
      "Banking",
      "Credit"
    ]
  },
  {
    "slug": "pin",
    "term": "PIN",
    "fullForm": "Personal Identification Number",
    "category": "Banking & Govt",
    "description": "A Personal Identification Number is a confidential numeric code used to verify your identity when withdrawing money from ATMs, making online payments, or accessing secure banking services. Every student with a debit card or bank account must protect their PIN to prevent unauthorized access to their money. PINs are a basic security measure that students learn about in school when opening their first bank account or getting their first ATM card. Never sharing your PIN with anyone, including bank staff, is a critical lesson in financial security.",
    "related": [
      "Security",
      "Banking",
      "Password"
    ]
  },
  {
    "slug": "cvv",
    "term": "CVV",
    "fullForm": "Card Verification Value",
    "category": "Banking & Govt",
    "description": "The Card Verification Value is a three-digit security code on the back of credit and debit cards used to verify that the person using the card physically possesses it. When students shop online or pay for educational subscriptions, they must enter their CVV along with the card number to complete the transaction. The CVV is a critical security feature designed to prevent fraudulent use if the card number is stolen. Never sharing your CVV online or over the phone except on secure websites is an essential rule of card safety.",
    "related": [
      "Card",
      "Banking",
      "Security"
    ]
  },
  {
    "slug": "nabard",
    "term": "NABARD",
    "fullForm": "National Bank for Agriculture and Rural Development",
    "category": "Banking & Govt",
    "description": "The National Bank for Agriculture and Rural Development is an Indian government bank that provides loans and support to farmers and rural development projects. NABARD plays a crucial role in India's agricultural economy by providing affordable credit to farmers for seeds, equipment, and land improvement. Students interested in agriculture, economics, or rural development learn about NABARD's programs and policies. This bank demonstrates how government institutions support specific sectors and help increase prosperity in rural India.",
    "related": [
      "Banking",
      "Agriculture",
      "Rural"
    ]
  },
  {
    "slug": "sebi",
    "term": "SEBI",
    "fullForm": "Securities and Exchange Board of India",
    "category": "Banking & Govt",
    "description": "The Securities and Exchange Board of India is the government agency that regulates stock markets, mutual funds, and other investments to protect investors and maintain fair markets. SEBI sets rules that stockbrokers and companies must follow, ensuring transparency and preventing fraud in Indian financial markets. Students studying finance, commerce, or economics learn about SEBI's role in maintaining a trustworthy investment system. Anyone buying shares, mutual funds, or other securities in India is protected by SEBI's regulations.",
    "related": [
      "Stock",
      "Market",
      "Investment"
    ]
  },
  {
    "slug": "irda",
    "term": "IRDA",
    "fullForm": "Insurance Regulatory and Development Authority",
    "category": "Banking & Govt",
    "description": "The Insurance Regulatory and Development Authority is the government agency that oversees insurance companies, sets insurance rules, and ensures that insurance providers treat customers fairly. Every insurance policy sold in India—whether for health, vehicles, or property—is regulated by IRDA to protect consumers and promote honest practices. Students learning about insurance and risk management study IRDA's regulations and role in the financial system. IRDA ensures that insurance claims are paid promptly and that insurance products are clearly explained to customers.",
    "related": [
      "Insurance",
      "Regulation",
      "Protection"
    ]
  },
  {
    "slug": "fdi",
    "term": "FDI",
    "fullForm": "Foreign Direct Investment",
    "category": "Banking & Govt",
    "description": "Foreign Direct Investment occurs when companies or investors from other countries invest money in Indian businesses, factories, or projects to make profits and create jobs. FDI brings in foreign technology, expertise, and capital that boost the Indian economy, create employment, and improve industries. Students studying economics and international trade learn about FDI as a key factor in India's economic growth and development. India actively attracts FDI from companies like Apple, Tesla, and others to establish manufacturing and increase economic opportunity.",
    "related": [
      "Investment",
      "Economy",
      "Business"
    ]
  },
  {
    "slug": "mnc",
    "term": "MNC",
    "fullForm": "Multinational Corporation",
    "category": "Banking & Govt",
    "description": "A Multinational Corporation is a large company that operates in multiple countries, managing businesses, factories, and offices across different nations. Indian students encounter MNC brands daily—clothing companies like Nike, tech firms like Google, and food chains like McDonald's are all MNCs operating in India. Studying MNCs helps students understand global business, international economics, and how companies scale their operations across borders. Many Indian companies have also become MNCs, expanding their businesses internationally and creating global employment.",
    "related": [
      "Business",
      "International",
      "Company"
    ]
  },
  {
    "slug": "ngo",
    "term": "NGO",
    "fullForm": "Non-Governmental Organization",
    "category": "Banking & Govt",
    "description": "A Non-Governmental Organization is a non-profit group working on social causes like education, health, environment, or poverty relief, independent of government control. India has thousands of NGOs providing education to underprivileged children, healthcare in remote areas, and environmental protection where government services are insufficient. Students often volunteer with NGOs to gain experience in social work and understand real-world issues affecting their communities. Many internationally known NGOs like UNESCO and Doctors Without Borders operate in India alongside local organizations.",
    "related": [
      "Non-profit",
      "Social",
      "Community"
    ]
  },
  {
    "slug": "psu",
    "term": "PSU",
    "fullForm": "Public Sector Undertaking",
    "category": "Banking & Govt",
    "description": "A Public Sector Undertaking is a company or organization owned and operated by the Indian government to provide essential services and employ citizens. Major PSUs like Indian Railways, Air India, and state electricity boards provide critical services to millions of Indians daily. Students learn about PSUs when studying economics and Indian business, understanding their role in providing affordable public services. PSU jobs are highly sought-after in India because they offer job security, good benefits, and stable career paths.",
    "related": [
      "Government",
      "Business",
      "Public"
    ]
  },
  {
    "slug": "ceo",
    "term": "CEO",
    "fullForm": "Chief Executive Officer",
    "category": "Banking & Govt",
    "description": "A Chief Executive Officer is the top executive officer of a company responsible for overall strategy, decision-making, and performance. Every large company in India, from Reliance to TCS to Indian startups, has a CEO leading the organization. Students studying business administration or aspiring entrepreneurs learn about CEO responsibilities and leadership styles. The CEO is ultimately accountable for the company's success or failure, making it the highest-ranked operational position.",
    "related": [
      "Management",
      "Business",
      "Leadership"
    ]
  },
  {
    "slug": "hr",
    "term": "HR",
    "fullForm": "Human Resources",
    "category": "Banking & Govt",
    "description": "Human Resources is the department within a company responsible for hiring employees, managing payroll, training workers, and handling workplace policies. Every student seeking employment interacts with an HR department when applying for jobs, onboarding, and addressing workplace issues. HR professionals in India manage recruitment, salary structures, benefits, and employee welfare across organizations. Understanding HR processes helps students prepare for job applications and understand workplace rights and responsibilities.",
    "related": [
      "Management",
      "Employment",
      "Organization"
    ]
  },
  {
    "slug": "rip",
    "term": "RIP",
    "fullForm": "Rest in Peace",
    "category": "General",
    "description": "Rest in Peace is a respectful expression commonly used when someone dies, expressing condolences and wishing peace for the deceased person. In India, this phrase appears on social media, in messages, and during obituaries when families announce deaths of loved ones. Students see RIP used when celebrities, public figures, or acquaintances pass away and people share tributes online. This abbreviation reflects the universal human desire to honor those who have died with respect and compassion.",
    "related": [
      "Death",
      "Sympathy",
      "Memorial"
    ]
  },
  {
    "slug": "faq",
    "term": "FAQ",
    "fullForm": "Frequently Asked Questions",
    "category": "General",
    "description": "A Frequently Asked Questions section is a page or document that lists common questions about a topic along with their answers, helping people quickly find information. Almost every website, app, and educational platform in India includes an FAQ page to help users solve problems without contacting customer support. Students writing research papers or creating projects often include FAQ sections to anticipate questions from readers. FAQs save time for both customers and organizations by providing instant answers to common concerns.",
    "related": [
      "Questions",
      "Information",
      "Help"
    ]
  },
  {
    "slug": "diy",
    "term": "DIY",
    "fullForm": "Do It Yourself",
    "category": "General",
    "description": "Do It Yourself refers to projects and tasks that people complete themselves rather than hiring professionals or buying finished products. DIY culture is growing in India through YouTube tutorials, online courses, and hobby communities where students learn to build furniture, repair electronics, or create art. DIY projects help students develop practical skills, save money, and gain confidence in solving problems independently. From home repairs to craft projects, DIY skills are increasingly valuable in modern life.",
    "related": [
      "Project",
      "Craft",
      "Self-reliance"
    ]
  },
  {
    "slug": "vip",
    "term": "VIP",
    "fullForm": "Very Important Person",
    "category": "General",
    "description": "A Very Important Person is someone who receives special treatment, priority access, or exclusive privileges due to their status, wealth, or importance. Indian students encounter VIP treatment at events, restaurants, or venues where certain guests receive special seating or services. The concept of VIP reflects social hierarchies and business practices where important clients or dignitaries receive priority. Understanding VIP culture helps students navigate social dynamics in business and professional settings.",
    "related": [
      "Important",
      "Status",
      "Priority"
    ]
  },
  {
    "slug": "sos",
    "term": "SOS",
    "fullForm": "Save Our Souls",
    "category": "General",
    "description": "Save Our Souls is an international distress signal used in emergencies when people need immediate help or rescue from dangerous situations. In maritime and aviation emergencies, SOS is transmitted via radio to alert rescue services and coordinate emergency response. Students learn about SOS in geography, history, and safety classes as a critical global emergency signal. While rarely used by individuals today due to modern emergency systems, SOS remains culturally significant as a symbol of urgent distress.",
    "related": [
      "Emergency",
      "Help",
      "Distress"
    ]
  },
  {
    "slug": "ifsc",
    "term": "IFSC",
    "fullForm": "Indian Financial System Code",
    "category": "Banking & Govt",
    "description": "The Indian Financial System Code is a unique identifier assigned by the Reserve Bank of India to every bank branch in the country for electronic fund transfers. Every Indian bank statement, check, or online transfer form displays an IFSC code identifying the specific branch handling the account. Students learning banking or managing their accounts must know their bank's IFSC code to receive money transfers from family or institutions. IFSC codes ensure that electronic transfers reach the correct branch and account holder accurately.",
    "related": [
      "Banking",
      "Code",
      "Transfer"
    ]
  },
  {
    "slug": "imei",
    "term": "IMEI",
    "fullForm": "International Mobile Equipment Identity",
    "category": "Computer & Tech",
    "description": "A unique 15-digit number that identifies your mobile phone globally. Every phone has one IMEI number printed on the back or found in settings. Used by telecom operators in India to track and block stolen phones. Important for phone theft recovery and warranty claims.",
    "related": [
      "SIM",
      "IMSI",
      "GSM"
    ]
  },
  {
    "slug": "otg",
    "term": "OTG",
    "fullForm": "On The Go",
    "category": "Computer & Tech",
    "description": "A feature that allows Android phones and tablets to act as a host for USB devices. OTG cables enable you to connect pen drives, keyboards, and mice directly to your mobile. Widely used in India for transferring files and extending phone functionality. Saves time when computers are not available.",
    "related": [
      "USB",
      "HDMI",
      "MicroSD"
    ]
  },
  {
    "slug": "nfc",
    "term": "NFC",
    "fullForm": "Near Field Communication",
    "category": "Computer & Tech",
    "description": "Wireless technology that allows devices to exchange data when held close together, usually within 4 inches. Used in contactless payments, smart cards, and RFID tags. Increasingly adopted in India for fast bill payments and transit cards. Makes transactions safer and faster without physical contact.",
    "related": [
      "RFID",
      "Bluetooth",
      "WiFi"
    ]
  },
  {
    "slug": "qr-code",
    "term": "QR",
    "fullForm": "Quick Response Code",
    "category": "Computer & Tech",
    "description": "A 2D barcode that stores information and can be scanned by a smartphone camera. QR codes are everywhere in India from UPI payments to restaurant menus. Scanning a QR code instantly takes you to a link, payment gateway, or digital menu. Essential for digital transformation in retail and services.",
    "related": [
      "NFC",
      "Barcode",
      "UPI"
    ]
  },
  {
    "slug": "cctv",
    "term": "CCTV",
    "fullForm": "Closed Circuit Television",
    "category": "Computer & Tech",
    "description": "Video surveillance system that records and monitors activity in a specific area. CCTV cameras are mandatory in schools, banks, and shopping malls across India. Footage can be reviewed for security incidents and is admissible as legal evidence. Critical for public safety and crime prevention.",
    "related": [
      "DVR",
      "IP Camera",
      "Night Vision"
    ]
  },
  {
    "slug": "gprs",
    "term": "GPRS",
    "fullForm": "General Packet Radio Service",
    "category": "Computer & Tech",
    "description": "An older mobile data technology that enabled data transfer on 2G networks. GPRS was the precursor to faster data speeds like 3G and 4G in India. Extremely slow by modern standards, typically 56 kilobits per second. Largely phased out but still available in remote areas with old networks.",
    "related": [
      "3G",
      "4G",
      "LTE"
    ]
  },
  {
    "slug": "lte",
    "term": "LTE",
    "fullForm": "Long Term Evolution",
    "category": "Computer & Tech",
    "description": "Fourth-generation wireless technology also known as 4G that provides high-speed internet. LTE is the standard for mobile data in India, offering 10-100 Mbps speeds. Launched by Jio, Airtel, and Vodafone across the country for smartphones and tablets. Essential for video streaming, online gaming, and cloud services.",
    "related": [
      "4G",
      "5G",
      "3G"
    ]
  },
  {
    "slug": "volte",
    "term": "VoLTE",
    "fullForm": "Voice over Long Term Evolution",
    "category": "Computer & Tech",
    "description": "Technology that transmits voice calls over 4G/LTE networks instead of traditional phone lines. VoLTE provides crystal-clear call quality and faster connection times in India. Supported by all major Indian telecom operators on compatible phones. Enables simultaneous voice calls and data usage.",
    "related": [
      "LTE",
      "WiFi Calling",
      "VoIP"
    ]
  },
  {
    "slug": "isp",
    "term": "ISP",
    "fullForm": "Internet Service Provider",
    "category": "Computer & Tech",
    "description": "A company that provides internet connectivity to homes and businesses. Major ISPs in India include Jio, Airtel, and BSNL offering broadband services. ISPs assign IP addresses and maintain the infrastructure for your internet connection. Speed and reliability vary by ISP and area.",
    "related": [
      "Broadband",
      "WiFi",
      "IP Address"
    ]
  },
  {
    "slug": "cdn",
    "term": "CDN",
    "fullForm": "Content Delivery Network",
    "category": "Computer & Tech",
    "description": "A network of servers distributed globally to deliver web content faster. CDNs cache videos and images in servers near Indian users for quick loading. Used by major websites like YouTube, Netflix, and news portals in India. Reduces load times and improves user experience significantly.",
    "related": [
      "Server",
      "Cache",
      "Bandwidth"
    ]
  },
  {
    "slug": "bios",
    "term": "BIOS",
    "fullForm": "Basic Input Output System",
    "category": "Computer & Tech",
    "description": "Firmware that runs before your operating system starts, controlling hardware initialization. BIOS is the first program that loads when you turn on a computer. Stores settings for boot order, CPU temperature, and RAM speed. Accessed by pressing Delete or F12 during startup on most computers.",
    "related": [
      "UEFI",
      "Firmware",
      "Boot"
    ]
  },
  {
    "slug": "smps",
    "term": "SMPS",
    "fullForm": "Switched Mode Power Supply",
    "category": "Computer & Tech",
    "description": "A device that converts AC electricity from the wall to DC power for your computer. SMPS units regulate voltage and protect computers from power surges in India. All desktop computers and servers use SMPS to safely distribute power. Failure of SMPS causes your entire system to shut down.",
    "related": [
      "UPS",
      "Voltage",
      "Power"
    ]
  },
  {
    "slug": "lcd",
    "term": "LCD",
    "fullForm": "Liquid Crystal Display",
    "category": "Computer & Tech",
    "description": "A type of flat-screen display technology used in monitors, TVs, and phones. LCDs are energy-efficient and offer good color accuracy at reasonable prices. Once the standard for computer monitors before LED and OLED. Still widely used in budget smartphones and older devices across India.",
    "related": [
      "LED",
      "OLED",
      "Display"
    ]
  },
  {
    "slug": "oled",
    "term": "OLED",
    "fullForm": "Organic Light Emitting Diode",
    "category": "Computer & Tech",
    "description": "An advanced display technology where each pixel produces its own light. OLED displays offer perfect blacks, infinite contrast, and vibrant colors in premium phones. More expensive than LCD but provide superior visual quality and thin form factors. Used in flagship smartphones and high-end TVs in India.",
    "related": [
      "LED",
      "LCD",
      "Display"
    ]
  },
  {
    "slug": "hdmi",
    "term": "HDMI",
    "fullForm": "High Definition Multimedia Interface",
    "category": "Computer & Tech",
    "description": "A cable and connector standard for transmitting audio and video between devices. HDMI connects laptops to projectors, TVs, and monitors for presentations and entertainment. Supports high-resolution video and surround sound in a single cable. Standard in schools, offices, and homes across India.",
    "related": [
      "VGA",
      "DisplayPort",
      "Cable"
    ]
  },
  {
    "slug": "vga",
    "term": "VGA",
    "fullForm": "Video Graphics Array",
    "category": "Computer & Tech",
    "description": "An older video connector standard used before HDMI became widespread. VGA ports connect monitors and projectors to computers using a 15-pin connector. Limited to lower resolutions compared to modern standards like HDMI. Still found on older monitors, projectors, and some desktop computers.",
    "related": [
      "HDMI",
      "DisplayPort",
      "Cable"
    ]
  },
  {
    "slug": "pcb",
    "term": "PCB",
    "fullForm": "Printed Circuit Board",
    "category": "Computer & Tech",
    "description": "A board with electronic circuits printed on it that forms the backbone of all electronic devices. PCBs are found in computers, phones, TVs, and every electronic appliance in India. Contain transistors, resistors, and capacitors that perform electrical functions. Manufacturing of PCBs is a major industry in Indian tech hubs.",
    "related": [
      "Chip",
      "Motherboard",
      "Resistor"
    ]
  },
  {
    "slug": "iot",
    "term": "IoT",
    "fullForm": "Internet of Things",
    "category": "Computer & Tech",
    "description": "Network of physical devices that collect and exchange data over the internet. IoT devices include smart home appliances, wearables, and industrial sensors. Growing rapidly in India with smart cities and connected home technologies. Enables automated monitoring and control of devices remotely.",
    "related": [
      "Sensor",
      "WiFi",
      "Connectivity"
    ]
  },
  {
    "slug": "ar",
    "term": "AR",
    "fullForm": "Augmented Reality",
    "category": "Computer & Tech",
    "description": "Technology that overlays digital content onto the real world through your phone or glasses. AR apps let students visualize 3D models of molecules, maps, and historical events. Used in games like Pokemon Go and shopping apps in India. Enhances learning and entertainment experiences.",
    "related": [
      "VR",
      "MR",
      "3D"
    ]
  },
  {
    "slug": "vr",
    "term": "VR",
    "fullForm": "Virtual Reality",
    "category": "Computer & Tech",
    "description": "Immersive technology that creates a completely virtual 3D environment using headsets. VR is used for training, gaming, and educational simulations in India. Students can explore historical sites, practice surgical procedures, and visit space. Provides hands-on learning without physical risks.",
    "related": [
      "AR",
      "MR",
      "3D"
    ]
  },
  {
    "slug": "saas",
    "term": "SaaS",
    "fullForm": "Software as a Service",
    "category": "Computer & Tech",
    "description": "Cloud-based software accessed through a web browser without installation. Google Workspace, Microsoft 365, and Zoom are popular SaaS apps in India. Eliminates need for expensive software licenses and maintenance. Automatic updates ensure users always have the latest features.",
    "related": [
      "Cloud",
      "PaaS",
      "IaaS"
    ]
  },
  {
    "slug": "b2b",
    "term": "B2B",
    "fullForm": "Business to Business",
    "category": "General",
    "description": "Commerce transactions between two businesses rather than between a business and consumer. B2B includes wholesale, manufacturing, and supply chain dealings. Major platforms in India like IndiaMART connect businesses for bulk orders. Often involves longer contracts and bulk discounts.",
    "related": [
      "B2C",
      "B2G",
      "Commerce"
    ]
  },
  {
    "slug": "b2c",
    "term": "B2C",
    "fullForm": "Business to Consumer",
    "category": "General",
    "description": "Direct sales of products or services from a business to individual customers. B2C includes retail stores, e-commerce sites, and service providers in India. Flipkart, Amazon India, and local shops all operate on B2C model. Focus on customer experience and brand building.",
    "related": [
      "B2B",
      "Retail",
      "Commerce"
    ]
  },
  {
    "slug": "cfo",
    "term": "CFO",
    "fullForm": "Chief Financial Officer",
    "category": "Banking & Govt",
    "description": "Executive responsible for managing the company's finances, accounting, and financial strategy. The CFO handles budgets, investments, and financial reporting in companies. Reports to the CEO and manages the finance team. Critical role in ensuring company profitability and regulatory compliance.",
    "related": [
      "CEO",
      "CTO",
      "Accountant"
    ]
  },
  {
    "slug": "cto",
    "term": "CTO",
    "fullForm": "Chief Technology Officer",
    "category": "Computer & Tech",
    "description": "Senior executive who oversees all technology strategy and IT operations in a company. The CTO ensures the company uses modern technology and stays competitive. Reports to the CEO and leads the tech team in Indian tech companies. Responsible for cybersecurity, infrastructure, and digital innovation.",
    "related": [
      "CEO",
      "CFO",
      "IT"
    ]
  },
  {
    "slug": "coo",
    "term": "COO",
    "fullForm": "Chief Operating Officer",
    "category": "General",
    "description": "Executive responsible for the day-to-day operations of the company. The COO manages efficiency, production, and operational goals. Reports to the CEO and oversees departments like production and logistics. Ensures smooth workflow and timely delivery of products/services.",
    "related": [
      "CEO",
      "CFO",
      "Manager"
    ]
  },
  {
    "slug": "kpi",
    "term": "KPI",
    "fullForm": "Key Performance Indicator",
    "category": "General",
    "description": "Measurable values that show how effectively an organization achieves business objectives. KPIs track sales targets, customer satisfaction, and productivity in companies. Used to evaluate employee performance and set goals in Indian corporations. Common KPIs include revenue, customer acquisition, and retention rates.",
    "related": [
      "Metric",
      "Goal",
      "Performance"
    ]
  },
  {
    "slug": "cv",
    "term": "CV",
    "fullForm": "Curriculum Vitae",
    "category": "Education & Exams",
    "description": "A detailed document of your education, skills, work experience, and achievements. CVs are required for job applications and university admissions in India. Longer and more detailed than a resume, covering full academic and professional history. Essential for competitive job searches in Indian market.",
    "related": [
      "Resume",
      "Application",
      "Job"
    ]
  },
  {
    "slug": "pio",
    "term": "PIO",
    "fullForm": "Person of Indian Origin",
    "category": "Govt",
    "description": "A status for individuals who are not Indian citizens but have Indian ancestry. PIO was largely replaced by OCI but may still be referenced for older designations. Granted visa validity up to 15 years for multiple entries. Benefits include property ownership and business opportunities in India.",
    "related": [
      "NRI",
      "OCI",
      "Citizenship"
    ]
  },
  {
    "slug": "ist",
    "term": "IST",
    "fullForm": "Indian Standard Time",
    "category": "General",
    "description": "The official time zone of India, UTC plus 5 hours and 30 minutes. IST is used across all of India regardless of east-west location. Coordinated nationally to ensure uniform business and transport schedules. Important for international meetings and scheduling with other countries.",
    "related": [
      "UTC",
      "GMT",
      "Time Zone"
    ]
  },
  {
    "slug": "gmt",
    "term": "GMT",
    "fullForm": "Greenwich Mean Time",
    "category": "General",
    "description": "The mean solar time at the Prime Meridian in Greenwich, London, used as reference. GMT is the basis for calculating time zones worldwide. India is GMT plus 5:30, making IST one of the non-standard time zones. Used in aviation, military, and international communications.",
    "related": [
      "UTC",
      "IST",
      "Time Zone"
    ]
  },
  {
    "slug": "utc",
    "term": "UTC",
    "fullForm": "Coordinated Universal Time",
    "category": "General",
    "description": "The primary time standard used for regulation of clocks and time worldwide. UTC is based on atomic time and is more precise than GMT. India runs on IST, which is UTC plus 5 hours 30 minutes. Used in all computer systems, aviation, and global communications.",
    "related": [
      "GMT",
      "IST",
      "Time Zone"
    ]
  },
  {
    "slug": "bc",
    "term": "BC",
    "fullForm": "Before Christ",
    "category": "Science",
    "description": "A dating system used to denote years before the birth of Jesus Christ. BC dates go backwards, so 100 BC is earlier than 50 BC. Used in history, archaeology, and religion. History textbooks in India use AD and BC for dating historical events.",
    "related": [
      "AD",
      "CE",
      "History"
    ]
  },
  {
    "slug": "ad",
    "term": "AD",
    "fullForm": "Anno Domini",
    "category": "Science",
    "description": "Latin phrase meaning in the year of the Lord, used after the birth of Christ. AD dates increase forward, so AD 100 is more recent than AD 50. Standard dating system used globally and in Indian textbooks. Also called Common Era when written as CE.",
    "related": [
      "BC",
      "CE",
      "History"
    ]
  },
  {
    "slug": "ce",
    "term": "CE",
    "fullForm": "Common Era",
    "category": "Science",
    "description": "Modern term for AD, denoting years after the birth of Jesus Christ. CE is increasingly preferred over AD in academic and historical contexts. More secular and religiously neutral than Anno Domini. Indian history textbooks increasingly use CE instead of AD.",
    "related": [
      "BC",
      "AD",
      "History"
    ]
  },
  {
    "slug": "eta",
    "term": "ETA",
    "fullForm": "Estimated Time of Arrival",
    "category": "General",
    "description": "A prediction of when someone or something will arrive at a destination. ETA is shown in GPS apps, delivery services, and flight information in India. More accurate with real-time traffic data in major cities. Helps plan schedules and manage expectations.",
    "related": [
      "Time",
      "Arrival",
      "Delivery"
    ]
  },
  {
    "slug": "dob",
    "term": "DOB",
    "fullForm": "Date of Birth",
    "category": "General",
    "description": "The day, month, and year when a person was born. DOB is required on government documents, school forms, and loan applications in India. Determines age, zodiac sign, and eligibility for various programs. Critical information for identity verification.",
    "related": [
      "Age",
      "Identity",
      "Certificate"
    ]
  },
  {
    "slug": "cibil",
    "term": "CIBIL",
    "fullForm": "Credit Information Bureau India Limited",
    "category": "Banking & Govt",
    "description": "India's premier credit information company that maintains credit histories and scores. CIBIL score ranges from 300 to 900 and impacts loan approval and interest rates. Banks check your CIBIL score before approving home loans, car loans, and credit cards. Higher score means better chances of loan approval at lower rates.",
    "related": [
      "Credit Score",
      "Loan",
      "Banking"
    ]
  },
  {
    "slug": "itr",
    "term": "ITR",
    "fullForm": "Income Tax Return",
    "category": "Banking & Govt",
    "description": "A document filed annually with the Income Tax Department declaring income and taxes paid. ITR filing is mandatory for all individuals earning income above the taxable limit. Filed using the e-filing portal before the deadline each financial year. Essential for getting refunds and maintaining tax compliance.",
    "related": [
      "Tax",
      "Income",
      "Finance"
    ]
  },
  {
    "slug": "epf",
    "term": "EPF",
    "fullForm": "Employees Provident Fund",
    "category": "Banking & Govt",
    "description": "A government pension and retirement savings scheme for private sector employees in India. Employer and employee both contribute monthly amounts to the EPF account. Money can be withdrawn after retirement or in case of emergency. Managed by the Employees Provident Fund Organization.",
    "related": [
      "PPF",
      "Pension",
      "Retirement"
    ]
  },
  {
    "slug": "ppf",
    "term": "PPF",
    "fullForm": "Public Provident Fund",
    "category": "Banking & Govt",
    "description": "A long-term government savings scheme for individuals to build retirement corpus. PPF offers tax-free interest and can be opened at any bank or post office in India. Investment limit is up to 1.5 lakh per financial year. Returns are guaranteed and higher than regular savings accounts.",
    "related": [
      "EPF",
      "Savings",
      "Retirement"
    ]
  },
  {
    "slug": "nps",
    "term": "NPS",
    "fullForm": "National Pension Scheme",
    "category": "Banking & Govt",
    "description": "A voluntary government-sponsored retirement savings scheme offering tax benefits. NPS allows individuals to build pension corpus through systematic investments. Available for government employees and general public across India. Provides fixed income after retirement and tax deductions during working years.",
    "related": [
      "EPF",
      "PPF",
      "Pension"
    ]
  },
  {
    "slug": "sip",
    "term": "SIP",
    "fullForm": "Systematic Investment Plan",
    "category": "Banking & Govt",
    "description": "A method of investing fixed amounts regularly in mutual funds at fixed intervals. SIP reduces the impact of market volatility through rupee cost averaging. Popular way for beginners to start investing in stocks in India. Monthly investments as low as 500 rupees possible through SIP.",
    "related": [
      "Mutual Fund",
      "Investment",
      "Stock"
    ]
  },
  {
    "slug": "nav",
    "term": "NAV",
    "fullForm": "Net Asset Value",
    "category": "Banking & Govt",
    "description": "The per-unit price of a mutual fund calculated daily by the fund house. NAV is the total fund value divided by number of units outstanding. Determines how much you gain or lose on your mutual fund investment. Changes daily based on stock market performance.",
    "related": [
      "Mutual Fund",
      "Stock",
      "Investment"
    ]
  },
  {
    "slug": "ipo",
    "term": "IPO",
    "fullForm": "Initial Public Offering",
    "category": "Banking & Govt",
    "description": "The process by which a private company offers shares to the public for the first time. IPO allows companies to raise capital and become publicly traded on stock exchanges. Major IPOs in India by companies like Reliance, TCS, and others attract huge interest. Investors can buy shares at IPO price before listing on stock exchange.",
    "related": [
      "Stock",
      "Share",
      "Exchange"
    ]
  },
  {
    "slug": "gnp",
    "term": "GNP",
    "fullForm": "Gross National Product",
    "category": "Banking & Govt",
    "description": "Total value of goods and services produced by a country's citizens anywhere in the world. GNP includes income from Indian citizens and companies working abroad. Slightly different from GDP as it counts income by nationality rather than location. Measures national wealth and economic capacity.",
    "related": [
      "GDP",
      "Economy",
      "Finance"
    ]
  },
  {
    "slug": "fii",
    "term": "FII",
    "fullForm": "Foreign Institutional Investor",
    "category": "Banking & Govt",
    "description": "Foreign investment funds, pension funds, and institutions buying Indian stocks and bonds. FII flows affect Indian stock market volatility and rupee value. Registered with SEBI to invest in Indian capital markets. Major contributors to liquidity in Indian financial markets.",
    "related": [
      "FDI",
      "Stock",
      "Investment"
    ]
  },
  {
    "slug": "irdai",
    "term": "IRDAI",
    "fullForm": "Insurance Regulatory and Development Authority of India",
    "category": "Banking & Govt",
    "description": "India's independent regulator for insurance industry, protecting policyholders' interests. IRDAI issues licenses to insurance companies and approves insurance products. Sets guidelines for premiums, claims, and customer service. Ensures transparency and fair practices in insurance sector.",
    "related": [
      "Insurance",
      "Policy",
      "Regulation"
    ]
  },
  {
    "slug": "trai",
    "term": "TRAI",
    "fullForm": "Telecom Regulatory Authority of India",
    "category": "Banking & Govt",
    "description": "India's independent regulator for telecommunications, overseeing telecom operators. TRAI sets mobile tariffs, data rates, and service quality standards. Issues licenses to telecom operators like Jio, Airtel, and Vodafone. Protects consumer interests and promotes competition.",
    "related": [
      "Telecom",
      "Mobile",
      "Regulation"
    ]
  },
  {
    "slug": "isro",
    "term": "ISRO",
    "fullForm": "Indian Space Research Organisation",
    "category": "Science",
    "description": "India's national space agency responsible for space exploration and satellite development. ISRO launched Chandrayaan lunar missions and Mangalyaan Mars mission. Develops India's space launch vehicles like PSLV and GSLV. Leading space research organization in Asia.",
    "related": [
      "Space",
      "Satellite",
      "NASA"
    ]
  },
  {
    "slug": "drdo",
    "term": "DRDO",
    "fullForm": "Defence Research and Development Organisation",
    "category": "Science",
    "description": "India's defense research organization developing military technology and weapons systems. DRDO designs missiles, aircraft, and advanced defense equipment for Indian armed forces. Employs thousands of scientists and engineers across India. Strengthens India's defense capabilities and self-reliance.",
    "related": [
      "Defense",
      "Military",
      "Technology"
    ]
  },
  {
    "slug": "barc",
    "term": "BARC",
    "fullForm": "Bhabha Atomic Research Centre",
    "category": "Science",
    "description": "India's premier nuclear research institution developing nuclear technology and reactors. BARC conducts research in nuclear physics, reactor design, and nuclear medicine. Located in Mumbai and operates India's first nuclear research reactor. Contributes to India's peaceful uses of atomic energy.",
    "related": [
      "Nuclear",
      "Energy",
      "Science"
    ]
  },
  {
    "slug": "csir",
    "term": "CSIR",
    "fullForm": "Council of Scientific and Industrial Research",
    "category": "Science",
    "description": "India's largest scientific research organization with a network of laboratories nationwide. CSIR conducts research in chemistry, metallurgy, telecommunications, and earth sciences. Develops technologies and patents for industrial applications. Contributes to scientific advancement across India.",
    "related": [
      "Research",
      "Science",
      "Laboratory"
    ]
  },
  {
    "slug": "icmr",
    "term": "ICMR",
    "fullForm": "Indian Council of Medical Research",
    "category": "Medical",
    "description": "India's apex medical research body responsible for biomedical and health research. ICMR conducts clinical trials and develops treatment guidelines for diseases. Recently led India's COVID-19 research and vaccine development efforts. Improves healthcare outcomes across the country.",
    "related": [
      "Medical",
      "Research",
      "Health"
    ]
  },
  {
    "slug": "esi",
    "term": "ESI",
    "fullForm": "Employees State Insurance",
    "category": "Medical",
    "description": "Social security and health insurance scheme for Indian workers and their dependents. ESI covers medical and cash benefits during sickness, disability, and employment injury. Mandatory for factories with 10 or more workers in India. Provides free treatment at ESI hospitals.",
    "related": [
      "Insurance",
      "Health",
      "Workers"
    ]
  },
  {
    "slug": "pds",
    "term": "PDS",
    "fullForm": "Public Distribution System",
    "category": "Banking & Govt",
    "description": "Government program distributing subsidized food grains and essentials to poor families. PDS uses ration cards to provide rice, wheat, oil, and sugar at fixed prices. Reaches over 800 million people across India with affordable food. Critical for food security and reducing poverty.",
    "related": [
      "Ration Card",
      "Food",
      "Government"
    ]
  },
  {
    "slug": "mgnrega",
    "term": "MGNREGA",
    "fullForm": "Mahatma Gandhi National Rural Employment Guarantee Act",
    "category": "Banking & Govt",
    "description": "Government scheme guaranteeing 100 days of wage employment annually to rural workers. MGNREGA creates rural infrastructure while providing income to marginalized people. Largest employment guarantee program in the world implemented in India. Reduces rural poverty and unemployment.",
    "related": [
      "Employment",
      "Rural",
      "Government"
    ]
  },
  {
    "slug": "ugc-grants-commission",
    "term": "UGC",
    "fullForm": "University Grants Commission",
    "category": "Education",
    "description": "UGC is the main government body that regulates and funds universities across India. It sets academic standards, recognises degrees, and provides grants to higher education institutions. Every Indian university must follow UGC guidelines for accreditation and course approval.",
    "related": [
      "AICTE",
      "NIRF",
      "MHRD"
    ]
  },
  {
    "slug": "aicte-council",
    "term": "AICTE",
    "fullForm": "All India Council for Technical Education",
    "category": "Education",
    "description": "AICTE is the apex body for technical education in India, overseeing engineering colleges, polytechnics, and management institutes. It approves new programs, sets curriculum standards, and ensures quality in technical institutions. Most engineering colleges in India must get AICTE approval to operate.",
    "related": [
      "UGC",
      "NIRF",
      "NBA"
    ]
  },
  {
    "slug": "nirf-ranking",
    "term": "NIRF",
    "fullForm": "National Institutional Ranking Framework",
    "category": "Education",
    "description": "NIRF is India's official ranking system that compares universities and colleges based on teaching, research, placement, and infrastructure. It helps students choose quality institutions and ranks institutions across overall, engineering, management, and medical categories. NIRF rankings are released annually by the Ministry of Education.",
    "related": [
      "UGC",
      "AICTE",
      "QS"
    ]
  },
  {
    "slug": "nta-testing-agency",
    "term": "NTA",
    "fullForm": "National Testing Agency",
    "category": "Education",
    "description": "NTA is the autonomous body that conducts major national-level entrance exams in India, including JEE Main, NEET, CUET, and UGC NET. It designs question papers, conducts tests, and releases results for millions of students. NTA ensures fairness and transparency in competitive exams.",
    "related": [
      "JEE",
      "NEET",
      "CUET",
      "UGC"
    ]
  },
  {
    "slug": "kvpy-scholarship",
    "term": "KVPY",
    "fullForm": "Kishore Vaigyanik Protsahan Yojana",
    "category": "Education",
    "description": "KVPY is a prestigious scholarship program by the Department of Science and Technology for talented students in science streams at 10+2, bachelor's, and master's levels. It encourages students to pursue research careers in science and provides a monthly fellowship and research grant. KVPY is one of the most competitive scholarships in India.",
    "related": [
      "NTA",
      "DST",
      "Research"
    ]
  },
  {
    "slug": "nda-defense",
    "term": "NDA",
    "fullForm": "National Defence Academy",
    "category": "Education",
    "description": "NDA is India's premier military training academy where officer cadets from the army, navy, and air force are trained. The Union Public Service Commission conducts the NDA entrance exam annually for Class 12 passed students. Passing NDA leads to a commission as an officer in the Indian armed forces.",
    "related": [
      "UPSC",
      "CDS",
      "Armed Forces"
    ]
  },
  {
    "slug": "cds-exam",
    "term": "CDS",
    "fullForm": "Combined Defence Services",
    "category": "Education",
    "description": "CDS is a recruitment exam for officers in the Indian Army, Navy, and Air Force, conducted twice yearly by UPSC. Candidates must be graduates and physically fit to appear for the exam. CDS prepares candidates to become commissioned officers through the Officers Training Academy.",
    "related": [
      "NDA",
      "UPSC",
      "Armed Forces"
    ]
  },
  {
    "slug": "clat-law",
    "term": "CLAT",
    "fullForm": "Common Law Admission Test",
    "category": "Education",
    "description": "CLAT is a national-level entrance exam for admission to top law schools in India like NLSIU, NALSAR, and others. It tests logical reasoning, reading comprehension, and legal awareness. CLAT score determines admission to 5-year integrated law courses and 2-year LLM programs.",
    "related": [
      "NTA",
      "Legal Education",
      "Law Schools"
    ]
  },
  {
    "slug": "cuet-entrance",
    "term": "CUET",
    "fullForm": "Common University Entrance Test",
    "category": "Education",
    "description": "CUET is a national-level test conducted by NTA for admission to undergraduate and postgraduate programs in central universities and some private universities. It replaced individual entrance exams and covers 1000+ programs across 45+ universities. CUET ensures standardized and fair selection across Indian universities.",
    "related": [
      "NTA",
      "University Admission",
      "UGC"
    ]
  },
  {
    "slug": "gate-engineering",
    "term": "GATE",
    "fullForm": "Graduate Aptitude Test in Engineering",
    "category": "Education",
    "description": "GATE is a national exam for engineers and science graduates seeking admission to postgraduate programs and jobs in PSUs. Conducted jointly by IIT and IISC, GATE tests conceptual knowledge and problem-solving skills in engineering disciplines. A good GATE score opens doors to top M.Tech colleges and prestigious government jobs.",
    "related": [
      "IIT",
      "IISC",
      "PSU",
      "M.Tech"
    ]
  },
  {
    "slug": "upsc-civil-services",
    "term": "UPSC",
    "fullForm": "Union Public Service Commission",
    "category": "Education",
    "description": "UPSC is India's premier recruitment body that conducts the Civil Services Exam (IAS, IPS, IFS), CDS, NDA, and other national-level exams for government jobs. It selects officers for the Indian Administrative Service, Indian Police Service, and Indian Foreign Service. UPSC maintains high standards and fairness in recruitment across India.",
    "related": [
      "IAS",
      "IPS",
      "IFS",
      "Government Jobs"
    ]
  },
  {
    "slug": "ssc-commission",
    "term": "SSC",
    "fullForm": "Staff Selection Commission",
    "category": "Education",
    "description": "SSC is a government agency that recruits staff for various ministries and departments across India. It conducts multiple exams like SSC CGL, CHSL, MTS, and CPO for millions of aspirants annually. SSC jobs offer stable careers, good pay, and pension benefits in government service.",
    "related": [
      "Government Jobs",
      "CGL",
      "CHSL"
    ]
  },
  {
    "slug": "tet-teacher",
    "term": "TET",
    "fullForm": "Teacher Eligibility Test",
    "category": "Education",
    "description": "TET is a mandatory qualification exam for teachers in primary and secondary schools across India. States conduct their own state TET exams, while CTET is the central test conducted by CBSE. Teachers must pass TET to be eligible for teaching positions in government and some private schools.",
    "related": [
      "CTET",
      "CBSE",
      "Education"
    ]
  },
  {
    "slug": "rte-education",
    "term": "RTE",
    "fullForm": "Right to Free and Compulsory Education",
    "category": "Education",
    "description": "RTE is an Indian law that makes education a fundamental right for all children aged 6-14 years. It mandates free and compulsory education, ensures teacher quality through TET, and requires schools to maintain infrastructure standards. RTE has significantly increased school enrollment and literacy across India.",
    "related": [
      "TET",
      "CBSE",
      "Education Policy"
    ]
  },
  {
    "slug": "scert-education",
    "term": "SCERT",
    "fullForm": "State Council of Educational Research and Training",
    "category": "Education",
    "description": "SCERT is the state-level educational body that develops curriculum, trains teachers, and conducts research in education within each state. It works under the Department of Education and ensures educational quality aligns with national standards. SCERT textbooks form the basis of school education in each state.",
    "related": [
      "NCERT",
      "TET",
      "State Education"
    ]
  },
  {
    "slug": "diet-teacher-training",
    "term": "DIET",
    "fullForm": "District Institute of Education and Training",
    "category": "Education",
    "description": "DIET is a district-level institution that trains primary teachers and conducts in-service programs for existing teachers. Each district has a DIET that works under SCERT and ensures teacher quality at the grassroots level. DIET plays a crucial role in improving school education standards in rural and urban areas.",
    "related": [
      "SCERT",
      "TET",
      "Teacher Training"
    ]
  },
  {
    "slug": "gpu-graphics",
    "term": "GPU",
    "fullForm": "Graphics Processing Unit",
    "category": "Computer",
    "description": "GPU is a specialized processor designed to handle graphics and parallel computations much faster than a regular CPU. Originally used for rendering video games and graphics, GPUs are now essential for artificial intelligence, machine learning, and cryptocurrency mining. High-end GPUs like NVIDIA GeForce and RTX are used in gaming and AI research.",
    "related": [
      "CPU",
      "AI",
      "Computing"
    ]
  },
  {
    "slug": "ssd-storage",
    "term": "SSD",
    "fullForm": "Solid State Drive",
    "category": "Computer",
    "description": "SSD is a storage device with no moving parts that uses flash memory to store data, making it much faster and more reliable than hard disk drives (HDD). SSDs have no spinning platters, so they boot faster, load files quicker, and are less prone to damage. Most modern laptops and computers use SSDs as the primary storage.",
    "related": [
      "HDD",
      "Storage",
      "RAM"
    ]
  },
  {
    "slug": "hdd-hard-disk",
    "term": "HDD",
    "fullForm": "Hard Disk Drive",
    "category": "Computer",
    "description": "HDD is a traditional storage device that uses spinning magnetic platters to read and write data. While slower than SSDs, HDDs offer large storage capacity at a lower cost, making them ideal for backup and archival storage. Many people still use external HDDs for backing up photos, videos, and files.",
    "related": [
      "SSD",
      "Storage",
      "Backup"
    ]
  },
  {
    "slug": "usb-universal",
    "term": "USB",
    "fullForm": "Universal Serial Bus",
    "category": "Computer",
    "description": "USB is the standard connection standard that allows devices to communicate and share power. You use USB when plugging in phone chargers, mouse, keyboard, USB drives, and external hard drives to computers. USB has evolved through versions USB 2.0, 3.0, 3.1, and USB-C, each offering faster speeds and better power delivery.",
    "related": [
      "Computer",
      "Connector",
      "Data Transfer"
    ]
  },
  {
    "slug": "lan-network",
    "term": "LAN",
    "fullForm": "Local Area Network",
    "category": "Computer",
    "description": "LAN is a network connecting computers and devices in a limited geographic area like a home, school, or office building. Your home WiFi network or the office network where computers share printers and files is a LAN. LAN is much faster than the internet and allows direct sharing of resources.",
    "related": [
      "WAN",
      "WiFi",
      "Network"
    ]
  },
  {
    "slug": "wan-wide-network",
    "term": "WAN",
    "fullForm": "Wide Area Network",
    "category": "Computer",
    "description": "WAN is a network spanning large geographic areas, connecting multiple LANs across cities, states, or countries. The Internet is the biggest WAN, connecting billions of devices worldwide. Banks use private WANs to connect branch offices, and companies use WANs to link offices in different cities.",
    "related": [
      "LAN",
      "Internet",
      "Network"
    ]
  },
  {
    "slug": "vpn-privacy",
    "term": "VPN",
    "fullForm": "Virtual Private Network",
    "category": "Computer",
    "description": "VPN is a service that encrypts your internet connection and hides your IP address, allowing you to browse anonymously and securely. VPNs protect your data from hackers on public WiFi and let you access content blocked in your region. However, you must trust your VPN provider as they can see your traffic.",
    "related": [
      "Encryption",
      "Internet Security",
      "DNS"
    ]
  },
  {
    "slug": "dns-domain",
    "term": "DNS",
    "fullForm": "Domain Name System",
    "category": "Computer",
    "description": "DNS is like the phone book of the internet that translates website names (like google.com) into IP addresses that computers understand. When you type a website address, DNS servers look up and return the corresponding IP address so your browser can connect. Without DNS, you would have to memorize IP addresses instead of domain names.",
    "related": [
      "IP Address",
      "Internet",
      "Web"
    ]
  },
  {
    "slug": "ftp-file-transfer",
    "term": "FTP",
    "fullForm": "File Transfer Protocol",
    "category": "Computer",
    "description": "FTP is an older internet protocol used to upload and download files between computers and servers. Developers use FTP to upload website files to web servers, and it was widely used before cloud services. SFTP is the secure version of FTP that encrypts the data during transfer.",
    "related": [
      "SFTP",
      "Protocol",
      "File Transfer"
    ]
  },
  {
    "slug": "smtp-mail-sending",
    "term": "SMTP",
    "fullForm": "Simple Mail Transfer Protocol",
    "category": "Computer",
    "description": "SMTP is the protocol your email client uses to send emails to the mail server. When you click send on Gmail or Outlook, SMTP takes your email and delivers it to the recipient's mail server. SMTP works with IMAP or POP3 protocols which retrieve incoming emails.",
    "related": [
      "IMAP",
      "POP3",
      "Email"
    ]
  },
  {
    "slug": "imap-mail-retrieval",
    "term": "IMAP",
    "fullForm": "Internet Message Access Protocol",
    "category": "Computer",
    "description": "IMAP is the protocol that retrieves emails from the mail server and displays them in your email client like Gmail or Outlook. Unlike POP3 which downloads emails, IMAP keeps them on the server so you can access the same emails from multiple devices. IMAP is better for users with many devices.",
    "related": [
      "POP3",
      "SMTP",
      "Email"
    ]
  },
  {
    "slug": "otp-password",
    "term": "OTP",
    "fullForm": "One-Time Password",
    "category": "Computer",
    "description": "OTP is a temporary security code sent to your phone or email to verify your identity during login. Each OTP is valid for only one use and expires after a few minutes, making it much more secure than static passwords. Banks, Google, and social media use OTP for two-factor authentication.",
    "related": [
      "Two-Factor Authentication",
      "Security",
      "Password"
    ]
  },
  {
    "slug": "ai-artificial-intelligence",
    "term": "AI",
    "fullForm": "Artificial Intelligence",
    "category": "Computer",
    "description": "AI refers to computer systems designed to perform tasks that normally require human intelligence, such as learning from experience, recognizing patterns, and making decisions. AI powers voice assistants like Alexa, recommendation systems on Netflix, and chatbots like ChatGPT. AI is rapidly transforming industries and is becoming central to modern technology.",
    "related": [
      "ML",
      "Machine Learning",
      "Neural Networks"
    ]
  },
  {
    "slug": "ml-machine-learning",
    "term": "ML",
    "fullForm": "Machine Learning",
    "category": "Computer",
    "description": "Machine Learning is a branch of AI where computers learn from data and improve their performance without being explicitly programmed. ML algorithms find patterns in data and make predictions or decisions based on those patterns. Spam filters, recommendation algorithms, and medical diagnosis systems all use ML.",
    "related": [
      "AI",
      "Data Science",
      "Deep Learning"
    ]
  },
  {
    "slug": "iot-internet-things",
    "term": "IoT",
    "fullForm": "Internet of Things",
    "category": "Computer",
    "description": "IoT refers to physical devices embedded with sensors and internet connectivity that collect and share data with each other. Smart home devices like thermostats, fitness trackers, and industrial sensors are IoT devices. IoT enables real-time monitoring and automation, improving efficiency in homes, factories, and cities.",
    "related": [
      "Smart Device",
      "Sensor",
      "Connectivity"
    ]
  },
  {
    "slug": "os-operating-system",
    "term": "OS",
    "fullForm": "Operating System",
    "category": "Computer",
    "description": "Operating System is the core software that manages hardware and allows you to run programs. Windows, macOS, Linux, Android, and iOS are popular operating systems. The OS handles memory, files, devices, and user interface, acting as the bridge between you and the computer hardware.",
    "related": [
      "Software",
      "Windows",
      "Linux"
    ]
  },
  {
    "slug": "gui-graphical-interface",
    "term": "GUI",
    "fullForm": "Graphical User Interface",
    "category": "Computer",
    "description": "GUI is the visual interface that lets you interact with computers using icons, buttons, and windows instead of typing commands. Windows, macOS, and Linux all have GUIs that make computers user-friendly. Without GUIs, users would need to memorize complex text commands.",
    "related": [
      "User Interface",
      "OS",
      "Software"
    ]
  },
  {
    "slug": "bios-system-firmware",
    "term": "BIOS",
    "fullForm": "Basic Input Output System",
    "category": "Computer",
    "description": "BIOS is the firmware that runs when your computer starts, before the operating system loads. It initializes hardware, checks for errors, and boots the OS. UEFI is the modern replacement for BIOS with better security and features. You access BIOS during startup by pressing Delete or F2 keys.",
    "related": [
      "Firmware",
      "UEFI",
      "OS"
    ]
  },
  {
    "slug": "ascii-character-code",
    "term": "ASCII",
    "fullForm": "American Standard Code for Information Interchange",
    "category": "Computer",
    "description": "ASCII is a standard code that assigns numbers to letters, digits, and symbols so computers can store and process text. Each character has a unique number (A=65, a=97, space=32). ASCII uses 7 or 8 bits per character and is the foundation of how computers represent text internally.",
    "related": [
      "Unicode",
      "Character Encoding",
      "Binary"
    ]
  },
  {
    "slug": "gif-image-format",
    "term": "GIF",
    "fullForm": "Graphics Interchange Format",
    "category": "Computer",
    "description": "GIF is an image format that supports 256 colors and can store animated sequences, making it perfect for simple animations and memes. Unlike JPEG, GIF uses lossless compression so it's suitable for images with limited colors like logos and diagrams. GIFs are widely used online for animations and humorous clips.",
    "related": [
      "JPEG",
      "PNG",
      "Image Format"
    ]
  },
  {
    "slug": "jpeg-image-compression",
    "term": "JPEG",
    "fullForm": "Joint Photographic Experts Group",
    "category": "Computer",
    "description": "JPEG is a widely used image format that compresses photos to reduce file size while maintaining reasonable quality. It's ideal for photographs and complex images with many colors. Most digital cameras save photos as JPEG, and it's the standard format for web images.",
    "related": [
      "PNG",
      "GIF",
      "Image Format"
    ]
  },
  {
    "slug": "mp3-audio-format",
    "term": "MP3",
    "fullForm": "MPEG-1 Audio Layer III",
    "category": "Computer",
    "description": "MP3 is the most popular audio format that compresses music files to a fraction of their original size while maintaining acceptable quality. MP3's lossy compression removes audio frequencies that humans can't hear, making files small enough to download and stream. MP3 revolutionized music distribution before streaming services.",
    "related": [
      "Audio Format",
      "Compression",
      "AAC"
    ]
  },
  {
    "slug": "mp4-video-format",
    "term": "MP4",
    "fullForm": "MPEG-4 Part 14",
    "category": "Computer",
    "description": "MP4 is the most widely used video format that efficiently compresses video while maintaining good quality. It supports both video and audio, making it ideal for movies, YouTube videos, and social media. Most devices and players support MP4, making it the standard for video sharing online.",
    "related": [
      "Video Format",
      "AVI",
      "MKV"
    ]
  },
  {
    "slug": "html-markup-language",
    "term": "HTML",
    "fullForm": "Hypertext Markup Language",
    "category": "Computer",
    "description": "HTML is the standard markup language used to create web pages. It uses tags like <h1>, <p>, <img> to structure content on websites. Browsers interpret HTML and display it as web pages. HTML forms the foundation of all websites and works alongside CSS for styling and JavaScript for interactivity.",
    "related": [
      "CSS",
      "JavaScript",
      "Web"
    ]
  },
  {
    "slug": "css-styling-language",
    "term": "CSS",
    "fullForm": "Cascading Style Sheets",
    "category": "Computer",
    "description": "CSS is the language used to style and layout web pages created with HTML. It controls colors, fonts, spacing, and responsive design. CSS separates design from content, making websites easier to maintain and update. Modern CSS includes features like flexbox and grid for complex layouts.",
    "related": [
      "HTML",
      "JavaScript",
      "Web Design"
    ]
  },
  {
    "slug": "sql-query-language",
    "term": "SQL",
    "fullForm": "Structured Query Language",
    "category": "Computer",
    "description": "SQL is the standard language for managing and querying databases. It allows you to create, read, update, and delete data from databases using commands like SELECT, INSERT, UPDATE, and DELETE. SQL is used by almost every organization to manage their data and is essential for backend development.",
    "related": [
      "Database",
      "MySQL",
      "PostgreSQL"
    ]
  },
  {
    "slug": "api-interface",
    "term": "API",
    "fullForm": "Application Programming Interface",
    "category": "Computer",
    "description": "API is a set of protocols and tools that allows different software applications to communicate with each other. APIs define the requests and responses that applications can send, enabling integration between services. Google Maps API, weather APIs, and payment APIs are examples of public APIs developers use.",
    "related": [
      "REST",
      "JSON",
      "Web Services"
    ]
  },
  {
    "slug": "sdk-development-kit",
    "term": "SDK",
    "fullForm": "Software Development Kit",
    "category": "Computer",
    "description": "SDK is a collection of tools, libraries, and code examples that developers use to build applications for a specific platform or service. Android SDK, iOS SDK, and AWS SDK are examples. SDKs simplify development by providing pre-built functions and documentation.",
    "related": [
      "API",
      "Framework",
      "Library"
    ]
  },
  {
    "slug": "dna-molecule",
    "term": "DNA",
    "fullForm": "Deoxyribonucleic Acid",
    "category": "Science",
    "description": "DNA is the molecule that carries genetic instructions for all living organisms. It contains genes made of four bases (A, T, G, C) arranged in a double helix structure. DNA determines your traits, is passed from parents to children, and contains the blueprint for creating proteins in your body.",
    "related": [
      "RNA",
      "Genetics",
      "Protein"
    ]
  },
  {
    "slug": "rna-acid",
    "term": "RNA",
    "fullForm": "Ribonucleic Acid",
    "category": "Science",
    "description": "RNA is similar to DNA but with single strands and uracil instead of thymine. RNA acts as a messenger, carrying genetic instructions from DNA to create proteins. There are three types: mRNA (messenger), rRNA (ribosomal), and tRNA (transfer), each with different functions in protein synthesis.",
    "related": [
      "DNA",
      "Protein Synthesis",
      "mRNA"
    ]
  },
  {
    "slug": "atp-energy-molecule",
    "term": "ATP",
    "fullForm": "Adenosine Triphosphate",
    "category": "Science",
    "description": "ATP is the energy currency of cells, storing and releasing energy for biological processes. When ATP loses a phosphate group, it releases energy that cells use for muscle contraction, protein synthesis, and other functions. Your body produces ATP through cellular respiration, converting food into usable energy.",
    "related": [
      "Cellular Respiration",
      "Metabolism",
      "Energy"
    ]
  },
  {
    "slug": "ph-acid-base",
    "term": "pH",
    "fullForm": "Potential of Hydrogen",
    "category": "Science",
    "description": "pH is a scale from 0-14 that measures how acidic or basic a substance is. pH 7 is neutral, below 7 is acidic, and above 7 is basic. Your body maintains pH around 7.4 in blood. pH is critical for enzyme function, plant growth, and water quality.",
    "related": [
      "Acid",
      "Base",
      "Chemistry"
    ]
  },
  {
    "slug": "led-light",
    "term": "LED",
    "fullForm": "Light Emitting Diode",
    "category": "Science",
    "description": "LED is a semiconductor that emits light when electricity flows through it. LEDs are energy-efficient, long-lasting, and used in bulbs, displays, and indicators. They produce less heat than incandescent bulbs and are replacing traditional lighting in homes and streets across India.",
    "related": [
      "Light",
      "Electricity",
      "Energy Efficiency"
    ]
  },
  {
    "slug": "laser-light",
    "term": "LASER",
    "fullForm": "Light Amplification by Stimulated Emission of Radiation",
    "category": "Science",
    "description": "LASER is a device that emits coherent light, where all waves are aligned and travel in the same direction. Lasers have many applications including cutting metals, eye surgery, barcode scanners, and pointers. Lasers are much more focused and powerful than regular light.",
    "related": [
      "Light",
      "Optics",
      "Technology"
    ]
  },
  {
    "slug": "radar-detection",
    "term": "RADAR",
    "fullForm": "Radio Detection and Ranging",
    "category": "Science",
    "description": "RADAR is a system that uses radio waves to detect distant objects and determine their position and speed. Radars are used in weather forecasting, air traffic control, navigation, and military applications. Radar works by sending radio waves and analyzing the echoes that bounce back from objects.",
    "related": [
      "Radio Waves",
      "Detection",
      "Navigation"
    ]
  },
  {
    "slug": "sonar-underwater",
    "term": "SONAR",
    "fullForm": "Sound Navigation and Ranging",
    "category": "Science",
    "description": "SONAR is a system using sound waves to detect and locate objects underwater. Submarines use sonar to navigate and detect other vessels, while fishermen use it to find fish schools. SONAR works like radar but uses sound waves instead of radio waves, which travel better in water.",
    "related": [
      "Sound Waves",
      "Navigation",
      "Underwater"
    ]
  },
  {
    "slug": "mri-imaging",
    "term": "MRI",
    "fullForm": "Magnetic Resonance Imaging",
    "category": "Medical",
    "description": "MRI is a medical imaging technology using magnetic fields and radio waves to create detailed images of organs, bones, and tissues. MRI is non-invasive and uses no radiation, making it safer than X-rays for soft tissue imaging. Doctors use MRI to diagnose brain tumors, spinal injuries, and internal injuries.",
    "related": [
      "Medical Imaging",
      "CT Scan",
      "Diagnosis"
    ]
  },
  {
    "slug": "ecg-heart",
    "term": "ECG",
    "fullForm": "Electrocardiogram",
    "category": "Medical",
    "description": "ECG is a test that records the electrical activity of the heart to detect irregularities and diseases. Electrodes placed on your skin measure your heart's rhythm and electrical signals. Doctors use ECG to diagnose heart attacks, arrhythmias, and other cardiac conditions.",
    "related": [
      "Heart Health",
      "Medical Test",
      "Diagnosis"
    ]
  },
  {
    "slug": "eeg-brain",
    "term": "EEG",
    "fullForm": "Electroencephalogram",
    "category": "Medical",
    "description": "EEG measures electrical activity in the brain using electrodes placed on the scalp. It detects patterns in brain waves that indicate seizures, sleep disorders, and other neurological conditions. EEG is non-invasive and quick, making it valuable for diagnosing brain-related conditions.",
    "related": [
      "Brain Activity",
      "Neurology",
      "Medical Test"
    ]
  },
  {
    "slug": "icu-intensive-care",
    "term": "ICU",
    "fullForm": "Intensive Care Unit",
    "category": "Medical",
    "description": "ICU is a specialized hospital ward with advanced equipment and trained staff to treat critically ill patients. Patients in ICU receive continuous monitoring and support for vital functions like breathing, heart rate, and blood pressure. Severe injuries, major surgeries, and life-threatening conditions require ICU care.",
    "related": [
      "Hospital Care",
      "Critical Care",
      "Medical"
    ]
  },
  {
    "slug": "opd-outpatient",
    "term": "OPD",
    "fullForm": "Outpatient Department",
    "category": "Medical",
    "description": "OPD is the hospital department where patients receive treatment without being admitted for overnight stay. OPD handles routine checkups, consultations, minor procedures, and follow-ups. Most people visit OPD for non-emergency medical issues, making it the first point of contact with hospitals.",
    "related": [
      "Hospital Services",
      "Medical Consultation",
      "Healthcare"
    ]
  },
  {
    "slug": "bmi-weight-height",
    "term": "BMI",
    "fullForm": "Body Mass Index",
    "category": "Medical",
    "description": "BMI is a measure of body fat based on height and weight, calculated as weight(kg) divided by height(m) squared. BMI indicates if a person is underweight, normal, overweight, or obese. A BMI of 18.5-24.9 is considered healthy for adults. BMI helps assess health risks related to weight.",
    "related": [
      "Health",
      "Weight Management",
      "Fitness"
    ]
  },
  {
    "slug": "wbc-white-cells",
    "term": "WBC",
    "fullForm": "White Blood Cells",
    "category": "Medical",
    "description": "WBC are immune cells that fight infections and diseases in your body. A blood test showing WBC count indicates how well your immune system is functioning. High WBC suggests infection or immune disorder, while low WBC indicates immunosuppression. Normal WBC count is 4,500-11,000 per microliter.",
    "related": [
      "Blood Test",
      "Immune System",
      "Health"
    ]
  },
  {
    "slug": "rbc-red-cells",
    "term": "RBC",
    "fullForm": "Red Blood Cells",
    "category": "Medical",
    "description": "RBC are cells that carry oxygen from lungs to body tissues and return carbon dioxide to lungs. RBC contain hemoglobin which binds oxygen. A blood test showing RBC count indicates oxygen-carrying capacity of blood. Low RBC causes anemia with fatigue and weakness.",
    "related": [
      "Blood Test",
      "Hemoglobin",
      "Oxygen"
    ]
  },
  {
    "slug": "hiv-virus",
    "term": "HIV",
    "fullForm": "Human Immunodeficiency Virus",
    "category": "Medical",
    "description": "HIV is a virus that attacks the immune system, specifically CD4 cells that fight infections. If untreated, HIV gradually weakens the immune system, eventually causing AIDS. HIV is transmitted through blood, sexual contact, and mother-to-child transmission. Modern antiretroviral therapy can suppress HIV to undetectable levels.",
    "related": [
      "AIDS",
      "Immune System",
      "Infectious Disease"
    ]
  },
  {
    "slug": "aids-syndrome",
    "term": "AIDS",
    "fullForm": "Acquired Immunodeficiency Syndrome",
    "category": "Medical",
    "description": "AIDS is the advanced stage of HIV infection where the immune system is severely weakened and CD4 count falls below 200. At this stage, the body cannot fight infections, leading to opportunistic infections like tuberculosis and pneumonia. Early HIV treatment prevents progression to AIDS.",
    "related": [
      "HIV",
      "Immune System",
      "Infectious Disease"
    ]
  },
  {
    "slug": "ors-solution",
    "term": "ORS",
    "fullForm": "Oral Rehydration Solution",
    "category": "Medical",
    "description": "ORS is a mixture of water, electrolytes, and glucose used to treat dehydration caused by diarrhea and vomiting. ORS is especially important for children and elderly people in developing countries where dehydration from cholera and diarrhea can be fatal. A simple solution of salt, sugar, and water can save lives.",
    "related": [
      "Dehydration",
      "Diarrhea",
      "Treatment"
    ]
  },
  {
    "slug": "bp-pressure",
    "term": "BP",
    "fullForm": "Blood Pressure",
    "category": "Medical",
    "description": "BP is the force of blood pushing against artery walls, measured as systolic (top) over diastolic (bottom) in mmHg. Normal BP is 120/80 mmHg. High BP (hypertension) increases risk of heart disease and stroke, while low BP (hypotension) causes dizziness and weakness. Regular BP monitoring is important for health.",
    "related": [
      "Heart Health",
      "Blood Vessels",
      "Vital Signs"
    ]
  },
  {
    "slug": "tb-tuberculosis",
    "term": "TB",
    "fullForm": "Tuberculosis",
    "category": "Medical",
    "description": "TB is an infectious disease caused by bacteria that primarily affects the lungs but can affect other organs. TB is transmitted through air when infected people cough or sneeze. Early diagnosis and complete antibiotic treatment can cure TB. India has the highest TB burden worldwide with millions of cases annually.",
    "related": [
      "Infectious Disease",
      "Respiratory",
      "Treatment"
    ]
  },
  {
    "slug": "bcg-vaccine",
    "term": "BCG",
    "fullForm": "Bacillus Calmette-Guerin",
    "category": "Medical",
    "description": "BCG is a vaccine that protects against tuberculosis, given to infants shortly after birth in India and many countries. It provides 60-80% protection against TB. BCG is one of the most widely used vaccines globally and is part of India's Universal Immunization Program.",
    "related": [
      "TB",
      "Vaccination",
      "Immunization"
    ]
  },
  {
    "slug": "dpt-vaccine",
    "term": "DPT",
    "fullForm": "Diphtheria Pertussis Tetanus",
    "category": "Medical",
    "description": "DPT is a combination vaccine protecting against three diseases: diphtheria, whooping cough (pertussis), and tetanus. Given in five doses starting at 6 weeks, it is one of the most important vaccines in childhood immunization. DPT is part of India's Universal Immunization Program and has saved millions of lives.",
    "related": [
      "Vaccination",
      "Immunization",
      "Childhood Diseases"
    ]
  },
  {
    "slug": "neft-transfer",
    "term": "NEFT",
    "fullForm": "National Electronic Funds Transfer",
    "category": "Banking",
    "description": "NEFT is a system for electronic fund transfer between banks in India operated by RBI. It allows secure and convenient transfer of money between accounts in different banks. NEFT transfers are processed in batches at specific times, making them slightly slower than RTGS but cheaper for small amounts.",
    "related": [
      "RTGS",
      "Fund Transfer",
      "Banking"
    ]
  },
  {
    "slug": "rtgs-settlement",
    "term": "RTGS",
    "fullForm": "Real Time Gross Settlement",
    "category": "Banking",
    "description": "RTGS is a system for real-time transfer of large amounts of money between banks in India. Transfers are processed individually and settled immediately, making RTGS suitable for urgent large transfers. RTGS is more expensive than NEFT but guarantees same-day settlement.",
    "related": [
      "NEFT",
      "Fund Transfer",
      "Banking"
    ]
  },
  {
    "slug": "upi-payment",
    "term": "UPI",
    "fullForm": "Unified Payments Interface",
    "category": "Banking",
    "description": "UPI is India's revolutionary payment system allowing instant money transfer using a mobile phone. UPI uses virtual addresses (like name@bank) instead of account numbers, making transfers simple and secure. Built by NPCI, UPI has become ubiquitous in India with billions of transactions monthly.",
    "related": [
      "Digital Payment",
      "Mobile Banking",
      "NPCI"
    ]
  },
  {
    "slug": "imps-settlement",
    "term": "IMPS",
    "fullForm": "Immediate Payment Service",
    "category": "Banking",
    "description": "IMPS is an electronic fund transfer system providing immediate settlement available 24/7 including holidays. IMPS is similar to RTGS for individual transfers but operates round-the-clock, making it ideal for urgent transfers anytime. IMPS charges are moderate, between NEFT and RTGS.",
    "related": [
      "NEFT",
      "RTGS",
      "Fund Transfer"
    ]
  },
  {
    "slug": "kyc-verification",
    "term": "KYC",
    "fullForm": "Know Your Customer",
    "category": "Banking",
    "description": "KYC is a regulatory requirement where banks verify customer identity and collect personal information before opening accounts. Banks collect documents like Aadhaar, PAN, and address proof. KYC prevents money laundering, terrorist financing, and financial fraud, protecting both banks and customers.",
    "related": [
      "Banking",
      "Identity",
      "Compliance"
    ]
  },
  {
    "slug": "emi-installment",
    "term": "EMI",
    "fullForm": "Equated Monthly Installment",
    "category": "Banking",
    "description": "EMI is the fixed amount you pay monthly to repay a loan. EMI includes principal and interest components. Loans like home loans, car loans, and personal loans are repaid through EMI, making large purchases affordable by spreading payments over years.",
    "related": [
      "Loan",
      "Interest",
      "Credit"
    ]
  },
  {
    "slug": "fd-fixed-deposit",
    "term": "FD",
    "fullForm": "Fixed Deposit",
    "category": "Banking",
    "description": "FD is a savings product where you deposit money with a bank for a fixed period at a guaranteed interest rate. Interest rates for FD are higher than savings accounts, typically 4-7% annually. FDs are low-risk investment options, ideal for people seeking steady returns without market risk.",
    "related": [
      "Savings",
      "Investment",
      "Interest"
    ]
  },
  {
    "slug": "rd-recurring",
    "term": "RD",
    "fullForm": "Recurring Deposit",
    "category": "Banking",
    "description": "RD is a savings product where you deposit a fixed amount every month for a fixed period earning guaranteed interest. RD is ideal for building savings discipline by ensuring regular deposits. Interest rates on RD are similar to FD but slightly lower, usually 4-6% annually.",
    "related": [
      "Savings",
      "Investment",
      "Interest"
    ]
  },
  {
    "slug": "npa-asset",
    "term": "NPA",
    "fullForm": "Non-Performing Asset",
    "category": "Banking",
    "description": "NPA is a loan or advance where the borrower hasn't made payments for 90+ days. High NPA indicates banks have lent to borrowers unable to repay, affecting bank profitability. India's NPA ratio has been a concern, with banks writing off bad loans and pursuing recovery.",
    "related": [
      "Loan",
      "Default",
      "Banking"
    ]
  },
  {
    "slug": "gdp-gross-domestic",
    "term": "GDP",
    "fullForm": "Gross Domestic Product",
    "category": "Banking",
    "description": "GDP is the total monetary value of all goods and services produced within a country in a specific period. GDP measures a nation's economic size and growth rate. India's GDP growth rate indicates economic health and is often quoted as 5-7% annually. Higher GDP means more economic activity and jobs.",
    "related": [
      "Economy",
      "Growth",
      "GNP"
    ]
  },
  {
    "slug": "gnp-gross-national",
    "term": "GNP",
    "fullForm": "Gross National Product",
    "category": "Banking",
    "description": "GNP is the total value of goods and services produced by a nation's citizens regardless of location. Unlike GDP which is location-based, GNP is citizen-based. If an Indian abroad earns income, it counts toward GNP but not GDP. Most countries now use GDP as it's more practical.",
    "related": [
      "GDP",
      "Economy",
      "National Income"
    ]
  },
  {
    "slug": "sip-investment",
    "term": "SIP",
    "fullForm": "Systematic Investment Plan",
    "category": "Banking",
    "description": "SIP is an investment method where you invest a fixed amount regularly (weekly, monthly) in mutual funds. SIP enables disciplined investing, reduces timing risk, and benefits from rupee-cost averaging. SIPs are popular with middle-class Indians starting with as little as Rs 500 monthly.",
    "related": [
      "Investment",
      "Mutual Fund",
      "Wealth"
    ]
  },
  {
    "slug": "nav-mutual-fund",
    "term": "NAV",
    "fullForm": "Net Asset Value",
    "category": "Banking",
    "description": "NAV is the price per unit of a mutual fund, calculated as total assets minus liabilities divided by number of units. NAV changes daily based on market values of underlying investments. You buy mutual fund units at NAV and sell them back at NAV, which is the fair market price.",
    "related": [
      "Mutual Fund",
      "Investment",
      "Valuation"
    ]
  },
  {
    "slug": "rbi-reserve-bank",
    "term": "RBI",
    "fullForm": "Reserve Bank of India",
    "category": "Organization",
    "description": "RBI is India's central bank, responsible for monetary policy, currency management, and banking regulation. RBI controls interest rates, manages foreign exchange, and supervises banks. RBI's decisions directly affect lending rates, inflation, and overall economic health of India.",
    "related": [
      "Banking",
      "Monetary Policy",
      "Central Bank"
    ]
  },
  {
    "slug": "sebi-securities",
    "term": "SEBI",
    "fullForm": "Securities and Exchange Board of India",
    "category": "Organization",
    "description": "SEBI is the regulatory body for securities markets in India, overseeing stock exchanges, brokers, and mutual funds. SEBI protects investor interests and ensures fair practices in capital markets. SEBI frames regulations to prevent fraud and market manipulation.",
    "related": [
      "Stock Market",
      "Investment",
      "Regulation"
    ]
  },
  {
    "slug": "irda-insurance",
    "term": "IRDA",
    "fullForm": "Insurance Regulatory and Development Authority",
    "category": "Organization",
    "description": "IRDA is the regulatory body overseeing insurance companies in India. It issues insurance licenses, sets premium guidelines, and protects policyholder interests. IRDA ensures financial stability of insurers and prevents unfair practices in insurance products.",
    "related": [
      "Insurance",
      "Regulation",
      "Protection"
    ]
  },
  {
    "slug": "nabard-rural",
    "term": "NABARD",
    "fullForm": "National Bank for Agriculture and Rural Development",
    "category": "Organization",
    "description": "NABARD is a development bank focused on rural development and agriculture in India. It provides loans and grants for agricultural improvement, rural infrastructure, and poverty alleviation. NABARD supports farmers and rural communities through credit and capacity building.",
    "related": [
      "Agriculture",
      "Rural Development",
      "Banking"
    ]
  },
  {
    "slug": "isro-space-agency",
    "term": "ISRO",
    "fullForm": "Indian Space Research Organisation",
    "category": "Organization",
    "description": "ISRO is India's space agency responsible for space exploration, satellite technology, and space science research. ISRO has achieved remarkable milestones including Mars missions, lunar exploration, and satellite launches. ISRO plays a crucial role in India's scientific advancement and national development.",
    "related": [
      "Space Exploration",
      "Satellite",
      "Science"
    ]
  },
  {
    "slug": "drdo-defense",
    "term": "DRDO",
    "fullForm": "Defence Research and Development Organisation",
    "category": "Organization",
    "description": "DRDO is India's premier defense research organization developing weapons, missiles, and defense technology. DRDO's research supports India's military capabilities and defense industry. It develops products like BrahMos missile, Arjun tank, and radar systems for national security.",
    "related": [
      "Defense",
      "Research",
      "Technology"
    ]
  },
  {
    "slug": "barc-atomic",
    "term": "BARC",
    "fullForm": "Bhabha Atomic Research Centre",
    "category": "Organization",
    "description": "BARC is India's premier nuclear research institution under the Department of Atomic Energy. It conducts research in nuclear science, develops reactor technology, and produces radioactive isotopes for medical use. BARC played a key role in India's nuclear program and peaceful uses of atomic energy.",
    "related": [
      "Nuclear",
      "Research",
      "Energy"
    ]
  },
  {
    "slug": "nasa-space",
    "term": "NASA",
    "fullForm": "National Aeronautics and Space Administration",
    "category": "Organization",
    "description": "NASA is the United States space agency responsible for civilian space exploration, research, and satellite programs. NASA programs like Apollo Moon landing, Space Shuttle, and Mars rovers represent major scientific achievements. NASA and ISRO collaborate on space missions and Earth observation.",
    "related": [
      "Space Exploration",
      "ISRO",
      "International"
    ]
  },
  {
    "slug": "http-hypertext-transfer-protocol",
    "term": "HTTP",
    "fullForm": "Hypertext Transfer Protocol",
    "category": "Computer",
    "description": "The foundation protocol for transferring web pages and data across the internet using a client-server model. HTTP is stateless, meaning each request is independent and does not retain information about previous requests. Most websites initially load over HTTP, which is now being phased out in favor of the secure HTTPS variant.",
    "related": [
      "HTTPS",
      "TCP",
      "URL"
    ]
  },
  {
    "slug": "https-hypertext-transfer-protocol-secure",
    "term": "HTTPS",
    "fullForm": "Hypertext Transfer Protocol Secure",
    "category": "Computer",
    "description": "A secure version of HTTP that encrypts data transmitted between a user's browser and a website using SSL/TLS protocols. HTTPS protects sensitive information like passwords, payment details, and personal data from being intercepted by hackers. All modern websites, especially Indian e-commerce and banking platforms, use HTTPS as a security standard.",
    "related": [
      "HTTP",
      "SSL",
      "TLS"
    ]
  },
  {
    "slug": "ftp-file-transfer-protocol",
    "term": "FTP",
    "fullForm": "File Transfer Protocol",
    "category": "Computer",
    "description": "A network protocol used to transfer files from one computer to another over the internet or a local network. FTP is commonly used by web developers and system administrators to upload website files to servers or download large documents. Though less common today due to security concerns, FTP remains essential for certain legacy systems and file management tasks in India.",
    "related": [
      "SFTP",
      "HTTP",
      "TCP"
    ]
  },
  {
    "slug": "tcp-transmission-control-protocol",
    "term": "TCP",
    "fullForm": "Transmission Control Protocol",
    "category": "Computer",
    "description": "A core internet protocol that ensures reliable, ordered delivery of data packets between computers. TCP establishes a connection before data transmission, checks for errors, and retransmits lost packets, making it ideal for applications requiring accuracy like email and web browsing. It works alongside IP to form the TCP/IP suite that powers the entire internet.",
    "related": [
      "IP",
      "UDP",
      "HTTP"
    ]
  },
  {
    "slug": "ip-internet-protocol",
    "term": "IP",
    "fullForm": "Internet Protocol",
    "category": "Computer",
    "description": "The primary protocol that assigns unique numerical addresses (IP addresses) to every device connected to the internet, enabling data routing and delivery. Every computer, smartphone, and IoT device in India connected to the internet has a unique IP address assigned by Internet Service Providers. IP works with TCP to ensure data reaches the correct destination.",
    "related": [
      "TCP",
      "IPV4",
      "IPV6"
    ]
  },
  {
    "slug": "mac-media-access-control",
    "term": "MAC",
    "fullForm": "Media Access Control",
    "category": "Computer",
    "description": "A unique hardware identifier assigned to network interface cards that enables device communication within a local network. Each MAC address is a 48-bit address typically written in hexadecimal format and is used for ARP (Address Resolution Protocol) to map IP addresses to physical devices. MAC filtering is commonly used in WiFi networks to control which devices can connect.",
    "related": [
      "IP",
      "ARP",
      "WiFi"
    ]
  },
  {
    "slug": "isp-internet-service-provider",
    "term": "ISP",
    "fullForm": "Internet Service Provider",
    "category": "Computer",
    "description": "Companies in India that provide internet connectivity to homes, businesses, and organizations through various technologies like fiber optic cables, broadband, or wireless signals. Major ISPs in India include Jio, Airtel, Vodafone, and BSNL, which deliver internet services with varying speeds and data plans. ISPs manage the infrastructure that connects users to the global internet network.",
    "related": [
      "WiFi",
      "5G",
      "Broadband"
    ]
  },
  {
    "slug": "wifi-wireless-fidelity",
    "term": "WiFi",
    "fullForm": "Wireless Fidelity",
    "category": "Computer",
    "description": "A wireless networking technology that allows devices to connect to the internet without physical cables using radio waves on 2.4 GHz and 5 GHz frequencies. WiFi is ubiquitous in Indian homes, offices, schools, and public spaces, enabling convenient internet access for smartphones, laptops, and IoT devices. Modern WiFi standards like WiFi 6 provide faster speeds and better range.",
    "related": [
      "GSM",
      "5G",
      "ISP"
    ]
  },
  {
    "slug": "gsm-global-system-for-mobile",
    "term": "GSM",
    "fullForm": "Global System for Mobile Communications",
    "category": "Computer",
    "description": "An international standard for mobile cellular networks that transmits voice calls and SMS messages using digital signals. GSM is the most widely deployed mobile technology globally, and Indian telecom companies have used GSM standards for 2G mobile networks, though the technology is being phased out. GSM uses time-division multiplexing to allow multiple users on the same frequency.",
    "related": [
      "CDMA",
      "4G",
      "5G"
    ]
  },
  {
    "slug": "cdma-code-division-multiple-access",
    "term": "CDMA",
    "fullForm": "Code Division Multiple Access",
    "category": "Computer",
    "description": "A cellular network technology that allows multiple users to share the same frequency band by assigning unique codes to each transmission. CDMA was used in India by some telecom operators and is known for superior voice quality and network capacity compared to GSM. This technology has largely been superseded by 4G LTE and 5G networks.",
    "related": [
      "GSM",
      "4G",
      "5G"
    ]
  },
  {
    "slug": "5g-fifth-generation",
    "term": "5G",
    "fullForm": "Fifth Generation",
    "category": "Computer",
    "description": "The latest and fastest mobile network technology offering ultra-high speeds, low latency, and massive device connectivity compared to 4G. Indian telecom companies like Jio, Airtel, and Vodafone are rapidly deploying 5G networks in major cities, enabling applications like telemedicine, smart cities, and autonomous vehicles. 5G uses millimeter waves and provides speeds exceeding 10 Gbps.",
    "related": [
      "4G",
      "LTE",
      "WiFi"
    ]
  },
  {
    "slug": "nfc-near-field-communication",
    "term": "NFC",
    "fullForm": "Near Field Communication",
    "category": "Computer",
    "description": "A short-range wireless communication technology that allows devices to exchange data by touching or bringing them very close together. NFC is used in India for contactless payments, transit cards, and access control systems, enabling fast and secure transactions. Modern smartphones with NFC can act as mobile wallets for digital payments.",
    "related": [
      "RFID",
      "Bluetooth",
      "WiFi"
    ]
  },
  {
    "slug": "gps-global-positioning-system",
    "term": "GPS",
    "fullForm": "Global Positioning System",
    "category": "Computer",
    "description": "A satellite-based navigation system operated by the United States that provides location and time information to devices across the globe. GPS is essential for navigation, ride-sharing apps like Uber and Ola in India, logistics tracking, and emergency services. India is also developing its own regional navigation system called NavIC for independent positioning.",
    "related": [
      "NavIC",
      "GLONASS",
      "Maps"
    ]
  },
  {
    "slug": "ocr-optical-character-recognition",
    "term": "OCR",
    "fullForm": "Optical Character Recognition",
    "category": "Computer",
    "description": "Technology that converts printed or handwritten text in images and documents into editable digital text using artificial intelligence. OCR is widely used in India for digitizing historical documents, extracting text from ID proofs, processing cheques in banking, and making scanned documents searchable. Modern OCR systems support multiple Indian languages including Hindi, Tamil, and Telugu.",
    "related": [
      "AI",
      "ML",
      "Document"
    ]
  },
  {
    "slug": "pdf-portable-document-format",
    "term": "PDF",
    "fullForm": "Portable Document Format",
    "category": "Computer",
    "description": "A file format developed by Adobe that preserves the layout, fonts, and formatting of documents across different devices and operating systems. PDFs are universally used in India for official documents, government forms, educational materials, and professional reports, ensuring consistent presentation. PDFs can contain text, images, links, and interactive elements while being secure against unauthorized modifications.",
    "related": [
      "DOC",
      "XLS",
      "File"
    ]
  },
  {
    "slug": "doc-document-file-format",
    "term": "DOC",
    "fullForm": "Document File Format",
    "category": "Computer",
    "description": "A file format associated with Microsoft Word for creating, editing, and sharing text documents with formatting options. DOC and the newer DOCX format are standard for word processing in Indian offices, schools, and government institutions for reports, letters, and manuscripts. These formats support collaboration features like comments, track changes, and version history.",
    "related": [
      "PDF",
      "XLS",
      "PPT"
    ]
  },
  {
    "slug": "xls-excel-spreadsheet-format",
    "term": "XLS",
    "fullForm": "Excel Spreadsheet Format",
    "category": "Computer",
    "description": "A file format used by Microsoft Excel for creating and managing spreadsheets with data, formulas, and calculations. XLS files are extensively used in Indian businesses, banks, and educational institutions for financial analysis, data management, and statistical computations. The newer XLSX format offers better compatibility and larger file support.",
    "related": [
      "CSV",
      "DOC",
      "PPT"
    ]
  },
  {
    "slug": "ppt-powerpoint-presentation-format",
    "term": "PPT",
    "fullForm": "PowerPoint Presentation Format",
    "category": "Computer",
    "description": "A file format for creating slideshows with text, images, animations, and multimedia elements used for presentations and educational content. PPT is the standard format for delivering lectures, business presentations, and student projects in Indian schools and corporate environments. The format supports collaborative editing and can be converted to video or PDF for easy sharing.",
    "related": [
      "PDF",
      "XLS",
      "DOC"
    ]
  },
  {
    "slug": "zip-zip-compression-format",
    "term": "ZIP",
    "fullForm": "ZIP Compression Format",
    "category": "Computer",
    "description": "A lossless data compression file format that reduces file sizes while preserving all original data for easy storage and transfer. ZIP files are commonly used in India for emailing large documents, sharing software packages, and backing up multiple files. ZIP archives can be password-protected for security and split into segments for faster uploads.",
    "related": [
      "RAR",
      "7Z",
      "File"
    ]
  },
  {
    "slug": "rar-roshal-archive-format",
    "term": "RAR",
    "fullForm": "Roshal Archive Format",
    "category": "Computer",
    "description": "A proprietary compression format that provides better compression ratios than ZIP while supporting recovery features for damaged archives. RAR is popular in India for archiving large files, multimedia content, and software distributions. The RAR format supports multi-volume archives, encryption, and password protection.",
    "related": [
      "ZIP",
      "7Z",
      "File"
    ]
  },
  {
    "slug": "bmp-bitmap-image-format",
    "term": "BMP",
    "fullForm": "Bitmap Image Format",
    "category": "Computer",
    "description": "An uncompressed image file format that stores pixel-by-pixel color information without data loss but results in larger file sizes. BMP is used for simple graphics, icons, and Windows system images but has been largely replaced by more efficient formats. The format supports various color depths and is supported by most image viewers.",
    "related": [
      "PNG",
      "JPG",
      "GIF"
    ]
  },
  {
    "slug": "png-portable-network-graphics",
    "term": "PNG",
    "fullForm": "Portable Network Graphics",
    "category": "Computer",
    "description": "A lossless image compression format that preserves image quality while reducing file sizes, supporting transparency and 24-bit color. PNG is widely used in India for website graphics, logos, educational materials, and social media content. PNG files are ideal for images requiring sharp text and graphics without quality loss.",
    "related": [
      "BMP",
      "JPG",
      "SVG"
    ]
  },
  {
    "slug": "svg-scalable-vector-graphics",
    "term": "SVG",
    "fullForm": "Scalable Vector Graphics",
    "category": "Computer",
    "description": "A vector graphics format based on XML that stores images as mathematical equations, allowing infinite scaling without quality loss. SVG is used for logos, icons, animations, and responsive web design in modern Indian websites and applications. SVG files are lightweight, editable in text editors, and support interactive and animated elements.",
    "related": [
      "PNG",
      "PDF",
      "Vector"
    ]
  },
  {
    "slug": "cmos-complementary-metal-oxide-semiconductor",
    "term": "CMOS",
    "fullForm": "Complementary Metal-Oxide-Semiconductor",
    "category": "Computer",
    "description": "A semiconductor technology used in computer processors, memory chips, and image sensors that consumes minimal power and generates low heat. CMOS technology powers nearly all modern digital electronics in India from smartphones to servers. CMOS image sensors are used in smartphone cameras and surveillance systems.",
    "related": [
      "CPU",
      "RAM",
      "Processor"
    ]
  },
  {
    "slug": "vga-video-graphics-array",
    "term": "VGA",
    "fullForm": "Video Graphics Array",
    "category": "Computer",
    "description": "A legacy video display standard that transmits analog RGB signals to monitors, commonly used with blue 15-pin connectors. VGA was the standard for computer displays in India before being replaced by digital standards like HDMI and DVI. Although mostly obsolete, VGA connectors are still found on some projectors and older monitors.",
    "related": [
      "HDMI",
      "DVI",
      "DisplayPort"
    ]
  },
  {
    "slug": "hdmi-high-definition-multimedia-interface",
    "term": "HDMI",
    "fullForm": "High-Definition Multimedia Interface",
    "category": "Computer",
    "description": "A digital audio and video transmission standard used to connect devices like televisions, monitors, and projectors with a single cable. HDMI is the standard connection in Indian homes for streaming devices, gaming consoles, and home entertainment systems, supporting 4K and higher resolutions. HDMI carries uncompressed video and audio, ensuring high-quality transmission.",
    "related": [
      "VGA",
      "DisplayPort",
      "USB-C"
    ]
  },
  {
    "slug": "rj45-registered-jack-45",
    "term": "RJ45",
    "fullForm": "Registered Jack 45",
    "category": "Computer",
    "description": "A standardized connector used for Ethernet cables to connect computers, routers, and network devices with a secure locking mechanism. RJ45 is the standard network connector in Indian offices, data centers, and internet installations for wired broadband connections. The connector supports transmission speeds from 10 Mbps to 10 Gbps depending on the cable category.",
    "related": [
      "Ethernet",
      "CAT6",
      "Network"
    ]
  },
  {
    "slug": "pop-post-office-protocol",
    "term": "POP",
    "fullForm": "Post Office Protocol",
    "category": "Computer",
    "description": "An email protocol that downloads messages from a mail server to a client application, removing them from the server after retrieval. POP is an older email standard used in India for offline email access on mobile devices and desktop clients. POP3 is the current version supporting authentication and deletion of messages on the server.",
    "related": [
      "IMAP",
      "SMTP",
      "Email"
    ]
  },
  {
    "slug": "imap-internet-message-access-protocol",
    "term": "IMAP",
    "fullForm": "Internet Message Access Protocol",
    "category": "Computer",
    "description": "A modern email protocol that synchronizes messages across multiple devices while keeping emails stored on the server. IMAP is preferred by Indian users for accessing email from smartphones, tablets, and computers simultaneously with real-time synchronization. IMAP supports advanced features like folder management, flags, and search capabilities.",
    "related": [
      "POP",
      "SMTP",
      "Email"
    ]
  },
  {
    "slug": "uv-ultraviolet",
    "term": "UV",
    "fullForm": "Ultraviolet",
    "category": "Science",
    "description": "Electromagnetic radiation with wavelengths shorter than visible light that can damage skin and cause various health effects. UV rays from the sun are intense in India, particularly near the equator, making UV protection essential through sunscreen and protective clothing. UVA and UVB are the harmful types reaching Earth, while UVC is blocked by the ozone layer.",
    "related": [
      "IR",
      "Light",
      "Radiation"
    ]
  },
  {
    "slug": "ir-infrared",
    "term": "IR",
    "fullForm": "Infrared",
    "category": "Science",
    "description": "Electromagnetic radiation with wavelengths longer than visible red light that is felt as heat and is invisible to the human eye. Infrared technology is widely used in India for thermal imaging, night vision, remote controls, and temperature sensors. IR cameras can detect heat signatures and are useful for medical diagnostics and building inspections.",
    "related": [
      "UV",
      "Thermal",
      "Light"
    ]
  },
  {
    "slug": "emf-electromotive-force",
    "term": "EMF",
    "fullForm": "Electromotive Force",
    "category": "Science",
    "description": "The energy provided by a power source like a battery or generator to push electric current through a circuit, measured in volts. EMF is a fundamental concept in physics taught in Indian schools and is essential for understanding electrical systems and energy conversion. EMF differs from voltage as it accounts for the internal resistance of the power source.",
    "related": [
      "Voltage",
      "Current",
      "Battery"
    ]
  },
  {
    "slug": "ac-alternating-current",
    "term": "AC",
    "fullForm": "Alternating Current",
    "category": "Science",
    "description": "Electric current that reverses direction periodically, typically 50 times per second in India (50 Hz), forming a sinusoidal wave pattern. AC is the standard form of electricity supplied to homes and businesses in India by power distribution companies. AC is efficient for long-distance transmission and powers most household appliances and industrial equipment.",
    "related": [
      "DC",
      "Voltage",
      "Power"
    ]
  },
  {
    "slug": "dc-direct-current",
    "term": "DC",
    "fullForm": "Direct Current",
    "category": "Science",
    "description": "Electric current that flows in a single direction constantly, typically supplied by batteries and used in electronic devices. DC is used in smartphones, computers, LED lights, and solar panels in India for powering sensitive electronic components. DC eliminates electromagnetic interference and is safer for low-voltage applications.",
    "related": [
      "AC",
      "Battery",
      "Electronics"
    ]
  },
  {
    "slug": "ldr-light-dependent-resistor",
    "term": "LDR",
    "fullForm": "Light Dependent Resistor",
    "category": "Science",
    "description": "A variable resistor component whose resistance changes based on the intensity of light falling on it, used in light-sensing circuits. LDR is commonly used in India for street light automation, camera exposure control, and alarm systems. An LDR's resistance decreases as light intensity increases, making it useful for day-night detection.",
    "related": [
      "Photoresistor",
      "Sensor",
      "Electronics"
    ]
  },
  {
    "slug": "lcd-liquid-crystal-display",
    "term": "LCD",
    "fullForm": "Liquid Crystal Display",
    "category": "Science",
    "description": "A display technology using liquid crystals that change optical properties when voltage is applied, allowing pixel-by-pixel control of images. LCD technology was widely used in Indian televisions, monitors, watches, and calculators before being replaced by LED and OLED in high-end devices. LCDs are energy-efficient, thin, and affordable.",
    "related": [
      "LED",
      "OLED",
      "Display"
    ]
  },
  {
    "slug": "oled-organic-light-emitting-diode",
    "term": "OLED",
    "fullForm": "Organic Light-Emitting Diode",
    "category": "Science",
    "description": "A display technology where each pixel emits its own light, eliminating the need for a backlight and enabling true blacks and high contrast. OLED displays are increasingly used in premium Indian smartphones, televisions, and smartwatches for superior image quality and energy efficiency. OLED screens offer flexibility, allowing curved and foldable displays.",
    "related": [
      "LCD",
      "LED",
      "Display"
    ]
  },
  {
    "slug": "ntp-normal-temperature-and-pressure",
    "term": "NTP",
    "fullForm": "Normal Temperature and Pressure",
    "category": "Science",
    "description": "Standard conditions used in chemistry and physics defined as 25 degrees Celsius and 1 atmosphere of pressure (or 0 degrees and 1 atm in some definitions). NTP is used to compare gas volumes, densities, and chemical reactions under consistent conditions in Indian laboratories and educational settings. NTP differs from STP in temperature values.",
    "related": [
      "STP",
      "Temperature",
      "Pressure"
    ]
  },
  {
    "slug": "stp-standard-temperature-and-pressure",
    "term": "STP",
    "fullForm": "Standard Temperature and Pressure",
    "category": "Science",
    "description": "Standard reference conditions used in chemistry defined as 0 degrees Celsius and 1 atmosphere of pressure for gas measurements. STP is used in Indian chemistry textbooks and laboratories to calculate molar volumes and conduct experiments with consistent results. A mole of any ideal gas occupies 22.4 liters at STP.",
    "related": [
      "NTP",
      "Gas",
      "Molar"
    ]
  },
  {
    "slug": "gm-genetically-modified",
    "term": "GM",
    "fullForm": "Genetically Modified",
    "category": "Science",
    "description": "Organisms whose DNA has been altered using genetic engineering techniques to introduce desired traits for improved yield or nutritional content. GM crops are grown in India with approval from regulatory bodies, including Bt cotton and improved varieties of vegetables and grains. Controversy exists around GM crops regarding long-term health and environmental impacts.",
    "related": [
      "Biotechnology",
      "Crop",
      "DNA"
    ]
  },
  {
    "slug": "pvc-polyvinyl-chloride",
    "term": "PVC",
    "fullForm": "Polyvinyl Chloride",
    "category": "Science",
    "description": "A durable and versatile plastic polymer used extensively in India for pipes, cables, flooring, and window frames. PVC is valued for its water resistance, electrical insulation properties, and cost-effectiveness, making it ideal for construction and plumbing applications. Environmental concerns exist regarding PVC production and disposal.",
    "related": [
      "Plastic",
      "Polymer",
      "Material"
    ]
  },
  {
    "slug": "lpg-liquefied-petroleum-gas",
    "term": "LPG",
    "fullForm": "Liquefied Petroleum Gas",
    "category": "Science",
    "description": "A flammable hydrocarbon gas liquefied under pressure for use as fuel in cooking stoves, heaters, and vehicles across India. LPG is distributed to Indian households through subsidized cylinders by government agencies like IOCL and BPCL. LPG is cleaner than solid fuels and more affordable than natural gas, making it popular for domestic and commercial use.",
    "related": [
      "CNG",
      "Natural Gas",
      "Fuel"
    ]
  },
  {
    "slug": "cng-compressed-natural-gas",
    "term": "CNG",
    "fullForm": "Compressed Natural Gas",
    "category": "Science",
    "description": "Natural gas compressed to high pressure for use as fuel in vehicles and industrial applications, promoting cleaner emissions. CNG vehicles are common in India as an eco-friendly alternative to petrol and diesel, with refueling stations available in major cities. CNG is cheaper than petrol and produces fewer pollutants.",
    "related": [
      "LPG",
      "Fuel",
      "Gas"
    ]
  },
  {
    "slug": "tnt-trinitrotoluene",
    "term": "TNT",
    "fullForm": "Trinitrotoluene",
    "category": "Science",
    "description": "A highly explosive chemical compound used historically in military applications and mining for blasting, with restricted use in most countries including India. TNT is characterized by its yellow color and is measured as a standard for explosive force in kilotonne and megatonne units. Modern regulations in India strictly control TNT production and distribution.",
    "related": [
      "Explosive",
      "Chemical",
      "Compound"
    ]
  },
  {
    "slug": "ddt-dichlorodiphenyltrichloroethane",
    "term": "DDT",
    "fullForm": "Dichlorodiphenyltrichloroethane",
    "category": "Science",
    "description": "A persistent organic pesticide banned in many countries including India due to its toxicity and environmental impact despite its initial effectiveness against malaria. DDT was previously used in India for controlling mosquitoes and malaria vectors but is now prohibited except in limited controlled scenarios approved by international conventions. DDT accumulates in the food chain, causing bioaccumulation in organisms.",
    "related": [
      "Pesticide",
      "Insecticide",
      "Environment"
    ]
  },
  {
    "slug": "ct-computed-tomography",
    "term": "CT",
    "fullForm": "Computed Tomography",
    "category": "Medical",
    "description": "A medical imaging technique using X-rays and computer processing to create detailed cross-sectional images of the body for diagnosis. CT scans are widely available in Indian hospitals for diagnosing tumors, internal injuries, infections, and organ damage with high precision. CT provides three-dimensional images superior to conventional X-rays.",
    "related": [
      "MRI",
      "PET",
      "Imaging"
    ]
  },
  {
    "slug": "pet-positron-emission-tomography",
    "term": "PET",
    "fullForm": "Positron Emission Tomography",
    "category": "Medical",
    "description": "An advanced nuclear medical imaging technique that detects radioactive tracers to visualize metabolic activity and detect diseases early. PET scans are used in Indian hospitals for cancer detection, neurological disorders, and cardiac conditions by showing functional and metabolic information. PET combined with CT provides comprehensive diagnostic information.",
    "related": [
      "CT",
      "MRI",
      "Nuclear"
    ]
  },
  {
    "slug": "usg-ultrasonography",
    "term": "USG",
    "fullForm": "Ultrasonography",
    "category": "Medical",
    "description": "A non-invasive medical imaging technique using ultrasonic sound waves to visualize internal organs and tissues, widely used for pregnancy monitoring. USG is the safest imaging method in India for prenatal screening, abdominal examinations, and soft tissue evaluation without radiation exposure. USG is affordable and available in most Indian clinics and hospitals.",
    "related": [
      "Ultrasound",
      "Imaging",
      "Prenatal"
    ]
  },
  {
    "slug": "ent-ear-nose-and-throat",
    "term": "ENT",
    "fullForm": "Ear, Nose, and Throat",
    "category": "Medical",
    "description": "A medical specialty dealing with diseases and disorders of the ear, nose, throat, and related head and neck structures. ENT specialists in India treat conditions ranging from hearing loss to sinus infections, tonsil problems, and voice disorders. ENT clinics are common in Indian hospitals and provide both conservative and surgical treatments.",
    "related": [
      "Otolaryngology",
      "Surgery",
      "Specialist"
    ]
  },
  {
    "slug": "bp-blood-pressure",
    "term": "BP",
    "fullForm": "Blood Pressure",
    "category": "Medical",
    "description": "The force exerted by circulating blood against artery walls, typically measured in millimeters of mercury and expressed as systolic over diastolic values. High blood pressure is a major health concern in India affecting millions, increasing the risk of heart disease, stroke, and kidney damage. Regular BP monitoring is essential for disease prevention and management.",
    "related": [
      "Hypertension",
      "Cardiovascular",
      "Health"
    ]
  },
  {
    "slug": "cpr-cardiopulmonary-resuscitation",
    "term": "CPR",
    "fullForm": "Cardiopulmonary Resuscitation",
    "category": "Medical",
    "description": "An emergency life-saving technique involving chest compressions and rescue breathing to maintain circulation and oxygen delivery in cardiac arrest victims. CPR is crucial in India where sudden cardiac deaths are common, and training is being promoted in schools and workplaces. Modern CPR guidelines emphasize continuous chest compressions with minimal interruption.",
    "related": [
      "First Aid",
      "Emergency",
      "AED"
    ]
  },
  {
    "slug": "iv-intravenous",
    "term": "IV",
    "fullForm": "Intravenous",
    "category": "Medical",
    "description": "A medical procedure for delivering medications, fluids, or nutrients directly into the bloodstream through a vein using a catheter or needle. IV therapy is routine in Indian hospitals for hydration, antibiotic administration, blood transfusions, and chemotherapy. IV lines provide faster drug absorption and are essential for emergency and critical care.",
    "related": [
      "Injection",
      "Medication",
      "Hospital"
    ]
  },
  {
    "slug": "ot-operating-theater",
    "term": "OT",
    "fullForm": "Operating Theater",
    "category": "Medical",
    "description": "A sterile surgical room in hospitals where surgical procedures are performed by surgical teams under controlled conditions. Indian OTs are equipped with advanced equipment and strictly maintain hygiene protocols to prevent infection. OTs in major hospitals have specialized sections for different types of surgeries.",
    "related": [
      "Surgery",
      "Hospital",
      "Surgical"
    ]
  },
  {
    "slug": "nicu-neonatal-intensive-care-unit",
    "term": "NICU",
    "fullForm": "Neonatal Intensive Care Unit",
    "category": "Medical",
    "description": "A specialized hospital ward providing intensive care for newborn infants, especially premature and critically ill babies requiring continuous monitoring. NICUs in Indian hospitals are equipped with ventilators, incubators, and monitoring devices to support vulnerable newborns. NICU care has significantly improved survival rates of premature infants in India.",
    "related": [
      "ICU",
      "Newborn",
      "Hospital"
    ]
  },
  {
    "slug": "ivf-in-vitro-fertilization",
    "term": "IVF",
    "fullForm": "In Vitro Fertilization",
    "category": "Medical",
    "description": "An assisted reproductive technology where eggs and sperm are combined in a laboratory to create embryos that are then implanted in the uterus. IVF is widely available in Indian fertility clinics and has helped many infertile couples conceive, with success rates improving over time. IVF procedures in India are relatively affordable compared to developed countries.",
    "related": [
      "ART",
      "Fertility",
      "Reproduction"
    ]
  },
  {
    "slug": "ppe-personal-protective-equipment",
    "term": "PPE",
    "fullForm": "Personal Protective Equipment",
    "category": "Medical",
    "description": "Specialized clothing or equipment worn for protection against health and safety risks in healthcare and industrial settings. PPE became critical in India during the COVID-19 pandemic for protecting healthcare workers and preventing disease transmission. PPE includes masks, gloves, gowns, face shields, and goggles.",
    "related": [
      "COVID-19",
      "Safety",
      "Protection"
    ]
  },
  {
    "slug": "rtpcr-reverse-transcription-polymerase-chain-reaction",
    "term": "RTPCR",
    "fullForm": "Reverse Transcription Polymerase Chain Reaction",
    "category": "Medical",
    "description": "A molecular biology technique that detects and amplifies viral RNA, widely used in India for COVID-19 testing and diagnosis of RNA viruses. RTPCR is the gold standard test for COVID-19 with high sensitivity and specificity, providing reliable results. The test involves extracting RNA from samples and amplifying specific sequences.",
    "related": [
      "COVID-19",
      "Testing",
      "Molecular"
    ]
  },
  {
    "slug": "cibil-credit-information-bureau-india-limited",
    "term": "CIBIL",
    "fullForm": "Credit Information Bureau India Limited",
    "category": "Banking",
    "description": "India's first credit information company that maintains credit histories and scores for individuals and businesses, used by lenders for credit decisions. CIBIL scores range from 300 to 900, with scores above 650 considered good for loan approval in Indian banking. A strong CIBIL score is essential for obtaining favorable loan terms.",
    "related": [
      "Credit Score",
      "Loan",
      "Banking"
    ]
  },
  {
    "slug": "micr-magnetic-ink-character-recognition",
    "term": "MICR",
    "fullForm": "Magnetic Ink Character Recognition",
    "category": "Banking",
    "description": "A technology that reads characters printed in magnetic ink on the bottom of checks to facilitate automatic check processing and clearing in Indian banks. MICR codes in India uniquely identify banks and branches, enabling efficient check routing and collection. MICR sorting has modernized India's check clearing system.",
    "related": [
      "IFSC",
      "Check",
      "Banking"
    ]
  },
  {
    "slug": "cvv-card-verification-value",
    "term": "CVV",
    "fullForm": "Card Verification Value",
    "category": "Banking",
    "description": "A three or four-digit security code on credit and debit cards used to authenticate online and phone transactions in India. CVV protects against fraud by verifying that the cardholder has physical possession of the card. Never sharing CVV is crucial for preventing unauthorized card usage.",
    "related": [
      "PIN",
      "Security",
      "Card"
    ]
  },
  {
    "slug": "pos-point-of-sale",
    "term": "POS",
    "fullForm": "Point of Sale",
    "category": "Banking",
    "description": "A system for processing retail transactions at the checkout counter where customers make payments using cash, cards, or digital wallets. POS machines are ubiquitous in Indian retail, restaurants, and service establishments, enabling quick and secure payment processing. Modern POS systems support multiple payment modes including UPI and contactless payments.",
    "related": [
      "Payment",
      "Retail",
      "Terminal"
    ]
  },
  {
    "slug": "nri-non-resident-indian",
    "term": "NRI",
    "fullForm": "Non-Resident Indian",
    "category": "Banking",
    "description": "An Indian citizen living outside India for work, studies, or other purposes who has special banking and taxation privileges in India. NRIs can open NRE and NRO accounts in Indian banks to manage their financial affairs and remit money to India. NRI taxation in India follows specific rules distinct from resident Indians.",
    "related": [
      "Remittance",
      "Banking",
      "Taxation"
    ]
  },
  {
    "slug": "tds-tax-deducted-at-source",
    "term": "TDS",
    "fullForm": "Tax Deducted at Source",
    "category": "Banking",
    "description": "A tax collection mechanism in India where the income receiver deducts a portion of tax from payments and remits it to the government. TDS applies to various income categories including salary, interest, professional fees, and rental income under Indian tax law. TDS rates vary by income type and are set by the government.",
    "related": [
      "Income Tax",
      "GST",
      "TAN"
    ]
  },
  {
    "slug": "tan-tax-account-number",
    "term": "TAN",
    "fullForm": "Tax Account Number",
    "category": "Banking",
    "description": "A ten-character alphanumeric identifier issued by Indian tax authorities to entities that deduct or collect tax from others. TAN is mandatory for all employers, banks, and entities deducting TDS from payments made to individuals or other entities. TAN is used for filing TDS returns with tax authorities.",
    "related": [
      "TDS",
      "PAN",
      "Income Tax"
    ]
  },
  {
    "slug": "bsc-physics",
    "term": "B.Sc",
    "fullForm": "Bachelor of Science",
    "category": "Education",
    "description": "Three-year undergraduate degree in science subjects like Physics, Chemistry, Biology, or Mathematics. Essential qualification for competitive exams and postgraduate studies. Very popular in Indian colleges for science stream students.",
    "related": [
      "M.Sc",
      "Bachelor"
    ]
  },
  {
    "slug": "msc-chemistry",
    "term": "M.Sc",
    "fullForm": "Master of Science",
    "category": "Education",
    "description": "Two-year postgraduate degree in science. Opens doors to research positions, academic careers, and specialized roles in pharmaceutical or chemical industries. Requires B.Sc as eligibility.",
    "related": [
      "B.Sc",
      "PhD"
    ]
  },
  {
    "slug": "bcom-accounting",
    "term": "B.Com",
    "fullForm": "Bachelor of Commerce",
    "category": "Education",
    "description": "Three-year undergraduate commerce degree focusing on accounting, business, and economics. Leads to CA, CS, or company secretary qualifications. Most popular after 12th for commerce students in India.",
    "related": [
      "M.Com",
      "CA"
    ]
  },
  {
    "slug": "mcom-finance",
    "term": "M.Com",
    "fullForm": "Master of Commerce",
    "category": "Education",
    "description": "Two-year postgraduate commerce degree for specialized study in finance, taxation, or auditing. Enhances career prospects in banking and financial sectors. Requires B.Com.",
    "related": [
      "B.Com",
      "MBA"
    ]
  },
  {
    "slug": "ba-history",
    "term": "BA",
    "fullForm": "Bachelor of Arts",
    "category": "Education",
    "description": "Three-year undergraduate degree in humanities including subjects like history, literature, philosophy, or sociology. Gateway to competitive exams like UPSC and teaching careers.",
    "related": [
      "MA",
      "UPSC"
    ]
  },
  {
    "slug": "ma-english",
    "term": "MA",
    "fullForm": "Master of Arts",
    "category": "Education",
    "description": "Two-year postgraduate degree in humanities. Prepares students for academic research, civil services, and content creation roles. Popular for language and social science specializations.",
    "related": [
      "BA",
      "PhD"
    ]
  },
  {
    "slug": "llb-law",
    "term": "LLB",
    "fullForm": "Bachelor of Laws",
    "category": "Education",
    "description": "Three-year professional law degree in India. Eligibility to practice law and appear for bar council examinations. Essential for judicial, corporate legal, and advocacy careers.",
    "related": [
      "LLM",
      "Bar"
    ]
  },
  {
    "slug": "llm-international",
    "term": "LLM",
    "fullForm": "Master of Laws",
    "category": "Education",
    "description": "One to two-year postgraduate law degree for specialization in specific legal fields. Taken after LLB for higher expertise in corporate, international, or constitutional law.",
    "related": [
      "LLB",
      "JD"
    ]
  },
  {
    "slug": "bds-dentistry",
    "term": "BDS",
    "fullForm": "Bachelor of Dental Surgery",
    "category": "Education",
    "description": "Four-year professional dental degree leading to dentistry practice. Highly competitive entrance exams like NEET required. Gateway to dental practice or public health careers.",
    "related": [
      "MBBS",
      "NEET"
    ]
  },
  {
    "slug": "bams-ayurveda",
    "term": "BAMS",
    "fullForm": "Bachelor of Ayurvedic Medicine and Surgery",
    "category": "Education",
    "description": "Five-and-a-half-year professional degree in traditional Ayurvedic medicine recognized in India. Leads to Ayurvedic practice and research. Requires NEET qualification.",
    "related": [
      "BHMS",
      "NEET"
    ]
  },
  {
    "slug": "bhms-homeopathy",
    "term": "BHMS",
    "fullForm": "Bachelor of Homeopathic Medicine and Surgery",
    "category": "Education",
    "description": "Four-and-a-half-year professional homeopathy degree recognized by India's Ministry of AYUSH. Opens practice and research in alternative medicine sector.",
    "related": [
      "BAMS",
      "AYUSH"
    ]
  },
  {
    "slug": "barch-architecture",
    "term": "B.Arch",
    "fullForm": "Bachelor of Architecture",
    "category": "Education",
    "description": "Five-year professional architecture degree combining design, engineering, and construction. Requires JEE Main and drawing aptitude test. Essential for architectural practice in India.",
    "related": [
      "M.Arch",
      "JEE"
    ]
  },
  {
    "slug": "diploma-engineering",
    "term": "Diploma",
    "fullForm": "Diploma in Engineering",
    "category": "Education",
    "description": "Three-year technical degree after 10th standard. Gateway to diploma apprenticeships, technical jobs, or lateral entry to engineering degrees. Very popular in tier-2 cities.",
    "related": [
      "ITI",
      "B.Tech"
    ]
  },
  {
    "slug": "iti-electrician",
    "term": "ITI",
    "fullForm": "Industrial Training Institute",
    "category": "Education",
    "description": "One to two-year skilled trade training for industrial jobs like plumbing, welding, or electrician work. Direct employment after completion. Highly valued in manufacturing sector.",
    "related": [
      "Diploma",
      "NCVT"
    ]
  },
  {
    "slug": "polytechnic-delhi",
    "term": "Polytechnic",
    "fullForm": "Polytechnic College",
    "category": "Education",
    "description": "Three-year diploma institution offering technical education in engineering disciplines. Entrance through merit or competitive exam. Very affordable and employment-focused.",
    "related": [
      "Diploma",
      "B.Tech"
    ]
  },
  {
    "slug": "puc-karnataka",
    "term": "PUC",
    "fullForm": "Pre-University Course",
    "category": "Education",
    "description": "Two-year intermediate course after 10th in Karnataka and some other states. Equivalent to 11th and 12th. Leads to college education and competitive exams.",
    "related": [
      "HSC",
      "SSLC"
    ]
  },
  {
    "slug": "hsc-maharashtra",
    "term": "HSC",
    "fullForm": "Higher Secondary Certificate",
    "category": "Education",
    "description": "12th standard qualification in Maharashtra and some Indian states. Also called Senior Secondary Certificate. Eligibility for undergraduate admission and competitive exams.",
    "related": [
      "SSLC",
      "PUC"
    ]
  },
  {
    "slug": "sslc-karnataka",
    "term": "SSLC",
    "fullForm": "Secondary School Leaving Certificate",
    "category": "Education",
    "description": "10th standard qualification in Karnataka. Also used in some other states. Eligibility to pursue HSC, PUC, or vocational courses.",
    "related": [
      "HSC",
      "PUC"
    ]
  },
  {
    "slug": "icse-board",
    "term": "ICSE",
    "fullForm": "Indian Certificate of Secondary Education",
    "category": "Education",
    "description": "English-medium board following British curriculum in India. Known for emphasis on English and overall development. Alternative to CBSE with strict curriculum.",
    "related": [
      "ISC",
      "CBSE"
    ]
  },
  {
    "slug": "isc-board",
    "term": "ISC",
    "fullForm": "Indian School Certificate",
    "category": "Education",
    "description": "12th standard equivalent under ICSE board. Advanced curriculum with focus on depth of knowledge. Gateway to premium colleges and international universities.",
    "related": [
      "ICSE",
      "HSC"
    ]
  },
  {
    "slug": "ib-diploma",
    "term": "IB",
    "fullForm": "International Baccalaureate",
    "category": "Education",
    "description": "Global curriculum offered in select Indian schools alongside national boards. Recognized internationally by top universities. Emphasis on critical thinking and research skills.",
    "related": [
      "IB DP",
      "CBSE"
    ]
  },
  {
    "slug": "nios-board",
    "term": "NIOS",
    "fullForm": "National Institute of Open Schooling",
    "category": "Education",
    "description": "Distance education board under Ministry of Education for 10th and 12th. Offers flexible learning for working professionals and adult learners. Fully recognized qualification.",
    "related": [
      "Open School",
      "IGNOU"
    ]
  },
  {
    "slug": "ias-civil-service",
    "term": "IAS",
    "fullForm": "Indian Administrative Service",
    "category": "Government",
    "description": "Most prestigious civil service in India through UPSC examination. Officers become District Magistrates, Collectors, and top government positions. Three-tier competitive exam process.",
    "related": [
      "IPS",
      "UPSC"
    ]
  },
  {
    "slug": "ips-police",
    "term": "IPS",
    "fullForm": "Indian Police Service",
    "category": "Government",
    "description": "National police service for senior law enforcement positions through UPSC. Officers become police commissioners and senior investigation officers. Highly respected career path.",
    "related": [
      "IAS",
      "UPSC"
    ]
  },
  {
    "slug": "ifs-foreign",
    "term": "IFS",
    "fullForm": "Indian Foreign Service",
    "category": "Government",
    "description": "Elite diplomatic service of India selected through UPSC. Officers represent India abroad as ambassadors and diplomats. Most selective service with global assignments.",
    "related": [
      "IAS",
      "Diplomat"
    ]
  },
  {
    "slug": "irs-revenue",
    "term": "IRS",
    "fullForm": "Indian Revenue Service",
    "category": "Government",
    "description": "Tax and revenue administration through UPSC. Officers manage income tax, customs, and excise. Critical for national revenue collection.",
    "related": [
      "IAS",
      "Tax Officer"
    ]
  },
  {
    "slug": "ies-engineering",
    "term": "IES",
    "fullForm": "Indian Engineering Service",
    "category": "Government",
    "description": "Engineering cadre in government through UPSC. Officers work in ministries and departments on infrastructure and development projects. Requires engineering degree.",
    "related": [
      "IAS",
      "Engineer"
    ]
  },
  {
    "slug": "rrb-railway",
    "term": "RRB",
    "fullForm": "Railway Recruitment Board",
    "category": "Government",
    "description": "Recruitment agency for Indian Railways. Conducts exams for ALP, NTPC, constable, and group D posts. Largest recruiter in India with lakhs of annual vacancies.",
    "related": [
      "NTPC",
      "ALP"
    ]
  },
  {
    "slug": "ntpc-railway",
    "term": "NTPC",
    "fullForm": "Non-Technical Popular Categories",
    "category": "Government",
    "description": "RRB exam for graduates seeking non-technical railway posts like clerk and station master. Four-tier selection process. Highly competitive with 1 million+ applicants annually.",
    "related": [
      "RRB",
      "ALP"
    ]
  },
  {
    "slug": "alp-railway",
    "term": "ALP",
    "fullForm": "Assistant Loco Pilot",
    "category": "Government",
    "description": "Technical post for railway train driving under RRB recruitment. Requires 10th pass with ITI diploma. Leads to permanent employment with good salary and benefits.",
    "related": [
      "RRB",
      "Loco"
    ]
  },
  {
    "slug": "crpf-paramilitary",
    "term": "CRPF",
    "fullForm": "Central Reserve Police Force",
    "category": "Government",
    "description": "India's largest paramilitary force for internal security. Recruitment through SSC and state exams. Officers deploy for law and order, counter-insurgency operations.",
    "related": [
      "BSF",
      "SSC"
    ]
  },
  {
    "slug": "bsf-border",
    "term": "BSF",
    "fullForm": "Border Security Force",
    "category": "Government",
    "description": "Paramilitary force guarding India's international borders. Recruitment for constable and sub-inspector through SSC. High-risk postings with honorable service.",
    "related": [
      "CRPF",
      "CISF"
    ]
  },
  {
    "slug": "cisf-security",
    "term": "CISF",
    "fullForm": "Central Industrial Security Force",
    "category": "Government",
    "description": "Paramilitary providing security to airports, power plants, and government installations. Recruitment through SSC. Professional security force with infrastructure focus.",
    "related": [
      "BSF",
      "CRPF"
    ]
  },
  {
    "slug": "itbp-hills",
    "term": "ITBP",
    "fullForm": "Indo-Tibetan Border Police",
    "category": "Government",
    "description": "Specialized force for high-altitude border security in Himalayas. Recruitment through SSC and state exams. Tough training and mountainous deployments.",
    "related": [
      "BSF",
      "Border"
    ]
  },
  {
    "slug": "ssb-intelligence",
    "term": "SSB",
    "fullForm": "Services Selection Board",
    "category": "Government",
    "description": "Interview and psychological board for NDA and CDS candidates to join armed forces. Assesses officer qualities like leadership and decision-making. Five-day comprehensive testing.",
    "related": [
      "NDA",
      "CDS"
    ]
  },
  {
    "slug": "nda-defence",
    "term": "NDA",
    "fullForm": "National Defence Academy",
    "category": "Government",
    "description": "Military academy entrance exam for 12th pass students. Trains future army, navy, and air force officers. Two-year service commission course at academy.",
    "related": [
      "CDS",
      "SSB"
    ]
  },
  {
    "slug": "cds-officers",
    "term": "CDS",
    "fullForm": "Combined Defence Services",
    "category": "Government",
    "description": "Exam for graduates to join armed forces as officers. Conducted twice yearly by UPSC. Gateway to army, navy, air force short service commissions.",
    "related": [
      "NDA",
      "SSB"
    ]
  },
  {
    "slug": "afcat-airforce",
    "term": "AFCAT",
    "fullForm": "Air Force Common Admission Test",
    "category": "Government",
    "description": "Entrance exam for flying and ground duty officer positions in Indian Air Force. Open to graduates. Direct commission pathway without NDA eligibility.",
    "related": [
      "CDS",
      "IAF"
    ]
  },
  {
    "slug": "inet-navy",
    "term": "INET",
    "fullForm": "Indian Navy Entry Test",
    "category": "Government",
    "description": "Recruitment exam for Indian Navy officers. Candidates become executive officers or engineers. Direct commission for graduates with specific qualifications.",
    "related": [
      "NDA",
      "Navy"
    ]
  },
  {
    "slug": "aso-railways",
    "term": "ASO",
    "fullForm": "Administrative Services Operator",
    "category": "Government",
    "description": "Government IT support role in railway ministries and departments. Recruitment through SSC. Technical qualification with administrative responsibilities.",
    "related": [
      "SSC",
      "Railway"
    ]
  },
  {
    "slug": "otp-security",
    "term": "OTP",
    "fullForm": "One-Time Password",
    "category": "Computer",
    "description": "Unique six or eight-digit code sent via SMS or app for account verification. Expires within minutes for security. Essential for online banking and exam portals like NEET.",
    "related": [
      "PIN",
      "2FA"
    ]
  },
  {
    "slug": "pin-postal",
    "term": "PIN",
    "fullForm": "Postal Index Number",
    "category": "General",
    "description": "Six-digit code identifying postal delivery area in India. Required for shipping and online orders. First two digits indicate state/region.",
    "related": [
      "Address",
      "Zip"
    ]
  },
  {
    "slug": "imei-mobile",
    "term": "IMEI",
    "fullForm": "International Mobile Equipment Identity",
    "category": "Computer",
    "description": "Unique fifteen-digit code identifying mobile phones globally. Helps track stolen devices and verify phone authenticity. Found in phone settings or by dialing *#06#.",
    "related": [
      "IMSI",
      "Mobile"
    ]
  },
  {
    "slug": "isbn-book",
    "term": "ISBN",
    "fullForm": "International Standard Book Number",
    "category": "General",
    "description": "Unique thirteen-digit identifier for every published book worldwide. Found on back cover. Essential for ordering textbooks and identifying editions.",
    "related": [
      "ISSN",
      "DOI"
    ]
  },
  {
    "slug": "issn-journal",
    "term": "ISSN",
    "fullForm": "International Standard Serial Number",
    "category": "General",
    "description": "Eight-digit code for academic journals and periodic publications. Identifies unique serial publications globally. Used in research paper citations.",
    "related": [
      "ISBN",
      "Journal"
    ]
  },
  {
    "slug": "asap-urgent",
    "term": "ASAP",
    "fullForm": "As Soon As Possible",
    "category": "General",
    "description": "Abbreviation for immediate or urgent action needed. Common in emails and messages for time-sensitive tasks. Used in project deadlines and emergency communications.",
    "related": [
      "URGENT",
      "STAT"
    ]
  },
  {
    "slug": "fyi-information",
    "term": "FYI",
    "fullForm": "For Your Information",
    "category": "General",
    "description": "Prefix for messages sharing knowledge without requiring action. Common in professional emails and group chats. Indicates informational content only.",
    "related": [
      "FYR",
      "Note"
    ]
  },
  {
    "slug": "aka-alias",
    "term": "AKA",
    "fullForm": "Also Known As",
    "category": "General",
    "description": "Indicates alternative names or titles for same person or thing. Used in identifying individuals or places by other names. Common in biographies and references.",
    "related": [
      "Name",
      "Pseudonym"
    ]
  },
  {
    "slug": "eta-time",
    "term": "ETA",
    "fullForm": "Estimated Time of Arrival",
    "category": "General",
    "description": "Predicted time when something or someone will arrive. Used in travel, delivery, and project management. Important for scheduling and planning.",
    "related": [
      "Time",
      "Arrival"
    ]
  },
  {
    "slug": "rsvp-invite",
    "term": "RSVP",
    "fullForm": "Repondez S'il Vous Plait",
    "category": "General",
    "description": "French phrase meaning please confirm attendance. Used in invitations for events, parties, and formal functions. Request for confirmation of attendance.",
    "related": [
      "Invite",
      "Confirm"
    ]
  },
  {
    "slug": "sos-emergency",
    "term": "SOS",
    "fullForm": "Save Our Souls",
    "category": "General",
    "description": "Universal distress signal for emergencies and life-threatening situations. Used in maritime, aviation, and emergency communications. Recognized internationally as urgent call for help.",
    "related": [
      "Emergency",
      "Help"
    ]
  },
  {
    "slug": "am-morning",
    "term": "AM",
    "fullForm": "Ante Meridiem",
    "category": "General",
    "description": "Latin term for before midday or morning time. Used in 12-hour clock format from midnight to noon. Opposite of PM in time notation.",
    "related": [
      "PM",
      "Time"
    ]
  },
  {
    "slug": "pm-afternoon",
    "term": "PM",
    "fullForm": "Post Meridiem",
    "category": "General",
    "description": "Latin term for after midday or afternoon and evening time. Used in 12-hour clock format from noon to midnight. Standard in Indian timetables and schedules.",
    "related": [
      "AM",
      "Time"
    ]
  },
  {
    "slug": "ad-years",
    "term": "AD",
    "fullForm": "Anno Domini",
    "category": "General",
    "description": "Latin phrase meaning in the year of the Lord. Used for dates after year 1 in Gregorian calendar. Current era in Western chronology system.",
    "related": [
      "BC",
      "CE"
    ]
  },
  {
    "slug": "bc-before",
    "term": "BC",
    "fullForm": "Before Christ",
    "category": "General",
    "description": "Dates before year 1 in Gregorian calendar. Used in historical contexts and archaeological dating. Opposite of AD in Western calendar system.",
    "related": [
      "AD",
      "BCE"
    ]
  },
  {
    "slug": "ie-meaning",
    "term": "i.e",
    "fullForm": "id est",
    "category": "General",
    "description": "Latin phrase meaning that is or in other words. Used to clarify or restate previous statement. Common in academic and formal writing.",
    "related": [
      "e.g",
      "etc"
    ]
  },
  {
    "slug": "eg-example",
    "term": "e.g",
    "fullForm": "exempli gratia",
    "category": "General",
    "description": "Latin phrase meaning for example. Used to provide specific instances or examples. Common in textbooks, assignments, and formal documents.",
    "related": [
      "i.e",
      "etc"
    ]
  },
  {
    "slug": "vs-versus",
    "term": "vs",
    "fullForm": "versus",
    "category": "General",
    "description": "Latin word meaning against or in comparison with. Used in competitions, court cases, and comparisons. Standard abbreviation in sports and legal documents.",
    "related": [
      "against",
      "compare"
    ]
  }
];

export const FF_CATEGORIES = (): string[] => [...new Set(FULL_FORMS.map((f) => f.category))];
export function getFullForm(slug: string): FullForm | undefined {
  return FULL_FORMS.find((f) => f.slug === slug);
}
