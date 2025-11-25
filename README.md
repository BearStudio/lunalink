# lunalink

![luna the cat with the title lunalink on her head](./apps/web/public/lunalink.jpeg)

This library is an alternative to [`urlcat`](https://github.com/balazsbotond/urlcat)
which isn't maintained anymore. That is why it is named after my **cat**, Luna 🐈‍⬛.
Link is because it is easy to say after `luna`. That's it, that's the whole story.

I ([@yoannfleurydev](https://github.com/yoannfleurydev)), did not want to fork
`urlcat` to challenge myself into reimplementing it. Some API design are made to
simplify my development, I hope it will simplify yours too.

The library main purpose is to provide utilities to, given a url, extract parameters and replace them with real values. No more `Record<string, string>` for your url params!

## Features

- 🔬 URL Path params type extraction
- 🔁 Replace path params placeholder with real values
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

> 💡 These samples of code were purely invented for the example.

Go from this kind of code:

```ts
import { useQuery } from '@tanstack/react-query';
import { pick } from 'remeda';

// 🙁 You need to maintain path params type as they change in the url, 
// no automatic type updates based on the url
type EventCategoryType = {
  year: string;
  typeId: string;
  categoryId: string;
  filter?: string;
  page?: string;
  size?: string;
}

const useEventCategory = (params: EventCategoryType) => {
  return useQuery({
    queryKey: ['event', 'type', 'category', params],
    queryFn: async () => {
      // 🙁 Here you need to handle searchParams separately
      const searchParams = new URLSearchParams(pick(params, ['filter', 'page', 'size']));

      // 😩 Tedious url build, hard to read if there is more than two path params
      const response = await fetch(`demo/event/${params.year}/type/${params.typeId}/category/${params.categoryId}?${searchParams.toString()}`);

      return response.json();
    }
  })
}
```

to this kind of code:

```ts
import { useQuery } from '@tanstack/react-query';
import { type ExtractParams, lunalink } from '@bearstudio/lunalink';

const eventCategoryIdRoute = 'demo/event/:year/type/:typeId/category/:categoryId';

// 👍 Let lunalink detect path params given your url, and add your custom searchParams
// The type will always be up to date with the path params declared in your url
type EventCategoryIdRouteType = ExtractParams<typeof eventCategoryIdRoute> & {
  filter?: string;
  page?: string;
  size?: string;
};

const useEventCategory = (params: EventCategoryIdRouteType) => {
  return useQuery({
    queryKey: ['event', 'type', 'category', params],
    queryFn: async () => {
      // 👍 Lunalink will replace path params with their values from the params object, 
      // based on how they are defined in eventCategoryIdRoute. 
      // And leftovers will be passed as search params.
      // No more custom url concatenation!
      const response = await fetch(lunalink(eventCategoryIdRoute, params));
      return response.json();
    },
  });
};

useEventCategory({
  year: '2025',
  typeId: 'event',
  categoryId: 'track',
  page: '3',
  size: '10',
});
// Called url will look like this: 'demo/event/2025/type/event/category/track?page=3&size=10'
```

No more types to maintain, only urls to declare! Easier to read, easier to use 👌

## API

### `lunalink(pathToReplace, pathParams [, options]);`

```ts
import { lunalink, ExtractParams, join } from '@bearstudio/lunalink';

// lunalink(path, variables, config);

// returns 'a/path/with/a-variable'
lunalink('a/path/with/:variables', { variables: 'a-variable' });

// returns 'a/path/with/a-variable?anotherVar=3'
lunalink('a/path/with/:variables', { variables: 'a-variable', anotherVar: '3' });

// returns 'a/path/my-file.pdf'
lunalink('a/path/:fileName.:ext', { fileName: 'my-file', ext: 'pdf' });

// returns 'https://my.api.com/a/path/with/a-variable'
lunalink(
  'a/path/with/:variables',
  { variables: 'a-variable' },
  { baseURL: 'https://my.api.com' }, // trailing slash is not mandatory
);

// You can override the default encodeURIComponent() method used to encode
// path params
// returns 'a/path/with/A-VARIABLE'
lunalink(
  'a/path/with/:variables',
  { variables: 'a-variable' },
  { 
    encodeURIComponent: (pathParamValue) => {
      return pathParamValue.toLocalUpperCase();
    },
  },
);
```

### `ExtractParams<Path extends string>;`

This type utility allows you to extract all path params from a url into a Record like object.

Usefull to type function params.

```ts
import { ExtractParams } from '@bearstudio/lunalink';

type MyURLPathParams = ExtractParams<'a/path/with/:variable'>;
// type MyURLPathParams = {
//   variable: string;
// };

const url = 'a/path/:fileName.:ext'
type AnotherURLPathParams = ExtractParams<typeof url>;
// type AnotherURLPathParams = {
//   fileName: string;
//   ext: string;
// };
```

### `join(path1, path2 [, separator]);`

`join` is a utility fonction which allows to join to path. If `join` detect
a baseURL either in left or right, it will always prepend it to the other param.

If not, the two path will be joined.

```ts
import { join } from '@bearstudio/lunalink';


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
