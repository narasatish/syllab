/**
 * Syllab Email Templates
 * All emails sent from support@syllab.in via Resend
 * Brand: #10b981 (emerald/primary), #0f172a (slate-900)
 */

const BASE = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{SUBJECT}}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:#0f172a;border-radius:16px 16px 0 0;padding:28px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="background:#10b981;border-radius:10px;width:40px;height:40px;text-align:center;vertical-align:middle;">
            <span style="color:#fff;font-size:20px;font-weight:900;line-height:40px;">S</span>
          </td>
          <td style="padding-left:12px;vertical-align:middle;">
            <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Syllab</span>
          </td>
        </tr></table>
      </td>
      <td align="right" style="vertical-align:middle;">
        <span style="color:#64748b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">syllab.in</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:40px;">
    {{BODY}}
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
    <p style="margin:0 0 8px;font-size:12px;color:#64748b;">
      © 2026 Syllab AI · <a href="https://syllab.in" style="color:#10b981;text-decoration:none;">syllab.in</a>
    </p>
    <p style="margin:0;font-size:11px;color:#94a3b8;">
      support@syllab.in · India's AI Learning Platform for Class 5–12
    </p>
    <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;">
      <a href="{{UNSUBSCRIBE}}" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

function render(subject: string, body: string, unsubscribeUrl = 'https://syllab.in/unsubscribe') {
  return BASE
    .replace('{{SUBJECT}}', subject)
    .replace('{{BODY}}', body)
    .replace('{{UNSUBSCRIBE}}', unsubscribeUrl);
}

function h1(text: string) {
  return `<h1 style="margin:0 0 12px;font-size:28px;font-weight:900;color:#0f172a;line-height:1.2;">${text}</h1>`;
}
function p(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.6;">${text}</p>`;
}
function btn(text: string, url: string, color = '#10b981') {
  return `
  <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr><td style="background:${color};border-radius:12px;">
      <a href="${url}" style="display:inline-block;padding:14px 32px;color:#fff;font-size:14px;font-weight:900;text-decoration:none;letter-spacing:0.5px;">${text}</a>
    </td></tr>
  </table>`;
}
function divider() {
  return `<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>`;
}
function badge(text: string, color = '#10b981') {
  return `<span style="display:inline-block;background:${color}18;color:${color};font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:16px;">${text}</span>`;
}
function featureRow(icon: string, title: string, desc: string) {
  return `
  <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;width:100%;">
    <tr>
      <td style="width:40px;vertical-align:top;font-size:22px;padding-top:2px;">${icon}</td>
      <td style="padding-left:12px;vertical-align:top;">
        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#0f172a;">${title}</p>
        <p style="margin:0;font-size:13px;color:#64748b;">${desc}</p>
      </td>
    </tr>
  </table>`;
}

