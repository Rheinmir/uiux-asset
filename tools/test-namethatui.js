// Kiểm trang namethatui/: đủ 33 macOS + 58 web + 14 phong cách + 18 cặp, mỗi mục có mô tả vi + slug hợp lệ, có ghi nguồn + tuyên bố giấy phép, không hotlink ảnh/chữ của site gốc.
//   node tools/test-namethatui.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const D = (f) => path.join(__dirname, '..', 'namethatui', f);
global.window = {}; require(D('data.js')); const N = window.NT;
assert.deepStrictEqual([N.macos.length, N.web.length, N.styles.length, N.vs.length], [33, 58, 14, 18]);
const seen = new Set();
for (const g of ['macos', 'web', 'styles', 'vs']) for (const r of N[g]) {
  assert(/^[a-z0-9-]+$/.test(r[0]) && r[1] && r[2].length >= 25, 'mục lỗi: ' + r[0]);
  assert(/[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]/i.test(r[2]), 'mô tả phải bằng tiếng Việt: ' + r[0]);
  assert(!seen.has(g + r[0]), 'trùng slug ' + r[0]); seen.add(g + r[0]);
}
const html = fs.readFileSync(D('index.html'), 'utf8');
assert(html.includes('namethatui.com') && html.includes('không công bố giấy phép mở') && html.includes('không chép'), 'thiếu ghi nguồn / tuyên bố giấy phép');
assert(!/<img\b/i.test(html) && !/url\(\s*['"]?https?:/i.test(html), 'không hotlink ảnh');
for (const r of N.macos) assert(new RegExp(`['"]?${r[0]}['"]?: ['"]`).test(html), 'thẻ macOS thiếu demo: ' + r[0]);
for (const t of ['dict', 'styles', 'vs', 'spec']) assert(html.includes(`['${t}',`), 'thiếu tab ' + t);
assert(/\['namethatui\/', 'Tên UI'\]/.test(fs.readFileSync(path.join(__dirname, '..', 'aw.js'), 'utf8')), 'aw.js NAV thiếu namethatui/');
assert(fs.readFileSync(path.join(__dirname, 'stamp-assets.py'), 'utf8').includes('namethatui/index.html'), 'stamp-assets thiếu namethatui');
// demo thẻ: đủ 91 (vẽ tay + sinh từ phép đo), không có url()/liên kết ngoài
global.window = global.window || {}; require(D('demos.js')); require(D('demos.gen.js'));
const have = Object.assign({}, window.NT_DEMOS_GEN, window.NT_DEMOS);
for (const [p, list] of [['web', N.web], ['macos', N.macos]]) for (const r of list) assert(have[p + '/' + r[0]], 'thiếu demo vẽ lại: ' + p + '/' + r[0]);
const demoSrc = fs.readFileSync(D('demos.gen.js'), 'utf8');
assert(!/url\(|https?:\/\//.test(demoSrc), 'demos.gen.js không được có url() hay liên kết ngoài');
console.log('test-namethatui: ok');
