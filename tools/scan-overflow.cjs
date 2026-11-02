// Quét các trang ở 390px: in trang nào tràn ngang + phần tử gây ra (bỏ qua phần tử nằm trong vùng cuộn/cắt).
//   NODE_PATH=$(npm root -g) node tools/scan-overflow.cjs <gốc/> '["", "motion/", ...]'
const { chromium } = require('playwright'), fs = require('fs');
const base = process.argv[2], pages = JSON.parse(process.argv[3]);
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const bad = [];
  for (const u of pages) {
    await p.goto(base + u, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(700);
    const r = await p.evaluate(() => {
      const vw = innerWidth, sw = document.documentElement.scrollWidth, out = [];
      document.querySelectorAll('body *').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && r.right > vw + 1) { let a = e.parentElement, clipped = false; while (a && a !== document.body) { const o = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(o.overflowX)) { clipped = true; break; } a = a.parentElement; } if (!clipped && getComputedStyle(e).position !== 'fixed') out.push(e.tagName + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 30) + '@' + Math.round(r.right)); } });
      return { sw, out: out.slice(0, 4) };
    });
    if (r.sw > 391) bad.push(u + ' sw=' + r.sw + ' ' + r.out.join(' ')); 
  }
  console.log(bad.length ? bad.join('\n') : 'tất cả ' + pages.length + ' trang không tràn ở 390'); await b.close();
})();
