# DANNY – LOCKED CREATIVE DIRECTION & DEVELOPMENT GOVERNANCE

**Status:** APPROVED / LOCKED by founder on 2026-11-12.
**Game:** Danny
**Subtitle:** The man who Sword the world!
**Repository:** https://github.com/Joenasriani/danny-game
**Authority:** This file governs Danny's future art, direction, production, and change management. Do not reinterpret it as an already implemented feature list. Change locked decisions only with explicit founder approval and record each revision.

## Core vision

**Danny is an animated film that happens to be playable**, not merely a platformer with upgraded graphics. The game must have its own cinematic, narrative, and visual identity beyond the Stickman baseline. The player controls Danny; the director controls the presentation.

## Canonical character sheet – founder-approved 2026-11-12

The exact approved Danny image is now preserved at [character reference sheet](character/CANONICAL_CHARACTER.md) and [unmodified original PNG](character/reference/DANNY_CANONICAL_CHARACTER_SHEET.png). **This specific image is the locked visual source of truth.** Do not replace it with a newly invented character, generic stickman, unrelated cartoon boy, or a merely similar AI rendering. Further front/side/3/4 turnarounds and animation artwork must be derived consistently from this sheet and reviewed visually. The original PNG was imported with SHA-256 integrity verification. Phase 01 concerns design/art preparation; **Phase 02 is where the animated playable character is built and integrated**. This does not override Phase 01 QA or phase approval gates.

## Character

- **Danny is a boy.** This is an explicit, fixed character requirement.
- Design an identifiable boy character, with expressive face, silhouette, outfit, sword, posture and reactions. Keep a coherent, animation-ready silhouette.
- Convey his personality through acting, gesture, anticipation, hesitation, recovery, expressions and movement rather than excessive exposition.
- The founder's pencil-character sketch reference is inspiration for **drawing style and animation language**, not the reference character's gender or identity.
- Do not claim that a pencil shader alone creates new character anatomy, clothing, expressions or animation.

## Locked visual art direction – Living Sketch

- Hand-drawn graphite and pencil linework; animated ink and deliberate imperfection.
- Expressive, hand-drawn/cartoon character animation, pencil shading, crosshatching, paper texture and restrained outline boil.
- Cinematic lighting, atmospheric environments and hand-drawn architecture; preserve legibility, contrast and performance.
- Avoid unneeded ray tracing: select efficient NPR, toon/graphite shading, hand-drawn character assets and compositing according to the actual visual need.
- Visual experimentation is not authorization to replace the original game or to claim unbuilt systems are already implemented.

## Cinematic direction

- Compose each level deliberately using framing, visual hierarchy, foreground/background depth, silhouettes, scale, negative space, atmosphere and controlled camera language.
- Use environmental storytelling: architecture, movement, lighting, visual clues and discovery communicate the world without long explanatory text.
- Treat sound and silence as directed elements: ambience, tactile effects, music and emotional pacing.
- Add acting to action: anticipation, reaction, recovery and appropriate weight to Danny's sword.
- **Never compromise gameplay for cinematics:** no involuntary camera sweeps that hide hazards, no forced cutscenes that interrupt player agency, no animation delay that changes approved responsiveness, no visual clutter that hides collision cues.

## Technical and gameplay protections

- Danny is a **separate project** from https://github.com/Joenasriani/stickman. NEVER push Danny development to Stickman or use its existing deployment endpoints.
- Starting baseline: independent 16-level Danny import based on Stickman commit `b7a7e2737a9087154f50bead2f159e425fcada34`. Preserved mechanics include levels 1–16, enemy/combat rules, physics, hitboxes, movement, touch controls, two-finger gestures, audio and grab-the-world camera direction.
- Keep the mechanical gameplay system independent of the visual model and rendering. Visual/animation work must not silently change mechanics, reachability, hitboxes or level structure.
- Maintain usable mobile portrait, mobile landscape, tablet and desktop experiences; optimize performance of effects and animated character assets.
- Real browser playthrough on actual desktop/mobile remains a separate QA requirement from source syntax, hashes and CI. Do not assert unverified gameplay tests.

## Approved implementation sequence

**Three-phase execution mapping (2026-11-12):** See [ROADMAP.md](ROADMAP.md). Phase 01 covers steps 1–2 below; Phase 02 covers steps 3–5, including prototype verification and founder approval; Phase 03 covers step 6 and full release verification. This mapping does not replace or relax the founder-approved six steps, cinematography principles, or per-commit synchronization rules.


1. Establish an independently deployed and verified Danny baseline; keep original Stickman release separate.
2. Develop Danny's character bible: boy character design, facial language, silhouette, outfit, sword, acting poses, running, jumping, falling, attack and reaction sheets.
3. Prototype Living Sketch rendering and the expressive character in **one isolated scene/level and a dedicated development branch**.
4. Direct one cinematic level end to end: composition, visual storytelling, movement, lighting, timing, animation and sound – while preserving control and readability.
5. Evaluate and verify mobile/desktop performance and full mechanics; iterate with founder approval before propagating.
6. Extend the approved production system consistently across all sixteen levels, then run regression, visual QA and release verification.

No stage implies approval to skip the prior verification gate or to redesign other levels without review.

## LOCKED repository-synchronization rule (founder approval 2026-11-12)

**Every feature, creative change, addition, adjustment, fix or production milestone must be kept in sync with the repository at the time of commit – not left for a later cleanup.**

For **every development commit**:
1. Check actual implementation against the approved plan and current repository baseline.
2. Update the relevant README, this creative direction file (only if an approved decision changed), `docs/HANDOFF.md`, relevant technical/QA documentation and `DANNY_MANIFEST.json` whenever their statements, hashes, dependencies, release status or tracked behavior are affected.
3. Commit implementation and corresponding documentation/manifest updates **together in the same atomic commit** wherever possible. Do not leave README, handoff, instructions or manifests stale after a commit.
4. Run appropriate automated validation, check links and asset provenance, and distinguish **verified**, **pending** and **not tested**. If tests require deployment, run and document those separately after commit.
5. Re-read the resulting HEAD, inspect the diff and verify docs/source/manifest are consistent. Report the exact commit and any outstanding checks.
6. Keep only one current authoritative handoff, and label or archive superseded directions explicitly. Never silently replace founder-locked decisions.

For documentation-only commits, accurately state that no runtime code changed. Historical provenance fields remain historical, not current-release claims. Do not alter hashed source files merely to describe future plans.

## Current status (at lock)

- 16-level Danny copy with correct browser/intro title and subtitle: **implemented**.
- Six source runtime assets and automated read-only integrity CI: **imported and last verified**.
- Cinematic visual upgrade, Living Sketch shader, upgraded boy character, bespoke acting and level cinematography: **NOT IMPLEMENTED**.
- GitHub Pages deployment and real desktop/mobile playthrough: **NOT VERIFIED / NOT DEPLOYED** as of this lock. Verify independently before changing status.
