# Backend Basics and Express - Routing and Responses

A small book API demonstrating the routing and request/response patterns
from
[`docs/learning/02-backend/backend-basics-and-express/routing.md`](../../../../docs/learning/02-backend/backend-basics-and-express/routing.md)
and
[`docs/learning/02-backend/backend-basics-and-express/request-and-response.md`](../../../../docs/learning/02-backend/backend-basics-and-express/request-and-response.md):
route parameters, query-string filtering, reading `req.body`, and the
201/404/204 response conventions.

## Endpoints

| Method | Path         | Description                                                           |
| ------ | ------------ | --------------------------------------------------------------------- |
| GET    | `/`          | Health check greeting                                                 |
| GET    | `/books`     | Returns all books. Supports `?author=`, `?year=`, `?genre=` filtering |
| GET    | `/books/:id` | Returns one book by `id`, 404 if not found                            |
| POST   | `/books`     | Creates a book with a server-assigned `id`, 201 on success            |
| PUT    | `/books/:id` | Replaces a book entirely, 404 if the `id` does not exist              |
| DELETE | `/books/:id` | Removes a book, 204 on success                                        |

A matching Bruno collection lives in
[`routing-and-responses-demo/`](./routing-and-responses-demo).

## Running it

From the monorepo root:

```bash
pnpm --filter @bootcamp/backend-basics-express-routing-and-responses dev
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
