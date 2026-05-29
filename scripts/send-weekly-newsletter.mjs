#!/usr/bin/env node
/**
 * Weekly Newsletter Sender
 * Sends personalized weekly emails to students and parents
 *
 * Usage:
 *   npm run newsletter:send           # Send real emails (requires RESEND_API_KEY)
 *   DRY_RUN=true npm run newsletter:send  # Log what would be sent
 *
 * Requires:
 *   RESEND_API_KEY - Resend service API key
 *   FIREBASE_SERVICE_ACCOUNT_JSON - Firebase admin SDK key (or path)
 *   NEWSLETTER_FROM_EMAIL - sender email (default: support@syllab.in)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Configuration from environment
const DRY_RUN = process.env.DRY_RUN === 'true';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || 'support@syllab.in';

// Mock Firebase Admin SDK (replace with real imports in production)
const mockFirebaseAdmin = {
  initializeApp: () => {},
  firestore: () => ({
    collection: (name) => ({
      where: () => ({
        get: async () => ({
          docs: [],
        }),
      }),
      doc: () => ({
        set: async () => {},
      }),
    }),
  }),
};

// Question pools for stats (mock data)
const COMMON_TOPICS = [
  'Quadratic Equations',
  'Trigonometry Basics',
  'Atomic Structure',
  'Photosynthesis',
  'Newton\'s Laws',
  'Chemical Bonding',
  'Calculus Fundamentals',
  'Redox Reactions',
  'Circular Motion',
  'Organic Chemistry',
];

const WEAK_AREAS = [
  'Complex Numbers',
  'Wave Optics',
  'Thermodynamics',
  'Coordination Compounds',
  'Integration Techniques',
];

/**
 * Mock blog data (from autoBlogs.json structure)
 */
const MOCK_BLOGS = [
  {
    id: 'ai-tools-education-2026',
    title: 'How AI is Changing Education in India 2026: ChatGPT, Claude, and Study Apps',
    description: 'Explore how AI tools like ChatGPT, Claude, and AI learning platforms are revolutionizing education.',
    date: 'May 28, 2026',
    readTime: '7 min read',
    category: 'Technology',
  },
  {
    id: 'best-free-apps-class-11-12',
    title: 'Top 10 Free Apps for Class 11 & 12 Students in 2026: Study Smarter',
    description: 'Curated list of the best free educational apps for Class 11 and 12 students.',
    date: 'May 28, 2026',
    readTime: '6 min read',
    category: 'Resources',
  },
  {
    id: 'cbse-class-10-board-tips',
    title: 'How to Score 90+ in Class 10 CBSE Board Exams 2026: Subject-Wise Strategy',
    description: 'Proven strategies and tips to help you score 90+ in Class 10 CBSE board exams.',
    date: 'May 28, 2026',
    readTime: '8 min read',
    category: 'Class 10',
  },
  {
    id: 'jee-preparation-guide',
    title: 'JEE Mains 2027 Preparation Guide: How to Start from Class 11',
    description: 'A complete roadmap for JEE Mains preparation starting from Class 11.',
    date: 'May 12, 2026',
    readTime: '10 min read',
    category: 'JEE',
  },
];

/**
 * Filter blogs appropriate for a class
 */
function getAppropriateBlogsForClass(cls, blogs) {
  // Class 1-5: Daily Dose, coding-for-kids, study basics
  // Class 6-8: NCERT tips, science fair, intermediate coding
  // Class 9-10: Board exam prep, foundation JEE/NEET, important chapters
  // Class 11-12: JEE/NEET/EAMCET, advanced coding, career advice

  if (cls >= 1 && cls <= 5) {
    return blogs.filter(b => ['Daily Dose', 'Coding', 'Basics'].some(k => b.category.includes(k) || b.title.includes(k)));
  } else if (cls >= 6 && cls <= 8) {
    return blogs.filter(b => !b.category.includes('JEE') && !b.category.includes('NEET'));
  } else if (cls >= 9 && cls <= 10) {
    return blogs.filter(b => ['Class 10', 'Class 9', 'Board'].some(k => b.title.includes(k) || b.category.includes(k)) ||
                             !b.category.includes('Class 11') && !b.category.includes('Class 12'));
  } else if (cls >= 11) {
    return blogs;
  }

  return blogs.slice(0, 3);
}

