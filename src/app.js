/* Repwerk Fitness prototype v2 */
const I = {
  home:'<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  fork:'<path d="M7 3v6a3 3 0 0 0 6 0V3M10 3v18M17 3c-1.7 1-2.5 3-2.5 6s1 4 2.5 4v8"/>',
  db:'<path d="M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11"/>',
  chart:'<path d="M4 20h16M6 16l4-5 3 3 5-7"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M17.5 14.8c2 .7 3.4 2.5 4 5.2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  pause:'<path d="M9 5v14M15 5v14"/>',
  cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  img:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m20 16-5-5-9 8"/>',
  text:'<path d="M5 6h14M5 12h14M5 18h9"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  play:'<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01"/>',
  swap:'<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
  video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  dots:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  timer:'<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2.5 2M9 3h6"/>',
  pin:'<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.6 4V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 20.4 9H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 2z"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  up:'<path d="M12 19V5M6 11l6-6 6 6"/>', down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
  book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  cart:'<path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  flame:'<path d="M12 3c1 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.3 1.6 1.1 2.6 2.3 3C11 9 11.2 6 12 3z"/>',
  stats:'<path d="M5 20V11M10 20V5M15 20v-7M20 20V9"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  refresh:'<path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/>',
  barcode:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8v8M10.5 8v8M14 8v8M17 8v8"/>',
  torch:'<path d="M8 3h8l-1 5H9L8 3ZM9 8v12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8M12 12v3"/>'
};
const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const MARK = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="${c || 'currentColor'}" aria-hidden="true"><rect x="3" y="22" width="7" height="20" rx="3"/><rect x="12" y="13" width="9" height="38" rx="3.5"/><rect x="20" y="28.5" width="24" height="7" rx="2"/><rect x="43" y="13" width="9" height="38" rx="3.5"/><rect x="54" y="22" width="7" height="20" rx="3"/></svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const r0 = n => Math.round(n || 0);
const r1 = n => Math.round((n || 0) * 10) / 10;
const fmt = n => r0(n).toLocaleString(LOC());
const fmt1 = n => (Math.round((n || 0) * 10) / 10).toLocaleString(LOC());
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const pad = n => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const weekKey = (d = new Date()) => { const t = new Date(d); t.setHours(0,0,0,0); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); return dayKey(t); };
const dec = v => (typeof S !== 'undefined' && S && S.lang === 'en') ? String(v) : String(v).replace('.', ',');
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };
const EX = Object.fromEntries(EXERCISES.map(e => [e.id, e]));
const SLOTS = [['fruehstueck','Frühstück'],['mittag','Mittagessen'],['abend','Abendessen'],['snacks','Snacks']];
const LIMITS = { free: { photo: 3, coach: 5 }, pro: { photo: 30, coach: 50 } };
const MUSCLES = ['Brust','Rücken','Schultern','Bizeps','Trizeps','Beine','Gesäß','Bauch'];
const EQUIP = ['Langhantel','Kurzhantel','Maschine','Kabel','Körpergewicht'];
const ago = ts => { const m = Math.round((Date.now() - ts) / 60000); if (m < 1) return 'gerade eben'; if (m < 60) return `vor ${m} min`; const h = Math.round(m / 60); if (h < 24) return `vor ${h} Std.`; const d = Math.round(h / 24); return d === 1 ? 'gestern' : d < 7 ? `vor ${d} Tagen` : new Date(ts).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' }); };
const dur = ms => { const s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h ? `${h} h ${m} min` : `${m} min`; };
const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };

/* ---------- Environment: inside Claude (prototype) or standalone web app ---------- */
const IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');
const aiOffText = () => IN_CLAUDE ? 'Die KI funktioniert, wenn du den Prototyp in Claude öffnest und angemeldet bist.' : 'Die KI ist in dieser Version noch nicht eingerichtet.';
// Standalone: the AI runs through our own server function (/api/ai). Same interface as Claude's sample capability.
function apiError(code) { const e = new Error(code); e.code = code; return e; }
async function apiCall(body) {
  if (SRV.aiLogin && !loggedIn()) throw apiError('login');
  let r;
  try { r = await fetch('api/ai', { method: 'POST', headers: await authHeaders(), body: JSON.stringify(body) }); } catch (e) { throw apiError('network'); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw apiError(j.code || (r.status === 429 ? 'rate_limited' : 'server'));
  return j;
}
const blobToDataUrl = blob => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(blob); });
function makeApiSample() {
  const fn = async (turns, opts = {}) => { const j = await apiCall({ messages: turns }); if (opts.onText) opts.onText({ text: j.text, delta: j.text }); return { text: j.text, truncated: false }; };
  fn.json = async (input, opts = {}) => {
    const images = [];
    for (const b of (opts.images || [])) { let url; try { url = await compressImage(b, 1280, 0.8); } catch (e) { url = await blobToDataUrl(b); } images.push(url); }
    const j = await apiCall({ prompt: input, images, json: true, kind: opts.kind });
    if (!j.json) throw apiError('invalid_json');
    return j.json;
  };
  fn.limits = async () => ({ images: { maxCount: 5 } });
  return fn;
}
async function connectApi() {
  try { const r = await fetch('api/health', { cache: 'no-store' }); const j = await r.json(); if (j && j.ai) { sampleFn = makeApiSample(); sampleImages = true; } if (j) { setSB(j.supabase); setSRV(j); } render(); if (loggedIn()) cloudSync(false); else refreshPro(); handleInviteParam(); handleProReturn(); } catch (e) { /* offline or no server function: AI stays off, cached cloud config stays */ if (loggedIn()) cloudSync(false); }
}
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (S && S.profile && view === 'home') render(); });
function registerSW() { if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {}); }
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
function installCard() {
  if (IN_CLAUDE || isStandalone() || S.hideInstall) return '';
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (!ios && !installEvt) return '';
  return `<div class="card startcard"><div class="row" style="justify-content:space-between"><h2 class="disp" style="font-size:19px;line-height:24px">App installieren</h2><button class="btn btn-g" data-act="hideinstall">Ausblenden</button></div>
    ${ios ? '<p style="margin:0">Tippe in Safari unten auf <b>Teilen</b> und dann auf <b>Zum Home-Bildschirm</b>. Danach öffnest du Repwerk wie eine App, auch offline.</p>' : '<p style="margin:0">Leg Repwerk auf deinen Startbildschirm. Danach öffnest du es wie eine App, auch offline.</p><button class="btn btn-p btn-block" data-act="install">Installieren</button>'}</div>`;
}

/* ---------- State ---------- */
const LS_KEY = 'repwerk-proto-v2';
let S = null, DB = null, UID = null, saveTimer = null, dirty = false;
const DESIGN0 = { theme: 'system', accent: 'ember', size: 'm', corners: 'round', ring: 'left' };
function blank() { return { v: 2, profile: null, targets: null, pro: false, design: { ...DESIGN0 }, reminders: { training: true, meals: false, water: false }, days: {}, weights: [], workouts: [], active: null, planIndex: 0, routines: [], customEx: [], gyms: [], coach: { week: '', count: 0 }, chat: [], mealPlan: null, social: { name: '', bio: '', avatar: '' }, following: [], best: { days: 0, weeks: 0 }, smart: { ...SMART0, checkins: [] }, lang: 'de', at: 0 }; }
function migrate(o) {
  const b = blank(); const s = Object.assign(b, o || {});
  s.design = Object.assign({ ...DESIGN0 }, (o && o.design) || {}, o && o.theme ? { theme: o.theme } : {});
  if (s.mealPlan && s.mealPlan.v !== 2) s.mealPlan = null;
  s.social = Object.assign({ name: '', bio: '', avatar: '' }, s.social || {});
  s.smart = Object.assign({ ...SMART0, checkins: [] }, s.smart || {}); if (!Array.isArray(s.smart.checkins)) s.smart.checkins = [];
  if (s.profile) s.profile = Object.assign({ duration: 60, experience: 'mittel', equipment: [], diet: 'alles', allergies: [], meals: 4 }, s.profile);
  if (s.active) s.active.exercises.forEach(x => { x.rest = x.rest ?? 90; x.note = x.note || ''; x.sets.forEach(st => st.type = st.type || 'n'); });
  return s;
}
function loadLocal() { try { const raw = localStorage.getItem(LS_KEY) || localStorage.getItem('repwerk-proto-v1'); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
function save() { S.at = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} dirty = true; clearTimeout(saveTimer); saveTimer = setTimeout(flush, 900); if (!IN_CLAUDE) cloudSchedule(); }
async function flush() { if (!IN_CLAUDE || !DB || !UID || !dirty) return; dirty = false; try { await DB.doc(`data/users/${UID}/state`).set({ json: JSON.stringify(S), at: S.at }); } catch (e) { dirty = true; } }
async function connectDb() {
  try {
    const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    DB = db; UID = id; CB = claudeCB(db, id);
    const snap = await Promise.race([DB.doc(`data/users/${UID}/state`).get(), new Promise(r => setTimeout(() => r(null), 10000))]);
    const remote = snap && snap.exists ? snap.data() : null;
    if (remote && remote.json && (remote.at || 0) > (S.at || 0)) { S = migrate(JSON.parse(remote.json)); try { localStorage.setItem(LS_KEY, remote.json); } catch (e) {} applyDesign(); }
    else if (S.profile) { dirty = true; flush(); }
    render();
  } catch (e) { /* stays local */ }
}
function dayOf(k) { if (!S.days[k]) S.days[k] = { meals: { fruehstueck: [], mittag: [], abend: [], snacks: [] }, water: 0, photos: 0 }; return S.days[k]; }
function today() { return dayOf(dayKey()); }
let foodKey = null;
const foodDay = () => dayOf(foodKey || dayKey());
const hasLog = k => { const d = S.days[k]; return !!(d && (SLOTS.some(([s]) => (d.meals[s] || []).length) || d.water)); };
const trainedOn = k => S.workouts.some(w => dayKey(new Date(w.start)) === k);
function dayTotals(d) { const t = { kcal: 0, p: 0, c: 0, f: 0 }; if (!d) return t; for (const [k] of SLOTS) for (const e of d.meals[k] || []) { t.kcal += e.kcal; t.p += e.p; t.c += e.c; t.f += e.f; } return t; }
const lim = () => S.pro ? LIMITS.pro : LIMITS.free;
const exOf = id => EX[id] || (S.customEx || []).find(e => e.id === id) || { id, name: 'Unbekannte Übung', muscle: '', equip: '', level: '', steps: [], mistakes: [], safety: '', alts: [], custom: true };
const allEx = () => [...EXERCISES, ...(S.customEx || [])];

/* ---------- Design ---------- */
const ACCENTS = {
  ember:  { name: 'Ember',   base: '#FF5B2E', on: '#1C1714', inkL: '#B8400F', inkD: '#FF8A63', softL: '#FFE6DC', softD: '#3B2018' },
  kobalt: { name: 'Kobalt',  base: '#3D7BFF', on: '#0E1424', inkL: '#2456C7', inkD: '#8AB0FF', softL: '#E1EAFF', softD: '#17223D' },
  violett:{ name: 'Violett', base: '#9D74FF', on: '#140D24', inkL: '#6D3FD9', inkD: '#B79CFF', softL: '#EEE6FF', softD: '#251A3D' },
  gruen:  { name: 'Grün',    base: '#22C55E', on: '#06150C', inkL: '#15803D', inkD: '#4ADE80', softL: '#DCFCE7', softD: '#0F2A1A' },
  pink:   { name: 'Pink',    base: '#FF4D8D', on: '#1F0A12', inkL: '#C21E5C', inkD: '#FF85B0', softL: '#FFE3EE', softD: '#3D1424' }
};
let viewerTheme;
function isDark() { const t = document.documentElement.getAttribute('data-theme'); return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
function applyDesign() {
  const root = document.documentElement, d = (S && S.design) || DESIGN0;
  if (viewerTheme === undefined) viewerTheme = root.getAttribute('data-theme');
  if (d.theme === 'light' || d.theme === 'dark') root.setAttribute('data-theme', d.theme); else if (viewerTheme) root.setAttribute('data-theme', viewerTheme); else root.removeAttribute('data-theme');
  const a = ACCENTS[d.accent] || ACCENTS.ember, dark = isDark();
  root.style.setProperty('--ember', a.base); root.style.setProperty('--on-ember', a.on);
  root.style.setProperty('--ember-ink', dark ? a.inkD : a.inkL); root.style.setProperty('--ember-soft', dark ? a.softD : a.softL);
  const r = d.corners === 'square' ? [4, 8, 10] : [8, 14, 22];
  root.style.setProperty('--r-sm', r[0] + 'px'); root.style.setProperty('--r-md', r[1] + 'px'); root.style.setProperty('--r-lg', r[2] + 'px');
  document.body.style.zoom = d.size === 's' ? '0.92' : d.size === 'l' ? '1.1' : '1';
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = dark ? '#111214' : '#F5F4F1';
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyDesign());

/* ---------- Claude ---------- */
let sampleFn = null, sampleImages = false;
async function connectSample() { try { sampleFn = await claude.use('sample'); if (sampleFn) { const l = await sampleFn.limits().catch(() => null); sampleImages = !!(l && l.images); } } catch (e) { sampleFn = null; } render(); }
const errText = e => ({ not_granted: 'Die KI wurde für diese Seite nicht erlaubt.', rate_limited: 'Gerade zu viele Anfragen. Versuch es gleich noch einmal.', image_rejected: 'Dieses Bild konnte nicht gelesen werden. Nimm ein anderes Foto (JPG oder PNG).', refused: 'Die KI konnte das nicht auswerten.', invalid_json: 'Die Antwort war unvollständig. Versuch es noch einmal.', images_unavailable: 'Fotoanalyse ist in dieser Ansicht nicht verfügbar. Nutze die Text-Eingabe.', session_expired: 'Bitte melde dich bei Claude neu an.', network: 'Keine Internetverbindung. Versuch es gleich noch einmal.', server: 'Der Server hat nicht geantwortet. Versuch es gleich noch einmal.', ai_off: 'Die KI ist in dieser Version noch nicht eingerichtet.', login: 'Melde dich an, um die KI zu nutzen. So bleibt sie für alle schnell und fair.', limit: 'Dein Limit für diese KI-Funktion ist für heute erreicht. Mit Pro hast du deutlich mehr.', pro: 'Diese KI-Funktion gibt es mit Pro.' }[e && e.code] || 'Das hat nicht geklappt. Versuch es noch einmal.');
const ALLERGENS = { laktose: 'Laktose', gluten: 'Gluten', nuesse: 'Nüsse', ei: 'Ei', fisch: 'Fisch', soja: 'Soja' };
const DIETS = { alles: 'Alles', vegetarisch: 'Vegetarisch', vegan: 'Vegan', pescetarisch: 'Pescetarisch' };
function foodPrompt() {
  const al = (S.profile.allergies || []).map(a => ALLERGENS[a]).join(', ');
  return `Du bist der Ernährungs-Assistent der Fitness-App Repwerk Fitness. Schätze so genau wie möglich, was auf dem Bild oder in der Beschreibung gegessen oder getrunken wird.
Antworte NUR mit einem JSON-Objekt in genau dieser Form:
{"title":"kurzer deutscher Name","items":[{"type":"food","name":"Lebensmittel auf Deutsch","grams":150,"kcal":248,"protein":46,"carbs":0,"fat":5.4,"fiber":0,"sugar":0,"saturated_fat":1.5,"monounsaturated_fat":2,"polyunsaturated_fat":1.2,"trans_fat":0,"salt":0.2,"cholesterol_mg":128,"potassium_mg":384,"calcium_mg":22,"iron_mg":1.5,"vitamin_a_ug":9,"vitamin_c_mg":0,"confidence":0.85,"allergen":null},{"type":"water","name":"Mineralwasser","ml":500,"confidence":0.9}],"note":null}
Regeln:
- Jeder erkennbare Bestandteil ist ein eigenes Item. grams ist die geschätzte Menge, kcal und alle Nährwerte (in Gramm: protein, carbs, fat, fiber = Ballaststoffe, sugar = Zucker, saturated_fat, monounsaturated_fat, polyunsaturated_fat, trans_fat, salt; dazu cholesterol_mg, potassium_mg, calcium_mg, iron_mg in mg, vitamin_c_mg in mg und vitamin_a_ug in µg) gelten für genau diese Menge, nicht pro 100 g.
- Reines Wasser, Mineralwasser, Sprudel und ungesüßter Tee sind type "water" mit ml (z. B. 0,5-l-Flasche = 500, Glas = 250) und ohne Kalorienangaben.
- Andere Getränke mit Kalorien (Saft, Cola, Milch, Kaffee mit Milch, Bier) sind type "food", dabei grams = ml.
- confidence von 0 bis 1: wie sicher Erkennung und Menge sind; versteckte Zutaten wie Öl oder Saucen bekommen eine niedrige confidence.
- ${al ? `Die Person verträgt Folgendes nicht: ${al}. Wenn ein Item das wahrscheinlich enthält, setze "allergen" auf den Namen, sonst null.` : 'allergen ist immer null.'}
- Wenn weder Essen noch Getränke erkennbar sind: "items":[] und in "note" ein kurzer Satz, warum.
Keine Gesundheits- oder Diätratschläge.${isEN() ? '\nWICHTIG: Schreibe title, name und note auf Englisch.' : ''}`;
}
async function analyzeFood({ blob, text }) {
  const input = blob ? foodPrompt() + '\n\nAnalysiere das beigefügte Foto.' : foodPrompt() + '\n\nDie Person beschreibt es so: """' + text.slice(0, 1500) + '"""';
  const out = await sampleFn.json(input, blob ? { images: [blob] } : { modelTier: 'quick' });
  const raw = Array.isArray(out && out.items) ? out.items : [];
  const items = [], water = [];
  for (const it of raw) {
    if (it && it.type === 'water') { water.push({ id: uid(), name: String(it.name || 'Wasser').slice(0, 40), ml: Math.max(50, r0(num(it.ml) || 250)) }); continue; }
    const o = { id: uid(), name: String(it.name || 'Unbekannt').slice(0, 60), grams: Math.max(1, num(it.grams) || 100), kcal: Math.max(0, num(it.kcal)), p: Math.max(0, num(it.protein)), c: Math.max(0, num(it.carbs)), f: Math.max(0, num(it.fat)), fib: Math.max(0, num(it.fiber)), sug: Math.max(0, num(it.sugar)), sat: Math.max(0, num(it.saturated_fat)), salt: Math.max(0, num(it.salt)), mufa: Math.max(0, num(it.monounsaturated_fat)), pufa: Math.max(0, num(it.polyunsaturated_fat)), trans: Math.max(0, num(it.trans_fat)), chol: Math.max(0, num(it.cholesterol_mg)), kal: Math.max(0, num(it.potassium_mg)), ca: Math.max(0, num(it.calcium_mg)), fe: Math.max(0, num(it.iron_mg)), va: Math.max(0, num(it.vitamin_a_ug)), vc: Math.max(0, num(it.vitamin_c_mg)), conf: Math.min(1, Math.max(0, num(it.confidence) || 0.5)), allergen: it.allergen ? String(it.allergen).slice(0, 30) : '', src: blob ? 'foto' : 'text' };
    o.base = { g: o.grams, kcal: o.kcal, p: o.p, c: o.c, f: o.f }; for (const x of XN) o.base[x] = o[x]; items.push(o);
  }
  return { title: String((out && out.title) || 'Mahlzeit').slice(0, 60), items, water, note: out && out.note ? String(out.note) : '' };
}

/* ---------- Targets and plan ---------- */
const GOALS = { muskel: 'Muskeln aufbauen', fett: 'Fett verlieren', halten: 'Gewicht halten', fit: 'Fitter werden' };
const ACT = [['1.2','Wenig (Büro, kaum Bewegung)'],['1.375','Leicht (viel zu Fuß)'],['1.55','Aktiv (stehend, viel Bewegung)'],['1.725','Sehr aktiv (körperliche Arbeit)']];
const EXP = { einsteiger: 'Einsteiger (unter 6 Monate)', mittel: 'Fortgeschritten (6 Monate bis 2 Jahre)', profi: 'Erfahren (über 2 Jahre)' };
const HOME_EQ = { kh: 'Kurzhanteln', lh: 'Langhantel und Scheiben', bank: 'Hantelbank', stange: 'Klimmzugstange', kabel: 'Widerstandsbänder' };
function calcTargets(p) {
  const sexAdj = p.sex === 'm' ? 5 : p.sex === 'w' ? -161 : -78;
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + sexAdj, tdee = bmr * num(p.activity);
  let adj = 0; if (p.goal === 'fett') adj = -Math.min(500, tdee * 0.2); if (p.goal === 'muskel') adj = Math.min(300, tdee * 0.1);
  const kcal = Math.round((tdee + adj) / 10) * 10, pPerKg = p.goal === 'fett' || p.goal === 'muskel' ? 2.0 : 1.6;
  const prot = Math.round(pPerKg * p.weight), fat = Math.round(Math.max(0.8 * p.weight, kcal * 0.25 / 9)), carbs = Math.max(0, Math.round((kcal - prot * 4 - fat * 9) / 4));
  return { kcal, p: prot, c: carbs, f: fat, water: p.waterGoal ? Math.round(p.waterGoal * 1000) : Math.round(p.weight * 35 / 250) * 250, bmr: Math.round(bmr), tdee: Math.round(tdee), adj: Math.round(adj), pPerKg };
}
const NEEDS = { bankdruecken: ['lh','bank'], 'schraegbank-kh': ['kh','bank'], klimmzuege: ['stange'], 'haengendes-beinheben': ['stange'], dips: ['stange'], 'hip-thrust': ['lh'] };
function available(e, p) {
  if (p.location !== 'home') return true;
  const eq = p.equipment || [];
  if (NEEDS[e.id]) return NEEDS[e.id].every(x => eq.includes(x));
  if (e.equip === 'Körpergewicht') return true;
  if (e.equip === 'Kurzhantel') return eq.includes('kh');
  if (e.equip === 'Langhantel') return eq.includes('lh');
  if (e.equip === 'Kabel') return eq.includes('kabel');
  return e.id === 'wadenheben';
}
const TEMPLATES = {
  'Ganzkörper A': [['kniebeuge','goblet-squat','beinpresse','ausfallschritte'],['bankdruecken','brustpresse','schraegbank-kh','liegestuetze'],['rudern-lh','rudermaschine','kh-rudern','rudern-kabel'],['schulterdruecken-kh','schulterpresse-maschine','liegestuetze'],['beinbeuger','rumaenisches-kreuzheben','kh-rumaenisch','glute-bridge'],['plank'],['bizeps-curl-kh','hammer-curl'],['wadenheben']],
  'Ganzkörper B': [['rumaenisches-kreuzheben','kh-rumaenisch','glute-bridge'],['schraegbank-kh','butterfly','liegestuetze'],['latzug','klimmzuege','kh-rudern'],['seitheben','reverse-butterfly'],['beinpresse','ausfallschritte','goblet-squat'],['crunch-kabel','bauchmaschine','crunch'],['trizeps-kabel','bank-dips'],['hip-thrust','glute-bridge']],
  'Oberkörper A': [['bankdruecken','brustpresse','liegestuetze'],['rudern-lh','rudermaschine','kh-rudern'],['schulterdruecken-kh','schulterpresse-maschine'],['latzug','klimmzuege','kh-rudern'],['bizeps-curl-kh','bizepsmaschine','hammer-curl'],['trizeps-kabel','bank-dips'],['seitheben']],
  'Unterkörper A': [['kniebeuge','smith-kniebeuge','goblet-squat'],['rumaenisches-kreuzheben','kh-rumaenisch','glute-bridge'],['beinpresse','hackenschmidt','ausfallschritte'],['beinbeuger','glute-bridge'],['wadenheben'],['plank'],['bauchmaschine','crunch']],
  'Oberkörper B': [['schraegbank-kh','brustpresse','liegestuetze'],['klimmzuege','latzug','kh-rudern'],['seitheben','schulterpresse-maschine'],['rudern-kabel','rudermaschine','kh-rudern'],['hammer-curl','bizeps-curl-kh'],['dips','trizeps-kabel','bank-dips'],['reverse-butterfly','face-pulls']],
  'Unterkörper B': [['kreuzheben','kh-rumaenisch','glute-bridge'],['ausfallschritte','goblet-squat'],['beinstrecker','hackenschmidt','goblet-squat'],['hip-thrust','glute-bridge'],['wadenheben'],['haengendes-beinheben','crunch-kabel','crunch']],
  'Push': [['bankdruecken','brustpresse','liegestuetze'],['schulterdruecken-kh','schulterpresse-maschine'],['schraegbank-kh','butterfly','liegestuetze'],['seitheben'],['trizeps-kabel','bank-dips'],['dips','bank-dips'],['butterfly']],
  'Pull': [['klimmzuege','latzug','kh-rudern'],['rudern-lh','rudermaschine','kh-rudern'],['rudern-kabel','kh-rudern'],['face-pulls','reverse-butterfly'],['bizeps-curl-kh','bizepsmaschine'],['hammer-curl'],['haengendes-beinheben','crunch']],
  'Beine': [['kniebeuge','smith-kniebeuge','goblet-squat'],['rumaenisches-kreuzheben','kh-rumaenisch','glute-bridge'],['beinpresse','hackenschmidt','ausfallschritte'],['beinbeuger','glute-bridge'],['beinstrecker','ausfallschritte'],['wadenheben'],['bauchmaschine','crunch']]
};
const COMPOUND = new Set(['kniebeuge','smith-kniebeuge','hackenschmidt','beinpresse','bankdruecken','brustpresse','kreuzheben','rumaenisches-kreuzheben','rudern-lh','klimmzuege','schulterdruecken-kh','schulterpresse-maschine','hip-thrust','dips']);
function buildPlan(p) {
  const d = Number(p.days) || 3, nEx = { 30: 4, 45: 5, 60: 6, 75: 7, 90: 7 }[p.duration] || 6;
  const sets = p.experience === 'einsteiger' ? 3 : p.experience === 'profi' ? 4 : (p.goal === 'muskel' ? 4 : 3);
  const reps = p.goal === 'fett' ? '10–15' : p.experience === 'profi' && p.goal === 'muskel' ? '6–10' : '8–12';
  const names = d <= 3 ? ['Ganzkörper A','Ganzkörper B'] : d === 4 ? ['Oberkörper A','Unterkörper A','Oberkörper B','Unterkörper B'] : ['Push','Pull','Beine'];
  const name = (p.location === 'home' ? 'Home: ' : '') + (d <= 3 ? 'Ganzkörper A/B' : d === 4 ? 'Oberkörper / Unterkörper' : 'Push / Pull / Beine');
  const days = names.map(n => {
    const used = new Set(), ex = [];
    for (const slot of TEMPLATES[n]) { if (ex.length >= nEx) break; const id = slot.find(x => EX[x] && !used.has(x) && available(EX[x], p)); if (id) { used.add(id); ex.push(id); } }
    return { name: n, ex: ex.map(id => ({ id, sets: id === 'plank' ? 3 : sets, reps: id === 'plank' ? '30–60 s' : reps, rest: COMPOUND.has(id) ? 120 : 75 })) };
  });
  return { name, days };
}
const plan = () => buildPlan(S.profile);
function planRoutines() { return plan().days.map((d, i) => ({ id: 'plan-' + i, plan: true, name: d.name, exercises: d.ex.map(x => ({ exId: x.id, rest: x.rest, note: '', target: x.reps, sets: Array.from({ length: x.sets }, () => ({ type: 'n', kg: 0, reps: parseInt(x.reps) || 10 })) })) })); }
const nextPlanIndex = () => S.planIndex % plan().days.length;
function prevSets(exId, beforeId) {
  for (let i = S.workouts.length - 1; i >= 0; i--) { const w = S.workouts[i]; if (w.id === beforeId) continue; const e = w.exercises.find(x => x.exId === exId); if (e) { const done = e.sets.filter(s => s.done); if (done.length) return done; } }
  return null;
}
function lastPerf(exId) { const ps = prevSets(exId); if (!ps) return null; const work = ps.filter(s => s.type !== 'w'); const best = (work.length ? work : ps).reduce((a, b) => (b.kg > a.kg || (b.kg === a.kg && b.reps > a.reps)) ? b : a); return { sets: ps.length, kg: best.kg, reps: best.reps }; }
const e1rm = s => s.kg * (1 + s.reps / 30);
function bestE1rm(exId, workouts) { let b = 0; for (const w of workouts) for (const e of w.exercises) if (e.exId === exId) for (const s of e.sets) if (s.done && s.type !== 'w') b = Math.max(b, e1rm(s)); return b; }
const volume = w => w.exercises.reduce((a, e) => a + e.sets.filter(s => s.done && s.type !== 'w').reduce((b, s) => b + s.kg * s.reps, 0), 0);
const elapsed = w => w ? Math.max(0, (w.pausedAt || Date.now()) - w.start - (w.pausedMs || 0)) : 0;
const wDur = w => w.dur ?? ((w.end || w.start) - w.start);
const doneCount = w => w.exercises.reduce((n, e) => n + e.sets.filter(s => s.done).length, 0);
const TYPES = { n: 'Normal', w: 'Aufwärmen', d: 'Dropsatz', f: 'Bis zum Versagen' };

/* ---------- UI helpers ---------- */
let view = 'home', timer = null, R = null, communityTab = 'feed', feed = null, people = null, feedState = 'idle', peopleQ = '', peopleTimer = null;
const $ = s => document.querySelector(s);
function toast(msg) { document.querySelectorAll('.toast').forEach(t => t.remove()); const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.append(t); setTimeout(() => t.remove(), 2400); }
function openSheet(html, onMount) {
  const o = $('#overlay');
  o.innerHTML = `<div class="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div></div>`;
  const scrim = o.firstElementChild, sh = scrim.querySelector('.sheet');
  scrim.addEventListener('click', e => { if (e.target === scrim || e.target.closest('[data-close-sheet]')) closeSheet(); });
  if (onMount) onMount(sh);
  return sh;
}
function closeSheet() { $('#overlay').innerHTML = ''; }
function confirmBox(title, text, okLabel, danger) {
  return new Promise(res => {
    const o = document.createElement('div'); o.className = 'scrim center';
    o.innerHTML = `<div class="dialog" role="alertdialog" aria-modal="true"><h2 class="disp">${esc(title)}</h2><p class="muted" style="margin:0">${esc(text)}</p><div class="row"><button class="btn btn-s grow" data-a="0">Abbrechen</button><button class="btn ${danger ? 'btn-d' : 'btn-p'} grow" data-a="1">${esc(okLabel)}</button></div></div>`;
    document.body.append(o);
    o.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b || e.target === o) { o.remove(); res(!!(b && b.dataset.a === '1')); } });
  });
}
function ring(size, eaten, goal) {
  const r = size / 2 - 10, c = 2 * Math.PI * r, pct = goal ? Math.min(1, eaten / goal) : 0, left = r0(goal - eaten), mode = S.design.ring;
  const big = mode === 'eaten' ? fmt(eaten) : left >= 0 ? fmt(left) : '+' + fmt(-left), small = mode === 'eaten' ? `von ${fmt(goal)} kcal` : left >= 0 ? 'kcal übrig' : 'kcal über Ziel';
  return `<div style="position:relative;width:${size}px;height:${size}px;flex:none"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)" aria-hidden="true"><circle class="ring-t" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="13"/><circle class="ring-f" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="13" stroke-linecap="round" stroke-dasharray="${(c*pct).toFixed(1)} ${c.toFixed(1)}"/></svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div class="disp" style="font-size:${size > 160 ? 38 : 30}px;line-height:1">${big}</div><div class="cap">${small}</div></div></div>`;
}
function macroRow(name, cls, val, goal) { const pct = goal ? Math.min(100, val / goal * 100) : 0; return `<div class="macro"><span class="lbl"><span class="dot ${cls}" style="margin-right:6px"></span>${name}</span><span class="num"><b>${fmt(val)}</b> <span class="muted">/ ${fmt(goal)} g</span></span><div class="track"><div class="fill ${cls}" style="width:${pct}%"></div></div></div>`; }
const avatar = (src, name, size = 44) => src ? `<img src="${esc(src)}" alt="" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;flex:none;background:var(--surface-2)">` : `<div style="width:${size}px;height:${size}px;border-radius:50%;background:var(--ember-soft);color:var(--ember-ink);display:grid;place-items:center;font-weight:800;font-size:${Math.round(size * .4)}px;flex:none">${esc((name || '?').trim().charAt(0).toUpperCase() || '?')}</div>`;
const ADS = [
  ['Werbebanner (Free)', 'Mit Pro trainierst du werbefrei.'],
  ['Platz für eine Anzeige', 'Ohne Einwilligung nicht personalisiert.'],
  ['Anzeige eines Partners', 'Pro entfernt alle Banner.']
];
let adIdx = 0;
function adBanner() { if (S.pro) return ''; const a = ADS[adIdx++ % ADS.length]; return `<div class="ad" role="complementary" aria-label="Anzeige"><span class="adl">Anzeige</span><div class="grow"><div style="font-weight:600;font-size:14px">${a[0]}</div><div class="cap">${a[1]}</div></div><button class="btn btn-s btn-sm" data-act="paywall">Werbefrei</button></div>`; }
async function compressImage(file, max, q) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
    c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', q);
  } finally { URL.revokeObjectURL(url); }
}

