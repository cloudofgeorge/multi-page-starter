# Multi page starter
Starter pack and tools for creation of standalone HTML pages without any frameworks.

Webpack 5 + Typescript + HTML multi-page +SCSS + PWA + Images optimization + Tools

## Contents

- [Scripts](#scripts)
- [What are used](#what-are-used)

## Scripts

#### Start dev server

```sh
npm start
```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### Build app

```sh
npm run build
```
Builds the app for production to the build folder - `/dist`

#### Lint code format

```sh
npm run prettier:check
```
Lint project with [prettier](https://prettier.io/) and his config

#### Lint JavaScript files

```sh
npm run lint:js
```
Lint .js files with ESlint and his config

#### Lint styles (.css and .scss)

```sh
npm run lint:styles
```
Lint styles file format on all the project with [stylelint](https://github.com/stylelint/stylelint) and his config

#### Lint project

```sh
npm run lint:all
```
Lint whole the project with [ESlint](https://eslint.org/), [prettier](https://prettier.io/) and [stylelint](https://github.com/stylelint/stylelint)


#### Fix code format

```sh
npm run prettier:fix
```
Fix code format of whole of the project with [prettier](https://prettier.io/) and his config

#### Fix all in the project

```sh
npm run fix:all
```
Fix typing errors and code format


#### Run tests

```sh
npm run test
```
Starting UNIT test by jest

#### Run tests in watch mode

```sh
npm run test:watch
```
Starting UNIT test by jest in watch mode

#### Collect test coverage

```sh
npm run test:coverage
```
Collect UNIT test coverage by jest

#### Run local build

```sh
npm run build && http-server
```
Before, you need install [http-server](https://github.com/http-party/http-server) globally - `npm install http-server -g`

## What are used

#### Base
- Webpack 5 - [webpack.js.org](https://webpack.js.org/)
- SCSS  - [sass-lang.com](https://sass-lang.com/)

#### Tools
- Prettier - [prettier.io](https://prettier.io/)
- ESLint - [eslint.org](https://eslint.org/)
- Husky - [github.com/typicode/husky](https://github.com/typicode/husky)

#### PWA
- WorkBox - [developers.google.com/web/tools/workbox](https://developers.google.com/web/tools/workbox) - webpack/configs/workBoxConfig.js
- Generated manifest file by config - webpack/configs/manifest.js
