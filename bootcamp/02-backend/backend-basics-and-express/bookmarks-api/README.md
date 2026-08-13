# Backend Basics and Express - Challenge: Bookmark Manager API

A REST API for managing a collection of bookmarks, built to satisfy every
requirement in
[`docs/learning/02-backend/backend-basics-and-express/challenges.md`](../../../../docs/learning/02-backend/backend-basics-and-express/challenges.md):
CRUD endpoints, tag filtering, partial updates, and input validation, all
backed by a plain in-memory array.

## Data shape

```typescript
interface Bookmark {
  id: number;
  url: string;
  title: string;
  tag?: string;
}
```

## Endpoints

| Method | Path             | Description                                                              |
| ------ | ---------------- | ------------------------------------------------------------------------ |
| GET    | `/bookmarks`     | Returns all bookmarks. Supports `?tag=` to filter by tag                 |
| GET    | `/bookmarks/:id` | Returns one bookmark by `id`, 404 if not found                           |
| POST   | `/bookmarks`     | Creates a bookmark. Requires `url` and `title`, 400 if either is missing |
| PATCH  | `/bookmarks/:id` | Updates individual fields, 404 if the `id` does not exist                |
| DELETE | `/bookmarks/:id` | Removes a bookmark, 204 on success                                       |
| PUT    | `/bookmarks/:id` | Bonus, not required by the challenge - replaces a bookmark entirely      |

Validation errors and 404s respond with `{ "error": "<message>" }`.

A completed Bruno collection covering all of the above lives in
[`bookmarks-api/`](./bookmarks-api) - try building your own requests first,
then use it as a reference if you get stuck or want to compare approaches.

## Running it

From the monorepo root:

```bash
pnpm --filter @bootcamp/backend-basics-bookmarks-api dev
```

or from this directory directly:

```bash
pnpm dev
```

The server starts at **http://localhost:3000**.

## Available scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Starts the server with `tsx --watch`  |
| `pnpm build`        | Compiles TypeScript to `dist/`        |
| `pnpm start`        | Runs the compiled server from `dist/` |
| `pnpm lint`         | Lints with ESLint                     |
| `pnpm lint:fix`     | Lints and auto-fixes with ESLint      |
| `pnpm typecheck`    | Type-checks without emitting output   |
| `pnpm format:check` | Checks formatting with Prettier       |
| `pnpm format:write` | Formats files with Prettier           |
