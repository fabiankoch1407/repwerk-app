/* ---------- Barcode scanner + Open Food Facts ----------
   Engines, best first: native BarcodeDetector (Android Chrome) → ZXing WASM ponyfill from jsDelivr (iOS, desktop) →
   our own EAN-13 / EAN-8 / UPC-A decoder below, which needs no download and also works offline.
   Product data: /api/food (Cloudflare function with User-Agent and cache), falling back to Open Food Facts directly.
   Strings are bilingual inline via L(de, en). */

/* ---------- Own EAN decoder ---------- */
const EAN_L = ['3211', '2221', '2122', '1411', '1132', '1231', '1114', '1312', '1213', '3112'].map(s => s.split('').map(Number));
const EAN_G = EAN_L.map(p => p.slice().reverse());
const EAN_PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLG', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
function eanCheckOk(ds) { let s = 0; for (let k = ds.length - 2, w = 3; k >= 0; k--, w = 4 - w) s += ds[k] * w; return (10 - s % 10) % 10 === ds[ds.length - 1]; }
function eanDigit(w, useG) {
  const u = (w[0] + w[1] + w[2] + w[3]) / 7; let best = null;
  const sets = useG ? [['L', EAN_L], ['G', EAN_G]] : [['L', EAN_L]];
  for (const [name, pats] of sets) for (let d = 0; d < 10; d++) { const p = pats[d]; let e = 0; for (let i = 0; i < 4; i++) e += Math.abs(w[i] / u - p[i]); if (!best || e < best.e) best = { d, set: name, e }; }
  return best;
}
/* runs: widths alternating dark/light, dark0 tells whether runs[0] is dark */
function eanFromRuns(runs, dark0) {
  const isDark = i => (i % 2 === 0) === dark0, W = i => runs[i];
  const guardOk = (i, n) => { let t = 0; for (let k = 0; k < n; k++) t += W(i + k); const m = t / n; for (let k = 0; k < n; k++) if (W(i + k) < m * 0.4 || W(i + k) > m * 1.9) return 0; return m; };
  for (let i = 1; i < runs.length - 42; i++) {
    if (!isDark(i)) continue;
    const m = guardOk(i, 3); if (!m || W(i - 1) < m * 2.5) continue;
    for (const len of [13, 8]) {
      const half = len === 13 ? 6 : 4, need = 3 + half * 4 + 5 + half * 4 + 3; if (i + need > runs.length) continue;
      const mid = i + 3 + half * 4, right = mid + 5, end = right + half * 4;
      const mm = guardOk(mid, 5); if (!mm || mm < m * 0.5 || mm > m * 2) continue;
      if (!guardOk(end, 3)) continue;
      if (end + 3 < runs.length && W(end + 3) < m * 2.5) continue;
      const ds = [], par = []; let bad = false, err = 0;
      for (let k = 0; k < half && !bad; k++) { const j = i + 3 + k * 4, w = [W(j), W(j + 1), W(j + 2), W(j + 3)], tot = w[0] + w[1] + w[2] + w[3]; if (tot < m * 4.5 || tot > m * 10) { bad = true; break; } const r = eanDigit(w, len === 13); if (r.e > 1.7) bad = true; ds.push(r.d); par.push(r.set); err += r.e; }
      for (let k = 0; k < half && !bad; k++) { const j = right + k * 4, w = [W(j), W(j + 1), W(j + 2), W(j + 3)], tot = w[0] + w[1] + w[2] + w[3]; if (tot < m * 4.5 || tot > m * 10) { bad = true; break; } const r = eanDigit(w, false); if (r.e > 1.7) bad = true; ds.push(r.d); err += r.e; }
      if (bad) continue;
      let code;
      if (len === 13) { const first = EAN_PAR.indexOf(par.join('')); if (first < 0) continue; code = [first, ...ds]; } else code = ds;
      if (eanCheckOk(code)) return { code: code.join(''), err };
    }
  }
  return null;
}
function rowRuns(lum, from, to, step) {
  const vals = []; for (let x = from; x !== to; x += step) vals.push(lum[x]);
  const sorted = vals.slice().sort((a, b) => a - b), lo = sorted[Math.floor(sorted.length * 0.05)], hi = sorted[Math.floor(sorted.length * 0.95)];
  if (hi - lo < 35) return null;
  const t = (lo + hi) / 2, runs = []; let cur = vals[0] < t, n = 0; const dark0 = cur;
  for (const v of vals) { const d = v < t; if (d === cur) n++; else { runs.push(n); n = 1; cur = d; } }
  runs.push(n); return { runs, dark0 };
}
function decodeLine(lum) { // lum: Float32Array/array of luminance along a line
  for (const dir of [1, -1]) { const rr = dir === 1 ? rowRuns(lum, 0, lum.length, 1) : rowRuns(lum, lum.length - 1, -1, -1); if (!rr) return null; const r = eanFromRuns(rr.runs, rr.dark0); if (r) return r.code; }
  return null;
}
/* Scan rows (and optionally columns) of an ImageData; returns the code seen most often */
function decodeImageData(img, opts = {}) {
  const { width: w, height: h, data } = img, votes = {};
  const lumAt = (x, y) => { const k = (y * w + x) * 4; return data[k] * 0.299 + data[k + 1] * 0.587 + data[k + 2] * 0.114; };
  const rows = opts.rows || 15, y0 = opts.band ? Math.floor(h * (0.5 - opts.band / 2)) : 0, y1 = opts.band ? Math.ceil(h * (0.5 + opts.band / 2)) : h;
  const line = new Float32Array(Math.max(w, h));
  for (let r = 0; r < rows; r++) {
    const y = Math.min(h - 1, Math.floor(y0 + (y1 - y0) * (r + 0.5) / rows)); const l = line.subarray(0, w);
    for (let x = 0; x < w; x++) l[x] = lumAt(x, y);
    const c = decodeLine(l); if (c) votes[c] = (votes[c] || 0) + 1;
  }
  if (opts.cols) for (let r = 0; r < opts.cols; r++) {
    const x = Math.min(w - 1, Math.floor(w * (r + 0.5) / opts.cols)), l = line.subarray(0, h);
    for (let y = 0; y < h; y++) l[y] = lumAt(x, y);
    const c = decodeLine(l); if (c) votes[c] = (votes[c] || 0) + 1;
  }
  let best = null; for (const [c, n] of Object.entries(votes)) if (!best || n > best.n) best = { code: c, n };
  return best;
}