/* ---------- Onboarding ---------- */
let ob = null;
const OB_STEPS = 7;
function renderOnboarding() {
  if (!ob) ob = { step: 0, p: { name: '', goal: 'muskel', sex: '', age: 28, height: 178, weight: 78, targetWeight: '', activity: '1.375', days: 3, duration: 60, experience: 'mittel', location: 'gym', equipment: ['kh'], diet: 'alles', allergies: [], meals: 4, waterGoal: '' } };
  const p = ob.p, st = ob.step;
  const chips = (key, opts, multi) => `<div class="chips">${opts.map(([v, l]) => { const on = multi ? (p[key] || []).includes(v) : String(p[key]) === String(v); return `<button class="chip ${on ? 'on' : ''}" data-ob="${key}" data-v="${esc(v)}" ${multi ? 'data-multi="1"' : ''} aria-pressed="${on}">${esc(l)}</button>`; }).join('')}</div>`;
  let body = '';
  if (st === 0) body = `
    <div class="seg" style="align-self:flex-end;width:200px" role="radiogroup" aria-label="Sprache" translate="no"><button class="${S.lang !== 'en' ? 'on' : ''}" data-lang="de">Deutsch</button><button class="${S.lang === 'en' ? 'on' : ''}" data-lang="en">English</button></div>
    <div style="display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding-top:4px"><span style="color:var(--ember)">${MARK(56)}</span>
      <div><div class="disp" style="font-size:34px;line-height:38px">Willkommen bei Repwerk Fitness</div><p class="muted" style="margin:8px 0 0">Essen fotografieren, Makros sehen, mit einem Plan trainieren, der zu dir passt. Ein paar Fragen, dann ist alles eingerichtet.</p></div></div>
    ${onboardLoginBtn()}
    <label class="field"><span class="lbl">Wie sollen wir dich nennen? (optional)</span><input class="input" id="ob-name" value="${esc(p.name)}" placeholder="Vorname" autocomplete="given-name"></label>
    <div class="field"><span class="lbl">Was ist dein Hauptziel?</span>${chips('goal', Object.entries(GOALS))}</div>`;
  if (st === 1) body = `<h1 class="disp" style="padding-top:12px">Dein Körper</h1><p class="muted" style="margin:-6px 0 0">Daraus berechnen wir deinen Kalorienbedarf.</p>
    <div class="grid2">
      <label class="field"><span class="lbl">Alter</span><span class="unit"><input class="input" id="ob-age" inputmode="numeric" value="${p.age}"><span>Jahre</span></span></label>
      <label class="field"><span class="lbl">Größe</span><span class="unit"><input class="input" id="ob-height" inputmode="numeric" value="${p.height}"><span>cm</span></span></label>
      <label class="field"><span class="lbl">Gewicht</span><span class="unit"><input class="input" id="ob-weight" inputmode="decimal" value="${dec(p.weight)}"><span>kg</span></span></label>
      <label class="field"><span class="lbl">Wunschgewicht</span><span class="unit"><input class="input" id="ob-target" inputmode="decimal" value="${esc(dec(p.targetWeight))}" placeholder="optional"><span>kg</span></span></label>
    </div>
    <div class="field"><span class="lbl">Geschlecht (optional, für die Formel)</span>${chips('sex', [['m','Männlich'],['w','Weiblich'],['','Keine Angabe']])}</div>
    <p class="cap" id="ob-err" style="color:var(--critical);margin:0"></p>`;
  if (st === 2) body = `<h1 class="disp" style="padding-top:12px">Alltag und Training</h1>
    <div class="field"><span class="lbl">Wie aktiv ist dein Alltag (ohne Training)?</span>${chips('activity', ACT)}</div>
    <div class="field"><span class="lbl">Trainings pro Woche</span>${chips('days', [[2,'2×'],[3,'3×'],[4,'4×'],[5,'5×'],[6,'6×']])}</div>
    <div class="field"><span class="lbl">Zeit pro Training</span>${chips('duration', [[30,'30 min'],[45,'45 min'],[60,'60 min'],[75,'75 min'],[90,'90 min']])}</div>
    <div class="field"><span class="lbl">Trainingserfahrung</span>${chips('experience', Object.entries(EXP))}</div>`;
  if (st === 3) body = `<h1 class="disp" style="padding-top:12px">Wo trainierst du?</h1>
    ${chips('location', [['gym','Fitnessstudio'],['home','Zu Hause']])}
    ${p.location === 'home' ? `<div class="field"><span class="lbl">Was hast du zu Hause? (mehrere möglich)</span>${chips('equipment', Object.entries(HOME_EQ), true)}<span class="cap">Ohne Auswahl planen wir nur mit Körpergewicht.</span></div>` : '<p class="muted" style="margin:0">Im Studio planen wir mit Langhantel, Kurzhanteln, Kabelzug und Maschinen.</p>'}`;
  if (st === 4) body = `<h1 class="disp" style="padding-top:12px">Ernährung</h1>
    <div class="field"><span class="lbl">Wie ernährst du dich?</span>${chips('diet', Object.entries(DIETS))}</div>
    <div class="field"><span class="lbl">Unverträglichkeiten oder Allergien</span>${chips('allergies', Object.entries(ALLERGENS), true)}<span class="cap">Die Fotoanalyse warnt dich, wenn etwas davon wahrscheinlich enthalten ist.</span></div>
    <div class="field"><span class="lbl">Mahlzeiten pro Tag</span>${chips('meals', [[2,'2'],[3,'3'],[4,'4'],[5,'5'],[6,'6']])}</div>
    <label class="field"><span class="lbl">Wasserziel pro Tag</span><span class="unit"><input class="input" id="ob-water" inputmode="decimal" value="${esc(dec(p.waterGoal))}" placeholder="automatisch (35 ml pro kg)"><span>l</span></span></label>`;
  if (st === 5) { const a = S.design; body = `<h1 class="disp" style="padding-top:12px">Einstellungen</h1>
    <div class="card"><div class="lbl" style="margin-bottom:8px">Erinnerungen</div>${[['training','Training an Trainingstagen'],['meals','Mahlzeiten eintragen'],['water','Wasser trinken']].map(([k, l]) => `<div class="sel"><div class="grow">${l}</div><button class="toggle ${S.reminders[k] ? 'on' : ''}" data-rem="${k}" role="switch" aria-checked="${!!S.reminders[k]}" aria-label="${l}"></button></div>`).join('')}<div class="cap" style="margin-top:6px">Push-Mitteilungen kommen mit der App, im Prototyp wird nur deine Wahl gespeichert.</div></div>
    <div class="card"><div class="lbl" style="margin-bottom:8px">Darstellung</div>${segm('theme', [['system','System'],['light','Hell'],['dark','Dunkel']], a.theme)}<div class="lbl" style="margin:14px 0 8px">Akzentfarbe</div>${swatches()}</div>`; }
  if (st === 6) {
    const t = calcTargets(p), pl = buildPlan(p);
    body = `<h1 class="disp" style="padding-top:12px">Dein Plan steht${p.name ? ', ' + esc(p.name) : ''}</h1>
    <div class="card row" style="gap:18px">${ring(150, 0, t.kcal)}<div class="grow" style="display:flex;flex-direction:column;gap:6px"><div class="cap">Tagesziel</div><div class="disp" style="font-size:26px;line-height:30px">${fmt(t.kcal)} kcal</div><div class="lbl"><span class="dot p-bg"></span> Protein ${t.p} g</div><div class="lbl"><span class="dot c-bg"></span> Kohlenhydrate ${t.c} g</div><div class="lbl"><span class="dot f-bg"></span> Fett ${t.f} g</div><div class="lbl"><span class="dot" style="background:var(--protein)"></span> Wasser ${fmt1(t.water / 1000)} l</div></div></div>
    <div class="card"><div class="cap">Training · ${p.days}× pro Woche · ${p.duration} min</div><div style="font-weight:700;font-size:17px">${esc(pl.name)}</div>${pl.days.map(d => `<div class="cap" style="margin-top:4px"><b style="color:var(--ink)">${esc(d.name)}:</b> ${d.ex.map(x => esc(EX[x.id].name)).join(', ')}</div>`).join('')}</div>
    <details class="card"><summary class="lbl" style="cursor:pointer">So haben wir das berechnet</summary><div class="muted" style="margin-top:10px;display:flex;flex-direction:column;gap:6px">
      <div>Grundumsatz nach Mifflin-St Jeor: <b>${fmt(t.bmr)} kcal</b>${p.sex ? '' : ' (Mittelwert, weil kein Geschlecht angegeben)'}.</div>
      <div>× Aktivitätsfaktor ${dec(p.activity)} = Gesamtbedarf <b>${fmt(t.tdee)} kcal</b>.</div>
      <div>${t.adj < 0 ? `Für Fettabbau ${fmt(t.adj)} kcal (höchstens 20 % unter Bedarf).` : t.adj > 0 ? `Für Muskelaufbau +${fmt(t.adj)} kcal (moderater Überschuss).` : 'Ziel ist der Gesamtbedarf.'}</div>
      <div>Protein ${dec(t.pPerKg)} g pro kg, Fett mindestens 25 % der Kalorien, der Rest Kohlenhydrate.</div>
      <div>Trainingsplan: ${p.duration} min ergeben ${pl.days[0].ex.length} Übungen pro Einheit, ${EXP[p.experience].split(' (')[0].toLowerCase()} trainiert ${pl.days[0].ex[0] ? pl.days[0].ex[0].sets : 3} Sätze.</div>
      <div>Das ist eine Schätzung. Passe die Ziele nach 2 bis 3 Wochen an, wenn sich dein Gewicht anders entwickelt als geplant.</div></div></details>`;
  }
  $('#app').innerHTML = `<div class="screen" style="padding-bottom:calc(24px + env(safe-area-inset-bottom))">
    <div class="row" style="justify-content:space-between">${st > 0 ? `<button class="iconbtn" id="ob-back" aria-label="Zurück">${ic('back')}</button>` : '<span></span>'}<div class="track" style="width:120px;height:6px;background:var(--surface-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${(st + 1) / OB_STEPS * 100}%;background:var(--ember);border-radius:99px"></div></div></div>
    ${body}<button class="btn btn-p btn-block" id="ob-next" style="margin-top:8px">${st === OB_STEPS - 1 ? 'Los geht’s' : 'Weiter'}</button></div>`;
  $('#tabbar').innerHTML = '';
  $('#app').onclick = e => {
    const c = e.target.closest('[data-ob]');
    if (c) { readOb(); const k = c.dataset.ob, v = ['days','duration','meals'].includes(k) ? Number(c.dataset.v) : c.dataset.v;
      if (c.dataset.multi) { const arr = p[k] || (p[k] = []); const i = arr.indexOf(v); i >= 0 ? arr.splice(i, 1) : arr.push(v); } else p[k] = v; renderOnboarding(); return; }
    const lg = e.target.closest('[data-lang]'); if (lg) { readOb(); setLang(lg.dataset.lang); renderOnboarding(); return; }
    const rem = e.target.closest('[data-rem]'); if (rem) { S.reminders[rem.dataset.rem] = !S.reminders[rem.dataset.rem]; renderOnboarding(); return; }
    const sg = e.target.closest('[data-seg]'); if (sg) { S.design[sg.dataset.seg] = sg.dataset.v; applyDesign(); renderOnboarding(); return; }
    const sw = e.target.closest('[data-accent]'); if (sw) { S.design.accent = sw.dataset.accent; applyDesign(); renderOnboarding(); return; }
    if (e.target.closest('#ob-back')) { readOb(); ob.step--; renderOnboarding(); return; }
    if (e.target.closest('#ob-next')) {
      readOb();
      if (st === 1) { const bad = !(p.age >= 14 && p.age <= 99) ? 'Bitte ein Alter zwischen 14 und 99 eingeben.' : !(p.height >= 120 && p.height <= 230) ? 'Bitte eine Größe zwischen 120 und 230 cm eingeben.' : !(p.weight >= 35 && p.weight <= 300) ? 'Bitte ein Gewicht zwischen 35 und 300 kg eingeben.' : ''; if (bad) { $('#ob-err').textContent = bad; return; } }
      if (st < OB_STEPS - 1) { ob.step++; renderOnboarding(); window.scrollTo(0, 0); return; }
      if (S.profile && S.profile.goal !== p.goal) sm().adj = 0;
      if (S.profile && S.smart && S.smart.wd && S.smart.wd.length !== Number(p.days)) S.smart.wd = null;
      S.profile = Object.assign({}, p); S.targets = calcTargets(p);
      if (!S.social.name && p.name) S.social.name = p.name;
      if (!S.weights.length || S.weights[S.weights.length - 1].kg !== p.weight) S.weights.push({ d: dayKey(), kg: p.weight });
      ob = null; save(); view = 'home'; render();
    }
  };
}
function readOb() {
  const p = ob.p, v = id => { const el = document.getElementById(id); return el ? el.value : null; };
  if (v('ob-name') !== null) p.name = v('ob-name').trim().slice(0, 30);
  if (v('ob-age') !== null) p.age = Math.round(num(v('ob-age')));
  if (v('ob-height') !== null) p.height = Math.round(num(v('ob-height')));
  if (v('ob-weight') !== null) p.weight = r1(num(v('ob-weight')));
  if (v('ob-target') !== null) p.targetWeight = v('ob-target') ? r1(num(v('ob-target'))) : '';
  if (v('ob-water') !== null) p.waterGoal = v('ob-water') ? r1(num(v('ob-water'))) : '';
}
const segm = (key, opts, cur) => `<div class="seg" role="radiogroup">${opts.map(([v, l]) => `<button class="${cur === v ? 'on' : ''}" data-seg="${key}" data-v="${v}" role="radio" aria-checked="${cur === v}">${l}</button>`).join('')}</div>`;
const swatches = () => `<div class="swatches">${Object.entries(ACCENTS).map(([k, a]) => `<button class="sw ${S.design.accent === k ? 'on' : ''}" style="background:${a.base}" data-accent="${k}" aria-label="Akzentfarbe ${a.name}" aria-pressed="${S.design.accent === k}"></button>`).join('')}</div>`;

/* ---------- Screens ---------- */
function render() {
  if (!S) return;
  syncCommunity();
  if (!S.profile) { renderOnboarding(); return; }
  const fn = { nutrition: vNutrition, mealplan: vMealPlan, calendar: vCalendar, stats: vStats, home: vHome, food: vFood, train: vTrain, community: vCommunity, profile: vProfile, settings: vSettings, workout: vWorkout, library: vLibrary, routine: vRoutine }[view] || vHome;
  $('#app').innerHTML = `<div class="screen">${fn()}</div>`;
  $('#app').onclick = onClick; $('#app').onchange = onChange; $('#app').oninput = onInput;
  renderTabs();
}
function renderTabs() {
  if (view === 'workout' || view === 'routine') { $('#tabbar').innerHTML = ''; document.body.classList.remove('has-active'); return; }
  const on = id => view === id || (id === 'train' && view === 'library') || (id === 'community' && false);
  const t = (id, icon, label) => `<button class="tab ${on(id) ? 'on' : ''}" data-nav="${id}">${ic(icon)}<span>${label}</span></button>`;
  const bar = S.active ? `<button class="activebar" data-act="resume"><span class="dotlive ${S.active.pausedAt ? 'paused' : ''}"></span><span class="grow" style="min-width:0;text-align:left"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(S.active.name)}</b><span class="cap"><span>${S.active.pausedAt ? 'Pausiert' : 'Training läuft'}</span> · <span class="num" id="ab-dur">${clock(elapsed(S.active))}</span> · <span>${doneCount(S.active)} Sätze</span></span></span><span class="btn btn-p btn-sm" style="pointer-events:none">Fortsetzen</span></button>` : '';
  document.body.classList.toggle('has-active', !!bar);
  $('#tabbar').innerHTML = `<div class="tabbar">${bar}<nav aria-label="Hauptnavigation">${t('home','home','Heute')}${t('food','fork','Essen')}<button class="plus" data-act="plus" aria-label="Hinzufügen">${ic('plus', 26)}</button>${t('train','db','Training')}${t('community','users','Community')}</nav></div>`;
  $('#tabbar').onclick = onClick;
}
function nextRoutine() { return planRoutines()[nextPlanIndex()]; }
function vFood() {
  const d = foodDay(), t = dayTotals(d), g = dayTargets(foodKey || dayKey()), used = today().photos || 0, k = foodKey || dayKey(), isToday = k === dayKey();
  const dd = new Date(k + 'T12:00:00');
  return `${header('Essen', isToday ? 'Heute' : dd.toLocaleDateString(LOC(), { weekday: 'long', day: 'numeric', month: 'long' }))}
    <div class="row" style="gap:8px"><button class="iconbtn" data-foodnav="-1" aria-label="Vorheriger Tag">${ic('back')}</button><button class="btn btn-s grow" data-nav="calendar" style="height:44px">${ic('cal', 18)} ${dd.toLocaleDateString(LOC(), { weekday: 'short', day: 'numeric', month: 'short' })}</button><button class="iconbtn" data-foodnav="1" aria-label="Nächster Tag" ${isToday ? 'disabled style="opacity:.35"' : ''}>${ic('next')}</button>${isToday ? '' : '<button class="btn btn-g" data-foodnav="0">Heute</button>'}</div>
    <div class="card"><div class="row" style="justify-content:space-between;gap:8px;margin-bottom:6px;flex-wrap:wrap"><span class="cap">Verbleibende Kalorien</span>${dayTypeChip(g)}</div>${eqRow(g.kcal, t.kcal)}
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">${macroRow('Protein','p-bg',t.p,g.p)}${macroRow('Kohlenhydrate','c-bg',t.c,g.c)}${macroRow('Fett','f-bg',t.f,g.f)}</div>
    <div class="row" style="margin-top:12px;gap:8px"><span style="color:var(--protein)">${ic('drop', 18)}</span><span class="grow cap">Wasser ${fmt1((d.water || 0) / 1000)} von ${fmt1(g.water / 1000)} l</span><button class="btn btn-g" data-act="water">+ 250 ml</button></div>
    <button class="btn btn-s btn-block" data-act="daynut" style="margin-top:10px;height:42px">${ic('stats', 18)} Nährwerte</button></div>
    <div class="grid3"><button class="btn btn-p" data-act="photo">${ic('cam', 20)} Scannen</button><button class="btn btn-p" data-act="barcode">${ic('barcode', 20)} Barcode</button><button class="btn btn-s" data-act="search">${ic('search', 20)} Suchen</button></div>
    <div class="row" style="justify-content:space-between"><button class="btn btn-g" data-act="textfood">${ic('text', 18)} Beschreiben</button><span class="cap">KI-Scans heute: ${used} von ${lim().photo}</span></div>
    <button class="card row" data-act="mealplan" style="text-align:left"><div class="thumb ember">${ic('book')}</div><div class="grow"><div class="row" style="gap:8px"><span style="font-weight:700">KI-Ernährungsplan</span>${S.pro ? '' : '<span class="tag ember">Pro</span>'}</div><div class="cap">${S.mealPlan && S.mealPlan.v === 2 ? (() => { const td = S.mealPlan.days.find(x => x.key === dayKey()); return td ? `Heute: ${td.meals.map(m => (mpRecipe(m.recipe) || {}).name).filter(Boolean).slice(0, 2).join(', ')}${td.meals.length > 2 ? ' …' : ''}` : `Plan vom ${new Date(S.mealPlan.at).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })} ist abgelaufen. Erstelle einen neuen.`; })() : 'Wochenplan mit Rezepten, Meal Prep und Einkaufsliste für einen Einkauf'}</div></div>${ic('next', 18)}</button>
    ${SLOTS.map(([k, label], i) => { const items = d.meals[k] || []; const kc = items.reduce((a, e) => a + e.kcal, 0);
      return `<div class="card"><div class="row" style="justify-content:space-between"><h2 class="disp" style="font-size:18px;line-height:24px">${label}</h2><div class="row" style="gap:8px"><span class="num muted">${fmt(kc)} kcal</span><button class="iconbtn" style="width:36px;height:36px;background:var(--ember);color:var(--on-ember)" data-addslot="${k}" aria-label="${label} eintragen">${ic('plus', 20)}</button></div></div>
      ${items.length ? `<ul class="list" style="margin-top:4px">${items.map(e => `<li><div class="grow" data-entry="${k}:${e.id}" style="cursor:pointer"><div style="font-weight:600">${esc(e.name)}</div><div class="cap">${fmt(e.grams)} g · ${fmt(e.p)} P · ${fmt(e.c)} K · ${fmt(e.f)} F${e.src === 'foto' ? ' · KI-Scan' : e.src === 'text' ? ' · KI-Text' : e.src === 'plan' ? ' · Plan' : e.src === 'barcode' ? ' · Barcode' : ''}</div></div><span class="num" style="font-weight:700">${fmt(e.kcal)}</span><button class="iconbtn" style="width:36px;height:36px" data-del="${k}:${e.id}" aria-label="${esc(e.name)} löschen">${ic('trash', 18)}</button></li>`).join('')}</ul>` : `<div class="cap" style="margin-top:6px">Noch nichts eingetragen.</div>`}</div>${i === 1 ? adBanner() : ''}`; }).join('')}`;
}

