// POST /api/portal -> { url } of the Stripe customer portal (change plan, payment method, cancel, invoices).
const fail = (status, code) => Response.json({ code }, { status });
const base = env => (env.SUPABASE_URL || '').replace(/\/+$/, '');

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY || !env.SUPABASE_SECRET_KEY || !base(env)) return fail(503, 'pay_off');
  const auth = request.headers.get('authorization') || '';
  if (!/^Bearer \S+$/.test(auth)) return fail(401, 'login');
  const ur = await fetch(`${base(env)}/auth/v1/user`, { headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY, authorization: auth } });
  const user = ur.ok ? await ur.json() : null;
  if (!user || !user.id) return fail(401, 'login');
  const er = await fetch(`${base(env)}/rest/v1/entitlements?select=stripe_customer&user_id=eq.${user.id}`, { headers: { apikey: env.SUPABASE_SECRET_KEY } });
  const ent = er.ok ? (await er.json())[0] : null;
  if (!ent || !ent.stripe_customer) return fail(404, 'no_customer');
  const r = await fetch('https://api.stripe.com/v1/billing_portal/sessions', { method: 'POST', headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ customer: ent.stripe_customer, return_url: new URL(request.url).origin + '/?pro=portal' }) });
  const s = await r.json().catch(() => ({}));
  if (!r.ok || !s.url) return fail(502, 'stripe');
  return Response.json({ url: s.url });
}
