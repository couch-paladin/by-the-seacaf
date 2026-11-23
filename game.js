const $ = id => document.getElementById(id), ST = Scene.ST, KEY = 'seacaf3';
const DEF = { day: 1, slot: 0, visits: {}, journal: [], acts: {}, items: {}, letters: [], sent: [], trust: {}, signal: false, sound: true, fit: { top: '#5d8ea0', hat: 'none', cat: 'none' }, known: [], places: [], decor: {}, perfect: 0, boxGiven: false, chap: 0, cseen: 0, dating: false, replay: null };
let S = (() => { try { return { ...DEF, ...JSON.parse(localStorage.getItem(KEY)) }; } catch (e) { return { ...DEF }; } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const TIMES = ['Morning', 'Afternoon', 'Evening'], WX = ['sunny', 'rainy', 'cloudy'];
let uh = [], gen = 0, cur, drink, extra, food, typer, tab = 'mem', tt, stormSeen = false;
Scene.init($('cv')); Snd.set(S.sound);
const started = () => S.journal.length || S.day > 1;
$('bStart').textContent = started() ? 'CONTINUE YOUR STORY' : 'START YOUR STORY';
const img = (n, c, l) => { const i = new Image(); i.src = Art.icon(n, c, l); return i; };

function typeInto(el, text, speed, done) {
  clearInterval(el._t); let i = 0; el.textContent = '';
  el._t = setInterval(() => { el.textContent = text.slice(0, ++i); if (i % 3 === 0) Snd.blip(); if (i >= text.length) { clearInterval(el._t); done && done(); } }, speed || 24);
}
function toast(m) { const t = $('msg'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800); }
function overlay(top, title, text, btn, fn) { $('oT').textContent = top; $('oH').textContent = title; $('oP').textContent = text; $('oB').textContent = btn; $('oB').onclick = () => { $('ov').classList.add('hidden'); fn(); }; $('ov').classList.remove('hidden'); }

/* menu + intro */
$('bStart').onclick = () => { try { Snd.start(); Snd.chime(); } catch (e) {} if (started()) return enter(); $('menu').classList.add('hidden'); $('intro').classList.remove('hidden'); typeInto($('letter'), LETTER, 22); };
$('bReset').onclick = () => { if (confirm('Start over? Your journal will be erased.')) { localStorage.removeItem(KEY); location.reload(); } };
$('bOpen').onclick = enter;
function enter() { ['menu', 'intro'].forEach(i => $(i).classList.add('hidden')); $('ui').classList.remove('hidden'); ST.fit = S.fit; buildUI(); setScene(); renderJournal(); nextVisitor(); }

/* UI */
const ACTS = [['toast', 'cat', 'Pet Toast'], ['tidy', 'broom', 'Tidy up'], ['plants', 'drop', 'Water plants'], ['music', 'note', 'Music box'], ['window', 'window', 'Open window'], ['candle', 'candle', 'Light candle'], ['signal', 'lamp', 'Signal lighthouse'], ['closet', 'hanger', 'Closet'], ['map', 'door', 'Explore town'], ['decor', 'frame', 'Decorate'], ['chapters', 'flag', 'Story map'], ['album', 'photo', 'Album']];
const SEASONS = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER']; let festSeen = 0, pt;
const has = id => BASE.includes(id) || S.known.includes(id);
const avail = o => Object.fromEntries(Object.entries(o).filter(([k]) => has(k)));
function buildUI() {
  const bar = $('bar'); bar.innerHTML = '';
  ACTS.forEach(([id, ic, label]) => { const b = document.createElement('button'); b.className = 'ab'; b.id = 'a_' + id; b.append(img(ic, '#fff0d6')); b.append(Object.assign(document.createElement('span'), { textContent: label })); b.onclick = () => act(id); bar.appendChild(b); });
  $('bPause').style.backgroundImage = `url(${Art.icon('menu', '#fff0d6')})`; $('bPause').onclick = pauseMenu;
  $('bBook').style.backgroundImage = `url(${Art.icon('book', '#fff0d6')})`; $('bBook').onclick = () => $('journal').classList.toggle('shut');
  const sn = () => $('bSnd').style.backgroundImage = `url(${Art.icon('sound', Snd.get() ? '#fff0d6' : '#7a8a90')})`; sn();
  $('bSnd').onclick = () => { S.sound = !S.sound; Snd.set(S.sound); sn(); save(); };
  if (innerWidth < 700) $('journal').classList.add('shut');
}
function portrait(id) { const p = $('por').getContext('2d'); p.clearRect(0, 0, 24, 24); Art.person(p, id, 12, 23, 0); }

/* day cycle */
function setScene() {
  const sl = Math.min(S.slot, 2), storm = S.day === 3 && sl === 2;
  ST.time = sl; ST.storm = storm; ST.wx = storm ? 'rainy' : WX[(S.day * 2 + 1) % 3];
  Snd.rain(ST.wx === 'rainy'); Snd.mood(sl, ST.wx === 'rainy'); ST.season = Math.floor((S.day - 1) / 6) % 4; ST.fest = S.day % 6 === 0 && sl === 2; ST.decor = S.decor; ST.beach = S.day >= 5 ? 1 + (S.day >= 9) + (S.day >= 13) : 0; ST.kalis = S.dating;
  if (ST.fest && festSeen !== S.day) { festSeen = S.day; setTimeout(() => toast('Lantern night! The whole town drifts past your window.'), 1200); } $('tag').textContent = `DAY ${S.day} - ${TIMES[sl].toUpperCase()} - ${SEASONS[ST.season]}`;
  $('a_signal').classList.toggle('hidden', !S.signal);
  if (storm && !stormSeen) { stormSeen = true; setTimeout(() => { toast('Thunder. The lamps go out. Maybe light a candle?'); Snd.thunder(); }, 900); }
}
function nextVisitor() {
  gen++;
  if (S.slot > 2) return endDay();
  const ci = CH.findIndex(c => c.from === S.day); if (S.slot === 0 && ci >= 0 && S.cseen !== S.day) { S.cseen = S.day; setScene(); return overlay('chapter ' + (ci + 1), CH[ci].n, CH[ci].blurb, 'BEGIN', nextVisitor); }
  setScene(); $('brew').classList.add('hidden'); $('ch').innerHTML = '';
  const id = (S.day <= 12 ? SCHED[S.day - 1][S.slot] : ROSTER[(S.day * 3 + S.slot) % ROSTER.length]), ch = C[id], vi = Math.min(S.replay ? Math.max(0, SCHED.slice(0, S.day).reduce((n, row, di) => n + row.slice(0, di + 1 === S.day ? S.slot + 1 : 3).filter(x => x === id).length, 0) - 1) : (S.visits[id] || 0), ch.v.length - 1), v0 = ch.v[vi];
  const storm = ST.storm; cur = { id, ch, vi, v: storm ? { ...v0, t: ["The power's out all over Seabrook. Everyone's walking toward the only lit window. Yours."].concat(v0.t) } : v0 };
  const alt = (S.visits[id] || 0) >= ch.v.length && ch.alt && has(ch.alt);
  cur.order = { drink: alt ? ch.alt : ch.drink, extra: alt ? 'none' : ch.extra, food: ch.food && has(ch.food) ? ch.food : null }; if (S.day >= 9) { const k = S.day + S.slot, TF = ['idli', 'dosa', 'vada', 'payasam']; if (k % 2 === 0 && has(TF[k % 4])) cur.order.food = TF[k % 4]; if (k % 3 === 1 && has('chai')) { cur.order.drink = k % 2 ? 'chai' : 'filter'; cur.order.extra = 'none'; } }
  cur.order.clue = S.day > 4 && (S.day + S.slot) % 3 === 0 ? CLUE[cur.order.drink] : null; showOrder();
  Snd.voice(VOICE[id]); portrait(id); $('dn').textContent = ch.n; $('dt').textContent = 'The door chimes...';
  const g2 = gen; setTimeout(() => { Scene.enter(id); Snd.chime(); }, 400); setTimeout(() => g2 === gen && talk(0), 2000);
}
function talk(i) {
  const L = cur.v.t; $('ch').innerHTML = '';
  typeInto($('dt'), L[i], 24, () => {
    if (i < L.length - 1) return addChoice('Continue', () => talk(i + 1));
    cur.v.c.forEach(([l, r]) => addChoice(l, () => { S.trust[cur.id] = (S.trust[cur.id] || 0) + 1; reply(r); }));
    if (S.letters.includes(cur.id)) addChoice("Give June's letter", giveLetter);
    if (cur.id === 'theo' && S.items.box && !S.boxGiven) addChoice('Show Theo the music box', giveBox);
  });
}
function addChoice(l, fn) { const b = document.createElement('button'); b.textContent = l; b.onclick = fn; $('ch').appendChild(b); }
function reply(text) { $('ch').innerHTML = ''; typeInto($('dt'), text, 24, () => addChoice('Make their drink', openBrew)); }

/* brewing */
function openBrew() {
  drink = null; extra = 'none'; food = 'none'; uh = []; cur.poured = false; $('pg').classList.add('hidden'); $('ch').innerHTML = ''; $('dt').textContent = `${cur.ch.n} is waiting. What would they like?`;
  fill('rD', avail(DRINKS), k => drink = k, (k, d) => img('cup', '#2a1d18', d[1])); fill('rE', EXTRAS, k => extra = k, (k, d) => { const i = document.createElement('i'); i.style.background = d[1]; return i; });
  fill('rF', { none: ['No food'], ...avail(FOODS) }, k => food = k, (k, d) => k === 'none' ? document.createElement('span') : img(k, '#2a1d18'));
  $('brew').classList.remove('hidden'); cup(); mark();
}
function fill(id, data, pick, mk) {
  const row = $(id); row.innerHTML = '';
  Object.entries(data).forEach(([k, d]) => {
    const b = document.createElement('button'); b.className = 'chip'; b.append(mk(k, d), d[0]);
    b.dataset.k = k; b.onclick = () => { uh.push([drink, extra, food]); [...row.children].forEach(x => x.classList.remove('on')); b.classList.add('on'); pick(k); cup(); Snd.tone(440 + Math.random() * 200, .12, 'triangle'); ST.pour = .8; Scene.spawn('spark', 'cust', 2); };
    row.appendChild(b);
  });
}
function cup() { $('cup').textContent = drink ? DRINKS[drink][0] + (extra && extra !== 'none' ? ' + ' + EXTRAS[extra][0] : '') + (food && food !== 'none' ? ' + ' + FOODS[food][0] : '') : 'An empty cup.'; $('bServe').disabled = !drink; }
$('bServe').onclick = () => {
  const n = cur.ch, o = cur.order, okD = drink === o.drink, okE = o.extra === 'none' || extra === o.extra, okF = !o.food || food === o.food;
  if (!okD || !okE || !okF) { typeInto($('dt'), !okD ? "Hm, that's not quite what I had in mind. Take your time." : !okE ? `Almost. June always added something... ${EXTRAS[o.extra][0].toLowerCase()}, I think.` : 'They did mention something to eat... check the note.'); return Snd.tone(260, .3, 'triangle'); }
  if (!cur.poured) return pour();
  $('brew').classList.add('hidden'); $('order').classList.add('hidden'); ST.hop = 1.6; Scene.spawn('heart', 'cust', 6); Snd.chime(); typeInto($('dt'), 'Thank you. This is exactly right.');
  const id = cur.id + cur.vi;
  if (!S.journal.find(j => j.id === id)) { S.journal.push({ id, who: n.n, text: cur.v.mem || C[cur.id].v[cur.vi].mem, day: S.day, kind: 'mem' }); renderJournal('mem', id); toast("A new page appeared in June's Journal"); }
  if (cur.id === 'pip' && cur.vi === 1) S.items.slip = true;
  if (cur.id === 'kalis') { if (cur.vi === 3) S.dating = true; (KLESSON[cur.vi] || []).forEach(r => { if (!S.known.includes(r)) { S.known.push(r); setTimeout(() => toast('Kalis taught you: ' + RECIPES[r].n), 1200); } }); }
  S.visits[cur.id] = (S.visits[cur.id] || 0) + 1; S.slot++; save();
  const g = gen; setTimeout(Scene.leave, 2600); setTimeout(() => g === gen && nextVisitor(), 4200);
};

/* journal */
document.querySelectorAll('.tab').forEach(t => t.onclick = () => { document.querySelectorAll('.tab').forEach(x => x.classList.remove('on')); t.classList.add('on'); renderJournal(t.dataset.t); });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function showOrder() {
  const o = cur.order, n = $('order');
  n.innerHTML = `<img src="${Art.icon('cup', '#2a1d18', o.clue ? '#999' : DRINKS[o.drink][1])}"><div><b>${esc(cur.ch.n)} would like</b><br>${o.clue ? 'Mystery order: something ' + o.clue : DRINKS[o.drink][0] + (o.extra !== 'none' ? ' + ' + EXTRAS[o.extra][0] : '')}${o.food ? '<br>and a ' + FOODS[o.food][0] : ''}</div>${o.food ? `<img src="${Art.icon(o.food, '#2a1d18')}">` : ''}`;
  n.classList.remove('hidden'); n.style.animation = 'none'; void n.offsetWidth; n.style.animation = '';
}
function renderJournal(w, nw) {
  tab = w || tab; let h;
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x.dataset.t === tab));
  if (tab === 'rec') h = Object.entries(RECIPES).filter(([k]) => has(k)).map(([k, r]) => `<div class="en rec"><img src="${Art.icon(r.t === 'food' ? k : 'cup', '#2a1d18', DRINKS[k] && DRINKS[k][1])}"><span><small>${r.t}</small>${esc(r.n)}: ${esc(r.how)}</span></div>`).join('');
  else h = S.journal.filter(j => j.kind === tab).map(j => `<div class="en ${j.id === nw ? 'new' : ''}"><small>${esc(j.who)} - Day ${j.day}</small>${esc(j.text)}</div>`).join('');
  $('pages').innerHTML = h || `<div class="en">${{ mem: 'Blank pages. Someone will walk in soon.', june: "June's handwriting hides in the little things you do around the cafe.", town: 'Explore the town map to meet the people of Seabrook.' }[tab] || ''}</div>`;
  $('pages').scrollTop = 1e5; $('journal').classList.remove('shut');
}

