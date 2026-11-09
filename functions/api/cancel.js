// POST /api/cancel <- the "Verträge hier kündigen" page (§ 312k BGB). Works without login.
// Identifies the subscription by the signed-in user (Authorization header, if present) or by the e-mail address,
// schedules the end in Stripe, stores the request in public.cancellations and, if configured, e-mails a confirmation.
// Ordinary notice: monthly plan and yearly plan in its first year end with the current period; a yearly plan
// after its first year ends one month after notice (the unused, prepaid part is to be refunded – refund_due).
// Env: STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SECRET_KEY, SUPABASE_PUBLISHABLE_KEY, optional RESEND_API_KEY + MAIL_FROM.
const base = env => (env.SUPABASE_URL || '').replace(/\/+$/, '');
const DAY = 86400;
const bad = (code, status = 400) => Response.json({ code }, { status });

async function stripe(env, path, form) {
  const r = await fetch('https://api.stripe.com' + path, { method: form ? 'POST' : 'GET', headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, ...(form ? { 'content-type': 'application/x-www-form-urlencoded' } : {}) }, body: form ? new URLSearchParams(form) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('stripe ' + r.status);
  return j;
}
const periodEnd = s => s.current_period_end || Math.max(0, ...(((s.items || {}).data) || []).map(i => i.current_period_end || 0));
const interval = s => ((((s.items || {}).data || [])[0] || {}).price || {}).recurring?.interval || (s.plan || {}).interval || 'month';
const addMonth = t => { const d = new Date(t * 1000); d.setUTCMonth(d.getUTCMonth() + 1); return Math.floor(d / 1000); };

export function endFor(sub, now, requested) {
  const pe = periodEnd(sub), start = sub.start_date || sub.created || now;
  let earliest, refund = false;
  if (interval(sub) === 'year' && now >= start + 365 * DAY) { earliest = Math.min(addMonth(now), pe || addMonth(now)); refund = earliest < pe; }
  else earliest = pe || addMonth(now);
  const at = requested && requested > earliest ? requested : earliest;
  return { at, refund: refund || (pe && at < pe) };
}

async function findSubs(env, request, email) {
  const out = []; let userId = null;
  const auth = request.headers.get('authorization') || '';
  if (/^Bearer \S+$/.test(auth) && base(env)) {
    const u = await fetch(`${base(env)}/auth/v1/user`, { headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY, authorization: auth } });
    if (u.ok) { const j = await u.json(); userId = j.id || null;
      const e = await fetch(`${base(env)}/rest/v1/entitlements?select=stripe_subscription&user_id=eq.${userId}`, { headers: { apikey: env.SUPABASE_SECRET_KEY } });
      const row = e.ok ? (await e.json())[0] : null;
      if (row && row.stripe_subscription) out.push(await stripe(env, `/v1/subscriptions/${row.stripe_subscription}`)); }
  }
  if (!out.length) {
    const c = await stripe(env, `/v1/customers/search?query=${encodeURIComponent(`email:'${email.replace(/'/g, '')}'`)}&limit=5`);
    for (const cu of c.data || []) { const s = await stripe(env, `/v1/subscriptions?customer=${cu.id}&status=all&limit=10`); out.push(...(s.data || [])); }
  }
  return { userId, subs: out.filter(s => ['active', 'trialing', 'past_due'].includes(s.status)) };
}

export async function onRequestPost({ request, env }) {
  const d = await request.json().catch(() => null);
  if (!d) return bad('bad_request');
  const name = String(d.name || '').trim().slice(0, 120), email = String(d.email || '').trim().toLowerCase().slice(0, 200);
  const kind = d.kind === 'ausserordentlich' ? 'ausserordentlich' : 'ordentlich', reason = String(d.reason || '').slice(0, 1000);
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('bad_request');
  const requested = d.when === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(d.date || '') ? Math.floor(Date.parse(d.date + 'T23:59:59Z') / 1000) : null;
  const now = Math.floor(Date.now() / 1000), receivedAt = new Date(now * 1000).toISOString();
  const reference = 'K-' + now.toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  if (!env.STRIPE_SECRET_KEY || !env.SUPABASE_SECRET_KEY || !base(env)) return Response.json({ code: 'not_configured', received_at: receivedAt }, { status: 503 });

  let status = 'not_found', endsAt = null, refundDue = false, subIds = [], userId = null;
  try {
    const f = await findSubs(env, request, email); userId = f.userId;
    for (const s of f.subs) {
      const e = endFor(s, now, requested);
      await stripe(env, `/v1/subscriptions/${s.id}`, e.at >= periodEnd(s) && !requested ? { cancel_at_period_end: 'true' } : { cancel_at: String(e.at), proration_behavior: 'none' });
      subIds.push(s.id); endsAt = Math.max(endsAt || 0, e.at); refundDue = refundDue || e.refund;
    }
    if (subIds.length) status = kind === 'ausserordentlich' ? 'review' : 'done';
  } catch (e) { status = 'manual'; }

  const row = { reference, received_at: receivedAt, user_id: userId, name, email, contract: String(d.contract || 'Repwerk Pro').slice(0, 60), kind, reason, requested_date: requested ? new Date(requested * 1000).toISOString() : null, ends_at: endsAt ? new Date(endsAt * 1000).toISOString() : null, stripe_subscriptions: subIds.join(','), status, refund_due: refundDue };
  await fetch(`${base(env)}/rest/v1/cancellations`, { method: 'POST', headers: { apikey: env.SUPABASE_SECRET_KEY, 'content-type': 'application/json', prefer: 'return=minimal' }, body: JSON.stringify(row) }).catch(() => null);

  let mailed = false;
  if (env.RESEND_API_KEY && env.MAIL_FROM) {
    const dt = t => new Date(t).toLocaleString('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'medium', timeStyle: 'medium' });
    const text = [`Hallo ${name},`, '', 'wir haben deine Kündigung erhalten.', '', `Vorgangsnummer: ${reference}`, `Eingegangen am: ${dt(receivedAt)}`, `Vertrag: ${row.contract}`, `Art: ${kind === 'ordentlich' ? 'ordentliche Kündigung' : 'außerordentliche Kündigung'}`,
      row.ends_at ? `Der Vertrag endet am: ${new Date(row.ends_at).toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' })}` : 'Zu dieser E-Mail-Adresse haben wir kein laufendes Abo gefunden. Wir melden uns, falls wir noch etwas von dir brauchen.',
      status === 'review' ? 'Deine außerordentliche Kündigung prüfen wir gesondert.' : null, '', 'Repwerk Fitness'].filter(x => x !== null).join('\n');
    const m = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ from: env.MAIL_FROM, to: [email], subject: `Kündigungsbestätigung ${reference}`, text }) }).catch(() => null);
    mailed = !!(m && m.ok);
  }
  return Response.json({ ok: true, reference, received_at: receivedAt, ends_at: row.ends_at, status: status === 'manual' ? 'not_found' : status, mailed });
}
