# Danny character animation – Task 2
**Status: TASK 2 COMPLETE / VERIFIED as an experimental cutout motion system.** Six states were rendered in headless Chromium with the exact original image; source QA run `43235773044`, live functional/visual preview QA run `43236119621`. The animation is a first-pass puppet, not final hand-drawn cinematic acting.
Artwork: nine independent original-image layer masks/pivot transforms from [the locked exact sheet](./CANONICAL_CHARACTER.md). One active frame renderer at 30 Hz, image read only once, hardware accelerated Three.js texture. The rig is **not** frame-by-frame recoloring or a generic new character.

State map:
- `idle`: subtle breathing and head/cape movement
- `run`: opposing leg/arm swings and scarf trailing
- `jump`: legs tucked / torso lean
- `fall`: airborne limb pose via existing game state
- `attack`: weapon angular sweep synchronized to 8-frame existing combat attack timer; collision timing unchanged
- `block`: arm brace and raised blade
- `hit` / damage: torso/head recoil, limbs thrown out briefly; existing damage code remains authoritative

Animation poses intentionally use a limited-angle cutout approach for *prototype fidelity* with the approved sheet. **Visual QA correction:** The first actually rendered six-state sheet exposed a sword/grip detachment during animated poses. The prototype now uses a hierarchical wrist attachment so the sword follows the rotated sword arm, with stronger run/jump silhouettes and a modestly larger in-world figure. These are visual-only changes; no collision or attack timing code is altered.

Known limitations: cutout edges, hand-drawn original frontal pose, 2.5D flattening at large camera yaw, and lack of individually illustrated in-betweens. These limitations should be judged visually using the [character lab](../../preview/danny/character-lab.html). No claim of full cinematic final animation quality.
