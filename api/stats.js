// GET /api/stats — số liệu công khai (không có IP/hash khách). ?lite=1 → chỉ bộ đếm chân trang.
const { pipe, day } = require('./_redis');

const top = (flat) => { const o = []; for (let i = 0; i < (flat || []).length; i += 2) o.push([flat[i], Number(flat[i + 1])]); return o; };

module.exports = async (req, res) => {
  const now = Date.now();
  const d = day(now);
  try {
    const lite = await pipe([
      ['GET', 's:views'], ['PFCOUNT', 's:uv'], ['ZREMRANGEBYSCORE', 's:online', 0, now - 5 * 60e3], ['ZCARD', 's:online'],
      ['GET', `s:views:${d}`], ['GET', `s:new:${d}`],
    ]);
    const out = { views: Number(lite[0] || 0), unique: Number(lite[1] || 0), online: Number(lite[3] || 0),
      today: Number(lite[4] || 0), newToday: Number(lite[5] || 0) };
    if (req.query?.lite) {
      res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=60');
      return res.json(out);
    }
    const days = Array.from({ length: 14 }, (_, i) => day(now - (13 - i) * 86400e3));
    const r = await pipe([
      ...days.map((x) => ['GET', `s:views:${x}`]), ...days.map((x) => ['PFCOUNT', `s:uv:${x}`]), ...days.map((x) => ['GET', `s:new:${x}`]),
      ['PFCOUNT', `s:uv:${d}`], ['GET', 's:bots'], ['GET', `s:bots:${d}`], ['SCARD', 's:visitors'], ['GET', 's:first'], ['GET', 's:last'],
      ['ZREVRANGE', 's:pages', 0, 9, 'WITHSCORES'], ['ZREVRANGE', 's:countries', 0, 9, 'WITHSCORES'], ['ZREVRANGE', 's:refs', 0, 9, 'WITHSCORES'],
      ['ZREVRANGE', 's:devices', 0, 4, 'WITHSCORES'], ['ZREVRANGE', 's:browsers', 0, 5, 'WITHSCORES'], ['ZREVRANGE', 's:os', 0, 5, 'WITHSCORES'],
    ]);
    const n = 14, k = 3 * n;
    Object.assign(out, {
      daily: days.map((x, i) => ({ d: x, views: Number(r[i] || 0), unique: Number(r[n + i] || 0), fresh: Number(r[2 * n + i] || 0) })),
      uniqueToday: Number(r[k] || 0), bots: Number(r[k + 1] || 0), botsToday: Number(r[k + 2] || 0),
      visitorsAll: Number(r[k + 3] || 0), since: r[k + 4] ? Number(r[k + 4]) : null, last: r[k + 5] ? JSON.parse(r[k + 5]) : null,
      pages: top(r[k + 6]), countries: top(r[k + 7]), refs: top(r[k + 8]), devices: top(r[k + 9]), browsers: top(r[k + 10]), os: top(r[k + 11]),
      at: now,
    });
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    res.json(out);
  } catch (e) {
    res.status(503).json({ error: String(e.message || e) });
  }
};
