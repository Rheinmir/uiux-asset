"""Vendor NGUYÊN VĂN code gốc các pen freefrontend (CodePen public = MIT) qua cdpn.io/<user>/fullpage/<id>."""
import html, json, re, sys, time, urllib.request
from pathlib import Path
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36"
pages, out = sys.argv[1:-1], Path(sys.argv[-1]); out.mkdir(parents=True, exist_ok=True)

def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA, "Referer": "https://freefrontend.com/"}), timeout=40).read().decode("utf-8", "ignore")

items = []
for p in pages:
    s = Path(p).read_text()
    for art in re.findall(r'<article class=snippet-card.*?</article>', s, re.S):
        src = re.search(r'data-stash-source=(https://codepen\.io/([^/\s>]+)/pen/([A-Za-z0-9]+))', art)
        if not src: continue
        title = html.unescape(re.search(r'class=card-title-link>([^<]+)', art).group(1)).strip()
        desc = re.search(r'<p[^>]*class=["]?card-desc[^>]*>(.*?)</p>|<div class=card-description[^>]*>(.*?)</div>', art, re.S)
        items.append({"title": title, "url": src.group(1), "user": src.group(2), "id": src.group(3),
                      "desc": html.unescape(re.sub(r"<[^>]+>", "", next(g for g in desc.groups() if g))).strip() if desc else "",
                      "license": (re.search(r'class=license-tag>([^<]+)', art) or [None, "?"])[1]})
seen, res = set(), []
for it in items:
    if it["id"] in seen: continue
    seen.add(it["id"])
    slug = re.sub(r"[^a-z0-9]+", "-", it["title"].lower()).strip("-")
    f = out / f"{slug}.html"
    try:
        s = get(f"https://cdpn.io/{it['user']}/fullpage/{it['id']}")
        m = re.search(r'srcdoc="(.*?)"\s', s, re.S)
        body = html.unescape(m.group(1))
        head = (f"<!-- VENDORED NGUYÊN VĂN — \"{it['title']}\" by {it['user']} · {it['url']}\n"
                f"     License: {it['license']} (CodePen public pen = MIT). Giữ dòng này khi copy. -->\n")
        f.write_text(head + body); it["file"] = f.name; it["bytes"] = len(body)
    except Exception as e:
        it["error"] = repr(e)[:120]
    res.append(it); print(("OK " if "file" in it else "ERR"), it["id"], it["title"][:50], it.get("bytes", it.get("error")))
    time.sleep(0.5)
(out / "manifest.json").write_text(json.dumps(res, ensure_ascii=False, indent=1))
