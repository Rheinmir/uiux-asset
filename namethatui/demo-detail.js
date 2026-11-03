// Demo riêng cho TRANG CHI TIẾT (khung ~585×340), dựng bằng bố cục thật (flex), không toạ độ tuyệt đối → chữ dài (tiếng Việt) tự giãn, không đè nhau.
// Tự viết, không chép mã/ảnh/chữ của site gốc. Dùng: window.NT_DETAIL["<nền>/<slug>"] = chuỗi HTML.
(() => {
  const ch = '<svg class="cv" width="5" height="9" viewBox="0 0 5 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M.8.8 4.2 4.5.8 8.2"/></svg>';
  const up = '<svg class="cv" width="9" height="5" viewBox="0 0 9 5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M.8 4.2 4.5.8l3.7 3.4"/></svg>';
  const dn = '<svg class="cv" width="9" height="5" viewBox="0 0 9 5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M.8.8 4.5 4.2 8.2.8"/></svg>';
  const bk = '<svg class="cv" width="5" height="9" viewBox="0 0 5 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.2.8.8 4.5l3.4 3.7"/></svg>';
  const row = (t, o = '') => `<li class="${o}"><span>${t}</span>${o.includes('sub') ? ch : ''}</li>`;
  const bd = (n) => `<i class="bd">${n}</i>`;
  window.NT_DETAIL = {
    'web/cascading-menus': `<div class="cm"><div class="cm-row">
      <div class="cm-g">
        <div class="cm-t"><button class="cm-btn">Tệp ${dn}</button></div>
        <div class="cm-m">
          <div class="cm-w">${bd(1)}<ul class="cm-l">${row('Chuyển tới', 'on sub')}${row('Chia sẻ', 'sub')}${row('Đổi tên')}</ul></div>
          <div class="cm-w">${bd(2)}<ul class="cm-l">${row('Cá nhân')}${row('Công việc')}${row('Lưu trữ')}</ul></div>
        </div>
        <p class="cm-c"><b>submenu</b><span>mở ngay cạnh hàng vừa bấm</span></p>
      </div>
      <div class="cm-g">
        <div class="cm-t">${bd(3)}<button class="cm-btn cm-sel">Châu Âu / Pháp / Paris ${up}</button></div>
        <div class="cm-m">
          <div class="cm-w">${bd(4)}<ul class="cm-l">${row('Châu Phi', 'sub')}${row('Châu Á', 'sub')}${row('Châu Âu', 'sel sub')}</ul><ul class="cm-l">${row('Pháp', 'sel sub')}${row('Ý', 'sub')}${row('Tây Ban Nha', 'sub')}</ul><ul class="cm-l">${row('Lyon')}${row('Paris', 'sel')}${row('Nice')}</ul></div>
        </div>
        <p class="cm-c"><b>cascader</b><span>mỗi lần chọn thêm một cột mới</span></p>
      </div>
      <div class="cm-g">
        <div class="cm-t"><button class="cm-btn"><svg class="cv" width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M0 1h11M0 4.5h11M0 8h11"/></svg> Menu</button></div>
        <div class="cm-m">
          <div class="cm-w">${bd(5)}<ul class="cm-l cm-dd"><li class="back">${bk}<span>Cửa hàng</span></li>${row('Hàng mới')}${row('Quần áo', 'sub')}${row('Giày', 'sub')}</ul></div>
        </div>
        <p class="cm-c"><b>drill-down</b><span>trượt vào, hàng quay lại nằm trên cùng</span></p>
      </div>
    </div><p class="cm-n">Bấm một hàng có mũi tên: cấp kế tiếp mở cạnh nó, trong một cột mới, hoặc dưới một hàng quay lại.</p></div>`,
  };
  // co khung theo bề rộng thật (thiết kế 585 px): đặt --k cho .dmat.det
  const fit = () => document.querySelectorAll('.dmat.det').forEach((m) => m.style.setProperty('--k', Math.min(1, (m.clientWidth - 8) / 585)));
  if (typeof document !== 'undefined') { new MutationObserver(fit).observe(document.documentElement, { childList: true, subtree: true }); addEventListener('resize', fit); fit(); }
})();
