# Story art for `slides.html`

Save each image here as a PNG with the exact filename. The deck and the exercise pages pick it up on reload (the exercise pages show `brain`, `voice`, `personality` and `memory` as the bird grows, and fall back to an emoji); a missing file leaves its slot empty (or shows a number badge on the "seven abilities" slide).

The background must be **pure white**. The deck blends white away (`mix-blend-mode: multiply`), so a grey or cream background shows up as a box.

The character is Mor, a peacock chick: the young version of the UbuCon 2026 peacock mascot (`../mascot-2026.svg`, used as is on the closing slide, with the organisers' agreement). Mor is drawn in the deck's own teal and amber so the art sits on the slide theme. If your model takes a reference image, you can pass the mascot for the head, crest and neck shape. Leave the Ubuntu logo and the Ashoka Chakra out of the prompts: image models garble both.

**Generate `character.png` first** and use it as the reference image for every other prompt, so Mor looks the same on every slide. `character.png` itself is not shown in the deck.

No prompt asks for an exact number of tail feathers, because image models miscount. The feather count lives in the strip at the bottom of the slides.

| File | Ratio | Generate at | Shown on slide (1280×720) | Slide |
|---|---|---|---|---|
| `character.png` | 1:1 | 1024×1024 | not shown (reference only) | - |
| `landing-hero.png` | 4:3 | 1600×1200 | about 700×525 on desktop, right half of the first screen | Landing page (`index.html`), falls back to the mascot SVG |
| `egg.png` | 1:1 | 1024×1024 | 160×160 | Landing page, exercise 0 |
| `yours.png` | 1:1 | 1024×1024 | 160×160 | Landing page, exercise 6 |
| `title.png` | 1:1 | 1024×1024 | 330×330, top right | Title (falls back to the mascot SVG if the file is missing) |
| `cold-open.png` | 16:9 | 1920×1080 | up to 640×360, centred | Cold open |
| `epilogue.png` | 16:9 | 1920×1080 | up to 640×360, centred | Epilogue |
| `meter.png` | 1:1 | 1024×1024 | 230×230 | The meter |
| `brain.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 1 + overview |
| `voice.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 2 + overview |
| `personality.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 3 + overview |
| `memory.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 4 + overview |
| `face.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 5 + overview |
| `hands.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 7 + overview |
| `home.png` | 1:1 | 1024×1024 | 290×290 and 120×120 | Ch 8 + overview |

Only the ratio matters; any size at or above these is fine. The seven ability images are also shown at 120 px, so reject anything with fine detail.

## Style (paste after every subject below)

```
Flat editorial spot illustration with a hand-drawn feel. Bold, slightly wobbly charcoal ink outlines of even thickness. Flat colour fills only, limited palette: deep teal (#0f766e), warm amber (#b45309), brick red (#b42318), charcoal (#1c1e26), and plenty of unfilled white. Pure white (#ffffff) seamless background: no room, no wall, no floor, no ground shadow, no gradient, no texture, no border or frame. No text, letters, numbers or logos anywhere. Subject centred with a generous empty margin on all sides.
```

Negative prompt, if your model takes one:

```
text, letters, watermark, logo, photo, 3D render, gradient, drop shadow, grey background, cream background, frame, border, realistic bird, photorealistic feathers, Ubuntu logo, wheel symbol
```

## Character (paste before every subject that mentions Mor)

```
Mor is a small, round, friendly cartoon peacock chick: plump egg-shaped body filled deep teal, a short curved neck, a white patch around one dot eye, a small warm amber beak, thin warm amber legs, small stubby wings, a crest of three thin stalks each ending in a small amber ball on top of the head, and a short stubby tail of only a few small plain feathers.
```

## Subjects

### `character.png` (1:1), reference only

```
Mor standing in side view facing left, wings relaxed, neutral happy expression. Full body, nothing else in the image.
```

### `title.png` (1:1)

Use `character.png` as the reference image. Visual pun on the title: a phone that was never called home.

```
Mor sitting on top of an old-fashioned desk telephone with a round rotary dial, looking out at the viewer with a confident little smile. The telephone's coiled cord trails off to the right and ends in a loose, unplugged connector lying on the ground. The telephone body is filled warm amber, the handset left white. Above Mor's head, a small speech bubble containing only a brick-red diagonal line struck through it. Very simple shapes, readable at thumbnail size.
```

### `cold-open.png` (16:9)

```
Mor sitting at an open laptop, seen from the side, holding up the unplugged end of a network cable in one wing and looking at the laptop screen. The laptop screen is large and shows one empty speech bubble filled deep teal. Above the laptop floats a small cloud outline with a brick-red diagonal line struck through it.
```

### `epilogue.png` (16:9)

Use `cold-open.png` as the reference image as well.

```
Mor, now grown up, standing proudly beside an open laptop with a huge tail fanned out wide behind in a full semicircle. Every tail feather ends in a round eye spot: warm amber centre with a deep teal ring. The laptop screen shows one deep teal speech bubble. An unplugged network cable lies on the ground in front. Chest puffed out, head held high.
```

### `meter.png` (1:1), the villain

```
An old-fashioned taxi meter box with a round dial and a spinning needle, a coin slot on top, and a paper receipt curling out of the bottom covered in squiggle lines instead of writing. A single key hangs from the side on a ring. Meter body filled brick red, receipt left white, key filled warm amber. Very simple shapes, readable at thumbnail size.
```

### `brain.png` (1:1), load the model

```
A large white egg with a jagged crack across the top. Through the crack, Mor's two dot eyes and the tip of an amber beak peek out. A small piece of shell lies beside the egg. Three short teal spark lines above the egg. Very simple shapes, readable at thumbnail size.
```

### `voice.png` (1:1), chat and streaming

```
Mor standing with beak wide open, mid-speech, one wing raised. A large empty speech bubble filled deep teal comes from the beak, followed by three small dots trailing off to the right. Very simple shapes, readable at thumbnail size.
```

### `personality.png` (1:1), system prompt

```
Mor wearing a big pirate hat and an eye patch, standing proudly with one wing on the hip. The hat is filled charcoal with a warm amber band and has no skull or symbol on it. Very simple shapes, readable at thumbnail size.
```

### `memory.png` (1:1), chat history

```
Mor holding an open notebook in both wings and writing in it with a pencil. The notebook pages show a few squiggle lines instead of writing. A short stack of two more notebooks sits beside Mor. Notebook cover filled warm amber. Very simple shapes, readable at thumbnail size.
```

### `face.png` (1:1), chat UI

```
Mor leaning out of a rounded rectangular window frame, like a phone screen, waving one wing. Inside the frame, above Mor, two rounded chat bubbles: one filled deep teal on the left, one filled warm amber on the right, both empty. Very simple shapes, readable at thumbnail size.
```

### `hands.png` (1:1), tools

```
Mor holding a magnifying glass up in one wing and a wrench in the other, looking through the magnifying glass with one enlarged eye. Magnifying glass rim filled warm amber, wrench filled deep teal. Very simple shapes, readable at thumbnail size.
```

### `home.png` (1:1), deploy

```
Mor walking to the right with a small backpack, looking back over the shoulder and waving goodbye with one wing. Behind Mor on the left, the two halves of a broken eggshell. Backpack filled warm amber. Very simple shapes, readable at thumbnail size.
```

### `landing-hero.png` (4:3), landing page

Use `character.png` as the reference image. It is the biggest picture on the landing page, so give it the most care. The five stages climb a staircase because a flat row of five birds would be too wide for a 4:3 frame.

```
Five stages of Mor climbing a staircase of five simple rounded stone steps that rise from the bottom left to the top right, each stage standing on its own step and each a little bigger than the last. Step 1: an intact egg. Step 2: a chick hatching from a cracked egg, shell on its head. Step 3: a plump chick with a three-ball crest. Step 4: a young peacock with a small half-open tail of a few feathers. Step 5, at the top right and the largest: a proud adult peacock with its tail fully fanned out behind in a wide semicircle, every feather ending in an eye spot with a warm amber centre and a deep teal ring. All five birds face right, toward the top. Plenty of unfilled white around the staircase.
```

### `egg.png` (1:1), exercise 0

```
A single plain white egg, intact and uncracked, resting in a small simple nest of charcoal twigs. Three short deep teal lines above the egg showing it is about to hatch. Very simple shapes, readable at thumbnail size.
```

### `yours.png` (1:1), exercise 6

```
Mor wearing a deep teal sweatband around the head and holding a small dumbbell in one wing, mid-lift, with an eager grin. A few short amber motion lines beside the dumbbell. The dumbbell is filled warm amber. Very simple shapes, readable at thumbnail size.
```
