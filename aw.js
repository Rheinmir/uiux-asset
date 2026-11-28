// Vỏ site uiux-asset theo UI kit awwwards-com: dải chạy + header + footer + công tắc sáng/tối, dùng chung mọi trang.
// Gắn: <link rel="stylesheet" href="…/aw.css"> ở <head> và <script src="…/aw.js"></script> ngay đầu <body> (hoặc đầu <main class="aw-wrap">)
// — chạy đồng bộ để header có trước lần vẽ đầu, không xô lệch trang. Markup chép từ mục "Màn hình mẫu" của kit.
(() => {
  const me = document.currentScript, R = new URL('.', me.src).href, d = document.documentElement;
  const KEY = 'ovs-theme';                                    // cùng khoá với html_base (components, stats) → đổi một nơi, mọi trang theo
  let saved = null; try { saved = localStorage.getItem(KEY); } catch {}
  d.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (self !== top) return;                                    // trang đang làm ảnh xem trước (iframe ở gallery): chỉ nội dung, không vỏ/giỏ
  // Owner (phòng uiux-giatbh, 20/11): MỘT bộ nhóm chung cho mọi bộ sưu tập, menu 4 link phẳng, không thả xuống.
  // Mẫu dựng lại mới chỉ thêm MỘT dòng vào nhóm sẵn có, không thêm mục menu. Trang chủ vẽ 4 khu từ chính bảng này.
  // Mỗi dòng: [đường dẫn, tên, mô tả ngắn, số mục, ảnh xem trước (bỏ trống thì iframe trang)]
  const CAT = [
    ['thanh-phan', 'Thành phần', 'Nút, ô nhập, thẻ, tab, widget', [
      ['galaxy/', 'Galaxy', 'Element Uiverse: nút, ô nhập, thẻ, loader', 3802, '@galaxy'],
      ['namethatui/', 'Name That UI', 'Cái này tên là gì? Từ điển 91 thành phần', 91, 'namethatui/thumb.jpg'],
      ['components/', 'Chip', 'Hình chip và nhãn trạng thái', 29, 'components/chip.html'],
      ['patterns/tab-bar.html', 'Thanh tab nổi', 'Điều hướng app di động', 7],
      ['patterns/taste.html?k=ui', 'Widget có gu', 'Đồng hồ, bản đồ, bảng, máy nghe nhạc', 9],
      ['patterns/moments.html', 'Khoảnh khắc UI', 'Công tắc, nút, spinner tự chạy', 36],
      ['patterns/moments-light.html', 'Khoảnh khắc UI · Theo ánh sáng', '36 tương tác, đốm sáng trôi qua lưới', 36],
      ['patterns/card-stage.html', 'Sân khấu thẻ 3D', 'Vòng cung, trụ xoay, vòng ảnh, có thanh tuỳ chỉnh', 6],
      ['ui-moments/', 'UI Moments gốc', 'Bộ gốc MIT: 164 UI, chép HTML/React', 164],
      ['patterns/glow.html', 'Viền cầu vồng', 'Công tắc, ô nhập, thẻ sáng ngũ sắc', 4],
      ['patterns/navigation.html', 'Điều hướng thanh bên', '9 kiểu đánh dấu mục đang chọn', 9],
      ['patterns/sign-dialog.html', 'Hộp thoại ký', 'Ký tay, hoàn tác, công tắc đồng ý', 4],
      ['patterns/icon-tiles.html', 'Icon ô màu', 'Glyph trắng khoét âm bản, xuất SVG/PNG', 12],
      ['patterns/slide-login.html', 'Đăng nhập trượt', 'Tấm chéo trượt giữa Đăng ký và Đăng nhập', 5],
      ['patterns/factory.html', 'Bảng agent', 'Kanban dây chuyền agent, chép code', 1],
      ['patterns/activity-deck.html', 'Bảng hoạt động kiểu deck', 'Xám/trắng, số lớn, một chấm chanh', 6],
      ['patterns/collect-grid.html', 'Lưới sưu tập 7/12', 'Ô tối, bóng đen chưa có, bấm để nhận', 6]]],
    ['man-hinh', 'Màn hình', 'Trang web và màn app dựng lại', [
      ['patterns/taste.html', 'Hero và màn app', 'Hero website và màn app có gu', 11],
      ['halvo/', 'Nesta', 'Dashboard nhà thông minh', 0],
      ['notebook/', 'Sổ tay', 'App sổ tay giấy, 4 nhóm chức năng', 0],
      ['signal/', 'Signal', 'Bảng tin «20 hot repos»', 5],
      ['patterns/growbot.html', 'Bot nội dung', 'Dashboard 6 bot làm Instagram', 1],
      ['patterns/saltmere.html', 'Saltmere 3D', 'Trang đích tối, hạt 3D tan theo chuột', 10],
      ['topo/', 'Topo', 'Sơ đồ «Build Your AI App»', 0, 'topo/shots/mock.webp'],
      ['patterns/music-dashboard.html', 'Bảng nghe nhạc', 'Thư viện, thống kê, tối theo vòng tròn', 5],
      ['patterns/settings-flow.html', 'Cài đặt có duyệt', 'Đổi ngay, đếm thay đổi, duyệt cũ → mới', 5],
      ['patterns/loan-dashboard.html', 'Bảng cho vay', '4 trang cho vay, thư mục hồ sơ, đúc token', 5],
      ['patterns/ads-report.html', 'Báo cáo quảng cáo', 'Cây chiến dịch, bản đồ nhiệt giờ, ngăn chi tiết', 5],
      ['patterns/dev-portfolio.html', 'Trang cá nhân lập trình viên', 'Lưới đóng góp, ⌘K, trợ lý chat', 8],
      ['patterns/kitchen-store.html', 'Cửa hàng phụ kiện bếp', 'Menu lớn, bố trí chữ I/L/U, chọn cỡ tủ', 10],
      ['patterns/no-spend.html', 'Tháng không tiêu', 'Check-in, danh sách chờ 72 giờ, Hoàn tác', 6],
      ['patterns/health-dashboard.html', 'Sổ sức khoẻ', 'Chỉ số, liều thuốc trượt, lịch kéo thả, nhắn bác sĩ', 7],
      ['patterns/orbit-hud.html', 'Bản đồ HUD tương lai', 'Sát ảnh gốc, delta 98%, 18 bảng kính sống', 6],
      ['patterns/web-studio.html', 'Xưởng bộ website', 'Trang studio, trang bộ, 5 web mẫu, thành phần, mock', 7]]],
    ['chuyen-dong', 'Chuyển động', 'Cuộn trang, motion, 3D', [
      ['scroll-effects/', 'Scroll effects', 'Hiệu ứng cuộn trang, CodePen', 65, 'scroll-effects/thumbs/interactive-cicada-genomics-landing-page.jpg'],
      ['motion/', 'Motion', 'Thư viện chuyển động chạy thật', 28, 'motion/thumbs/animate-ui.jpg'],
      ['angles/', 'Góc máy', 'Camera angle, cảnh 3D bằng CSS', 8, 'angles/#a1'],
      ['teardown/', 'Teardown 3D', 'Máy 3D tháo rời được', 3, 'teardown/thumbs/v8.jpg'],
      ['patterns/toolkit.html', 'Bộ đồ nghề chuyển động', '16 repo motion, demo chạy thật', 16],
      ['patterns/motionstudio.html', 'Xưởng chuyển động Muse', '14 repo, xoắn ốc / chồng / lưới', 14],
      ['patterns/principles.html', '20 nguyên tắc UX', 'Trước/Sau cho từng nguyên tắc chuyển động', 20],
      ['patterns/mascot.html', 'Linh vật bot', '20 trạng thái avatar agent, CSS thuần', 20],
      ['patterns/thinking-dots.html', 'Đang nghĩ', '8 nhịp chấm sáng chờ trợ lý AI', 8],
      ['patterns/plush.html', 'Linh vật lông', '12 thú bông SVG, mỗi con một vai agent', 12],
      ['patterns/server-lift.html', 'Máy chủ mở nắp', 'Minh hoạ đẳng cự, nắp nhấc, lõi sáng', 2],
      ['patterns/sound.html', 'Chuyển động và âm thanh', 'Luồng app có âm thanh UI', 11],
      ['patterns/roast-dial.html', 'Núm rang', 'Xoay núm, cả trang đổi màu theo mức rang', 4],
      ['patterns/day-ident.html', 'Một ngày bằng đất sét', 'Ident kênh TV: đồng hồ, lịch lật, phố ngày đêm', 6]]],
    ['tai-nguyen', 'Tài nguyên', 'UI kit, font, thư viện, skill', [
      ['ui-kits/', 'UI kits', 'Hệ thiết kế rút từ site thật', 36, 'ui-kits/awwwards-com/latest/'],
      ['ui-libraries/', 'Thư viện UI', 'Thư viện trên GitHub, số liệu sống', 153],
      ['patterns/studio.html', 'Xưởng UI', '15 thư viện UI, tường tự cuộn', 15],
      ['patterns/toolbox.html', 'Hộp đồ nghề web', '50 trang miễn phí hay dùng', 50],
      ['fonts/', 'Font', 'Font family và bảng màu', 9],
      ['patterns/palettes.html', 'Bảng màu', 'Bảng màu 4 màu, chép hex', 6],
      ['patterns/accent-rule.html', 'Một màu nhấn', '2 màu nền + 1 màu cho nút, thử nheo mắt', 3],
      ['skills/', 'Skills', 'Claude skill từ một bài viết', 40],
      ['rules/', 'Chuẩn UI Hang', '244 luật đo được, audit tự động', 244]]]];
  window.AW_CAT = CAT;
  const url = location.href.split('#')[0], base = url.split('?')[0], flat = CAT.flatMap(([id, , , it]) => it.map(([p]) => [id, R + p]));
  const on = (flat.find(([, u]) => u === url) || flat.find(([, u]) => base.startsWith(u.split('?')[0])) || [])[0];   // nhóm của trang đang xem
  const links = CAT.map(([id, g]) => `<a href="${R}#${id}"${id === on ? ' aria-current="page"' : ''}>${g}</a>`).join('');
  const run = '<span><b>uiux-asset</b></span><span class="ms">sentiment_satisfied</span><span>Code gốc nguyên văn — xem chạy thật, copy nguyên file</span>';

  const head = document.createElement('div');
  head.className = 'aw-site-head';
  head.innerHTML = `<div class="aw-marquee" aria-hidden="true">${run.repeat(6)}</div>
    <header class="aw-header"><a class="aw-brand" href="${R}">UIUX.</a><nav class="aw-hnav" aria-label="Chuyên mục">${links}</nav><span class="grow"></span>
    <button type="button" class="aw-btn aw-btn--small" id="aw-cart-btn" aria-label="Mở giỏ mẫu">Giỏ <span class="aw-count" id="aw-cart-n">0</span></button>
    <button type="button" class="aw-btn aw-btn--small aw-btn--outline" id="aw-theme" aria-label="Đổi giao diện sáng/tối"><span class="ms"></span></button>
    <a class="aw-btn aw-btn--small aw-gh" href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></header>`;
  me.after(head);
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
      <ul class="aw-footer__menu"><li><b>Bộ sưu tập</b></li>${CAT.map(([id, g]) => `<li><a href="${R}#${id}">${g}</a></li>`).join('')}</ul>
      <ul class="aw-footer__menu"><li><b>Nguồn</b></li><li><a href="https://freefrontend.com/javascript-scroll-effects/" target="_blank" rel="noopener">freefrontend</a></li><li><a href="https://uiverse.io" target="_blank" rel="noopener">Uiverse.io</a></li><li><a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a></li></ul>
      <ul class="aw-footer__menu"><li><b>Site</b></li><li><a href="${R}stats.html">Thống kê</a></li><li><a href="https://rheinmir.github.io/uiux-asset/ui-kits/awwwards-com/latest/" target="_blank" rel="noopener">Giao diện: kit awwwards-com</a></li><li><a href="https://github.com/Rheinmir/uiux-asset" target="_blank" rel="noopener">GitHub</a></li></ul>
      <p class="aw-footer__note">Code gốc nguyên văn, giữ dòng ghi công của tác giả khi copy. Giấy phép theo từng nguồn (đa phần MIT).</p></div>
      <div class="aw-footer__bottom"><span>uiux-asset · kho pattern UI/UX</span><a href="#top" onclick="scrollTo({top:0,behavior:'smooth'});return false">Lên đầu trang ↑</a></div>`;
    if (!document.querySelector('[data-ovs-stats]')) { const s = document.createElement('div'); s.dataset.ovsStats = ''; host.append(s); }   // dải số liệu của stats.js nằm trên footer
    host.append(foot);
  });
})();
