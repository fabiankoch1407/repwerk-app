// Repwerk design tokens (same values as the design system and the web prototype).
export type Palette = {
  bg: string; surface: string; surface2: string; line: string;
  ink: string; inkMuted: string;
  ember: string; onEmber: string; emberInk: string; emberSoft: string;
  protein: string; carbs: string; fat: string;
  good: string; warning: string; critical: string;
};

export const dark: Palette = {
  bg: '#111214', surface: '#1A1C20', surface2: '#23262B', line: '#2E3238',
  ink: '#F4F0EA', inkMuted: '#ADA49B',
  ember: '#FF5B2E', onEmber: '#1C1714', emberInk: '#FF8A63', emberSoft: '#3B2018',
  protein: '#38BDD8', carbs: '#E9C46A', fat: '#E5679A',
  good: '#3DBE7A', warning: '#F59E0B', critical: '#EF4E5A',
};

export const light: Palette = {
  bg: '#F5F4F1', surface: '#FFFFFF', surface2: '#EFEDE8', line: '#E4E2DD',
  ink: '#1C1714', inkMuted: '#6A615A',
  ember: '#FF5B2E', onEmber: '#1C1714', emberInk: '#B8400F', emberSoft: '#FFE6DC',
  protein: '#1597B5', carbs: '#B98A12', fat: '#C2457A',
  good: '#1F9D5C', warning: '#C27803', critical: '#D33240',
};

export const radius = { sm: 8, md: 14, lg: 22 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const type = {
  display: { fontSize: 30, lineHeight: 34, fontWeight: '800' as const, letterSpacing: -0.3 },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '800' as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
};
