# Backend Architectures - Controllers

A controller is a file, class, or a named function that holds the logic for handling requests. It lives in its own module, separate from the routes that wire URLs to it. This turns the route file into a short, clean list of mappings from URL to a specific controller functions. The controller itself holds the actual handlers, each named for what it does rather then the URL that triggers it.

The naming alone makes a difference. A handler called `listPosts` says what it is. A handler defined inline as `(req, res) => { ... }` says nothing until you read its body. And when two routes need the same logic, a named function can be wired into both without copying the code.

Controllers also draw a clean architectural line: the route file does wiring, the controller does request handling, and anything else gets pushed further down (to the model or the template). When a change is needed, it usually fits into one of those places.

## Controller functions in Express

A controller is a plain TypeScript function with the same signature Express expects from a route handler: it takes a `Request` and a `Response` and returns nothing. The types come from the `express` package.

```typescript
import { Request, Response } from "express";
import * as postModel from "../models/postModel";

export function listPosts(req: Request, res: Response) {
  const posts = postModel.getAllPosts();
  res.render("index", { posts });
}

export function showPost(req: Request, res: Response) {
  const post = postModel.getPostBySlug(req.params.slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", { post });
}
```

A few important notes to keep in mind:

- Each controller function has a name that describes what it does. The names read like verbs because each function performs an action: list, show, create, delete.
- The controller imports the model and calls its functions instead of touching files itself. The model decides how the data is stored.
- The controller picks the template and the response status. That is its job. It does not generate HTML and does not parse URLs by hand.
- When something is missing, the controller responds with the appropriate status code and stops. No `else` branch is needed because the function returns after the 404 response.

Typing `req` and `res` with the Express types unlocks editor autocomplete for `req.params`, `req.query`, `req.body`, and the response methods. It also catches typos at compile time.

## Typing route parameters

When the handler lived inline in the route definition, the express route method could infer the params from the URL and give this context to the handler. Once the handler moves into a controller module, that context and type inference is gone.

Express's `Request` type accepts a generic that names the parameters this controller expects:

```typescript
export function showPost(req: Request<{ slug: string }>, res: Response) {
  const post = postModel.getPostBySlug(req.params.slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("post", { post });
}
```

The `{ slug: string }` generic locks `req.params` to the parameters this handler actually needs. A typo like `req.params.slugg` now fails at compile time, and editor autocomplete suggests `slug` directly. If the route is later changed to use a different parameter name, the controller stops compiling until it is updated to match.

## Wiring controllers to routes

Once handlers live in a controller module, the router file shrinks to a list of mappings. Each route declaration imports the named function and passes it as the handler.

```typescript
import { Router } from "express";
import { listPosts, showPost } from "../controllers/postController";

const router = Router();

router.get("/", listPosts);
router.get("/:slug", showPost);

export default router;
```

The router file now reads as a table of contents for one part of the app. A request to the root of this router runs `listPosts`. A request to `/:slug` runs `showPost`. The implementation details of those functions are not visible here, and that is the point. A reader can scan the file and see the URL structure without being distracted by handler bodies.

## Resources

[Express request and response API](https://expressjs.com/en/4x/api.html#req)
