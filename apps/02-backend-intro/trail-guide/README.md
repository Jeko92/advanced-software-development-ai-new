# Trail Guide

Trail Guide is a full-stack backend recap project from the **neuefische Advanced Software Development with AI Bootcamp**.

The project combines concepts from the backend module into one Express application:

- Express routing and middleware
- MVC architecture
- Nunjucks server-side rendering
- SQLite database integration
- REST API development
- HTML form-based administration

The application provides three interfaces backed by the same database and model layer:

- **Public website** — browse hiking trails and regions
- **Admin panel** — manage trails through HTML forms
- **REST API** — access and modify trail data programmatically

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Nunjucks
- SQLite
- Pico.css
- tsx (dev runtime, run via the monorepo's pnpm workspace)
- ESLint
- Prettier

## Features

### Public Website

Visitors can:

- View all available trails
- View trail details
- Browse regions
- View trails by region

Pages are rendered server-side using Nunjucks templates and share a common layout.

### Admin Panel

Administrators can manage trails through a browser interface:

- List trails
- Create trails
- Edit trails
- Delete trails

The admin interface uses HTML forms and redirects after successful operations.

### REST API

The API is available under `/api`.

Implemented endpoints include:

- Read trails and regions
- Filter trails
- Create trails
- Update trails
- Delete trails

Write operations are protected with an API key header.

## Database

The application uses SQLite with a one-to-many relationship:

```
regions
  |
  | 1:n
  |
trails
```

Trail queries use SQL joins to include region information together with trail data.

## Project Structure

```
.
├── .github/          # Issue/PR templates, CI workflows
├── data/             # SQLite database + seed script
├── public/           # Static assets (CSS, images, favicon)
├── src/
│   ├── app.ts         # Express app entry point
│   ├── controllers/    # Route handlers (admin/public)
│   ├── db/             # Database connection
│   ├── middleware/     # Express middleware (logging, etc.)
│   ├── models/         # Data access layer (trails, regions)
│   ├── routes/         # Route definitions
│   └── views/          # Nunjucks templates (layouts, partials, pages)
└── tsconfig.json
```

## Installation

From the monorepo root, install dependencies for every workspace package:

```bash
pnpm install
```

Create your environment file:

```bash
cp .env.example .env
```

Seed the database:

```bash
pnpm --filter @bootcamp/trail-guide db:seed
```

## Environment Variables

The application expects:

```
PORT=3000
DB_PATH=./data/trail-guide.db
API_KEY=<your API key>
LOG_DIR=logs
LOG_FILE_NAME=access.log
WINDOW_MS=60000
MAX_REQUESTS_PER_WINDOW=10
ADMIN_USER=<admin username>
ADMIN_PASS=<admin password>
COOKIE_SECRET=<random secret>
```

`/admin` is protected by a signed session cookie: log in at `/login` with
`ADMIN_PASS` (or send an `Authorization: Basic` header with
`ADMIN_USER`/`ADMIN_PASS`) to get a cookie signed with `COOKIE_SECRET`, so it
can't be forged by just setting `admin=true` from the browser. `/api/trails`
writes remain gated separately by the `x-api-key` header, for programmatic
API consumers rather than the admin panel.

## Available Scripts

Run any of these with `pnpm --filter @bootcamp/trail-guide <script>` from
the monorepo root, or plain `pnpm <script>` from inside this directory.

| Command        | Description                        |
| -------------- | ----------------------------------- |
| `dev`          | Start development server (tsx --watch) |
| `build`        | Build production bundle             |
| `start`        | Run production build                |
| `db:seed`      | Seed SQLite database                |
| `typecheck`    | Run TypeScript checks               |
| `lint`         | Run ESLint                          |
| `lint:fix`     | Fix ESLint issues automatically     |
| `format:check` | Check formatting with Prettier      |
| `format:write` | Format files with Prettier          |

## Development

Start the development server:

```bash
pnpm --filter @bootcamp/trail-guide dev
```

This runs `tsx --watch --env-file=.env src/app.ts`, which loads `.env` and
restarts the server on file changes.

The application will be available at:

```
http://localhost:3000
```

## Learning Context

This project is a recap application combining the following backend concepts:

- Express application structure
- MVC separation
- Middleware lifecycle
- Database models
- SQL queries and relationships
- Server-side rendering
- API design
- Authentication middleware

It was built as part of the backend module of the neuefische Advanced Software Development with AI Bootcamp.
