# lunalink

![luna the cat with the title lunalink on her head](./apps/web/public/lunalink.jpeg)

This library is an alternative to [`urlcat`](https://github.com/balazsbotond/urlcat)
which isn't maintained anymore. That is why it is named after my cat, Luna 🐈‍⬛.
Link is because it is easy to say after `luna`. That's it, that's the whole story.

I ([@yoannfleurydev](https://github.com/yoannfleurydev)), did not want to fork
`urlcat` to challenge myself into reimplementing it. Some API design are made to
simplify my development, I hope it will simplify yours too.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/lunalink`: the source code of the library. Learn mode about it in its dedicated [README](./packages/lunalink/README.md)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
