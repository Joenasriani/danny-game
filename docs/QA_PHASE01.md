# Danny – Phase 01 Task 2 Gameplay QA Register

**Status:** OPEN / NOT VERIFIED
**Date:** 2026-11-12
**Authority:** Frozen [ROADMAP.md](ROADMAP.md), Phase 01 Task 2. This register is evidence tracking, not approval of changes to gameplay.
**Test URL:** https://joenasriani.github.io/danny-game/
**Game baseline:** 16 levels; game source unchanged since independent import.

## Verified evidence

| Check | Result | Evidence / limits |
| --- | --- | --- |
| Independent GitHub Pages publishing | PASS | Native `pages build and deployment` run `43211005975` completed successfully, source commit `92a1dcb94b6bd97138b6014c32a801baa83c293c` |
| Public page response | PASS | Fresh independent URL fetch returned HTTP 200 and `text/html` on 2026-11-12 |
| Public title / subtitle / intro markup | PASS | Page response contained `Danny`, `The man who Sword the world!`, `START QUEST` and level/HUD markup |
| Source and asset integrity / syntax | PASS | `Verify Danny (read only)` GitHub Action succeeded for `92a1dcb94b6bd97138b6014c32a801baa83c293c`; unchanged game code and six matching source assets |
| Headless browser interactive gameplay | NOT VERIFIED | Two externally hosted browser-interaction attempts timed out before returning usable interaction results; timeout is *not evidence of a game defect* |

## Required interactive QA matrix – all OPEN

- [ ] Desktop: intro → START QUEST → game rendering/canvas and console free of critical errors
- [ ] Desktop: left/right movement, jump, sword attack, block, damage/healing, restart, camera drag, sound/mute
- [ ] Desktop: reach the exit and successfully finish Levels 1–16 individually
- [ ] Desktop: specifically verify the Level 3 → 4 → 5 sequence and rebuilt Level 4 platform reachability/enemies
- [ ] Desktop: game-over/restart, level transitions, ending, no unexpected blocked progression
- [ ] Mobile portrait: intro, canvas scale, touch movement/jump/attack/block, one-finger camera direct manipulation, two-finger pan/pinch, no clipped HUD
- [ ] Mobile landscape: same inputs, scaling and gameplay readability
- [ ] Tablet/responsive: safe layout and working input
- [ ] Audio: music/sound effects, autoplay gating, mute and failures
- [ ] Capture browser/device, viewport, timestamp, tested level, expected result, actual result, reproduction steps for defects

## Automated real-browser smoke test (pending evidence)

A desktop/mobile-emulation Playwright smoke script is provided at `tools/qa_browser.mjs` and the on-demand/browser-change workflow `.github/workflows/qa-browser.yml`. It loads the **published** GitHub Pages URL in headless Chromium and tests title, WebGL canvas sizing, intro-to-level transition, HUD, representative keyboard controls, touch-button visibility, and uncaught page exceptions at four viewport profiles. **First attempted run failed before browser launch because ubuntu-latest resolved to Ubuntu 26.04, unsupported by Playwright 1.56.1; pinned ubuntu-24.04 for compatible headless Chromium. This was a test-environment issue, not evidence of a game defect. The workflow is not marked passing until a corrected GitHub Actions run succeeds.** Even after passing, emulated mobile is not a real-device check; one-level smoke is not 16-level progression and does not verify audio playback quality.

## Phase gate

**Task 2 cannot be marked COMPLETE until the interactive matrix is evidenced.** Successful source validation, an HTML page response, or timed-out browser automation are not equivalent to gameplay verification. The owner may supply actual-device test reports; a capable interactive browser environment may independently perform the checks. Do not begin Task 3 or later phases until Task 2 is rechecked and completed, per founder's sequential execution instruction.

No visual/character upgrades are implemented by this QA register.
