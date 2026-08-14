# Backend SQL Basics - SQL Tables

A SELECT query assumes the table it reads from already exists. Before any data can be inserted, queried, or removed, we have to make sure the table itself is actually defined: its name, the columns it contains, the type of each column, and the constraints that apply. This is what Data Definition Language is for. `CREATE TABLE` defines a new table, `ALTER TABLE` changes the schema of an existing one, and `DROP TABLE` removes a table from the database entirely.

The shape of the data we want to store in our database very likely changes over the life of a project. A new feature needs a new column. An older column gets renamed when its name no longer fits its purpose or a prototype table gets removed once its data has moved elsewhere. Every relational database supports the same operations for these changes, with minor dialect differences between systems.

You will run these statements far less often than SELECT or INSERT. Tables are created once when the application is set up, altered occasionally as requirements shift, and dropped only when their data is no longer needed. The syntax is still worth knowing, because every project starts with at least one `CREATE TABLE` statement, and the structure of that statement is the structure your queries have to match.

## Creating a table

`CREATE TABLE` defines a new table with a list of columns. Each column has a name and a data type, and optionally one or more constraints.

```sql
CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  teaser TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL
);
```

The columns above use two SQLite types and three constraints:

- `INTEGER` stores whole numbers
- `TEXT` stores strings of any length
- `PRIMARY KEY` marks the column as the unique identifier for each row
- `AUTOINCREMENT` tells SQLite to assign the next unused integer to this column on every insert, so you do not have to set the `id` yourself
- `NOT NULL` rejects any insert that leaves the column empty

SQLite has a small set of built-in types: `INTEGER`, `TEXT`, `REAL` (floating-point numbers), `BLOB` (binary data), and `NUMERIC`. Other databases use more types (PostgreSQL has `VARCHAR(n)`, `BOOLEAN`, `TIMESTAMP`, and others), but the overall `CREATE TABLE` syntax is the same across dialects.

A column without `NOT NULL` is allowed to be empty. Inserts that omit such a column store `NULL` for that row. Use `NOT NULL` for fields the application always needs, and leave it off for fields that are genuinely optional.

## Checking for existence

Running `CREATE TABLE blog_entries (...)` twice produces an error the second time, because the table already exists. This matters when the database setup runs every time the server starts. Without protection, the second startup would crash.

`IF NOT EXISTS` makes the statement skip the creation when the table is already there:

```sql
CREATE TABLE IF NOT EXISTS blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ...
);
```

The first run creates the table. Every run after that is a no-op.

`IF NOT EXISTS` only checks the table name. If a table with that name exists but has different columns, the statement still skips creation, and your schema does not get updated. To change the columns of an existing table, use `ALTER TABLE`.

## Changing a table

`ALTER TABLE` modifies the schema of an existing table. The most common operations are renaming the table, renaming a column, and adding a column.

Rename a table:

```sql
ALTER TABLE blog_entries RENAME TO posts;
```

Rename a column:

```sql
ALTER TABLE blog_entries RENAME COLUMN createdAt TO created_at;
```

Add a column:

```sql
ALTER TABLE blog_entries ADD COLUMN updatedAt TEXT;
```

A new column added with `ADD COLUMN` is filled with `NULL` for every existing row. If you want the column to be `NOT NULL`, you also need a `DEFAULT` value so existing rows get something on creation:

```sql
ALTER TABLE blog_entries ADD COLUMN updatedAt TEXT NOT NULL DEFAULT '';
```

SQLite supports a smaller set of `ALTER TABLE` operations than most other databases. Dropping a column is supported in SQLite 3.35.0 and later:

```sql
ALTER TABLE blog_entries DROP COLUMN teaser;
```

For older SQLite versions, or for changes that SQLite does not support directly (changing a column's type, for example), the standard workaround is to create a new table with the desired schema, copy the data over with `INSERT INTO ... SELECT FROM`, drop the old table, and rename the new one.

## Deleting a table

`DROP TABLE` removes a table and all of its rows from the database. The operation is permanent: there is no soft delete and no automatic backup.

```sql
DROP TABLE blog_entries;
```

The statement errors if the table does not exist. `IF EXISTS` suppresses that error:

```sql
DROP TABLE IF EXISTS blog_entries;
```

Because the change cannot be undone, run `DROP TABLE` against a development database, not a production one, and check the table name carefully before executing.

## Express example: Creating tables on server startup

The `connectDB` function from the SQLite setup chapter opens the connection but does nothing else. The first time the server runs against a new database file, the `blog_entries` table does not exist yet, and any query against it will fail. Running `CREATE TABLE IF NOT EXISTS` inside `connectDB` solves this: the table is created on the first startup, and every later startup leaves it untouched.

The `sqlite` package exposes `db.run()`. With this method we can execute SQL statements which get executed on the currently connected database. It's important to notice that `db.run()` does not return any values, for accessing data we will need an different method.

```typescript
export async function connectDB(): Promise<Database> {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS blog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      teaser TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      image TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);

  return db;
}
```

The SQL statement is passed as a template string so it can span multiple lines for readability. `await` blocks until the statement finishes, so by the time `connectDB` returns, the table is guaranteed to exist.

Putting the schema definition next to the connection logic keeps the database setup in one place. When the schema changes later, the change happens in the same module that opens the connection, and any developer cloning the repository gets a working database the first time they start the server.

## Resources

- [SQLite CREATE TABLE](https://www.sqlite.org/lang_createtable.html)
- [SQLite ALTER TABLE](https://www.sqlite.org/lang_altertable.html)
- [SQLite DROP TABLE](https://www.sqlite.org/lang_droptable.html)
- [SQLite data types](https://www.sqlite.org/datatype3.html)
