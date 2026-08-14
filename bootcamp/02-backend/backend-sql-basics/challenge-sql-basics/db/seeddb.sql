-- seeddb.sql
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO
  posts (title, content)
VALUES
  ('first post', 'first post content'),
  ('second post', 'second post content'),
  ('third post', 'third post content'),
  ('fourth post', 'fourth post content');
