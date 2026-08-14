# Backend MVC Pattern - MVC in Action

After exploring each part of the MVC architecture, lets see how they interact with each other. The pattern becomes much clearer when you watch a single request travel through every layer and see what each one actually does with it.

The example below traces the lifecycle of one HTTP request from the URL hitting the server to the rendered HTML leaving it. The app uses a JSON file as its data store and Nunjucks as its template engine, but the same flow holds for any MVC backend regardless of where the data lives or how the HTML is generated.

## Blog Post Example

By following the lifecycle of a request, we can get a basic understanding how the layers interact with each other.

Let's trace the exact sequence when a user requests a specific blog post. Notice the strict boundaries at every step:

1. The App (`app.ts`): The request arrives at the main server file. Express sees that the URL starts with `/posts` and forwards the request to the Post Router.

```typescript
import express from "express";
import postRoutes from "./routes/postRoutes";

const app = express();
app.set("view engine", "njk");
app.use("/posts", postRoutes);

app.listen(3000);
```

2. The Router (`routes/postRoutes.ts`): The router matches the exact path (like `/:slug`) and hands the request off to the `showPost` Controller function.

```typescript
import { Router } from "express";
import * as postController from "../controllers/postController";

const router = Router();

router.get("/", postController.listPosts);
router.get("/:slug", postController.showPost);

export default router;
```

3. The Controller (`controllers/postController.ts`): Extracts the `slug` from the URL parameters and queries the Model for the corresponding post.

```typescript
import { Request, Response } from "express";
import * as postModel from "../models/postModel";

export function showPost(req: Request, res: Response) {
  const post = postModel.getPostBySlug(req.params.slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", { post });
}
```

4. The Model (`models/postModel.ts`): Executes the data access logic. It reads the JSON file (or queries a database), finds the matching post, and returns the raw TypeScript object to the Controller.

```typescript
import fs from "node:fs";
import path from "node:path";

const postsFilePath = path.join(__dirname, "../data/posts.json");

export function getPostBySlug(slug: string): Post | null {
  const raw = fs.readFileSync(postsFilePath, "utf8");
  const posts: Post[] = JSON.parse(raw);
  return posts.find((post) => post.slug === slug) ?? null;
}
```

5. The Controller (Again): The Controller evaluates the returned data. If no post exists, it returns a 404 error. Otherwise, it passes the data to the View: `res.render("post", { post });`.

6. The View (`views/post.html`): The Nunjucks template takes the raw data, injects it into the HTML structure, and generates the final web page.

```html
<article>
  <h1>{{ post.title }}</h1>
  <time datetime="{{ post.date }}">{{ post.date }}</time>
  <p>{{ post.body }}</p>
</article>
```

7. The Response: Express sends the compiled HTML back to the user's browser.

## Resulting Folder Structure

Applying this pattern transforms the messy single-file Express script into a clean, predictable directory structure.

```
project-root/
  ├── app.ts                  # App setup and router mounting
  ├── routes/
  │   └── postRoutes.ts       # URL to Controller mapping
  ├── controllers/
  │   └── postController.ts   # HTTP logic (req, res)
  ├── models/
  │   └── postModel.ts        # Data logic (files, databases)
  ├── views/
  │   └── post.html           # Presentation logic (Nunjucks)
  └── data/
      └── posts.json          # Your current "database"
```
