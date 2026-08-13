import type { Request, Response, NextFunction } from 'express';
import { access, appendFile, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'logs.txt');

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function ensureLogFile(): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });

  const exists = await fileExists(LOG_FILE);

  if (!exists) {
    await writeFile(LOG_FILE, '', { encoding: 'utf-8' });
  }
}

async function addLogMessage(message: string): Promise<void> {
  try {
    await appendFile(LOG_FILE, message + '\n', { encoding: 'utf-8' });
  } catch (error) {
    console.error('Error:', error);
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(' ');

    void addLogMessage(logEntry);
  });

  next();
}
