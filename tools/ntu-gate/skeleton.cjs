// Cổng phần xương: chèn namethatui/skeleton/<slug>.html vào đúng ô demo của trang /namethatui/ (cùng .mat), chụp, so với ảnh namethatui.com
// (ref/ do refmats.cjs chụp) KỂ CẢ CHỮ. Điểm = 100 − % điểm ảnh lệch (tổng chênh RGB > 96), giống matscore.py. Đạt khi = 100.
//   (cd <thư mục có ref/> && NODE_PATH=$(npm root -g) node <repo>/tools/ntu-gate/skeleton.cjs [slug…|all])   # cần http.server 8793 ở gốc repo
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..', '..'); const SK = path.join(ROOT, 'namethatui', 'skeleton');
const meta = JSON.parse(fs.readFileSync('ref/meta.json'));
const have = Object.keys(meta).filter((k) => fs.existsSync(path.join(SK, k + '.html')));
const want = process.argv.slice(2).filter((a) => a !== 'all'); const keys = want.length ? want : have;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await p.goto('http://127.0.0.1:8793/namethatui/', { waitUntil: 'load' }); await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  // Khung chuẩn = .demo-mat của namethatui.com (đo 03/11/2026): nền, chấm 16px, viền, bo 14px, Geist có ss09 + antialiased, đủ 400–700.
  // Phông y hệt namethatui.com: @fontsource/geist-sans@5.2.5 (so sha1 tệp 400 = 04bff5c1…, trùng byte), không phải Geist của Google Fonts (lệch số đo dọc 1px).
  for (const w of [400, 500, 600, 700]) await p.addStyleTag({ url: `https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.2.5/${w}.css` });
  for (const w of [400, 500, 600]) await p.addStyleTag({ url: `https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.2.5/${w}.css` });
  await p.addStyleTag({ content: '.mat.sk-ref{background:rgb(25,27,31) radial-gradient(circle,oklab(0.648807 -0.00191092 -0.0144504/.1) 1px,rgba(0,0,0,0) 1px) 0 0/16px 16px;border:1px solid rgba(255,255,255,.08);border-radius:14px;-webkit-font-smoothing:antialiased;font-feature-settings:"ss09"}' });
  await p.evaluate(async () => { for (const w of [400, 500, 600, 700]) await document.fonts.load(w + ' 12px "Geist Sans"'); for (const w of [400, 500, 600]) await document.fonts.load(w + ' 12px "Geist Mono"').catch(() => {}); });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200); fs.mkdirSync('sk', { recursive: true });
  const res = {};
  for (const key of keys) {
    const html = fs.readFileSync(path.join(SK, key + '.html'), 'utf8');
    const ok = await p.evaluate(([key, html]) => { const m = document.querySelector(`a.card[href$="#/${key}"] .mat, a.card[href="/namethatui/${key}"] .mat`); if (!m) return false; m.classList.add('qm', 'sk-ref'); m.innerHTML = html; return true; }, [key, html]);
    if (!ok) { res[key] = null; continue; }
    const el = await p.$(`a.card[href$="#/${key}"] .mat, a.card[href="/namethatui/${key}"] .mat`); await el.scrollIntoViewIfNeeded(); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await el.screenshot({ path: 'sk/' + key.replace('/', '_') + '.png' }); res[key] = 'sk/' + key.replace('/', '_') + '.png';
  }
  await b.close(); fs.writeFileSync('sk/shots.json', JSON.stringify(res));
  console.log(JSON.stringify(res));
})();
