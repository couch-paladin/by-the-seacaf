/* Gull Park: bench, pond, tulips and Basil. */
Walk.reg({
  id: 'park', n: 'GULL PARK', w: 520,
  draw(g, cam) {
    const { c, W, R, t } = g; g.sky(100, cam * .3); R(c, 0, 100, W, 80, '#8fb572'); R(c, 0, 150, W, 30, '#7aa361'); R(c, 0, 150, W, 6, '#d8c4a0');
    for (let i = 0; i < 9; i++) { const x = 30 + i * 62 - cam; R(c, x + 4, 112, 4, 38, '#6e4a38'); R(c, x - 6, 84 + (i % 3) * 4, 24, 28, '#4f8a5b'); R(c, x - 2, 80 + (i % 3) * 4, 16, 8, '#7fb37a'); }
    R(c, 330 - cam, 126, 96, 16, '#52878a'); for (let i = 0; i < 4; i++) R(c, 340 + i * 20 - cam, 130 + Math.round(Math.sin(t * 2 + i)), 8, 1, '#cfe6dc');
    R(c, 190 - cam, 136, 34, 4, '#8a5f47'); R(c, 192 - cam, 140, 3, 10, '#6e4a38'); R(c, 218 - cam, 140, 3, 10, '#6e4a38'); R(c, 190 - cam, 128, 34, 3, '#8a5f47');
    for (let i = 0; i < 16; i++) R(c, 420 + (i % 8) * 8 - cam, 142 + (i >> 3) * 6, 3, 3, ['#e9577f', '#f2c14e', '#fff0d6'][i % 3]);
    for (let i = 0; i < 3; i++) R(c, ((t * 20 + i * 90) % (W + 40)) - 20, 40 + i * 12, 4, 1, '#fff');
  },
  spots: () => [
    { x: 20, label: 'Back to the street', go: 'street', at: 60 }, { x: 205, who: 'basil', label: 'Talk to Basil', talk: 'park' },
    { x: 340, label: 'Feed the gulls', run: () => { Snd.tone(900, .1, 'square', .02); toast('The gulls are unimpressed, then thrilled.'); } },
    { x: 450, label: 'Smell the tulips', run: () => toast('They smell like spring and slightly of Basil.') }
  ]
});
