/* All art is drawn in code: no emoji, no image files. */
const Art = (() => {
  const R = (c, x, y, w, h, f) => { c.fillStyle = f; c.fillRect(Math.round(x), Math.round(y), w, h); };
  const INK = '#2a1d18';
  const LOOK = {
    mila: { skin: '#f2c9a0', hair: '#6b3f2a', top: '#f2c14e', bot: '#3f6f80', h: 14, pig: 1, hood: '#f2c14e', coat: 1 },
    elliot: { skin: '#e0ae86', hair: '#9aa0a6', top: '#2b3a4a', bot: '#222c38', h: 21, beard: '#aab0b6', cap: '#1f2a36' },
    iris: { skin: '#f0c4a0', hair: '#c8715b', top: '#7fa7a0', bot: '#5d6f8c', h: 19, beret: '#b4503c' },
    odette: { skin: '#f5cfae', hair: '#4a3328', top: '#fff0d6', bot: '#8a5f47', h: 19, baker: 1 },
    theo: { skin: '#d9a47a', hair: '#e8e8e8', top: '#b04a3a', bot: '#3b3a50', h: 21, beard: '#e8e8e8', cap: '#b04a3a' },
    you: { skin: '#f2c9a0', hair: '#3b2a24', top: '#5d8ea0', bot: '#3b2a24', h: 20, apron: '#fff0d6' },
    wren: { skin: '#e8b890', hair: '#2d2d4a', top: '#8a6fb0', bot: '#3b3a50', h: 19, beret: '#5d6f8c' },
    pip: { skin: '#c98f68', hair: '#8a4b2a', top: '#b04a3a', bot: '#3b3a50', h: 17, cap: '#f2c14e' },
    kalis: { skin: '#b97c55', hair: '#2a1d18', top: '#f4ecd8', bot: '#3b3a50', h: 21, baker: 1, apron: '#4f8a5b' },
    sol: { skin: '#d9a47a', hair: '#4a3328', top: '#e0a84a', bot: '#3b3a50', h: 19, cap: '#c8715b' },
    marta: { skin: '#e8b890', hair: '#8a4b2a', top: '#e9577f', bot: '#6e4a38', h: 19, beret: '#f2c14e' },
    hollis: { skin: '#e0ae86', hair: '#9aa0a6', top: '#6e4a38', bot: '#3b3a50', h: 20, beard: '#9aa0a6', cap: '#6e4a38' },
    basil: { skin: '#d9a47a', hair: '#d8d8d8', top: '#4f8a5b', bot: '#6e4a38', h: 20, beard: '#d8d8d8', cap: '#c9b26a' }
  };
  function person(c, k, cx, fy, t, o = {}) {
    const T = o.top || LOOK[k].top;
    const L = LOOK[k], sm = L.h < 16, w = sm ? 7 : 9, hh = sm ? 6 : 7, lg = 5, bh = L.h - hh - lg, hw = w - 1;
    const y = Math.round(fy - L.h + Math.sin(t * 2 + cx) * .7 + (o.dy || 0)), x = Math.round(cx - w / 2), hx = x + 1;
    const wl = o.walk ? Math.round(Math.sin(t * 12) * 1.5) : 0;
    R(c, x + 1 + wl, fy - lg, 3, lg, L.bot); R(c, x + w - 4 - wl, fy - lg, 3, lg, L.bot); R(c, x + wl, fy - 1, 4, 1, INK); R(c, x + w - 4 - wl, fy - 1, 4, 1, INK);
    R(c, x, y + hh, w, bh, T);
    if (L.apron) R(c, x + 2, y + hh + 2, w - 4, bh - 2, L.apron);
    if (L.coat) { R(c, x + 3, y + hh, 1, bh, '#d9a63a'); R(c, x, y + hh + bh - 1, w, 1, '#d9a63a'); }
    const sip = o.sip && Math.sin(t * .9) > .7, up = sip ? 3 : 0;
    R(c, x - 1, y + hh + 1, 2, bh - 2, T); R(c, x + w - 1, y + hh + 1 - up, 2, bh - 2, T);
    R(c, x - 1, y + hh + bh - 2, 2, 2, L.skin); R(c, x + w - 1, y + hh + bh - 2 - up, 2, 2, L.skin);
    if (o.cup) R(c, x + w + 1, y + hh + bh - 4 - up, 3, 3, '#fff0d6');
    if (L.hood) { R(c, hx - 1, y - 1, hw + 2, hh + 1, L.hood); }
    R(c, hx, y, hw, hh, L.skin);
    R(c, hx, y, hw, 2, L.hair); R(c, hx, y + 1, 1, 3, L.hair); R(c, hx + hw - 1, y + 1, 1, 3, L.hair);
    if (L.pig) { R(c, hx - 2, y + 3, 2, 4, L.hair); R(c, hx + hw, y + 3, 2, 4, L.hair); }
    if (t % 4 < 3.85) { R(c, hx + 1, y + hh - 3, 1, 1, INK); R(c, hx + hw - 2, y + hh - 3, 1, 1, INK); }
    R(c, hx, y + hh - 2, 1, 1, '#e9917f'); R(c, hx + hw - 1, y + hh - 2, 1, 1, '#e9917f');
    if (L.beard) R(c, hx, y + hh - 2, hw, 2, L.beard);
    if (L.cap) { R(c, hx - 1, y - 2, hw + 2, 3, L.cap); R(c, hx - 2, y + 1, hw + 3, 1, INK); }
    if (L.beret) { R(c, hx - 1, y - 2, hw + 2, 3, L.beret); R(c, hx + 2, y - 3, 2, 1, L.beret); }
    if (L.baker) R(c, hx - 1, y - 4, hw + 2, 4, '#fff');
    const H = o.hat;
    if (H === 'beret') { R(c, hx - 1, y - 2, hw + 2, 3, '#c8715b'); R(c, hx + 2, y - 3, 2, 1, '#c8715b'); }
    if (H === 'cap') { R(c, hx - 1, y - 2, hw + 2, 3, '#5d8ea0'); R(c, hx - 2, y + 1, hw + 3, 1, INK); }
    if (H === 'sun') { R(c, hx - 3, y - 1, hw + 6, 1, '#e9c98a'); R(c, hx, y - 3, hw, 3, '#e9c98a'); R(c, hx, y - 1, hw, 1, '#c8715b'); }
    if (H === 'crown') { R(c, hx, y - 3, hw, 3, '#ffcf7a'); R(c, hx, y - 4, 1, 1, '#ffcf7a'); R(c, hx + 3, y - 4, 1, 1, '#ffcf7a'); R(c, hx + hw - 1, y - 4, 1, 1, '#ffcf7a'); }
    if (H === 'bow') { R(c, hx + hw - 3, y - 1, 4, 3, '#e9577f'); R(c, hx + hw - 2, y, 2, 1, '#fff'); }
  }
  function cat(c, x, y, t, purr, acc) {
    const b = Math.sin(t * 1.6) * .5, p = purr ? Math.sin(t * 40) * .6 : 0, O = '#e08a3c', D = '#b86a28';
    R(c, x, y - 7 + b, 13, 7 - b, O); R(c, x + 2, y - 7 + b, 1, 5, D); R(c, x + 6, y - 7 + b, 1, 5, D); R(c, x + 9, y - 7 + b, 1, 5, D);
    R(c, x + 10, y - 9 + b + p, 6, 6, O); R(c, x + 10, y - 11 + b + p, 2, 2, O); R(c, x + 14, y - 11 + b + p, 2, 2, O);
    R(c, x + 11, y - 6 + b + p, 2, 1, INK); R(c, x + 14, y - 6 + b + p, 1, 1, INK); R(c, x + 13, y - 5 + b + p, 1, 1, '#e9917f');
    R(c, x + 10, y - 1, 3, 1, '#fff0d6');
    if (acc === 'bow') { R(c, x + 9, y - 4 + b, 3, 2, '#e9577f'); R(c, x + 12, y - 4 + b, 3, 2, '#e9577f'); }
    if (acc === 'scarf') { R(c, x + 9, y - 4 + b, 7, 2, '#5d8ea0'); R(c, x + 9, y - 2 + b, 2, 3, '#5d8ea0'); }
    if (acc === 'bell') { R(c, x + 9, y - 4 + b, 6, 1, '#c8715b'); R(c, x + 12, y - 3 + b, 2, 2, '#ffcf7a'); }
    if (acc === 'party') { R(c, x + 12, y - 14 + b + p, 2, 3, '#e9577f'); R(c, x + 11, y - 11 + b + p, 4, 2, '#f2c14e'); }
    for (let i = 0; i < 6; i++) R(c, x - 1 - i, y - 2 - Math.round(Math.sin(t * 3 + i * .7) * (purr ? 2 : 1)), 1, 2, O);
  }
  function machine(c, x, y, t) {
    R(c, x, y - 16, 14, 16, '#5d8ea0'); R(c, x, y - 16, 14, 3, '#3f6a7a'); R(c, x + 2, y - 11, 4, 3, '#fff0d6'); R(c, x + 9, y - 11, 3, 3, '#e9917f'); R(c, x + 3, y - 5, 8, 5, '#2a3a44');
    for (let i = 0; i < 3; i++) R(c, x + 6 + Math.sin(t * 3 + i * 2) * 1.5, y - 19 - ((t * 9 + i * 4) % 10), 1, 2, 'rgba(255,255,255,.55)');
  }
  function plant(c, x, y, t, g) {
    const s = Math.sin(t * 1.5) * 1.2, k = g > 0 ? 2 : 0;
    R(c, x - 5, y - 8, 10, 8, '#b4503c'); R(c, x - 6, y - 9, 12, 2, '#8a3a2c');
    for (let i = 0; i < 5; i++) { R(c, x - 8 + i * 4 + s * (i % 2 ? -1 : 1), y - 14 - (i % 3) * 3 - k, 3, 6 + k, '#4f8a5b'); R(c, x - 7 + i * 4 + s, y - 16 - (i % 3) * 3 - k, 2, 3, '#7fb37a'); }
  }
  const PG = {
    heart: ['.#.#.', '#####', '.###.', '..#..'], spark: ['..#..', '..#..', '#####', '..#..', '..#..'],
    note: ['..##', '..#.', '..#.', '##..', '##..'], drop: ['.#.', '###', '###', '.#.'], paw: ['#.#.#', '.###.', '.###.']
  };
  function grid(c, rows, x, y, col) { rows.forEach((r, j) => [...r].forEach((ch, i) => ch !== '.' && R(c, x + i, y + j, 1, 1, col))); }
  function particle(c, k, x, y, col) { grid(c, PG[k], Math.round(x), Math.round(y), col); }
  const IC = {
    cat: ['#.....#.', '##...##.', '#######.', '#.#.#.#.', '#######.', '.#####..', '.#...#..', '........'],
    broom: ['......#.', '.....#..', '....#...', '...#....', '..###...', '.#####..', '#######.', '#.#.#.#.'],
    drop: ['...#....', '...#....', '..###...', '.#####..', '.#####..', '.#####..', '..###...', '........'],
    note: ['...####.', '...#..#.', '...#..#.', '...#....', '.###....', '####....', '.##.....', '........'],
    window: ['########', '#..#...#', '#..#...#', '########', '#..#...#', '#..#...#', '########', '........'],
    candle: ['...#....', '..###...', '...#....', '..###...', '..###...', '..###...', '..###...', '.#####..'],
    lamp: ['..####..', '.######.', '########', '...##...', '...##...', '...##...', '..####..', '........'],
    book: ['.######.', '##..#.#.', '##..#.#.', '##..#.#.', '##..#.#.', '.######.', '........', '........'],
    cup: ['.#####..', '#cccc###', '#cccc#.#', '#cccc###', '.####...', '........', '........', '........'],
    sound: ['....#...', '...##.#.', '###.#.#.', '###.#.#.', '###.#.#.', '...##.#.', '....#...', '........']
  };
  const PC = { g: '#e0a84a', b: '#8a5230', w: '#fff0d6', p: '#e9917f', r: '#b4503c', y: '#f2c14e', n: '#4f8a5b' };
  Object.assign(IC, {
    flag: ['#.####..', '#.#..##.', '#.####..', '#.......', '#.......', '#.......', '#.......', '###.....'],
    check: ['........', '......#.', '.....##.', '#...##..', '##.##...', '.###....', '..#.....', '........'],
    lock: ['..####..', '.#....#.', '.#....#.', '########', '##....##', '##.##.##', '##.##.##', '########'],
    photo: ['........', '.##.....', '########', '#.####.#', '#.#..#.#', '#.####.#', '########', '........'],
    idli: ['..####..', '.#wwww#.', '#wwwwww#', '.######.', '..####..', '.#wwww#.', '#wwwwww#', '.######.'],
    dosa: ['........', '#gggggg#', 'gggggggg', 'ggbggbgg', 'gggggggg', '#gggggg#', '..####..', '........'],
    vada: ['..####..', '.#gggg#.', '#gg##gg#', '#g#..#g#', '#gg##gg#', '.#gggg#.', '..####..', '........'],
    payasam: ['........', '.#yyyy#.', '#yyyyyy#', '#ypyyyy#', '.#yyyy#.', '..####..', '.######.', '........'],
    pie: ['..####..', '.#gggg#.', '#gggggg#', '#grgrgr#', '#gggggg#', '.#gggg#.', '..####..', '........'],
    menu: ['........', '########', '........', '########', '........', '########', '........', '........'],
    door: ['..####..', '.#....#.', '.#....#.', '.#..#.#.', '.#....#.', '.#....#.', '.######.', '........'],
    frame: ['########', '#......#', '#..##..#', '#.####.#', '#.####.#', '#......#', '########', '........'],
    hanger: ['...##...', '..#..#..', '...#....', '..###...', '.#...#..', '#######.', '........', '........'],
    map: ['########', '#..#...#', '#.##.#.#', '#..#.#.#', '#.##.#.#', '#..#...#', '########', '........'],
    croissant: ['..#gg#..', '.#gggg#.', '#gggggg#', '#g#gg#g#', '.#gggg#.', '..####..', '........', '........'],
    cookie: ['..####..', '.#gggg#.', '#gbggbg#', '#gggggg#', '#gbggbg#', '.#gggg#.', '..####..', '........'],
    roll: ['..####..', '.#gggg#.', '#gbbbbg#', '#gb##bg#', '#gbbbbg#', '.#gggg#.', '..####..', '........'],
    muffin: ['..####..', '.#bbbb#.', '#bbpbbb#', '#bbbbbb#', '.#wrwr#.', '.#wrwr#.', '..####..', '........'],
    sandwich: ['........', '.######.', '#nnnnnn#', '#rrrrrr#', '#yyyyyy#', '#gggggg#', '.######.', '........']
  });
  const cache = {};
  function icon(n, col = '#fff0d6', liq) {
    const key = n + col + liq; if (cache[key]) return cache[key];
    const k = document.createElement('canvas'); k.width = k.height = 8; const x = k.getContext('2d');
    IC[n].forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = ch === 'c' ? liq : (PC[ch] || col); x.fillRect(i, j, 1, 1); } }));
    return (cache[key] = k.toDataURL());
  }
  return { R, person, cat, machine, plant, particle, icon, INK };
})();
