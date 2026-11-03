// Kiểm nội dung viết lại của namethatui/: đủ 91 thuật ngữ (33 macOS + 58 web), 14 phong cách, 18 cặp vs, 8 trang; số mục aka/phrases/anatomy/code/see khớp bảng đối chiếu (tools/ntu-manifest.json, đếm từ trang gốc); mọi khoá `see` trỏ tới thuật ngữ có thật; chữ là tiếng Việt.
//   node tools/test-nt-content.js
const assert = require('assert'), fs = require('fs'), path = require('path');
global.window = {}; require(path.join(__dirname, '..', 'namethatui', 'data.js')); require(path.join(__dirname, '..', 'namethatui', 'content.js'));
const N = window.NT, F = window.NT_FULL, M = JSON.parse(fs.readFileSync(path.join(__dirname, 'ntu-manifest.json'), 'utf8'));
const VI = /[ăâđêôơưáàảãạéèẻẽẹíìỉĩịóòỏõọúùủũụýỳỷỹỵ]/i;
assert(F._ui && F._ui.anatomy && F._ui.code && F._ui.see, 'thiếu nhãn _ui');
let n = 0;
for (const g of ['macos', 'web']) for (const r of N[g]) {
  const k = g + '/' + r[0], f = F[k], m = M[k]; assert(f && m, 'thiếu nội dung ' + k);
  assert(f.lead && f.def && f.prompt, k + ': thiếu lead/def/prompt');
  for (const [a, b] of [['aka', 'aka'], ['phrases', 'phrases'], ['anatomy', 'anatomy'], ['code', 'code'], ['see', 'see']]) assert.strictEqual((f[a] || []).length, m[b], `${k}: ${a} ${(f[a] || []).length} ≠ gốc ${m[b]}`);
  for (const s of f.see || []) assert(F[s] && /^(web|macos)\//.test(s), k + ': see trỏ tới khoá không có: ' + s);
  for (const t of [f.lead.length > 30 ? f.lead : f.def, f.def, f.prompt]) assert(VI.test(t), k + ': chữ phải là tiếng Việt: ' + t.slice(0, 40));
  for (const a of f.anatomy || []) assert(a.n && a.d && VI.test(a.d), k + ': anatomy thiếu tên/mô tả');
  n++;
}
for (const g of ['styles', 'vs']) for (const r of N[g]) { const f = F[g + '/' + r[0]]; assert(f && f.title && (f.lead || (f.sections || []).length), 'thiếu trang ' + g + '/' + r[0]); }
for (const p of ['home', 'methodology', 'translate', 'sponsor', 'swift-vs-electron', 'appkit-vs-swiftui', 'styles', 'vs']) assert(F['page/' + p] && F['page/' + p].sections.length, 'thiếu page/' + p);
assert(!/@[a-z0-9_]{4,}/i.test(JSON.stringify(F.__proto__ ? F['page/sponsor'] : '').replace(/@argofowl|sponsor@namethatui\.com/g, '')), 'trang sponsor không được nhắc lại phản hồi của người khác');
require(path.join(__dirname, '..', 'namethatui', 'style-art.js'));
for (const r of N.styles) { assert(window.NT_ART[r[0]] && /class="sa sa-/.test(window.NT_ART[r[0]]), 'thiếu ảnh minh hoạ phong cách ' + r[0]); const cd = (F['styles/' + r[0]] || {}).card; assert(cd && cd.quote && cd.tags && cd.tags.length === 3, 'thiếu dữ liệu thẻ phong cách ' + r[0]); }
const DT = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'namethatui', 'demo-text.json'), 'utf8')), DS = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'ntu-gate', 'demo-strings.json'), 'utf8')).strings);
for (const [k, v] of Object.entries(DT)) { assert(DS.has(k), 'demo-text.json: khoá không nằm trong demo-strings.json: ' + k); assert(typeof v === 'string' && v.trim() && v !== k, 'demo-text.json: bản dịch rỗng hoặc trùng gốc: ' + k); }
console.log(`test-nt-content: ok · ${n} thuật ngữ · ${N.styles.length} style · ${N.vs.length} cặp vs · 8 trang`);
