// Đo toạ độ/màu của phần hiển thị từng demo trên trang gốc rồi sinh HTML/CSS mới (hộp tuyệt đối, tên lớp riêng). Không đọc/không chép mã nguồn hay ảnh của họ.
const { chromium } = require('playwright'); const fs = require('fs');
const want = process.argv.slice(2);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  await p.goto('https://namethatui.com/', { waitUntil: 'load', timeout: 40000 }); await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' }); await p.waitForTimeout(2500);
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a.group.block')].map((a) => a.getAttribute('href')).filter((h) => /^\/(web|macos)\//.test(h)));
  const out = {}; const keys = hrefs.map((h) => h.slice(1)).filter((k) => !want.length || want.includes(k));
  for (const key of keys) {
    const tree = await p.evaluate((key) => {
      const mat = document.querySelector(`a[href="/${key}"] .demo-mat`); const mr = mat.getBoundingClientRect(); const N = (v) => Math.round(v * 100) / 100;
      const alpha = (c) => { const m = c.match(/\/\s*([\d.]+)\s*\)/) || c.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/); return m ? parseFloat(m[1]) : (c === 'transparent' ? 0 : 1); };
      const walk = (e, ox, oy) => { const out = [];
        for (const c of e.children) { const cs = getComputedStyle(c); if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue; const r = c.getBoundingClientRect(); if (r.width < 0.5 && r.height < 0.5) continue;
          const x = r.left - mr.left - ox, y = r.top - mr.top - oy; const tag = c.tagName.toLowerCase();
          if (tag === 'svg') { const f = c.querySelector('[fill]:not([fill="none"])'); const st = c.querySelector('[stroke]:not([stroke="none"])'); const vb = c.viewBox && c.viewBox.baseVal && c.viewBox.baseVal.width ? c.viewBox.baseVal.width : r.width, sc = r.width / vb; const prims = [];
            for (const q of c.querySelectorAll('circle,rect,ellipse,line')) { const qs = getComputedStyle(q), qr = q.getBoundingClientRect(); const tm = qs.transform && qs.transform !== 'none' ? new DOMMatrix(qs.transform) : null; const rot = tm ? Math.round(Math.atan2(tm.b, tm.a) * 180 / Math.PI) : 0; let dash = null; if (qs.strokeDasharray && qs.strokeDasharray !== 'none') { const parts = qs.strokeDasharray.split(/[ ,]+/).map(parseFloat); let circ = 0; if (q.tagName === 'circle') circ = 2 * Math.PI * q.r.baseVal.value; if (circ && parts[0]) dash = Math.min(1, parts[0] / circ); }
              prims.push({ t: q.tagName, x: qr.left - r.left, y: qr.top - r.top, w: qr.width, h: qr.height, fill: qs.fill, stroke: qs.stroke, sw: (parseFloat(qs.strokeWidth) || 0) * sc, op: qs.opacity, rot, dash, rx: parseFloat(q.getAttribute('rx')) * sc || 0, cap: qs.strokeLinecap }); }
            const hasPath = !!c.querySelector('path,polyline,polygon');
            out.push({ k: 'svg', x, y, w: r.width, h: r.height, col: cs.color, op: cs.opacity, fill: f ? getComputedStyle(f).fill : '', stroke: st ? getComputedStyle(st).stroke : '', prims, hasPath }); continue; }
          if (tag === 'img' || tag === 'canvas' || tag === 'video') { out.push({ k: 'ph', x, y, w: r.width, h: r.height }); continue; }
          const bl = parseFloat(cs.borderLeftWidth) || 0, bt = parseFloat(cs.borderTopWidth) || 0;
          const box = { k: 'box', x, y, w: r.width, h: r.height };
          if (alpha(cs.backgroundColor) > 0) box.bg = cs.backgroundColor; if (/gradient/.test(cs.backgroundImage)) box.bgi = cs.backgroundImage;
          const bw = ['Top', 'Right', 'Bottom', 'Left'].map((s) => parseFloat(cs['border' + s + 'Width']) || 0); if (bw.some((v) => v > 0)) { box.bd = ['Top', 'Right', 'Bottom', 'Left'].map((s, i) => bw[i] > 0 && cs['border' + s + 'Style'] !== 'none' ? `${bw[i]}px ${cs['border' + s + 'Style']} ${cs['border' + s + 'Color']}` : 'none'); }
          if (cs.borderRadius !== '0px') box.br = cs.borderRadius; if (cs.filter !== 'none') box.fl = cs.filter; if (cs.backdropFilter && cs.backdropFilter !== 'none') box.bf = cs.backdropFilter; if (cs.mixBlendMode !== 'normal') box.mb = cs.mixBlendMode; if (cs.boxShadow !== 'none') box.sh = cs.boxShadow; if (parseFloat(cs.opacity) < 1) box.op = cs.opacity;
          const clip = cs.overflow !== 'visible' || cs.overflowX !== 'visible'; box.clip = clip;
          // văn bản trực tiếp
          const texts = []; for (const n of c.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); const rects = [...rg.getClientRects()].filter((q) => q.width > 0); if (rects.length) texts.push({ t: n.nodeValue.trim().replace(/\s+/g, ' '), x: rects[0].left - mr.left - ox - bl - (clip || box.op ? r.left - mr.left - ox - 0 : 0) , y: rects[0].top - mr.top - oy, w: Math.max(...rects.map((q) => q.right)) - Math.min(...rects.map((q) => q.left)), h: rects[0].height, lines: rects.length, fs: cs.fontSize, fw: cs.fontWeight, col: cs.color, ls: cs.letterSpacing, tt: cs.textTransform, ff: /mono/i.test(cs.fontFamily) ? 'm' : '', ta: cs.textAlign, rx: rects[0].left - mr.left, ry: rects[0].top - mr.top }); }
          const container = clip || box.op; box.texts = texts;
          box.kids = walk(c, container ? ox + (r.left - mr.left - ox) + bl : ox, container ? oy + (r.top - mr.top - oy) + bt : oy);
          // nếu là container, toạ độ con đã tính theo gốc padding-box của nó
          if (container) { box.cx = r.left - mr.left + bl; box.cy = r.top - mr.top + bt; }
          out.push(box); }
        return out; };
      return { w: mr.width, h: mr.height, kids: walk(mat, 0, 0) };
    }, key);
    out[key] = tree; }
  fs.writeFileSync('trace.json', JSON.stringify(out)); console.log('traced', keys.length); await b.close(); })();
