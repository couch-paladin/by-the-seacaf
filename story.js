const DRINKS = { coffee: ['Black Coffee', '#4a2c1f'], tea: ['Tea', '#c98a3a'], chocolate: ['Hot Chocolate', '#6b3a2a'], milk: ['Honey Milk', '#f4ecd8'], cider: ['Warm Cider', '#d1672a'] };
const EXTRAS = { none: ['Plain', '#aaa'], marshmallow: ['Marshmallow', '#fff'], cinnamon: ['Cinnamon', '#b5651d'], honey: ['Honey', '#f2b632'] };
const C = {
  mila: { n: 'Mila', drink: 'chocolate', extra: 'marshmallow', v: [
    { t: ["Hi! June used to give me extra marshmallows.", "I drew the sea today. It has a whale in it. A secret one."], c: [["Listen", "He's shy, so he hides behind the waves. I think that's allowed."], ["Offer hot chocolate", "Yes please! With marshmallows, like always."]], mem: "Mila left a napkin drawing: a whale hiding behind a wave." },
    { t: ["Mum and Dad are talking about another city.", "Grown-ups decide things without asking us."], c: [["Listen", "...I don't know what I'd tell the whale."], ["Promise to visit", "You'd really visit? Okay. Okay, that helps."]], mem: "Mila gave you a drawing of the cafe. 'I hope this place never goes away.'" }] },
  elliot: { n: 'Elliot', drink: 'coffee', extra: 'none', v: [
    { t: ["Black coffee.", "...Sea's calm this morning. She would've liked it."], c: [["Listen", "He says nothing more. He drinks, and watches the water."], ["Sit with him", "He nods. The quiet is comfortable."]], mem: "Elliot asked for a second cup, then said, 'Never mind.'" },
    { t: ["Do you know how to make tea? Margaret's favourite.", "June kept a recipe somewhere."], c: [["Find the recipe", "Honey, a little tea. He closes his eyes."], ["Listen", "She never learned to swim. Loved the sea anyway."]], mem: "Elliot left the second cup untouched, and didn't look like he was waiting." }] },
  iris: { n: 'Iris', drink: 'tea', extra: 'honey', v: [
    { t: ["Tea, please. Honey, if you have it.", "I used to draw all day. Now I just stare at the page."], c: [["Listen", "It stopped being fun when it became work."], ["Offer a napkin", "A napkin? That's less scary than paper."]], mem: "Iris sketched the window on a napkin. Only the window." },
    { t: ["I got an offer. Another city.", "I'm excited and terrified. Is that normal?"], c: [["Listen", "I forgot to enjoy being myself, I think."], ["Promise to visit", "Then I'll bring something for your wall."]], mem: "Iris painted the cafe at dusk, a little light in every window." }] },
  odette: { n: 'Odette', drink: 'milk', extra: 'honey', v: [
    { t: ["The bakery ran out of bread by nine. Again.", "June always gave me honey milk after the rush."], c: [["Listen", "Closing when the bread is gone is the best rule."], ["Offer honey milk", "You remembered. Or June's notebook did."]], mem: "Odette left a warm cinnamon roll wrapped in paper." }] },
  theo: { n: 'Theo', drink: 'cider', extra: 'cinnamon', v: [
    { t: ["Keeper of the light, at your service.", "Forty years of turning on a lamp so strangers get home."], c: [["Listen", "Nobody thanks a lighthouse. It's fine. It's not for thanks."], ["Offer warm cider", "Cinnamon, please. June knew."]], mem: "Theo said the cafe window is the second lighthouse in town." }] }
};
const ROSTER = ['mila', 'elliot', 'iris', 'odette', 'theo'];
const JUNE = {
  toast: "Toast dropped a tiny brass key at your feet, looking unbearably proud. June's tag: 'for the tin'.",
  tidy: "A loose floorboard behind the counter. Underneath: a small locked tin.",
  plants: "Forget-me-nots by the window. Some people take a while to bloom.",
  music: "The music box was a gift from someone I couldn't keep. It plays when it rains."
};
const LETTERS = {
  elliot: { reply: "He reads it twice. 'She asked June to keep the second cup warm until I was ready.' He folds it over his heart. 'Of course she knew.'", mem: "June's unsent letter reached Elliot. He is allowed to be ready now." },
  iris: { reply: "'A good drawing is the one you'd make for nobody.' Iris laughs, wet-eyed. 'Rude. June was right.' She takes out a pencil.", mem: "Iris read June's letter, then drew for nobody, all afternoon." },
  mila: { reply: "Mila reads slowly, lips moving. 'June saw the whale too!' She hugs the letter. 'The sea is in every city. Everyone knows that.'", mem: "June's letter told Mila the whale was never a secret. The move felt smaller." },
  theo: { reply: "Theo goes very still. 'Forty years I kept that lamp lit for one window. I never knew she kept hers lit for me.' (You can now signal the lighthouse from the window, in the evening.)", mem: "June and Theo: forty years of two lights saying goodnight across the water." }
};
const EP = {
  mila: ["Mila's family moved, but a new whale drawing arrives in the post every month.", "Mila's family moved. She taped her last drawing inside your window."],
  elliot: ["Elliot still comes at 7:15. One cup now, and he talks about Margaret out loud.", "Elliot still comes at 7:15, still orders one cup too many."],
  iris: ["Iris left for the city with your napkin sketch and a pencil in her hand.", "Iris left for the city. She says she'll draw again, someday."],
  theo: ["Every night the lighthouse and your window answer each other.", "Theo keeps the lamp turned toward a window he never learned to wave at."]
};
const LETTER = "My dear,\nIf you're reading this, I suppose you've finally found your way back.\nI've left you the cafe. Not because I expect you to run it, but because I think you might need it.\nJust open the doors. Someone might need a place to sit.\nAnd perhaps, so might you.\n- June";

