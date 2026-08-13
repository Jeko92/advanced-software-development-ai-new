# Backend Basics and Express - Express Setup

Node.js ships with a built-in `http` module that can handle incoming requests and send responses. It works, but building anything beyond a single endpoint quickly becomes manual labor: you parse the URL to figure out which route was requested, check the HTTP method with an `if` chain, read the request body as a raw stream of chunks, and set headers by hand. The code grows fast and none of it has anything to do with what the application actually does.

Express is a framework built on top of that `http` module. It gives you a structured way to map HTTP methods and URL paths to handler functions, read incoming data through a clean API, and send responses without constructing headers manually. When a request comes in, Express matches it against your route definitions and calls the right handler, passing it a request object and a response object that expose the data and methods you need.

Express also supports middleware: functions that run on every request regardless of the route. Middleware handles concerns that cut across routes, like parsing request bodies, logging, and checking authentication. Each function either handles the request or passes it along to the next one in the chain.

One complication: Express is written in JavaScript. Its source code has no type annotations, so TypeScript cannot determine what `express()` returns, what properties `req` and `res` carry, or what arguments `app.get()` expects. Without that information, every Express API call appears as `any` and the compiler cannot catch mistakes. The solution is a type declaration package, which tells TypeScript what types a JavaScript library uses without containing any runtime code.

## Type declaration packages

Installing Express gives you the runtime library. `@types/express` and `@types/node` give TypeScript the type information for Express and for Node.js built-in modules like `http`, `fs`, and `path`:

```bash
npm install express
npm install --save-dev typescript @types/express @types/node
```

- `express` is a regular dependency because the server needs it at runtime
- `typescript` is the compiler and is only needed during development
- `@types/express` and `@types/node` are also dev-only; they are used for type checking and editor support but are not included in the compiled output

TypeScript resolves types from `node_modules/@types/` automatically. After installation, the compiler knows that `express()` returns an `Application`, that `app.get()` expects a path and a handler, and that the handler's `req` parameter is a `Request` with properties like `params`, `query`, and `body`.

Not every package needs a separate `@types` install. Some libraries ship their own type declarations. Check whether the library's `package.json` includes a `"types"` field; if it does, no separate install is needed.

## Project structure

Express projects conventionally separate source files from build output:

```
project/
  src/
    index.ts
  dist/           (gitignored)
  node_modules/   (gitignored)
  .gitignore
  package.json
  tsconfig.json
```

The `src/` directory holds all TypeScript source files. The `dist/` directory is created by the TypeScript compiler and contains the JavaScript output. Both `dist/` and `node_modules/` belong in `.gitignore` because they are generated. Anyone who clones the project can recreate them by running `npm install` and `npm run build`.

Two `package.json` scripts handle building and running the server:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

- `build` runs the TypeScript compiler, which reads `tsconfig.json` and writes JavaScript to `dist/`
- `start` runs the compiled output with Node.js

During development, `tsx` bypasses this build step by transpiling TypeScript in memory. The `build` and `start` scripts are for production deployments where you want a clean compile step and a plain Node.js process.

## The app object

Calling `express()` creates an application instance. This object is where you register route handlers, middleware, and server configuration.

```typescript
import express from "express";

const app = express();
```

On its own, `app` does nothing. It becomes a working server once you define at least one route and tell it to listen for connections.

## Listening for connections

`app.listen()` binds the application to a port and starts accepting incoming connections. The first argument is the port number; the second is an optional callback that runs once the server is ready.

```typescript
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

A port is a number that identifies a specific process on a machine. Port 3000 is a common choice during development because it does not require special permissions and is unlikely to conflict with other services. The callback is not required, but without it there is no confirmation that the server actually started.

## A minimal Express server

Combining the app object, a single route, and `app.listen()` produces a working server:

```typescript
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

`app.get()` registers a handler for GET requests to the path `/`. When a request arrives, Express matches the method and path, then calls the handler with two arguments:

- `req` is the request object: it holds the incoming URL, headers, and any data the client sent
- `res` is the response object: `res.send()` sends a plain text response and sets the appropriate headers automatically

Running this file with `tsx src/index.ts` starts the server. A GET request to `http://localhost:3000` returns "Hello World."

## Resources

[Express.js official documentation](https://expressjs.com/)

[Node.js http module documentation](https://nodejs.org/api/http.html)

[DefinitelyTyped repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
