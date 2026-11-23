/* Full-screen pixel scene: one 180px-tall canvas scaled to the window. */
const Scene = (() => {
  const H = 180, R = Art.R; let cv, c, W = 320, t = 0, P = [], rain = [];
  const ST = { time: 2, wx: 'rainy', storm: false, candle: false, sig: 0, cust: null, cx: 0, out: false, hop: 0, purr: 0, pour: 0, grow: 0, shake: 0, beach: 0, kalis: false, season: 0, fest: false, decor: {}, mis: 0, fit: { top: '#5d8ea0', hat: 'none', cat: 'none' } };
  function size() { W = Math.max(260, Math.round(H * innerWidth / innerHeight)); cv.width = W; cv.height = H; c.imageSmoothingEnabled = false; }
  function init(el) {
    cv = el; c = cv.getContext('2d'); size(); addEventListener('resize', size);
    for (let i = 0; i < 110; i++) rain.push({ x: Math.random(), y: Math.random(), s: .6 + Math.random() * .6 });
    requestAnimationFrame(loop);
  }
  const sky = () => ST.storm ? ['#16202e', '#34445a'] : ST.wx === 'rainy' ? ['#5f7885', '#8fa6ae'] : [['#f6c99f', '#ed9c85'], ['#8fbfd6', '#dbe9e2'], ['#27385a', '#8a5470']][ST.time];
  const night = () => ST.storm || (ST.time === 2 && ST.wx !== 'rainy');
  const pos = () => ({ toast: [W * .53, 130], cust: [W * .4, 146], plant: [W * .09, 146], kalis: [W * .74, 128], lamp: [W * .45, 20], win: [W * .74, 50] });
  function windowArt(wx, wy, ww, wh) {
    const sx = ST.shake > 0 ? Math.sin(t * 60) * 1.5 : 0; wx += sx;
    R(c, wx - 4, wy - 4, ww + 8, wh + 8, '#6e4a38');
    const g = c.createLinearGradient(0, wy, 0, wy + wh); const [a, b] = sky(); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; c.fillRect(wx, wy, ww, wh);
    c.save(); c.beginPath(); c.rect(wx, wy, ww, wh); c.clip();
    if (night()) for (let i = 0; i < 16; i++) if (Math.sin(t * 2 + i) > -.3) R(c, wx + (i * 37 % ww), wy + (i * 17 % 30), 1, 1, '#fff');
    if (ST.wx !== 'rainy' && !ST.storm) { const sy = [wy + wh * .48, wy + 6, wy + 10][ST.time]; const sc = ST.time === 2 ? '#ffe9b8' : '#ffe2a5'; R(c, wx + ww * [.2, .6, .7][ST.time], sy, 9, 9, sc); if (ST.time === 2) R(c, wx + ww * .7 + 3, sy - 1, 6, 6, '#8a5470'); }
    for (let i = 0; i < 2; i++) { const cx = (wx + ((t * 3 + i * 60) % (ww + 40)) - 20); R(c, cx, wy + 8 + i * 14, 22, 4, 'rgba(255,240,214,.55)'); R(c, cx + 4, wy + 5 + i * 14, 12, 4, 'rgba(255,240,214,.55)'); }
    const sea = wy + wh * .58;
    for (let y = sea; y < wy + wh; y += 2) R(c, wx, y, ww, 2, y % 4 ? '#52878a' : '#4a7c82');
    for (let k = 0; k < 4; k++) for (let x = 0; x < ww; x += 3) R(c, wx + x, sea + 4 + k * 8 + Math.round(Math.sin((x + t * (14 + k * 4)) / 5) * 1.5), 2, 1, k % 2 ? '#a5cbb5' : '#cfe6dc');
    if (ST.beach) { const sy = wy + wh - 13; R(c, wx, sy, ww, 13, '#e6cf9f'); R(c, wx, sy, ww, 1, '#f3e4bd'); for (let i = 0; i <= ST.beach; i++) { const ux = wx + 8 + i * 28; R(c, ux, sy - 6, 10, 3, ['#e9577f', '#5d8ea0', '#f2c14e'][i % 3]); R(c, ux + 4, sy - 3, 1, 8, '#6e4a38'); } for (let j = 0; j < ST.beach * 2 + 1; j++) { const px = wx + 12 + j * 14 + Math.round(Math.sin(t + j)); R(c, px, sy + 3, 2, 3, ['#fff0d6', '#5d8ea0', '#c8715b'][j % 3]); R(c, px, sy + 1, 2, 2, '#f2c9a0'); } }
    const lx = wx + ww * .2 | 0, on = ST.sig > 0 ? Math.sin(t * 12) > 0 : t % 5 < 1.2;
    R(c, lx, sea - 22, 7, 22, '#f3e1c4'); for (let i = 0; i < 3; i++) R(c, lx, sea - 20 + i * 8, 7, 3, '#c8715b'); R(c, lx - 1, sea - 25, 9, 3, '#3b2a24'); R(c, lx + 1, sea - 29, 5, 4, on ? '#fff3b0' : '#8a7a5a');
    if (on || ST.sig > 0) { c.fillStyle = `rgba(255,240,170,${ST.sig > 0 ? .45 : .28})`; c.beginPath(); c.moveTo(lx + 3, sea - 27); c.lineTo(wx + ww, sea - 36); c.lineTo(wx + ww, sea - 16); c.fill(); c.beginPath(); c.moveTo(lx + 3, sea - 27); c.lineTo(wx, sea - 36); c.lineTo(wx, sea - 16); c.fill(); }
    c.restore();
    R(c, wx + ww / 2 - 1, wy, 2, wh, '#6e4a38'); R(c, wx, wy + wh / 2, ww, 2, '#6e4a38'); R(c, wx - 6, wy + wh + 4, ww + 12, 4, '#8a5f47');
  }
  function lamp(x, i) {
    const off = ST.storm && !ST.candle, f = off ? .08 : .5 + Math.sin(t * 5 + i * 2) * .05;
    R(c, x, 0, 1, 22, '#3b2a24'); R(c, x - 6, 22, 13, 6, '#ffcf7a'); R(c, x - 4, 20, 9, 3, '#c8715b');
    const g = c.createRadialGradient(x, 30, 2, x, 30, 46); g.addColorStop(0, `rgba(255,207,122,${f})`); g.addColorStop(1, 'rgba(255,207,122,0)'); c.fillStyle = g; c.fillRect(x - 50, 0, 100, 80);
  }
  function frame(ms) {
    t = ms / 1000; const p = pos(); c.clearRect(0, 0, W, H);
    R(c, 0, 0, W, H, '#e3b08f'); for (let x = 0; x < W; x += 12) R(c, x, 0, 1, 110, '#d9a47a');
    windowArt(W * .56 | 0, 14, W * .36 | 0, 78);
    R(c, 8, 12, 78, 50, '#6e4a38'); R(c, 11, 15, 72, 44, '#2d3b38'); c.fillStyle = '#f3ecd8'; c.font = '5px "Press Start 2P",monospace'; ['TODAY', 'Black Coffee', 'Hot Choc.', 'Tea  Cider', 'Honey Milk'].forEach((s, i) => c.fillText(s, 15, 26 + i * 8));
    R(c, 0, 108, W, 4, '#6e4a38'); R(c, 0, 112, W, 38, '#8a5f47'); for (let x = 0; x < W; x += 10) R(c, x, 112, 1, 38, '#7a503d');
    for (let y = 150; y < H; y += 6) { R(c, 0, y, W, 6, y % 12 ? '#a97a5c' : '#9b6e52'); R(c, (y * 7) % W, y, 1, 6, '#7a503d'); }
    R(c, 6, 74, 52, 3, '#6e4a38'); R(c, 8, 66, 6, 8, '#4f8a5b'); R(c, 18, 64, 4, 10, '#b4503c'); R(c, 24, 67, 10, 7, '#5d8ea0'); R(c, 36, 65, 8, 9, '#c8715b'); R(c, 46, 68, 8, 6, '#f2c14e');
    [.2, .45, .7].forEach((f, i) => lamp(W * f | 0, i));
    const tx = W * .17 | 0; R(c, tx - 12, 130, 24, 3, '#a97a5c'); R(c, tx - 10, 133, 2, 17, '#6e4a38'); R(c, tx + 8, 133, 2, 17, '#6e4a38'); R(c, tx - 4, 127, 4, 3, '#fff0d6'); R(c, tx + 3, 128, 5, 2, '#d9a63a');
    R(c, tx - 20, 124, 3, 26, '#8a5f47'); R(c, tx - 20, 124, 8, 3, '#8a5f47'); R(c, tx + 17, 124, 3, 26, '#6e4a38'); R(c, tx + 12, 124, 8, 3, '#6e4a38');
    const D = ST.decor || {};
    if (D.rug) { R(c, W * .1, 160, W * .3, 12, '#b4503c'); R(c, W * .1, 163, W * .3, 2, '#f2c14e'); R(c, W * .1, 168, W * .3, 1, '#f2c14e'); }
    if (D.poster) { R(c, W * .34, 66, 14, 18, '#6e4a38'); R(c, W * .34 + 2, 68, 10, 14, '#5d8ea0'); R(c, W * .34 + 2, 76, 10, 6, '#52878a'); R(c, W * .34 + 9, 70, 2, 2, '#ffe2a5'); }
    if (D.bowl) { R(c, tx - 3, 123, 6, 4, '#a5dbe8'); R(c, tx - 1, 124, 2, 1, '#e08a3c'); }
    if (D.lights) for (let x = 0; x < W; x += 8) { const sy = Math.round(Math.sin(x / 9) * 2); R(c, x, 4 + sy, 1, 1, '#3b2a24'); R(c, x + 3, 6 + sy, 2, 2, Math.sin(t * 3 + x) > 0 ? ['#ffcf7a', '#e9577f', '#7fd0c0'][(x / 8) % 3 | 0] : '#8a7a5a'); }
    if (ST.fest) for (let i = 0; i < 8; i++) { const lx = W * (.06 + i * .12) | 0, ly = 14 + Math.round(Math.sin(t + i) * 2); R(c, lx + 2, 0, 1, ly, '#3b2a24'); R(c, lx, ly, 6, 8, i % 2 ? '#f2c14e' : '#e9577f'); R(c, lx + 1, ly + 3, 4, 2, '#fff3b0'); }
    Art.plant(c, p.plant[0] | 0, p.plant[1], t, ST.grow);
    if (ST.cust) {
      const tgt = ST.out ? W + 30 : p.cust[0]; ST.cx += (tgt - ST.cx) * .05; const hop = ST.hop > 0 ? -Math.abs(Math.sin(t * 10)) * 6 : 0;
      Art.person(c, ST.cust, ST.cx, p.cust[1], t, { sip: Math.abs(ST.cx - tgt) < 2, cup: true, dy: hop });
    }
    if (ST.kalis) Art.person(c, 'kalis', W * .745, 138, t, { cup: true });
    Art.person(c, 'you', W * .68, 138, t, { cup: true, top: ST.fit.top, hat: ST.fit.hat, dy: ST.pour > 0 ? Math.sin(t * 14) * 1.2 : 0 });
    const cx0 = W * .46 | 0; R(c, cx0, 132, W - cx0, 5, '#b98a69'); R(c, cx0, 137, W - cx0, H - 137, '#8a5f47'); for (let x = cx0 + 6; x < W; x += 14) R(c, x, 140, 1, H - 140, '#6e4a38'); R(c, cx0, 132, 2, H - 132, '#6e4a38');
    if (ST.pour > 0) { R(c, W * .68 + 6, 118, 1, 12, '#6b3a2a'); }
    Art.machine(c, W * .86 | 0, 132, t); R(c, W * .78, 126, 8, 6, '#fff0d6'); R(c, W * .78 + 1, 123, 6, 3, '#e9c98a');
    Art.cat(c, (p.toast[0] + (ST.mis > 0 ? Math.sin(t * 8) * 6 : 0)) | 0, 132 - (ST.mis > 0 ? Math.abs(Math.sin(t * 8)) * 5 : 0), t, ST.purr > 0, ST.fit.cat);
    if (ST.candle) { R(c, W * .62, 126, 3, 6, '#fff0d6'); R(c, W * .62 + 1, 123 + Math.round(Math.sin(t * 15)), 1, 3, '#ffcf7a'); const g = c.createRadialGradient(W * .625, 124, 1, W * .625, 124, 30); g.addColorStop(0, 'rgba(255,200,120,.45)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(W * .625 - 32, 92, 64, 64); }
    if (ST.wx === 'rainy' || ST.storm) { c.fillStyle = 'rgba(207,230,243,.35)'; rain.forEach(r => { r.y += .02 * r.s * (ST.storm ? 1.5 : 1); r.x -= .006 * r.s; if (r.y > 1) { r.y = -.05; r.x = Math.random() * 1.1; } c.fillRect(r.x * (W + 20), r.y * H, 1, 4); }); }
    if (ST.season !== 1) { c.fillStyle = ['#f4b6c2', 0, '#d9822b', '#ffffff'][ST.season]; rain.forEach((r, i) => { if (i < 45) c.fillRect((r.x * (W + 20) + Math.sin(t + i) * 6 + W) % W, (r.y * H + t * (ST.season === 3 ? 8 : 14) * r.s) % H, ST.season === 3 ? 1 : 2, 1); }); }
    const d = ST.storm ? (ST.candle ? .38 : .6) : ST.wx === 'rainy' ? .2 : ST.time === 2 ? .36 : 0; if (d) { c.fillStyle = `rgba(12,22,48,${d})`; c.fillRect(0, 0, W, H); }
    if (ST.time === 1 && !ST.storm) { c.fillStyle = 'rgba(255,210,140,.08)'; c.fillRect(0, 0, W, H); }
    if (ST.storm && t % 7 > 6.4 && t % 7 < 6.6) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    P = P.filter(q => (q.l -= .016) > 0); P.forEach(q => { q.x += q.vx; q.y += q.vy; Art.particle(c, q.k, q.x, q.y, q.col); });
    ['hop', 'purr', 'pour', 'grow', 'shake', 'sig', 'mis'].forEach(k => ST[k] > 0 && (ST[k] -= .016));
  }
  function loop(ms) { frame(ms); requestAnimationFrame(loop); }
  const COL = { heart: '#e9577f', spark: '#fff3b0', note: '#fff0d6', drop: '#8fd0ee', paw: '#fff0d6' };
  return {
    init, ST, W: () => W,
    spawn(k, who, n = 4) { const q = pos()[who]; for (let i = 0; i < n; i++) P.push({ k, x: q[0] + Math.random() * 12 - 4, y: q[1] - 12, vx: Math.random() * .6 - .3, vy: -.35 - Math.random() * .3, l: 1.6, col: COL[k] }); },
    enter(id) { ST.cust = id; ST.out = false; ST.cx = W + 20; }, leave() { ST.out = true; }
  };
})();
