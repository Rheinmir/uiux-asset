// Kiểm sổ patterns/: mỗi pattern trong patterns.json có trang, mỗi biến thể có thẻ id trong trang; NAV có patterns/.
//   node tools/test-patterns.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const D = (f) => path.join(__dirname, '..', 'patterns', f), all = JSON.parse(fs.readFileSync(D('patterns.json'), 'utf8'));
assert(all.length > 0, 'patterns.json rỗng');
for (const p of all) {
  for (const k of ['id', 'vi', 'en', 'use', 'page', 'added', 'variants']) assert(p[k], `${p.id}: thiếu ${k}`);
  const html = fs.readFileSync(D(p.page), 'utf8');
  for (const v of p.variants) {
    for (const k of ['id', 'vi', 'en', 'use']) assert(v[k], `${p.id}/${v.id}: thiếu ${k}`);
    assert(html.includes(`id: '${v.id}'`), `${p.page}: thiếu biến thể ${v.id}`);
  }
}
assert(/\['patterns\/', 'Patterns'\]/.test(fs.readFileSync(path.join(__dirname, '..', 'aw.js'), 'utf8')), 'aw.js NAV thiếu patterns/');
console.log('test-patterns: ok');
