import type { NextFunction, Request, Response } from 'express';

export const apiKeyHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKeyHeader = req.header('x-api-key');
  const apiKey = process.env['API_KEY'];
  try {
    if (apiKeyHeader === apiKey) {
      next();
    } else {
      res.status(401).json({ message: 'Please provide valid API_KEY first' });
    }
  } catch (err) {
    next(err);
  }
};
