// Chỉ mục component cho agent (sinh bằng tools/build-agent-index.mjs). Hàng: [id,name,source,kind,kb,parts,license,tags,url,src?]
const INDEX = require('../agents/index.json');
const fold = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const BY_ID = new Map(INDEX.map((r) => [r[0], r]));
const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
};
module.exports = { INDEX, BY_ID, fold, cors };
