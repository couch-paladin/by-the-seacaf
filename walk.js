/* Walking engine: side-scrolling places, each in its own scene_*.js file. */
const Walk = (() => {
  const H = 180, R = Art.R, SC = {}, ST = Scene.ST, G = { R, H, t: 0, W: 320, c: null, sky: null, bld: null };
  let hist = [], el, cv, c, W = 320, run = false, sc, px = 60, cam = 0, keys = {}, t = 0, last = 0, fade = 0, fd = 0, pend = null, near = null, stepT = 0;
  const size = () => { W = Math.max(260, Math.round(H * innerWidth / innerHeight)); cv.width = W; cv.height = H; c.imageSmoothingEnabled = false; G.c = c; G.W = W; };
  G.sky = (h, off = 0) => {
    const g = c.createLinearGradient(0, 0, 0, h), k = ST.storm ? ['#16202e', '#34445a'] : ST.wx === 'rainy' ? ['#5f7885', '#8fa6ae'] : [['#f6c99f', '#ed9c85'], ['#8fbfd6', '#dbe9e2'], ['#27385a', '#8a5470']][ST.time];
    g.addColorStop(0, k[0]); g.addColorStop(1, k[1]); c.fillStyle = g; c.fillRect(0, 0, W, h);
    for (let i = 0; i < 3; i++) { const x = (((i * 130 + t * 4 - off) % (W + 60)) + W + 60) % (W + 60) - 30; R(c, x, 20 + i * 14, 26, 4, 'rgba(255,240,214,.5)'); R(c, x + 5, 17 + i * 14, 14, 4, 'rgba(255,240,214,.5)'); }
    if (ST.time === 2 && ST.wx !== 'rainy') for (let i = 0; i < 24; i++) if (Math.sin(t * 2 + i) > -.4) R(c, (i * 47) % W, (i * 13) % 70, 1, 1, '#fff');
  };
  G.bld = (x, w, h, roof, wall, sign) => {
    R(c, x - w / 2, 150 - h, w, h, wall); R(c, x - w / 2 - 2, 145 - h, w + 4, 6, roof); R(c, x - 4, 132, 8, 18, '#6e4a38'); R(c, x - w / 2 + 5, 160 - h, 8, 8, '#ffe2a5'); R(c, x + w / 2 - 13, 160 - h, 8, 8, '#ffe2a5');
    R(c, x - w / 2 + 3, 131 - h, w - 6, 9, '#3b2a24'); c.fillStyle = '#ffe9b8'; c.font = '5px "Press Start 2P",monospace'; c.fillText(sign, x - w / 2 + 5, 138 - h);
  };
  const talking = () => !$('mcard').classList.contains('hidden') || !!($('pause') && !$('pause').classList.contains('hidden'));
  function load(p) { sc = SC[p.id]; px = p.at != null ? p.at : 40; $('wt').textContent = sc.n; }
  function loop(ms) {
    if (!run) return; const dt = Math.min(.05, (ms - last) / 1000); last = ms; t = ms / 1000; G.t = t;
    const dir = talking() || fd ? 0 : (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    if (dir) { px = Math.max(10, Math.min(sc.w - 10, px + dir * 58 * dt)); stepT += dt; if (stepT > .28) { stepT = 0; Snd.tone(110 + Math.random() * 40, .04, 'square', .012); } }
    cam = sc.w <= W ? -(W - sc.w) / 2 : Math.max(0, Math.min(px - W / 2, sc.w - W));
    c.clearRect(0, 0, W, H); sc.draw(G, cam); near = null; let bd = 18;
    sc.spots().forEach(h => { const hx = h.x + (h.walk ? Math.sin(t * .4 + h.x) * h.walk : 0); if (h.who) Art.person(c, h.who, hx - cam, 152 - (sc.rise ? sc.rise(hx) : 0), t, {}); const d = Math.abs(hx - px); if (d < bd) { bd = d; near = h; } });
    Art.person(c, 'you', px - cam, 152 - (sc.rise ? sc.rise(px) : 0), t, { top: S.fit.top, hat: S.fit.hat, walk: !!dir });
    if (ST.wx === 'rainy' || ST.storm) { c.fillStyle = 'rgba(207,230,243,.35)'; for (let i = 0; i < 70; i++) c.fillRect(((i * 37 - t * 40) % W + W) % W, (i * 23 + t * 120) % H, 1, 4); }
    if (ST.time === 2) { c.fillStyle = 'rgba(18,32,74,.25)'; c.fillRect(0, 0, W, H); }
    if (fd) { fade += fd * dt * 3; if (fade >= 1) { fade = 1; fd = -1; load(pend); } else if (fade <= 0) { fade = 0; fd = 0; } }
    if (fade > 0) { c.fillStyle = `rgba(20,14,12,${fade})`; c.fillRect(0, 0, W, H); }
    const show = near && !talking() && !fd; $('wp').textContent = show ? near.label : ''; $('wp').style.opacity = show ? 1 : 0; requestAnimationFrame(loop);
  }
  function act() {
    if (!near || fd || talking()) return; const h = near;
    if (h.go) { hist.push({ id: sc.id, at: px }); pend = { id: h.go, at: h.at }; fd = 1; Snd.tone(500, .1, 'triangle'); } else if (h.exit) stop(); else if (h.talk) World.visit(TOWN.find(p => p.id === h.talk)); else if (h.run) h.run();
  }
  function say(who, name, lines, done) {
    let i = 0; $('mcard').classList.remove('hidden'); const p = $('mpor').getContext('2d'); p.clearRect(0, 0, 24, 24); Art.person(p, who, 12, 23, 0); Snd.voice(VOICE[who]); $('mn').textContent = name;
    const go = () => { $('mnext').classList.add('hidden'); typeInto($('mt'), lines[i], 22, () => { $('mnext').classList.remove('hidden'); $('mnext').textContent = i < lines.length - 1 ? 'NEXT' : 'DONE'; $('mnext').onclick = () => { if (i < lines.length - 1) { i++; go(); } else { $('mcard').classList.add('hidden'); done && done(); } }; }); };
    go();
  }
  function build() {
    el = document.createElement('div'); el.id = 'walk'; el.className = 'layer hidden';
    el.innerHTML = '<canvas id="wcv"></canvas><b id="wt"></b><button class="pix sm" id="wback">BACK TO CAFE</button><button class="pix sm" id="wprev">GO BACK</button><button class="pix sm" id="wmenu">MENU</button><div id="wp"></div><button class="pix wc" id="wl">&lt;</button><button class="pix wc" id="wr">&gt;</button><button class="pix wc" id="wa">TALK</button>';
    document.body.appendChild(el); cv = $('wcv'); c = cv.getContext('2d'); size(); addEventListener('resize', size);
    const K = { ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
    addEventListener('keydown', e => { if (!run) return; if (K[e.key]) keys[K[e.key]] = 1; if (e.key === 'e' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (talking()) $('mnext').click(); else act(); } });
    addEventListener('keyup', e => { if (K[e.key]) keys[K[e.key]] = 0; });
    [['wl', 'left'], ['wr', 'right']].forEach(([id, k]) => { const b = $(id); b.onpointerdown = () => keys[k] = 1; b.onpointerup = b.onpointerleave = () => keys[k] = 0; });
    $('wa').onclick = () => talking() ? $('mnext').click() : act(); $('wback').onclick = stop; $('wmenu').onclick = () => pauseMenu(); $('wprev').onclick = () => { if (fd || talking()) return; const p = hist.pop(); if (!p) return stop(); pend = p; fd = 1; };
  }
  function start(id = 'street', at) {
    if (!el) { World.map(); $('mclose').click(); World.nomap(true); build(); }
    hist = []; el.classList.remove('hidden'); run = true; keys = {}; fade = fd = 0; load({ id, at: at != null ? at : (id === 'street' ? 470 : 40) }); last = performance.now(); requestAnimationFrame(loop);
    toast('Arrow keys / A D to walk. E or Space to talk.');
  }
  function stop() { if (!el) return; run = false; keys = {}; $('mcard').classList.add('hidden'); el.classList.add('hidden'); }
  return { start, stop, say, reg: s => { SC[s.id] = s; } };
})();