/* ---------- Training (Hevy-style) ---------- */
function routineCard(r, isNext) {
  const names = r.exercises.map(x => exOf(x.exId).name);
  return `<div class="card" style="${isNext ? 'border-color:var(--ember)' : ''}"><div class="row" style="align-items:flex-start"><div class="grow"><div class="row" style="gap:8px"><span style="font-weight:700;font-size:17px">${esc(r.name)}</span>${isNext ? '<span class="tag ember">Als Nächstes</span>' : ''}</div><div class="cap" style="margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${names.length ? names.map(esc).join(', ') : 'Noch keine Übungen'}</div></div><button class="iconbtn" style="width:38px;height:38px;background:transparent" data-rmenu="${r.id}" aria-label="Optionen für ${esc(r.name)}">${ic('dots', 20)}</button></div>
    <button class="btn btn-p btn-block" style="margin-top:12px;height:44px" data-start="${r.id}" ${r.exercises.length ? '' : 'disabled'}>Routine starten</button></div>`;
}
function header(title, sub) {
  return `<div class="head"><div style="min-width:0"><div class="cap">${sub || ''}</div><h1 class="disp">${title}</h1></div><div class="row" style="gap:8px"><button class="iconbtn" data-act="coach" aria-label="AI Coach öffnen">${ic('chat')}</button><button class="iconbtn" data-nav="profile" aria-label="Profil" style="padding:0;overflow:hidden">${S.social.avatar ? avatar(S.social.avatar, '', 42) : ic('user')}</button></div></div>`;
}
const secHead = (title, extra) => `<div class="sec"><h2 class="disp">${title}</h2>${extra || ''}</div>`;
const infoBtn = k => `<button class="infob" data-info="${k}" aria-label="Was bedeutet das?">${ic('info', 16)}</button>`;
const INFO = {
  ring: ['Kalorienring', 'Der Ring zeigt, wie viel von deinem Tagesziel du schon gegessen hast. Die Zahl in der Mitte sind die Kalorien, die heute noch übrig sind. In den Einstellungen kannst du auf „Gegessen“ umstellen.'],
  macros: ['Makronährstoffe', 'Protein baut Muskeln auf und hält satt. Kohlenhydrate sind die Hauptenergie fürs Training. Fett braucht der Körper für Hormone und Vitamine. Deine Ziele berechnen wir aus Gewicht, Alltag und Ziel.'],
  streak: ['Streaks', 'Die Tracking-Streak zählt die Tage am Stück, an denen du Essen, Wasser oder ein Training eingetragen hast. Die Trainings-Streak zählt die Wochen am Stück mit mindestens einem Training. Die aktuelle Woche zählt mit, sobald du darin trainiert hast.'],
  volume: ['Volumen', 'Volumen ist das bewegte Gewicht: Gewicht mal Wiederholungen, über alle Arbeitssätze addiert. Aufwärmsätze zählen nicht mit. Mehr Volumen über die Wochen heißt meist: Du wirst stärker.'],
  onerm: ['Geschätztes Maximum (1RM)', 'So viel Gewicht könntest du ungefähr für genau eine Wiederholung bewegen. Wir schätzen es aus deinen Sätzen mit der Epley-Formel. Du musst dafür nie wirklich ein Maximum testen.'],
  sets: ['Satztypen', 'Normal ist ein gewöhnlicher Arbeitssatz. W steht für Aufwärmen und zählt nicht zum Volumen. D ist ein Dropsatz: direkt danach mit weniger Gewicht weiter. F heißt bis zum Versagen, also bis keine saubere Wiederholung mehr geht.']
};
function infoSheet(k) { const [t, b] = INFO[k] || ['', '']; openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${t}</h2><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div><p style="margin:0;font-size:16px;line-height:24px">${b}</p><button class="btn btn-s btn-block" data-close-sheet>Verstanden</button>`); }
function startSteps() {
  if (S.hideStart) return '';
  const ever = Object.values(S.days).some(d => SLOTS.some(([s]) => (d.meals[s] || []).length));
  const steps = [['Erste Mahlzeit eintragen', 'Foto machen oder Lebensmittel suchen', ever, 'photo'], ['Erstes Training starten', 'Dein Plan ist schon fertig', S.workouts.length > 0, 'start'], ['Profil für Freunde anlegen', 'Name, Bild und Beschreibung', !!S.social.name && !!S.social.bio, 'editprofile']];
  if (steps.every(s => s[2])) return '';
  const done = steps.filter(s => s[2]).length;
  return `<div class="card startcard"><div class="row" style="justify-content:space-between"><div><h2 class="disp" style="font-size:19px;line-height:24px">So startest du</h2><div class="cap">${done} von 3 erledigt</div></div><button class="btn btn-g" data-act="hidestart">Ausblenden</button></div>
    <ol class="steplist">${steps.map(([t, s, ok, act], i) => `<li class="${ok ? 'ok' : ''}"><span class="stepn">${ok ? ic('check', 16) : i + 1}</span><span class="grow"><b>${t}</b><span class="cap" style="display:block">${s}</span></span>${ok ? '' : `<button class="btn btn-p btn-sm" data-act="${act === 'start' ? 'startnext' : act}">Los</button>`}</li>`).join('')}</ol></div>`;
}
function vHome() {
  const d = today(), t = dayTotals(d), g = dayTargets(), nr = nextRoutine(), wk = S.workouts.filter(w => weekKey(new Date(w.start)) === weekKey()).length;
  const dateStr = new Date().toLocaleDateString(LOC(), { weekday: 'long', day: 'numeric', month: 'long' });
  const pLeft = r0(g.p - t.p), kLeft = r0(g.kcal - t.kcal), water = d.water || 0;
  let rec;
  if (!t.kcal) rec = 'Noch nichts eingetragen. Fotografiere deine erste Mahlzeit, das dauert 20 Sekunden.';
  else if (pLeft > 25 && kLeft > 150) rec = `Noch ${pLeft} g Protein bis zum Ziel. ${S.profile.diet === 'vegan' ? 'Tofu, Linsen oder ein veganer Proteinshake' : pLeft > 45 ? 'Ein Hähnchen- oder Tofu-Gericht' : '250 g Skyr oder Magerquark'} würde ${pLeft > 45 ? 'einen großen Teil' : 'fast alles'} abdecken.`;
  else if (kLeft < -150) rec = `Heute ${fmt(-kLeft)} kcal über dem Ziel. Kein Drama: Ein Tag zählt wenig, der Wochenschnitt zählt.`;
  else if (pLeft <= 0) rec = 'Proteinziel erreicht. Stark. Der Rest des Tages darf entspannt sein.';
  else rec = `Noch ${fmt(kLeft)} kcal und ${pLeft} g Protein. Du liegst gut im Plan.`;
  const meals = SLOTS.filter(([s]) => (d.meals[s] || []).length).length, trainedToday = trainedOn(dayKey()), isTrainDay = wk < S.profile.days && dayType() !== 'rest';
  const row = (icon, color, title, sub, action) => `<li class="dayrow"><span class="dayic" style="--c:${color}">${ic(icon, 20)}</span><span class="grow" style="min-width:0"><b>${title}</b><span class="cap" style="display:block">${sub}</span></span>${action}</li>`;
  const mb = (label, cls, v, goal) => `<div class="mcol"><span class="lbl">${label}</span><div class="track"><div class="fill ${cls}" style="width:${Math.min(100, goal ? v / goal * 100 : 0)}%"></div></div><span class="num cap"><b style="color:var(--ink);font-size:15px">${fmt(v)}</b> / ${fmt(goal)} g</span></div>`;
  return `${header(S.profile.name ? 'Hallo ' + esc(S.profile.name) : 'Heute', dateStr)}
    <div class="card hero"><div style="display:flex;justify-content:center">${ring(172, t.kcal, g.kcal)}</div><div class="mcols">${mb('Protein', 'p-bg', t.p, g.p)}${mb('Kohlenhydrate', 'c-bg', t.c, g.c)}${mb('Fett', 'f-bg', t.f, g.f)}</div>
      ${dayTypeChip(g) ? `<div style="display:flex;justify-content:center">${dayTypeChip(g)}</div>` : ''}<div class="row herofoot"><span class="grow cap">Tagesziel ${fmt(g.kcal)} kcal</span>${infoBtn('ring')}${infoBtn('macros').replace('aria-label="Was bedeutet das?"', 'aria-label="Was sind Makros?"')}</div></div>
    ${installCard()}
    ${accountHomeCard()}
    ${startSteps()}
    ${checkinDue() ? coachCard() : ''}
    ${secHead('Dein Tag')}
    <ul class="card daylist">
      ${S.active ? row('play', 'var(--ember)', esc(S.active.name) + ' läuft', `${dur(elapsed(S.active))} · ${doneCount(S.active)} Sätze erledigt`, `<button class="btn btn-p btn-sm" data-act="resume">Fortsetzen</button>`)
        : trainedToday ? row('check', 'var(--good)', 'Training erledigt', `${wk} von ${S.profile.days} Trainings diese Woche`, '')
        : row('db', 'var(--ember)', isTrainDay ? esc(nr.name) : 'Ruhetag möglich', isTrainDay ? `${nr.exercises.length} Übungen · ${wk} von ${S.profile.days} Trainings diese Woche` : `Wochenziel erreicht: ${wk} von ${S.profile.days}`, `<button class="btn ${isTrainDay ? 'btn-p' : 'btn-s'} btn-sm" data-start="${nr.id}">Starten</button>`)}
      ${row('fork', 'var(--carbs)', meals ? `${meals} von 4 Mahlzeiten eingetragen` : 'Noch keine Mahlzeit', `${fmt(t.kcal)} von ${fmt(g.kcal)} kcal gegessen`, `<button class="btn btn-s btn-sm" data-act="photo">${ic('cam', 18)} Scannen</button>`)}
      ${row('drop', 'var(--protein)', `${fmt1(water / 1000)} von ${fmt1(g.water / 1000)} l Wasser`, `<span class="track" style="display:block;height:6px;margin-top:6px;background:var(--surface-2);border-radius:99px;overflow:hidden"><span style="display:block;height:100%;width:${Math.min(100, water / g.water * 100)}%;background:var(--protein)"></span></span>`, `<button class="btn btn-s btn-sm" data-act="water">+ 250 ml</button>`)}
    </ul>
    <div class="tip"><span style="color:var(--ember-ink)">${ic('spark', 20)}</span><div><b>Tipp für dich</b><div>${rec}</div></div></div>
    ${checkinDue() ? '' : coachCard()}
    ${streakCard()}
    <div class="quick">${[['cam', 'Scannen', 'data-act="photo"'], ['search', 'Suchen', 'data-act="search"'], ['cal', 'Kalender', 'data-nav="calendar"'], ['stats', 'Statistik', 'data-nav="stats"']].map(([i, l, a]) => `<button ${a}><span>${ic(i, 22)}</span>${l}</button>`).join('')}</div>
    ${adBanner()}`;
}
function routineRow(r) {
  const n = r.exercises.length, sets = r.exercises.reduce((a, x) => a + x.sets.length, 0);
  return `<li class="rrow"><button class="grow rmain" data-rpreview="${r.id}"><b>${esc(r.name)}</b><span class="cap">${n} Übungen · ${sets} Sätze</span></button><button class="iconbtn" style="width:40px;height:40px;background:transparent" data-rmenu="${r.id}" aria-label="Optionen für ${esc(r.name)}">${ic('dots', 20)}</button><button class="iconbtn playb" data-start="${r.id}" aria-label="${esc(r.name)} starten" ${n ? '' : 'disabled'}>${ic('play', 18)}</button></li>`;
}
function vTrain() {
  const p = plan(), pr = planRoutines(), ni = nextPlanIndex(), wk = S.workouts.filter(w => weekKey(new Date(w.start)) === weekKey()).length, nr = pr[ni];
  const recent = S.workouts.slice(-5).reverse();
  const dots = Array.from({ length: S.profile.days }, (_, i) => `<i class="${i < wk ? 'on' : ''}"></i>`).join('');
  return `${header('Training', esc(p.name))}
    ${S.active ? `<button class="card nexthero" data-act="resume" style="text-align:left"><div class="cap" style="color:var(--on-ember);opacity:.8">Läuft seit ${dur(elapsed(S.active))}</div><div class="disp" style="font-size:24px;line-height:28px">${esc(S.active.name)}</div><span class="btn btn-block" style="background:var(--on-ember);color:var(--ember);pointer-events:none">${ic('play', 18)} Fortsetzen</span></button>` :
    `<div class="card nexthero"><div class="row" style="justify-content:space-between"><span class="cap" style="color:var(--on-ember);opacity:.85">Nächstes Training</span><span class="weekdots" aria-label="${wk} von ${S.profile.days} Trainings diese Woche">${dots}</span></div>
      <div class="disp" style="font-size:26px;line-height:30px">${esc(nr.name)}</div>
      <div style="font-size:14px;line-height:20px;opacity:.9">${nr.exercises.map(x => esc(exOf(x.exId).name)).join(', ')}</div>
      <button class="btn btn-block" style="background:var(--on-ember);color:var(--ember)" data-start="${nr.id}">${ic('play', 18)} Training starten</button></div>`}
    <div class="quick">${[['plus', 'Leeres Training', 'data-act="empty"'], ['search', 'Übungen', 'data-nav="library"'], ['stats', 'Statistik', 'data-nav="stats"'], ['cal', 'Kalender', 'data-nav="calendar"']].map(([i, l, a]) => `<button ${a}><span>${ic(i, 22)}</span>${l}</button>`).join('')}</div>
    ${secHead('Dein Plan', `<span class="cap">${wk} von ${S.profile.days} diese Woche</span>`)}
    <ul class="card rlist">${pr.map(routineRow).join('')}</ul>
    ${secHead('Meine Routinen', `<button class="btn btn-g" data-act="newroutine">${ic('plus', 18)} Neu</button>`)}
    ${S.routines.length ? `<ul class="card rlist">${S.routines.map(routineRow).join('')}</ul>` : `<div class="card empty" style="padding:18px">Eigene Routinen wie bei Hevy: Übungen, Sätze und Pausen als Vorlage. Leg eine neue an oder speichere ein Training als Routine.</div>`}
    ${adBanner()}
    ${secHead('Verlauf')}
    <div class="card" style="padding-top:4px;padding-bottom:4px">${recent.length ? `<ul class="list">${recent.map(w => `<li data-wdetail="${w.id}" style="cursor:pointer"><div class="grow"><div style="font-weight:600">${esc(w.name)}</div><div class="cap">${new Date(w.start).toLocaleDateString(LOC(), { weekday: 'short', day: 'numeric', month: 'short' })} · ${dur(wDur(w))} · ${doneCount(w)} Sätze${w.gym ? ' · ' + esc(w.gym) : ''}</div></div><span class="num" style="font-weight:700">${fmt(volume(w))} kg</span></li>`).join('')}</ul>` : `<div class="empty">Noch kein Training. Starte oben dein erstes.</div>`}</div>`;
}
function routinePreview(id) {
  const r = id.startsWith('plan-') ? planRoutines().find(x => x.id === id) : S.routines.find(x => x.id === id); if (!r) return;
  openSheet(`<div class="row" style="justify-content:space-between"><div><div class="cap">${r.plan ? 'Dein Repwerk-Plan' : 'Meine Routine'}</div><h2 class="disp">${esc(r.name)}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <ul class="list">${r.exercises.map(x => { const e = exOf(x.exId); return `<li><span class="thumb" style="padding:2px">${exIcon(e)}</span><div class="grow"><div style="font-weight:600">${esc(e.name)}</div><div class="cap">${x.sets.length} Sätze${x.target ? ' · ' + esc(x.target) + ' Wdh.' : ''} · Pause ${restLabel(x.rest)}</div></div></li>`; }).join('')}</ul>
    <button class="btn btn-p btn-block" data-pvstart ${r.exercises.length ? '' : 'disabled'}>${ic('play', 18)} Training starten</button>`, sh => sh.addEventListener('click', ev => { if (ev.target.closest('[data-pvstart]')) { closeSheet(); startWorkout(r.id); } }));
}

let libFilter = { m: 'Alle', e: 'Alle', q: '' };
function exFilterList(f) { return allEx().filter(e => (f.m === 'Alle' || e.muscle === f.m) && (f.e === 'Alle' || e.equip === f.e) && (!f.q || e.name.toLowerCase().includes(f.q.toLowerCase()))); }
const exIcon = e => e.custom ? (e.img ? `<img src="${e.img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">` : ic('edit', 18)) : demoThumb(e.id);
function exThumb(e) { return e.custom ? (e.img ? `<div class="thumb" style="padding:0;overflow:hidden"><img src="${e.img}" alt="" style="width:100%;height:100%;object-fit:cover"></div>` : `<div class="thumb">${ic('edit', 18)}</div>`) : `<div class="thumb" style="padding:2px">${demoThumb(e.id)}</div>`; }
function vLibrary() {
  const list = exFilterList(libFilter);
  return `<div class="row"><button class="iconbtn" data-nav="train" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Übungen</h1><button class="btn btn-s btn-sm" data-act="newex">${ic('plus', 18)} Eigene</button></div>
    <input class="input" id="lib-q" placeholder="Übung suchen" value="${esc(libFilter.q)}" aria-label="Übung suchen">
    <div class="chips scroll">${['Alle', ...MUSCLES].map(m => `<button class="chip ${libFilter.m === m ? 'on' : ''}" data-lm="${m}">${m}</button>`).join('')}</div>
    <div class="chips scroll">${['Alle', ...EQUIP].map(m => `<button class="chip ${libFilter.e === m ? 'on' : ''}" data-le="${m}">${m}</button>`).join('')}</div>
    <div class="cap">${list.length} Übungen</div>
    <div class="card" style="padding-top:4px;padding-bottom:4px">${list.length ? `<ul class="list">${list.map(e => `<li data-ex="${e.id}" style="cursor:pointer">${exThumb(e)}<div class="grow"><div style="font-weight:600">${esc(e.name)}</div><div class="cap">${esc(e.muscle)} · ${esc(e.equip)}${e.custom ? ' · eigene Übung' : ' · ' + esc(e.level)}</div></div></li>`).join('')}</ul>` : '<div class="empty">Keine Übung passt. Leg sie als eigene Übung an.</div>'}</div>`;
}
function showExercise(id) {
  const e = exOf(id);
  const sh = openSheet(`<div class="row" style="justify-content:space-between"><div style="min-width:0"><div class="cap">${esc(e.muscle)}${e.secondary ? ' · ' + esc(e.secondary) : ''}</div><h2 class="disp">${esc(e.name)}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    ${e.custom ? (e.img ? `<img class="photo" src="${e.img}" alt="Bild: ${esc(e.name)}" style="max-height:280px;object-fit:contain;background:var(--surface)">` : `<div class="demo" style="padding:20px"><div class="thumb" style="width:64px;height:64px">${ic('img', 28)}</div><div class="cap" style="text-align:center">Eigene Übung ohne Bild. Füge ein Foto hinzu, zum Beispiel von der Maschine in deinem Studio.</div></div>`) :
    `<div class="demo"><div class="stage" role="img" aria-label="Animation: ${esc(e.name)}"></div><div class="row" style="gap:10px"><span class="cap repcount"></span><button class="pill" data-demo-toggle>Pause</button></div></div>
    <p class="cap" style="margin:-6px 0 0">Die Animation läuft direkt in der App, ohne YouTube oder andere Anbieter. Der orange markierte Bereich ist der Zielmuskel.</p>`}
    <div class="chips"><span class="tag">${esc(e.equip)}</span>${e.level ? `<span class="tag">${esc(e.level)}</span>` : ''}${e.home ? '<span class="tag">Zu Hause möglich</span>' : ''}</div>
    ${e.steps && e.steps.length ? `<div class="card"><div class="lbl" style="margin-bottom:6px">Ausführung</div><ol class="steps">${e.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>` : ''}
    ${e.mistakes && e.mistakes.length ? `<div class="card"><div class="lbl" style="margin-bottom:6px">Typische Fehler</div><ul class="steps">${e.mistakes.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>` : ''}
    ${e.safety ? `<div class="banner">${ic('spark', 18)}<div><b>Sicherheit:</b> ${esc(e.safety)}</div></div>` : ''}
    ${exRecords(e.id).sessions ? `<button class="btn btn-s btn-block" data-exstats2="${e.id}">${ic('trophy', 18)} Deine Rekorde und Verlauf</button>` : ''}
    ${e.custom ? `<div class="grid2"><button class="btn btn-s" data-editex>${ic('edit', 18)} Bearbeiten</button><button class="btn btn-d" data-delex>${ic('trash', 18)} Löschen</button></div>` : ''}`);
  if (!e.custom) mountDemo(sh.querySelector('.demo'), e.id);
  sh.addEventListener('click', async ev => { if (ev.target.closest('[data-editex]')) { customExSheet(() => showExercise(e.id), e); return; } const xs = ev.target.closest('[data-exstats2]'); if (xs) { exStatsSheet(xs.dataset.exstats2); return; } if (ev.target.closest('[data-delex]') && await confirmBox('Übung löschen?', 'Die Übung verschwindet aus der Bibliothek. Vergangene Trainings bleiben erhalten.', 'Löschen', true)) { S.customEx = S.customEx.filter(x => x.id !== e.id); save(); closeSheet(); render(); } });
}
function customExSheet(onDone, edit) {
  const d = edit ? { name: edit.name, muscle: edit.muscle, equip: edit.equip, steps: (edit.steps || []).join('\n'), img: edit.img || '' } : { name: '', muscle: 'Brust', equip: 'Maschine', steps: '', img: '' };
  const draw = sh => { sh.innerHTML = `<div class="grab"></div><h2 class="disp">${edit ? 'Übung bearbeiten' : 'Eigene Übung'}</h2>
    <div class="field"><span class="lbl">Bild (optional)</span>${d.img ? `<img class="photo" src="${d.img}" alt="" style="max-height:200px;object-fit:contain;background:var(--surface)"><div class="grid2"><label class="btn btn-s">${ic('img', 18)} Ändern<input type="file" accept="image/*" class="hidden" data-cximg></label><button class="btn btn-g" data-cxnoimg>Entfernen</button></div>` : `<div class="grid2"><label class="btn btn-s">${ic('cam', 18)} Foto aufnehmen<input type="file" accept="image/*" capture="environment" class="hidden" data-cximg></label><label class="btn btn-s">${ic('img', 18)} Aus Galerie<input type="file" accept="image/*" class="hidden" data-cximg></label></div>`}<span class="cap">Zum Beispiel ein Foto der Maschine oder der Einstellung, die du nutzt.</span></div>
    <label class="field"><span class="lbl">Name</span><input class="input" id="cx-name" value="${esc(d.name)}" placeholder="z. B. Beinpresse 45° (Studio XY)"></label>
    <div class="field"><span class="lbl">Muskelgruppe</span><div class="chips">${MUSCLES.map(m => `<button class="chip ${d.muscle === m ? 'on' : ''}" data-cm="${m}">${m}</button>`).join('')}</div></div>
    <div class="field"><span class="lbl">Gerät</span><div class="chips">${EQUIP.map(m => `<button class="chip ${d.equip === m ? 'on' : ''}" data-ce="${m}">${m}</button>`).join('')}</div></div>
    <label class="field"><span class="lbl">Ausführung (optional, eine Zeile pro Schritt)</span><textarea class="input" id="cx-steps">${esc(d.steps)}</textarea></label>
    <p class="cap" id="cx-err" style="color:var(--critical);margin:0"></p>
    <div class="grid2"><button class="btn btn-s" data-close-sheet>Abbrechen</button><button class="btn btn-p" data-cx-save>Speichern</button></div>`; };
  openSheet('', sh => {
    draw(sh);
    const read = () => { d.name = sh.querySelector('#cx-name').value.trim(); d.steps = sh.querySelector('#cx-steps').value; };
    sh.addEventListener('change', async ev => { if (ev.target.matches('[data-cximg]') && ev.target.files[0]) { read(); try { d.img = await compressImage(ev.target.files[0], 360, 0.68); } catch (e) { toast('Dieses Bild konnte nicht geladen werden'); } draw(sh); } });
    sh.addEventListener('click', ev => {
      const m = ev.target.closest('[data-cm]'), q = ev.target.closest('[data-ce]');
      if (m) { read(); d.muscle = m.dataset.cm; draw(sh); return; }
      if (q) { read(); d.equip = q.dataset.ce; draw(sh); return; }
      if (ev.target.closest('[data-cxnoimg]')) { read(); d.img = ''; draw(sh); return; }
      if (!ev.target.closest('[data-cx-save]')) return;
      read(); if (d.name.length < 2) { sh.querySelector('#cx-err').textContent = 'Bitte gib der Übung einen Namen.'; return; }
      const imgBytes = (S.customEx || []).filter(x => !edit || x.id !== edit.id).reduce((n, x) => n + (x.img ? x.img.length : 0), 0) + (d.img ? d.img.length : 0);
      if (imgBytes > 150000) { sh.querySelector('#cx-err').textContent = 'Der Speicher für Übungsbilder ist im Prototyp voll. Entferne ein Bild bei einer anderen Übung. In der App gibt es diese Grenze nicht.'; return; }
      const steps = d.steps.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 8);
      if (edit) { Object.assign(edit, { name: d.name.slice(0, 50), muscle: d.muscle, equip: d.equip, steps, img: d.img }); save(); closeSheet(); toast('Übung gespeichert'); if (onDone) onDone(edit.id); else render(); return; }
      const ex = { id: 'c-' + uid(), name: d.name.slice(0, 50), muscle: d.muscle, secondary: '', equip: d.equip, level: '', home: false, steps, mistakes: [], safety: '', alts: [], custom: true, img: d.img };
      S.customEx.push(ex); save(); closeSheet(); toast('Übung angelegt'); if (onDone) onDone(ex.id); else render();
    });
  });
}
function pickExercises(onPick, single) {
  const f = { m: 'Alle', e: 'Alle', q: '' }, sel = [];
  openSheet('', sh => {
    const draw = (keepFocus) => { const list = exFilterList(f);
      sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between"><h2 class="disp">${single ? 'Übung ersetzen' : 'Übung hinzufügen'}</h2><button class="btn btn-g" data-newex>${ic('plus', 18)} Eigene</button></div>
      <input class="input" id="px-q" placeholder="Übung suchen" value="${esc(f.q)}" aria-label="Übung suchen">
      <div class="chips scroll">${['Alle', ...MUSCLES].map(m => `<button class="chip ${f.m === m ? 'on' : ''}" data-pm="${m}">${m}</button>`).join('')}</div>
      <div class="chips scroll">${['Alle', ...EQUIP].map(m => `<button class="chip ${f.e === m ? 'on' : ''}" data-pe="${m}">${m}</button>`).join('')}</div>
      <div>${list.map(e => `<div class="sel" data-px="${e.id}" style="cursor:pointer">${exThumb(e)}<div class="grow"><div style="font-weight:600">${esc(e.name)}</div><div class="cap">${esc(e.muscle)} · ${esc(e.equip)}</div></div>${single ? '' : `<span class="pick ${sel.includes(e.id) ? 'on' : ''}">${ic('check', 16)}</span>`}</div>`).join('') || '<div class="empty">Nichts gefunden. Leg die Übung oben als eigene an.</div>'}</div>
      ${single ? '' : `<div style="position:sticky;bottom:0;padding-top:8px;background:var(--bg)"><button class="btn btn-p btn-block" data-px-add ${sel.length ? '' : 'disabled'}>${sel.length ? sel.length + ' Übung' + (sel.length > 1 ? 'en' : '') + ' hinzufügen' : 'Übungen auswählen'}</button></div>`}`;
      if (keepFocus) { const i = sh.querySelector('#px-q'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); } };
    draw();
    sh.addEventListener('input', ev => { if (ev.target.id === 'px-q') { f.q = ev.target.value; draw(true); } });
    sh.addEventListener('click', ev => {
      const t = ev.target.closest('[data-pm],[data-pe],[data-px],[data-px-add],[data-newex]'); if (!t) return;
      if (t.dataset.pm) { f.m = t.dataset.pm; draw(); } else if (t.dataset.pe) { f.e = t.dataset.pe; draw(); }
      else if (t.dataset.newex !== undefined) { customExSheet(id => onPick([id])); }
      else if (t.dataset.px) { if (single) { closeSheet(); onPick([t.dataset.px]); return; } const i = sel.indexOf(t.dataset.px); i >= 0 ? sel.splice(i, 1) : sel.push(t.dataset.px); draw(); }
      else if (t.dataset.pxAdd !== undefined) { closeSheet(); onPick(sel.slice()); }
    });
  });
}
const RESTS = [0, 30, 60, 90, 120, 180];
const restLabel = s => s ? `${Math.floor(s / 60)}:${pad(s % 60)}` : 'Aus';
function newExEntry(id) { const lp = lastPerf(id); return { exId: id, rest: COMPOUND.has(id) ? 120 : 90, note: '', sets: Array.from({ length: 3 }, () => ({ type: 'n', kg: lp ? lp.kg : 0, reps: lp ? lp.reps : 10 })) }; }

/* Routine editor */
function vRoutine() {
  if (!R) { view = 'train'; return vTrain(); }
  return `<div class="row"><button class="btn btn-g" data-act="rcancel">Abbrechen</button><h1 class="disp grow" style="font-size:20px;text-align:center">${R.id ? 'Routine bearbeiten' : 'Neue Routine'}</h1><button class="btn btn-p btn-sm" data-act="rsave">Speichern</button></div>
    <input class="input" id="r-name" value="${esc(R.name)}" placeholder="Name der Routine, z. B. Push Tag" aria-label="Name der Routine" style="font-weight:700">
    ${R.exercises.map((x, xi) => { const e = exOf(x.exId); return `<div class="card"><div class="row"><button class="thumb" data-ex="${x.exId}" style="padding:2px;border:0" aria-label="${esc(e.name)} ansehen">${exIcon(e)}</button><button class="exname grow" data-ex="${x.exId}">${esc(e.name)}</button><button class="iconbtn" style="width:36px;height:36px;background:transparent" data-rx-up="${xi}" aria-label="Nach oben">${ic('up', 18)}</button><button class="iconbtn" style="width:36px;height:36px;background:transparent" data-rx-down="${xi}" aria-label="Nach unten">${ic('down', 18)}</button><button class="iconbtn" style="width:36px;height:36px;background:transparent;color:var(--critical)" data-rx-del="${xi}" aria-label="Übung entfernen">${ic('trash', 18)}</button></div>
      <input class="note" data-rnote="${xi}" value="${esc(x.note)}" placeholder="Notiz hinzufügen">
      <button class="pill" data-rrest="${xi}">${ic('timer', 16)} Pause: ${restLabel(x.rest)}</button>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px"><div class="rset" style="font-size:11px;font-weight:700;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.04em"><span>Satz</span><span style="text-align:center">kg</span><span style="text-align:center">Wdh.</span><span></span></div>
      ${x.sets.map((s, si) => `<div class="rset"><button class="stype ${s.type}" data-rtype="${xi}:${si}" aria-label="Satztyp ändern">${setLabel(x.sets, si)}</button><input inputmode="decimal" data-rkg="${xi}:${si}" value="${s.kg ? dec(s.kg) : ''}" placeholder="0" aria-label="Gewicht"><input inputmode="numeric" data-rreps="${xi}:${si}" value="${s.reps || ''}" placeholder="10" aria-label="Wiederholungen"><button class="iconbtn" style="width:34px;height:34px;background:transparent" data-rdelset="${xi}:${si}" aria-label="Satz entfernen">${ic('x', 16)}</button></div>`).join('')}</div>
      <button class="btn btn-s btn-block" style="height:40px;margin-top:8px" data-raddset="${xi}">+ Satz hinzufügen</button></div>`; }).join('')}
    <button class="btn btn-p btn-block" data-act="raddex">${ic('plus', 20)} Übung hinzufügen</button>`;
}
function setLabel(sets, si) { const s = sets[si]; if (s.type !== 'n') return s.type.toUpperCase(); let n = 0; for (let i = 0; i <= si; i++) if (sets[i].type !== 'w') n++; return n; }
function editRoutine(r) { R = JSON.parse(JSON.stringify(r || { id: '', name: '', exercises: [] })); if (R.plan) { R.id = ''; R.name = R.name + ' (eigene)'; delete R.plan; } view = 'routine'; render(); window.scrollTo(0, 0); }
function routineMenu(id) {
  const r = id.startsWith('plan-') ? planRoutines().find(x => x.id === id) : S.routines.find(x => x.id === id); if (!r) return;
  openSheet(`<h2 class="disp">${esc(r.name)}</h2><div style="display:flex;flex-direction:column;gap:8px">
    ${r.plan ? `<button class="btn btn-s btn-block" data-rm="copy">${ic('edit', 18)} Als eigene Routine anpassen</button>` : `<button class="btn btn-s btn-block" data-rm="edit">${ic('edit', 18)} Bearbeiten</button><button class="btn btn-s btn-block" data-rm="dup">${ic('book', 18)} Duplizieren</button><button class="btn btn-d btn-block" data-rm="del">${ic('trash', 18)} Löschen</button>`}
    ${r.plan ? '<p class="cap" style="margin:0">Der Repwerk-Plan wird aus deinem Profil berechnet. Eine Kopie kannst du frei verändern.</p>' : ''}</div>`, sh => sh.addEventListener('click', async ev => {
      const b = ev.target.closest('[data-rm]'); if (!b) return; const a = b.dataset.rm; closeSheet();
      if (a === 'copy' || a === 'edit') editRoutine(r);
      if (a === 'dup') { const c = JSON.parse(JSON.stringify(r)); c.id = uid(); c.name += ' (Kopie)'; S.routines.push(c); save(); render(); toast('Routine dupliziert'); }
      if (a === 'del' && await confirmBox('Routine löschen?', `„${r.name}“ wird gelöscht. Vergangene Trainings bleiben.`, 'Löschen', true)) { S.routines = S.routines.filter(x => x.id !== r.id); save(); render(); }
    }));
}

