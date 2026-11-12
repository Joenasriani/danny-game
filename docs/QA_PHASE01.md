# Danny – Phase 01 Task 2 Gameplay QA Register

**Status:** PARTIAL / OPEN – live Chromium tests and input-driven Level 1 complete; full 16-level/manual-device QA not verified
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

## First Chromium QA results (2026-11-12)
The first supported Ubuntu 24.04 browser run reached actual Chromium, loaded the live page, rendered a canvas, dismissed the intro, displayed HUD, and exercised keyboard/touch smoke on desktop, emulated mobile portrait/landscape and tablet – **all without uncaught page exceptions**. The run reported a false negative for `levelOne` only: it checked `body.innerText` after the 950-ms level banner was hidden, so the hidden banner was correctly excluded. Corrected the test to inspect the banner's persistent `textContent`. Pending a clean rerun; full level completion and physical hardware are still unverified. See GitHub Actions run `43216138794`.

## 16-level runtime and transition test (pending evidence)

`tools/qa_level_runtime.mjs` is a test-only **live Chromium** check which loads the real published game, temporarily instruments the HTML response in its isolated test browser (without editing GitHub Pages or `index.html`), and verifies that each of 16 levels can be constructed with an exit, the expected number of enemies, safe initialization, input responses, direct-manipulation camera sign, and scripted transition logic (Levels 3→4→5, final victory). Scripted warps/exit teleports **are not actual platform traversal or proof of jump reachability**. Headless results must be checked from GitHub Actions before recording passes.

## First all-level Chromium run (2026-11-12)
Headless Chromium actually constructed **all 16 levels**, and every level passed six runtime checks: correct index/name, one exit door, platform geometry, exactly N enemies on Level N, and no premature game-over. ArrowRight movement, jump, combat safety, camera drag sign and scripted 3→4→5 transitions also passed with zero page exceptions. The only reported failure was `finalVictory` because the test teleported to the level's *nominal exit metadata*, whereas generated premium levels place their authoritative physical exit using `createDoor` (its y may differ). The test now targets the **instantiated exit door** instead of the descriptive metadata; pending rerun. These are controlled runtime tests, not natural level traversal. See run `43216896316`.

## Verified Chromium evidence (2026-11-12, current automated baseline)

**GitHub Actions run:** https://github.com/Joenasriani/danny-game/actions/runs/43217241904 (PASS for source `387c06ce3c99c2cb8440a174929dbe7a5ee03d72`). The workflow ran against the actual public Pages URL and its two browser jobs passed:

- **Published-game smoke:** Chromium loaded Danny's intro and 3D canvas with no page exceptions at desktop (1440×900), emulated mobile portrait (390×844), emulated mobile landscape (844×390), and emulated tablet (768×1024). Start button dismissed intro; HUD and touch controls were present; desktop keyboard inputs exercised.
- **Live 16-level runtime:** Separately, real Chromium constructed all sixteen levels in an isolated test browser with temporary test-only instrumentation (the deployed game was NOT modified). Every level had the correct index/name, an exit door, nonzero platform geometry, the exact expected enemy count (Level N → N enemies), and no premature game-over.
- **Controls and transitions in test browser:** ArrowRight moved the player, ArrowUp produced a jump, attacking produced no uncaught error, camera dragging applied the locked world-grab yaw/pitch direction, scripted exits advanced Levels 3→4→5, and the final exit triggered the victory state.
- **Source and publishing:** the read-only validation workflow and GitHub Pages branch deployment also passed for the source test commit.

**Explicit coverage boundary:** All-level runtime construction and **scripted exit teleports** are not natural playthroughs. Emulated touch viewports are not physical-device tests. Audio audibility, sustained gameplay performance, platform reachability, combat fairness, all gesture types and completion of every level by normal input are NOT VERIFIED. These remain Phase 01 Task 2 acceptance checks.

## Visual review

See [Visual review instructions](VISUAL_REVIEW.md) and, after capture completes, [screenshots of the actual deployed game](visual-evidence/README.md). Screenshot QA addresses layout and visual communication, not full 16-level playability. **Actual-game capture succeeded** in GitHub Actions run `43218599518` and auto-committed the gallery at `66fb49003b89090d2f44569b9ab856bcba85e682` (7 PNG captures: desktop intro, desktop Levels 1/4/16, emulated portrait, emulated landscape and emulated tablet Level 1). Images are now available for founder inspection; **visual approval has not been granted**. Full natural gameplay and real-device checks remain OPEN.

## Input-driven traversal probe – experimental (pending evidence)

A separate [Level 1 Chromium input-driven probe](../tools/qa_level01_play.mjs) exercises real ArrowRight and ArrowUp browser inputs against the live Danny game, with limited read-only state instrumentation and a recorded video/screenshot artifact. It uses three targeted jump timing strategies and reports actual level progression. This **cannot substitute for full human playthrough, all sixteen levels or physical-device testing**. Do not record a pass unless the separate GitHub Actions run succeeds and the input trace supports the result. The experiment never modifies the published game source.

## Input-driven live Level 1 completion – VERIFIED (2026-11-12)

- **Actual GitHub Actions browser run:** https://github.com/Joenasriani/danny-game/actions/runs/43228950032 – all job steps passed.
- **Visual evidence:** [see the animated playthrough in the visual QA gallery](visual-evidence/README.md) (after the publish workflow succeeds), or [download recorded Playwright game video, screenshot and state trace](https://github.com/Joenasriani/danny-game/actions/runs/43228950032/artifacts/13947694591) (GitHub Actions artifact; may require GitHub login; retained 30 days).
- **Test methodology:** The real published game was controlled using browser keyboard events `ArrowRight` and `ArrowUp`; game code/physics were **not** modified and **no teleport** was used. Temporary browser-only read-only instrumentation reported player location and level. One run completed Level 1 and advanced naturally to **Level 2**, with no uncaught JavaScript errors and five remaining HP.
- **Observed checkpoints:** first jump at x≈−3.04, grounded x≈3.39 after first jump, then reached Level 2 after second jump. The probe is a **computer-controlled playthrough of Level 1 only**. It is NOT a human desktop playthrough, a physical mobile-device test, a Level 4 reachability verification, an entire 16-level playthrough, a sound quality assessment, or creative approval.
- **Next gate:** Natural progression of remaining levels and physical-device touch/audio still OPEN. Retain Phase 01 Task 2 as **PARTIAL** and do not advance to the character-construction task.

## Phase gate

**Task 2 cannot be marked COMPLETE until the interactive matrix is evidenced.** Successful source validation, an HTML page response, or timed-out browser automation are not equivalent to gameplay verification. The owner may supply actual-device test reports; a capable interactive browser environment may independently perform the checks. Do not begin Task 3 or later phases until Task 2 is rechecked and completed, per founder's sequential execution instruction.

No visual/character upgrades are implemented by this QA register.
