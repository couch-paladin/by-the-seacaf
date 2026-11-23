/* Library upstairs: June's reading nook. */
Walk.reg({
  id: 'upstairs', n: 'LIBRARY ATTIC', w: 340,
  draw(g, cam) {
    const { c, W, R, t } = g, o = -cam; R(c, 0, 0, W, 180, '#d9bfa0'); R(c, 0, 128, W, 52, '#8a5f47'); for (let x = 0; x < W; x += 14) R(c, x, 128, 1, 52, '#6e4a38');
    R(c, o + 140, 30, 50, 50, '#6e4a38'); R(c, o + 144, 34, 42, 42, ['#f6c99f', '#8fbfd6', '#27385a'][Scene.ST.time]); R(c, o + 164, 34, 2, 42, '#6e4a38'); R(c, o + 144, 54, 42, 2, '#6e4a38');
    R(c, o + 210, 96, 40, 34, '#b4503c'); R(c, o + 206, 92, 10, 38, '#8a3a2c'); R(c, o + 244, 92, 10, 38, '#8a3a2c'); R(c, o + 70, 110, 20, 18, '#6e4a38'); for (let i = 0; i < 4; i++) R(c, o + 72, 112 + i * 4, 16, 3, ['#5d8ea0', '#c8715b', '#f2c14e', '#7fa7a0'][i]);
    R(c, o + 280, 60, 2, 68, '#3b2a24'); R(c, o + 272, 56, 18, 6, '#ffcf7a'); const gl = c.createRadialGradient(o + 281, 66, 2, o + 281, 66, 40); gl.addColorStop(0, 'rgba(255,207,122,.4)'); gl.addColorStop(1, 'rgba(255,207,122,0)'); c.fillStyle = gl; c.fillRect(o + 240, 30, 80, 80);
  },
  spots: () => [
    { x: 26, label: 'Go back downstairs', go: 'library', at: 320 },
    { x: 80, label: "Open June's cookbook", run: () => { Walk.say('wren', 'Wren', ["Margin note, June's handwriting: 'Feed people first. The talking comes later.'"]); if (!S.journal.find(j => j.id === 'jbook')) { S.journal.push({ id: 'jbook', who: 'June', text: "Cookbook margin: 'Feed people first. The talking comes later.'", day: S.day, kind: 'june' }); renderJournal('june'); save(); } } },
    { x: 230, label: "Sit in June's chair", run: () => { toast('The cushion still remembers the shape of her.'); Snd.tone(330, .4, 'triangle', .04); } },
    { x: 165, label: 'Look out the window', run: () => toast('You can see the lighthouse. And one small light, the cafe.') }
  ]
});
