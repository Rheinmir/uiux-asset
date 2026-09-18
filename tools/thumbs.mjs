// Chụp thumbnail gallery: headed (WebGL cần GPU thật) · qua http server · 6 trang song song · bỏ qua ảnh đã có.
import { chromium } from "playwright"; import fs from "fs";
const dir = process.argv[2] || "../ffout", out = process.argv[3] || "../ffthumbs", base = process.argv[4] || "http://localhost:8765/";
fs.mkdirSync(out, { recursive: true });
const todo = fs.readdirSync(dir).filter(f => f.endsWith(".html") && f !== "index.html" && !fs.existsSync(`${out}/${f.replace(".html", ".jpg")}`));
const b = await chromium.launch({ headless: false, args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"] });
async function shot(f) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    await p.goto(base + f, { waitUntil: "domcontentloaded", timeout: 20000 }).catch(() => {});
    await p.waitForTimeout(5000); await p.mouse.move(640, 400); await p.mouse.wheel(0, 700); await p.waitForTimeout(2500);
    await p.screenshot({ path: `${out}/${f.replace(".html", ".jpg")}`, type: "jpeg", quality: 70, timeout: 15000 });
  } catch (e) { console.log("ERR", f, e.message.slice(0, 60)); }
  await p.close(); console.log("done", f);
}
while (todo.length) await Promise.all(todo.splice(0, 6).map(shot));
await b.close();
