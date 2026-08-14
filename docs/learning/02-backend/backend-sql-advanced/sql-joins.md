# Backend SQL Advanced - SQL JOINs

When a blog entry table stores an `author_id` instead of the author's name directly, a single `SELECT * FROM blog_entries` query returns the ID but not the name. To display the author's name alongside each post, you need data from two tables at once. A JOIN combines rows from multiple tables based on a shared value, producing a single result set with columns from each.

## Why related data lives in separate tables

Storing the author's name inside each blog entry row results in data duplication. If the author changes their display name, every row referencing them needs to be updated. Separating data into distinct tables (one for blog entries, one for authors) means each piece of information exists in exactly one place. A blog entry stores the author's `id`, and that ID is the link to the authors table.

This separation is only useful if you can bring the data back together at query time. That is what JOINs do.

## JOIN or INNER JOIN

An INNER JOIN returns rows where both tables have a matching value on the join condition. Rows with no match on either side are excluded from the result.

```sql
SELECT * FROM blog_entries
INNER JOIN authors ON blog_entries.author_id = authors.id;
```

| id  | title                         | createdAt           | author_id | id  | name         | email             |
| --- | ----------------------------- | ------------------- | --------- | --- | ------------ | ----------------- |
| 1   | Getting Started with SQL      | 2026-01-15 09:23:14 | 101       | 101 | Alice Chen   | alice@example.com |
| 2   | Why I Love Postgres           | 2026-02-03 14:07:42 | 102       | 102 | Bob Martinez | bob@example.com   |
| 3   | Indexing Strategies Explained | 2026-02-19 11:45:30 | 101       | 101 | Alice Chen   | alice@example.com |
| 5   | A Brief History of NoSQL      | 2026-03-22 08:30:00 | 103       | 103 | Carol Singh  | carol@example.com |

The `INNER JOIN` clause finds the correct data from the `ON` table for each row in the `FROM` table and merges their data into one row. Most often we don't want all this data, so we narrow down the `SELECT` statement to select the columns we want:

```sql
SELECT blog_entries.title, blog_entries.createdAt, authors.name
FROM blog_entries
INNER JOIN authors ON blog_entries.author_id = authors.id;
```

This results in the following output:

| title                         | createdAt           | name         |
| ----------------------------- | ------------------- | ------------ |
| Getting Started with SQL      | 2026-01-15 09:23:14 | Alice Chen   |
| Why I Love Postgres           | 2026-02-03 14:07:42 | Bob Martinez |
| Indexing Strategies Explained | 2026-02-19 11:45:30 | Alice Chen   |
| A Brief History of NoSQL      | 2026-03-22 08:30:00 | Carol Singh  |

This query produces one row per blog entry, including only entries that have a matching author record. If a blog entry has an `author_id` that does not correspond to any row in `authors`, that entry is left out.

The `ON` clause defines how the two tables relate. `blog_entries.author_id = authors.id` tells the database to match rows where the foreign key in `blog_entries` equals the primary key in `authors`.

Since `INNER JOIN` is the most frequent type of join, it can be shortened to just `JOIN`. The effects are the same.

## LEFT JOIN

A LEFT JOIN returns all rows from the left table (the one named after `FROM` in this case `blog_entries`), plus the matching rows from the right table. When there is no matching row in the right table, the right-side columns appear as `NULL`.

```sql
SELECT blog_entries.title, blog_entries.createdAt, authors.name
FROM blog_entries
LEFT JOIN authors ON blog_entries.author_id = authors.id;
```

An example output would look like this:

| title                         | createdAt           | name         |
| ----------------------------- | ------------------- | ------------ |
| Getting Started with SQL      | 2026-01-15 09:23:14 | Alice Chen   |
| Why I Love Postgres           | 2026-02-03 14:07:42 | Bob Martinez |
| Indexing Strategies Explained | 2026-02-19 11:45:30 | Alice Chen   |
| Debugging Slow Queries        | 2026-03-08 16:12:55 | NULL         |
| A Brief History of NoSQL      | 2026-03-22 08:30:00 | Carol Singh  |

This returns every blog entry, even those whose `author_id` does not match any author. For those entries, `authors.name` is `NULL`. Use a LEFT JOIN when you want the full set of one table regardless of whether a related record exists in another.

The choice between (INNER) JOIN and LEFT JOIN depends on what you want when a match is missing. INNER JOIN hides the row; LEFT JOIN keeps it with NULLs on the joined side.

Please note that there also exist RIGHT JOINs and FULL JOINs, but these are less common are and not covered here.

## Resources

- [SQLite JOIN syntax](https://www.sqlite.org/syntax/join-clause.html)
- [SQL JOINs explained on W3Schools](https://www.w3schools.com/sql/sql_join.asp)
