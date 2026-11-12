# Danny – Visual review instruction

**Phase 01 Task 2 current state: PARTIAL / OPEN.** For visual signoff, use [actual game screenshots](visual-evidence/README.md) once the GitHub Actions capture workflow has generated and committed them. They show the live baseline, including desktop and emulated touch layouts; **not** a redesigned Danny character or evidence of full gameplay completion. A screenshot must never stand in for actual-device input, all-level reachability or audio testing.

The independent Playwright capture workflow runs against the published Danny Pages URL and stores images in `docs/visual-evidence/`, without modifying the game source. It may require GitHub Actions workflow write permission to commit evidence. If the visual-capture job fails, keep the review pending and diagnose the logs.
