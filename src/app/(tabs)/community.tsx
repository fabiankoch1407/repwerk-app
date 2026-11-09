import { Card, Screen, Txt } from '@/components/ui';

export default function Community() {
  return (
    <Screen>
      <Txt v="display">Community</Txt>
      <Card style={{ gap: 6 }}>
        <Txt v="title">Kommt mit dem Login</Txt>
        <Txt muted>Freunde, Feed und geteilte Workouts brauchen ein Konto. Das bauen wir, sobald Supabase verbunden ist.</Txt>
      </Card>
    </Screen>
  );
}
