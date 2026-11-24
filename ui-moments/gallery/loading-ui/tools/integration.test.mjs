import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {transform} from 'esbuild';
import {loadingUILoaders,loadingUIOrigin} from '../catalog.mjs';
import {createLoadingUIIntegration} from '../integration.mjs';
import {buildCatalog,matches} from '../../../assets/catalog.mjs';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const license=await read('vendor/loading-ui/LICENSE.md');
const integration=createLoadingUIIntegration({license,runtime:await read('dist/runtime.js'),notices:await read('dist/THIRD_PARTY_LICENSES.txt'),sources:JSON.parse(await read('dist/sources.json'))});

test('47个组件逐个接入，重名实现保留独立ID、来源与用途',()=>{
  const items=buildCatalog();
  assert.equal(loadingUILoaders.length,47);
  assert.equal(items.filter(item=>item.loader?.provider==='loading-ui').length,47);
  assert.equal(new Set(items.map(item=>item.id)).size,items.length);
  assert.equal(items.find(item=>item.id==='ring').loader.tag,'l-ring');
  assert.equal(items.find(item=>item.id==='loading-ui-ring').loader.tag,'um-loading-ui-ring');
  assert.equal(items.filter(item=>matches(item,{query:'Bartosz'})).length,47);
  assert.ok(loadingUILoaders.every(item=>item.origin===loadingUIOrigin));
  assert.ok(items.filter(item=>matches(item,{category:'loading',shape:'文字'})).length>=4);
});

test('固定上游版本的每份原文件保持字节一致，源码清单完整',async()=>{
  const source=JSON.parse(await read('vendor/source.json'));
  assert.equal(source.commit,loadingUIOrigin.commit);
  assert.equal(source.files.filter(file=>file.path.startsWith('src/registry/components/')&&file.path.endsWith('.tsx')).length,47);
  for(const file of source.files){
    const bytes=await readFile(new URL('vendor/loading-ui/'+file.path,root));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256,file.path);
  }
  assert.match(license,/Copyright \(c\) 2026 Bartosz Zagrodzki/);
});

test('47份独立HTML、TSX和提示词保留本库完整许可，原始动效可导出',async()=>{
  for(const item of loadingUILoaders){
    const props={size:120,color:'#c38cfa'};
    const html=integration.html(item,props,'#121214');
    const react=integration.react(item,props);
    const prompt=integration.prompt(item,props,'#121214');
    for(const output of [html,react,prompt]){
      assert.ok(output.includes(license.trim()),item.slug);
      assert.ok(output.includes(loadingUIOrigin.repository),item.slug);
      assert.ok(!output.includes('Griffin Johnston'),item.slug);
      assert.ok(!output.includes('UI Moments 原创'),item.slug);
    }
    assert.ok(html.includes(`<${item.tag} size="120" color="#c38cfa"`));
    assert.ok(!html.includes('<script src='),'HTML应可离线运行');
    assert.ok(react.includes('export default function LoadingIndicator()'));
    assert.ok(!react.includes('from "@/'),'导出不残留上游私有路径');
    await transform(react,{loader:'tsx',jsx:'automatic'});
    assert.ok(prompt.length<35000,'提示词不嵌入整个运行包');
  }
});

test('本地运行资源包括上游和实际打包依赖的完整许可',async()=>{
  const notices=await read('dist/THIRD_PARTY_LICENSES.txt');
  assert.ok(notices.includes(license.trim()));
  for(const name of ['react','react-dom','motion','tailwindcss'])assert.ok(notices.includes(name),name);
  assert.ok((await read('dist/runtime.js')).includes('um-loading-ui-'));
  assert.match(await read('dist/styles.css'),/@layer properties\{\*,::before,::after\{[^}]*--tw-border-style:solid/,'Shadow DOM保留Tailwind初值，环形边框必须可见');
});
