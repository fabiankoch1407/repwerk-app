// POST /api/checkout { plan: 'month' | 'year' } -> { url } of a Stripe Checkout page for Repwerk Pro.
// Needs a signed-in user (Authorization: Bearer <Supabase access token>).
// Env: STRIPE_SECRET_KEY, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_YEARLY, optional STRIPE_TRIAL_DAYS,
//      SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY.
const fail = (status, code) => Response.json({ code }, { status });
const base = env => (env.SUPABASE_URL || '').replace(/\/+$/, '');

async function currentUser(env, request) {
  const auth = request.headers.get('authorization') || '';
  if (!/^Bearer \S+$/.test(auth)) return null;
  const r = await fetch(`${base(env)}/auth/v1/user`, { headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY, authorization: auth } });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? { id: u.id, email: u.email } : null;
}
async function entitlement(env, userId) {
  // The secret key goes only in the apikey header (Supabase rejects it as a Bearer token).
  const r = await fetch(`${base(env)}/rest/v1/entitlements?select=stripe_customer,pro_until,status&user_id=eq.${userId}`, { headers: { apikey: env.SUPABASE_SECRET_KEY } });
  if (!r.ok) throw new Error('db');
  return (await r.json())[0] || null;
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY || !env.SUPABASE_SECRET_KEY || !base(env)) return fail(503, 'pay_off');
  const user = await currentUser(env, request);
  if (!user) return fail(401, 'login');
  const { plan, terms, earlyStart } = await request.json().catch(() => ({}));
  // The app's order summary collects acceptance of the terms and the express request to start before the
  // withdrawal period ends (basis for pro-rata compensation on withdrawal, § 357a Abs. 2 BGB). Both are recorded on the subscription.
  if (!terms || !earlyStart) return fail(400, 'consent_required');
  const price = plan === 'month' ? env.STRIPE_PRICE_MONTHLY : env.STRIPE_PRICE_YEARLY;
  if (!price) return fail(503, 'pay_off');

  let ent;
  try { ent = await entitlement(env, user.id); } catch { return fail(503, 'server'); }
  if (ent && ent.pro_until && new Date(ent.pro_until) > new Date() && ent.status !== 'canceled') return fail(409, 'already_pro');

  const origin = new URL(request.url).origin;
  const p = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': price,
    'line_items[0][quantity]': '1',
    success_url: `${origin}/?pro=ok`,
    cancel_url: `${origin}/?pro=cancel`,
    client_reference_id: user.id,
    'metadata[user_id]': user.id,
    'subscription_data[metadata][user_id]': user.id,
    'subscription_data[metadata][terms_accepted_at]': new Date().toISOString(),
    'subscription_data[metadata][early_start_requested_at]': String(earlyStart).slice(0, 40),
    'custom_text[submit][message]': 'Mit dem Klick schließt du ein kostenpflichtiges Abo von Repwerk Pro ab. Es verlängert sich automatisch, bis du kündigst (siehe AGB).',
    allow_promotion_codes: 'true',
    locale: 'auto',
  });
  if (ent && ent.stripe_customer) p.set('customer', ent.stripe_customer); else if (user.email) p.set('customer_email', user.email);
  const trial = Number(env.STRIPE_TRIAL_DAYS) || 0;
  if (trial > 0 && !(ent && ent.stripe_customer)) p.set('subscription_data[trial_period_days]', String(trial));

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' }, body: p });
  const s = await r.json().catch(() => ({}));
  if (!r.ok || !s.url) return fail(502, 'stripe');
  return Response.json({ url: s.url });
}
