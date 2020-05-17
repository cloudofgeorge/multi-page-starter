# React starter

React + Redux + Typescript + PWA

## Contents

- [Scripts](#scripts)
- [What is used](#what-is-used)

## Scripts

#### Start dev server

```sh
yarn serve:dev
```
Runs the app in the development mode. Open [http://localhost:8080](http://localhost:8080) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### Build app

```sh
yarn build
```
Builds the app for production to the build folder - `/public`

#### Lint code format

```sh
yarn prettier:check
```
Lint project with [prettier](https://prettier.io/) and his config

#### Lint TypeScript files

```sh
yarn lint:ts
```
Lint (.ts, .tsx) files with ESlint and his config

#### Lint styles (.css and .scss)

```sh
yarn lint:styles
```
Lint styles file format on all the project with [stylelint](https://github.com/stylelint/stylelint) and his config

#### Lint project

```sh
yarn lint:all
```
Lint all the project with ESlint, [prettier](https://prettier.io/) and [stylelint](https://github.com/stylelint/stylelint)


#### Fix code format

```sh
yarn prettier:fix
```
Fix code format on all the project with [prettier](https://prettier.io/) and his config

#### Fix all the project

```sh
yarn fix:all
```
Fix typing errors and code format

#### Run local build

```sh
yarn build && http-server
```
Before, you need install [http-server](https://github.com/http-party/http-server) globally - `npm install http-server -g`

## What is used

#### Base
- Webpack 4+ - [webpack.js.org](https://webpack.js.org/)
- SCSS  - [sass-lang.com](https://sass-lang.com/)

#### Tools
- Prettier - [prettier.io](https://prettier.io/)
- ESLint - [eslint.org](https://eslint.org/)
- Husky - [github.com/typicode/husky](https://github.com/typicode/husky)

#### PWA
- WorkBox - [developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox) - webpack/configs/workBoxConfig.js
- Generated manifest file by config - webpack/configs/manifest.js
