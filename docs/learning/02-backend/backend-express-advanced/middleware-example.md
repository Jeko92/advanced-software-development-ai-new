# Backend Express Advanced - Middleware Example

When a server receives hundreds or thousands of requests, route handlers alone do not give you a clear picture of what happened. You need one place that sees every incoming request and can record useful facts about it. In Express, middleware is the right tool for that job. A logger middleware runs for every request that passes through the app, which means you can keep logging logic in one place instead of repeating it in every route.

An access log usually records request metadata rather than business data. Good starter fields are the timestamp, HTTP method, requested URL, client IP address, and response status code. Together, those values answer practical questions: which route was hit, when it happened, who sent the request, and whether the server responded successfully.

## Why middleware fits logging

Middleware sits in the request-response cycle between the incoming request and the final response. That makes it useful for work that should happen across the whole app:

- authentication
- parsing request bodies
- error handling
- request logging

For a logger, the main advantage is consistency. Every request goes through the same function, so every log entry follows the same format.

## Choosing what to log

The request object already gives you most of the values a basic access log needs:

- `req.method` for the HTTP method such as `GET` or `POST`
- `req.originalUrl` for the requested path
- `req.ip` for the client IP address
- `new Date().toISOString()` for a standard timestamp

`toISOString()` is a strong default for logs because it is unambiguous and sortable. The format is always UTC and always follows the same order, so log entries from different machines still make sense when you compare them.

```typescript
const timestamp = new Date().toISOString();
const method = req.method;
const url = req.originalUrl;
const ip = req.ip;
```

These values are enough for an initial logger. Later, many teams add response status codes or response times as well.

## Logging after the response finishes

If you want the log entry to include the final response status code, log after Express has finished sending the response. That is the point when `res.statusCode` contains the value the client actually received.

```typescript
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(" ");

    console.log(logEntry);
  });

  next();
}
```

`res.on("finish", ...)` registers a callback that runs when the response has been written completely. That timing matters. If you log too early, you can miss the final status code or record a request that later fails in a different way.

## Formatting one log entry per line

Logs are easier to scan and process when each request becomes exactly one line. That is why newline characters matter.

```typescript
const logEntry =
  [new Date().toISOString(), req.method, req.ip, req.originalUrl].join(" ") +
  "\n";
```

`\n` means "start a new line." When you append this string to a file, the next request will be written on the following line instead of being glued onto the previous entry.

## Resources

[Express middleware guide](https://expressjs.com/en/guide/writing-middleware.html)

[Express request API](https://expressjs.com/en/api.html#req)
