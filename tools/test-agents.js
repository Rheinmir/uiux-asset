// Tự kiểm API cho agent (/api/find, /api/get) bằng req/res giả — không cần mạng (code đọc từ file trong repo).
//   node tools/test-agents.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const INDEX = require('../agents/index.json');
const find = require('../api/find');
const get = require('../api/get');

const ROOT = path.join(__dirname, '..');
const per = {};
for (const [id, , source, , , parts, , , , src = {}] of INDEX) {
  per[source] = (per[source] || 0) + 1;
  for (const p of parts) assert.ok(fs.existsSync(path.join(ROOT, (src[p] || `agents/code/${id}.${p}.txt`).replace(/^gh:/, ''))), `${id}: thiếu ${p}`);
}
for (const [s, n] of Object.entries(per)) assert.ok(n > 0, s);
assert.ok(Object.keys(per).length >= 18, 'thiếu nguồn: ' + Object.keys(per));

const mock = (query) => new Promise((done) => {
  const h = {}; let code = 200;
  const res = { setHeader: (k, v) => (h[k.toLowerCase()] = v), status(c) { code = c; return res; },
    json: (o) => done({ code, h, body: JSON.stringify(o) }), send: (b) => done({ code, h, body: b }) };
  const r = (query.id !== undefined ? get : find)({ query, headers: { host: 'localhost' } }, res);
  if (r && r.catch) r.catch((e) => done({ code: 599, body: e.message }));
});

(async () => {
  const f = await mock({ q: 'toggle', k: '50' });
  const o = JSON.parse(f.body);
  assert.ok(o.results.length > 0 && o.results.length <= 12, 'find ≤ 12');
  assert.ok(Buffer.byteLength(f.body) < 3000, 'find < 3 KB: ' + f.body.length);
  assert.deepStrictEqual(Object.keys(o.results[0]), ['id', 'name', 'source', 'kind', 'kb', 'parts', 'license']);
  assert.strictEqual(f.h['access-control-allow-origin'], '*');
  assert.ok(/max-age=3600/.test(f.h['cache-control']));
  assert.ok((await mock({ q: 'dock', source: 'bencho' })).body.includes('bencho/dock'));
  assert.ok(JSON.parse((await mock({})).body).sources.galaxy > 3000);

  const big = INDEX.find((r) => r[4] > 30 && r[5].length);
  let g = await mock({ id: big[0] });
  assert.strictEqual(g.code, 200);
  assert.ok(Buffer.byteLength(g.body) <= 12 * 1024, 'get ≤ 12 KB: ' + Buffer.byteLength(g.body));
  assert.ok(g.body.startsWith(`/* uiux ${big[0]} `) && g.body.includes('license:'));
  const m = g.body.match(/truncated: \d+ KB total, use &part= or &offset=(\d+) \*\/\n$/);
  assert.ok(m, 'thiếu dòng truncated');
  const g2 = await mock({ id: big[0], offset: m[1] });
  assert.ok(Buffer.byteLength(g2.body) <= 12 * 1024 && g2.body.length > 200);
  for (const s of Object.keys(per)) { // một id mỗi nguồn: get trả 200, ≤ 12 KB
    const r = INDEX.find((x) => x[2] === s && x[5].length) || INDEX.find((x) => x[2] === s);
    g = await mock({ id: r[0], part: r[5][0] });
    assert.strictEqual(g.code, 200, r[0] + ' ' + g.body.slice(0, 200));
    assert.ok(Buffer.byteLength(g.body) <= 12 * 1024, r[0]);
  }
  assert.strictEqual((await mock({ id: 'khong/co' })).code, 404);
  assert.strictEqual((await mock({ id: 'shadcn/switch', part: 'zzz' })).code, 404);
  console.log('test-agents ok:', INDEX.length, 'mục,', Object.keys(per).length, 'nguồn');
})().catch((e) => { console.error(e); process.exit(1); });
