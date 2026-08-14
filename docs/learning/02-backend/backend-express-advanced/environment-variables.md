# Backend Express Advanced - Environment Variables

Even in a small Express project, some values should change between environments without forcing you to edit the source code. The server port is the usual first example. During development you might use port `3000`, while a hosting platform injects a different port in production. API keys, database URLs, and feature flags follow the same pattern. In fact, you _never_ want any of your secrets to be checked-in with your source code. Environment variables solve this by moving configuration outside the application code.

The most important idea is this: the code stays the same, but the environment around it changes. Your app reads configuration at runtime through `process.env`, so you can run the same project locally, in tests, and in production with different values.

## Reading values from `process.env`

In Node.js, environment variables are available on `process.env`. Every value comes in as a string or `undefined`.

```typescript
const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

This example does two things:

- it reads `PORT` from the environment
- it falls back to `"3000"` when `PORT` is missing

Converting the value with `Number(...)` is useful because `app.listen()` expects a numeric port.

## Loading a local `.env` file

Technically, we can run the script with the env vars in the beginning of the command:

```bash
PORT=4000 node dist/index.js
```

Typing environment variables into the terminal for every run AND env var gets tiring quickly. A `.env` file gives you a local place to store them during development.

```text
PORT=3000
API_KEY=your-very-secret-key-here
DATABASE_URL=mongodb://localhost:27017/myapp
```

There are two common ways to load that file. If the project runs on Node.js 20.6 or newer, Node has a built-in flag:

```bash
node --env-file=.env dist/index.js
```

This works with `tsx` as well:

```bash
tsx --env-file=.env src/index.ts
```

In `package.json`, the scripts look like this:

```json
{
  "scripts": {
    "start": "node --env-file=.env dist/index.js",
    "dev": "tsx watch --env-file=.env src/index.ts"
  }
}
```

For older setups, many projects use `dotenv`:

## dotenv

Before Node.js added the `--env-file` flag, the standard approach was the `dotenv` npm package. It does the same thing: reads a `.env` file and populates `process.env`. Many existing projects still use it, so you will encounter it in codebases that predate the native flag or need to support older Node.js versions.

Install it as a regular dependency:

```bash
npm install dotenv
```

Then import and call it at the very top of your entry file, before any other code accesses `process.env`:

```typescript
import "dotenv/config";

import express from "express";

const app = express();
const port = process.env.PORT || 3000;
```

The `import "dotenv/config"` line loads and executes dotenv immediately, which reads the `.env` file and injects the variables. It must come before any code that reads from `process.env`, otherwise those variables will still be `undefined`.

That import must happen before other code reads `process.env`.

## When to use native `--env-file` and when to use `dotenv`

You will see both approaches in real projects.

- Use `--env-file` when the runtime is modern enough and you want fewer dependencies
- Use `dotenv` when the codebase already depends on it or needs to support older Node.js versions

Even though the new standard is to use the --env-file param, `dotenv` remains an extremely popular way of handling env files.

## Keeping secrets out of Git

A `.env` file often contains sensitive values. That file should _NEVER_ be committed.

```text
# .gitignore
node_modules/
dist/
.env
```

Instead, commit a `.env.example` file with placeholder values:

```text
# .env.example
PORT=3000
API_KEY=
DATABASE_URL=
```

This file is safe to commit. It documents the expected variables without revealing real values. A new team member clones the repository, copies `.env.example` to `.env`, fills in the real values, and is ready to run the application.

> ⚠ Watch out: If you accidentally commit a `.env` file with real secrets, adding it to `.gitignore` afterward is not enough. The secrets are already in the Git history. Unless you catch your error before you _push_, you need to rotate the compromised credentials (generate new API keys, change passwords) and treat the old ones as exposed.

## Resources

[Node.js `process.env` documentation](https://nodejs.org/api/process.html#processenv)

[Node.js `--env-file` documentation](https://nodejs.org/docs/latest/api/cli.html#--env-fileconfig)

[dotenv on npm](https://www.npmjs.com/package/dotenv)
