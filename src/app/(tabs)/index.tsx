import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components/icon';
import { Bar, Button, Card, Row, Ring, Screen, SectionTitle, Txt } from '@/components/ui';
import { buildPlan } from '@/lib/calc';
import { dayKey, fmt, fmt1 } from '@/lib/format';
import { SLOTS, dayTotals, useStore } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

export default function Today() {
  const { state, day, addWater } = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const p = state.profile!, g = state.targets!;
  const d = day(), t = dayTotals(d);
  const plan = buildPlan(p), next = plan.days[state.planIndex % plan.days.length];
  const meals = SLOTS.filter(([s]) => d.meals[s].length).length;
  const pLeft = Math.round(g.p - t.p), kLeft = Math.round(g.kcal - t.kcal);
  const tip = !t.kcal ? 'Noch nichts eingetragen. Tippe unten auf Plus und trag deine erste Mahlzeit ein.'
    : pLeft > 25 && kLeft > 150 ? `Noch ${pLeft} g Protein bis zum Ziel. 250 g Skyr oder Magerquark würden viel davon abdecken.`
    : kLeft < -150 ? `Heute ${fmt(-kLeft)} kcal über dem Ziel. Ein Tag zählt wenig, der Wochenschnitt zählt.`
    : `Noch ${fmt(kLeft)} kcal und ${Math.max(0, pLeft)} g Protein. Du liegst gut im Plan.`;
  const date = new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

  const macro = (label: string, color: string, v: number, goal: number) => (
    <View style={{ flex: 1, gap: 6 }}>
      <Txt v="label" numberOfLines={1}>{label}</Txt>
      <Bar value={v} goal={goal} color={color} />
      <Txt v="caption" muted><Txt v="label">{fmt(v)}</Txt> / {fmt(goal)} g</Txt>
    </View>
  );

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Txt v="caption" muted>{date}</Txt>
          <Txt v="display">{p.name ? `Hallo ${p.name}` : 'Heute'}</Txt>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Einstellungen" onPress={() => router.push('/settings')} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="gear" color={c.ink} />
        </Pressable>
      </Row>

      <Card style={{ gap: 16 }}>
        <View style={{ alignItems: 'center' }}><Ring size={172} eaten={t.kcal} goal={g.kcal} /></View>
        <Row style={{ alignItems: 'flex-start' }}>
          {macro('Protein', c.protein, t.p, g.p)}
          {macro('Kohlenhydrate', c.carbs, t.c, g.c)}
          {macro('Fett', c.fat, t.f, g.f)}
        </Row>
      </Card>

      <SectionTitle title="Dein Tag" />
      <Card style={{ paddingVertical: 4 }}>
        <DayRow icon="db" color={c.ember} title={next.name} sub={`${next.ex.length} Übungen`} action={<Button small label="Ansehen" onPress={() => router.push('/training')} />} />
        <DayRow icon="fork" color={c.carbs} title={meals ? `${meals} von 4 Mahlzeiten eingetragen` : 'Noch keine Mahlzeit'} sub={`${fmt(t.kcal)} von ${fmt(g.kcal)} kcal`} action={<Button small kind="secondary" label="Eintragen" onPress={() => router.push('/add-food')} />} />
        <DayRow last icon="drop" color={c.protein} title={`${fmt1(d.water / 1000)} von ${fmt1(g.water / 1000)} l Wasser`} sub={<Bar value={d.water} goal={g.water} color={c.protein} height={6} />} action={<Button small kind="secondary" label="+ 250 ml" onPress={() => addWater(250, dayKey())} />} />
      </Card>

      <View style={{ flexDirection: 'row', gap: 12, padding: 16, borderRadius: 22, backgroundColor: c.emberSoft }}>
        <Icon name="spark" color={c.emberInk} />
        <View style={{ flex: 1 }}>
          <Txt v="label" color={c.emberInk}>Tipp für dich</Txt>
          <Txt>{tip}</Txt>
        </View>
      </View>
    </Screen>
  );
}

function DayRow({ icon, color, title, sub, action, last }: { icon: 'db' | 'fork' | 'drop'; color: string; title: string; sub: ReactNode; action: ReactNode; last?: boolean }) {
  const { c } = useTheme();
  return (
    <Row style={{ paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: c.line }}>
      <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: color + '29' }}>
        <Icon name={icon} color={color} size={20} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Txt v="label">{title}</Txt>
        {typeof sub === 'string' ? <Txt v="caption" muted>{sub}</Txt> : sub}
      </View>
      {action}
    </Row>
  );
}
