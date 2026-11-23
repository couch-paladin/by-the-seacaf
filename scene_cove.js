/* The secret cove: June and Theo's quiet place. */
Walk.reg({
  id: 'cove', n: 'THE SECRET COVE', w: 400,
  draw(g, cam) {
    const { c, W, R, t } = g, o = -cam; R(c, 0, 0, W, 180, '#1f3a45'); R(c, 0, 0, W, 24, '#16282f'); for (let i = 0; i < 9; i++) { const x = i * 46 + (i % 2) * 14; R(c, o + x, 0, 8, 22 + (i % 3) * 10, '#2d4a55'); }
    R(c, 0, 152, W, 28, '#e6cf9f'); R(c, o + 120, 126, 180, 26, '#2f7a8a'); for (let i = 0; i < 8; i++) R(c, o + 126 + i * 22, 132 + Math.round(Math.sin(t * 2 + i) * 2), 10, 1, '#9fe0e8');
    const gl = c.createRadialGradient(o + 210, 140, 4, o + 210, 140, 90); gl.addColorStop(0, 'rgba(120,230,240,.35)'); gl.addColorStop(1, 'rgba(120,230,240,0)'); c.fillStyle = gl; c.fillRect(o + 100, 70, 220, 110);
    R(c, o + 320, 118, 22, 34, '#4a4f5c'); R(c, o + 328, 106, 2, 12, '#3b2a24'); R(c, o + 324, 100, 10, 8, '#ffcf7a');
    c.fillStyle = '#ffe9b8'; c.font = '5px "Press Start 2P",monospace'; c.fillText('J + T', o + 60, 110);
  },
  spots: () => [
    { x: 26, label: 'Back to the beach', go: 'beach', at: 120 }, { x: 250, who: 'theo', label: 'Talk to Theo', talk: 'cove' },
    { x: 70, label: 'Read the carving', run: () => Walk.say('you', 'You', ["Scratched into the rock: J + T, and under it, a tiny cherry.", "Some secrets are just two people and a cove."]) },
    { x: 345, label: 'Light the lantern', run: () => { Snd.box(); toast(S.items.box ? 'The music box plays. The water glows in time.' : 'A small light. The water answers.'); } }
  ]
});
