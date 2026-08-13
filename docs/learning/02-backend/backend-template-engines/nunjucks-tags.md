{% raw %}

# Backend Template Engines - Nunjucks Tags

Most templates need to render dynamic content that changes based on the underlying data. Common scenarios for an event management platform example include:

- Displaying a chronological list of upcoming events
- Showing a "Sold Out" badge if no tickets are available
- Hiding an "Edit Event" button from regular users  
  To build these features, Nunjucks provides control flow tags using the `{% %}` syntax. Unlike the `{{ }}` brackets that simply output a value, `{% %}` blocks execute actual logic. The two most important tags you will use are `for` (loops) and `if` (conditions).

## For loops

The `{% for %}` tag iterates over an array and renders its body once per item. The loop variable takes on each value in sequence.

The following server code passes an array of events to the template:

```javascript
res.render("events.html", {
  events: [
    {
      name: "React Conf",
      date: "June 10, 2025",
      location: "Berlin",
      soldOut: false,
    },
    {
      name: "Vue.js Summit",
      date: "July 2, 2025",
      location: "Amsterdam",
      soldOut: true,
    },
  ],
});
```

The template iterates over the array:

```html
{% for event in events %}
<div class="event">
  <h3>{{ event.name }}</h3>
  <p>{{ event.date }} — {{ event.location }}</p>
</div>
{% endfor %}
```

Nunjucks also supports a `{% else %}` clause on `for` loops. It renders when the array is empty:

```html
{% for event in events %}
<p>{{ event.name }}</p>
{% else %}
<p>No upcoming events.</p>
{% endfor %}
```

To iterate over the properties of an object rather than an array, use the `for key, value in object` form:

```html
{% for key, value in event %}
<li>{{ key }}: {{ value }}</li>
{% endfor %}
```

## Loop variables

Inside a `for` loop, Nunjucks exposes a `loop` object with information about the current iteration:

- `loop.index` — current position, starting from 1
- `loop.index0` — current position, starting from 0
- `loop.first` — `true` on the first iteration
- `loop.last` — `true` on the last iteration
- `loop.length` — total number of items in the list

```html
{% for event in events %}
<div class="event">
  {% if loop.first %}
  <span class="badge">Featured</span>
  {% endif %}
  <h3>{{ loop.index }}. {{ event.name }}</h3>
  <p>{{ event.date }} — {{ event.location }}</p>
</div>
{% endfor %}
```

The first event gets a "Featured" badge. Each event is numbered using `loop.index`.

## Conditional rendering

The `{% if %}` tag renders a section only when a condition is true:

```html
{% if event.soldOut %}
<span class="badge">Sold out</span>
{% endif %}
```

For two branches, add `{% else %}`:

```html
{% if event.soldOut %}
<span class="badge badge-sold-out">Sold out</span>
{% else %}
<span class="badge badge-available">Tickets available</span>
{% endif %}
```

For more than two branches, use `{% elif %}`:

```html
{% if event.spotsLeft == 0 %}
<span>Sold out</span>
{% elif event.spotsLeft < 10 %}
<span>Almost full — {{ event.spotsLeft }} spots left</span>
{% else %}
<span>Tickets available</span>
{% endif %}
```

The condition can be any expression that evaluates to truthy or falsy: a variable, a comparison operator (`==`, `!=`, `<`, `>`), or a boolean operator (`and`, `or`, `not`).

## Resources

[Nunjucks templating — for](https://mozilla.github.io/nunjucks/templating.html#for)

[Nunjucks templating — if](https://mozilla.github.io/nunjucks/templating.html#if)
{% endraw %}
