// Tự kiểm api/search.js: semantic theo nhóm · cache 1 ngày · trần tháng · fallback từ khoá không dấu · ghi từ khoá.
//   node tools/test-search.js      (Redis + Upstash Search đều GIẢ — không tốn hạn mức)
const assert = require('assert');
const { db } = require('./_fake-redis');
let calls = 0, fail = false;
require.cache[require.resolve('@upstash/search')] = { exports: { Search: class {
  index() { return { search: async ({ filter }) => { calls++; if (fail) throw new Error('backend down');
    return filter.includes('chip') ? [{ id: 'chip-5', score: 0.9 }, { id: 'khong-ton-tai', score: 0.8 }] : [{ id: 'se-dPyBxoW', score: 1 }]; } }; } } } };
process.env.UPSTASH_SEARCH_REST_URL = 'http://fake-search'; process.env.UPSTASH_SEARCH_REST_READONLY_TOKEN = 'r';
const search = require('../api/search');
const call = async (query) => { let body; await search({ query }, { setHeader() {}, json: (b) => (body = b) }); return body; };

(async () => {
  assert.strictEqual((await call({ q: 'a' })).mode, 'empty');
  let r = await call({ q: 'cuộn mượt' });
  assert.strictEqual(r.mode, 'semantic'); assert.strictEqual(calls, 2, 'mỗi lần tìm = 2 truy vấn (2 nhóm)');
  assert.deepStrictEqual(r.groups['scroll-effect'].map((h) => h.id), ['se-dPyBxoW']);
  assert.deepStrictEqual(r.groups.chip.map((h) => h.id), ['chip-5'], 'id không có trong chỉ mục phải bị bỏ');
  r = await call({ q: 'Cuộn  mượt ' });                             // cùng câu (khác hoa/khoảng trắng) → cache
  assert.strictEqual(calls, 2, 'lần 2 phải lấy cache, không gọi Search'); assert.strictEqual(r.mode, 'semantic');
  fail = true; r = await call({ q: 'nut xoa' });                      // backend lỗi → từ khoá, không dấu vẫn khớp "Nút xoá"
  assert.strictEqual(r.mode, 'keyword'); assert.ok(r.groups.chip.some((h) => h.id === 'chip-5'), JSON.stringify(r.groups.chip));
  fail = false; db.set(`s:sq:${new Date().toISOString().slice(0, 7)}`, 18000); const before = calls;
  r = await call({ q: 'parallax' });                                   // chạm trần tháng → từ khoá, không gọi Search
  assert.strictEqual(r.mode, 'keyword'); assert.strictEqual(calls, before); assert.ok(r.groups['scroll-effect'].length > 0);
  await call({ q: 'Parallax', log: '1' });
  assert.strictEqual(db.get('s:queries').get('parallax'), 1, 'ghi từ khoá khi log=1');
  console.log('test-search: OK');
})().catch((e) => { console.error(e); process.exit(1); });