/* actions */
const NOTES = { toast: ['Toast purrs. Loudly. Smugly.', 'Toast steals a pastry. Rude.', 'Toast has decided you are staff.'], tidy: ["You straighten the chairs. They still don't match.", 'The floorboard creaks.', 'Dust gone. The light looks softer.'], plants: ['The leaves perk up.', 'A new green shoot!', 'The plant leans toward the window.'], music: ['A music-box melody drifts out.'], window: ['The window sticks, then gives. Salt air.'] };
function act(a) {
  if (a === 'signal') return signal();
  if (a === 'closet') return World.closet();
  if (a === 'map') return Walk.start('street');
  if (a === 'decor') return World.decor();
  if (a === 'chapters') return World.chapters();
  if (a === 'album') return World.album();
  if (a === 'candle') { ST.candle = !ST.candle; Scene.spawn('spark', 'toast', 3); Snd.tone(880, .25); return toast(ST.candle ? 'A candle flame steadies. The room goes gold.' : 'You blow the candle out.'); }
  S.acts[a] = (S.acts[a] || 0) + 1; const msg = NOTES[a][(S.acts[a] - 1) % NOTES[a].length];
  if (a === 'toast') { ST.purr = 2; Scene.spawn('heart', 'toast', 4); Scene.spawn('paw', 'toast', 2); Snd.tone(300, .3, 'sawtooth', .02); }
  if (a === 'tidy') { Scene.spawn('spark', 'cust', 5); Snd.tone(200, .15, 'triangle'); }
  if (a === 'plants') { ST.grow = 1.2; Scene.spawn('drop', 'plant', 5); Snd.tone(700, .2); }
  if (a === 'music') { Snd.box(); Scene.spawn('note', 'lamp', 8); }
  if (a === 'window') { ST.shake = .6; Snd.tone(150, .4, 'sawtooth', .03); }
  toast(msg);
  if (JUNE[a] && S.acts[a] === 3 && !S.journal.find(j => j.id === 'j' + a)) { S.journal.push({ id: 'j' + a, who: 'June', text: JUNE[a], day: S.day, kind: 'june' }); setTimeout(() => { toast("You found a note in June's handwriting"); renderJournal('june'); }, 2200); }
  if (a === 'toast' && S.acts.toast >= 3) S.items.key = true; if (a === 'tidy' && S.acts.tidy >= 3) S.items.floor = true;
  if (S.items.key && S.items.floor && !S.items.tin) {
    S.items.tin = true; S.letters = ['elliot', 'iris', 'theo', 'mila'].filter(k => !S.sent.includes(k));
    S.journal.push({ id: 'jtin', who: 'June', text: "The key fits. Inside the tin: four letters June never sent, each with a name. Hand them over when the right person walks in.", day: S.day, kind: 'june' });
    setTimeout(() => { toast('The tin opens: four unsent letters'); Snd.chime(); renderJournal('june'); }, 4200);
  }
  save();
}
function giveLetter() {
  const L = LETTERS[cur.id]; S.letters = S.letters.filter(k => k !== cur.id); S.sent.push(cur.id); S.trust[cur.id] = (S.trust[cur.id] || 0) + 2;
  S.journal.push({ id: 'L' + cur.id, who: cur.ch.n, text: L.mem, day: S.day, kind: 'mem' }); renderJournal('mem', 'L' + cur.id);
  Scene.spawn('heart', 'cust', 6); Snd.chime(); if (cur.id === 'theo') { S.signal = true; $('a_signal').classList.remove('hidden'); } save(); reply(L.reply);
}
function signal() {
  if (S.slot !== 2) return toast('The lighthouse only answers after dark. Try the evening.');
  ST.sig = 4.4; [523, 659, 784].forEach((f, i) => setTimeout(() => Snd.tone(f, .6, 'triangle', .06), i * 600)); toast('You flick the window lamp three times...');
  setTimeout(() => toast('Far away, the lighthouse blinks back. Three times.'), 2400);
  if (!S.journal.find(j => j.id === 'jsignal')) { S.journal.push({ id: 'jsignal', who: 'June', text: "Three blinks from the lamp, three from the tower. Forty years of saying goodnight without a word.", day: S.day, kind: 'june' }); renderJournal(tab); }
  save();
}

