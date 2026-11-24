// LDRS 1.1.9 原始默认参数；只增加分类与中文说明。
export const loaders=[
  {
    "key": "ring",
    "name": "Ring",
    "group": "环形",
    "description": "圆弧沿圆环旋转，长度随节奏伸缩",
    "tag": "l-ring",
    "react": "Ring",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "stroke": 5.0,
      "speed": 2.0,
      "bg-opacity": 0.0
    }
  },
  {
    "key": "ring2",
    "name": "Ring 2",
    "group": "环形",
    "description": "短弧绕着淡色轨道持续旋转",
    "tag": "l-ring2",
    "react": "Ring2",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "stroke": 5.0,
      "stroke-length": 0.25,
      "speed": 0.8,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "tailspin",
    "name": "Tailspin",
    "group": "环形",
    "description": "带拖尾的圆环，轻巧地连续旋转",
    "tag": "l-tailspin",
    "react": "Tailspin",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 0.9,
      "stroke": 5.0
    }
  },
  {
    "key": "lineSpinner",
    "name": "Line Spinner",
    "group": "环形",
    "description": "短线沿圆周依次明暗交替",
    "tag": "l-line-spinner",
    "react": "LineSpinner",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.0,
      "stroke": 3.0
    }
  },
  {
    "key": "squircle",
    "name": "Squircle",
    "group": "几何",
    "description": "圆角方形轨道上的流动线条",
    "tag": "l-squircle",
    "react": "Squircle",
    "defaults": {
      "size": 37.0,
      "color": "black",
      "stroke": 5.0,
      "stroke-length": 0.15,
      "speed": 0.9,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "square",
    "name": "Square",
    "group": "几何",
    "description": "沿正方形边缘行进的短线",
    "tag": "l-square",
    "react": "Square",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "stroke": 5.0,
      "stroke-length": 0.25,
      "speed": 1.2,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "reuleaux",
    "name": "Reuleaux",
    "group": "几何",
    "description": "弧形三角轨道上的连续运动",
    "tag": "l-reuleaux",
    "react": "Reuleaux",
    "defaults": {
      "size": 37.0,
      "color": "black",
      "stroke": 5.0,
      "speed": 0.9,
      "stroke-length": 0.15,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "tailChase",
    "name": "Tail Chase",
    "group": "圆点",
    "description": "三颗圆点互相追逐，轮流加速",
    "tag": "l-tail-chase",
    "react": "TailChase",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.5
    }
  },
  {
    "key": "dotSpinner",
    "name": "Dot Spinner",
    "group": "圆点",
    "description": "圆点组成旋转中的光环",
    "tag": "l-dot-spinner",
    "react": "DotSpinner",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 0.9
    }
  },
  {
    "key": "spiral",
    "name": "Spiral",
    "group": "圆点",
    "description": "不同大小的圆点沿螺旋流动",
    "tag": "l-spiral",
    "react": "Spiral",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 0.9
    }
  },
  {
    "key": "bouncy",
    "name": "Bouncy",
    "group": "圆点",
    "description": "三颗圆点轮流弹跳、拉伸",
    "tag": "l-bouncy",
    "react": "Bouncy",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 1.75
    }
  },
  {
    "key": "treadmill",
    "name": "Treadmill",
    "group": "圆点",
    "description": "圆点像跑步机一样滚动交替",
    "tag": "l-treadmill",
    "react": "Treadmill",
    "defaults": {
      "size": 70.0,
      "color": "black",
      "speed": 1.25
    }
  },
  {
    "key": "bouncyArc",
    "name": "Bouncy Arc",
    "group": "圆点",
    "description": "圆点沿弧线弹起又落下",
    "tag": "l-bouncy-arc",
    "react": "BouncyArc",
    "defaults": {
      "size": 70.0,
      "color": "black",
      "speed": 1.65
    }
  },
  {
    "key": "waveform",
    "name": "Waveform",
    "group": "线条",
    "description": "一组竖线像声波一样起伏",
    "tag": "l-waveform",
    "react": "Waveform",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "speed": 1.0,
      "stroke": 3.5
    }
  },
  {
    "key": "hatch",
    "name": "Hatch",
    "group": "线条",
    "description": "三条线在横向与竖向之间翻转",
    "tag": "l-hatch",
    "react": "Hatch",
    "defaults": {
      "size": 28.0,
      "color": "black",
      "speed": 3.5,
      "stroke": 4.0
    }
  },
  {
    "key": "hourglass",
    "name": "Hourglass",
    "group": "几何",
    "description": "两部分轮流收缩，像翻转的沙漏",
    "tag": "l-hourglass",
    "react": "Hourglass",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.75,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "zoomies",
    "name": "Zoomies",
    "group": "线条",
    "description": "细线上快速往返的小光点",
    "tag": "l-zoomies",
    "react": "Zoomies",
    "defaults": {
      "size": 80.0,
      "color": "black",
      "speed": 1.4,
      "stroke": 5.0,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "lineWobble",
    "name": "Line Wobble",
    "group": "线条",
    "description": "线段在轨道上伸展、收拢",
    "tag": "l-line-wobble",
    "react": "LineWobble",
    "defaults": {
      "size": 80.0,
      "color": "black",
      "speed": 1.75,
      "stroke": 5.0,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "infinity",
    "name": "Infinity",
    "group": "环形",
    "description": "沿无限符号不断流动的细线",
    "tag": "l-infinity",
    "react": "Infinity",
    "defaults": {
      "size": 55.0,
      "color": "black",
      "speed": 1.3,
      "stroke": 4.0,
      "stroke-length": 0.15,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "trefoil",
    "name": "Trefoil",
    "group": "环形",
    "description": "三叶曲线上的流动轨迹",
    "tag": "l-trefoil",
    "react": "Trefoil",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "stroke": 4.0,
      "stroke-length": 0.15,
      "speed": 1.4,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "cardio",
    "name": "Cardio",
    "group": "线条",
    "description": "像心电图一样跃动的折线",
    "tag": "l-cardio",
    "react": "Cardio",
    "defaults": {
      "size": 50.0,
      "color": "black",
      "speed": 1.5,
      "stroke": 4.0,
      "bg-opacity": 0.1
    }
  },
  {
    "key": "helix",
    "name": "Helix",
    "group": "圆点",
    "description": "圆点交错升降，组成双螺旋",
    "tag": "l-helix",
    "react": "Helix",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 2.5
    }
  },
  {
    "key": "grid",
    "name": "Grid",
    "group": "圆点",
    "description": "点阵由中心向外有序起伏",
    "tag": "l-grid",
    "react": "Grid",
    "defaults": {
      "size": 60.0,
      "color": "black",
      "speed": 1.5
    }
  },
  {
    "key": "quantum",
    "name": "Quantum",
    "group": "圆点",
    "description": "圆点交错移动，汇聚又散开",
    "tag": "l-quantum",
    "react": "Quantum",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 1.75
    }
  },
  {
    "key": "wobble",
    "name": "Wobble",
    "group": "圆点",
    "description": "圆点摆动、聚合，往复变化",
    "tag": "l-wobble",
    "react": "Wobble",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 0.9
    }
  },
  {
    "key": "orbit",
    "name": "Orbit",
    "group": "圆点",
    "description": "圆点沿轨道相互环绕",
    "tag": "l-orbit",
    "react": "Orbit",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "speed": 1.5
    }
  },
  {
    "key": "chaoticOrbit",
    "name": "Chaotic Orbit",
    "group": "圆点",
    "description": "不同节奏的圆点沿轨道穿梭",
    "tag": "l-chaotic-orbit",
    "react": "ChaoticOrbit",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "speed": 1.5
    }
  },
  {
    "key": "superballs",
    "name": "Superballs",
    "group": "圆点",
    "description": "两颗圆球靠近、远离、相互交换",
    "tag": "l-superballs",
    "react": "Superballs",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.4
    }
  },
  {
    "key": "trio",
    "name": "Trio",
    "group": "圆点",
    "description": "三颗圆点围绕共同中心运动",
    "tag": "l-trio",
    "react": "Trio",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.3
    }
  },
  {
    "key": "momentum",
    "name": "Momentum",
    "group": "圆点",
    "description": "圆点以错开的节奏传递动量",
    "tag": "l-momentum",
    "react": "Momentum",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.1
    }
  },
  {
    "key": "dotWave",
    "name": "Dot Wave",
    "group": "圆点",
    "description": "圆点沿水平方向依次起伏",
    "tag": "l-dot-wave",
    "react": "DotWave",
    "defaults": {
      "size": 47.0,
      "color": "black",
      "speed": 1.0
    }
  },
  {
    "key": "leapfrog",
    "name": "Leapfrog",
    "group": "圆点",
    "description": "圆点交替跃过彼此",
    "tag": "l-leapfrog",
    "react": "Leapfrog",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 2.5
    }
  },
  {
    "key": "newtonsCradle",
    "name": "Newton's Cradle",
    "group": "圆点",
    "description": "两端圆球摆动，像牛顿摆",
    "tag": "l-newtons-cradle",
    "react": "NewtonsCradle",
    "defaults": {
      "size": 78.0,
      "color": "black",
      "speed": 1.4
    }
  },
  {
    "key": "dotStream",
    "name": "Dot Stream",
    "group": "圆点",
    "description": "圆点沿直线连续流过",
    "tag": "l-dot-stream",
    "react": "DotStream",
    "defaults": {
      "size": 60.0,
      "color": "black",
      "speed": 2.5
    }
  },
  {
    "key": "dotPulse",
    "name": "Dot Pulse",
    "group": "圆点",
    "description": "三颗圆点依次明暗、放大",
    "tag": "l-dot-pulse",
    "react": "DotPulse",
    "defaults": {
      "size": 43.0,
      "color": "black",
      "speed": 1.3
    }
  },
  {
    "key": "metronome",
    "name": "Metronome",
    "group": "圆点",
    "description": "圆点有规律地摆动交替",
    "tag": "l-metronome",
    "react": "Metronome",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.6
    }
  },
  {
    "key": "jelly",
    "name": "Jelly",
    "group": "几何",
    "description": "柔软的形体像果冻一样呼吸",
    "tag": "l-jelly",
    "react": "Jelly",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 0.9
    }
  },
  {
    "key": "jellyTriangle",
    "name": "Jelly Triangle",
    "group": "几何",
    "description": "三颗圆点拉出柔软的三角形",
    "tag": "l-jelly-triangle",
    "react": "JellyTriangle",
    "defaults": {
      "size": 30.0,
      "color": "black",
      "speed": 1.75
    }
  },
  {
    "key": "mirage",
    "name": "Mirage",
    "group": "几何",
    "description": "形体在拉伸、融合之间来回变化",
    "tag": "l-mirage",
    "react": "Mirage",
    "defaults": {
      "size": 60.0,
      "color": "black",
      "speed": 2.5
    }
  },
  {
    "key": "ping",
    "name": "Ping",
    "group": "环形",
    "description": "从中心扩散的一圈波纹",
    "tag": "l-ping",
    "react": "Ping",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 2.0
    }
  },
  {
    "key": "pulsar",
    "name": "Pulsar",
    "group": "环形",
    "description": "从中心向外放大的脉冲",
    "tag": "l-pulsar",
    "react": "Pulsar",
    "defaults": {
      "size": 40.0,
      "color": "black",
      "speed": 1.75
    }
  },
  {
    "key": "ripples",
    "name": "Ripples",
    "group": "环形",
    "description": "多圈波纹交错向外扩散",
    "tag": "l-ripples",
    "react": "Ripples",
    "defaults": {
      "size": 45.0,
      "color": "black",
      "speed": 2.0
    }
  },
  {
    "key": "miyagi",
    "name": "Miyagi",
    "group": "线条",
    "description": "多条细线依次展开又聚拢",
    "tag": "l-miyagi",
    "react": "Miyagi",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "speed": 0.9,
      "stroke": 3.5
    }
  },
  {
    "key": "pinwheel",
    "name": "Pinwheel",
    "group": "线条",
    "description": "细线组成一枚轻巧的旋转风车",
    "tag": "l-pinwheel",
    "react": "Pinwheel",
    "defaults": {
      "size": 35.0,
      "color": "black",
      "speed": 0.9,
      "stroke": 3.5
    }
  }
];

export const groups=[...new Set(loaders.map(item=>item.group))];
export function previewProps(item,color,theme){
  if(item.original)return {...item.defaults,color:theme==='dark'?item.darkColor:item.defaults.color};
  if(item.provider)return {...item.defaults,color};
  const wide=["lineWobble","zoomies","dotStream","waveform","treadmill","newtonsCradle","leapfrog"];
  return {...item.defaults,size:item.key==="hatch"?42:wide.includes(item.key)?100:68,color};
}
