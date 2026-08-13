# Welcome Leveling Challenges

This project contains my solutions for the **neuefische Advanced Software Development with AI** bootcamp **Welcome Leveling** challenges.

The goal of this module is to practice TypeScript fundamentals, problem solving, and running individual challenge solutions inside a monorepo workspace.

## Implemented Challenges

- Who's Online?
- Credit Card Mask
- Your Order, Please
- Find the Missing Letter
- Who Likes It?
- Conway’s Game of Life

## Running Solutions

### From repository root

Run a specific challenge using the workspace filter:

```bash
pnpm --filter @bootcamp/00-welcome dev 01
```

Examples:

```bash
pnpm --filter @bootcamp/00-welcome dev 02
pnpm --filter @bootcamp/00-welcome dev 05
```

### From this folder

Navigate into the project:

```bash
cd bootcamp/00-welcome
```

Run a challenge:

```bash
pnpm dev 01
```

Examples:

```bash
pnpm dev 03
pnpm dev 05
```

The argument selects which challenge solution should be executed.
