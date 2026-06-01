@echo off
REM ── Syllab daily automation (run by Windows Task Scheduler) ──────────────
REM   1. Growth agent: regenerate blogs (70/30 evergreen+timely) + sitemap +
REM      SEO audit + marketing drafts.
REM   2. MCQ generator: add more chapter MCQs toward 300/chapter (accumulates).
REM   GEMINI_API_KEY is read from .env (dotenv). Logs go to scripts\daily-log.txt.
cd /d "C:\Users\naras\OneDrive\Desktop\syllab"
echo ==== %DATE% %TIME% ==== >> scripts\daily-log.txt
call node scripts\growth-agent.mjs >> scripts\daily-log.txt 2>&1
call npx tsx scripts\generate-mcqs.ts --all --per 20 --target 300 --concurrency 2 >> scripts\daily-log.txt 2>&1
echo ---- done %TIME% ---- >> scripts\daily-log.txt
