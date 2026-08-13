# Backend Expressjs - Middleware

When a request arrives at an Express server, it does not go straight to a route handler. It passes through a chain of functions first. Each function in that chain is called middleware. A middleware function can inspect the request, modify it, send a response early, or pass control to the next function in line. This is how Express handles concerns that apply to many or all routes without duplicating code in every handler.

Parsing a JSON request body is a good example. POST and PUT requests often carry data in the body, but Express does not parse that data automatically. If you access `req.body` without any middleware, it is `undefined`. A middleware function needs to sit in front of your route handlers, read the raw body stream, parse it as JSON, and attach the result to `req.body` so your handlers can use it. Express ships `express.json()` for exactly this purpose.

Other common middleware tasks include logging every incoming request, checking authentication tokens, setting security headers, or compressing responses. Third-party packages cover most of these. The point is that middleware keeps this kind of work out of your route handlers. A route handler focuses on what to do with a specific request. Middleware handles everything that needs to happen regardless of which route is being called.

Middleware runs in the order it is registered. This means the order of your `app.use()` calls matters. If a body-parsing middleware is registered after a route, that route will not have access to `req.body`. The chain is sequential, and each middleware decides whether the request continues to the next step or stops.

## The middleware signature

A middleware function takes three parameters: `req`, `res`, and `next`.

```typescript
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`);
  next();
}
```

`req` and `res` are the same request and response objects that route handlers receive. The third parameter, `next`, is a function. Calling `next()` passes control to the next middleware or route handler in the chain. If a middleware does not call `next()` and does not send a response, the request hangs. The client waits indefinitely because nothing ever responds or moves the request forward. Try it out for yourself!

A middleware function can do one of two things:

- Call `next()` to pass control to the next function in the chain
- Send a response with `res.json()`, `res.send()`, or similar methods, which ends the cycle

It should never do both. Sending a response and then calling `next()` causes errors because Express tries to handle the same request twice.

## Applying middleware

As an example, let's look again at the `express.json()` middleware, that we saw in the previous session. As a reminder, `express.json()` is a built-in middleware that parses incoming request bodies formatted as JSON. It reads the raw body stream, parses it, and assigns the result to `req.body`. Without it, any route that expects data from the client will find `req.body` to be `undefined`.

Applying a middleware like `express.json()` is simple. Just add it with `app.use()` to your express app:

```typescript
const app = express();

app.use(express.json());
```

## Application-level middleware

`app.use()` registers middleware that runs on every incoming request, regardless of the path or HTTP method. This is called application-level middleware.

```typescript
const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(201).json(req.body);
});
```

In this example, `express.json()` runs before both the GET and POST handlers. The GET handler does not use `req.body`, but the middleware still executes. This is fine: the middleware only parses the body if the request has a JSON content type. For GET requests, which typically have no body, it does nothing and calls `next()` internally.

The order of `app.use()` calls relative to route definitions determines whether the middleware runs before or after a given route. Middleware registered at the top of the file runs first. Middleware registered after a route definition does not affect earlier route(s).

```typescript
app.post("/early", (req, res) => {
  console.log(req.body); // undefined - express.json() has not run yet
  res.json({ received: req.body });
});

app.use(express.json());

app.post("/late", (req, res) => {
  console.log(req.body); // parsed JSON object
  res.json({ received: req.body });
});
```

The `/early` route is registered before `express.json()`, so `req.body` is still `undefined` when its handler runs. The `/late` route is registered after, so the middleware has already parsed the body.

## Resources

[Express middleware guide](https://expressjs.com/en/guide/using-middleware.html)

[Express built-in middleware](https://expressjs.com/en/api.html#express-json)
