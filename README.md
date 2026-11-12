# Danny

**The man who Sword the world!**

Danny is a new, independent browser game by Joe Nasr, created from the authoritative 16-level *In a Stickman's World* gameplay baseline.

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

## Verification
Run `python3 tools/validate_danny.py` (Python 3 and Node.js). Automated checks validate hashes and syntax, **not** real browser playthrough. Full mobile/desktop QA remains open.
