#!/usr/bin/env python3
"""sync-ui-kits — chép kit từ bản clone Rheinmir/ui-kits (kho PRIVATE) vào ui-kits/ và sinh ui-kits/kits.json cho gallery.

Chạy bởi workflow `publish` của Rheinmir/ui-kits mỗi lần kho kit có commit mới; GitHub Pages của repo này tự phát hành lại.
KHÔNG chép registry.json / README.md của kho kit (chứa đường dẫn máy của người sinh kit) — kits.json chỉ giữ nguồn là URL hay chữ mô tả.

    python3 tools/sync-ui-kits.py <thư mục clone ui-kits>
"""
import json
import shutil
import sys
from pathlib import Path

DST = Path(__file__).resolve().parents[1] / "ui-kits"
src = Path(sys.argv[1])
reg = json.loads((src / "registry.json").read_text(encoding="utf-8"))

for d in DST.iterdir():                                   # kit đã gỡ khỏi kho thì gỡ khỏi site
    if d.is_dir() and d.name not in reg:
        shutil.rmtree(d)

kits = []
for kid, r in reg.items():
    shutil.copytree(src / kid, DST / kid, dirs_exist_ok=True)
    versions = json.loads((src / kid / "manifest.json").read_text(encoding="utf-8"))["versions"]
    source = r["source"]
    kits.append({"id": kid, "source": "" if source.startswith(("/", ".", "~")) else source, "latest": r["latest"],
                 "date": max(v["date"] for v in versions), "versions": [v["v"] for v in versions]})

kits.sort(key=lambda k: (k["date"], k["id"]), reverse=True)   # mới nhất trước
(DST / "kits.json").write_text(json.dumps(kits, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print(f"ui-kits/ · {len(kits)} kit")
