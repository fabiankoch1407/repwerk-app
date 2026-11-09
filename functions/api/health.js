// Tells the app what this server offers. The Supabase URL and publishable key are public by design
// (they ship to every browser); row level security in supabase/setup.sql protects the data.
export function onRequestGet({ env }) {
  const url = env.SUPABASE_URL, key = env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY;
  return Response.json({ ok: true, ai: Boolean(env.ANTHROPIC_API_KEY), supabase: url && key ? { url, key } : null });
}
