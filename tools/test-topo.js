// Kiểm tĩnh topo/: match.json hợp lệ (che chữ ≥ 90%), có ảnh gốc/chụp/lệch, nav + stamp có Topo, mock có tương tác + cờ ready.
//   node tools/test-topo.js     (chấm lại: NODE_PATH=$(npm root -g) node tools/topo-diff.cjs)
const assert = require('assert'), fs = require('fs'), path = require('path');
const R = (p) => path.join(__dirname, '..', p), rd = (p) => fs.readFileSync(R(p), 'utf8');
const m = JSON.parse(rd('topo/match.json'));
assert.deepStrictEqual(m.size, [702, 950], 'khung phải 702×950');
assert(m.match_masked >= 90 && m.match >= 85, 'khớp thấp: ' + JSON.stringify(m));
for (const f of ['orig.webp', 'mock.webp', 'diff.webp']) assert(fs.existsSync(R('topo/shots/' + f)), 'thiếu ' + f);
const h = rd('topo/mock.html');
for (const s of ['dataset.ready', 'pointerenter', "'wheel'", 'shot', 'data-tip']) assert(h.includes(s), 'mock.html thiếu ' + s);
// mỗi cạnh trỏ tới nút có thật
const ids = new Set([...h.matchAll(/class="n [^"]*" id="([a-z0-9]+)"/g)].map((x) => x[1]));
assert(ids.size === 20, 'cần 20 nút, có ' + ids.size);
for (const [, a, b] of h.matchAll(/\['([a-z0-9]+)', '([a-z0-9]+)', '[^']*'\]/g)) assert(ids.has(a) && ids.has(b), `cạnh ${a}→${b} trỏ nút không có`);
assert(rd('topo/index.html').includes('match.json') && rd('topo/index.html').includes('mock.html'), 'index.html thiếu match.json/mock.html');
assert(rd('aw.js').includes("['topo/', 'Topo']"), 'aw.js NAV thiếu nút Topo');
assert(rd('tools/stamp-assets.py').includes('topo/index.html'), 'stamp-assets thiếu topo');
for (const f of ['topo/index.html', 'topo/mock.html']) assert(fs.statSync(R(f)).size < 200 * 1024, f + ' quá 200 KB');
console.log(`test-topo: ok · khớp ${m.match}% · che chữ ${m.match_masked}%`);
