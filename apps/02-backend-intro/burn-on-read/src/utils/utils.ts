import { access, mkdir, readFile, writeFile, unlink } from 'fs/promises';
import path from 'node:path';

const MESSAGE_DIR = path.join(process.cwd(), 'message-vault');

export function getFullYear() {
  return new Date().getFullYear();
}

export function sanitizeMessage(message: string): string {
  const replacements: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return [...message].map((char) => replacements[char] ?? char).join('');
}

export function createUUID() {
  return crypto.randomUUID();
}

export async function storeMessage(id: string, message: string): Promise<void> {
  await mkdir(MESSAGE_DIR, { recursive: true });
  const filePath = path.join(MESSAGE_DIR, `${id}.txt`);
  await writeFile(filePath, message);
}

export async function readMessage(id: string): Promise<string | null> {
  const filePath = path.join(MESSAGE_DIR, `${id}.txt`);
  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

export async function messageExists(id: string): Promise<boolean> {
  const filePath = path.join(MESSAGE_DIR, `${id}.txt`);
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const filePath = path.join(MESSAGE_DIR, `${id}.txt`);
  try {
    await unlink(filePath);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error deleting message ${id}: ${message}`);
  }
}
