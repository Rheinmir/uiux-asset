// Kiểm tĩnh signal/: match.json đủ 5 màn và mỗi màn khớp ≥ 85%, có ảnh gốc + ảnh lệch, nav + stamp có Signal, trang nói rõ motion là đoán.
//   node tools/test-signal.js     (chạy thật: node tools/e2e-signal.cjs ; chấm lại: node tools/signal-diff.cjs)
const assert = require('assert'), fs = require('fs'), path = require('path');
const R = (p) => path.join(__dirname, '..', p), rd = (p) => fs.readFileSync(R(p), 'utf8');
const m = JSON.parse(rd('signal/match.json'));
assert.strictEqual(m.screens.length, 5, 'cần 5 màn');
for (const s of m.screens) {
  assert(s.match >= 85, `màn ${s.screen} khớp ${s.match}% < 85%`);
  for (const f of [`orig-${s.screen}.webp`, `diff-${s.screen}.webp`]) assert(fs.existsSync(R('signal/shots/' + f)), 'thiếu ' + f);
}
const h = rd('signal/index.html');
for (const s of ['match.json', 'CHUYỂN ĐỘNG LÀ ĐOÁN', 'mock.html?live=1']) assert(h.includes(s), 'index.html thiếu ' + s);
assert(rd('signal/mock.html').includes('dataset.ready'), 'mock.html thiếu cờ ready');
// nav gom 4 màn dựng lại vào «Dựng lại» (rebuilds/): trang vẫn phải tới được từ nav và hub
assert(rd('aw.js').includes("'signal/'") && rd('aw.js').includes("['rebuilds/', 'Dựng lại'"), 'aw.js NAV thiếu signal/ trong nhóm Dựng lại');
assert(rd('rebuilds/index.html').includes('href="../signal/"'), 'rebuilds/ thiếu thẻ Signal');
assert(rd('tools/stamp-assets.py').includes('signal/index.html'), 'stamp-assets thiếu signal');
for (const f of ['signal/index.html', 'signal/mock.html']) assert(fs.statSync(R(f)).size < 1024 * 1024, f + ' quá 1 MB');
console.log('test-signal: ok · trung bình ' + (m.screens.reduce((a, s) => a + s.match, 0) / 5).toFixed(2) + '%');
