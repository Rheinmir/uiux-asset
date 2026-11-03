# Cổng pixel cho /namethatui/

So ảnh chụp trang gốc namethatui.com với bản dựng lại ở 1440 và 390 (hero, lưới, trang thuật ngữ, styles).

    python3 -m http.server 8793 --bind 127.0.0.1        # ở thư mục gốc repo
    mkdir /tmp/ntu-gate && cd /tmp/ntu-gate
    NODE_PATH=$(npm root -g) node <repo>/tools/ntu-gate/cap.cjs . http://127.0.0.1:8793/namethatui/
    python3 <repo>/tools/ntu-gate/score.py

Điểm = 100 − % điểm ảnh lệch (tổng chênh RGB > 96). Ba số mỗi màn: cả khung · bố cục (che vùng chữ) · bố cục (che chữ và ảnh minh hoạ).
Hoạt ảnh bị đóng băng, không làm mờ. Cần mạng để chụp trang gốc; không nằm trong `npm test`.
