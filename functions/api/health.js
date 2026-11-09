// Tells the app what this server offers. The Supabase URL and publishable key are public by design
// (they ship to every browser); row level security in supabase/setup.sql protects the data.
export function onRequestGet({ env }) {
  const url = env.SUPABASE_URL, key = env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY;
  const supabase = url && key ? { url, key } : null;
  const pay = Boolean(supabase && env.SUPABASE_SECRET_KEY && env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET && env.STRIPE_PRICE_MONTHLY && env.STRIPE_PRICE_YEARLY);
  return Response.json({ ok: true, ai: Boolean(env.ANTHROPIC_API_KEY), aiLogin: Boolean(supabase), supabase, pay, trialDays: Number(env.STRIPE_TRIAL_DAYS) || 0 });
}
