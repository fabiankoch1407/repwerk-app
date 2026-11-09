// POST /api/ai -> forwards a request to the Claude API. The API key stays on the server (Cloudflare environment
// variable ANTHROPIC_API_KEY) and never reaches the phone.
// Body: { prompt, images?: [dataUrl], json?: true }  or  { messages: [{ role, content }] }
const MODEL = 'claude-sonnet-5-5';
const MEDIA = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const fail = (status, code) => Response.json({ code }, { status });

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return fail(503, 'ai_off');
  const raw = await request.text();
  if (raw.length > 8_000_000) return fail(413, 'image_rejected');
  let body;
  try { body = JSON.parse(raw); } catch { return fail(400, 'bad_request'); }

  let messages;
  if (Array.isArray(body.messages)) {
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
    content.push({ type: 'text', text: body.prompt.slice(0, 30_000) });
    messages = [{ role: 'user', content }];
  }
  if (!messages || !messages.length) return fail(400, 'bad_request');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: env.AI_MODEL || MODEL, max_tokens: body.json ? 8000 : 800, messages }),
  });
  if (res.status === 429 || res.status === 529) return fail(429, 'rate_limited');
  if (!res.ok) return fail(502, 'server');
  const data = await res.json();
  if (data.stop_reason === 'refusal') return fail(422, 'refused');
  const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
  if (!body.json) return Response.json({ text });
  const start = text.indexOf('{'), end = text.lastIndexOf('}');
  try { return Response.json({ json: JSON.parse(text.slice(start, end + 1)) }); } catch { return fail(502, 'invalid_json'); }
}
