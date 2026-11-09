/* ---------- Smart coach (USP): training-aware targets, weekly check-in, load suggestions ----------
   Strings in this file are written in both languages via L(de, en), so the DOM translator has nothing to do here. */
const L = (de, en) => (S && S.lang === 'en') ? en : de;
const SMART0 = { cycle: true, wd: null, adj: 0, checkins: [], feel: null };
const WD_DEFAULT = { 1: [3], 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 5, 6], 6: [1, 2, 3, 4, 5, 6], 7: [0, 1, 2, 3, 4, 5, 6] };
const WD_SHORT = () => isEN() ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const sm = () => { if (!S.smart || !Array.isArray(S.smart.checkins)) S.smart = Object.assign({ ...SMART0, checkins: [] }, S.smart || {}, { checkins: (S.smart && S.smart.checkins) || [] }); return S.smart; };
const sgn = n => (n > 0 ? '+' : n < 0 ? '−' : '±') + fmt(Math.abs(n));
const sgn1 = n => (n > 0 ? '+' : n < 0 ? '−' : '±') + fmt1(Math.abs(n));
const kd = k => new Date(k + 'T12:00:00');
const daysAgo = n => dayKey(new Date(Date.now() - n * 864e5));

function trainWeekdays() { const w = sm().wd; return w && w.length ? w : WD_DEFAULT[Math.min(7, Math.max(1, Number(S.profile.days) || 3))]; }
/* train = trained (or training running), plan = training planned and not done yet, rest = no training */
function dayType(k = dayKey()) {
  if (trainedOn(k) || (S.active && k === dayKey())) return 'train';
  if (k >= dayKey() && trainWeekdays().includes(kd(k).getDay())) return 'plan';
  return 'rest';
}
function baseTargets() {
  const t = { ...S.targets }, adj = sm().adj || 0, fatFloor = Math.round(0.6 * S.profile.weight);
  t.kcal = t.kcal + adj; t.c = Math.round(t.c + adj / 4);
  if (t.c < 50) { const miss = (50 - t.c) * 4; t.c = 50; t.f = Math.max(fatFloor, Math.round(t.f - miss / 9)); }
  return t;
}
function cycleDelta() {
  const nT = trainWeekdays().length, nR = 7 - nT, b = baseTargets();
  if (!sm().cycle || !nT || !nR) return { up: 0, down: 0 };
  let up = Math.round(b.kcal * 0.1 / 10) * 10, down = up * nT / nR;
  const cap = b.kcal * 0.15; if (down > cap) { down = cap; up = down * nR / nT; }
  // never let rest-day carbs fall under 50 g
  const maxDown = Math.max(0, (b.c - 50) * 4); if (down > maxDown) { down = maxDown; up = down * nR / nT; }
  return { up: Math.round(up / 10) * 10, down: Math.round(down / 10) * 10 };
}
function dayTargets(k = dayKey()) {
  const b = baseTargets(), type = dayType(k), cd = cycleDelta();
  const burned = sm().addBurn && typeof kcalBurnedOn === 'function' ? kcalBurnedOn(k) : 0;
  const delta = burned ? Math.round(burned / 10) * 10 : type === 'rest' ? -cd.down : cd.up;
  if (!delta) return { ...b, type, delta: 0 };
  if (burned) return { ...b, kcal: b.kcal + delta, c: Math.round(b.c + delta / 4), water: b.water + 500, type: 'train', delta, burned: true };
  return { ...b, kcal: b.kcal + delta, c: Math.max(0, Math.round(b.c + delta / 4)), water: b.water + (type === 'rest' ? 0 : 500), type, delta };
}
function dayTypeChip(g) {
  if ((!sm().cycle && !g.burned) || !g.delta) return '';
  const tr = g.type !== 'rest';
  return `<button class="daychip ${tr ? 'tr' : ''}" data-sm="cycleinfo">${ic(tr ? 'db' : 'spark', 16)}<span>${g.burned ? `${L('Training verbrannt', 'Workout burned')} · ${sgn(g.delta)} kcal` : `${tr ? L('Trainingstag', 'Training day') : L('Ruhetag', 'Rest day')} · ${sgn(g.delta)} kcal ${L('Kohlenhydrate', 'carbs')}`}</span>${ic('info', 14)}</button>`;
}
function cycleInfo() {
  const b = baseTargets(), cd = cycleDelta(), wd = trainWeekdays(), names = WD_SHORT();
  openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${L('Ziele passend zum Tag', 'Targets that fit the day')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    <p style="margin:0;font-size:16px;line-height:24px">${L('An Trainingstagen brauchst du mehr Energie, vor allem Kohlenhydrate. An Ruhetagen weniger. Repwerk verschiebt deshalb Kalorien von Ruhe- auf Trainingstage. Protein und Fett bleiben gleich, dein Wochenziel auch.', 'On training days you need more energy, mostly carbs. On rest days you need less. So Repwerk moves calories from rest days to training days. Protein, fat and your weekly total stay the same.')}</p>
    <div class="grid2"><div class="card"><div class="cap">${L('Trainingstag', 'Training day')}</div><div class="disp" style="font-size:22px">${fmt(b.kcal + cd.up)} kcal</div><div class="cap">${fmt(b.c + cd.up / 4)} g ${L('Kohlenhydrate', 'carbs')}</div></div><div class="card"><div class="cap">${L('Ruhetag', 'Rest day')}</div><div class="disp" style="font-size:22px">${fmt(b.kcal - cd.down)} kcal</div><div class="cap">${fmt(b.c - cd.down / 4)} g ${L('Kohlenhydrate', 'carbs')}</div></div></div>
    <div class="field"><span class="lbl">${L('Deine Trainingstage', 'Your training days')}</span><div class="chips wdpick">${[1, 2, 3, 4, 5, 6, 0].map(d => `<button class="chip ${wd.includes(d) ? 'on' : ''}" data-sm="wd:${d}">${names[d]}</button>`).join('')}</div>
      <span class="cap">${L('Trainierst du an einem anderen Tag, zählt der automatisch als Trainingstag.', 'If you train on another day, that day automatically counts as a training day.')}</span></div>
    <div class="sel"><div class="grow"><div style="font-weight:600">${L('Ziele an Trainingstage anpassen', 'Adapt targets to training days')}</div><div class="cap">${L('Aus: jeden Tag dasselbe Ziel', 'Off: the same target every day')}</div></div><button class="toggle ${sm().cycle ? 'on' : ''}" data-sm="cycle" role="switch" aria-checked="${!!sm().cycle}" aria-label="${L('Ziele an Trainingstage anpassen', 'Adapt targets to training days')}"></button></div>
    <button class="btn btn-s btn-block" data-close-sheet>${L('Fertig', 'Done')}</button>`);
}

/* ---------- Weekly check-in ---------- */
function weightTrend(D, days = 21) {
  const cut = daysAgo(days), ws = D.weights.filter(w => w.d >= cut);
  if (ws.length < 2) return { n: ws.length };
  const t0 = kd(ws[0].d).getTime(), xs = ws.map(w => (kd(w.d).getTime() - t0) / 864e5), ys = ws.map(w => w.kg);
  const span = xs[xs.length - 1] - xs[0]; if (span < 5) return { n: ws.length, span };
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length, my = ys.reduce((a, b) => a + b, 0) / ys.length;
  const slope = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / xs.reduce((a, x) => a + (x - mx) ** 2, 0);
  return { n: ws.length, span, rate: slope * 7, now: my + slope * (xs[xs.length - 1] - mx), pts: ws };
}
function intakeAvg(D, days = 14) {
  const b = baseTargets(), out = [];
  for (let i = 1; i <= days; i++) { const t = dayTotals(D.days[daysAgo(i)]); if (t.kcal >= b.kcal * 0.4) out.push(t); }
  const av = f => out.length ? out.reduce((a, t) => a + t[f], 0) / out.length : 0;
  return { n: out.length, kcal: av('kcal'), p: av('p') };
}
function strengthChange(D) {
  const now = D.workouts.filter(w => w.start > Date.now() - 14 * 864e5), before = D.workouts.filter(w => w.start <= Date.now() - 14 * 864e5 && w.start > Date.now() - 42 * 864e5);
  const ids = [...new Set(now.flatMap(w => w.exercises.map(x => x.exId)))].filter(id => before.some(w => w.exercises.some(x => x.exId === id)));
  const ch = ids.map(id => { const a = bestE1rm(id, now), b = bestE1rm(id, before); return a && b ? (a - b) / b * 100 : null; }).filter(x => x !== null);
  return ch.length ? { n: ch.length, pct: ch.reduce((a, b) => a + b, 0) / ch.length } : { n: 0 };
}
function goalRate() { const w = S.profile.weight; return S.profile.goal === 'fett' ? -Math.min(1, Math.max(0.25, w * 0.005)) : S.profile.goal === 'muskel' ? Math.min(0.5, Math.max(0.1, w * (S.profile.experience === 'einsteiger' ? 0.004 : 0.0025))) : 0; }
function checkinCalc(D = S, feel = sm().feel) {
  const b = baseTargets(), tr = weightTrend(D), it = intakeAvg(D), st = strengthChange(D), goal = goalRate();
  const wk = D.workouts.filter(w => w.start > Date.now() - 7 * 864e5).length, why = [];
  let target = b.kcal, conf = 'none', tdee = null;
  if (tr.rate !== undefined && it.n >= 4) { tdee = it.kcal - tr.rate * 7700 / 7; target = tdee + goal * 7700 / 7; conf = 'high'; }
  else if (tr.rate !== undefined) { target = b.kcal - (tr.rate - goal) * 7700 / 7 * 0.5; conf = 'mid'; }
  if (conf !== 'none') {
    const off = tr.rate - goal, word = Math.abs(off) < 0.1 ? 'ok' : (off < 0 ? 'low' : 'high');
    if (word === 'ok') why.push(L('Dein Gewicht entwickelt sich genau wie geplant.', 'Your weight is moving exactly as planned.'));
    else if (S.profile.goal === 'fett') why.push(word === 'low' ? L('Du nimmst schneller ab als geplant. Zu schnell kostet Muskeln und Kraft.', 'You are losing faster than planned. Too fast costs muscle and strength.') : L('Du nimmst langsamer ab als geplant.', 'You are losing more slowly than planned.'));
    else if (S.profile.goal === 'muskel') why.push(word === 'low' ? L('Du nimmst langsamer zu als geplant. Für Muskelaufbau brauchst du etwas mehr.', 'You are gaining more slowly than planned. Building muscle needs a bit more.') : L('Du nimmst schneller zu als geplant. Der Rest wäre eher Fett.', 'You are gaining faster than planned. The extra would mostly be fat.'));
    else why.push(word === 'low' ? L('Dein Gewicht sinkt, obwohl du es halten willst.', 'Your weight is dropping although you want to hold it.') : L('Dein Gewicht steigt, obwohl du es halten willst.', 'Your weight is rising although you want to hold it.'));
    if (tdee) why.push(L(`Aus Gewicht und Essen der letzten zwei Wochen schätzen wir deinen Verbrauch auf ${fmt(Math.round(tdee / 10) * 10)} kcal pro Tag.`, `From your weight and food over the last two weeks we estimate you burn ${fmt(Math.round(tdee / 10) * 10)} kcal per day.`));
  }
  let extra = 0;
  if (st.n && st.pct < -3 && S.profile.goal === 'fett') { extra += 100; why.push(L(`Deine Kraft ist um ${fmt(-st.pct)} % gesunken. Etwas mehr Essen schützt deine Muskeln.`, `Your strength dropped by ${fmt(-st.pct)} %. A little more food protects your muscle.`)); }
  else if (st.n && st.pct > 2) why.push(L(`Deine Kraft steigt (${sgn1(st.pct)} %). Weiter so.`, `Your strength is going up (${sgn1(st.pct)} %). Keep going.`));
  else if (st.n && S.profile.goal === 'muskel' && Math.abs(st.pct) <= 1) { extra += 100; why.push(L('Deine Kraft stagniert. Ein kleines Plus an Kalorien hilft beim Aufbau.', 'Your strength has stalled. A small calorie bump helps you build.')); }
  if (feel === 'tired' && S.profile.goal !== 'muskel') { extra += 100; why.push(L('Du fühlst dich müde. Wir nehmen das Defizit etwas zurück.', 'You feel tired. We ease off the deficit a little.')); }
  if (it.n && it.p < b.p * 0.85) why.push(L(`Ø ${fmt(it.p)} g Protein statt ${fmt(b.p)} g. Mehr Protein hilft dir mehr als weniger Kalorien.`, `Avg. ${fmt(it.p)} g protein instead of ${fmt(b.p)} g. More protein helps you more than fewer calories.`));
  if (wk < Number(S.profile.days)) why.push(L(`Letzte 7 Tage: ${wk} von ${S.profile.days} Trainings.`, `Last 7 days: ${wk} of ${S.profile.days} workouts.`));
  let diff = conf === 'none' && !extra ? 0 : Math.round((target + extra - b.kcal) / 10) * 10;
  diff = Math.max(-250, Math.min(250, diff));
  const floor = Math.max(S.targets.bmr || 0, S.profile.sex === 'w' ? 1200 : 1500); if (b.kcal + diff < floor) diff = Math.round((floor - b.kcal) / 10) * 10;
  if (Math.abs(diff) < 50) diff = 0;
  const missing = [];
  if (tr.rate === undefined) missing.push(tr.n < 2 ? L(`Trag dein Gewicht ein, am besten 2 bis 3 Mal pro Woche morgens (bisher ${tr.n} Mal in 3 Wochen).`, `Log your weight, ideally 2 to 3 times a week in the morning (so far ${tr.n} times in 3 weeks).`) : L('Deine Gewichtseinträge liegen noch zu nah beieinander. Wir brauchen mindestens 5 Tage Abstand.', 'Your weight entries are still too close together. We need at least 5 days between them.'));
  if (it.n < 4) missing.push(L(`Tracke dein Essen an mindestens 4 Tagen (bisher ${it.n} von 14 Tagen vollständig).`, `Track your food on at least 4 days (so far ${it.n} of 14 days complete).`));
  return { b, tr, it, st, wk, goal, conf, tdee, diff, why, missing };
}
function lastCheckin() { const c = sm().checkins; return c.length ? c[c.length - 1] : null; }
function checkinDue() { const l = lastCheckin(); if (l) return (Date.now() - kd(l.d).getTime()) / 864e5 >= 6.5; const first = S.weights[0]; return !!first && (Date.now() - kd(first.d).getTime()) / 864e5 >= 6.5; }
function nextCheckinIn() { const l = lastCheckin(), ref = l ? l.d : (S.weights[0] || {}).d || dayKey(); return Math.max(0, Math.ceil(7 - (Date.now() - kd(ref).getTime()) / 864e5)); }
function coachCard() {
  const due = checkinDue(), l = lastCheckin(), n = nextCheckinIn(), tr = weightTrend(S);
  const sub = due ? L('2 Minuten: Gewicht, Essen und Kraft auswerten und dein Ziel anpassen.', '2 minutes: review weight, food and strength and adjust your target.')
    : tr.rate !== undefined ? L(`Trend ${sgn1(tr.rate)} kg pro Woche · nächster Check-in in ${n} ${n === 1 ? 'Tag' : 'Tagen'}`, `Trend ${sgn1(tr.rate)} kg per week · next check-in in ${n} ${n === 1 ? 'day' : 'days'}`)
    : L(`Nächster Check-in in ${n} ${n === 1 ? 'Tag' : 'Tagen'}. Trag bis dahin 2 bis 3 Mal dein Gewicht ein.`, `Next check-in in ${n} ${n === 1 ? 'day' : 'days'}. Log your weight 2 to 3 times until then.`);
  return `<button class="card coachcard ${due ? 'due' : ''}" data-sm="checkin"><span class="dayic" style="--c:var(--ember)">${ic('chart', 20)}</span><span class="grow" style="min-width:0;text-align:left"><b>${due ? L('Wöchentlicher Check-in ist fällig', 'Your weekly check-in is due') : L('Dein Coach', 'Your coach')}</b><span class="cap" style="display:block">${sub}</span>${l && !due ? `<span class="cap" style="display:block">${L('Zuletzt', 'Last')}: ${kd(l.d).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })} · ${l.to !== l.from ? sgn(l.to - l.from) + ' kcal' : L('Ziel beibehalten', 'target kept')}</span>` : ''}</span>${due ? `<span class="btn btn-p btn-sm">${L('Starten', 'Start')}</span>` : ic('next', 18)}</button>`;
}
function sparkSVG(pts, w = 300, h = 70) {
  if (!pts || pts.length < 2) return '';
  const t0 = kd(pts[0].d).getTime(), t1 = kd(pts[pts.length - 1].d).getTime() || t0 + 1, ys = pts.map(p => p.kg), lo = Math.min(...ys) - 0.3, hi = Math.max(...ys) + 0.3;
  const X = p => ((kd(p.d).getTime() - t0) / Math.max(1, t1 - t0)) * (w - 12) + 6, Y = v => h - 6 - (v - lo) / (hi - lo) * (h - 12);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" aria-hidden="true"><polyline fill="none" stroke="var(--ember)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${pts.map(p => X(p).toFixed(1) + ',' + Y(p.kg).toFixed(1)).join(' ')}"/>${pts.map(p => `<circle cx="${X(p).toFixed(1)}" cy="${Y(p.kg).toFixed(1)}" r="3" fill="var(--surface)" stroke="var(--ember)" stroke-width="2"/>`).join('')}</svg>`;
}
/* Example data so a brand-new user can see what a check-in does. Never saved. */
function demoData() {
  const w0 = S.profile.weight, g = S.profile.goal, rate = g === 'fett' ? -0.9 : g === 'muskel' ? 0.05 : -0.3, b = baseTargets();
  const weights = [], days = {}, workouts = [];
  for (let i = 20; i >= 1; i -= 2) weights.push({ d: daysAgo(i), kg: r1(w0 - rate * i / 7 + (i % 4 ? 0.2 : -0.2)) });
  for (let i = 1; i <= 14; i++) if (i % 5) days[daysAgo(i)] = { meals: { fruehstueck: [], mittag: [{ kcal: b.kcal * 0.97, p: b.p * 0.8, c: 0, f: 0 }], abend: [], snacks: [] } };
  const mk = (ago, kg) => ({ start: Date.now() - ago * 864e5, exercises: [{ exId: 'bankdruecken', sets: [{ done: true, type: 'n', kg, reps: 8 }] }] });
  workouts.push(mk(30, 60), mk(25, 60), mk(9, g === 'fett' ? 57.5 : 60), mk(4, g === 'fett' ? 57.5 : 62.5), mk(2, g === 'fett' ? 57.5 : 62.5));
  return { weights, days, workouts };
}
let ckDemo = false;
function checkinSheet() {
  const D = ckDemo ? demoData() : S, c = checkinCalc(D), b = c.b, feel = sm().feel, last = S.weights[S.weights.length - 1];
  const goalTxt = c.goal ? `${sgn1(c.goal)} kg` : L('±0 kg', '±0 kg');
  const tile = (label, val, sub) => `<div class="card"><div class="cap">${label}</div><div class="disp" style="font-size:20px;line-height:26px">${val}</div><div class="cap">${sub}</div></div>`;
  const ready = c.conf !== 'none' || c.diff;
  const hist = sm().checkins.slice(-4).reverse();
  openSheet(`<div class="row" style="justify-content:space-between"><div><h2 class="disp">${L('Wöchentlicher Check-in', 'Weekly check-in')}</h2><div class="cap">${ckDemo ? L('Beispieldaten · wird nicht gespeichert', 'Example data · not saved') : L('Gewicht, Essen und Training zusammen ausgewertet', 'Weight, food and training reviewed together')}</div></div><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    ${ckDemo ? '' : `<div class="field"><span class="lbl">${L('Gewicht heute morgen', 'Weight this morning')}</span><div class="row" style="gap:8px"><span class="unit grow"><input class="input" id="ck-w" inputmode="decimal" value="${last && last.d === dayKey() ? dec(last.kg) : ''}" placeholder="${last ? dec(last.kg) : ''}" aria-label="${L('Gewicht in kg', 'Weight in kg')}"><span>kg</span></span><button class="btn btn-s" data-sm="ckweight">${L('Eintragen', 'Log')}</button></div></div>`}
    <div class="field"><span class="lbl">${L('Wie fühlst du dich diese Woche?', 'How do you feel this week?')}</span><div class="seg">${[['good', L('Fit', 'Energised')], ['ok', L('Normal', 'Normal')], ['tired', L('Müde', 'Tired')]].map(([k, l]) => `<button class="${feel === k ? 'on' : ''}" data-sm="feel:${k}">${l}</button>`).join('')}</div></div>
    ${c.tr.pts ? `<div class="card" style="padding:12px 14px"><div class="row" style="justify-content:space-between"><span class="lbl">${L('Gewicht, 3 Wochen', 'Weight, 3 weeks')}</span><span class="cap num">${fmt1(c.tr.pts[0].kg)} → ${fmt1(c.tr.pts[c.tr.pts.length - 1].kg)} kg</span></div>${sparkSVG(c.tr.pts)}</div>` : ''}
    <div class="grid2">
      ${tile(L('Gewichtstrend', 'Weight trend'), c.tr.rate !== undefined ? `${sgn1(c.tr.rate)} kg` : '–', L(`pro Woche · Ziel ${goalTxt}`, `per week · goal ${goalTxt}`))}
      ${tile(L('Ø gegessen', 'Avg. eaten'), c.it.n ? `${fmt(c.it.kcal)} kcal` : '–', L(`Ziel ${fmt(b.kcal)} · ${c.it.n} Tage getrackt`, `target ${fmt(b.kcal)} · ${c.it.n} days tracked`))}
      ${tile(L('Kraft', 'Strength'), c.st.n ? `${sgn1(c.st.pct)} %` : '–', c.st.n ? L(`${c.st.n} ${c.st.n === 1 ? 'Übung' : 'Übungen'} vs. vorher`, `${c.st.n} ${c.st.n === 1 ? 'exercise' : 'exercises'} vs. before`) : L('kommt nach 2 Wochen Training', 'shows after 2 weeks of training'))}
      ${tile(L('Training', 'Training'), `${c.wk} / ${S.profile.days}`, L('letzte 7 Tage', 'last 7 days'))}
    </div>
    ${ready ? `<div class="card ckres ${c.diff ? 'chg' : ''}"><div class="cap">${L('Empfehlung', 'Recommendation')}</div>
        <div class="disp" style="font-size:24px;line-height:30px">${c.diff ? `${fmt(b.kcal + c.diff)} kcal <span class="tag ${c.diff > 0 ? 'good' : 'ember'}">${sgn(c.diff)} kcal</span>` : L(`${fmt(b.kcal)} kcal beibehalten`, `Keep ${fmt(b.kcal)} kcal`)}</div>
        <div class="cap">${L('Wochendurchschnitt pro Tag. Trainingstage bekommen davon mehr, Ruhetage weniger.', 'Weekly average per day. Training days get more of it, rest days less.')}${c.conf === 'mid' ? ' ' + L('Weil dein Essen nur teilweise getrackt ist, passen wir vorsichtig an.', 'Because your food is only partly tracked, we adjust carefully.') : ''}</div>
        <ul class="steps" style="margin:6px 0 0">${c.why.map(w => `<li>${w}</li>`).join('')}</ul></div>`
      : `<div class="banner">${ic('info', 18)}<div><b>${L('Noch zu wenig Daten für eine Anpassung', 'Not enough data to adjust yet')}</b><ul class="steps" style="margin:4px 0 0">${c.missing.map(m => `<li>${m}</li>`).join('')}</ul></div></div>`}
    ${ckDemo ? `<button class="btn btn-s btn-block" data-sm="ckdemo">${L('Zurück zu meinen Daten', 'Back to my data')}</button>`
      : ready ? `<div class="grid2"><button class="btn btn-s" data-sm="ckkeep">${L('Ziel beibehalten', 'Keep target')}</button><button class="btn btn-p" data-sm="ckapply">${c.diff ? L('Übernehmen', 'Apply') : L('Bestätigen', 'Confirm')}</button></div>`
      : `<button class="btn btn-s btn-block" data-sm="ckdemo">${L('Mit Beispieldaten ansehen', 'Preview with example data')}</button>`}
    ${!ckDemo && hist.length ? `<div class="card" style="padding-top:4px;padding-bottom:4px"><ul class="list">${hist.map(h => `<li><div class="grow"><div style="font-weight:600">${kd(h.d).toLocaleDateString(LOC(), { day: 'numeric', month: 'long' })}</div><div class="cap">${h.rate !== null && h.rate !== undefined ? sgn1(h.rate) + L(' kg/Woche', ' kg/week') + ' · ' : ''}${fmt(h.from)} → ${fmt(h.to)} kcal</div></div><span class="num" style="font-weight:700">${h.to !== h.from ? sgn(h.to - h.from) : '±0'}</span></li>`).join('')}</ul></div>` : ''}
    <p class="cap" style="margin:0">${L('Ein Vorschlag aus deinen Daten, keine medizinische Beratung. Änderungen sind höchstens 250 kcal pro Woche.', 'A suggestion based on your data, not medical advice. Changes are at most 250 kcal per week.')}</p>`);
}
function saveCheckin(apply) {
  const c = checkinCalc(), b = c.b, diff = apply ? c.diff : 0;
  sm().adj = (sm().adj || 0) + diff;
  sm().checkins.push({ d: dayKey(), from: b.kcal, to: b.kcal + diff, rate: c.tr.rate !== undefined ? Math.round(c.tr.rate * 100) / 100 : null, tdee: c.tdee ? Math.round(c.tdee) : null, strength: c.st.n ? r1(c.st.pct) : null, feel: sm().feel });
  if (sm().checkins.length > 52) sm().checkins.shift();
  save(); closeSheet(); render();
  toast(diff ? L(`Neues Ziel: ${fmt(b.kcal + diff)} kcal pro Tag im Schnitt`, `New target: ${fmt(b.kcal + diff)} kcal per day on average`) : L('Check-in gespeichert. Ziel bleibt.', 'Check-in saved. Target stays.'));
}

/* ---------- Load suggestions (double progression + recovery check) ---------- */
function repRange(target) { const m = String(target || '').match(/(\d+)\s*[–-]\s*(\d+)/); if (m && !/s/.test(target)) return [+m[1], +m[2]]; const n = parseInt(target); return n && !/s/.test(target) ? [n, n] : [8, 12]; }
const BIG_LOWER = new Set(['kniebeuge', 'kreuzheben', 'rumaenisches-kreuzheben', 'beinpresse', 'hackenschmidt', 'hip-thrust', 'smith-kniebeuge', 'frontkniebeuge']);
function loadStep(exId) { const e = exOf(exId); if (BIG_LOWER.has(exId)) return 5; if (e.equip === 'Kurzhantel') return 2; if (e.equip === 'Körpergewicht') return 0; if (/kettlebell/.test(exId)) return 4; return 2.5; }
const roundTo = (v, st) => st ? Math.max(st, Math.round(v / st) * st) : v;
/* Recovery: looks at what you ate yesterday and so far today */
function readiness() {
  const b = baseTargets(), y = dayTotals(S.days[daysAgo(1)]), yt = dayTargets(daysAgo(1));
  if (!y.kcal) return { ok: true, known: false };
  const pp = y.p / b.p, kp = y.kcal / yt.kcal;
  if (pp < 0.7 || kp < 0.7) return { ok: false, known: true, msg: pp < 0.7 ? L(`Gestern nur ${fmt(y.p)} g Protein (${fmt(pp * 100)} % vom Ziel). Heute Gewicht halten, steigern beim nächsten Mal.`, `Only ${fmt(y.p)} g protein yesterday (${fmt(pp * 100)} % of target). Hold the weight today and add next time.`) : L(`Gestern nur ${fmt(kp * 100)} % deiner Kalorien. Heute Gewicht halten, steigern beim nächsten Mal.`, `Only ${fmt(kp * 100)} % of your calories yesterday. Hold the weight today and add next time.`) };
  return { ok: true, known: true, good: pp >= 0.9 };
}
function suggestLoad(exId, target, beforeId, rd = readiness()) {
  const ps = prevSets(exId, beforeId); if (!ps) return null;
  const work = ps.filter(s => s.type !== 'w' && s.type !== 'd'); if (!work.length) return null;
  const step = loadStep(exId), top = Math.max(...work.map(s => s.kg)), atTop = work.filter(s => s.kg === top);
  const minR = Math.min(...atTop.map(s => s.reps)), maxR = Math.max(...atTop.map(s => s.reps));
  const [lo, hi] = target && /\d/.test(target) ? repRange(target) : maxR <= 5 ? [3, 5] : maxR <= 8 ? [5, 8] : maxR <= 12 ? [8, 12] : maxR <= 15 ? [12, 15] : [15, 20], last = `${top ? fmt1(top) + ' kg × ' : ''}${atTop.map(s => s.reps).join(', ')}`;
  let r;
  if (!top || !step) r = { kind: 'reps', kg: top, reps: maxR + 1, why: L(`Letztes Mal ${last} Wdh. Heute 1 Wiederholung mehr.`, `Last time ${last} reps. One more rep today.`) };
  else if (minR >= hi) r = { kind: 'up', kg: roundTo(top + step, step), reps: lo, why: L(`Letztes Mal ${last} Wdh., alle Sätze am oberen Ende (${hi}). Zeit für mehr Gewicht.`, `Last time ${last} reps, every set at the top of the range (${hi}). Time for more weight.`) };
  else if (maxR < lo - 1) r = { kind: 'down', kg: roundTo(top * 0.9, step), reps: lo, why: L(`Letztes Mal ${last} Wdh., unter deinem Ziel von ${lo}–${hi}. Etwas leichter, dafür sauber.`, `Last time ${last} reps, below your target of ${lo}–${hi}. A bit lighter, but clean.`) };
  else r = { kind: 'reps', kg: top, reps: Math.min(hi, minR + 1), why: L(`Letztes Mal ${last} Wdh. Gleiches Gewicht, Ziel ${Math.min(hi, minR + 1)} Wdh. pro Satz.`, `Last time ${last} reps. Same weight, aim for ${Math.min(hi, minR + 1)} reps per set.`) };
  if (r.kind === 'up' && !rd.ok) r = { kind: 'hold', kg: top, reps: hi, why: L(`Letztes Mal ${last} Wdh., eigentlich Zeit für mehr. `, `Last time ${last} reps, so you have earned more. `) + rd.msg };
  else if (r.kind === 'up' && rd.good) r.why += ' ' + L('Gut versorgt: gestern Proteinziel erreicht.', 'Well fuelled: protein target hit yesterday.');
  return r;
}
function applySug(x) { if (!x.sug) return; x.sets.forEach(s => { if (!s.done && (s.type === 'n' || s.type === 'f')) { s.kg = x.sug.kg; s.reps = x.sug.reps; } }); }
const sugDiffers = x => x.sug && x.sets.some(s => !s.done && (s.type === 'n' || s.type === 'f') && (s.kg !== x.sug.kg || s.reps !== x.sug.reps));
function sugHTML(x, xi) {
  if (x.sug === undefined) x.sug = suggestLoad(x.exId, x.target, S.active && S.active.id);
  const s = x.sug;
  if (!s) { if (exOf(x.exId).equip === 'Körpergewicht' || /s/.test(x.target || '')) return ''; const [lo, hi] = repRange(x.target); return `<div class="sugg first">${ic('spark', 18)}<span class="cap grow">${L(`<b>Erstes Mal:</b> Gewicht für ${lo}–${hi} saubere Wdh. wählen, 2 im Tank. Danach schlägt Repwerk vor.`, `<b>First time:</b> pick a weight for ${lo}–${hi} clean reps, 2 in the tank. After that, Repwerk suggests.`)}</span></div>`; }
  const icon = { up: 'up', hold: 'pause', down: 'refresh', reps: 'spark' }[s.kind], head = { up: L('Mehr Gewicht', 'Add weight'), hold: L('Heute halten', 'Hold today'), down: L('Etwas leichter', 'Go a bit lighter'), reps: L('Mehr Wiederholungen', 'More reps') }[s.kind];
  return `<div class="sugg ${s.kind}">${ic(icon, 18)}<div class="grow"><b>${head}: ${s.kg ? fmt1(s.kg) + ' kg × ' : ''}${s.reps} ${L('Wdh.', 'reps')}</b><span class="cap">${s.why}</span></div>${sugDiffers(x) ? `<button class="btn btn-s btn-sm" data-sm="sugapply:${xi}">${L('Eintragen', 'Fill in')}</button>` : ''}</div>`;
}
function nextTimeHTML(a) {
  const ups = a.exercises.map(x => ({ x, s: suggestLoad(x.exId, x.target, null, { ok: true }) })).filter(o => o.s && o.s.kind === 'up').slice(0, 4);
  const b = dayTargets(), cd = cycleDelta();
  return `<div class="card soft"><div class="lbl" style="color:var(--ember-ink)">${L('Nach dem Training', 'After your workout')}</div>
    <div>${L(`Heute ist Trainingstag: dein Ziel liegt bei ${fmt(b.kcal)} kcal${cd.up ? ` (${sgn(cd.up)} kcal Kohlenhydrate)` : ''}. Noch ${fmt(Math.max(0, b.p - dayTotals(today()).p))} g Protein bis zum Tagesziel.`, `Today is a training day: your target is ${fmt(b.kcal)} kcal${cd.up ? ` (${sgn(cd.up)} kcal carbs)` : ''}. ${fmt(Math.max(0, b.p - dayTotals(today()).p))} g protein left to today's target.`)}</div>
    ${ups.length ? `<div style="margin-top:10px;font-weight:700">${L('Nächstes Mal mehr Gewicht', 'More weight next time')}</div><ul class="steps" style="margin:4px 0 0">${ups.map(o => `<li>${esc(exOf(o.x.exId).name)}: ${fmt1(o.s.kg)} kg × ${o.s.reps}</li>`).join('')}</ul>` : ''}</div>`;
}

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-sm]'); if (!b || !S || !S.profile) return;
  const [a, v] = b.dataset.sm.split(':');
  if (a === 'cycleinfo') cycleInfo();
  else if (a === 'cycle') { sm().cycle = !sm().cycle; save(); render(); cycleInfo(); }
  else if (a === 'wd') { const d = +v, w = trainWeekdays().slice(), i = w.indexOf(d); if (i >= 0) { if (w.length > 1) w.splice(i, 1); } else w.push(d); sm().wd = w.sort(); save(); render(); cycleInfo(); }
  else if (a === 'checkin') { ckDemo = false; checkinSheet(); }
  else if (a === 'ckdemo') { ckDemo = !ckDemo; checkinSheet(); }
  else if (a === 'feel') { sm().feel = v; save(); checkinSheet(); }
  else if (a === 'ckweight') { const kg = r1(num($('#ck-w').value)); if (kg < 35 || kg > 300) { toast(L('Bitte ein Gewicht zwischen 35 und 300 kg eingeben', 'Please enter a weight between 35 and 300 kg')); return; } const k = dayKey(); S.weights = S.weights.filter(w => w.d !== k); S.weights.push({ d: k, kg }); S.weights.sort((x, y) => x.d < y.d ? -1 : 1); S.profile.weight = kg; save(); checkinSheet(); toast(L('Gewicht gespeichert', 'Weight saved')); }
  else if (a === 'ckapply') saveCheckin(true);
  else if (a === 'ckkeep') saveCheckin(false);
  else if (a === 'sugapply' && S.active) { const x = S.active.exercises[+v]; applySug(x); save(); render(); }
  else if (a === 'adjreset') { sm().adj = 0; save(); render(); toast(L('Anpassungen zurückgesetzt', 'Adjustments reset')); }
});
