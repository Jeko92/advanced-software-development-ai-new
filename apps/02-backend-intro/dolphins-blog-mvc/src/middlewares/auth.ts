import type { Request, Response, NextFunction } from 'express';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set (see .env.example)`);
  }
  return value;
}

export const ADMIN_USER = process.env['ADMIN_USER'] || 'admin';
export const ADMIN_PASS = requireEnv('ADMIN_PASS');

// Used to sign the admin session cookie so it can't be forged by simply
// setting `admin=true` from the browser — see app.ts's cookieParser() call.
export const COOKIE_SECRET = requireEnv('COOKIE_SECRET');

/**
 * Hybrid strategy: allow through on either a valid signed session cookie or HTTP Basic Auth.
 */
export function requireAdminAny(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.signedCookies && req.signedCookies['admin'] === 'true') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    const token = authHeader.split(' ')[1];
    const credentials = token
      ? Buffer.from(token, 'base64').toString('utf-8')
      : '';
    const [user, pass] = credentials.split(':');

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      return next();
    }
  }

  res.redirect('/login');
}
