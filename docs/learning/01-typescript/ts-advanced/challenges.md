# TypeScript Advanced - Challenges

## Build the BookShelf type layer

You are building the type layer for a library management API. Your goal is to define a complete set of types in a declaration file, then use them in a service module.

**Base types**

Create a file `types/book.d.ts` with the following:

- A type alias `EntityId` that accepts either a `number` or a `string`
- A type `Timestamped` with `createdAt: Date` and `updatedAt: Date`
- A type `HasId` with `id: EntityId`
- A `Book` type that combines `HasId`, `Timestamped`, and book-specific fields (`title`, `author`, `isbn`, `isAvailable`) using intersection types
- A tuple type `IsbnParts` representing the three components of an ISBN: group (number), publisher (string), and title identifier (string)

**Derived payload types**

In the same file, define these types using utility types. Do not repeat properties manually:

- `BookCreatePayload`: all `Book` properties except `id`, `createdAt`, and `updatedAt`
- `BookUpdatePayload`: same as `BookCreatePayload`, but every field is optional
- `BookPreview`: only `id`, `title`, and `author` from `Book`

**Generic response wrapper**

Define a generic `ApiResponse<T>` interface with `status: number`, `message: string`, and `data: T`.

**Service module**

Create a file `src/bookService.ts` that imports the types from your declaration file using `import type`. Write the following function signatures (stub implementations are fine):

- `fetchBooks(): Promise<ApiResponse<BookPreview[]>>`
- `fetchBook(id: EntityId): Promise<ApiResponse<Book>>`
- `createBook(payload: BookCreatePayload): Promise<ApiResponse<Book>>`
- `updateBook(id: EntityId, changes: BookUpdatePayload): Promise<ApiResponse<Book>>`
- `parseIsbn(isbn: string): IsbnParts`

Verify that the compiler accepts your code by running `tsc --noEmit`.

## Generic collection utilities

Write three generic utility functions that work with any object type. Test each one using an array of `Book` objects.

- `groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]>` takes an array and a property name, then returns an object where each key is a distinct value of that property and each value is an array of matching items. Example: grouping books by author.

- `pluck<T, K extends keyof T>(items: T[], key: K): T[K][]` takes an array and a property name, then returns an array containing just that property's value from each item. Example: extracting all book titles.

- `merge<T>(base: T, updates: Partial<T>): T` takes a base object and a partial update, then returns a new object with the updates applied. Example: applying a `BookUpdatePayload` to a `Book`.

Each function must be generic, fully annotated, and work with any object type, not just `Book`.

## Stretch goal: type-safe event emitter

Create a generic `EventEmitter<Events>` class where `Events` is a `Record` mapping event names to their payload types:

```typescript
type BookEvents = {
  bookAdded: Book;
  bookRemoved: { id: EntityId };
  searchPerformed: { query: string; resultCount: number };
};

const emitter = new EventEmitter<BookEvents>();
```

Implement two methods:

- `on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void`
- `emit<K extends keyof Events>(event: K, payload: Events[K]): void`

The compiler should enforce that `emit("bookAdded", payload)` only accepts a `Book` as the payload, and that `on("searchPerformed", handler)` passes `{ query: string; resultCount: number }` to the handler function.
