// Vỏ site uiux-asset theo UI kit awwwards-com: dải chạy + header + footer + công tắc sáng/tối, dùng chung mọi trang.
// Gắn: <link rel="stylesheet" href="…/aw.css"> ở <head> và <script src="…/aw.js"></script> ngay đầu <body> (hoặc đầu <main class="aw-wrap">)
// — chạy đồng bộ để header có trước lần vẽ đầu, không xô lệch trang. Markup chép từ mục "Màn hình mẫu" của kit.
(() => {
  const me = document.currentScript, R = new URL('.', me.src).href, d = document.documentElement;
  const KEY = 'ovs-theme';                                    // cùng khoá với html_base (components, stats) → đổi một nơi, mọi trang theo
  let saved = null; try { saved = localStorage.getItem(KEY); } catch {}
  d.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (self !== top) return;                                    // trang đang làm ảnh xem trước (iframe ở gallery): chỉ nội dung, không vỏ/giỏ
  // Owner (phòng uiux-giatbh): gom tab, đừng tách nhiều → 4 nhóm thả xuống thay 15 link phẳng.
  const NAV = [
    ['Thành phần', [['components/', 'Components'], ['patterns/', 'Patterns'], ['galaxy/', 'Galaxy'], ['namethatui/', 'Tên UI']]],
    ['Hiệu ứng', [['scroll-effects/', 'Scroll effects'], ['motion/', 'Motion'], ['angles/', 'Góc máy']]],
    ['Dựng lại', [['halvo/', 'Nesta'], ['notebook/', 'Sổ tay'], ['signal/', 'Signal'], ['topo/', 'Topo'], ['fonts/', 'Font']]],
    ['Tài nguyên', [['ui-libraries/', 'Thư viện UI'], ['ui-kits/', 'UI kits'], ['skills/', 'Skills'], ['stats.html', 'Thống kê']]]];
  const here = (p) => location.href.startsWith(R + p);
  const links = NAV.map(([g, items], i) => `<div class="aw-dd"><button type="button" class="aw-dd__btn" aria-expanded="false" aria-controls="aw-dd-${i}"${items.some(([p]) => here(p)) ? ' aria-current="true"' : ''}>${g}</button>
    <div class="aw-dd__menu" id="aw-dd-${i}" hidden>${items.map(([p, t]) => `<a class="aw-mitem" href="${R + p}"${here(p) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</div></div>`).join('');
  const run = '<span><b>uiux-asset</b></span><span class="ms">sentiment_satisfied</span><span>Code gốc nguyên văn — xem chạy thật, copy nguyên file</span>';

  const head = document.createElement('div');
  head.className = 'aw-site-head';
  head.innerHTML = `<div class="aw-marquee" aria-hidden="true">${run.repeat(6)}</div>
    <header class="aw-header"><a class="aw-brand" href="${R}">UIUX.</a><nav class="aw-hnav" aria-label="Chuyên mục">${links}</nav><span class="grow"></span>
    <button type="button" class="aw-btn aw-btn--small" id="aw-cart-btn" aria-label="Mở giỏ mẫu">Giỏ <span class="aw-count" id="aw-cart-n">0</span></button>
    <button type="button" class="aw-btn aw-btn--small aw-btn--outline" id="aw-theme" aria-label="Đổi giao diện sáng/tối"><span class="ms"></span></button>
    <a class="aw-btn aw-btn--small aw-gh" href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></header>`;
  me.after(head);
  const dds = [...head.querySelectorAll('.aw-dd__btn')];   // mở một nhóm thì đóng nhóm khác; bấm ra ngoài hoặc Esc thì đóng hết
  const shut = (keep) => dds.forEach((b) => { if (b !== keep) { b.setAttribute('aria-expanded', 'false'); b.nextElementSibling.hidden = true; } });
  dds.forEach((b) => b.onclick = () => { const open = b.getAttribute('aria-expanded') !== 'true'; shut(b); b.setAttribute('aria-expanded', open); b.nextElementSibling.hidden = !open; });
  document.addEventListener('click', (e) => { if (!e.target.closest('.aw-dd')) shut(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
  const cs = document.createElement('script'); cs.src = R + 'cart.js' + new URL(me.src).search; document.head.append(cs);   // giỏ mẫu (nút "+ Giỏ" trên mọi thẻ)

  const btn = head.querySelector('#aw-theme'), ico = btn.firstChild;
  const paint = () => { ico.textContent = d.dataset.theme === 'dark' ? 'light_mode' : 'dark_mode'; };
  const flip = () => { d.dataset.theme = d.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem(KEY, d.dataset.theme); } catch {} paint(); };
  btn.onclick = () => {                                       // vòng tròn lan từ nút (View Transitions); trình duyệt cũ / giảm chuyển động → đổi thẳng
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return flip();
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(flip).ready.then(() => d.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }));
  };
  paint();

  document.addEventListener('DOMContentLoaded', () => {
    const host = me.parentElement, foot = document.createElement('footer');
    foot.className = 'aw-footer';
    foot.innerHTML = `<div class="aw-footer__top"><a class="aw-footer__brand" href="${R}">UIUX<span class="aw-sticker" aria-hidden="true"></span></a>
      <ul class="aw-footer__menu"><li><b>Bộ sưu tập</b></li>${NAV.flatMap(([, it]) => it).filter(([p]) => ['scroll-effects/', 'components/', 'ui-kits/', 'galaxy/', 'ui-libraries/'].includes(p)).map(([p, t]) => `<li><a href="${R + p}">${t}</a></li>`).join('')}</ul>
      <ul class="aw-footer__menu"><li><b>Nguồn</b></li><li><a href="https://freefrontend.com/javascript-scroll-effects/" target="_blank" rel="noopener">freefrontend</a></li><li><a href="https://uiverse.io" target="_blank" rel="noopener">Uiverse.io</a></li><li><a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a></li></ul>
      <ul class="aw-footer__menu"><li><b>Site</b></li><li><a href="${R}stats.html">Thống kê</a></li><li><a href="https://rheinmir.github.io/uiux-asset/ui-kits/awwwards-com/latest/" target="_blank" rel="noopener">Giao diện: kit awwwards-com</a></li><li><a href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></li></ul>
      <p class="aw-footer__note">Code gốc nguyên văn, giữ dòng ghi công của tác giả khi copy. Giấy phép theo từng nguồn (đa phần MIT).</p></div>
      <div class="aw-footer__bottom"><span>uiux-asset · kho pattern UI/UX</span><a href="#top" onclick="scrollTo({top:0,behavior:'smooth'});return false">Lên đầu trang ↑</a></div>`;
    if (!document.querySelector('[data-ovs-stats]')) { const s = document.createElement('div'); s.dataset.ovsStats = ''; host.append(s); }   // dải số liệu của stats.js nằm trên footer
    host.append(foot);
  });
})();
