# Backend Basics and Express - Intro

## Learning objectives

- Understand the client-server model and the request-response cycle
- Know what an API is and why it structures backend communication
- Understand HTTP: methods, status codes, and message format
- Get with tools in touch to send requests to an API and inspect responses
- Understand what Express does and why it exists on top of Node.js
- Create/run an Express server and add TypeScript to your Express project
- Define routes for different HTTP methods and extract data from URLs
- Read request data (parameters, query strings, body) and send structured responses

## Overview

Every web application has two sides. The frontend is what users see and interact with in the browser: buttons, forms, layouts rendered in `HTML` and `CSS`. The backend is a separate program running on a server that the frontend communicates with. It processes incoming requests, enforces business rules, reads and writes data, and sends results back to whoever asked.

When you click <kbd>Submit</kbd> on a login form, your browser does not check the password itself. It sends the username and password to a backend server, which looks up the account, verifies the credentials, and responds with either a success or an error. The browser then reacts to that response. This back-and-forth between a client (the browser, a mobile app, or any program that sends a request) and a server (the backend program that handles it) is called the request-response cycle. Everything else in backend development builds on top of it.

For that communication to work, both sides need to agree on a format. An API (Application Programming Interface) provides that agreement. It defines the endpoints a server exposes, what data each endpoint expects, and what it returns. The server promises: "send a `GET` request to /users and I will return a list of users." The client does not need to know how the server stores those users or what database it uses. It just follows the API's rules.

The protocol that carries these messages across the network is `HTTP` (Hypertext Transfer Protocol). It defines how requests and responses are structured, what metadata they contain, and how both sides signal success or failure. As a backend developer, `HTTP` is what you will work with every day.
