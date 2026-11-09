// POST /api/ai -> forwards a request to the Claude API. The API key stays on the server (Cloudflare environment
// variable ANTHROPIC_API_KEY) and never reaches the phone.
// Body: { prompt, images?: [dataUrl], json?: true, kind?: 'text' | 'mealplan' }  or  { messages: [{ role, content }] }
//
// Limits: when Supabase is configured (SUPABASE_URL + publishable key), every call needs a signed-in user
// (Authorization: Bearer <access token>) and is counted by the database function public.use_ai(kind), which
// knows the free and Pro limits (see supabase/setup.sql). Without Supabase the AI is open to anyone with the URL.
const MODEL = 'claude-sonnet-5-5';
const MEDIA = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_TOKENS = { scan: 2000, text: 2000, mealplan: 8000, coach: 800 };
const fail = (status, code, extra) => Response.json({ code, ...(extra || {}) }, { status });

async function useQuota(env, request, kind) {
  const url = (env.SUPABASE_URL || '').replace(/\/+$/, ''), key = env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: true };
  const auth = request.headers.get('authorization') || '';
  if (!/^Bearer \S+$/.test(auth)) return { ok: false, status: 401, code: 'login' };
  let r;
  try { r = await fetch(`${url}/rest/v1/rpc/use_ai`, { method: 'POST', headers: { apikey: key, authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify({ p_kind: kind }) }); }
  catch { return { ok: false, status: 503, code: 'server' }; }
  if (r.status === 401 || r.status === 403) return { ok: false, status: 401, code: 'login' };
  if (!r.ok) return { ok: false, status: 503, code: 'server' };
  const j = await r.json().catch(() => null);
  if (!j) return { ok: false, status: 503, code: 'server' };
  if (!j.ok) return { ok: false, status: j.error === 'auth' ? 401 : 429, code: j.error === 'auth' ? 'login' : j.error === 'pro' ? 'pro' : 'limit', limit: j.limit };
  return j;
}

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return fail(503, 'ai_off');
  const raw = await request.text();
  if (raw.length > 8_000_000) return fail(413, 'image_rejected');
  let body;
  try { body = JSON.parse(raw); } catch { return fail(400, 'bad_request'); }

  let messages, kind;
  if (Array.isArray(body.messages)) {
    kind = 'coach';
    messages = body.messages.slice(-12)
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.slice(0, 12_000) }));
    while (messages.length && messages[0].role !== 'user') messages.shift();
  } else if (typeof body.prompt === 'string') {
    const content = [];
    for (const url of (body.images || []).slice(0, 3)) {
      const m = /^data:([^;]+);base64,(.+)$/.exec(String(url));
      if (!m || !MEDIA.includes(m[1])) return fail(400, 'image_rejected');
      content.push({ type: 'image', source: { type: 'base64', media_type: m[1], data: m[2] } });
    }
    kind = content.length ? 'scan' : body.kind === 'mealplan' ? 'mealplan' : 'text';
    content.push({ type: 'text', text: body.prompt.slice(0, 30_000) });
    messages = [{ role: 'user', content }];
  }
  if (!messages || !messages.length) return fail(400, 'bad_request');

  const q = await useQuota(env, request, kind);
  if (!q.ok) return fail(q.status, q.code, { limit: q.limit });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: env.AI_MODEL || MODEL, max_tokens: MAX_TOKENS[kind] || 800, messages }),
  });
  if (res.status === 429 || res.status === 529) return fail(429, 'rate_limited');
  if (!res.ok) return fail(502, 'server');
  const data = await res.json();
  if (data.stop_reason === 'refusal') return fail(422, 'refused');
  const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  const usage = q.used !== undefined ? { used: q.used, limit: q.limit, kind } : undefined;
  if (!body.json) return Response.json({ text, usage });
  const start = text.indexOf('{'), end = text.lastIndexOf('}');
  try { return Response.json({ json: JSON.parse(text.slice(start, end + 1)), usage }); } catch { return fail(502, 'invalid_json'); }
}