/* Active workout */
function startWorkout(routineId) {
  if (S.active) { view = 'workout'; render(); return; }
  let r = null;
  if (routineId) r = routineId.startsWith('plan-') ? planRoutines().find(x => x.id === routineId) : S.routines.find(x => x.id === routineId);
  S.active = { id: uid(), name: r ? (isEN() ? tr(r.name) : r.name) : (isEN() ? 'Workout' : 'Training'), routineId: r ? r.id : null, start: Date.now(), exercises: r ? r.exercises.map(x => { const ps = prevSets(x.exId); return { exId: x.exId, rest: x.rest ?? 90, note: x.note || '', target: x.target || '', sets: x.sets.map((s, i) => ({ type: s.type || 'n', kg: Math.round((s.kg || (ps && ps[i] ? ps[i].kg : (ps ? ps[ps.length - 1].kg : 0))) * 4) / 4, reps: s.reps || 0, done: false })) }; }) : [] };
  { const rd = readiness(); S.active.exercises.forEach(x => { x.sug = suggestLoad(x.exId, x.target, null, rd); applySug(x); }); }
  save(); view = 'workout'; render(); window.scrollTo(0, 0);
  if (!r) setTimeout(() => pickExercises(ids => { ids.forEach(id => S.active.exercises.push(Object.assign(newExEntry(id), { sets: newExEntry(id).sets.map(s => ({ ...s, done: false })) }))); save(); render(); }), 150);
}
function vWorkout() {
  const a = S.active; if (!a) { view = 'train'; return vTrain(); }
  return `<div class="row" style="justify-content:space-between;gap:10px"><button class="iconbtn" data-nav="train" aria-label="Minimieren">${ic('down')}</button><input class="input grow" id="w-name" value="${esc(a.name)}" aria-label="Name des Trainings" style="font-weight:800;height:42px;background:transparent;border-color:transparent;font-size:19px;padding:0 6px"><button class="iconbtn" data-act="pausew" aria-label="${a.pausedAt ? 'Training fortsetzen' : 'Training pausieren'}" style="${a.pausedAt ? 'background:var(--ember);color:var(--on-ember)' : ''}">${ic(a.pausedAt ? 'play' : 'pause')}</button><button class="btn btn-p btn-sm" data-act="finish">Beenden</button></div>
    ${a.pausedAt ? `<button class="banner" data-act="pausew" style="border:0;text-align:left;width:100%">${ic('timer', 18)}<div><b>Pausiert seit ${new Date(a.pausedAt).toLocaleTimeString(LOC(), { hour: '2-digit', minute: '2-digit' })}.</b> Die Dauer läuft nicht weiter. Tippe zum Fortsetzen.</div></button>` : ''}
    <div class="card stats3" style="padding:12px 14px"><div><span class="cap">Dauer</span><span class="disp num" id="w-dur" style="font-size:20px">${clock(elapsed(a))}</span></div><div><span class="cap row" style="gap:2px">Volumen ${infoBtn('volume')}</span><span class="disp num" style="font-size:20px">${fmt(volume(a))} kg</span></div><div><span class="cap">Sätze</span><span class="disp num" style="font-size:20px">${doneCount(a)}</span></div></div>
    ${a.exercises.length ? '' : `<div class="card empty">Noch keine Übung. Füge unten deine erste hinzu.</div>`}
    ${a.exercises.map((x, xi) => { const e = exOf(x.exId), ps = prevSets(x.exId, a.id);
      return `<div class="card"><div class="row"><button class="thumb" data-ex="${x.exId}" style="padding:2px;border:0" aria-label="${esc(e.name)} Anleitung">${exIcon(e)}</button><button class="exname grow" data-ex="${x.exId}">${esc(e.name)}</button><button class="iconbtn" style="width:38px;height:38px;background:transparent" data-xmenu="${xi}" aria-label="Optionen">${ic('dots', 20)}</button></div>
      <input class="note" data-wnote="${xi}" value="${esc(x.note)}" placeholder="Notiz hinzufügen">
      <div class="row" style="gap:8px;flex-wrap:wrap"><button class="pill" data-wrest="${xi}">${ic('timer', 16)} Pause: ${restLabel(x.rest)}</button>${x.target ? `<span class="cap">Ziel: ${esc(x.target)} Wdh.</span>` : ''}</div>
      ${sugHTML(x, xi)}
      <div style="display:flex;flex-direction:column;gap:4px;margin-top:10px"><div class="hset head"><span>Satz</span><span style="text-align:center">Vorher</span><span style="text-align:center">kg</span><span style="text-align:center">Wdh.</span><span style="text-align:center">${ic('check', 14)}</span></div>
      ${x.sets.map((s, si) => { const pv = ps && ps[si] ? `${fmt1(ps[si].kg)} kg × ${ps[si].reps}` : '–';
        return `<div class="hset ${s.done ? 'done' : ''}"><button class="stype ${s.type}" data-wtype="${xi}:${si}" aria-label="Satz ${si + 1}: ${TYPES[s.type]}. Tippen zum Ändern">${setLabel(x.sets, si)}</button><span class="prev" data-prevfill="${xi}:${si}">${pv}</span><input inputmode="decimal" aria-label="Gewicht Satz ${si + 1}" data-kg="${xi}:${si}" value="${s.kg ? dec(s.kg) : ''}" placeholder="${ps && ps[si] ? dec(ps[si].kg) : '0'}"><input inputmode="numeric" aria-label="Wiederholungen Satz ${si + 1}" data-reps="${xi}:${si}" value="${s.reps || ''}" placeholder="${ps && ps[si] ? ps[si].reps : (parseInt(x.target) || 10)}"><button class="check ${s.done ? 'on' : ''}" data-done="${xi}:${si}" aria-label="Satz ${si + 1} erledigt">${ic('check', 18)}</button></div>`; }).join('')}</div>
      <button class="btn btn-s btn-block" style="height:40px;margin-top:8px" data-addset="${xi}">+ Satz hinzufügen</button></div>`; }).join('')}
    <div class="cap" style="text-align:center">Tippe auf die Satznummer für <b style="color:var(--warning)">W</b> Aufwärmen, <b style="color:#8B6CFF">D</b> Dropsatz oder <b style="color:var(--critical)">F</b> bis zum Versagen. ${infoBtn('sets')}</div>
    <button class="btn btn-p btn-block" data-act="wraddex">${ic('plus', 20)} Übung hinzufügen</button>
    <div id="wph" style="display:flex;flex-direction:column;gap:10px">${photoStrip(a.photos || [], { edit: true })}${photoAddBtn(a.photos || [], 'data-wph')}</div>
    <button class="btn btn-d btn-block" data-act="cancelworkout">Training verwerfen</button>`;
}
function setTypeSheet(xs, xi, si, after) {
  const s = xs[xi].sets[si];
  openSheet(`<h2 class="disp">Satz ${si + 1}</h2><div style="display:flex;flex-direction:column;gap:8px">${Object.entries(TYPES).map(([k, l]) => `<button class="btn ${s.type === k ? 'btn-p' : 'btn-s'} btn-block" style="justify-content:flex-start" data-st="${k}"><span class="stype ${k}" style="width:28px;height:auto">${k === 'n' ? '1' : k.toUpperCase()}</span>${l}</button>`).join('')}
    <button class="btn btn-d btn-block" data-st="del">${ic('trash', 18)} Satz löschen</button></div>
    <p class="cap" style="margin:0">Aufwärmsätze zählen nicht zum Volumen und nicht zu Rekorden. Dropsätze folgen direkt mit weniger Gewicht.</p>`, sh => sh.addEventListener('click', ev => {
      const b = ev.target.closest('[data-st]'); if (!b) return;
      if (b.dataset.st === 'del') { if (xs[xi].sets.length > 1) xs[xi].sets.splice(si, 1); else toast('Mindestens ein Satz bleibt'); } else s.type = b.dataset.st;
      closeSheet(); after();
    }));
}
let restEnd = 0;
function startRest(sec) { if (!sec) return; restEnd = Date.now() + sec * 1000; tickRest(); clearInterval(timer); timer = setInterval(tickRest, 500); }
function stopRest() { clearInterval(timer); timer = null; const el = $('#rest'); el && el.remove(); }
function tickRest() {
  const left = Math.ceil((restEnd - Date.now()) / 1000);
  if (left <= 0 || view !== 'workout') { stopRest(); if (left <= 0 && view === 'workout') { toast('Pause vorbei. Nächster Satz!'); try { navigator.vibrate && navigator.vibrate([60, 40, 60]); } catch (e) {} } return; }
  let el = $('#rest');
  if (!el) { el = document.createElement('div'); el.id = 'rest'; el.className = 'timer'; el.setAttribute('role', 'timer'); document.body.append(el); el.addEventListener('click', ev => { const b = ev.target.closest('button'); if (!b) return; if (b.dataset.r === 'skip') stopRest(); else if (b.dataset.r === 'sub') { restEnd -= 15000; tickRest(); } else { restEnd += 15000; tickRest(); } }); }
  el.innerHTML = `<span class="num">Pause ${clock(left * 1000)}</span><button data-r="sub">−15</button><button data-r="add">+15</button><button data-r="skip">Weiter</button>`;
}
function finishWorkout() {
  const a = S.active, done = doneCount(a);
  if (!done) { confirmBox('Noch keine Sätze erledigt', 'Hake mindestens einen Satz ab oder verwirf das Training.', 'Okay'); return; }
  const fresh = !a.routineId;
  a.photos = a.photos || [];
  const d = { min: Math.max(1, Math.round(elapsed(a) / 60000)), name: a.name, gym: S.gyms[0] || '', note: '', share: !!CB, asRoutine: fresh };
  const draw = sh => {
    sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between"><h2 class="disp">Training speichern</h2><button class="iconbtn" data-close-sheet aria-label="Zurück zum Training">${ic('x')}</button></div>
      <input class="input" id="f-name" value="${esc(d.name)}" aria-label="Titel" style="font-weight:700">
      <div class="card stats3" style="padding:12px 14px"><div><span class="cap">Dauer</span><span class="unit" style="max-width:100px"><input class="input" id="f-dur" inputmode="numeric" value="${d.min}" aria-label="Dauer in Minuten" style="height:40px;font-weight:800;font-size:18px;padding:0 34px 0 10px"><span style="top:9px;right:10px">min</span></span></div><div><span class="cap">Volumen</span><span class="disp" style="font-size:18px">${fmt(volume(a))} kg</span></div><div><span class="cap">Sätze</span><span class="disp" style="font-size:18px">${done}</span></div></div>
      <label class="field"><span class="lbl">${ic('pin', 16)} Gym</span><input class="input" id="f-gym" list="gymlist" value="${esc(d.gym)}" placeholder="z. B. McFit Köln-Ehrenfeld"><datalist id="gymlist">${S.gyms.map(g => `<option value="${esc(g)}">`).join('')}</datalist>
        ${S.gyms.length ? `<div class="chips">${S.gyms.slice(0, 4).map(g => `<button class="chip ${d.gym === g ? 'on' : ''}" data-gym="${esc(g)}">${esc(g)}</button>`).join('')}</div>` : ''}
        <span class="cap">In der App schlagen wir Studios in deiner Nähe über den Standort vor, nur wenn du es erlaubst. Im Prototyp merken wir uns deine Gyms.</span></label>
      <label class="field"><span class="lbl">Notiz</span><textarea class="input" id="f-note" placeholder="Wie lief es? Neue Technik, Schmerzen, Stimmung …">${esc(d.note)}</textarea></label>
      <div class="field"><span class="lbl">Fotos</span>${photoStrip(a.photos, { edit: true })}${photoAddBtn(a.photos, 'data-fphoto')}</div>
      <div class="sel"><div class="grow"><div style="font-weight:600">In der Community teilen</div><div class="cap">${CB ? 'Freunde, die dir folgen, sehen Titel, Gym, Übungen, Sätze, Notiz und Fotos.' : (IN_CLAUDE ? 'Teilen geht, wenn du den Prototyp in Claude öffnest.' : 'Melde dich an, um Workouts zu teilen.')}</div></div><button class="toggle ${d.share && CB ? 'on' : ''}" data-ftog="share" role="switch" aria-checked="${!!(d.share && CB)}" ${CB ? '' : 'disabled'} aria-label="In der Community teilen"></button></div>
      ${fresh ? `<div class="sel"><div class="grow"><div style="font-weight:600">Als Routine speichern</div><div class="cap">Übungen und Sätze als Vorlage für das nächste Mal.</div></div><button class="toggle ${d.asRoutine ? 'on' : ''}" data-ftog="asRoutine" role="switch" aria-checked="${d.asRoutine}" aria-label="Als Routine speichern"></button></div>` : ''}
      <button class="btn btn-p btn-block" data-fsave>Speichern</button>`;
  };
  openSheet('', sh => {
    draw(sh);
    const read = () => { d.min = Math.max(1, Math.min(600, Math.round(num(sh.querySelector('#f-dur').value)) || d.min)); d.name = sh.querySelector('#f-name').value.trim() || a.name; d.gym = sh.querySelector('#f-gym').value.trim(); d.note = sh.querySelector('#f-note').value.trim(); };
    sh.addEventListener('change', async ev => { if (ev.target.matches('[data-fphoto]') && ev.target.files.length) { read(); if (await addPhotoFiles(ev.target.files, a.photos)) save(); draw(sh); } });
    sh.addEventListener('click', async ev => {
      const g = ev.target.closest('[data-gym]'); if (g) { read(); d.gym = g.dataset.gym; draw(sh); return; }
      const rm = ev.target.closest('[data-rmph]'); if (rm) { ev.stopPropagation(); read(); const [ph] = a.photos.splice(+rm.dataset.rmph, 1); deletePhotos([ph]); save(); draw(sh); return; }
      const tg = ev.target.closest('[data-ftog]'); if (tg && !tg.disabled) { read(); d[tg.dataset.ftog] = !d[tg.dataset.ftog]; draw(sh); return; }
      if (!ev.target.closest('[data-fsave]')) return;
      read(); ev.target.closest('[data-fsave]').disabled = true;
      if (a.pausedAt) { a.pausedMs = (a.pausedMs || 0) + (Date.now() - a.pausedAt); a.pausedAt = null; } a.end = Date.now(); a.dur = d.min * 60000; a.name = d.name; a.gym = d.gym; a.note = d.note;
      const recs = findRecords(a), prs = [...new Set(recs.map(r => exOf(r.exId).name))];
      a.prs = prs; a.records = recs; const streakBefore = weekStreak();
      a.exercises.forEach(x => x.sets = x.sets.filter(s => s.done)); a.exercises = a.exercises.filter(x => x.sets.length);
      if (d.gym) S.gyms = [d.gym, ...S.gyms.filter(x => x !== d.gym)].slice(0, 8);
      if (d.asRoutine && fresh) S.routines.push({ id: uid(), name: d.name, exercises: a.exercises.map(x => ({ exId: x.exId, rest: x.rest, note: x.note, sets: x.sets.map(s => ({ type: s.type, kg: s.kg, reps: s.reps })) })) });
      if (a.routineId && a.routineId.startsWith('plan-')) S.planIndex++;
      let posted = false;
      if (d.share && CB) { try { await postWorkout(a); posted = true; a.posted = true; } catch (e) { toast('Teilen hat nicht geklappt, Training ist trotzdem gespeichert'); } }
      S.workouts.push(a); S.active = null; stopRest(); save(); closeSheet(); view = 'train'; render(); feed = null;
      summarySheet(a, posted, streakBefore);
    });
  });
}
function editTimeSheet(w) {
  const st = new Date(w.start), local = `${dayKey(st)}T${pad(st.getHours())}:${pad(st.getMinutes())}`;
  openSheet(`<h2 class="disp">Dauer ändern</h2><p class="muted" style="margin:0">${esc(w.name)}</p>
    <label class="field"><span class="lbl">Beginn</span><input class="input" type="datetime-local" id="et-start" value="${local}"></label>
    <label class="field"><span class="lbl">Dauer</span><span class="unit"><input class="input" id="et-min" inputmode="numeric" value="${Math.round(wDur(w) / 60000)}"><span>min</span></span></label>
    <p class="cap" id="et-err" style="color:var(--critical);margin:0"></p>
    <div class="grid2"><button class="btn btn-s" data-close-sheet>Abbrechen</button><button class="btn btn-p" data-et>Speichern</button></div>`, sh => sh.addEventListener('click', async ev => {
      if (!ev.target.closest('[data-et]')) return;
      const m = Math.round(num(sh.querySelector('#et-min').value)), s = new Date(sh.querySelector('#et-start').value);
      if (!(m >= 1 && m <= 600)) { sh.querySelector('#et-err').textContent = 'Bitte eine Dauer zwischen 1 und 600 Minuten eingeben.'; return; }
      if (isNaN(s) || s.getTime() > Date.now()) { sh.querySelector('#et-err').textContent = 'Bitte einen Beginn in der Vergangenheit wählen.'; return; }
      w.start = s.getTime(); w.dur = m * 60000; w.end = w.start + w.dur; save(); closeSheet(); render(); toast('Dauer gespeichert');
      if (w.posted && CB) { try { await CB.updatePost(w.id, { start: w.start, end: w.end, dur: w.dur }); } catch (e) {} }
    }));
}
function summarySheet(a, posted, streakBefore) {
  const prev = [...S.workouts].reverse().find(w => w.id !== a.id && (a.routineId ? w.routineId === a.routineId : w.name === a.name));
  const vol = volume(a), dv = prev ? vol - volume(prev) : null, recs = a.records || [];
  const ws = weekStreak(), musc = muscleSets([a]);
  const mmax = Math.max(1, ...Object.values(musc));
  const best = x => { const w = x.sets.filter(s => s.type !== 'w'); return (w.length ? w : x.sets).reduce((m, s) => e1rm(s) > e1rm(m) ? s : m); };
  openSheet(`<div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:8px"><span style="color:var(--ember)">${MARK(48)}</span><h2 class="disp" style="font-size:26px;line-height:30px">Stark gemacht${S.profile.name ? ', ' + esc(S.profile.name) : ''}!</h2><p class="muted" style="margin:0">${esc(a.name)}${a.gym ? ' · ' + esc(a.gym) : ''}${posted ? ' · geteilt' : ''}</p></div>
    <div class="grid2"><div class="card"><div class="cap">Dauer</div><div class="disp" style="font-size:22px">${dur(wDur(a))}</div></div><div class="card"><div class="cap">Sätze</div><div class="disp" style="font-size:22px">${doneCount(a)}</div></div><div class="card"><div class="cap">Volumen</div><div class="disp" style="font-size:22px">${fmt(vol)} kg</div>${dv !== null ? `<div class="cap" style="color:${dv >= 0 ? 'var(--good)' : 'var(--warning)'}">${dv >= 0 ? '+' : '−'}${fmt(Math.abs(dv))} kg zum letzten Mal</div>` : ''}</div><div class="card"><div class="cap">Trainings-Streak</div><div class="disp" style="font-size:22px">${ws} ${ws === 1 ? 'Woche' : 'Wochen'}</div>${ws > streakBefore ? '<div class="cap" style="color:var(--good)">verlängert</div>' : ''}</div></div>
    ${recs.length ? `<div class="card" style="border-color:var(--good)"><div class="lbl" style="display:flex;gap:6px;align-items:center;color:var(--good)">${ic('trophy', 18)} ${recs.length} neue${recs.length === 1 ? 'r' : ''} Rekord${recs.length === 1 ? '' : 'e'}</div><ul class="list">${recs.map(r => `<li><div class="grow"><div style="font-weight:600">${esc(exOf(r.exId).name)}</div><div class="cap">${REC[r.kind]}</div></div><span class="num" style="font-weight:700">${recVal(r)}</span></li>`).join('')}</ul></div>` : ''}
    <div class="card"><div class="lbl" style="margin-bottom:6px">Übungen</div><ul class="list">${a.exercises.map(x => { const b = best(x); return `<li><div class="grow"><div style="font-weight:600">${esc(exOf(x.exId).name)}</div><div class="cap">${x.sets.length} Sätze · bester Satz ${fmt1(b.kg)} kg × ${b.reps}</div></div></li>`; }).join('')}</ul></div>
    ${Object.keys(musc).length ? `<div class="card"><div class="lbl" style="margin-bottom:10px">Trainierte Muskeln</div>${Object.entries(musc).sort((x, y) => y[1] - x[1]).map(([m, n]) => `<div class="row" style="gap:10px;margin-bottom:6px"><span style="width:84px;font-size:14px">${esc(m)}</span><div class="grow" style="height:8px;background:var(--surface-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${n / mmax * 100}%;background:var(--ember)"></div></div><span class="num cap" style="width:52px;text-align:right">${n} Sätze</span></div>`).join('')}</div>` : ''}
    ${nextTimeHTML(a)}
    <button class="btn btn-p btn-block" data-close-sheet>Fertig</button>`);
}
function workoutDetailHTML(w, opts = {}) {
  const exs = w.exercises || [];
  return `${opts.head || ''}<div><div class="cap">${new Date(w.start).toLocaleDateString(LOC(), { weekday: 'long', day: 'numeric', month: 'long' })}${w.gym ? ' · ' + esc(w.gym) : ''}</div><h2 class="disp">${esc(w.name)}</h2></div>
    ${photoStrip(photosOf(w))}
    ${w.note ? `<p translate="no" style="margin:0;white-space:pre-wrap">${esc(w.note)}</p>` : ''}
    <div class="card stats3" style="padding:12px 14px"><div><span class="cap">Dauer</span><span class="disp" style="font-size:18px">${dur(wDur(w))}</span></div><div><span class="cap">Volumen</span><span class="disp" style="font-size:18px">${fmt(w.volume ?? volume(w))} kg</span></div><div><span class="cap">Sätze</span><span class="disp" style="font-size:18px">${w.sets ?? doneCount(w)}</span></div></div>
    ${(w.prs || []).length ? `<div class="banner" style="background:color-mix(in srgb, var(--good) 16%, transparent)"><span style="color:var(--good)">${ic('trophy', 20)}</span><div><b>Rekorde:</b> ${w.prs.map(esc).join(', ')}</div></div>` : ''}
    ${exs.map(x => { const name = x.name || exOf(x.exId).name; return `<div class="card"><div style="font-weight:700;color:var(--ember-ink)">${esc(name)}</div>${x.note ? `<div class="cap" style="margin-top:2px">${esc(x.note)}</div>` : ''}<div style="display:flex;flex-direction:column;gap:4px;margin-top:8px">${x.sets.map((s, si) => `<div class="row" style="gap:12px"><span class="stype ${s.type}" style="width:24px;height:auto;text-align:center">${setLabel(x.sets, si)}</span><span class="num grow">${fmt1(s.kg)} kg × ${s.reps}</span>${s.type !== 'n' ? `<span class="cap">${TYPES[s.type]}</span>` : ''}</div>`).join('')}</div></div>`; }).join('')}`;
}
function workoutDetail(id) {
  const w = S.workouts.find(x => x.id === id); if (!w) return;
  openSheet(workoutDetailHTML(w) + `<button class="btn btn-s btn-block" data-wd="photos">${ic('img', 18)} ${photosOf(w).length ? 'Fotos bearbeiten' : 'Fotos hinzufügen'}</button><div class="grid2"><button class="btn btn-s" data-wd="sum">${ic('stats', 18)} Zusammenfassung</button><button class="btn btn-s" data-wd="time">${ic('timer', 18)} Dauer ändern</button></div><div class="grid2"><button class="btn btn-s" data-wd="routine">Als Routine speichern</button><button class="btn btn-d" data-wd="del">Löschen</button></div>`, sh => sh.addEventListener('click', async ev => {
    const b = ev.target.closest('[data-wd]'); if (!b) return;
    if (b.dataset.wd === 'time') { closeSheet(); editTimeSheet(w); return; }
    if (b.dataset.wd === 'photos') { editPhotosSheet(w); return; }
    if (b.dataset.wd === 'sum') { closeSheet(); summarySheet(w, w.posted, weekStreak()); return; }
    if (b.dataset.wd === 'routine') { S.routines.push({ id: uid(), name: w.name, exercises: w.exercises.map(x => ({ exId: x.exId, rest: x.rest ?? 90, note: x.note || '', sets: x.sets.map(s => ({ type: s.type || 'n', kg: s.kg, reps: s.reps })) })) }); save(); closeSheet(); render(); toast('Als Routine gespeichert'); }
    if (b.dataset.wd === 'del' && await confirmBox('Training löschen?', 'Das Training verschwindet aus deinem Verlauf und deinen Statistiken.', 'Löschen', true)) { S.workouts = S.workouts.filter(x => x.id !== w.id); deletePhotos(photosOf(w)); if (w.posted && CB) { try { await CB.deletePost(w.id); } catch (e) {} } save(); closeSheet(); render(); }
  }));
}

/* ---------- Community ---------- */
async function publishProfile() { if (!CB || !UID) return; await CB.setProfile({ name: S.social.name || 'Ohne Namen', bio: S.social.bio || '', avatar: S.social.avatar || '', goal: S.profile ? GOALS[S.profile.goal] : '', at: Date.now() }); }
async function postWorkout(a) {
  if (!S.social.name) S.social.name = S.profile.name || 'Ohne Namen';
  await publishProfile();
  const post = { id: a.id, author: UID, name: a.name, gym: a.gym || '', note: a.note || '', ...(await postPhotos(photosOf(a))), start: a.start, end: a.end, dur: wDur(a), at: Date.now(), volume: r0(volume(a)), sets: doneCount(a), prs: a.prs || [],
    exercises: a.exercises.map(x => ({ exId: x.exId, name: exOf(x.exId).name, note: x.note || '', sets: x.sets.map(s => ({ type: s.type, kg: s.kg, reps: s.reps })) })) };
  const json = JSON.stringify(post); if (json.length > 240000) post.photo = '';
  await CB.setPost(post);
}
async function loadFeed() {
  if (!CB || feedState === 'loading') return;
  feedState = 'loading'; render();
  try {
    const ids = [UID, ...S.following];
    const parts = await CB.listPosts(ids, 10);
    const profs = await CB.profilesByIds(ids); people = Object.assign(people || {}, profs);
    feed = parts.filter(Boolean).sort((a, b) => b.at - a.at).slice(0, 40).map(p => Object.assign({}, p, { who: profs[p.author] || {} }));
    feedState = 'ok';
  } catch (e) { feedState = 'error'; }
  render();
}
async function loadPeople() {
  if (!CB) return {};
  try { people = await CB.profiles(peopleQ); } catch (e) { people = people || {}; }
  return people;
}
function postCard(p) {
  const exs = p.exercises || [];
  return `<div class="card" style="display:flex;flex-direction:column;gap:10px"><button class="row" data-person="${esc(p.author)}" style="border:0;background:transparent;padding:0;text-align:left">${avatar(p.who.avatar, p.who.name)}<div class="grow"><div style="font-weight:700">${esc(p.who.name || 'Jemand')}${p.author === UID ? ' <span class="cap">(du)</span>' : ''}</div><div class="cap">${ago(p.at)}${p.gym ? ' · ' + esc(p.gym) : ''}</div></div></button>
    <button data-post="${esc(p.author)}:${esc(p.id)}" style="border:0;background:transparent;padding:0;text-align:left;display:flex;flex-direction:column;gap:8px">
      <div style="font-weight:800;font-size:18px">${esc(p.name)}</div>${p.note ? `<div class="muted" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${esc(p.note)}</div>` : ''}
      <div class="stats3" style="width:100%"><div><span class="cap">Dauer</span><b>${dur(wDur(p))}</b></div><div><span class="cap">Volumen</span><b>${fmt(p.volume)} kg</b></div><div><span class="cap">Sätze</span><b>${p.sets}</b></div></div>
      ${photoStrip(photosOf(p))}
      <div class="cap">${exs.slice(0, 4).map(x => `${x.sets.length} × ${esc(x.name)}`).join(' · ')}${exs.length > 4 ? ` · +${exs.length - 4} weitere` : ''}</div>
      ${(p.prs || []).length ? `<span class="tag" style="color:var(--good)">${ic('trophy', 14)} ${p.prs.length} Rekord${p.prs.length > 1 ? 'e' : ''}</span>` : ''}
    </button></div>`;
}
function vCommunity() {
  const head = header('Community', 'Workouts von dir und deinen Freunden');
  if (!CB) return `${head}<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">${IN_CLAUDE ? 'Community nicht verbunden' : 'Melde dich an für die Community'}</div><p class="muted" style="margin:0">${IN_CLAUDE ? 'Freunde, Feed und geteilte Workouts funktionieren, wenn du den Prototyp in Claude öffnest und angemeldet bist. Freunde brauchen Zugriff auf den Prototyp-Link mit der Rolle „Mitwirkende“.' : cloudOn() ? 'Mit einem Konto teilst du Workouts, folgst Freunden und siehst ihre Trainings im Feed.' : 'Die Community braucht Login und Cloud-Speicher. Die sind auf diesem Server noch nicht eingerichtet.'}</p>${!IN_CLAUDE && cloudOn() ? '<button class="btn btn-p" data-cl="login">Anmelden oder Konto erstellen</button>' : ''}</div>${adBanner()}`;
  if (!S.social.name) return `${head}<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">Leg dein Community-Profil an</div><p class="muted" style="margin:0">Mit Name, Profilbild und Beschreibung finden dich Freunde und sehen deine geteilten Workouts.</p><button class="btn btn-p" data-act="editprofile">Profil anlegen</button></div>`;
  if (communityTab === 'feed' && feed === null && feedState !== 'loading') setTimeout(loadFeed, 0);
  if (communityTab === 'people' && people === null) setTimeout(() => loadPeople().then(render), 0);
  const seg = `<div class="seg"><button class="${communityTab === 'feed' ? 'on' : ''}" data-ctab="feed">Feed</button><button class="${communityTab === 'people' ? 'on' : ''}" data-ctab="people">Freunde finden</button></div>`;
  if (communityTab === 'people') {
    const list = Object.entries(people || {}).filter(([id]) => id !== UID);
    const sb = CB.kind === 'supabase';
    return `${head}${seg}${sb ? `<div class="row" style="gap:8px"><input class="input grow" id="pq" type="search" value="${esc(peopleQ)}" placeholder="Name suchen" aria-label="Personen nach Namen suchen"><button class="btn btn-p" data-act="invite">${ic('users', 18)} Einladen</button></div><p class="cap" style="margin:0">${peopleQ ? '' : 'Zuletzt aktive Mitglieder. '}Lade Freunde mit deinem Link ein: Wer ihn öffnet, landet direkt auf deinem Profil.</p>` : `<p class="cap" style="margin:0">Hier stehen alle, die den Prototyp nutzen und ein Profil angelegt haben. Teile den Link mit Freunden, damit sie hier auftauchen.</p>`}
      <div class="card" style="padding-top:4px;padding-bottom:4px">${people === null ? '<div class="empty">Lade …</div>' : list.length ? list.map(([id, p]) => `<div class="sel"><button data-person="${esc(id)}" class="row grow" style="border:0;background:transparent;padding:0;text-align:left">${avatar(p.avatar, p.name)}<div class="grow" style="min-width:0"><div style="font-weight:700">${esc(p.name)}</div><div class="cap" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.bio || p.goal || '')}</div></div></button><button class="btn ${S.following.includes(id) ? 'btn-s' : 'btn-p'} btn-sm" data-follow="${esc(id)}">${S.following.includes(id) ? 'Folge ich' : 'Folgen'}</button></div>`).join('') : (peopleQ ? '<div class="empty">Niemand mit diesem Namen gefunden.</div>' : sb ? '<div class="empty">Noch niemand außer dir. Lade Freunde mit deinem Link ein.</div>' : '<div class="empty">Noch niemand außer dir. Teile den Prototyp-Link mit Freunden.</div>')}</div>${adBanner()}`;
  }
  return `${head}${seg}<div class="row" style="justify-content:space-between"><span class="cap">${(n => n === 1 ? '1 Freund' : n + ' Freunde')(S.following.filter(id => CB.kind !== 'supabase' || uuidOk(id)).length)} · ${(n => n === 1 ? '1 Workout' : n + ' Workouts')(feed ? feed.length : 0)}</span><div class="row" style="gap:6px">${CB.kind === 'supabase' ? `<button class="btn btn-g" data-act="invite">${ic('users', 18)} Einladen</button>` : ''}<button class="iconbtn" data-act="refreshfeed" aria-label="Aktualisieren">${ic('refresh', 20)}</button></div></div>
    ${feedState === 'loading' && !feed ? '<div class="card empty"><div class="spinner" style="margin:0 auto 8px"></div>Lade Feed …</div>' : feedState === 'error' ? '<div class="card empty">Der Feed konnte nicht geladen werden. Tippe auf Aktualisieren.</div>' :
    (feed && feed.length) ? feed.map((p, i) => postCard(p) + (i === 1 ? adBanner() : '')).join('') : `<div class="card empty">Noch keine Workouts. Teile dein nächstes Training beim Speichern oder folge Freunden unter „Freunde finden“.</div>`}`;
}
async function personSheet(id) {
  let p = people && people[id]; if (!p && CB) { try { p = (await CB.profilesByIds([id]))[id]; if (p) people = Object.assign(people || {}, { [id]: p }); } catch (e) {} } p = p || { name: 'Jemand' };
  const sh = openSheet(`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">${avatar(p.avatar, p.name, 88)}<h2 class="disp">${esc(p.name)}</h2>${p.bio ? `<p translate="no" class="muted" style="margin:0;white-space:pre-wrap">${esc(p.bio)}</p>` : ''}${p.goal ? `<span class="tag">${esc(p.goal)}</span>` : ''}
    ${id !== UID ? `<button class="btn ${S.following.includes(id) ? 'btn-s' : 'btn-p'}" data-follow="${esc(id)}">${S.following.includes(id) ? 'Folge ich' : 'Folgen'}</button>` : ''}</div>
    <div class="lbl">Geteilte Workouts</div><div id="pp" class="empty"><div class="spinner" style="margin:0 auto"></div></div>`);
  sh.addEventListener('click', ev => { const f = ev.target.closest('[data-follow]'); if (f) { toggleFollow(f.dataset.follow); closeSheet(); personSheet(id); } const po = ev.target.closest('[data-post]'); if (po) openPost(po.dataset.post); });
  try { const list = (await CB.listPosts([id], 20)).map(d => Object.assign(d, { who: p })); const el = sh.querySelector('#pp'); if (el) { el.className = ''; el.style.cssText = 'display:flex;flex-direction:column;gap:12px'; el.innerHTML = list.length ? list.map(postCard).join('') : '<div class="empty">Noch nichts geteilt.</div>'; } } catch (e) { const el = sh.querySelector('#pp'); if (el) el.textContent = 'Konnte nicht geladen werden.'; }
}
async function openPost(key) {
  const [author, id] = key.split(':');
  let p = feed && feed.find(x => x.author === author && x.id === id);
  if (!p) { try { const d = await CB.getPost(author, id); if (d) p = Object.assign(d, { who: (people || {})[author] || {} }); } catch (e) {} }
  if (!p) { toast('Workout nicht gefunden'); return; }
  openSheet(workoutDetailHTML(p, { head: `<div class="row">${avatar(p.who.avatar, p.who.name, 36)}<div class="grow"><b>${esc(p.who.name || 'Jemand')}</b><div class="cap">${ago(p.at)}</div></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>` }) + (author !== UID ? `<button class="btn btn-s btn-block" data-copyr>Als Routine übernehmen</button>` : ''), sh => sh.addEventListener('click', ev => {
    if (ev.target.closest('[data-copyr]')) { S.routines.push({ id: uid(), name: p.name + ' (von ' + (p.who.name || 'Freund') + ')', exercises: p.exercises.filter(x => EX[x.exId] || S.customEx.some(c => c.id === x.exId)).map(x => ({ exId: x.exId, rest: 90, note: x.note || '', sets: x.sets.map(s => ({ type: s.type || 'n', kg: s.kg, reps: s.reps })) })) }); save(); closeSheet(); toast('Routine übernommen'); }
  }));
}
function toggleFollow(id) { const i = S.following.indexOf(id); if (i >= 0) S.following.splice(i, 1); else S.following.push(id); save(); feed = null; render(); }
function editProfileSheet() {
  const d = { ...S.social };
  const draw = sh => { sh.innerHTML = `<div class="grab"></div><h2 class="disp">Profil bearbeiten</h2>
    <div style="display:flex;align-items:center;gap:14px">${avatar(d.avatar, d.name, 80)}<div style="display:flex;flex-direction:column;gap:6px"><label class="btn btn-s btn-sm">${ic('cam', 18)} Profilbild wählen<input type="file" accept="image/*" class="hidden" data-avatar></label>${d.avatar ? '<button class="btn btn-g" data-noavatar>Entfernen</button>' : ''}</div></div>
    <label class="field"><span class="lbl">Name</span><input class="input" id="pe-name" value="${esc(d.name)}" maxlength="30" placeholder="Wie Freunde dich sehen"></label>
    <label class="field"><span class="lbl">Beschreibung</span><textarea class="input" id="pe-bio" maxlength="160" placeholder="z. B. Hybrid-Athlet aus Köln, Ziel: 100 kg Bankdrücken">${esc(d.bio)}</textarea><span class="cap">Höchstens 160 Zeichen. Sichtbar für alle, die den Prototyp nutzen.</span></label>
    <p class="cap" id="pe-err" style="color:var(--critical);margin:0"></p>
    <div class="grid2"><button class="btn btn-s" data-close-sheet>Abbrechen</button><button class="btn btn-p" data-pe-save>Speichern</button></div>`; };
  openSheet('', sh => {
    draw(sh);
    const read = () => { d.name = sh.querySelector('#pe-name').value.trim(); d.bio = sh.querySelector('#pe-bio').value.trim(); };
    sh.addEventListener('change', async ev => { if (ev.target.matches('[data-avatar]') && ev.target.files[0]) { read(); try { d.avatar = await compressImage(ev.target.files[0], 256, 0.8); } catch (e) { toast('Dieses Bild konnte nicht geladen werden'); } draw(sh); } });
    sh.addEventListener('click', async ev => {
      if (ev.target.closest('[data-noavatar]')) { read(); d.avatar = ''; draw(sh); return; }
      if (!ev.target.closest('[data-pe-save]')) return;
      read(); if (d.name.length < 2) { sh.querySelector('#pe-err').textContent = 'Bitte gib einen Namen mit mindestens 2 Zeichen ein.'; return; }
      S.social = { name: d.name.slice(0, 30), bio: d.bio.slice(0, 160), avatar: d.avatar }; save(); closeSheet(); render(); toast('Profil gespeichert');
      try { await publishProfile(); people = null; } catch (e) {}
    });
  });
}

