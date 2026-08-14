# Backend Expressjs - File System Operations

When an Express application writes to the local file system — whether to store logs, save uploaded files, or persist simple data — it runs into a set of common practical problems. A file path that works on one machine may break on another. A file that doesn't exist yet will cause a write to fail. Overwriting a file when you meant to append to it loses data silently. Node.js ships with a built-in module for all of this: `node:fs`, and its Promise-based variant `fs/promises`.

This material covers the file system patterns used to build a request logger: constructing stable paths, creating a file at startup so it exists before requests arrive, and appending one line at a time without losing previous entries. These patterns apply to any file-writing task, not just logging.

> 🧠 Good to know: we're storing our logs to a file in this exercise to get our hands dirty with express middleware and to better visualize how logging works. In practice, this can have unpleasant effects. Can you think of reasons why this is not the most suitable for large scale applications?

## Building file paths with `path.join()`

Hardcoding paths as strings is brittle. `"logs/logs.txt"` might work from one folder and fail from another. `path.join()` solves that by combining path segments with the correct separator for the current operating system.

The simplest way to build a path that resolves to the project root is `process.cwd()`. It returns the directory from which the Node process was started, which is typically the project root when running with `npm start` or `nodemon`:

```typescript
import path from "node:path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "logs.txt");
```

An alternative is `__dirname`, which always resolves to the directory of the currently executing JavaScript file. This is predictable regardless of where the process was started, but it requires navigating back up to the project root from inside `dist/`:

```typescript
const LOG_DIR = path.join(__dirname, "..", "..", "logs");
```

The tradeoff: `process.cwd()` produces cleaner code with no path traversal, but breaks if someone starts the process from a directory other than the project root. `__dirname` is independent of the working directory, but the number of `..` segments depends on how deep the compiled file sits inside `dist/`, which changes if the folder structure changes.

In a project where the entry point is always started from the root, `process.cwd()` is the simpler choice.

## Using `fs/promises`

Node.js offers both callback-based and Promise-based file system APIs. `fs/promises` is the clearer choice when the surrounding code already uses `async` and `await`.

```typescript
import { appendFile, writeFile } from "node:fs/promises";
```

Promise-based functions fit naturally with `async` and `await`:

- the code reads top to bottom
- errors can be handled with `try` and `catch`
- multiple async steps are easier to compose

## Creating a file and checking existence

The first request should not have to create the log file as a side effect. A cleaner approach is to make sure the file exists when the server starts.

```typescript
import { access, constants, writeFile } from "node:fs/promises";

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureLogFile(filePath: string): Promise<void> {
  const exists = await fileExists(filePath);

  if (!exists) {
    await writeFile(filePath, "", { encoding: "utf-8" });
  }
}
```

This does two separate jobs:

- `access()` checks whether the file can be reached
- `writeFile()` creates the file if it is missing

Separating those steps keeps the intent clear. You can see the difference between "check first" and "create if needed."

## Appending to a file

Once the file exists, each request should add a line without replacing the previous content. `appendFile()` is designed for that.

```typescript
import { appendFile } from "node:fs/promises";

async function addLogMessage(message: string): Promise<void> {
  await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}
```

`writeFile()` would overwrite the whole file unless you pass special options. `appendFile()` makes the intent explicit: keep the existing content and add one more line at the end.

## Connecting the file helper to the logger

At this point, the pieces only become useful when you connect them back to the middleware from the previous lesson.

The flow looks like this:

- the app starts
- `ensureLogFile(LOG_FILE)` prepares the file once
- Express registers the `logger` middleware
- each request reaches `logger`
- `logger` builds one log entry and passes it to `addLogMessage()`

That connection is the missing step between "I can append to a file" and "I have a working access logger."

```typescript
import type { NextFunction, Request, Response } from "express";
import { appendFile } from "node:fs/promises";
import path from "node:path";

const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");

async function addLogMessage(message: string): Promise<void> {
  await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", async () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(" ");

    await addLogMessage(logEntry);
  });

  next();
}
```

The middleware does not need to know how the file was created. It only depends on two things:

- `LOG_FILE` points to a stable location
- the file already exists before requests start arriving

## Startup flow and async setup

The server should prepare its log file before requests arrive. Run the setup during startup, then register the middleware, then start listening for requests.

```typescript
await ensureLogFile(LOG_FILE)
app.use(logger);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

This makes the order explicit:

- prepare the file first
- register the middleware second
- accept requests last

## Resources

[Node.js `fs/promises` documentation](https://nodejs.org/api/fs.html#promises-api)

[Node.js `path.join()` documentation](https://nodejs.org/api/path.html#pathjoinpaths)