#!/usr/bin/env node
// build-agent-index — chỉ mục component cho AI agent (/llms.txt → /api/find → /api/get), mỗi phản hồi có trần nên agent không tràn context.
// Ghi agents/index.json (hàng [id,name,source,kind,kb,parts,license,tags,url,src]; API nạp, agent KHÔNG đọc) +
// agents/code/<source>/<slug>.<part>.txt (code trích ra) + llms.txt. Code đã nằm sẵn trên site thì KHÔNG chép lại: `src` trỏ
// tới file đó (đường dẫn trong repo; tiền tố "gh:" = chỉ có trên GitHub Pages, vd galaxy/, scroll-effects/ bị .vercelignore loại).
//   node tools/build-agent-index.mjs           # dựng lại (cần ../crawls/ cho lucian + 9 thư viện)
//   node tools/build-agent-index.mjs --check   # kiểm toàn vẹn: id duy nhất, mọi part có file, mỗi nguồn > 0
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CRAWLS = process.env.CRAWLS || path.join(ROOT, '..', 'crawls');
const OUT = path.join(ROOT, 'agents');
const SITE = 'https://uiux.giatbh.io.vn';
const r = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const slugify = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd')
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
const human = (s) => s.replace(/[-_]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (c) => c.toUpperCase());

if (process.argv.includes('--check')) process.exit(check());

const rows = [], texts = new Map(), seen = new Set();
// parts: {part: string (code, ghi vào agents/code) | {src: 'path'|'gh:path'}}
function add(source, slug, name, kind, license, url, tags, parts) {
  let id = `${source}/${slugify(slug)}`;
  for (let i = 2; seen.has(id); i++) id = `${source}/${slugify(slug)}-${i}`;
  seen.add(id);
  let bytes = 0; const src = {};
  for (const [p, v] of Object.entries(parts)) {
    if (typeof v === 'string') { texts.set(`${id}.${p}.txt`, v); bytes += Buffer.byteLength(v); }
    else {
      src[p] = v.src;
      const t = texts.get(v.src.replace(/^agents\/code\//, ''));
      bytes += t != null ? Buffer.byteLength(t) : fs.statSync(path.join(ROOT, v.src.replace(/^gh:/, ''))).size;
    }
  }
  const tg = [...new Set(tags.filter(Boolean).map((t) => String(t).toLowerCase()))].slice(0, 12);
  rows.push([id, String(name).slice(0, 80), source, kind, Math.max(1, Math.round(bytes / 1024)), Object.keys(parts), license, tg, url,
    ...(Object.keys(src).length ? [src] : [])]);
}
const scripts = (html) => [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const stub = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'length' ? 0 : stub()), apply: () => stub(), construct: () => stub() });
function evalVar(js, name) { // chạy script trang trong vm với DOM giả, lấy biến `const <name> = …` ngay khi được gán
  const ctx = { console: { log() {}, warn() {}, error() {} }, setTimeout() {}, setInterval() {}, requestAnimationFrame() {}, performance: { now: () => 0 } };
  for (const k of ['document', 'window', 'matchMedia', 'addEventListener', 'localStorage', 'navigator', 'location', 'IntersectionObserver',
    'ResizeObserver', 'MutationObserver', 'getComputedStyle', 'THREE', 'gsap', 'CSS']) ctx[k] = stub();
  ctx.globalThis = ctx;
  try { vm.runInNewContext(js.replace(new RegExp(`(?:const|let)\\s+${name}\\s*=`), `var ${name} = globalThis.__v =`), ctx, { timeout: 3000 }); } catch {}
  return ctx.__v;
}

