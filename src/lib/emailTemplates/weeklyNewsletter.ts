/**
 * Email templates for weekly newsletter
 */

export interface StudentStats {
  xp: number;
  streak: number;
  completedTopics: string[];
  weakAreas: string[];
  className: number;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

/**
 * Generate HTML for student newsletter with performance + blogs
 */
export function studentNewsletterHTML(
  studentName: string,
  stats: StudentStats,
  blogs: BlogPost[]
): string {
  const blogHTML = blogs.map((blog) => `
    <div style="margin: 15px 0; padding: 15px; border-left: 4px solid #3b82f6; background: #f0f9ff;">
      <h3 style="margin: 0 0 8px 0; color: #1e40af; font-size: 16px;">${blog.title}</h3>
      <p style="margin: 8px 0; color: #64748b; font-size: 14px;">${blog.description}</p>
      <div style="font-size: 12px; color: #94a3b8;">
        <span>${blog.date}</span> • <span>${blog.category}</span>
      </div>
    </div>
  `).join('');

  const topicsHTML = stats.completedTopics.length > 0
    ? `<li>${stats.completedTopics.join('</li><li>')}</li>`
    : '<li style="color: #64748b;">No topics completed yet. Start learning today!</li>';

  const weakAreasHTML = stats.weakAreas.length > 0
    ? `<li>${stats.weakAreas.join('</li><li>')}</li>`
    : '<li style="color: #10b981;">No weak areas detected! Great job!</li>';

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
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your Weekly Learning Report</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Hey ${studentName}! Here's your progress</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 30px 20px;">
      <!-- Stats Section -->
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

      <!-- Completed Topics -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
          Topics You Completed
        </h2>
        <ul style="margin: 0; padding-left: 20px; color: #334155;">
          ${topicsHTML}
        </ul>
      </div>

      <!-- Weak Areas -->
      <div style="margin-bottom: 25px; background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">Areas to Focus On</h3>
        <ul style="margin: 0; padding-left: 20px; color: #78350f;">
          ${weakAreasHTML}
        </ul>
      </div>

      <!-- Featured Blog Posts -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
          Recommended Learning Resources
        </h2>
        ${blogHTML}
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://syllab.in" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Continue Learning on Syllab
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        <strong>Syllab.in</strong> — Your AI-powered learning companion for NCERT, JEE, NEET & board exams
      </p>
      <p style="margin: 8px 0;">
        <a href="https://syllab.in/unsubscribe" style="color: #667eea; text-decoration: none;">Unsubscribe from emails</a> •
        <a href="https://syllab.in/settings" style="color: #667eea; text-decoration: none;">Email preferences</a>
      </p>
      <p style="margin: 8px 0; opacity: 0.8;">
        Copyright © 2026 Syllab.in. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate HTML for parent newsletter showing child's performance
 */
export function parentNewsletterHTML(
  parentName: string,
  childName: string,
  childClass: number,
  stats: StudentStats,
  blogs: BlogPost[]
): string {
  const recommendation = getParentRecommendation(stats);

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
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Your Child's Weekly Report</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Class ${childClass} • ${childName}</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 30px 20px;">
      <p style="color: #334155; font-size: 15px; margin-bottom: 20px;">
        Hi ${parentName}, here's how ${childName} is performing this week on Syllab.in.
      </p>

      <!-- Performance Cards -->
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

      <!-- Progress Summary -->
      <div style="background: #ede9fe; padding: 15px; border-radius: 6px; border-left: 4px solid #a78bfa; margin-bottom: 25px;">
        <h3 style="margin: 0 0 10px 0; color: #5b21b6; font-size: 16px;">Progress Summary</h3>
        <p style="margin: 0; color: #6d28d9; font-size: 14px; line-height: 1.6;">
          ${recommendation}
        </p>
      </div>

      <!-- Learning Areas -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #0f172a; font-size: 16px; margin: 0 0 10px 0;">Topics Completed</h3>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 4px; color: #16a34a; font-size: 14px; border-left: 3px solid #86efac;">
          ${stats.completedTopics.length > 0 ? stats.completedTopics.slice(0, 5).join(', ') : 'Encourage them to complete topics!'}
        </div>
      </div>

      <!-- Weak Areas Alert (if any) -->
      ${stats.weakAreas.length > 0 ? `
        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
          <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 15px;">Areas Needing Attention</h3>
          <p style="margin: 0; color: #78350f; font-size: 14px;">
            ${stats.weakAreas.slice(0, 3).join(', ')} — Please encourage your child to practice these topics more.
          </p>
        </div>
      ` : ''}

      <!-- Recommended Resources for Child -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #0f172a; font-size: 16px; margin: 0 0 12px 0;">Helpful Resources This Week</h3>
        <div style="font-size: 14px; color: #475569;">
          ${blogs.slice(0, 3).map(blog => `
            <div style="margin-bottom: 10px; padding: 10px; background: #f1f5f9; border-radius: 4px;">
              <strong>${blog.title}</strong><br/>
              <span style="color: #64748b; font-size: 12px;">${blog.category}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://syllab.in/parent-dashboard" style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          View Full Dashboard
        </a>
      </div>

      <div style="background: #fef2f2; padding: 15px; border-radius: 6px; border-left: 4px solid #fca5a5; font-size: 13px; color: #7f1d1d; line-height: 1.6;">
        <strong>Tip:</strong> Set weekly learning goals with your child to keep them motivated. Consistent practice is key to scoring well!
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        <strong>Syllab.in</strong> — Free AI tutor for NCERT, board exams, JEE & NEET
      </p>
      <p style="margin: 8px 0;">
        <a href="https://syllab.in/unsubscribe" style="color: #f97316; text-decoration: none;">Unsubscribe</a> •
        <a href="https://syllab.in/settings" style="color: #f97316; text-decoration: none;">Email preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate parent-friendly recommendation text
 */
function getParentRecommendation(stats: StudentStats): string {
  if (stats.xp > 500) {
    return `Excellent effort! Your child has earned ${stats.xp} XP this week and maintained a ${stats.streak}-day streak. They are consistently engaged with learning. Keep encouraging them to maintain this momentum!`;
  } else if (stats.xp > 200) {
    return `Good progress! Your child is showing consistent engagement with ${stats.xp} XP earned. Encourage them to increase their daily study time for faster progress.`;
  } else if (stats.xp > 0) {
    return `Your child has started learning with ${stats.xp} XP this week. Encourage them to practice more regularly for better results.`;
  } else {
    return `No activity yet this week. Please encourage your child to start learning on Syllab.in. Just 30 minutes a day can make a big difference!`;
  }
}
