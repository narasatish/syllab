/**
 * PythonRunner — runs Python IN THE BROWSER via Pyodide (Python compiled to
 * WebAssembly). No server needed — the DataCamp-style "write code → Run → see
 * real output" experience, free and client-side.
 *
 * Pyodide (~6 MB) is loaded lazily from the CDN only when a student first hits
 * Run, so it never affects initial page load. If it can't load (offline/CSP),
 * we fall back gracefully with a message.
 */
import { useRef, useState } from 'react';
import { Play, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';

const PYODIDE_VERSION = 'v0.26.4';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<any> | null = null;
function getPyodide(): Promise<any> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    const w = window as any;
    const boot = async () => {
      try { resolve(await w.loadPyodide({ indexURL: PYODIDE_URL })); }
      catch (e) { reject(e); }
    };
    if (w.loadPyodide) { boot(); return; }
    const s = document.createElement('script');
    s.src = `${PYODIDE_URL}pyodide.js`;
    s.onload = boot;
    s.onerror = () => reject(new Error('Failed to load Python runtime'));
    document.head.appendChild(s);
  });
  return pyodidePromise;
}

export default function PythonRunner({ initialCode, expectedOutput }: { initialCode: string; expectedOutput?: string }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'done' | 'error'>('idle');
  const pyRef = useRef<any>(null);

  const run = async () => {
    setOutput('');
    setStatus(pyRef.current ? 'running' : 'loading');
    try {
      if (!pyRef.current) pyRef.current = await getPyodide();
      const py = pyRef.current;
      setStatus('running');
      let buf = '';
      py.setStdout({ batched: (s: string) => { buf += s + '\n'; } });
      py.setStderr({ batched: (s: string) => { buf += s + '\n'; } });
      try {
        await py.runPythonAsync(code);
      } catch (err: any) {
        buf += String(err?.message || err);
      }
      setOutput(buf.trimEnd() || '(no output)');
      setStatus('done');
    } catch {
      setStatus('error');
      setOutput('Could not load the Python runtime (check your connection). You can still read the example above.');
    }
  };

  const passed = status === 'done' && expectedOutput
    ? output.trim() === expectedOutput.trim()
    : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">🐍 Python — runs in your browser</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => { setCode(initialCode); setOutput(''); setStatus('idle'); }}
            className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-white/20">
            <RotateCcw size={12} /> Reset
          </button>
          <button type="button" onClick={run} disabled={status === 'loading' || status === 'running'}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600 disabled:opacity-60">
            {status === 'loading' ? <><Loader2 size={12} className="animate-spin" /> Loading Python…</> :
             status === 'running' ? <><Loader2 size={12} className="animate-spin" /> Running…</> :
             <><Play size={12} /> Run</>}
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.min(16, Math.max(6, code.split('\n').length + 1))}
        className="w-full resize-y rounded-xl bg-black/40 p-3 font-mono text-sm leading-relaxed text-emerald-100 outline-none focus:ring-1 focus:ring-emerald-400"
      />
      {output ? (
        <div className="mt-3">
          <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-slate-500">Output</p>
          <pre className="max-h-60 overflow-auto whitespace-pre-wrap rounded-xl bg-black/50 p-3 font-mono text-sm text-slate-100">{output}</pre>
          {passed === true ? (
            <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-emerald-400"><CheckCircle2 size={14} /> Correct — output matches!</p>
          ) : passed === false ? (
            <p className="mt-2 text-sm font-semibold text-amber-400">Output differs from the expected result — compare and try again.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
