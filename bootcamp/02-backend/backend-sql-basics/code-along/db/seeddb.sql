-- seeddb.sql
DROP TABLE IF EXISTS blog_entries;

CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  teaser TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO
  blog_entries (title, teaser, author, createdAt, image, content)
VALUES
  (
    'Brewing the perfect coffee',
    'A short guide to better mornings.',
    'Anna',
    '2026-01-05',
    '/images/coffee.jpg',
    'Coffee is best brewed slowly, with freshly ground beans and water just off the boil.'
  ),
  (
    'Coffee shops of the city',
    'Where to find a good cup nearby.',
    'Anna',
    '2026-02-14',
    '/images/coffee-shops.jpg',
    'A short list of coffee shops worth visiting, ranked by how quiet they are on weekday mornings.'
  ),
  (
    'Getting started with SQLite',
    'Zero-configuration databases explained.',
    'Ben',
    '2026-03-01',
    '/images/sqlite.jpg',
    'SQLite is a serverless, self-contained database engine that stores everything in a single file.'
  ),
  (
    'Why relational databases matter',
    'Tables, rows, and the keys that connect them.',
    'Ben',
    '2026-03-20',
    '/images/relational.jpg',
    'Relational databases organize data into tables and let you traverse relationships between them using keys.'
  ),
  (
    'A weekend hiking trip',
    'Notes from the trail.',
    'Clara',
    '2026-04-02',
    '/images/hiking.jpg',
    'Three days on the trail, mostly rain, entirely worth it for the view from the summit.'
  ),
  (
    'Baking sourdough at home',
    'Patience, flour, and time.',
    'Clara',
    '2026-04-18',
    '/images/sourdough.jpg',
    'Sourdough rewards patience more than skill. Feed the starter, wait, and trust the process.'
  );
