# Backend Express Advanced - Express Router

Routes in an Express application always belong to something. A `GET /books` route belongs to books. A `POST /users` route belongs to users. That relationship is real and meaningful, but when all routes are registered directly on the `app` object in a single file, the code does not reflect it. A books route and a users route are just two adjacent lines. Nothing in the file structure signals that they are different concerns, and finding everything related to one resource means scanning the whole file.

Express Router makes that ownership explicit. `express.Router()` creates a self-contained routing object that behaves like a mini Express app. You register routes on it the same way you would on `app`, then mount the whole router onto the main application at a path prefix. Any request matching that prefix is handed to the router, which resolves the remainder of the path against its own routes.

The practical result is a `routes/` folder where each file covers exactly one resource. `routes/books.ts` holds all routes related to books. `routes/users.ts` holds all routes related to users. The main `index.ts` imports those routers and mounts them in a few lines. The resource boundary that existed in concept now exists in the file system too.

## Creating a router

A router is created by calling `express.Router()` and registering routes on the result:

```typescript
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json(books);
});

router.post("/", (req, res) => {
  books.push(req.body);
  res.status(201).json(req.body);
});

export default router;
```

The paths here are relative. They do not include the prefix the router will be mounted at. That prefix is defined when the router is mounted on the app.

## Routes folder

By convention, routers live in a `routes/` directory next to the main entry point:

```
src/
  index.ts
  routes/
    books.ts
    users.ts
```

Each file in `routes/` covers one resource. It creates a router, defines the routes for that resource, and exports the router as the default export.

## Mounting a router

Once a router is defined, it is mounted on the app with `app.use()`. The first argument is the path prefix, and the second is the router:

```typescript
import express from "express";
import booksRouter from "./routes/books";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());
app.use("/books", booksRouter);
app.use("/users", usersRouter);
```

When a request arrives for `GET /books`, Express strips the `/books` prefix and passes the remainder (`/`) to `booksRouter`. The router then matches that path against its own routes.

This means the paths inside a router file do not repeat the prefix. `router.get("/")` inside `books.ts` handles `GET /books`, and `router.get("/:id")` handles `GET /books/:id`. The prefix and the route path are joined at request time.

## Public and private routes

Not every route in an application should be accessible to anyone. Routes that return public data can be open. Routes that create, update, or delete data typically require the request to come from an authenticated user.

Because each router is self-contained, a router that needs protection can register its authentication check internally with `router.use()`. This keeps the access control decision inside the router file, next to the routes it protects. Nothing in `index.ts` needs to know which routes are public or private.

An authentication middleware checks whether the request carries valid credentials. For now, the implementation details do not matter. What matters is the shape: the middleware either calls `next()` to allow the request through, or sends a `401` response to stop it.

```typescript
import type { NextFunction, Request, Response } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // check credentials here
  const isAuthenticated = false;

  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
```

A router that should be protected registers `authenticate` before its routes:

```typescript
// routes/users.ts
import { Router } from "express";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

export default router;
```

A router that is partially public can register `authenticate` after its public routes:

```typescript
// routes/books.ts
import { Router } from "express";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// public routes before middleware
router.get("/", (req, res) => {
  res.json(books);
});

router.use(authenticate);

// private routes after middleware
router.put("/:id", (req, res) => {
  // update book
});
router.delete("/:id", (req, res) => {
  // delete book
});

export default router;
```

From `index.ts`, both routers are mounted the same way. The difference in access control is fully contained within each router file.

```typescript
app.use("/books", booksRouter);
app.use("/users", usersRouter);
```

## Resources

[Express Router documentation](https://expressjs.com/en/api.html#router)

[Express routing guide](https://expressjs.com/en/guide/routing.html)
