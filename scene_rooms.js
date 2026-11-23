/* Interiors: bakery, library, clock repair. */
(() => {
  const room = (id, n, wall, deco, who, talk, back, extra = []) => Walk.reg({
    id, n, w: 340,
    draw(g, cam) {
      const { c, W, R, t } = g, o = -cam; R(c, 0, 0, W, 180, wall); R(c, 0, 128, W, 52, '#a97a5c'); for (let x = 0; x < W; x += 14) R(c, x, 128, 1, 52, '#8a5f47'); R(c, 0, 124, W, 4, '#6e4a38');
      R(c, o + 14, 56, 26, 72, '#6e4a38'); R(c, o + 17, 59, 20, 69, '#c8715b'); R(c, o + 30, 94, 3, 3, '#ffcf7a');
      R(c, o + 150, 36, 40, 34, '#6e4a38'); R(c, o + 153, 39, 34, 28, ['#f6c99f', '#8fbfd6', '#27385a'][Math.min(2, Math.max(0, (typeof Scene !== 'undefined' ? Scene.ST.time : 1)))]); R(c, o + 169, 39, 2, 28, '#6e4a38');
      deco(g, o); R(c, o + 190, 104, 110, 24, '#8a5f47'); R(c, o + 190, 100, 110, 5, '#b98a69');
    },
    spots: () => [{ x: 26, label: 'Leave', go: 'street', at: back }, { x: 235, who, label: 'Talk to ' + NAMES[who], talk }, ...extra]
  });
  room('bakery', "ODETTE'S BAKERY", '#f2d9b0', (g, o) => { for (let i = 0; i < 4; i++) { g.R(g.c, o + 60 + i * 60, 84, 40, 3, '#6e4a38'); for (let j = 0; j < 3; j++) g.R(g.c, o + 66 + i * 60 + j * 11, 77, 9, 7, '#e0a84a'); } }, 'odette', 'bakery', 120);
  room('library', 'SEABROOK LIBRARY', '#e8d5b5', (g, o) => { for (let i = 0; i < 5; i++) { g.R(g.c, o + 54 + i * 40, 20, 34, 60, '#6e4a38'); for (let j = 0; j < 6; j++) g.R(g.c, o + 57 + i * 40, 24 + j * 9, 28, 7, ['#5d8ea0', '#c8715b', '#7fa7a0', '#f2c14e', '#8a6fb0'][(i + j) % 5]); } }, 'wren', 'library', 300, [{ x: 320, label: 'Go upstairs', go: 'upstairs', at: 40 }]);
  room('repair', 'HOLLIS CLOCK REPAIR', '#e8d5b5', (g, o) => { for (let i = 0; i < 5; i++) { const x = o + 60 + i * 45, y = 24 + (i % 2) * 22; g.R(g.c, x, y, 18, 18, '#6e4a38'); g.R(g.c, x + 2, y + 2, 14, 14, '#fff0d6'); g.R(g.c, x + 8, y + 5, 1, 5, '#2a1d18'); g.R(g.c, x + 8, y + 9, 4 + Math.round(Math.sin(g.t + i) * 2), 1, '#2a1d18'); } }, 'hollis', 'repair', 780);
})();
