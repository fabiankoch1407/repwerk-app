import { Redirect, Tabs, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '@/components/icon';
import { useStore } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

const TABS: { name: string; label: string; icon: IconName }[] = [
  { name: 'index', label: 'Heute', icon: 'home' },
  { name: 'food', label: 'Essen', icon: 'fork' },
  { name: 'training', label: 'Training', icon: 'db' },
  { name: 'community', label: 'Community', icon: 'users' },
];

export default function TabLayout() {
  const { state } = useStore();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  if (!state.profile) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state: nav, navigation }) => {
        const item = (t: (typeof TABS)[number]) => {
          const idx = nav.routes.findIndex((r) => r.name === t.name);
          const on = nav.index === idx;
          return (
            <Pressable key={t.name} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => navigation.navigate(t.name)} style={{ flex: 1, alignItems: 'center', gap: 3, paddingTop: 6 }}>
              <View style={{ paddingHorizontal: 14, paddingVertical: 3, borderRadius: 99, backgroundColor: on ? c.emberSoft : 'transparent' }}>
                <Icon name={t.icon} color={on ? c.ember : c.inkMuted} />
              </View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: on ? c.ink : c.inkMuted }}>{t.label}</Text>
            </Pressable>
          );
        };
        return (
          <View style={{ flexDirection: 'row', backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.line, paddingBottom: Math.max(insets.bottom, 10), paddingHorizontal: 6 }}>
            {item(TABS[0])}
            {item(TABS[1])}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Pressable accessibilityRole="button" accessibilityLabel="Essen hinzufügen" onPress={() => router.push('/add-food')}
                style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: c.ember, alignItems: 'center', justifyContent: 'center', marginTop: -22, borderWidth: 6, borderColor: c.bg }}>
                <Icon name="plus" color={c.onEmber} size={26} />
              </Pressable>
            </View>
            {item(TABS[2])}
            {item(TABS[3])}
          </View>
        );
      }}>
      {TABS.map((t) => <Tabs.Screen key={t.name} name={t.name} options={{ title: t.label }} />)}
    </Tabs>
  );
}
