# Repwerk Fitness

Fitness- und Ernährungs-App für iOS und Android, gebaut mit Expo (SDK 57) und React Native.

## App auf dem Handy testen (ohne Installation auf dem Computer)

Einmalig:

1. Lade **Expo Go** aus dem App Store oder von Google Play.
2. Leg auf [expo.dev](https://expo.dev/signup) ein kostenloses Konto an und melde dich damit in Expo Go an.

Jedes Mal:

1. Öffne dieses Repository auf GitHub und klicke auf **Code → Codespaces**.
   - Beim ersten Mal: **Create codespace on main**. Das Einrichten dauert ein paar Minuten.
   - Danach: deinen vorhandenen Codespace in der Liste öffnen.
2. Unten im Fenster (Terminal) beim ersten Mal einmalig anmelden:
   ```
   npx expo login
   ```
3. Hol den neuesten Stand und starte die App:
   ```
   git pull
   npm run tunnel
   ```
4. Scanne den QR-Code:
   - **iPhone:** mit der Kamera-App, dann „In Expo Go öffnen“.
   - **Android:** in Expo Go auf **Scan QR code**.

Zum Beenden im Terminal **Strg + C** drücken. Einen Codespace, den du nicht nutzt, hält GitHub nach 30 Minuten automatisch an.

## Projektaufbau

| Ordner | Inhalt |
| --- | --- |
| `src/app` | Bildschirme (Expo Router): Tabs, Fragebogen, Essen eintragen, Einstellungen |
| `src/components` | Bausteine wie Karte, Button, Kalorienring, Icons |
| `src/lib` | Speicher, Berechnung von Kalorien und Trainingsplan, Formatierung |
| `src/data` | Lebensmittel und Übungen |
| `src/theme` | Farben, Schriftgrößen, Abstände (Repwerk Design System) |

## Stand

- [x] Phase 2a: Grundgerüst, Design, Navigation, Fragebogen, Essen eintragen, Wasser (Speicherung auf dem Handy)
- [ ] Phase 2b: Training mit Sätzen, Pausen-Timer und Übungs-Animationen
- [ ] Phase 3: Login und Speicherung in Supabase
- [ ] Phase 4: Foto-Scan und AI Coach
- [ ] Danach: Community, Pro-Abo, Werbung, Widgets, Veröffentlichung
