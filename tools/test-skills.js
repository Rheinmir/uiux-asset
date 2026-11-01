// Kiểm skills/: index.json mới, mỗi skill đã chép có giấy phép cho phép phân phối lại + LICENSE + SOURCE.md + SKILL.md, mỗi skill không chép có lý do, trang liệt kê đủ.
//   node tools/test-skills.js
const assert = require('assert'), fs = require('fs'), path = require('path'), cp = require('child_process');
const R = (p) => path.join(__dirname, '..', p);
assert.strictEqual(cp.spawnSync('python3', [R('tools/build-skills.py'), '--check'], { encoding: 'utf8' }).status, 0, 'skills/index.json lệch: chạy python3 tools/build-skills.py');
const d = JSON.parse(fs.readFileSync(R('skills/index.json'), 'utf8'));
assert.strictEqual(d.total, 40, 'bài có 40 skill');
const OK = /^(MIT|Apache-2\.0|BSD-[23]-Clause|ISC|CC0-1\.0|Unlicense|MPL-2\.0)\b/;
const cats = {};
for (const x of d.skills) {
  cats[x.category] = (cats[x.category] || 0) + 1;
  assert(['chắc', 'gợi ý', 'không tìm thấy'].includes(x.confidence), x.slug + ': độ chắc lạ');
  if (x.vendored) {
    assert(OK.test(String(x.license)), x.slug + ': đã chép nhưng giấy phép không thuộc nhóm cho phép phân phối lại: ' + x.license);
    assert(x.repo && x.commit, x.slug + ': thiếu repo/commit');
    for (const f of ['LICENSE', 'SOURCE.md']) assert(fs.existsSync(R(`skills/${x.slug}/${f}`)), x.slug + ': thiếu ' + f);
    assert(x.skill_md.length > 0, x.slug + ': không có SKILL.md');
  } else assert(x.reason && x.reason.length > 20, x.slug + ': không chép nhưng thiếu lý do');
}
assert.deepStrictEqual(Object.values(cats), [8, 8, 8, 8, 8], 'mỗi nhóm 8 skill: ' + JSON.stringify(cats));
assert(fs.readFileSync(R('skills/index.html'), 'utf8').includes('index.json'), 'trang skills không nạp index.json');
console.log(`test-skills: ok ${d.total} mục · ${d.vendored} chép nguyên văn · ${d.total - d.vendored} chỉ liên kết`);
