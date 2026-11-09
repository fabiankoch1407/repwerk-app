/* ---------- Heart rate (Bluetooth) and calories burned in workouts ----------
   Live heart rate via the standard Bluetooth Heart Rate Service (0x180D): chest straps and watches that broadcast
   (Garmin "Broadcast Heart Rate", Polar, Coros, Suunto, Wahoo …). Works where Web Bluetooth exists (Chrome on
   Android/desktop), not in Safari/iOS. Calories: with heart rate Keytel et al. (2005), otherwise MET estimate
   for strength training; the user can always overwrite with the number from their watch.
   Strings bilingual inline via L(de, en). */
const HR = { dev: null, ch: null, bpm: 0, at: 0, status: 'off', name: '', retry: 0 };
const hrSupported = () => !IN_CLAUDE && !!(navigator.bluetooth && navigator.bluetooth.requestDevice);
const hrFresh = () => HR.status === 'on' && Date.now() - HR.at < 8000 && HR.bpm > 0;
const hrMax = () => Math.round(208 - 0.7 * (S.profile.age || 30));
function hrZone(bpm) { const p = bpm / hrMax(); return p < 0.6 ? 1 : p < 0.7 ? 2 : p < 0.8 ? 3 : p < 0.9 ? 4 : 5; }
const ZONE_COL = ['', 'var(--ink-muted)', 'var(--protein)', 'var(--good)', 'var(--warning)', 'var(--critical)'];
const ZONE_NAME = () => ['', L('Locker', 'Easy'), L('Grundlage', 'Base'), L('Aerob', 'Aerobic'), L('Schwelle', 'Threshold'), L('Maximal', 'Max')];
/* All numbers are ACTIVE calories (like "active kcal" on sports watches): resting metabolism is excluded,
   because it is already part of the daily calorie target. */
const bodyKg = () => num(S.profile.weight) || 75;
/* Active kcal per minute from heart rate: Keytel et al. (2005) minus resting (1 MET). Keytel comes from steady
   cardio and overestimates lifting with rests, so it is scaled by 0.7 and kept between 0.5 and 9 MET above rest. */
function kcalPerMinHR(bpm) {
  const p = S.profile, w = bodyKg(), a = num(p.age) || 30, rest = w / 60;
  if (bpm < 90) return rest;
  const m = (-55.0969 + 0.6309 * bpm + 0.1988 * w + 0.2017 * a) / 4.184, f = (-20.4022 + 0.4472 * bpm - 0.1263 * w + 0.074 * a) / 4.184;
  const gross = p.sex === 'm' ? m : p.sex === 'w' ? f : (m + f) / 2;
  return Math.max(0.5 * rest, Math.min(9 * rest, (gross - rest) * 0.7));
}
/* Without heart rate: MET for strength training from training density (working sets per hour), 3 to 6 MET
   (Compendium of Physical Activities: resistance training 3.5 moderate … 6 vigorous). */
