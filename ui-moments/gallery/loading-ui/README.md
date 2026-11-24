# Loading UI · UI Moments 集成

完整接入47个原始动效，在主画廊中与其他组件同级、逐个运行。原作者为 **Bartosz Zagrodzki**，原仓库为 [turbostarter/loading-ui](https://github.com/turbostarter/loading-ui)，采用 [MIT](vendor/loading-ui/LICENSE.md) 许可。

## 来源与本站工作

- 固定上游提交：`1b5348c6d9c0f335fba728ec5af05de8b2b40845`
- `vendor/loading-ui/` 原样保存47个组件、47个原始demo、工具文件、README与完整许可证
- `vendor/source.json` 逐文件记录原路径和SHA-256，构建与测试核对字节一致
- 原作提供React、CSS、SVG与Motion实现；UI Moments提供统一画廊、分类、中文说明、主题、尺寸与颜色适配、复制／下载及离屏暂停
- 所有条目使用 `loading-ui-` 前缀，与LDRS的同名实现分别保留；不把这些动效标为本站原创

详情提供尺寸和颜色调整，周期保留上游原作。HTML导出嵌入本地运行资源，可离线打开；TSX导出包含组件源码、原始demo和当前参数，不残留上游私有导入路径，需Tailwind CSS 4及示例列出的依赖。两种导出和复制提示词均保留原作者与完整MIT许可。

## 构建与验证

```sh
npm ci --ignore-scripts --prefix gallery/loading-ui
npm --prefix gallery/loading-ui run build
npm run test:loading-ui
```

根目录构建和GitHub Pages配置已包含本目录，不依赖第三方CDN。组件样式封装在Shadow DOM中，构建时补齐Tailwind属性默认值，避免环形边框等工具类在隔离样式内失效。全局暂停、离屏和减少动态效果时保留静帧并卸载动态组件，恢复时重新播放。

TSX导出补充背景与遮罩变量，并将Skeleton的`bg-muted`改为等价的变量工具类，不依赖使用方另行配置同名主题色；`vendor/`中的原文件保持不变。

HTML运行资源所含React、Motion等依赖的完整许可在 `dist/THIRD_PARTY_LICENSES.txt`；生成页面随同附带。根目录MIT用于本站新增代码，不覆盖原作版权。

本轮检查结果见 [验证记录](verification.md)。
