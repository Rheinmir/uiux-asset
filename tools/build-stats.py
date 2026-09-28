#!/usr/bin/env python3
"""build-stats — stats.html: trang thống kê truy cập uiux-asset (cockpit ngang, vừa màn hình), đọc /api/stats mỗi 30s.

Số liệu do api/hit.js ghi vào Upstash Redis: lượt xem (1 lượt / khách / trang / 30 phút), khách duy nhất (HyperLogLog trên
hash IP+UA — không lưu IP), khách mới, đang xem (5 phút), trang, quốc gia, nguồn giới thiệu, thiết bị, trình duyệt, hệ điều hành,
bot đã lọc. Lớp nền (token, font nhúng, công tắc sáng/tối) từ html_base.py của overstack.

    python3 tools/build-stats.py            # OVS_TOOLS mặc định ../setup/fdk/tools
"""
import importlib.util
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOLS = Path(os.environ.get("OVS_TOOLS", ROOT.parent / "setup" / "fdk" / "tools"))

KPI = [("views", "Tổng lượt xem"), ("today", "Lượt xem hôm nay"), ("unique", "Khách duy nhất"), ("uniqueToday", "Khách hôm nay"),
       ("newToday", "Khách mới hôm nay"), ("returning", "Khách quay lại hôm nay"), ("online", "Đang xem (5 phút)"), ("botsToday", "Bot đã lọc hôm nay")]

CSS = r"""
html,body{height:100%}body{margin:0;display:grid;grid-template-rows:auto auto 1fr auto;gap:16px;padding:16px 20px;box-sizing:border-box;min-height:100vh}
.top{display:flex;align-items:center;gap:16px;min-width:0}.top h1{font-size:22px;margin:0;white-space:nowrap}
.top a{color:var(--ovs-accent)}.top .sp{flex:1}.upd{font-size:13px;color:var(--ovs-ink2);white-space:nowrap}
@media (max-width:480px){.upd{display:none}.top h1{font-size:18px}body{padding:16px}}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr));gap:12px}
.kpi{padding:12px 16px;border-radius:12px;border:1px solid var(--ovs-border);background:var(--ovs-surface2);min-width:0}
.kpi .v{font-family:var(--font-display);font-size:26px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.2}
.kpi .l{font-size:13px;color:var(--ovs-ink2)}
.grid{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr));gap:16px;min-height:0}
@media (max-width:1280px){.grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
@media (max-width:720px){.grid{grid-template-columns:minmax(0,1fr)}}
.col{display:grid;gap:16px;align-content:start;min-width:0}
.panel{padding:16px;border-radius:12px;border:1px solid var(--ovs-border);background:var(--ovs-surface2);min-width:0}
.panel h2{font-size:15px;margin:0 0 12px}
.chart{position:relative}.chart svg{display:block;width:100%;height:150px;overflow:visible}
.chart .bar{fill:var(--ovs-accent)}.chart .bar:hover,.chart .bar.on{opacity:.7}
.chart .ax{stroke:var(--ovs-border);stroke-width:1}.chart text{fill:var(--ovs-ink2);font-size:15px;font-family:inherit}
.tip{position:absolute;pointer-events:none;padding:6px 10px;border-radius:8px;background:var(--ovs-ink);color:var(--ovs-bg);font-size:12px;white-space:nowrap;transform:translate(-50%,-110%);opacity:0;transition:opacity .12s ease-out}
.tip.on{opacity:1}
details.tbl summary{cursor:pointer;font-size:12px;color:var(--ovs-ink2);min-height:32px;display:flex;align-items:center}
details.tbl table{width:100%;border-collapse:collapse;font-size:12px;font-variant-numeric:tabular-nums}
details.tbl td,details.tbl th{padding:4px 6px;text-align:right;border-bottom:1px solid var(--ovs-border)}details.tbl td:first-child,details.tbl th:first-child{text-align:left}
.list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.list li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;font-size:14px}
.list .k{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list .n{font-variant-numeric:tabular-nums;color:var(--ovs-ink2)}
.list .b{grid-column:1/-1;height:6px;border-radius:3px;background:color-mix(in srgb,var(--ovs-ink) 8%,transparent);overflow:hidden}
.list .b i{display:block;height:100%;border-radius:3px;background:var(--ovs-accent)}
.empty{font-size:13px;color:var(--ovs-ink2)}
.foot{font-size:13px;color:var(--ovs-ink2);display:flex;gap:16px;flex-wrap:nowrap;overflow:hidden;white-space:nowrap}
.err{padding:16px;border-radius:12px;background:color-mix(in srgb,var(--ovs-bad) 12%,transparent)}
.live{display:inline-block;width:8px;height:8px;border-radius:50%;background:#1f9d55;margin-right:6px}
"""

