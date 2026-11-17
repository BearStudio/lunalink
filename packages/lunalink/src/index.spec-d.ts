/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, Expect } from "type-testing";
import { ExtractParams } from "./index.js";

const simpleParam = "/contacts/:id";
const multipleParams = "/contacts/:contactId/address/:addressId";
const simpleParamWithDot = "/contacts/:id.html.md";
const multipleParamsWithDot = "/contacts/:contactId/address/:addressId.html.md";

// Tests OK
type TestSimpleParamOK = Expect<
  Equal<
    ExtractParams<typeof simpleParam>,
    { id: string | number | boolean }
  >
>;

type TestMultipleParamsOK = Expect<
  Equal<
    ExtractParams<typeof multipleParams>,
    { contactId: string | number | boolean } & {
      addressId: string | number | boolean;
    }
  >
>;

type TestWithDotOK = Expect<
  Equal<
    ExtractParams<typeof simpleParamWithDot>,
    { id: string | number | boolean }
  >
>;

type TestMultipleParamsWithDotOK = Expect<
  Equal<
    ExtractParams<typeof multipleParamsWithDot>,
    { contactId: string | number | boolean } & {
      addressId: string | number | boolean;
    }
  >
>;

// Tests KO
type TestSimpleParamKO = Expect<
  // @ts-expect-error The test should fail
  Equal<ExtractParams<typeof simpleParam>, { notCorrectParams: string }>
>;

type TestMultipleParamsKO = Expect<
  // @ts-expect-error The test should fail
  Equal<
    ExtractParams<typeof multipleParams>,
    { incorrectId: string } & { addressId: string }
  >
>;

type TestWithDotKO = Expect<
  // @ts-expect-error The test should fail
  Equal<ExtractParams<typeof simpleParamWithDot>, { wrongId: string }>
>;

type TestMultipleParamsWithDotKO = Expect<
  // @ts-expect-error The test should fail
  Equal<
    ExtractParams<typeof multipleParamsWithDot>,
    { wrongContactId: string } & { wrongAddressId: string }
  >
>;

// Paths with a query string and/or a fragment
const paramWithFragment = "/users/:id#top";
const paramWithQuery = "/users/:id?tab=info";
const paramWithQueryAndFragment = "/users/:id?tab=info#top";
const paramWithTrailingQuestionMark = "/contacts/:id?";
const queryWithoutParams = "/search?sort=asc";
const paramInQuery = "/users/:id/posts?page=:page";
const paramInFragment = "/docs/:id#:section";

type TestParamWithFragmentOK = Expect<
  Equal<
    ExtractParams<typeof paramWithFragment>,
    { id: string | number | boolean }
  >
>;

type TestParamWithQueryOK = Expect<
  Equal<
    ExtractParams<typeof paramWithQuery>,
    { id: string | number | boolean }
  >
>;

type TestParamWithQueryAndFragmentOK = Expect<
  Equal<
    ExtractParams<typeof paramWithQueryAndFragment>,
    { id: string | number | boolean }
  >
>;

type TestParamWithTrailingQuestionMarkOK = Expect<
  Equal<
    ExtractParams<typeof paramWithTrailingQuestionMark>,
    { id: string | number | boolean }
  >
>;

type TestQueryWithoutParamsOK = Expect<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Equal<ExtractParams<typeof queryWithoutParams>, {}>
>;

type TestParamInQueryOK = Expect<
  Equal<
    ExtractParams<typeof paramInQuery>,
    { id: string | number | boolean } & { page: string | number | boolean }
  >
>;

type TestParamInFragmentOK = Expect<
  Equal<
    ExtractParams<typeof paramInFragment>,
    { id: string | number | boolean } & {
      section: string | number | boolean;
    }
  >
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TestWidenedStringOK = Expect<Equal<ExtractParams<string>, {}>>;

type TestParamWithFragmentKO = Expect<
  // @ts-expect-error The fragment should not be part of the param name
  Equal<
    ExtractParams<typeof paramWithFragment>,
    { "id#top": string | number | boolean }
  >
>;
