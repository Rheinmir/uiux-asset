"""Khung chữ khớp gốc: so hộp bao chữ (meta.json) của gốc và bản mình theo từng màn.
Cột: lines o/m = số dòng chữ hiển thị (gốc / mình) · len = tổng độ dài hộp chữ mình/gốc · IoU = giao/hợp của vùng chữ · pos = IoU khi nới hộp 6px (lệch vị trí nhỏ vẫn tính khớp)."""
import json,os,numpy as np
meta=json.load(open('meta.json'))
def mask(shape,rects,pad=0):
    m=np.zeros(shape,bool)
    for x,y,w,h in rects:
        x0=max(0,int(x-pad)); y0=max(0,int(y-pad)); x1=min(shape[1],int(x+w+pad)+1); y1=min(shape[0],int(y+h+pad)+1)
        if x1>x0 and y1>y0: m[y0:y1,x0:x1]=True
    return m
def iou(a,b): u=(a|b).sum(); return (a&b).sum()/u if u else 1.0
print('vp screen  lines o/m   len m/o   IoU   pos(±6px)')
for vp in [int(x) for x in os.environ.get('WIDTHS','1440,390').split(',')]:
    for name in ('hero','grid','grid2','term','styles'):
        o,m=meta[f'{vp}-{name}-orig'],meta[f'{vp}-{name}-mine']; h=min(o['h'],m['h']); W=vp; sh=(h,W)
        To=[r for r in o['T'] if r[1]<h]; Tm=[r for r in m['T'] if r[1]<h]
        lo,lm=len(To),len(Tm); wo=sum(r[2] for r in To); wm=sum(r[2] for r in Tm)
        print(vp,name.ljust(7),f'{lo:>4}/{lm:<4}',f'{wm/wo if wo else 1:8.2f}',f'{iou(mask(sh,To),mask(sh,Tm)):6.2f}',f'{iou(mask(sh,To,6),mask(sh,Tm,6)):6.2f}')
