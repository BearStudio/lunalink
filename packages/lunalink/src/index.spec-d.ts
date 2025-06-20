/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, Expect } from "type-testing";
import { ExtractParams } from "./index.js";

const simpleParam = "/contacts/:id";
const multipleParams = "/contacts/:contactId/address/:addressId";
const simpleParamWithDot = "/contacts/:id.html.md";
const multipleParamsWithDot = "/contacts/:contactId/address/:addressId.html.md";

// Tests OK
type TestSimpleParamOK = Expect<
  Equal<ExtractParams<typeof simpleParam>, { id: string }>
>;

type TestMultipleParamsOK = Expect<
  Equal<
    ExtractParams<typeof multipleParams>,
    { contactId: string } & { addressId: string }
  >
>;

type TestWithDotOK = Expect<
  Equal<ExtractParams<typeof simpleParamWithDot>, { id: string }>
>;

type TestMultipleParamsWithDotOK = Expect<
  Equal<
    ExtractParams<typeof multipleParamsWithDot>,
    { contactId: string } & { addressId: string }
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
