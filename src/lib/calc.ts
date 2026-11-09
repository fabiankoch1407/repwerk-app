// Calorie and macro targets (Mifflin-St Jeor) and the training plan. Ported from the web prototype.
import { EX, type Exercise } from '@/data/exercises';

export type Goal = 'muskel' | 'fett' | 'halten' | 'fit';
export type Sex = 'm' | 'w' | '';
export type Experience = 'einsteiger' | 'mittel' | 'profi';
export type Profile = {
  name: string; goal: Goal; sex: Sex; age: number; height: number; weight: number; targetWeight: number | null;
  activity: number; days: number; duration: number; experience: Experience;
  location: 'gym' | 'home'; equipment: string[]; diet: 'alles' | 'vegetarisch' | 'vegan' | 'pescetarisch'; allergies: string[]; meals: number;
};
export type Targets = { kcal: number; p: number; c: number; f: number; water: number; bmr: number; tdee: number; adj: number; pPerKg: number };

export const GOALS: Record<Goal, string> = { muskel: 'Muskeln aufbauen', fett: 'Fett verlieren', halten: 'Gewicht halten', fit: 'Fitter werden' };

export function calcTargets(p: Profile): Targets {
  const sexAdj = p.sex === 'm' ? 5 : p.sex === 'w' ? -161 : -78;
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + sexAdj;
  const tdee = bmr * p.activity;
  let adj = 0;
  if (p.goal === 'fett') adj = -Math.min(500, tdee * 0.2);
  if (p.goal === 'muskel') adj = Math.min(300, tdee * 0.1);
  const kcal = Math.round((tdee + adj) / 10) * 10;
  const pPerKg = p.goal === 'fett' || p.goal === 'muskel' ? 2.0 : 1.6;
  const prot = Math.round(pPerKg * p.weight);
  const fat = Math.round(Math.max(0.8 * p.weight, (kcal * 0.25) / 9));
  const carbs = Math.max(0, Math.round((kcal - prot * 4 - fat * 9) / 4));
  return { kcal, p: prot, c: carbs, f: fat, water: Math.round((p.weight * 35) / 250) * 250, bmr: Math.round(bmr), tdee: Math.round(tdee), adj: Math.round(adj), pPerKg };
}