/* end of day */
function endDay() {
  const ci = CH.findIndex(c => c.to === S.day), adv = () => { if (S.replay && ci >= 0) { S.day = S.replay; S.replay = null; } else S.day++; S.slot = 0; save(); setScene(); nextVisitor(); };
  if (ci >= 0 && S.chap <= ci) S.chap = ci + 1; save();
  if (ci === 0) return overlay('the last page', 'A little light stays on', Object.keys(EP).map(k => EP[k][S.sent.includes(k) ? 0 : 1]).join('\n') + (S.boxGiven ? '\nTheo winds the music box on every rainy night.' : '') + (S.signal ? '\n\nAcross the water, the lighthouse blinks three times.' : '') + '\n\n"We cannot keep every person we love beside us forever. But we can make the time we have with them mean something. And sometimes, that is enough." - June', 'CONTINUE', adv);
  if (ci > 0) return overlay('chapter ' + (ci + 1) + ' complete', CH[ci].n, CH[ci].end, 'CONTINUE', adv);
  overlay('another day by the sea', `Day ${S.day} is done`, `${S.journal.filter(j => j.kind === 'mem').length} memories are in the journal. The lighthouse blinks. Toast is asleep on the counter.`, 'OPEN TOMORROW', adv);
}
/* menu backdrop: rainy evening */
ST.time = 2; ST.wx = 'rainy';

