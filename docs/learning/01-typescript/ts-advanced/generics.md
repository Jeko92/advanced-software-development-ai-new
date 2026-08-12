# TypeScript Advanced - Generics

Your BookShelf API has multiple endpoints. One returns a list of books, another returns a single author, and a third returns an error object. All three responses share the same wrapper structure: a `status` field, a `message` field, and a `data` field. The only thing that changes from endpoint to endpoint is the type of `data`.

You could write a separate interface for each response. `BookListResponse` would have `data: Book[]`, `AuthorResponse` would have `data: Author`, and `ErrorResponse` would have `data: ApiError`. That works, but you are duplicating the wrapper every time. When you later add a `timestamp` field to all responses, you have to update three interfaces instead of one.

Generics solve this by introducing a placeholder for a type. You write one `ApiResponse` interface with a type variable, usually called `T`, in place of the `data` type. When you use the interface, you fill in `T` with the actual type you need. The compiler then enforces that the `data` field matches what you specified. You write one definition and use it everywhere, with full type safety each time.

The concept applies beyond interfaces. Generic functions accept and return values whose types are linked through a type variable. Generic constraints let you restrict which types are allowed. And several TypeScript features you have already used, like `Array<T>` and `Promise<T>`, are generics under the hood. Understanding the mechanism here unlocks the utility types covered in an upcoming section, because utility types like `Partial<T>` and `Pick<T, K>` are themselves built-in generic types.

## Generic interfaces

Generics are useful for defining data structures where one part of the shape varies. The BookShelf API response wrapper is a natural example:

```typescript
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
```

`T` stands in for the `data` type. When you use the interface, you fill in `T`:

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
}

interface ApiError {
  code: string;
  detail: string;
}

const bookList: ApiResponse<Book[]> = {
  status: 200,
  message: "Books fetched",
  data: [
    { id: 1, title: "Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "Refactoring", author: "Martin Fowler" },
  ],
};

const error: ApiResponse<ApiError> = {
  status: 404,
  message: "Resource not found",
  data: { code: "NOT_FOUND", detail: "No book with that ID" },
};
```

The compiler ensures that the `data` field in `bookList` is a `Book[]` and the `data` field in `error` is an `ApiError`. One interface definition covers both cases and any future response type you add.

> **_✎ Note:_** You might have already used a generic interface without realizing it. For example, the `fetch` API returns a `Promise<Response>`, and async functions are often typed with something like `Promise<User[]>`. `Promise<T>` is a built-in generic interface where `T` is the type the promise resolves to.

## Built-in generic types

TypeScript ships several generic types that you use frequently, often without thinking about the generic mechanism behind them.

`Array<T>` is the generic form of the `T[]` shorthand. These two declarations are identical:

```typescript
const books: Array<Book> = [];
const alsoBooks: Book[] = [];
```

The shorthand is more common in everyday code, but `Array<T>` shows up in library type signatures and error messages.

`Promise<T>` represents an asynchronous operation that resolves to a value of type `T`. Every `async` function returns a `Promise`:

```typescript
async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("/api/books");
  const data = await response.json();
  return data as Book[];
}
```

`ReadonlyArray<T>` is an array where elements cannot be added, removed, or reassigned after creation:

```typescript
const featured: ReadonlyArray<Book> = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
];

featured.push(anotherBook);
// Compile error: Property 'push' does not exist on type 'readonly Book[]'
```

This is useful when you want to guarantee that a list stays unchanged after it is built.

## Generic functions

A regular function locks in its types at the time you write it. A generic function defers that decision to the caller.

Consider a function that returns the first element of an array. Without generics, you lose type information:

```typescript
function getFirst(items: unknown[]): unknown {
  return items[0];
}

const title = getFirst(["Clean Code", "Refactoring"]);
```

The return type is `unknown` even though you passed in an array of strings. To get the actual type back, you would have to assert it manually every time you call the function.

Adding a type variable `T` inside angle brackets after the function name solves this:

```typescript
function getFirst<T>(items: T[]): T {
  return items[0];
}
```

`T` captures the type of the array's elements. When you call the function, TypeScript infers `T` from the argument:

```typescript
const title = getFirst(["Clean Code", "Refactoring"]);
// title is string

const id = getFirst([1, 2, 3]);
// id is number
```

You can also set `T` explicitly when inference is ambiguous or when you want to be specific:

```typescript
const title = getFirst<string>(["Clean Code", "Refactoring"]);
```

The input type and the return type are linked through `T`. Whatever goes in determines what comes out, and the compiler enforces it.

## Generic constraints

By default, a type variable `T` can be anything: a string, a number, an object, or even `null`. Sometimes you need to narrow that. The `extends` keyword inside angle brackets sets a constraint on what types are allowed:

```typescript
function getEntityId<T extends { id: number | string }>(
  entity: T,
): number | string {
  return entity.id;
}
```

This function accepts any object that has an `id` property. Passing an object without `id` causes a compile error:

```typescript
getEntityId({ id: 1, title: "Clean Code" });
// works, the object has an id

getEntityId({ name: "no id here" });
// compile error: property 'id' is missing
```

## Multiple type parameters

Sometimes a function works with two independent types. A function that creates a key-value pair needs separate variables for the key and the value. We can define multiple generics, seperated by commas:

```typescript
function createEntry<K extends string, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const entry = createEntry("isbn", "978-0132350884");
```

The return type is a tuple `[K, V]`, using the tuple concept.

## Default type parameters

You can provide a fallback type for when the caller does not specify one:

```typescript
interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}
```

When you use `ApiResponse` without angle brackets, `T` defaults to `unknown`:

```typescript
const raw: ApiResponse = { status: 200, message: "OK", data: null };
// data is typed as unknown

const typed: ApiResponse<Book> = { status: 200, message: "OK", data: book };
// data is typed as Book
```

Defaults are most useful in generic interfaces where a common case exists and you want to avoid forcing every consumer to specify the type parameter.

## Resources

[Generics in the TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html){target:"\_blank"}

[`keyof` type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html){target:"\_blank"}
