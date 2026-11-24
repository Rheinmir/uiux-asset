import {setupSite,setupGalleryFavorites,showLoadingAccent,foreground,embedUrl} from './site.mjs';
import {buildCatalog,categories,getCategoryFilters,matches} from './catalog.mjs';
import {previewProps} from '../gallery/loaders/catalog.mjs';
import {escapeHtml as esc} from '../gallery/loaders/snippets.mjs';
import {createLoaderEditor,createLoaderPreview,setPreviewPlaying} from '../gallery/loaders/editor.mjs';
import {componentPrompt,mountPrompt} from './prompt.mjs';
import {createLoadingUIIntegration} from '../gallery/loading-ui/integration.mjs';
import {createSvgSpinnerIntegration} from '../gallery/svg-spinners/integration.mjs';
import {formatMicronDownload,micronLicensePath} from '../gallery/micron/catalog.mjs';

setupSite();
const $=selector=>document.querySelector(selector);
const root=document.documentElement,grid=$('#ui-grid');
const loaderDialog=$('#detail'),componentDialog=$('#component-detail'),componentFrame=$('#component-frame');
const categoryButtons=$('#categories'),shapeButtons=$('#shapes');
const motionButton=$('#motion'),empty=$('#empty');
const items=buildCatalog(window.WORKS||[]);
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const search=$('#work-search');
search.value=new URLSearchParams(location.search).get('q')||'';
const density=$('#gallery-density'),columnChoices=[...density.querySelectorAll('input')];
const densityKey='ui-moments-gallery-columns';
try{
  const saved=localStorage.getItem(densityKey);
  const choice=columnChoices.find(input=>input.value===saved);
  if(choice)choice.checked=true;
}catch{}
grid.dataset.columns=columnChoices.find(input=>input.checked).value;
density.addEventListener('change',event=>{
  grid.dataset.columns=event.target.value;
  try{localStorage.setItem(densityKey,event.target.value);}catch{}
});

let playing=!reduced.matches,category='all',shape='all';
let component=null,componentTrigger=null,opening=null;
let themeColor=foreground();
const cards=new Map(),mounted=new Set(),providers={};
const favorites=setupGalleryFavorites(filter);
const resourceLoads=new Map(),importFailures=new Map();
const loadingRuntimePath='gallery/loading-ui/dist/runtime.js';
const svgSourcePath='gallery/svg-spinners/dist/sources.json';

function loadOnce(key,load){
  if(!resourceLoads.has(key)){
    resourceLoads.set(key,load().catch(error=>{
      resourceLoads.delete(key);
      throw error;
    }));
  }
  return resourceLoads.get(key);
}

function fetchText(path){
  return loadOnce(path,async()=>{
    const response=await fetch(path);
    if(!response.ok)throw new Error(`资源载入失败：${path}`);
    return response.text();
  });
}

function loadModule(path){
  return loadOnce(`module:${path}`,async()=>{
    const url=new URL(path,import.meta.url);
    const failures=importFailures.get(path)||0;
    // 浏览器会记住失败的模块 URL，重试时使用新的模块地址。
    if(failures)url.searchParams.set('retry',failures);
    try{return await import(url.href);}
    catch(error){importFailures.set(path,failures+1);throw error;}
  });
}

function loadSvgSources(){
  return loadOnce('svg-sources',async()=>{
    const response=await fetch(svgSourcePath);
    if(!response.ok)throw new Error(`资源载入失败：${svgSourcePath}`);
    return response.json();
  });
}

async function preparePreview(loader){
  if(loader.original)return;
  if(loader.provider==='loading-ui'){
    await loadModule(`../${loadingRuntimePath}`);
    if(!customElements.get(loader.tag))throw new Error(`缺少动效：${loader.key}`);
  }else if(loader.provider==='svg-spinners'){
    const sources=await loadSvgSources();
    if(!sources[loader.slug])throw new Error(`缺少动效：${loader.key}`);
    providers['svg-spinners']??=createSvgSpinnerIntegration({sources});
  }else if(!customElements.get(loader.tag)){
    const {default:definition}=await loadModule(`../gallery/loaders/vendor/ldrs/dist/elements/${loader.key}.js`);
    if(!customElements.get(loader.tag))definition.register(loader.tag);
  }
}

