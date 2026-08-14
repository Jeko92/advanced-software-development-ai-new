# Backend Basics and Express - Routing

An API is a collection of endpoints, and each endpoint needs code that handles it. Routing is how Express connects an incoming request to the right piece of code. Every route you define consists of three things: an HTTP method (GET, POST, PUT, DELETE, and others), a URL path, and a handler function that runs when a request matches both.

When the server receives a request, Express walks through the registered routes in the order they were defined. It compares the request's method and URL against each route. The first match wins: Express calls that route's handler and stops looking. If nothing matches, Express responds with a 404 status and a default "Not Found" message.

This matching system is what makes Express useful. Instead of writing a long `if`/`else` chain that checks the URL and method yourself, you declare each route separately and let Express handle the dispatch. The result is code organized by what each endpoint does, not by parsing logic.

Routes can also contain variable segments. A path like `/books/:id` matches any URL that starts with `/books/` followed by some value. Express captures that value and makes it available on the request object. Query strings work in a similar way: key-value pairs appended to the URL after a `?` are parsed automatically and exposed through `req.query`. Both mechanisms let a single route definition handle many different requests.

## Route definitions

Express provides a method for each HTTP verb. You call it on the app object, pass the path as the first argument and the handler function as the second:

```typescript
app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  books = books.filter((book) => book.id !== id);
  // ... handle the case if no books were found
  res.status(204).send();
});
```

The method names map directly to HTTP verbs: `app.get()`, `app.post()`, `app.put()`, `app.patch()`, `app.delete()`. Multiple routes can share the same path as long as their methods differ. A GET to `/books` and a POST to `/books` are two separate routes, each with its own handler.

## Route parameters

A route parameter is a named segment in the URL path, prefixed with a colon. It acts as a placeholder that matches any value in that position. Express captures the actual value from the URL and stores it in `req.params` as a key-value pair.

```typescript
app.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.isbn === isbn);

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json(book);
});
```

The path `/books/:isbn` matches URLs like `/books/978-3-16-148410-0` or `/books/42`. Whatever sits in the `:isbn` position becomes the value of `req.params.isbn`.

A route can have multiple parameters. The path `/authors/:authorId/books/:bookId` produces `req.params.authorId` and `req.params.bookId`.

> **_✎ Note:_** Route parameter values (`req.params.id`) are always strings. In our example, if we expect `book.id` to be a number, our program would run, but every request for books would silently fail. If you need a number, convert it explicitly with `Number()` or `parseInt()`.

> ** 💡 Good to know:** When you check the type of `req.params` you will notice that the parameter parts of the url are automatically recognized and `req.params` is typed correctly. This is a bit of typescript magic which is provided by the express types package and an example of how powerful the types system of typescript can be.

## Query strings

Query strings are key-value pairs appended to the URL after a question mark. They are commonly used for filtering, sorting, or pagination. Express parses them automatically and exposes them through `req.query`.

```
http://localhost:3000/books?author=Fitzgerald
```

```typescript
app.get("/books", (req, res) => {
  const author = req.query.author;

  if (author) {
    const filtered = books.filter((b) => b.author === author);
    res.json(filtered);
    return;
  }

  res.json(books);
});
```

A request to `/books?author=Fitzgerald` sets `req.query.author` to `"Fitzgerald"`. Multiple query parameters are separated by `&`: `/books?author=Fitzgerald&year=1925` produces `req.query.author` and `req.query.year`.

The difference between route parameters and query strings is structural. Route parameters are part of the path and identify a specific resource (`/books/42`). Query strings are **optional** modifiers that refine or filter a request (`/books?author=Fitzgerald`). The URL still works without query strings; it returns all results instead of a filtered subset.

## Route order

Express evaluates routes in the order they are registered. The first route whose method and path match the request gets called. This matters when two routes could match the same URL.

```typescript
app.get("/books/featured", (req, res) => {
  res.json(featuredBooks);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  res.json(book);
});
```

If the route with `:id` were registered first, a request to `/books/featured` would match it, with `req.params.id` set to `"featured"`. The `/books/featured` handler would never run. Placing the more specific route above the parameterized one avoids this problem.

> **_⚠ Watch out:_** A common source of confusion is registering a parameterized route like `/books/:id` before a fixed route like `/books/featured`. The parameterized route swallows the request because `featured` is a valid value for `:id`. Always place fixed paths above parameterized ones.

## Resources

[Express routing guide](https://expressjs.com/en/guide/routing.html)
