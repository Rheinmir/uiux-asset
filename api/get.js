// GET /api/get?id=<id>[&part=html|css|js|ts|tsx|all][&offset=n] — code MỘT component, text/plain, tối đa 12 KB mỗi lần.
// Code trích ra nằm ở /agents/code/<id>.<part>.txt; code sẵn trên site đọc từ file gốc (src), "gh:" = chỉ có trên GitHub Pages.
const fs = require('fs');
const path = require('path');
const { BY_ID, cors } = require('./_agents');

const CAP = 12 * 1024;
const PAGES = 'https://rheinmir.github.io/uiux-asset/';
const ROOT = path.join(__dirname, '..');

async function load(p, origin) {
  const rel = p.replace(/^gh:/, '');
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { /* Vercel: file tĩnh không nằm trong bundle hàm → fetch */ }
  const r = await fetch((p.startsWith('gh:') ? PAGES : origin + '/') + rel.split('/').map(encodeURIComponent).join('/'));
  if (!r.ok) throw new Error(`fetch ${rel} → ${r.status}`);
  return r.text();
}

const bytes = (s) => Buffer.byteLength(s);
function cut(s, max) { // cắt theo ký tự nhưng bảo đảm ≤ max byte UTF-8
  let t = s.slice(0, max);
  while (bytes(t) > max) t = t.slice(0, Math.floor(t.length * 0.95) - 1);
  return t;
}

async function get({ id, part, offset }, origin) {
  const r = BY_ID.get(String(id || ''));
  if (!r) return { status: 404, body: `/* unknown id "${String(id).slice(0, 80)}" — search first: /api/find?q=<words> */\n` };
  const [, name, source, , kb, parts, license, , url, src = {}] = r;
  const want = part && part !== 'all' ? [part] : parts;
  if (want.some((p) => !parts.includes(p)))
    return { status: 404, body: `/* ${id} has no part "${part}"; parts: ${parts.join(',') || 'none'} */\n` };
  const head = `/* uiux ${id} · ${name} · source: ${source} · license: ${license} · url: ${url} · parts: ${parts.join(',') || 'none'} · ${kb} KB */\n`;
  if (!parts.length) return { status: 200, body: head + `/* no code stored for this entry (dictionary/library link only) — see url above */\n` };
  const texts = await Promise.all(want.map((p) => load(src[p] || `agents/code/${id}.${p}.txt`, origin)));
  const body = want.length === 1 ? texts[0] : want.map((p, i) => `/* ===== part: ${p} ===== */\n${texts[i]}`).join('\n\n');
  const off = Math.max(0, Math.min(body.length, parseInt(offset, 10) || 0));
  const rest = body.slice(off);
  const room = CAP - bytes(head) - 120;
  if (bytes(rest) <= room && !off) return { status: 200, body: head + rest };
  const piece = cut(rest, room);
  const next = off + piece.length;
  const tail = next < body.length
    ? `\n/* truncated: ${Math.ceil(bytes(body) / 1024)} KB total, use &part= or &offset=${next} */\n`
    : `\n/* end (offset ${off}) */\n`;
  return { status: 200, body: head + piece + tail };
}

module.exports = async (req, res) => {
  cors(res);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const origin = `${proto}://${req.headers['x-forwarded-host'] || req.headers.host}`;
  try {
    const { status, body } = await get(req.query || {}, origin);
    res.status(status).send(body);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).send(`/* could not load code: ${e.message} */\n`);
  }
};
module.exports.get = get;
module.exports.CAP = CAP;
