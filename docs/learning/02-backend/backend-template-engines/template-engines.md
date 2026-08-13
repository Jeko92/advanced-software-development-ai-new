{% raw %}

# Backend Template Engines - Template Engines

When building static websites by just serving different HTML pages, you start to repeat yourself very quickly. Every page needs the same layout, identical HTML snippets are copied across files, and introducing conditional formatting for small elements becomes an instant headache. Template engines are a lightweight solution to this problem.

Template engines move the HTML into separate files known as templates, as the naming suggests. A template looks like HTML with special placeholders for the values the server provides. At render time, the engine fills in these placeholders and returns a finished string. The JavaScript code (or, in our case TypeScript code) handles data; the template file handles presentation. With that split in place, layout changes stay in template files where they belong, and server code no longer needs to know anything about what a page looks like.

There exists an entire ecosystem of template engines, but the fundamental ideas and concepts are very similar. We will use nunjucks throughout the session to illustrate these concepts.

## Template syntax

Every template engine uses delimiters to tell the engine which parts of the file are instructions and which are plain HTML. Nunjucks uses two:

- `{{ expression }}` - outputs the value of a variable or expression. `{{ title }}` outputs the value of the variable title; `{{ price * 1.2 }}` outputs the result of the calculation.
- `{% tag %}` - runs a control-flow statement such as `for`, `if`, or `block`. These tags do not produce output directly; they control which parts of the template render and how many times.

```html
<h1>{{ title }}</h1>
<ul>
  {% for item in items %}
  <li>{{ item }}</li>
  {% endfor %}
</ul>
```

`{{ title }}` is replaced with the value of `title`. The `{% for %}` block renders one `<li>` per item in the `items` array.

## Components in template engines

Another common concept is the idea of a component. A component is a reusable block of HTML that can be used in multiple places. Template engines make it trivial to create these reusable pieces of code. In Nunjucks, components are called `macros`.

```html
{% macro Card(title, content) %}
<div class="card">
  <h2>{{ title }}</h2>
  <p>{{ content }}</p>
</div>
{% endmacro %}
```

## Template engines across languages

Template engines exist for every major server-side language. The syntax differs, but the model is the same: a template file with placeholders the engine replaces at runtime.

| Engine     | Language             | Notes                                      |
| ---------- | -------------------- | ------------------------------------------ |
| Nunjucks   | JavaScript (Node.js) | Modeled on Jinja2; used in this session    |
| Jinja2     | Python               | Standard in Flask and Django               |
| EJS        | JavaScript           | Embeds JavaScript directly in HTML         |
| Pug        | JavaScript           | Indentation-based; no closing tags         |
| Twig       | PHP                  | Close to Jinja2 in syntax                  |
| Thymeleaf  | Java                 | Used with Spring; templates are valid HTML |
| Handlebars | JavaScript           | Limits logic in templates by design        |

## Resources

[Nunjucks documentation](https://mozilla.github.io/nunjucks/)
{% endraw %}
