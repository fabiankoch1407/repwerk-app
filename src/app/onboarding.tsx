import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { Icon, Mark } from '@/components/icon';
import { Button, Card, Chip, Chips, Field, Row, Screen, Txt } from '@/components/ui';
import { buildPlan, calcTargets, GOALS, type Goal, type Profile } from '@/lib/calc';
import { EX } from '@/data/exercises';
import { fmt, fmt1, num } from '@/lib/format';
import { useStore } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

const ACT: [number, string][] = [[1.2, 'Wenig (Büro, kaum Bewegung)'], [1.375, 'Leicht (viel zu Fuß)'], [1.55, 'Aktiv (stehend, viel Bewegung)'], [1.725, 'Sehr aktiv (körperliche Arbeit)']];
const EXP: [Profile['experience'], string][] = [['einsteiger', 'Einsteiger (unter 6 Monate)'], ['mittel', 'Fortgeschritten (6 Monate bis 2 Jahre)'], ['profi', 'Erfahren (über 2 Jahre)']];
const HOME_EQ: [string, string][] = [['kh', 'Kurzhanteln'], ['lh', 'Langhantel und Scheiben'], ['bank', 'Hantelbank'], ['stange', 'Klimmzugstange'], ['kabel', 'Widerstandsbänder']];
const DIETS: [Profile['diet'], string][] = [['alles', 'Alles'], ['vegetarisch', 'Vegetarisch'], ['vegan', 'Vegan'], ['pescetarisch', 'Pescetarisch']];
const ALLERGENS: [string, string][] = [['laktose', 'Laktose'], ['gluten', 'Gluten'], ['nuesse', 'Nüsse'], ['ei', 'Ei'], ['fisch', 'Fisch'], ['soja', 'Soja']];
const STEPS = 6;
const p0 = (s: { profile: Profile | null }) => s.profile ?? { age: 28, height: 178, weight: 78 };

