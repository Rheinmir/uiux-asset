#!/usr/bin/env python3
"""gen2 — sinh demo CO GIÃN cho thẻ từ phép đo ở 4 độ rộng thẻ (312/350/358/288 px).
Mỗi hộp/chữ được xếp loại: cố định, căn giữa, bám trái/phải, hoặc kéo giãn theo độ rộng thẻ; xuất ra calc() dùng đơn vị cqw của khung xem trước.
Chữ có max-width + ellipsis trong giới hạn hộp chứa nó (chỉ cho chữ mẫu trong demo)."""
import json,sys,html,os
TR=json.load(open('demo-text.json')) if os.path.exists('demo-text.json') else {}
MODE=os.environ.get('MODE','card')
if MODE=='detail': WIDTHS=[1440,1024,768,390,320]; MW={1440:585,1024:515,768:720,390:358,320:288}; PFX='dtrace'; CLS='qd'; VAR='NT_DETAIL_GEN'
else: WIDTHS=[1440,768,390,320]; MW={1440:312,768:350,390:358,320:288}; PFX='trace'; CLS='q'; VAR='NT_DEMOS_GEN'
BASEW=MW[1440]
T={w:json.load(open(f'{PFX}-{w}.json')) for w in WIDTHS}
def f(v):
    s=('%.2f'%v).rstrip('0').rstrip('.'); return s if s not in ('-0','') else '0'
def annotate(nodes,ox,oy,reg,treg):
    for n in nodes:
        if n.get('id'): reg[n['id']]=n
        cont=n.get('clip') or n.get('op')
        o=(n['cx'],n['cy']) if cont and 'cx' in n else (ox,oy)
        for t in n.get('texts',[]):
            t['relx']=t['rx']-o[0]; t['rely']=t['ry']-o[1]; t['ox']=o[0]; treg[t['tid']]=t
        annotate(n.get('kids',[]),o[0],o[1],reg,treg)
REG={};TREG={}
for w in WIDTHS:
    r={};tr={}
    for key,tree in T[w].items(): annotate(tree['kids'],0,0,r.setdefault(key,{}),tr.setdefault(key,{}))
    REG[w]=r; TREG[w]=tr
def fit(series):
    """series: [(dW, dv)] -> slope"""
    if not series: return 0
    best=None
    for s in (0,.5,1):
        sse=sum((dv-s*dW)**2 for dW,dv in series)
        if best is None or sse<best[0]: best=(sse,s)
    err=(best[0]/len(series))**.5
    if err<=1.3: return best[1]
    num=sum(dW*dv for dW,dv in series); den=sum(dW*dW for dW,dv in series)
    return round(num/den,2) if den else 0
def css(base,slope):
    if abs(slope)<.01: return f(base)+'px'
    k='' if slope==1 else f(slope)+'*'
    return f"calc({f(base)}px + {k}(100cqw - {BASEW-2}px))"
def series(key,wid,field,tid=False):
    out=[]
    b=(TREG if tid else REG)[1440][key].get(wid)
    if b is None: return None,[]
    for w in WIDTHS[1:]:
        o=(TREG if tid else REG)[w][key].get(wid)
        if o is not None: out.append((MW[w]-BASEW,o[field]-b[field]))
    return b,out
def sty_box(key,n):
    _,sx=series(key,n['id'],'x'); _,sw=series(key,n['id'],'w')
    s=f"left:{css(n['x'],fit(sx))};top:{f(n['y'])}px;width:{css(n['w'],fit(sw))};height:{f(n['h'])}px;"
    if n.get('bg'): s+=f"background-color:{n['bg']};"
    if n.get('bgi'): s+=f"background-image:{n['bgi']};"
    bd=n.get('bd')
    if bd:
        if len(set(bd))==1: s+=f"border:{bd[0]};"
        else:
            for side,v in zip(('top','right','bottom','left'),bd):
                if v!='none': s+=f"border-{side}:{v};"
    if n.get('br'): s+=f"border-radius:{n['br']};"
    if n.get('sh'): s+=f"box-shadow:{n['sh']};"
    if n.get('op'): s+=f"opacity:{n['op']};"
    if n.get('fl'): s+=f"filter:{n['fl']};"
    if n.get('bf'): s+=f"backdrop-filter:{n['bf']};-webkit-backdrop-filter:{n['bf']};"
    if n.get('mb'): s+=f"mix-blend-mode:{n['mb']};"
    if n.get('clip'): s+="overflow:hidden;"
    return s.replace('"',"'")
def text_html(key,t):
    tb,sx=series(key,t['tid'],'relx',True)
    slope=fit(sx)
    fs=float(t['fs'][:-2])*t.get('tsc',1)
    s=f"left:{css(t['relx'],slope)};top:{f(t['rely'])}px;font-size:{f(fs)}px;font-weight:{t['fw']};color:{t['col']};line-height:{f(t['h'])}px;"
    if t['ls'] not in ('normal','0px'): s+=f"letter-spacing:{f(float(t['ls'][:-2])*t.get('tsc',1))}px;"
    if t['tt']!='none': s+=f"text-transform:{t['tt']};"
    if t['ff']=='m': s+="font-family:'Geist Mono',ui-monospace,monospace;"
    if t['lines']>1:
        _,sw=series(key,t['tid'],'w',True)
        s+=f"width:{css(t['w']+3,fit(sw))};white-space:normal;text-align:{t['ta'] if t['ta'] in ('center','right') else 'left'};"
    else:
        # giới hạn phải của hộp chứa: avail(W)=lim-ox-relx
        av=[]
        for w in WIDTHS:
            o=TREG[w][key].get(t['tid'])
            if o is not None: av.append((MW[w]-BASEW,(o['lim']-o['ox'])-o['relx']))
        base=av[0][1]; ser=[(dW,v-base) for dW,v in av[1:]]
        sl=fit(ser); mx=max(base-2,t['w']+2)
        s+=f"max-width:{css(mx,sl)};overflow:hidden;text-overflow:ellipsis;"
    return f"<b style=\"{s.replace(chr(34),chr(39))}\">{html.escape(TR.get(t['t'],t['t']))}</b>"
