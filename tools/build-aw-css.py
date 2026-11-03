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
         "&icon_names=dark_mode,light_mode,open_in_new,search,sentiment_satisfied,shopping_bag&display=block")

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
.gx-mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
.gx-mosaic iframe { position: static; width: 100%; height: 100%; border: 0; transform: none; pointer-events: none; }   /* gỡ thu-1/4 của .aw-shot iframe */
a.aw-tag { text-decoration: none; }
a.aw-tag:hover { border-color: var(--aw-color-primary); }
.aw-count { width: auto; min-width: 20px; padding: 0 5px; }   /* kit: ô 20px chỉ vừa 2 chữ số */
.aw-filters .aw-search { background: var(--aw-nf-bg-3); max-width: 420px; }
.aw-filter[aria-pressed="true"] { background: var(--aw-nf-bg-3); font-weight: 600; }
.aw-lead { margin: 0; max-width: 62ch; font: 400 var(--aw-text-medium)/28px var(--aw-font); text-align: center; text-wrap: balance; }
.aw-wrap .aw-home-search { width: 100%; max-width: 720px; margin: 0 auto; font-size: 14px; line-height: 20px; }
[hidden] { display: none !important; }
/* giỏ mẫu (cart.js): nút trên thẻ + ngăn kéo phải — ghép từ aw-btn / aw-tag / aw-search của kit */
button.aw-tag { cursor: pointer; font-family: inherit; }
.aw-cart-add { background: transparent; }   /* chỉ nút giỏ; nút solid của kit (Copy) giữ nền */
.aw-cart-add[aria-pressed="true"] { background: var(--aw-inverse-bg); color: var(--aw-inverse-ink); border-color: var(--aw-inverse-bg); }
h3 > .aw-cart-add { margin-left: 10px; vertical-align: middle; }
#aw-cart-btn .aw-count { margin-left: 6px; }
.aw-cart-scrim { position: fixed; inset: 0; z-index: 60; background: var(--aw-overlay); }
.aw-cart { position: fixed; top: 0; right: 0; bottom: 0; z-index: 61; width: min(460px, 100vw); display: flex; flex-direction: column; gap: 14px; padding: 20px;
  background: var(--aw-bg-primary); color: var(--aw-color-primary); border-left: 1px solid var(--aw-border-gray); overflow-y: auto; font: 400 14px/22px var(--aw-font); }
