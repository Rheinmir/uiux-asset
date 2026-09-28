#!/usr/bin/env python3
"""build-chips — components/chip.html: tái tạo bằng code TOÀN BỘ 29 hình mẫu của
setproduct.com/blog/chip-ui-design (cấu tạo 1–7 · trạng thái 8–12 · kiểu dáng 13–17 · ứng dụng 18–23 · nguyên tắc 24–29).

Bài gốc là ảnh Figma (không có code) → mỗi hình dựng lại thành HTML/CSS/JS chạy thật; số hình ghi ở từng mục để đối chiếu.
Lớp nền (token màu, font nhúng, công tắc sáng/tối) lấy từ html_base.py của overstack.

    python3 tools/build-chips.py            # OVS_TOOLS mặc định ../setup/fdk/tools
"""
import html as H
import importlib.util
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOLS = Path(os.environ.get("OVS_TOOLS", ROOT.parent / "setup" / "fdk" / "tools"))

X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>'
CHECK = '<svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
STAR = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>'
BAN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M6.5 6.5l11 11"/></svg>'
PASTEL = [("Blue", "#c4dcf8"), ("Violet", "#eabaf6"), ("Gray", "#dcdcdc"), ("Green", "#c4f2c8"), ("Periwinkle", "#c6caf0"),
          ("Yellow", "#f7e6a3"), ("Pink", "#f7c1d9"), ("Teal", "#b2ece2"), ("Peach", "#fae3c8")]
AV = {"K": "#e08a5b", "S": "#6b8fd6", "G": "#4fae8c", "M": "#b56bd6", "A": "#d65b7a", "T": "#d6a44f"}


def av(name):
    return f'<span class="av" style="background:{AV.get(name[0], "#7a86a8")}" aria-hidden="true">{name[0]}</span>'


def line(chips, label=None):
    a = f' aria-label="{label}"' if label else ""
    return f'<div class="ovs-line"{a}>{"".join(chips)}</div>'


def toggle(t, on=False, dis=False, extra=""):
    return (f'<button type="button" class="cx tg{extra}" aria-pressed="{str(on).lower()}"{" disabled" if dis else ""}>'
            f'{CHECK}{t}{BAN if dis else ""}</button>')


CLOUD = [["Prototyping", "Sketch", "Product"], ["Figma", "UI kit", "User experience"],
         ["Wireframing", "XD", "Leadership"], ["UI design", "ReactJS", "Photoshop"]]

