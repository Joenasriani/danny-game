# Danny – independent game handoff

**Title:** Danny
**Subtitle:** The man who Sword the world!

**Authority:** This repository only. Based on `Joenasriani/stickman` commit `b7a7e2737a9087154f50bead2f159e425fcada34`, whose source SHA-256 is `320413936fca080b1b2fbb3285e0b094e32f736ff0dd90b72c65543a3f85ad4f`.

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

## Release readiness
Run the read-only GitHub validation workflow after the completed import. GitHub Pages and public live game deployment have not been configured. Real desktop and mobile gameplay testing remain NOT VERIFIED.
