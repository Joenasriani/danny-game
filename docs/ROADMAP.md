# Danny – THREE-PHASE PRODUCTION ROADMAP

**Status:** FROZEN / FOUNDER-APPROVED EXECUTION BASELINE as of 2026-11-12. Planning document, not a claim of completed production.
**Change control:** Follow Phase 01 → Phase 02 → Phase 03, in order. No skipping or modifying phase scopes, deliverables, sequence, locks, or acceptance gates without explicit founder approval documented in this repository. A freeze is not authorization to implement unapproved design specifics.
**Current execution:** Phase 01, work package 1 (independent technical baseline and deployment verification); other Phase 01 packages and gates remain open until evidenced.
**Title:** Danny
**Subtitle:** The man who Sword the world!
**Source of creative authority:** [CREATIVE_DIRECTION_LOCK.md](CREATIVE_DIRECTION_LOCK.md)
**Repository:** https://github.com/Joenasriani/danny-game

This three-phase structure maps the six previously approved implementation steps into three production phases **without removing or changing any locked creative decisions**. The player controls Danny; the director controls the presentation. Danny is a boy. Living Sketch is the chosen artistic language. Keep all changes independent from the original Stickman repository.

## Phase 01 – THE BIRTH OF DANNY
**Purpose:** Establish a reproducible, independently playable baseline and lock Danny's character identity before production rendering.

### Work packages
1. **Independent technical baseline:** Confirm current 16-level source, six assets, source/asset hashes, intact controls, combat, camera direction, audio, and known release constraints. Establish Danny-only deployment, avoiding any original Stickman Pages or itch.io destination.
2. **Manual baseline QA:** Play/check intro, Levels 1–16, especially the 3→4→5 transition, end conditions, combat, touch controls, game-over, sound, mobile portrait/landscape, tablet and desktop. Record actual tested devices/browsers. Automated hash/syntax CI is *not* a gameplay test.
3. **Character bible:** Danny is explicitly a **boy**. Develop a strong recognizable silhouette, face, emotional range, costume, proportions, sword language, personality, and movement/acting sheets. Use the founder's pencil reference for technique, not character gender.
4. **Art-direction bible:** Specify graphite/pencil treatment, hand-drawn architectural language, value hierarchy, background depth, paper texture, line boil and hatching, and readability rules.
5. **Animation planning:** Define acting beats and mechanical mappings for idle, run, jump, fall, attack, hit, block/recover and death, without committing to changed gameplay timing.

### Artifacts
- Verified Danny baseline and documented deployment
- Device/browser QA matrix with pass/fail/open items
- Approved Danny character sheet, expression/pose studies and sword/style studies
- Visual and cinematic language guide; animation-to-mechanics mapping
- Synchronized repo README, handoff, manifest, QA and source references where relevant

### Exit / founder approval gate
- Character design and visual language approved.
- Independent Danny baseline reachable and tested on representative desktop and mobile scenarios; unresolved test failures explicitly recorded.
- The original 16-level gameplay foundation remains unchanged and traceable.

## Phase 02 – THE LIVING SKETCH
**Purpose:** Prove a unique, cinematic, expressive, fully playable Danny scene on one isolated development branch.

### Work packages
1. Implement one boy character with the approved silhouette and animation-ready representation; separate character artwork from hitboxes, physics and game logic.
2. Prototype NPR graphite rendering: textured strokes, animated outlines, restrained line boil, crosshatching, atmospheric depth, paper response and lighting. Avoid ray tracing by default; measure actual performance.
3. Cinematically direct **one level**: player-safe framing, depth and negative space, environmental storytelling, lighting/composition, acting, sound/silence, visual effects and action readability.
4. Design sword animation to communicate anticipation/weight/recovery visually **without** altering input response, hit windows or collision rules without explicit approval.
5. Compare the prototype with Phase 01 baseline on desktop, mobile portrait/landscape and touch gestures; document visual, gameplay and frame-time findings. Maintain reasonable fallbacks for underpowered devices.
6. Founder review before changing other levels; isolate experiments until approved.

### Artifacts
- One integrated, playable cinematic vertical slice in a dedicated Danny branch
- Character animation state mapping and documented visual pipeline
- Before/after visual evidence, desktop/mobile QA and measured performance
- Approved iteration notes or explicit blocked/rejected directions

### Exit / founder approval gate
- The founder approves both Danny's acting and the living-sketch visual direction in the playable scene.
- The level remains fair, responsive, legible and playable on tested desktop/mobile configurations.
- No other levels are migrated before this gate.

## Phase 03 – THE WORLD OF DANNY
**Purpose:** Apply the approved visual/cinematic system consistently to all 16 levels and release the independent Danny game.

### Work packages
1. Extend the approved character/animation/rendering system across Levels 1–16 using controlled, inspectable increments.
2. Direct individual levels for expressive composition, silhouettes, environmental clues, atmospheric continuity and narrative pacing; avoid generic repeated backgrounds.
3. Integrate refined character and enemy visuals, sound design, music and effects without misleading gameplay cues or unapproved mechanic changes.
4. Optimize dynamic rendering and assets for mobile portrait/landscape, tablet and desktop; preserve fallback/readability rules.
5. Execute level-by-level full regression: spawn/exit, jumps/gaps, enemy counts/behaviors, potion reachability, combat, audio, transitions, camera gestures and game completion. Document tests and known limitations.
6. Prepare only Danny-specific deployment and release assets, instructions, versioning, discoverability and a finished product handoff.

### Artifacts
- Complete 16-level Danny release candidate
- Final art and audio consistency review
- Automated and genuine browser/mobile QA evidence
- Release-ready independent deployment, README, manifest, handoff and version record

### Exit / founder approval gate
- All sixteen levels pass the agreed acceptance and release checks.
- The founder approves final visuals and cinematic presentation.
- No unresolved critical gameplay/mobile defects; any remaining limitations documented honestly.
- Original Stickman code, site and release remain untouched.

## Cross-phase change control – LOCKED

1. **Creative authority:** [CREATIVE_DIRECTION_LOCK.md](CREATIVE_DIRECTION_LOCK.md) is the governing creative/governance document. This roadmap is its three-phase execution map, not a replacement for the lock.
2. **Per-commit synchronization:** Every implementation commit must include relevant README, handoff, QA, release manifest/hash and technical-document updates in the *same commit*, then independently recheck resulting HEAD, CI and deployment. Keep one current authoritative handoff, archive superseded instructions.
3. **Approval and branches:** Phase 02 experiments start in their own Danny branch. Founder approval is required before subsequent phase gates or replacing the approved level-wide visuals.
4. **Protection:** Never push to or deploy over `Joenasriani/stickman`; keep its historical baseline untouched. Do not silently change gameplay physics, collision, combat timing, or controls to support visual effects.
5. **Evidence:** Clearly distinguish implemented / verified / pending / not verified; do not convert static analysis into a claimed real-device playthrough.
6. **Scope:** No dates, estimates, new mechanics, story canon, character details or deployment claims are implied by this roadmap unless separately approved.

## Progress at adoption (2026-11-12)

- **Phase 01:** In progress – independent 16-level repository import and asset transfer complete; character bible, independent deployment and actual device QA remain open.
- **Phase 02:** Not started.
- **Phase 03:** Not started.
- **Game code changes from this document commit:** None.
