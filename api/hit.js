// POST /api/hit {p: đường dẫn, r: host nguồn giới thiệu} — ghi một lượt xem.
// Riêng tư: không lưu IP thô; khách = sha256(IP + UA + SALT) cắt 16 hex.
// Chống bơm số: cùng khách + cùng trang chỉ tính 1 lượt mỗi 30 phút; bot/headless chỉ tăng bộ đếm bot.
const crypto = require('crypto');
const { pipe, day } = require('./_redis');

const SALT = process.env.STATS_SALT || 'uiux-asset';
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|curl|wget|python|go-http|java\/|axios|node-fetch|monitor|uptime/i;
const ORIGIN_OK = /^https:\/\/((uiux-asset|uiux)\.giatbh\.io\.vn|uiux-asset[\w-]*\.vercel\.app)$/;
const TTL = 90 * 86400;

const device = (ua) => (/iPad|Tablet/i.test(ua) ? 'Tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'Mobile' : 'Desktop');
const browser = (ua) => (/Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox'
  : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Khác');
const os = (ua) => (/Windows/.test(ua) ? 'Windows' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Mac OS X/.test(ua) ? 'macOS'
  : /Android/.test(ua) ? 'Android' : /Linux/.test(ua) ? 'Linux' : 'Khác');
const clean = (s, n = 80) => String(s || '').replace(/[^\w\-./:À-ỹ ]/g, '').slice(0, n);

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const origin = req.headers.origin || '';
  if (origin && !ORIGIN_OK.test(origin)) return res.status(403).end();
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  const ua = req.headers['user-agent'] || '';
  const d = day();
  try {
    if (!ua || BOT.test(ua)) {
      await pipe([['INCR', 's:bots'], ['INCR', `s:bots:${d}`], ['EXPIRE', `s:bots:${d}`, TTL]]);
      return res.status(204).end();
    }
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '';
    const vid = crypto.createHash('sha256').update(`${ip}|${ua}|${SALT}`).digest('hex').slice(0, 16);
    const path = clean(b.p, 120) || '/';
    const ref = clean(b.r, 60);
    const country = clean(req.headers['x-vercel-ip-country'], 2) || '??';
    const now = Date.now();
    const [seen, isNew] = await pipe([
      ['SET', `s:seen:${vid}:${path}`, '1', 'NX', 'EX', 1800],
      ['SADD', 's:visitors', vid],
    ]);
    const cmds = [
      ['ZADD', 's:online', now, vid], ['ZREMRANGEBYSCORE', 's:online', 0, now - 5 * 60e3],
      ['PFADD', 's:uv', vid], ['PFADD', `s:uv:${d}`, vid], ['EXPIRE', `s:uv:${d}`, TTL],
      ['SET', 's:first', String(now), 'NX'],
    ];
    if (isNew) cmds.push(['INCR', `s:new:${d}`], ['EXPIRE', `s:new:${d}`, TTL]);
    if (seen === 'OK') {        // lượt mới (không phải F5 trong 30 phút)
      cmds.push(
        ['INCR', 's:views'], ['INCR', `s:views:${d}`], ['EXPIRE', `s:views:${d}`, TTL],
        ['ZINCRBY', 's:pages', 1, path], ['ZINCRBY', 's:countries', 1, country],
        ['ZINCRBY', 's:devices', 1, device(ua)], ['ZINCRBY', 's:browsers', 1, browser(ua)], ['ZINCRBY', 's:os', 1, os(ua)],
        ['SET', 's:last', JSON.stringify({ t: now, p: path, c: country, d: device(ua), n: !!isNew })],
      );
      if (ref) cmds.push(['ZINCRBY', 's:refs', 1, ref]);
    }
    await pipe(cmds);
    res.status(204).end();
  } catch (e) {
    res.status(503).json({ error: String(e.message || e) });
  }
};