// ─── 1. WELCOME EMAIL ────────────────────────────────────────────────────────
export function welcomeEmail(displayName: string, role: 'student' | 'parent' = 'student') {
  const isParent = role === 'parent';
  const body = `
    ${badge(isParent ? '👋 Welcome, Parent!' : '🎓 Welcome, Student!')}
    ${h1(`Hi ${displayName || 'there'}, welcome to Syllab!`)}
    ${p(`You've just joined thousands of ${isParent ? 'families' : 'students'} learning smarter with AI. Your account is ready — no app download needed.`)}
    ${isParent ? `
      ${p('As a <strong>parent</strong>, you can:')}
      ${featureRow('📊', 'Track progress', 'See your child\'s XP, streak, and completed chapters in real time.')}
      ${featureRow('📝', 'Create exams', 'Generate custom practice exams for your child by class and subject.')}
      ${featureRow('🔗', 'Link accounts', 'Connect your child\'s Syllab account from the Parent Hub.')}
      ${btn('Go to Parent Hub →', 'https://syllab.in/parent')}
    ` : `
      ${p('Here\'s what you can do today:')}
      ${featureRow('📚', 'Explore your syllabus', 'Every NCERT chapter — summarised and searchable.')}
      ${featureRow('🎯', 'Practice with MCQs', '1,26,300+ questions across all subjects and classes.')}
      ${featureRow('⚡', 'Daily Dose', 'EAMCET, JEE, NEET — 10 questions daily. Build your streak.')}
      ${featureRow('🤖', 'AI Tutor', 'Ask anything, get step-by-step explanations 24/7.')}
      ${btn('Start Learning →', 'https://syllab.in')}
    `}
    ${divider()}
    ${p('<strong>Tip:</strong> Set your class in <a href="https://syllab.in/profile" style="color:#10b981;">Profile → Learning</a> for a personalised content feed.')}
    ${p('<span style="font-size:13px;color:#94a3b8;">If you didn\'t create this account, ignore this email.</span>')}
  `;
  return {
    subject: isParent ? 'Welcome to Syllab — Your Parent Hub is Ready! 👨‍👩‍👧' : 'Welcome to Syllab — Your AI Learning Journey Starts Now! 🎓',
    html: render('Welcome to Syllab', body),
  };
}

// ─── 2. FORGOT PASSWORD ───────────────────────────────────────────────────────
export function forgotPasswordEmail(displayName: string, resetLink: string) {
  const body = `
    ${badge('🔐 Password Reset')}
    ${h1(`Reset your password, ${displayName || 'there'}`)}
    ${p('We received a request to reset the password for your Syllab account. Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.')}
    ${btn('Reset My Password →', resetLink, '#0f172a')}
    ${divider()}
    ${p('<strong>Didn\'t request this?</strong> Ignore this email — your account is completely safe. No changes have been made.')}
    ${p('<span style="font-size:12px;color:#94a3b8;">If the button doesn\'t work, copy and paste this link into your browser:<br/><a href="${resetLink}" style="color:#10b981;word-break:break-all;">${resetLink}</a></span>'.replace(/\${resetLink}/g, resetLink))}
    ${p('<span style="font-size:12px;color:#94a3b8;">Security tip: Syllab will never ask for your password by email or phone.</span>')}
  `;
  return {
    subject: 'Reset your Syllab password 🔐',
    html: render('Reset your Syllab password', body),
  };
}

// ─── 3. PARENT INVITATION ─────────────────────────────────────────────────────
export function parentInvitationEmail(parentName: string, parentEmail: string, inviteLink: string) {
  const body = `
    ${badge('👨‍👩‍👧 Parent Invitation')}
    ${h1('Your parent wants to track your learning!')}
    ${p(`<strong>${parentName || parentEmail}</strong> has invited you to connect your Syllab account so they can support your studies.`)}
    <table cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:12px;padding:20px;margin:16px 0;width:100%;">
      <tr><td>
        ${featureRow('✅', 'They can see', 'Your XP, streak and completed chapters.')}
        ${featureRow('📝', 'They can create', 'Practice exams tailored to your class.')}
        ${featureRow('❌', 'They cannot', 'Change your account, password, or any settings.')}
      </td></tr>
    </table>
    ${btn('Accept & Sign Up →', inviteLink)}
    ${divider()}
    ${p('Already have a Syllab account? Sign in at <a href="https://syllab.in" style="color:#10b981;">syllab.in</a> — your accounts will link automatically when you use the link above.')}
    ${p('<span style="font-size:12px;color:#94a3b8;">If you don\'t want to connect, just ignore this email.</span>')}
  `;
  return {
    subject: `${parentName || 'A parent'} invited you to Syllab 👨‍👩‍👧`,
    html: render('Parent Invitation — Syllab', body),
  };
}

// ─── 4. WEEKLY NEWSLETTER ─────────────────────────────────────────────────────
export interface NewsletterData {
  displayName: string;
  classLevel?: string;
  xp?: number;
  streak?: number;
  weekOf: string; // e.g. "26 May 2026"
  newChapters?: Array<{ title: string; class: string; subject: string }>;
  studyTip?: string;
  challengeTitle?: string;
  challengeUrl?: string;
  upcomingExams?: Array<{ name: string; date: string }>;
}

export function weeklyNewsletterEmail(data: NewsletterData) {
  const {
    displayName, classLevel, xp = 0, streak = 0, weekOf,
    newChapters = [], studyTip, challengeTitle, challengeUrl,
    upcomingExams = [],
  } = data;

  const body = `
    ${badge('📬 Weekly Digest')}
    ${h1(`Your Syllab Week — ${weekOf}`)}
    ${p(`Hi ${displayName || 'there'}, here's what's new on Syllab this week.`)}

    ${xp || streak ? `
    <table cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:12px;padding:16px 20px;margin:0 0 24px;width:100%;">
      <tr>
        ${xp ? `<td style="text-align:center;padding:0 16px 0 0;"><p style="margin:0;font-size:22px;font-weight:900;color:#10b981;">${xp.toLocaleString()}</p><p style="margin:4px 0 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Total XP</p></td>` : ''}
        ${streak ? `<td style="text-align:center;padding:0 16px;border-left:1px solid #bbf7d0;"><p style="margin:0;font-size:22px;font-weight:900;color:#f97316;">${streak}</p><p style="margin:4px 0 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Day Streak 🔥</p></td>` : ''}
        ${classLevel ? `<td style="text-align:center;padding:0 0 0 16px;border-left:1px solid #bbf7d0;"><p style="margin:0;font-size:22px;font-weight:900;color:#6366f1;">Class ${classLevel}</p><p style="margin:4px 0 0;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Your Class</p></td>` : ''}
      </tr>
    </table>` : ''}

    ${challengeTitle ? `
    <p style="margin:0 0 8px;font-size:13px;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:1px;">🔥 This Week's Challenge</p>
    ${p(`<strong>${challengeTitle}</strong> — test your knowledge and earn bonus XP!`)}
    ${btn('Take the Challenge →', challengeUrl || 'https://syllab.in/daily-challenges')}` : ''}

    ${newChapters.length > 0 ? `
    ${divider()}
    <p style="margin:0 0 16px;font-size:13px;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:1px;">📖 New Content Added</p>
    ${newChapters.slice(0, 5).map(c =>
      `<p style="margin:0 0 8px;font-size:14px;color:#475569;">• <strong>${c.title}</strong> <span style="color:#94a3b8;">— ${c.subject}, Class ${c.class}</span></p>`
    ).join('')}` : ''}

    ${studyTip ? `
    ${divider()}
    <table cellpadding="0" cellspacing="0" style="background:#fefce8;border-left:4px solid #eab308;border-radius:0 12px 12px 0;padding:16px 20px;margin:0 0 24px;width:100%;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:13px;font-weight:900;color:#713f12;">💡 Study Tip of the Week</p>
        <p style="margin:0;font-size:14px;color:#713f12;">${studyTip}</p>
      </td></tr>
    </table>` : ''}

    ${upcomingExams.length > 0 ? `
    ${divider()}
    <p style="margin:0 0 12px;font-size:13px;font-weight:900;color:#0f172a;text-transform:uppercase;letter-spacing:1px;">📅 Upcoming Exams</p>
    ${upcomingExams.map(e =>
      `<p style="margin:0 0 6px;font-size:14px;color:#475569;">📌 <strong>${e.name}</strong> — ${e.date}</p>`
    ).join('')}` : ''}

    ${divider()}
    ${btn('Continue Learning →', `https://syllab.in${classLevel ? `/class-${classLevel}` : ''}`)}
  `;

  return {
    subject: `Your Syllab Week — ${weekOf} 📚`,
    html: render(`Syllab Weekly Digest — ${weekOf}`, body),
  };
}

// ─── 5. ACCOUNT ISSUES ────────────────────────────────────────────────────────
export function accountVerificationEmail(displayName: string, verifyLink: string) {
  const body = `
    ${badge('✉️ Verify Email')}
    ${h1(`Almost there, ${displayName || 'there'}!`)}
    ${p('Please verify your email address to complete your Syllab account setup.')}
    ${btn('Verify My Email →', verifyLink)}
    ${divider()}
    ${p('<span style="font-size:12px;color:#94a3b8;">This link expires in 24 hours. If you didn\'t create a Syllab account, ignore this email.</span>')}
  `;
  return {
    subject: 'Verify your Syllab email ✉️',
    html: render('Verify your email — Syllab', body),
  };
}

export function examCodeEmail(parentName: string, childEmail: string, examCode: string, examDetails: string) {
  const examUrl = `https://syllab.in/exams?code=${examCode}`;
  const body = `
    ${badge('📝 Exam Code')}
    ${h1('A practice exam has been created for you!')}
    ${p(`<strong>${parentName}</strong> created a personalised exam for you on Syllab.`)}
    <table cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0;width:100%;text-align:center;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:13px;color:#64748b;font-weight:700;">YOUR EXAM CODE</p>
        <p style="margin:0;font-size:36px;font-weight:900;color:#0f172a;letter-spacing:4px;">${examCode}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#64748b;">${examDetails}</p>
      </td></tr>
    </table>
    ${btn('Start Exam Now →', examUrl)}
    ${divider()}
    ${p('Or go to <a href="https://syllab.in/exams" style="color:#10b981;">syllab.in/exams</a> → Live Exams → enter the code above.')}
  `;
  return {
    subject: `A practice exam is ready for you! Code: ${examCode} 📝`,
    html: render('Practice Exam Ready — Syllab', body),
  };
}
