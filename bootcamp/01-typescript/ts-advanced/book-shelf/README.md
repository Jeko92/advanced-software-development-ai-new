# BookShelf mini-project

Solves the `01-typescript/ts-advanced` [challenges](../../../../docs/learning/01-typescript/ts-advanced/challenges.md): a small library API type layer, a faked service module, generic collection utilities, and a type-safe event emitter.

## Structure

```
src/
├── types/book.d.ts     Book type layer + derived payload types (Partial/Omit/Pick)
├── data/books.json      book records the service module reads from
├── bookService.ts        fetchBooks/fetchBook/createBook/updateBook/parseIsbn
├── collectionUtils.ts    generic groupBy/pluck/merge
├── eventEmitter.ts       generic EventEmitter<Events>
└── index.ts              runnable walkthrough exercising all of the above
```

`bookService.ts` has no real backend — every call fakes the network with `setTimeout`, the same approach used in `code-along/src/index.ts`.

## Run it

```bash
pnpm dev        # tsx --watch src/index.ts
pnpm typecheck
pnpm lint
pnpm build && pnpm start
```