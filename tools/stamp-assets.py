#!/usr/bin/env python3
"""stamp-assets — gắn ?v=<băm nội dung> vào mọi link tới JS/CSS dùng chung trong các trang HTML.

Vì sao: domain đi qua Cloudflare proxy, JS/CSS bị ép cache trình duyệt 4 giờ (max-age=14400) trong khi HTML luôn mới
→ HTML mới chạy cùng JS cũ (nút + Giỏ có mà code giỏ chưa nạp). Đổi nội dung là đổi ?v → trình duyệt tải bản mới ngay.
aw.js chuyển tiếp ?v của chính nó cho cart.js, nên phiên bản tính trên CẢ bộ file.

    python3 tools/stamp-assets.py           # ghi lại các trang
    python3 tools/stamp-assets.py --check   # rc 1 nếu có trang chưa gắn đúng phiên bản
"""
import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ["aw.css", "aw.js", "cart.js", "search.js", "stats.js", "ui-kits/kits.js", "galaxy/galaxy.js"]
PAGES = ["index.html", "stats.html", "ui-kits/index.html", "galaxy/index.html", "scroll-effects/index.html",
         "components/index.html", "components/chip.html"]
REF = re.compile(r'((?:src|href)="[^"]*?\b(?:aw\.css|aw\.js|search\.js|stats\.js|kits\.js|galaxy\.js))(?:\?v=[0-9a-f]+)?"')

ver = hashlib.sha256(b"".join((ROOT / a).read_bytes() for a in ASSETS)).hexdigest()[:10]
stale = []
for p in PAGES:
    f = ROOT / p
    s = f.read_text(encoding="utf-8")
    new = REF.sub(lambda m: f'{m.group(1)}?v={ver}"', s)
    if new != s:
        stale.append(p)
        if "--check" not in sys.argv:
            f.write_text(new, encoding="utf-8")
if "--check" in sys.argv:
    print(f"stamp: {'OK' if not stale else 'LỆCH ' + ', '.join(stale)} (v={ver})")
    sys.exit(1 if stale else 0)
print(f"stamp v={ver} · {len(stale)} trang cập nhật")