// ---------- a) nội dung sẵn có trên site ----------
const OWN = 'site-authored (uiux-asset)';
for (const p of JSON.parse(r('patterns/patterns.json'))) {
  const page = r(`patterns/${p.page}`);
  const V = evalVar(scripts(page).filter((s) => /const V\s*=/.test(s)).join('\n'), 'V') || [];
  for (const v of p.variants || [{ id: p.id, en: p.en, vi: p.vi, use: p.use }]) {
    const x = V.find((o) => o.id === v.id) || {};
    const parts = {};
    const html = x.html || x.a, css = [x.css, x.cb].filter((s) => typeof s === 'string').join('\n'), js = [x.js, x.run].filter((s) => typeof s === 'string').join('\n');
    if (typeof html === 'string') parts.html = html;
    if (css) parts.css = css;
    if (js) parts.js = js;
    if (!parts.html) parts.html = { src: `patterns/${p.page}` }; // biến thể là cả trang (three.js, bảng lớn…)
    add('patterns', `${p.id}-${v.id}`, `${v.en || v.id} (${p.en})`, 'pattern', OWN, `${SITE}/patterns/${p.page}#${v.id}`,
      [p.id, v.vi, p.vi, v.use, v.seen, x.cat, x.tag], parts);
  }
}
for (const [cat, file, author, name, tags, tw] of JSON.parse(r('galaxy/index.json')))
  add('galaxy', `${cat}-${author}-${name}`, `${human(name)} (${cat})`, cat.toLowerCase().replace(/s$/, ''), 'MIT (Uiverse.io)',
    `https://uiverse.io/${author}/${name}`, [cat, ...(tags || []), tw ? 'tailwind' : ''], { html: { src: `gh:galaxy/${cat}/${file}` } });
{
  const h = r('components/chip.html');
  const css = h.match(/<style>([\s\S]*?)<\/style>/)[1];
  texts.set('components/_chip.css.txt', css);
  for (const m of h.matchAll(/<section class="fig" id="(f\d+)"><h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/section>/g)) {
    const title = m[2].replace(/<[^>]+>/g, ' ').replace(/Hình [\d–-]+/, '').trim();
    add('components', `chip-${m[1]}-${title}`, `Chip: ${title}`, 'chip', OWN, `${SITE}/components/chip.html#${m[1]}`, ['chip', title],
      { html: m[3].trim(), css: { src: 'agents/code/components/_chip.css.txt' } });
  }
}
for (const f of fs.readdirSync(path.join(ROOT, 'motion')).filter((f) => f.endsWith('.html') && f !== 'index.html')) {
  const t = (r(`motion/${f}`).match(/<title>([^<]*)/) || [])[1] || f;
  add('motion', f.replace('.html', ''), t.replace(/^Sample\s+/, '').replace(/\s+—.*$/, ''), 'motion-sample', 'see page (library licenses vary)',
    `${SITE}/motion/${f}`, ['motion', 'animation'], { html: { src: `motion/${f}` } });
}
for (const x of JSON.parse(r('scroll-effects/manifest.json')))
  if (x.file && fs.existsSync(path.join(ROOT, 'scroll-effects', x.file)))
    add('scroll-effects', x.file.replace('.html', ''), x.title, 'scroll-effect', x.license || 'MIT', x.url, ['scroll', x.user, x.status, x.desc],
      { html: { src: `gh:scroll-effects/${x.file}` } });
{
  const G = 'ui-moments/gallery', UM = 'MIT (ui-moments, github.com/luojiaping/ui-moments)';
  const w = {}; vm.runInNewContext(r(`${G}/works.js`), { window: w });
  const used = new Set(['ldrs', 'loaders', 'loading-ui', 'micron', 'svg-spinners']);
  const work = (id, name, dir, tags) => {
    const parts = { html: { src: `${G}/${dir}/index.html` } };
    for (const f of fs.readdirSync(path.join(ROOT, G, dir))) if (f.endsWith('.css')) parts.css = { src: `${G}/${dir}/${f}` };
    add('ui-moments', id, name, 'interaction', UM, `${SITE}/${G}/${dir}/`, tags, parts);
  };
  for (const x of w.WORKS || []) { const dir = x.source.split('/')[1]; used.add(dir); work(x.id, x.en || x.title, dir, [...(x.tags || []), x.summary]); }
  for (const d of fs.readdirSync(path.join(ROOT, G)))
    if (!used.has(d) && fs.existsSync(path.join(ROOT, G, d, 'index.html'))) work(d, human(d), d, [d]);
  const imp = async (f) => import(path.join(ROOT, G, f));
  for (const x of (await imp('loaders/catalog.mjs')).loaders) {
    const f = `${G}/loaders/vendor/ldrs/dist/elements/${x.key}.js`;
    if (fs.existsSync(path.join(ROOT, f))) add('ui-moments', `ldrs-${x.key}`, `${x.name} loader (LDRS <${x.tag}>)`, 'loader', 'MIT (LDRS)',
      'https://github.com/GriffinJohnston/ldrs', ['loader', 'spinner', 'loading', x.description], { js: { src: f } });
  }
  const LU = `${G}/loading-ui/vendor/loading-ui/src/registry/components/loading-ui`;
  for (const x of (await imp('loading-ui/catalog.mjs')).loadingUILoaders) {
    const f = [`${x.slug}.tsx`, `${x.slug}-loader.tsx`].map((n) => `${LU}/${n}`).find((p) => fs.existsSync(path.join(ROOT, p)));
    if (f) add('ui-moments', x.key, `${x.name} loader (Loading UI)`, 'loader', 'MIT (Loading UI)', 'https://github.com/turbostarter/loading-ui',
      ['loader', 'loading', 'spinner', 'react'], { tsx: { src: f } });
  }
  for (const x of (await imp('micron/catalog.mjs')).micronWorks)
    add('ui-moments', x.id, `Micron ${x.en} button effect`, 'interaction', 'MIT (Micron.js)', 'https://github.com/webkul/micron',
      ['micron', 'button', 'click', 'feedback', x.en, x.category], { css: { src: `${G}/micron/vendor/micron/dist/css/micron.css` } });
  for (const x of (await imp('svg-spinners/catalog.mjs')).svgSpinners) {
    const f = ['svg-css', 'svg-smil'].map((d) => `${G}/svg-spinners/vendor/svg-spinners/${d}/${x.slug}.svg`).find((p) => fs.existsSync(path.join(ROOT, p)));
    if (f) add('ui-moments', x.key, `${x.name} SVG spinner`, 'loader', 'MIT (SVG Spinners)', 'https://github.com/n3r4zzurr0/svg-spinners',
      ['spinner', 'loader', 'svg', 'loading'], { html: { src: f } });
  }
}
{
  const w = {};
  for (const f of ['data.js', 'demos.gen.js']) vm.runInNewContext(r(`namethatui/${f}`), { window: w });
  const KIND = { macos: 'macos', web: 'web', styles: 'style', vs: 'vs' };
  for (const [k, list] of Object.entries(w.NT)) for (const [slug, name, desc] of list) {
    const demo = (w.NT_DEMOS_GEN || {})[`${k}/${slug}`];
    add('namethatui', `${k}-${slug}`, name, KIND[k] || k, OWN + ' — term names from namethatui.com', `${SITE}/namethatui/${k}/${slug}`,
      [k, slug, desc], demo ? { html: demo } : {});
  }
}
for (const x of JSON.parse(r('ui-libraries/libs.json')).libs)
  add('ui-libraries', x.repo, x.repo, x.kind || 'library', x.license || 'see repo', x.url, [x.fw, x.lang, x.desc, x.home], {});

