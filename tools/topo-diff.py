#!/usr/bin/env python3
"""topo-diff — chấm độ khớp pixel giữa ảnh gốc topo/shots/orig.webp và ảnh chụp mock <dir>/mock.png (702×950).
khớp = % pixel mà MỌI kênh RGB lệch ≤ 32/255; giống = 100 − lệch tuyệt đối trung bình/255×100.
Bản «che chữ»: bỏ khung chữ của mock (<dir>/text.json) nới thêm 4 px — chữ gốc là font khác, đặt lệch vài px, không so được từng nét.
Ghi topo/match.json, topo/shots/mock.webp, topo/shots/diff.webp (đỏ = lệch > 32, xanh = vùng chữ đã che)."""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]; out = Path(sys.argv[1]); TOL = 32; PAD = 4
a = np.asarray(Image.open(ROOT / "topo/shots/orig.webp").convert("RGB"), dtype=np.int16)
m = Image.open(out / "mock.png").convert("RGB"); b = np.asarray(m, dtype=np.int16)
assert a.shape == b.shape, (a.shape, b.shape)
d = np.abs(a - b); bad = d.max(axis=2) > TOL
mask = np.zeros(bad.shape, bool)
for x0, y0, x1, y1 in json.loads((out / "text.json").read_text()):
    mask[max(0, y0 - PAD):y1 + PAD, max(0, x0 - PAD):x1 + PAD] = True
keep = ~mask
res = dict(tolerance=TOL, size=[a.shape[1], a.shape[0]],
           match=round(100 * (1 - bad.mean()), 2), like=round(100 - d.mean() / 255 * 100, 2),
           match_masked=round(100 * (1 - bad[keep].mean()), 2), like_masked=round(100 - d.max(axis=2)[keep].mean() / 255 * 100, 2),
           masked_pct=round(100 * mask.mean(), 2))
img = np.asarray(m).copy(); img[mask] = (img[mask] * .4 + np.array([30, 90, 200]) * .6).astype(np.uint8); img[bad & keep] = (255, 40, 40)
Image.fromarray(img).save(ROOT / "topo/shots/diff.webp", quality=75); m.save(ROOT / "topo/shots/mock.webp", quality=85)
(ROOT / "topo/match.json").write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
print(res)