SECTIONS = [
    ("Cấu tạo", [
        ("1", "Vỏ chip", "Vỏ là khối nền bo tròn chứa mọi thứ; màu nền pastel phân nhóm, chữ luôn tối cố định để đủ tương phản ở cả hai chế độ.",
         line([f'<span class="cx fill" style="--c:{c}">{n}</span>' for n, c in PASTEL[:5]])
         + line([f'<span class="cx fill" style="--c:{c}">{n}</span>' for n, c in PASTEL[5:]])),
        ("2", "Nhãn", "Nhãn là phần chính; có thể một hay hai cụm chữ, cụm phụ nhạt hơn. Nhãn nhấn màu dùng cho giá trị đang được chọn.",
         line(['<span class="cx sf"><b class="acc">Design</b></span>', '<span class="cx sf">Research</span>',
               '<span class="cx sf">Sprint <span class="mut">12</span></span>', '<span class="cx sf"><b class="acc">Live</b></span>'])),
        ("3", "Viền", "Viền 1px trung tính cho chip thường; viền 2px màu nhấn cho chip đang được chọn hoặc focus.",
         line(['<span class="cx ol">Outline</span>', '<span class="cx ol on">Active</span>', '<span class="cx ol">Neutral</span>',
               '<span class="cx ol on">Focused</span>'])),
        ("4", "Icon", "Icon đứng trước nhãn, 18px, cùng màu nhấn; một icon đơn giản, không dùng hình trừu tượng.",
         line([f'<span class="cx sf">{STAR}{t}</span>' for t in ["Starred", "Favorites", "Top rated", "Featured"]])),
        ("5", "Nút xoá", "Nút × nằm cuối, là một nút riêng có nhãn cho trình đọc màn hình; bấm là chip biến mất.",
         '<div class="rm-demo">' + line([f'<span class="cx fill rm" style="--c:{c}">{n}<button type="button" class="x" aria-label="Xoá {n}">{X}</button></span>'
                                         for n, c in PASTEL[:5]]) + '</div>'),
        ("6", "Ảnh đại diện", "Avatar 24px đặt sát mép trái, chip bo tròn hoàn toàn cho hợp dáng tròn của ảnh.",
         line([f'<span class="cx ol pill">{av(n)}{n}</span>' for n in ["Katy Nelson", "Sean P.", "Mai Anh", "Gustavo Lopez"]])),
        ("7", "Bộ đếm", "Số đếm trong vòng tròn màu ở cuối chip; cho biết số mục ẩn sau lựa chọn đó.",
         line([f'<span class="cx sf">{t}<span class="cnt" style="--c:{c};--f:{f}">{n}</span></span>'
               for t, n, c, f in [("Inbox", 4, "#2f6fe0", "#fff"), ("Alerts", 2, "#c53018", "#fff"),
                                  ("Done", 3, "#1f7a2c", "#fff"), ("Drafts", 1, "#f0a020", "#1a1d21")]])),
    ]),
    ("Trạng thái", [
        ("8–12", "Bộ Choose chips", "Chọn trạng thái ở menu để xem cả bộ đổi theo, hoặc tự rê chuột, bấm, Tab qua từng chip. Hàng cuối minh hoạ chip tắt (có icon cấm).",
         '<div class="states"><div class="sh"><b>Choose chips</b><label class="sel">Trạng thái <select>'
         + "".join(f'<option value="{v}">{t}</option>' for v, t in [("", "Tự nhiên"), ("hover", "Hover"), ("sel", "Selected"), ("dis", "Disabled"), ("focus", "Focused")])
         + '</select></label></div>'
         + "".join(line([toggle(t, on=(r < 2 and i == 0), dis=(t == "Leadership")) for i, t in enumerate(row)]) for r, row in enumerate(CLOUD))
         + '</div>'),
    ]),
    ("Kiểu dáng", [
        ("13", "Nền", "Bốn kiểu nền: xám nhạt, màu pastel, màu đậm (chữ trắng), tối.",
         line(['<span class="cx lg sf">Shaded chip</span>', '<span class="cx lg fill" style="--c:#f3dcf8">Pink</span>',
               '<span class="cx lg solid" style="--c:#5b6bd6">Colored</span>', '<span class="cx lg solid" style="--c:#4a4a4a">Dark</span>'])),
        ("14", "Viền", "Viền 1px, nét đứt, viền đậm 3px, và viền mờ 30%.",
         line(['<span class="cx lg ol k1">Border 1px</span>', '<span class="cx lg ol dash">Dashed</span>',
               '<span class="cx lg ol bold">Bold</span>', '<span class="cx lg ol o30">30% opacity</span>'])),
        ("15", "Bo góc", "Viên thuốc (bo hết), bo vừa 12px, và vuông (hiếm dùng).",
         line(['<span class="cx lg sf pill">Pill chip</span>', '<span class="cx lg sf r12">Rounded</span>', '<span class="cx lg sf sq">Square &amp; rare</span>'])),
        ("16", "Đổ bóng", "Ba mức nổi: bóng nhỏ, nổi vừa, nổi cao nhất.",
         '<div class="shrow"><span class="cx lg card sh1">Tiny shadow</span><span class="cx lg card sh2">Elevated</span><span class="cx lg card sh3">Maximum soaring</span></div>'),
        ("17", "Gradient", "Gradient ở nền, nền tối, ở viền, hoặc cả hai.",
         line(['<span class="cx lg g1">Container</span>', '<span class="cx lg g2">Dark</span>',
               '<span class="cx lg g3">Border</span>', '<span class="cx lg g4">Both</span>'])),
    ]),
    ("Ứng dụng", [
        ("18", "Lọc nội dung", "Bộ lọc tiện ích: chọn nhiều; chip đã chọn đổi nền tối và có dấu tích.",
         '<div class="panel"><div class="ph">Amenities</div>'
         + line([toggle("Elevator", extra=" dk"), toggle("Washer", True, extra=" dk")])
         + line([toggle("Ramp access", extra=" dk"), toggle("Garden", extra=" dk")])
         + line([toggle("Pets allowed", True, extra=" dk")]) + '</div>'),
        ("19", "Gắn thẻ", "Thẻ nhỏ trên kanban để phân loại; chỉ để đọc nên không có hover, chữ đậm nhỏ.",
         '<div class="kb">'
         + "".join(f'<div class="col"><div class="ch">{h}</div>' + "".join(
             '<div class="tk">' + line([f'<span class="tag" style="--c:{c};--f:{f}">{t}</span>' for t, c, f in tags]) + '<i></i><i class="s"></i></div>'
             for tags in cards) + '</div>'
             for h, cards in [("Doing", [[("Design", "#f3d3f5", "#7a2a86"), ("Done", "#1f7a2c", "#fff")], [("In-progress", "#d6e6fb", "#1f4f96")]]),
                              ("To do", [[("Backburner", "#5b62c9", "#fff"), ("To-do", "#e88a1c", "#1a1d21")], [("Normal", "#f7e6a3", "#6b5200")]])])
         + '</div>'),
        ("20", "Thuộc tính sản phẩm", "Chọn đúng một thuộc tính (radiogroup, phím mũi tên); chip được chọn nền màu nhấn đặc.",
         '<div class="panel"><div class="ph">Product attributes</div><div role="radiogroup" aria-label="Độ cứng" class="rg">'
         + line([f'<button type="button" class="cx ol radio" role="radio" aria-checked="{str(t == "Normal").lower()}" tabindex="{0 if t == "Normal" else -1}">{CHECK}{t}</button>' for t in ["Extra soft", "Normal"]])
         + line([f'<button type="button" class="cx ol radio" role="radio" aria-checked="false" tabindex="-1">{CHECK}{t}</button>' for t in ["Medium", "Extra hard"]])
         + '</div></div>'),
        ("21", "Autocomplete", "Gõ để lọc gợi ý (phần khớp in đậm), Enter hoặc dấu phẩy để thêm chip, Backspace khi ô trống để xoá chip cuối.",
         '<div class="ac"><div class="acl">Input tags</div><div class="acbox">'
         + "".join(f'<span class="cx sf sm rm">{t}<button type="button" class="x" aria-label="Xoá {t}">{X}</button></span>' for t in ["Figma", "CSS", "HTML"])
         + '<input aria-label="Thêm thẻ" value="De" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="ac-list"></div>'
         '<ul class="acs" id="ac-list" role="listbox"></ul><div class="ach">Nhập các thẻ, cách nhau bằng dấu phẩy</div></div>'),
        ("22", "Marketing", "Chip nhỏ trên bảng giá làm nổi gói phổ biến và ưu đãi; màu đặc, chữ đậm.",
         '<div class="price">' + "".join(
             f'<div class="pc{" hi" if hi else ""}"><div class="pt">{n}{chip}</div><div class="pp"><span class="num"><sup>$</sup>{p}</span><small>{d}</small></div>'
             f'<ul>{"".join("<li>" + CHECK + f + "</li>" for f in fs)}</ul></div>'
             for n, chip, p, d, fs, hi in [
                 ("Free", '<span class="tag ol">Use chips</span>', "0", "Không cần thẻ", ["5 dự án", "Bộ chip cơ bản"], False),
                 ("Business", '<span class="tag" style="--c:#1f7a2c;--f:#fff">Popular</span>', "9", "/ tháng · 9 người", ["Không giới hạn", "Mọi biến thể", "Hỗ trợ ưu tiên"], True),
                 ("Enterprise", '<span class="tag" style="--c:#2f6fe0;--f:#fff">Save 25%</span>', "29", "/ tháng · 999 người", ["SSO", "Kho riêng"], False)])
         + '</div>'),
        ("23", "Nhiều người nhận", "Người nhận email thành chip có avatar; gõ tên rồi Enter để thêm, × để xoá.",
         '<div class="mail"><div class="mh">Compose</div><div class="mf"><span class="ml">To</span><div class="mto">'
         + "".join(f'<span class="cx sf pill rm">{av(n)}{n}<button type="button" class="x" aria-label="Xoá {n}">{X}</button></span>' for n in ["Katy Nelson", "Sean P."])
         + '</div></div><div class="mf"><span class="ml"></span><div class="mto">'
         + '<span class="cx sf pill rm">' + av("Gustavo Pedrilio Lopez") + 'Gustavo Pedrilio Lopez<button type="button" class="x" aria-label="Xoá Gustavo Pedrilio Lopez">' + X + '</button></span>'
         + '<input class="min" aria-label="Thêm người nhận" placeholder="Thêm…"></div></div><div class="mf mut">Subject</div></div>'),
    ]),
    ("Nguyên tắc", [
        ("24", "Kích thước và khoảng cách", "Padding ngang 16px, dọc 8px quanh nhãn; vùng bấm đủ lớn, chip cách nhau 8px.",
         '<div class="spec"><span class="cx lg sf"><span class="box">Chip specs</span></span><span class="n v">8</span><span class="n h">16</span></div>'),
        ("25", "Hover và active", "Hover nổi lên (bóng rõ hơn, chữ đậm màu hơn); bấm thì lún nhẹ.",
         '<div class="shrow"><button type="button" class="cx lg card hv">Default</button><button type="button" class="cx lg card hv">Hover me</button></div>'),
        ("26", "Chọn rõ ràng", "Đã chọn phải khác hẳn chưa chọn: viền đậm tối + dấu tích xanh, không chỉ đổi sắc nhẹ.",
         line([f'<button type="button" class="cx lg ol tgb" aria-pressed="{p}">{CHECK}{t}</button>' for t, p in [("Default", "false"), ("Selected", "true")]])),
        ("27", "Cho phép xoá", "Nút × to, rõ, có vùng bấm riêng; nền hover đỏ nhạt báo hành động phá huỷ.",
         line(['<span class="cx lg sf rm big">Remove me<button type="button" class="x" aria-label="Xoá chip">' + X + '</button></span>'])),
        ("28", "Micro-interaction", "Bấm: chip nảy nhẹ (ease-out 200ms) và gợn sóng từ điểm bấm; tắt hết khi người dùng bật giảm chuyển động.",
         line([f'<button type="button" class="cx ol blue mi" aria-pressed="false">{t}</button>' for t in ["Badminton", "American football", "Baseball"]])
         + line([f'<button type="button" class="cx ol blue mi" aria-pressed="false">{t}</button>' for t in ["Boxing", "Swimming", "Soccer", "Hockey", "Polo"]])),
        ("29", "Nhãn dài", "Nhãn quá dài cắt “…”; rê chuột hoặc Tab tới thì hiện đủ chữ; quá nhiều chip thì gom thành “+N more”, bấm để bung.",
         '<div class="ov">' + line([f'<span class="cx sf pill rm tr" tabindex="0" data-full="{t}"><span class="lb">{t}</span><button type="button" class="x" aria-label="Xoá {t}">{X}</button></span>'
                                    for t in ["Schindler’s List", "The Godfather Part II", "The Shawshank Redemption"]]
                                   + ['<button type="button" class="cx sf pill more">+13 more</button>']) + '</div>'),
    ]),
]

