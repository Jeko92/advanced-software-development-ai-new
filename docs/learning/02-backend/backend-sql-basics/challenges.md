# Backend SQL Basics - Challenges

## Integrate SQLite into Your Express Project

Connect your existing Blog project to a SQLite database and replace the hardcoded data array with real database reads.

**Requirements:**

- Create `src/db/database.ts` with `connectDB()`, `getDB()`, and `closeDB()` functions
- Call `connectDB()` in `src/index.ts` before starting the server
- Register SIGINT and SIGTERM handlers that call `closeDB()` before exiting
- Define the table schema in `connectDB()` using `CREATE TABLE IF NOT EXISTS`
- create a new database file called `blog.db` in the `./db` directory
- Let the server start successfully and generate the empty table. Then use DB Browser to fill the table with your already present data from your json file.
- Refactor your model so that the get-all function uses the database instead of the hardcoded data
- Refactor your model so that the get-one function uses the database instead of the hardcoded data
- Verify the data is being read correctly by inspecting the database file with DB Browser

## SQL Practice Games

Work through one or more of these interactive SQL games. Each one teaches SQL through a story or puzzle — you write real queries to progress.

- [SQL Island](https://sql-island.informatik.uni-kl.de) — a narrative adventure where SQL commands move you through the game
- [SQL Murder Mystery](https://mystery.knightlab.com) — investigate a crime scene using SELECT queries
- [SQL Squid Game](https://datalemur.com/sql-game) — compete through SQL challenges
- [SQL Police Department](https://sqlpd.com) — solve cases with SQL
