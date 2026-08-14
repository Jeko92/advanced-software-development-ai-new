# Backend SQL Advanced - Challenges

## Extend Your Express Project with Full CRUD

Add create, update, and delete operations to the Express project from the previous session.

**Requirements:**

- Add a `createBlogEntry` model function that runs an INSERT and returns the new entry's ID via `this.lastID`
- Add an `updateBlogEntry` model function that runs an UPDATE scoped to a specific ID
- Add a `deleteBlogEntry` model function that runs a DELETE scoped to a specific ID
- Add POST, PUT, and DELETE route handlers that call the corresponding model functions
- Use parameterized queries (`?` placeholders) for all values — do not interpolate values directly into the SQL string
- Test each route with a REST client (e.g. Bruno or curl) and verify the changes in DB Browser

## Optional: Authors Table and JOIN

- Create a separate `authors` table with at least `id` and `name` columns
- Add an `author_id` foreign key column to your `blog_entries` table
- Populate both tables with sample data
- Write a SELECT query with a JOIN that returns each blog entry alongside the author's name
- Expose a new GET route that returns the joined result
- (Optional) Add a user interface to manage authors — create, edit, and delete author records
