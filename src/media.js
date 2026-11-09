/* ---------- Workout photos ----------
   A workout keeps only references: w.photos = [{ id, url? }]. The image itself lives in IndexedDB on this device
   (key = id) and, when signed in, in the Supabase Storage bucket "workout-photos" at <user id>/<photo id>.jpg (url).
   <img data-ph="id"> without src is filled in automatically from IndexedDB. Strings bilingual via L(de, en). */
const MAX_PHOTOS = 6, PH_BUCKET = 'workout-photos';
let idbP = null;
function idb() {
  if (!idbP) idbP = new Promise((res, rej) => { try { const r = indexedDB.open('repwerk-media', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } });
  return idbP;
}
async function idbDo(mode, fn) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction('photos', mode), st = tx.objectStore('photos'), rq = fn(st); tx.oncomplete = () => res(rq && rq.result); tx.onerror = () => rej(tx.error); }); }
const idbPut = (id, blob) => idbDo('readwrite', st => st.put(blob, id));
const idbGet = id => idbDo('readonly', st => st.get(id)).catch(() => null);
const idbDel = id => idbDo('readwrite', st => st.delete(id)).catch(() => {});

async function photoBlob(file, max = 1600, q = 0.82) {
  const bmp = await createImageBitmap(file).catch(async () => { const u = URL.createObjectURL(file); try { const i = new Image(); i.src = u; await i.decode(); return i; } finally { setTimeout(() => URL.revokeObjectURL(u), 1000); } });
  const w = bmp.width, h = bmp.height, k = Math.min(1, max / Math.max(w, h)), c = document.createElement('canvas');
  c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('encode')), 'image/jpeg', q));
}
/* Turn picked files into photo refs (stored locally right away, uploaded in the background) */
async function addPhotoFiles(files, list) {
  let added = 0;
  for (const f of [...files]) {
    if (list.length >= MAX_PHOTOS) { toast(L(`Höchstens ${MAX_PHOTOS} Fotos pro Training`, `At most ${MAX_PHOTOS} photos per workout`)); break; }
    if (!/^image\//.test(f.type || 'image/')) continue;
    try { const b = await photoBlob(f), id = 'ph' + uid(); await idbPut(id, b); list.push({ id }); added++; }
    catch (e) { toast(L('Ein Bild konnte nicht geladen werden', 'An image couldn’t be loaded')); }
  }
  if (added) uploadPending();
  return added;
}
const phSrc = p => typeof p === 'string' ? p : (p && p.url) || '';
const photosOf = w => w ? (Array.isArray(w.photos) ? w.photos : w.photo ? [w.photo] : []) : [];
function photoStrip(list, opts = {}) {
  if (!list.length) return '';
  return `<div class="phstrip ${opts.edit ? 'edit' : ''}">${list.map((p, i) => `<div class="ph"><img ${phSrc(p) ? `src="${esc(phSrc(p))}" loading="lazy"` : `data-ph="${esc(p.id)}"`} alt="${L('Trainingsfoto', 'Workout photo')} ${i + 1}" data-viewph="${i}">${opts.edit ? `<button class="phx" data-rmph="${i}" aria-label="${L('Foto entfernen', 'Remove photo')}">${ic('x', 16)}</button>` : ''}</div>`).join('')}</div>`;
}
function photoAddBtn(list, attr = 'data-addph') {
  if (list.length >= MAX_PHOTOS) return '';
  return `<label class="btn btn-s btn-block">${ic('img', 20)} ${list.length ? L('Weitere Fotos hinzufügen', 'Add more photos') : L('Fotos hinzufügen', 'Add photos')}<input type="file" accept="image/*" multiple class="hidden" ${attr}></label>`;
}
/* Fill <img data-ph> from IndexedDB */
const phUrls = new Map();
async function hydratePhotos(root = document) {
  for (const img of root.querySelectorAll('img[data-ph]:not([src])')) {
    const id = img.dataset.ph; let u = phUrls.get(id);
    if (!u) { const b = await idbGet(id); if (b) { u = URL.createObjectURL(b); phUrls.set(id, u); } }
    if (u) img.src = u; else { img.removeAttribute('data-ph'); img.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="3"><rect width="4" height="3" fill="#888" opacity=".25"/></svg>'); img.title = L('Foto liegt auf einem anderen Gerät', 'Photo is on another device'); }
  }
}
new MutationObserver(() => { if (document.querySelector('img[data-ph]:not([src])')) hydratePhotos(); }).observe(document.documentElement, { childList: true, subtree: true });
function viewPhoto(src) { openSheet(`<img class="phfull" src="${esc(src)}" alt="${L('Trainingsfoto', 'Workout photo')}"><button class="btn btn-s btn-block" data-close-sheet>${L('Schließen', 'Close')}</button>`); }
document.addEventListener('click', e => { const im = e.target.closest('img[data-viewph]'); if (im && im.src && !im.closest('.phstrip.edit')) { e.stopPropagation(); e.preventDefault(); viewPhoto(im.src); } }, true);
/* Photos during a running workout */
document.addEventListener('change', async e => { if (!e.target.matches('[data-wph]') || !S.active) return; S.active.photos = S.active.photos || []; if (await addPhotoFiles(e.target.files, S.active.photos)) { save(); render(); } });
document.addEventListener('click', e => { const b = e.target.closest('#wph [data-rmph]'); if (!b || !S.active) return; const [p] = S.active.photos.splice(+b.dataset.rmph, 1); deletePhotos([p]); save(); render(); });
async function clearLocalPhotos() { try { const db = await idbP; if (db) db.close(); } catch (e) {} idbP = null; phUrls.forEach(u => URL.revokeObjectURL(u)); phUrls.clear(); try { indexedDB.deleteDatabase('repwerk-media'); } catch (e) {} }

/* ---------- Cloud storage ---------- */
const phPath = id => `${AUTH.user.id}/${id}.jpg`;
async function uploadPhoto(p) {
  const b = await idbGet(p.id); if (!b) return false;
  const tok = await accessToken(); if (!tok) return false;
  const r = await fetch(`${SB.url}/storage/v1/object/${PH_BUCKET}/${phPath(p.id)}`, { method: 'POST', headers: { apikey: SB.key, Authorization: 'Bearer ' + tok, 'Content-Type': 'image/jpeg', 'x-upsert': 'true', 'cache-control': '31536000' }, body: b }).catch(() => null);
  if (!r || !r.ok) return false;
  p.url = `${SB.url}/storage/v1/object/public/${PH_BUCKET}/${phPath(p.id)}`; return true;
}
let uploading = null;
function uploadPending() {
  if (!loggedIn() || IN_CLAUDE) return Promise.resolve();
  if (uploading) return uploading;
  uploading = (async () => {
    let changed = false;
    const lists = [...S.workouts.map(photosOf), S.active ? (S.active.photos || []) : []];
    for (const l of lists) for (const p of l) if (p && typeof p === 'object' && !p.url) { if (await uploadPhoto(p)) changed = true; }
    if (changed) save();
  })().finally(() => { uploading = null; });
  return uploading;
}
async function deletePhotos(list) {
  const own = list.filter(p => p && typeof p === 'object');
  own.forEach(p => { idbDel(p.id); const u = phUrls.get(p.id); if (u) { URL.revokeObjectURL(u); phUrls.delete(p.id); } });
  const paths = own.filter(p => p.url && loggedIn() && p.url.includes(`/${AUTH.user.id}/`)).map(p => phPath(p.id));
  if (paths.length) try { await sbFetch(`/storage/v1/object/${PH_BUCKET}`, { method: 'DELETE', body: JSON.stringify({ prefixes: paths }) }); } catch (e) {}
}
async function deleteAllCloudPhotos() {
  if (!loggedIn()) return;
  for (let round = 0; round < 20; round++) {
    let items; try { items = await sbFetch(`/storage/v1/object/list/${PH_BUCKET}`, { method: 'POST', body: JSON.stringify({ prefix: AUTH.user.id, limit: 1000, offset: 0 }) }); } catch (e) { return; }
    if (!items || !items.length) return;
    try { await sbFetch(`/storage/v1/object/${PH_BUCKET}`, { method: 'DELETE', body: JSON.stringify({ prefixes: items.map(i => `${AUTH.user.id}/${i.name}`) }) }); } catch (e) { return; }
  }
}
/* What goes into a shared post */
async function postPhotos(list) {
  if (CB && CB.kind === 'supabase') { await Promise.race([uploadPending(), new Promise(r => setTimeout(r, 15000))]); return { photos: list.filter(p => p && p.url).map(p => p.url) }; }
  const first = list[0]; if (!first) return { photo: '' };
  if (typeof first === 'string') return { photo: first };
  const b = await idbGet(first.id); if (!b) return { photo: '' };
  try { return { photo: await compressImage(b, 900, 0.72) }; } catch (e) { return { photo: '' }; }
}
/* Edit the photos of a saved workout */
function editPhotosSheet(w) {
  w.photos = photosOf(w).filter(p => typeof p === 'object');
  const draw = sh => { sh.innerHTML = `<div class="grab"></div><div class="row" style="justify-content:space-between"><h2 class="disp">${L('Fotos', 'Photos')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    ${w.photos.length ? photoStrip(w.photos, { edit: true }) : `<p class="muted" style="margin:0">${L('Noch keine Fotos. Halte Fortschritt, Pump oder dein Gym fest.', 'No photos yet. Capture progress, the pump or your gym.')}</p>`}
    ${photoAddBtn(w.photos)}
    <p class="cap" style="margin:0">${loggedIn() ? (w.posted ? L('Das Training ist geteilt: Freunde sehen die Fotos im Feed.', 'This workout is shared: friends see the photos in the feed.') : L('Fotos werden in deinem Konto gesichert. Sichtbar für andere nur, wenn du das Training teilst.', 'Photos are backed up to your account. Others only see them if you share the workout.')) : L('Fotos bleiben auf diesem Gerät. Mit einem Konto werden sie gesichert.', 'Photos stay on this device. With an account they’re backed up.')}</p>
    <button class="btn btn-p btn-block" data-close-sheet>${L('Fertig', 'Done')}</button>`; };
  const sync = async () => { save(); render(); if (w.posted && CB) { try { await uploadPending(); await CB.updatePost(w.id, await postPhotos(w.photos)); feed = null; } catch (e) {} } };
  openSheet('', sh => { draw(sh);
    sh.addEventListener('change', async ev => { if (!ev.target.matches('[data-addph]')) return; const n = await addPhotoFiles(ev.target.files, w.photos); if (n) { draw(sh); sync(); } });
    sh.addEventListener('click', async ev => { const b = ev.target.closest('[data-rmph]'); if (!b) return; ev.stopPropagation(); const [p] = w.photos.splice(+b.dataset.rmph, 1); draw(sh); deletePhotos([p]); sync(); });
  });
}
