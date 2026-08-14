# Backend SQL Basics - SQL SELECT

Reading data is the most common operation in most applications. A page load typically triggers several reads: fetch the current user, load their posts, pull the comments for each one. SQL's `SELECT` statement handles all of this. It specifies which columns to retrieve, which table to read from, and optional conditions that filter, sort, or limit the results. The patterns here carry over directly to the mutation statements in the next session.

## SELECT and FROM

The minimal `SELECT` statement names one or more columns and a table:

```sql
SELECT title, author FROM blog_entries;
```

The result is every row in `blog_entries`, but only the `title` and `author` columns. To retrieve all columns, use `*` instead of naming them:

```sql
SELECT * FROM blog_entries;
```

SQL keywords like `SELECT` and `FROM` are case-insensitive, but convention is to write them in uppercase to distinguish them from table and column names.

## WHERE

Without a `WHERE` clause, a query returns every row in the table. `WHERE` adds a condition that each row must satisfy to be included:

```sql
SELECT * FROM blog_entries WHERE author = 'Anna';
```

Multiple conditions can be combined with logical operators:

- `AND` — both conditions must be true
- `OR` — at least one condition must be true
- `NOT` — reverses the condition

```sql
SELECT * FROM blog_entries WHERE author = 'Anna' AND title LIKE '%coffee%';
```

The `LIKE` operator matches patterns. `%` stands for any sequence of characters, and `_` stands for any single character. `LIKE '%coffee%'` matches any title containing the word "coffee" anywhere.

Other useful `WHERE` operators:

- `IN` - matches any value from a list: `WHERE author IN ('Anna', 'Ben', 'Clara')`
- `BETWEEN` - matches a range, inclusive on both ends: `WHERE id BETWEEN 10 AND 20`
- `IS NULL` - matches rows where the column has no value: `WHERE image IS NULL`
- `NOT` - negates a condition: `WHERE NOT image IS NULL`

Comparison operators work the same way as in most programming languages: `=`, `!=` (or `<>`), `>`, `<`, `>=`, `<=`.

## ORDER BY and LIMIT

By default, a `SELECT` query returns rows in an unspecified order. `ORDER BY` specifies a column to sort by:

```sql
SELECT * FROM blog_entries ORDER BY createdAt DESC;
```

`ASC` sorts ascending (smallest or earliest first, which is the default). `DESC` sorts descending (largest or most recent first).

`LIMIT` caps the number of rows returned:

```sql
SELECT * FROM blog_entries ORDER BY createdAt DESC LIMIT 5;
```

This query returns the five most recently created blog entries. Combining `ORDER BY` and `LIMIT` is the standard way to fetch the latest or top-ranked items.

## GET route example: all blog entries

We need a GET route in our express app for retrieving all blog entries. The route does not read anything from the request because it returns the full collection. It calls the model function and sends the result back.

```typescript
// route handler
router.get("/", async (req, res) => {
  const entries = await getAllBlogEntries();
  res.json(entries);
});
```

The model function uses `db.all()`, the `sqlite` package's method for queries that return rows. It resolves with an array of every row the query produces. A generic type parameter tells TypeScript what shape each row has.

```typescript
// model function
import { getDB } from "../db/database";
import { BlogEntry } from "../types";

export async function getAllBlogEntries(): Promise<BlogEntry[]> {
  const db = getDB();
  return await db.all<BlogEntry[]>("SELECT * FROM blog_entries");
}
```

`getDB()` returns the open database connection from the database module. Because the SELECT statement has no parameters, only the SQL string is passed to `db.all()`.

Finally, the full route handler wraps the call in a try/catch and returns `200 OK` on success.

```typescript
// route handler
router.get("/", async (req, res) => {
  try {
    const entries = await getAllBlogEntries();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog entries" });
  }
});
```

## GET route example: blog entry by id

We also need a GET route for retrieving a single blog entry by its `id`. The id arrives as a URL parameter, gets converted to a number, and is passed to the model function.

```typescript
// route handler
router.get("/blog/entries/:id", async (req, res) => {
  const entry = await getBlogEntryById(Number(req.params.id));
});
```

The model function uses `db.get()` instead of `db.all()`. Where `db.all()` returns every matching row, `db.get()` returns just the first one (or `undefined` if there is no match). For a query that filters by a unique column like `id`, `db.get()` is the right choice.

```typescript
// model function
import { getDB } from "../db/database";
import { BlogEntry } from "../types";

export async function getBlogEntryById(
  id: number,
): Promise<BlogEntry | undefined> {
  const db = getDB();
  return await db.get<BlogEntry>("SELECT * FROM blog_entries WHERE id = ?", [
    id,
  ]);
}
```

> ⚠️ You might think that we could simple interpolate the id into the SQL string (`SELECT * FROM blog_entries WHERE id = ${id}`), but that would open our app up to one of the most common web app vulnarabilities: SQL injection attacks. Instead we let our SQL library do the interpolation plus input sanitization for us. The `?` is a placeholder that gets replaced by the value from the array, in this case `id`.

Finally, the full route handler returns `404 Not Found` when no entry matches the given id and `500` on unexpected errors.

```typescript
// route handler
router.get("/blog/entries/:id", async (req, res) => {
  try {
    const entry = await getBlogEntryById(Number(req.params.id));

    if (!entry) {
      res.status(404).json({ error: "Blog entry not found" });
      return;
    }

    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog entry" });
  }
});
```

## Resources

- [SELECT on SQLite documentation](https://www.sqlite.org/lang_select.html)
- [SQL WHERE clause on MDN](https://developer.mozilla.org/en-US/docs/Web/SQL/WHERE)
- [W3Schools SQL reference](https://www.w3schools.com/sql/)
- [sqlite npm package](https://www.npmjs.com/package/sqlite)
- [About SQL Injections](https://owasp.org/www-community/attacks/SQL_Injection)
