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
// 28 sample motion: mỗi repo X20 + 8 repo «Hiệu ứng» cũ có trang motion/<slug>.html, đứng trong gallery motion/index.html, và thẻ ở ui-libraries trỏ tới đúng trang đó.
const OLD8 = 'DavidHDev/react-bits magicuidesign/magicui imskyleen/animate-ui ibelick/motion-primitives nolly-studio/cult-ui unovue/inspira-ui shader-effects-inc/shaders uiverse-io/galaxy'.split(' ');
const tpl = R('tools/ui-libs.tpl.html'), gal = R('motion/index.html');
const map = Object.fromEntries([...tpl.matchAll(/'([^']+\/[^']+)': '([a-z0-9-]+)'/g)].map((m) => [m[1].toLowerCase(), m[2]]));
for (const r of X20.concat(OLD8)) {
  const slug = map[r.toLowerCase()]; assert(slug, 'ui-libs.tpl.html thiếu SAMPLE cho ' + r);
  if (slug !== 'galaxy') assert(fs.existsSync(path.join(__dirname, '..', 'motion', slug + '.html')), 'thiếu motion/' + slug + '.html');
  assert(fs.existsSync(path.join(__dirname, '..', 'motion', 'thumbs', slug + '-stage.jpg')), 'thiếu ảnh thẻ motion/thumbs/' + slug + '-stage.jpg');
  assert(gal.includes(`'${slug}', `), 'motion/index.html thiếu ' + slug);
  if (slug !== 'galaxy') assert(R('motion/' + slug + '.html').includes('href="./"'), slug + ': thiếu link về gallery');
  if (slug !== 'galaxy') assert(/<script src="_g\.js[^"]*" defer><\/script>/.test(R('motion/' + slug + '.html')), slug + ': thiếu _g.js (dạng lưới xem nhanh)');
  if (slug !== 'galaxy') assert(R('motion/' + slug + '.html').includes('id="tabs"'), slug + ': thiếu #tabs (lưới đọc nút tab từ đây)');
  assert(R('ui-libraries/index.html').includes(`'${r}': '${slug}'`), 'ui-libraries/index.html chưa build lại cho ' + r);
}
console.log('test-ui-libs: 28 sample motion ok');
