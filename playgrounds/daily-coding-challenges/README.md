# Daily Coding Challenge

Practice your coding skills, one challenge per day.

## Setup

Install the dependencies:

```bash
pnpm i
```

## Usage

To get a new challenge, run:

```bash
pnpm run next
```

You can specify the difficulty or kyu level (8 is simple, 4 is hard):

```bash
pnpm run next easy
pnpm run next {4,5,6,7,8}
pnpm run next hard
```

You can run your code by using bun, tsx or the following npm script:

```bash
pnpm run try challenges/{challenge-name}.ts
```

To get the solution for a given challenge, run:

```bash
pnpm run solution {challenge-name}
pnpm run solution alphabetical-addition
```

Challenges can't be picked twice, to reset the cache, run:

```bash
pnpm run reset
```

Happy Hacking!
