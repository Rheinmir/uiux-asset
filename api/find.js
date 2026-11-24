// GET /api/find?q=<từ>[&k=8][&source=<nguồn>] — tìm component theo từ khoá (không dấu), KHÔNG trả code. ≤12 kết quả, < 3 KB.
const { INDEX, fold, cors } = require('./_agents');

const ROWS = INDEX.map((r) => ({ r, n: fold(r[1]) + ' ' + fold(r[0].split('/')[1]), t: fold(r[7].join(' ') + ' ' + r[3]), s: fold(r[2]) }));
const MAX = 3000;

function find(q, k = 8, source = '') {
  const toks = fold(q).split(/[^a-z0-9]+/).filter((t) => t.length > 1).slice(0, 8);
  k = Math.min(12, Math.max(1, Number(k) || 8));
  const src = fold(source);
  const hits = [];
  if (toks.length) for (const x of ROWS) {
    if (src && x.s !== src) continue;
    let s = 0, all = true;
    for (const t of toks) {
      const v = (x.n.includes(t) ? 4 : 0) + (x.t.includes(t) ? 2 : 0) + (x.s.includes(t) ? 1 : 0);
      if (!v) all = false;
      s += v;
    }
    if (s) hits.push({ x, s: s + (all ? 10 : 0) + (x.r[5].length ? 1 : 0) });
  }
  hits.sort((a, b) => b.s - a.s || a.x.r[4] - b.x.r[4]);
  // galaxy có 3.800 mục sẽ chiếm hết chỗ: không lọc nguồn thì mỗi nguồn tối đa ceil(k/3) chỗ, thiếu mới lấp tiếp
  const per = {}, cap = src ? k : Math.ceil(k / 3);
  const first = hits.filter(({ x }) => (per[x.r[2]] = (per[x.r[2]] || 0) + 1) <= cap).slice(0, k);
  const top = first.length < k ? first.concat(hits.filter((h) => !first.includes(h)).slice(0, k - first.length)) : first;
  const results = top.map(({ x: { r } }) => ({ id: r[0], name: r[1].slice(0, 60), source: r[2], kind: r[3], kb: r[4], parts: r[5], license: r[6].slice(0, 40) }));
  const out = { q, total: hits.length, results };
  while (JSON.stringify(out).length >= MAX) results.pop();
  return out;
}

module.exports = (req, res) => {
  cors(res);
  const q = String(req.query?.q || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  if (!q) {
    const sources = {};
    for (const r of INDEX) sources[r[2]] = (sources[r[2]] || 0) + 1;
    return res.json({ hint: 'GET /api/find?q=<words>[&k=8][&source=<src>] then /api/get?id=<id>. See /llms.txt', sources });
  }
  res.json(find(q, req.query.k, String(req.query.source || '')));
};
module.exports.find = find;
