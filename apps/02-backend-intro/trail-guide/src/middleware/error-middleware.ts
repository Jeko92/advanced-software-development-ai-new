import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  if (req.path.startsWith('/api')) {
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
  res.status(500).render('public/500.njk', { title: 'Internal Server Error' });
};