/* ---------- Engines ---------- */
let bcNative = null, bcZx = null, bcZxTried = false;
async function nativeDetector() {
  if (bcNative !== null) return bcNative || null;
  bcNative = false;
  try { if ('BarcodeDetector' in window) { const f = await BarcodeDetector.getSupportedFormats(); if (f.includes('ean_13')) bcNative = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] }); } } catch (e) {}
  return bcNative || null;
}
function loadZx() {
  if (bcZxTried) return; bcZxTried = true;
  Promise.race([import('https://fastly.jsdelivr.net/npm/barcode-detector@3/dist/es/ponyfill.min.js'), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))])
    .then(m => { bcZx = new m.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] }); }).catch(() => { bcZx = null; });
}
const normCode = c => { c = String(c || '').replace(/\D/g, ''); if (c.length === 12) c = '0' + c; return c; };
const validCode = c => (c.length === 8 || c.length === 13) && eanCheckOk(c.split('').map(Number)) || c.length === 12 || c.length === 14;
async function detectOn(src) { // src: canvas or ImageBitmap; returns code or null (native/zxing only)
  const det = bcNative || bcZx; if (!det) return null;
  try { const r = await det.detect(src); const hit = r.find(x => /^\d{8,14}$/.test(x.rawValue)); return hit ? normCode(hit.rawValue) : null; } catch (e) { return null; }
}

