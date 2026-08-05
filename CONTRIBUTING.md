# Contributing & Code Architecture Agreement

Though this is a personal training repository, it is held to team production
engineering standards to reinforce enterprise development behavior.

## Branch Management

- Branch directly out of `develop` using standard naming paths: `feature/<module-name>`.
- Isolate branches by bootcamp module rather than individual daily lessons.
- Pull Requests integrate back into `develop` using **Squash and Merge** rules.
- Production promotions flow periodically via `develop → main`

## Tooling & Package Manager Note

The root workspace is managed with **pnpm** (see `.nvmrc` / `packageManager`
in `package.json`). Some folders under `apps/` are self-contained
applications that declare their own package manager, Node/Bun version, and
lockfile, independent of the root — these are intentionally excluded from
`pnpm-workspace.yaml`. For example, a backend-templating setup using
Nunjucks only works correctly under **pnpm 10.x**, not pnpm 11 — that app
pins its own version rather than following root.

Before working inside any `apps/` folder:
- Check for a `packageManager` field or lockfile in that folder's own
  `package.json`.
- If present, use that app's own package manager/version — do not run root
  `pnpm` commands against it, and do not "fix" its version to match root.
- Root `turbo`/`pnpm` scripts will not touch these apps since they aren't
  workspace members.

## Conventional Commit Standards

Commit messages follow the format `<type>(<scope>): <summary>`.

- Complete type, scope, and footer definitions live in [`.conventionalcommit.json`](.conventionalcommit.json).
  WebStorm's Conventional Commit plugin reads this file automatically and offers autocomplete for types and scopes in the commit dialog.
- This is IDE tooling only — no local git hook validates commit messages, so nothing blocks a commit for not matching the format.
- The one place this format is actually checked is GitHub Actions, which lints PR titles against the convention (`.github/workflows/pr-title-lint.yml`).
- Allowed scopes:
  - `repo`: Global repository changes or workspace configuration
  - `ci`: GitHub Actions configuration
  - `docs`: Documentation related changes
  - `tooling`: Shared tsconfig, eslint configs, or scripts
  - `apps`: Core application development (e.g., 01-typescript, 00-side-projects/qa-forum)
  - `bootcamp:<topic>`: Topic-focused workspaces (e.g., nestjs, ts-advanced)
  - `playgrounds`: Algorithmic exercises and challenges

### Collaboration & Pair Programming

When collaborating with cohort colleagues or bootcamp mentors, append
co-author trailers to the base of commit messages matching the entries in
[`.conventionalcommit.coauthors`](.conventionalcommit.coauthors).
