import { View } from 'react-native';
import { Card, Row, Screen, SectionTitle, Txt } from '@/components/ui';
import { EX } from '@/data/exercises';
import { buildPlan } from '@/lib/calc';
import { useStore } from '@/lib/store';
import { useTheme } from '@/theme/use-theme';

export default function Training() {
  const { state } = useStore();
  const { c } = useTheme();
  const plan = buildPlan(state.profile!), next = plan.days[state.planIndex % plan.days.length];

  return (
    <Screen>
      <Txt v="caption" muted>{plan.name}</Txt>
      <Txt v="display">Training</Txt>

      <View style={{ backgroundColor: c.ember, borderRadius: 22, padding: 18, gap: 8 }}>
        <Txt v="caption" color={c.onEmber}>Nächstes Training</Txt>
        <Txt v="display" color={c.onEmber} style={{ fontSize: 26, lineHeight: 30 }}>{next.name}</Txt>
        <Txt color={c.onEmber}>{next.ex.map((x) => EX[x.id].name).join(', ')}</Txt>
      </View>

      <SectionTitle title="Dein Plan" />
      {plan.days.map((d) => (
        <Card key={d.name} style={{ gap: 6 }}>
          <Txt v="title">{d.name}</Txt>
          {d.ex.map((x) => (
            <Row key={x.id} style={{ justifyContent: 'space-between' }}>
              <Txt style={{ flex: 1 }}>{EX[x.id].name}</Txt>
              <Txt v="caption" muted>{x.sets} × {x.reps}</Txt>
            </Row>
          ))}
        </Card>
      ))}
      <Txt v="caption" muted>Das Training mit Sätzen, Pausen-Timer und Animationen kommt im nächsten Schritt.</Txt>
    </Screen>
  );
}
