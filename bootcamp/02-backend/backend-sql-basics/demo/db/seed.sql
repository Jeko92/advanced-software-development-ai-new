DROP TABLE IF EXISTS posting;

CREATE TABLE posting (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO
  posting (title, content)
VALUES
  (
    'First Blog Post',
    'This is the content of the first blog post.'
  ),
  (
    'Second Blog Post',
    'This is the content of the second blog post.'
  ),
  (
    'Third Blog Post',
    'This is the content of the third blog post.'
  );
