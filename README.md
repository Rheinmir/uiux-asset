# uiux-asset

Kho **code gốc nguyên văn** các pattern UI/UX (hiệu ứng, minh hoạ, component) để copy-paste dùng thật — không viết lại, không "lấy cảm hứng". Framework overstack trỏ về đây (kiểu KÉO NGOÀI, như `Rheinmir/archify`).

Xem chạy trực tiếp: **https://rheinmir.github.io/uiux-asset/**

| Thư mục | Nguồn | Số mục |
|---|---|---|
| [`scroll-effects/`](scroll-effects/) | freefrontend.com/javascript-scroll-effects (CodePen) | 65 (64 vendor được) |
| [`components/`](components/) | bài viết UI/UX tái tạo bằng code (chip: setproduct.com/blog/chip-ui-design) — dựng lại bằng `tools/build-chips.py` | chip: 29 mẫu |
| [`ui-kits/`](ui-kits/) | UI kit rút từ site thật bằng `/ui-kit-from-code` — mirror tự động từ kho private `Rheinmir/ui-kits` | tự tăng (xem `ui-kits/kits.json`) |
| [`galaxy/`](galaxy/) | [uiverse-io/galaxy](https://github.com/uiverse-io/galaxy) (Uiverse.io, MIT) — chép nguyên văn bằng `tools/vendor-galaxy.py`; xem trước trong iframe sandbox, Tailwind CDN cho mục không có `<style>` | 3.802 (433 dùng Tailwind) |
| [`motion/`](motion/) | 20 thư viện/công cụ motion (bài X của @e1genqq, xem `ui-libraries/`) — mỗi mục một trang chạy ngay trên web; nhãn "Thư viện thật" (nạp từ CDN, ghim phiên bản) hoặc "Mô phỏng" (Python/native không chạy được trên web). Mỗi trang mặc định là lưới thẻ chạy sống (`motion/_g.js`: đọc nút `#tabs`, mỗi thẻ là iframe `?embed=1&t=N` nạp khi gần màn hình), bấm thẻ mới mở bản lớn + code. Ảnh thẻ chụp bằng `tools/shot-motion.cjs` | 20 |
| [`teardown/`](teardown/) | [elvarofficial/teardown](https://github.com/elvarofficial/teardown) (MIT, bài X của @elvar_official) — hướng dẫn tiếng Việt + 3 máy 3D tháo rời được (V8, Cessna, Strandbeest) build nguyên văn bằng `node sims/build.mjs <tên>-live`, ~800 KB/trang, chạy offline | 3 |
| [`halvo/`](halvo/) | Mock dashboard nhà thông minh «Nesta» (3 màn Overview / Rooms / Climate bấm được) dựng tay HTML/CSS từ ảnh chụp (ảnh phòng/nền: Unsplash, có ghi nguồn); `halvo/diff.json` là số đo khớp pixel với ảnh gốc (ảnh gốc không đưa lên repo) | 3 |
| [`angles/`](angles/) | Landing page motion 8 góc máy (fisheye, tele, top-down, high angle, dirty frame, snow level, extreme close-up, dutch): cảnh 3D dựng hoàn toàn bằng CSS, máy quay chuyển cảnh theo cuộn hoặc tự chạy, kèm chú thích từng góc. Ý tưởng từ video của Everygen, không chép ảnh gốc | 8 |
| [`skills/`](skills/) | 40 Claude skill từ một bài Facebook (poster 5 nhóm × 8; bài chỉ có tên + mô tả nên repo gốc do ta truy ra). 25 skill chép NGUYÊN VĂN từ repo gốc (MIT/Apache-2.0/CC0, mỗi thư mục có `LICENSE` + `SOURCE.md` ghi repo, commit, ngày chép; 3 trong số đó README ghi MIT nhưng repo thiếu tệp LICENSE, chủ dự án chấp nhận); 15 skill chỉ liên kết (giấy phép không cho chép, không có LICENSE, hoặc nguồn chỉ «gợi ý»). Dữ liệu: `skills/data/*.json` → `python3 tools/build-skills.py` → `skills/index.json` | 40 |

## Tìm kiếm và thống kê
- **Tìm theo nghĩa** ở trang chủ (phím `/`): gõ tiếng Việt hay tiếng Anh, có dấu hay không dấu đều được — kết quả chia 2 nhóm (hiệu ứng cuộn · mẫu chip). Chạy trên Upstash Search gói free (20K truy vấn/tháng); cache 1 ngày, trần 18K/tháng, lỗi hoặc quá 2,5 giây thì tự rơi về tìm từ khoá. Đo 12 truy vấn mẫu: tìm theo nhóm đạt 12/12, tìm gộp chỉ 8–9/12 — `node tools/upload-search.mjs --eval`.
- **Thống kê truy cập** ở [`/stats.html`](stats.html): lượt xem, khách duy nhất/mới/quay lại, đang xem, trang, quốc gia, nguồn, thiết bị, từ khoá hay tìm, bot đã lọc. Không lưu IP thô (chỉ hash).
- Thêm/sửa mục → `python3 tools/build-search-index.py && node tools/upload-search.mjs`. Test: `node tools/test-stats.js && node tools/test-search.js`.

## Giao diện và UI kits tự cập nhật
- **Giao diện cả site = UI kit `awwwards-com`**: `aw.css` sinh bằng `python3 tools/build-aw-css.py` — cắt nguyên văn token + class `.aw-*` từ `ui-kits/awwwards-com/latest/index.html`, không gõ lại. `aw.js` chèn dải chạy, header, footer và nút sáng/tối cho mọi trang. Kit lên phiên bản mới → `npm test` báo lệch → build lại rồi deploy.
- **UI kits tự hiện**: mỗi commit vào `Rheinmir/ui-kits` chạy workflow `publish` ở kho đó → `tools/sync-ui-kits.py` chép kit vào `ui-kits/` + sinh `ui-kits/kits.json` → push vào repo này (deploy key `ui-kits-sync`) → GitHub Pages phát hành. Gallery `/ui-kits/` và mục "UI kit mới nhất" ở trang chủ đọc `kits.json` lúc mở trang nên **không cần deploy lại Vercel**. Trễ tối đa vài phút (workflow + cache Pages 10 phút).
- Kho kit vẫn PRIVATE nhưng **mọi kit đẩy vào đó đều thành công khai** qua đường này.

## Cách dùng
1. Mở gallery `<thư-mục>/index.html` → tìm hiệu ứng → **Chạy bản gốc** để xem thật.
2. Copy nguyên file `<thư-mục>/<slug>.html` (+ `_assets/` nếu file trỏ tới) vào dự án, giữ comment ghi công ở dòng đầu.
3. Chạy local qua HTTP (`python3 -m http.server`) — mở bằng `file://` thì texture WebGL/ảnh bị CORS chặn.

## Nguồn & giấy phép
Mỗi file là trang kết quả (`srcdoc`) do CodePen render cho pen public của tác giả, lấy qua `cdpn.io/<user>/fullpage/<id>`. Pen public trên CodePen mặc định **MIT** (freefrontend cũng gắn nhãn MIT từng mục). Dòng đầu mỗi file ghi tên pen, tác giả, link gốc — **giữ nguyên khi copy**.

Chỉ 4 can thiệp vào bản gốc, đều để chạy được ngoài CodePen:
- `stopExecutionOnTimeout` của CodePen → stub `window.CP` no-op (code tác giả giữ nguyên).
- Asset `assets.codepen.io` (plugin GSAP, ảnh, font của tác giả) → tải về `_assets/` vì header CORP chặn dùng ngoài CodePen; pen phụ thuộc (`codepen.io/<user>/pen/<id>.css|js`) → `_assets/pens/`.
- URL protocol-relative (`//host/…`) → `https://host/…`.
- Plugin GSAP bản "trial" GreenSock host trên CodePen (`16327/*.min.js` — chỉ chạy trên domain CodePen/localhost, domain khác hiện "Trial version deployed") → gói chính thức `gsap@3.13.0` trên jsdelivr (GSAP miễn phí toàn bộ từ 04/2025). Riêng `smooth-parallax-scroll-layout` thêm `ScrollToPlugin` vì bản beta cũ gói sẵn plugin này.

Trạng thái từng mục (`ok` / `partial` / `upstream-drift` / `upstream-broken` / `missing`) + lý do nằm trong `manifest.json` và badge trên gallery — hỏng tại nguồn thì ghi rõ, không vá bừa.

## Tái tạo / thêm thư mục mới
```bash
python3 tools/vendor.py page1.html page2.html … <thư-mục>   # trang listing freefrontend đã tải → vendor + manifest
node tools/fetch-assets.mjs <thư-mục>        # asset assets.codepen.io (cần Chromium headed — Cloudflare chặn headless/curl)
node tools/fetch-linked-pens.mjs             # pen phụ thuộc
node tools/thumbs.mjs                        # ảnh chụp (qua http server)
python3 tools/build-index.py <thư-mục>       # gallery
```
