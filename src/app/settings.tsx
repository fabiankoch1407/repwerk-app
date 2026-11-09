import { useRouter } from 'expo-router';
import { Alert, Pressable, View } from 'react-native';
import { Icon } from '@/components/icon';
import { Button, Card, Chip, Chips, Row, Screen, Txt } from '@/components/ui';
import { GOALS } from '@/lib/calc';
import { fmt, fmt1 } from '@/lib/format';
import { useStore, type ThemeMode } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

export default function Settings() {
  const { state, setTheme, reset } = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const p = state.profile, g = state.targets;

  const confirmReset = () =>
    Alert.alert('Alle Daten löschen?', 'Profil, Mahlzeiten und Wasser werden auf diesem Handy gelöscht.', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: () => { reset(); router.replace('/onboarding'); } },
    ]);

  return (
    <Screen>
      <Row>
        <Pressable accessibilityRole="button" accessibilityLabel="Zurück" onPress={() => router.back()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="back" color={c.ink} />
        </Pressable>
        <Txt v="display">Einstellungen</Txt>
      </Row>
      {p && g ? (
        <Card style={{ gap: 6 }}>
          <Txt v="title">Ziele</Txt>
          <Txt muted>{GOALS[p.goal]} · {p.age} Jahre · {p.height} cm · {fmt1(p.weight)} kg · {p.days}× {p.duration} min</Txt>
          <Txt muted>Tagesziel {fmt(g.kcal)} kcal · {g.p} g Protein · {g.c} g Kohlenhydrate · {g.f} g Fett</Txt>
          <View style={{ marginTop: 8 }}><Button kind="secondary" label="Fragen erneut beantworten" onPress={() => router.push('/onboarding')} /></View>
        </Card>
      ) : null}
      <Card style={{ gap: 10 }}>
        <Txt v="title">Darstellung</Txt>
        <Chips>{([['system', 'System'], ['light', 'Hell'], ['dark', 'Dunkel']] as [ThemeMode, string][]).map(([v, l]) => <Chip key={v} label={l} on={state.theme === v} onPress={() => setTheme(v)} />)}</Chips>
      </Card>
      <Card style={{ gap: 6 }}>
        <Txt v="title">Datenschutz</Txt>
        <Txt muted>Im Moment speichert die App alles nur auf diesem Handy. Mit dem Login kommt die verschlüsselte Speicherung in Supabase (Rechenzentrum Frankfurt).</Txt>
      </Card>
      <Button kind="ghost" label="Alle Daten löschen" onPress={confirmReset} />
    </Screen>
  );
}