CSS = r"""
body{max-width:980px;margin:auto;padding:32px 16px 80px}
h1{font-size:30px;margin:0 0 8px}.lead{color:var(--ovs-ink2);margin:0 0 8px;line-height:1.6;max-width:var(--measure)}
a{color:var(--ovs-accent)}h2{font-size:22px;margin:56px 0 16px}
.fig{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin:0 0 48px}
.fig h3{font-size:16px;margin:0;display:flex;gap:8px;align-items:baseline}.fig h3 .no{font-size:12px;font-weight:600;color:var(--ovs-ink2)}
.fig p{margin:0;color:var(--ovs-ink2);font-size:14px;line-height:1.6}
.demo{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;padding:20px;border:1px solid var(--ovs-border);border-radius:14px;background:var(--ovs-surface2);min-width:0}
.demo .ovs-line{gap:8px;padding:4px 2px;align-items:center}
details summary{cursor:pointer;font-size:13px;font-weight:600;color:var(--ovs-ink2);min-height:32px;display:flex;align-items:center}
pre{overflow:auto;max-height:280px;margin:8px 0 0;padding:12px;border-radius:8px;background:color-mix(in srgb,var(--ovs-ink) 6%,transparent);font-size:12px;font-variant-ligatures:none;white-space:pre-wrap}
.mut{color:var(--ovs-ink2)}
.toc{gap:20px}
.shrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),max-content));gap:20px;padding:8px 8px 32px}
/* chip nền */
.cx{--h:32px;display:inline-flex;align-items:center;gap:8px;height:var(--h);padding:0 14px;border:1px solid transparent;border-radius:999px;
 font:inherit;font-size:14px;line-height:1;white-space:nowrap;flex:none;color:var(--ovs-ink);background:none;
 transition:background-color .15s ease-out,border-color .15s ease-out,box-shadow .15s ease-out,color .15s ease-out,transform .15s ease-out}
button.cx{cursor:pointer}.cx:focus-visible,.x:focus-visible,.demo input:focus-visible{outline:2px solid var(--ovs-accent);outline-offset:2px}
.cx.lg{--h:44px;padding:0 20px;font-size:16px}.cx.sm{--h:28px;padding:0 10px;font-size:13px}
.cx.fill{background:var(--c);color:#1a1d21;border-color:color-mix(in srgb,var(--c) 70%,#000 12%)}
.cx.solid{background:var(--c);color:#fff}
.cx.sf{background:color-mix(in srgb,var(--ovs-ink) 7%,transparent)}
.cx.ol{border-color:var(--ovs-border);background:var(--ovs-bg)}
.cx.ol.on{border:2px solid var(--ovs-accent)}
.cx .acc{color:var(--ovs-accent)}
.cx .ic{width:18px;height:18px;fill:var(--ovs-accent);stroke:none;margin-left:-4px}
.cx .ck{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;margin-left:-4px;display:none}
.cx .av{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;color:#fff;font-size:12px;font-weight:600;margin-left:-10px}
.cx .cnt{display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:var(--c);color:var(--f);font-size:12px;font-weight:700;margin-right:-8px}
/* nút xoá */
.cx.rm{padding-right:4px}.x{flex:none;display:grid;place-items:center;width:26px;height:26px;padding:0;border:0;border-radius:50%;background:none;color:inherit;opacity:.7;cursor:pointer;transition:background-color .15s ease-out,opacity .15s ease-out}
.x svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}
.x:hover{opacity:1;background:color-mix(in srgb,currentColor 14%,transparent)}
.cx.rm.big{padding-right:8px}.cx.rm.big .x{width:34px;height:34px}.cx.rm.big .x svg{width:20px;height:20px;stroke:#d8336b}
.cx.rm.big .x:hover{background:color-mix(in srgb,#d8336b 16%,transparent)}
/* chip bật/tắt */
.tg{border-color:var(--ovs-border);background:var(--ovs-bg)}
.tg:hover:not(:disabled),.states.f-hover .tg:not(:disabled){border-color:var(--ovs-accent);box-shadow:0 0 0 1px var(--ovs-accent) inset}
.tg[aria-pressed=true],.states.f-sel .tg{background:var(--ovs-accent-bg);border-color:var(--ovs-accent);color:var(--ovs-ink);font-weight:600}
.tg[aria-pressed=true] .ck,.states.f-sel .tg .ck,.tgb[aria-pressed=true] .ck,.radio[aria-checked=true] .ck{display:block}
.tg:disabled,.states.f-dis .tg{opacity:.4;cursor:not-allowed;box-shadow:none}
.tg .ic{display:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;margin:0 -4px 0 0}.tg:disabled .ic{display:block}
.states.f-focus .tg:first-child{outline:2px solid var(--ovs-accent);outline-offset:2px}
.tg:active:not(:disabled){transform:scale(.97)}
.states .sh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px}.states .sh b{font-family:var(--font-display);font-size:18px}
.sel{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ovs-ink2)}
.sel select{min-height:32px;padding:0 8px;border:0;border-radius:8px;background:color-mix(in srgb,var(--ovs-ink) 7%,transparent);color:var(--ovs-ink);font:inherit}
/* kiểu dáng */
.cx.k1{border:1px solid var(--ovs-ink)}.cx.dash{border:2px dashed var(--ovs-ink2)}.cx.bold{border:3px solid var(--ovs-ink)}.cx.o30{border:3px solid color-mix(in srgb,var(--ovs-ink) 30%,transparent)}
.cx.r12{border-radius:12px}.cx.sq{border-radius:0}
.cx.card{background:var(--ovs-surface2);border-color:var(--ovs-border);border-radius:12px}
.pad{padding:12px 4px 28px}.sh1{box-shadow:0 1px 3px rgba(0,0,0,.14)}.sh2{box-shadow:0 6px 16px rgba(0,0,0,.14)}.sh3{box-shadow:0 18px 40px rgba(0,0,0,.2)}
.g1{background:linear-gradient(180deg,#fff,#d6d6de) #ebebf0;color:#1a1d21}
.g2{background:linear-gradient(135deg,#9a90e0,#15131f) #3d3760;color:#fff}
.g3{border:3px solid transparent;background:linear-gradient(var(--ovs-bg),var(--ovs-bg)) padding-box,linear-gradient(135deg,#c9c3ee,#3a3160) border-box}
.g4{border:3px solid transparent;color:#1a1d21;background-color:#e4e2f4;background:linear-gradient(180deg,#fff,#c9c6ea) padding-box,linear-gradient(135deg,#e3e0f7,#6b62b8) border-box}
/* lọc tối */
.panel{display:grid;gap:4px;max-width:360px}.ph{font-family:var(--font-display);font-weight:600;font-size:15px;margin-bottom:4px}
.tg.dk[aria-pressed=true]{background:#3d3f45;border-color:#3d3f45;color:#fff}
/* thẻ đọc */
.tag{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:6px;background:var(--c);color:var(--f);font-size:12px;font-weight:600;white-space:nowrap;flex:none}
.tag.ol{background:none;border:1px solid var(--ovs-border);color:var(--ovs-ink)}
.kb{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:12px}
.kb .col{display:grid;gap:8px;align-content:start;padding:12px;border-radius:12px;background:color-mix(in srgb,var(--ovs-ink) 5%,transparent)}
.kb .ch{font-family:var(--font-display);font-weight:600}
.kb .tk{display:grid;gap:8px;padding:12px;border-radius:10px;background:var(--ovs-bg);border:1px solid var(--ovs-border)}
.kb .tk i{display:block;height:8px;border-radius:4px;background:color-mix(in srgb,var(--ovs-ink) 10%,transparent)}.kb .tk i.s{width:60%}
/* radio */
.rg{display:grid;gap:4px}.radio[aria-checked=true]{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
.radio:hover:not([aria-checked=true]){border-color:var(--ovs-accent)}
/* autocomplete */
.ac{position:relative;max-width:460px;display:grid;gap:6px}.acl{font-size:12px;font-weight:700;letter-spacing:.06em;color:var(--ovs-ink2)}
.acbox{display:flex;align-items:center;gap:6px;min-height:44px;padding:6px 8px;border-radius:12px;background:color-mix(in srgb,var(--ovs-ink) 6%,transparent);overflow:hidden}
.acbox input,.mto input{flex:1 1 60px;min-width:60px;height:32px;border:0;background:none;color:var(--ovs-ink);font:inherit}
.acbox input:focus,.mto input:focus{outline:none}
.acs{list-style:none;margin:0;padding:6px;border-radius:10px;background:var(--ovs-bg);border:1px solid var(--ovs-border);box-shadow:0 8px 24px rgba(0,0,0,.12);max-width:240px}
.acs:empty{display:none}.acs li{display:block;line-height:36px;padding:0 10px;border-radius:6px;cursor:pointer;font-size:14px}
.acs li b{color:var(--ovs-accent)}.acs li[aria-selected=true],.acs li:hover{background:color-mix(in srgb,var(--ovs-ink) 7%,transparent)}
.ach{font-size:12px;color:var(--ovs-ink2)}
/* bảng giá */
.price{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr));gap:12px;align-items:center}
.pc{display:grid;gap:8px;padding:16px;border-radius:12px;border:1px solid var(--ovs-border);background:var(--ovs-bg)}
.pc.hi{box-shadow:0 12px 32px rgba(0,0,0,.14);padding:20px 16px}
.pt{display:flex;justify-content:space-between;align-items:center;gap:8px;font-weight:600}
.pp{display:flex;align-items:baseline;gap:8px}.pp .num{font-family:var(--font-display);font-size:28px;font-weight:600}.pp sup{font-size:14px}.pp small{font-size:12px;color:var(--ovs-ink2)}
.pc ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;font-size:13px}.pc li{display:flex;gap:8px;align-items:center}
.pc li .ck{display:block;width:14px;height:14px;fill:none;stroke:var(--ovs-accent);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
/* mail */
.mail{max-width:460px;border-radius:12px;border:1px solid var(--ovs-border);background:var(--ovs-bg);overflow:hidden}
.mh{padding:12px 16px;font-weight:600;background:color-mix(in srgb,#2e8a38 12%,transparent)}
.mf{display:flex;align-items:center;gap:8px;padding:6px 16px;border-top:1px solid var(--ovs-border);min-height:44px}.mf.mut{color:var(--ovs-ink2)}
.toc{gap:20px}
.shrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),max-content));gap:20px;padding:8px 8px 32px}
.ml{width:24px;font-size:13px;color:var(--ovs-ink2);flex:none}.mto{display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden;flex:1}
/* specs */
.spec{position:relative;display:inline-flex;justify-self:start;padding:28px 44px 12px 0}.spec .box{outline:1px solid #7b61ff;outline-offset:0;padding:0}
.spec .n{position:absolute;display:grid;place-items:center;min-width:22px;height:22px;border-radius:4px;background:#c62f35;color:#fff;font-size:12px;font-weight:700}
.spec .v{left:50%;top:0}.spec .h{right:8px;top:40px}
/* hover nổi */
.hv{box-shadow:0 2px 6px rgba(0,0,0,.08);color:var(--ovs-ink2)}.hv:hover{box-shadow:0 10px 24px rgba(0,0,0,.16);color:var(--ovs-ink)}.hv:active{transform:translateY(1px) scale(.98);box-shadow:0 2px 6px rgba(0,0,0,.1)}
.tgb[aria-pressed=true]{border:3px solid #23234a}.tgb .ck{stroke:#2e8a38;width:22px;height:22px}
/* micro */
.cx.blue{border-color:#8fb3f0;color:#1f5fc9}.cx.blue[aria-pressed=true]{background:#1f5fc9;border-color:#1f5fc9;color:#fff}
:root[data-theme=dark] .cx.blue:not([aria-pressed=true]){color:#8fb3f0}
.mi{position:relative;overflow:hidden}.mi.pop{animation:pop .2s ease-out}
.mi .rp{position:absolute;border-radius:50%;background:currentColor;opacity:.25;transform:scale(0);animation:rp .45s ease-out forwards;pointer-events:none}
@keyframes pop{50%{transform:scale(1.06)}}@keyframes rp{to{transform:scale(1);opacity:0}}
@media (prefers-reduced-motion:reduce){.mi.pop,.mi .rp{animation:none}.cx,.x{transition:opacity .15s}}
/* nhãn dài */
.tr{max-width:210px;position:relative}.tr .lb{overflow:hidden;text-overflow:ellipsis}
.ov{padding-top:44px}.ov .ovs-line{overflow:visible}
.tr:hover::after,.tr:focus-within::after{content:attr(data-full);position:absolute;left:0;bottom:calc(100% + 8px);padding:6px 10px;border-radius:8px;background:#2b2d31;color:#fff;font-size:13px;white-space:nowrap;z-index:3;pointer-events:none}
.more{color:var(--ovs-accent);font-weight:600}
"""

