/* Seabrook street: bakery, library, cafe, market, clock repair, park, and the road to the beach. */
Walk.reg({
  id: 'street', n: 'SEABROOK STREET', w: 1040,
  draw(g, cam) {
    const { c, W, R, t } = g; g.sky(108, cam * .3);
    R(c, 0, 96, W, 14, '#52878a'); for (let x = 0; x < W; x += 6) R(c, x, 98 + Math.round(Math.sin((x + t * 20) / 6)), 3, 1, '#cfe6dc');
    R(c, 0, 108, W, 42, '#8fb572'); R(c, 0, 150, W, 30, '#b4936a'); for (let x = -(cam % 14); x < W; x += 14) R(c, x, 158, 7, 2, '#9b7a54'); R(c, 0, 150, W, 2, '#d8c4a0');
    [[120, 60, 56, '#c8715b', '#f2d9b0', 'BAKERY'], [300, 60, 54, '#5d8ea0', '#e8d5b5', 'LIBRARY'], [480, 74, 60, '#b4503c', '#fff0d6', 'SEACAF'], [640, 50, 34, '#e9577f', '#f2c14e', 'MARKET'], [780, 60, 52, '#8a5f47', '#e8d5b5', 'CLOCKS']].forEach(([x, w, h, r, wl, s]) => g.bld(x - cam, w, h, r, wl, s));
    for (let i = 0; i < 4; i++) { const x = 18 + i * 22 - cam; R(c, x + 3, 122, 3, 28, '#6e4a38'); R(c, x - 3, 106, 15, 18, '#4f8a5b'); R(c, x, 103, 9, 6, '#7fb37a'); }
    for (let x = 60; x < 1040; x += 160) { R(c, x - cam, 120, 2, 30, '#3b2a24'); R(c, x - cam - 3, 117, 8, 4, '#ffcf7a'); }
    c.fillStyle = '#3b2a24'; c.font = '5px "Press Start 2P",monospace'; c.fillText('TO THE BEACH >', 940 - cam, 140);
  },
  spots: () => [
    { x: 40, label: 'Walk into Gull Park', go: 'park', at: 30 },
    { x: 120, label: 'Enter the bakery', go: 'bakery' }, { x: 300, label: 'Enter the library', go: 'library' },
    { x: 480, label: 'Go back into the SeaCaf', exit: 1 },
    { x: 640, who: 'marta', label: 'Talk to Marta (market)', talk: 'market' }, { x: 780, label: 'Enter clock repair', go: 'repair' },
    { x: 560, who: 'pip', walk: 50, label: 'Chat with Pip', run: () => Walk.say('pip', 'Pip', ["Eleven mailboxes, nine dogs, one very lost courier.", "Tell me if you spot a house that moved. Happens more than you'd think."]) },
    { x: 380, who: 'mila', walk: 30, label: 'Chat with Mila', run: () => Walk.say('mila', 'Mila', ["I'm drawing the street. Look, the lamps have faces.", "Don't tell the lamps."]) },
    { x: 960, label: 'Walk to the beach', go: 'beach', at: 30 }
  ]
});
