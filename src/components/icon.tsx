import Svg, { Circle, Path, Rect } from 'react-native-svg';

const P: Record<string, string> = {
  home: 'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z',
  fork: 'M7 3v6a3 3 0 0 0 6 0V3M10 3v18M17 3c-1.7 1-2.5 3-2.5 6s1 4 2.5 4v8',
  db: 'M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11',
  users: 'M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5M15.5 4.8a3.5 3.5 0 0 1 0 6.4M17.5 14.8c2 .7 3.4 2.5 4 5.2',
  plus: 'M12 5v14M5 12h14',
  search: 'm20 20-4.5-4.5',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6 6 18',
  back: 'M15 5l-7 7 7 7',
  next: 'M9 5l7 7-7 7',
  trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13',
  play: 'M8 5v14l11-7z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.6 4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 20.4 9H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 2z',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  cam: 'M4 8h3l2-3h6l2 3h3v11H4z',
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 22, color }: { name: IconName; size?: number; color: string }) {
  const filled = name === 'play';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {name === 'users' && <Circle cx={9} cy={8} r={3.5} />}
      {name === 'search' && <Circle cx={11} cy={11} r={6} />}
      {name === 'cam' && <Circle cx={12} cy={13} r={3.5} />}
      <Path d={P[name]} fill={filled ? color : 'none'} stroke={filled ? 'none' : color} />
    </Svg>
  );
}

// Repwerk dumbbell mark
export function Mark({ size = 40, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <Rect x={3} y={22} width={7} height={20} rx={3} />
      <Rect x={12} y={13} width={9} height={38} rx={3.5} />
      <Rect x={20} y={28.5} width={24} height={7} rx={2} />
      <Rect x={43} y={13} width={9} height={38} rx={3.5} />
      <Rect x={54} y={22} width={7} height={20} rx={3} />
    </Svg>
  );
}
