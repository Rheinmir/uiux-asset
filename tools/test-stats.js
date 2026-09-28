// Tự kiểm api/hit.js + api/stats.js với Upstash GIẢ trong bộ nhớ (không cần mạng/kho thật).
//   node tools/test-stats.js
const assert = require('assert');
process.env.KV_REST_API_URL = 'http://fake'; process.env.KV_REST_API_TOKEN = 't';

const db = new Map(), z = (k) => db.get(k) || db.set(k, new Map()).get(k), s = (k) => db.get(k) || db.set(k, new Set()).get(k);
const run = ([c, k, ...a]) => {
  switch (c) {
    case 'INCR': db.set(k, Number(db.get(k) || 0) + 1); return db.get(k);
    case 'GET': return db.has(k) ? String(db.get(k)) : null;
    case 'SET': if (a.includes('NX') && db.has(k)) return null; db.set(k, a[0]); return 'OK';
    case 'EXPIRE': return 1;
    case 'SADD': case 'PFADD': { const x = s(k), n = x.size; a.forEach((v) => x.add(v)); return x.size > n ? 1 : 0; }
    case 'SCARD': case 'PFCOUNT': return db.has(k) ? db.get(k).size : 0;
    case 'ZADD': z(k).set(a[1], Number(a[0])); return 1;
    case 'ZINCRBY': z(k).set(a[1], (z(k).get(a[1]) || 0) + Number(a[0])); return z(k).get(a[1]);
    case 'ZREMRANGEBYSCORE': { let n = 0; for (const [m, sc] of z(k)) if (sc >= a[0] && sc <= a[1]) { z(k).delete(m); n++; } return n; }
    case 'ZCARD': return db.has(k) ? db.get(k).size : 0;
    case 'ZREVRANGE': return [...z(k)].sort((p, q) => q[1] - p[1]).slice(a[0], a[1] + 1).flatMap(([m, sc]) => [m, String(sc)]);
    default: throw new Error('lệnh chưa giả lập: ' + c);
  }
};
global.fetch = async (_u, o) => ({ ok: true, json: async () => JSON.parse(o.body).map((c) => ({ result: run(c) })) });

const hit = require('../api/hit'), stats = require('../api/stats');
const call = async (fn, { method = 'GET', body, headers = {}, query = {} } = {}) => {
  const out = { code: 200, body: null, h: {} };
  const res = { setHeader: (k, v) => (out.h[k] = v), status: (c) => ((out.code = c), res), end: () => out, json: (b) => ((out.body = b), out) };
  await fn({ method, body, headers, query, socket: {} }, res); return out;
};
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1';
const H = (ip, ua = UA) => ({ 'user-agent': ua, 'x-forwarded-for': ip, 'x-vercel-ip-country': 'VN', origin: 'https://uiux-asset.giatbh.io.vn' });

(async () => {
  assert.strictEqual((await call(hit, { method: 'POST', body: { p: '/', r: 'google.com' }, headers: H('1.1.1.1') })).code, 204);
  await call(hit, { method: 'POST', body: JSON.stringify({ p: '/' }), headers: H('1.1.1.1') });           // F5 trong 30 phút → không tính lượt
  await call(hit, { method: 'POST', body: { p: '/components/chip.html' }, headers: H('1.1.1.1') });      // cùng khách, trang khác → tính
  await call(hit, { method: 'POST', body: { p: '/' }, headers: H('2.2.2.2', 'Mozilla/5.0 (Windows NT 10.0) Chrome/130.0 Safari/537.36') });
  await call(hit, { method: 'POST', body: { p: '/' }, headers: H('3.3.3.3', 'Mozilla/5.0 HeadlessChrome/130.0') });   // bot
  assert.strictEqual((await call(hit, { method: 'POST', body: { p: '/' }, headers: { ...H('4.4.4.4'), origin: 'https://evil.example' } })).code, 403);
  assert.strictEqual((await call(hit, { method: 'GET' })).code, 405);

  const lite = (await call(stats, { query: { lite: '1' } })).body;
  assert.deepStrictEqual(lite, { views: 3, unique: 2, online: 2, today: 3, newToday: 2 });
  const f = (await call(stats)).body;
  assert.strictEqual(f.bots, 1); assert.strictEqual(f.botsToday, 1); assert.strictEqual(f.visitorsAll, 2);
  assert.deepStrictEqual(f.pages, [['/', 2], ['/components/chip.html', 1]]);
  assert.deepStrictEqual(f.refs, [['google.com', 1]]);
  assert.deepStrictEqual(Object.fromEntries(f.devices), { Mobile: 2, Desktop: 1 });
  assert.deepStrictEqual(Object.fromEntries(f.browsers), { Safari: 2, Chrome: 1 });
  assert.strictEqual(f.daily.length, 14); assert.strictEqual(f.daily[13].views, 3); assert.strictEqual(f.daily[13].fresh, 2);
  assert.strictEqual(f.last.p, '/'); assert.ok(![...db.keys()].some((k) => k.includes('1.1.1.1')), 'không được lưu IP thô');
  console.log('test-stats: OK');
})().catch((e) => { console.error(e); process.exit(1); });
