// 作品清单：首页从这里读取。新增作品时在数组里加一项即可。
const elasticControls = [
  {
    id: 'elastic-ruler',
    title: '弹性滑尺',
    en: 'Elastic Slider',
    summary: '拖动数字滑块时，边缘沿拖动方向拉长。到达刻度尽头后还可拽动一点，松手弹回。',
    tags: ['滑块', '刻度', '拖动'],
    notes: ['支持鼠标、触摸拖动和键盘方向键。', '越界只改变滑块外形，实际数值保持在 0–100。'],
  },
  {
    id: 'alignment-switch',
    title: '对齐拨片',
    en: 'Alignment Switch',
    summary: '在居左、居中和居右之间切换。选中底色先伸展再收紧，上方的线条跟着对齐。',
    tags: ['单选', '对齐', '分段控件'],
    notes: ['使用原生单选组，方向键可切换档位。', '快速切换时，拨片从当前所在位置接续移动。'],
  },
  {
    id: 'bookmark-press',
    title: '夹页键',
    en: 'Bookmark Button',
    summary: '点按切换收藏。按下时整体压扁，松手时底座回弹，书签从凹槽里弹起。',
    tags: ['收藏', '书签', '按钮'],
    notes: ['点按或使用回车、空格切换收藏状态。', '按钮外形和书签图标各自回弹。'],
  },
].map(work => ({
  ...work,
  tags: [...work.tags, '弹性控件'],
  demo: 'gallery/elastic-controls/index.html#' + work.id,
  source: 'gallery/elastic-controls',
  live: true,
  credit: {
    name: '@yui540',
    url: 'https://x.com/yui540/status/2120825584947487170',
    note: '参考控件压缩、拉伸和回弹的节奏，UI Moments 独立设计与实现。',
  },
}));

window.WORKS = [
  ...elasticControls,
  {
    id: 'day-night-toggle',
    title: '昼夜开关',
    en: 'Day / Night Toggle',
    summary: '太阳的像素点沿螺旋飞过去，重新组成月亮；轮廓光绕着拨钮转一圈。拖到一半可以停住。',
    tags: ['开关', '拖动', 'canvas'],
    demo: 'gallery/day-night-toggle/index.html',
    video: 'gallery/day-night-toggle/card.mp4',
    full: 'gallery/day-night-toggle/preview.mp4',
    poster: 'gallery/day-night-toggle/poster.jpg',
    source: 'gallery/day-night-toggle',
    credit: { name: '@kaolti', url: 'https://x.com/kaolti/status/2119151022014894260' },
    notes: [
      '像素点一一对应，沿螺旋轨迹变形，不是随机打散再拼回',
      '拖动时图标、轮廓光和背景都停在中间状态',
      '移动越快，轮廓光的尾巴越长',
      '按下压扁、移动拉长、到位回弹并荡开一圈光波',
      '支持键盘、系统亮暗设置和“减少动态效果”',
    ],
    featured: true,
  },
];
