"""Chấm ảnh sk/ (skeleton.cjs) với ref/ KỂ CẢ CHỮ; in điểm và lưu sk/<slug>-diff.png (đỏ = lệch). rc 1 nếu có thành phần < 100."""
import json, sys, numpy as np
from PIL import Image
meta = json.load(open('ref/meta.json')); shots = json.load(open('sk/shots.json')); bad_any = False
for key, f in shots.items():
    if not f: print(key.ljust(30), 'không thấy ô demo'); bad_any = True; continue
    a = np.asarray(Image.open(meta[key]['file']).convert('RGB')).astype(int); b = np.asarray(Image.open(f).convert('RGB')).astype(int)
    h, w = min(a.shape[0], b.shape[0]), min(a.shape[1], b.shape[1]); a, b = a[:h, :w], b[:h, :w]
    bad = np.abs(a - b).sum(2) > 96; score = round(100 - bad.mean() * 100, 1)
    d = (b * .35).astype(np.uint8); d[bad] = [255, 40, 40]; Image.fromarray(d).save(f.replace('.png', '-diff.png'))
    print(key.ljust(30), 'score', score, 'bad px', int(bad.sum())); bad_any |= score < 100
sys.exit(1 if bad_any else 0)
