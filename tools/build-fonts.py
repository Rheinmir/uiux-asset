#!/usr/bin/env python3
"""build-fonts — fonts/families.json + fonts/shots/*.webp từ 9 ảnh chụp reel (UIUXMaestro «Fresh & Latest Fonts»).

    python3 tools/build-fonts.py <thư-mục-chứa f1.png … f9.png>

Ảnh gốc KHÔNG vào repo (chỉ cắt dải tên font ra webp nhỏ). Màu lấy bằng cách lượng tử hoá vùng video thật (kmeans) và đo màu
nhãn «Fresh & Latest Fonts» → ghi hex thật. Bản gần giống = font Google (OFL); không kèm tệp font thật nào.
Trạng thái giấy phép của font thật: xem STATUS, kèm trang đã kiểm (tìm kiếm web, KHÔNG phải trang giấy phép gốc trừ khi ghi rõ)."""
import colorsys, json, sys
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]; src = Path(sys.argv[1])
# slug, ảnh, tên trong reel, nhãn trong reel, look-alike (family, weight, có tiếng Việt?), chữ hoa?, letter-spacing, line-height, ghi chú kiểu chữ
F = [
 ("gibed", 1, "gibed", "Logo Style Rounded", ("Nunito", 900, True), False, "-0.01em", 1.0, "Sans hình học đầu tròn, chữ g có đuôi viên thuốc."),
 ("bargain", 2, "Bargain", "Elegant & Playful", ("Inter Tight", 600, True), False, "-0.02em", 1.05, "Grotesk bán đậm, chữ g một tầng, khoảng cách hẹp."),
 ("korvich", 3, "KORVICH", "Playful Vibe", ("Black Ops One", 400, True), True, "0", 1.0, "Chữ hoa khối, nét cắt vát góc cạnh."),
 ("salena", 4, "SALENA", "Elegance & Class", ("Lexend Exa", 600, True), True, "0.01em", 1.05, "Sans hoa giãn rộng, nét đều, sang."),
 ("lust", 5, "LUST", "Luxury & Fashion", ("Playfair Display", 800, True), True, "-0.02em", 1.0, "Didone tương phản cao, chân serif mảnh."),
 ("schabo", 6, "SCHABO", "Tall & Bold", ("Anton", 400, True), True, "0.01em", 1.0, "Grotesk nén rất đậm, chữ cao."),
 ("quizlo", 7, "QUIZLO", "Bold & Playful", ("Baloo 2", 800, True), True, "0", 1.0, "Sans hoa đậm, góc bo, chữ Q có đuôi bong bóng thoại."),
 ("poppins", 8, "Poppins", "Stop using Poppins · Part 3", ("Poppins", 700, False), False, "-0.01em", 1.05, "Sans hình học quen thuộc; reel kêu gọi bỏ vì dùng quá nhiều."),
 ("nature", 9, "Nature", "Fresh & Modern", ("Plus Jakarta Sans", 800, True), False, "-0.02em", 1.05, "Sans hiện đại đậm, chữ tròn thoáng."),
]
S = {  # state: free | paid | unverified
 "gibed": ("unverified", "Tra «gibed» không ra font nào; kết quả gần nhất là «Gued» (Figuree Studio), có thể là font khác.", [("MyFonts: gued font", "https://www.myfonts.com/collections/gued-font-sipanji21")]),
 "bargain": ("unverified", "Không thấy trang nhà phát hành. «Bargain» trên CreativeFabrica là font script, khác kiểu chữ trong reel.", [("CreativeFabrica: Bargain", "https://www.creativefabrica.com/product/bargain")]),
 "korvich": ("unverified", "Chỉ thấy «Korvich Slam» trên một trang blog không rõ nguồn, không có điều khoản giấy phép.", []),
 "salena": ("paid", "Typebae Salena (Iqbal Pauji): bản tải miễn phí chỉ dùng cá nhân; dùng thương mại phải mua ở Typebae. Nguồn là trang bên thứ ba.", [("BeFonts: Salena", "https://befonts.com/salena-font.html"), ("MyFonts: Salena (Typebae)", "https://www.myfonts.com/collections/salena-font-typebae/")]),
 "lust": ("paid", "Có Lust Didone của Positype (Neil Summerour), bán ở Fontspring và MyFonts từ 50 USD. Chưa xác nhận đúng bản trong reel.", [("Fontspring: Lust Display Didone", "https://www.fontspring.com/fonts/positype/lust/lust-display-didone")]),
 "schabo": ("unverified", "«Schabo Condensed» (Tom Robin Karlsson): BeFonts ghi miễn phí cả thương mại, WhatFontIs ghi chỉ cá nhân. Hai nguồn mâu thuẫn.", [("BeFonts: Schabo Condensed", "https://befonts.com/schabo-condensed-font.html"), ("WhatFontIs: Schabo Condensed", "https://whatfontis.com/FF_SCHABO-Condensed.font")]),
 "quizlo": ("paid", "Bản demo cá nhân trên FontSpace; bản thương mại bán ở Creative Market. Chưa tìm thấy giá.", []),
 "poppins": ("free", "Miễn phí, giấy phép OFL, có trên Google Fonts. Không có chữ có dấu tiếng Việt: dấu lấy từ font dự phòng Be Vietnam Pro.", [("Google Fonts: Poppins", "https://fonts.google.com/specimen/Poppins")]),
 "nature": ("unverified", "Chỉ thấy «Merqola Nature» (demo cá nhân, bản thương mại trả phí), có thể là font khác.", []),
}
def hexs(c): return "#%02x%02x%02x" % tuple(int(x) for x in c)
def role(c):
    r, g, b = [x / 255 for x in c]; h, l, s = colorsys.rgb_to_hls(r, g, b)
    if l < .3: return "Nâu nền tối"
    if l > .82: return "Trắng kem"
    if b > r + .08 and s > .45: return "Xanh màn hình"
    if b > r: return "Xám xanh mờ"
    if l > .6: return "Ánh đèn ấm"
    return "Nâu ấm"
