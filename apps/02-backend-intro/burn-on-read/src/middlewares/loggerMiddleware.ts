import type { Request, Response, NextFunction } from 'express';
import { appendFile, mkdir } from 'fs/promises';
import path from 'node:path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'logs.txt');

let initPromise: Promise<void> | null = null;

async function ensureLogDir(): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });
}

export function initLogger(): Promise<void> {
  if (!initPromise) {
    initPromise = ensureLogDir().catch((err) => {
      console.error('Failed to initialize log directory:', err);
      throw err;
    });
  }
  return initPromise;
}

async function addLogMessage(message: string): Promise<void> {
  try {
    await appendFile(LOG_FILE, message + '\n');
  } catch (error) {
    console.error('Error writing log:', error);
  }
}

export async function logger(req: Request, _res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/css')) {
    return next();
  }

  const { ip, method, originalUrl: url } = req;

  const logMessage = [method, ip, url, new Date().toISOString()].join(' ');

  addLogMessage(logMessage);

  next();
}
