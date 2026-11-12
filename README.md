# Danny

**The man who Sword the world!**

Danny is a new, independent browser game by Joe Nasr, created from the authoritative 16-level *In a Stickman's World* gameplay baseline.

## Locked canonical Danny character

**The founder-approved original sheet is frozen as the visual source of truth:** [View Danny's character reference and production rules](docs/character/CANONICAL_CHARACTER.md). The exact uploaded PNG is stored at [docs/character/reference/DANNY_CANONICAL_CHARACTER_SHEET.png](docs/character/reference/DANNY_CANONICAL_CHARACTER_SHEET.png). It defines Danny as a boy, with his recognizable cap/hair, scarf, tunic, belt pouch, boots and sword, and expressive graphite animation language. **Phase 01 locks the design/character bible; Phase 02 builds the animated, playable one-level prototype; Phase 03 rolls the approved treatment across 16 levels.**

## Animated Danny – isolated Level 1 prototype

**Experimental preview (Phase 02 vertical slice, not the full game):** [Play the animated Danny prototype](https://joenasriani.github.io/danny-game/preview/danny/) · [Inspect Danny's animation laboratory](https://joenasriani.github.io/danny-game/preview/danny/character-lab.html).

This is the first in-game **nine-layer 2.5D cutout rig derived directly from the exact founder-approved graphite character drawing**, with idle, run, jump, fall, sword attack, block and damage visual states. It replaces **only the player artwork within a separately published Level 1 preview**. Use the in-game **DANNY / MOTION LAB** to inspect individual animations or AUTO to follow gameplay.

**The original 16-level game remains at [the unchanged main game](https://joenasriani.github.io/danny-game/).** No collision, controls, original 16-level source, sound library, or mechanics were changed on the main game. The founder specifically requested these four isolated prototype tasks ahead of full Phase 01 QA closure; **Phase 01 is still OPEN** (natural Levels 2–16 and real-device testing missing). This visual prototype does not constitute final character animation quality or full Phase 02 approval.

## Current build
- 16 levels numbered **1–16**, including the rebuilt **Broken Arch Passage** at Level 4.
- Game title and intro subtitle are Danny-branded.
- All original movement, sword combat, enemies, collision, audio behavior, mobile touch input, and **grab-the-world** camera controls are retained.
- **Living Sketch cartoon character rendering has not been implemented yet**. This is the next art-direction experiment, not a claim about the current game.
- Three.js r128 is an external CDN dependency.

## Files
- `index.html` – playable browser entrypoint
- `fonts/`, `music/`, `sfx/` – runtime assets
- [DANNY_MANIFEST.json](DANNY_MANIFEST.json) – hashes, provenance, verification limitations
- [docs/HANDOFF.md](docs/HANDOFF.md) – development scope and protected Stickman history
- `tools/validate_danny.py` – read-only release integrity checks

## Provenance
Source: https://github.com/Joenasriani/stickman at commit `b7a7e2737a9087154f50bead2f159e425fcada34`.

Danny is **not a GitHub fork**. Its history begins here. Original Stickman repository, GitHub Pages, and itch.io remain untouched.

## Approved creative direction and development rules
- [Locked cinematic Living Sketch plan and repository-synchronization policy](docs/CREATIVE_DIRECTION_LOCK.md) – founder-approved; preserve Danny as a boy and treat gameplay as authoritative.
- **Commit rule:** implementation, README, manifest, handoff and relevant QA records must remain synchronized in the same commit; reverify the resulting HEAD. Do not claim untested features are live.

## Three-phase production roadmap
**FROZEN / APPROVED 2026-11-12.** Follow the phases sequentially; alter scope or advance gates only with explicit founder approval. **Current phase: 01, baseline and independent deployment verification.**
See [the authoritative three-phase roadmap](docs/ROADMAP.md):
1. **The Birth of Danny** – independent playable baseline, desktop/mobile QA, boy character bible and style approval (**in progress**).
2. **The Living Sketch** – a cinematic, expressive, playable one-level vertical slice on an isolated branch (**not started**).
3. **The World of Danny** – roll out the approved production system across all 16 levels and verify the independent release (**not started**).

No visual character redesign has been implemented; phase gates require founder review and gameplay verification.

## Asset transfer
All six runtime assets were copied and their Git blob checksums matched the source repository; the one-time transfer workflow was retired automatically.

## Independent GitHub Pages preview
Deployment source: **Deploy from a branch → main → / (root)** (selected by repository owner on 2026-11-12). GitHub Pages should publish at https://joenasriani.github.io/danny-game/ . The previous custom GitHub Actions Pages workflow was removed after it failed to create the Pages site due to a permissions limitation; the independent `Verify Danny (read only)` validation workflow remains active.

**Phase 01 Task 1 COMPLETE (2026-11-12):** Native Pages deployment succeeded on commit `92a1dcb94b6bd97138b6014c32a801baa83c293c` (GitHub Actions run `43211005975`); independent live request returned HTTP 200 and confirmed Danny title/subtitle and intro interface. This verifies deployment and page availability, **not** that full gameplay is playable on all devices. Phase 01 Task 2 manual gameplay QA remains open.

## Phase 01 gameplay QA status
**Task 1:** COMPLETE – GitHub Pages deployed and a live HTTP 200 intro response verified.
**Task 2:** PARTIALLY VERIFIED / OPEN – live Chromium smoke passed on desktop and emulated mobile/tablet, and scripted all-16-level runtime/transition checks passed (Actions run `43217241904`). **A keyboard-controlled live Level 1 playthrough reached Level 2** (video and trace: [GitHub Actions run 43228950032](https://github.com/Joenasriani/danny-game/actions/runs/43228950032)); full natural 16-level and physical-device QA remain unverified; see [QA register](docs/QA_PHASE01.md). Do not advance to character creation until its acceptance gate passes.

## Visual game review
Review [desktop, mobile portrait, landscape, tablet and selected level screenshots](docs/visual-evidence/README.md) (captured and committed successfully in GitHub Actions run `43218599518` from the live game). These are baseline visual QA evidence, not the future Living Sketch character redesign or proof of complete gameplay.

## Verification
Run `python3 tools/validate_danny.py` (Python 3 and Node.js). Automated checks validate hashes and syntax, **not** real browser playthrough. Full mobile/desktop QA remains open.
