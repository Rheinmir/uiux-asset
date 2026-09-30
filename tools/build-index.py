"""Sinh <category>/index.html (gallery duyệt + chạy thật) từ <category>/manifest.json. Chạy: python3 tools/build-index.py scroll-effects
Giao diện = class của UI kit awwwards-com (../aw.css + ../aw.js): thanh lọc aw-filters, breadcrumb aw-crumb, lưới thẻ aw-card-site."""
import html, json, sys
from pathlib import Path

cat = Path(sys.argv[1])
# Trang lẻ host ở GitHub Pages; gallery (có thể host riêng, vd Vercel) chỉ tham chiếu tới bằng link tuyệt đối.
RUN_BASE = f"https://rheinmir.github.io/uiux-asset/{cat.name}/"
items = json.loads((cat / "manifest.json").read_text())
BADGE = {"ok": "", "partial": "thiếu ảnh", "upstream-drift": "lib đổi API", "upstream-broken": "hỏng tại nguồn", "missing": "pen đã xoá"}


def card(i):
    e = lambda s: html.escape(str(s or ""))
    f = i.get("file")
    badge = f'<span class="aw-tag aw-tag--medium aw-tag--red" title="{e(i.get("note"))}">{BADGE[i["status"]]}</span>' if i["status"] != "ok" else ""
    hover = (f'<div class="aw-fig__hover" aria-hidden="true"><div><div class="aw-fig__row"><small>CHẠY BẢN GỐC</small></div>'
             f'<div class="aw-fig__row"><h3>{e(i["title"])}</h3></div></div><div class="aw-fig__bts"><span class="ms">open_in_new</span></div></div>')
    fig = (f'<a class="aw-fig" href="{RUN_BASE}{e(f)}" target="_blank" rel="noopener" aria-label="Chạy bản gốc: {e(i["title"])}">'
           f'<img loading="lazy" src="thumbs/{f[:-5]}.jpg" alt="">{hover}</a>') if f else '<div class="aw-fig"><div class="aw-ph">pen đã xoá</div></div>'
    code = (f'<a class="aw-tag aw-tag--medium" href="https://github.com/Rheinmir/uiux-asset/blob/main/{cat.name}/{e(f)}" target="_blank" rel="noopener" '
            f'title="{e(f)}">Code</a>') if f else ""
    return f"""<article class="aw-card-site" data-q="{e((i['title'] + ' ' + i['desc'] + ' ' + i['user']).lower())}">{fig}
<div class="aw-card-site__info"><h3 class="aw-av__title" style="font-size:15px">{e(i['title'])}</h3><span class="grow"></span>{badge}{code}</div>
<div class="aw-card-site__info" style="padding-top:4px"><a class="aw-av" href="{e(i['url'])}" target="_blank" rel="noopener" style="font-size:13px"><span class="aw-av__img">{e(i['user'][:1].upper())}</span><span>CodePen · {e(i['user'])}</span></a></div>
<p class="aw-desc">{e(i['desc'])}</p></article>"""


page = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{cat.name} — uiux-asset</title>
<script>try{{document.documentElement.dataset.theme=localStorage.getItem('ovs-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}}catch(e){{}}</script>
<link rel="stylesheet" href="../aw.css"></head><body>
<main class="aw-wrap"><script src="../aw.js"></script>
<div class="aw-filters"><label class="aw-search"><button type="button" aria-label="Tìm" tabindex="-1"><span class="ms">search</span></button><input id="q" type="search" placeholder="Lọc theo tên, kỹ thuật, tác giả…" aria-label="Lọc"></label>
<span class="grow"></span><span class="aw-filter has-count" title="Số mục đang hiện"><span class="aw-count" id="n">{len(items)}</span></span></div>
<div class="aw-crumb"><h1>{cat.name}. Code gốc nguyên văn <span class="aw-tag aw-tag--bold">{len(items)}</span></h1><span>Mỗi file là trang kết quả gốc của tác giả trên CodePen (pen public = MIT) — bấm ảnh để chạy thật, copy nguyên file để dùng, giữ comment ghi công ở đầu file. Chạy local cần HTTP server (<code>python3 -m http.server</code>), không mở bằng file://.</span></div>
<div class="aw-grid" id="g">{''.join(card(i) for i in items)}</div>
</main>
<script>
q.oninput=()=>{{const v=q.value.toLowerCase();let c=0;for(const a of g.children){{a.hidden=!a.dataset.q.includes(v);c+=!a.hidden}}n.textContent=c}};
</script><script src="/stats.js" defer></script></body></html>"""
(cat / "index.html").write_text(page)
print(f"{cat}/index.html · {len(items)} mục")
