const { v } = require('./variants.js'); const fs = require('fs');
const WORK = 100000;                                                      // khối lượng đo
const GUARD = [[0, 0], [1, 0], [2, 1], [3, 2], [4, 2], [97, 25], [100, 25], [1000000, 78498]];   // đúng-sai độc lập với thước đo: gồm đầu vào biên + mẫu giữ riêng
const ok = (f) => GUARD.every(([n, e]) => f(n) === e);
const bench = (f) => { const t = []; for (let r = 0; r < 7; r++) { let k = 0; const s = process.hrtime.bigint(); do { f(WORK); k++; } while (Number(process.hrtime.bigint() - s) < 120e6 && k < 2000); t.push(Number(process.hrtime.bigint() - s) / 1e6 / k); } t.sort((a, b) => a - b); return t[3]; };
let best = null, rows = []; const lines = ['# metric_direction: lower_is_better', 'iteration\ttimestamp\tmetric_ms\tdelta\tguard\tstatus\tdescription'];
v.forEach(([name, f], i) => {
  const g = ok(f), m = g ? bench(f) : NaN;
  let status, delta = '';
  if (!g) status = 'discard (guard fail)'; else if (best === null) { status = 'baseline'; best = m; } else { delta = ((m - best) / best * 100).toFixed(1) + '%'; if (m < best * 0.97) { status = 'keep'; best = m; } else status = 'discard (không nhanh hơn)'; }
  rows.push({ i, name, g, m, delta, status });
  lines.push([i, new Date().toISOString().slice(0, 19), g ? m.toFixed(3) : '-', delta || '-', g ? 'pass' : 'FAIL', status, name].join('\t'));
});
fs.writeFileSync('results.tsv', lines.join('\n') + '\n'); fs.writeFileSync('rows.json', JSON.stringify(rows, null, 1));
console.log(lines.join('\n')); console.log('node', process.version, process.platform, process.arch);
