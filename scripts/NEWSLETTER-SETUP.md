# Weekly Newsletter System Setup

## Overview
The newsletter system sends personalized weekly emails to:
- **Students**: Their performance card (XP, streak, completed topics, weak areas) + curated blogs
- **Parents**: Their child's performance card + educational resources

Emails are class-appropriate and only sent to users who have not opted out.

## Files Created

### Core Scripts
- `scripts/send-weekly-newsletter.mjs` — Main newsletter sender
- `scripts/generate-state-mocks.mjs` — Mock test generator for state exams
- `scripts/generate_all_mocks.py` — Python generator for bulk mock creation

### Libraries
- `src/lib/emailTemplates/weeklyNewsletter.ts` — Email HTML templates
- `src/lib/blogClassMap.ts` — Blog classification and mapping by class

### Package Scripts
```json
{
  "newsletter:send": "node scripts/send-weekly-newsletter.mjs",
  "newsletter:dry-run": "DRY_RUN=true node scripts/send-weekly-newsletter.mjs",
  "mocks:generate-state": "python3 scripts/generate_all_mocks.py"
}
```

## Environment Variables

Add these to `.env` or `.env.development.local` (NOT `.env.example`):

```bash
# Resend API key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Firebase Admin SDK (download from Firebase Console)
FIREBASE_SERVICE_ACCOUNT_JSON={"type": "service_account", "project_id": "...", ...}

# Newsletter sender email
NEWSLETTER_FROM_EMAIL=support@syllab.in
```

## Running the Newsletter

### Dry Run (test mode - doesn't send real emails)
```bash
npm run newsletter:dry-run
```

Output will show what emails would be sent:
```
Sending weekly newsletters...
Mode: DRY RUN (simulated)
From: support@syllab.in

→ Arjun (Class 10)
  [DRY_RUN] Would send email to arjun@example.com
→ Mrs. Sharma (Parent of Priya)
  [DRY_RUN] Would send email to sharma@example.com

✅ Sent: 2
[DRY_RUN] No actual emails were sent. Remove DRY_RUN=true to send real emails.
```

### Send Real Emails
```bash
npm run newsletter:send
```

**Important**: Ensure `RESEND_API_KEY` is set before running this.

## Scheduling the Newsletter

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/weekly-newsletter.yml`:

```yaml
name: Weekly Newsletter

on:
  schedule:
    # Run every Sunday at 9:00 AM IST (3:30 UTC)
    - cron: '30 3 * * 0'
  workflow_dispatch:  # Allow manual trigger

jobs:
  send-newsletter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Send newsletter
        env:
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          FIREBASE_SERVICE_ACCOUNT_JSON: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_JSON }}
          NEWSLETTER_FROM_EMAIL: support@syllab.in
        run: npm run newsletter:send

      - name: Notify on failure
        if: failure()
        run: echo "Newsletter send failed. Check logs."
```

Then add secrets to GitHub:
1. Go to Settings > Secrets and variables > Actions
2. Add `RESEND_API_KEY`
3. Add `FIREBASE_SERVICE_ACCOUNT_JSON`

### Option 2: Render Cron Job

If deployed on Render, create a cron job:

1. Go to Render Dashboard > New > Cron Job
2. Name: "Weekly Newsletter"
3. Schedule: `0 9 * * 0` (Sunday 9 AM IST requires timezone adjustment)
4. Command: `npm run newsletter:send`
5. Environment variables: Set `RESEND_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON`

### Option 3: External Cron Service (IFTTT, Zapier, etc.)

Use services like IFTTT or Zapier to trigger a webhook at your backend endpoint.

### Option 4: Local Cron (Development)

On macOS/Linux:
```bash
crontab -e
```

Add line:
```cron
# Run every Sunday at 9:00 AM
0 9 * * 0 cd /path/to/syllab && npm run newsletter:send
```

## Email Template Customization

### Student Email

Includes:
- Greeting with student name
- XP earned this week + day streak (cards)
- Topics completed this week
- Weak areas (if any)
- 3-5 class-appropriate blog posts
- Call-to-action button linking to syllab.in

### Parent Email

Includes:
- Greeting with parent name + child's name and class
- Child's XP earned + streak (cards)
- Progress summary with parent-friendly language
- Topics completed
- Weak areas with recommendation
- 3-5 recommended resources for the child
- Call-to-action button linking to parent dashboard

## Blog Classification

Blogs are filtered by class range:

| Class | Range | Content |
|-------|-------|---------|
| 1-5 | Primary | Daily Dose, Coding for Kids, Study Basics |
| 6-8 | Middle | NCERT Tips, Science Fair, Intermediate Coding |
| 9-10 | Secondary | Board exam, NCERT, Foundation JEE/NEET |
| 11-12 | Senior | JEE, NEET, EAMCET, Advanced Topics |

Example: A Class 5 student will NOT receive JEE preparation blogs.

See `src/lib/blogClassMap.ts` for full configuration.

## Troubleshooting

### "No RESEND_API_KEY found"
- Check that `RESEND_API_KEY` is set in `.env` or environment
- Sign up at https://resend.com and get an API key

### Emails not sending in production
- Verify `RESEND_API_KEY` is set in GitHub Secrets or Render environment
- Check that sender email `support@syllab.in` is verified in Resend
- Check logs for Resend API errors

### Invalid Firebase credentials
- Ensure `FIREBASE_SERVICE_ACCOUNT_JSON` is valid JSON or a valid file path
- Download fresh service account from Firebase Console

### Test with dry-run first
Always test locally with `npm run newsletter:dry-run` before scheduling real sends.

## Monitoring & Logging

The script logs all sent emails to the `email_log` Firestore collection with:
- Timestamp
- Recipient email
- Recipient type (student/parent)
- Status (sent/failed)
- Message ID (from Resend)
- Error message (if failed)

This allows tracking:
- Which users received emails
- Which emails bounced
- Failure patterns

## Scaling Considerations

Current implementation:
- ~100 users = ~100 emails = ~30 seconds
- 1,000 users = ~1,000 emails = ~5 minutes
- 10,000 users = queue or batch in smaller groups

For large scale, consider:
1. **Batch sending** - Send 100 emails, pause 30 seconds, repeat
2. **Queue system** - Use Bull, RabbitMQ, or Firestore queues
3. **Dedicated email service** - Use Sendgrid's SMTP relay for higher throughput

## Future Enhancements

- [ ] Add email unsubscribe link in footer
- [ ] Implement email preference center (frequency, content type)
- [ ] Add A/B testing for subject lines
- [ ] Track email open rates via Resend webhooks
- [ ] Personalize recommendations based on user behavior
- [ ] Send SMS alerts for low engagement users
- [ ] Add referral bonuses for parent emails
