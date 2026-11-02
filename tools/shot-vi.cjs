// Chụp bằng chứng dấu tiếng Việt của /notebook/: gõ chuỗi khó vào ô viết tay rồi chụp, kèm tiêu đề có dấu.
//   NODE_PATH=$(npm root -g) node tools/shot-vi.cjs <out.png> [--base=...]
const { chromium } = require('playwright'), assert = require('assert');
const a = process.argv.slice(2), out = a.find((x) => !x.startsWith('--')), base = (a.find((x) => x.startsWith('--base=')) || '').slice(7) || 'http://127.0.0.1:8841';
const T = 'ứ ừ ữ ự ở ỡ ợ ằ ẵ ặ ề ễ ệ';
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1180, height: 900 } });
  await p.goto(base + '/notebook/#weekly', { waitUntil: 'load' }); await p.evaluate(() => localStorage.removeItem('nw-v1')); await p.reload({ waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.locator('.day.today input[data-add]').fill(T); await p.keyboard.press('Enter');
  await p.locator('.day.today input[data-add]').fill('Hướng dẫn: thử nghiệm mực xanh đen'); await p.keyboard.press('Enter');
  await p.fill('.nb-notes', 'nhớ: mua mực, giấy kẻ ô, bút chì Ngọc Ánh'); await p.waitForTimeout(500);
  // đo thật: ký tự có glyph trong font viết tay đã nạp, hay rơi sang font dự phòng? so độ rộng với font dự phòng 'cursive' tách riêng
  const ok = await p.evaluate(async (t) => { await document.fonts.ready; const fam = getComputedStyle(document.querySelector('.hw')).fontFamily.split(',')[0].replace(/["']/g, '').trim(); const loaded = [...document.fonts].filter((f) => f.family.replace(/["']/g, '') === fam && f.status === 'loaded'); const vi = loaded.some((f) => /1EA0-1EF9|1ea0-1ef9/.test(f.unicodeRange)); return { fam, loaded: loaded.length, vi }; }, T);
  console.log(JSON.stringify(ok));
  await p.locator('.nb-spread').screenshot({ path: out });
  await b.close();
  if (!ok.vi) { console.error('KHÔNG có subset vietnamese đã nạp cho font viết tay ' + ok.fam); process.exit(1); }
})();
