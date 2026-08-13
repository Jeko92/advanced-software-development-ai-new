# Backend Basics and Express - Request and Response

Every route handler in Express receives two objects. The first is `req`, which represents the incoming HTTP request. It carries everything the client sent: the URL path, route parameters, query string values, headers, and the request body. The second is `res`, which represents the outgoing HTTP response. It provides methods for sending data back to the client, setting status codes, and controlling headers.

These two objects are the primary interface between your application logic and the HTTP layer. Reading data from `req` tells you what the client wants. Calling methods on `res` determines what the client gets back. Most of the code you write inside route handlers is some combination of reading from one and writing to the other.

Express extends the standard Node.js request and response objects with convenience methods that handle common tasks automatically. `res.json()` serializes an object to JSON and sets the correct `Content-Type` header. `res.status()` sets the HTTP status code and returns the response object so you can chain another method call after it. On the request side, `req.params` and `req.query` are already parsed and ready to use as plain objects. These additions remove the manual string parsing and header management that raw Node.js requires.

One thing `req` does not provide automatically is `req.body`. When a client sends data in the request body (typically with POST, PUT, or PATCH requests), Express does not parse it by default. The `req.body` property is `undefined` until you add middleware that reads the raw body stream and converts it into a usable JavaScript object. The most common middleware for this is `express.json()`.

## The request object

The request object holds three main sources of incoming data. Each one corresponds to a different part of the HTTP request.

`req.params` contains route parameters, the named segments defined with a colon in the route path.

`req.query` contains query string parameters, the key-value pairs after the `?` in the URL. A request to `/books?genre=fiction&limit=10` produces:

```typescript
app.get("/books", (req, res) => {
  console.log(req.query.genre); // "fiction"
  console.log(req.query.limit); // "10"
});
```

`req.body` contains data sent in the request body. This is where POST and PUT payloads end up after being parsed by middleware. Without `express.json()` or a similar parser, `req.body` is `undefined`.

```typescript
app.use(express.json()); // add body parser middleware

app.post("/books", (req, res) => {
  console.log(req.body);
});
```

It's important to notice, that `req.body` is not typed. Since we don't know what the client sends to us, this is intended. The contents of the body need to be validated, either manually by checking if the object entries are valid or by using a schema validator like [zod](https://github.com/colinhacks/zod).

## Sending responses

The response object provides several methods for sending data back to the client. Each one handles serialization and headers differently.

`res.send()` sends a response with automatic content type detection. Pass a string and the response gets `Content-Type: text/html`. Pass an object or array and Express serializes it as JSON. For API development, `res.json()` is the more explicit choice.

```typescript
app.get("/health", (req, res) => {
  res.send("OK");
});
```

`res.json()` serializes the argument as JSON and sets `Content-Type: application/json`. This is the standard method for API responses.

```typescript
app.get("/books", (req, res) => {
  res.json(books);
});
```

`res.status()` sets the HTTP status code. It returns the response object itself, so you can chain it with `json()` or `send()`:

```typescript
app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});
```

Without an explicit `res.status()` call, Express defaults to `200`. Setting the status code explicitly makes the response's meaning clear to the client and follows HTTP conventions.

## Common response patterns

A few patterns show up in almost every Express API.

**Returning a created resource** uses status 201 to signal that a new resource was successfully created. The response body typically contains the created item:

```typescript
app.post("/books", (req, res) => {
  const book = { id: nextId++, ...req.body };
  books.push(book);
  res.status(201).json(book);
});
```

**Returning a "not found" error** uses status 404 when the requested resource does not exist. Including an error message in the body helps clients understand what went wrong:

```typescript
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json(book);
});
```

The `return` after sending the 404 response is necessary. Without it, execution continues to the `res.json(book)` line, and Express throws an error because you cannot send two responses to the same request.

**Confirming a deletion** uses status 204, which means "success, but there is no content to return." The response body is empty:

```typescript
app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => b.id !== Number(req.params.id));
  res.status(204).send();
});
```

> **_⚠ Watch out:_** Forgetting to `return` after sending an early response (like a 404) is a frequent mistake. Express does not automatically stop the handler after you call `res.json()` or `res.send()`. If the function continues running and hits another response call, you get the error "Cannot set headers after they are sent to the client."

## Resources

[Express response API](https://expressjs.com/en/api.html#res)

[Express request API](https://expressjs.com/en/api.html#req)
