import {embedUrl, foreground, setupSite} from './site.mjs';
import {originalLoaders, originalMarkup} from '../gallery/loaders/originals.mjs';

setupSite();

const root = document.documentElement;
const componentOptions = document.querySelector('#component-options');
const styleOptions = document.querySelector('#style-options');
const stage = document.querySelector('#preview-stage');
const title = document.querySelector('#sample-title');
const description = document.querySelector('#sample-description');
const catalogLink = document.querySelector('#catalog-link');
const styleDescription = document.querySelector('#style-description');
const styleSource = document.querySelector('#style-source');
const motion = document.querySelector('#fold-motion');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const fold = originalLoaders.find(loader => loader.key === 'paper-fold');

const works = [
  {id: 'elastic-ruler'}, {id: 'alignment-switch'}, {id: 'bookmark-press'},
].map(example => ({...window.WORKS.find(work => work.id === example.id), ...example}));
works.push({id: fold.key, title: fold.name, summary: fold.description});

const styles = [
  {id: 'original', title: '原版', summary: '组件在界面图鉴中的原始外观，跟随站点的深浅主题。'},
  {id: 'memphis', title: '孟菲斯', summary: '糖果色、错位几何和硬投影。', source: '004-memphis'},
  {id: 'bauhaus', title: '包豪斯', summary: '未漂白纸上，以红方、蓝圆、黄三角和粗线组织界面。', source: '001-bauhaus'},
  {id: 'pixel', title: '像素风', summary: '以点阵、阶梯轮廓和有限色板做成街机界面。'},
];

function makeOption(name, item) {
  const label = document.createElement('label');
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.className = 'sr-only';
  radio.name = name;
  radio.value = item.id;
  const text = document.createElement('span');
  text.className = 'option-name';
  text.textContent = item.title;
  label.append(radio, text);
  return label;
}

for (const work of works) componentOptions.append(makeOption('component', work));

for (const style of styles) {
  const label = makeOption('style', style);
  label.dataset.uiStyle = style.id;
  const swatch = document.createElement('span');
  swatch.className = 'style-swatch';
  swatch.setAttribute('aria-hidden', 'true');
  swatch.append(...Array.from({length: 3}, () => document.createElement('i')));
  label.insertBefore(swatch, label.lastElementChild);
  styleOptions.append(label);
}

const previews = new Map();
let selection;

function syncEmbed(frame) {
  frame.contentWindow?.postMessage({
    type: 'ui-moments:embed',
    theme: root.dataset.theme,
    active: !frame.hidden,
    style: selection.style.id,
  }, location.origin);
}

function mountPreview(work) {
  if (previews.has(work.id)) return previews.get(work.id);
  let preview;
  if (work.demo) {
    const url = embedUrl(work.demo, root.dataset.theme);
    url.searchParams.set('style', selection.style.id);
    preview = document.createElement('iframe');
    preview.src = url.href;
    preview.addEventListener('load', () => syncEmbed(preview));
  } else {
    preview = document.createElement('div');
    preview.className = 'fold-preview';
    preview.innerHTML = originalMarkup(fold, {...fold.defaults, size: 174, color: foreground()});
  }
  previews.set(work.id, preview);
  stage.append(preview);
  return preview;
}

function syncMotion() {
  motion.hidden = selection.work.id !== fold.key || reducedMotion.matches;
}

motion.addEventListener('click', () => {
  const paused = previews.get(fold.key).toggleAttribute('data-paused');
  motion.textContent = paused ? '播放动效' : '暂停动效';
});
reducedMotion.addEventListener('change', syncMotion);

function showSelection(work, style) {
  selection = {work, style};
  componentOptions.querySelector(`[value="${work.id}"]`).checked = true;
  styleOptions.querySelector(`[value="${style.id}"]`).checked = true;
  title.textContent = work.title;
  description.textContent = work.summary;
  catalogLink.href = `index.html#${work.id}`;
  styleDescription.textContent = style.summary;
  styleSource.hidden = !style.source;
  if (style.source) styleSource.href = `https://github.com/guanmo-ai/design-style/tree/main/styles/${style.source}`;
  stage.dataset.uiStyle = style.id;

  const activePreview = mountPreview(work);
  for (const preview of previews.values()) {
    preview.hidden = preview !== activePreview;
    if (preview instanceof HTMLIFrameElement) {
      if (!preview.hidden) preview.title = `${work.title} · ${style.title}`;
      syncEmbed(preview);
    }
  }
  syncMotion();
}

function readLocation() {
  const id = location.hash.slice(1);
  const styleId = new URLSearchParams(location.search).get('style');
  showSelection(works.find(work => work.id === id) ?? works[0], styles.find(style => style.id === styleId) ?? styles[1]);
}

function rememberSelection() {
  const url = new URL(location.href);
  url.searchParams.set('style', selection.style.id);
  url.hash = selection.work.id;
  history.replaceState(null, '', url);
}

componentOptions.addEventListener('change', event => {
  showSelection(works.find(work => work.id === event.target.value), selection.style);
  rememberSelection();
});
styleOptions.addEventListener('change', event => {
  showSelection(selection.work, styles.find(style => style.id === event.target.value));
  rememberSelection();
});

root.addEventListener('ui-moments:theme', () => {
  for (const preview of previews.values()) {
    if (preview instanceof HTMLIFrameElement) syncEmbed(preview);
    else preview.querySelector('.um-paper-fold').style.setProperty('--color', foreground());
  }
});
addEventListener('hashchange', () => {
  if (works.some(work => `#${work.id}` === location.hash)) readLocation();
});
readLocation();
