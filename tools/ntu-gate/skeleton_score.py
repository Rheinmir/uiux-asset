"""Chấm ảnh sk/ (skeleton.cjs) với ref/ KỂ CẢ CHỮ; in điểm và lưu sk/<slug>-diff.png (đỏ = lệch). rc 1 nếu có thành phần < 100."""
import json, sys, numpy as np
from PIL import Image
meta = json.load(open('ref/meta.json')); shots = json.load(open('sk/shots.json')); bad_any = False
for key, f in shots.items():
    if not f: print(key.ljust(30), 'không thấy ô demo'); bad_any = True; continue
    a = np.asarray(Image.open(meta[key]['file']).convert('RGB')).astype(int)
    files = f if isinstance(f, list) else [f]; cands = []
    for fn in files:
        b = np.asarray(Image.open(fn).convert('RGB')).astype(int)
    # chụp phần tử ở toạ độ lẻ có thể lệch nguyên 1–2 điểm ảnh thiết bị giữa hai trang (lỗi chụp, không phải lỗi thành phần): thử dịch ±2, lấy độ lệch nhỏ nhất
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                A = a[max(0, dy):, max(0, dx):]; B = b[max(0, -dy):, max(0, -dx):]
                h, w = min(A.shape[0], B.shape[0]) - 2, min(A.shape[1], B.shape[1]) - 2; A, B = A[:h, :w], B[:h, :w]
                m = np.abs(A - B).sum(2) > 96
                cands.append((int(m.sum()), m, B, dx, dy, fn))
    _, bad, b, dx, dy, fn = min(cands, key=lambda c: c[0]); f = files[0].split('@')[0] + '.png'; score = round(100 - bad.mean() * 100, 1)
    d = (b * .35).astype(np.uint8); d[bad] = [255, 40, 40]; Image.fromarray(d).save(f.replace('.png', '-diff.png'))
    print(key.ljust(30), 'score', score, 'bad px', int(bad.sum()), 'shift', (dx, dy), fn.split('@')[-1][:-4] if '@' in fn else ''); bad_any |= score < 100
sys.exit(1 if bad_any else 0)
