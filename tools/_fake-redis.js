// Upstash Redis GIẢ trong bộ nhớ cho test (thay global.fetch) — dùng chung bởi test-stats.js, test-search.js.
process.env.KV_REST_API_URL = 'http://fake'; process.env.KV_REST_API_TOKEN = 't';
const db = new Map(), z = (k) => db.get(k) || db.set(k, new Map()).get(k), s = (k) => db.get(k) || db.set(k, new Set()).get(k);
const run = ([c, k, ...a]) => {
  switch (c) {
    case 'INCR': db.set(k, Number(db.get(k) || 0) + 1); return db.get(k);
    case 'INCRBY': db.set(k, Number(db.get(k) || 0) + Number(a[0])); return db.get(k);
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
module.exports = { db };
