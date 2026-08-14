# Backend SQL Advanced - Intro

## Learning Objectives

- Query across related tables using JOIN, INNER JOIN and LEFT JOIN
- Identify one-to-one, one-to-many, and many-to-many relations and model each with foreign keys or a junction table
- Write INSERT, UPDATE, and DELETE statements and understand the role of the WHERE clause in each
- Add POST, PUT, and DELETE routes to an Express application
- Write model functions for each mutation using `db.run()`

## Overview

The previous session wired an Express application to a SQLite database and covered reading data with SELECT. The application can now serve blog entries from persistent storage, but it can only read what was inserted manually. A real application needs to create new entries, update existing ones, and delete records. Those operations need to happen through the API, not through a database GUI.

This session covers three areas. First, SQL data aggregation with JOIN statements. A JOIN pulls data from multiple tables in a single query, which is necessary once a blog entry references an author by ID rather than embedding the author's name directly.

Second, you'll learn about the shape of data across tables: one-to-one, one-to-many, and many-to-many relations, and how each is modeled with foreign keys, sometimes with the help of a junction table.

Third, SQL mutations with INSERT, UPDATE, and DELETE statements, which will be added to the Express application as three new routes and three new model functions. Each SQL mutation maps to an HTTP method: POST for create, PUT for update, DELETE for remove.
