# Backend SQL Advanced - SQL UPDATE

Once data exists in a table, users need to change it. An article needs correcting, a profile name changes or a status moves from draft to published. SQL handles modifications with the UPDATE statement, which targets specific rows and overwrites one or more of their column values. In a web app, UPDATE typically runs behind a PUT endpoint, where the client sends replacement data for an existing resource.

## UPDATE statement

UPDATE names the table, lists each column and its new value with `SET`, and filters which rows to modify with `WHERE`:

```sql
UPDATE blog_entries SET title = 'Updated Title', teaser = 'New teaser' WHERE id = 3;
```

Multiple columns are separated by commas in the `SET` clause. The `WHERE` clause narrows the statement to the rows that match the condition.

Without `WHERE`, UPDATE applies to every row in the table. This is rarely intentional and hard to undo. Always write and test the `WHERE` condition before running UPDATE in production.

## PUT route

We need a PUT route in our express app for updating an existing entry. The route reads the entry ID from the URL parameter and the replacement data from the request body. Both are passed to the model function.

```typescript
// route handler
router.put("/:id", async (req, res) => {
  await updateBlogEntry(Number(req.params.id), req.body);
});
```

The model function follows the same shape as `createBlogEntry`. The differences are the SQL statement itself and the extra `id` argument used by the `WHERE` clause.

```typescript
// model function
export async function updateBlogEntry(
  id: number,
  entry: Omit<BlogEntry, "id">,
): Promise<void> {
  const db = getDB();
  await db.run(
    `UPDATE blog_entries
     SET title = @title, teaser = @teaser, author = @author, createdAt = @createdAt, image = @image, content = @content
     WHERE id = @id`,
    {
      "@title": entry.title,
      "@teaser": entry.teaser,
      "@author": entry.author,
      "@createdAt": entry.createdAt,
      "@image": entry.image,
      "@content": entry.content,
      "@id": id,
    },
  );
}
```

The named placeholders mean the keys in the values object can be in any order; the database driver matches them by name. `req.params.id` arrives as a string, so `Number()` converts it before it reaches the model function.

Finally, the full route handler wraps the call in a try/catch and returns `200 OK` on success.

```typescript
// route handler
router.put("/:id", async (req, res) => {
  try {
    await updateBlogEntry(Number(req.params.id), req.body);
    res.status(200).json({ message: "Blog entry updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog entry" });
  }
});
```

## Resources

- [SQLite UPDATE](https://www.sqlite.org/lang_update.html)
- [Express routing](https://expressjs.com/en/guide/routing.html)