/* ---------- Open Food Facts ---------- */
const OFF_FIELDS = 'code,product_name,product_name_de,product_name_en,generic_name_de,brands,quantity,serving_quantity,serving_size,nutriments,image_front_small_url,image_front_url';
async function offFetch(kind, v) {
  const local = !IN_CLAUDE && location.protocol.startsWith('http');
  if (local) {
    try { const r = await fetch(`api/food?${kind}=${encodeURIComponent(v)}`); if (r.ok) return await r.json(); if (r.status !== 404 && r.status !== 405) throw { code: 'server' }; } catch (e) { if (e && e.code) throw e; }
  }
  // direct (prototype in Claude, local file, or no server function)
  try {
    if (kind === 'code') { const r = await fetch(`https://world.openfoodfacts.org/api/v2/product/${v}.json?fields=${OFF_FIELDS}`); const j = await r.json().catch(() => null); return j && j.status === 1 && j.product ? { found: true, product: j.product } : { found: false }; }
    const r = await fetch(`https://search.openfoodfacts.org/search?q=${encodeURIComponent(v)}&langs=de,en&page_size=20&fields=${OFF_FIELDS}`); const j = await r.json(); return { products: j.hits || j.products || [] };
  } catch (e) { throw { code: 'network' }; }
}
function offToFood(p) {
  const n = p.nutriments || {}, g = k => { const v = n[k + '_100g']; return v === undefined || v === '' || v === null || !isFinite(+v) ? undefined : +v; };
  let kcal = g('energy-kcal'); if (kcal === undefined && g('energy') !== undefined) kcal = g('energy') / 4.184;
  const name = (S.lang === 'en' ? p.product_name_en || p.product_name || p.product_name_de : p.product_name_de || p.product_name || p.product_name_en) || p.generic_name_de || '';
  const brand = String(p.brands || '').split(',')[0].trim();
  let portion = num(p.serving_quantity); if (!(portion >= 5 && portion <= 1000)) { const q = String(p.quantity || '').match(/^(\d+(?:[.,]\d+)?)\s*(g|ml)\b/i); portion = q && num(q[1]) <= 400 ? num(q[1]) : 100; }
  const liquid = /\b(ml|cl|l)\b/i.test(String(p.quantity || '') + ' ' + String(p.serving_size || ''));
  const f = { id: 'off-' + p.code, code: String(p.code || ''), name: name.slice(0, 80), brand: brand.slice(0, 40), img: p.image_front_small_url || p.image_front_url || '', kcal: kcal === undefined ? undefined : r1(kcal), p: r1(g('proteins') || 0), c: r1(g('carbohydrates') || 0), f: r1(g('fat') || 0), portion: Math.round(portion), unit: liquid ? 'ml' : 'g', src: 'off' };
  const x = (k, src, mul = 1) => { const v = g(src); if (v !== undefined) f[k] = Math.round(v * mul * 100) / 100; };
  x('fib', 'fiber'); x('sug', 'sugars'); x('sat', 'saturated-fat'); x('mufa', 'monounsaturated-fat'); x('pufa', 'polyunsaturated-fat'); x('trans', 'trans-fat');
  if (g('salt') !== undefined) x('salt', 'salt'); else x('salt', 'sodium', 2.5);
  x('chol', 'cholesterol', 1000); x('kal', 'potassium', 1000); x('ca', 'calcium', 1000); x('fe', 'iron', 1000); x('va', 'vitamin-a', 1e6); x('vc', 'vitamin-c', 1000);
  f.complete = !!f.name && f.kcal !== undefined;
  return f;
}
function rememberFood(f) {
  S.myFoods = S.myFoods || {}; f.used = Date.now(); S.myFoods[f.id] = f;
  const ids = Object.keys(S.myFoods); if (ids.length > 300) ids.sort((a, b) => S.myFoods[a].used - S.myFoods[b].used).slice(0, ids.length - 300).forEach(k => delete S.myFoods[k]);
  save();
}
const myFoodList = () => Object.values(S.myFoods || {}).sort((a, b) => (b.used || 0) - (a.used || 0));
const foodLabel = f => f.brand ? `${f.name} · ${f.brand}` : f.name;
function foodItem(f, grams) {
  const g = grams || f.portion || 100, k = g / 100;
  const it = { id: uid(), name: f.brand && !f.name.toLowerCase().includes(f.brand.toLowerCase()) ? `${f.name} (${f.brand})` : f.name, grams: g, kcal: (f.kcal || 0) * k, p: f.p * k, c: f.c * k, f: f.f * k, src: f.src === 'off' ? 'barcode' : f.src === 'own' ? 'own' : 'db' };
  for (const x of XN) if (f[x] !== undefined) it[x] = f[x] * k;
  it.base = { g, kcal: it.kcal, p: it.p, c: it.c, f: it.f }; for (const x of XN) it.base[x] = it[x];
  return it;
}
function pickFood(f, onPick) { rememberFood(f); const it = foodItem(f); if (onPick) onPick(it); else resultSheet({ title: f.name, items: [it], url: f.img || '', slot: defaultSlot(), exact: true }); }

