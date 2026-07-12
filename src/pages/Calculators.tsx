/**
 * Free Student Calculators — high-intent, evergreen tools (percentage, CGPA↔%,
 * attendance "can I bunk?"). Pure client-side; each is an indexable SEO page.
 */
import { useState } from 'react';
import { Percent, GraduationCap, CalendarCheck, Target, Plus, Trash2, CalendarClock } from 'lucide-react';
import PageHero from '../components/PageHero';
import {
  percentage, cgpaToPercentage, percentageToCgpa,
  attendancePercent, classesYouCanSkip, classesToReachTarget,
  marksNeededForTarget, semesterGpa,
} from '../lib/calculators';

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white"
      />
    </label>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-base font-black text-slate-900">{icon} {title}</h2>
      {children}
    </div>
  );
}

const num = (s: string) => (s.trim() === '' ? NaN : Number(s));

export default function Calculators() {
  // Percentage
  const [obt, setObt] = useState('');
  const [tot, setTot] = useState('');
  const pctValid = !Number.isNaN(num(obt)) && num(tot) > 0;

  // CGPA
  const [cgpa, setCgpa] = useState('');
  const [pctIn, setPctIn] = useState('');

  // Attendance
  const [att, setAtt] = useState('');
  const [attTot, setAttTot] = useState('');
  const [target, setTarget] = useState('75');
  const attValid = num(attTot) > 0 && !Number.isNaN(num(att));
  const tgt = num(target) > 0 ? num(target) : 75;
  const skip = attValid ? classesYouCanSkip(num(att), num(attTot), tgt) : 0;
  const reach = attValid ? classesToReachTarget(num(att), num(attTot), tgt) : 0;
  const curAtt = attValid ? attendancePercent(num(att), num(attTot)) : 0;

  // Marks needed in final exam to hit a target overall %
  const [scored, setScored] = useState('');
  const [maxSoFar, setMaxSoFar] = useState('');
  const [finalMax, setFinalMax] = useState('');
  const [goal, setGoal] = useState('75');
  const needValid = num(maxSoFar) > 0 && num(finalMax) > 0 && !Number.isNaN(num(scored)) && num(goal) > 0;
  const needed = needValid ? marksNeededForTarget(num(scored), num(maxSoFar), num(finalMax), num(goal)) : 0;

  // Semester GPA (SGPA) — dynamic subject rows
  const [gpaRows, setGpaRows] = useState<{ points: string; credits: string }[]>([
    { points: '', credits: '' }, { points: '', credits: '' }, { points: '', credits: '' },
  ]);
  const setGpaRow = (i: number, key: 'points' | 'credits', v: string) =>
    setGpaRows((rows) => rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)));
  const addGpaRow = () => setGpaRows((rows) => [...rows, { points: '', credits: '' }]);
  const removeGpaRow = (i: number) => setGpaRows((rows) => (rows.length > 1 ? rows.filter((_, idx) => idx !== i) : rows));
  const gpaParsed = gpaRows.map((r) => ({ points: num(r.points), credits: num(r.credits) }));
  const gpaHasInput = gpaParsed.some((r) => r.credits > 0 && !Number.isNaN(r.points));
  const sgpa = semesterGpa(gpaParsed);

  // Exam countdown — days until a chosen exam date
  const [examDate, setExamDate] = useState('');
  let daysToExam: number | null = null;
  if (examDate) {
    const target = new Date(examDate + 'T00:00:00');
    if (!Number.isNaN(target.getTime())) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      daysToExam = Math.round((target.getTime() - today.getTime()) / 86400000);
    }
  }

  // CBSE Best-of-Five percentage (best 5 of 6 subjects, each out of 100)
  const [bof, setBof] = useState<string[]>(['', '', '', '', '', '']);
  const setBofAt = (i: number, v: string) => setBof((a) => a.map((x, idx) => (idx === i ? v : x)));
  const bofNums = bof.map((s) => num(s)).filter((n) => !Number.isNaN(n) && n >= 0 && n <= 100);
  const bofPct = bofNums.length >= 5
    ? Math.round(([...bofNums].sort((a, b) => b - a).slice(0, 5).reduce((s, n) => s + n, 0) / 5) * 100) / 100
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <PageHero emoji="🧮" title="Free Student Calculators" subtitle="Instant marks-percentage, CGPA↔percentage, and an attendance 'can I bunk?' calculator. Free, no signup." className="mb-8" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Percentage */}
        <Card icon={<Percent size={18} className="text-primary" />} title="Marks → Percentage">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Marks obtained" value={obt} onChange={setObt} placeholder="450" />
            <Field label="Total marks" value={tot} onChange={setTot} placeholder="500" />
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center">
            <div className="text-2xl font-black text-emerald-700">{pctValid ? `${percentage(num(obt), num(tot))}%` : '—'}</div>
            <div className="text-xs font-bold text-emerald-600/80">your percentage</div>
          </div>
        </Card>

        {/* CGPA */}
        <Card icon={<GraduationCap size={18} className="text-primary" />} title="CGPA ↔ Percentage (CBSE)">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Field label="CGPA (out of 10)" value={cgpa} onChange={(v) => { setCgpa(v); }} placeholder="9.2" />
              <div className="mt-2 rounded-lg bg-slate-50 p-2 text-center text-sm font-black text-slate-700">
                {num(cgpa) >= 0 && cgpa.trim() !== '' ? `${cgpaToPercentage(num(cgpa))}%` : '—'}
              </div>
            </div>
            <div>
              <Field label="Percentage" value={pctIn} onChange={(v) => { setPctIn(v); }} placeholder="87" />
              <div className="mt-2 rounded-lg bg-slate-50 p-2 text-center text-sm font-black text-slate-700">
                {num(pctIn) > 0 ? `${percentageToCgpa(num(pctIn))} CGPA` : '—'}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">CBSE rule: Percentage = CGPA × 9.5</p>
        </Card>

        {/* Attendance */}
        <Card icon={<CalendarCheck size={18} className="text-primary" />} title="Attendance — “Can I bunk?”">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Attended" value={att} onChange={setAtt} placeholder="45" />
            <Field label="Total classes" value={attTot} onChange={setAttTot} placeholder="60" />
            <Field label="Target %" value={target} onChange={setTarget} placeholder="75" />
          </div>
          {attValid ? (
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3"><div className="text-xl font-black text-slate-800">{curAtt}%</div><div className="text-[11px] font-bold text-slate-500">current</div></div>
              <div className="rounded-xl bg-emerald-50 p-3"><div className="text-xl font-black text-emerald-700">{skip}</div><div className="text-[11px] font-bold text-emerald-600/80">can skip</div></div>
              <div className="rounded-xl bg-amber-50 p-3"><div className="text-xl font-black text-amber-700">{reach < 0 ? '∞' : reach}</div><div className="text-[11px] font-bold text-amber-600/80">to attend</div></div>
            </div>
          ) : <p className="mt-4 text-center text-xs text-slate-400">Enter your attendance to see if you can take a day off 😉</p>}
        </Card>

        {/* Marks needed in final/board exam */}
        <Card icon={<Target size={18} className="text-primary" />} title="Marks needed in final exam">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scored so far" value={scored} onChange={setScored} placeholder="320" />
            <Field label="Out of (so far)" value={maxSoFar} onChange={setMaxSoFar} placeholder="400" />
            <Field label="Final exam max" value={finalMax} onChange={setFinalMax} placeholder="100" />
            <Field label="Target overall %" value={goal} onChange={setGoal} placeholder="75" />
          </div>
          {needValid ? (
            <div className="mt-4 rounded-xl bg-indigo-50 p-3 text-center">
              {needed === -1 ? (
                <>
                  <div className="text-lg font-black text-rose-600">Not reachable</div>
                  <div className="text-[11px] font-bold text-rose-500/80">even full marks won't hit {num(goal)}%</div>
                </>
              ) : needed === 0 ? (
                <>
                  <div className="text-2xl font-black text-emerald-700">Already there 🎉</div>
                  <div className="text-[11px] font-bold text-emerald-600/80">you've locked in {num(goal)}%</div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-black text-indigo-700">{needed}<span className="text-base">/{num(finalMax)}</span></div>
                  <div className="text-[11px] font-bold text-indigo-600/80">needed to reach {num(goal)}% overall</div>
                </>
              )}
            </div>
          ) : <p className="mt-4 text-center text-xs text-slate-400">Plan your board/final exam target instantly.</p>}
        </Card>

        {/* Semester GPA (SGPA) */}
        <Card icon={<GraduationCap size={18} className="text-primary" />} title="Semester GPA (SGPA)">
          <div className="space-y-2">
            {gpaRows.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="number" inputMode="decimal" value={r.points} onChange={(e) => setGpaRow(i, 'points', e.target.value)} placeholder="Grade pts (e.g. 9)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white" />
                <input type="number" inputMode="decimal" value={r.credits} onChange={(e) => setGpaRow(i, 'credits', e.target.value)} placeholder="Credits" className="w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white" />
                <button type="button" onClick={() => removeGpaRow(i)} aria-label="Remove subject" className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addGpaRow} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"><Plus size={14} /> Add subject</button>
          <div className="mt-3 rounded-xl bg-violet-50 p-3 text-center">
            <div className="text-2xl font-black text-violet-700">{gpaHasInput ? sgpa.toFixed(2) : '—'}</div>
            <div className="text-[11px] font-bold text-violet-600/80">your SGPA (credit-weighted)</div>
          </div>
        </Card>

        {/* Exam countdown */}
        <Card icon={<CalendarClock size={18} className="text-primary" />} title="Exam Countdown">
          <label className="block">
            <span className="text-xs font-bold text-slate-500">Your exam date</span>
            <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary focus:bg-white" />
          </label>
          {daysToExam !== null ? (
            <div className="mt-4 rounded-xl bg-sky-50 p-3 text-center">
              {daysToExam > 0 ? (
                <><div className="text-2xl font-black text-sky-700">{daysToExam} {daysToExam === 1 ? 'day' : 'days'}</div><div className="text-[11px] font-bold text-sky-600/80">to go — {Math.floor(daysToExam / 7)} weeks {daysToExam % 7} days. Start today!</div></>
              ) : daysToExam === 0 ? (
                <div className="text-xl font-black text-emerald-700">It's exam day — you've got this! 💪</div>
              ) : (
                <div className="text-base font-black text-slate-500">That date passed {Math.abs(daysToExam)} days ago.</div>
              )}
            </div>
          ) : <p className="mt-4 text-center text-xs text-slate-400">Pick your exam date to see how long you have to prepare.</p>}
        </Card>

        {/* CBSE Best-of-Five percentage */}
        <Card icon={<Percent size={18} className="text-primary" />} title="CBSE Best-of-Five %">
          <p className="mb-2 text-xs text-slate-500">Marks (out of 100) for your 6 subjects — CBSE counts your best 5.</p>
          <div className="grid grid-cols-3 gap-2">
            {bof.map((v, i) => (
              <input key={i} type="number" inputMode="decimal" value={v} onChange={(e) => setBofAt(i, e.target.value)} placeholder={`Sub ${i + 1}`} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-sm outline-none focus:border-primary focus:bg-white" />
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-center">
            <div className="text-2xl font-black text-emerald-700">{bofPct !== null ? `${bofPct}%` : '—'}</div>
            <div className="text-[11px] font-bold text-emerald-600/80">best-of-five percentage {bofNums.length > 0 && bofNums.length < 5 ? `(enter ${5 - bofNums.length} more)` : ''}</div>
          </div>
        </Card>
      </div>

      {/* SEO content — high-intent, indexable, no clutter */}
      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-600">
        <h2 className="text-lg font-black text-slate-900">How these free student calculators work</h2>
        <p><strong className="text-slate-800">Marks → percentage:</strong> percentage = (marks obtained ÷ total marks) × 100. Works for any exam — unit tests, half-yearly, CBSE board, or college internals.</p>
        <p><strong className="text-slate-800">CGPA ↔ percentage:</strong> CBSE uses percentage = CGPA × 9.5. Enter either value to convert instantly for your Class 10 or 12 result.</p>
        <p><strong className="text-slate-800">Attendance "can I bunk?":</strong> tells you how many classes you can safely skip — or must attend — to stay at the 75% most colleges require.</p>
        <p><strong className="text-slate-800">Marks needed in final exam:</strong> enter what you've scored so far and your target overall percentage; we tell you the exact marks needed in the upcoming board or final paper.</p>
        <p><strong className="text-slate-800">Semester GPA (SGPA):</strong> SGPA = Σ(grade points × credits) ÷ Σ(credits). Add a row per subject for a credit-weighted result.</p>
        <p><strong className="text-slate-800">Exam countdown:</strong> pick your board or entrance exam date to see exactly how many days (and weeks) you have left to prepare — a simple nudge to plan your revision.</p>
        <p><strong className="text-slate-800">CBSE Best-of-Five:</strong> CBSE calculates your Class 10 and 12 percentage on your best 5 subjects. Enter marks for all 6 and we drop your lowest to show the percentage that appears on your result.</p>
        <p className="text-xs text-slate-400">All tools run entirely in your browser. No login, no ads, nothing stored — free for every Indian student.</p>
      </section>
    </div>
  );
}
