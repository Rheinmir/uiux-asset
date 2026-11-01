// Gallery cho trang sample motion: mặc định thấy MỌI hiệu ứng cùng lúc (lưới thẻ chạy sống) để lựa nhanh; bấm "Mở lớn + code" mới sang chế độ từng tab.
// Dùng chung cho mọi motion/<slug>.html: nhúng bằng <script src="_g.js" defer>. Cần trang có <div id="tabs"> chứa các nút tab và #stage (khung cũ).
//   ?embed=1&t=N   chế độ thẻ: chỉ còn sân khấu của tab thứ N (trang tự bấm nút tab N) — iframe của lưới dùng chế độ này
//   ?v=tabs        chế độ từng tab (như cũ, có code); #tên-tab chỉ chọn tab khi đã ở chế độ này
(() => {
  const q = new URLSearchParams(location.search), embed = q.has('embed'), H = document.documentElement;
  const css = document.createElement('style');
  css.textContent = `
.mg-embed body { margin: 0; background: transparent; }
.mg-embed .aw-wrap { padding: 0 !important; margin: 0 !important; max-width: none !important; }
.mg-embed main > *:not(#stage):not(:has(#stage)):not(script) { display: none !important; }
.mg-embed .m-stage:not(.mg-tool) { min-height: 0 !important; height: 100vh !important; border-radius: 0 !important; }
.mg-embed .m-stage.mg-tool { border-radius: 0 !important; }
.mg-sw { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin: 12px 0; }
.mg-sw button { font: inherit; padding: 8px 16px; border-radius: 999px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; opacity: .65; }
.mg-sw button[aria-pressed="true"] { opacity: 1; background: var(--aw-color-primary, #222); color: var(--aw-color-white, #fff); border-color: transparent; }
.mg-sw small { opacity: .65; margin-left: 8px; }
.mg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 16px; }
.mg-card { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.mg-view { border: 1px solid color-mix(in srgb, currentColor 14%, transparent); position: relative; aspect-ratio: 4 / 3; border-radius: var(--aw-rounded-normal, 12px); overflow: hidden; background: var(--aw-nf-bg-2, #f2f2f2); }
.mg-view iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: transparent; }
.mg-view.mg-scaled iframe { width: 200%; height: 200%; transform: scale(.5); transform-origin: 0 0; }   /* trang công cụ: giao diện đầy đủ thu nhỏ vừa thẻ */
.mg-view .mg-open { position: absolute; inset: 0; z-index: 2; cursor: zoom-in; background: transparent; border: 0; }
.mg-view .mg-open:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }
.mg-view .mg-run { position: absolute; inset: 0; z-index: 3; display: grid; place-items: center; background: color-mix(in srgb, currentColor 8%, transparent); border: 0; font: inherit; color: inherit; cursor: pointer; }
.mg-name { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; font-weight: 600; }
.mg-name button { font: inherit; font-weight: 400; background: transparent; border: 0; color: inherit; opacity: .65; cursor: pointer; text-decoration: underline; }
.mg-hide-tabs main > *:not(.aw-crumb):not(.mg-sw):not(.mg-grid):not(script) { display: none !important; }
`;
  document.head.append(css);

  const tabs = () => [...document.querySelectorAll('#tabs button')];
  const ready = (fn, tries = 400) => { const b = tabs(); if (b.length) return fn(b); if (tries) setTimeout(() => ready(fn, tries - 1), 100); };

  if (embed) {                                              // thẻ trong lưới: chỉ sân khấu, tự bấm tab thứ N
    H.classList.add('mg-embed');
    const st = document.getElementById('stage'); if (st && /\b[a-z]-stage\b/.test(st.className)) st.classList.add('mg-tool');   // trang công cụ: giữ chiều cao tự nhiên
    ready((b) => { const n = +q.get('t') || 0; (b[n] || b[0]).click(); });
    return;
  }

  const HEAVY = /\/(ffmpeg|lossless-cut)\.html$/.test(location.pathname);   // lõi wasm ~31 MB mỗi iframe: thẻ chỉ chạy khi bấm
  const slug = location.pathname.split('/').pop();
  const TOOL = /\/(comfyui|cosyvoice|librosa|whisperx|obs-studio|lossless-cut|ffmpeg)\.html$/.test(location.pathname);
  let grid = null, sw = null;
  const mode = (m) => {
    H.classList.toggle('mg-hide-tabs', m === 'grid');
    sw.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.m === m));
    const u = new URL(location.href); if (m === 'grid') { u.searchParams.delete('v'); u.hash = ''; } else u.searchParams.set('v', 'tabs');
    history.replaceState(null, '', u);
    window.dispatchEvent(new Event('resize'));              // sân khấu vừa hiện lại: để thư viện đo lại kích thước
  };
  ready((b) => {
    const labels = b.map((x) => x.textContent.trim());
    sw = document.createElement('div'); sw.className = 'mg-sw';
    sw.innerHTML = `<button type="button" data-m="grid">Lưới: xem tất cả</button><button type="button" data-m="tabs">Từng hiệu ứng + code</button><small>${labels.length} hiệu ứng</small>`;
    grid = document.createElement('div'); grid.className = 'mg-grid'; grid.setAttribute('role', 'list');
    labels.forEach((l, i) => {
      const c = document.createElement('div'); c.className = 'mg-card'; c.setAttribute('role', 'listitem');
      const src = `${slug}?embed=1&t=${i}`;
      c.innerHTML = `<div class="mg-view${TOOL ? ' mg-scaled' : ''}">${HEAVY ? '' : `<iframe data-src="${src}" title=""${l.replace(/"/g, '&quot;')}"></iframe>`}<button type="button" class="${HEAVY ? 'mg-run' : 'mg-open'}" aria-label="${HEAVY ? 'Chạy' : 'Mở lớn'} ${l.replace(/"/g, '&quot;')}">${HEAVY ? 'Chạy (tải lõi ffmpeg ~31 MB)' : ''}</button></div>
        <div class="mg-name"><span>${l}</span><button type="button" data-i="${i}">Mở lớn + code</button></div>`;
      grid.append(c);
      const open = () => { mode('tabs'); tabs()[i].click(); scrollTo({ top: 0 }); };
      c.querySelector('.mg-name button').onclick = open;
      const ob = c.querySelector('.mg-open'); if (ob) ob.onclick = open;
      const run = c.querySelector('.mg-run');
      if (run) run.onclick = () => { const f = document.createElement('iframe'); f.src = src; f.title = l; c.querySelector('.mg-view').prepend(f); run.remove(); };
    });
    // chỉ iframe gần màn hình mới chạy; cuộn xa thì dỡ (about:blank) để không ôm GPU/CPU cho hàng chục khung cùng lúc
    // trang nạp hàng trăm file ESM mỗi khung (shaders): khởi động lần lượt cách nhau GAP ms, không thì trình duyệt báo ERR_INSUFFICIENT_RESOURCES
    const GAP = /\/shaders\.html$/.test(location.pathname) ? 4500 : 0;
    let nextAt = 0;
    const start = (f) => { const wait = Math.max(0, nextAt - Date.now()); nextAt = Date.now() + wait + GAP; setTimeout(() => { if (f.dataset.on && !f.getAttribute('src')) f.src = f.dataset.src; }, wait); };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const f = e.target;
      if (e.isIntersecting) { f.dataset.on = '1'; if (!f.getAttribute('src')) start(f); } else { delete f.dataset.on; if (f.getAttribute('src')) f.removeAttribute('src'); }
    }), { rootMargin: '200px 0px' });
    grid.querySelectorAll('iframe[data-src]').forEach((f) => io.observe(f));
    const crumb = document.querySelector('.aw-crumb');
    (crumb || document.querySelector('main')).after(sw); sw.after(grid);
    sw.onclick = (e) => { const x = e.target.closest('button'); if (x) mode(x.dataset.m); };
    mode(q.get('v') === 'tabs' ? 'tabs' : 'grid');   // không xét #hash: nhiều trang tự đặt hash lúc nạp, sẽ ép nhầm sang chế độ tab
  });
})();