/* ---------- Profile, progress, settings ---------- */
function isoWeek(d) { const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const n = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - n); const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1)); return Math.ceil(((t - y) / 86400000 + 1) / 7); }
function progressHTML() {
  const ws = S.weights.slice(-20), last = ws[ws.length - 1], first = ws[0];
  let chart = '<div class="cap">Trag dein Gewicht regelmäßig ein, dann erscheint hier dein Verlauf.</div>';
  if (ws.length >= 2) {
    const W = 340, H = 140, kgs = ws.map(w => w.kg), mn = Math.min(...kgs) - 0.5, mx = Math.max(...kgs) + 0.5;
    const pts = ws.map((w, i) => [16 + i * (W - 32) / (ws.length - 1), 12 + (H - 34) * (1 - (w.kg - mn) / (mx - mn))]);
    const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' '), lp = pts[pts.length - 1];
    chart = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Gewichtsverlauf"><line x1="16" x2="${W-16}" y1="${H-22}" y2="${H-22}" stroke="var(--line)"/><path d="${path} L${lp[0]} ${H-22} L16 ${H-22}Z" fill="var(--ember)" opacity=".12"/><path d="${path}" fill="none" stroke="var(--ember)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${lp[0]}" cy="${lp[1]}" r="5" fill="var(--ember)"/><text x="16" y="${H-6}" font-size="11" fill="var(--ink-muted)">${new Date(first.d).toLocaleDateString(LOC(),{day:'numeric',month:'short'})}</text><text x="${W-16}" y="${H-6}" font-size="11" fill="var(--ink-muted)" text-anchor="end">${new Date(last.d).toLocaleDateString(LOC(),{day:'numeric',month:'short'})}</text></svg>`;
  }
  const weeks = []; for (let i = 5; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i * 7); weeks.push(weekKey(d)); }
  const vol = weeks.map(k => S.workouts.filter(w => weekKey(new Date(w.start)) === k).reduce((a, w) => a + volume(w), 0)), vmax = Math.max(1, ...vol);
  const prs = {}; for (const w of S.workouts) for (const e of w.exercises) for (const s of e.sets) if (s.done && s.reps > 0 && s.type !== 'w') { const v = e1rm(s); if (!prs[e.exId] || v > prs[e.exId].v) prs[e.exId] = { v, kg: s.kg, reps: s.reps }; }
  const prList = Object.entries(prs).sort((a, b) => b[1].v - a[1].v).slice(0, 6);
  return `<div class="card"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="cap">Körpergewicht</div><div class="disp" style="font-size:26px;line-height:30px">${last ? fmt1(last.kg) : '–'} <span class="cap">kg</span></div></div>${ws.length >= 2 ? `<span class="tag">${last.kg - first.kg > 0 ? '+' : ''}${fmt1(last.kg - first.kg)} kg seit ${new Date(first.d).toLocaleDateString(LOC(),{day:'numeric',month:'short'})}</span>` : ''}</div>
      <div style="margin-top:8px">${chart}</div>
      <div class="row" style="margin-top:10px"><span class="unit grow"><input class="input" id="w-in" inputmode="decimal" placeholder="z. B. 77,5" aria-label="Heutiges Gewicht"><span>kg</span></span><button class="btn btn-p" data-act="addweight">Speichern</button></div></div>
    <div class="card"><div class="lbl" style="margin-bottom:10px">Trainingsvolumen pro Woche</div><div class="bars">${vol.map((v, i) => `<div><span class="num">${v ? fmt1(v / 1000) + ' t' : ''}</span><i style="height:${Math.max(2, v / vmax * 80)}px;${i === 5 ? '' : 'opacity:.45'}"></i><span>${i === 5 ? 'Diese' : 'KW ' + isoWeek(new Date(weeks[i]))}</span></div>`).join('')}</div></div>
    <div class="card"><div class="lbl">Persönliche Rekorde</div>${prList.length ? `<ul class="list">${prList.map(([id, p]) => `<li><span style="color:var(--good)">${ic('trophy', 20)}</span><div class="grow"><div style="font-weight:600">${esc(exOf(id).name)}</div><div class="cap">geschätztes Maximum ${fmt1(p.v)} kg</div></div><span class="num" style="font-weight:700">${fmt1(p.kg)} × ${p.reps}</span></li>`).join('')}</ul>` : '<div class="cap" style="margin-top:6px">Nach deinem ersten Training stehen hier deine Bestwerte.</div>'}</div>`;
}
function vProfile() {
  const so = S.social, wk = S.workouts.length, tot = S.workouts.reduce((a, w) => a + volume(w), 0);
  return `<div class="row"><button class="iconbtn" data-nav="home" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Profil</h1><button class="iconbtn" data-nav="settings" aria-label="Einstellungen">${ic('gear')}</button></div>
    <div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="row" style="gap:14px">${avatar(so.avatar, so.name || S.profile.name, 72)}<div class="grow" style="min-width:0"><div style="font-weight:800;font-size:20px">${esc(so.name || S.profile.name || 'Ohne Namen')}</div><div class="cap">${GOALS[S.profile.goal]}${S.pro ? ' · Pro' : ''}</div></div></div>
      ${so.bio ? `<p translate="no" style="margin:0;white-space:pre-wrap">${esc(so.bio)}</p>` : '<p class="muted" style="margin:0">Noch keine Beschreibung.</p>'}
      <div class="stats3"><div><span class="cap">Trainings</span><b>${wk}</b></div><div><span class="cap">Volumen</span><b>${fmt1(tot / 1000)} t</b></div><div><span class="cap">Folge ich</span><b>${S.following.length}</b></div></div>
      <button class="btn btn-s" data-act="editprofile">${ic('edit', 18)} Profil bearbeiten</button></div>
    <div class="grid2"><button class="btn btn-s" data-nav="stats">${ic('trophy', 20)} Statistiken &amp; Rekorde</button><button class="btn btn-s" data-nav="calendar">${ic('cal', 20)} Kalender</button></div>
    <div class="lbl">Fortschritt</div>${progressHTML()}`;
}
function vSettings() {
  const p = S.profile, g = baseTargets(), d = S.design, cd = cycleDelta();
  return `<div class="row"><button class="iconbtn" data-nav="profile" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Einstellungen</h1></div>
    <div class="card"><div class="lbl">Ziele</div><div class="cap" style="margin-top:4px">${GOALS[p.goal]} · ${p.age} Jahre · ${p.height} cm · ${fmt1(p.weight)} kg · ${p.days}× ${p.duration} min · ${EXP[p.experience].split(' (')[0]} · ${p.location === 'home' ? 'zu Hause' : 'Studio'} · ${DIETS[p.diet]}${(p.allergies || []).length ? ' · ohne ' + p.allergies.map(a => ALLERGENS[a]).join(', ') : ''}</div>
      <div class="cap" style="margin-top:6px">Tagesziel ${fmt(g.kcal)} kcal · ${g.p} g Protein · ${g.c} g Kohlenhydrate · ${g.f} g Fett · ${fmt1(g.water / 1000)} l Wasser</div>
      <button class="btn btn-s btn-block" data-act="redo" style="margin-top:12px">Fragen erneut beantworten</button></div>
    <div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">${L('Smarter Coach', 'Smart coach')}</div>
      <button class="sel" data-sm="cycleinfo" style="border:0;background:transparent;padding:0;text-align:left;width:100%"><div class="grow"><div style="font-weight:600">${L('Ziele passend zum Tag', 'Targets that fit the day')}</div><div class="cap">${S.smart.cycle && cd.up ? L(`Training ${fmt(g.kcal + cd.up)} kcal · Ruhe ${fmt(g.kcal - cd.down)} kcal · ${trainWeekdays().length} Trainingstage`, `Training ${fmt(g.kcal + cd.up)} kcal · rest ${fmt(g.kcal - cd.down)} kcal · ${trainWeekdays().length} training days`) : L('Aus', 'Off')}</div></div>${ic('next', 18)}</button>
      <button class="sel" data-sm="checkin" style="border:0;background:transparent;padding:0;text-align:left;width:100%"><div class="grow"><div style="font-weight:600">${L('Wöchentlicher Check-in', 'Weekly check-in')}</div><div class="cap">${S.smart.adj ? L(`Bisher angepasst: ${sgn(S.smart.adj)} kcal`, `Adjusted so far: ${sgn(S.smart.adj)} kcal`) : L('Noch keine Anpassung', 'No adjustment yet')}</div></div>${ic('next', 18)}</button>
      ${S.smart.adj ? `<button class="btn btn-g" data-sm="adjreset" style="align-self:flex-start">${L('Anpassungen zurücksetzen', 'Reset adjustments')}</button>` : ''}</div>
    ${accountCardSettings()}
    <div class="card"><div class="lbl" style="margin-bottom:8px">Sprache</div><div class="seg" role="radiogroup" translate="no"><button class="${S.lang !== 'en' ? 'on' : ''}" data-lang="de">Deutsch</button><button class="${S.lang === 'en' ? 'on' : ''}" data-lang="en">English</button></div></div>
    <div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="lbl">Design</div>
      <div class="field"><span class="cap">Modus</span>${segm('theme', [['system','System'],['light','Hell'],['dark','Dunkel']], d.theme)}</div>
      <div class="field"><span class="cap">Akzentfarbe</span>${swatches()}</div>
      <div class="field"><span class="cap">Textgröße</span>${segm('size', [['s','Klein'],['m','Normal'],['l','Groß']], d.size)}</div>
      <div class="field"><span class="cap">Ecken</span>${segm('corners', [['round','Rund'],['square','Kantig']], d.corners)}</div>
      <div class="field"><span class="cap">Kalorienring zeigt</span>${segm('ring', [['left','Übrig'],['eaten','Gegessen']], d.ring)}</div></div>
    <div class="card"><div class="lbl" style="margin-bottom:4px">Erinnerungen</div>${[['training','Training an Trainingstagen'],['meals','Mahlzeiten eintragen'],['water','Wasser trinken']].map(([k, l]) => `<div class="sel"><div class="grow">${l}</div><button class="toggle ${S.reminders[k] ? 'on' : ''}" data-rem="${k}" role="switch" aria-checked="${!!S.reminders[k]}" aria-label="${l}"></button></div>`).join('')}<div class="cap">Push-Mitteilungen kommen mit der App.</div></div>
    ${aboCardHTML() || `<div class="card"><div class="row" style="justify-content:space-between"><div><div class="lbl">Abo</div><div class="cap">${S.pro ? 'Pro (Demo aktiv) · werbefrei' : 'Free · mit Werbebannern'}</div></div>${S.pro ? `<button class="btn btn-s btn-sm" data-act="unpro">Zurück zu Free</button>` : `<button class="btn btn-p btn-sm" data-act="paywall">Pro ansehen</button>`}</div></div>`}
    <div class="card"><div class="lbl">Datenschutz</div><ul class="steps muted" style="margin-top:6px">
      <li>Übungsvideos sind Animationen, die direkt im Prototyp laufen. Es werden keine Videos von YouTube oder anderen Anbietern geladen.</li>
      <li>Fotos gehen nur zur Analyse an die KI, wenn du sie auswählst, und werden dafür nicht gespeichert.</li>
      <li>Deine Ernährungs-, Trainings- und Körperdaten sind privat. In der Community sichtbar ist nur, was du selbst teilst: Profil und geteilte Workouts.</li>
      <li>Die Werbebanner sind Platzhalter. In der App gibt es personalisierte Werbung nur mit deiner Einwilligung.</li></ul></div>
    <button class="btn btn-d btn-block" data-act="reset">Alle Daten löschen</button>`;
}

