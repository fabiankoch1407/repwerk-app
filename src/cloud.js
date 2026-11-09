/* ---------- Account and cloud sync (Supabase) ----------
   No SDK: plain fetch to Supabase Auth (email code) and the REST API (one row per user in public.user_state).
   Config comes from /api/health (Cloudflare env SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY) and is cached for offline starts.
   Strings are bilingual inline via L(de, en) from smart.js. */
const AUTH_KEY = 'repwerk-auth', SB_KEY = 'repwerk-sb', SYNC_KEY = 'repwerk-sync';
const lsGet = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const lsSet = (k, v) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let SB = lsGet(SB_KEY), AUTH = lsGet(AUTH_KEY), cloud = { state: AUTH ? 'idle' : 'out', at: (lsGet(SYNC_KEY) || {}).at || 0, timer: null, dirty: false, busy: false };
function setAuth(a) { AUTH = a; lsSet(AUTH_KEY, a); }
function setSB(cfg) { const n = cfg && cfg.url && cfg.key ? { url: String(cfg.url).replace(/\/+$/, ''), key: cfg.key } : null; SB = n; lsSet(SB_KEY, n); }
const cloudOn = () => !IN_CLAUDE && !!SB;
const loggedIn = () => !!(SB && AUTH && AUTH.user);
const sessionFrom = j => ({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: { id: j.user.id, email: j.user.email } });

