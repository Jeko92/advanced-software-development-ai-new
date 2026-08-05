# ADR-0002: Use Turborepo for task orchestration

## Status
Accepted

## Context
The repo hosts many independent TypeScript packages from day one — each bootcamp
section, sub-part, side-project, and challenge set builds, lints, and tests
independently. Running `pnpm -r build` (or lint/test) re-executes every
package's task every time regardless of what changed, which doesn't scale
even at the small package counts this repo starts with, since most commits
touch exactly one package.

## Decision
Adopt Turborepo on top of the pnpm workspace from the initial commit, rather
than introducing it later once `pnpm -r` becomes noticeably slow.

## Consequences
- Unchanged packages are skipped entirely (cache hit)
- Task graph respects inter-package dependencies automatically
- One more dependency and one more config file (`turbo.json`) to maintain
