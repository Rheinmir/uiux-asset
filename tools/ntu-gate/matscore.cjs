const { chromium } = require('playwright'); const fs = require('fs');
const want = process.argv.slice(2); const VW = +process.env.VW || 1440; const meta = JSON.parse(fs.readFileSync(`ref-${VW}/meta.json`)); const MD = `mine-${VW}`; fs.mkdirSync(MD, { recursive: true });
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: VW, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await p.goto(process.env.URLQ ? 'http://127.0.0.1:8793/namethatui/?demos=gen' : 'http://127.0.0.1:8793/namethatui/', { waitUntil: 'load' }); await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' }); await p.waitForTimeout(1500);
  const out = {}; const keys = want.length && want[0] !== 'all' ? want : Object.keys(meta);
  for (const key of keys) { const el = await p.$(`a.card[href$="#/${key}"] .mat, a.card[href="/namethatui/${key}"] .mat`); if (!el) { out[key] = null; continue; } await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(80);
    await el.screenshot({ path: `${MD}/${key.replace('/', '_')}.png` });
    out[key] = await el.evaluate((m) => { const o = m.getBoundingClientRect(), T = []; const w = document.createTreeWalker(m, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (!n.nodeValue.trim()) continue; const r = document.createRange(); r.selectNodeContents(n); for (const b of r.getClientRects()) if (b.width > 0) T.push([b.left - o.left - 1, b.top - o.top - 1, b.width + 2, b.height + 2]); } return T; }); }
  fs.writeFileSync(MD + '/text.json', JSON.stringify(out)); console.log('shot', Object.keys(out).filter((k) => out[k]).length); await b.close(); })();
