# TypeScript Advanced - Declaration Files

Your BookShelf project now has `Book`, `BookCreatePayload`, `BookUpdatePayload`, `BookPreview`, `ApiResponse<T>`, and `AppState`. In a small project, these types live inside the same files as the functions that use them. That works when one or two files reference a type. But as a project grows, the same types get imported by route handlers, service functions, validation logic, and tests. If `Book` is defined inside `bookService.ts`, every file that needs it depends on a service module even though it only needs the type definition.

Declaration files solve this by giving types a dedicated home. A file with the `.d.ts` extension contains only type information: interfaces, type aliases, and type exports. No runtime code, no function bodies, no variable assignments. The TypeScript compiler uses these files for type checking and editor autocompletion, then strips them entirely during compilation. They add zero bytes to your production JavaScript.

Declaration files serve two purposes. Inside your own project, they let you separate type contracts from the code that implements them. A `types/` directory with `.d.ts` files becomes a single source of truth for your data model. Outside your project, declaration files are how TypeScript understands JavaScript libraries that were not written in TypeScript. When you install `@types/node`, you are installing `.d.ts` files that describe what `process`, `fs`, and every other Node.js API looks like. In the fundamentals session, you used these packages without looking at what was inside them. This handout opens that box.

## Declaration Files

A `.d.ts` file contains only type declarations. It cannot contain executable code: no function implementations, no variable assignments, no `console.log` statements.

The TypeScript compiler reads `.d.ts` files during type checking and uses them to verify that your code matches the declared types. During compilation, all type information is erased. The `.d.ts` files themselves are never included in the JavaScript output.

Declaration files have no runtime cost. They exist purely to help the compiler and your editor understand what shape your data has.

## Declaring types for your own project

For internal project types, create a `types/` directory and place your type definitions in `.d.ts` files. Export them the same way you would in a regular `.ts` file:

```typescript
// types/book.d.ts

export type EntityId = number | string;

export interface Book {
  id: EntityId;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ... and all other Types
```

This file contains every type the BookShelf project needs in one place. The `Book` interface is defined once, and the payload types are derived from it using the utility types from the previous handout.

Import the types into your source files using `import type`:

```typescript
// src/bookService.ts
import type { Book, BookCreatePayload, ApiResponse } from "../types/book";

async function createBook(
  payload: BookCreatePayload,
): Promise<ApiResponse<Book>> {
  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return (await response.json()) as ApiResponse<Book>;
}
```

The `import type` keyword tells TypeScript and your bundler that this import is type-only. The compiled JavaScript will not contain it. There is no runtime dependency on the declaration file.

## Declaration files for external libraries

Not every JavaScript library ships with built-in type definitions. Libraries written before TypeScript existed, or those maintained in plain JavaScript, have no `.d.ts` files of their own. When you import such a library, the TypeScript compiler has no information about how its functions should be called or what they return.

This is where the `declare` keyword comes in. It tells the compiler: "this thing exists at runtime, but I am not defining it here. Trust me on its shape." Here is a simplified version of what `@types/node` declares for the `process` global:

```typescript
// Inside @types/node (simplified)

declare var process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
  cwd(): string;
};
```

The `declare` keyword means "this variable exists in the runtime environment, and here is its type." There is no assignment, no function body. The compiler uses this declaration to type-check any code that references `process.env` or `process.exit()`.

You do not write these declarations by hand for popular libraries. The DefinitelyTyped community project maintains type definitions for thousands of JavaScript packages, published under the `@types/` scope on npm. In the fundamentals session, you installed `@types/node` to get type checking for Node.js APIs. That package contains `.d.ts` files describing every module and global in Node.js.

When TypeScript encounters an import like `import fs from "fs"`, it looks for a matching `.d.ts` file in `@types/node`. If it finds one, it uses those type declarations for compile-time checking. The actual `fs` module comes from the Node.js runtime at execution time. The declaration file only provides the type layer on top.

> **_⚠ Watch out:_** Internal and external declaration files use different patterns. For your own project types, use regular `export` statements. The `declare` keyword is only needed for describing code that exists at runtime but was not written in TypeScript. Mixing these up leads to confusing compiler errors.

## Resources

[Declaration files in the TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html){target:"\_blank"}

[DefinitelyTyped repository](https://github.com/DefinitelyTyped/DefinitelyTyped){target:"\_blank"}
