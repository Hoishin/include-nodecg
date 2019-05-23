# include-nodecg

> Tools to include NodeCG in your bundle, rather than including your bundle in NodeCG

-   During development of NodeCG, you have to put your bundles inside the `nodecg/bundles` directory
-   This package provides tools to put NodeCG in your bundles, the other way around of the normal way

## Why

Because it reduces the step of cloning NodeCG or symlinking the bundle directory to NodeCG bundles directory.

## CLI

```
include-nodecg <command>

Commands:
  include-nodecg postinstall  Set this command to npm `postinstall` hook

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## License

MIT &copy; Keiichiro Amemiya (Hoishin)
