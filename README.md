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

**Limits:** Sobald Supabase eingerichtet ist (nächster Abschnitt), braucht jede KI-Anfrage ein angemeldetes Konto, und die Datenbank zählt mit (`use_ai` in `supabase/setup.sql`):

| | Free | Pro |
| --- | --- | --- |
| Foto-Scan | 3 pro Tag | 30 pro Tag |
| Essen beschreiben | 10 pro Tag | 60 pro Tag |
| AI Coach | 5 pro Woche | 50 pro Tag |
| Ernährungsplan | – | 3 pro Woche |

Ohne Supabase ist die KI für alle offen, die die Adresse kennen. Dann schützt nur das Ausgabelimit in der Anthropic Console.

## Login und Cloud-Speicher einschalten (Supabase, kostenlos)

Ohne Konto liegen alle Daten nur auf dem Handy. Mit Supabase melden sich Nutzer per E-Mail-Code an (kein Passwort), und ihre Daten sind auf jedem Gerät da.

1. Auf [supabase.com](https://supabase.com) ein Projekt anlegen. Als Region **Central EU (Frankfurt)** wählen.
2. **SQL Editor → New query**: den Inhalt von `supabase/setup.sql` einfügen und **Run** klicken. Das legt die Tabellen für Speicher und Community mit Zugriffsschutz an. Nach Updates der Datei einfach erneut ausführen.
3. **Authentication → Emails (Email Templates)**: in den Vorlagen **Magic Link** und **Confirm signup** den Link durch den Code ersetzen, zum Beispiel:
   `<h2>Dein Repwerk-Code</h2><p>Gib diesen Code in der App ein: <strong>{{ .Token }}</strong></p>`
4. **Project Settings → API Keys**: die **Project URL** und den **Publishable key** (`sb_publishable_…`) kopieren. Niemals den Secret key verwenden.
5. In Cloudflare: dein Projekt → **Settings → Variables and Secrets** → zwei Variablen anlegen: `SUPABASE_URL` und `SUPABASE_PUBLISHABLE_KEY`. Danach **Deployments → Retry deployment**.

Hinweis: Der eingebaute E-Mail-Versand von Supabase schickt nur wenige Mails pro Stunde. Für den Start mit echten Nutzern unter **Authentication → Emails → SMTP Settings** einen eigenen Anbieter eintragen (zum Beispiel Brevo oder Resend).

In der App: **Profil → Einstellungen → Konto** zum Anmelden, Synchronisieren, Exportieren und Konto löschen. Mit Konto funktioniert auch die **Community**: Workouts teilen, Freunde per Name suchen oder per Einladungslink (`?freund=…`) hinzufügen, Feed.

## Bezahlung für Pro einschalten (Stripe)

Voraussetzung: Supabase ist eingerichtet. Zuerst alles im **Testmodus** von Stripe ausprobieren (Testkarte `4242 4242 4242 4242`).

1. Auf [stripe.com](https://stripe.com) ein Konto anlegen.
2. **Produktkatalog → Produkt hinzufügen**: „Repwerk Pro“ mit zwei wiederkehrenden Preisen, 8,99 € monatlich und 59,99 € jährlich. Die beiden Preis-IDs (`price_…`) kopieren.
3. **Entwickler → Webhooks → Endpunkt hinzufügen**: URL `https://<deine-app>/api/stripe-webhook`, Ereignisse `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`. Das **Signing secret** (`whsec_…`) kopieren.
4. **Einstellungen → Billing → Kundenportal** aktivieren (Kündigen, Zahlungsmethode ändern).
5. In Supabase unter **Project Settings → API Keys** einen **Secret key** (`sb_secret_…`) anlegen. Der bleibt nur auf dem Server.
6. In Cloudflare als **Secrets** anlegen: `STRIPE_SECRET_KEY` (`sk_test_…`, später `sk_live_…`), `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SECRET_KEY`. Als Variablen: `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_YEARLY`, optional `STRIPE_TRIAL_DAYS` (z. B. `7`). Danach **Retry deployment**.

Die App zeigt dann im Pro-Fenster echte Kauf-Knöpfe statt der Demo. Nach dem Bezahlen schreibt der Webhook den Pro-Status in die Datenbank, die App liest ihn von dort. Kündigen und Rechnungen laufen über **Einstellungen → Abo → Verwalten**.

Vor dem Live-Schalten brauchst du Impressum, Datenschutzerklärung, AGB mit Widerrufsbelehrung und Angaben zum Steuerstatus in Stripe. Hinweis: In den App-Stores ist für digitale Abos meist der Kauf über Apple bzw. Google vorgeschrieben. Stripe gilt für die Web-App.

## Rechtstexte (Impressum, Datenschutz, AGB, Kündigung)

Die Seiten liegen in `legal/` und sind in der App unten auf jeder Seite verlinkt (Impressum · Datenschutz · AGB · Verträge hier kündigen).

1. **`legal/anbieter.js` ausfüllen:** Name, Anschrift, E-Mail, Telefon, ggf. USt-ID, Kleinunternehmer ja/nein, zuständige Datenschutz-Aufsichtsbehörde. Solange Pflichtangaben fehlen, zeigen die Seiten einen roten Entwurf-Hinweis. Du kannst die Datei direkt auf GitHub bearbeiten.
2. **Auftragsverarbeitungsverträge** abschließen bzw. in den Konten bestätigen: Cloudflare, Supabase, Anthropic, Stripe (und dein Mail-Anbieter).
3. **Kündigungsbestätigung per E-Mail** (Pflicht nach § 312k BGB): bei [Resend](https://resend.com) ein Konto anlegen, deine Domain bestätigen und in Cloudflare die Secrets `RESEND_API_KEY` und `MAIL_FROM` (z. B. `Repwerk <hallo@deine-domain.de>`) setzen. Ohne diese Angaben wird die Kündigung trotzdem bei Stripe ausgeführt und in der Tabelle `cancellations` gespeichert, die Bestätigungs-Mail musst du dann selbst schicken.
4. **Kündigungen prüfen:** In Supabase unter **Table Editor → cancellations**. Einträge mit `status = review` (außerordentlich) oder `not_found` (kein Abo gefunden) bearbeitest du selbst, bei `refund_due = true` erstattest du den anteiligen Betrag in Stripe.
5. Lass die Texte vor dem Start **anwaltlich prüfen**. Sie sind auf die App zugeschnitten, ersetzen aber keine Rechtsberatung.

## Projektaufbau

| Datei / Ordner | Inhalt |
| --- | --- |
| `index.html` | Die fertige App (wird aus `src/` gebaut) |
| `src/` | Quellcode: `head.html` (Layout und Design), `app.js` (App), `data.js` (Lebensmittel, Übungen), `anim.js` (Übungs-Animationen), `i18n.js` (Englisch), `smart.js` (Smarter Coach), `cloud.js` (Login und Sync), `barcode.js` (Barcode-Scanner und Open Food Facts), `media.js` (Workout-Fotos) |
| `functions/api/` | Server-Funktionen bei Cloudflare: `health.js`, `ai.js` (KI mit Limits), `food.js` (Open Food Facts), `checkout.js`, `portal.js`, `stripe-webhook.js` (Pro-Abo), `cancel.js` (Kündigungsbutton) |
| `supabase/setup.sql` | Datenbank-Einrichtung für Login und Sync |
| `legal/` | Impressum, Datenschutz, AGB mit Widerrufsbelehrung, Kündigungsseite; Anbieterdaten in `legal/anbieter.js` |
| `fonts/` | Selbst gehostete Schriften (Archivo, Figtree; SIL Open Font License) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Installierbarkeit und Offline-Betrieb |
| `build.py` | Baut `index.html` und `sw.js` aus `src/` (`python3 build.py`) |

Der frühere Expo-Stand liegt im Zweig `expo-app`.
