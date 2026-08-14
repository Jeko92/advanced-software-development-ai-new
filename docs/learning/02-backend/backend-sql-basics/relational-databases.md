# Backend SQL Basics - Relational Databases

Applications generate data: user accounts, blog posts, orders, messages. That data needs to live somewhere reliable and queryable. You need to find specific records, filter by conditions, and combine related pieces of information. A relational database handles all of this by organizing data into tables and providing a standard language for querying them. Understanding the structure before writing any queries makes the SQL syntax that follows considerably easier to grasp.

## Tables, rows, and columns

A relational database stores data in tables, also called relations. Each table represents a single kind of entity: customers, products, blog posts. Within a table, each row is one instance of that entity (one customer, one blog post), and each column is one attribute that every instance shares (a customer's name, a blog post's title).

This is similar to a spreadsheet, but with a key difference: a database enforces structure. Every row in a table has exactly the same columns, and the database can validate that values match expected types and constraints.

A database typically contains multiple tables. A blogging application might have a `blog_entries` table and a separate `authors` table. Keeping related but distinct data in separate tables is called normalization. It avoids duplication and keeps each piece of information in one place.

## Primary and foreign keys

For tables to relate to each other, each row needs a unique identifier. A **primary key** is a column, or combination of columns, that uniquely identifies each row in a table. In practice, this is either an auto-incrementing integer column or a `UUID` column named `id`.

A **foreign key** is a column in one table that stores the primary key of a row in another table. If the `blog_entries` table has an `author_id` column that references the `id` column in the `authors` table, that column is a foreign key. This is what links a blog post to its author without copying the author's data into the blog entry.

Foreign keys are what make a database "relational": they establish associations between tables that you can traverse at query time.

## SQL

SQL, pronounced "sequel", stands for Structured Query Language. It is the standard language for interacting with relational databases. The same SQL you write against SQLite works, with minor variations, against PostgreSQL, MySQL, and most other relational systems.

SQL covers two broad areas:

- **Data Manipulation Language (DML):** statements that read and change data — `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- **Data Definition Language (DDL):** statements that define or modify the database structure — `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`

When your application needs to read or write data, it sends SQL statements to the database management system (DBMS). The DBMS parses the statement, executes it against the stored data, and returns the result. This session focuses on `SELECT` for reading. Writing data with `INSERT`, `UPDATE`, and `DELETE` is covered in the next session.

## Resources

- [SQL on MDN](https://developer.mozilla.org/en-US/docs/Glossary/SQL)
- [Relational database on Wikipedia](https://en.wikipedia.org/wiki/Relational_database)
- [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier)
