# Alilo Frontend

<img src="./images/logo.png" alt="Logo" 
     style="max-width: 300px; height: auto; display: block; margin-left: auto; margin-right: auto;">

Web application UI built with React 18 and TypeScript. The project uses Webpack 5, Mantine UI, Material React Table, and NGINX/Docker for production serving.

## Scheme

<img src="./images/scheme.png" alt="Scheme" 
     style="max-width: 400px; height: auto; display: block; margin-left: auto; margin-right: auto;">

The frontend is part of the AliLo load-testing platform and integrates with the Backend (REST API), MinIO (artifacts), and load agents.

### Tech Stack
- React 18, TypeScript
- Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/modals`, `@mantine/notifications`, `@mantine/dates`)
- Material React Table
- Webpack 5 (+ dev server), Babel
- CSS Modules, `sass`/`sass-loader`
- Axios

## Requirements
- Node.js LTS (recommended 18+)
- Yarn 1.x

## Installation
```bash
yarn install
```

## Scripts
- Development (localhost:8080):
```bash
yarn start
```

- Development build (non-minified):
```bash
yarn build-dev
```

- Production build (minified assets in `build/`):
```bash
yarn build
```

- Generate React icons from SVG:
```bash
yarn generate-icons
```

## Environment Variables
Webpack-driven environment variables (see `webpack/env.config.js`). Provide values via the shell environment or `.env` (if your environment supports it). Typical keys include API base URLs and mode flags.

## Run in Docker (production)
Build production bundle and image:
```bash
yarn build
docker build -t alilo-frontend:latest .
docker run -p 8080:80 --rm alilo-frontend:latest
```
The application will be available at `http://localhost:8080`.

### Core Domain Entities (reference)
- Project — top-level product/domain grouping
- Scenario — service/functional area containing multiple scripts
- Script — single load script/endpoint description
- Run — execution of scenarios/scripts with metrics and real-time control

### Quick Demo
Minimal frontend-only demo:
```bash
# local production-like run
yarn build && docker build -t alilo-frontend:demo . && docker run -p 8080:80 --rm alilo-frontend:demo
# then configure backend API URL via env/config
```

## Cache Cleaning
Sometimes it's useful to clean build/package caches:
```bash
rm -rf node_modules/.cache
yarn cache clean
rm -rf build
# if necessary:
rm -rf node_modules && yarn install
```

## Common Issues

- Sass warning “legacy JS API is deprecated”:
  Logged by `sass-loader` while processing certain CSS/SCSS files. Non-blocking. Updating `sass`/`sass-loader` and upstream styles will eventually remove it.

- TypeScript with CSS Modules:
  Declarations for `*.module.css` are provided in `typescript/typings/global.d.ts`. If the IDE cannot resolve a module, restart the TS Server.

- TypeScript version:
  ESLint may warn about an unsupported TypeScript version. This does not block builds. Align ESLint plugins and TypeScript if desired.

## License
Proprietary project. All rights reserved by the AliExpress Russia team.
