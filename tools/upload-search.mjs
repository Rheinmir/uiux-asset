// Nạp search-index.json lên Upstash Search (index "uiux") và/hoặc đo chất lượng tìm.
//   node tools/upload-search.mjs            # nạp (upsert, xoá mục không còn trong file)
//   node tools/upload-search.mjs --eval     # nạp rồi đo 12 truy vấn Việt/Anh: đáp án đúng có nằm trong top-3?
// Env: UPSTASH_SEARCH_REST_URL + UPSTASH_SEARCH_REST_TOKEN (đọc .env.local nếu có — `vercel env pull .env.local`).
import { readFileSync, existsSync } from 'fs';
import { Search } from '@upstash/search';

const root = new URL('..', import.meta.url).pathname;
if (existsSync(root + '.env.local'))
  for (const l of readFileSync(root + '.env.local', 'utf8').split('\n')) {
    const m = l.match(/^([A-Z0-9_]+)="?(.*?)"?$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
const index = new Search({ url: process.env.UPSTASH_SEARCH_REST_URL, token: process.env.UPSTASH_SEARCH_REST_TOKEN }).index('uiux');
const items = JSON.parse(readFileSync(root + 'search-index.json', 'utf8'));

for (let i = 0; i < items.length; i += 50)
  await index.upsert(items.slice(i, i + 50).map((x) => ({ id: x.id, content: { title: x.title, text: x.text },
    metadata: { kind: x.kind, url: x.url, status: x.status } })));
console.log(`nạp ${items.length} mục vào index "uiux"`);

if (process.argv.includes('--eval')) {
  const CASES = [
    ['chữ hiện dần khi cuộn trang', ['se-gOqdKVo', 'se-vYYwjoa', 'se-mdyymOR', 'se-gOPMwvd', 'se-pojzxwZ', 'se-JjEZGme']],
    ['cuộn ngang', ['se-qBNvrRQ', 'se-LEVpqOO']],
    ['cuộn mượt', ['se-dPyBxoW', 'se-myybGaX', 'se-NWXmPdJ', 'se-PoEJvjE', 'se-qBOeVoz']],
    ['dòng thời gian lịch sử', ['se-ZEqvpWd', 'se-pYMLwg', 'se-MWYqeqN']],
    ['nút xoá tag', ['chip-5', 'chip-27', 'chip-21', 'chip-23']],
    ['chọn nhiều bộ lọc', ['chip-18', 'chip-8-12']],
    ['ảnh 3D xoay', ['se-gOKMvPZ', 'se-ExMXNrQ', 'se-QPBPJe', 'se-vENNWxx']],
    ['email recipients with avatar', ['chip-23', 'chip-6']],
    ['parallax', ['se-MWZKyom', 'se-qBOeVoz', 'se-mdVMOjr', 'se-oNjmQVd', 'se-PoEJvjE']],
    ['hiệu ứng vỡ vụn tan rã', ['se-mdVWRMv', 'se-zYqNEKp']],
    ['gallery ảnh WebGL', ['se-eYBLWOY', 'se-zYwBrOL', 'se-eYGyLrP', 'se-NPGrdgp', 'se-poboddv']],
    ['mục lục tự động', ['se-VYeewwr']],
  ];
  await new Promise((r) => setTimeout(r, 3000));   // chờ index nhận bản nạp
  // Cấu hình đang dùng ở api/search.js: tìm THEO NHÓM (mỗi kind top-3) — giao diện hiện 2 nhóm riêng.
  const OPT = JSON.parse(process.env.SEARCH_OPT || '{"semanticWeight":0.75,"inputEnrichment":true,"grouped":true}');
  const run = async (q) => OPT.grouped
    ? (await Promise.all(['scroll-effect', 'chip'].map((k) => index.search({ query: q, limit: 3, semanticWeight: OPT.semanticWeight,
        inputEnrichment: OPT.inputEnrichment, filter: `@metadata.kind = '${k}'` })))).flat()
    : index.search({ query: q, limit: 3, semanticWeight: OPT.semanticWeight, inputEnrichment: OPT.inputEnrichment });
  let pass = 0;
  for (const [q, want] of CASES) {
    const hits = await run(q);
    const ok = hits.some((h) => want.includes(h.id)); pass += ok;
    if (!process.env.QUIET) console.log(`${ok ? '✓' : '✗'} ${q.padEnd(32)} → ${hits.map((h) => `${h.id}(${h.score?.toFixed?.(2)})`).join(', ')}`);
  }
  console.log(`precision@3 ${JSON.stringify(OPT)}: ${pass}/${CASES.length}`);
  if (pass < Math.ceil(CASES.length * 0.75)) process.exit(1);   // dưới 75% → không dùng semantic làm mặc định
}
