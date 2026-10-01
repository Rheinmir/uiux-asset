// Thẻ UI kit (aw-card-site của kit awwwards-com). Dữ liệu = kits.json do workflow của Rheinmir/ui-kits đẩy sang GitHub Pages
// mỗi lần kho kit có commit mới → kit/phiên bản mới TỰ hiện trên site, không cần deploy lại.
(() => {
  const local = /^(localhost|127\.)/.test(location.hostname);           // chạy thử local: đọc bản mirror cạnh file này
  const BASE = local ? new URL('.', document.currentScript.src).href : 'https://rheinmir.github.io/uiux-asset/ui-kits/';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const day = (s) => (s ? `${s.slice(8, 10)}/${s.slice(5, 7)}` : '');
  const src = (s) => { try { const u = new URL(s); return `<a href="${esc(u.href)}" target="_blank" rel="noopener">${esc(u.hostname.replace(/^www\./, '') + (u.pathname.length > 1 ? u.pathname : ''))}</a>`; } catch { return esc(s); } };

  function card(k) {
    const url = `${BASE}${k.id}/v${k.latest}/`;
    const older = k.versions.filter((v) => v !== k.latest).sort((a, b) => b - a)
      .map((v) => `<a class="aw-tag aw-tag--medium" href="${BASE}${k.id}/v${v}/" target="_blank" rel="noopener" aria-label="${esc(k.id)} phiên bản ${v}">v${v}</a>`).join('');
    return `<article class="aw-card-site" data-q="${esc((k.id + ' ' + k.source).toLowerCase())}">
      <a class="aw-fig" href="${url}" target="_blank" rel="noopener" aria-label="Mở UI kit ${esc(k.id)}"><span class="aw-shot"><iframe loading="lazy" src="${url}" title="Xem trước ${esc(k.id)}" tabindex="-1" aria-hidden="true"></iframe></span>
        <div class="aw-fig__hover" aria-hidden="true"><div><div class="aw-fig__row"><small>UI KIT</small></div><div class="aw-fig__row"><h3>${esc(k.id)}</h3></div></div><div class="aw-fig__bts"><span class="ms">open_in_new</span></div></div></a>
      <div class="aw-card-site__info"><a class="aw-av" href="${url}" target="_blank" rel="noopener" style="font-size:15px"><span class="aw-av__img">${esc(k.id[0].toUpperCase())}</span><h3 class="aw-av__title">${esc(k.id)}</h3></a>
        <span class="grow"></span>${older}<span class="aw-tag aw-tag--medium aw-tag--dev">${day(k.date)}</span><span class="aw-tag aw-tag--medium aw-tag--sotd">v${k.latest}</span><button type="button" class="aw-tag aw-tag--medium aw-cart-add" data-k="kit" data-id="${esc(k.id)}" data-v="${k.latest}" data-t="UI kit · ${esc(k.id)}">+ Giỏ</button></div>
      ${k.source ? `<p class="aw-desc">Rút từ ${src(k.source)}</p>` : ''}</article>`;
  }

  window.awKits = { card, load: () => fetch(BASE + 'kits.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }) };
})();
