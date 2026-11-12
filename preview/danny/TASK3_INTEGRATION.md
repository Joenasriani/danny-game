# Danny – TASK 3: Isolated playable Level 1
**Status:** prototype implemented on isolated development branch; browser QA and deployment pending.
Branch: `feature/danny-living-sketch-level1`.

`preview/danny/index.html` is copied from the authoritative 16-level main game, then receives **only cosmetic and isolation adjustments**:
- Native player movement, jump, collision, damage, combat, audio, touch controls and existing camera inputs are unchanged.
- The prototype loads the founder's exact original sketch, via nine-layer [Danny puppet rig](../../docs/character/PROTOTYPE_RIG.md).
- The existing stick figure is hidden **only after** that exact artwork loads; until then a safe fallback renders.
- Danny's visual rig listens to the original `playerState`, `stateFrame`, `facingDir`, and `attackTimer`. No physics/hitbox changes.
- Only Level 1 is playable in the isolated preview. Finishing its exit produces existing `VICTORY!`, not progression to Level 2. Original 16-level `index.html` at repo root is unchanged.
- The isolated page corrects relative font/audio paths because it's now two directories deeper.
- A collapsible "MOTION LAB" control can show each animation pose independent of gameplay for visual review; choose AUTO for gameplay state synchronization.
- This is **not the final Living Sketch environment or full all-level release**, and a flat 2.5D cutout has oblique-camera limitations.

Preview path once deployed: `https://joenasriani.github.io/danny-game/preview/danny/` (pending check).
Do not present it as live until actual Pages success plus Playwright gameplay/visual validation.
