{% raw %}

# Backend Architectures - Challenges

This session has three challenges. The first is a guided code-along that refactors a monolithic blog app into MVC. The second builds an admin panel on top of the refactored project. The third is optional and adds a basic auth mechanism.

Work through them in order. Each challenge depends on the structure built in the previous one.

## 1 Code Along: Refactor the blog into MVC

The starter app below is a working blog server. It renders a list of posts on the home page and a detail page for each post under `/posts/:slug`. It also supports simple filtering, sorting, and pagination from query params. All routing, data access, slug logic, query parsing, and date formatting live in a single file. Your task is to refactor it into a Model-View-Controller structure without changing what the user sees.

After each step, the app should still serve the same pages with the same content. If something breaks, the step is not done.

### Setup

Clone the starter-project, install the dependencies and verify that the app
works as intended:

```bash
npx ghcd@latest wd-bootcamp/asd-challenges/tree/main/challenges/mvc-pattern-challenge mvc-pattern-challenge

npm install
```

Verify the starter works:

- run `npm start`
- open `http://localhost:3000`
- click into a post, confirm the date is human-readable
- test `/?sort=oldest&page=1`
- test `/?page=2`.

### Step 1: Extract routes into a router module

- Move the routing definitions out of your main application file and into a dedicated router module.
- Use Express's built-in router capabilities to group these routes, and then mount that router back in your main entry file.

> For this step, keep the actual request-handler logic (the bodies of the routes) inline where they are. The goal right now is simply to separate the routing wiring from the server setup.

> When you are done, your main application file should no longer contain direct route declarations (like app.get), but it should still handle your template engine setup, static files, and server listener.

**Verify: Your home page, detail pages, and contact page should all still work identically.**

### Step 2: Extract handlers into a controller

- Create a controller module and extract the inline handler bodies out of your router.
  - Each handler should become a cleanly named, exported function within your new controller.
  - Don't forget to properly type your request and response parameters using Express's built-in types.
- Update your router file so that it imports these controller functions and maps them to their respective routes.
  - Your router file should now read as a clean, simple list of route-to-function mappings, while the controller contains the actual logic (reading files, calling helpers, and rendering templates).

**Verify: Test the application again. All three pages must still serve correctly with no changes in behavior.**

### Step 3: Extract data access into a model

- To finish the separation of concerns, create a data model.
- Move all data-fetching and data-manipulation logic out of the controller and into this new model module. This should include:
  - [ ] Your data interfaces/types.
  - [ ] Constants related to your data source (like file paths).
  - [ ] Helper functions specifically related to data parsing (like generating slugs).
  - [ ] A function to fetch all posts.
  - [ ] A function to fetch a single post by its identifier.
  - [ ] A function to overwrite the data file with new data (you will need this for the next challenge).

- Update your controller to import and use these model functions instead of directly interacting with the file system. The controller's only job now is to ask the model for data, decide what to do with it, and render the appropriate response.

<details>
<summary>

**Hint:**

</summary>

Keep presentation-focused helpers (like date formatting) in the controller. That is a presentation concern, not a data concern, so it does not belong in the model layer.

</details>

**Verify: Your project structure should now clearly separate routes, controllers, and models. The application should still behave exactly as it did in Step 1.**

<details>
<summary>

**Hint:**

</summary>

```
project/
  app.ts
  routes/
    postRoutes.ts
  controllers/
    postController.ts
  models/
    postModel.ts
  views/
    index.html
    post.html
    contact.html
  data/
    posts.json
  public/
    ...
```

</details>

## 2 Admin Panel CRUD

Build an admin section on top of your refactored project that lets a content editor create, update, and delete posts. The admin panel does not need authentication for the main task.

### Routes

Implement these endpoints:

- `GET /admin` renders a list of all posts with edit and delete buttons next to each entry.
- `GET /admin/posts/new` renders an empty form for creating a new post.
- `POST /admin/posts` creates a new post from the form submission and redirects back to `/admin`.
- `GET /admin/posts/:slug/edit` renders a form pre-filled with the existing post data.
- `POST /admin/posts/:slug` saves the edited post and redirects back to `/admin`.
- `POST /admin/posts/:slug/delete` removes the post and redirects back to `/admin`.

