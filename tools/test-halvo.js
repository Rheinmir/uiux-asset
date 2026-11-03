// Kiểm trang halvo/: 3 màn, thương hiệu giả (không lộ tên gốc), không dùng ảnh, có số đo diff hợp lệ.
//   node tools/test-halvo.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const D = (f) => path.join(__dirname, '..', 'halvo', f), html = fs.readFileSync(D('index.html'), 'utf8');
for (const v of ['overview', 'rooms', 'climate']) assert(html.includes(`id="v-${v}"`) && html.includes(`${v}() {`), 'thiếu màn ' + v);
assert(html.includes('Nesta') && !/halvo/i.test(html.replace(/halvo\//g, '')), 'tên thương hiệu phải là Nesta, không lộ tên gốc');
assert(!/url\(\s*['"]?(https?:|data:image)/i.test(html), 'ảnh phải là tệp cục bộ trong halvo/img, không hotlink');
for (const m of html.matchAll(/img\/([a-z0-9]+\.jpg)/g)) assert(fs.existsSync(D('img/' + m[1])), 'thiếu ảnh img/' + m[1]);
assert(html.includes('Unsplash') && html.includes('Clay Banks') && html.includes('Andrea Davis'), 'thiếu ghi nguồn ảnh Unsplash');
const j = JSON.parse(fs.readFileSync(D('diff.json'), 'utf8'));
assert.strictEqual(j.views.length, 3);
for (const v of j.views) assert(v.mad > 0 && v.mad < 20 && v.px >= 0 && v.px < 40 && v.px_ui >= 0 && v.px_ui <= v.px, 'số đo diff bất thường: ' + JSON.stringify(v));
// nav gom 4 màn dựng lại vào «Dựng lại» (rebuilds/): trang vẫn phải tới được từ nav và hub
assert(fs.readFileSync(path.join(__dirname, '..', 'aw.js'), 'utf8').includes("'halvo/'") && fs.readFileSync(path.join(__dirname, '..', 'aw.js'), 'utf8').includes("['rebuilds/', 'Dựng lại'"), 'aw.js NAV thiếu halvo/ trong nhóm Dựng lại');
assert(fs.readFileSync(path.join(__dirname, '..', 'rebuilds/index.html'), 'utf8').includes('href="../halvo/"'), 'rebuilds/ thiếu thẻ Nesta');
console.log('test-halvo: ok');
