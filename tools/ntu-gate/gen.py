import json,sys,html,os
TR=json.load(open('demo-text.json')) if os.path.exists('demo-text.json') else {}
d=json.load(open('trace.json'))
def f(v):
    s=('%.2f'%v).rstrip('0').rstrip('.'); return s if s not in ('-0','') else '0'
def sty_box(n):
    s=f"left:{f(n['x'])}px;top:{f(n['y'])}px;width:{f(n['w'])}px;height:{f(n['h'])}px;"
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
def text_html(t,ox,oy):
    x=t['rx']-ox; y=t['ry']-oy
    fs=float(t['fs'][:-2])*SCALE
    s=f"left:{f(x)}px;top:{f(y)}px;font-size:{f(fs)}px;font-weight:{t['fw']};color:{t['col']};line-height:{f(t['h'])}px;"
    if t['ls'] not in ('normal','0px'): s+=f"letter-spacing:{t['ls']};"
    if t['tt']!='none': s+=f"text-transform:{t['tt']};"
    if t['ff']=='m': s+="font-family:'Geist Mono',ui-monospace,monospace;"
    if t['lines']>1: s+=f"width:{f(t['w']+3)}px;white-space:normal;text-align:{t['ta'] if t['ta'] in ('center','right') else 'left'};"
    return f"<b style=\"{s.replace(chr(34),chr(39))}\">{html.escape(TR.get(t['t'],t['t']))}</b>"
def emit(nodes,ox,oy):
    out=[]
    for n in nodes:
        k=n['k']
        if k=='svg':
            prims=n.get('prims',[])
            alpha=lambda c:(c not in ('none','') and not c.endswith('/ 0)'))
            parts=[]
            for pm in prims:
                fill=pm['fill'] if alpha(pm['fill']) else ''; stroke=pm['stroke'] if alpha(pm['stroke']) and pm['sw']>0 else ''
                sw=pm['sw']; x,y,w,h=n['x']+pm['x'],n['y']+pm['y'],pm['w'],pm['h']
                op=f"opacity:{pm['op']};" if pm['op'] not in ('1','') else ''
                if pm['t']=='circle' and stroke and not fill:
                    D=w+sw; xo=x-sw/2; yo=y-sw/2; r0=D/2-sw
                    if pm['dash']:
                        fr=pm['dash']*100; ang=pm['rot']+90
                        parts.append(f"<i style=\"left:{f(xo)}px;top:{f(yo)}px;width:{f(D)}px;height:{f(D)}px;border-radius:50%;background:conic-gradient(from {ang}deg,{stroke} 0 {f(fr)}%,transparent {f(fr)}%);-webkit-mask:radial-gradient(circle,transparent {f(r0)}px,#000 {f(r0)}px);mask:radial-gradient(circle,transparent {f(r0)}px,#000 {f(r0)}px);{op}\"></i>")
                    else:
                        parts.append(f"<i style=\"left:{f(xo)}px;top:{f(yo)}px;width:{f(D)}px;height:{f(D)}px;border-radius:50%;border:{f(sw)}px solid {stroke};{op}\"></i>")
                elif pm['t'] in ('circle','ellipse'):
                    parts.append(f"<i style=\"left:{f(x)}px;top:{f(y)}px;width:{f(w)}px;height:{f(h)}px;border-radius:50%;{'background:'+fill+';' if fill else ''}{('border:'+f(sw)+'px solid '+stroke+';') if stroke else ''}{op}\"></i>")
                elif pm['t']=='rect':
                    parts.append(f"<i style=\"left:{f(x)}px;top:{f(y)}px;width:{f(w)}px;height:{f(h)}px;border-radius:{f(pm['rx'])}px;{'background:'+fill+';' if fill else ''}{('border:'+f(sw)+'px solid '+stroke+';') if stroke else ''}{op}\"></i>")
                elif pm['t']=='line' and stroke:
                    parts.append(f"<i style=\"left:{f(x-sw/2 if w<h else x)}px;top:{f(y-sw/2 if h<=w else y)}px;width:{f(max(w,sw))}px;height:{f(max(h,sw))}px;background:{stroke};border-radius:{f(sw/2)}px;{op}\"></i>")
            if parts: out.append(''.join(parts))
            if n.get('hasPath') or not parts:
                col=n.get('fill') if n.get('fill') and n['fill']!='none' else (n.get('stroke') if n.get('stroke') and n['stroke']!='none' else n['col'])
                out.append(f"<i style=\"left:{f(n['x'])}px;top:{f(n['y'])}px;width:{f(n['w'])}px;height:{f(n['h'])}px;background:{col};border-radius:30%;opacity:.5\"></i>")
            continue
        if k=='ph':
            out.append(f"<i style=\"left:{f(n['x'])}px;top:{f(n['y'])}px;width:{f(n['w'])}px;height:{f(n['h'])}px;background:#2a2b30\"></i>"); continue
        container=n.get('clip') or n.get('op')
        if container:
            cx,cy=n['cx'],n['cy']
            inner=''.join(text_html(t,cx,cy) for t in n.get('texts',[]))+emit(n.get('kids',[]),cx,cy)
            out.append(f"<i style=\"{sty_box(n)}\">{inner}</i>")
        else:
            out.append(f"<i style=\"{sty_box(n)}\"></i>")
            out.append(''.join(text_html(t,ox,oy) for t in n.get('texts',[])))
            out.append(emit(n.get('kids',[]),ox,oy))
    return ''.join(out)
def texts(nodes):
    for n in nodes:
        yield from n.get('texts',[]); yield from texts(n.get('kids',[]))
# Chữ trong demo bị thu nhỏ bằng transform: trace ghi font-size CHƯA thu nhỏ nhưng chiều cao dòng ĐÃ thu nhỏ -> chữ to gấp đôi, đè nhau.
# Dòng chữ thường có h/fs ~1.14; median của demo < 0.9 thì demo đó bị thu nhỏ, hệ số = median/1.14.
# ponytail: ước lượng theo median cả demo, đúng khi cả demo cùng một transform; ghi scale thật trong trace.cjs nếu có demo trộn nhiều tỉ lệ.
def demo_scale(nodes):
    r=sorted(t['h']/float(t['fs'][:-2]) for t in texts(nodes) if t['lines']==1 and float(t['fs'][:-2])>0)
    if not r: return 1
    m=r[len(r)//2]; return m/1.14 if m<0.9 else 1
res={}
for key,t in d.items():
    SCALE=demo_scale(t['kids'])
    res[key]='<div class="q">'+emit(t['kids'],0,0)+'</div>'
sfx=sys.argv[1] if len(sys.argv)>1 else '/Users/giatran/orca/setup/uiux-asset-kanoa/namethatui/demos.gen.js'
open(sfx,'w',encoding='utf-8').write('// Demo sinh bằng công cụ tự viết từ phép đo hiển thị (xem tools/ntu-gate/trace.cjs + gen.py): hộp/chữ định vị tuyệt đối, tên lớp riêng.\nwindow.NT_DEMOS_GEN = '+json.dumps(res,ensure_ascii=False)+';\n')
print({k:len(v) for k,v in res.items()})
