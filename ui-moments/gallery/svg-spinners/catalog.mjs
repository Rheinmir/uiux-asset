const groups = {
  环形: '90-ring 90-ring-with-bg 180-ring 180-ring-with-bg 270-ring 270-ring-with-bg eclipse eclipse-half ring-resize pulse-ring pulse-rings-2 pulse-rings-3 pulse-rings-multiple',
  圆点: '3-dots-bounce 3-dots-fade 3-dots-move 3-dots-rotate 3-dots-scale 3-dots-scale-middle 6-dots-rotate 6-dots-scale 6-dots-scale-middle 8-dots-rotate 12-dots-scale-rotate bouncing-ball dot-revolve gooey-balls-1 gooey-balls-2 pulse pulse-2 pulse-3 pulse-multiple',
  线条: 'bars-fade bars-rotate-fade bars-scale bars-scale-fade bars-scale-middle',
  几何: 'blocks-scale blocks-shuffle-2 blocks-shuffle-3 blocks-wave',
  图标: 'clock tadpole wifi wifi-fade wind-toy',
};

const descriptions = {
  'gooey-balls-1': '两个圆球交替伸缩，接近时黏连。',
  'gooey-balls-2': '两个圆球沿轨道分开，再黏合到一起。',
  'wind-toy': '风车形叶片持续绕中心旋转。',
  'tadpole': '圆点拖着弯曲尾迹沿圆周旋转。',
  'wifi': 'Wi-Fi 信号从内向外逐级点亮。',
  'wifi-fade': 'Wi-Fi 信号从内向外渐次显隐。',
  'clock': '时钟指针绕中心连续转动。',
};

const groupDescriptions = {
  环形: '使用圆弧或同心圆的加载动效。',
  圆点: '使用圆点的循环加载动效。',
  线条: '使用条形刻度的循环加载动效。',
  几何: '使用方块的循环加载动效。',
};

const origin = {
  name: 'SVG Spinners',
  author: 'Utkarsh Verma',
  license: 'MIT',
  licensePath: 'gallery/svg-spinners/vendor/svg-spinners/LICENSE',
  repository: 'https://github.com/n3r4zzurr0/svg-spinners',
};

export const svgSpinners = Object.entries(groups).flatMap(([group, slugs]) =>
  slugs.split(' ').map(slug => ({
    key: `svg-spinner-${slug}`,
    name: slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ').replace('Wifi', 'Wi-Fi'),
    group,
    description: descriptions[slug] || groupDescriptions[group],
    provider: 'svg-spinners',
    slug,
    defaults: {size: 58, color: '#f5f5f7'},
    origin,
  })),
);