def prims_html(n,key):
    parts=[]; alpha=lambda c:(c not in ('none','') and not c.endswith('/ 0)'))
    _,sx=series(key,n['id'],'x'); sl=fit(sx)
    for pm in n.get('prims',[]):
        fill=pm['fill'] if alpha(pm['fill']) else ''; stroke=pm['stroke'] if alpha(pm['stroke']) and pm['sw']>0 else ''
        sw=pm['sw']; x,y,w,h=n['x']+pm['x'],n['y']+pm['y'],pm['w'],pm['h']
        op=f"opacity:{pm['op']};" if pm['op'] not in ('1','') else ''
        L=lambda v:css(v,sl)
        if pm['t']=='circle' and stroke and not fill:
            D=w+sw; xo=x-sw/2; yo=y-sw/2; r0=D/2-sw
            if pm['dash']:
                fr=pm['dash']*100; ang=pm['rot']+90
                parts.append(f"<i style=\"left:{L(xo)};top:{f(yo)}px;width:{f(D)}px;height:{f(D)}px;border-radius:50%;background:conic-gradient(from {ang}deg,{stroke} 0 {f(fr)}%,transparent {f(fr)}%);-webkit-mask:radial-gradient(circle,transparent {f(r0)}px,#000 {f(r0)}px);mask:radial-gradient(circle,transparent {f(r0)}px,#000 {f(r0)}px);{op}\"></i>")
            else: parts.append(f"<i style=\"left:{L(xo)};top:{f(yo)}px;width:{f(D)}px;height:{f(D)}px;border-radius:50%;border:{f(sw)}px solid {stroke};{op}\"></i>")
        elif pm['t'] in ('circle','ellipse'):
            parts.append(f"<i style=\"left:{L(x)};top:{f(y)}px;width:{f(w)}px;height:{f(h)}px;border-radius:50%;{'background:'+fill+';' if fill else ''}{('border:'+f(sw)+'px solid '+stroke+';') if stroke else ''}{op}\"></i>")
        elif pm['t']=='rect':
            parts.append(f"<i style=\"left:{L(x)};top:{f(y)}px;width:{f(w)}px;height:{f(h)}px;border-radius:{f(pm['rx'])}px;{'background:'+fill+';' if fill else ''}{('border:'+f(sw)+'px solid '+stroke+';') if stroke else ''}{op}\"></i>")
        elif pm['t']=='line' and stroke:
            parts.append(f"<i style=\"left:{L(x-sw/2 if w<h else x)};top:{f(y-sw/2 if h<=w else y)}px;width:{f(max(w,sw))}px;height:{f(max(h,sw))}px;background:{stroke};border-radius:{f(sw/2)}px;{op}\"></i>")
    return ''.join(parts)
def emit(nodes,key):
    out=[]
    for n in nodes:
        k=n['k']
        if k=='svg':
            p=prims_html(n,key)
            if p: out.append(p)
            if n.get('hasPath') or not p:
                col=n.get('fill') if n.get('fill') and n['fill']!='none' else (n.get('stroke') if n.get('stroke') and n['stroke']!='none' else n['col'])
                _,sx=series(key,n['id'],'x')
                out.append(f"<i style=\"left:{css(n['x'],fit(sx))};top:{f(n['y'])}px;width:{f(n['w'])}px;height:{f(n['h'])}px;background:{col};border-radius:30%;opacity:.5\"></i>")
            continue
        if k=='ph':
            _,sx=series(key,n['id'],'x'); out.append(f"<i style=\"left:{css(n['x'],fit(sx))};top:{f(n['y'])}px;width:{f(n['w'])}px;height:{f(n['h'])}px;background:#2a2b30\"></i>"); continue
        container=n.get('clip') or n.get('op')
        if container:
            inner=''.join(text_html(key,t) for t in n.get('texts',[]))+emit(n.get('kids',[]),key)
            out.append(f"<i style=\"{sty_box(key,n)}\">{inner}</i>")
        else:
            out.append(f"<i style=\"{sty_box(key,n)}\"></i>"); out.append(''.join(text_html(key,t) for t in n.get('texts',[]))); out.append(emit(n.get('kids',[]),key))
    return ''.join(out)
res={k:f'<div class="{CLS}">'+emit(t['kids'],k)+'</div>' for k,t in T[1440].items()}
dst=sys.argv[1] if len(sys.argv)>1 else ('detail.gen.js' if MODE=='detail' else 'demos.gen.js')
open(dst,'w',encoding='utf-8').write('// Demo co giãn sinh bằng công cụ tự viết từ phép đo hiển thị ở nhiều độ rộng (tools/ntu-gate/trace.cjs|dtrace.cjs + gen2.py): hộp/chữ định vị bằng calc() theo cqw, tên lớp riêng.\nwindow.'+VAR+' = '+json.dumps(res,ensure_ascii=False)+';\n')
print(len(res),'demo;',sum(len(v) for v in res.values())//1024,'KB')
