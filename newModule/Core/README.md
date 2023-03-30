<div align="center">

### :construction: :construction: :construction: THIS PROJECT HAS AN EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:

&nbsp;

# @kode-frontend/pathfinder-web-core

  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web-core">
    <img alt="npm version" src="https://img.shields.io/npm/v/@kode-frontend/pathfinder-web-core.svg">
  </a>
  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web-core">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/@kode-frontend/pathfinder-web-core.svg">
  </a>
  <a href="https://github.com/appKODE/pathfinder-web-core/blob/main/LICENCE">
    <img alt="npm license" src="https://img.shields.io/npm/l/@kode-frontend/pathfinder-web-core.svg">
  </a>
  <a href="https://standardjs.com">
    <img alt="standard js" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web-core">
    <img alt="npm type definitions" src="https://img.shields.io/npm/types/@kode-frontend/pathfinder-web-core.svg">
  </a>
  <br>
  <a href="#">
    <img alt="status" src="https://img.shields.io/badge/status-experimental-red?style=flat&logo">
  </a>

  <p>
    <a href="#installation">Installation</a> | 
    <a href="#development">Development</a> |
    <a href="#release">Release flow</a>
  </p>
  
</div>
&nbsp;

This is the core library for [pathfinder-web-react](https://www.npmjs.com/package/@kode-frontend/pathfinder-web-react). There is no need to install it as a separate package, Pathfinder pulls it up through dependencies.

> _Pathfinder is a tool for changing base URL for API requests on the client side. [Read more.](https://www.npmjs.com/package/@kode-frontend/pathfinder-web-react)_

Pathfinder-web-core is isolated into an individual package for the possibility of its reuse by other platforms, for example, React Native. It is easy to integrate and it does not require any further development.

## Installation

```bash
npm i @kode-frontend/pathfinder-web-core

# or using yarn
yarn add @kode-frontend/pathfinder-web-core
```

## Development

### Release

Releases are made using Release-it CLI tool.

Local release:

1. Generate your [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) with 'api' scope.
2. Run:

```bash
GITLAB_TOKEN=your-personal-access-token npm run release

# or using yarn
GITLAB_TOKEN=your-personal-access-token yarn release
```

Publish to npm:

```bash
npm publish --access public

# or using yarn
yarn publish --access public
```

### TODO

- [x] add tests
- [ ] add gitlab CI quality pipeline
- [ ] add gitlab CI release pipeline
- [x] add project docs and description

## License

[MIT ©](https://github.com/appKODE/pathfinder-web-core/blob/main/LICENCE)
