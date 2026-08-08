@echo off
REM ── Syllab daily automation (Windows Task Scheduler: SyllabDailyGrowth) ──────
REM
REM 1. Growth agent — regenerate blogs, sitemap, SEO audit, marketing drafts.
REM 2. MCQ top-up  — fill chapters short of target in src/data/chapterMcqs.ts.
REM 3. Verification — independently re-answer the bank and write a report.
REM
REM Why step 2 changed: it used to call generate-mcqs.ts, which (a) has been
REM refusing to run for months because it reads the PAID key, and (b) writes to
REM public/data/generated-mcqs.json — a DIFFERENT bank from the one behind /mcqs.
REM So the daily job has been producing no chapter MCQs at all. It now calls the
REM via-backend generator, which routes through our own /api/questions/batch on
REM the free-tier ladder (₹0) and refuses to start if the backend is not free-first.
REM
REM Why step 3 exists: a full verification sweep of the bank found SEVEN wrong
REM answer keys in Mathematics (HCF of 36 and 48 keyed as 24, discriminant of
REM x^2-5x+6 keyed as 24, and so on). Structural tests cannot catch a wrong key —
REM the questions were perfectly well-formed. Generated content must never reach
REM students without at least a second opinion on file.
REM
REM The report is written, NOT enforced: the verifier disagrees with a correct
REM bank often enough (it was wrong on 12 of 19 Maths disagreements) that failing
REM the job on it would be noise. Read docs/mcq-verification-report.md.
REM
REM Logs: scripts\daily-log.txt
cd /d "C:\Users\naras\OneDrive\Desktop\syllab"
echo ==== %DATE% %TIME% ==== >> scripts\daily-log.txt

call node scripts\growth-agent.mjs >> scripts\daily-log.txt 2>&1

REM Top up a few chapters a day rather than all at once — keeps each run short
REM and stays well inside the backend's daily call cap.
call npx tsx scripts\generate-chapter-mcqs-via-backend.ts --per 10 --limit 8 >> scripts\daily-log.txt 2>&1

REM Second opinion on whatever changed. Read-only; writes the report only.
call npx tsx scripts\verify-chapter-mcqs.ts >> scripts\daily-log.txt 2>&1

echo ---- done %TIME% ---- >> scripts\daily-log.txt
