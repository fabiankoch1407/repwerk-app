// App state, saved on the phone with AsyncStorage. Supabase sync follows in a later step.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { calcTargets, type Profile, type Targets } from './calc';
import { dayKey } from './format';

export type Slot = 'fruehstueck' | 'mittag' | 'abend' | 'snacks';
export const SLOTS: [Slot, string][] = [['fruehstueck', 'Frühstück'], ['mittag', 'Mittagessen'], ['abend', 'Abendessen'], ['snacks', 'Snacks']];
export type Entry = { id: string; name: string; grams: number; kcal: number; p: number; c: number; f: number; src: 'db' | 'foto' | 'text' | 'plan'; [nutrient: string]: number | string };
export type Day = { meals: Record<Slot, Entry[]>; water: number };
export type ThemeMode = 'system' | 'light' | 'dark';
export type State = { v: 1; profile: Profile | null; targets: Targets | null; days: Record<string, Day>; theme: ThemeMode; planIndex: number };

const KEY = 'repwerk-state-v1';
const blank = (): State => ({ v: 1, profile: null, targets: null, days: {}, theme: 'system', planIndex: 0 });
export const emptyDay = (): Day => ({ meals: { fruehstueck: [], mittag: [], abend: [], snacks: [] }, water: 0 });

type Actions = {
  setProfile: (p: Profile) => void;
  addEntry: (slot: Slot, e: Entry, key?: string) => void;
  removeEntry: (slot: Slot, id: string, key?: string) => void;
  addWater: (ml: number, key?: string) => void;
  setTheme: (t: ThemeMode) => void;
  reset: () => void;
};
type Ctx = { state: State; ready: boolean; day: (key?: string) => Day } & Actions;
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(blank);
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => { if (raw) setState({ ...blank(), ...JSON.parse(raw) }); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {}); }, 400);
  }, [state, ready]);

  const updateDay = useCallback((key: string, fn: (d: Day) => Day) => {
    setState((s) => ({ ...s, days: { ...s.days, [key]: fn(s.days[key] ?? emptyDay()) } }));
  }, []);

  const value = useMemo<Ctx>(() => ({
    state, ready,
    day: (key = dayKey()) => state.days[key] ?? emptyDay(),
    setProfile: (p) => setState((s) => ({ ...s, profile: p, targets: calcTargets(p) })),
    addEntry: (slot, e, key = dayKey()) => updateDay(key, (d) => ({ ...d, meals: { ...d.meals, [slot]: [...d.meals[slot], e] } })),
    removeEntry: (slot, id, key = dayKey()) => updateDay(key, (d) => ({ ...d, meals: { ...d.meals, [slot]: d.meals[slot].filter((x) => x.id !== id) } })),
    addWater: (ml, key = dayKey()) => updateDay(key, (d) => ({ ...d, water: Math.max(0, d.water + ml) })),
    setTheme: (t) => setState((s) => ({ ...s, theme: t })),
    reset: () => setState(blank()),
  }), [state, ready, updateDay]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error('useStore must be used inside StoreProvider');
  return c;
}

export function dayTotals(d: Day) {
  const t = { kcal: 0, p: 0, c: 0, f: 0 };
  for (const [s] of SLOTS) for (const e of d.meals[s]) { t.kcal += e.kcal; t.p += e.p; t.c += e.c; t.f += e.f; }
  return t;
}
