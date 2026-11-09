// GET /api/health -> tells the app whether the AI is set up (an API key exists). Never returns the key.
export function onRequestGet({ env }) {
  return Response.json({ ok: true, ai: Boolean(env.ANTHROPIC_API_KEY) });
}
