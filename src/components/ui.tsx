// Small building blocks used on every screen.
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { fmt } from '@/lib/format';
import { useTheme } from '@/theme/use-theme';
import { radius, space, type } from '@/theme/tokens';

type TxtVariant = keyof typeof type;
export function Txt({ v = 'body', muted, color, style, children, numberOfLines }: { v?: TxtVariant; muted?: boolean; color?: string; style?: StyleProp<TextStyle>; children: ReactNode; numberOfLines?: number }) {
  const { c } = useTheme();
  return <Text numberOfLines={numberOfLines} style={[type[v], { color: color ?? (muted ? c.inkMuted : c.ink) }, style]}>{children}</Text>;
}

export function Screen({ children, scroll = true, padBottom = 120 }: { children: ReactNode; scroll?: boolean; padBottom?: number }) {
  const { c } = useTheme();
  const body = <View style={{ padding: space.lg, gap: 14, paddingBottom: padBottom }}>{children}</View>;
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled">{body}</ScrollView> : body}
    </SafeAreaView>
  );
}

export function Card({ children, style, onPress }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const { c } = useTheme();
  const st = [{ backgroundColor: c.surface, borderColor: c.line, borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.lg, padding: space.lg }, style];
  return onPress ? <Pressable onPress={onPress} style={st}>{children}</Pressable> : <View style={st}>{children}</View>;
}

export function Button({ label, onPress, kind = 'primary', small, disabled, icon }: { label: string; onPress: () => void; kind?: 'primary' | 'secondary' | 'ghost'; small?: boolean; disabled?: boolean; icon?: ReactNode }) {
  const { c } = useTheme();
  const bg = kind === 'primary' ? c.ember : kind === 'secondary' ? c.surface2 : 'transparent';
  const fg = kind === 'primary' ? c.onEmber : kind === 'secondary' ? c.ink : c.emberInk;
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={({ pressed }) => ({ height: small ? 40 : 50, paddingHorizontal: small ? 14 : 20, borderRadius: radius.md, backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.85 : 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 })}>
      {icon}
      <Text style={{ color: fg, fontWeight: '700', fontSize: small ? 14 : 16 }}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, on, onPress }: { label: string; on?: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: !!on }} onPress={onPress}
      style={{ paddingHorizontal: 14, height: 40, borderRadius: 999, justifyContent: 'center', borderWidth: 1.5, borderColor: on ? c.ember : c.line, backgroundColor: on ? c.emberSoft : c.surface }}>
      <Text style={{ color: on ? c.emberInk : c.ink, fontWeight: '600', fontSize: 15 }}>{label}</Text>
    </Pressable>
  );
}

export function Chips({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{children}</View>;
}

export function Field({ label, unit, ...props }: TextInputProps & { label: string; unit?: string }) {
  const { c } = useTheme();
  return (
    <View style={{ gap: 6, flex: 1 }}>
      <Txt v="label">{label}</Txt>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface2, borderRadius: radius.sm, borderWidth: 1, borderColor: c.line, paddingHorizontal: 14 }}>
        <TextInput placeholderTextColor={c.inkMuted} {...props} style={{ flex: 1, height: 50, fontSize: 18, color: c.ink }} />
        {unit ? <Txt muted>{unit}</Txt> : null}
      </View>
    </View>
  );
}

export function Ring({ size, eaten, goal }: { size: number; eaten: number; goal: number }) {
  const { c } = useTheme();
  const r = size / 2 - 10, circ = 2 * Math.PI * r, pct = goal ? Math.min(1, eaten / goal) : 0, left = Math.round(goal - eaten);
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.surface2} strokeWidth={13} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.ember} strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray={`${circ * pct} ${circ}`} />
      </Svg>
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <Txt v="display" style={{ fontSize: size > 160 ? 38 : 30, lineHeight: size > 160 ? 42 : 34 }}>{left >= 0 ? fmt(left) : '+' + fmt(-left)}</Txt>
        <Txt v="caption" muted>{left >= 0 ? 'kcal übrig' : 'kcal über Ziel'}</Txt>
      </View>
    </View>
  );
}

export function Bar({ value, goal, color, height = 8 }: { value: number; goal: number; color: string; height?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ height, backgroundColor: c.surface2, borderRadius: 99, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${goal ? Math.min(100, (value / goal) * 100) : 0}%`, backgroundColor: color, borderRadius: 99 }} />
    </View>
  );
}

export function SectionTitle({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
      <Txt v="title">{title}</Txt>
      {right}
    </View>
  );
}

export function Row({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, style]}>{children}</View>;
}
