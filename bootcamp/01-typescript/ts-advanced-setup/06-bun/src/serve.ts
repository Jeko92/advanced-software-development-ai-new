import { resolve, sep } from 'node:path';

const PORT = 3000;
const DIST_ROOT = resolve('./dist');

Bun.serve({
  port: PORT,
  fetch(req) {
    const { pathname } = new URL(req.url);
    const requested = resolve(
      DIST_ROOT,
      `.${pathname === '/' ? '/index.html' : pathname}`,
    );

    // reject any path that escapes dist/ (e.g. via ../ traversal)
    if (requested !== DIST_ROOT && !requested.startsWith(DIST_ROOT + sep)) {
      return new Response('Forbidden', { status: 403 });
    }

    const file = Bun.file(requested);

    return file
      .exists()
      .then((exists) =>
        exists
          ? new Response(file)
          : new Response('Not Found', { status: 404 }),
      );
  },
});

console.log(`Serving dist/ at http://localhost:${PORT}`);
