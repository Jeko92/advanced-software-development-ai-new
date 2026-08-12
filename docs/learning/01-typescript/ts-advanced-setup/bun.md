# TypeScript Advanced Setup — Bun

[Bun](https://bun.sh/) is an all-in-one JavaScript and TypeScript toolkit. Where the traditional Node.js ecosystem splits the job across many separate tools — Node.js to run code, npm to manage packages, `tsc` or `tsx` to handle TypeScript, a bundler like Webpack or Vite for frontend applications, and a test framework like Jest or Vitest — Bun combines many of these roles into a single executable.

Bun can run TypeScript directly without a separate compilation step, which makes it a modern alternative to setups based on `tsc` + `nodemon` or `tsx`.

---

## What is Bun?

Bun wears several hats at once. The `bun` command can act as a:

### Runtime

Bun can execute both JavaScript and TypeScript.

Bun is built on Apple's **JavaScriptCore** engine, the JavaScript engine used by Safari, rather than Node.js's **V8** engine.

Bun also implements a large portion of the Node.js API, meaning that much existing Node.js code can run on Bun with little or no modification.

Unlike Node.js, Bun can execute `.ts` and `.tsx` files directly:

```bash
bun index.ts
```

There is no need to compile the TypeScript code into a `dist` directory first.

---

### Package Manager

Bun includes its own package manager.

Instead of:

```bash
npm install
npm install express
npm uninstall express
```

you can use:

```bash
bun install
bun add express
bun remove express
```

Bun uses the same `package.json` format and installs packages from the npm registry.

Its package manager is designed to be fast through techniques such as caching and parallelized installation.

---

### Bundler

Bun also includes a built-in bundler:

```bash
bun build
```

This can bundle JavaScript and TypeScript applications for environments such as the browser.

It covers a role traditionally handled by tools such as:

* Webpack
* Rollup
* Vite

This is particularly useful for frontend TypeScript because `tsx` itself is primarily intended for running TypeScript in server-side environments.

---

### Test Runner

Bun includes its own test runner:

```bash
bun test
```

It provides a Jest-compatible testing API, meaning that many familiar testing patterns can be used without installing Jest or Vitest separately.

---

### Script Runner

Bun can execute scripts defined in `package.json`:

```bash
bun run dev
```

This is equivalent to:

```bash
npm run dev
```

in a traditional Node.js project.

---

## Why use Bun?

The main practical advantage is **fewer moving parts**.

A traditional Node.js project might require:

```text
Node.js
├── npm
├── TypeScript / tsc
├── tsx
├── nodemon
├── Webpack / Vite
└── Jest / Vitest
```

A Bun-based project can consolidate many of these responsibilities:

```text
Bun
├── Runtime
├── TypeScript execution
├── Package manager
├── Bundler
├── Test runner
└── Script runner
```

This can make small and medium-sized projects simpler to configure and easier to get started with.

---

# Bun vs. the Traditional Node.js Toolchain

| Feature           | `tsc` + `nodemon`       | `tsx watch`          | Bun                      |
| ----------------- | ----------------------- | -------------------- | ------------------------ |
| Runtime           | Node.js                 | Node.js              | Bun                      |
| Runs TypeScript   | Compile to `dist` first | Directly             | Directly                 |
| Watch mode        | `nodemon`               | `tsx watch`          | `--watch`                |
| Package manager   | npm / pnpm / yarn       | npm / pnpm / yarn    | Bun                      |
| Frontend bundling | Separate bundler        | Not its main purpose | `bun build`              |
| Testing           | Jest / Vitest etc.      | Jest / Vitest etc.   | `bun test`               |
| Extra tooling     | Several packages        | `tsx` + other tools  | Often fewer dependencies |

> **Important:** Bun can replace a lot of tooling, but it does not mean that every Node.js project should automatically switch to Bun. Compatibility with your dependencies, deployment environment, framework, and team workflow should still be considered.

---

# Installing Bun

## macOS and Linux

Install Bun with:

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal and verify that Bun is available:

```bash
bun --version
```

---

## macOS with Homebrew

If you already use Homebrew:

```bash
brew install oven-sh/bun/bun
```

Then verify the installation:

```bash
bun --version
```

---

## Windows

Open PowerShell and run:

```powershell
powershell -c "irm bun.sh/bun/install.ps1 | iex"
```

Then restart your terminal and check:

```bash
bun --version
```

---

## Updating Bun

To update Bun to the latest version:

```bash
bun upgrade
```

---

# Initializing a New Bun Project

Bun provides a project initializer similar to `npm init`:

```bash
bun init
```

Run this command inside an empty directory.

Bun will create the basic project structure, including files such as:

```text
my-project/
├── package.json
├── tsconfig.json
├── index.ts
└── .gitignore
```

The generated project already has TypeScript support because Bun understands TypeScript natively.

The generated `tsconfig.json` is primarily useful for **type checking and editor support** rather than configuring a separate TypeScript compilation step.

---

# Installing Dependencies

Install regular dependencies with:

```bash
bun add express
```

Install development dependencies with:

```bash
bun add --dev typescript
```

Install everything declared in `package.json` with:

```bash
bun install
```

Remove a dependency with:

```bash
bun remove express
```

---

# Running TypeScript with Bun

One of Bun's most useful features is that it can execute TypeScript directly.

For example:

```bash
bun index.ts
```

You can also execute a file through `bun run`:

```bash
bun run index.ts
```

If your `package.json` contains:

```json
{
  "scripts": {
    "dev": "bun --watch index.ts"
  }
}
```

you can run it with:

```bash
bun run dev
```

---

# Watch Mode

In a traditional Node.js setup, you might use:

```bash
nodemon
```

or:

```bash
tsx watch
```

Bun has watch mode built in:

```bash
bun --watch index.ts
```

A typical `package.json` could therefore contain:

```json
{
  "scripts": {
    "dev": "bun --watch index.ts"
  }
}
```

Then:

```bash
bun run dev
```

Bun watches the entry file and the files imported by it. When one of those files changes, Bun automatically restarts the process.

### Important limitation

Bun's watcher follows the **import graph**.

For example, changes to a TypeScript module such as:

```ts
import { users } from "./users";
```

will be detected.

However, files that are accessed dynamically at runtime but are not part of the import graph may not trigger a restart.

For example:

```ts
const config = await Bun.file("./config.json").json();
```

A change to `config.json` may not automatically restart the application.

The same applies to files such as `.env` files.

If you need more sophisticated file-watching behavior, you can still use a tool such as `nodemon` and configure it to execute Bun.

---

# Serving HTML with Bun

Bun can also work with browser-based TypeScript applications.

For simple projects, Bun can serve an HTML file and process the assets referenced by it.

For example:

```bash
bun index.html
```

Consider this HTML file:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Bun App</title>
  </head>

  <body>
    <h1>Hello Bun</h1>

    <script type="module" src="./index.ts"></script>
  </body>
</html>
```

The browser references the TypeScript file directly:

```html
<script type="module" src="./index.ts"></script>
```

Bun can transpile and bundle the TypeScript code for the browser.

This means you do not necessarily need to manually create:

```text
index.ts
    ↓
tsc
    ↓
index.js
```

Instead, Bun can handle the development-time transformation for you.

This makes Bun useful for simple full-stack or frontend experiments where you want to avoid introducing a larger build toolchain.

---

# A Simple Bun Project

A minimal project could look like this:

```text
hello-bun/
├── package.json
├── tsconfig.json
├── index.html
└── index.ts
```

### `index.ts`

```ts
const message: string = "Hello from TypeScript + Bun!";

console.log(message);
```

### `package.json`

```json
{
  "name": "hello-bun",
  "type": "module",
  "scripts": {
    "dev": "bun --watch index.ts"
  }
}
```

Run the application with:

```bash
bun run dev
```

---

# Bun in a Full-Stack Development Workflow

Bun can potentially simplify a development stack considerably.

A traditional setup might look like:

```text
TypeScript
    │
    ├── tsc
    │
    ├── tsx
    │
    ├── nodemon
    │
    ├── Vite / Webpack
    │
    └── Vitest / Jest
```

A Bun-based setup can look more like:

```text
Bun
 │
 ├── TypeScript runtime
 ├── Watch mode
 ├── Package management
 ├── Bundling
 ├── Testing
 └── Script execution
```

This does **not** mean that Bun makes frameworks such as Next.js, NestJS, React, or other tooling unnecessary. Instead, Bun can provide the underlying runtime and tooling layer on which those applications can run.

---

# When Bun Makes Sense

Bun is particularly interesting for:

* Learning TypeScript
* Small TypeScript projects
* Backend APIs
* CLI applications
* Full-stack prototypes
* Frontend experiments
* Educational projects
* Projects where minimizing configuration is valuable
* Applications where fast installation and startup times are useful

For larger production applications, you should still evaluate:

* Node.js compatibility
* Third-party package compatibility
* Framework support
* Deployment platform support
* Team familiarity
* Testing requirements
* Production observability
* Long-term maintenance

---

# Bun vs. `tsx`

`tsx` is primarily a tool for running TypeScript with Node.js.

For example:

```bash
tsx src/index.ts
```

With Bun:

```bash
bun src/index.ts
```

For watch mode:

```bash
tsx watch src/index.ts
```

versus:

```bash
bun --watch src/index.ts
```

The important difference is that Bun is much broader in scope.

`tsx` solves the problem of **running TypeScript with Node.js**.

Bun attempts to provide a complete JavaScript/TypeScript development toolkit:

```text
Runtime
Package manager
Bundler
Test runner
Watch mode
Script runner
```

---

# Bun vs. `tsc`

`tsc` is the TypeScript compiler provided by the TypeScript project.

A traditional Node.js application might use:

```bash
tsc
```

to transform:

```text
src/
├── app.ts
└── server.ts
```

into:

```text
dist/
├── app.js
└── server.js
```

Bun can execute the original TypeScript files directly:

```bash
bun src/server.ts
```

This is particularly convenient during development.

However, **type checking and running TypeScript are different concerns**.

Bun can execute TypeScript without performing the same type-checking role as `tsc`.

For strict type checking, you may still want:

```bash
tsc --noEmit
```

For example:

```json
{
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

This gives you:

```text
Bun
 └── runs the application

TypeScript compiler
 └── verifies the types
```

That distinction is important in a professional TypeScript project.

---

# Key Takeaways

Bun is more than a TypeScript runtime.

It combines several commonly separate tools into one ecosystem:

| Bun feature          | Traditional alternative |
| -------------------- | ----------------------- |
| Runtime              | Node.js                 |
| TypeScript execution | `tsx`                   |
| Package manager      | npm / pnpm / yarn       |
| Watch mode           | nodemon                 |
| Bundler              | Vite / Webpack / Rollup |
| Test runner          | Jest / Vitest           |
| Script runner        | npm scripts             |

The biggest advantage is **simplicity**: fewer tools can mean less configuration and fewer dependencies.

At the same time, Bun does not eliminate the need to understand the underlying concepts. You should still understand what a runtime, compiler, bundler, package manager, test runner, and type checker actually do.

---

# Resources

* **Bun Documentation:** https://bun.sh/docs
* **Installing Bun:** https://bun.sh/docs/installation
* **Running TypeScript:** https://bun.sh/docs/runtime/typescript
* **Bun HTML / Static Site Development:** https://bun.sh/docs/bundler/html
* **Bun Test Runner:** https://bun.sh/docs/test
* **Bun Package Manager:** https://bun.sh/docs/pm
