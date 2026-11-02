// Kiểm tĩnh trang notebook/: đủ 4 nhóm chức năng, có trong thanh điều hướng + danh sách stamp, GIF demo còn đó, e2e Playwright có mặt.
//   node tools/test-notebook.js        (chạy thật trình duyệt: node tools/e2e-notebook.cjs)
const assert = require('assert'), fs = require('fs'), path = require('path');
const R = (p) => path.join(__dirname, '..', p), rd = (p) => fs.readFileSync(R(p), 'utf8');
const h = rd('notebook/index.html');
for (const s of ['weekly', 'todo', 'hourly', 'dotgrid']) assert(h.includes(`['${s}',`) && h.includes(`${s}`), 'thiếu nhóm ' + s);
for (const s of ['data-add', 'data-hour', 'data-top', 'canvas', 'localStorage', 'demo.gif']) assert(h.includes(s), 'index.html thiếu ' + s);
assert(rd('aw.js').includes("['notebook/', 'Sổ tay']"), 'aw.js NAV thiếu Sổ tay');
assert(rd('tools/stamp-assets.py').includes('notebook/index.html'), 'stamp-assets thiếu notebook');
assert(fs.statSync(R('notebook/demo.gif')).size > 50e3 && fs.statSync(R('notebook/demo.gif')).size < 3e6, 'demo.gif ngoài khoảng 50 KB–3 MB');
assert(fs.statSync(R('notebook/index.html')).size < 1024 * 1024, 'trang quá 1 MB');
assert(fs.existsSync(R('tools/e2e-notebook.cjs')), 'thiếu e2e');
console.log('test-notebook: ok');
