# Backend Express Advanced - Intro

## Learning objectives

- Introduce Express middlewares and some edge-cases
- Explain what an access log is and why Express middleware is a good place to create one
- Build log entries from request data such as method, URL, IP address, and timestamp
- Create and append to a log file with Node.js file system APIs
- Use `path.join()` and startup checks to place the log file in a predictable location
- Read environment variables from `process.env` and understand when to use `.env` files
- Debug an Express application with console logging and the Node.js inspector

## Overview

Express applications often need to do certain jobs for every incoming request, not just inside one specific route. Tasks like logging, checking authentication, parsing data, or handling errors, to name a few, all happen around the request-response cycle itself. Express middleware gives you a structured way to place that shared logic in the flow, so it runs centrally instead of being repeated across many route handlers.

Here's one example of a common use-case for a middleware -- as soon as a server starts handling real traffic, one question appears quickly: what is the app actually doing? When a route returns the wrong status code, a page fails to load, or a user says "it does not work," you need a record of the requests that reached the server. That record is an access log.

This session uses a logger to connect several backend basics that developers need early: Express middleware, request objects, file system operations, asynchronous code, environment variables, and debugging. The goal is not just to "write to a file." The goal is to understand why logging happens at a central point in the request flow, what information belongs in a log entry, and how to store those entries without hardcoding fragile paths.

The session starts with middleware because logging is a cross-cutting concern. You do not want to repeat the same logging code inside every route handler. From there, the material moves into log file management: creating the file, checking whether it already exists, appending new lines, and building paths in a way that still works when the project is compiled to JavaScript.

The last two topics support the same workflow. Environment variables keep values like the server port outside the source code, and debugging tools help you inspect request data and trace errors while you build the logger and have a go at the challenge.
