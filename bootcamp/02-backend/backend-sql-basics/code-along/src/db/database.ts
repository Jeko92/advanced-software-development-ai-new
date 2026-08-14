import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'node:path';

const DB_FILE = process.env['DB_PATH']
  ? path.resolve(process.env['DB_PATH'])
  : path.join(process.cwd(), 'db', 'blog.db');

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({ filename: DB_FILE, driver: sqlite3.Database });

  await db.run(/* sql */ `
    CREATE TABLE IF NOT EXISTS blog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      teaser TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      image TEXT NOT NULL,
      content TEXT NOT NULL
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
