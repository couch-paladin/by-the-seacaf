/* Lighthouse interior: climb the stairs to the lamp room where Theo works. */
Walk.reg({
  id: 'lighthouse', n: 'THE LIGHTHOUSE', w: 460, rise: x => Math.max(0, Math.min(1, (x - 60) / 300)) * 90,
  draw(g, cam) {
    const { c, W, R, t } = g, o = -cam; R(c, 0, 0, W, 180, '#4a4f5c'); for (let y = 0; y < 180; y += 10) for (let x = (y % 20) / 2; x < W; x += 20) R(c, x, y, 18, 1, '#3b4050');
    for (let i = 0; i < 3; i++) { R(c, o + 80 + i * 110, 30, 6, 30, '#27385a'); R(c, o + 81 + i * 110, 32 + Math.round(Math.sin(t + i)) , 1, 6, '#ffe9b8'); }
    R(c, 0, 152, W, 28, '#2f3340'); for (let i = 0; i < 31; i++) { const y = 152 - i * 3; R(c, o + 60 + i * 10, y, 10, 152 - y + 3, i % 2 ? '#6b6f7e' : '#5c606f'); }
    R(c, o + 360, 62, 100, 6, '#8a8f9e'); R(c, o + 380, 20, 44, 40, '#ffe08a'); R(c, o + 386, 26, 32, 28, '#fff3b0'); R(c, o + 398, 4, 8, 16, '#3b2a24');
    const sw = Math.sin(t * 1.2); c.fillStyle = 'rgba(255,240,170,.25)'; c.beginPath(); c.moveTo(o + 402, 40); c.lineTo(o + 402 - 200 * sw, 0); c.lineTo(o + 402 - 200 * sw, 90); c.fill();
  },
  spots: () => [
    { x: 30, label: 'Back to the beach', go: 'beach', at: 850 }, { x: 395, who: 'theo', label: 'Talk to Theo', talk: 'lighthouse' },
    { x: 425, label: S.signal ? 'Signal the cafe window' : 'Look through the great lens', run: () => S.signal ? act('signal') : toast('Far below, one small window glows. Yours.') }
  ]
});
