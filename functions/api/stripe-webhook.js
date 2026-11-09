// POST /api/stripe-webhook <- Stripe events. Verifies the signature, then writes the Pro status into
// public.entitlements (pro_until = end of the paid period + 2 days grace). The app only reads that table.
// In Stripe: Developers → Webhooks → endpoint https://<your app>/api/stripe-webhook with the events
// checkout.session.completed, customer.subscription.created, customer.subscription.updated,
// customer.subscription.deleted, invoice.paid. Its signing secret goes into STRIPE_WEBHOOK_SECRET.
const GRACE = 2 * 86400;
const base = env => (env.SUPABASE_URL || '').replace(/\/+$/, '');
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');

export async function verifyStripe(payload, header, secret, now = Math.floor(Date.now() / 1000)) {
  if (!header || !secret) return false;
  const parts = header.split(',').map(x => x.split('=')), t = Number((parts.find(p => p[0] === 't') || [])[1]);
  const sigs = parts.filter(p => p[0] === 'v1').map(p => p[1]);
  if (!t || !sigs.length || Math.abs(now - t) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const expected = hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`)));
  return sigs.some(s => s.length === expected.length && [...s].reduce((d, c, i) => d | (c.charCodeAt(0) ^ expected.charCodeAt(i)), 0) === 0);
}
async function stripeGet(env, path) {
  const r = await fetch(`https://api.stripe.com${path}`, { headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
  if (!r.ok) throw new Error('stripe ' + r.status);
  return r.json();
}
export function periodEnd(sub) {
  // Newer Stripe API versions keep the period on the subscription items.
  return sub.current_period_end || Math.max(0, ...(((sub.items || {}).data) || []).map(i => i.current_period_end || 0));
}

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  if (!await verifyStripe(raw, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET)) return new Response('invalid signature', { status: 400 });
  const ev = JSON.parse(raw), o = (ev.data || {}).object || {}, type = ev.type || '';

  let sub = null, userId = null;
  try {
    if (type === 'checkout.session.completed' && o.mode === 'subscription' && o.subscription) { sub = await stripeGet(env, `/v1/subscriptions/${o.subscription}`); userId = o.client_reference_id; }
    else if (type.startsWith('customer.subscription.')) sub = o;
    else if (type === 'invoice.paid') { const sid = o.subscription || (((o.parent || {}).subscription_details) || {}).subscription; if (sid) sub = await stripeGet(env, `/v1/subscriptions/${sid}`); }
  } catch { return new Response('stripe lookup failed', { status: 500 }); }
  if (!sub) return Response.json({ ok: true, ignored: type });

  userId = (sub.metadata && sub.metadata.user_id) || userId;
  if (!userId) return Response.json({ ok: true, ignored: 'no user' });
  const active = ['active', 'trialing', 'past_due'].includes(sub.status), end = periodEnd(sub);
  const row = {
    user_id: userId,
    pro_until: new Date(((active && end) ? end + GRACE : Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    status: sub.status,
    stripe_customer: typeof sub.customer === 'string' ? sub.customer : (sub.customer || {}).id || null,
    stripe_subscription: sub.id,
    updated_at: new Date().toISOString(),
  };
  const r = await fetch(`${base(env)}/rest/v1/entitlements?on_conflict=user_id`, { method: 'POST', headers: { apikey: env.SUPABASE_SECRET_KEY, 'content-type': 'application/json', prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(row) });
  if (!r.ok) return new Response('db write failed', { status: 500 });
  return Response.json({ ok: true, user: userId, status: sub.status, pro_until: row.pro_until });
}
