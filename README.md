# Chrontrack Docs

Documentation website for Chrontrack, built with [Docusaurus](https://docusaurus.io/).

## Prerequisites

- Node.js 20+
- [Task](https://taskfile.dev) (`winget install Task.Task` / `brew install go-task`)

## Installation

```bash
npm install
```

## Local Development

```bash
task dev
```

Starts a local dev server at `http://localhost:3000`. Most changes are reflected live without a restart.

## Build

```bash
task build
```

Generates static files into the `build/` directory.

## Serve (with search)

```bash
task serve
```

Builds the site and serves it locally with the search index enabled.

## Screenshots

```bash
task update-screenshots
```

Boots the web app in mock mode and captures screenshots for all doc pages into `static/img/screenshots/`.