async function sbFetch(path, opts = {}, withUser = true) {
  const h = Object.assign({ apikey: SB.key, 'Content-Type': 'application/json' }, opts.headers || {});
  if (withUser) { const tok = await accessToken(); if (!tok) throw { code: 'auth' }; h.Authorization = 'Bearer ' + tok; }
  let r; try { r = await fetch(SB.url + path, Object.assign({}, opts, { headers: h })); } catch (e) { throw { code: 'network' }; }
  const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
  if (!r.ok) { const msg = j && (j.msg || j.message || j.error_description || j.error || j.error_code) || ''; throw { code: r.status === 429 || /rate|seconds/i.test(msg) ? 'rate' : r.status === 401 || r.status === 403 ? 'auth' : r.status >= 500 ? 'server' : 'bad', status: r.status, msg }; }
  return j;
}
let refreshing = null;
async function accessToken() {
  if (!AUTH) return null;
  if (AUTH.expires_at * 1000 - Date.now() > 60000) return AUTH.access_token;
  if (!refreshing) refreshing = (async () => {
    try { setAuth(sessionFrom(await sbFetch('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: AUTH.refresh_token }) }, false))); }
    catch (e) { if (e.code === 'auth' || e.code === 'bad') { setAuth(null); cloud.state = 'out'; } }
    finally { refreshing = null; }
  })();
  await refreshing; return AUTH ? AUTH.access_token : null;
}
const sendCode = email => sbFetch('/auth/v1/otp', { method: 'POST', body: JSON.stringify({ email, create_user: true }) }, false);
async function verifyCode(email, token) { setAuth(sessionFrom(await sbFetch('/auth/v1/verify', { method: 'POST', body: JSON.stringify({ type: 'email', email, token }) }, false))); }

/* ---------- Sync: whole state as one JSON document, newest wins ---------- */
async function cloudPull() { const rows = await sbFetch(`/rest/v1/user_state?select=data,updated_at&user_id=eq.${AUTH.user.id}`, { method: 'GET' }); return rows && rows[0] ? rows[0].data : null; }
async function cloudPush() {
  if (!loggedIn() || cloud.busy) { cloud.dirty = true; return; }
  cloud.busy = true; cloud.dirty = false; cloud.state = 'syncing'; paintCloud();
  try {
    await sbFetch('/rest/v1/user_state?on_conflict=user_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ user_id: AUTH.user.id, data: S, updated_at: new Date(S.at || Date.now()).toISOString() }) });
    markSynced(); cloud.state = 'ok';
  } catch (e) { cloud.dirty = true; cloud.state = e.code === 'auth' && !AUTH ? 'out' : 'error'; }
  finally { cloud.busy = false; paintCloud(); if (cloud.dirty && cloud.state === 'ok') cloudSchedule(); }
}
function markSynced() { cloud.at = Date.now(); lsSet(SYNC_KEY, { uid: AUTH.user.id, at: cloud.at }); }
function cloudSchedule() { if (!loggedIn()) return; cloud.dirty = true; clearTimeout(cloud.timer); cloud.timer = setTimeout(cloudPush, 1500); }
function adoptRemote(data) {
  S = migrate(data); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  if (typeof ob !== 'undefined') ob = null;
  markSynced(); applyDesign(); applyLang(); view = 'home'; render();
}
const summaryOf = d => {
  if (!d || !d.profile) return '';
  const w = (d.workouts || []).length, f = Object.values(d.days || {}).filter(x => x && x.meals && Object.values(x.meals).some(a => a && a.length)).length, when = new Date(d.at || 0).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  return L(`<span translate="no">${esc(d.profile.name || 'Ohne Namen')}</span> · ${w} ${w === 1 ? 'Training' : 'Trainings'} · ${f} ${f === 1 ? 'Tag' : 'Tage'} mit Essen · geändert ${when}`, `<span translate="no">${esc(d.profile.name || 'No name')}</span> · ${w} ${w === 1 ? 'workout' : 'workouts'} · ${f} ${f === 1 ? 'day' : 'days'} with food · changed ${when}`);
};
/* first: true right after logging in on this device */
async function cloudSync(first) {
  if (!loggedIn() || cloud.busy) return;
  if (first) setTimeout(handleInviteParam, 1200);
  cloud.state = 'syncing'; paintCloud();
  let remote; try { remote = await cloudPull(); } catch (e) { cloud.state = e.code === 'auth' && !AUTH ? 'out' : 'error'; paintCloud(); return; }
  const meta = lsGet(SYNC_KEY), known = meta && meta.uid === AUTH.user.id, localHas = !!(S && S.profile), remoteHas = !!(remote && remote.profile);
  if (!remoteHas && !localHas) { cloud.state = 'ok'; markSynced(); paintCloud(); return; }
  if (remoteHas && !localHas) { adoptRemote(remote); cloud.state = 'ok'; if (first) toast(L('Angemeldet. Deine Daten sind geladen.', 'Signed in. Your data is loaded.')); return; }
  if (!remoteHas && localHas) { await cloudPush(); if (first) toast(L('Angemeldet. Deine Daten sind jetzt gesichert.', 'Signed in. Your data is now backed up.')); return; }
  if (!known) { cloud.state = 'idle'; paintCloud(); conflictSheet(remote); return; }
  if ((remote.at || 0) > (S.at || 0)) { adoptRemote(remote); cloud.state = 'ok'; paintCloud(); }
  else if ((S.at || 0) > (remote.at || 0)) await cloudPush();
  else { cloud.state = 'ok'; markSynced(); paintCloud(); }
}
function conflictSheet(remote) {
  openSheet(`<h2 class="disp">${L('Welche Daten möchtest du behalten?', 'Which data do you want to keep?')}</h2>
    <p class="muted" style="margin:0">${L('In deinem Konto und auf diesem Gerät liegen unterschiedliche Daten. Die anderen werden ersetzt.', 'Your account and this device hold different data. The other set will be replaced.')}</p>
    <button class="card row" data-cf="remote" style="text-align:left;gap:12px"><span class="dayic" style="--c:var(--ember)">${ic('users', 20)}</span><span class="grow"><b>${L('Daten aus dem Konto', 'Data from your account')}</b><span class="cap" style="display:block">${summaryOf(remote)}</span></span></button>
    <button class="card row" data-cf="local" style="text-align:left;gap:12px"><span class="dayic" style="--c:var(--protein)">${ic('home', 20)}</span><span class="grow"><b>${L('Daten auf diesem Gerät', 'Data on this device')}</b><span class="cap" style="display:block">${summaryOf(S)}</span></span></button>`,
  sh => sh.addEventListener('click', async ev => { const b = ev.target.closest('[data-cf]'); if (!b) return; closeSheet();
    if (b.dataset.cf === 'remote') { adoptRemote(remote); cloud.state = 'ok'; toast(L('Daten aus dem Konto geladen', 'Loaded data from your account')); }
    else { S.at = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} await cloudPush(); toast(L('Daten von diesem Gerät gesichert', 'Backed up the data from this device')); } }));
}

/* ---------- UI ---------- */
const cloudErr = e => ({ rate: L('Zu viele Versuche. Warte eine Minute und versuch es dann noch mal.', 'Too many attempts. Wait a minute and try again.'), network: L('Keine Verbindung. Prüf dein Internet.', 'No connection. Check your internet.'), server: L('Der Server antwortet gerade nicht. Versuch es gleich noch mal.', 'The server isn’t responding. Try again shortly.') })[e && e.code] || '';
function loginSheet() {
  const st = { step: 'email', email: (AUTH && AUTH.user && AUTH.user.email) || '', err: '', busy: false, sentAt: 0 };
  const draw = sh => {
    const wait = Math.max(0, 60 - Math.floor((Date.now() - st.sentAt) / 1000));
    sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between"><h2 class="disp">${st.step === 'email' ? L('Anmelden', 'Sign in') : L('Code eingeben', 'Enter code')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
      ${st.step === 'email' ? `<p class="muted" style="margin:0">${L('Wir schicken dir einen Code per E-Mail. Kein Passwort nötig. Neu hier? Dann legen wir dein Konto automatisch an.', 'We email you a code. No password needed. New here? We create your account automatically.')}</p>
        <label class="field"><span class="lbl">${L('E-Mail', 'Email')}</span><input class="input" id="lg-mail" type="email" inputmode="email" autocomplete="email" value="${esc(st.email)}" placeholder="name@beispiel.de"></label>
        <button class="btn btn-p btn-block" data-lg="send" ${st.busy ? 'disabled' : ''}>${st.busy ? L('Wird gesendet …', 'Sending …') : L('Code senden', 'Send code')}</button>`
      : `<p class="muted" style="margin:0">${L(`Wir haben einen Code an <b>${esc(st.email)}</b> geschickt. Schau auch im Spam-Ordner nach.`, `We sent a code to <b>${esc(st.email)}</b>. Check your spam folder too.`)}</p>
        <input class="input codein" id="lg-code" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="123456" aria-label="${L('Code aus der E-Mail', 'Code from the email')}">
        <button class="btn btn-p btn-block" data-lg="verify" ${st.busy ? 'disabled' : ''}>${st.busy ? L('Wird geprüft …', 'Checking …') : L('Anmelden', 'Sign in')}</button>
        <div class="row" style="justify-content:space-between"><button class="btn btn-g" data-lg="back">${L('Andere E-Mail', 'Different email')}</button><button class="btn btn-g" data-lg="resend" ${wait ? 'disabled' : ''}>${wait ? L(`Neuer Code in ${wait} s`, `New code in ${wait} s`) : L('Code erneut senden', 'Resend code')}</button></div>`}
      ${st.err ? `<div class="banner" role="alert" style="color:var(--critical)">${ic('info', 18)}<div>${st.err}</div></div>` : ''}
      <p class="cap" style="margin:0">${L('Deine Daten werden verschlüsselt übertragen und sind nur mit deinem Konto abrufbar. Ohne Konto bleiben sie nur auf diesem Gerät.', 'Your data is sent encrypted and can only be accessed with your account. Without an account it stays on this device only.')}</p>`;
    const inp = sh.querySelector(st.step === 'email' ? '#lg-mail' : '#lg-code'); if (inp && !st.busy) setTimeout(() => inp.focus(), 50);
  };
  const go = async (sh, a) => {
    if (a === 'send' || a === 'resend') {
      if (a === 'send') st.email = (sh.querySelector('#lg-mail').value || '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(st.email)) { st.err = L('Bitte gib eine gültige E-Mail-Adresse ein.', 'Please enter a valid email address.'); draw(sh); return; }
      st.busy = true; st.err = ''; draw(sh);
      try { await sendCode(st.email); st.step = 'code'; st.sentAt = Date.now(); const t = setInterval(() => { if (!sh.isConnected || Date.now() - st.sentAt > 61000) { clearInterval(t); if (sh.isConnected) draw(sh); return; } const b = sh.querySelector('[data-lg=resend]'); if (b) { const w = Math.max(0, 60 - Math.floor((Date.now() - st.sentAt) / 1000)); b.textContent = L(`Neuer Code in ${w} s`, `New code in ${w} s`); } }, 1000); }
      catch (e) { st.err = cloudErr(e) || L('Der Code konnte nicht gesendet werden. Prüf die E-Mail-Adresse.', 'Couldn’t send the code. Check the email address.'); }
      st.busy = false; draw(sh);
    }
    if (a === 'verify') {
      const code = (sh.querySelector('#lg-code').value || '').replace(/\D/g, '');
      if (code.length < 6) { st.err = L('Der Code hat mindestens 6 Ziffern.', 'The code has at least 6 digits.'); draw(sh); return; }
      st.busy = true; st.err = ''; draw(sh);
      try { await verifyCode(st.email, code); closeSheet(); cloud.state = 'idle'; render(); await cloudSync(true); }
      catch (e) { st.busy = false; st.err = cloudErr(e) || L('Der Code stimmt nicht oder ist abgelaufen. Fordere einen neuen an.', 'The code is wrong or has expired. Request a new one.'); draw(sh); }
    }
    if (a === 'back') { st.step = 'email'; st.err = ''; draw(sh); }
  };
  openSheet('', sh => { draw(sh);
    sh.addEventListener('click', ev => { const b = ev.target.closest('[data-lg]'); if (b && !b.disabled) go(sh, b.dataset.lg); });
    sh.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target.matches('input')) { ev.preventDefault(); go(sh, st.step === 'email' ? 'send' : 'verify'); } });
  });
}
function cloudStatusText() {
  if (!loggedIn()) return L('Nicht angemeldet · Daten nur auf diesem Gerät', 'Not signed in · data only on this device');
  if (cloud.state === 'syncing') return L('Wird synchronisiert …', 'Syncing …');
  if (cloud.state === 'error') return L('Nicht synchronisiert. Wir versuchen es automatisch erneut.', 'Not synced. We’ll retry automatically.');
  return cloud.at ? L(`Gesichert · ${new Date(cloud.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`, `Backed up · ${new Date(cloud.at).toLocaleString(LOC(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`) : L('Angemeldet', 'Signed in');
}
function paintCloud() { document.querySelectorAll('[data-cloudstatus]').forEach(el => { el.textContent = cloudStatusText(); el.classList.toggle('bad', cloud.state === 'error'); }); }
function accountCardSettings() {
  if (!cloudOn()) return `<div class="card"><div class="lbl">${L('Konto', 'Account')}</div><div class="cap" style="margin-top:4px">${IN_CLAUDE ? L('Im Prototyp in Claude werden deine Daten über Claude gespeichert.', 'In the prototype inside Claude, your data is saved through Claude.') : L('Login und Cloud-Speicher sind auf diesem Server noch nicht eingerichtet. Deine Daten liegen nur auf diesem Gerät.', 'Login and cloud backup aren’t set up on this server yet. Your data is only on this device.')}</div>
    <button class="btn btn-s btn-block" data-cl="export" style="margin-top:12px">${ic('down', 18)} ${L('Daten exportieren', 'Export data')}</button></div>`;
  if (!loggedIn()) return `<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">${L('Konto', 'Account')}</div><div class="cap" data-cloudstatus>${cloudStatusText()}</div>
    <p style="margin:0">${L('Melde dich an, damit deine Daten sicher sind und auf jedem Gerät da sind.', 'Sign in so your data is safe and available on every device.')}</p>
    <button class="btn btn-p btn-block" data-cl="login">${L('Anmelden oder Konto erstellen', 'Sign in or create account')}</button>
    <button class="btn btn-s btn-block" data-cl="export">${ic('down', 18)} ${L('Daten exportieren', 'Export data')}</button></div>`;
  return `<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="lbl">${L('Konto', 'Account')}</div>
    <div class="row" style="gap:12px"><span class="dayic" style="--c:var(--good)">${ic('check', 20)}</span><div class="grow" style="min-width:0"><div style="font-weight:700;overflow:hidden;text-overflow:ellipsis" translate="no">${esc(AUTH.user.email)}</div><div class="cap cloudst" data-cloudstatus>${cloudStatusText()}</div></div></div>
    <div class="grid2"><button class="btn btn-s" data-cl="sync">${L('Jetzt sichern', 'Sync now')}</button><button class="btn btn-s" data-cl="export">${L('Exportieren', 'Export')}</button></div>
    <button class="btn btn-s btn-block" data-cl="logout">${L('Abmelden', 'Sign out')}</button>
    <button class="btn btn-g" data-cl="delete" style="color:var(--critical);align-self:flex-start">${L('Konto löschen', 'Delete account')}</button></div>`;
}
function accountHomeCard() {
  if (!cloudOn() || loggedIn() || S.hideAccount) return '';
  return `<div class="card startcard"><div class="row" style="justify-content:space-between"><h2 class="disp" style="font-size:19px;line-height:24px">${L('Sichere deine Daten', 'Back up your data')}</h2><button class="btn btn-g" data-cl="hide">${L('Später', 'Later')}</button></div>
    <p style="margin:0">${L('Mit einem Konto gehen deine Trainings und Mahlzeiten nicht verloren, auch nicht bei einem neuen Handy.', 'With an account your workouts and meals are never lost, even on a new phone.')}</p>
    <button class="btn btn-p btn-block" data-cl="login">${L('Konto erstellen', 'Create account')}</button></div>`;
}
const onboardLoginBtn = () => cloudOn() && !loggedIn() ? `<button class="btn btn-g" data-cl="login" style="align-self:flex-start;padding:0">${L('Ich habe schon ein Konto', 'I already have an account')}</button>` : '';
function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `repwerk-daten-${dayKey()}.json`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(L('Export gestartet', 'Export started'));
}
async function signOut() {
  if (!await confirmBox(L('Abmelden?', 'Sign out?'), L('Deine Daten bleiben in deinem Konto. Auf diesem Gerät werden sie entfernt.', 'Your data stays in your account. It will be removed from this device.'), L('Abmelden', 'Sign out'))) return;
  if (cloud.dirty) await cloudPush();
  if (cloud.dirty) { if (!await confirmBox(L('Nicht alles gesichert', 'Not everything is backed up'), L('Die letzten Änderungen konnten nicht hochgeladen werden. Trotzdem abmelden?', 'Your latest changes couldn’t be uploaded. Sign out anyway?'), L('Abmelden', 'Sign out'), true)) return; }
  try { await sbFetch('/auth/v1/logout', { method: 'POST' }); } catch (e) {}
  setAuth(null); lsSet(SYNC_KEY, null); cloud = Object.assign(cloud, { state: 'out', at: 0, dirty: false });
  const lang = S.lang; S = blank(); S.lang = lang; try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  applyDesign(); view = 'home'; render(); toast(L('Abgemeldet', 'Signed out'));
}
async function deleteAccount() {
  if (!await confirmBox(L('Konto endgültig löschen?', 'Delete your account for good?'), L('Dein Konto und alle gespeicherten Daten werden gelöscht, in der Cloud und auf diesem Gerät. Das lässt sich nicht rückgängig machen. Exportiere vorher deine Daten, wenn du sie behalten willst.', 'Your account and all saved data will be deleted, in the cloud and on this device. This can’t be undone. Export your data first if you want to keep it.'), L('Konto löschen', 'Delete account'), true)) return;
  try { await sbFetch('/rest/v1/rpc/delete_user', { method: 'POST', body: '{}' }); }
  catch (e) { toast(cloudErr(e) || L('Löschen hat nicht geklappt. Versuch es noch mal.', 'Deleting didn’t work. Try again.')); return; }
  setAuth(null); lsSet(SYNC_KEY, null); cloud = Object.assign(cloud, { state: 'out', at: 0, dirty: false });
  S = blank(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  applyDesign(); view = 'home'; render(); toast(L('Konto gelöscht', 'Account deleted'));
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-cl]'); if (!b || !S) return;
  const a = b.dataset.cl;
  if (a === 'login') loginSheet();
  else if (a === 'hide') { S.hideAccount = true; save(); render(); }
  else if (a === 'sync') cloudSync(false).then(() => { if (cloud.state === 'ok') toast(L('Synchronisiert', 'Synced')); else if (cloud.state === 'error') toast(L('Synchronisieren hat nicht geklappt', 'Sync didn’t work')); });
  else if (a === 'export') exportData();
  else if (a === 'logout') signOut();
  else if (a === 'delete') deleteAccount();
});
document.addEventListener('visibilitychange', () => { if (!loggedIn()) return; if (document.visibilityState === 'hidden') { if (cloud.dirty) { clearTimeout(cloud.timer); cloudPush(); } } else cloudSync(false); });
window.addEventListener('online', () => { if (loggedIn() && cloud.dirty) cloudPush(); });

/* ---------- Community backend ----------
   CB is the community store. Inside Claude it wraps window.claude's db (claudeCB); in the web app it talks to
   Supabase tables public.profiles and public.posts (supaCB). The community views in app.js only use CB. */
let CB = null;
function claudeCB(db, me) {
  return {
    kind: 'claude',
    setProfile: p => db.doc(`profiles/${me}`).set(p),
    profiles: async () => { const q = await db.collection('profiles').limit(200).get(); return Object.fromEntries(q.docs.map(d => [d.id, d.data()])); },
    profilesByIds: async ids => { const all = await CB.profiles(); return Object.fromEntries(ids.filter(id => all[id]).map(id => [id, all[id]])); },
    setPost: post => db.doc(`posts/${me}/list/${post.id}`).set(post),
    updatePost: (id, f) => db.doc(`posts/${me}/list/${id}`).update(f),
    deletePost: id => db.doc(`posts/${me}/list/${id}`).delete(),
    listPosts: async (ids, limit) => (await Promise.all(ids.map(id => db.collection(`posts/${id}/list`).orderBy('at', 'desc').limit(limit).get().then(q => q.docs.map(d => d.data())).catch(() => [])))).flat().sort((a, b) => b.at - a.at).slice(0, limit * 4),
    getPost: async (author, id) => { const s = await db.doc(`posts/${author}/list/${id}`).get(); return s.exists ? s.data() : null; },
    deleteAll: async () => { const q = await db.collection(`posts/${me}/list`).get(); await Promise.all(q.docs.map(x => db.doc(`posts/${me}/list/${x.id}`).delete())); await db.doc(`profiles/${me}`).delete(); }
  };
}
const PROF_COLS = 'id,name,bio,avatar,goal,at';
const profMap = rows => Object.fromEntries((rows || []).map(r => [r.id, { name: r.name, bio: r.bio, avatar: r.avatar, goal: r.goal, at: r.at }]));
const uuidOk = id => /^[0-9a-f-]{36}$/i.test(id);
function supaCB() {
  const me = () => AUTH.user.id, J = b => JSON.stringify(b);
  return {
    kind: 'supabase',
    setProfile: p => sbFetch('/rest/v1/profiles?on_conflict=id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: J({ id: me(), name: p.name || '', bio: p.bio || '', avatar: p.avatar || '', goal: p.goal || '', at: p.at || Date.now() }) }),
    profiles: async q => profMap(await sbFetch(`/rest/v1/profiles?select=${PROF_COLS}&order=at.desc&limit=100${q ? '&name=ilike.' + encodeURIComponent('*' + q.replace(/[*,()]/g, '') + '*') : ''}`, { method: 'GET' })),
    profilesByIds: async ids => { ids = ids.filter(uuidOk); return ids.length ? profMap(await sbFetch(`/rest/v1/profiles?select=${PROF_COLS}&id=in.(${ids.join(',')})`, { method: 'GET' })) : {}; },
    setPost: post => sbFetch('/rest/v1/posts?on_conflict=author,id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: J({ author: me(), id: post.id, at: post.at, data: Object.assign({}, post, { author: me() }) }) }),
    updatePost: async (id, f) => { const p = await CB.getPost(me(), id); if (p) await CB.setPost(Object.assign(p, f)); },
    deletePost: id => sbFetch(`/rest/v1/posts?author=eq.${me()}&id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' }),
    listPosts: async (ids, limit) => { ids = ids.filter(uuidOk); if (!ids.length) return []; const rows = await sbFetch(`/rest/v1/posts?select=data&author=in.(${ids.join(',')})&order=at.desc&limit=${limit * 4}`, { method: 'GET' }); return rows.map(r => r.data); },
    getPost: async (author, id) => { if (!uuidOk(author)) return null; const rows = await sbFetch(`/rest/v1/posts?select=data&author=eq.${author}&id=eq.${encodeURIComponent(id)}`, { method: 'GET' }); return rows[0] ? rows[0].data : null; },
    deleteAll: async () => { await sbFetch(`/rest/v1/posts?author=eq.${me()}`, { method: 'DELETE' }); await sbFetch(`/rest/v1/profiles?id=eq.${me()}`, { method: 'DELETE' }); }
  };
}
/* Turn the Supabase community on or off depending on login state */
function syncCommunity() {
  if (IN_CLAUDE) return;
  const on = loggedIn();
  if (on && (!CB || CB.kind !== 'supabase' || UID !== AUTH.user.id)) { CB = supaCB(); UID = AUTH.user.id; feed = null; people = null; feedState = 'idle'; if (S.social && S.social.name) setTimeout(() => publishProfile().catch(() => {}), 0); }
  if (!on && CB) { CB = null; UID = null; feed = null; people = null; feedState = 'idle'; }
}
/* Invite link: ?freund=<user id> opens that person's profile */
function inviteLink() { return `${location.origin}${location.pathname}?freund=${UID}`; }
async function shareInvite() {
  const url = inviteLink(), text = L('Trainier mit mir in Repwerk Fitness. Folge mir hier:', 'Train with me in Repwerk Fitness. Follow me here:');
  try { if (navigator.share) { await navigator.share({ title: 'Repwerk Fitness', text, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(url); toast(L('Link kopiert', 'Link copied')); } catch (e) { openSheet(`<h2 class="disp">${L('Einladungslink', 'Invite link')}</h2><input class="input" readonly value="${esc(url)}" onfocus="this.select()"><button class="btn btn-s btn-block" data-close-sheet>${L('Fertig', 'Done')}</button>`); }
}
let pendingFriend = (() => { try { return new URLSearchParams(location.search).get('freund'); } catch (e) { return null; } })();
function handleInviteParam() {
  const id = pendingFriend; if (!id || !S || !S.profile) return;
  if (!CB) { if (cloudOn() && !loggedIn()) { view = 'community'; render(); toast(L('Melde dich an, um deinem Freund zu folgen', 'Sign in to follow your friend')); } return; }
  pendingFriend = null; try { history.replaceState(null, '', location.pathname); } catch (e) {}
  if (id !== UID) { view = 'community'; render(); personSheet(id); }
}
document.addEventListener('input', e => {
  if (e.target.id !== 'pq') return;
  clearTimeout(peopleTimer); const v = e.target.value.trim();
  peopleTimer = setTimeout(async () => { peopleQ = v; await loadPeople(); render(); const i = document.getElementById('pq'); if (i) { i.focus(); try { i.setSelectionRange(i.value.length, i.value.length); } catch (er) {} } }, 350);
});
