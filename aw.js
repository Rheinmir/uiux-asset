// Vỏ site uiux-asset theo UI kit awwwards-com: dải chạy + header + footer + công tắc sáng/tối, dùng chung mọi trang.
// Gắn: <link rel="stylesheet" href="…/aw.css"> ở <head> và <script src="…/aw.js"></script> ngay đầu <body> (hoặc đầu <main class="aw-wrap">)
// — chạy đồng bộ để header có trước lần vẽ đầu, không xô lệch trang. Markup chép từ mục "Màn hình mẫu" của kit.
(() => {
  const me = document.currentScript, R = new URL('.', me.src).href, d = document.documentElement;
  const KEY = 'ovs-theme';                                    // cùng khoá với html_base (components, stats) → đổi một nơi, mọi trang theo
  let saved = null; try { saved = localStorage.getItem(KEY); } catch {}
  d.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const NAV = [['scroll-effects/', 'Scroll effects'], ['components/', 'Components'], ['ui-kits/', 'UI kits'], ['galaxy/', 'Galaxy'], ['stats.html', 'Thống kê']];
  const links = NAV.map(([p, t]) => `<a href="${R + p}"${location.href.startsWith(R + p) ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const run = '<span><b>uiux-asset</b></span><span class="ms">sentiment_satisfied</span><span>Code gốc nguyên văn — xem chạy thật, copy nguyên file</span>';

  const head = document.createElement('div');
  head.className = 'aw-site-head';
  head.innerHTML = `<div class="aw-marquee" aria-hidden="true">${run.repeat(6)}</div>
    <header class="aw-header"><a class="aw-brand" href="${R}">UIUX.</a><nav class="aw-hnav" aria-label="Chuyên mục">${links}</nav><span class="grow"></span>
    <button type="button" class="aw-btn aw-btn--small" id="aw-cart-btn" aria-label="Mở giỏ mẫu">Giỏ <span class="aw-count" id="aw-cart-n">0</span></button>
    <button type="button" class="aw-btn aw-btn--small aw-btn--outline" id="aw-theme" aria-label="Đổi giao diện sáng/tối"><span class="ms"></span></button>
    <a class="aw-btn aw-btn--small" href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></header>`;
  me.after(head);
  const cs = document.createElement('script'); cs.src = R + 'cart.js'; document.head.append(cs);   // giỏ mẫu (nút "+ Giỏ" trên mọi thẻ)

  const btn = head.querySelector('#aw-theme'), ico = btn.firstChild;
  const paint = () => { ico.textContent = d.dataset.theme === 'dark' ? 'light_mode' : 'dark_mode'; };
  btn.onclick = () => { d.dataset.theme = d.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem(KEY, d.dataset.theme); } catch {} paint(); };
  paint();

  document.addEventListener('DOMContentLoaded', () => {
    const host = me.parentElement, foot = document.createElement('footer');
    foot.className = 'aw-footer';
    foot.innerHTML = `<div class="aw-footer__bottom"><ul class="aw-footer__nav">${NAV.map(([p, t]) => `<li><a href="${R + p}">${t}</a></li>`).join('')}</ul>
      <ul class="aw-footer__nav"><li>Giao diện:</li><li><a href="https://rheinmir.github.io/uiux-asset/ui-kits/awwwards-com/latest/" target="_blank" rel="noopener">UI kit awwwards-com</a></li>
      <li><a href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></li></ul></div>`;
    if (!document.querySelector('[data-ovs-stats]')) { const s = document.createElement('div'); s.dataset.ovsStats = ''; host.append(s); }   // dải số liệu của stats.js nằm trên footer
    host.append(foot);
  });
})();