/* pouring mini-game, music-box ending, Toast mischief */
function pour() {
  $('bServe').disabled = true; $('pg').classList.remove('hidden'); let x = 0, d = 1; const c = $('pc').getContext('2d'); c.clearRect(0, 0, 16, 16);
  $('bSkip').onclick = () => { clearInterval(pt); cur.poured = true; $('pg').classList.add('hidden'); $('bServe').disabled = false; $('bServe').onclick(); };
  clearInterval(pt); pt = setInterval(() => { x += d * 1.7; if (x > 100 || x < 0) d = -d; $('mk').style.left = x + '%'; }, 16);
  $('bPour').onclick = () => {
    clearInterval(pt); const off = Math.abs(x - 50), q = off < 10 ? 'Perfect pour!' : off < 25 ? 'Nicely poured.' : 'A little messy, but warm.', lvl = off < 25 ? 9 : 6;
    Art.R(c, 3, 4, 10, 11, '#fff0d6'); Art.R(c, 4, 15 - lvl, 8, lvl, DRINKS[drink][1]); toast(q); Snd.tone(500, .2, 'triangle');
    if (off < 10) { S.perfect++; Scene.spawn('spark', 'cust', 3); if (S.perfect === 5) { S.journal.push({ id: 'jsteady', who: 'June', text: "A steady hand. Mine shook for years. Yours won't.", day: S.day, kind: 'june' }); setTimeout(() => toast("Five perfect pours. A note appears in June's handwriting"), 2000); renderJournal(tab); } }
    cur.poured = true; setTimeout(() => { $('pg').classList.add('hidden'); $('bServe').disabled = false; $('bServe').onclick(); }, 700);
  };
}
function giveBox() {
  S.boxGiven = true; S.journal.push({ id: 'Lbox', who: 'Theo', text: "Theo wound the music box. Its tune was the one the rain plays on the window.", day: S.day, kind: 'mem' }); renderJournal('mem', 'Lbox');
  Snd.box(); Scene.spawn('note', 'cust', 6); save();
  reply("'I sent it for repair the winter she stopped answering my letters. I thought she wouldn't want it back.' He listens to the last note. 'She kept the slip. Forty years.'");
}
setInterval(() => {
  if ($('ui').classList.contains('hidden') || Math.random() > .4) return;
  ST.mis = 2.5; Scene.spawn('paw', 'toast', 3); toast(['Toast knocked a cup off the counter. Unbothered.', 'Toast stole a pastry crumb. Evidence everywhere.', 'Toast is sitting on the order pad. Ruling: staff.'][Math.random() * 3 | 0]);
}, 28000);

