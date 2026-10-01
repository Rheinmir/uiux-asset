#!/usr/bin/env python3
"""vendor-galaxy — chép NGUYÊN VĂN uiverse-io/galaxy (3.800+ UI element, MIT) vào galaxy/<Nhóm>/ + sinh galaxy/index.json cho gallery.

Không sửa một byte nào của file gốc (dòng ghi công "From Uiverse.io by <tác giả>" giữ nguyên); khung xem trước (nền, căn giữa,
Tailwind CDN cho mục dùng Tailwind) do galaxy/galaxy.js dựng lúc hiển thị, không ghi vào file.
Kho gốc ngừng cập nhật từ 09/2024 nên chép một lần; muốn đồng bộ lại thì clone mới rồi chạy lại.

    git clone --depth 1 https://github.com/uiverse-io/galaxy.git ../galaxy
    python3 tools/vendor-galaxy.py ../galaxy
"""
import json
import re
import shutil
import sys
from pathlib import Path

DST = Path(__file__).resolve().parents[1] / "galaxy"
src = Path(sys.argv[1])
TAGS = re.compile(r"Tags:\s*([^*>\n]+?)\s*(?:-->|\*/|$)", re.M)

items = []
for cat in sorted(p for p in src.iterdir() if p.is_dir() and not p.name.startswith(".")):
    out = DST / cat.name
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    for f in sorted(cat.glob("*.html")):
        shutil.copyfile(f, out / f.name)
        s = f.read_text(encoding="utf-8", errors="replace")
        author, _, slug = f.stem.rpartition("_")             # <tác giả>_<tên-ngẫu-nhiên-số>; tác giả có thể chứa "_"
        m = TAGS.search(s)
        tags = [t.strip() for t in m.group(1).split(",") if t.strip()] if m else []
        items.append([cat.name, f.name, author, slug, tags, int("<style" not in s)])
shutil.copyfile(src / "LICENSE", DST / "LICENSE")

(DST / "index.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"galaxy/ · {len(items)} element · {sum(i[5] for i in items)} dùng Tailwind")
