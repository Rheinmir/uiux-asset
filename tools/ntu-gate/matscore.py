import json,sys,numpy as np
from PIL import Image
meta=json.load(open('ref/meta.json')); mine=json.load(open('mine/text.json'))
def mask(shape,rects,sc=2):
    m=np.zeros(shape,bool)
    for x,y,w,h in rects:
        x0=max(0,int((x)*sc));y0=max(0,int(y*sc));x1=min(shape[1],int(np.ceil((x+w)*sc)));y1=min(shape[0],int(np.ceil((y+h)*sc)))
        if x1>x0 and y1>y0:m[y0:y1,x0:x1]=True
    return m
rows=[]
for key,m in meta.items():
    if key not in mine or mine[key] is None: continue
    try: b=np.asarray(Image.open('mine/'+key.replace('/','_')+'.png').convert('RGB')).astype(int)
    except Exception: continue
    a=np.asarray(Image.open(m['file']).convert('RGB')).astype(int)
    h=min(a.shape[0],b.shape[0]); w=min(a.shape[1],b.shape[1]); a=a[:h,:w]; b=b[:h,:w]
    bad=np.abs(a-b).sum(2)>96; tm=mask(bad.shape,m['text']+mine[key]); 
    rows.append((key,round(100-bad[~tm].mean()*100,1),round(100-bad.mean()*100,1),m['i']))
rows.sort(key=lambda r:r[3])
for r in rows: print(r[3],r[0].ljust(34),'layout',str(r[1]).rjust(5),'full',str(r[2]).rjust(5))
if len(rows)>3: print('mean layout',round(sum(r[1] for r in rows)/len(rows),1),'n',len(rows))