JS = r"""
(()=>{const $=(s,r=document)=>[...r.querySelectorAll(s)];
$('.tg,.tgb').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')));
// menu trạng thái (hình 8–12)
$('.states').forEach(s=>{const sel=s.querySelector('select');sel.addEventListener('change',()=>{s.className='states'+(sel.value?' f-'+sel.value:'')})});
// radiogroup (hình 20)
$('[role=radiogroup]').forEach(g=>{const rs=$('[role=radio]',g);const pick=r=>{rs.forEach(x=>{const on=x===r;x.setAttribute('aria-checked',on);x.tabIndex=on?0:-1});r.focus()};
 rs.forEach((r,i)=>{r.addEventListener('click',()=>pick(r));r.addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(d){e.preventDefault();pick(rs[(i+d+rs.length)%rs.length])}})})});
// xoá chip: × hoặc Backspace/Delete trên nút ×; focus sang chip kế
const del=c=>{const p=c.parentElement,all=$('.rm',p),k=all.indexOf(c);c.remove();const nx=all[k+1]||all[k-1];if(nx&&nx.querySelector('.x'))nx.querySelector('.x').focus()};
document.addEventListener('click',e=>{const x=e.target.closest('.x');if(x)del(x.closest('.rm'))});
document.addEventListener('keydown',e=>{if((e.key==='Backspace'||e.key==='Delete')&&e.target.matches('.x')){e.preventDefault();del(e.target.closest('.rm'))}});
const mk=(t,cls,avatar)=>{const s=document.createElement('span');s.className='cx sf rm '+cls;s.innerHTML=(avatar||'')+'<span></span><button type="button" class="x" aria-label=""></button>';
 s.querySelector('span:not(.av)').textContent=t;const x=s.querySelector('.x');x.setAttribute('aria-label','Xoá '+t);x.innerHTML=document.querySelector('.x').innerHTML;return s};
// autocomplete (hình 21)
$('.ac').forEach(ac=>{const inp=ac.querySelector('input'),ul=ac.querySelector('.acs'),box=ac.querySelector('.acbox');
 const ALL=['Development','Debugging','Deployment','Design tokens','UI design','Web design','Accessibility'];let cur=0;
 const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 const draw=()=>{const q=inp.value.trim().toLowerCase();const hit=q?ALL.filter(a=>a.toLowerCase().includes(q)):[];cur=Math.min(cur,Math.max(hit.length-1,0));
  ul.innerHTML=hit.map((a,i)=>{const k=a.toLowerCase().indexOf(q);return `<li role="option" aria-selected="${i===cur}">${esc(a.slice(0,k))}<b>${esc(a.slice(k,k+q.length))}</b>${esc(a.slice(k+q.length))}</li>`}).join('');
  inp.setAttribute('aria-expanded',hit.length>0);return hit};
 const add=t=>{t=t.trim();if(!t)return;box.insertBefore(mk(t,'sm'),inp);inp.value='';draw()};
 inp.addEventListener('input',()=>{cur=0;draw()});
 inp.addEventListener('keydown',e=>{const hit=draw();
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();cur=(cur+(e.key==='ArrowDown'?1:-1)+hit.length)%Math.max(hit.length,1);draw()}
  else if(e.key==='Enter'||e.key===','){e.preventDefault();add(hit[cur]||inp.value)}
  else if(e.key==='Backspace'&&!inp.value){const l=$('.rm',box).pop();if(l)l.remove()}});
 ul.addEventListener('mousedown',e=>{const li=e.target.closest('li');if(li){e.preventDefault();add(li.textContent)}});draw()});
// người nhận (hình 23)
$('.mto input').forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&inp.value.trim()){const t=inp.value.trim();
 inp.parentElement.insertBefore(mk(t,'pill',`<span class="av" style="background:#7a86a8" aria-hidden="true">${t[0].toUpperCase()}</span>`),inp);inp.value=''}}));
// micro-interaction (hình 28)
$('.mi').forEach(b=>b.addEventListener('click',e=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');
 b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,s=document.createElement('span');
 s.className='rp';s.style.cssText=`width:${d}px;height:${d}px;left:${(e.clientX||r.left+r.width/2)-r.left-d/2}px;top:${(e.clientY||r.top+r.height/2)-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),500)}));
// +N more (hình 29)
$('.more').forEach(b=>b.addEventListener('click',()=>{const extra=['Pulp Fiction','Forrest Gump','Inception','Parasite'];const ln=b.parentElement;
 extra.forEach(t=>{const c=mk(t,'pill tr');c.tabIndex=0;c.dataset.full=t;ln.insertBefore(c,b)});b.textContent='+9 more';b.disabled=true}));
})();
"""


