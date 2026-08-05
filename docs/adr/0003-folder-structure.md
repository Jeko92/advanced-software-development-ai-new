# ADR-0003: Top-level folder structure

## Status
Accepted

## Context
The repo mixes several kinds of content: runnable applications, chronological
bootcamp material, small shared packages, ongoing daily exercises, and a
handful of self-contained side-projects that may need a different Node/pnpm
version — or a different package manager entirely — than the rest of the
workspace.

## Decision
- `apps/` — runnable, buildable applications. Numbered folders (`01-typescript`
  … `08-ai`) hold each bootcamp chunk's recap project. `apps/00-side-projects/`
  holds the three bootcamp-provided side projects.
- `../../bootcamp/` — topic-organized learning material (handouts, challenges) for
  each bootcamp chunk, mirroring the same numbering as `apps/`.
- `packages/` — small shared library packages consumed by other workspace
  packages via `workspace:*` (tsconfig, eslint-config, prettier-config,
  shared-types, utils).
- `playgrounds/` — ongoing, non-bootcamp-chronological exercises
  (`daily-coding-challenges`).
- `docs/` — ADRs, architecture notes, bootcamp map, roadmap.
- `scripts/` — repo automation (currently empty; scaffolding scripts land
  here as needed).

Any app that needs its own pnpm/npm/bun version or lockfile is still placed
under `apps/`, but is simply never added to a `packages:` glob in
`pnpm-workspace.yaml` — it's excluded by omission, not by exclusion pattern,
so adding one doesn't require editing the workspace file.

## Consequences
- Clear, predictable place for every kind of content
- New self-contained apps require zero workspace-config changes
- bootcamp-numbered folders in `apps/` and `../../bootcamp/` must be renamed together
  if numbering of bootcamp ever changes
- Concrete case: a Nunjucks-based backend-templating app under `apps/`
  requires pnpm 10.x specifically (incompatible with the root's pnpm 11) —
  it pins its own `packageManager` field and lockfile and is excluded from
  every `pnpm-workspace.yaml` glob, demonstrating the "excluded by omission"
  rule above in practice.