function workSets(a) { return (a.exercises || []).reduce((n, x) => n + x.sets.filter(s => s.done && s.type !== 'w').length, 0); }
function strengthMET(a, sec) { if (sec < 300) return 3.5; const sph = workSets(a) / (sec / 3600); return Math.max(3, Math.min(6, 3 + 0.06 * sph)); }
const kcalEstimate = (sec, a) => sec < 60 ? 0 : (strengthMET(a, sec) - 1) * bodyKg() * sec / 3600;
/* Total for a workout of a given length: measured part from heart rate + estimate for the rest */
function kcalFor(a, sec, h = a.hrk || (a.hrKcal != null ? { kcal: a.hrKcal, sec: a.hrSec } : null)) {
  if (!h || !h.sec) return Math.round(kcalEstimate(sec, a));
  if (sec <= h.sec) return Math.round(h.kcal * sec / h.sec);
  return Math.round(h.kcal + (sec - h.sec >= 60 ? (strengthMET(a, sec) - 1) * bodyKg() * (sec - h.sec) / 3600 : 0));
}
/* Live accumulation on the running workout */
function hrState(a) { return a.hrk || (a.hrk = { kcal: 0, sec: 0, samples: [], max: 0, sum: 0, n: 0 }); }
function workoutKcal(a) {
  if (a.kcal != null) return a.kcal;
  return kcalFor(a, (a.dur != null ? a.dur : elapsed(a)) / 1000);
}
let hrLastTick = 0, hrSampleAt = 0, hrSaveAt = 0;
setInterval(() => {
  const a = S && S.active, now = Date.now();
  if (!a || a.pausedAt) { hrLastTick = now; return; }
  const dt = hrLastTick ? Math.min(10, (now - hrLastTick) / 1000) : 0; hrLastTick = now;
  if (hrFresh() && dt) {
    const h = hrState(a); h.kcal += kcalPerMinHR(HR.bpm) * dt / 60; h.sec += dt; h.max = Math.max(h.max, HR.bpm); h.sum += HR.bpm; h.n++;
    if (now - hrSampleAt >= 10000) { hrSampleAt = now; h.samples.push(HR.bpm); if (h.samples.length > 1080) h.samples = h.samples.filter((_, i) => i % 2 === 0); }
    if (now - hrSaveAt > 60000) { hrSaveAt = now; save(); }
  }
  paintHR();
}, 1000);
function paintHR() {
  const el = document.getElementById('w-hr'); if (!el || !S.active) return;
  const k = document.getElementById('w-kcal'); if (k) k.textContent = fmt(workoutKcal(S.active));
  const b = document.getElementById('w-bpm'), z = document.getElementById('w-zone');
  if (hrFresh()) { el.classList.add('live'); if (b) b.textContent = HR.bpm; const zn = hrZone(HR.bpm); if (z) { z.textContent = `${L('Zone', 'Zone')} ${zn} · ${ZONE_NAME()[zn]}`; z.style.color = ZONE_COL[zn]; } el.style.setProperty('--zc', ZONE_COL[hrZone(HR.bpm)]); }
  else { el.classList.remove('live'); if (b) b.textContent = '–'; if (z) { z.textContent = HR.status === 'connecting' ? L('Verbinde …', 'Connecting …') : HR.status === 'lost' ? L('Verbindung verloren, verbinde neu …', 'Connection lost, reconnecting …') : L('Kein Puls', 'No heart rate'); z.style.color = ''; } }
}
/* UI in the running workout */
function hrBarHTML(a) {
  const kc = fmt(workoutKcal(a)), src = (a.hrk && a.hrk.sec > 30) ? L('aus Puls', 'from heart rate') : L('geschätzt', 'estimated');
  const con = HR.status === 'on' || HR.status === 'connecting' || HR.status === 'lost';
  return `<div class="hrbar ${hrFresh() ? 'live' : ''}" id="w-hr"><span class="hrheart">${ic('heart', 22)}</span>
    <div class="grow" style="min-width:0">${con ? `<div><b class="num" id="w-bpm" style="font-size:24px">${hrFresh() ? HR.bpm : '–'}</b> <span class="cap">bpm</span></div><div class="cap" id="w-zone"></div>`
      : `<div style="font-weight:700">${L('Puls', 'Heart rate')}</div><div class="cap">${hrSupported() ? L('Brustgurt oder Uhr verbinden', 'Connect a chest strap or watch') : L('Kalorien werden geschätzt', 'Calories are estimated')}</div>`}</div>
    <div style="text-align:right"><b class="num" id="w-kcal" style="font-size:20px">${kc}</b> <span class="cap">kcal</span><div class="cap">${src}</div></div>
    ${!con && hrSupported() ? `<button class="btn btn-s btn-sm" data-hr="connect">${L('Verbinden', 'Connect')}</button>` : ''}</div>`;
}
/* Bluetooth */
function parseHR(dv) { const flags = dv.getUint8(0); return flags & 1 ? dv.getUint16(1, true) : dv.getUint8(1); }
async function attachDevice(dev) {
  HR.dev = dev; HR.name = dev.name || L('Pulssensor', 'Heart rate sensor'); HR.status = 'connecting'; paintHR();
  dev.removeEventListener('gattserverdisconnected', onHRLost); dev.addEventListener('gattserverdisconnected', onHRLost);
  const server = await dev.gatt.connect(), svc = await server.getPrimaryService('heart_rate'), ch = await svc.getCharacteristic('heart_rate_measurement');
  ch.addEventListener('characteristicvaluechanged', e => { const v = parseHR(e.target.value); if (v > 25 && v < 240) { HR.bpm = v; HR.at = Date.now(); if (HR.status !== 'on') { HR.status = 'on'; render(); } } });
  await ch.startNotifications(); HR.ch = ch; HR.retry = 0; HR.status = 'on';
  S.hrDevice = { name: HR.name, id: dev.id }; save(); render();
}
function onHRLost() {
  if (HR.status === 'off') return;
  HR.status = 'lost'; HR.bpm = 0; paintHR();
  if (HR.retry++ < 6 && HR.dev) setTimeout(() => { if (HR.status === 'lost' && HR.dev) attachDevice(HR.dev).catch(() => onHRLost()); }, Math.min(15000, 1500 * HR.retry));
  else { HR.status = 'off'; render(); }
}
async function connectHR() {
  if (!hrSupported()) { hrHelpSheet(); return; }
  try { const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }], optionalServices: ['battery_service'] }); await attachDevice(dev); toast(L(`Verbunden mit ${HR.name}`, `Connected to ${HR.name}`)); }
  catch (e) {
    HR.status = 'off'; render();
    if (e && e.name === 'NotFoundError') return; // user closed the picker
    toast(e && e.name === 'SecurityError' ? L('Bluetooth ist hier nicht erlaubt', 'Bluetooth isn’t allowed here') : L('Verbindung fehlgeschlagen. Ist der Puls-Versand an der Uhr aktiv?', 'Connection failed. Is heart rate broadcasting on?'));
  }
}
function disconnectHR() { HR.status = 'off'; try { HR.dev && HR.dev.gatt.connected && HR.dev.gatt.disconnect(); } catch (e) {} HR.dev = null; HR.bpm = 0; S.hrDevice = null; save(); render(); }
/* Silent reconnect to the remembered sensor (Chrome with the new Bluetooth permissions) */
async function autoConnectHR() {
  if (!hrSupported() || !S || !S.hrDevice || HR.status !== 'off' || !navigator.bluetooth.getDevices) return;
  try { const devs = await navigator.bluetooth.getDevices(), d = devs.find(x => x.id === S.hrDevice.id || x.name === S.hrDevice.name); if (d) await attachDevice(d); } catch (e) { HR.status = 'off'; }
}
function hrHelpSheet() {
  openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${L('Uhr und Pulsgurt', 'Watch and heart rate strap')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    ${hrSupported() ? '' : `<div class="banner">${ic('info', 18)}<div>${L('Auf dem iPhone erlaubt Safari Web-Apps keine Bluetooth-Verbindung. Trag nach dem Training die Kalorien von deiner Uhr ein, dann zählen sie statt der Schätzung. Mit der App-Store-Version kommt die Verbindung zu Apple Health.', 'On iPhone, Safari doesn’t let web apps use Bluetooth. After your workout, enter the calories from your watch and they replace the estimate. The App Store version will connect to Apple Health.')}</div></div>`}
    <div class="lbl">${L('Funktioniert direkt', 'Works directly')}</div>
    <ul class="steps" style="margin:0"><li>${L('Brustgurte wie Polar H10, Garmin HRM, Wahoo TICKR', 'Chest straps like Polar H10, Garmin HRM, Wahoo TICKR')}</li><li>${L('Garmin-Uhren: Einstellungen → Herzfrequenz am Handgelenk → „Herzfrequenz übertragen“', 'Garmin watches: Settings → Wrist Heart Rate → “Broadcast Heart Rate”')}</li><li>${L('Viele Uhren von Polar, Coros, Suunto und Amazfit mit Puls-Übertragung', 'Many Polar, Coros, Suunto and Amazfit watches with HR broadcast')}</li></ul>
    <div class="lbl">${L('Mit Zusatz-App', 'With an extra app')}</div>
    <p style="margin:0">${L('Apple Watch und Galaxy Watch senden den Puls nicht von selbst. Apps wie „HR Broadcast“ oder „HeartBLE“ machen daraus einen normalen Pulssensor.', 'Apple Watch and Galaxy Watch don’t broadcast heart rate on their own. Apps such as “HR Broadcast” or “HeartBLE” turn them into a standard sensor.')}</p>
    <div class="lbl">${L('So rechnen wir Kalorien', 'How we calculate calories')}</div>
    <p class="cap" style="margin:0">${L('Wir zeigen wie Sportuhren die aktiven Kalorien, also ohne den Grundumsatz, den dein Tagesziel schon enthält. Mit Puls rechnen wir nach Keytel und Kollegen aus Puls, Gewicht, Alter und Geschlecht, für Krafttraining etwas vorsichtiger. Ohne Puls schätzen wir aus Dauer, Körpergewicht und wie viele Sätze du pro Stunde machst: meist 150 bis 350 kcal pro Stunde. Zahlen von deiner Uhr kannst du beim Speichern übernehmen.', 'Like sports watches we show active calories, without your resting metabolism, which your daily target already includes. With heart rate we use Keytel et al. (heart rate, weight, age, sex), a bit more conservatively for lifting. Without heart rate we estimate from duration, body weight and sets per hour: usually 150 to 350 kcal per hour. You can use your watch’s number when saving.')}</p>
    ${hrSupported() ? `<button class="btn btn-p btn-block" data-hr="connect">${L('Gerät verbinden', 'Connect device')}</button>` : ''}`);
}
/* Finish sheet: kcal field, prefilled */
function kcalFieldHTML(a, d) {
  const v = d.kcal != null && d.kcalManual ? d.kcal : kcalFor(a, d.min * 60), h = a.hrk, fromHr = h && h.sec > 30;
  return `<div class="field"><span class="lbl">${ic('flame', 16)} ${L('Verbrannte Kalorien (aktiv)', 'Calories burned (active)')}</span><div class="row" style="gap:10px"><span class="unit" style="max-width:140px"><input class="input" id="f-kcal" inputmode="numeric" value="${v}" ${d.kcalManual ? 'data-manual="1"' : ''} aria-label="${L('Kalorien', 'Calories')}"><span>kcal</span></span><span class="cap grow">${fromHr ? L(`Aus deinem Puls (Ø ${Math.round(h.sum / h.n)}, max. ${h.max} bpm).`, `From your heart rate (avg ${Math.round(h.sum / h.n)}, max ${h.max} bpm).`) : L('Geschätzt. Zeigt deine Uhr einen anderen Wert, trag ihn hier ein.', 'Estimated. If your watch shows a different number, enter it here.')}</span></div></div>`;
}
function finalizeKcal(a, typed, manual) {
  const h = a.hrk, est = kcalFor(a, wDur(a) / 1000), n = Math.round(num(typed));
  const isManual = manual && n >= 0 && n < 5000 && typed !== null && typed !== '';
  a.kcal = isManual ? n : est; a.kcalSrc = isManual ? 'manual' : (h && h.sec > 30 ? 'hr' : 'est');
  if (h && h.sec) { a.hrKcal = Math.round(h.kcal); a.hrSec = Math.round(h.sec); }
  if (h && h.n) a.hr = { avg: Math.round(h.sum / h.n), max: h.max, samples: h.samples.slice(), device: HR.name || (S.hrDevice && S.hrDevice.name) || '' };
  delete a.hrk;
}
/* After the duration of a saved workout changes */
function recalcKcal(w) { if (w.kcalSrc === 'manual' || w.kcal == null) return; w.kcal = kcalFor(w, wDur(w) / 1000); }
/* Finish sheet: duration and calories stay in step until the user types their own number */
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'f-kcal') { t.dataset.manual = '1'; return; }
  if (t.id === 'f-dur' && S.active) { const k = document.getElementById('f-kcal'); const m = Math.round(num(t.value)); if (k && !k.dataset.manual && m > 0) k.value = kcalFor(S.active, m * 60); }
});
/* Summary and details */
function hrChartSVG(samples, w = 320, h = 80) {
  if (!samples || samples.length < 3) return '';
  const lo = Math.min(...samples) - 5, hi = Math.max(...samples) + 5, X = i => (i / (samples.length - 1)) * (w - 8) + 4, Y = v => h - 4 - (v - lo) / (hi - lo) * (h - 8);
  const bands = [0.6, 0.7, 0.8, 0.9].map(p => p * hrMax()).filter(v => v > lo && v < hi).map(v => `<line x1="0" x2="${w}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 4"/>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true">${bands}<polyline fill="none" stroke="var(--critical)" stroke-width="2" stroke-linejoin="round" points="${samples.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ')}"/></svg>`;
}
function hrSummaryHTML(a) {
  if (a.kcal == null && !a.hr) return '';
  const src = { hr: L('aus Puls', 'from heart rate'), manual: L('von deiner Uhr', 'from your watch'), est: L('geschätzt', 'estimated') }[a.kcalSrc] || '';
  return `<div class="card"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="cap">${ic('flame', 14)} ${L('Verbrannt (aktiv)', 'Burned (active)')}</div><div class="disp" style="font-size:22px">${fmt(a.kcal)} kcal</div><div class="cap">${src}</div></div>${a.hr ? `<div style="text-align:right"><div class="cap">${ic('heart', 14)} ${L('Puls', 'Heart rate')}</div><div class="disp" style="font-size:22px">Ø ${a.hr.avg}</div><div class="cap">max. ${a.hr.max} bpm</div></div>` : ''}</div>${a.hr ? hrChartSVG(a.hr.samples) : ''}</div>`;
}
const workoutKcalLine = w => w.kcal != null ? `${fmt(w.kcal)} kcal${w.hr ? ` · Ø ${w.hr.avg} bpm` : ''}` : '';
const kcalBurnedOn = k => S.workouts.filter(w => dayKey(new Date(w.start)) === k && w.kcal != null).reduce((s, w) => s + w.kcal, 0);
function hrSettingsCardHTML() {
  const con = HR.status === 'on';
  return `<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">${L('Uhr und Pulsgurt', 'Watch and heart rate strap')}</div>
    <div class="row" style="gap:12px"><span class="dayic" style="--c:var(--critical)">${ic('heart', 20)}</span><div class="grow"><div style="font-weight:700">${con ? HR.name : S.hrDevice ? S.hrDevice.name : L('Kein Gerät', 'No device')}</div><div class="cap">${con ? L(`Verbunden · ${HR.bpm || '–'} bpm`, `Connected · ${HR.bpm || '–'} bpm`) : hrSupported() ? (S.hrDevice ? L('Wird beim Training verbunden', 'Connects when you train') : L('Puls und Kalorien live im Training', 'Live heart rate and calories in workouts')) : L('Auf diesem Gerät nicht per Bluetooth möglich', 'Bluetooth isn’t available on this device')}</div></div>
    ${hrSupported() ? (con || S.hrDevice ? `<button class="btn btn-s btn-sm" data-hr="disconnect">${L('Trennen', 'Disconnect')}</button>` : `<button class="btn btn-p btn-sm" data-hr="connect">${L('Verbinden', 'Connect')}</button>`) : ''}</div>
    <div class="sel" style="padding:0"><div class="grow"><div style="font-weight:600">${L('Trainingskalorien zum Tagesziel addieren', 'Add workout calories to daily target')}</div><div class="cap">${L('Aus (empfohlen): Dein Ziel enthält das Training schon über die Trainingstage. An: Verbranntes kommt wie bei MyFitnessPal dazu.', 'Off (recommended): your target already includes training days. On: burned calories are added like in MyFitnessPal.')}</div></div><button class="toggle ${S.smart && S.smart.addBurn ? 'on' : ''}" data-hr="addburn" role="switch" aria-checked="${!!(S.smart && S.smart.addBurn)}" aria-label="${L('Trainingskalorien addieren', 'Add workout calories')}"></button></div>
    <button class="btn btn-g" data-hr="help" style="align-self:flex-start">${L('Welche Uhren gehen?', 'Which watches work?')}</button></div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-hr]'); if (!b || !S) return;
  const a = b.dataset.hr;
  if (a === 'connect') { closeSheet(); connectHR(); }
  else if (a === 'disconnect') disconnectHR();
  else if (a === 'help') hrHelpSheet();
  else if (a === 'addburn') { sm().addBurn = !sm().addBurn; save(); render(); }
});
