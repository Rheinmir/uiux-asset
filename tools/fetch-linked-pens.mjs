import { chromium } from "playwright"; import fs from "fs"; import path from "path";
const d = path.resolve("../ffout"); const b = await chromium.launch({ headless: false }); const p = await b.newPage();
const RE = /https:\/\/codepen\.io\/([A-Za-z0-9_-]+\/pen\/[A-Za-z0-9\/._-]+\.(?:js|css))/g;
const files = fs.readdirSync(d).filter(f => f.endsWith(".html"));
for (const u of new Set(files.flatMap(f => [...fs.readFileSync(path.join(d, f), "utf8").matchAll(RE)].map(m => m[0])))) {
  const local = path.join(d, "_assets/pens", u.split("codepen.io/")[1]);
  if (!globalThis.warm) { await p.goto("https://codepen.io/", { waitUntil: "domcontentloaded" }).catch(() => {}); await p.waitForTimeout(4000); globalThis.warm = 1; }
  const t = await p.evaluate(async x => { const r = await fetch(x); return r.ok ? await r.text() : "ERR" + r.status; }, u).catch(e => "ERR " + e.message.slice(0, 60));
  if (!t.startsWith("ERR")) { fs.mkdirSync(path.dirname(local), { recursive: true }); fs.writeFileSync(local, t); console.log("OK", u, t.length); }
  else console.log("MISS", u, t);
}
await b.close();
for (const f of files) { let s = fs.readFileSync(path.join(d, f), "utf8");
  s = s.replace(RE, (m, rel) => fs.existsSync(path.join(d, "_assets/pens", rel)) ? "_assets/pens/" + rel : m)
       .replace(/((?:src|href)=["'])\/\//g, "$1https://");
  fs.writeFileSync(path.join(d, f), s); }