async function prepareExport(loader){
  if(loader.provider==='loading-ui'){
    return loadOnce('loading-ui:export',async()=>{
      const [license,notices,runtime,sources]=await Promise.all([
        fetchText(loader.origin.licensePath),
        fetchText('gallery/loading-ui/dist/THIRD_PARTY_LICENSES.txt'),
        fetchText(loadingRuntimePath),
        fetchText('gallery/loading-ui/dist/sources.json').then(JSON.parse),
      ]);
      providers['loading-ui']=createLoadingUIIntegration({license,notices,runtime,sources});
    });
  }
  if(loader.provider==='svg-spinners'){
    return loadOnce('svg-spinners:export',async()=>{
      const [license,sources]=await Promise.all([fetchText(loader.origin.licensePath),loadSvgSources()]);
      providers['svg-spinners']=createSvgSpinnerIntegration({license,sources});
    });
  }
  return fetchText(loader.original?'LICENSE':'gallery/loaders/vendor/ldrs/LICENSE');
}

function restoreDetailFocus(button){
  if(button?.closest('[hidden]'))$('#gallery-favorites').focus({preventScroll:true});
  else button?.focus({preventScroll:true});
}

const editor=createLoaderEditor({
  providers,
  restoreFocus:restoreDetailFocus,
  isPlaying:()=>playing&&!document.hidden,
});

function effect(loader){
  const preview=createLoaderPreview(loader,previewProps(loader,themeColor,root.dataset.theme),providers);
  preview.className='ui-animation';
  return preview;
}

const cardFragment=document.createDocumentFragment();
for(const item of items){
  const element=document.createElement('article');
  element.className='ui-item';
  element.dataset.ui=item.id;
  element.dataset.category=item.category;
  if(item.loader)element.dataset.kind=item.loader.original?'original':'loader';
  let meta=item.type;
  if(item.loader)meta=item.loader.original?'原创':`${item.loader.origin?.name||'LDRS'} 开源`;
  else if(item.credit?.licensePath===micronLicensePath)meta='Micron.js 开源';
  else if(item.credit)meta=`参考后实现 · ${item.type}`;
  const caption=item.shape?`${meta} · ${item.shape}`:meta;
  const titleId=`work-title-${item.id}`,actionId=`work-action-${item.id}`;
  element.innerHTML=`
    ${item.loader
      ? `<button type="button" class="ui-stage ui-playback" aria-pressed="false" aria-label="暂停 ${esc(item.title)} 预览"></button>`
      : '<div class="ui-stage"></div>'}
    <div class="ui-caption">
      <div><h2 id="${titleId}">${esc(item.title)}</h2><p>${esc(caption)}</p></div>
      <button type="button" class="ui-expand" data-detail aria-labelledby="${actionId} ${titleId}" aria-haspopup="dialog">
        <span class="ui-detail-label" id="${actionId}">详情</span>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M11 3h6v6m0-6-6 6m-2 8H3v-6m0 6 6-6"/></svg>
      </button>
    </div>`;
  cards.set(item.id,{
    item,element,stage:element.firstElementChild,detail:element.querySelector('[data-detail]'),
    near:false,visible:false,paused:false,
  });
  cardFragment.append(element);
}
grid.append(cardFragment);

categoryButtons.innerHTML=categories.map(({id,name})=>{
  const count=id==='all'?items.length:items.filter(item=>item.category===id).length;
  return `<button type="button" data-category="${id}">${esc(name)}<span class="category-count">${count}</span></button>`;
}).join('');

function modalOpen(){
  return loaderDialog.open||componentDialog.open;
}

function canAnimate(){
  return playing&&!document.hidden;
}

function sendEmbed(frame,active){
  frame.contentWindow?.postMessage({type:'ui-moments:embed',active,theme:root.dataset.theme},location.origin);
}