def build():
    spec = importlib.util.spec_from_file_location("html_base", TOOLS / "html_base.py")
    hb = importlib.util.module_from_spec(spec); spec.loader.exec_module(hb)
    toc, body = [], []
    for gi, (group, figs) in enumerate(SECTIONS):
        gid = f"g{gi}"
        toc.append(f'<a href="#{gid}">{group}</a>')
        body.append(f'<h2 id="{gid}">{group}</h2>')
        for no, title, cap, demo in figs:
            body.append(f'<section class="fig" id="f{no.split("–")[0]}"><h3><span class="no">Hình {no}</span>{title}</h3><p>{cap}</p>'
                        f'<div class="demo">{demo}</div><details><summary>Xem code HTML</summary><pre><code>{H.escape(demo)}</code></pre></details></section>')
    page = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chip — uiux-asset</title><style>{CSS}</style></head><body>
<p><a href="./">← Components</a></p><h1>Chip: 29 mẫu</h1>
<p class="lead">Tái tạo bằng code toàn bộ 29 hình trong <a href="https://www.setproduct.com/blog/chip-ui-design">setproduct — Chip UI design</a>. Bài gốc là ảnh Figma, không có code; mỗi hình ở đây là bản chạy thật, bấm thử được, kèm HTML để copy. CSS và JS dùng chung nằm trong trang (xem nguồn).</p>
<div class="ovs-line toc">{"".join(toc)}</div>
{"".join(body)}
<script>{JS}</script><script src="/stats.js" defer></script></body></html>"""
    out = ROOT / "components" / "chip.html"
    # fix=False: tắt tự-vá màu — chip pastel cần chữ tối CỐ ĐỊNH, không theo token đổi chế độ
    out.write_text(hb.apply(page, fix=False), encoding="utf-8")
    print(f"→ {out} ({sum(len(f) for _, f in SECTIONS)} mục)")


if __name__ == "__main__":
    build()
