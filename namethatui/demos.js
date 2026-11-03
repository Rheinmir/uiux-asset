// Demo vẽ lại cho thẻ trên lưới. Mỗi hàm dùng toạ độ trong khung 312×176; viết bằng helper R (hộp) / T (chữ) / SV (svg).
(() => {
  const R = (x, y, w, h, st = '', inner = '') => `<i style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${st}">${inner}</i>`;
  const T = (x, y, t, fs, c, fw = 400, st = '') => `<b style="left:${x}px;top:${y}px;font-size:${fs}px;color:${c};font-weight:${fw};${st}">${t}</b>`;
  const Q = (inner) => `<div class="q">${inner}</div>`;
  const W = (a) => `rgba(255,255,255,${a})`;
  const chev = (x, y, c) => `<svg style="left:${x}px;top:${y}px" width="5" height="9" viewBox="0 0 5 9" fill="none" stroke="${c}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M.7 3.3 2.5 1.4 4.3 3.3M.7 5.7 2.5 7.6 4.3 5.7"/></svg>`;
  const SHADOW = 'box-shadow:0 1px 2px rgba(0,0,0,.5),0 10px 26px -10px rgba(0,0,0,.55)';
  const D = {};
  // ---- macOS · Rule Editor ----
  D['macos/rule-editor'] = (() => {
    const pop = (x, y, w, t, c = '#333') => R(x, y, w, 15, `background:${c};border-radius:5px`) + T(x + 8, y + 3, t, 9, W(.9)) + chev(x + w - 9, y + 3, W(.75));
    const btn = (x, y, g, dim) => R(x, y, 26, 15, `background:#333;border-radius:4.5px;${dim ? 'opacity:.45' : ''}`) + T(x + 9.5, y + 1.5, g, 12, W(.9));
    const fld = (x, y, t) => R(x, y, 43, 15, 'background:#161616;border:1px solid #373737;border-radius:5px') + T(x + 6, y + 3, t, 9, W(.9));
    const rows = [[33, [pop(18, 36, 50, 'Tất cả'), T(73, 39, 'các điều kiện sau đúng', 9, W(.85)), btn(238, 36, '−', 1), btn(266, 36, '+')]],
      [55, [pop(43, 58, 70, 'Tên'), pop(118, 58, 64, 'chứa'), fld(187, 58, 'báo cáo'), btn(238, 58, '−'), btn(266, 58, '+')]],
      [77, [pop(43, 80, 70, 'Bất kỳ'), T(118, 83, 'các điều kiện sau đúng', 9, W(.85)), btn(238, 80, '−'), btn(266, 80, '+')]],
      [99, [pop(68, 102, 45, 'Thẻ'), pop(118, 102, 64, 'chứa'), fld(187, 102, 'gấp'), btn(238, 102, '−'), btn(266, 102, '+')]],
      [121, [pop(68, 124, 45, 'Loại'), T(118, 127, 'là', 9, W(.85)), pop(133, 124, 49, 'PDF'), btn(238, 124, '−'), btn(266, 124, '+')]]];
    return Q(R(11, 32, 290, 112, `background:#1e1e1e;border:1px solid ${W(.1)};${SHADOW}`) + rows.map(([y, c], k) => R(12, y, 288, 22, `background:linear-gradient(#1e1e1e calc(100% - 5.5px),#262626);${k ? 'border-top:1px solid #3b3b3b' : ''}`) + c.join('')).join('') + R(12, 143, 288, 1, 'background:#3b3b3b'));
  })();
  // ---- Web · Waffle Menu ----
  D['web/waffle-menu'] = (() => {
    const ic = (x, y, c) => R(x, y, 19, 19, `background:${c};border-radius:7px`);
    const dots = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => R(226 + j * 4 - 0.5 + 0.5, 38 + i * 4, 2, 2, 'background:#d8dae0;border-radius:50%'))).join('');
    return Q(R(46, 30, 220, 116, `background:#1e1f24;border:1px solid ${W(.1)};border-radius:14px;${SHADOW}`) + R(47, 31, 219, 24, 'background:#232428;border-radius:11px 11px 0 0') + R(53, 38, 9, 9, 'background:linear-gradient(135deg,#4ea1ff,#7a5cff);border-radius:5px') + R(70, 34, 100, 16, `background:${W(.06)};border-radius:9px`) + R(220, 32, 20, 20, 'background:#3d3e41;border-radius:50%') + dots + R(244, 34, 16, 16, 'background:linear-gradient(135deg,#ffb21f,#ff7a00);border-radius:50%') + T(249, 39, 'A', 8, '#fff', 600)
      + R(55, 63, 48, 5, `background:${W(.12)};border-radius:3px`) + R(55, 73, 56, 3, `background:${W(.08)};border-radius:3px`) + R(55, 79, 40, 3, `background:${W(.08)};border-radius:3px`)
      + R(116, 57, 124, 83, `background:#282a2c;border-radius:20px;${SHADOW}`) + R(119, 60, 118, 77, 'background:#1b1b1b;border-radius:17px')
      + ic(133, 74, '#00a6f4') + ic(168, 74, '#615fff') + ic(203, 74, '#fe9a00') + ic(133, 104, '#00bc7d') + ic(168, 104, '#ff2056') + ic(203, 104, '#8e51ff'));
  })();
  // ---- Web · Pie / Donut Chart ----
  D['web/pie-donut-chart'] = (() => {
    const pie = 'conic-gradient(#121316 0 3deg,#0a6cff 3deg 165deg,#121316 165deg 171deg,#8b5cf6 171deg 249deg,#121316 249deg 255deg,#14b8a6 255deg 315deg,#121316 315deg 321deg,#f59e0b 321deg 357deg,#121316 357deg 360deg)';
    const lab = (x, t) => T(x, 127, t, 9, '#8a8f98', 400, "font-family:'Geist Mono',ui-monospace,monospace");
    return Q(R(31, 18, 250, 140, `background:#121316;border:1px solid ${W(.08)};border-radius:14px;${SHADOW}`) + R(61, 40, 74, 74, `border-radius:50%;background:${pie}`) + R(177, 40, 74, 74, `border-radius:50%;background:${pie};-webkit-mask:radial-gradient(circle,transparent 24.5px,#000 25px);mask:radial-gradient(circle,transparent 24.5px,#000 25px)`) + lab(70, 'biểu đồ tròn') + lab(182, 'biểu đồ vành'));
  })();
  window.NT_DEMOS = D;
})();
