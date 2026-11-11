// nest.js: the page furniture for the exercise files. You don't need to edit it.
// It shows your peacock, its seven feathers and your next quest. On files 0 to 4 it works out
// which feathers your code has earned from what you send to the model. On files 5 to 7
// (data-page="5", "6", "7") it is a slim bar above the chat that reacts to the chat itself.
(() => {
  const FEATHERS = ["brain", "voice", "character", "memory", "face", "hands", "home"];
  const page = Number(document.currentScript.dataset.page || 0);  // 0 = files 0-4, else the chapter number of a chat page
  const preLit = page ? { 5: 4, 6: 5, 7: 5 }[page] : 0;  // chat pages start with the feathers the earlier files earned
  const key = "feathers:" + location.pathname;
  const earned = new Set(JSON.parse(sessionStorage.getItem(key) || "[]"));  // survives the reload after each save
  FEATHERS.slice(0, preLit).forEach(f => earned.add(f));
  if (location.hostname.endsWith("github.io")) earned.add("home");  // deployed: the last feather

  document.head.insertAdjacentHTML("beforeend", `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"><style>
    #nest-strip { text-align: center; padding: 6px; font: 600 12px 'JetBrains Mono', ui-monospace, monospace; white-space: nowrap; }
    #nest-strip span { display: inline-block; padding: 2px 12px; margin: 0 2px; border-radius: 999px 999px 999px 0; border: 1px solid currentColor; opacity: .4; }
    #nest-strip span.on { opacity: 1; color: #fff; background: #0f766e; border-color: #0f766e; }
    #nest-strip span.on::after { content: ''; display: inline-block; width: 7px; height: 7px; margin-left: 6px; border-radius: 50%; background: #f5a623; }
    body.nest { font: 17px/1.5 Inter, system-ui, sans-serif; color: #1c1e26; background: #fbfaf6; max-width: 760px; margin: 0 auto; padding: 1.2em; }
    #nest { display: flex; gap: 1.2em; align-items: center; border: 2px solid #d9d6cc; border-radius: 14px; background: #fff; padding: 1em 1.2em; margin-bottom: 1.2em; }
    #nest-bird { flex: none; width: 130px; height: 130px; font-size: 84px; line-height: 130px; text-align: center; }
    #nest-bird img { width: 130px; height: 130px; object-fit: contain; mix-blend-mode: multiply; filter: brightness(1.05); }
    #nest a { color: #0f766e; font-weight: 600; }
    #nest-bird { position: relative; background: inherit; }  /* keeps the picture's white blending into the panel while it animates */
    #nest-bird.evolve { animation: nest-evolve .95s ease-in-out; }
    @keyframes nest-evolve {
      0% { transform: scale(1); }
      15% { transform: scale(1.12) rotate(-9deg); }
      30% { transform: scale(1.18) rotate(9deg); }
      45% { transform: scale(.1) rotate(0); opacity: 0; }   /* the old form is gone here; the new one is swapped in */
      70% { transform: scale(1.35); opacity: 1; }
      85% { transform: scale(.93) rotate(-3deg); }
      100% { transform: scale(1); }
    }
    .nest-spark { position: absolute; left: 50%; top: 50%; width: 9px; height: 9px; margin: -4px; border-radius: 50%; background: #f5a623; pointer-events: none; opacity: 0; animation: nest-spark .85s .35s ease-out forwards; }
    .nest-spark:nth-child(even) { background: #0f766e; width: 6px; height: 6px; }
    @keyframes nest-spark { 0% { opacity: 1; transform: rotate(var(--a)) translateX(0); } 100% { opacity: 0; transform: rotate(var(--a)) translateX(var(--r)) scale(.3); } }
    #nest-strip span.new { animation: nest-pill .9s .35s; }
    @keyframes nest-pill { 40% { transform: scale(1.45); } 100% { transform: scale(1); } }
    @media (prefers-reduced-motion: reduce) { #nest-bird.evolve, .nest-spark, #nest-strip span.new { animation: none; } }
    #nest #nest-strip { text-align: left; padding: 0 0 8px; }
    #nest h2 { margin: 0; font-size: 1.1em; } #nest p { margin: .2em 0 .5em; color: #5c6070; }
    #nest .warn { color: #b42318; font-weight: 600; }
    #nest-try { display: flex; flex-wrap: wrap; align-items: center; gap: .3em .4em; }
    #nest-try span { font-size: .85em; color: #5c6070; margin-right: .2em; }
    #nest-try button { font: inherit; font-size: .85em; padding: .2em .8em; border-radius: 999px; border: 2px solid #d9d6cc; background: #fff; color: #1c1e26; cursor: pointer; }
    #nest-try button:hover { border-color: #0f766e; }
    #nest-try button.hot { border-color: #f0d9a3; background: #fff3d6; color: #b45309; }
    body.nest-chat #nest-try { margin-bottom: .2em; }
    body.nest #input { font: inherit; padding: .5em .7em; border: 2px solid #d9d6cc; border-radius: 8px; width: 70%; }
    body.nest #send { font: inherit; font-weight: 600; padding: .5em 1.2em; border: 0; border-radius: 8px; background: #0f766e; color: #fff; cursor: pointer; }
    body.nest #send:disabled { opacity: .4; cursor: default; }
    body.nest #status { font: 13px 'JetBrains Mono', ui-monospace, monospace; color: #5c6070; }
    body.nest #output { white-space: pre-wrap; min-height: 3em; }
    body.nest-chat #nest { margin: 0; border: 0; border-bottom: 2px solid #d9d6cc; border-radius: 0; padding: .5em max(1.2em, calc((100% - 860px) / 2 + 1.2em)); background: #fbfaf6; flex: none; font: 15px/1.4 Inter, system-ui, sans-serif; color: #1c1e26; }
    body.nest-chat #nest-bird { width: 76px; height: 76px; font-size: 52px; line-height: 76px; }
    body.nest-chat #nest-bird img { width: 76px; height: 76px; }
    body.nest-chat #nest #nest-strip { padding: 0 0 4px; }
    body.nest-chat #nest h2 { font-size: 1em; } body.nest-chat #nest p { margin: .1em 0 .3em; }
    body.nest-chat #loading, body.nest-chat #app { flex: 1; min-height: 0; }
  </style>`);

  const strip = document.createElement("div");
  strip.id = "nest-strip";
  strip.innerHTML = FEATHERS.map(f => `<span data-f="${f}">${f}</span>`).join("");
  const paint = () => strip.querySelectorAll("span").forEach(s => s.classList.toggle("on", earned.has(s.dataset.f)));
  paint();

  const CORE = FEATHERS.slice(0, 4);
  const EMOJI = ["🥚", "🐣", "🐥", "🐤", "🦚"];
  const QUESTS = {
    brain: ["Chapter 1 · A brain", "Import WebLLM and load the model. The egg hatches when the model is ready."],
    ask: ["Chapter 2 · A voice", "It has a brain but can't speak. Fill in ask() so it sends your text to the model.", "What is WebGPU?"],
    voice: ["It spoke! Now make it wait.", "Ask for a long story and watch it stare at you. Then add stream: true and a loop.", "Write a 200-word story about a peacock"],
    character: ["Chapter 3 · A character", "It sounds like every other chatbot. Put a system message first in messages.", "Who are you?"],
    memory: ["Chapter 4 · A memory", "Tell it your name, then ask for it back. It forgets? Keep a chatHistory array.", "My name is Mor.", "What's my name?"],
    done: ["Four feathers. The core loop is yours.", "Next it needs a face: open <a href='5-face.html'>5-face.html</a>."],
    // chat pages: [title, text, ...buttons], picked by page number and what is earned
    "5": ["Chapter 5 · A face", "Same brain, new window. When the model has loaded, say hello."],
    "5done": ["A face. Five feathers.", "Read along in the slides, then make it yours: open <a href='6-yours.html'>6-yours.html</a>.", "Hello!"],
    "6": ["Chapter 6 · Make it yours", "Edit AGENT_NAME, SYSTEM_PROMPT and WELCOME_MESSAGE at the top of your script, reload, and talk to it for three or four turns.", "What should I do today?"],
    "7": ["Chapter 7 · Hands", "Ask something it can't know on its own. Watch it write a tool marker and your code go and fetch the answer.", "What's the weather in Tokyo?", "How tall is the Eiffel Tower?", "What is 12 times 12?"],
    "7done": ["Hands. Six feathers.", "The last one is home: push your 5-face.html to GitHub Pages as index.html."],
  };

  // example prompts for the pills, per quest. Clicking one fills the chat box; then press Send (or Enter).
  // They are written to show off what the chapter just built: long answers for streaming, "who are you" for a character, name and recall for memory.
  const FUN = ["Give me a fun fact about Linux", "Explain Ubuntu in one sentence"];
  const PILLS = {
    brain: ["What is WebGPU?", "Why is the sky blue?", "Name three Ubuntu flavours"],
    ask: ["What is WebGPU?", "Explain a GPU like I'm ten", "Why is the sky blue?", "Name three Ubuntu flavours"],
    voice: ["Write a 200-word story about a peacock", "Describe a day in the life of a Linux penguin", "Explain CPU versus GPU in 150 words", "Write a short poem about open source"],
    character: ["Who are you?", "Tell me about your day", "Give me advice on learning Linux", "What is your favourite food?"],
    memory: ["My name is Mor.", "I'm learning Linux.", "What's my name?", "What am I learning?"],
    "5": ["Hello!", "What is a GPU?", ...FUN],
    "6": ["Who are you?", "What should I do today?", "What can you help me with?", "Give me one tip"],
    "7": ["What's the weather in Tokyo?", "How tall is the Eiffel Tower?", "What is 12 times 12?", "What time is it now?", "Who invented Linux?"],
  };
  PILLS.done = PILLS.memory; PILLS["5done"] = PILLS["5"]; PILLS["7done"] = PILLS["7"];

  const panel = document.createElement("div");
  panel.id = "nest";
  panel.innerHTML = `<div id="nest-bird"></div><div><div id="nest-slot"></div><h2></h2><p></p><div id="nest-try"></div><p class="warn"></p></div>`;
  panel.querySelector("#nest-slot").replaceWith(strip);
  document.body.classList.add(page ? "nest-chat" : "nest");
  document.body.prepend(panel);
  const bird = panel.querySelector("#nest-bird"), tryEl = panel.querySelector("#nest-try");
  const warn = msg => { panel.querySelector(".warn").textContent = msg; };
  let spoke = false, started = false;
  if (!page) addEventListener("DOMContentLoaded", () => { if (!started) document.getElementById("send").disabled = true; });  // no Send until the brain has loaded

  // which picture and which quest the bird shows right now
  const state = () => {
    if (page) {
      const art = earned.has("home") ? "home" : earned.has("hands") ? "hands" : earned.has("face") ? "face" : "memory";
      const key = page === 5 ? (earned.has("face") ? "5done" : "5") : page === 7 && earned.has("hands") ? "7done" : String(page);
      return { emoji: "🦚", art, key, quest: QUESTS[key] };
    }
    const stage = CORE.filter(f => earned.has(f)).length;
    const next = CORE.find(f => !earned.has(f)) || "done";
    const key = next === "voice" && !spoke ? "ask" : next;
    return { emoji: EMOJI[stage], art: ["", "brain", "voice", "personality", "memory"][stage], key, quest: QUESTS[key] };
  };
  let evolving = false;  // while the old form shrinks away, renders wait so the swap lands at the squash point
  const render = () => {
    paint();
    if (evolving) return;
    const { emoji, art, key, quest: [title, text, ...hot] } = state();
    bird.textContent = emoji;  // ponytail: emoji until the story art exists, then the art replaces it
    if (art) {
      const img = new Image();
      img.onload = () => bird.replaceChildren(img);
      img.src = `../assets/story/${art}.png`;
    }
    panel.querySelector("h2").textContent = title;
    panel.querySelector("p").innerHTML = text;
    const label = Object.assign(document.createElement("span"), { textContent: "Click one to fill the box:" });
    tryEl.replaceChildren(label, ...[...PILLS[key]].sort((a, b) => hot.includes(b) - hot.includes(a)).map(t => {
      const b = document.createElement("button");
      b.textContent = t;
      if (hot.includes(t)) b.className = "hot";  // the one this quest suggests
      b.onclick = () => { const input = document.getElementById("input"); input.value = t; input.focus(); };
      return b;
    }));
  };
  // earning a feather: the pill lights, the bird wiggles, shrinks away in a burst of sparks and comes back as its next form
  const earn = f => {
    if (earned.has(f)) return;
    earned.add(f);
    sessionStorage.setItem(key, JSON.stringify([...earned]));
    paint();
    const pill = strip.querySelector(`[data-f="${f}"]`);
    pill.classList.remove("new"); void pill.offsetWidth; pill.classList.add("new");
    bird.classList.remove("evolve"); void bird.offsetWidth; bird.classList.add("evolve");
    for (let i = 0; i < 12; i++) {
      const sp = document.createElement("i");
      sp.className = "nest-spark";
      sp.style.cssText = `--a:${i * 30}deg;--r:${50 + (i % 3) * 14}px`;
      bird.append(sp);
      setTimeout(() => sp.remove(), 1300);
    }
    evolving = true;
    setTimeout(() => { evolving = false; render(); }, 430);
  };
  render();

  if (page) {
    // chat pages: their own script drives the chat, so the bar just watches the page
    const app = document.getElementById("app"), msgs = document.getElementById("chat-messages");
    const seeApp = () => { if (getComputedStyle(app).display !== "none" && page === 5) earn("face"); };
    new MutationObserver(seeApp).observe(app, { attributes: true, attributeFilter: ["style"] });
    seeApp();
    // the page adds a bubble and then renames it to "message tool-call", so watch class changes too
    new MutationObserver(list => {
      if (list.some(m => m.target.classList?.contains("tool-call") || [...m.addedNodes].some(n => n.classList?.contains("tool-call")))) earn("hands");
    }).observe(msgs, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  // what your request to the model says about your agent
  const judge = req => {
    const m = req?.messages || [], got = [];
    if (req?.stream) got.push("voice");
    if (m[0]?.role === "system") got.push("character");
    if (m.some(x => x.role === "assistant")) got.push("memory");
    return got;
  };

  window.nest = {
    judge,
    // files 0-4: called from the last line of your script, hands your ask() and your engine to the page
    start(ask, engine) {
      const inputEl = document.getElementById("input"), sendBtn = document.getElementById("send");
      let pending = [];
      started = true; sendBtn.disabled = false;
      if (engine) {
        earn("brain");
        const c = engine.chat.completions, create = c.create.bind(c);
        c.create = req => { pending.push(...judge(req)); if (!req?.stream) spoke = true; return create(req); };
      }
      const send = async text => {
        text = (text || inputEl.value).trim();
        if (!text || sendBtn.disabled) return;
        inputEl.value = text;
        sendBtn.disabled = true;
        try { await ask(text); } finally {
          pending.forEach(earn); pending = [];
          sendBtn.disabled = false; inputEl.value = ""; inputEl.focus();
          render();
        }
      };
      sendBtn.onclick = () => send();
      inputEl.onkeydown = e => { if (e.key === "Enter") send(); };
      render();
    },
  };

  // things that go wrong in a room full of laptops
  addEventListener("error", e => warn("Error: " + e.message + " (F12 opens the console)"));
  addEventListener("unhandledrejection", e => warn("Error: " + (e.reason?.message || e.reason) + " (F12 opens the console)"));
  (async () => {
    if (!navigator.gpu) return warn("This browser has no WebGPU. Check chrome://gpu.");
    const a = await navigator.gpu.requestAdapter();
    if (!a) return warn("WebGPU is on, but no GPU adapter was found. Check chrome://gpu.");
    if (a.info?.isFallbackAdapter ?? a.isFallbackAdapter) warn("WebGPU is running on the CPU (fallback adapter). It will work, slowly.");
    else if (!a.features.has("shader-f16")) warn("Your GPU does not offer shader-f16, which this model build needs. Ask for help.");
  })();
})();
