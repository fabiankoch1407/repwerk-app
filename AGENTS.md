# Notes for coding agents

- Expo SDK 57 (React Native 0.86.3, React 19.2.3, expo-router ~57). Versions match `expo/templates/expo-template-default` at the `sdk-57` tag. Upgrade with `npx expo install expo@^58.0.0 --fix` once Expo Go for SDK 58 is in the stores.
- The owner tests in Expo Go through GitHub Codespaces (`npm run tunnel`). Only use libraries that run in Expo Go until we switch to a development build.
- UI language is German. All copy in sentence case, plain words, no exclamation marks in system messages.
- Design tokens live in `src/theme/tokens.ts`; never hardcode colours in screens.
- State is a single object in `src/lib/store.tsx`, saved to AsyncStorage. Supabase sync comes later; keep the state shape serialisable.
- Calculations (`src/lib/calc.ts`) are ported from the web prototype and must stay in sync with it.
