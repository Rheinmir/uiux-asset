// Kiểm trang halvo/: 3 màn, thương hiệu giả (không lộ tên gốc), không dùng ảnh, có số đo diff hợp lệ.
//   node tools/test-halvo.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const D = (f) => path.join(__dirname, '..', 'halvo', f), html = fs.readFileSync(D('index.html'), 'utf8');
for (const v of ['overview', 'rooms', 'climate']) assert(html.includes(`id="v-${v}"`) && html.includes(`${v}() {`), 'thiếu màn ' + v);
assert(html.includes('Nesta') && !/halvo/i.test(html.replace(/halvo\//g, '')), 'tên thương hiệu phải là Nesta, không lộ tên gốc');
assert(!/<img\b/i.test(html) && !/url\(\s*['"]?(https?:|data:image)/i.test(html), 'dựng bằng CSS, không dùng ảnh');
const j = JSON.parse(fs.readFileSync(D('diff.json'), 'utf8'));
assert.strictEqual(j.views.length, 3);
for (const v of j.views) assert(v.mad > 0 && v.mad < 20 && v.px >= 0 && v.px < 40, 'số đo diff bất thường: ' + JSON.stringify(v));
assert(/\['halvo\/', 'Nesta'\]/.test(fs.readFileSync(path.join(__dirname, '..', 'aw.js'), 'utf8')), 'aw.js NAV thiếu halvo/');
console.log('test-halvo: ok');
