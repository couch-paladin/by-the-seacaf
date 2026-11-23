/* The beach: dock, shells, sandcastles, picnics with Kalis, the lighthouse and the secret cove. */
(() => {
  const KB = [
    { l: ["Picnic first. I made dosa. Don't judge the crispness, the sea air is humid.", "Sit. Eat. The lanterns come on soon."], m: "Kalis and you ate dosa on the beach as the lanterns came on." },
    { l: ["I built you a sandcastle. It's a bakery, obviously.", "The tide's coming. Let's pretend it's a very polite flood."], m: "Kalis built a sandcastle bakery. The tide accepted it, politely." },
    { l: ["Sol's playing the Toast song. Dance with me. Badly. I insist.", "Everyone's watching. I find I don't mind."], m: "You and Kalis danced badly while Sol played the Toast song." },
    { l: ["I used to think home was a recipe. Then it was a place. Now it's you.", "Naan unnai kaadhalikkiren. It means I love you. It sounds better in Tamil."], m: "Kalis told you he loved you in Tamil, on the beach, at sunset." }
  ];
  const kalis = () => {
    const i = S.k4 || 0; if (S.day < 13 || i >= KB.length) return Walk.say('kalis', 'Kalis', [S.day < 13 ? "Hand in hand, sea in front. Nothing's missing." : "We could stay until the stars come out. Let's."]);
    Walk.say('kalis', 'Kalis', KB[i].l, () => { S.k4 = i + 1; S.journal.push({ id: 'kb' + i, who: 'Kalis', text: KB[i].m, day: S.day, kind: 'mem' }); renderJournal('mem', 'kb' + i); save(); toast("A new page appeared in June's Journal"); Snd.chime(); });
  };
  const shells = () => {
    S.shells = (S.shells || 0) + 1; toast('You found a shell (' + S.shells + ')'); Snd.tone(900, .15, 'triangle');
    if (S.shells === 3 && !S.journal.find(j => j.id === 'jshell')) { S.journal.push({ id: 'jshell', who: 'June', text: "Shells for the window ledge, three at a time. My rule.", day: S.day, kind: 'june' }); setTimeout(() => toast("A note in June's handwriting"), 1500); renderJournal('june'); } save();
  };
  const castle = () => Walk.say(S.dating ? 'kalis' : 'you', S.dating ? 'Kalis' : 'You', [S.dating ? "I'll do the towers. You do the moat. The tide does the rest." : "You build a tiny castle. Toast would approve of the throne."]);
  Walk.reg({
    id: 'beach', n: 'THE BEACH', w: 920,
    draw(g, cam) {
      const { c, W, R, t } = g; g.sky(96, cam * .3);
      R(c, 0, 90, W, 44, '#52878a'); for (let k = 0; k < 4; k++) for (let x = 0; x < W; x += 4) R(c, x, 98 + k * 9 + Math.round(Math.sin((x + t * (14 + k * 5) + cam) / 6) * 1.5), 2, 1, k % 2 ? '#a5cbb5' : '#cfe6dc');
      R(c, 0, 132, W, 48, '#e6cf9f'); R(c, 0, 132, W, 2, '#f3e4bd'); for (let x = 0; x < W; x += 9) R(c, (x * 7 + 3) % W, 140 + (x % 5) * 7, 1, 1, '#c9b27a');
      R(c, 400 - cam, 118, 70, 5, '#8a5f47'); for (let i = 0; i < 4; i++) R(c, 404 + i * 20 - cam, 123, 3, 12, '#6e4a38'); R(c, 470 - cam, 108 + Math.round(Math.sin(t * 2)), 22, 6, '#b4503c');
      for (let i = 0; i < Scene.ST.beach * 2 + 1; i++) { const x = 120 + i * 110 - cam; R(c, x, 120, 18, 4, ['#e9577f', '#5d8ea0', '#f2c14e'][i % 3]); R(c, x + 8, 124, 1, 14, '#6e4a38'); R(c, x + 3, 142, 12, 3, '#fff0d6'); R(c, x + 5, 138, 2, 4, '#f2c9a0'); }
      const lx = 860 - cam; R(c, lx - 8, 40, 16, 94, '#f3e1c4'); for (let i = 0; i < 4; i++) R(c, lx - 8, 48 + i * 22, 16, 6, '#c8715b'); R(c, lx - 10, 34, 20, 6, '#3b2a24'); R(c, lx - 5, 26, 10, 8, t % 4 < 1.5 ? '#fff3b0' : '#8a7a5a');
      if (S.items && S.items.box) { R(c, 108 - cam, 112, 24, 22, '#3b2a24'); R(c, 112 - cam, 116, 16, 18, '#16202e'); }
      if (S.dating) { R(c, 620 - cam, 148, 60, 3, '#c8715b'); R(c, 622 - cam, 146, 14, 3, '#fff0d6'); }
    },
    spots: () => [
      { x: 20, label: 'Back to the street', go: 'street', at: 940 }, ...(S.items.box ? [{ x: 120, label: 'Slip into the secret cove', go: 'cove', at: 30 }] : []),
      { x: 220, who: 'sol', label: 'Talk to Sol', talk: 'beach' }, { x: 320, label: 'Look for shells', run: shells },
      { x: 430, label: 'Walk out to the harbour', go: 'harbour', at: 30 }, { x: 540, label: 'Build a sandcastle', run: castle },
      ...(S.dating ? [{ x: 650, who: 'kalis', label: 'Sit with Kalis', run: kalis }] : []), { x: 850, label: 'Climb the lighthouse', go: 'lighthouse', at: 30 }
    ]
  });
})();
