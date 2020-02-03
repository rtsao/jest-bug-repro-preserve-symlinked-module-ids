# Jest bug reproduction

Jest fails to preserve module identity for symlinks when using the `browser` package.json field.

## Steps to reproduce

1. `pnpm install -r`
2. `cd simple-reproduction`
3. `pnpm test`

Notice that using the `browser: true` option, the test fails because module identity is not preserved.

## Explanation

Suppose we have the following dependency graph:

```
           ┌────────────────────┐
           │reproduction-example│
           └────────────────────┘
                      │
         ┌────────────┤
         │            │
         ▼            │
┌─────────────────┐   │
│has-browser-field│   │
└─────────────────┘   │
         │            │
         └────────────┤
                      │
                      ▼
            ┌──────────────────┐
            │needs-preserved-id│
            └──────────────────┘
```

Jest treats `reproduction-example/needs-preserved-id` and `reproduction-example/has-browser-field/needs-preserved-id` as distinct modules if `has-browser-field` specifies a `browser` field and the `browser: true` Jest config option is used.