/**
 * Generate mock student stats
 */
function generateMockStats() {
  return {
    xp: Math.floor(Math.random() * 1000),
    streak: Math.floor(Math.random() * 30),
    completedTopics: COMMON_TOPICS.slice(0, Math.floor(Math.random() * 5) + 2),
    weakAreas: WEAK_AREAS.slice(0, Math.floor(Math.random() * 3)),
  };
}

/**
 * Student Newsletter HTML
 */
function generateStudentHTML(name, stats, blogs) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Weekly Progress Report</title>
</head>
<body style="margin: 0; padding: 0; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: white;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your Weekly Learning Report</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Hey ${name}! Here's your progress</p>
    </div>

    <div style="padding: 30px 20px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #86efac;">
          <div style="font-size: 32px; font-weight: bold; color: #16a34a;">${stats.xp}</div>
          <div style="color: #4b5563; font-size: 14px; margin-top: 5px;">XP Earned This Week</div>
        </div>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #fca5a5;">
          <div style="font-size: 32px; font-weight: bold; color: #dc2626;">${stats.streak}</div>
          <div style="color: #4b5563; font-size: 14px; margin-top: 5px;">Day Streak</div>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Topics You Completed</h2>
        <ul style="margin: 0; padding-left: 20px; color: #334155;">
          ${stats.completedTopics.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>

      ${stats.weakAreas.length > 0 ? `
        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
          <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">Areas to Focus On</h3>
          <ul style="margin: 0; padding-left: 20px; color: #78350f;">
            ${stats.weakAreas.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-bottom: 25px;">
        <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Recommended Resources</h2>
        ${blogs.map(b => `
          <div style="margin: 15px 0; padding: 15px; border-left: 4px solid #3b82f6; background: #f0f9ff;">
            <h3 style="margin: 0 0 8px 0; color: #1e40af; font-size: 16px;">${b.title}</h3>
            <p style="margin: 8px 0; color: #64748b; font-size: 14px;">${b.description}</p>
            <div style="font-size: 12px; color: #94a3b8;">
              <span>${b.date}</span> • <span>${b.category}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://syllab.in" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Continue Learning
        </a>
      </div>
    </div>

    <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">Syllab.in — Your AI-powered learning companion</p>
      <p style="margin: 0;"><a href="https://syllab.in/unsubscribe" style="color: #667eea; text-decoration: none;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Parent Newsletter HTML
 */
function generateParentHTML(parentName, childName, childClass, stats, blogs) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Child's Weekly Progress</title>
</head>
<body style="margin: 0; padding: 0; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: white;">
    <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your Child's Weekly Report</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Class ${childClass} • ${childName}</p>
    </div>

    <div style="padding: 30px 20px;">
      <p style="color: #334155; font-size: 15px; margin-bottom: 20px;">
        Hi ${parentName}, here's how ${childName} is learning this week on Syllab.in.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; border: 1px solid #93c5fd;">
          <div style="font-size: 28px; font-weight: bold; color: #0369a1;">${stats.xp} XP</div>
          <div style="color: #0c4a6e; font-size: 14px; margin-top: 5px;">Earned This Week</div>
        </div>
        <div style="background: #fce7f3; padding: 20px; border-radius: 8px; border: 1px solid #fbcfe8;">
          <div style="font-size: 28px; font-weight: bold; color: #be185d;">${stats.streak} Days</div>
          <div style="color: #831843; font-size: 14px; margin-top: 5px;">Consecutive Days</div>
        </div>
      </div>

      <div style="background: #ede9fe; padding: 15px; border-radius: 6px; border-left: 4px solid #a78bfa; margin-bottom: 25px;">
        <h3 style="margin: 0 0 10px 0; color: #5b21b6; font-size: 16px;">This Week's Summary</h3>
        <p style="margin: 0; color: #6d28d9; font-size: 14px; line-height: 1.6;">
          ${stats.xp > 500 ? 'Excellent effort! Your child is consistently engaged.' :
            stats.xp > 200 ? 'Good progress! Encourage them to practice more.' :
            'They are getting started. Support them with daily 30-minute sessions!'}
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://syllab.in/parent-dashboard" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          View Dashboard
        </a>
      </div>
    </div>

    <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
      <p style="margin: 0;">Syllab.in — Free AI tutor for NCERT, JEE, NEET & board exams</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send email via Resend
 */
async function sendEmailViaResend(to, subject, html) {
  if (DRY_RUN) {
    console.log(`  [DRY_RUN] Would send email to ${to}`);
    return { success: true, id: 'dry-run-' + Date.now() };
  }

  if (!RESEND_API_KEY) {
    console.warn(`  ⚠️  No RESEND_API_KEY found. Logging instead of sending.`);
    return { success: false, error: 'No API key' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      console.warn(`  ⚠️  Failed to send to ${to}: ${response.status}`);
      return { success: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.warn(`  ⚠️  Error sending to ${to}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Log email sent to Firestore
 */
async function logEmailSent(db, email, recipientType, recipientName, result) {
  if (!db) return; // Skip if no DB

  try {
    const logEntry = {
      timestamp: new Date(),
      email,
      recipientType, // 'student' or 'parent'
      recipientName,
      status: result.success ? 'sent' : 'failed',
      messageId: result.id || null,
      error: result.error || null,
    };

    // In real implementation, write to Firestore:
    // await db.collection('email_log').add(logEntry);
    console.log(`  ✓ Logged ${recipientType} email for ${recipientName}`);
  } catch (error) {
    console.warn(`  ⚠️  Failed to log email: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Sending weekly newsletters...\n');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (simulated)' : 'LIVE (real emails)'}`);
  console.log(`From: ${FROM_EMAIL}`);
  console.log();

  // Mock database
  const db = null; // Would be initialized with Firebase Admin SDK

  // Mock user data (in production, fetch from Firestore)
  const mockUsers = [
    { id: '1', type: 'student', name: 'Arjun', email: 'arjun@example.com', class: 10, emailOptOut: false },
    { id: '2', type: 'parent', name: 'Mrs. Sharma', childName: 'Priya', childClass: 9, email: 'sharma@example.com', emailOptOut: false },
    { id: '3', type: 'student', name: 'Divya', email: 'divya@example.com', class: 12, emailOptOut: false },
  ];

  let sentCount = 0;
  let failedCount = 0;

  // Get appropriate blogs for sending
  const blogs = MOCK_BLOGS.slice(0, 3); // Send 3 most recent

  for (const user of mockUsers) {
    if (user.emailOptOut) {
      console.log(`⊘ Skipping ${user.name} (opted out)`);
      continue;
    }

    if (user.type === 'student') {
      console.log(`→ ${user.name} (Class ${user.class})`);
      const stats = generateMockStats();
      const userBlogs = getAppropriateBlogsForClass(user.class, blogs);
      const html = generateStudentHTML(user.name, stats, userBlogs);
      const result = await sendEmailViaResend(user.email, 'Your Weekly Learning Report', html);

      if (result.success) {
        await logEmailSent(db, user.email, 'student', user.name, result);
        sentCount++;
      } else {
        failedCount++;
      }
    } else if (user.type === 'parent') {
      console.log(`→ ${user.name} (Parent of ${user.childName})`);
      const stats = generateMockStats();
      const userBlogs = getAppropriateBlogsForClass(user.childClass, blogs);
      const html = generateParentHTML(user.name, user.childName, user.childClass, stats, userBlogs);
      const result = await sendEmailViaResend(user.email, `${user.childName}'s Weekly Progress`, html);

      if (result.success) {
        await logEmailSent(db, user.email, 'parent', user.name, result);
        sentCount++;
      } else {
        failedCount++;
      }
    }
  }

  console.log(`\n✅ Sent: ${sentCount}`);
  if (failedCount > 0) console.log(`⚠️  Failed: ${failedCount}`);

  if (DRY_RUN) {
    console.log('\n[DRY_RUN] No actual emails were sent. Remove DRY_RUN=true to send real emails.');
  }
}

// Helper function to filter blogs by class
function getAppropriateBlogsForClass(cls, blogs) {
  if (cls >= 1 && cls <= 5) {
    return blogs.filter(b => !['JEE', 'NEET', 'Board'].some(k => b.title.includes(k)));
  } else if (cls >= 6 && cls <= 8) {
    return blogs.filter(b => !b.title.includes('JEE') && !b.title.includes('NEET'));
  } else if (cls >= 9 && cls <= 10) {
    return blogs.filter(b => !b.title.includes('Class 11') && !b.title.includes('Class 12'));
  }
  return blogs;
}

// Run
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
