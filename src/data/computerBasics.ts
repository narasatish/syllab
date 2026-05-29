// Computer Basics content for Class 3-8
// Educational content on fundamental computer concepts for young students

export type ComputerBasicsTopic = {
  id: string;
  title: string;
  classLevels: number[];
  icon: string;
  category: 'hardware' | 'software' | 'internet' | 'safety' | 'coding-intro';
  difficulty: 'beginner' | 'intermediate';
  theory: string[];
  keyPoints: string[];
  funFact: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
  }[];
  xp: number;
};

export const computerBasicsTopics: ComputerBasicsTopic[] = [
  {
    id: 'cb-001',
    title: 'What is a Computer?',
    classLevels: [3, 4, 5],
    icon: '💻',
    category: 'hardware',
    difficulty: 'beginner',
    theory: [
      'A computer is an electronic machine that processes information. Just like your brain helps you think and solve problems, a computer processes data and follows instructions to complete tasks.',
      'Computers can receive information called "input" (like when you type on a keyboard), process that information inside, and produce results called "output" (like text appearing on a screen).',
      'Computers work based on instructions given to them. These instructions are called programs or software. Without programs, a computer is just a machine with no purpose—like a car without a driver!',
      'All computers—whether desktops, laptops, tablets, or smartphones—work on the same basic principle: input → process → output.',
      'Computers are used everywhere: in schools for learning, in hospitals to store patient records, in homes for entertainment, and in shops to manage business. Modern life would be impossible without computers!',
    ],
    keyPoints: [
      'A computer is an electronic machine that processes information',
      'Computers follow instructions called "programs"',
      'All computers use the input-process-output cycle',
      'Computers help us work faster and solve complex problems',
      'We use computers every day for learning, entertainment, and communication',
    ],
    funFact: 'The first computer, ENIAC (1946), was so big it filled an entire room and weighed 30 tons! Today, computers are millions of times more powerful and fit in your pocket!',
    quiz: [
      {
        question: 'What is the main job of a computer?',
        options: ['To make noise', 'To process information and follow instructions', 'To store money', 'To cook food'],
        correct: 1,
      },
      {
        question: 'Which of these is an example of computer input?',
        options: ['Typing on a keyboard', 'Light from a monitor', 'Sound from a speaker', 'Heat from a fan'],
        correct: 0,
      },
      {
        question: 'What does a computer need to do its job?',
        options: ['Only electricity', 'Instructions and programs', 'Only a monitor', 'Only a keyboard'],
        correct: 1,
      },
    ],
    xp: 50,
  },
  {
    id: 'cb-002',
    title: 'Parts of a Computer',
    classLevels: [3, 4, 5],
    icon: '🖥️',
    category: 'hardware',
    difficulty: 'beginner',
    theory: [
      'Every computer has several important parts that work together. Think of a computer like a human body—different parts do different jobs, but they all work as a team.',
      'The CPU (Central Processing Unit) is called "the brain" of the computer. It reads instructions from programs and makes decisions. When you ask your computer to open a game, the CPU is the part that understands and executes that command.',
      'The Monitor is the screen where you see information. It displays everything you do on the computer—games, videos, websites, and homework. Without a monitor, you would not be able to see anything!',
      'The Keyboard and Mouse are how you talk to the computer. The keyboard is for typing letters and numbers, while the mouse lets you point and click on things. These are called "input devices" because you use them to put information INTO the computer.',
      'The Hard Drive is like the computer\'s memory storage. It saves all your files, programs, photos, and videos. Even when you turn off the computer, everything on the hard drive is saved safely.',
    ],
    keyPoints: [
      'CPU (processor) is the "brain" that processes instructions',
      'Monitor (screen) shows you what the computer is doing',
      'Keyboard lets you type and give commands',
      'Mouse lets you point and click',
      'Hard Drive stores all your files and programs',
      'All parts work together to make the computer function',
    ],
    funFact: 'Modern CPUs can make over 10 billion calculations per second! That is faster than a human could count in a lifetime. The first computer processor was only 10,000 times slower!',
    quiz: [
      {
        question: 'Which part of a computer is called "the brain"?',
        options: ['Monitor', 'Mouse', 'CPU', 'Keyboard'],
        correct: 2,
      },
      {
        question: 'Where do you see the computer output?',
        options: ['On the keyboard', 'On the monitor', 'In the hard drive', 'On the CPU'],
        correct: 1,
      },
      {
        question: 'Which device is used to type information into a computer?',
        options: ['Monitor', 'Keyboard', 'Speaker', 'Printer'],
        correct: 1,
      },
    ],
    xp: 50,
  },
  {
    id: 'cb-003',
    title: 'Input Devices - Keyboard, Mouse, Microphone',
    classLevels: [3, 4, 5],
    icon: '⌨️',
    category: 'hardware',
    difficulty: 'beginner',
    theory: [
      'Input devices are tools we use to communicate with computers. "Input" means putting information INTO the computer. Without input devices, we would have no way to tell the computer what to do!',
      'A Keyboard is used for typing letters, numbers, and symbols. When you type a letter, the keyboard sends that information to the computer. Teachers use keyboards to write lesson plans, students use them for homework, and programmers use them to write code.',
      'A Mouse helps you move a cursor on the screen and click on things. When you click a button in a game or select a file, you are using the mouse to give commands. Some computers use a Touchpad instead of a mouse on laptops.',
      'A Microphone captures sound and lets you talk to the computer. This is used in voice calls, speech recognition, and online classes. When you say "Hello Siri" or "OK Google," you are using a microphone as input!',
      'Modern input devices even include Touch screens (like smartphones), Joysticks (for gaming), and Motion sensors (for sports games). Each type of input device makes it easier to communicate with computers in different ways.',
    ],
    keyPoints: [
      'Input devices send information TO the computer',
      'Keyboard is for typing text and commands',
      'Mouse is for pointing and clicking',
      'Microphone captures voice and sound',
      'Touch screens let you interact by touching',
      'Different devices are better for different tasks',
    ],
    funFact: 'The first computer mouse, invented in 1964, was made of wood and had just one button! Today\'s mice can have 5+ buttons and work wirelessly through the air.',
    quiz: [
      {
        question: 'Which device is used to talk to a computer?',
        options: ['Speaker', 'Microphone', 'Monitor', 'Printer'],
        correct: 1,
      },
      {
        question: 'What does an input device do?',
        options: ['Shows pictures', 'Sends information to the computer', 'Prints documents', 'Makes sound'],
        correct: 1,
      },
      {
        question: 'What is the main use of a keyboard?',
        options: ['To show images', 'To type text and commands', 'To print papers', 'To make the computer faster'],
        correct: 1,
      },
    ],
    xp: 50,
  },
  {
    id: 'cb-004',
    title: 'Output Devices - Monitor, Printer, Speaker',
    classLevels: [3, 4, 5],
    icon: '🖨️',
    category: 'hardware',
    difficulty: 'beginner',
    theory: [
      'Output devices are the opposite of input devices. "Output" means information coming OUT of the computer. These are the devices that show us or give us the results of what the computer has processed.',
      'A Monitor (or Screen) is the most common output device. It displays everything you do on the computer—games, videos, websites, and documents. The monitor converts electronic signals from the computer into images and text that our eyes can see.',
      'A Printer is an output device that produces physical copies of documents on paper. Students use printers to print school assignments, photographs, and reports. A printer converts digital information from the computer into a real, touchable document.',
      'A Speaker is an output device that produces sound. Whether you are listening to music, watching a movie with sound, or hearing notifications, the speaker converts digital audio signals into actual sounds you can hear.',
      'Other output devices include headphones (personal audio), projectors (large screens for presentations), and plotters (special printers for large drawings). Every output device converts computer data into something humans can see, hear, or touch.',
    ],
    keyPoints: [
      'Output devices receive information FROM the computer',
      'Monitor displays text and images on a screen',
      'Printer creates physical copies on paper',
      'Speaker produces audio and music',
      'Output devices show the results of processing',
      'We need both input AND output devices to use computers',
    ],
    funFact: 'The first computer monitors were Black & White! Color monitors were so expensive that only big companies could afford them. Now, color monitors are in almost every device, from phones to TVs!',
    quiz: [
      {
        question: 'What does an output device do?',
        options: ['Sends information TO the computer', 'Receives information FROM the computer', 'Stores files', 'Processes data'],
        correct: 1,
      },
      {
        question: 'Which device lets you see pictures and videos on a computer?',
        options: ['Keyboard', 'Mouse', 'Monitor', 'Microphone'],
        correct: 2,
      },
      {
        question: 'What is the job of a speaker?',
        options: ['To show words', 'To print documents', 'To produce sound', 'To type letters'],
        correct: 2,
      },
    ],
    xp: 50,
  },
  {
    id: 'cb-005',
    title: 'CPU - The Brain of the Computer',
    classLevels: [4, 5, 6],
    icon: '🧠',
    category: 'hardware',
    difficulty: 'intermediate',
    theory: [
      'The CPU stands for Central Processing Unit. It is the "brain" of the computer because it reads all instructions and makes all decisions. Every single action your computer does—whether opening a file, running a game, or connecting to the internet—is controlled by the CPU.',
      'The CPU works by reading instructions from programs in a specific order. Each instruction might be something like "add these two numbers" or "check if this password is correct." The CPU does billions of these simple instructions every second.',
      'CPUs are measured in speeds like 2GHz or 4GHz. "GHz" means "Gigahertz"—or billions of operations per second! A faster CPU means the computer can do more work in the same amount of time. This is why newer computers with faster CPUs feel snappier than older ones.',
      'The CPU has special compartments called "cores." A dual-core CPU has 2 cores and can do two things at once. Modern CPUs have 4, 8, or even 16 cores, letting them run many programs simultaneously without slowdown.',
      'Different types of CPUs are designed for different purposes. Intel and AMD make CPUs for regular computers. ARM processors power phones and tablets. Specialized CPUs power gaming consoles and supercomputers. In India, the ISRO space program uses specialized CPUs in satellites!',
    ],
    keyPoints: [
      'CPU is the "brain" that processes all instructions',
      'CPU reads and executes programs step by step',
      'Speed is measured in GHz (gigahertz)',
      'Multi-core CPUs can do multiple tasks at once',
      'Faster CPUs make computers more responsive',
      'Different devices use different CPUs for different jobs',
    ],
    funFact: 'Your smartphone\'s CPU (processor) is almost as powerful as the entire computer room at NASA in 1969 when humans landed on the moon! Technology advances incredibly fast.',
    quiz: [
      {
        question: 'What is the CPU?',
        options: ['The monitor screen', 'The "brain" that processes instructions', 'The hard drive', 'The keyboard'],
        correct: 1,
      },
      {
        question: 'What does "GHz" measure?',
        options: ['Computer size', 'Storage space', 'Speed of processing', 'Battery life'],
        correct: 2,
      },
      {
        question: 'What is a "core" in a CPU?',
        options: ['The power supply', 'Part of the CPU that runs instructions', 'The hard drive sector', 'A type of memory'],
        correct: 1,
      },
    ],
    xp: 75,
  },
  {
    id: 'cb-006',
    title: 'Memory - RAM and Storage',
    classLevels: [5, 6, 7],
    icon: '💾',
    category: 'hardware',
    difficulty: 'intermediate',
    theory: [
      'Computers have two types of memory: RAM and Storage. Think of RAM as "working desk space" and Storage as "file cabinets." Your CPU uses RAM to work with programs right now, and uses Storage to save files permanently.',
      'RAM (Random Access Memory) is temporary, fast memory. When you open an app, it loads from storage into RAM. RAM lets the CPU access information super quickly (nanoseconds). However, RAM is cleared when you turn off the computer—so it\'s not good for saving files permanently.',
      'Storage (like Hard Drives or SSDs) is permanent, slower memory. When you save a file, it goes into storage where it stays even after shutdown. Storage is much larger than RAM—you might have 8GB RAM but 500GB storage. This is why saved files don\'t disappear when you power off.',
      'Think of it this way: If RAM is like a student\'s desk (where you work right now), storage is like a school library (where books live permanently). You pull books from the library to your desk to work with them, then return them when done.',
      'Modern computers increasingly use SSDs (Solid State Drives) instead of traditional Hard Drives. SSDs are faster, more reliable, and use no moving parts. Many phones and laptops now come with 256GB or 512GB SSDs, making them fast and spacious.',
    ],
    keyPoints: [
      'RAM is temporary, fast memory for current work',
      'Storage is permanent memory for files',
      'RAM is cleared when you shut down',
      'Storage keeps files safely even after power off',
      'RAM is faster but smaller; Storage is slower but larger',
      'SSDs are faster and better than old hard drives',
    ],
    funFact: 'A computer with 8GB RAM can hold about 8 million pages of text simultaneously! Yet users often complain about "not enough RAM." This shows how memory-hungry modern programs are.',
    quiz: [
      {
        question: 'What type of memory is temporarily cleared when you shut down?',
        options: ['Storage', 'RAM', 'Hard drive', 'SSD'],
        correct: 1,
      },
      {
        question: 'Where are your saved files permanently kept?',
        options: ['RAM', 'CPU', 'Storage', 'Monitor'],
        correct: 2,
      },
      {
        question: 'Which memory is faster but smaller?',
        options: ['Storage', 'Hard drive', 'RAM', 'SSD'],
        correct: 2,
      },
    ],
    xp: 75,
  },
  {
    id: 'cb-007',
    title: 'Hardware vs Software',
    classLevels: [5, 6, 7],
    icon: '⚙️',
    category: 'software',
    difficulty: 'intermediate',
    theory: [
      'Hardware and Software are two completely different things, but they work together. Hardware is the physical "stuff" you can touch—the monitor, keyboard, CPU, and hard drive. Software is the instructions that tell hardware what to do—programs and apps.',
      'Hardware is like a musical instrument. A guitar is just an object until a musician picks it up and plays it. Similarly, a computer is just a machine until software tells it what to do. Hardware cannot work without software, and software needs hardware to run on.',
      'Examples of Hardware: Monitor, CPU, RAM, Hard Drive, Keyboard, Mouse, Printer, Speaker, Motherboard, Power Supply. All of these are physical parts that form the structure of a computer.',
      'Examples of Software: Windows, macOS, Chrome, Microsoft Word, Games, Video Players, Email Apps, Instagram, YouTube, School Learning Apps. Software is stored as code (instructions) and downloaded onto hardware to make it useful.',
      'You can buy hardware from shops, but software is usually downloaded from the internet. Updates to software are free (mostly), but hardware is replaced when it breaks. Both are equally important—hardware without software is useless, and software needs hardware to exist on!',
    ],
    keyPoints: [
      'Hardware is physical, touchable computer parts',
      'Software is invisible instructions and programs',
      'Hardware = computer body, Software = computer mind',
      'Common hardware: CPU, RAM, Monitor, Keyboard, Hard Drive',
      'Common software: Operating Systems, Apps, Games, Tools',
      'Both hardware and software are needed for computers to work',
    ],
    funFact: 'Your phone has more computing power than the Apollo spacecraft that went to the moon! But that power is unlocked only because of software. Without software, it\'s just an expensive brick!',
    quiz: [
      {
        question: 'What is hardware?',
        options: ['Programs and apps', 'Physical computer parts', 'Internet connections', 'Passwords'],
        correct: 1,
      },
      {
        question: 'Which one is software?',
        options: ['Monitor', 'Keyboard', 'Microsoft Word', 'CPU'],
        correct: 2,
      },
      {
        question: 'Why do we need both hardware and software?',
        options: ['Only one is necessary', 'Hardware runs, software controls it', 'They are the same thing', 'Hardware is cheaper'],
        correct: 1,
      },
    ],
    xp: 75,
  },
  {
    id: 'cb-008',
    title: 'Operating System',
    classLevels: [6, 7, 8],
    icon: '🖲️',
    category: 'software',
    difficulty: 'intermediate',
    theory: [
      'An Operating System (OS) is the most important software on a computer. Just like a teacher manages a classroom, the OS manages all the hardware and software. Without an OS, your computer would be completely useless.',
      'The OS does many jobs: It lets you open files and programs, manages memory and storage, controls the printer and monitor, handles internet connections, and protects your computer from viruses. Every single thing you do on a computer goes through the OS.',
      'Common Operating Systems: Windows (most computers), macOS (Apple computers), Linux (free OS), Android (phones), iOS (iPhones). Each OS looks and works differently, but they all do the same basic jobs.',
      'The OS has a visual interface called the "Desktop" with icons, files, and folders. This makes it easy for humans to use. Behind the scenes, the OS is constantly managing tasks, communicating between hardware parts, and preventing programs from interfering with each other.',
      'In India, the government promotes Linux-based operating systems through schools. Many CBSE schools use Linux for security reasons. Learning about different OSs prepares you for tech careers—companies use Windows, macOS, and Linux depending on their needs.',
    ],
    keyPoints: [
      'OS is software that controls all hardware and other software',
      'OS manages files, folders, memory, and devices',
      'Common OS: Windows, macOS, Linux, Android, iOS',
      'OS provides a visual interface (Desktop, Icons)',
      'OS prevents programs from crashing each other',
      'Every computer must have an OS to function',
    ],
    funFact: 'Linux, a free operating system, powers most of the internet servers and the International Space Station! It was created by Linus Torvalds in 1991 and is maintained by developers worldwide.',
    quiz: [
      {
        question: 'What is the main job of an Operating System?',
        options: ['Display images', 'Control hardware and other software', 'Type documents', 'Play music'],
        correct: 1,
      },
      {
        question: 'Which is an Operating System?',
        options: ['Microsoft Word', 'Windows', 'Chrome', 'Photoshop'],
        correct: 1,
      },
      {
        question: 'What would happen without an Operating System?',
        options: ['Computer works faster', 'Computer cannot run', 'Monitor shows nothing', 'Keyboard stops working'],
        correct: 1,
      },
    ],
    xp: 75,
  },
  {
    id: 'cb-009',
    title: 'Internet and World Wide Web',
    classLevels: [6, 7, 8],
    icon: '🌐',
    category: 'internet',
    difficulty: 'intermediate',
    theory: [
      'The Internet is a global network of connected computers. Imagine billions of computers worldwide connected by invisible cables and wireless signals. When you send a message to a friend, it travels through this network to reach them almost instantly.',
      'The World Wide Web (or "Web") is a system that uses the Internet. It was invented in 1989 by Tim Berners-Lee. The Web uses "websites" (like Google, YouTube, Wikipedia) that you access through a browser. The Internet is the road; the Web is the cars driving on that road.',
      'To access the Internet, you need an Internet Service Provider (ISP). In India, ISPs like Jio, Airtel, and Vsnl provide internet to homes and schools. They connect your computer to their network, which connects to the global Internet.',
      'Everything on the web has a unique address called a URL (like www.google.com). When you type a URL in your browser, it sends a request through the Internet to a computer somewhere in the world (called a "server"). That server sends back the website information.',
      'The Internet connects people across borders instantly. During online classes, your video travels across cables and satellites to reach your teacher. During video calls, your voice goes through the Internet network. This technology has made education, work, and friendship global.',
    ],
    keyPoints: [
      'Internet is a network connecting computers worldwide',
      'Web is a system that uses the Internet (websites)',
      'ISPs provide Internet connections to homes and schools',
      'URLs are addresses of websites on the web',
      'Servers are computers that store websites',
      'Internet enables instant global communication',
    ],
    funFact: 'ISRO, India\'s space agency, operates satellites that help provide internet to remote areas in India. Thousands of villages now have internet because of these satellites!',
    quiz: [
      {
        question: 'What is the Internet?',
        options: ['A website', 'A network of connected computers', 'A browser', 'A file'],
        correct: 1,
      },
      {
        question: 'What does "WWW" stand for?',
        options: ['World Wide Web', 'Work With Web', 'Web Word Window', 'Windows Web World'],
        correct: 0,
      },
      {
        question: 'What is a URL?',
        options: ['An email address', 'A web address of a website', 'A password', 'A type of computer'],
        correct: 1,
      },
    ],
    xp: 75,
  },
  {
    id: 'cb-010',
    title: 'Email and Communication',
    classLevels: [6, 7, 8],
    icon: '📧',
    category: 'internet',
    difficulty: 'beginner',
    theory: [
      'Email (electronic mail) is a way to send messages through the Internet. Instead of writing a letter and waiting days for it to arrive, email delivers your message almost instantly to anyone with an email address, anywhere in the world!',
      'An email address looks like "student@school.com". The part before @ is your username, and the part after @ is your email provider (like Gmail, Yahoo, Outlook). Your email provider is the company that stores your emails on their servers.',
      'Sending an email is simple: Write your message, add the recipient\'s email address, add a subject line (topic), and click Send. Your message goes through the Internet to the recipient\'s email server, and they can read it whenever they open their email.',
      'Email is perfect for school communication. Teachers send assignments via email, parents can contact schools, and students can collaborate on projects. Many schools now use platforms like Google Classroom that combine email with other features.',
      'Important: Always use email safely! Never share passwords, don\'t email personal information, and be careful with email links from unknown senders. Your email is like a mailbox—keep it secure and use it responsibly.',
    ],
    keyPoints: [
      'Email sends messages instantly through the Internet',
      'Email address format: username@provider.com',
      'Email providers store your messages on servers',
      'You can attach files (photos, documents) to emails',
      'Email is great for school and business communication',
      'Always protect your email password and use email safely',
    ],
    funFact: 'The first email was sent in 1971! It traveled from one computer to another through ARPANET (the early Internet). The message was very simple: "QWERTYUIOP" (random keys). Today, billions of emails are sent every single day!',
    quiz: [
      {
        question: 'What does email stand for?',
        options: ['Electronic Mail', 'Extra Mail', 'Email Mail', 'Entry Mail'],
        correct: 0,
      },
      {
        question: 'Which is a correct email format?',
        options: ['student@gmail.com', 'studentgmail.com', '@gmail.student', 'gmail.student@'],
        correct: 0,
      },
      {
        question: 'What is the main benefit of email?',
        options: ['It is expensive', 'It sends messages instantly worldwide', 'It prints letters', 'It requires stamps'],
        correct: 1,
      },
    ],
    xp: 50,
  },
  {
    id: 'cb-011',
    title: 'Cyber Safety for Students',
    classLevels: [5, 6, 7, 8],
    icon: '🔒',
    category: 'safety',
    difficulty: 'intermediate',
    theory: [
      'Cyber safety means protecting yourself online, just like physical safety protects you in the real world. The internet is a wonderful place to learn and have fun, but it also has risks. Learning cyber safety habits now will protect you throughout your life.',
      'Password safety is crucial. Never share your passwords with anyone, not even friends. Use strong passwords (mix of letters, numbers, symbols). Change passwords regularly. A strong password is like a good lock on your door—it keeps bad people out!',
      'Be careful what you share online. Personal information like your home address, phone number, school name, and birthday should never be posted on the internet. Cybercriminals can use this information to harm you. Think before you post!',
      'Don\'t talk to strangers online. People online might not be who they claim to be. Never agree to meet someone online in person, and always tell a parent if someone makes you uncomfortable.',
      'Cyberbullying is when people are mean to you online. If you face cyberbullying, don\'t respond, save evidence, and tell a trusted adult immediately. Just like physical bullying is wrong, cyberbullying is serious and punishable by law in India.',
    ],
    keyPoints: [
      'Never share passwords with anyone',
      'Use strong passwords with letters, numbers, and symbols',
      'Don\'t share personal information (address, phone, birthday)',
      'Don\'t talk to strangers or meet them in person',
      'Report cyberbullying to parents or teachers',
      'If something feels wrong online, ask a trusted adult',
      'Think before posting—once online, it\'s permanent',
    ],
    funFact: 'India has a law called "The Information Technology Act" that punishes cyberbullying and online harassment. If you face cyberbullying, you can file a complaint with the police!',
    quiz: [
      {
        question: 'What should you do with your password?',
        options: ['Share it with friends', 'Write it down and show others', 'Keep it secret from everyone', 'Post it online'],
        correct: 2,
      },
      {
        question: 'Which information should you NOT share online?',
        options: ['Your hobbies', 'Your home address', 'Your favorite book', 'Your school subjects'],
        correct: 1,
      },
      {
        question: 'What should you do if someone is mean to you online?',
        options: ['Be mean back', 'Ignore them and tell a trusted adult', 'Share your password', 'Meet them in person'],
        correct: 1,
      },
    ],
    xp: 100,
  },
  {
    id: 'cb-012',
    title: 'Introduction to Coding',
    classLevels: [5, 6, 7, 8],
    icon: '💻',
    category: 'coding-intro',
    difficulty: 'beginner',
    theory: [
      'Coding (or Programming) is writing instructions for computers. Just as you follow instructions to make a recipe, computers follow instructions called "code" to do tasks. When you use any app, someone wrote code to create it.',
      'Code is written in special languages that computers understand. Common languages include Python (easy for beginners), JavaScript (for web), Java (for apps), and many others. Each language has its own rules, but they all share the same idea: give clear instructions.',
      'A programmer is someone who writes code. Programmers solve problems by breaking them into small steps and writing instructions for each step. Good programmers are like puzzle solvers—they think logically and creatively.',
      'Learning to code teaches you to think logically. When you code, you learn to break big problems into smaller ones, find patterns, and fix mistakes. These skills help with math, science, and everyday problem-solving.',
      'The tech industry is the fastest-growing industry in India and worldwide. If you learn coding now in Class 5-8, you\'ll have amazing career options—from making apps, to artificial intelligence, to cybersecurity. Companies like Google, Microsoft, and Indian companies like Infosys are always hiring programmers!',
    ],
    keyPoints: [
      'Coding means writing instructions for computers',
      'Programmers use special languages to write code',
      'Code is organized into logical steps',
      'Coding teaches logical and creative thinking',
      'All apps and games are made by programmers',
      'Coding skills lead to great careers',
      'Mistakes in code are called "bugs" and finding them is "debugging"',
    ],
    funFact: 'Satya Nadella, who is the CEO of Microsoft (one of the world\'s largest tech companies), is from Hyderabad, India! He learned programming like you are learning now, and it led him to the top of a global company.',
    quiz: [
      {
        question: 'What is coding?',
        options: ['Using a computer', 'Writing instructions for computers', 'Fixing broken computers', 'Using passwords'],
        correct: 1,
      },
      {
        question: 'Why is learning to code important?',
        options: ['It\'s boring', 'It teaches logical thinking and problem-solving', 'It slows down thinking', 'It\'s only for adults'],
        correct: 1,
      },
      {
        question: 'Which is a programming language?',
        options: ['English', 'Python', 'Hindi', 'French'],
        correct: 1,
      },
    ],
    xp: 100,
  },
];