// ---------- b) Lucian UX/UI Prompt (crawl, owner duyệt công khai) ----------
const LUC = path.join(CRAWLS, 'lucianlabs-uxui-prompt/site/lucianlabs.dev/uxui-prompt/assets');
if (fs.existsSync(LUC)) {
  const files = fs.readdirSync(LUC), w = {};
  vm.runInNewContext(fs.readFileSync(path.join(LUC, files.find((f) => f.startsWith('catalog.'))), 'utf8'), { window: w });
  const html = new Map();
  for (const f of files.filter((f) => f.startsWith('previews-')))
    for (const it of JSON.parse(fs.readFileSync(path.join(LUC, f), 'utf8')).items) html.set(it.id, it.html);
  texts.set('lucian/_tokens.css.txt', w.UXG_DATA.tokens);
  for (const x of w.UXG_DATA.items) if (html.has(x.id))
    add('lucian', `${x.id}-${x.slug}`, x.en?.title || x.slug, slugify(x.tags?.[0] || 'ui'), 'open source, free incl. commercial (author post)',
      'https://lucianlabs.dev/uxui-prompt/', [...(x.tags || []), x.en?.summary, x.slug], { html: html.get(x.id), css: { src: 'agents/code/lucian/_tokens.css.txt' } });
} else console.warn('bỏ qua lucian: không có', LUC);

