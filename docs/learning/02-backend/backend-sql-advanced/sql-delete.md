# Backend SQL Advanced - SQL DELETE

Some data eventually has to go. A user closes their account, a published post gets retracted or an outdated record has to be cleared out. SQL handles removal with the DELETE statement, which removes rows from a table without touching the table's structure. In a web app, DELETE typically runs behind a DELETE HTTP endpoint, where the client sends the ID of the resource to remove.

## DELETE statement

DELETE names the table and a `WHERE` clause that identifies which rows to remove:

```sql
DELETE FROM blog_entries WHERE id = 3;
```

Without `WHERE`, DELETE removes all rows in the table. Unlike dropping the table, this preserves the schema but empties it entirely. Always write and verify the `WHERE` clause before running DELETE in production.

## DELETE route

We need a DELETE route in our express app for removing an existing entry. The route reads the entry ID from the URL parameter and passes it to the model function. There is no request body to read because a delete only needs to know which row to remove.

```typescript
// route handler
router.delete("/:id", async (req, res) => {
  await deleteBlogEntry(Number(req.params.id));
});
```

The model function is the simplest of the three mutations because it takes just the `id`.

```typescript
// model function
export async function deleteBlogEntry(id: number): Promise<void> {
  const db = getDB();
  await db.run(`DELETE FROM blog_entries WHERE id = @id`, { "@id": id });
}
```

Finally, the full route handler wraps the call in a try/catch and returns `200 OK` on success.

```typescript
// route handler
router.delete("/:id", async (req, res) => {
  try {
    await deleteBlogEntry(Number(req.params.id));
    res.status(200).json({ message: "Blog entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog entry" });
  }
});
```

## Resources

- [SQLite DELETE](https://www.sqlite.org/lang_delete.html)
- [Express routing](https://expressjs.com/en/guide/routing.html)
