# TypeScript Basics

This package contains TypeScript exercises and mini-projects from the `01-typescript` bootcamp module.

Each exercise can be executed independently using `tsx` (or `bun`) depending on the entry point.

## Structure

```
ts-basics/
├── code-along
│   ├── app.ts
│   └── greeter.ts
├── film-watchlist
│   └── src/watchlist.ts
├── music-library
│   └── src/main.ts
├── online-shop
│   └── src/main.ts
├── recipe-book
│   └── src/recipes.ts
├── scripts
│   └── run.ts
├── package.json
└── tsconfig.json
```

---

## Running exercises from `ts-basics`

Navigate to:

```bash
cd bootcamp/01-typescript/ts-basics
```

### Code-along

The code-along folder contains independent TypeScript examples.

Run:

```bash
pnpm run dev code-along
```

This executes:

```bash
tsx code-along/app.ts
```

To run the greeter example directly:

```bash
tsx code-along/greeter.ts
```

or:

```bash
bun code-along/greeter.ts
```

---

### Film Watchlist

Run:

```bash
pnpm run dev film-watchlist
```

Executes:

```bash
tsx film-watchlist/src/watchlist.ts
```

---

### Music Library

Run:

```bash
pnpm run dev music-library
```

Executes:

```bash
tsx music-library/src/main.ts
```

---

### Online Shop

Run:

```bash
pnpm run dev online-shop
```

Executes:

```bash
tsx online-shop/src/main.ts
```

---

### Recipe Book

Run:

```bash
pnpm run dev recipe-book
```

Executes:

```bash
tsx recipe-book/src/recipes.ts
```

---

# Running from monorepo root

All workspace commands can also be executed from the repository root.

## Run a specific exercise

```bash
pnpm --filter @bootcamp/ts-basics dev code-along
```

Examples:

```bash
pnpm --filter @bootcamp/ts-basics dev music-library

pnpm --filter @bootcamp/ts-basics dev online-shop

pnpm --filter @bootcamp/ts-basics dev recipe-book
```

---

## Repository quality commands

From the monorepo root:

### Lint

```bash
pnpm lint
```

### Fix lint issues

```bash
pnpm lint:fix
```

### Type checking

```bash
pnpm typecheck
```

### Check formatting

```bash
pnpm format:check
```

### Apply formatting

```bash
pnpm format:write
```

---

## Runtime

The examples are designed to run with:

- `tsx`
- `bun`

Both execute TypeScript files directly without requiring a separate build step.