JS = r"""
(()=>{const $=s=>document.querySelector(s),fmt=n=>Number(n||0).toLocaleString('vi-VN');
const cn=(()=>{try{const d=new Intl.DisplayNames(['vi'],{type:'region'});return c=>c&&c!=='??'?d.of(c):'Không rõ'}catch{return c=>c}})();
const flag=c=>c&&/^[A-Z]{2}$/.test(c)?String.fromCodePoint(...[...c].map(x=>127397+x.charCodeAt(0)))+' ':'';
const ago=t=>{const s=Math.round((Date.now()-t)/1000);return s<60?s+' giây trước':s<3600?Math.round(s/60)+' phút trước':s<86400?Math.round(s/3600)+' giờ trước':Math.round(s/86400)+' ngày trước'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function list(sel,rows,label=k=>esc(k)){const el=$(sel);if(!rows||!rows.length){el.innerHTML='<p class="empty">Chưa có dữ liệu.</p>';return}
 rows=rows.slice(0,5);const max=Math.max(...rows.map(r=>r[1]));el.innerHTML='<ul class="list">'+rows.map(([k,n])=>`<li><span class="k" title="${esc(k)}">${label(k)}</span><span class="n">${fmt(n)}</span><span class="b"><i style="width:${Math.max(2,n/max*100)}%"></i></span></li>`).join('')+'</ul>'}
function chart(sel,daily,key,name){const el=$(sel);el.classList.add('chart');const W=560,H=160,P=24,n=daily.length,max=Math.max(1,...daily.map(d=>d[key]));
 const bw=(W-P)/n,sc=v=>(H-P)*v/max;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${name} 14 ngày"><title>${name} 14 ngày</title>`;
 s+=`<line class="ax" x1="${P}" y1="${H-P}" x2="${W}" y2="${H-P}"/><text x="${P-6}" y="${12}" text-anchor="end">${fmt(max)}</text><text x="${P-6}" y="${H-P}" text-anchor="end">0</text>`;
 daily.forEach((d,i)=>{const h=sc(d[key]),x=P+i*bw+2,w=Math.max(2,bw-4);
  s+=`<rect class="bar" data-i="${i}" x="${x}" y="${H-P-h}" width="${w}" height="${Math.max(h,0)}" rx="${Math.min(4,w/2)}"/>`;
  s+=`<rect data-i="${i}" x="${P+i*bw}" y="0" width="${bw}" height="${H-P}" fill="transparent"/>`;
  if((n-1-i)%2===0)s+=`<text x="${x+w/2}" y="${H-6}" text-anchor="middle">${d.d.slice(8)}/${d.d.slice(5,7)}</text>`});
 el.innerHTML=s+'</svg><div class="tip"></div>'+`<details class="tbl"><summary>Xem bảng số liệu</summary><table><tr><th>Ngày</th><th>${name}</th></tr>${daily.map(d=>`<tr><td>${d.d}</td><td>${fmt(d[key])}</td></tr>`).join('')}</table></details>`;
 const tip=el.querySelector('.tip'),bars=el.querySelectorAll('.bar');
 el.querySelector('svg').addEventListener('mousemove',e=>{const i=e.target.dataset?.i;if(i===undefined){tip.classList.remove('on');bars.forEach(b=>b.classList.remove('on'));return}
  const d=daily[i],b=bars[i],r=el.getBoundingClientRect(),br=b.getBoundingClientRect();bars.forEach(x=>x.classList.toggle('on',x===b));
  tip.textContent=`${d.d} · ${fmt(d[key])} ${name.toLowerCase()}`;tip.style.left=(br.left+br.width/2-r.left)+'px';tip.style.top=(br.top-r.top)+'px';tip.classList.add('on')});
 el.querySelector('svg').addEventListener('mouseleave',()=>{tip.classList.remove('on');bars.forEach(b=>b.classList.remove('on'))})}
async function load(){try{const r=await fetch('/api/stats',{cache:'no-store'});const s=await r.json();if(!r.ok)throw new Error(s.error||r.status);
 s.returning=Math.max(0,(s.uniqueToday||0)-(s.newToday||0));
 document.querySelectorAll('[data-k]').forEach(el=>el.textContent=fmt(s[el.dataset.k]));
 chart('#c-views',s.daily,'views','Lượt xem');chart('#c-uniq',s.daily,'unique','Khách');
 list('#l-pages',s.pages);list('#l-refs',s.refs);list('#l-countries',s.countries,k=>flag(k)+esc(cn(k)));
 list('#l-devices',s.devices);list('#l-browsers',s.browsers);list('#l-os',s.os);
 $('#f-since').textContent=s.since?'Đếm từ '+new Date(s.since).toLocaleString('vi-VN'):'Chưa có lượt nào';
 $('#f-last').textContent=s.last?`Lượt gần nhất: ${ago(s.last.t)} · ${s.last.p} · ${flag(s.last.c)}${cn(s.last.c)} · ${s.last.d}${s.last.n?' · khách mới':''}`:'';
 $('#f-bots').textContent=`Bot đã lọc (tổng): ${fmt(s.bots)} · Khách đã ghi nhận: ${fmt(s.visitorsAll)}`;
 $('#upd').textContent='Cập nhật '+new Date(s.at).toLocaleTimeString('vi-VN');$('#err').hidden=true}
 catch(e){$('#err').hidden=false;$('#err').textContent='Chưa đọc được số liệu ('+e.message+'). Thử lại sau 30 giây.'}}
load();setInterval(()=>{if(!document.hidden)load()},30000);
})();
"""


