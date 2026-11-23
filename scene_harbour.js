/* Seabrook Harbour: dock, boats and Elliot. */
Walk.reg({
  id: 'harbour', n: 'SEABROOK HARBOUR', w: 620,
  draw(g, cam) {
    const { c, W, R, t } = g; g.sky(88, cam * .3); R(c, 0, 88, W, 70, '#52878a');
    for (let k = 0; k < 5; k++) for (let x = 0; x < W; x += 4) R(c, x, 96 + k * 11 + Math.round(Math.sin((x + t * (12 + k * 4) + cam) / 6) * 1.5), 2, 1, k % 2 ? '#a5cbb5' : '#cfe6dc');
    for (let i = 0; i < 3; i++) { const x = 160 + i * 170 - cam, b = Math.round(Math.sin(t * 1.5 + i) * 1.5); R(c, x, 118 + b, 50, 8, ['#b4503c', '#5d8ea0', '#8a5f47'][i]); R(c, x + 24, 78 + b, 2, 40, '#6e4a38'); R(c, x + 26, 82 + b, 18, 30, '#fff0d6'); }
    R(c, 0, 146, W, 34, '#a97a5c'); for (let x = -(cam % 14); x < W; x += 14) R(c, x, 146, 1, 34, '#8a5f47'); R(c, 0, 144, W, 3, '#6e4a38');
    for (let i = 0; i < 5; i++) R(c, 60 + i * 120 - cam, 126, 4, 20, '#6e4a38'); R(c, 480 - cam, 130, 18, 16, '#8a5f47'); R(c, 500 - cam, 136, 12, 10, '#a97a5c');
  },
  spots: () => [
    { x: 20, label: 'Back to the beach', go: 'beach', at: 430 }, { x: 300, who: 'elliot', label: 'Talk to Elliot', talk: 'harbour' },
    { x: 420, label: 'Watch the boats', run: () => toast('Three boats, one empty seat, and a very calm sea.') },
    { x: 520, label: 'Mend the nets', run: () => { Snd.tone(300, .1, 'triangle'); toast('Knots, loops, patience. Kalis would approve.'); } }
  ]
});
