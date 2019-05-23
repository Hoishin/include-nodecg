# include-nodecg

> Tools to include NodeCG in your bundle, rather than including your bundle in NodeCG

-   During development of NodeCG, you have to put your bundles inside the `nodecg/bundles` directory
-   This package provides tools to put NodeCG in your bundles, the other way around of the normal way
-   This package reduces the step of cloning NodeCG or symlinking the bundle directory to NodeCG bundles directory.

## Install

`nodecg` must be installed as npm package along with this package

```
npm i -S include-nodecg nodecg
```

or

```
yarn add include-nodecg nodecg
```

## Setup

- Setup `postinstall` npm hook in package.json
    ```json
    "scripts": {
      "postinstall": "include-nodecg postinstall"
    }
    ```

## CLI

```
include-nodecg <command>

Commands:
  include-nodecg postinstall  Set this command to npm `postinstall` hook
  include-nodecg start        Start NodeCG

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## License

MIT &copy; Keiichiro Amemiya (Hoishin)
