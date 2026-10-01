// Giỏ mẫu kiểu đi chợ: bấm "+ Giỏ" trên thẻ bất kỳ (galaxy, scroll-effects, chip, ui-kit) → giỏ ở góc header → "Xuất ui-kit"
// lưu giỏ lên /api/cart, trả link /c/<id> (người xem) + /c/<id>.md (agent đọc) + tải HTML/MD. Giỏ đang chọn nằm trong localStorage.
// Nút trên thẻ: <button class="aw-cart-add" data-k="galaxy|scroll|chip|kit" data-id="…" [data-v] data-t="tên hiển thị">. aw.js tự nạp file này.
(() => {
  const KEY = 'aw-cart', MAX = 60, $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const KIND = { galaxy: 'Galaxy', scroll: 'Scroll effect', chip: 'Chip', kit: 'UI kit' };
  let st = { name: '', items: [], out: null };
  try { st = { ...st, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} sync(); if (drawer && !drawer.hidden) draw(); };
  const key = (x) => x.k + ':' + x.id;
  const has = (x) => st.items.some((y) => key(y) === key(x));

  function toggle(x) {
    if (has(x)) st.items = st.items.filter((y) => key(y) !== key(x));
    else if (st.items.length >= MAX) return alertLine(`Giỏ tối đa ${MAX} mục.`);
    else { st.items.push(x); pulse(); }
    st.out = null; save();
  }

  // ---------- bong bóng giỏ nổi góc dưới: menu nổi .aw-float của kit (màn mẫu mobile) ----------
  const fab = document.createElement('div');
  fab.className = 'aw-float aw-cart-fab';
  fab.innerHTML = `<button type="button" class="aw-float__logo" data-open aria-label="Mở giỏ mẫu"><span class="ms">shopping_bag</span><i class="aw-count" id="aw-fab-n">0</i></button>
    <button type="button" class="aw-float__item aw-float__item--anchor is-on" data-open id="aw-fab-t">Giỏ trống</button>
    <button type="button" class="aw-btn aw-btn--medium aw-btn--ch" data-open data-checkout id="aw-fab-go">Chốt sổ</button>`;
  fab.addEventListener('click', (e) => { if (e.target.closest('[data-open]')) open(); });
  (document.body ? Promise.resolve() : new Promise((r) => document.addEventListener('DOMContentLoaded', r))).then(() => document.body.append(fab));
  const pulse = () => { fab.classList.remove('is-pop'); void fab.offsetWidth; fab.classList.add('is-pop'); };

  // ---------- nút "+ Giỏ" trên thẻ ----------
  const fromBtn = (b) => ({ k: b.dataset.k, id: b.dataset.id, ...(b.dataset.v ? { v: +b.dataset.v } : {}), t: b.dataset.t || b.dataset.id });
  document.addEventListener('click', (e) => { const b = e.target.closest('.aw-cart-add'); if (b) { e.preventDefault(); toggle(fromBtn(b)); } });
  function sync() {
    document.querySelectorAll('.aw-cart-add').forEach((b) => { const on = has(fromBtn(b));
      if (b.getAttribute('aria-pressed') !== String(on)) { b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ Trong giỏ' : '+ Giỏ'; } });
    const n = $('#aw-cart-n'); if (n) n.textContent = st.items.length;
    const c = st.items.length;
    $('#aw-fab-n', fab).textContent = c; $('#aw-fab-n', fab).hidden = !c;
    $('#aw-fab-t', fab).textContent = c ? `Giỏ mẫu · ${c} mục` : 'Giỏ trống'; $('#aw-fab-go', fab).hidden = !c;
  }
  let q = 0; new MutationObserver((rs) => { if (rs.every((r) => drawer?.contains(r.target))) return; if (!q) q = requestAnimationFrame(() => { q = 0; sync(); }); }).observe(document.documentElement, { childList: true, subtree: true });

  // trang chip: mỗi hình một nút (trang dựng bằng html_base, không sửa builder)
  const chips = () => {
    document.querySelectorAll('section.fig[id^="f"] > h3').forEach((h) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'aw-tag aw-tag--medium aw-cart-add';
      Object.assign(b.dataset, { k: 'chip', id: h.parentElement.id, t: 'Chip · ' + h.lastChild.textContent.trim() }); h.append(b);
    });
    sync();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chips); else chips();   // cart.js nạp động, có thể sau DOMContentLoaded

  // ---------- ngăn kéo giỏ ----------
  let drawer, scrim, lastFocus;
  function build() {
    scrim = document.createElement('div'); scrim.className = 'aw-cart-scrim'; scrim.hidden = true; scrim.onclick = close;
    drawer = document.createElement('aside'); drawer.className = 'aw-cart'; drawer.hidden = true;
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', 'Giỏ mẫu');
    document.body.append(scrim, drawer);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) close(); });
    drawer.addEventListener('click', onDrawerClick);
    drawer.addEventListener('input', (e) => { if (e.target.id === 'aw-cart-name') { st.name = e.target.value; st.out = null; try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} } });
  }
  function draw() {
    const o = st.out, prompt = o ? `Đọc ${o.md} — bộ mẫu UI/UX tôi đã chọn — rồi dựng giao diện bám đúng các mẫu đó.` : '';
    drawer.innerHTML = `<header class="aw-cart__h"><h2>Giỏ mẫu <span class="aw-tag aw-tag--bold">${st.items.length}</span></h2>
      <button type="button" class="aw-btn aw-btn--small aw-btn--outline" data-act="close" aria-label="Đóng giỏ">Đóng</button></header>
      <label class="aw-cart__name">Tên bộ ui-kit<input id="aw-cart-name" type="text" maxlength="80" placeholder="vd: landing app tài chính — tông tối" value="${esc(st.name)}"></label>
      ${st.items.length ? `<ol class="aw-cart__list">${st.items.map((x, i) => `<li><span><b>${esc(x.t)}</b><small>${KIND[x.k] || x.k}${x.v ? ' · v' + x.v : ''}</small></span>
        <button type="button" class="aw-cart__rm" data-act="rm" data-i="${i}" aria-label="Bỏ ${esc(x.t)} khỏi giỏ">×</button></li>`).join('')}</ol>`
        : '<p class="aw-cart__empty">Giỏ trống. Đi một vòng Galaxy, Scroll effects, Components, UI kits — thấy mẫu nào ưng thì bấm <b>+ Giỏ</b>. Xong thì xuất thành một ui-kit để tải về hoặc gửi link cho agent.</p>'}
      ${o ? `<div class="aw-cart__out" role="status"><b>Đã xuất ui-kit</b>
        <label>Link xem<input readonly value="${esc(o.url)}"></label><label>Link cho agent (Markdown, có đủ code)<input readonly value="${esc(o.md)}"></label>
        <label>Câu dán cho agent<textarea readonly rows="3">${esc(prompt)}</textarea></label>
        <div class="aw-cart__row"><button type="button" class="aw-btn aw-btn--small" data-act="copy" data-v="${esc(prompt)}">Copy câu cho agent</button>
        <button type="button" class="aw-btn aw-btn--small aw-btn--outline" data-act="copy" data-v="${esc(o.url)}">Copy link</button>
        <a class="aw-btn aw-btn--small aw-btn--outline" href="${esc(o.url)}" target="_blank" rel="noopener">Mở</a>
        <a class="aw-btn aw-btn--small aw-btn--outline" href="/api/cart?id=${esc(o.id)}&amp;format=html&amp;dl=1">Tải HTML</a>
        <a class="aw-btn aw-btn--small aw-btn--outline" href="/api/cart?id=${esc(o.id)}&amp;format=md&amp;dl=1">Tải MD</a></div></div>` : ''}
      <p class="aw-cart__msg" id="aw-cart-msg" role="status"></p>
      <footer class="aw-cart__f"><button type="button" class="aw-btn" data-act="export"${st.items.length ? '' : ' disabled'}>Chốt sổ · xuất ui-kit</button>
        <button type="button" class="aw-btn aw-btn--outline" data-act="clear"${st.items.length ? '' : ' disabled'}>Giỏ mới</button></footer>`;
  }
  function alertLine(t) { const m = $('#aw-cart-msg'); if (m) m.textContent = t; else open(t); }
  async function onDrawerClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'close') close();
    if (act === 'rm') { st.items.splice(+b.dataset.i, 1); st.out = null; save(); }
    if (act === 'clear') { st = { name: '', items: [], out: null }; save(); }
    if (act === 'copy') navigator.clipboard.writeText(b.dataset.v).then(() => alertLine('Đã copy.'), () => alertLine('Trình duyệt chặn clipboard — copy tay ở ô trên.'));
    if (act === 'export') {
      b.disabled = true; alertLine('Đang xuất…');
      try {
        const r = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: st.name, items: st.items.map(({ k, id, v }) => ({ k, id, v })) }) });
        const j = await r.json(); if (!r.ok) throw new Error(j.error || 'HTTP ' + r.status);
        st.out = j; save(); alertLine(''); $('.aw-cart__out input', drawer).focus();   // vẽ lại xoá nút đang focus → đưa focus về link
      } catch (err) { b.disabled = false; alertLine('Chưa xuất được: ' + err.message); }
    }
  }
  function open(msg) {
    if (!drawer) build();
    lastFocus = document.activeElement; draw(); drawer.hidden = scrim.hidden = false;
    if (msg) $('#aw-cart-msg').textContent = msg;
    $('#aw-cart-name', drawer).focus();
  }
  function close() { drawer.hidden = scrim.hidden = true; if (lastFocus) lastFocus.focus(); }
  document.addEventListener('click', (e) => { if (e.target.closest('#aw-cart-btn')) open(); });
  window.awCart = { open, toggle, has };
  sync();
})();
