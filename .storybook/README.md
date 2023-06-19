# Storybook

## Debugging Storybook + Yarn PnP

Storybook may experience an [issue](https://github.com/storybookjs/storybook/issues/20876) during the build step if project dependencies are installed using [Yarn with Plug'n'Play enabled](https://yarnpkg.com/features/pnp/).

### Steps to Reproduce

First, install dependencies and then start Storybook:

```sh
$ yarn
$ yarn storybook
```

If you see errors similar to those shown in the sample below, then see the **Steps to Fix** section.

<details>
  <summary>Sample Error Output</summary>

```sh
info => Starting manager..
✘ [ERROR] Could not resolve "@storybook/addon-controls/manager"

    node_modules/@storybook/addon-essentials/dist/controls/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-controls/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-controls" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-controls/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-actions/manager"

    node_modules/@storybook/addon-essentials/dist/actions/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-actions/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-actions" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-actions/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-measure/manager"

    node_modules/@storybook/addon-essentials/dist/measure/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-measure/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-measure" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-measure/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-viewport/manager"

    node_modules/@storybook/addon-essentials/dist/viewport/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-viewport/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-viewport" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-viewport/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-outline/manager"

    node_modules/@storybook/addon-essentials/dist/outline/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-outline/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-outline" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-outline/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-backgrounds/manager"

    node_modules/@storybook/addon-essentials/dist/backgrounds/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-backgrounds/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-backgrounds" here because it's
  not listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-backgrounds/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/addon-toolbars/manager"

    node_modules/@storybook/addon-essentials/dist/toolbars/manager.mjs:1:14:
      1 │ export * from '@storybook/addon-toolbars/manager';
        ╵               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/addon-toolbars" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/addon-toolbars/manager" as external to exclude it from the
  bundle, which will remove this error.

✘ [ERROR] Could not resolve "@storybook/global"

    node_modules/@storybook/addon-interactions/dist/manager.mjs:3:35:
      3 │ import { global as global$1 } from '@storybook/global';
        ╵                                    ~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/global" here because it's not listed
  as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/global" as external to exclude it from the bundle, which will
  remove this error.

✘ [ERROR] Could not resolve "@storybook/instrumenter"

    node_modules/@storybook/addon-interactions/dist/manager.mjs:7:35:
      7 │ import { CallStates, EVENTS } from '@storybook/instrumenter';
        ╵                                    ~~~~~~~~~~~~~~~~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "@storybook/instrumenter" here because it's not
  listed as a dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "@storybook/instrumenter" as external to exclude it from the bundle, which
  will remove this error.

✘ [ERROR] Could not resolve "polished"

    node_modules/@storybook/addon-interactions/dist/manager.mjs:10:31:
      10 │ import { transparentize } from 'polished';
        ╵                                ~~~~~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "polished" here because it's not listed as a
  dependency of this package:

    ../../../.pnp.cjs:38:33:
      38 │           "packageDependencies": [\
        ╵                                  ~~

  You can mark the path "polished" as external to exclude it from the bundle, which will remove this
  error.

ERR! Error: Build failed with 10 errors:
```

</details>

### Fixing the Issue

To fix this issue, reset the pnp cache by deleting any `.pnp.cjs` files that are in directories above the working directory. By default, there should be one of these files in the home directory. Delete it by running the following:

```
rm -f ~/.pnp.cjs
```

Then reinstall dependencies with `yarn` and try to start Storybook again with `yarn storybook`. If you continue to experience errors, look for `.pnp.cjs` files in the parent directories of the project working directory. You can search for the files by running `find ~ -name ".pnp.*"` and delete those that are above the current working directory.
