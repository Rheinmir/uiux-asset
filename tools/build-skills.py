#!/usr/bin/env python3
"""build-skills — gộp skills/post-list.json (40 skill trong bài Facebook) với skills/data/<slug>.json (kết quả truy nguồn từng skill)
thành skills/index.json cho trang /skills/. Kiểm: đủ 40 mục; mục đã chép phải có SOURCE.md + LICENSE + ít nhất một SKILL.md; mục không chép phải ghi lý do.

    python3 tools/build-skills.py           # ghi skills/index.json
    python3 tools/build-skills.py --check   # rc 1 nếu index.json lệch hoặc thiếu tệp
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
S = ROOT / "skills"


def build():
    post = json.loads((S / "post-list.json").read_text(encoding="utf-8"))
    out, errs = [], []
    for p in post["skills"]:
        f = S / "data" / f"{p['slug']}.json"
        if not f.exists():
            errs.append(f"thiếu skills/data/{p['slug']}.json")
            continue
        d = json.loads(f.read_text(encoding="utf-8"))
        d.update({k: p[k] for k in ("name", "category", "tagline", "desc_vi")})   # tên/mô tả theo bài, không theo agent
        if d.get("vendored"):
            base = S / p["slug"]
            for need in ("SOURCE.md", "LICENSE"):
                if not (base / need).exists():
                    errs.append(f"{p['slug']}: thiếu {need}")
            m = re.search(r"\b([0-9a-f]{40})\b", (base / "SOURCE.md").read_text(encoding="utf-8")) if (base / "SOURCE.md").exists() else None
            if m:
                d["commit"] = m.group(1)   # nguồn sự thật là SOURCE.md đi kèm tệp đã chép
            else:
                errs.append(f"{p['slug']}: SOURCE.md không có commit sha 40 ký tự")
            if not list(base.rglob("SKILL.md")):
                errs.append(f"{p['slug']}: không có SKILL.md")
            real = [x for x in base.rglob("*") if x.is_file()]
            d["bytes"] = sum(x.stat().st_size for x in real)
            d["file_count"] = len(real)
            d["skill_md"] = sorted(str(x.relative_to(base)) for x in real if x.name == "SKILL.md")   # trang chỉ cần các SKILL.md thật có trên đĩa, không cần cả danh sách tệp
        elif not d.get("reason"):
            errs.append(f"{p['slug']}: không chép nhưng thiếu reason")
        pv = d.get("preview")
        if pv:   # ảnh «sản phẩm trông thế này»: kind upstream|generated|link (link: ảnh ở repo gốc, không chép)
            if pv.get("kind") not in ("upstream", "generated", "link"):
                errs.append(f"{p['slug']}: preview.kind phải là upstream|generated|link")
            if pv.get("kind") == "link":
                if not str(pv.get("src", "")).startswith("https://"):
                    errs.append(f"{p['slug']}: preview kind=link cần src https://")
            elif not (ROOT / "skills" / p["slug"] / pv.get("src", "-")).is_file() or not d.get("vendored"):
                errs.append(f"{p['slug']}: preview chép/tạo cần skill đã chép và tệp skills/{p['slug']}/{pv.get('src')}")
            for need in ("label", "credit"):
                if not pv.get(need):
                    errs.append(f"{p['slug']}: preview thiếu {need}")
        elif not d.get("no_preview"):
            d["no_preview"] = "chưa có"   # trang ghi «chưa có ảnh», không bịa
        d.pop("files", None)
        out.append(d)
    meta = {"source": post["source"], "total": len(out), "vendored": sum(1 for x in out if x.get("vendored")), "skills": out}
    return meta, errs


def main():
    meta, errs = build()
    if errs:
        print("\n".join(errs), file=sys.stderr)
        sys.exit(1)
    text = json.dumps(meta, ensure_ascii=False, indent=1) + "\n"
    f = S / "index.json"
    if "--check" in sys.argv:
        ok = f.exists() and f.read_text(encoding="utf-8") == text
        print(f"skills: {'OK' if ok else 'LỆCH index.json'} ({meta['vendored']}/{meta['total']} đã chép)")
        sys.exit(0 if ok else 1)
    f.write_text(text, encoding="utf-8")
    print(f"skills: {meta['total']} mục · {meta['vendored']} đã chép nguyên văn · {sum(1 for x in meta['skills'] if x['confidence'] != 'chắc')} chưa chắc nguồn")


if __name__ == "__main__":
    main()
