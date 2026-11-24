const source = 'gallery/micron';
const repository = 'https://github.com/webkul/micron';
export const micronLicensePath = `${source}/vendor/micron/LICENSE`;

const effects = [
  ['jelly', '果冻回弹', '按钮向两侧拉伸，再收缩回弹。'],
  ['bounce', '轻跳', '按钮先向下沉，再轻轻弹起。'],
  ['squeeze', '挤压复位', '按钮在横向和纵向交替挤压。'],
  ['pop', '弹开', '按钮瞬间压扁，再迅速弹开。'],
  ['shake', '左右抖动', '按钮向两侧快速移动，随后回到原位。'],
  ['fade', '淡闪', '按钮短暂变淡，随后恢复原本的亮度。'],
  ['blink', '缩放闪动', '按钮短促地缩放两次。'],
  ['flicker', '斜切闪动', '按钮左右倾斜，幅度逐渐收小。'],
  ['groove', '摆动倾斜', '按钮在倾斜与旋转之间来回摆动。'],
  ['jerk', '顿挫摆动', '按钮快速平移并扭转，再回到中心。'],
  ['swing', '摇摆', '按钮像钟摆一样左右摇动。'],
  ['tada', '庆祝弹跳', '按钮先缩小，再放大并轻快摆动。'],
];

export const micronWorks = effects.map(([effect, title, summary]) => ({
  id: `micron-${effect}`,
  title,
  en: effect,
  summary,
  category: 'feedback',
  type: '点击反馈',
  tags: ['Micron', '按钮', '点击反馈', '开源集成'],
  demo: `${source}/index.html#${effect}`,
  source,
  credit: {
    name: 'Micron.js · Webkul',
    url: repository,
    licensePath: micronLicensePath,
    note: '原作动效采用 MIT 许可。UI Moments 设计按钮和主题，添加可重复触发的交互。',
  },
  sourceFiles: [`${source}/vendor/micron/dist/css/micron.css`],
}));

export function formatMicronDownload(page, effect, css, license) {
  return page
    .replace('<html lang="zh-CN">', `<html lang="zh-CN" data-effect="${effect}">`)
    .replace('<script src="../../assets/embed.js"></script>', '')
    .replace('<link rel="stylesheet" href="vendor/micron/dist/css/micron.css">', `<style>\n${css}\n</style>`)
    .replace('</body>', `<!--
原作：Micron.js · Webkul
${repository}
UI Moments：按钮外观、主题与交互。

${license.trim()}
-->
</body>`);
}
