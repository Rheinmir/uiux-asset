// Demo vẽ lại cho thẻ trên lưới. Mỗi hàm dùng toạ độ trong khung 312×176; viết bằng helper R (hộp) / T (chữ) / SV (svg).
(() => {
  const R = (x, y, w, h, st = '', inner = '') => `<i style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${st}">${inner}</i>`;
  const T = (x, y, t, fs, c, fw = 400, st = '') => `<b style="left:${x}px;top:${y}px;font-size:${fs}px;color:${c};font-weight:${fw};${st}">${t}</b>`;
  const Q = (inner) => `<div class="q">${inner}</div>`;
  const W = (a) => `rgba(255,255,255,${a})`;
  const chev = (x, y, c) => `<svg style="left:${x}px;top:${y}px" width="5" height="9" viewBox="0 0 5 9" fill="none" stroke="${c}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M.7 3.3 2.5 1.4 4.3 3.3M.7 5.7 2.5 7.6 4.3 5.7"/></svg>`;
  const SHADOW = 'box-shadow:0 1px 2px rgba(0,0,0,.5),0 10px 26px -10px rgba(0,0,0,.55)';
  const D = {};
  // ---- Web · Pie / Donut Chart ----
  D['web/pie-donut-chart'] = (() => {
    const pie = 'conic-gradient(#121316 0 3deg,#0a6cff 3deg 165deg,#121316 165deg 171deg,#8b5cf6 171deg 249deg,#121316 249deg 255deg,#14b8a6 255deg 315deg,#121316 315deg 321deg,#f59e0b 321deg 357deg,#121316 357deg 360deg)';
    const lab = (x, t) => T(x, 127, t, 9, '#8a8f98', 400, "font-family:'Geist Mono',ui-monospace,monospace");
    return Q(`<i style="left:calc(.5*(100cqw - 310px));top:0;width:312px;height:176px">` + R(31, 18, 250, 140, `background:#121316;border:1px solid ${W(.08)};border-radius:14px;${SHADOW}`) + R(61, 40, 74, 74, `border-radius:50%;background:${pie}`) + R(177, 40, 74, 74, `border-radius:50%;background:${pie};-webkit-mask:radial-gradient(circle,transparent 24.5px,#000 25px);mask:radial-gradient(circle,transparent 24.5px,#000 25px)`) + lab(70, 'biểu đồ tròn') + lab(182, 'biểu đồ vành') + '</i>');
  })();
  window.NT_DEMOS = D;
})();
