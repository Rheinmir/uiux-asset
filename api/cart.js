// Giỏ mẫu UI/UX → "ui-kit" để người tải về hoặc dán link cho agent đọc.
//   POST /api/cart {name, items:[{k,id,v?}]}        → {id}   (lưu Redis 1 năm; k = galaxy | scroll | chip | kit)
//   GET  /api/cart?id=…[&format=html|md|json][&dl=1]  → trang render SẴN ở server (agent không chạy JS vẫn đọc được)
//   vercel.json: /c/<id> → html · /c/<id>.md → md
// Giỏ chỉ lưu khoá mục; tên, nguồn, code đều tra lại từ dữ liệu của site (không tin nội dung client gửi lên).
const crypto = require('crypto');
const { pipe, day } = require('./_redis');
const GALAXY = require('../galaxy/index.json');
const SCROLL = require('../scroll-effects/manifest.json');

const RAW = 'https://rheinmir.github.io/uiux-asset/';            // file gốc nguyên văn ở GitHub Pages
const SITE = 'https://uiux.giatbh.io.vn';
const TTL = 365 * 86400, MAX_ITEMS = 60, PER_CODE = 300e3, TOTAL_CODE = 3e6, PER_DAY = 40;
const G = new Map(GALAXY.map((it) => [it[0] + '/' + it[1], it]));
const S = new Map(SCROLL.filter((m) => m.file).map((m) => [m.file, m]));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const memo = new Map();                                             // cache 5 phút cho file lấy từ Pages
async function raw(path) {
  const hit = memo.get(path);
  if (hit && hit.t > Date.now() - 300e3) return hit.v;
  const r = await fetch(RAW + path, { signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  const v = await r.text(); memo.set(path, { t: Date.now(), v }); return v;
}

// Một mục giỏ → mô tả đầy đủ. Khoá lạ → null (bỏ).
async function resolve({ k, id, v }) {
  id = String(id || '');
  if (k === 'galaxy' && G.has(id)) {
    const [cat, file, author, slug, tags, tw] = G.get(id);
    return { k, id, title: `${cat} · ${slug}`, author, tags, tw: !!tw, path: `galaxy/${id}`, source: `https://uiverse.io/${author}/${slug}`,
      credit: `Uiverse.io · ${author} (MIT)`, preview: 'srcdoc' };
  }
  if (k === 'scroll' && S.has(id)) {
    const m = S.get(id);
    return { k, id, title: m.title, author: m.user, desc: m.desc, path: `scroll-effects/${id}`, source: m.url, credit: `CodePen · ${m.user} (MIT)`, preview: 'src',
      note: 'Trang đầy đủ; asset tương đối nằm ở scroll-effects/_assets/ cạnh file gốc.' };
  }
  if (k === 'chip' && /^f\d{1,2}$/.test(id)) {
    const page = await raw('components/chip.html');
    const m = page.match(new RegExp(`<section class="fig" id="${id}"><h3><span class="no">([^<]+)</span>([^<]+)</h3><p>([\\s\\S]*?)</p><div class="demo">([\\s\\S]*?)</div><details>`));
    if (!m) return null;
    return { k, id, title: `Chip · ${m[2]} (${m[1]})`, desc: m[3].replace(/<[^>]+>/g, ''), code: m[4], path: `components/chip.html#${id}`,
      source: `${SITE}/components/chip.html#${id}`, credit: 'setproduct.com/blog/chip-ui-design, tái tạo bằng code', preview: 'chip',
      note: 'HTML của hình; CSS dùng chung ở mục "CSS chung của trang chip" cuối tài liệu.' };
  }
  if (k === 'kit' && /^[a-z0-9-]{1,80}$/.test(id)) {
    const kits = JSON.parse(await raw('ui-kits/kits.json')), kit = kits.find((x) => x.id === id);
    if (!kit) return null;
    const ver = kit.versions.includes(Number(v)) ? Number(v) : kit.latest;
    return { k, id, v: ver, title: `UI kit · ${id} v${ver}`, path: `ui-kits/${id}/v${ver}/index.html`, source: kit.source || '', credit: 'Rút bằng /ui-kit-from-code', preview: 'src',
      note: 'Trang tham chiếu hệ thiết kế: token màu/chữ/khoảng cách, component, màn mẫu.' };
  }
  return null;
}

async function load(id) {
  const [s] = await pipe([['GET', `cart:${id}`]]);
  if (!s) return null;
  const cart = JSON.parse(s);
  let budget = TOTAL_CODE;
  cart.items = (await Promise.all(cart.items.map((x) => resolve(x).catch(() => null)))).filter(Boolean);
  for (const it of cart.items) {                                    // code nguyên văn, có trần dung lượng
    if (it.code == null) { try { it.code = await raw(it.path); } catch (e) { it.code = null; it.err = e.message; } }
    if (it.code && (it.code.length > PER_CODE || it.code.length > budget)) { it.cut = it.code.length; it.code = null; }
    if (it.code) budget -= it.code.length;
  }
  if (cart.items.some((it) => it.k === 'chip')) cart.chipCss = (await raw('components/chip.html').catch(() => '')).match(/<\/title><style>([\s\S]*?)<\/style>/)?.[1] || '';
  return cart;
}

const fence = (code) => '`'.repeat(Math.max(3, ...(code.match(/`+/g) || []).map((m) => m.length + 1)));
const lang = (it) => (it.k === 'chip' || it.k === 'galaxy' || /\.html$/.test(it.path) ? 'html' : '');
const AGENT = 'Đây là bộ mẫu UI/UX người dùng đã CHỌN TAY trên uiux.giatbh.io.vn để làm tham chiếu. Khi dựng giao diện: bám đúng các mẫu này (cấu trúc, '
  + 'màu, chữ, khoảng cách, chuyển động) thay vì tự sáng tác; dùng nguyên code khi có thể và giữ comment ghi công tác giả; mục nào là UI kit thì lấy token/component '
  + 'của kit đó làm hệ thiết kế chung. Không chắc ý người dùng ở điểm nào thì hỏi lại, đừng đoán.';

function md(c, id) {
  const L = [`# ${c.name} — ui-kit từ giỏ hàng uiux-asset`, '', `> ${AGENT}`, '',
    `- Link xem (người): ${SITE}/c/${id}`, `- Bản Markdown (agent): ${SITE}/c/${id}.md`, `- Tạo lúc: ${c.at} · ${c.items.length} mục`, ''];
  c.items.forEach((it, i) => {
    L.push(`## ${i + 1}. ${it.title}`, '', `- Loại: ${it.k}${it.tags?.length ? ` · tag: ${it.tags.join(', ')}` : ''}${it.tw ? ' · dùng Tailwind CSS (nạp https://cdn.tailwindcss.com)' : ''}`,
      `- Ghi công: ${it.credit}`, it.source ? `- Nguồn: ${it.source}` : '', `- File gốc: ${RAW}${it.path}`, it.desc ? `- Mô tả: ${it.desc}` : '', it.note ? `- Ghi chú: ${it.note}` : '');
    if (it.code) { const f = fence(it.code); L.push('', f + lang(it), it.code.trimEnd(), f); }
    else L.push('', `_(Code ${it.cut ? `dài ${Math.round(it.cut / 1024)}KB` : 'chưa tải được'} — đọc thẳng ở File gốc phía trên.)_`);
    L.push('');
  });
  if (c.chipCss) { const f = fence(c.chipCss); L.push('## CSS chung của trang chip', '', f + 'css', c.chipCss.trim(), f, ''); }
  return L.filter((x, i, a) => x !== '' || a[i - 1] !== '').join('\n');
}

function html(c, id) {
  const frame = (it) => {
    if (it.preview === 'src') return `<iframe loading="lazy" src="${esc(RAW + it.path)}" title="Xem trước ${esc(it.title)}"></iframe>`;
    if (!it.code) return '<div class="aw-ph">không có xem trước</div>';
    const head = it.tw ? '<script src="https://cdn.tailwindcss.com"></script>' : it.preview === 'chip' ? `<style>${c.chipCss}</style>` : '';
    const doc = `<!doctype html><html><head><meta charset="utf-8">${head}<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;background:#e8e8e8;font-family:system-ui,sans-serif}</style></head><body>${it.code}</body></html>`;
    return `<iframe loading="lazy" sandbox="allow-scripts" srcdoc="${esc(doc)}" title="Xem trước ${esc(it.title)}"></iframe>`;
  };
  const items = c.items.map((it, i) => `<article class="ck-item" id="m${i + 1}"><div class="ck-prev">${frame(it)}</div><div class="ck-body">
    <h2 class="ck-t">${i + 1}. ${esc(it.title)}</h2><p class="ck-meta"><span class="aw-tag aw-tag--medium">${esc(it.k)}</span>${it.tw ? '<span class="aw-tag aw-tag--medium aw-tag--dev">Tailwind</span>' : ''} ${esc(it.credit)}</p>
    ${it.desc ? `<p class="aw-desc" style="-webkit-line-clamp:4">${esc(it.desc)}</p>` : ''}${it.note ? `<p class="ck-note">${esc(it.note)}</p>` : ''}
    <p class="ck-links">${it.source ? `<a class="aw-lu" href="${esc(it.source)}" target="_blank" rel="noopener">Nguồn</a>` : ''}<a class="aw-lu" href="${esc(RAW + it.path)}" target="_blank" rel="noopener">File gốc</a></p>
    ${it.code ? `<details><summary>Code nguyên văn (${Math.max(1, Math.round(it.code.length / 1024))}KB)</summary><pre><code>${esc(it.code)}</code></pre></details>` : `<p class="ck-note">Code ${it.cut ? `dài ${Math.round(it.cut / 1024)}KB` : 'chưa tải được'} — mở File gốc.</p>`}
  </div></article>`).join('\n');
  const data = JSON.stringify({ name: c.name, at: c.at, items: c.items.map(({ code, ...m }) => ({ ...m, raw: RAW + m.path })) }).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(c.name)} — ui-kit uiux-asset</title><meta name="description" content="${esc(AGENT)}">
<link rel="alternate" type="text/markdown" href="${SITE}/c/${id}.md">
<script>try{document.documentElement.dataset.theme=localStorage.getItem('ovs-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}</script>
<link rel="stylesheet" href="${SITE}/aw.css"><style>
.ck-item{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:24px;padding:24px 0;border-bottom:1px solid var(--aw-border-gray)}
.ck-prev{aspect-ratio:16/12;border-radius:var(--aw-rounded-normal);overflow:hidden;background:var(--aw-img)}.ck-prev iframe{width:100%;height:100%;border:0;display:block}
.ck-body{min-width:0;display:flex;flex-direction:column;gap:8px}.ck-t{margin:0;font:600 22px/28px var(--aw-font)}.ck-meta,.ck-links{margin:0;display:flex;gap:8px 14px;flex-wrap:wrap;align-items:center}
.ck-note{margin:0;font-size:13px;line-height:20px;color:var(--aw-ink2)}details summary{cursor:pointer;font-weight:600}
pre{max-height:420px;overflow:auto;padding:12px;border-radius:var(--aw-rounded-normal);background:var(--aw-bg-3rd);font-size:12px;line-height:18px}
.ck-agent{margin:0;padding:16px 20px;border-radius:var(--aw-rounded-normal);background:var(--aw-bg-white);border:1px solid var(--aw-border-gray);font-size:15px;line-height:24px}
@media (max-width:800px){.ck-item{grid-template-columns:minmax(0,1fr)}}
</style></head><body><main class="aw-wrap" style="padding-bottom:64px">
<p class="aw-sotd__sub" style="margin:24px 0 0;justify-content:flex-start"><a class="aw-brand" href="${SITE}/" style="margin:0">UIUX.</a><span>ui-kit từ giỏ hàng</span><span class="aw-tag aw-tag--medium">${esc(c.at)}</span><span class="aw-tag aw-tag--medium">${c.items.length} mục</span></p>
<h1 class="aw-h1" style="--aw-h1:clamp(32px,5vw,64px);text-align:left">${esc(c.name)}</h1>
<p class="ck-agent"><b>Cho agent:</b> ${esc(AGENT)} Bản Markdown đầy đủ code: <a class="aw-lu" href="${SITE}/c/${id}.md">${SITE}/c/${id}.md</a></p>
<p class="ck-links"><a class="aw-btn aw-btn--small" href="${SITE}/api/cart?id=${id}&amp;format=html&amp;dl=1">Tải HTML</a><a class="aw-btn aw-btn--small aw-btn--outline" href="${SITE}/api/cart?id=${id}&amp;format=md&amp;dl=1">Tải Markdown</a></p>
${items}
${c.chipCss ? `<details><summary>CSS chung của trang chip</summary><pre><code>${esc(c.chipCss)}</code></pre></details>` : ''}
</main><script type="application/json" id="ui-kit-cart">${data}</script></body></html>`;
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let b = req.body || {};
      if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
      const seen = new Set();
      const items = (Array.isArray(b.items) ? b.items : []).slice(0, MAX_ITEMS)
        .map((x) => ({ k: String(x?.k || ''), id: String(x?.id || '').slice(0, 200), ...(x?.v ? { v: Number(x.v) || undefined } : {}) }))
        .filter((x) => /^(galaxy|scroll|chip|kit)$/.test(x.k) && !seen.has(x.k + x.id) && seen.add(x.k + x.id));
      if (!items.length) return res.status(400).json({ error: 'giỏ trống' });
      const who = crypto.createHash('sha256').update((req.headers['x-forwarded-for'] || '').split(',')[0] + 'cart').digest('hex').slice(0, 16);
      const [n] = await pipe([['INCR', `cart:rl:${who}:${day()}`], ['EXPIRE', `cart:rl:${who}:${day()}`, 86400]]);
      if (n > PER_DAY) return res.status(429).json({ error: `quá ${PER_DAY} lần xuất trong ngày` });
      const id = crypto.randomBytes(6).toString('base64url');
      const name = String(b.name || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 80) || `ui-kit ${day()}`;
      await pipe([['SET', `cart:${id}`, JSON.stringify({ name, at: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC', items }), 'EX', TTL]]);
      res.setHeader('Cache-Control', 'no-store');
      return res.json({ id, url: `${SITE}/c/${id}`, md: `${SITE}/c/${id}.md` });
    }
    const q = req.query || {}, id = String(q.id || '');
    if (!/^[\w-]{6,16}$/.test(id)) return res.status(400).send('thiếu id');
    const c = await load(id);
    if (!c) return res.status(404).send('Không thấy giỏ này (sai link hoặc đã quá 1 năm).');
    const fmt = q.format === 'md' ? 'md' : q.format === 'json' ? 'json' : 'html';
    res.setHeader('Cache-Control', 'public, max-age=300');
    if (q.dl) res.setHeader('Content-Disposition', `attachment; filename="ui-kit-${id}.${fmt === 'md' ? 'md' : fmt}"`);
    if (fmt === 'json') return res.json({ name: c.name, at: c.at, items: c.items.map(({ code, ...m }) => ({ ...m, raw: RAW + m.path })) });
    res.setHeader('Content-Type', fmt === 'md' ? 'text/markdown; charset=utf-8' : 'text/html; charset=utf-8');
    return res.send(fmt === 'md' ? md(c, id) : html(c, id));
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
