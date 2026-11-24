import {escapeHtml as esc} from '../loaders/snippets.mjs';

const source='https://github.com/turbostarter/loading-ui';
const escapedScript=text=>text.replace(/<\/script/gi,'<\\/script');

export function createLoadingUIIntegration({runtime,license,notices,sources}){
  function html(item,props,background='#151517'){
    return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(item.name)} · UI Moments</title>
<style>body{margin:0;min-height:100svh;display:grid;place-items:center;background:${esc(background)}}</style></head><body>
<${item.tag} size="${Number(props.size)}" color="${esc(props.color)}" surface="${esc(background)}" role="status" aria-label="正在加载"></${item.tag}>
<script>${escapedScript(runtime)}</script>
<!--
原作：Loading UI · Bartosz Zagrodzki
${source}
UI Moments：独立页面、主题与尺寸适配。动效复用上游原实现。

${notices.trim()}
--></body></html>\n`;
  }
  function react(item,props,background='#ffffff'){
    const original=sources[item.slug];
    if(!original)throw new Error(`缺少原始源码：${item.slug}`);
    const component=original.component.replaceAll('bg-muted','bg-[var(--muted)]').replace(/import \{ cn \} from "@\/lib\/utils";/g,'import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\nconst cn = (...values: ClassValue[]) => twMerge(clsx(values));');
    const demo=original.demo.replace(/^import[^\n]+from "@\/registry\/components\/loading-ui\/[^\n]+;\s*/gm,'');
    const demoName=demo.match(/export function (\w+)/)[1];
    return `// 原作：Loading UI · Bartosz Zagrodzki\n// ${source}\n// 需 Tailwind CSS 4；安装：npm install react react-dom motion clsx tailwind-merge\n// 保存为.tsx；默认导出包含当前预览尺寸和颜色，原组件仍可单独导入。\n${component}\n\n${demo}\n\nexport default function LoadingIndicator() {\n  return <div role="status" aria-label="正在加载" style={{'--background':${JSON.stringify(background)},'--mask-color':${JSON.stringify(background)},'--muted':${JSON.stringify(`color-mix(in srgb,${props.color} 35%,transparent)`)},color:${JSON.stringify(props.color)},width:${Number(props.size)*1.5},height:${Number(props.size)},display:'grid',placeItems:'center'} as React.CSSProperties}><div style={{transform:'scale(${Number(props.size)/96})'}}><${demoName}/></div></div>;\n}\n\n/*\n原作：Loading UI · Bartosz Zagrodzki\n${source}\n当前预览参数：${JSON.stringify(props)}\n动效周期保留原作。工具函数、外层尺寸、颜色和背景适配由UI Moments补充；bg-muted改用等价CSS变量工具类。\n\n${license.trim()}\n*/\n`;
  }
  function prompt(item,props,background){
    return `请在当前工作区使用「${item.name}」加载动效。\n\n原作：Loading UI · Bartosz Zagrodzki\n上游仓库：${source}\n预览：https://guanmo-ai.github.io/ui-moments/#${item.key}\n目标：${item.description}\n当前参数：${JSON.stringify(props)}；背景：${background}\n\n沿用项目现有技术栈。下面是可使用的React源码与原始demo，使用Tailwind CSS 4。HTML项目可在预览详情中下载独立HTML，包含本地运行所需内容。保留原作者和完整许可证，尊重prefers-reduced-motion。完成后实际检查动效、深浅背景、尺寸和代码可运行。\n\nReact源码与用法\n\`\`\`tsx\n${react(item,props,background)}\`\`\``;
  }
  return {license,html,react,prompt,htmlHelp:'保存为 .html 文件即可独立打开，无需联网。',reactHelp:'示例包含上游 React 组件源码与用法，需 Tailwind CSS 4。'};
}
