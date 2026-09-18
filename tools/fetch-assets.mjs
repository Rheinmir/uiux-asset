import { chromium } from "playwright"; import fs from "fs"; import path from "path";
const d = path.resolve(process.argv[2]), A = path.join(d, "_assets"), RE = /https:\/\/assets\.codepen\.io\/[^\s"'()<>]+/g;
const files = fs.readdirSync(d).filter(f => f.endsWith(".html"));
const urls = new Set(files.flatMap(f => fs.readFileSync(path.join(d, f), "utf8").match(RE) || []));
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ extraHTTPHeaders: { Referer: "https://cdpn.io/" } }); const p = await ctx.newPage();
const miss = [];
for (const u of urls) {
  const local = path.join(A, u.split("assets.codepen.io/")[1].split("?")[0]);
  if (fs.existsSync(local)) continue;
  try { if (!globalThis.warm) { await p.goto("https://assets.codepen.io/16327/site-landscape-1.jpg"); globalThis.warm = 1; } const r = await ctx.request.get(u); if (!r.ok()) throw r.status();
        fs.mkdirSync(path.dirname(local), { recursive: true }); fs.writeFileSync(local, await r.body()); }
  catch (e) { miss.push(u + " " + e); }
}
await b.close();
for (const f of files) { let s = fs.readFileSync(path.join(d, f), "utf8");
  s = s.replace(RE, u => { const rel = "_assets/" + u.split("assets.codepen.io/")[1].split("?")[0];
    return fs.existsSync(path.join(d, rel)) ? rel : u; }); fs.writeFileSync(path.join(d, f), s); }
console.log(`asset ${urls.size} · thiếu ${miss.length}`); miss.slice(0, 8).forEach(m => console.log(m));
