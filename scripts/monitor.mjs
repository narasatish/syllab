/**
 * monitor.mjs — synthetic uptime/health monitor. Run on a schedule (Render
 * Cron Job, cron-job.org, or GitHub Actions) every ~10 min. It loads the key
 * public pages + the backend health endpoint, checks status + latency, and
 * EMAILS an alert (via Resend REST — no extra dependency) if anything fails or
 * is slow. Independent of the app, so it still alerts even if the app is down.
 *
 * Env: RESEND_API_KEY (required to email), ALERT_EMAIL (default owner),
 *      FROM_EMAIL (default onboarding@resend.dev), SLOW_MS (default 20000).
 *
 * Usage:  node scripts/monitor.mjs
 */
const SITE = process.env.MONITOR_SITE || 'https://syllab.in';
const BACKEND = process.env.MONITOR_BACKEND || 'https://syllab-backend.onrender.com';
const ALERT_EMAIL = process.env.ALERT_EMAIL || 'narasatish966@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const SLOW_MS = parseInt(process.env.SLOW_MS || '20000', 10);

const checks = [
  { name: 'Home', url: `${SITE}/` },
  { name: 'Practice', url: `${SITE}/practice` },
  { name: 'Coding', url: `${SITE}/coding` },
  { name: 'Mock Tests', url: `${SITE}/mock-tests` },
  { name: 'Colleges', url: `${SITE}/colleges` },
  { name: 'Backend health', url: `${BACKEND}/api/health`, expectJsonOk: true },
];

async function run(check) {
  const start = Date.now();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 35000);
    const res = await fetch(check.url, { signal: ctrl.signal, cache: 'no-store', headers: { 'User-Agent': 'SyllabMonitor/1.0' } });
    clearTimeout(t);
    const ms = Date.now() - start;
    if (!res.ok) return { ...check, ok: false, ms, reason: `HTTP ${res.status}` };
    if (check.expectJsonOk) {
      const j = await res.json().catch(() => ({}));
      if (!j.ok) return { ...check, ok: false, ms, reason: `health ok:false (${JSON.stringify(j).slice(0, 80)})` };
    }
    if (ms > SLOW_MS) return { ...check, ok: true, slow: true, ms, reason: `slow ${ms}ms` };
    return { ...check, ok: true, ms };
  } catch (e) {
    return { ...check, ok: false, ms: Date.now() - start, reason: e.name === 'AbortError' ? 'timeout (>35s)' : e.message };
  }
}

async function emailAlert(failures) {
  if (!process.env.RESEND_API_KEY) { console.error('No RESEND_API_KEY — cannot email alert.'); return; }
  const body = failures.map((f) => `${f.ok ? '⚠ SLOW' : '✗ DOWN'}  ${f.name} — ${f.reason} (${f.ms}ms)\n   ${f.url}`).join('\n\n');
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Syllab Monitor <${FROM_EMAIL}>`,
        to: ALERT_EMAIL,
        subject: `🚨 Syllab monitor: ${failures.filter((f) => !f.ok).length} down, ${failures.filter((f) => f.slow).length} slow`,
        html: `<pre style="font-family:ui-monospace,monospace;font-size:13px;white-space:pre-wrap">${body}</pre>`,
      }),
    });
    console.log(r.ok ? '📧 Alert emailed.' : `Email failed: HTTP ${r.status}`);
  } catch (e) { console.error('Email send error:', e.message); }
}

(async () => {
  const results = await Promise.all(checks.map(run));
  for (const r of results) console.log(`${r.ok ? (r.slow ? '⚠' : '✓') : '✗'} ${r.name.padEnd(16)} ${r.ms}ms ${r.reason || ''}`);
  const problems = results.filter((r) => !r.ok || r.slow);
  if (problems.length) {
    await emailAlert(problems);
    process.exit(problems.some((p) => !p.ok) ? 1 : 0); // non-zero only for hard failures
  } else {
    console.log('✅ All checks healthy.');
  }
})();
