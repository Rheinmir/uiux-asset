// GET /api/search?q=…[&log=1] — tìm theo NGHĨA (Upstash Search, gói free) tách 2 nhóm: hiệu ứng cuộn · mẫu chip.
// Đo 29/09 (tools/upload-search.mjs --eval): tìm gộp 8–9/12, tìm THEO NHÓM 12/12 — truy vấn tiếng Việt bị chip (mô tả Việt)
// hút hết chỗ nếu gộp. Semantic lỗi / quá 2,5s / chạm trần tháng → rơi về tìm từ khoá không dấu trên search-index.json.
// Tiết kiệm hạn mức free (20K truy vấn/tháng, mỗi lần tìm = 2 truy vấn): cache 1 ngày trong Redis, trần 18K/tháng.
const { Search } = require('@upstash/search');
const INDEX = require('../search-index.json');
const { pipe } = require('./_redis');

const KINDS = ['scroll-effect', 'chip'];
const MONTH_CAP = 18000;
const PER_GROUP = 5;

const fold = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const FOLDED = INDEX.map((x) => ({ x, t: fold(x.title), b: fold(x.text) }));
const pick = (x, score) => ({ id: x.id, title: x.title, kind: x.kind, url: x.url, status: x.status, score: Math.round(score * 100) / 100 });

function keyword(q) {
  const toks = fold(q).split(/[^a-z0-9]+/).filter((t) => t.length > 1);
  const groups = Object.fromEntries(KINDS.map((k) => [k, []]));
  if (!toks.length) return groups;
  for (const { x, t, b } of FOLDED) {
    const s = toks.reduce((a, k) => a + (t.includes(k) ? 3 : 0) + (b.includes(k) ? 1 : 0), 0);
    if (s) groups[x.kind].push(pick(x, s / (toks.length * 4)));
  }
  for (const k of KINDS) groups[k] = groups[k].sort((a, b) => b.score - a.score).slice(0, PER_GROUP);
  return groups;
}

let index;
async function semantic(q) {
  index = index || new Search({ url: process.env.UPSTASH_SEARCH_REST_URL,
    token: process.env.UPSTASH_SEARCH_REST_READONLY_TOKEN || process.env.UPSTASH_SEARCH_REST_TOKEN }).index('uiux');
  const byId = new Map(INDEX.map((x) => [x.id, x]));
  const res = await Promise.all(KINDS.map((k) => index.search({ query: q, limit: PER_GROUP, filter: `@metadata.kind = '${k}'` })));
  return Object.fromEntries(KINDS.map((k, i) => [k, res[i].filter((h) => byId.has(h.id)).map((h) => pick(byId.get(h.id), h.score || 0))]));
}

const timeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

module.exports = async (req, res) => {
  const q = String(req.query?.q || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const key = fold(q);
  res.setHeader('Cache-Control', 'no-store');
  if (key.length < 2) return res.json({ mode: 'empty', q, groups: Object.fromEntries(KINDS.map((k) => [k, []])) });
  const month = new Date().toISOString().slice(0, 7);
  let mode = 'semantic', groups, cached = null, used = 0;
  try {
    [cached, used] = await pipe([['GET', `s:qc:${key}`], ['GET', `s:sq:${month}`]]);
  } catch { /* Redis lỗi: vẫn tìm được, chỉ mất cache + trần tháng */ }
  if (cached) groups = JSON.parse(cached);
  else if (Number(used || 0) >= MONTH_CAP) { mode = 'keyword'; groups = keyword(q); }
  else {
    try {
      groups = await timeout(semantic(q), 2500);
      await pipe([['SET', `s:qc:${key}`, JSON.stringify(groups), 'EX', 86400], ['INCRBY', `s:sq:${month}`, KINDS.length],
        ['EXPIRE', `s:sq:${month}`, 40 * 86400]]).catch(() => {});
    } catch { mode = 'keyword'; groups = keyword(q); }
  }
  if (req.query?.log) await pipe([['ZINCRBY', 's:queries', 1, q.toLowerCase()]]).catch(() => {});
  res.json({ mode, q, groups });
};

module.exports.keyword = keyword;