function syncCard(card,{reload=false}={}){
  const run=canAnimate()&&!modalOpen()&&!card.element.hidden&&card.visible&&!card.paused;
  if(card.frame){
    const state=`${run}:${root.dataset.theme}`;
    if(reload||card.motion!==state){
      card.motion=state;
      sendEmbed(card.frame,run);
    }
  }else if(card.preview&&card.motion!==run){
    card.motion=run;
    setPreviewPlaying(card.preview,run);
  }
}

function syncMotion(){
  for(const card of mounted)syncCard(card);
  if(componentDialog.open)sendEmbed(componentFrame,canAnimate());
  editor.syncMotion();
}

function mountFrame(card){
  if(card.frame)return;
  const frame=document.createElement('iframe');
  frame.title=`${card.item.title}：直接操作`;
  frame.src=embedUrl(card.item.demo,root.dataset.theme).href;
  frame.allow='fullscreen; clipboard-write';
  frame.addEventListener('load',()=>syncCard(card,{reload:true}));
  card.frame=frame;
  card.stage.append(frame);
  mounted.add(card);
}

function nearScreen(card){
  return card.near&&!card.element.hidden;
}

function renderPreview(card){
  const preview=effect(card.item.loader);
  card.preview=preview;
  card.stage.replaceChildren(preview);
  card.motion=undefined;
  mounted.add(card);
  syncCard(card);
}

async function mountPreview(card){
  if(card.preview||card.loading||card.failed)return;
  card.loading=true;
  try{
    await preparePreview(card.item.loader);
    if(nearScreen(card))renderPreview(card);
  }catch{
    if(!nearScreen(card))return;
    const message=document.createElement('span');
    message.className='ui-preview-error';
    message.textContent='预览载入失败，点按重试';
    card.failed=true;
    card.stage.dataset.previewState='error';
    card.stage.removeAttribute('aria-pressed');
    card.stage.setAttribute('aria-label',`重试 ${card.item.title} 预览`);
    card.stage.disabled=false;
    card.stage.replaceChildren(message);
  }finally{
    card.loading=false;
  }
}

function updateCard(card){
  if(nearScreen(card)){
    if(card.item.loader)void mountPreview(card);
    else mountFrame(card);
  }else if(card.preview){
    card.preview.remove();
    card.preview=null;
    mounted.delete(card);
  }
  syncCard(card);
}

// 近屏挂载与实际在屏播放分开。循环动效离开缓冲区后释放 DOM，交互控件保留本次操作状态。
const nearObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){
    const card=cards.get(entry.target.dataset.ui);
    card.near=entry.isIntersecting;
    updateCard(card);
  }
},{rootMargin:'140px 0px'});
const visibleObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){
    const card=cards.get(entry.target.dataset.ui);
    card.visible=entry.isIntersecting;
    syncCard(card);
  }
});

function setPressed(button,pressed){
  const value=String(pressed);
  if(button.getAttribute('aria-pressed')!==value)button.setAttribute('aria-pressed',value);
}

function renderShapes(){
  const options=getCategoryFilters(items,category);
  $('#shape-row').hidden=options.length===0;
  $('[data-shape-label]').textContent=category==='feedback'?'效果':'形态';
  shapeButtons.innerHTML=options.map(({id,name})=>`<button type="button" data-shape="${esc(id)}">${esc(name)}</button>`).join('');
}

function filter(){
  for(const button of categoryButtons.querySelectorAll('[data-category]'))setPressed(button,button.dataset.category===category);
  for(const button of shapeButtons.children)setPressed(button,button.dataset.shape===shape);
  const query=search.value;
  let count=0;
  for(const card of cards.values()){
    const hidden=!matches(card.item,{category,shape,query})||(favorites.only&&!favorites.has(card.item.id));
    if(card.element.hidden!==hidden){
      card.element.hidden=hidden;
      if(hidden){
        if(opening?.card===card)cancelOpening();
        updateCard(card);
      }
    }
    if(!hidden)count++;
  }
  $('#ui-count').textContent=`${count} 个组件`;
  empty.hidden=count!==0;
  if(count===0)empty.textContent=favorites.only&&!query.trim()&&category==='all'?'还没有收藏的组件。':'当前筛选没有匹配的组件。';
}

