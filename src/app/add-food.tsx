import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/components/icon';
import { Button, Chip, Chips, Row, Txt } from '@/components/ui';
import { FOODS, type Food } from '@/data/foods';
import { fmt, fmt1, num, uid } from '@/lib/format';
import { SLOTS, useStore, type Slot } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

const NUTRIENTS = ['fib', 'sug', 'sat', 'salt', 'mufa', 'pufa', 'trans', 'chol', 'kal', 'ca', 'fe', 'va', 'vc'] as const;

function defaultSlot(): Slot {
  const h = new Date().getHours();
  return h < 11 ? 'fruehstueck' : h < 15 ? 'mittag' : h < 18 ? 'snacks' : 'abend';
}

export default function AddFood() {
  const params = useLocalSearchParams<{ slot?: Slot }>();
  const { addEntry, addWater } = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [picked, setPicked] = useState<Food | null>(null);
  const [grams, setGrams] = useState('');
  const [slot, setSlot] = useState<Slot>(params.slot && SLOTS.some(([s]) => s === params.slot) ? params.slot : defaultSlot());
  const list = useMemo(() => FOODS.filter((f) => !q || f.name.toLowerCase().includes(q.toLowerCase())), [q]);

  const save = () => {
    if (!picked) return;
    const g = Math.max(1, Math.round(num(grams) || picked.portion)), k = g / 100;
    const extra: Record<string, number> = {};
    for (const n of NUTRIENTS) extra[n] = Math.round(picked[n] * k * 10) / 10;
    addEntry(slot, { id: uid(), name: picked.name, grams: g, kcal: Math.round(picked.kcal * k), p: Math.round(picked.p * k * 10) / 10, c: Math.round(picked.c * k * 10) / 10, f: Math.round(picked.f * k * 10) / 10, src: 'db', ...extra });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ padding: 16, gap: 12, flex: 1 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Txt v="display" style={{ fontSize: 26 }}>{picked ? picked.name : 'Essen eintragen'}</Txt>
            <Pressable accessibilityRole="button" accessibilityLabel="Schließen" onPress={() => (picked ? setPicked(null) : router.back())} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={picked ? 'back' : 'x'} color={c.ink} />
            </Pressable>
          </Row>

          {picked ? (
            <View style={{ gap: 14 }}>
              <Txt muted>Pro 100 g: {picked.kcal} kcal · {fmt1(picked.p)} g Protein · {fmt1(picked.c)} g KH · {fmt1(picked.f)} g Fett</Txt>
              <View style={{ gap: 6 }}>
                <Txt v="label">Menge</Txt>
                <Row style={{ backgroundColor: c.surface2, borderRadius: 8, borderWidth: 1, borderColor: c.line, paddingHorizontal: 14 }}>
                  <TextInput autoFocus keyboardType="number-pad" value={grams} onChangeText={setGrams} placeholder={String(picked.portion)} placeholderTextColor={c.inkMuted} style={{ flex: 1, height: 52, fontSize: 20, fontWeight: '700', color: c.ink }} />
                  <Txt muted>g</Txt>
                </Row>
                <Txt v="caption" muted>Leer lassen für eine übliche Portion ({picked.portion} g): {fmt((picked.kcal * (num(grams) || picked.portion)) / 100)} kcal</Txt>
              </View>
              <Txt v="label">Mahlzeit</Txt>
              <Chips>{SLOTS.map(([s, l]) => <Chip key={s} label={l} on={slot === s} onPress={() => setSlot(s)} />)}</Chips>
              <Button label="Speichern" onPress={save} />
            </View>
          ) : (
            <>
              <Row style={{ backgroundColor: c.surface2, borderRadius: 8, borderWidth: 1, borderColor: c.line, paddingHorizontal: 12 }}>
                <Icon name="search" color={c.inkMuted} size={20} />
                <TextInput value={q} onChangeText={setQ} placeholder="Lebensmittel suchen, z. B. Skyr" placeholderTextColor={c.inkMuted} style={{ flex: 1, height: 50, fontSize: 17, color: c.ink }} autoCorrect={false} />
              </Row>
              <Pressable accessibilityRole="button" onPress={() => { addWater(250); router.back(); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, backgroundColor: c.protein + '24' }}>
                <Icon name="drop" color={c.protein} />
                <View style={{ flex: 1 }}><Txt v="label">250 ml Wasser</Txt><Txt v="caption" muted>zählt zu deinem Wasserziel</Txt></View>
                <Icon name="plus" color={c.ink} size={20} />
              </Pressable>
              <FlatList
                data={list}
                keyExtractor={(f) => f.id}
                keyboardShouldPersistTaps="handled"
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: c.line }} />}
                renderItem={({ item }) => (
                  <Pressable accessibilityRole="button" onPress={() => { setPicked(item); setGrams(''); }} style={{ paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Txt v="label">{item.name}</Txt>
                      <Txt v="caption" muted>pro 100 g: {item.kcal} kcal · {fmt1(item.p)} g Protein</Txt>
                    </View>
                    <Icon name="next" color={c.inkMuted} size={18} />
                  </Pressable>
                )}
                ListEmptyComponent={<Txt muted>Nichts gefunden. Foto-Scan und die große Lebensmittel-Datenbank kommen in einem der nächsten Schritte.</Txt>}
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
