# Backend SQL Basics - SQLite Setup

Wiring a database into an Express application requires three things: opening a connection when the server starts, giving the rest of the application access to that connection, and writing model functions that run queries and return typed results. A dedicated module keeps these concerns in one place and makes the connection lifecycle easier to manage.

## The database module

The `sqlite` package is a Promise-based wrapper around the sqlite3 bindings. Install both alongside the TypeScript types for the underlying driver:

```bash
npm install sqlite sqlite3
npm install --save-dev @types/sqlite3
```

A database module in `src/db/database.ts` centralizes everything related to the connection. It holds the database instance, exposes functions to open and close it, and is the single place other modules import from when they need to run queries.

```typescript
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db", "blog.db");

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
```

Key points about this module:

- `open()` accepts a `filename` and a `driver` — the driver is `sqlite3.Database`, which tells `sqlite` which underlying engine to use
- `path.join(__dirname, "db", "blog.db")` places the database file in the `db` directory of the project working directory
- `connectDB()` is `async` and returns the opened database directly after the connection is established.
- `getDB()` is used to access the database in other modules. It guards against calling model functions before `connectDB()` has resolved, throwing a descriptive error rather than failing silently

`connectDB()` is called in `src/index.ts` before the Express server starts listening, so the database is ready by the time the first request arrives:

```typescript
// src/index.ts

await connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Graceful shutdown

When the server process stops, open database connections should be closed cleanly to avoid data corruption and resource leaks. Node.js allows listening for OS signals that indicate the process is about to terminate.

`SIGINT` is sent when the user presses `Ctrl+C` in the terminal. `SIGTERM` is sent by process managers (Docker, PM2, systemd) when they stop the application. Registering handlers for both means the database closes correctly regardless of how the server is stopped.

Place these event listeners at the bottom of `src/index.ts`:

```typescript
// src/index.ts
process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
```

Both handlers await `closeDB()` before calling `process.exit(0)`. The `0` exit code signals that the process ended without errors.

## Seed data

Since a fresh database is empty, Running the application against would return no content. Instead of manually adding the data via a POST endpoint or with A GUI, a so called seed file can be used to scaffold some initial content. It collects the schema and initial rows into a single `.sql` file that the SQLite CLI applies against the database in one command. Re-running the file at any point resets the database to a known starting state.

The seed file lives at `db/seeddb.sql`. It holds plain SQL statements that the CLI reads top to bottom.

We will talk about the individual SQL statements in upcoming chapters, for now it is enough to get a rough overview of what the `seeddb.sql` does.

```sql
-- seeddb.sql
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO posts (title, content) VALUES
  ('First post', 'Hello world'),
  ('Second post', 'More content');
```

The file has three parts:

- `DROP TABLE IF EXISTS posts` removes an older version of the table if one is present. Including it makes the script idempotent: running it twice produces the same result as running it once.
- `CREATE TABLE posts (...)` defines the schema for the post table.
- `INSERT INTO posts ... VALUES (...), (...)` adds the initial rows. Several value tuples in one statement insert multiple rows in a single command.

To apply the file, pipe it into the `sqlite3` CLI:

```bash
sqlite3 db/blog.db < db/seeddb.sql
```

The `<` operator feeds the contents of `seeddb.sql` into `sqlite3` as if each line were typed at the prompt. The shell runs each statement against `db/blog.db`, then exits when the file ends. The `sqlite3` CLI ships with macOS and is available through most Linux package managers; on Windows it can be downloaded from the official SQLite site.

A `seed` entry in `package.json` wraps the command for convenience:

```json
// package.json
{
  "scripts": {
    "db:seed": "sqlite3 db/blog.db < db/seeddb.sql"
  }
}
```

`npm run db:seed` resets the database to its initial state whenever development data drifts or a clean slate is needed before a manual test.

## Resources

- [sqlite npm package](https://www.npmjs.com/package/sqlite)
- [Node.js process signals](https://nodejs.org/api/process.html#signal-events)
