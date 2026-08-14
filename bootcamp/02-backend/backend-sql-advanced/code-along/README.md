# Backend SQL Advanced — code-along

A small Express + SQLite app used to live-code the concepts from
[`docs/learning/02-backend/backend-sql-advanced`](../../../../docs/learning/02-backend/backend-sql-advanced).

It picks up where [`backend-sql-basics/code-along`](../../backend-sql-basics/code-along)
left off: the same blog (coffee, SQLite, hiking, sourdough posts by Anna, Ben
and Clara), but now normalized across related tables instead of one flat
`blog_entries` table, plus the routes to create, update, and delete entries.

## What this demonstrates

| Handout chapter         | Where it shows up here                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intro.md`              | Overview of the three new areas below — JOINs, relation types, and mutations — wired together in this one app.                                                                                                                                                                                                                                    |
| `sql-relation-types.md` | `src/db/database.ts` / `db/seeddb.sql`: `authors` ↔ `author_profiles` is **one-to-one** (`UNIQUE author_id`, Ben has no profile row on purpose); `authors` ↔ `blog_entries` is **one-to-many** (`author_id` FK); `blog_entries` ↔ `tags` via `blog_entry_tags` is **many-to-many** (composite primary key).                                       |
| `sql-joins.md`          | `getAllBlogEntries()`/`searchBlogEntries()` in `src/models/blogModel.ts` use `INNER JOIN authors`. `getAllAuthorsWithProfiles()` in `src/models/authorModel.ts` uses `LEFT JOIN author_profiles`, so Ben still shows up with `bio: null`. `getBlogEntryById()` chains two `INNER JOIN`s (`blog_entry_tags` → `tags`) to attach each entry's tags. |
| `sql-insert.md`         | `POST /api/blog-entries` → `APIController.createBlog` → `createBlogEntry()` in `blogModel.ts`, using `db.run()` and `@named` placeholders. Returns `201` with the new `id` (`result.lastID`).                                                                                                                                                     |
| `sql-update.md`         | `PUT /api/blog-entries/:id` → `APIController.updateBlog` → `updateBlogEntry()`, an `UPDATE ... SET ... WHERE id = @id` statement. Returns `200` on success.                                                                                                                                                                                       |
| `sql-delete.md`         | `DELETE /api/blog-entries/:id` → `APIController.deleteBlog` → `deleteBlogEntry()`, a `DELETE FROM blog_entries WHERE id = @id` statement. Returns `200` on success.                                                                                                                                                                               |

## Running it

```bash
pnpm install
cp .env.example .env
pnpm --filter @bootcamp/backend-sql-advanced db:seed
pnpm --filter @bootcamp/backend-sql-advanced dev
```

`PORT` and `DB_PATH` are read from `.env` (see `.env.example`) via Node's
`--env-file` flag rather than being hardcoded — only `.env.example` is
tracked in git, so `.env` itself stays local to your machine.

Then open <http://localhost:3000> for a picocss-styled homepage, or call the API directly:

```bash
curl http://localhost:3000/api/blog-entries
curl http://localhost:3000/api/blog-entries/1
curl "http://localhost:3000/api/blog-entries/search?author=Anna&search=coffee&direction=DESC&limit=2"
curl http://localhost:3000/api/authors

curl -X POST http://localhost:3000/api/blog-entries \
  -H "Content-Type: application/json" \
  -d '{"title":"Cold brew for hot days","teaser":"A slower way to caffeinate.","authorId":1,"createdAt":"2026-05-01","image":"/images/cold-brew.jpg","content":"Cold brew steeps for twelve hours."}'

curl -X PUT http://localhost:3000/api/blog-entries/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Brewing the perfect coffee (updated)","teaser":"A short guide to better mornings.","authorId":1,"createdAt":"2026-01-05","image":"/images/coffee.jpg","content":"Coffee is best brewed slowly."}'

curl -X DELETE http://localhost:3000/api/blog-entries/6
```

A Bruno collection covering every route above lives in
[`blog-api/`](./blog-api) — open that folder as a collection in
[Bruno](https://www.usebruno.com/), select the "local" environment, and
`{{baseUrl}}` already points at `http://localhost:3000`.

## The `db:seed` script

`db/seeddb.sql` holds the schema and starting rows for `authors`,
`author_profiles`, `blog_entries`, `tags`, and `blog_entry_tags`. Running it
resets the database to a known state:

```bash
pnpm db:seed
```

This pipes `db/seeddb.sql` into the `sqlite3` CLI against `db/blog.db` (or
whatever `DB_PATH` is set to — see the `db:seed` script in `package.json`).
The file starts with `DROP TABLE IF EXISTS` statements (children before
parents, so foreign keys never dangle), so re-running it at any point is
safe and gives you a clean slate.

## Data shape

- `authors` — Anna, Ben, Clara (same three as the basics code-along).
- `author_profiles` — one row each for Anna and Clara; **Ben has none on
  purpose**, so `GET /api/authors` demonstrates a `LEFT JOIN` returning
  `null` for his `bio`/`avatarUrl` instead of dropping him from the result.
- `blog_entries` — the same six posts as the basics code-along, now
  referencing `author_id` instead of storing the author's name as text.
- `tags` / `blog_entry_tags` — each post has one or two tags (`coffee`,
  `mornings`, `sqlite`, `databases`, `outdoors`, `baking`), joined in via the
  many-to-many junction table when fetching a single entry.

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
