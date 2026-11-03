import json,sys,numpy as np
from PIL import Image
meta=json.load(open('meta.json')); out={}
def mask_of(shape,rects):
    m=np.zeros(shape,bool)
    for x,y,w,h in rects:
        x0=max(0,int(np.floor(x))); y0=max(0,int(np.floor(y))); x1=min(shape[1],int(np.ceil(x+w))); y1=min(shape[0],int(np.ceil(y+h)))
        if x1>x0 and y1>y0: m[y0:y1,x0:x1]=True
    return m
rows=[]
for vp in ('d','m'):
    for name in ('hero','grid','term','styles'):
        a=np.asarray(Image.open(f'{vp}-{name}-orig.png').convert('RGB')).astype(int); b=np.asarray(Image.open(f'{vp}-{name}-mine.png').convert('RGB')).astype(int)
        h=min(a.shape[0],b.shape[0]); a=a[:h]; b=b[:h]; bad=np.abs(a-b).sum(2)>96
        mo,mm=meta[f'{vp}-{name}-orig'],meta[f'{vp}-{name}-mine']
        tm=mask_of(bad.shape,mo['T']+mm['T']); am=mask_of(bad.shape,mo['R']+mm['R'])
        full=100-bad.mean()*100
        lay=100-bad[~tm].mean()*100
        layna=100-bad[~(tm|am)].mean()*100
        rows.append(dict(vp=vp,name=name,full=round(full,1),layout=round(lay,1),layout_noart=round(layna,1),text_masked=round(tm.mean()*100),art_masked=round((am&~tm).mean()*100)))
json.dump(rows,open('score.json','w'),indent=0)
print('vp screen   full  layout  layout-noart  (text% art%)')
for r in rows: print(r['vp'],r['name'].ljust(7),str(r['full']).rjust(5),str(r['layout']).rjust(7),str(r['layout_noart']).rjust(10),'  ',r['text_masked'],r['art_masked'])
