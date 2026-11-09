import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components/icon';
import { Bar, Button, Card, Row, Screen, Txt } from '@/components/ui';
import { fmt, fmt1 } from '@/lib/format';
import { SLOTS, dayTotals, useStore } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

export default function Food() {
  const { state, day, removeEntry, addWater } = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const g = state.targets!, d = day(), t = dayTotals(d), left = g.kcal - t.kcal;

  const eqItem = (v: number, label: string, color?: string) => (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Txt v="title" color={color} style={{ fontSize: 24, lineHeight: 28 }}>{fmt(v)}</Txt>
      <Txt v="caption" muted>{label}</Txt>
    </View>
  );

  return (
    <Screen>
      <Txt v="caption" muted>Heute</Txt>
      <Txt v="display">Essen</Txt>

      <Card style={{ gap: 12 }}>
        <Txt v="caption" muted>Verbleibende Kalorien</Txt>
        <Row style={{ gap: 4 }}>
          {eqItem(g.kcal, 'Ziel')}<Txt muted>−</Txt>{eqItem(t.kcal, 'Essen')}<Txt muted>=</Txt>{eqItem(left, 'Übrig', left < 0 ? c.warning : c.emberInk)}
        </Row>
        <View style={{ gap: 10 }}>
          {([['Protein', c.protein, t.p, g.p], ['Kohlenhydrate', c.carbs, t.c, g.c], ['Fett', c.fat, t.f, g.f]] as const).map(([l, col, v, gl]) => (
            <View key={l} style={{ gap: 4 }}>
              <Row style={{ justifyContent: 'space-between' }}><Txt v="label">{l}</Txt><Txt v="caption" muted>{fmt(v)} / {fmt(gl)} g</Txt></Row>
              <Bar value={v} goal={gl} color={col} />
            </View>
          ))}
        </View>
        <Row style={{ justifyContent: 'space-between' }}>
          <Txt v="caption" muted>Wasser {fmt1(d.water / 1000)} von {fmt1(g.water / 1000)} l</Txt>
          <Button small kind="ghost" label="+ 250 ml" onPress={() => addWater(250)} />
        </Row>
      </Card>

      {SLOTS.map(([slot, label]) => {
        const items = d.meals[slot], kc = items.reduce((a, e) => a + e.kcal, 0);
        return (
          <Card key={slot} style={{ gap: 6 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Txt v="title">{label}</Txt>
              <Row style={{ gap: 8 }}>
                <Txt muted>{fmt(kc)} kcal</Txt>
                <Pressable accessibilityRole="button" accessibilityLabel={`${label} eintragen`} onPress={() => router.push({ pathname: '/add-food', params: { slot } })} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: c.ember, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="plus" color={c.onEmber} size={20} />
                </Pressable>
              </Row>
            </Row>
            {items.length ? items.map((e) => (
              <Row key={e.id} style={{ paddingVertical: 8, borderTopWidth: 1, borderTopColor: c.line }}>
                <View style={{ flex: 1 }}>
                  <Txt v="label">{e.name}</Txt>
                  <Txt v="caption" muted>{fmt(e.grams)} g · {fmt(e.p)} g Protein · {fmt(e.c)} g KH · {fmt(e.f)} g Fett</Txt>
                </View>
                <Txt v="label">{fmt(e.kcal)}</Txt>
                <Pressable accessibilityRole="button" accessibilityLabel={`${e.name} löschen`} onPress={() => removeEntry(slot, e.id)} hitSlop={8}>
                  <Icon name="trash" color={c.inkMuted} size={18} />
                </Pressable>
              </Row>
            )) : <Txt v="caption" muted>Noch nichts eingetragen.</Txt>}
          </Card>
        );
      })}
    </Screen>
  );
}