/* ---- menu, recipes, town ---- */
Object.assign(DRINKS, { latte: ['Latte', '#b98a69'], matcha: ['Matcha', '#7fa86a'] });
const FOODS = { cookie: ['Cookie'], croissant: ['Croissant'], roll: ['Cinnamon Roll'], muffin: ['Blueberry Muffin'], sandwich: ['Harbour Sandwich'] };
const BASE = ['coffee', 'tea', 'chocolate', 'milk', 'cider', 'cookie', 'croissant'];
Object.assign(C.mila, { food: 'cookie', alt: 'milk' }); Object.assign(C.elliot, { food: 'croissant', alt: 'latte' });
Object.assign(C.iris, { food: 'muffin', alt: 'matcha' }); Object.assign(C.odette, { alt: 'latte' }); Object.assign(C.theo, { food: 'sandwich', alt: 'matcha' });
const RECIPES = {
  coffee: { n: 'Black Coffee', t: 'drink', how: 'Strong, dark, no hurry.' }, tea: { n: 'Tea', t: 'drink', how: 'Steep until the window fogs.' },
  chocolate: { n: 'Hot Chocolate', t: 'drink', how: 'Milk, cocoa, marshmallows on top.' }, milk: { n: 'Honey Milk', t: 'drink', how: 'Warm milk and a spoon of honey.' },
  cider: { n: 'Warm Cider', t: 'drink', how: 'Apples, cinnamon, low heat.' }, latte: { n: 'Latte', t: 'drink', how: 'Espresso, steamed milk, a slow pour.' },
  matcha: { n: 'Matcha', t: 'drink', how: 'Whisk green tea in tiny zigzags.' }, cookie: { n: 'Cookie', t: 'food', how: 'Butter, brown sugar, chocolate chunks.' },
  croissant: { n: 'Croissant', t: 'food', how: 'Fold the butter, fold again.' }, roll: { n: 'Cinnamon Roll', t: 'food', how: 'Patience is the secret ingredient.' },
  muffin: { n: 'Blueberry Muffin', t: 'food', how: 'Fold the berries in gently.' }, sandwich: { n: 'Harbour Sandwich', t: 'food', how: 'Smoked fish, greens, crusty bread.' }
};
const TOWN = [
  { id: 'bakery', n: "Odette's Bakery", x: 46, y: 44, who: 'odette', give: ['roll'], t: ["Flour everywhere, as usual. Come in!", "June and I traded recipes over this counter for thirty years.", "Take this one. Cinnamon rolls: the secret is patience."], note: "Odette saves the first loaf of every day for whoever needs it most." },
  { id: 'library', n: 'Seabrook Library', x: 72, y: 20, who: 'wren', give: ['latte', 'matcha'], t: ["Shh... oh, you're June's grandchild. Hello.", "June borrowed one cookbook for thirty years. She never once finished it.", "She wrote a latte and a matcha recipe in the margins. They're yours."], note: "Wren says June's library card is still the only one with a pressed flower in it." },
  { id: 'harbour', n: 'The Harbour', x: 124, y: 88, who: 'elliot', give: ['sandwich'], t: ["Boat's in. Nets are mended.", "Margaret used to pack these for the trip out. Smoked fish, greens, hard bread.", "Make it for Theo some day. He forgets to eat."], note: "Elliot keeps one empty seat on his boat. He says it's for the weather." },
  { id: 'park', n: 'Gull Park', x: 22, y: 78, who: 'basil', give: ['muffin'], t: ["Mind the tulips. They're sensitive.", "I've tended this park since before your mother was born.", "Blueberries from the back fence. June made muffins, I made the berries."], note: "Basil plants forget-me-nots wherever June's name comes up." },
  { id: 'lighthouse', n: 'The Lighthouse', x: 150, y: 32, who: 'theo', give: [], t: ["Climb carefully. Hundred and twelve steps.", "I keep the lamp pointed at one window out of habit.", "Habit is just love that forgot to ask permission."], note: "Theo says the lamp isn't for ships anymore. It's for a window." }
];
const NAMES = { odette: 'Odette', wren: 'Wren', elliot: 'Elliot', basil: 'Basil', theo: 'Theo' };

