import type { Request, Response, NextFunction } from 'express';

export function authenticate(_req: Request, res: Response, next: NextFunction) {
  // check credentials here
  const isAuthenticated = false;

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
