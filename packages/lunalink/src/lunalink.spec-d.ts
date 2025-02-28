/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, Expect } from "type-testing";
import { ExtractParams } from "./lunalink.js";

const simpleParam = "/contacts/:id";
const multipleParams = "/contacts/:contactId/address/:addressId";

type TestSimpleParamOK = Expect<
  Equal<ExtractParams<typeof simpleParam>, { id: string }>
>;

type TestMultipleParamsOK = Expect<
  Equal<
    ExtractParams<typeof multipleParams>,
    { contactId: string } & { addressId: string }
  >
>;

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
