# Danny character animation – Task 2
**Status: source implemented; real browser state QA pending.**
Artwork: nine independent original-image layer masks/pivot transforms from [the locked exact sheet](./CANONICAL_CHARACTER.md). One active frame renderer at 30 Hz, image read only once, hardware accelerated Three.js texture. The rig is **not** frame-by-frame recoloring or a generic new character.

State map:
- `idle`: subtle breathing and head/cape movement
- `run`: opposing leg/arm swings and scarf trailing
- `jump`: legs tucked / torso lean
- `fall`: airborne limb pose via existing game state
- `attack`: weapon angular sweep synchronized to 8-frame existing combat attack timer; collision timing unchanged
- `block`: arm brace and raised blade
- `hit` / damage: torso/head recoil, limbs thrown out briefly; existing damage code remains authoritative

Animation poses intentionally use a limited-angle cutout approach for *prototype fidelity* with the approved sheet. Known limitations: cutout edges, hand-drawn original frontal pose, 2.5D flattening at large camera yaw, and lack of individually illustrated in-betweens. These limitations should be judged visually using the [character lab](../../preview/danny/character-lab.html). No claim of full cinematic final animation quality.