/* ---------- Streaks, calendar, statistics (v3) ---------- */
const LOC = () => (S && S.lang === 'en') ? 'en-GB' : 'de-DE';
function logStreak() {
  const d = new Date(); if (!hasLog(dayKey(d)) && !trainedOn(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0; while (hasLog(dayKey(d)) || trainedOn(dayKey(d))) { n++; d.setDate(d.getDate() - 1); if (n > 999) break; }
  return n;
}
function weekStreak() {
  const has = new Set(S.workouts.map(w => weekKey(new Date(w.start))));
  const d = new Date(); if (!has.has(weekKey(d))) d.setDate(d.getDate() - 7);
  let n = 0; while (has.has(weekKey(d))) { n++; d.setDate(d.getDate() - 7); if (n > 520) break; }
  return n;
}
function updateBest() { const a = logStreak(), b = weekStreak(); S.best = S.best || { days: 0, weeks: 0 }; let ch = false; if (a > S.best.days) { S.best.days = a; ch = true; } if (b > S.best.weeks) { S.best.weeks = b; ch = true; } if (ch) save(); }
function streakCard() {
  updateBest();
  const ds = logStreak(), ws = weekStreak(), mon = new Date(weekKey() + 'T12:00:00'), names = ['Mo','Di','Mi','Do','Fr','Sa','So'];
  const cells = names.map((nm, i) => { const x = new Date(mon); x.setDate(mon.getDate() + i); const k = dayKey(x), tr = trainedOn(k), lg = hasLog(k), fut = k > dayKey(), td = k === dayKey();
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1"><span class="cap" style="${td ? 'color:var(--ink);font-weight:700' : ''}">${nm}</span><span style="width:28px;height:28px;border-radius:50%;display:grid;place-items:center;${tr ? 'background:var(--ember);color:var(--on-ember)' : lg ? 'background:var(--ember-soft);color:var(--ember-ink)' : 'border:1.5px ' + (fut ? 'dashed' : 'solid') + ' var(--line)'}">${tr ? ic('db', 16) : lg ? ic('check', 14) : ''}</span></div>`; }).join('');
  return `<div class="card" data-nav="calendar" style="cursor:pointer;display:flex;flex-direction:column;gap:12px">
    <div class="row" style="gap:12px;align-items:flex-start"><div class="row grow" style="gap:8px"><span style="color:var(--ember)">${ic('flame', 26)}</span><div><div class="disp num" style="font-size:22px;line-height:24px">${ds} ${ds === 1 ? 'Tag' : 'Tage'}</div><div class="cap">Tracking-Streak</div></div></div><div class="row grow" style="gap:8px"><span style="color:var(--ember)">${ic('db', 26)}</span><div><div class="disp num" style="font-size:22px;line-height:24px">${ws} ${ws === 1 ? 'Woche' : 'Wochen'}</div><div class="cap">Trainings-Streak</div></div></div>${infoBtn('streak')}</div>
    <div class="row" style="gap:4px">${cells}</div>
    <div class="cap">${ds === 0 ? 'Trag heute etwas ein, um eine Streak zu starten.' : !hasLog(dayKey()) && !trainedOn(dayKey()) ? 'Trag heute noch etwas ein, sonst endet deine Streak.' : `Rekord: ${S.best.days} Tage und ${S.best.weeks} Wochen am Stück.`}</div></div>`;
}
let calMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function dayStatus(k) { const d = S.days[k]; if (!d) return ''; const t = dayTotals(d); if (!t.kcal) return ''; const r = t.kcal / dayTargets(k).kcal; return r >= 0.9 && r <= 1.1 ? 'good' : 'off'; }
function vCalendar() {
  const y = calMonth.getFullYear(), m = calMonth.getMonth(), first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate(), off = (first.getDay() + 6) % 7, todayK = dayKey();
  let cells = ''; for (let i = 0; i < off; i++) cells += '<div></div>';
  let trained = 0, logged = 0, onTarget = 0;
  for (let i = 1; i <= days; i++) {
    const k = `${y}-${pad(m + 1)}-${pad(i)}`, tr = trainedOn(k), st = dayStatus(k), fut = k > todayK;
    if (tr) trained++; if (st) logged++; if (st === 'good') onTarget++;
    cells += `<button class="calday ${k === todayK ? 'today' : ''} ${tr ? 'tr' : ''}" data-day="${k}" ${fut ? 'disabled' : ''} aria-label="${new Date(k + 'T12:00:00').toLocaleDateString(LOC(), { day: 'numeric', month: 'long' })}"><span>${i}</span><i class="dots">${tr ? '<b class="d-tr"></b>' : ''}${st ? `<b class="d-${st}"></b>` : ''}</i></button>`;
  }
  const isNow = y === new Date().getFullYear() && m === new Date().getMonth();
  return `<div class="row"><button class="iconbtn" data-nav="home" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Kalender</h1></div>
    <div class="card"><div class="row" style="justify-content:space-between"><button class="iconbtn" data-calnav="-1" aria-label="Vorheriger Monat">${ic('back')}</button><div style="font-weight:800;font-size:18px">${first.toLocaleDateString(LOC(), { month: 'long', year: 'numeric' })}</div><button class="iconbtn" data-calnav="1" aria-label="Nächster Monat" ${isNow ? 'disabled style="opacity:.35"' : ''}>${ic('next')}</button></div>
      <div class="calgrid" style="margin-top:12px">${['Mo','Di','Mi','Do','Fr','Sa','So'].map(d => `<div class="cap" style="text-align:center">${d}</div>`).join('')}${cells}</div>
      <div class="row" style="gap:14px;flex-wrap:wrap;margin-top:12px"><span class="cap row" style="gap:6px"><b class="legend" style="background:var(--ember)"></b>Training</span><span class="cap row" style="gap:6px"><b class="legend" style="background:var(--good)"></b>Kalorienziel ±10 %</span><span class="cap row" style="gap:6px"><b class="legend" style="background:var(--warning)"></b>Daneben</span></div></div>
    <div class="card stats3"><div><span class="cap">Trainings</span><b class="disp" style="font-size:22px">${trained}</b></div><div><span class="cap">Tage getrackt</span><b class="disp" style="font-size:22px">${logged}</b></div><div><span class="cap">Im Ziel</span><b class="disp" style="font-size:22px">${onTarget}</b></div></div>
    ${streakCard()}
    <p class="cap" style="margin:0">Tippe auf einen Tag, um Essen und Training zu sehen oder nachzutragen.</p>`;
}
function daySheet(k) {
  const d = S.days[k], t = dayTotals(d), g = dayTargets(k), ws = S.workouts.filter(w => dayKey(new Date(w.start)) === k), date = new Date(k + 'T12:00:00');
  const meals = d ? SLOTS.map(([s, l]) => [l, d.meals[s] || []]).filter(x => x[1].length) : [];
  openSheet(`<div class="row" style="justify-content:space-between"><div><div class="cap">${date.toLocaleDateString(LOC(), { weekday: 'long' })}</div><h2 class="disp">${date.toLocaleDateString(LOC(), { day: 'numeric', month: 'long', year: 'numeric' })}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <div class="card"><div class="row" style="justify-content:space-between"><div class="lbl">Ernährung</div><span class="num">${fmt(t.kcal)} / ${fmt(g.kcal)} kcal</span></div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">${macroRow('Protein','p-bg',t.p,g.p)}${macroRow('Carbs','c-bg',t.c,g.c)}${macroRow('Fett','f-bg',t.f,g.f)}</div>
      <div class="cap" style="margin-top:10px">Wasser ${fmt1(((d && d.water) || 0) / 1000)} von ${fmt1(g.water / 1000)} l</div>
      ${meals.length ? meals.map(([l, items]) => `<div style="margin-top:10px"><div class="cap" style="font-weight:700">${l}</div>${items.map(e => `<div class="row" style="justify-content:space-between"><span>${esc(e.name)}</span><span class="num muted">${fmt(e.kcal)} kcal</span></div>`).join('')}</div>`).join('') : '<div class="cap" style="margin-top:10px">An diesem Tag ist kein Essen eingetragen.</div>'}
      <button class="btn btn-s btn-block" style="margin-top:12px" data-editday>${ic('edit', 18)} Essen ${meals.length ? 'bearbeiten' : 'nachtragen'}</button></div>
    <div class="card"><div class="lbl">Training</div>${ws.length ? `<ul class="list">${ws.map(w => `<li data-wd2="${w.id}" style="cursor:pointer"><div class="grow"><div style="font-weight:600">${esc(w.name)}</div><div class="cap">${dur(wDur(w))} · ${doneCount(w)} Sätze${w.gym ? ' · ' + esc(w.gym) : ''}</div></div><span class="num" style="font-weight:700">${fmt(volume(w))} kg</span></li>`).join('')}</ul>` : '<div class="cap" style="margin-top:6px">Ruhetag.</div>'}</div>`, sh => sh.addEventListener('click', ev => {
      if (ev.target.closest('[data-editday]')) { closeSheet(); foodKey = k === dayKey() ? null : k; view = 'food'; render(); window.scrollTo(0, 0); return; }
      const w = ev.target.closest('[data-wd2]'); if (w) { closeSheet(); workoutDetail(w.dataset.wd2); }
    }));
}
const REC = { kg: 'Schwerstes Gewicht', e1rm: 'Bestes geschätztes Maximum (1RM)', vol: 'Bester Satz (kg × Wdh.)', reps: 'Meiste Wiederholungen' };
const recVal = r => r.kind === 'reps' ? `${r.value} Wdh.` : r.kind === 'vol' ? `${fmt(r.value)} kg` : `${fmt1(r.value)} kg`;
function exRecords(exId, workouts) {
  const o = { kg: 0, e1rm: 0, vol: 0, reps: 0, sessions: 0, best: null, hist: [] };
  for (const w of workouts || S.workouts) { const x = w.exercises.find(e => e.exId === exId); if (!x) continue; const sets = x.sets.filter(s => (s.done !== false) && s.type !== 'w' && s.reps > 0); if (!sets.length) continue;
    o.sessions++; let be = 0, bs = null;
    for (const s of sets) { o.kg = Math.max(o.kg, s.kg); o.reps = Math.max(o.reps, s.reps); o.vol = Math.max(o.vol, s.kg * s.reps); const v = e1rm(s); if (v > be) { be = v; bs = s; } }
    if (be > o.e1rm) { o.e1rm = be; o.best = bs; }
    o.hist.push({ d: w.start, e1rm: be, set: bs, n: sets.length, id: w.id }); }
  return o;
}
function findRecords(a) {
  const out = [];
  for (const x of a.exercises) { const before = exRecords(x.exId, S.workouts); if (!before.sessions) continue; const now = exRecords(x.exId, [{ exercises: [{ exId: x.exId, sets: x.sets.filter(s => s.done) }], start: a.start }]);
    for (const k of ['kg', 'e1rm', 'vol', 'reps']) if (now[k] > before[k] + 1e-9) out.push({ exId: x.exId, kind: k, value: k === 'e1rm' ? r1(now[k]) : now[k] }); }
  return out;
}
function muscleSets(workouts) { const m = {}; for (const w of workouts) for (const x of w.exercises) { const mu = exOf(x.exId).muscle; if (!mu) continue; const n = x.sets.filter(s => s.done !== false && s.type !== 'w').length; if (n) m[mu] = (m[mu] || 0) + n; } return m; }
function lineChart(vals, labels, unit) {
  if (vals.length < 2) return '<div class="cap">Nach zwei Einheiten erscheint hier dein Verlauf.</div>';
  const W = 340, H = 140, mn = Math.min(...vals), mx = Math.max(...vals), span = (mx - mn) || 1;
  const pts = vals.map((v, i) => [16 + i * (W - 32) / (vals.length - 1), 14 + (H - 38) * (1 - (v - mn) / span)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' '), lp = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Verlauf"><line x1="16" x2="${W-16}" y1="${H-24}" y2="${H-24}" stroke="var(--line)"/><path d="${path}" fill="none" stroke="var(--ember)" stroke-width="2.5" stroke-linejoin="round"/>${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="var(--ember)"/>`).join('')}<circle cx="${lp[0]}" cy="${lp[1]}" r="5.5" fill="var(--ember)"/><text x="16" y="${H-8}" font-size="11" fill="var(--ink-muted)">${labels[0]}</text><text x="${W-16}" y="${H-8}" font-size="11" fill="var(--ink-muted)" text-anchor="end">${labels[labels.length - 1]}</text><text x="${W-16}" y="${Math.max(12, lp[1] - 10)}" font-size="12" font-weight="700" fill="var(--ink)" text-anchor="end">${fmt1(vals[vals.length - 1])} ${unit}</text></svg>`;
}
function exStatsSheet(id) {
  const r = exRecords(id), e = exOf(id), h = r.hist.slice(-12);
  openSheet(`<div class="row" style="justify-content:space-between"><div><div class="cap">${esc(e.muscle)} · ${r.sessions} Einheiten</div><h2 class="disp">${esc(e.name)}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <div class="grid2">${['kg', 'e1rm', 'vol', 'reps'].map(k => `<div class="card"><div class="cap">${REC[k]}</div><div class="disp num" style="font-size:22px">${recVal({ kind: k, value: k === 'e1rm' ? r1(r[k]) : r[k] })}</div></div>`).join('')}</div>
    <div class="card"><div class="row lbl" style="margin-bottom:8px;justify-content:space-between">Geschätztes Maximum (1RM) pro Einheit ${infoBtn('onerm')}</div>${lineChart(h.map(x => x.e1rm), h.map(x => new Date(x.d).toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })), 'kg')}</div>
    <div class="card"><div class="lbl">Verlauf</div><ul class="list">${[...r.hist].reverse().slice(0, 10).map(x => `<li><div class="grow"><div style="font-weight:600">${new Date(x.d).toLocaleDateString(LOC(), { weekday: 'short', day: 'numeric', month: 'short' })}</div><div class="cap">${x.n} Arbeitssätze</div></div><span class="num" style="font-weight:700">${fmt1(x.set.kg)} kg × ${x.set.reps}</span></li>`).join('')}</ul></div>
    <p class="cap" style="margin:0">Das 1RM ist geschätzt (Epley-Formel) und kein Test. Aufwärmsätze zählen nicht.</p>`);
}
function vStats() {
  const W = S.workouts, tot = W.reduce((a, w) => a + volume(w), 0), sets = W.reduce((a, w) => a + doneCount(w), 0), time = W.reduce((a, w) => a + wDur(w), 0);
  const now = new Date(), mk = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`, thisM = mk(now), lastM = mk(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const inM = k => W.filter(w => mk(new Date(w.start)) === k);
  const ws = S.weights, cur = ws.length ? ws[ws.length - 1].kg : S.profile.weight, start = ws.length ? ws[0].kg : cur;
  const hi = ws.length ? ws.reduce((a, b) => b.kg > a.kg ? b : a) : null, lo = ws.length ? ws.reduce((a, b) => b.kg < a.kg ? b : a) : null;
  const ago30 = (() => { const k = dayKey(new Date(Date.now() - 30 * 864e5)); const old = ws.filter(w => w.d <= k); return old.length ? old[old.length - 1].kg : null; })();
  const tw = num(S.profile.targetWeight), goalPct = tw && start !== tw ? Math.max(0, Math.min(100, (start - cur) / (start - tw) * 100)) : null;
  const ids = [...new Set(W.flatMap(w => w.exercises.map(x => x.exId)))].map(id => [id, exRecords(id)]).filter(x => x[1].sessions).sort((a, b) => b[1].e1rm - a[1].e1rm);
  const musc = muscleSets(W.filter(w => w.start > Date.now() - 30 * 864e5)), mmax = Math.max(1, ...Object.values(musc));
  const last7 = []; for (let i = 0; i < 7; i++) { const k = dayKey(new Date(Date.now() - i * 864e5)); const t = dayTotals(S.days[k]); if (t.kcal) last7.push(t); }
  const avg = f => last7.length ? last7.reduce((a, t) => a + t[f], 0) / last7.length : 0;
  const dt = d => new Date(d + 'T12:00:00').toLocaleDateString(LOC(), { day: 'numeric', month: 'short', year: '2-digit' });
  const delta = (a, b) => `${a - b > 0 ? '+' : a - b < 0 ? '−' : '±'}${fmt1(Math.abs(a - b))}`;
  return `<div class="row"><button class="iconbtn" data-nav="profile" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Statistiken</h1></div>
    <div class="lbl">Training gesamt</div>
    <div class="grid2"><div class="card"><div class="cap">Trainings</div><div class="disp" style="font-size:24px">${W.length}</div><div class="cap">${inM(thisM).length} diesen Monat · ${inM(lastM).length} letzten</div></div><div class="card"><div class="cap">Bewegtes Gewicht</div><div class="disp" style="font-size:24px">${fmt1(tot / 1000)} t</div><div class="cap">${fmt1(inM(thisM).reduce((a, w) => a + volume(w), 0) / 1000)} t diesen Monat</div></div>
      <div class="card"><div class="cap">Sätze</div><div class="disp" style="font-size:24px">${fmt(sets)}</div></div><div class="card"><div class="cap">Trainingszeit</div><div class="disp" style="font-size:24px">${dur(time)}</div><div class="cap">Ø ${W.length ? dur(time / W.length) : '–'} pro Training</div></div></div>
    <div class="grid2"><div class="card"><div class="cap">Längste Tracking-Streak</div><div class="disp" style="font-size:24px">${S.best.days} Tage</div><div class="cap">aktuell ${logStreak()}</div></div><div class="card"><div class="cap">Längste Trainings-Streak</div><div class="disp" style="font-size:24px">${S.best.weeks} Wo.</div><div class="cap">aktuell ${weekStreak()}</div></div></div>
    <div class="lbl" style="margin-top:4px">Körpergewicht</div>
    <div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="cap">Aktuell</div><div class="disp" style="font-size:30px;line-height:32px">${fmt1(cur)} <span class="cap">kg</span></div></div><span class="tag">${delta(cur, start)} kg seit Start</span></div>
      <div class="stats3"><div><span class="cap">Höchstwert</span><b>${hi ? fmt1(hi.kg) + ' kg' : '–'}</b><span class="cap">${hi ? dt(hi.d) : ''}</span></div><div><span class="cap">Tiefstwert</span><b>${lo ? fmt1(lo.kg) + ' kg' : '–'}</b><span class="cap">${lo ? dt(lo.d) : ''}</span></div><div><span class="cap">30 Tage</span><b>${ago30 !== null ? delta(cur, ago30) + ' kg' : '–'}</b></div></div>
      ${goalPct !== null ? `<div><div class="row" style="justify-content:space-between"><span class="cap">Ziel ${fmt1(tw)} kg</span><span class="cap num">${r0(goalPct)} %</span></div><div style="height:8px;background:var(--surface-2);border-radius:99px;overflow:hidden;margin-top:6px"><div style="height:100%;width:${goalPct}%;background:var(--good)"></div></div></div>` : '<div class="cap">Leg in den Einstellungen ein Wunschgewicht fest, dann siehst du hier deinen Fortschritt.</div>'}</div>
    <div class="lbl" style="margin-top:4px">Highscores</div>
    <div class="card" style="padding-top:4px;padding-bottom:4px">${ids.length ? `<ul class="list">${ids.map(([id, r], i) => `<li data-exstats="${id}" style="cursor:pointer"><span class="rank ${i < 3 ? 'top' : ''}">${i + 1}</span><div class="grow" style="min-width:0"><div style="font-weight:600">${esc(exOf(id).name)}</div><div class="cap">max. ${fmt1(r.kg)} kg · bester Satz ${fmt1(r.best.kg)} × ${r.best.reps}</div></div><div style="text-align:right"><div class="num" style="font-weight:800">${fmt1(r.e1rm)} kg</div><div class="cap">1RM geschätzt</div></div></li>`).join('')}</ul>` : '<div class="empty">Nach deinem ersten Training stehen hier deine Bestwerte pro Übung.</div>'}</div>
    <div class="lbl" style="margin-top:4px">Sätze pro Muskelgruppe (30 Tage)</div>
    <div class="card">${Object.keys(musc).length ? Object.entries(musc).sort((x, y) => y[1] - x[1]).map(([m, n]) => `<div class="row" style="gap:10px;margin-bottom:8px"><span style="width:84px;font-size:14px">${esc(m)}</span><div class="grow" style="height:10px;background:var(--surface-2);border-radius:99px;overflow:hidden"><div style="height:100%;width:${n / mmax * 100}%;background:var(--ember)"></div></div><span class="num cap" style="width:30px;text-align:right">${n}</span></div>`).join('') : '<div class="cap">Noch keine Trainings in den letzten 30 Tagen.</div>'}</div>
    <div class="lbl" style="margin-top:4px">Ernährung (letzte 7 Tage)</div>
    <div class="card stats3"><div><span class="cap">Ø Kalorien</span><b>${last7.length ? fmt(avg('kcal')) : '–'}</b><span class="cap">Ziel ${fmt(baseTargets().kcal)}</span></div><div><span class="cap">Ø Protein</span><b>${last7.length ? fmt(avg('p')) + ' g' : '–'}</b><span class="cap">Ziel ${S.targets.p} g</span></div><div><span class="cap">Getrackt</span><b>${last7.length} / 7</b><span class="cap">Tage</span></div></div>`;
}

function setLang(l) { S.lang = l === 'en' ? 'en' : 'de'; save(); applyLang(); }
const isEN = () => S.lang === 'en';
/* ---------- Events ---------- */
async function onClick(e) {
  const t = e.target.closest('[data-nuttab],[data-nutrange],[data-nutnav],[data-info],[data-rpreview],[data-mptab],[data-recipe],[data-mpeat],[data-shop],[data-prepdone],[data-mpk],[data-mpc],[data-entry],[data-addslot],[data-lang],[data-foodnav],[data-calnav],[data-day],[data-exstats],[data-nav],[data-act],[data-del],[data-ex],[data-lm],[data-le],[data-seg],[data-accent],[data-rem],[data-done],[data-addset],[data-wtype],[data-wrest],[data-xmenu],[data-start],[data-rmenu],[data-rx-up],[data-rx-down],[data-rx-del],[data-rrest],[data-rtype],[data-rdelset],[data-raddset],[data-wdetail],[data-ctab],[data-follow],[data-person],[data-post],[data-prevfill]');
  if (!t) return;
  const d = t.dataset;
  if (d.nav) { if (view === 'routine') readRoutine(); if (!['food', 'calendar', 'nutrition'].includes(d.nav)) foodKey = null; view = d.nav; render(); window.scrollTo(0, 0); return; }
  if (d.ex) { showExercise(d.ex); return; }
  if (d.foodnav !== undefined) { const v = +d.foodnav; if (!v) foodKey = null; else { const x = new Date((foodKey || dayKey()) + 'T12:00:00'); x.setDate(x.getDate() + v); const k = dayKey(x); foodKey = k >= dayKey() ? null : k; } render(); return; }
  if (d.calnav !== undefined) { const v = +d.calnav; calMonth = v ? new Date(calMonth.getFullYear(), calMonth.getMonth() + v, 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1); render(); return; }
  if (d.day) { daySheet(d.day); return; }
  if (d.addslot) { slotSheet(d.addslot); return; }
  if (d.info) { infoSheet(d.info); return; }
  if (d.nuttab) { nutTab = d.nuttab; render(); return; }
  if (d.nutrange) { nutRange = d.nutrange; render(); return; }
  if (d.nutnav) { const x = new Date((foodKey || dayKey()) + 'T12:00:00'); x.setDate(x.getDate() + (+d.nutnav) * (nutRange === 'week' ? 7 : 1)); const k = dayKey(x); foodKey = k >= dayKey() ? null : k; render(); return; }
  if (d.rpreview) { routinePreview(d.rpreview); return; }
  if (d.mptab) { mpTab = d.mptab; render(); return; }
  if (d.recipe) { recipeSheet(d.recipe); return; }
  if (d.mpeat) { const [di, mi] = d.mpeat.split(':').map(Number), m = S.mealPlan.days[di].meals[mi], r = mpRecipe(m.recipe), dd = dayOf(S.mealPlan.days[di].key);
    if (!m.eaten) { if (S.mealPlan.days[di].key > dayKey()) { toast('Du kannst nur heute oder vergangene Tage eintragen'); return; } dd.meals[m.slot].push({ id: uid(), name: r.name, grams: 0, kcal: r0(r.kcal), p: r1(r.protein), c: r1(r.carbs), f: r1(r.fat), ...(r.fiber !== undefined ? { fib: r1(r.fiber) } : {}), src: 'plan', mp: r.id }); m.eaten = true; toast(`${r.name} eingetragen`); }
    else { const arr = dd.meals[m.slot], i = arr.findIndex(x => x.mp === r.id); if (i >= 0) arr.splice(i, 1); m.eaten = false; toast('Eintrag entfernt'); }
    save(); render(); return; }
  if (d.shop !== undefined && view === 'mealplan') { const s = S.mealPlan.shopping[+d.shop]; s.done = !s.done; save(); render(); return; }
  if (d.prepdone !== undefined) { const s = S.mealPlan.prep[+d.prepdone]; s.done = !s.done; save(); render(); return; }
  if ((d.mpk || d.mpc) && view === 'mealplan') { const p = mpDraft || (mpDraft = mpPrefs()); const di = $('#mp-dis'); if (di) p.dislikes = di.value; if (d.mpk) p[d.mpk] = ['days', 'meals', 'time', 'people'].includes(d.mpk) ? Number(d.v) : d.v; else { const i = p.cuisines.indexOf(d.mpc); i >= 0 ? p.cuisines.splice(i, 1) : p.cuisines.push(d.mpc); } render(); return; }
  if (d.entry) { const [sl, id] = d.entry.split(':'); entrySheet(sl, id); return; }
  if (d.exstats) { exStatsSheet(d.exstats); return; }
  if (d.lm) { libFilter.m = d.lm; render(); return; }
  if (d.le) { libFilter.e = d.le; render(); return; }
  if (d.lang) { setLang(d.lang); render(); return; }
  if (d.seg) { S.design[d.seg] = d.v; save(); applyDesign(); render(); return; }
  if (d.accent) { S.design.accent = d.accent; save(); applyDesign(); render(); return; }
  if (d.rem) { S.reminders[d.rem] = !S.reminders[d.rem]; save(); render(); return; }
  if (d.del) { const [slot, id] = d.del.split(':'); const day = foodDay(); day.meals[slot] = day.meals[slot].filter(x => x.id !== id); save(); render(); toast('Eintrag gelöscht'); return; }
  if (d.start) { startWorkout(d.start); return; }
  if (d.rmenu) { routineMenu(d.rmenu); return; }
  if (d.wdetail) { workoutDetail(d.wdetail); return; }
  if (d.ctab) { communityTab = d.ctab; render(); return; }
  if (d.follow) { toggleFollow(d.follow); return; }
  if (d.person) { personSheet(d.person); return; }
  if (d.post) { openPost(d.post); return; }
  // active workout
  if (d.prevfill) { const [xi, si] = d.prevfill.split(':').map(Number), x = S.active.exercises[xi], ps = prevSets(x.exId, S.active.id); if (ps && ps[si]) { x.sets[si].kg = ps[si].kg; x.sets[si].reps = ps[si].reps; save(); render(); } return; }
  if (d.done) { const [xi, si] = d.done.split(':').map(Number); const x = S.active.exercises[xi], s = x.sets[si], ps = prevSets(x.exId, S.active.id);
    if (!s.done) { const prevSet = x.sets.slice(0, si).reverse().find(q => q.kg); if (!s.kg) s.kg = ps && ps[si] ? ps[si].kg : prevSet ? prevSet.kg : 0; if (!s.reps) s.reps = ps && ps[si] ? ps[si].reps : prevSet && prevSet.reps ? prevSet.reps : (parseInt(x.target) || 10); s.done = true; startRest(x.rest); try { navigator.vibrate && navigator.vibrate(20); } catch (er) {} }
    else s.done = false; save(); render(); return; }
  if (d.addset) { const x = S.active.exercises[+d.addset], prev = x.sets[x.sets.length - 1]; x.sets.push({ type: 'n', kg: prev ? prev.kg : 0, reps: prev ? prev.reps : 0, done: false }); save(); render(); return; }
  if (d.wtype) { const [xi, si] = d.wtype.split(':').map(Number); setTypeSheet(S.active.exercises, xi, si, () => { save(); render(); }); return; }
  if (d.wrest) { const x = S.active.exercises[+d.wrest]; x.rest = RESTS[(RESTS.indexOf(x.rest) + 1) % RESTS.length]; save(); render(); return; }
  if (d.xmenu) { const xi = +d.xmenu, xs = S.active.exercises; openSheet(`<h2 class="disp">${esc(exOf(xs[xi].exId).name)}</h2><div style="display:flex;flex-direction:column;gap:8px"><button class="btn btn-s btn-block" data-xm="swap">${ic('swap', 18)} Übung ersetzen</button><button class="btn btn-s btn-block" data-xm="up">${ic('up', 18)} Nach oben</button><button class="btn btn-s btn-block" data-xm="down">${ic('down', 18)} Nach unten</button><button class="btn btn-d btn-block" data-xm="del">${ic('trash', 18)} Übung entfernen</button></div>`, sh => sh.addEventListener('click', ev => {
      const b = ev.target.closest('[data-xm]'); if (!b) return; closeSheet(); const a = b.dataset.xm;
      if (a === 'swap') pickExercises(ids => { const ps = prevSets(ids[0]); xs[xi].exId = ids[0]; xs[xi].sets = xs[xi].sets.map((s, i) => ({ type: s.type, kg: ps && ps[i] ? ps[i].kg : 0, reps: s.reps, done: false })); save(); render(); }, true);
      if (a === 'up' && xi > 0) { [xs[xi - 1], xs[xi]] = [xs[xi], xs[xi - 1]]; }
      if (a === 'down' && xi < xs.length - 1) { [xs[xi + 1], xs[xi]] = [xs[xi], xs[xi + 1]]; }
      if (a === 'del') xs.splice(xi, 1);
      save(); render(); })); return; }
  // routine editor
  if (d.rxUp || d.rxDown || d.rxDel || d.rrest || d.rtype || d.rdelset || d.raddset) readRoutine();
  if (d.rxUp) { const i = +d.rxUp; if (i > 0) [R.exercises[i - 1], R.exercises[i]] = [R.exercises[i], R.exercises[i - 1]]; render(); return; }
  if (d.rxDown) { const i = +d.rxDown; if (i < R.exercises.length - 1) [R.exercises[i + 1], R.exercises[i]] = [R.exercises[i], R.exercises[i + 1]]; render(); return; }
  if (d.rxDel) { R.exercises.splice(+d.rxDel, 1); render(); return; }
  if (d.rrest) { const x = R.exercises[+d.rrest]; x.rest = RESTS[(RESTS.indexOf(x.rest) + 1) % RESTS.length]; render(); return; }
  if (d.rtype) { const [xi, si] = d.rtype.split(':').map(Number); setTypeSheet(R.exercises, xi, si, render); return; }
  if (d.rdelset) { const [xi, si] = d.rdelset.split(':').map(Number); if (R.exercises[xi].sets.length > 1) R.exercises[xi].sets.splice(si, 1); render(); return; }
  if (d.raddset) { const x = R.exercises[+d.raddset], prev = x.sets[x.sets.length - 1]; x.sets.push({ type: 'n', kg: prev ? prev.kg : 0, reps: prev ? prev.reps : 10 }); render(); return; }
  switch (d.act) {
    case 'plus': openSheet(`<h2 class="disp">Hinzufügen</h2><div style="display:flex;flex-direction:column;gap:10px">
      <button class="btn btn-p btn-block" data-q="photo">${ic('cam', 20)} Essen oder Wasser scannen</button>
      <button class="btn btn-s btn-block" data-q="barcode">${ic('barcode', 20)} Barcode scannen</button>
      <button class="btn btn-s btn-block" data-q="textfood">${ic('text', 20)} Mahlzeit beschreiben</button>
      <button class="btn btn-s btn-block" data-q="search">${ic('search', 20)} Lebensmittel suchen</button>
      <button class="btn btn-s btn-block" data-q="water">${ic('drop', 20)} 250 ml Wasser</button>
      <button class="btn btn-s btn-block" data-q="start">${ic('db', 20)} ${S.active ? 'Training fortsetzen' : 'Training starten'}</button>
      <button class="btn btn-s btn-block" data-q="weight">${ic('chart', 20)} Gewicht eintragen</button></div>`, sh => sh.addEventListener('click', ev => { const q = ev.target.closest('[data-q]'); if (!q) return; closeSheet(); const k = q.dataset.q; pendingSlot = null;
        if (k === 'photo') photoFlow(); else if (k === 'barcode') barcodeSheet(); else if (k === 'textfood') textFlow(); else if (k === 'search') searchSheet(); else if (k === 'water') { addWater(250); } else if (k === 'start') { S.active ? (view = 'workout', render()) : startWorkout(nextRoutine().id); } else { view = 'profile'; render(); setTimeout(() => { const i = $('#w-in'); if (i) { i.scrollIntoView({ block: 'center' }); i.focus(); } }, 60); } })); break;
    case 'photo': pendingSlot = null; photoFlow(); break;
    case 'barcode': pendingSlot = null; barcodeSheet(); break;
    case 'textfood': pendingSlot = null; textFlow(); break;
    case 'search': pendingSlot = null; searchSheet(); break;
    case 'water': addWater(250); break;
    case 'hidestart': S.hideStart = true; save(); render(); break;
    case 'hideinstall': S.hideInstall = true; save(); render(); break;
    case 'install': if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; render(); }); } break;
    case 'startnext': startWorkout(nextRoutine().id); break;
    case 'daynut': view = 'nutrition'; render(); window.scrollTo(0, 0); break;
    case 'mealplan': if (!S.pro) { paywall('Der KI-Ernährungsplan ist Teil von Pro.'); break; } view = 'mealplan'; render(); window.scrollTo(0, 0); break;
    case 'mpconfig': mpConfigSheet(); break;
    case 'mpgen': { const p = mpDraft || mpPrefs(); const di = $('#mp-dis'); p.dislikes = di ? di.value.trim() : ''; runMealPlan(p); break; }
    case 'shopreset': S.mealPlan.shopping.forEach(s => s.done = false); save(); render(); break;
    case 'empty': startWorkout(null); break;
    case 'resume': view = 'workout'; render(); window.scrollTo(0, 0); break;
    case 'finish': finishWorkout(); break;
    case 'pausew': { const w = S.active; if (!w) break; if (w.pausedAt) { w.pausedMs = (w.pausedMs || 0) + (Date.now() - w.pausedAt); w.pausedAt = null; toast('Training läuft weiter'); } else { w.pausedAt = Date.now(); stopRest(); toast('Training pausiert'); } save(); render(); break; }
    case 'wraddex': pickExercises(ids => { ids.forEach(id => { const n = newExEntry(id); n.sets.forEach(s => s.done = false); S.active.exercises.push(n); }); save(); render(); }); break;
    case 'cancelworkout': if (await confirmBox('Training verwerfen?', 'Alle Sätze dieser Einheit werden gelöscht.', 'Verwerfen', true)) { deletePhotos(S.active.photos || []); S.active = null; stopRest(); save(); view = 'train'; render(); } break;
    case 'newroutine': editRoutine(null); break;
    case 'raddex': readRoutine(); pickExercises(ids => { ids.forEach(id => R.exercises.push(newExEntry(id))); render(); }); break;
    case 'rcancel': R = null; view = 'train'; render(); break;
    case 'rsave': { readRoutine(); if (!R.name.trim()) { toast('Gib der Routine einen Namen'); $('#r-name').focus(); return; } if (!R.exercises.length) { toast('Füge mindestens eine Übung hinzu'); return; }
      if (R.id) S.routines = S.routines.map(x => x.id === R.id ? R : x); else { R.id = uid(); S.routines.push(R); } R = null; save(); view = 'train'; render(); toast('Routine gespeichert'); break; }
    case 'newex': customExSheet(); break;
    case 'addweight': { const v = r1(num($('#w-in').value)); if (v < 35 || v > 300) { toast('Bitte ein Gewicht zwischen 35 und 300 kg eingeben'); return; } const k = dayKey(); S.weights = S.weights.filter(w => w.d !== k); S.weights.push({ d: k, kg: v }); S.weights.sort((a, b) => a.d < b.d ? -1 : 1); S.profile.weight = v; save(); render(); toast('Gewicht gespeichert'); break; }
    case 'redo': ob = { step: 0, p: JSON.parse(JSON.stringify(S.profile)) }; S.profile = null; render(); break;
    case 'paywall': paywall(); break;
    case 'unpro': S.pro = false; save(); render(); break;
    case 'coach': coach(); break;
    case 'editprofile': editProfileSheet(); break;
    case 'refreshfeed': feed = null; feedState = 'idle'; loadFeed(); break;
    case 'invite': if (!S.social.name) { editProfileSheet(); toast('Leg zuerst dein Profil an, damit Freunde dich erkennen'); } else { publishProfile().catch(() => {}); shareInvite(); } break;
    case 'reset': if (await confirmBox('Alle Daten löschen?', 'Profil, Mahlzeiten, Trainings, Routinen und Gewicht werden gelöscht. Geteilte Workouts entfernen wir aus der Community.', 'Löschen', true)) {
      if (CB && UID) { try { await CB.deleteAll(); } catch (er) {} }
      if (loggedIn()) await deleteAllCloudPhotos(); clearLocalPhotos(); S = blank(); save(); applyDesign(); view = 'home'; render(); } break;
  }
}
function readRoutine() {
  if (!R) return; const n = $('#r-name'); if (n) R.name = n.value;
  document.querySelectorAll('[data-rnote]').forEach(el => R.exercises[+el.dataset.rnote].note = el.value);
  document.querySelectorAll('[data-rkg]').forEach(el => { const [xi, si] = el.dataset.rkg.split(':').map(Number); R.exercises[xi].sets[si].kg = r1(num(el.value)); });
  document.querySelectorAll('[data-rreps]').forEach(el => { const [xi, si] = el.dataset.rreps.split(':').map(Number); R.exercises[xi].sets[si].reps = Math.round(num(el.value)); });
}
function onChange(e) {
  const t = e.target;
  if (t.dataset.kg || t.dataset.reps) { const [xi, si] = (t.dataset.kg || t.dataset.reps).split(':').map(Number); const sets = S.active.exercises[xi].sets, s = sets[si];
    if (t.dataset.kg) { s.kg = Math.max(0, r1(num(t.value))); for (let j = si + 1; j < sets.length; j++) if (!sets[j].done && !sets[j].kg) { sets[j].kg = s.kg; const el = document.querySelector(`[data-kg="${xi}:${j}"]`); if (el) el.value = dec(s.kg); } } else s.reps = Math.max(0, Math.round(num(t.value))); save(); return; }
  if (t.dataset.wnote !== undefined) { S.active.exercises[+t.dataset.wnote].note = t.value.slice(0, 200); save(); return; }
  if (t.id === 'w-name') { S.active.name = t.value.trim().slice(0, 50) || 'Training'; save(); }
}
function onInput(e) { if (e.target.id === 'lib-q') { libFilter.q = e.target.value; const pos = e.target.selectionStart; render(); const i = $('#lib-q'); i.focus(); i.setSelectionRange(pos, pos); } }

/* ---------- Food flows ---------- */
function addWater(ml) { const d = view === 'food' ? foodDay() : today(); d.water = (d.water || 0) + ml; save(); render(); toast(`${fmt(ml)} ml Wasser hinzugefügt`); }
let pendingSlot = null;
function recentFor(slot) {
  const seen = new Set(), out = [], keys = Object.keys(S.days).sort().reverse();
  for (const k of keys) { for (const e of (S.days[k].meals[slot] || []).slice().reverse()) { const key = e.name.toLowerCase(); if (seen.has(key)) continue; seen.add(key); out.push(e); if (out.length >= 8) return out; } }
  return out;
}
/* ---------- Nutrients like MyFitnessPal (v5) ---------- */
const NUT = [
  ['p', 'Protein', 'g'], ['c', 'Kohlenhydrate', 'g'], ['fib', 'Ballaststoffe', 'g'], ['sug', 'Zucker', 'g'], ['f', 'Fett', 'g'], ['sat', 'Gesättigt', 'g'], ['pufa', 'Mehrfach ungesättigt', 'g'], ['mufa', 'Einfach ungesättigt', 'g'], ['trans', 'Transfette', 'g'],
  ['chol', 'Cholesterin', 'mg'], ['na', 'Natrium', 'mg'], ['kal', 'Kalium', 'mg'], ['va', 'Vitamin A', 'µg'], ['vc', 'Vitamin C', 'mg'], ['ca', 'Calcium', 'mg'], ['fe', 'Eisen', 'mg']
];
function nutGoals() {
  const g = nutRange === 'day' ? dayTargets(foodKey || dayKey()) : baseTargets(), w = S.profile.sex === 'w';
  return { kcal: [g.kcal, ''], p: [g.p, ''], c: [g.c, ''], f: [g.f, ''], fib: [30, 'mind.'], sug: [Math.round(g.kcal * 0.1 / 4), 'max.'], sat: [Math.round(g.kcal * 0.1 / 9), 'max.'], pufa: [null], mufa: [null], trans: [Math.round(g.kcal * 0.01 / 9 * 10) / 10, 'max.'],
    chol: [300, 'max.'], na: [2400, 'max.'], kal: [4000, ''], va: [w ? 700 : 850, ''], vc: [w ? 95 : 110, ''], ca: [1000, ''], fe: [w ? 16 : 11, ''] };
}
const nutVal = (o, k) => k === 'na' ? (o.salt !== undefined ? o.salt * 400 : undefined) : o[k];
const nfmt = (v, u) => v === undefined || v === null ? '–' : (u === 'g' ? fmt1(v) : fmt(v));
function sumEntries(entries) {
  const t = { kcal: 0, p: 0, c: 0, f: 0 }, cnt = {};
  for (const e of entries) { t.kcal += e.kcal; t.p += e.p; t.c += e.c; t.f += e.f; for (const x of XN) if (e[x] !== undefined) { t[x] = (t[x] || 0) + e[x]; cnt[x] = (cnt[x] || 0) + 1; } }
  t._n = entries.length; t._partial = XN.some(x => cnt[x] && cnt[x] < entries.length); t._none = XN.every(x => !cnt[x]);
  return t;
}
function nutTable(o) {
  const G = nutGoals();
  return `<div class="nft">${[['kcal', 'Kalorien', 'kcal'], ...NUT].map(([k, l, u]) => { const v = k === 'kcal' ? o.kcal : nutVal(o, k), sub = ['sat', 'pufa', 'mufa', 'trans', 'sug'].includes(k); const g = G[k][0];
    return `<div class="nrow ${sub ? 'sub' : ''} ${k === 'kcal' ? 'big' : ''}"><span class="grow">${l}</span><span class="num">${nfmt(v, u)}${v !== undefined && v !== null ? ' ' + u : ''}</span><span class="num cap" style="width:44px;text-align:right">${v !== undefined && v !== null && g ? r0(v / g * 100) + ' %' : ''}</span></div>`; }).join('')}
    <div class="cap" style="margin-top:8px">Prozent = Anteil an deinem Tagesziel.${o._none || XN.every(x => o[x] === undefined) ? ' Für diesen Eintrag liegen nur Kalorien und Makros vor.' : ''}</div></div>`;
}
function energySplit(o) { const pk = o.p * 4, ck = o.c * 4, fk = o.f * 9, t = pk + ck + fk || 1; return `<div><div class="split"><i class="c-bg" style="width:${ck / t * 100}%"></i><i class="f-bg" style="width:${fk / t * 100}%"></i><i class="p-bg" style="width:${pk / t * 100}%"></i></div><div class="row cap" style="justify-content:space-between;margin-top:6px"><span><span class="dot c-bg"></span> Kohlenhydrate ${r0(ck / t * 100)} %</span><span><span class="dot f-bg"></span> Fett ${r0(fk / t * 100)} %</span><span><span class="dot p-bg"></span> Protein ${r0(pk / t * 100)} %</span></div></div>`; }
function donut(parts, size, center) {
  const r = size / 2 - 14, c = 2 * Math.PI * r, tot = parts.reduce((a, p) => a + p.v, 0); let off = 0;
  const segs = tot ? parts.filter(p => p.v > 0).map(p => { const len = p.v / tot * c, s = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${p.color}" stroke-width="22" stroke-dasharray="${Math.max(0, len - 2).toFixed(1)} ${c.toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}"/>`; off += len; return s; }).join('') : '';
  return `<div style="position:relative;width:${size}px;height:${size}px;flex:none"><svg width="${size}" height="${size}" style="transform:rotate(-90deg)" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="22"/>${segs}</svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">${center}</div></div>`;
}
let nutTab = 'kcal', nutRange = 'day';
const MEAL_COL = { fruehstueck: 'var(--carbs)', mittag: 'var(--protein)', abend: 'var(--ember)', snacks: 'var(--fat)' };
function rangeKeys() { const end = new Date((foodKey || dayKey()) + 'T12:00:00'); if (nutRange === 'day') return [dayKey(end)]; const ks = []; for (let i = 6; i >= 0; i--) { const d = new Date(end); d.setDate(d.getDate() - i); ks.push(dayKey(d)); } return ks; }
function vNutrition() {
  const keys = rangeKeys(), loggedKeys = keys.filter(k => S.days[k] && SLOTS.some(([s]) => (S.days[k].meals[s] || []).length)), nDays = nutRange === 'day' ? 1 : Math.max(1, loggedKeys.length);
  const all = []; const bySlot = { fruehstueck: [], mittag: [], abend: [], snacks: [] };
  for (const k of keys) { const d = S.days[k]; if (!d) continue; for (const [s] of SLOTS) for (const e of d.meals[s] || []) { all.push(e); bySlot[s].push(e); } }
  const T = sumEntries(all), avg = {}; for (const k in T) if (typeof T[k] === 'number' && !k.startsWith('_')) avg[k] = T[k] / nDays; avg._none = T._none;
  const g = nutRange === 'day' ? dayTargets(foodKey || dayKey()) : baseTargets(), G = nutGoals(), endD = new Date(keys[keys.length - 1] + 'T12:00:00'), startD = new Date(keys[0] + 'T12:00:00');
  const label = nutRange === 'day' ? (keys[0] === dayKey() ? 'Heute' : endD.toLocaleDateString(LOC(), { weekday: 'short', day: 'numeric', month: 'short' })) : `${startD.toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })} – ${endD.toLocaleDateString(LOC(), { day: 'numeric', month: 'short' })}`;
  const isLast = keys[keys.length - 1] >= dayKey();
  let body = '';
  const top = (field, unit) => { const arr = all.slice().sort((a, b) => (b[field] || 0) - (a[field] || 0)).filter(e => e[field] > 0).slice(0, 5); return arr.length ? `<div class="card"><div class="lbl" style="margin-bottom:4px">${field === 'kcal' ? 'Die meisten Kalorien' : 'Das meiste Protein'}</div><ul class="list">${arr.map(e => `<li><div class="grow">${esc(e.name)}</div><span class="num" style="font-weight:700">${fmt(e[field])} ${unit}</span></li>`).join('')}</ul></div>` : ''; };
  const avgNote = nutRange === 'week' ? `<p class="cap" style="margin:0">Durchschnitt pro Tag über ${nDays} ${nDays === 1 ? 'getrackten Tag' : 'getrackte Tage'} der Woche.</p>` : '';
  if (nutTab === 'kcal') {
    if (nutRange === 'day') {
      const parts = SLOTS.map(([s, l]) => ({ s, l, v: bySlot[s].reduce((a, e) => a + e.kcal, 0), color: MEAL_COL[s] }));
      body = `<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:14px">${donut(parts, 200, `<div class="disp num" style="font-size:28px;line-height:30px">${fmt(T.kcal)}</div><div class="cap">von ${fmt(g.kcal)} kcal</div>`)}
        <div style="width:100%">${parts.map(p => `<div class="nrow"><span class="grow"><span class="dot" style="background:${p.color}"></span> ${p.l}</span><span class="num cap" style="width:48px;text-align:right">${T.kcal ? r0(p.v / T.kcal * 100) : 0} %</span><span class="num" style="width:90px;text-align:right;font-weight:700">${fmt(p.v)} kcal</span></div>`).join('')}</div></div>
        <div class="card eqcard">${eqRow(g.kcal, T.kcal)}</div>${top('kcal', 'kcal')}`;
    } else {
      const vals = keys.map(k => dayTotals(S.days[k]).kcal), mx = Math.max(g.kcal * 1.15, ...vals), H = 150;
      body = `<div class="card"><div class="row" style="justify-content:space-between"><div class="lbl">Kalorien pro Tag</div><span class="cap">Ziel ${fmt(g.kcal)}</span></div>
        <div class="wbars" style="height:${H + 24}px">${keys.map((k, i) => { const v = vals[i], h = v / mx * H, d = new Date(k + 'T12:00:00'); return `<div><span class="num cap">${v ? fmt(v / 1000 >= 1 ? Math.round(v / 100) / 10 : v) + (v >= 1000 ? 'k' : '') : ''}</span><i style="height:${Math.max(2, h)}px;background:${!v ? 'var(--surface-2)' : v > g.kcal * 1.1 ? 'var(--warning)' : 'var(--ember)'}"></i><span class="cap">${d.toLocaleDateString(LOC(), { weekday: 'short' }).slice(0, 2)}</span></div>`; }).join('')}<b class="goalline" style="bottom:${g.kcal / mx * H + 22}px"></b></div></div>
        <div class="card stats3"><div><span class="cap">Ø pro Tag</span><b>${fmt(avg.kcal)} kcal</b></div><div><span class="cap">Ziel</span><b>${fmt(g.kcal)} kcal</b></div><div><span class="cap">Getrackt</span><b>${loggedKeys.length} / 7 Tage</b></div></div>${avgNote}`;
    }
  }
  if (nutTab === 'nut') {
    body = `<div class="card nutlist"><div class="nrow head"><span class="grow"></span><span>${nutRange === 'day' ? 'Gesamt' : 'Ø Tag'}</span><span>Ziel</span><span>Übrig</span></div>
      ${NUT.map(([k, l, u]) => { const v = nutVal(avg, k), [gv, gl] = G[k], has = v !== undefined; const left = gv != null && has ? gv - v : null, over = gl === 'max.' && left !== null && left < 0;
        const sub = ['sat', 'pufa', 'mufa', 'trans', 'sug'].includes(k), reached = gl !== 'max.' && left !== null && left <= 0;
        return `<div class="nutrow ${sub ? 'sub' : ''}"><div class="nrow"><span class="grow">${l}</span><span class="num">${has ? nfmt(v, u) : '–'}</span><span class="num muted">${gv != null ? (gl ? `<small>${gl}</small> ` : '') + nfmt(gv, u) : '–'}</span><span class="num" style="font-weight:700;color:${over ? 'var(--critical)' : reached ? 'var(--good)' : 'inherit'}">${left === null ? '–' : reached ? ic('check', 16) : nfmt(left, u)}</span></div><div class="nbar"><i style="width:${has && gv ? Math.min(100, v / gv * 100) : 0}%;background:${over ? 'var(--critical)' : reached ? 'var(--good)' : 'var(--ember)'}"></i></div></div>`; }).join('')}
      <p class="cap" style="margin:10px 0 0">Mengen in g, außer Cholesterin, Natrium, Kalium, Calcium, Eisen, Vitamin C (mg) und Vitamin A (µg). Ziele: dein Tagesziel und Richtwerte für Erwachsene nach DGE. „max.“ ist eine Obergrenze, 6 g Salz entsprechen etwa 2.400 mg Natrium.${T._partial || T._none ? ' Nicht alle Einträge haben alle Nährwerte, die Summen können deshalb höher sein.' : ''}</p></div>${avgNote}`;
  }
  if (nutTab === 'macro') {
    const pk = avg.p * 4, ck = avg.c * 4, fk = avg.f * 9, tk = pk + ck + fk, gk = g.p * 4 + g.c * 4 + g.f * 9;
    const rows = [['c', 'Kohlenhydrate', ck, g.c * 4, avg.c, g.c, 'var(--carbs)'], ['f', 'Fett', fk, g.f * 9, avg.f, g.f, 'var(--fat)'], ['p', 'Protein', pk, g.p * 4, avg.p, g.p, 'var(--protein)']];
    body = `<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:14px">${donut(rows.map(r => ({ v: r[2], color: r[6] })), 200, `<div class="disp num" style="font-size:26px;line-height:28px">${fmt(tk)}</div><div class="cap">kcal aus Makros</div>`)}
      <div style="width:100%"><div class="nrow head"><span class="grow"></span><span>Ist</span><span>Ziel</span><span>Gramm</span></div>${rows.map(r => `<div class="nrow"><span class="grow"><span class="dot" style="background:${r[6]}"></span> ${r[1]}</span><span class="num" style="font-weight:700">${tk ? r0(r[2] / tk * 100) : 0} %</span><span class="num muted">${r0(r[3] / gk * 100)} %</span><span class="num">${fmt(r[4])} / ${fmt(r[5])}</span></div>`).join('')}</div></div>${top('p', 'g')}${avgNote}`;
  }
  return `<div class="row"><button class="iconbtn" data-nav="food" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Nährwerte</h1></div>
    <div class="seg"><button class="${nutTab === 'kcal' ? 'on' : ''}" data-nuttab="kcal">Kalorien</button><button class="${nutTab === 'nut' ? 'on' : ''}" data-nuttab="nut">Nährstoffe</button><button class="${nutTab === 'macro' ? 'on' : ''}" data-nuttab="macro">Makros</button></div>
    <div class="row" style="gap:8px"><button class="iconbtn" data-nutnav="-1" aria-label="Zurück im Zeitraum">${ic('back')}</button><div class="grow" style="text-align:center;font-weight:700">${label}</div><button class="iconbtn" data-nutnav="1" aria-label="Weiter im Zeitraum" ${isLast ? 'disabled style="opacity:.35"' : ''}>${ic('next')}</button></div>
    <div class="seg" style="max-width:240px;align-self:center;width:100%"><button class="${nutRange === 'day' ? 'on' : ''}" data-nutrange="day">Tag</button><button class="${nutRange === 'week' ? 'on' : ''}" data-nutrange="week">Woche</button></div>
    ${all.length ? body : '<div class="card empty">In diesem Zeitraum ist noch nichts eingetragen.</div>'}`;
}
const eqRow = (goal, food) => `<div class="eq"><div><b class="num">${fmt(goal)}</b><span class="cap">Ziel</span></div><span class="op">−</span><div><b class="num">${fmt(food)}</b><span class="cap">Essen</span></div><span class="op">=</span><div><b class="num" style="color:${goal - food < 0 ? 'var(--warning)' : 'var(--ember-ink)'}">${fmt(goal - food)}</b><span class="cap">Übrig</span></div></div>`;

function entrySheet(slot, id) {
  const day = foodDay(), e = (day.meals[slot] || []).find(x => x.id === id); if (!e) return;
  let cur = slot;
  const SRC = { foto: 'KI-Scan (Foto)', text: 'KI-Analyse (Text)', db: 'Lebensmittel-Datenbank', plan: 'KI-Ernährungsplan' };
  const draw = sh => { sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between;align-items:flex-start"><div style="min-width:0"><div class="cap">${SRC[e.src] || 'Eintrag'}</div><h2 class="disp">${esc(e.name)}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <div class="row" style="gap:12px;align-items:flex-end"><div class="grow"><div class="disp num" style="font-size:34px;line-height:36px">${fmt(e.kcal)} <span class="cap">kcal</span></div></div><span class="unit" style="width:120px"><input class="input" id="en-g" inputmode="numeric" value="${r0(e.grams)}" aria-label="Menge in Gramm" style="font-weight:800;font-size:18px"><span>g</span></span></div>
    ${energySplit(e)}
    <div class="card">${nutTable(e)}</div><div class="cap">Pro 100 g: ${fmt(e.grams ? e.kcal / e.grams * 100 : 0)} kcal · ${fmt1(e.grams ? e.p / e.grams * 100 : 0)} g Protein · ${fmt1(e.grams ? e.c / e.grams * 100 : 0)} g Kohlenhydrate · ${fmt1(e.grams ? e.f / e.grams * 100 : 0)} g Fett</div>
    <div class="field"><span class="lbl">Mahlzeit</span><div class="chips">${SLOTS.map(([k, l]) => `<button class="chip ${cur === k ? 'on' : ''}" data-mv="${k}">${l}</button>`).join('')}</div></div>
    <div class="grid2"><button class="btn btn-d" data-endel>${ic('trash', 18)} Löschen</button><button class="btn btn-p" data-ensave>Speichern</button></div>`; };
  openSheet('', sh => {
    draw(sh);
    sh.addEventListener('change', ev => { if (ev.target.id === 'en-g') { const g = Math.max(1, Math.round(num(ev.target.value))), k = g / (e.grams || 1); for (const x of ['kcal', 'p', 'c', 'f', ...XN]) if (e[x] !== undefined) e[x] = x === 'kcal' ? Math.round(e[x] * k) : Math.round(e[x] * k * 10) / 10; e.grams = g; save(); draw(sh); render(); } });
    sh.addEventListener('click', ev => {
      const mv = ev.target.closest('[data-mv]'); if (mv) { cur = mv.dataset.mv; draw(sh); return; }
      if (ev.target.closest('[data-endel]')) { day.meals[slot] = day.meals[slot].filter(x => x.id !== id); save(); closeSheet(); render(); toast('Eintrag gelöscht'); return; }
      if (ev.target.closest('[data-ensave]')) { if (cur !== slot) { day.meals[slot] = day.meals[slot].filter(x => x.id !== id); day.meals[cur].push(e); } save(); closeSheet(); render(); toast('Gespeichert'); }
    });
  });
}
function slotSheet(slot) {
  const label = SLOTS.find(s => s[0] === slot)[1], rec = recentFor(slot);
  pendingSlot = slot;
  openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${label} eintragen</h2><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <div class="grid2"><button class="btn btn-p" data-sq="photo">${ic('cam', 20)} Scannen</button><button class="btn btn-p" data-sq="barcode">${ic('barcode', 20)} Barcode</button></div>
    <div class="grid2"><button class="btn btn-s" data-sq="search">${ic('search', 20)} Suchen</button><button class="btn btn-s" data-sq="text">${ic('text', 20)} Beschreiben</button></div>
    ${rec.length ? `<div class="lbl">Zuletzt gegessen</div><div class="card" style="padding-top:2px;padding-bottom:2px"><ul class="list">${rec.map((e, i) => `<li><div class="grow"><div style="font-weight:600">${esc(e.name)}</div><div class="cap">${fmt(e.grams)} g · ${fmt(e.kcal)} kcal · ${fmt(e.p)} P</div></div><button class="iconbtn" style="width:38px;height:38px" data-rq="${i}" aria-label="${esc(e.name)} hinzufügen">${ic('plus', 20)}</button></li>`).join('')}</ul></div>` : `<p class="cap" style="margin:0">Was du hier einträgst, landet direkt bei ${label}. Häufige Mahlzeiten erscheinen danach hier zum schnellen Eintragen.</p>`}`,
    sh => sh.addEventListener('click', ev => {
      const q = ev.target.closest('[data-sq]');
      if (q) { closeSheet(); pendingSlot = slot; if (q.dataset.sq === 'photo') photoFlow(); else if (q.dataset.sq === 'barcode') barcodeSheet(); else if (q.dataset.sq === 'search') searchSheet(); else textFlow(); return; }
      const r = ev.target.closest('[data-rq]');
      if (r) { const e = rec[+r.dataset.rq]; foodDay().meals[slot].push({ id: uid(), name: e.name, grams: e.grams, kcal: e.kcal, p: e.p, c: e.c, f: e.f, ...extras(e), src: e.src === 'plan' ? 'plan' : 'db' }); save(); render(); r.disabled = true; r.innerHTML = ic('check', 20); r.style.color = 'var(--good)'; toast(`${e.name} bei ${label} eingetragen`); }
    }));
}
function defaultSlot() { if (pendingSlot) return pendingSlot; const h = new Date().getHours(); return h < 11 ? 'fruehstueck' : h < 15 ? 'mittag' : h < 18 ? 'snacks' : 'abend'; }
function checkPhotoLimit() { if ((today().photos || 0) >= lim().photo) { if (!S.pro) paywall('Du hast heute ' + lim().photo + ' KI-Scans genutzt.'); else toast('Tageslimit für Scans erreicht'); return false; } return true; }
function photoFlow() {
  if (!sampleFn) { openSheet(`<h2 class="disp">Scan nicht verfügbar</h2><p class="muted" style="margin:0">${aiOffText()} Bis dahin kannst du Lebensmittel suchen.</p><button class="btn btn-p btn-block" data-s="1">Lebensmittel suchen</button>`, sh => sh.addEventListener('click', ev => { if (ev.target.closest('[data-s]')) { closeSheet(); searchSheet(); } })); return; }
  if (!sampleImages) { textFlow('In dieser Ansicht können keine Fotos an die KI geschickt werden. Beschreib dein Essen stattdessen in einem Satz.'); return; }
  if (!checkPhotoLimit()) return;
  openSheet(`<h2 class="disp">Essen oder Getränk scannen</h2><p class="muted" style="margin:-6px 0 0">Am besten von schräg oben, mit dem ganzen Teller im Bild. Wasser und ungesüßter Tee landen automatisch bei „Wasser“.</p>
    <label class="btn btn-p btn-block">${ic('cam', 20)} Kamera öffnen<input type="file" accept="image/*" capture="environment" class="hidden" data-file></label>
    <label class="btn btn-s btn-block">${ic('img', 20)} Aus der Galerie wählen<input type="file" accept="image/*" class="hidden" data-file></label>
    <p class="cap" style="margin:0">Das Foto geht nur zur Analyse an die KI und wird nicht gespeichert. Noch ${lim().photo - (today().photos || 0)} Scans heute.</p>`,
    sh => sh.addEventListener('change', ev => { const f = ev.target.files && ev.target.files[0]; if (f) runAnalysis({ blob: f }); }));
}
function textFlow(hint) {
  if (!sampleFn) { photoFlow(); return; }
  openSheet(`<h2 class="disp">Beschreiben</h2>${hint ? `<div class="banner">${esc(hint)}</div>` : ''}<textarea class="input" id="tf" placeholder="z. B. 2 Scheiben Vollkornbrot mit Frischkäse, eine Banane und 0,5 l Wasser" aria-label="Mahlzeit beschreiben"></textarea><button class="btn btn-p btn-block" data-go>Analysieren</button>`,
    sh => { sh.querySelector('#tf').focus(); sh.addEventListener('click', ev => { if (!ev.target.closest('[data-go]')) return; const v = sh.querySelector('#tf').value.trim(); if (v.length < 3) { toast('Beschreib es in ein paar Worten'); return; } runAnalysis({ text: v }); }); });
}
async function runAnalysis(src) {
  const url = src.blob ? URL.createObjectURL(src.blob) : '';
  openSheet(`${url ? `<img class="photo" src="${url}" alt="Dein Foto">` : `<div class="banner">${esc(src.text)}</div>`}<div class="row"><div class="spinner" aria-hidden="true"></div><div class="grow"><div style="font-weight:700">Analysiere …</div><div class="cap">Erkenne Lebensmittel und Getränke und schätze Mengen. Etwa 10 bis 30 Sekunden.</div></div></div>`);
  try {
    const res = await analyzeFood(src);
    if (src.blob) { today().photos = (today().photos || 0) + 1; save(); }
    if (!res.items.length && !res.water.length) { openSheet(`<h2 class="disp">Nichts erkannt</h2><p class="muted" style="margin:0">${esc(res.note || 'Auf dem Foto war kein Essen oder Getränk zu erkennen.')}</p><div class="grid2"><button class="btn btn-s" data-r="photo">Neues Foto</button><button class="btn btn-p" data-r="text">Beschreiben</button></div>`, sh => sh.addEventListener('click', ev => { const b = ev.target.closest('[data-r]'); if (!b) return; closeSheet(); b.dataset.r === 'photo' ? photoFlow() : textFlow(); })); return; }
    resultSheet({ title: res.title, items: res.items, water: res.water, note: res.note, url, slot: defaultSlot() });
  } catch (e) {
    if (e && e.code === 'cancelled') { closeSheet(); return; }
    openSheet(`<h2 class="disp">Hat nicht geklappt</h2><p class="muted" style="margin:0">${esc(errText(e))}</p>${e && e.code === 'login' ? '<button class="btn btn-p btn-block" data-cl="login">Anmelden</button>' : e && (e.code === 'limit' || e.code === 'pro') ? '<button class="btn btn-p btn-block" data-cl="paywall">Pro ansehen</button>' : ''}<div class="grid2"><button class="btn btn-s" data-r="search">Suchen</button><button class="btn btn-p" data-r="text">Beschreiben</button></div>`, sh => sh.addEventListener('click', ev => { const b = ev.target.closest('[data-r]'); if (!b) return; closeSheet(); b.dataset.r === 'search' ? searchSheet() : textFlow(); }));
  }
}
const XN = ['fib', 'sug', 'sat', 'salt', 'mufa', 'pufa', 'trans', 'chol', 'kal', 'ca', 'fe', 'va', 'vc'];
function scaleItem(it, g) { const b = it.base, k = b.g ? g / b.g : 0; it.grams = g; for (const x of ['kcal', 'p', 'c', 'f', ...XN]) if (b[x] !== undefined) it[x] = b[x] * k; }
const extras = (src, round) => { const o = {}; for (const x of XN) if (src[x] !== undefined && src[x] !== null && isFinite(src[x])) o[x] = round ? Math.round(src[x] * 10) / 10 : src[x]; return o; };
function resultSheet(m) {
  m.water = m.water || [];
  const tot = () => m.items.reduce((a, i) => ({ kcal: a.kcal + i.kcal, p: a.p + i.p, c: a.c + i.c, f: a.f + i.f }), { kcal: 0, p: 0, c: 0, f: 0 });
  const draw = sh => {
    const t = tot(), ml = m.water.reduce((a, w) => a + w.ml, 0);
    sh.innerHTML = `<div class="grab"></div>${m.url ? `<img class="photo" src="${m.url}" alt="Dein Foto" style="max-height:180px">` : ''}
      <div class="row" style="justify-content:space-between;align-items:baseline"><h2 class="disp">${esc(m.title)}</h2>${m.items.length ? `<span class="disp num" style="font-size:22px">${fmt(t.kcal)} <span class="cap">kcal</span></span>` : ''}</div>
      ${m.items.length ? `<div class="cap" style="margin-top:-8px"><span class="dot p-bg"></span> ${fmt(t.p)} g Protein · <span class="dot c-bg"></span> ${fmt(t.c)} g KH · <span class="dot f-bg"></span> ${fmt(t.f)} g Fett</div>
      <p class="muted" style="margin:0">${m.exact ? 'Tippe auf die Menge, um deine Portion einzustellen.' : 'Mengen sind geschätzt, tippe auf die Zahl zum Ändern.'}</p>` : ''}
      ${m.note ? `<div class="banner">${esc(m.note)}</div>` : ''}
      ${m.water.map((w, n) => `<div class="water-row"><span style="color:var(--protein)">${ic('drop', 20)}</span><div class="grow"><div style="font-weight:600">${esc(w.name)}</div><div class="cap">wird zu Wasser hinzugefügt</div></div><span class="unit" style="width:104px;flex:none"><input class="input" style="height:42px;font-size:16px;font-weight:700;padding-right:34px" inputmode="numeric" value="${w.ml}" data-ml="${n}" aria-label="Menge ${esc(w.name)} in ml"><span style="top:10px;right:10px">ml</span></span><button class="iconbtn" style="width:34px;height:34px" data-rmw="${n}" aria-label="${esc(w.name)} entfernen">${ic('x', 16)}</button></div>`).join('')}
      ${m.items.length ? `<div class="card" style="padding-top:2px;padding-bottom:2px"><ul class="list">${m.items.map((i, n) => `<li><div class="grow"><div style="font-weight:600">${esc(i.name)}</div><div class="cap">${fmt(i.kcal)} kcal · ${fmt1(i.p)} P · ${fmt1(i.c)} K · ${fmt1(i.f)} F</div><div class="chips" style="margin-top:4px;gap:6px">${i.conf !== undefined ? `<span class="tag"><span class="dot" style="background:var(${i.conf >= 0.7 ? '--good' : '--warning'})"></span>${i.conf >= 0.7 ? 'sicher' : 'unsicher'}</span>` : ''}${i.allergen ? `<span class="tag" style="color:var(--critical)">enthält ${esc(i.allergen)}?</span>` : ''}</div></div><span class="unit" style="width:96px;flex:none"><input class="input" style="height:42px;font-size:16px;font-weight:700;padding-right:30px" inputmode="numeric" value="${r0(i.grams)}" data-g="${n}" aria-label="Menge ${esc(i.name)} in Gramm"><span style="top:10px;right:10px">g</span></span><button class="iconbtn" style="width:34px;height:34px" data-rm="${n}" aria-label="${esc(i.name)} entfernen">${ic('x', 16)}</button></li>`).join('')}</ul></div>` : ''}
      <button class="btn btn-g" data-add>+ Zutat hinzufügen</button>
      ${m.items.length ? `<div class="field"><span class="lbl">Mahlzeit</span><div class="chips">${SLOTS.map(([k, l]) => `<button class="chip ${m.slot === k ? 'on' : ''}" data-slot="${k}">${l}</button>`).join('')}</div></div>` : ''}
      <div class="grid2"><button class="btn btn-s" data-cancel>Verwerfen</button><button class="btn btn-p" data-save ${m.items.length || m.water.length ? '' : 'disabled'}>Speichern</button></div>`;
    void ml;
  };
  openSheet('', sh => {
    draw(sh);
    sh.addEventListener('change', ev => { const g = ev.target.dataset.g, mlI = ev.target.dataset.ml; if (g !== undefined) { scaleItem(m.items[+g], Math.max(1, Math.round(num(ev.target.value)))); draw(sh); } if (mlI !== undefined) { m.water[+mlI].ml = Math.max(10, Math.round(num(ev.target.value))); draw(sh); } });
    sh.addEventListener('click', ev => {
      const b = ev.target.closest('[data-rm],[data-rmw],[data-add],[data-slot],[data-cancel],[data-save]'); if (!b) return;
      if (b.dataset.rm !== undefined) { m.items.splice(+b.dataset.rm, 1); draw(sh); }
      else if (b.dataset.rmw !== undefined) { m.water.splice(+b.dataset.rmw, 1); draw(sh); }
      else if (b.dataset.add !== undefined) searchSheet(food => { if (food.water) m.water.push({ id: uid(), name: food.name, ml: food.ml }); else m.items.push(food); resultSheet(m); });
      else if (b.dataset.slot) { m.slot = b.dataset.slot; draw(sh); }
      else if (b.dataset.cancel !== undefined) closeSheet();
      else if (b.dataset.save !== undefined) { const day = view === 'food' ? foodDay() : today(); for (const i of m.items) day.meals[m.slot].push({ id: uid(), name: i.name, grams: r0(i.grams), kcal: r0(i.kcal), p: r1(i.p), c: r1(i.c), f: r1(i.f), ...extras(i, true), src: i.src || 'db' });
        const ml = m.water.reduce((a, w) => a + w.ml, 0); if (ml) day.water = (day.water || 0) + ml; save(); closeSheet(); render();
        pendingSlot = null; toast([m.items.length ? `${fmt(tot().kcal)} kcal` : '', ml ? `${fmt(ml)} ml Wasser` : ''].filter(Boolean).join(' und ') + ' gespeichert'); }
    });
  });
}
function searchSheet(onPick) {
  let q = '', online = [], onlineQ = '', onlineState = '';
  const WATER = { id: 'water', name: 'Wasser', water: true, ml: 250 };
  const match = f => !q || foodLabel(f).toLowerCase().includes(q.toLowerCase());
  const items = () => { const mine = myFoodList().filter(match).slice(0, q ? 20 : 8), l = FOODS.filter(match).slice(0, 40); return (!q || 'wasser mineralwasser water'.includes(q.toLowerCase())) ? [WATER, ...mine, ...l] : [...mine, ...l]; };
  const row = (f, key) => f.water ? `<li data-f="water" style="cursor:pointer"><span style="color:var(--protein)">${ic('drop', 20)}</span><div class="grow"><div style="font-weight:600">Wasser</div><div class="cap">zählt zu deinem Wasserziel</div></div><span class="btn btn-s btn-sm">250 ml</span></li>`
    : `<li data-f="${key || f.id}" style="cursor:pointer"><div class="grow" style="min-width:0"><div style="font-weight:600"${f.src ? ' translate="no"' : ''}>${esc(f.name)}</div><div class="cap">${f.brand ? `<span translate="no">${esc(f.brand)}</span> · ` : ''}pro 100 ${f.unit === 'ml' ? 'ml' : 'g'}: ${fmt(f.kcal)} kcal · ${fmt1(f.p)} P · ${fmt1(f.c)} K · ${fmt1(f.f)} F</div></div><span class="btn btn-s btn-sm">${f.portion} ${f.unit === 'ml' ? 'ml' : 'g'}</span></li>`;
  openSheet(`<h2 class="disp">Lebensmittel suchen</h2><div class="row" style="gap:8px"><input class="input grow" id="fs" placeholder="z. B. Skyr, Reis, Wasser" aria-label="Lebensmittel suchen"><button class="iconbtn" data-bcs aria-label="Barcode scannen" style="background:var(--ember);color:var(--on-ember)">${ic('barcode', 22)}</button></div><div class="card" style="padding-top:2px;padding-bottom:2px"><ul class="list" id="fl"></ul></div><div id="fon"></div><button class="btn btn-g" data-own style="align-self:flex-start">+ Eigenes Lebensmittel anlegen</button><p class="cap" style="margin:0">Produktdaten von Open Food Facts (ODbL), Grundnahrungsmittel aus unserer Liste.</p>`, sh => {
    const list = sh.querySelector('#fl'), inp = sh.querySelector('#fs'), on = sh.querySelector('#fon');
    const drawOnline = () => { on.innerHTML = q.length < 3 ? '' : onlineState === 'busy' && onlineQ === q ? `<div class="row" style="gap:10px;padding:4px 2px"><div class="spinner" aria-hidden="true" style="width:20px;height:20px"></div><span class="cap">Suche in Open Food Facts …</span></div>`
      : onlineQ === q && onlineState === 'done' ? (online.length ? `<div class="lbl" style="margin-bottom:6px">Markenprodukte</div><div class="card" style="padding-top:2px;padding-bottom:2px"><ul class="list">${online.map((f, i) => row(f, 'on:' + i)).join('')}</ul></div>` : `<div class="cap">Keine Markenprodukte zu „${esc(q)}“ gefunden.</div>`)
      : onlineQ === q && onlineState === 'error' ? `<div class="cap">Die Online-Suche ist gerade nicht erreichbar.</div>`
      : `<button class="btn btn-s btn-block" data-online>${ic('search', 18)} „${esc(q)}“ in Markenprodukten suchen</button>`; };
    const draw = () => { const it = items(); list.innerHTML = it.length ? it.map(f => row(f)).join('') : '<li class="empty" style="justify-content:center">Nichts in der Grundliste gefunden.</li>'; drawOnline(); };
    const runOnline = async () => { const qq = q; onlineQ = qq; onlineState = 'busy'; drawOnline(); try { const r = await offSearch(qq); if (onlineQ !== qq) return; online = r; onlineState = 'done'; } catch (e) { if (onlineQ !== qq) return; onlineState = 'error'; } drawOnline(); };
    draw(); inp.focus(); inp.addEventListener('input', () => { q = inp.value.trim(); draw(); });
    inp.addEventListener('keydown', ev => { if (ev.key === 'Enter' && q.length >= 3) { ev.preventDefault(); runOnline(); } });
    sh.addEventListener('click', ev => {
      if (ev.target.closest('[data-bcs]')) { barcodeSheet(onPick); return; }
      if (ev.target.closest('[data-own]')) { ownFoodSheet({ name: q }, onPick); return; }
      if (ev.target.closest('[data-online]')) { runOnline(); return; }
      const li = ev.target.closest('[data-f]'); if (!li) return;
      if (li.dataset.f === 'water') { if (onPick) onPick({ ...WATER }); else { closeSheet(); addWater(250); } return; }
      const id = li.dataset.f;
      if (id.startsWith('on:')) { pickFood(online[+id.slice(3)], onPick); return; }
      const mine = (S.myFoods || {})[id]; if (mine) { pickFood(mine, onPick); return; }
      const f = FOODS.find(x => x.id === id), it = foodItem(f);
      if (onPick) onPick(it); else resultSheet({ title: f.name, items: [it], slot: defaultSlot() }); });
  });
}

/* ---------- AI meal plan (Pro) ---------- */
/* ---------- AI meal plan (Pro, v4): settings, week plan, meal prep, recipes, shopping list ---------- */
const MP0 = { days: 7, prep: '2', variety: 'mittel', time: 30, budget: 'normal', cuisines: [], dislikes: '', people: 1, meals: 0 };
const MP_DAYS = [[1, '1 Tag'], [3, '3 Tage'], [5, '5 Tage'], [7, '7 Tage']];
const MP_PREP = [['0', 'Kein Meal Prep'], ['1', '1× pro Woche'], ['2', '2× pro Woche']];
const MP_VAR = [['wenig', 'Wenig (wenige Gerichte)'], ['mittel', 'Mittel'], ['viel', 'Viel Abwechslung']];
const MP_TIME = [[15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '60 min']];
const MP_BUDGET = [['guenstig', 'Günstig'], ['normal', 'Normal'], ['egal', 'Egal']];
const MP_CUIS = ['Deutsch', 'Mediterran', 'Asiatisch', 'Mexikanisch', 'Orientalisch', 'Indisch'];
const SHOP_CAT = ['Obst & Gemüse', 'Fleisch & Fisch', 'Milchprodukte & Eier', 'Getreide & Beilagen', 'Konserven & Vorrat', 'Gewürze & Öle', 'Sonstiges'];
let mpTab = 'woche', mpBusy = false, mpErr = '';
const mpPrefs = () => Object.assign({ ...MP0, meals: S.profile.meals }, S.mealPrefs || {});
function dishSVG(r, size) {
  const v = r.visual || {}, cols = (Array.isArray(v.colors) ? v.colors : []).filter(c => /^#[0-9a-f]{6}$/i.test(c)).slice(0, 5);
  while (cols.length < 3) cols.push(['#D9A066', '#F2E3C6', '#6BAA4B', '#C0392B', '#E8C547'][cols.length]);
  let h = 0; for (const ch of r.name || 'x') h = (h * 31 + ch.charCodeAt(0)) >>> 0; const rnd = () => (h = (h * 1103515245 + 12345) >>> 0) / 4294967296;
  const blob = (cx, cy, rr, c) => { const n = 7, pts = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, q = rr * (0.75 + rnd() * 0.4); pts.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q * 0.62]); } return `<path fill="${c}" d="M${pts.map(p => p.map(z => z.toFixed(1)).join(' ')).join(' L')}Z" stroke="${c}" stroke-width="5" stroke-linejoin="round"/>`; };
  const garnish = () => Array.from({ length: 7 }, () => `<circle cx="${(52 + rnd() * 56).toFixed(1)}" cy="${(46 + rnd() * 22).toFixed(1)}" r="${(1.5 + rnd() * 1.5).toFixed(1)}" fill="#3E8E41"/>`).join('');
  const st = ['plate', 'bowl', 'box', 'wrap', 'glass', 'pan'].includes(v.style) ? v.style : 'plate';
  let body = '';
  if (st === 'plate') body = `<ellipse cx="80" cy="64" rx="66" ry="36" fill="#F4F1EA"/><ellipse cx="80" cy="62" rx="52" ry="27" fill="#E8E3D8"/>${blob(62, 58, 20, cols[0])}${blob(98, 56, 18, cols[1])}${blob(80, 70, 16, cols[2])}${cols[3] ? blob(70, 48, 9, cols[3]) : ''}${garnish()}`;
  if (st === 'bowl') body = `<ellipse cx="80" cy="50" rx="58" ry="20" fill="#2E3A44"/>${blob(64, 48, 18, cols[0])}${blob(96, 46, 17, cols[1])}${blob(80, 56, 15, cols[2])}${cols[3] ? blob(82, 40, 10, cols[3]) : ''}${garnish()}<path d="M22 52 Q80 118 138 52 Z" fill="#3D4D5A"/><path d="M22 52 Q80 106 138 52" fill="none" stroke="#56697A" stroke-width="3"/>`;
  if (st === 'box') body = `<rect x="16" y="26" width="128" height="66" rx="12" fill="#E7EEF3" stroke="#B7C6D1" stroke-width="3"/><line x1="80" y1="30" x2="80" y2="88" stroke="#B7C6D1" stroke-width="3"/><line x1="80" y1="58" x2="140" y2="58" stroke="#B7C6D1" stroke-width="3"/>${blob(48, 58, 22, cols[0])}${blob(110, 44, 16, cols[1])}${blob(110, 74, 16, cols[2])}${garnish()}`;
  if (st === 'wrap') body = `<ellipse cx="80" cy="74" rx="64" ry="20" fill="#F4F1EA"/><path d="M30 66 Q80 22 130 58 Q128 82 80 86 Q34 86 30 66Z" fill="#E9C98F"/>${blob(78, 52, 15, cols[0])}${blob(100, 54, 11, cols[1])}${blob(62, 58, 10, cols[2])}<path d="M30 66 Q80 96 130 58" fill="none" stroke="#C9A066" stroke-width="3"/>`;
  if (st === 'glass') body = `<path d="M56 14 L104 14 L98 94 L62 94 Z" fill="#DDE7EE" opacity=".6"/><path d="M59 34 L101 34 L97 92 L63 92 Z" fill="${cols[0]}"/><ellipse cx="80" cy="34" rx="21" ry="4" fill="${cols[1]}"/>${blob(80, 30, 8, cols[2])}<rect x="86" y="4" width="4" height="40" rx="2" fill="#E8C547" transform="rotate(14 88 24)"/>`;
  if (st === 'pan') body = `<rect x="118" y="56" width="40" height="8" rx="4" fill="#3A3A3A"/><ellipse cx="74" cy="60" rx="58" ry="32" fill="#2B2B2B"/><ellipse cx="74" cy="58" rx="49" ry="26" fill="#3C3C3C"/>${blob(58, 56, 18, cols[0])}${blob(90, 54, 17, cols[1])}${blob(74, 66, 13, cols[2])}${garnish()}`;
  return `<svg viewBox="0 0 160 110" width="${size}" height="${Math.round(size * 110 / 160)}" role="img" aria-label="Illustration: ${esc(r.name)}"><rect width="160" height="110" rx="14" fill="${['#F3E7D7', '#E4EEE4', '#E5EBF3', '#F3E4E4'][h % 4]}"/>${body}</svg>`;
}
function mpConfigHTML(p) {
  const ch = (k, opts) => `<div class="chips">${opts.map(([v, l]) => `<button class="chip ${String(p[k]) === String(v) ? 'on' : ''}" data-mpk="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
  return `<div class="field"><span class="lbl">Zeitraum</span>${ch('days', MP_DAYS)}</div>
    <div class="field"><span class="lbl">Meal Prep</span>${ch('prep', MP_PREP)}<span class="cap">Mit Meal Prep kochst du an festen Tagen mehrere Portionen vor. Alles kommt aus einem Einkauf.</span></div>
    <div class="field"><span class="lbl">Abwechslung</span>${ch('variety', MP_VAR)}</div>
    <div class="field"><span class="lbl">Mahlzeiten pro Tag</span>${ch('meals', [[2, '2'], [3, '3'], [4, '4'], [5, '5']])}</div>
    <div class="field"><span class="lbl">Kochzeit pro Rezept (höchstens)</span>${ch('time', MP_TIME)}</div>
    <div class="field"><span class="lbl">Budget</span>${ch('budget', MP_BUDGET)}</div>
    <div class="field"><span class="lbl">Küche (mehrere möglich)</span><div class="chips">${MP_CUIS.map(c => `<button class="chip ${p.cuisines.includes(c) ? 'on' : ''}" data-mpc="${c}">${c}</button>`).join('')}</div></div>
    <div class="field"><span class="lbl">Für wie viele Personen kaufst du ein?</span>${ch('people', [[1, '1'], [2, '2'], [3, '3'], [4, '4']])}</div>
    <label class="field"><span class="lbl">Was magst du nicht?</span><input class="input" id="mp-dis" value="${esc(p.dislikes)}" placeholder="z. B. Pilze, Rosenkohl, Koriander"></label>
    <div class="cap">Ernährungsform (${DIETS[S.profile.diet]}) und Unverträglichkeiten${(S.profile.allergies || []).length ? ' (' + S.profile.allergies.map(a => ALLERGENS[a]).join(', ') + ')' : ''} aus deinem Profil werden immer beachtet.</div>`;
}
function bindMpConfig(root, p, redraw) {
  root.addEventListener('click', ev => {
    const k = ev.target.closest('[data-mpk]'); if (k) { const di = root.querySelector('#mp-dis'); if (di) p.dislikes = di.value; const key = k.dataset.mpk; p[key] = ['days', 'meals', 'time', 'people'].includes(key) ? Number(k.dataset.v) : k.dataset.v; redraw(); return; }
    const c = ev.target.closest('[data-mpc]'); if (c) { const di = root.querySelector('#mp-dis'); if (di) p.dislikes = di.value; const i = p.cuisines.indexOf(c.dataset.mpc); i >= 0 ? p.cuisines.splice(i, 1) : p.cuisines.push(c.dataset.mpc); redraw(); }
  });
}
function mpDayLabels(n) { const out = []; for (let i = 0; i < n; i++) { const d = new Date(); d.setDate(d.getDate() + i); out.push({ key: dayKey(d), label: d.toLocaleDateString(LOC(), { weekday: 'short', day: 'numeric', month: 'numeric' }), wd: d.toLocaleDateString('de-DE', { weekday: 'long' }) }); } return out; }
const MP_SLOTS = { 2: ['mittag', 'abend'], 3: ['fruehstueck', 'mittag', 'abend'], 4: ['fruehstueck', 'mittag', 'snacks', 'abend'], 5: ['fruehstueck', 'snacks', 'mittag', 'snacks', 'abend'] };
async function generateMealPlan(p) {
  const pr = S.profile, t = baseTargets(), slots = MP_SLOTS[p.meals] || MP_SLOTS[4], days = mpDayLabels(p.days);
  const slotNames = slots.map(s => SLOTS.find(x => x[0] === s)[1]).join(', ');
  const prepTxt = p.prep === '0' ? 'Kein Meal Prep: Gerichte werden frisch gekocht. Plane Zutaten so, dass sie sich zwischen den Rezepten überschneiden und nichts verdirbt.'
    : `Meal Prep ${p.prep === '1' ? 'einmal: am ersten Tag' : `zweimal: am ersten Tag (${days[0].wd}) und am ${days[Math.min(days.length - 1, 3)].wd}`}. In jeder Session werden Mittag- und Abendessen für die folgenden Tage vorgekocht und portioniert (höchstens 4 Tage im Kühlschrank haltbar, sonst einfrieren). Ein Rezept darf an mehreren Tagen vorkommen. Frühstück und Snacks gehen ohne Kochen in unter 5 Minuten.`;
  const varTxt = { wenig: 'höchstens 5 verschiedene Rezepte insgesamt', mittel: 'etwa 6 bis 9 verschiedene Rezepte insgesamt', viel: 'etwa 10 bis 14 verschiedene Rezepte insgesamt' }[p.variety];
  const lang = isEN() ? 'Englisch (alle Texte, Zutaten, Kategorien und Tipps auf Englisch, die Kategorienamen der Einkaufsliste übersetzt)' : 'Deutsch';
  const prompt = `Du bist Ernährungscoach der Fitness-App Repwerk Fitness. Erstelle einen alltagstauglichen Ernährungsplan auf ${lang}.
Person: Ziel ${GOALS[pr.goal]}. Pro Tag: ${t.kcal} kcal, ${t.p} g Protein, ${t.c} g Kohlenhydrate, ${t.f} g Fett. Jeder Tag soll Kalorien und Protein auf ±5 % treffen.
Ernährungsform: ${DIETS[pr.diet]}. ${(pr.allergies || []).length ? 'Unbedingt ohne: ' + pr.allergies.map(a => ALLERGENS[a]).join(', ') + '.' : ''} ${p.dislikes ? 'Die Person mag nicht: ' + p.dislikes.slice(0, 200) + '.' : ''}
Zeitraum: ${days.length} Tage (${days.map(d => d.wd).join(', ')}). Mahlzeiten pro Tag in dieser Reihenfolge: ${slotNames} (slot-Werte: ${slots.join(', ')}).
${prepTxt}
Abwechslung: ${varTxt}. Küche: ${p.cuisines.length ? p.cuisines.join(', ') : 'gemischt'}. Kochzeit pro Rezept höchstens ${p.time} Minuten (Meal-Prep-Sessions dürfen länger dauern). Budget: ${{ guenstig: 'günstig, Grundnahrungsmittel und Angebote', normal: 'normal', egal: 'egal' }[p.budget]}. Zutaten aus deutschen Supermärkten.
Einkauf für ${p.people} Person${p.people > 1 ? 'en' : ''}: Die Einkaufsliste deckt den ganzen Zeitraum mit EINEM Einkauf ab und fasst gleiche Zutaten zusammen.
Antworte NUR mit JSON in dieser Form:
{"recipes":[{"id":"r1","name":"Name","slot":"mittag","portions":4,"kcal":650,"protein":45,"carbs":70,"fat":18,"fiber":8,"minutes":25,"mealprep":true,"storage":"4 Tage im Kühlschrank","ingredients":["600 g Hähnchenbrust"],"steps":["kurzer Schritt"],"visual":{"style":"box","colors":["#C98B4F","#F2E6C8","#4E9F3D"]}}],
"days":[{"day":"${days[0].wd}","meals":[{"slot":"${slots[0]}","recipe":"r1"}]}],
"prep":[{"day":"${days[0].wd}","recipes":["r2","r3"],"minutes":90,"steps":["Reis für 4 Portionen kochen"]}],
"shopping":[{"item":"Hähnchenbrust","amount":"1,2 kg","category":"Fleisch & Fisch"}]}
Regeln: kcal und Makros gelten pro Portion für eine Person. portions = wie oft das Rezept im Plan gegessen wird. ingredients gelten für alle portions einer Person, höchstens 10 Zutaten. steps höchstens 5 kurze Sätze. days enthält genau ${days.length} Einträge mit je ${slots.length} meals. prep ist leer, wenn kein Meal Prep. visual.style ist einer von plate, bowl, box, wrap, glass, pan (box für Meal-Prep-Gerichte); visual.colors sind 3 bis 5 echte Farben der Hauptzutaten als Hex. shopping.category ist einer von: ${SHOP_CAT.join(', ')}. Keine medizinischen Ratschläge.`;
  const out = await sampleFn.json(prompt, IN_CLAUDE ? { cache: false } : { cache: false, kind: 'mealplan' });
  const recipes = (Array.isArray(out && out.recipes) ? out.recipes : []).slice(0, 20).map((r, i) => ({ id: String(r.id || 'r' + i), name: String(r.name || 'Gericht').slice(0, 70), slot: SLOTS.some(s => s[0] === r.slot) ? r.slot : 'mittag', portions: Math.max(1, Math.round(num(r.portions) || 1)), kcal: num(r.kcal), protein: num(r.protein), carbs: num(r.carbs), fat: num(r.fat), fiber: r.fiber != null ? num(r.fiber) : undefined, minutes: Math.round(num(r.minutes)) || p.time, mealprep: !!r.mealprep, storage: String(r.storage || '').slice(0, 80), ingredients: (r.ingredients || []).map(String).slice(0, 14), steps: (r.steps || []).map(String).slice(0, 8), visual: r.visual && typeof r.visual === 'object' ? { style: String(r.visual.style || ''), colors: (r.visual.colors || []).map(String) } : {} }));
  const ids = new Set(recipes.map(r => r.id));
  const dayList = (Array.isArray(out.days) ? out.days : []).slice(0, days.length).map((d, i) => ({ key: days[i].key, label: days[i].label, meals: (Array.isArray(d.meals) ? d.meals : []).filter(m => ids.has(String(m.recipe))).map(m => ({ slot: SLOTS.some(s => s[0] === m.slot) ? m.slot : 'mittag', recipe: String(m.recipe), eaten: false })) }));
  if (!recipes.length || !dayList.length) throw { code: 'invalid_json' };
  const prep = (Array.isArray(out.prep) ? out.prep : []).slice(0, 3).map(s => ({ day: String(s.day || '').slice(0, 20), recipes: (s.recipes || []).map(String).filter(x => ids.has(x)), minutes: Math.round(num(s.minutes)), steps: (s.steps || []).map(String).slice(0, 10), done: false }));
  const shopping = (Array.isArray(out.shopping) ? out.shopping : []).slice(0, 60).map(s => ({ item: String(s.item || s).slice(0, 60), amount: String(s.amount || '').slice(0, 30), category: String(s.category || 'Sonstiges').slice(0, 30), done: false }));
  S.mealPlan = { v: 2, at: Date.now(), prefs: { ...p }, recipes, days: dayList, prep, shopping };
  save();
}
const mpRecipe = id => S.mealPlan && S.mealPlan.recipes.find(r => r.id === id);
function vMealPlan() {
  const mp = S.mealPlan && S.mealPlan.v === 2 ? S.mealPlan : null, back = `<div class="row"><button class="iconbtn" data-nav="food" aria-label="Zurück">${ic('back')}</button><h1 class="disp grow">Ernährungsplan</h1>${mp && !mpBusy ? `<button class="iconbtn" data-act="mpconfig" aria-label="Plan anpassen">${ic('gear')}</button>` : ''}</div>`;
  if (!sampleFn) return back + `<div class="banner">${aiOffText()}</div>`;
  if (mpBusy) return back + `<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:12px;padding:32px 16px;text-align:center"><div class="spinner"></div><div style="font-weight:700">Erstelle deinen Plan …</div><div class="cap">Rezepte, Meal Prep und Einkaufsliste passend zu ${fmt(baseTargets().kcal)} kcal und ${baseTargets().p} g Protein. Das dauert etwa 30 bis 90 Sekunden.</div></div>`;
  if (!mp) { const p = mpDraft || (mpDraft = mpPrefs()); return back + `<div class="card soft"><div style="font-weight:700">So soll dein Plan aussehen</div><div class="cap" style="margin-top:4px">Wähle aus, dann erstellt die KI Rezepte, einen Meal-Prep-Plan und eine Einkaufsliste für einen Einkauf.</div></div>${mpErr ? `<div class="banner">${esc(mpErr)}</div>` : ''}<div class="card" id="mpcfg" style="display:flex;flex-direction:column;gap:14px">${mpConfigHTML(p)}</div><button class="btn btn-p btn-block" data-act="mpgen">${ic('spark', 18)} Plan erstellen</button><p class="cap" style="margin:0">Ein Vorschlag, keine medizinische Ernährungsberatung.</p>`; }
  const tabs = `<div class="seg"><button class="${mpTab === 'woche' ? 'on' : ''}" data-mptab="woche">Woche</button><button class="${mpTab === 'prep' ? 'on' : ''}" data-mptab="prep">Meal Prep</button><button class="${mpTab === 'shop' ? 'on' : ''}" data-mptab="shop">Einkauf</button></div>`;
  const pr = mp.prefs, info = `<div class="cap">${mp.days.length} ${mp.days.length === 1 ? 'Tag' : 'Tage'} · ${mp.recipes.length} Rezepte · ${pr.prep === '0' ? 'ohne Meal Prep' : 'Meal Prep ' + pr.prep + '× pro Woche'} · für ${pr.people} ${pr.people === 1 ? 'Person' : 'Personen'}</div>`;
  let body = '';
  if (mpTab === 'woche') body = mp.days.map((d, di) => { const rs = d.meals.map(m => mpRecipe(m.recipe)).filter(Boolean), kc = rs.reduce((a, r) => a + r.kcal, 0), pp = rs.reduce((a, r) => a + r.protein, 0), isT = d.key === dayKey();
    return `<div class="card" style="${isT ? 'border-color:var(--ember)' : ''}"><div class="row" style="justify-content:space-between"><div style="font-weight:800">${esc(d.label)}${isT ? ' <span class="tag ember">Heute</span>' : ''}</div><span class="cap num">${fmt(kc)} kcal · ${fmt(pp)} g P</span></div>
      <ul class="list">${d.meals.map((m, mi) => { const r = mpRecipe(m.recipe); if (!r) return ''; return `<li><button data-recipe="${esc(r.id)}" class="row grow" style="border:0;background:transparent;padding:0;text-align:left;gap:12px;min-width:0"><span style="flex:none;border-radius:10px;overflow:hidden;display:block">${dishSVG(r, 64)}</span><span style="min-width:0"><span class="cap" style="display:block">${SLOTS.find(s => s[0] === m.slot)[1]}${r.mealprep && pr.prep !== '0' ? ' · Meal Prep' : ''}</span><b style="display:block">${esc(r.name)}</b><span class="cap">${fmt(r.kcal)} kcal · ${fmt(r.protein)} g P</span></span></button><button class="iconbtn" style="width:38px;height:38px;${m.eaten ? 'background:var(--good);color:#fff' : ''}" data-mpeat="${di}:${mi}" aria-label="${m.eaten ? 'Eingetragen' : 'Als gegessen eintragen'}">${ic('check', 18)}</button></li>`; }).join('')}</ul></div>`; }).join('');
  if (mpTab === 'prep') body = mp.prep.length ? mp.prep.map((s, si) => `<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="row" style="justify-content:space-between"><div><div class="cap">Meal-Prep-Session</div><div style="font-weight:800;font-size:18px">${esc(s.day)}</div></div><span class="tag">${ic('timer', 14)} ca. ${s.minutes || '–'} min</span></div>
      <div class="row" style="gap:8px;flex-wrap:wrap">${s.recipes.map(id => { const r = mpRecipe(id); return r ? `<button class="chip" data-recipe="${esc(r.id)}">${esc(r.name)} · ${r.portions}×</button>` : ''; }).join('')}</div>
      ${s.steps.length ? `<ol class="steps">${s.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      <button class="btn ${s.done ? 'btn-s' : 'btn-p'} btn-block" data-prepdone="${si}">${s.done ? ic('check', 18) + ' Erledigt' : 'Als erledigt markieren'}</button></div>`).join('') + '<p class="cap" style="margin:0">Vorgekochtes in luftdichten Boxen im Kühlschrank lagern und spätestens nach 4 Tagen essen oder einfrieren.</p>'
    : '<div class="card empty">Dieser Plan ist ohne Meal Prep. Unter „Anpassen“ kannst du 1× oder 2× pro Woche wählen.</div>';
  if (mpTab === 'shop') { const groups = {}; mp.shopping.forEach((s, i) => (groups[s.category] = groups[s.category] || []).push([s, i])); const left = mp.shopping.filter(s => !s.done).length;
    body = `<div class="row" style="justify-content:space-between"><span class="cap">${left} von ${mp.shopping.length} offen · ein Einkauf für den ganzen Plan</span>${mp.shopping.some(s => s.done) ? '<button class="btn btn-g" data-act="shopreset">Zurücksetzen</button>' : ''}</div>` + Object.entries(groups).map(([c, items]) => `<div class="card" style="padding-top:8px;padding-bottom:4px"><div class="lbl">${esc(c)}</div>${items.map(([s, i]) => `<div class="sel" data-shop="${i}" style="cursor:pointer"><span class="pick ${s.done ? 'on' : ''}">${ic('check', 14)}</span><div class="grow" style="${s.done ? 'text-decoration:line-through;color:var(--ink-muted)' : ''}">${esc(s.item)}</div><span class="cap">${esc(s.amount)}</span></div>`).join('')}</div>`).join(''); }
  return back + info + tabs + body + `<p class="cap" style="margin:0">Erstellt ${ago(mp.at)}. Ein Vorschlag, keine medizinische Ernährungsberatung. Die Bilder sind Illustrationen.</p>`;
}
let mpDraft = null;
function mpConfigSheet() {
  const p = mpPrefs();
  const draw = sh => { sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between"><h2 class="disp">Plan anpassen</h2><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>${mpConfigHTML(p)}<button class="btn btn-p btn-block" data-mpgo>${ic('spark', 18)} Neuen Plan erstellen</button><p class="cap" style="margin:0">Der aktuelle Plan wird ersetzt.</p>`; };
  openSheet('', sh => { draw(sh); bindMpConfig(sh, p, () => draw(sh)); sh.addEventListener('click', ev => { if (ev.target.closest('[data-mpgo]')) { const di = sh.querySelector('#mp-dis'); p.dislikes = di ? di.value.trim() : ''; closeSheet(); runMealPlan(p); } }); });
}
async function runMealPlan(p) {
  S.mealPrefs = { ...p }; save(); mpBusy = true; mpErr = ''; view = 'mealplan'; render();
  try { await generateMealPlan(p); mpTab = 'woche'; mpDraft = null; } catch (e) { mpErr = errText(e); if (S.mealPlan && S.mealPlan.v === 2) toast(mpErr); }
  mpBusy = false; render();
}
function recipeSheet(id) {
  const r = mpRecipe(id); if (!r) return;
  openSheet(`<div style="border-radius:16px;overflow:hidden">${dishSVG(r, 600).replace(/width="600" height="\d+"/, 'width="100%" style="display:block"')}</div>
    <div class="row" style="justify-content:space-between;align-items:flex-start"><div style="min-width:0"><div class="cap">${SLOTS.find(s => s[0] === r.slot)[1]} · Illustration</div><h2 class="disp">${esc(r.name)}</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    <div class="chips"><span class="tag">${ic('timer', 14)} ${r.minutes} min</span><span class="tag">${r.portions} ${r.portions === 1 ? 'Portion' : 'Portionen'}</span>${r.mealprep ? '<span class="tag ember">Meal-Prep-geeignet</span>' : ''}${r.storage ? `<span class="tag">${esc(r.storage)}</span>` : ''}</div>
    <div class="card"><div class="row" style="justify-content:space-between"><div class="lbl">Pro Portion</div><span class="disp num" style="font-size:20px">${fmt(r.kcal)} kcal</span></div><div class="cap" style="margin-top:6px"><span class="dot p-bg"></span> ${fmt(r.protein)} g Protein · <span class="dot c-bg"></span> ${fmt(r.carbs)} g KH · <span class="dot f-bg"></span> ${fmt(r.fat)} g Fett${r.fiber !== undefined ? ` · ${fmt1(r.fiber)} g Ballaststoffe` : ''}</div></div>
    <div class="card"><div class="lbl" style="margin-bottom:6px">Zutaten für ${r.portions} ${r.portions === 1 ? 'Portion' : 'Portionen'}</div><ul class="steps">${r.ingredients.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="card"><div class="lbl" style="margin-bottom:6px">Zubereitung</div><ol class="steps">${r.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
    <button class="btn btn-p btn-block" data-reat>${ic('check', 18)} 1 Portion als gegessen eintragen</button>`, sh => sh.addEventListener('click', ev => {
      if (!ev.target.closest('[data-reat]')) return;
      today().meals[r.slot].push({ id: uid(), name: r.name, grams: 0, kcal: r0(r.kcal), p: r1(r.protein), c: r1(r.carbs), f: r1(r.fat), ...(r.fiber !== undefined ? { fib: r1(r.fiber) } : {}), src: 'plan' });
      const d = S.mealPlan.days.find(x => x.key === dayKey()); if (d) { const m = d.meals.find(x => x.recipe === r.id && !x.eaten); if (m) m.eaten = true; }
      save(); closeSheet(); render(); toast(`${r.name} eingetragen`);
    }));
}

/* ---------- Paywall (demo) ---------- */
function paywall(reason) {
  openSheet(`${reason ? `<div class="banner">${ic('lock', 18)}<div>${esc(reason)}</div></div>` : ''}<span class="tag ember" style="align-self:flex-start">Repwerk Pro</span><h2 class="disp" style="font-size:28px;line-height:32px">Dein Plan passt sich jede Woche an.</h2>
    <ul class="list">${['Keine Werbung','30 KI-Scans pro Tag statt 3','KI-Ernährungsplan mit Rezepten und Einkaufsliste','AI Coach mit 50 Nachrichten pro Tag','Trainingsplan, der mit deiner Leistung wächst','Wochen- und Monatsberichte'].map(x => `<li><span style="color:var(--good)">${ic('check', 20)}</span>${x}</li>`).join('')}</ul>
    ${payOn() ? '' : `<div class="card row" style="border-color:var(--ember);background:var(--ember-soft)"><div class="grow"><div style="font-weight:700">Jährlich</div><div class="cap">59,99 € pro Jahr · entspricht 5,00 € im Monat</div></div><span class="tag ember">−44 %</span></div>
    <div class="card"><div style="font-weight:700">Monatlich</div><div class="cap">8,99 € pro Monat</div></div>`}
    ${payOn() ? payButtonsHTML() : `<button class="btn btn-p btn-block" data-pro>Pro in der Demo freischalten</button>
    <p class="cap" style="margin:0;text-align:center">Prototyp: Es wird nichts bezahlt. In der App läuft der Kauf über App Store bzw. Google Play mit 7 Tagen gratis, jederzeit kündbar.</p>`}
    <button class="btn btn-g btn-block" data-close-sheet style="color:var(--ink-muted)">Mit Free weitermachen</button>`, sh => sh.addEventListener('click', ev => { if (ev.target.closest('[data-pro]') && !payOn()) { S.pro = true; save(); closeSheet(); render(); toast('Pro ist in der Demo aktiv'); } }));
}

/* ---------- Coach ---------- */
function coachContext() {
  const t = dayTotals(today()), g = dayTargets(), p = S.profile, pl = plan(), ck = lastCheckin(), tr = weightTrend(S);
  const last = S.workouts.slice(-3).map(w => ({ einheit: w.name, datum: dayKey(new Date(w.start)), saetze: doneCount(w), volumen_kg: r0(volume(w)), uebungen: w.exercises.map(e => `${exOf(e.exId).name}: ${e.sets.map(s => s.kg + 'x' + s.reps + (s.type !== 'n' ? '(' + TYPES[s.type] + ')' : '')).join(', ')}`) }));
  return { ziel: GOALS[p.goal], erfahrung: EXP[p.experience], koerper: { alter: p.age, groesse_cm: p.height, gewicht_kg: p.weight, wunschgewicht_kg: p.targetWeight || null }, ernaehrung: DIETS[p.diet], unvertraeglichkeiten: (p.allergies || []).map(a => ALLERGENS[a]), trainingstage_pro_woche: p.days, minuten_pro_training: p.duration, ort: p.location === 'home' ? 'zu Hause' : 'Studio', plan: pl.name, naechste_einheit: nextRoutine().name, heute: { kcal: r0(t.kcal), protein: r0(t.p), kh: r0(t.c), fett: r0(t.f), wasser_ml: today().water || 0 }, tagesziel: { kcal: g.kcal, protein: g.p, kh: g.c, fett: g.f, wasser_ml: g.water }, tagestyp: g.type === 'rest' ? 'Ruhetag' : 'Trainingstag', wochenschnitt_kcal: baseTargets().kcal, gewichtstrend_kg_pro_woche: tr.rate !== undefined ? r1(tr.rate) : null, letzter_checkin: ck, letzte_trainings: last, gewichtsverlauf: S.weights.slice(-6) };
}
function coach() {
  const wk = weekKey(); if (S.coach.week !== wk) S.coach = { week: wk, count: 0 };
  const left = () => S.pro ? 'Pro' : `${Math.max(0, lim().coach - S.coach.count)} von ${lim().coach} Fragen diese Woche frei`;
  const msgs = () => S.chat.slice(-12).map(m => `<div translate="no" style="align-self:${m.role === 'user' ? 'flex-end' : 'flex-start'};max-width:86%;padding:10px 14px;border-radius:18px;${m.role === 'user' ? 'background:var(--ember);color:var(--on-ember);border-bottom-right-radius:6px' : 'background:var(--surface);border:1px solid var(--line);border-bottom-left-radius:6px'};white-space:pre-wrap">${esc(m.content)}</div>`).join('');
  const sugg = ['Was soll ich heute essen, um mein Proteinziel zu schaffen?','Wie entwickle ich mich im Training?','Wie sollte mein nächster Trainingstag aussehen?'];
  openSheet(`<div class="row" style="justify-content:space-between"><div><div class="cap" id="cleft">${left()}</div><h2 class="disp">AI Coach</h2></div><button class="iconbtn" data-close-sheet aria-label="Schließen">${ic('x')}</button></div>
    ${sampleFn ? '' : `<div class="banner">${aiOffText()}</div>`}
    <div id="cm" style="display:flex;flex-direction:column;gap:10px;min-height:120px">${S.chat.length ? msgs() : `<p class="muted" style="margin:0">Der Coach kennt dein Ziel, deine Makros, deine Ernährung, deinen Plan und deine letzten Trainings. Frag zum Beispiel:</p><div style="display:flex;flex-direction:column;gap:8px">${sugg.map(s => `<button class="chip" style="text-align:left;white-space:normal" data-sug="${esc(s)}">${esc(s)}</button>`).join('')}</div>`}</div>
    <div class="row"><input class="input grow" id="ci" placeholder="Frag deinen Coach" aria-label="Frage an den Coach" ${sampleFn ? '' : 'disabled'}><button class="btn btn-p" data-send ${sampleFn ? '' : 'disabled'} aria-label="Senden">${ic('chat', 20)}</button></div>`, sh => {
      const send = async text => {
        if (!text || !sampleFn) return;
        if (!S.pro && S.coach.count >= lim().coach) { paywall('Du hast diese Woche ' + lim().coach + ' Coach-Fragen genutzt.'); return; }
        S.chat.push({ role: 'user', content: text.slice(0, 600) }); S.coach.count++; save();
        const cm = sh.querySelector('#cm'); cm.innerHTML = msgs() + '<div id="cr" style="align-self:flex-start;max-width:86%;padding:10px 14px;border-radius:18px;background:var(--surface);border:1px solid var(--line);white-space:pre-wrap" class="muted">Denkt nach …</div>';
        const rules = `Du bist der AI Coach der Fitness-App Repwerk Fitness. ${isEN() ? 'Antworte auf Englisch, locker und direkt,' : 'Antworte auf Deutsch, per du,'} kurz (höchstens 120 Wörter), konkret mit Zahlen aus den Daten. Ton: direkter, ermutigender Trainer, keine Übertreibung, keine Emojis. Beachte Ernährungsform und Unverträglichkeiten. Keine medizinischen Diagnosen, keine extremen Diäten; bei Schmerzen, Krankheit oder Essstörungs-Signalen freundlich auf Ärztin oder Arzt verweisen. Daten der Person (JSON): ${JSON.stringify(coachContext())}`;
        const turns = [{ role: 'user', content: rules }, ...S.chat.slice(-8)]; if (turns[1] && turns[1].role === 'assistant') turns.splice(1, 1);
        try { const { text: answer } = await sampleFn(turns, { cache: false, modelTier: 'quick', onText: ({ text }) => { const cr = sh.querySelector('#cr'); if (cr) { cr.classList.remove('muted'); cr.textContent = text; } } }); S.chat.push({ role: 'assistant', content: answer }); }
        catch (e) { S.chat.push({ role: 'assistant', content: e && e.text ? e.text : errText(e) }); }
        save(); cm.innerHTML = msgs(); cm.lastElementChild && cm.lastElementChild.scrollIntoView({ block: 'nearest' }); const c = sh.querySelector('#cleft'); if (c) c.textContent = left();
      };
      sh.addEventListener('click', ev => { const s = ev.target.closest('[data-sug]'); if (s) { send(s.dataset.sug); return; } if (ev.target.closest('[data-send]')) { const i = sh.querySelector('#ci'); const v = i.value.trim(); i.value = ''; send(v); } });
      sh.querySelector('#ci').addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); const v = ev.target.value.trim(); ev.target.value = ''; send(v); } });
    });
}

/* ---------- Boot ---------- */
S = migrate(loadLocal());
applyDesign(); applyLang();
render();
if (IN_CLAUDE) { connectDb(); connectSample(); } else { connectApi(); registerSW(); }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
setInterval(() => { if (!S || !S.active) return; const el = $('#w-dur'); if (el) el.textContent = clock(elapsed(S.active)); const b = $('#ab-dur'); if (b) b.textContent = clock(elapsed(S.active)); }, 1000);
