# Backend SQL Advanced - SQL Relation Types

Once data lives across multiple tables, the next question is how those tables relate to each other. Not every relationship has the same shape. An author has exactly one profile, an author has many blog entries, and a blog entry can have many tags that themselves belong to many entries. SQL models these patterns with three relation types: one-to-one, one-to-many, and many-to-many. Each one is implemented through foreign keys, sometimes with the help of a third table. The shape of a relationship determines where to put the foreign key and whether you need an extra table at all.

## One-to-one

A one-to-one relation means each row in table A relates to at most one row in table B, and vice versa. An `authors` table paired with an `author_profiles` table is a typical example: each author has at most one profile, and each profile belongs to exactly one author.

To model this in SQL, one of the tables holds a foreign key that references the other. A `UNIQUE` constraint on that foreign key column keeps the relation one-to-one:

```sql
CREATE TABLE author_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

With sample data:

`authors`

| id  | name         |
| --- | ------------ |
| 101 | Alice Chen   |
| 102 | Bob Martinez |
| 103 | Carol Singh  |

`author_profiles`

| id  | author_id | bio                   | avatar_url |
| --- | --------- | --------------------- | ---------- |
| 1   | 101       | Likes databases.      | alice.jpg  |
| 2   | 103       | Writes about tooling. | carol.jpg  |

Bob has no profile row, which is allowed because the relation is optional on the profile side. Joining the two tables on the foreign key produces one combined row per author who has a profile:

```sql
SELECT authors.name, author_profiles.bio
FROM authors
INNER JOIN author_profiles ON authors.id = author_profiles.author_id;
```

| name        | bio                   |
| ----------- | --------------------- |
| Alice Chen  | Likes databases.      |
| Carol Singh | Writes about tooling. |

In practice, true one-to-one relations are uncommon. Most of the time the two tables can simply be merged into one. The pattern shows up when the secondary data is optional, accessed less frequently, or tied to different access permissions than the main table.

## One-to-many

A one-to-many relation means each row in table A can relate to many rows in table B, but each row in table B relates to exactly one row in table A. This is the most common relation type in relational databases.

An author with multiple blog entries is the standard example: one author has many entries, but each entry has only one author. The foreign key lives on the "many" side, in this case `blog_entries.author_id`:

```sql
CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  author_id INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

With sample data:

`blog_entries`

| id  | title                    | author_id |
| --- | ------------------------ | --------- |
| 1   | Getting Started with SQL | 101       |
| 2   | Why I Love Postgres      | 102       |
| 3   | Indexing Strategies      | 101       |

Joining `blog_entries` to `authors` on the foreign key produces one row per blog entry, with the author's name attached:

```sql
SELECT authors.name, blog_entries.title
FROM blog_entries
INNER JOIN authors ON blog_entries.author_id = authors.id;
```

| name         | title                    |
| ------------ | ------------------------ |
| Alice Chen   | Getting Started with SQL |
| Bob Martinez | Why I Love Postgres      |
| Alice Chen   | Indexing Strategies      |

Alice appears twice because she has two entries. The result has one row per blog entry, not one per author.

## Many-to-many

A many-to-many relation means each row in table A can relate to many rows in table B and vice versa. Blog entries and tags are a classic example: one entry can have many tags, and one tag can be attached to many entries.

There is a fundamental problem with many-to-many relations in SQL databases: A foreign key column can only store one value per row. To reference multiple entities of table A and B to each other, we need to deploy a little trick: a new third table, usually called a junction table or join table, that stores all pairwise relations of A and B by storing the respective ids of the linked items:

```sql
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE blog_entry_tags (
  blog_entry_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (blog_entry_id, tag_id),
  FOREIGN KEY (blog_entry_id) REFERENCES blog_entries(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

With sample data:

`tags`

| id  | name      |
| --- | --------- |
| 10  | beginner  |
| 11  | databases |
| 12  | postgres  |

`blog_entry_tags`

| blog_entry_id | tag_id |
| ------------- | ------ |
| 1             | 10     |
| 1             | 11     |
| 2             | 11     |
| 2             | 12     |

Each row in `blog_entry_tags` represents one connection between a blog entry and a tag. The composite primary key on `(blog_entry_id, tag_id)` prevents the same pair from appearing twice. Here, the unique identifier of the table item is not an autoincrementing number, but a combination of both ids that are stored in the table row.

To get the tags for each blog entry, we need to join three tables together with two JOIN statements:

```sql
SELECT blog_entries.title, tags.name
FROM blog_entries
INNER JOIN blog_entry_tags ON blog_entries.id = blog_entry_tags.blog_entry_id
INNER JOIN tags ON blog_entry_tags.tag_id = tags.id;
```

| title                    | name      |
| ------------------------ | --------- |
| Getting Started with SQL | beginner  |
| Getting Started with SQL | databases |
| Why I Love Postgres      | databases |
| Why I Love Postgres      | postgres  |

The result has one row per (entry, tag) pair, so an entry with multiple tags appears multiple times.

This might look like a lot of work for a single database relation. ORMs like TypeORM that you will get to know later help to abstract away the most work related to many-to-many relationships. But it is important to know what happens under the hood.

## Resources

- [SQLite foreign keys](https://www.sqlite.org/foreignkeys.html)
- [Database relationships on Wikipedia](<https://en.wikipedia.org/wiki/Cardinality_(data_modeling)>)
