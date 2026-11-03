// Chụp topo/mock.html?shot=1 bằng Playwright đúng khung ảnh gốc 702×950, lấy khung chữ (để che), rồi gọi topo-diff.py chấm %.
//   NODE_PATH=$(npm root -g) node tools/topo-diff.cjs [--base=http://127.0.0.1:8842] [--out=/tmp/topo-shots]
const { chromium } = require('playwright'), cp = require('child_process'), fs = require('fs'), path = require('path');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const base = opt('base', 'http://127.0.0.1:8842'), out = opt('out', '/tmp/topo-shots');
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 702, height: 950 }, deviceScaleFactor: 1 });
  await p.goto(`${base}/topo/mock.html?shot=1`, { waitUntil: 'load' });
  await p.waitForFunction(() => document.documentElement.dataset.ready === '1'); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(out, 'mock.png') });
  const rects = await p.evaluate(() => {                         // khung từng dòng chữ thật trên trang (không tính SVG)
    const r = [], w = document.createTreeWalker(document.getElementById('art'), NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) { if (!n.textContent.trim()) continue; const g = document.createRange(); g.selectNodeContents(n);
      for (const q of g.getClientRects()) r.push([q.left, q.top, q.right, q.bottom].map(Math.round)); }
    return r;
  });
  fs.writeFileSync(path.join(out, 'text.json'), JSON.stringify(rects));
  await b.close();
  const r = cp.spawnSync('python3', [path.join(__dirname, 'topo-diff.py'), out], { stdio: 'inherit' }); process.exit(r.status);
})();
