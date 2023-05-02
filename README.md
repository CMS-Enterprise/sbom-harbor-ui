# sbom-harbor-ui

## Overview

This project contains the Harbor application's UI.

## Status

Version 2 of this project is in early stages of development. We are rapidly iterating towards a v2.0.0 MVP,
but at this time all features are not yet operational, and the usage documentation is not available.

## System Requirements

- [Node 18.16.0](https://nodejs.org/en/download)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [GitLeaks](https://github.com/gitleaks/gitleaks/tree/master#installing)
- [pre-commit](https://pre-commit.com/index.html#install)

## Getting Started

1. Clone the repository and `cd` into its directory:

```shell
git clone git@github.com:cms-enterprise/sbom-harbor-ui`

cd sbom-harbor-ui
```

2. Install dependencies:

```shell
yarn
```

3. Install git pre-commit hooks:

```shell
pre-commit install
```

## Building

To build all workspace targets on the local machine run the following from the root directory:

```shell
yarn build
```

## Testing

To run tests for all workspace targets on the local machine, run the following from the root directory:

```shell
yarn test
```
