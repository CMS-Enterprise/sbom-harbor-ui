# sbom-harbor-ui

## Overview

This project contains the Harbor application's UI built with React, Vite, TypeScript, and SWC. This UI application accompanies the [SBOM Harbor](https://github.com/CMS-Enterprise/sbom-harbor) project.

## Status

Version 2 of this project is in early stages of development. We are rapidly iterating towards a v2.0.0 MVP,
but at this time all features are not yet operational, and the usage documentation is not available.

## System Requirements

- [Node 18.16.0](https://nodejs.org/en/download)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [GitLeaks](https://github.com/gitleaks/gitleaks/tree/master#installing)

## Getting Started

1. Clone the repository and `cd` into the root directory:

```shell
git clone git@github.com:cms-enterprise/sbom-harbor-ui`

cd sbom-harbor-ui
```

2. Install dependencies:

```shell
yarn
```

3. Install pre-commit hooks:

```shell
yarn prepare
```

## Building

To build the application, run the following from the root directory:

```shell
yarn build
```

## Testing

To run all tests, run the following from the root directory:

```shell
yarn test
```

To lint all files, run the following from the root directory:

```shell
yarn lint
```

## Developing

To start the local development server, run the following from the root directory:

```shell
yarn dev
```
