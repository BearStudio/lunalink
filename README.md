# lunalink

![luna the cat with the title lunalink on her head](./apps/web/public/lunalink.jpeg)

This library is an alternative to [`urlcat`](https://github.com/balazsbotond/urlcat)
which isn't maintained anymore. That is why it is named after my **cat**, Luna 🐈‍⬛.
Link is because it is easy to say after `luna`. That's it, that's the whole story.

I ([@yoannfleurydev](https://github.com/yoannfleurydev)), did not want to fork
`urlcat` to challenge myself into reimplementing it. Some API design are made to
simplify my development, I hope it will simplify yours too.

## Features

- 🤏 Tiny (**2.8 kB** minified + gzipped)
- 🟦 TypeScript first
- 🧪 Fully tested

## Installation

Install the package using your favorite package manager:

```sh
npm install @bearstudio/lunalink
yarn add @bearstudio/lunalink
pnpm add @bearstudio/lunalink
```

## Usage

Go from this kind of code:

```ts
type EventCategoryType = {
  year: number;
  typeId: string;
  categoryId: string;
  filter?: string;
  page?: string;
  size?: string;
}

const useEventCategory = (params: EventCategoryType) => {
  const api = useApi();

  return useQuery({
    queryKey: ['event', 'type', 'category', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams(pick(params, ['filter', 'page', 'size']));

      const response = await api.get(`demo/event/${params.year}/type/${params.typeId}/category/${params.categoryId}?${searchParams.toString()}`);

      return response.json();
    }
  })
}
```

> 💡 This sample of code was purely invented for the example.

to this kind of code:

```ts
import { lunalink, ExtractParams } from "@bearstudio/lunalink";

const EventCategoryIdRoute = 'demo/event/:year/type/:typeId/category/:categoryId'
type EventCategoryIdRouteType = ExtractParams<typeof EventTypeCategoryId> & {
  filter?: string;
  page?: string;
  size?: string;
}

const useEventCategory = (params:) => {
  const api = useApi();

  return useQuery({
    queryKey: ['event', 'type', 'category', params],
    queryFn: async () => {
      const response = await api.get(lunalink(EventTypeCategoryId, params));

      return response.json();
    }
  })
}
```

so you don't have to maintain your type yourself, and enjoy readability.

## API

```ts
import { lunalink, ExtractParams } from "@bearstudio/lunalink";

// lunalink(path, variables, config)
lunalink("a/path/with/:variables", { variables: "a-variable" }, { baseURL: "https://example.org" })
```

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
