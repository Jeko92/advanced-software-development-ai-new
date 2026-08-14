import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';

const db_path = path.join(process.cwd(), 'db', 'blog.db');

let db: Database | null = null;

export async function connectDB() {
  db = await open({ filename: db_path, driver: sqlite3.Database });

  await db.exec(`CREATE TABLE IF NOT EXISTS posting
                 (
                   id        INTEGER PRIMARY KEY AUTOINCREMENT,
                   image     TEXT      NOT NULL,
                   author    TEXT      NOT NULL,
                   createdAt TIMESTAMP NOT NULL,
                   teaser    TEXT      NOT NULL,
                   title     TEXT      NOT NULL,
                   content   TEXT      NOT NULL,
                   slug      TEXT      NOT NULL
                 );`);

  await db.exec(`CREATE TABLE IF NOT EXISTS authors
                 (
                   id   INTEGER PRIMARY KEY AUTOINCREMENT,
                   name TEXT NOT NULL
                 );`);

  // SQLite has no `ADD COLUMN IF NOT EXISTS`; ignore the "duplicate column"
  // error so this stays safe to run on every startup, like the CREATE TABLE
  // statements above.
  try {
    await db.exec(
      'ALTER TABLE posting ADD COLUMN author_id INTEGER REFERENCES authors(id);',
    );
  } catch (err) {
    if (!(err as Error).message.includes('duplicate column name')) {
      throw err;
    }
  }

  console.log('Database connected and tables initialized.');
  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeDB() {
  if (db) {
    await db.close();
    db = null;
  }
}