.aw-cart__h { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.aw-cart__h h2 { margin: 0; font: 600 22px/28px var(--aw-font); display: flex; gap: 8px; align-items: center; }
.aw-cart label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; font-size: 13px; }
.aw-cart input, .aw-cart textarea { height: var(--aw-sf-height); padding: 0 12px; border: 1px solid var(--aw-border-input); border-radius: var(--aw-rounded-normal); background: var(--aw-bg-input); color: var(--aw-color-input); font: 400 14px var(--aw-font); }
.aw-cart textarea { height: auto; padding: 10px 12px; resize: vertical; line-height: 20px; }
.aw-cart__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.aw-cart__list li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--aw-border-gray); }
.aw-cart__list span { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.aw-cart__list b { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.aw-cart__list small { color: var(--aw-ink2); font-size: 12px; }
.aw-cart__rm { width: 36px; height: 36px; flex: none; border: 1px solid var(--aw-border-gray); border-radius: var(--aw-rounded-normal); background: transparent; color: inherit; font-size: 18px; cursor: pointer; }
.aw-cart__rm:hover { background: var(--aw-bg-3rd); }
.aw-cart__empty, .aw-cart__msg { margin: 0; color: var(--aw-ink2); }
.aw-cart__msg:empty { display: none; }
.aw-cart__out { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: var(--aw-rounded-normal); background: var(--aw-bg-white); border: 1px solid var(--aw-border-gray); }
.aw-cart__row, .aw-cart__f { display: flex; flex-wrap: wrap; gap: 8px; }
.aw-cart__f { margin-top: auto; padding-top: 12px; }
.aw-cart__f .aw-btn { flex: 1; }
.aw-btn[disabled] { opacity: .45; cursor: not-allowed; }
/* bong bóng giỏ: .aw-float của kit, cố định góc dưới phải (mobile: giữa đáy như màn mẫu) */
.aw-cart-fab { position: fixed; right: 24px; bottom: 24px; z-index: 55; box-shadow: 0 8px 24px rgba(0,0,0,.18); }
.aw-cart-fab button { cursor: pointer; font-family: var(--aw-font); }
.aw-cart-fab .aw-float__logo { position: relative; border: none; }
.aw-cart-fab .aw-float__item { white-space: nowrap; }
.aw-cart-fab .aw-btn--ch { background: #f8f8f8; color: #121212; }   /* menu nổi luôn nền tối → nút chốt sáng ở cả 2 giao diện */
.aw-cart-fab .aw-float__logo .ms { font-size: 26px; }
.aw-cart-fab .aw-count { position: absolute; top: -6px; right: -6px; font-style: normal; }
.aw-cart-fab.is-pop { animation: aw-pop .18s ease-out; }              /* phản hồi khi thêm: ngắn, ease-out */
@keyframes aw-pop { 50% { transform: scale(1.06); } }
body:has(.aw-cart-fab:not([hidden])) .aw-footer { padding-bottom: 104px; }   /* chừa chỗ cho bong bóng khi giỏ có mục */
@media (max-width: 700px) { .aw-cart-fab { right: auto; left: 50%; transform: translateX(-50%); bottom: 16px; } .aw-cart-fab.is-pop { animation: none; } }
/* header dính: dải chạy cuộn đi, thanh header ở lại (top = -(50 marquee + 8 gap) + 8 lề) */
.aw-site-head { position: sticky; top: -50px; z-index: 50; }
.aw-site-head .aw-header { box-shadow: 0 0 0 8px var(--aw-bg-primary); }   /* che nội dung trôi phía sau ở mép trên */
.aw-hnav a { position: relative; }
.aw-hnav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 2px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .25s ease-out; }
.aw-hnav a:hover::after, .aw-hnav a[aria-current="page"]::after { transform: scaleX(1); }
/* ảnh thẻ: phóng nhẹ khi rê */
.aw-fig > img, .aw-fig > .aw-shot { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.aw-fig:hover > img, .aw-fig:hover > .aw-shot { transform: scale(1.025); }
.aw-fig:focus-visible { outline: 2px solid var(--aw-color-primary); outline-offset: 3px; }
/* trang chủ */
.aw-sotd { padding: clamp(24px, 6vw, 72px) 0 8px; }
.aw-kpis { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-block: 1px solid var(--aw-border-gray); }
.aw-kpis a { display: flex; flex-direction: column; gap: 6px; padding: 22px 20px 20px; color: inherit; text-decoration: none; border-left: 1px solid var(--aw-border-gray); transition: background .25s ease-out; }
.aw-kpis a:first-child { border-left: 0; }
.aw-kpis a:hover { background: var(--aw-ch-bg); }
.aw-kpis b { font: 600 clamp(30px, 3.6vw, 52px)/1 var(--aw-font); letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.aw-kpis span { display: flex; align-items: center; gap: 8px; font: 400 13px/18px var(--aw-font); color: var(--aw-ink2); }
.aw-kpis span::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--c); flex: none; }
.aw-sec-h { margin-top: 32px; display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--aw-border-gray); }
.aw-sec-h h2 { margin: 0; font: 600 var(--aw-fluid-20)/1.2 var(--aw-font); text-transform: uppercase; letter-spacing: -.01em; }
.aw-sec-h a { font: 400 14px/20px var(--aw-font); color: inherit; }
.aw-bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 30px 20px; }
.aw-bento > * { grid-column: span 2; max-width: none; min-width: 0; }
.aw-bento > :nth-child(-n+2) { grid-column: span 3; }
.aw-bento > :nth-child(-n+2) .aw-fig img, .aw-bento > :nth-child(-n+2) .aw-shot { aspect-ratio: 16 / 10; }
.aw-card-site__info .aw-av { flex: 1 1 90px; min-width: 0; }
.aw-card-site__info .aw-av__title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.aw-card-site__info .aw-av + .grow { display: none; }
/* footer */
.aw-footer { margin-top: 48px; border-top: 1px solid var(--aw-border-gray); }
.aw-footer__top { grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)) minmax(0, 1.2fr); align-items: start; }
.aw-footer__brand { font: 600 clamp(36px, 5vw, 72px)/.9 var(--aw-font); color: inherit; text-decoration: none; letter-spacing: -.02em; }
.aw-footer__menu { gap: 6px; font-weight: 400; }
.aw-footer__menu b { font-weight: 600; }
.aw-footer__menu a { color: var(--aw-ink2); text-decoration: none; }
.aw-footer__menu a:hover { color: var(--aw-color-primary); }
.aw-footer__note { margin: 0; color: var(--aw-ink2); font-size: 13px; line-height: 20px; }
.aw-footer__bottom a { color: inherit; }
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
@media (max-width: 899px) {
  .aw-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .aw-bento > *, .aw-bento > :nth-child(-n+2) { grid-column: span 1; }
  .aw-bento > :first-child { grid-column: span 2; }
  .aw-kpis { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .aw-kpis a:nth-child(4) { border-left: 0; }
  .aw-kpis a:nth-child(n+4) { border-top: 1px solid var(--aw-border-gray); }
  .aw-footer__top { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .aw-footer__brand, .aw-footer__note { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .aw-bento { grid-template-columns: minmax(0, 1fr); }
  .aw-bento > :first-child { grid-column: auto; }
  .aw-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .aw-kpis a { padding: 16px 12px; border-left: 0; border-top: 1px solid var(--aw-border-gray); }
  .aw-kpis a:nth-child(-n+2) { border-top: 0; }
  .aw-kpis a:nth-child(even) { border-left: 1px solid var(--aw-border-gray); }
  .aw-kpis a:last-child { grid-column: 1 / -1; border-left: 0; }
  .aw-footer__top { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 700px) {
  .aw-site-head { position: static; }
  .aw-site-head .aw-marquee { display: none; }
  .aw-gh { display: none; }
  .aw-header .aw-btn { flex: none; }
  .aw-hnav { flex-wrap: nowrap; overflow-x: auto; white-space: nowrap; scrollbar-width: none; gap: 18px; mask-image: linear-gradient(90deg, #000 85%, transparent); }
  .aw-hnav::-webkit-scrollbar { display: none; }
  .aw-header { height: auto; min-height: var(--aw-nf-height); flex-wrap: wrap; gap: 4px 16px; padding: 6px; }
  .aw-brand { margin: 0 8px; }
  .aw-hnav { order: 3; flex-basis: 100%; padding: 0 8px 2px; }
  .aw-filters { height: auto; flex-wrap: wrap; }
  .aw-filters .aw-search { flex: 1 1 160px; max-width: none; }
  .aw-filters[role="group"] { flex-wrap: nowrap; height: var(--aw-nf-height); scrollbar-width: none; }   /* hàng nhóm: vuốt ngang, không chồng 6 dòng */
  .aw-filters[role="group"]::-webkit-scrollbar { display: none; }
}

/* ---------- trang dựng bằng html_base (components, stats): mặc token aw, giữ nguyên nội dung ---------- */
html:root { --ovs-bg: var(--aw-bg-primary); --ovs-surface: var(--aw-card); --ovs-surface2: var(--aw-bg-white); --ovs-ink: var(--aw-color-primary); --ovs-ink2: var(--aw-ink2); --ovs-border: var(--aw-border-gray); --ovs-accent: var(--aw-color-primary); --ovs-r: var(--aw-rounded-normal);
  --font-text: var(--aw-font); --font-display: var(--aw-font); --font-chart: var(--aw-font); }
.ovs-theme { display: none; }                        /* công tắc nổi của html_base: đã có nút ở header */
html:has(#ovs-base) body { max-width: none; margin: 0; padding: 8px clamp(16px, 3.6vw, 52px) 0; font-size: 15px; line-height: 1.6; font-weight: 400; }
html:has(#ovs-base) body:not(:has(> .kpis)) > :not(.aw-site-head, .aw-footer) { max-width: 980px; margin-inline: auto; }
html:has(#ovs-base) body:has(> .kpis) { height: auto; grid-template-columns: minmax(0, 1fr); grid-template-rows: none; grid-auto-rows: auto; }   /* stats: thêm header/footer nên bỏ khung vừa-màn-hình, để trang cuộn */
html:has(#ovs-base) :is(h1, h2) { text-transform: uppercase; }

/* Stageshow «Too much»: 14 nav items must not break mid-label; scroll with a fade instead of wrapping */
.aw-hnav { min-width: 0; overflow-x: auto; scrollbar-width: none; mask-image: linear-gradient(90deg, #000 90%, transparent); }
.aw-hnav::-webkit-scrollbar { display: none; }
.aw-hnav > a { white-space: nowrap; flex: none; }
@media (min-width: 1100px) { .aw-hnav { gap: 16px; } }   /* 14 mục vừa ở 1440 (trước: «Thống kê» bị mờ/cắt) */
.aw-hnav.is-fit { mask-image: none; }                  /* vừa hết thì không cần dải mờ cuối */
/* Stageshow «Boxed»: kit previews showed a whole page at 25%; show the top of the kit at 40% so titles and swatches read */
.aw-card-site .aw-shot iframe { width: 250%; height: 250%; transform: scale(.4); }
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
