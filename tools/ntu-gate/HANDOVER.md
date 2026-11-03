# Bàn giao (Kanoa → phiên kế, 03/11/2026)

Nhánh: `kanoa/ntu-overflow` (đã đẩy lên origin, chưa merge). `main` Live đang có bước 1 (khung chung) = sha 727371ac. Quy tắc: cổng 98 (che chữ) ở 1440/1024/768/390/320, chưa đạt thì không deploy; lỗi thì lùi bản trước.

## Đã xong (đã Live)
- «Tên UI» nằm trong khung chung (aw.css + aw.js); bỏ header/⌘K/ô tìm riêng; chỉ một ô tìm (hero).
## Đã làm trên nhánh, chưa Live
1. Demo thẻ CO GIÃN: `gen2.py` (đo ở 4 độ rộng thẻ 312/350/358/288, calc + cqw, chữ ellipsis trong hộp) → `namethatui/demos.gen.js`. Bỏ bản vẽ tay rule-editor/waffle-menu, pie căn giữa theo cqw. `.mat.qm{container-type:inline-size}` trong demos.css.
2. CSS bù đệm khung chung: lề nội dung = 16px (<640) / 24px (≥640) như gốc; row-gap thanh tab = 0; min-height khối chữ theo độ rộng (hero/styles sub, rhead, đoạn đầu trang thuật ngữ).
3. Móc cho demo TRANG CHI TIẾT co giãn: index.html đọc `window.NT_DETAIL_GEN[key]` (sau NT_DETAIL của Kiyomi), CSS `.qd` / `.dmat.dg` trong demos.css. File `namethatui/detail.gen.js` hiện RỖNG (`{}`).

## Việc dở (làm tiếp theo thứ tự)
A. Sinh `detail.gen.js`: tracer chi tiết `tools/ntu-gate/dtrace.cjs` chạy ở 5 độ rộng (1440/1024/768/390/320), ra `dtrace-<W>.json`, mỗi lượt ~15 phút (91 trang). Lệnh: `VW=1440 OUTF=dtrace-1440.json NODE_PATH=$(npm root -g) node tools/ntu-gate/dtrace.cjs` (mỗi độ rộng một tiến trình, chạy song song). Sau đó `MODE=detail python3 tools/ntu-gate/gen2.py namethatui/detail.gen.js` trong thư mục có 5 tệp dtrace và `demo-text.json`. Độ rộng khung demo gốc: 585 / 515 / 720 / 358 / 288 px. (5 tiến trình đang chạy ở /tmp/kanoa-px nhưng phiên này đóng thì mất: chạy lại nếu không thấy dtrace-*.json.)
B. Đo cổng: `WIDTHS=1440,1024,768,390,320 node tools/ntu-gate/cap.cjs . [URL]` rồi `WIDTHS=... python3 tools/ntu-gate/score.py` (cần server tĩnh `python3 -m http.server 8793` ở gốc repo; cap.cjs lấy trang gốc namethatui.com). Điểm hiện tại (che chữ, trước khi có detail.gen.js): chỉ 3 màn <98: term 390 = 97.2, term 320 = 96.9, styles 320 = 95.2. Còn lại ≥98.0 (1440, 1024, 768 đều đạt).
C. Styles 320: nghệ thuật phong cách của Kiyomi lệch ở mép khi khung thẻ 288 px (nhờ Kiyomi kiểm co giãn style-art ở 320/390/768/1024).
D. Trang thuật ngữ cao hơn gốc ~1,25 lần (Kiyomi báo): «Xem thêm» đang là hàng dọc 46px (gốc: chip ngang), «Trong code» là hộp có nhãn mỗi dòng (gốc: bảng 4 hàng gọn), khoảng cách khối lớn hơn. Cần đo hộp chữ theo từng khối rồi siết lại.
E. Số đo «khung chữ khớp gốc» (chủ yêu cầu): chưa có chỉ số hộp bao chữ (số dòng, độ dài, vị trí). Gợi ý: trong cap.cjs đã có mặt nạ chữ (meta.json, T); so IoU giữa các hộp chữ gốc/mình theo khối.
F. Demo kém nhất theo thẻ (che chữ, mọi độ rộng): parallax ~92-95, bento-grid ~92-95, sign-in ~95-96, lightbox, bottom-navigation, context-menu, text-animations (biểu tượng SVG thành hình đơn giản; đường/polyline không dựng lại).
G. Báo Live: merge `origin/main` vào nhánh (Kiyomi đẩy liên tục: demo-text.json, demo-detail.js/css, pageView/vsView), chạy `npm test`, `routes` ở 390, đẩy main, Git tự deploy, smoke Playwright trên domain thật, báo sha + deploy id.

Công cụ đo nằm ở `tools/ntu-gate/` (README.md + file này). Dữ liệu thô (trace-*.json, ref-*, mine-*) không lưu trong repo.
