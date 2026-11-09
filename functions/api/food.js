// Open Food Facts proxy: adds the custom User-Agent Open Food Facts asks for and caches answers at Cloudflare's edge,
// so repeated scans of the same product don't hit their servers again.
//   GET /api/food?code=4012345678901  -> { found, product }
//   GET /api/food?q=skyr              -> { products: [...] }
const UA = 'RepwerkFitness/1.0 (+https://github.com/fabiankoch1407/repwerk-app)';
const FIELDS = 'code,product_name,product_name_de,product_name_en,generic_name_de,brands,quantity,serving_quantity,serving_size,nutriments,image_front_small_url,image_front_url';

export async function onRequestGet({ request, waitUntil }) {
  const u = new URL(request.url);
  const code = (u.searchParams.get('code') || '').replace(/\D/g, '');
  const q = (u.searchParams.get('q') || '').trim().slice(0, 80);
  if (!(code.length >= 8 && code.length <= 14) && q.length < 2) return Response.json({ error: 'bad_request' }, { status: 400 });

  const key = new Request(`${u.origin}/api/food?${code ? 'code=' + code : 'q=' + encodeURIComponent(q.toLowerCase())}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return hit;

  const target = code
    ? `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=${FIELDS}`
    : `https://search.openfoodfacts.org/search?q=${encodeURIComponent(q)}&langs=de,en&page_size=20&fields=${FIELDS}`;
  let r;
  try { r = await fetch(target, { headers: { 'User-Agent': UA, Accept: 'application/json' } }); }
  catch (e) { return Response.json({ error: 'upstream' }, { status: 502 }); }
  if (!r.ok && !(code && r.status === 404)) return Response.json({ error: 'upstream', status: r.status }, { status: 502 });
  const j = await r.json().catch(() => null);

  const out = code
    ? (j && j.status === 1 && j.product ? { found: true, product: j.product } : { found: false })
    : { products: (j && (j.hits || j.products)) || [] };
  const ttl = code ? (out.found ? 7 * 86400 : 3600) : 86400;
  const res = Response.json(out, { headers: { 'Cache-Control': `public, max-age=${ttl}` } });
  waitUntil(cache.put(key, res.clone()));
  return res;
}
