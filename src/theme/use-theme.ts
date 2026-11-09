import { useColorScheme } from 'react-native';
import { useStore } from '@/lib/store';
import { dark, light, type Palette } from './tokens';

export function useTheme(): { c: Palette; isDark: boolean } {
  const system = useColorScheme();
  const { state } = useStore();
  const isDark = state.theme === 'dark' || (state.theme === 'system' && system !== 'light');
  return { c: isDark ? dark : light, isDark };
}
