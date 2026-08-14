# Backend SQL Basics — code-along

A small Express + SQLite app used to live-code the concepts from
[`docs/learning/02-backend/backend-sql-basics`](../../../../docs/learning/02-backend/backend-sql-basics).

## What this demonstrates

| Handout chapter           | Where it shows up here                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `relational-databases.md` | The `blog_entries` table in `src/db/database.ts` — columns, types, and constraints. Primary/foreign keys are covered conceptually only here; a second, related table is a later chapter.                                |
| `sqlite.md`               | The project runs against a single-file SQLite database (`db/blog.db`) — no server process required.                                                                                                                     |
| `sqlite-setup.md`         | `src/db/database.ts` (`connectDB`/`getDB`/`closeDB`) and graceful shutdown on `SIGINT`/`SIGTERM` in `src/index.ts`.                                                                                                     |
| `sql-tables.md`           | `CREATE TABLE IF NOT EXISTS blog_entries (...)` inside `connectDB()`, and `db/seeddb.sql`'s `DROP TABLE IF EXISTS` / `CREATE TABLE` / `INSERT`.                                                                         |
| `sql-select.md`           | `getAllBlogEntries()` (`db.all()`), `getBlogEntryById()` (`db.get()` with a parameterized `WHERE id = ?`), and `searchBlogEntries()` (parameterized `WHERE`, `LIKE`, `ORDER BY`, `LIMIT`) in `src/models/blogModel.ts`. |

## Running it

```bash
pnpm install
cp .env.example .env
pnpm --filter @bootcamp/backend-sql-basics db:seed
pnpm --filter @bootcamp/backend-sql-basics dev
```

`PORT` and `DB_PATH` are read from `.env` (see `.env.example`) via Node's
`--env-file` flag rather than being hardcoded — only `.env.example` is
tracked in git, so `.env` itself stays local to your machine.

Then open <http://localhost:3000> for a picocss-styled homepage, or call the API directly:

```bash
curl http://localhost:3000/api/blog-entries
curl http://localhost:3000/api/blog-entries/1
curl "http://localhost:3000/api/blog-entries/search?author=Anna&search=coffee&direction=DESC&limit=2"
```

A Bruno collection covering every route above (including the search
filters) lives in [`blog-entries-api/`](./blog-entries-api) — open that
folder as a collection in [Bruno](https://www.usebruno.com/), select the
"local" environment, and `{{baseUrl}}` already points at
`http://localhost:3000`.

## The `db:seed` script

`db/seeddb.sql` holds the schema and starting rows for `blog_entries`. Running it resets the database to a known state:

```bash
pnpm db:seed
```

This pipes `db/seeddb.sql` into the `sqlite3` CLI against `db/blog.db` (or whatever `DB_PATH` is set to — see the `db:seed` script in `package.json`). The file starts with `DROP TABLE IF EXISTS`, so re-running it at any point is safe and gives you a clean slate.

This script is also wired up at the monorepo root — `pnpm db:seed` from the repo root fans out via Turborepo to every package that defines a `db:seed` script, so future SQL-backed packages can reuse the same convention without extra plumbing.

## Connecting to `db/blog.db` directly

The database is a single file at `db/blog.db`. Three ways to inspect or query it outside the app:

**1. IDE extension** — most editors can open a `.db` file directly (VS Code's "SQLite Viewer"/"SQLite" extensions, JetBrains' built-in Database tool window). Point it at `db/blog.db` and browse tables/rows or run ad-hoc SQL from the editor.

**2. `sqlite3` CLI** — ships with macOS, available via most Linux package managers, downloadable for Windows from the [official SQLite site](https://www.sqlite.org/download.html):

```bash
sqlite3 db/blog.db
sqlite> SELECT * FROM blog_entries;
sqlite> .quit
```

**3. DB Browser for SQLite** — a GUI application for browsing tables, running queries, and inspecting the schema without writing code. Download from <https://sqlitebrowser.org/dl/>, then open `db/blog.db`.
