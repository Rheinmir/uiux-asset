// Kiểm trang angles/: 8 góc máy đủ tên + chú thích + prompt, cảnh dựng bằng CSS (không <img>/ảnh ngoài), có trong nav, có ghi nguồn ý tưởng.
//   node tools/test-angles.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), html = fs.readFileSync(path.join(root, 'angles/index.html'), 'utf8');
const ids = ['fisheye', 'profile', 'topdown', 'high', 'dirty', 'snow', 'xcu', 'dutch'];
for (const id of ids) assert(html.includes(`id: '${id}'`), 'thiếu góc ' + id);
assert.strictEqual((html.match(/^\s+what: '/gm) || []).length, ids.length, 'mỗi góc cần một chú thích what');
assert.strictEqual((html.match(/^\s+prompt: '/gm) || []).length, ids.length, 'mỗi góc cần một prompt');
assert.strictEqual((html.match(/^\s+c: \{ pitch:/gm) || []).length, ids.length, 'mỗi góc cần một bộ tham số máy');
for (const s of ['Frontal Fisheye Close-up', 'Side Profile Long Lens', 'Top-down / Tilt-down', 'High Angle', 'Dirty Frame', 'Snow Level', 'Extreme Close-up', 'Low Dutch Angle']) assert(html.includes(s), 'thiếu tên ' + s);
assert(!/<img\b/i.test(html) && !/url\(\s*['"]?(https?:|data:image)/i.test(html), 'cảnh phải dựng bằng CSS, không dùng ảnh (không chép ảnh của người khác)');
assert(html.includes('Everygen') && html.includes('href="../motion/"'), 'thiếu ghi nguồn ý tưởng / link về Motion');
assert(/\['angles\/', 'Góc máy'\]/.test(fs.readFileSync(path.join(root, 'aw.js'), 'utf8')), 'aw.js NAV thiếu angles/');
assert(fs.readFileSync(path.join(root, 'tools/stamp-assets.py'), 'utf8').includes('angles/index.html'), 'stamp-assets thiếu angles/index.html');
assert(html.includes('ui-kits/uiux-giatbh-angles/latest/index.html'), 'angles/ thiếu link tới UI kit');
console.log('test-angles: ok');