> Don’t forget to continue following the MVC pattern consistently!

### Form parsing

HTML forms post data as `application/x-www-form-urlencoded`, not JSON. Express does not parse this format unless you tell it to. Add the built-in parser middleware in `app.ts`:

```typescript
app.use(express.urlencoded({ extended: true }));
```

Without this middleware, `req.body` will be `undefined` for form submissions.

### HTML sanitization

The post content is HTML. If you save the raw form input straight into `posts.json` and render it on the public detail page, anyone using the admin panel can inject `<script>` tags or other harmful markup that runs in your readers' browsers. This is a stored cross-site scripting vulnerability.

Install the `sanitize-html` package:

```bash
npm install sanitize-html
npm install --save-dev @types/sanitize-html
```

Run every submitted `content` field through `sanitizeHtml` before passing it to the model. Configure an allowlist of tags and attributes that match what the blog actually needs (paragraphs, headings, links, lists, images). Strip everything else.

### Model functions to add

The admin controller will need new functions in `postModel.ts`:

- `addPost(post)` appends a new post to the array and writes the file.
- `updatePost(slug, changes)` finds the post by slug, replaces its fields, and writes the file.
- `deletePost(slug)` removes the post by slug and writes the file.

These all build on `getAllPosts` and `writePosts`, which already exist from the code-along.

### Bonus Tasks

- Add a search input on `/admin` that filters posts by title.
- Add pagination for both the public home page and the admin list.
- Replace the plain content textarea with a WYSIWYG editor like [Quill](https://quilljs.com/) or [Editor.js](https://editorjs.io/). Make sure the sanitization step still runs server-side, regardless of what the editor produces client-side.

## 3 Bonus: Public REST API Endpoints

So far, our blog application has been a classic ‘server-side rendered’ (SSR) app: Express fetches the data, combines it with Nunjucks templates, and sends the finished HTML to the browser (`res.render()`).

In practice, however, many web applications also make their data available in a machine-readable format. For example, for mobile apps, single-page applications (React/Vue) or for widgets on external websites.

Extend the Express application with a small, public REST API. To do this, define two new routes under the path `/api/...`, which do not render a Nunjucks templates but return raw data in JSON format (`res.json()`).

- `GET /api/posts/random:` Return a random Blogpost as a JSON-Object.
- `GET /api/posts/latest:` Returns the three most recent blog posts as a JSON-array.
- `GET /api/stats:` Returns a JSON object containing blog statistics (e.g. `{‘totalPosts’: 15, “newestPostDate”: ‘2026-04-30’}`)

## 4 Bonus: Rudimentary Auth

This challenge is optional and intended as a bonus exercise. Proper authentication is covered in a later session. The goal here is only to think about how to gate a set of routes behind a check.

Pick one of the two approaches:

### HTTP Basic Auth middleware

Write a small middleware function that reads the `Authorization` header, decodes the Base64-encoded `user:password` string, and compares it against a hardcoded value (or a value from an environment variable). If the credentials match, call `next()`. If not, set the `WWW-Authenticate: Basic` response header and return a 401 status.

Apply this middleware only to the admin router with `app.use("/admin", basicAuth, adminRoutes)`. The browser will prompt for credentials the first time the user visits an admin page.

### Session cookie

Add a `GET /login` page with a form, a `POST /login` handler that checks a hardcoded password and sets a cookie like `admin=true` on success, and a middleware that checks for that cookie before any admin route runs. If the cookie is missing or wrong, redirect to `/login`.

Use the `cookie-parser` package to read cookies from `req.cookies`.

> **_⚠ Note:_** Neither approach is production-ready. Hardcoded passwords, plain cookies without signing, and missing CSRF protection are all real problems. The point of this challenge is to feel where the auth seam goes in an MVC app, not to ship a secure system.

{% endraw %}