/* ---------- Scanner sheet ---------- */
function barcodeSheet(onPick) {
  let stream = null, stopped = false, last = null, busy = false, torchOn = false;
  const stop = () => { stopped = true; if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; };
  const html = `<div class="row" style="justify-content:space-between"><h2 class="disp">${L('Barcode scannen', 'Scan barcode')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    <div class="scanbox" id="bc-box"><video id="bc-v" playsinline muted autoplay></video><div class="scanguide"><i></i></div><button class="iconbtn torchb hidden" id="bc-torch" aria-label="${L('Taschenlampe', 'Torch')}">${ic('torch', 20)}</button></div>
    <div class="cap" id="bc-st" role="status">${L('Kamera wird gestartet …', 'Starting camera …')}</div>
    <div class="field"><span class="lbl">${L('Oder die Nummer unter dem Barcode eintippen', 'Or type the number under the barcode')}</span><div class="row" style="gap:8px"><input class="input grow" id="bc-num" inputmode="numeric" autocomplete="off" placeholder="4012345678901" maxlength="14" aria-label="${L('Barcode-Nummer', 'Barcode number')}"><button class="btn btn-s" data-bc="num">${L('Suchen', 'Search')}</button></div></div>
    <label class="btn btn-s btn-block">${ic('img', 20)} ${L('Foto vom Barcode verwenden', 'Use a photo of the barcode')}<input type="file" accept="image/*" capture="environment" class="hidden" id="bc-file"></label>
    <p class="cap" style="margin:0">${L('Produktdaten von Open Food Facts, einer freien Datenbank (ODbL). Fehlt ein Produkt, kannst du es selbst anlegen.', 'Product data from Open Food Facts, a free database (ODbL). If a product is missing, you can add it yourself.')}</p>`;
  const sh = openSheet(html, sh => {
    const v = sh.querySelector('#bc-v'), st = sh.querySelector('#bc-st'), canvas = document.createElement('canvas'), ctx = canvas.getContext('2d', { willReadFrequently: true });
    const say = t => { st.textContent = t; };
    const found = code => { if (stopped) return; stop(); try { navigator.vibrate && navigator.vibrate(60); } catch (e) {} lookupCode(code, onPick); };
    const tick = async () => {
      if (stopped || !sh.isConnected) { stop(); return; }
      if (!busy && v.readyState >= 2 && v.videoWidth) {
        busy = true;
        const vw = v.videoWidth, vh = v.videoHeight, cw = Math.round(vw * 0.86), ch = Math.round(Math.min(vh * 0.5, cw * 0.55)), sx = Math.round((vw - cw) / 2), sy = Math.round((vh - ch) / 2);
        const scale = Math.min(1, 1100 / cw); canvas.width = Math.round(cw * scale); canvas.height = Math.round(ch * scale);
        ctx.drawImage(v, sx, sy, cw, ch, 0, 0, canvas.width, canvas.height);
        let code = await detectOn(canvas);
        if (!code) { const r = decodeImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), { rows: 13, band: 0.8 }); if (r) { if (r.n >= 2 || r.code === last) code = r.code; else last = r.code; } }
        busy = false;
        if (code) { found(code); return; }
      }
      setTimeout(tick, 90);
    };
    (async () => {
      await nativeDetector(); if (!bcNative) loadZx();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { say(L('Die Kamera ist hier nicht verfügbar. Tipp die Nummer ein oder nutze ein Foto.', 'The camera isn’t available here. Type the number or use a photo.')); sh.querySelector('#bc-box').classList.add('off'); return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
        if (stopped || !sh.isConnected) { stop(); return; }
        v.srcObject = stream; await v.play().catch(() => {});
        say(L('Halte den Barcode waagerecht in den Rahmen, etwa 10 bis 15 cm entfernt.', 'Hold the barcode level inside the frame, about 10 to 15 cm away.'));
        const track = stream.getVideoTracks()[0], caps = track.getCapabilities ? track.getCapabilities() : {};
        if (caps.torch) { const tb = sh.querySelector('#bc-torch'); tb.classList.remove('hidden'); tb.addEventListener('click', async () => { torchOn = !torchOn; try { await track.applyConstraints({ advanced: [{ torch: torchOn }] }); tb.classList.toggle('on', torchOn); } catch (e) {} }); }
        if (caps.focusMode && caps.focusMode.includes('continuous')) track.applyConstraints({ advanced: [{ focusMode: 'continuous' }] }).catch(() => {});
        tick();
      } catch (e) {
        sh.querySelector('#bc-box').classList.add('off');
        say(e && e.name === 'NotAllowedError' ? L('Kein Zugriff auf die Kamera. Erlaube ihn in den Einstellungen oder tipp die Nummer ein.', 'No camera access. Allow it in your settings or type the number.') : L('Die Kamera konnte nicht gestartet werden. Tipp die Nummer ein oder nutze ein Foto.', 'The camera couldn’t start. Type the number or use a photo.'));
      }
    })();
    const fromNum = () => { const c = normCode(sh.querySelector('#bc-num').value); if (!validCode(c)) { say(L('Diese Nummer ist kein gültiger Barcode. Prüf die Ziffern.', 'That number isn’t a valid barcode. Check the digits.')); return; } found(c); };
    sh.addEventListener('click', ev => { if (ev.target.closest('[data-bc=num]')) fromNum(); if (ev.target.closest('[data-close-sheet]')) stop(); });
    sh.querySelector('#bc-num').addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); fromNum(); } });
    sh.querySelector('#bc-file').addEventListener('change', async ev => {
      const file = ev.target.files && ev.target.files[0]; if (!file) return;
      say(L('Foto wird gelesen …', 'Reading photo …'));
      try {
        const bmp = await createImageBitmap(file), sc = Math.min(1, 1600 / Math.max(bmp.width, bmp.height)), c2 = document.createElement('canvas'); c2.width = Math.round(bmp.width * sc); c2.height = Math.round(bmp.height * sc);
        const x2 = c2.getContext('2d', { willReadFrequently: true }); x2.drawImage(bmp, 0, 0, c2.width, c2.height);
        let code = await detectOn(c2); if (!code) { const r = decodeImageData(x2.getImageData(0, 0, c2.width, c2.height), { rows: 41, cols: 41 }); code = r && r.code; }
        if (code) found(code); else say(L('Auf dem Foto war kein Barcode lesbar. Fotografier ihn gerade und scharf oder tipp die Nummer ein.', 'No readable barcode in that photo. Take it straight and sharp, or type the number.'));
      } catch (e) { say(L('Das Foto konnte nicht gelesen werden.', 'Couldn’t read that photo.')); }
    });
  });
  const obs = new MutationObserver(() => { if (!sh.isConnected) { stop(); obs.disconnect(); } }); obs.observe(document.getElementById('overlay'), { childList: true });
}
async function lookupCode(code, onPick) {
  const known = (S.myFoods || {})['off-' + code];
  if (known && known.complete !== false) { pickFood(known, onPick); return; }
  openSheet(`<div class="row"><div class="spinner" aria-hidden="true"></div><div class="grow"><div style="font-weight:700">${L('Suche Produkt …', 'Looking up product …')}</div><div class="cap num">${code}</div></div></div>`);
  let res; try { res = await offFetch('code', code); } catch (e) {
    openSheet(`<h2 class="disp">${L('Keine Verbindung', 'No connection')}</h2><p class="muted" style="margin:0">${L('Das Produkt konnte nicht geladen werden. Prüf dein Internet und versuch es noch mal.', 'The product couldn’t be loaded. Check your internet and try again.')}</p><div class="grid2"><button class="btn btn-s" data-r="own">${L('Selbst anlegen', 'Add it myself')}</button><button class="btn btn-p" data-r="again">${L('Nochmal', 'Try again')}</button></div>`, sh => sh.addEventListener('click', ev => { const b = ev.target.closest('[data-r]'); if (!b) return; b.dataset.r === 'again' ? lookupCode(code, onPick) : ownFoodSheet({ code }, onPick); })); return; }
  if (res && res.found) { const f = offToFood(res.product); f.code = f.code || code; f.id = 'off-' + code; if (f.complete) { pickFood(f, onPick); return; } ownFoodSheet(f, onPick, L('Bei diesem Produkt fehlen Nährwerte. Übertrag sie von der Packung, dann ist es beim nächsten Scan sofort da.', 'This product is missing nutrition values. Copy them from the pack and it will be there instantly next time.')); return; }
  openSheet(`<h2 class="disp">${L('Produkt nicht gefunden', 'Product not found')}</h2><p class="muted" style="margin:0">${L(`Der Barcode ${code} ist noch nicht in Open Food Facts. Leg das Produkt mit den Werten von der Packung an. Beim nächsten Scan ist es dann sofort da.`, `Barcode ${code} isn’t in Open Food Facts yet. Add the product with the values from the pack. Next time you scan it, it’s there instantly.`)}</p>
    <button class="btn btn-p btn-block" data-r="own">${L('Produkt anlegen', 'Add product')}</button>${sampleFn ? `<button class="btn btn-s btn-block" data-r="ai">${ic('cam', 20)} ${L('Stattdessen mit KI scannen', 'Scan with AI instead')}</button>` : ''}<button class="btn btn-g" data-r="scan">${L('Anderen Barcode scannen', 'Scan another barcode')}</button>`,
  sh => sh.addEventListener('click', ev => { const b = ev.target.closest('[data-r]'); if (!b) return; const r = b.dataset.r; if (r === 'own') ownFoodSheet({ code }, onPick); else if (r === 'ai') { closeSheet(); photoFlow(); } else barcodeSheet(onPick); }));
}
/* Create or complete a food with values per 100 g from the pack */
function ownFoodSheet(pre, onPick, hint) {
  const f = Object.assign({ name: '', brand: '', kcal: '', p: '', c: '', f: '', portion: 100, unit: 'g' }, pre || {});
  const fld = (id, label, val, unit) => `<label class="field"><span class="lbl">${label}</span><span class="unit"><input class="input" id="of-${id}" inputmode="decimal" value="${val === undefined || val === '' ? '' : dec(val)}"><span>${unit}</span></span></label>`;
  openSheet(`<div class="row" style="justify-content:space-between"><h2 class="disp">${pre && pre.name ? L('Werte ergänzen', 'Complete values') : L('Eigenes Lebensmittel', 'Your own food')}</h2><button class="iconbtn" data-close-sheet aria-label="${L('Schließen', 'Close')}">${ic('x')}</button></div>
    ${hint ? `<div class="banner">${ic('info', 18)}<div>${hint}</div></div>` : ''}
    ${f.code ? `<div class="cap num">${L('Barcode', 'Barcode')} ${esc(f.code)}</div>` : ''}
    <label class="field"><span class="lbl">${L('Name', 'Name')}</span><input class="input" id="of-name" value="${esc(f.name)}" placeholder="${L('z. B. Protein-Pudding Schoko', 'e.g. chocolate protein pudding')}"></label>
    <label class="field"><span class="lbl">${L('Marke (optional)', 'Brand (optional)')}</span><input class="input" id="of-brand" value="${esc(f.brand)}"></label>
    <div class="lbl">${L('Nährwerte pro 100 g oder 100 ml (steht auf der Packung)', 'Nutrition per 100 g or 100 ml (printed on the pack)')}</div>
    <div class="grid2">${fld('kcal', L('Kalorien', 'Calories'), f.kcal, 'kcal')}${fld('p', L('Protein', 'Protein'), f.p, 'g')}${fld('c', L('Kohlenhydrate', 'Carbs'), f.c, 'g')}${fld('f', L('Fett', 'Fat'), f.f, 'g')}</div>
    ${fld('portion', L('Übliche Portion', 'Usual serving'), f.portion, f.unit)}
    <button class="btn btn-p btn-block" data-of="save">${L('Speichern und eintragen', 'Save and log')}</button>`,
  sh => sh.addEventListener('click', ev => {
    if (!ev.target.closest('[data-of=save]')) return;
    const val = id => sh.querySelector('#of-' + id).value, n = id => { const s = val(id).trim(); return s === '' ? NaN : num(s); };
    const name = val('name').trim(), kcal = n('kcal'), p = n('p'), c = n('c'), fat = n('f'), portion = Math.round(n('portion') || 100);
    if (name.length < 2) { toast(L('Bitte gib einen Namen ein', 'Please enter a name')); return; }
    if (!(kcal >= 0 && kcal <= 950)) { toast(L('Bitte die Kalorien pro 100 g eintragen', 'Please enter the calories per 100 g')); return; }
    if ([p, c, fat].some(x => isNaN(x) || x < 0 || x > 100)) { toast(L('Protein, Kohlenhydrate und Fett je 0 bis 100 g', 'Protein, carbs and fat must be 0 to 100 g each')); return; }
    const food = Object.assign({}, f, { id: f.code ? 'off-' + f.code : (f.id || 'own-' + uid()), name: name.slice(0, 80), brand: val('brand').trim().slice(0, 40), kcal: r1(kcal), p: r1(p), c: r1(c), f: r1(fat), portion: Math.max(1, Math.min(2000, portion)), src: f.code ? 'off' : 'own', own: true, complete: true });
    pickFood(food, onPick);
  }));
}
/* Online search in Open Food Facts, used by the food search sheet */
async function offSearch(q) { const r = await offFetch('q', q); return (r.products || []).map(offToFood).filter(f => f.complete && f.code); }
