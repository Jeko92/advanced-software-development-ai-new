# Advanced Software Development with AI

A pnpm monorepo documenting my work throughout the **neuefische Advanced
Software Development with AI** bootcamp.

The repository follows a production-inspired monorepo structure: every
course section, side-project, and shared utility is an isolated, independently
buildable workspace package, orchestrated with Turborepo.

## Overview

Real projects (`apps/`), topic-organized learning workspaces (`bootcamp/`),
ongoing daily exercises (`playgrounds/`), and shared config packages
(`packages/`) — all independently buildable, runnable, and tested.

## Repository Philosophy

Every unit of code, whether a full project or a single-topic exercise, is a
real workspace package: it builds, lints, typechecks, and (where applicable)
tests on its own. See [`docs/architecture.md`](docs/architecture.md) and the
Architecture Decision Records in [`docs/adr/`](docs/adr/) for why.

## Repository structure

```text
apps/          Runnable applications (bootcamp recap projects + side projects)
bootcamp/        Topic-focused learning material (handouts, challenges)
docs/          Documentation (ADRs, architecture, bootcamp map, roadmap)
packages/      Shared, installable config packages (tsconfig, eslint, prettier, utils)
playgrounds/   Ongoing daily coding challenges, independent of bootcamp chronology
scripts/       Automation scripts
```

Some folders under `apps/` are **self-contained applications** that declare
their own package manager, Node/Bun version, or lockfile, independent of the
root. These are intentionally excluded from `pnpm-workspace.yaml` — see
[`docs/adr/0003-folder-structure.md`](docs/adr/0003-folder-structure.md).

See **[`docs/bootcamp-map.md`](docs/bootcamp-map.md)** for the mapping between
bootcamp modules and repository folders.

## Tech Stack

- TypeScript (strict mode)
- pnpm Workspaces
- Turborepo Pipeline Architecture
- ESLint 9 Flat Config, shared via `@bootcamp/eslint-config`
- Prettier, shared via `@bootcamp/prettier-config`
- GitHub Actions (PR title linting)
- Conventional Commits (IDE-assisted via WebStorm's Conventional Commit
  plugin — not locally enforced)
- Node.js 22+ & Bun Compatibility (for standalone apps)

## Package Manager & Runtime Support

Installs are standardized on **pnpm** (`pnpm-lock.yaml` is the committed
lockfile). Scripts run identically under **Node** or **Bun**:

|              | Node                   | Bun                                     |
| ------------ | ----------------------- | ---------------------------------------- |
| Install      | `pnpm install`          | `pnpm install` (once, for the lockfile)  |
| Dev          | `pnpm dev`              | `bun run dev`                            |
| Build        | `pnpm build`            | `bun run build`                          |
| Test         | `pnpm test`             | `bun test`                               |
| Run one file | `tsx src/index.ts`      | `bun src/index.ts`                       |

> **Note — pinned/divergent tooling per app.** Some apps under `apps/` are
> intentionally excluded from the root pnpm workspace because they require a
> different package manager or package-manager version than the root. For
> example, a backend-templating setup using Nunjucks only works correctly
> under **pnpm 10.x**, not pnpm 11 — that app pins its own `packageManager`
> field and lockfile rather than following the root version. Always check an
> individual `apps/` folder's own `package.json` before assuming root
> tooling (pnpm 11, Node 22) applies.

## Getting Started

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

## Branching Strategy

`main` (protected) ← `develop` (protected) ← `feature/<module>`.

## Commit Convention

`<type>(<scope>): <summary>`, following Conventional Commits. Types and
scopes are defined in [`.conventionalcommit.json`](.conventionalcommit.json),
which WebStorm's Conventional Commit plugin reads automatically to provide
autocomplete in the commit dialog — this is a local editor convenience only,
nothing rejects a commit for not following the format. Pairing? See
[`.conventionalcommit.coauthors`](.conventionalcommit.coauthors).

## CI/CD

Currently, GitHub Actions only enforces Conventional Commit formatting on PR
titles (`.github/workflows/pr-title-lint.yml`). Lint, typecheck, build, and
test automation on PRs is not wired up yet — see
[`docs/roadmap.md`](docs/roadmap.md).

## bootcamp Map

[`docs/bootcamp-map.md`](docs/bootcamp-map.md) — which folder covers which
bootcamp part.

## Roadmap

[`docs/roadmap.md`](docs/roadmap.md)

## Useful Commands

```bash
pnpm add < -D > <package> < --ignore-workspace >
pnpm --filter <package> run <script>   # run a package-specific script
pnpm build --filter <package>...       # build one package and its dependents
turbo run build --dry                  # preview the task graph without running it
```

## License

MIT
