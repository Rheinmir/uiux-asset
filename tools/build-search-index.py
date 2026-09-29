#!/usr/bin/env python3
"""build-search-index — search-index.json: mọi mục tìm được của uiux-asset (65 hiệu ứng scroll + 29 hình chip).

Nguồn đọc thẳng từ dữ liệu có sẵn, không gõ tay: scroll-effects/manifest.json và SECTIONS của tools/build-chips.py.
File này vừa là dữ liệu nạp lên Upstash Search (tools/upload-search.mjs), vừa là chỉ mục cho fallback tìm từ khoá
phía API khi Search lỗi/hết hạn mức.

    python3 tools/build-search-index.py           # ghi search-index.json
    python3 tools/build-search-index.py --check   # rc 1 nếu file lệch nguồn (quên build lại)
"""
import importlib.util
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "search-index.json"
RUN_BASE = "https://rheinmir.github.io/uiux-asset/scroll-effects/"   # cùng gốc với tools/build-index.py


def strip(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()


def items() -> list:
    out = []
    for m in json.loads((ROOT / "scroll-effects/manifest.json").read_text(encoding="utf-8")):
        if not m.get("file"):
            continue                                    # mục 'missing' không có file để mở
        out.append(dict(id=f"se-{m['id']}", kind="scroll-effect", title=m["title"],
                        text=" · ".join(filter(None, [m.get("desc"), f"tác giả {m.get('user')}"])),
                        # thử gắn nhãn Việt chung "Hiệu ứng cuộn trang" để kéo truy vấn Việt về scroll: TỆ HƠN (đo 29/09: 10/12 → 9/12) — bỏ
                        url=RUN_BASE + m["file"], status=m.get("status", "ok")))
    spec = importlib.util.spec_from_file_location("build_chips", ROOT / "tools/build-chips.py")
    chips = importlib.util.module_from_spec(spec); spec.loader.exec_module(chips)
    for group, figs in chips.SECTIONS:
        for no, title, cap, _demo in figs:
            out.append(dict(id=f"chip-{no.replace('–', '-')}", kind="chip", title=f"Chip · {title}",
                            text=f"{group} · {strip(cap)}", url=f"/components/chip.html#f{no.split('–')[0]}", status="ok"))
    return out


def render() -> str:
    return json.dumps(items(), ensure_ascii=False, indent=1) + "\n"


if __name__ == "__main__":
    new = render()
    if "--check" in sys.argv:
        ok = OUT.is_file() and OUT.read_text(encoding="utf-8") == new
        print(f"search-index: {'OK' if ok else 'LỆCH nguồn — chạy lại không có --check'} ({len(json.loads(new))} mục)")
        sys.exit(0 if ok else 1)
    OUT.write_text(new, encoding="utf-8")
    print(f"→ {OUT} ({len(json.loads(new))} mục)")
