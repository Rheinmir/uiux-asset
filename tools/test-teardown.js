// Kiểm trang teardown/: 3 demo build từ repo MIT còn đó, dưới 1 MB (link crawler bỏ trang lớn), có ảnh xem trước, có giấy phép + ghi công.
//   node tools/test-teardown.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const D = (f) => path.join(__dirname, '..', 'teardown', f);
for (const k of ['v8', 'cessna', 'strandbeest']) {
  assert(fs.existsSync(D(k + '-live.html')), 'thiếu teardown/' + k + '-live.html');
  assert(fs.statSync(D(k + '-live.html')).size < 1024 * 1024, k + '-live.html quá 1 MB');
  assert(fs.existsSync(D('thumbs/' + k + '.jpg')), 'thiếu ảnh xem trước ' + k);
}
assert(/^MIT License/.test(fs.readFileSync(D('LICENSE'), 'utf8')), 'LICENSE không phải MIT');
const idx = fs.readFileSync(D('index.html'), 'utf8');
for (const s of ['elvarofficial/teardown', 'whaleyxbt/claude-motion', 'v8-live.html', 'cessna-live.html', 'strandbeest-live.html', 'href="../motion/"']) assert(idx.includes(s), 'index.html thiếu ' + s);
console.log('test-teardown: ok');
