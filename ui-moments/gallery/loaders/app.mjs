import {setupSite,foreground,background} from '../../assets/site.mjs';
import * as ldrs from './vendor/ldrs/dist/index.js';
import {loaders,groups,previewProps} from './catalog.mjs';
import {escapeHtml as esc,htmlExample} from './snippets.mjs';
import {createLoaderEditor} from './editor.mjs';

const $=selector=>document.querySelector(selector);
const root=document.documentElement,grid=$('#grid'),detail=$('#detail');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
let playing=!reduced.matches,group='全部';
let editor;
const visible=new Set();
setupSite();

let license;
try{
  const response=await fetch('./vendor/ldrs/LICENSE');
  if(!response.ok)throw new Error('许可证载入失败');
  license=await response.text();
}catch(error){$('#load-error').hidden=false;throw error;}

for(const item of loaders)ldrs[item.key].register(item.tag);
editor=createLoaderEditor({license,isPlaying:()=>playing});
function effect(item,values){
  const element=document.createElement(item.tag);
  for(const [name,value] of Object.entries(values))element.setAttribute(name,String(value));
  element.setAttribute('aria-hidden','true');
  return element;
}
function setMotion(element,run){
  for(const animation of element?.shadowRoot?.getAnimations()||[])run?animation.play():animation.pause();
}
function syncMotion(){
  for(const card of grid.children)setMotion(card.querySelector('.sample > *'),playing&&!card.hidden&&visible.has(card));
  editor?.syncMotion();
  $('#motion').textContent=playing?'暂停动效':'播放动效';
  $('#motion').setAttribute('aria-pressed',String(!playing));
}

for(const [index,item] of loaders.entries()){
  const card=document.createElement('article');card.className='loader-card';card.dataset.key=item.key;
  card.innerHTML=`<button class="open-loader" type="button" aria-label="${esc(item.name)}：预览与代码"><div class="sample"></div><div class="card-info"><span class="card-number">${String(index+1).padStart(2,'0')}</span><strong>${esc(item.name)}</strong><small>${esc(item.group)}</small></div></button><button class="card-copy" type="button" aria-label="复制 ${esc(item.name)} 的HTML代码">复制代码</button>`;
  card.querySelector('.sample').append(effect(item,previewProps(item,foreground())));
  grid.append(card);
}
$('#groups').innerHTML=['全部',...groups].map(name=>`<button type="button" data-group="${esc(name)}" aria-pressed="${name===group}">${esc(name)}</button>`).join('');
const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target);
  syncMotion();
},{rootMargin:'80px'});
for(const card of grid.children)observer.observe(card);

function filter(){
  const query=$('#search').value.trim().toLocaleLowerCase();let count=0;
  for(const [index,card] of [...grid.children].entries()){
    const item=loaders[index];
    card.hidden=(group!=='全部'&&item.group!==group)||![item.key,item.name,item.description,item.group].join(' ').toLocaleLowerCase().includes(query);
    if(!card.hidden)count++;
  }
  $('#count').textContent=`${count} / 44`;$('#empty').hidden=count!==0;syncMotion();
}
$('#search').addEventListener('input',filter);
$('#groups').addEventListener('click',event=>{
  const button=event.target.closest('[data-group]');if(!button)return;group=button.dataset.group;
  for(const other of $('#groups').children)other.setAttribute('aria-pressed',String(other===button));filter();
});
$('#motion').addEventListener('click',()=>{playing=!playing;syncMotion();});
reduced.addEventListener('change',event=>{playing=!event.matches;syncMotion();});

grid.addEventListener('click',async event=>{
  const card=event.target.closest('.loader-card');if(!card)return;const item=loaders.find(item=>item.key===card.dataset.key);
  if(event.target.closest('.card-copy')){
    const node=card.querySelector('.sample > *');const values=previewProps(item,foreground());
    if(!await editor.copy(htmlExample(item,values,node.shadowRoot.innerHTML,license,background()))){editor.open(item,card.querySelector('.card-copy'));$('#code').focus();$('#code').select();}
  }else if(event.target.closest('.open-loader'))editor.open(item,card.querySelector('.open-loader'));
});
root.addEventListener('ui-moments:theme',event=>{
  for(const [index,card] of [...grid.children].entries())card.querySelector('.sample').replaceChildren(effect(loaders[index],previewProps(loaders[index],foreground())));
  requestAnimationFrame(syncMotion);
});
filter();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));syncMotion();
const fromHash=()=>{const item=loaders.find(item=>item.key===location.hash.slice(1));if(item&&!detail.open)editor.open(item,grid.querySelector(`[data-key="${item.key}"] .open-loader`));};
addEventListener('hashchange',fromHash);fromHash();
document.documentElement.dataset.ready='true';
