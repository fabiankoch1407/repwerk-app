// In-app exercise demos: a side-view figure moving between two poses. Runs locally, loads nothing.
// Joints: H head, N neck/shoulder, E elbow, W hand, P hip, K knee, A ankle, T toe; K2/A2/T2 = second leg.
const STAND = { H:[102,38], N:[100,56], E:[102,82], W:[104,108], P:[100,110], K:[101,148], A:[100,184], T:[118,186] };
const POSES = {
  squat: [ { ...STAND, E:[82,70], W:[98,54] }, { H:[122,80], N:[112,96], E:[92,108], W:[108,94], P:[74,146], K:[126,150], A:[100,184], T:[118,186] } ],
  hinge: [ STAND, { H:[148,76], N:[132,84], E:[134,112], W:[132,140], P:[84,112], K:[96,148], A:[100,184], T:[118,186] } ],
  lunge: [ { ...STAND, K2:[99,148], A2:[98,184], T2:[116,186] }, { H:[104,72], N:[102,90], E:[104,116], W:[106,142], P:[100,142], K:[132,150], A:[130,184], T:[148,186], K2:[86,180], A2:[54,172], T2:[66,186] } ],
  bench: [ { H:[158,128], N:[140,130], E:[140,102], W:[140,74], P:[74,132], K:[50,148], A:[42,182], T:[26,186] }, { H:[158,128], N:[140,130], E:[124,148], W:[140,116], P:[74,132], K:[50,148], A:[42,182], T:[26,186] } ],
  pushup: [ { H:[168,132], N:[150,140], E:[150,162], W:[150,184], P:[94,160], K:[62,170], A:[30,178], T:[35,187] }, { H:[168,162], N:[150,168], E:[128,170], W:[150,184], P:[94,174], K:[62,178], A:[30,180], T:[36,187] } ],
  dip: [ { H:[102,40], N:[100,58], E:[100,80], W:[100,100], P:[100,112], K:[104,140], A:[84,154], T:[80,164] }, { H:[106,72], N:[104,90], E:[80,94], W:[100,100], P:[98,142], K:[102,168], A:[82,180], T:[78,186] } ],
  benchdip: [ { H:[98,62], N:[96,80], E:[86,98], W:[76,114], P:[94,118], K:[134,122], A:[168,176], T:[180,182] }, { H:[100,90], N:[98,108], E:[70,104], W:[76,114], P:[96,146], K:[134,138], A:[168,176], T:[180,182] } ],
  press: [ { ...STAND, E:[80,62], W:[96,48] }, { ...STAND, E:[102,30], W:[104,8] } ],
  raise: [ STAND, { ...STAND, E:[124,64], W:[150,62] } ],
  pulldown: [ { H:[102,50], N:[100,66], E:[100,44], W:[100,22], P:[100,114], K:[100,150], A:[100,184], T:[116,186] }, { H:[102,22], N:[100,40], E:[82,46], W:[100,22], P:[100,90], K:[100,128], A:[100,164], T:[116,166] } ],
  row: [ { H:[148,76], N:[132,84], E:[134,112], W:[132,140], P:[84,112], K:[96,148], A:[100,184], T:[118,186] }, { H:[148,76], N:[132,84], E:[110,96], W:[122,112], P:[84,112], K:[96,148], A:[100,184], T:[118,186] } ],
  curl: [ STAND, { ...STAND, E:[102,82], W:[120,60] } ],
  pushdown: [ { ...STAND, E:[102,82], W:[122,74] }, { ...STAND, E:[102,82], W:[108,110] } ],
  plank: [ { H:[166,152], N:[150,160], E:[150,182], W:[172,184], P:[95,162], K:[62,172], A:[30,178], T:[35,187] }, { H:[166,150], N:[150,158], E:[150,182], W:[172,184], P:[95,157], K:[62,170], A:[30,178], T:[35,187] } ],
  crunch: [ { H:[24,172], N:[42,176], E:[40,160], W:[28,164], P:[86,178], K:[112,150], A:[138,182], T:[152,186] }, { H:[48,140], N:[58,156], E:[56,138], W:[46,146], P:[86,178], K:[112,150], A:[138,182], T:[152,186] } ],
  legraise: [ { H:[102,50], N:[100,66], E:[100,44], W:[100,22], P:[100,114], K:[100,150], A:[100,184], T:[116,186] }, { H:[102,50], N:[100,66], E:[100,44], W:[100,22], P:[98,114], K:[132,108], A:[140,144], T:[152,140] } ],
  bridge: [ { H:[24,170], N:[42,176], E:[60,182], W:[76,182], P:[88,180], K:[118,150], A:[134,184], T:[150,186] }, { H:[24,170], N:[42,176], E:[60,182], W:[76,182], P:[90,150], K:[122,140], A:[134,184], T:[150,186] } ],
  calf: [ STAND, { H:[104,28], N:[102,46], E:[104,72], W:[106,98], P:[102,100], K:[103,138], A:[104,172], T:[118,186] } ],
  legext: [ { H:[82,54], N:[80,72], E:[92,100], W:[100,124], P:[80,130], K:[116,130], A:[120,172], T:[134,176] }, { H:[82,54], N:[80,72], E:[92,100], W:[100,124], P:[80,130], K:[116,130], A:[156,126], T:[166,116] } ],
  seatpress: [ { H:[82,54], N:[80,72], E:[66,96], W:[94,92], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[82,54], N:[80,72], E:[106,80], W:[134,80], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  fly: [ { H:[82,54], N:[80,72], E:[62,82], W:[50,72], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[82,54], N:[80,72], E:[104,84], W:[126,80], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  seatpressup: [ { H:[82,54], N:[80,72], E:[64,74], W:[84,58], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[82,54], N:[80,72], E:[84,40], W:[86,14], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  seatrow: [ { H:[84,54], N:[82,72], E:[110,92], W:[134,94], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[80,54], N:[78,72], E:[60,98], W:[90,96], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  seatcurl: [ { H:[82,54], N:[80,72], E:[102,96], W:[128,104], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[82,54], N:[80,72], E:[102,96], W:[110,70], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  seatcrunch: [ { H:[82,54], N:[80,72], E:[96,86], W:[104,76], P:[80,130], K:[116,130], A:[118,176], T:[132,180] }, { H:[110,84], N:[100,96], E:[112,108], W:[120,98], P:[80,130], K:[116,130], A:[118,176], T:[132,180] } ],
  legcurl: [ { H:[178,146], N:[160,152], E:[172,166], W:[186,164], P:[100,154], K:[60,154], A:[24,152], T:[12,158] }, { H:[178,146], N:[160,152], E:[172,166], W:[186,164], P:[100,154], K:[60,154], A:[64,116], T:[52,110] } ]
};
POSES.rfly = [POSES.fly[1], POSES.fly[0]];
// ---- Machine and extra poses (v4). ik() places a knee/elbow so both segments keep their length. ----
function ik(a, b, l1, l2, side) {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01) || 1;
  const x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - x * x)), ux = dx / d, uy = dy / d;
  return [a[0] + ux * x - uy * h * side, a[1] + uy * x + ux * h * side];
}
const SEAT = { H:[82,54], N:[80,72], P:[80,130], K:[116,130], A:[118,176], T:[132,180] };
(function () {
  const P = [66, 152], dir = [0.7, -0.714], Aext = [P[0] + dir[0] * 70, P[1] + dir[1] * 70], Abent = [P[0] + dir[0] * 42, P[1] + dir[1] * 42];
  const toe = a => [a[0] - 9, a[1] - 9];
  const up = { H:[28,92], N:[36,108], P, W:[72,142] }; up.E = ik(up.N, up.W, 26, 26, -1);
  POSES.legpress = [ { ...up, A: Abent, K: ik(P, Abent, 38, 36, -1), T: toe(Abent) }, { ...up, A: Aext, K: ik(P, Aext, 38, 36, -1), T: toe(Aext) } ];
  // hack squat: sled runs along the back pad
  const r = [0.34, 0.94], A = [136, 180], T = [152, 183], P0 = [100, 112], N0 = [82, 62];
  const hk = (P, N) => { const W = [N[0] + 8, N[1] - 6]; return { H:[N[0] - 5, N[1] - 17], N, P, K: ik(P, A, 38, 36, -1), A, T, W, E: ik(N, W, 26, 26, 1) }; };
  POSES.hack = [ hk(P0, N0), hk([P0[0] + r[0] * 40, P0[1] + r[1] * 40], [N0[0] + r[0] * 40, N0[1] + r[1] * 40]) ];
  POSES.calfm = [ { ...STAND, A:[100,184], T:[116,178] }, { H:[102,26], N:[100,44], E:[102,70], W:[104,96], P:[100,98], K:[101,136], A:[102,170], T:[116,178] } ];
  POSES.facepull = [ { ...STAND, E:[124,60], W:[150,58] }, { ...STAND, E:[80,48], W:[104,40] } ];
  POSES.latpull = [ { ...SEAT, E:[84,48], W:[88,22] }, { ...SEAT, H:[80,54], N:[78,72], E:[72,96], W:[96,82] } ];
  const cr = { P:[70,150], K:[104,138], A:[136,156], T:[142,145] };
  POSES.cablerow = [ { ...cr, N:[82,98], H:[90,82], E:[104,108], W:[128,112] }, { ...cr, N:[66,96], H:[64,78], E:[60,120], W:[90,122] } ];
  const kn = { K:[96,180], A:[62,178], T:[52,186], K2:[92,180], A2:[58,178], T2:[48,186] };
  POSES.cablecrunch = [ { ...kn, P:[96,142], N:[100,88], H:[104,70], E:[122,96], W:[108,76] }, { ...kn, P:[92,142], N:[136,118], H:[150,130], E:[134,142], W:[148,124] } ];
  POSES.seatpress = [ { ...SEAT, E:[66,96], W:[94,92] }, { ...SEAT, E:[106,80], W:[134,80] } ];
  POSES.fly = [ { ...SEAT, E:[62,80], W:[62,54] }, { ...SEAT, E:[104,80], W:[106,54] } ];
  POSES.seatpressup = [ { ...SEAT, E:[74,96], W:[90,72] }, { ...SEAT, E:[86,44], W:[90,18] } ];
  const cp = { ...SEAT, H:[88,54], N:[84,72] };
  POSES.rfly = [ { ...cp, E:[110,78], W:[134,80] }, { ...cp, E:[70,80], W:[56,84] } ];
  POSES.machrow = [ { ...cp, E:[106,88], W:[130,92] }, { ...cp, E:[66,92], W:[92,96] } ];
  const pr = { ...SEAT, H:[88,56], N:[84,74], P:[78,130], E:[104,92] };
  POSES.preacher = [ { ...pr, W:[124,108] }, { ...pr, W:[100,66] } ];
  POSES.smith = [ { ...STAND, E:[82,70], W:[98,54] }, { H:[112,86], N:[102,100], E:[80,108], W:[98,96], P:[70,146], K:[126,148], A:[108,184], T:[126,186] } ];
  POSES.seatcrunch = [ { ...SEAT, E:[96,86], W:[104,76] }, { ...SEAT, H:[110,84], N:[100,96], E:[112,108], W:[120,98] } ];
  // extra exercises
  POSES.frontraise = [ STAND, { ...STAND, E:[124,52], W:[150,46] } ];
  POSES.shrug = [ STAND, { ...STAND, H:[102,34], N:[100,48], E:[102,76], W:[104,102] } ];
  POSES.ohext = [ { ...STAND, E:[104,30], W:[82,40] }, { ...STAND, E:[104,30], W:[106,4] } ];
  POSES.skull = [ { ...POSES.bench[0], E:[136,92], W:[154,116] }, { ...POSES.bench[0], E:[136,92], W:[138,66] } ];
  POSES.bulgarian = [ { ...STAND, K2:[96,148], A2:[70,128], T2:[58,124] }, { H:[106,74], N:[104,92], E:[106,118], W:[108,144], P:[100,144], K:[134,152], A:[128,184], T:[146,186], K2:[88,176], A2:[70,128], T2:[58,124] } ];
  POSES.seatlegcurl = [ { ...SEAT, E:[90,98], W:[100,122], K:[116,130], A:[150,150], T:[164,146] }, { ...SEAT, E:[90,98], W:[100,122], K:[116,130], A:[102,164], T:[112,174] } ];
  POSES.hyperext = [ { H:[160,170], N:[148,158], E:[156,170], W:[166,166], P:[110,124], K:[80,140], A:[52,156], T:[46,168] }, { H:[178,104], N:[160,110], E:[162,96], W:[168,88], P:[110,124], K:[80,140], A:[52,156], T:[46,168] } ];
  POSES.kbswing = [ { H:[148,76], N:[132,84], E:[118,108], W:[100,128], P:[84,112], K:[96,148], A:[100,184], T:[118,186] }, { ...STAND, E:[124,66], W:[150,58] } ];
  POSES.cablefly = [ { ...STAND, E:[80,64], W:[70,46] }, { ...STAND, E:[118,70], W:[134,74] } ];
})();
// props behind (back) and in front (front) of the figure
const mPad = (a, b, w, cls) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke-width="${w}" stroke-linecap="round" class="${cls || 'padl'}"/>`;
const mGrip = w => `<circle cx="${w[0].toFixed(1)}" cy="${w[1].toFixed(1)}" r="5" class="gripc"/>`;
const mPulley = (x, y) => `<rect x="${x - 3}" y="${y - 6}" width="12" height="${187 - y + 6}" rx="3" class="frame"/><circle cx="${x}" cy="${y}" r="5" class="hub"/>`;
const mCable = (w, a) => `<line x1="${w[0].toFixed(1)}" y1="${w[1].toFixed(1)}" x2="${a[0]}" y2="${a[1]}" class="cab"/>`;
const mStack = (x, y) => `<rect x="${x}" y="${y}" width="16" height="${183 - y}" rx="3" class="frame"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${x + 2}" y="${y + 6 + i * 7}" width="12" height="5" rx="1" class="plate2f"/>`).join('')}`;
const seatOnly = `<rect x="56" y="132" width="72" height="10" rx="5" class="pad"/><rect x="88" y="142" width="6" height="40" rx="2" class="frame"/>`;
const seatBack = seatOnly + `<rect x="58" y="56" width="10" height="80" rx="5" class="pad"/>`;
const MACH = {
  legpress: p => ({ back: `${mPad([20, 178], [178, 18], 6, 'framel')}${mPad([30, 182], [66, 182], 6, 'framel')}${mPad([46, 170], [18, 128], 12)}${mPad([50, 166], [82, 166], 11)}`, front: (() => { const c = [p.A[0] + 6, p.A[1] - 6 + 12]; return mPad([p.A[0] - 8, p.A[1] - 22], [p.A[0] + 16, p.A[1] + 2], 8, 'framel'); })() }),
  hack: p => { const bx = -0.94 * 14, by = 0.34 * 14; return { back: `${mPad([40, 6], [104, 184], 5, 'framel')}${mPad([p.P[0] + bx, p.P[1] + by + 8], [p.N[0] + bx - 4, p.N[1] + by - 18], 11)}`, front: `${mPad([p.N[0] - 6, p.N[1] - 4], [p.N[0] + 10, p.N[1] - 8], 9)}<rect x="120" y="180" width="54" height="7" rx="2" class="frame"/>` }; },
  legext: p => { const v = [p.A[0] - p.K[0], p.A[1] - p.K[1]], L = Math.hypot(...v), nx = v[1] / L, ny = -v[0] / L, s = nx > 0 ? 1 : -1, r = [p.A[0] + nx * 9 * s, p.A[1] + ny * 9 * s]; return { back: seatBack + mStack(26, 120), front: `${mPad(p.K, r, 4, 'framel')}<circle cx="${r[0].toFixed(1)}" cy="${r[1].toFixed(1)}" r="6.5" class="pad"/><circle cx="${p.K[0]}" cy="${p.K[1]}" r="4" class="hub"/>` }; },
  legcurlm: p => { const v = [p.A[0] - p.K[0], p.A[1] - p.K[1]], L = Math.hypot(...v), r = [p.A[0] - v[1] / L * 9, p.A[1] + v[0] / L * 9]; return { back: `<rect x="26" y="160" width="166" height="11" rx="5.5" class="pad"/><rect x="42" y="170" width="6" height="16" rx="2" class="frame"/><rect x="170" y="170" width="6" height="16" rx="2" class="frame"/>`, front: `${mPad([p.K[0], p.K[1] + 6], r, 4, 'framel')}<circle cx="${r[0].toFixed(1)}" cy="${r[1].toFixed(1)}" r="6.5" class="pad"/>` }; },
  seatlegcurl: p => { const v = [p.A[0] - p.K[0], p.A[1] - p.K[1]], L = Math.hypot(...v), r = [p.A[0] + v[1] / L * 9, p.A[1] - v[0] / L * 9]; return { back: seatBack, front: `${mPad([100, 118], [128, 118], 9)}${mPad(p.K, r, 4, 'framel')}<circle cx="${r[0].toFixed(1)}" cy="${r[1].toFixed(1)}" r="6.5" class="pad"/><circle cx="${p.K[0]}" cy="${p.K[1]}" r="4" class="hub"/>` }; },
  calfm: p => ({ back: `<rect x="40" y="10" width="10" height="177" rx="3" class="frame"/>${mPad([45, p.N[1] - 10], [98, p.N[1] - 10], 4, 'framel')}`, front: `<rect x="108" y="179" width="34" height="8" rx="2" class="frame"/>${mPad([90, p.N[1] - 8], [110, p.N[1] - 8], 9)}` }),
  lat: p => ({ back: `<rect x="56" y="132" width="72" height="10" rx="5" class="pad"/><rect x="88" y="142" width="6" height="40" rx="2" class="frame"/>${mPad([40, 186], [40, 4], 8, 'framel')}${mPad([40, 4], [96, 4], 6, 'framel')}<circle cx="96" cy="6" r="5" class="hub"/>${mCable(p.W, [96, 6])}`, front: `${mPad([104, 118], [124, 118], 9)}${mPad([p.W[0] - 3, p.W[1]], [p.W[0] + 7, p.W[1]], 5, 'framel')}` }),
  cablerow: p => ({ back: `<rect x="28" y="156" width="80" height="8" rx="4" class="pad"/><rect x="40" y="164" width="6" height="22" rx="2" class="frame"/><rect x="92" y="164" width="6" height="22" rx="2" class="frame"/>${mPulley(176, 150)}${mCable(p.W, [176, 150])}`, front: `<rect x="144" y="128" width="7" height="42" rx="2" class="frame"/>${mGrip(p.W)}` }),
  chestpress: p => ({ back: seatBack + `<rect x="152" y="26" width="10" height="161" rx="3" class="frame"/>`, front: `${mPad(p.W, [156, 34], 5, 'framel')}${mPad([p.W[0], p.W[1] - 8], [p.W[0], p.W[1] + 8], 6, 'framel')}<circle cx="156" cy="34" r="5" class="hub"/>` }),
  pecdeck: p => ({ back: seatBack + `<rect x="74" y="16" width="12" height="12" rx="3" class="frame"/>`, front: `${mPad([p.W[0], p.W[1] - 6], [80, 22], 4, 'framel')}${mPad([p.E[0], p.E[1] + 4], [p.W[0], p.W[1] - 6], 10)}` }),
  shoulderpress: p => ({ back: seatBack + `<circle cx="46" cy="142" r="5" class="hub"/>${mPad(p.W, [46, 142], 5, 'framel')}`, front: `${mPad([p.W[0] - 2, p.W[1] - 8], [p.W[0] + 2, p.W[1] + 8], 6, 'framel')}` }),
  rflym: p => ({ back: seatOnly + `<rect x="84" y="20" width="10" height="10" rx="3" class="frame"/>${mPad(p.W, [89, 26], 4, 'framel')}`, front: `${mPad([104, 74], [104, 116], 11)}<rect x="101" y="116" width="6" height="20" rx="2" class="frame"/>${mGrip(p.W)}` }),
  rowm: p => ({ back: seatOnly + `<rect x="146" y="150" width="10" height="37" rx="3" class="frame"/>${mPad(p.W, [151, 156], 5, 'framel')}`, front: `${mPad([104, 74], [104, 116], 11)}<rect x="101" y="116" width="6" height="20" rx="2" class="frame"/>${mGrip(p.W)}` }),
  preacher: p => ({ back: seatOnly + `<rect x="114" y="104" width="6" height="83" rx="2" class="frame"/>`, front: `${mPad([88, 92], [116, 108], 10)}<circle cx="${p.E[0]}" cy="${p.E[1]}" r="3.5" class="hub"/>${mGrip(p.W)}` }),
  preacherbar: p => ({ back: seatOnly + `<rect x="114" y="104" width="6" height="83" rx="2" class="frame"/>`, front: `${mPad([88, 92], [116, 108], 10)}` }),
  smith: p => ({ back: `<rect x="92" y="4" width="4" height="183" class="frame"/><rect x="102" y="4" width="4" height="183" class="frame"/>`, front: '' }),
  abm: p => ({ back: seatBack + `<circle cx="74" cy="36" r="5" class="hub"/>${mPad([p.W[0], p.W[1] - 4], [74, 36], 4, 'framel')}`, front: mPad([p.W[0] - 4, p.W[1] - 10], [p.W[0] + 4, p.W[1] + 8], 9) }),
  hyper: p => ({ back: `${mPad([96, 138], [124, 116], 12)}${mPad([42, 168], [62, 160], 9)}<rect x="56" y="140" width="8" height="47" rx="2" class="frame"/><rect x="104" y="128" width="8" height="59" rx="2" class="frame"/>`, front: '' }),
  benchl: p => ({ back: `<rect x="50" y="136" width="122" height="11" rx="5.5" class="pad"/><rect x="66" y="146" width="6" height="41" rx="2" class="frame"/><rect x="150" y="146" width="6" height="41" rx="2" class="frame"/>`, front: '' }),
  bulg: p => ({ back: `<rect x="34" y="124" width="44" height="10" rx="5" class="pad"/><rect x="52" y="134" width="6" height="53" rx="2" class="frame"/>`, front: '' })
};

const PATTERN = {
  kniebeuge:['squat','bar'], 'goblet-squat':['squat','db'], beinpresse:['legpress','none'], ausfallschritte:['lunge','db'], beinstrecker:['legext','none'], beinbeuger:['legcurl','none'],
  'rumaenisches-kreuzheben':['hinge','bar'], 'kh-rumaenisch':['hinge','db'], kreuzheben:['hinge','bar'], 'hip-thrust':['bridge','barhip'], 'glute-bridge':['bridge','none'], wadenheben:['calfm','none'],
  bankdruecken:['bench','bar'], 'schraegbank-kh':['bench','db'], liegestuetze:['pushup','none'], dips:['dip','bars'], 'bank-dips':['benchdip','box'], 'schulterdruecken-kh':['press','db'],
  seitheben:['raise','db'], 'face-pulls':['facepull','cable'], klimmzuege:['pulldown','pullbar'], latzug:['latpull','none'], 'rudern-lh':['row','bar'], 'kh-rudern':['row','db'], 'rudern-kabel':['cablerow','none'],
  'bizeps-curl-kh':['curl','db'], 'hammer-curl':['curl','db'], 'trizeps-kabel':['pushdown','cable'], plank:['plank','none'], crunch:['crunch','none'], 'haengendes-beinheben':['legraise','pullbar'], 'crunch-kabel':['cablecrunch','cable'], brustpresse:['seatpress','none'], butterfly:['fly','none'], 'schulterpresse-maschine':['seatpressup','none'], 'reverse-butterfly':['rfly','none'], rudermaschine:['machrow','none'], bizepsmaschine:['preacher','none'], 'smith-kniebeuge':['smith','bar'], hackenschmidt:['hack','none'], bauchmaschine:['seatcrunch','none']
};
Object.assign(PATTERN, { 'kh-bankdruecken':['bench','db'], 'schraegbank-lh':['bench','bar'], frontheben:['frontraise','db'], 'shrugs-kh':['shrug','db'], 'kabel-crossover':['cablefly','cable'], 'trizeps-ueberkopf':['ohext','db'], 'french-press':['skull','bar'], scottcurls:['preacher','bar'], 'kabel-curl':['curl','cable'], 'bulgarian-split':['bulgarian','db'], 'beinbeuger-sitzend':['seatlegcurl','none'], hyperextensions:['hyperext','none'], 'kettlebell-swing':['kbswing','kb'], 't-bar-rudern':['row','bar'], 'kabel-seitheben':['raise','cable'], frontkniebeuge:['squat','bar'] });
const MACHFOR = { beinpresse:'legpress', hackenschmidt:'hack', beinstrecker:'legext', beinbeuger:'legcurlm', 'beinbeuger-sitzend':'seatlegcurl', wadenheben:'calfm', latzug:'lat', 'rudern-kabel':'cablerow', brustpresse:'chestpress', butterfly:'pecdeck', 'schulterpresse-maschine':'shoulderpress', 'reverse-butterfly':'rflym', rudermaschine:'rowm', bizepsmaschine:'preacher', scottcurls:'preacherbar', 'smith-kniebeuge':'smith', bauchmaschine:'abm', hyperextensions:'hyper', 'french-press':'benchl', 'bulgarian-split':'bulg' };
const ANCHOR = { 'face-pulls':[188,50], 'trizeps-kabel':[150,10], 'crunch-kabel':[170,8], 'kabel-crossover':[60,10], 'kabel-curl':[150,176], 'kabel-seitheben':[84,176] };
const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
// Target muscle per exercise group: which body segments glow in the accent colour.
const GLOW = { Beine:['thigh'], 'Gesäß':['glute','thigh'], Brust:['chest'], 'Rücken':['back'], Schultern:['delt'], Bizeps:['upperarm'], Trizeps:['upperarm'], Bauch:['abs'] };
const GLOW_ID = { wadenheben:['shin'], 'face-pulls':['delt','back'], dips:['upperarm','chest'], 'bank-dips':['upperarm'], kreuzheben:['back','glute','thigh'], 'hip-thrust':['glute'], 'glute-bridge':['glute'], 'reverse-butterfly':['delt','back'], butterfly:['chest'], 'shrugs-kh':['delt','back'], 'kabel-seitheben':['delt'], frontheben:['delt'], hyperextensions:['back','glute'], 'kettlebell-swing':['glute','thigh'], 'bulgarian-split':['thigh','glute'], 'kabel-crossover':['chest'] };
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// Muscular figure: limbs are spindle shapes (thick muscle belly, slim joints), torso has a V-taper.
const SUPINE = new Set(['bench']);
function spindle(a, b, w1, wm, w2, at, cls, bias) {
  if (!a || !b) return '';
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  const m = [a[0] + dx * at, a[1] + dy * at], k = bias || 0;
  const r1 = wm / 2 * (1 + k), r2 = wm / 2 * (1 - k);
  const P = (pt, s, w) => `${(pt[0] + nx * s * w).toFixed(1)} ${(pt[1] + ny * s * w).toFixed(1)}`;
  return `<path class="${cls}" d="M${P(a, 1, w1 / 2)} Q${P(m, 1, r1 * 1.3)} ${P(b, 1, w2 / 2)} L${P(b, -1, w2 / 2)} Q${P(m, -1, r2 * 1.3)} ${P(a, -1, w1 / 2)}Z"/><circle class="${cls}" cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="${(w1 / 2).toFixed(1)}"/><circle class="${cls}" cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="${(w2 / 2).toFixed(1)}"/>`;
}
function figureSVG(p, kind, size, pat, exId) {
  const n = v => v.toFixed(1);
  const ex = typeof EX !== 'undefined' ? EX[exId] : null;
  const glow = new Set(GLOW_ID[exId] || (ex ? GLOW[ex.muscle] || [] : []));
  const k2 = p.K2 || [p.K[0] - 5, p.K[1] + 1], a2 = p.A2 || [p.A[0] - 6, p.A[1]], t2 = p.T2 || [p.T[0] - 6, p.T[1]];
  const E2 = [p.E[0] - 5, p.E[1] + 2], W2 = [p.W[0] - 5, p.W[1] + 2];
  // torso frame: d = hip->shoulder, f = front normal
  const dx = p.N[0] - p.P[0], dy = p.N[1] - p.P[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  let fx = -uy, fy = ux; if (SUPINE.has(pat)) { fx = -fx; fy = -fy; }
  const at = (t, s) => [p.P[0] + dx * t + fx * s, p.P[1] + dy * t + fy * s];
  const pt = q => `${n(q[0])} ${n(q[1])}`;
  // outline: front side from hip up to shoulder, back side down again
  const front = [at(0, 12), at(.3, 10), at(.55, 12.5), at(.78, 18), at(.96, 14)], back = [at(1.02, -9), at(.84, -18), at(.62, -16), at(.36, -11), at(.05, -14)];
  const torso = `<path class="body" d="M${pt(front[0])} C${pt(front[1])} ${pt(front[2])} ${pt(front[3])} Q${pt(front[4])} ${pt(at(1.06, 2))} Q${pt(back[0])} ${pt(back[1])} C${pt(back[2])} ${pt(back[3])} ${pt(back[4])} Q${pt(at(-.06, 0))} ${pt(front[0])}Z"/>`;
  const pec = `<path class="${glow.has('chest') ? 'glowf' : 'shade'}" d="M${pt(at(.92, 3))} Q${pt(at(.86, 17))} ${pt(at(.66, 12.5))} Q${pt(at(.64, 4))} ${pt(at(.72, 1))}Z"/>`;
  const abs = glow.has('abs') ? `<path class="glowf" d="M${pt(at(.62, 11))} C${pt(at(.45, 12))} ${pt(at(.2, 10))} ${pt(at(.08, 10))} L${pt(at(.08, 3))} L${pt(at(.62, 4))}Z"/>` : `<path class="line" d="M${pt(at(.58, 9))} L${pt(at(.14, 8.5))} M${pt(at(.46, 11))} L${pt(at(.46, 6))} M${pt(at(.32, 10))} L${pt(at(.32, 6))}"/>`;
  const lat = `<path class="${glow.has('back') ? 'glowf' : 'shade'}" d="M${pt(at(.94, -6))} Q${pt(at(.8, -16))} ${pt(at(.58, -14))} Q${pt(at(.42, -11))} ${pt(at(.34, -8))} Q${pt(at(.6, -6))} ${pt(at(.94, -6))}Z"/>`;
  const glute = `<circle cx="${n(at(.04, -7)[0])}" cy="${n(at(.04, -7)[1])}" r="10" class="${glow.has('glute') ? 'glowf' : 'bodyf'}"/>`;
  const delt = `<circle cx="${n(p.N[0] + fx * 2)}" cy="${n(p.N[1] + fy * 2)}" r="11" class="${glow.has('delt') ? 'glowf' : 'bodyf'}"/>`;
  const neck = spindle(mix(p.N, p.H, .55), p.N, 9, 11, 13, .7, 'bodyf');
  // limbs: upper arm (biceps belly), forearm (thick near elbow), thigh (quad), shin (calf high up)
  const arm = (N, E, W, back) => spindle(N, E, 12, 17, 8, .45, back ? (glow.has('upperarm') ? 'glowf back-glow' : 'backf') : (glow.has('upperarm') ? 'glowf' : 'bodyf')) + spindle(E, W, 8, 11, 6, .3, back ? 'backf' : 'bodyf') + `<circle cx="${n(W[0])}" cy="${n(W[1])}" r="${back ? 4.5 : 5}" class="${back ? 'backf' : 'bodyf'}"/>`;
  const leg = (P, K, A, T, back) => spindle(P, K, 19, 24, 11, .38, back ? (glow.has('thigh') ? 'glowf back-glow' : 'backf') : (glow.has('thigh') ? 'glowf' : 'bodyf')) + spindle(K, A, 11, 14, 7, .3, back ? (glow.has('shin') ? 'glowf back-glow' : 'backf') : (glow.has('shin') ? 'glowf' : 'bodyf')) + spindle(A, T, 8, 8, 6, .5, back ? 'backf' : 'bodyf');
  let props = '';
  const by = (pat === 'bench' && !MACHFOR[exId]) ? 140 : 0; const mach = MACHFOR[exId] ? MACH[MACHFOR[exId]](p) : null;
  if (by) { const x1 = 50, x2 = 172; props += `<rect x="${x1}" y="${by - 4}" width="${x2 - x1}" height="11" rx="5.5" class="pad"/><rect x="${x1 + 16}" y="${by + 6}" width="6" height="${181 - by}" rx="2" class="frame"/><rect x="${x2 - 22}" y="${by + 6}" width="6" height="${181 - by}" rx="2" class="frame"/>`; }
  if (kind === 'seat') props += `<rect x="56" y="132" width="72" height="10" rx="5" class="pad"/><rect x="58" y="56" width="10" height="80" rx="5" class="pad"/><rect x="88" y="142" width="6" height="40" rx="2" class="frame"/>`;
  if (kind === 'pullbar') props += `<rect x="56" y="16" width="100" height="7" rx="3.5" class="frame"/><rect x="56" y="16" width="5" height="40" rx="2" class="frame"/><rect x="151" y="16" width="5" height="40" rx="2" class="frame"/>`;
  if (kind === 'box') props += `<rect x="46" y="114" width="36" height="73" rx="4" class="pad"/>`;
  if (kind === 'bars') props += `<rect x="66" y="99" width="70" height="7" rx="3.5" class="frame"/><rect x="128" y="99" width="5" height="84" rx="2" class="frame"/>`;
  if (kind === 'cable') { const an = ANCHOR[exId] || [Math.round(p.H[0] + 42), 10]; props += mPulley(an[0], an[1]) + mCable(p.W, an); }
  if (mach) props += mach.back;
  let eq = '';
  if (kind === 'bar') eq = `<circle cx="${n(p.W[0])}" cy="${n(p.W[1])}" r="17" class="plate"/><circle cx="${n(p.W[0])}" cy="${n(p.W[1])}" r="11" class="plate2"/><circle cx="${n(p.W[0])}" cy="${n(p.W[1])}" r="3.5" class="hub"/>`;
  if (kind === 'barhip') eq = `<circle cx="${n(p.P[0])}" cy="${n(p.P[1] - 18)}" r="17" class="plate"/><circle cx="${n(p.P[0])}" cy="${n(p.P[1] - 18)}" r="11" class="plate2"/><circle cx="${n(p.P[0])}" cy="${n(p.P[1] - 18)}" r="3.5" class="hub"/>`;
  if (kind === 'kb') eq = `<circle cx="${n(p.W[0])}" cy="${n(p.W[1] + 9)}" r="9" class="plate"/><path d="M${n(p.W[0] - 5)} ${n(p.W[1] + 3)} Q${n(p.W[0])} ${n(p.W[1] - 7)} ${n(p.W[0] + 5)} ${n(p.W[1] + 3)}" fill="none" stroke-width="3" class="framel"/>`;
  if (kind === 'cable') eq = mGrip(p.W);
  if (mach) eq += mach.front;
  if (kind === 'db') eq += `<rect x="${n(p.W[0] - 13)}" y="${n(p.W[1] - 2.5)}" width="26" height="5" rx="2.5" class="hub"/><rect x="${n(p.W[0] - 15)}" y="${n(p.W[1] - 8)}" width="8" height="16" rx="3" class="plate"/><rect x="${n(p.W[0] + 7)}" y="${n(p.W[1] - 8)}" width="8" height="16" rx="3" class="plate"/>`;
  const shadowX = (p.A[0] + (p.A2 || p.A)[0]) / 2, groundY = 187;
  // head: skull plus jaw toward the front
  const hf = [p.H[0] + fx * 0 + (p.H[0] - p.N[0]) * 0, p.H[1]];
  const head = `<circle cx="${n(p.H[0])}" cy="${n(p.H[1])}" r="12" class="headf"/>`;
  void hf;
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" aria-hidden="true" class="fig">
    <circle cx="100" cy="104" r="92" class="spot"/>
    <ellipse cx="${n(by ? 110 : shadowX + 4)}" cy="${groundY + 2}" rx="${by ? 70 : 34}" ry="4" class="shadow"/>
    <line x1="10" y1="${groundY}" x2="190" y2="${groundY}" class="floor"/>
    ${props}
    ${arm(p.N, E2, W2, true)}${leg(p.P, k2, a2, t2, true)}
    ${glute}${leg(p.P, p.K, p.A, p.T, false)}
    ${neck}${torso}${lat}${pec}${abs}
    ${head}${delt}
    <g class="edge">${arm(p.N, p.E, p.W, false)}</g>${arm(p.N, p.E, p.W, false)}
    ${eq}</svg>`;
}
function lerpPose(a, b, t) { const o = {}; for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) { const aa = a[k] || b[k], bb = b[k] || a[k]; o[k] = [aa[0] + (bb[0] - aa[0]) * t, aa[1] + (bb[1] - aa[1]) * t]; } return o; }
function demoFrame(exId, t, size) { const [pat, kind] = PATTERN[exId] || ['curl', 'db']; const [a, b] = POSES[pat]; return figureSVG(lerpPose(a, b, ease(t)), kind, size, pat, exId); }
// One rep = hold, 1.4 s to the end position, short hold, 1.0 s back, hold.
function repPhase(ph) { if (ph < .1) return 0; if (ph < .55) return (ph - .1) / .45; if (ph < .65) return 1; if (ph < .95) return 1 - (ph - .65) / .3; return 0; }
let demoRAF = null;
function mountDemo(el, exId) {
  cancelAnimationFrame(demoRAF);
  let t0 = performance.now(), playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = el.querySelector('.stage'), btn = el.querySelector('[data-demo-toggle]'), cnt = el.querySelector('.repcount');
  const period = 3200;
  const draw = now => {
    if (!document.body.contains(el)) return;
    const elapsed = now - t0, ph = (elapsed % period) / period;
    stage.innerHTML = demoFrame(exId, playing ? repPhase(ph) : 1, 240);
    if (cnt) cnt.textContent = playing ? 'Wiederholung ' + (Math.floor(elapsed / period) % 8 + 1) : 'Endposition';
    if (playing) demoRAF = requestAnimationFrame(draw);
  };
  draw(performance.now());
  if (btn) { btn.textContent = playing ? 'Pause' : 'Abspielen'; btn.onclick = () => { playing = !playing; btn.textContent = playing ? 'Pause' : 'Abspielen'; if (playing) { t0 = performance.now(); demoRAF = requestAnimationFrame(draw); } else draw(performance.now()); }; }
}
const demoThumb = exId => demoFrame(exId, 1, 44);
