# Backend Express Advanced - Debugging Practices

When a logger does not write the expected output, the problem is usually small but hidden: the middleware is not registered, the request data is not what you expected, the file path points somewhere else, or an async file operation throws and the error is swallowed. Debugging is the process of making those hidden details visible.

For this session, the useful goal is not to cover every debugger feature. It is to learn two practical levels of debugging: quick checks with `console.log()` and deeper inspection with the built-in Node.js inspector.

## Using `console.log()` on purpose

`console.log()` is the fastest way to answer small questions while building the logger:

- Is the middleware running at all?
- What does `req.originalUrl` contain for this route?
- Which file path did `path.join()` produce?
- Did the `catch` block run?

```typescript
export async function logger(req: Request, res: Response, next: NextFunction) {
  console.log("logger ran for", req.method, req.originalUrl);
  next();
}
```

This is a good first step because it is simple. The downside is that console logging can get noisy fast, especially if you leave temporary debug output in multiple places.

## Using the Node.js inspector

When logs are not enough, start the app in inspect mode:

```bash
node --inspect dist/index.js
```

If you use a watcher during development, start that watcher with the same flag so the debugger reconnects after restarts.

The inspector lets you:

- pause execution with breakpoints
- inspect `req`, `res`, and local variables
- step through async code
- see where an error was thrown

This is especially useful for file-system code, because you can stop before `appendFile()` or `writeFile()` runs and confirm that the path and message are correct.

## Debugging in VS Code

Many of us will use VS Code, so it helps to know that the editor can connect to the same Node.js debugger without leaving the IDE. A basic launch configuration points to the app entry file and starts Node in debug mode.

```json
//.vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Express App",
      "program": "${workspaceFolder}/dist/index.js",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

The exact file path for `program` depends on how the project runs. If the app starts directly from TypeScript with a tool like `tsx`, the entry file would be `src/index.ts` instead.

## A debugging habit worth keeping

One mistake in the original logger solution is more important than any debugger command: caught errors are sometimes ignored. If a `catch` block stays empty, debugging gets much harder because failures disappear silently.

Prefer one of these instead:

- log the error clearly
- return a fallback value on purpose
- rethrow the error if the app should stop

That habit matters more than any tool because it keeps real failures visible.

## Resources

[Node.js debugging guide](https://nodejs.org/en/learn/getting-started/debugging)

[VS Code Node.js debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
