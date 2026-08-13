# Backend Basics and Express - Demo (Color API)

A small Express + TypeScript API built during the bootcamp's live coding
session, practicing the concepts from
[`docs/learning/02-backend/backend-basics-and-express`](../../../../docs/learning/02-backend/backend-basics-and-express):
setting up an Express server, defining routes, reading route parameters, and
keeping data access out of the route handlers (`colorService.ts`) instead of
inlining it.

## What's here

A fixed, in-memory list of 20 named colors (`src/data.ts`), a small service
layer for reading it (`src/colorService.ts`), and the route handlers
(`src/index.ts`).

### Endpoints

| Method | Path             | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/`              | Health check, returns `"hello world"`       |
| GET    | `/all`           | Returns every color                         |
| GET    | `/colors/random` | Returns a single random color               |
| GET    | `/colors/:id`    | Returns one color by `id`, 404 if not found |

A matching Bruno collection lives in [`color-api/`](./color-api).

## Running it

From the monorepo root:

```bash
pnpm --filter @bootcamp/backend-basics-express-demo dev
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
