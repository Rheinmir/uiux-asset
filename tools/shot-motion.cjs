// Chụp + soi lỗi sample motion bằng Playwright thật (headless, WebGL qua swiftshader).
//   NODE_PATH=$(npm root -g) node tools/shot-motion.cjs <slug> [<slug>…] [--wait=4000] [--check] [--base=http://127.0.0.1:8791]
// --check: chỉ soi lỗi, không ghi ảnh.
// Ghi motion/thumbs/<slug>.jpg (cả trang) + <slug>-stage.jpg (chỉ .m-stage, ảnh thẻ gallery). In console.error/pageerror/requestfailed; rc 1 nếu có lỗi.
const { chromium } = require('playwright'), path = require('path');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const slugs = a.filter((x) => !x.startsWith('--')), base = opt('base', 'http://127.0.0.1:8791'), wait = +opt('wait', 4000);
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--enable-unsafe-webgpu', '--enable-features=Vulkan,WebGPU'] });
  let bad = 0;
  for (const s of slugs) {
    const p = await b.newPage({ viewport: { width: 1280, height: 800 } }), errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text().slice(0, 160)));
    p.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 160)));
    p.on('requestfailed', (r) => errs.push('requestfailed: ' + r.url().slice(0, 100)));
    await p.goto(`${base}/motion/${s}.html`, { waitUntil: 'load', timeout: 60000 }).catch((e) => errs.push('goto: ' + e.message.slice(0, 100)));
    await p.waitForTimeout(wait);
    if (!opt('check', '') && !a.includes('--check')) await p.screenshot({ path: path.join(__dirname, '..', 'motion', 'thumbs', s + '.jpg'), type: 'jpeg', quality: 72 });
    const st = a.includes('--check') ? null : await p.$('.m-stage'); if (st) await st.screenshot({ path: path.join(__dirname, '..', 'motion', 'thumbs', s + '-stage.jpg'), type: 'jpeg', quality: 72 }).catch(() => {});   // ảnh thẻ gallery: chỉ sân khấu, không vỏ site
    console.log(errs.length ? 'LỖI ' : 'ok   ', s, errs.length ? '\n  ' + errs.join('\n  ') : '');
    if (errs.length) bad++;
    await p.close();
  }
  await b.close(); process.exit(bad ? 1 : 0);
})();
