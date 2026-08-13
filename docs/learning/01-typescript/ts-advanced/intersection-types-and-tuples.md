# TypeScript Advanced - Intersection Types and Tuples

In the fundamentals session, you defined types and interfaces one at a time. Each stood on its own. That works for simple data, but real applications reuse the same structural patterns across many entities. A book, an author, and a publisher might all need an `id` field and a pair of timestamps. Copying those properties into every interface means updating three places whenever the pattern changes. If you forget one, the types silently drift apart.

Intersection types and tuples give you two ways to compose types from smaller pieces. One for objects, one for positional data.

## Intersection types

Intersection types solve this by letting you combine multiple types into a single one. Instead of repeating `id`, `createdAt`, and `updatedAt` in every interface, you define them once and merge them with the `&` operator. The result is a type that has all the properties of every type in the combination.

The `&` operator combines two or more types into one. The resulting type must satisfy all of the combined types at the same time. Think of it as "this AND that."

Start with two small types that describe common patterns across your BookShelf entities:

```typescript
type HasId = {
  id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};
```

Now compose a `Book` type by intersecting these with book-specific fields:

```typescript
type BookFields = {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
};

type Book = HasId & Timestamped & BookFields;
```

A value of type `Book` must include every property from all three types. Missing any one of them causes a compile error:

```typescript
const book: Book = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  isAvailable: true,
};
```

The benefit shows up when you add more entities. An `Author` type can reuse `HasId` and `Timestamped` without duplicating their properties:

```typescript
type AuthorFields = {
  name: string;
  bio: string;
};

type Author = HasId & Timestamped & AuthorFields;
```

If you later add a `deletedAt` field to `Timestamped`, both `Book` and `Author` pick it up automatically.

> **_✎ Note:_** Intersection types are the standard way to extend a type alias. Interfaces use the `extends` keyword for the same purpose, but type aliases cannot use `extends`. Use `&` when you are working with `type` definitions.

## Intersection types vs union types

Intersection types (`&`) and union types (`|`) look similar but mean opposite things. An intersection requires a value to satisfy all combined types. A union allows a value to satisfy any one of them.

```typescript
type StringOrNumber = string | number;
type HasNameAndAge = { name: string } & { age: number };
```

A variable of type `StringOrNumber` can be a string or a number, but not both at the same time. A variable of type `HasNameAndAge` must have both a `name` and an `age`.

Union types can be used in many different places, for example also inside object types:

```typescript
type HasId = {
  id: number | string;
};
```

> **_⚠ Watch out:_** Intersecting two incompatible primitive types produces the `never` type. `string & number` resolves to `never` because no value can be both a string and a number at the same time.

## Tuple types

Tuples address a different kind of composition compared to regular arrays. While a regular typed array (like `string[]`) can hold any number of elements of the same type, it says nothing about the array's length or what each position signifies. Tuples fill this gap by defining a fixed structure: an array with a known length where each position has its own specific type.

For example, an ISBN has a fixed structure where order matters. It can be broken into three distinct components: a registration group (number), a publisher code (string), and a title identifier (string). A tuple lets you express exactly this kind of precise, position-based data.

```typescript
type IsbnParts = [number, string, string];

const cleanCodeIsbn: IsbnParts = [978, "0132", "350884"];
```

TypeScript enforces both the length and the type at each position. Adding a fourth element or swapping a number for a string causes a compile error.

Destructuring works with tuples the same way it works with arrays, but each variable gets the type of its position:

```typescript
const [group, publisher, titleCode] = cleanCodeIsbn;
```

`group` is typed as `number`, while `publisher` and `titleCode` are both `string`. The compiler knows this from the tuple definition, not from the values.

Tuples are most useful for small, positional data where creating a named object would be overkill. Function return values are a common case. A function that returns both a value and an error status can use a tuple instead of defining a separate interface:

```typescript
type BookResult = [Book | null, Error | null];

function findBook(id: number): BookResult {
  // returns [book, null] on success or [null, "Not found"] on failure
}
```

For larger structures with more than three or four fields, prefer objects with named properties. The positional nature of tuples becomes confusing when there are many elements.

> **_:bulb: Good to know:_** You have already encountered tuple-like structures without knowing it. When you destructure the return value of `useState` in React (`const [count, setCount] = useState(0)`), the return type is a tuple: `[number, Dispatch<SetStateAction<number>>]`.

## The `keyof` operator

The `keyof` operator takes an object type and extracts all of its property keys, creating a union of string literals. This is useful when you want to restrict a value so that it must be a valid key of a specific object type.

```typescript
type GenreDescriptions = {
  horror: string;
  romance: string;
  scienceFiction: string;
};

const descriptions: GenreDescriptions = {
  horror: "Scary and thrilling stories",
  romance: "Books about love and relationships",
  scienceFiction: "Futuristic and space adventures",
};

function getGenreDescription(genre: keyof GenreDescriptions): string {
  return descriptions[genre];
}

getGenreDescription("horror");
// returns "Scary and thrilling stories"

getGenreDescription("fantasy");
// compile error: Argument of type '"fantasy"' is not assignable to parameter of type '"horror" | "romance" | "scienceFiction"'.
```

`keyof GenreDescriptions` produces the union `"horror" | "romance" | "scienceFiction"`. By typing the parameter as `keyof GenreDescriptions`, the function only accepts keys that actually exist on the type. This prevents typos and keeps the allowed parameters automatically in sync if the `GenreDescriptions` type ever changes.

## Resources

[Intersection types in the TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types){target:"\_blank"}

[Tuple types in the TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types){target:"\_blank"}