export default function Onboarding() {
  const { setProfile, state } = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => { if (done && state.profile) router.replace('/'); }, [done, state.profile, router]);
  const [p, setP] = useState<Profile>(() => state.profile ?? { name: '', goal: 'muskel', sex: '', age: 28, height: 178, weight: 78, targetWeight: null, activity: 1.375, days: 3, duration: 60, experience: 'mittel', location: 'gym', equipment: ['kh'], diet: 'alles', allergies: [], meals: 4 });
  const [txt, setTxt] = useState(() => ({ age: String(p0(state).age), height: String(p0(state).height), weight: String(p0(state).weight).replace('.', ','), target: state.profile?.targetWeight ? String(state.profile.targetWeight).replace('.', ',') : '' }));
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((o) => ({ ...o, [k]: v }));
  const toggle = (k: 'equipment' | 'allergies', v: string) => setP((o) => ({ ...o, [k]: o[k].includes(v) ? o[k].filter((x) => x !== v) : [...o[k], v] }));

  const next = () => {
    setErr('');
    if (step === 1) {
      const age = Math.round(num(txt.age)), height = Math.round(num(txt.height)), weight = Math.round(num(txt.weight) * 10) / 10;
      if (!(age >= 14 && age <= 99)) return setErr('Bitte ein Alter zwischen 14 und 99 eingeben.');
      if (!(height >= 120 && height <= 230)) return setErr('Bitte eine Größe zwischen 120 und 230 cm eingeben.');
      if (!(weight >= 35 && weight <= 300)) return setErr('Bitte ein Gewicht zwischen 35 und 300 kg eingeben.');
      setP((o) => ({ ...o, age, height, weight, targetWeight: txt.target ? Math.round(num(txt.target) * 10) / 10 : null }));
    }
    if (step < STEPS - 1) return setStep(step + 1);
    setProfile(p);
    setDone(true);
  };

  const t = calcTargets(p), plan = buildPlan(p);
  let body = null;
  if (step === 0) body = (
    <>
      <View style={{ gap: 14, paddingTop: 12 }}>
        <Mark size={56} color={c.ember} />
        <Txt v="display">Willkommen bei Repwerk Fitness</Txt>
        <Txt muted>Essen eintragen, Makros sehen und mit einem Plan trainieren, der zu dir passt. Ein paar Fragen, dann ist alles eingerichtet.</Txt>
      </View>
      <Field label="Wie sollen wir dich nennen? (optional)" value={p.name} onChangeText={(v) => set('name', v.slice(0, 30))} placeholder="Vorname" autoComplete="given-name" />
      <Txt v="label">Was ist dein Hauptziel?</Txt>
      <Chips>{(Object.keys(GOALS) as Goal[]).map((g) => <Chip key={g} label={GOALS[g]} on={p.goal === g} onPress={() => set('goal', g)} />)}</Chips>
    </>
  );
  if (step === 1) body = (
    <>
      <Txt v="display">Dein Körper</Txt>
      <Txt muted>Daraus berechnen wir deinen Kalorienbedarf.</Txt>
      <Row><Field label="Alter" unit="Jahre" keyboardType="number-pad" value={txt.age} onChangeText={(v) => setTxt({ ...txt, age: v })} /><Field label="Größe" unit="cm" keyboardType="number-pad" value={txt.height} onChangeText={(v) => setTxt({ ...txt, height: v })} /></Row>
      <Row><Field label="Gewicht" unit="kg" keyboardType="decimal-pad" value={txt.weight} onChangeText={(v) => setTxt({ ...txt, weight: v })} /><Field label="Wunschgewicht" unit="kg" keyboardType="decimal-pad" placeholder="optional" value={txt.target} onChangeText={(v) => setTxt({ ...txt, target: v })} /></Row>
      <Txt v="label">Geschlecht (optional, für die Formel)</Txt>
      <Chips>{([['m', 'Männlich'], ['w', 'Weiblich'], ['', 'Keine Angabe']] as const).map(([v, l]) => <Chip key={l} label={l} on={p.sex === v} onPress={() => set('sex', v)} />)}</Chips>
    </>
  );
  if (step === 2) body = (
    <>
      <Txt v="display">Alltag und Training</Txt>
      <Txt v="label">Wie aktiv ist dein Alltag (ohne Training)?</Txt>
      <Chips>{ACT.map(([v, l]) => <Chip key={v} label={l} on={p.activity === v} onPress={() => set('activity', v)} />)}</Chips>
      <Txt v="label">Trainings pro Woche</Txt>
      <Chips>{[2, 3, 4, 5, 6].map((v) => <Chip key={v} label={`${v}×`} on={p.days === v} onPress={() => set('days', v)} />)}</Chips>
      <Txt v="label">Zeit pro Training</Txt>
      <Chips>{[30, 45, 60, 75, 90].map((v) => <Chip key={v} label={`${v} min`} on={p.duration === v} onPress={() => set('duration', v)} />)}</Chips>
      <Txt v="label">Trainingserfahrung</Txt>
      <Chips>{EXP.map(([v, l]) => <Chip key={v} label={l} on={p.experience === v} onPress={() => set('experience', v)} />)}</Chips>
    </>
  );
  if (step === 3) body = (
    <>
      <Txt v="display">Wo trainierst du?</Txt>
      <Chips><Chip label="Fitnessstudio" on={p.location === 'gym'} onPress={() => set('location', 'gym')} /><Chip label="Zu Hause" on={p.location === 'home'} onPress={() => set('location', 'home')} /></Chips>
      {p.location === 'home' ? (
        <>
          <Txt v="label">Was hast du zu Hause? (mehrere möglich)</Txt>
          <Chips>{HOME_EQ.map(([v, l]) => <Chip key={v} label={l} on={p.equipment.includes(v)} onPress={() => toggle('equipment', v)} />)}</Chips>
          <Txt v="caption" muted>Ohne Auswahl planen wir nur mit Körpergewicht.</Txt>
        </>
      ) : <Txt muted>Im Studio planen wir mit Langhantel, Kurzhanteln, Kabelzug und Maschinen.</Txt>}
    </>
  );
  if (step === 4) body = (
    <>
      <Txt v="display">Ernährung</Txt>
      <Txt v="label">Wie ernährst du dich?</Txt>
      <Chips>{DIETS.map(([v, l]) => <Chip key={v} label={l} on={p.diet === v} onPress={() => set('diet', v)} />)}</Chips>
      <Txt v="label">Unverträglichkeiten oder Allergien</Txt>
      <Chips>{ALLERGENS.map(([v, l]) => <Chip key={v} label={l} on={p.allergies.includes(v)} onPress={() => toggle('allergies', v)} />)}</Chips>
      <Txt v="label">Mahlzeiten pro Tag</Txt>
      <Chips>{[2, 3, 4, 5, 6].map((v) => <Chip key={v} label={String(v)} on={p.meals === v} onPress={() => set('meals', v)} />)}</Chips>
    </>
  );
  if (step === 5) body = (
    <>
      <Txt v="display">{p.name ? `Dein Plan steht, ${p.name}` : 'Dein Plan steht'}</Txt>
      <Card style={{ gap: 6 }}>
        <Txt v="caption" muted>Tagesziel</Txt>
        <Txt v="display" style={{ fontSize: 28 }}>{fmt(t.kcal)} kcal</Txt>
        <Txt>Protein {t.p} g · Kohlenhydrate {t.c} g · Fett {t.f} g</Txt>
        <Txt muted>Wasser {fmt1(t.water / 1000)} l</Txt>
      </Card>
      <Card style={{ gap: 6 }}>
        <Txt v="caption" muted>Training · {p.days}× pro Woche · {p.duration} min</Txt>
        <Txt v="title">{plan.name}</Txt>
        {plan.days.map((d) => <Txt key={d.name} v="caption" muted><Txt v="caption">{d.name}: </Txt>{d.ex.map((x) => EX[x.id].name).join(', ')}</Txt>)}
      </Card>
      <Txt v="caption" muted>Grundumsatz {fmt(t.bmr)} kcal × Aktivität {String(p.activity).replace('.', ',')} = {fmt(t.tdee)} kcal Bedarf. Das ist eine Schätzung. Passe die Ziele nach 2 bis 3 Wochen an, wenn sich dein Gewicht anders entwickelt als geplant.</Txt>
    </>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen padBottom={40}>
        <Row style={{ justifyContent: 'space-between' }}>
          {step > 0 ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Zurück" onPress={() => setStep(step - 1)} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" color={c.ink} />
            </Pressable>
          ) : <View />}
          <View style={{ width: 120, height: 6, borderRadius: 99, backgroundColor: c.surface2, overflow: 'hidden' }}>
            <View style={{ height: '100%', width: `${((step + 1) / STEPS) * 100}%`, backgroundColor: c.ember }} />
          </View>
        </Row>
        {body}
        {err ? <Txt v="caption" color={c.critical}>{err}</Txt> : null}
        <Button label={step === STEPS - 1 ? 'Los geht’s' : 'Weiter'} onPress={next} />
      </Screen>
    </KeyboardAvoidingView>
  );
}
