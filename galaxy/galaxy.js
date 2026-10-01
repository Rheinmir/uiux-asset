// Xem trước element của uiverse-io/galaxy: mỗi element chạy trong iframe sandbox riêng (CSS gốc dùng selector trần như
// `button {}` nên phải cô lập), chỉ dựng khi thẻ sắp vào màn hình. Code đọc nguyên văn từ galaxy/<Nhóm>/<file>.html.
(() => {
  const local = /^(localhost|127\.)/.test(location.hostname);
  const BASE = local ? new URL('.', document.currentScript.src).href : 'https://rheinmir.github.io/uiux-asset/galaxy/';
  const cache = new Map();
  const code = (it) => {
    const k = it[0] + '/' + it[1];
    if (!cache.has(k)) cache.set(k, fetch(BASE + k).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }));
    return cache.get(k);
  };
  // Khung xem trước: nền theo giao diện site, căn giữa; mục Tailwind (không có <style>) nạp Tailwind CDN như trên Uiverse.
  const doc = (html, tw) => {
    const bg = document.documentElement.dataset.theme === 'dark' ? '#212121' : '#e8e8e8';
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${tw ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}`
      + `<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;background:${bg};font-family:system-ui,sans-serif;overflow:hidden}</style></head><body>${html}</body></html>`;
  };
  const frames = new Set();
  const paint = (f) => code(f._it).then((h) => { f.srcdoc = doc(h, f._it[5]); }).catch(() => { f.srcdoc = doc('<p style="font:14px system-ui;color:#888">Không tải được element này.</p>', 0); });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); frames.add(e.target); paint(e.target); } }), { rootMargin: '400px' });
  new MutationObserver(() => frames.forEach(paint)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });   // đổi sáng/tối → vẽ lại nền

  function frame(it) {
    const f = document.createElement('iframe');
    f.sandbox = 'allow-scripts'; f.loading = 'lazy'; f.title = `${it[0]}: ${it[3]} của ${it[2]}`; f._it = it;
    io.observe(f);
    return f;
  }

  const idx = new URL('index.json', document.currentScript.src).href;   // index.json đi cùng trang (Vercel), file element ở GitHub Pages
  window.awGalaxy = { BASE, code, frame, load: () => fetch(idx).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }) };
})();
