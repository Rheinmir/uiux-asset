// Tự kiểm api/cart.js: lưu giỏ · bỏ khoá lạ/trùng · render md/html/json có code nguyên văn · trần lượt xuất/ngày · 404/400.
//   node tools/test-cart.js      (Redis GIẢ; file "GitHub Pages" đọc từ chính repo)
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { db } = require('./_fake-redis');
const ROOT = path.join(__dirname, '..'), RAW = 'https://rheinmir.github.io/uiux-asset/';
const redis = global.fetch;
global.fetch = async (u, o) => {
  if (!String(u).startsWith(RAW)) return redis(u, o);
  const f = path.join(ROOT, String(u).slice(RAW.length));
  return fs.existsSync(f) ? { ok: true, status: 200, text: async () => fs.readFileSync(f, 'utf8') } : { ok: false, status: 404 };
};
const cart = require('../api/cart');
const call = (method, { body, query, ip = '1.2.3.4' } = {}) => new Promise((done) => {
  const out = { headers: {}, code: 200 };
  const res = { setHeader: (k, v) => (out.headers[k] = v), status(c) { out.code = c; return res; },
    json: (b) => done({ ...out, body: b }), send: (b) => done({ ...out, body: b }), end: () => done(out) };
  cart({ method, body, query, headers: { 'x-forwarded-for': ip } }, res);
});

(async () => {
  const g = require('../galaxy/index.json')[0], gid = g[0] + '/' + g[1];
  const se = require('../scroll-effects/manifest.json').find((m) => m.file);
  const fs_ = fs.existsSync(path.join(ROOT, 'ui-kits/kits.json'));
  const items = [{ k: 'galaxy', id: gid }, { k: 'galaxy', id: gid }, { k: 'scroll', id: se.file }, { k: 'chip', id: 'f1' },
    { k: 'galaxy', id: '../../etc/passwd' }, { k: 'evil', id: 'x' }, ...(fs_ ? [{ k: 'kit', id: 'awwwards-com', v: 99 }] : [])];
  assert.strictEqual((await call('POST', { body: { items: [] } })).code, 400, 'giỏ trống → 400');
  const r = await call('POST', { body: JSON.stringify({ name: 'Thử <b>giỏ</b>', items }) });
  assert.strictEqual(r.code, 200); assert.match(r.body.id, /^[\w-]{8}$/);
  const saved = JSON.parse(db.get(`cart:${r.body.id}`));
  assert.strictEqual(saved.name, 'Thử bgiỏ/b', 'tên bỏ ký tự < >');
  assert.strictEqual(saved.items.length, fs_ ? 5 : 4, 'bỏ trùng + loại k lạ (khoá sai đường dẫn để GET tự bỏ)');

  const md = (await call('GET', { query: { id: r.body.id, format: 'md' } })).body;
  const src = fs.readFileSync(path.join(ROOT, 'galaxy', gid), 'utf8');
  assert.ok(md.includes(src.trimEnd()), 'md chứa NGUYÊN VĂN code galaxy');
  assert.ok(!md.includes('passwd'), 'khoá galaxy lạ bị bỏ khi render');
  assert.ok(md.includes('## CSS chung của trang chip'), 'giỏ có chip → kèm CSS chung');
  assert.ok(md.includes('Chip · '), 'chip lấy tên từ trang chip');
  if (fs_) assert.ok(/UI kit · awwwards-com v\d+/.test(md) && !md.includes('v99'), 'phiên bản kit lạ → về bản mới nhất');

  const html = await call('GET', { query: { id: r.body.id, dl: '1' } });
  assert.match(html.headers['Content-Type'], /text\/html/); assert.match(html.headers['Content-Disposition'], /attachment; filename="ui-kit-/);
  assert.ok(html.body.includes('id="ui-kit-cart"') && html.body.includes('rel="alternate" type="text/markdown"'));
  const json = (await call('GET', { query: { id: r.body.id, format: 'json' } })).body;
  assert.ok(json.items.every((it) => it.raw.startsWith(RAW) && !('code' in it)), 'json chỉ có metadata + link file gốc');

  assert.strictEqual((await call('GET', { query: { id: 'khongtontai' } })).code, 404);
  assert.strictEqual((await call('GET', { query: { id: '../x' } })).code, 400);
  let last; for (let i = 0; i < 41; i++) last = await call('POST', { body: { items: [{ k: 'chip', id: 'f1' }] }, ip: '9.9.9.9' });
  assert.strictEqual(last.code, 429, 'quá 40 lần xuất/ngày/IP → 429');
  console.log('test-cart: OK');
})().catch((e) => { console.error(e); process.exit(1); });
