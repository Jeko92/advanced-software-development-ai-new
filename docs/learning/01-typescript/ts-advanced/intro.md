# TypeScript Advanced - Intro

## Learning objectives

- Combine multiple types into one using intersection types and define fixed-shape arrays with tuple types
- Write generic functions and interfaces that work with any data type while keeping full type safety
- Use built-in utility types to derive specialized types from a single base definition
- Organize type declarations in `.d.ts` files to separate type contracts from runtime code

## Overview

The fundamentals session covered the building blocks: type annotations, type aliases, unions, and interfaces. Those tools are enough to type a small project. But as a codebase grows, patterns start repeating. An API response always has a status code, a message, and a data payload, yet the shape of that payload changes from endpoint to endpoint. An entity stored in a database has an `id` and timestamps that should never appear in a creation request. A search result needs only three of the entity's seven fields. Writing a separate interface for every variation works at first, but it leads to duplicated definitions that drift apart when the base type changes.

This session introduces four capabilities that solve these problems. Intersection types let you compose a complex type from smaller, reusable pieces. Tuples give you arrays where each position has a known type. Generics let you write a single interface or function that adapts to whatever type you pass in. Utility types are built-in generics that transform existing types: making properties optional, picking a subset of fields, or omitting auto-generated ones.
