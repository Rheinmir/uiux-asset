import {escapeHtml as esc} from '../loaders/snippets.mjs';

const styles = `
  svg { display: block; width: var(--size); height: var(--size); fill: currentColor; }
  svg[stroke] { stroke: currentColor; }
  :host([data-paused]) svg * { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) {
    svg * { animation: none !important; }
    svg [opacity="0"] { opacity: 1; }
  }
`;

export function createSvgSpinnerIntegration({license, sources}) {
  const markup = item => `<style>${styles}</style>${sources[item.slug]}`;
  const credit = item => `原作：${item.origin.name} · ${item.origin.author}
${item.origin.repository}/tree/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20
UI Moments：主题、尺寸与独立代码导出。

${license.trim()}`;

  function preview(item, props) {
    const element = document.createElement('span');
    element.style.setProperty('--size', `${props.size}px`);
    element.style.color = props.color;
    element.attachShadow({mode: 'open'}).innerHTML = markup(item);
    element.setPlaying = playing => element.toggleAttribute('data-paused', !playing);
    return element;
  }

  function html(item, props, background) {
    return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(item.name)} · UI Moments</title>
<style>body{margin:0;min-height:100svh;display:grid;place-items:center;background:${esc(background)}}</style>
</head>
<body>
<div role="status" aria-label="正在加载" style="color:${esc(props.color)};--size:${Number(props.size)}px">
  <template shadowrootmode="open">
${markup(item)}
  </template>
</div>
<!--
${credit(item)}
-->
</body>
</html>
`;
  }

  function react(item, props) {
    return `'use client';
import { useEffect, useRef, type CSSProperties } from 'react';

const markup = ${JSON.stringify(markup(item))};

export default function LoadingIndicator({
  size = ${Number(props.size)},
  color = ${JSON.stringify(props.color)},
}: {size?: number; color?: string} = {}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const shadow = element.shadowRoot ?? element.attachShadow({mode: 'open'});
    shadow.innerHTML = markup;
  }, []);

  return <div ref={host} role="status" aria-label="正在加载"
    style={{color, '--size': size + 'px'} as CSSProperties} />;
}

/*
${credit(item)}
*/
`;
  }

  function prompt(item, props, background) {
    return `请在当前项目接入「${item.name}」加载指示器。

原作：${item.origin.name} · ${item.origin.author} · MIT
预览：https://guanmo-ai.github.io/ui-moments/#${item.key}
效果：${item.description}
当前参数：${props.size}px，${props.color}。

保留 SVG 的原始动效、版权声明和完整许可证。HTML 项目可直接使用下方示例；React 项目可在预览中选择 React 代码。验证实际渲染、尺寸、颜色和减少动态效果设置。

\`\`\`html
${html(item, props, background).trim()}
\`\`\``;
  }

  return {
    license, preview, html, react, prompt,
    htmlHelp: '保存为 .html 文件即可独立打开，无需联网。',
    reactHelp: '保存为 .tsx，直接在 React 项目中导入。',
  };
}
