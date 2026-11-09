/* ---------- Legal: links, health-data consent (Art. 9 GDPR), order summary before Stripe ----------
   Provider details come from legal/anbieter.js (window.ANBIETER), loaded before this script in the web app.
   Strings bilingual inline via L(de, en). */
const CONSENT_V = '2026-11';
const legalOn = () => !IN_CLAUDE;
const needConsent = () => !IN_CLAUDE && !(S && S.consent && S.consent.health);
const LEGAL = { imp: 'legal/impressum.html', ds: 'legal/datenschutz.html', agb: 'legal/agb.html', wid: 'legal/agb.html#widerruf', kd: 'legal/kuendigen.html' };
function legalFooter() {
  if (!legalOn()) return '';
  return `<nav class="lfoot" aria-label="${L('Rechtliches', 'Legal')}"><a href="${LEGAL.imp}">${L('Impressum', 'Legal notice')}</a><a href="${LEGAL.ds}">${L('Datenschutz', 'Privacy')}</a><a href="${LEGAL.agb}">${L('AGB', 'Terms')}</a>${payOn() ? `<a href="${LEGAL.kd}">${L('Verträge hier kündigen', 'Cancel contracts here')}</a>` : ''}</nav>`;
}
function legalCardHTML() {
  if (!legalOn()) return '';
  const row = (href, t) => `<a class="sel" href="${href}" style="text-decoration:none;color:inherit"><div class="grow" style="font-weight:600">${t}</div>${ic('next', 18)}</a>`;
  return `<div class="card"><div class="lbl" style="margin-bottom:4px">${L('Rechtliches', 'Legal')}</div>${row(LEGAL.imp, L('Impressum', 'Legal notice'))}${row(LEGAL.ds, L('Datenschutzerklärung', 'Privacy policy'))}${row(LEGAL.agb, L('AGB und Widerrufsbelehrung', 'Terms and right of withdrawal'))}${payOn() ? row(LEGAL.kd, L('Verträge hier kündigen', 'Cancel contracts here')) : ''}</div>`;
}
const consentText = () => L(`Ich bin mindestens 16 Jahre alt und willige ausdrücklich ein, dass Repwerk meine Gesundheitsdaten (zum Beispiel Gewicht, Ernährung und Training) in meinem Konto speichert und für die KI-Funktionen verarbeitet. Widerruf jederzeit unter Einstellungen → Konto. Details in der <a href="${LEGAL.ds}" target="_blank" rel="noopener">Datenschutzerklärung</a>.`, `I am at least 16 and explicitly consent to Repwerk storing my health data (such as weight, nutrition and training) in my account and processing it for the AI features. Withdraw any time under Settings → Account. Details in the <a href="${LEGAL.ds}" target="_blank" rel="noopener">privacy policy</a>.`);
const consentBox = (id, on) => `<label class="consent"><input type="checkbox" id="${id}" ${on ? 'checked' : ''}><span>${consentText()}</span></label>`;
function giveConsent() {
  S.consent = Object.assign({}, S.consent, { health: new Date().toISOString(), v: CONSENT_V }); save();
  if (loggedIn()) sbFetch('/rest/v1/consents?on_conflict=user_id,kind,version', { method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' }, body: JSON.stringify({ user_id: AUTH.user.id, kind: 'health', version: CONSENT_V }) }).catch(() => {});
}
/* Asks for consent; resolves true if given */
function consentSheet(reason) {
  return new Promise(res => {
    let done = false; const finish = v => { if (!done) { done = true; res(v); } };
    openSheet(`<h2 class="disp">${L('Deine Einwilligung', 'Your consent')}</h2>
      <p class="muted" style="margin:0">${reason || L('Damit wir deine Daten in deinem Konto speichern und die KI nutzen dürfen, brauchen wir deine ausdrückliche Einwilligung. Ohne sie kannst du die App weiter auf diesem Gerät nutzen.', 'To store your data in your account and use the AI, we need your explicit consent. Without it you can keep using the app on this device.')}</p>
      ${consentBox('cs-ok')}
      <button class="btn btn-p btn-block" data-cs="yes" disabled>${L('Einwilligen', 'I consent')}</button>
      <button class="btn btn-g btn-block" data-cs="no">${L('Nicht jetzt', 'Not now')}</button>`, sh => {
      const cb = sh.querySelector('#cs-ok'), yes = sh.querySelector('[data-cs=yes]');
      cb.addEventListener('change', () => { yes.disabled = !cb.checked; });
      sh.addEventListener('click', ev => { const b = ev.target.closest('[data-cs]'); if (!b || b.disabled) return; if (b.dataset.cs === 'yes') { giveConsent(); closeSheet(); finish(true); } else { closeSheet(); finish(false); } });
      const obs = new MutationObserver(() => { if (!sh.isConnected) { obs.disconnect(); finish(false); } }); obs.observe(document.getElementById('overlay'), { childList: true });
    });
  });
}
async function withdrawConsent() {
  if (!await confirmBox(L('Einwilligung widerrufen?', 'Withdraw consent?'), L('Ohne Einwilligung dürfen wir keine Gesundheitsdaten in deinem Konto speichern. Dein Konto und alle Cloud-Daten werden deshalb gelöscht. Exportiere vorher deine Daten, wenn du sie behalten willst. Ein laufendes Abo kündigst du separat.', 'Without consent we may not store health data in your account, so your account and all cloud data will be deleted. Export your data first if you want to keep it. Cancel a running subscription separately.'), L('Widerrufen und löschen', 'Withdraw and delete'), true)) return;
  await deleteAccountNow();
}
/* Order summary: shown before redirecting to Stripe */
function orderSheet(plan) {
  const A = window.ANBIETER || {}, year = plan === 'year', trial = SRV.trialDays || 0;
  const price = year ? L('59,99 € pro Jahr', '€59.99 per year') : L('8,99 € pro Monat', '€8.99 per month');
  const tax = A.kleinunternehmer === false ? L('inkl. gesetzlicher Umsatzsteuer', 'incl. VAT') : L('gemäß § 19 UStG ohne Umsatzsteuer', 'no VAT charged (small business, § 19 UStG)');
  const term = year ? L('Erste Laufzeit 12 Monate. Danach läuft das Abo auf unbestimmte Zeit weiter und ist jederzeit mit einer Frist von einem Monat kündbar.', 'First term 12 months. After that it continues indefinitely and can be cancelled at any time with one month’s notice.') : L('Läuft monatlich und ist jederzeit zum Ende des laufenden Monats kündbar.', 'Runs monthly and can be cancelled at any time to the end of the current month.');
  openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${L('Bestellübersicht', 'Order summary')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    <div class="card" style="display:flex;flex-direction:column;gap:6px"><div class="row" style="justify-content:space-between"><b>Repwerk Pro · ${year ? L('Jährlich', 'Yearly') : L('Monatlich', 'Monthly')}</b><b>${price}</b></div>
      <div class="cap">${tax}</div>
      ${trial ? `<div class="cap">${L(`Die ersten ${trial} Tage sind kostenlos. Kündigst du vorher, zahlst du nichts. Danach wird der Preis automatisch abgebucht.`, `The first ${trial} days are free. Cancel before then and you pay nothing. After that the price is charged automatically.`)}</div>` : ''}
      <div class="cap">${term}</div>
      <div class="cap">${L('Zahlung im Voraus über Stripe. Kündigen über „Verträge hier kündigen“ oder Einstellungen → Abo.', 'Paid in advance via Stripe. Cancel via “Cancel contracts here” or Settings → Subscription.')}</div></div>
    <label class="consent"><input type="checkbox" id="os-agb"><span>${L(`Ich akzeptiere die <a href="${LEGAL.agb}" target="_blank" rel="noopener">AGB</a> und habe die <a href="${LEGAL.wid}" target="_blank" rel="noopener">Widerrufsbelehrung</a> zur Kenntnis genommen.`, `I accept the <a href="${LEGAL.agb}" target="_blank" rel="noopener">terms</a> and have read the <a href="${LEGAL.wid}" target="_blank" rel="noopener">right of withdrawal</a>.`)}</span></label>
    <label class="consent"><input type="checkbox" id="os-early"><span>${L('Ich verlange ausdrücklich, dass Repwerk Pro sofort beginnt, also vor Ablauf der 14-tägigen Widerrufsfrist. Mir ist bekannt, dass ich bei einem Widerruf für die bis dahin genutzte Zeit einen anteiligen Betrag zahle.', 'I expressly request that Repwerk Pro starts immediately, before the 14-day withdrawal period ends. I understand that if I withdraw, I pay a pro-rata amount for the time used until then.')}</span></label>
    <button class="btn btn-p btn-block" data-os="go" disabled>${L('Weiter zur Zahlung', 'Continue to payment')}</button>
    <p class="cap" style="margin:0;text-align:center">${L('Den Vertrag schließt du auf der nächsten Seite bei Stripe ab.', 'You conclude the contract on the next page at Stripe.')}</p>`, sh => {
    const a = sh.querySelector('#os-agb'), e = sh.querySelector('#os-early'), go = sh.querySelector('[data-os=go]');
    const upd = () => { go.disabled = !(a.checked && e.checked); }; a.addEventListener('change', upd); e.addEventListener('change', upd);
    go.addEventListener('click', () => { if (!go.disabled) { go.disabled = true; startCheckout(plan, { terms: true, earlyStart: new Date().toISOString() }); } });
  });
}
