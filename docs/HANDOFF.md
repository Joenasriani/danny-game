# Danny – independent game handoff

**Title:** Danny
**Subtitle:** The man who Sword the world!

**Authority:** This repository only. Based on `Joenasriani/stickman` commit `b7a7e2737a9087154f50bead2f159e425fcada34`, whose source SHA-256 is `320413936fca080b1b2fbb3285e0b094e32f736ff0dd90b72c65543a3f85ad4f`.

## Founder-directed isolated animated preview (2026-11-12)
The founder explicitly commissioned a **four-task animation prototype**: 9-layer character construction, six animated action states, source-preserving Level 1 integration, and independent live preview. Source and six-state in-browser QA passed on development branch `feature/danny-living-sketch-level1` (GitHub Actions run `43233203223`) before promotion to the segregated `preview/danny/` subtree in main. The original root `index.html` must remain bit-for-bit unchanged. Preview: https://joenasriani.github.io/danny-game/preview/danny/ (separate from original game URL). **Do not equate the founder's prototype request with authorization to mark Phase 01 QA complete.** Verify Pages publication and the actual live preview independently before asserting deployment passed.

## Visual QA refinement after actual rendered-state inspection
Initial real six-state captures exposed a disconnected weapon grip and small in-world scale. The branch `feature/danny-living-sketch-level1` was corrected to use the sword-hand's transformed wrist, stronger motion silhouettes, a slightly larger cosmetic plane and a close-up camera default with an optional switch back to the original wide distance. The new branch revision passed checks as GitHub Actions run `43235773044`. The **branch CI passed** again in run `43234778003`. This change is deployed only within the isolated `preview/danny/` files; original root gameplay source and hitboxes remain unchanged. The **final v2 live Pages recheck passed**: native Pages and read-only integrity workflows passed on commit `d9ba277747a70b45d31205c293b9876aa2524892`; live Chromium run `43236119621` verified the real published character, desktop/mobile layouts, actual controls and close/wide camera switch.

