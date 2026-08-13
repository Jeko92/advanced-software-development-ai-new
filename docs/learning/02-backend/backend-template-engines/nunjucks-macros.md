{% raw %}

# Backend Template Engines - Nunjucks Macros

A template that renders an events list produces each event with the same HTML: a card with a title, a date, a location, and maybe a sold-out badge. That HTML exists once in the list template, and changes there affect every card. Now consider the same card appearing on a homepage, a speaker detail page, and the main events listing. The markup is in three places, and a design change touches all three.

The concept of `macros` provides an elegant solution. Basically, a `macro` is a named, reusable block of template code that accepts parameters, kind of like a function in JavaScript. You define it once and call it wherever that HTML is needed. The macro owns the markup; the caller provides the data.

## Defining a macro

The `{% macro %}` tag defines a reusable template function. It takes a name and a list of parameters, and its body contains the HTML to render.

```html
{% macro eventCard(name, date, location, soldOut=false) %}
<div class="event-card">
  <h3>{{ name }}</h3>
  <p>{{ date }} — {{ location }}</p>
  {% if soldOut %}
  <span class="badge">Sold out</span>
  {% endif %}
</div>
{% endmacro %}
```

Three things to note:

- `name`, `date`, and `location` are required; they must be provided on every call
- `soldOut=false` is optional and falls back to `false` when omitted
- The macro body is standard Nunjucks — any variable, tag, or expression works inside it

Calling the macro looks like calling a function:

```html
{{ eventCard("React Conf", "June 10, 2025", "Berlin") }} {{ eventCard("Vue.js
Summit", "July 2, 2025", "Amsterdam", true) }}
```

The first call omits `soldOut`, so it uses the default `false`. The second passes `true`, which triggers the sold-out badge.

## Importing macros

Once a project has more than a few macros, they belong in their own files rather than inline in every template. The `{% import %}` tag loads a macro file and makes its macros available under a namespace.

Given a file `macros/events.html` containing the `eventCard` macro above:

```html
{% import "macros/events.html" as eventMacros %} {{ eventMacros.eventCard("React
Conf", "June 10, 2025", "Berlin") }} {{ eventMacros.eventCard("Vue.js Summit",
"July 2, 2025", "Amsterdam", true) }}
```

`as eventMacros` assigns a namespace to the imported file. All macros from that file are accessible as `eventMacros.macroName`. Multiple macro files can be imported in the same template under different namespaces.

## Resources

[Nunjucks templating — macro](https://mozilla.github.io/nunjucks/templating.html#macro)
{% endraw %}
