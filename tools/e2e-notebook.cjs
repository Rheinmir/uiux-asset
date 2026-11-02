// E2E thật cho /notebook/ bằng Playwright: bấm đủ 4 nhóm chức năng, kiểm dữ liệu còn sau khi tải lại, lỗi console = 0.
//   NODE_PATH=$(npm root -g) node tools/e2e-notebook.cjs [--base=http://127.0.0.1:8791] [--frames=/tmp/dir]
// --frames: ghi ảnh từng bước (f00.png…) để ghép GIF. rc 1 nếu có bước hỏng.
const { chromium } = require('playwright'), assert = require('assert'), fs = require('fs'), path = require('path');
const a = process.argv.slice(2), opt = (k, d) => (a.find((x) => x.startsWith('--' + k + '=')) || '').split('=')[1] || d;
const base = opt('base', 'http://127.0.0.1:8791'), frames = opt('frames', '');
(async () => {
  const b = await chromium.launch(), errs = [];
  const p = await b.newPage({ viewport: { width: 1180, height: 900 } });
  p.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errs.push('console: ' + m.text().slice(0, 160)));
  p.on('response', (r) => r.status() >= 400 && !/stats|favicon|\/api\//.test(r.url()) && errs.push('http ' + r.status() + ' ' + r.url().slice(0, 100)));
  p.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 160)));
  let n = 0; const shot = async (hold = 1) => { if (frames) for (let i = 0; i < hold; i++) await p.locator('#nb').screenshot({ path: path.join(frames, `f${String(n++).padStart(2, '0')}.png`) }); };
  if (frames) fs.mkdirSync(frames, { recursive: true });
  await p.goto(base + '/notebook/', { waitUntil: 'load' });
  await p.evaluate(() => localStorage.removeItem('nw-v1')); await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(800);
  await shot(3);
  const step = async (name, fn) => { try { await fn(); console.log('ok  ', name); } catch (e) { errs.push(name + ': ' + e.message.split('\n').slice(0, 4).join(' | ')); console.log('LỖI', name, '\n  ', e.message.split('\n').slice(0, 4).join(' | ')); } };

  await step('bìa có 4 lối vào', async () => { assert.strictEqual(await p.locator('.nb-idx button').count(), 4); });
  await step('weekly: thêm 2 việc, tick 1, qua tuần sau', async () => {
    await p.click('.nb-idx button[data-go=weekly]'); await p.waitForTimeout(700);
    await p.locator('.day.today input[data-add]').fill('Họp bàn thiết kế sổ tay'); await p.keyboard.press('Enter');
    await p.locator('.day.today input[data-add]').fill('Gửi mẫu bìa kraft'); await p.keyboard.press('Enter'); await shot(2);
    await p.locator('.day.today .chk').first().click();
    assert.strictEqual(await p.locator('.day.today li.done').count(), 1);
    await p.fill('.nb-notes', 'nhớ mua mực xanh đen'); await shot(3);
    await p.click('[data-act=wk][data-n="1"]'); await p.waitForTimeout(700);
    assert.strictEqual(await p.locator('.day.today').count(), 0, 'tuần sau không có ngày hôm nay'); await shot(2);
    await p.click('[data-act=wk][data-n="0"]'); await p.waitForTimeout(700);
    assert.strictEqual(await p.locator('.day.today li').count(), 3);
  });
  await step('to-do: thêm 3 việc, tick sang Đã xong, làm lại, xoá hết', async () => {
    await p.click('button[data-go=todo]'); await p.waitForTimeout(700);
    await p.fill('[data-top="0"]', 'Chốt bìa kraft');
    for (const t of ['Đặt in 200 cuốn', 'Chọn giấy kem 100gsm', 'Viết hướng dẫn dùng']) { await p.fill('input[data-add=t]', t); await p.keyboard.press('Enter'); }
    await shot(3);
    assert.strictEqual(await p.locator('.nb-page.l li:has(.hw) .chk[data-kind=t]').count(), 3);
    await p.locator('.chk[data-kind=t]').first().click(); await p.locator('.chk[data-kind=t]').first().click(); await shot(3);
    assert.strictEqual(await p.locator('.nb-page.r li.done').count(), 2);
    await p.locator('.nb-page.r .chk[data-act=undo]').first().click();
    assert.strictEqual(await p.locator('.nb-page.r li.done').count(), 1);
    await p.click('[data-act=clr]'); assert.strictEqual(await p.locator('.nb-page.r li.done').count(), 0);
  });
  await step('hourly: ghi 2 giờ, giờ hiện tại highlight, đổi ngày', async () => {
    await p.click('button[data-go=hourly]'); await p.waitForTimeout(700);
    await p.fill('[data-hour="9"]', 'Cà phê và rà bản thảo'); await p.fill('[data-hour="14"]', 'Gặp xưởng in'); await p.fill('[data-htop="0"]', 'Ký hợp đồng in'); await shot(3);
    assert(await p.locator('li.now').count() <= 1);
    await p.click('[data-act=hd][data-n="1"]'); await p.waitForTimeout(700);
    assert.strictEqual(await p.inputValue('[data-hour="9"]'), '', 'ngày mai trống'); await shot(2);
    await p.click('[data-act=hd][data-n="0"]'); await p.waitForTimeout(700);
    assert.strictEqual(await p.inputValue('[data-hour="9"]'), 'Cà phê và rà bản thảo');
  });
  await step('dotgrid: vẽ tay, thước kẻ, tẩy, hoàn tác', async () => {
    await p.click('button[data-go=dotgrid]'); await p.waitForTimeout(800);
    const cv = p.locator('.dg[data-side=r] canvas'), S = () => p.evaluate(() => JSON.parse(localStorage.getItem('nw-v1')).dots.r.length);
    const drag = async (pts) => { await cv.evaluate((el) => el.scrollIntoView({ block: 'center' })); const bb = await cv.boundingBox();   // đo lại mỗi lần: cuộn trang làm đổi toạ độ
      await p.mouse.move(bb.x + pts[0][0], bb.y + pts[0][1]); await p.mouse.down(); for (const [x, y] of pts.slice(1)) await p.mouse.move(bb.x + x, bb.y + y, { steps: 6 }); await p.mouse.up(); };
    await drag([[60, 80], [120, 40], [200, 110], [260, 60], [330, 130]]); await shot(2);
    assert.strictEqual(await S(), 1);
    await p.click('[data-pen="#b5473a"]'); await p.click('[data-mode=ruler]');
    await drag([[60, 200], [300, 205]]); await drag([[300, 205], [300, 340]]); await drag([[300, 340], [60, 340]]); await drag([[60, 340], [60, 200]]); await shot(3);
    assert.strictEqual(await S(), 5);
    await p.click('[data-mode=erase]'); await drag([[160, 195], [160, 215]]); assert.strictEqual(await S(), 4, 'tẩy xoá đúng 1 nét');
    await p.click('[data-act=undoDot]'); assert.strictEqual(await S(), 3, 'hoàn tác'); await shot(3);
  });
  await step('dấu tiếng Việt: font viết tay + tiêu đề nạp subset vietnamese', async () => {
    await p.click('button[data-go=weekly]'); await p.waitForTimeout(500);
    const T = 'ứ ừ ữ ự ở ỡ ợ ằ ẵ ặ ề ễ ệ'; await p.locator('.day.today input[data-add]').fill(T); await p.keyboard.press('Enter');
    const r = await p.evaluate(async () => { await document.fonts.ready; const vi = (fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, '') === fam && f.status === 'loaded' && /1EA0-1EF9/i.test(f.unicodeRange)); return { hand: vi('Patrick Hand'), title: vi('Oswald'), shown: [...document.querySelectorAll('.day.today span.hw')].pop().textContent }; });
    assert(r.hand, 'font viết tay chưa nạp subset vietnamese'); assert(r.title, 'font tiêu đề chưa nạp subset vietnamese'); assert.strictEqual(r.shown, T); await shot(3);
  });
  await step('tải lại: dữ liệu còn', async () => {
    await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(700);
    assert.strictEqual(await p.evaluate(() => JSON.parse(localStorage.getItem('nw-v1')).dots.r.length), 3);
    await p.click('button[data-go=weekly]'); await p.waitForTimeout(700);
    assert.strictEqual(await p.inputValue('.nb-notes'), 'nhớ mua mực xanh đen'); await shot(3);
  });
  await step('điện thoại 390px: không tràn ngang', async () => {
    await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(500);
    assert(await p.evaluate(() => [...document.querySelectorAll('main > *:not(script)')].every((e) => e.getBoundingClientRect().right <= innerWidth + 1)), 'nội dung tràn ngang')   // thanh nav chung của site có thể tràn khi thêm mục: lỗi chung, không thuộc trang này;
  });
  if (errs.length) { console.log('\nLỖI:\n' + errs.join('\n')); await b.close(); process.exit(1); }
  console.log('e2e-notebook: ok'); await b.close();
})();
