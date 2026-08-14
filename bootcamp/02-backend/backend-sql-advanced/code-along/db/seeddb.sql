-- seeddb.sql
-- Drop children before parents so the FOREIGN KEY references never dangle.
DROP TABLE IF EXISTS blog_entry_tags;

DROP TABLE IF EXISTS tags;

DROP TABLE IF EXISTS blog_entries;

DROP TABLE IF EXISTS author_profiles;

DROP TABLE IF EXISTS authors;

-- One-to-many: an author has many blog entries.
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

-- One-to-one: at most one profile per author (UNIQUE author_id).
CREATE TABLE author_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  FOREIGN KEY (author_id) REFERENCES authors (id)
);

CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  teaser TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors (id)
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Many-to-many: junction table pairing blog entries with tags.
CREATE TABLE blog_entry_tags (
  blog_entry_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (blog_entry_id, tag_id),
  FOREIGN KEY (blog_entry_id) REFERENCES blog_entries (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);

INSERT INTO
  authors (name, email)
VALUES
  ('Anna', 'anna@example.com'),
  ('Ben', 'ben@example.com'),
  ('Clara', 'clara@example.com');

-- Ben (id 2) intentionally has no profile row, so LEFT JOINs against
-- author_profiles return NULL bio/avatar_url for him.
INSERT INTO
  author_profiles (author_id, bio, avatar_url)
VALUES
  (
    1,
    'Coffee enthusiast and morning-routine optimizer.',
    '/images/avatars/anna.jpg'
  ),
  (
    3,
    'Hikes on weekends, bakes sourdough the rest of the time.',
    '/images/avatars/clara.jpg'
  );

INSERT INTO
  blog_entries (
    title,
    teaser,
    author_id,
    createdAt,
    image,
    content
  )
VALUES
  (
    'Brewing the perfect coffee',
    'A short guide to better mornings.',
    1,
    '2026-01-05',
    '/images/coffee.jpg',
    'Coffee is best brewed slowly, with freshly ground beans and water just off the boil.'
  ),
  (
    'Coffee shops of the city',
    'Where to find a good cup nearby.',
    1,
    '2026-02-14',
    '/images/coffee-shops.jpg',
    'A short list of coffee shops worth visiting, ranked by how quiet they are on weekday mornings.'
  ),
  (
    'Getting started with SQLite',
    'Zero-configuration databases explained.',
    2,
    '2026-03-01',
    '/images/sqlite.jpg',
    'SQLite is a serverless, self-contained database engine that stores everything in a single file.'
  ),
  (
    'Why relational databases matter',
    'Tables, rows, and the keys that connect them.',
    2,
    '2026-03-20',
    '/images/relational.jpg',
    'Relational databases organize data into tables and let you traverse relationships between them using keys.'
  ),
  (
    'A weekend hiking trip',
    'Notes from the trail.',
    3,
    '2026-04-02',
    '/images/hiking.jpg',
    'Three days on the trail, mostly rain, entirely worth it for the view from the summit.'
  ),
  (
    'Baking sourdough at home',
    'Patience, flour, and time.',
    3,
    '2026-04-18',
    '/images/sourdough.jpg',
    'Sourdough rewards patience more than skill. Feed the starter, wait, and trust the process.'
  );

INSERT INTO
  tags (name)
VALUES
  ('coffee'),
  ('mornings'),
  ('sqlite'),
  ('databases'),
  ('outdoors'),
  ('baking');

-- (1, 1)/(1, 2): Brewing the perfect coffee -> coffee, mornings
-- (2, 1): Coffee shops of the city -> coffee
-- (3, 3)/(3, 4): Getting started with SQLite -> sqlite, databases
-- (4, 4): Why relational databases matter -> databases
-- (5, 5): A weekend hiking trip -> outdoors
-- (6, 6): Baking sourdough at home -> baking
INSERT INTO
  blog_entry_tags (blog_entry_id, tag_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 3),
  (3, 4),
  (4, 4),
  (5, 5),
  (6, 6);