/* ---- new visitors: Wren, Basil, Pip ---- */
Object.assign(C, {
  wren: { n: 'Wren', drink: 'tea', extra: 'honey', alt: 'latte', v: [
    { t: ["Shh... sorry, I whisper by habit. Hello.", "June returned one book every year, always late, always with a flower inside."], c: [["Listen", "I never fined her. Some late things are worth waiting for."], ["Offer tea", "Honey in it, please. Sweet things only in the cafe. Library rules."]], mem: "Wren found a pressed flower inside the library's oldest cookbook." },
    { t: ["I found a sentence underlined in June's cookbook.", "'Feed people first. The talking comes later.'"], c: [["Listen", "I think I'll put that on the library door."], ["Promise to visit", "Bring a book. I'll bring the quiet."]], mem: "Wren copied June's underlined sentence onto a bookmark for you." }] },
  basil: { n: 'Basil', drink: 'tea', extra: 'none', food: 'muffin', alt: 'coffee', v: [
    { t: ["Tulips are sulking again. Wind from the east.", "June sat on my bench every spring and said nothing. Best company I ever had."], c: [["Listen", "Quiet people make the loudest friends."], ["Offer tea", "Plain, thank you. Flowers don't need sugar either."]], mem: "Basil left a tulip bulb in a paper cup on the counter." },
    { t: ["Forget-me-nots come up on their own, you know.", "Somebody has to forget, so somebody else can remember."], c: [["Listen", "Plant one by the window. They like company."], ["Ask about June", "She laughed more than she ever let on. That's all I'll say."]], mem: "Basil told you June laughed far more than she let on." }] },
  pip: { n: 'Pip', drink: 'chocolate', extra: 'none', food: 'cookie', alt: 'cider', v: [
    { t: ["Delivery! Well. Delivery-adjacent. I'm mostly lost.", "I'm Pip. I run the post. Seabrook has eleven mailboxes and I know every dog."], c: [["Listen", "The dogs are the real customers. I carry biscuits."], ["Offer hot chocolate", "Free? My boss says nothing's free. My boss isn't here."]], mem: "Pip left a dog biscuit on the counter 'for Toast's morale'." },
    { t: ["I found something in the depot. A parcel for June. Forty years late.", "It's a music box repair slip. Whoever sent it never collected it."], c: [["Listen", "Somebody paid for a repair and never came back. That's sad, right?"], ["Keep the slip", "Cool. Keep it safe. I'll pretend I never saw it."]], mem: "Pip found a forty-year-old repair slip for June's music box." }] }
});
ROSTER.push('wren', 'basil', 'pip');
/* days 1-4 are scripted so every letter recipient visits; later days rotate through everyone */
const SCHED = [['mila', 'odette', 'elliot'], ['iris', 'wren', 'theo'], ['pip', 'mila', 'basil'], ['elliot', 'iris', 'theo']];

/* ---- mystery orders + the music-box mystery ---- */
const CLUE = { coffee: 'dark and bitter, like a Monday', tea: 'made of leaves and a quiet afternoon', chocolate: 'a child would trade a toy for', milk: 'warm and honeyed, for a rough morning', cider: 'with apples and woodsmoke', latte: 'espresso, but gentle', matcha: 'green and very calm' };
TOWN.push({ id: 'repair', n: "Hollis' Clock Repair", x: 104, y: 74, who: 'hollis', give: [], t: ["Ah. A repair slip. Forty years old, and never collected.", "It's June's music box. Sent in by 'T.' the winter her letters stopped.", "Paid in full. I kept it wound, just in case. Take it home."], note: "Hollis kept a stranger's music box wound for forty years, just in case." });
NAMES.hollis = 'Hollis';