def build():
    spec = importlib.util.spec_from_file_location("html_base", TOOLS / "html_base.py")
    hb = importlib.util.module_from_spec(spec); spec.loader.exec_module(hb)
    kpis = "".join(f'<div class="kpi"><div class="v" data-k="{k}">–</div><div class="l">{t}</div></div>' for k, t in KPI)
    panel = lambda id_, title: f'<section class="panel"><h2>{title}</h2><div id="{id_}"><p class="empty">Đang tải…</p></div></section>'
    page = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Thống kê truy cập — uiux-asset</title><style>{CSS}</style></head><body>
<header class="top"><a href="/">← uiux-asset</a><h1>Thống kê truy cập</h1><span class="sp"></span><span class="upd"><span class="live" aria-hidden="true"></span><span id="upd">Đang tải…</span></span></header>
<div class="kpis">{kpis}</div>
<div class="grid">
 <div class="col">{panel("c-views", "Lượt xem 14 ngày")}{panel("c-uniq", "Khách duy nhất 14 ngày")}</div>
 <div class="col">{panel("l-pages", "Trang xem nhiều")}{panel("l-refs", "Nguồn giới thiệu")}</div>
 <div class="col">{panel("l-countries", "Quốc gia")}{panel("l-devices", "Thiết bị")}</div>
 <div class="col">{panel("l-browsers", "Trình duyệt")}{panel("l-os", "Hệ điều hành")}</div>
</div>
<p class="err" id="err" hidden></p>
<footer class="foot"><span id="f-since"></span><span id="f-last"></span><span id="f-bots"></span></footer>
<script>{JS}</script><script src="/stats.js" defer></script></body></html>"""
    (ROOT / "stats.html").write_text(hb.apply(page, fix=False), encoding="utf-8")
    print(f"→ {ROOT / 'stats.html'}")


if __name__ == "__main__":
    build()
