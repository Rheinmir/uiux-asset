// Kiểm fonts/: 9 family, mỗi cái có font gần giống + trạng thái giấy phép hợp lệ + bảng màu hex thật + ảnh khung hình; không có tệp font thật nào trong repo.
//   node tools/test-fonts.js        (chạy thật: node tools/e2e-fonts.cjs)
const assert = require('assert'), fs = require('fs'), path = require('path');
const R = (p) => path.join(__dirname, '..', p), rd = (p) => fs.readFileSync(R(p), 'utf8');
const d = JSON.parse(rd('fonts/families.json')), h = rd('fonts/index.html');
assert.strictEqual(d.families.length, 9, 'reel có 9 font');
assert.deepStrictEqual(d.families.map((f) => f.slug).sort(), ['bargain', 'gibed', 'korvich', 'lust', 'nature', 'poppins', 'quizlo', 'salena', 'schabo']);
for (const f of d.families) {
  assert(['free', 'paid', 'unverified'].includes(f.status.state), f.slug + ': trạng thái lạ');
  assert(f.status.text.length > 20, f.slug + ': thiếu lời giải thích trạng thái');
  if (f.status.state === 'free') assert(f.status.sources.length, f.slug + ': «miễn phí» phải kèm trang đã xem');
  assert(f.palette.length >= 7 && f.palette.every((c) => /^#[0-9a-f]{6}$/.test(c.hex) && c.role), f.slug + ': bảng màu hỏng');
  assert(h.includes(encodeURIComponent(f.look.family).replace(/%20/g, '+')) || h.includes(f.look.family.replace(/ /g, '+')), f.slug + ': font ' + f.look.family + ' chưa nạp trong index.html');
  assert(fs.existsSync(R(`fonts/shots/${f.slug}.webp`)), f.slug + ': thiếu ảnh khung hình');
}
assert.strictEqual(d.families.filter((f) => f.real).map((f) => f.slug).join(), 'poppins', 'chỉ Poppins là font thật');
assert(h.includes('gần giống') && h.includes('Chưa kiểm được') || h.includes('Chưa kiểm được'), 'trang phải nói rõ gần giống / chưa kiểm được');
for (const f of fs.readdirSync(R('fonts'))) assert(!/\.(ttf|otf|woff2?)$/i.test(f), 'không đưa tệp font vào repo: ' + f);
assert(rd('aw.js').includes("['fonts/', 'Font']"), 'aw.js NAV thiếu Font');
assert(rd('tools/stamp-assets.py').includes('fonts/index.html'), 'stamp-assets thiếu fonts');
console.log('test-fonts: ok · ' + d.families.length + ' family · ' + d.families.reduce((a, f) => a + f.palette.length, 0) + ' màu');
