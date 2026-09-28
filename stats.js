// Bộ đếm uiux-asset: gửi 1 lượt xem (/api/hit) rồi hiện dải số liệu nhỏ ở cuối trang, bấm → /stats.html.
// Gắn: <script src="/stats.js" defer></script>. Trang tự đặt chỗ hiện bằng <div data-ovs-stats></div>, không có thì chèn cuối <body>.
(() => {
  const ref = (() => { try { const u = new URL(document.referrer); return u.host && u.host !== location.host ? u.host : ''; } catch { return ''; } })();
  const fmt = (n) => Number(n || 0).toLocaleString('vi-VN');
  const hit = fetch('/api/hit', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ p: location.pathname, r: ref }) }).catch(() => {});
  if (location.pathname.endsWith('/stats.html')) return;            // trang thống kê tự vẽ số liệu
  hit.finally(() => fetch('/api/stats?lite=1').then((r) => (r.ok ? r.json() : null)).then((s) => {
    if (!s) return;
    let box = document.querySelector('[data-ovs-stats]');
    if (!box) { box = document.createElement('div'); box.dataset.ovsStats = ''; document.body.appendChild(box); }
    box.innerHTML = `<a href="/stats.html" class="ovs-stats-line" aria-label="Xem thống kê truy cập">
      <span><b>${fmt(s.views)}</b> lượt xem</span><span><b>${fmt(s.unique)}</b> khách</span>
      <span><b>${fmt(s.newToday)}</b> khách mới hôm nay</span><span><i></i><b>${fmt(s.online)}</b> đang xem</span></a>`;
    if (!document.getElementById('ovs-stats-css')) {
      const st = document.createElement('style'); st.id = 'ovs-stats-css';
      st.textContent = '[data-ovs-stats]{max-width:100%;margin:40px auto 24px;padding:0 16px;text-align:center}'
        + '.ovs-stats-line{display:inline-flex;flex-wrap:nowrap;gap:16px;align-items:center;min-height:40px;padding:8px 16px;border-radius:999px;'
        + 'font:13px/1.4 inherit;color:inherit;opacity:.78;text-decoration:none;white-space:nowrap;max-width:100%;overflow:hidden;'
        + 'background:color-mix(in srgb,currentColor 6%,transparent);transition:opacity .15s ease-out,background-color .15s ease-out}'
        + '.ovs-stats-line:hover,.ovs-stats-line:focus-visible{opacity:1;background:color-mix(in srgb,currentColor 10%,transparent)}'
        + '.ovs-stats-line:focus-visible{outline:2px solid currentColor;outline-offset:2px}'
        + '.ovs-stats-line b{font-variant-numeric:tabular-nums}.ovs-stats-line span{display:inline-flex;align-items:center;gap:6px}'
        + '.ovs-stats-line i{width:8px;height:8px;border-radius:50%;background:#1f9d55}'
        + '@media (max-width:480px){.ovs-stats-line span:nth-child(3){display:none}}';
      document.head.appendChild(st);
    }
  }).catch(() => {}));
})();