/* ---- chapters, Kalis, Tamil dishes, beach, Sol, market, cove ---- */
const VOICE = { mila: 760, elliot: 190, iris: 500, odette: 430, theo: 150, wren: 580, basil: 210, pip: 680, sol: 340, kalis: 300, hollis: 170, marta: 520 };
const CH = [
  { n: 'The Return', from: 1, to: 4, blurb: "You came back to Seabrook, and June's light was still on." },
  { n: 'Salt & Cardamom', from: 5, to: 8, blurb: 'A stranger follows the smell of cinnamon into your cafe. Patience, tea, and a very small kitchen.', end: 'Kalis and you are together. He cooks beside you every day, and the beach outside is starting to fill with people.' },
  { n: 'The Tamil Table', from: 9, to: 12, blurb: "Kalis brings his grandmother's recipes to the SeaCaf.", end: 'Idli, dosa, vada and chai now share the menu with coffee and cookies. Seabrook has a new favourite smell.' },
  { n: 'Beach Season', from: 13, to: 16, blurb: 'Summer arrives. The beach by the cafe fills with the whole town.', end: 'Every evening the beach is full of people eating dosa under paper lanterns. The light in the window stays on.' }
];
const KLESSON = { 4: ['idli'], 5: ['dosa', 'filter'], 6: ['vada', 'chai'], 7: ['payasam'] };
Object.assign(DRINKS, { chai: ['Masala Chai', '#b9783a'], filter: ['Filter Coffee', '#6b3a2a'], lemonade: ['Lemonade', '#f2e07a'] });
Object.assign(FOODS, { idli: ['Idli & Chutney'], dosa: ['Masala Dosa'], vada: ['Medu Vada'], payasam: ['Payasam'], pie: ["June's Pie"] });
Object.assign(RECIPES, {
  chai: { n: 'Masala Chai', t: 'drink', how: 'Ginger, cardamom, strong tea, hot milk.' }, filter: { n: 'Filter Coffee', t: 'drink', how: 'Pour high between steel tumblers until it froths.' },
  lemonade: { n: 'Lemonade', t: 'drink', how: 'Sharp, sunny, a pinch of salt.' }, idli: { n: 'Idli & Chutney', t: 'food', how: 'Rest the batter overnight. Steam. Do not rush.' },
  dosa: { n: 'Masala Dosa', t: 'food', how: 'Thin as paper, crisp as a promise.' }, vada: { n: 'Medu Vada', t: 'food', how: 'Crisp outside, fluffy inside.' },
  payasam: { n: 'Payasam', t: 'food', how: 'Milk, vermicelli, cardamom. For good news.' }, pie: { n: "June's Pie", t: 'food', how: 'Cherries and a little sea salt.' }
});
Object.assign(CLUE, { chai: 'spiced and milky, like a hug', filter: 'frothy, poured from a great height', lemonade: 'sharp and sunny' });
const K = (t, c, mem) => ({ t, c, mem });
Object.assign(C, {
  kalis: { n: 'Kalis', drink: 'tea', extra: 'cinnamon', food: 'cookie', v: [
    K(["Sorry, I followed the smell of cinnamon and ended up here. I'm Kalis.", "I cook for a living. Mostly for friends. Nobody pays me, but they keep coming back."], [["Welcome him", "He smiles like he's been handed something warm."], ["Offer tea", "I'm patient. I'll wait for it to steep properly."]], "Kalis followed the smell of cinnamon and stayed for the tea."),
    K(["I stood outside ten minutes before coming in. It looked too nice to disturb.", "Could I see your kitchen? I won't touch anything. Okay, one thing."], [["Show him the kitchen", "He stares at the stove like it's a cathedral."], ["Ask what he cooks", "Home food. Sambar, idli, my grandmother's rasam. Someday, for you."]], "Kalis stood in your tiny kitchen as if it were a cathedral."),
    K(["I brought something. Don't laugh. It's idli, soft as clouds if I did it right.", "Walk the beach with me after closing? The waves are loud and nobody minds."], [["Say yes", "He lets out a breath he'd been holding all evening."], ["Ask why the beach", "Quiet people need loud places sometimes."]], "Kalis walked the beach with you. The waves did most of the talking."),
    K(["I've thought about this for weeks. Patiently, as ever.", "Would you let me be yours? And the cafe's cook, of course. Both. Preferably both."], [["Say yes", "He laughs, covers his face, then takes your hand."], ["Kiss his cheek", "Kalis goes pink to the ears. 'Okay. Good. Great. Tea?'"]], "You and Kalis became a couple, over a cup of tea."),
    K(["Today: idli. Steam, patience, no hurry.", "My grandmother says the batter must rest overnight. Rushing ruins it. Like most things."], [["Learn to steam idli", "Soft little clouds. You did it!"], ["Taste the chutney", "Coconut, green chilli, curry leaf. Careful, it bites."]], "Kalis taught you idli: steam, patience, and a very proud grin."),
    K(["Dosa: thin as paper, crisp as a promise. And filter coffee to go with it.", "You pour it high, back and forth, until it froths. A tiny waterfall."], [["Try the pour", "Half on the counter. He claps anyway."], ["Taste the dosa", "Crunch. Then silence. Then, 'More.'"]], "Kalis showed you how to pour filter coffee like a tiny waterfall."),
    K(["Medu vada, crisp outside, fluffy inside. And masala chai, strong with ginger.", "Back home the whole street smells of it when it rains."], [["Make the chai", "Ginger, cardamom, a little too much sugar. Perfect."], ["Watch him fry", "He hums while he cooks. You could watch forever."]], "The cafe smelled of ginger and rain. Customers asked what was cooking."),
    K(["Payasam. Sweet milk, vermicelli, cardamom. For festivals and good news.", "The cafe is good news now. So, I made it for us."], [["Taste it", "Warm, sweet, cardamom. It tastes like being welcome."], ["Hold his hand", "No words. The kettle hums along."]], "Kalis made payasam for good news. The cafe serves Tamil food now.")
  ] },
  sol: { n: 'Sol', drink: 'milk', extra: 'honey', v: [
    K(["Mind if I play outside the window? The acoustics are criminal, in the best way.", "I play for the tide. Sometimes people listen too."], [["Listen", "He plays three notes, grins. 'The tide's favourite.'"], ["Offer honey milk", "For the throat. You're a hero."]], "Sol played outside your window until the tide agreed with him."),
    K(["I wrote a song about this place. It's mostly about Toast. The cat, not the bread.", "Can I play it on the beach tonight? Bring everyone."], [["Say yes", "Then it's a concert. A tiny, damp one."], ["Ask for a verse", "Absolutely not. Tradition says be nervous first."]], "Sol wrote a song about Toast. The cat, not the bread.")] }
});
ROSTER.push('sol');
C.wren.v.push(K(["I put your name on the lending list. Under 'permanent borrowers'.", "It means you can take the quiet home."], [["Listen", "June borrowed all the quiet she could carry."], ["Offer tea", "Honey in it. As the rules say."]], "Wren made you a permanent borrower at the library."));
C.basil.v.push(K(["Planted forget-me-nots in your window box. Don't thank me. Water them.", "They grow best near people who remember."], [["Listen", "Said the man who forgets nothing."], ["Offer tea", "Plain. Bless you."]], "Basil planted forget-me-nots in your window box."));
C.pip.v.push(K(["Mail's strange lately. Letters addressed to 'The Light in the Window'.", "I bring them to you. You're the light, apparently."], [["Listen", "Love letters, mostly. To the whole town."], ["Offer hot chocolate", "I'm on the clock. But also yes."]], "Pip started delivering letters addressed to 'The Light in the Window'."));
SCHED.push(['kalis', 'wren', 'sol'], ['kalis', 'pip', 'mila'], ['kalis', 'theo', 'basil'], ['kalis', 'iris', 'elliot'], ['kalis', 'sol', 'odette'], ['kalis', 'wren', 'mila'], ['kalis', 'pip', 'theo'], ['kalis', 'basil', 'iris']);
Object.assign(NAMES, { sol: 'Sol', marta: 'Marta', kalis: 'Kalis' });
TOWN.push(
  { id: 'market', n: 'Harbour Market', x: 63, y: 84, who: 'marta', give: ['lemonade'], t: ["Fresh lemons! Fresh gossip! Both free today.", "June bought one lemon every Friday. Never said why.", "Here, my lemonade. Sharp, sunny, a pinch of salt."], note: "Marta says June bought one lemon every Friday and never said why." },
  { id: 'beach', n: 'The Beach', x: 84, y: 91, who: 'sol', give: [], t: ["This beach was empty for years. Look at it now.", "Everyone comes after your cafe closes. Dinner picnics, mostly dosa.", "It started with one umbrella. It always does."], note: "The beach by the cafe is where Seabrook now spends its evenings." },
  { id: 'cove', n: 'Secret Cove', x: 160, y: 63, who: 'theo', give: ['pie'], t: ["You found it. June's cove. She came here when the cafe got too loud.", "She baked me a pie here once. Cherries and salt. Terrible. I ate every crumb.", "Take the recipe. Somebody should bake it properly."], note: "The cove is where June and Theo kept their quietest hours." }
);
