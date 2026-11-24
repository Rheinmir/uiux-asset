# Mascot bot: handoff for Hang

Live page: https://uiux.giatbh.io.vn/patterns/mascot.html

A small round bot drawn with pure HTML and CSS. It has no images, fonts or JS. Every card on the page has a "Chép" (Copy) button. The button copies a standalone snippet: base CSS + state CSS + a reduced-motion rule + HTML.

The motion ideas come from the Bitmap Studio storyboard video for the Grok Bot and Allo launch. The character is our own design. Do not swap in the Grok or Allo character or brand.

## States

| id | Name | What it does |
|---|---|---|
| `pop-in` | Pop In | A dot grows with overshoot, then the eyes open |
| `idle-bob` | Idle Bob | Slow float, breathing squash, blink every 4.2 s |
| `blink` | Double Blink | Two quick blinks |
| `look-around` | Look Around | Eyes look left, right, then up |
| `fly-land` | Fly In & Land | Stretched smear flies in, squashes on landing |
| `happy-hop` | Happy Hop | Squash, jump, happy ^^ eyes, two sparkles |
| `gear-up` | Gear Up | Headphones fly in and land on the head |
| `wink` | Wink | One eye closes, small head tilt |
| `head-tilt` | Head Tilt | Tilts left and right, "?" pops up |
| `typing` | Typing Dots | Bot with a bubble of three bouncing dots |
| `msg-pop` | Message Pop | Bubble pops out, the dots turn into text |
| `inline-words` | Inline Word Reveal | Words rise in one by one around an inline bot |
| `working` | Working | Eyes scan, antenna LED pulses, ring spins |
| `sleeping` | Sleeping | Closed eyes, slow breathing, floating z's |
| `error` | Error Shake | X eyes, red LED, head shake |
| `wave` | Wave Hello | Hand waves, happy eyes |
| `bye-drop` | Drop Out | Small jump up, falls out, pops back |
| `sketch-render` | Sketch to Render | Dashed outline fills in from a corner |
| `wordmark` | Wordmark Reveal | Bot pops, letters fade in from blur |
| `peek-up` | Peek Up | Rises from an edge, looks around, sinks |

## Recommended mapping to agent status

| Agent status | State(s) |
|---|---|
| idle / online | `idle-bob` (list rows can use `blink` only, it is cheaper) |
| thinking / reading context | `look-around`, or `head-tilt` when it needs input from a human |
| writing a reply | `typing` |
| running a tool / working | `working`; play `gear-up` once when a task is claimed |
| done | `happy-hop` once, then back to `idle-bob` |
| error / disconnected | `error` |
| offline / sleeping | `sleeping` |
| joins a room / spawned | `pop-in` or `fly-land` once |
| leaves a room / session ends | `bye-drop` once |
| first message in a new chat | `wave` |
| new message arrives | `msg-pop` |
| loading / skeleton | `sketch-render` |
| empty states, onboarding | `inline-words`, `wordmark`, `peek-up` |

The page loops all states for the demo. In the app, play the one-shot states (`pop-in`, `fly-land`, `happy-hop`, `gear-up`, `bye-drop`, `wave`, `msg-pop`) once. Set `animation-iteration-count: 1` and `animation-fill-mode: both`, or remove the class after `animationend`.

## CSS variable API

Set the variables on `.bot` or on any parent. Each one has a default.

| Variable | Default | Use |
|---|---|---|
| `--bot-size` | `64px` | Size of the body. All parts use `em`, so everything scales. Any length works (`24px`, `1.5em`). |
| `--bot-body` | `#232a3b` | Body, antenna and hand colour |
| `--bot-eye` | `#fff` | Eye colour |
| `--bot-accent` | `#ff7a45` | Antenna LED, headphones, bubbles, sparkles, spinner ring |
| `--bot-ink` | `#15171a` | Text and z's beside the bot (some states only) |

Per-agent colour example: `<div class="bot idle" style="--bot-accent:#2bb673;--bot-size:32px">`. For dark UI, use a light `--bot-body` and a dark `--bot-eye`. The demo page does this in dark theme.

Markup:

```html
<div class="bot idle"><div class="bot-b"><i class="bot-ant"></i><div class="bot-f"><i class="bot-e"></i><i class="bot-e"></i></div></div></div>
```

To change state, change the class on `.bot` (`idle`, `work`, `sleep`, `err`, `hop`, and so on). `gear-up`, `sleeping` and `wave` add one extra child element. Get the exact HTML from the Copy button.

## Size and performance

- Pure CSS. No JS, images or fonts. Each snippet is about 1–2.5 KB unminified.
- Most motion uses `transform` and `opacity` only, so it runs on the compositor. Exceptions: `working` and `error` animate `box-shadow` and `filter` on the small antenna LED. `msg-pop` animates `width` on one bubble. `sketch-render` animates `clip-path`. These are small areas, but avoid them in long lists.
- In a long agent list, use `blink` or a static bot for off-screen rows. Keep at most a few looping states animated at the same time.
- Keyframe names all start with `bot-`. Do not paste the same snippet twice. If two snippets have a keyframe with the same name (for example `bot-led` in `working` and `error`), the definitions are identical.
- `prefers-reduced-motion: reduce` is handled. Each snippet ends with a rule that turns off every animation. The bot then shows its static end state (eyes open, headphones on, z's visible, sparkles visible, bubble with text).
- Tested in Chromium. The page uses only standard CSS (`inset`, `clip-path`, `outline` that follows the border radius).
