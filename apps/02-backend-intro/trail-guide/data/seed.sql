PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS trail_tags;

DROP TABLE IF EXISTS tags;

DROP TABLE IF EXISTS trails;

DROP TABLE IF EXISTS regions;

CREATE TABLE regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  description TEXT
);

CREATE TABLE trails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'hard')),
  distance_km REAL NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (region_id) REFERENCES regions (id)
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE trail_tags (
  trail_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (trail_id, tag_id),
  FOREIGN KEY (trail_id) REFERENCES trails (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);

INSERT INTO
  regions (name, slug, country, description)
VALUES
  (
    'Bavarian Alps',
    'bavarian-alps',
    'Germany',
    'A stretch of the Northern Limestone Alps shared with Austria, known for limestone peaks and alpine meadows.'
  ),
  (
    'Scottish Highlands',
    'scottish-highlands',
    'United Kingdom',
    'A mountainous region covering the northern half of Scotland, full of glens, lochs, and coastal moors.'
  ),
  (
    'Dolomites',
    'dolomites',
    'Italy',
    'A range in the eastern Italian Alps recognised by UNESCO for its pale, jagged peaks and via ferrata routes.'
  );

INSERT INTO
  trails (
    region_id,
    title,
    slug,
    difficulty,
    distance_km,
    description,
    image_url,
    created_at
  )
VALUES
  (
    1,
    'Partnach Gorge Loop',
    'partnach-gorge-loop',
    'easy',
    4.2,
    '<p>A short walk through a deeply cut limestone gorge near Garmisch-Partenkirchen. Stays close to river level and is well-shaded throughout.</p>',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    1730000000
  ),
  (
    1,
    'Zugspitze via Reintal',
    'zugspitze-via-reintal',
    'hard',
    21.0,
    '<p>The classic ascent of the Zugspitze from the Bavarian side. Long valley approach followed by a steep climb past the Knorrhuette.</p>',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    1731000000
  ),
  (
    2,
    'Old Man of Storr',
    'old-man-of-storr',
    'moderate',
    3.8,
    '<p>A steep path on the Trotternish ridge of Skye that climbs to one of the most photographed rock pinnacles in Scotland.</p>',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    1732000000
  ),
  (
    2,
    'Ben Nevis Mountain Track',
    'ben-nevis-mountain-track',
    'hard',
    17.0,
    '<p>The standard route up the highest mountain in the British Isles. A long sustained climb that should not be underestimated in poor weather.</p>',
    'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1',
    1733000000
  ),
  (
    3,
    'Tre Cime di Lavaredo Loop',
    'tre-cime-di-lavaredo-loop',
    'moderate',
    10.0,
    '<p>A circular hike around the three iconic peaks. Mostly on well-graded paths with continuously changing views of the rock walls.</p>',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    1734000000
  ),
  (
    3,
    'Seceda Ridgeline',
    'seceda-ridgeline',
    'easy',
    6.5,
    '<p>An easy walk along an exposed grassy ridge above Ortisei with sweeping views of the Odle group. Reachable by cable car.</p>',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    1735000000
  );

INSERT INTO
  tags (name, slug)
VALUES
  ('Family Friendly', 'family-friendly'),
  ('Scenic Views', 'scenic-views'),
  ('Summit', 'summit'),
  ('Photography', 'photography'),
  ('Ridge Walk', 'ridge-walk'),
  ('Cable Car Access', 'cable-car-access');

INSERT INTO
  trail_tags (trail_id, tag_id)
VALUES
  (1, 1),
  (1, 2), -- Partnach Gorge Loop: Family Friendly, Scenic Views
  (2, 3),
  (2, 2), -- Zugspitze via Reintal: Summit, Scenic Views
  (3, 4),
  (3, 2), -- Old Man of Storr: Photography, Scenic Views
  (4, 3), -- Ben Nevis Mountain Track: Summit
  (5, 4),
  (5, 5), -- Tre Cime di Lavaredo Loop: Photography, Ridge Walk
  (6, 5),
  (6, 6),
  (6, 1);

-- Seceda Ridgeline: Ridge Walk, Cable Car Access, Family Friendly
