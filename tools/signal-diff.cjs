// Chụp mock signal/mock.html?s=1..5 bằng Playwright thật, đúng khung ảnh gốc 1179×2556, rồi gọi signal-diff.py chấm %.
//   NODE_PATH=$(npm root -g) node tools/signal-diff.cjs [--base=http://127.0.0.1:8841] [--out=/tmp/signal-shots]
const { chromium } = require('playwright'), cp = require('child_process'), fs = require('fs'), path = require('path');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const base = opt('base', 'http://127.0.0.1:8841'), out = opt('out', '/tmp/signal-shots');
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1179, height: 2556 }, deviceScaleFactor: 1 });
  for (let s = 1; s <= 5; s++) {
    await p.goto(`${base}/signal/mock.html?s=${s}`, { waitUntil: 'load' });
    await p.waitForFunction(() => document.documentElement.dataset.ready === '1'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(out, `mock-${s}.png`) });
  }
  await b.close();
  const r = cp.spawnSync('python3', [path.join(__dirname, 'signal-diff.py'), out], { stdio: 'inherit' }); process.exit(r.status);
})();