function selectCategory(next){
  if(category!==next){
    category=next;
    shape='all';
    renderShapes();
  }
  filter();
}

categoryButtons.addEventListener('click',event=>{
  const button=event.target.closest('[data-category]');
  if(button)selectCategory(button.dataset.category);
});
shapeButtons.addEventListener('click',event=>{
  const button=event.target.closest('[data-shape]');
  if(!button)return;
  shape=button.dataset.shape;
  filter();
});
search.addEventListener('input',filter);

function setPlaying(value){
  playing=value;
  motionButton.textContent=playing?'暂停动效':'播放动效';
  setPressed(motionButton,!playing);
  grid.toggleAttribute('data-motion-paused',!playing);
  for(const card of cards.values()){
    if(card.item.loader)card.stage.disabled=!playing&&!card.failed;
  }
  syncMotion();
}

motionButton.addEventListener('click',()=>setPlaying(!playing));
reduced.addEventListener('change',event=>setPlaying(!event.matches));
document.addEventListener('visibilitychange',syncMotion);
root.addEventListener('ui-moments:theme',()=>{
  themeColor=foreground();
  for(const card of mounted){
    if(card.preview)renderPreview(card);
    else syncCard(card);
  }
  if(componentDialog.open)sendEmbed(componentFrame,canAnimate());
});
componentFrame.addEventListener('load',()=>{
  if(componentDialog.open)sendEmbed(componentFrame,canAnimate());
});
loaderDialog.addEventListener('close',syncMotion);

const refreshComponentPrompt=mountPrompt(componentDialog,()=>componentPrompt(component),editor.copy);
function openComponent(item,button){
  component=item;
  componentTrigger=button;
  $('#component-title').textContent=item.title;
  const categoryName=categories.find(cat=>cat.id===item.category).name;
  $('#component-kind').textContent=item.category==='feedback'?`${categoryName} / ${item.shape}`:`${categoryName} / ${item.type}`;
  $('#component-description').textContent=item.summary;
  componentFrame.src=embedUrl(item.demo,root.dataset.theme).href;
  componentFrame.title=`${item.title}放大体验`;
  $('#component-source').href='https://github.com/guanmo-ai/ui-moments/tree/main/'+item.source;
  $('#component-open').href=item.demo;
  $('#component-copy').hidden=item.demo.includes('/dist/');
  $('#component-copy').textContent='复制 HTML';
  const credit=item.credit;
  $('#component-credit').innerHTML=credit?`来源：<a href="${esc(credit.url)}" target="_blank" rel="noopener">${esc(credit.name)} ↗</a> · ${esc(credit.note||'参考交互想法，由 UI Moments 实现。')}`:'UI Moments 原创实现 · MIT';
  if(credit?.licensePath){
    const link=document.createElement('a');
    link.href=credit.licensePath;
    link.textContent='MIT 许可证';
    $('#component-credit').append(' ',link);
  }
  refreshComponentPrompt();
  componentDialog.showModal();
  document.body.style.overflow='hidden';
  history.replaceState(null,'','#'+item.id);
}

function setDetailState(card,state){
  const button=card.detail,label=button.querySelector('.ui-detail-label');
  button.querySelector('.ui-detail-loading')?.remove();
  if(state==='loading'){
    const accent=document.createElement('span');
    accent.className='ui-detail-loading';
    accent.setAttribute('aria-hidden','true');
    showLoadingAccent(accent);
    label.before(accent);
    button.setAttribute('aria-busy','true');
    label.textContent='载入中';
  }else{
    button.removeAttribute('aria-busy');
    label.textContent=state==='error'?'重试详情':'详情';
  }
  button.dataset.detailState=state;
}

