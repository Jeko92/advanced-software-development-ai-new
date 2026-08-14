# Backend Basics and Express - HTTP

`HTTP` (Hypertext Transfer Protocol) is the protocol that governs how clients and servers communicate on the web. Every time a browser loads a page, a mobile app fetches data, or a desktop tool like `Bruno` sends a test request, `HTTP` defines the format of that conversation.

An `HTTP` exchange always has two parts: a request and a response. The client constructs a request and sends it to a server. The request specifies what the client wants: which resource it is asking about, what action to perform, and any data it needs to send along. The server receives the request, does the necessary work, and sends back a response that tells the client what happened.

A request carries several distinct pieces of information. The **method** tells the server what kind of operation to perform. The **URL** identifies the resource the request targets. **Headers** carry metadata such as the content type or authentication credentials. The **body** (used with methods like POST and PUT) contains data the client sends to the server, such as form input or a JSON object.

A response follows a similar structure. It includes a **status code** (a three-digit number that indicates the outcome), **headers** with metadata about the response, and a **body** with the actual content being returned.

One important property of HTTP is that it is stateless. Each request stands on its own. The server does not remember anything about previous requests from the same client. Every request must carry all the information the server needs to handle it. This keeps things simple, even if it means the client has to repeat itself.

> **Question: But if HTTP is stateless, how can login/authentication even work?**
>
> To remember that a user is logged in, web applications use mechanisms like Cookies or JWTs (JSON Web Tokens). Because the HTTP protocol itself has no memory, the client must attach this kind of "digital ID card" to every single request it makes. This is a practical example of the client repeating itself to provide the server with all necessary context.

## HTTP methods

HTTP methods tell the server what action to perform on a resource. The five most common methods map directly to the basic operations of creating, reading, updating, and deleting data (often called CRUD).

**GET** retrieves data from the server. It is the most frequently used method. When you type a URL into your browser and press Enter, the browser sends a GET request. GET requests should never modify data on the server. They are purely for reading.

Example: fetching all books from a bookstore API.

```
GET /books HTTP/1.1
Host: api.bookstore.com
```

The server responds with a list of books in the response body.

**POST** sends data to the server to create a new resource. The data travels in the request body, typically formatted as JSON. The server processes it, creates the resource, and usually responds with the newly created item.

Example: adding a new book.

```
POST /books HTTP/1.1
Host: api.bookstore.com
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

The `Content-Type: application/json` header tells the server that the body contains JSON data.

**PUT** replaces an existing resource entirely. The client sends the full updated version of the resource in the request body. If any field is missing from the body, the server treats it as intentionally removed.

Example: replacing all data for book 42.

```
PUT /books/42 HTTP/1.1
Host: api.bookstore.com
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

**PATCH** applies a partial update to a resource. Unlike PUT, you only send the fields that changed. Everything else stays as it was.

Example: updating just the year for book 42.

```
PATCH /books/42 HTTP/1.1
Host: api.bookstore.com
Content-Type: application/json

{
  "year": 1925
}
```

**DELETE** removes a resource from the server. It typically does not need a request body.

Example: deleting book 42.

```
DELETE /books/42 HTTP/1.1
Host: api.bookstore.com
```

> **_:bulb: Good to know:_** The difference between PUT and PATCH trips up many developers. PUT means "here is the complete replacement." PATCH means "here are only the fields that changed." In practice, many APIs accept PUT for both full and partial updates, but understanding the intended distinction matters when you design your own endpoints.

## Status codes

Every HTTP response includes a status code: a three-digit number that tells the client what happened. Status codes are grouped into five classes based on their first digit.

**1xx (Informational):** The server received the request and is still processing it. These rarely come up in everyday development.

**2xx (Success):** The request worked as expected.

- `200 OK` is the standard success response. The server fulfilled the request and returned the result.
- `201 Created` means a new resource was created, typically in response to a POST request.
- `204 No Content` means the request succeeded but there is nothing to send back. Common after a DELETE.

**3xx (Redirection):** The requested resource has moved.

- `301 Moved Permanently` tells the client the resource now lives at a different URL.
- `304 Not Modified` signals that the resource has not changed since the client last fetched it, so the cached version is still valid.

**4xx (Client error):** Something was wrong with the request.

- `400 Bad Request` means the server could not process the request because of malformed syntax, missing fields, or invalid data.
- `401 Unauthorized` means the request requires authentication, but valid credentials were not provided.
- `403 Forbidden` means the client is authenticated but does not have permission to access this resource.
- `404 Not Found` means the server cannot find the requested resource. This is probably the most widely recognized status code on the web.

**5xx (Server error):** The server failed to handle a valid request.

- `500 Internal Server Error` is a generic failure. Something broke on the server, but the response does not say what.
- `503 Service Unavailable` means the server is temporarily unable to handle requests, usually due to maintenance or overload.

> **_:bulb: Good to know:_** You do not need to memorize every status code. The pattern matters more than individual numbers: 2xx means success, 4xx means the client made a mistake, 5xx means the server broke. The specific code within each class narrows down what went wrong.

## Resources

[HTTP response status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

[HTTP request methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