const NEEDS: Record<string, string[]> = { bankdruecken: ['lh', 'bank'], 'schraegbank-kh': ['kh', 'bank'], klimmzuege: ['stange'], 'haengendes-beinheben': ['stange'], dips: ['stange'], 'hip-thrust': ['lh'] };
function available(e: Exercise, p: Profile) {
  if (p.location !== 'home') return true;
  const eq = p.equipment;
  if (NEEDS[e.id]) return NEEDS[e.id].every((x) => eq.includes(x));
  if (e.equip === 'Körpergewicht') return true;
  if (e.equip === 'Kurzhantel') return eq.includes('kh');
  if (e.equip === 'Langhantel') return eq.includes('lh');
  if (e.equip === 'Kabel') return eq.includes('kabel');
  return e.id === 'wadenheben';
}
const TEMPLATES: Record<string, string[][]> = {
  'Ganzkörper A': [['kniebeuge', 'goblet-squat', 'beinpresse', 'ausfallschritte'], ['bankdruecken', 'brustpresse', 'schraegbank-kh', 'liegestuetze'], ['rudern-lh', 'rudermaschine', 'kh-rudern', 'rudern-kabel'], ['schulterdruecken-kh', 'schulterpresse-maschine', 'liegestuetze'], ['beinbeuger', 'rumaenisches-kreuzheben', 'kh-rumaenisch', 'glute-bridge'], ['plank'], ['bizeps-curl-kh', 'hammer-curl'], ['wadenheben']],
  'Ganzkörper B': [['rumaenisches-kreuzheben', 'kh-rumaenisch', 'glute-bridge'], ['schraegbank-kh', 'butterfly', 'liegestuetze'], ['latzug', 'klimmzuege', 'kh-rudern'], ['seitheben', 'reverse-butterfly'], ['beinpresse', 'ausfallschritte', 'goblet-squat'], ['crunch-kabel', 'bauchmaschine', 'crunch'], ['trizeps-kabel', 'bank-dips'], ['hip-thrust', 'glute-bridge']],
  'Oberkörper A': [['bankdruecken', 'brustpresse', 'liegestuetze'], ['rudern-lh', 'rudermaschine', 'kh-rudern'], ['schulterdruecken-kh', 'schulterpresse-maschine'], ['latzug', 'klimmzuege', 'kh-rudern'], ['bizeps-curl-kh', 'bizepsmaschine', 'hammer-curl'], ['trizeps-kabel', 'bank-dips'], ['seitheben']],
  'Unterkörper A': [['kniebeuge', 'smith-kniebeuge', 'goblet-squat'], ['rumaenisches-kreuzheben', 'kh-rumaenisch', 'glute-bridge'], ['beinpresse', 'hackenschmidt', 'ausfallschritte'], ['beinbeuger', 'glute-bridge'], ['wadenheben'], ['plank'], ['bauchmaschine', 'crunch']],
  'Oberkörper B': [['schraegbank-kh', 'brustpresse', 'liegestuetze'], ['klimmzuege', 'latzug', 'kh-rudern'], ['seitheben', 'schulterpresse-maschine'], ['rudern-kabel', 'rudermaschine', 'kh-rudern'], ['hammer-curl', 'bizeps-curl-kh'], ['dips', 'trizeps-kabel', 'bank-dips'], ['reverse-butterfly', 'face-pulls']],
  'Unterkörper B': [['kreuzheben', 'kh-rumaenisch', 'glute-bridge'], ['ausfallschritte', 'goblet-squat'], ['beinstrecker', 'hackenschmidt', 'goblet-squat'], ['hip-thrust', 'glute-bridge'], ['wadenheben'], ['haengendes-beinheben', 'crunch-kabel', 'crunch']],
  Push: [['bankdruecken', 'brustpresse', 'liegestuetze'], ['schulterdruecken-kh', 'schulterpresse-maschine'], ['schraegbank-kh', 'butterfly', 'liegestuetze'], ['seitheben'], ['trizeps-kabel', 'bank-dips'], ['dips', 'bank-dips'], ['butterfly']],
  Pull: [['klimmzuege', 'latzug', 'kh-rudern'], ['rudern-lh', 'rudermaschine', 'kh-rudern'], ['rudern-kabel', 'kh-rudern'], ['face-pulls', 'reverse-butterfly'], ['bizeps-curl-kh', 'bizepsmaschine'], ['hammer-curl'], ['haengendes-beinheben', 'crunch']],
  Beine: [['kniebeuge', 'smith-kniebeuge', 'goblet-squat'], ['rumaenisches-kreuzheben', 'kh-rumaenisch', 'glute-bridge'], ['beinpresse', 'hackenschmidt', 'ausfallschritte'], ['beinbeuger', 'glute-bridge'], ['beinstrecker', 'ausfallschritte'], ['wadenheben'], ['bauchmaschine', 'crunch']],
};
const COMPOUND = new Set(['kniebeuge', 'smith-kniebeuge', 'hackenschmidt', 'beinpresse', 'bankdruecken', 'brustpresse', 'kreuzheben', 'rumaenisches-kreuzheben', 'rudern-lh', 'klimmzuege', 'schulterdruecken-kh', 'schulterpresse-maschine', 'hip-thrust', 'dips']);

export type PlanDay = { name: string; ex: { id: string; sets: number; reps: string; rest: number }[] };
export function buildPlan(p: Profile): { name: string; days: PlanDay[] } {
  const d = p.days || 3;
  const nEx = ({ 30: 4, 45: 5, 60: 6, 75: 7, 90: 7 } as Record<number, number>)[p.duration] || 6;
  const sets = p.experience === 'einsteiger' ? 3 : p.experience === 'profi' ? 4 : p.goal === 'muskel' ? 4 : 3;
  const reps = p.goal === 'fett' ? '10–15' : p.experience === 'profi' && p.goal === 'muskel' ? '6–10' : '8–12';
  const names = d <= 3 ? ['Ganzkörper A', 'Ganzkörper B'] : d === 4 ? ['Oberkörper A', 'Unterkörper A', 'Oberkörper B', 'Unterkörper B'] : ['Push', 'Pull', 'Beine'];
  const name = (p.location === 'home' ? 'Home: ' : '') + (d <= 3 ? 'Ganzkörper A/B' : d === 4 ? 'Oberkörper / Unterkörper' : 'Push / Pull / Beine');
  const days = names.map((n) => {
    const used = new Set<string>();
    const ex: string[] = [];
    for (const slot of TEMPLATES[n]) {
      if (ex.length >= nEx) break;
      const id = slot.find((x) => EX[x] && !used.has(x) && available(EX[x], p));
      if (id) { used.add(id); ex.push(id); }
    }
    return { name: n, ex: ex.map((id) => ({ id, sets: id === 'plank' ? 3 : sets, reps: id === 'plank' ? '30–60 s' : reps, rest: COMPOUND.has(id) ? 120 : 75 })) };
  });
  return { name, days };
}
