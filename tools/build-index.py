"""Sinh <category>/index.html (gallery duyệt + chạy thật) từ <category>/manifest.json. Chạy: python3 tools/build-index.py scroll-effects"""
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
    thumb = f"thumbs/{f[:-5]}.jpg" if f else ""
    run = f'<a class="btn" href="{RUN_BASE}{e(f)}" target="_blank">Chạy bản gốc</a>' if f else ""
    badge = f'<span class="badge" title="{e(i.get("note"))}">{BADGE[i["status"]]}</span>' if i["status"] != "ok" else ""
    img = f'<a href="{RUN_BASE}{e(f)}" target="_blank"><img loading="lazy" src="{thumb}" alt=""></a>' if f else '<div class="noimg">—</div>'
    return f"""<article data-q="{e((i['title'] + ' ' + i['desc'] + ' ' + i['user']).lower())}">{img}
<div class="body"><h3>{e(i['title'])} {badge}</h3><p>{e(i['desc'])}</p>
<div class="row">{run}<a href="{e(i['url'])}" target="_blank">CodePen · {e(i['user'])}</a><a href="https://github.com/Rheinmir/uiux-asset/blob/main/{cat.name}/{e(f or '')}" target="_blank"><code>{e(f or '')}</code></a></div></div></article>"""


page = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{cat.name} — uiux-asset</title>
<script>try{{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}}catch(e){{}}</script>
<style>
:root{{--bg:#f6f7f9;--card:#fff;--fg:#1a1d21;--mute:#5d6570;--line:#e2e5ea;--acc:#2563eb;--warn:#b45309}}
@media (prefers-color-scheme:dark){{:root:not([data-theme=light]){{--bg:#0d1117;--card:#161b22;--fg:#e6edf3;--mute:#8b949e;--line:#30363d;--acc:#58a6ff;--warn:#f0b35a}}}}
:root[data-theme=dark]{{--bg:#0d1117;--card:#161b22;--fg:#e6edf3;--mute:#8b949e;--line:#30363d;--acc:#58a6ff;--warn:#f0b35a}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif}}
header{{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:1px solid var(--line);padding:14px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}}
h1{{font-size:18px;margin:0;flex:1 1 auto}}input{{flex:1 1 220px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg)}}
button{{padding:8px 12px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg);cursor:pointer}}
main{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;padding:16px;max-width:1400px;margin:auto}}
article{{background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}}
article img,.noimg{{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:#000}}.noimg{{display:grid;place-items:center;color:var(--mute)}}
.body{{padding:12px 14px;display:flex;flex-direction:column;gap:6px;flex:1}}h3{{font-size:15px;margin:0}}p{{margin:0;color:var(--mute);font-size:13px;flex:1}}
.row{{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:13px}}a{{color:var(--acc)}}code{{color:var(--mute);font-size:11px;word-break:break-all}}
.btn{{background:var(--acc);color:#fff;padding:4px 10px;border-radius:6px;text-decoration:none}}.badge{{font-size:11px;color:var(--warn);border:1px solid var(--warn);border-radius:4px;padding:0 4px;font-weight:400}}
.note{{padding:0 16px;max-width:1400px;margin:12px auto 0;color:var(--mute);font-size:13px}}
</style></head><body>
<header><h1>{cat.name} · {len(items)} mục (code gốc nguyên văn)</h1><input id="q" placeholder="Lọc theo tên, kỹ thuật, tác giả…" aria-label="Lọc">
<button id="tg" aria-label="Đổi giao diện sáng/tối">◐ Sáng/Tối</button></header>
<p class="note">Mỗi file là trang kết quả gốc của tác giả trên CodePen (pen public = MIT) — mở "Chạy bản gốc" để xem hiệu ứng thật, copy nguyên file để dùng, giữ comment ghi công ở đầu file. Chạy local cần HTTP server (<code>python3 -m http.server</code>), không mở bằng file://.</p>
<main id="g">{''.join(card(i) for i in items)}</main>
<script>
q.oninput=()=>{{const v=q.value.toLowerCase();for(const a of g.children)a.hidden=!a.dataset.q.includes(v)}};
tg.onclick=()=>{{const d=document.documentElement,dark=d.dataset.theme?d.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
d.dataset.theme=dark?'light':'dark';try{{localStorage.setItem('theme',d.dataset.theme)}}catch(e){{}}}};
</script><script src="/stats.js" defer></script></body></html>"""
(cat / "index.html").write_text(page)
print(f"{cat}/index.html · {len(items)} mục")
