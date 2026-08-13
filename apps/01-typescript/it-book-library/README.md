# 📚 IT-Book Library

A TypeScript-based web application created as a TypeScript recap project, which
is part of the **neuefische Advanced Software Development with AI bootcamp**.

The goal of this project is to build an online library platform for IT books
where users can browse available books, search and filter the collection, view
detailed information, and manage their own list of favorite books.

The application fetches book data from a bundled local JSON dataset and uses
**plain TypeScript for DOM manipulation** without any frontend frameworks or
component libraries.

---

## 🚀 Features

### 📖 Book Listing

- Fetches all available books
- Displays books in a table format
- Shows important book information:
  - Title
  - ISBN
  - Author
  - Publisher

### 🔎 Search & Filtering

- Search books by title
- Filter books by publisher
- Dynamically update the displayed book list

### 📄 Book Details

- Each book has its own detail page
- Displays all available information
- Accessible directly from the book listing

### ⭐ Favorites

- Add books to a personal favorites list
- Remove books from favorites
- Display favorite count in the application header
- Favorites are stored permanently using `localStorage`

---

# 🛠️ Technologies Used

- TypeScript
- Vite
- JavaScript DOM API
- HTML5
- CSS3
- Fetch API
- Browser Local Storage
- pnpm
- ESLint
- Prettier

---

## 📂 Project Structure

```
it-book-library/
├── vite.config.ts        # root: 'src' - the HTML entries below live there
├── public/
│   ├── .db/
│   │   ├── books.json     # bundled book dataset
│   │   └── book-images/   # book cover images
│   └── images/             # fallback cover
└── src/
    ├── index.html          # Book listing page
    ├── detail.html         # Book detail page
    ├── favorite.html       # Favorites page
    ├── styles/style.css
    ├── vite-env.d.ts
    └── ts/
        ├── index.ts       # listing page functionality
        ├── detail.ts      # detail page functionality
        ├── favorites.ts   # favorites page functionality
        ├── shared.ts      # shared fetch/favorites/DOM helpers
        └── types.ts
```

`vite.config.ts` sets `root: 'src'`, so the three HTML entry pages live
alongside the rest of the app's source rather than at the package root.
`publicDir`/`outDir`/`envDir` are all pointed back at the package root
explicitly, since Vite resolves them relative to `root` by default.

Anything under `public/` is served as-is at the site root by Vite, in both
`dev` and `build` - that's how `.db/books.json` and `.db/book-images/*.png`
end up reachable at `/.db/...` without any custom copy step.

---

## ⚙️ Installation & Setup

From the monorepo root:

```bash
pnpm install
```

Then, from this package (`apps/01-typescript/it-book-library`):

```bash
pnpm dev
```

Opens on [http://localhost:3000](http://localhost:3000) by default (set
`DEV_PORT` in `.env` to change it). No separate API server needed - book data
comes from the bundled `public/.db/books.json`.

---

## 📜 Available Scripts

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | Starts the Vite dev server (port `DEV_PORT`)          |
| `pnpm build`        | Builds a production bundle to `dist`                  |
| `pnpm preview`      | Serves the `dist` build locally (port `PREVIEW_PORT`) |
| `pnpm typecheck`    | Type-checks with `tsc --noEmit`                       |
| `pnpm lint`         | Checks code quality with ESLint                       |
| `pnpm format:write` | Formats files with Prettier                           |
| `pnpm format:check` | Checks formatting                                     |

`pnpm preview` serves the `dist/` folder as-is - run `pnpm build` first, there's
nothing to preview otherwise.

---

## 🌐 Data source

Book data comes from `public/.db/books.json`, bundled with the app - no external
API required to run this locally.

Optionally, set `VITE_API_BASE_URL` in a `.env` file (copy `.env.example`)
to fetch the same `/.db/books.json` + `/.db/book-images/*.png` layout from a
different host instead. Left empty (the default), every request stays relative
to wherever the app is served from.

---

## 🧠 Learning Goals

This recap project was created to practice and consolidate:

- TypeScript fundamentals
- Static typing
- Working with `fetch` and asynchronous data
- DOM manipulation
- Event handling
- Data filtering and transformation
- Client-side persistence with `localStorage`
- Structuring a multi-page TypeScript application
- Writing clean and maintainable frontend code

---

## 📌 Project Context

This project is part of the **neuefische Advanced Software Development with AI
bootcamp** and serves as a recap exercise to combine previously learned frontend
development concepts into a complete application.

---

## 👨‍💻 Author

**Jemal Khachidze**

---

## 📄 License

This project was created for educational purposes as part of the neuefische
bootcamp.