out = []
for slug, n, name, tag, (fam, w, vi), caps, ls, lh, note in F:
    im = Image.open(src / f"f{n}.png").convert("RGB")
    q = im.crop((0, 330, 1000, 1500)).resize((100, 117)).quantize(colors=6, method=Image.Quantize.MEDIANCUT, kmeans=3)
    pal = q.getpalette()[:18]; cols = [tuple(pal[i * 3:i * 3 + 3]) for _, i in sorted(q.getcolors(), reverse=True)]
    cols.sort(key=lambda c: colorsys.rgb_to_hls(*[x / 255 for x in c])[1])
    sw = [dict(hex=hexs(c), role=role(c)) for c in cols]
    lab = np.asarray(im.crop((360, 1585, 820, 1640)), dtype=int).reshape(-1, 3); g = lab[(lab[:, 1] > lab[:, 0] + 40) & (lab[:, 1] > 150)]
    if len(g): sw.append(dict(hex=hexs(np.median(g, axis=0)), role="Xanh lá nhãn reel"))
    sw.append(dict(hex="#ffffff", role="Trắng chữ tên font"))
    y0, y1 = (486, 830) if slug == "poppins" else (560, 970)   # dải tên font + nhãn
    im.crop((0, y0, 1000, y1)).resize((720, round((y1 - y0) * .72)), Image.LANCZOS).save(ROOT / f"fonts/shots/{slug}.webp", quality=80)
    st, msg, srcs = S[slug]
    out.append(dict(slug=slug, name=name, tag=tag, note=note, look=dict(family=fam, weight=w, vi=vi), real=(slug == "poppins"), caps=caps, ls=ls, lh=lh,
                    status=dict(state=st, text=msg, sources=[dict(t=t, url=u) for t, u in srcs]), palette=sw))
(ROOT / "fonts/families.json").write_text(json.dumps(dict(source="Reel «Fresh & Latest Fonts» của UIUXMaestro, 9 ảnh chụp iPhone do owner gửi", body=dict(family="Be Vietnam Pro", weight=400), families=out), ensure_ascii=False, indent=1), encoding="utf-8")
print(len(out), "font ·", sum(len(f["palette"]) for f in out), "màu")
