import {mkdir, readFile, readdir, writeFile} from 'node:fs/promises';
import {svgSpinners} from './catalog.mjs';

const upstream = new URL('./vendor/svg-spinners/', import.meta.url);
const dist = new URL('./dist/', import.meta.url);
const filenames = svgSpinners.map(item => `${item.slug}.svg`).sort();

for (const variant of ['svg-css', 'svg-smil']) {
  const files = (await readdir(new URL(variant + '/', upstream))).filter(file => file.endsWith('.svg'));
  if (files.sort().join() !== filenames.join()) {
    throw new Error(`SVG Spinners 文件与目录不匹配：${variant}`);
  }
}

const sources = Object.fromEntries(await Promise.all(svgSpinners.map(async ({slug}) => [
  slug,
  await readFile(new URL(`svg-css/${slug}.svg`, upstream), 'utf8'),
])));

await mkdir(dist, {recursive: true});
await writeFile(new URL('sources.json', dist), JSON.stringify(sources));
