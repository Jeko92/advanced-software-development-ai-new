# Backend Basics and Express - Express Setup

A minimal single-route Express server written in TypeScript, following the
project structure and setup steps from
[`docs/learning/02-backend/backend-basics-and-express/express-setup.md`](../../../../docs/learning/02-backend/backend-basics-and-express/express-setup.md).

## What's here

`src/index.ts` creates an Express app, registers a single `GET /` route that
responds with `"Hello World"`, and starts listening on port 3000 - the same
minimal example walked through in the doc.

## Running it

From the monorepo root:

```bash
pnpm --filter @bootcamp/backend-basics-express-setup dev
```

or from this directory directly:

```bash
pnpm dev
```

The server starts at **http://localhost:3000**. A `GET /` request returns
`"Hello World"`.

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
