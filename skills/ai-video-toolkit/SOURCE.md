# Nguồn: AI Video Toolkit

- Repo: https://github.com/digitalsamba/claude-code-video-toolkit
- Đường dẫn trong repo: `skills/video-toolkit + .claude/skills/*`
- Commit đã chép: `29995dce7d19443d5e6cb384ce8e4bb86ab98967`
- Giấy phép: MIT (bản sao trong `LICENSE` cùng thư mục)
- Ngày chép: 2026-11-01
- Độ chắc khi truy nguồn: gợi ý
- Chép nguyên văn, không sửa.

## Cách xếp tệp (không sửa nội dung từng tệp)
- `SKILL.md` = `skills/video-toolkit/SKILL.md` của repo (skill chính, name: video_toolkit)
- `related/<tên>/` = `.claude/skills/<tên>/` của repo: acestep, elevenlabs, ffmpeg, frontend-design, ideogram4, ltx2, moviepy, playwright-recording, qwen-edit, remotion, runpod, synthetic-ui-demo

## Đã bỏ
- `.claude/skills/remotion-official/` (144 tệp, ~1.5MB): bản sao nguyên văn của remotion-dev/skills (xem docs/remotion-skills-sync.md trong repo). Repo gốc không có giấy phép phân phối lại và repo mẹ Remotion dùng giấy phép tuỳ biến, nên MIT của toolkit không bao được nội dung này.
- `.claude/commands/`, `tools/`, `templates/`, `lib/`, `docs/` ...: không thuộc thư mục skill.

## Ghi chú
Chọn theo mô tả (quy trình AI từ kịch bản đến MP4 QC) chứ không theo tên: tên 'ai-video-toolkit' không phải tên repo hay skill ở đây (skill chính là video_toolkit). Chép skills/video-toolkit/SKILL.md làm SKILL.md gốc + 12 skill trong .claude/skills vào related/. KHÔNG chép .claude/skills/remotion-official (bản sao remotion-dev/skills, không có giấy phép phân phối lại). Không chép .claude/commands, tools/, templates/ (skill tham chiếu tới chúng, cần clone cả repo để chạy).
