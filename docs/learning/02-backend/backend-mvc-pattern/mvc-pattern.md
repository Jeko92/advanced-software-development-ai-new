# Backend MVC Pattern - The MVC Pattern

The Model-View-Controller (MVC) pattern separates concerns and prevents your codebase from turning into a tangled mess. But how do these individual pieces actually communicate in a real Express application?

Let's break down the core components and trace how they handle a request.

## Model, View, and Controller

The core idea of the MVC Pattern is that the three layers are responsible for different tasks:

1. The `model` layer handles data access, storage and modification. It sits directly in front of the data storage and exclusively knows how to access it.
2. The `view` layer handles the user-facing output of the application. It is responsible for rendering the HTML templates or structuring the data of a JSON response.
3. The `controller` layer handles the logic of the application. It is responsible for handling user input and calling the appropriate functions on the model and view layer.

## How code structure supports maintainability

Before diving deeper into the specific parts of the MVC Pattern, let's think about why we want to structure our code this way.

The most important reason to deploy the MVC Pattern is to make changes to the codebase manageable. The individual parts of the application can be maintained separately, and changes to one part do not affect the other parts, as long as the API between them remains the same. (API here basically means how to call the functions of each part and what they return.)

One example for such a change is the replacement of a JSON file with a database. Without the MVC Pattern, we would need to scan the entire codebase for where the JSON file logic is baked in. The chance of missing one case and breaking the codebase is high. With the MVC Pattern, we can simply swap the model for another with the same call signatures on their methods and the rest of the codebase is unchanged. Internally though, the data handling looks completely different.

```typescript
// post controller
async function renderPost(req: Request, res: Response): Promise<void> {
  const slug = req.params.slug;
  const post = await postModel.getBySlug(slug);

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("post.html", { post });
}
```

```typescript
// model for a json file storage
function getBySlug(slug: string): Post | null {
  const posts = fs.readFileSync(postsFilePath, "utf8");
  return posts.find((post) => post.slug === slug);
}
```

```typescript
// model for a database storage
function getBySlug(slug: string): Post | null {
  const db = getDB();
  const post = db.posts.find({ slug });

  if (!post) {
    return null;
  }

  return post;
}
```

In this example, the `getBySlug` function acts as the model API. For the route controller `renderPost` both implementations are indistinguishable, since the method is called the same way, they accept the same parameters and return the same type. Swapping the storge becomes as trivial as importing another postModel.

Building your code for the current situation of your app (not overengineering for the future) but at the same time structuring the code to make changes easier is the most important feature of a good code base.

## Resources

[Express routing guide](https://expressjs.com/en/guide/routing.html)
