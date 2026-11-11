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

## Next step
Prototype an optional **Living Sketch** visual mode: expressive pencil-drawn characters, graphite hatching, controlled line boil, and hand-drawn architecture. Use an isolated branch and preserve all mobile-first/desktop-responsive gameplay behavior.

## Verification
Run `python3 tools/validate_danny.py` (Python 3 and Node.js). Automated checks validate hashes and syntax, **not** real browser playthrough. Full mobile/desktop QA remains open.
