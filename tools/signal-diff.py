#!/usr/bin/env python3
"""signal-diff — chấm độ khớp pixel giữa ảnh gốc (signal/shots/orig-N.webp) và ảnh chụp mock (<dir>/mock-N.png).
Hai số: khớp = % pixel mà MỌI kênh RGB lệch ≤ 32/255; giống = 100 − (lệch tuyệt đối trung bình / 255 × 100).
Ghi signal/match.json và <dir>/diff-N.png (đỏ = lệch > 32)."""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]; out = Path(sys.argv[1]); TOL = 32; res = []
for n in range(1, 6):
    a = np.asarray(Image.open(ROOT / f"signal/shots/orig-{n}.webp").convert("RGB"), dtype=np.int16)
    b = np.asarray(Image.open(out / f"mock-{n}.png").convert("RGB"), dtype=np.int16)
    assert a.shape == b.shape, (a.shape, b.shape)
    d = np.abs(a - b); bad = d.max(axis=2) > TOL
    # chia theo vùng để biết chỗ nào kéo tụt: vỏ trên (0–424), video (424–1898), vỏ dưới (1898–)
    z = lambda y0, y1: round(100 * (1 - bad[y0:y1].mean()), 2)
    res.append(dict(screen=n, match=round(100 * (1 - bad.mean()), 2), like=round(100 - d.mean() / 255 * 100, 2), top=z(0, 424), video=z(424, 1898), bottom=z(1898, 2556)))
    img = np.asarray(Image.open(out / f"mock-{n}.png").convert("RGB")).copy(); img[bad] = (255, 40, 40); Image.fromarray(img).save(out / f"diff-{n}.png"); Image.fromarray(img).save(ROOT / f"signal/shots/diff-{n}.webp", quality=70)
    print(res[-1])
(ROOT / "signal/match.json").write_text(json.dumps(dict(tolerance=TOL, size=[1179, 2556], screens=res), ensure_ascii=False, indent=1), encoding="utf-8")
print("avg match", round(sum(r["match"] for r in res) / 5, 2))
