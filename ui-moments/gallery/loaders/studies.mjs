export const loadingStudiesName = '加载微动效';
export const loadingStudiesReference = 'https://x.com/RaminNasibov/status/2122045748623609935';

const line = {group: '线条', color: '#555092', darkColor: '#c9baff'};
const shape = {group: '几何', color: '#99482f', darkColor: '#ffbd99'};
const dot = {group: '圆点', color: '#3c5a94', darkColor: '#b8d4ff'};
const object = {...dot, group: '图标'};

const studies = [
  {
    key: 'shutter-steps',
    name: '开闸',
    style: line,
    speed: 1.45,
    description: '三扇斜闸共用一条底线，依次立起、落下。',
    parts: ['base', 'gate gate-1', 'gate gate-2', 'gate gate-3'],
    css: `
.um-shutter-steps .base {
  position: absolute;
  inset: auto 14% 25%;
  height: 4%;
  border-radius: 100px;
  background: currentColor;
  opacity: .32;
}
.um-shutter-steps .gate {
  position: absolute;
  left: var(--x);
  bottom: 29%;
  width: 15%;
  height: 46%;
  background: currentColor;
  clip-path: polygon(0 27%, 100% 0, 100% 100%, 0 100%);
  transform-origin: bottom;
  animation: um-shutter-lift var(--period) cubic-bezier(.3,.72,.35,1) var(--delay) infinite;
}
.um-shutter-steps .gate-1 { --x: 20%; --delay: 0s; }
.um-shutter-steps .gate-2 { --x: 43%; --delay: calc(var(--period) * -.12); }
.um-shutter-steps .gate-3 { --x: 66%; --delay: calc(var(--period) * -.24); }
@keyframes um-shutter-lift {
  0%, 66%, 100% { transform: scaleY(.28); opacity: .48; }
  34%, 43% { transform: scaleY(1); opacity: 1; }
  76% { transform: scaleY(.37); opacity: .58; }
}
`,
  },
  {
    key: 'ribbon-scan',
    name: '列扫',
    style: line,
    speed: 1.85,
    description: '扫描线沿三行内容占位符扫过，点亮经过的部分。',
    parts: ['strips', 'light', 'head'],
    css: `
.um-ribbon-scan .strips, .um-ribbon-scan .light {
  position: absolute;
  inset: 29% 17% 29% 17%;
  background: currentColor;
  clip-path: polygon(0 0, 86% 0, 86% 20%, 0 20%, 0 40%, 100% 40%, 100% 60%, 0 60%, 0 80%, 61% 80%, 61% 100%, 0 100%);
}
.um-ribbon-scan .strips { opacity: .24; }
.um-ribbon-scan .light {
  mask-image: linear-gradient(90deg, black 0% 47%, transparent 50%);
  mask-size: 200% 100%;
  animation: um-ribbon-light var(--period) linear infinite;
}
.um-ribbon-scan .head {
  position: absolute;
  top: 21%;
  left: 16%;
  width: 4%;
  height: 58%;
  border-radius: 100px;
  background: currentColor;
  animation: um-ribbon-head var(--period) linear infinite;
}
@keyframes um-ribbon-light {
  0%, 8% { mask-position: 100% 0; opacity: 1; }
  68% { mask-position: 0% 0; opacity: 1; }
  89%, 100% { mask-position: 0% 0; opacity: 0; }
}
@keyframes um-ribbon-head {
  0% { transform: translateX(0); opacity: .4; }
  8% { transform: translateX(0); opacity: .9; }
  68% { transform: translateX(calc(var(--size) * .66)); opacity: .9; }
  89%, 100% { transform: translateX(calc(var(--size) * .66)); opacity: 0; }
}
`,
  },
  {
    key: 'bow-spring',
    name: '弓弦',
    style: line,
    speed: 1.65,
    description: '三根弧线两端固定，中段错拍拱起、回弹。',
    parts: ['bow bow-1', 'bow bow-2', 'bow bow-3'],
    css: `
.um-bow-spring .bow {
  position: absolute;
  left: 17%;
  bottom: var(--y);
  width: 66%;
  height: 27%;
  box-sizing: border-box;
  border: max(1px, calc(var(--size) * .047)) solid currentColor;
  border-bottom: 0;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform-origin: center bottom;
  animation: um-bow-flex var(--period) var(--delay) cubic-bezier(.28,.75,.31,1) infinite;
}
.um-bow-spring .bow-1 { --y: 56%; --delay: 0s; }
.um-bow-spring .bow-2 { --y: 40%; --delay: calc(var(--period) * -.13); }
.um-bow-spring .bow-3 { --y: 24%; --delay: calc(var(--period) * -.26); }
@keyframes um-bow-flex {
  0%, 74%, 100% { transform: scaleY(.36); opacity: .46; }
  37% { transform: scaleY(1); opacity: 1; }
  63% { transform: scaleY(.27); opacity: .5; }
}
`,
  },
  {
    key: 'zip-stitch',
    name: '合链',
    style: shape,
    speed: 1.8,
    description: '两排梳齿错开半格，像拉链一样扣合再分离。',
    parts: ['zip zip-start', 'zip zip-end'],
    css: `
.um-zip-stitch .zip {
  position: absolute;
  top: var(--top);
  left: var(--left);
  width: 59%;
  height: 23%;
  background: currentColor;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 83% 100%, 83% 29%, 58% 29%, 58% 100%, 42% 100%, 42% 29%, 17% 29%, 17% 100%, 0 100%);
  animation: um-zip-close var(--period) cubic-bezier(.58,.02,.27,1.05) infinite;
}
.um-zip-stitch .zip-start { --top: 20%; --left: 14%; --turn: 0deg; --travel: 50%; }
.um-zip-stitch .zip-end { --top: 57%; --left: 27%; --turn: 180deg; --travel: -50%; }
@keyframes um-zip-close {
  0%, 14%, 86%, 100% { transform: translateY(0) rotate(var(--turn)); opacity: .68; }
  47%, 59% { transform: translateY(var(--travel)) rotate(var(--turn)); opacity: 1; }
}
`,
  },
  {
    key: 'corner-lock',
    name: '对角',
    style: shape,
    speed: 1.75,
    description: '四个角标按对角成对内收，像取景框逐步对准。',
    parts: ['corner north-west', 'corner north-east', 'corner south-east', 'corner south-west'],
    css: `
.um-corner-lock .corner {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 25%;
  height: 25%;
  box-sizing: border-box;
  border: max(1px, calc(var(--size) * .061)) solid currentColor;
  border-right: 0;
  border-bottom: 0;
  border-radius: 27% 0 0;
  animation: um-corner-seat var(--period) var(--delay) cubic-bezier(.55,.04,.21,1) infinite;
}
.um-corner-lock .north-west { --x: 17%; --y: 17%; --dx: 31%; --dy: 31%; --turn: 0deg; --delay: 0s; }
.um-corner-lock .north-east { --x: 58%; --y: 17%; --dx: -31%; --dy: 31%; --turn: 90deg; --delay: calc(var(--period) * -.20); }
.um-corner-lock .south-east { --x: 58%; --y: 58%; --dx: -31%; --dy: -31%; --turn: 180deg; --delay: 0s; }
.um-corner-lock .south-west { --x: 17%; --y: 58%; --dx: 31%; --dy: -31%; --turn: 270deg; --delay: calc(var(--period) * -.20); }
@keyframes um-corner-seat {
  0%, 15%, 83%, 100% { transform: rotate(var(--turn)); opacity: .44; }
  44%, 62% { transform: translate(var(--dx), var(--dy)) rotate(var(--turn)); opacity: 1; }
}
`,
  },
  {
    key: 'packet-sink',
    name: '拆包',
    style: shape,
    speed: 1.8,
    description: '三张斜切片依次滑出，再按原来的层次叠回。',
    parts: ['packet upper', 'packet middle', 'packet lower'],
    css: `
.um-packet-sink .packet {
  position: absolute;
  top: var(--top);
  left: var(--left);
  width: 45%;
  height: 13%;
  background: currentColor;
  clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
  animation: um-packet-fan var(--period) var(--delay) cubic-bezier(.4,.03,.32,1) infinite;
}
.um-packet-sink .upper { --top: 27%; --left: 20%; --x: -26%; --y: -37%; --delay: 0s; --base: .52; }
.um-packet-sink .middle { --top: 44%; --left: 26%; --x: 25%; --y: 0%; --delay: calc(var(--period) * -.08); --base: .74; }
.um-packet-sink .lower { --top: 61%; --left: 32%; --x: 34%; --y: 42%; --delay: calc(var(--period) * -.16); --base: .92; }
@keyframes um-packet-fan {
  0%, 14%, 86%, 100% { transform: translate(0, 0); opacity: var(--base); }
  45%, 58% { transform: translate(var(--x), var(--y)); opacity: 1; }
}
`,
  },
  {
    key: 'socket-feed',
    name: '入槽',
    style: object,
    speed: 1.65,
    description: '短胶囊落进槽口，触底压缩，槽沿随之回弹。',
    parts: ['socket', 'insert'],
    css: `
.um-socket-feed .socket {
  position: absolute;
  inset: 53% 21% 22%;
  box-sizing: border-box;
  border: max(1px, calc(var(--size) * .056)) solid currentColor;
  border-top: 0;
  border-radius: 0 0 28% 28% / 0 0 62% 62%;
  transform-origin: center bottom;
  animation: um-socket-recoil var(--period) infinite;
}
.um-socket-feed .insert {
  position: absolute;
  top: 18%;
  left: 43%;
  width: 14%;
  height: 27%;
  border-radius: 100px;
  background: currentColor;
  transform-origin: center bottom;
  animation: um-socket-drop var(--period) infinite;
}
@keyframes um-socket-drop {
  0%, 100% { transform: translateY(-22%); opacity: .25; }
  12%, 23% { transform: translateY(0); opacity: 1; animation-timing-function: cubic-bezier(.62,.03,.86,.42); }
  52% { transform: translateY(109%) scale(1.26, .57); opacity: 1; }
  61% { transform: translateY(92%) scale(1, .86); opacity: .84; }
  78%, 82% { transform: translateY(109%) scale(1.1, .65); opacity: 0; }
  93% { transform: translateY(-22%); opacity: 0; }
}
@keyframes um-socket-recoil {
  0%, 49%, 78%, 100% { transform: scale(1); opacity: .64; }
  54% { transform: scale(1.08, .85); opacity: 1; }
  64% { transform: scale(.98, 1.08); opacity: .82; }
}
`,
  },
  {
    key: 'balance-pass',
    name: '过桥',
    style: dot,
    speed: 2.15,
    description: '横梁随方向倾斜，一颗圆点贴着梁面滚向低处。',
    parts: ['pivot', 'beam', 'bead'],
    css: `
.um-balance-pass .pivot {
  position: absolute;
  top: 54%;
  left: 39%;
  width: 22%;
  height: 18%;
  background: currentColor;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  opacity: .33;
}
.um-balance-pass .beam {
  position: absolute;
  inset: 51% 15% 43%;
  border-radius: 100px;
  background: currentColor;
  animation: um-balance-tilt var(--period) ease-in-out infinite;
}
.um-balance-pass .bead {
  position: absolute;
  top: 48%;
  left: 44%;
  width: 12%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;
  animation: um-balance-roll var(--period) ease-in-out infinite;
}
@keyframes um-balance-tilt {
  0%, 12%, 100% { transform: rotate(-18deg); }
  47%, 60% { transform: rotate(18deg); }
}
@keyframes um-balance-roll {
  0%, 12%, 100% { transform: rotate(-18deg) translate(-212%, -75%); }
  47%, 60% { transform: rotate(18deg) translate(212%, -75%); }
}
`,
  },
  {
    key: 'relay-pair',
    name: '交棒',
    style: dot,
    speed: 1.95,
    description: '两颗点沿上下两侧擦肩，交换位置和亮度。',
    parts: ['bead first', 'bead second'],
    css: `
.um-relay-pair .bead {
  position: absolute;
  top: 43%;
  left: 43%;
  width: 14%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;
  animation: um-relay-side var(--period) infinite;
}
.um-relay-pair .first { --start: -153%; --end: 153%; --arc: -86%; --lit: 1; --dim: .46; }
.um-relay-pair .second { --start: 153%; --end: -153%; --arc: 86%; --lit: .46; --dim: 1; }
@keyframes um-relay-side {
  0%, 9%, 100% { transform: translate(var(--start), 0); opacity: var(--lit); }
  28%, 78% { transform: translate(0, var(--arc)) scale(.77); opacity: .72; }
  48%, 59% { transform: translate(var(--end), 0); opacity: var(--dim); }
}
`,
  },
];

export const loadingStudies = studies.map(({style, speed, ...study}) => ({
  ...study,
  className: 'um-' + study.key,
  collection: loadingStudiesName,
  reference: loadingStudiesReference,
  group: style.group,
  defaults: {size: 48, color: style.color, speed},
  darkColor: style.darkColor,
}));