// ---------- c) 9 thư viện clone (owner duyệt công khai) ----------
const EXT = { '.tsx': 'tsx', '.jsx': 'js', '.js': 'js', '.mjs': 'js', '.ts': 'ts', '.css': 'css', '.html': 'html', '.svg': 'html', '.vue': 'html' };
const SKIP = /(\.test\.|\.spec\.|\.stories\.|\.d\.ts$|\.map$)|^(package\.json|tsconfig.*|README.*|LICENSE.*)$/i;
const LIBS = [ // [source, thư mục repo, upstream, license, danh sách [slug, kind, [thư mục|file…]]]
  ['shadcn', 'shadcn-ui_ui', 'https://github.com/shadcn-ui/ui', 'MIT', (R) => files(R, 'apps/v4/registry/new-york-v4/ui', 'ui', /^_/)],
  ['coss', 'cosscom_ui', 'https://github.com/cosscom/ui', 'MIT', (R) => files(R, 'packages/ui/src/components', 'ui')],
  ['magicui', 'magicuidesign_magicui', 'https://github.com/magicuidesign/magicui', 'MIT', (R) => files(R, 'apps/www/registry/magicui', 'effect')],
  ['kibo', 'shadcnblocks_kibo', 'https://github.com/shadcnblocks/kibo', 'MIT', (R) => dirs(R, 'packages', 'ui', /^(typescript-config|shadcn-ui|patterns)$/)],
  ['bencho', 'cabralorenzo_bencho', 'https://github.com/cabralorenzo/bencho', 'MIT', (R) => dirs(R, 'blocks', 'block')],
  ['tactile', 'cipriantitire_tactile-ui-free', 'https://github.com/cipriantitire/tactile-ui-free', 'MIT', (R) => dirs(R, '.', 'tactile', /^(\.|media$)/)],
  ['radix', 'radix-ui_primitives', 'https://github.com/radix-ui/primitives', 'MIT', (R) => dirs(R, 'packages/react', 'primitive', /^radix-ui$/, 'src')],
  ['preline', 'htmlstreamofficial_preline', 'https://github.com/htmlstreamofficial/preline', 'MIT + Preline UI Fair Use License', (R) => dirs(R, 'src/plugins', 'plugin', /^base-plugin$/)],
  ['react-bits', 'DavidHDev_react-bits', 'https://github.com/DavidHDev/react-bits', 'MIT + Commons Clause', (R) =>
    fs.readdirSync(path.join(R, 'src/content')).flatMap((cat) => fs.readdirSync(path.join(R, 'src/content', cat)).map((n) =>
      [n, slugify(cat), [`src/content/${cat}/${n}`, `src/ts-tailwind/${cat}/${n}`].filter((d) => fs.existsSync(path.join(R, d))), cat]))],
];
function files(R, dir, kind, skip) {
  return fs.readdirSync(path.join(R, dir)).filter((f) => EXT[path.extname(f)] && !SKIP.test(f) && !(skip && skip.test(f)))
    .map((f) => [f.replace(/\.[^.]+$/, ''), kind, [`${dir}/${f}`]]);
}
function dirs(R, dir, kind, skip, sub = '') {
  return fs.readdirSync(path.join(R, dir), { withFileTypes: true }).filter((d) => d.isDirectory() && !(skip && skip.test(d.name)))
    .map((d) => [d.name, kind, [path.join(dir, d.name, sub)]]).filter(([, , [p]]) => fs.existsSync(path.join(R, p)));
}
const walk = (R, p) => { const a = path.join(R, p); return fs.statSync(a).isFile() ? [p]
  : fs.readdirSync(a, { withFileTypes: true }).flatMap((d) => (/^(demo|docs?|tests?|__tests__|examples?|assets|node_modules|fonts?|\.)/i.test(d.name) && d.isDirectory() ? [] : walk(R, path.join(p, d.name)))); };
