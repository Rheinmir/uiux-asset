// 同源组件的嵌入协议：隐藏外壳，跟随画廊主题，暂停离屏动画。
(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('embed')!=='ui')return;
  const root=document.documentElement;root.dataset.embedded='true';
  root.dataset.theme=params.get('theme')==='light'?'light':'dark';
  const hasStyle=params.has('style');
  if(hasStyle)root.dataset.uiStyle=params.get('style');
  addEventListener('message',event=>{
    if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='ui-moments:embed')return;
    root.dataset.galleryActive=String(event.data.active===true);
    root.dataset.theme=event.data.theme==='light'?'light':'dark';
    if(hasStyle&&typeof event.data.style==='string')root.dataset.uiStyle=event.data.style;
  });
})();
