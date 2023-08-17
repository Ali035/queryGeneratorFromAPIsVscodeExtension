# api-generator README

This extension will scaffold CRUD APIs and their types and corresponding queries.
All the functions that you need to create,update,delete and get an entity.

## Features

This extension will generate you api.ts, its type as type.ts, queries corresponding with APIs as queries.ts and index.ts to export all of them.

## Publishing Extensions

`vsce`, short for "Visual Studio Code Extensions", is a command-line tool for packaging, publishing and managing VS Code extensions.

### Installation

Make sure you have Node.js installed. Then run:
`npm install -g @vscode/vsce`

### packaging

`$ vsce publish`

## Release Notes

### 1.0.0

Initial extension.

## 1.1.0

- Add scaffolding registration forms (both individual and group)

## 1.1.1

- Fixing file extension bug.

## 1.1.2

- Fixing formFields file importing bug and fixing isDataIsLoading state of `Loader` component.

## 1.1.3

- Fixing importing types bug.

## 1.1.4

- Changing get entity list query.

## 1.1.5

- Generating route files.

**Enjoy!**