for (const [source, repo, up, license, list] of LIBS) {
  const R = path.join(CRAWLS, 'ui-libs', repo);
  if (!fs.existsSync(R)) { console.warn('bỏ qua', source, ': không có', R); continue; }
  const sha = fs.readFileSync(path.join(R, '.git/HEAD'), 'utf8').trim().replace(/^ref: (.*)$/, (_, ref) => fs.readFileSync(path.join(R, '.git', ref), 'utf8').trim());
  for (const [slug, kind, paths, cat] of list(R)) {
    const parts = {};
    for (const f of paths.flatMap((p) => walk(R, p)).filter((f) => EXT[path.extname(f)] && !SKIP.test(path.basename(f)))) {
      let p = EXT[path.extname(f)];
      if (source === 'react-bits' && f.includes('/ts-tailwind/')) p = 'tsx'; // JS-CSS → js+css, TS-TW → tsx
      parts[p] = (parts[p] ? parts[p] + '\n\n' : '') + `/* file: ${f} */\n` + fs.readFileSync(path.join(R, f), 'utf8');
    }
    if (Object.keys(parts).length)
      add(source, slug, human(slug), kind, license, `${up}/tree/${sha.slice(0, 12)}/${paths[0]}`, [source, cat, slug, kind], parts);
  }
}

// ---------- ghi ----------
fs.rmSync(path.join(OUT, 'code'), { recursive: true, force: true });
for (const [rel, t] of texts) { const f = path.join(OUT, 'code', rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, t); }
fs.writeFileSync(path.join(OUT, 'index.json'), '[\n' + rows.map((x) => JSON.stringify(x)).join(',\n') + '\n]\n');
const counts = {}; for (const x of rows) counts[x[2]] = (counts[x[2]] || 0) + 1;
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms(counts, rows.length));
console.log(`agents/index.json: ${rows.length} mục, ${texts.size} file code`, counts);

function llms(c, n) {
  return `# uiux-asset — UI component code for agents
${SITE} holds ${n} UI components with real source code. Do NOT open gallery pages (they are huge). Use the two endpoints below; every response is size-capped.

Sources: ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(', ')}.

## 1. Find (JSON, <=12 results, <3 KB, no code)
GET ${SITE}/api/find?q=<words>[&k=8][&source=<src>]
-> {"results":[{"id","name","source","kind","kb","parts":["html","css",...],"license"}]}
Example: ${SITE}/api/find?q=toggle+switch&k=5
Example: ${SITE}/api/find?q=dock&source=bencho

## 2. Get code (text/plain, one component, <=12 KB per call)
GET ${SITE}/api/get?id=<id>[&part=html|css|js|ts|tsx|all][&offset=<n>]
First line = header comment (source, license, original URL). Bigger code ends with
"/* truncated: N KB total, use &part= or &offset=<n> */" -> repeat with that offset or fetch one part.
Example: ${SITE}/api/get?id=shadcn/switch&part=tsx

Respect each component's license (in the header). Shell helper: uiux find "<q>" ; uiux get <id> [part]
`;
}

function check() {
  const idx = JSON.parse(fs.readFileSync(path.join(OUT, 'index.json'), 'utf8'));
  const bad = [], ids = new Set(), per = {};
  for (const [id, , source, , , parts, , , , src = {}] of idx) {
    if (ids.has(id)) bad.push(`trùng id ${id}`); ids.add(id);
    if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(id)) bad.push(`id không an toàn URL: ${id}`);
    per[source] = (per[source] || 0) + 1;
    for (const p of parts) {
      const f = src[p] ? path.join(ROOT, src[p].replace(/^gh:/, '')) : path.join(OUT, 'code', `${id}.${p}.txt`);
      if (!fs.existsSync(f)) bad.push(`${id}: thiếu part ${p} (${f})`);
    }
  }
  for (const s of ['patterns', 'galaxy', 'components', 'motion', 'scroll-effects', 'ui-moments', 'namethatui', 'ui-libraries', 'lucian',
    'shadcn', 'coss', 'magicui', 'kibo', 'bencho', 'tactile', 'radix', 'preline', 'react-bits']) if (!per[s]) bad.push(`nguồn ${s} rỗng`);
  if (!fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8').includes('/api/find')) bad.push('llms.txt thiếu /api/find');
  if (bad.length) { console.error('agent index LỆCH:\n ' + bad.slice(0, 20).join('\n ')); return 1; }
  console.log(`agent index ok: ${idx.length} mục`, per);
  return 0;
}
