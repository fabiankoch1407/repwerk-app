# Repwerk Fitness

Fitness- und Ernährungs-App als installierbare Web-App für iPhone und Android. Keine App-Store-Installation nötig: Link öffnen, auf den Startbildschirm legen, fertig. Funktioniert auch offline.

## App aufs Handy holen

Die App läuft unter der Adresse, die Cloudflare dir nach dem Einrichten zeigt (zum Beispiel `https://repwerk-app.pages.dev`).

- **iPhone:** Adresse in Safari öffnen → **Teilen** → **Zum Home-Bildschirm**.
- **Android:** Adresse in Chrome öffnen → **Installieren** (oder Menü ⋮ → **App installieren**).

Neue Versionen kommen automatisch: Jede Änderung in diesem Repository wird in etwa einer Minute veröffentlicht. Schließe die App und öffne sie neu, dann ist der neue Stand da.

## Einmalig einrichten (Cloudflare Pages, kostenlos)

1. Konto anlegen auf [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. **Workers & Pages → Create → Pages → Import an existing Git repository**.
3. GitHub verbinden und `repwerk-app` auswählen.
4. Einstellungen: Production branch `main`, Framework preset **None**, Build command **leer lassen**, Build output directory `/`.
5. **Save and Deploy**. Nach etwa einer Minute erscheint deine Adresse.

## KI einschalten (Foto-Scan, Coach, Ernährungsplan)

Die KI läuft über eine kleine Server-Funktion bei Cloudflare (`functions/api/ai.js`). Der Schlüssel bleibt auf dem Server und kommt nie aufs Handy.

1. Konto in der [Anthropic Console](https://console.anthropic.com) anlegen, Guthaben aufladen und ein **monatliches Ausgabelimit** setzen.
2. Einen API-Schlüssel erstellen.
3. In Cloudflare: dein Projekt → **Settings → Variables and Secrets → Add** → Typ **Secret**, Name `ANTHROPIC_API_KEY`, Wert = dein Schlüssel.
4. **Deployments → Retry deployment** beim neuesten Eintrag, damit der Schlüssel aktiv wird.

Solange kein Schlüssel eingetragen ist, zeigt die App bei den KI-Funktionen einen Hinweis und alles andere funktioniert normal.

## Projektaufbau

| Datei / Ordner | Inhalt |
| --- | --- |
| `index.html` | Die fertige App (wird aus `src/` gebaut) |
| `src/` | Quellcode: `head.html` (Layout und Design), `app.js` (App), `data.js` (Lebensmittel, Übungen), `anim.js` (Übungs-Animationen), `i18n.js` (Englisch) |
| `functions/api/` | Server-Funktionen bei Cloudflare: `health.js`, `ai.js` |
| `manifest.webmanifest`, `sw.js`, `icons/` | Installierbarkeit und Offline-Betrieb |
| `build.py` | Baut `index.html` und `sw.js` aus `src/` (`python3 build.py`) |

Der frühere Expo-Stand liegt im Zweig `expo-app`.
