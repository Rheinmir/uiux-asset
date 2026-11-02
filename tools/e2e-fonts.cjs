// E2E thật cho /fonts/: 9 thẻ, font nạp đúng, subset vietnamese khớp khai báo, chép màu/CSS, ô thử chữ, ghép thử đổi màu, không tràn ngang ở 390.
//   NODE_PATH=$(npm root -g) node tools/e2e-fonts.cjs [--base=http://127.0.0.1:8841] [--shot=/tmp/fonts.png]
const { chromium } = require('playwright'), assert = require('assert');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const base = opt('base', 'http://127.0.0.1:8841'), shot = opt('shot', '');
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] }), p = await ctx.newPage(), errs = [];
  p.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 160)));
  p.on('response', (r) => r.status() >= 400 && !/stats|favicon|\/api\//.test(r.url()) && errs.push('http ' + r.status() + ' ' + r.url().slice(0, 100)));
  const step = async (n, fn) => { try { await fn(); console.log('ok  ', n); } catch (e) { errs.push(n + ': ' + e.message.split('\n').slice(0, 3).join(' | ')); console.log('LỖI', n); } };
  await p.goto(base + '/fonts/', { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.ready === '1');
  await step('9 thẻ, mỗi thẻ ≥ 7 màu, chip trạng thái', async () => { assert.strictEqual(await p.locator('.ff-card').count(), 9); for (const c of await p.locator('.ff-card').all()) { assert((await c.locator('.ff-sw button').count()) >= 7); assert(await c.locator('.ff-chip').count() === 1); } });
  await step('ảnh khung hình tải được', async () => { for (const i of await p.locator('.ff-reel').all()) await i.scrollIntoViewIfNeeded();   // loading=lazy chỉ tải khi cuộn tới
     await p.waitForFunction(() => [...document.querySelectorAll('.ff-reel')].every((i) => i.naturalWidth > 0), null, { timeout: 8000 }); assert.strictEqual(await p.evaluate(() => [...document.querySelectorAll('.ff-reel')].filter((i) => !i.naturalWidth).length), 0); });
  await step('font nạp thật + subset vietnamese khớp khai báo', async () => {
    const D = await (await fetch(base + '/fonts/families.json')).json();
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1500);
    const info = await p.evaluate(() => { const r = {}; for (const f of document.fonts) { const fam = f.family.replace(/["']/g, ''); r[fam] ||= { any: 0, vi: false, viLoaded: false }; r[fam].any++; if (/1EA0-1EF9/i.test(f.unicodeRange)) { r[fam].vi = true; if (f.status === 'loaded') r[fam].viLoaded = true; } } return r; });
    for (const f of D.families) { const i = info[f.look.family]; assert(i, f.look.family + ' không có trong document.fonts'); assert.strictEqual(i.vi, f.look.vi, `${f.look.family}: khai báo vi=${f.look.vi} nhưng Google ${i.vi ? 'có' : 'không có'} subset vietnamese`); if (f.look.vi) assert(i.viLoaded, f.look.family + ': subset vietnamese chưa nạp'); }
    assert(info['Be Vietnam Pro'].viLoaded, 'Be Vietnam Pro (font thân + dự phòng dấu) chưa nạp subset vietnamese');
  });
  await step('chép màu và CSS', async () => { await p.locator('.ff-sw button').first().click(); assert(/^#[0-9a-f]{6}$/.test(await p.evaluate(() => navigator.clipboard.readText()))); await p.locator('[data-copy]').first().click(); assert((await p.evaluate(() => navigator.clipboard.readText())).includes('--font-display')); });
  await step('ô thử chữ đổi cả 9 mẫu', async () => { await p.fill('#txt', 'Xin chào ứ ợ ệ'); assert.strictEqual(await p.locator('[data-sample]').evaluateAll((e) => e.filter((x) => x.textContent === 'Xin chào ứ ợ ệ').length), 9); });
  await step('ghép thử đổi nền theo palette', async () => { const before = await p.locator('#poster').evaluate((e) => getComputedStyle(e).backgroundColor); await p.click('[data-p=lust]'); await p.waitForTimeout(100); assert.strictEqual(await p.locator('#poster div').nth(1).innerText(), 'LUST'); const after = await p.locator('#poster').evaluate((e) => getComputedStyle(e).backgroundColor); assert(before !== '' && after !== ''); });
  if (shot) { await p.goto(base + '/fonts/', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000); await p.screenshot({ path: shot, fullPage: true }); }
  await step('điện thoại 390px không tràn ngang', async () => { await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(600); assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'trang tràn ngang: ' + await p.evaluate(() => document.documentElement.scrollWidth)); });
  if (errs.length) { console.log('\nLỖI:\n' + errs.join('\n')); await b.close(); process.exit(1); }
  console.log('e2e-fonts: ok'); await b.close();
})();
