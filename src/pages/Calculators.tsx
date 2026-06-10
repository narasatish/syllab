/**
 * Free Student Calculators — high-intent, evergreen tools (percentage, CGPA↔%,
 * attendance "can I bunk?"). Pure client-side; each is an indexable SEO page.
 */
import { useState } from 'react';
import { Percent, GraduationCap, CalendarCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import {
  percentage, cgpaToPercentage, percentageToCgpa,
  attendancePercent, classesYouCanSkip, classesToReachTarget,
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

        {/* Info */}
        <Card icon={<span>💡</span>} title="More tools coming">
          <p className="text-sm leading-relaxed text-slate-600">Rank predictor, GPA (sem-wise), and exam-score targets are on the way. These free tools are built to help every Indian student plan smarter — no login, no ads.</p>
        </Card>
      </div>
    </div>
  );
}
