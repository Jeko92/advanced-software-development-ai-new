import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';

const DB_FILE = process.env['DB_PATH']
  ? path.resolve(process.env['DB_PATH'])
  : path.join(process.cwd(), 'db', 'blog.db');

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({ filename: DB_FILE, driver: sqlite3.Database });

  // Foreign keys are off by default in SQLite; the tables below rely on them.
  await db.run(/* sql */ `PRAGMA foreign_keys = ON`);

  // One-to-many: an author has many blog entries, each entry has one author.
  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  // One-to-one: each author has at most one profile, enforced by UNIQUE.
  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS author_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER UNIQUE NOT NULL,
      bio TEXT,
      avatar_url TEXT,
      FOREIGN KEY (author_id) REFERENCES authors (id)
    )
  `);

  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS blog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      teaser TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      image TEXT NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (author_id) REFERENCES authors (id)
    )
  `);

  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Many-to-many: an entry can have many tags, a tag can label many entries.
  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS blog_entry_tags (
      blog_entry_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (blog_entry_id, tag_id),
      FOREIGN KEY (blog_entry_id) REFERENCES blog_entries (id),
      FOREIGN KEY (tag_id) REFERENCES tags (id)
    )
  `);

  console.log('Database connected and tables initialized.');
  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
