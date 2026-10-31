// Kiểm ui-libraries/libs.json: đủ 20 mục motion từ bài X (repo bị API bỏ im lặng → đỏ) và số trên trang chủ khớp số mục.
//   node tools/test-ui-libs.js
const assert = require('assert'), fs = require('fs'), path = require('path');
const R = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const libs = JSON.parse(R('ui-libraries/libs.json')).libs;
const have = new Set(libs.map((x) => x.repo.toLowerCase()));
const X20 = 'remotion-dev/remotion remotion-dev/skills juliangarnier/anime motiondivision/motion ManimCommunity/manim airbnb/lottie-web ahujasid/mcp-for-blender mrdoob/three.js gkjohnson/three-gpu-pathtracer jrouwe/JoltPhysics pmndrs/postprocessing Alchemist0823/three.quarks cocopon/tweakpane Comfy-Org/ComfyUI QwenAudio/CosyVoice librosa/librosa m-bain/whisperX obsproject/obs-studio mifi/lossless-cut FFmpeg/FFmpeg'.split(' ');
for (const r of X20) { assert(have.has(r.toLowerCase()), 'thiếu ' + r); assert.strictEqual(libs.find((x) => x.repo.toLowerCase() === r.toLowerCase()).kind, 'motion', r + ' phải là motion'); }
const home = R('index.html');
assert(home.includes(`<b>${libs.length}</b><span>thư viện UI`), 'trang chủ: số thư viện UI khác ' + libs.length);
assert(home.includes(`aw-tag--bold">${libs.length}<`), 'trang chủ: thẻ số khác ' + libs.length);
console.log('test-ui-libs: ok', libs.length, 'mục');
