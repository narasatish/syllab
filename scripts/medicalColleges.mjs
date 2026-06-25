/**
 * medicalColleges.mjs — extracts MEDICAL_STATE_INFO + MEDICAL_COLLEGES from
 * src/data/medicalColleges.ts (the arrays are JSON.stringify output → valid JSON)
 * so the prerender + sitemap scripts can enumerate /medical-colleges routes.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export function getMedicalManifest(root) {
  let txt = '';
  try { txt = readFileSync(path.join(root, 'src', 'data', 'medicalColleges.ts'), 'utf8'); } catch { return { states: [], colleges: [] }; }
  const grab = (re) => { const m = txt.match(re); try { return m ? JSON.parse(m[1]) : []; } catch { return []; } };
  const states = grab(/MEDICAL_STATE_INFO: MedStateInfo\[\] = ([\s\S]*?);\s*\n\s*\nexport const MEDICAL_COLLEGES/);
  const colleges = grab(/MEDICAL_COLLEGES: MedicalCollege\[\] = ([\s\S]*?);\s*\n\s*\nexport const medStateSlug/);
  const nameToSlug = Object.fromEntries(states.map((s) => [s.name, s.slug]));
  for (const c of colleges) c.stateSlug = nameToSlug[c.state] || (c.state || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { states, colleges };
}
