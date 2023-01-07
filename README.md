# `app-template`

An boilerplate for rapidly building web applications using Next.js and MUI.

## Install

```bash
pnpm i
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage with Docker

1. Build the container: `docker build -t app-template .`
2. Run the container: `docker run -p 3000:3000 app-template`

## Resources

This was built using a few examples, namely:

- [`nextjs-with-typescript` example in MUI repo](https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript)
- [`with-docker` for usage with Docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
