# Backend SQL Basics - Intro

## Learning Objectives

- Understand what a relational database is and how data is organized into tables, rows, and columns
- Explain the role of primary keys and foreign keys in linking related tables
- Describe what SQL is and what operations it enables
- Install SQLite and inspect a database file using DB Browser
- Write SELECT queries with WHERE, ORDER BY, and LIMIT
- Connect an Express application to a SQLite database using the sqlite3 package
- Read data from the database through a typed model function

## Overview

Most applications need to store data that persists beyond a single request or server restart. A variable in memory disappears the moment the process stops. A flat file works for small amounts of data but becomes hard to query, update, and keep consistent as it grows. Databases solve this by providing structured, reliable storage with a standard way to read and write data.

This session covers relational databases and SQL, the language used to interact with them. You will start with the core concepts: how data is organized into tables, how tables relate to each other through keys, and what SQL statements look like. From there, you will set up SQLite, a database that runs as a single file with no server required. It is a practical fit for local development because there is nothing to configure.

Once you are comfortable writing SELECT queries directly against a database, the session moves into integrating an sqlite database into an Express application. You will create a dedicated database module in TypeScript, connect to a SQLite file on startup, define a table schema, and write a model function that executes a query and returns typed results to a route handler.

The session ends with a working Express application that reads blog entries from a real database instead of from a hardcoded array.
