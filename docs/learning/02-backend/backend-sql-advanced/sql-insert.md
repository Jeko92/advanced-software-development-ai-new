# Backend SQL Advanced - SQL INSERT

Reading data is only one half of an application. Eventually users need to add new entries: posting a comment, creating an account, submitting a form. SQL handles this with the INSERT statement, which adds a single new row to a table. In an Express app with a model layer, every new piece of data a user submits goes through INSERT before reaching the database.

## INSERT statement

INSERT names the target table, lists the columns receiving values, and provides the values in the same order:

```sql
INSERT INTO blog_entries (title, teaser, author, createdAt, image, content)
VALUES ('My First Post', 'A short intro', 'Anna', '2024-01-15', 'cover.jpg', 'Full content here.');
```

A few rules govern the column list:

- Columns with `AUTOINCREMENT` (like `id`) are omitted. The database generates that value automatically.
- Columns marked `NOT NULL` must be included. Omitting them causes an error.
- Columns not listed receive their default value, typically `NULL`.

## POST route

We need to create a POST route in our express app for creating entries. The route receives the user generated data in the request body.
The data is then passed to the model function which itself handles the SQL statement.

```typescript
// route handler
router.post("/blog/entries", async (req, res) => {
  await createBlogEntry(req.body);
});
```

The previous session used `db.all()` for SELECT queries. Mutations need a different method: `db.run()`. The reason is that mutations have no rows to return. Instead, `db.run()` resolves with a `RunResult` object that has two useful properties:

- `lastID` is the auto-generated `id` of the row just inserted.
- `changes` is the number of rows the statement affected.

For INSERT, `lastID` is the value to send back to the client so it knows which resource was created.

```typescript
// model function
export async function createBlogEntry(
  entry: Omit<BlogEntry, "id">,
): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `INSERT INTO blog_entries (title, teaser, author, createdAt, image, content)
     VALUES (@title, @teaser, @author, @createdAt, @image, @content)`,
    {
      "@title": entry.title,
      "@teaser": entry.teaser,
      "@author": entry.author,
      "@createdAt": entry.createdAt,
      "@image": entry.image,
      "@content": entry.content,
    },
  );
  return result.lastID!;
}
```

In the previous session we used `?` placeholders that get filled in order by a values array. The `sqlite` package also supports named placeholders, written with an `@` prefix. Instead of an array, the values come in as an object whose keys match the placeholder names. With many columns, named placeholders are easier to read and harder to mess up because there is no positional order to keep in sync between the SQL string and the values.

Both forms prevent SQL injection: the database driver binds the values rather than interpolating them into the query string.

Finally, we add update our route handler so the route handler returns `result.lastID` with a `201 Created` status, the conventional response for a successful POST that creates a new resource. Adding Error handling helps us to send an appropriate message to the client with `500 Internal Server Error` if something goes wrong.

```typescript
// route handler
router.post("/blog/entries", async (req, res) => {
  try {
    const newId = await createBlogEntry(req.body);
    res.status(201).json({ id: newId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog entry" });
  }
});
```

## Resources

- [SQLite INSERT](https://www.sqlite.org/lang_insert.html)
- [sqlite npm package](https://www.npmjs.com/package/sqlite)
- [About SQL Injections](https://owasp.org/www-community/attacks/SQL_Injection)
