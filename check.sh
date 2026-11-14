#!/bin/sh
# Self-check for the exercise files: runs every checkpoint against a fake model in headless Chrome
# and checks which feathers light up. Usage: ./check.sh   (set CHROME=... if it isn't found)
cd "$(dirname "$0")" || exit 1
CHROME=${CHROME:-$(command -v google-chrome chromium chromium-browser "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" | head -1)}
T=$(mktemp -d); cp -R exercise "$T/exercise"
cat > "$T/exercise/fake.js" <<'J'
export async function CreateMLCEngine(id, o) {
  o?.initProgressCallback?.({ text: "fake model", progress: 1 });
  return { resetChat() {}, runtimeStatsText: async () => "", chat: { completions: { async create(req) {
    const last = req.messages.at(-1).content;
    const text = /TOOL RESULT/.test(last) ? "It is 144." : /12 times/.test(last) ? '[TOOL calc "12*12"]' : "reply to " + req.messages.length + " messages";
    if (!req.stream) return { choices: [{ message: { content: text } }] };
    return (async function* () { for (const w of text.split(" ")) yield { choices: [{ delta: { content: w + " " } }] }; })();
  } } } };
}
J
DRIVER='<script type="module">
  const btn = document.getElementById("send"), input = document.getElementById("input"), app = document.getElementById("app");
  const idle = () => new Promise(r => { const t = setInterval(() => { if (!btn.disabled && (!app || getComputedStyle(app).display !== "none")) { clearInterval(t); r(); } }, 20); });
  const pill = document.querySelector("#nest-try button");
  pill.click();
  const filled = input.value === pill.textContent && pill.textContent.length > 3;
  input.value = "";
  for (const q of ["My name is Mor.", "What is 12 times 12?"]) { await idle(); input.value = q; btn.click(); }
  await idle();
  document.title = !filled ? "RESULT=PILL-DID-NOT-FILL=" : "RESULT=" + [...document.querySelectorAll("#nest-strip .on")].map(s => s.dataset.f).join(",") + "=";
</script>'
for f in "$T"/exercise/*.html; do
  sed -i.bak 's#https://esm.run/@mlc-ai/web-llm@[0-9.]*#./fake.js#' "$f"; printf '%s\n' "$DRIVER" >> "$f"
done
PORT=$((20000 + $$ % 20000))  # varies per run: a fixed port silently fails when something else holds it
python3 -m http.server $PORT --directory "$T" >/dev/null 2>&1 & SRV=$!; sleep 1
fail=0
check() {
  got=$("$CHROME" --headless --disable-gpu --virtual-time-budget=8000 --dump-dom "http://localhost:$PORT/exercise/$1" 2>/dev/null | sed -n 's/.*RESULT=\([^=]*\)=.*/[\1]/p' | head -1)
  if [ "$got" = "[$2]" ]; then echo "ok    $1  $got"; else echo "FAIL  $1  got ${got:-nothing} want [$2]"; fail=1; fi
}
check 0-egg.html       ""
check 1-brain.html     "brain"
check 2-voice.html     "brain,voice"
check 3-character.html "brain,voice,character"
check 4-memory.html    "brain,voice,character,memory"
check 5-face.html      "brain,voice,character,memory,face"
check 6-yours.html     "brain,voice,character,memory,face"
check 7-hands.html     "brain,voice,character,memory,face,hands"
kill $SRV 2>/dev/null; wait $SRV 2>/dev/null; rm -rf "$T"; exit $fail
