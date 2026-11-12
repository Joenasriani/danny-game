# DANNY – SEPARATE PLAYABLE ANIMATION PREVIEW

**Review target:** [Play Danny – animated Level 1](https://joenasriani.github.io/danny-game/preview/danny/)  
**Character lab:** [Inspect all six animations](https://joenasriani.github.io/danny-game/preview/danny/character-lab.html)  
**Original full 16-level game:** https://joenasriani.github.io/danny-game/

## Visual iteration after actual screenshots
An independent inspection of real six-state rendered PNGs identified a floating sword and overly subtle poses. A second live screenshot inspection showed the illustrated boy still too small at the inherited original game's camera distance. **The isolated preview now opens with closer cinematic camera framing (desktop/landscape distance 9, portrait 18)**, with the original wider camera accessible from WIDE VIEW. We corrected the sword to follow the articulated wrist, increased arm/leg swing, increased cosmetic character size and added **DANNY / MOTION LAB → ZOOM DANNY** to inspect the character in the actual Level 1 game. These changes are entirely visual. Branch QA passed as GitHub Actions run `43234778003`. After promotion to Pages, verify that the new live build passes independently.

## Exactly what changed
Founder-approved reference PNG was kept verbatim. A nine-layer illustrated cutout puppet is assembled from that real image. A 2.5D CanvasTexture plane updates on alternate game frames and switches poses using existing playerState/stateFrame/attackTimer. The original root 16-level game is unchanged. A dedicated Level 1 HTML copy uses the original world, enemies, platform collisions, movement, sword timing, HUD, music and touch inputs; only its player graphic and a motion-preview inspector were added. It has its own browser address.

**Four-step isolated prototype status: COMPLETED / INDEPENDENTLY RECHECKED (2026-11-12).** Canonical original sketch 9-layer rig, six visual animation states, unchanged-mechanics Level 1 integration, and an independent live GitHub Pages URL all verified. Branch headless browser QA: [run 43235773044](https://github.com/Joenasriani/danny-game/actions/runs/43235773044). Live public Pages deployment, correct original art, Level 1, start, keyboard/touch controls, cinematic close/wide camera toggle, no uncaught errors across Chromium desktop and emulated mobile portrait/landscape: [run 43236119621](https://github.com/Joenasriani/danny-game/actions/runs/43236119621). **Founder visual quality approval remains pending; this is NOT a finished game or Phase 01 QA closure.**

## Independent checks
- Task 1 rig, canonical PNG SHA256, original game source integrity: Passed development branch CI.
- Task 2 original-image art rendering and six action states in Chromium: Passed [GitHub Actions 43233203223](https://github.com/Joenasriani/danny-game/actions/runs/43233203223).
- Task 3 Level 1 original mechanics + new character, desktop and emulated mobile portrait/landscape, motion lab, attack, damage, jump: Passed same branch run, zero reported page exceptions.
- Task 4 separate GitHub Pages path: **COMPLETE / INDEPENDENTLY VERIFIED** at `https://joenasriani.github.io/danny-game/preview/danny/`. Published GitHub Pages run `43236117157` and live Playwright Chromium run `43236119621` both PASS. Actual rendered screenshots: [GitHub Actions visual evidence](https://github.com/Joenasriani/danny-game/actions/runs/43236119621/artifacts/13952381959).

## Important limitations
A direct cutout from one frontal hero illustration is **not a full skeletal 3D model**. Expect visible cut boundaries or flatness at large camera yaw, modest pose changes, and imperfect accessories relative to final animation. No claim of completed art direction, final character appearance, mobile physical-device performance, soundtrack audibility or full 16-level release. Founder visual review is the next design-quality gate. Phase 01 unrelated QA remains open.
