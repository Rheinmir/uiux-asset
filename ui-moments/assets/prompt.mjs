import {htmlExample,reactExample} from '../gallery/loaders/snippets.mjs';

const site = 'https://guanmo-ai.github.io/ui-moments/';
const repository = 'https://github.com/guanmo-ai/ui-moments';
const raw = 'https://raw.githubusercontent.com/guanmo-ai/ui-moments/main/';

export function loaderPrompt(item, props, markup, license, background) {
  const settings = Object.entries(props).map(([key, value]) => `${key}: ${value}`).join('，');
  const reactSetup = item.original ? 'React 项目可直接使用下方 JSX。' : 'React 项目使用下方示例，沿用现有包管理器并锁定依赖版本。';
  return `请在当前工作区实现「${item.name}」加载指示器，并在本机运行一个可验证的示例。

参考预览：${site}#${item.key}
动效目标：${item.description}。使用连续循环表达不确定的等待状态。
当前参数：${settings}。示例背景为 ${background}。

先检查当前项目的目录、技术栈和样式约定。${reactSetup}示例复用与参考预览相同的动效。HTML 项目可以采用下方独立示例的样式和标记，空工作区可直接将示例保存为 index.html 后打开。

将尺寸、颜色和周期按该组件支持的参数暴露给调用方。把组件放在实际等待的区域，使用可读的加载状态标签。遵守 prefers-reduced-motion，并确认深浅背景上的对比度。保留原作者署名及下面的完整 MIT 许可证。

完成后打开本地示例，验证动效、参数和减少动态效果设置，告诉我修改的文件及启动命令。

独立 HTML 示例
\`\`\`html
${htmlExample(item, props, markup, license, background).trim()}
\`\`\`

React 用法
\`\`\`jsx
${reactExample(item, props, license).trim()}
\`\`\``;
}

export function componentPrompt(item) {
  const built = item.demo.includes('/dist/');
  const [file, scene] = item.demo.split('#');
  const query = new URL(item.demo, site).search;
  const source = built ? `${repository}/tree/main/${item.source}` : `${repository}/blob/main/${file}`;
  const notes = (item.notes || []).map(note => `- ${note}`).join('\n');
  const resources = (item.sourceFiles || []).map(path => raw + path).join('\n');
  const license = item.credit?.licensePath
    ? `保留上游 MIT 版权声明和许可证全文：${raw}${item.credit.licensePath}。`
    : `保留源码声明及许可证：${repository}/blob/main/LICENSE。`;
  const setup = built
    ? `从源码目录读取 README、package.json 和 src。${resources ? `同时取用共享样式，保留在仓库中的相对路径：\n${resources}\n` : ''}独立运行时在复制到本机的组件目录执行 npm ci，再执行 npm run dev。${query ? `在开发地址后加上 ${query} 打开这个组件。` : ''}接入现有项目时沿用现有构建配置、包管理器和必要依赖。`
    : `从原始文件获取 HTML、CSS 和 JavaScript：${raw}${file}。${resources ? `\n同时获取上游样式，保留 HTML 中的相对路径：\n${resources}\n` : ''}将文件写入当前工作区，空工作区可使用 index.html。独立运行时可以省去 UI Moments 图鉴专用的 embed.js；如沿用原目录结构，保留资源的相对路径。在示例目录用 python3 -m http.server 5173 启动，访问 http://localhost:5173/${scene ? `#${scene}` : ''}。先确认原版在本机运行，再按现有项目的结构接入。`;
  const attribution = item.credit ? `原始参考：${item.credit.name} ${item.credit.url}。${item.credit.note || ''}` : '实现来源：UI Moments。';

  return `请在当前工作区实现「${item.title}」，并在本机运行一个可实际操作的示例。

交互预览：${site}#${item.id}
实现源码：${source}
${attribution}

设计与交互
${item.summary}
${notes}
${scene ? `\n使用 #${scene} 场景。接入项目时保留这个场景的控件、视觉反馈和所需逻辑。\n` : ''}
本地实现
先检查当前项目的技术栈与文件结构。${setup}
组件保持清楚的键盘焦点、触摸操作和移动端布局，尊重系统减少动态效果设置。${license}

完成后实际操作一次，验证上面的状态变化，告诉我修改的文件、本地体验地址和启动命令。`;
}

export function mountPrompt(dialog, getPrompt, copy) {
  const close = dialog.querySelector('.close');
  const actions = document.createElement('div');
  actions.className = 'dialog-actions';
  actions.innerHTML = '<button type="button" class="primary">复制提示词</button>';
  const save = dialog.querySelector('[data-save-work]');
  close.before(actions);
  if (save) actions.append(save);
  actions.append(close);

  const preview = document.createElement('details');
  preview.className = 'prompt-preview';
  preview.innerHTML = `
    <summary>查看提示词</summary>
    <div class="prompt-toolbar">
      <p>粘贴到 Codex、Cursor 或 Claude Code。</p>
      <button type="button" class="prompt-copy">复制提示词</button>
    </div>
    <textarea aria-label="组件提示词" readonly spellcheck="false" rows="8"></textarea>`;
  const code = dialog.querySelector('.code-section');
  if (code) code.before(preview);
  else dialog.append(preview);

  const field = preview.querySelector('textarea');
  const refresh = () => { if (preview.open) field.value = getPrompt(); };
  preview.addEventListener('toggle', refresh);
  const inlineCopy = preview.querySelector('.prompt-copy');
  let feedbackTimer;
  const resetFeedback = () => {
    clearTimeout(feedbackTimer);
    inlineCopy.textContent = '复制提示词';
  };
  const copyPrompt = async (event) => {
    const inline = event.currentTarget === inlineCopy;
    const prompt = getPrompt();
    const copied = await copy(prompt, {
      success: '已复制提示词，可粘贴到 AI 编程工具',
      failure: '请在提示词框内手动复制',
    });
    if (!dialog.open) return;
    if (copied && inline) {
      resetFeedback();
      inlineCopy.textContent = '已复制';
      feedbackTimer = setTimeout(resetFeedback, 2400);
    } else if (!copied) {
      preview.open = true;
      field.value = prompt;
      field.focus();
      field.select();
    }
  };
  actions.querySelector('button').addEventListener('click', copyPrompt);
  inlineCopy.addEventListener('click', copyPrompt);
  dialog.addEventListener('close', () => {
    preview.open = false;
    field.value = '';
    resetFeedback();
  });
  return refresh;
}
