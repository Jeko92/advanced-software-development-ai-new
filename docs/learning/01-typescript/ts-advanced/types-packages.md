# TypeScript Advanced - Type Packages

The next practical challenge is integrating external code safely. Many TypeScript projects hit friction here: a package installs correctly, runtime code works, but the compiler reports missing declarations or falls back to `any`. At that point, you lose many of the reasons you adopted TypeScript in the first place. Type packages solve that gap by describing library APIs at compile time.

In the TypeScript ecosystem, most community type declarations are published under the `@types` namespace and maintained through DefinitelyTyped. These packages do not include runtime JavaScript. They are metadata for already existing JavaScript libraries. The same model applies to Node.js projects: Node runtime APIs like `process`, `fs`, and `path` are also typed through `@types/node`. Once you understand this runtime-vs-type-package split, dependency issues become much easier to debug and external integrations become consistent.

## What `@types` packages provide

`@types` packages contain declaration files (`.d.ts`) that describe API shapes.

```bash
npm install lodash
npm install --save-dev @types/lodash
```

- `lodash` is the runtime library used during execution.
- `@types/lodash` provides compile-time type information.
- The type package does not add runtime JavaScript code.

## Knowing when extra type packages are needed

Use this rule of thumb:

- install the main package first and let TypeScript inspect it.
- if the package already ships its own declarations, no extra `@types/*` package is required.
- if declarations are missing, install the matching `@types/*` package as a dev dependency.

This keeps dependencies minimal and avoids stale or unnecessary declaration packages.

## Using typed third-party libraries

With type declarations installed, TypeScript can validate library usage.

```typescript
import * as _ from "lodash";

const grouped = _.groupBy(["cat", "dog", "crow"], "length");
```

- `groupBy` parameters and return types are now known to the compiler.
- IDE autocomplete becomes reliable for available functions and signatures.
- Incorrect argument types are caught before runtime.

## Typing Node.js runtime APIs with `@types/node`

Node projects should install Node runtime declarations explicitly:

```bash
npm install --save-dev @types/node
```

```typescript
import fs from "node:fs";
import path from "node:path";

const appEnv: string | undefined = process.env.APP_ENV;
const filePath = path.join("data", "volunteers.json");
const raw = fs.readFileSync(filePath, "utf8");
```

- `process.env` and other globals gain accurate type information.
- built-in modules like `fs` and `path` expose typed signatures and overloads.
- common backend mistakes are caught before execution.

## Scoping type environments in `tsconfig.json`

In mixed environments, scope available global types explicitly:

```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

- `types` controls which ambient declaration packages are loaded.
- explicit scoping reduces accidental global type leakage.
- this is useful when browser and Node code coexist.

## Resolving missing declaration errors

When TypeScript reports missing declaration files:

- check whether the library ships built-in types before installing `@types/*`.
- if not, install the matching `@types` package as a dev dependency.
- if versions drift, align runtime and type package majors where possible.
- avoid defaulting to `any`; treat missing declarations as a configuration issue.

## Resources

[TypeScript handbook - Type declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
[npm - @types/node](https://www.npmjs.com/package/@types/node)
[DefinitelyTyped repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
