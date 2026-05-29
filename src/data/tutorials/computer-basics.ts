import type { TutorialTopic } from './types';

export const computerBasicsTopics: TutorialTopic[] = [
  {
    id: 'cb-what-is-computer',
    category: 'Fundamentals',
    title: 'What is a Computer?',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'A computer is an electronic machine that processes information. Just like your brain helps you think and solve problems, a computer receives information, processes it, and produces results.',
      'Every computer works in the same way: it takes input (like when you type on a keyboard), processes that information inside, and produces output (like text appearing on a screen). This cycle happens billions of times per second!',
      'Computers need instructions to work. These instructions are called programs or software. A computer without programs is like a car without a driver—it has the power but no direction. Different programs make computers useful for different tasks.',
    ],
    code: `Computer = Input → Process → Output

Input: Typing on keyboard
Process: Computer reads and understands
Output: Text appears on screen

Examples:
- Calculator: You type "5+3" → Computer calculates → Shows "8"
- Game: You press arrow keys → Computer moves character → Shows animation
- Email: You write message → Computer sends over internet → Friend receives`,
    notes: [
      'All computers (laptops, desktops, tablets, phones) work using the same input-process-output cycle.',
      'Software (programs) makes hardware (physical parts) do useful work.',
      'Modern computers are millions of times faster than the first computers from the 1950s!',
    ],
    practice: {
      title: 'Computer Input-Output Examples',
      description: 'Think of 5 different computer tasks and write the input, process, and output for each. For example: (1) Playing music - Input: Click play button, Process: Computer reads music file, Output: Sound from speakers.',
      hint: 'Input = what you do, Process = what computer does internally, Output = what you see/hear.',
      solution: `Valid examples include:
1. Watching videos: Input (click video), Process (decode file), Output (picture + sound)
2. Searching Google: Input (type search), Process (find websites), Output (list of results)
3. Taking photo: Input (press camera button), Process (capture light), Output (image on screen)
4. Online call: Input (speak in microphone), Process (send audio), Output (friend hears voice)
5. Printing document: Input (click print), Process (format for printer), Output (paper with text)`,
    },
  },
  {
    id: 'cb-parts-of-computer',
    category: 'Hardware',
    title: 'Parts of a Computer',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'Every computer has several important parts that work together like a team. The CPU (Central Processing Unit) is the "brain" that makes decisions and runs programs. It reads your instructions and tells other parts what to do.',
      'The Monitor is the screen where you see everything. It displays games, videos, websites, and all your work. Without a monitor, you wouldn\'t be able to see anything the computer does.',
      'The Keyboard and Mouse are how you communicate with the computer. The keyboard lets you type letters and numbers, while the mouse lets you point and click on things. Together, they are called "input devices."',
      'The Hard Drive (or Storage) is like the computer\'s memory storage. It saves all your files, programs, photos, and videos. Even when you turn off the computer, everything on the hard drive stays safely saved.',
    ],
    code: `COMPUTER PARTS DIAGRAM:

┌─────────────────────────────────────────┐
│           MONITOR (Output)              │
│         Shows everything                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           KEYBOARD & MOUSE              │
│        (Inputs - How you control)       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  INSIDE THE BOX (Main Parts)            │
│  • CPU (Brain) - Makes decisions        │
│  • RAM (Quick memory) - For current work│
│  • Hard Drive (Storage) - Saves files   │
│  • Motherboard - Connects everything    │
└─────────────────────────────────────────┘`,
    notes: [
      'CPU = Brain (makes decisions and runs programs)',
      'Monitor = Eyes (shows you the output)',
      'Keyboard & Mouse = Hands (how you give commands)',
      'Hard Drive = Memory (stores your files permanently)',
    ],
    practice: {
      title: 'Label the Computer Parts',
      description: 'Imagine a desktop computer setup. Write down the name and function of each main part you would see and the parts inside the computer box.',
      hint: 'Think about what parts are visible outside (monitor, keyboard, mouse) and what\'s inside the computer case (CPU, hard drive, RAM).',
      solution: `Outside parts:
- Monitor: Shows images and text
- Keyboard: Lets you type
- Mouse: Lets you point and click
- Speaker: Makes sound

Inside the computer box:
- CPU: The "brain" - processes instructions
- RAM: Temporary fast memory
- Hard Drive: Permanent storage for files
- Motherboard: Connects all parts together
- Power Supply: Provides electricity`,
    },
  },
  {
    id: 'cb-input-devices',
    category: 'Hardware',
    title: 'Input Devices',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'Input devices are tools that let you communicate with a computer. "Input" means putting information INTO the computer. Without input devices, you would have no way to tell the computer what to do.',
      'A Keyboard is used for typing letters, numbers, and symbols. When you type on a keyboard, it sends that information to the computer. Students use keyboards for homework, programmers use them to write code, and office workers use them every day.',
      'A Mouse helps you move a cursor (pointer) on the screen and click on things. When you click a button in a game or select a file, you\'re using the mouse to give commands to the computer.',
      'Other input devices include Touchpad (on laptops), Touchscreen (on phones and tablets), Microphone (to record voice), Joystick (for gaming), and Scanner (to copy documents into the computer).',
    ],
    code: `INPUT DEVICES - Tools to Control Computers:

Keyboard:
- Used for: Typing text, writing emails, playing games
- Action: Press keys → Computer receives letters/numbers
- Keys: Letters, Numbers, Symbols, Enter, Space

Mouse:
- Used for: Pointing, clicking, selecting items
- Actions:
  * Left click = select something
  * Right click = see menu
  * Drag = move things around

Touchscreen:
- Used for: Phones, tablets, interactive displays
- Actions:
  * Tap = click something
  * Swipe = move across screen
  * Pinch = zoom in/out`,
    notes: [
      'Keyboard is the fastest way to type and give commands.',
      'Mouse makes it easy to select things visually on screen.',
      'Touchscreen is convenient for phones and tablets.',
      'Microphone lets you give voice commands to modern devices.',
    ],
    practice: {
      title: 'Input Device Matching',
      description: 'Match each task with the best input device: (1) Playing a video game, (2) Writing an essay, (3) Taking a selfie, (4) Selecting an icon on screen. Explain why each device is best for that task.',
      hint: 'Think about what each device does best. Keyboard for typing, mouse for pointing, etc.',
      solution: `1. Playing a video game → Keyboard or Joystick (for quick controls)
2. Writing an essay → Keyboard (fastest way to type long text)
3. Taking a selfie → Touchscreen camera button or voice command
4. Selecting an icon → Mouse or Touchscreen (easy pointing/tapping)

Explanation: Use the tool that's most efficient for each task.`,
    },
  },
  {
    id: 'cb-output-devices',
    category: 'Hardware',
    title: 'Output Devices',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'Output devices are the opposite of input devices. "Output" means information coming OUT of the computer for you to see, hear, or touch. These devices show you the results of what the computer has processed.',
      'A Monitor (or Screen) is the most common output device. It displays everything you do on the computer—games, videos, websites, and documents. The monitor converts electronic signals from the computer into pictures and text that your eyes can see.',
      'A Printer is an output device that creates physical copies of files on paper. Students use printers to print homework assignments, teachers use them to print materials for class, and offices use them for documents.',
      'A Speaker is an output device that produces sound. Whether you\'re listening to music, watching movies with sound, or hearing notifications, the speaker converts digital audio signals into actual sounds you can hear.',
    ],
    code: `OUTPUT DEVICES - How Computers Show Results:

Monitor/Screen:
- Shows: Text, images, videos, websites
- Examples: Desktop monitor, laptop screen, TV
- Resolution: Higher pixels = clearer picture

Printer:
- Creates: Paper copies of digital files
- Types:
  * Inkjet: Good for photos and color
  * Laser: Good for text and fast printing
- Action: Digital file → Paper with ink

Speaker:
- Produces: Sound and music
- Examples: Computer speakers, headphones, earbuds
- Used for: Music, videos, notifications, calls

Other Output Devices:
- Headphones: Personal audio without disturbing others
- Projector: Large screen displays for presentations
- LED lights: Status indicators on devices`,
    notes: [
      'Monitor is the most important output device for seeing what the computer is doing.',
      'Printer is great for creating permanent paper copies of important documents.',
      'Speaker lets you hear audio from games, videos, and music.',
      'Modern devices often have multiple output devices working together.',
    ],
    practice: {
      title: 'Input vs Output Devices',
      description: 'Make a list of 10 devices and classify each as input or output. Example: Keyboard = Input, Speaker = Output. Explain why each one is input or output.',
      hint: 'Input = you control it to tell computer what to do. Output = computer controls it to show you results.',
      solution: `Input Devices (you control them):
1. Keyboard - you type
2. Mouse - you point and click
3. Microphone - you speak into it
4. Touchscreen - you touch it
5. Scanner - you feed documents into it

Output Devices (computer controls them):
1. Monitor - computer shows images
2. Speaker - computer plays sounds
3. Printer - computer prints documents
4. Headphones - computer sends audio
5. LED lights - computer turns them on/off`,
    },
  },
  {
    id: 'cb-cpu-brain',
    category: 'Hardware',
    title: 'CPU - The Brain of the Computer',
    difficulty: 'Intermediate',
    xp: 75,
    theory: [
      'The CPU (Central Processing Unit) is the "brain" of the computer. It reads instructions from programs and makes decisions about what to do. Every single action your computer performs—opening files, running games, playing videos—is controlled by the CPU.',
      'The CPU works by reading instructions one at a time and executing them super fast. Modern CPUs can do billions of instructions every single second! When you click a game, the CPU is working millions of times to calculate graphics, sound, and player movements.',
      'CPU speed is measured in GHz (Gigahertz), which means billions of operations per second. A 2 GHz CPU does 2 billion operations per second, and a 4 GHz CPU does 4 billion. Faster CPUs make games smoother and programs more responsive.',
      'Many modern CPUs have multiple "cores." A dual-core CPU has 2 cores and can run 2 programs simultaneously. Processors with 4, 8, or 16 cores can do many things at once, making your computer feel faster when running multiple programs.',
    ],
    code: `CPU (Central Processing Unit) - The Brain:

How CPU Works:
1. Fetch instruction from program
2. Decode what the instruction means
3. Execute (perform) the instruction
4. Store the result
5. Repeat billions of times per second

CPU Speed Comparison:
┌──────────────────────────────────┐
│ Older CPU:  1 GHz = 1 billion ops│
│ Average:    2 GHz = 2 billion ops│
│ Fast:       4 GHz = 4 billion ops│
│ Very Fast:  5 GHz = 5 billion ops│
└──────────────────────────────────┘

Multi-Core Processors:
Single-Core:  1 task at a time
Dual-Core:    2 tasks at once
Quad-Core:    4 tasks at once
Octa-Core:    8 tasks at once`,
    notes: [
      'Faster CPU = faster computer (generally).',
      'Multi-core CPUs are better for running many programs at once.',
      'Your phone\'s CPU is almost as powerful as computers from 20 years ago!',
      'The CPU gets very hot when working hard and needs a cooling fan.',
    ],
    practice: {
      title: 'CPU Speed Comparison',
      description: 'If CPU A can do 2 billion operations per second and CPU B can do 4 billion operations per second, which one is twice as fast? If a task requires 8 billion operations, how long does each CPU take?',
      hint: 'Operations per second = GHz. Time = Total operations / Operations per second.',
      solution: `CPU B (4 GHz) is twice as fast as CPU A (2 GHz).

For 8 billion operations:
- CPU A (2 GHz): 8 billion ÷ 2 billion = 4 seconds
- CPU B (4 GHz): 8 billion ÷ 4 billion = 2 seconds

CPU B completes it in half the time because it's twice as fast.`,
    },
  },
  {
    id: 'cb-memory-storage',
    category: 'Hardware',
    title: 'Memory and Storage',
    difficulty: 'Intermediate',
    xp: 75,
    theory: [
      'Computers have two types of memory: RAM (working memory) and Storage (permanent memory). Think of RAM as your desk where you work right now, and Storage as a file cabinet where you keep documents permanently.',
      'RAM (Random Access Memory) is fast temporary memory that the CPU uses while programs are running. When you open an app, it loads from storage into RAM. RAM is very fast—the CPU can access data in billionths of a second. However, RAM is cleared when you turn off the computer.',
      'Storage (Hard Drive or SSD) is permanent memory where your files stay forever. Unlike RAM, storage doesn\'t need electricity to remember data. When you save a file, it goes into storage where it stays even after you power off the computer.',
      'The difference in size is huge: You might have 8 GB of RAM but 500 GB of storage. RAM is expensive and fast. Storage is cheaper but slower. Modern computers use SSDs (Solid State Drives) instead of old hard drives because SSDs are faster and more reliable.',
    ],
    code: `RAM vs STORAGE - Two Types of Memory:

┌─────────────────────────────────────┐
│  RAM (Random Access Memory)         │
│  • Fast (nanoseconds)               │
│  • Temporary (clears on shutdown)   │
│  • Small (8GB, 16GB, 32GB)          │
│  • Expensive                        │
│  • Used for: Current work           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  STORAGE (Hard Drive / SSD)         │
│  • Slower (milliseconds)            │
│  • Permanent (stays on power off)   │
│  • Large (256GB, 512GB, 1TB)        │
│  • Cheaper                          │
│  • Used for: Saving files forever   │
└─────────────────────────────────────┘

Real-World Example:
You have a backpack (Storage - holds everything)
And a desk (RAM - where you work right now)
You take books from backpack to desk to study
After studying, you put books back in backpack`,
    notes: [
      'RAM is like a work desk—everything here is temporary.',
      'Storage is like a filing cabinet—everything here stays permanently.',
      'SSDs are faster than old hard drives (HDDs).',
      'Your phone has both RAM and storage, just like a computer.',
    ],
    practice: {
      title: 'RAM vs Storage Scenarios',
      description: 'For each scenario, say whether it involves RAM or Storage: (1) You save a photo to your phone, (2) You open an app and it loads, (3) You watch a YouTube video, (4) You create a document and save it to your computer.',
      hint: 'RAM = while running/working. Storage = when saved/permanent.',
      solution: `1. Save a photo → STORAGE (it stays there forever)
2. Open and load an app → RAM (app runs in memory)
3. Watch YouTube video → RAM (video stream runs in memory)
4. Create and save document → STORAGE (saved file stays permanent)

Remember: RAM = temporary work area. Storage = permanent file cabinet.`,
    },
  },
  {
    id: 'cb-hardware-software',
    category: 'Fundamentals',
    title: 'Hardware vs Software',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'Hardware and Software are two completely different things that work together. Hardware is the physical stuff you can touch—the monitor, keyboard, CPU, and hard drive. Software is the invisible instructions (programs) that tell hardware what to do.',
      'Hardware is like a musical instrument. A guitar is just an object until a musician picks it up and plays it. Similarly, a computer is just a machine until software tells it what to do. Hardware without software is useless, and software needs hardware to run on.',
      'Examples of Hardware: CPU, RAM, Hard Drive, Monitor, Keyboard, Mouse, Speaker, Printer, Motherboard. All of these are physical objects you can hold.',
      'Examples of Software: Windows (OS), Microsoft Word, Google Chrome, Games, TikTok, WhatsApp, YouTube. Software is invisible—it\'s made of code (instructions) that you download and install.',
      'You buy hardware from shops because it\'s physical. Software you usually download from the internet for free or low cost. If hardware breaks, you replace it. If software has bugs, you update it. Both are necessary for modern computers.',
    ],
    code: `HARDWARE vs SOFTWARE:

HARDWARE (Physical Things):
✓ Can touch and see
✓ Breaks over time
✓ Bought from shops
✓ Examples: Mouse, Monitor, Keyboard, CPU

SOFTWARE (Invisible Instructions):
✓ Cannot touch or see
✓ Never wears out
✓ Downloaded from internet
✓ Examples: Games, Apps, Operating System

Analogy: Car
- Hardware = Car body, engine, wheels, steering wheel
- Software = Instructions to start, turn, accelerate, brake

Real Examples:
Computer Hardware: Keyboard, Monitor, Hard Drive
Computer Software: Windows, Chrome, Microsoft Word, Games

Phone Hardware: Screen, Camera, Battery, Processor
Phone Software: Android, iPhone apps, WhatsApp, Instagram`,
    notes: [
      'Hardware alone = expensive useless metal box.',
      'Software alone = cannot run without hardware.',
      'Together they create the computers we use daily.',
      'A phone is also hardware + software working together.',
    ],
    practice: {
      title: 'Classify Hardware vs Software',
      description: 'Classify each item as Hardware or Software: Smartphone, Internet Explorer, Printer, Adobe Photoshop, Hard Drive, Gmail, Monitor, Python Programming Language.',
      hint: 'Hardware = physical thing you can touch. Software = program/app you can\'t touch.',
      solution: `HARDWARE:
1. Smartphone - physical device
2. Printer - physical device
3. Hard Drive - physical device
4. Monitor - physical device

SOFTWARE:
1. Internet Explorer - web browser (program)
2. Adobe Photoshop - image editor (program)
3. Gmail - email service (program)
4. Python Programming Language - coding language (program)`,
    },
  },
  {
    id: 'cb-operating-system',
    category: 'Software',
    title: 'Operating System',
    difficulty: 'Intermediate',
    xp: 75,
    theory: [
      'An Operating System (OS) is the most important software on a computer. Just like a teacher manages a classroom, the OS manages all the hardware and other software. Without an OS, your computer would be completely useless.',
      'The OS does many important jobs: It lets you open files and programs, manages memory and storage, controls devices like printers, handles internet connections, and protects your computer from viruses. Everything you do on a computer goes through the OS.',
      'Common Operating Systems: Windows (most desktop computers), macOS (Apple computers), Linux (free and open-source), Android (smartphones), iOS (iPhones). Each OS looks different but does the same basic jobs.',
      'The OS provides a visual interface (Desktop) with icons, folders, and windows. This makes computers easy to use. Behind the scenes, the OS is constantly managing tasks, ensuring programs don\'t interfere with each other, and protecting your data.',
    ],
    code: `OPERATING SYSTEM - The Manager of Everything:

OS Jobs:
1. File Management - Open, save, organize files
2. Program Running - Let you run apps
3. Device Control - Manage printer, monitor, keyboard
4. Memory Management - Allocate RAM to programs
5. Security - Protect from viruses and bad software
6. Internet Management - Handle network connections

Common Operating Systems:

┌──────────────────────────────────┐
│ WINDOWS - Most common for PCs    │
│ MACOS - Apple computers          │
│ LINUX - Free, open-source        │
│ ANDROID - Most smartphones       │
│ iOS - iPhones only              │
└──────────────────────────────────┘

What OS Does When You Click "Save":
1. Receives save command
2. Opens file dialog
3. Manages hard drive space
4. Writes file to storage
5. Updates file list
6. Shows success message`,
    notes: [
      'Your computer won\'t work without an operating system.',
      'Different computers use different OS (Windows, Mac, Linux).',
      'OS updates are important for security and bug fixes.',
      'Even phones have operating systems (Android or iOS).',
    ],
    practice: {
      title: 'What Does the OS Do?',
      description: 'Describe all the OS tasks that happen when you: (1) Open a game, (2) Save a document, (3) Connect to wifi, (4) Print a page.',
      hint: 'Think about file access, memory, device control, and coordination between parts.',
      solution: `1. Open a game:
   - Find game file on hard drive
   - Load it into RAM
   - Allocate CPU processing power
   - Initialize graphics and sound devices
   - Display game window

2. Save a document:
   - Open file dialog
   - Check available storage
   - Write file to hard drive
   - Update file list
   - Show confirmation

3. Connect to WiFi:
   - Detect WiFi networks
   - Store WiFi password securely
   - Manage network connection
   - Route data through network

4. Print a page:
   - Communicate with printer
   - Convert document to print format
   - Send data to printer
   - Monitor printing progress
   - Show print status`,
    },
  },
  {
    id: 'cb-internet-web',
    category: 'Internet',
    title: 'Internet and World Wide Web',
    difficulty: 'Intermediate',
    xp: 75,
    theory: [
      'The Internet is a global network of computers connected together. Billions of computers around the world are connected by cables and wireless signals. When you send a message, it travels through this network to reach someone on the other side of the world almost instantly.',
      'The World Wide Web (or "Web") is a system that uses the Internet. It was invented in 1989 by Tim Berners-Lee at CERN laboratory. The Web uses "websites" (like Google, YouTube, Wikipedia) that you access through a browser. Think of the Internet as the roads and the Web as the cars using those roads.',
      'To connect to the Internet, you need an Internet Service Provider (ISP). Companies like Jio, Airtel, BSNL in India provide internet to homes and schools. They connect your computer to their network, which then connects to the global Internet.',
      'Every website has a unique address called a URL (Uniform Resource Locator), like www.google.com. When you type a URL in your browser, it sends a request through the Internet to a server (a computer that stores the website). That server sends back the website information to display on your screen.',
    ],
    code: `INTERNET and WEB - Global Communication:

Internet = Network of Connected Computers:
┌─────────────────────────────────┐
│  Your Computer                  │
│       ↓                          │
│  Internet Service Provider (ISP)│
│       ↓                          │
│  Global Internet Network        │
│       ↓                          │
│  Another Person's Computer      │
└─────────────────────────────────┘

Web = System Using Internet:
1. You type URL: www.google.com
2. Browser sends request through Internet
3. Google server receives request
4. Server sends website to you
5. Your browser displays website

URL Format:
www.example.com
│   │
│   └─ Domain name
└────── Subdomain (www = World Wide Web)

How Data Travels:
Your message breaks into tiny packets
Each packet travels separately through network
They might take different routes
All packets arrive at destination
Reconstructed into original message`,
    notes: [
      'Internet connects computers worldwide with cables and signals.',
      'Web is websites accessed through browsers on the internet.',
      'ISP is the company that gives you internet access.',
      'Data travels in tiny packets through multiple routes.',
    ],
    practice: {
      title: 'How the Web Works',
      description: 'Trace the path of a web request: You want to visit Facebook. Describe every step from clicking a link to seeing the Facebook page on your screen.',
      hint: 'Think about: your computer → ISP → internet → Facebook server → back to you.',
      solution: `1. You type "facebook.com" in browser address bar
2. Browser sends request through internet
3. Your ISP routes request through their servers
4. Request travels across internet to Facebook data center
5. Facebook server receives your request
6. Server checks: "Who is this user? What page do they want?"
7. Server prepares Facebook homepage content
8. Server sends website data back through internet
9. Data arrives at your ISP
10. Your ISP routes it to your computer
11. Your browser displays the website
12. You see Facebook page on your screen!`,
    },
  },
  {
    id: 'cb-email-communication',
    category: 'Internet',
    title: 'Email and Communication',
    difficulty: 'Beginner',
    xp: 50,
    theory: [
      'Email (electronic mail) is a way to send messages through the Internet. Instead of writing a letter and waiting days for it to arrive, email delivers your message almost instantly to anyone with an email address, anywhere in the world.',
      'An email address looks like "student@gmail.com". The part before the @ symbol is your username (your chosen name), and the part after @ is your email provider (like Gmail, Yahoo, Outlook, Microsoft). The email provider is the company that stores your emails on their servers.',
      'Sending an email is simple: Write your message, add the recipient\'s email address, add a subject line (the topic), and click Send. Your message travels through the Internet to the recipient\'s email server, and they can read it whenever they open their email.',
      'Email is perfect for school and work communication. Teachers send assignments via email, parents contact schools, and students collaborate on projects. Many schools now use Google Classroom and Outlook that include email and other features combined.',
    ],
    code: `EMAIL - Electronic Mail System:

Email Address Format:
username@provider.com
│        │
│        └─ Email provider (Gmail, Yahoo, Outlook)
└────────── Your chosen username

Sending an Email:
1. Open email application
2. Click "Compose" or "New Email"
3. Enter recipient's email address
4. Write subject line (topic)
5. Type your message
6. Click "Send"
7. Email travels through internet to recipient's server
8. Recipient reads it when they check email

Common Email Providers:
• Gmail (Google)
• Outlook (Microsoft)
• Yahoo Mail
• Hotmail

Parts of an Email:
Subject: The topic (visible in inbox)
To: Who receives the email
From: Who sent it (usually you)
Body: Your actual message
Attachments: Files you can include`,
    notes: [
      'Email reaches recipients almost instantly through the internet.',
      'You can attach files (photos, documents) to emails.',
      'Once sent, email is permanent—be careful what you send.',
      'Use email safely—never share passwords or personal information.',
    ],
    practice: {
      title: 'Email Communication',
      description: 'Write a sample email from a student to a teacher asking about homework. Include: proper email format, subject line, greeting, body with question, and sign-off.',
      hint: 'Include To:, From:, Subject:, greeting, body, and closing.',
      solution: `To: teacher@school.com
From: student@gmail.com
Subject: Question about Math Homework Assignment

Dear Mr./Mrs. [Teacher Name],

I hope you are well. I am writing to ask a question about the math homework you assigned in class today.

Could you please clarify question #5 about solving quadratic equations? I understood the first three problems, but I am unsure about the approach for number 5.

Would you be available to help during lunch or after class? I want to make sure I understand this concept properly.

Thank you for your help!

Best regards,
[Student Name]
Grade 8-A
Roll Number: [Number]`,
    },
  },
  {
    id: 'cb-cyber-safety',
    category: 'Safety',
    title: 'Cyber Safety',
    difficulty: 'Intermediate',
    xp: 100,
    theory: [
      'Cyber safety means protecting yourself online, just like physical safety protects you in the real world. The internet is a wonderful tool for learning and having fun, but it also has risks. Learning cyber safety now will protect you throughout your life.',
      'Password safety is crucial. Never share your passwords with anyone—not friends, not teachers, not even parents. Use strong passwords that mix letters, numbers, and symbols. Change passwords regularly. A strong password is like a strong lock on your door.',
      'Be careful what you share online. Personal information like your home address, phone number, school name, and birthday should NEVER be posted publicly on the internet. Cybercriminals can use this information to harm you or your family.',
      'Don\'t talk to strangers online. People online might not be who they claim to be. Never agree to meet someone you met online, and always tell a parent if someone makes you uncomfortable or asks you to keep secrets.',
      'Cyberbullying is when people are mean, rude, or hurtful to you online. If you face cyberbullying, don\'t respond, don\'t retaliate, save the messages as evidence, and tell a trusted adult immediately. Cyberbullying is serious and illegal in India.',
    ],
    code: `CYBER SAFETY RULES FOR STUDENTS:

PASSWORD SAFETY:
✗ DON'T: Share passwords, use easy passwords, reuse passwords
✓ DO: Use mix of uppercase, lowercase, numbers, symbols
      Change password every 3 months
      Use different passwords for different accounts

Example Strong Password: Syllab@2026Math!

PERSONAL INFORMATION:
✗ DON'T SHARE:
  - Home address
  - School name
  - Phone number
  - Birthday
  - Parent's names
  - Financial information

✓ SAFE TO SHARE:
  - Hobbies (reading, sports)
  - Interests (science, art)
  - School subjects you like

ONLINE BEHAVIOR:
✗ DON'T:
  - Talk to strangers
  - Meet online friends in person
  - Click links from unknown people
  - Download files from unknown sources

✓ DO:
  - Tell parent if uncomfortable
  - Block people being mean
  - Report abuse to platform
  - Think before posting`,
    notes: [
      'Your password is your security—protect it like a treasure.',
      'Once something is posted online, it can\'t be deleted completely—think before posting.',
      'Never share personal information online—not even with "friends."',
      'If anything feels wrong online, talk to a trusted adult immediately.',
    ],
    practice: {
      title: 'Cyber Safety Scenarios',
      description: 'For each scenario, explain the cyber safety risk and the correct action: (1) Someone online asks for your school name, (2) A person messages asking to meet in person, (3) Someone sends you a mean comment on your post.',
      hint: 'Think about personal information safety, stranger danger, and cyberbullying.',
      solution: `1. Someone asks for your school name:
   Risk: Could be used to locate you or steal your identity
   Action: Don't share. Tell parent if they keep asking.

2. Person messages to meet in person:
   Risk: Could be a stranger pretending to be someone else
   Action: Say no. Block them. Tell parent immediately.

3. Someone sends a mean comment:
   Risk: Cyberbullying can hurt emotions and get worse
   Action: Don't respond or fight back. Take screenshot. Tell parent/teacher.`,
    },
  },
  {
    id: 'cb-intro-coding',
    category: 'Software',
    title: 'Introduction to Coding',
    difficulty: 'Beginner',
    xp: 100,
    theory: [
      'Coding (or Programming) is writing instructions for computers in a language they understand. Just as recipes give step-by-step instructions for cooking, code gives step-by-step instructions for computers. Every app, game, and website was created by programmers writing code.',
      'Code is written in special programming languages. Common ones include Python (easy for beginners), JavaScript (for web), Java (for apps), and C++ (for games). Each language has its own rules and style, but they all share the same idea: give clear instructions for solving problems.',
      'A Programmer is someone who writes code to create software. Good programmers think logically, break big problems into smaller steps, and fix mistakes (called "debugging"). Programming teaches you to solve problems creatively and systematically.',
      'Learning to code teaches logical thinking skills that help with math, science, and everyday problem-solving. You learn to think step-by-step, find patterns, and test your solutions. These skills are valuable in almost every career.',
      'The tech industry is the fastest-growing industry in India and worldwide. If you learn coding in school now, you\'ll have amazing career opportunities. Companies like Google, Microsoft, TCS, Infosys, and startups are always hiring programmers with great salaries.',
    ],
    code: `CODING - Writing Instructions for Computers:

Example: Make a Peanut Butter Sandwich
Coded Instructions:
1. Take out peanut butter from cupboard
2. Take out bread from bag
3. Take out a knife from drawer
4. Open peanut butter jar
5. Spread peanut butter on bread
6. Close peanut butter jar
7. Put bread in plate
8. Eat!

This is CODING = Clear step-by-step instructions

Simple Programming Languages:

Python (Easiest for Beginners):
  print("Hello, World!")
  name = input("What's your name?")
  print("Welcome", name)

JavaScript (For Web):
  alert("Hello!");
  console.log("This appears in console");

Why Learn Coding?
- Create games and apps
- Solve problems creatively
- Develop logical thinking
- Launch tech career
- Make money as freelancer`,
    notes: [
      'Coding teaches logical and creative thinking.',
      'Every app and game is made by programmers.',
      'Mistakes in code are called "bugs"—finding them is "debugging."',
      'You don\'t need to be a math genius to code—just think logically!',
    ],
    practice: {
      title: 'Write Step-by-Step Instructions',
      description: 'Write coded instructions (step-by-step like a recipe) for: (1) Making tea, (2) Opening a file on a computer, (3) Playing a video game level.',
      hint: 'Each step should be specific and clear. Imagine a robot reading your instructions.',
      solution: `1. MAKING TEA:
   1. Fill kettle with water
   2. Turn on kettle
   3. Get a cup
   4. Put tea bag in cup
   5. Wait for water to boil
   6. Pour hot water into cup
   7. Wait 3-5 minutes
   8. Remove tea bag
   9. Add milk (optional)
   10. Drink tea

2. OPENING A FILE:
   1. Click on File Manager
   2. Navigate to Documents folder
   3. Find the file named "homework.txt"
   4. Double-click on the file
   5. File opens in text editor
   6. You can now read the file

3. PLAYING VIDEO GAME LEVEL:
   1. Start game
   2. Wait for level to load
   3. See the objective on screen
   4. Use arrow keys to move character
   5. Press space to jump
   6. Avoid obstacles
   7. Collect coins for points
   8. Reach the goal
   9. Level complete!`,
    },
  },
];
