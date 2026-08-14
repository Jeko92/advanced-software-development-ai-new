# Backend SQL Basics - SQLite

Most relational databases run as a separate server process: your application connects to it over a network socket, authenticates with credentials, and sends queries across that connection. Setting one up requires installation, configuration, user management, and a running server daemon. For production applications that need to handle concurrent users, this architecture makes sense. For learning SQL and building a first backend, it adds significant friction before you can write a single query.

SQLite takes a different approach. The entire database lives in a single file on disk, and the database engine is a library that your application links to directly. No server process, no network configuration, no user accounts. You specify a file path, and SQLite handles the rest.

## What makes SQLite different

SQLite is serverless: there is no separate process running in the background. The application reads and writes the database file directly through the SQLite library. The database file is also fully portable: copy it to another machine and it opens immediately.

It is self-contained and zero-configuration, with no installation steps beyond including the library. SQLite also supports ACID transactions, meaning that data changes are atomic, consistent, isolated, and durable even across crashes.

The tradeoff is write concurrency. Only one process can write to a SQLite database at a time. For a single-developer local project or a low-traffic internal tool, this is not a problem. For a production application that handles thousands of simultaneous write requests, a client-server database like PostgreSQL or MySQL is the right choice.

SQLite is widely used despite these limits. It is the default embedded database on Android and iOS, and it ships inside Chrome, Firefox, and macOS system applications.

## Installation

**macOS:** SQLite comes pre-installed. Run `sqlite3 --version` in your terminal to confirm. If you want a newer version, install it with Homebrew:

```bash
brew install sqlite
```

**Windows:** Download the precompiled binaries from the official SQLite download page. Extract the `sqlite-tools` zip, move the contents to a folder like `C:\sqlite`, and add that folder to your system PATH. Open a new terminal and run `sqlite3 --version` to verify the setup.

## DB Browser

DB Browser for SQLite is a graphical application for inspecting and editing SQLite database files. It lets you view tables, browse rows, run SQL queries, and examine the schema without writing any code. This is useful during development for checking that your application is actually writing data to the database correctly.

Download and install it from the official site. As soon as we established our sqlite database file, you can open it with DB Browser.

## Resources

[SQLite download page](https://www.sqlite.org/download.html)

[DB Browser for SQLite](https://sqlitebrowser.org/dl/)
