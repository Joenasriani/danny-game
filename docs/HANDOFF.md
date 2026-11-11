# Danny – independent game handoff

**Title:** Danny
**Subtitle:** The man who Sword the world!

**Authority:** This repository only. Based on `Joenasriani/stickman` commit `b7a7e2737a9087154f50bead2f159e425fcada34`, whose source SHA-256 is `320413936fca080b1b2fbb3285e0b094e32f736ff0dd90b72c65543a3f85ad4f`.

## Initial changes
Only browser title and intro branding were updated. Gameplay level list 1–16, new Level 4, enemies, physics, touch controls, camera gestures, and assets stay identical to Stickman source.

## Protected other project
Do not push or open PRs against `Joenasriani/stickman`. Do not reuse its deployment destinations. Danny must have its own game identity, issue tracker, release and deployment setup.

## Visual roadmap
Living Sketch: evolve line-based stickmen toward expressive hand-drawn cartoon figures. This is more than a shader for detailed character geometry, so first prototype one isolated 16-level-compatible character scene. Preserve mechanical hitboxes, controls and mobile performance.

## QA
All 16 levels need manual desktop/mobile verification, including intro, transitions, audio, controls, combat, exit, game-over, and the Level 3–4–5 sequence. Current syntax/hash checks are not gameplay QA.

## Asset transfer
The music file is larger than the GitHub connector's direct transfer limit; a temporary workflow `.github/workflows/bootstrap-danny-music.yml` is included to fetch the unchanged file by pinned source commit and remove itself. Confirm its GitHub Actions success and the music blob SHA before claiming the repository is complete.
