const Snd = (() => {
  let pitch = 420, ac, on = true, master, go = false, wantRain = false, rainG, mus, step = 0;
  function ctx() { if (!ac) { ac = new (window.AudioContext || window.webkitAudioContext)(); master = ac.createGain(); master.gain.value = on ? 1 : 0; master.connect(ac.destination); } if (ac.state === 'suspended') ac.resume(); return ac; }
  function tone(f, d = .25, type = 'sine', v = .06) {
    if (!on) return;
    try { ctx(); const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; o.connect(g); g.connect(master); g.gain.setValueAtTime(v, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d); o.start(); o.stop(ac.currentTime + d); } catch (e) {}
  }
  function buf(brown) { const b = ac.createBuffer(1, ac.sampleRate * 3, ac.sampleRate), d = b.getChannelData(0); let l = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; if (brown) { l = (l + .02 * w) / 1.02; d[i] = l * 3.5; } else d[i] = w; } return b; }
  function layer(b, type, freq, gain) { const s = ac.createBufferSource(); s.buffer = b; s.loop = true; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; const g = ac.createGain(); g.gain.value = gain; s.connect(f); f.connect(g); g.connect(master); s.start(); return g; }
  const CH = [[130.8, 261.6, 329.6, 392, 493.9], [110, 220, 261.6, 329.6, 392], [87.3, 174.6, 220, 261.6, 329.6], [98, 196, 246.9, 293.7, 392]];
  const MORN = [[261.6, 392, 523.3, 659.3, 784], [196, 293.7, 392, 493.9, 587.3], [220, 329.6, 440, 523.3, 659.3], [174.6, 261.6, 349.2, 440, 523.3]];
  const NIGHT = [[110, 220, 261.6, 329.6, 392], [87.3, 174.6, 220, 261.6, 349.2], [130.8, 261.6, 329.6, 392, 493.9], [98, 196, 246.9, 293.7, 392]];
  let M = { set: CH, ms: 650, p: .75 };
  function note(f, v) {
    const t = ac.currentTime;
    [['triangle', 1, v], ['sine', 2, v * .35]].forEach(([ty, m, vv]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = ty; o.frequency.value = f * m; o.connect(g); g.connect(mus); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vv, t + .03); g.gain.exponentialRampToValueAtTime(.0005, t + 2.4); o.start(t); o.stop(t + 2.5); });
  }
  function music() { /* soft piano-ish arpeggios through a feedback delay */
    mus = ac.createGain(); mus.gain.value = .5; const d = ac.createDelay(1); d.delayTime.value = .42; const fb = ac.createGain(); fb.gain.value = .4;
    mus.connect(master); mus.connect(d); d.connect(fb); fb.connect(d); d.connect(master);
    const tick = () => { if (on) { const ch = M.set[(step >> 3) % 4]; if (step % 8 === 0) note(ch[0], .06); else if (Math.random() < M.p) note(ch[1 + (Math.random() * 4 | 0)] * (Math.random() < .35 ? 2 : 1), .035); step++; } setTimeout(tick, M.ms); }; tick();
  }
  function clink() { if (on && ac) { const f = 1800 + Math.random() * 1500; tone(f, .12, 'sine', .015); setTimeout(() => tone(f * 1.5, .1, 'sine', .01), 70); } setTimeout(clink, 5000 + Math.random() * 8000); }
  function start() { /* cafe murmur + sea + rain beds */
    if (go) return; go = true; try { ctx(); } catch (e) { return; }
    try { startBeds(); } catch (e) {}
  }
  function startBeds() { const br = buf(true), wh = buf(false);
    layer(br, 'lowpass', 420, .07); layer(br, 'bandpass', 900, .035);
    const sea = layer(br, 'lowpass', 300, .05), l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = .12; lg.gain.value = .04; l.connect(lg); lg.connect(sea.gain); l.start();
    rainG = layer(wh, 'highpass', 2500, 0); rainG.gain.value = wantRain ? .03 : 0; music(); clink();
  }
  return {
    tone, start, get: () => on,
    mood: (t, r) => { M = r ? { set: NIGHT, ms: 950, p: .45 } : t === 0 ? { set: MORN, ms: 520, p: .8 } : t === 2 ? { set: NIGHT, ms: 780, p: .6 } : { set: CH, ms: 650, p: .75 }; },
    set: v => { on = v; if (master) master.gain.setTargetAtTime(v ? 1 : 0, ac.currentTime, .2); },
    rain: b => { wantRain = b; if (rainG) rainG.gain.setTargetAtTime(b ? .03 : 0, ac.currentTime, .5); },
    chime: () => [660, 880, 990].forEach((f, i) => setTimeout(() => tone(f, .3), i * 110)),
    blip: () => tone(pitch * (.8 + Math.random() * .5), .06, 'triangle', .04), voice: p => { pitch = p || 420; },
    box: () => [523, 659, 784, 659, 523, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, .5, 'triangle', .05), i * 260)),
    thunder: () => tone(70, 1.2, 'sawtooth', .05)
  };
})();
