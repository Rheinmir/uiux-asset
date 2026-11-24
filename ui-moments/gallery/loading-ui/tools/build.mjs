import {build} from 'esbuild';
import {readFileSync,writeFileSync,mkdirSync,existsSync,copyFileSync,readdirSync} from 'node:fs';
import {resolve,dirname,basename} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {loadingUILoaders} from '../catalog.mjs';

const root=resolve(import.meta.dirname,'..'),vendor=resolve(root,'vendor/loading-ui');
const source=JSON.parse(readFileSync(resolve(root,'vendor/source.json'),'utf8'));
for(const file of source.files){
  const actual=createHash('sha256').update(readFileSync(resolve(vendor,file.path))).digest('hex');
  if(actual!==file.sha256)throw new Error(`上游原文件被改动：${file.path}`);
}
const files=readdirSync(resolve(vendor,'src/registry/components/loading-ui')).filter(name=>name.endsWith('.tsx'));
if(files.length!==47||loadingUILoaders.length!==47||new Set(loadingUILoaders.map(item=>item.slug)).size!==47)throw new Error('必须完整收录47个不同组件');
mkdirSync(resolve(root,'dist'),{recursive:true});
const imports=[],entries=[],sources={};
for(const [i,item] of loadingUILoaders.entries()){
  const path=`src/registry/examples/${item.slug}/demo.tsx`,demo=readFileSync(resolve(vendor,path),'utf8');
  const name=demo.match(/export function (\w+)/)?.[1];if(!name)throw new Error(`缺少演示：${item.slug}`);
  imports.push(`import {${name} as Demo${i}} from '../vendor/loading-ui/${path}';`);entries.push(`${JSON.stringify(item.slug)}:Demo${i}`);
  sources[item.slug]={component:readFileSync(resolve(vendor,`src/registry/components/loading-ui/${item.slug}.tsx`),'utf8'),demo};
}
writeFileSync(resolve(root,'src/demos.generated.jsx'),`${imports.join('\n')}\nexport const demos={${entries.join(',')}};\n`);
execFileSync(resolve(root,'node_modules/.bin/tailwindcss'),['-i','src/styles.css','-o','dist/styles.css','--minify'],{cwd:root,stdio:'inherit'});
// Shadow DOM内的@property不会在所有浏览器注册；将同一默认值留在最低优先级，
// 避免border、translate等工具类因缺少--tw-*初值而失效，不污染宿主页面。
const cssPath=resolve(root,'dist/styles.css'),css=readFileSync(cssPath,'utf8');
const initialValues=[...css.matchAll(/@property\s+(--[\w-]+)\{([^}]+)\}/g)].map(([,name,body])=>`${name}:${body.match(/initial-value:([^;}]*)/)?.[1]||'initial'}`).join(';');
writeFileSync(cssPath,`${css}\n@layer properties{*,::before,::after{${initialValues}}}\n`);
const result=await build({entryPoints:[resolve(root,'src/runtime.jsx')],outfile:resolve(root,'dist/runtime.js'),bundle:true,format:'iife',jsx:'automatic',minify:true,target:'es2022',loader:{'.css':'text'},alias:{'@':resolve(vendor,'src')},define:{'process.env.NODE_ENV':'"production"'},metafile:true,legalComments:'inline'});
writeFileSync(resolve(root,'dist/sources.json'),JSON.stringify(sources));
copyFileSync(resolve(vendor,'LICENSE.md'),resolve(root,'dist/LICENSE.md'));
const packages=new Set(['tailwindcss']);
for(const path of Object.keys(result.metafile.inputs)){
  const normalized=path.replaceAll('\\','/'),index=normalized.lastIndexOf('node_modules/');if(index<0)continue;
  const parts=normalized.slice(index+13).split('/');packages.add(parts[0].startsWith('@')?parts.slice(0,2).join('/'):parts[0]);
}
const notices=[`Loading UI\nhttps://github.com/turbostarter/loading-ui\n\n${readFileSync(resolve(vendor,'LICENSE.md'),'utf8')}`];
for(const name of [...packages].sort()){
  const directory=resolve(root,'node_modules',name);
  const license=readdirSync(directory).find(file=>/^licen[cs]e(?:\.|$)/i.test(file));
  if(!license)throw new Error(`缺少运行依赖许可：${name}`);
  notices.push(`${name}\n\n${readFileSync(resolve(directory,license),'utf8')}`);
}
writeFileSync(resolve(root,'dist/THIRD_PARTY_LICENSES.txt'),notices.join('\n\n----------------------------------------\n\n'));
console.log(`已构建47个原始动效，保留Loading UI与${packages.size}项运行依赖完整许可`);
