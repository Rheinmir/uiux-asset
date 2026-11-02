// mỗi biến thể = một lần sửa trong vòng lặp autoresearch; hàm đếm số nguyên tố ≤ n
exports.v = [
  ['baseline: chia thử mọi số nhỏ hơn n', (n) => { let c = 0; for (let i = 2; i <= n; i++) { let p = true; for (let d = 2; d < i; d++) if (i % d === 0) { p = false; break; } if (p) c++; } return c; }],
  ['chia thử đến √i', (n) => { let c = 0; for (let i = 2; i <= n; i++) { let p = true; for (let d = 2; d * d <= i; d++) if (i % d === 0) { p = false; break; } if (p) c++; } return c; }],
  ['[lỗi cố ý] đổi điều kiện thành d*d < i', (n) => { let c = 0; for (let i = 2; i <= n; i++) { let p = true; for (let d = 2; d * d < i; d++) if (i % d === 0) { p = false; break; } if (p) c++; } return c; }],
  ['bỏ số chẵn, chia thử số lẻ đến √i', (n) => { if (n < 2) return 0; let c = 1; for (let i = 3; i <= n; i += 2) { let p = true; for (let d = 3; d * d <= i; d += 2) if (i % d === 0) { p = false; break; } if (p) c++; } return c; }],
  ['sàng Eratosthenes, mảng boolean', (n) => { if (n < 2) return 0; const s = new Array(n + 1).fill(true); let c = 0; for (let i = 2; i <= n; i++) { if (s[i]) { c++; for (let j = i * i; j <= n; j += i) s[j] = false; } } return c; }],
  ['sàng với Uint8Array', (n) => { if (n < 2) return 0; const s = new Uint8Array(n + 1); let c = 0; for (let i = 2; i <= n; i++) { if (!s[i]) { c++; for (let j = i * i; j <= n; j += i) s[j] = 1; } } return c; }],
  ['[thử] bảng bit Uint32Array', (n) => { if (n < 2) return 0; const s = new Uint32Array((n >> 5) + 1); let c = 0; for (let i = 2; i <= n; i++) { if (!(s[i >> 5] & (1 << (i & 31)))) { c++; for (let j = i * i; j <= n; j += i) s[j >> 5] |= 1 << (j & 31); } } return c; }],
  ['sàng chỉ lưu số lẻ (nửa bộ nhớ)', (n) => { if (n < 2) return 0; const m = (n - 1) >> 1, s = new Uint8Array(m + 1); let c = 1; for (let i = 1; i <= m; i++) { if (!s[i]) { c++; const p = 2 * i + 1; for (let j = (p * p - 1) >> 1; j <= m; j += p) s[j] = 1; } } return c; }],
  ['sàng số lẻ, sửa tràn 32-bit (p*p > n thì bỏ qua)', (n) => { if (n < 2) return 0; const m = (n - 1) >> 1, s = new Uint8Array(m + 1); let c = 1; for (let i = 1; i <= m; i++) { if (!s[i]) { c++; const p = 2 * i + 1; if (p * p > n) continue; for (let j = (p * p - 1) / 2; j <= m; j += p) s[j] = 1; } } return c; }],
];
