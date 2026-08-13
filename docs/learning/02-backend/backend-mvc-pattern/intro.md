# Backend MVC Pattern - Intro

## Learning objectives

- Understand what the Model-View-Controller pattern means for a server-side Express application
- Move request-handling logic out of route definitions into controller functions
- Encapsulate file-based data access in a model module
- Refactor a monolithic Express app into a structured project with separate folders for routes, controllers, and models

> 💡 This session has a code along challenge. Check out the challenges chapter and work through it while reading the handouts.

## Overview

A small Express app fits easily into a single file. You declare a few routes, write the handler logic inline, read some data from a JSON file, and you have a working server. But this approach is a pitfall.

As soon as the application grows and those one-line handlers expand. Suddenly, the "single file" handles file parsing, date formatting, template selection, and HTTP status codes. You end up with a massive, tangled file where finding a bug means scrolling through thousands lines of code. That said, imagine a team of developers working on this kind of application and constantly overwriting each other’s work, resulting in a technical nightmare.

One solution to this mess and a fundamental principle is called **Separation of Concerns**. In backend development, **Model-View-Controller (MVC)** pattern is the most common way to achieve this, as it decouple data management from the user interface.

Interestingly, MVC isn't a new concept invented for the modern web. It was created in the late 1970s for desktop graphical user interfaces (specifically for the Smalltalk programming language). Decades later, developers realized that this exact same mental model perfectly solves the chaos of web server routing.

MVC forces you to draw strict boundaries. The **Model** owns the data and the business rules. The **View** is what the user ultimately sees. The **Controller** acts as the intermediary: it handles the incoming request (delegated by the router), fetches the necessary data from the Model and passes it to the View.
