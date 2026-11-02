// E2E thật cho /signal/: bảng % đủ 6 dòng, 5 iframe dựng + ảnh gốc/lệch tải được, bản live thật sự chuyển động (vòng cam đổi vị trí), console sạch.
//   NODE_PATH=$(npm root -g) node tools/e2e-signal.cjs [--base=http://127.0.0.1:8841] [--shot=/tmp/signal-page.png]
const { chromium } = require('playwright'), assert = require('assert');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const base = opt('base', 'http://127.0.0.1:8841'), shot = opt('shot', '');
(async () => {
  const b = await chromium.launch(), errs = [], p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  p.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 160)));
  p.on('response', (r) => r.status() >= 400 && !/stats|favicon|\/api\//.test(r.url()) && errs.push('http ' + r.status() + ' ' + r.url().slice(0, 100)));
  const step = async (n, fn) => { try { await fn(); console.log('ok  ', n); } catch (e) { errs.push(n + ': ' + e.message.split('\n').slice(0, 3).join(' | ')); console.log('LỖI', n); } };
  await p.goto(base + '/signal/', { waitUntil: 'load' }); await p.waitForSelector('#sum tbody tr:nth-child(6)');
  await step('bảng 5 màn + trung bình', async () => { assert.strictEqual(await p.locator('#sum tbody tr').count(), 6); const t = await p.locator('#sum tbody tr').first().innerText(); assert(/\d+,\d\d%/.test(t), t); });
  await step('ảnh gốc + ảnh lệch tải được', async () => { await p.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))); await p.waitForTimeout(1500); const bad = await p.evaluate(() => [...document.querySelectorAll('.sg-v img')].filter((i) => !i.naturalWidth).length); assert.strictEqual(bad, 0, bad + ' ảnh hỏng'); assert.strictEqual(await p.locator('.sg-v img').count(), 10); });
  await step('5 iframe dựng đúng khung 1179×2556', async () => {
    for (const v of await p.locator('.sg-scr .sg-v[data-src]').all()) await v.scrollIntoViewIfNeeded();
    await p.waitForTimeout(2500); assert.strictEqual(await p.locator('.sg-scr iframe').count(), 5);
    for (const fr of p.frames().filter((f) => /mock\.html\?s=/.test(f.url()))) { await fr.waitForFunction(() => document.documentElement.dataset.ready === '1'); assert.strictEqual(await fr.evaluate(() => document.documentElement.scrollWidth), 1179); assert((await fr.locator('.row').count()) === 20); }
  });
  await step('bản live chuyển động', async () => {
    await p.locator('.sg-live .sg-v').scrollIntoViewIfNeeded(); await p.waitForTimeout(2500);
    const fr = p.frames().find((f) => /live=1/.test(f.url())); assert(fr, 'không có iframe live'); await fr.waitForFunction(() => document.documentElement.dataset.ready === '1');
    const pos = () => fr.evaluate(() => { const r = document.getElementById('ring').getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), document.getElementById('nm').textContent]; });
    const p1 = await pos(); await p.waitForTimeout(5200); const p2 = await pos();
    assert(p1[2] !== p2[2] || p1[0] !== p2[0] || p1[1] !== p2[1], 'vòng cam đứng yên: ' + JSON.stringify([p1, p2]));
  });
  await step('điện thoại 390px không tràn ngang', async () => { await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500); assert(await p.evaluate(() => [...document.querySelectorAll('main > *:not(script)')].every((e) => e.getBoundingClientRect().right <= innerWidth + 1)), 'nội dung tràn ngang'); });
  if (shot) { await p.setViewportSize({ width: 1280, height: 900 }); await p.goto(base + '/signal/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500); await p.screenshot({ path: shot, fullPage: true }); }
  if (errs.length) { console.log('\nLỖI:\n' + errs.join('\n')); await b.close(); process.exit(1); }
  console.log('e2e-signal: ok'); await b.close();
})();
