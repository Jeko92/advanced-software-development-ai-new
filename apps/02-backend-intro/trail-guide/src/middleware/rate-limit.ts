import type { NextFunction, Request, Response } from 'express';

const WINDOW_MS = Number(process.env['WINDOW_MS']) || 60_000;
const MAX_REQUESTS_PER_WINDOW =
  Number(process.env['MAX_REQUESTS_PER_WINDOW']) || 10;

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const requestCounts = new Map<string, RateLimitEntry>();

export const rateLimitHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header('x-api-key') ?? 'unknown';
  const now = Date.now();

  const entry = requestCounts.get(apiKey);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    requestCounts.set(apiKey, { count: 1, windowStart: now });
    next();
    return;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    res
      .status(429)
      .json({ error: 'Too many requests, please try again later' });
    return;
  }

  entry.count += 1;
  next();
};
