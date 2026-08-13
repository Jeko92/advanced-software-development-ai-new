# Backend Basics and Express - API Clients

During backend development, you need to test whether your server handles requests correctly. A browser lets you visit URLs, but that only covers `GET` requests. You cannot send a `POST` request with a JSON body, set custom headers, or inspect the full response just by typing a URL in the address bar. You need a tool that gives you control over every part of an `HTTP` request.

Developer tools such as `Postman` or `Bruno`, further referred to as "API clients", are desktop applications that act as an `HTTP` client. You choose a method, enter a URL, optionally configure headers or a request body, and send the request. The tool displays the complete response: status code, headers, and body, with syntax highlighting that makes JSON easy to read. Instead of writing throwaway scripts or piecing together command-line tools, you build and send requests through a visual interface.

Beyond sending individual requests, API clients let you save and organize your work. As your API grows from one endpoint to dozens, keeping track of all the requests you test with becomes difficult. Most API clients solve this with collections, which group related requests into folders you can revisit, reorder, and share with others.

Since we do not have a frontend yet, you will use an API client to interact with your APIs. It lets you simulate the client side, so you can focus purely on the backend: observing what the server receives, how it processes the data, and what it returns.

## Sending a request

A request in an API client maps directly to the `HTTP` request structure covered in this session.

The **method selector** is a dropdown at the top of the request tab. It defaults to GET. Change it depending on what operation you want to perform: GET to read, POST to create, PUT or PATCH to update, DELETE to remove.

The **URL bar** sits next to the method selector. Type the full address of the endpoint you want to reach, for example `http://localhost:4730/books`.

The **Headers tab** lets you add or modify request headers. Most API clients set common headers automatically (like `Content-Type` when you add a JSON body), but you can add custom ones here when an API requires them.

The **Body tab** is where you provide data for POST, PUT, and PATCH requests. Select "raw" and choose "JSON" from the format dropdown to write a JSON payload. For GET and DELETE requests, the body is typically left empty.

After clicking **Send**, the tool displays the response in a separate panel:

- The status code and status text (for example, `200 OK` or `404 Not Found`)
- The response body, formatted with syntax highlighting
- The response headers and the time the request took

## Collections

A collection is a named folder that groups related requests. If you are working with a bookstore API, you might create a collection called "Bookstore" containing saved requests for "Get all books," "Create a book," "Update a book," and "Delete a book."

Collections serve two purposes. They keep your test requests organized so you don't have to rebuild them from scratch every session. And they work as lightweight documentation: anyone who opens your collection can see every endpoint your API supports and what data each request sends.

## Choosing an API client

For the upcoming sessions you need to pick one of the following API clients:

### Postman

Postman is a widely used API client available as a desktop application with a polished interface. It requires creating an account to use. In order to share collections across your team, you need to use the cloud sync for sharing collections across devices and teams instead of storing the collections in the project repository.

[Postman download](https://www.postman.com/downloads/)

### Bruno

Bruno is a modern open-source API client. It stores collections as plain files on your filesystem, which means you can share them with your team by committing them directly into your project repository alongside your code. Bruno offers a polished interface, works fully offline and does not require an account.

[Bruno download](https://www.usebruno.com/downloads)

## Resources

[Postman Learning Center: Sending your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

[Bruno documentation](https://docs.usebruno.com/)

[Bruno vs Postman](https://www.usebruno.com/compare/bruno-vs-postman)
