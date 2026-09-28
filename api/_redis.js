// Upstash Redis qua REST (pipeline) — không cần package: fetch có sẵn trong Node 18+.
// Env do Vercel Marketplace (upstash-kv) tiêm: KV_REST_API_URL/KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_*).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function pipe(cmds) {
  if (!URL_ || !TOKEN) throw new Error('thiếu env Upstash (KV_REST_API_URL/KV_REST_API_TOKEN)');
  const r = await fetch(`${URL_}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
  });
  if (!r.ok) throw new Error(`upstash ${r.status}`);
  return (await r.json()).map((x) => x.result);
}

// Ngày theo giờ Việt Nam (UTC+7) — "hôm nay" khớp với người xem trang.
const day = (t = Date.now()) => new Date(t + 7 * 3600e3).toISOString().slice(0, 10);

module.exports = { pipe, day };
