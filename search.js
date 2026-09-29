// Ô tìm kiếm uiux-asset: gọi /api/search (tìm theo nghĩa, 2 nhóm), rơi về từ khoá khi semantic lỗi.
// Gắn: <div data-ovs-search></div> + <script src="/search.js" defer></script>. Phím "/" nhảy vào ô; ↑↓ chọn; Enter mở; Esc xoá.
(() => {
  const root = document.querySelector('[data-ovs-search]');
  if (!root) return;
  const GROUP = { 'scroll-effect': 'Hiệu ứng cuộn trang', chip: 'Mẫu chip' };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  root.innerHTML = `<label class="ovs-s-l" for="ovs-s-q">Tìm mẫu theo ý bạn muốn — gõ tiếng Việt hay tiếng Anh đều được</label>
    <div class="ovs-s-box"><input id="ovs-s-q" type="search" autocomplete="off" spellcheck="false" placeholder="vd: chữ hiện dần khi cuộn, nút xoá tag, parallax…"
      role="combobox" aria-expanded="false" aria-controls="ovs-s-list" aria-autocomplete="list"><kbd aria-hidden="true">/</kbd></div>
    <div class="ovs-s-meta" aria-live="polite"></div><div id="ovs-s-list" class="ovs-s-list" role="listbox" aria-label="Kết quả tìm"></div>`;
  const q = root.querySelector('input'), list = root.querySelector('.ovs-s-list'), meta = root.querySelector('.ovs-s-meta');
  let items = [], cur = -1, seq = 0, timer;

  const logQuery = () => { if (q.value.trim().length > 1) fetch('/api/search?log=1&q=' + encodeURIComponent(q.value.trim()), { keepalive: true }).catch(() => {}); };
  const mark = () => items.forEach((a, i) => { a.setAttribute('aria-selected', i === cur); if (i === cur) a.scrollIntoView({ block: 'nearest' }); });
  const clear = () => { list.innerHTML = ''; meta.textContent = ''; items = []; cur = -1; q.setAttribute('aria-expanded', 'false'); };

  function render(r) {
    const groups = Object.entries(r.groups || {}).filter(([, hs]) => hs.length);
    if (!groups.length) { list.innerHTML = ''; items = []; meta.textContent = 'Không thấy mẫu nào khớp — thử diễn đạt khác.'; return; }
    meta.textContent = r.mode === 'semantic' ? 'Tìm theo nghĩa' : 'Tìm theo từ khoá (tìm theo nghĩa tạm nghỉ)';
    list.innerHTML = groups.map(([k, hs]) => `<div class="ovs-s-g" role="group" aria-label="${GROUP[k] || k}"><div class="ovs-s-gh">${GROUP[k] || k}</div>`
      + hs.map((h) => `<a role="option" class="ovs-s-i" href="${esc(h.url)}"${h.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>
        <span class="t">${esc(h.title)}</span>${h.status && h.status !== 'ok' ? `<span class="st">${esc(h.status)}</span>` : ''}</a>`).join('') + '</div>').join('');
    items = [...list.querySelectorAll('.ovs-s-i')]; cur = -1; q.setAttribute('aria-expanded', 'true');
    items.forEach((a) => a.addEventListener('click', logQuery));
  }

  async function go() {
    const v = q.value.trim(), my = ++seq;
    if (v.length < 2) return clear();
    meta.textContent = 'Đang tìm…';
    try { const r = await (await fetch('/api/search?q=' + encodeURIComponent(v))).json(); if (my === seq) render(r); }
    catch { if (my === seq) meta.textContent = 'Không tìm được lúc này — thử lại sau ít giây.'; }
  }

  q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(go, 300); });   // gõ xong 300ms mới gọi: tiết kiệm hạn mức
  q.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!items.length) return; e.preventDefault();
      cur = (cur + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); const a = items[Math.max(cur, 0)]; if (a) a.click(); else logQuery(); }   // click tự ghi từ khoá — không ghi 2 lần
    else if (e.key === 'Escape') { q.value = ''; clear(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { e.preventDefault(); q.focus(); }
  });

  const st = document.createElement('style');
  st.textContent = '[data-ovs-search]{margin:24px 0}.ovs-s-l{display:block;font-size:14px;margin-bottom:8px;opacity:.8}'
    + '.ovs-s-box{position:relative}.ovs-s-box input{width:100%;box-sizing:border-box;min-height:44px;padding:0 44px 0 14px;border:0;border-radius:12px;'
    + 'background:color-mix(in srgb,currentColor 7%,transparent);color:inherit;font:inherit;font-size:16px;transition:background-color .12s ease-out}'
    + '.ovs-s-box input:hover{background:color-mix(in srgb,currentColor 10%,transparent)}'
    + '.ovs-s-box input:focus{outline:none;background:color-mix(in srgb,currentColor 13%,transparent)}'
    + '.ovs-s-box kbd{position:absolute;right:12px;top:50%;transform:translateY(-50%);font:12px/1 ui-monospace,monospace;padding:4px 7px;border-radius:6px;'
    + 'background:color-mix(in srgb,currentColor 10%,transparent);opacity:.7}.ovs-s-box input:focus+kbd{display:none}'
    + '.ovs-s-meta{font-size:13px;opacity:.7;min-height:20px;margin:8px 0 4px}'
    + '.ovs-s-list{display:grid;gap:12px}.ovs-s-g{display:grid;gap:2px}.ovs-s-gh{font-size:12px;font-weight:600;letter-spacing:.04em;opacity:.65;margin-bottom:2px}'
    + '.ovs-s-i{display:flex;align-items:center;gap:8px;min-height:40px;padding:0 12px;border-radius:10px;color:inherit;text-decoration:none;transition:background-color .12s ease-out}'
    + '.ovs-s-i:hover,.ovs-s-i[aria-selected=true]{background:color-mix(in srgb,currentColor 9%,transparent)}'
    + '.ovs-s-i:focus-visible{outline:2px solid currentColor;outline-offset:2px}.ovs-s-i .t{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    + '.ovs-s-i .st{font-size:12px;padding:2px 8px;border-radius:999px;background:color-mix(in srgb,#b45309 18%,transparent)}';
  document.head.appendChild(st);
})();
