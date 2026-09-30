#!/usr/bin/env python3
"""build-aw-css — aw.css: lớp giao diện của cả site, CHÉP NGUYÊN VĂN từ UI kit awwwards-com (Rheinmir/ui-kits).

Không gõ lại token hay component: cắt thẳng 3 đoạn CSS của kit (token + nền · toàn bộ .aw-* · thang tiêu đề) và bảng màu tối
(`V.dark` trong script của kit). Phần tự viết chỉ là SITE ở cuối file này: bố cục ghép từ class kit + ánh xạ token --ovs-*
của html_base sang token aw cho các trang dựng bằng html_base (components, stats).

    python3 tools/build-aw-css.py [đường/dẫn/kit.html]    # mặc định ui-kits/awwwards-com/latest/index.html (bản mirror trong repo)
    python3 tools/build-aw-css.py --check                 # rc 1 nếu aw.css lệch kit (kit lên phiên bản mới mà chưa build lại)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
args = [a for a in sys.argv[1:] if not a.startswith("--")]
KIT = Path(args[0]) if args else ROOT / "ui-kits/awwwards-com/latest/index.html"

# Icon chỉ lấy đúng các tên site dùng (icon_names phải xếp a→z) — cả bộ Material Symbols nặng vài trăm KB.
FONTS = ("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900"
         "&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..24,300..500,0..1,0"
         "&icon_names=dark_mode,light_mode,open_in_new,search,sentiment_satisfied&display=block")

SITE = r"""
/* ================= SITE uiux-asset — phần tự viết, chỉ dùng biến của kit ================= */
:root { --aw-ink2: #5d5d5d; }                       /* chữ phụ đủ tương phản (kit chỉ có --aw-img-ink #8a8a8a cho ảnh giữ chỗ) */
:root[data-theme="dark"] { --aw-ink2: #b4b4b4; }
.aw-wrap { max-width: 1560px; margin: 0 auto; padding: 8px clamp(16px, 3.6vw, 52px) 0; display: flex; flex-direction: column; gap: 24px; }   /* = .d-inner của màn mẫu desktop */
.aw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr)); gap: 30px 20px; }                          /* = .d-grid */
.aw-grid .aw-card-site, .aw-grid .aw-card-slide { max-width: none; min-width: 0; }
.aw-site-head { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.aw-site-head .aw-marquee { border-radius: var(--aw-rounded-normal); }
.aw-brand { margin: 0 20px 0 10px; font: 800 18px/1 var(--aw-font); color: inherit; text-decoration: none; white-space: nowrap; }
.aw-hnav a[aria-current="page"] { font-weight: 700; }
.aw-wrap > .aw-site-head { margin-bottom: 0; }
.aw-fig img { display: block; width: 100%; aspect-ratio: 16 / 12; object-fit: cover; background: var(--aw-img); }
/* ponytail: ảnh xem trước là iframe trang thật thu 1/4 (loading=lazy) — nặng khi kho lên vài trăm mục; lúc đó chụp thumbnail ở bước CI */
.aw-shot { display: block; position: relative; aspect-ratio: 16 / 12; overflow: hidden; background: var(--aw-img); }
.aw-shot iframe { position: absolute; top: 0; left: 0; width: 400%; height: 400%; border: 0; transform: scale(.25); transform-origin: 0 0; pointer-events: none; }
.aw-desc { margin: 6px 0 0; font-size: 13px; line-height: 20px; font-weight: 400; color: var(--aw-ink2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.aw-desc a { color: inherit; }
a.aw-tag { text-decoration: none; }
a.aw-tag:hover { border-color: var(--aw-color-primary); }
.aw-filters .aw-search { background: var(--aw-nf-bg-3); max-width: 420px; }
.aw-filter[aria-pressed="true"] { background: var(--aw-nf-bg-3); font-weight: 600; }
.aw-lead { margin: 0; max-width: 62ch; font: 400 var(--aw-text-medium)/28px var(--aw-font); text-align: center; text-wrap: balance; }
.aw-wrap .aw-home-search { width: 100%; max-width: 720px; margin: 0 auto; font-size: 14px; line-height: 20px; }
[hidden] { display: none !important; }
@media (max-width: 700px) {
  .aw-site-head .aw-marquee { display: none; }
  .aw-header { height: auto; min-height: var(--aw-nf-height); flex-wrap: wrap; gap: 4px 16px; padding: 6px; }
  .aw-brand { margin: 0 8px; }
  .aw-hnav { order: 3; flex-basis: 100%; padding: 0 8px; }
  .aw-filters { height: auto; flex-wrap: wrap; }
  .aw-filters .aw-search { flex: 1 1 100%; max-width: none; }
}

/* ---------- trang dựng bằng html_base (components, stats): mặc token aw, giữ nguyên nội dung ---------- */
html:root { --ovs-bg: var(--aw-bg-primary); --ovs-surface: var(--aw-card); --ovs-surface2: var(--aw-bg-white); --ovs-ink: var(--aw-color-primary); --ovs-ink2: var(--aw-ink2); --ovs-border: var(--aw-border-gray); --ovs-accent: var(--aw-color-primary); --ovs-r: var(--aw-rounded-normal);
  --font-text: var(--aw-font); --font-display: var(--aw-font); --font-chart: var(--aw-font); }
.ovs-theme { display: none; }                        /* công tắc nổi của html_base: đã có nút ở header */
html:has(#ovs-base) body { max-width: none; margin: 0; padding: 8px clamp(16px, 3.6vw, 52px) 0; font-size: 15px; line-height: 1.6; font-weight: 400; }
html:has(#ovs-base) body:not(:has(> .kpis)) > :not(.aw-site-head, .aw-footer) { max-width: 980px; margin-inline: auto; }
html:has(#ovs-base) body:has(> .kpis) { height: auto; grid-template-columns: minmax(0, 1fr); grid-template-rows: none; grid-auto-rows: auto; }   /* stats: thêm header/footer nên bỏ khung vừa-màn-hình, để trang cuộn */
html:has(#ovs-base) :is(h1, h2) { text-transform: uppercase; }
"""


def cut(css: str, start: str, end: str) -> str:
    a = css.index(start)
    return css[a:css.index(end, a)].rstrip() + "\n"


def render() -> str:
    html = KIT.read_text(encoding="utf-8")
    css = html[html.index("<style>") + 7:html.index("</style>")]
    ver = re.search(r'<meta name="ui-kit-id" content="([^"]+)"', html).group(1)
    dark = json.loads(re.search(r"\n dark:(\{.*?\})\n", html, re.S).group(1))
    dark_css = (':root[data-theme="dark"] { ' + " ".join(f"--aw-{k}:{v};" for k, v in dark.items())
                + " --aw-color-underlined:238, 238, 238; color-scheme: dark; }\n")
    return "".join([
        f"/* aw.css — SINH TỰ ĐỘNG bởi tools/build-aw-css.py từ UI kit `{ver}` (Rheinmir/ui-kits). Đừng sửa tay: sửa SITE trong tool rồi build lại. */\n",
        f'@import url("{FONTS}");\n',
        cut(css, ":root {", "/* ---------- vỏ trang (kit) ---------- */"),
        dark_css,
        cut(css, "/* ================= THÀNH PHẦN", "/* trạng thái */"),
        cut(css, ":root { --aw-h1:", "@media (max-width: 899px)"),
        "@media (max-width: 899px) { .aw-footer__top { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n",
        SITE,
    ])


if __name__ == "__main__":
    out, new = ROOT / "aw.css", render()
    if "--check" in sys.argv:
        sys.exit(0 if out.is_file() and out.read_text(encoding="utf-8") == new else 1)
    out.write_text(new, encoding="utf-8")
    print(f"aw.css · {len(new) // 1024}KB từ {KIT}")