setInterval(() => { if (S.dating && !$('ui').classList.contains('hidden')) Scene.spawn('heart', 'kalis', 2); }, 9000);

/* undo / back in the brewing panel, pause menu, quit & resume */
function mark() { [['rD', drink], ['rE', extra], ['rF', food]].forEach(([id, v]) => [...$(id).children].forEach(b => b.classList.toggle('on', b.dataset.k === v))); }
$('bUndo').onclick = () => { const s = uh.pop(); if (!s) return toast('Nothing to undo'); [drink, extra, food] = s; $('pg').classList.add('hidden'); cup(); mark(); };
$('bBack').onclick = () => { $('brew').classList.add('hidden'); $('ch').innerHTML = ''; $('dt').textContent = 'Take your time.'; addChoice('Make their drink', openBrew); };
function pauseMenu() {
  let p = $('pause');
  if (!p) {
    p = document.createElement('div'); p.id = 'pause'; p.className = 'layer hidden';
    p.innerHTML = '<div class="paper card"><small class="hand">taking a breath</small><h2 class="cursive">Paused</h2><button class="pix" id="pR">RESUME</button><button class="pix" id="pD">RESTART DAY</button><button class="pix" id="pM">QUIT TO MENU</button><button class="pix" id="pN">RESTART GAME</button></div>'; document.body.appendChild(p);
    $('pR').onclick = () => p.classList.add('hidden');
    $('pD').onclick = () => { if (confirm('Restart today from the first customer?')) { p.classList.add('hidden'); Walk.stop(); S.slot = 0; save(); Scene.leave(); setScene(); nextVisitor(); } };
    $('pM').onclick = () => { p.classList.add('hidden'); gen++; save(); Walk.stop(); Scene.leave(); $('ov').classList.add('hidden'); $('ui').classList.add('hidden'); $('menu').classList.remove('hidden'); $('bStart').textContent = 'RESUME YOUR STORY'; };
    $('pN').onclick = () => { if (confirm('Erase everything and start over?')) { localStorage.removeItem(KEY); location.reload(); } };
  }
  p.classList.toggle('hidden');
}
addEventListener('keydown', e => { if (e.key === 'Escape' && $('menu').classList.contains('hidden')) pauseMenu(); });

/* friendly warning if an old or renamed style.css is being loaded */
if (getComputedStyle($('cv')).position !== 'fixed') { const n = document.createElement('div'); n.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99;background:#b4503c;color:#fff;padding:10px;font:700 14px sans-serif;text-align:center'; n.textContent = 'style.css is missing or is the OLD first-version file. Use the style.css from this zip (not style_1.css), in the same folder as index.html.'; document.body.appendChild(n); }
