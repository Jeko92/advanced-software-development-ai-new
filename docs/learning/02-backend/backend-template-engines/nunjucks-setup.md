{% raw %}

# Backend Template Engines - Nunjucks Setup

Working with `.njk` template files in a standard development setup reveals two small gaps right away. VS Code treats `.njk` files as plain text by default — no syntax highlighting for Nunjucks expressions or tags, which makes templates hard to read. Prettier, which handles formatting in most Node.js projects, has no built-in parser for Nunjucks templates either. Without one, it either skips `.njk` files or mangles the syntax when treating them as plain HTML.

With this in mind, the first step is to integrate Nunjucks into Express.

## Express configuration

Install Nunjucks as a dependency:

```bash
npm install nunjucks
npm install --save-dev @types/nunjucks
```

Then call `nunjucks.configure()` before your routes:

```typescript
import express from "express";
import nunjucks from "nunjucks";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
```

Two options are set here:

- `autoescape: true` — Nunjucks escapes HTML characters in variables before rendering them. This prevents user-provided strings from injecting HTML into the page.
- `express: app` — registers Nunjucks as the template engine for the Express app, so `res.render()` knows to use it.

With this in place, simply put your template files into the `views/` directory. A basic route then looks like this:

```typescript
app.get("/", (req, res) => {
  res.render("index.html", { title: "Home" });
});
```

`index.html` is the name of the template file, and `title` is a variable that will be passed to the template.

## VS Code syntax highlighting

The Better Nunjucks extension adds syntax highlighting for `.html` and `.njk` files in VS Code, including expressions (`{{ }}`), tags (`{% %}`), and comments (`{# #}`). Install it from the VS Code Marketplace.

## Prettier configuration

The `prettier-plugin-jinja-template` package adds a Nunjucks-aware parser to Prettier. Install it alongside Prettier:

```bash
npm install --save-dev prettier prettier-plugin-jinja-template
```

Then add a `.prettierrc` file to the project root:

```json
{
  "plugins": ["prettier-plugin-jinja-template"],
  "overrides": [
    {
      "files": ["*.html"],
      "options": {
        "parser": "jinja-template"
      }
    }
  ]
}
```

Three things are configured here:

- `"plugins"` registers the jinja-template plugin with Prettier
- `"overrides"` applies a custom setting to a specific file pattern
- `"parser": "jinja-template"` tells Prettier to use the Jinja/Nunjucks-aware parser for `.html` files

## Resources

[Nunjucks getting-started guide](https://mozilla.github.io/nunjucks/getting-started.html)

[Better Nunjucks extension](https://marketplace.visualstudio.com/items?itemName=ginfuru.better-nunjucks)
{% endraw %}
