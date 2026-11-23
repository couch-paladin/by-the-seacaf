/* Town map + closet. Everything is pixel art drawn on canvas. */
const World = (() => {
  const MW = 176, MH = 110, R = Art.R; let mx, mopen = false, ov, card, ctimer, copen, dop, cop, aop, nomap, prevFit;
  const layer = (id, html) => { const d = document.createElement('div'); d.id = id; d.className = 'layer hidden'; d.innerHTML = html; document.body.appendChild(d); return d; };
  const house = (x, y, w, h, roof, wall) => { R(mx, x, y, w, h, wall); R(mx, x - 1, y - 4, w + 2, 5, roof); R(mx, x + (w >> 1) - 1, y + h - 5, 3, 5, '#6e4a38'); R(mx, x + 2, y + 3, 3, 3, '#ffe2a5'); R(mx, x + w - 5, y + 3, 3, 3, '#ffe2a5'); };
  function draw(ms) {
    if (!mopen) return; const t = ms / 1000;
    R(mx, 0, 0, MW, MH, '#8fb572'); for (let i = 0; i < 50; i++) R(mx, (i * 53) % MW, (i * 29) % MH, 1, 2, '#7aa361');
    R(mx, 116, 0, 60, MH, '#52878a'); R(mx, 0, 92, MW, 18, '#52878a'); R(mx, 112, 0, 4, 92, '#e6cf9f'); R(mx, 0, 88, 116, 4, '#e6cf9f');
    R(mx, 128, 18, 40, 30, '#8fb572'); R(mx, 128, 46, 40, 3, '#e6cf9f');
    for (let k = 0; k < 14; k++) R(mx, 118 + (k * 13) % 56, (k * 17 + t * 6) % MH | 0, 5, 1, '#cfe6dc'); for (let k = 0; k < 9; k++) R(mx, (k * 23 + t * 5) % 116 | 0, 94 + (k * 5) % 14, 5, 1, '#cfe6dc');
    R(mx, 20, 62, 100, 4, '#d8c4a0'); R(mx, 82, 24, 4, 62, '#d8c4a0'); R(mx, 46, 52, 4, 10, '#d8c4a0'); R(mx, 20, 62, 4, 18, '#d8c4a0'); R(mx, 116, 38, 40, 3, '#d8c4a0'); R(mx, 120, 62, 4, 28, '#d8c4a0');
    house(38, 38, 18, 13, '#c8715b', '#f2d9b0'); house(63, 10, 22, 12, '#5d8ea0', '#e8d5b5'); house(74, 46, 20, 14, '#b4503c', '#fff0d6');
    R(mx, 78, 41, 12, 3, '#3b2a24'); R(mx, 79, 42, 10, 1, '#ffcf7a');
    for (let i = 0; i < 6; i++) { const x = 8 + (i % 3) * 10, y = 70 + (i >> 1) * 6; R(mx, x, y, 6, 6, '#4f8a5b'); R(mx, x + 2, y + 6, 2, 3, '#6e4a38'); R(mx, x + 1, y + 1, 2, 2, '#7fb37a'); }
    R(mx, 118, 84, 42, 3, '#8a5f47'); for (let i = 0; i < 5; i++) R(mx, 120 + i * 9, 87, 2, 4, '#6e4a38'); R(mx, 138, 94 + Math.sin(t * 2), 12, 3, '#b4503c'); R(mx, 144, 86 + Math.sin(t * 2), 1, 8, '#fff0d6'); R(mx, 144, 86 + Math.sin(t * 2), 5, 5, '#fff0d6');
    R(mx, 148, 20, 7, 24, '#f3e1c4'); for (let i = 0; i < 3; i++) R(mx, 148, 22 + i * 8, 7, 3, '#c8715b'); R(mx, 147, 17, 9, 3, '#3b2a24'); R(mx, 149, 13, 5, 4, t % 3 < 1.2 ? '#fff3b0' : '#8a7a5a');
    R(mx, 88, 56, 2, 4, '#e9577f'); house(96, 72, 16, 12, '#8a5f47', '#e8d5b5'); R(mx, 103, 74, 3, 3, '#ffcf7a'); R(mx, 56, 74, 14, 5, '#e9577f'); R(mx, 56, 79, 14, 4, '#f2c14e'); R(mx, 150, 58, 20, 10, '#e6cf9f');
  }
  function loop(ms) { draw(ms); if (mopen) requestAnimationFrame(loop); }
  function portrait(cv, id) { const p = cv.getContext('2d'); p.clearRect(0, 0, 24, 24); Art.person(p, id, 12, 23, 0); }
  function map() {
    if (!ov) {
      ov = layer('map', '<div class="mapwrap paper"><canvas id="mcv" width="176" height="110"></canvas><div id="pins"></div><b class="here">You are here: the SeaCaf</b><button class="pix sm" id="mclose">BACK TO CAFE</button></div><div id="mcard" class="hidden"><canvas id="mpor" width="24" height="24"></canvas><div><b id="mn"></b><p id="mt"></p><button class="pix sm" id="mnext">NEXT</button></div></div>');
      mx = $('mcv').getContext('2d'); card = $('mcard'); document.body.appendChild(card); $('mclose').onclick = () => { mopen = false; ov.classList.add('hidden'); card.classList.add('hidden'); };
    }
    $('pins').innerHTML = ''; TOWN.filter(p => p.id !== 'cove' || S.items.box).forEach(p => { const b = document.createElement('button'); b.className = 'pin' + (S.places.includes(p.id) ? ' seen' : ''); b.style.left = p.x / MW * 100 + '%'; b.style.top = p.y / MH * 100 + '%'; b.textContent = p.n; b.onclick = () => visit(p); $('pins').appendChild(b); });
    ov.classList.remove('hidden'); if (!mopen) { mopen = true; requestAnimationFrame(loop); } Snd.tone(600, .2, 'triangle');
  }
  function visit(p) {
    let first = !S.places.includes(p.id), lines = first ? p.t : ["Good to see you again. The sea's been kind today."], collect = false, i = 0;
    if (p.id === 'repair') { first = !S.places.includes('repair') && !!S.items.slip; collect = !!S.items.slip && !S.items.box; lines = S.items.box ? ["The box sings beautifully now. Look after it."] : S.items.slip ? p.t : ["I only fix what's been brought in. Come back with a slip."]; }
    card.classList.remove('hidden'); portrait($('mpor'), p.who); Snd.voice(VOICE[p.who]); $('mn').textContent = NAMES[p.who] + ' - ' + p.n;
    const go = () => { $('mnext').classList.add('hidden'); typeInto($('mt'), lines[i], 22, () => { $('mnext').classList.remove('hidden'); $('mnext').textContent = i < lines.length - 1 ? 'NEXT' : 'DONE'; $('mnext').onclick = () => { if (i < lines.length - 1) { i++; go(); } else done(); }; }); };
    const done = () => {
      card.classList.add('hidden');
      if (collect) { S.items.box = true; S.journal.push({ id: 'jbox', who: 'June', text: "Inside the lid, scratched in tiny letters: 'For J. so the rain has a song. - T.'", day: S.day, kind: 'june' }); save(); setTimeout(() => { toast('You collected the music box'); Snd.chime(); }, 400); }
      if (first) { S.places.push(p.id); S.journal.push({ id: 't' + p.id, who: NAMES[p.who], text: p.note, day: S.day, kind: 'town' });
        p.give.forEach(r => { if (!S.known.includes(r)) { S.known.push(r); setTimeout(() => { toast('Recipe learned: ' + RECIPES[r].n); Snd.chime(); }, 400); } });
        save(); renderJournal('town'); if (!nomap) map(); }
    };
    go();
  }
  const SHIRTS = ['#5d8ea0', '#c8715b', '#7fa7a0', '#f2c14e', '#8a6fb0', '#e9577f'], HATS = ['none', 'beret', 'cap', 'sun', 'crown', 'bow'], CATS = ['none', 'bow', 'scarf', 'bell', 'party'];
  function closet(keep) {
    if (!keep) prevFit = { ...S.fit };
    if (!copen) {
      copen = layer('closet', '<div class="paper card closet"><small class="hand">the little closet</small><canvas id="ccv" width="64" height="40"></canvas><p class="lbl">Shirt</p><div class="row" id="cS"></div><p class="lbl">Hat</p><div class="row" id="cH"></div><p class="lbl">Toast\'s style</p><div class="row" id="cC"></div><button class="pix" id="cu">UNDO</button><button class="pix" id="cx">DONE</button></div>');
      $('cu').onclick = () => { Object.assign(S.fit, prevFit); ST.fit = S.fit; save(); closet(true); };
      $('cx').onclick = () => { clearInterval(ctimer); copen.classList.add('hidden'); }; 
    }
    const build = (id, arr, key, sw) => { const row = $(id); row.innerHTML = ''; arr.forEach(v => { const b = document.createElement('button'); b.className = 'chip' + (S.fit[key] === v ? ' on' : ''); if (sw) { const i = document.createElement('i'); i.style.background = v; b.append(i); } else b.textContent = v; b.onclick = () => { S.fit[key] = v; ST.fit = S.fit; save(); Snd.tone(700, .12, 'triangle'); Scene.spawn('spark', 'toast', 3); build(id, arr, key, sw); }; row.appendChild(b); }); };
    build('cS', SHIRTS, 'top', 1); build('cH', HATS, 'hat'); build('cC', CATS, 'cat');
    const p = $('ccv').getContext('2d'); clearInterval(ctimer);
    ctimer = setInterval(() => { const t = performance.now() / 1000; p.fillStyle = '#e3b08f'; p.fillRect(0, 0, 64, 40); p.fillStyle = '#a97a5c'; p.fillRect(0, 36, 64, 4); Art.person(p, 'you', 20, 36, t, { top: S.fit.top, hat: S.fit.hat }); Art.cat(p, 36, 36, t, 0, S.fit.cat); }, 60);
    copen.classList.remove('hidden');
  }
  const DECOR = [['rug', 'Striped rug', 2], ['poster', 'Ocean poster', 4], ['bowl', 'Goldfish bowl', 6], ['lights', 'Fairy lights', 8]];
  function decor() {
    if (!dop) { dop = layer('decor', '<div class="paper card closet"><small class="hand">make it yours</small><p>New things unlock as the journal fills.</p><div class="row" id="dR"></div><button class="pix" id="dx">DONE</button></div>'); $('dx').onclick = () => dop.classList.add('hidden'); }
    const n = S.journal.filter(j => j.kind === 'mem').length, row = $('dR'); row.innerHTML = '';
    DECOR.forEach(([k, name, need]) => { const b = document.createElement('button'), ok = n >= need; b.className = 'chip' + (S.decor[k] ? ' on' : ''); b.textContent = ok ? name : name + ' (' + need + ' memories)'; b.disabled = !ok; b.onclick = () => { S.decor[k] = !S.decor[k]; ST.decor = S.decor; save(); Snd.tone(660, .15, 'triangle'); decor(); }; row.appendChild(b); });
    dop.classList.remove('hidden');
  }
  function chapters() {
    if (!cop) { cop = layer('chmap', '<div class="paper card chm"><small class="hand">the story so far</small><h2 class="cursive">Seabrook Story Map</h2><div id="chl"></div><button class="pix" id="chx">CLOSE</button></div>'); $('chx').onclick = () => cop.classList.add('hidden'); }
    const l = $('chl'); l.innerHTML = '';
    CH.forEach((c, i) => {
      const done = S.day > c.to || S.chap > i, cur = S.day >= c.from && S.day <= c.to, lock = !done && !cur, b = document.createElement('button'), im = new Image();
      b.className = 'node' + (done ? ' done' : cur ? ' cur' : ' lock'); im.src = Art.icon(done ? 'check' : lock ? 'lock' : 'flag', '#2a1d18');
      const sp = document.createElement('span'); sp.innerHTML = `<b>Chapter ${i + 1}: ${c.n}</b><small>Days ${c.from}-${c.to} - ${done ? 'complete. Tap to replay' : cur ? 'you are here' : 'locked'}</small>`; b.append(im, sp); b.disabled = lock;
      b.onclick = () => { if (cur) return cop.classList.add('hidden'); if (confirm('Replay Chapter ' + (i + 1) + '? Your journal and recipes stay.')) { S.replay = S.replay || S.day; S.day = c.from; S.slot = 0; S.cseen = 0; save(); cop.classList.add('hidden'); Scene.leave(); nextVisitor(); } };
      l.appendChild(b);
    });
    cop.classList.remove('hidden');
  }
  function album() {
    if (!aop) { aop = layer('album', '<div class="paper card alb"><small class="hand">little polaroids</small><div id="alg"></div><button class="pix" id="alx">CLOSE</button></div>'); $('alx').onclick = () => aop.classList.add('hidden'); }
    const g = $('alg'); g.innerHTML = ''; const ids = {}; Object.keys(C).forEach(k => ids[C[k].n] = k); Object.keys(NAMES).forEach(k => ids[NAMES[k]] = k);
    S.journal.filter(j => j.kind === 'mem' || j.kind === 'town').forEach(j => { const f = document.createElement('div'), cv = document.createElement('canvas'); f.className = 'pol'; cv.width = cv.height = 24; const p = cv.getContext('2d'); p.fillStyle = '#e3b08f'; p.fillRect(0, 0, 24, 24); Art.person(p, ids[j.who] || 'you', 12, 23, 0); const s = document.createElement('small'); s.textContent = j.text.slice(0, 64) + ' - Day ' + j.day; f.append(cv, s); g.appendChild(f); });
    if (!g.children.length) g.textContent = 'No photos yet. Memories become polaroids here.';
    aop.classList.remove('hidden');
  }
  return { map, closet, decor, chapters, album, visit, nomap: v => { nomap = v; } };
})();
