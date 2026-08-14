# Backend Basics and Express - Challenge: API Clients

Explore a REST API with an API client, building requests for every CRUD
operation against a local practice API. Full instructions:
[`docs/learning/02-backend/backend-basics-and-express/challenge-api-clients.md`](../../../../docs/learning/02-backend/backend-basics-and-express/challenge-api-clients.md).

## What you need

- **An API client** - pick one:
  - [Bruno](https://www.usebruno.com/downloads) (recommended, used in the course)
  - [Postman](https://www.postman.com/downloads/)
  - Optional, for scripting/advanced use: the [Bruno CLI](https://docs.usebruno.com/bruno-cli/overview), or plain `curl`/`wget`
- **The BookMonkey API** running locally (see below) - no account, database, or extra setup needed.

## Starting the API

The API (`bookmonkey-api`, a pre-built practice server) starts via the
package's `dev` script:

```json
"dev": "pnpm dlx bookmonkey-api"
```

Run it either from the monorepo root:

```bash
pnpm --filter @bootcamp/backend-basics-api-clients-challenge dev
```

or from this directory directly:

```bash
pnpm dev
```

Both pnpm and npm work fine for this - if you'd rather use npm, swap the
`dev` script for `npx bookmonkey-api` instead.

Either way, the server starts at **http://localhost:4730** (its default
port isn't guaranteed to stay the same across `bookmonkey-api` versions -
check the terminal output). Open that URL in a browser for the built-in API
documentation listing every endpoint. Keep the terminal open while you
work; closing it stops the server.

## Available scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Starts the BookMonkey API on port 4730 |
| `pnpm format:check` | Checks formatting with Prettier        |
| `pnpm format:write` | Formats files with Prettier            |

## Working through the challenge

Follow the steps in
[`challenge-api-clients.md`](../../../../docs/learning/02-backend/backend-basics-and-express/challenge-api-clients.md):
create a new collection named "BookMonkey" in your chosen client, then build
GET/POST/PUT-or-PATCH/DELETE requests against the running API until you've
covered all CRUD operations.

> **_✎ Note:_** `backend-basics-api-clients-challenge/` in this folder is a
> completed Bruno collection covering the challenge (all CRUD operations
> against BookMonkey) - try building your own first, then use it as a
> reference if you get stuck or want to compare approaches.
