# uiux-asset

Kho **code gốc nguyên văn** các pattern UI/UX (hiệu ứng, minh hoạ, component) để copy-paste dùng thật — không viết lại, không "lấy cảm hứng". Framework overstack trỏ về đây (kiểu KÉO NGOÀI, như `Rheinmir/archify`).

Xem chạy trực tiếp: **https://rheinmir.github.io/uiux-asset/**

| Thư mục | Nguồn | Số mục |
|---|---|---|
| [`scroll-effects/`](scroll-effects/) | freefrontend.com/javascript-scroll-effects (CodePen) | 65 (64 vendor được) |

## Cách dùng
1. Mở gallery `<thư-mục>/index.html` → tìm hiệu ứng → **Chạy bản gốc** để xem thật.
2. Copy nguyên file `<thư-mục>/<slug>.html` (+ `_assets/` nếu file trỏ tới) vào dự án, giữ comment ghi công ở dòng đầu.
3. Chạy local qua HTTP (`python3 -m http.server`) — mở bằng `file://` thì texture WebGL/ảnh bị CORS chặn.

## Nguồn & giấy phép
Mỗi file là trang kết quả (`srcdoc`) do CodePen render cho pen public của tác giả, lấy qua `cdpn.io/<user>/fullpage/<id>`. Pen public trên CodePen mặc định **MIT** (freefrontend cũng gắn nhãn MIT từng mục). Dòng đầu mỗi file ghi tên pen, tác giả, link gốc — **giữ nguyên khi copy**.

Chỉ 3 can thiệp vào bản gốc, đều để chạy được ngoài CodePen:
- `stopExecutionOnTimeout` của CodePen → stub `window.CP` no-op (code tác giả giữ nguyên).
- Asset `assets.codepen.io` (plugin GSAP, ảnh, font của tác giả) → tải về `_assets/` vì header CORP chặn dùng ngoài CodePen; pen phụ thuộc (`codepen.io/<user>/pen/<id>.css|js`) → `_assets/pens/`.
- URL protocol-relative (`//host/…`) → `https://host/…`.

Trạng thái từng mục (`ok` / `partial` / `upstream-drift` / `upstream-broken` / `missing`) + lý do nằm trong `manifest.json` và badge trên gallery — hỏng tại nguồn thì ghi rõ, không vá bừa.

## Tái tạo / thêm thư mục mới
```bash
python3 tools/vendor.py page1.html page2.html … <thư-mục>   # trang listing freefrontend đã tải → vendor + manifest
node tools/fetch-assets.mjs <thư-mục>        # asset assets.codepen.io (cần Chromium headed — Cloudflare chặn headless/curl)
node tools/fetch-linked-pens.mjs             # pen phụ thuộc
node tools/thumbs.mjs                        # ảnh chụp (qua http server)
python3 tools/build-index.py <thư-mục>       # gallery
```