function cancelOpening(){
  if(!opening)return;
  setDetailState(opening.card,'ready');
  opening=null;
}

async function openDetails(card){
  if(modalOpen()||opening?.card===card)return;
  cancelOpening();
  const {item,detail}=card;
  if(!item.loader){
    favorites.showFor(item.id);
    openComponent(item,detail);
    syncMotion();
    return;
  }
  const attempt={card};
  opening=attempt;
  setDetailState(card,'loading');
  try{
    const [,license]=await Promise.all([preparePreview(item.loader),prepareExport(item.loader)]);
    if(opening!==attempt)return;
    favorites.showFor(item.id);
    editor.open(item.loader,detail,license);
    setDetailState(card,'ready');
    syncMotion();
  }catch{
    if(opening===attempt){
      setDetailState(card,'error');
      editor.notify(`${item.title} 详情载入失败，可重试。`);
    }
  }finally{
    if(opening===attempt)opening=null;
  }
}

grid.addEventListener('click',event=>{
  const element=event.target.closest('[data-ui]');
  if(!element)return;
  const card=cards.get(element.dataset.ui);
  if(event.target.closest('.ui-caption')){
    void openDetails(card);
  }else if(event.target.closest('.ui-playback')){
    if(card.failed){
      card.failed=false;
      delete card.stage.dataset.previewState;
      card.stage.replaceChildren();
      card.stage.setAttribute('aria-label',`暂停 ${card.item.title} 预览`);
      card.stage.disabled=!playing;
      setPressed(card.stage,card.paused);
      void mountPreview(card);
      return;
    }
    card.paused=!card.paused;
    setPressed(card.stage,card.paused);
    syncCard(card);
  }
});

function clearComponentHash(){
  if(location.hash==='#'+component?.id)history.replaceState(null,'',location.pathname+location.search);
}

$('#component-close').addEventListener('click',()=>{
  clearComponentHash();
  componentDialog.close();
});
componentDialog.addEventListener('cancel',clearComponentHash);
componentDialog.addEventListener('close',()=>{
  componentFrame.src='about:blank';
  editor.clearFeedback();
  document.body.style.overflow='';
  clearComponentHash();
  restoreDetailFocus(componentTrigger);
  syncMotion();
});

$('#component-copy').addEventListener('click',async()=>{
  const button=$('#component-copy');
  const item=component;
  button.disabled=true;
  try{
    if(item.credit?.licensePath===micronLicensePath){
      const [page,css,micronLicense]=await Promise.all([
        fetchText(item.demo.split('#')[0]),
        fetchText(item.sourceFiles[0]),
        fetchText(micronLicensePath),
      ]);
      await editor.copy(formatMicronDownload(page,item.en,css,micronLicense));
      return;
    }
    const url=new URL(item.demo,location.href);
    const [page,license]=await Promise.all([fetchText(url.pathname),fetchText('LICENSE')]);
    let code=page.replace('<script src="../../assets/embed.js"></script>','');
    if(url.hash)code=code.replace('<head>',`<head>\n<script>history.replaceState(null,'',${JSON.stringify(url.hash)})</script>`);
    code+=`\n<!-- UI Moments\n来源：${item.credit?.name||'原创'} ${item.credit?.url||''}\n${item.credit?.note||'参考交互想法，由 UI Moments 实现。'}\n${license.trim()}\n-->\n`;
    await editor.copy(code);
  }catch{
    if(component===item)button.textContent='载入失败，重试';
  }finally{
    button.disabled=false;
  }
});

function fromHash(){
  const id=location.hash.slice(1);
  if(['loaders','ldrs'].includes(id)){
    selectCategory('loading');
    return;
  }
  const card=cards.get(id);
  if(card)void openDetails(card);
  else cancelOpening();
}
addEventListener('hashchange',fromHash);

renderShapes();
filter();
setPlaying(playing);
for(const card of cards.values()){
  nearObserver.observe(card.element);
  visibleObserver.observe(card.element);
}
root.dataset.ready='true';
fromHash();
