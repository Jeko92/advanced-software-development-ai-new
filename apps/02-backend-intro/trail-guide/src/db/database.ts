import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Please specify it in your .env file`);
  }
  return value;
}

let db: Database | null = null;

export async function connectDB() {
  const dbPath = requireEnv('DB_PATH');
  db = await open({ filename: dbPath, driver: sqlite3.Database });
  await db.run(/* sql */ `PRAGMA foreign_keys = ON;`);

  // const testRegion: unknown = await db.all('SELECT * FROM regions LIMIT 1');
  // const testTrail: unknown = await db.all('SELECT * FROM trails LIMIT 1');

  console.log(`$Database connected and tables initialized.`);
  // console.log(JSON.stringify(testRegion, null, 2));
  // console.log(JSON.stringify(testTrail, null, 2));

  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

export async function closeDB() {
  if (db) {
    await db.close();
    db = null;
  }
}
