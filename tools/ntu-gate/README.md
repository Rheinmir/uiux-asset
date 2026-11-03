# Cổng pixel cho /namethatui/

So ảnh chụp trang gốc namethatui.com với bản dựng lại ở 1440 và 390 (hero, lưới, trang thuật ngữ, styles).

    python3 -m http.server 8793 --bind 127.0.0.1        # ở thư mục gốc repo
    mkdir /tmp/ntu-gate && cd /tmp/ntu-gate
    NODE_PATH=$(npm root -g) node <repo>/tools/ntu-gate/cap.cjs . http://127.0.0.1:8793/namethatui/
    python3 <repo>/tools/ntu-gate/score.py

Điểm = 100 − % điểm ảnh lệch (tổng chênh RGB > 96). Ba số mỗi màn: cả khung · bố cục (che vùng chữ) · bố cục (che chữ và ảnh minh hoạ).
Hoạt ảnh bị đóng băng, không làm mờ. Cần mạng để chụp trang gốc; không nằm trong `npm test`.

## Sinh lại demo của thẻ (lưới)

    NODE_PATH=$(npm root -g) node tools/ntu-gate/trace.cjs            # đo hộp/màu/bo góc/đổ bóng của từng demo trên trang gốc → trace.json
    (cd <thư mục có trace.json và namethatui/demo-text.json> && python3 <repo>/tools/ntu-gate/gen.py <repo>/namethatui/demos.gen.js)
    NODE_PATH=$(npm root -g) node tools/ntu-gate/refmats.cjs          # ảnh tham chiếu từng thẻ (chỉ để đo, không đưa vào repo)
    NODE_PATH=$(npm root -g) node tools/ntu-gate/matscore.cjs all && python3 tools/ntu-gate/matscore.py   # điểm từng thẻ (che chữ)

Công cụ chỉ đo kết quả hiển thị rồi sinh HTML/CSS mới với lớp riêng: không chép mã nguồn, văn bản CSS, đường dẫn SVG, ảnh hay phông của họ. Biểu tượng SVG thành hình đơn giản; hình tròn/chữ nhật/đường thẳng được dựng lại bằng CSS.
Chuỗi mẫu trong demo: tools/ntu-gate/demo-strings.json (chờ bản dịch tiếng Việt vào namethatui/demo-text.json).
