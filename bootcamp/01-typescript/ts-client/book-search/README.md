# TypeScript Client

This package contains client-side TypeScript exercises using Vite.

The project demonstrates:

- TypeScript in the browser
- DOM manipulation
- Event handling
- Fetching external APIs
- Environment variables with Vite

## Tech Stack

- TypeScript
- Vite
- TMDB API

## Setup

Install dependencies from the repository root:

```bash
pnpm install
```

Create your local environment file:

```bash
cp .env.example .env
```

Open `.env` and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

You can create an API key at:

https://developer.themoviedb.org/

## Development

From this package directory:

```bash
cd bootcamp/01-typescript/ts-client/book-search
```

Start the Vite development server:

```bash
pnpm dev
```

The application will be available at the URL shown by Vite.

## Build

Create a production build:

```bash
pnpm build
```

## Preview

Preview the production build:

```bash
pnpm preview
```

## Environment Variables

Vite only exposes variables prefixed with `VITE_` to client-side code.

Required variable:

```env
VITE_TMDB_API_KEY
```

The `.env` file must never be committed because it contains private credentials.

Use `.env.example` as a template for other developers.
