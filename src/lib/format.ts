export const fmt = (n: number) => Math.round(n || 0).toLocaleString('de-DE');
export const fmt1 = (n: number) => (Math.round((n || 0) * 10) / 10).toLocaleString('de-DE');
export const pad = (n: number) => String(n).padStart(2, '0');
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const weekKey = (d = new Date()) => { const t = new Date(d); t.setHours(0, 0, 0, 0); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); return dayKey(t); };
export const num = (v: string) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
