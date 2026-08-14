# Backend MVC Pattern - Views

The view is the layer the user actually receives. So far in this session, the view has been a Nunjucks template: the controller calls `res.render("post", { post })`, the template engine assembles the HTML, and the response body is the result.

What is worth flagging is that "view" is not a synonym for "HTML template". A view is whatever representation of the data leaves the server. For a traditional web page, that is a rendered template. For a JSON API, the view is the JSON structure the controller writes into the response body. The same model can sit behind both, with different views over the same data.

## HTML views with Nunjucks

For HTML responses, the view lives in a template file under `views/`. Nunjucks (covered in a previous session) reads the template, fills in the data passed by the controller, and returns the final HTML. The controller never builds HTML itself — it picks a template name and the data to inject:

```typescript
res.render("post", { post });
```

The template file is the view.

## JSON views

When the response is JSON, the equivalent of a template is a function that takes a model object and returns the shape the client should see. Putting that function in its own module keeps the shaping out of the controller and gives every endpoint that returns a post a single source of truth for what a post looks like in the API.

```typescript
// views/postView.ts
import { Post } from "../models/postModel";

export function postAsJson(post: Post) {
  return {
    title: post.title,
    author: post.author,
    body: post.content,
  };
}
```

The controller imports this view function and hands its result to `res.json` in place of `res.render`:

```typescript
import { postAsJson } from "../views/postView";

export function showPost(req: Request<{ slug: string }>, res: Response) {
  const post = postModel.getPostBySlug(req.params.slug);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(postAsJson(post));
}
```

The object returned by `postAsJson` is the view. It decides which fields are exposed, which are renamed, and which stay hidden — an internal `createdAt` timestamp on the model can simply be absent from the API response. A different view function (`postAsListItem`, `postAsSummary`) can produce a different shape from the same `Post` for a different endpoint.

The boundary is the same regardless of format. The view never reaches into storage and never decides whether a request is valid. It receives data already shaped by the controller and produces the bytes the user receives.

## Resources

[Express response API](https://expressjs.com/en/4x/api.html#res)
