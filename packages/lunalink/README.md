# @bearstudio/lunalink

## Usage

Install the package using your favorite package manager:

```sh
npm install @bearstudio/lunalink
yarn add @bearstudio/lunalink
pnpm add @bearstudio/lunalink
```

Import the tools you need:

```ts
import { ExtractParams, lunalink } from "@bearstudio/lunalink";

const THE_URL_FOR_MY_API_CALL = "/contacts/:id";

// When you need types from 
type APICallParams = ExtractParams<typeof THE_URL_FOR_MY_API_CALL>;
     // ^? type APICallParams = { id: string; }

// Generate the complete string with type safety
const response = await fetch(
  lunalink(THE_URL_FOR_MY_API_CALL, {
    id: "9BD30040-ECFE-4D7D-AD0C-E723591E22CB",
  })
);

// You can also do more, by giving more attributes. It will add them as search params
// /contacts/9BD30040-ECFE-4D7D-AD0C-E723591E22CB?search=FirstName
const response = await fetch(
  lunalink(THE_URL_FOR_MY_API_CALL, {
    id: "9BD30040-ECFE-4D7D-AD0C-E723591E22CB",
    search: "FirstName",
  })
);
```
