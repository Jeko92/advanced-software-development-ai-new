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
 * Shared credential check behind both requireAdminAny (HTML) and
 * requireAdminApi (JSON) below — a valid signed session cookie or HTTP
 * Basic Auth.
 */
function isAdminAuthenticated(req: Request): boolean {
  if (req.signedCookies && req.signedCookies['admin'] === 'true') {
    return true;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    const token = authHeader.split(' ')[1];
    const credentials = token
      ? Buffer.from(token, 'base64').toString('utf-8')
      : '';
    const [user, pass] = credentials.split(':');

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      return true;
    }
  }

  return false;
}

/**
 * For the HTML admin routes — redirects to the login page on failure.
 */
export function requireAdminAny(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (isAdminAuthenticated(req)) {
    return next();
  }

  res.redirect('/login');
}

/**
 * For the JSON API's mutating routes — a redirect would hand a JSON client
 * an HTML login page, so this returns 401 JSON on failure instead while
 * enforcing the exact same credential check as requireAdminAny.
 */
export function requireAdminApi(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (isAdminAuthenticated(req)) {
    return next();
  }

  res.status(401).json({ error: 'Authentication required' });
}
