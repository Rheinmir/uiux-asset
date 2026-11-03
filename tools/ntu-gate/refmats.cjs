const { chromium } = require('playwright'); const fs = require('fs'); const REF = 'ref-' + (+process.env.VW || 1440); fs.mkdirSync(REF, { recursive: true });
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +process.env.VW || 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await p.goto('https://namethatui.com/', { waitUntil: 'load', timeout: 40000 }); await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' }); await p.waitForTimeout(2500);
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a.group.block')].map((a) => a.getAttribute('href')).filter((h) => /^\/(web|macos)\//.test(h)));
  const meta = {}; let i = 0;
  for (const h of hrefs) { const el = await p.$(`a[href="${h}"] .demo-mat`); if (!el) continue; await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(120);
    const key = h.slice(1); const file = `${REF}/${String(i).padStart(2, '0')}-${key.replace('/', '_')}.png`; await el.screenshot({ path: file });
    meta[key] = { i, file, text: await el.evaluate((m) => { const o = m.getBoundingClientRect(), T = []; const w = document.createTreeWalker(m, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (!n.nodeValue.trim()) continue; const r = document.createRange(); r.selectNodeContents(n); for (const b of r.getClientRects()) if (b.width > 0) T.push([b.left - o.left - 1, b.top - o.top - 1, b.width + 2, b.height + 2]); } return T; }) }; i++; }
  fs.mkdirSync(REF,{recursive:true}); fs.writeFileSync(REF+'/meta.json', JSON.stringify(meta)); console.log('mats', i); await b.close(); })();