**Four-step isolated prototype status: COMPLETED / INDEPENDENTLY RECHECKED (2026-11-12).** Canonical original sketch 9-layer rig, six visual animation states, unchanged-mechanics Level 1 integration, and an independent live GitHub Pages URL all verified. Branch headless browser QA: [run 43235773044](https://github.com/Joenasriani/danny-game/actions/runs/43235773044). Live public Pages deployment, correct original art, Level 1, start, keyboard/touch controls, cinematic close/wide camera toggle, no uncaught errors across Chromium desktop and emulated mobile portrait/landscape: [run 43236119621](https://github.com/Joenasriani/danny-game/actions/runs/43236119621). **Founder visual quality approval remains pending; this is NOT a finished game or Phase 01 QA closure.**

## Locked character-design asset (2026-11-12)

Read [Danny's canonical character sheet](character/CANONICAL_CHARACTER.md) and visually inspect [the exact original approved PNG](character/reference/DANNY_CANONICAL_CHARACTER_SHEET.png) **before designing, rigging, or animating Danny**. SHA-256 `e4adce3822c367516ae2c5d6ca3d03b426e67feace021be5f8c92eda83735fe2`. This precise sheet, not a stylistically similar substitute, is the visual identity to preserve. A complete technical turnaround and animation-ready character bible remain Phase 01 deliverables; an **animated playable Danny prototype is Phase 02**, not an already delivered feature. The source game remains unchanged.

## Locked authority and mandatory commit process
Read [CREATIVE_DIRECTION_LOCK.md](CREATIVE_DIRECTION_LOCK.md) **before any Danny design or code work**. It locks Danny as a **boy** and the Living Sketch cinematic direction. The player controls Danny; the director controls the presentation. Cinematic storytelling must never obscure gameplay or compromise input responsiveness.

**Mandatory per-commit synchronization:** Whenever implementation changes, update all affected README, handoff, manifest hashes/status, QA and related guidance **in the same commit**; confirm HEAD and automated checks afterward. Record unverified items explicitly. Founder-locked decisions require explicit approval to revise. The canonical creative plan is the linked file, not the old short roadmap below.

## Active three-phase execution plan
The authoritative implementation phases are in [ROADMAP.md](ROADMAP.md): **Phase 01 – The Birth of Danny (in progress); Phase 02 – The Living Sketch (not started); Phase 03 – The World of Danny (not started)**. The roadmap maps all previously locked steps and gates without changing [CREATIVE_DIRECTION_LOCK.md](CREATIVE_DIRECTION_LOCK.md). Start with Danny-only deployment and desktop/mobile baseline QA and character bible; do not jump to all-level visual rollout.

## Founder-approved roadmap freeze (2026-11-12)
[ROADMAP.md](ROADMAP.md) is **FROZEN** as Danny's current three-phase execution baseline: Phase 01 → Phase 02 → Phase 03, with explicit founder approval required for changes or advancing through gates. Current next work is Phase 01 technical baseline and Danny-only deployment verification, then desktop/mobile QA and character-bible review. Do not interpret a frozen roadmap as completed gameplay/visuals.

## Initial changes
Only browser title and intro branding were updated. Gameplay level list 1–16, new Level 4, enemies, physics, touch controls, camera gestures, and assets stay identical to Stickman source.

## Protected other project
Do not push or open PRs against `Joenasriani/stickman`. Do not reuse its deployment destinations. Danny must have its own game identity, issue tracker, release and deployment setup.

## Visual production scope
The implementation details, acceptance gates and level rollout sequence live in [ROADMAP.md](ROADMAP.md). Preserve mechanical hitboxes, controls and mobile performance.

## QA
All 16 levels need manual desktop/mobile verification, including intro, transitions, audio, controls, combat, exit, game-over, and the Level 3–4–5 sequence. Current syntax/hash checks are not gameplay QA.

## Asset transfer
All six original assets were successfully copied. The large music file was retrieved by a one-time GitHub Action pinned to the exact Stickman source commit, verified using SHA-256, and committed to Danny. That bootstrap workflow removed itself. The Git blob SHA of every asset now matches its Stickman source.

## Phase 01 – Task 1: Independent GitHub Pages baseline
The repository owner selected **Deploy from a branch → main → / (root)** on 2026-11-12. The obsolete, failed custom GitHub Actions Pages workflow was removed to avoid competing deployment paths; the `Verify Danny (read only)` workflow remains. Expected URL: https://joenasriani.github.io/danny-game/ .

**Task 1 status: COMPLETE / RECHECKED (2026-11-12).** Native GitHub Pages build-and-deployment run `43211005975` succeeded for commit `92a1dcb94b6bd97138b6014c32a801baa83c293c`, and a fresh independent live fetch of https://joenasriani.github.io/danny-game/ returned HTTP 200, HTML content and Danny's title/subtitle. Danny's source release validator also passed for that commit. This verifies independent publication only – not runtime gameplay. **Next: Task 2 manual desktop/mobile gameplay QA.** Never modify original Stickman.

## Phase 01 – Task 2: Gameplay QA checkpoint
[QA_PHASE01.md](QA_PHASE01.md) is the authoritative pass/pending matrix. Game source validation and live HTML delivery are confirmed. The initial external interactive-browser attempts timed out. A subsequent actual Playwright Chromium GitHub Actions run `43217241904` **PASSED** across desktop and three emulated mobile/tablet viewports, including real canvas and basic controls, all sixteen level runtime builds, and scripted transitions. This is **not** a natural 16-level playthrough or a physical-device test. Manual full progression, mobile gestures on devices, audio and fairness remain **NOT VERIFIED**. Follow founder's task-by-task rule: stop before Task 3 until Task 2 has real evidence and is rechecked.

## Visual-first review path
The founder reviews visually. Phase 01 Task 2 includes an automated Playwright screenshot workflow producing an [actual-game visual gallery](visual-evidence/README.md), covering desktop, emulated mobile portrait/landscape, tablet and selected levels. Visual evidence is required before discussing design decisions; screenshots alone do not close manual gameplay QA. The capture job passed in GitHub Actions run `43218599518`, and seven PNG files plus the gallery index were committed at `66fb49003b89090d2f44569b9ab856bcba85e682`. The assets are available for **founder visual inspection**, not yet visually approved.

## Phase 01 Task 2 – latest verified natural Level 1 progress
Live Playwright keyboard input completed Level 1 into Level 2 without teleport or altered gameplay logic. Video/screenshot/trace are retained in GitHub Actions run [43228950032](https://github.com/Joenasriani/danny-game/actions/runs/43228950032), artifact [13947694591](https://github.com/Joenasriani/danny-game/actions/runs/43228950032/artifacts/13947694591). This is **only one input-driven level completed**, not a 16-level human playthrough or physical-device QA. Task 2 remains PARTIAL / OPEN and Task 3 must not be reported completed. Do not publish or rely on preliminary generated production-board images that claim *Phase 01 Complete* – that claim is currently false.

## Release readiness
Run the read-only GitHub validation workflow after the completed import. GitHub Pages branch publication succeeded, and public HTML HTTP 200 and Danny branding were independently confirmed. Screenshot capture from the published game was successful; actual gameplay and physical-device signoff remain incomplete. Real desktop and mobile gameplay testing remain NOT VERIFIED.
