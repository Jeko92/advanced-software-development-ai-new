{% raw %}

# Backend Template Engines - Nunjucks Layouts

Most pages in a web application share a common structure. The same header, navigation, and footer appear on every page; only the main content changes. Copying that structure into each template file is fragile: a nav update means editing every file, and a missing file can silently break the layout.

Nunjucks handles this through template inheritance. You write the shared structure once in a base template, mark the areas that change as named blocks, and create child templates that extend the base and fill in those blocks. When Nunjucks renders a child template, it loads the base, replaces each block with the child's version, and returns the combined result.

## Base templates

A base template contains the full page structure. Named blocks (written as `{% block blockname %}...{% endblock %}`) act as slots for child templates to fill. If a child does not override a block, the base template's default content is used instead.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{% block title %}Event Hub{% endblock %}</title>
    <link rel="stylesheet" href="/static/style.css" />
  </head>
  <body>
    <header>
      <h1>Event Hub</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>

    <main>{% block content %}{% endblock %}</main>

    <footer>
      <p>Event Hub 2025</p>
    </footer>
  </body>
</html>
```

Two blocks are defined here:

- `title` has a default value of "Event Hub". Child templates can override it to set a page-specific title.
- `content` is empty. Every child template is expected to provide its own content for the main area.

## Child templates

A child template starts with `{% extends "base.html" %}`. This tells Nunjucks to use the base template's structure and to substitute the blocks the child defines. Everything outside a `{% block %}` tag in a child template is ignored.

```html
{% extends "base.html" %} {% block title %}Upcoming Events - Event Hub{%
endblock %} {% block content %}
<h2>Upcoming Events</h2>
<p>Browse our upcoming events below.</p>
{% endblock %}
```

When Nunjucks renders this template:

1. It loads `base.html` because of the `extends` tag.
2. It finds the `title` block in the child and replaces the base's default with "Upcoming Events - Event Hub".
3. It finds the `content` block and inserts the `<h2>` and `<p>` into the `<main>` element.
4. Any block not defined in the child, such as the nav or footer, is taken from the base as-is.

The final HTML contains the full base structure with the child's block content merged in.

## Resources

[Nunjucks template inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance)
{% endraw %}
